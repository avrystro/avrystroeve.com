# ADR 0006: Use /dashboard route instead of /internal

**Status:** Accepted
**Date:** 2026-05-24

## Context

The gated admin area was at `/internal/*`. This naming is uncommon in SaaS — it reads like a Google-internal-tools convention, not a product route. Industry standards:

- `/dashboard` — Vercel, Linear, Stripe, Supabase, Resend
- `/app` — Notion, Linear (some surfaces)
- `/admin` — CMS convention (Wordpress, Django)

## Decision

Use `/dashboard` for the gated personal app. `/login` for the auth entry point. Public pages stay at root (`/`, `/book`, `/vision`, `/updates`, `/blog`).

Old `/internal/*` routes get 301 redirects to `/dashboard/*` during transition, then are removed.

## Consequences

- URLs are readable and match SaaS conventions.
- Auth middleware matcher changes from `/internal/:path*` to `/dashboard/:path*`.
- Existing bookmarks/links to `/internal/*` continue working via redirects.
- No "admin" vs "user" confusion — it's one user's dashboard.
