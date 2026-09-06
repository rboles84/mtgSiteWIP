# VM-633 — Lifecycle State Contract and QA Ownership

ID: VM-633
Title: Lifecycle State Contract and QA Ownership
Status: Done
Type: Repository governance
Area: Delivery workflow, RobDev, RobQA, Owner Review
Priority: High
Created: 2026-09-05

## Summary

Implement Phase 1 of the [approved course-correction plan](../../plans/workflow-course-correction.md):
remove the circular RobQA PASS/Owner gate and give engineering, acceptance, integration, and completion
distinct meanings. Preserve local review, proportionate testing, and stricter specialist controls.

## Source

The Owner approved the course-correction plan and amendments in the current task on 2026-09-05 and
authorized implementation. This is implementation authority, not acceptance of the eventual candidate.
Related accepted work: VM-626 delivery, VM-627 Owner-Visual, VM-631 Git reporting. VM-632 stays separate.

## Acceptance Criteria

- [x] Engineering PASS can precede Owner Review; active READY/PASS definitions no longer compete.
- [x] Owner acceptance, verified integration, and completed closeout are distinct; an integration-only
  blockage preserves valid candidate acceptance.
- [x] A material implementation, governance, acceptance-criteria, or test-contract change invalidates
  affected QA/Owner evidence and returns a new candidate through the same task's loop.
- [x] RobDev owns implementation, RobQA owns engineering evidence, the Owner owns product/scope
  acceptance, and workflow owns lifecycle.
- [x] Separate QA execution remains required for governance/shared/protected/high-risk work; bounded
  low-risk work may use a distinct same-agent candidate QA phase without weaker evidence.
- [x] Local Owner Review and optional, narrowly scoped durable evidence commits are explicit.
- [x] A minimal prospective task metadata contract is defined without implementing a parser, database,
  generated index, test runner, or migration.
- [x] Direct instruction consumers and PR evidence agree with the governing definitions.
- [x] Independent exact-candidate QA covers transition scenarios and relevant document checks.
- [x] The handoff contains the agreed removal/addition/manual-judgment accounting.

## Files Likely Impacted

Governing workflow and RobQA exit criteria; RobDev ownership pointer; direct skill usage guidance;
AGENTS delivery invocation; PR template; this card, board, approved plan, and current handoff evidence.

## Risks And Protected Behavior

This is material governance, despite being Markdown. Protect exact-candidate acceptance, source/producer
ownership, CRIT/SIRF and semantic independence, objective coverage, Owner-Visual, one-task branch
discipline, and Git-derived reporting. Do not reinterpret historical READY/PASS or Done records.

## Implementation Prompt

Apply RobDev and RobQA. Use one branch in the existing clean checkout from accepted main. Reconcile the
direct policy consumers, verify transitions and links, commit a stable candidate, obtain separate QA,
and stop at Owner Review. Correct ordinary QA findings on this same branch. Do not push, open a PR,
merge, activate protection, or implement Phase 2 before the required acceptance gate.

## Delivery

Record version: 1
Branch: codex/vm-633-lifecycle-state-contract
Admission baseline: 901c72d17d29128686d29e00f7db20fb126cb9ca
Candidate: 73b37aa1c230c8eb5404d1652230421f89149bb2
RobQA: PASS at 73b37aa1c230c8eb5404d1652230421f89149bb2; [independent evidence](../../handoffs/2026-09-05-2105-independent-robqa-vm633-lifecycle-state-contract.md).
Owner: ACCEPTED for 73b37aa1c230c8eb5404d1652230421f89149bb2 by explicit Owner ACCEPT on 2026-09-05; [decision and closeout](../../handoffs/2026-09-05-2129-codex-vm633-owner-approved-integration.md).
Integration: INTEGRATED through [PR #27](https://github.com/rboles84/voxmana.io/pull/27), squash merge ae4d650f7aa9f27d5f620548d41a4e33a943d037; required Deterministic Validation passed. Main synchronized; local and remote feature branches removed.
Dependencies: None; VM-626, VM-627, and VM-631 are integrated context.
Decisions: See Source and the approved plan.
Evidence: [Main handoff](../../handoffs/2026-09-05-2051-codex-vm633-lifecycle-state-contract.md), [independent QA](../../handoffs/2026-09-05-2105-independent-robqa-vm633-lifecycle-state-contract.md), and [integration closeout](../../handoffs/2026-09-05-2129-codex-vm633-owner-approved-integration.md).

## Notes

- Preflight: one registered worktree, clean main, no related active branch; existing VM-623, VM-625, and
  font-upgrade pointers are unrelated and preserved.
- QA: QA-0 document verification with separate execution because policy risk is substantive.
- Initial stop was exact-candidate engineering PASS and bounded Owner Review. The Owner subsequently
  accepted that candidate and authorized integration; the required gates and lifecycle closeout are complete.
- Independent review found no material correctness defect. PR evidence head
  `736645803e9c8e620a2d20ae7a7635d066ff90b2` passed CI, and its complete tree matches the verified squash
  merge. Subsequent changes only record lifecycle outcomes and update live references.
- Phase 2 remains unstarted. No follow-on branch or implementation was begun during closeout.
