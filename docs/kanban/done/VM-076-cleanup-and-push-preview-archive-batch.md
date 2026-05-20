## VM-076 - Cleanup And Push Preview / Archive Batch

ID: VM-076
Title: Cleanup And Push Preview / Archive Batch
Status: done
Type: release cleanup
Area: repository hygiene
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Cleaned the preview, snapshot, colorless-docs, and archive-heavy worktree so the intended batch could be staged, verified, and published without stray local backups or undocumented scratch files.

## Source

User request to clean up the tree and push the current work if safe.

## Acceptance Criteria

- Documented preview, docs, and research/archive files are staged intentionally.
- Obvious scratch, backup, and OS-generated files are removed or ignored.
- Reference compatibility is preserved for existing docs that still cite `docs/research/Deep_Dive_MTG_Color_Pie_Research.md`.
- Relevant tests/checks pass before commit.
- The cleaned batch is committed on `feature/batch-1-foundation` and pushed if remote access permits.

## Files Likely Impacted

- `.gitignore`
- Preview files under repo root and `assets/`
- Research/docs archive files under `docs/research/`, `docs/reference/`, and `docs/architecture/`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks

- The batch mixes runtime changes, preview work, documentation, and archive material.
- Imported archive/design sources still contain their original trailing whitespace, so repository whitespace checks must distinguish authored files from source captures.
- Existing docs still reference legacy research paths, which should remain compatible unless a later explicit reorg updates those references.

## Outcome

- Removed stray local scratch and backup files.
- Kept the legacy Deep Dive research path in place for compatibility.
- Ignored `desktop.ini` going forward.
- Verified runtime/tests plus preview/snapshot/colorless tooling before commit.
