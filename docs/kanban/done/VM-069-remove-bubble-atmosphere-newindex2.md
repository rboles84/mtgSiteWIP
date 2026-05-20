# VM-069 - Remove Bubble Atmosphere From newIndex2

ID: VM-069
Title: Remove Bubble Atmosphere From newIndex2
Status: done
Type: Frontend / Visual Cleanup
Area: Home Preview, Background
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Remove the bubble-like decorative atmosphere from `newIndex2.html` by disabling the nebula overlay and particle-canvas background while leaving the page layout intact.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-0018-codex-vm068-preview-home-link-retarget-to-newindex2.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Problem

`newIndex2.html` still rendered a decorative nebula layer and animated particle canvas that created a bubble-like background effect the user wants removed.

## Acceptance Criteria

- `newIndex2.html` no longer shows the nebula overlay.
- `newIndex2.html` no longer shows the particle-canvas background.
- The rest of the page layout, inline structure, and navigation remain unchanged.
- The background image and main page shell stay intact.

## Dependencies / Related Work

- `VM-066 - newIndex2 Self-Contained Wiring`
- `VM-068 - Preview Home Link Retarget To newIndex2`

## Files Likely Impacted

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- Removing the decorative layers will make the page feel visually calmer and flatter, which is intentional for this pass.
- Mouse-glow behavior from `body::after` remains unless changed in a later pass.

## Implementation Prompt

Hide the nebula and particle-canvas layers in `newIndex2.html` and disable the particle initializer so the bubble effect is removed without redesigning the page.

## Human Review

Yes - refresh `newIndex2.html` and confirm the animated bubble-like background effect is gone.

## Notes

Keep this change scoped to `newIndex2.html`. Do not redesign the layout or switch the page onto shared CSS/JS.
