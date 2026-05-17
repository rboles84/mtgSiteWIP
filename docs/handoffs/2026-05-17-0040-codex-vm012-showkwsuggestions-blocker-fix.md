# Agent Handoff: Codex - VM-012 showKwSuggestions Blocker Fix

Date: 2026-05-17 00:40
Related Card: VM-012
Related Plan: Restore baseline test suite before shared query-mapping work
Status: Complete

## Agent Name

Codex

## Task Requested

Resolve the unrelated `showKwSuggestions is not defined` blocker in `research/research-init.js` so `npm test` passes again without changing parser behavior, dictionary behavior, Maze routing, cache/dedupe, or Archscry behavior.

## Files Reviewed

- `research/research-init.js`
- `research/run-tests.js`
- `research/maze-search-tests.js`
- `docs/reference/method-reference.md`
- `maze/index.html`

## Files Changed

- `research/research-init.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-0040-codex-vm012-showkwsuggestions-blocker-fix.md`

## What Changed

- Restored a missing `showKwSuggestions(value)` window handler in `research-init.js`.
- The handler now filters the existing `KEYWORDS` list, renders matching suggestions into `#kw-suggestions`, and hides the dropdown when input is empty or no matches exist.
- Re-exposed the handler through `exposeWindowHandlers()` so the inline Maze input attribute can call it again.

## Why It Changed

`maze/index.html` still calls `showKwSuggestions(this.value)` from the keyword input, but the function had been removed from module scope. That caused `npm test` to fail while importing `research-init.js`, blocking all shared query-mapping work until the baseline suite was healthy again.

## Decisions Made

- Chose the smallest compatibility restoration possible rather than a broader builder refactor.
- Kept behavior local to the existing keyword autocomplete UI and did not touch parser or dictionary logic.
- Did not alter Maze routing, cache/dedupe behavior, or Archscry behavior.

## Risks / Uncertainties

- The autocomplete behavior is a compatibility shim, so if the old suggestion ranking had more nuance, it may need future polish.
- The handler uses the existing keyword list and a straightforward substring match, which should be sufficient for the current UI but could be refined later.

## Tests Run

- `node --check research/research-init.js` - passed.
- `npm.cmd test` - passed.

## Not Touched

- No parser behavior changes.
- No Scryfall dictionary behavior changes.
- No Maze routing changes.
- No cache/dedupe changes.
- No Archscry behavior changes.
- No broader shared query-mapping refactor started.

## Follow-Up Recommendations

- Proceed with the shared reading-to-query mapping helper for Archscry and Maze now that the baseline suite is green.

## Next Suggested Agent

Planning Architect

## Related Kanban Card, Docs, or Plans

- `docs/kanban/board.md`
- `docs/handoffs/2026-05-17-0021-codex-scryfall-dictionary-robustness-expansion.md`
