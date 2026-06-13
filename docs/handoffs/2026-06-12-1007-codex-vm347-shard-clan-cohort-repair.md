# 2026-06-12 10:07 - Codex - VM-347 Shard/Clan Cohort Repair

## Agent

Codex

## Task Requested

Repair all five Alara shards and all five Tarkir clans in one source-bound pass: normalize source roles, add readiness tracking, repair placement discrimination and Crucible coverage where locally supported, improve shard/clan raw-profile enrichment, fill Mardu/Jeskai support-only Commander Compass surfaces where backed, rebuild generated artifacts, validate, and close the Kanban card.

Related card: `VM-347 - Shard And Tarkir Clan Source-Bound Cohort Repair`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- Relevant done cards and handoffs for `VM-299`, `VM-300`, `VM-314` through `VM-323`, `VM-325`, and `VM-343` through `VM-346`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- Local canon pre-flight paths:
  - `docs/research/canon/canon-inventory-four-color-reference-audit.md`
  - `docs/research/canon/mark_rosewater_official_three_color/`
  - `docs/research/canon/misc/`
  - `docs/research/canon/source-material/`
- Target raw packets under `data/raw-factions/{bant,esper,grixis,jund,naya,abzan,temur,sultai,mardu,jeskai}/`
- `research/build-faction-artifacts.mjs`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- Kanban/docs:
  - `docs/kanban/board.md`
  - `docs/kanban/done/VM-347-shard-and-tarkir-clan-source-bound-cohort-repair.md`
  - `docs/reference/shard-clan-source-readiness-matrix.md`
  - `docs/handoffs/HANDOFF_INDEX.md`
  - `docs/handoffs/2026-06-12-1007-codex-vm347-shard-clan-cohort-repair.md`
- Source role normalization:
  - `data/raw-factions/bant/bant.sources.json`
  - `data/raw-factions/esper/esper.sources.json`
  - `data/raw-factions/grixis/grixis.sources.json`
  - `data/raw-factions/mardu/mardu.sources.json`
  - `data/raw-factions/jeskai/jeskai.sources.json`
- Placement repairs:
  - `data/raw-factions/esper/esper.placement.json`
  - `data/raw-factions/grixis/grixis.placement.json`
  - `data/raw-factions/naya/naya.placement.json`
  - `data/raw-factions/abzan/abzan.placement.json`
  - `data/raw-factions/temur/temur.placement.json`
  - `data/raw-factions/sultai/sultai.placement.json`
  - `data/raw-factions/jeskai/jeskai.placement.json`
- Commander Compass support:
  - `data/raw-factions/mardu/mardu.profile.json`
  - `data/raw-factions/jeskai/jeskai.profile.json`
- Builder/generated/test surfaces:
  - `research/build-faction-artifacts.mjs`
  - `data/factions.json`
  - `data/placement-model.json`
  - `data/placement-model.schema.json`
  - `supabase/functions/guild-recruiter/faction-context.ts`
  - `assets/js/quick-reading-tests.js`
  - `research/archscry-dossier-followup-tests.js`

## What Changed

- Created and closed `VM-347`.
- Added `source_role` coverage for all Bant, Esper, and Grixis source rows.
- Normalized nonstandard Mardu/Jeskai roles into the approved vocabulary:
  - `runtime-lifecycle-only` -> `shaping-only`
  - `manual-fill` -> `support-only`
  - `excluded-from-raw-claims` -> `discovery-only`
- Added the readiness matrix at `docs/reference/shard-clan-source-readiness-matrix.md`.
- Added source-backed discriminator/collision repairs:
  - Esper: Bant and Grixis tie-breakers.
  - Grixis: Esper and Jund tie-breakers/collisions.
  - Naya: Jund and Bant tie-breakers/collisions.
  - Abzan: Mardu and Sultai tie-breakers/collisions.
  - Temur: Sultai, Mardu, and Jeskai tie-breakers/collisions.
  - Sultai: Abzan, Temur, and Jeskai tie-breakers/collisions.
  - Jeskai: repaired broken non-array `collision_guidance` into backed Mardu/Sultai/Temur collision entries.
- Added all 12 supported candidate Crucible pairs:
  - `BANT/ESPER`, `ESPER/GRIXIS`, `GRIXIS/JUND`, `JUND/NAYA`, `NAYA/BANT`
  - `ABZAN/MARDU`, `ABZAN/SULTAI`, `TEMUR/SULTAI`, `TEMUR/MARDU`, `JESKAI/MARDU`, `JESKAI/SULTAI`, `JESKAI/TEMUR`
- Added a cohort-scoped raw-profile enrichment allowlist for `LOREHOLD` plus the 10 VM-347 targets.
- Added support-only Mardu/Jeskai Commander Compass data from the local Commander JSONL source.
- Added a narrow builder sanitizer so generated Bant runtime artifacts do not expose uppercase `WUG` outside allowed query-style metadata.
- Updated tests to reflect new backed Temur/Sultai/Jeskai lateral targets and sanitized Bant Commander query expectations.

## Why It Changed

The target cohort already had broad identity copy, but the weakest lane was final-stage discrimination: several shards/clans had no discriminator questions, no Crucible pairs, and missing or nonstandard source-role data. VM-347 repairs that quality layer while preserving source-first guardrails and avoiding Commander/operator contamination of placement evidence.

## Decisions Made

- All candidate Crucible pairs were supported by existing local claim-bearing or placement-relevant shaping rows, so none were left unsupported.
- Mardu raw `collision_guidance` stayed empty because its existing discriminator content was valid and non-broken; pair resolution is covered from adjacent repaired identities plus Crucibles.
- Jeskai collision guidance was edited despite being a non-candidate discriminator identity because the existing `collision_guidance` object shape was ignored by the builder.
- Mardu/Jeskai top-level `research_links` and `deck_links` were not filled. Support navigation was placed inside Commander Compass `link_targets` only, preserving support-only boundaries.
- No web/source intake was performed.

## Risks / Uncertainties

- The worktree was already very dirty before VM-347. Generated drift relative to `HEAD` includes unrelated existing changes and previously dirty generated state.
- The full builder rewrites large generated surfaces. Prebuild full hashes were captured:
  - `data/factions.json` `bc03554a4004e223`
  - `data/placement-model.json` `550bd117f270108a`
  - `data/archscry-flavor-snippets.json` `e7a396ef3bd68c27`
  - `supabase/functions/guild-recruiter/faction-context.ts` `4bb573a326ab1bab`
- Final full hashes:
  - `data/factions.json` `b24d4b33567fcb7a`
  - `data/placement-model.json` `bf0d591d0f98c722`
  - `data/archscry-flavor-snippets.json` `e7a396ef3bd68c27`
  - `supabase/functions/guild-recruiter/faction-context.ts` `02a7910ad181d89e`
- `data/archscry-flavor-snippets.json` was not changed by VM-347's build path.
- Existing generated raw enrichment on unrelated identities was observed. VM-347's builder change is cohort-scoped, but the dirty generated file already carried unrelated enrichment state.

## Tests Run

- `node --check research/build-faction-artifacts.mjs` - pass
- `npm.cmd run build:factions` - pass
- `npm.cmd run build:factions -- --context-targets=BANT,ESPER,GRIXIS,JUND,NAYA,ABZAN,TEMUR,SULTAI,MARDU,JESKAI` - pass
- `npm.cmd run validate:source-generated -- --targets=BANT,ESPER,GRIXIS,JUND,NAYA,ABZAN,TEMUR,SULTAI,MARDU,JESKAI` - pass with 10 expected model-owned inhibitor warnings
- `npm.cmd run test:source-generated` - pass with 2 expected model-owned inhibitor warnings
- `npm.cmd run test:placement` - pass
- `npm.cmd test` - pass
- `npm.cmd run test:parser` - pass, 115 parser cases
- `node research/archscry-dossier-followup-tests.js` - pass
- `node research/maze-search-tests.js` - pass
- Custom probes:
  - Parsed all target raw JSON files.
  - Checked all target source rows for missing/nonstandard `source_role`.
  - Checked new discriminator/collision claim IDs against local claim/source-role backing.
  - Checked all expected Crucible IDs were present.

## Not Touched

- No Home preview membership changes.
- No route, Maze route, schema-design, public key, or color-code alias changes.
- No VM-236 Sultai runtime-copy polish.
- No generated artifacts were hand-edited.
- No source intake or web verification.
- No staging or commit.

## Follow-Up Recommendations

- Optional follow-up: decide whether Mardu/Jeskai should get top-level `research_links` / `deck_links`, beyond the support-only Compass `link_targets`.
- Optional follow-up: isolate unrelated generated drift in the existing dirty worktree before any release-bound review.
- Optional follow-up: if Mardu needs raw `collision_guidance`, add it in a future card only with explicit local backing and test updates.

## Next Suggested Agent

Data/Documentation Steward for any future link-surface policy decision; otherwise no immediate follow-up required.
