# 2026-06-09 21:07 - Codex - VM-314 ABZAN Display Enrichment

## Agent Name

Codex

## Task Requested

Implement the requested ABZAN display enrichment and source-backed figure-fill pass from local approved sources only, without turning it into placement authoring, generated placement patching, flavor-snippet work, route/Maze work, schema changes, or web research.

## Pre-Flight Summary

Recent related work: VM-300 established source/generated guardrails; VM-305 added targeted Supabase context rebuilds; VM-306 repaired UR/RG mechanics without accepting unrelated generated drift; VM-307 repaired Lorehold mechanics/signal balance and recommended ABZAN next. Pre-flight also found VM-308 already occupied by the Colorless source packet, with the nearby VM-309 through VM-312 Colorless lane referenced in that handoff, so this ABZAN pass was renumbered to VM-314.

Current known risks: the worktree is broadly dirty with unrelated tracked and untracked drift; full `build:factions` still attempts unrelated WITCH Supabase context rewrites; `npm.cmd run test:placement` still has the known unrelated Temur color-order assertion.

Relevant decisions already made: ABZAN is already live-pilot and VM-300-green; `WBG` and permutations remain metadata/query-only; `data/factions.json` can serve as approved display input but cannot prove placement/profile fields; Commander links are display/navigation metadata, not lore evidence.

Files recently changed by related work include `data/factions.json`, `data/identity-layers.json`, `data/placement-model.json`, raw UR/RG/Lorehold data, `research/build-faction-artifacts.mjs`, Supabase context, board, and handoff docs. VM-314 preserved unrelated drift and did not stage, revert, normalize, or clean unrelated files.

What should not be touched: ABZAN placement axes/discriminators/inhibitors/claim counts, raw claims/sources/evidence rows, placement schema shape, generated flavor snippets, Maze behavior, routes, Home preview, source-generated validator policy, exact card facts, commander legality, and canonical flavor text.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-1404-codex-vm305-supabase-context-isolation.md`
- `docs/handoffs/2026-06-09-1642-codex-vm306-ur-rg-mechanics-source-first.md`
- `docs/handoffs/2026-06-09-2000-codex-vm307-lorehold-mechanics-signal-balance.md`
- `docs/handoffs/2026-06-09-2005-codex-vm308-colorless-source-packet.md`
- Abzan VM-197 through VM-202 and VM-215 cards/handoffs
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-reliability-audit.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.changelog.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/identity-layers.json`
- `data/factions.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-314-abzan-display-enrichment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-2107-codex-vm314-abzan-display-enrichment.md`

## What Changed

- Added ABZAN display-source deck metadata in `data/identity-layers.json::expressions.ABZAN.display.deck_links` using the existing wedge Commander link convention.
- Added `data/identity-layers.json::expressions.ABZAN.display.research_links.edhrec_slug = "abzan"` so generated `factions.ABZAN.research_links` is builder-produced from display metadata, not hand-filled output.
- Added `data/factions.json::factions.ABZAN.raw_enrichment` with 3 historical timeline entries, 5 key figures, and an intentionally empty `canonical_flavor_text` array.
- Added 5 source-backed raw `key_figures` in `data/raw-factions/abzan/abzan.profile.json`.
- Updated raw profile incremental dates and added an ABZAN changelog entry for VM-314.
- Created and completed VM-314 Kanban/handoff bookkeeping.

## Why It Changed

ABZAN already passed source/generated placement validation, but its display-facing data was visibly thin: no raw enrichment, no deck links, no research link slug, and no raw key figures. VM-314 fills that display gap from existing local source backing without weakening the source-first rule that placement/profile durability must come from raw source data, not generated output.

## Evidence Used

- New figure anchors use promoted local evidence rows only: `ABZAN-EVID-008`, `ABZAN-EVID-009`, `ABZAN-EVID-012`, `ABZAN-EVID-013`, and `ABZAN-EVID-017`.
- The display timeline mirrors existing raw profile timeline claims: `abzan_claim_0003`, `abzan_claim_0004`, `abzan_claim_0005`, `abzan_claim_0006`, `abzan_claim_0007`, `abzan_claim_0008`, `abzan_claim_0009`, and `abzan_claim_0010`.
- Source IDs used for figure/display backing: `src_wotc_tarkir_khans_pg_part_1`, `src_wotc_tarkir_fate_reforged_pg`, `src_wotc_tarkir_dragons_pg_part_2`, `src_wotc_tarkir_story_khanfall`, `src_wotc_tarkir_dragonstorm_pg_part_1`, and `src_wotc_tarkir_dragonstorm_pg_part_2`.
- Deck/research link metadata follows existing wedge display convention only and is not lore evidence.

## Generated Objects Accepted / Restored

- Accepted `data/factions.json::factions.ABZAN.research_links.edhrec_slug`.
- Accepted `data/factions.json::factions.ABZAN.deck_links`.
- Accepted `data/factions.json::identity_layers.expressions.ABZAN.display.research_links.edhrec_slug`.
- Accepted `data/factions.json::identity_layers.expressions.ABZAN.display.deck_links`.
- Accepted no `data/placement-model.json` changes; final pre-build snapshot comparison showed zero changed paths.
- Accepted no `data/placement-model.schema.json` changes.
- Accepted no `data/archscry-flavor-snippets.json` changes.
- Full build initially rewrote `supabase/functions/guild-recruiter/faction-context.ts` for unrelated `WITCH`; restored the exact pre-build context snapshot.
- Ran `npm.cmd run build:factions -- --context-targets=ABZAN`; final context stayed byte-identical, so no Supabase context changes were accepted.

## Decisions Made

- Renumbered the requested VM-308 work to VM-314 because VM-308 is already Colorless and the Colorless lane references nearby follow-up IDs.
- Kept `canonical_flavor_text` empty because exact card text/card facts remain manual-fill material.
- Kept Betor, Hamza, commander product details, exact modern card facts, and commander legality out of scope.
- Put `edhrec_slug` under display research metadata rather than routing metadata to avoid changing generated placement layered identity.
- Did not edit ABZAN raw claims or source records.

## Risks / Uncertainties

- ABZAN and Lorehold still report expected model-owned biological-prior inhibitor warnings under target validation.
- `npm.cmd run test:placement` still fails only on the known unrelated Temur color-order assertion.
- The worktree remains broadly dirty outside VM-314.
- `data/factions.json` is both a display input and generated output in this build flow, so VM-314 accepted only ABZAN display diffs traceable to touched display inputs.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed: JSON parse checks for touched raw/display/generated JSON before and after edits.
- Baseline probe: ABZAN had no `raw_enrichment`, empty `deck_links`, empty `research_links`, 0 raw key figures, 0 raw canonical flavor entries, and 3 raw timeline entries.
- Passed with expected warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN`.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=ABZAN`.
- Final probe: ABZAN has `research_links.edhrec_slug`, 1 deck link, `raw_enrichment`, 3 display timeline entries, 5 display key figures, 0 display flavor entries, 5 raw key figures, and 0 raw flavor entries.
- Passed with expected warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Known unrelated residual only: `npm.cmd run test:placement`.
- Passed with existing LF/CRLF warnings only: scoped `git diff --check`.
- Passed: focused trailing-whitespace scan.

Known `test:placement` residual:

```text
 'Temur Frontier commanders with exactly green-blue-red identity'
- 'Temur Frontier commanders with exactly blue-red-green identity'
```

## Not Touched

- No web search.
- No ABZAN raw claims or source records.
- No ABZAN placement axes, good/poor fit indicators, inhibitor traps, discriminator questions, mechanics, or claim counts.
- No placement schema shape changes.
- No flavor snippet authoring.
- No Maze behavior, route behavior, Home preview, public alias, or validator policy changes.
- No generated placement output was hand-edited as source.
- No unrelated generated drift was accepted.

## Follow-Up Recommendations

- Next recommended source-first target: `SULTAI`, but preserve the existing `VM-236` Sultai live-copy backlog card and choose a non-conflicting card ID.
- Keep exact ABZAN card text/flavor, commander legality, Betor/Hamza/Felothar expanded biography, and Commander product-canon questions as separate manual-fill work if needed.
- Continue using VM-305 targeted context mode whenever full build rewrites unrelated Supabase context.

## Next Suggested Agent

JSON Cartographer for the Sultai source-first display/profile pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-314-abzan-display-enrichment.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-307-lorehold-mechanics-signal-balance.md`
- `docs/kanban/done/VM-202-abzan-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-215-abzan-dossier-manual-qa-repair.md`
