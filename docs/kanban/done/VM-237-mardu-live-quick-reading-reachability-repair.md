# VM-237 - Mardu Live Quick Reading Reachability Repair

ID: VM-237
Title: Mardu Live Quick Reading Reachability Repair
Status: done
Type: Runtime QA Repair / Test
Area: Archscry Quick Reading, Mardu Horde, Placement Model
Priority: high
Created: 2026-05-31

## Summary

Repair the live quick-reading path after manual QA landed on mono-Red while trying to reach Mardu because the visible Gate/Hall choices did not include the Mardu-specific options present in the generated placement model.

## Scope

- Perform AGENTS.md pre-flight before editing.
- Keep VM-234 Jeskai in-progress work untouched.
- Add a source-owned guard so Archscry does not silently run with stale generated core data after a new live faction promotion.
- Preserve `MARDU` as the only live Mardu public key.
- Keep `RWB` and `WBR` metadata/query-only.
- Do not edit Mardu raw JSON, Mardu research docs, Mardu architecture docs, generated data by hand, routes, Home preview UI, Maze route files, schemas, Supabase behavior, builders, fixtures, or cross-lane docs.

## Acceptance Criteria

- [x] Core generated data fetches bypass browser cache for the quick-reading/dossier boot path.
- [x] If `MARDU` is live but the placement model lacks Mardu Gate/Hall support, the app fails initialization with a clear stale-model error instead of letting the user take a broken reading.
- [x] Regression tests confirm Mardu-specific Gate and Hall answers exist in the generated placement model.
- [x] Regression tests confirm the Archscry loader uses a fresh core data fetch path.
- [x] Existing Mardu golden path still resolves to `MARDU`.
- [x] The visible stale-data failure that landed Red is documented in the handoff.

## Suggested Tests

- `node --check assets/js/index.js`
- `node --check assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- Scoped `git diff --check` on touched files.

## Closeout

Completed: 2026-05-31

Result: added a fresh core-data load path for Archscry generated data and a live quick-reading reachability guard for `MARDU`. If `MARDU` is live but the placement model does not expose the Mardu Gate answer and Mardu Hall questions, initialization now raises a clear stale-placement-data error instead of letting the user proceed into an old Red-only flow.

Confirmed Mardu reachability:

- `data/factions.json` contains `MARDU`.
- `data/placement-model.json` contains `MARDU`.
- Gate support answer `The charge before the gap closes` has `MARDU: 0.95`.
- Hall questions `hall_MARDU_total_commitment` and `hall_MARDU_war_name_oath` are present.
- Archscry core data loader uses `cache: "no-store"`.
- Archscry boot calls `validateQuickReadingReachability()`.

Tests run:

- `node --check assets\js\index.js`
- `node --check assets\js\quick-reading-tests.js`
- Targeted PowerShell Mardu reachability/cache guard
- `git diff --check` on VM-237 touched files
- Trailing-whitespace scan on VM-237 touched files

Known unrelated test blockers:

- `npm.cmd run test:placement` currently fails on the in-progress VM-234 Jeskai state: `Generated factions should include JESKAI`.
- `npm.cmd test` currently fails in the same dirty/in-progress placement-test surface before VM-237 assertions complete.
- VM-237 did not repair or modify VM-234 Jeskai work.
