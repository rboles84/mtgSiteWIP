# VM-626 - Standard Branch, PR, QA, Owner, and Merge Workflow

ID: VM-626

Title: Standard Branch, PR, QA, Owner, and Merge Workflow

Status: In Progress

Type: Repository governance / delivery workflow

Area: Git, GitHub, agent instructions, CI delivery

Priority: High

Created: 2026-09-03

## Summary

Establish a conventional small-team delivery path:

`main -> short-lived card branch -> one PR -> RobDev -> RobQA -> one Owner approval -> squash merge -> branch cleanup`

Make `SHIP VM-###`, `ACCEPT VM-###`, and `REJECT VM-###: <reason>` durable repository vocabulary without replacing the existing card, RobDev, RobQA, Owner Review, semantic-authority, or handoff systems.

## Source

- Owner start prompt supplied 2026-09-03.
- Existing branch/worktree authority in `AGENTS.md`.
- Existing lifecycle authority in `docs/reference/workflow.md`.
- Existing RobDev and RobQA gates and VM-622 Owner-first policy.

## Locked Decisions

- Do not activate new `main` protection/rulesets before this candidate has RobQA PASS and Owner acceptance.
- Do not place VM-625 under new integration governance while it still relies on the previous accepted process.
- Automatic deletion of merged feature branches is safe to enable during setup.
- Inspect and document the exact proposed protection now; activate it only after the acceptance and VM-625 transition gates are satisfied.

## Acceptance Criteria

- [ ] A fresh repository session can discover and correctly execute `SHIP`, `ACCEPT`, and `REJECT`.
- [ ] Material cards use current `main`, one short-lived card branch, and normally one PR.
- [ ] RobDev prepares and publishes the candidate without merging or pushing feature work directly to `main`.
- [ ] RobQA independently reviews the actual PR candidate and binds PASS to its exact SHA.
- [ ] Ordinary Dev/QA and Owner-rejection corrections stay on the same card, branch, and PR.
- [ ] Owner receives one approval gate; `ACCEPT` authorizes verified squash merge and cleanup without a second approval.
- [ ] The PR template records compact scope, verification, RobQA, Owner, and candidate-SHA evidence.
- [ ] Existing PR CI is reused without adding card-specific or exhaustive suites.
- [ ] The exact proposed `main` protection is documented but remains inactive until RobQA PASS, Owner acceptance, and a safe VM-625 transition; when activated it requires PRs and meaningful CI, prevents force pushes/deletion, and requires no duplicate GitHub approval.
- [ ] Existing active VM-625 work can adopt the workflow in place without reset, replacement branch, or lost work.

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
