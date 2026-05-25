# ADR 0004: Agent knowledge bases live in Supabase

**Status:** Accepted
**Date:** 2026-05-24

## Context

Each agent has a `references/` folder with curated markdown files (research notes, distilled wisdom, field logs). Currently these live on the filesystem in `brain/<agent>/references/`. Problems:

- Not editable from the dashboard without a git commit.
- Not queryable (can't search across agents, can't filter by tag).
- Not indexable for vector similarity retrieval (future RAG).
- Filesystem reads at runtime are fine for small sets but don't scale.

## Decision

Move agent knowledge into Supabase: `agent_knowledge` table with columns for `agent_id`, `title`, `body` (markdown text), `tags`, and an optional `embedding` vector column for future retrieval.

## Consequences

- Knowledge is editable from `/dashboard/agents/<name>` (add, edit, delete entries).
- Full-text search across all agent knowledge via Postgres `tsvector`.
- Future: vector similarity search via `pgvector` extension.
- At chat time, the API route queries `agent_knowledge WHERE agent_id = ?` and stuffs results into context alongside the system prompt.
- Migration: one-shot script reads existing `references/*.md` files and inserts rows.
