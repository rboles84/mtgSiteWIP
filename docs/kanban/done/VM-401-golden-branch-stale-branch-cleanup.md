# VM-401 - Golden Branch Stale Branch Cleanup

ID: VM-401
Title: Golden Branch Stale Branch Cleanup
Status: done
Type: Release Hygiene / Git
Area: Branch Management
Priority: high
Created: 2026-06-15

## Summary

Clean stale local and remote branches while preserving `feature/ui-refactor-exploration` as the golden branch and preserving `main` / `origin/main` for later main-promotion reconciliation.

## Scope

- Audit all local and `origin/*` branches against `feature/ui-refactor-exploration`.
- Delete only branches verified contained in golden, except local `codex/kanban-pr-workflow`, which is deleted only under the documented obsolete-branch exception.
- Delete matching remote stale branches with `git push origin --delete`.
- Record the final delete/keep list and verification evidence.

## Out Of Scope

- No deletion of `feature/ui-refactor-exploration`, `origin/feature/ui-refactor-exploration`, `main`, `origin/main`, or `refs/stash`.
- No main promotion, merge, tag, force-push, or source/runtime change.
- No branch deletion without explicit containment or the documented `codex/kanban-pr-workflow` obsolete exception.

## Acceptance Criteria

- VM-401 collision scan is recorded.
- Every delete candidate has `git merge-base --is-ancestor` evidence or an obsolete-exception note.
- All planned stale local and remote branches are removed.
- Preserved refs remain present.
- Final branch/status audit is recorded.

## Audit Notes

- `git fetch --prune origin` completed before deletion.
- Every local delete candidate except `codex/kanban-pr-workflow` passed `git merge-base --is-ancestor <candidate-ref> feature/ui-refactor-exploration`.
- Every remote delete candidate passed `git merge-base --is-ancestor <candidate-ref> feature/ui-refactor-exploration`.
- Local `codex/kanban-pr-workflow` is the approved obsolete exception: unique commit `ade4970` only adds older GitHub issue/PR workflow material, golden already has the useful `.github` templates, and `docs/workflow.md` is superseded by the current file-based Kanban/handoff workflow.

## Completion Notes

- Deleted 14 local stale branches.
- Deleted 6 remote stale branches from `origin`.
- Preserved `feature/ui-refactor-exploration`, `origin/feature/ui-refactor-exploration`, `main`, `origin/main`, and `refs/stash`.
- Final branch audit shows only local golden, local `main`, `origin/main`, and `origin/feature/ui-refactor-exploration`.
- Golden branch alignment check returned `0 0` against `origin/feature/ui-refactor-exploration`.

## Validation Checklist

- [x] Preflight docs reviewed.
- [x] VM-401 collision scan passed.
- [x] `git fetch --prune origin` run.
- [x] Containment audit completed.
- [x] Local branches deleted.
- [x] Remote branches deleted.
- [x] Final branch/status audit completed.
