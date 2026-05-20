# VM-035 - Colorless Identity Metaphysics Foundation

ID: VM-035
Title: Colorless Identity Metaphysics Foundation
Status: done
Type: Documentation / validation / content architecture
Area: Colorless, identity, metaphysics, authoring schema
Priority: high
Created: 2026-05-17

## Summary

Create a foundational non-color identity/metaphysics source set for colorless, structurally compatible with the mono-color authoring schema without treating colorless as a sixth mono color.

## Acceptance Criteria

- Evidence map exists before authored identity/metaphysics drafting.
- Evidence map classifies claims as supported, inferred, or unsupported.
- Colorless schema doc defines required H2 order and allowed optional H2 locations before validator enforcement.
- Authored colorless identity and metaphysics files preserve artifact/function, Eldrazi/void, and Ugin-Karn/transcendence as distinct faces.
- Standalone colorless markdown validation exists.
- Validation rejects positive sixth-color framing.
- Validation confirms exact required H2 presence/order, optional H2 placement, heading hierarchy, operator signal grouping, and non-color framing.
- No runtime placement, Maze, Scryfall, combo, UI, or generated artifact changes are introduced.

## Scope Guardrails

- Do not classify colorless as a sixth mono color.
- Do not wire colorless validation into build scripts or `npm test`.
- Do not add colorless to runtime identity scoring.
- Do not flatten artifact/function, Eldrazi/void, and Ugin-Karn/transcendence into one simplified thesis.
- Do not use unsupported source-bundle claims in authored docs.

## Outcome

Complete.

The colorless foundation now has an evidence map, a dedicated schema doc, authored identity/metaphysics files, and a standalone validator. The source set lives at `docs/architecture/colorless/` so it is parallel to, but not inside, the five-color folder.

## Testing Notes

- `node research/validate-colorless-markdown.mjs` -> passed
- `node research/validate-mono-color-markdown.mjs` -> passed
- `npm.cmd run build:factions` -> passed as verification only
- Generated artifact diff check -> no tracked generated diffs remained
- `npm.cmd test` -> not run; no shared runtime/test infrastructure changed

## Human Review

Yes - this is a foundational content architecture decision for how Vox Mana treats colorless.
