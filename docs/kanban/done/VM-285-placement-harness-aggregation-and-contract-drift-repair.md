ID: VM-285
Title: Placement Harness Aggregation And Contract Drift Repair
Status: Done
Type: Test Harness Repair / Contract Drift Repair
Area: Archscry, Placement, Maze, Quick Reading
Priority: high

## Summary

Completed a focused placement/test-harness repair slice that makes `test:placement` report named failing areas instead of stopping at the first top-level assertion, while fixing the stale executable Maze query expectations and the stale adjacent-navigation contract expectations left behind by VM-281, VM-283, and VM-284.

## Scope

- Refactor `assets/js/quick-reading-tests.js` from fail-fast top-level execution into named aggregated section reporting.
- Keep the aggregation refactor mechanical and minimal.
- Preserve existing assertion coverage and intent.
- Update only stale Temur executable Maze assertions from `id=urg` / `id<=urg` to `id=gur` / `id<=gur` where the assertion is validating executable Maze query identity.
- Keep Temur readable copy expectations such as `blue-red-green` unchanged.
- Update `research/archscry-adjacent-navigation-tests.js` to the post-VM-281 / VM-283 contract where the active viewed dossier target owns `guild` and `fit`, while original reading context is preserved through `sourceFaction` and `returnUrl`.
- Keep QUANDRIX calibration locked at `0.35`.

## Out Of Scope

- VM-284 calibration changes.
- Home visual cleanup.
- Lighthouse harness cleanup.
- Renaming Home assets or historical `newindex2` harness naming.
- Raw faction data, research packets, generated builder outputs, route names, Home asset names, and Lighthouse harness internals.

## Acceptance Criteria

- `assets/js/quick-reading-tests.js` runs all named sections before exiting.
- Named failures are collected and printed with stable, human-readable section names.
- `npm.cmd run test:placement` and `npm.cmd test` still receive a normal success/failure process signal from `quick-reading-tests.js`.
- Temur executable Maze query assertions validate `gur` while readable copy remains `blue-red-green`.
- `research/archscry-adjacent-navigation-tests.js` matches the active-target `guild` / `fit` contract and does not repurpose `returnUrl` as a primary-reading identity carrier.
- Classification-only Home visual and Lighthouse failures are documented but do not block this slice.

## Implementation

- Added a small async-aware section runner to `assets/js/quick-reading-tests.js` so the suite executes named placement areas in order, records section failures, and exits non-zero after printing a grouped failure summary.
- Kept the refactor mechanical by wrapping existing top-level assertion blocks into stable section callbacks instead of rewriting helpers or fixtures.
- Updated only executable Maze query identity assertions where repo truth had moved to routing-alias order:
  - `TEMUR` from `urg` to `gur`
  - `SULTAI` from `ubg` to `bgu`
  - `JESKAI` from `wur` to `urw`
- Preserved readable copy ordering such as Temur `blue-red-green` by removing the readable-query rewrite from `applyMazeIdentityOverride()` while keeping executable query overrides intact.
- Updated `research/archscry-adjacent-navigation-tests.js` to assert the post-VM-281 / VM-283 active-target contract using a live four-color adjacent handoff that preserves original reading context through `sourceFaction` and `returnUrl`.

## Validation

- `npm.cmd run test:placement` - passed
- `node research/maze-search-tests.js` - passed
- `node research/archscry-adjacent-navigation-tests.js` - passed
- `npm.cmd test` - passed
- Classification only:
  - `npm.cmd run test:visual:newindex2` - passed with `mobile: 2`, `tablet: 1`, `desktop: 121`
  - `npm.cmd run test:lighthouse:newindex2` - known `NO_FCP` failure; report written to `docs/audits/lighthouse-newindex2.html`, then Edge cleanup hung again after `taskkill` access denied
