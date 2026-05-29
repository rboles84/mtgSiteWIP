# VM-147 - Route CSS JS Risk Reduction Spike

ID: VM-147
Title: Route CSS JS Risk Reduction Spike
Status: done
Type: Frontend / Architecture Spike
Area: Home, Archscry, Maze, Static Public Routes
Priority: medium
Created: 2026-05-26
Updated: 2026-05-28

## Summary

Treat VM-147 as a route-by-route risk-reduction umbrella, not a repo-wide cleanup card. Execute one bounded route slice at a time, starting with Home, and keep each slice separate from shared-system modernization or product-logic churn.

## Source

- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/done/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/done/VM-088-home-auto-cycling-mana-lens-showcase.md`
- `assets/css/archscry.css`
- `assets/css/maze.css`
- `assets/css/strategium.css`
- `assets/css/apocrypha.css`
- `assets/css/legal.css`
- `assets/css/newindex2.css`
- `assets/js/index.js`
- `research/research-init.js`
- `assets/js/strategium.js`
- `assets/js/apocrypha.js`
- `assets/js/newindex2.js`
- `assets/js/graph.js`
- `docs/reference/manual-test-cases.md`

## Execution Model

- Split the work into suffixed route cards and implement only one slice at a time.
- Keep each slice limited to files actually loaded by the target route, plus route-specific QA/docs.
- Inventory shared dependencies such as `assets/js/graph.js`, `assets/js/vm-topbar.js`, or `assets/js/reduce-motion.js`, but do not refactor them unless a route-specific defect requires it.
- Treat Chart.js size and loading strategy as a separate concern from route-local CSS/JS maintainability cleanup.

## First Planned Slice

- `VM-147A - Home Route CSS JS Risk Reduction` completed on 2026-05-28 as the first execution slice because the canonical Home route is visually important but less product-logic-coupled than Maze or Archscry.
- `VM-147A` scope is `index.html`, `assets/css/newindex2.css`, `assets/js/newindex2.js`, and Home QA/docs.
- `assets/js/graph.js` is protected runtime behavior for the Home slice and should be inventory/QA only, not a refactor target.
- `assets/js/index.js` and `research/research-init.js` remain future Archscry/Maze slice scope and should not be pulled into `VM-147A`.
- A Home horizontal-overflow containment experiment was not retained in `VM-147A` because the only complete containment approach caused tablet visual drift above the existing visual-regression budget; track that as a future defect slice if it becomes product-prioritized.

## Completed Slices

- `VM-147A - Home Route CSS JS Risk Reduction` completed on 2026-05-28.
- `VM-147B - Archscry Route CSS JS Risk Reduction` completed on 2026-05-28 as a CSS-first, JS-comment-only slice. It preserved the live `archscry/index.html` asset stack, kept `assets/js/graph.js` / Chart.js protected, added route ownership comments to `assets/css/archscry.css` and `assets/js/index.js`, and added Archscry manual QA coverage.
- `VM-147C - Maze Route CSS JS Risk Reduction` completed on 2026-05-28 as a Maze-only conservative slice. It preserved the live `maze/index.html` asset stack, added route ownership section markers to `assets/css/maze.css`, added comment-only ownership mapping to `research/research-init.js`, found no byte-identical CSS duplicate blocks safe to remove, and added Maze manual QA coverage.
- `VM-147D - Static Public Route CSS JS Risk Review` completed on 2026-05-28 as a verification/docs-first closeout for Strategium, Apocrypha, Privacy, Terms, and the `/library/` compatibility path. It verified route stacks and ownership against the route ownership matrix, added one consolidated static-route manual QA section, and changed no runtime route files.

## Final Completed Slice

- `VM-147D - Static Public Route CSS JS Risk Review` is the final lightweight slice for Strategium, Apocrypha, Privacy, Terms, and the `/library/` compatibility path.
- `VM-147D` stayed verification/docs-first: it confirmed route-local CSS/JS ownership, connected the routes to prior stabilization cards, and added concise static-route manual QA coverage.
- No redesign, legal copy edits, shared-system refactors, Apocrypha public-framing changes, Strategium behavior changes, visual baseline updates, or `/library/` compatibility mechanism changes were pulled into `VM-147D`.
- The VM-147 route-by-route risk-reduction umbrella is closed. Any future cleanup should be opened as a separate scoped card rather than reopening this umbrella.

## Acceptance Criteria

- Work is split by route and starts with the highest-risk or most measurable pain point.
- Every implementation slice names matching lint, smoke, visual, and manual QA coverage before code changes start.
- Dynamic HTML render surfaces are reviewed for escaping/text assignment before any refactor on routes that generate dense markup.
- Shared CSS/JS systems are not changed unless a route-specific need proves the blast radius is worth it.
- Future Archscry or Maze risk-reduction work stays on separate cards because those routes have higher product-logic coupling.

## Non-Goals

- Do not create a bundler or framework migration.
- Do not normalize all CSS architecture across the repo.
- Do not change placement scoring, Scryfall parser behavior, precon ranking, or generated data.

## Files Likely Impacted

- Route-specific CSS and JS files only after a scoped implementation plan.
- Route-specific visual regression harnesses and manual QA docs for any touched route.
- `docs/architecture/route-ownership-matrix.md` only if route ownership or protected-boundary notes actually change.

## Risks / Uncertainties

- Archscry and Maze have high coupling between UI state, storage, rendering, and route-specific visuals.
- Visual harnesses mask animated/canvas atmosphere, so browser review remains necessary.
- Historical Home asset names remain live and should not be renamed as part of the first slice.

## Implementation Prompt

Create a route-by-route risk-reduction plan first, then implement only one bounded route improvement at a time with visual and behavioral verification.

## Human Review

Yes - this card can easily drift into broad modernization without tight route scope.
