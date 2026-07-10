# VM-449 - Maze Return Loop Microcopy Tightening

ID: VM-449
Title: Maze Return Loop QA And Microcopy Tightening
Status: Complete
Type: UX Copy / Product Boundary / QA
Area: Maze, Reading Finds, Archscry Return Loop
Priority: High
Created: 2026-06-30
Completed: 2026-06-30

## Summary

Tighten Maze copy so it reads as a reading-support card search and local note loop, not a deckbuilder, recommendation engine, or standalone Scryfall clone. Preserve internal compatibility names, route behavior, parser behavior, storage keys, and the VM-448 browser-smoke return-loop coverage.

## Pre-Flight Carry-Forward

- VM-426 reframed the old deck idea tray as Reading Finds and left manual return-loop/browser QA as follow-up.
- VM-440 through VM-443 repaired broad visible copy boundary drift and added `test:copy-boundaries`.
- VM-448 added a deterministic browser smoke for Home, Archscry, Maze, Reading Finds, and return-to-dossier handoff, and fixed restored-result reading ID drift.
- VM-446 remains blocked on live Supabase credentials and is unrelated to this local-first Maze copy pass.

## Scope

- Review Maze cold-entry and Archscry-entry copy.
- Replace visible "builder/build" phrasing where it can be misread as deckbuilding.
- Keep The Loom as a query-shaping/search mode, not a deck construction surface.
- Tighten empty, no-result, Reading Finds, and return copy so Maze remains connected to Archscry readings.
- Update QA docs only if needed to preserve current manual checks.

## Explicit Non-Goals

- No route structure changes.
- No parser, query, Scryfall API, modal, localStorage key, or storage schema changes.
- No generated-data edits.
- No visual baseline refresh.
- No live Supabase/RLS work.
- No new deckbuilding, recommendation, legality, import, pricing, or account features.

## Acceptance Criteria

- [x] Visible Maze copy frames the route as search support for readings.
- [x] Visible Maze copy does not imply full deckbuilding, deck recommendations, EDHREC cloning, legality checking, or account persistence.
- [x] The Loom remains understandable as a visual query-shaping mode.
- [x] Reading Finds empty, unavailable, copy, and return helper text stays local-note oriented.
- [x] Internal compatibility identifiers such as `builder`, `stash`, and `scratchpad` are not renamed.
- [x] `npm.cmd run test:copy-boundaries`, `npm.cmd run test:frontend-smoke`, `npm.cmd run test:maze-finds`, and `npm.cmd run test:browser-smoke` pass.

## Validation

- `rg -n -i "\bdeckbuilder\b|\bdeck idea\b|\bbest commander\b|\bbest deck\b|recommendation engine|scryfall clone" maze research assets/js`
- `npm.cmd run test:copy-boundaries`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:maze-finds`
- `npm.cmd run test:browser-smoke`
- `git diff --check`

## Related Work

- `VM-426` - Reading Finds And Dossier Reflection
- `VM-439` - Vox Mana Voice And Copy Audit
- `VM-440` through `VM-443` - Voice Copy Repair
- `VM-448` - Critical Browser E2E Smoke

## Closeout

Tightened Maze visible copy from generic search/build language toward reading-support search language. The live route now frames Maze as a dossier/search thread, The Loom as a visual query mode, empty/loading/no-result states as search-thread states, and Reading Finds as local notes to revisit with the reading.

Also repaired two adjacent dossier support phrases that still used deckbuilder wording:

- `assets/js/index.js`: Archidekt support copy now says "external catalog filtering."
- `assets/js/commander-dossier.js`: Colorless budget tag lane now says "catalog lane."

Internal compatibility identifiers such as `builder`, `stash`, `scratchpad`, and legacy storage key names were intentionally preserved.

## Tests Run

- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:maze-finds` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- Scoped anti-fit phrase scan across Maze/research/dossier support files - no matches.
- `npm.cmd run test:browser-smoke` - passed for desktop and mobile.
- `git diff --check` - passed with line-ending warnings only.
- `npm.cmd run test:placement` - passed, 37 factions and 37 golden paths.
- `npm.cmd run dossier:audit` - passed with 0 failures and 113 existing warnings.
