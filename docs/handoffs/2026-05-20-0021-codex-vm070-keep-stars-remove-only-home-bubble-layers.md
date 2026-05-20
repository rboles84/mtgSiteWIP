# Handoff - VM-070 Keep Stars, Remove Only Home Bubble Layers

Agent name: Codex

Task requested: Correct the earlier bubble-removal pass by restoring the star effect and limiting the live-home cleanup to the bubble-causing background layers.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-1956-codex-live-home-css-restoration.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-0018-codex-vm068-preview-home-link-retarget-to-newindex2.md`
- `docs/handoffs/2026-05-20-0019-codex-vm069-remove-bubble-atmosphere-newindex2.md`
- `docs/kanban/board.md`
- `index.html`
- `assets/css/home.css`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `assets/css/home.css`
- `docs/kanban/done/VM-070-keep-stars-remove-only-home-bubble-layers.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0021-codex-vm070-keep-stars-remove-only-home-bubble-layers.md`

## What Changed

- Updated `newIndex2.html` so the nebula overlay stays hidden but the star canvas is visible again.
- Changed `ARCHSCRY_ENABLED` back to `true` in `newIndex2.html` so the star-particle atmosphere runs again.
- Narrowed the live-home suppression rule in `assets/css/home.css` so `index.html` no longer hides `.vm-bg__stars`.
- Left the live-home bubble-causing layers hidden by keeping the suppression on `.vm-bg::before`, `.vm-bg::after`, and `.vm-bg__nebula`.
- Added the `VM-070` done card, board entry, and handoff index entry for the correction pass.

## Why It Changed

The user clarified that the star effect is desirable and that the real visual problem is in `index.html`. The earlier pass incorrectly removed the stars from `newIndex2.html`, so this follow-up restores them and narrows the live-home cleanup to the actual bubble-causing layers.

## Decisions Made

- Treated `index.html` as the primary target for the bubble cleanup.
- Preserved the star effect in both the preview skeleton and the live-home styling path.
- Left all existing route/home wiring alone.
- Kept the change scoped to `newIndex2.html` and `assets/css/home.css`.

## Risks / Uncertainties

- `VM-069` remains in the history as the initial broad interpretation, with this pass serving as the explicit correction.
- If the live home still feels too busy after this pass, the next likely target would be other non-star overlays rather than the star canvas.

## Tests Run

- Static scan confirming `newIndex2.html` now hides only `.vm-bg__nebula`.
- Static scan confirming `newIndex2.html` sets `ARCHSCRY_ENABLED = true`.
- Static scan confirming `assets/css/home.css` no longer hides `.vm-bg__stars` in the live-home cleanup rule.
- Static review confirming the live-home cleanup rule still hides `.vm-bg::before`, `.vm-bg::after`, and `.vm-bg__nebula`.

## Not Touched

- `index.html` markup
- `newIndex.html`
- Route pages such as Archscry, Maze, and Apocrypha
- Shared routing JS
- Chart.js and page content structure

## Follow-Up Recommendations

- Refresh `newIndex2.html` and confirm the star effect is back.
- Refresh `index.html` and confirm the bubble effect is gone while the stars remain.
- If the live home still feels visually noisy, do a small follow-up on the remaining non-star overlays instead of removing the star canvas again.

## Next Suggested Agent

Frontend follow-up only if you want to simplify the remaining live-home background treatment further.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-070-keep-stars-remove-only-home-bubble-layers.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-19-1956-codex-live-home-css-restoration.md`
- `docs/handoffs/2026-05-20-0019-codex-vm069-remove-bubble-atmosphere-newindex2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
