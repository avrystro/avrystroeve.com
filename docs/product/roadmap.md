# Roadmap

Milestones in delivery order. Each milestone is independently shippable. Each has a plan in `docs/plans/<slug>/PLAN.md` and a matching GitHub Milestone with Issues.

| # | Milestone | Outcome | Depends on |
|---|---|---|---|
| 0 | **Development System** | docs/ tree, CI, Makefile, GitHub tracking, PRD | Nothing |
| 1 | **Brain Content Migration** | brain/ dissolved, content in Supabase + code, sync programs repointed | M0 |
| 2 | **Admin Shell + Auth** | Supabase Auth, `/dashboard` route, sidebar, 7 placeholder sections, deployed | M0 |
| 3 | **Today (Todos)** | CRUD todos in Today section | M2 |
| 4 | **Money (Subscriptions)** | Calendar + list of subscriptions, weekly Telegram alert via n8n | M2, n8n hosting decision |
| 5 | **Inbox (Conversations)** | Auto-index new captures into conversations table, surface in Inbox | M1, M2 |
| 6 | **People (Contacts)** | Contacts CRUD, each contact page joins to conversations | M5 |
| 7 | **Money (Transactions)** | Manual entry + Stripe webhook + WhatsApp confirmation bot | M4 |
| 8 | **Settings** | Integration status board, n8n job log, key management | M4+ |

## Ordering rationale

- M0 first because everything else uses the system it sets up.
- M1 and M2 can run in parallel (no dependency between them). M1 prepares data; M2 prepares UI.
- M3 is smallest feature slice — validates the full Supabase + UI pattern.
- M4 before M5 because subscriptions are higher urgency (the Friday list).
- M5 before M6 because contacts need conversations to link to.
- M7 after M4 because it extends the money schema (accounts + transactions).
- M8 last because settings is useful only after integrations exist.

## Open decisions (not blocking any milestone yet)

- n8n hosting: Cloud (~$20/mo) vs self-host on Hostinger VPS vs Vercel Cron. Decide before M4.
- Voice memo capture source: keep iOS Voice Memos + pipeline, or switch to Speak AI / Fathom mobile. Decide before M5.
- Custom email sender for magic link: `auth@avrystroeve.com` via SMTP. Nice-to-have, not blocking.
