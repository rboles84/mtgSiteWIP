# VM-016 Device-Local Reading Return — Owner Review Handoff

- Agent: Codex
- Task requested: Replace the active Google-required Archscry save path with the smallest local-first MVP, after repository recon.
- Related Kanban card: [VM-016](../kanban/done/VM-016-archscry-profile-return-qr.md)
- Related authorities: `.agents/skills/robdev/`, `docs/dev/RobDevPass.md`, `.agents/skills/robqa/`, and `docs/qa/RobQAPass.md`.

## Pre-flight And Grounding

Reviewed the required RobDev/RobQA guidance and frozen gates, `docs/handoffs/HANDOFF_INDEX.md`, the current board/card, VM-623’s completed telemetry handoff, the data-flow map, data contracts, and Archscry/Maze runtime ownership. No relevant earlier VM-016 implementation handoff was found.

The existing card already authorized Phase 1 browser-local persistence and explicit clearing. The smallest safe implementation keeps one normalized complete result in `localStorage`, restores it directly into the existing dossier, leaves the prior result intact during a retake, and gives the player an explicit forget action.

## Files Reviewed

- `archscry/index.html`
- `maze/index.html`
- `assets/js/shared/shared.js`
- `assets/js/archscry/index.js`
- `assets/js/archscry/runtime/{actions,boot,data,dossier-view,navigation,state}.js`
- `assets/js/maze/research-init.js`
- `scripts/browser-smoke.mjs`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`
- `privacy/index.html`, `terms/index.html`
- VM-016 card, Kanban board, related handoff/index materials

## Files Changed

- `assets/js/shared/shared.js`
- `archscry/index.html`
- `assets/js/archscry/index.js`
- `assets/js/archscry/runtime/{actions,dossier-view,navigation}.js`
- `maze/index.html`, `assets/js/maze/research-init.js`
- `scripts/browser-smoke.mjs`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`
- `privacy/index.html`, `terms/index.html`
- `docs/kanban/board.md`, `docs/kanban/in-progress/VM-016-archscry-profile-return-qr.md`

## What Changed And Why

- A normalized completed result now persists at `vm_archscry_saved_reading_v1`; the legacy session cache migrates once when present.
- Archscry restores the saved local result without resuming a Google/Supabase profile session.
- Save-with-Google actions and copy were removed from the active quick-reading and dossier paths. A concise same-device note and `Forget this reading` action replace them.
- `Begin Again` no longer clears the saved reading; only a newly completed reading replaces it. Forget clears the local and legacy result keys and returns to the landing state.
- Maze no longer tries to resume a profile session and no longer loads the unused Supabase UMD script.
- Privacy, terms, data-flow, and manual verification text now describe device-local storage and its same-browser/device boundary. Supabase remains accurately named only for the optional feature-flagged Terminal.
- The browser smoke gained a focused `--local-reading-only` mode. It exercises the actual reading, refresh restore, retake preservation, and forget path, and corrects stale adaptive-transition and fixed-rank assumptions in the existing harness.

## Decisions Made

- One latest complete reading per browser/device; no accounts, QR, URL payload, email, or cross-device transport.
- Keep feature-flagged Terminal infrastructure and its Supabase edge-function path intact; this slice removes the active account-save user journey, not unrelated disabled backend code.
- Preserve result normalization, Placement semantics, Maze handoff shape, and Reading Finds association.

## Risks And Uncertainties

- Browser local storage can be cleared/blocked by users or browser policy and does not sync across devices; this is intentional MVP scope and stated in the UI/legal copy.
- The footer action-row presentation and wording require Owner visual judgment. No agent visual approval is claimed.
- The broad browser smoke currently reaches a Maze modal mana-cost selector failure after the new Archscry return path and Maze navigation both complete. That assertion is outside VM-016; it was not changed or waived here.
- The optional Terminal still retains Supabase dependencies behind its feature flag. Removing that backend machinery requires a separately authorized scope.

## Tests Run

- `npm.cmd run lint:js` — pass
- `npm.cmd run lint:html` — pass
- `npm.cmd run test:frontend-smoke` — pass
- `npm.cmd run test:maze-finds` — pass
- `npm.cmd run test:placement` — pass; 37 factions / 37 golden paths
- `npm.cmd run test:browser-smoke -- --local-reading-only` — pass at 1440px, 820px, 390px, and 320px
- `npm.cmd run test:browser-smoke` — Archscry return and Maze navigation completed; then failed at an existing Maze modal mana-cost visual selector.

## RobDev Packet

- Owning authority and producer: `shared.js` owns normalized result storage; Archscry’s existing boot/dossier/navigation modules consume it; the adaptive quick-reading producer remains unchanged.
- Changed behavior: automatic device-local save and direct same-device dossier restoration; retake preserves prior result; explicit forget removes it.
- Protected behavior: normalized result compatibility, Placement engine, dossier composition, Maze handoff/Reading Finds, and feature-flagged Terminal.
- Non-goals: portable QR/link/email, profiles/accounts, server-side recovery, schema deletion, and Terminal refactoring.
- Stop condition met: no work beyond the local-first return slice.

## RobQA Readiness

- Risk: QA-3 state persistence/return journey with public copy/legal disclosure; direct-risk responsive return covered by deterministic browser checks.
- Objective checks are green as listed above. The remaining review is Owner-first visible product judgment: dossier/footer clarity, retake confirmation, forget affordance, and device-local limitation copy.
- Owner should not be asked to re-prove automated storage transitions; only verify the visible experience.

## Not Touched

- Placement models, scores, questions, evidence, factions, generated data, and dossier content semantics.
- Maze query/compiler/runtime behavior and Reading Finds store format.
- Supabase schema, OAuth provider configuration, edge-function source, and deployed infrastructure.
- QR, URL snapshot, email, anonymous-account, and cross-device recovery work.

## Follow-up Recommendations

1. Owner performs the compact manual checklist in `Device-Local Reading Return` in `docs/reference/manual-test-cases.md`.
2. If approved, decide separately whether the next product slice is a portable bearer link/QR, email recovery, or a backend account/profile; each has distinct privacy and revocation needs.
3. Triage the independent Maze modal mana-cost browser-smoke selector failure outside this card.

## Next Suggested Agent

Owner for visual acceptance; then a Planning Architect for any portable recovery/QR design.

## Owner Disposition — 2026-09-03

The Owner completed the UI check, reported the local-return flow working, and authorized release to `main`. This accepted the implemented device-local slice only. The 2026-09-05 lifecycle reconciliation closes VM-016 and preserves QR/cross-device recovery separately in [VM-628](../kanban/backlog/VM-628-archscry-portable-reading-recovery.md).
