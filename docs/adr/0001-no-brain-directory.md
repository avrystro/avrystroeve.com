# ADR 0001: Dissolve brain/ directory

**Status:** Accepted
**Date:** 2026-05-24

## Context

The repo had a top-level `brain/` directory containing agent system prompts, agent knowledge bases, voice memo recordings, fathom call transcripts, excalidraw canvases, and project-management files. This was a personal naming convention. No world-class team stores user content in a `brain/` folder inside a web app repo.

The core problem: git repos are for code, not for mutable user data or binary files. Audio files bloat the repo. Markdown "knowledge bases" that need to be editable from a dashboard UI belong in a database.

## Decision

Dissolve `brain/` entirely. Move each content type to its proper home:

- Agent system prompts → `src/lib/agents/<name>/skill.md` (code)
- Agent knowledge bases → Supabase `agent_knowledge` table (data)
- Audio/video files → Supabase Storage (object store)
- Transcripts → Supabase `conversations` table (data)
- Canvases → Supabase `canvases` table (data)
- Project-management files → `docs/` (documentation)

## Consequences

- The repo is pure code + docs. User data lives in Supabase.
- Sync programs (voice-memo-pipeline, fathom-sync) must be repointed to write to Supabase instead of the filesystem.
- The existing brain browser UI (`/internal/*`) becomes a Supabase-backed dashboard at `/dashboard/agents`.
- Migration is phased: content moves over 2-3 milestones.
- Binary files stop bloating git history.
