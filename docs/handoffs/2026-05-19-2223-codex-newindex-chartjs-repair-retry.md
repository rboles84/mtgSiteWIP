# Handoff - newIndex Chart.js Repair Retry

Agent name: Codex

Task requested: Repair `newIndex.html` again after the prior Chart.js fix did not match the current on-disk file state.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2142-codex-newindex-chartjs-preview-repair.md`
- `docs/handoffs/2026-05-19-2002-codex-newindex-performance-diagnosis.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `newIndex.html`
- `newIndex2.html`
- `assets/js/newindex-color-matrix.js`
- `assets/js/color-matrix-radar.js`

## Files Changed

- `newIndex.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-065-newindex-chartjs-repair-retry.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2223-codex-newindex-chartjs-repair-retry.md`

## What Changed

- Restored the missing `./assets/js/newindex-color-matrix.js` include in `newIndex.html` so the preview page actually loads the Color Matrix adapter created in the prior repair pass.
- Narrowed the lingering CSS suppression in `newIndex.html` from the broad `[class*="radar"]` / `[class*="glow"]` pattern back down to the intended `#basics .vm-radar-glow` selectors only.
- Aligned the `newIndex.html` Chart.js CDN include to the same `https://cdn.jsdelivr.net/npm/chart.js` path used by `newIndex2.html` so the preview and the working reference now match more closely.
- Added and completed the Kanban retry card `VM-065` to document that the previous repair logic existed, but the page on disk had regressed.

## Why It Changed

The current on-disk `newIndex.html` did not fully reflect the prior `VM-064` repair. The adapter file still existed, but the page no longer loaded it, and the overbroad CSS rule that could hide radar surfaces was still present. This retry restores the intended wiring in the actual preview file the user is refreshing.

## Decisions Made

- Kept the retry scoped to `newIndex.html` and workflow docs instead of reworking shared or live-home runtime files.
- Treated `newIndex2.html` as the working behavioral reference again and reduced differences where practical, including the Chart.js CDN path.
- Left `assets/js/newindex-color-matrix.js` unchanged because the adapter file itself already existed and still passed syntax; the regression was in page wiring rather than adapter logic.

## Risks / Uncertainties

- Browser-backed validation was still not available in-session, so confirmation remains static plus syntax-based rather than visual.
- `newIndex.html` and `assets/js/newindex-color-matrix.js` remain untracked in the current worktree and should be deliberately included in any future commit if this preview should persist.
- The preview still depends on an external CDN for Chart.js until the planned local vendor copy lands.

## Tests Run

- `node --check assets/js/newindex-color-matrix.js`
- Static inspection confirming `newIndex.html` now includes `./assets/js/newindex-color-matrix.js`
- Static inspection confirming `newIndex.html` now points to `https://cdn.jsdelivr.net/npm/chart.js`
- Static inspection confirming the broad `[class*="radar"]` and `[class*="glow"]` suppression is no longer present in `newIndex.html`
- Targeted `git status --short` review for the preview and Kanban files touched in this retry

## Not Touched

- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/js/index.js`
- `assets/js/newindex-color-matrix.js`
- Archscry, Maze, Apocrypha, and unrelated docs/content worktree changes

## Follow-Up Recommendations

- Refresh `newIndex.html` in the browser and confirm the Color Matrix now opens with a live radar chart, not only the surrounding shell.
- If further issues remain, capture the first visible symptom or console error so the next pass can target runtime behavior rather than static wiring.
- When convenient, replace the CDN Chart.js include with the planned vendored copy for a more stable preview path.

## Next Suggested Agent

Frontend follow-up only if a live refresh still shows a remaining runtime symptom after this wiring retry.

## Related Kanban Card / Docs / Plans

- `docs/kanban/done/VM-065-newindex-chartjs-repair-retry.md`
- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `docs/handoffs/2026-05-19-2142-codex-newindex-chartjs-preview-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
