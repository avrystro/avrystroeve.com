# Contributing

## Commits

Use conventional commits:
- `feat:` — new user-facing feature
- `fix:` — bug fix
- `chore:` — tooling, config, refactoring (no user-visible change)
- `docs:` — documentation only
- `test:` — tests only

One sentence in the subject line. Body optional for context.

## Branches

- `main` — production. Always deployable.
- `feat/<slug>` — feature branches.
- `fix/<slug>` — bug fix branches.
- `chore/<slug>` — housekeeping branches.

## Pull requests

Every PR must:
1. Link to a GitHub Issue (`Closes #XX`).
2. Describe the outcome in one sentence.
3. Include verification steps (how to confirm it works).
4. Pass CI (lint + typecheck).

## Code style

- TypeScript strict mode.
- ESLint handles formatting and linting.
- No comments unless the WHY is non-obvious.
- Prefer editing existing files over creating new ones.
