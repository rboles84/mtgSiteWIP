# VM-626 Owner Iteration Before PR Integration Amendment

Date: 2026-09-03 18:14 MDT

Status: **RobDev candidate ready; exact-candidate RobQA pending**

## Agent Name

Codex

## Task Requested

Amend the accepted VM-626 delivery workflow so committed local feature-branch candidates move through repeatable RobDev -> exact-candidate RobQA -> Owner Review loops before a PR becomes mandatory. After exact-SHA Owner ACCEPT, use the single PR for CI and integration, invalidate both QA and acceptance after any material change, and preserve every other VM-626 decision and the in-flight VM-625 implementation.

## Pre-Flight Summary

- **Recent related work:** VM-626 established the accepted delivery vocabulary and was squash-merged through PR #21. Its prior workflow required a PR before RobQA and Owner Review. VM-625 now has a committed Owner Review candidate at `0ade00a7a1fc692bc33919efc7e8f44780562fbe` in the separate primary worktree.
- **Current known risks:** editing broad governance text could accidentally weaken one-branch/one-PR discipline, exact-SHA evidence, integration checks, the no-direct-feature-push rule, deferred protection, or the VM-625 guardrail.
- **Relevant decisions already made:** local exact-candidate Owner iteration is now the default; repeat rejection is normal; PR creation is mandatory after ACCEPT unless a concrete engineering reason justifies an earlier Draft; material post-accept changes require a new RobDev -> RobQA -> Owner Review loop.
- **Files recently changed:** VM-626 previously changed `AGENTS.md`, `docs/reference/workflow.md`, `.github/pull_request_template.md`, its card/board, and handoffs only.
- **Do not touch:** VM-625 product files/worktree, application/runtime/data/generated files, `.github/workflows`, frozen RobDev/RobQA gates, GitHub settings, or `main` protection/rulesets.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md` and `.agents/skills/robdev/robdev.md`
- `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md` and `.agents/skills/robqa/robqa.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/reference/workflow.md`
- `.github/pull_request_template.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-626-standard-branch-pr-qa-owner-merge-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-626 implementation, independent-RobQA, and accepted-closeout handoffs
- Current worktrees, relevant branches, `main`, and VM-625 candidate state

## Files Changed

- `AGENTS.md`
- `docs/reference/workflow.md`
- `.github/pull_request_template.md`
- Moved `docs/kanban/done/VM-626-standard-branch-pr-qa-owner-merge-workflow.md` back to `docs/kanban/in-progress/VM-626-standard-branch-pr-qa-owner-merge-workflow.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-03-1814-codex-vm626-owner-iteration-amendment.md`

## What Changed

- Reframed the standard lifecycle as branch -> RobDev -> exact candidate commit -> RobQA -> repeatable Owner Review -> ACCEPT -> PR -> CI/integration -> squash merge -> cleanup.
- Changed `SHIP` to stop at a committed, exact-SHA RobQA-passed Owner Review candidate without requiring a push or PR.
- Changed `REJECT` to keep the same card and branch, create and re-QA a corrected commit, and repeat without Owner Git/PR administration.
- Changed `ACCEPT` to begin the push/PR/CI/integration phase and to avoid a second Owner approval while implementation remains exactly accepted.
- Added an explicit stale-evidence rule for all material changes after RobQA PASS or Owner ACCEPT.
- Kept earlier Draft PRs optional for concrete engineering needs and preserved existing in-flight PRs rather than forcing recreation.
- Updated the PR template to record normal post-ACCEPT timing or a justified early Draft and to verify accepted implementation bytes.
- Reopened the existing VM-626 card for this amendment instead of inventing a new framework or card.

## Why It Changed

Actual Owner usage involves several technically valid candidates being rejected during visual/product review. Requiring PR preparation for every such candidate adds integration ceremony to the normal product loop. The amendment leaves Git and QA ownership with agents while preserving the PR as the single durable integration artifact after acceptance.

## RobDev Compact Packet

- **Repository outcome:** an Owner can reject a candidate repeatedly while agents retain the same card/branch, commit each correction, bind RobQA to each exact candidate, and return for review; only acceptance starts mandatory PR integration.
- **Current behavior:** the accepted text requires commit/push/PR before RobQA and treats Owner Review as PR readiness.
- **Owning authority and producer:** explicit Owner amendment, hand-authored `AGENTS.md`, `docs/reference/workflow.md`, PR template, Kanban, and handoffs.
- **Existing machinery reused:** the three VM-626 commands, one-card/one-branch/one-PR model, exact-SHA evidence, RobDev/RobQA gates, PR template, CI, squash merge, and lifecycle exception.
- **Changed behavior:** only PR timing, repeat-rejection semantics, and the post-accept stale-approval path.
- **Protected behavior:** `main`, short-lived branches, one branch/card/PR, independent RobQA, exact-candidate binding, existing CI and protection strategy, squash default, cleanup, no GitFlow/develop, no direct feature pushes, one Owner approval, and all VM-625 implementation.
- **Consumers:** future agents executing commands, Owner review handoffs, PR authors/reviewers, existing in-flight cards/PRs, and integration operators.
- **Realistic regressions:** silently making PRs mandatory before review, losing existing PRs on rejection, merging material post-accept changes under stale approval, requiring the Owner to manage Git, or weakening preserved VM-626 controls.
- **Smallest complete implementation:** concise changes to the command summary, detailed workflow, PR template, existing card/board, and required handoff/index.
- **Non-goals:** no orchestration framework, new CI, settings mutation, protection activation, runtime/product changes, VM-625 implementation work, new card, or PR creation for this pre-accept candidate.
- **Stop conditions:** stop on conflict with frozen gates, preserved VM-626 decisions, current VM-625 state, or any need to change GitHub settings/runtime behavior.

## RobQA Readiness

- **QA tier:** QA-0 — documentation, template, and non-runtime workflow metadata.
- **Changed behavior:** delivery-command semantics and PR timing only.
- **Protected behavior intentionally untouched:** application/runtime/data/generated behavior; CI workflow bytes; frozen RobDev/RobQA gates; GitHub settings and protection; VM-625 product branch/worktree/candidate; all enumerated preserved VM-626 decisions.
- **Tests selected:** exact changed-file boundary; required semantic assertions for SHIP/REJECT/ACCEPT, repeatability, optional early Drafts, existing-PR reuse, stale approval, and VM-625 treatment; preservation assertions; relative links; `git diff --check`; branch/base/worktree state.
- **Tests intentionally skipped:** runtime, browser, rendered, placement, journey, synthetic, mutation, recovery, and exhaustive suites because this amendment changes no product/runtime/CI behavior.
- **CPU-heavy validation:** `NOT REQUIRED`.
- **Self-QA rendered evidence:** not applicable; there is no rendered product change.
- **Manual findings converted to invariants:** the Owner finding is that PR creation before repeated visual/product decisions is unnecessary friction. The durable invariant is that a PR is not mandatory for Owner Review, while any material post-accept change invalidates both QA and acceptance.
- **Remaining Owner judgment:** accept, reject, or refine the amended command semantics after exact-candidate RobQA.
- **Owner review path:** read the three command blocks in `AGENTS.md`, then the detailed `SHIP`, `REJECT`, `ACCEPT`, PR timing, stale-evidence, and VM-625 clauses in `docs/reference/workflow.md`.

## Decisions Made

- This is an amendment to VM-626, so the existing card is reopened rather than creating a new card or orchestration layer.
- The existing isolated VM-626 worktree is reused. The original VM-626 branch was already integrated and deleted, so one new amendment branch is necessary and no competing related branch/worktree exists.
- An early Draft PR remains allowed only for a concrete engineering purpose and must be reused if already present.
- Non-material evidence/lifecycle commits remain governed by the existing exception and cannot conceal implementation changes.

## Risks / Uncertainties

- A post-candidate evidence-only commit can make branch HEAD differ from the exact material candidate SHA. Integration must compare implementation bytes to the accepted candidate and identify later commits as non-material rather than pretending SHA equality.
- `main` protection remains intentionally deferred while VM-625 is in flight; this amendment does not decide its transition state.

## Tests Run

- Pre-edit worktree/branch inspection: PASS. No active VM-626 branch existed; the clean isolated worktree was on current `main` at `d59a1110d1a5f5914e28dfc8296b9c915c7accff`.
- VM-625 isolation check: PASS. The primary worktree remained on `codex/vm-625-public-identity-atlas` at `0ade00a7a1fc692bc33919efc7e8f44780562fbe` and was not edited.
- Final exact-candidate QA: pending until the stable amendment candidate is committed.

## Not Touched

- VM-625 files, branch, worktree, candidate, tests, card, or product implementation
- Application/runtime/product/data/test/generated files
- `.github/workflows`
- `.agents/skills/robdev/`, `docs/dev/RobDevPass.md`, `.agents/skills/robqa/`, or `docs/qa/RobQAPass.md`
- GitHub repository settings, merge methods, automatic cleanup, `main` protection, or rulesets
- Any existing PR or unrelated card/branch

## Follow-Up Recommendations

1. Commit this stable governance candidate locally without opening a PR.
2. Run independent QA-0 RobQA against that exact commit and record its SHA-bound disposition as non-material evidence.
3. Stop for Owner Review with the exact candidate SHA and no PR requirement.
4. On Owner rejection, use this same branch and correction loop; on Owner acceptance, push/open the single PR and run integration checks.

## Next Suggested Agent

Independent RobQA reviewer for the exact committed amendment candidate, followed by the Product Owner.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-626-standard-branch-pr-qa-owner-merge-workflow.md`
- `docs/reference/workflow.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `docs/handoffs/2026-09-03-1726-codex-vm626-team-delivery-workflow.md`
- `docs/handoffs/2026-09-03-1734-codex-vm626-independent-robqa.md`
- `docs/handoffs/2026-09-03-1752-codex-vm626-owner-accepted-closeout.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
