# VM-024 - Normalize Docs Paths After Reorg

ID: VM-024
Title: Normalize Docs Paths After Reorg
Status: backlog
Type: Documentation
Area: Documentation
Priority: medium
Created: 2026-05-17

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
