# VM-151 - Adjacent Dossier Maze Handoff Refresh

ID: VM-151
Title: Adjacent Dossier Maze Handoff Refresh
Status: done
Type: Bugfix / Runtime
Area: Archscry, Maze
Priority: high
Created: 2026-05-27
Updated: 2026-05-27

## Summary

Repair the post-VM-150 adjacent-dossier Maze continuity bug where the Maze "From Your Dossier" sidebar can keep showing primary placement paths after the user switches to an adjacent dossier and launches Maze from that adjacent view.

## Source

- User report on 2026-05-27: Red primary dossier paths work, but after returning to Red, opening Witherbloom from Adjacent Fits, and launching Maze again, the Maze sidebar "From Your Dossier" still shows Red paths.
- VM-150 differentiated the four dossier path recipes, but the Maze sidebar source selection still preferred stale primary placement data.

## Acceptance Criteria

- Maze "From Your Dossier" reflects the active Archscry dossier view, including adjacent fits.
- Current Archscry URL/handoff fields remain authoritative for `fit`, `factionName`, `readingId`, `pathType`, `plainReadingQuery`, `operatorQuery`, and `returnUrl`.
- The stored primary `placementResult` remains intact for Archscry restore and return behavior.
- If no stored placement exists, Maze can still synthesize four deterministic active-view paths from `fit` and `factionName`.
- Regression coverage proves an old Red placement handoff plus a Witherbloom/BG launch renders Witherbloom/BG sidebar paths.

## Guardrails

- Do not start VM-022.
- Do not redesign Maze.
- Do not change stash or modal contracts.
- Do not add parser architecture work.
- Do not add network-backed validation, downloads, or remote parsing.
- Do not mutate `placementResult.faction` in stored handoff data.

## Files Impacted

- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-1943-codex-vm151-adjacent-dossier-maze-handoff-refresh.md`

## Tests

- `node --check research/research-init.js`
- `node --check research/maze-search-tests.js`
- `node --check research/archscry-adjacent-navigation-tests.js`
- `node --check assets/js/index.js`
- `node research/maze-search-tests.js`
- `node research/archscry-adjacent-navigation-tests.js`
- `npm.cmd run test:parser`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`

## Human Review

Yes - rerun the Red primary to Witherbloom adjacent Maze path flow and one second adjacent fit to confirm the sidebar follows the active dossier.

## Completion Note

Completed on 2026-05-27. The implementation handoff is `docs/handoffs/2026-05-27-1943-codex-vm151-adjacent-dossier-maze-handoff-refresh.md`.
