# ADR 0005: Binary files (audio, video) in Supabase Storage

**Status:** Accepted
**Date:** 2026-05-24

## Context

Voice memo recordings (`.m4a`) and potential call recordings are binary files. Currently committed to git in `brain/sources/voice-memos/`. Problems:

- Each audio file is 1-10 MB. Git history retains every version forever.
- Repo size grows linearly with each new recording. Clone becomes slow.
- Vercel deploys transfer the full repo — larger builds, slower deploys.
- Git is not designed for binary asset management.

## Decision

Store all binary captures in Supabase Storage. Bucket: `captures/voice-memos/`, `captures/fathom-calls/`. Private, RLS-gated (only authenticated user can read/write).

## Consequences

- Repo stays lean (code + docs only).
- `git clone` stays fast regardless of how many recordings exist.
- Voice-memo-pipeline and fathom-sync will write directly to Supabase Storage (via API or CLI upload) instead of to the filesystem.
- The dashboard can serve audio playback directly from Storage URLs.
- Migration: one-shot upload of existing `.m4a` files to Storage, then `git rm` the binaries.
- Existing git history still contains the old binaries. Optional: run `git filter-branch` or BFG to purge. Not blocking.
