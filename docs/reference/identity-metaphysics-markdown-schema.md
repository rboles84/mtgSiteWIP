# Identity / Metaphysics Markdown Schema

## Purpose

Required, parser-sensitive.

This schema defines the canonical authoring structure for Vox Mana mono-color identity and metaphysics markdown. It gives future agents one predictable contract for color philosophy docs without changing the runtime placement model.

The schema is structure-first. It normalizes headings, section order, and parser-safe formatting while preserving existing meaning, tone, and color-specific nuance.

## Current Scope

Required, parser-sensitive.

This schema currently applies only to the five mono-color identity/metaphysics files.
Guilds, schools, shards, clans, families, and other faction expressions are intentionally out of scope for this pass.

For this pass, each mono color is represented as a paired source set:

- `docs/architecture/colors/{color}/identity.md`
- `docs/architecture/colors/{color}/metaphysics.md`

VM-335 preserves these files as mono authoring and interpretation docs, not as VM-325 claim evidence by default. A future card must explicitly promote content from these docs into raw packets, claim ledgers, or source-intake records before using it for source-backed parity repair.

## Parser Assumptions

Required, parser-sensitive.

- Validators and future parsers identify sections by exact level-two heading text.
- The first non-empty line must be the level-one title.
- Required sections must appear in the documented order.
- Optional level-two sections may appear only in the documented locations.
- Level-three and deeper headings are human-readable subsection structure unless a future parser explicitly documents otherwise.
- This markdown schema is an authoring and QA rail only. It is not required for `npm run build:factions` or any runtime build path.

## Required Structure

Required, parser-sensitive.

Identity files use this title format:

```md
# {Color} - {Identity Epithet}
```

Metaphysics files use this title format:

```md
# {Color} Metaphysics - {Metaphysics Epithet}
```

Each file must contain exactly one level-one title. All canonical sections are level-two headings. Subsections use level-three or level-four headings beneath the nearest level-two section.

## Required Sections

Required, parser-sensitive.

Identity files must use these level-two sections, in this order:

1. `Identity Overview`
2. `Core Drive`
3. `Vox Mana Read (Core Axiom)`
4. `Philosophical Foundations`
5. `Mechanical Identity`
6. `Gameplay Philosophy`
7. `Philosophical Weaknesses`
8. `Color Relationships`
9. `System Mapping (Canonical)`
10. `Operator Translation Signals (Maze / Scryfall)`
11. `Summary`

Metaphysics files must use these level-two sections, in this order:

1. `Philosophical Foundations`
2. `Vox Mana Read`
3. `Structural & Mechanical Architecture`
4. `Ludological Matrix Mapping`

## Optional Sections

Optional, parser-sensitive when present.

Optional level-two sections are allowed only in these locations:

```json
{
  "identity.md": {
    "before:System Mapping (Canonical)": [
      "Modern Evolution",
      "Color-Specific Notes"
    ],
    "before:Summary": [
      "Source Notes"
    ]
  },
  "metaphysics.md": {
    "before:Philosophical Foundations": [
      "Metaphysical Thesis"
    ],
    "before:Ludological Matrix Mapping": [
      "Color-Specific Notes"
    ]
  }
}
```

Absent optional sections require no placeholder. If optional content does not fit one of these documented locations, keep it as a level-three subsection under the closest required section instead of creating a new level-two heading.

## Parser-Sensitive Sections

Required, parser-sensitive.

The parser-sensitive anchors are:

- `Vox Mana Read (Core Axiom)` in `identity.md`
- `System Mapping (Canonical)` in `identity.md`
- `Operator Translation Signals (Maze / Scryfall)` in `identity.md`
- `Vox Mana Read` in `metaphysics.md`
- `Structural & Mechanical Architecture` in `metaphysics.md`
- `Ludological Matrix Mapping` in `metaphysics.md`

Future parsers should depend on these headings, not on color-specific prose headings.

## Human-Readable Sections

Required, human-readable only unless promoted by a future parser.

The following sections are primarily editorial and interpretive:

- `Identity Overview`
- `Core Drive`
- `Philosophical Foundations`
- `Mechanical Identity`
- `Gameplay Philosophy`
- `Philosophical Weaknesses`
- `Color Relationships`
- `Summary`
- `Metaphysical Thesis`
- `Color-Specific Notes`
- `Source Notes`

Human-readable sections may contain color-specific subsections, tables, blockquotes, or lists as long as heading order and level hierarchy stay valid.

## Heading Rules

Required, parser-sensitive.

- Use exactly one `#` title per file.
- Use `##` only for required or documented optional sections.
- Use `###` for subsections inside a level-two section.
- Use `####` only beneath a level-three subsection.
- Do not place a `###` heading before the first `##` heading.
- Do not skip heading levels. For example, a `####` heading must follow a prior `###` section in the same file.
- Do not use clever or color-specific wording for required level-two headings.

## Formatting Rules

Required, parser-sensitive where noted.

- Horizontal rules are optional.
- If used, a horizontal rule must be a standalone `---` line.
- Horizontal rules may only separate sections or subsections and must be followed by a markdown heading.
- Lists may use `-` bullets or numbered lists.
- Tables are allowed in `System Mapping (Canonical)` and human-readable summary sections.
- Blockquotes are allowed for Vox Mana Read passages.
- Do not add YAML front matter to these files.

## Canonical Mono-Color Skeleton

Required, parser-sensitive.

Identity skeleton:

```md
# {Color} - {Identity Epithet}

## Identity Overview

## Core Drive

## Vox Mana Read (Core Axiom)

## Philosophical Foundations

## Mechanical Identity

## Gameplay Philosophy

## Philosophical Weaknesses

## Color Relationships

## System Mapping (Canonical)

## Operator Translation Signals (Maze / Scryfall)

## Summary
```

Metaphysics skeleton:

```md
# {Color} Metaphysics - {Metaphysics Epithet}

## Metaphysical Thesis

## Philosophical Foundations

## Vox Mana Read

## Structural & Mechanical Architecture

## Ludological Matrix Mapping
```

`Metaphysical Thesis` is optional. Omit it when the file begins cleanly with `Philosophical Foundations`.

## Future Faction Extension Notes

Human-readable only.

Mono colors are the foundation. Guilds, schools, shards, clans, families, and other factions may later receive derived or expression-level identity/metaphysics files after the mono-color foundation is stable.

This schema should inform that future work, but it should not be forced onto guilds or schools in this pass. Higher-order factions should eventually be evaluated as expressions or combinations of foundational color identities, not as disconnected content systems.

The mono foundation remains a transitional Layer 1 registry/runtime exception until future approved source work creates W/U/B/R/G raw packets, claim ledgers, or source-intake promotion records. This schema does not authorize mono runtime copy, generated parity repairs, raw packets, claim ledgers, validator mappings, builder migrations, or placement discriminator repairs.

## Normalization Rules

Required, parser-sensitive.

- Preserve meaning and existing color philosophy.
- Rename headings for schema consistency.
- Move content only when needed to place it under the correct canonical heading.
- Prefer demoting color-specific level-two headings to level-three subsections over creating undocumented optional level-two sections.
- Add required headings only when equivalent content already exists or can be extracted without changing meaning.
- Do not create guild, school, shard, clan, family, or other faction identity/metaphysics files in this pass.
- Do not change placement scoring, faction logic, Maze logic, Scryfall logic, combo logic, or UI behavior.

## Validation Checklist

Required, parser-sensitive.

- All five mono-color source sets are present.
- Titles match the canonical title format.
- Required level-two sections exist.
- Required level-two sections appear in the correct order.
- Optional level-two sections appear only in documented locations.
- Heading levels are not skipped.
- No level-three heading appears before the first level-two heading.
- Horizontal rules follow the documented policy.
- `node research/validate-mono-color-markdown.mjs` passes.
- `npm.cmd run build:factions` still succeeds as verification only.
- Existing behavior checks still pass.
