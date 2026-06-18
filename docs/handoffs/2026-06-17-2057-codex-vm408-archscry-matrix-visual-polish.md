# 2026-06-17 20:57 - Codex - VM-408 Archscry Matrix Visual Polish

## Agent Name

Codex

## Task Requested

Implement the mock-guided Archscry Identity Matrix visual polish while preserving the locked balanced layout, keeping Home out of the new layered-fill path, avoiding `graph.js`, and running only non-UI checks.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/done/VM-407-identity-radar-v2-visual-info-upgrade.md`
- `docs/handoffs/2026-06-16-1901-codex-vm407-identity-radar-v2.md`
- `assets/js/vm-radar.js`
- `assets/js/dossier-radar.js`
- `assets/js/home.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `assets/js/vm-radar.js`
- `assets/js/dossier-radar.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-408-archscry-identity-matrix-mock-guided-visual-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-17-2057-codex-vm408-archscry-matrix-visual-polish.md`

## What Changed

- Added `VMRadar.createLayeredFillPlugin()` as an opt-in shared radar plugin.
- Extended `VMRadar.buildDatasets()` with a `layeredFill` option that defaults to false and marks only opted-in composite datasets.
- Opted Archscry into the plugin and dataset flag from `assets/js/dossier-radar.js`.
- Tuned Archscry composite radar styling to use a softer line, restrained glow, and small warm yellow/gold vertices.
- Kept component dashed overlays visible and non-glowing as contextual traces.
- Tightened Archscry CSS surfaces, trait-row spacing, pip/strength rhythm, and Strategium popover styling.
- Added compact trait-row readout markup.
- Extended follow-up regressions for the opt-in contract, Home opt-out boundary, component trace preservation, composite dataset styling, compact rows, and hidden popover behavior.
- Moved VM-408 from in progress to done.

## Why It Changed

The owner liked the locked mock atmosphere but wanted the live Archscry implementation to better match the mock's synthesis fill, glow, typography, and trait-row rhythm without revisiting the balanced page structure or impacting Home.

## Decisions Made

- Layered fill is shared utility capability, but not shared default behavior.
- Archscry is the only caller setting the layered-fill flag in this task.
- Component lobe gradients are visual fill origins only; they do not alter radar score geometry or interactions.
- Composite points use warm yellow/gold rather than component-colored dots for this pass.
- Manual QA remains the authority for subjective visual matching.

## Risks / Uncertainties

- The layered fill is verified by non-UI source and syntax checks, not browser visual snapshots.
- Final glow intensity and spacing still need owner manual QA against the mock.
- The work sits on top of the broader VM-407 dirty tree, so final review should consider both VM-407 and VM-408 together.

## Tests Run

- `node --check assets/js/vm-radar.js`
- `node --check assets/js/dossier-radar.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run lint:js`

## Not Touched

- `assets/js/graph.js`
- Home radar behavior, preview data, options, cycle, latch, and layout
- Radar score calculation, registry profile values, fallback profile logic, placement flow, and axis order
- Lore, card facts, commander facts, and placement data
- Existing unrelated dirty work such as `assets/css/topbar.css`
- No staging, commit, push, reset, or branch rewrite was performed.

## Follow-Up Recommendations

- Run owner manual QA on Archscry against `vox-mana-identity-matrix-v2-mock_Final.html`.
- If the owner still sees too much glow, tune only Archscry's `DOSSIER_SYNTHESIS_GOLD` glow alpha/blur and CSS surface opacity.
- Consider visual snapshot coverage later if this matrix becomes a stable release gate.

## Next Suggested Agent

Manual QA / Visual Steward

## Related Kanban Card, Docs, Or Plans

- VM-408 - `docs/kanban/done/VM-408-archscry-identity-matrix-mock-guided-visual-polish.md`
- VM-407 - `docs/kanban/done/VM-407-identity-radar-v2-visual-info-upgrade.md`
- VM-364 - `docs/reference/archscry-identity-matrix-data-map.md`
