/**
 * Provider-agnostic LLM picker.
 *
 * Reads LLM_PROVIDER env var to choose between Anthropic (default) and Ollama.
 * Lets us swap providers per-environment (dev = ollama for free + local,
 * prod = anthropic for quality + reachability) or per-deploy without changing
 * any agent code.
 *
 * Env vars:
 *   LLM_PROVIDER          'anthropic' (default) | 'ollama'
 *   ANTHROPIC_API_KEY     required when provider=anthropic
 *   ANTHROPIC_MODEL       default 'claude-sonnet-4-6'
 *   OLLAMA_BASE_URL       default 'http://localhost:11434/api'
 *   OLLAMA_MODEL          default 'llama3.1:8b'
 */
import { anthropic } from '@ai-sdk/anthropic'
import { createOllama } from 'ollama-ai-provider'
import type { LanguageModel } from 'ai'

export function getModel(): LanguageModel {
  const provider = (process.env.LLM_PROVIDER ?? 'anthropic').toLowerCase()

  if (provider === 'anthropic') {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('LLM_PROVIDER=anthropic but ANTHROPIC_API_KEY is not set.')
    }
    const modelId = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6'
    return anthropic(modelId)
  }

  if (provider === 'ollama') {
    const ollama = createOllama({
      baseURL: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434/api',
    })
    const modelId = process.env.OLLAMA_MODEL ?? 'llama3.1:8b'
    return ollama(modelId) as unknown as LanguageModel
  }

  throw new Error(
    `Unknown LLM_PROVIDER: "${provider}". Expected "anthropic" or "ollama".`,
  )
}

export function isAnthropicProvider(): boolean {
  return (process.env.LLM_PROVIDER ?? 'anthropic').toLowerCase() === 'anthropic'
}
