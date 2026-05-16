# finances/ — money domain

Single-agent domain. The finance agent covers personal financial reality: accounts, P&L, runway, taxes, recurring subscriptions, invoices, future planning. Plaid integration (TBD Phase 5).

## Folder shape

- `SKILL.md` — agent definition
- `references/` — account snapshots, monthly P&L, runway notes, tax documents, subscription inventory
- `assets/` — invoice template, monthly report template, runway model template
- `scripts/` — (later) Plaid sync, P&L calculator, runway projection

## Privacy

This folder contains sensitive financial data. The repo is private. Auth gate (`ADMIN_PASSWORD`) keeps `/internal/finances/*` and the file API behind a wall. Don't commit raw bank account numbers — store identifiers and metadata, with secrets in env vars (Plaid tokens, etc.).

## Source material

- Voice memos about money decisions, tax questions → `sources/voice-memos/`, distilled into `references/`
- Email from accountant → save manually to `sources/in-person/` (or create an `email/` channel if it gets common)

## Phase 5 scoping pending

The full scope of what lives in `references/` is its own conversation (per [PLAN.md Phase 5](../PLAN.md)). For now: empty scaffold + this README.
