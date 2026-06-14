# 2026-06-13 00:47 - Codex - Archscry Identity Matrix Data Map

## Agent name

Codex

## Task requested

Map the Archscry placement-page Identity Matrix radar canvas back to the placement result, Layer 1 data, Layer 2 boundaries, and related Archscry JavaScript so the user can understand exactly what data components make up the UI element.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent related handoffs for VM-078, VM-118, VM-132, VM-297, VM-300, VM-327, VM-334, VM-363
- `docs/kanban/board.md`
- Related Kanban cards including VM-078, VM-118, VM-132, VM-297, VM-300, VM-364
- `docs/reference/data-contracts.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/identity-layer1-coverage-and-wubrg-plan.md`
- `archscry/index.html`
- `assets/js/graph.js`
- `assets/js/index.js`
- `assets/js/dossier-radar.js`
- `assets/js/adaptive-placement.js`
- `assets/js/commander-dossier.js`
- `assets/js/identity-layers.js`
- `assets/js/archscry-presentation.js`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- Representative `data/raw-factions/**` source/build path references

## Files changed

- `docs/reference/archscry-identity-matrix-data-map.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-364-archscry-identity-matrix-data-map.md`
- `docs/kanban/in-progress/VM-364-archscry-identity-matrix-data-map.md` moved to done status
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-0047-codex-archscry-identity-matrix-data-map.md`

## What changed

- Added a reference document mapping the Identity Matrix radar from `archscry/index.html` through `graph.js`, `index.js`, `dossier-radar.js`, adaptive placement, Layer 1 data, and Layer 2 boundaries.
- Added a 1:1 component table explaining which data source contributes each visible radar/UI element.
- Added a direct-vs-fallback table for all 36 active identities.
- Explicitly documented that `placementResult.mana_scores` does not set the radar canvas values.
- Closed VM-364 on the Kanban board and recorded this handoff.

## Why it changed

The user needed a readable, source-grounded explanation of the radar's actual data dependencies, especially whether the chart is fed by placement output, Layer 1, Layer 2, or `graph.js`.

## Decisions made

- Treated `graph.js` as Chart.js runtime only; it owns rendering machinery, not Vox Mana data.
- Treated `assets/js/dossier-radar.js` as the current radar dataset owner.
- Distinguished active placement selection from chart score calculation: placement chooses the active viewed identity, while `dossier-radar.js` resolves scores.
- Identified 22 direct authored radar profiles and 14 fallback averaged profiles.
- Treated `data/factions.json` and `data/placement-model.json` as generated/runtime surfaces, not source-of-truth authoring files.
- Treated Layer 2 research as non-runtime unless promoted into Layer 1 source inputs and rebuilt.

## Risks / uncertainties

- The first 20 direct radar profiles mirror `data/identity-layers.json` `preview_scores`, but the radar reads duplicated constants in `assets/js/dossier-radar.js`; this creates future drift risk.
- Fourteen identities still use component-average fallback profiles rather than direct identity-specific matrix scores.
- Yore and Colorless have direct radar profiles outside the first 20 preview-score set.
- A future source-first implementation should decide whether all 36 identities should have Layer 1-owned matrix scores.

## Tests run

- `node --check assets\js\dossier-radar.js` - passed
- `node --check assets\js\index.js` - passed
- `node --check assets\js\adaptive-placement.js` - passed
- `node --check assets\js\commander-dossier.js` - passed
- Ad hoc Node runtime profile validation - passed after matching the repo's object-keyed JSON shape; result: `profiles=36; direct=22; fallback=14; preview_mismatches=none`
- `npm test` - blocked by local PowerShell `npm.ps1` execution policy
- `npm.cmd test` - passed
- `npm.cmd run test:parser` - passed

## Not touched

- Runtime UI behavior
- `assets/js/graph.js`
- Placement scoring logic
- Generated JSON outputs
- Raw faction packets
- MTG lore, card facts, commander facts, or source claims
- Maze handoff behavior
- Supabase/context exports

## Follow-up recommendations

- Consider moving radar score authority into `data/identity-layers.json` or another Layer 1 source-backed registry.
- Add source-backed/direct matrix scores for the 14 fallback identities if the fallback averages are no longer desired.
- Add a regression test that compares direct radar constants against Layer 1 registry preview scores.
- If migrating score ownership, update `dossier-radar.js` to consume registry data instead of duplicating direct profiles.

## Next suggested agent

Planning Architect or JSON Cartographer for a source-first radar score authority migration plan.

## Related Kanban card, docs, or plans

- VM-364 - Archscry Identity Matrix Data Map
- VM-078 - Archscry Dossier Identity Matrix Radar
- VM-118 - Archscry Adjacent Identity Matrix Sync Repair
- VM-132 - Archscry Dossier Navigation, Identity Matrix, And Retake Polish
- VM-297 - Placement Data Source-Of-Truth Contamination Audit
- VM-300 - Source / Generated Guardrails
- `docs/reference/archscry-identity-matrix-data-map.md`
- `docs/reference/data-contracts.md`
- `docs/reference/source-generated-guardrails.md`
