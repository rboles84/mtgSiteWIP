# VM-147A - Home Route CSS JS Risk Reduction

ID: VM-147A
Title: Home Route CSS JS Risk Reduction
Status: done
Type: Frontend / Risk Reduction
Area: Home, CSS Architecture, Route-local JS
Priority: medium
Created: 2026-05-28
Completed: 2026-05-28

## Summary

Reduce risk in the canonical Home route's route-local CSS and JS without changing product behavior, renaming the historical `newindex2` assets, or widening the work into shared-system cleanup.

## Why Home First

- Home is bounded to one HTML file and two route-local assets.
- The route is visually important, but its behavior is less product-logic-coupled than Maze or Archscry.
- `assets/js/graph.js` and the Chart.js runtime can be protected with QA rather than rewritten.
- The Home route already has stronger smoke and visual harnesses than the original VM-147 card assumed.

## Current Route Contract

- `index.html` currently loads shared CSS in this order: Google Cinzel, `tokens.css`, `fonts.css`, `layout.css`, `topbar.css`, then `newindex2.css`.
- `index.html` currently loads Home JS in this order: deferred `graph.js` in the head, then deferred `newindex2.js`, `reduce-motion.js`, and `vm-topbar.js` at the end of `body`.
- Home depends on `data/identity-layers.json` for preview identities and `data/factions.json` for hero mana lore.
- `assets/js/index.js` is not loaded by `index.html`; it remains Archscry-owned and is out of scope for this slice.

## Source

- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/done/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/done/VM-088-home-auto-cycling-mana-lens-showcase.md`
- `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`
- `docs/handoffs/2026-05-24-2315-codex-vm121-precommit-hardening.md`
- `docs/handoffs/2026-05-26-2334-codex-vm148-canonical-homepage-cutover.md`
- `docs/handoffs/2026-05-27-0706-codex-vm149-identity-preview-registry.md`
- `docs/handoffs/2026-05-27-0730-codex-vm088-home-mana-lens-closeout.md`
- `docs/reference/manual-test-cases.md`
- `docs/design/asset-manifest.md`
- `index.html`
- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `assets/js/graph.js`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-newindex2.mjs`

## In Scope

- `index.html`
- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `assets/js/graph.js` for dependency inventory and QA awareness only. Do not edit it unless a verified Home-specific defect is found and the fix is explicitly documented.
- `docs/reference/manual-test-cases.md`
- `scripts/frontend-smoke.mjs` or `scripts/visual-regression-newindex2.mjs` only if a small Home-specific guardrail update is clearly justified

## Out Of Scope

- `assets/js/index.js`
- `assets/css/topbar.css`, `assets/js/vm-topbar.js`, `assets/js/reduce-motion.js`, `assets/css/layout.css`, `assets/css/tokens.css`, or other shared-shell files unless a route-specific defect proves the need
- Chart.js replacement, chart configuration redesign, or loading-strategy changes
- Maze parser/search behavior
- Archscry templates, dossier runtime, placement scoring, precon logic, or generated data
- Supabase/session contracts
- Bundling, framework migration, TypeScript, repo-wide CSS normalization, or visual redesign
- Renaming `assets/css/newindex2.css` or `assets/js/newindex2.js`

## Planned Work

- Confirm and preserve Home's existing asset load order and relative-path safety in `index.html`.
- Reorganize `assets/css/newindex2.css` with clear high-level route-local sections such as `Home route shell`, `Hero`, `Identity signal`, `Cards / panels`, `Responsive behavior`, `Animation / reduced motion`, and `Legacy compatibility`.
- Remove only verified stale or duplicate Home-only CSS. The current `#void-canvas` rule is a candidate because `index.html` has no matching element.
- Reorganize `assets/js/newindex2.js` by route-local concern: SVG boot, hero Mana Lens / Chart runtime, atmosphere, reveal behavior, and page bootstrap.
- Add defensive guards only where optional DOM hooks are genuinely optional.
- Remove only verified dormant Home-only runtime. Current candidates include the `.hero-card` observer path and placeholder-link guard, because current `index.html` has neither `.hero-card` nor `[data-vm-placeholder-link]`.
- Remove the dormant `vm-dossier-card` custom element only if the implementation pass confirms no active Home markup or QA contract still depends on it.
- Leave `assets/js/graph.js` and Chart.js behavior unchanged except for dependency inventory notes or QA documentation.
- Add or refine a Home manual QA checklist covering topbar, hero render, identity signal/radar, animation, reduced motion, responsive widths, console cleanliness, asset paths, and historical `newindex2` filename continuity.

## Acceptance Criteria

- Home still renders correctly at `/` and `index.html`.
- `assets/css/newindex2.css` and `assets/js/newindex2.js` remain in place with their current filenames.
- No Chart.js loading-strategy change is made.
- `assets/js/index.js` is not modified as part of the Home slice.
- Identity signal/radar behavior still works, including registry-backed preview identities, the tuned `4800ms` cycle, hover/focus pause, hidden-tab pause, and reduced-motion `Still` state.
- No console errors appear on initial Home load.
- Manual QA coverage exists for mobile, tablet, and desktop Home behavior.
- The implementation note explains what changed, what was intentionally not changed, why Chart.js/loading stayed alone, and how the historical `newindex2` asset names were preserved.
- The diff remains clearly route-scoped and does not turn into broader architecture cleanup.

## Verification

- `node --check assets/js/newindex2.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:visual:newindex2`
- Manual Home QA from `docs/reference/manual-test-cases.md`

## Completion Notes

- Organized `assets/css/newindex2.css` with route-local section markers without moving blocks in a way that intentionally changes cascade priority.
- Removed verified stale or duplicate Home-only CSS: the dormant `#void-canvas` selector and one identical duplicate `.vm-radar-glow` rule.
- Organized `assets/js/newindex2.js` with route-local behavior sections and removed verified dormant Home-only runtime paths: unused `<vm-dossier-card>`, unused `.hero-card` observer wiring, unused placeholder-link guard, and an unused reduced-motion variable.
- Preserved `assets/css/newindex2.css` and `assets/js/newindex2.js` filenames and Home's current `index.html` load order.
- Left `assets/js/graph.js`, Chart.js loading, and Chart.js configuration unchanged.
- Added a VM-147A Home manual QA checklist to `docs/reference/manual-test-cases.md`.

## Overflow Follow-Up

- A temporary QA probe found Home's mobile/tablet horizontal scroll surface before any containment attempt: at an 800px viewport, `documentElement.scrollWidth` measured `921px`; the visible contributor was the Home hero radar glow (`#heroManaGlow`, `left: -59`, `right: 859`, `width: 919`) plus nearby decorative SVG geometry.
- A root containment attempt on `html`/`body` reduced the measured width to `800px` and removed horizontal scrolling, but it created meaningful tablet visual-regression drift (`473` mismatched pixels, over the `300` budget), so it was reverted.
- Selector-level attempts against `.vm-radar-card.vm-hero-radar-card .vm-radar-glow` and `.vm-chart-wrap.vm-hero-chart-wrap` did not remove the actual horizontal scroll under the stricter probe, so they were reverted rather than shipped as partial fixes.
- No overflow containment fix remains in VM-147A. Track this as a future Home route defect slice if horizontal scroll is prioritized, with a fresh visual baseline decision if the intended hero glow must change.

## Tests Run

- `node --check assets/js/newindex2.js` - pass.
- `npm.cmd run lint:html` - pass.
- `npm.cmd run lint:js` - pass.
- `npm.cmd run test:frontend-smoke` - pass.
- `npm.cmd test` - pass.
- `npm.cmd run test:visual:newindex2` - pass; final comparison reported mobile `0`, tablet `1`, desktop `21` mismatched pixels, all within the `300`-pixel budget.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - no whitespace errors; Git reported LF-to-CRLF working-copy normalization warnings only.

## Risks / Uncertainties

- `assets/css/newindex2.css` already carries dense low-level comments, so the cleanup should favor clearer high-level sections over adding more comment volume.
- `assets/js/newindex2.js` still contains historical `Archscry` naming in the atmosphere path; rename-only churn is not the goal for this slice.
- The Home visual harness masks animated canvas layers, so browser/manual review remains necessary for atmosphere and motion behavior.

## Human Review

Yes - verify the hero signal, chart, responsive layout, and reduced-motion behavior in browser after cleanup.
