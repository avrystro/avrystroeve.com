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
- GSAP for animations (SplitText + ScrollSmoother now free)
- PostHog for analytics (client-side)
- Vercel for hosting

## Design System Principles

The design system is grounded in sacred geometry - golden ratio, Fibonacci sequence, and temple architecture proportions. This is NOT decorative. It IS the infrastructure. Every spacing value, font size, and proportion derives from these mathematical relationships.

**Full research:** `~/Developer/app.avry/blog/research/sacred-design-system.md`

### The Rules (Non-Negotiable)

1. **Typography scale = golden ratio (phi = 1.618) from 18px base.** Each step up multiplies by phi or sqrt(phi). Defined as `--font-size-*` tokens in globals.css. Never use arbitrary font sizes.

2. **Spacing = Fibonacci sequence.** Values: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144px. Defined as `--spacing-*` tokens. Never use spacing values outside this scale (no 10px, 16px, 24px, etc.).

3. **Line heights = sacred ratios.** Headings: 1.272 (sqrt(phi)). Subheadings: 1.414 (sqrt(2)). Body: 1.618 (phi). Spacious: 1.732 (sqrt(3)). Defined as `--leading-*` tokens.

4. **Content width = 42rem (~672px).** Derived from golden ratio typography formula: line-height^2. This is the reading column width.

5. **Two-column layouts = 61.8% / 38.2%.** The golden split. Content gets the major portion.

6. **Border radius = Fibonacci.** 3, 5, 8, 13, 21px. Defined as `--radius-*` tokens.

7. **Colors are temple-derived.** Two palettes in globals.css: "Current" and "Temple". Temple palette comes from Egyptian (lapis lazuli, gold leaf, ochre), Greek (polychrome pigments), and Gothic (stained glass) sources. Gold + Lapis = near-complementary pair (175 degrees on color wheel).

### How to Use

- Use Tailwind classes that reference the design tokens: `text-[length:var(--font-size-lg)]`, `p-[length:var(--spacing-13)]`, etc.
- Or use the semantic Tailwind names that map to these values once finalized.
- When building new components, check globals.css `@theme` for available tokens FIRST.
- If you need a value that doesn't exist in the scale, you're probably doing it wrong. Find the nearest Fibonacci/phi value.

### Aesthetic Direction

- Light base, dark accents, blue + gold, warm/regal/temple
- Two tones: clean/modern for chat interface, temple/oasis for content spaces
- Ma (meaningful emptiness): generous whitespace IS the design, not wasted space
- Wabi-sabi: subtle texture, warm off-whites, organic over mechanical
- Screen-as-stained-glass: colors are light, use luminous quality intentionally

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
