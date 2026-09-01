# VM-620 — Shared Field Guide Beacon Discoverability and Visual Language

ID: VM-620
Title: Shared Field Guide Beacon Discoverability and Visual Language
Status: backlog
Type: Design-system discovery / contextual help
Area: Field Guide, Home, Archscry, Maze, shared UI
Priority: unranked
Created: 2026-09-01

## Summary

Evaluate and, only after Owner approval, propagate a recognizable shared **Field Guide** beacon language to
legitimate optional contextual-help invitations without turning every Guide link into an oversized CTA.

## Source

- VM-616 Owner Review accepted the Maze Guide Beacon architecture and identified a broader cross-route
  discoverability requirement that is explicitly outside VM-616.
- VM-619 separately owns the future opt-in guided-reading/walkthrough concept; this card owns visual
  recognition and discoverability only.

## Initial Invitation Inventory

- Home: `New to Vox Mana?` / `Start with the Guide →` in `index.html`.
- Archscry dossier: `How to read your dossier →` in
  `assets/js/archscry/runtime/dossier-view.js`.
- Maze Query Inspector: accepted `Field Guide` / `Read how to understand this search →` beacon in
  `assets/js/maze/research-ui.js`.

The implementation card must complete an actual contextual Guide-invitation inventory before deciding which
links legitimately receive the shared language. Ordinary navigation and footer links are not automatically
beacons.

## Pattern Questions

- Common `FIELD GUIDE` recognition and accessible rune/mark treatment.
- Shared gold border/glow hierarchy without materially enlarging compact invitations.
- Finite, restrained attention signaling with a permanent quiet state after presentation.
- Steady hover/focus states and reduced-motion behavior.
- Compact, inline, and layout-aware variants for different owning surfaces.
- Route-local versus shared CSS/component ownership and the smallest safe producer seam.

## Non-Goals

- No Home, Archscry, Maze, Guide, shared-style, runtime, or dependency change is authorized by this backlog
  record.
- Do not implement guided reading, step sequencing, overlays, Driver.js, or the VM-619 product behavior.
- Do not convert every Guide/navigation/footer link into a beacon or oversized CTA.
- Do not change parser, query, dossier, reading, Placement, result, persistence, account, or telemetry
  behavior.

## Dependencies / Related Work

- Owner acceptance and integration of the VM-616 Maze beacon candidate.
- Accepted VM-613/614/615/618 Field Guide and navigation architecture.
- VM-619 remains separately governed for opt-in guided-reading behavior.
- VM-617 remains separately governed for reference, cross-links, and final onboarding validation.

## Risks / Uncertainties

- Over-propagation could make optional help visually louder than primary product actions.
- A shared abstraction could erase route-local density and layout needs.
- Replaying attention on rerender or repeat navigation could become distracting.
- Visual consistency must not imply a guided walkthrough where only a document link exists.

## Owner Gate

Owner approval is required for the completed invitation inventory, eligible surfaces, shared/route-local
ownership, visual variants, attention policy, and implementation scope before runtime work begins.
