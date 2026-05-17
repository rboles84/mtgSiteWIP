# VM-021B - Surgical Fix: Adjacent Fits Top Placement + Return Anchor

ID: VM-021B
Title: Surgical Fix: Adjacent Fits Top Placement + Return Anchor
Status: done
Type: UX / reliability
Area: Archscry, Maze
Priority: high
Created: 2026-05-16

## Summary

Apply the last surgical QA correction from VM-021A: remove the redundant primary-fit status block, place Adjacent Fits directly under Primary Placement, and keep the Maze return anchor landing near the dossier section instead of the top of the page.

## Source

- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`

## Acceptance Criteria

- Adjacent Fits appears immediately after Primary Placement.
- The redundant primary-fit status block is removed for the primary dossier view.
- Maze return still lands near the dossier section anchor.

## Notes

Implemented as a one-block render correction only. No redesign, no scoring changes, no route changes, no QR work.
