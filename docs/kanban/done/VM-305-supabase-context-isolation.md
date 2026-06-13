# VM-305 - Supabase Context Isolation

## Status

Done

## Summary

Implemented target-scoped Supabase context rebuilds in `research/build-faction-artifacts.mjs` so source-first faction passes can update only intended `FACTION_CONTEXT` entries while preserving unrelated faction context and existing `PLACEMENT_MODEL_META`.

## Scope Completed

- Preserved unrelated dirty worktree drift.
- Added `--context-targets=KEYS` parsing to `research/build-faction-artifacts.mjs`.
- Kept normal full `npm.cmd run build:factions` behavior available when no targets are supplied.
- Added pure exported helpers for parsing, rendering, validating, and merging generated context TypeScript.
- Added focused helper coverage in `research/faction-context-isolation-tests.js`.
- Added `test:faction-context-isolation` package script.
- Ran targeted reconciliation for `YORE`, `DUNE`, `GLINT`, and `INK`.
- Accepted only those four Supabase context entries.
- Verified `data/placement-model.json`, `data/placement-model.schema.json`, `data/factions.json`, and `data/archscry-flavor-snippets.json` had no VM-305 content drift accepted.

## Acceptance Result

- Targeted build command: `npm.cmd run build:factions -- --context-targets=YORE,DUNE,GLINT,INK`.
- Accepted context keys: `YORE`, `GLINT`, `DUNE`, `INK`.
- Existing `PLACEMENT_MODEL_META` was preserved in targeted mode.
- `FACTION_CONTEXT` key order was preserved.
- Non-target context entries were preserved and protected by helper failure checks.
- Full broad rebuild behavior was smoke-tested with `npm.cmd run build:factions`, then broad generated outputs were restored to the accepted pre-smoke snapshots.

## Tests

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\faction-context-isolation-tests.js`
- Pass: `npm.cmd run test:faction-context-isolation`
- Pass: `npm.cmd run build:factions -- --context-targets=YORE,DUNE,GLINT,INK`
- Pass: context diff verification showing only `YORE`, `GLINT`, `DUNE`, and `INK` changed
- Pass: generated JSON snapshot checks for `data/placement-model.json`, `data/placement-model.schema.json`, `data/factions.json`, and `data/archscry-flavor-snippets.json`
- Pass: full-mode smoke with `npm.cmd run build:factions`, followed by restore of broad generated outputs
- Pass: `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK`
- Pass with existing default-target warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement` on Temur color-order assertion only
- Pass: scoped `git diff --check`
- Pass: focused trailing-whitespace scan

## Residuals

- `npm.cmd run test:placement` still fails only on the known unrelated Temur query copy ordering assertion.
- `npm.cmd run test:source-generated` still reports existing Jeskai/Mardu model-owned inhibitor warnings from VM-300.
- The worktree remains broadly dirty from unrelated prior work.

## Not Touched

- No raw faction data edits.
- No placement schema shape edits.
- No Maze behavior, route, flavor snippet, public display, or source-generated validator policy changes.
- No hand-editing generated placement output as source.
- No unrelated generated drift accepted.
- No staging, commits, resets, cleanup, or unrelated-file normalization.

## Follow-Up

- Use `npm.cmd run build:factions -- --context-targets=KEYS` for future source-first passes that need Supabase context reconciliation.
- Next recommended source-first quality target: the targeted `UR` and `RG` mechanics follow-up, starting with `UR` if split into single-faction passes.
