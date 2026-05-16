# farmer/ — growing + soil + climate sub-agent

Lives under [homebase/](../). Specializes in growing food and plants for the long term: soil amendment, lunar timing windows, local climate (especially Guanacaste / Costa Rica's 5 biospheres), seed-saving, raised-bed and greenhouse setup, irrigation, pollinator planting.

## Folder shape

- `SKILL.md` — agent definition + system prompt
- `references/` — distilled knowledge: lunar windows, soil recipes, climate notes, plant-specific growing info, seed-saving protocols
- `assets/` — raised-bed recipe template, planting calendar template, irrigation diagrams
- `scripts/` — (later) lunar window calculator, climate-zone lookup

## Adjacent agents

- Chef ([../../body/chef/](../../body/chef/)) — for what to eat once it's grown
- Herbalist ([../../body/herbalist/](../../body/herbalist/)) — for medicinal-plant cultivation overlap (turmeric, moringa, etc.). Same plant, different lens.
- (Future) Builder — for greenhouse and irrigation infrastructure

## Initial knowledge seed

The 2026-05-13 herbalist conversation with Catherine produced major farmer content. The distilled material lives in [`references/`](references/) including:
- Catherine's lunar planting calendar
- Soil recipe (compost · sand · charcoal · rice hulls · coconut coir · dirt · composted manure)
- Guanacaste climate constraints (Dec 15 – Apr 15 dry; 100°F; 5–7 AM work window)
- Costa Rica's 5 biospheres + central-valley alternative for off-grid living
- Seed-saving protocols (tomatoes / papayas: ferment 3–4 days, then dry)

The original raw conversation lives at [`brain/sources/voice-memos/2026-05-13-nosara-herbalist-conversation.md`](../../sources/voice-memos/2026-05-13-nosara-herbalist-conversation.md). The herbalist whiteboard at [`brain/body/herbalist/references/2026-05-13-nosara-apothecary-conversation.excalidraw`](../../body/herbalist/references/2026-05-13-nosara-apothecary-conversation.excalidraw) contains the cross-agent routing notes.
