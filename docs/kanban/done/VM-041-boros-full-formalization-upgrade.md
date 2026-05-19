# VM-041 - Boros Full Formalization Upgrade

ID: VM-041
Title: Boros Full Formalization Upgrade
Status: done
Type: Documentation / content architecture
Area: Boros Legion, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Upgraded Boros from usable pilot quality to the Azorius-style formalized standard.

This pass targeted `identity.md / Vox Mana Read (Core Axiom)`, `identity.md / Color Relationships`, `identity.md / System Mapping (Canonical)`, `metaphysics.md / Metaphysical Thesis`, `metaphysics.md / Philosophical Foundations`, `metaphysics.md / Vox Mana Read`, and `metaphysics.md / Ludological Matrix Mapping`.

`metaphysics.md / Structural & Mechanical Architecture` was preserved as already strong.

## Outcome

- Made `identity.md / Vox Mana Read (Core Axiom)` compression-only with no new nouns, mechanics, or doctrine.
- Added exact repo-relative evidence anchors for every named `Color Relationships` contrast: Azorius, Selesnya, Gruul, Rakdos, Lorehold, and Silverquill.
- Formalized `identity.md / System Mapping (Canonical)` as Vox Mana internal architecture with field definitions, Boros values, repo-relative evidence anchors, and derivation rules.
- Kept `metaphysics.md / Metaphysical Thesis` provisional while using the wording: strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon.
- Added the same internal-architecture boundary to `metaphysics.md / Philosophical Foundations`, `Vox Mana Read`, and `Ludological Matrix Mapping`.
- Made `metaphysics.md / Vox Mana Read` compression-only with no new nouns, mechanics, or doctrine.

## Support Matrix Updates

| Section | Support | Notes |
|---|---:|---|
| identity.md / Vox Mana Read (Core Axiom) | strongly supported | Compression-only synthesis from already-supported Boros evidence. |
| identity.md / Color Relationships | strongly supported | Exact repo-relative anchors added for every named contrast. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Mapping fields now include definitions, Boros values, evidence anchors, and derivation rules. |
| metaphysics.md / Metaphysical Thesis | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Still provisional in framing. |
| metaphysics.md / Philosophical Foundations | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Internal metaphysics architecture, not official Magic doctrine. |
| metaphysics.md / Vox Mana Read | strongly supported | Compression-only synthesis from the metaphysics sections; no new doctrine. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Matrix axes are project fields derived from approved Boros evidence. |

## Scope Guardrails

- Did not touch runtime, build, placement logic, UI, generated artifacts, Azorius files, Gruul files, mono files, other guild files, or school files.
- Did not redesign Boros identity.
- Did not invent new lore, card facts, commander facts, or project decisions.
- Did not treat Boros as a blind merge of Red and White.
- Did not present Vox Mana metaphysics as official MTG canon.
- Preserved repo-relative paths for evidence anchors.

## Tests / Verification

- Passed: `node research/validate-mono-color-markdown.mjs`
- Passed: manual Boros H2 schema-anchor check for both files.
- Passed: required phrase search for `compression-only`, `no new`, `Vox Mana internal architecture`, and `not MTG canon`.
- Passed: stale target-support search for `partial`, `partially supported`, and `unsupported` in current Boros section language.
- Checked: `canon doctrine` appears only in the requested qualified source notes.
- Passed: ASCII scan on changed Boros docs and the VM-041 card before the card move.
- Checked: `git status --short`; unrelated pre-existing runtime/docs changes remain, but VM-041 touched only Boros docs plus Kanban/handoff coordination.

## Human Review

Recommended for metaphysics tone only. The pass upgrades support classification under the explicit internal-architecture / non-canon boundary.
