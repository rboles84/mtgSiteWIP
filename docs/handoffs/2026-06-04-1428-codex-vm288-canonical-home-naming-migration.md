## Agent

Codex

## Task Requested

Execute Track A of the two-track cleanup by migrating the live Home stack from legacy `newindex2` naming to canonical `home` naming, updating current-state callers/docs/tooling, preserving historical records, validating the renamed stack, and closing the Kanban card.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent relevant handoffs:
  - `docs/handoffs/2026-06-04-0853-codex-vm286-canonical-home-route-reference-scrub.md`
  - `docs/handoffs/2026-06-04-1212-codex-vm287-full-automated-test-sweep.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-288-canonical-home-naming-migration.md`
- `index.html`
- `package.json`
- `scripts/validate-frontend-html.mjs`
- `scripts/lint-frontend-js.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-home.mjs`
- `scripts/lighthouse-home.mjs`
- Current-state Home docs and diagrams under:
  - `docs/architecture/`
  - `docs/design/`
  - `docs/reference/`
  - `docs/diagrams/`

## Files Changed

- `assets/css/home.css`
- `assets/js/home.js`
- `index.html`
- `package.json`
- `scripts/validate-frontend-html.mjs`
- `scripts/lint-frontend-js.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-home.mjs`
- `scripts/lighthouse-home.mjs`
- `docs/design/asset-manifest.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/data-contracts.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/cdn-font-dependency-review.md`
- `docs/architecture/data-flow-map.md`
- `docs/diagrams/route-map.mmd`
- `docs/diagrams/project-architecture.mmd`
- `docs/diagrams/route-map.svg`
- `docs/diagrams/project-architecture.svg`
- `docs/kanban/backlog/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-288-canonical-home-naming-migration.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Moved live artifact root:
  - `artifacts/visual-regression/newindex2/` -> `artifacts/visual-regression/home/`
- Renamed live files:
  - `assets/css/newindex2.css` -> `assets/css/home.css`
  - `assets/js/newindex2.js` -> `assets/js/home.js`
  - `scripts/visual-regression-newindex2.mjs` -> `scripts/visual-regression-home.mjs`
  - `scripts/lighthouse-newindex2.mjs` -> `scripts/lighthouse-home.mjs`

## What Changed

- Renamed the live Home route assets and harness scripts from `newindex2` to `home`.
- Updated `index.html` to load `home.css` and `home.js`.
- Renamed the live npm commands to:
  - `test:visual:home`
  - `test:visual:home:baseline`
  - `test:lighthouse:home`
- Retargeted validators and smoke checks to the renamed Home asset files.
- Moved the visual regression artifact ownership from `artifacts/visual-regression/newindex2/` to `artifacts/visual-regression/home/` without regenerating baselines.
- Changed the live Lighthouse report output path to `docs/audits/lighthouse-home.html`.
- Updated current-state Home architecture/reference docs and diagrams so the live stack consistently uses canonical Home naming.
- Added a static smoke-test guard that flags stale legacy Home naming if it re-enters current-state files.

## Why It Changed

- `index.html` has been the canonical Home route since VM-148, but the live implementation and test tooling still carried preview-era `newindex2` names.
- That split between route truth and live asset/harness naming created ongoing confusion in code, scripts, docs, and test output.
- This cleanup aligns the live Home stack with its actual route role while preserving historical records as historical records.

## Decisions Made

- Use `home` rather than `index` for live route-local asset and harness naming because `assets/js/index.js` already belongs to Archscry and `home` is the clearest route-role label.
- Preserve historical handoffs, completed cards, and archived research rather than mass-rewriting their terminology.
- Move the existing Home visual artifact root instead of regenerating baselines.
- Treat the renamed Lighthouse harness as valid even though it reproduced the pre-existing `NO_FCP` instability.

## Risks / Uncertainties

- `npm.cmd run test:lighthouse:home` still reproduces the known `NO_FCP` / cleanup-stall behavior. The rename did not repair Lighthouse stability.
- Historical records still contain `newindex2` by design. Future searches should distinguish current-state surfaces from preserved history.

## Tests Run

- `npm.cmd run lint:html` - passed
- `npm.cmd run lint:js` - passed
- `npm.cmd run test:frontend-smoke` - passed
- `npm.cmd run test:visual:home` - passed
- `npm.cmd run test:lighthouse:home` - known unstable / classification-only
  - Reproduced `NO_FCP`
  - Wrote `docs/audits/lighthouse-home.html`
  - Timed out during the existing Edge cleanup stall
- Verification search over live/current-state Home surfaces for `newIndex2|newindex2|newIndex2.html|newindex2.html` - no remaining hits

## Not Touched

- Historical completed cards, handoffs, and archived research that preserve `newindex2` terminology as historical record.
- Home visual redesign.
- Lighthouse stability repair.
- Dossier audit semantics and content repair work reserved for VM-289.

## Follow-Up Recommendations

- If the team wants the Lighthouse harness stabilized, open a separate focused card that addresses `NO_FCP` and the lingering Edge cleanup failure mode directly.
- Keep the new smoke-test guard in the current-state validation path so legacy Home naming does not drift back into live code or docs.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-288-canonical-home-naming-migration.md`
- `docs/kanban/in-progress/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/handoffs/2026-06-04-0853-codex-vm286-canonical-home-route-reference-scrub.md`
- `docs/handoffs/2026-06-04-1212-codex-vm287-full-automated-test-sweep.md`
