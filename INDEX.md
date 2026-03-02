# avrystroeve.com

Personal blog and brand hub for Avry Stroeve. Code repo (body). Brain: `~/Developer/app.avry/blog/`.

## Status: Scaffolded

Phase 2 complete. Project structure, MDX pipeline, Tailwind v4 tokens, analytics providers, and Vercel deployment in place. Phase 3 (core build) is next.

## Key Files

| File | What |
|------|------|
| src/app/page.tsx | Homepage (placeholder - will be Rune chat) |
| src/app/blog/[slug]/page.tsx | Blog post page (MDX rendering) |
| src/content/posts/ | MDX blog posts directory |
| src/components/ | React components (rune/, blog/, ui/) |
| src/lib/mdx.ts | MDX utilities (frontmatter, post listing) |
| src/app/globals.css | Tailwind v4 design tokens (@theme directive) |
| .env.example | Environment variable template |

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- MDX (blog posts)
- GSAP (animations)
- PostHog (analytics - not yet configured)
- Vercel (hosting)

## How to Run

```bash
git clone git@github.com:avrystro/avrystroeve.com.git
cd avrystroeve.com
npm install
cp .env.example .env.local
npm run dev
# Open localhost:3000
```

## Brain Directory

All planning, decisions, content strategy, and backlog live in the brain:

```
~/Developer/app.avry/blog/
  PROJECT.md   - Architecture and design system
  PLAN.md      - Build phases
  HANDOFF.md   - Session state and decisions
  INDEX.md     - Status and backlog
```
