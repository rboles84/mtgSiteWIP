ID: VM-140
Title: Premium Recommended Precon Decks Section
Status: done
Type: UX / Archscry
Area: Archscry, Commander Compass
Priority: high
Created: 2026-05-26
Completed: 2026-05-26

## Summary

Refined Archscry's `Recommended Precon Decks` into a compact premium recommendation panel that shows at most four curated deck starts without turning the dossier into a full precon catalog.

## Acceptance Criteria

- Archscry renders at most four visible precon cards.
- Visible cards are selected from existing grouped output in order: `nativeExact`, `otherExact`, then `stretch`.
- Full `nativeExact`, `otherExact`, and `stretch` arrays remain uncapped internally.
- Overflow note renders only when total grouped recommendations are greater than four.
- Cards use compact badges, 2-3 safe mechanics/theme chips, short fit copy, optional `Best for:` copy, and existing research/decklist actions.
- No Apocrypha shelf, route, CTA, test, or visual baseline is added.
- No precon source data, generated schemas, recommendation ranking math, placement logic, dossier rail structure, or second-commander fields change.

## Verification

- `node research/archscry-dossier-followup-tests.js`
- `node research/precon-artifact-tests.js`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run build:precons`
- `npm.cmd run build:factions`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`

## Notes

- Presentation capping stays in the Archscry rendering layer.
- The recommendation engine still returns the full VM-137 grouped recommendation pool.
- Full precon browsing remains a future feature; VM-140 intentionally did not add Apocrypha routing or catalog UI.
