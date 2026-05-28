# VM-144 - Stale Preview Asset Archive Audit

ID: VM-144
Title: Stale Preview Asset Archive Audit
Status: done
Type: Documentation / Tech Debt
Area: Frontend Assets, Archives
Priority: low
Created: 2026-05-26
Completed: 2026-05-27

## Summary

Verify suspected stale or preview-only frontend assets and references, then archive anything confirmed obsolete instead of deleting it.

## Source

- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
- Candidate assets surfaced during the route audit, including `assets/css/archscry-atlas.css`, `assets/css/home-preview.css`, `assets/js/archscry-index2.js`, and related preview-route references.

## Acceptance Criteria

- Each candidate stale asset or reference is checked against live routes, validators, tests, docs, and any archive/preview history.
- Confirmed obsolete items are archived according to project rules, not permanently deleted.
- Any docs that point to removed or archived preview routes are updated to describe the current state.
- Live public routes, local-file route compatibility, and validators remain unchanged unless explicitly scoped.

## Non-Goals

- Do not remove files based only on filename suspicion.
- Do not redesign Archscry, Home, or preview route behavior.
- Do not change runtime route targets.

## Files Likely Impacted

- `docs/reference/manual-test-cases.md`
- `docs/design/asset-manifest.md`
- `docs/architecture/route-ownership-matrix.md`
- Confirmed archive destinations for stale preview assets

## Risks / Uncertainties

- Some preview assets may be retained as historical design archive material.
- The `archscry/index2.html` references may reflect removed preview work rather than a current missing route.

## Implementation Prompt

Audit suspected stale preview assets and references, prove whether each one is live, archived, or obsolete, then archive only the confirmed obsolete pieces with a clear handoff trail.

## Implementation Summary

- Confirmed `archscry/index2.html`, `newIndex.html`, and `newIndex2.html` are not live route files in the current tree.
- Confirmed `assets/css/newindex2.css` and `assets/js/newindex2.js` remain live canonical Home assets and left them untouched.
- Moved `assets/css/archscry-atlas.css`, `assets/js/archscry-index2.js`, `assets/css/home-preview.css`, and `assets/js/home-preview.js` into a working-tree folder archive at `docs/research/archive/vm144-stale-preview-assets/`; this is not a ZIP, separate branch, or duplicate active-path copy.
- Added an archive README with original paths, stale-proof notes, provenance-only instructions, and recovery location.
- Removed the archived Archscry preview runtime from `scripts/lint-frontend-js.mjs`.
- Collapsed the stale `/archscry/index2.html` Maze return branch in `assets/js/archscry-presentation.js` to the live `../archscry/index.html` route and added a regression assertion.
- Updated current-behavior docs so stale preview routes/assets are described as archived or removed.
- Proven-dead status is supported by the VM-144 static reference scan and the archive README proof table in `docs/research/archive/vm144-stale-preview-assets/README.md`.

## Reference Scan Summary

- Before VM-144, the operational/current-scope scan found 10 relevant references: three candidate active asset files, one stale `archscry.css` route comment, one `/archscry/index2.html` Maze return branch, two VM-144 backlog card references, one manual-test route reference, one lint target entry, and two live `newindex2` Lighthouse harness references.
- After VM-144, the current operational scan found 7 intentional references: four archived-asset rows in `docs/design/asset-manifest.md`, one archived-route note in `docs/reference/manual-test-cases.md`, and two live `docs/audits/lighthouse-newindex2.html` output references in `scripts/lighthouse-newindex2.mjs`.
- Broader remaining references are limited to provenance records in the VM-144 archive README, this done card, the VM-144 handoff, historical records, or current docs that explicitly identify the stale assets/routes as archived or removed.

## Current Doc Change Summary

- `docs/reference/manual-test-cases.md`: replaced the stale `/archscry/index2.html` atlas smoke pass with an archived-preview note and current `/archscry/` plus Maze return guidance.
- `docs/design/asset-manifest.md`: added the archived preview asset table and preserved `assets/css/newindex2.css` / `assets/js/newindex2.js` as live Home assets.
- `docs/architecture/route-ownership-matrix.md`: updated the VM-144 follow-up note to say the stale preview assets were archived while live `newindex2` Home assets remain active.
- `docs/research/archive/vm144-stale-preview-assets/README.md`: records original paths, proof of staleness, provenance status, and recovery location for the archived files.

## Git State At Record Tightening

- Branch: `feature/ui-refactor-exploration`.
- Base HEAD at record time: `7e75e5f` (`VM-022: introduce Maze query contract spec and field inventory`).
- VM-144 changes are uncommitted in the working tree at this record-tightening pass.
- The working tree is dirty and also contains unrelated VM-146 documentation/card changes, so this card does not claim a clean tree.
- Final VM-144 commit hash should be recorded by the release/git steward after staging and committing VM-144 separately from unrelated work.

## Files Changed

- `assets/css/archscry.css`
- `assets/js/archscry-presentation.js`
- `scripts/lint-frontend-js.mjs`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/reference/manual-test-cases.md`
- `docs/design/asset-manifest.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/research/archive/vm144-stale-preview-assets/README.md`
- `docs/research/archive/vm144-stale-preview-assets/assets/css/archscry-atlas.css`
- `docs/research/archive/vm144-stale-preview-assets/assets/css/home-preview.css`
- `docs/research/archive/vm144-stale-preview-assets/assets/js/archscry-index2.js`
- `docs/research/archive/vm144-stale-preview-assets/assets/js/home-preview.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-144-stale-preview-asset-archive-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2205-codex-vm144-preview-archive-audit.md`

## Verification

- Pre/post static reference scans for `archscry-atlas.css`, `archscry-index2.js`, `home-preview.css`, `home-preview.js`, `archscry/index2.html`, `index2.html`, and `newIndex.html`
- Targeted delivery-record scan after tightening confirmed the 7 intentional current operational references listed above.
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Human Review

Yes - archival decisions should be reviewed before moving historical design material.
