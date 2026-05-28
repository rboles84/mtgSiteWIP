# 2026-05-27 19:43 - Codex - VM-151 Adjacent Dossier Maze Handoff Refresh

## Agent Name

Codex

## Task Requested

Implement the VM-151 follow-up plan so Maze's "From Your Dossier" sidebar reflects the active Archscry dossier view after adjacent-fit navigation, rather than defaulting back to the original primary placement.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-1022-codex-vm150-dossier-maze-path-differentiation.md`
- `docs/handoffs/2026-05-15-0914-codex-vm005-archscry-maze-continuity.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-150-dossier-maze-path-differentiation.md`
- `assets/js/maze-handoff.js`
- `assets/js/archscry-presentation.js`
- `assets/js/index.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-151-adjacent-dossier-maze-handoff-refresh.md`
- `docs/kanban/in-progress/VM-151-adjacent-dossier-maze-handoff-refresh.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-1943-codex-vm151-adjacent-dossier-maze-handoff-refresh.md`

## What Changed

- Added an active-handoff placement resolver in `research/research-init.js` so Maze prefers the current Archscry handoff `fit`/`factionName` when building "From Your Dossier".
- Added deterministic color-identity resolution for active dossier keys, including guild names and Strixhaven colleges such as `WITHERBLOOM -> bg`.
- Preserved the stored primary `placementResult` unchanged; the active result used by Maze's sidebar is derived as a sidebar-only object.
- Added a Maze DOM regression that seeds a stale Red placement result, launches Maze with a Witherbloom handoff, and verifies BG/Witherbloom sidebar paths plus Plain Reading / Operator's Hand mode switching.
- Added an Archscry adjacent-link regression that verifies adjacent Maze URLs carry the active `fit`, `factionName`, and operator query.
- Updated architecture docs, manual QA notes, Kanban, and handoff index.

## Why It Changed

VM-150 made the four path recipes distinct, but Maze still selected the old placement result before interpreting the active handoff. That meant an adjacent dossier could launch a correct Witherbloom path while the sidebar regenerated Red paths from stale primary placement data. The fix makes the current handoff view authoritative for sidebar path generation without altering the primary placement used for return and restore flows.

## Decisions Made

- Kept the public handoff contract unchanged.
- Treated `fit` and `factionName` from the current Archscry URL/handoff as the active sidebar view.
- Kept evidence from the stored primary placement so adjacent views still inherit the reading's signal trail.
- Added local identity aliases inside Maze rather than importing more Archscry presenter code into the Maze runtime.

## Risks / Uncertainties

- Human review should still rerun the exact Red primary to Witherbloom adjacent Maze flow and one second adjacent fit in browser.
- The working tree already contained unrelated VM-012, VM-088, VM-149, and VM-150 changes. This handoff covers only the VM-151 adjacent handoff refresh.

## Tests Run

- `node --check research/research-init.js` - passed.
- `node --check research/maze-search-tests.js` - passed.
- `node --check research/archscry-adjacent-navigation-tests.js` - passed.
- `node --check assets/js/index.js` - passed.
- `node research/maze-search-tests.js` - passed.
- `node research/archscry-adjacent-navigation-tests.js` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed.

## Not Touched

- No VM-022 work.
- No Maze visual redesign, new routes, or new panels.
- No stash or modal contract changes.
- No parser architecture extraction.
- No network-backed parsing, downloads, or remote validation.
- No mutation of stored primary `placementResult.faction`.
- No unrelated dirty work was reverted.

## Follow-Up Recommendations

- Run the VM-151 manual QA flow in a browser against one Red-to-Witherbloom path and one additional adjacent fit.
- Keep future Maze sidebar path sourcing tied to the active Archscry handoff before falling back to cached primary placement data.

## Next Suggested Agent

Human review

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-151-adjacent-dossier-maze-handoff-refresh.md`
- `docs/kanban/done/VM-150-dossier-maze-path-differentiation.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`
