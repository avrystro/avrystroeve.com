# Architecture

**Analysis Date:** 2026-03-19

## Pattern Overview

**Overall:** Next.js App Router with file-system-based content (MDX)

**Key Characteristics:**
- Server-first rendering with Next.js App Router (React Server Components by default)
- Content as code: blog posts are `.mdx` files committed to the repo, not stored in a CMS
- Brain/Body split: all planning, decisions, and content strategy live in a separate repo (`~/Developer/app.avry/creative-studio/`); this repo is purely the public-facing site
- Phased build: currently scaffolded (Phase 2 complete). Many components are stubs awaiting Phase 3 implementation
- Client-side analytics layer wraps all pages via a Providers component

## Layers

**Pages (App Router):**
- Purpose: Route definitions and page-level rendering
- Location: `src/app/`
- Contains: Server Components that fetch data and render pages
- Depends on: `src/lib/mdx.ts` for content, `src/components/` for UI
- Used by: Next.js router (filesystem-based routing)

**Components:**
- Purpose: Reusable React components organized by domain
- Location: `src/components/`
- Contains: Three sub-domains (`blog/`, `rune/`, `ui/`) plus `providers/`
- Depends on: `src/lib/utils.ts` for helpers
- Used by: Pages in `src/app/`
- Note: Each sub-domain has a barrel file (`index.ts`) for exports. Most components in `blog/`, `rune/`, and `ui/` are stubs awaiting Phase 3.

**Content:**
- Purpose: Blog post source files
- Location: `src/content/posts/`
- Contains: MDX files with YAML frontmatter
- Depends on: nothing (pure content)
- Used by: `src/lib/mdx.ts` reads frontmatter; `src/app/blog/[slug]/page.tsx` dynamically imports MDX for rendering

**Library:**
- Purpose: Shared utilities and data-access functions
- Location: `src/lib/`
- Contains: MDX content loader (`mdx.ts`), utility functions (`utils.ts`), Rune AI placeholder (`rune.ts`)
- Depends on: `gray-matter` for frontmatter parsing, `fs`/`path` for file reading
- Used by: Pages that need content data

**Providers:**
- Purpose: Client-side wrappers for analytics and third-party services
- Location: `src/components/providers/`
- Contains: PostHog analytics provider, Vercel Analytics/Speed Insights
- Depends on: `posthog-js`, `@vercel/analytics`, `@vercel/speed-insights`
- Used by: Root layout (`src/app/layout.tsx`)

**Styles:**
- Purpose: Global CSS and design tokens
- Location: `src/app/globals.css`
- Contains: Tailwind v4 `@theme` directive with custom color palette (cream, ink, azure, gold, earth tones) and animation keyframes
- Depends on: Tailwind CSS v4, `@tailwindcss/typography`
- Used by: All components via Tailwind utility classes

## Data Flow

**Blog Post Rendering:**

1. MDX files with YAML frontmatter are placed in `src/content/posts/` (published from the studio tool in app.avry via filesystem write)
2. `src/lib/mdx.ts` reads the directory, parses frontmatter with `gray-matter`, returns typed `PostMeta` objects
3. `src/app/blog/page.tsx` calls `getAllPosts()` to list published posts (filtered by `published: true`)
4. `src/app/blog/[slug]/page.tsx` calls `getPostBySlug()` for metadata, then dynamically imports the MDX file for rendering
5. `generateStaticParams()` pre-generates all post routes at build time (SSG)

**Content Publishing Pipeline:**
1. Content is authored in `~/Developer/app.avry/creative-studio/` (the "brain")
2. The studio tool writes finished `.mdx` files to `src/content/posts/` in this repo (the "body")
3. Deploy via Vercel (auto-deploys on push to main)

**Analytics:**
1. Root layout wraps all children in `<Providers>` (`src/components/providers/index.tsx`)
2. `PostHogProvider` initializes PostHog client-side if `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` env vars are set
3. `AnalyticsProvider` renders Vercel Analytics and Speed Insights components

## Key Abstractions

**PostFrontmatter / PostMeta:**
- Purpose: Typed interface for blog post metadata
- Defined in: `src/lib/mdx.ts`
- Fields: `title`, `date`, `description`, `tags`, `heroImage`, `published`, `hook`, `readTime`, `song`, `video`, `narration`, `references`, `cta`, `blogNumber`
- Pattern: Rich frontmatter supports multimedia blog posts (song, video, narration links) and CTAs

**MDX Content Loading:**
- Purpose: Filesystem-based content retrieval
- File: `src/lib/mdx.ts`
- Functions: `getPostSlugs()`, `getPostBySlug(slug)`, `getAllPosts()`
- Pattern: Read `.mdx` files from disk at build time, parse frontmatter, return typed objects. MDX content itself is dynamically imported in the page component.

**Providers Composition:**
- Purpose: Wrap the entire app in client-side service providers
- File: `src/components/providers/index.tsx`
- Pattern: Single `<Providers>` component composes PostHog and Vercel Analytics. Add new providers by nesting inside this component.

**Design Tokens:**
- Purpose: Site-wide color palette and typography
- File: `src/app/globals.css`
- Pattern: Tailwind v4 `@theme` directive defines custom colors (cream, ink, azure, gold, earth). Font CSS variables (`--font-heading`, `--font-body`, `--font-mono`) set by `next/font/google` in `src/app/layout.tsx`.

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Loads Google Fonts (EB Garamond, Libre Baskerville, IBM Plex Mono), sets CSS variables, wraps app in `<Providers>`

**Homepage:**
- Location: `src/app/page.tsx`
- Triggers: Route `/`
- Responsibilities: Placeholder. Planned to become Rune AI chat interface.

**Blog Index:**
- Location: `src/app/blog/page.tsx`
- Triggers: Route `/blog`
- Responsibilities: Lists all published posts sorted by date descending

**Blog Post:**
- Location: `src/app/blog/[slug]/page.tsx`
- Triggers: Route `/blog/{slug}`
- Responsibilities: Renders individual MDX post with full metadata (song, video, narration, references, CTA). Uses `generateStaticParams()` for SSG.

**Style Guide (dev only):**
- Location: `src/app/dev/style-guide/page.tsx`
- Triggers: Route `/dev/style-guide` (redirects to `/` in production)
- Responsibilities: Shows typography, color palette, and component showcase for development

**About / Book:**
- Location: `src/app/about/page.tsx`, `src/app/book/page.tsx`
- Triggers: Routes `/about`, `/book`
- Responsibilities: Placeholder pages ("Coming soon")

**API Directory:**
- Location: `src/app/api/`
- Status: Empty directory. No API routes implemented yet.

## Error Handling

**Strategy:** Minimal, relies on Next.js defaults

**Patterns:**
- `notFound()` from `next/navigation` for missing blog posts (`src/app/blog/[slug]/page.tsx`)
- Try/catch around dynamic MDX imports with `notFound()` fallback
- No custom error pages (`error.tsx`, `not-found.tsx`) defined yet
- No global error boundary

## Cross-Cutting Concerns

**Logging:** None. No logging framework configured.

**Validation:** Frontmatter is typed via `PostFrontmatter` interface but not validated at runtime. Invalid frontmatter would cause silent type mismatches.

**Authentication:** None. Fully public site.

**SEO:** Basic metadata in root layout (`title`, `description`). No per-page metadata generation yet.

**MDX Components:** Custom MDX component overrides registered in `src/mdx-components.tsx` but currently pass-through (no customizations yet).

---

*Architecture analysis: 2026-03-19*
