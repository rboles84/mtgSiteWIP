# 2026-06-12 11:20 - Codex - VM-348 Four-Color Source-Bound Cohort Repair

## Agent Name

Codex, acting as Planning Architect / JSON Cartographer / Test Strategist.

## Task Requested

Make the five four-color source packets better in one VM-348 source-bound pass: normalize source roles, add readiness tracking, add supported ring discriminators/collisions and Crucibles, surface raw enrichment, add support-only Commander/deck dossier data, rebuild generated artifacts, validate, and close Kanban.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/kanban/done/VM-303-glint-source-first-authoring-pass.md`
- `docs/kanban/done/VM-304-ink-source-first-authoring-pass.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/kanban/done/VM-328-witch-source-generated-authority-repair.md`
- `docs/kanban/done/VM-330-four-color-layer-1-authority-sweep.md`
- `docs/kanban/done/VM-346-strixhaven-college-source-bound-cohort-repair.md`
- `docs/kanban/done/VM-347-shard-and-tarkir-clan-source-bound-cohort-repair.md`
- `docs/reference/source-generated-guardrails.md`
- `data/raw-factions/yore/*`
- `data/raw-factions/glint/*`
- `data/raw-factions/dune/*`
- `data/raw-factions/ink/*`
- `data/raw-factions/witch/*`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/raw-factions/yore/yore.sources.json`
- `data/raw-factions/yore/yore.profile.json`
- `data/raw-factions/yore/yore.placement.json`
- `data/raw-factions/yore/yore.changelog.json`
- `data/raw-factions/glint/glint.sources.json`
- `data/raw-factions/glint/glint.profile.json`
- `data/raw-factions/glint/glint.placement.json`
- `data/raw-factions/glint/glint.changelog.json`
- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `data/raw-factions/ink/ink.sources.json`
- `data/raw-factions/ink/ink.profile.json`
- `data/raw-factions/ink/ink.placement.json`
- `data/raw-factions/ink/ink.changelog.json`
- `data/raw-factions/witch/witch.sources.json`
- `data/raw-factions/witch/witch.profile.json`
- `data/raw-factions/witch/witch.placement.json`
- `data/raw-factions/witch/witch.changelog.json`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/reference/four-color-source-readiness-matrix.md`
- `docs/kanban/done/VM-348-four-color-source-bound-cohort-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-12-1120-codex-vm348-four-color-cohort-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Confirmed `VM-348` was unused by repo text search, Kanban/handoff search, and git history checks.
- Normalized five target source files to the current `source_role` vocabulary.
- Kept all five target claim ledgers at exactly five claims.
- Added support-only raw profile `deck_links`, `research_links`, and curated `commander_compass` data for all five targets from approved local support rows.
- Added one adjacent-ring discriminator per non-Witch identity and revised Witch's third discriminator for Yore adjacency.
- Added builder-readable `collision_guidance.pairs` for the canonical ring, all with `lateral_inhibition: false`.
- Updated the builder to surface raw profile enrichment for `YORE`, `GLINT`, `DUNE`, `INK`, and `WITCH`, consume raw profile `deck_links`/`research_links`, read object-shaped `collision_guidance.pairs`, preserve object-level metadata, and avoid adding lateral inhibition from raw questions marked `lateral_inhibition: false`.
- Added five supported Crucibles: `crucible_YORE_GLINT`, `crucible_GLINT_DUNE`, `crucible_DUNE_INK`, `crucible_INK_WITCH`, and `crucible_WITCH_YORE`.
- Added focused raw/source-role, generated enrichment, support-only Commander/deck, close-call discriminator, collision metadata, and Crucible assertions.
- Created the four-color readiness matrix and closed the Kanban card.

## Why It Changed

The cohort already passed source-generated validation, but it lacked source-backed adjacent four-color discrimination, generated dossier richness, Commander support surfacing, and standardized source-role vocabulary. VM-348 improves those surfaces without adding claims, web intake, public aliases, routes, Home preview membership, or generated hand edits.

## Decisions Made

- `VM-348` was unused and was used.
- All five candidate Crucibles were supported by local claim-bearing rows on both sides, so none were skipped.
- New ring discriminators and pair guidance use `lateral_inhibition: false` to avoid broad suppression while improving close-call review.
- Existing stronger suppression and lateral targets were preserved.
- Commander/precon/deck fields remain support-only and cannot justify lore, philosophical claims, placement discriminators, Crucibles, claim counts, routes, aliases, or public naming.
- Generated context was finalized through `npm.cmd run build:factions -- --context-targets=YORE,GLINT,DUNE,INK,WITCH`. The context file still differs broadly from `HEAD` because the worktree already carried broad generated drift; non-target context drift is not classified as VM-348-owned.

## Risks / Uncertainties

- The worktree remains broadly dirty with many unrelated modified, deleted, and untracked files. VM-348 preserved this state and did not clean, revert, stage, or normalize unrelated files.
- Four-color raw folders remain untracked in git status and should be treated as intended project files.
- `supabase/functions/guild-recruiter/faction-context.ts` differs broadly from `HEAD`; final VM-348 builder invocation was targeted to the five identities, but prior/generated non-target drift remains present.
- `data/identity-layers.json`, route files, and shard/clan raw files show pre-existing drift versus `HEAD`; VM-348 did not accept or edit those surfaces.

## Tests Run

- Pass: raw JSON parse, source-role vocabulary, and five-claim assertion before and after edits.
- Pass: `node --check research/build-faction-artifacts.mjs`
- Pass: `node --check assets/js/quick-reading-tests.js`
- Pass: `node --check research/archscry-dossier-followup-tests.js`
- Pass: `npm.cmd run build:factions`
- Pass: `npm.cmd run build:factions -- --context-targets=YORE,GLINT,DUNE,INK,WITCH`
- Pass, 0 warnings: `npm.cmd run validate:source-generated -- --targets=YORE,GLINT,DUNE,INK,WITCH`
- Pass with 2 expected model-owned Jeskai/Mardu warnings: `npm.cmd run test:source-generated`
- Pass: `npm.cmd run test:placement`
- Pass: `npm.cmd test`
- Pass: `npm.cmd run test:parser`
- Pass: `node research/archscry-dossier-followup-tests.js`
- Pass: `node research/maze-search-tests.js`
- Pass: focused identity-layer guardrail assertion for target aliases, preview flags, and directory suppression.
- Pass: focused Crucible assertion confirming the five VM-348 Crucibles exist and no extra unsupported four-color Crucibles were generated.
- Pass: `git diff --check` on VM-348-owned code/docs/generated surfaces, with only existing LF-to-CRLF warnings.

## Not Touched

- No web search or source intake.
- No raw claim additions.
- No generated hand edits.
- No WUBRG/five-color work.
- No Colorless work.
- No Home preview, route, alias, identity-key, hero eligibility, or public key changes.
- No unmanaged discovery draft promotion.
- No shard/clan VM-347 source repair work.
- No staging, commit, reset, cleanup, or unrelated-file normalization.

## Follow-Up Recommendations

- Consider a future source-intake card for richer official card facts and direct quotations for Yore-Tiller, Glint-Eye, Dune-Brood, Ink-Treader, and Witch-Maw.
- Consider a separate generated-context hygiene card if the repo needs to separate current broad Supabase context drift from future targeted context outputs.
- Keep future four-color Commander additions support-only unless a card explicitly adds and classifies new approved support rows.

## Next Suggested Agent

JSON Cartographer for any future source-intake or generated-context hygiene card.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-348-four-color-source-bound-cohort-repair.md`
- `docs/reference/four-color-source-readiness-matrix.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/kanban/done/VM-330-four-color-layer-1-authority-sweep.md`
