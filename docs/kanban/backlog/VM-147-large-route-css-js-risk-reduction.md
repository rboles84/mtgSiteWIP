# VM-147 - Large Route CSS JS Risk Reduction

ID: VM-147
Title: Large Route CSS JS Risk Reduction
Status: backlog
Type: Frontend / Architecture
Area: Archscry, Maze, newIndex2
Priority: medium
Created: 2026-05-26

## Summary

Plan and execute route-by-route risk reduction for the largest CSS and JS surfaces without turning the audit into a shared-system rewrite.

## Source

- `docs/architecture/route-ownership-matrix.md`
- `assets/css/archscry.css`
- `assets/css/maze.css`
- `assets/css/newindex2.css`
- `assets/js/index.js`
- `research/research-init.js`
- `assets/js/newindex2.js`
- `assets/js/graph.js`

## Acceptance Criteria

- Work is split by route and starts with the highest-risk or most measurable pain point.
- Every touched route has matching lint, smoke, and visual/manual QA coverage identified before implementation.
- Dynamic HTML render surfaces are reviewed for escaping/text assignment before any refactor.
- Shared CSS/JS systems are not changed unless a route-specific need proves the blast radius is worth it.
- Chart.js size and loading behavior are evaluated as a separate concern from route CSS cleanup.

## Non-Goals

- Do not create a bundler or framework migration.
- Do not normalize all CSS architecture across the repo.
- Do not change placement scoring, Scryfall parser behavior, precon ranking, or generated data.

## Files Likely Impacted

- Route-specific CSS and JS files only after a scoped implementation plan.
- Visual regression harnesses for any touched route.
- `docs/architecture/route-ownership-matrix.md` after ownership changes.

## Risks / Uncertainties

- Archscry and Maze have high coupling between UI state, storage, rendering, and route-specific visuals.
- Visual harnesses mask animated/canvas atmosphere, so browser review remains necessary.

## Implementation Prompt

Create a route-by-route risk-reduction plan first, then implement only one bounded route improvement at a time with visual and behavioral verification.

## Human Review

Yes - this card can easily drift into broad modernization without tight route scope.
