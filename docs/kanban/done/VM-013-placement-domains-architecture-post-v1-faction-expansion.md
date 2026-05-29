# VM-013 - Placement Domains Architecture and Post-V1 Faction Expansion

ID: VM-013
Title: Placement Domains Architecture and Post-V1 Faction Expansion
Status: done
Type: Enhancement / Research
Area: Archscry, Commander Compass
Priority: low
Created: 2026-05-15
Completed: 2026-05-28

## Summary

Document the domain-aware placement architecture now so future Khans and New Capenna expansion work has a stable home without changing the live 20-expression placement model.

## Source

- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\faction-expansion-khans-capenna.md`
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\03-data-architecture.md`
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\_index.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`

## What Shipped

- Added `docs/architecture/placement-domains.md` as the canonical placement-domain architecture spec.
- Locked `ravnica_strixhaven` as the current active baseline domain for the live 20-expression model.
- Recorded `khans` and `new_capenna` as future post-v1 roadmap domains only.
- Clarified that no runtime or generated artifact currently exposes a live `domain` field.
- Preserved the current repo truth that raw source coverage remains 15 faction folders while mono coverage is represented through the identity-layer model.

## Acceptance Criteria

- The placement model has a clear path to represent domain-aware expansion without replacing the existing 20-expression live model.
- Future wedge and family groups have a documented post-v1 home without being treated as parallel live placement systems.
- The expansion story remains clearly post-v1 and does not block current Archscry work.
- The dependency chain from placement architecture to later faction expansion is explicit enough for future implementation.

## Files Changed

- `docs/architecture/placement-domains.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/core-logic-and-algorithms.md`

## Notes

This closeout is intentionally docs-only. It does not add, rename, or reclassify any expression, faction, guild, college, wedge, family, or mono identity. Future Khans and New Capenna implementation should happen as separate follow-on cards rather than reopening this prerequisite slice.
