# Codebase Concerns

**Analysis Date:** 2026-03-19

## Tech Debt

**Stub Components (13 files):**
- Issue: 13 components and modules are placeholder stubs returning static "Phase 3" strings. They are exported but never imported anywhere. Dead code that signals incomplete scaffolding.
- Files: `src/components/ui/cta-card.tsx`, `src/components/blog/post-hero.tsx`, `src/components/blog/post-card.tsx`, `src/components/blog/media-player.tsx`, `src/components/blog/album-collection.tsx`, `src/components/rune/chat-sidebar.tsx`, `src/components/rune/chat-interface.tsx`, `src/components/rune/hamsa-icon.tsx`, `src/lib/rune.ts`
- Impact: Barrel files (`src/components/ui/index.ts`, `src/components/blog/index.ts`, `src/components/rune/index.ts`) export nothing (`export {}`). Any future import from these barrels will silently get nothing. The stubs themselves render visible placeholder text ("Post hero - Phase 3") which could leak to production if accidentally used.
- Fix approach: Either implement the components or delete stubs entirely. Keep barrel files but leave them truly empty until components exist. Do not ship components that render placeholder strings.

**Inline Blog Post Layout (186 lines in one file):**
- Issue: `src/app/blog/[slug]/page.tsx` contains the full blog post layout inline -- header, song section, article, video section, narration section, references, CTA -- all in a single return statement. No reusable components are used despite `PostLayout`, `PostHero`, `PostCard`, `MediaPlayer` stubs existing.
- Files: `src/app/blog/[slug]/page.tsx`
- Impact: Adding new post media types or changing layout requires editing this monolithic page. Duplicated styling patterns (e.g., the media card pattern for song/video/narration is copy-pasted 3 times with minor text differences).
- Fix approach: Extract into `PostLayout`, `PostHero`, `MediaSection` (for song/video/narration), `ReferencesSection`, and `CtaSection` components. The repeated media card pattern should be a single `MediaCard` component with a `type` prop.

**Placeholder Pages:**
- Issue: `/about` and `/book` pages are single-line placeholders returning "Coming soon." These are crawlable, indexable routes that deliver no content.
- Files: `src/app/about/page.tsx`, `src/app/book/page.tsx`
- Impact: SEO penalty for thin content. Users who discover these URLs get no value.
- Fix approach: Either implement the pages or add `noindex` meta tags. Alternatively, remove the routes entirely until content exists, and use a redirect if someone hits the URL.

**Homepage is a Placeholder:**
- Issue: `src/app/page.tsx` renders only "avrystroeve.com" and "Something is being built here." -- 8 lines total.
- Files: `src/app/page.tsx`
- Impact: The homepage is the primary landing page. It contains no navigation, no links to blog, no CTA. A visitor hitting the root URL has no way to discover blog content.
- Fix approach: Build a real homepage with navigation to `/blog`, recent posts, and a brief intro. At minimum add a nav link to `/blog`.

**No Shared Navigation or Layout Shell:**
- Issue: There is no navigation component, header, or footer anywhere in the codebase. Each page is completely standalone with no way to navigate between sections. The root layout (`src/app/layout.tsx`) wraps children in Providers but provides no chrome.
- Files: `src/app/layout.tsx`
- Impact: Users cannot navigate between pages without manually editing the URL. The blog list page has no link back to home. Blog post pages link back to `/blog` but nowhere else.
- Fix approach: Add a shared `<Header />` or `<Nav />` component in `src/components/ui/` and include it in `src/app/layout.tsx`.

**Empty API Directory:**
- Issue: `src/app/api/` directory exists but is completely empty.
- Files: `src/app/api/`
- Impact: No functional impact, but signals incomplete scaffolding.
- Fix approach: Delete the directory until API routes are needed.

## Known Bugs

**Unpublished Posts Accessible via Direct URL:**
- Symptoms: The blog listing page at `/blog` correctly filters by `published: true`. However, `src/app/blog/[slug]/page.tsx` does NOT check the `published` flag. Any post with `published: false` is accessible via direct URL and will be included in `generateStaticParams()` output.
- Files: `src/app/blog/[slug]/page.tsx` (line 16, no published check), `src/lib/mdx.ts` (`getPostBySlug` returns all posts regardless of published status)
- Trigger: Create an MDX file with `published: false` in frontmatter. Visit `/blog/[slug]` directly.
- Workaround: None currently. All posts with valid MDX files are publicly accessible.

**CTA Links to Non-Existent Route:**
- Symptoms: The blog post frontmatter CTA points to `/sessions` which does not exist as a route.
- Files: `src/content/posts/preparing-for-the-worst-case-scenario.mdx` (line 25: `url: "/sessions"`)
- Trigger: Click "Book a 1-on-1 Session" button on the blog post. Returns 404.
- Workaround: None. The CTA is broken.

## Security Considerations

**PostHog Client Initialization:**
- Risk: PostHog client is initialized in a `useEffect` but the `PHProvider` wraps children immediately with `posthog` (the global singleton) regardless of whether `init()` has been called. If `NEXT_PUBLIC_POSTHOG_KEY` is missing, the provider still wraps children with an uninitialized client.
- Files: `src/components/providers/posthog-provider.tsx`
- Current mitigation: PostHog SDK is resilient to being uninitialized (calls are no-ops). The conditional check on line 13 prevents init without credentials.
- Recommendations: Consider conditionally rendering `PHProvider` only when keys exist, or using a null provider pattern. Current approach works but is fragile if PostHog SDK behavior changes.

**Dynamic MDX Import (Path Traversal Surface):**
- Risk: `src/app/blog/[slug]/page.tsx` line 25 uses `await import(`@/content/posts/${slug}.mdx`)` where `slug` comes from URL params. Although Next.js and webpack module resolution provide implicit sandboxing (only files in the resolved directory can be imported), the pattern of interpolating user input into dynamic imports is a known anti-pattern.
- Files: `src/app/blog/[slug]/page.tsx`
- Current mitigation: `generateStaticParams` limits valid slugs at build time for static generation. The `getPostBySlug` check on line 16-20 validates the slug exists as a file before the dynamic import.
- Recommendations: Add explicit slug sanitization (alphanumeric + hyphens only) before the dynamic import as defense-in-depth.

## Performance Bottlenecks

**Synchronous Filesystem Reads:**
- Problem: `src/lib/mdx.ts` uses `fs.readFileSync` and `fs.readdirSync` for all post operations. `getAllPosts()` reads every MDX file synchronously, parses frontmatter for each, then sorts.
- Files: `src/lib/mdx.ts`
- Cause: Synchronous I/O blocks the Node.js event loop. With 1 post this is irrelevant; at 50+ posts it becomes measurable.
- Improvement path: Not urgent. Next.js static generation runs these at build time, not runtime. Monitor as post count grows. Switch to async `fs.promises` if needed.

**Three Google Fonts Loaded:**
- Problem: Three separate Google Font families are loaded: EB Garamond (3 weights), Libre Baskerville (2 weights), IBM Plex Mono (2 weights). That is 7 font files on initial page load.
- Files: `src/app/layout.tsx`
- Cause: Next.js `next/font/google` optimizes with `font-display: swap` and self-hosting, but 7 font files still add cumulative weight.
- Improvement path: Consider reducing weights. EB Garamond 400 and 700 may be sufficient (drop 500). IBM Plex Mono 400 only (drop 500). Saves 2-3 font files.

## Fragile Areas

**MDX Content Pipeline:**
- Files: `src/lib/mdx.ts`, `src/app/blog/[slug]/page.tsx`, `src/content/posts/*.mdx`, `next.config.ts`
- Why fragile: The MDX pipeline has 4 moving parts: gray-matter parses frontmatter, @next/mdx compiles MDX, dynamic import loads compiled components, and the page template renders metadata. A frontmatter schema change (e.g., adding a required field) silently breaks because `PostFrontmatter` uses optional fields with no runtime validation. The `data as PostFrontmatter` cast on line 63 of `src/lib/mdx.ts` is unchecked.
- Safe modification: When adding frontmatter fields, always make them optional with `?`. When changing the rendering template, test with both a fully-populated post and a minimal post (title + date + description only).
- Test coverage: Zero. No tests exist anywhere in this codebase.

**rehype-pretty-code Listed but Not Configured:**
- Files: `next.config.ts`, `package.json`
- Why fragile: `rehype-pretty-code` and `shiki` are installed as dependencies but `next.config.ts` has empty `rehypePlugins: []`. Code blocks in MDX posts get no syntax highlighting. If someone adds rehype-pretty-code to the config later, it may change how existing code blocks render.
- Safe modification: Add `rehype-pretty-code` to the rehype plugins array in `next.config.ts` with an explicit theme configuration.

## Scaling Limits

**File-Based Content at Scale:**
- Current capacity: 1 blog post. File system approach works fine up to ~100 posts.
- Limit: Beyond ~200 posts, `getAllPosts()` reading and parsing every file becomes slow at build time. No pagination, no categories, no search.
- Scaling path: Add pagination to blog listing page. Consider a content index cache (JSON manifest generated at build). For 500+ posts, migrate to a headless CMS or database-backed content.

## Dependencies at Risk

**GSAP Installed but Unused:**
- Risk: `gsap` (v3.14.2) is listed as a production dependency but is not imported anywhere in the source code. Dead dependency adding to bundle (if tree-shaking misses it) and maintenance burden.
- Impact: Increases `npm install` time and lockfile size. Potential supply chain surface.
- Migration plan: Remove with `npm uninstall gsap` unless animations are planned for immediate next phase.

## Missing Critical Features

**No Sitemap or RSS Feed:**
- Problem: No `sitemap.xml` or `robots.txt` configuration. No RSS feed for blog subscribers.
- Blocks: SEO indexing is suboptimal. No way for readers to subscribe to blog updates.

**No Open Graph / Social Meta Tags:**
- Problem: `src/app/layout.tsx` sets only `title` and `description` in metadata. No `openGraph`, `twitter`, or per-page metadata. Blog posts do not generate their own metadata.
- Files: `src/app/layout.tsx`, `src/app/blog/[slug]/page.tsx`
- Blocks: Social sharing shows generic metadata instead of post-specific title/description/image.

**No Error Boundaries or Custom 404/500 Pages:**
- Problem: No `not-found.tsx`, `error.tsx`, or `loading.tsx` in `src/app/`. Default Next.js error pages are shown.
- Blocks: Brand-inconsistent error experience.

## Test Coverage Gaps

**No Tests Exist:**
- What's not tested: Everything. Zero test files in the project. No test runner configured (no jest, vitest, or playwright in dependencies).
- Files: All of `src/`
- Risk: Any change to `src/lib/mdx.ts` (the content pipeline), frontmatter parsing, or page routing could silently break the blog. The `published` flag bug (documented above) would have been caught by a basic test.
- Priority: Medium. The codebase is small enough (~850 lines of source) that manual verification is feasible today. As the site grows, add at minimum: (1) a test that `getAllPosts()` returns only published posts, (2) a test that `getPostBySlug()` correctly parses frontmatter, (3) a build smoke test.

---

*Concerns audit: 2026-03-19*
