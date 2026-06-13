# VM-331 - Colorless Placement Page Copy Polish And Maze Query Repair

Status: Done
Owner: Codex
Role: Runtime Steward / Test Strategist
Area: Colorless, Archscry, Maze, Dossier UX

## Summary

Repair the remaining live Colorless placement/dossier copy seams after VM-329 and fix the blocking Maze reading-path bug where active Colorless paths can inherit stale WU queries, labels, or badges from restored handoff state.

## Pre-Flight Notes

- VM-330 is occupied by the Four-Color Layer 1 Authority Sweep, so VM-331 is the next Colorless repair card.
- VM-329 is the baseline and already fixed Colorless hero mapping, strict precon support, deck-start dedupe, duplicate card-example handling, mana-base source data, and direct Colorless Maze helper lanes.
- The likely remaining Maze bug is in restore/handoff/sidebar derivation, not the Colorless lane factory itself.
- The worktree is broadly dirty; preserve unrelated drift and do not stage files.

## Scope

- Treat `COLORLESS`, `Colorless`, `colorless`, `C`, and `c` as equivalent Colorless active-fit signals for restore/handoff derivation.
- Ensure native Colorless restored Maze paths use:
  - `id=c is:commander f:commander`
  - `id<=c f:commander -is:commander (t:artifact OR o:{C} OR o:"colorless mana" OR o:Eldrazi)`
  - `id<=c f:commander (ft:cosmic OR ft:void OR ft:waste OR ft:wastes OR ft:eldrazi)`
  - `-id<=c is:commander f:commander (t:artifact OR o:"colorless mana" OR o:Eldrazi OR o:artifact)`
- Polish Colorless runtime/display copy without reopening raw source authority.
- Add focused regression coverage for stale WU restore state and Colorless copy seams.

## Out Of Scope

- Raw Colorless JSON or ledgers.
- Route/Home/Maze route policy, public aliases, hero asset files, precon policy, promotion status, placement eligibility, schemas, or canon relocation.
- Reworking VM-329 fixes unless regression tests show they broke.
- Staging or committing files.

## Acceptance Criteria

- Colorless native Maze paths cannot emit `id=wu`, `id<=wu`, `white-blue identity`, or native badge `WU` when active fit is Colorless.
- Adjacent Abzan/Bant/WU signals remain explanatory only and do not determine native Colorless query identity.
- Colorless dossier copy is shorter, grammatical, outside-WUBRG, and true-{C} specific.
- Raw Colorless source authority is unchanged.
- VM-331 handoff records cause, corrected behavior, files changed, tests run, and preserved drift.

## Completion Notes

- Fixed Colorless restore/handoff derivation so active Colorless signals override stale WU operator/query state for native dossier paths.
- Polished Colorless runtime copy around outside-WUBRG deckbuilding, true `{C}`, Wastes, artifact infrastructure, signal dedupe, and mana-base tiers.
- Added focused regressions for stale WU handoff restoration, Colorless Maze lanes, copy seams, and VM-329 preservation checks.
- Raw Colorless hashes remained unchanged.
