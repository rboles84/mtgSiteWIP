# VM-072 - newIndex2 Star Visibility Fix

ID: VM-072
Title: newIndex2 Star Visibility Fix
Status: done
Type: Frontend / Visual Bugfix
Area: Preview Home, Background
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Fix the `newIndex2.html` background layering so the star canvas is actually visible above the page's decorative background image stack, while keeping the page self-contained and structurally unchanged.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0046-codex-vm071-newindex2-layered-stars-and-orbs.md`
- `docs/handoffs/2026-05-20-0021-codex-vm070-keep-stars-remove-only-home-bubble-layers.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Problem

The layered stars-and-orbs pass added the canvas behavior, but the star field still did not read visually. A duplicate full-screen `body::before` background image was stacked above the `.vm-bg` container, and the star canvas relied on weak default stacking. The starburst threshold was also set impossibly high, preventing flashes entirely.

## Acceptance Criteria

- `newIndex2.html` still uses the existing single `.vm-bg__stars` canvas.
- The body-level duplicate image layer no longer sits above the decorative `.vm-bg` stack.
- The star canvas has explicit styling that lets stars and orbs read on top of the background image within `.vm-bg`.
- Starbursts can actually trigger again.
- No layout, routing, content, or radar changes are introduced.

## Dependencies / Related Work

- `VM-071 - newIndex2 Layered Stars And Orbs`
- `VM-070 - Keep Stars, Remove Only Home Bubble Layers`
- `VM-066 - newIndex2 Self-Contained Wiring`

## Files Likely Impacted

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- If the background image remains intentionally very bright, the star canvas may still need small alpha tuning later even with the corrected stacking.
- This pass preserves the current page-local background recipe rather than refactoring the duplicated body and `.vm-bg` image systems.

## Implementation Prompt

Lower the duplicate `body::before` image behind the `.vm-bg` container, give `.vm-bg__stars` explicit visibility styling, and correct the impossible starburst threshold in `newIndex2.html`.

## Human Review

Yes - refresh `newIndex2.html` and confirm stars are now visibly present behind the content instead of disappearing into the background.

## Notes

Keep the fix surgical and self-contained to `newIndex2.html`.
