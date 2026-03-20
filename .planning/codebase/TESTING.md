# Testing Patterns

**Analysis Date:** 2026-03-19

## Test Framework

**Runner:**
- No test framework installed or configured
- No test runner in `package.json` scripts
- No test configuration files (`jest.config.*`, `vitest.config.*`, `playwright.config.*`) detected

**Run Commands:**
```bash
npm run lint              # Only quality check available (ESLint)
npm run build             # Type checking via TypeScript strict mode
```

## Test File Organization

**Location:**
- No test files exist in the codebase
- No `__tests__/` directories
- No `*.test.*` or `*.spec.*` files

## Current State

This is an early-stage Next.js site with no testing infrastructure. The codebase has ~30 source files, most of which are placeholder stubs (Phase 3 markers). The only substantive logic lives in:

- `src/lib/mdx.ts` - File system reads, frontmatter parsing, sorting (most testable)
- `src/lib/utils.ts` - Single `cn()` class name joiner
- `src/components/providers/posthog-provider.tsx` - PostHog initialization with env var guards
- `src/app/blog/[slug]/page.tsx` - Dynamic MDX import with error handling

## Recommended Setup

When testing is introduced, follow these patterns based on the codebase structure:

**Recommended Framework:** Vitest (aligns with Vite-compatible tooling, fast, TypeScript-native)

**Installation:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Config file:** `vitest.config.ts` at project root

**Recommended config:**
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Add to package.json:**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Recommended Test File Organization

**Location:** Co-located with source files

**Naming:** `{filename}.test.ts` or `{filename}.test.tsx`

**Structure:**
```
src/
├── lib/
│   ├── mdx.ts
│   ├── mdx.test.ts          # Unit tests for MDX utilities
│   ├── utils.ts
│   └── utils.test.ts        # Unit tests for helpers
├── components/
│   └── blog/
│       ├── post-card.tsx
│       └── post-card.test.tsx
└── test/
    ├── setup.ts              # Global test setup
    └── fixtures/              # Shared test data
        └── posts.ts           # Mock frontmatter data
```

## Recommended Test Patterns

**Unit tests for `src/lib/mdx.ts` (highest priority):**
```typescript
import { describe, it, expect, vi } from "vitest";
import { getPostSlugs, getPostBySlug, getAllPosts } from "./mdx";

describe("getPostSlugs", () => {
  it("returns empty array when posts directory does not exist", () => {
    const slugs = getPostSlugs();
    expect(slugs).toEqual(expect.any(Array));
  });
});

describe("getAllPosts", () => {
  it("returns posts sorted by date descending", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it("filters out unpublished posts when filtered", () => {
    const posts = getAllPosts().filter((p) => p.published);
    posts.forEach((post) => {
      expect(post.published).toBe(true);
    });
  });
});
```

**Unit tests for `src/lib/utils.ts`:**
```typescript
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters falsy values", () => {
    expect(cn("foo", "", "bar")).toBe("foo bar");
  });
});
```

**Component tests (when components are built out):**
```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

## Mocking

**Recommended Framework:** Vitest built-in `vi.mock()`

**File system mocking (for `src/lib/mdx.ts`):**
```typescript
import { vi } from "vitest";

vi.mock("fs", () => ({
  existsSync: vi.fn().mockReturnValue(true),
  readdirSync: vi.fn().mockReturnValue(["post-one.mdx", "post-two.mdx"]),
  readFileSync: vi.fn().mockReturnValue(`---
title: "Test Post"
date: "2026-01-01"
description: "A test post"
published: true
---
Content here.`),
}));
```

**What to Mock:**
- File system operations (`fs` module in `src/lib/mdx.ts`)
- Environment variables (`process.env.NEXT_PUBLIC_POSTHOG_KEY`)
- Next.js navigation functions (`notFound`, `redirect`)

**What NOT to Mock:**
- Pure utility functions (`cn`, sorting logic)
- Component rendering (use Testing Library instead)
- TypeScript interfaces/types

## Fixtures and Factories

**Recommended test data (create at `src/test/fixtures/posts.ts`):**
```typescript
import type { PostFrontmatter, PostMeta } from "@/lib/mdx";

export function createPostMeta(overrides?: Partial<PostMeta>): PostMeta {
  return {
    slug: "test-post",
    title: "Test Post",
    date: "2026-01-01",
    description: "A test post description",
    published: true,
    tags: ["test"],
    ...overrides,
  };
}
```

## Coverage

**Requirements:** None enforced. No coverage thresholds configured.

**Priority areas for coverage when testing is added:**
1. `src/lib/mdx.ts` - Core content pipeline (file reads, parsing, sorting)
2. `src/lib/utils.ts` - Utility functions
3. Blog page components - Rendering with various frontmatter combinations
4. Provider initialization - Env var guard behavior

## Test Types

**Unit Tests:**
- Target: `src/lib/` utility functions, data processing
- Framework: Vitest
- Priority: High for `mdx.ts` (core content logic)

**Integration Tests:**
- Not applicable yet. No API routes, no database, no server actions.

**E2E Tests:**
- Not configured. When needed, use Playwright.
- Priority candidates: blog post rendering, navigation, MDX content display
- Dev-only style guide page (`/dev/style-guide`) has production redirect guard worth E2E testing.

**Visual/Snapshot Tests:**
- Not configured. Could be useful for the style guide page and design token verification.

---

*Testing analysis: 2026-03-19*
