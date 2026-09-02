# VM-619 — Opt-In Field Guide Guided-Reading Mode

ID: VM-619
Title: Opt-In Field Guide Guided-Reading Mode
Status: Done — Owner Accepted
Type: Product discovery / guided onboarding
Area: Field Guide, contextual onboarding, shared UI
Priority: unranked
Created: 2026-09-01

## Summary

Evaluate a reusable, explicitly opt-in guided-reading mode that can walk a player through the meaning and
structure of a live Vox Mana surface without turning contextual Guide links into misleading tour promises.

## Source

- VM-616 Owner Review found that a working-Maze Guide invitation needed stronger hierarchy, but explicitly
  kept any reusable walkthrough system outside VM-616.
- `docs/kanban/done/VM-616-maze-context-translation-recovery-onboarding.md` retains one canonical,
  ordinary Guide link and does not implement a tour library.
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md` keeps Field Guide routes optional and bounded.

## Concept To Evaluate

- A player deliberately starts and can stop a guided-reading mode.
- Steps orient the player to existing live regions and Guide explanations without changing product state.
- The experience is resumable or dismissible only if that can be done without inventing unwanted persistence.
- Keyboard, focus, screen-reader, reduced-motion, narrow-width, Back/Forward, and repeat-visit behavior are
  first-class design inputs.
- Entry wording names guided behavior only after the implemented interaction can honestly fulfill it.

## Required Discovery Before Implementation

- Decide whether the capability belongs in shared Guide machinery or a narrower route-owned adapter.
- Inventory candidate surfaces and prove that a reusable system is preferable to ordinary contextual links.
- Evaluate dependency-free implementation against a small third-party library, including accessibility,
  bundle, maintenance, local-file, and CSP implications.
- Define focus ownership, escape/dismissal, scroll positioning, history behavior, and reduced-motion policy.
- Set a strict content and step-count cap so the mode stays optional and does not become a second product UI.

## Discovery Acceptance Criteria

1. Automatic tours remain prohibited; only a player-requested Field Guide reading is eligible.
2. Static-only, a narrow internal controller, and Driver.js are compared with current official technical and license evidence plus a disposable behavior evaluation.
3. Keyboard, focus, Escape, Skip/Done, scrolling, mobile, reduced motion, missing targets, history/refresh, and failure fallback have concrete recommended behavior.
4. Maze-first reading has at most four short steps, no persistence or telemetry, no VM-620/VM-617 expansion, and only a bounded future `/guide/reading/` seam.
5. The discovery report recommends one bounded architecture or recommends not building guided reading, while exposing unresolved risks for Owner judgment.

## Discovery Findings — 2026-09-01

- **Conditional recommendation:** use locally pinned Driver.js 1.8.0 only through a narrow shared lifecycle helper and a Maze-only four-step configuration; this remains subject to Owner approval and later candidate-stage accessibility validation.
- **Why not internal:** Driver.js already covers spotlight placement, viewport collision, scrolling, resize/scroll refresh, keyboard bindings, missing-target skipping, and teardown that a narrow internal controller would have to own indefinitely.
- **Accessibility caveat:** the disposable evaluation found native buttons, Escape, keyboard trapping across the popover plus highlighted section, and cleanup support, but no `aria-modal`/inert background proof. Manual screen-reader validation and explicit adapter compensation are required before implementation can be review-ready.
- **Boundary:** valid guided mode is explicit `?guided=maze-search` only; no persistence, telemetry, completion state, VM-620/VM-617 work, or change to the static Guide/Beacon is authorized.
- **Decision packet:** `docs/reports/2026-09-01-vm619-guided-reading-redteam.md`.

## Non-Goals

- No automatic launch, persistence, completion tracking, telemetry, package dependency, CDN runtime, or walkthrough beyond the approved Maze proof.
- Do not retrofit VM-616, VM-614, VM-615, VM-617, or VM-618 while evaluating the concept.
- Do not change parser, query, reading, dossier, result, Reading Finds, Placement, or telemetry semantics.
- Do not make guided reading mandatory or replace the normal top-of-page Field Guide routes.

## Dependencies / Related Work

- Owner disposition and integration of VM-616.
- Accepted Field Guide architecture from VM-613, VM-614, VM-615, and VM-618.
- VM-617 remains separately governed for reference, cross-links, and final onboarding validation.

## Risks / Uncertainties

- Tour language can overpromise automation or imply that ordinary product surfaces are unusable alone.
- Overlay/focus/scroll machinery can regress accessibility, mobile layout, history, or local-file behavior.
- A shared library may cost more in maintenance and bundle weight than the bounded product value warrants.
- Persisted progress can become an unrequested account or local-storage contract.

## Implementation Candidate — 2026-09-01

- Owner approved the discovery packet and authorized the bounded Maze-only implementation.
- The working Maze Beacon now promises `Walk me through this search` and navigates to the exact opt-in URL `/guide/maze/?guided=maze-search`; its accepted finite signal, steady state, focus, and reduced-motion treatment are unchanged.
- The Maze Guide route always loads its small route adapter, but direct `/guide/maze/` remains static and does not request the shared lifecycle helper, Driver, or walkthrough theme assets. A URL containing `guided` lazy-loads the helper, which accepts only the exact value, preflights all four targets, then loads locally pinned Driver.js 1.8.0.
- Exactly four concise steps orient accepted Sections I–IV. No product operation, new semantic claim, hidden state, persistence, progress, completion record, or telemetry was added.
- Each rendered step explicitly focuses its enabled forward action (`Next`, then `Done`) instead of Driver's first-focusable Close control. Close and Escape remove `guided` with `replaceState` and focus the current section heading. Done removes `guided`, scrolls to the static Guide top, and quietly focuses `#maze-guide-title` without drawing a page-sized decorative outline. Back, refresh, replay, missing-target, vendor-load failure, resize, mobile, and motion-change cleanup pass the dedicated browser harness.
- Driver target focusables are temporarily restored byte-for-semantics: prior `tabindex` presence/value is snapshotted and restored. Driver active classes, overlay, popover, temporary ARIA state, and listeners are absent after every tested exit and repeated same-page replay.
- Driver.js provenance, sizes, hashes, RobQA evidence, screenshots, and the manual NVDA plan are recorded in `docs/reports/2026-09-01-vm619-guided-reading-implementation.md` and `docs/qa/2026-09-01-vm619-guided-reading-owner-review.md`.

## Owner Finding Remediation — 2026-09-01

- **Finding:** rendered Owner Review showed the initial focus outline on Close at every step and a page-sized gold focus frame after Done.
- **Red-before-green invariant:** the dedicated browser harness first failed every forward-focus assertion plus the Done destination/outline assertion. The focused static contract also failed on the newly approved step copy before implementation.
- **Smallest complete correction:** the lifecycle helper now assigns focus to the rendered forward action after Driver completes each popover render; completion focuses the static Guide H1 instead of the full main container; route-scoped CSS suppresses only that programmatic H1 outline; no dialog, history, target-restoration, or product semantics changed.
- **Approved copy:** the four headings are now **Read the translation**, **See what affects the search**, **Understand why it missed**, and **Act on a useful result**. The explanatory bodies are unchanged.
- **Validation:** focused VM-619 static/browser/review suites, frontend JS/HTML lint, Guide browser smoke, VM-616 static/rendered compatibility, regenerated witnesses, and real in-app route interaction all pass. The Windows NVDA Owner gate subsequently passed and is bound below.

## Owner Acceptance and Candidate Binding — 2026-09-01

- Owner Accepted the complete reviewed VM-619 result exactly as tested at immutable candidate `05ebc9021fed8dadd7dbb6f87255bddd605b0748`.
- The required first-release Windows NVDA manual screen-reader/accessibility gate passed after the focus remediation. The acceptance packet did not provide the exact NVDA version or browser family/version, so those details remain unrecorded rather than inferred.
- Acceptance establishes Vox Mana's first opt-in guided-reading pattern: **explicit request → short guided orientation → ordinary static Guide**. Automatic product tours remain prohibited.
- Acceptance includes the exact four steps, locally pinned Driver.js 1.8.0, Next/Done initial focus, Close/Escape/Previous/keyboard behavior, quiet H1 completion focus, URL/history cleanup, replay and failure cleanup, both motion controls, and progressive enhancement.
- Direct `/guide/maze/` remains static. Guided reading remains Maze-only; `/guide/reading/`, VM-620, and VM-617 were not started.
- VoiceOver + Safari remains an explicit untested cross-platform coverage limitation; no universal screen-reader certification is claimed.
- The accepted product and validation candidate is frozen at the exact SHA above. Lifecycle closeout changes only card/board/QA/report/handoff records; PR/merge remains pending separate authorization.
