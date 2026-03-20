# Codebase Structure

**Analysis Date:** 2026-03-19

## Directory Layout

```
avrystroeve.com/
├── .planning/              # GSD planning documents
│   └── codebase/           # Architecture and analysis docs
├── public/                 # Static assets served at root
│   ├── fonts/              # Custom font files (empty, using next/font/google)
│   └── images/             # Static images (empty, .gitkeep placeholder)
├── src/                    # All source code
│   ├── app/                # Next.js App Router pages
│   │   ├── about/          # /about route (placeholder)
│   │   ├── api/            # API routes (empty, reserved)
│   │   ├── blog/           # /blog route
│   │   │   └── [slug]/     # /blog/:slug dynamic route
│   │   ├── book/           # /book route (placeholder)
│   │   ├── dev/            # Development-only routes
│   │   │   └── style-guide/# /dev/style-guide (dev only)
│   │   ├── globals.css     # Tailwind v4 tokens + global styles
│   │   ├── layout.tsx      # Root layout (fonts, providers)
│   │   ├── page.tsx        # Homepage
│   │   └── favicon.ico     # Favicon
│   ├── components/         # React components by domain
│   │   ├── blog/           # Blog-specific components
│   │   ├── providers/      # Analytics/service providers
│   │   ├── rune/           # Rune AI chat components
│   │   └── ui/             # Shared UI primitives
│   ├── content/            # Content files
│   │   └── posts/          # MDX blog posts
│   ├── lib/                # Shared utilities
│   └── mdx-components.tsx  # MDX component overrides
├── CLAUDE.md               # Project instructions for Claude
├── INDEX.md                # Project status and key files
├── eslint.config.mjs       # ESLint config (Next.js defaults)
├── next.config.ts          # Next.js config (MDX support)
├── postcss.config.mjs      # PostCSS config (Tailwind)
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies and scripts
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router pages and layouts
- Contains: `page.tsx` files for each route, `layout.tsx` for root layout, `globals.css` for design tokens
- Key files: `layout.tsx` (font loading, provider wrapping), `blog/[slug]/page.tsx` (main content page)

**`src/components/blog/`:**
- Purpose: Blog post display components
- Contains: Post cards, hero sections, media players, album collections
- Key files: `post-layout.tsx`, `post-card.tsx`, `post-hero.tsx`, `media-player.tsx`, `album-collection.tsx`
- Status: All stubs awaiting Phase 3 implementation
- Barrel: `index.ts`

**`src/components/providers/`:**
- Purpose: Client-side service wrappers
- Contains: PostHog analytics, Vercel Analytics/Speed Insights
- Key files: `index.tsx` (composition root), `posthog-provider.tsx`, `analytics-provider.tsx`
- Status: Fully implemented

**`src/components/rune/`:**
- Purpose: Rune AI chat interface (planned feature)
- Contains: Chat interface, sidebar, hamsa icon
- Key files: `chat-interface.tsx`, `chat-sidebar.tsx`, `hamsa-icon.tsx`
- Status: All stubs awaiting Phase 3
- Barrel: `index.ts`

**`src/components/ui/`:**
- Purpose: Shared, domain-agnostic UI primitives
- Contains: Button, CTA card
- Key files: `button.tsx`, `cta-card.tsx`
- Status: Minimal implementations / stubs
- Barrel: `index.ts`

**`src/content/posts/`:**
- Purpose: MDX blog post source files
- Contains: `.mdx` files with YAML frontmatter
- Key files: `preparing-for-the-worst-case-scenario.mdx` (only published post)
- Note: Published from the studio tool in `~/Developer/app.avry/creative-studio/`

**`src/lib/`:**
- Purpose: Shared utilities and data access
- Contains: MDX content loader, utility functions, Rune AI helpers
- Key files: `mdx.ts` (content loading), `utils.ts` (cn helper), `rune.ts` (empty placeholder)

**`public/`:**
- Purpose: Static assets served at root URL path
- Contains: `fonts/` and `images/` directories (both empty with `.gitkeep`)
- Note: Fonts are loaded via `next/font/google` in layout, not from this directory

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout, font loading, provider wrapping
- `src/app/page.tsx`: Homepage
- `src/app/blog/page.tsx`: Blog listing
- `src/app/blog/[slug]/page.tsx`: Individual blog post (the most complex page)

**Configuration:**
- `next.config.ts`: MDX plugin setup, page extensions
- `tsconfig.json`: Path alias `@/*` maps to `./src/*`
- `eslint.config.mjs`: Next.js core-web-vitals + TypeScript rules
- `postcss.config.mjs`: Tailwind CSS PostCSS plugin
- `src/app/globals.css`: Design tokens (colors, animations) via Tailwind v4 `@theme`

**Core Logic:**
- `src/lib/mdx.ts`: All content loading (getPostSlugs, getPostBySlug, getAllPosts)
- `src/components/providers/index.tsx`: Analytics provider composition
- `src/mdx-components.tsx`: MDX component overrides (currently pass-through)

**Content:**
- `src/content/posts/*.mdx`: Blog posts with frontmatter

## Naming Conventions

**Files:**
- `kebab-case.tsx` for components: `post-card.tsx`, `chat-interface.tsx`, `cta-card.tsx`
- `kebab-case.ts` for utilities: `mdx.ts`, `utils.ts`
- `kebab-case.mdx` for content: `preparing-for-the-worst-case-scenario.mdx`
- `page.tsx` for routes (Next.js convention)
- `index.ts` for barrel exports in component directories

**Directories:**
- `kebab-case` for all directories: `style-guide/`, `[slug]/`
- Domain-based grouping under `components/`: `blog/`, `rune/`, `ui/`, `providers/`

**Exports:**
- `PascalCase` for React components: `PostCard`, `ChatInterface`, `Providers`
- `camelCase` for functions: `getAllPosts`, `getPostBySlug`, `cn`
- Named exports everywhere (no default exports for components except pages)

## Where to Add New Code

**New Page:**
- Create directory in `src/app/{route-name}/`
- Add `page.tsx` as the route component
- Use Server Components by default; add `"use client"` only if needed

**New Blog Post:**
- Add `.mdx` file to `src/content/posts/`
- Include required frontmatter: `title`, `date`, `description`, `published: true`
- Slug derived from filename (e.g., `my-post.mdx` becomes `/blog/my-post`)

**New Component:**
- Determine domain: `blog/`, `rune/`, `ui/`, or create new domain directory under `src/components/`
- Create `kebab-case.tsx` file
- Export `PascalCase` named function component
- Add export to the domain's `index.ts` barrel file

**New Utility:**
- Add to `src/lib/` as `kebab-case.ts`
- Export named functions in `camelCase`

**New Provider:**
- Create provider in `src/components/providers/`
- Compose it inside `src/components/providers/index.tsx`

**New API Route:**
- Create `src/app/api/{route-name}/route.ts`
- Export named HTTP method handlers (`GET`, `POST`, etc.)

**New Design Tokens:**
- Add to `src/app/globals.css` inside the `@theme` block
- Follow existing naming: `--color-{palette}-{shade}` (e.g., `--color-azure-light`)

## Special Directories

**`src/app/dev/`:**
- Purpose: Development-only pages (style guide, component playground)
- Generated: No
- Committed: Yes
- Note: `style-guide/page.tsx` redirects to `/` in production via `process.env.NODE_ENV` check

**`src/app/api/`:**
- Purpose: Reserved for API routes
- Generated: No
- Committed: Yes (empty directory)
- Note: No routes implemented yet. Rune AI backend will likely live here.

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes
- Committed: No (gitignored)

**`.planning/`:**
- Purpose: GSD planning and codebase analysis documents
- Generated: By analysis tools
- Committed: Project decision

---

*Structure analysis: 2026-03-19*
