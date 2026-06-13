# VM-304 - INK Source-First Authoring Pass

## Status

Done

## Summary

Repaired INK using the VM-300 source/generated guardrail pattern after confirming DUNE and GLINT remained green. The pass updated INK raw source backing so generated placement/profile output no longer outruns durable source fields.

## Scope Completed

- Preserved unrelated dirty worktree drift.
- Re-read AGENTS, VM-300/301/302/303 cards and handoffs, VM-258/261/262/263 INK cards and handoffs, board state, INK research ledgers, INK raw files, and generated INK output.
- Kept exactly five INK claims.
- Added VM-263 as lifecycle/live-status provenance only.
- Added builder-readable five-claim profile backing and source-bounded mechanics summary.
- Source-backed INK generated `good_fit_indicators`, `poor_fit_indicators`, `inhibitor_traps`, discriminator supports/weakens, collision targets, evidence claim IDs, calibration terms, strengthen/suppress lists, and false-positive guardrail.
- Rebuilt generated placement artifacts through `npm.cmd run build:factions`.
- Accepted only the INK object drift in `data/placement-model.json`.
- Rejected and restored regenerated Supabase context drift that included non-INK sections.

## Evidence Rows

- Claim-bearing/source-bound rows used for durable claims and placement/profile boundaries: `INK-EVID-001`, `INK-EVID-002`, `INK-EVID-003`, `INK-EVID-004`, `INK-EVID-007`, `INK-EVID-010`.
- Support-bound rows used only for labeled Commander/profile/mechanics texture: `INK-EVID-005`, `INK-EVID-006`.
- VM-263 was used only for lifecycle/live-status metadata.

## Acceptance Result

- Pre-INK `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT`: passed with 0 warnings.
- Baseline `npm.cmd run validate:source-generated -- --targets=INK`: failed as expected on generated-only `good_fit_indicators`, `poor_fit_indicators`, and `inhibitor_traps`.
- Final `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT,INK`: passed with 0 warnings.
- Generated/profile output traces to exactly five claim-bearing INK claims.
- `data/factions.json` stayed out of scope.
- `data/placement-model.schema.json` and `data/archscry-flavor-snippets.json` had no content drift.
- `supabase/functions/guild-recruiter/faction-context.ts` was restored to its pre-build snapshot because the rebuild included non-INK context drift.

## Tests

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: pre-edit, post-edit, and final JSON parse checks
- Pass: pre-INK `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT`
- Expected fail: baseline `npm.cmd run validate:source-generated -- --targets=INK`
- Pass: raw five-claim backing check
- Pass: `npm.cmd run build:factions`
- Pass: generated snapshot comparison showing only INK changed in `data/placement-model.json`
- Pass: context restore check for `supabase/functions/guild-recruiter/faction-context.ts`
- Pass: final `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT,INK`
- Pass with existing default-target warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement` on Temur color-order assertion only
- Pass: scoped `git diff --check`
- Pass: scoped trailing-whitespace check

## Residuals

- `npm.cmd run test:placement` still fails only on the known unrelated Temur query copy ordering assertion.
- `npm.cmd run test:source-generated` still reports existing Jeskai/Mardu model-owned inhibitor warnings from VM-300.
- `build:factions` still rewrites non-target Supabase context sections; VM-304 restored `supabase/functions/guild-recruiter/faction-context.ts` and did not accept that drift.
- The worktree remains broadly dirty from unrelated prior work; VM-304 did not stage, revert, normalize, or clean unrelated files.

## Not Touched

- No web search.
- No `data/factions.json` authoring.
- No generated placement hand edits.
- No generated flavor output edits or flavor rebuild.
- No schema shape changes.
- No accepted Supabase context drift.
- No Home, Maze, route, asset, frontend, public-display, deck-link, or Temur residual fixes.
- No YORE, DUNE, GLINT, or WITCH source authoring.
- No staging, commits, resets, cleanup, or unrelated-file normalization.

## Follow-Up

- Create a separate card for the generated Supabase context isolation defect before accepting future broad context rewrites.
- After that isolation card, choose the next source-first authoring target from the already planned queue rather than continuing to accept broad generated context drift.
- Keep `Altruism`, `Kynaios`, `Stalwart Unity`, `Ink-Treader`, `RGWU`, `WURG`, same-color identity, and discovery drafts out of claim proof unless a future approved evidence-promotion card changes their role.
