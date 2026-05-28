# VM-022 - Maze Core Extraction

ID: VM-022
Title: Maze Core Extraction
Status: in-progress
Type: Enhancement / Architecture
Area: Maze, Scryfall, API
Priority: medium
Created: 2026-05-16

## Summary

Turn Maze's browser-local parsing and translation layer into a reusable query-intelligence core that can serve Vox Mana first, then a public API, and later a GitHub-publishable package.

This card is intentionally a sibling to VM-010 and VM-012, not a rename of either one. The emphasis is on a shared contract for query intent, operator-safe translation, and placement-aware metadata so the Maze UI becomes one consumer of the engine instead of the owner of the semantics.

## Current Slice

The active VM-022 slice is contract lockdown on `feature/vm-022-maze-query-contract`:

- Define `docs/contracts/maze-query-contract.md` before deeper extraction.
- Add a first browser-safe query-core surface without changing fetch/cache/stash/modal behavior.
- Preserve current generated query strings, Scryfall request metadata, rendered result behavior, and Archscry handoff storage semantics.

## Source

- `docs/architecture/project-atlas.md` - current route and runtime map for Maze and Archscry.
- `docs/architecture/data-flow-map.md` - documents current Maze handoff, parser, and discovery data flow.
- `docs/kanban/backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md` - existing Commander Finder and graph/query story.
- `docs/kanban/backlog/VM-012-scryfall-parser-expansion-diagnostics.md` - existing parser expansion and diagnostics story.
- `docs/kanban/backlog/VM-006-archscry-maze-verification-repeat-visit-polish.md` - repeat-visit continuity follow-up.

## Acceptance Criteria

- A shared query contract is defined with request and result shapes such as `MazeQueryRequest`, `MazeQueryResult`, `MazePlacementContext`, and `MazeCommanderContext`.
- The contract accepts plain reading, operator hand, and placement-aware inputs, plus commander and feature-flag context.
- The contract returns normalized query structure, operator-safe translation, plain-reading explanation, confidence, warnings, alternatives, and placement / Commander Compass metadata.
- The existing Maze UI can consume the core contract without changing Archscry return behavior, handoff storage, or Scryfall request caching behavior.
- The core stays dependency-light and browser-safe so it can later back an API wrapper and optional package publishing.

## Non-Goals

- This is not the API implementation itself.
- This is not package publishing work.
- This is not a Maze UI redesign.
- This is not a rewrite of Archscry return flow or Scryfall caching.

## Dependencies / Related Work

- Maze parser and translation helpers.
- Visual Builder query assembly.
- Archscry placement handoff payloads.
- VM-010 and VM-012 should remain distinct backlog stories.

## Files Likely Impacted

- `research/scryfall-parser.js`
- `research/research-builder.js`
- `research/research-mode.js`
- `research/research-init.js`
- `research/research-search.js`

## Risks / Uncertainties

- The current Maze logic is spread across several files, so the contract boundary needs to be chosen carefully.
- A premature API wrapper could lock in the wrong surface before the query core is stable.
- The contract should stay browser-safe even if later consumers are server-side.

## Implementation Prompt

Design Maze as a portable query-intelligence layer first. Define the shared contract, move the current parsing and translation behavior behind it, and keep the API and package work as follow-on layers.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- Maze uses a shared reusable core for query interpretation.
- The contract is stable enough to serve both the site and a future API/package surface.
- The API/package follow-up can proceed without re-deciding the core request and result shapes.

## Human Review

Yes - this is an architecture and product-direction story that should be confirmed before build work.

## Notes

Keep the first pass focused on the shared core contract and the browser-safe translation layer. Do not fold this into VM-010; that story remains focused on Maze mode / graph-query behavior.

