# VM-129B - Correct Maze Visual Alignment And Responsive Layout

## Status

Done

## Summary

Corrected the VM-129 Maze route visual shell so `/maze/` matches the current Vox Mana page family more closely: clean painted background treatment, cooler black-glass panels, a stretched results empty state, and a non-overlapping deck scratchpad layout.

## Scope Completed

- Replaced the remaining legacy brown/yellow Maze skin in `assets/css/maze.css` with a cooler route-local glass treatment.
- Added the shared star-canvas background layer to `maze/index.html`.
- Replaced the Maze-specific chamber background with the same `background-vox-gateway-clean-13.webp` asset used by `newIndex2.html`, `archscry/index.html`, and `strategium/index.html`.
- Switched Maze to the current medium shared background treatment instead of the older heavy Maze-specific treatment.
- Removed the extra route-level brown wash that was flattening the background art.
- Adjusted the command deck spacing, headline scale, and button font cascade so the top experience reads like current Archscry/Strategium chrome.
- Made the results panel and "The Archives await" state fill the available results width.
- Moved the deck scratchpad into normal layout flow by default and kept it sticky only as a wide-layout grid column.
- Preserved protected Maze behavior, protected IDs, route path, stash storage, and Archscry handoff interfaces.

## Tests

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:parser`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Puppeteer/Edge visual layout checks for `/maze/` at 1280px, 1024px, 390px, and 1600px.
- Protected ID/key smoke check for Maze hooks, stash key, Archscry handoff key, and stale `maze.html` route references.

## Notes

- No route migration or `/maze.html` compatibility shell was added.
- No parser, search, stash, modal, pagination, or Archscry handoff behavior was intentionally changed.
