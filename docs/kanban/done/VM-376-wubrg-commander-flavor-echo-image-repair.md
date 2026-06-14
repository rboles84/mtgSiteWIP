# VM-376 - WUBRG Commander Flavor Echo Image Repair

ID: VM-376
Title: WUBRG Commander Flavor Echo Image Repair
Status: done
Type: Runtime presentation repair / test coverage
Area: WUBRG / Archscry Dossier / Card examples
Priority: medium
Created: 2026-06-13
Completed: 2026-06-13

## Summary

Repaired the missing image for the WUBRG `Heroes in a Half Shell` curated card example by resolving commander-sourced flavor snippets against the committed commander index.

## Scope

- Let curated flavor echoes use image-bearing commander-index records when the snippet source is `commander-index`.
- Preserved the WUBRG card voice order and source-generated snippet output.
- Added regression coverage that `Heroes in a Half Shell` renders with an image.

## Out Of Scope

- No Home preview, Maze behavior, public route, schema/API, Colorless boundary, Commander fact, precon ordering, UI label, generated faction data, generated snippet data, or hero asset changes.
- No staging or commits.

## Acceptance Criteria

- [x] WUBRG curated echoes still resolve `Coalition Victory`, `Command Tower`, and `Heroes in a Half Shell` in that order.
- [x] `Heroes in a Half Shell` resolves with a non-empty image URL from the committed commander index.
- [x] `What This Looks Like In Cards` renders an `<img>` for `Heroes in a Half Shell`.
- [x] Required checks pass.

## Validation

- `node --check assets/js/index.js` - passed.
- `node --check research/archscry-dossier-followup-tests.js` - passed.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd test` - passed.
