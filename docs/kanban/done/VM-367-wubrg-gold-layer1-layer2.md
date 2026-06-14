# VM-367 - WUBRG Gold Layer 1 And Layer 2

Status: Done
Owner: Codex
Created: 2026-06-13
Completed: 2026-06-13

## Summary

Added `WUBRG` / Five-Color as a source-owned, controlled Layer 1 identity after completing a lore-first Layer 2 gold packet from the existing local WUBRG research folder.

## Pre-Flight Results

- `VM-367` was confirmed unused by repo text search.
- Existing files in `docs/research/wubrg/` were listed before packet creation.
- Hard-stop search found no existing `data/raw-factions/wubrg/` folder and no generated `WUBRG` identity entry in `data/factions.json`, `data/identity-layers.json`, or `data/placement-model.json`.
- Existing WUBRG strings in runtime/generated files were generic WUBRG-order helpers, Colorless/five-color boundary text, stale historical notes, or research files.
- Broad unrelated dirty drift exists and was preserved.

## Completed Scope

- Preserved existing WUBRG research files without overwrite, rename, deletion, or normalization.
- Classified all existing `docs/research/wubrg/` files before source/data promotion.
- Created the WUBRG Layer 2 packet: source ledger, evidence ledger, manual fill, reliability audit, existing-file map, source packet, gap analysis, and gold findings.
- Created source-owned `data/raw-factions/wubrg/` files after Layer 2 readiness was recorded.
- Added `WUBRG` as a controlled five-color Layer 1 identity with `preview_eligible: false` and suppressed directory links.
- Surfaced support-only Commander/deck/research links from local JSONL, MTGDecks, Archidekt, and Scryfall query captures.
- Wired WUBRG Maze/dossier handoff links with exact Commander query `id=wubrg is:commander f:commander`.

## Guardrails Preserved

- Unsupported local WUBRG prose was not promoted into Layer 1 or Layer 2.
- `claim-bearing` requires captured or cited approved sources.
- Official/current sources win over conflicting local lore.
- Generated/runtime files are not lore evidence.
- Commander, deck, MTGDecks, Archidekt, and Scryfall data are support-only.
- WUBRG fields were not padded to match other identities; deferred official/current Draconic Domination and Painbow agreement remains explicit.
- No Home preview, public route expansion, or `COLORLESS/WUBRG` Crucibles were added.

## Acceptance Criteria

- [x] Existing WUBRG files are classified and preserved.
- [x] WUBRG source/evidence/manual-fill/reliability/gold packet files exist.
- [x] WUBRG raw packet exists with source-traceable claims.
- [x] `WUBRG` appears in generated Layer 1 data after builder flow.
- [x] Maze `From Your Dossier` shows WUBRG with working plain-reading and operator-hand links.
- [x] Exact WUBRG Commander path uses `id=wubrg is:commander f:commander`.
- [x] Source/generated validation passes for WUBRG with 0 warnings.
- [x] Kanban, handoff, and handoff index are updated at closeout.

## Tests Run

- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check research/maze-search-tests.js`
- `npm.cmd run build:factions`
- `node research/build-archscry-flavor-snippets.mjs`
- `node research/maze-search-tests.js`
- `node assets/js/quick-reading-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/validate-source-generated-guardrails.mjs WUBRG`
- `npm.cmd test`
- `npm.cmd run test:parser`

## Follow-Up Notes

- Draconic Domination and Painbow remain local JSONL support rows until official/current decklist agreement is captured.
- WUBRG has no Home preview, public route, identity hero asset, or Colorless/WUBRG Crucible approval from this card.
- Existing user-curated local files `WUBRG Identity Research Prompt.md` and `wubrg_research_terminal.html` were preserved untouched.
