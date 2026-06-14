# VM-384 Gate Compression Live Promotion Handoff

Agent name: Codex

Task requested: Promote the compressed four-question WUBRG-first Gate to the default Archscry quick-reading Gate through the builder, retire the VM-383 preview path, add hard live Gate bias validation, update docs/Kanban, and verify the local default route.

Related Kanban card, docs, or plans:

- `docs/kanban/done/VM-384-gate-compression-live-promotion.md`
- `docs/design/gate-phase-compression-framework.md`
- `docs/research/gate-compression/README.md`
- `docs/audits/gate-compression/live-gate-bias.md`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-382/VM-383 handoffs and Kanban cards
- `docs/kanban/board.md`
- `docs/design/gate-phase-compression-framework.md`
- `docs/research/gate-compression/README.md`
- `research/build-faction-artifacts.mjs`
- `research/gate-compression-simulator.mjs`
- `assets/js/index.js`
- `assets/js/adaptive-placement.js`
- `assets/js/quick-reading-tests.js`
- `research/presentation-snapshot-runner.mjs`
- `research/presentation-snapshot-cases.json`

## Files Changed

- `data/placement/gate-compression.source.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `research/gate-compression-simulator.mjs`
- `assets/js/adaptive-placement.js`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `assets/js/gate-compression-live-bias-tests.js`
- `package.json`
- `research/run-tests.js`
- `research/presentation-snapshot-runner.mjs`
- `research/presentation-snapshot-cases.json`
- `research/presentation-snapshot-tests.js`
- `docs/audits/gate-compression/live-gate-bias.md`
- `docs/audits/gate-compression/live-gate-bias.json`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.md`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.json`
- `docs/research/gate-compression/README.md`
- `docs/research/gate-compression/archive/wubrg-first-gate.vm382-research-source.json`
- `docs/design/gate-phase-compression-framework.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-384-gate-compression-live-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-2212-codex-vm384-gate-live-promotion.md`

Retired VM-383 preview files:

- `assets/js/gate-compression-preview.js`
- `assets/js/gate-compression-preview-tests.js`

## What Changed

- Promoted `data/placement/gate-compression.source.json` as the editable source of truth for compressed Gate copy, `color_loadings`, neutral signals, and special-channel markers.
- Updated `research/build-faction-artifacts.mjs` so `question_bank.gate` is generated from the source file.
- Implemented square-root WUBRG propagation with Gate broad-match penalty `0`, current likelihood-bucket rounding, generated `likelihoods` for positive deltas, generated `suppresses` for negative deltas, `outside_wubrg`-only `COLORLESS`, and integration/evenness-only `WUBRG`.
- Retired the VM-383 `?vmGatePreview=compressed` runtime path and preview transformer.
- Standardized generated Gate lateral-inhibition opt-out as `lateral_inhibition: false`.
- Added `npm.cmd run test:gate-live-bias`, which writes `live-gate-bias.md` and `live-gate-bias.json` before enforcing skew/special-channel caps.
- Updated placement and presentation snapshot tests for compact Gate assumptions and Gate top-five Hall routing validation.
- Regenerated `data/placement-model.json` through `npm.cmd run build:factions`.
- Filtered VM-384 placement metadata out of generated Supabase context so no unrelated Supabase diff remained.
- Updated docs and closed VM-384 on the Kanban board.

## Why It Changed

The accepted VM-382 simulator and VM-383 preview proved the compressed Gate could preserve 37-expression reachability with explicit `COLORLESS` and `WUBRG` channels. VM-384 makes that path live through builder-owned source and generated placement output, avoiding a second runtime override mode.

## Decisions Made

- `data/placement/gate-compression.source.json` is editable source; `data/placement-model.json` is generated output only.
- Source answers must not carry generated likelihood/suppression evidence.
- Bias caps are hard failures and remain Gate-only skew caps, not full-placement reachability requirements.
- Same-color duplicate groups are enumerated dynamically and may tie after Gate; Hall/Crucible remain responsible for faction-specific distinction.
- `runAdaptiveGoldenPath` and scripted test helpers may route to a target Hall once the target is inside the Gate top-five pool; live user routing remains unchanged.
- Presentation snapshot replay translates legacy Gate fixture steps to compact Gate answers using each fixture's expected primary.

## Risks / Uncertainties

- Compact Gate intentionally creates broader early neighborhoods, so some old fixed snapshot/overlap assumptions were recalibrated.
- Bias caps are current calibration thresholds; future Gate copy/vector changes should keep writing diagnostics before failing.
- Same-color duplicate separation still depends on existing Hall/Crucible authoring.

## Tests Run

- `npm.cmd run build:factions` - passed.
- `npm.cmd run test:gate-live-bias` - passed; 625 paths, 29 rank-one winners, max `B` 94, `WU` 10, no `COLORLESS`/`WUBRG` leakage.
- `npm.cmd run test:placement` - passed; 37 factions, 37 golden paths.
- `npm.cmd run test:gate-compression` - passed; 37/37 reachable.
- `npm.cmd run test:parser` - passed; 115 parser cases.
- `npm.cmd run test:presentation-snapshots` - passed; 16 fixed cases.
- `npm.cmd test` - passed.
- Local browser check on `http://127.0.0.1:4173/archscry/` - passed: default quick reading opened compact Gate I with five compact answers, no `vmGatePreview` param, no preview dataset marker, and no old `The charge before the gap closes` Gate answer.

## Not Touched

- No Home route, alias, public schema/API, commander facts, or MTG lore/source claims were changed.
- Hall and Crucible copy/logic were not redesigned beyond normal generated-model use and test harness routing.
- Generated placement JSON was not hand-edited.
- Unrelated scratch files remained untouched: `._rc.mjs`, `._rc2.mjs`, `._relic_abzan.png`, `._relic_glint.png`.
- No files were staged or committed.

## Follow-Up Recommendations

- If future Gate source vectors change, rerun `npm.cmd run build:factions`, `npm.cmd run test:gate-live-bias`, `npm.cmd run test:placement`, and `npm.cmd run test:gate-compression` before accepting the change.
- Keep `live-gate-bias.md/json` linked from any future live Gate calibration cards.
- Consider a later UX-only review of the first-screen Gate copy after real table-read feedback, without changing the source/generated authority split.

## Next Suggested Agent

Product/UX review agent for optional post-promotion copy feel, or Test Strategist for future threshold tuning if source vectors change.
