# Agent Handoff: Codex - VM-021B Maze Return Bar Removal and MTGDecks URL Lockdown

Date: 2026-05-16 13:08
Related Card: VM-021B
Related Plan: User follow-up on VM-021B placement return behavior and MTGDecks routing
Status: Complete

## Agent Name

Codex

## Task Requested

Remove the placement-side return bar, keep the Maze return action on the Maze page, land returning users on the Maze Discovery Paths anchor, and lock MTGDecks routing so directory links use the guild/college alias while commander-specific links use the commander slug only.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/board.md`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`

## Files Changed

- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1308-codex-vm021b-maze-return-bar-removal-mtgdecks-url-lockdown.md`

## What Changed

- Removed the placement-side return bar by making the adjacent context renderer a no-op on the dossier page.
- Kept the Maze return path pointing to `#maze-discovery-paths` so returning users land on the Maze Discovery Paths section.
- Added a shared MTGDecks commander slug helper and used it for commander-specific MTGDecks links.
- Preserved the guild/college alias MTGDecks directory links with the `-commanders` suffix.
- Added tests for both MTGDecks URL shapes.

## Why It Changed

The user wanted the Maze page to own the return action, with no extra return button on placement, and wanted MTGDecks routing to separate directory links from commander-specific links.

## Decisions Made

- Kept the placement return control out of the dossier render entirely.
- Kept the Maze return anchor at `Maze Discovery Paths`.
- Limited alias mapping to MTGDecks only.

## Risks / Uncertainties

- The anchor now lands on the Maze Discovery Paths section, but the section may still appear below Mana Base in the current dossier layout.
- No browser QA was run in this turn.

## Tests Run

- `node --check assets/js/index.js` - passed.
- `node --check assets/js/commander-dossier.js` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with existing LF/CRLF warnings in unrelated files.

## Not Touched

- No routing shape changes.
- No scoring changes.
- No VM-016 QR work.
- No redesign or visual polish work.
- EDHREC and Archidekt routing logic were left alone.

## Follow-Up Recommendations

- Run the quick-reading test suite and a browser check on the Maze return flow.

## Next Suggested Agent

Test Strategist

## Related Kanban Card, Docs, or Plans

- `docs/kanban/backlog/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
