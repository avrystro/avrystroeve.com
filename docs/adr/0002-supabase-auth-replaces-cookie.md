# ADR 0002: Supabase Auth replaces cookie-based ADMIN_PASSWORD

**Status:** Accepted
**Date:** 2026-05-24

## Context

The current auth gate uses a single `ADMIN_PASSWORD` environment variable. A cookie (`avry_admin_auth`) stores the password value in plaintext after login. This works for a solo user but:

- Cannot support multiple users if needed later.
- Cannot drive row-level security (RLS) in Supabase.
- Stores a secret in the cookie value itself (the password).
- Has no session expiry mechanism.

## Decision

Replace cookie auth with Supabase Auth using email magic link. Single user (Avry, `avrystro@gmail.com`). The same `auth.uid()` drives RLS policies on every Supabase table.

## Consequences

- Login flow changes: enter email → receive magic link → click → authenticated.
- `src/proxy.ts` is replaced by `src/middleware.ts` using Supabase session validation.
- `ADMIN_PASSWORD` env var is removed after migration.
- No password to remember or rotate.
- Session expiry handled by Supabase (configurable).
- Future multi-user support becomes trivial (just add another auth user).
