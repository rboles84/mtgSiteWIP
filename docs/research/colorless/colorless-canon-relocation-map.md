# Colorless Canon Relocation Map

Status: VM-340 relocation cleanup

## Purpose

VM-338 left `COLORLESS-MF-009` blocked because the worktree showed deleted tracked files under `docs/research/canon/colorless/**` and replacement-looking files under `docs/research/colorless/**`. VM-340 resolves the content blocker by recording the file-by-file replacement map. This document does not stage, delete, restore, or normalize the dirty worktree.

## Replacement Map

| Former canon path | Current replacement path | VM-340 decision |
| --- | --- | --- |
| `docs/research/canon/colorless/colorless-evidence-map.md` | `docs/research/colorless/colorless-evidence-map.md` | Replacement accepted. |
| `docs/research/canon/colorless/colorless_DMP.md` | `docs/research/colorless/colorless_DMP.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/06_Color_Pie_Framework_and_Philosophy.md` | `docs/research/colorless/source-material/06_Color_Pie_Framework_and_Philosophy.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md` | `docs/research/colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/08_Ludic_Evolution_and_Commander_Format_Impact.md` | `docs/research/colorless/source-material/08_Ludic_Evolution_and_Commander_Format_Impact.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/09_Sources_and_Bibliography.md` | `docs/research/colorless/source-material/09_Sources_and_Bibliography.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/All 26 Color Combinations of Magic_ Guilds, Clans, Wedges, and Names - Draftsim.md` | `docs/research/colorless/source-material/All 26 Color Combinations of Magic_ Guilds, Clans, Wedges, and Names - Draftsim.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/Colorless - Concept vs. Execution _ MAGIC_ THE GATHERING_markRosewater.md` | `docs/research/colorless/source-material/Colorless - Concept vs. Execution _ MAGIC_ THE GATHERING_markRosewater.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/Deep Dive MTG Color Pie Research.md` | `docs/research/colorless/source-material/Deep Dive MTG Color Pie Research.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/The Colorless Mana Symbol.txt` | `docs/research/colorless/source-material/The Colorless Mana Symbol.txt` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/colorless and phyexian research.md` | `docs/research/colorless/source-material/colorless and phyexian research.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/colorless.txt` | `docs/research/colorless/source-material/colorless.txt` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/colorless_identity.md` | `docs/research/colorless/source-material/colorless_identity.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/colorless_magic_cleaned.md` | `docs/research/colorless/source-material/colorless_magic_cleaned.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/colorless_metaphysics.md` | `docs/research/colorless/source-material/colorless_metaphysics.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/combined_colorless.md` | `docs/research/colorless/source-material/combined_colorless.md` | Replacement accepted. |
| `docs/research/canon/colorless/source-material/refined_colorless.md` | `docs/research/colorless/source-material/refined_colorless.md` | Replacement accepted. |

## Decision

The replacement map is sufficient to resolve `COLORLESS-MF-009` as a Layer 2 content/governance blocker. Future git hygiene can decide how to stage or archive the pre-existing relocation drift, but Colorless Layer 2 no longer lacks an authority map for these sources.

## Boundaries

- This map does not delete or stage files.
- This map does not make support-only files claim-bearing.
- This map does not change Layer 1 registry, raw Colorless JSON, generated artifacts, runtime behavior, Home preview, routes, aliases, directory links, Commander Compass, Supabase context, or `colorless.webp`.
