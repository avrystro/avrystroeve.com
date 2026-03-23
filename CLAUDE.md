# avrystroeve.com

Personal brand site and blog. 8am / Arlin Moore aesthetic.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (design tokens in globals.css via @theme)
- MDX for blog posts (src/content/posts/)
- PostHog + Vercel Analytics (client-side)
- Vercel for hosting

## Design System

- **Fonts:** Montserrat (headings), Inter (body), IBM Plex Mono (code)
- **Primary accent:** Klein blue (#002FA7)
- **Style:** Luxury minimalism, Swiss uppercase headings, film grain overlay
- **Animations:** Scroll-triggered `.reveal` fade-ups via IntersectionObserver
- **Reference:** 8amapp.com/uluwatu-26, style extraction at `~/Developer/app.avry/creative-studio/style-library/8am-arlin-moore/style.md`

## Key Directories

| Directory | What |
|-----------|------|
| `src/app/` | Routes: homepage, blog index, blog post, sitemap, 404 |
| `src/components/nav.tsx` | Fixed nav header |
| `src/components/providers/` | PostHog + Vercel Analytics wrappers |
| `src/content/posts/` | MDX blog posts with YAML frontmatter |
| `src/lib/mdx.ts` | Post loading, frontmatter parsing, slug resolution |
| `src/lib/utils.ts` | cn() class joiner |
| `public/robots.txt` | SEO crawl rules |

## Blog Posts

Posts live in `src/content/posts/*.mdx` with frontmatter schema defined in `src/lib/mdx.ts` (PostFrontmatter interface). The `published` flag controls visibility on both listing and slug pages.

## Environment Variables

See `.env.example`. PostHog keys go in `.env.local` (gitignored).

## Commands

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run lint     # ESLint
```
