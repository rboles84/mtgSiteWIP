# VM-405 Maze Deck Idea Tray V2 Handoff

## Agent Name

Codex

## Task Requested

Implement VM-405 as a full Maze deck scratchpad redo: a semantic, accessible, local-first Deck Idea Tray V2 with V2 storage, safe V1 stash migration, duplicate/quantity rules, plain-text export, no account save or deckbuilder creep, and protected Maze search/modal/Archscry behavior.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-2313-codex-vm404-ui-polish-repair.md`
- `docs/handoffs/2026-05-25-1100-codex-vm129-maze-search-console-redesign.md`
- `docs/handoffs/2026-05-25-1618-codex-vm129b-maze-visual-alignment.md`
- `docs/handoffs/2026-05-25-2222-codex-vm129d-maze-mode-usability.md`
- `docs/handoffs/2026-05-28-1653-codex-vm147c-maze-risk-reduction.md`
- `docs/handoffs/2026-05-24-1817-codex-vm119-semantic-html-aria-audit-implementation.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-405-deck-scratchpad-redesign-concept.md`
- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/run-tests.js`
- `package.json`

## Files Changed

- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/maze-scratchpad-store.js`
- `research/maze-scratchpad-store-tests.js`
- `research/run-tests.js`
- `package.json`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-405-maze-deck-idea-tray-v2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-28-2001-codex-vm405-maze-deck-idea-tray-v2.md`

## What Changed

- Replaced the old overlay-style scratchpad drawer with an in-flow Deck Idea Tray rail/sheet that lives in the Maze layout.
- Added a dedicated `maze-scratchpad-store.js` module as the single source of truth for V2 draft state, persistence, migration, duplicate grouping, quantities, section movement, rename, clear, and export.
- Added V2 storage at `vm_maze_deck_idea_v2` with read-only migration from legacy `vm_maze_card_stash_v1`.
- Implemented Commander Ideas, Deck, and Maybeboard sections with quantity controls, native move selects, remove buttons, rename input, collapse/expand, Undo for add/remove, live status feedback, and copy/export fallback.
- Changed result-card and modal scratchpad actions to add/increment rather than toggle/remove.
- Kept dynamic tray text rendered through DOM APIs and `textContent`.
- Added focused store tests and wired them into `npm test`.
- Updated Maze contract, architecture, route ownership, core logic, manual QA, Kanban, and handoff docs.

## Why It Changed

The old scratchpad felt like a translucent stash drawer and did not support the deck-idea workflow the owner wanted. VM-405 narrows the product shape to a local-first deck idea utility: search, add to Maybeboard, organize into three sections, copy plain text, persist locally, and survive storage/tray failures without becoming a deckbuilder.

## Decisions Made

- Use vanilla ES modules and no new dependency.
- Keep account save, external deckbuilder handoff, legality, pricing, and full deckbuilder behavior out of V2.
- Prefer `oracle_id`/`oracleId` for duplicate grouping, then Scryfall/card id, then clean name.
- Preserve same-card independence across sections.
- Export clean card names only, omit empty sections, and keep `Copy decklist` limited to Commander and Deck.
- Preserve existing card modal architecture and only add isolated tray add controls.
- Keep old action names accepted where useful for compatibility, but new UI emits V2 actions.

## Risks / Uncertainties

- The working tree had substantial unrelated dirty VM-420/422/423/424/425 changes before VM-405 started. Those were preserved and not reverted.
- Browser QA was performed in the available in-app Chromium-family browser only. Safari/WebKit, iOS Safari, Android Chrome, and Firefox manual QA remain owner/follow-up checks.
- Reduced-motion CSS/static presence was verified; the visible topbar reduced-motion click was not completed because the browser locator click timed out.
- Live Scryfall search worked during browser QA, but network availability may differ by environment.

## Tests Run

- `node --check research\maze-scratchpad-store.js` - passed.
- `node --check research\maze-scratchpad-store-tests.js` - passed.
- `node --check research\research-init.js` - passed.
- `node research\maze-scratchpad-store-tests.js` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:parser` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:maze-scratchpad` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with existing LF/CRLF working-copy warnings only.
- Browser QA on `http://127.0.0.1:4179/maze/` - passed for desktop no-overlap/no horizontal overflow, add from result, duplicate increment, move to Deck, copy decklist clipboard text, remove, Undo, 390px mobile no-overlap/no horizontal overflow, 320px mobile no-overlap/no horizontal overflow, and 44px tray controls.

## Not Touched

- Maze query semantics.
- Scryfall parser/search execution.
- `vm_archscry_maze_handoff_v1` handoff payload semantics.
- Card modal architecture, close paths, and inert model beyond isolated tray buttons.
- Generated faction/precon data.
- Account persistence, Supabase deck storage, external deckbuilder APIs, legality, pricing, or deck import.
- Unrelated dirty VM-420/422/423/424/425 files except where shared docs already had to be extended for VM-405.

## Follow-Up Recommendations

- Run manual cross-browser QA in Firefox, Safari/WebKit, iOS Safari, and Android Chrome.
- Do a screen-reader pass for the tray status/Undo flow if accessibility polish continues.
- Consider adding a dedicated Maze visual regression harness before more layout-heavy Maze work.

## Next Suggested Agent

Human/browser QA for Safari/iOS/Android coverage, then Codex for any follow-up fixes found there.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-405-maze-deck-idea-tray-v2.md`
- `docs/contracts/maze-query-contract.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`
