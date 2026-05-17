# Agent Handoff: Codex - VM-012 Shared Maze Query Handoff Helper

Date: 2026-05-17 00:43
Related Card: VM-012
Related Plan: Shared reading-to-query mapping helper for Archscry and Maze
Status: Complete

## Agent Name

Codex

## Task Requested

Proceed with the shared reading-to-query mapping helper for Archscry and Maze after restoring the baseline test suite.

## Files Reviewed

- `assets/js/index.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/run-tests.js`
- `docs/architecture/data-flow-map.md`
- `docs/kanban/backlog/VM-022-maze-core-extraction.md`

## Files Changed

- `assets/js/maze-handoff.js`
- `assets/js/index.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-0043-codex-vm012-shared-maze-query-handoff-helper.md`

## What Changed

- Added a shared pure helper module for Maze/Archscry handoff path normalization:
  - operator query resolution from link or URL params
  - stable path-type derivation from labels
  - fallback plain-reading label construction
  - Maze search link creation
  - Maze launch state resolution from URL params and existing handoff data
- Updated Archscry link metadata to use the shared helper for query/path normalization.
- Updated Maze initialization to use the shared helper for launch-state resolution from Archscry-originated URLs.
- Added regression tests for the shared helper functions in `research/maze-search-tests.js`.

## Why It Changed

The reading-to-query mapping behavior was split across Maze and Archscry. Pulling the path/query normalization into one pure helper keeps the handoff contract consistent and gives both surfaces the same canonical behavior.

## Decisions Made

- Kept the shared helper focused on handoff/query-path normalization instead of moving the entire Archscry dossier builder.
- Left the rest of the parser, dictionary, cache, and routing behavior untouched.
- Used a small browser-safe module so both Maze and Archscry can consume the same logic without a new build step.

## Risks / Uncertainties

- The shared helper is intentionally narrow; if more of the reading interpretation layer needs to be shared later, the contract may grow.
- The helper currently normalizes link and launch metadata, not the full natural-language parser.

## Tests Run

- `node --check assets/js/maze-handoff.js` - passed.
- `node --check assets/js/index.js` - passed.
- `node --check research/research-init.js` - passed.
- `node --check research/maze-search-tests.js` - passed.
- `npm.cmd test` - passed.

## Not Touched

- No parser behavior changes.
- No Scryfall dictionary changes in this slice.
- No Maze routing changes.
- No cache/dedupe changes.
- No Archscry result-layout changes.

## Follow-Up Recommendations

- If VM-022 advances, reuse this helper as the first contract boundary for the shared query-intelligence core.

## Next Suggested Agent

Planning Architect

## Related Kanban Card, Docs, or Plans

- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-022-maze-core-extraction.md`
- `docs/architecture/data-flow-map.md`
