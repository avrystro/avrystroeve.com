# avrystroeve.com — Community Education Platform

## What This Is

A custom-built community and education platform at avrystroeve.com where people pay to access Avry's knowledge, frameworks, and community around spirituality, self-education, and AI tools. This is the public-facing product of app.avry — the "art piece" that funnels all social media channels into one owned destination. Not Skool, not Whop — a custom platform that becomes anything (AI assistant, app store distribution, marketplace) over time.

## Core Value

People can pay and access gated content, courses, and community at avrystroeve.com — on Avry's domain, with Avry's brand, building Avry's SEO equity.

## Requirements

### Validated

- ✓ Next.js App Router with Tailwind CSS — existing
- ✓ MDX content rendering with frontmatter — existing
- ✓ Blog index + individual post pages — existing
- ✓ Rune AI chat interface (hamsa icon, sidebar) — existing
- ✓ PostHog analytics integration — existing
- ✓ Component library started (button, CTA card) — existing
- ✓ Blog components (post layout, hero, media player, album collection) — existing

### Active

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

### Existing Codebase

Mapped to `.planning/codebase/` (7 documents, 1,182 lines). Current state: blog + Rune AI chat + MDX + PostHog. Foundation exists but needs significant expansion for community/education features.

### Content Assets (in app.avry)

- 90+ written material files in `creative-studio/blogs/material/`
- 230+ extracted frameworks from 3 books (Big Leap, Think & Grow Rich, Reality Transurfing)
- Full consulting curriculum in `consulting/OFFER.md`
- 3 defined ICPs with warm leads
- Life-design skill with 27 routing patterns

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

These must be answered BEFORE building:

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

### Tech Stack
- [ ] Keep current stack or evaluate alternatives?
- [ ] Component library choice (shadcn/ui? Radix? Custom?)
- [ ] Vercel free tier limits — when does it cost?

### Design & UX
- [ ] What does the "temple aesthetic" actually look like in a web app?
- [ ] Inspiration sites to reference
- [ ] Mobile-first or desktop-first?
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

## Unanswered Questions (Avry must answer before building)

These surfaced at end of Session 59. They change the architecture:

1. **What is Rune's role?** Already have AI chat interface in codebase. Is Rune THE differentiator - an AI trained on 230+ frameworks that members talk to in real time? If so, that's not a feature, that's the product. Changes the entire architecture.

2. **Walk through a member's first 10 minutes.** Someone pays $29, logs in. What do they see? What do they do first? What keeps them coming back tomorrow? The tier structure exists but not the experience.

3. **What's free vs what's $29?** Of the 90+ material files and 230+ frameworks - where's the line? Blog free, frameworks paid? Everything free, community paid? Rune free, depth paid? The gating boundary defines the page architecture.

4. **Do you have people who'd pay today?** Not hypothetically. Right now. If checkout existed tomorrow, would 5 people pay $29? This determines landing page first vs member experience first.

5. **Where does coaching happen?** $99 sessions and $297/mo group coaching - inside the app (video, scheduling, chat)? Or app is content/community layer and coaching is Zoom + Cal.com externally? Massive scope question.

## Missing from Research Plan

These were identified but not yet added to the research domains:

- **Rune / AI assistant architecture** — if this is the differentiator, needs own research domain. RAG vs fine-tuning vs structured prompts. How to build knowledge-grounded chatbot on framework library.
- **UX teardowns of indie education platforms** — not Skool/Whop features, but actual custom-built sites. Tiago Forte, Ali Abdaal, others doing this on their own domain.
- **Legal basics** — terms of service, privacy policy, refund policy. Required before taking payments.
- **Content pipeline** — actual workflow of markdown in app.avry -> rendered on site. Build system or manual deploy?

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Custom platform over Skool/Whop | Data ownership, no platform dependency, art piece, long-term ceiling, SEO to own domain | — Pending |
| Next.js + Supabase + Stripe stack | Already have Next.js app, Supabase project running, Stripe is industry standard | — Pending |
| Revenue-first: gated content MVP before community | Fastest path to first dollar. Community features added incrementally. | — Pending |
| No gamification | Intentional rejection of Skool's dopamine model. Spiritual depth > engagement hacks. | — Pending |
| Content stays in markdown in app.avry | Portability. Platform is delivery layer. Source of truth is the repo. | — Pending |
| $29/mo entry tier | Low friction for trust-dependent niche. Raise later. Need only 4 members to cover costs. | — Pending |

---
*Last updated: 2026-03-19 after initialization (Session 59)*
