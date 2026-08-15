# Agent Handoff: Codex - RobDevPass Workflow Integration

Date: 2026-08-15 17:34 MDT

Related Card: VM-557

Related Plan: Owner-directed integration-only scope following the VM-556 durability pattern

Status: Complete; governing integration committed at `bfbf436`

## Task Requested

Integrate the approved Vox Mana `RobDevPass.md` as the single governing implementation authority through concise references in the existing development workflow, then freeze RobDevPass and RobQAPass at v1.

## Files Reviewed

- `AGENTS.md` and intentionally maintained `CLAUDE.md`
- `.codex/prompts/{preflight,plan,test,webdev}.md`
- `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
- `docs/handoffs/templates/agent-handoff-template.md`, `docs/handoffs/HANDOFF_INDEX.md`, and the VM-556 integration handoff
- `docs/kanban/board.md` and the VM-556 integration card
- Targeted Git history for `CLAUDE.md`, VM-556, and current branch/worktree durability state

## Files Changed

- Activated `docs/dev/RobDevPass.md` as the governing frozen v1 authority.
- Updated `AGENTS.md` and the maintained planning guidance in `CLAUDE.md`.
- Updated `.codex/prompts/preflight.md` and `.codex/prompts/plan.md`.
- Updated `docs/reference/workflow.md` and `docs/handoffs/templates/agent-handoff-template.md`.
- Added VM-557 in Ready, updated the board, added this handoff, and updated the handoff index.

## What Changed

- Inserted RobDevPass before implementation and RobQAPass after implementation in the standard flow.
- Made preflight and planning capture the owning layer and producer, reusable machinery, changed and protected behavior, consumers/blast radius, relevant states, smallest complete implementation, non-goals, and stop conditions.
- Added the compact implementation packet to handoffs while retaining RobQAPass as the QA authority.
- Froze both v1 gates so future edits must respond to demonstrated project friction or a repeated missing rule.

## Why

Vox Mana now has complementary single authorities for competent implementation judgment and proportional owner-QA. Concise invocation lets agents use both gates without creating a second workflow or policy drift.

## Decisions Made

- Reused the exact VM-556 governance pattern on the existing synchronized `main` worktree.
- Kept `.codex/prompts/webdev.md` unchanged because the WebDev Helper is a non-editing teaching role.
- Kept test selection, suites, and owner-acceptance preparation entirely under RobQAPass.
- Kept VM-557 Ready while the work was local and uncommitted, then moved it to Done only after integration commit `bfbf436` existed.

## Risks / Uncertainties

- No blocking risk remains. Future changes to either v1 gate should be driven by demonstrated project work rather than anticipatory ceremony.

## Efficiency / Escalation Notes

- Used a targeted integration review and QA-0 checks only; no broad historical sweep or runtime discovery was repeated.

## Tests / Checks Run

- Repository-relative links from `docs/dev/RobDevPass.md`: PASS.
- Single-authority search for distinctive RobDevPass sections/calibration: PASS; only the authority contains the complete policy.
- Invocation review across `AGENTS.md`, `CLAUDE.md`, preflight, planning, workflow, and handoff template: PASS; references are role-specific and bounded.
- `.codex/prompts/webdev.md` and `.codex/prompts/test.md` unchanged check: PASS.
- Changed-file scope review: PASS; instruction/documentation/Kanban/handoff files only.
- `git diff --check`: PASS.

## RobDevPass Implementation Packet

- Changed behavior and owner/producer/reuse: agent implementation grounding now invokes the single `docs/dev/RobDevPass.md` authority through existing instruction surfaces.
- Protected behavior, consumers, and non-goals: RobQAPass ownership, specialist contracts, runtime/product behavior, WebDev Helper teaching scope, and active VM-552 remain unchanged; no parallel framework or policy copy was created.
- Realistic risks and implemented states: policy duplication and gate-boundary ambiguity were controlled through short references; Ready versus Done records local versus durable state.
- Deterministic evidence and unresolved judgment: all selected QA-0 checks passed; no product judgment remains beyond review of the integration wording.

## RobQAPass Readiness

- QA tier: QA-0.
- Changed behavior: documentation and agent workflow invocation before implementation.
- Protected behavior: runtime, generated data, placement/scoring/routing, identity/evidence authority, CECOS, CRIT-001, project-specific tests, and active VM-552.
- Tests selected: reference resolution, changed-file scope, policy-duplication review, `webdev.md` exclusion, and `git diff --check`.
- Tests intentionally skipped: all runtime, browser, placement, journey, synthetic, mutation, recovery, parser, build, and heavyweight suites because no protected runtime behavior changed.
- CPU-heavy validation: `NOT REQUIRED`.
- Rendered self-QA: not applicable to QA-0 instruction/documentation work.
- Remaining owner judgment: review of the concise integration diff only.

## Not Touched

- `.codex/prompts/test.md` and `.codex/prompts/webdev.md`
- Runtime code, tests, data, generated artifacts, placement/scoring, CECOS, CRIT-001 records, deployment, and VM-552
- Git branches/worktrees

## Follow-Up Recommendations

- Use the frozen v1 sequence: `Request -> RobDevPass -> implementation -> RobQAPass -> owner judgment -> integration`.
- Change either gate only when real work demonstrates a repeated missing rule or unnecessary friction.

## Next Suggested Agent

- Normal implementation owner; no dedicated follow-up agent is required after durability.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-557-rob-dev-pass-workflow-integration.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
