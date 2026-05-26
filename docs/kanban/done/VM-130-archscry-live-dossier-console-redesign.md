# VM-130 - Archscry Live Dossier Console Redesign

## Status

Done

## Owner

Codex

## Requested

Refactor the live Archscry placement/result route from a long stacked report into a focused Commander-first dossier console.

## Scope Completed

- Production route refactor only.
- Preserved current dossier content, placement logic, scoring, data models, generated artifact data, saved placement schema, Supabase/auth flow, and Maze handoff contracts.
- Did not promote preview-route DOM mover logic into production.
- Added focused panel navigation, desktop dossier rail, mobile sticky horizontal nav, compact placement snapshot, segmented in-panel card/land groups, and View All fallback.
- Established a new intentional Archscry visual regression baseline for the console layout.

## Files Changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-archscry.mjs`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-130-archscry-live-dossier-console-redesign.md`

## Decisions

- Kept `renderResult()` as the single live source of dossier markup.
- Kept all card-art placeholder ID prefixes stable.
- Placed the radar in the `Placement` panel and delayed initialization when that panel is hidden.
- Used URL search params `panel` and `layout` with `history.replaceState()` for in-page state changes.
- Kept `View All` as a layout mode that reveals retained panel DOM rather than recreating content.
- Kept Commander details in-page for v1; no modal/drawer was added.

## Verification

- `node --check assets/js/index.js`
- `node --check scripts/frontend-smoke.mjs`
- `node --check scripts/visual-regression-archscry.mjs`
- `node --check research/archscry-adjacent-navigation-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Manual headless interaction QA for panel switching, View All, URL state, adjacent switching, Back to Primary, segment DOM retention, Maze return, and mobile nav.
- Headless local-file boot QA with `--allow-file-access-from-files`.

## Notes

- The new visual baseline captures default `Placement`, `Start Here`, `Commander Deck Starts`, `Starter Cards`, `Mana Base`, and `View All` at mobile and desktop widths.
- The Browser plugin tool was not available through tool discovery, so manual browser QA used the existing Puppeteer/Edge stack.

## Follow-Up

- Consider adding a first-class automated interaction smoke script if future Archscry console work continues.
