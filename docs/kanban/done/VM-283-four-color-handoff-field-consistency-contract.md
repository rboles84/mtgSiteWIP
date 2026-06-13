ID: VM-283
Title: Four-Color Handoff Field Consistency Contract
Status: Done
Type: Runtime Repair / Test Hardening
Area: Four-Color, Archscry, Maze
Priority: high

## Summary

Completed a focused runtime and test hardening pass for Archscry-to-Maze live four-color handoff field consistency.

Live four-color handoffs now use the locked `Key + Label` contract for `YORE`, `GLINT`, and `DUNE`:

- `guild = active uppercase key`
- `fit = active uppercase key`
- `factionName = public display label`
- `sourceFaction = original/source reading key only when different`

## Implementation

- Updated Archscry handoff context creation so `sourceFaction` is only emitted for live four-color handoffs when the source reading differs from the active dossier key.
- Added `sourceFaction` to generated Maze URL params only when non-empty.
- Updated Maze restore normalization so live four-color `fit` resolves stale or mixed `guild` / `factionName` values back to the active key and display label.
- Prevented non-live raw four-color codes such as `RGWU` and `GWUB` from synthesizing Maze sidebar paths through generic mana-code fallback.
- Added focused context, restore, stale-label, and reserved-lane test coverage.

## Boundaries

- Did not activate `INK` or `WITCH`.
- Did not add `RGWU` or `GWUB` as public live identities.
- Did not edit raw packets, research packets, generated data, routes, Home preview, hero content, schemas, precon-source contracts, or deck-start ownership.
- Did not clean, revert, normalize, or repair unrelated dirty worktree changes.

## Tests

- `node --check assets/js/archscry-presentation.js`
- `node --check research/research-init.js`
- `node --check research/maze-search-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `node research/maze-search-tests.js`
- focused `node --input-type=module -e "...buildArchscryMazeContext / withArchscryMazeContext checks..."`
- `node assets/js/quick-reading-tests.js` still fails on the known unrelated QUANDRIX golden-path assertion: expected `QUANDRIX`, got `U`.

## Follow-Up

If the full quick-reading suite needs to become green, split the existing QUANDRIX golden-path failure into a separate card. Do not attach that repair to VM-283.
