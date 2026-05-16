# body/ — health, nutrition, training, herbalism domain

Multi-agent domain. Body health is too broad for a single agent — instead, three specialist sub-agents that you talk to individually:

| Sub-agent | Scope | Lives in |
|---|---|---|
| [chef/](chef/) | Nutrition, ingredients, recipes, cooking, meal planning | `chef/SKILL.md` |
| [trainer/](trainer/) | Movement, workouts, biomarkers, sleep, recovery | `trainer/SKILL.md` |
| [herbalist/](herbalist/) | Herbs, apothecary, plant medicine, protocols | `herbalist/SKILL.md` |

## Why sub-agents instead of one fat agent

Anthropic's agent-design principle: bounded specialization. A herbalist thinks about plants and tinctures. A chef thinks about ingredients and ratios. A trainer thinks about reps and recovery. Forcing one agent to be all three blurs vocabulary and weakens advice.

You click each sub-agent in the sidebar and chat with them directly. Long-term (Phase 4+), a body-level orchestrator could route incoming questions to the right sub-agent automatically — for now, you choose.

## Source material

Body-related voice memos and reading notes land first in `sources/` (typed by channel). Triage:

- General body / health content with no clear sub-domain → leave in `sources/` until a clearer home emerges.
- Cooking class transcript, recipe research → `chef/references/`
- Workout log, biomarker reading, sleep data → `trainer/references/`
- Conversation with an herbalist, plant identification, protocol notes → `herbalist/references/`

## Adding a new sub-agent

If a new body specialist emerges (e.g. sleep specialist, breathwork coach), copy the structure of one of the existing sub-agents (`chef/`, `trainer/`, `herbalist/`) and edit the `SKILL.md`. Sidebar picks it up automatically.
