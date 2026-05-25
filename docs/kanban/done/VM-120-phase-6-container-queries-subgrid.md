# VM-120 - Phase 6 Container Queries + Subgrid

ID: VM-120
Title: Phase 6 Container Queries + Subgrid
Status: done
Type: Frontend / CSS Architecture / Responsive Layout
Area: Homepage, Strategium, Archscry, Apocrypha
Priority: medium
Created: 2026-05-24
Completed: 2026-05-24

## Summary

Modernize live card and grid responsiveness by moving card-internal breakpoint behavior to container queries and using subgrid only where row alignment meaningfully improves multi-card reading rhythm.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1405-codex-vm112b-strategium-rename.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`
- `docs/kanban/board.md`
- `docs/reference/manual-test-cases.md`
- `assets/css/home.css`
- `assets/css/components.css`
- `assets/css/archscry.css`
- `assets/css/apocrypha.css`
- `archscry/index.html`
- `strategium/index.html`
- `index.html`
- `apocrypha/index.html`

## Pre-Implementation State

- Shared CSS architecture is layered, but large inline style blocks still own live layout behavior in `archscry/index.html` and `strategium/index.html`.
- Homepage doorway cards still switch internal layout from split to stacked via viewport media queries in `assets/css/home.css`.
- Strategium card groups still rely on viewport media queries for `vm-start-row` and `vm-philosophy-grid`.
- Archscry dossier grids still split responsibility between `assets/css/archscry.css` and the page-local inline block in `archscry/index.html`.
- Subgrid is available in the target browser baseline, so no legacy fallback layer is required for this pass.

## Implementation Summary

- Added `container-type: inline-size` to the live homepage doorway cards so the `Archscry` and `Apocrypha` internals now switch between split and stacked states from card width rather than viewport width.
- Replaced the active homepage side-card stacking rules in `assets/css/home.css` with a card-level `@container` block while leaving page-shell breakpoints intact.
- Added container-aware behavior to the Strategium `Start Here` rows and moved the `Color Philosophy Bridge` collapse behavior off the viewport media query path.
- Applied `grid-template-rows: subgrid` to the multi-column Strategium philosophy bridge cards only when their container stays wide enough for the aligned row treatment to be useful.
- Added Archscry container contexts in `assets/css/archscry.css` and added the matching `@container` response rules in the page-local inline block for selectors that still live there, specifically `lands-tiers`, `commander-preview-grid`, and `flavor-echo-card`.
- Updated `docs/reference/manual-test-cases.md` with a dedicated container-query and subgrid responsive pass.

## Acceptance Criteria

- Homepage `Archscry` and `Apocrypha` doorway cards switch between split and stacked internals based on card width, not viewport width.
- Strategium card groups keep their current visual language, and the philosophy bridge cards align symbol, title, and body rhythm across a multi-column row while still collapsing cleanly in narrow containers.
- Archscry card groups such as lands tiers, commander previews, and flavor-echo cards respond to wrapper width without visual regressions in single-column or single-card states.
- No route copy, route wiring, JS behavior, or page-level information architecture changes ship as part of this card.

## Non-Goals

- Do not rename routes, change route targets, or alter navigation behavior.
- Do not reopen broader CSS extraction work for the large inline style blocks in `archscry/index.html` or `strategium/index.html`.
- Do not redesign the homepage, Strategium, or Archscry visual language.
- Do not touch `newIndex2_Old.html` or `library/index.html`.

## Files Changed

- `assets/css/home.css`
- `assets/css/archscry.css`
- `strategium/index.html`
- `archscry/index.html`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-120-phase-6-container-queries-subgrid.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1936-codex-vm120-container-queries-subgrid.md`

## Notes

- `assets/css/apocrypha.css` was part of the planning scope review and the QA pass, but this implementation did not require any code changes there because the responsive behavior change for the live `Apocrypha` doorway card is owned by `assets/css/home.css`.
- Browser-based local visual QA was attempted through the in-app Browser workflow, but both `http://127.0.0.1:4173/...` and `file:///C:/dev/mtgSiteWIP/...` targets were blocked by Browser policy in this session, so final verification relies on automated checks plus static selector review.

## Verification

- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run lint:html`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser QA attempt via in-app Browser workflow
  - Blocked by Browser URL policy for both localhost and `file://` targets in this session.

## Human Review

Yes - this changes responsive behavior across live public cards and should get a browser visual pass before closeout.
