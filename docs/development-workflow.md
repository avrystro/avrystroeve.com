# Development Workflow

How work gets planned, tracked, and shipped in this repo.

## The flow

```
PRD → Roadmap → Milestone → Plan per milestone → GitHub Issues → PRs → Merge
```

Each step feeds the next. Don't skip steps.

## 1. PRD (Product Requirements Document)

**File:** `docs/product/PRD.md`

The source of truth for what the product is and does. Updated after every product call or scope change. Living document.

## 2. Roadmap

**File:** `docs/product/roadmap.md`

Milestones in delivery order with dependencies and rationale. Updated when milestones are added, completed, or reprioritized.

## 3. Milestones

**GitHub:** `gh api repos/avrystro/avrystroeve.com/milestones`

One milestone per shippable target. Each milestone gets:

- A GitHub Milestone (with description)
- A directory at `docs/plans/milestone-N-shortname/`
- A `PLAN.md` inside that directory

## 4. GitHub Issues

**Created from:** the PLAN.md task list

One Issue per actionable unit of work. Format:

- Title: short imperative
- Body: context + acceptance criteria
- Labels: `enhancement` or `bug`
- Milestone: linked to the GitHub Milestone

## 5. Pull Requests

One PR per Issue. Format:

- Title: short imperative
- Body: `Closes #N` + summary + how to verify
- Squash-merge to keep main history clean

## Session workflow

### Starting a session

Run `/session-start`. It will:

1. Read `docs/product/PRD.md` (what the product is)
2. Read `docs/product/roadmap.md` (where we are)
3. Check `gh issue list` (live state)
4. Check `docs/plans/` for the active milestone plan
5. Read the latest devlog entry (what happened last time)
6. Recommend what to work on

### During a session

- Work on Issues. One branch per Issue.
- Commit early and often.

### Ending a session

Run `/session-end`. It will:

1. Create `docs/devlog/YYYY-MM-DD-session-title.md`
2. Close completed Issues on GitHub
3. Check if PRD/roadmap need updating
4. Ensure git is clean and pushed

## Directory conventions

```
docs/
├── development-workflow.md   This file
├── product/                  PRD, roadmap (living docs)
├── architecture/             Tech stack, data model, data flow, diagrams
├── adr/                      Architecture Decision Records (immutable)
├── reference/                Env vars, glossary
├── runbooks/                 Operational how-to guides
├── devlog/                   Per-session work journal (append-only)
├── plans/                    Milestone plans (immutable after Issues filed)
│   └── milestone-N-shortname/
│       └── PLAN.md
└── tutorials/                Learning walkthroughs
```

## Git conventions

### Branches

`feat/<slug>`, `fix/<slug>`, `chore/<slug>` — e.g. `feat/move-agent-skills`, `fix/lint-errors`.

### Commits

Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`. Imperative mood, one line.

### ADR threshold

Write an ADR when you'd want to know about the decision in 6 months while debugging something weird.

## What artifact goes where

| You want to record... | Goes in... |
|---|---|
| Product scope change | Update `docs/product/PRD.md` |
| A bug | GitHub Issue with `bug` label |
| A feature request | GitHub Issue with `enhancement` label |
| A load-bearing decision | `docs/adr/NNNN-decision-slug.md` |
| What you did this session | `docs/devlog/YYYY-MM-DD-*.md` |
| How to do an operational task | `docs/runbooks/*.md` |
| A milestone plan | `docs/plans/milestone-N/PLAN.md` |
| Live status of work | GitHub Issues + Milestones |
