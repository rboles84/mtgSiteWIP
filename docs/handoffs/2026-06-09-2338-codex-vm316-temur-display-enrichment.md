# 2026-06-09 23:38 - Codex - VM-316 TEMUR Source-First Display Enrichment

## Agent Name

Codex

## Task Requested

Implement VM-316: repair TEMUR's display-quality gap from local approved sources only, preserve raw claims/sources/placement, avoid placement/schema/Maze/routes/flavor snippets, and resolve the known Temur color-order test residual only if it is stale test expectation rather than runtime/data behavior.

## Pre-Flight Summary

Recent related work: VM-300 established source/generated guardrails; VM-305 added targeted Supabase context rebuilds; VM-314 and VM-315 established the current ABZAN/SULTAI display enrichment pattern; VM-203 through VM-208 created, reviewed, and promoted TEMUR as exactly one live key; VM-221/222 hardened Temur visible copy and deck/Maze presentation.

Current known risks: the worktree is broadly dirty with unrelated tracked and untracked drift, including parallel Colorless/Home/docs/generated work. Full `build:factions` still rewrites unrelated WITCH Supabase context. Historical `test:placement` had stale color-order expectations.

Relevant decisions already made: `TEMUR` is the only live Temur key; `GUR` and permutations remain metadata/query-only; deck/research links are display navigation metadata, not lore evidence; raw claims/sources/placement are protected; exact card text, Ferocious/Formidable rules text, detailed biographies, Commander legality, Commander product facts, and exact Endless Song mechanics remain manual-fill material.

Files recently changed by related work include `data/factions.json`, `data/identity-layers.json`, raw Abzan/Sultai/Lorehold/UR/RG files, `assets/js/quick-reading-tests.js`, `data/placement-model.json`, Supabase context, board, and handoff docs. VM-316 preserved unrelated drift and did not stage, revert, normalize, or clean unrelated files.

What should not be touched: TEMUR raw claims, raw sources, raw placement, placement axes, discriminators, inhibitors, mechanics, claim counts, placement schema, generated flavor snippets, Maze behavior, routes, Home preview, public aliases, VM-236, and exact card/Commander facts.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-1404-codex-vm305-supabase-context-isolation.md`
- `docs/handoffs/2026-06-09-2107-codex-vm314-abzan-display-enrichment.md`
- `docs/handoffs/2026-06-09-2142-codex-vm315-sultai-display-enrichment.md`
- Temur VM-203 through VM-208 and VM-221/222 cards and handoffs
- `docs/research/temur/**`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.changelog.json`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `assets/js/quick-reading-tests.js`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/identity-layers.json`
- `data/factions.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.changelog.json`
- `assets/js/quick-reading-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-316-temur-display-enrichment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-2338-codex-vm316-temur-display-enrichment.md`

## What Changed

- Added TEMUR display-source deck metadata in `data/identity-layers.json::expressions.TEMUR.display.deck_links`.
- Added `data/identity-layers.json::expressions.TEMUR.display.research_links.edhrec_slug = "temur"`.
- Added `data/factions.json::factions.TEMUR.raw_enrichment` with 3 timeline entries, 5 figure/institutional anchors, and intentionally empty `canonical_flavor_text`.
- Added 5 tightly bounded raw anchors in `data/raw-factions/temur/temur.profile.json`: Surrak Dragonclaw, Yasova Dragonclaw, The Dragonclaw, The One Who Whispers Twice / Twice Whisperer, and Whisperers and the Wide Whisper.
- Updated TEMUR raw profile incremental dates and added a VM-316 changelog entry.
- Corrected stale quick-reading expected strings for TEMUR, SULTAI, and JESKAI color-order assertions after runtime/search output proved the harness expectations were stale.
- Created and completed VM-316 Kanban/handoff bookkeeping.

## Why It Changed

TEMUR already passed source/generated placement validation, but display-facing data was thin. VM-316 fills that display gap from existing local source backing while preserving the source-first rule that placement/profile durability must come from raw source data, not generated output.

## Evidence Used

- `TEMUR-EVID-008`: Khans-era whisperers, frozen ancestors, Wide Whisper, elemental affinity, ice/stone shaping, thaw imagery, ice doubles.
- `TEMUR-EVID-009`: Khans-era family groups, First Father/First Mother, Dragonclaw, One Who Whispers Twice, and Hunt Caller structure.
- `TEMUR-EVID-010`: Khans-era named anchors including Surrak Dragonclaw and Qal Sisma locations.
- `TEMUR-EVID-012`: Fate Reforged Temur and Yasova Dragonclaw as khan.
- `TEMUR-EVID-014`: Khanfall story context for Yasova's Atarka survival bargain.
- `TEMUR-EVID-017`: Atarka-era hidden shamans preserving ancient traditions, Wide Whisper knowledge, and elemental power sites.
- `TEMUR-EVID-018`: Awakening the Bear support for Surrak's wild reverence, brutal pragmatism, bear challenge, and clan defense texture.
- `TEMUR-EVID-021`: Modern Temur leadership pairs the Dragonclaw and Twice Whisperer.
- `TEMUR-EVID-023`: Modern Endless Song and whisperer ceremonies/guidance.
- Source IDs used: `src_wotc_tarkir_khans_pg_part_2`, `src_wotc_tarkir_fate_reforged_pg`, `src_wotc_tarkir_story_khanfall`, `src_wotc_tarkir_dragons_pg_part_1`, `src_wotc_tarkir_dragons_pg_part_2`, `src_wotc_tarkir_story_awakening_the_bear`, and `src_wotc_tarkir_dragonstorm_pg_part_2`.
- Deck/research link metadata follows existing wedge display convention only and is not lore evidence.

Skipped candidate/detail notes: exact modern individual biographies, Eshki/Ureni or other modern character details, full Yasova Bolas arc, exact Ferocious/Formidable/card text, Commander legality, and Commander product facts remain manual-fill material.

## Generated Objects Accepted / Restored

- Accepted `data/factions.json::factions.TEMUR.research_links.edhrec_slug`.
- Accepted `data/factions.json::factions.TEMUR.deck_links`.
- Accepted `data/factions.json::identity_layers.expressions.TEMUR.display.research_links.edhrec_slug`.
- Accepted `data/factions.json::identity_layers.expressions.TEMUR.display.deck_links`.
- Accepted no `data/placement-model.json` content drift; snapshot diff showed zero changed paths.
- Accepted no `data/placement-model.schema.json` content drift.
- Accepted no `data/archscry-flavor-snippets.json` content drift.
- Full build rewrote `supabase/functions/guild-recruiter/faction-context.ts` for unrelated `WITCH`; restored the exact pre-build context snapshot.
- Ran `npm.cmd run build:factions -- --context-targets=TEMUR`; final context stayed byte-identical, so no Supabase context changes were accepted.

## Decisions Made

- Put `edhrec_slug` under display research metadata, not TEMUR routing metadata, to preserve layered placement identity.
- Treated Dragonclaw, Twice Whisperer, and Whisperers/Wide Whisper as institutional/timeline anchors, not single continuous biographies.
- Kept `canonical_flavor_text` empty because exact card text and flavor remain manual-fill material.
- Did not edit TEMUR raw claims, source records, or placement records.
- Corrected adjacent SULTAI/JESKAI quick-reading color-order assertions only after `test:placement` exposed stale expectations and runtime/search output already used the correct identity order.

## TEMUR Claim / Source / Placement Hash Guard

- `data/raw-factions/temur/temur.claims.json`: `98FB34502C486F910616C62413FCA80EA32DECAAD6C0794CA7933A6E3A75F6E4`
- `data/raw-factions/temur/temur.sources.json`: `50FE2D08DFBD3DEF79B22129F1B764E3127CD8EC1B5CA66C18559C75D3D1C7BF`
- `data/raw-factions/temur/temur.placement.json`: `C5C01703FAFB523E7B6F44719D72D9B5F783E2136D82419A68F3ECD81BD91E1B`

These hashes matched before and after VM-316.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed: JSON parse checks for touched raw/display/generated JSON before and after edits.
- Baseline probe: TEMUR had no `raw_enrichment`, empty `deck_links`, empty `research_links`, 0 raw key figures, 0 raw canonical flavor entries, non-empty mechanics, and VM-300 green status.
- Passed with expected warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR`.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=TEMUR`.
- Final probe: TEMUR has `research_links.edhrec_slug`, 1 deck link, `raw_enrichment`, 3 display timeline entries, 5 display key figures/anchors, 0 display flavor entries, 5 raw key figures/anchors, and 0 raw flavor entries.
- Passed with expected warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Passed after stale assertion fixes: `npm.cmd run test:placement`.

## Risks / Uncertainties

- Lorehold, Abzan, Sultai, and Temur still report expected model-owned biological-prior inhibitor warnings under target validation.
- The worktree remains broadly dirty outside VM-316.
- `data/factions.json` is both display input and generated output in this build flow, so VM-316 accepted only TEMUR display diffs traceable to touched source/display inputs.
- SULTAI/JESKAI quick-reading expectation fixes are adjacent harness cleanup discovered by `test:placement`, not SULTAI/JESKAI data or runtime behavior changes.

## Not Touched

- No web search.
- No VM-236 runtime copy polish execution.
- No TEMUR raw claims, raw sources, or raw placement changes.
- No TEMUR placement axes, good/poor fit indicators, inhibitor traps, discriminator questions, mechanics, or claim counts.
- No placement schema shape changes.
- No flavor snippet authoring.
- No Maze behavior, route behavior, Home preview, public alias, or validator policy changes.
- No generated placement output was hand-edited as source.
- No unrelated generated drift was accepted.

## Follow-Up Recommendations

- Review the next thin display/source target from the current board state, or explicitly start backlog `VM-236` if Sultai visible copy polish becomes priority.
- Keep exact TEMUR card text/flavor, Ferocious/Formidable rules text, Yasova's full Bolas arc, exact Endless Song temporal mechanics, modern character biographies, clan dragon diplomacy, Commander legality, and deck/product facts as manual-fill or future card-data work.
- Continue using VM-305 targeted context mode whenever full build rewrites unrelated Supabase context.

## Next Suggested Agent

JSON Cartographer for the next source-first display/profile pass, or frontend/runtime repair agent only if the user explicitly starts VM-236.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-316-temur-display-enrichment.md`
- `docs/kanban/done/VM-315-sultai-display-enrichment.md`
- `docs/kanban/done/VM-314-abzan-display-enrichment.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-222-temur-dossier-link-maze-qa-repair.md`
- `docs/kanban/done/VM-221-temur-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
