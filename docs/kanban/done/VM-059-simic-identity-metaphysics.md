# VM-059 - Simic Identity Metaphysics

ID: VM-059
Title: Simic Identity Metaphysics
Status: done
Type: Documentation / content architecture
Area: Simic Combine, guild identity, metaphysics, schema-compatible authoring
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Create Simic Combine `identity.md` and `metaphysics.md` using `docs/reference/identity-metaphysics-markdown-schema.md` as the structural source of truth.

Simic is treated as an expression-level Ravnica guild pilot, not as mono Blue plus mono Green and not as generic blue-green nature science. Metaphysical thesis, Core Axiom, Color Relationships, system mapping, and matrix language must be framed as Vox Mana synthesis/internal architecture, not MTG canon.

## Acceptance Criteria

- `docs/architecture/colors/simic/identity.md` exists and follows the canonical required H2 anchors in order.
- `docs/architecture/colors/simic/metaphysics.md` exists and follows the canonical required H2 anchors in order.
- Color Relationships is implemented as strongly supported Vox Mana internal architecture derived from approved evidence, not MTG canon.
- Color Relationships are framed as placement-calibration contrasts, not official faction opinions or canon inter-faction psychology.
- Strong bounded relationship contrasts are limited to Simic/Quandrix, Simic/Witherbloom, and Simic/Izzet unless stronger anchors are found.
- Selesnya, Golgari, Gruul, Azorius, and Phyrexia remain guardrail-only unless stronger anchors are found.
- No runtime/build/placement/UI logic, raw JSON, generated files, mono files, other guilds, or schools are edited.
- A handoff file is created and `docs/handoffs/HANDOFF_INDEX.md` is updated.

## Evidence Sources

- `data/factions.json`
- `data/raw-factions/simic_combine/`
- `docs/research/canon/mark_rosewater_official_two_color/simic_Improving Upon Nature _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_misc/`
- `docs/research/canon/MTG_Lore_Confidence_Tagged.md`
- `docs/research/MTG_Lore_Research_Enhanced.md`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/simic/`
- `docs/research/guild_college_identity_metaphysics/`

## Scope Guardrails

- Do not invent MTG lore, card facts, commander facts, mechanics, or project decisions.
- Do not treat Simic as a blind merge of Blue and Green.
- Do not reduce Simic to generic nature science or Quandrix with creatures.
- Do not treat project metaphysics as official Magic canon.
- Do not edit raw JSON, generated artifacts, runtime/build/placement/UI logic, mono files, other guilds, or schools.

## Tests / Verification

- Manual H1/H2 schema-anchor check for Simic identity and metaphysics files.
- `node research/validate-mono-color-markdown.mjs`
- Boundary phrase search for `Vox Mana internal architecture`, `not MTG canon`, `Vox Mana synthesis`, and `placement-calibration contrasts`.
- Scoped status check confirming only Simic docs plus VM-055 coordination files were intentionally changed.
