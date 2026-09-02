# VM-619 — Opt-In Field Guide Guided-Reading Red Team

**Status:** Discovery / Owner decision required; no implementation authority
**Researched:** 2026-09-01
**Recommendation:** **USE DRIVER.JS**, but only through one deliberately small Vox Mana adapter and only after Owner acceptance of this contract. This is not implementation approval.

## Decision

The static Maze Guide already contains the accepted truth. Guided reading only adds a player-requested short orientation for someone who cannot yet tell which large section answers their immediate question. It must never become a first-visit product tour, prerequisite, or substitute for the static Guide.

Driver.js 1.8.0 is materially cheaper and less risky than Vox Mana owning spotlight geometry, viewport collision, scrolling, resize handling, keyboard controls, and teardown. It is not a complete accessibility solution: the observed dialog has no `aria-modal`, and its focus cycle deliberately includes the highlighted section. Adoption therefore needs explicit focus, interaction, reduced-motion, missing-target, URL, and manual screen-reader compensations. If the Owner does not accept those conditions, do not build guided reading.

## Current-state recon

- `main` / `origin/main` were synchronized at `c36570f`; VM-616 is Done — Owner Accepted and `73118b6` plus `0d684b1` are ancestors.
- The accepted Field Guide contract makes Guide optional and prohibits mandatory modal onboarding, coach-mark chains, tours, completion tracking, and prerequisite Guide state. VM-619 can seek only a player-requested exception inside the optional Guide.
- `/guide/maze/` is a static route with `#maze-guide-main`, substantive targets `#translation`, `#context`, `#recovery`, and IV Useful results. Its only current route JS is the static mode specimen switcher.
- The frontend is direct local static assets—no bundler and no relevant CSP surface. The route already loads `assets/js/shared/reduce-motion.js`, which sets `data-reduce-motion` and emits `vm:reduce-motion-change`.
- No guided-reading storage key, account state, telemetry, query/Placement/Reading Finds change, VM-620, VM-617, Guide markup, or Beacon change is authorized.

## Product and V1 content contract

`Guide Beacon → explicit “Walk me through this search” click → /guide/maze/?guided=maze-search → four-step orientation → ordinary static Guide`

Direct `/guide/maze/` is always static. Nothing may auto-launch from first visit, ordinary Guide navigation, invisible state, or completion history. Every deliberate request may replay. V1 has no local/session storage, account state, completion percentage, congratulations, telemetry, nagging, nested tours, side branches, hints, or `/guide/reading/` activation.

Exactly four short targets: (I) translation/diagnostics, (II) reading and Commander-color context, (III) translation trouble versus valid zero, and (IV) inspect/refine/Reading Finds/Scryfall. Each has a short heading and one or two concise sentences; popovers point to accepted content rather than repeating it.

## Driver.js research

Current official/npm evidence identifies **driver.js 1.8.0**, latest, MIT, and zero runtime dependencies. The exact official tarball contained 18 files, the MIT license, `driver.js.iife.js` (25,483 bytes), ESM/CJS builds, and `driver.css` (3,042 bytes); the tarball was 29.4 kB. Estimate 8–10 kB gzip JS+CSS; a candidate must measure actual server-compressed route impact.

- [Installation](https://driverjs.com/docs/installation): package/import/CSS/IIFE forms.
- [Configuration](https://driverjs.com/docs/configuration): keyboard, close, scroll, active-interaction, missing-target, callback, and motion controls.
- [API](https://driverjs.com/docs/api): independent instances and explicit `destroy()` lifecycle.
- [Theming](https://driverjs.com/docs/theming): class/variable hooks for complete native styling; Vox Mana must not ship defaults.
- [Official npm metadata](https://www.npmjs.com/package/driver.js?activeTab=versions): 1.8.0 latest, MIT; the included license must remain in a vendored copy. MIT permits commercial use, modification, and distribution.
- [Official open issues](https://github.com/nilbuild/driver.js/issues): keyboard-button correlation #589, scrollable-div #577, mobile popover overlay #525, runtime `aria-controls` #504, and multi-instance destroy #513 are relevant risks.
- [Official releases](https://github.com/nilbuild/driver.js/releases): recent 1.6/1.7 releases include listener-cleanup, clipping, popover, and missing-target improvements; maintenance is active but drift is real.

If selected, vendor only:

```
assets/vendor/driverjs/1.8.0/driver.js.iife.js
assets/vendor/driverjs/1.8.0/driver.css
assets/vendor/driverjs/1.8.0/LICENSE
```

Load those exact local files only after a validated guided URL and target preflight. The inspected package makes no network request and has no telemetry/cookies/fonts/eval; it creates DOM, inline styles, SVG overlay markup, and temporary listeners. A later CSP must allow that existing style behavior or adoption stops. Upgrade from an official reviewed tarball only: verify version/hash/license/package contents/release notes/issues, adapter tests, and rendered keyboard/mobile/screen-reader checks; never use `@latest`.

## Disposable 1.8.0 evaluation

An OS-temp four-section page with sticky topbar loaded the exact local IIFE/CSS at 390×844, 768×900, and 1440×900. It was then removed with its local-only server and package; no artifact, dependency, package lock, vendor file, production page, or screenshot remains.

| Check | Result | Required response |
| --- | --- | --- |
| Start / native controls | Initial focus moved to Close; Close, Previous, Next/Done are native buttons. | Retain launch element and set explicit focus on every exit. |
| Tab / Shift+Tab | Both directions cycled Close, enabled navigation, and focusables inside highlighted content. | Not a strict modal trap; do not leave Guide links actionable during a step. |
| Enter / Space / Escape / arrows | Enter advanced; Escape destroyed; arrows move steps. The automation surface did not dispatch Space to Next reliably, so Space remains an explicit candidate-stage manual assertion. | Escape must always close; do not treat expected native semantics as evidence. |
| Semantics | `role=dialog`, labelled/described-by links, named Close; no `aria-modal` or inert background. | Do not repeat an accessibility marketing claim; manually test NVDA+Firefox and VoiceOver+Safari. |
| Cleanup | Source adds temporary target ARIA/class state and removes it on destroy. | Assert cleanup, particularly issue #504. |
| Active interaction | `disableActiveInteraction` blocked pointer clicks. | Recommended orientation-only policy prevents accidental Guide navigation. |
| Missing targets | `skipMissingElement` skipped first/middle absence; absent final left prior target with Done. | Preflight; do not start with fewer than two targets; never strand on dummy content. |
| Mobile / desktop / resize | No horizontal overflow in model. At 390 tall Recovery pinned near viewport bottom; resizing recomputed stage/popover. | Test actual sticky topbar and real copy at all three widths; keep copy short. |
| Scroll | Scroll/resize listeners repositioned; `smoothScroll` is configurable. | Reduced motion sets `animate:false` and `smoothScroll:false`; test nested scrollers because #577 is open. |

No screen reader was available; this is a remaining manual requirement, not a pass.

## Comparison

| Dimension | Static-only | Narrow internal controller | Driver.js + narrow adapter |
| --- | --- | --- | --- |
| Product value | ACCEPTABLE — complete content | GOOD — selected orientation | GOOD — selected orientation |
| Complexity / maintenance | GOOD | BLOCKER — own geometry/lifecycle forever | ACCEPTABLE — pin and review vendor |
| Accessibility / focus | GOOD | CONCERN — build everything | CONCERN — compensate and manual SR test |
| Keyboard / Escape | GOOD | CONCERN | ACCEPTABLE — observed; adapter owns exit |
| Mobile / sticky / scroll | GOOD | CONCERN | ACCEPTABLE — observed; known risk requires QA |
| Missing targets | GOOD | CONCERN | GOOD — skip plus preflight |
| Theming | GOOD | GOOD | ACCEPTABLE — complete override needed |
| Bundle / privacy / CSP | GOOD | GOOD initially | ACCEPTABLE — local lazy ~28.5 kB raw; inline-style review |
| Local vendoring / repo fit | GOOD | CONCERN — new engine | GOOD — static vanilla IIFE/CSS |
| Future reading reuse / fallback | ACCEPTABLE | ACCEPTABLE | GOOD — route config only; static fallback |

## Recommended URL and interaction contract

- Start only after DOM readiness when `guided=maze-search` is exact and targets preflight. Unknown value: `history.replaceState` removes it and does nothing else.
- Use `allowClose:true`, keyboard enabled, `allowScroll:true`, `disableActiveInteraction:true`, `skipMissingElement:true`, `showProgress:false`, no backdrop-as-next. Previous/Next/Close always visible; final Next says Done.
- Either OS reduced motion or existing `data-reduce-motion=true` means `animate:false` and `smoothScroll:false`; subscribe to `vm:reduce-motion-change` and refresh/end cleanly if it changes.
- Skip/Close: destroy, replace away `guided`, remain at current region, and focus its heading or `#maze-guide-main`. Done: destroy, replace away `guided`, scroll non-animated when needed to Guide top, focus main/H1. No warning/modal/congratulations.
- Back/Forward while active destroys first, then allows navigation. URL cleanup must use replace—not a new history entry—so Back cannot restart a just-finished tour. Refresh restarts only when the explicit valid URL still exists.
- Library failure, JavaScript disabled, route/navigation change, or failed preflight leaves the static Guide complete and usable; never show an error overlay.
- Do not add a hero control in V1. VM-620 owns wider invitation language; VM-617 owns final cross-route validation.

## Smallest eventual architecture

If accepted, propose (not create) `assets/js/shared/guide-walkthrough.js` plus `assets/js/guide/maze-walkthrough.js`. The shared helper owns local load/lifecycle, URL validation/cleanup, target preflight, start/stop, focus, reduced-motion, fallback, and listener cleanup. Route config owns eligible ID, four selectors, copy, placement hints, and final focus/scroll destination. HTML only includes the route module. This is a helper, not an onboarding framework.

Vox Mana CSS owns dark glass, gold boundary, contrast, typography, overlay opacity, controls, and narrow geometry under a scoped popover class. The actual target must remain legible.

## Explicit red-team answers

| Question | Answer |
| --- | --- |
| Static problem solved / still optional / ordinary auto-launch? | Player-requested orientation / yes / no, only strict URL validation. |
| Trap / keyboard / Escape / predictable focus? | Not if adapter keeps unconditional close and explicit restore; native controls/Escape observed. |
| Reduced motion / mobile / missing target? | Respect existing control; model fit needs real QA; skip works with preflight. |
| History loop / static fallback? | Avoided by replace-state; valid refresh is the only restart; static page survives every failure. |
| Driver cheaper than internal / accessibility claim trusted? | Yes for mechanics; no, manual SR validation and compensation are mandatory. |
| Persistence, telemetry, excess teaching? | None; popovers orient, never duplicate the Guide. |
| Four steps / reading reuse / helper size / adjacent scope? | Four suffice; do not implement reading; helper stays lifecycle-only; VM-620/617 remain separate. |

## Owner decision requested

1. Build opt-in guided reading at all?
2. Driver.js with stated compensations, a narrow internal implementation, or neither?
3. Maze-only as first proof?
4. Is four steps short and useful enough?
5. Are URL/focus/Skip/Done/no-persistence/no-telemetry boundaries acceptable?

## RobDev / RobQA packet

- **Authority:** Owner request → VM-619 card → accepted Field Guide contract. Guide content owns product truth; guided reading only presents it.
- **Changed:** discovery, report, Kanban, handoff only. **Protected:** production Guide/Maze; storage; telemetry; URL/query/results/Placement/Reading Finds; VM-620/617.
- **QA:** QA-0 documentation/Kanban work. No production suite is proportionate. The isolated evaluation is behavior evidence, not production validation.
- **Unresolved:** screen-reader behavior, actual sticky-route geometry, and any future CSP compatibility must pass in a later implementation candidate.
