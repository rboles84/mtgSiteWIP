# VM-382 - Gate Compression Simulator Comparison

ID: VM-382
Title: Gate Compression Simulator Comparison
Status: done
Type: Placement research / simulator
Area: Gate / Adaptive Placement / WUBRG Vector Model
Priority: high
Created: 2026-06-14

## Summary

Add a non-live Gate compression simulator/comparison path for the 37-expression WUBRG-first Gate redesign. Preserve the current live `Gate -> Hall -> Crucible` runtime and generated placement artifacts while producing auditable reports for reachability, special `COLORLESS` / `WUBRG` channels, overtrigger safety, and Hall routing pools.

## Scope

- Author a research-only Gate source fixture with four worldview questions and answer-level `color_loadings`.
- Include answer-level outside-WUBRG boundary evidence for `COLORLESS`.
- Include answer-level all-five integration/evenness evidence for `WUBRG`.
- Implement a non-live simulator that reads the current `data/placement-model.json` and the research Gate source fixture.
- Use `sqrt` propagation with Gate `broad_match_penalty = 0`.
- Express propagated evidence through the existing likelihood bucket contract first.
- Emit stable Markdown and JSON comparison reports under `docs/audits/gate-compression/`.
- Keep the live generated placement model, public Gate copy, route behavior, and runtime defaults unchanged.

## Out Of Scope

- No live Gate switch.
- No public Gate copy change.
- No route, Home preview, alias, schema/API, or public-surface expansion.
- No direct hand edits to generated placement artifacts.
- No faction beneficiary-list reintroduction for Gate answers.
- No new MTG lore, card facts, commander facts, or project decisions.
- No broad-match penalty during Gate vector propagation unless later reports explicitly justify it.

## Acceptance Criteria

- [x] Current live placement baseline remains green before or during closeout.
- [x] New simulator proves 37/37 expressions are reachable.
- [x] Neutral `.45` answers produce no Gate delta.
- [x] `COLORLESS` is reachable only through explicit outside-WUBRG boundary evidence.
- [x] Ordinary low-color, low-pressure, or evenly suppressed WUBRG answers do not route to `COLORLESS`.
- [x] `WUBRG` is reachable only through balanced all-five integration/evenness evidence.
- [x] High total color pressure alone does not route to `WUBRG`.
- [x] Four-color expressions do not over-trigger from one broad answer.
- [x] `DUNE`, `INK`, `WITCH`, `WUBRG`, and `COLORLESS` overtrigger reports are reviewed.
- [x] Same-color duplicate pairs remain Hall/Crucible-resolved.
- [x] Snapshots after Gate I, II, III, and IV include source vectors, special signals, generated likelihoods/deltas, top candidates, and Hall routing pool.
- [x] Reports are referenced from the handoff before any future live switch is considered.

## Validation Checklist

- [x] `npm.cmd run test:placement`
- [x] Gate compression simulator report generation
- [x] Focused report contract checks
- [x] `npm.cmd test`
- [x] `npm.cmd run test:parser`

## Completion Notes

- Added research-only source fixture: `docs/research/gate-compression/wubrg-first-gate.source.json`.
- Added non-live simulator and repeatable command: `research/gate-compression-simulator.mjs` / `npm.cmd run test:gate-compression`.
- Wrote stable reports:
  - `docs/audits/gate-compression/wubrg-first-gate-comparison.md`
  - `docs/audits/gate-compression/wubrg-first-gate-comparison.json`
- Report status: pass.
- Reachability: 37/37 active expressions reachable in the Gate top five.
- Neutral `.45`: 0 nonzero deltas, 0 advanced expressions.
- `COLORLESS` without boundary probe rank: 37.
- `WUBRG` without integration probe rank: 36.
- Watched overtrigger counts across 625 source paths:
  - `DUNE`: rank 1 `10`, top 3 `29`, top 5 `60`
  - `INK`: rank 1 `0`, top 3 `19`, top 5 `49`
  - `WITCH`: rank 1 `7`, top 3 `29`, top 5 `53`
  - `WUBRG`: rank 1 `38`, top 3 `78`, top 5 `90`
  - `COLORLESS`: rank 1 `17`, top 3 `17`, top 5 `17`
- Same-color duplicate pairs remain Gate-tied and have Crucible pairs after Gate: `WR/LOREHOLD`, `BG/WITHERBLOOM`, `UR/PRISMARI`, `WB/SILVERQUILL`, `QUANDRIX/UG`.

## Validation Results

- `node --check research\gate-compression-simulator.mjs` - passed.
- `npm.cmd run test:placement` - passed; 37 factions and 37 golden paths.
- `npm.cmd run test:gate-compression` - passed; 37/37 reachable and reports written.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed; 115 parser cases.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed with CRLF warnings only.
