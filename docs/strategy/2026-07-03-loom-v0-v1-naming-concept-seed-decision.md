# Loom V0/V1 Naming And Concept Seed Decision

Date: 2026-07-03
Related card: VM-466
Status: Approved decision for first Loom implementation slice

## Decision Summary

Go for Loom naming with a documented v0/v1 split.

- The current Maze visual filter builder is officially Loom v0.
- The public tab label may remain `The Loom`; no runtime rename to `Visual Builder` is required before v1.
- Loom v1 means the reviewed concept/thread/query layer described in VM-457, not just a richer filter panel.
- The first implementation slice is Explorer Mode, built text-first around a reviewed concept registry, query preview, and handoff into existing Maze search.
- No graph canvas, PACKAGE mode, Commander Finder, placement weighting, or custom card generation is approved for the first slice.

## Owner Review Answers

1. Current Visual Builder is Loom v0; the graph-aware concept layer is Loom v1.
2. Keep `The Loom` as the tab label for continuity, but document v0 as a visual query builder until v1 exists.
3. First real Loom slice: Explorer Mode.
4. Custom card generation is not part of Loom MVP. Keep it in a separate design lab if revived.
5. Loom may use archetype words for query meaning, but Strategium owns archetype education and table-literacy depth.
6. Commander Finder is a future Loom/Commander Compass evolution, not the first slice.
7. Placement evidence is optional context after the base concept registry works; it must not personalize or overstate confidence in v1.
8. PACKAGE mode is deferred because it starts to resemble deckbuilding.
9. Use `Related Threads` for the first public label. `Concept Paths` can remain an internal planning phrase.
10. The first approved concept seed is listed below.

## Approved Seed Concepts

Approved for the first registry:

- Flying
- Card Draw
- Token Generation
- Removal
- Tempo
- Recursion
- Control
- Storm / Spells Matter
- Sacrifice
- Aristocrats

Deferred until after the first slice:

- Evasion as a broad parent concept
- Ramp / Big Mana
- Graveyard / Reanimator
- Voltron / Equipment
- Enchantress
- Blink / Flicker
- Counters / Proliferate
- Landfall / Lands Matter
- Treasure
- Stax / Taxes
- Politics / Deals
- Pillow Fort
- Typal

## First Slice Shape

Build a small Loom v1 Explorer Mode that can:

- load a reviewed concept registry,
- let a user select one or more approved concepts,
- show the literal query fragments before search,
- explain what the selected concept means in Commander terms,
- run the existing Maze search contract rather than creating a second parser,
- show `Related Threads` as reviewed explanatory copy, not deck advice,
- keep Reading Finds local-first and non-scoring.

The first implementation should prefer text panels and deterministic query preview. A visual graph can follow only after concept semantics and queries are stable.

## Go / No-Go

Go:

- naming split: Loom v0 now, Loom v1 later;
- first v1 slice: Explorer Mode;
- first registry seed: the 10 approved concepts above;
- adapter path: concept registry -> query fragments -> existing Maze query/search.

No-go:

- renaming the current tab away from `The Loom` as a prerequisite;
- launching a graph-only visual shell;
- adding runtime GenAI;
- custom card generation;
- Commander Finder;
- PACKAGE mode;
- deckbuilding, scoring, ranking, legality, or best-card recommendations;
- placement-personalized Loom threads before the unpersonalized base layer works.

## Acceptance Notes

This decision converts VM-457 from review draft to implementation seed. It does not approve runtime code in this card. The next implementation card should be a narrow concept-registry and query-adapter spike.

## Related Work

- `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`
- `docs/kanban/done/VM-457-loom-foundation-deep-dive.md`
- `docs/kanban/backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md`
