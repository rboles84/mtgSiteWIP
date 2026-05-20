# Handoff - VM-066 newIndex2 Wiring Only Pass

Agent name: Codex

Task requested: Keep `newIndex2.html` self-contained, rewire only its destination links to canonical routes, add inert placeholder behavior for the two future-page top-nav links, add footer privacy/terms links, and update the project-memory trail without touching root `index.html` or shared-site assets.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-19-2142-codex-newindex-chartjs-preview-repair.md`
- `docs/handoffs/2026-05-19-2223-codex-newindex-chartjs-repair-retry.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-020-route-architecture-normalization.md`
- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `docs/kanban/done/VM-065-newindex-chartjs-repair-retry.md`
- `docs/mockups/homepage-gateway-mockup-set.md`
- `newIndex2.html`
- `assets/js/color-matrix-radar.js`
- `privacy/index.html`
- `terms/index.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/done/VM-066-newindex2-self-contained-wiring.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`

## What Changed

- Rewired all `newIndex2.html` Archscry, Maze, and Apocrypha destination links to the canonical folder routes `/archscry/`, `/maze/`, and `/apocrypha/`.
- Kept the top nav visually unchanged while converting `What is this?` and `Magic Basics` into inert placeholder links using `href="#"` plus `data-vm-placeholder-link`.
- Removed the top-nav `Library` item entirely.
- Added a small inline click guard near the end of `newIndex2.html` so only the marked placeholder links suppress navigation and scrolling.
- Rewired the footer Archscry, Maze, and Library links to canonical routes and added footer links for `/privacy/` and `/terms/`.
- Added the completed `VM-066` Kanban card and updated the board and handoff index.

## Why It Changed

The user wants `newIndex2.html` to remain the preferred self-contained skeleton without layout churn, shared-home bleed, or route drift. This pass keeps that page intact while making its visible entry points reach the rest of the site correctly.

## Decisions Made

- Left the existing Google Font include untouched.
- Left the existing Chart.js CDN include untouched.
- Did not use `assets/js/color-matrix-radar.js` as a Chart.js replacement because it still depends on Chart.js being loaded first.
- Kept all existing inline comments in `newIndex2.html` and added only short matching comments where the placeholder-link behavior was introduced.
- Left root `index.html`, `newIndex.html`, shared home CSS, and shared home JS untouched.
- Kept the Library Preview cards routed to `/apocrypha/` because no dedicated factions page route currently exists in the repo.

## Risks / Uncertainties

- This pass does not promote `newIndex2.html` to `/`, so the root home still remains a separate surface.
- Browser automation may not be available in-session; if so, the manual click test may need a local human pass after the static scan.
- The page still uses its standalone inline implementation, including the current Chart.js CDN dependency.

## Tests Run

- Static scan of `newIndex2.html` confirming no `archscry.html` links remain.
- Static scan of `newIndex2.html` confirming no `maze.html` links remain.
- Static scan of `newIndex2.html` confirming no `apocrypha.html` links remain.
- Static scan confirming the Google Font include remains in `newIndex2.html`.
- Static scan confirming the `https://cdn.jsdelivr.net/npm/chart.js` include remains in `newIndex2.html`.
- Static scan confirming no new shared-site CSS or JS imports were introduced into `newIndex2.html`.
- Additional browser verification attempted after implementation if local tooling allowed it.

## Not Touched

- `index.html`
- `newIndex.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/js/index.js`
- `assets/js/color-matrix-radar.js`
- Route-page internals for Archscry, Maze, Apocrypha, Privacy, and Terms
- Unrelated in-flight docs, research, or data worktree changes

## Follow-Up Recommendations

- Do a quick human browser pass on `newIndex2.html` to confirm the placeholder top-nav links do nothing and the live links open the expected route folders.
- If `newIndex2.html` becomes the real home later, do that as a separate promotion pass so route changes and layout adoption stay easy to review.
- If the Chart.js CDN should be removed later, replace it with a local Chart.js bundle rather than `assets/js/color-matrix-radar.js`.

## Next Suggested Agent

Frontend follow-up for content/layout tuning only after the user finishes validating this wiring-only skeleton.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-066-newindex2-self-contained-wiring.md`
- `docs/kanban/done/VM-020-route-architecture-normalization.md`
- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `docs/kanban/done/VM-065-newindex-chartjs-repair-retry.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/HANDOFF_INDEX.md`
