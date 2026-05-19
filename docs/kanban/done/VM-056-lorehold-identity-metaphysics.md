# VM-056 - Lorehold Identity Metaphysics

ID: VM-056
Title: Lorehold Identity Metaphysics
Status: done
Type: Documentation / content architecture
Area: Lorehold College, school identity, metaphysics, schema-compatible authoring
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Created Lorehold College `identity.md` and `metaphysics.md` using `docs/reference/identity-metaphysics-markdown-schema.md` as the structural source of truth.

Lorehold is treated as an expression-level Strixhaven school pilot, not mono White plus mono Red and not generic Boros with archaeology language. Philosophical Weaknesses and Color Relationships are framed as Vox Mana internal architecture derived from approved evidence, not MTG canon.

## Coordination Note

The implementation plan originally targeted VM-052, but refreshed coordination state showed VM-052/VM-054 used by Golgari work, VM-053 used by Silverquill work, and a VM-055 Golgari coordination filename present. This Lorehold pass was renumbered to VM-056 to avoid a duplicate Kanban ID.

## Outcomes

- Created `docs/architecture/colors/lorehold/identity.md`.
- Created `docs/architecture/colors/lorehold/metaphysics.md`.
- Used canonical H2 anchors in order.
- Added `Source Notes` before `Summary` in `identity.md`.
- Kept Learn/Lessons and Magecraft as Strixhaven-wide context unless tied to exact Lorehold anchors.
- Framed Philosophical Weaknesses and Color Relationships with the required non-canon Vox Mana architecture support wording.
- Left runtime, build, placement, UI logic, raw JSON, generated files, mono files, other guild docs, and other school docs untouched.

## Evidence Basis

- `docs/reference/identity-metaphysics-markdown-schema.md`
- `data/factions.json`
- `data/raw-factions/lorehold/`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/MTG_Lore_Research_Enhanced.md`
- `docs/research/canon/MTG_Lore_Confidence_Tagged.md`
- `docs/research/canon/mark_rosewater_official_two_color/`
- `docs/research/canon/mark_rosewater_official_misc/`
- `docs/research/lorehold/`
- `docs/research/guild_college_identity_metaphysics/`

## Tests / Verification

- Passed: H1/H2 order check for both Lorehold files.
- Passed: `node research/validate-mono-color-markdown.mjs` as regression only.
- Passed: required phrase scan for `strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon`.
- Passed: JSON anchor existence spot check for 32 required Lorehold source anchors.
- Passed: ASCII scan on Lorehold docs and Kanban card.
- Reviewed: wording scan for Boros flattening, Azorius flattening, Prismari/Quandrix drift, generic artifact/reanimation language, and loot-first treasure hunting; hits were negative/suppression statements only.

## Not Touched

- Runtime/build/placement/UI logic
- Raw JSON source files
- Generated files
- Mono color docs
- Boros, Azorius, Gruul, Dimir, Izzet, Orzhov, Rakdos, Selesnya, Golgari, Simic, other guilds, and other schools
