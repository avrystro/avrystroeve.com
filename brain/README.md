# brain/

The interactive personal-AI knowledge base for avrystroeve.com. Lives in the repo, ships to Vercel, served from `/internal/*` behind the admin auth gate. This is Avry's life source-of-truth.

## Two organizing principles

| Principle | Where | Answers |
|---|---|---|
| **Channel-typed sources** | `sources/<channel>/` | "Where did this come from?" Voice memo, fathom call, whatsapp thread, etc. |
| **Per-agent references** | `<domain>/<agent>/references/` | "Which agent uses this?" Body herbalist, finance, etc. |

A file can live in both: original captured at `sources/voice-memos/`, a distilled version (curated for the agent) at `body/herbalist/references/`. Source = permanent archive. Reference = working copy. Link via frontmatter `source: ../../sources/voice-memos/<file>`.

## Top-level layout

```
brain/
├── PROJECT.md, HANDOFF.md, LOG.md   ← project mgmt for avrystroeve.com itself
├── PLAN.md                           ← admin-dashboard build plan
│
├── sources/                          ← raw captures, typed by channel (see sources/README.md)
│
├── god/                              ← single agent (spiritual companion)
├── body/                             ← multi-agent: chef + trainer + herbalist
├── finances/                         ← single agent
│
└── whiteboards/                      ← free-form excalidraw canvases
```

## Per-agent folder shape (Anthropic skill schema)

Each agent folder follows the schema from [plugin-dev/skills/agent-development](~/.claude/plugins/marketplaces/claude-plugins-official/plugins/plugin-dev/skills/agent-development/SKILL.md):

```
<agent>/
├── SKILL.md         ← agent definition: name, description, when-to-invoke, system prompt
├── README.md        ← human overview of the agent
├── references/      ← curated knowledge loaded into agent context
├── assets/          ← templates used in agent OUTPUT (recipe formats, etc.) — never loaded as context
└── scripts/         ← deterministic executable code (run, not read)
```

Progressive disclosure: start flat. Sub-folders inside `references/` emerge naturally when ≥3 related files exist.

## How to add a new sub-agent

1. Create folder: `brain/<domain>/<role>/`
2. Add `SKILL.md` (see template in [PLAN.md §6](PLAN.md#6-agent-skillmd-template-used-in-phase-2))
3. Add `README.md`
4. Create empty `references/`, `assets/`, `scripts/`
5. Sidebar auto-discovers the new agent on next page load.

## Where data goes

| Data type | Lives in | Why |
|---|---|---|
| Markdown notes, agent knowledge | `brain/` (this repo) | Git versioning, AI-readable, ships with deploy |
| Chat history (later) | DB (Supabase / Postgres) | Structured, queryable, multi-row |
| Large binaries (voice memo .m4a, future videos) | Vercel Blob / R2 (later) | Repo bloat if kept here |
| Public-facing content (blog posts) | `src/content/posts/` | Distinct from private agent knowledge |

See [PLAN.md §5 row 13](PLAN.md) for the decision rule.
