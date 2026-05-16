# wife/ — relationship + game + wife-profile sub-agent

Lives under [family/](../). Holds Avry's full thinking + knowledge about his wife (or the wife he is becoming partnered with — applies whether the relationship is established, forming, or being discerned).

## What this agent contains

Four interrelated functions:

1. **Wife profile.** Specific knowledge about her: what she loves, what she fears, her family, her body, her dreams, her triggers, her growth. Updated as Avry learns more.
2. **Game + dating psychology.** Frameworks Avry has internalized — attachment styles, communication, masculine/feminine polarity, scarcity vs abundance, frame, congruence, etc.
3. **Date + experience planning.** Specific date ideas, gift ideas, anniversary milestones, conversation topics. Can be asked: "plan a Friday night for us."
4. **Field log.** Avry's running observations from real interactions — what worked, what didn't, what he noticed, lessons.

## Folder shape

- `SKILL.md` — agent definition (handles all four functions above)
- `references/` — the knowledge:
  - `wife-profile/` — who she is (background, family, body, dreams, etc.)
  - `field-log/` — Avry's observations over time (or a single rolling `field-log.md`)
  - `frameworks/` — game, dating psych, attachment, polarity, etc. (distilled)
  - `research/` — book notes / podcast / video distillations on relationships
- `assets/` — date templates, conversation prompts, anniversary milestones, gift trackers
- `scripts/` — (later) anniversary reminder helper, date-rotation suggester

## Migration pending (Phase 1.8)

Avry has existing material at `~/Developer/app.avry/life/my-wife/` including research and a field log. Phase 1.8 migrates that content into this agent's `references/`. Before execution, a read-only exploration pass produces a detailed file-by-file mapping for approval.

## Adjacent agents

- God ([../../god/](../../god/)) — spiritual practice within partnership, prayer for her, divine purpose of union
- Body ([../../body/](../../body/)) — anything that touches her health if she shares it
- Service ([../../service/](../../service/)) — work-life balance, business decisions that affect her

The wife agent does NOT cover other women / past relationships / dating-app strategy. This agent is about the ONE relationship that matters.
