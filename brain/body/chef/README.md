# chef/ — nutrition + cooking sub-agent

Lives under [body/](../). Specializes in food: ingredients, recipes, cooking techniques, meal planning, nutrition fundamentals, sourcing (especially Nosara / Costa Rica context — what's seasonal, where to source, what's worth importing).

## Folder shape

- `SKILL.md` — agent definition + system prompt
- `references/` — recipes, ingredient notes, cooking class distillations, dietary frameworks
- `assets/` — recipe template, weekly meal plan template, shopping list template
- `scripts/` — (later) macro calculator, recipe scaler

## Adjacent agents

- Herbalist ([../herbalist/](../herbalist/)) — for medicinal plants used as food (turmeric protocols, adaptogen drinks, etc.) — overlap is fine, both agents may reference the same plant
- Trainer ([../trainer/](../trainer/)) — for performance nutrition (pre/post-workout, recovery foods)
