# VM-002 - Cleanup And Push Batch 1 Foundation

ID: VM-002
Title: Cleanup And Push Batch 1 Foundation
Status: done
Type: release cleanup
Area: repository hygiene
Priority: high
Created: 2026-05-14

## Summary

Clean the Batch 1 foundation worktree, keep generated outputs ignored, verify tests, and publish the complete intended batch from `feature/batch-1-foundation`.

## Source

User-approved cleanup, commit, and push plan in Codex thread.

## Acceptance Criteria

- Generated local outputs are ignored and removed from the working tree.
- Intended tracked and untracked source, data, documentation, and test files are staged together.
- `npm.cmd test` passes before commit.
- The batch is committed as `feat: complete batch 1 foundation`.
- The branch is pushed to its existing upstream.

## Files Likely Impacted

- `.gitignore`
- Batch 1 app, research, data, docs, and Supabase context files
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks

- The staged batch is broad and includes runtime, parser, data, generated-source, and documentation changes in one commit by user request.
- Commander dossier audit still reports warnings, but no failures; this remains a future content-quality follow-up.

## Implementation Prompt

Remove only ignored generated output folders, keep source artifacts, run tests, create the required coordination record, stage everything intended, commit, and push.

## Notes

- Completed as a repository cleanup and release handoff task.
