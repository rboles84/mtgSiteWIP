# Agent Handoff - VM-121 `newIndex2.html` Extraction Implementation

- Agent name: Codex
- Task requested: Implement VM-121 by extracting the inline CSS and JS from `newIndex2.html`, adding a deterministic visual regression harness for the page, updating validators and docs, and closing the Kanban workflow.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2023-codex-vm121-newindex2-extraction-card.md`
- `docs/handoffs/2026-05-24-2137-codex-vm121-planning-review.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-121-phase-4-newindex2-extraction.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `package.json`
- `newIndex2.html`
- `scripts/lint-frontend-js.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/lighthouse-newindex2.mjs`

## Files changed

- `newIndex2.html`
- `newIndex2_Old.html`
- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/lint-frontend-js.mjs`
- `scripts/validate-frontend-html.mjs`
- `package.json`
- `package-lock.json`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-121-phase-4-newindex2-extraction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`

## What changed

- Moved the large page stylesheet, the SVG-local `.cag-spiral*` rules, the spiral initializer, and the main page runtime out of `newIndex2.html`.
- Added `assets/css/newindex2.css` and `assets/js/newindex2.js` and rewired `newIndex2.html` to load them after `topbar.css` and before `reduce-motion.js`.
- Removed `newIndex2_Old.html` after confirming it had no runtime references and no remaining role in the live preview workflow.
- Preserved `assets/js/graph.js` as the first page-specific script in the head and kept the main page bootstrap inside `DOMContentLoaded`.
- Added `scripts/visual-regression-newindex2.mjs` plus `test:visual:newindex2:baseline` and `test:visual:newindex2` npm scripts.
- Installed `chrome-launcher`, `puppeteer-core`, `pixelmatch`, and `pngjs` in devDependencies.
- Extended `scripts/validate-frontend-html.mjs` so `newIndex2.html` must keep the extracted CSS/JS links, keep `topbar.css` before `newindex2.css`, and avoid inline `<style>` / `<script>` blocks.
- Extended `scripts/lint-frontend-js.mjs` to syntax-check `assets/js/newindex2.js`.
- Updated `docs/reference/manual-test-cases.md` and `docs/architecture/project-atlas.md`.
- Moved VM-121 from `ready` to `done` on the Kanban board.

## Why it changed

- `newIndex2.html` was the biggest remaining self-contained frontend debt item and blocked the CSS architecture cleanup from reaching the preview homepage honestly.
- The new regression harness gives the repo a repeatable before/after proof path for extraction work without requiring a human to eyeball every change from scratch.
- Route-local assets were chosen over `home.css` / `home.js` so the extraction could land without increasing the live `/` regression surface.

## Decisions made

- Kept VM-121 scoped to `newIndex2.html` only; `strategium/index.html` remains follow-up work.
- Landed the extraction in dedicated route-local assets: `assets/css/newindex2.css` and `assets/js/newindex2.js`.
- Kept the extracted CSS unlayered and treated the move as a literal lift, not a cleanup or dedupe pass.
- Preserved the existing page script order: `graph.js` -> `newindex2.js` -> `reduce-motion.js` -> `vm-topbar.js`.
- Hardened the visual harness by verifying both canvases initialize, then hiding the full-page star canvas and hero radar canvas during screenshot diff so the comparison measures static shell parity rather than GPU/canvas noise.
- Filtered environment-only `fonts.googleapis.com` network-denied errors and `favicon.ico` 404 noise out of the saved visual-regression console contract.

## Risks / uncertainties

- The visual-regression harness now intentionally excludes the two canvas layers from the screenshot diff, so canvas initialization correctness is enforced through readiness checks rather than raw image comparison.
- `newIndex2.html` still carries its large route-local CSS/JS payload; this card externalizes ownership but does not yet reduce size or deduplicate shared logic.
- The new harness depends on a locally available Edge or Chrome install and may need a path adjustment if the browser location changes.

## Tests run

- `node --check assets/js/newindex2.js`
- `npm.cmd run test:visual:newindex2:baseline`
- `npm.cmd run test:visual:newindex2`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`

## Not touched

- `assets/css/home.css`
- `assets/js/home.js`
- `strategium/index.html`
- `assets/js/graph.js`

## Follow-up recommendations

- Create VM-122 for `strategium/index.html` extraction and reuse the new harness pattern with an added readiness guard for the Shadow DOM dossier card.
- Consider a later route-local cleanup pass to identify truly shared selectors or helpers that can migrate safely into shared home assets after parity is proven.
- If the visual harness gets reused elsewhere, consider extracting the local static-server and browser-launch helpers into a shared script utility.

## Next suggested agent

- Planning Architect for the VM-122 follow-up card and readiness contract.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-121-phase-4-newindex2-extraction.md`
- `docs/kanban/board.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
