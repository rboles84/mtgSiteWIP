# Agent Handoff: Codex - VM-021C Add In-Flight Request Dedupe for Scryfall Calls

Date: 2026-05-16 13:45
Related Card: VM-021C
Related Plan: User request for same-burst request dedupe after VM-021B cache work
Status: Complete

## Agent Name

Codex

## Task Requested

Add in-flight promise dedupe so same-burst Scryfall search, exact-card, and Archscry named-card lookups share a single network request while preserving the VM-021B localStorage caching behavior.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1330-codex-vm021b-cache-scryfall-replies-and-parser-seed.md`
- `docs/kanban/board.md`
- `research/research-search.js`
- `research/scryfall-dictionary.js`
- `assets/js/index.js`
- `research/run-tests.js`
- `research/maze-search-tests.js`

## Files Changed

- `research/research-search.js`
- `assets/js/index.js`
- `research/scryfall-request-dedupe-tests.js`
- `research/run-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-021C-add-in-flight-request-dedupe-for-scryfall-calls.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1345-codex-vm021c-add-in-flight-request-dedupe-for-scryfall-calls.md`

## What Changed

- Added in-flight dedupe maps for `scryfallSearch` and `scryfallExact` in `research/research-search.js`.
- Added an in-flight dedupe map and exported named-card loader helper in `assets/js/index.js`.
- Kept the existing localStorage caches intact and checked before in-flight reuse.
- Added a focused smoke test file covering same-burst dedupe, cache reuse after success, and retry after failure.
- Updated the kanban board and added a VM-021C backlog card.

## Why It Changed

VM-021B removed repeated page-load refetches with localStorage caching, but same-burst duplicate requests could still race each other. This patch collapses those duplicate in-flight calls without changing the already-validated cache behavior.

## Decisions Made

- Kept the dedupe local to the request helpers rather than adding a broader shared network layer.
- Did not touch Maze return flow, parser seed path fixes, MTGDecks routing, or UI layout.
- Limited caching to successful responses only.

## Risks / Uncertainties

- The named-card loader is still sequential in normal rendering, so the dedupe mainly protects repeated same-name bursts across overlapping renders.
- Cached Scryfall data can still go stale until browser storage is cleared.

## Tests Run

- `node --check assets/js/index.js` - passed.
- `node --check research/research-search.js` - passed.
- `node --check research/scryfall-dictionary.js` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with existing LF/CRLF warnings in unrelated files.
- Focused smoke probe for same-burst dedupe, cache reuse after success, and retry after failure - passed.

## Not Touched

- Maze return flow.
- Maze Discovery Paths anchor behavior.
- Parser seed path fix.
- MTGDecks logic.
- Archscry scoring and layout.
- VM-021B cache behavior beyond preserving it.

## Follow-Up Recommendations

- Browser-check a repeated Maze query and an Archscry return once more if you want a manual confidence pass, but the unit/smoke coverage now catches the burst-dedupe layer.

## Next Suggested Agent

Test Strategist

## Related Kanban Card, Docs, or Plans

- `docs/kanban/backlog/VM-021C-add-in-flight-request-dedupe-for-scryfall-calls.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-16-1330-codex-vm021b-cache-scryfall-replies-and-parser-seed.md`
