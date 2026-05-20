# VM-070 - Keep Stars, Remove Only Home Bubble Layers

ID: VM-070
Title: Keep Stars, Remove Only Home Bubble Layers
Status: done
Type: Frontend / Visual Cleanup
Area: Home, Background
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Correct the earlier bubble-removal interpretation by keeping the star effect visible and limiting the live home cleanup to the bubble-causing background layers on `index.html`.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-1956-codex-live-home-css-restoration.md`
- `docs/handoffs/2026-05-20-0019-codex-vm069-remove-bubble-atmosphere-newindex2.md`
- `docs/kanban/board.md`
- `index.html`
- `assets/css/home.css`
- `newIndex2.html`

## Problem

The user likes the star effect, but the live home in `index.html` still felt bad because the bubble-causing background layers were the problem, not the stars. The previous pass on `newIndex2.html` was too aggressive because it turned off stars entirely.

## Acceptance Criteria

- `newIndex2.html` keeps its star-particle effect enabled.
- `newIndex2.html` still hides only the nebula overlay.
- `index.html` keeps the star canvas visible.
- `index.html` hides only `.vm-bg::before`, `.vm-bg::after`, and `.vm-bg__nebula`.
- Layout and route wiring remain unchanged.

## Dependencies / Related Work

- `VM-069 - Remove Bubble Atmosphere From newIndex2`
- `VM-068 - Preview Home Link Retarget To newIndex2`
- `VM-066 - newIndex2 Self-Contained Wiring`

## Files Likely Impacted

- `newIndex2.html`
- `assets/css/home.css`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- The live home may still retain other atmosphere treatments outside the specific bubble-causing layers.
- `VM-069` now represents the initial over-broad interpretation; this pass is the corrective follow-up.

## Implementation Prompt

Restore the star effect in `newIndex2.html`, and narrow the live-home bubble suppression in `assets/css/home.css` so the stars remain visible while the bubble-like layers stay removed.

## Human Review

Yes - refresh `newIndex2.html` to confirm stars are back, and refresh `index.html` to confirm the bubble effect is gone while stars remain.

## Notes

This is a correction pass. Keep the fix surgical and avoid broader home redesign changes.
