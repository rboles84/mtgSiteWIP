# Agent Handoff

## Agent name
Codex

## Task requested
Update `/archscry/` and `/archscry/index2.html` so their background presentation matches the current `newIndex2.html` visual style, using `background-vox-gateway-clean-09.webp`, without changing Identity Matrix or dossier behavior.

## Files reviewed
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-087-archscry-shell-modernization.md`
- `docs/kanban/done/VM-078-archscry-dossier-identity-matrix-radar.md`
- `newIndex2.html`
- `archscry/index.html`
- `archscry/index2.html`
- `assets/css/archscry.css`
- `assets/css/atmosphere.css`
- `assets/js/reduce-motion.js`
- `docs/reference/manual-test-cases.md`

## Files changed
- `archscry/index.html`
- `archscry/index2.html`
- `assets/css/archscry.css`
- `assets/js/archscry-atmosphere.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-095-archscry-background-parity-gateway-09.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2336-codex-archscry-background-parity-gateway-09.md`

## What changed
- Swapped both Archscry routes from `background-archscry-chamber-clean-01.webp` to `background-vox-gateway-clean-09.webp`.
- Added the `newIndex2`-style `.vm-bg__nebula` and `.vm-bg__stars` structure to both Archscry pages.
- Added a new Archscry-local atmosphere runtime in `assets/js/archscry-atmosphere.js` that:
  - moves the star canvas to the body layer
  - paints the same star/orb atmosphere family used by the preview home
  - respects reduced motion
  - pauses while the document is hidden
  - updates pointer glow coordinates through `--mx` and `--my`
- Reworked the top of `assets/css/archscry.css` so the Archscry route now uses:
  - `newIndex2`-style painted body background layering
  - a fixed background-image pass behind the `vm-bg` stack
  - the same glow/vignette overlay balance
  - explicit overrides that neutralize the older shared `data-bg="medium"` mask and overlay treatment for Archscry only
- Updated manual test coverage for the new gateway background parity.
- Closed the Kanban work under `VM-095` to avoid colliding with an existing separate `VM-094` card.

## Why it changed
- `VM-087` modernized Archscry surfaces, but it intentionally kept the older chamber art and simpler background stack.
- The result was a shell that still felt visually disconnected from the newer `newIndex2.html` home experience.
- This pass brings Archscry into the same visual family without touching placement logic, dossier layout, or Identity Matrix behavior.

## Decisions made
- Kept the change strictly route-local: no edits to `newIndex2.html`, root home files, Maze, Apocrypha, placement data, or dossier radar logic.
- Added a dedicated `assets/js/archscry-atmosphere.js` instead of modifying shared atmosphere behavior, so Archscry can match the newer star/orb treatment without risking other routes.
- Left the Identity Matrix / dossier radar implementation unchanged, per request.
- Renumbered the Kanban card to `VM-095` because another unrelated in-progress card already uses `VM-094`.

## Risks / uncertainties
- No in-session browser visual QA was performed, so final tuning of brightness, contrast, or star density may still be needed once viewed live on desktop and mobile.
- The local-file route issue on the homepage CTA/topbar reported earlier was not addressed in this pass because the request was scoped to Archscry background parity only.

## Tests run
- `node --check assets/js/archscry-atmosphere.js`
- `node --check assets/js/index.js`
- `node --check assets/js/archscry-index2.js`
- `node --check assets/js/dossier-radar.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
  - Result: passed with existing LF/CRLF warnings only

## Not touched
- `assets/js/dossier-radar.js`
- Archscry placement scoring and saved-result contracts
- `data/factions.json`
- `data/placement-model.json`
- Maze internals
- Apocrypha internals
- Root home files including `newIndex2.html`

## Follow-up recommendations
- Do a browser-backed desktop/mobile visual pass on `/archscry/` and `/archscry/index2.html` to tune the route-specific atmosphere if the gateway art reads too bright or too dark against the dossier surfaces.
- Address the local `file://` route-link reliability issue from the homepage/topbar in a separate scoped fix if that workflow still matters for preview/testing.

## Next suggested agent
Test Strategist

## Related Kanban card, docs, or plans
- `docs/kanban/done/VM-095-archscry-background-parity-gateway-09.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
