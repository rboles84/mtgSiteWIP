# VM-042 - Dimir Full Formalization Upgrade

ID: VM-042
Title: Dimir Full Formalization Upgrade
Status: done
Type: Documentation / content architecture
Area: House Dimir, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Drafted the missing Dimir identity/metaphysics architecture files and brought them to the Azorius-style formalized support standard.

This pass became draft-first because `docs/architecture/colors/dimir/identity.md` and `docs/architecture/colors/dimir/metaphysics.md` did not exist at pre-flight. The work remained docs-only and scoped to Dimir architecture plus Kanban/handoff coordination.

## Outcome

- Created `docs/architecture/colors/dimir/identity.md` with VM-034-compatible anchors, compression-only `Vox Mana Read (Core Axiom)`, raw placement/shadow-anchored weaknesses, exact neighbor anchors, formal system mapping, operator signals, and source notes.
- Created `docs/architecture/colors/dimir/metaphysics.md` with bounded project framing, required internal-architecture boundary language, compression-only `Vox Mana Read`, structural/mechanical architecture, and ludological matrix mapping.
- Used `data/raw-factions/house_dimir/house_dimir.placement.json` as the raw placement/shadow risk source because no separate Dimir shadow file exists.
- Kept Dimir centered on secrecy over public legitimacy, hidden leverage over explicit authority, information asymmetry over procedural order, and invisible control over visible civic force.
- Added VM-042 coordination tracking and indexed the final handoff.

## Support Matrix Updates

| Section | Support | Notes |
|---|---:|---|
| identity.md / Identity Overview | strongly supported | Directly grounded in Dimir raw profile, claims, placement evidence, and faction-specific false-positive guardrails. |
| identity.md / Core Drive | strongly supported | Compresses the supported profile tension: information is power, and power is safest when others cannot see its shape. |
| identity.md / Vox Mana Read (Core Axiom) | strongly supported | Compression-only synthesis from `Core Drive`, `Philosophical Foundations`, `Mechanical Identity`, and `Gameplay Philosophy`; no new nouns, mechanics, or doctrine. |
| identity.md / Philosophical Foundations | strongly supported | Anchored to raw Dimir profile/claims plus Rosewater and Commander guidance for secrecy, information asymmetry, and observation before action. |
| identity.md / Mechanical Identity | strongly supported | Uses supported Surveil, mill-with-secrecy-context, hand disruption, evasion, Transmute, Cipher, and identity-pressure anchors. |
| identity.md / Gameplay Philosophy | strongly supported | Derived from supported Dimir placement and Commander-facing guidance; rejects generic Blue-Black control without faction-specific secrecy evidence. |
| identity.md / Philosophical Weaknesses | strongly supported | Each weakness is explicitly anchored to `data/raw-factions/house_dimir/house_dimir.placement.json` risk fields and bounded Rosewater weakness support. |
| identity.md / Color Relationships | strongly supported | Exact repo-relative anchors added for Azorius, Orzhov, Rakdos, Golgari, Simic, and Izzet. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Mapping fields now include definitions, Dimir values, evidence anchors, and derivation rules. |
| identity.md / Operator Translation Signals (Maze / Scryfall) | strongly supported | Signals and inhibitors derive from Dimir placement calibration, Commander guidance, raw claims, and anchored neighbor contrasts. |
| identity.md / Summary | strongly supported | Final compression restates the supported Dimir identity without adding new doctrine. |
| metaphysics.md / Metaphysical Thesis | bounded project framing, not canon | Thesis is interpretive Vox Mana framing derived from approved Dimir evidence and project research; not official Magic metaphysics. |
| metaphysics.md / Philosophical Foundations | strongly supported as Vox Mana internal architecture derived from approved evidence; not claimed as MTG canon | Required boundary sentence added; foundations translate Dimir evidence into project architecture. |
| metaphysics.md / Vox Mana Read | strongly supported as Vox Mana internal architecture derived from approved evidence; not claimed as MTG canon | Compression-only from supported metaphysics sections; no new nouns, mechanics, or doctrine. |
| metaphysics.md / Structural & Mechanical Architecture | strongly supported as Vox Mana internal architecture derived from approved evidence; not claimed as MTG canon | Maps supported Dimir mechanics and patterns into bounded Vox Mana architecture. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture derived from approved evidence; not claimed as MTG canon | Matrix axes are project fields derived from approved Dimir evidence and source-bounded synthesis. |

## Scope Guardrails

- Did not touch runtime, build, placement logic, UI, generated artifacts, Boros files, Azorius files, Gruul files, mono files, other guild files, or school files.
- Did not edit source research files or raw faction JSON.
- Did not reduce Dimir to generic Blue plus Black secrets.
- Did not invent MTG lore, card facts, commander facts, or project decisions.
- Did not present Vox Mana metaphysics as official MTG canon.
- Preserved repo-relative paths for evidence anchors.

## Tests / Verification

- Passed: `node research/validate-mono-color-markdown.mjs`
- Passed: manual Dimir H2 anchor/order check for both files.
- Passed: required support-boundary and compression-only/no-new-doctrine phrase search.
- Passed: exact relationship anchor search for Azorius, Orzhov, Rakdos, Golgari, Simic, and Izzet.
- Passed: stale target-language search for `partially supported`, `provisional scaffolding`, `unsupported target`, `target row`, and `partial support`.
- Passed: ASCII scan on changed Dimir docs and the VM-042 card before final handoff.
- Checked: `git status --short`; unrelated pre-existing runtime/docs changes remain, but VM-042 touched only Dimir architecture docs plus Kanban/handoff coordination.

## Human Review

Recommended for metaphysics tone and relationship contrast nuance. The pass upgrades support classification under an explicit internal-architecture / non-canon boundary.
