# VM-633 Independent RobQA — Lifecycle State Contract

Date: 2026-09-05 21:05 local repository clock
Agent: Codex independent RobQA reviewer (`vm633_independent_qa`)
Related card: [VM-633](../kanban/done/VM-633-lifecycle-state-contract.md)
Related plan: [Workflow course correction](../plans/workflow-course-correction.md)
Verdict: **Engineering PASS** for `73b37aa1c230c8eb5404d1652230421f89149bb2`.
At the independent review: Owner acceptance **PENDING**; integration **PENDING**.
Later delivery outcome: see the [main agent's integration closeout](2026-09-05-2129-codex-vm633-owner-approved-integration.md).
The review observations and recommendations below remain the review-time record; the reviewer did not
execute the subsequent acceptance or integration.

## Task Requested

Independently review the exact Phase 1 material candidate against baseline
`901c72d17d29128686d29e00f7db20fb126cb9ca`. Inspect actual committed changes and risk-proportional evidence
without trusting the implementation handoff, changing candidate files, or executing later phases.

## Preflight And Files Reviewed

- Read both repo-local RobDev and RobQA skills and usage guides, and both full governing passes.
- Reviewed the actual baseline-to-candidate Git diff, AGENTS, CLAUDE, the workflow, PR template, board
  prompt, plan/test prompts, and existing handoff template.
- Reviewed the approved course-correction plan, current VM-633 card and implementation handoff, relevant
  board/index entries, and the related VM-626, VM-627, and VM-632 cards.
- Reviewed the VM-626 local Owner-iteration amendment, VM-627 Owner-Visual implementation, and VM-631
  Git-authoritative reporting handoffs, plus the token/reasoning policy.
- Recent related work established local Owner Review, Owner-Visual, and Git-derived reporting. The
  contradiction was that engineering readiness and completed Owner acceptance shared competing PASS
  definitions. Relevant recently changed surfaces were workflow/AGENTS/PR evidence, QA policy/invocation
  guides, and Git-reporting governance.
- Protected boundaries: source/producer ownership, semantic/CRIT/SIRF independence, actual objective
  coverage, exact-candidate consent, branch safety, historical evidence, and phased delivery.
- Git confirmed HEAD was the assigned candidate, its merge base with local main was the assigned
  baseline, and the worktree was clean before this reviewer authored evidence.

## Files Changed

Only this independent QA evidence record was authored by this reviewer. Candidate files were not edited.
The main implementation handoff owns the complete Git-derived task accounting and index update.

## What Changed And Why

This record supplies a separately executed engineering verdict for the material governance candidate.
The reviewer did not implement that candidate. It records independently observed document behavior and
focused checks; it is not runtime state-machine enforcement or Owner acceptance.

## Review Classification

- QA tier: **QA-0** document/content verification.
- Execution: **SEPARATE**, because the change alters substantive delivery and QA governance.
- Governing method: [RobQA skill](../../.agents/skills/robqa/SKILL.md), its usage guide, and
  [RobQAPass](../qa/RobQAPass.md); [RobDev](../dev/RobDevPass.md) supplied the implementation boundary.
- Changed behavior: engineering PASS, lifecycle state ownership, exact acceptance/invalidation,
  evidence materiality, and risk-based QA execution independence.
- Protected behavior: Owner visual/product judgment and required objective evidence; specialist
  reviews; canonical source truth; one-task branch discipline; full PR scope; historical decisions.
- RobDev implementation packet: no implementation was performed by this reviewer. The candidate's
  compact packet was inspected against the actual diff and controlling plan.

## Checks Executed Independently

| Check | Reason | Observed result |
|---|---|---|
| Committed baseline-to-candidate diff and full changed-policy reading | Determine actual behavior, scope, and consumers rather than trust the development summary. | PASS. The changed rules and invocation consumers match Phase 1 and the approved amendments; no later-phase executable machinery is present. |
| `git diff --check 901c72d17d29128686d29e00f7db20fb126cb9ca..73b37aa1c230c8eb5404d1652230421f89149bb2` | Detect whitespace defects in the exact reviewed state. | PASS. |
| Temporary in-memory Node link/anchor check using `git show` at the candidate | Prove the changed governance and new records route to actual repository authorities. | PASS: 67 relative links and 26 Markdown anchors resolve. For the large existing board/index, only newly added lines were checked. Remote URLs were not fetched. |
| Committed card lookup and board-section comparison | Detect duplicate VM-633 identity or stale placement at candidate QA. | PASS: one VM-633 card; In Progress matches the active board. Candidate/QA/Owner fields correctly remain pending in the pre-QA material record. |
| Git changed-path inspection | Protect runtime, semantic, historical, CI, and later-phase scope. | PASS: every changed path is Markdown; the actual diff confirms existing historical board/index content is preserved and no runtime/test/configuration machinery changes. |
| Contextual active-consumer search and inspection | Find competing current READY/PASS, Done, independence, or visual rules. | PASS: active READY references distinguish RobDev/intake/history, and direct consumers defer to the owning lifecycle/QA definitions. Historical review claims were not reinterpreted. |
| Candidate/worktree identity check after review | Ensure the verdict still applies to the inspected material. | PASS: HEAD remained the assigned candidate; no material working-tree differences were present before this evidence record. |

## Adversarial Document Scenarios

These are independent manual walkthroughs of operative text, not executable simulations.

| Scenario | Required and observed disposition |
|---|---|
| Engineering evidence is sufficient, Owner has not reviewed | RobQA PASS permits Owner Review while Owner stays PENDING. The governing exit criteria and SHIP agree. |
| C1 rejected, corrected C2 rejected again | Same card/branch; retain prior decisions, create a corrected candidate, repeat proportionate QA, and return to Owner Review. No new PR is required for iteration. |
| Exact C1 accepted; CI/network/permission prevents integration | Card stays Accepted with a separate integration obstacle. Resuming the same valid candidate does not request another approval. |
| Previously accepted C1 gains a newly discovered correctness blocker without file changes | Engineering PASS can be revoked and delivery stops. Historical acceptance cannot bypass the blocker. |
| A policy sentence, acceptance criterion, fixture, or assertion changes after PASS/ACCEPT | Material candidate loop applies even for Markdown. Prior affected QA/Owner binding becomes PENDING rather than surviving by file extension. |
| QA result or unchanged criterion disposition is appended after C1 | Narrow evidence exception may preserve C1, subject to content/diff validation and separate evidence accounting. Authentic Owner consent cannot be authored by the agent. |
| Governance document versus bounded ordinary typo | Governance requires a reviewer who did not implement the candidate. A genuinely low-risk typo may use a distinct committed-candidate same-agent phase. Evidence sufficiency is unchanged. |
| Required independent reviewer is unavailable | BLOCKED; no self-review substitution. Stricter semantic/certification separation remains controlling. |
| Unrelated failing harness is the sole coverage for changed objective behavior | Coverage gap is BLOCKED until appropriate evidence resolves it. The unrelated-failure allowance cannot manufacture evidence or transfer objective risk to subjective approval. |
| Merge was requested but response/outcome is unknown | Not Integrated until merge/resulting commit is verified. Acceptance alone cannot produce Done. |
| Merge verified, closeout not finished | Integrated stays distinct from Done. Main sync, records, and clean worktree remain required. Unsafe cleanup is explicitly deferred with reason/ownership rather than falsely claimed or forced. |
| Legacy READY/Done, or non-delivery research/certification | Historical meaning is preserved. Explicit non-delivery acceptance and specialist requirements cannot be replaced by a repository merge. |

## Findings And Decisions

No actionable blocker or major correctness inconsistency was found in this candidate. Engineering PASS
is supported by the actual document diff, working links, distinct transition meanings, and preserved
specialist boundaries. No candidate correction is required by this review.

The plan's amendments are retained: removal/addition/manual-judgment accounting uses the existing
handoff; the future metadata/commands are bounded; a QA runner must earn its addition. The Phase 1
metadata is explicitly prospective and does not pretend to implement admission, generated state, or
task tooling. Substantive policy changes are correctly treated as material.

## Risks / Uncertainties

- This phase changes operating instructions, not deterministic enforcement. Later admission, routing,
  generated indexing, delivery validation/protection, and test-selection tooling remain unimplemented.
- The existing workflow's dated VM-625/protection narrative and historical index format remain known
  future-phase work. They do not authorize Phase 1 to activate protection or reinterpret old records.
- Local Markdown target checks do not establish live GitHub rendering, remote CI, mergeability, or
  publication. PR evidence must be populated with actual candidate/decision references at integration.
- Git warned that the global ignore file was inaccessible. The repository commands completed and
  reported no candidate or worktree discrepancy; no global configuration was changed.

## Tests Intentionally Skipped

CPU-heavy validation: **NOT REQUIRED**. No browser, screenshot, visual regression, application runtime,
Placement, semantic, CRIT, SIRF, broad npm test, build, or production integration suite was run. Those
implementations are unchanged and do not verify the changed policy. No implementation-mirroring prose
test suite or persistent QA script was added.

## Remaining Owner Judgment And Review Path

Review [workflow responsibility, lifecycle, and evidence definitions](../reference/workflow.md#responsibility-boundaries)
and [RobQA independence](../qa/RobQAPass.md#qa-execution-independence), then the
[engineering exit criteria](../qa/RobQAPass.md#24-robqapass-exit-criteria).

Judge whether the implemented separation and optional-evidence/low-risk-review choices match the
accepted operating intent. Accept or reject VM-633 at the exact candidate named above. No product-page
or subjective screenshot review is needed for this governance change. Owner acceptance remains pending.

## Not Touched

Candidate files, staging, commits, branches/worktrees, remote publication, PRs, merges, main, protection,
credentials, runtime/data, tests, historical review records, and later-phase implementation.

## Follow-Up Recommendations

The main agent should incorporate this evidence reference, update the existing card/index and handoff,
validate the bounded evidence delta, and stop at Owner Review. Integrate only after exact-candidate
Owner acceptance; do not begin Phase 2 before that integration.

## Next Suggested Agent

Main delivery agent for evidence closeout, then the Owner for the bounded acceptance decision.
