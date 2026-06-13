# 2026-06-12 06:44 - Codex - Ravnica Guild Source Normalization

## Agent Name

Codex

## Task Requested

Execute the continuous Ravnica guild source normalization goal across all ten guilds: normalize source roles, create the source-readiness matrix, repair only Rakdos/Golgari discriminator softness, rebuild generated artifacts through approved scripts, validate the full guild cohort, and close Kanban/handoff documentation.

## Pre-Flight Summary

Recent related work:

- VM-300 added source/generated guardrails and made generated output comparison-only.
- VM-325 established the source-bound gold standard rule.
- VM-306 showed the accepted pattern for source-first raw repair, generated rebuild, and target-scoped context handling.
- VM-337 through VM-342 occupied the Colorless lane and warned against product/runtime expansion outside explicit approval.

Current known risks:

- The worktree was already broadly dirty before this task, including generated files, runtime files, docs, Colorless files, and unrelated raw packets.
- Generated files were dirty before this task; VM-345 used a prebuild snapshot to avoid accepting unrelated generated context churn.
- Story-corpus rows can look claim-adjacent, but search/query/archive rows remain discovery-only unless a source-reading card promotes exact claims.

Relevant decisions already made:

- Raw packets and approved ledgers are source authority.
- Generated/runtime files are rebuild outputs and comparison targets, not evidence.
- No web search, model-memory MTG facts, new claims, new sources, or lore rewrite is allowed for this goal.
- VM-343 through VM-345 were available and used as requested.

Files recently changed by related work:

- Source/generated guardrail docs and validator scripts.
- Colorless raw/docs/runtime/generated surfaces.
- UR/RG profile/changelog mechanics work from VM-306.

What should not be touched:

- Home, Maze behavior, public routes, product surfaces, Colorless, WUBRG, four-color work, unrelated raw packets, unrelated docs cleanup, or generated files by hand.

## Files Reviewed

- `AGENTS.md`
- User attached goal brief
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- VM-300, VM-325, VM-306, VM-337, VM-338, VM-339, VM-340, VM-341, and VM-342 cards and handoffs
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/workflow.md`
- Ten guild raw folders under `data/raw-factions/`
- `research/build-faction-artifacts.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `package.json`

## Files Changed

- `data/raw-factions/azorius_senate/azorius_senate.sources.json`
- `data/raw-factions/boros_legion/boros_legion.sources.json`
- `data/raw-factions/house_dimir/house_dimir.sources.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.sources.json`
- `data/raw-factions/gruul_clans/gruul_clans.sources.json`
- `data/raw-factions/izzet_league/izzet_league.sources.json`
- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.sources.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.sources.json`
- `data/raw-factions/selesnya_conclave/selesnya_conclave.sources.json`
- `data/raw-factions/simic_combine/simic_combine.sources.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.placement.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.placement.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-343-ravnica-guild-source-role-normalization.md`
- `docs/kanban/done/VM-344-rakdos-golgari-placement-calibration-repair.md`
- `docs/kanban/done/VM-345-ravnica-guild-generated-rebuild-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-0644-codex-ravnica-guild-source-normalization.md`

## What Changed

- Added `source_role` to all 158 active source rows across the ten Ravnica guild source ledgers.
- Added the reusable source-readiness matrix at `docs/reference/ravnica-guild-source-readiness-matrix.md`.
- Added exactly one Rakdos discriminator: `rakdos_q3`.
- Added exactly one Golgari discriminator: `golgari_q3`.
- Rebuilt generated artifacts through approved scripts.
- Closed VM-343, VM-344, and VM-345 in Kanban.

## Why It Changed

The guild packets needed to match the current VM-325 source-bound standard so future agents can tell whether a row is claim proof, support texture, shaping context, or discovery material. Rakdos and Golgari also needed one targeted calibration repair each to reduce known placement softness without adding new lore or source material.

## Decisions Made

- Marked corpus query/archive rows as `discovery-only` unless the row already represented inspected, claim-bound source reading.
- Marked Gruul/Izzet inspected repository archive rows as `claim-bearing` only where existing atomic claims/profile/placement fields already use them.
- Marked Dragon's Maze cross-check rows as `support-only` where they are not direct claim proof.
- Added no new sources and no new canon claims.
- Used a generated prebuild snapshot so only BR/BG generated drift was accepted after the required rebuilds.

## Risks / Uncertainties

- The broader dirty worktree remains and was not staged, cleaned, or reverted.
- Future source hardening could replace claim-bearing repository archive copies with official Wizards page captures where available.
- Current source-role normalization is documented and parsed, but a future validator could make role completeness executable.
- Story-corpus discovery rows are intentionally not promoted by this card.

## Tests Run

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `npm.cmd run test:faction-context-isolation`
- Pass: Guild raw JSON parse for 50 files
- Pass: Source-role probe for all 158 active guild source rows
- Pass: BR/BG discriminator claim/source-role backing probe
- Pass: Generated JSON parse for `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, and `data/archscry-flavor-snippets.json`
- Pass: `npm.cmd run build:factions`
- Pass: `npm.cmd run build:factions -- --context-targets=WU,WR,UB,BG,RG,UR,WB,BR,WG,UG`
- Pass with 10 accepted model-owned inhibitor warnings: `npm.cmd run validate:source-generated -- --targets=WU,WR,UB,BG,RG,UR,WB,BR,WG,UG`
- Pass with 2 accepted model-owned inhibitor warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Pass: `npm.cmd run test:placement`
- Pass: `npm.cmd test`
- Pass: `npm.cmd run test:parser`
- Final scoped `git diff --check` recorded in the main closeout.

Generated drift review:

- `data/factions.json`, `data/archscry-flavor-snippets.json`, and `data/placement-model.schema.json` were unchanged from the prebuild snapshot.
- `data/placement-model.json` changed only `BR` and `BG`.
- `supabase/functions/guild-recruiter/faction-context.ts` changed only `BR` and `BG` after the target-scoped context rebuild.

## Not Touched

- No files staged or committed.
- No web search.
- No raw claims, profiles, or changelogs edited.
- No new sources or canon facts added.
- No Home, Maze behavior, routes, public product surfaces, Colorless, WUBRG, four-color, unrelated raw packets, images, or UI changes.
- No generated files hand-edited as source.

## Follow-Up Recommendations

- Add an executable source-role completeness validator if future cards need this enforced automatically.
- Replace claim-bearing repository archive copies with official Wizards page captures where exact source authority becomes important.
- Promote discovery-only story rows only through a future source-reading/source-intake card with specific claim mappings.

## Next Suggested Agent

JSON Cartographer for any future guild story-source promotion or Test Strategist for a source-role validator.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-343-ravnica-guild-source-role-normalization.md`
- `docs/kanban/done/VM-344-rakdos-golgari-placement-calibration-repair.md`
- `docs/kanban/done/VM-345-ravnica-guild-generated-rebuild-review-gate.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/workflow.md`
