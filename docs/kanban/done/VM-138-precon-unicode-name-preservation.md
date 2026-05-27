ID: VM-138
Title: Precon Unicode Name Preservation
Status: done
Type: Data / QA / Archscry
Area: Archscry, Commander Compass
Priority: high
Created: 2026-05-26
Completed: 2026-05-26

## Summary

Correct the canonical `Blood Rites` precon record so `Clavileño, First of the Blessed` renders with the proper `ñ`, and harden the precon artifact pipeline so replacement-character corruption is rejected instead of silently shipping broken commander names into dossier cards and outbound links.

## Acceptance Criteria

- The canonical precon source stores `Clavileño, First of the Blessed` correctly in the `Blood Rites` record.
- `npm run build:precons` regenerates the runtime catalog with the corrected commander name.
- Precon artifact tests assert the generated catalog preserves `Clavileño` and produces the expected MTGDecks and Scryfall commander links.
- The precon builder fails fast if canonical source text contains `U+FFFD` replacement characters.
- Docs, Kanban, and handoff are updated.

## Non-Goals

- No placement or dossier ordering changes.
- No recommender scoring changes.
- No Maze, auth, save/resume, or Strategium changes.

## Notes

- This is a pipeline integrity fix, not a presentation-only patch.
- The canonical edit path remains `data/precons/vox-mana-precons.source.json` followed by `npm run build:precons`.
