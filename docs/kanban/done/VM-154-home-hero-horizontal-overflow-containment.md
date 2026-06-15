# VM-154 - Home Hero Horizontal Overflow Containment

ID: VM-154
Title: Home Hero Horizontal Overflow Containment
Status: done - superseded by VM-390
Type: Frontend / Visual Defect
Area: Home, Hero, Identity Signal, Responsive Layout
Priority: medium
Created: 2026-05-28
Requested As: VM-150, but `VM-150` already exists as `Dossier Maze Path Differentiation`; assigned next available ID `VM-154`.

## Summary

Contain the Home hero horizontal overflow caused by the identity radar glow/container stack without treating the work as route CSS/JS cleanup. This is a focused visual defect card for the Home hero radar/glow/container behavior only.

2026-06-14 supersession note: VM-390 promotes this backlog defect into a v1 release-readiness implementation pass. Keep the evidence and boundaries below as historical context; do not leave VM-154 active separately from VM-390.

## Source

- `docs/handoffs/2026-05-28-1151-codex-vm147a-home-risk-reduction-implementation.md`
- `docs/kanban/done/VM-147A-home-route-css-js-risk-reduction.md`
- `docs/reference/manual-test-cases.md`
- `index.html`
- `assets/css/home.css`
- `scripts/visual-regression-home.mjs`

## Problem Evidence

- During VM-147A temporary QA, an 800px viewport measured `documentElement.scrollWidth: 921px`.
- The implicated visible overflow candidate was the Home hero radar glow/container area, especially `#heroManaGlow` with measured bounds around `left: -59`, `right: 859`, `width: 919`, plus nearby decorative SVG geometry.
- A full root containment attempt on `html` / `body` reduced the measured width from `921px` to `800px`, but it caused tablet visual-regression drift of `473` mismatched pixels, exceeding the `300`-pixel budget.
- Selector-level attempts against `.vm-radar-card.vm-hero-radar-card .vm-radar-glow` and `.vm-chart-wrap.vm-hero-chart-wrap` did not resolve actual horizontal scroll under a stricter probe.
- VM-147A final visual regression, after reverting containment experiments, passed with mobile `0`, tablet `1`, desktop `21` mismatched pixels.

## In Scope

- `assets/css/home.css` selectors directly responsible for Home hero radar/glow/container overflow.
- `index.html` only if needed to confirm the Home hero/radar DOM structure; avoid markup changes unless a minimal accessibility-neutral wrapper/attribute fix is proven necessary.
- `docs/reference/manual-test-cases.md` only if Home overflow QA steps need a small clarification.
- `scripts/visual-regression-home.mjs` only if a small Home-specific viewport measurement guard is clearly justified.

## Out Of Scope

- VM-147 route CSS/JS cleanup.
- Broad Home CSS reorganization.
- Visual redesign of the Home hero.
- Chart.js loading strategy or chart configuration.
- `assets/js/graph.js`.
- `assets/js/home.js` unless a verified overflow measurement hook is absolutely required; prefer CSS-only containment.
- `assets/js/index.js`.
- Shared CSS/JS normalization.
- Maze, Archscry, Scryfall parser, placement scoring, precon data, Supabase/session contracts, or generated data.

## Required Approach

1. Capture before measurements at mobile, tablet, desktop, and an explicit 800px viewport.
2. Record `documentElement.clientWidth`, `documentElement.scrollWidth`, whether horizontal scrolling is possible, and the top overflow candidates with selector/bounds.
3. Test a minimal Home-local containment change aimed only at the radar/glow/container overflow.
4. Re-run the same viewport measurements after the fix.
5. Run `npm.cmd run test:visual:home` and record the exact mobile/tablet/desktop mismatch counts.
6. If the only complete fix requires meaningful hero glow changes or exceeds the visual-regression budget, do not force it; document the result and leave a design decision note.

## Acceptance Criteria

- Home has no horizontal scroll at mobile, tablet, desktop, and the explicit 800px viewport.
- Before/after viewport measurements are recorded in the implementation handoff.
- The exact selector(s) changed are documented.
- The fix is Home-local and limited to hero radar/glow/container overflow behavior.
- The identity radar still renders through existing Chart.js behavior.
- No Chart.js loading or configuration change is made.
- `assets/js/graph.js` and `assets/js/index.js` remain untouched.
- `npm.cmd run test:visual:home` passes, with exact mismatch counts documented.
- If visual drift exceeds the existing budget or materially changes the intended hero glow, the fix is not shipped without an explicit visual baseline/design decision.

## Verification

- Before/after viewport measurement probe covering mobile, tablet, desktop, and 800px.
- `npm.cmd run test:visual:home`
- `npm.cmd run test:frontend-smoke`
- Manual Home QA for `/` and `/index.html`, including hero, identity radar, reduced motion, and horizontal scroll.

## Notes

- Treat this as a visual defect with measurement evidence, not a continuation of VM-147A cleanup.
- Use canonical Home asset names: `assets/css/home.css` and `assets/js/home.js`.
- Preserve the Home Mana Lens behavior, including registry-backed identities, cycle timing, hover/focus pause, hidden-tab pause, and reduced-motion `Still`.
