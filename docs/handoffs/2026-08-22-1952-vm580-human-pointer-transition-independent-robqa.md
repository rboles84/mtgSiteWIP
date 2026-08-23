# VM-580 Human Pointer Transition Independent RobQA

## Agent name

Independent RobQA subagent

## Task requested

Freshly review exact VM-580 remediation candidate 26b1dea6d7432bf99bcf09832da1964613457924 against rejected parent d590970521d5880ec128f734b2491d2d80915c00. Treat prior PASS decisions and RobDev claims as untrusted. Limit review to the real source-card to hover-preview transition, repeated transform interaction, leave dismissal, and directly protected ordinary/Card Details behavior. Do not implement, merge, push, close, or mark Done.

## Decision

PASS — Owner Review Ready

- Exact reviewed candidate: 26b1dea6d7432bf99bcf09832da1964613457924
- Exact rejected parent: d590970521d5880ec128f734b2491d2d80915c00
- Branch: codex/vm580-vm583-owner-qa-remediation
- Remaining owner review: VM-580 physical Nicol Bolas source-to-preview crossing and repeated flipping only.

## Files reviewed

- AGENTS.md
- .agents/skills/robqa/SKILL.md
- docs/qa/RobQAPass.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/kanban/board.md
- VM-580 through VM-583 cards
- Recent VM-580 shared-transform, rejection, and human-pointer RobDev/RobQA handoffs
- Exact parent-to-candidate diff
- assets/js/archscry/runtime/card-media.js
- assets/js/shared/scryfall-transform-faces.js
- assets/js/archscry/runtime/actions.js
- assets/css/archscry.css
- assets/js/maze/research-init.js
- tests/archscry/archscry-transform-tests.js
- tests/archscry/post-vm579-owner-qa-tests.js

## Preflight summary

- Recent work: d590970 correctly shared closure-owned face behavior, but owner review proved a human pointer could not cross into the preview because source pointermove repositioned it ahead of the pointer and the first gap coordinate synchronously dismissed it. Candidate 26b1dea changes only that common pointer-transition ownership plus focused tests/governance.
- Risks: cursor chasing, dismissal during the rendered dead space, timer masking inability to enter, sticky pointer-derived Flip focus, keyboard focus regression, face/control desynchronization, uncached alternate media, ordinary Flip leakage, or reopening accepted work.
- Locked decisions: shared transform-face implementation remains authoritative and unchanged; no click-to-lock, preview rewrite, card/identity/section branch, Maze product copy, or accepted VM-581/582/583 modification.
- Do not touch: unrelated modified docs/kanban/board.md; untracked .agents/; VM-584 card; and docs/research/maze-player-language/corpus/, including VM-578.

## Architecture findings

- The exact runtime diff is confined to the common card-media.js preview owner. Shared Scryfall transform faces, Archscry CSS, Maze runtime/CSS, dossier/provider owners, placement, telemetry, persistence, generated data, and accepted VM-581/582/583 runtime remain unchanged.
- Preview positioning is anchored to the rendered source rectangle instead of pointer coordinates, so source movement cannot make the preview chase the user.
- One 200ms timer schedules instead of synchronously performing dismissal while the pointer occupies neither rendered box. Source or preview entry cancels it; dismissal rechecks source/preview hover and keyboard-visible focus.
- App-level delegated pointer handling still applies to every common Archscry preview trigger. Production contains no Nicol Bolas, Ravager, Arisen, Grixis, or Card Signals branch.
- Pointerdown-derived Flip focus is distinguished from keyboard interaction. Pointer leave blurs only pointer-derived focus so ordinary leave dismisses; genuine keyboard-visible focus remains an owner.
- Shared transform detection, closure-owned selected face, image/name/type/Oracle/next control, and Card Details face behavior are byte-unchanged from the rejected parent.

## Change classification

- QA tier: QA-2 component interaction.
- Changed behavior: a human-speed pointer can cross the actual source edge and gap into the stable preview without teleporting or reopening it.
- Protected behavior: shared transform-face authority, every common preview consumer, ordinary previews, Card Details/focus, VM-581/582/583, Maze, placement, routes, data, telemetry, persistence, and generated artifacts.

## Tests selected and results

- npm run test:archscry-transform — PASS. Verified common-owner timer/anchor/focus structure, no special-case branch, unchanged shared behavior, and Card Details protection.
- npm run test:post-vm579-owner-qa — PASS. Fresh real Edge used live source/preview boxes, 20 incremental coordinates, four flips, delayed uncached alternate media, pointer-focus leave dismissal, ordinary no-Flip, Card Details, and frozen accepted regressions.
- Independent temporary 120ms-per-gap-coordinate real-Edge variant — PASS. It distrusted the committed 35ms witness and moved source center to source edge through each real 18px gap coordinate into preview body at 120ms per point, approximately 1.44 seconds overall, without teleporting, reopening, or dismissal. The variant was deleted after execution.
- Full rendered face/control parity — PASS at Ravager -> Arisen -> Ravager -> Arisen -> Ravager. Selected face, front/back image URL, alt, title, type, non-empty Oracle content, Flip visibility, next-face title, and ARIA label matched every state.
- Initially uncached alternate face — PASS. The delayed back image was observed with img.complete false while the preview stayed interactive, then completed before continued flipping.
- Leave/focus — PASS. Flip retained pointer click focus before exit; leaving both boxes released pointer-derived focus and dismissed the overlay.
- Ordinary/Card Details — PASS. Sedris exposed no visible or focusable Flip. Card Details flipped Ravager -> Arisen -> Ravager; Escape closed and restored focus to the invoking Nicol trigger.
- npm run lint:js — PASS for 31 frontend files.
- npm run test:dev-review — PASS.
- Exact parent-to-candidate git diff --check — PASS.

## Tests intentionally skipped

- Placement journey, synthetic, mutation, recovery, enumeration, and full-engine suites: no decision/placement owner changed and these cannot detect the pointer-transition risk.
- Broad all-37 rendered certification: common-owner structure plus focused live boxes cover the narrow interaction without reopening dossier content/layout.
- VM-581/582/583 owner re-review: owner accepted and frozen; no owning runtime/CSS file changed.

## CPU-heavy validation

NOT REQUIRED

## Self-QA rendered evidence

- Case: local Dossier Review -> Grixis -> Card Signals -> Nicol Bolas.
- Viewport: 1440x1000, scale 1, fresh no-store local origin, real Edge pointer events.
- Geometry: source and preview rectangles came from the live page; preview remained source-anchored with an 18px gap.
- Physical path: source center -> eight source-edge points -> twelve actual gap/body points. The independent variant waited 120ms after each gap coordinate and asserted visibility at every point before proving the preview body matched hover.
- Repeated interaction: the same open preview survived Ravager -> Arisen -> Ravager -> Arisen -> Ravager, including the delayed first back image.
- Exit: moving outside both boxes dismissed even though mouse clicking had focused Flip.
- Protected behavior: ordinary no-Flip and Card Details both ways/Escape/focus restoration passed with zero relevant browser errors.

## Manual finding converted to invariant

- Finding: teleport-style automation passed while a real pointer could not reach the preview.
- Defect class: rendered geometric transition and delegated dismissal race.
- Invariant: derive source/preview rectangles from the rendered product and advance through source center, source edge, actual gap, preview body, and Flip with multiple screen-coordinate events; remain open under a deliberately slow sub-timeout cadence, support four atomic face swaps, and dismiss after leaving both boxes.

## Files changed

- docs/handoffs/2026-08-22-1952-vm580-human-pointer-transition-independent-robqa.md
- docs/handoffs/HANDOFF_INDEX.md

## What changed

Recorded fresh exact-SHA independent QA evidence only. No candidate runtime, CSS, tests, card, board, package, data, or accepted owner was modified.

## Why it changed

Repository governance requires a durable specialist handoff and index entry for the new exact remediation SHA.

## Decisions made

- PASS — Owner Review Ready on exact candidate 26b1dea6d7432bf99bcf09832da1964613457924.
- No deterministic blocker, architecture drift, special-case production logic, or accepted-scope regression remains.
- Owner review is limited to one VM-580 physical source-to-preview/repeated-flip check.

## Risks / uncertainties

- Final physical pointer feel remains owner judgment.
- The 200ms grace intentionally permits a short gap crossing; pausing longer than that while hovering neither box dismisses by design.

## Tests run

- npm run test:archscry-transform — PASS
- npm run test:post-vm579-owner-qa — PASS
- Independent 120ms-per-gap-coordinate real-Edge variant with five parity checks and Card Details focus restoration — PASS
- npm run lint:js — PASS
- npm run test:dev-review — PASS
- Exact candidate git diff --check — PASS

## Not touched

- Candidate runtime/CSS/tests, shared transform module, Maze product, accepted VM-581/582/583 owners, placement, routes, data, telemetry, persistence, generated artifacts
- docs/kanban/board.md
- .agents/
- VM-584 card
- VM-578 corpus/research artifact
- Merge, push, close, Done, deployment, branch, or worktree topology

## Follow-up recommendations

1. Main agent should stage/commit only this handoff, its index entry, and deliberate VM-580 QA governance.
2. Owner should recheck only: hover Nicol Bolas, physically cross into preview, flip Ravager -> Arisen -> Ravager -> Arisen -> Ravager without reopening, then leave both boxes to dismiss.
3. Do not merge, push, close, or mark Done before explicit owner acceptance.

## Next suggested agent

Main Goal Mode agent for exact-SHA governance and the single bounded owner review.

## Related Kanban card, docs, or plans

- docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md
- docs/dev/RobDevPass.md
- docs/qa/RobQAPass.md
- docs/handoffs/2026-08-22-1944-codex-vm580-human-pointer-transition-remediation.md
