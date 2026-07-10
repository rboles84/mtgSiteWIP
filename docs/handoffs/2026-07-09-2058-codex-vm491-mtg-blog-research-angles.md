# Handoff - VM-491 MTG Blog Research Angles

## Agent Name

Codex

## Task Requested

Rework the MTG/Commander recurring idea direction into more flavorful, blog-ready research angles: science-backed placement logic, flavor as taste, platform/recommendation gaps, and safe correlations or data observations.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/strategy/2026-07-09-robboles-mtg-commander-recurring-ideas.md`
- `docs/research/canon/misc/MTG Archetype Definition and Translation.md`
- `docs/research/webdev/vox-mana-specific/MTG_Beginner_Resource_Strategy.md`
- `docs/research/vox_mana_dossier_research_packet.md`
- `docs/design/strategium-archetype-source-audit.md`
- `docs/audits/gate-compression/live-gate-bias.md`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.md`
- `docs/research/vox-mana-placement-decomposition-pro.html`
- `docs/research/vox-mana-decomposition-insight.html`
- `data/taxonomy/vox-mana-tags.json`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `docs/design/placementLogic_deep-research-report.md`
- `docs/research/canon/misc/vox_mana_color_bible_placement_engine_spec.md`

## Files Changed

- `docs/strategy/2026-07-09-robboles-mtg-blog-ready-research-angles.md`
- `docs/kanban/done/VM-491-robboles-mtg-blog-research-angles.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-09-2058-codex-vm491-mtg-blog-research-angles.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a blog-facing supplement with ten research-backed MTG/Commander article angles.
- Added a safe data-claims section distinguishing model/research evidence from absent player-population correlations.
- Added VM-491 done card and indexed this handoff.

## Why It Changed

The VM-489 note was too product-internal and not flavorful enough for the user's intended blog voice. This pass lifts the research into sharper public-facing ideas without overclaiming.

## Decisions Made

- Kept platform comparisons respectful: EDHREC/Archidekt/MTGDecks solve popularity/decklist problems, while the proposed angle is taste/meaning/table signal.
- Treated correlations from the precon JSONL as curated artifact correlations only.
- Avoided claiming live user behavioral correlations because no sufficient user-outcome dataset was found in this pass.

## Risks / Uncertainties

- The precon dataset includes third-party/product rows and should be described as curated research, not comprehensive Commander metagame data.
- Some docs contain old generated research prose with citation artifacts; the strategy note uses them as local research context, not final public citations.
- Worktree remains dirty with unrelated changes; no unrelated files were reverted.

## Tests Run

- `node -e` summary over `data/taxonomy/vox-mana-tags.json`
- `node -e` summary and pairwise correlation scan over `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`

## Not Touched

- Runtime code
- Generated JSON/data
- Raw faction source packets
- UI copy
- Test suites

## Follow-Up Recommendations

- Choose the top 3 phrases as named recurring ideas for robboles.com.
- Write one pilot post from "Flavor Is How Mechanics Taste" using 3 deck examples.
- Add real placement-outcome instrumentation later if player-population correlation claims become desirable.

## Next Suggested Agent

Documentation Steward or Planning Architect.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-491-robboles-mtg-blog-research-angles.md`
- `docs/strategy/2026-07-09-robboles-mtg-blog-ready-research-angles.md`
- VM-489
- VM-488
- VM-486
