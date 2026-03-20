# Technology Stack

**Analysis Date:** 2026-03-19

## Languages

**Primary:**
- TypeScript 5.x - All application code (`src/**/*.ts`, `src/**/*.tsx`)
- MDX - Blog content (`src/content/posts/*.mdx`)

**Secondary:**
- CSS - Tailwind v4 with design tokens (`src/app/globals.css`)

## Runtime

**Environment:**
- Node.js (no `.nvmrc` or `.node-version` pinned; system Node v25.6.1 used in dev)

**Package Manager:**
- npm 11.9.0
- Lockfile: `package-lock.json` (present, 9281 lines)

## Frameworks

**Core:**
- Next.js 16.1.6 - App Router, SSG/SSR, MDX integration
- React 19.2.3 - UI rendering
- React DOM 19.2.3

**Styling:**
- Tailwind CSS v4 - Utility-first CSS via PostCSS plugin
- `@tailwindcss/typography` 0.5.19 - Prose styling for MDX blog content
- `@tailwindcss/postcss` v4 - PostCSS integration

**Build/Dev:**
- ESLint 9.x - Linting with `eslint-config-next` 16.1.6 (core-web-vitals + typescript presets)
- PostCSS - CSS processing via `postcss.config.mjs`
- TypeScript compiler - Strict mode, bundler module resolution

## Key Dependencies

**Critical:**
- `@next/mdx` 16.1.6 - MDX integration with Next.js (configured in `next.config.ts`)
- `@mdx-js/loader` 3.1.1 - MDX webpack loader
- `@mdx-js/react` 3.1.1 - MDX React runtime
- `gray-matter` 4.0.3 - Frontmatter parsing for blog posts (`src/lib/mdx.ts`)
- `gsap` 3.14.2 - Animation library (imported but not yet actively used in components)

**Analytics:**
- `posthog-js` 1.357.1 - Product analytics, client-side only (`src/components/providers/posthog-provider.tsx`)
- `@vercel/analytics` 1.6.1 - Vercel web analytics (`src/components/providers/analytics-provider.tsx`)
- `@vercel/speed-insights` 1.3.1 - Core Web Vitals monitoring (`src/components/providers/analytics-provider.tsx`)

**Content:**
- `rehype-pretty-code` 0.14.1 - Syntax highlighting for code blocks in MDX (declared as dep, not yet wired into `next.config.ts` rehypePlugins)
- `shiki` 3.23.0 - Syntax highlighter engine (peer dep of rehype-pretty-code)

## Configuration

**TypeScript:**
- Config: `tsconfig.json`
- Target: ES2017
- Strict mode: enabled
- Module resolution: bundler
- Path alias: `@/*` maps to `./src/*`

**Next.js:**
- Config: `next.config.ts`
- MDX integration via `createMDX` wrapper
- Page extensions: `js`, `jsx`, `md`, `mdx`, `ts`, `tsx`
- No custom webpack config, no image domains, no redirects

**Tailwind CSS v4:**
- Config: `src/app/globals.css` (v4 uses CSS-native `@theme` blocks, no `tailwind.config.js`)
- PostCSS: `postcss.config.mjs` with `@tailwindcss/postcss` plugin
- Design tokens defined via `@theme` block in globals.css (colors, animations)
- Typography plugin loaded via `@plugin "@tailwindcss/typography"`

**ESLint:**
- Config: `eslint.config.mjs` (flat config format)
- Extends: `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`

**Environment Variables:**
- Template: `.env.example`
- Local overrides: `.env.local` (gitignored)
- Required vars:
  - `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API key
  - `NEXT_PUBLIC_POSTHOG_HOST` - PostHog ingestion host (defaults to `https://us.i.posthog.com`)

**Fonts (next/font/google):**
- EB Garamond (`--font-heading`) - headings, weights 400/500/700
- Libre Baskerville (`--font-body`) - body text, weights 400/700
- IBM Plex Mono (`--font-mono`) - code blocks, weights 400/500
- All configured in `src/app/layout.tsx`

## Design Token System

Design tokens live in `src/app/globals.css` under `@theme`:
- **Light base:** cream-50 through cream-300, parchment
- **Dark accents:** ink, ink-light, ink-dark, charcoal
- **Azure (blue):** azure, azure-light, azure-dark, azure-glow
- **Gold:** gold, gold-light, gold-dark, gold-glow
- **Earth tones:** earth-sand, earth-clay, earth-stone
- **Animations:** fade-in (0.5s), float (6s infinite)

Use these token names directly as Tailwind classes (e.g., `bg-cream-50`, `text-ink`, `border-gold`).

## Platform Requirements

**Development:**
- Node.js (v20+ recommended for Next.js 16)
- npm
- No Docker, no database, no external services required for local dev

**Production:**
- Vercel (hosting target per CLAUDE.md)
- Static generation + server-side rendering via Next.js App Router
- No server-side API routes currently active (`src/app/api/` directory exists but is empty)

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

*Stack analysis: 2026-03-19*
