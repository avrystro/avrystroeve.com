// Agent registry — keep in sync with brain/<domain>/ folder shape.
// Each entry: the brain path that contains a SKILL.md, the display name, and a
// one-line scope summary shown in the ChatPanel header.
//
// To add a new agent: scaffold brain/<path>/SKILL.md + README.md +
// references/ + assets/ + scripts/, then add it here. Future Phase 4+:
// auto-discover by checking for SKILL.md presence at the path.

export type Agent = {
  path: string   // e.g. "body/herbalist"
  name: string   // e.g. "Herbalist"
  scope: string  // shown in chat header
}

export const AGENTS: Agent[] = [
  {
    path: 'god',
    name: 'God',
    scope: 'Spiritual companion. Wisdom traditions, practice, discernment.',
  },
  {
    path: 'body/chef',
    name: 'Chef',
    scope: 'Nutrition, ingredients, recipes, cooking, Nosara sourcing.',
  },
  {
    path: 'body/trainer',
    name: 'Trainer',
    scope: 'Workouts, recovery, sleep, biomarkers, sport-specific work.',
  },
  {
    path: 'body/herbalist',
    name: 'Herbalist',
    scope: 'Herbal protocols, plant medicine, apothecary, materia medica.',
  },
  {
    path: 'finances',
    name: 'Finances',
    scope: 'Accounts, runway, P&L, taxes, recurring subs.',
  },
]

/**
 * Given a brain path (e.g. ["body", "herbalist", "references", "notes.md"]),
 * return the closest ancestor agent or null if not inside any agent.
 */
export function resolveAgent(segments: string[]): Agent | null {
  if (!segments.length) return null
  const candidate = segments.join('/')
  // Match longest-prefix-first (so body/herbalist beats body/)
  const matches = AGENTS.filter((a) => candidate === a.path || candidate.startsWith(a.path + '/'))
  if (matches.length === 0) return null
  return matches.sort((a, b) => b.path.length - a.path.length)[0]
}
