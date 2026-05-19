# VM-039 - Gruul Strong Support Upgrade

ID: VM-039
Title: Gruul Strong Support Upgrade
Status: done
Type: Documentation / content architecture
Area: Gruul Clans, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Drafted the missing Gruul identity/metaphysics base files, verified anchors and source notes, assessed the four target support rows, and found the drafted rows already meet the strong-support bar without requiring a separate upgrade patch.

This pass keeps Gruul as an expression-level guild. It uses direct raw-faction and approved research evidence for identity, mechanics, and neighbor contrasts, while marking system and matrix mappings as Vox Mana internal architecture derived from approved evidence rather than MTG canon.

## Outcome

- Created `docs/architecture/colors/gruul/identity.md` using the VM-034 section anchors as an authoring rail.
- Created `docs/architecture/colors/gruul/metaphysics.md` using the VM-034 metaphysics anchors as an authoring rail.
- Verified source notes, required anchors, exact neighbor evidence paths, and stale support language before recording strong support.
- No separate strong-support rewrite was needed after assessment because the base draft already included compression-only read rules, exact relationship anchors, and formal mapping derivation rules.

## Support Matrix Updates

| Section | Support | Notes |
|---|---:|---|
| identity.md / Vox Mana Read (Core Axiom) | strongly supported | Compression-only project synthesis from already-strong sections; no new nouns, mechanics, or doctrine. |
| identity.md / Color Relationships | strongly supported | Direct neighbor contrasts include exact file-path evidence anchors for Boros, Rakdos, Selesnya, Izzet, Simic, and Azorius. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture where applicable | Official Vox Mana internal mapping derived from approved Gruul evidence with field definitions and derivation rules; not claimed as MTG canon. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture where applicable | Matrix axes are defined, repeatable, and derived from approved Gruul evidence; not claimed as MTG canon. |

## Scope Guardrails

- Did not touch runtime, build, placement, UI, generated artifacts, mono-color files, Boros files, Azorius files, other guild files, or school files.
- Did not claim Vox Mana matrix language as MTG canon.
- Did not reduce Gruul to generic Red plus Green smash.
- Did not invent MTG lore, commander facts, or unsupported faction doctrine.

## Tests / Verification

- Passed: `node research/validate-mono-color-markdown.mjs`
- Passed: manual Gruul schema-anchor check for required H2 anchors.
- Passed: required neighbor evidence-anchor search.
- Passed: stale target-support language search.
- Passed: required strong-support architecture sentence search in both mapping sections.
- Passed: non-ASCII scan of changed Gruul docs, VM-039 card, and final handoff.

## Human Review

Recommended for final tone and evidence judgment. The support standard is strong as Vox Mana internal architecture where applicable, not direct MTG canon.
