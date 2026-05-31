# 2026-05-30 17:15 - Codex - VM-173 Grixis Dossier Recommendation Quality Repair

## Agent Name

Codex

## Task Requested

Implement VM-173: repair Grixis Archscry dossier recommendation quality by removing off-color card voices, adding Grixis starter UX display data, using exact commander identity for commander searches, keeping support/99 searches on subset identity, and closing the card with tests and handoff.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1621-codex-vm168-grixis-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-168-grixis-controlled-runtime-promotion.md`
- `data/identity-layers.json`
- `data/factions.json`
- `data/archscry-flavor-snippets.json`
- `data/scryfall/indexes/card-flavor-index.json`
- `data/scryfall/indexes/commander-index.json`
- `data/scryfall/raw/oracle-cards.json`
- `research/build-archscry-flavor-snippets.mjs`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/maze-handoff.js`
- `assets/js/archscry-presentation.js`
- `research/research-init.js`
- `research/research-syntax-language.js`
- Placement, Maze, syntax, and Archscry dossier regression tests

## Files Changed

- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/maze-handoff.js`
- `assets/js/quick-reading-tests.js`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `research/build-archscry-flavor-snippets.mjs`
- `research/build-faction-artifacts.mjs`
- `research/research-init.js`
- `research/research-syntax-language.js`
- `research/research-syntax-language-tests.js`
- `research/archscry-adjacent-navigation-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-173-grixis-dossier-recommendation-quality-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1715-codex-vm173-grixis-dossier-recommendation-quality-repair.md`

## What Changed

- Tightened `research/build-archscry-flavor-snippets.mjs` so snippets use the committed Scryfall index `color_identity` field as eligibility truth and exclude cards outside the faction Commander color identity.
- Regenerated Grixis snippets; Grixis now resolves to `Agony Warp`, `Blightning`, and `Brainbite`, and no longer recommends `Bant Sureblade`.
- Added Grixis starter UX display data in `data/identity-layers.json`: Kess, Nekusar, Jeleva, Terminate, Counterspell, Blasphemous Act, Arcane Signet, Talismans, and the requested premium/midrange/budget/utility land tiers.
- Updated `research/build-faction-artifacts.mjs` to fill missing `staples` and `land_base` fields from identity-layer display data when an existing generated display record is preserved.
- Updated commander package searches to use exact identity for commander cards: `id=... is:commander f:commander`.
- Kept support, flavor, ramp, draw, interaction, lands, and win-condition searches on `id<=...`.
- Hid the outside-color commander stretch path for Grixis dossiers only, while preserving the shared path for other dossiers.
- Improved exact commander-search plain-language copy, including the preferred Grixis form: `Grixis commanders with exactly blue-black-red identity`.
- Added regression coverage for Grixis snippet legality, Bant/Esper snippet continuity, Grixis starter card legality, exact commander searches, support-search subset identity, and Grixis stretch-path suppression.

## Why It Changed

Manual QA found that the Grixis dossier could recommend an off-color card voice because faction-flavor scoring could outrank color identity legality. Grixis also lacked starter card and nonbasic mana-base display data after VM-168, and commander candidate search links used `id<=ubr` even though Commander recommendations require exact commander identity.

## Decisions Made

- Used committed Scryfall `color_identity` data as the eligibility source of truth for snippets and starter UX validation.
- Treated starter/support cards as Commander-legal UBR display data, not lore claims.
- Kept subset-color and colorless starter/support cards valid when they satisfy `id<=ubr`.
- Made outside-color stretch suppression Grixis-specific rather than global because existing shared dossiers still expect the fourth path.
- Did not add `UBR` as a key, alias, route key, or runtime lookup target.

## Risks / Uncertainties

- The worktree was already dirty from VM-164 through VM-168 Grixis/Esper/Bant work. VM-173 preserved those changes and did not attempt to clean, revert, or stage them.
- `npm.cmd run build:factions` rewrote generated placement/faction/Supabase-context surfaces through the approved build path.
- `git diff --check` passed but reported existing Windows LF-to-CRLF normalization warnings on many touched and pre-existing dirty files.
- `data/raw-factions/bant/*`, `docs/research/esper/esper-lore-source-packet.md`, and `research/presentation-snapshot-tests.js` remained dirty from prior work and were not part of the VM-173 repair.

## Tests Run

- `node --check research/build-archscry-flavor-snippets.mjs`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/maze-handoff.js`
- `node --check research/research-syntax-language.js`
- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `npm.cmd run build:factions`
- `node research/build-archscry-flavor-snippets.mjs`
- `node research/research-syntax-language-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/maze-query-contract-tests.js`
- `node research/archscry-adjacent-navigation-tests.js`
- `node research/maze-search-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git diff --check`

## Not Touched

- No new lore sources, official captures, raw claims, or Commander facts.
- No Grixis raw packet claim edits.
- No route redesign, Home card, schema domain field, or new live placement key.
- No `/grixis/` or `/ubr/` route.
- No `UBR` alias/key promotion.
- No manual Supabase source edit outside the generated faction-context output.

## Follow-Up Recommendations

- Manually spot-check a Grixis dossier after reload: card voices should show only UBR-legal/subset cards, starter cards should be populated, the mana-base map should show the four nonbasic tiers, and the Grixis Maze handoff should show three paths with exact commander identity on the commander lane.
- If future shards add starter UX data after initial promotion, prefer adding it to `data/identity-layers.json` before running `build:factions` so generated records inherit the display fields consistently.

## Next Suggested Agent

Manual QA / Frontend verifier for one browser pass through a fresh Grixis Archscry result and Maze handoff.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-173-grixis-dossier-recommendation-quality-repair.md`
- `docs/handoffs/2026-05-30-1621-codex-vm168-grixis-controlled-runtime-promotion.md`
