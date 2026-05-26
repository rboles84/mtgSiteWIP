# VM-129F - Maze Textarea Inspector Space Pass

## Status

Done

## Summary

Tighten the `/maze/` command deck around real search work by replacing the single-line query input with a textarea, moving universal query actions into the search row, hiding redundant Query Inspector states, and cleaning Loom header alignment.

## Scope

- Preserve `/maze/`, protected Maze IDs, parser/search/stash/modal contracts, Archscry handoff behavior, and `/maze/?q=...`.
- Keep Query Inspector as a translation/diagnostic surface, not always-visible chrome.
- Keep this layered on the VM-129E Maze baseline.

## Acceptance Notes

- `#search-input` is now a two-row textarea.
- Enter searches in Plain Reading and Operator's Hand; Shift+Enter inserts a newline.
- Search execution normalizes textarea whitespace to single-line Scryfall-safe text.
- Copy and Open in Scryfall are available in the search row and target the active query.
- Redundant raw and normal Loom inspector states stay hidden.
- Plain Reading still shows translation bridge details.
- Loom command copy now aligns as a balanced two-column header on desktop.

## Tests

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`

## Follow-Up

- Re-run full visual/browser verification after any concurrent Archscry/route work settles, because the worktree contains unrelated in-flight route changes.
