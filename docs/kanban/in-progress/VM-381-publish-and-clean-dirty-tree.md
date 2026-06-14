# VM-381 - Publish And Clean Dirty Tree

ID: VM-381
Title: Publish And Clean Dirty Tree
Status: in-progress
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
- [ ] Bundle committed.
- [ ] Branch pushed.
- [ ] Final clean status confirmed.
