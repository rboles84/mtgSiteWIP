# VM-301 - YORE Source-First Authoring Pass

## Status

Done

## Task

Repair YORE source durability after VM-300 by updating raw YORE profile and placement backing before accepting regenerated placement/profile output.

## Scope Completed

- Updated YORE raw lifecycle/source state from the VM-243 non-live packet to live-after-VM-245 source repair.
- Kept the raw claim floor at exactly five YORE claims.
- Added builder-readable profile claim IDs and approved-evidence mechanics summary.
- Source-backed YORE placement calibration, good/poor fit indicators, inhibitor traps, discriminator supports/weakens, collision targets, and claim references.
- Rebuilt generated placement artifacts through `npm.cmd run build:factions`.
- Accepted only YORE drift in `data/placement-model.json`.
- Rejected and restored an out-of-scope regenerated Supabase context drift that would have changed WITCH.

## Acceptance Result

- Baseline `npm.cmd run validate:source-generated -- --targets=YORE`: failed as expected on generated-only fit/inhibitor language.
- Final `npm.cmd run validate:source-generated -- --targets=YORE`: passed with 0 warnings.
- `data/factions.json` stayed out of scope.
- `data/placement-model.schema.json` had no accepted content drift.
- `supabase/functions/guild-recruiter/faction-context.ts` was restored to its pre-VM-301 snapshot because rebuild output included WITCH drift.
- No web search, no flavor snippet rebuild, no schema redesign, no generated hand-authoring, and no downstream DUNE/GLINT/INK authoring.

## Tests

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: JSON parse checks before and after edits
- Pass: `npm.cmd run build:factions`
- Pass: `npm.cmd run validate:source-generated -- --targets=YORE`
- Pass with existing model-owned warnings for default targets: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement` on Temur color-order assertion only

## Follow-Up

- Start DUNE only after confirming the current YORE VM-300 pass remains green.
- Future generated Supabase context acceptance should handle or separately approve the pre-existing WITCH context drift before rebuilding broad context output.
