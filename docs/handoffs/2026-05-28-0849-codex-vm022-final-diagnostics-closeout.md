# Codex Handoff - VM-022 Final Diagnostics Closeout

## Agent Name

Codex

## Task Requested

Complete the final VM-022 slice by migrating Maze Query Inspector rendering from the temporary legacy diagnostics bridge to contract-owned `MazeDiagnostic[]`, then close VM-022 if the explicit contract/audit gate passes.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-0750-codex-vm022-prebuilt-search-contract-adapter.md`
- `docs/kanban/done/VM-022-maze-core-extraction.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/method-reference.md`
- `research/research-init.js`
- `research/research-ui.js`
- `research/maze-query-core.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`

## Files Changed

- `research/maze-query-core.js`
- `research/research-init.js`
- `research/research-ui.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/method-reference.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-022-maze-core-extraction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-0849-codex-vm022-final-diagnostics-closeout.md`

## What Changed

- Expanded core diagnostics so parser/raw confidence, recognized terms, assumptions, warnings, unresolved terms, and alternatives are represented in `MazeDiagnostic[]`.
- Removed the temporary `adapterDiagnostics` result field from the VM-022 runtime contract surface.
- Updated the Maze route adapter to pass `queryResult.diagnostics` into Query Inspector rendering.
- Updated Query Inspector rendering to group and display `MazeDiagnostic[]` while keeping labels, button markup, and presentation in the UI layer.
- Preserved alternative-query execution through `runQuickSearch()` with query/order/unique/dir metadata.
- Closed VM-022 by moving the card from in-progress to done, updating the board, and refreshing contract/architecture/reference docs.

## Why It Changed

All Maze runtime search entrypoints now consume `MazeQueryRequest`. The remaining VM-022 cleanup was to remove the temporary parser-result bridge so the contract owns structured diagnostics and the UI only owns rendering.

## Decisions Made

- Kept diagnostic display labels and alternative button markup out of `maze-query-core.js`.
- Used existing `MazeDiagnostic` fields and documented optional `details` shapes instead of adding new top-level diagnostic fields.
- Preserved `parserResult` as an internal local variable name inside `maze-query-core.js` only; it is no longer the Query Inspector bridge.
- Kept sort and load-more adapter-owned.

## Closeout Gate Evidence

- `docs/contracts/maze-query-contract.md` exists and reflects the final diagnostic code/detail shapes.
- The field-to-code mapping table remains complete for VM-022 request/result/path/source fields.
- The contract test matrix includes the Query Inspector diagnostics path.
- Exact-name behavior remains represented and tested through `parserMode: "exact_name"`.
- `MazeQueryResult.query` remains the only executable core query; `plainReadingQuery` remains display/trace metadata.
- Manual runtime-entrypoint audit confirmed `doSearch()`, `runQuickSearch()`, Query Inspector alternatives, Archscry launch, URL `?q=` launch, and path/sidebar clicks consume `MazeQueryRequest`.
- Sort and load-more remain adapter-owned by design.
- `maze-query-core.js` has no DOM, fetch, storage, modal, render, event, route-state, sort, load-more, sidebar, or return-banner references.

## Tests Run

- `node --check research/research-init.js`
- `node --check research/maze-query-core.js`
- `node --check research/maze-search-tests.js`
- `node research/maze-query-contract-tests.js`
- `node research/maze-search-tests.js`
- `npm.cmd test`
- `npm.cmd run test:parser`
- `npm.cmd run lint:js`
- `git diff --check`

## Not Touched

- Scryfall fetch/cache/dedupe behavior.
- Exact-name modal behavior.
- Stash/storage write behavior.
- Sort/load-more behavior.
- Sidebar and return-banner rendering behavior.
- Unrelated Maze UI cleanup.

## Follow-Up Recommendations

- Future VM-010 or package/API work can build on the stable VM-022 contract without re-deciding the request/result shapes.
- If future diagnostics need new top-level fields, update `docs/contracts/maze-query-contract.md` in the same slice that introduces them.

## Next Suggested Agent

Planning Architect for any future VM-010 Loom graph-query layer or API/package follow-up.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-022-maze-core-extraction.md`
- `docs/contracts/maze-query-contract.md`
- `docs/handoffs/2026-05-28-0719-codex-vm022-do-search-contract-adapter.md`
- `docs/handoffs/2026-05-28-0750-codex-vm022-prebuilt-search-contract-adapter.md`
