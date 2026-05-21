# VM-087 - Archscry Shell Modernization

ID: VM-087
Title: Archscry Shell Modernization
Status: done
Type: Frontend / UX Refresh
Area: Archscry
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Refresh `/archscry/` and `/archscry/index2.html` so they share the newer Vox Mana shell and surface language while preserving the stabilized placement flow, dossier radar, and preview-only atlas composition.

## Source Evidence

- `docs/handoffs/2026-05-20-1210-codex-archscry-placement-atlas-preview.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `archscry/index.html`
- `archscry/index2.html`
- User request to align Archscry with the newer main-page visual world

## Acceptance Criteria

- `/archscry/` and `/archscry/index2.html` load a shared `assets/css/archscry.css` theme layer.
- `archscry/index2.html` keeps its atlas composition styles in a separate `assets/css/archscry-atlas.css`.
- Landing, quick reading, interview, decree, result, and dossier surfaces feel visually continuous with the newer home shell.
- The live route keeps existing placement behavior, adjacent-fit switching, saved-result restore, retake flow, Maze handoff, and Scryfall loading.
- The preview route keeps the alternate atlas composition and still reapplies it after rerenders.

## Notes

Keep runtime contracts intact. Favor a shared CSS layer and minimal HTML wiring over a broad JavaScript or markup rewrite.

## Completion Notes

- Added a shared `assets/css/archscry.css` shell layer for both Archscry routes.
- Added `assets/css/archscry-atlas.css` so the `index2` atlas composition stays page-specific instead of living in duplicated inline CSS.
- Wired both `archscry/index.html` and `archscry/index2.html` into the new shared shell while preserving the current quiz/result engine, dossier radar, and preview atlas rearrangement.

## Tests Run

- `node --check assets/js/index.js`
- `node --check assets/js/dossier-radar.js`
- `node --check assets/js/archscry-index2.js`
- `npm.cmd test`
- `npm.cmd run test:placement`
