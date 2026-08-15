# VM-551 — Preservation Artifact Reconciliation

## Status

Done on `main` after VM-551 closeout.

## Objective

Remove redundant external preservation folders without losing unique governance, research, or historical review material.

## Result

- Restored the owner-required single active branch/worktree hard-stop to `AGENTS.md`.
- Committed the two otherwise unrecoverable research sources under `docs/research/`.
- Archived the six unique rejected-review documents under `docs/archive/vm551-historical-review-evidence/`.
- Did not import obsolete board/index snapshots, generated patch bundles, or files already present in accepted history.
- Verified the scoped repository commit and pushed it before deleting either external preservation directory.

## Boundaries

No VM-551 runtime, placement, dossier, Gate A, Matrix, persistence, scoring, routing, identity, or production behavior changed.
