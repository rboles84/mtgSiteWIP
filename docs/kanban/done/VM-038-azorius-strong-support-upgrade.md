# VM-038 - Azorius Strong Support Upgrade

ID: VM-038
Title: Azorius Strong Support Upgrade
Status: done
Type: Documentation / content architecture
Area: Azorius Senate, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Upgrade the four Azorius target rows that were still partial after VM-037 by tightening evidence discipline and formalizing Vox Mana architecture.

This pass keeps Azorius as an expression-level guild pilot. It upgrades direct relationship support with exact file-path evidence anchors and upgrades mapping support only as Vox Mana internal architecture derived from approved evidence, not as MTG canon.

## Outcome

- Rewrote `docs/architecture/colors/azorius/identity.md` / `Vox Mana Read (Core Axiom)` as a compression-only section.
- Expanded `Color Relationships` with exact evidence anchors for Boros, Orzhov, Dimir, Selesnya, Izzet, and Simic.
- Formalized `System Mapping (Canonical)` as Vox Mana internal architecture with field definitions, evidence anchors, and derivation rules.
- Formalized `docs/architecture/colors/azorius/metaphysics.md` / `Ludological Matrix Mapping` with axis definitions, mechanics/play-pattern mappings, and evidence anchors.
- Updated the VM-037 support matrix rows for the four target sections.

## Support Matrix Updates

| Section | Support | Notes |
|---|---:|---|
| identity.md / Vox Mana Read (Core Axiom) | strongly supported | Compression-only project synthesis from already-strong sections; no new nouns, mechanics, or doctrine. |
| identity.md / Color Relationships | strongly supported | Direct neighbor contrasts now include exact file-path evidence anchors for Boros, Orzhov, Dimir, Selesnya, Izzet, and Simic. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture where applicable | Official Vox Mana internal mapping derived from approved evidence; not claimed as MTG canon. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture where applicable | Matrix axes are defined, repeatable, and derived from approved Azorius evidence; not claimed as MTG canon. |

## Scope Guardrails

- Did not touch runtime, build, placement, UI, generated artifacts, mono-color files, Boros files, other guild files, or school files.
- Did not claim Vox Mana matrix language as MTG canon.
- Did not add new Azorius doctrine inside the core read.
- Did not generalize relationships without exact file-path evidence anchors.

## Tests / Verification

- Passed: `node research/validate-mono-color-markdown.mjs`
- Passed: manual Azorius schema-anchor check for required VM-034 H2 anchors.
- Passed: stale-target search for the four upgraded rows and required support-standard sentence.
- Passed: non-ASCII scan of changed Azorius docs and coordination files.
- Checked: `git status --short` to confirm no unexpected runtime/build/UI side effects were introduced by this task.

## Human Review

Recommended for the architecture-standard wording. The upgraded support standard is strong as Vox Mana internal architecture where applicable, not direct MTG canon.
