# VM-117 - Phase 7 Performance Pass: Script Deferral, CLS Hints, and Lighthouse QA

ID: VM-117
Title: Phase 7 Performance Pass: Script Deferral, CLS Hints, and Lighthouse QA
Status: done
Type: Frontend / Performance / QA
Area: Home Preview, Shared HTML
Priority: medium
Created: 2026-05-24
Completed: 2026-05-24

## Summary

Implement the approved low-risk performance pass across the live public HTML pages: add shared lazy rendering for safe offscreen sections, finish intrinsic image sizing to reduce CLS, normalize external script deferral, tighten the public HTML validator, and add a reproducible Lighthouse runner for `newIndex2.html`.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1453-codex-vm114-p0-shared-css-foundation-pass.md`
- `docs/handoffs/2026-05-24-1537-codex-vm115-shared-token-follow-up.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-114-p0-shared-css-foundation-pass.md`
- `docs/kanban/done/VM-115-shared-token-follow-up-oklch-fluid-type.md`
- `docs/kanban/done/VM-116-css-architecture-phase-2-layout-layer-animation-consolidation.md`
- Approved VM-117 implementation plan in this thread

## Scope

- Add `.section-lazy-render` to the shared token entrypoint CSS.
- Apply lazy rendering only to low-risk offscreen sections on `newIndex2.html` and `strategium/index.html`.
- Add `defer` to safe external scripts on `archscry/index.html`, `maze/index.html`, `newIndex2.html`, and `strategium/index.html`.
- Replace the immediate `graph.js`-dependent boot calls on `newIndex2.html` and `strategium/index.html` with DOM-ready initialization.
- Add explicit `width` and `height` attributes to the remaining decorative public-route background images.
- Extend the public HTML validator to enforce script deferral or module loading plus intrinsic image sizing.
- Add a local Lighthouse runner and npm script for desktop `newIndex2.html` auditing.

## Non-Goals

- Do not touch `newIndex2_Old.html`.
- Do not rewrite the large inline style blocks on `newIndex2.html` or `strategium/index.html`.
- Do not change lore/data JSON, route copy, or public IA.
- Do not redesign the existing shared shell or topbar.

## Acceptance Criteria

- Shared CSS exposes `.section-lazy-render` with `content-visibility: auto` and `contain-intrinsic-size: 1px 600px`.
- `newIndex2.html` and `strategium/index.html` continue to initialize their chart surfaces after `graph.js` becomes deferred.
- Public-route external scripts are either `type="module"` or `defer`.
- Public-route `<img>` tags expose explicit intrinsic `width` and `height`.
- `npm run lint:html` truthfully validates the live public pages.
- A local Lighthouse runner exists for `newIndex2.html` and is ready to score on a compatible Chrome or standard 64-bit Edge install.

## Outcome

- Added `.section-lazy-render` to `assets/css/tokens.css` and applied it to `newIndex2.html` `#what`, `newIndex2.html` `footer.vm-footer`, and `strategium/index.html` `footer.vm-footer`.
- Added `defer` to the Supabase and shared runtime head scripts on `archscry/index.html` and `maze/index.html`.
- Added `defer` to `assets/js/graph.js` on `newIndex2.html` and `../assets/js/graph.js` on `strategium/index.html`.
- Replaced the immediate `graph.js` boot calls on `newIndex2.html` and `strategium/index.html` with `DOMContentLoaded` bootstraps so deferred chart code is available before initialization.
- Added explicit intrinsic `width="1672"` and `height="941"` to the remaining decorative background images on `index.html`, `newIndex2.html`, `archscry/index.html`, `maze/index.html`, `strategium/index.html`, `apocrypha/index.html`, `privacy/index.html`, `terms/index.html`, and `library/index.html`.
- Rebuilt `scripts/validate-frontend-html.mjs` so it validates script deferral, intrinsic image sizing, the live legal-page nav targets, and the existing Maze/Archscry/Library invariants.
- Added `lighthouse` as a dev dependency, created `scripts/lighthouse-newindex2.mjs`, and added `npm run test:lighthouse:newindex2`.

## Lighthouse Note

- The implementation work for this pass is shipped and was verified by automated checks plus served-page smoke tests.
- The local Lighthouse harness is wired up, launches the expected browser binary, writes `docs/audits/lighthouse-newindex2.html`, and is ready for use on a compatible Chrome or standard 64-bit Edge install.
- On this specific machine, Lighthouse reaches navigation but records `runtimeError.code = NO_FCP`, so desktop scores are not verifiable here and should be collected later from Chrome DevTools or a compatible browser install.

## Verification

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run lint:html`
- `npm.cmd run test:lighthouse:newindex2`
  - Launches the expected local Edge install
  - Writes `docs/audits/lighthouse-newindex2.html`
  - On this machine, logs `runtimeError.code = NO_FCP` instead of usable scores
- Served-page smoke on `newIndex2.html`, `archscry/index.html`, `maze/index.html`, and `strategium/index.html` using a local static server plus headless Edge via `puppeteer-core`
  - `newIndex2.html` hero/chart boot still works and the lazy-render class is present
  - `archscry/index.html` and `maze/index.html` still initialize shared Supabase session state without page errors after `defer`
  - `strategium/index.html` radar/chart boot still works after deferring `graph.js`

## Handoff

- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`
