# VM-348 - Four-Color Source-Bound Cohort Repair

Status: Done
Owner: Codex
Created: 2026-06-12
Completed: 2026-06-12

## Summary

Repair the five four-color lanes in one source-bound pass:

YORE, GLINT, DUNE, INK, WITCH

Canonical close-call ring:

YORE -> GLINT -> DUNE -> INK -> WITCH -> YORE

The current source-generated state is valid but shallow. `validate:source-generated -- --targets=YORE,GLINT,DUNE,INK,WITCH` passes with zero warnings, but the cohort lacks four-color close-call Crucibles, has uneven adjacent-peer discriminator coverage, has nonstandard source-role values, and leaves existing raw profile enrichment mostly unsurfaced.

This is enrichment and calibration, not corruption repair.

## Pre-Flight Results

- `VM-348` was confirmed unused by repo text search, Kanban/handoff search, `git log --all --grep=VM-348`, and `git log --all --name-only --oneline -- "*VM-348*"`.
- Full and scoped git status showed a broad dirty worktree. Preserve unrelated drift.
- Four-color raw folders are currently untracked. Treat them as intended project files and do not delete, move, rename, or normalize unrelated untracked files.
- Baseline JSON parse and five-claim assertion passed for all five targets.
- Baseline `npm.cmd run validate:source-generated -- --targets=YORE,GLINT,DUNE,INK,WITCH` passed with zero warnings.
- A focused source-role assertion fails only on planned nonstandard rows: lifecycle rows and manual-fill rows.

## Scope

- Normalize target source roles to the current vocabulary:
  - `claim-bearing`
  - `support-only`
  - `shaping-only`
  - `discovery-only`
- Convert lifecycle rows to `shaping-only`.
- Convert manual-fill gap rows to `discovery-only`.
- Keep all five raw claim counts exactly five.
- Surface existing raw profile enrichment for the five targets through `research/build-faction-artifacts.mjs`.
- Add support-only deck links, conservative research links, and curated support-only Commander Compass data from approved local support rows.
- Add supported ring Crucibles for:
  - `YORE/GLINT`
  - `GLINT/DUNE`
  - `DUNE/INK`
  - `INK/WITCH`
  - `WITCH/YORE`
- Add or repair builder-readable collision guidance for those pair boundaries.
- Default new pair guidance to `lateral_inhibition: false`.
- Add one ring-focused discriminator for each non-Witch lane and revise Witch's third discriminator for adjacent four-color coverage.
- Add `docs/reference/four-color-source-readiness-matrix.md`.

## Guardrails

- No web search, model-memory lore, inferred MTG lore, official-name overclaims, or generated-to-raw laundering.
- Generated/runtime files are comparison targets or rebuild outputs only. Do not hand-edit generated artifacts.
- Commander/precon/deck links remain support-only and must not justify lore claims, philosophical claims, placement discriminators, Crucible copy, or claim-count changes.
- Do not promote unmanaged discovery drafts into `claim-bearing`, `support-only`, or `shaping-only` evidence.
- Do not weaken or overwrite existing approved stronger suppression, rule text, review trigger, or pair metadata.
- Do not touch WUBRG/five-color, Colorless, Home, routes, aliases, identity keys, hero eligibility, public key surfaces, shard/clan VM-347 work, Supabase context outside targeted rebuild outputs, or unrelated dirty files.

## Acceptance Criteria

- [x] All five target raw source files use only standard `source_role` values.
- [x] All five claim counts remain exactly five.
- [x] All five supported ring Crucibles exist in `data/placement-model.json` after rebuild.
- [x] Unsupported Crucibles, if any, are skipped and recorded in the readiness matrix. No unsupported VM-348 Crucibles remained.
- [x] All five generated dossier records expose source-backed raw enrichment where raw enrichment exists.
- [x] Commander/deck fields remain explicitly support-only.
- [x] Generated drift is limited to source-backed target changes from approved builder flow for VM-348-owned generated surfaces.
- [x] No VM-348 route, alias, identity key, Home, Colorless, WUBRG, shard, or clan surface change was accepted. A drift audit still shows broad pre-existing dirty-worktree differences versus `HEAD`.
- [x] Kanban card and readiness matrix are complete. Handoff is required at closeout.

## Test Plan

- JSON parse all five raw packets before and after edits.
- Assert no nonstandard `source_role` values remain in the five target source files; if ambiguity prevents safe normalization, fail this assertion intentionally and record the unresolved row instead of guessing.
- Assert all five claim counts remain exactly five.
- `node --check research/build-faction-artifacts.mjs`
- `npm.cmd run build:factions`
- Inspect generated drift and accept only source-backed target changes.
- `npm.cmd run build:factions -- --context-targets=YORE,GLINT,DUNE,INK,WITCH`
- `npm.cmd run validate:source-generated -- --targets=YORE,GLINT,DUNE,INK,WITCH`
- `npm.cmd run test:source-generated`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run test:parser`
- `node research/archscry-dossier-followup-tests.js`
- `node research/maze-search-tests.js`

## Notes

- No new source intake is authorized in this card.
- Missing richness becomes a follow-up source-intake card.
- Generated artifacts must be regenerated from raw/builder inputs only.

## Completion Summary

- Normalized lifecycle source rows to `shaping-only` and manual-fill gap rows to `discovery-only`.
- Added support-only `deck_links`, `research_links`, and curated `commander_compass` data to all five raw profiles from approved local support rows.
- Added one adjacent-ring discriminator per non-Witch identity and revised Witch's third discriminator for Yore adjacency while keeping VM-348 ring additions `lateral_inhibition: false`.
- Added builder support for object-shaped `collision_guidance.pairs` while preserving `review_triggers`, `rule`, and stronger metadata fields.
- Added the five supported ring Crucibles.
- Surfaced raw profile enrichment for all five targets through the builder.
- Added focused raw/source-role, generated enrichment, support-only Commander, close-call discriminator, collision metadata, and Crucible assertions.

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
- Pass: focused identity-layer guardrail assertion for the five target aliases, preview flags, and directory suppression.
- Pass: focused Crucible assertion confirming the five VM-348 Crucibles exist and no extra unsupported four-color Crucibles were generated.
- Pass: `git diff --check` on VM-348-owned code/docs/generated surfaces, with only existing LF-to-CRLF warnings.
