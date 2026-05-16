# avrystroeve.com - Log

## 2026-05-15 → 2026-05-16

**Session focus:** Admin dashboard built end-to-end. Transformed avrystroeve.com from "personal blog" into dual-surface product (public site + private personal-AI brain). 11 phases shipped across 4 repos.

### Shipped

**avrystroeve.com (12 commits):**

| Commit | Phase | What |
|---|---|---|
| `f070f7c` | 0 | Cookie auth gate (`proxy.ts` + `/admin/login` + `/api/admin/auth`) |
| `12cb58e` | 1 | Brain shell + sidebar + file viewer + scaffold (god/body{3}/finances/sources/whiteboards/) + migrated PROJECT/HANDOFF/LOG from app.avry |
| `e44c59f` | 1.6 | Dropped inbox/ subfolder convention |
| `93bf9a4` | 2 | ChatPanel placeholder (inert, just visible) |
| `34607c2` | 3 | Excalidraw whiteboards (live save, co-located + freeform) |
| `e358a5b` | 3+ | Whiteboard scratch pad + Save-as workflow + Tools sidebar entry |
| `177890d` | 3 fix | Canvas paths skip file API (was 404 for missing scratch) |
| `1328742` | 3+ | Herbalist whiteboard redesigned visually (cards/sticky-notes/kanban) + locked Phase 1.7 scope |
| `250aee1` | 1.7 | Scaffolded Homebase/farmer + Family/wife + Service domains |
| `e469d9d` | (interim) | Herbalist memo migrated + PLAN.md expanded with new domains |
| `587dd11` | 1.8 | Migrated `app.avry/life/my-wife/` → `brain/family/wife/references/` (~98KB) |
| `b9afbf9` | 4a | Chat wired via Vercel AI SDK + Anthropic Sonnet 4.6 + prompt caching |

**Sync infrastructure repos (Phase 1.5/1.6, separate commits):**
- `voice-memo-pipeline` / `~/Developer/scripts/` — process-voice-memo.sh + retitle/recover/audit + SyncVoiceMemos/main.swift now write to `brain/sources/voice-memos/`
- `fathom-sync` (commit `e150ec4`) — sync.ts + enrich.ts + .env now point at `brain/sources/fathom-calls/`
- `conversation-pipeline` (commit `b91a2ef`) — rebuild-people-indexes.sh reads from new location
- `system/agents/conversations-directory` (commit `c3c80b2`/`dc039fe`) — routing agent docs repointed
- `app.avry` (commit `9bbc271`) — `life/my-wife/` deleted (clean cut after migration)

**Content moves + distillations:**
- Herbalist memo (Catherine, sacredfarm.com, 41:32) moved from `app.avry/conversations/voice-memos/inbox/2026-05-13-cotton-and-polyester-concerns.{m4a,md}` (auto-titled wrong by classifier) → `brain/sources/voice-memos/2026-05-13-nosara-herbalist-conversation.{m4a,md}` with corrected name
- First distillation whiteboard shipped: `brain/body/herbalist/references/2026-05-13-nosara-apothecary-conversation.excalidraw` — 3-column visual layout (Knowledge / Quotes / Actions) with color-coded topic cards, sticky-note quotes, kanban time-horizon action columns
- Wife agent content seeded: 4 references migrated (wife-profile 17K + field-log 7.5K + relationship-dynamics 36K + attraction-mastery 37K = ~98K total)
- Farmer agent knowledge seeded from Catherine's lunar farming + soil + Guanacaste climate content

### Decisions made

1. **Brain moves IN to avrystroeve.com repo** (was external at `app.avry/life/avrystroeve-website/`). Ships with Vercel deploy → chat works in prod from anywhere. Repo stays private.
2. **Each agent follows Anthropic skill schema:** `SKILL.md` + `README.md` + `references/` + `assets/` + `scripts/`. References inform thinking (loaded into context); assets are output templates; scripts are deterministic.
3. **8 agents shipped pre-content:** God (single) / Body{chef,trainer,herbalist} (multi) / Homebase{farmer} (multi, expanding) / Family{wife} (multi, expanding) / Service (single) / Finances (single, content deferred). Sub-agents emerge when content earns them.
4. **Service domain = work as service** (consulting, Journey AI Group, agency, offers, pricing, sales). Distinct from Finances (money flow) and Family (private life).
5. **Sources channel-typed (no inbox/ subfolder)** — `sources/<channel>/` IS the inbox. Two relationships: "where did this come from" (sources, by channel) + "which agent uses this" (references, per agent).
6. **Cross-agent knowledge: duplicate** the lens-specific framing into each agent's references. No shared layer. Herbalist's lunar-farming knowledge lives in herbalist (source lens) AND farmer (practitioner lens).
7. **Vercel AI SDK + Anthropic Sonnet 4.6 + prompt caching** as default agent stack. Provider-agnostic code (`src/lib/agent-tools/llm.ts`) supports Ollama swap via `LLM_PROVIDER` env var.
8. **Files in repo for unstructured agent knowledge.** DB only for structured + queryable data (chat history persistence later). Object storage for binaries when they bloat the repo.
9. **Visual whiteboards over text walls.** The Catherine distillation rebuilt twice — first as text columns, then redesigned with cards, sticky-notes, and kanban because Avry is a visual learner. This is the template for future distillations.
10. **Forward-looking wife agent framing.** Originally scoped as "current relationship" — corrected after reading existing material that the my-wife pursuit is intentional / forward-looking, not current.

### Subtractions

- Deleted `~/Developer/app.avry/life/avrystroeve-website/` (3 files: old PROJECT/HANDOFF/LOG migrated into new in-repo brain)
- Deleted `~/Developer/app.avry/life/my-wife/` (8 files migrated into new agent folder; old INDEX/HANDOFF/_archive discarded as superseded)
- Dropped `brain/sources/<channel>/inbox/` subfolder layer (was always empty, added zero signal)
- Stashed (not deleted): pre-existing WIP at `avrystroeve.com` for homepage redesign + ocean palette + AGENTS.md (saved as `wip: homepage redesign + ocean palette + AGENTS.md`)

### Gotchas surfaced

- **Ad-hoc Swift signing breaks FDA every rebuild.** macOS Full Disk Access tracks ad-hoc-signed binaries by HASH. Every `./build.sh` produces a new hash → FDA grant is technically still listed but doesn't apply. Fix this session: remove + re-add via System Settings each rebuild. Long-term fix: stable signing identity (deferred).
- **Next.js doesn't allow literal segments after catch-all routes.** Initially tried `src/app/api/agent/[...path]/chat/route.ts` — invalid because `chat` appears after `[...path]`. Restructured to single `/api/agent/chat` endpoint with `agentPath` in POST body.
- **`convertToModelMessages` in AI SDK v6 returns a Promise.** Needed `await` before spreading into messages array. Caught by TypeScript on second build attempt.
- **AI auto-titler can mis-title voice memos.** The 41-min Catherine herbalist conversation got auto-titled "cotton-and-polyester-concerns" because the OPENING topic was cotton vs polyester fabric. Bulk of content was herbalist material. Manually corrected filename during migration.
- **`/internal/whiteboards/scratch.excalidraw` initially 404'd** because file viewer called the file API first, which 404s for non-existent files. Canvas API handles missing files (returns empty scene). Fix: skip file API for `.excalidraw` paths, render CanvasView directly.
- **Anthropic API key pasted in chat** during this session. Standard hygiene: rotate before sharing repo.

### Files created

Code:
- `src/proxy.ts`, `src/app/admin/login/page.tsx`, `src/app/api/admin/auth/route.ts`
- `src/app/internal/{layout,Sidebar,FileView,ChatPanel,page,agents}.tsx,.ts`
- `src/app/internal/[...path]/page.tsx`
- `src/app/api/{brain-tree,file/[...path],canvas/[...path],agent/chat}/route.ts`
- `src/lib/agent-tools/{llm,load-agent}.ts`
- `AGENTS.md` (replaces deleted `CLAUDE.md`, symlinked back)

Brain content:
- `brain/README.md`, `brain/PLAN.md`
- `brain/sources/README.md` + 9 channel folders
- `brain/god/{SKILL,README}.md` + folders
- `brain/body/{README.md, chef/{SKILL,README}.md+folders, trainer/{SKILL,README}.md+folders, herbalist/{SKILL,README}.md+folders}`
- `brain/homebase/{README.md, farmer/{SKILL,README}.md+folders}`
- `brain/family/{README.md, wife/{SKILL,README}.md+folders}`
- `brain/service/{SKILL,README}.md` + folders
- `brain/finances/{SKILL,README}.md` + folders
- `brain/whiteboards/README.md`
- `brain/sources/voice-memos/2026-05-13-nosara-herbalist-conversation.{m4a,md}`
- `brain/body/herbalist/references/2026-05-13-nosara-apothecary-conversation.excalidraw`
- `brain/family/wife/references/{wife-profile,field-log,relationship-dynamics,attraction-mastery}.md`

### Files modified

Across 4 repos (see commit list above).

### Files deleted

- `~/Developer/app.avry/life/avrystroeve-website/` (whole dir)
- `~/Developer/app.avry/life/my-wife/` (whole dir)
- `brain/sources/<channel>/inbox/` (9 subfolders + .gitkeeps — replaced with channel-root .gitkeeps)

### Verification

- Builds clean (`npm run build` green for all phases)
- Sync verified working post-FDA-re-grant (sync log shows successful "Sync complete" entries 2026-05-16)
- Herbalist memo confirmed in new location with corrected name + content
- Build green at session end with Phase 4a chat route registered (`/api/agent/chat`)

### NOT verified

- **End-to-end chat in browser.** TypeScript compiles, route exists, useChat is wired — but neither I nor Avry clicked Send on the actual ChatPanel and saw a streaming response. First action next session.
- **Prompt caching firing correctly.** Should show `cache_read_input_tokens` > 0 on second call within 5 min. Untested.
- **Vercel production chat.** Env vars not yet added to Vercel project settings.

---

## April 17-18, 2026

**Session focus:** Vision page design + life manifesto rewrite

**What got done:**
- Resolved brain/body split inconsistencies. Brain now lives at `life/avrystroeve-website/`. Updated AGENTS.md in code repo, INDEX.md in code repo, and root INDEX.md code repos registry.
- Deleted stale `.planning/PROJECT.md` from code repo
- Created PROJECT.md with 3-layer feature architecture (vision scroll, deep pages, community platform) + timeline/history + COMPASS integration
- Spun up dev server, built 4 visual prototypes (A: glass HUD, B: full-bleed, C: hybrid, D: glass HUD + images). Landed on B as chosen direction, A kept as archive.
- Added 4 vision images to `public/vision/` (jungle house, mansion complex, jungle terrace, estate)
- Researched 15 alternative vision organization paradigms beyond hierarchical lists. Saved to `life/research/vision-organization-research.md`
- Selected The Flow as organizing principle for VISION.md, Songlines for timeline/history, Pattern Language saved for future
- Two massive brain dumps from Avry captured to `life/material/2026-04-17-vision-brain-dump.md`
- Wrote VISION-v2.md - complete manifesto rewrite with The Flow structure (God > Health > Intellectual Culture > Place > Sovereignty > Prosperity > Community > Creation) and named patterns within each section
- Shape skill interview completed (UX decisions: top sticky pills, FAB for capture, horizontal mood boards, dark/light toggle, password gate, dense reading, cookie-based auth)
- Nav component updated to hide on `/vision-*` routes
- Added scrollbar-hide CSS utility
- Added COMPASS planning dashboard as planned feature

**Decisions:** See HANDOFF.md for full list (18 key decisions)

**Files created:**
- `life/avrystroeve-website/PROJECT.md`
- `life/avrystroeve-website/HANDOFF.md`
- `life/avrystroeve-website/LOG.md`
- `life/VISION-v2.md`
- `life/material/2026-04-17-vision-brain-dump.md`
- `life/research/vision-organization-research.md`
- `~/Developer/avrystroeve.com/src/app/vision-a/page.tsx`
- `~/Developer/avrystroeve.com/src/app/vision-b/page.tsx`
- `~/Developer/avrystroeve.com/public/vision/*.jpg` (4 images)

**Files modified:**
- `~/Developer/avrystroeve.com/AGENTS.md` - brain pointer updated
- `~/Developer/avrystroeve.com/INDEX.md` - brain pointer updated
- `~/Developer/app.avry/INDEX.md` - code repos registry updated
- `~/Developer/avrystroeve.com/src/components/nav.tsx` - hide on vision routes
- `~/Developer/avrystroeve.com/src/app/globals.css` - scrollbar-hide utility added

---

## April 19, 2026

**Session focus:** VISION-v2 deep restructure - fractal sections + macro flow consolidation + session-dumps infrastructure

**What got done:**

### GOD section rewrite (5 phases)
- Replaced flat 10-pattern structure with fractal: Who I Am / What God Is / What I Believe / How I Practice / The Joy
- Voice memo agent mined 12 God-related memos, surfaced new themes: multidimensional consciousness, problems as credentials, lineage, trust + discernment, body as instrument
- Iterations: softened overreaching claims, removed "spell caster" identity line per Avry feedback, added "Mind, Body, God" bridge pattern
- Death Is a Doorway reframed with "Play the Infinite story"
- Words Are Maps simplified to core declaration + AR glasses metaphor

### HEALTH → BODY rewrite (3 phases)
- Renamed section. Stripped to Who I Am / What I Do / The Inner Environment
- Removed "What Surrounds Me" phase (moved to HOME BASE > The Land)
- Removed "The Mind" phase (consciousness moved to GOD)
- Voice memo agent mined 13 health-related memos, surfaced: Ayurveda framework (Shinah), body-as-antenna model (Dean), supplement stack precision, fat vs processed sugar distinction
- Tightened "Fats Over Processed Sugars" pattern to nuanced frame (not keto overstatement)

### HOME BASE creation (6 phases - absorbed PLACE + SOVEREIGNTY)
- New section name from PLACE. 5 phases + Who I Am
- Voice memo agent mined 15 location-related memos, surfaced: Garza + Flamingo as CR sub-locations, geopolitical positioning thesis, responsible development concerns, vendor texture, Nosara Is Calling platform
- Added Farmers + Government Connections patterns to The People
- Added new Family phase between The People and The Houses (absorbs old Community > Family content + "we are all one source" threading)
- Integrated local source content from life/places/costa-rica/VISION.md, florida/VISION.md, methodology.md
- Expanded deep roots identity to "Costa Rica, Colombia, and Florida" (trio, not just CR)
- Changed "geographic diversification" → "geopolitical resilience"
- Added "I am a land steward" identity
- Updated Compound as Vision: replaced "twenty supercars" with "friends' cars" / replaced "gated entry" with "gate at the entry"

### PROSPERITY rewrite + absorption (8 phases)
- Initial rewrite (5 phases): Who I Am / What I Believe / What I Offer / How I Work / The Mission
- Voice memo agent mined 16 prosperity-related memos, surfaced: two vehicles model, money flywheel concept, nonprofit mission, creative services vision, abundance mindset, life is motion
- Added CREATION merger: new "What I Make" phase (Ecosystem, Writings and Songs, Software and Tools, The Bridge)
- Added INTELLECTUAL CULTURE merger: new "What I Learn" phase (Self-Education, Open Mind, Get Clear, Visualization, Ancient Wisdom Applied)
- Added COMMUNITY events/hosting merger: new "How I Gather" phase (Gatherer, Generosity First, Be the Connector, Earn the Room, Only Upgrade, Always Ask for Referrals, Cast Nets Play Ping Pong, Teaching the Next Generation, Open World Gatherings)
- Added etymology: `pro` + `spes` = "hope moving forward" + Sanskrit Shri + Greek eudaimonia + (See docs for more.)
- Thesis refined from "prompting wins" to "adoption creates what has never been seen"
- Added The flow always provides principle
- Added Life is motion identity declaration
- Expanded The Mission with money flywheel + 7 transformation domains + What I Want the World to Be content
- Cross-refs updated for all renames

### Sections deleted (all content absorbed)
- SOVEREIGNTY (H2 section removed - content in HOME BASE)
- INTELLECTUAL CULTURE (H2 section removed - content in PROSPERITY)
- CREATION (H2 section removed - content in PROSPERITY)
- COMMUNITY (H2 section removed - content split to HOME BASE + PROSPERITY)

### Session-dumps directory infrastructure
- Created `conversations/session-dumps/` with `inbox/` subdirectory matching voice-memos architecture (voice-memos, fathom-calls, iphone-call-recordings all use `inbox/`)
- Created SCHEMA.md (YAML frontmatter schema based on voice-memos schema, simplified)
- Created INDEX.md (purpose, structure, cross-references to related conversation directories)
- Moved `life/material/2026-04-17-vision-brain-dump.md` → `conversations/session-dumps/inbox/2026-04-17-vision-brain-dump.md`
- Captured 3 new brain dumps from today's session
- Renamed from initial "chat-sessions" to "session-dumps" per Avry preference

### Sources table
- Added 12 GOD voice memo sources with full paths
- Added 10 BODY voice memo sources with full paths (renamed HEALTH → BODY tags)
- Added 1 HOME BASE combined tag + 6 PLACE-mapped voice memos (renamed PLACE → HOME BASE)
- Added 4 brain dump file paths (the Apr 17 + 3 from Apr 19)
- Added Session 54 file path (creative-studio/material/breathwork-vision-march-12.md)
- Added Future Biographers 2026 HTML archive path
- Added Wild Minds Community external reference

### Cross-references fixed
- HEALTH → BODY throughout
- PLACE → HOME BASE throughout
- SOVEREIGNTY references removed/redirected
- "foundation of God, health, place, and sovereignty" → "foundation of God, Body, and Home Base" (then expanded to include Community and Family)
- HANDOFF.md path updated for moved brain dump file

**Decisions:** See HANDOFF.md for full list (17+ decisions this session)

**Files created:**
- `conversations/session-dumps/SCHEMA.md`
- `conversations/session-dumps/INDEX.md`
- `conversations/session-dumps/inbox/2026-04-19-macro-flow-restructure.md`
- `conversations/session-dumps/inbox/2026-04-19-home-base-additions.md`
- `conversations/session-dumps/inbox/2026-04-19-prosperity-vehicles-money-flywheel.md`

**Files moved:**
- `life/material/2026-04-17-vision-brain-dump.md` → `conversations/session-dumps/inbox/2026-04-17-vision-brain-dump.md`

**Files modified:**
- `life/VISION-v2.md` - major restructure (most of the session's work)
- `life/avrystroeve-website/HANDOFF.md` - full rewrite with current state + methodology
- `life/avrystroeve-website/LOG.md` - this entry

**Files still at decision points:**
- `life/VISION.md` - still the primary (old Flow structure), waiting for VISION-v2 to be approved and promoted
- `life/VISION-v2.md` - CHARACTER section deferred (undecided: delete / distribute / keep as closing)

**Next session priorities:**
1. Full top-to-bottom read of VISION-v2 for rhythm/flow/voice issues
2. Decide CHARACTER section fate
3. Consider tightening PROSPERITY if 8 phases feels too dense
4. Lock VISION-v2 as final + decide when to promote to VISION.md
5. Pivot to building /vision page on avrystroeve.com

**Methodology captured in HANDOFF for next session:** Research-first, section-by-section, voice memos + local sources (NOT consulting/OFFER.md), fractal phase structure, absorb before delete.

---

## April 21, 2026

**Session focus:** VISION-v2 sweep session - purpose/audience reframe + GOD section restructure

**What got done:**

### Manifesto purpose + website integration (foundational decisions)
- Captured big pivot: manifesto shifts from private daily-read tool to public-facing homepage on avrystroeve.com
- Locked title: drop "The Avry Stroeve Manifesto" header entirely on the site (opening line carries it); file stays VISION.md internally
- Locked public/private split: VISION.md (manifesto) = public homepage with identity/vision/beliefs only. COMPASS.md = private planning layer with action items per section.
- Locked admin dashboard architecture: separate gated route (like /compass or /dashboard), NOT an overlay on the manifesto page. Mirrors manifesto section structure. Manifesto page stays sacred/pure.
- Locked data flow: COMPASS.md is source of truth. Website dashboard READS from COMPASS.md. Markdown stays master, website is a view.
- New filter rule for VISION-v2 content: "identity/vision/belief -> manifesto. Execution/todo/cycle -> COMPASS."
- Created `conversations/session-dumps/inbox/2026-04-19-manifesto-purpose-and-website-integration.md` capturing all above decisions + content staged for BODY section

### GOD section deep restructure (fractal pattern reworked)
- Renamed sub-phases and reordered. New flow: (italic opener) -> Who I Am -> How I Consciously Know God -> Contemplations -> What I Believe -> How God Made the Universe -> The Joy
- **"What God Is" H3 heading DROPPED.** Replaced by opening paragraph (Avry's dictated names-of-God text: Christ, Jesus, Allah, Dios, Yaweh, Adonai, Elohim, El Shaddai, Father, Jehovah, The Merciful, The Creator, The King, Brahman, Vishnu, Shiva, Krishna, Bhagavan, Waheguru, Ek Onkar, Akal Murat, Ahura Mazda, Bahá, Shangdi, Tian, Aten, Divine Father, Divine Mother, Infiniteness). User subsequently split into two paragraphs + removed italic wrapper.
- **"How I Practice" renamed to "How I Consciously Know God"** (user renamed further to "The Ultimate Goal Of Life Is To Consciously Know God"). Content consolidated around meditation as THE practice: Morning and Night, Energization/Hung Sau/Aum, The Sources (Yogananda/SRF/Surrender Experiment), Mind Body God bridge.
- **Contemplations phase created.** Absorbed "Tracing Back to Source" (banana paragraph + Scale Up + divine will) moved from What God Is. Absorbed "Words Are Maps, Not Territory" (AR glasses metaphor) moved from What I Believe.
- **"How God Made the Universe" phase created.** Absorbed cosmology patterns from old What God Is: Sky Is a Clock, Sacred Geometry, Dimensions, We Are Part of Nature.
- **What I Believe tightened.** Now holds 6 principles: Vision and Surrender, Flow Knows Better, Trust and Discernment, Problems Are Credentials, Lineage, Death Is a Doorway.
- **The Joy** phase untouched.

### Content staged for BODY section
- "Sun, Breath, Outdoors" pattern removed from GOD
- "The Body as Instrument" pattern removed from GOD
- Both staged in brain dump file under "Content Staged for BODY Section" for reintegration when BODY is rewritten next session

**Decisions:** See HANDOFF.md for full list

**Files created:**
- `conversations/session-dumps/inbox/2026-04-19-manifesto-purpose-and-website-integration.md` (covers purpose pivot, title, admin dashboard, COMPASS integration, BODY staging content)

**Files modified:**
- `life/VISION-v2.md` - GOD section fully restructured (7 phases, 2 absorptions, 2 renames). User post-edited opener formatting and phase name.
- `life/avrystroeve-website/HANDOFF.md` - added 4 locked decisions + brain dump reference + next-session priorities
- `life/avrystroeve-website/LOG.md` - this entry

**Files still at decision points (carried from previous session):**
- Character section fate still deferred (delete / distribute / keep as closing)
- PROSPERITY tightening still open (8 phases - dense but functional)
- VISION-v2 -> VISION.md promotion still pending

**Next session priorities:**
1. Continue section-by-section sweep starting with BODY (integrate staged Sun/Breath/Outdoors + Body as Instrument content from brain dump)
2. Then HOME BASE, then PROSPERITY, then Character decision
3. Apply filter rule throughout: "identity/vision/belief -> manifesto. Execution/todo/cycle -> COMPASS."
4. Any content that's really action/execution gets flagged for migration to COMPASS.md
5. After all sections locked: drop top-of-file title line, promote VISION-v2 -> VISION.md, pivot to /vision page build on avrystroeve.com

---

## May 13, 2026

**Session focus:** Timeline canonicalization + bio source creation + website content-source wiring

**What got done:**

### TIMELINE.md established as canonical life timeline
- Moved `app.avry/creative-studio/avry-timeline.md` -> `app.avry/life/TIMELINE.md` (renamed uppercase to match life/ top-level convention alongside VISION.md, HANDOFF.md, INDEX.md)
- Live pointers updated: `creative-studio/INDEX.md`, `creative-studio/PLAN.md`, `life/my-wife/my-wife.md`
- Historical references in LOG.md and `_archive` intentionally left alone (append-only history)
- Substantially extended this session with new career detail:
  - 2025 Evolute Solutions: managed cold-calling team, main appointment setter, ad design, Meta campaign launch, GHL CRM buildout, automations
  - Aug 2025 Ben's startup: cold email pipeline for SaaS + custom AI automation arm
  - Nov 2025: custom side shut down, kicked off 4-month Claude Code software immersion
  - Feb 2026: parted ways with co-founder
  - Feb-Mar 2026: location criteria -> 40-minute Claude research run -> answer was Nosara -> booked flight
  - 2026 onward: Journey AI Group with Ivo, AI Systems and Automation agency
- Added status banner at top flagging the file as incomplete with explicit gaps to amend (pest control + IG DM detail, Journey AI Group founding, Nosara arrival, year-gaps)

### TIMELINE.md symlinked into website code repo
- Symlink: `~/Developer/avrystroeve.com/src/content/TIMELINE.md` -> `~/Developer/app.avry/life/TIMELINE.md`
- Rationale: matches AGENTS.md architecture comment "Content source: ~/Developer/app.avry/life/". Single source of truth. Website can now import the canonical timeline directly without duplication.
- Supports the planned Timeline / History section already on PROJECT.md roadmap (Songlines-inspired, life as a journey through places)

### bio.md created at app.avry/life/bio.md
- Long-form (~245 words) third-person career-forward bio modeled after Ivo's bio (Journey AI Group team page)
- Locked draft v3 dated 2026-05-13
- Closes with "God First" signature line
- Source for `/about` page (avrystroeve.com), Journey AI Group team page, podcast intros, LinkedIn
- Variants to draft next: short (60w), first-person, one-liner, tagline (listed at bottom of bio.md)

**Files created:**
- `app.avry/life/bio.md` (locked draft v3, frontmatter + ~245-word third-person bio)

**Files moved + extended:**
- `app.avry/creative-studio/avry-timeline.md` -> `app.avry/life/TIMELINE.md` (moved, renamed, substantially extended with 2025+ career arc)

**Files modified:**
- `app.avry/creative-studio/INDEX.md` - pointer update to new TIMELINE path
- `app.avry/creative-studio/PLAN.md` - pointer update to new TIMELINE path
- `app.avry/life/my-wife/my-wife.md` - pointer update to new TIMELINE path
- `app.avry/life/avrystroeve-website/PROJECT.md` - Timeline section status updated to "content source ready, page implementation pending" + new About Page section added with bio.md source
- `app.avry/life/avrystroeve-website/HANDOFF.md` - new Next Actions added (amend TIMELINE, build /timeline, build /about, draft bio variants)
- `app.avry/life/avrystroeve-website/LOG.md` - this entry

**Symlinks created:**
- `~/Developer/avrystroeve.com/src/content/TIMELINE.md` -> `~/Developer/app.avry/life/TIMELINE.md`

**Decisions made:**
- (!) TIMELINE.md lives at `life/` top level (uppercase, peer to VISION.md/HANDOFF.md/INDEX.md), not under any subfolder. Canonical life timeline is a life-root artifact.
- (!) Symlink (not copy) is the integration pattern between brain artifacts in app.avry/life/ and the website code repo. Single source of truth; website is a view. Same architectural principle already locked for VISION/COMPASS.
- (!) bio.md is one file with multiple draft variants. Current variant is the long-form third-person career bio. Future variants (short, first-person, one-liner, tagline) will be tracked in the same file under labeled sections rather than separate files.

**Gotchas surfaced:**
- When moving artifacts between trees (creative-studio -> life), only update LIVE pointers. Leave historical references in LOG.md and _archive/ alone since those files are append-only history of past state.
- Symlinks across the app.avry / avrystroeve.com boundary work fine because both repos live under `~/Developer/`. If avrystroeve.com is ever cloned to a different machine without app.avry alongside, the symlink will break. Build/deploy pipelines need to either (a) read the file at build time from the symlink target (works on dev machine), or (b) copy at deploy time. Decide before first build that consumes TIMELINE.

**Files still at decision points (carried from previous session, unchanged):**
- VISION-v2 sweep still mid-flight: BODY, HOME BASE, PROSPERITY sections still need sweep
- Character section fate still deferred
- VISION-v2 -> VISION.md promotion still pending

**Next session priorities:** see HANDOFF.md (now split between vision-sweep continuation and new website-content-source follow-ups)

**Subtractions:**
- None this session. The session was purely additive (new artifacts + new pointers). Will run a subtraction pass next session against PROJECT.md "Out of Scope" and "Open Research Questions" lists to see what's stale.
