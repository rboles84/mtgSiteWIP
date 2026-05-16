# Agent Handoff: Codex - VM-017 Main Index Gateway Mockup Set

Date: 2026-05-15 20:16
Related Card: VM-017
Related Plan: Vox Mana Main Index Gateway Mockup Set
Status: Complete

## Agent Name

Codex

## Task Requested

Review the current mockup inspiration under `C:\dev\projectFiles\mtgSite\UI Files\redesign Images`, then create the tracked homepage gateway mockup brief and backlog entry for the main `index.html` page without drifting into runtime implementation.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-1932-codex-vm016-archscry-profile-return-qr.md`
- `docs/handoffs/2026-05-15-1926-codex-vm015-returning-user-commander-fit-check.md`
- `docs/handoffs/2026-05-15-0914-codex-vm005-archscry-maze-continuity.md`
- `docs/handoffs/2026-05-15-0640-codex-archscry-result-narrative-ux-polish.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md`
- `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md`
- `docs/kanban/backlog/VM-016-archscry-profile-return-qr.md`
- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `docs/asset-manifest.md`
- `docs/visual-style-guide.md`
- `docs/project-atlas.md`
- `docs/data-flow-map.md`
- `docs/manual-test-cases.md`
- `C:\\dev\\projectFiles\\mtgSite\\UI Files\\redesign Images\\background samples\\mockUI.png`
- `C:\\dev\\projectFiles\\mtgSite\\UI Files\\redesign Images\\site pages\\finalMockupLandingPageMainPage.png`
- `C:\\dev\\projectFiles\\mtgSite\\UI Files\\redesign Images\\site pages\\archscry\\Final Mockup\\finalMockupFirstLandingArchscry.png`
- `C:\\dev\\projectFiles\\mtgSite\\UI Files\\redesign Images\\site pages\\maze\\Final Mockup\\finalMockupImplicitMazeLandingPagePlainSearch.png`
- `C:\\dev\\projectFiles\\mtgSite\\UI Files\\redesign Images\\site pages\\apocrypha\\newUI\\finalMockupApocryphaLanding1.png`
- `C:\\dev\\projectFiles\\mtgSite\\UI Files\\redesign Images\\background samples\\newMainImageforfirstlandingindex.png`

## Files Changed

- `docs/mockups/homepage-gateway-mockup-set.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-2016-codex-vm017-main-index-gateway-mockup-set.md`

## What Changed

- Added a new tracked backlog card for the homepage gateway mockup set as `VM-017`.
- Documented the homepage mockup brief in `docs/mockups/homepage-gateway-mockup-set.md` so the visual direction is reusable by the next implementation pass.
- Captured the current inspiration set from the redesign image archive, especially the three-door gateway, Archscry, Maze, and Apocrypha reference frames.
- Kept the scope explicitly on the home gateway and the returning-user resume state instead of expanding into runtime changes.
- Updated the board and handoff index so the new homepage planning item is visible in the project trail.

## Why It Changed

The current `index.html` shell already has the right structural idea, but the main gateway still needs an approved mockup brief that preserves Apocrypha as a visible destination, keeps Maze central, and defines the compact returning-user state before any production translation happens.

## Decisions Made

- Use `VM-017` as the next backlog slot after `VM-016`.
- Keep the homepage design brief separate from `VM-014` so shell cleanup and gateway direction do not get conflated.
- Treat Apocrypha as published and visible, not hidden or disabled.
- Keep the mockup set small and focused on the gateway: first-visit desktop, returning-user desktop, and mobile.
- Preserve the current home personality as a carved threshold with architecture-driven UI rather than a dashboard.
- Do not modify runtime HTML, CSS, JS, generated data, or the Maze handoff contract in this pass.

## Risks / Uncertainties

- The mockup brief is now tracked, but the actual visual comps still need to be generated or approved in a follow-up step.
- The home page can drift toward either Archscry-only focus or a generic landing page if the gateway hierarchy is not kept disciplined.
- Home art direction may still need a fresh background pass once the approved mockup direction is translated into production.

## Tests Run

- Completed the required pre-flight review against the latest handoff index, recent handoffs, and kanban board.
- Reviewed the current home shell and the current inspiration image archive.
- Confirmed the current reference direction includes a three-door gateway, a centered Maze focal mass, and visible Apocrypha destination styling.

## Not Touched

- No runtime JS, CSS, HTML, generated data, or backend code was edited.
- No Archscry, Maze, or Apocrypha production flows were changed.
- No asset files were overwritten in the redesign image archive.
- No manual test cases or browser checks were run in this docs-only pass.

## Follow-Up Recommendations

- When the mockup set is approved, translate the chosen home direction into `index.html`, `assets/css/home.css`, and `assets/js/home.js`.
- If the mockup set is turned into actual image comps later, keep the 1440 desktop and 390 mobile frames separate and labeled.
- Revisit `docs/asset-manifest.md` only if the approved gateway composition requires a new background pass.

## Next Suggested Agent

Planning Architect or UI Implementer

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/mockups/homepage-gateway-mockup-set.md`
- `docs/asset-manifest.md`
- `docs/visual-style-guide.md`
