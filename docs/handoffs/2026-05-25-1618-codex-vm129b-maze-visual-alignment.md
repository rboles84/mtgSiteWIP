# 2026-05-25 16:18 - Codex - VM-129B Maze Visual Alignment

## Agent Name

Codex

## Task Requested

Implement VM-129B: correct `/maze/` so the VM-129 redesign visually aligns with the current Vox Mana page family, removes the remaining brown/yellow wash, restores the shared painted-background feel, stretches the empty results panel, and prevents the deck scratchpad from overlapping controls at devtools-width desktop sizes.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-1100-codex-vm129-maze-search-console-redesign.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-129B-correct-maze-visual-alignment-responsive-layout.md`
- `maze/index.html`
- `assets/css/maze.css`
- `assets/css/topbar.css`
- `assets/css/atmosphere.css`
- `assets/css/strategium.css`
- `scripts/frontend-smoke.mjs`

## Files Changed

- `maze/index.html`
- `assets/css/maze.css`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-129B-correct-maze-visual-alignment-responsive-layout.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-1618-codex-vm129b-maze-visual-alignment.md`

## What Changed

- Added the shared-style `vm-bg__stars` canvas to the Maze background stack.
- Replaced the Maze-specific chamber background with `background-vox-gateway-clean-13.webp`, matching `newIndex2.html`, `archscry/index.html`, and `strategium/index.html`.
- Changed Maze from `data-bg="heavy"` / clean-route handling to the current `data-bg="medium"` route treatment.
- Reworked the route-local Maze stylesheet away from the legacy warm/brown console layer and toward cooler black-glass panels.
- Brightened and clarified the Maze chamber background while keeping the route's own identity image.
- Removed the topbar-height double spacing so Maze starts at the same first-viewport rhythm as Strategium.
- Tuned the command deck headline scale, grid proportions, and internal row stretching.
- Fixed invisible search/clear/help button labels caused by inheriting zero-size typography from spacer rows.
- Stretched `.r-main` and the default "The Archives await" state to fill the results panel.
- Changed the deck scratchpad from default fixed positioning to in-flow layout, with sticky wide-column behavior only when the viewport is wide enough.
- Added responsive search-control stacking for narrow mobile widths.

## Why It Changed

The VM-129 route was behaviorally sound but visually disconnected from the recent Vox Mana route family. The Maze page still read as an older brown/yellow console layer over a hidden background, and the fixed scratchpad could overlap the command deck when the viewport narrowed. VM-129B makes Maze feel like it belongs beside Archscry and Strategium without changing the search engine or stash logic.

## Decisions Made

- Kept Maze on `/maze/` and did not recreate or migrate `maze.html`.
- Followed the current route family background asset directly instead of keeping Maze's separate chamber image.
- Kept gold as an accent only and moved panel atmosphere toward cooler glass.
- Kept the scratchpad visible on wide desktop by using a sticky grid column, but prioritized layout participation at narrower widths.
- Left parser/search/stash/modal/Archscry behavior untouched.

## Risks / Uncertainties

- The search console still relies on live Scryfall calls for full end-to-end card-result verification; this pass focused on visual layout and did not rewrite network behavior.
- The wide command deck is intentionally dense; a later route-wide visual regression harness could lock the final proportions more formally.

## Tests Run

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:parser`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Puppeteer/Edge layout checks for `/maze/` at 1280px, 1024px, 390px, and 1600px.
- Puppeteer/Edge background check confirming Maze now loads `background-vox-gateway-clean-13.webp`, uses `data-bg="medium"`, and has no horizontal overflow.
- Protected interface smoke check confirming all protected Maze IDs, `vm_maze_card_stash_v1`, `ARCHSCRY_MAZE_HANDOFF_KEY`, and no stale `maze.html` route reference in `maze/index.html`.

## Not Touched

- Scryfall parser and dictionary logic.
- Search execution and pagination logic.
- Stash storage key, export format, and stash section model.
- Archscry handoff key or URL parameter handling.
- Modal interaction model.
- Shared topbar, shared atmosphere, or shared component CSS.
- Route migration or compatibility shell work.

## Follow-Up Recommendations

- Add a dedicated Maze visual regression harness mirroring the current Archscry/Strategium route harnesses.
- Do a live-network manual pass for Scryfall result rendering when network access is available.
- Consider a later compact/mobile usability pass for the sidebar search-path ordering; VM-129B kept behavior and grouping intact.

## Next Suggested Agent

Test Strategist for a dedicated Maze visual regression harness, or Documentation Steward if the route atlas should include a before/after note for VM-129B.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-129B-correct-maze-visual-alignment-responsive-layout.md`
- `docs/handoffs/2026-05-25-1100-codex-vm129-maze-search-console-redesign.md`
