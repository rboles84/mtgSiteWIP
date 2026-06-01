# Codex Handoff - VM-237 Mardu Quick Reading Reachability Repair

## Agent Name

Codex acting as Runtime QA Repair / Test Strategist.

## Task Requested

Fix the Mardu live quick-reading path after manual QA tried to reach Mardu but landed on mono-Red because the visible Gate/Hall choices did not include the Mardu-specific answers from the promoted placement model.

## Pre-Flight Summary

Recent related work:

- VM-228 promoted exactly one live public Mardu key, `MARDU`.
- VM-228 confirmed generated placement data included Mardu-specific Gate and Hall support.
- The manual QA flow shown by the user lacked `The charge before the gap closes`, `Power that commits the charge`, `The opening`, `A name worth charging under`, and Mardu Hall questions, then landed on Red.
- The board currently has VM-234 Jeskai Way Controlled Runtime Promotion in progress; VM-237 left it untouched.

Current known risks:

- The worktree remains broadly dirty from many lane changes.
- `assets/js/index.js` and `assets/js/quick-reading-tests.js` already had unrelated dirty edits before VM-237.
- The broad test suite is currently blocked by the separate VM-234 Jeskai in-progress state.

Relevant decisions already made:

- `MARDU` is live.
- `RWB` and `WBR` remain metadata/query-only.
- Mardu raw JSON, research docs, and architecture docs are not part of this repair.
- A stale or cached placement model must fail visibly rather than silently producing an old Red-only path.

Files recently changed before or outside this task:

- VM-228 touched Mardu generated/runtime/presentation/test surfaces.
- VM-234 currently has Jeskai in-progress board/test expectations that are not complete in generated data.
- `assets/js/index.js` contains unrelated dirty presentation/copy helpers outside VM-237's narrow loader changes.

What should not be touched:

- VM-234 Jeskai files or card state.
- Mardu raw JSON files.
- Mardu research or architecture docs.
- Generated data by hand.
- Home preview UI, Maze route files, routes, schemas, Supabase behavior, builders, fixtures, or cross-lane docs.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `data/placement-model.json`
- `data/factions.json`
- `assets/js/index.js`
- `assets/js/adaptive-placement.js`
- `assets/js/quick-reading-tests.js`
- `research/build-faction-artifacts.mjs`

## Files Changed

- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-237-mardu-live-quick-reading-reachability-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2035-codex-vm237-mardu-quick-reading-reachability-repair.md`

## What Changed

- Added `CORE_DATA_FETCH_OPTIONS` with `cache: "no-store"` for Archscry core generated data loads.
- Routed required generated data loads for `factions.json`, `placement-model.json`, and `identity-layers.json` through the fresh-load helper.
- Added `validateQuickReadingReachability()` so a live `MARDU` build must have:
  - `MARDU` in the placement model.
  - Gate answer `The charge before the gap closes` with strong Mardu likelihood.
  - Mardu Hall questions `hall_MARDU_total_commitment` and `hall_MARDU_war_name_oath`.
- Added placement-test assertions that the generated Mardu Gate/Hall support exists and that the Archscry loader contains the fresh-load/stale-model guard.
- Created and closed VM-237.

## Why It Changed

The generated placement model already had the correct Mardu path, but the user's live run displayed the older generic Red question set and landed Red. The safest repair is to prevent the app from using stale generated core data silently and to assert that live Mardu has reachable Gate/Hall support before a quick reading starts.

## Decisions Made

- Did not tune scoring to make a pure mono-Red answer path become Mardu; that would blur the color identity model.
- Treated the user's visible flow as stale placement data because it lacked Mardu-specific answers that are present in `data/placement-model.json`.
- Kept the repair source-owned in the Archscry loader and tests; no generated artifacts were hand-edited.
- Left VM-234 Jeskai in-progress work alone.

## Risks / Uncertainties

- A user already inside an old active reading must start a fresh quick reading after the refreshed data loads.
- If the browser is running an old cached JavaScript bundle, a hard refresh may still be needed once; after this patch, core JSON loads bypass cache.
- Broad tests remain blocked by VM-234 until Jeskai generated/source surfaces are made consistent.

## Tests Run

- `node --check assets\js\index.js`
- `node --check assets\js\quick-reading-tests.js`
- Targeted PowerShell Mardu reachability/cache guard:
  - `data/factions.json` has `MARDU`.
  - `data/placement-model.json` has `MARDU`.
  - Gate answer `The charge before the gap closes` has `MARDU: 0.95`.
  - Hall questions `hall_MARDU_total_commitment` and `hall_MARDU_war_name_oath` exist.
  - `assets/js/index.js` contains `cache: "no-store"` and `validateQuickReadingReachability`.
- `git diff --check` on VM-237 touched files.
- Trailing-whitespace scan on VM-237 touched files.

Blocked / not passing due unrelated in-progress state:

- `npm.cmd run test:placement` failed on VM-234 Jeskai expectation: `Generated factions should include JESKAI`.
- `npm.cmd test` failed in the current dirty quick-reading suite before VM-237-specific assertions completed.

## Not Touched

- VM-234 Jeskai card or implementation files.
- `data/raw-factions/mardu/*.json`
- `docs/research/mardu/**`
- `docs/architecture/colors/mardu/**`
- `data/placement-model.json`
- `data/factions.json`
- `data/identity-layers.json`
- Generated artifacts
- Builders
- Home preview UI
- Maze route files
- Route/static page files
- Schemas
- Supabase behavior
- Fixtures
- Raw registries or alias maps
- Staging or commits

## Follow-Up Recommendations

- Retake the Archscry quick reading after a hard refresh or fresh app load.
- The expected Mardu path should now show the Mardu-specific answers:
  - `The charge before the gap closes`
  - `Power that commits the charge`
  - `The opening`
  - `A name worth charging under`
  - `Take the opening now`
  - `Keep the war name`
- Finish or repair VM-234 Jeskai separately so the broad placement suite can return to green.

## Next Suggested Agent

Test Strategist for a quick manual browser QA pass, or Runtime Promotion steward to finish the already in-progress VM-234 Jeskai lane.

## Related Kanban Card / Docs

- `docs/kanban/done/VM-237-mardu-live-quick-reading-reachability-repair.md`
- `docs/kanban/done/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`

## Explicit Final Scope Confirmation

VM-237 repaired Mardu quick-reading reachability by guarding against stale generated placement data. It did not make `RWB` or `WBR` live, did not alter Mardu raw/research/architecture files, did not hand-edit generated artifacts, and did not modify the in-progress VM-234 Jeskai lane.
