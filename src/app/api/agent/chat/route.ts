/**
 * Agent chat endpoint.
 *
 * POST /api/agent/chat
 * Body: { agentPath: "body/herbalist" | "family/wife" | "service" | ..., messages: UIMessage[] }
 *
 * Loads the agent's SKILL.md + all references, builds a long cacheable system
 * prompt, streams the response. With Anthropic, marks the system prompt with
 * cacheControl: 'ephemeral' so the references get cached for 5 minutes —
 * first turn pays full cost, follow-ups within the window pay ~10% of input.
 */
import { streamText, type UIMessage, convertToModelMessages } from 'ai'
import { getModel, isAnthropicProvider } from '@/lib/agent-tools/llm'
import { loadAgent, buildSystemPrompt } from '@/lib/agent-tools/load-agent'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

type ChatRequest = { agentPath: string; messages: UIMessage[] }

const SAFE_PATH = /^[a-z0-9_][a-z0-9/_-]{0,127}$/i

export async function POST(req: Request) {
  let body: ChatRequest
  try {
    body = (await req.json()) as ChatRequest
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
  if (typeof body?.agentPath !== 'string' || !SAFE_PATH.test(body.agentPath)) {
    return Response.json({ error: 'Valid agentPath required.' }, { status: 400 })
  }
  if (!Array.isArray(body?.messages)) {
    return Response.json({ error: 'messages[] required.' }, { status: 400 })
  }

  let agent
  try {
    agent = await loadAgent(body.agentPath)
  } catch (err) {
    return Response.json(
      { error: `Failed to load agent: ${String(err)}` },
      { status: 404 },
    )
  }

  const systemPrompt = buildSystemPrompt(agent)

  // Anthropic-only: mark system prompt as cacheable. 5-min TTL by default.
  // ~90% off input cost on cache hits — massive for sustained conversation.
  const systemMessage = isAnthropicProvider()
    ? [
        {
          role: 'system' as const,
          content: systemPrompt,
          providerOptions: {
            anthropic: { cacheControl: { type: 'ephemeral' as const } },
          },
        },
      ]
    : [{ role: 'system' as const, content: systemPrompt }]

  const coreMessages = await convertToModelMessages(body.messages)

  const result = streamText({
    model: getModel(),
    messages: [
      ...systemMessage,
      ...coreMessages,
    ],
  })

  return result.toUIMessageStreamResponse()
}
