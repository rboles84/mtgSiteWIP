# VM-075 - newIndex2 Atmosphere Tuning Notes

ID: VM-075
Title: newIndex2 Atmosphere Tuning Notes
Status: done
Type: Frontend / Visual Tuning
Area: Preview Home, Background
Priority: medium
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Tune the visible `newIndex2.html` stars-and-orbs atmosphere so stars remain the primary background texture, then add inline explanatory notes beside the main CSS and particle-value knobs so the page can be iterated by edit-and-refresh.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0115-codex-vm074-newindex2-star-canvas-body-promotion.md`
- `docs/handoffs/2026-05-20-0046-codex-vm071-newindex2-layered-stars-and-orbs.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Problem

The stars and orbs are finally visible, but the user wants two follow-ups: a gentle balance pass so the atmosphere feels intentional, and clear inline notes explaining what the important CSS and particle values do when changed manually.

## Acceptance Criteria

- `newIndex2.html` remains self-contained.
- The stars stay visually primary over the orb layer.
- The orb layer becomes a little calmer and more secondary.
- Inline comments clearly explain the main CSS and atmosphere values the user is likely to tweak.
- Layout, routing, radar, Chart.js setup, and page structure remain unchanged.

## Dependencies / Related Work

- `VM-074 - newIndex2 Star Canvas Body Promotion`
- `VM-073 - newIndex2 Star Root Stacking Fix`
- `VM-071 - newIndex2 Layered Stars And Orbs`

## Files Likely Impacted

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- Tuning is subjective, so this pass intentionally changes values only gently.
- If the user wants a brighter or denser sky after this pass, the new inline notes should make that follow-up easy without more structural work.

## Implementation Prompt

Add inline “knob” comments around the background filters, overlay, star canvas, and particle-generation values in `newIndex2.html`, then make a small balance pass that slightly calms the orb layer and keeps the stars readable.

## Human Review

Yes - open `newIndex2.html`, tweak a few annotated values, refresh, and confirm the comments make the atmosphere easy to tune live.

## Notes

Keep the scope limited to `newIndex2.html` plus the required project-memory updates.
