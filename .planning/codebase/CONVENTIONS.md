# Coding Conventions

**Analysis Date:** 2026-03-19

## Naming Patterns

**Files:**
- Page routes: `page.tsx` (Next.js App Router convention)
- Components: `kebab-case.tsx` (e.g., `post-card.tsx`, `chat-interface.tsx`, `cta-card.tsx`)
- Libraries/utilities: `kebab-case.ts` (e.g., `mdx.ts`, `utils.ts`, `rune.ts`)
- CSS: `globals.css` (single global stylesheet)
- Content files: `kebab-case.mdx` (e.g., `preparing-for-the-worst-case-scenario.mdx`)

**Functions:**
- React components: PascalCase (e.g., `BlogPostPage`, `PostHogProvider`, `TypographyShowcase`)
- Utility functions: camelCase (e.g., `getAllPosts`, `getPostBySlug`, `getPostSlugs`)
- Page components: `{PageName}Page` suffix (e.g., `HomePage`, `BlogPage`, `BookPage`, `StyleGuidePage`)

**Variables:**
- camelCase for all variables (e.g., `postsDirectory`, `headingFont`, `bodyFont`)
- UPPER_SNAKE_CASE for string constants used as sample content (e.g., `SAMPLE_OPENING`, `SAMPLE_PARAGRAPH`)
- CSS custom properties use `--kebab-case` (e.g., `--font-heading`, `--color-cream-50`)

**Types/Interfaces:**
- PascalCase with descriptive names (e.g., `PostFrontmatter`, `PostMeta`, `BlogPostPageProps`)
- Use `interface` for object shapes, not `type` aliases
- Props interfaces use `{ComponentName}Props` suffix (e.g., `BlogPostPageProps`)

## Code Style

**Formatting:**
- No Prettier config detected. Relies on ESLint + editor defaults.
- Double quotes for strings (consistent across all files)
- 2-space indentation
- Semicolons always used
- Trailing commas in multi-line arrays/objects

**Linting:**
- ESLint 9 with flat config format: `eslint.config.mjs`
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- No custom rules added beyond Next.js defaults
- Run via `npm run lint`

**TypeScript:**
- Strict mode enabled in `tsconfig.json`
- Target: ES2017
- Path alias: `@/*` maps to `./src/*`

## Import Organization

**Order:**
1. External framework imports (`next`, `react`)
2. External library imports (`gray-matter`, `posthog-js`)
3. Internal imports using `@/` path alias (`@/lib/mdx`, `@/components/providers`)
4. Relative imports (CSS files, sibling modules)

**Path Aliases:**
- `@/*` resolves to `./src/*` - use this for all cross-directory imports
- Relative imports (`./`) only for same-directory siblings (e.g., `./posthog-provider`)

**Example (from `src/app/layout.tsx`):**
```typescript
import type { Metadata } from "next";
import { EB_Garamond, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
```

## Error Handling

**Patterns:**
- Use Next.js `notFound()` for missing resources (see `src/app/blog/[slug]/page.tsx`)
- Try/catch for dynamic imports with `notFound()` as fallback
- Guard with `fs.existsSync()` before file reads, return `null` for missing files (see `src/lib/mdx.ts`)
- Conditional rendering with `&&` guards for optional data (never throw on missing optional fields)
- Environment variable checks before initialization (see `src/components/providers/posthog-provider.tsx` lines 9-13)

**Example (from `src/app/blog/[slug]/page.tsx`):**
```typescript
const post = getPostBySlug(slug);
if (!post) {
  notFound();
}

let MDXContent;
try {
  MDXContent = (await import(`@/content/posts/${slug}.mdx`)).default;
} catch {
  notFound();
}
```

## Logging

**Framework:** None. No logging framework or console.log statements in the codebase. Analytics handled via PostHog and Vercel Analytics providers.

## Comments

**When to Comment:**
- Phase markers for placeholder/stub components: `// Phase 3` indicates planned future work
- CSS design intent comments in `globals.css` (e.g., `/* Direction: light base, dark accents, blue + gold, warm/regal/temple */`)
- Section markers in JSX using `{/* Section Name */}` for long page templates
- Inline explanations for non-obvious choices (e.g., `// Global font tokens - swap these to change typography site-wide`)

**JSDoc/TSDoc:**
- Not used. No JSDoc annotations in the codebase.

## Function Design

**Size:** Functions are kept small. Page components are the largest (up to ~180 lines for `src/app/blog/[slug]/page.tsx`), but most components are under 20 lines.

**Parameters:**
- React components use destructured props: `{ children }: { children: React.ReactNode }`
- Inline prop types for simple components (no separate interface when props are trivial)
- Named interfaces for complex props: `interface BlogPostPageProps { params: Promise<{ slug: string }> }`

**Return Values:**
- Utility functions return `null` for not-found cases (not `undefined`)
- Array functions return empty arrays `[]` for no-data cases
- Type narrowing via `post is PostMeta` filter predicates (see `src/lib/mdx.ts` line 70)

## Module Design

**Exports:**
- Named exports only. No default exports except page components (Next.js requirement).
- One component per file.
- Barrel files (`index.ts`) per component directory, but currently empty placeholders.

**Barrel Files:**
- `src/components/ui/index.ts` - UI components (placeholder)
- `src/components/rune/index.ts` - Rune chat components (placeholder)
- `src/components/blog/index.ts` - Blog components (placeholder)
- `src/components/providers/index.tsx` - Providers (active, exports `Providers` wrapper)

## Component Patterns

**Page Components:**
- Default export with `{Name}Page` naming
- Server components by default (no "use client" unless needed)
- Metadata exported as named `metadata` const or via `generateStaticParams`
- Layout: `<main>` as root with `mx-auto max-w-{size} px-4 py-16` centering pattern

**Client Components:**
- Mark with `"use client"` directive at top of file
- Only used when browser APIs required (PostHog, React hooks)
- Providers pattern: wrap children, initialize in `useEffect`

**Stub/Placeholder Components:**
- Return a `<div>` with text describing the phase: `return <div>Post card - Phase 3</div>;`
- Export an empty object from barrel files: `export {};`

## Styling

**Framework:** Tailwind CSS v4 with `@tailwindcss/postcss` plugin and `@tailwindcss/typography`

**Design Tokens:**
- Custom colors defined in `src/app/globals.css` via `@theme` block
- Color families: cream (light base), ink (dark), azure (blue accent), gold (amber accent), earth (supporting)
- Font tokens set via `next/font/google` in `src/app/layout.tsx`: `--font-heading`, `--font-body`, `--font-mono`
- Animations: `fade-in`, `float` defined in `@theme` block

**Tailwind Usage:**
- Utility-first with inline classes
- Use design token colors directly: `text-ink`, `bg-cream-50`, `border-gold`
- Prose plugin for MDX content: `className="prose prose-lg prose-neutral"`
- Responsive/spacing patterns: `mx-auto max-w-2xl px-4 py-16` for content pages
- Transition classes: `transition-colors` on interactive elements
- Group hover: `group-hover:text-neutral-600` for linked card patterns

**Dev-only pages:**
- Style guide at `src/app/dev/style-guide/page.tsx` - redirects to `/` in production via `process.env.NODE_ENV === "production"` check

## MDX Content

**Frontmatter Schema:**
- Required: `title`, `date`, `description`
- Optional: `tags`, `heroImage`, `published`, `hook`, `readTime`, `song`, `video`, `narration`, `references`, `cta`, `blogNumber`
- Type definition: `PostFrontmatter` interface in `src/lib/mdx.ts`
- Content files live in `src/content/posts/` as `.mdx` files

**MDX Components:**
- Custom overrides registered in `src/mdx-components.tsx` via `useMDXComponents()` (currently passthrough)

---

*Convention analysis: 2026-03-19*
