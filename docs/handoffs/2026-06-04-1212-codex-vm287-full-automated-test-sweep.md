# 2026-06-04 12:12 - Codex - VM-287 Full Automated Test Sweep

## Agent Name

Codex

## Task Requested

Implement the full automated test sweep plan:

- run the entire automated validation surface from repo root at `C:\dev\mtgSiteWIP`
- capture pre-run and post-run `git status --short`
- verify prerequisites before execution
- continue through all commands even after failures
- classify command outcomes and changed paths
- treat Lighthouse as classification-only unless it introduced a new failure mode

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0824-codex-vm285-placement-harness-aggregation-contract-repair.md`
- `docs/handoffs/2026-06-04-0853-codex-vm286-canonical-home-route-reference-scrub.md`
- `docs/handoffs/2026-06-04-0911-codex-vm263-ink-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-285-placement-harness-aggregation-and-contract-drift-repair.md`
- `docs/kanban/done/VM-286-canonical-home-route-reference-scrub.md`
- `package.json`
- `docs/reference/workflow.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/route-ownership-matrix.md`
- `research/run-tests.js`
- `scripts/validate-frontend-html.mjs`
- `scripts/lint-frontend-js.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/visual-regression-archscry.mjs`
- `scripts/visual-regression-strategium.mjs`
- `scripts/visual-regression-apocrypha.mjs`
- `scripts/lighthouse-newindex2.mjs`
- `research/audit-dossiers.mjs`
- `research/validate-mono-color-markdown.mjs`
- `research/validate-colorless-markdown.mjs`
- `artifacts/dossier-snapshots/dossier-audit-report.md`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-287-full-automated-test-sweep.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1212-codex-vm287-full-automated-test-sweep.md`

## What Changed

- Created VM-287, ran the full automated test sweep, and closed the card with command-by-command results.
- Captured pre-run and post-run `git status --short`.
- Verified the required local prerequisites before running any commands.
- Ran the agreed validator, Node, bias, audit, visual, and Lighthouse commands from repo root using Windows shell command forms.
- Classified command outcomes into `passed cleanly`, `failed functionally`, and `known unstable / classification-only`.
- Classified changed paths into `pre-existing drift`, `ignored/generated artifact`, `expected tracked rewrite`, and `unexpected tracked mutation`.
- Updated the Kanban board and handoff index for VM-287.

## Why It Changed

- The user asked for a complete automated sweep rather than isolated spot checks.
- The repo’s automated surface is broader than `npm.cmd test`, so the sweep needed to include validators, audits, simulations, compare-mode visual tests, and the known unstable Lighthouse harness.
- The worktree was already dirty before the sweep, so explicit pre-run/post-run capture and path classification were necessary to avoid confusing old drift with test-generated output.

## Decisions Made

- Used `VM-287` as the next free Kanban ID.
- Preserved the agreed exclusions:
  - no `test:watch`
  - no `test:visual:*:baseline`
  - no build, enrich, or refresh commands
- Treated `npm.cmd run dossier:audit` as a real failure because this run reported `failures: 12`, not just warnings with `failures: 0`.
- Treated `npm.cmd run test:lighthouse:newindex2` as `known unstable / classification-only` because it reproduced the already-known `NO_FCP` / zero-score / cleanup-hang behavior without introducing a new failure mode.
- Did not clean or revert any pre-existing worktree drift.

## Result Summary

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
  - Report: `artifacts/dossier-snapshots/dossier-audit-report.md`
  - Report highlights:
    - banned phrase failure in `sultai-brood.primary.md`
    - multiple missing required `starter cards` sections
    - missing `Commander deck-start links` in several four-color dossier surfaces

### Known Unstable / Classification-Only

- `npm.cmd run test:lighthouse:newindex2`
  - Wrapper exit `124` after timeout
  - Reproduced known unstable behavior:
    - `NO_FCP`
    - `Performance: 0`
    - `Accessibility: 0`
    - report written to `docs/audits/lighthouse-newindex2.html`
    - cleanup error: `taskkill stderr ERROR: Access denied`
  - No lingering `msedge` or `node` processes were found after the timeout.

## Changed Path Classification

- `pre-existing drift`
  - The entire tracked set already present in the pre-run `git status --short` baseline.
  - Notable examples:
    - `docs/audits/lighthouse-newindex2.html`
    - `docs/kanban/board.md`
    - `docs/handoffs/HANDOFF_INDEX.md`
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

## Risks / Uncertainties

- The tracked worktree was heavily dirty before VM-287 started, so files like `docs/audits/lighthouse-newindex2.html`, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md` cannot be treated as clean per-run deltas.
- The ignored `artifacts/tmp/**` browser-profile noise is large and pre-existing in places; the handoff only calls out the sweep outputs that were directly evidenced by command output or fresh timestamps.
- `dossier:audit` needs follow-up repair work if the 12 failures are meant to block promotion or release confidence.

## Tests Run

- `git status --short` (pre-run)
- prerequisite existence verification for:
  - `node_modules`
  - four visual baseline directories
  - local Scryfall raw/index files
  - precon workbook
- `npm.cmd run lint:html` - passed
- `npm.cmd run lint:js` - passed
- `npm.cmd run test:frontend-smoke` - passed
- `npm.cmd test` - passed
- `npm.cmd run test:bias` - passed
- `npm.cmd run test:bias:all` - passed
- `npm.cmd run audit:factions` - passed
- `npm.cmd run dossier:audit` - failed functionally
- `node research/validate-mono-color-markdown.mjs` - passed
- `node research/validate-colorless-markdown.mjs` - passed
- `npm.cmd run test:visual:newindex2` - passed
- `npm.cmd run test:visual:archscry` - passed
- `npm.cmd run test:visual:strategium` - passed
- `npm.cmd run test:visual:apocrypha` - passed
- `npm.cmd run test:lighthouse:newindex2` - known unstable / classification-only
- `Get-Process msedge,node -ErrorAction SilentlyContinue` - no lingering processes found after Lighthouse timeout
- `git status --short` (post-run)

## Not Touched

- runtime code
- raw faction data
- build/enrich/refresh flows
- visual baselines
- manual QA
- any cleanup or reversion of pre-existing drift
- asset, script, harness, or report-path renames

## Follow-Up Recommendations

- Open a focused repair slice for `dossier:audit` failures, starting with:
  - missing `starter cards` sections
  - missing `Commander deck-start links`
  - banned Sultai phrase cleanup
- Keep `test:lighthouse:newindex2` classified separately until the known `NO_FCP` / cleanup hang behavior is either fixed or intentionally retired.
- If future full sweeps need cleaner path attribution, capture hashes or targeted file mtimes for already-dirty tracked paths like `docs/audits/lighthouse-newindex2.html` before the run begins.

## Next Suggested Agent

Codex main agent or Test Strategist for the `dossier:audit` repair follow-up.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-287-full-automated-test-sweep.md`
- `docs/kanban/done/VM-285-placement-harness-aggregation-and-contract-drift-repair.md`
- `docs/kanban/done/VM-286-canonical-home-route-reference-scrub.md`
- `docs/kanban/done/VM-263-ink-controlled-runtime-promotion.md`
- `docs/reference/workflow.md`
- `docs/reference/manual-test-cases.md`
