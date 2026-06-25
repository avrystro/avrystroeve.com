# AGENTS.md — avrystroeve.com

> AGENTS.md is canonical. CLAUDE.md is a symlink to this file.

Notion Project: https://app.notion.com/p/38a15881a2258112a9ded56ebe43875b

Personal brand site (front) and admin dashboard (back). The whole repo is the single source of truth for Avry's public web presence AND his private personal-AI brain.

## Two surfaces

1. **Public site** — homepage, blog, vision pages. Anyone can access. SEO-indexed.
2. **Internal admin** — at `/internal/*`, gated behind `ADMIN_PASSWORD` cookie. Personal brain, sidebar file viewer, agent chat panels (Phase 2+), excalidraw whiteboards (Phase 3+).

## Tech stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 (design tokens in `globals.css` via `@theme`)
- MDX for blog posts (`src/content/posts/`)
- `react-markdown` + `remark-gfm` for brain-rendered markdown
- `gray-matter` for frontmatter parsing
- Auth: cookie-based gate in `src/proxy.ts` (single `ADMIN_PASSWORD` env)
- PostHog + Vercel Analytics
- Hosting: Vercel (brain INCLUDED in build — chat works in prod)

## Design system

- **Fonts:** Montserrat (headings), Inter (body), IBM Plex Mono (code)
- **Primary accent:** Klein blue (`#002FA7`) — exposed as Tailwind `text-klein` / `bg-klein` via CSS variable
- **Style:** Luxury minimalism, Swiss uppercase headings, film grain overlay
- **Animations:** Scroll-triggered `.reveal` fade-ups via IntersectionObserver
- **Admin internal:** dark theme (`#0a0a0a` bg, `#050505` sidebar), klein accent for active states

## Key directories

| Directory | What |
|---|---|
| `src/app/(public routes)/` | Homepage, blog, vision, contact, etc. |
| `src/app/admin/login/` | Auth gate entry |
| `src/app/internal/` | Gated admin: sidebar + file viewer + (later) chat panel |
| `src/app/api/admin/auth/` | POST sets cookie, DELETE clears |
| `src/app/api/brain-tree/` | Returns the brain filesystem tree |
| `src/app/api/file/[...path]/` | Returns any brain file as `{kind, body, frontmatter, ...}` |
| `src/proxy.ts` | Auth middleware (Next 16 calls it "proxy") |
| `src/components/nav.tsx` | Public site nav header |
| `src/components/providers/` | PostHog + Vercel Analytics wrappers |
| `src/content/posts/` | MDX blog posts |
| `src/lib/mdx.ts` | Blog post loader |
| `brain/` | **Personal brain — see [brain/README.md](brain/README.md)** |

## Brain structure (top-level)

```
brain/
├── PROJECT.md, HANDOFF.md, LOG.md, PLAN.md   ← website project mgmt
├── sources/                                   ← raw captures, typed by channel
├── god/                                       ← single-agent domain
├── body/{chef,trainer,herbalist}/             ← multi-agent domain
├── finances/                                  ← single-agent domain
└── whiteboards/                               ← free-form excalidraw
```

Each agent folder follows Anthropic's skill schema: `SKILL.md` + `README.md` + `references/` + `assets/` + `scripts/`. Details in [brain/README.md](brain/README.md).

## Sync programs writing to brain

| Program | Writes to | Status |
|---|---|---|
| [voice-memo-pipeline](~/Developer/voice-memo-pipeline) | `brain/sources/voice-memos/` | Repoint pending (PLAN.md Phase 1.5) |
| [fathom-sync](~/Developer/fathom-sync) | `brain/sources/fathom-calls/` | Repoint pending (PLAN.md Phase 1.5) |
| [conversation-pipeline](~/Developer/conversation-pipeline) | reads `brain/sources/` | Repoint pending (PLAN.md Phase 1.5) |

The historical archive at `~/Developer/app.avry/conversations/` stays frozen. Only NEW captures from Phase 1.5 onward land in `brain/sources/`.

## Environment variables

See `.env.example`. Critical:
- `ADMIN_PASSWORD` — auth gate (required for `/internal/*` and gated APIs)
- `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` — analytics

PostHog keys + ADMIN_PASSWORD go in `.env.local` (gitignored). For Vercel: set both in project env vars.

## Build plan

See [brain/PLAN.md](brain/PLAN.md) for the full phased plan (Phases 0-5).

## Commands

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run lint     # ESLint
```
