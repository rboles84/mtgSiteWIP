# 2026-06-24 19:43 - Codex - VM-419 Post-Promotion Branch Cleanup

## Agent Name

Codex

## Task Requested

Remove unneeded branches now that `main` contains the promoted `codex/vm407-radar-v2` work.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-24-1919-codex-vm418-main-promotion.md`
- `docs/handoffs/2026-06-15-1136-codex-vm401-branch-cleanup.md`
- `docs/kanban/done/VM-418-repo-scan-cleanup-main-promotion.md`
- Current Git branch refs and containment checks

## Files Changed

- `docs/kanban/done/VM-419-post-promotion-branch-cleanup.md`
- `docs/handoffs/2026-06-24-1943-codex-vm419-post-promotion-branch-cleanup.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Verified local and remote `codex/vm407-radar-v2` both resolved to the same commit as `origin/main`.
- Fast-forwarded local `main` to `origin/main`.
- Deleted local `codex/vm407-radar-v2`.
- Deleted remote `origin/codex/vm407-radar-v2`.
- Recorded the cleanup in Kanban and handoff docs.

## Why It Changed

The user confirmed `main` is the source of truth after VM-418 and requested removal of branches that are no longer needed.

## Preflight Summary

Recent related work:

- VM-418 promoted the accumulated VM-413 through VM-416 bundle to `origin/main`.
- VM-401 previously removed older stale local and remote branches after containment checks.

Current known risks:

- Branch deletion is destructive to refs.
- Local `main` was behind `origin/main` before cleanup and needed a normal fast-forward before deleting the checked-out feature branch.
- Git still warns that it cannot access `C:\Users\obake/.config/git/ignore`.

Relevant decisions already made:

- `main` is now the promoted source of truth.
- `codex/vm407-radar-v2` is no longer needed once contained in `main`.
- Do not touch runtime code, source data, generated data, lore, visual baselines, tags, or stash.

Files recently changed:

- VM-418 published the route/runtime/docs/audit bundle at `d4a2b4f082aa07326d7818f9202fdf5a456078ac`.

What should not be touched:

- Runtime code, visual baselines, placement scoring, MTG lore, Commander facts, source/generated data contracts, tags, and stash refs.

## Decisions Made

- Treat `codex/vm407-radar-v2` as redundant only after both local and remote refs were confirmed contained in `origin/main`.
- Preserve only `main`, `origin/main`, and `origin/HEAD -> origin/main` from the normal branch list.

## Risks / Uncertainties

- Deleted branch refs are no longer visible in the normal branch list, though the commit remains preserved by `main`.
- The user-level Git ignore permission warning remains outside repo scope.

## Tests Run

- `git fetch --prune origin` - passed before and after deletion.
- `git branch --all --verbose --no-abbrev` - confirmed only `main`, `origin/main`, and `origin/HEAD -> origin/main` remain.
- `git merge-base --is-ancestor codex/vm407-radar-v2 origin/main` - passed before deletion.
- `git merge-base --is-ancestor origin/codex/vm407-radar-v2 origin/main` - passed before deletion.
- `git switch main` - passed with approval after sandbox blocked `.git/index.lock`.
- `git merge --ff-only origin/main` - passed with approval after sandbox blocked `.git/ORIG_HEAD.lock`.
- `git branch -d codex/vm407-radar-v2` - deleted local branch.
- `git push origin --delete codex/vm407-radar-v2` - deleted remote branch.
- `git rev-list --left-right --count HEAD...origin/main` - returned `0 0`.
- `git show-ref --verify --quiet refs/heads/codex/vm407-radar-v2` - confirmed local ref absent.
- `git show-ref --verify --quiet refs/remotes/origin/codex/vm407-radar-v2` - confirmed remote-tracking ref absent.

## Not Touched

- Runtime code
- Source data
- Generated data
- Visual baselines
- MTG lore or Commander facts
- Tags
- Stash refs

## Follow-Up Recommendations

- Repair `C:\Users\obake/.config/git/ignore` permissions outside the repo when convenient.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- VM-419
- VM-418
- VM-401
