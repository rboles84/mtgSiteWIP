# Handoff - VM-079 newIndex2 Living Index Visual Hierarchy

Agent name: Codex

Task requested: Implement the next `newIndex2.html` homepage direction so Vox Mana feels like a Magic identity and meaning engine instead of a static poster or three-door landing page.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1005-codex-vm077-newindex2-living-index-rearrangement.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-077-newindex2-living-index-rearrangement.md`
- `docs/kanban/in-progress/VM-079-newindex2-living-index-visual-hierarchy.md`
- `docs/design/visual-style-guide.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-079-newindex2-living-index-visual-hierarchy.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1043-codex-vm079-newindex2-living-index-visual-hierarchy.md`

## What Changed

- Rebuilt the `newIndex2.html` hero into a three-zone Living Index layout: left promise/manifesto, center WUBRG signal wheel, and right intent selector.
- Updated the hero message to lead with "Find your place in the color pie" and explain Vox Mana as Commander identity, color philosophy, symbolic search, and lore research.
- Reworked the three primary areas into horizontal product modules instead of equal door-like cards.
- Added a four-step "How the system connects" flow showing Archscry, color identity, Maze exploration, and Apocrypha source trails.
- Added a "Color philosophy, not just card text" section with the five mono-color philosophy cues.
- Added a practical "Start based on what you came for" chooser before the Magic Basics / Color Matrix lab.
- Added scoped CSS for the new layout, signal wheel, module rows, flow cards, philosophy cards, and responsive stacking.
- Preserved the existing Magic Basics / Color Matrix / radar IDs and kept the existing script order untouched.
- Moved VM-079 from in progress to done on the Kanban board.

## Why It Changed

Batch 1 made the page structurally safer, but the user correctly called out that it still felt visually like the same poster/card layout. This pass intentionally adds homepage hierarchy and actionable orientation so the page reads as a living system.

## Decisions Made

- Treated this as a Batch 2 visual hierarchy pass, so scoped CSS changes were necessary and intentional.
- Kept JavaScript logic unchanged to avoid disrupting tabs, Color Matrix state, radar behavior, reveal observers, atmosphere canvas, pointer glow, and back-to-top behavior.
- Kept `#paths` as a compatibility anchor while using `#what` and `#main-areas` for the new main-area module section.
- Kept Magic Basics and Color Matrix together, with all existing behavior IDs preserved.
- Used existing routes `/archscry/`, `/maze/`, and `/apocrypha/` for all new CTAs.

## Risks / Uncertainties

- The page still contains `gateway` in the background asset filename and `threshold` in existing observer options/comments; those are not visible homepage framing and were not changed.
- The file already contains an existing custom element / web component block from prior work; this pass did not introduce or modify it.
- Mobile stacking was verified statically through the new media rules; a human phone-width visual skim is still recommended before promotion.
- Other unrelated working-tree changes existed during this pass, including Archscry/assets/doc changes and deleted research docs. They were not touched.

## Tests Run

- Static scan: no duplicate IDs.
- Static scan: required anchors and behavior IDs exist, including `start`, `paths`, `main-areas`, `what`, `basics`, `basicsReveal`, `colorMatrixWrap`, `vmRadar`, `identityGrid`, `lensTabs`, `guildSubtabs`, `connects`, `philosophy`, and `library`.
- Static scan: runtime order is background, nav, main shell, hero, module section, connection flow, philosophy, start chooser, Magic Basics / Color Matrix, Library Preview, footer, back-to-top, scripts.
- Static scan: visible door/gateway framing was not reintroduced; remaining matches are asset names or existing JS observer terms.
- Static script comparison against `HEAD:newIndex2.html`: script blocks match after line-ending normalization.
- Local route checks returned 200:
  - `/newIndex2.html`
  - `/archscry/`
  - `/maze/`
  - `/apocrypha/`
  - `/privacy/`
  - `/terms/`
- Browser smoke check:
  - Page loads.
  - `What is this?` nav jumps to `#what`.
  - `Magic Basics` nav jumps to `#basics`.
  - Magic Basics tabs update `basicsReveal`.
  - Show/Hide the five colors toggles Color Matrix visibility.
  - Radar visibly renders in browser after Color Matrix is shown.
  - Identity selector updates selected profile and radar state.
  - Reveal classes activate.
  - Back-to-top appears after scrolling.
  - Desktop hero/module grids compute as multi-column layouts.
- `npm.cmd test` - passed.

## Not Touched

- Root `index.html`
- `newIndex.html`
- Shared home CSS/JS files
- Color Matrix data
- Chart.js setup
- Magic Basics tab logic
- Radar chart logic
- Reveal observers
- Atmosphere/star/orb canvas logic
- Pointer glow logic
- Back-to-top logic
- Archscry, Maze, Apocrypha route internals
- Existing unrelated Archscry/assets/docs worktree changes
- Deleted research docs visible in `git status`

## Follow-Up Recommendations

- Do a human visual skim at desktop and mobile widths, especially around hero density and the start chooser.
- Consider a later copy pass to tighten the modules and philosophy language without changing layout.
- Consider a later route promotion pass only after deciding whether `newIndex2.html` should become the live root homepage.
- Consider cleaning up older gateway terminology in asset names or legacy comments only as a separate non-runtime cleanup if desired.

## Next Suggested Agent

Frontend polish agent for mobile visual QA and copy refinement.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-079-newindex2-living-index-visual-hierarchy.md`
- `docs/kanban/done/VM-077-newindex2-living-index-rearrangement.md`
- `docs/handoffs/HANDOFF_INDEX.md`
