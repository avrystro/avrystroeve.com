# avrystroeve.com - Handoff

## Last Session: May 13, 2026 (TIMELINE canonicalization + bio source + website content-source wiring)

### What Happened

Three artifacts established that the website will consume:

1. **TIMELINE.md** moved from `creative-studio/avry-timeline.md` -> `life/TIMELINE.md` (canonical life timeline at life/ top level). Substantially extended with the 2025+ career arc (Evolute Solutions, Ben's startup, Claude Code immersion, Feb 2026 co-founder split, Nosara research run, Journey AI Group with Ivo). Status banner at top flags it as incomplete with explicit gaps to amend.
2. **Symlink** at `~/Developer/avrystroeve.com/src/content/TIMELINE.md` -> `~/Developer/app.avry/life/TIMELINE.md`. Single source of truth, website is a view.
3. **bio.md** created at `app.avry/life/bio.md` -- locked draft v3, ~245-word third-person career bio, modeled after Ivo's bio, "God First" closing. Source for `/about`, Journey AI Group team page, podcast intros, LinkedIn.

PROJECT.md updated: Timeline / History section now marked "content source ready, page implementation pending." New About Page section added with bio.md as source.

### New Next Actions (from this session)

1. **Amend TIMELINE.md** with the four explicit gaps flagged in the status banner:
   - Pest control door-to-door + Instagram DM appointment setting for social media influencers (when, where, for whom)
   - Journey AI Group founding story with Ivo (how it came together, what each brings, the offer)
   - Nosara arrival and on-the-ground build (housing, first weeks, who he met, current rhythm)
   - Any remaining year-gaps where the chronology jumps
2. **Build the `/timeline` page** in the website to consume `src/content/TIMELINE.md`. Decide: standalone page or section within `/vision`. Songlines-inspired visual treatment (map-based or horizontal scroll through places). Likely password-gated initially since timeline contains personal detail.
3. **Build the `/about` page** in the website using `app.avry/life/bio.md` as source. Public page. Visual treatment: clean, sacred-space aesthetic consistent with rest of site. Decide whether to include a portrait photo and which one.
4. **Draft the remaining bio variants** in `app.avry/life/bio.md`:
   - Short (~60 words) - for podcast guest intros, conference bios, where space is tight
   - First-person - for personal site About in author voice (vs the third-person institutional voice)
   - One-liner - for social media bios, headers
   - Tagline - for hero sections, email signatures
5. **Decide symlink-vs-build-copy strategy** before first website build consumes TIMELINE. Currently the symlink works on Avry's dev machine because both repos live under `~/Developer/`. If avrystroeve.com is cloned to a deploy host without app.avry alongside, the symlink breaks. Two options:
   - (a) Bake a build step that copies the file from the symlink target into the repo at build time (works if both checkouts exist on the build host).
   - (b) Migrate to copy-on-edit with a script that syncs `app.avry/life/TIMELINE.md` -> `avrystroeve.com/src/content/TIMELINE.md` whenever the source changes. Sacrifices the "live edit" feel for deploy portability.
   - Recommended: defer until first deploy. Local dev works fine today via symlink.

### Existing Next Actions (carried — VISION-v2 sweep, unchanged)

These remain the primary work-in-progress thread. Timeline + bio + about work above can happen in parallel or interleaved — they don't block the VISION sweep.

---

## Previous Session: April 21, 2026 (VISION-v2 sweep - purpose reframe + GOD restructure)

### What Happened

Big foundational session on the sweep. Two major threads:

**1. Manifesto purpose reframed from private to public.** Locked the public/private split, dropped the title, designed the admin dashboard architecture, established COMPASS as the data source for the action-items layer. See brain dump for full detail.

**2. GOD section fully restructured.** New fractal: italic opener -> Who I Am -> How I Consciously Know God -> Contemplations -> What I Believe -> How God Made the Universe -> The Joy. "What God Is" H3 dropped (opening paragraph absorbs it). "How I Practice" renamed. Contemplations phase created. "How God Made the Universe" phase created. Sun/Breath/Outdoors and Body as Instrument staged for BODY section.

### Current State of VISION-v2

**Macro flow (locked):**

```
1. GOD         (7 phases: [opener] / Who I Am / How I Consciously Know God / Contemplations / What I Believe / How God Made the Universe / The Joy) ✅ SWEPT
2. BODY        (3 phases: Who I Am / What I Do / The Inner Environment) - NEXT, needs Sun/Breath + Body as Instrument reintegrated from brain dump staging
3. HOME BASE   (6 phases: Who I Am / The Land / The People / Family / The Houses / The Rotation)
4. PROSPERITY  (8 phases: Who I Am / What I Believe / What I Learn / What I Make / What I Offer / How I Work / How I Gather / The Mission)
5. Character   (deferred - undecided, still in file)
6. Sources
```

**Consolidations:**
- HEALTH → BODY (stripped What Surrounds Me and The Mind phases)
- PLACE + SOVEREIGNTY → HOME BASE (sovereignty now a principle, not a standalone section)
- INTELLECTUAL CULTURE deleted → absorbed into PROSPERITY (What I Learn + What I Believe)
- CREATION deleted → absorbed into PROSPERITY (What I Make + The Mission)
- COMMUNITY deleted → split: people content into HOME BASE (People + Family), hosting/events content into PROSPERITY > How I Gather

### What's Left for Next Session

1. **BODY section sweep (next up).** Start here. Re-integrate Sun/Breath/Outdoors + Body as Instrument content staged in the brain dump file (`conversations/session-dumps/inbox/2026-04-19-manifesto-purpose-and-website-integration.md` > "Content Staged for BODY Section"). Apply filter rule: identity/vision/belief -> stays. Execution/todo/cycle -> flag for COMPASS.md migration.
2. **HOME BASE sweep.** Same process.
3. **PROSPERITY sweep.** Same process. Consider tightening (currently 8 phases - dense).
4. **Decide CHARACTER section fate.** Avry leaned "not keeping" but deferred. Options:
   - (a) delete + distribute key identity statements to existing sections' Who I Am phases
   - (b) keep as closing signature (like Bezos's Day 1 closings)
   - (c) selectively merge specific character lines into other sections
5. **Final polish on GOD.** Full read in VS Code checking for voice, rhythm, any duplicates from rapid iteration. User may further tune H3 phase names (already renamed "How I Consciously Know God" -> "The Ultimate Goal Of Life Is To Consciously Know God").
6. **Lock VISION-v2 -> VISION.md.** Replace VISION.md with v2 content. Drop the title line at top of file (line 1 currently "# The Avry Stroeve Manifesto" - decision locked to remove entirely on website).
7. **Pivot to building /vision page** on avrystroeve.com after VISION is locked. Prototypes exist at /vision-a (archive) and /vision-b (chosen direction, full-bleed). Vision images already in `public/vision/`.

### Known Tensions

- PROSPERITY is the largest section (8 phases). Probably fine but watch reader fatigue during full read-through.
- CHARACTER undecided.
- VISION.md (old, original Flow structure) and VISION-v2.md (new fractal structure) both exist. Consolidation decision pending.

---

## Methodology for Next Session (How We Worked)

The research-first, section-by-section approach. Next session should follow this same pattern for any further rewriting.

### Rule 1: Research before design, one section at a time

For each section rewrite:

1. **Read current state** of the section in VISION-v2.md
2. **Spawn Explore agent in background** to mine voice memos for that section's themes. Prompt template:
   ```
   Source: conversations/voice-memos/inbox/ (837 memos with YAML frontmatter)
   Reference: conversations/voice-memos/SCHEMA.md + vocabulary.md for canonical tags
   Pattern: grep by topic tags relevant to the section → judge quality → return 10-20 best memos with full paths + missing-theme analysis (what themes does Avry talk about repeatedly that are NOT yet in v2?)
   ```
3. **Read local sources in parallel** while the agent works:
   - GOD themes → `life/material/`, `life/research/`, `life/ancient-wisdom/`, `life/revival-of-wisdom/`
   - BODY → `life/body/health.md`, `life/body/VISION.md`
   - HOME BASE → `life/places/INDEX.md`, `life/places/{location}/VISION.md`, `life/places/methodology.md`
   - PROSPERITY → `conversations/voice-memos/`, `conversations/session-dumps/`, recent client conversations. **Do NOT look at `consulting/OFFER.md`** - it's old and not current thinking. If context is needed about current client work, check `consulting/{ClientName}/` directories but prefer raw voice memos and session dumps.
   - FAMILY / COMMUNITY themes → `conversations/voice-memos/`, relevant tagged memos
4. **Wait for agent to return** (it will notify)
5. **Diagnose current section** - identify what content types are mixed (identity vs principles vs practice vs cosmology) and what's missing
6. **Propose fractal structure** with voice memo sources noted
7. **Get Avry's explicit approval** on the structure before executing. Do not execute unapproved rewrites.
8. **Execute rewrite** via Edit tool (preserving Avry's voice - his specific words where possible)
9. **Update Sources table** with full file paths to all voice memos used (tag by section: GOD / BODY / HOME BASE / PROSPERITY)

### Rule 2: Capture Avry's brain dumps as files

When Avry shares a substantive idea/input/thinking-out-loud dump:

1. Save to `conversations/session-dumps/inbox/YYYY-MM-DD-descriptive-title.md`
2. Include YAML frontmatter per `conversations/session-dumps/SCHEMA.md` (type, date, source, status, mode, people, places, topics, mood, speakers, summary, projects)
3. Add an entry to VISION-v2.md Sources table with the file path
4. Cross-reference other related dumps at the bottom of each file

This ensures brain dumps never get lost to chat history.

### Rule 3: Structural moves = absorb first, then delete

- Content is ABSORBED into destination sections BEFORE source sections are deleted
- Update cross-references immediately (HEALTH → BODY, PLACE → HOME BASE, SOVEREIGNTY → absorbed into HOME BASE, etc.)
- Keep Avry's specific words where possible - rewrite only for structural clarity

### Rule 4: Each section uses the fractal pattern

Each top-level H2 section should have H3 phases following a consistent shape:
- **Who I Am** - identity declarations (punchy, present-tense, "I am X")
- **What I Believe** - principles (the lens through which I operate)
- Contextual middle phases specific to the section
- **What I Do / How I Practice / How I Work** - active practices and methods
- Closing phase (The Mission / The Joy / bridge to next section)

### Rule 5: One section at a time

Don't rewrite multiple sections in parallel. Complete one, get approval, move to next. Research → Structure → Execute → Approve → Next section.

### Rule 6: Present tense, identity-based, grounded

Matches `life/research/vision-structure-research.md` findings (Bezos, Dalio, Yogananda patterns). "I am" / "I will." Never "I hope" / "I might." Specific over vague. Sensory-rich where possible.

### Rule 7: No em dashes

Single hyphens only. Always.

---

## Context Files (load these to pick up)

**Brain:**
- `life/avrystroeve-website/PROJECT.md` - full project spec
- `life/avrystroeve-website/HANDOFF.md` - this file
- `life/avrystroeve-website/LOG.md` - session history

**The Manifesto:**
- `life/VISION-v2.md` - current manifesto (GOD → BODY → HOME BASE → PROSPERITY → Character → Sources)
- `life/VISION.md` - old vision (still primary until v2 promoted)

**Brain Dumps (for VISION-v2 context):**
- `conversations/session-dumps/inbox/2026-04-17-vision-brain-dump.md` - initial vision dumps (Session 82)
- `conversations/session-dumps/inbox/2026-04-19-macro-flow-restructure.md` - macro flow restructure decisions
- `conversations/session-dumps/inbox/2026-04-19-home-base-additions.md` - HOME BASE content + Wild Minds Community inspiration
- `conversations/session-dumps/inbox/2026-04-19-prosperity-vehicles-money-flywheel.md` - PROSPERITY vehicles + money flywheel
- `conversations/session-dumps/inbox/2026-04-19-manifesto-purpose-and-website-integration.md` - **READ WHEN BUILDING THE WEBSITE.** Purpose shift (private -> public), title question, public-manifesto vs private-planning split, admin dashboard concept, action items layer design

**Research:**
- `life/research/vision-structure-research.md` - how world-class leaders structure visions
- `life/research/vision-organization-research.md` - 15 paradigms (Songlines, Pattern Language, Mandala, etc.)

**Voice memos:**
- `conversations/voice-memos/inbox/` - 837 memos, tagged with YAML frontmatter
- Schema: `conversations/voice-memos/SCHEMA.md`
- Vocabulary: `conversations/voice-memos/vocabulary.md`

**Session dumps (new infrastructure):**
- `conversations/session-dumps/` - chat session brain dumps
- Schema: `conversations/session-dumps/SCHEMA.md`
- Shares vocabulary with voice-memos

**Body (code repo):**
- `~/Developer/avrystroeve.com/` - Next.js 16, Tailwind 4, MDX, PostHog
- `/vision-b` prototype is the chosen direction (full-bleed expansive layout)
- `/vision-a` prototype kept as archive (glass HUD)
- Vision images at `public/vision/` (jungle-house.jpg, mansion-complex.jpg, jungle-terrace.jpg, estate.jpg)

---

## Key Decisions (All Sessions)

### April 19, 2026 (sweep session - purpose + website integration)

- (!) **Title dropped.** No "The Avry Stroeve Manifesto" header. On the website, no visible title above content - opening line carries it. File stays named `VISION.md` internally. Page title/SEO meta can still say "Manifesto" if needed technically.
- (!) **Public/private split locked.** VISION.md (manifesto) = fully public homepage, identity+vision+beliefs only. COMPASS.md = private planning layer with action items per section. Filter rule: identity/vision/belief -> manifesto. Execution/todo/cycle -> COMPASS.
- (!) **Admin dashboard = separate gated route.** Not an overlay on the manifesto page. Route like `/compass` or `/dashboard`, password-gated, mirrors manifesto structure (GOD / BODY / HOME BASE / PROSPERITY) with action items inside each. Manifesto page stays sacred/pure. Dashboard = operator tool.
- (!) **COMPASS.md is source of truth for dashboard.** Website dashboard READS from COMPASS.md. Markdown stays master; website is a view. Updates flow: edit COMPASS.md locally -> dashboard reflects it. No duplicated state.

### April 19, 2026 (v2 deep restructure)

- (!) **Macro flow: GOD → BODY → HOME BASE → PROSPERITY → Character** (Character TBD)
- (!) **Each section uses fractal H3 phase structure** (Who I Am / What I Believe / How I... / etc.)
- (!) **IC, CREATION, COMMUNITY folded into PROSPERITY** as phases (What I Learn, What I Make, How I Gather)
- (!) **SOVEREIGNTY folded into HOME BASE** as a principle throughout (no standalone section)
- (!) **Family is its own phase in HOME BASE** (not a standalone section)
- (!) **HEALTH → BODY, PLACE → HOME BASE** renames
- (!) **Mind is consciousness = GOD's territory** (not BODY)
- (!) **Visualization moved from GOD to PROSPERITY > What I Learn** (it's goal-setting, not communion)
- (!) **Prosperity etymology**: `pro` (forward) + `spes` (hope) = "hope moving forward." Not just money. Includes Sanskrit Shri + Greek eudaimonia.
- (!) **Two vehicles = Journey AI Group + Nosara Is Calling** (both co-founded with Ivo Villalobos)
- (!) **Money flywheel**: revenue → home base community upgrades across 7 domains (land/food, energy, finance, government, construction, water, education)
- (!) **Thesis refined**: "Adopting AI tools is the most valuable skill of our generation. Those who adopt them will create things humans have never seen." (Replaces "prompting wins")
- (!) **The flow always provides** added as a core PROSPERITY belief (abundance, serve from sufficiency)
- (!) **Life is motion / make moves** added to identity declarations
- (!) **chat-sessions renamed to session-dumps** with `inbox/` subdirectory matching voice-memos architecture
- (!) **Brain dumps ALWAYS get file paths in Sources tables** (for traceability)
- (!) **Don't reference consulting/OFFER.md in research** (it's old - use voice memos + session dumps + specific client directories instead)
- (!) **No em dashes** - confirmed again (single hyphens only)

### April 17-18, 2026 (previous session - The Flow origin)

1. Brain lives in `life/avrystroeve-website/` - website is an extension of life/
2. The Flow organizing principle for VISION.md (original order: God > Health > IC > Place > Sovereignty > Prosperity > Community > Creation - now restructured)
3. Songlines for future timeline/history section on website
4. Pattern Language saved as possible future organization
5. Option B (full-bleed) chosen for vision scroll page
6. Option A (glass HUD) kept as archive
7. Password: "Infinity", remembered per device via cookie
8. Bot protection: robots.txt + meta noindex + X-Robots-Tag + not in sitemap
9. Dark/light mode toggle on vision page
10. FAB for capturing text/voice/images/video, tagged to sections or general inbox
11. AssemblyAI for voice memo transcription (future: local models in native app)
12. Supabase for storing captured media
13. Horizontal mood boards per section (vertical rejected)
14. Strategy/execution stays in COMPASS.md (separate from manifesto)
15. Life Design Questions removed from manifesto - separate file
16. COMPASS planning dashboard added as planned feature
17. No em dashes

---

## Next Session Start Prompt

```
Read life/avrystroeve-website/HANDOFF.md and life/avrystroeve-website/LOG.md for full context.

Two tracks open:

TRACK A (primary, mid-flight): VISION-v2 sweep continuation.
TRACK B (new, additive): Timeline + About + bio variants - content sources exist at life/TIMELINE.md and life/bio.md, page implementation and content amendments pending. See "New Next Actions" section in HANDOFF.

Pick one to work on. Default to Track A unless Avry wants the website-build moment.

For Track A:
Also read conversations/session-dumps/inbox/2026-04-19-manifesto-purpose-and-website-integration.md - it contains:
- 4 locked decisions on public/private architecture and admin dashboard
- Content staged for BODY section (Sun/Breath/Outdoors + Body as Instrument - pulled from GOD during last sweep)

GOD section has been swept. Continue with BODY next.

For BODY:
1. Read current state of BODY section in life/VISION-v2.md (starts around line 101)
2. Spawn Explore agent to mine voice memos for BODY themes if needed (see Methodology > Rule 1)
3. Re-integrate staged content from brain dump (Sun/Breath/Outdoors + Body as Instrument)
4. Apply filter rule: "identity/vision/belief -> manifesto. Execution/todo/cycle -> flag for COMPASS.md."
5. Propose fractal structure. Get Avry's approval before editing.
6. Execute rewrite via Edit tool.

Then proceed to HOME BASE, PROSPERITY, Character decision in that order.

Only after all sections locked: drop the top-of-file title line, promote VISION-v2 -> VISION.md, pivot to building the /vision page on avrystroeve.com.

Methodology: one section at a time. Research first (voice memos + local sources, NOT consulting/OFFER.md). Propose structure. Get approval. Execute. Capture any brain dumps as files in conversations/session-dumps/inbox/.
```
