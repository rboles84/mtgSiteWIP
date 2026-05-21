# Handoff - Archscry Dossier Identity Matrix Radar

Agent name: Codex

Task requested: Replace the Archscry dossier Mana Alignment WUBRG evidence bars with a fully wired result-driven Identity Matrix radar module, keep it in the same dossier slot, preserve adjacent-fit and saved-result behavior, and use a local chart runtime instead of a CDN include.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-19-2142-codex-newindex-chartjs-preview-repair.md`
- `docs/handoffs/2026-05-19-2223-codex-newindex-chartjs-repair-retry.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-063-homepage-preview-portable-identity-radar.md`
- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `docs/kanban/done/VM-065-newindex-chartjs-repair-retry.md`
- `docs/kanban/done/VM-078-archscry-dossier-identity-matrix-radar.md`
- `docs/reference/manual-test-cases.md`
- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/color-matrix-radar.js`
- `assets/js/home-preview.js`
- `newIndex2.html`
- `data/factions.json`
- `data/placement-model.json`

## Files changed

- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/graph.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-078-archscry-dossier-identity-matrix-radar.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`

## What changed

- Replaced the old dossier `scores-section` Mana Alignment bar block in `renderResult()` with a fully rendered `Mana Alignment Matrix` module in the same placement slot.
- Added dossier-local radar presenter data and helpers in `assets/js/index.js` for mono colors, guilds, and colleges using the philosophical axes `Order`, `Knowledge`, `Ambition`, `Freedom`, and `Growth`.
- Added dossier-local rendering helpers for the selected synthesis card, component-color overlay line, axis bars, dataset pills, and Chart.js radar mount lifecycle.
- Added `destroyDossierManaRadar()` calls around result rerender/reset flows so adjacent-fit switches, saved-result restores, and retakes do not leave duplicate chart instances behind.
- Added a right-panel fallback path so the left-side Identity Matrix still renders if the chart runtime is unavailable.
- Added the additive dossier radar CSS block to `archscry/index.html` using the `newIndex2.html` visual language without replacing the existing Archscry layout system.
- Replaced the Archscry CDN include with a local vendored chart runtime at `assets/js/graph.js`.
- Updated the manual test reference to cover the dossier radar behavior and the local chart-runtime fallback path.
- Added and completed Kanban card `VM-078` for this work and indexed this handoff.

## Why it changed

The old five-bar WUBRG evidence strip was the weakest proof moment in the dossier. This pass replaces it with a result-locked synthesis view that shows how a placement expresses its philosophical pressure profile, while preserving the existing dossier flow and behavior that earlier Archscry work stabilized.

## Decisions made

- Kept the dossier wiring local to `assets/js/index.js` instead of importing the current `assets/js/color-matrix-radar.js` helper, because the current on-disk helper still assumes homepage IDs and an external chart runtime and is not yet a safe Archscry dependency.
- Used presenter-local radar profile data keyed by `result.faction` so the saved placement contract did not need to change.
- Used dossier-specific DOM IDs throughout to avoid collisions with homepage Color Matrix mounts.
- Kept the new module in the exact render slot where the old `scores-section` appeared rather than reordering the rest of the dossier.
- Vendored Chart.js 4.5.1 into `assets/js/graph.js` so the Archscry dossier no longer depends on a CDN lookup call.

## Risks / uncertainties

- Browser-backed visual QA was not available in-session, so validation stayed at code inspection, syntax checks, and repo test suites rather than live canvas rendering screenshots.
- `assets/js/color-matrix-radar.js` still does not match the API described in the VM-063 handoff, but it was intentionally left untouched in this pass to avoid destabilizing preview surfaces.
- The Archscry dossier now uses a local vendored chart bundle, while preview pages elsewhere in the repo may still reference a CDN path until they are migrated separately.

## Tests run

- `node --check assets/js/graph.js`
- `node --check assets/js/index.js`
- `npm.cmd test`
- `npm.cmd run test:placement`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
  - Completed with line-ending warnings only for existing LF/CRLF normalization differences.

## Not touched

- `assets/js/color-matrix-radar.js`
- `assets/js/home-preview.js`
- `assets/js/commander-dossier.js`
- `data/factions.json`
- `data/placement-model.json`
- Placement scoring logic and saved result contract shape
- Maze return flow semantics
- Scryfall dossier image-loading logic
- Homepage selector UI and Magic Basics UI

## Follow-up recommendations

- Run a browser-backed Archscry pass to visually verify the canvas glow, point-label spacing, and mobile collapse behavior with real result states.
- Consider a later cleanup card to reconcile the documented VM-063 shared radar API with the current `assets/js/color-matrix-radar.js` implementation before reusing that helper in more surfaces.
- If the local vendored bundle should become the standard chart runtime, migrate the remaining preview pages off their CDN references in a separate scoped pass.

## Next suggested agent

Frontend QA or Browser-backed verification follow-up once an in-session local browser target is available.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-078-archscry-dossier-identity-matrix-radar.md`
- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/reference/manual-test-cases.md`
