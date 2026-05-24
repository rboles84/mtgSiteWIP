# VM-111 - Shared Non-Maze Logo + Topbar Rollout

## Status

Done

## Summary

Unified the non-Maze public pages on one shared Vox Mana topbar and static header logo, aligned to the `newIndex2.html` visual language while preserving existing Home-link targets and local-file route compatibility.

## Changes

- Added the canonical static header mark at `assets/img/vox-mana-header-logo.svg`.
- Rebuilt `assets/css/topbar.css` around the shared topbar contract with consistent logo sizing, calmer glass/stone treatment, and mobile-ready spacing.
- Updated `assets/js/vm-topbar.js` so the mobile panel mirrors each page's real primary-nav links, preserves `href` values and `aria-current`, closes on outside click / `Escape`, and restores focus to the trigger.
- Exposed shared reduce-motion state through `assets/js/reduce-motion.js` so topbar controls reuse one state path instead of creating an independent mobile toggle.
- Normalized the shared header contract across `newIndex2.html`, `index.html`, `archscry/index.html`, `apocrypha/index.html`, `basics/index.html`, `privacy/index.html`, and `terms/index.html`.
- Updated `assets/css/home.css` so the home page no longer overrides `.vm-brand-mark` with the old placeholder geometry.
- Added shared topbar QA coverage to `docs/reference/manual-test-cases.md`.

## Acceptance Criteria

- All in-scope pages use the shared `.vm-topbar` / `.vm-brand` / `.vm-nav` / `.vm-utility` / `.vm-menu-panel` contract.
- All in-scope headers use `assets/img/vox-mana-header-logo.svg` instead of a CSS-only placeholder mark.
- Mobile menus mirror the page's real nav links, preserve `href` values and `aria-current`, and reuse the existing reduce-motion state path.
- Desktop and mobile topbars render without clipped states or horizontal overflow.
- `maze/index.html` and Maze internals remain untouched.

## Tests

- `node --check assets/js/vm-topbar.js`
- `node --check assets/js/reduce-motion.js`
- `npm.cmd test`
- `git diff --check`
- Static route/header verification for all in-scope pages, including preserved Home-link targets and mirrored menu placeholders
- `git diff -- maze/index.html` to confirm Maze remained untouched
- Manual browser smoke checklist updated in `docs/reference/manual-test-cases.md`

## Notes

- The requested browser smoke pass could not be automated in-session because the callable in-app browser tool was unavailable and local Playwright was not installed. Static verification and JS behavior inspection were completed, and the manual smoke checklist was updated to cover the remaining visual checks.
