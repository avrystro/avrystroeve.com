# External Integrations

**Analysis Date:** 2026-03-19

## APIs & External Services

**Analytics:**
- PostHog - Product analytics (pageviews, events, user identification)
  - SDK/Client: `posthog-js` + `posthog-js/react`
  - Auth: `NEXT_PUBLIC_POSTHOG_KEY` env var
  - Host: `NEXT_PUBLIC_POSTHOG_HOST` (set to `https://us.i.posthog.com`)
  - Implementation: `src/components/providers/posthog-provider.tsx`
  - Config: Client-side only, `person_profiles: "identified_only"`, manual pageview capture disabled (`capture_pageview: false`), page leave captured (`capture_pageleave: true`)
  - Graceful degradation: Skips init if env vars missing (safe for local dev without keys)

- Vercel Analytics - Web analytics (automatic page tracking)
  - SDK/Client: `@vercel/analytics/react`
  - Auth: Automatic (Vercel deployment context)
  - Implementation: `src/components/providers/analytics-provider.tsx`

- Vercel Speed Insights - Core Web Vitals monitoring
  - SDK/Client: `@vercel/speed-insights/next`
  - Auth: Automatic (Vercel deployment context)
  - Implementation: `src/components/providers/analytics-provider.tsx`

**Fonts:**
- Google Fonts - Font delivery via `next/font/google` (no external requests at runtime; fonts are self-hosted at build time)
  - EB Garamond, Libre Baskerville, IBM Plex Mono
  - Implementation: `src/app/layout.tsx`

## Data Storage

**Databases:**
- None. This is a static/SSG site with no database.

**File Storage:**
- Local filesystem only
- Blog posts: MDX files at `src/content/posts/*.mdx` (read at build time via `src/lib/mdx.ts`)
- Static assets: `public/images/`

**Caching:**
- None (relies on Vercel CDN/edge caching in production)

## Authentication & Identity

**Auth Provider:**
- None. Public-facing site with no authentication.

## Monitoring & Observability

**Error Tracking:**
- None configured. No Sentry, no error boundary reporting.

**Logs:**
- Console only. No structured logging framework.

**Performance:**
- Vercel Speed Insights (Core Web Vitals)
- PostHog page leave tracking

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from `@vercel/analytics`, `@vercel/speed-insights`, and CLAUDE.md)
- No `vercel.json` configuration file (uses Vercel defaults)

**CI Pipeline:**
- No `.github/` directory detected
- No CI/CD configuration files present
- Deployment likely via Vercel Git integration (auto-deploy on push)

**Build:**
- `npm run build` (Next.js production build)
- Static generation for blog posts via `generateStaticParams()` in `src/app/blog/[slug]/page.tsx`

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog ingestion endpoint

**Optional/automatic:**
- Vercel Analytics and Speed Insights require no env vars (auto-configured on Vercel)

**Secrets location:**
- `.env.local` (gitignored) for local development
- Vercel dashboard for production environment variables
- Template: `.env.example`

## Webhooks & Callbacks

**Incoming:**
- None. The `src/app/api/` directory exists but contains no route handlers.

**Outgoing:**
- PostHog event ingestion (client-side HTTP to PostHog host)
- Vercel Analytics beacon (client-side, automatic)

## Content Pipeline

**External dependency:**
- Blog content is authored in `~/Developer/app.avry/creative-studio/` and published as `.mdx` files to `src/content/posts/` via a separate local studio app
- This repo has no studio code; it only reads the published MDX files at build time
- No CMS, no headless API, no content management within this codebase

## Planned but Not Yet Integrated

**Rune AI Chat (Phase 3):**
- Stub files exist: `src/components/rune/chat-interface.tsx`, `src/components/rune/chat-sidebar.tsx`, `src/components/rune/hamsa-icon.tsx`, `src/lib/rune.ts`
- All are placeholder/empty implementations
- Will likely require an API route and AI backend integration when built

**Media Player (Phase 3):**
- Stub: `src/components/blog/media-player.tsx`
- Will likely embed external audio/video (Suno, YouTube, etc.)

**Syntax Highlighting:**
- `rehype-pretty-code` and `shiki` are installed as dependencies
- Not yet wired into `next.config.ts` rehypePlugins array (currently empty `[]`)

---

*Integration audit: 2026-03-19*
