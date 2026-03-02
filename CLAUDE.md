# avrystroeve.com

Avry's personal blog and brand hub. This is the **body** (code). The **brain** (planning, decisions, content) lives at:

```
~/Developer/app.avry/blog/
```

## Brain Files (Read These First)

| File | What |
|------|------|
| `~/Developer/app.avry/blog/PROJECT.md` | Vision, architecture, design system, analytics |
| `~/Developer/app.avry/blog/PLAN.md` | Phase-based build plan |
| `~/Developer/app.avry/blog/HANDOFF.md` | Session state, all decisions, open questions |
| `~/Developer/app.avry/blog/INDEX.md` | Status, backlog, blog queue, source material |

Always read HANDOFF.md before starting work. It has every decision made and the exact next action.

## Rules

This project follows the rules at `~/Developer/app.avry/rules/`:
- `architecture.md` - Workspace architecture, Brain/Body Split
- `style.md` - Writing and code style
- `credentials.md` - Never expose API keys
- `security.md` - Key management

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (design tokens in globals.css via @theme)
- MDX for blog posts (src/content/posts/)
- GSAP for animations
- PostHog for analytics (client-side)
- Vercel for hosting

## Key Directories

| Directory | What |
|-----------|------|
| `src/app/` | App Router pages |
| `src/components/rune/` | Rune AI chat interface |
| `src/components/blog/` | Blog post layout, media players, cards |
| `src/components/ui/` | Shared UI components |
| `src/content/posts/` | MDX blog posts |
| `src/lib/` | Utilities (MDX helpers, Rune backend, general) |
| `public/images/` | Static images |

## Environment Variables

See `.env.example` for required variables. API keys go in `.env.local` (gitignored).

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
