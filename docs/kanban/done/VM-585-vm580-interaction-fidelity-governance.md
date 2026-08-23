# VM-585 - VM-580 Human Interaction Fidelity Governance

ID: VM-585

Status: Done

Type: Documentation / QA governance

Area: RobDev and RobQA

Priority: High

Created: 2026-08-22

## Summary

Preserve the VM-580 QA escape as a durable project learning and update the canonical RobDev and RobQA gates so geometry-, timing-, pointer-, and focus-sensitive interaction defects cannot be accepted from target teleportation or direct control invocation alone.

## Scope

- Add one focused VM-580 interaction-fidelity learning.
- Add concise reproduction guidance to docs/dev/RobDevPass.md.
- Add the canonical Human Interaction Fidelity Gate to docs/qa/RobQAPass.md.
- Record a compact future RobDev/RobQA evaluation scenario without creating a new evaluation framework.
- Preserve the existing repo-local skill wrappers as thin invocation layers.

## Protected behavior

- No VM-580 runtime, CSS, test, fixture, or product behavior changes.
- No changes to accepted VM-581, VM-582, or VM-583 work.
- No duplication of the canonical rules across skill wrappers, workflow prompts, or test catalogs.
- Preserve all unrelated modified and untracked work.

## Acceptance Criteria

- [x] RobDev requires faithful reproduction of the owner-observed rendered interaction path before editing.
- [x] RobQA requires materially human-representative pointer travel through live rendered geometry when that geometry is part of correctness.
- [x] Synthetic events, direct DOM clicks, and target teleportation are explicitly insufficient as sole evidence for this defect class.
- [x] Pointer-derived focus is distinguished from genuine keyboard/focus-visible ownership.
- [x] Escaped owner-rejected UI defects use red-before-green regression evidence where practical.
- [x] Known-good same-repository interactions are behavioral references before new interaction contracts are invented.
- [x] A bounded manual/rendered pass remains required for geometry-, timing-, pointer-, or focus-sensitive interaction defects.
- [x] The VM-580 lesson and future evaluation scenario are recorded without new evaluation machinery.
- [x] Documentation validation and git diff --check pass.

## Completion

Completed: 2026-08-22

Owner approval: 2026-08-22; governance corrections approved and durability closeout authorized.

- Added the VM-580 interaction-fidelity learning.
- Updated the canonical RobDev reproduction rule and RobQA Human Interaction Fidelity Gate.
- Recorded the future evaluation scenario without creating evaluation infrastructure.
- Focused Markdown links, required governance coverage, and scoped git diff --check passed.
- No runtime, CSS, product test, fixture, or accepted VM-581 through VM-583 behavior changed.

## Final Governance Corrections - 2026-08-22

- Narrowed a QA escape to owner rejection of behavior or risk that RobQA claimed to have verified.
- Preserved capture of the owner's reproduction, the next focused invariant, red-before-green evidence
  where practical, and methodology/evaluation correction for the specific evidence gap.
- Added one Human Interaction Fidelity automatic-failure hook without duplicating the canonical gate.
- Verified VM-581, VM-582, and VM-583 each recorded PASS - OWNER ACCEPTED before this learning; the
  historical accepted-work wording remains accurate.
- Left the compact RobQAPass instruction unchanged because the canonical gate plus automatic-failure
  hook already makes the obligation enforceable without duplication.
- Focused Markdown links, required governance content, historical status, and scoped diff checks passed.
- No runtime, CSS, product test, fixture, skill-wrapper, placement, Maze, telemetry, data, or generated
  artifact changed as part of this correction.
