# VM-073 - newIndex2 Star Root Stacking Fix

ID: VM-073
Title: newIndex2 Star Root Stacking Fix
Status: done
Type: Frontend / Visual Bugfix
Area: Preview Home, Background
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Correct the remaining `newIndex2.html` star visibility issue by lifting the star canvas into a fixed root viewport layer above the page's dark body overlay while keeping it behind content.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0057-codex-vm072-newindex2-star-visibility-fix.md`
- `docs/handoffs/2026-05-20-0046-codex-vm071-newindex2-layered-stars-and-orbs.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Problem

The earlier visibility fix moved one image layer back and corrected starburst logic, but `newIndex2.html` still differed from `newIndex.html` because its star canvas remained inside the lower `.vm-bg` stacking context. That meant the body overlay could still visually win over the stars.

## Acceptance Criteria

- `newIndex2.html` still uses the existing single `.vm-bg__stars` canvas.
- The star canvas is promoted to a fixed viewport layer above the body overlay and below content.
- The star canvas does not block clicks.
- No layout, routing, content, or radar behavior changes are introduced.

## Dependencies / Related Work

- `VM-072 - newIndex2 Star Visibility Fix`
- `VM-071 - newIndex2 Layered Stars And Orbs`
- `VM-070 - Keep Stars, Remove Only Home Bubble Layers`

## Files Likely Impacted

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- If the stars are still too subtle after the stacking fix, the next pass should tune star alpha or count rather than further rework stacking.
- `newIndex2.html` still retains multiple background layers by design; this pass only resolves the star canvas visibility path.

## Implementation Prompt

Change `.vm-bg__stars` in `newIndex2.html` from an in-container absolute layer to a fixed viewport layer with negative root z-index and explicit `pointer-events: none`, so it can read above the body overlay while remaining behind content.

## Human Review

Yes - hard refresh `newIndex2.html` and confirm the stars now read the same way they do in `newIndex.html`, with visible motion behind the page content.

## Notes

Keep the page self-contained and avoid pulling in shared atmosphere assets.
