# VM-499 - Deterministic Radar Capture And Legibility Repair

## Status

Complete

## Summary

Made Home and Archscry visual regression capture the real production-initialized radar, added deterministic structural/pixel assertions, and applied contained legibility tuning without changing scores, axes, geometry, overlays, or interaction behavior.

## Scope Completed

- Both harnesses now wait for the real Chart.js instance, call `stop()` and `update("none")`, and leave the production radar canvas and glow visible.
- Added one shared production-derived verification path for five labels, five composite values/points, point styling, polygon edges, node neighborhoods, chart-area coverage, and reduced-motion duration.
- Read point radius, border width, and glow blur from the production dataset/plugin state; no parallel test-only field or renderer was introduced.
- Applied the approved Home spacing, responsive sizing, and below-480px tier-label behavior.
- Applied the approved Archscry composite, point, glow, layered-fill, grid, and CSS-glow tuning.
- Added contained width/parent/mobile spacing needed to keep labels unclipped and satisfy the objective coverage contract.
- Received explicit owner acceptance and refreshed only Home and Archscry ignored baselines.

## Acceptance Results

- [x] Both harnesses capture production radar state without a test-only renderer, dataset, option set, or screenshot-only radar CSS.
- [x] Shared assertions validate structure, styling, polygon rendering, node neighborhoods, reduced motion, and chart-area coverage.
- [x] Node radius derives from production point radius, border width, and production-owned glow blur.
- [x] Home desktop/tablet/mobile and Archscry dossier desktop/mobile evidence visibly include the radar.
- [x] Reduced-motion production animation duration is zero.
- [x] No score recalculation, normalization, weighting, interpolation, averaging, or axis remapping occurred.
- [x] Baselines were refreshed only after explicit owner approval.
- [x] VM-496 remained unstaged and outside the VM-499 commit.

## Validation

- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop/mobile Home, Archscry, Maze, and return flows.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd test` - passed before owner acceptance.
- `npm.cmd run test:visual:home:baseline` and `npm.cmd run test:visual:archscry:baseline` - completed after explicit owner approval.
- `npm.cmd run test:visual:home` - passed at `0` mismatched pixels for mobile/tablet/desktop.
- `npm.cmd run test:visual:archscry` - passed at `0` mismatched pixels for all 16 captures.
- Manual desktop/mobile review - visible polygons, five nodes/labels, no clipped labels, subordinate overlays, and gold Archscry synthesis points confirmed.
- Final combined gate - `npm.cmd test`, `npm.cmd run test:copy-boundaries`, `npm.cmd run lint:html`, `npm.cmd run lint:js`, and `git diff --check` all passed.

## Guardrails Preserved

- Straight-polygon geometry, five canonical axes, registry scores, component overlays, Home cycling/hold/fallback behavior, and Archscry toggles/reinitialization/fallback behavior.
- No placement-score, route, alias, lore, Commander, account, or recommendation change.
- Ignored PNG baselines remain local QA artifacts rather than remote CI evidence.

## Related Work

- VM-450 - Visual Baseline Acceptance And Waiver Cleanup.
- VM-495 - Release Test Loose Ends.
- VM-496 - Vox Mana Self-Snapshot 2026-07-10.
