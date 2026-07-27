# VM-549 - Architecture Documentation Layer

ID: VM-549
Title: Architecture Documentation Layer
Status: done
Type: Documentation
Area: Docs, Architecture
Priority: medium
Created: 2026-07-25
Completed: 2026-07-25

## Summary

Create a small, stable architecture documentation layer for Vox Mana without changing production code or reorganizing the repository.

## Scope

- Add a concise `docs/README.md` that explains the current top-level documentation folders.
- Add `docs/architecture/README.md` to define the Architecture folder's purpose and boundaries.
- Add `docs/architecture/behavioral-model-integration-roadmap.md` as a governing architecture roadmap for the identity corpus, question corpus, shared behavioral model, Archscry, Maze/Loom, Strategium, Commander Compass, and future systems.
- Review the existing documentation tree and report suggested future moves without moving files.

## Acceptance Criteria

- [x] Documentation-only changes.
- [x] No production code changed.
- [x] No generated artifacts changed.
- [x] No folders renamed or reorganized.
- [x] Architecture documents remain concise, durable, and focused on intent.
- [x] Suggested future moves are recommendations only.

## Not Touched

- Runtime HTML, CSS, and JavaScript.
- Source-governed identity, placement, commander, lore, or Scryfall data.
- Generated artifacts.
- Existing documentation placement, except for adding the requested files and required workflow records.

## Related Documents

- `docs/README.md`
- `docs/architecture/README.md`
- `docs/architecture/behavioral-model-integration-roadmap.md`
- `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`
- `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`
