# VM-082 - Archscry Placement Atlas Preview

ID: VM-082
Title: Archscry Placement Atlas Preview
Status: done
Type: Frontend / UX Preview
Area: Archscry, Dossier
Priority: medium
Created: 2026-05-20

## Summary

Create an alternate `archscry/index2.html` preview that keeps the working Archscry quiz/result engine intact while rearranging the rendered placement dossier into a more editorial, visually distinct composition.

## Source

- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/handoffs/2026-05-16-1310-codex-vm021b-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/handoffs/2026-05-20-1043-codex-vm079-newindex2-living-index-visual-hierarchy.md`
- `docs/handoffs/2026-05-20-1151-codex-vm080-newindex2-ambient-identity-signal-radar.md`
- `docs/research/ui_research/KEEP THIS_placement-dossier-advanced.html`
- User request for a clean `archscry/index2.html` placement preview

## Acceptance Criteria

- `archscry/index2.html` exists as a preview-only Archscry entry.
- The preview still allows a user to take the quiz and reach a working placement result.
- The preview reuses the existing placement and dossier data flow rather than inventing a second scoring model.
- The rendered dossier sections are rearranged into a more unique, intentional composition without breaking the quiz flow.
- The live `archscry/index.html` result experience remains unchanged.
- The existing dossier radar, adjacent-fit switching, retake flow, and Maze handoff still work inside the preview.

## Notes

Keep the live result renderer stable where possible. Prefer a page-specific enhancer layered onto `index2` over a broad rewrite of `assets/js/index.js`.
