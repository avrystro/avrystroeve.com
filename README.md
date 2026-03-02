# avrystroeve.com

Personal blog and brand hub.

## Setup

```bash
git clone git@github.com:avrystro/avrystroeve.com.git
cd avrystroeve.com
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_POSTHOG_KEY` | No (Phase 4) | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No (Phase 4) | PostHog ingest endpoint |

## Project Structure

```
src/
  app/              # App Router pages
  components/       # React components
    rune/           # AI chat interface
    blog/           # Blog post layout and media
    ui/             # Shared components
    providers/      # Analytics and context providers
  content/posts/    # MDX blog posts
  lib/              # Utilities
public/             # Static assets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

Deployed to [Vercel](https://vercel.com). Pushes to `main` trigger automatic deployments.

Domain: [avrystroeve.com](https://avrystroeve.com)

## Blog Posts

Blog posts are MDX files in `src/content/posts/`. Each post has YAML frontmatter:

```yaml
---
title: "Post Title"
date: "2026-03-02"
description: "Short description for listings and SEO."
tags: ["tag1", "tag2"]
heroImage: "/images/post-hero.jpg"
published: true
---
```

## Architecture

This is the **code repo** (body). Planning, decisions, and content strategy live in the **brain repo** at `~/Developer/app.avry/blog/`. See `CLAUDE.md` for details.
