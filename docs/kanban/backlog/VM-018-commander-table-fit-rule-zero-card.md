# VM-018 - Commander Table Fit and Rule Zero Card

ID: VM-018
Title: Commander Table Fit and Rule Zero Card
Status: backlog
Type: Enhancement / UX
Area: Archscry, Commander Compass, Maze
Priority: medium
Created: 2026-05-15

## Summary

Add a Commander table-fit layer to Vox Mana that helps users understand not only what a commander or deck does, but what kind of Commander table it belongs at. The feature should use Commander bracket language as a conversation aid, not as a rigid certification, and should surface a short Rule Zero Card that a player can actually say before a game.

## Source Evidence

- `docs/project-atlas.md` - Archscry is the placement frontend and commander-discovery bridge; the product already treats result presentation as a distinct layer.
- `docs/data-flow-map.md` - `placement_result` is the saved-return source of truth, and the Maze handoff already preserves return and context state that a table-fit layer can reuse.
- `docs/data-contracts.md` - the current result contract already includes `adjacent_matches` and the broader placement payload this feature would present from.
- `docs/core-logic-and-algorithms.md` - result rendering already translates raw placement signals into a presenter layer and supports save/resume behavior.
- `docs/manual-test-cases.md` - returning-user, adjacent-fit, and legacy fallback cases already define the continuity boundaries this story should respect.
- `docs/kanban/backlog/VM-008-commander-compass-v1-5-archetype-guided-recommendations.md` - establishes fit/explanation language for Commander Compass.
- `docs/kanban/backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md` - keeps the Maze Commander Finder / graph layer in view for future search-path reuse.
- `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md` - already captures the saved-profile continuation lane this story should not duplicate.

## Problem

Commander Compass and Archscry can already explain placement, fit, and adjacent results, but the product does not yet package that information into a short social summary that answers a more practical question: what kind of Commander table is this deck suited for, and what should I say in a Rule Zero conversation?

Without that layer, users have to mentally translate Archscry output into table expectations, speed expectations, and salt warnings on their own.

## Proposed Outcome

A compact "Table Fit" or "Rule Zero Card" panel that appears as a presenter-layer summary and includes:

- estimated bracket or bracket range
- confidence or adjacent language where appropriate
- why the deck fits that bracket
- what the deck is trying to do
- possible salt points
- speed expectation
- known table concerns
- a suggested Rule Zero script

The panel should read as estimated, adjacent, and table-fit language, not as an official certification or hard ruling.

## Acceptance Criteria

- The story exists as a standalone backlog enhancement with no runtime or schema changes attached yet.
- The panel can express bracket language as an estimate or range and can fall back to adjacent / table-fit phrasing when confidence is not exact.
- The output includes the requested social summary fields: why it fits, game plan, salt points, speed expectation, table concerns, and a short script.
- The copy explicitly avoids presenting brackets as a final certification or objective badge.
- The feature can be fed from existing Archscry / Commander Compass output and remain compatible with Maze search-path or commander-finder follow-up work.
- The story stays distinct from `VM-008`, `VM-010`, and `VM-015` while building on the same result and resume vocabulary.

## Non-Goals

- This is not full decklist ingestion or deck import.
- This is not a popularity-only ranking surface.
- This is not official bracket certification or rules enforcement.
- This does not require new saved-profile schema fields in the first planning pass.
- This does not replace existing Archscry placement or Commander Compass recommendation surfaces.

## Dependencies / Related Work

- `VM-008` Commander Compass V1.5 archetype-guided recommendations.
- `VM-010` The Loom Commander Finder Mode and Graph/Query Layer.
- `VM-015` Returning User Commander Fit Check.
- `VM-006` Archscry / Maze verification and repeat-visit polish.
- Existing `placement_result`, `adjacent_matches`, and saved-return presenter-layer behavior.

## Testing Notes

- Future implementation should add manual QA for a bracket estimate, an adjacent-confidence case, a Rule Zero script, and a no-profile fallback.
- Future checks should confirm the panel still reads well on returning-user paths and does not collapse into a certification badge.
- This backlog card itself should not require runtime tests yet.

## Delivery / Removal Criteria

This enhancement can be marked delivered or removed from the active backlog when:
- users can get a short table-fit summary from Archscry or related commander discovery surfaces
- the summary uses estimated / adjacent / table-fit language instead of hard rulings
- the Rule Zero script is present and readable enough to speak out loud before a game
- the story is either implemented or explicitly split if Maze or additional commander-finder wiring expands the scope

## Human Review

Yes - this is a product-shaping copy and UX story that should be confirmed before build work.

## Notes

Keep the first pass focused on the presenter layer and social usefulness. The point is to help users talk about the table honestly, not to invent a new ranking system.
