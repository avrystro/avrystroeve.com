# Environment Variables

| Variable | Purpose | Where set |
|---|---|---|
| `ADMIN_PASSWORD` | Legacy auth gate (being replaced by Supabase Auth) | `.env.local`, Vercel |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog analytics | `.env.local`, Vercel |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL | `.env.local`, Vercel |
| `ANTHROPIC_API_KEY` | Claude API for agent chat | `.env.local`, Vercel |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `.env.local`, Vercel (Milestone 2) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `.env.local`, Vercel (Milestone 2) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (server-only) | `.env.local`, Vercel (Milestone 2) |

Never commit secret values. Only names go in `.env.example`.
