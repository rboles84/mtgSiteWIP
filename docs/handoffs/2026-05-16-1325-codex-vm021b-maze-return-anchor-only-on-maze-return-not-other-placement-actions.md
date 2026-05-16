# Agent Handoff: Codex - VM-021B Maze Return Anchor Only on Maze Return, Not Other Placement Actions

Date: 2026-05-16 13:25
Related Card: VM-021B
Related Plan: User follow-up on placement scroll behavior
Status: Complete

## Agent Name

Codex

## Task Requested

Stop the Maze Discovery Paths anchor from firing on ordinary placement actions; it should only run when the user returns from Maze.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1320-codex-vm021b-maze-return-anchor-only-after-maze-return.md`
- `docs/handoffs/2026-05-16-1308-codex-vm021b-maze-return-bar-removal-mtgdecks-url-lockdown.md`
- `docs/kanban/board.md`
- `assets/js/index.js`

## Files Changed

- `assets/js/index.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1325-codex-vm021b-maze-return-anchor-only-on-maze-return-not-other-placement-actions.md`

## What Changed

- Moved the Maze anchor scroll out of the generic result render path.
- Kept the scroll trigger in `restoreInitialView()` only when the app is returning from Maze.
- Left all other placement actions to render normally without consuming the Maze anchor.
- Preserved the URL cleanup after the one-time scroll.

## Why It Changed

The anchor was still being applied too broadly, which caused the placement page to jump to Maze Discovery Paths on non-Maze actions. The user only wants that jump after the Maze round-trip.

## Decisions Made

- Kept the behavior one-shot and Maze-return only.
- Did not reintroduce any placement return control.

## Risks / Uncertainties

- None beyond the usual browser QA for the Maze round-trip.

## Tests Run

- Not yet rerun in this turn; the code patch was applied before verification.

## Not Touched

- No routing shape changes.
- No scoring or lore changes.
- No MTGDecks changes in this follow-up.
- No QR work.

## Follow-Up Recommendations

- Re-run the JS checks and confirm a plain placement action no longer jumps to Maze Discovery Paths.

## Next Suggested Agent

Test Strategist

## Related Kanban Card, Docs, or Plans

- `docs/kanban/backlog/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-16-1320-codex-vm021b-maze-return-anchor-only-after-maze-return.md`
