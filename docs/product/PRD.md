# Product Requirements Document — avrystroeve.com

## Vision

avrystroeve.com is Avry's single source of truth: a public marketing site on the front (book, vision, updates, blog) and a gated personal dashboard on the back (today, inbox, people, money, agents, canvases, settings). The entire repo IS the brain. The dashboard is the brain made interactive. All life data — conversations, contacts, finances, agent knowledge, canvases — flows into one system, queryable and actionable from anywhere.

---

## Two-layer architecture

| Layer | Holds | Where it lives | Why |
|---|---|---|---|
| **Code (structured)** | Agent system prompts, UI components, API routes, config | `src/` in the repo | Version-controlled. Type-checked. Deployed with the app. |
| **Supabase (data)** | Todos, contacts, conversations, transactions, subscriptions, agent knowledge, canvases, audio/video | Postgres + Storage on Supabase | Mutable from dashboard. Queryable. Relational. Binaries don't bloat git. |

The two layers connect via reference: a `conversations` row has a `transcript_md` column AND may link to an `audio_storage_path` in Supabase Storage. A contact joins to many conversations. Agent knowledge rows are loaded as context at chat time.

---

## Dashboard sections

Seven sections mirror Avry's operating model:

| # | Section | Route | What Avry does here |
|---|---|---|---|
| 1 | **Today** | `/dashboard` | Daily dial. Today's todos, upcoming charges, today's calls. |
| 2 | **Inbox** | `/dashboard/inbox` | Every new capture (fathom, voice memo, WhatsApp, Telegram, email). Triage: link to contact, archive, create todo. |
| 3 | **People** | `/dashboard/people` | Every relationship. Click a person: see all conversations, notes, open todos referencing them. |
| 4 | **Money** | `/dashboard/money` | Subscriptions calendar, burn rate, transaction list, Telegram alerts. |
| 5 | **Agents** | `/dashboard/agents` | Chat with any agent (god, herbalist, chef, trainer, wife, farmer, finances, service). Browse/edit their knowledge base. |
| 6 | **Canvases** | `/dashboard/canvases` | Excalidraw whiteboards. Create, browse, edit. |
| 7 | **Settings** | `/dashboard/settings` | Auth, sync status, integration toggles, n8n job log, API keys. |

---

## Route table

| Route | Auth | Purpose |
|---|---|---|
| `/` | Public | Homepage / marketing |
| `/book` | Public | Book page |
| `/vision` | Public | Vision board |
| `/updates` | Public | Updates / now page |
| `/blog` | Public | MDX blog |
| `/login` | Public | Magic link entry |
| `/dashboard` | Gated | Today landing |
| `/dashboard/inbox` | Gated | Conversations inbox |
| `/dashboard/people` | Gated | Contacts |
| `/dashboard/people/[id]` | Gated | Single contact |
| `/dashboard/money` | Gated | Finance dashboard |
| `/dashboard/agents` | Gated | Agent list |
| `/dashboard/agents/[name]` | Gated | Single agent: chat + knowledge |
| `/dashboard/canvases` | Gated | Canvas list |
| `/dashboard/canvases/[id]` | Gated | Single canvas (Excalidraw) |
| `/dashboard/settings` | Gated | Settings + integrations |
| `/api/auth/callback` | Public | Supabase magic link callback |
| `/api/agents/[name]/chat` | Gated | Agent chat stream |
| `/api/agents/[name]/knowledge` | Gated | CRUD agent knowledge |
| `/api/captures` | Gated | Ingest endpoints |
| `/api/canvases/[id]` | Gated | Canvas read/write |

---

## Naming decisions

| Decision | Choice | Rationale |
|---|---|---|
| Gated route | `/dashboard` | Universal SaaS convention (Vercel, Linear, Stripe). |
| Auth route | `/login` | Standard. Replaces `/admin/login`. |
| Auth mechanism | Supabase Auth (email magic link) | Same identity drives RLS. |
| Former "Brain" section | "Agents" | That's what it is. |
| Former "Whiteboards" section | "Canvases" | Matches data model naming. |
| Middleware file | `src/middleware.ts` | Next.js 16 standard. |
| Agent prompts location | `src/lib/agents/<name>/skill.md` | Prompts are config. Version with code. |
| Agent knowledge location | Supabase `agent_knowledge` table | Mutable from dashboard. Queryable. |
| Audio/video storage | Supabase Storage | Binaries don't belong in git. |
| Plans location | `docs/plans/` | Not `.planning/`. One place for written artifacts. |

---

## Brain dissolution map

The current `brain/` directory dissolves entirely. Each content type moves to its proper home:

| Current location | New home | Why |
|---|---|---|
| `brain/*/SKILL.md` (agent prompts) | `src/lib/agents/<name>/skill.md` | Prompts are code. Version-controlled. Loaded at runtime. |
| `brain/*/references/*.md` (agent knowledge) | Supabase: `agent_knowledge` table | Mutable. Queryable. Dashboard-editable. |
| `brain/sources/voice-memos/*.m4a` | Supabase Storage: `captures/voice-memos/` | Binaries out of git. |
| `brain/sources/voice-memos/*.md` (transcripts) | Supabase: `conversations` table (`transcript_md` column) | Relational. Searchable. Joinable to contacts. |
| `brain/sources/fathom-calls/*.md` | Supabase: `conversations` table (channel = 'fathom') | Same. |
| `brain/whiteboards/*.excalidraw` | Supabase: `canvases` table (`data jsonb`) | Mutable from dashboard. No git commit per edit. |
| `brain/PROJECT.md` | `docs/product/PROJECT.md` (historical) | Project management, not life data. |
| `brain/HANDOFF.md` | `docs/devlog/` | Session state. |
| `brain/LOG.md` | `docs/devlog/` | Session journal. |
| `brain/PLAN.md` | `docs/plans/milestone-00/PLAN.md` | Historical plan record. |

---

## Database schema (Supabase)

Every table has: `id uuid pk default gen_random_uuid()`, `created_at timestamptz default now()`, `user_id uuid references auth.users not null`. RLS on all: `user_id = auth.uid()`.

```sql
-- Auth
profiles            (id, email, full_name)

-- Agents
agents              (id, slug, display_name, scope, model, active)
agent_knowledge     (id, agent_id fk, title, body text, source_file_path,
                     tags text[], embedding vector nullable)

-- Today
projects            (id, name, area, archived_at)
todos               (id, title, body, status, priority, due_date,
                     project_id fk, contact_id fk nullable, completed_at, source)

-- Inbox
conversations       (id, channel, occurred_at, title, transcript_md,
                     audio_storage_path, duration_seconds, processed_at)
messages            (id, conversation_id fk, sent_at, sender_contact_id fk,
                     body, attachments jsonb)
conversation_contacts (conversation_id fk, contact_id fk, role)

-- People
contacts            (id, first_name, last_name, full_name, company, role,
                     relationship, primary_email, primary_phone, notes,
                     avatar_url, source, last_contacted_at)
contact_handles     (id, contact_id fk, platform, handle, is_primary)

-- Money
accounts            (id, name, kind, provider, currency, last_synced_at)
transactions        (id, account_id fk, occurred_at, amount, currency,
                     merchant, category, description,
                     is_subscription, subscription_id fk nullable, source)
subscriptions       (id, name, amount, currency, billing_period,
                     next_charge_date, account_id fk, category, active)
budgets             (id, category, monthly_amount, year, month)

-- Canvases
canvases            (id, name, location_tag, data jsonb, updated_at)

-- Settings
integrations        (id, kind, status, last_sync_at, config jsonb, last_error)
n8n_jobs            (id, workflow, status, started_at, finished_at,
                     payload jsonb, result jsonb, error)
```

Supabase Storage buckets (private, RLS):
- `captures/voice-memos/` — voice memo audio
- `captures/fathom-calls/` — call recordings (if applicable)
- `avatars/` — contact profile images

---

## Target repository layout

```
avrystroeve.com/
├── README.md
├── AGENTS.md
├── CLAUDE.md → AGENTS.md (symlink)
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
├── Makefile
├── .editorconfig
├── .env.example
├── .gitignore / .gitattributes
├── package.json / package-lock.json
├── tsconfig.json / eslint.config.mjs / postcss.config.mjs
├── next.config.ts / next-env.d.ts
├── playwright.config.ts
│
├── .github/
│   ├── pull_request_template.md
│   ├── ISSUE_TEMPLATE/{bug.md, feature.md}
│   └── workflows/ci.yml
│
├── src/
│   ├── middleware.ts
│   ├── app/
│   │   ├── (public)/{page, book, vision, updates, blog}
│   │   ├── login/
│   │   ├── dashboard/{page, inbox, people, money, agents, canvases, settings}
│   │   └── api/{auth, agents, captures, canvases}
│   ├── components/{dashboard, agents, canvases, public, ui, providers}
│   ├── lib/{supabase, agents, ai, mdx.ts, utils.ts}
│   └── content/ (MDX blog posts)
│
├── supabase/
│   ├── migrations/
│   ├── seed/
│   ├── functions/
│   └── AGENTS.md
│
├── scripts/
├── tests/{unit, integration, e2e, fixtures}
├── public/
│
└── docs/
    ├── product/{PRD.md, roadmap.md}
    ├── architecture/{tech-stack.md, data-model.md, data-flow.md, diagrams/}
    ├── adr/
    ├── plans/<milestone-slug>/PLAN.md
    ├── reference/environment.md
    ├── runbooks/
    ├── devlog/
    └── tutorials/
```

No `brain/` directory in the end state.

---

## Tech stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | Current stack. Modern. Vercel-native. |
| Language | TypeScript | Type safety. |
| Styling | Tailwind CSS v4 | Design tokens in `globals.css`. Already configured. |
| Database | Supabase (Postgres) | Auth + DB + Storage + Edge Functions in one. Free tier to start. |
| Auth | Supabase Auth (magic link) | RLS-compatible. Zero password management. |
| Object storage | Supabase Storage | Same dashboard. RLS-gated. |
| AI | Vercel AI SDK + Anthropic | Provider-portable. Already integrated. |
| Automation | n8n | Telegram alerts, capture ingestion, sync jobs. Hosting TBD. |
| Hosting | Vercel | Current host. Git-push-to-deploy. |
| Analytics | PostHog + Vercel Analytics | Already configured. |

---

## Success criteria

The product is "done" when:
1. Avry can log in via magic link from any device.
2. Today shows active todos and upcoming charges.
3. Inbox surfaces every new conversation daily (Fathom, voice memos minimum).
4. People shows every contact with linked conversations.
5. Money shows subscriptions calendar, burn rate, and transaction history.
6. Agents chat with full context (prompt + knowledge base) — streaming, fast follow-ups.
7. Canvases are editable from the dashboard (no git needed).
8. Settings shows sync status and integration health.
9. Weekly Telegram alert fires with upcoming charges.
10. No `brain/` directory exists.
