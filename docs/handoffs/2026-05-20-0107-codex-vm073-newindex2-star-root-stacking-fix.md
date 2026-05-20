# Handoff - VM-073 newIndex2 Star Root Stacking Fix

Agent name: Codex

Task requested: Fix `newIndex2.html` again because the stars still worked in `newIndex.html` but not in `newIndex2.html`, and check whether the remaining blocker is CSS layering.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0057-codex-vm072-newindex2-star-visibility-fix.md`
- `docs/handoffs/2026-05-20-0046-codex-vm071-newindex2-layered-stars-and-orbs.md`
- `docs/kanban/board.md`
- `newIndex.html`
- `assets/css/atmosphere.css`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/done/VM-073-newindex2-star-root-stacking-fix.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0107-codex-vm073-newindex2-star-root-stacking-fix.md`

## What Changed

- Compared `newIndex.html` and `newIndex2.html` background layering and confirmed the working version keeps its star field in a higher backdrop stack.
- Changed `.vm-bg__stars` in `newIndex2.html` from `position: absolute` to `position: fixed`.
- Set the star canvas to `z-index: -3` so it sits above `body::after` but below page content.
- Added explicit `pointer-events: none` on the star canvas so the fixed layer cannot interfere with interaction.
- Left the earlier `body::before` and burst-threshold fixes intact.
- Added the `VM-073` done card, board entry, and handoff index entry for this follow-up.

## Why It Changed

The prior fix corrected some visibility blockers, but the stars still differed from `newIndex.html` because they were trapped inside the lower `.vm-bg` stacking context. Promoting the canvas into the root viewport stack gives it the same kind of visibility path the working home uses.

## Decisions Made

- Treated root stacking order as the remaining blocker rather than continuing to tune alpha values first.
- Kept the page self-contained and did not import `assets/js/atmosphere.js` or shared CSS.
- Preserved the existing single canvas, the layered star/orb draw code, and the rest of the page shell.

## Risks / Uncertainties

- This fix is based on CSS stacking logic and static verification; a hard browser refresh is still needed to confirm the stars now visually read as intended.
- If the stars remain too faint after the stacking correction, the next pass should be a small intensity tuning pass.

## Tests Run

- Static scan confirming `.vm-bg__stars` now uses `position: fixed`.
- Static scan confirming `.vm-bg__stars` now uses `z-index: -3`.
- Static scan confirming `.vm-bg__stars` explicitly uses `pointer-events: none`.
- Static scan confirming the starburst condition still uses `alpha > 0.56`.
- Local server check confirming `http://localhost:8000/newIndex2.html` responds with HTTP `200`.

## Not Touched

- `index.html`
- `assets/css/home.css`
- `assets/js/atmosphere.js`
- Routing, content sections, cards, nav, footer, and radar behavior

## Follow-Up Recommendations

- Hard refresh `newIndex2.html` and compare it side-by-side with `newIndex.html`.
- If stars are now visible but too faint, tune star alpha or density rather than changing stacking again.

## Next Suggested Agent

Frontend visual QA only if the user wants star intensity tuned after confirming the stacking fix.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-073-newindex2-star-root-stacking-fix.md`
- `docs/kanban/done/VM-072-newindex2-star-visibility-fix.md`
- `docs/kanban/done/VM-071-newindex2-layered-stars-and-orbs.md`
- `docs/handoffs/HANDOFF_INDEX.md`
