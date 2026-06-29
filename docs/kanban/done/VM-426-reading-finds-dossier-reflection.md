# VM-426 - Reading Finds And Dossier Reflection

## Status

Done

## Summary

Reframed Maze from its previous local idea utility framing into a local-first reading companion. Users search from a placement, set aside cards that resonate, optionally sort them into Finds, Sparks, and Anchors, then return to Archscry where the dossier reflects those cards through the reading, path, tags, and archetype lens.

Maze captures. Archscry interprets. Nothing claims to be a deck, decklist, legality check, recommendation engine, or account save.

## Collision Scan

- `VM-426`, `VM-427`, and `VM-428` had no local repo hits.
- `VM-420` through `VM-425` were occupied.
- `VM-426` was used consistently for this work.

## What Changed

- Renamed the Maze tray UI to `Reading Finds`.
- Changed result and modal card capture to `Set aside`, which always adds to Finds first.
- Replaced user-facing sections with Finds, Sparks, and Anchors.
- Added `vm_maze_reading_finds_v1` with `schemaVersion: 1`, minimal card snapshots, reading/source context, and idempotent read-only migration from `vm_maze_deck_idea_v2` and `vm_maze_card_stash_v1`.
- Added a handoff-aware `Return to Dossier with Finds` action.
- Added `Your Maze Finds` inside Archscry's existing Maze Discovery panel, filtered by active `readingId`.
- Added cautious reflection copy using only existing source lanes and reading tags.
- Added `npm run test:maze-finds` while keeping the VM-405 `test:maze-scratchpad` alias.
- Updated architecture, contract, route ownership, manual QA, Kanban, and VM-405 supersession docs.

## Guardrails Preserved

- Maze query semantics, Scryfall result rendering, card modal architecture, and Archscry handoff behavior remain protected.
- No scoring, ranking, legality inference, synergy grading, power labels, price logic, completion advice, account save, public sharing, or external handoff was added.
- Dynamic Reading Finds row text continues to render through DOM APIs and `textContent` on Maze.
- Corrupt or unavailable localStorage fails closed without breaking Maze search/results/modal or Archscry dossier rendering.

## Verification

- PASS `node --check research\\maze-scratchpad-store.js`
- PASS `node --check research\\maze-scratchpad-store-tests.js`
- PASS `node --check research\\research-init.js`
- PASS `node --check assets\\js\\index.js`
- PASS `npm.cmd run test:maze-finds`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run test:parser`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `npm.cmd test`

## Notes

- The working tree was already dirty with VM-405 and VM-420/422/423/424/425 work before VM-426 started. Those changes were preserved.
- Browser/manual QA remains recommended for the full Archscry -> Maze -> return loop, mobile widths, and cross-browser storage/clipboard behavior.
