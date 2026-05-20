# VM-074 - newIndex2 Star Canvas Body Promotion

ID: VM-074
Title: newIndex2 Star Canvas Body Promotion
Status: done
Type: Frontend / Visual Bugfix
Area: Preview Home, Background
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Move the existing `newIndex2.html` star canvas to the root body layer at runtime so it can render outside the lower background stacking context, and strengthen the star layer so it is visibly closer to the working `newIndex.html` behavior.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0107-codex-vm073-newindex2-star-root-stacking-fix.md`
- `docs/handoffs/2026-05-20-0046-codex-vm071-newindex2-layered-stars-and-orbs.md`
- `docs/kanban/board.md`
- `newIndex.html`
- `newIndex2.html`

## Problem

The prior CSS-only stacking fixes still depended on the star canvas living inside the original `.vm-bg` container. That meant the canvas was still vulnerable to container-level stacking behavior instead of behaving like an independent viewport layer. The stars were also tuned dimmer than the working `newIndex` version.

## Acceptance Criteria

- `newIndex2.html` still uses the same single existing `.vm-bg__stars` canvas.
- The existing canvas is moved to `document.body` at runtime before drawing begins.
- Stars are brighter and slightly larger so they read visibly over the current background treatment.
- Orb intensity is reduced slightly so stars remain the dominant background texture.
- No layout, routing, radar, or content changes are introduced.

## Dependencies / Related Work

- `VM-073 - newIndex2 Star Root Stacking Fix`
- `VM-072 - newIndex2 Star Visibility Fix`
- `VM-071 - newIndex2 Layered Stars And Orbs`

## Files Likely Impacted

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- A hard browser refresh is still required to clear cached inline JS/CSS after repeated local testing.
- If the stars still feel too faint after the body-promotion fix, the next pass should be pure visual tuning rather than more stacking surgery.

## Implementation Prompt

Move the existing `.vm-bg__stars` canvas to `document.body` at runtime inside `initArchscryAtmosphere()`, then increase star radius/alpha/pulse slightly and lower orb opacity so the stars read more clearly.

## Human Review

Yes - hard refresh `newIndex2.html` and confirm the stars are now clearly visible like `newIndex.html`, with orbs remaining secondary.

## Notes

Keep the fix fully self-contained in `newIndex2.html`.
