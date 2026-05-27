ID: VM-139
Title: Apply Validated Precon Mechanics From Completed XLSX
Status: done
Type: Data / QA / Archscry
Area: Archscry, Commander Compass
Priority: high
Created: 2026-05-26
Completed: 2026-05-26

## Summary

Imported the completed 155-row precon mechanics validation workbook into the canonical precon source, updating only `mechanics` and nullable `creatureTypeFocus`, then rebuilt generated artifacts through `build:precons`.

## Acceptance Criteria

- The import reads `data/precons/reference/vox_mana_precon_mechanics_validation_all_155_completed.xlsx` through a Node-only script.
- The selected workbook sheet resolves to the first sheet with all required columns; for this workbook it resolves to `Mechanics Normalization Review`.
- The importer matches all 155 rows by `productSection + deckName` and fails on duplicates, unmatched rows, invalid validation status, or invalid mechanics shape.
- Canonical source updates are limited to `mechanics`, `creatureTypeFocus`, and the schema version bump.
- `secondaryCommanders`, `recommendedSecondCommander*`, `recommendationSourceBasis`, and `secondCommanderRecommendation` remain unchanged.
- `creatureTypeFocus` is required nullable in source and generated contracts.
- Generated precon artifacts are rebuilt only through `npm.cmd run build:precons`.
- Tests, docs, Kanban, and handoff are updated.

## Non-Goals

- No dossier UI changes.
- No recommendation ranking changes.
- No browser/runtime workbook loading.
- No second-commander v3 schema implementation.
- No changes to placement, save/resume, Maze, or Strategium behavior.

## Notes

- The workbook is a staging/reference artifact only. The canonical JSON remains the source of truth after import.
- The mechanics MVP rule is 3-6 short, source-supported gameplay tags.
- `Typal synergy` is not an allowed mechanic tag.
- The first VM-139 import updated 155 canonical records. Subsequent idempotency runs reported 155 matched, 155 unchanged, and 0 updated.
