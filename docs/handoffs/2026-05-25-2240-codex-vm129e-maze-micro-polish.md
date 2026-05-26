# 2026-05-25 22:40 - Codex - VM-129E Maze Micro Polish

## Agent Name

Codex

## Task Requested

Implement the Maze Micro-Polish plan: clearer glass, matching sidebar disclosure toggles for Recent Searches and By Color, and reliable JS-controlled mode help.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2222-codex-vm129d-maze-mode-usability.md`
- `docs/kanban/board.md`
- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-129E-maze-glass-sidebar-help-micro-polish.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2240-codex-vm129e-maze-micro-polish.md`

## What Changed

- Reduced major Maze panel opacity and blur so the rich background reads through more clearly.
- Replaced `mode-help-btn` native popover wiring with explicit JS state using `.is-open`, `aria-expanded`, and `body[data-help-open]`.
- Removed `popovertarget` and `popover` attributes from the help markup while preserving `mode-help-btn` and `mode-help-popover`.
- Converted `Recent Searches` and `By Color` to native disclosure sections with the same plus/minus summary styling as Helper Searches.
- Made Recent Searches open automatically when populated while staying hidden when empty.
- Added regression assertions for help wiring and sidebar disclosure markup/behavior.

## Why It Changed

The VM-129D help surface still depended on native popover behavior and was not opening reliably for the user. The panels also still read too frosted, and the sidebar needed consistent disclosure controls.

## Decisions Made

- Kept this as a polish pass, not a redesign.
- Kept all protected Maze IDs and `/maze/` routing intact.
- Used JS-controlled help rather than native popover for predictable behavior.
- Defaulted By Color collapsed and Recent Searches open once populated.

## Risks / Uncertainties

- Visual opacity is taste-sensitive; this pass chooses a modest decrease rather than making panels near-invisible.
- Browser interaction checks passed, but no screenshot artifact was captured for this micro-pass.

## Tests Run

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser checks on `http://127.0.0.1:4173/maze/` for panel opacity/backdrop values, click-open help, Escape/outside close, Recent auto-open, By Color disclosure, Builder mode, stash drawer, and Load More.

## Not Touched

- No parser/search/stash rewrite.
- No route migration or `/maze.html` recreation.
- No Archscry, Strategium, Apocrypha, or shared atmosphere changes.

## Follow-Up Recommendations

- Capture release screenshots in a normal browser if visual artifacts are needed.
- If the panel glass still feels too frosted, adjust only the major panel base alpha and blur first.

## Next Suggested Agent

Visual QA reviewer.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-129E-maze-glass-sidebar-help-micro-polish.md`
- `docs/reference/manual-test-cases.md`
- VM-129D
