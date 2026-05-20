# Handoff - VM-069 Remove Bubble Atmosphere From newIndex2

Agent name: Codex

Task requested: Remove the bubble-like background effect from `newIndex2.html` while keeping the page layout and inline structure intact, then update the project-memory trail.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-0018-codex-vm068-preview-home-link-retarget-to-newindex2.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/done/VM-069-remove-bubble-atmosphere-newindex2.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0019-codex-vm069-remove-bubble-atmosphere-newindex2.md`

## What Changed

- Added a small CSS override in `newIndex2.html` that hides `.vm-bg__nebula` and `.vm-bg__stars`.
- Changed the inline `ARCHSCRY_ENABLED` feature flag from `true` to `false` so the particle atmosphere no longer initializes.
- Added the `VM-069` done card, board entry, and handoff index entry for the visual cleanup pass.

## Why It Changed

The user explicitly wants the bubble-like atmosphere removed from `newIndex2.html`. The animated particle canvas and nebula overlay were the direct decorative layers creating that effect.

## Decisions Made

- Scoped the change to `newIndex2.html` only.
- Kept the background image and overall page layout intact.
- Disabled the particle system in JavaScript as well as hiding the canvas layer so the effect is removed cleanly and the page does not keep animating an invisible canvas.

## Risks / Uncertainties

- The page will feel more still and less atmospheric after this pass, which is expected.
- `body::after` still provides the darker overlay and mouse-follow glow unless changed later.

## Tests Run

- Static scan confirming `.vm-bg__nebula` and `.vm-bg__stars` are now hidden in `newIndex2.html`.
- Static scan confirming `ARCHSCRY_ENABLED` is now `false` in `newIndex2.html`.
- Static review confirming the rest of the page wiring and layout structure were left untouched.

## Not Touched

- `index.html`
- `newIndex.html`
- Route pages such as Archscry, Maze, and Apocrypha
- Shared site CSS and JS
- Chart.js setup and page content structure

## Follow-Up Recommendations

- Refresh `newIndex2.html` and confirm the bubble effect is gone.
- If you want an even flatter background later, the next small pass would be to tone down or remove the `body::after` mouse-follow glow.

## Next Suggested Agent

Frontend follow-up only if you want to further simplify the remaining background glow treatment.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-069-remove-bubble-atmosphere-newindex2.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-0018-codex-vm068-preview-home-link-retarget-to-newindex2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
