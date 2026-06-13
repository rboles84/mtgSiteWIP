# 2026-06-09 21:42 - Codex - VM-315 SULTAI Source-First Display Enrichment

## Agent Name

Codex

## Task Requested

Implement VM-315: repair SULTAI's display-quality gap from local approved sources only, without starting VM-236 runtime copy polish, editing raw claims/sources, touching placement/schema/Maze/routes/flavor snippets, or accepting unrelated generated drift.

## Pre-Flight Summary

Recent related work: VM-300 established source/generated guardrails; VM-305 added targeted Supabase context rebuilds; VM-307 and VM-314 established the current source-first mechanics/display pass patterns; VM-209 through VM-214 created, reviewed, and promoted SULTAI as exactly one live key.

Current known risks: the worktree is broadly dirty with unrelated tracked and untracked drift; full `build:factions` can still rewrite unrelated Supabase context entries; `npm.cmd run test:placement` has the known unrelated Temur color-order assertion.

Relevant decisions already made: SULTAI is the only live Sultai key; `BGU` and permutations remain metadata/query-only; raw claims/sources are protected; VM-236 is Backlog reserved and not started; `data/factions.json` may serve as approved display input but cannot prove placement/profile durability.

Files recently changed by related work include `data/factions.json`, `data/identity-layers.json`, raw Abzan/Lorehold/UR/RG files, `data/placement-model.json`, Supabase context, board, and handoff docs. VM-315 preserved unrelated drift and did not stage, revert, normalize, or clean unrelated files.

What should not be touched: VM-236 runtime copy polish, SULTAI raw claims/sources, placement axes, discriminators, inhibitors, mechanics, claim counts, generated placement output, placement schema, generated flavor snippets, Maze behavior, routes, Home preview, public aliases, and exact card/Commander facts.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-1404-codex-vm305-supabase-context-isolation.md`
- `docs/handoffs/2026-06-09-2000-codex-vm307-lorehold-mechanics-signal-balance.md`
- `docs/handoffs/2026-06-09-2107-codex-vm314-abzan-display-enrichment.md`
- Sultai VM-209 through VM-214 cards and handoffs
- VM-236 Sultai backlog card and reservation handoff
- `docs/research/sultai/**`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.changelog.json`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.sources.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/identity-layers.json`
- `data/factions.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-315-sultai-display-enrichment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-2142-codex-vm315-sultai-display-enrichment.md`

## What Changed

- Added SULTAI display-source deck metadata in `data/identity-layers.json::expressions.SULTAI.display.deck_links`.
- Added `data/identity-layers.json::expressions.SULTAI.display.research_links.edhrec_slug = "sultai"`.
- Added `data/factions.json::factions.SULTAI.raw_enrichment` with 3 timeline entries, 5 figure/institutional anchors, and intentionally empty `canonical_flavor_text`.
- Added 5 tightly bounded raw anchors in `data/raw-factions/sultai/sultai.profile.json`: Queen Sidisi, Tasigur, The Fangkeeper, The Lasyd, and Sibsig and honored dead.
- Updated SULTAI raw profile incremental dates and added a VM-315 changelog entry.
- Created and completed VM-315 Kanban/handoff bookkeeping.

## Why It Changed

SULTAI already passed source/generated placement validation, but display-facing data was thin. VM-315 fills that display gap from existing local source backing while preserving the source-first rule that placement/profile durability must come from raw source data and not generated output.

## Evidence Used

- `SULTAI-EVID-005`: Khans-era necromancy and sibsig labor.
- `SULTAI-EVID-009`: Queen Sidisi as Khans-era khan and queen.
- `SULTAI-EVID-012`: Tasigur as Fate Reforged Sultai fortune heir.
- `SULTAI-EVID-019`: Khanfall transition context for Tasigur and the no-khan boundary.
- `SULTAI-EVID-024`: The Fangkeeper and Lasyd modern governance/military floor.
- `SULTAI-EVID-026`: Modern honored-dead / Rite of Renewal boundary.
- Source IDs used: `src_wotc_tarkir_khans_pg_part_1`, `src_wotc_tarkir_fate_reforged_pg`, `src_wotc_tarkir_story_khanfall`, `src_wotc_tarkir_dragons_pg_part_1`, and `src_wotc_tarkir_dragonstorm_pg_part_2`.
- Deck/research link metadata follows existing wedge display convention only and is not lore evidence.

## Generated Objects Accepted / Restored

- Accepted `data/factions.json::factions.SULTAI.research_links.edhrec_slug`.
- Accepted `data/factions.json::factions.SULTAI.deck_links`.
- Accepted `data/factions.json::identity_layers.expressions.SULTAI.display.research_links.edhrec_slug`.
- Accepted `data/factions.json::identity_layers.expressions.SULTAI.display.deck_links`.
- Accepted no `data/placement-model.json` content drift; snapshot diff showed zero changed paths.
- Accepted no `data/placement-model.schema.json` content drift.
- Accepted no `data/archscry-flavor-snippets.json` content drift.
- Full build rewrote `supabase/functions/guild-recruiter/faction-context.ts` for unrelated `WITCH`; restored the exact pre-build context snapshot at `supabase/functions/guild-recruiter/faction-context.ts`.
- Ran `npm.cmd run build:factions -- --context-targets=SULTAI`; final context stayed byte-identical, so no Supabase context changes were accepted.

## Decisions Made

- Put `edhrec_slug` under display research metadata, not SULTAI routing metadata, to preserve layered placement identity.
- Treated the Fangkeeper, Lasyd, and sibsig/honored dead as institutional/timeline anchors with explicit limitations rather than full person biographies.
- Kept `canonical_flavor_text` empty because exact card text and flavor remain manual-fill material.
- Did not edit SULTAI raw claims or source records.
- Did not start or move VM-236.

## SULTAI Claim / Source Hash Guard

- `data/raw-factions/sultai/sultai.claims.json`: `86E3E603508C714D6F1D938D91FD171C450FECA4D744EA1A82BB0956433DA0C8`
- `data/raw-factions/sultai/sultai.sources.json`: `9090CCE62C2A419CBD6AB9CE1C7CB82D3DC5890596B6BC4B314C11CA9BDCEB5E`

These hashes matched before and after VM-315.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed: JSON parse checks for touched raw/display/generated JSON before and after edits.
- Baseline probe: SULTAI had no `raw_enrichment`, empty `deck_links`, empty `research_links`, 0 raw key figures, 0 raw canonical flavor entries, non-empty mechanics, and VM-300 green status.
- Passed with expected warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI`.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=SULTAI`.
- Final probe: SULTAI has `research_links.edhrec_slug`, 1 deck link, `raw_enrichment`, 3 display timeline entries, 5 display key figures/anchors, 0 display flavor entries, 5 raw key figures/anchors, and 0 raw flavor entries.
- Passed with expected warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Known unrelated residual only: `npm.cmd run test:placement`.
- Passed with existing LF/CRLF warnings only: scoped `git diff --check`.
- Passed: focused trailing-whitespace scan.

Known `test:placement` residual:

```text
 'Temur Frontier commanders with exactly green-blue-red identity'
-'Temur Frontier commanders with exactly blue-red-green identity'
```

## Risks / Uncertainties

- Lorehold, Abzan, and Sultai still report expected model-owned biological-prior inhibitor warnings under target validation.
- `npm.cmd run test:placement` still fails only on the known unrelated Temur color-order assertion.
- The worktree remains broadly dirty outside VM-315.
- `data/factions.json` is both display input and generated output in this build flow, so VM-315 accepted only SULTAI display diffs traceable to touched source/display inputs.

## Not Touched

- No web search.
- No VM-236 runtime copy polish execution.
- No SULTAI raw claims or source records.
- No SULTAI placement axes, good/poor fit indicators, inhibitor traps, discriminator questions, mechanics, claim counts, or placement schema.
- No flavor snippet authoring.
- No Maze behavior, route behavior, Home preview, public alias, or validator policy changes.
- No generated placement output was hand-edited as source.
- No unrelated generated drift was accepted.

## Follow-Up Recommendations

- Next recommended source-first target: `TEMUR`, unless the user explicitly starts backlog `VM-236` for visible Sultai copy polish.
- Keep exact SULTAI card text/flavor, Sidisi/Tasigur full biographies, Fangkeeper/Lasyd individual biographies, Kotis/Teval details, Commander legality, and deck/product facts as manual-fill or future card-data work.
- Continue using VM-305 targeted context mode whenever full build rewrites unrelated Supabase context.

## Next Suggested Agent

JSON Cartographer for the Temur source-first display/profile pass, or frontend/runtime repair agent only if the user explicitly starts VM-236.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-315-sultai-display-enrichment.md`
- `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md`
- `docs/kanban/done/VM-314-abzan-display-enrichment.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-214-sultai-brood-controlled-runtime-promotion.md`
