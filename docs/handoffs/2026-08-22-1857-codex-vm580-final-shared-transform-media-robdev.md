# VM-580 Final Shared Transform-Media RobDev Remediation

## Agent name

Codex

## Task requested

Complete one final bounded VM-580 remediation by replacing rejected Archscry preview lifecycle iteration with the smallest proven Maze-derived face interaction at the common Archscry preview owner, preserve accepted VM-581 through VM-583, and prepare an exact candidate for fresh independent RobQA.

## Related work

- docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md
- docs/dev/RobDevPass.md
- docs/qa/RobQAPass.md
- docs/handoffs/2026-08-21-0649-codex-vm576-transform-card-ux.md
- docs/handoffs/2026-08-22-1812-vm580-vm583-owner-rejection-independent-robqa.md

## Preflight summary

- Continued the one existing branch and worktree.
- Maze proves a stable transform-card media container with closure-owned face state, in-place current-face updates, and a sibling Flip control.
- Archscry already shared authoritative Scryfall normalization but retained a separate module-global preview card/state pair and lifecycle compensations rejected by owner acceptance.
- assets/js/archscry/runtime/card-media.js is the common owner for staple, land, card-voice, and card-rationale previews.
- The smallest complete implementation required no Maze product-file or accepted runtime/CSS change.

## Files reviewed

- Mandatory handoff index, board, VM-580 through VM-583 cards, RobDevPass, RobQAPass, and token-cost guidance
- VM-576 transform handoff and current VM-580 remediation handoffs
- Shared face helper, Maze transform runtime/CSS, Archscry card-media/actions/CSS, and focused tests

## Files changed

- assets/js/shared/scryfall-transform-faces.js
- assets/js/archscry/runtime/card-media.js
- assets/css/archscry.css
- tests/shared/scryfall-transform-faces-tests.js
- tests/archscry/archscry-transform-tests.js
- tests/archscry/post-vm579-owner-qa-tests.js
- VM-580 through VM-583 cards for current owner disposition/governance only
- this handoff and docs/handoffs/HANDOFF_INDEX.md

## What changed and why

- Added createScryfallTransformMediaBehavior to the existing shared face module. Like the proven Maze closure, it owns ephemeral selected-face progression and exposes the current and next authoritative normalized faces without mutating the card.
- Replaced Archscry preview card/state globals with one shared media behavior bound once inside the existing singleton preview.
- Reused stable transform-card-media and transform-card-button structure while the existing image, copy, and control nodes update in place.
- Retired the prior deferred overlay-dismissal compensation and JavaScript height assignment. Archscry still owns positioning, combined-boundary dismissal, focus, and styling; persistent card-ratio DOM/CSS owns geometry.
- Added no card-name, identity, dossier, or section-specific production logic.
- Strengthened the real-pointer path to four consecutive swaps and a delayed no-store alternate-image run.

## RobDevPass packet

- Changed behavior: every common Archscry preview consumer receives repeatable true-transform progression with synchronized image, name, type, Oracle copy, alt text, and next-face control state.
- Existing machinery reused: shared Scryfall normalization, Maze closure pattern, singleton preview DOM, trigger resolver, positioning/boundary, CSS, and Card Details.
- Protected behavior: ordinary cards, keyboard/focus, Card Details, accepted VM-581/582/583, Maze, placement, scoring, evidence, telemetry, persistence, generated data, and Scryfall authority.
- Realistic risks: stale selection, mixed face content, lost boundary, uncached-image geometry, ordinary Flip leakage, and focus restoration.
- Smallest complete implementation: one small shared closure and one common preview binding; no subsystem, dependency, route, or product component.
- Stop conditions: no Maze component import, preview rewrite, click-to-lock, Scryfall model change, accepted-work change, or identity/card special case. None was required.

## RobQAPass readiness

- QA tier: QA-2 component interaction.
- CPU-heavy validation: NOT REQUIRED because no decision, placement, routing, generated-data, telemetry, or persistence owner changed.
- Invariant: any authoritative true-transform card using the common Archscry preview must support at least four real-pointer in-boundary swaps, including delayed uncached media, with one stable preview and face-consistent content, then dismiss only after leaving source and preview.
- Remaining owner judgment: repeated Nicol Bolas hover flipping only.

## Tests run

All passed:

- npm run test:transform-faces
- npm run test:archscry-transform
- npm run test:post-vm579-owner-qa
- npm run test:maze-transform
- npm run test:dev-review
- npm run lint:js
- npm run lint:html
- npm run test:frontend-smoke
- node --check on changed JavaScript and focused browser test
- git diff --check

## Tests intentionally skipped

- Placement, synthetic, journey, mutation, recovery, and exhaustive engine suites: no protected decision owner changed.
- Broad Maze search suites: VM-583 is accepted/frozen and no Maze product file changed.
- Integration/deployment: prohibited before owner acceptance.

## Rendered self-QA

- Fresh desktop 1440x1000 localhost route with real CUA mouse movement.
- Source-to-preview retained hover; the preview stayed 315x440 with stable transform-card-media structure.
- Four coordinate clicks produced Ravager -> Arisen -> Ravager -> Arisen -> Ravager with preview re-entry between swaps.
- Every swap retained visible/hover state and synchronized selected face, image alt, name, type, Oracle copy, and next-face label.
- Leaving dismissed and cleared selected-face state.
- Ordinary Sedris had hidden display-none 0x0 Flip.
- Card Details flipped both ways and Escape restored focus to the invoking Nicol Bolas trigger.
- Settled Arisen preview passed optical inspection; browser console errors were zero.
- Automation separately forced the alternate face through delayed no-store delivery.

## Risks / uncertainties

No known correctness blocker remains. Fresh independent exact-SHA RobQA and owner acceptance are still required.

## Not touched

- Maze runtime or CSS
- VM-581, VM-582, or VM-583 runtime/CSS
- VM-579
- placement, scoring, evidence, telemetry, persistence, generated data, or canonical Scryfall records
- unrelated VM-578 artifact
- unrelated concurrent VM-584 board/card and .agents work
- merge, push, deployment, closure, or Done

## Follow-up

Commit only scoped VM-580 files, run fresh independent RobQA on the exact SHA, and limit owner recheck to repeated Nicol Bolas hover flipping.
