# VM-147B - Archscry Route CSS JS Risk Reduction

ID: VM-147B
Title: Archscry Route CSS JS Risk Reduction
Status: done
Type: Frontend / Risk Reduction
Area: Archscry, CSS Architecture, Route-local JS
Priority: medium
Created: 2026-05-28
Completed: 2026-05-28

## Summary

Reduce risk in the Archscry route's route-local CSS and JS surfaces without changing dossier behavior, render templates, storage/session contracts, placement scoring, Maze handoff behavior, Chart.js behavior, or precon recommendation logic.

## Current Route Contract

`archscry/index.html` currently preserves this CSS stack:

- `../assets/css/tokens.css`
- `../assets/css/fonts.css`
- `../assets/css/layout.css`
- `../assets/css/topbar.css`
- `../assets/css/atmosphere.css`
- `../assets/css/components.css`
- `../assets/css/archscry.css`

`archscry/index.html` currently preserves this JS stack:

- Supabase UMD CDN
- `../assets/js/site-flags.js`
- `../assets/js/shared.js`
- `../assets/js/graph.js`
- module `../assets/js/index.js`
- `../assets/js/reduce-motion.js`
- `../assets/js/vm-rich-atmosphere.js`
- `../assets/js/vm-topbar.js`

## In Scope

- `archscry/index.html` for asset-stack verification only
- `assets/css/archscry.css`
- `assets/js/index.js` for ownership comments only
- `docs/reference/manual-test-cases.md`
- VM-147 umbrella and board tracking
- Handoff documentation

## Out Of Scope

- `assets/js/graph.js` and Chart.js loading/configuration
- Supabase/session contracts
- Maze handoff contracts and payloads
- Placement scoring and adaptive placement behavior
- Scryfall parser/search behavior
- Precon data, schema, ranking, and rendering logic
- Shared CSS/JS extraction or normalization
- Visual redesign

## Completion Notes

- Ran the required Archscry visual baseline before touching `assets/css/archscry.css`; the baseline completed successfully and produced no tracked repo changes.
- Added high-level route ownership section comments to `assets/css/archscry.css` without moving selectors or changing declarations.
- Marked the VM-127 extracted legacy compatibility layer and kept it in its existing cascade position.
- Added an ownership map and route-zone comments to `assets/js/index.js` without moving function blocks or changing initialization, event delegation, storage keys, URL parameters, panel IDs, card-art prefixes, Maze handoff payloads, render templates, or precon rendering logic.
- Added VM-147B manual QA coverage for Archscry asset stack, topbar, quick reading, dossier navigation, adjacent fits, Maze Discovery, precon panels, card previews, radar/glow/starfield presentation, reduced motion, and responsive layouts.

## Tests Run

- `npm.cmd run test:visual:archscry:baseline` - pass before CSS edits.
- `node --check assets/js/index.js` - pass.
- `npm.cmd run lint:html` - pass.
- `npm.cmd run lint:js` - pass.
- `npm.cmd run test:frontend-smoke` - pass.
- `npm.cmd run dossier:audit` - pass with known warnings-only profile: `warnings: 62`, `failures: 0`.
- `npm.cmd test` - pass.
- `npm.cmd run test:visual:archscry` - pass; all 16 captures reported `0` mismatched pixels within the `400`-pixel budget.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - no whitespace errors; Git reported LF-to-CRLF working-copy normalization warnings only.

## Risks / Uncertainties

- `assets/css/archscry.css` still contains a large VM-127 legacy compatibility layer with unscoped selectors. It is intentionally left in place because moving it would be a cascade-risk change.
- `assets/js/index.js` remains dense and contract-heavy. This slice only clarified ownership; deeper refactors should become separate behavior-specific cards.
- The Archscry visual harness masks animated/canvas surfaces, so browser/manual review remains required for radar, glow, and starfield confidence.
- In-app Browser spot-check setup failed twice in this environment with a sandbox setup-refresh failure; rely on the visual harness plus human browser review for final radar/glow/starfield confirmation.

## Human Review

Yes - verify the live Archscry quick reading, dossier navigation, adjacent-fit Maze handoff, precon sections, card previews, and radar/glow/starfield visuals in browser.
