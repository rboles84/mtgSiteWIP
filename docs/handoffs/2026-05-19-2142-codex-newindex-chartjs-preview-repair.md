# Handoff - newIndex Chart.js Preview Repair

Agent name: Codex

Task requested: Review why the Chart.js Color Matrix in `newIndex.html` did not behave like `newIndex2.html`, repair the preview in place, and keep the user-visible live-refresh workflow working.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-19-1956-codex-live-home-css-restoration.md`
- `docs/handoffs/2026-05-19-2002-codex-newindex-performance-diagnosis.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-063-homepage-preview-portable-identity-radar.md`
- `newIndex.html`
- `newIndex2.html`
- `assets/js/home-preview.js`
- `assets/js/color-matrix-radar.js`

## Files Changed

- `newIndex.html`
- `assets/js/newindex-color-matrix.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2142-codex-newindex-chartjs-preview-repair.md`

## What Changed

- Added `assets/js/newindex-color-matrix.js` as a preview-only adapter that ports the working Color Matrix radar behavior from `newIndex2.html` into `newIndex.html`.
- Wired `newIndex.html` to load the new adapter after Chart.js so the selector grid, component/synthesis toggles, caption, axis list, and dataset pills all have a real mount path again.
- Made the radar mount hidden-section-aware so the chart initializes only after `#colorMatrixWrap` is visible, which avoids zero-size Chart.js renders when the matrix starts hidden.
- Narrowed the overbroad `#basics [class*="radar"]` / `#basics [class*="glow"]` suppression in `newIndex.html` so the radar card and canvas are no longer forced transparent.
- Added and completed the follow-up Kanban card `VM-064` for the repair trail.

## Why It Changed

`newIndex.html` had the markup for the `newIndex2.html` radar UI, but it no longer had the page-specific logic that actually instantiated and updated the chart. It also contained a CSS override that could blank the entire radar surface. The repair restores the preview behavior without touching live-home files.

## Decisions Made

- Kept the fix scoped to preview-only files instead of reworking live-home assets or shared homepage runtime files.
- Reused the working `newIndex2.html` radar interaction model as the behavioral source of truth for this repair.
- Added a dedicated preview adapter instead of forcing the older `assets/js/home-preview.js` helper onto a DOM shape it no longer matched.
- Left the decorative radar glow suppressed in `newIndex.html`, but removed the accidental blanket opacity rule that hid the whole radar panel.

## Risks / Uncertainties

- Browser-backed visual confirmation was still not available in-session, so validation stayed at syntax and static integration review.
- `newIndex.html` and the new preview adapter are currently untracked files in the worktree, so future commits should deliberately include them if this preview should be preserved.
- The preview still depends on the Chart.js CDN noted in `VM-063`; this pass repaired the mount path but did not replace the CDN dependency.

## Tests Run

- `node --check assets/js/newindex-color-matrix.js`
- Static integration scan confirming `newIndex.html` now loads `./assets/js/newindex-color-matrix.js`
- Static selector review confirming the previous blanket radar/glow opacity rule was narrowed to `#basics .vm-radar-glow` only
- Targeted status review of `newIndex.html`, `assets/js/newindex-color-matrix.js`, and the Kanban updates

## Not Touched

- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/js/index.js`
- `assets/js/color-matrix-radar.js`
- Archscry, Maze, Apocrypha, Scryfall, and lore/data docs

## Follow-Up Recommendations

- Do a browser visual pass on `newIndex.html` to confirm the chart mounts cleanly when the Color Matrix is opened and that the guild/college toggles feel right in motion.
- If this preview direction stabilizes, decide whether `assets/js/newindex-color-matrix.js` should replace or merge with the older preview adapter path instead of living as a one-off.
- Replace the preview's Chart.js CDN include with the planned local vendor copy when that asset is ready.

## Next Suggested Agent

Frontend follow-up only if the preview should be further consolidated or visually tuned after human refresh testing.

## Related Kanban Card / Docs / Plans

- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `docs/kanban/done/VM-063-homepage-preview-portable-identity-radar.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-19-2002-codex-newindex-performance-diagnosis.md`
- `docs/handoffs/HANDOFF_INDEX.md`
