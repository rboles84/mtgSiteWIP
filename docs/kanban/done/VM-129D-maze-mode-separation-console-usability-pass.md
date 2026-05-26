# VM-129D - Maze Mode Separation and Console Usability Pass

## Status

Done.

## Summary

Layered on top of the VM-129C Maze baseline, this pass separates the feel of Plain Reading, Operator's Hand, and The Loom while preserving the existing Scryfall parser/search engine, stash contract, Archscry handoff, modal behavior, protected DOM IDs, and `/maze/` route.

## Completed

- Added mode-aware command copy, click-triggered search help, and a compact raw-mode Query Inspector state that avoids duplicating the search field.
- Reworked The Loom into a builder-first mode with a dedicated `builder-reset-btn`, Commander default format, and mode-preserving Clear behavior.
- Made major Maze panels more transparent so the rich background, stars, and orbs read through the interface.
- Reordered sidebar sections to From Your Dossier, Discovery Paths, Recent Searches, collapsed Helper Searches, By Color, and Format.
- Moved the deck scratchpad into a mounted right-side drawer controlled by `stash-drawer-toggle`, avoiding permanent width loss and fixed overlap.
- Fixed `Load More` so local result pages append before Scryfall `next_page` fetches, with loading and error recovery.
- Updated `research/maze-search-tests.js` to cover mode-preserving clear, builder reset, Commander defaults, mode-aware inspector rendering, local pagination, and remote pagination.

## Protected Behavior

- Did not rename protected Maze IDs.
- Preserved `STASH_KEY = "vm_maze_card_stash_v1"` and stash export headings.
- Preserved `ARCHSCRY_MAZE_HANDOFF_KEY`, return banner behavior, `/maze/?q=...`, modal behavior, helper searches, recent searches, and result pagination.
- Did not rewrite parser/search/stash modules beyond small Maze controller compatibility changes.

## Verification

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser verified `/maze/`, raw search, `Load More`, Query Inspector actions, stash add/export/clear, modal Commander stash, Archscry return URL, and query URL.

## Follow-Up Notes

- In-app browser screenshot capture timed out during this pass; DOM and interaction verification completed successfully.
- Mobile visual inspection should be repeated in a normal browser/devtools viewport before release if a screenshot artifact is required.
