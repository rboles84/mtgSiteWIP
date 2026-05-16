# Agent Handoff: Codex - VM-021B Cache Scryfall Replies and Parser Seed

Date: 2026-05-16 13:30
Related Card: VM-021B
Related Plan: User follow-up on repeat Scryfall fetches
Status: Complete

## Agent Name

Codex

## Task Requested

Cache the parser seed and Scryfall card/search replies so Maze and Archscry stop refetching the same data on each page load when cached data is already available.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1325-codex-vm021b-maze-return-anchor-only-on-maze-return-not-other-placement-actions.md`
- `docs/kanban/board.md`
- `research/research-search.js`
- `research/scryfall-dictionary.js`
- `research/research-init.js`
- `assets/js/index.js`

## Files Changed

- `research/research-search.js`
- `research/scryfall-dictionary.js`
- `assets/js/index.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1330-codex-vm021b-cache-scryfall-replies-and-parser-seed.md`

## What Changed

- Added a localStorage-backed cache for Scryfall search responses.
- Added a localStorage-backed cache for Scryfall named-card responses used by Archscry card art.
- Added a localStorage-backed cache for the loaded parser dictionary.
- Normalized the parser seed URL so the Maze page uses the checked-in seed path instead of a page-relative path that resolves under `/maze/`.

## Why It Changed

The Maze page was repeatedly refetching the parser seed and Scryfall data on each load, and the Archscry return path was making the same named-card lookups over and over. Caching the first successful reply keeps the experience quieter and reduces repeated network pressure.

## Decisions Made

- Cached only successful responses.
- Left random Scryfall requests uncached.
- Kept the cache small and browser-local rather than introducing a new backend store.

## Risks / Uncertainties

- Cached Scryfall data can go stale until the browser storage is cleared.
- No browser QA on the cache behavior was run in this turn.

## Tests Run

- `node --check assets/js/index.js` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with existing LF/CRLF warnings in unrelated files.

## Not Touched

- No routing changes.
- No scoring changes.
- No Maze UX redesign.
- No MTGDecks link changes.
- No QR work.

## Follow-Up Recommendations

- Browser-check a fresh Maze load and a Maze return to confirm the cached parser seed prevents the 404 chatter.

## Next Suggested Agent

Test Strategist

## Related Kanban Card, Docs, or Plans

- `docs/kanban/backlog/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-16-1325-codex-vm021b-maze-return-anchor-only-on-maze-return-not-other-placement-actions.md`
