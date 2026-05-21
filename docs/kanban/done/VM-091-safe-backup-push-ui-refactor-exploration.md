## VM-091 - Safe Backup Push For UI Refactor Exploration

ID: VM-091
Title: Safe Backup Push For UI Refactor Exploration
Status: done
Type: release safety
Area: branch backup / documentation hygiene
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Publish the current `feature/ui-refactor-exploration` worktree as a clearly labeled WIP backup snapshot after verification, without presenting it as a review-ready branch.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0657-codex-vm076-cleanup-push-preview-archive-batch.md`
- `docs/handoffs/2026-05-20-1927-codex-vm011-apocrypha-archive-console.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-076-cleanup-and-push-preview-archive-batch.md`
- `docs/kanban/done/VM-089-local-file-route-compatibility-sweep.md`
- `git status --short --branch`
- `git remote -v`

## Acceptance Criteria

- The current route/UI batch is documented as an intentional WIP backup publish unit.
- Supporting handoffs, done cards, and board state are updated to reflect the branch-backup task.
- `npm.cmd test`, `npm.cmd run test:placement`, and `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` pass before commit.
- The batch is committed with explicit WIP wording and pushed as the first upstream publication of `feature/ui-refactor-exploration`.
- Follow-up risks stay documented rather than silently hidden: `VM-088` remains in progress, `VM-089` handoff indexing still needs cleanup, and deleted research markdown files still need archive/justification review.

## Completion Notes

- Reviewed the current worktree, remote, recent handoffs, and Kanban state before staging.
- Chose to publish the full tested UI/refactor batch together so the new route shells and supporting assets remain intact on the remote branch.
- Documented this push as a safety snapshot instead of a polished release milestone.
- Preserved the known documentation risks as follow-up work rather than blocking the remote backup.

## Tests Run

- `npm.cmd test`
- `npm.cmd run test:placement`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Notes

- This task is intentionally broad and includes runtime changes, documentation changes, untracked route assets, and currently staged deletions already present in the branch.
- The branch is expected to need a later cleanup pass around research-doc archival, `VM-089` handoff bookkeeping, and whether `VM-088` stays in this branch.
