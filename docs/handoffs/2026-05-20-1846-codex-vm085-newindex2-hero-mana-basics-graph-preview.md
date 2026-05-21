# 2026-05-20 18:46 - Codex - VM-085 newIndex2 Hero Mana Basics Graph Preview

## Agent Name

Codex

## Task Requested

Implement VM-085 by replacing the `newIndex2.html` hero amoeba signal with a simplified Mana Basics graph preview, switching the page from the Chart.js CDN to local `assets/js/graph.js`, and preserving the lower Magic Basics and Color Matrix behavior.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1224-codex-vm084-newindex2-amoeba-identity-signal-morph.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-084-newindex2-amoeba-identity-signal-morph.md`
- `newIndex2.html`
- `assets/js/graph.js`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-085-newindex2-hero-mana-basics-graph-preview.md`
- `docs/handoffs/2026-05-20-1846-codex-vm085-newindex2-hero-mana-basics-graph-preview.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Replaced the hero-center `vmIdentitySignalChart` amoeba signal with a compact Mana Lens preview using `canvas#vmHeroManaChart`.
- Added hero pill groups for Colors, Guilds, and Colleges generated from the existing `identities` dataset.
- Added isolated hero preview JavaScript that updates only the hero chart, active pill, caption, and glow.
- Changed the Chart.js script reference from the CDN to local `assets/js/graph.js`.
- Removed the VM-084 signal-specific hero HTML, CSS selectors, keyframes, and random/shape-morphing script.

## Why It Changed

The desired hero direction shifted from an abstract ambient signal to a practical Mana Basics preview. The page also needed a local Chart.js runtime so both the hero graph and the lower Color Matrix radar can render during local testing without relying on CDN availability.

## Decisions Made

- Used the existing identity data only: mono WUBRG profiles, Ravnica guilds, and Strixhaven colleges.
- Did not add a separate Schools category or invent new taxonomy.
- Kept the lower `vmRadar` chart independent by creating a separate `heroManaChart` instance and avoiding calls to `updateRadar()`.
- Kept the hero preview compact and control-free: no randomizer, stream controls, shape buttons, stats, sliders, or demo copy.

## Risks / Uncertainties

- `assets/js/graph.js` was already present as an untracked local Chart.js runtime and was referenced but not edited. Include it when staging this batch if it is not already tracked.
- The worktree contains unrelated modified, deleted, and untracked files from adjacent work. This pass did not revert or normalize them.
- The in-app browser's isolated evaluation scope did not expose `window.Chart`, but the page behavior, generated pills, chart-dependent lower radar behavior, route checks, and console logs indicate the local runtime loaded successfully.

## Tests Run

- Static scan: `newIndex2.html` references `assets/js/graph.js` and no longer references `https://cdn.jsdelivr.net/npm/chart.js`.
- Static scan: no duplicate runtime IDs after stripping comments and scripts.
- Static scan: required IDs remain present: `vmHeroManaChart`, `vmRadar`, `basicsReveal`, `colorMatrixWrap`, `identityGrid`, `lensTabs`, `guildSubtabs`.
- Static scan: old signal terms are removed: `vmIdentitySignal`, `vm-signal`, `shapeIntervalMs`, `axisCounts`, `randomizeVmIdentity`.
- Inline script compile check passed.
- Local HTTP checks returned `200` for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Browser smoke: hero generated 20 pills, Dimir and Prismari hero pill clicks updated hero state, Magic Basics tabs and Color Matrix toggle still worked, lower Blue selection updated `vmRadar` independently, and no console errors were reported.
- `npm.cmd test` passed.

## Not Touched

- Root `index.html`
- `newIndex.html`
- Shared homepage CSS/JS
- Route-page internals
- Existing Color Matrix data
- Existing lower `vmRadar` setup, `updateRadar()`, Magic Basics tabs, identity grid, and localStorage behavior
- Atmosphere canvas, reveal observers, pointer glow, back-to-top, footer links, and route links

## Follow-Up Recommendations

- In the next visual pass, tune hero opacity/contrast if the three-column hero feels too subdued on first paint.
- Consider staging `assets/js/graph.js` with VM-085 if the local Chart.js runtime is intended to become the supported path for `newIndex2.html`.

## Next Suggested Agent

Front-End QA agent for visual polish and responsive pass after the structure/functionality stabilizes.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-085-newindex2-hero-mana-basics-graph-preview.md`
- `docs/kanban/done/VM-084-newindex2-amoeba-identity-signal-morph.md`
- `docs/handoffs/2026-05-20-1224-codex-vm084-newindex2-amoeba-identity-signal-morph.md`
