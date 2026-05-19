# VM-043 - Izzet Base Draft + Formalization

ID: VM-043
Title: Izzet Base Draft + Formalization
Status: done
Type: Documentation / content architecture
Area: Izzet League, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Created the missing Izzet architecture identity/metaphysics files and brought them to the Azorius/Boros/Gruul formalized support standard in the same pass.

This card became VM-043 because VM-042 already exists as a completed Dimir formalization card in the current board state. The work remains the requested Izzet base-draft-plus-formalization pass.

## Outcome

- Created `docs/architecture/colors/izzet/identity.md`.
- Created `docs/architecture/colors/izzet/metaphysics.md`.
- Made both Vox Mana Read sections compression-only with no new nouns, mechanics, or doctrine.
- Anchored `identity.md / Philosophical Weaknesses` to raw placement/shadow fields in `data/raw-factions/izzet_league/izzet_league.placement.json`.
- Added exact repo-relative evidence anchors for Azorius, Dimir, Rakdos, Gruul, Simic, and Prismari relationship contrasts.
- Formalized `identity.md / System Mapping (Canonical)` as Vox Mana internal architecture with field definitions, Izzet values, evidence anchors, and derivation rules.
- Added Vox Mana internal architecture / not MTG canon boundaries to required metaphysics sections.

## Support Matrix Updates

| Section | Support | Notes |
|---|---:|---|
| identity.md / Identity Overview | strongly supported | Built from raw Izzet profile, claims, placement summary, and approved research seeds. |
| identity.md / Core Drive | strongly supported | Uses raw placement requirement for experimental invention, mechanism-building, prototype thinking, and chaotic iteration. |
| identity.md / Vox Mana Read (Core Axiom) | strongly supported | Compression-only synthesis from already-supported identity sections; no new nouns, mechanics, or doctrine. |
| identity.md / Philosophical Foundations | strongly supported | Anchored to Red-Blue color-pie research plus raw Izzet faction claims for invention, discovery, infrastructure, and volatility. |
| identity.md / Mechanical Identity | strongly supported | Anchored to raw mechanics claims for instants/sorceries, replicate, overload, jump-start, spell copying, and Commander guidance. |
| identity.md / Gameplay Philosophy | strongly supported | Derived from raw placement guidance and commander guidance around visible spell sequencing and experiment loops. |
| identity.md / Philosophical Weaknesses | strongly supported | Each weakness is anchored to raw placement/shadow fields in `data/raw-factions/izzet_league/izzet_league.placement.json`. |
| identity.md / Color Relationships | strongly supported | Exact repo-relative anchors added for Azorius, Dimir, Rakdos, Gruul, Simic, and Prismari. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture derived from approved evidence; not claimed as MTG canon | Mapping fields include definitions, Izzet values, evidence anchors, and derivation rules. |
| identity.md / Operator Translation Signals (Maze / Scryfall) | strongly supported | Translates raw placement and commander guidance into search/placement signals without adding lore. |
| identity.md / Source Notes | strongly supported | Records approved source set and notes that `docs/research/izzet/` was absent in this worktree. |
| identity.md / Summary | strongly supported | Compression of the completed identity draft and source-bounded placement guidance. |
| metaphysics.md / Metaphysical Thesis | bounded project framing, not canon | Uses source-note language and does not overstate direct canon support for Vox Mana metaphysics. |
| metaphysics.md / Philosophical Foundations | strongly supported as Vox Mana internal architecture derived from approved evidence; not claimed as MTG canon | Adds required non-canon internal-architecture boundary. |
| metaphysics.md / Vox Mana Read | strongly supported | Compression-only synthesis from supported metaphysics sections; no new nouns, mechanics, or doctrine. |
| metaphysics.md / Structural & Mechanical Architecture | strongly supported as Vox Mana internal architecture derived from approved evidence; not claimed as MTG canon | Maps mechanics and story technology into project architecture without claiming canon doctrine. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture derived from approved evidence; not claimed as MTG canon | Matrix axes are project fields derived from approved Izzet evidence. |

## Scope Guardrails

- Did not touch runtime, build, placement logic, UI, generated artifacts, Boros files, Azorius files, Gruul files, Dimir files, mono files, other guild files, or school files.
- Did not edit source research files or raw faction JSON.
- Did not reduce Izzet to generic Blue plus Red chaos.
- Did not claim Vox Mana matrix or metaphysics language as MTG canon.
- Preserved repo-relative paths for evidence anchors.

## Tests / Verification

- Passed: `node research/validate-mono-color-markdown.mjs`
- Passed: scripted Izzet H2 anchor/order check for both files.
- Passed: required support-boundary language search.
- Passed: compression-only/no-new-doctrine rule search.
- Passed: exact relationship anchor search for Azorius, Dimir, Rakdos, Gruul, Simic, and Prismari.
- Passed: stale target-support-language search.
- Passed: ASCII scan on changed Izzet docs, VM-043 card, and handoff.
- Checked: `git -c safe.directory=C:/dev/mtgSiteWIP status --short`; unrelated pre-existing and concurrent changes remain, but this pass only added Izzet architecture docs plus VM-043 board/handoff coordination.

## Human Review

Recommended for metaphysics tone and Izzet/Prismari boundary language. The support standard is strong as Vox Mana internal architecture where applicable, not direct MTG canon.
