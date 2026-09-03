# VM-623 Field Guide Telemetry — Owner Review Handoff

## Agent and task

- **Agent:** Codex
- **Task requested:** extend the existing VM-575 privacy-bounded telemetry system with exactly four Field Guide event families; stop at Owner Review without self-acceptance, merge, or PR.
- **Card:** VM-623
- **Branch / baseline:** `codex/vm-623-field-guide-telemetry`, created from clean `main = origin/main = 217e35784d116df8f5cf329b88a76838c264fe56`. The candidate is intentionally uncommitted.

## Files reviewed

- RobDev/RobQA skills and frozen gates, cost control, Kanban/handoff records, VM-575, VM-619–622, and the accepted Field Guide sequence.
- The shared telemetry adapter/tests/reference; all three Guide routes, route modules, walkthrough configurations, and shared walkthrough helper.

## Files changed

- `assets/js/shared/vox-telemetry.js` — strict Guide schemas, in-memory session, visible-time tracker, CTA/walkthrough APIs, and existing provider-firewall reuse.
- `assets/js/guide/guide-telemetry.js` plus the three Guide route modules — small route bootstrap and marked CTA routing only.
- `assets/js/shared/guide-walkthrough.js` — existing lifecycle projects start/complete/close through the Vox API; Driver.js/vendor is unchanged.
- `guide/reading/index.html`, `guide/maze/index.html` — missing `data-guide-cta` identifiers on existing intentional CTAs.
- Focused telemetry/Guide tests, package script, product telemetry reference, VM-623 Kanban records, and this handoff/index.

## What changed and why

The existing VM-575 adapter now accepts only `guide_opened`, `guide_engaged`, `guide_action`, and `guide_walkthrough` alongside its unchanged Archscry events. Each Guide load creates one in-memory random `guide_session_id`, reports one open and only the approved visible-time thresholds, ignores unmarked links, and reuses the current walkthrough start/finish seam. This answers the requested product questions without a second provider or analytics system.

## Decisions made

- Reused the VM-575 allowlist, firewall, mock, and non-blocking failure path; Guide code has no provider call.
- Kept browser glue to one small Guide module; reused existing CTA identifiers and added them only where missing.
- Count only visible document time and report thresholds, never a raw duration.
- The API permits an explicit internal action kind for a future ambiguous `maze` Guide CTA; present marked CTAs retain their existing product-exit meaning.

## RobDev compact packet

- **Changed behavior:** bounded anonymous Guide event projections only.
- **Protected behavior:** original Archscry telemetry semantics, provider/privacy setup, Placement/version behavior, Guide visuals/destinations/static routes, Driver.js/vendor, walkthrough focus/history/motion/failure/replay, and every unmarked link.
- **Authority / producer:** shared Vox adapter owns schemas/firewall/provider; Guide bootstrap owns route intent; shared walkthrough helper owns lifecycle state.
- **Consumers:** the three Guide route modules are the only `startGuideWalkthrough` consumers; all were inspected.
- **Non-goals / stop conditions honored:** no provider/configuration/identity/persistence/URLs/prose/generic tracking/dashboard/visual/placement work.

## RobQA readiness

- **Tier:** QA-2 CTA interaction plus QA-3 lifecycle/state transition.
- **PASS:** `npm.cmd run test:telemetry` — original events, exact Guide schemas, arbitrary-property/URL/prose rejection, one route boot open, hidden-time exclusion and 10/30/60/120 once-only thresholds, explicit/unrelated CTA behavior, walkthrough states, mock mode without PostHog, and provider failure.
- **PASS:** `npm.cmd run test:vm623-guide-telemetry` — all route bootstraps, identifiers, and no direct Guide provider call.
- **PASS:** `npm.cmd run test:vm619-guided-reading`, `npm.cmd run test:vm621-guided-reading` — protected shared walkthrough contracts.
- **PASS:** `npm.cmd run test:guide-browser` — representative rendered Guide smoke, with no screenshot package and no visible regression.
- **PASS:** `npm.cmd run lint:js`, `npm.cmd run lint:html`, `git diff --check`.
- **CPU-heavy validation:** NOT REQUIRED. Placement/engine/identity producers are unchanged, so exhaustive Placement, synthetic, mutation, and recovery suites were skipped.
- **Owner finding / invariant:** none.
- **Remaining Owner judgment:** one mock-mode stream inspection only; no visual change is in scope.

## Owner check

Purpose: verify the real Guide mock stream.

Open: `/guide/reading/?vox_telemetry=mock&guided=dossier-reading`

1. Inspect `window.__VOX_TELEMETRY_EVENTS__` in DevTools.
2. Click **Return to Archscry** (or first close the walkthrough, then click it).
3. Reopen the route if needed, start the walkthrough, then close it.

PASS if `guide_opened`, the CTA `guide_action`, and walkthrough `started`/`closed` events share one page-local `guide_session_id`, contain no URL/prose, and engagement appears only after its visible threshold. FAIL if an expected event is absent, an unmarked link emits, or URL/prose/persistent identity is present.

## Risks and uncertainties

- Provider delivery remains best-effort under network/ad-blocking conditions, while the product remains non-blocking as in VM-575.
- Full browser-exit lifecycle delivery is best-effort; explicit close and normal completion emit synchronously.
- This is **PASS — Owner Review Ready**, not Owner Accepted.

## Not touched

PostHog settings/token/host, privacy configuration, Archscry runtime/Placement, identity/data/generated artifacts, Guide copy/layout, Driver.js/vendor, Home/dossier/Maze Beacon placement, generic navigation, dashboards, commits, PRs, and merges.

## Follow-up and next agent

- Do not expand the telemetry contract without a separate schema/privacy review; preserve VM-575's provider-level client-IP discard setting during any migration.
- **Next suggested agent:** Owner for the bounded mock-mode check; an authorized lifecycle agent only after explicit Owner disposition.
- **Related:** `docs/kanban/in-progress/VM-623-field-guide-telemetry.md`, `docs/reference/product-telemetry.md`, VM-575, VM-619, and VM-622 records.

## Owner-fail remediation — 2026-09-02

- **Owner finding:** Product: Owner Manual FAIL. The local reading-guide mock path raised a missing named export for `beginVoxGuideSession`, leaving `window.__VOX_TELEMETRY_EVENTS__` undefined.
- **Files re-inspected:** `assets/js/guide/guide-telemetry.js`, `assets/js/shared/vox-telemetry.js`, and all VM-623 telemetry tests.
- **Root cause / decision:** every imported Guide telemetry symbol is present in the current adapter. The prior focused Node test imported the working-tree module rather than the HTTP-served graph; the broad Guide smoke did not collect module errors or run the guided mock lifecycle. The owner witness therefore exposed a test-observability gap, not a need for duplicate route state or a provider change.
- **Files changed:** `scripts/vm623-guide-telemetry-browser.mjs` and `package.json`, plus this existing card/handoff/index record. No provider, route, shared adapter, or vendor code was broadened in remediation.
- **Regression and exact proof:** PASS `$env:VM623_BROWSER_PORT='8000'; npm.cmd run test:vm623-guide-telemetry-browser`, which served and loaded `http://localhost:8000/guide/reading/?vox_telemetry=mock&guided=dossier-reading` in Chromium. It saw no console/module error, found the mock event array, `guide_opened`, and `guide_walkthrough { walkthrough_id: "dossier-reading", state: "started", step_index: 1 }`, with no PostHog global/request.
- **Additional focused evidence:** PASS `npm.cmd run test:telemetry`; PASS `npm.cmd run test:vm623-guide-telemetry`; PASS `git diff --check`.
- **Disposition:** **PASS — Owner Re-Review Ready**. Candidate remains uncommitted; do not push, merge, or self-accept.
