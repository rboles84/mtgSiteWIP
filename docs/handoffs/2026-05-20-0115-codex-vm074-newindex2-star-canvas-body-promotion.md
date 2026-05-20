# Handoff - VM-074 newIndex2 Star Canvas Body Promotion

Agent name: Codex

Task requested: Fix `newIndex2.html` again because the prior star stacking changes still did not make the stars visibly behave like `newIndex.html`.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0107-codex-vm073-newindex2-star-root-stacking-fix.md`
- `docs/handoffs/2026-05-20-0046-codex-vm071-newindex2-layered-stars-and-orbs.md`
- `docs/kanban/board.md`
- `newIndex.html`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/done/VM-074-newindex2-star-canvas-body-promotion.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0115-codex-vm074-newindex2-star-canvas-body-promotion.md`

## What Changed

- Added a runtime step inside `initArchscryAtmosphere()` that moves the existing `.vm-bg__stars` canvas to `document.body` before drawing begins.
- Increased star radius, base alpha, and pulse so the star field reads more clearly over the current background treatment.
- Added a faint halo for brighter stars.
- Reduced orb opacity slightly so the orb layer does not overpower the stars.
- Added the `VM-074` done card plus the board and handoff index entries for this follow-up.

## Why It Changed

The earlier fixes improved CSS stacking, but the canvas was still structurally tied to the lower `.vm-bg` container. Moving the actual canvas to the root body layer is a stronger and more reliable way to make it behave like an independent viewport atmosphere layer.

## Decisions Made

- Reused the existing canvas instead of creating a second canvas or importing shared atmosphere code.
- Tuned the star layer brighter and the orb layer dimmer so the stars become the dominant celestial texture.
- Left layout, routing, content, nav, and radar behavior untouched.

## Risks / Uncertainties

- The browser may still cache the prior inline JS/CSS, so a hard refresh is required to evaluate this fix honestly.
- If the stars still remain too faint after the body-promotion fix, the next step should be visual tuning only.

## Tests Run

- Static review confirming the existing `.vm-bg__stars` canvas is moved to `document.body` at runtime.
- Static review confirming star alpha/radius/pulse values were increased.
- Static review confirming orb alpha was reduced.
- Local server check confirming `http://localhost:8000/newIndex2.html` still responds with HTTP `200`.

## Not Touched

- `index.html`
- `newIndex.html`
- `assets/css/home.css`
- `assets/js/atmosphere.js`
- Navigation, routes, content sections, footer, and radar behavior

## Follow-Up Recommendations

- Hard refresh `newIndex2.html` before judging the result.
- If the stars are finally visible but still not strong enough, tune only star intensity next rather than changing structure again.

## Next Suggested Agent

Frontend visual QA only if the user wants brightness tuning after confirming the body-layer fix.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-074-newindex2-star-canvas-body-promotion.md`
- `docs/kanban/done/VM-073-newindex2-star-root-stacking-fix.md`
- `docs/kanban/done/VM-072-newindex2-star-visibility-fix.md`
- `docs/handoffs/HANDOFF_INDEX.md`
