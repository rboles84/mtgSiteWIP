# VM-133 - Strategium Glass Readability Polish

## Status

Done

## Type

Frontend / Visual Polish / Readability

## Area

Strategium Route

## Priority

Medium

## Summary

Improve Strategium readability by strengthening the route-local glass surfaces just enough to make the hero, cards, and checklist easier to scan without losing the painted-background atmosphere.

## Completed

- Tune the shared Strategium glass surface used by the hero, major panels, cards, next-step cards, and readiness checklist buttons.
- Tune supporting Strategium-only subpanels so the stronger major glass still feels coherent route-wide.
- Add a modest Strategium-only supporting-text contrast lift for muted body copy and checklist button interactive states.
- Refresh the Strategium visual regression baseline and add a manual QA reminder for `.vm-checklist-button` default, hover, focus-visible, and pressed-state readability.

## Constraints Kept

- Do not redesign Strategium layout, section order, or copy.
- Do not change IDs, tab/search/checklist behavior, shared topbar wiring, or route-local Strategium JS.
- Do not touch Archscry, Maze, Apocrypha, canonical data files, or unrelated dirty worktree changes.

## Files Changed

- `assets/css/strategium.css`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-133-strategium-glass-readability-polish.md`

## Verification

- `npm.cmd run test:visual:strategium:baseline`
- `npm.cmd run test:visual:strategium`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser QA on `/strategium/` for route-wide readability plus `.vm-checklist-button` default, hover, focus-visible, and pressed-state contrast
