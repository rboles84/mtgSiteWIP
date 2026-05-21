# Handoff - Archscry Placement Atlas Preview

Agent name: Codex

Task requested: Rearrange the Archscry placement page into a more unique and interesting preview composition while keeping the live result page clean, and add `archscry/index2.html` as the alternate route.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/handoffs/2026-05-20-1043-codex-vm079-newindex2-living-index-visual-hierarchy.md`
- `docs/handoffs/2026-05-20-1151-codex-vm080-newindex2-ambient-identity-signal-radar.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-078-archscry-dossier-identity-matrix-radar.md`
- `docs/kanban/done/VM-079-newindex2-living-index-visual-hierarchy.md`
- `docs/kanban/done/VM-080-newindex2-ambient-identity-signal-radar.md`
- `docs/research/ui_research/KEEP THIS_placement-dossier-advanced.html`
- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/dossier-radar.js`

## Files changed

- `archscry/index2.html`
- `assets/js/archscry-index2.js`
- `assets/js/index.js`
- `assets/js/dossier-radar.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-082-archscry-placement-atlas-preview.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1210-codex-archscry-placement-atlas-preview.md`

## What changed

- Added `archscry/index2.html` as a preview-only Archscry route that keeps the existing quiz, result, and dossier engine but layers in a different result composition.
- Added preview-scoped CSS in `archscry/index2.html` to widen the dossier canvas and arrange the existing result blocks into a more editorial "atlas" layout with signal, interpretation, launch, resource, and trail clusters.
- Added `assets/js/archscry-index2.js`, which watches the rendered result DOM, classifies the existing dossier sections, and moves the already-rendered nodes into the alternate atlas composition without rebuilding placement data.
- Preserved the working dossier radar by modularizing it into `assets/js/dossier-radar.js` and keeping the shared Archscry engine in `assets/js/index.js` focused on rendering the real result content.
- Updated the manual test reference to include a smoke pass for `/archscry/index2.html`.
- Completed and indexed Kanban card `VM-082` for this preview pass.

## Why it changed

The live placement page had already reached a stable state, so this pass creates a safer playground for composition experiments. `archscry/index2.html` lets the project explore bolder dossier arrangements without destabilizing the main Archscry route or duplicating the underlying placement logic.

## Decisions made

- Kept `archscry/index.html` as the stable/live experience and moved experimentation into `archscry/index2.html`.
- Reused the real `renderResult()` output instead of inventing a second dossier renderer, so quiz scoring, saved-result restore, adjacent fits, Maze links, and the existing dossier copy remain source-of-truth.
- Applied the alternate composition after render by moving DOM nodes into new wrappers, which keeps the preview specific to `index2` and avoids a broad rewrite of the live Archscry code path.
- Left placement data, Scryfall loading, and Maze handoff behavior untouched.

## Risks / uncertainties

- The preview enhancer classifies sections partly by `.section-label` text, so future dossier copy changes may require updates to `assets/js/archscry-index2.js`.
- Browser-backed visual QA was not available in-session, so the alternate composition was validated through code inspection, syntax checks, and existing repo tests rather than live layout screenshots.
- The preview route currently inherits almost all live Archscry markup, so future visual divergence should continue to stay page-scoped instead of drifting back into shared styles accidentally.

## Tests run

- `node --check assets/js/index.js`
- `node --check assets/js/dossier-radar.js`
- `node --check assets/js/archscry-index2.js`
- `npm.cmd test`
- `npm.cmd run test:placement`

## Not touched

- `archscry/index.html` result ordering and live dossier composition
- Placement scoring logic
- `data/factions.json`
- `data/placement-model.json`
- Maze return flow semantics
- Scryfall dossier image loading
- Shared homepage files and root `index.html`

## Follow-up recommendations

- Run a browser-backed pass on both `/archscry/` and `/archscry/index2.html` to compare live and preview compositions on desktop and mobile.
- If the atlas composition proves out, consider a later content-design card to refine section naming, emphasis, and sequencing rather than continuing to adjust it purely with layout rules.
- If more preview routes are added, extract a small section-classification helper so page-specific rearrangements do not duplicate the same matching logic.

## Next suggested agent

Frontend QA or browser verification for live-versus-preview result behavior and mobile spacing.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-082-archscry-placement-atlas-preview.md`
- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/research/ui_research/KEEP THIS_placement-dossier-advanced.html`
