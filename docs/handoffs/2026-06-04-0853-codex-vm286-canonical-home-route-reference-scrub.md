# 2026-06-04 08:53 - Codex - VM-286 Canonical Home Route Reference Scrub

## Agent Name

Codex

## Task Requested

Execute VM-286 as a focused canonical Home route reference scrub:

- create the VM-286 Kanban card and update the board on create and close
- run a repo-wide classified audit for `newIndex2`, `newindex2`, `newIndex2.html`, and `newindex2.html`
- fix stale current-state live-route wording only if found
- add short clarification text where current docs could be misread as treating `newindex2.html` as the live Home route
- preserve the established `newindex2` asset, harness, script, report, and artifact naming
- preserve historical records
- run the required verification search plus `lint:html` and `test:frontend-smoke`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0824-codex-vm285-placement-harness-aggregation-contract-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/backlog/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/design/asset-manifest.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/data-contracts.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/cdn-font-dependency-review.md`
- `docs/research/webdev/vox-mana-specific/deep-research-report_adding_more_colors.md`
- `index.html`
- `package.json`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/lighthouse-newindex2.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/lint-frontend-js.mjs`
- `scripts/frontend-smoke.mjs`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-286-canonical-home-route-reference-scrub.md`
- `docs/design/asset-manifest.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0853-codex-vm286-canonical-home-route-reference-scrub.md`

## What Changed

- Created and closed VM-286 as a documentation-only canonical Home route reference scrub.
- Ran a repo-wide classified audit for `newIndex2`, `newindex2`, `newIndex2.html`, and `newindex2.html`.
- Confirmed there were no bucket-1 stale current-state live route/page references to fix.
- Added short clarifications in the four current-state Home docs that were most likely to be misread:
  - `docs/design/asset-manifest.md`
  - `docs/architecture/route-ownership-matrix.md`
  - `docs/architecture/project-atlas.md`
  - `docs/reference/manual-test-cases.md`
- Clarified that:
  - `index.html` is the canonical Home route
  - `newindex2` remains only as preserved historical asset and harness naming where already established
- Updated the board and handoff index for VM-286.

## Why It Changed

- The repo already cut Home over to `index.html`, but `newindex2` still appears widely as preserved historical asset and harness naming.
- The user wanted a critical scrub of stale current-state Home-route references without widening into risky rename churn.
- The audit showed the real problem was ambiguity, not runtime drift: current live files and current Home docs needed clearer wording, while the bulk of remaining hits were either intentional live harness naming or preserved historical records.

## Decisions Made

- Kept the slice documentation-only because the audit found no stale live-route references that required runtime or script changes.
- Preserved all established `newindex2` filenames, npm scripts, report paths, artifact directories, and code identifiers.
- Preserved historical completed cards, handoffs, audit artifacts, board done-link titles, and branch-snapshot research docs even when they mention `newIndex2` or `newindex2.html`.
- Treated the four current-state Home docs as bucket 4 clarification targets rather than rename candidates.
- Treated the two exact `newindex2.html` hits in `scripts/lighthouse-newindex2.mjs` as preserved bucket-2 report-path continuity, not stale route behavior.

## Classified Audit Summary

Repo-wide `newIndex2` / `newindex2` scan before edits:

- Bucket 1: `0` hits across `0` files
- Bucket 2: `33` hits across `15` files
- Bucket 3: `1080` hits across `150` files
- Bucket 4: `13` hits across `4` files

Bucket-4 clarification targets:

- `docs/design/asset-manifest.md` - `1` hit
- `docs/architecture/route-ownership-matrix.md` - `3` hits
- `docs/architecture/project-atlas.md` - `3` hits
- `docs/reference/manual-test-cases.md` - `6` hits

Exact `newIndex2.html` / `newindex2.html` scan before edits:

- Bucket 1: `0`
- Bucket 2: `2`
- Bucket 3: `566`
- Bucket 4: `0`

Focused post-change verification search across live code and current-state docs:

- Remaining exact hits: `2`
- Both remaining hits are the preserved `docs/audits/lighthouse-newindex2.html` report-path writes in `scripts/lighthouse-newindex2.mjs`
- No stale live-route claims remained

## Preserved `newindex2` References And Why

- `assets/css/newindex2.css` and `assets/js/newindex2.js`
  Preserved as live historical Home asset filenames loaded by `index.html`.
- `test:visual:newindex2` and `test:lighthouse:newindex2`
  Preserved as stable npm harness names with existing workflow history.
- `scripts/visual-regression-newindex2.mjs` and `scripts/lighthouse-newindex2.mjs`
  Preserved as stable harness entrypoints already wired into package scripts and artifact paths.
- `docs/audits/lighthouse-newindex2.html`
  Preserved as the established Lighthouse report output path.
- Historical cards, handoffs, board done-link titles, audit artifacts, and branch-snapshot research docs
  Preserved for audit-trail accuracy.

## Risks / Uncertainties

- `docs/kanban/board.md`, `docs/reference/manual-test-cases.md`, `docs/architecture/project-atlas.md`, and other repo files already had unrelated dirty-worktree changes before VM-286. I only added the narrow VM-286 wording and workflow updates and did not normalize unrelated drift.
- Future teams may still choose to rename Home assets or harnesses, but that would be a separate explicit rename/migration slice rather than a reference scrub.

## Tests Run

- Focused verification search:
  - `rg -n -S "newIndex2\\.html|newindex2\\.html" index.html package.json scripts docs/design/asset-manifest.md docs/architecture/route-ownership-matrix.md docs/architecture/project-atlas.md docs/reference/manual-test-cases.md docs/reference/data-contracts.md docs/architecture/data-flow-map.md docs/architecture/cdn-font-dependency-review.md docs/diagrams docs/kanban/backlog/VM-154-home-hero-horizontal-overflow-containment.md`
  - Result: only the two preserved `scripts/lighthouse-newindex2.mjs` report-path hits remained
- `npm.cmd run lint:html` - passed
- `npm.cmd run test:frontend-smoke` - passed

## Not Touched

- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `test:visual:newindex2`
- `test:lighthouse:newindex2`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/lighthouse-newindex2.mjs`
- `docs/audits/lighthouse-newindex2.html`
- runtime code, route structure, and public behavior
- historical completed cards, handoffs, audit artifacts, and branch-snapshot research docs

## Follow-Up Recommendations

- If the team ever wants to remove `newindex2` from live asset or harness names, open a dedicated rename-and-migration slice with explicit approval for script, artifact-path, and report-path churn.
- Keep future current-state Home docs explicit about `index.html` being canonical so route naming does not drift back into ambiguity.

## Next Suggested Agent

Codex main agent or Documentation Steward if a later explicit rename/migration card is approved. No specialist runtime follow-up is required from VM-286 itself.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-286-canonical-home-route-reference-scrub.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/backlog/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/handoffs/2026-05-27-2205-codex-vm144-preview-archive-audit.md`
- `docs/handoffs/2026-06-04-0824-codex-vm285-placement-harness-aggregation-contract-repair.md`
