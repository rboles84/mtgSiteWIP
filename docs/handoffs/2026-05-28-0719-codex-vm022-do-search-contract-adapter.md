# 2026-05-28 07:19 - Codex - VM-022 Do Search Contract Adapter

## Agent Name

Codex

## Task Requested

Implement the next VM-022 slice by making Maze's primary `doSearch()` path consume `resolveMazeQueryRequest()` while preserving current route-owned fetch, modal, stash, rendering, boot, and Archscry handoff behavior.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2117-codex-vm022-query-contract-lockdown.md`
- `docs/handoffs/2026-05-27-2143-codex-vm022-vm145-vm153-merge-bundle.md`
- `docs/handoffs/2026-05-27-2208-codex-vm146-cdn-font-review.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-022-maze-core-extraction.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/method-reference.md`
- `research/maze-query-core.js`
- `research/research-init.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `research/research-search.js`
- `research/research-ui.js`

## Files Changed

- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/kanban/in-progress/VM-022-maze-core-extraction.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/method-reference.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-0719-codex-vm022-do-search-contract-adapter.md`

## What Changed

- Updated `doSearch()` to build a `MazeQueryRequest` from route state and consume `resolveMazeQueryRequest()` for plain-reading, raw, exact-name, and builder resolution.
- Kept Scryfall search execution in `triggerSearch()` and exact-name execution in the route-owned `scryfallExact()` modal path.
- Preserved the temporary `adapterDiagnostics` bridge so Query Inspector continues to read the legacy parser diagnostic shape.
- Let `triggerSearch()` accept contract API metadata while preserving route-owned search state updates.
- Added Maze DOM coverage for raw standalone `AND` normalization, exact-name `/cards/named` modal flow, builder query execution, and existing format-filter no-duplication behavior.
- Added missing fake-DOM `createTextNode()` and `requestAnimationFrame()` support needed to exercise the exact-name modal path.

## Why It Changed

The VM-022 contract gate was already complete. This slice moves the primary Maze search adapter to that contract without changing the contract shape or pulling route-owned UI/fetch behavior into the core.

## Decisions Made

- Kept `runQuickSearch()`, path sidebar clicks, sort changes, load-more, and Query Inspector alternatives on their existing adapter paths for this slice.
- Preserved current builder Query Inspector behavior by not surfacing the core's builder reason as a new visible panel.
- Treated the VM-146 direct-route-vs-shared-shell dependency-review check as already satisfied context from VM-146, not as Maze adapter test work.
- Kept VM-022 `in-progress` because deeper extraction remains.

## Risks / Uncertainties

- `adapterDiagnostics` remains an intentional bridge; a later slice should move Query Inspector toward `MazeDiagnostic[]` after adapter behavior is stable.
- `research-init.js` still owns substantial route state and side effects, so future slices should keep extracting gradually.
- Exact-name modal coverage now exercises more fake DOM than before; future modal changes may require harness updates.

## Tests Run

Baseline before edits:

- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed.
- `node research/maze-search-tests.js` - passed.

Final verification:

- `node --check research/research-init.js` - passed.
- `node --check research/maze-query-core.js` - passed.
- `node --check research/maze-search-tests.js` - passed.
- `node research/maze-query-contract-tests.js` - passed.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `node research/maze-search-tests.js` - passed.
- `npm.cmd run lint:js` - passed.

## Not Touched

- No Scryfall cache, in-flight dedupe, or fetch implementation changes.
- No stash key/export shape or modal semantics changes.
- No Archscry handoff storage key or return-banner behavior changes.
- No generated data, route styling, VM-010 Loom graph work, or dependency-review implementation.
- No VM-022 public API/package work.

## Follow-Up Recommendations

- Next VM-022 slice should decide whether `runQuickSearch()` and path sidebar execution should also build contract requests or remain legacy adapter shortcuts.
- Plan a separate Query Inspector slice to consume `MazeDiagnostic[]` directly and retire `adapterDiagnostics`.
- Keep exact-name and dossier/path flows in the regression floor for every VM-022 adapter slice.

## Next Suggested Agent

Implementation Architect for the next VM-022 adapter slice, then Test Strategist for Query Inspector diagnostic migration.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-022-maze-core-extraction.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/handoffs/2026-05-27-2117-codex-vm022-query-contract-lockdown.md`
