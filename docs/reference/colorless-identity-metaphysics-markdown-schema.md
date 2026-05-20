# Colorless Identity / Metaphysics Markdown Schema

## Purpose

Required, parser-sensitive.

This schema defines the authoring structure for Vox Mana's colorless identity and metaphysics source files.

Colorless is structurally compatible with the mono-color identity/metaphysics schema, but it is not philosophically equivalent to a mono color and is not a runtime mono-color classification. "Mirror the mono schema" means heading, order, and validation compatibility only.

## Current Scope

Required, parser-sensitive.

This schema currently applies only to the colorless non-color foundation source set:

- `docs/architecture/colorless/identity.md`
- `docs/architecture/colorless/metaphysics.md`

The schema does not apply to the five mono-color files, guilds, schools, shards, clans, families, Commander placement scoring, Maze logic, Scryfall parser behavior, combo logic, UI behavior, or generated runtime artifacts.

## Source Discipline

Required, parser-sensitive.

Colorless authoring must be grounded in:

- `docs/research/colorless/colorless-evidence-map.md`
- `docs/research/colorless/source-material/colorless_magic_cleaned.md`
- `docs/research/colorless/source-material/colorless_identity.md`
- `docs/research/colorless/source-material/colorless_metaphysics.md`

Claims classified as `supported` may be stated directly. Claims classified as `inferred` may be used only as Vox Mana interpretation. Claims classified as `unsupported` must not be used in authored colorless identity or metaphysics files.

## Parser Assumptions

Required, parser-sensitive.

- Validators and future parsers identify sections by exact level-two heading text.
- The first non-empty line must be the level-one title.
- Required sections must appear in the documented order.
- Optional level-two sections may appear only in the documented locations.
- Optional level-two sections are truly optional; order is enforced only when they are present.
- Level-three and deeper headings are human-readable subsection structure unless a future parser explicitly documents otherwise.
- This markdown schema is an authoring and QA rail only. It is not required for `npm run build:factions`, `npm test`, or any runtime build path.

## Required Structure

Required, parser-sensitive.

Identity files use this title format:

```md
# Colorless - {Identity Epithet}
```

Metaphysics files use this title format:

```md
# Colorless Metaphysics - {Metaphysics Epithet}
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
      "Colorless-Specific Notes"
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
      "Colorless-Specific Notes"
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

Future parsers should depend on these headings, not on colorless-specific prose headings.

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
- `Colorless-Specific Notes`
- `Source Notes`

Human-readable sections may contain colorless-specific subsections, tables, blockquotes, or lists as long as heading order and level hierarchy stay valid.

## Heading Rules

Required, parser-sensitive.

- Use exactly one `#` title per file.
- Use `##` only for required or documented optional sections.
- Use `###` for subsections inside a level-two section.
- Use `####` only beneath a level-three subsection.
- Do not place a `###` heading before the first `##` heading.
- Do not skip heading levels. For example, a `####` heading must follow a prior `###` section in the same file.
- Do not use clever or colorless-specific wording for required level-two headings.

## Formatting Rules

Required, parser-sensitive where noted.

- Horizontal rules are optional.
- If used, a horizontal rule must be a standalone `---` line.
- Horizontal rules may only separate sections or subsections and must be followed by a markdown heading.
- Lists may use `-` bullets or numbered lists.
- Tables are allowed in `System Mapping (Canonical)` and human-readable summary sections.
- Blockquotes are allowed for Vox Mana Read passages.
- Do not add YAML front matter to these files.

## Content Framing Rules

Required, parser-sensitive.

- The authored files must state that colorless is not a color and not a sixth mono color.
- The authored files must preserve artifact/function, Eldrazi/void, and Ugin-Karn/transcendence as distinct faces.
- Do not flatten those faces into one simplified thesis.
- Inferred claims may appear only as Vox Mana interpretation, not as direct asserted canon.
- Commander and product implications must be grounded in the evidence map or clearly framed as operational interpretation.
- Positive sixth-color framing is not allowed. For example, `Colorless is the sixth color` must fail validation.
- Negative sixth-color framing is allowed. For example, `Colorless is not a sixth color` is required.

## Operator Signal Grouping

Required, parser-sensitive.

`Operator Translation Signals (Maze / Scryfall)` must group query terms under these level-three headings:

1. `Artifact / Function`
2. `Eldrazi / Void`
3. `Mana-Symbol / Land Usage`

Signals must not be flattened into one undifferentiated colorless identity.

## Canonical Colorless Skeleton

Required, parser-sensitive.

Identity skeleton:

```md
# Colorless - {Identity Epithet}

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

### Artifact / Function

### Eldrazi / Void

### Mana-Symbol / Land Usage

## Summary
```

Metaphysics skeleton:

```md
# Colorless Metaphysics - {Metaphysics Epithet}

## Metaphysical Thesis

## Philosophical Foundations

## Vox Mana Read

## Structural & Mechanical Architecture

## Ludological Matrix Mapping
```

`Metaphysical Thesis` is optional. Omit it when the file begins cleanly with `Philosophical Foundations`.

## Future Integration Notes

Human-readable only.

Colorless is a foundational non-color source set. It may later inform runtime placement, Commander queries, or faction-expression architecture, but this schema does not add colorless to runtime identity scoring.

If a later task integrates colorless into runtime behavior, update this schema and add explicit runtime tests in that later task. Do not silently repurpose this authoring schema as a build gate.

## Normalization Rules

Required, parser-sensitive.

- Preserve source-grounded meaning.
- Keep the three faces of colorless distinct.
- Rename headings for schema consistency.
- Move content only when needed to place it under the correct canonical heading.
- Prefer demoting colorless-specific level-two headings to level-three subsections over creating undocumented optional level-two sections.
- Do not add unsupported lore, product claims, commander facts, or future-release assertions.
- Do not change placement scoring, faction logic, Maze logic, Scryfall logic, combo logic, UI behavior, package scripts, or generated data artifacts.

## Validation Checklist

Required, parser-sensitive.

- The colorless source set is present in `docs/architecture/colorless/`.
- Titles match the canonical title format.
- Required level-two sections exist.
- Required level-two sections appear in the correct order.
- Optional level-two sections appear only in documented locations.
- Optional level-two sections are absent cleanly when not needed.
- Heading levels are not skipped.
- No level-three heading appears before the first level-two heading.
- Horizontal rules follow the documented policy.
- Positive sixth-color framing is absent.
- Required non-color framing is present.
- Operator signals are grouped by artifact/function, Eldrazi/void, and mana-symbol/land usage.
- `node research/validate-colorless-markdown.mjs` passes.
- `node research/validate-mono-color-markdown.mjs` still passes.
- `npm.cmd run build:factions` still succeeds as verification only.
