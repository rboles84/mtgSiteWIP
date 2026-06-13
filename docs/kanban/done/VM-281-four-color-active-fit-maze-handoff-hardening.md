ID: VM-281
Title: Four-Color Active-Fit Maze Handoff Hardening
Status: Done
Type: Runtime Repair / Maze Handoff / Regression Coverage
Area: Four-Color, Archscry, Maze
Priority: high

## Summary

Hardened the shared Archscry-to-Maze handoff contract after a live Glint report showed the Maze dossier sidebar still rendering stale `WB` identity context from a mixed handoff URL.

The reported URL carried conflicting identity signals:

- `guild=DUNE`
- `fit=GLINT`
- `factionName=Glint`
- `operatorQuery=id=ubrg ...`
- stale prior storage could still contain `WB` placement data

This card treats the issue as a shared active-fit contract failure, not a Glint-only copy bug.

## Root Causes Identified

- Archscry handoffs still used the legacy `guild` field for the source reading faction, while Maze-era dossier links also need a distinct active fit.
- Maze handoff restore merged old localStorage placement results into the active handoff result, so mismatched stale `WB` score fields could survive if an active fit was missing or under-mapped.
- Regression coverage did not previously model the exact failure shape: active `fit=GLINT`, source `guild=DUNE`, executable `id=ubrg`, and stale `WB` placement storage together.

## Implementation

- Updated `assets/js/archscry-presentation.js` so generated Archscry Maze contexts put the active dossier key in legacy `guild` and preserve the source reading faction separately as `sourceFaction`.
- Updated `research/research-init.js` so Archscry-origin handoffs resolve active identity through `fit`, executable operator query, faction label, existing fit, then legacy guild.
- Updated `research/research-init.js` so mismatched stored placement results are not spread into the active sidebar result.
- Added a focused `research/maze-search-tests.js` regression using the reported mixed Glint URL shape plus stale `WB` localStorage.

## Boundaries

- No raw, research, architecture, generated, precon-source, route, Home preview, hero, or schema files were intentionally changed by this pass.
- `YORE`, `GLINT`, and `DUNE` remain the only live four-color keys.
- `INK`, `WITCH`, `RGWU`, and `GWUB` remain non-live.
- `WUBR`, `UBRG`, `BRGW`, and their permutations remain metadata/query-only.

## Tests

- `node --check assets/js/archscry-presentation.js`
- `node --check research/research-init.js`
- `node --check research/maze-search-tests.js`
- `node research/maze-search-tests.js`

## Notes

The broader worktree already contained many unrelated dirty files from prior VM cards. This card only adds the targeted handoff hardening and regression coverage listed above.
