# VM-128 - Phase 4 Strategium Index Extraction

ID: VM-128
Title: Phase 4 Strategium Index Extraction
Status: done
Type: Frontend / CSS Architecture / JS Extraction / Visual Regression QA
Area: Strategium, Route-Local Assets, Commander Learning Console
Priority: high
Created: 2026-05-25
Completed: 2026-05-25

## Summary

Extract the remaining inline CSS and inline JS from `strategium/index.html` into dedicated route-local Strategium assets while preserving current behavior, copy, layout, and route wiring exactly.

## Scope

- Create and use branch `refactor/strategium-extract`.
- Add `assets/css/strategium.css` and `assets/js/strategium.js`.
- Move the full inline `<style>` block from `strategium/index.html` into `assets/css/strategium.css` as an unlayered literal lift.
- Move the full inline executable `<script>` block from `strategium/index.html` into `assets/js/strategium.js` as a literal lift.
- Keep `strategium.css` as the last stylesheet in the Strategium head.
- Preserve script order relative to `../assets/js/reduce-motion.js` and `../assets/js/vm-topbar.js`.
- Add deterministic Strategium visual regression baseline and compare commands.
- Extend frontend validators and JS syntax coverage for the extracted assets.

## Implementation Summary

- Added `assets/css/strategium.css` and `assets/js/strategium.js` as the route-local Strategium asset boundary.
- Removed the inline `<style>` and executable inline `<script>` blocks from `strategium/index.html`.
- Kept `strategium.css` as the final stylesheet in the Strategium head.
- Preserved script order as `strategium.js`, `reduce-motion.js`, then `vm-topbar.js`.
- Rebased the extracted CSS background URL from the inline document context to the external stylesheet context so the existing Strategium background image continues to load without `/assets/assets/` 404s.
- Added `scripts/visual-regression-strategium.mjs` with deterministic desktop landing, mobile landing, active console, and archetype-library captures.
- Added `test:visual:strategium:baseline` and `test:visual:strategium` package scripts.
- Extended HTML validation and JS lint coverage for the extracted Strategium assets.
- Updated manual QA and Project Atlas documentation.

## Acceptance Criteria

- `strategium/index.html` includes `../assets/css/strategium.css` and `../assets/js/strategium.js`.
- `strategium/index.html` contains no inline `<style>` and no inline executable `<script>`.
- Strategium tab switching, readiness checklist, archetype search/filter, targeted portal panels, back-to-top behavior, reveal behavior, and console interactions are unchanged.
- Visual regression captures deterministic desktop, mobile, console-tab, and archetype-library states under `artifacts/visual-regression/strategium/`.
- `npm.cmd run test:visual:strategium:baseline` and `npm.cmd run test:visual:strategium` pass.
- `npm.cmd run lint:html`, `npm.cmd run lint:js`, `npm.cmd run test:frontend-smoke`, `npm.cmd test`, and `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` pass.

## Non-Goals

- Do not redesign Strategium.
- Do not rewrite copy.
- Do not change public route behavior.
- Do not move Strategium code into `assets/css/home.css` or `assets/js/home.js`.
- Do not touch `newIndex2.html`, `archscry/index.html`, `maze/index.html`, or canonical `/data/` files.

## Verification

- `npm.cmd run test:visual:strategium:baseline`
- `npm.cmd run test:visual:strategium`
  - `landing-desktop`: `0` mismatched pixels
  - `landing-mobile`: `0` mismatched pixels
  - `console-pod-readiness`: `0` mismatched pixels
  - `library-search`: `0` mismatched pixels
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
