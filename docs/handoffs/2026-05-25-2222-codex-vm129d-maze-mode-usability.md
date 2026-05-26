# 2026-05-25 22:22 - Codex - VM-129D Maze Mode Usability

## Agent Name

Codex

## Task Requested

Implement the Maze Mode Separation and Console Usability Pass on top of the VM-129C `/maze/` baseline.

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent Maze handoffs for VM-129, VM-129B, and VM-129C
- `docs/kanban/board.md`
- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/research-ui.js`
- `research/maze-search-tests.js`
- `research/research-search.js`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/research-ui.js`
- `research/maze-search-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-129D-maze-mode-separation-console-usability-pass.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2222-codex-vm129d-maze-mode-usability.md`

## What Changed

- Added mode-specific command-deck context and click-triggered help content for Plain Reading, Operator's Hand, and The Loom.
- Made the Query Inspector mode-aware so raw searches use compact syntax metadata when no normalization changed the query, Plain Reading shows the original phrase plus translation, and Builder treats the inspector as secondary metadata.
- Reworked Builder mode into a fuller-width board with a dedicated `builder-reset-btn`.
- Changed Clear behavior to preserve the active mode, while Builder Clear keeps current filters and Reset Board restores default Builder state.
- Applied Commander format defaults only through fresh/default format controls and preserved explicit `f:` or `format:` query tokens.
- Reordered search path panels and made Helper Searches a collapsed native disclosure.
- Moved the deck scratchpad into a mounted off-canvas drawer with `stash-drawer-toggle`, leaving stash rendering pointed at `stash-count` and `stash-body`.
- Fixed `Load More` so already-fetched local pages append before a Scryfall `next_page` fetch, with loading/error recovery.
- Lightened Maze panel glass so the rich atmosphere remains visible through the UI.
- Expanded `research/maze-search-tests.js` for the new mode/default/inspector/pagination behavior.

## Why It Changed

The VM-129C shell aligned the atmosphere, but the modes still felt too similar, the inspector duplicated the input, the scratchpad consumed/overlapped layout space, and Load More could no-op when more locally fetched results were available.

## Decisions Made

- Kept one shared `search-input` and existing `ai`, `raw`, and `builder` mode IDs.
- Kept Builder Clear as a results/inspector clear, and added Reset Board for filter clearing.
- Kept `stash-panel` mounted and avoided `display:none` so existing stash rendering remains stable.
- Used native `<details>/<summary>` for Helper Searches and native `popover` with a fallback class path for search help.
- Kept `/maze/` as the only active route; no `/maze.html` shell was created.

## Risks / Uncertainties

- In-app browser screenshot capture timed out even though DOM and interaction checks completed.
- Full mobile visual screenshot verification was not captured in-tool; mobile behavior is covered by CSS breakpoints, HTML lint, frontend smoke, and manual-test documentation.
- The repository had pre-existing dirty Archscry/VM-130/VM-131 and VM-129C files before this pass; those were not reverted.

## Tests Run

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser checks on `http://127.0.0.1:4173/maze/` for atmosphere canvas sizing, helper collapse, mode switching, help popover, Builder reset, stash drawer open/close, raw search, Query Inspector actions, Load More append, stash add/export/clear, modal Commander stash, Archscry return URL, and query URL.

## Not Touched

- No parser architecture rewrite.
- No Scryfall search engine rewrite.
- No stash storage key or export format change.
- No Archscry scoring/handoff rewrite.
- No `/maze.html` recreation or route migration.
- No Apocrypha/Strategium normalization.

## Follow-Up Recommendations

- Run a normal-browser/devtools mobile visual check and capture screenshots if release notes need images.
- Consider a future dedicated visual regression harness for Maze once the current VM-129 series stabilizes.
- If site-wide typography convergence is still desired, handle it as a separate route-family design token decision.

## Next Suggested Agent

Test Strategist or visual QA reviewer.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-129D-maze-mode-separation-console-usability-pass.md`
- `docs/reference/manual-test-cases.md`
- VM-129, VM-129B, VM-129C
