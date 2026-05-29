# VM-147D - Static Public Route CSS JS Risk Review

ID: VM-147D
Title: Static Public Route CSS JS Risk Review
Status: done
Type: Frontend / Risk Reduction
Area: Strategium, Apocrypha, Privacy, Terms
Priority: medium
Created: 2026-05-28
Completed: 2026-05-28

## Summary

Run one final lightweight VM-147 slice for the static public routes after `VM-147A`, `VM-147B`, and `VM-147C`. This is a verification/docs-first review for `/strategium/`, `/apocrypha/`, `/privacy/`, `/terms/`, and the `/library/` compatibility path, not a redesign or route modernization pass.

The goal is to confirm route-local CSS/JS ownership, connect these routes to their prior stabilization cards, add any missing manual QA coverage, and add comments only where they genuinely clarify ownership or protected contracts.

## Pre-Flight Anchors

- `VM-128` extracted Strategium into route-local CSS/JS.
- `VM-133` and `VM-142` stabilized Strategium glass/readability with Maze-adjacent visual decisions.
- `VM-011`, `VM-134`, `VM-144`, and `VM-146` covered Apocrypha source/public framing, hero treatment, stale asset cleanup, and dependency review.
- `VM-145`, `VM-152`, `VM-153`, and `VM-100` covered Privacy/Terms legal CSS extraction, visual alignment, glass opacity, and archive document refresh.
- `VM-147A`, `VM-147B`, and `VM-147C` completed Home, Archscry, and Maze risk-reduction slices.

## Current Route Ownership

- Strategium: `strategium/index.html`, `assets/css/strategium.css`, `assets/js/strategium.js`, plus shared `reduce-motion.js` and `vm-topbar.js`.
- Apocrypha: `apocrypha/index.html`, `assets/css/apocrypha.css?v=20260521b`, `assets/js/apocrypha.js?v=20260521b`, plus shared `reduce-motion.js` and `vm-topbar.js`.
- Privacy: `privacy/index.html`, `assets/css/legal.css`, plus shared `reduce-motion.js` and `vm-topbar.js`.
- Terms: `terms/index.html`, `assets/css/legal.css`, plus shared `reduce-motion.js` and `vm-topbar.js`.
- Library: `library/index.html` as the current Apocrypha compatibility shell using meta refresh, inline JavaScript redirect, noscript fallback, and shared shell styling.

## In Scope

- Verify each route's asset stack against `docs/architecture/route-ownership-matrix.md`.
- Confirm route-local CSS/JS ownership and protected boundaries.
- Review existing manual QA coverage and add a concise `VM-147D Static public route manual QA` section if coverage is missing or scattered.
- Add comments only if they clarify route-local ownership or protected contracts without adding noise.
- Update `VM-147` umbrella notes after implementation so the umbrella can close cleanly unless a separate follow-up is proven.

## Out of Scope

- No redesign, visual retheme, animation retune, or layout modernization.
- No shared CSS/JS refactor.
- No legal copy edits or policy wording changes.
- No Strategium tab, checklist, archetype search, or static-data behavior changes.
- No Apocrypha content, public-only framing, versioned asset URL, or `/library/` compatibility mechanism changes.
- No Google Fonts removal or dependency replacement work; use `VM-146` for that trail.
- No visual baseline refresh unless implementation actually changes route CSS or behavior.

## Protected Contracts

- Preserve Strategium tab IDs, `data-action` hooks, checklist state, local static data semantics, and archetype search behavior.
- Preserve Apocrypha public reference framing, external source links, versioned CSS/JS query strings, and Library compatibility behavior exactly as implemented.
- Preserve Privacy/Terms legal copy, service limitation wording, gateway treatment, `legal.css` last-load order, and topbar route targets.
- Preserve shared `tokens.css`, `fonts.css`, `layout.css`, `topbar.css`, `atmosphere.css`, `components.css`, `reduce-motion.js`, and `vm-topbar.js` behavior unless a route-specific breakage is proven and separately scoped.

## Completion Notes

- Verified static route asset stacks against `docs/architecture/route-ownership-matrix.md`.
- Added one consolidated `VM-147D Static public route manual QA` section to `docs/reference/manual-test-cases.md`.
- Confirmed no runtime ownership/protected-boundary comment was needed.
- Changed no route HTML, route CSS/JS, shared CSS/JS, legal copy, asset URLs, visual baselines, route behavior, or `/library/` compatibility mechanism.
- Closed the `VM-147` umbrella after this final slice.

## Closeout Diff Groups

- Runtime files changed: none.
- QA / verification files changed: `docs/reference/manual-test-cases.md`.
- Handoff / Kanban files changed: `docs/kanban/done/VM-147D-static-public-route-css-js-risk-review.md`, `docs/kanban/done/VM-147-large-route-css-js-risk-reduction.md`, `docs/kanban/board.md`, `docs/handoffs/HANDOFF_INDEX.md`, and the execution handoff.
- Files intentionally not changed: route HTML, route CSS/JS, shared CSS/JS, legal copy, asset URLs, visual baselines, route behavior, and the `/library/` compatibility mechanism.

## Test Plan

- Use `npm.cmd` on Windows. If `npm.cmd` is unavailable in the execution environment, use the equivalent `npm run ...` commands and report the substitution.
- Run `npm.cmd run lint:html`.
- Run `npm.cmd run lint:js`.
- Run `npm.cmd run test:frontend-smoke`.
- Run `npm.cmd run test:visual:strategium`.
- Run `npm.cmd run test:visual:apocrypha`.
- Run `git diff --check`.
- Manual QA should cover `/strategium/`, `/apocrypha/`, `/privacy/`, `/terms/`, `/library/` alias behavior, topbar links, reduced motion, mobile/tablet/desktop overflow, legal page readability, and confirmation that no private-source framing leaks into public Apocrypha copy.

## Acceptance Criteria

- Route stacks are verified and documented without changing route behavior.
- Any added comments are ownership/protected-boundary comments only and are clearly worth their noise cost.
- Existing route-local CSS/JS ownership is confirmed against prior cards and the route ownership matrix.
- Missing manual QA coverage is added, or existing coverage is referenced as sufficient.
- No shared-system edits, legal-copy edits, route redesign, or public contract changes occur.
- `VM-147` closed after this card completed without opening a separate follow-up.

## Human Review

Yes - visual/manual review is useful, but the implementation should remain lightweight. The main risk is accidental scope creep into design polish or shared-system cleanup.
