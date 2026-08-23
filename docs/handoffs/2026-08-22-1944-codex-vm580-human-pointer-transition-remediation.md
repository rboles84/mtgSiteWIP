# VM-580 Human Pointer Transition Remediation

## Agent name

Codex

## Task requested

Remediate only the owner-rejected VM-580 source-card to hover-preview transition on candidate `d590970521d5880ec128f734b2491d2d80915c00`. Reproduce with incremental real pointer coordinates before editing, preserve the shared transform-face implementation and accepted VM-581/582/583 work, and return the bounded Nicol Bolas owner check without merge, push, close, or Done.

## Files reviewed

- Owner rejection attachment
- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md` and `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md` and `docs/qa/RobQAPass.md`
- VM-580 card, board, handoff index, and recent VM-580 RobDev/RobQA handoffs
- Route ownership and data-flow maps
- `assets/js/archscry/runtime/card-media.js`
- `assets/css/archscry.css`
- Focused Archscry transform and post-VM-579 browser regressions

## Files changed

- `assets/js/archscry/runtime/card-media.js`
- `tests/archscry/archscry-transform-tests.js`
- `tests/archscry/post-vm579-owner-qa-tests.js`
- `docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md`
- `docs/handoffs/2026-08-22-1944-codex-vm580-human-pointer-transition-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

The previously created `docs/handoffs/2026-08-22-1909-vm580-final-shared-transform-independent-robqa.md` remains preserved as the exact-SHA review record for the now owner-rejected parent candidate.

## What changed

- Anchored the existing singleton preview once to the source card rectangle instead of moving it ahead of every source pointer coordinate.
- Added one 200ms bounded transition timer at the common Archscry preview owner.
- Source/preview entry cancels pending dismissal; source/preview exit schedules it; the delegated `.app` pointermove no longer synchronously destroys an active preview in dead space.
- Kept hover and genuine keyboard-visible focus as the combined ownership test.
- Distinguished pointer-derived Flip focus from keyboard focus so leaving after a mouse click releases that focus and dismisses instead of becoming sticky.
- Preserved the existing shared transform-media behavior and in-place image/name/type/Oracle/control updates.
- Replaced the test teleport with rendered-rectangle-driven incremental pointer coordinates through source center, source edge, the actual gap, preview body, and Flip.

## Why it changed

The owner could render and flip the transform preview but could not physically reach it. Pre-edit CUA reproduction showed the preview chased each source pointermove by approximately 18px. At the first coordinate beyond the source, the delegated pointermove found no trigger and called `hideCardPreviewOverlay()` before preview entry; source pointerout also queued dismissal. The previous automated test teleported directly into the preview and skipped this failure.

## Decisions made

- The interaction remains common Archscry preview behavior; no Nicol Bolas, Grixis, Card Signals, identity, or section branch was added.
- No CSS change was required. The active transform preview already computes `pointer-events: auto`.
- No click-to-lock or new preview architecture was introduced.
- The shared Scryfall transform-face authority and Card Details implementation remain unchanged.

## RobDevPass implementation packet

- Changed behavior: a human pointer can cross the bounded rendered gap from any common Archscry card source into its interactive transform preview, use Flip repeatedly, and dismiss after leaving both surfaces.
- Owning layer: `assets/js/archscry/runtime/card-media.js`, reusing its singleton overlay, delegated trigger resolver, positioning, shared face behavior, and combined boundary.
- Protected behavior: ordinary previews, Card Details pointer/keyboard/focus, shared face authority, all common preview consumers, VM-581/582/583, Maze, placement, data, telemetry, persistence, and generated artifacts.
- Realistic risks: preview chasing, premature gap dismissal, sticky pointer-click focus, keyboard-focus regression, ordinary Flip leakage, repeated-face desynchronization, and uncached alternate media.
- Smallest complete implementation: one stable source anchor, one bounded common timer, and pointer-versus-keyboard focus release in the existing owner.
- Stop conditions: no preview rewrite, transform duplication, identity/card special case, accepted-work modification, or wider architecture. None was required.

## RobQAPass readiness

- QA tier: QA-2 component interaction.
- Manual finding converted to invariant: the regression must use live rendered source/preview rectangles and at least 20 incremental pointer coordinates through the real gap before reaching Flip; direct hover/teleport is insufficient.
- CPU-heavy validation: NOT REQUIRED. Placement, scoring, routing, persistence, telemetry, and generated-data owners did not change.
- Remaining owner judgment: one physical Grixis Card Signals Nicol Bolas crossing and repeated-flip feel check.

## Tests run

- Pre-edit `npm run test:post-vm579-owner-qa` - expected FAIL during incremental `edge-through-gap-to-preview`, proving the rejected runtime defect.
- `npm run test:archscry-transform` - PASS.
- `npm run test:post-vm579-owner-qa` - PASS, including delayed no-store alternate-face media, incremental slow entry, four swaps, pointer-click focus dismissal, ordinary exclusion, Card Details, and frozen accepted regressions.
- `npm run test:dev-review` - PASS.
- `npm run test:transform-faces` - PASS.
- `npm run lint:js` - PASS for 31 frontend files.
- `node --check` on changed runtime and browser test - PASS.
- `git diff --check` - PASS; only line-ending warnings.

## Rendered self-QA

- Exact path: local Dossier Review -> Grixis -> Card Signals -> Nicol Bolas.
- Viewport: 1440x1000.
- Pre-edit reproduction: 18 incremental coordinates; preview chased the pointer and dismissed at the first off-source coordinate.
- Final entry: 20 incremental source/edge/gap/body coordinates across a rendered 18px gap, then 14 more coordinates through preview body to Flip; preview remained visible throughout.
- Final flips: Ravager -> Arisen -> Ravager -> Arisen -> Ravager without reopening. Image alt, title, type, Oracle copy, selected face, and next-face label matched every state.
- Final leave: pointer moved outside both surfaces while Flip retained click focus; pointer-derived focus released, overlay became hidden, selected-face state cleared.
- Ordinary Sedris: no transform class and hidden/display-none Flip.
- Card Details: Ravager -> Arisen -> Ravager; Escape closed and restored focus to the invoking Nicol trigger.

## Tests intentionally skipped

- Placement certification, journey, synthetic, mutation, recovery, and exhaustive engine suites: no changed risk in those owners.
- VM-581/582/583 owner re-review: accepted and frozen.
- Deployment/integration: prohibited before owner acceptance.

## Risks / uncertainties

No known deterministic blocker remains. Final pointer feel under the owner's physical mouse path remains owner judgment. Fresh exact-candidate review should distrust the prior teleport-based acceptance evidence.

## Not touched

- Maze runtime or CSS
- VM-581, VM-582, or VM-583 runtime/CSS
- Shared transform-face implementation
- Placement, scoring, identity/evidence data, telemetry, persistence, generated data, or Scryfall source records
- Unrelated `docs/kanban/board.md`, `.agents/`, VM-584, or VM-578 corpus work
- Merge, push, close, Done, deployment, branch, or worktree topology

## Follow-up recommendations

1. Commit only the scoped VM-580 remediation and related handoff governance.
2. Run fresh independent RobQA on that exact remediation SHA if the existing exact-SHA gate is retained.
3. Limit owner recheck to the physical Nicol Bolas source -> preview -> Flip path, four alternating faces, and leave-to-dismiss.

## Next suggested agent

Fresh independent RobQA for the exact remediation SHA, then owner acceptance.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/handoffs/2026-08-22-1909-vm580-final-shared-transform-independent-robqa.md`
