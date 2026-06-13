# VM-329 - Colorless Dossier, Hero, Precon, Mana Base, And Maze UX Repair

Status: Done
Owner: Codex
Agent role: Runtime Architect / JSON Cartographer / Test Strategist
Created: 2026-06-10
Completed: 2026-06-10

## Summary

Repaired the live Colorless user experience after VM-327 promotion without changing Colorless raw evidence. `COLORLESS` remains placement-visible and dossier-visible, with Home preview, routes, public aliases, raw evidence, and image files untouched by this card.

## Pre-Flight Findings

- `VM-328` is occupied by WITCH source-generated authority repair.
- `VM-329` was unused before card creation.
- VM-327 promoted `COLORLESS` as a controlled placement identity while intentionally suppressing Home preview, routes, Maze routing, hero rollout, public aliases, Commander compass, and public mana-base deck advice.
- VM-326 approved the repaired raw Colorless packet for future controlled promotion planning; VM-327 preserved raw hashes.
- `assets/img/identity-hero/colorless.webp` exists but is dirty in the worktree; VM-329 mapped the existing asset only and did not edit, generate, replace, or normalize it.
- Broad unrelated drift exists across runtime, generated data, raw packets, docs, assets, Kanban, handoffs, and canon relocation deletes. VM-329 preserved unrelated drift and did not stage files.

## What Changed

- Added approved Colorless dossier hero slug mapping to the existing `colorless.webp` asset.
- Added Colorless presentation and Commander guidance with `The Engine Builder`, source-bound tags, Wastes/{C} mana language, artifacts/big mana/ramp direction, and five-color Eldrazi caution.
- Added strict Colorless precon identity resolution so `Eldrazi Unbound` / `Zhulodok, Void Gorger` surfaces as native Colorless support while `Eldrazi Incursion` / `Ulalek` does not.
- Added Colorless land-base display data through `data/identity-layers.json` and a narrow builder merge rule so generated display data prefers the source-owned Colorless land base.
- Rebuilt approved generated artifacts through `npm.cmd run build:factions`.
- Replaced Colorless radar card-voice duplication with a short Colorless matrix-boundary panel, keeping the main card example section as the single card-example lane.
- Added exact Colorless Maze handoff lanes using `id=c` / `id<=c`, plus focused tests for no WU fallback.
- Tightened Archidekt/deck-start dedupe to normalized service + URL/query.

## Acceptance Criteria

- [x] `COLORLESS` dossier hero resolves to `/assets/img/identity-hero/colorless.webp`, with no asset file changes made by VM-329.
- [x] Colorless dossier role/copy uses source-backed outside-WUBRG, Wastes/{C}, artifacts, Eldrazi, and five-color separator language.
- [x] Colorless rendered/audited output does not contain known generic fallback phrases.
- [x] `Eldrazi Unbound` / `Zhulodok, Void Gorger` surfaces as strict Colorless precon support; `Eldrazi Incursion` / `Ulalek` does not.
- [x] Colorless Commander Deck Starts do not render duplicate normalized service + URL/query links.
- [x] Mana Base Starting Map is nonblank and Wastes/{C}-centered without invented unresolved named cards.
- [x] Colorless does not render the same three card examples in both `Cards That Sound Like This` and `What This Looks Like In Cards`.
- [x] Maze handoff queries use `id=c` / `id<=c` and never fallback to `WU`.
- [x] Raw Colorless hashes remain unchanged.

## Tests

- `node --check research\build-faction-artifacts.mjs; node --check assets\js\archscry-presentation.js; node --check assets\js\commander-dossier.js; node --check assets\js\dossier-radar.js; node --check assets\js\index.js; node --check assets\js\maze-handoff.js; node --check assets\js\quick-reading-tests.js; node --check research\archscry-dossier-followup-tests.js; node --check research\maze-search-tests.js`
- `npm.cmd run build:factions`
- `npm.cmd run validate:source-generated -- --targets=COLORLESS` (passed with one existing model-owned inhibitor warning)
- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `node assets\js\quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd run test:parser`
- `npm.cmd run audit:factions`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` (clean; line-ending warnings only)
- Repeated SHA-256 checks for all five Colorless raw JSON files before edits, after builds, and at closeout.

## Raw Hash Baseline Preserved

- `colorless.sources.json`: `817DFE00144DC9535D51DE927A1572CF8C386DFF84C01C1288B5E2BFADDC4995`
- `colorless.claims.json`: `01D370E961B9672C157E1C7B35824FE090719A3CDF9764786EF316DE61D976AA`
- `colorless.profile.json`: `6EC40CFD93DF3B863A3D0BE8FEEF8D1519CB4F257842D6240DB82C5B247225B3`
- `colorless.placement.json`: `3E5D2D620ECD50DFCC6FE80BA7D87889675EC5EC11F96AFEC1F5E81F59C19E10`
- `colorless.changelog.json`: `0BDC01764FACAFDB18ACCBB930E1DD890AF6E6697505417CA1FCA63CDE5D6822`

## Not Touched

- Colorless raw JSON and research ledgers.
- `docs/research/canon/colorless/**` relocation/deletion state.
- `assets/img/identity-hero/colorless.webp` file contents.
- Home preview config, routes, public aliases, Maze route config, schemas by manual edit, and Supabase manual authoring.
- Git staging.

## Follow-Up

- Manual browser QA should inspect a live Colorless dossier for visual fit, especially the new hero crop, Colorless matrix-boundary panel, Mana Base Starting Map, and Maze handoff labels.
