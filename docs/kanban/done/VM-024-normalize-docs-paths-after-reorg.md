# VM-024 - Normalize Docs Paths After Reorg

ID: VM-024
Title: Normalize Docs Paths After Reorg
Status: done
Type: Documentation
Area: Documentation
Priority: medium
Created: 2026-05-17
Completed: 2026-05-28

## Summary

Normalize the active Vox Mana documentation hub after the reference/architecture/diagrams reorg so the canonical docs tree stays internally consistent and no longer points at stale flat `docs/*.md` paths.

## Source

- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/move-into-repo.md`
- `docs/diagrams/data-pipeline.mmd`

## Acceptance Criteria

- Active docs hubs point at the current canonical files under `docs/reference/`, `docs/architecture/`, `docs/design/`, and `docs/diagrams/`.
- The docs index and atlas no longer assume the old flat layout.
- The color-pie archive is represented under the intended `docs/research/`, `docs/architecture/system/`, `docs/architecture/colors/`, `docs/analysis/`, and `docs/analysis/color-audits/` folders.
- The color audit PDFs remain as `summary.pdf`.
- No runtime code, generated data, or build behavior changes are required.

## Notes

This is a documentation-path cleanup only. Keep the content tone, historical handoffs, and runtime behavior intact.

## Completion Note

Original implementation landed in `docs/handoffs/2026-05-17-0138-codex-normalize-docs-paths-after-reorg.md`.

Active-doc closeout was completed on 2026-05-28. Pre-flight confirmed `docs/reference/README.md`, `docs/reference/spec-index.md`, `docs/architecture/project-atlas.md`, `docs/architecture/data-flow-map.md`, and `docs/diagrams/data-pipeline.mmd` had no active path drift requiring edits. The closeout pass repaired the live `docs/diagrams/diagrams.md` links and images and recorded the VM-024-specific follow-up in `docs/handoffs/2026-05-28-1704-codex-vm024-active-doc-closeout.md`.

The card move to `done/` had already been completed during the broader Kanban cleanup recorded in `docs/handoffs/2026-05-28-1702-codex-kanban-cleanup-closeout.md`.

Historical references inside migration notes, archived handoffs, and old done cards were intentionally left untouched.
