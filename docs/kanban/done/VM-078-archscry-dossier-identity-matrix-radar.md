# VM-078 - Archscry Dossier Identity Matrix Radar

ID: VM-078
Title: Archscry Dossier Identity Matrix Radar
Status: done
Type: Frontend / UX
Area: Archscry, Dossier
Priority: high
Created: 2026-05-20

## Summary

Replace the Archscry dossier's current Mana Alignment WUBRG evidence bars with a fully wired, result-driven Identity Matrix radar module that renders directly from the completed placement result.

## Source

- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `newIndex2.html`
- User-provided Archscry dossier radar implementation plan

## Acceptance Criteria

- The old Mana Alignment bar-only section is no longer rendered.
- The dossier shows a `Mana Alignment Matrix` section in the same rendered position where the old `scores-section` appeared.
- The left panel renders the selected synthesis card, component-color line, and Order / Knowledge / Ambition / Freedom / Growth axis bars.
- The right panel renders a working Chart.js radar, caption, and dataset pills, plus toggles when the profile is multi-color.
- Adjacent-fit switching, saved-result restore, and retake/new-result rerenders do not duplicate Chart.js instances.
- Mono and college results render correctly without homepage selector UI.

## Notes

Keep this scoped to Archscry dossier rendering in `archscry/index.html` and `assets/js/index.js`. Use the vendored local chart runtime at `assets/js/graph.js` instead of a CDN include. Do not modify the shared portable radar helper unless safe reuse is already contract-stable.
