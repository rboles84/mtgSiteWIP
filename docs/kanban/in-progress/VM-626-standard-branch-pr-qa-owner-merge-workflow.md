# VM-626 - Standard Branch, PR, QA, Owner, and Merge Workflow

ID: VM-626

Title: Standard Branch, PR, QA, Owner, and Merge Workflow

Status: In Progress — Owner Iteration Amendment

Type: Repository governance / delivery workflow

Area: Git, GitHub, agent instructions, CI delivery

Priority: High

Created: 2026-09-03

## Summary

Establish a conventional small-team delivery path:

`main -> short-lived card branch -> RobDev -> exact candidate commit -> RobQA -> repeatable Owner Review -> Owner ACCEPT -> one PR -> CI -> squash merge -> branch cleanup`

Make `SHIP VM-###`, `ACCEPT VM-###`, and `REJECT VM-###: <reason>` durable repository vocabulary without replacing the existing card, RobDev, RobQA, Owner Review, semantic-authority, or handoff systems.

## Source

- Owner start prompt supplied 2026-09-03.
- Owner amendment prompt supplied 2026-09-03 after real Owner-review usage showed that PR creation occurred too early for repeated product iteration.
- Existing branch/worktree authority in `AGENTS.md`.
- Existing lifecycle authority in `docs/reference/workflow.md`.
- Existing RobDev and RobQA gates and VM-622 Owner-first policy.

## Locked Decisions

- Do not activate new `main` protection/rulesets before this candidate has RobQA PASS and Owner acceptance.
- Do not place VM-625 under new integration governance while it still relies on the previous accepted process.
- Automatic deletion of merged feature branches is safe to enable during setup.
- Inspect and document the exact proposed protection now; activate it only after the acceptance and VM-625 transition gates are satisfied.

## Acceptance Criteria

- [x] A fresh repository session can discover and correctly execute `SHIP`, `ACCEPT`, and `REJECT`.
- [x] Material cards use current `main`, one short-lived card branch, and normally one PR.
- [x] RobDev prepares and commits a stable Owner Review candidate without merging or pushing feature work directly to `main`; a PR is not required before Owner Review.
- [x] RobQA independently reviews the exact committed candidate and binds PASS to its SHA, whether or not a PR exists yet.
- [x] Ordinary Dev/QA and repeated Owner-rejection corrections stay on the same card and feature branch; an existing PR is reused where practical.
- [x] Owner receives one approval gate for an exact RobQA-passed SHA; `ACCEPT` starts PR integration and authorizes verified squash merge and cleanup without a second approval while implementation remains unchanged.
- [x] The PR template records compact scope, verification, RobQA, Owner, and candidate-SHA evidence.
- [x] Existing PR CI is reused without adding card-specific or exhaustive suites.
- [x] The exact proposed `main` protection is documented but remains inactive until RobQA PASS, Owner acceptance, and a safe VM-625 transition; when activated it requires PRs and meaningful CI, prevents force pushes/deletion, and requires no duplicate GitHub approval.
- [x] Existing active VM-625 work can adopt the workflow in place without reset, replacement branch, or lost work.
- [x] Any material implementation change after RobQA PASS or Owner ACCEPT makes that exact-SHA evidence stale and returns the new candidate through RobDev, RobQA, and Owner Review.

## Files Likely Impacted

- `AGENTS.md`
- `docs/reference/workflow.md`
- `.github/pull_request_template.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-626 handoff
- GitHub repository merge/branch settings

## Risks

- Requiring a formal GitHub review could duplicate the Owner approval because RobDev/RobQA may share one account.
- Requiring the wrong status-check context could make `main` unmergeable.
- Enforcing protection for administrators could block lifecycle-only post-merge closeout under current file-based governance.
- Broad workflow text could compete with frozen RobDev/RobQA or protected specialist gates.
- Editing the active VM-625 worktree could corrupt unrelated work.

## Implementation Prompt

Reuse the current instructions, workflow document, PR template, deterministic PR CI, Kanban, and handoff system. Add only the durable command contract and GitHub settings needed for the standard branch-to-merge path. Keep frozen RobDev/RobQA gates, application code, product data, and active VM-625 work untouched.

## Notes

- Branch: `codex/vm-626-team-delivery-workflow` from accepted `origin/main` at `cf838837628193a66d51af0cc214b7ed9974383f`.
- Worktree: isolated at `C:\dev\voxmana.io-vm626-workflow` because the primary checkout is active and dirty on VM-625.
- QA tier: QA-0 documentation/non-runtime metadata plus authenticated GitHub settings verification.
- CPU-heavy validation: NOT REQUIRED.
- GitHub state: automatic merged-branch deletion is enabled. `main` protection was inspected and is not configured; its proposed strict `Deterministic Validation`/PR-required/zero-approval/no-force-push/no-deletion payload is deferred until RobQA PASS, Owner acceptance, and an explicit safe VM-625 transition.
- RobQA independently passed the material implementation candidate `91eebb77b894543c213cbc562a40859799d38990`; the evidence-only follow-up produced final PR head `5706304682e30357bafc07901c7e91009c13233f` under the documented QA-0 rule.
- Owner accepted VM-626 and the final PR head `5706304682e30357bafc07901c7e91009c13233f` on 2026-09-03.
- PR #21 was squash-merged to `main` as `308ece6b565e68dfec0e486c57fe3c7c9e783005`.
- GitHub automatically deleted the remote feature branch after merge. The local feature branch was removed only after merge verification.
- The accepted process documentation is active. `main` protection remains deliberately unconfigured, with zero rulesets, because VM-625 still relies on the previous accepted process; activation requires an explicit safe VM-625 transition.
- Amendment branch: `codex/vm-626-owner-iteration-amendment` from accepted `main` at `d59a1110d1a5f5914e28dfc8296b9c915c7accff`, reusing the existing isolated VM-626 worktree.
- Amendment scope is limited to making local exact-candidate Owner iteration normal before PR integration. All other accepted VM-626 decisions remain protected.
- Amendment candidate `29e3e4c3e4d0fa16a818b1ecd12cffb92fe815e1` received QA-0 RobQA PASS against base `d59a1110d1a5f5914e28dfc8296b9c915c7accff`; Owner Review is pending and no PR has been opened.
