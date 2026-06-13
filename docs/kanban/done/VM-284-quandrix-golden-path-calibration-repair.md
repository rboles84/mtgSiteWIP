ID: VM-284
Title: Quandrix Golden-Path Calibration Repair
Status: Done
Type: Placement Calibration Repair / Test Hardening
Area: Archscry, Placement, Quick Reading
Priority: high

## Summary

Completed a scoped placement calibration repair for the known placement-suite failure where the QUANDRIX adaptive golden path resolved to mono-Blue `U`.

The scoped calibration target was `gate_pressure_trust -> Information advantage`, where `QUANDRIX: 0.25` was too weak despite answer copy that references visible hidden structure.

Execution-time verification showed the plan's initial `0.55` estimate fixed QUANDRIX but stole the `mono-blue-boundary` presentation snapshot into QUANDRIX. The implemented value is `0.35`, the strongest tested value that fixes the QUANDRIX golden path, keeps all 33 golden paths passing, and preserves the mono-Blue boundary fixture.

## Scope

- Update only the relevant builder calibration likelihood.
- Regenerate generated faction artifacts through the approved builder.
- Preserve unrelated dirty worktree changes.
- Do not edit raw packets, research packets, architecture docs, Maze behavior, Home preview, hero assets/mappings, routes, aliases, schemas, or public API behavior.

## Implementation

- Updated `research/build-faction-artifacts.mjs` so `gate_pressure_trust -> Information advantage -> likelihoods.QUANDRIX` is `0.35`.
- Regenerated builder-derived placement/runtime artifacts through `npm.cmd run build:factions`.
- Confirmed `data/placement-model.json` now carries `"QUANDRIX": 0.35` for the target answer.
- Confirmed the generated schema write was a no-op in tracked diff.
- Left the pre-existing dirty four-color, hero, docs, and Maze surfaces untouched.

## Acceptance Criteria

- QUANDRIX golden path resolves to `QUANDRIX`, not `U`.
- Full regenerated golden-path sweep has zero faction mismatches across 33 factions.
- `node assets/js/quick-reading-tests.js`, `npm.cmd run test:placement`, and `npm.cmd test` no longer fail on the QUANDRIX assertion, but they still fail later on a separate Temur Maze query-ordering assertion: expected `/^id=urg is:commander f:commander /`, actual `id=gur is:commander f:commander ...`.
- Generated diffs stayed in builder-derived placement/runtime context surfaces for this pass.

## Tests

- `node --check research/build-faction-artifacts.mjs` - passed.
- `npm.cmd run build:factions` - passed; built 33 placement records.
- Focused regenerated golden-path sweep - passed, 33/33, QUANDRIX confidence `0.599`.
- `npm.cmd run test:presentation-snapshots` - passed, 16 fixed cases.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd run audit:factions` - passed.
- `git diff --check` - passed with existing CRLF warnings only.
- `npm.cmd run test:placement` - still fails on separate Temur Maze query-ordering assertion.
- `node assets/js/quick-reading-tests.js` - still fails on the same Temur assertion.
- `npm.cmd test` - still fails on the same Temur assertion.

## Follow-Up

Open a separate scoped repair if the broad quick-reading suite needs to go fully green after VM-284. The remaining blocker is not QUANDRIX placement calibration; it is Temur Maze query ordering in `assets/js/quick-reading-tests.js`.
