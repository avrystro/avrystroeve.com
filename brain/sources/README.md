# sources/

Raw captures, typed by CHANNEL (where the content came from). Each channel folder IS the inbox — files land directly here, no inbox/ subfolder.

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

## How files flow

1. Sync program writes file to `sources/<channel>/` (or you drop one manually).
2. File appears in the sidebar tree.
3. You triage: which agent does this serve?
4. Two options:
   - **Reference directly:** copy the file into an agent's `references/` (the source becomes the curated reference).
   - **Synthesize:** distill the source into a new `.md` (and/or `.excalidraw`) inside an agent's `references/`. Original stays in `sources/` as permanent archive. Add frontmatter `source: ../../sources/<channel>/<file>` to the distillation so the link is traceable.

## No inbox/ subfolder

Earlier convention had `sources/<channel>/inbox/` for new arrivals and `sources/<channel>/` (root) for triaged. We dropped that on 2026-05-16 (Phase 1.6) because the root was always empty — "triaged" actually means "copied to an agent's `references/`," not "moved out of inbox/." So `sources/<channel>/` IS the inbox now. Simpler.

## Historical archive — separate

The `~/Developer/app.avry/conversations/` directory holds 5+ years of historical voice memos, fathom calls, etc. from BEFORE this brain existed. It still uses `<channel>/inbox/` shape because that's how it was. That archive stays frozen at the old location — no new files land there. Bulk migration deferred indefinitely.

## Filename conventions

`YYYY-MM-DD-kebab-case-summary.ext`

Examples:
- `2026-05-13-nosara-herbalist-conversation.m4a`
- `2026-05-13-nosara-herbalist-conversation.md` (transcript co-located)
- `2026-05-15-conversations-in-the-darkness.md`
