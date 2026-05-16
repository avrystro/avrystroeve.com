# PLAN.md — avrystroeve.com admin dashboard + personal AI brain

Status: scoped, not started. Authored 2026-05-15.
Owner: Avry. Executor: Claude (this session forward).

---

## 1. The vision in one paragraph

Turn `avrystroeve.com` into the single source of truth for everything about Avry: the public-facing personal site (front), the gated personal admin dashboard (back), and the file-based brain that powers a set of world-class personal AI agents (God, Body sub-agents, Finances). The admin dashboard at `/internal/*` is the brain made interactive — a persistent sidebar mirroring the brain filesystem, file viewer for markdown / images / PDFs, Excalidraw whiteboards, and a per-agent chat panel. Long-term: talk to any agent from anywhere, swap model providers (Anthropic → local → Vercel) without refactoring.

---

## 2. Architecture summary

- **Two segments:** public site (current homepage, blog, vision) + gated admin at `/internal/*` and `/admin/*`.
- **Auth:** cookie-based gate via `src/proxy.ts`, single `ADMIN_PASSWORD` env var. Mirrors venture-journey-ai-group exactly.
- **Brain lives IN the repo** at `~/Developer/avrystroeve.com/brain/`. Committed to private GitHub. Included in Vercel build (NOT vercelignored) so chat works in prod from anywhere. Repo MUST stay private.
- **Brain structure** (locked):
  - `sources/` — raw captures, typed by channel (voice-memos, fathom, whatsapp, telegram, in-person, research). Inbox + archive.
  - `<domain>/` — one folder per top-level life domain (god, body, finances). Each domain is one agent OR a folder of sub-agents.
  - `whiteboards/` — cross-cutting free-form excalidraw canvases not tied to any agent.
  - `PROJECT.md / HANDOFF.md / LOG.md` — project mgmt for the website itself.
- **Agent structure** (per Anthropic skill schema):
  - `SKILL.md` — agent definition: name, description (when-to-use), system prompt (body).
  - `README.md` — human overview.
  - `references/` — curated knowledge the agent loads into context.
  - `assets/` — templates used in agent OUTPUT (recipe templates, etc.).
  - `scripts/` — deterministic actions (Plaid sync, macro calc, etc.).
- **Sub-agents** (body has 3: chef, trainer, herbalist): each is a sovereign agent folder under `body/`. No top-level body orchestrator yet — you click each sub-agent directly in the sidebar.
- **Chat layer:** Vercel AI SDK from day one. Anthropic as first provider; swap to OpenAI / Ollama / Vercel Agents without refactoring.
- **Visual layer:** Excalidraw canvases serve double duty — co-located synthesis next to source files, AND free-form whiteboards under `brain/whiteboards/`. Phase 3+.

---

## 3. The full brain tree (target end-state — updated 2026-05-16)

```
avrystroeve.com/brain/
├── README.md
├── PROJECT.md, HANDOFF.md, LOG.md      ← website project mgmt
├── PLAN.md                              ← this file
│
├── sources/                             ← RAW captures, typed by channel (no inbox/ subfolder — channel root IS the inbox)
│   ├── README.md
│   ├── voice-memos/                     ← from voice-memo-pipeline (Mac dictations)
│   ├── fathom-calls/                    ← from fathom-sync
│   ├── iphone-call-recordings/          ← phone call recordings (existing pipeline)
│   ├── chat-sessions/                   ← Claude / AI chat brain-dumps
│   ├── session-dumps/                   ← whole-session captures
│   ├── research/                        ← book notes, papers, video transcripts
│   ├── whatsapp/                        ← (new bucket)
│   ├── telegram/                        ← (new bucket)
│   └── in-person/                       ← (new bucket)
│
├── god/                                 ← single agent
│   ├── SKILL.md, README.md
│   └── references/, assets/, scripts/
│
├── body/                                ← multi-agent
│   ├── README.md                        ← lists sub-agents
│   ├── chef/                            ← sub-agent (nutrition, recipes, cooking)
│   │   └── SKILL.md, README.md, references/, assets/, scripts/
│   ├── trainer/                         ← sub-agent (movement, recovery, biomarkers)
│   │   └── SKILL.md, README.md, references/, assets/, scripts/
│   └── herbalist/                       ← sub-agent (plant medicine, protocols)
│       └── SKILL.md, README.md, references/, assets/, scripts/
│
├── homebase/                            ← multi-agent (NEW Phase 1.7)
│   ├── README.md                        ← lists sub-agents
│   ├── farmer/                          ← sub-agent (growing, soil, lunar timing, local climate)
│   │   └── SKILL.md, README.md, references/, assets/, scripts/
│   └── builder/                         ← sub-agent (construction, materials, sovereignty infrastructure)
│       └── SKILL.md, README.md, references/, assets/, scripts/
│
├── family/                              ← multi-agent (NEW Phase 1.7)
│   ├── README.md                        ← lists sub-agents
│   └── wife/                            ← sub-agent (relationship, game, dating psych, profile of his wife)
│       └── SKILL.md, README.md, references/, assets/, scripts/
│                                          (kids/ etc. added when they earn it)
│
├── service/                             ← single agent (NEW Phase 1.7 — scope TBD, see §5 row 14)
│   ├── SKILL.md, README.md
│   └── references/, assets/, scripts/
│
├── finances/                            ← single agent
│   ├── SKILL.md, README.md
│   └── references/, assets/, scripts/
│
└── whiteboards/                         ← free-form excalidraw canvases (cross-cutting; co-located canvases live inside agent references/ instead)
    └── README.md
```

**Cross-agent knowledge note:** the herbalist conversation with Catherine (2026-05-13) surfaced material relevant to chef (eat-the-rainbow, gum thickeners), trainer (liver as recovery signal), farmer (lunar timing, soil, Guanacaste climate), and god (indigenous wisdom). Per Anthropic's bounded-specialization principle, duplicate the lens-specific framing into each agent's `references/` rather than building a shared layer. Each agent owns its scope.

---

## 4. Phases

Each phase is independently shippable. Each phase ends with a single git commit and a manual verification step.

### Phase 0 — Auth gate (foundation)

**Goal:** any visit to `/internal/*` or gated APIs redirects to `/admin/login`. Correct password sets a cookie and unlocks. Works locally and on Vercel.

**Files touched:**
- NEW `src/proxy.ts` (port from `~/Developer/venture-journey-ai-group/src/proxy.ts`)
- NEW `src/app/admin/login/page.tsx` (port from venture)
- NEW `src/app/api/admin/auth/route.ts` (port from venture, cookie set/clear)
- EDIT `.env.local` — add `ADMIN_PASSWORD=<value Avry picks>`
- EDIT Vercel project env vars — add `ADMIN_PASSWORD`

**Env vars:** `ADMIN_PASSWORD` (string, no quotes, set in `.env.local` and Vercel)

**Matcher (in proxy.ts config):** `['/admin/:path*', '/internal/:path*', '/api/brain-tree', '/api/brain/:path*', '/api/file/:path*', '/api/canvas/:path*', '/api/agent/:path*']`

**Success criteria:**
- `curl localhost:3000/internal` → 307 redirect to `/admin/login?next=/internal`
- Visit `/admin/login`, enter wrong password → error shown
- Visit `/admin/login`, enter correct password → cookie set, redirected to `/internal` (which 404s for now — that's Phase 1)
- Same flow works on Vercel preview deployment
- `/api/brain-tree` returns 401 without cookie

**Rollback:** `git revert <commit>`. No data changes, no infra changes.

**Commit msg:** `feat(admin): cookie-based auth gate for /admin and /internal segments`

---

### Phase 1 — Brain shell + sidebar + file viewer + scaffold

**Goal:** logged-in user sees a left sidebar mirroring the brain tree. Clicking any file renders it (markdown → markdown view, dir → listing, others → metadata stub). Brain folder structure is fully scaffolded with READMEs and empty agent SKILL.md files. The herbalist voice memo is dropped into `brain/sources/voice-memos/` as the first real piece of content.

**Files touched:**
- NEW `brain/` tree (full structure from §3 above)
  - All `README.md` files written with clear "what goes here" explanations
  - All `SKILL.md` files scaffolded with skeleton (name, description, scope, placeholder system prompt)
- NEW `src/app/internal/layout.tsx` (port + simplify from venture)
- NEW `src/app/internal/Sidebar.tsx` (port from venture, adjust TOP_SECTIONS to: god, body, finances, sources, whiteboards)
- NEW `src/app/internal/FileView.tsx` (port from venture, defer `.excalidraw` rendering to Phase 3 — show placeholder for now)
- NEW `src/app/internal/page.tsx` — overview: lists agents, latest LOG entry, quick links to PROJECT/HANDOFF
- NEW `src/app/internal/[[...path]]/page.tsx` — catch-all route that renders any file or directory in the brain tree
- NEW `src/app/api/brain-tree/route.ts` (port from venture — reads `brain/` and returns tree JSON)
- NEW `src/app/api/file/[...path]/route.ts` (port from venture — returns `{kind, body|children|frontmatter, ...}`)
- NEW `src/app/api/brain/[file]/route.ts` (port from venture — pinned brain doc reader for PROJECT/HANDOFF/LOG)
- EDIT `AGENTS.md` — replace "Brain lives at `~/Developer/app.avry/life/avrystroeve-website/`" with "Brain lives at `brain/`" plus document the agent / sub-agent structure
- DELETE `~/Developer/app.avry/life/avrystroeve-website/` (after files are migrated and committed in avrystroeve.com)

**Migration map (Phase 1):**

| From | To | Action |
|---|---|---|
| `~/Developer/app.avry/life/avrystroeve-website/PROJECT.md` | `~/Developer/avrystroeve.com/brain/PROJECT.md` | move |
| `~/Developer/app.avry/life/avrystroeve-website/HANDOFF.md` | `~/Developer/avrystroeve.com/brain/HANDOFF.md` | move |
| `~/Developer/app.avry/life/avrystroeve-website/LOG.md` | `~/Developer/avrystroeve.com/brain/LOG.md` | move |
| `~/Developer/app.avry/life/avrystroeve-website/` (empty dir) | DELETED | rmdir |
| Herbalist voice memo (lands via sync) | `brain/sources/voice-memos/` | auto via Phase 1.5 sync repoint |

**What is NOT migrated in Phase 1:** the historical `~/Developer/app.avry/conversations/` archive (5+ years of voice memos, fathom calls, etc.) stays in place as a frozen archive. Only NEW captures from Phase 1.5 onward land in `avrystroeve.com/brain/sources/`. Bulk historical migration is deferred indefinitely — see §5 row 11.

**Reads:** Phase 1 reads files from disk synchronously inside API routes (Node `fs/promises`). Fine for the file sizes we'll have. Vector / RAG comes later if and only if context windows can't hold a domain.

**Co-located files convention:** if a file in `sources/` is later synthesized into a domain reference, the original STAYS in `sources/` as archive. The synthesis is a NEW file in the agent's `references/` with frontmatter linking back: `source: ../../sources/voice-memos/2026-05-15-nosara-apothecary.m4a`. Copies, not symlinks (symlinks don't deploy to Vercel).

**Success criteria:**
- After login, `/internal` shows overview with agent list and LOG snippet
- Sidebar shows the full brain tree expandable
- Click `PROJECT.md` → renders as markdown
- Click `body/herbalist/SKILL.md` → renders the scaffolded SKILL
- Click `sources/voice-memos/2026-05-15-nosara-apothecary.m4a` → metadata stub (size, modified date, "audio file — no inline player yet")
- Folder click → directory listing of children
- `app.avry/life/avrystroeve-website/` is gone

**Rollback:** `git revert <commits>` in avrystroeve.com. If brain files need to come back to app.avry/life/, restore from git history in either repo.

**Commit msg:** `feat(brain): scaffold brain tree + internal sidebar + file viewer (Phase 1)`

---

### Phase 1.5 — Repoint sync infrastructure (going-forward cut)

**Goal:** all three sync programs and the routing agent write to `~/Developer/avrystroeve.com/brain/sources/` from this point forward. Old `app.avry/conversations/` becomes a frozen archive — still browsable, no new files land there.

**Why this exists:** `app.avry/conversations/` has 5+ years of history and is its own project (PROJECT/HANDOFF/LOG). Doing a hard cut in Phase 1 is risky and slow. Phased migration: repoint sync NOW, defer bulk archive migration indefinitely (Phase 6+ if ever).

**Repos / files touched (one commit per repo):**

1. **`~/Developer/voice-memo-pipeline/`**
   - EDIT `process-voice-memo.sh` — change output path from `app.avry/conversations/voice-memos/inbox/` to `avrystroeve.com/brain/sources/voice-memos/inbox/`
   - EDIT `SyncVoiceMemos/` Swift source — same path change (if hardcoded in Swift)
   - EDIT `AGENTS.md` — update destination docs
   - Test: record a voice memo, run sync, verify file lands in new location

2. **`~/Developer/fathom-sync/`**
   - EDIT `.env.example` — `CALLS_DIR=/Users/avrystroeve/Developer/avrystroeve.com/brain/sources/fathom-calls`
   - EDIT actual `.env` (Avry's local) — same value
   - Verify `sync.ts` reads `CALLS_DIR` correctly (no hardcoded fallback)
   - EDIT `AGENTS.md` — update destination docs
   - Test: run `./run-sync.sh`, verify new calls land in new location

3. **`~/Developer/conversation-pipeline/`**
   - EDIT `AGENTS.md` — update "Brain" pointer to new location
   - EDIT `rebuild-people-indexes.sh` if it has hardcoded `app.avry/conversations/` paths
   - Test: run people index rebuild, verify it reads from new location

4. **`~/Developer/system/agents/conversations-directory/`**
   - EDIT `AGENTS.md` — update central inbox pointer to `avrystroeve.com/brain/sources/`
   - EDIT `brain/PROJECT.md` and `brain/HANDOFF.md` if they reference old location
   - Routing logic stays the same: agent watches central inbox, routes to per-project brains. The "central" location changes.

**Optional config helper:** add an exported `INBOX_ROOT` env var (`INBOX_ROOT=/Users/avrystroeve/Developer/avrystroeve.com/brain/sources`) used by all three sync programs. Future moves become one env change instead of editing four repos.

**Success criteria:**
- Record a new voice memo → sync → file lands in `avrystroeve.com/brain/sources/voice-memos/inbox/`
- Pull a new Fathom call → file lands in `avrystroeve.com/brain/sources/fathom-calls/inbox/`
- Sidebar in `/internal/sources/voice-memos/` shows the new file (auto via Phase 1 file API)
- `app.avry/conversations/` receives no new files — verify by recording another memo and confirming it's NOT in the old location

**Rollback:** revert one repo at a time. Each repo has one commit. Sync programs go back to writing to old location instantly.

**Commit msgs (one per repo):**
- `voice-memo-pipeline: repoint output to avrystroeve.com/brain/sources/`
- `fathom-sync: repoint CALLS_DIR to avrystroeve.com/brain/sources/`
- `conversation-pipeline: repoint to avrystroeve.com/brain/sources/`
- `system/agents/conversations-directory: repoint central inbox to avrystroeve.com/brain/sources/`

---

### Phase 1.6 — Drop inbox/ subfolder convention (SHIPPED 2026-05-16)

**Goal:** `sources/<channel>/` IS the inbox. No `inbox/` subfolder layer. Earlier two-tier (inbox vs root) was always empty at root because "triaged" actually means "copied to an agent's `references/`," not "moved out of inbox/."

**Changes:** dropped `/inbox` from all sync scripts (process-voice-memo, retitle, recover, audit, SyncVoiceMemos Swift), fathom-sync sync.ts + enrich.ts (OUTPUT_DIR = CALLS_DIR), conversation-pipeline CONV_DIRS, conversations-directory docs. Deleted `brain/sources/<channel>/inbox/` subfolders.

**Historical archive at `app.avry/conversations/`** still uses inbox/ shape — frozen, untouched. Asymmetry is intentional.

---

### Phase 1.7 — Expand domain structure (Homebase, Family, Service)

**Goal:** scaffold three new top-level domains using the same shape as god/body/finances. Each domain folder gets README + sub-agent folders (or single SKILL.md if single-agent). Sidebar auto-discovers new domains on next page load — no code change needed (sidebar TOP_SECTIONS array needs one edit to include the new top-level names).

**Files to scaffold:**

```
brain/homebase/                    NEW
├── README.md                       # what this domain covers
├── farmer/                         # sub-agent
│   ├── SKILL.md                    # growing, soil, lunar timing, Guanacaste/CR climate
│   ├── README.md
│   ├── references/                 # initial seed: herbalist convo lunar-farming distillation
│   ├── assets/                     # raised-bed soil recipe template, planting calendar template
│   └── scripts/
└── builder/                        # sub-agent
    ├── SKILL.md                    # construction, materials, sovereignty infrastructure (water, energy, off-grid)
    ├── README.md
    ├── references/
    ├── assets/
    └── scripts/

brain/family/                       NEW
├── README.md                       # multi-agent, currently just wife (kids/parents/etc. emerge later)
└── wife/                           # sub-agent
    ├── SKILL.md                    # relationship, game principles, dating psychology, mother-of-children criteria
    ├── README.md
    ├── references/                 # WILL be populated by Phase 1.8 migration of app.avry/life/my-wife/
    ├── assets/                     # date templates, conversation prompts, anniversary calendar
    └── scripts/

brain/service/                      NEW (scope TBD — see §5 row 14)
├── SKILL.md                        # single agent, scope to be defined
├── README.md
├── references/
├── assets/
└── scripts/
```

**Code change:** edit `src/app/internal/Sidebar.tsx` — `TOP_SECTIONS` array adds `'homebase', 'family', 'service'`. Edit `src/app/internal/agents.ts` — `AGENTS` registry adds `homebase/farmer`, `homebase/builder`, `family/wife`, `service`. Edit `src/app/internal/page.tsx` overview to include new agent cards.

**Success criteria:**
- Sidebar shows Project / God / Body / Homebase / Family / Service / Finances / Sources / Whiteboards
- Click `/internal/homebase/farmer` → SKILL.md + chat panel (placeholder) renders
- Click `/internal/family/wife` → same
- Click `/internal/service` → same

**Commit msg:** `feat(brain): scaffold Homebase, Family, Service domains (Phase 1.7)`

---

### Phase 1.8 — Migrate my-wife/ from app.avry into brain/family/wife/

**Goal:** consolidate the wife knowledge base into the new brain structure.

**Existing material at** `~/Developer/app.avry/life/my-wife/`:
- Research material (sources — third-party content)
- Field log (Avry's own observations over time)
- (Other artifacts — inspect before moving)

**Migration map:**

| From | To | Why |
|---|---|---|
| Raw research files (book notes, articles, theory) | `brain/sources/research/` | Channel-typed archive — these are SOURCES |
| Distilled wife-relevant references | `brain/family/wife/references/` | Curated for the wife agent |
| Field log entries | `brain/family/wife/references/field-log/` (if many) OR `brain/family/wife/references/field-log.md` (if one rolling doc) | Synthesis, scoped to wife agent |
| Wife-profile material (about her specifically) | `brain/family/wife/references/wife-profile/` | Subdivision within agent references |

**Read app.avry/life/my-wife/ first**, propose specific filename map, get Avry's approval, then execute. Don't bulk-move without inspection — content may have sensitive material to handle deliberately.

**Decide also:** what to do at the OLD location after move?
- (a) Delete (clean cut)
- (b) Leave as frozen archive (matches conversations/ pattern)
- (c) Symlink back from old → new (works locally, fails on different machines)

Recommend (a) — clean cut. Migration is intentional.

**Commit msg:** `brain(family): migrate my-wife/ from app.avry into brain/family/wife/ (Phase 1.8)`

---

### Phase 2 — Chat placeholder + agent definitions

**Goal:** every agent page (`/internal/body/chef`, `/internal/body/trainer`, `/internal/body/herbalist`, `/internal/god`, `/internal/finances`) has a right-side chat panel — inert, but visually present. Each agent's `SKILL.md` gets real content: name, description, scope, draft system prompt. No actual LLM calls yet.

**Files touched:**
- NEW `src/app/internal/ChatPanel.tsx` — right-side panel, props: `agentPath` (e.g. `body/herbalist`), `agentName` (e.g. "Herbalist"). Shows message log (empty), text input, Send button (disabled with "Not wired up yet — Phase 4" pill).
- EDIT `src/app/internal/[[...path]]/page.tsx` — detect when path points to an agent folder (has `SKILL.md`), render `<ChatPanel>` alongside `<FileView>`. Two-column layout: FileView left, ChatPanel right.
- EDIT each `brain/*/SKILL.md` — write real content per agent (see §6 for template).
- NEW `brain/README.md` (top-level) — explains the architecture: sources vs agents, references vs assets vs scripts, how to add a new sub-agent.

**Success criteria:**
- Visit `/internal/body/herbalist` → see herbalist SKILL.md rendered + chat panel on the right
- Chat panel shows agent name + scope summary at the top
- Send button is disabled with clear "Phase 4" message
- Same UX on every agent route

**Rollback:** `git revert <commit>`. ChatPanel and SKILL.md edits are isolated.

**Commit msg:** `feat(internal): chat panel placeholder + agent SKILL.md definitions (Phase 2)`

---

### Phase 3 — Excalidraw whiteboards

**Goal:** click any `.excalidraw` file in the brain → live Excalidraw canvas opens, edits save back to disk. `brain/whiteboards/` has a "new canvas" button. Whiteboards co-located inside agent folders (e.g. `body/herbalist/references/herb-protocols.excalidraw`) work automatically.

**Files touched:**
- ADD dependency: `@excalidraw/excalidraw`
- EDIT `src/app/internal/FileView.tsx` — implement the `.excalidraw` branch (was placeholder in Phase 1). Use venture's component as reference.
- NEW `src/app/api/canvas/[...path]/route.ts` (port from venture, GET + POST)
- (Optional) NEW `src/app/api/canvas/watch/[...path]/route.ts` — SSE for live-reload if you edit canvas files from outside the browser. Defer if not needed.
- EDIT `src/app/internal/[[...path]]/page.tsx` — when current path is `brain/whiteboards/`, show "+ New canvas" button.

**Success criteria:**
- Click `brain/whiteboards/` → directory listing + "New canvas" button
- Click "New canvas" → prompts for name, creates `<name>.excalidraw`, opens it
- Draw something, leave page, return → drawing persists
- Co-located: drop a `.excalidraw` file into `body/herbalist/references/`, refresh sidebar → file appears, click → opens canvas

**Rollback:** `git revert <commits>`. Dependency removal: `npm uninstall @excalidraw/excalidraw`.

**Commit msg:** `feat(internal): excalidraw whiteboards (co-located + free-form) (Phase 3)`

---

### Phase 4 — Wire up chat (Vercel AI SDK)

**Goal:** chat panel becomes interactive. Send a message to the herbalist agent → server loads `brain/body/herbalist/SKILL.md` + all files in `references/` → streams Claude's response back. Prompt caching for cheap follow-ups.

**Files touched:**
- ADD dependencies: `ai`, `@ai-sdk/anthropic`
- NEW `src/app/api/agent/[...path]/chat/route.ts` — POST endpoint. Reads agent SKILL.md + references/. Builds system prompt (with prompt-caching headers). Streams via Vercel AI SDK with Anthropic provider. Returns stream.
- EDIT `src/app/internal/ChatPanel.tsx` — wire input → POST `/api/agent/<path>/chat`, stream response into message log.
- EDIT `.env.local` + Vercel env — add `ANTHROPIC_API_KEY`.
- (Optional) Decide on conversation persistence: in-memory (lost on refresh) or save to `brain/<agent>/conversations/<date>.md`. Start with in-memory; persist later if useful.

**Model choice:** `claude-sonnet-4-6` for first ship. Cheap enough, capable enough. Swap to opus for harder agents (financial reasoning) if needed.

**Provider portability:** because we use Vercel AI SDK, switching to OpenAI / Ollama / Vercel Agents is a one-line provider swap. No business-logic changes.

**Success criteria:**
- Visit `/internal/body/herbalist`, type "what did Maria say about turmeric protocols?" → streamed response that references the voice-memo content
- First message takes a few seconds; follow-ups are fast (cache hit)
- Switching to `/internal/body/chef` → different agent, different scope
- Chat works on Vercel production from your phone

**Rollback:** `git revert <commits>`. Remove API key from Vercel env.

**Commit msg:** `feat(agent): wire up chat via Vercel AI SDK + Anthropic (Phase 4)`

---

### Phase 5 — Financial agent content scoping (separate session)

**Defer until after Phase 4 lands.** Holds dedicated session covering:
- What files live in `brain/finances/references/`? (accounts, monthly P&L, runway, taxes, recurring subs)
- Plaid integration (the `~/Developer/plaid-quickstart` workspace is the starting point)
- What does the finance agent's `SKILL.md` look like in detail?
- Privacy — are bank account numbers safe in repo? (Probably store identifiers, not raw account data. Plaid tokens in env vars.)

This is its own conversation. PLAN.md gets updated after that session.

---

## 5. Open decisions / blind spots to address before / during execution

| # | Decision | Default | Revisit when |
|---|---|---|---|
| 1 | Brain ships to Vercel? | YES — chat must work in prod. | Never (load-bearing) |
| 2 | Repo stays private? | YES — contains your life. | Never (load-bearing) |
| 3 | How does Avry edit files? | External editor (Cursor / Finder) for now. In-browser editor: Phase 6+. | When friction becomes painful |
| 4 | Mobile access pattern? | Same web app via mobile browser. PWA: later. Native: maybe never. | If mobile UX is poor |
| 5 | Auth — shared password vs magic-link? | Shared password for now. | If you add another person (Ivo, etc.) |
| 6 | Brain backup strategy? | Git history (committed to private GitHub). | If repo size grows past ~500MB |
| 7 | Visual brain (drag-drop file browser)? | Use Excalidraw whiteboards for now. Custom widget: Phase 6+. | If Excalidraw is insufficient |
| 8 | Conversation persistence (chat history)? | In-memory (lost on refresh) for first ship. | Phase 5+ if you want to look back at past chats |
| 9 | Model: Sonnet vs Opus per agent? | Sonnet for all initially. | If specific agents underperform |
| 10 | Vector / RAG vs full-context? | Full-context (read all files, stuff into prompt, rely on prompt caching). | If a domain grows past ~150k tokens |
| 11 | Bulk-migrate historical conversations archive? | NO — defer indefinitely. `app.avry/conversations/` stays as frozen archive. Phase 1.5 only repoints going-forward writes. | If you ever want chat agents to access pre-Phase-1.5 history |
| 12 | Use `INBOX_ROOT` env var across all sync programs? | YES if cheap — one env change vs editing 4 repos for future moves. Defer if Swift app makes it painful. | When making this kind of move again |
| 13 | When does data leave `brain/` and enter a DB? | Files-in-repo for unstructured agent knowledge (markdown, voice memo binaries). DB (Postgres / Supabase) for structured + relational data only: chat history persistence (Phase 4+), contact / lead forms, anything multi-row queryable. Object storage (Vercel Blob / R2) for binaries when repo bloat hurts deploy. | Per new feature — ask "is this structured + queryable?" → DB. "Is this >50MB binary?" → object storage. "Else?" → file in brain. |
| 14 | **What is the Service domain?** | UNDEFINED. Avry mentioned it but didn't expand. Possible interpretations: (a) service to community / giving back / contribution as a life pillar; (b) service businesses / work as service / customer-facing ops; (c) service workers (housekeeper, gardener, helpers as a network). Scaffold the folder in Phase 1.7 as a placeholder; define scope in a follow-up conversation before Phase 4 wiring. | Before adding real content to `service/references/`. |
| 15 | Cross-agent knowledge — duplicate or shared layer? | DUPLICATE the lens-specific framing into each agent's `references/`. The herbalist's lunar-farming knowledge lives in herbalist (the source) AND in farmer (the practitioner lens) — same facts, different framing. Per Anthropic's bounded-specialization principle: each agent owns its scope. No `brain/shared/` folder. | If duplication grows past ~3 cross-references per topic AND becomes unmaintainable. Then consider symlinks or a shared-layer experiment. |
| 16 | How sub-agents emerge within a domain | Pattern: a domain starts with one agent. When a sub-specialization earns ≥10 files OR a named persona emerges (chef, trainer, herbalist, farmer, builder, wife), promote it to a sub-agent folder with its own SKILL.md. Don't pre-build sub-agents for hypothetical needs. | Each domain decides for itself when sub-folders become real agents. |

---

## 6. Agent SKILL.md template (used in Phase 2)

Every agent's `SKILL.md` follows this shape:

```markdown
---
name: <agent-id>          # e.g. herbalist
description: This agent should be used when [conditions]. Typical triggers include [scenario 1], [scenario 2]. See "When to invoke" in the body.
model: sonnet
---

# <Agent Name> — Avry's <role>

## When to invoke

- **<scenario name>.** <what the situation looks like and what the agent should do>
- **<scenario name>.** <same>

## Scope

What this agent knows about. What it does NOT cover. Pointers to sibling agents if a user question is out of scope.

## Knowledge sources

- `references/` — <what kind of curated material lives here>
- `../../sources/voice-memos/` — <which raw captures inform this agent>

## System prompt

You are Avry's <role>. <First-person mission statement, vocabulary, tone>.

When you receive a question:
1. <step>
2. <step>
3. <step>

Always cite the file you drew an answer from.
```

Initial agents to scaffold in Phase 2:
- `god/SKILL.md` — spiritual / philosophical companion
- `body/chef/SKILL.md` — nutrition, recipes, cooking, ingredients
- `body/trainer/SKILL.md` — workouts, biomarkers, sleep, recovery
- `body/herbalist/SKILL.md` — herbs, apothecary, plant medicine, protocols
- `finances/SKILL.md` — accounts, runway, P&L, taxes (real content lands in Phase 5)

---

## 7. Env var checklist (cumulative across phases)

| Phase | Var | Where |
|---|---|---|
| 0 | `ADMIN_PASSWORD` | `.env.local` + Vercel project env |
| 1.5 | `CALLS_DIR` (fathom-sync) | `~/Developer/fathom-sync/.env` — update to `avrystroeve.com/brain/sources/fathom-calls` |
| 1.5 (opt) | `INBOX_ROOT` (shared by sync programs) | shell profile / per-repo .env — `~/Developer/avrystroeve.com/brain/sources` |
| 4 | `ANTHROPIC_API_KEY` | `.env.local` + Vercel project env |
| 5+ | `PLAID_CLIENT_ID`, `PLAID_SECRET`, `PLAID_ACCESS_TOKEN_*` | `.env.local` + Vercel (when finances wired) |

`.env.example` updated at end of each phase. `.env.local` stays gitignored (existing convention).

---

## 8. Conventions adopted

- **Terminology (Anthropic-aligned):** `references/`, `assets/`, `scripts/` per agent. Brain root uses `sources/` (channel-typed inbox+archive) and `whiteboards/`.
- **Sub-agent naming:** domain-role (`herbalist`, `chef`, `trainer`) not person-name (`maria-apothecary`). The PERSON is referenced inside the agent's source files.
- **File copies, not symlinks** for cross-folder references (symlinks don't deploy to Vercel).
- **One commit per phase.** Atomic, revertable.
- **Each phase shippable independently.** Stop after any phase = a coherent product.
- **Vercel AI SDK** for chat (provider-portable).
- **No vector DB until ≥150k tokens per domain.** Read files, stuff prompt, rely on prompt caching.

---

## 9. Next actions (updated 2026-05-16)

**Shipped:** Phases 0, 1, 1.5, 1.6, 2, 3 (+ scratch whiteboard). Herbalist memo migrated from old archive into `brain/sources/voice-memos/`. First synthesis whiteboard at `brain/body/herbalist/references/2026-05-13-nosara-apothecary-conversation.excalidraw`.

**Up next (in order):**

1. **Phase 1.7 — Expand domains.** Scaffold Homebase + Family + Service folders + sub-agents + SKILL.md + READMEs. Wire sidebar TOP_SECTIONS and agents.ts registry. ONE commit.
2. **Phase 1.8 — Migrate my-wife/.** Read `~/Developer/app.avry/life/my-wife/` first, propose detailed mapping, get Avry's approval, then move. Delete old location after move (clean cut).
3. **Phase 4 — Wire up chat.** Vercel AI SDK + Anthropic SDK. ChatPanel becomes interactive. Each agent loads its own SKILL.md + references/ as context, streams responses. Anthropic API key needed in `.env.local` and Vercel.
4. **Phase 5 — Financial agent content scoping.** Separate session covering accounts, Plaid, P&L, tax docs.
5. **Phase 6+ — Gradually migrate other life content.** `app.avry/life/body/`, `places/`, `ancient-wisdom/`, `material/`, etc. Slow, per-conversation pace per Avry's preference.

**Open in §5:** Service domain scope (row 14) needs definition before Phase 4 wiring of the service agent.

**Pattern established:** the herbalist whiteboard at `brain/body/herbalist/references/2026-05-13-nosara-apothecary-conversation.excalidraw` is the template for future source distillation — 3 columns (Knowledge / Quotes / Actions) + cross-agent routing notes. Replicate for other long-form captures.

PLAN.md gets updated at the end of each phase with what actually shipped vs what was planned.

## 10. Phase ordering rationale

Phases 0 → 1 → 1.5 → 2 → 3 → 4 → 5. Phase 1.5 sits between 1 and 2 (not before 1) because:

- Phase 1 creates `brain/sources/` for the sync programs to point AT.
- Repointing sync (1.5) before the destination exists would break sync silently.
- Phase 2 (chat placeholder + agent SKILL.md) doesn't depend on sync; could swap with 1.5, but keeping repoint adjacent to brain scaffolding keeps related changes close in git history.
