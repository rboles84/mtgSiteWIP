# VM-116 - CSS Architecture Phase 2: Layout Layer + Animation Consolidation

ID: VM-116
Title: CSS Architecture Phase 2: Layout Layer + Animation Consolidation
Status: done
Type: Frontend / Shared CSS / Architecture
Area: Shared Visual System
Priority: medium
Created: 2026-05-24
Completed: 2026-05-24

## Summary

Implement the approved Phase 2 shared CSS pass: extend the existing cascade layer stack, consolidate live keyframes into `assets/css/animations.css`, add `assets/css/layout.css` for safe shared structural rules, and treat `components.css` layering as the final conditional step.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1453-codex-vm114-p0-shared-css-foundation-pass.md`
- `docs/handoffs/2026-05-24-1537-codex-vm115-shared-token-follow-up.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-114-p0-shared-css-foundation-pass.md`
- `docs/kanban/done/VM-115-shared-token-follow-up-oklch-fluid-type.md`
- Approved Phase 2 implementation plan in this thread

## Scope

- Extend the current token entrypoint to include `layout` in the shared layer order.
- Expand `assets/css/animations.css` into the canonical live keyframe file for shared, home, and atmosphere motion definitions.
- Add `assets/css/layout.css` for shared topbar variables, shared page-shell structure, and safe outer-shell home width constraints.
- Roll `layout.css` out only to live public routes that already load `topbar.css`, explicitly excluding `newIndex2_Old.html`.
- Defer any risky precedence fixups; if `components.css` layering regresses inline-heavy routes, keep the earlier Phase 2 work and leave the layering step for follow-up.

## Non-Goals

- Do not externalize or rewrite the large inline `<style>` blocks in `archscry/index.html`, `newIndex2.html`, or `strategium/index.html`.
- Do not move `.vm-topbar` selector rules or Archscry structural selectors such as `.section`, `.landing-wrap`, `.quick-shell`, `.interview-shell`, or `.result-context-bar` into `layout.css`.
- Do not touch `newIndex2_Old.html`, JS runtime files, or route behavior.
- Do not force specificity workarounds if `components.css` layering regresses a live route.

## Acceptance Criteria

- `assets/css/tokens.css` declares `reset, tokens, base, layout, motion, components, pages, overrides`.
- Live shared/home/atmosphere keyframes live in `assets/css/animations.css` while their usage remains unchanged.
- `assets/css/layout.css` is linked on the live public routes that load `topbar.css`, excluding `newIndex2_Old.html`.
- `components.css` layering happens only after the earlier steps are verified clean, and is backed out or deferred if it changes live rendering.
- No HTML or JS behavior changes beyond the stylesheet link additions.

## Outcome

- Extended the shared layer stack in `assets/css/tokens.css` and imported `assets/css/animations.css` as the `motion` layer.
- Consolidated the live shared/home/atmosphere keyframes into `assets/css/animations.css` and removed the duplicate definitions from `assets/css/home.css` and `assets/css/atmosphere.css`.
- Added `assets/css/layout.css` for topbar layout variables, shared page-shell structure, and the safe centered width constraints for the base `.vm-home` shell.
- Linked `layout.css` on `index.html`, `archscry/index.html`, `apocrypha/index.html`, `privacy/index.html`, `terms/index.html`, `strategium/index.html`, and `newIndex2.html`.
- Kept `newIndex2_Old.html` untouched even though it also loads `topbar.css`.
- Removed the extracted `vm-page-shell` and `vm-page-content` rules from `assets/css/components.css`, then wrapped the remaining shared component file in `@layer components` after the earlier verification passed.
- Updated the Project Atlas shared visual system inventory to include `layout.css` and to describe `animations.css` as the canonical live keyframe source.

## Verification

- `rg -n "@keyframes" assets/css`
- `rg -n "vm-bg-burns|vm-nebula-drift|vm-mandala-rotate|vm-card-bob|vm-orrery-spin|vm-home-ripple" assets/css`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run lint:html`
  - Still fails on the pre-existing legal-page assertion: `legal pages should keep their Maze navigation links`
- Static selector confirmation that `vm-page-shell` and `vm-page-content` now live only in `assets/css/layout.css`
- Browser QA was attempted, but no callable Browser app tool or Playwright runtime was available in this session

## Handoff

- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
