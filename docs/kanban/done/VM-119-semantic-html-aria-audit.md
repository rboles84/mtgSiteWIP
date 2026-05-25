# VM-119 - Semantic HTML + ARIA Audit

ID: VM-119
Title: Semantic HTML + ARIA Audit
Status: done
Type: Frontend / Accessibility / Semantics
Area: Shared Topbar, Public Routes, Maze Modal
Priority: medium
Created: 2026-05-24
Completed: 2026-05-24

## Summary

Audit and repair semantic HTML and ARIA across the live Vox Mana public site, with special focus on shared topbar navigation semantics, Maze modal background inerting, and landmark completeness on the core public routes.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-2146-codex-vm106-frontend-hardening-phase-1-security-accessibility.md`
- `docs/handoffs/2026-05-24-1333-codex-vm112a-floating-topbar-redesign.md`
- `docs/handoffs/2026-05-24-1405-codex-vm112b-strategium-rename.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-106-frontend-hardening-phase-1-security-accessibility.md`
- `docs/kanban/done/VM-112A-floating-topbar-redesign.md`
- `docs/kanban/done/VM-112B-strategium-rename.md`
- `docs/kanban/done/VM-116-css-architecture-phase-2-layout-layer-animation-consolidation.md`
- `docs/reference/manual-test-cases.md`
- `newIndex2.html`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `strategium/index.html`
- `assets/js/vm-topbar.js`
- `research/research-init.js`
- `assets/css/topbar.css`
- `assets/css/components.css`

## Pre-Implementation State

- `archscry/index.html` is missing both `<main>` and `<footer>`.
- `maze/index.html` uses a custom modal wired by `research/research-init.js` and currently has no `inert` handling.
- Shared public topbar nav still uses `aria-label="Primary"`.
- The shared mobile navigation panel uses `role="menu"` and `role="menuitem"` for site navigation.
- `assets/js/vm-topbar.js` already manages `aria-expanded`.
- No live public route currently uses `section aria-labelledby`.

## Implementation Summary

- Added or normalized one `header`, one `main`, and one `footer` landmark across the in-scope live public routes.
- Added `aria-labelledby` section naming to major content sections on the touched routes, using existing visible headings except where a visually hidden heading was needed for non-copy-changing labels.
- Changed shared topbar navigation from `aria-label="Primary"` to `aria-label="Main Navigation"`.
- Removed application-menu roles from the shared mobile navigation panel and mirrored mobile links.
- Added Maze modal background inert toggling in `research/research-init.js` while preserving the existing custom modal, focus trap, Escape close, outside-click close, and focus return behavior.
- Added visible `:focus-visible` coverage for touched shared controls in the current gold/teal focus language.
- Updated frontend HTML and smoke validators to enforce the semantic contract.
- Updated manual QA docs with semantic/ARIA accessibility-tree inspection steps.

## Scope

- Audit and repair these live public routes:
  - `newIndex2.html`
  - `index.html`
  - `archscry/index.html`
  - `maze/index.html`
  - `apocrypha/index.html`
  - `privacy/index.html`
  - `terms/index.html`
  - `strategium/index.html`
- Change shared topbar nav landmarks to `<nav aria-label="Main Navigation">`.
- Remove application-menu roles from the shared mobile navigation panel and mirrored links so the mobile surface uses plain site-navigation semantics.
- Add missing landmarks where absent, especially `main` and `footer` on Archscry and a footer landmark on Maze if a real page-footer region is introduced.
- Add heading IDs and `aria-labelledby` to major content sections using existing visible headings wherever possible.
- Add explicit inert toggling to the Maze modal open and close flow without migrating the page to native `<dialog>`.
- Audit touched focus states so no touched interactive control suppresses outlines without a visible alternative.
- Update the local HTML/smoke validators and manual QA checklist to reflect the new semantic contract.

## Acceptance Criteria

- Every live public route has one top-level `header`, one `main`, and one `footer`, unless the route is an intentional redirect shell excluded from scope.
- Major content sections on touched routes are named through visible headings plus `aria-labelledby`.
- Shared topbar nav uses `<nav aria-label="Main Navigation">` everywhere.
- Shared mobile navigation no longer uses application-menu roles and instead uses plain site-navigation semantics consistently across desktop and mirrored mobile links.
- The Maze modal makes background content inert while open and restores normal interactivity on close without regressing VM-106 focus trap or focus return.
- Touched controls keep visible `:focus-visible` treatment in the existing gold/teal system, and no touched control suppresses outlines without a visible replacement.
- Browser accessibility-tree inspection passes on `newIndex2.html`, `archscry/index.html`, and `maze/index.html`.

## Non-Goals

- Do not redesign layouts, typography, route copy, or the shared shell visual direction.
- Do not migrate the Maze modal to native `<dialog>` in this card.
- Do not change route names, route targets, placement logic, auth/data behavior, or generated artifacts.
- Do not reopen the broader CSS architecture work from `VM-116`.
- Do not touch `newIndex2_Old.html` or the `library/index.html` redirect shell.

## Dependencies / Related Work

- `VM-106` for Maze modal accessibility and focus-return behavior.
- `VM-112A` and `VM-112B` for the current shared topbar baseline.
- `VM-116` for the current shared layout and CSS constraints.
- `docs/reference/manual-test-cases.md` for the existing shared-topbar and local-route smoke expectations.

## Files Likely Impacted

- `newIndex2.html`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `strategium/index.html`
- `assets/js/vm-topbar.js`
- `research/research-init.js`
- `assets/css/topbar.css`
- `assets/css/components.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `docs/reference/manual-test-cases.md`

## Risks / Uncertainties

- Landmark changes on inline-heavy pages can accidentally shift structure or styling if wrappers are introduced too aggressively.
- Maze inert handling must preserve the existing VM-106 focus trap, Escape close, outside-click close, and focus return behavior.
- Shared mobile-nav semantic changes should not regress the current route mirroring or reduce-motion control behavior.
- Existing local validators may still encode stale shared-shell assumptions and should be updated as part of this pass instead of treated as authoritative.

## Implementation Prompt

Normalize the live public site to a stronger semantic and assistive-technology baseline without redesigning it. Repair landmarks, name major sections, convert the shared mobile panel from application-menu semantics to plain navigation semantics, add manual inert handling to the Maze modal path, and update the repo's validators and QA checklist so the new contract is enforced.

## Delivery / Removal Criteria

Delivered on 2026-05-24 with the following criteria satisfied:

- The in-scope public routes expose the intended landmarks and section naming structure.
- The shared topbar uses `Main Navigation` semantics on desktop and mobile.
- The Maze modal inert path is implemented and verified alongside existing keyboard behavior.
- Local validation and manual QA docs reflect the new semantic contract.

## Verification

- `node --check assets/js/vm-topbar.js`
- `node --check research/research-init.js`
- `node --check scripts/validate-frontend-html.mjs`
- `node --check scripts/frontend-smoke.mjs`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser accessibility-tree inspection via local static server and headless Edge on `newIndex2.html`, `archscry/index.html`, and `maze/index.html`.
- Maze modal runtime QA confirmed modal visibility, focus inside modal, inert on background content while open, inert removal on Escape close, and focus return to opener.

## Human Review

Yes - this card changes shared public semantics and accessibility behavior across multiple live routes and should get a browser accessibility-tree review before closeout.

## Notes

- NVDA remains optional follow-up; browser accessibility-tree inspection is the required QA bar for this card.
- If a section has no visible heading today, prefer a visually hidden heading over visible copy changes unless product direction explicitly approves a design adjustment.
