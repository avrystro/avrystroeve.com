# sources/

Raw captures, typed by CHANNEL (where the content came from). Inbox + permanent archive.

## Channel buckets

| Folder | What | Populated by |
|---|---|---|
| `voice-memos/` | Mac voice memo dictations (transcribed) | [voice-memo-pipeline](~/Developer/voice-memo-pipeline) |
| `fathom-calls/` | Fathom call recordings + transcripts | [fathom-sync](~/Developer/fathom-sync) |
| `iphone-call-recordings/` | iPhone call recordings | (manual sync) |
| `chat-sessions/` | AI chat brain-dumps (Claude, ChatGPT, etc.) | (manual save) |
| `session-dumps/` | Whole-session captures from focused work blocks | (manual save) |
| `research/` | Book notes, paper highlights, video transcripts | (manual save) |
| `whatsapp/` | WhatsApp thread exports | (WhatsApp MCP, when wired) |
| `telegram/` | Telegram thread exports | (when wired) |
| `in-person/` | In-person session notes | (manual save) |

Each bucket follows the same convention: `inbox/` for new arrivals, files at root for processed/triaged.

## How files flow

1. Sync program writes file to `sources/<channel>/inbox/` (or you drop one manually).
2. File appears in the sidebar tree.
3. You triage: which agent does this serve?
4. Two options:
   - **Reference directly:** move file from `inbox/` to an agent's `references/`. Source becomes the curated reference.
   - **Synthesize:** distill the source into a new `.md` (and/or `.excalidraw`) inside an agent's `references/`. Original stays in `sources/` as permanent archive. Add frontmatter `source: ../../sources/<channel>/<file>` to the distillation so the link is traceable.

## Historical archive — separate

The `~/Developer/app.avry/conversations/` directory holds 5+ years of historical voice memos, fathom calls, etc. that lived there BEFORE this brain existed. That archive stays frozen at the old location. Only NEW captures from Phase 1.5 onward land here. Bulk migration of the historical archive is deferred indefinitely (see [PLAN.md §5 row 11](../PLAN.md)).

## Filename conventions

`YYYY-MM-DD-kebab-case-summary.ext`

Examples:
- `2026-05-15-nosara-apothecary-call.m4a`
- `2026-05-15-nosara-apothecary-call.md` (transcript co-located)
- `2026-05-15-conversations-in-the-darkness.md`
