## VM-098 - Safe Backup Push For UI Refactor Exploration 2

ID: VM-098
Title: Safe Backup Push For UI Refactor Exploration 2
Status: done
Type: release safety
Area: branch backup / documentation hygiene
Priority: high
Created: 2026-05-21
Completed: 2026-05-21

## Summary

Publish the current `feature/ui-refactor-exploration` worktree as a second clearly labeled WIP backup snapshot, preserving the full local state on the remote branch without presenting it as a polished release.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2118-codex-vm091-safe-backup-push-ui-refactor-exploration.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-21-1356-codex-vm011-apocrypha-source-group-simplification.md`
- `docs/handoffs/2026-05-21-1729-codex-vm097-homepage-radar-presentation-lift-from-archscry.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/kanban/board.md`
- `git -c safe.directory=C:/dev/mtgSiteWIP status -sb`
- `git -c safe.directory=C:/dev/mtgSiteWIP status --ignored --short`

## Acceptance Criteria

- The current branch state is documented as an intentional backup/checkpoint task rather than a review-ready release.
- Supporting handoffs, done cards, and board state are updated to reflect the backup push.
- `npm.cmd test`, `node --check assets/js/apocrypha.js`, and `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` on the authored checkpoint files pass before commit.
- The full local state is staged on the current branch, including tracked modifications, tracked deletions, visible untracked files, and force-added ignored files under `docs/research/canon/` and `docs/research/ui_research/`.
- The batch is committed with explicit WIP backup wording and pushed to `origin/feature/ui-refactor-exploration`.

## Completion Notes

- Reviewed the current worktree, recent handoffs, and Kanban state before staging.
- Chose to preserve the branch exactly as it exists locally so the remote branch can serve as a recovery checkpoint.
- Kept the repo-level ignore rules in place while force-adding the ignored research/mock files into this one backup snapshot.
- Preserved the currently tracked deletions instead of restoring them so the backup mirrors the present local state.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status -sb`
- `git -c safe.directory=C:/dev/mtgSiteWIP status --ignored --short`
- `npm.cmd test`
- `node --check assets/js/apocrypha.js`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- .gitignore docs/kanban/board.md docs/kanban/done/VM-098-safe-backup-push-ui-refactor-exploration-2.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-05-21-2104-codex-vm098-safe-backup-push-ui-refactor-exploration-2.md`

## Notes

- This task is intentionally broad and includes current runtime changes, documentation changes, tracked deletions, visible untracked files, and specifically force-added ignored research/mock files under `docs/research/canon/` and `docs/research/ui_research/`.
- Other ignored paths such as `artifacts/` and `data/scryfall/raw/*.json` remain excluded from this checkpoint.
- The branch is expected to need later cleanup before any review-ready publish.
