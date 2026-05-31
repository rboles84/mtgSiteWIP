# VM-199 - Shard Branch Merge Hygiene Fix

ID: VM-199
Title: Shard Branch Merge Hygiene Fix
Status: done
Type: Merge Hygiene
Area: Git, Docs, Kanban, Handoffs
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Summary

Make `codex/vm160-bant-controlled-promotion` fully merge-ready into `feature/ui-refactor-exploration` by adding one corrective cleanup commit.

## Scope

- Confirm the working tree is clean before restoration.
- Restore deleted archive paths from `feature/ui-refactor-exploration` without switching branches.
- Normalize only whitespace issues flagged by `git diff --check feature/ui-refactor-exploration...HEAD`.
- Record a small handoff and closeout for this merge-readiness fix.

## Acceptance Criteria

- No `D` entries remain under `docs/research/archive/` in the branch diff.
- `git diff --check feature/ui-refactor-exploration...HEAD` passes.
- No active code/config path is changed to consume restored archive files.
- Branch remains fast-forwardable into `feature/ui-refactor-exploration`.
- Worktree is clean after the corrective commit.

## Out Of Scope

- Branch switching, rebasing, or commit rewriting
- Push or pull request creation
- Runtime API, schema, placement scoring, route, Home preview, Maze behavior, question-bank, or generated-artifact changes
- Lore, Commander, or research claim wording changes
- Touching the `VM-198 stash unrelated future-wedge research` stash

## Tests

- PASS - `git -c safe.directory=C:/dev/mtgSiteWIP diff --check feature/ui-refactor-exploration`
- PASS - `git -c safe.directory=C:/dev/mtgSiteWIP diff --check HEAD`
- PASS - `rg -n "vm144-stale-preview-assets|vox_mana_precons_MASTER" . --glob "!docs/**" --glob "!node_modules/**" --glob "!dist/**" --glob "!.git/**"`
- PASS - `npm.cmd run test:placement`
- PASS - `npm.cmd test`
- PASS - `npm.cmd run audit:factions`
- PASS - `git -c safe.directory=C:/dev/mtgSiteWIP merge-base --is-ancestor feature/ui-refactor-exploration HEAD`
- PASS - `git -c safe.directory=C:/dev/mtgSiteWIP rev-list --left-right --count feature/ui-refactor-exploration...HEAD`
