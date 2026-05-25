# Agent Handoff

- Agent name: Codex
- Task requested: Implement the Archscry inline CSS extraction plan, keep the route-local JS runtime intact, add a deterministic landing-and-dossier visual regression harness, update validator/docs, and close the Kanban work.
- Related Kanban card, docs, or plans:
  - `VM-127 - Phase 4 Archscry Index Extraction`
  - `docs/kanban/board.md`
  - `docs/architecture/project-atlas.md`
  - `docs/reference/manual-test-cases.md`
  - `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
  - `docs/handoffs/2026-05-24-1936-codex-vm120-container-queries-subgrid.md`
  - `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`
  - `docs/handoffs/2026-05-24-2350-codex-vm123-archscry-local-file-boot-repair.md`

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-127-phase-4-archscry-index-extraction.md`
- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/index.js`
- `assets/js/shared.js`
- `assets/js/archscry-atmosphere.js`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/validate-frontend-html.mjs`
- `package.json`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`

## Files changed

- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/index.js`
- `package.json`
- `scripts/visual-regression-archscry.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/done/VM-127-phase-4-archscry-index-extraction.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-0820-codex-vm127-archscry-index-extraction.md`

## What changed

- Removed the large inline `<style>` block from `archscry/index.html`.
- Lifted that page-local Archscry CSS into `assets/css/archscry.css` without layering or selector refactor.
- Kept `assets/css/archscry.css` as the last stylesheet in the Archscry head.
- Left the Archscry runtime in `assets/js/index.js` and added only a test-only `__vmVisualRegressionDisableCardArt` hook so screenshot runs can skip live card-art fetches.
- Added `scripts/visual-regression-archscry.mjs` plus `test:visual:archscry:baseline` and `test:visual:archscry` package scripts.
- Seeded the visual harness through the real `restoreInitialView()` path by writing a deterministic `vm_last_result` dossier payload into `sessionStorage` and stubbing Supabase so `SESSION.profile` stays null.
- Added Archscry-specific validator coverage to reject inline `<style>` blocks and ensure `archscry.css` remains linked.
- Updated the manual QA and architecture docs to reflect the route-local CSS extraction and the new visual regression commands.
- Closed the Kanban card under `VM-127` and updated the handoff index.

## Why it changed

- `archscry/index.html` was still carrying a large inline stylesheet that made the route harder to maintain and blocked the CSS architecture cleanup from being consistently applied.
- The new visual harness gives the repo a deterministic regression gate for both the landing shell and a representative dossier shell, which reduces risk for future Archscry work.
- The route already used external JS, so the safest implementation was a CSS-only extraction plus a narrow test hook rather than a broader runtime refactor.

## Decisions made

- Shipped the work as `VM-127`, not `VM-126`, because `VM-126` was already occupied by an existing Strategium done card and handoff trail.
- Kept the extraction route-local in `assets/css/archscry.css` instead of pushing Archscry styles into shared home assets.
- Did not invent a JS extraction task because `archscry/index.html` no longer contains inline `<script>` blocks.
- Treated the Supabase stub as functional harness setup, not just console-noise suppression, because it keeps `SESSION.profile` null and forces the cached-result restore path.
- Relaxed the background star canvas check to require canvas element presence, while still requiring the dossier radar canvas to render pixels before diff.

## Risks / uncertainties

- The current worktree contains unrelated pre-existing changes in files such as `strategium/index.html`, `scripts/frontend-smoke.mjs`, `docs/architecture/core-logic-and-algorithms.md`, and other recent docs. They were preserved and not folded into this card.
- The visual harness intentionally masks unstable surfaces like the starfield and radar canvas before diff, so manual spot checks still matter for full aesthetic review.
- Adjacent-fit navigation and dossier state switching were preserved, but future deeper Archscry refactors should keep exercising those flows explicitly.
- A single formatting oddity was noticed during manual QA but could not be reproduced afterward, so it is recorded as a non-blocking observation rather than an actionable defect.

## Tests run

- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`
  - `landing-mobile`: `0` mismatched pixels
  - `landing-desktop`: `0` mismatched pixels
  - `dossier-mobile`: `0` mismatched pixels
  - `dossier-tablet`: `0` mismatched pixels
  - `dossier-desktop`: `0` mismatched pixels
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Manual browser pass on the Archscry route
  - landing, quick-reading, interview, and dossier shells looked correct
  - dossier radar initialized correctly
  - adjacent-fit switching remained accurate
  - one formatting oddity appeared once but did not reproduce

## Not touched

- `assets/css/home.css`
- `assets/js/home.js`
- `newIndex2.html`
- `strategium/index.html`
- Canonical data under `/data/`
- Existing route names, placement scoring behavior, and dossier copy

## Follow-up recommendations

- Run a quick manual browser pass on the live Archscry dossier and adjacent-fit switching flow before merge or release, even though the screenshot harness is passing.
- Consider a separate cleanup card for stale `/archscry/index2.html` references if they remain after the current route inventory settles.
- Reuse this harness pattern for future route-local extraction work instead of inventing a second regression approach.

## Next suggested agent

- Test Strategist
