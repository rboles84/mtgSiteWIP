# VM-618 — Move Guide to Topbar Utility and Correct Active Indicator Alignment

ID: VM-618
Status: Done — Owner Accepted
Type: Shared navigation presentation and interaction repair
Area: Shared public topbar / mobile navigation
Priority: Focused post-VM-614 follow-up

## Summary

Refine the accepted VM-614 global discoverability treatment so the desktop center pill contains only
primary Vox Mana destinations, while Guide remains globally discoverable as an orientation utility
immediately before Feedback. Preserve Guide exactly once in the mobile menu and correct the shared
main-nav geometry so active-page diamonds center beneath visible labels without disturbing separator
balance.

## Source

- Owner visual review after VM-614, dated 2026-08-31.
- Owner acceptance dated 2026-08-31, bound to exact candidate
  `c893cdc6c641902e4bdf095c088428f835af8ef5`.
- Accepted VM-613 Field Guide/onboarding contract, refined only for navigation presentation.
- Owner-Accepted VM-614 candidate `06196825df786f7ae10509596169fe6e3b841417`, which remains immutable.
- Current shared topbar owners: `assets/css/topbar.css`, `assets/js/shared/vm-topbar.js`, and canonical
  public route topbar markup.

## Locked Decisions

- Desktop center navigation is exactly Home, Archscry, The Implicit Maze, Strategium, Apocrypha.
- Guide remains literal **Guide** and appears immediately before dynamically inserted Feedback, then the
  menu trigger, in the desktop utility area.
- Guide remains available exactly once in the mobile menu after the five primary destinations and before
  existing utility controls.
- Guide uses `aria-current="page"` and a restrained utility-appropriate current treatment on `/guide/`.
- Main-nav active diamonds center beneath visible labels through shared symmetric geometry; separator
  diamonds remain centered between labels.
- VM-613/614 information architecture and the Guide page body remain unchanged.

## Acceptance Criteria

- [x] All 14 canonical public topbars remove Guide from `.vm-nav` and add one accessible Guide link to
      `.vm-utility` with the correct route-relative target and `data-vm-nav="guide"`.
- [x] Desktop utility order is Guide, Feedback, menu trigger after the existing feedback initializer runs.
- [x] Mobile navigation order is Home, Archscry, Maze, Strategium, Apocrypha, Guide, with Guide present
      exactly once and existing Reduce motion behavior intact.
- [x] `/guide/` marks utility Guide and its mobile clone current with `aria-current="page"`; no empty or
      duplicate center-nav marker remains.
- [x] Shared CSS centers every primary active diamond beneath its actual label while keeping separator
      spacing visually balanced, with no per-page or per-label offsets.
- [x] Desktop, mobile, keyboard, focus, Escape, reduced motion, and 200% zoom remain functional without
      horizontal overflow.
- [x] Focused static and rendered regressions catch Guide returning to desktop primary nav, disappearing
      from mobile, or appearing there more than once.
- [x] Guide body, product semantics, Feedback modal behavior, `/library/` forwarding, and VM-615–617 remain
      unchanged.
- [x] Stop at Owner Review without self-acceptance, commit, push, PR, or merge.

## Files Likely Impacted

- `assets/css/topbar.css`
- `assets/js/shared/vm-topbar.js`
- canonical public route `index.html` topbar instances
- focused frontend/static/browser checks
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/architecture/route-ownership-matrix.md`
- Kanban and handoff records

## Risks

- Shared topbar markup spans route depths and can drift on Strategium subroutes or legal/compatibility
  routes.
- Moving Guide outside `.vm-nav` can remove it from mobile because current JavaScript clones only
  `.vm-nav-link` elements.
- Changing link spacing can correct the active marker while displacing inter-link separators.
- Utility ordering depends on VM-423 dynamically inserting Feedback before the menu trigger.
- Wider utility chrome can expose desktop/intermediate or 200% zoom overflow.

## RobDev Contract

- **Outcome:** primary destinations and orientation utilities read as distinct without reducing Guide
  discoverability.
- **Owning layer/producer:** authored route topbar HTML; shared `vm-topbar.js` mobile projection and active
  state; shared `topbar.css` presentation geometry.
- **Existing machinery:** retain the current header, menu, feedback insertion, focus/Escape, reduce-motion,
  route-relative link, and `data-vm-nav` mechanisms.
- **Changed behavior:** Guide placement/projection/current styling and shared primary-nav geometry only.
- **Protected behavior:** Guide content, product routes/semantics, Feedback modal, Placement, dossiers,
  Maze, Strategium, Apocrypha, persistence, telemetry, account state, and `/library/` forwarding.
- **Smallest complete implementation:** one shared utility-link pattern, one mobile clone seam, symmetric
  separator geometry, and narrow regression evidence.
- **Non-goals/stop:** no topbar redesign, new framework, typography/hover project, later Guide routes,
  VM-615–617 execution, commit, push, PR, merge, or owner self-acceptance.

## RobQA Classification

- **Tier:** QA-3 navigation/accessibility projection with QA-1 precision styling.
- **Changed risk:** desktop hierarchy, mobile presence/order, current-page state, focus/menu lifecycle,
  separator balance, active-marker alignment, and responsive containment.
- **CPU-heavy validation:** NOT REQUIRED; placement, semantic, journey, mutation, and exhaustive identity
  behavior are untouched.
- **Owner judgment:** final optical balance of the utility Guide treatment and main-nav marker/separator
  alignment on the bounded witnesses.

## Implementation Prompt

Implement only the locked shared-topbar refinement. Reuse current machinery, enumerate every canonical
consumer, add the narrowest systemic regressions, collect a three-image witness set, and return at Owner
Review with exact changed files, tests, route/order/current-state evidence, and branch/worktree state.

## Notes

- VM-615, VM-616, and VM-617 remain reserved by the accepted onboarding sequence and were not started.
- This card refines only where Guide is presented in shared navigation; Guide remains the same globally
  discoverable onboarding/orientation surface.

## RobQA Result — PASS / Owner Accepted — 2026-08-31

**PASS — OWNER ACCEPTED.** Focused static, smoke, metadata, copy-boundary, Guide-browser, and new
shared-topbar browser checks pass. The browser witness validates desktop utility order/current state,
active-marker and separator geometry, keyboard focus, mobile order/single Guide projection, Escape/focus
return, reduced motion, and the 200%-zoom equivalent layout. A real-browser cache finding was repaired by
versioning the shared topbar JavaScript URL; the static validator now prevents that cache-key regression.

- `npm.cmd run lint:html` — PASS
- `npm.cmd run lint:js` — PASS
- `npm.cmd run test:frontend-smoke` — PASS
- `npm.cmd run test:route-metadata` — PASS
- `npm.cmd run test:copy-boundaries` — PASS
- `npm.cmd run test:guide-browser` — PASS
- `npm.cmd run test:topbar-browser` — PASS
- `git diff --check` — PASS
- CPU-heavy semantic, placement, journey, mutation, recovery, and identity suites — NOT REQUIRED
- Owner accepted the exact rendered candidate and all three bounded visual witnesses.

## Owner Acceptance

The Owner accepts the desktop five-destination primary navigation, Guide · Feedback · menu utility
order, restrained Guide current-page treatment, shared active-marker and separator geometry, and the
single Guide mobile projection exactly as committed at
`c893cdc6c641902e4bdf095c088428f835af8ef5`. The accepted runtime, tests, navigation contract, and route
ownership documentation are immutable during closeout. VM-615, VM-616, and VM-617 remain unstarted.
