# 2026-06-19 23:39 - Codex - VM-413 Typography Implementation

## Agent Name

Codex

## Task Requested

Implement VM-413: move live public routes to Fraunces display, Spectral body, and IBM Plex Mono labels; retire live Google Fonts/Cinzel/Crimson usage; add scoped regression guards; refresh docs and visual baselines.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-19-1500-claude-vm413-fraunces-spectral-type-system.md`
- `docs/handoffs/2026-05-27-2208-codex-vm146-cdn-font-review.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-413-fraunces-spectral-type-system-unification.md`
- `docs/architecture/cdn-font-dependency-review.md`
- `docs/architecture/route-ownership-matrix.md`
- Live route heads, `assets/css/**`, `assets/js/**`, and Maze route-loaded `research/*.js` modules.

## Files Changed

- Added `assets/fonts/spectral-400-latin.woff2`, `assets/fonts/spectral-400-latin-ext.woff2`, `assets/fonts/spectral-600-latin.woff2`, `assets/fonts/spectral-600-latin-ext.woff2`, `assets/fonts/spectral-400-italic-latin.woff2`, `assets/fonts/spectral-400-italic-latin-ext.woff2`, and `assets/fonts/README.md`.
- Updated `assets/css/fonts.css`, `assets/css/tokens.css`, `assets/css/home.css`, `assets/css/archscry.css`, `assets/css/maze.css`, and `assets/css/strategium.css`.
- Updated `index.html`, `archscry/index.html`, `maze/index.html`, `strategium/index.html`, `apocrypha/index.html`, and `library/index.html`.
- Updated `assets/js/home.js`, `assets/js/vm-radar.js`, `assets/js/dossier-radar.js`, `assets/js/color-matrix-radar.js`, `assets/js/newindex-color-matrix.js`, and `research/research-init.js`.
- Updated `scripts/validate-frontend-html.mjs`.
- Updated `docs/architecture/cdn-font-dependency-review.md`, `docs/architecture/route-ownership-matrix.md`, `docs/kanban/board.md`, and moved VM-413 to `docs/kanban/done/`.
- Test runs rewrote generated audit outputs under `docs/audits/gate-compression/` and `docs/audits/lighthouse-home.html`.

## What Changed

- Spectral is now the live body typeface with Source Serif 4 retained only as fallback.
- Fraunces remains the display face and now receives former Cinzel/Cinzel Decorative headings, SVG labels, and canvas/chart font strings.
- IBM Plex Mono remains the label/technical face and now receives former all-caps Cinzel label/button/readout rules where appropriate.
- Route-owned Google Fonts imports were removed from live public route heads.
- Maze now loads `tokens.css` before `fonts.css`.
- Home preloads the critical self-hosted font files used by its initial typography.
- `npm run lint:html` now includes a scoped legacy-font regression guard over live route assets only.
- VM-146 dependency docs and the route ownership matrix now mark Google Fonts delivery closed by VM-413.

## Why It Changed

The repo already intended a self-hosted token stack, but hardcoded route CSS/JS and route-head Google imports caused live pages to fall back into Cinzel/Cinzel Decorative/Crimson behavior. VM-413 makes the intended type system real on the public surface and guards against the regression without false-failing archived docs/prototypes.

## Decisions Made

- Omitted Spectral metric overrides rather than copying Source Serif 4 values; browser QA showed zero sampled CLS.
- Kept Source Serif 4 as a fallback in `--font-text`.
- Kept Home hero negative tracking and tuned existing label spacing per rule rather than globally zeroing letter-spacing.
- Included Maze's public route-loaded `research` modules in the static guard even though broad `research/**` remains out of scope.
- Refreshed visual baselines only after inspecting Home, Archscry, Strategium, and Apocrypha diffs as typography-only.

## Risks / Uncertainties

- `npm.cmd run test:lighthouse:home` remains at the pre-existing Performance 88 / Accessibility 96 result against a 90/90 gate. VM-392 already documents a formal Home Lighthouse waiver, and the prior committed report was also Performance 88.
- The test suite rewrote generated audit files; no data/source facts or placement artifacts were intentionally changed.
- Owner manual visual review is still useful because typography taste is subjective even when automated visual baselines pass.

## Tests Run

- PASS `npm.cmd run test:placement` before implementation.
- PASS `npm.cmd run test:placement` after implementation.
- PASS headless FontFace route check for Fraunces, Spectral, and IBM Plex Mono from `/assets/fonts/`; sampled body/display/label stacks and CLS/console checks passed.
- PASS scoped `rg` legacy-font check over live route assets.
- PASS `npm.cmd test`.
- PASS `npm.cmd run test:parser`.
- PASS `npm.cmd run lint:html`.
- PASS `npm.cmd run lint:js`.
- PASS `npm.cmd run test:frontend-smoke`.
- FAIL `npm.cmd run test:lighthouse:home`: Performance 88, Accessibility 96, matching the existing VM-392 waiver state.
- PASS `npm.cmd run test:visual:home` after baseline refresh.
- PASS `npm.cmd run test:visual:archscry` after baseline refresh.
- PASS `npm.cmd run test:visual:strategium` after baseline refresh.
- PASS `npm.cmd run test:visual:apocrypha` after baseline refresh.

## Not Touched

- Placement scoring and generated placement data.
- MTG lore, Commander facts, Scryfall behavior, Supabase auth/session behavior, saved-result contracts, and route content semantics.
- Archived prototype docs and research/audit references outside the live route-loaded scope.

## Follow-Up Recommendations

- Treat the Home Lighthouse 88/90 gap as the existing VM-392 performance waiver unless the owner opens a dedicated Home LCP/performance card.
- If a later card computes Spectral-specific metric overrides, validate with the same headless FontFace/CLS route check before shipping.
- Keep future font-regression searches scoped to live route assets, not repository-wide docs and audits.

## Next Suggested Agent

Owner manual visual QA, then a Performance Steward only if the Home Lighthouse waiver should be replaced with an actual LCP repair card.

## Related Kanban Card / Docs

- VM-413
- VM-146
- VM-392
- `docs/architecture/cdn-font-dependency-review.md`
- `docs/architecture/route-ownership-matrix.md`
