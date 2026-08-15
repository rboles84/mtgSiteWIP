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
3. Plan from existing handoffs, cards, docs, and code.
4. Apply the [RobQAPass owner-QA gate](../qa/RobQAPass.md): classify the QA tier, changed behavior, and protected contracts before selecting tests.
5. Implement the scoped change.
6. Run the narrowest risk-proportional checks, including rendered-product self-QA for visible UI changes.
7. Update affected docs when behavior, data contracts, workflows, or public surfaces change.
8. Create or update a handoff in `docs/handoffs/` and update `docs/handoffs/HANDOFF_INDEX.md`.

Apply [Token And Reasoning Cost Control](token-reasoning-cost-control.md): perform proportionate checks by default, but run the full validation required by any task-specific workflow, prompt, card, gate, or governance record.

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

## Branches And Review

Use one branch per task when practical.

```bash
git checkout main
git pull
git checkout -b feature/short-task-name
```

Avoid direct commits to `main` except for tiny administrative changes.

Before opening a PR, ask for a local branch review. The review should inspect:

- `git status`
- `git diff main...HEAD`
- changed files
- browser or manual behavior when relevant

After opening a PR, ask for PR review with the PR number and repository. Reviews should prioritize bugs, regressions, missing checks, and file/line-specific findings.

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
