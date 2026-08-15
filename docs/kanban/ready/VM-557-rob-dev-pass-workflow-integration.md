# VM-557 - RobDevPass Workflow Integration

ID: VM-557

Status: Ready - implementation complete locally; pending durability

Type: Documentation / workflow governance

Area: Development workflow, agent instructions, implementation handoff

Priority: High

Created: 2026-08-15

## Summary

Adopt `docs/dev/RobDevPass.md` as Vox Mana's single repository-grounded implementation authority and connect it concisely to the existing preflight, planning, workflow, and handoff surfaces without duplicating its policy or changing RobQAPass responsibilities.

## Source

- Owner-approved Vox Mana RobDevPass draft and targeted authority/failure-state reconciliation.
- VM-556's successful single-authority, concise-reference, two-step durability pattern.

## RobDevPass Contract

- Owning layer: repository agent and workflow instruction surfaces.
- Authoritative producer: `docs/dev/RobDevPass.md`; all other changes are invocation points.
- Existing machinery reused: `AGENTS.md`, intentionally maintained `CLAUDE.md`, preflight and plan prompts, standard workflow, and handoff template.
- Changed behavior: agents ground implementation through RobDevPass before editing and transfer its compact implementation packet to RobQAPass.
- Protected behavior: RobQAPass test selection, project-specific QA commands, runtime behavior, data/source contracts, placement/scoring/identity authority, CECOS, CRIT-001, and the non-editing WebDev Helper.
- Non-goals: no second developer framework, no runtime work, no test-policy rewrite, and no duplication of the 22-section authority.
- Stop conditions: any required policy restatement, product behavior change, or specialist-authority weakening.

## QA Classification

- QA tier: QA-0 documentation/workflow metadata.
- Realistic risks: accidental policy duplication, blurred RobDevPass/RobQAPass ownership, or inappropriate invocation from the non-editing WebDev Helper.
- Deterministic evidence: link/reference resolution, changed-file scope, duplication review, targeted history confirmation for `CLAUDE.md`, and `git diff --check`.
- CPU-heavy validation: `NOT REQUIRED`.

## Acceptance Criteria

- `docs/dev/RobDevPass.md` is the single complete governing v1 authority.
- `AGENTS.md` invokes RobDevPass concisely before implementation.
- `CLAUDE.md` invokes the same contract only in its maintained developer/planning guidance.
- Preflight establishes proportional repository grounding and the pre-edit contract.
- Planning identifies the owning layer and producer, existing machinery, changed/protected behavior, blast radius, non-goals, and stop conditions.
- Workflow shows `RobDevPass -> implementation -> RobQAPass` within the full owner sequence.
- The handoff template transfers the compact implementation packet without restating the gate.
- `.codex/prompts/webdev.md` remains unchanged.
- RobQAPass remains the sole QA scope-selection and owner-acceptance authority.
- QA-0 checks pass and no runtime or heavyweight suite is run.
- The card remains Ready while uncommitted and moves to Done only after the integration is durably committed.

## Files Likely Impacted

- `docs/dev/RobDevPass.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.codex/prompts/preflight.md`
- `.codex/prompts/plan.md`
- `docs/reference/workflow.md`
- `docs/handoffs/templates/agent-handoff-template.md`
- Kanban board and handoff records

## Risks

- Repeating RobDevPass details across instruction surfaces would create drift.
- Pulling QA selection into RobDevPass would create conflicting ownership with RobQAPass.
- Invoking an implementation gate from the teaching-only WebDev Helper would misstate that helper's role.
- Marking the card Done before commit durability would repeat the state ambiguity resolved in VM-556.

## Implementation Prompt

Activate the approved RobDevPass draft as the single implementation authority. Add only concise, role-appropriate references to the existing agent, preflight, planning, workflow, and handoff surfaces. Preserve RobQAPass and every specialist authority, leave the WebDev Helper untouched, validate at QA-0, and close the card only after durability.

## Notes

- Continue on the current `main` worktree; do not create a branch or worktree.
- No runtime, browser, placement, journey, synthetic, mutation, recovery, parser, build, or other heavyweight suite is authorized or necessary.

## Completion

- The approved draft is activated and the intended concise invocation surfaces are implemented locally.
- QA-0 link/reference, scope, policy-duplication, unchanged-WebDev, and whitespace checks passed.
- No runtime or heavyweight suite was run.
- The integration remains Ready until committed durability exists.
