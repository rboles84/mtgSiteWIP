# VM-071 - newIndex2 Layered Stars And Orbs

ID: VM-071
Title: newIndex2 Layered Stars And Orbs
Status: done
Type: Frontend / Visual Behavior
Area: Preview Home, Background
Priority: medium
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Upgrade the existing inline atmosphere behavior in `newIndex2.html` so the single background canvas renders both twinkling stars and softer floating gold orbs without introducing shared assets or changing page structure.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-0021-codex-vm070-keep-stars-remove-only-home-bubble-layers.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Problem

`newIndex2.html` already had a self-contained atmosphere canvas, but it only rendered upward-drifting particles that read more like floating light orbs than distant twinkling stars. The user wants both effects together while keeping the page isolated from shared-home code.

## Acceptance Criteria

- `newIndex2.html` still uses the existing single `.vm-bg__stars` canvas.
- The inline atmosphere function uses separate star and orb arrays instead of one generic particle list.
- Stars mostly stay fixed in place and twinkle subtly.
- Orbs remain warmer, larger, fewer, and drift upward above the stars.
- Reduced motion, visibility pause behavior, resize handling, and pointer glow behavior still work.
- No layout, routing, radar, Chart.js, or shared-asset changes are introduced.

## Dependencies / Related Work

- `VM-070 - Keep Stars, Remove Only Home Bubble Layers`
- `VM-069 - Remove Bubble Atmosphere From newIndex2`
- `VM-066 - newIndex2 Self-Contained Wiring`

## Files Likely Impacted

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- If starbursts or orb density are too strong in-browser, this pass may need a small tuning follow-up rather than a structural rewrite.
- The page remains self-contained by design, so atmosphere improvements here do not propagate to other home variants.

## Implementation Prompt

Replace the current single-particle atmosphere model inside `initArchscryAtmosphere()` with two layered particle groups on the existing canvas: mostly fixed twinkling stars behind softer floating gold orbs, while preserving the rest of `newIndex2.html` intact.

## Human Review

Yes - open `newIndex2.html` and confirm the stars twinkle behind the slower floating orbs, with no layout or radar regressions.

## Notes

Keep this as a contained visual-behavior pass for `newIndex2.html` only. Do not pull in `assets/js/atmosphere.js` or introduce a second canvas.
