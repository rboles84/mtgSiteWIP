# Agent Handoff: Codex - VM-021B Adjacent Fit Click Repair + Return Path

Date: 2026-05-17 01:26
Related Card: VM-021B
Related Plan: VM-021B - Adjacent Fit Click Repair + Return Path
Status: Complete

## Agent Name

Codex

## Task Requested

Fix the adjacent-fit click path on the Archscry result page, keep the current layout, and add a clear way to return from an adjacent fit to the original primary reading.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-16-1320-codex-vm021b-maze-return-anchor-only-after-maze-return.md`
- `docs/handoffs/2026-05-16-1308-codex-vm021b-maze-return-bar-removal-mtgdecks-url-lockdown.md`
- `docs/handoffs/2026-05-15-0914-codex-vm005-archscry-maze-continuity.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `research/run-tests.js`
- `research/maze-search-tests.js`

## Files Changed

- `assets/js/index.js`
- `research/archscry-adjacent-navigation-tests.js`
- `research/run-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/backlog/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-0126-codex-vm021b-adjacent-fit-click-repair-return-path.md`

## What Changed

- Moved the `resultStatus` declaration ahead of the primary/adjacent placement HTML construction in `renderResult()`, removing the render-time failure that prevented adjacent fits from opening.
- Added an explicit `returnToPrimaryReading()` helper and a visible `Back to Primary Reading` control for adjacent dossier views.
- Kept `switchAdjacentView()` on the same render path while preserving the original primary result as the return target.
- Added a regression test that locks the `resultStatus` declaration order and the new return control into place.
- Promoted VM-021B to the done column and recorded the completion in the handoff index.

## Why It Changed

The adjacent-fit button was not failing because of CSS; it was failing because the adjacent render path could trip over a template-order bug before the new dossier completed. The return control was added so the user has a clear way back to the original reading after inspecting an adjacent fit.

## Decisions Made

- Kept the existing dossier layout unchanged.
- Used the current placement result as the primary-return target instead of introducing a new navigation system.
- Avoided CSS changes because the failure reproduced as a render-path problem.
- Left Maze handoff, scoring, lore, and deck-link routing untouched.

## Risks / Uncertainties

- No browser screenshot or interactive QA pass was available in this turn.
- The new return button is intentionally simple; future UX polish could merge it more tightly into the adjacent header if needed.

## Tests Run

- `node --check assets/js/index.js` - passed.
- `node --check research/run-tests.js` - passed.
- `npm.cmd test` - passed.
- `node research/run-tests.js` - passed.

## Not Touched

- No scoring, adaptive model, or lore systems were changed.
- No Maze return-anchor logic was changed.
- No CSS or route-shape changes were made.
- The unrelated VM-012 worktree changes were left alone.

## Follow-up Recommendations

- Run a quick browser QA pass to confirm `View this fit` opens the adjacent dossier and `Back to Primary Reading` returns cleanly.

## Next Suggested Agent

Test Strategist

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/board.md`
- `docs/architecture/core-logic-and-algorithms.md`
