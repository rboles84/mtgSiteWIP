ID: VM-137
Title: Faction-Native Precon Recommendations Across Active Archscry Expressions
Status: done
Type: Data / UX / Archscry
Area: Archscry, Commander Compass
Priority: high
Created: 2026-05-26
Completed: 2026-05-26

## Summary

Refine the Archscry precon layer so same-color sibling expressions are not treated as interchangeable. Exact-color precons remain visible, but faction-native decks render first for the active dossier view across the current 20-expression atlas: 5 mono colors, 10 guilds, and 5 Strixhaven colleges.

## Acceptance Criteria

- The precon source and generated catalog support curated `factionRefs` for current active expression keys.
- The dossier recommendation helper returns grouped results for `nativeExact`, `otherExact`, and `stretch`.
- Exact-color results are no longer truncated; all exact matches render for the active view.
- Guild and college sibling expressions with the same colors can surface different native groups from the same exact-color pool.
- Mono-color views fall back to a single `Exact Match` lane unless explicit native refs are added later.
- The `commander-deck-starts` panel still renders `Recommended Precon Decks`, then `Commander Deck Starts`, then `Commander Lanes`.
- Tests, docs, Kanban, and handoff are updated.

## Non-Goals

- No placement scoring changes.
- No save/resume or Supabase contract changes.
- No Maze handoff changes.
- No Strategium changes.
- No price-aware ranking or commerce flow.

## Notes

- `Recommended` means faction-native first, not merely same-color.
- College-owned precons should not also be tagged as guild-native just because they share a color identity.
