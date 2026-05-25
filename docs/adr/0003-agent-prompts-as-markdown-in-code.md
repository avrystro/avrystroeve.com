# ADR 0003: Agent system prompts live as markdown files in src/lib/agents/

**Status:** Accepted
**Date:** 2026-05-24

## Context

Agent system prompts (the instructions that tell each AI agent who it is and how to behave) currently live in `brain/<domain>/<agent>/SKILL.md`. We considered three options:

1. **TypeScript constants** (`src/lib/agents/<name>/skill.ts`) — type-checked but awkward for multiline prose.
2. **Markdown files next to code** (`src/lib/agents/<name>/skill.md`) — human-readable, version-controlled, loaded at runtime.
3. **Database rows** (Supabase `prompts` table) — dashboard-editable, no redeploy needed, but changes invisible in git.

## Decision

Option 2: markdown files at `src/lib/agents/<name>/skill.md`. Loaded at runtime via `fs.readFileSync`. One file per agent.

## Consequences

- Prompts change via git commits (PR, review, deploy cycle).
- No TypeScript escaping headaches for multiline prose.
- The same format as before (markdown) — zero content transformation during migration.
- If dashboard editing of prompts becomes needed, add a DB override layer later (the code version stays as the default).
- Agent registry at `src/lib/agents/registry.ts` exports metadata (id, displayName, scope) for each agent.
