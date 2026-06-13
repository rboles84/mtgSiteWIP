# VM-315 - SULTAI Source-First Display Enrichment

ID: VM-315
Title: SULTAI Source-First Display Enrichment
Status: done
Type: Data / Display Enrichment
Area: Sultai, Display Data, Source-First Faction Quality
Priority: high
Created: 2026-06-09
Completed: 2026-06-09

## Summary

Repaired SULTAI's display-quality gap without starting the reserved VM-236 live-copy polish card. SULTAI already passed VM-300 source/generated validation, but display inputs were thin: no `raw_enrichment`, empty `deck_links`, empty `research_links`, no raw `key_figures`, and empty `canonical_flavor_text`.

## Scope Completed

- Preserved unrelated dirty worktree drift.
- Added SULTAI display-source research and deck-link metadata in `data/identity-layers.json`.
- Added SULTAI `raw_enrichment` display input in `data/factions.json`.
- Added five tightly bounded raw SULTAI figure/institutional anchors in `data/raw-factions/sultai/sultai.profile.json`.
- Updated SULTAI changelog bookkeeping.
- Preserved SULTAI raw claims and sources byte-for-byte.
- Kept VM-236 reserved in Backlog and did not execute runtime copy polish.

## Acceptance Result

- Baseline and final VM-300 validation passed for `LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI`, with only expected model-owned inhibitor warnings for Lorehold, Abzan, and Sultai.
- Accepted generated `data/factions.json::factions.SULTAI.research_links.edhrec_slug`.
- Accepted generated `data/factions.json::factions.SULTAI.deck_links`.
- Accepted generated `data/factions.json::identity_layers.expressions.SULTAI.display.research_links.edhrec_slug`.
- Accepted generated `data/factions.json::identity_layers.expressions.SULTAI.display.deck_links`.
- Accepted no `data/placement-model.json`, `data/placement-model.schema.json`, or `data/archscry-flavor-snippets.json` content drift.
- Full build produced unrelated WITCH Supabase context drift; restored `supabase/functions/guild-recruiter/faction-context.ts` from the pre-build snapshot.
- Targeted SULTAI context build produced byte-identical context, so no Supabase context changes were accepted.

## Evidence Used

- `SULTAI-EVID-005` and `SULTAI-EVID-009` for Khans-era necromancy/sibsig and Queen Sidisi anchors.
- `SULTAI-EVID-012` and `SULTAI-EVID-019` for Tasigur and Khanfall transition anchors.
- `SULTAI-EVID-024` for the Fangkeeper and Lasyd modern governance/military anchors.
- `SULTAI-EVID-026` for modern honored-dead / Rite of Renewal boundaries.
- Source IDs used: `src_wotc_tarkir_khans_pg_part_1`, `src_wotc_tarkir_fate_reforged_pg`, `src_wotc_tarkir_story_khanfall`, `src_wotc_tarkir_dragons_pg_part_1`, and `src_wotc_tarkir_dragonstorm_pg_part_2`.
- Deck/research link metadata follows the existing wedge display convention only and is not lore evidence.

## Tests

- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed: JSON parse checks before and after edits.
- Passed with expected warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI`.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=SULTAI`; final context stayed byte-identical.
- Passed with expected warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Known unrelated residual only: `npm.cmd run test:placement`.
- Passed with existing LF/CRLF warnings only: scoped `git diff --check`.
- Passed: focused trailing-whitespace scan.

Known `test:placement` residual:

```text
+ 'Temur Frontier commanders with exactly green-blue-red identity'
- 'Temur Frontier commanders with exactly blue-red-green identity'
```

## Explicit Non-Goals

- No web search.
- No SULTAI runtime copy polish under VM-236.
- No SULTAI raw claims or source record edits.
- No placement axes, discriminator, inhibitor, claim-count, mechanics, schema, Maze, route, flavor-snippet, Home, public alias, or validator policy changes.
- No generated placement hand edits.
- No exact card text, commander legality, or full character biography work.

## Follow-Up

- Next recommended source-first target: `TEMUR`, unless visible copy polish becomes the priority and the user explicitly starts backlog `VM-236`.
- Keep exact SULTAI card text/flavor, Sidisi/Tasigur full biographies, Fangkeeper/Lasyd individual biographies, Kotis/Teval details, Commander legality, and deck/product facts as manual-fill or future card-data work.
- Continue using VM-305 targeted context mode whenever full build rewrites unrelated Supabase context.
