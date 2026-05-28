# Codex Handoff - VM-022 Prebuilt Search Contract Adapter

## Agent Name

Codex

## Task Requested

Finish the next VM-022 slice by moving Maze quick search and route-seeded/prebuilt searches into the `MazeQueryRequest` contract flow while preserving the adapter boundary and keeping VM-022 in progress.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-0719-codex-vm022-do-search-contract-adapter.md`
- `docs/kanban/in-progress/VM-022-maze-core-extraction.md`
- `docs/contracts/maze-query-contract.md`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/maze-query-core.js`
- `assets/js/maze-handoff.js`

## Files Changed

- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/method-reference.md`
- `docs/kanban/in-progress/VM-022-maze-core-extraction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-0750-codex-vm022-prebuilt-search-contract-adapter.md`

## What Changed

- Added an adapter-local `resolveMazeRouteQuery()` helper in `research/research-init.js` that builds and resolves a `MazeQueryRequest` without executing fetches, rendering UI, mutating storage, or owning route side effects.
- Routed `doSearch()`, `runQuickSearch()`, Query Inspector alternatives, Archscry operator-query launches, and URL-seeded raw launches through the local contract helper.
- Added explicit quick-search origins in button datasets: normal quick/discovery/color/recent/modal quick searches use `origin: "maze"` and reading-path buttons use `origin: "path"`.
- Preserved route ownership for Scryfall fetch/cache/dedupe, exact-name modal display, stash, DOM rendering, route boot, local/session storage, sort changes, load-more, return banner behavior, and sidebar rendering.
- Expanded Maze regression coverage for Archscry launch execution, quick-search origin tagging, format no-duplication, explicit format preservation, stale format carryover, no builder filter leakage into quick search, and path Plain Reading preservation.
- Updated VM-022 architecture and method docs to record that quick and route-seeded searches now consume the contract through the adapter.

## Why It Changed

VM-022 is progressively moving Maze search intent resolution behind the documented query contract. This slice reduces drift between primary search, quick search, Query Inspector alternatives, and route-seeded launches without prematurely moving product behavior into `maze-query-core.js`.

## Decisions Made

- Kept the request-construction helper inside `research/research-init.js` so route state stays route-local.
- Kept `mode` limited to Maze search mode and represented launch/source separately through `origin`.
- Kept `builderFilters` out of quick and route-seeded raw requests.
- Preserved Query Inspector bridge metadata instead of migrating rendering to `MazeDiagnostic[]`.
- Left sort and load-more as adapter-owned paths.

## Risks / Uncertainties

- Dossier-specific `origin: "dossier"` is supported by the contract plan but no distinct current runtime caller was found beyond path/sidebar recommendation buttons; this pass uses `origin: "path"` for current reading-path clicks.
- Query Inspector still uses the adapter bridge; a later diagnostics slice should only start after all Maze entrypoints consume the contract.
- Archscry launches now resolve through the core before execution, so future changes to raw normalization should keep launch behavior covered by contract and route tests.

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

- `research/maze-query-core.js` behavior
- Scryfall fetch/cache/dedupe implementation
- Exact-card modal rendering
- Stash/localStorage write behavior
- Archscry handoff storage key and semantics
- Query Inspector diagnostics migration
- Sort and load-more ownership

## Follow-Up Recommendations

- Inventory any future dossier-specific launch caller and assign `origin: "dossier"` only when that caller is explicit in runtime behavior.
- After all Maze entrypoints consume `MazeQueryRequest`, open the separate Query Inspector diagnostics slice to consume `MazeDiagnostic[]` directly and retire the temporary bridge.
- Keep VM-022 in progress until deeper extraction work is complete.

## Next Suggested Agent

Codex implementation agent for the next VM-022 route entrypoint or Query Inspector diagnostics slice, depending on whether any legacy search entrypoints remain.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-022-maze-core-extraction.md`
- `docs/contracts/maze-query-contract.md`
- `docs/handoffs/2026-05-28-0719-codex-vm022-do-search-contract-adapter.md`
