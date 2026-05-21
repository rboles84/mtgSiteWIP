# 2026-05-20 19:38 - Codex - VM-086 newIndex2 Hero Mana Lens Composite + Flow Cleanup

## Agent Name

Codex

## Task Requested

Implement VM-086 so the `newIndex2.html` hero Mana Lens shows composite identities with component color datasets plus synthesis, hides the long selector behind a click menu, and moves the intent selector below the hero row.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1846-codex-vm085-newindex2-hero-mana-basics-graph-preview.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-085-newindex2-hero-mana-basics-graph-preview.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Updated the hero-only Mana Lens dataset builder so composite identities render dashed component datasets plus a filled synthesis dataset.
- Added `heroManaDatasetPills` to explain the visible hero chart overlay.
- Replaced the permanent hero pill wall with a click-to-open picker using `heroManaPickerToggle` and `heroManaPickerPanel`.
- Moved the intent selector out of the three-column hero row and into a full-width responsive band below the hero copy + Mana Lens row.

## Why It Changed

VM-085 made the hero chart useful, but composite identities only showed one synthesized shape and the always-visible selector made the hero feel too tall and cramped. VM-086 aligns the hero chart with the lower Color Matrix visual language while reducing first-screen clutter.

## Decisions Made

- Kept Selesnya in the existing data order, `Green + White`, matching `code: "GW"` and `components: ["G", "W"]`.
- Used a click/focus picker instead of hover-only so the interaction works on touch devices.
- Kept the lower `buildDatasets()`, `updateRadar()`, `radarChart`, Magic Basics, and Color Matrix data untouched.
- Kept `assets/js/graph.js` as the local Chart.js runtime.

## Risks / Uncertainties

- The worktree contains unrelated modified, deleted, and untracked files from adjacent work. This pass did not revert or normalize them.
- `assets/js/graph.js` remains untracked in this worktree but is still required by `newIndex2.html`.

## Tests Run

- Static scan: no duplicate runtime IDs after stripping comments and scripts.
- Static scan: required IDs remain present: `vmHeroManaChart`, `heroManaPills`, `heroManaPickerToggle`, `heroManaPickerPanel`, `heroManaDatasetPills`, `vmRadar`, `basicsReveal`, `colorMatrixWrap`, `identityGrid`, `lensTabs`, `guildSubtabs`.
- Static scan: `assets/js/graph.js` remains referenced and the Chart.js CDN was not restored.
- Inline script compile check passed.
- Local HTTP checks returned `200` for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Browser smoke: Selesnya showed `Green + White -> Selesnya`; Rakdos showed `Black + Red -> Rakdos`.
- Browser smoke: picker opened and closed on selection, Escape, and outside click.
- Browser smoke: lower Magic Basics tabs, Color Matrix toggle, and lower `vmRadar` selection remained independent from the hero chart.
- Browser narrow viewport smoke at `390px`: hero and intent grids collapsed to one column, picker stayed hidden by default, and the hero canvas remained sized.
- `npm.cmd test` passed.

## Not Touched

- Root `index.html`
- `newIndex.html`
- Shared homepage CSS/JS
- Route-page internals
- Existing Color Matrix data
- Existing lower `vmRadar`, `buildDatasets()`, `updateRadar()`, Magic Basics tabs, identity grid, and localStorage behavior
- Atmosphere canvas, reveal observers, pointer glow, back-to-top, footer links, and route links

## Follow-Up Recommendations

- Visually tune the hero contrast and title scale in a later polish pass if the first viewport still feels too heavy.
- Include `assets/js/graph.js` when staging this homepage preview batch if local Chart.js is now the intended runtime.

## Next Suggested Agent

Front-End QA agent for a visual polish pass after VM-086 is reviewed in-browser.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/kanban/done/VM-085-newindex2-hero-mana-basics-graph-preview.md`
- `docs/handoffs/2026-05-20-1846-codex-vm085-newindex2-hero-mana-basics-graph-preview.md`
