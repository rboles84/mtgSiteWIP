# Agent Handoff: Codex - VM-021B Maze Return Anchor Only After Maze Return

Date: 2026-05-16 13:20
Related Card: VM-021B
Related Plan: User follow-up on maze return anchoring behavior
Status: Complete

## Agent Name

Codex

## Task Requested

Make the placement scroll-to-maze behavior happen only after a Maze return, not on any other placement action.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1308-codex-vm021b-maze-return-bar-removal-mtgdecks-url-lockdown.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/board.md`
- `assets/js/index.js`

## Files Changed

- `assets/js/index.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1320-codex-vm021b-maze-return-anchor-only-after-maze-return.md`

## What Changed

- Added a one-time Maze return anchor flag to the app state.
- Captured the Maze return anchor only when the placement URL includes `from=maze` and the `#maze-discovery-paths` hash.
- Changed the post-render scroll helper so it only scrolls when that Maze return anchor flag is present.
- Cleared the hash from the URL after the scroll runs so later placement actions do not re-trigger the jump.

## Why It Changed

The placement page was still honoring the anchor on later renders, which made the view jump to the Maze section on actions unrelated to the Maze round-trip. The user only wanted that scroll when coming back from Maze.

## Decisions Made

- Kept the Maze return behavior one-time and consumed.
- Left the Maze-side return button unchanged.
- Did not reintroduce any placement-side return bar.

## Risks / Uncertainties

- None beyond the existing need for browser QA on the full Maze round-trip.

## Tests Run

- Not yet rerun in this turn; the code patch was applied before verification.

## Not Touched

- No routing shape changes.
- No scoring or lore changes.
- No MTGDecks or other deck-link logic changes in this follow-up.
- No QR work.

## Follow-Up Recommendations

- Re-run the relevant JS checks and a browser QA pass for the Maze return flow.

## Next Suggested Agent

Test Strategist

## Related Kanban Card, Docs, or Plans

- `docs/kanban/backlog/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-16-1308-codex-vm021b-maze-return-bar-removal-mtgdecks-url-lockdown.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
