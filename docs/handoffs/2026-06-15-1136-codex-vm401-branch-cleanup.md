# VM-401 Golden Branch Stale Branch Cleanup Handoff

## Agent Name

Codex

## Task Requested

Clean old branches after verifying nothing needs to be pulled into `feature/ui-refactor-exploration`, preserving that branch as the future main/golden branch.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-0940-codex-vm400-apocrypha-release-train-publish.md`
- Current branch and branch graph via Git

## Files Changed

Initial coordination:

- `docs/kanban/board.md`
- `docs/kanban/done/VM-401-golden-branch-stale-branch-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-1136-codex-vm401-branch-cleanup.md`

## What Changed

- Created VM-401 as the branch-cleanup tracking card.
- Began this handoff before deleting branches.
- Deleted verified contained local branches, the approved obsolete local branch, and verified contained remote branches.
- Closed VM-401 after final branch/status verification.

## Why It Changed

The user identified `feature/ui-refactor-exploration` as the golden branch and requested cleanup of old branches after verifying they no longer contain needed work.

## Preflight Summary

Recent related work:

- VM-400 published and closed the Apocrypha/Home release-train bundle on `feature/ui-refactor-exploration`.
- VM-393 documented that `origin/main` has commits not contained in the feature branch and should be preserved for later main-promotion reconciliation.

Current known risks:

- Deleting branches is destructive to refs, especially remote refs.
- `origin/main` is not contained in golden and must not be deleted.
- Local `codex/kanban-pr-workflow` is not contained in golden, but the user approved deleting it as obsolete after recording the exception evidence.
- Git continues to warn that it cannot access `C:\Users\obake/.config/git/ignore`.

Relevant decisions already made:

- Preserve `feature/ui-refactor-exploration`, `origin/feature/ui-refactor-exploration`, `main`, `origin/main`, and `refs/stash`.
- Delete local `codex/kanban-pr-workflow` only under an obsolete-branch exception.
- Delete remote candidates only if contained in golden.

Files recently changed:

- Branch cleanup has no runtime/source changes.

What should not be touched:

- No runtime code, source data, generated data, docs unrelated to VM-401, main promotion, merges, tags, force-pushes, or protected refs.

## Branch Audit

Golden branch: `feature/ui-refactor-exploration`.

Pre-delete containment results:

| Kind | Ref | Commit | Branch-only vs golden | Contained in golden | Disposition |
|---|---|---:|---:|---|---|
| local | `codex/abzan-houses-gold-standard-onboarding` | `2f2dd602` | 0 | yes | delete with `git branch -d` |
| local | `codex/add-test-harness` | `52bbd860` | 0 | yes | delete with `git branch -d` |
| local | `codex/kanban-pr-workflow` | `ade49702` | 1 | no | delete with obsolete-branch exception |
| local | `codex/vm-022-do-search-contract-adapter` | `db51da11` | 0 | yes | delete with `git branch -d` |
| local | `codex/vm-136-archscry-precon-layer` | `531a0659` | 0 | yes | delete with `git branch -d` |
| local | `codex/vm-137-faction-native-precons` | `eb458165` | 0 | yes | delete with `git branch -d` |
| local | `codex/vm160-bant-controlled-promotion` | `087327e2` | 0 | yes | delete with `git branch -d` |
| local | `feature/batch-1-foundation` | `51acd1c3` | 0 | yes | delete with `git branch -d` |
| local | `feature/terminal-ui` | `a480ca7f` | 0 | yes | delete with `git branch -d` |
| local | `feature/vm-022-maze-query-contract` | `7e75e5f6` | 0 | yes | delete with `git branch -d` |
| local | `hardening/phase-1-security-accessibility` | `39a47dcd` | 0 | yes | delete with `git branch -d` |
| local | `refactor/archscryindex-extract` | `c40f84d9` | 0 | yes | delete with `git branch -d` |
| local | `refactor/newindex-extract` | `980bce57` | 0 | yes | delete with `git branch -d` |
| local | `refactor/strategium-extract` | `a6c5bcfe` | 0 | yes | delete with `git branch -d` |
| remote | `origin/codex/abzan-houses-gold-standard-onboarding` | `2f2dd602` | 0 | yes | delete with `git push origin --delete` |
| remote | `origin/codex/kanban-pr-workflow` | `2366e2fb` | 0 | yes | delete with `git push origin --delete` |
| remote | `origin/codex/vm160-bant-controlled-promotion` | `b965da9f` | 0 | yes | delete with `git push origin --delete` |
| remote | `origin/feature/batch-1-foundation` | `51acd1c3` | 0 | yes | delete with `git push origin --delete` |
| remote | `origin/feature/research-scryfall-parser` | `b52b56e9` | 0 | yes | delete with `git push origin --delete` |
| remote | `origin/feature/terminal-ui` | `a480ca7f` | 0 | yes | delete with `git push origin --delete` |

Obsolete exception for local `codex/kanban-pr-workflow`:

- `git show --stat --oneline ade4970` shows one commit adding `.github/ISSUE_TEMPLATE/task.yml`, `.github/pull_request_template.md`, `docs/workflow.md`, and a small `README.md` change.
- `git diff feature/ui-refactor-exploration...codex/kanban-pr-workflow -- .github docs/workflow.md` shows the old branch's unique useful content as `.github` templates plus `docs/workflow.md`.
- Golden already has `.github/ISSUE_TEMPLATE/task.yml` and `.github/pull_request_template.md`.
- Golden intentionally does not have `docs/workflow.md`; its GitHub Projects workflow is obsolete under the current file-based Kanban/handoff workflow.

## Tests Run

- `git status --short --branch` - clean and aligned before VM-401 docs.
- `git branch --show-current` - `feature/ui-refactor-exploration`.
- `rg -n "VM-401" .` - no existing VM-401 references before card creation.
- `git fetch --prune origin` - passed.
- `git merge-base --is-ancestor <candidate-ref> feature/ui-refactor-exploration` - passed for all contained delete candidates.
- `git show --stat --oneline ade4970` - recorded obsolete-exception evidence.
- `git diff feature/ui-refactor-exploration...codex/kanban-pr-workflow -- .github docs/workflow.md` - recorded obsolete-exception evidence.
- `git branch -d <contained-local-branch>` - deleted contained local branches. `codex/vm160-bant-controlled-promotion` required unsetting its upstream first because its upstream lagged the local contained tip.
- `git branch -D codex/kanban-pr-workflow` - deleted the documented obsolete local exception.
- `git push origin --delete ...` - deleted 6 verified contained remote branches.
- `git fetch --prune origin` - passed after remote deletion.
- `git branch --all --verbose --no-abbrev` - confirmed only preserved branch refs remain.
- `git rev-list --left-right --count HEAD...origin/feature/ui-refactor-exploration` - returned `0 0`.
- `git show-ref --verify --quiet refs/stash` - confirmed stash is still present.

## Results

Deleted local branches:

- `codex/abzan-houses-gold-standard-onboarding`
- `codex/add-test-harness`
- `codex/kanban-pr-workflow`
- `codex/vm-022-do-search-contract-adapter`
- `codex/vm-136-archscry-precon-layer`
- `codex/vm-137-faction-native-precons`
- `codex/vm160-bant-controlled-promotion`
- `feature/batch-1-foundation`
- `feature/terminal-ui`
- `feature/vm-022-maze-query-contract`
- `hardening/phase-1-security-accessibility`
- `refactor/archscryindex-extract`
- `refactor/newindex-extract`
- `refactor/strategium-extract`

Deleted remote branches:

- `origin/codex/abzan-houses-gold-standard-onboarding`
- `origin/codex/kanban-pr-workflow`
- `origin/codex/vm160-bant-controlled-promotion`
- `origin/feature/batch-1-foundation`
- `origin/feature/research-scryfall-parser`
- `origin/feature/terminal-ui`

Preserved refs:

- `feature/ui-refactor-exploration` at `5b16576ab0bcb4036fae2e670141efde0734830d`
- `origin/feature/ui-refactor-exploration` at `5b16576ab0bcb4036fae2e670141efde0734830d`
- `main` at `b52b56e9c773582dd75a050e3154fc7b8b27a431`
- `origin/main` at `efb44c4c2c78091c9c48f46fd9add7e4b9c0190e`
- `refs/stash`

Final branch list after cleanup:

- `feature/ui-refactor-exploration`
- `main`
- `origin/HEAD -> origin/main`
- `origin/feature/ui-refactor-exploration`
- `origin/main`

## Risks / Uncertainties

- Remote branch deletion is irreversible from the normal branch list, though commits remain recoverable by hash for a time.
- `origin/main` requires later promotion/reconciliation and is intentionally preserved.

## Not Touched

- Runtime code, source data, generated data, main, origin/main, golden branch, tags, stash, and merge state.

## Follow-Up Recommendations

- Reconcile `origin/main` into the golden-main promotion flow separately.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-401-golden-branch-stale-branch-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-0940-codex-vm400-apocrypha-release-train-publish.md`
