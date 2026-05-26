# VM-129G - Maze Help Removal And Loom Clear Reset

## Status

Done

## Summary

Remove the unreliable Maze `?` search-help popover from the command deck and make Clear in The Loom reset the visual board the same way as Reset board.

## Scope

- Keep `/maze/`, protected Maze IDs, Scryfall parser/search behavior, stash behavior, Archscry handoff behavior, modal behavior, and `/maze/?q=...`.
- Remove only the non-protected help affordance and its dead style/runtime wiring.
- Preserve the existing builder reset implementation and reuse it for Builder-mode Clear.

## Acceptance Notes

- `mode-help-btn` and `mode-help-popover` are no longer present in `maze/index.html`.
- The search row keeps Search, Clear, Copy, and Open in Scryfall.
- In Builder mode, Clear calls the same reset path as Reset board and restores the generated field to `f:commander`.
- Focus remains on the search textarea after Builder clear.

## Tests

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Follow-Up

- None for the removed help popover. Mode guidance now lives in the mode cards and mode context copy.
