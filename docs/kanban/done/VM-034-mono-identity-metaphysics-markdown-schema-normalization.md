# VM-034 - Mono Identity Metaphysics Markdown Schema Normalization

ID: VM-034
Title: Mono Identity Metaphysics Markdown Schema Normalization
Status: done
Type: Documentation / validation / content architecture
Area: Mono colors, identity, metaphysics, authoring schema
Priority: high
Created: 2026-05-17

## Summary

Create a canonical markdown schema for mono-color identity and metaphysics source files, then normalize all five mono-color source sets to that schema without changing runtime placement behavior.

This card treats mono colors as the foundational color contract. Guilds, schools, shards, clans, families, and other faction expressions remain out of scope.

## Acceptance Criteria

- `docs/reference/identity-metaphysics-markdown-schema.md` documents required sections, optional sections, parser-sensitive anchors, heading rules, formatting rules, and canonical skeletons.
- All five mono color source sets use the canonical `identity.md` and `metaphysics.md` structures.
- White is used as the pilot source set before normalizing the remaining four colors.
- Standalone validation exists for mono-color markdown drift.
- Validation is not wired into `npm run build:factions`, `npm test`, or package scripts.
- `npm.cmd run build:factions` succeeds as verification only.
- Existing behavior tests pass after normalization.
- No guild/school identity or metaphysics source files are created or modified.

## Scope Guardrails

- Do not change placement scoring.
- Do not change faction logic.
- Do not change Maze, Scryfall, combo, or UI behavior.
- Do not normalize guilds or schools in this pass.
- Do not invent new color philosophy, commander facts, guild files, or school files.
- Keep generated data untouched unless a verification command produces intentional, inspected changes.

## Outcome

Complete.

The schema doc now defines the mono-color markdown contract, including documented optional H2 locations. The standalone validator mirrors that documented policy and validates all ten mono-color markdown files.

White was normalized first as the pilot because it was the most complete and stable reference from VM-023 and VM-026. The pilot required no schema adjustment. Blue, Black, Red, and Green followed the pilot pattern cleanly after color-specific essay sections were demoted into allowed subsections or documented optional H2 locations.

## Testing Notes

- `node research/validate-mono-color-markdown.mjs --color white` -> passed
- `node research/validate-mono-color-markdown.mjs` -> passed
- `npm.cmd run build:factions` -> passed, no generated artifact diff
- `npm.cmd run test:placement` -> passed, 20 factions / 20 golden paths
- `npm.cmd test` -> passed, including 16 presentation snapshot cases
- `npm.cmd run dossier:audit` -> passed with 0 failures and 43 warnings

## Human Review

Yes - this is an architecture/content contract for future mono and higher-order faction work.
