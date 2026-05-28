# 2026-05-27 21:17 - Codex - VM-022 Query Contract Lockdown

## Agent Name

Codex

## Task Requested

Create `feature/vm-022-maze-query-contract`, lock down the VM-022 Maze query contract, add the contract mapping/test matrix, and begin the first browser-safe query-core extraction without changing query strings, Scryfall request metadata, rendered result behavior, stash behavior, modal behavior, or Archscry handoff storage semantics.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1637-codex-vm022-maze-core-extraction.md`
- `docs/handoffs/2026-05-27-0814-codex-vm012-parser-diagnostics-closeout.md`
- `docs/handoffs/2026-05-27-0837-codex-vm012-maze-cache-boot-repair.md`
- `docs/handoffs/2026-05-27-1022-codex-vm150-dossier-maze-path-differentiation.md`
- `docs/handoffs/2026-05-27-1943-codex-vm151-adjacent-dossier-maze-handoff-refresh.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-022-maze-core-extraction.md`
- `docs/kanban/backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md`
- `docs/kanban/backlog/VM-006-archscry-maze-verification-repeat-visit-polish.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `docs/reference/method-reference.md`
- `research/research-init.js`
- `research/research-builder.js`
- `research/scryfall-parser.js`
- `assets/js/maze-handoff.js`
- `research/maze-search-tests.js`
- `research/run-tests.js`

## Files Changed

- `docs/contracts/maze-query-contract.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-022-maze-core-extraction.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `docs/reference/method-reference.md`
- `research/maze-query-core.js`
- `research/maze-query-contract-tests.js`
- `research/research-init.js`
- `research/run-tests.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2117-codex-vm022-query-contract-lockdown.md`

## What Changed

- Created branch `feature/vm-022-maze-query-contract`.
- Moved VM-022 from backlog to in-progress and recorded the active contract-lockdown slice on the card.
- Added `docs/contracts/maze-query-contract.md` with purpose/scope, non-goals, ownership boundary, request/result/path-entry shapes, builder filter inventory, placement context inventory, launch/source rules, exact-name behavior, executable-query rules, field-to-code mapping, and contract test matrix.
- Added `research/maze-query-core.js` as the first reusable VM-022 core surface for request/result normalization, raw syntax normalization, format application, source-context normalization, path-entry wrapping, and Maze API metadata normalization.
- Updated `research/research-init.js` to consume raw syntax normalization and format application from the shared core while leaving route DOM, storage, fetch, stash, modal, and boot behavior in the adapter.
- Added `research/maze-query-contract-tests.js` and wired it into `npm test`.
- Updated architecture/reference docs to point at the new contract and core.

## Why It Changed

VM-022 needed a concrete contract before broader extraction. The new document and tests make the separation explicit: `mode` is search behavior, `origin` is launch/source, `parserMode` is parser classification, and `query` is the only executable Scryfall query returned by the core.

## Decisions Made

- Kept `mode` limited to `ai`, `raw`, and `builder`; `path` remains an `origin`, not a mode.
- Represented exact-name behavior as `parserMode: "exact_name"` with `/cards/named` API metadata.
- Treated the four dossier path types from `buildDossierMazePathEntries()` as the v1 enum.
- Preserved parser-owned default Plain Reading API metadata: `endpoint: "/cards/search"`, `unique: "cards"`, and `order: "name"`.
- Left Scryfall fetch execution, caching/dedupe, modal behavior, stash behavior, and handoff storage outside the core.

## Risks / Uncertainties

- `research/maze-query-core.js` includes an adapter-only `adapterDiagnostics` bridge while Query Inspector still consumes the legacy parser-result shape; that is documented as non-contractual.
- Broader VM-022 extraction should continue gradually so `research-init.js` remains a route adapter rather than a second semantic owner.
- Unrelated working-tree changes appeared after the initial clean status, including legal page/CSS work and a VM-145 card move; they were not touched by this task.

## Tests Run

- `node --check research/maze-query-core.js` - passed.
- `node --check research/maze-query-contract-tests.js` - passed.
- `node --check research/research-init.js` - passed.
- `node research/maze-query-contract-tests.js` - passed.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `node research/maze-search-tests.js` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.

## Not Touched

- No Scryfall request execution, caching, or in-flight dedupe behavior changed.
- No stash key, stash export shape, modal behavior, or result rendering behavior changed.
- No Archscry handoff storage key or storage semantics changed.
- No Maze visual redesign, new route, or VM-010 Loom graph work.
- No generated data or Scryfall bulk/download artifacts.
- Did not revert or modify unrelated legal page, VM-145, route-ownership, or validation-script changes present in the working tree.

## Follow-Up Recommendations

- Next VM-022 slice should make `doSearch()` consume `resolveMazeQueryRequest()` more directly, while preserving the existing Query Inspector adapter.
- Consider a later Query Inspector update that reads `MazeDiagnostic[]` directly once the legacy parser-result bridge is no longer needed.
- Keep all future path recipe changes inside the shared handoff/core boundary so Archscry and Maze remain aligned.

## Next Suggested Agent

Implementation Architect, then Test Strategist for the next extraction slice.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-022-maze-core-extraction.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
