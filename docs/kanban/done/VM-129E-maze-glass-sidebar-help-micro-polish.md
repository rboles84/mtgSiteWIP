# VM-129E - Maze Glass Sidebar Help Micro Polish

## Status

Done.

## Summary

Small follow-up pass on the VM-129D Maze console to make the glass less frosted, add matching disclosure toggles to Recent Searches and By Color, and replace native popover help with explicit JS-controlled help state.

## Completed

- Lowered major Maze panel opacity and blur so the rich painted background, stars, and orbs read more clearly through the UI.
- Converted `Recent Searches` and `By Color` to native `<details>` disclosures while preserving `recent-section`, `recent-list`, and `color-grid`.
- Kept Recent Searches hidden when empty and automatically opened once recent queries exist.
- Removed native `popover` / `popovertarget` reliance from the mode help control.
- Added explicit help open/close state with `.is-open`, `aria-expanded`, and `body[data-help-open]`.
- Closed help on mode switch, Clear, outside click, and Escape.
- Added regression coverage to `research/maze-search-tests.js`.

## Verification

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser verified `/maze/` glass values, click-open help, Escape/outside close, Recent auto-open, By Color disclosure, Builder mode, stash drawer, and Load More.

## Follow-Up Notes

- Capture release screenshots in a normal browser if visual artifacts are needed.
