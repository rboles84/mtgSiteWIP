# VM-448 - Critical Browser E2E Smoke

ID: VM-448
Title: Critical Browser E2E Smoke For Home, Archscry, And Maze
Status: Complete
Type: QA / Browser Automation / Release Readiness
Area: Home, Archscry, Maze, Reading Finds
Priority: High
Created: 2026-06-30
Completed: 2026-06-30

## Summary

Add a lightweight real-browser smoke check for Vox Mana's highest-risk public journey: Home loads, Archscry can complete a quick reading and render a dossier, Maze can run a deterministic card search, Reading Finds can set aside a card locally, and the Maze return link can bring the user back to the dossier with the find reflected.

## Pre-Flight Carry-Forward

- VM-430 proposed browser journey automation because `test:frontend-smoke` is a static route/contract check, not a real browser path.
- VM-447 added no-secret CI using existing deterministic scripts and explicitly left browser smoke for a later ticket.
- VM-426 added Reading Finds and called out the Archscry -> Maze -> Return to Dossier with Finds loop as manual browser QA follow-up.
- VM-446 remains blocked on live Supabase credentials; this ticket must not claim live account/RLS proof.

## Scope

- Add a small Puppeteer/Chrome smoke script using the existing `chrome-launcher` and `puppeteer-core` dev dependencies.
- Serve the static site locally from the workspace.
- Stub external Supabase and Scryfall browser requests so the smoke is deterministic and does not depend on network availability.
- Exercise desktop and mobile viewport paths for Home, Archscry quick reading/result, Maze search, Reading Finds, and return-to-dossier behavior.
- Add an npm script for the check and update QA documentation.

## Explicit Non-Goals

- No live Supabase/RLS verification.
- No Playwright migration or broad E2E test suite.
- No visual baseline refresh.
- No Lighthouse/performance gate.
- No production runtime behavior changes.
- No external Scryfall API dependency during the smoke run.

## Acceptance Criteria

- [x] `npm.cmd run test:browser-smoke` exists.
- [x] The smoke launches a local static server and headless Chromium/Edge through existing dependencies.
- [x] Home route paints the hero identity canvas on desktop and mobile viewports.
- [x] Archscry quick reading can be completed through visible answer buttons and renders a non-empty dossier.
- [x] Maze search renders deterministic mocked Scryfall results without external network dependency.
- [x] Reading Finds can set aside at least one rendered result and persist it under `vm_maze_reading_finds_v1`.
- [x] Return to Dossier with Finds navigates back to Archscry and reflects the saved find in the Maze Discovery panel.
- [x] Non-ignorable console/page errors fail the smoke.
- [x] `npm.cmd run test:frontend-smoke` and `npm.cmd run test:maze-finds` still pass.

## Validation

- `npm.cmd run test:browser-smoke`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:maze-finds`
- `git diff --check`

## Related Work

- `VM-426` - Reading Finds And Dossier Reflection
- `VM-430` - Vox Mana Comprehensive QA Test Plan
- `VM-447` - Minimal CI Validation Gate
- `VM-446` - VM-422 Live Private Deck-Link RLS Proof

## Closeout

Added `scripts/browser-smoke.mjs` and `npm.cmd run test:browser-smoke`. The smoke serves the static site locally, stubs Supabase and Scryfall browser requests, runs desktop and mobile viewport journeys, verifies Home canvas paint, completes an Archscry quick reading through visible answer buttons, opens Maze from the dossier, renders mocked Scryfall results, sets aside `Sol Ring` in Reading Finds, and returns to Archscry with the find reflected in the Maze Discovery panel.

The first smoke run exposed a real return-loop bug: Reading Finds were saved with the quick-result `model_version` reading ID, but restored Archscry dossiers normalized the cached result without `model_version`, producing a different reading ID and a mismatch state. `assets/js/shared.js` now preserves `model_version`, `confidence_gap`, `evidence_trail`, and `stage_history` during placement-result normalization so the same reading remains stable across refresh and Maze return.

The new browser smoke is not added to the VM-447 no-secret CI workflow yet; that remains a later CI hardening decision.

## Tests Run

- `node --check scripts\browser-smoke.mjs` - passed.
- `node --check assets\js\shared.js` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop and mobile.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:maze-finds` - passed.
- `npm.cmd run test:placement` - passed, 37 factions and 37 golden paths.
- `npm.cmd run lint:js` - passed.
- `git diff --check` - passed with line-ending warnings only.
