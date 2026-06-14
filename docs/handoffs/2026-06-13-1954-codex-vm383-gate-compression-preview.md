# 2026-06-13 19:54 - Codex - VM-383 Gate Compression Preview

## Agent name

Codex

## Task requested

Add a preview path for the VM-382 compressed four-question WUBRG-first Gate after the user confirmed "sure preview first." Preserve the default live Gate and generated placement artifacts, but make the compact Gate available for review and add tests for skew/special-channel safety.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1926-codex-vm382-gate-compression-simulator.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-382-gate-compression-simulator-comparison.md`
- `docs/design/gate-phase-compression-framework.md`
- `docs/research/gate-compression/wubrg-first-gate.source.json`
- `docs/research/gate-compression/README.md`
- `assets/js/index.js`
- `assets/js/adaptive-placement.js`
- `assets/js/quick-reading-tests.js`
- `research/gate-compression-simulator.mjs`
- `package.json`

## Files changed

- `assets/js/adaptive-placement.js`
- `assets/js/gate-compression-preview.js`
- `assets/js/gate-compression-preview-tests.js`
- `assets/js/index.js`
- `research/run-tests.js`
- `package.json`
- `docs/research/gate-compression/README.md`
- `docs/design/gate-phase-compression-framework.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-383-gate-compression-preview.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1954-codex-vm383-gate-compression-preview.md`

## What changed

- Added an explicit preview flag: `archscry/?vmGatePreview=compressed`.
- Added `assets/js/gate-compression-preview.js`, which loads the VM-382 source fixture, clones the generated placement model in memory, and replaces only `question_bank.gate`.
- Added preview activation in `assets/js/index.js` after the default generated-model reachability validation.
- Added question-level `disable_lateral_inhibition` support in `applyAdaptiveAnswer`; only preview Gate questions use it.
- Added `assets/js/gate-compression-preview-tests.js` and `npm.cmd run test:gate-preview`.
- Folded the focused preview test into `npm.cmd test`.
- Documented the preview path and test command in the research README and Appendix C.
- Closed VM-383 in Kanban.

## Why it changed

The live Gate still showed the long generated Gate I answer list because VM-382 was intentionally non-live. The user asked for a preview first, so this work exposes the compact Gate for manual review without promoting it to default runtime behavior.

## Decisions made

- Keep the default Archscry route unchanged.
- Do not edit `data/placement-model.json`.
- Load the source-authored compressed Gate only through the explicit URL flag.
- Keep Hall and Crucible faction-specific.
- Emit negative preview evidence as `suppresses`, not low direct likelihoods, so ordinary answers do not permanently prune `COLORLESS` or `WUBRG`.
- Disable lateral inhibition only for preview Gate questions, because the VM-382 simulator did not apply that live-runtime side effect.
- Add a Gate-only rank-one distribution guard across all 625 preview answer paths. Current highest rank-one count is `B: 94/625`; `WU`/Azorius is `10/625`, with a test cap of `25/625`.

## Risks / uncertainties

- Preview still preserves `Gate -> Hall -> Crucible`; total quick-reading flow may still ask Hall/Crucible after the four compact Gate questions.
- The preview is runtime-only and loads the research source fixture from `docs/research/gate-compression/`; a future live switch should move this through the builder/source pipeline rather than relying on this preview loader.
- Rank-one distribution caps are guardrails, not a full product fairness model. Bias reporting may still be useful before any live switch.
- Same-color duplicate pairs intentionally remain Gate-tied and require Hall/Crucible resolution.

## Tests run

- `node --check assets\js\gate-compression-preview.js` - passed.
- `node --check assets\js\gate-compression-preview-tests.js` - passed.
- `node --check assets\js\adaptive-placement.js` - passed.
- `node --check assets\js\index.js` - passed.
- `npm.cmd run test:gate-preview` - passed.
- `npm.cmd run test:placement` - passed; 37 factions and 37 golden paths.
- `npm.cmd run test:gate-compression` - passed; 37/37 reachable and reports written.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed; 115 parser cases.
- Browser preview check on local static server:
  - Default `archscry/` opened Gate I with 19 answers and no preview flag.
  - `archscry/?vmGatePreview=compressed` opened Gate I with 5 answers and `data-vm-gate-preview="compressed"` equivalent dataset marker.
  - Browser console error log was empty.

## Not touched

- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- Live default Gate copy and default route behavior
- Hall/Crucible source data
- Home route, aliases, public schema/API, Supabase context, Commander facts, lore/source content
- Unrelated untracked scratch files

## Follow-up recommendations

- If the preview copy is accepted, create a separate builder/source integration card rather than promoting the runtime preview loader directly.
- Add or adapt a stable bias report for preview/live comparison before any default switch.
- Decide whether preview UI should make the "four Gate questions, then Hall/Crucible if needed" distinction more explicit.

## Next suggested agent

Test Strategist or Planning Architect for preview acceptance criteria and live-switch planning.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-383-gate-compression-preview.md`
- `docs/kanban/done/VM-382-gate-compression-simulator-comparison.md`
- `docs/design/gate-phase-compression-framework.md`
- `docs/research/gate-compression/README.md`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.md`
