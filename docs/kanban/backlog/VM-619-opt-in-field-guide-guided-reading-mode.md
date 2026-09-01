# VM-619 — Opt-In Field Guide Guided-Reading Mode

ID: VM-619
Title: Opt-In Field Guide Guided-Reading Mode
Status: backlog
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
- `docs/kanban/in-progress/VM-616-maze-context-translation-recovery-onboarding.md` retains one canonical,
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

## Non-Goals

- No implementation, dependency installation, Driver.js adoption, tour markup, runtime flag, or persistence
  change is authorized by this backlog record.
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

## Owner Gate

Owner approval is required for the product promise, eligible routes, interaction model, dependency decision,
step/content cap, persistence boundary, and implementation card before any runtime work begins.
