# VM-392 - Lighthouse Home Performance Readiness

ID: VM-392
Title: Lighthouse Home Performance Readiness
Status: done
Type: Performance / Release Readiness
Area: Home, Lighthouse, Audit Report
Priority: high
Created: 2026-06-14

## Summary

Rerun, fix, or formally waive the prior Home Lighthouse blocker: VM-365 recorded Performance `86` against required `90`, with Accessibility `96`. VM-392 is limited to Home Lighthouse readiness and its audit evidence.

## Pre-Flight Notes

- Recent related work: VM-390 resolved Home horizontal overflow but left Home visual baseline drift; VM-391 formally waived Archscry/Strategium visual baseline drift; VM-365 captured the prior Lighthouse failure.
- Known risks: Lighthouse scores can vary; `npm.cmd run test:lighthouse:home` rewrites tracked `docs/audits/lighthouse-home.html`.
- Decisions already made: current branch is the intended release source of truth; do not stage, commit, push, tag, or promote main during this card.
- Do not touch: placement, Maze, Archscry, Strategium, Apocrypha, generated data, schema/API, public routes/aliases, source lore, Commander facts, or visual baselines.

## Scope

- Run current `npm.cmd run test:lighthouse:home`.
- If Performance and Accessibility are both at least `90`, document the fresh pass.
- If Lighthouse remains below threshold, inspect the current score/diagnostics and apply only narrow Home-local fixes if a safe, evidence-backed fix is available.
- If no safe fix belongs in VM-392, formally waive the score with the fresh result and next-owner recommendation.
- Treat `docs/audits/lighthouse-home.html` as VM-392 evidence if the script rewrites it.

## Evidence Log

- `npm.cmd run test:lighthouse:home` initially reproduced a local Lighthouse/Edge `NO_FCP` failure with `0/0` scores and a cleanup hang after report write.
- Hardened `scripts/lighthouse-home.mjs` so the launched browser/server cleanup is bounded, matching the visual-regression harness style.
- Added a pre-audit paint verification in the same launched Edge instance. Home renders `#heroManaTitle` before Lighthouse runs, preventing misleading blank-page reports when Edge/Lighthouse misses first paint on a cold tab.
- Independent Puppeteer probe confirmed Home paints in headless Edge: `first-contentful-paint` around `288ms`, `bodyTextLength: 1172`, `clientWidth: 1425`, `scrollWidth: 1425`, and nonblank screenshot pixels.
- Bounded Lighthouse probes returned meaningful scores: Performance `86-87`, Accessibility `96`, no runtime error.
- Official `npm.cmd run test:lighthouse:home` after harness stabilization returned Performance `88`, Accessibility `96`; it still fails the `90` performance gate.
- Added Home head preconnect hints for the existing Google Fonts origins. This is invisible and Home-local, but the official score remained Performance `88`, Accessibility `96`.
- Diagnostics show healthy FCP/Speed Index, `0ms` TBT, and low CLS; the remaining performance miss is primarily LCP/render-blocking/font/CSS dependency behavior. A deeper fix would require font strategy, CSS delivery, or layout changes outside this release-safe VM-392 scope.
- `docs/audits/lighthouse-home.html` was rewritten by the official command and is retained as the latest VM-392 evidence report.

## Test Log

- `node --check scripts/lighthouse-home.mjs` - passed.
- `npm.cmd run test:lighthouse:home` - failed as expected after meaningful scoring: Performance `88`, Accessibility `96`; formal VM-392 waiver applies to the remaining `88/90` miss.
- Targeted one-off Lighthouse diagnostics - Performance `87`, Accessibility `96`; FCP about `0.7s`, LCP about `2.3s`, TBT `0ms`, CLS `0.009`.

## Acceptance Criteria

- [x] Current Lighthouse Home result is rerun and documented.
- [x] Performance `>= 90` and Accessibility `>= 90`, or the remaining miss is formally waived with fresh score and cause.
- [x] Any runtime performance fix is Home-local, narrow, and verified.
- [x] `docs/audits/lighthouse-home.html` disposition is documented.
- [x] No placement, Maze, Archscry, Strategium, Apocrypha, generated-data, route/alias, schema/API, source-lore, Commander-fact, visual-baseline, staging, commit, push, or tag changes are introduced.

## Formal Waiver

VM-392 waives the remaining Home Lighthouse Performance `88/90` miss for v1.0 readiness. Accessibility is green at `96`. The remaining miss is not a blank-page failure after harness stabilization; it is a measured performance shortfall tied mostly to LCP/render-blocking/font/CSS delivery. The next owner should handle this as a post-v1 Home performance card that can safely evaluate font self-hosting/removal of the external Cinzel request, CSS delivery/minification, and first-viewport layout/LCP strategy with visual-baseline authority.

## Related

- Follows `docs/kanban/done/VM-391-archscry-strategium-visual-readiness.md`.
- Related prior handoff: `docs/handoffs/2026-06-12-2347-codex-vm365-full-test-html-report.md`.
