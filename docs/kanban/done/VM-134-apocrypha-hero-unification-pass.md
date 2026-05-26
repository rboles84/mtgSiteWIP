# VM-134 - Apocrypha Hero Unification Pass

## Status

Done

## Completed

2026-05-25

## Owner

Codex

## Requested

Bring the Apocrypha hero into the current Vox Mana route-family opening language while preserving the page's public reference library content, archive identity, section contracts, and `/library/` compatibility alias.

## Pre-Flight Summary

- `VM-011` made Apocrypha a visitor-first public reference library and preserved the route ids, `/library/` alias, and live public source inventory.
- `VM-122`, `VM-128`, `VM-129C`, `VM-130`, and `VM-131` established the current Home, Strategium, Maze, and Archscry visual family.
- `VM-133` is already assigned to Strategium Glass Readability Polish, so this work uses `VM-134`.
- `VM-088` is still in progress on `newIndex2.html`; use the current committed Home hero as the reference frame, and re-review if `VM-088` expands into broader Home hero layout changes before this card is implemented.

## Scope

- Update `apocrypha/index.html` so the opening section uses the current route-family frame:
  - primary copy block on the left
  - supporting signal/status panel on the right
  - consistent CTA row rhythm
  - consistent top-of-page spacing and mobile collapse behavior
- Preserve current Apocrypha content and meaning:
  - `Why This Page Exists`, `The Apocrypha`, public-reference explanation, and current CTA intent stay intact.
  - The current `At A Glance` commitments stay visible, but move into a support/status presentation that matches the family more closely.
- Update `assets/css/apocrypha.css` to align the opening experience with the family on panel proportion, heading scale, lede width, button spacing, chip/status styling, and desktop-to-mobile hero stacking.
- Keep the work route-local to Apocrypha.
- Touch `assets/js/apocrypha.js` only if the hero DOM reshuffle requires small reveal, rail, or return-dock selector updates.
- Add Apocrypha visual regression coverage in this card.

## Constraints

- Do not edit `newIndex2.html`, `archscry/index.html`, `maze/index.html`, or `strategium/index.html`.
- Preserve `/apocrypha/` as canonical.
- Preserve `/library/` as the compatibility alias; alias retirement is a separate product decision.
- Preserve section ids and rail hooks: `#top`, `#decks`, `#ledger`, `#method`, `#dossiers`, `#notice`, and `data-rail-section`.
- Preserve all 10 current public source URLs.
- Do not change placement logic, lore/source data, canonical `/data/` files, or cross-route shared behavior outside what Apocrypha directly needs.
- Do not introduce a new shared sitewide hero abstraction in this card.
- Do not add Maze command-deck framing, Archscry onboarding-console framing, fake search controls, or fake filter controls.

## Acceptance Criteria

- `/apocrypha/` opens with a hero frame that feels aligned with the current route family while still reading as Vox Mana's archive/reference branch.
- Current Apocrypha hero content remains present and understandable.
- The `At A Glance` commitments remain visible in the hero support area.
- The public reference library flow, section rail, return dock, reduced-motion handling, and source links still work.
- `/library/` still forwards into `/apocrypha/`.
- Desktop and narrow mobile layouts have no clipped text or horizontal overflow.

## Implementation Summary

- Reworked the Apocrypha hero into a clearer route-family frame with the primary copy on the left, a support panel on the right, a shared-feeling CTA rhythm, and a compact hero commitment strip.
- Preserved the existing Apocrypha content, section ids, rail hooks, source-library flow, and `/library/` compatibility alias.
- Kept the work route-local to `apocrypha/index.html` and `assets/css/apocrypha.css`; no route-family abstraction was introduced.
- Added `scripts/visual-regression-apocrypha.mjs` plus package scripts for Apocrypha baseline/compare screenshots, console contracts, `/library/` alias verification, and horizontal-overflow checks.
- Updated Project Atlas and manual QA docs with the new Apocrypha route shell and visual regression commands.

## Verification Plan

- `node --check assets/js/apocrypha.js` if touched
- `node --check scripts/visual-regression-apocrypha.mjs`
- `npm.cmd run test:visual:apocrypha:baseline`
- `npm.cmd run test:visual:apocrypha`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser QA on `/apocrypha/` and `/library/` for hero alignment, archive identity, rail highlighting, return dock, reduced motion, public links, and mobile layout.

## Verification Results

- `node --check assets/js/apocrypha.js`
- `node --check scripts/visual-regression-apocrypha.mjs`
- `npm.cmd run test:visual:apocrypha:baseline`
- `npm.cmd run test:visual:apocrypha`
  - `hero-desktop`: `0` mismatched pixels
  - `hero-mobile`: `0` mismatched pixels
  - `references-desktop`: `0` mismatched pixels
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
  - Passed with existing LF/CRLF warnings only.

## Notes

- This card used the current committed `newIndex2.html` hero as the benchmark, not the eventual post-`VM-088` state.
- If `VM-088` later expands into a broader Home hero frame or layout change, refresh the Apocrypha benchmark review before treating this pass as the final family alignment.
