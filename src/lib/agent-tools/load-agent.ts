/**
 * Reads an agent's SKILL.md (definition + system prompt) and every file in
 * its references/ folder. Returns a structured object the chat route uses to
 * build the prompt.
 *
 * The agent path is the brain-relative path to the agent folder, e.g.
 * "body/herbalist" or "family/wife" or "service".
 *
 * Loads:
 *   - SKILL.md (frontmatter + body)
 *   - All .md / .mdx / .txt files under references/ (recursively, sorted)
 *
 * Does NOT load assets/ (those are for output, not context) or scripts/.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type LoadedReference = {
  name: string   // relative path inside references/ (e.g. "wife-profile.md")
  bytes: number
  content: string
}

export type LoadedAgent = {
  path: string                          // e.g. "body/herbalist"
  frontmatter: Record<string, unknown>  // parsed YAML from SKILL.md
  systemPromptBody: string              // SKILL.md body (the prose under frontmatter)
  references: LoadedReference[]
  totalReferenceBytes: number
}

async function walkReferences(refsDir: string, prefix = ''): Promise<LoadedReference[]> {
  let entries
  try {
    entries = await fs.readdir(refsDir, { withFileTypes: true })
  } catch {
    return []
  }
  const out: LoadedReference[] = []
  for (const e of entries) {
    if (e.name.startsWith('.')) continue
    const abs = path.join(refsDir, e.name)
    const rel = prefix ? `${prefix}/${e.name}` : e.name
    if (e.isDirectory()) {
      out.push(...(await walkReferences(abs, rel)))
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase()
      if (ext === '.md' || ext === '.mdx' || ext === '.txt') {
        const content = await fs.readFile(abs, 'utf-8')
        out.push({ name: rel, bytes: content.length, content })
      }
    }
  }
  out.sort((a, b) => a.name.localeCompare(b.name))
  return out
}

export async function loadAgent(agentPath: string): Promise<LoadedAgent> {
  const brainRoot = path.join(process.cwd(), 'brain')
  const agentRoot = path.join(brainRoot, ...agentPath.split('/'))

  // Defensive: prevent path traversal
  if (!agentRoot.startsWith(brainRoot + path.sep) && agentRoot !== brainRoot) {
    throw new Error(`Invalid agent path: ${agentPath}`)
  }

  // Read SKILL.md
  let skillRaw: string
  try {
    skillRaw = await fs.readFile(path.join(agentRoot, 'SKILL.md'), 'utf-8')
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code
    if (code === 'ENOENT') {
      throw new Error(`No SKILL.md found at brain/${agentPath}/SKILL.md`)
    }
    throw err
  }
  const skill = matter(skillRaw)

  // Read all references
  const refs = await walkReferences(path.join(agentRoot, 'references'))
  const totalReferenceBytes = refs.reduce((sum, r) => sum + r.bytes, 0)

  return {
    path: agentPath,
    frontmatter: skill.data as Record<string, unknown>,
    systemPromptBody: skill.content.trim(),
    references: refs,
    totalReferenceBytes,
  }
}

/**
 * Build a single system-prompt string combining the agent's SKILL.md body
 * with all references concatenated. This whole block becomes the cacheable
 * context (prompt caching works against this stable system prompt).
 */
export function buildSystemPrompt(agent: LoadedAgent): string {
  const parts: string[] = []
  parts.push(agent.systemPromptBody)
  if (agent.references.length > 0) {
    parts.push('')
    parts.push('---')
    parts.push('')
    parts.push(
      '# Loaded knowledge base',
      '',
      `${agent.references.length} reference file(s) totaling ${Math.round(agent.totalReferenceBytes / 1024)} KB.`,
      'Cite the file you draw from when answering. Files below are listed by path under brain/' + agent.path + '/references/.',
      '',
    )
    for (const ref of agent.references) {
      parts.push('---')
      parts.push('')
      parts.push(`## brain/${agent.path}/references/${ref.name}`)
      parts.push('')
      parts.push(ref.content.trim())
      parts.push('')
    }
  }
  return parts.join('\n')
}
