# VM-466 - Loom V0/V1 Naming And Concept Seed Decision

ID: VM-466
Title: Loom V0/V1 Naming And Concept Seed Decision
Status: Complete
Type: Product Decision / Strategy
Area: Maze, Loom, Commander Search
Priority: High
Created: 2026-07-03
Completed: 2026-07-03

## Summary

Answered the VM-457 Loom review questions, approved the v0/v1 naming split, selected Explorer Mode as the first implementation slice, and approved a 10-concept registry seed.

## Outcome

- Current `The Loom` / Visual Builder is Loom v0.
- Graph-aware concept/thread/query work is Loom v1.
- Public tab label stays `The Loom`; no runtime rename is required before v1.
- First v1 implementation slice is Explorer Mode with concept registry, query preview, and existing Maze search handoff.
- Custom card generation, PACKAGE mode, Commander Finder, placement-weighted threads, graph-only UI, deckbuilding, ranking, legality, and best-card recommendations are not approved for the first slice.
- Approved seed concepts: Flying, Card Draw, Token Generation, Removal, Tempo, Recursion, Control, Storm / Spells Matter, Sacrifice, Aristocrats.

## Acceptance Criteria

- [x] Decision note exists under `docs/strategy/`.
- [x] Clear go/no-go for current Loom naming.
- [x] First implementation slice is selected.
- [x] 8-12 seed concepts are approved with guardrails.
- [x] VM-457 deep dive links to the decision trail.

## Validation

- Docs review.
- `git diff --check` scoped to the changed docs/cards passed with line-ending warnings only.

## Related Work

- `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`
- `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`
- VM-457
