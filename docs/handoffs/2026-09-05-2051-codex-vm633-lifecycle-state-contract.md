# VM-633 — Lifecycle State Contract and QA Ownership

Date: 2026-09-05
Agent: Codex (main implementation agent)
Related Card: [VM-633](../kanban/in-progress/VM-633-lifecycle-state-contract.md)
Related Plan: [Approved course correction](../plans/workflow-course-correction.md)
Status: Implementation prepared; exact-candidate independent QA pending.

## Task Requested

Implement Phase 1 of the Owner-approved course-correction plan with the agreed amendments. Stop after
independent engineering PASS at Owner Review; do not integrate or begin Phase 2 without the next gate.

## Preflight And Files Reviewed

- AGENTS, CLAUDE, both repo-local RobDev/RobQA skills and their usage guides, and both frozen governing
  passes (reviewed in the preceding planning turn; relevant passages rechecked against unchanged main).
- The workflow, PR template, board prompt, plan/test prompts, handoff template, board, and handoff index.
- VM-626 delivery, VM-627 Owner-Visual, VM-631 reporting, and VM-632 routing records; relevant VM-625
  integration and lifecycle-cleanup handoffs.
- Existing change-report validator, package test commands, and CI definition, read-only.
- Main baseline: `901c72d17d29128686d29e00f7db20fb126cb9ca`; clean worktree, one registered checkout,
  no related active branch. Existing VM-623, VM-625, and font-upgrade pointers are unrelated and preserved.

## Files Changed

The candidate is not yet committed in this preparation record. The authoritative material path list
will be generated from the baseline-to-candidate Git diff, not inferred from this narrative.

## What Changed

- Separated engineering PASS, pending Owner Review, Accepted, verified Integrated, and Done with
  closeout; retired active RobQA READY without rewriting historical records.
- Assigned implementation to RobDev, engineering evidence to RobQA, product/scope acceptance to the
  Owner, and lifecycle transitions to workflow.
- Added risk-based QA execution independence without broadening test scope: substantive governance
  requires a separate reviewer even when QA-0 document checks are sufficient.
- Preserved local review with optional consolidated evidence commits and a content-based materiality
  boundary; policy, acceptance criteria, fixtures, and assertions cannot hide in an evidence delta.
- Defined a minimal prospective card record using existing Markdown conventions; no executable schema,
  task CLI, generated view, migration, or QA runner was introduced.
- Updated direct consumers, including legacy Done shortcuts in CLAUDE and the board prompt. Saved the
  approved staged plan with the removal-accounting, small-model, and earned-runner amendments.

## Why It Changed

The accepted delivery workflow required RobQA PASS before Owner Review while the QA exit criterion
required completed Owner review for PASS. Lower-level Done shortcuts also allowed acceptance or tests to
stand in for integration. This phase removes those contradictions before adding execution tooling.

## Decisions Made

- The governing documents retain their separate owners; invocation layers link to those definitions.
- An integration-only obstacle preserves valid acceptance. A new correctness blocker stops delivery;
  material corrections require a new candidate and fresh affected QA/Owner decisions.
- Board and handoff-index updates remain manual until Phase 4 is accepted; future interfaces in the plan
  are explicitly prospective.
- Frozen source/semantic, CRIT, SIRF, exact-candidate, and Owner-Visual requirements are not weakened.
- This governance change uses independent QA even under the newly proposed risk-based policy.

## Phase Accounting

**Removes/replaces:** the competing RobQA READY/owner-dependent PASS decision, tests-or-confirmation Done
shortcuts, and unconditional separate QA for every bounded low-risk candidate. **Adds:** explicit lifecycle
meanings, one risk-based independence decision in RobQA, and a small prospective delivery record.
**Remaining manual judgment:** engineering evidence sufficiency, materiality of uncertain edits,
specialist judgments, and authentic Owner product/scope acceptance. Extra policy text is justified by
these demonstrated contradictions; the later thinning phase remains necessary and separately gated.

## RobDevPass Implementation Packet

- Changed behavior and owner: lifecycle semantics in workflow; engineering exit/independence in RobQA;
  implementation responsibility remains in RobDev. Direct consumers reference those owning definitions.
- Reused machinery: existing Markdown cards, handoffs, board, PR template, skill guides, and Git reporting
  validator. No runtime abstraction or new test framework.
- Protected behavior: source/producer truth, semantic/CRIT/SIRF independence, Owner-Visual and objective
  risk coverage, material-candidate approval, full PR scope, safe branch handling, and historical records.
- Consumers inspected: AGENTS, CLAUDE, skill usage, board/plan/test prompts, lifecycle commands, PR body,
  cards, and handoff readers. New governing behavior is confined to direct consumers.
- Relevant failure/recovery states: repeated rejection, pending/blocked integration, uncertain merge
  outcome, new correctness evidence, stale material candidate, permitted evidence delta, and deferred cleanup.
- Non-goals: Phases 2–8 implementation, product/runtime/data, browser/visual work, test code, protection
  activation, credentials, PR publication, integration, and unrelated branch cleanup.

## Development Validation

The following are manual document/state-transition walkthroughs, not an implemented state-machine test
suite or a claim of technical enforcement. Independent QA must review the exact candidate afresh.

| Scenario | Required document behavior |
|---|---|
| SHIP with green engineering evidence and no Owner review | PASS permits Owner Review; Owner remains PENDING. |
| Owner rejects candidate C1, then rejects corrected C2 | Same card/branch; preserve rejection history, correct again, and require new candidate QA/Owner binding. |
| Owner accepts C1; integration CI/network is blocked | Retain Accepted and record the integration obstacle; no second approval when the same valid candidate resumes. |
| Policy or fixture changes after acceptance | Material correction; prior binding stale even when the file is Markdown. |
| QA results appended after C1 | Inspect the bounded evidence delta and retain C1 only when it qualifies. |
| New correctness evidence appears without file edits | Revoke engineering PASS and stop delivery; historical acceptance cannot override the blocker. |
| Governance document versus ordinary bounded typo | Governance requires separate QA; a genuine low-risk typo may use a distinct same-agent phase. |
| Required independent reviewer is unavailable | BLOCKED; no self-review substitution. |
| Unrelated failing harness is the only changed-risk coverage | BLOCKED coverage gap; an unrelated label cannot manufacture objective evidence. |
| Merge outcome unknown versus verified merge | Unknown cannot be Integrated; verified merge can be Integrated while closeout remains. |
| Closeout complete but branch deletion is unsafe | Record why/whose cleanup is deferred; never delete dirty work or falsely claim deletion. |
| Historical READY/Done or deferred external research | Preserve historical meaning and external requirements; do not promote them through the new vocabulary. |

## RobQAPass Readiness

- QA tier: QA-0 document validation; substantive governance risk requires SEPARATE execution.
- Engineering verdict: PENDING until a separate reviewer inspects the committed candidate.
- Selected checks: scoped diff/whitespace, relative Markdown targets and new governing anchors, contextual
  contradiction review, card/board/reference consistency, and the transition walkthroughs above.
- CPU-heavy validation: NOT REQUIRED.
- Skipped: runtime, browser, screenshot, visual, Placement, semantic, CRIT, SIRF, broad regression, and
  full npm test; this phase changes policy rather than those implementations.
- Remaining Owner judgment: accept or reject the responsibility/state definitions and risk-based
  independence/evidence choices as implemented in this exact candidate.

## Tests / Checks Run

- Development relative Markdown target/new-anchor check: PASS across the changed documents, including
  existing board/index links. No missing target or anchor found.
- VM-633 uniqueness, board section, and permitted changed-path check: PASS.
- `git diff --check`: PASS before staging; repeat on the committed candidate for exact-state evidence.
- Contextual contradiction search: repaired the remaining direct Done shortcuts in CLAUDE and the board
  prompt; historical RobQA READY remains explicitly historical rather than an active verdict.
- Manual development walkthrough of the transition scenarios above: PASS against the revised governing
  text. These findings are not an independent QA verdict or a runtime enforcement claim.

## Risks / Uncertainties

This phase is process governance, not deterministic enforcement. Admission checks, generated indexes,
live capability routing, stronger Git validation, CI/protection changes, and test execution selection
remain future phases. Historic full-index requirements and the deferred protection narrative remain
until their bounded successor work; no claim is made that those problems are already solved.

## Not Touched

Product HTML/CSS/JavaScript, authored/generated data, source claims, Placement, certification records,
browser harnesses, npm/CI configuration, credentials, GitHub settings, historical handoffs/cards, and
unrelated retained branches.

## Follow-Up Recommendations

Owner Review of VM-633. If accepted, integrate this exact candidate under the existing delivery path;
only then admit Phase 2. VM-632 remains the later routing card and is not implemented here.

## Next Suggested Agent

Independent RobQA reviewer for the committed VM-633 candidate, followed by the Owner.
