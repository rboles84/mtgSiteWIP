# 2026-05-25 23:28 - Codex - VM-129G Maze Help Removal And Loom Clear

## Agent Name

Codex

## Task Requested

Fix or remove the broken Maze `?` search help popover, and make the Loom Clear button clear the generated search field like Reset board.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2307-codex-vm129f-maze-textarea-inspector-space.md`
- `docs/kanban/board.md`
- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-129G-maze-help-removal-loom-clear-reset.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2328-codex-vm129g-maze-help-removal-loom-clear.md`

## What Changed

- Removed the non-protected `mode-help-btn` and `mode-help-popover` markup from the Maze command deck.
- Removed the route-local help popover CSS and click/Escape/outside-click wiring.
- Simplified mode content to the visible context label/copy already present in the command deck.
- Changed Builder-mode Clear to call `resetBuilderFilters()`, matching Reset board behavior.
- Updated Maze tests and manual QA notes for the removed help button and Builder clear reset behavior.

## Why It Changed

The help popover was redundant with the mode cards/context copy and was failing visually by opening behind the results/return banner. Removing it eliminates the fragile overlay and keeps the command deck focused on search actions.

## Decisions Made

- Removal was chosen over another z-index/popover fix because the user explicitly accepted remove-or-fix and the help content was not critical workflow UI.
- Clear in Builder now means reset the Loom board, not preserve filters.

## Risks / Uncertainties

- Any old QA step expecting the `?` help control should be considered stale.
- The broader worktree still contains unrelated active changes from other route work; this handoff only covers the Maze help/Clear delta.

## Tests Run

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser check on `http://127.0.0.1:4174/maze/` confirmed the help button/popover are absent and Builder Clear resets back to `f:commander`.

## Not Touched

- Scryfall parser/search logic
- Query Inspector translation behavior
- Stash key/export behavior
- Archscry handoff key and return banner
- `/maze/` routing and `/maze/?q=...`

## Follow-Up Recommendations

- None for the removed help control. If guidance is needed later, prefer inline mode context copy rather than a floating popover.

## Next Suggested Agent

Test Strategist only if this is bundled into a larger VM-129 release sweep.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-129G-maze-help-removal-loom-clear-reset.md`
- `docs/reference/manual-test-cases.md`
