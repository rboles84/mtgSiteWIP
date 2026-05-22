# 2026-05-20 21:30 - Codex - VM-090 Split Homepage And Basics Experience

## Agent Name

Codex

## Task Requested

Implement VM-090 by splitting `newIndex2.html` into a focused landing page and moving the full Magic Basics + Color Matrix experience to `/basics/index.html`.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/in-progress/VM-090-split-homepage-and-basics-experience.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `basics/index.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-090-split-homepage-and-basics-experience.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`

## What Changed

- Slimmed `newIndex2.html` into a focused homepage with the hero promise, passive identity signal, primary CTAs, intent selector, compact orientation cards, compact connection strip, Basics/Apocrypha links, footer, and atmosphere.
- Removed the full Magic Basics tabs, Color Matrix, lower `vmRadar`, lower Mana Lens selector, full Library Preview grid, and orphaned Basics/Color Matrix runtime code from the homepage.
- Created `/basics/index.html` with the moved Magic Basics tabs, Color Matrix, Mana Lens selector, `vmRadar`, mono/guild/college selector, component/synthesis toggles, and Archscry CTA.
- Updated homepage navigation and footer links so Basics routes to `/basics/` and visible archive language points to Apocrypha instead of Library.
- Kept `assets/js/graph.js` as the local Chart.js runtime and used nested asset paths from `/basics/index.html`.
- Moved VM-090 from in progress to done and indexed this handoff.

## Why It Changed

The homepage had grown into a tutorial/tooling page. VM-090 separates orientation from learning: the homepage now works as a premium landing layer, while `/basics/` becomes the correct home for scrolling education and the Color Matrix tool.

## Decisions Made

- Used `/basics/index.html` because the repo already uses folder-based routes such as `/archscry/`, `/maze/`, and `/apocrypha/`.
- Kept the homepage hero chart passive and automatic, with no picker/dropdown controls.
- Preserved Color Matrix IDs and localStorage behavior on `/basics/`.
- Did not reuse VM-078 because it already belongs to Archscry Dossier Identity Matrix Radar.

## Risks / Uncertainties

- `VM-088` remains an in-progress card and may need reconciliation with the homepage split because its auto-cycling Mana Lens scope is now partially subsumed by VM-090.
- The worktree still contains unrelated untracked research files outside this task; they were not touched.
- Browser testing used a temporary headless Edge CDP session because the in-app Browser plugin was unavailable due a missing local script.

## Tests Run

- Static scan: no duplicate runtime IDs after ignoring HTML comments.
- Static scan: `newIndex2.html` no longer contains `basicsReveal`, `colorMatrixWrap`, `vmRadar`, `identityGrid`, `lensTabs`, `guildSubtabs`, `componentToggle`, `compositeToggle`, `heroManaPickerToggle`, `heroManaPickerPanel`, or `heroManaPills`.
- Static scan: no homepage `href="#basics"` links remain.
- Static scan: `/basics/index.html` contains `basicsReveal`, `colorMatrixWrap`, `vmRadar`, `identityGrid`, `lensTabs`, `guildSubtabs`, `componentToggle`, and `compositeToggle`.
- Route checks returned `200` for `/newIndex2.html`, `/basics/`, `/basics/index.html`, `/assets/js/graph.js`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Headless Edge browser smoke: homepage signal rendered, cycled from White to Blue with motion allowed, stayed still under reduced-motion emulation, showed no user controls, had no resource errors, and had no runtime exceptions.
- Headless Edge browser smoke: `/basics/` loaded `../assets/js/graph.js`, opened Color Matrix, selected Rakdos, rendered `vmRadar`, and had no resource errors or runtime exceptions.
- `npm.cmd test`

## Not Touched

- `index.html`
- `newIndex.html`
- Shared homepage CSS/JS
- `/archscry/` internals
- `/maze/` internals
- `/apocrypha/` internals
- Color Matrix identity data semantics
- Existing route links beyond homepage/Basics navigation targets
- Unrelated untracked research files

## Follow-Up Recommendations

- Resolve or retire VM-088 now that the passive homepage Mana Lens has been split away from the full Basics tool.
- Do a visual QA pass in a normal browser window to tune whether the compact homepage now feels close enough to the intended one-screen experience across desktop and mobile.
- Consider a later extraction pass for shared home/Basics CSS once the split design stabilizes.

## Next Suggested Agent

Front-End QA / Product Polish agent for viewport review and VM-088 reconciliation.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-090-split-homepage-and-basics-experience.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
