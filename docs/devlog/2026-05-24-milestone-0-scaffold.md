---
date: 2026-05-24
session_title: "Milestone 0: Scaffold world-class development system"
---

# Milestone 0: Scaffold world-class development system

## Shipped

- `docs/` tree with 9 subdirectories and READMEs (product, architecture, adr, plans, reference, runbooks, devlog, tutorials, glossary)
- `docs/product/PRD.md` — full product spec (vision, two-layer architecture, 7 dashboard sections, DB schema, route table, target repo layout)
- `docs/product/roadmap.md` — 9 milestones sequenced with dependencies
- 6 ADRs (0001-0006): no brain dir, Supabase Auth, agent prompts in code, agent knowledge in DB, binaries in Storage, /dashboard route
- Metadata files: CONTRIBUTING.md, CHANGELOG.md, LICENSE, Makefile, .editorconfig
- GitHub CI (.github/workflows/ci.yml — lint + typecheck on every push)
- PR template + issue templates (feature, bug)
- Migrated brain/ project-management files (PROJECT, HANDOFF, LOG, PLAN) into docs/
- 9 GitHub Milestones (0-8) + 9 Issues for Milestone 1 (#2-#10)
- Milestone 1 plan at docs/plans/milestone-1-brain-migration/PLAN.md
- Fixed 4 pre-existing lint errors (unescaped entities, setState in effect)
- Stripped .m4a files from git history (were blocking push), added audio/video to .gitignore

## Decisions made

1. **Dissolve brain/ entirely** — agent prompts to code, knowledge/conversations/canvases to Supabase, binaries to Supabase Storage. ADR 0001.
2. **Supabase Auth magic link** replaces ADMIN_PASSWORD cookie. ADR 0002.
3. **Agent prompts as markdown in code** at `src/lib/agents/<name>/skill.md`. ADR 0003.
4. **Agent knowledge in Supabase** `agent_knowledge` table. ADR 0004.
5. **Binaries in Supabase Storage**, not git. ADR 0005.
6. **`/dashboard` route** replaces `/internal`. ADR 0006.
7. **`docs/plans/`** for planning, NOT `.planning/`. Debated with another chat — `.planning/` is a GSD plugin convention, not an industry standard. Vercel/Stripe/Linear don't have `.planning/`.
8. **GitHub Issues + Milestones** as the tracking system. No file-based tracking duplication.
9. **Phased brain migration** — scaffold homes first (M0), migrate content (M1), build features (M2+).
10. **Seven dashboard sections**: Today, Inbox, People, Money, Agents, Canvases, Settings.

## Gotchas surfaced

- `git add -A` picked up untracked .m4a voice memo files (some >100MB). GitHub rejected the push. Had to use `git filter-branch` to strip them from history. Added `*.m4a` to `.gitignore` to prevent recurrence.
- The `gh` CLI token lacks `read:project` scope — can't create GitHub Projects V2 via CLI. Manual step needed.
- ESLint's `react-hooks/set-state-in-effect` rule flags a common data-fetching pattern. Suppressed with inline disables for now.

## Subtractions

- Removed `.planning/` from the plan. Everything lives in `docs/plans/`.
- Dropped SECURITY.md and CODEOWNERS (overkill for solo project).
- Won't migrate `avry-app` or `avry-os-dashboard` code — those repos get deleted after M1-M8 ship.

### Next session

**Mode:** execution

**Pick up:** Milestone 1 — Brain Content Migration. 9 issues (#2-#10), all open.

**Start with:** Issue #3 (Create Supabase project + initial tables) — this is on the critical path. Issues #4-#7 all depend on it. Issue #2 (move SKILL.md files) can run in parallel.

**Branch strategy:** branch off `main` for each issue (`feat/move-agent-skills`, `feat/supabase-setup`, etc.). One PR per issue. Squash-merge.

**To start:**
```bash
git checkout -b feat/supabase-setup
```
