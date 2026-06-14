# VM-381 - Publish And Clean Dirty Tree

ID: VM-381
Title: Publish And Clean Dirty Tree
Status: done
Type: Release Hygiene / Git
Area: Repo Cleanup, Verification, Publish
Priority: high
Created: 2026-06-13

## Summary

Classify the current dirty tree, preserve documented accumulated work, exclude scratch/unresolved files, run the required verification gates, commit the approved bundle, push `feature/ui-refactor-exploration`, and confirm the worktree is clean.

## Scope

- Re-read required coordination docs before staging.
- Classify tracked edits, tracked deletions, untracked docs/cards/handoffs/data/assets/scripts, generated outputs, and scratch files.
- Rebuild generated faction outputs through approved generators before staging generated files.
- Run publish-readiness tests and record failures or warnings.
- Stage only classified publishable files.
- Commit and push to `origin/feature/ui-refactor-exploration` without force.
- Leave final `git status --short --branch` clean.

## Out Of Scope

- No feature redesign.
- No new lore, commander facts, or source claims.
- No hand edits to generated outputs.
- No force-push.
- No public API, route, schema, Home preview, alias, or hero expansion beyond already documented VM work.
- No staging of scratch `._relic_*` files.

## Acceptance Criteria

- Dirty tree classification is documented in the VM-381 handoff.
- Scratch/unresolved files are either excluded and removed when clearly disposable or left reported if unresolved.
- Required verification gates are recorded.
- `git diff --cached --name-status` is summarized before commit.
- Commit hash and pushed branch are recorded.
- Final `git status --short --branch` is clean.

## Validation Checklist

- [x] Preflight docs reviewed.
- [x] Dirty tree classified.
- [x] Generated outputs rebuilt.
- [x] Required tests run.
- [x] Classified files staged.
- [x] Bundle committed.
- [x] Branch pushed.
- [x] Final clean status confirmed.

## Completion Notes

- Main bundle commit: `9322e58c2218b9a8f3c687f70fe0b82b376016ef`
- Main bundle push: `7b1028e..9322e58 feature/ui-refactor-exploration -> feature/ui-refactor-exploration`
- Post-push branch check: `git rev-list --left-right --count HEAD...origin/feature/ui-refactor-exploration` returned `0 0`.
- Post-push status before VM-381 closeout edits: `git status --short --branch` showed only the branch header.
- Closeout commit records this done-state and final handoff metadata.
