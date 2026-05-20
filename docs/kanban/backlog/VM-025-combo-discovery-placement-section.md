# VM-025 - Combo Discovery Placement Section

ID: VM-025
Title: Combo Discovery Placement Section
Status: backlog
Type: Enhancement / UX
Area: Archscry, Maze
Priority: high
Created: 2026-05-17

## Summary

Add a lightweight `Combo Discovery` section to the placement dossier so Vox Mana can serve two user mindsets at once: players who need a plain-language explanation of what combos are, and players who already want direct combo search paths.

This is a placement-page teaching and launch section, not a full combo dashboard. V1 should stay lightweight, use external combo surfaces, and preserve the dossier's readability.

## Source

- User-provided `VM-025 Plan: Combo Discovery Placement Section` - defines the exact V1 scope, placement, copy intent, query defaults, and non-goals.
- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md` - confirms the current dossier flow, the narrowed guidance intent, and the importance of not overloading result navigation.
- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md` - confirms current layered identity and mono-color routing context, including White as the first active mono identity.
- `docs/handoffs/2026-05-17-0043-codex-vm012-shared-maze-query-handoff-helper.md` - confirms the current Archscry-to-Maze handoff boundary that this story should not rewrite.
- `docs/architecture/data-flow-map.md` - documents existing dossier runtime state, return behavior, and Maze handoff storage.

## Problem

The placement page already teaches identity, adjacent fits, mana alignment, table identity, lore-to-mechanic, commander paths, deck starts, archetypes, starter cards, mana base, and Maze paths.

If combos are added as another expert-only card, new players may not understand what they are or why they matter. If the page only offers a generic combo exit, advanced players lose the fast lane they expect.

The dossier needs a combo entry point that supports both audiences without assuming combo literacy and without turning the result page into a full combo workspace.

## Proposed Outcome

Add `Combo Discovery` to the placement page immediately after `Commander Deck Starts` and before `Playstyle Archetypes`.

The section should use a lightweight two-lane segmented control:

- `New to Combos` - default view in V1
- `I know what I want` - advanced view

The beginner lane should:

- explain combos in plain language
- explicitly say combos are optional
- provide one EDHREC combo browse action
- provide one Commander Spellbook combo-search action

The advanced lane should:

- keep direct actions concise and readable
- provide EDHREC identity combo browse
- provide Commander Spellbook combo searches
- include direct `Popular`, `Budget`, and `Exact Identity Only` actions
- include a small capped set of theme-specific combo chips

V1 should use external combo surfaces only. It should not promise or require a native Maze combo mode.

## Acceptance Criteria

- A standalone backlog story exists for `Combo Discovery` with no runtime implementation attached yet.
- The planned section placement is after `Commander Deck Starts` and before `Playstyle Archetypes`.
- The story explicitly frames the section as teaching plus launch, not a full combo dashboard.
- `New to Combos` is the default V1 view.
- Beginner copy explains what combos are in plain language and states that combos are optional.
- V1 advanced actions use external EDHREC and Commander Spellbook paths, not a native Maze combo provider.
- Default combo query behavior is `ci<=identity legal:commander`.
- Exact identity behavior is `ci=identity legal:commander` and is treated as an advanced option.
- Advanced query lanes include `popularity>100` for popular combos and `price<=25` for budget combos.
- Theme-specific combo actions are intentionally capped so the dossier stays readable.
- The story explicitly notes that an existing Commander Spellbook dictionary in JavaScript format already exists and should be evaluated as starting implementation input instead of regenerated from scratch.
- Existing Maze return and continuity behavior remain out of scope for this story.

## Non-Goals

- This is not a native Maze combo-search mode.
- This is not a Commander Spellbook integration rewrite.
- This is not a Maze parser or Scryfall query-language rewrite.
- This is not a handoff-contract rewrite for Archscry-to-Maze state.
- This does not add saved-result schema fields in V1.
- This does not turn the placement page into a full combo dashboard.

## Dependencies / Related Work

- `VM-021` Archscry Results UX Consolidation Pass
- `VM-023` Mono Identity Layer Refactor + White Pilot
- `VM-012` Scryfall Parser Expansion and Diagnostics
- `VM-022` Maze Core Extraction
- Existing dossier presenter layout and Archscry-to-Maze handoff behavior

## Testing Notes

- Future implementation should verify section order in the dossier.
- Future implementation should verify beginner copy and optional framing are visible and readable.
- Future implementation should verify EDHREC combo routing is identity-correct, including mono-color routing such as White -> `/combos/mono-white`.
- Future implementation should verify Commander Spellbook query links match the planned query shapes.
- Future implementation should verify the advanced lane stays concise on desktop and mobile.
- Future implementation should confirm Maze return and continuity behavior remain unchanged.

## Implementation Prompt

Plan and implement a lightweight `Combo Discovery` dossier section that teaches new players what combos are, gives advanced players fast combo exits, and launches external EDHREC and Commander Spellbook combo paths without broadening into a native Maze combo mode.

## Delivery / Removal Criteria

This enhancement can be marked delivered or removed from the active backlog when:

- the placement dossier includes the planned `Combo Discovery` section
- the section teaches combo basics without assuming combo literacy
- advanced users can jump directly into combo browse/search paths
- the section remains lightweight and does not collapse into a full combo dashboard
- any future native Maze combo mode, if still wanted, is handled as a separate follow-up story

## Human Review

Yes - this is a product-shaping UX, copy, and external-routing story that should be reviewed before implementation.

## Notes

Keep V1 scope exactly as planned: no feature adds, no removals, and no native Maze combo mode.

User note: a Commander Spellbook dictionary has already been generated in JavaScript format. Treat that artifact as prior work and possible implementation input for future combo-search or query-mapping layers instead of recreating it by default.
