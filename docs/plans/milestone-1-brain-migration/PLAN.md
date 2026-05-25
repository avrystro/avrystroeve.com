# Milestone 1: Brain Content Migration — PLAN

## Scope

Dissolve `brain/` by moving every content type to its world-class home. After this milestone:
- Agent system prompts live at `src/lib/agents/<name>/skill.md`.
- Agent knowledge, conversations, canvases live in Supabase.
- Binary files live in Supabase Storage.
- Sync programs write to Supabase (not filesystem).
- `brain/` directory is deleted.

## Pre-conditions

- Milestone 0 complete (docs/ tree, CI, PRD, ADRs).
- Supabase project created (happens in Issue #3).
- `.env.local` has Supabase credentials.

## Issues (GitHub)

| # | Title | PR(s) |
|---|---|---|
| #2 | Move agent SKILL.md files to src/lib/agents/ | 1 PR |
| #3 | Create Supabase project + initial tables | 1 PR |
| #4 | Migration script: references → agent_knowledge | 1 PR |
| #5 | Upload voice memo audio to Supabase Storage | 1 PR |
| #6 | Insert transcripts into conversations table | 1 PR |
| #7 | Migrate excalidraw canvases to canvases table | 1 PR |
| #8 | Repoint voice-memo-pipeline to Supabase | 1 PR (in that repo) |
| #9 | Repoint fathom-sync to Supabase | 1 PR (in that repo) |
| #10 | Delete brain/ directory | 1 PR |

## Execution order

Issues #2 and #3 have no dependency — can run in parallel.
Issues #4–#7 depend on #3 (tables must exist).
Issues #8–#9 depend on #3 (Supabase must accept writes).
Issue #10 depends on ALL others (everything verified before deletion).

Recommended sequence:
1. **#2** — move SKILL.md files (pure file rename, no external deps).
2. **#3** — create Supabase project + migrations.
3. **#4** — run migration script for references.
4. **#5 + #6** — parallel: upload audio + insert transcripts.
5. **#7** — migrate canvases.
6. **#8 + #9** — parallel: repoint sync programs.
7. **#10** — verify everything, delete brain/.

## Step-by-step detail

### Issue #2: Move agent SKILL.md files

For each agent, copy the SKILL.md to its new home:

```
brain/god/SKILL.md          → src/lib/agents/god/skill.md
brain/body/chef/SKILL.md    → src/lib/agents/chef/skill.md
brain/body/trainer/SKILL.md → src/lib/agents/trainer/skill.md
brain/body/herbalist/SKILL.md → src/lib/agents/herbalist/skill.md
brain/family/wife/SKILL.md  → src/lib/agents/wife/skill.md
brain/homebase/farmer/SKILL.md → src/lib/agents/farmer/skill.md
brain/service/SKILL.md      → src/lib/agents/service/skill.md
brain/finances/SKILL.md     → src/lib/agents/finances/skill.md
```

Create `src/lib/agents/registry.ts`:
```ts
export const agents = [
  { id: 'god', displayName: 'God', scope: 'spiritual, philosophical' },
  { id: 'chef', displayName: 'Chef', scope: 'nutrition, recipes, cooking' },
  { id: 'trainer', displayName: 'Trainer', scope: 'movement, recovery, biomarkers' },
  { id: 'herbalist', displayName: 'Herbalist', scope: 'plant medicine, protocols' },
  { id: 'wife', displayName: 'Wife', scope: 'relationship, dating psychology' },
  { id: 'farmer', displayName: 'Farmer', scope: 'growing, soil, lunar timing' },
  { id: 'service', displayName: 'Service', scope: 'consulting, client work' },
  { id: 'finances', displayName: 'Finances', scope: 'accounts, runway, taxes' },
] as const
```

Update existing API route (`src/app/api/agent/chat/route.ts`) to load from new path.

**Verification:** `make typecheck` passes. Existing agent chat still works after path change.

### Issue #3: Create Supabase project + tables

1. Create project `avrystroeve-prod` on Supabase dashboard.
2. Install `@supabase/supabase-js` and `@supabase/ssr`.
3. Add env vars to `.env.local` and `.env.example`.
4. Run `supabase init` to scaffold `supabase/` locally.
5. Write migrations:
   - `0001_profiles.sql` — profiles table + trigger to sync from auth.users.
   - `0002_agents.sql` — agents + agent_knowledge tables + RLS.
   - `0003_conversations.sql` — conversations + conversation_contacts + messages + RLS.
   - `0004_canvases.sql` — canvases table + RLS.
6. Push migrations: `supabase db push`.

**Verification:** `supabase db push` succeeds. Tables visible in Supabase dashboard. RLS policies verified with `supabase test`.

### Issues #4–#7: Run migration scripts

Single script at `scripts/migrate-brain-to-supabase.ts` with subcommands or sections:
- Read all `brain/*/references/*.md` → INSERT into agent_knowledge.
- Upload all `brain/sources/voice-memos/*.m4a` → Supabase Storage.
- Read all `brain/sources/voice-memos/*.md` → INSERT into conversations (channel='voice-memo').
- Read all `brain/sources/fathom-calls/*.md` → INSERT into conversations (channel='fathom').
- Read all `brain/whiteboards/*.excalidraw` + co-located canvases → INSERT into canvases.

Script is idempotent (checks if row already exists before inserting, uses title+occurred_at as dedup key).

**Verification:** Dashboard query shows correct row counts. Sample transcript matches original file content. Audio plays from Storage URL.

### Issues #8–#9: Repoint sync programs

**voice-memo-pipeline:** Change output from filesystem write to Supabase Storage upload + conversations INSERT. Probably a new function in the pipeline: `upload-to-supabase.ts` that replaces the final `cp` step.

**fathom-sync:** Change `sync.ts` to INSERT into conversations table instead of writing `.md` to disk. Keep the markdown generation (it becomes the `transcript_md` column value).

Each repo gets its own commit + verification.

**Verification:** Record a new voice memo → pipeline runs → appears in Supabase conversations table + Storage. Run fathom sync → new call appears in conversations table.

### Issue #10: Delete brain/

After ALL verifications pass:
1. `git rm -rf brain/`
2. Update `AGENTS.md` — remove all brain/ references.
3. Update `src/app/api/brain-tree/route.ts` — either delete or repoint to Supabase.
4. Update `src/app/internal/` — will be fully replaced by `/dashboard/` in Milestone 2, but for now either remove or leave as broken (it's behind auth anyway).

**Verification:** `git status` shows brain/ gone. `make lint && make typecheck` pass. No dangling imports reference `brain/`.

## Rollback

Each issue has one PR. Each PR is independently revertable.

If the full milestone needs to roll back:
1. Revert PRs in reverse order.
2. Repoint sync programs back to filesystem (revert their repos).
3. brain/ comes back from git history.
4. Supabase data is still there (no harm; just unused).

## Risks

- **Voice memo binaries already in git history.** Repo size doesn't shrink by deleting brain/. Optional: run BFG Repo Cleaner after Milestone 1 ships. Not blocking.
- **Sync programs break during repoint.** Each has its own rollback (one commit revert). Can run old + new in parallel briefly.
- **Supabase free tier limits.** 500MB database, 1GB Storage. Plenty for current volume. Monitor.

## Timeline estimate

~1 week of focused work. Issues #2 + #3 parallelizable (day 1-2). Migration scripts (day 3-4). Sync repoints (day 5). Final verification + deletion (day 6).
