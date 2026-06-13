# VM-343 - Ravnica Guild Source-Role Normalization

ID: VM-343
Title: Ravnica Guild Source-Role Normalization
Status: in-progress
Type: source-normalization / data governance
Area: raw-factions / Ravnica guilds / source ledgers
Priority: critical
Created: 2026-06-12
Completed: 2026-06-12

## Summary

Normalize all ten Ravnica guild raw source ledgers to the current source-bound standard by adding a defensible `source_role` to every source row and creating a reusable source-readiness matrix.

## Source

User-requested Ravnica Guild Source Normalization goal, governed by VM-300 and VM-325.

## Acceptance Criteria

- [x] Add `source_role` to every source row for Azorius `WU`, Boros `WR`, Dimir `UB`, Golgari `BG`, Gruul `RG`, Izzet `UR`, Orzhov `WB`, Rakdos `BR`, Selesnya `WG`, and Simic `UG`.
- [x] Use only the approved role vocabulary: `claim-bearing`, `support-only`, `shaping-only`, and `discovery-only`.
- [x] Every `claim-bearing` row traces to actual raw claim, profile, or placement usage.
- [x] Create a mandatory matrix with source counts, role counts, unresolved rows, claim-bearing coverage, placement/discriminator readiness, Commander/deck support classification, and future repair notes.
- [x] Do not edit placement questions, claims, generated files, runtime, or guild prose as part of VM-343.

## Files Likely Impacted

- `data/raw-factions/*/*.sources.json` for the ten guild folders only.
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/kanban/board.md`

## Risks

- The worktree is broadly dirty before this card.
- Story-corpus rows may look claim-adjacent but remain discovery-only unless they directly support a claim/profile/placement field beyond corpus discovery.
- Generated files are comparison outputs only and must not be edited by hand.

## Implementation Prompt

Inspect raw claims, profiles, placements, and sources for all ten guilds. Add `source_role` only where the role is supported by existing local source usage. Record matrix notes for any future source-intake or repair needs instead of inventing backing.

## Notes

This card is one phase of the continuous VM-343 through VM-345 Ravnica guild source-normalization goal.

## Outcome

Normalized 158 active Ravnica guild source rows:

- `claim-bearing`: 57
- `support-only`: 9
- `shaping-only`: 0
- `discovery-only`: 92
- unresolved: 0

Added `docs/reference/ravnica-guild-source-readiness-matrix.md` as the reusable source-readiness matrix.

## Validation

- Guild raw JSON parse passed for 50 files.
- Source-role probe passed for all ten guild source ledgers.
- Full validation and generated rebuild results are recorded under VM-345.
