# 2026-06-13 19:26 - Codex - VM-382 Gate Compression Simulator Comparison

## Agent Name

Codex

## Task Requested

Implement the Gate Compression Redesign simulator/comparison step for the 37-expression WUBRG-first plan without enabling a new live Gate. Preserve `Gate -> Hall -> Crucible`, keep the current direct-faction live baseline active, and produce auditable reachability/overtrigger/special-channel reports before any future switch.

## Pre-Flight Summary

Recent related work:

- VM-367 made WUBRG live as controlled placement/dossier support without Home/public-route expansion.
- VM-369 added exactly one canonical `COLORLESS/WUBRG` Crucible after reproducing confusion.
- VM-372 kept Colorless support richness controlled.
- VM-377 promoted mono source authority.
- VM-381 published the accumulated source-bound bundle and left the tree clean.

Current known risks:

- The live direct-faction placement model is green and must remain the baseline.
- Appendix C showed color-only WUBRG vectors reach 36/37 and miss `COLORLESS`.
- `WUBRG` can become unsafe if treated as ordinary additive five-color mass.
- `DUNE`, `INK`, and `WITCH` remain broad-expression watch cases.
- Same-color duplicate pairs must remain Gate-tied and Hall/Crucible-resolved.

Relevant decisions already made:

- Source-first edits only.
- Generated placement artifacts are builder-owned and not evidence.
- `.45` is neutral because the current `likelihood_to_delta["0.45"]` is `0`.
- Gate propagation should use `sqrt` with Gate `broad_match_penalty = 0`.
- `COLORLESS` requires explicit outside-WUBRG boundary evidence.
- `WUBRG` requires balanced all-five integration/evenness evidence.
- No public Gate copy or runtime switch is authorized by simulator work.

Files recently changed:

- WUBRG/Colorless raw packets, identity layers, builder/runtime tests, generated placement/faction outputs, docs/research ledgers, Kanban cards, and handoffs through VM-381.

What should not be touched:

- Live route behavior, public Gate/runtime defaults, Home preview, aliases, public routes, hand-edited generated placement JSON, broad faction beneficiary lists, and unrelated source/lore data.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-0750-codex-vm367-wubrg-gold-layer1-layer2.md`
- `docs/handoffs/2026-06-13-0912-codex-wubrg-source-bound-deepening.md`
- `docs/handoffs/2026-06-11-0708-codex-vm334-colorless-product-decision-gate.md`
- `docs/handoffs/2026-06-11-0032-codex-vm330-four-color-authority-sweep.md`
- `docs/handoffs/2026-06-13-1843-codex-vm381-publish-clean-dirty-tree.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-369-colorless-wubrg-crucible-readiness.md`
- `docs/kanban/done/VM-381-publish-and-clean-dirty-tree.md`
- `docs/design/gate-phase-compression-framework.md`
- `docs/design/placementLogic_deep-research-report.md`
- `docs/reference/source-generated-guardrails.md`
- `assets/js/adaptive-placement.js`
- `assets/js/quick-reading-tests.js`
- `research/build-faction-artifacts.mjs`
- `data/placement-model.json`
- `package.json`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-382-gate-compression-simulator-comparison.md`
- `docs/research/gate-compression/README.md`
- `docs/research/gate-compression/wubrg-first-gate.source.json`
- `research/gate-compression-simulator.mjs`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.md`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.json`
- `docs/design/gate-phase-compression-framework.md`
- `package.json`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1926-codex-vm382-gate-compression-simulator.md`

## What Changed

- Created and closed VM-382.
- Added a research-only WUBRG-first Gate source fixture with four Gate axes:
  - Gate I: `Locus Of Trust`
  - Gate II: `What Pressure Becomes`
  - Gate III: `First Signal`
  - Gate IV: `Cost Of The Oath`
- Each source answer owns `color_loadings: { W, U, B, R, G }`.
- Added explicit answer-level `outside_wubrg` evidence for `COLORLESS`.
- Added explicit answer-level `all_five_integration` evidence for `WUBRG`.
- Added a non-live simulator that reads the current placement model, propagates source vectors through `sqrt` with Gate `bmp = 0`, buckets propagated deltas through the existing likelihood table, and emits Markdown/JSON reports.
- Added `npm.cmd run test:gate-compression` as the repeatable comparison command.
- Documented VM-382 report evidence in `docs/design/gate-phase-compression-framework.md`.

## Why It Changed

The user requested the first implementation architecture step for the 37-expression Gate redesign: simulator/comparison evidence before any live switch. The current live Gate remains direct-faction and green, so VM-382 adds only a non-live source fixture, simulator, and reports.

## Decisions Made

- Keep the simulator research-only and outside the live builder/runtime path.
- Treat absent or anti-special evidence as suppressive for `COLORLESS` / `WUBRG`, so neither can float upward merely because ordinary color evidence collapses.
- Keep `.45` as explicit neutral, verified by a neutral probe.
- Use bucketed likelihoods rather than precomputed deltas for this first attempt.
- Keep same-color duplicate pairs tied under Gate and verify their existing Crucible pairs.
- Do not hand-edit generated placement artifacts or route/public surfaces.

## Risks / Uncertainties

- VM-382 proves simulator reachability and special-channel safety, not live UX readiness.
- The source fixture is calibrated for comparison and still needs product/content acceptance before source/builder integration.
- Watched broad-expression counts remain nonzero and must be reviewed before any future switch:
  - `DUNE`: rank 1 `10`, top 3 `29`, top 5 `60`
  - `INK`: rank 1 `0`, top 3 `19`, top 5 `49`
  - `WITCH`: rank 1 `7`, top 3 `29`, top 5 `53`
  - `WUBRG`: rank 1 `38`, top 3 `78`, top 5 `90`
  - `COLORLESS`: rank 1 `17`, top 3 `17`, top 5 `17`
- Unrelated untracked scratch-looking files were present after work and were not touched: `._rc.mjs`, `._rc2.mjs`, `._relic_abzan.png`, `._relic_glint.png`.

## Tests Run

- `node --check research\gate-compression-simulator.mjs` - passed.
- `npm.cmd run test:placement` - passed; 37 factions and 37 golden paths.
- `npm.cmd run test:gate-compression` - passed; 37/37 reachable and reports written.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed; 115 parser cases.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed with CRLF warnings only.

## Not Touched

- Live Gate question bank.
- `data/placement-model.json`.
- `data/factions.json`.
- `data/identity-layers.json`.
- Supabase generated context.
- Runtime route behavior.
- Public Gate copy.
- Home preview, public routes, aliases, schema/API surfaces, or hero assets.
- Raw faction lore/source packets.
- Unrelated untracked scratch-looking files.

## Follow-Up Recommendations

- Review the VM-382 report manually before any live-switch planning.
- If approved, create a separate source/builder integration plan that keeps generated artifacts builder-owned.
- Add product/content review for the four mixed-audience Gate prompts before public copy changes.
- Keep `COLORLESS` and `WUBRG` special-channel gating mandatory in any future runtime implementation.

## Next Suggested Agent

Planning Architect for live-switch integration planning after report acceptance, or Test Strategist for additional noisy-user/partial-path simulation.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-382-gate-compression-simulator-comparison.md`
- `docs/design/gate-phase-compression-framework.md`
- `docs/research/gate-compression/wubrg-first-gate.source.json`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.md`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.json`
