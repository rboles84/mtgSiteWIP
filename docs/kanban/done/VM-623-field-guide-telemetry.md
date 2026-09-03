# VM-623 — Field Guide Telemetry

ID: VM-623

Status: Done — Owner Accepted

Type: Product analytics

Area: Field Guide, shared telemetry

Priority: High

Created: 2026-09-02

## Summary

Extend the accepted VM-575 manual-only anonymous telemetry foundation to the three Field Guide routes. Measure Guide opens, bounded visible-time engagement, intentional Guide CTAs, and the existing guided-reading lifecycle without adding a provider, identity, persistence, generic link tracking, or product behavior.

## Source

Owner implementation request supplied 2026-09-02.

## RobDevPass Contract

- **Product outcome:** aggregate, privacy-bounded evidence can show which Guide surface is opened, whether it remains visibly engaged at 10/30/60/120 seconds, the useful explicit CTA selected, and whether a requested guided reading starts, completes, or closes.
- **Current behavior:** VM-575 has one provider-isolated, manual-only PostHog adapter and three Archscry reading events. The three Guide routes and their established shared walkthrough lifecycle emit no telemetry.
- **Locked decisions:** exactly four Guide event families; the exact supplied property allowlists/enums; one ephemeral non-persistent `guide_session_id` per Guide page load; visible-document time only; no generic tracking, URLs, prose, identity, persistence, Driver.js/vendor changes, or Archscry placement changes.
- **Owning layers:** `assets/js/shared/vox-telemetry.js` owns provider isolation, schemas, firewall, and mock/failure behavior. Guide route bootstrap owns direct open/engagement/CTA intent; `assets/js/shared/guide-walkthrough.js` owns the shared guided-reading lifecycle.
- **Existing machinery:** VM-575 allowlisted telemetry API and test sink; existing `data-guide-cta` values; accepted three walkthrough configurations and their shared helper.
- **Changed behavior:** the four allowlisted Guide events are available and emitted at their bounded Guide lifecycle seams.
- **Protected behavior:** VM-575's three Archscry events and privacy/provider contract; all Archscry placement and placement-version behavior; Guide visuals, CTA destinations, static routes, Driver.js/vendor bytes, walkthrough focus/history/motion/failure/replay behavior, and all non-Guide links.
- **Consumers/blast radius:** PostHog only receives normalized Guide events; the three Guide routes consume the shared module; the shared walkthrough helper has exactly the three Guide consumers inspected.
- **Relevant states:** static and valid guided page loads; threshold crossings; hidden-tab intervals; supported/unsupported CTA targets; start, complete, and close walkthrough exits; mock/off/live/provider-failure modes.
- **Smallest complete implementation:** extend the existing event firewall and test seam, add one small Guide bootstrap, use existing walkthrough cleanup, mark only missing intentional CTAs, and update the concise maintainer contract.
- **Non-goals / stop conditions:** no analytics architecture, provider/configuration change, persistence, generic listeners, broader Guide rewrite, dashboard, visual change, or placement work. Stop if this cannot fit the existing adapter and Guide lifecycle without one of those expansions.

## Acceptance Criteria

- [x] The existing three VM-575 event schemas and lifecycle semantics remain unchanged.
- [x] Only `guide_opened`, `guide_engaged`, `guide_action`, and `guide_walkthrough` are added, with the exact supplied properties and enum values.
- [x] Each Guide page load creates one ephemeral guide session, emits one open, and counts engagement only while visible at 10/30/60/120 seconds once each.
- [x] Only explicit `data-guide-cta` Guide CTAs emit actions; other links do not.
- [x] Existing walkthrough start/complete/close paths emit their bounded event through the Vox API without changing Driver.js or walkthrough behavior.
- [x] Mock mode, provider failure, and privacy firewalls remain non-blocking and fail closed.
- [x] Focused telemetry and Guide validation pass; no exhaustive Placement suite runs.

## Validation Plan

QA-3 / QA-2: focused deterministic telemetry schema, timer, CTA, and walkthrough lifecycle tests; existing guided-reading checks only as needed to protect the shared helper. One representative Guide mock-mode render is a lightweight rendered sanity check. Placement suites are intentionally out of scope because the placement producer is untouched.

## Owner Review

Stop at **PASS — Owner Review Ready**. The Owner's bounded mock-mode check is: open one Guide page, inspect `window.__VOX_TELEMETRY_EVENTS__`, click one CTA, run then close one walkthrough, and confirm the expected events.

## Completion Evidence

- PASS — `npm.cmd run test:telemetry`
- PASS — `npm.cmd run test:vm623-guide-telemetry`
- PASS — `npm.cmd run test:vm619-guided-reading`
- PASS — `npm.cmd run test:vm621-guided-reading`
- PASS — `npm.cmd run test:guide-browser` (representative rendered Guide smoke; no screenshot package)
- PASS — `npm.cmd run lint:js`, `npm.cmd run lint:html`, and `git diff --check`

No Placement, synthetic, mutation, recovery, or exhaustive engine suite ran: the changed behavior is a QA-2/QA-3 telemetry projection, while the protected placement producer remains untouched.

## Owner Review

Open `/guide/reading/?vox_telemetry=mock&guided=dossier-reading`, inspect `window.__VOX_TELEMETRY_EVENTS__`, click **Return to Archscry**, then run and close the walkthrough. Confirm one `guide_opened`, the CTA `guide_action`, and `guide_walkthrough` `started` then `closed` events share the page-local `guide_session_id`; wait only if you wish to observe the bounded visible-time event. This is the remaining product-facing check; no visual change is expected.

## Owner-Fail Remediation — 2026-09-02

- **Owner witness:** the local reading-guide mock route reported a named-export error for `beginVoxGuideSession`, so mock telemetry did not initialize. Classification: Product: Owner Manual FAIL.
- **Diagnosis:** the current shared adapter exports every symbol imported by `guide-telemetry.js`, including `beginVoxGuideSession`, `endVoxGuideSession`, `initializeVoxTelemetry`, and `trackVoxGuideAction`; the shared walkthrough import is also exported. The prior Node test imported from the working tree rather than the HTTP-served module graph. The broad Guide smoke opened only the static route and did not fail on captured module console/page errors or assert the guided mock lifecycle.
- **Regression:** added `scripts/vm623-guide-telemetry-browser.mjs` / `npm.cmd run test:vm623-guide-telemetry-browser`. It serves the candidate over HTTP, loads the exact reading-guide mock path in Chromium, captures module errors, and asserts the page-local mock stream, `guide_opened`, `dossier-reading` `started` at step 1, and no PostHog global/request.
- **Exact recheck:** PASS at `http://localhost:8000/guide/reading/?vox_telemetry=mock&guided=dossier-reading`; no console/module error, mock array exists, required events exist, and PostHog is absent.
- **Disposition:** PASS — Owner Re-Review Ready. The candidate remains uncommitted.

## Lifecycle Closeout — 2026-09-02

- **Initial Owner Review:** FAIL — the HTTP-served ES-module/import boundary was not covered by the prior automation.
- **Bounded remediation:** PASS — added the focused Chromium/HTTP regression for the exact reading-guide mock route.
- **Owner Re-Review:** PASS — Owner verified `guide_opened`, guided `dossier-reading` start/completion, and `guide_engaged` threshold 10 under one ephemeral Guide session with no module error.
- **Owner acceptance:** VM-623 is accepted exactly at candidate `0ed0b8430e5b9c4474a4b3ee74ca37f1b22be86d`.
- **Final contract:** `guide_opened`, `guide_engaged`, `guide_action`, and `guide_walkthrough`; `guide_engaged` remains canonical.
- **Disposition:** Done — Owner Accepted. No Placement, provider/privacy, or visible Guide UX behavior changed during closeout.
