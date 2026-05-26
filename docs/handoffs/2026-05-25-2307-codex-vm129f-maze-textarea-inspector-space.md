# 2026-05-25 23:07 - Codex - VM-129F Maze Textarea Inspector Space

## Agent Name

Codex

## Task Requested

Implement the Maze Search Input and Inspector Space Pass on the current VM-129E `/maze/` baseline.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2240-codex-vm129e-maze-micro-polish.md`
- `docs/kanban/board.md`
- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/research-ui.js`
- `research/maze-search-tests.js`

## Files Changed

- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/research-ui.js`
- `research/maze-search-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-129F-maze-textarea-inspector-space-pass.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2307-codex-vm129f-maze-textarea-inspector-space.md`

## What Changed

- Replaced the protected `#search-input` with a real two-row textarea while preserving the id, class, placeholders, mode behavior, and existing search wiring.
- Added search-row Copy and Open in Scryfall actions so universal query actions are available even when Query Inspector is hidden.
- Normalized textarea newlines to spaces before Scryfall parser/raw search execution.
- Changed the Enter behavior so Enter searches in Plain Reading and Operator's Hand while Shift+Enter remains available for textarea line breaks.
- Made Query Inspector conditional: Plain Reading still shows the translation bridge, unchanged raw syntax hides redundant inspector chrome, and normal Loom searches rely on the builder output instead of duplicating syntax.
- Fixed compact pill/button sizing rules so labels and query actions wrap instead of clipping.
- Balanced the Loom command header into two desktop columns with the builder board below.
- Updated focused Maze tests and manual acceptance notes.

## Why It Changed

The prior command deck still behaved visually like a one-line console and repeated the same syntax in both the input and Query Inspector. This pass gives long search strings room, keeps universal query actions close to the search box, and reserves inspector space for moments where it actually explains translation or normalization.

## Decisions Made

- Copy now targets the active generated/searched query when one exists, including Plain Reading searches.
- Query Inspector remains mounted with protected ids, but redundant raw/Loom states hide the panel.
- The existing parser, stash, modal, pagination, Archscry handoff, and route contracts were left intact.

## Risks / Uncertainties

- The worktree contains unrelated active route changes; visual QA should be interpreted as this focused Maze delta only.
- Native textarea resizing is enabled intentionally, but very aggressive manual resizing can still change the command deck height.

## Tests Run

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`

## Not Touched

- Scryfall parser grammar and search API module internals
- Stash storage key/export format
- Archscry handoff key and return banner contracts
- `/maze/` routing and `/maze/?q=...`
- Apocrypha, Strategium, and homepage visuals

## Follow-Up Recommendations

- Complete the full lint/frontend-smoke/browser verification after concurrent Archscry work settles or before committing the VM-129 series together.
- Consider an autosize textarea enhancement later if user testing says manual vertical resize feels too mechanical.

## Next Suggested Agent

Test Strategist for full regression/browser validation if this is bundled with the other open VM-129 changes.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-129F-maze-textarea-inspector-space-pass.md`
- `docs/reference/manual-test-cases.md`
