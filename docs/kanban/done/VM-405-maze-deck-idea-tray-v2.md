# VM-405 - Maze Deck Idea Tray V2

## Status

Done

## Summary

Build Maze V2 as a small, semantic, accessible, local-first deck idea utility.

Core loop: search cards -> add to Maybeboard -> organize into three sections -> copy plain text -> persist locally -> survive reload/errors.

Superseded note: VM-426 keeps the VM-405 accessibility, progressive-enhancement, safe-rendering, quantity, undo, collapse, and local-first foundation, but reframes the product behavior as Reading Finds with Finds/Sparks/Anchors, `vm_maze_reading_finds_v1`, and Archscry dossier reflection.

## Problem

The current Maze scratchpad drawer overlays the view, reads too transparent, and behaves like a temporary stash rather than an intentional workspace for starting a deck idea.

## Goals

- Replace the drawer with an in-flow desktop sticky tray and mobile collapsible sheet that does not cover search controls, result cards, or modal actions.
- Use V2 local storage at `vm_maze_deck_idea_v2`, with safe read-only migration from `vm_maze_card_stash_v1`.
- Keep one store module as the source of truth for draft state, duplicate grouping, quantity, section movement, rename, clear, and export.
- Render all dynamic card/deck/user text through DOM APIs and `textContent`.
- Preserve Maze search, result rendering, card modal behavior, and Archscry handoff contracts if scratchpad initialization fails.
- Keep the utility local-first and anonymous; do not add account save, deckbuilder API handoff, deck legality, prices, framework, or dependency.

## Constraints

- Existing card modal behavior remains protected except for isolated scratchpad add/move controls.
- Do not refactor modal architecture, card rendering, query behavior, or Archscry handoff.
- Use native controls only: buttons for actions, links for navigation, labeled inputs/selects for rename/quantity/move, and native disclosure where appropriate.
- Prefer `oracle_id` for duplicate grouping when available and preserve Scryfall/card id for opening a specific printing.
- Adding the same card to the same section increments quantity instead of creating a duplicate row.
- The same card may exist in multiple sections independently.
- Quantity cannot go below `1`.
- Copy decklist exports only Commander and Deck; copy with Maybeboard exports Commander, Deck, and Maybeboard. Empty sections are omitted.

## Acceptance

- Scratchpad initialization failure does not break Maze search, results, card modal, or Archscry handoff.
- Corrupt V2 localStorage is handled without throwing and without blanking the Maze page.
- All new scratchpad actions use native interactive elements and card-specific accessible names.
- No new scratchpad dynamic text uses unsanitized `innerHTML`.
- Add, move, remove, quantity, rename, clear, copy, copy with maybeboard, and undo paths work by keyboard.
- Copy fallback shows recoverable export text if Clipboard API copy fails.
- Mobile touch targets are at least 44px and reduced-motion mode avoids nonessential animation.
- Unit tests cover migration, corrupt storage, add/remove/move, quantity, rename, clear, duplicate handling, and export text.
- Required commands are run or any blockers are documented: `npm test`, `npm run test:parser`, `npm run lint:js`, `npm run lint:html`, and `npm run test:frontend-smoke`.

## Implementation Notes

- Added `research/maze-scratchpad-store.js` as the V2 source of truth and storage adapter.
- Added `research/maze-scratchpad-store-tests.js` and wired it into `npm test`.
- Replaced the drawer behavior in `maze/index.html`, `assets/css/maze.css`, and `research/research-init.js` with the Deck Idea Tray UI.
- Updated Maze architecture, contract, route ownership, and manual QA docs to reflect the V2 tray and V1 migration.

## Verification

- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:parser` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:maze-scratchpad` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with existing LF/CRLF working-copy warnings only.
- Browser QA on `http://127.0.0.1:4179/maze/` - passed for desktop no-overlap/no horizontal overflow, add from result, duplicate increment, move to Deck, copy decklist, remove, Undo, mobile 390px and 320px no-overlap/no horizontal overflow, and 44px tray controls.
