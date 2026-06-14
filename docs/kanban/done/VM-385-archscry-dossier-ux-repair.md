# VM-385 - Archscry Dossier UX Repair

ID: VM-385
Title: Archscry Dossier UX Repair
Status: done
Type: Runtime presentation repair / regression coverage
Area: Archscry Dossier, Card Examples, Adjacent Fit Navigation, How This Plays
Priority: high
Created: 2026-06-14
Completed: 2026-06-14

## Summary

Repair confirmed Archscry dossier UX issues without overbuilding the likely cache-related blank-card symptom. Keep both card-example surfaces, but make them distinct; remove duplicate adjacent return controls; tighten How This Plays spacing; and add Black/card visibility regression checks.

## Scope

- Make `What This Looks Like In Cards` exclude normalized card names already shown in the Identity Matrix `Cards That Sound Like This` panel.
- Hide the entire lower card-example section when fewer than two distinct grounded examples remain.
- Keep the Identity Matrix card-voice panel structurally unchanged as the concise identity-voice surface.
- Remove duplicate adjacent-view `Back to Primary Reading` controls so adjacent renders expose exactly one return control.
- Adjust How This Plays label/row spacing for matching `At the table` and `In play` rhythm.
- Treat blank Black card tiles as regression-only unless the issue reproduces during QA.

## Non-Goals

- No raw lore, Commander fact, source packet, generated faction, generated placement, Scryfall bulk, placement scoring, Home, Maze, hero asset, or mono source packet changes.
- No invented MTG facts, lore claims, rankings, legality claims, or Commander recommendations.
- No renderer hardening for the cache-like blank-card symptom unless QA reproduces it.

## Acceptance Criteria

- [x] Matrix and lower card-example sections do not repeat normalized card names.
- [x] The lower card-example section is fully hidden if fewer than two distinct grounded examples remain.
- [x] Adjacent dossier rendering contains exactly one `return-primary-reading` control.
- [x] Black dossier has source-backed Commander preview rows, starter references, and mana-base rows.
- [x] Black card preview tile markup includes non-empty card names and image or intentional fallback content.
- [x] How This Plays spacing selector remains covered without pixel-locking.
- [x] Required checks pass.

## Tests Planned

- `node --check assets/js/index.js`
- `node --check assets/js/dossier-radar.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/archscry-adjacent-navigation-tests.js`
- `npm.cmd run dossier:audit`
- `npm.cmd test`

## Completion Notes

- Implemented normalized card-name exclusion between the Identity Matrix card voices and lower grounded examples.
- Suppressed the lower card-example section when fewer than two grounded distinct examples remain.
- Removed duplicate adjacent return controls and forced adjacent navigation onto the Placement panel so the single return control is visible.
- Added the How This Plays spacing selector and regression coverage for Black Start Here, starter references, mana base rows, and preview fallback markup.
