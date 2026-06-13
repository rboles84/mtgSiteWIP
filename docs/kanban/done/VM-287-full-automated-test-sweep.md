ID: VM-287
Title: Full Automated Test Sweep
Status: Done
Type: Test Execution / Validation Inventory
Area: Frontend, Placement, Audits, Visual Regression, Lighthouse
Priority: high

## Summary

Ran the full automated validation surface from repo root at `C:\dev\mtgSiteWIP`, captured pre-run and post-run repo state, preserved existing harness and artifact naming, and recorded a complete pass/fail inventory plus path-classified side effects without performing cleanup or baseline regeneration.

## Scope

- Capture pre-run and post-run `git status --short`.
- Verify required local test prerequisites before running commands.
- Run the agreed automated validators, aggregators, audits, compare-mode visual suites, and Lighthouse harness in the defined order.
- Classify every command result and every changed path at closeout.
- Update the Kanban board and handoff trail for the sweep.

## Out Of Scope

- Runtime, data, route, asset, script, or report-path fixes.
- Baseline regeneration.
- Build or refresh flows such as `build:*`, `enrich:factions`, or `scryfall:refresh`.
- Manual QA.
- Cleaning unrelated worktree drift.

## Acceptance Criteria

- All sweep commands are run from repo root using Windows shell command forms.
- Prerequisite verification is recorded before command execution.
- Command outcomes are bucketed as `passed cleanly`, `failed functionally`, `passed with warnings`, or `known unstable / classification-only`.
- `npm.cmd run dossier:audit` with warnings and `failures: 0` is reported as `passed with warnings`.
- `npm.cmd run test:lighthouse:newindex2` is run and classified without letting known unstable behavior alone determine overall sweep failure.
- Post-run path classification distinguishes `pre-existing drift`, `ignored/generated artifact`, `expected tracked rewrite`, and `unexpected tracked mutation`.

## Run Order

1. `git status --short`
2. Prerequisite verification
3. `npm.cmd run lint:html`
4. `npm.cmd run lint:js`
5. `npm.cmd run test:frontend-smoke`
6. `npm.cmd test`
7. `npm.cmd run test:bias`
8. `npm.cmd run test:bias:all`
9. `npm.cmd run audit:factions`
10. `npm.cmd run dossier:audit`
11. `node research/validate-mono-color-markdown.mjs`
12. `node research/validate-colorless-markdown.mjs`
13. `npm.cmd run test:visual:newindex2`
14. `npm.cmd run test:visual:archscry`
15. `npm.cmd run test:visual:strategium`
16. `npm.cmd run test:visual:apocrypha`
17. `npm.cmd run test:lighthouse:newindex2`
18. `git status --short`

## Implementation

- Captured the pre-run tracked-worktree baseline with `git status --short` before any test commands.
- Verified all required local prerequisites existed:
  - `node_modules`
  - all four visual regression baseline directories
  - local Scryfall raw/index files
  - the precon workbook
- Ran the full automated sweep in the agreed order without invoking `test:watch`, any `test:visual:*:baseline` commands, or any build/refresh flows.
- Captured the post-run tracked-worktree state with `git status --short`.
- Checked for leftover `msedge` or `node` processes after the Lighthouse timeout path; none remained running.

## Validation

### Passed Cleanly

- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:bias`
- `npm.cmd run test:bias:all`
- `npm.cmd run audit:factions`
- `node research/validate-mono-color-markdown.mjs`
- `node research/validate-colorless-markdown.mjs`
- `npm.cmd run test:visual:newindex2`
- `npm.cmd run test:visual:archscry`
- `npm.cmd run test:visual:strategium`
- `npm.cmd run test:visual:apocrypha`

### Failed Functionally

- `npm.cmd run dossier:audit`
  - Exit `1`
  - Summary: `Pass: 0; warnings: 92; failures: 12.`
  - Report written to `artifacts/dossier-snapshots/dossier-audit-report.md`
  - Report highlights:
    - banned phrase failure in `sultai-brood.primary.md`
    - multiple missing required `starter cards` sections
    - missing `Commander deck-start links` in several four-color dossier surfaces

### Known Unstable / Classification-Only

- `npm.cmd run test:lighthouse:newindex2`
  - Wrapper exit `124` after timeout
  - Known unstable behavior reproduced:
    - `NO_FCP`
    - `Performance: 0`
    - `Accessibility: 0`
    - report written to `docs/audits/lighthouse-newindex2.html`
    - cleanup path reported `taskkill stderr ERROR: Access denied`
  - No leftover `msedge` or `node` processes were running when checked after timeout.

### Notable Passing Details

- `npm.cmd run test:visual:newindex2`
  - `mobile: 8 mismatched pixels`
  - `tablet: 44 mismatched pixels`
  - `desktop: 43 mismatched pixels`
  - Still passed inside the 300-pixel budget.
- `npm.cmd run test:visual:archscry`
  - All compared captures reported `0 mismatched pixels`.
- `npm.cmd run test:visual:strategium`
  - All compared captures reported `0 mismatched pixels`.
- `npm.cmd run test:visual:apocrypha`
  - All compared captures reported `0 mismatched pixels`.

## Changed Path Classification

- `pre-existing drift`
  - All tracked paths already present in the pre-run `git status --short` baseline.
  - This includes `docs/audits/lighthouse-newindex2.html`, which is a known Lighthouse rewrite target but was already dirty before the sweep.
  - This also includes `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`, which were already dirty before VM-287 bookkeeping was added.
- `ignored/generated artifact`
  - `test-results/quick-reading-bias/latest.json`
  - `test-results/quick-reading-bias/seeded-random.json`
  - `test-results/quick-reading-bias/golden-paths.json`
  - `artifacts/dossier-snapshots/dossier-audit-report.md`
  - compare-mode outputs under:
    - `artifacts/visual-regression/newindex2/current/` and `diff/`
    - `artifacts/visual-regression/archscry/current/` and `diff/`
    - `artifacts/visual-regression/strategium/current/` and `diff/`
    - `artifacts/visual-regression/apocrypha/current/` and `diff/`
- `expected tracked rewrite`
  - `docs/kanban/done/VM-287-full-automated-test-sweep.md`
  - `docs/handoffs/2026-06-04-1212-codex-vm287-full-automated-test-sweep.md`
- `unexpected tracked mutation`
  - None observed beyond the already-dirty pre-run tracked set.
