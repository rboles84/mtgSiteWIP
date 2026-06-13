ID: VM-288
Title: Canonical Home Naming Migration
Status: Done
Type: Runtime / Tooling Naming Cleanup
Area: Home, Validation, Visual Regression, Lighthouse
Priority: high

## Summary

Rename the live Home route-local assets, test harnesses, artifact roots, and current-state documentation from legacy `newindex2` naming to canonical `home` naming while preserving historical cards, handoffs, archived research, and historical audit trail terminology.

## Scope

- Rename live Home assets and harnesses from `newindex2` to `home`.
- Update all live callers, validators, smoke checks, package scripts, and current-state docs/diagrams.
- Move live visual-regression artifact ownership from `artifacts/visual-regression/newindex2/` to `artifacts/visual-regression/home/`.
- Change the live Lighthouse report output path to `docs/audits/lighthouse-home.html`.
- Add a static validation guard that prevents new live/current-state `newindex2` references from re-entering the active stack.

## Out Of Scope

- Rewriting completed cards, historical handoffs, or archived research for cosmetic consistency.
- Home visual redesign or Lighthouse stability repair.
- Runtime behavior changes unrelated to canonical naming.

## Acceptance Criteria

- `index.html` loads `assets/css/home.css` and `assets/js/home.js`.
- Live npm scripts use `test:visual:home`, `test:visual:home:baseline`, and `test:lighthouse:home`.
- Current-state code/docs/diagrams no longer refer to live `newindex2` surfaces.
- Remaining `newindex2` references are historical-only.
- Validation passes:
  - `npm.cmd run lint:html`
  - `npm.cmd run lint:js`
  - `npm.cmd run test:frontend-smoke`
  - `npm.cmd run test:visual:home`
  - `npm.cmd run test:lighthouse:home`

## Implementation Notes

- Renamed the live Home route assets from `newindex2` to `home`:
  - `assets/css/home.css`
  - `assets/js/home.js`
- Renamed the live Home harness scripts:
  - `scripts/visual-regression-home.mjs`
  - `scripts/lighthouse-home.mjs`
- Updated the live Home route callers, validators, smoke checks, package scripts, artifact roots, and current-state docs/diagrams to use canonical `home` naming.
- Moved the live visual regression artifact root from `artifacts/visual-regression/newindex2/` to `artifacts/visual-regression/home/` without regenerating baselines.
- Added a static guard in `scripts/frontend-smoke.mjs` that fails if stale legacy Home naming re-enters current-state files.

## Validation Results

- Passed: `npm.cmd run lint:html`
- Passed: `npm.cmd run lint:js`
- Passed: `npm.cmd run test:frontend-smoke`
- Passed: `npm.cmd run test:visual:home`
- Known unstable / classification-only: `npm.cmd run test:lighthouse:home`
  - Reproduced the existing `NO_FCP` / zero-score path.
  - Wrote `docs/audits/lighthouse-home.html`.
  - Timed out during the existing Edge cleanup stall with `taskkill` access-denied behavior.
  - This matched the known Lighthouse harness instability and did not indicate a naming regression.

## Not Touched

- Historical completed cards and handoffs that preserve legacy `newindex2` terminology as historical record.
- Home visual redesign or Lighthouse stability repair.
- Runtime behavior outside canonical Home naming migration.
