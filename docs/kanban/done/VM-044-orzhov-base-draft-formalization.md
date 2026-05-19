# VM-044 - Orzhov Base Draft + Formalization

ID: VM-044
Title: Orzhov Base Draft + Formalization
Status: done
Type: Documentation / content architecture
Area: Orzhov Syndicate, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Created the missing Orzhov architecture identity/metaphysics files and brought them to the current guild formalization standard.

This pass used `docs/reference/identity-metaphysics-markdown-schema.md` as the structural source of truth, treated Orzhov as an expression-level guild pilot, and kept all metaphysics/matrix language bounded as Vox Mana internal architecture derived from approved evidence; not MTG canon.

## Outcome

- Created `docs/architecture/colors/orzhov/identity.md`.
- Created `docs/architecture/colors/orzhov/metaphysics.md`.
- Made both Vox Mana Read sections compression-only with no new nouns, mechanics, or doctrine.
- Anchored `identity.md / Philosophical Weaknesses` to raw placement evidence in `data/raw-factions/orzhov_syndicate/orzhov_syndicate.placement.json` and bounded Rosewater White-Black weakness support.
- Added exact repo-relative evidence anchors for Azorius, Boros, Dimir, Selesnya, Rakdos, and Silverquill relationship contrasts.
- Formalized `identity.md / System Mapping (Canonical)` as Vox Mana internal architecture with field definitions, Orzhov values, evidence anchors, and derivation rules.
- Added Vox Mana internal architecture / not MTG canon boundaries to required metaphysics sections.

## Support Matrix Updates

| Section | Support | Notes |
|---|---:|---|
| identity.md / Identity Overview | strongly supported | Raw profile/claims, `data/factions.json`, Rosewater W/B article, and Commander guidance all support the identity. |
| identity.md / Core Drive | strongly supported | Debt, obligation, hierarchy, legitimacy, and structure-as-power recur across raw profile and placement. |
| identity.md / Vox Mana Read (Core Axiom) | strongly supported | Compression-only synthesis from supported identity sections; no new nouns, mechanics, or doctrine. |
| identity.md / Philosophical Foundations | strongly supported | Rosewater supports W/B hierarchy, controlled peace, structure as power, patience, and shaky trust. |
| identity.md / Mechanical Identity | strongly supported | Afterlife, life drain, aristocrats, tax/control, sacrifice, and Commander lanes are well supported; Extort is cited cautiously. |
| identity.md / Gameplay Philosophy | strongly supported | Commander Compass/raw profile support transactional engines, death triggers, lifegain-to-leverage, and inevitability. |
| identity.md / Philosophical Weaknesses | strongly supported | Placement poor-fit indicators and Rosewater self-destruction/shaky-trust weakness provide direct support. |
| identity.md / Color Relationships | strongly supported | Exact repo-relative anchors added for Azorius, Boros, Dimir, Selesnya, Rakdos, and Silverquill. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Mapping fields include definitions, Orzhov values, evidence anchors, and derivation rules. |
| identity.md / Operator Translation Signals (Maze / Scryfall) | strongly supported | Raw placement and Commander guidance provide required/suppress terms and collision questions. |
| identity.md / Summary | strongly supported | Final compression restates the supported Orzhov identity without adding new doctrine. |
| metaphysics.md / Philosophical Foundations | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Direct philosophy evidence supports the translation into project architecture. |
| metaphysics.md / Vox Mana Read | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Compression-only from supported metaphysics sections; no new nouns, mechanics, or doctrine. |
| metaphysics.md / Structural & Mechanical Architecture | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Maps Afterlife, drain, taxes, aristocrats, sacrifice, spirits, and recursive value into project architecture. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Matrix axes derive from raw placement: obligation, leverage, hierarchy, continuity, and extraction. |

## Scope Guardrails

- Did not touch runtime, build, placement logic, UI, generated artifacts, Boros files, Azorius files, Gruul files, Dimir files, Izzet files, mono files, other guild files, or school files.
- Did not edit source research files or raw faction JSON.
- Did not reduce Orzhov to generic "evil church" flavor.
- Did not blindly merge White and Black.
- Did not claim Vox Mana matrix or metaphysics language as MTG canon.
- Preserved repo-relative paths for evidence anchors.

## Tests / Verification

- Manual H2 anchor/order check for `docs/architecture/colors/orzhov/identity.md` and `docs/architecture/colors/orzhov/metaphysics.md`.
- `node research/validate-mono-color-markdown.mjs` - PASS: 5 color set(s), 10 file(s).
- Targeted boundary-language search for `compression-only`, `no new`, `Vox Mana internal architecture derived from approved evidence`, and `not MTG canon`.
- Targeted Color Relationships anchor search for Azorius, Boros, Dimir, Selesnya, Rakdos, and Silverquill repo-relative source anchors.
- ASCII scan on the Orzhov drafts, VM-044 Kanban card, and handoff.

## Human Review

Recommended for metaphysics tone and Orzhov/Silverquill boundary nuance. The support standard is strong as Vox Mana internal architecture where applicable, not direct MTG canon.
