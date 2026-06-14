# VM-383 - Gate Compression Preview

ID: VM-383
Title: Gate Compression Preview
Status: done
Type: Placement runtime preview / tests
Area: Archscry / Gate / Adaptive Placement
Priority: high
Created: 2026-06-14

## Summary

Add an explicit opt-in preview path for the VM-382 compressed four-question WUBRG-first Gate while keeping the current generated placement model and default Archscry runtime unchanged.

## Scope

- Load the VM-382 Gate compression source only when an explicit preview flag is present.
- Clone the generated placement model and replace only `question_bank.gate` for the preview runtime.
- Preserve `Gate -> Hall -> Crucible`.
- Express preview Gate vectors through the existing likelihood bucket contract.
- Keep Hall and Crucible faction-specific.
- Keep the default live Gate and generated placement artifacts unchanged.
- Add tests proving default behavior stays live and preview behavior shows four compact Gate questions.

## Out Of Scope

- No live default Gate switch.
- No direct edits to generated placement JSON.
- No Home route, alias, schema/API, or public placement artifact changes.
- No faction-specific Gate override calibration.
- No broad-match penalty during Gate vector propagation.

## Acceptance Criteria

- [x] Default Archscry still loads the existing long Gate from generated placement data.
- [x] Preview activates only through an explicit flag.
- [x] Preview Gate contains exactly four Gate questions.
- [x] Each preview Gate question has no more than five answers.
- [x] Preview answers generate faction-compatible likelihoods from source `color_loadings`.
- [x] `COLORLESS` preview evidence comes only from `outside_wubrg`.
- [x] `WUBRG` preview evidence comes only from `all_five_integration` or equivalent evenness signal.
- [x] Preview Gate propagation uses Gate `broad_match_penalty = 0`.
- [x] Preview Gate does not apply runtime lateral inhibition unless later evidence authorizes it.
- [x] Current placement tests remain green.
- [x] VM-382 simulator report remains green.

## Validation Checklist

- [x] Focused preview contract test.
- [x] `npm.cmd run test:placement`
- [x] `npm.cmd run test:gate-compression`
- [x] Browser/manual preview of `archscry/?vmGatePreview=compressed`

## Completion Notes

- Added `assets/js/gate-compression-preview.js` as an opt-in transformer that loads the VM-382 source fixture and clones the generated placement model in memory.
- Added `?vmGatePreview=compressed` activation in Archscry after the live generated-model reachability check.
- Kept `data/placement-model.json` unchanged.
- Added question-level `disable_lateral_inhibition` support for preview Gate alignment with the simulator.
- Added `assets/js/gate-compression-preview-tests.js` and `npm.cmd run test:gate-preview`.
- Added Gate-only distribution guards across all 625 preview paths, including an explicit Azorius dominance cap.
- Browser verification: default route showed Gate I with 19 answers; preview route showed Gate I with 5 answers.

## Validation Results

- `node --check assets\js\gate-compression-preview.js` - passed.
- `node --check assets\js\gate-compression-preview-tests.js` - passed.
- `node --check assets\js\adaptive-placement.js` - passed.
- `node --check assets\js\index.js` - passed.
- `npm.cmd run test:gate-preview` - passed.
- `npm.cmd run test:placement` - passed; 37 factions and 37 golden paths.
- `npm.cmd run test:gate-compression` - passed; 37/37 reachable and reports written.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed; 115 parser cases.
