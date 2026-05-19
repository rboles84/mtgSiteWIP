# VM-046 - Prismari Identity Draft

ID: VM-046
Title: Prismari Identity Draft
Status: done
Type: Documentation / content architecture
Area: Prismari College, school identity, schema-compatible authoring
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Created `docs/architecture/colors/prismari/identity.md` from scratch using the required anchors in `docs/reference/identity-metaphysics-markdown-schema.md`.

Prismari is treated as an expression-level Strixhaven school pilot, not a mono-color source set and not a blind Blue plus Red merge. Interpretive placement, system mapping, and operator language are framed as Vox Mana internal architecture where applicable, not MTG canon.

## Outcome

- Created `docs/architecture/colors/prismari/identity.md`.
- Used the canonical identity H2 anchors in order, with the documented optional `Source Notes` section before `Summary`.
- Grounded direct identity claims in raw Prismari claims/profile/placement, `data/factions.json`, commander guidance, and approved research summaries.
- Framed `Philosophical Weaknesses`, `System Mapping (Canonical)`, and `Operator Translation Signals (Maze / Scryfall)` as Vox Mana internal interpretation where applicable.
- Kept Prismari distinct from Izzet, Rakdos, and Silverquill.
- Left Prismari `metaphysics.md`, runtime/build/placement/UI logic, raw JSON, generated files, and other faction architecture files untouched.

## Support Matrix

| Section | Support | Notes |
|---|---:|---|
| identity.md / Identity Overview | strongly supported | Prismari as Strixhaven blue-red College of Elemental Arts is direct evidence. |
| identity.md / Core Drive | strongly supported | Magic-as-art, performance, elemental expression, craft, emotion, and spectacle are direct evidence. |
| identity.md / Vox Mana Read (Core Axiom) | strongly supported | Compression-only synthesis from supported identity evidence. |
| identity.md / Philosophical Foundations | strongly supported | Technique versus expression is directly supported. |
| identity.md / Mechanical Identity | strongly supported | Spells, elemental scale, big instants/sorceries, Treasure/Storm/magecraft-adjacent play are supported. |
| identity.md / Gameplay Philosophy | strongly supported | Commander guidance supports expressive turns and elemental spectacle. |
| identity.md / Philosophical Weaknesses | partially supported | Uses placement/collision limits; not claimed as canon psychology. |
| identity.md / Color Relationships | partially supported | Strong for Izzet/Rakdos/Silverquill; other contrasts kept as brief guardrails. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture | Explicitly labeled not MTG canon. |
| identity.md / Operator Translation Signals (Maze / Scryfall) | strongly supported as Vox Mana internal architecture | Raw placement and commander guidance provide terms and suppressors. |
| identity.md / Summary | strongly supported | Restates supported evidence and labeled synthesis. |

## Evidence Sources

- `docs/reference/identity-metaphysics-markdown-schema.md`
- `data/factions.json`
- `data/raw-factions/prismari/`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/MTG_Lore_Research_Enhanced.md`
- `docs/research/canon/MTG_Lore_Confidence_Tagged.md`
- `docs/research/prismari/`
- `docs/research/guild_college_identity_metaphysics/prismari_identity.md`
- `docs/research/guild_college_identity_metaphysics/prismari_metaphysical.md`

## Tests / Verification

- Passed: schema-aware Prismari identity H2 order check with allowed optional `Source Notes`.
- Passed: `node research/validate-mono-color-markdown.mjs`.
- Passed: boundary phrase search for `Vox Mana internal architecture`, `not MTG canon`, `compression-only`, and `no new doctrine`.
- Passed: evidence-anchor search for raw Prismari, commander guidance, enhanced lore, and `data/factions.json` references.
- Passed: ASCII scan on the new Prismari identity file and VM-046 Kanban card.
- Checked: `git status --short` for Prismari architecture and coordination paths.

## Guardrails

- Did not edit runtime/build/placement/UI logic.
- Did not edit raw JSON or generated files.
- Did not edit Boros, Azorius, Gruul, Dimir, Izzet, Orzhov, Rakdos, Selesnya, other guilds, or other schools.
- Did not create Prismari `metaphysics.md`.
- Did not invent MTG lore, card facts, commander facts, or project decisions.

## Human Review

Recommended for Prismari/Izzet and Prismari/Rakdos boundary tone. The draft is intentionally strong on direct identity evidence and cautious where weakness or operator language comes from Vox Mana placement architecture.
