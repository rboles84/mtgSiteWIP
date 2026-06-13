# VM-303 - GLINT Source-First Authoring Pass

## Status

Done

## Summary

Repaired GLINT using the VM-300 source/generated guardrail pattern after confirming DUNE remained green. The pass updated GLINT raw source backing so generated placement/profile output no longer outruns durable source fields.

## Scope Completed

- Preserved unrelated dirty worktree drift.
- Re-read AGENTS, VM-300/301/302 cards and handoffs, VM-246/249/250/251/276/277 GLINT cards and handoffs, board state, GLINT research ledgers, GLINT raw files, and generated GLINT output.
- Kept exactly five GLINT claims.
- Added VM-251 as lifecycle/live-status provenance only.
- Added builder-readable five-claim profile backing and source-bounded mechanics summary.
- Source-backed GLINT inhibitor traps, discriminator supports/weakens, collision targets, evidence claim IDs, calibration terms, strengthen/suppress lists, and false-positive guardrail.
- Rebuilt generated placement artifacts through `npm.cmd run build:factions`.
- Accepted only the GLINT object drift in `data/placement-model.json`.
- Rejected and restored regenerated Supabase context drift that included YORE, DUNE, GLINT, and WITCH sections.

## Evidence Rows

- Claim-bearing/source-bound rows used for durable claims and placement/profile boundaries: `GLINT-EVID-001`, `GLINT-EVID-002`, `GLINT-EVID-003`, `GLINT-EVID-004`, `GLINT-EVID-006`, `GLINT-EVID-010`.
- Support-bound rows used only for labeled profile/mechanics texture: `GLINT-EVID-005`, `GLINT-EVID-011`, `GLINT-EVID-012`.
- VM-251 was used only for lifecycle/live-status metadata.

## Acceptance Result

- Pre-GLINT `npm.cmd run validate:source-generated -- --targets=DUNE`: passed with 0 warnings.
- Baseline `npm.cmd run validate:source-generated -- --targets=GLINT`: failed as expected on generated-only `inhibitor_traps`.
- Final `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT`: passed with 0 warnings.
- Generated/profile output traces to exactly five claim-bearing GLINT claims.
- `data/factions.json` stayed out of scope.
- `data/placement-model.schema.json` and `data/archscry-flavor-snippets.json` had no content drift.
- `supabase/functions/guild-recruiter/faction-context.ts` was restored to its pre-build snapshot because the rebuild included non-GLINT context drift.

## Tests

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: pre-edit and post-edit JSON parse checks
- Pass: pre-GLINT `npm.cmd run validate:source-generated -- --targets=DUNE`
- Expected fail: baseline `npm.cmd run validate:source-generated -- --targets=GLINT`
- Pass: `npm.cmd run build:factions`
- Pass: generated snapshot comparison showing only GLINT changed in `data/placement-model.json`
- Pass: context restore check for `supabase/functions/guild-recruiter/faction-context.ts`
- Pass: final `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT`
- Pass with existing default-target warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement` on Temur color-order assertion only
- Pass: scoped `git diff --check`
- Pass: scoped trailing-whitespace check

## Residuals

- `npm.cmd run test:placement` still fails only on the known unrelated Temur query copy ordering assertion.
- `npm.cmd run test:source-generated` still reports the existing Jeskai/Mardu model-owned inhibitor warnings from VM-300.
- `build:factions` still rewrites non-target Supabase context sections; VM-303 restored `supabase/functions/guild-recruiter/faction-context.ts` and did not accept that drift.

## Not Touched

- No web search.
- No `data/factions.json` authoring.
- No generated placement hand edits.
- No generated flavor output edits or flavor rebuild.
- No schema shape changes.
- No accepted Supabase context drift.
- No Home, Maze, route, asset, frontend, public-display, deck-link, or Temur residual fixes.
- No YORE, DUNE, INK, or WITCH source authoring.
- No staging, commits, resets, cleanup, or unrelated-file normalization.

## Follow-Up

- Start INK only if the final DUNE and GLINT VM-300 gates remain green.
- Create a separate card for the generated Supabase context isolation defect before accepting future broad context rewrites.
- Keep support-only Glint-Eye, Yidris, Entropic Uprising, cascade, and maelstrom texture out of claim proof unless a future approved evidence-promotion card changes that role.
