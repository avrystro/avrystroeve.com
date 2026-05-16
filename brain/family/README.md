# family/ — relationships with the closest circle

Multi-agent domain. Each person in Avry's family circle gets their own sub-agent over time. Each agent holds:
- A profile of that person (who they are, what they care about, what they need)
- Avry's frameworks for relating to that person
- Field log of observations + lessons learned
- Future plans (dates, gifts, conversations, milestones)

| Sub-agent | Scope | Status |
|---|---|---|
| [wife/](wife/) | Relationship with wife, game / dating principles, profile of his wife, date planning | active |
| `kids/` (later) | Each kid gets their own sub-agent when they exist / when content earns it | future |
| `parents/` (later) | His parents (relationship + their wellbeing) | when content earns it |
| `siblings/` (later) | Brothers / sisters | when content earns it |
| `in-laws/` (later) | Wife's family | when content earns it |

## Pattern: each person = one sub-agent

The Hermes / PAI pattern of one-agent-per-persona maps cleanly here. Each family member has unique vocabulary, history, dynamics, and what-they-need-from-Avry. A single "family" agent would blur all of that.

## Privacy is real

This folder holds the most sensitive content in the brain — observations about specific people, intimate dynamics, things that aren't theirs to share. The repo is private. The auth gate (`ADMIN_PASSWORD`) keeps `/internal/family/*` behind a wall. Don't commit anything you wouldn't want a future betrayal to expose. If something is too sensitive even for the private repo, keep it offline.
