# Agent Handoff: Codex - Route Architecture Normalization

Date: 2026-05-16 10:53
Related Card: VM-020
Related Plan: Route Architecture Normalization
Status: Complete

## Agent Name

Codex

## Task Requested

Perform a route and navigation migration so Vox Mana uses folder-based canonical routes for Maze and Apocrypha while keeping the rest of the site behavior intact.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-2113-codex-lightweight-mock-home-sandbox.md`
- `docs/handoffs/2026-05-15-2016-codex-vm017-main-index-gateway-mockup-set.md`
- `docs/handoffs/2026-05-15-0914-codex-vm005-archscry-maze-continuity.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/method-reference.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/diagrams/route-map.mmd`
- `docs/diagrams/project-architecture.mmd`
- `index.html`
- `archscry/index.html`
- `maze.html`
- `library/index.html`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/research-init.js`

## Files Changed

- `maze/index.html`
- `apocrypha/index.html`
- `index.html`
- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `docs/architecture/project-atlas.md`
- `docs/reference/method-reference.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/move-into-repo.md`
- `docs/diagrams/route-map.mmd`
- `docs/diagrams/project-architecture.mmd`
- `docs/diagrams/route-map.svg`
- `docs/kanban/backlog/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md`
- `docs/kanban/done/VM-020-route-architecture-normalization.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`

## What Changed

- Moved Maze from a root-level `maze.html` file into `maze/index.html`.
- Moved Apocrypha from `library/index.html` into `apocrypha/index.html`.
- Updated runtime navigation and route builders to use `/maze/` and `/apocrypha/`.
- Corrected Maze's module import path so it remains valid after the move into a subfolder.
- Updated the route map, project atlas, method reference, and related planning docs to the canonical folder-based structure.
- Added a dedicated VM-020 backlog card for the route migration so the work is tracked separately from general UI cleanup.

## Why It Changed

The site's route model was split between folder routes and a root HTML route, which made the public structure harder to reason about and more brittle for future navigation work. Normalizing on route folders gives Vox Mana one rule for all public surfaces.

## Decisions Made

- Kept `/` on root `index.html`.
- Kept `archscry/` unchanged because it already follows the preferred route-folder pattern.
- Chose `/maze/` and `/apocrypha/` as the canonical public routes.
- Updated docs and trackers in the same pass so the route model is consistent across runtime and project memory.

## Risks / Uncertainties

- Old URLs such as `/maze.html` and `/library/` are no longer canonical.
- Any unreviewed relative paths inside Maze would have broken the move; the module import was corrected during the migration.
- A few historical handoffs and backlog items still reference the old naming and may be worth a later cleanup pass.

## Tests Run

- Reviewed current route references in runtime HTML and JS.
- Confirmed the Maze page had a relative module import before the move.
- Confirmed Apocrypha page links were already root-relative for shared assets.
- Verified the migration targets existed after moving the files.

## Not Touched

- No product logic, placement logic, or Scryfall query behavior was changed.
- No asset art was regenerated.
- No redirects were added.
- No unrelated cleanup or formatting sweep was performed.

## Follow-Up Recommendations

- Run browser QA on `/`, `/maze/`, `/archscry/`, and `/apocrypha/`.
- Search the repo for any remaining `/maze.html` or `/library/` references that should move to the new canonical names.
- Consider a later compatibility pass if old bookmarks need to stay live.

## Next Suggested Agent

Test Strategist or UI Implementer

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-020-route-architecture-normalization.md`
- `docs/kanban/board.md`
- `docs/architecture/project-atlas.md`
- `docs/diagrams/route-map.mmd`
- `docs/diagrams/project-architecture.mmd`

