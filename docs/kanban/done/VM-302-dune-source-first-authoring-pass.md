# VM-302 - DUNE Source-First Authoring Pass

## Status

Done

## Task

Repair DUNE source durability after VM-300 by updating necessary raw DUNE profile and placement backing before accepting regenerated placement/profile output.

## Scope Completed

- Rechecked YORE before DUNE authoring.
- Preserved unrelated dirty worktree drift.
- Preserved the existing five DUNE claims.
- Added VM-257 as lifecycle-only source backing.
- Updated DUNE raw lifecycle/profile state from VM-255 non-live raw packet status to live-after-VM-257 source repair.
- Added builder-readable DUNE profile claim IDs and source-bounded mechanics summary.
- Source-backed DUNE placement calibration, good/poor fit indicators, inhibitor traps, discriminator supports/weakens, collision targets, and claim references.
- Rebuilt generated placement artifacts through `npm.cmd run build:factions`.
- Accepted only DUNE drift in `data/placement-model.json`.
- Rejected and restored regenerated Supabase context drift that included YORE and WITCH changes outside VM-302 scope.

## Acceptance Result

- Baseline `npm.cmd run validate:source-generated -- --targets=DUNE`: failed as expected on generated-only `poor_fit_indicators` and `inhibitor_traps`.
- Final `npm.cmd run validate:source-generated -- --targets=YORE,DUNE`: passed with 0 warnings.
- `data/factions.json` stayed out of scope.
- `data/placement-model.schema.json` had no content drift.
- `data/archscry-flavor-snippets.json` had no content drift.
- `supabase/functions/guild-recruiter/faction-context.ts` was restored to its pre-VM-302 snapshot because rebuild output included non-DUNE context drift.
- No web search, no flavor snippet rebuild, no schema redesign, no generated hand-authoring, and no downstream GLINT/INK/WITCH authoring.

## Tests

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: JSON parse checks before and after edits
- Pass: pre-DUNE `npm.cmd run validate:source-generated -- --targets=YORE`
- Expected fail: baseline `npm.cmd run validate:source-generated -- --targets=DUNE`
- Pass: `npm.cmd run build:factions`
- Pass: final `npm.cmd run validate:source-generated -- --targets=YORE,DUNE`
- Pass with existing model-owned warnings for default targets: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement` on Temur color-order assertion only

## Follow-Up

- Start GLINT only after confirming the current DUNE VM-300 pass remains green.
- Future generated Supabase context acceptance needs a separate card to resolve or explicitly approve the non-isolated YORE/WITCH context drift.
