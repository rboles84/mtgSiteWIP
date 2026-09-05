# Agent Handoff: [Agent Name] - [Short Task]

Date:
Related Card:
Related Plan:
Status:

## Task Requested

[What the user or main agent asked for.]

## Files Reviewed

- 

## Files Changed

- List exact Git-derived material paths as one backticked path per bullet.

## Material Candidate

- Baseline: `<task-baseline-sha>`
- Candidate: `<material-candidate-sha>`
- Changed paths: `<Git-derived-count>`

When an evidence head exists, add these two sections and validate them with the shared change-report
validator. Omit them when the candidate is the final `HEAD`.

## Evidence Delta

- Material candidate: `<material-candidate-sha>`
- Evidence head: `<evidence-head-sha>`
- Additional evidence-only paths: `<Git-derived-count>`
- This is not the full task diff.

## Evidence-Only Paths

- List exact Git-derived evidence-only paths as one backticked path per bullet.

## What Changed

- 

## Why

- 

## Decisions Made

- 

## Risks / Uncertainties

- 

## Efficiency / Escalation Notes

- Optional. Record only when reasoning was deliberately escalated or the task intentionally stayed narrower than the project's default workflow.

## Tests / Checks Run

- 

## RobDevPass Implementation Packet

For implementation handoffs, use `.agents/skills/robdev/SKILL.md` and `robdev.md`, then transfer the compact packet from Section 18 of `docs/dev/RobDevPass.md`: changed behavior and owning layer/producer/reused machinery; protected behavior, consumers, and non-goals; realistic risks and implemented failure/recovery states; deterministic evidence and unresolved owner judgment. For non-implementation handoffs, mark this section not applicable.

## RobQAPass Readiness

For implementation handoffs, use `.agents/skills/robqa/SKILL.md` and `robqa.md`, then complete the required readiness fields in Section 23 of `docs/qa/RobQAPass.md`. For non-implementation handoffs, mark this section not applicable.

## Not Touched

- 

## Follow-Up Recommendations

- 

## Next Suggested Agent

- Planning Architect / Kanban Steward / Documentation Steward / JSON Cartographer / Test Strategist
