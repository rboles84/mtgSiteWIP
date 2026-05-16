# VM-013 - Placement Domains Architecture and Post-V1 Faction Expansion

ID: VM-013
Title: Placement Domains Architecture and Post-V1 Faction Expansion
Status: backlog
Type: Enhancement / Research
Area: Archscry, Commander Compass
Priority: low
Created: 2026-05-15

## Summary

Keep the future faction-expansion work together as one story: a domain-aware placement architecture that can eventually support post-v1 groups such as Khans wedges and New Capenna families without distorting the current core model.

## Source

- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\faction-expansion-khans-capenna.md` - explicitly marks Khans wedges and New Capenna families as post-v1 work that depends on a domains-aware architecture.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\03-data-architecture.md` - describes the current Commander Compass data architecture and what a recommendation needs.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\_index.md` - keeps the canonical Commander Compass set and its future expansions in one place.
- `docs/core-logic-and-algorithms.md` and `docs/data-flow-map.md` - show the current placement model, scoring, and generated-data boundaries.

## Acceptance Criteria

- The placement model has a clear path to represent domain-aware expansion without replacing the existing 15-faction core.
- Future wedge/family groups can carry evidence, labels, and UI routing without being treated as parallel placement systems.
- The expansion story remains clearly post-v1 and does not block current Archscry work.
- The dependency chain from placement architecture to later faction expansion is explicit enough for future implementation.

## Dependencies / Related Work

- Current placement model and raw faction data
- Commander Compass data architecture
- VM-008 archetype-guided recommendations if those later need broader faction lanes

## Files Likely Impacted

- `data/raw-factions/*`
- `data/placement-model.json`
- `assets/js/adaptive-placement.js`
- `docs/core-logic-and-algorithms.md`
- `docs/data-flow-map.md`

## Risks / Uncertainties

- Schema changes could ripple through generated data if the architecture grows too early.
- Post-v1 faction expansion can easily overtake the current product if it is not gated carefully.
- Khans and Capenna framing should stay cleanly separate from the shipped core factions.

## Implementation Prompt

Document and plan the domain-aware placement architecture now so later faction expansions have a stable home without destabilizing the current model.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The architecture path for post-v1 faction expansion is clear and does not force current model churn.
- Khans wedges and New Capenna families have a documented, non-conflicting expansion plan.

## Human Review

Yes - this is a major architecture and product-roadmap story that needs human review.

## Notes

This should remain a future-facing architecture card, not a prompt to expand the shipped faction set immediately.
