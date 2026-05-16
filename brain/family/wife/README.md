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

## Migration history

Migrated 2026-05-16 (Phase 1.8) from `~/Developer/app.avry/life/my-wife/`. Old location deleted (clean cut). Content split as:

- `my-wife.md` (17 KB) → `references/wife-profile.md`
- `field-log.md` (7.5 KB) → `references/field-log.md`
- `research/relationship-dynamics.md` (36 KB) → `references/relationship-dynamics.md`
- `research/attraction-mastery.md` (37 KB) → `references/attraction-mastery.md`
- Old `INDEX.md`, `HANDOFF.md`, `_archive/*` → discarded
- Old `INDEX.md` backlog → lifted into this README (see below)

Cross-refs to `life/<other>.md` files were rewritten as absolute paths to `~/Developer/app.avry/life/` (those files still live there until further migration).

## Active backlog

### Strategy execution
- [ ] Optimize dating profile (Hinge + Tinder) — pictures, bio, prompts, Instagram handle
- [ ] Optimize Instagram for social proof — story strategy, content mix, frequency
- [ ] Define WhatsApp conversation flow (match → number → date/gathering)
- [ ] Plan first gathering in Nosara (dinner + bonfire? size? venue?)
- [ ] Build guest list system (names + Instagrams for gatherings)

### Research + refinement
- [ ] Research: height genetics (can taller children be influenced?)
- [x] Develop strategy: WHERE and HOW to find her — 5 channels + funnel defined (Session 47)
- [ ] Build filter system: quick identification of who's worth time vs who isn't
- [ ] Continue adding past relationship learnings
- [ ] Define non-negotiables vs nice-to-haves (refine after more sessions)

### Linked voice memos (not yet migrated)
- [2026-03-25 men-do-the-big-things-women-do-the-small-things](~/Developer/app.avry/conversations/voice-memos/inbox/2026-03-25-men-do-the-big-things-women-do-the-small-things.md) — Ilan + Avry on yin-yang, Mediterranean culture, Ilan's Miami crush. (Lives at old location since pre-dates Phase 1.5 sync repoint.)

## Adjacent agents

- God ([../../god/](../../god/)) — spiritual practice within partnership, prayer for her, divine purpose of union
- Body ([../../body/](../../body/)) — anything that touches her health if she shares it
- Service ([../../service/](../../service/)) — work-life balance, business decisions that affect her

The wife agent does NOT cover other women / past relationships / dating-app strategy. This agent is about the ONE relationship that matters.
