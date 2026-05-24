# Agent Handoff

## Agent name

Codex

## Task requested

Implement the shared non-Maze logo and topbar rollout across the public non-Maze pages, preserve existing Home-link semantics, update shared header behavior/docs, and close the corresponding Kanban card.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-20-2336-codex-archscry-background-parity-gateway-09.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/handoffs/2026-05-22-0751-codex-vm100-privacy-terms-archive-document-refresh.md`
- `docs/kanban/board.md`
- `docs/reference/manual-test-cases.md`
- `newIndex2.html`
- `index.html`
- `archscry/index.html`
- `apocrypha/index.html`
- `basics/index.html`
- `privacy/index.html`
- `terms/index.html`
- `maze/index.html`
- `assets/css/topbar.css`
- `assets/css/home.css`
- `assets/js/vm-topbar.js`
- `assets/js/reduce-motion.js`
- `assets/img/logo.html`
- `assets/img/vox-mana-logo-flame-orb-final.html`

## Files changed

- `assets/img/vox-mana-header-logo.svg`
- `assets/css/topbar.css`
- `assets/css/home.css`
- `assets/js/vm-topbar.js`
- `assets/js/reduce-motion.js`
- `newIndex2.html`
- `index.html`
- `archscry/index.html`
- `apocrypha/index.html`
- `basics/index.html`
- `privacy/index.html`
- `terms/index.html`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-111-shared-non-maze-logo-topbar-rollout.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-23-0029-codex-vm111-shared-non-maze-logo-topbar-rollout.md`

## What changed

- Added `assets/img/vox-mana-header-logo.svg` as the canonical static shared-header logo.
- Replaced the CSS-only `.vm-brand-mark` placeholder on all in-scope non-Maze pages with the committed logo image.
- Rebuilt the shared topbar styles so the header now has one consistent desktop/mobile system, shared spacing rhythm, and stable menu-panel layout.
- Updated `assets/js/vm-topbar.js` so the mobile menu mirrors the real primary-nav links, preserves `href` values and `aria-current`, closes on outside click and `Escape`, and restores focus to the trigger.
- Updated `assets/js/reduce-motion.js` to expose one shared `window.vmReduceMotion` state path and synchronize the `data-reduce-motion` attribute for the topbar controls.
- Migrated `newIndex2.html` and `basics/index.html` off bespoke header handling and onto the shared topbar contract.
- Normalized the same contract on `index.html`, `archscry/index.html`, `apocrypha/index.html`, `privacy/index.html`, and `terms/index.html`.
- Removed the old home-page `.vm-brand-mark` geometry override from `assets/css/home.css` so it no longer fights the shared logo system.
- Added a shared-topbar smoke checklist and expanded the local-file smoke checklist in `docs/reference/manual-test-cases.md`.

## Why it changed

- The non-Maze routes had diverged in header structure, styling, and mobile behavior.
- The shared rollout brings those routes back to one consistent Vox Mana shell that matches the refreshed `newIndex2.html` direction without pulling Maze into the change set.
- The mobile menu needed to reflect real route links and reuse the same reduce-motion state path to avoid split behavior between desktop and mobile controls.

## Decisions made

- Rechecked Kanban numbering and used `VM-111` because both `VM-109` and `VM-110` were already occupied.
- Kept `index.html` self-targeted and preserved `../newIndex2.html` Home targets on the non-home routes.
- Left `newIndex2.html` self-targeted to `#top`.
- Kept `maze/index.html` fully out of scope.
- Used a simplified static derivative logo for header scale instead of reusing a larger showcase mark.
- Normalized header tooltip copy and brand `aria-label` text to ASCII-safe strings in the touched pages.

## Risks / uncertainties

- The requested browser smoke pass could not be automated in-session because the callable in-app browser tool was unavailable and local Playwright was not installed.
- Static verification confirms the shared wiring, but final visual confirmation for overflow/clipping and interactive focus behavior still depends on running the manual smoke checklist in a real browser.
- The worktree already contained unrelated modified and untracked docs/card files from recent VM-107 through VM-110 work; those were left in place.

## Tests run

- `node --check assets/js/vm-topbar.js`
- `node --check assets/js/reduce-motion.js`
- `npm.cmd test`
- `git diff --check`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- maze/index.html`
- Static header-contract verification across:
  - `newIndex2.html`
  - `index.html`
  - `archscry/index.html`
  - `apocrypha/index.html`
  - `basics/index.html`
  - `privacy/index.html`
  - `terms/index.html`

## Not touched

- `maze/index.html`
- Maze internals
- Archscry scoring/runtime logic
- Legal/body copy outside header wiring
- `library/index.html` compatibility redirect shell

## Follow-up recommendations

- Run the new shared-topbar smoke pass from `docs/reference/manual-test-cases.md` in a real browser at desktop and mobile widths, including `file://` coverage.
- If the header logo needs micro-tuning after visual QA, adjust only `assets/img/vox-mana-header-logo.svg` and shared topbar spacing rather than page-local overrides.
- If Maze is brought into the same header system later, create a separate rollout card so Maze-specific shell/runtime behavior can be validated independently.

## Next suggested agent

Test Strategist

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-111-shared-non-maze-logo-topbar-rollout.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
