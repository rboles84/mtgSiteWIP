# Agent Handoff: Codex - VM-585 Human Interaction Fidelity Governance

Date: 2026-08-22 20:12 MDT

Related card: VM-585

Status: Complete; owner-approved documentation-only QA-0; durability closeout authorized

## Agent Name

Codex

## Task Requested

Add the owner-provided VM-580 QA process lesson to durable project learnings and update canonical
RobDev/RobQA guidance where required, while distinguishing the attached proposal from the direct user
request and leaving VM-580 product behavior untouched.

## Files Reviewed

- C:/Users/obake/Downloads/vm580-qa-process-lesson-project-governance-update.md
- AGENTS.md
- .agents/skills/robdev/SKILL.md and robdev.md
- .agents/skills/robqa/SKILL.md and robqa.md
- docs/dev/RobDevPass.md
- docs/qa/RobQAPass.md
- docs/handoffs/HANDOFF_INDEX.md and recent VM-580/VM-584 handoffs
- docs/kanban/board.md and VM-580/VM-584 cards
- docs/strategy/2026-08-22-robdev-robqa-skill-extraction-learning.md
- current documentation/testing catalogs and repository evaluation-search results

## Files Changed

- docs/dev/RobDevPass.md
- docs/qa/RobQAPass.md
- docs/strategy/2026-08-22-vm580-human-interaction-fidelity-learning.md
- docs/kanban/board.md
- docs/kanban/done/VM-585-vm580-interaction-fidelity-governance.md
- docs/handoffs/HANDOFF_INDEX.md
- this handoff

## What Changed

- Added a RobDev interaction-defect reproduction rule requiring the exact owner-observed rendered path,
  live geometry and event ownership, intermediate pointer coordinates, focus-modality distinction,
  known-good same-repository lifecycle comparison, and red-before-green evidence for escaped defects
  when practical.
- Added the canonical RobQA Human Interaction Fidelity Gate. It rejects synthetic enter/leave, direct
  handlers or DOM clicks, target teleportation, state mutation, screenshots, or control existence as
  sole proof when physical travel or modality is material.
- Required pointer-transition QA to traverse live rendered geometry at a human-representative pace,
  operate the destination, verify repetition where contracted, and verify dismissal/focus/cleanup.
- Recorded the VM-580 escape and one future RobDev/RobQA evaluation scenario in a focused learning.
- Created and completed VM-585 under the next unused Kanban identity.

## Why It Changed

VM-580 repeatedly passed automated and independent QA while the owner could not physically cross from
the source card into the preview. The passing witnesses proved destination behavior after arrival but
did not reproduce the intermediate rendered path that triggered cursor-chasing dismissal. The escaped
defect demonstrated a concrete missing rule in both development reproduction and QA acceptance.

## Decisions Made

- The canonical rules live only in RobDevPass and RobQAPass. The repo-local skill wrappers already
  require reading those authorities, so they were intentionally not expanded with duplicate policy.
- No dedicated RobDev/RobQA agent-evaluation harness exists. The scenario is preserved in the learning
  for the first appropriate evaluation surface; no framework was created.
- The owner-directed evidence satisfies the gates' own requirement that frozen governance change only
  after real project work demonstrates a missing rule.
- A bounded rendered/manual pass remains required for geometry-, timing-, pointer-, or focus-sensitive
  defects even when browser automation passes; it does not justify an exhaustive product journey suite.

## Risks / Uncertainties

- Future agents must still choose human-representative pace and evidence-based geometry tolerances from
  the affected product rather than hardcoding VM-580 dimensions.
- The working tree contains unrelated pre-existing VM-584 documentation, VM-578 corpus, VM-580
  governance, and the separately requested uncommitted Archscry CSS presentation change; all were
  preserved.

## Tests Run

- Focused Markdown link resolution across the two gates, learning, and VM-585 card: PASS.
- Required governance phrase/coverage check: PASS.
- Scoped git diff --check for VM-585 documents: PASS; only existing LF-to-CRLF warnings appeared.
- Runtime, browser, component, placement, and product suites: intentionally not run; QA-0 documentation
  governance only.

## RobDevPass Implementation Packet

- Changed behavior: future implementation work must reproduce owner-observed interaction defects through
  their actual rendered path before changing code.
- Protected behavior: all runtime, CSS, tests, fixtures, data, generated artifacts, placement, and
  accepted VM-581 through VM-583 behavior.
- Owning authority: docs/dev/RobDevPass.md and docs/qa/RobQAPass.md.
- Producer: hand-authored repository governance and strategy Markdown.
- Existing machinery reused: frozen canonical gates, current strategy learning pattern, Kanban, and
  handoff system.
- Consumers: repository implementation and QA agents.
- Realistic risks: duplicated policy, overfitted VM-580 rules, synthetic evidence accepted as human
  fidelity, or broad heavy-suite requirements.
- Smallest complete implementation: two concise gate amendments, one learning/evaluation scenario, one
  card, and one handoff.
- Non-goals: product repair, browser harness change, test creation, skill-wrapper duplication, or new
  evaluation infrastructure.
- Stop conditions: any need to alter VM-580 runtime or invent an evaluation framework.

## RobQAPass Readiness

- QA tier: QA-0.
- Changed behavior: documentation governance only.
- Protected behavior intentionally untouched: runtime interaction, accepted owner behavior, existing
  skill invocation, product test contracts, and unrelated working-tree changes.
- Tests selected: focused link, required-content, scope, and whitespace checks.
- Tests intentionally skipped: all runtime/browser/product suites because no executable behavior changed.
- CPU-heavy validation: NOT REQUIRED.
- Self-QA rendered evidence: not applicable.
- Manual finding converted to invariant: real rendered source-to-destination travel must be exercised
  through live intermediate geometry when that travel owns correctness.
- Remaining owner judgment: wording and policy acceptance only.
- Owner review route: inspect the RobDev subsection, RobQA Human Interaction Fidelity Gate, and the
  focused VM-580 learning.

## Not Touched

- assets/js/archscry/runtime/card-media.js
- assets/css/archscry.css
- tests/archscry
- .agents/skills/robdev and .agents/skills/robqa
- docs/qa/vox-mana-test-plan.md and docs/reference/manual-test-cases.md
- VM-580 product implementation, VM-581, VM-582, VM-583, Maze runtime/CSS, placement, data, telemetry,
  persistence, generated artifacts, VM-578 corpus
- Merge, deployment, main integration, branch, or worktree topology

## Final Owner Corrections - 2026-08-22

- Final QA-escape wording: "If owner acceptance fails on behavior or risk that RobQA claimed to have
  verified, classify the finding as a QA escape." The rule then captures the owner's reproduction,
  converts it to the next focused invariant, requires red-before-green evidence against the rejected
  behavior where practical, and updates methodology or an existing evaluation surface for the specific
  evidence gap.
- Added one Automatic Failure Condition: RobQAPass READY cannot be claimed when an interaction
  materially depends on pointer travel, rendered geometry, timing, hover ownership, or focus modality
  but QA relies only on synthetic events, direct DOM interaction, target teleportation, or equivalent
  non-human traversal.
- Verified the VM-581, VM-582, and VM-583 cards each contain an explicit PASS - OWNER ACCEPTED record
  dated 2026-08-22. Their accepted-work wording is historically accurate and was not changed.
- Intentionally left the compact RobQAPass instruction unchanged. The full canonical gate and the new
  automatic-failure hook are sufficient; another clause would repeat the same policy.
- Focused Markdown links: PASS.
- Required governance-content and VM-581 through VM-583 historical-status checks: PASS.
- Scoped git diff --check: PASS with only the existing LF-to-CRLF warning.
- Runtime, browser, product, placement, and other executable tests were intentionally not run for this
  QA-0 documentation correction.

## Follow-Up Recommendations

- When an agent-skill evaluation surface is introduced, implement the compact scenario recorded in the
  learning without creating a VM-580-specific card-name or route dependency.
- Use live geometry and evidence-based timing tolerances for each affected interaction rather than
  copying the historical 18px gap or 200ms grace as universal constants.

## Next Suggested Agent

Normal owner/governance review; no implementation agent is required.

## Related Kanban Card, Docs, Or Plans

- docs/kanban/done/VM-585-vm580-interaction-fidelity-governance.md
- docs/dev/RobDevPass.md
- docs/qa/RobQAPass.md
- docs/strategy/2026-08-22-vm580-human-interaction-fidelity-learning.md
