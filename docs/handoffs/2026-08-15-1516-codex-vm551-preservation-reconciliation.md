# VM-551 Preservation Artifact Reconciliation

## Agent

Codex

## Task Requested

Determine whether the two external VM-551 preservation directories were still necessary, move useful unrecoverable material into `main`, and remove redundant filesystem clutter when repository history could safely carry it.

## Files Reviewed

- `C:\dev\voxmana.io-preserved-artifacts\vm551-historical-review-evidence\**`
- `C:\dev\voxmana-control-preservation-20260815-070432\**`
- `AGENTS.md`
- Current VM-551 audit, handoff, board, guide, and research records on `main`
- Historical commits `326419c3`, `bc28ca22`, and `acbffd9a`

## Files Changed

- `AGENTS.md`
- `docs/research/cleaned_EDH_commander_discussion.md`
- `docs/research/vox_mana_voice_spec.md`
- `docs/archive/vm551-historical-review-evidence/README.md`
- Six archived historical independent-review/handoff documents beneath that archive
- `docs/kanban/done/VM-551-preservation-artifact-reconciliation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-15-1516-codex-vm551-preservation-reconciliation.md`

## What Changed

- Reinstated the owner-required single active branch/worktree hard-stop that existed only in the preserved dirty control copy.
- Added the two research sources that had never entered Git and therefore could not otherwise be recovered.
- Copied the six unique rejected-review documents from three dangling historical review commits into a clearly superseded archive on `main`.
- Excluded obsolete copies of the board, handoff index, completed audit card, manifests, and patches because current `main` supersedes them and their unique conclusions are retained in the archived documents.

## Why It Changed

External preservation directories were appropriate during destructive cleanup, but leaving them indefinitely would create duplicate and poorly governed state. The repository now carries the useful evidence, allowing the external bundles to be safely removed.

## Decisions Made

- Keep source material, governance, and unique review conclusions in Git.
- Do not preserve duplicate historical snapshots merely for byte-level symmetry.
- Mark the three independent reviews as superseded rejection history, not current authority.
- Do not create branches, worktrees, tags, or hidden refs to retain obsolete review commits.

## Risks / Uncertainties

- `cleaned_EDH_commander_discussion.md` is raw player-language research, not identity or placement authority.
- `vox_mana_voice_spec.md` is a derived writing aid, not empirical validation.
- Archived review records must never override the later accepted VM-551 audit and implementation.

## Tests Run

- Exact Git reachability and current-main presence audit for both preservation bundles.
- Byte/hash comparison against current files, accounting for CRLF/LF worktree normalization.
- Historical disposition scan confirming all three archived reviews rejected superseded candidates.
- `git diff --check` and explicit staged-path audit.
- Post-push live `origin/main` verification before external directory deletion.

## Not Touched

- VM-551 runtime, placement model, questions, answers, scoring, routing, stopping, qualification, dossiers, Matrix, persistence, or identity authority.
- Production assets or deployment behavior.
- Any branch or worktree.

## Follow-Up Recommendations

None. The archived rejection evidence and research sources are now ordinary repository history; no separate preservation folders are required.

## Next Suggested Agent

None.

## Related Kanban, Docs, Or Plans

- `docs/kanban/done/VM-551-preservation-artifact-reconciliation.md`
- `docs/archive/vm551-historical-review-evidence/README.md`
- `docs/handoffs/2026-08-15-0713-codex-vm551-final-closeout.md`
