# VM-499 Deterministic Radar Capture And Legibility Handoff

## Agent Name

Codex

## Task Requested

Make Home and Archscry visual regression capture the real production-initialized radar, add deterministic structural/pixel verification, apply contained legibility tuning, and pause for owner acceptance before baseline refresh.

## Current Status

Complete. The owner explicitly accepted the runtime-faithful captures; only Home and Archscry ignored baselines were refreshed, both compare suites now pass at zero mismatch, and the visual waiver ledger records radar canvases as captured evidence.

## Files Reviewed

- VM-495 visual handoff/card and `docs/qa/visual-baseline-waivers.md`
- Home and Archscry visual-regression harnesses and ignored current/baseline/diff artifacts
- Shared radar rendering, Home radar initialization, dossier radar initialization, and responsive CSS
- Frontend/browser smoke and dossier follow-up tests

## Files Changed

- Production: `assets/js/home.js`, `assets/css/home.css`, `assets/js/dossier-radar.js`, `assets/css/archscry.css`
- Visual harnesses: `scripts/visual-regression-home.mjs`, `scripts/visual-regression-archscry.mjs`, `scripts/visual-radar-assertions.mjs`
- Tests: `research/archscry-dossier-followup-tests.js`
- QA/governance: `docs/qa/visual-baseline-waivers.md`, VM-499 card, `docs/kanban/board.md`, this handoff, and `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Both harnesses wait for the real Chart.js instance, call `stop()` and `update("none")`, leave the production radar canvas/glow visible, and suppress only the unrelated animated star canvas plus generic animation/transition motion.
- A shared verifier checks five labels, one five-value composite dataset, five in-bounds production-styled points, polygon edge pixels, production-derived node neighborhoods, reduced-motion duration, and chart-area coverage.
- Glow blur is read from the production dataset's existing `_vmGlowBlur`; no test-only blur field or renderer was added.
- Home uses the approved top padding, responsive heights, 480px tier-label cutoff, and contained width/parent sizing needed to keep labels visible and chart-area bounds measurable.
- Archscry uses the approved line, point, glow, layered-fill, grid, and CSS-glow values, plus contained mobile height/padding to prevent axis-label clipping.
- Production dossier animation duration is zero under reduced motion.
- After explicit owner acceptance, refreshed only the Home and Archscry ignored baselines and recorded that their canvases are part of captured visual evidence.

## Why It Changed

The accepted VM-495 screenshots hid both radar canvases, so visual comparison could pass while the primary chart evidence was absent. The resulting captures also showed that the production radar needed contained spacing and contrast repair to remain legible at the supported breakpoints.

## Decisions Made

- Kept the production renderer, datasets, axes, straight polygon geometry, score values, component overlays, and interaction paths unchanged.
- Used one shared node-radius formula and one chart-area pixel contract across Home and Archscry.
- Treated the pre-acceptance baseline mismatch as expected, then refreshed only the two approved route baselines.

## Risks / Uncertainties

- Archscry `dossier-placement-mobile` places the radar below the fixed screenshot viewport; `dossier-view-all-mobile` is the runtime-faithful mobile evidence that visibly contains the chart.

## Tests Run

- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop/mobile Home, Archscry, Maze, and return flows.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd test` - passed.
- `npm.cmd run test:visual:home:baseline` and `npm.cmd run test:visual:archscry:baseline` - completed after explicit owner acceptance.
- `npm.cmd run test:visual:home` - passed at zero mismatch for mobile/tablet/desktop with all radar assertions passing.
- `npm.cmd run test:visual:archscry` - passed at zero mismatch for all 16 captures with every radar-bearing capture passing the shared assertions.
- Final combined gate: `npm.cmd test`, `npm.cmd run test:copy-boundaries`, `npm.cmd run lint:html`, and `npm.cmd run lint:js` - passed.
- Manual current-PNG review - visible shapes, five labels, non-clipped mobile labels, subordinate component overlays, and production gold Archscry points confirmed.
- `git diff --check` - passed.

## Not Touched

- Placement scores, normalization, weighting, interpolation, component averaging, axes, geometry, routes, aliases, lore, or Commander data.
- Strategium and Apocrypha baselines; only owner-approved Home/Archscry baselines were refreshed.
- Pre-existing VM-496 files and governance hunks.

## Follow-Up Recommendations

- Keep the shared radar assertions in both harnesses and require a new explicit owner acceptance before any future Home/Archscry baseline refresh.

## Next Suggested Agent

Release verifier for the final combined gate and `main` push.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-499-deterministic-radar-capture-legibility-repair.md`
- `docs/qa/visual-baseline-waivers.md`
- `artifacts/visual-regression/home/current/`
- `artifacts/visual-regression/archscry/current/`
