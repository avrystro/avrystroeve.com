# avrystroeve.com — Personal AI Brain + Community Education Platform

## What This Is

avrystroeve.com is a dual-surface product:

1. **Front (public):** Personal brand site, blog, vision scroll, deep pages with AI chat per life domain, eventually a paid community + education platform. The "art piece" that funnels all social channels into one owned destination. Not Skool, not Whop — custom-built, fully owned.
2. **Back (private, gated):** Admin dashboard at `/internal/*` containing Avry's personal AI brain — 8 specialist agents (God, Body chef/trainer/herbalist, Homebase farmer, Family wife, Service, Finances), each with their own SKILL.md + knowledge base, all chattable via streaming Claude API.

Both surfaces share the same Next.js codebase and brain folder. The admin dashboard is operational TODAY (Phase 4a shipped 2026-05-16). The public-facing community platform features below remain the long-term vision.

## Current State (2026-05-16) — Admin Dashboard + Brain ✅ OPERATIONAL

**Built and working:**
- Cookie-based auth gate (`ADMIN_PASSWORD`) protecting `/admin/*` + `/internal/*` + all brain APIs
- Sidebar mirroring full brain filesystem at `/internal`
- Markdown file viewer, directory browser, Excalidraw whiteboard editor (live save)
- "Whiteboard (scratch)" quick-launch + "Save as new" workflow
- 8 specialist agents scaffolded with real SKILL.md + references:
  - **God** (single agent) — spiritual companion
  - **Body** — Chef, Trainer, Herbalist (multi-agent)
  - **Homebase** — Farmer (multi-agent, expanding)
  - **Family** — Wife (multi-agent, expanding)
  - **Service** — single agent (work as service: consulting, JAG)
  - **Finances** — single agent (content scoping deferred to Phase 5)
- Chat wired up via Vercel AI SDK + Anthropic (Sonnet 4.6 default) with prompt caching enabled — 90% off on cache hits
- Sync infrastructure (voice-memo-pipeline, fathom-sync, conversation-pipeline, conversations-directory routing agent) repointed to write captures into `brain/sources/`
- First real distillation shipped: 41-min herbalist conversation with Catherine (sacredfarm.com) → herbalist whiteboard + farmer agent knowledge seeded
- Wife agent has ~98KB of migrated content (wife-profile + field-log + relationship-dynamics + attraction-mastery) ready for chat

**Architecture:** see `brain/PLAN.md` for the full phased plan (Phases 0–5). All phases 0, 1, 1.5, 1.6, 1.7, 1.8, 2, 3, 4a shipped. Phases 4b (filesystem write tools), 4c (Google Calendar), 5 (financial content scoping) pending.

## Brain / Body Split (UPDATED 2026-05-16)

**Previous (April–May 13):** Brain lived OUTSIDE the website code repo at `~/Developer/app.avry/life/avrystroeve-website/`. Three small markdown files (PROJECT/HANDOFF/LOG). Body was the Next.js repo.

**Current:** Brain lives INSIDE the repo at `~/Developer/avrystroeve.com/brain/`. Ships with Vercel deploy. Agents read from it at chat time. The repo IS the single source of truth — code + brain + content together. The repo MUST stay private (contains personal data, agent profiles, financial info eventually).

Content source: still `~/Developer/app.avry/life/` for material not yet migrated (VISION.md, TIMELINE.md, places/, etc.). Migration is progressive per Avry's preference — only move material when it has a clear home in the new brain.

## Core Value

Two layers:

1. **Avry's personal use (operational TODAY):** A private admin dashboard giving him 8 specialist AI agents he can talk to from anywhere — about his body, his wife pursuit, his finances, his spiritual life, his work, his growing/homebase plans. Files captured by voice memo, fathom call, and other sources land in the brain automatically and inform the agents.
2. **Public-facing (long-term vision below):** People pay to access gated content, courses, and community — on Avry's domain, with Avry's brand, building Avry's SEO equity. The deep-page chat experience for the public site reuses the same agent infrastructure proven by the admin dashboard.

## Features

### Layer 1: Vision Scroll (ACTIVE -- designing now)

Password-protected, bot-hidden page at `/vision`. One long continuous manifesto organized as **The Flow** -- everything flows from one source (God), branching outward:

**God** (the source) -> **Clarity** (what the source reveals) -> **Health** (the vessel) -> **Place** (where the vessel lives) -> **Sovereignty** (how you sustain yourself) -> **Prosperity** (what you build) -> **Community** (who gathers) -> **Creation** (what flows out)

Each section has: text content, inline images, glass cards with images, expandable horizontal mood boards. Full-bleed image breaks between major sections. Visual direction: Option B prototype (full-bleed expansiveness with all image treatments).

Sidebar/tab navigation (top sticky pills) with scroll spy. Mobile-first. Sacred personal space aesthetic. Password: "Infinity" (remembered per device via cookie). Dark/light mode toggle. Content sourced from life/VISION.md. For now, content managed via Claude editing files. Future: editable from phone/web.

**Note/Voice Memo Capture:** Floating action button (FAB) in bottom-right corner. Tap to open modal where you pick a section (or general inbox) and type a note or record a voice memo. Voice memos auto-transcribed via AssemblyAI API. Both audio and transcript stored in Supabase. Notes queue up for Claude sessions to update VISION.md.

**Future (native app):** Local transcription models bundled with the application -- no API dependency, fully offline capable.

### Timeline / History (PLANNED -- content source ready, page implementation pending)

Songlines-inspired section: Avry's life as a journey through places. Each location holds a cluster of meaning -- not just where he went, but what that place represents, who he met, what shifted. Geography IS the organizing principle. Could be its own page or a section within the vision page. Visual: map-based or horizontal scroll through places in chronological order, each expanding into the meaning it holds.

**Content source (2026-05-13):** Canonical life timeline lives at `app.avry/life/TIMELINE.md` and is symlinked into the website code repo at `~/Developer/avrystroeve.com/src/content/TIMELINE.md`. Status banner at top of file flags it as incomplete -- needs amendments for pest control + IG DM appointment setting detail, Journey AI Group founding story with Ivo, Nosara arrival and on-the-ground build, and any year-gaps. The `/timeline` page (or section within `/vision`) will consume this file directly.

### About Page (PLANNED -- bio source ready, page implementation pending)

Third-person career-forward bio at `/about` for visitors, partners, and inbound interest. Funnel target for podcast/blog/social bios linking back. Visual treatment TBD - clean, sacred-space aesthetic consistent with rest of site.

**Content source (2026-05-13):** Bio lives at `app.avry/life/bio.md` -- locked draft v3, ~245 words, third-person, career-forward, closing with "God First" signature. Same file is the source for Journey AI Group team page, LinkedIn, podcast intros. Variants still to draft: short (60w), first-person, one-liner, tagline (listed at bottom of bio.md).

### Layer 2: Deep Pages (PLANNED -- future)

Per-section pages with resources, knowledge bases, and AI chat interfaces:
- **Health** -- health knowledge base, speak to health AI, reminders, Ayurvedic wisdom. Sub-domains: physical activities, food/nutrition/herbs, mental health.
- **Spiritual** -- meditation practices, Yogananda/SRF, breathwork, ask spiritual questions. Resources: The Surrender Experiment, SRF lessons. Chat answers questions about God, religion, spiritual practice.
- **Places** -- each place gets its own deep page (Costa Rica, Florida, Colombia, Bali, Hawaii). Each includes:
  - Local connections and contacts (taxis, services, farms, restaurants, people we've met)
  - Community bulletin board (modeled after Nosara Is Calling -- nosariscalling.com)
  - Long-term vision: every place gets its own "[Place] Is Calling" resource hub
  - Network of people connected to each place, shown visually
  - Sovereignty infrastructure status (land, water, energy, internet, community)
  - For Nosara specifically: link to nosariscalling.com as primary resource
- **Sovereignty** -- farms, water rights, off-grid energy, building materials, sustainable development, ancient wisdom/technology
- **AI & Language** -- Claude Code, development, language mastery
- Each deep page has: curated resources, organized knowledge, network of people, and a chat interface connected to that domain's knowledge base

Data storage TBD: MDX files in repo vs Supabase vs hybrid. Chat interface requires API integration (Claude API + RAG over domain-specific content).

### COMPASS / Planning Dashboard (PLANNED -- near-term)

Integrate the COMPASS planning system into avrystroeve.com so Avry can see and interact with his planning visually on the website instead of just in markdown files. Features to discuss:
- Daily action items and checkoff tracking (currently in COMPASS.md + phase logs)
- Visual progress on goals and phases
- Current season focus and priorities
- What you're saying no to
- Review rhythms (weekly, monthly, quarterly)
- Could tie into the vision scroll - the strategy/execution layer that complements the manifesto
- Data source: pull from app.avry markdown files or sync to Supabase for real-time updates
- Mobile-first - check off items from phone

This bridges the gap between "here's my vision" (the manifesto) and "here's what I'm doing today to make it real" (the planning system).

### Layer 3: Community Platform (PLANNED -- future)

Authentication, payments, gated content, member profiles, community feed. Full spec below.

## Requirements

### Validated

- ✓ Next.js App Router with Tailwind CSS — existing
- ✓ MDX content rendering with frontmatter — existing
- ✓ Blog index + individual post pages — existing
- ✓ Rune AI chat interface (hamsa icon, sidebar) — existing
- ✓ PostHog analytics integration — existing
- ✓ Component library started (button, CTA card) — existing
- ✓ Blog components (post layout, hero, media player, album collection) — existing
- ✓ Cookie-based auth gate via `src/proxy.ts` (Phase 0, shipped 2026-05-15)
- ✓ Brain folder structure with 8 agent SKILL.md definitions (Phase 1 + 1.7, shipped 2026-05-15/16)
- ✓ Sidebar + file viewer + Excalidraw whiteboard editor (Phase 1 + 3, shipped 2026-05-16)
- ✓ Sync infrastructure repointed (voice-memo-pipeline, fathom-sync, conversation-pipeline, conversations-directory) into `brain/sources/` (Phase 1.5/1.6, shipped 2026-05-16)
- ✓ my-wife/ content migrated from app.avry into family/wife/references/ (Phase 1.8, shipped 2026-05-16)
- ✓ Chat wired via Vercel AI SDK + Anthropic Sonnet 4.6 with prompt caching (Phase 4a, shipped 2026-05-16)
- ✓ Provider-agnostic LLM layer (`src/lib/agent-tools/llm.ts`) supporting Anthropic + Ollama via env var swap

### Active

**Admin dashboard (immediate next):**
- [ ] Phase 4b — filesystem write tools for agents (appendToFieldLog, editWifeProfile, createDatePlan, etc.) so agents can modify brain during conversation
- [ ] Phase 4c — Google Calendar tool (OAuth + native TypeScript via googleapis) so wife agent can schedule dates, service agent can book client meetings
- [ ] Phase 5 — financial agent content scoping (accounts, Plaid integration, runway, taxes)
- [ ] Vercel env vars: add `ADMIN_PASSWORD`, `ANTHROPIC_API_KEY`, `LLM_PROVIDER=anthropic`, `ANTHROPIC_MODEL=claude-sonnet-4-6` to Vercel project settings for production chat access

**Public-facing platform (carried from earlier vision):**
- [ ] Vision scroll page (Layer 1)
- [ ] Bot protection for /vision (robots.txt, meta robots, X-Robots-Tag)
- [ ] Password gate for /vision
- [ ] Authentication system (signup, login, roles: free/paid/coaching/admin)
- [ ] Payment processing (Stripe subscriptions + one-time payments)
- [ ] Gated content (tier-locked pages, courses, resources)
- [ ] Member profiles
- [ ] Content delivery from creative-studio/blogs/material/ (90+ files)
- [ ] Course/framework structure (230+ extracted frameworks from 3 books)
- [ ] Community feed (posts, comments, reactions)
- [ ] Email capture and list building
- [ ] Public landing page / marketing pages with SEO
- [ ] Mobile-responsive PWA experience
- [ ] /timeline page consuming `src/content/TIMELINE.md` (Songlines-inspired visual)
- [ ] /about page consuming `~/Developer/app.avry/life/bio.md`

**Brain content migration (progressive, per-conversation pace):**
- [ ] Other `app.avry/life/` content gradually migrating into brain/ when it has a clear agent home (body/, places/, ancient-wisdom/, material/, etc.)

### Out of Scope (for now)

- Real-time chat — defer until community has 50+ active members
- Push notifications — defer to v2
- Native mobile app — PWA first, native when revenue justifies
- Video hosting — link to external (YouTube/Cloudflare Stream) until needed
- Gamification/leaderboards — intentional rejection of Skool's dopamine model
- Multiple communities/spaces — one cohesive experience first

## Context

### Research Completed (Session 59)

5-agent parallel research on Skool vs Whop vs Custom:
- **Skool:** Fast to launch but single-feed architecture breaks multi-topic communities. No course export. No custom domain. SEO accrues to skool.com. Spammy ecosystem perception.
- **Whop:** More flexible product types but weaker community. Marketplace reputation problem (crypto/hustle adjacent). No gamification.
- **Custom:** Feasible in 2-week MVP (gated content + Stripe) using Vercel subscription starter kit. Full community in ~1 month. 3x AI dev multiplier documented. $0-5/mo infrastructure at launch.
- **Niche:** Intersection of spirituality + self-education + AI is genuinely empty. Nobody there. Category creation, not category entry.
- **Economics:** $29/mo pricing, break even at 4 members on Skool. Migration tax from platform to custom = 20-80% member loss. Email list is the insurance policy.

**Decision: Build custom from day one.** Own everything. The art piece.

### Vision Structure Research

World-class vision document structure researched at `life/research/vision-structure-research.md`. Analyzed Bezos, Musk, Dalio, Jobs, Yogananda, Neville Goddard, Dispenza, Napoleon Hill, Cameron Herold + neuroscience studies. Key finding: **Identity -> Principles -> Vision -> Strategy** hierarchy. Present tense, identity-based, sensory-rich, daily reading practice.

### Existing Codebase

Current state: blog + Rune AI chat + MDX + PostHog. Foundation exists but needs significant expansion for community/education features.

### Content Assets (in app.avry)

- 90+ written material files in `creative-studio/material/`
- 230+ extracted frameworks from 3 books (Big Leap, Think & Grow Rich, Reality Transurfing)
- Full consulting curriculum in `consulting/OFFER.md`
- 3 defined ICPs with warm leads
- Life-design skill with 27 routing patterns
- 9 vision files in life/ (VISION.md + 7 place VISIONs + health VISION)

### Offer Structure (from consulting/OFFER.md)

| Tier | Price | What |
|------|-------|------|
| Free | $0 | Public blog, landing pages, email capture |
| Member | $29/mo | Gated content, courses, frameworks, community |
| Inner Circle | $99-297/mo | Group coaching, direct access, accountability |
| 1:1 Build | $1,400-5,000/week | Build your app together |
| Business Audit | $1,400-3,000 | AI business audit |

### The Thesis

God -> Language -> Reality -> Creation + AI. Prompting is the most valuable skill of our generation. Whoever communicates best with AI wins. This platform teaches that through spirituality, self-education, and AI tools — a niche nobody occupies.

## Constraints

- **Solo operator**: 6-hour focused days. Revenue-first. Every hour building = hour not consulting.
- **Budget**: Bootstrapped. Infrastructure must be near-zero at launch ($0-5/mo).
- **Tech stack**: Next.js + Supabase + Stripe (leverage existing knowledge). Don't over-engineer.
- **Content portability**: Content lives in markdown in app.avry. Platform is a delivery layer, not the source of truth.
- **Data ownership**: Full ownership of all member data, content, and community. No platform dependency.
- **Design**: Must be the "art piece" — not generic SaaS. Warm, regal, temple aesthetic (from creative-studio vision). Impresses people.

## Open Research Questions

These must be answered BEFORE building community features:

### Data Architecture
- [ ] What tables do we need? (users, subscriptions, content, posts, comments, progress)
- [ ] Supabase vs alternatives for this use case?
- [ ] Content storage: MDX in git vs database vs headless CMS?
- [ ] How do relationships work? (user -> subscription -> tier -> content access)

### Authentication & Authorization
- [ ] Supabase Auth vs Clerk vs Auth.js?
- [ ] Role/tier gating architecture
- [ ] OAuth providers (Google, GitHub, magic link, email/password?)

### Payments
- [ ] Stripe subscription model for tiers
- [ ] Webhook flow (subscribe, cancel, payment failed)
- [ ] Free trial strategy?

### Design & UX
- [ ] What does the "temple aesthetic" actually look like in a web app?
- [ ] Inspiration sites to reference
- [ ] Mobile-first
- [ ] Information architecture (what pages exist, what's the nav)

### Content Strategy
- [ ] How does material/ flow into the app?
- [ ] Free vs gated content boundary
- [ ] Course structure (linear, modular, self-paced?)
- [ ] How do extracted book frameworks appear?

### Community
- [ ] Feed structure (topics? single stream with tags?)
- [ ] Interaction model (posts, comments, DMs?)
- [ ] What makes THIS community sticky without gamification?

### Growth
- [ ] SEO: public vs gated pages
- [ ] Funnel: social -> landing -> signup -> content
- [ ] Email integration (Resend? Loops? ConvertKit?)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Custom platform over Skool/Whop | Data ownership, no platform dependency, art piece, long-term ceiling, SEO to own domain | Decided |
| Next.js + Supabase + Stripe stack | Already have Next.js app, Supabase project running, Stripe is industry standard | Decided |
| Revenue-first: gated content MVP before community | Fastest path to first dollar. Community features added incrementally. | Decided |
| No gamification | Intentional rejection of Skool's dopamine model. Spiritual depth > engagement hacks. | Decided |
| Content stays in markdown in app.avry | Portability. Platform is delivery layer. Source of truth is the repo. | Decided |
| $29/mo entry tier | Low friction for trust-dependent niche. Raise later. Need only 4 members to cover costs. | Decided |
| Brain lives in life/avrystroeve-website/ | Website is an extension of life/. Content sources and brain are the same directory tree. | SUPERSEDED 2026-05-15 |
| Vision scroll as first new feature | Daily personal use, no auth/payments needed, proves the content-to-website pipeline | Decided (carried) |
| Brain moves IN to avrystroeve.com repo | Ships with Vercel deploy → chat agents work from anywhere. Repo stays private (contains personal data). Single source of truth: code + brain + content together. | Decided 2026-05-15 |
| Use Anthropic Sonnet 4.6 + prompt caching as default agent model | Best quality/cost ratio for long-context chat with reference files. Caching cuts cost 75%+ on sustained conversations. Provider-agnostic code allows local llama / Gemini swap later. | Decided 2026-05-16 |
| 8 agents shipped pre-content: God / Body{chef,trainer,herbalist} / Homebase{farmer} / Family{wife} / Service / Finances | Bounded specialization per Anthropic principles. Each agent has its own SKILL.md + references/. New sub-agents emerge when content earns them. | Decided 2026-05-15/16 |
| Use channel-typed `sources/` (no inbox/ subfolder); `references/` per agent | Two relationships: "where did this come from" (sources, by channel) + "which agent uses this" (references, per agent). Inbox subfolder dropped because root was always empty. | Decided 2026-05-16 |
| Service domain = work as service (consulting, JAG, agency, offers, pricing) | Scope locked. Distinct from Finances (money flow) and Family (private life). Cross-cuts ventures. | Decided 2026-05-16 |

---
*Last updated: 2026-05-16 — admin dashboard operational (Phases 0–4a shipped); 8 agents chattable via Anthropic Sonnet 4.6 with prompt caching; herbalist + farmer + wife agents have real content; sync infrastructure repointed; my-wife/ migrated. Vision scroll + community platform features remain the long-term horizon.*
