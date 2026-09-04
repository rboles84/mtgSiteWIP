# VM-626 Standard Delivery Workflow Implementation Handoff

Date: 2026-09-03 17:26 MDT

Status: RobDev candidate ready; independent RobQA pending

## Agent Name

Codex

## Task Requested

Establish Vox Mana's normal small-team `main -> card branch -> PR -> RobDev -> RobQA -> one Owner approval -> squash merge -> cleanup` delivery workflow, including durable `SHIP`, `ACCEPT`, and `REJECT` command contracts, without replacing existing governance or disrupting VM-625.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, and `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md` and `docs/reference/workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md` and recent VM-584, VM-622, and VM-624 handoffs
- `docs/kanban/board.md` and the active uncommitted VM-625 card in the primary checkout
- `.codex/prompts/`, `.github/pull_request_template.md`, `.github/workflows/validation.yml`, `.github/workflows/browser-smoke.yml`, and `package.json`
- Current branches, worktrees, remotes, accepted `main`, open PRs, repository merge settings, checks, rulesets, and branch protection

## Files Changed

- `AGENTS.md`
- `docs/reference/workflow.md`
- `.github/pull_request_template.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-626-standard-branch-pr-qa-owner-merge-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What Changed

- Added concise, discoverable `SHIP VM-###`, `ACCEPT VM-###`, and `REJECT VM-###: <reason>` definitions to the root agent instructions.
- Replaced the informal branch-review guidance with one detailed delivery authority covering state rehydration, one-card/one-PR discipline, RobDev publication, independent exact-candidate RobQA, correction loops, SHA-bound QA staleness, one Owner merge gate, squash merge, closeout, exceptions, concurrency, and existing-work adoption.
- Updated the existing PR template with compact card, scope, acceptance, verification, RobQA SHA/evidence, Owner SHA/status, and delivery-check fields.
- Created VM-626 and added it to the board.
- Enabled GitHub's safe automatic deletion of merged feature branches.
- Inspected and documented, but left inactive, the proposed `main` protection: PR required, strict `Deterministic Validation`, zero GitHub approvals, no force pushes/deletion, conversation resolution off, administrator bypass retained for narrow lifecycle closeout.

## Why It Changed

The repository already had strong card, RobDev, RobQA, Owner Review, CI, and handoff governance, but Git delivery still depended on informal prompts and direct integration patterns. This change connects the existing governance to a recognizable small-team PR workflow without adding a second orchestration system.

## Decisions Made

- `docs/reference/workflow.md` is the detailed delivery authority; `AGENTS.md` is a concise discovery and command-contract surface.
- Existing `codex/vm-###-purpose` naming is preserved.
- One normal VM card uses one short-lived branch and one PR.
- RobQA PASS is bound to the exact PR head and becomes stale after material changes.
- GitHub formal approvals remain zero because RobDev/RobQA may share an account and the Owner should approve only once.
- Squash is the process default. Existing GitHub merge/rebase methods remain available only for justified exceptions rather than being disabled globally.
- Lifecycle-only post-merge documentation may remain a narrow administrator-bypass exception; it may not change product behavior.
- The Owner's later guardrail controls protection activation: no new `main` protection before this candidate passes RobQA, receives Owner acceptance, and VM-625 is no longer relying on the previous direct-integration process.

## Risks / Uncertainties

- Administrator bypass means direct-to-`main` restrictions remain partly process-enforced for the repository owner credential.
- The proposed strict status requirement must keep the exact existing check name `Deterministic Validation`.
- File-based post-merge closeout cannot live inside the already-merged feature PR; the narrow lifecycle-only exception remains necessary unless governance later changes.
- VM-625 is active and dirty in the primary checkout. It must not be reset, replaced, or silently placed under new protection.

## Tests Run

- Required durable command, workflow heading, transition guardrail, PR evidence, and card-section assertions: PASS.
- Relative Markdown link target validation across changed instruction/workflow/card files: PASS.
- Changed-file boundary check: PASS; no runtime/product file changed.
- `git diff --check`: PASS with only expected PowerShell LF-to-CRLF notices.
- Authenticated GitHub state verification after rollback: PASS; `main` protection is not configured and automatic merged-branch deletion remains enabled.
- First local validation invocation: harness-only PowerShell parse error from an unbraced variable before any assertion ran; corrected invocation passed.
- Runtime, browser, placement, journey, synthetic, mutation, recovery, and exhaustive suites: not run; QA-0 governance/template changes do not justify them.

## RobDevPass Compact Packet

- **Outcome:** a fresh agent can carry a card through one branch/PR and exact-candidate QA to one Owner gate, then execute accepted squash merge and cleanup.
- **Current/changed behavior:** informal branch review and direct-promotion history become a durable PR delivery contract; GitHub auto-delete is enabled; `main` protection remains deferred.
- **Owning authority/producer:** Owner instruction plus hand-authored `AGENTS.md`, `docs/reference/workflow.md`, existing PR template, Kanban, and handoff records.
- **Existing machinery reused:** current cards, RobDev/RobQA gates, Owner-first policy, PR CI, GitHub PRs, and existing instruction surfaces.
- **Protected behavior:** frozen RobDev/RobQA text, specialist/CRIT controls, product/runtime/data, existing CI commands, VM-625 work, and exceptional-history capability.
- **Consumers:** future Codex/Claude sessions, card owners, PR reviewers, and the repository owner.
- **Realistic risks/states:** missing branch/PR, dirty work, stale SHA evidence, changed `main`, failed CI, merge conflict, Owner rejection, concurrent card dependency, and lifecycle closeout.
- **Smallest complete implementation:** instruction pointer, one detailed workflow section, one PR template revision, card/board/handoff, safe GitHub auto-delete, and a deferred exact protection proposal.
- **Non-goals:** AI orchestration framework, GitFlow, `develop`, release branches, new tests, new CI, fake reviewer accounts, runtime changes, or VM-625 implementation.
- **Stop conditions:** protection activation before the Owner/VM-625 gates, required duplicate approval, wrong CI context, runtime scope, or interference with another worktree.

## RobQAPass Readiness

- **QA tier:** QA-0.
- **Changed behavior:** durable repository delivery vocabulary, PR evidence shape, and safe GitHub merged-branch cleanup.
- **Protected behavior:** runtime/product/data, frozen gates, current CI scope, VM-625 work, and inactive `main` protection.
- **Selected tests:** required-content assertions, relative-link resolution, file-boundary inventory, whitespace validation, authenticated settings verification, and independent actual-candidate review.
- **Expensive suites intentionally skipped:** all runtime/browser/engine suites; they cannot validate documentation-only delivery governance.
- **CPU-heavy validation:** NOT REQUIRED.
- **Rendered evidence:** not applicable.
- **Remaining Owner judgment:** accept, modify, or reject the command semantics, lifecycle exception, proposed protection payload, and VM-625 transition gate.

## Not Touched

- VM-625 card, board edit, feature implementation, branch history, or worktree files.
- Application HTML, CSS, JavaScript, tests, product data, generated artifacts, dependencies, deployments, and frozen RobDev/RobQA authorities.
- Existing GitHub CI workflows and merge-method availability.
- `main` protection/rulesets after the Owner guardrail was received; the brief initial protection was removed immediately and verified absent.

## Follow-Up Recommendations

- Commit and push this candidate, open its single Draft PR, and have independent RobQA inspect the actual PR diff.
- After RobQA PASS, mark the PR ready and stop for `ACCEPT VM-626`.
- On acceptance, merge the governance PR with squash. Activate the documented `main` protection only when VM-625 has explicitly adopted the PR path or completed under its previous contract.
- VM-625 should keep its current branch/worktree and continue without restart; once coherent, it can adopt the workflow at the push/open-PR step.

## Next Suggested Agent

Independent RobQA reviewer for the exact VM-626 PR candidate, then Product Owner.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-626-standard-branch-pr-qa-owner-merge-workflow.md`
- `docs/reference/workflow.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `docs/qa/RobQAPass.md`
- `docs/dev/RobDevPass.md`
