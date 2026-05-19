# VM-036 - Boros Identity Metaphysics Pilot

ID: VM-036
Title: Boros Identity Metaphysics Pilot
Status: done
Type: Documentation / content architecture
Area: Boros Legion, guild identity, metaphysics, authoring schema
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Draft Boros Legion `identity.md` and provisional `metaphysics.md` files using the VM-034 identity/metaphysics schema anchors as a structural target and the approved Boros evidence sources as the content basis.

Boros is an expression-level guild pilot, not a mono-color source set. The identity file is evidence-backed. The metaphysics file is explicitly framed as Vox Mana project metaphysics, not canon doctrine.

## Outcome

- Created `docs/architecture/colors/boros/identity.md`.
- Created `docs/architecture/colors/boros/metaphysics.md`.
- Added source notes at the top of both files.
- Kept runtime, build, placement, UI, generated artifact, mono-color, other guild, and school files untouched for this pass.
- Preserved the VM-034 schema anchors while acknowledging that the current validator remains mono-scoped.

## Acceptance Criteria

- `docs/architecture/colors/boros/identity.md` exists and follows the VM-034 required section anchors.
- `docs/architecture/colors/boros/metaphysics.md` exists and follows the VM-034 required section anchors.
- `metaphysics.md` includes an explicit provisional / non-canon-doctrine note.
- Source notes separate evidence-backed identity claims from project metaphysics.
- No runtime, build, placement, Maze, Scryfall, combo, UI, generated artifact, mono-color, other guild, or school files are modified.
- `node research/validate-mono-color-markdown.mjs` still passes.
- A manual schema-anchor check confirms the new Boros files use the VM-034 H2 anchors.
- A handoff file is created and `docs/handoffs/HANDOFF_INDEX.md` is updated.

## Approved Evidence Sources

- `data/factions.json`
- `data/raw-factions/`
- `docs/research/canon/mark_rosewater_official_two_color/`
- `docs/research/canon/mark_rosewater_official_misc/`
- `docs/research/canon/MTG_Lore_Confidence_Tagged.md`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/boros/`
- `docs/research/MTG_Lore_Research_Enhanced.md`

## Scope Guardrails

- Do not invent MTG lore, card facts, commander facts, or project decisions.
- Do not treat Boros as a blind merge of Red and White.
- Do not treat project metaphysics as Magic canon.
- Do not edit other guilds or schools.
- Do not modify runtime/build/placement/UI logic.

## Tests / Verification

- Passed: `node research/validate-mono-color-markdown.mjs`
- Passed: manual Boros schema-anchor check for required VM-034 H2 anchors.
- Passed: `rg -n "[^\x00-\x7F]" docs/architecture/colors/boros docs/kanban/in-progress/VM-036-boros-identity-metaphysics-pilot.md` returned no matches before the card was moved.
- Checked: `git status --short` to confirm no unexpected runtime/build/UI side effects were introduced by this task.

## Human Review

Recommended. This is the first guild identity/metaphysics pilot using the mono schema shape outside its original mono-color scope, and `metaphysics.md` should remain provisional until the faction-extension schema is formalized.
