# 2026-06-13 13:46 - Codex - WUBRG Commander Flavor Echo Image Repair

## Agent Name

Codex

## Task Requested

Fix the missing `Heroes in a Half Shell` image in the WUBRG `What This Looks Like In Cards` section while preserving the approved WUBRG card voice order and support-only presentation boundaries.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-13-1234-codex-wubrg-dossier-copy-governance-polish.md`
- `docs/handoffs/2026-06-13-1335-codex-wubrg-edhrec-precon-link-repair.md`
- `docs/kanban/done/VM-374-wubrg-dossier-copy-governance-polish.md`
- `docs/kanban/done/VM-375-wubrg-edhrec-precon-link-repair.md`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `data/archscry-flavor-snippets.json`
- `data/scryfall/indexes/card-flavor-index.json`
- `data/scryfall/indexes/commander-index.json`
- `data/scryfall/raw/oracle-cards.json`

## Files Changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-376-wubrg-commander-flavor-echo-image-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1346-codex-wubrg-commander-flavor-echo-image-repair.md`

## What Changed

- Updated `selectCuratedFlavorEchoesForFaction` to accept `commanderCards` and resolve curated snippets against `card-flavor-index` first, then `commander-index`.
- Passed the already-loaded `APP_STATE.scryfallCommanderIndex.commanders` into curated flavor echo selection.
- Added WUBRG regression coverage that preserves the card voice order and requires `Heroes in a Half Shell` to render with its Scryfall image URL.

## Why It Changed

`Heroes in a Half Shell` is a WUBRG curated snippet sourced from `commander-index`, not `card-flavor-index`. The renderer had the snippet name, link, and flavor text, but no image-bearing indexed card record, so the card example rendered as text only.

## Decisions Made

- No generated snippet rebuild was needed; the committed snippet already has the correct card name, flavor excerpt, and Scryfall URI.
- The runtime now uses commander-index as a fallback only after card-flavor-index, preserving existing flavor-card choices.
- This remains presentation-only card voice handling, not Commander fact, legality, ranking, metagame, or recommendation proof.

## Risks / Uncertainties

- The worktree was broadly dirty before VM-376. Unrelated dirty and untracked work was preserved.
- No browser screenshot was taken after the code fix; automated HTML output coverage asserts the expected `<img>` source.

## Tests Run

- `node --check assets/js/index.js` - passed.
- `node --check research/archscry-dossier-followup-tests.js` - passed.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd test` - passed.

## Not Touched

- No generated faction data.
- No generated flavor snippet data.
- No Scryfall index data.
- No Home preview changes.
- No Maze behavior changes.
- No public route changes.
- No schema/API changes.
- No Colorless boundary changes.
- No Commander fact, legality, popularity, ranking, metagame, price, or recommendation-quality claims.
- No precon ordering, support-pool, or UI label changes.
- No `assets/img/identity-hero/wubrg.webp` changes.
- No staging or commits.

## Follow-Up Recommendations

- Optional browser QA can confirm the visual card grid now shows three images in the WUBRG card examples section.

## Next Suggested Agent

Frontend QA agent for optional visual confirmation.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-376-wubrg-commander-flavor-echo-image-repair.md`
- `docs/kanban/done/VM-374-wubrg-dossier-copy-governance-polish.md`
- `docs/kanban/done/VM-375-wubrg-edhrec-precon-link-repair.md`
