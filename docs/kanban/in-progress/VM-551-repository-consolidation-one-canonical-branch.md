# VM-551 — Repository Consolidation To One Canonical Branch

Status: In Progress

## Objective

Consolidate the existing linear VM-551 development history into the existing latest functional worktree under one canonical local branch, `codex/vm551`, and one canonical worktree, `C:\dev\voxmana.io-vm551`.

## Authority

- Latest functional tip: `3ece2e83f9fa7ff0f2115ab2dd351a6dbfd2824d`
- Consolidation workspace: `C:\dev\voxmana.io-vm551-gate-b1-alternatives-repair`
- Final branch: `codex/vm551`
- Final worktree: `C:\dev\voxmana.io-vm551`
- Preservation record: `docs/handoffs/VM-551-BRANCH-CONSOLIDATION-INVENTORY.md`

## Scope

1. Inventory and preserve every local VM-551 tip and checkpoint.
2. Rename the existing latest branch; create no new branch or worktree.
3. Validate canonical VM-551 content and tests.
4. Commit the preservation record before cleanup.
5. Move the existing worktree with Git tooling.
6. Remove only clean obsolete VM-551 worktrees and safely delete only ancestral obsolete branch names.
7. Record and verify the final one-branch/one-worktree state.

## Protected Surfaces

No questionnaire, UI, questions, mappings, routing, scoring, stopping, Yore, dossier, Gate A, production behavior, deployment, migration, certification, or player-validation change is authorized.

## Stop Conditions

Stop on dirty obsolete work, divergence, non-ancestral tips, a pre-existing divergent `codex/vm551`, nontrivial product conflicts, failed safe worktree removal, or failed safe branch deletion.
