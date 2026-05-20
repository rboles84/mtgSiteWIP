# Handoff - VM-071 newIndex2 Layered Stars And Orbs

Agent name: Codex

Task requested: Update only the existing inline atmosphere behavior in `newIndex2.html` so the single background canvas renders both twinkling stars and softer floating gold orbs, while keeping the page self-contained and leaving the rest of the page unchanged.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-0019-codex-vm069-remove-bubble-atmosphere-newindex2.md`
- `docs/handoffs/2026-05-20-0021-codex-vm070-keep-stars-remove-only-home-bubble-layers.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-070-keep-stars-remove-only-home-bubble-layers.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/done/VM-071-newindex2-layered-stars-and-orbs.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0046-codex-vm071-newindex2-layered-stars-and-orbs.md`

## What Changed

- Replaced the single `particles` array in `initArchscryAtmosphere()` with separate `stars` and `orbs` arrays plus a shared `tick` counter.
- Added `resetStars()` for a denser mostly fixed twinkling star layer with per-star pulse, phase, and small burst potential.
- Added `resetOrbs()` for a sparser warmer floating orb layer that drifts upward above the stars.
- Split rendering into `drawStars()`, `drawOrbs()`, `drawStaticAtmosphere()`, and `drawAtmosphere()` while keeping everything on the existing `.vm-bg__stars` canvas.
- Updated `resizeCanvas()` to rebuild both layers and paint a static frame immediately after reset.
- Left all markup, layout, routing, Chart.js setup, navigation, cards, sections, and pointer-glow behavior intact.
- Added the `VM-071` done card plus the board and handoff index entries for this visual-behavior pass.

## Why It Changed

The user wants `newIndex2.html` to keep the existing magical upward-drifting light while also gaining the twinkling star flash that feels present in `newIndex.html`. The safest way to do that without bleed from shared home assets is to enhance the existing inline canvas logic rather than import shared atmosphere code.

## Decisions Made

- Kept the page self-contained by editing only the existing inline atmosphere function in `newIndex2.html`.
- Reused the current single full-screen canvas instead of adding a second canvas or new DOM.
- Drew stars first and orbs second so the stars stay farther back visually.
- Preserved the existing reduced-motion, visibility, resize, and pointermove hooks.
- Left the Chart.js CDN, color matrix logic, and all page structure untouched.

## Risks / Uncertainties

- The current burst frequency and orb density are tuned from static reasoning and may still want a small visual follow-up after browser review.
- Reduced-motion mode now paints a static layered frame each loop cycle rather than moving the atmosphere, which matches the intent but could be tightened further if a later pass wants stricter idle efficiency.

## Tests Run

- Static review of the updated `initArchscryAtmosphere()` block in `newIndex2.html`.
- Static check confirming the page still uses the single existing `.vm-bg__stars` canvas.
- Static check confirming no new shared CSS or JS imports were added.
- Static check confirming the Chart.js CDN include remains unchanged.
- Planned local browser pass for `newIndex2.html` to verify the two-layer effect and confirm no console errors.

## Not Touched

- `index.html`
- `newIndex.html`
- `assets/css/home.css`
- `assets/js/atmosphere.js`
- Route pages such as Archscry, Maze, Apocrypha, Privacy, and Terms
- Chart.js configuration and radar behavior
- Navigation, body content, and footer structure

## Follow-Up Recommendations

- Open `newIndex2.html` and tune starburst frequency or orb density only if the combined atmosphere reads too busy.
- If the user later wants this same two-layer effect elsewhere, treat that as a separate pass instead of extracting shared code preemptively.

## Next Suggested Agent

Frontend visual QA only if the user wants in-browser tuning after seeing the combined effect live.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-071-newindex2-layered-stars-and-orbs.md`
- `docs/kanban/done/VM-070-keep-stars-remove-only-home-bubble-layers.md`
- `docs/kanban/done/VM-069-remove-bubble-atmosphere-newindex2.md`
- `docs/kanban/done/VM-066-newindex2-self-contained-wiring.md`
- `docs/handoffs/HANDOFF_INDEX.md`
