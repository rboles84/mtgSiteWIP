# Handoff - Live Home CSS Restoration

Agent name: Codex

Task requested: Investigate why the live homepage was loading with broken asset treatment, identify the regression source, and restore the live homepage visual stack without disturbing the preview files.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/kanban/board.md`
- `index.html`
- `assets/css/home.css`
- `assets/css/home - Copy.css`
- `assets/js/home.js`
- `assets/js/site-flags.js`
- `assets/js/vm-topbar.js`
- `assets/js/atmosphere.js`
- `assets/js/reduce-motion.js`
- `assets/img/`

## Files Changed

- `assets/css/home.css`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-1956-codex-live-home-css-restoration.md`

## What Changed

- Confirmed the live homepage still loaded its original stack from `index.html` and was not referencing any of the preview-only files.
- Identified that `assets/css/home.css` had been truncated to 195 lines, removing the scene/background treatments and a large portion of the live homepage layout overrides.
- Restored `assets/css/home.css` from the full local copy in `assets/css/home - Copy.css`, which brought the live home stylesheet back to 1,267 lines.
- Verified that the restored stylesheet again contains the key live-home selectors for the side-card scene backgrounds, quote block, status bar, and Maze card decorative layers.

## Why It Changed

The live homepage was not failing to boot. It was rendering with broken visual treatment because its active stylesheet had been partially overwritten or truncated. Restoring the full stylesheet fixed the live asset presentation path directly.

## Decisions Made

- Kept the fix scoped to the live stylesheet instead of touching `index.html` or the preview files.
- Used the local full-copy stylesheet already present in the repo as the restoration source rather than reconstructing missing CSS by hand.
- Did not modify the preview-only files from `VM-063` during this fix.

## Risks / Uncertainties

- The untracked file `assets/css/home - Copy.css` remains in the worktree as a local backup/reference file.
- I did not run a browser-automation visual pass in-session, so verification is based on the restored file contents, asset path checks, and live server fetch checks rather than screenshot comparison.

## Tests Run

- Confirmed `index.html` still references `/assets/css/home.css` and `/assets/js/home.js`, not the preview files.
- `node --check assets/js/home.js`
- `node --check assets/js/site-flags.js`
- `node --check assets/js/vm-topbar.js`
- `node --check assets/js/atmosphere.js`
- `node --check assets/js/reduce-motion.js`
- Local repo-root HTTP server check returning `200` for `/`, `/assets/css/home.css`, and `/assets/js/home.js`
- Line-count verification showing `assets/css/home.css` restored from 195 lines to 1,267 lines
- Selector presence checks for `.vm-card__scene--archscry`, `.vm-card__scene--apocrypha`, `.vm-home__quote`, `.vm-home__status`, and `body[data-page="home"] .vm-card--maze::before`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- assets/css/home.css`
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short -- assets/css/home.css`

## Not Touched

- `newIndex.html`
- `assets/css/home-preview.css`
- `assets/js/home-preview.js`
- `assets/js/color-matrix-radar.js`
- `index.html`
- `assets/js/index.js`
- Archscry, Maze, and Apocrypha runtime logic

## Follow-Up Recommendations

- If the local backup file is no longer needed, decide deliberately whether to keep, rename, or archive `assets/css/home - Copy.css` rather than leaving it ambiguous.
- Once convenient, do a browser visual pass on the live home to confirm the restored stylesheet matches the intended doorway scene treatment.

## Next Suggested Agent

Frontend follow-up only if further live-home polish is wanted after visual confirmation.

## Related Kanban Card / Docs / Plans

- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
