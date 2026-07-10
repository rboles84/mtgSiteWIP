# Handoff - VM-489 MTG / Commander Recurring Ideas

## Agent Name

Codex

## Task Requested

Research the repo docs, faction files, placement logic, dossier presentation, and vault/research material to identify unique MTG/Commander-side recurring idea candidates for robboles.com.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/research/canon/misc/vox_mana_color_bible_placement_engine_spec.md`
- `docs/design/placementLogic_deep-research-report.md`
- `docs/reference/commander-faction-guidance.md`
- `docs/reference/archscry-identity-matrix-data-map.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/research/canon/strixhaven/lorehold/lorehold_narrative_taxonomy.md`
- `docs/research/canon/strixhaven/lorehold/lorehold_translation_layer_functions.js`
- `docs/research/canon/strixhaven/lorehold/lorehold_structural_matrix.json`
- `data/raw-factions/azorius_senate/azorius_senate.profile.json`
- `data/raw-factions/azorius_senate/azorius_senate.placement.json`
- `data/raw-factions/prismari/prismari.profile.json`
- `data/raw-factions/izzet_league/izzet_league.profile.json`
- `data/raw-factions/wubrg/wubrg.profile.json`
- `data/raw-factions/colorless/colorless.profile.json`
- `data/raw-factions/glint/glint.profile.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `assets/js/adaptive-placement.js`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/archscry-result.js`
- `data/placement-model.json`

## Files Changed

- `docs/strategy/2026-07-09-robboles-mtg-commander-recurring-ideas.md`
- `docs/kanban/done/VM-489-robboles-mtg-commander-recurring-ideas.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-09-1958-codex-vm489-mtg-commander-ideas.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a standalone strategy note with ten MTG/Commander-specific recurring idea candidates, ranked by recurrence and distinctiveness.
- Added "better as post seeds" and "considered and cut" sections.
- Added VM-489 as a done Kanban card and indexed this handoff.

## Why It Changed

The prior response was not adequately repo-researched. This pass corrected that by grounding the candidates in raw faction packets, placement/dossier logic, research docs, and source-boundary guardrails.

## Decisions Made

- Treated generated/runtime files as presentation and architecture evidence, not canonical lore authority.
- Used raw faction packets and research docs as the stronger source layer.
- Kept the output blog-facing and Commander-specific, not product-copy or implementation guidance.
- Marked weaker items by strength rather than overstating them.

## Risks / Uncertainties

- The document cites rough recurrence by file family and observed pattern, not an exhaustive count across every raw faction packet.
- Some candidates overlap with prior QA/systems ideas, but this pass intentionally rephrases them through the MTG/Commander layer.
- Existing worktree contains many unrelated dirty files; they were not reverted or inspected beyond task relevance.

## Tests Run

- Not run; documentation and analysis only.

## Not Touched

- Runtime code behavior
- Generated JSON/data
- Raw faction source packets
- Public UI copy
- Tests and visual baselines

## Follow-Up Recommendations

- Pick 2-3 durable MTG-side names to thread through future robboles.com Table Talk posts.
- Convert the post seeds into backlog items if they are useful for blog planning.
- Consider a later pass that maps each candidate to concrete example posts and existing robboles.com drafts.

## Next Suggested Agent

Documentation Steward or Planning Architect.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-489-robboles-mtg-commander-recurring-ideas.md`
- `docs/strategy/2026-07-09-robboles-mtg-commander-recurring-ideas.md`
- VM-486
- VM-488
