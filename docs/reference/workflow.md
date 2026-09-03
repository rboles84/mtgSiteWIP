# Vox Mana Workflow

This workflow keeps agent work grounded in project memory, file-based Kanban state, and handoff records.

## Source Of Truth

Use `docs/kanban/` as the local source of truth for task state.

- `docs/kanban/board.md` summarizes the active board.
- `docs/kanban/backlog/` contains unscheduled cards.
- `docs/kanban/ready/` contains scoped work ready to start.
- `docs/kanban/in-progress/` contains active work.
- `docs/kanban/blocked/` contains paused work with blockers.
- `docs/kanban/done/` contains completed work.

GitHub Issues and GitHub Projects may mirror this state when useful, but they are optional and should not replace the local board unless the project explicitly changes this workflow.

## Standard Flow

For non-trivial work:

1. Run the pre-flight review from `AGENTS.md`.
2. Create or identify the relevant Kanban card.
3. Use the repo-local [RobDev skill](../../.agents/skills/robdev/SKILL.md) and its [usage guide](../../.agents/skills/robdev/robdev.md), then apply the frozen [RobDevPass authority](../dev/RobDevPass.md).
4. Implement the scoped change.
5. Use the repo-local [RobQA skill](../../.agents/skills/robqa/SKILL.md) and its [usage guide](../../.agents/skills/robqa/robqa.md), then apply the frozen [RobQAPass authority](../qa/RobQAPass.md) before selecting tests.
6. Run the narrowest risk-proportional checks, including rendered-product self-QA for visible UI changes.
7. Update affected docs when behavior, data contracts, workflows, or public surfaces change.
8. Create or update a handoff in `docs/handoffs/` and update `docs/handoffs/HANDOFF_INDEX.md`.

Apply [Token And Reasoning Cost Control](token-reasoning-cost-control.md): perform proportionate checks by default, but run the full validation required by any task-specific workflow, prompt, card, gate, or governance record.

The operating sequence is: **Request -> repo-local RobDev skill / RobDevPass -> implementation -> repo-local RobQA skill / RobQAPass -> owner judgment -> integration.** The skills explain and invoke the workflow; the frozen pass documents remain authoritative. Both defer to stricter project-specific authorities.

`RobQAPass` governs how QA scope is selected and how owner acceptance is prepared. It does not replace project-specific commands or stricter protected contracts. The command lists in this workflow and the comprehensive test plan are catalogs, not automatic per-change checklists; CPU-heavy or exhaustive suites require a concrete changed-risk justification.

Small read-only questions, quick status checks, and simple command lookups do not need a Kanban card or handoff unless they reveal follow-up work.

## Source-Bound Data Work Modes

Faction identity, placement, dossier, and gold-standard parity cards must follow the source-bound rule in [Source / Generated Guardrails](source-generated-guardrails.md).

- Recon cards may inspect generated/runtime surfaces only to identify gaps.
- Review cards may approve, reject, or narrow proposed repairs, but must not promote missing evidence into source backing.
- Review cards may authorize later repair cards only after the source category for each field is known.
- Repair cards may edit only fields backed by existing official researched data.
- Source-intake cards may fetch or add new legitimate sources, but must record them in the appropriate source/evidence ledger before generated/display parity work consumes them.
- Implementation cards must classify every changed or preserved field as one of: `backed-repair`, `source-normalization`, `source-intake-needed`, or `blocked-noncanonical`.
- Runtime/generated files may be regenerated from canonical source, but not hand-edited as source.

## Kanban Cards

Cards should use `VM-###` IDs and live in the folder matching their status. Move a card between folders when its status changes, and update `docs/kanban/board.md` in the same change.

Each card should include:

- ID
- Title
- Status
- Type
- Area
- Priority
- Created
- Summary
- Source
- Acceptance Criteria
- Files Likely Impacted
- Risks
- Implementation Prompt
- Notes

Do not mark cards done until tests/checks or direct user confirmation support that status.

## Standard Branch to PR to QA to Owner to Merge Delivery

Vox Mana uses a small-team trunk-based workflow:

`main -> short-lived card branch -> one PR -> RobDev complete -> RobQA PASS -> Owner ACCEPT -> squash merge -> branch cleanup`

`main` is the accepted integration baseline. Do not create `develop`, release, or environment branches for normal cards. Material product work does not push directly to `main`.

### Rehydrate Before Acting

Every delivery command begins by establishing the real current state:

- current branch, worktree, HEAD, accepted `main`, merge base, and uncommitted work;
- every branch/worktree associated with the card, under the single-active-worktree rule in `AGENTS.md`;
- existing PR, its base/head, Draft state, checks, and changed-file scope;
- card, RobDev, RobQA, and Owner Review status.

Resume valid work at the correct point. Do not discard, duplicate, reset, clean, or replace work merely to recreate an ideal sequence.

### Branch And PR Contract

- Start a material card from current accepted `main` on one short-lived branch. Use the accepted `codex/vm-###-recognizable-purpose` convention unless the card records another approved convention.
- Keep one work item per branch and normally one PR per VM card. Do not combine unrelated cards or create a replacement PR for routine Dev, QA, or Owner corrections.
- Title the PR `VM-### — <accepted card title>` and target `main`. Use the repository PR template without copying the entire card into the body.
- A coherent first candidate may open as Draft so RobQA can inspect the real PR diff. Keep it Draft during the normal Dev/QA loop; mark it ready only after the current PR head has RobQA PASS.
- When concurrent cards overlap, identify the dependency. Wait for the dependency or deliberately update the dependent branch from accepted `main`, then rerun affected Dev checks and RobQA. Never silently combine the cards.
- Before final QA, compare the branch with current `main`. Rebase a short-lived, single-owner branch when safe and conventional; do not rewrite shared history unexpectedly. Any meaningful update or conflict resolution invalidates earlier QA until affected checks rerun.

### `SHIP VM-###`

`SHIP` owns the normal engineering loop through Owner Review readiness:

1. Rehydrate the card and repository state above.
2. Apply RobDev to the accepted card scope. Inspect the final diff, remove accidental artifacts, run card-required developer verification, update required documentation and handoff records, and leave only intended candidate changes.
3. Commit and push the feature branch. Create or update its single PR; never merge it and never push material feature implementation directly to `main`.
4. Apply RobQA independently to the actual candidate. The authoritative scope is the PR base/head diff, or `merge-base(feature branch, main)..feature branch HEAD`. Inspect changed files, acceptance criteria, relevant automated/manual evidence, regression surfaces, and unrelated changes rather than trusting the RobDev summary.
5. If RobQA is `BLOCKED`, record concrete findings and return the same branch and PR to RobDev. Resolve ordinary bugs, missed acceptance criteria, lint/test failures, and bounded implementation mistakes automatically; push and rerun proportionate QA until `PASS` or a genuine Owner decision is required.
6. Bind final RobQA `PASS` to the exact reviewed commit SHA in the PR body or a durable evidence artifact linked from it. Any later material change makes QA `PENDING`/stale. Documentation-only follow-up uses the existing RobQA risk rules; never imply that materially changed code remains approved.
7. Update the PR's QA field and mark it ready for review. Stop with a concise Owner handoff: card, branch, PR, candidate HEAD, RobQA PASS, the shortest manual inspection, and non-blocking limitations.

Escalate from the Dev/QA loop only for changed accepted scope, Owner-reserved architecture, semantic authority, destructive behavior, or a genuine requirement conflict.

### `ACCEPT VM-###`

`ACCEPT` is the Owner's single approval and merge authorization. Before merging, verify:

1. the card's PR exists and targets `main`;
2. its current head equals the Owner-reviewed, RobQA-passed candidate;
3. exact-SHA RobQA evidence is durable and not stale;
4. required CI/status checks are green;
5. the PR is mergeable with no unresolved conflicts;
6. the base/head diff contains no unrelated work; and
7. no unexpected commit appeared after Owner review.

When these checks pass, use GitHub squash merge. Prefer the final subject `VM-###: <accepted card title>`. Do not request another approval. Then obtain the resulting `main` SHA, sync local `main`, verify the squash commit and clean worktree, complete the card/board/handoff closeout under existing governance, record the final merge SHA where required, and delete the remote/local feature branch when safe. A lifecycle-only post-merge documentation commit is a narrow administrative direct-to-`main` exception when branch protection and current governance permit it; it must contain no product behavior. Stop rather than beginning another card.

### `REJECT VM-###: <reason>`

Owner rejection does not close or replace the work item. Keep the same card, branch, and PR; record the feedback as product evidence; return it to RobDev; convert a confirmed defect into the narrowest appropriate invariant; invalidate earlier QA; and repeat the Dev -> RobQA loop. Return the new exact candidate to Owner Review only after RobQA passes it.

### Pull Request Evidence

The PR is a compact engineering artifact and should show:

- card and purpose;
- concise change and scope summary;
- acceptance-criteria disposition;
- important automated/manual verification;
- `RobQA: PENDING | PASS | BLOCKED` plus reviewed SHA and evidence link;
- `Owner Review: PENDING | ACCEPTED | REJECTED` plus reviewed SHA.

RobQA is a repository process gate, not a pretend second GitHub identity. Do not require a formal GitHub reviewer approval when RobDev and RobQA use the same account or when it would make the Owner approve twice.

### Main Protection And Exceptions

Repository protection should require a PR and the existing meaningful deterministic CI before merge, prevent force pushes and branch deletion, and avoid a required GitHub approval count. Conversation resolution is required only if the team has already adopted it. Keep administrator bypass available only where the narrow lifecycle-closeout exception requires it, and record what remains process-enforced.

Current and proposed GitHub enforcement as of 2026-09-03:

- **Configured now:** merged feature branches are deleted automatically. This does not change how active VM-625 work may reach `main`.
- **Deferred transition:** do not activate new `main` protection until this workflow candidate has RobQA PASS, the Owner has accepted it, and VM-625 is no longer relying on the previous direct-integration process.
- **Proposed protection at that gate:** require PRs and the strict `Deterministic Validation` status check; disable force pushes and deletion of `main`; require zero GitHub approving reviews; leave conversation resolution off; and retain administrator bypass only for the narrow lifecycle-only closeout exception.
- **Process rule after acceptance:** squash is normal; GitHub's merge/rebase methods remain available only for an explicitly justified exceptional history.

Direct-to-`main` work is limited to truly trivial repository administration and lifecycle-only closeout that cannot change product behavior. Public UI, JavaScript, CSS, routes, persistence, scoring, identity data, Maze, Loom, Archscry, generated production content, and shared runtime behavior always use a branch and PR. When uncertain, use a branch and PR.

### Existing Work Adoption

Work already underway when this workflow is adopted keeps its accepted card, branch, worktree, commits, and tests. Once it has a coherent candidate, continue at `SHIP` step 3: commit/push if needed, open or update that card's PR, and run RobQA against the actual PR candidate. Do not restart implementation, replace the branch, or create a second PR merely to conform to this workflow.

VM-625 is the transition guardrail for this initial adoption. Do not enable the deferred `main` protection underneath it while it still relies on the previous accepted integration process. VM-625 may opt into the new branch/PR path in place, or finish under its prior contract; activate protection only after that state is explicit.

## Checks

For the current static site, each non-trivial change should verify the narrowest relevant subset of:

- Pages still open locally.
- Shared JavaScript has no obvious console/runtime errors.
- Navigation and visible content still work.
- Data, parser, placement, or dossier behavior still passes relevant scripts.
- Git working tree changes are understood before handoff.

Useful commands include:

```bash
npm test
npm run test:parser
npm run test:builder
npm run test:bias
npm run test:mode
npm run test:placement
npm run test:syntax
```
