# VM-198 - Shard Bundle Worktree Cleanup

ID: VM-198
Title: Shard Bundle Worktree Cleanup
Status: done
Type: Release Hygiene / Git Cleanup
Area: Git, Kanban, Handoffs, Shard Parity Bundle
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Summary

Clean the local worktree after the Alara shard parity closeout by separating the coherent completed shard bundle from unrelated untracked future-wedge research drops.

## Scope

- Run AGENTS pre-flight and document the current dirty-worktree state.
- Treat the VM-160 through VM-197 shard chain as the intended bundle unless verification finds a blocker.
- Keep completed shard raw data, architecture docs, generated artifacts, tests, Kanban cards, and handoffs together.
- Keep unrelated future-wedge research drops out of the shard bundle unless explicitly promoted by a later card.
- Use reversible cleanup for unrelated untracked research material; do not delete or reset.

## Acceptance Criteria

- The shard bundle is verified before packaging.
- Generated shard artifacts remain produced by the approved faction build workflow.
- Unrelated future-wedge research remains recoverable and is not silently folded into the shard parity bundle.
- Worktree cleanup creates a clear handoff trail.
- No docs are permanently deleted.

## Out Of Scope

- Reverting completed shard work
- Deleting untracked research drops
- Promoting Khans/wedge research into live placement
- New placement scoring, routes, Home preview, Maze behavior, or question-bank changes
- Push or pull request creation

## Tests

- `npm.cmd run test:placement` - passed
- `npm.cmd test` - passed
- `npm.cmd run audit:factions` - passed
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed with line-ending warnings only

## Cleanup Result

- Kept the completed shard bundle together for commit.
- Stashed unrelated future-wedge research under `VM-198 stash unrelated future-wedge research`.

## Related

- `docs/handoffs/2026-05-31-0058-codex-vm197-alara-shard-parity-closeout.md`
- `docs/handoffs/2026-05-28-2251-codex-branch-cleanup-push-bundle.md`
- `docs/handoffs/2026-05-29-2254-codex-vm170-bant-research-folder-cleanup.md`
