# VM-040 - Gruul Metaphysics Formalization Upgrade

ID: VM-040
Title: Gruul Metaphysics Formalization Upgrade
Status: done
Type: Documentation / content architecture
Area: Gruul Clans, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Formalized the remaining Gruul support rows so the Gruul files more closely match the Azorius strong-support standard without redesigning Gruul identity.

This pass keeps `Metaphysical Thesis` explicitly bounded as Vox Mana project framing, not Magic canon, while adding strong-support internal-architecture language where applicable.

## Outcome

- Anchored `identity.md / Philosophical Weaknesses` to raw Gruul placement shadow fields.
- Added the required strong-support sentence to applicable `metaphysics.md` architecture sections.
- Added a compression-only, no-new-doctrine rule to `metaphysics.md / Vox Mana Read`.
- Preserved `Metaphysical Thesis` as bounded project framing and did not add the strong-support sentence there.

## Support Matrix Updates

| Section | Support | Notes |
|---|---:|---|
| identity.md / Philosophical Weaknesses | strongly supported | Each weakness is explicitly anchored to `data/raw-factions/gruul_clans/gruul_clans.placement.json` shadow-related fields. |
| metaphysics.md / Metaphysical Thesis | bounded project framing, not canon | Thesis remains an interpretive Vox Mana frame derived from approved evidence and project research; no strong-support architecture sentence added. |
| metaphysics.md / Philosophical Foundations | strongly supported as Vox Mana internal architecture where applicable | Required strong-support sentence added; section remains project architecture derived from approved Gruul evidence. |
| metaphysics.md / Vox Mana Read | strongly supported as Vox Mana internal architecture where applicable | Required strong-support sentence and compression-only/no-new-doctrine rule added. |
| metaphysics.md / Structural & Mechanical Architecture | strongly supported as Vox Mana internal architecture where applicable | Required strong-support sentence added above the mechanics architecture. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture where applicable | Existing required strong-support sentence preserved. |

## Scope Guardrails

- Did not touch runtime, build, placement logic, UI, generated artifacts, Boros files, Azorius files, mono files, other guild files, or school files.
- Did not add the strong-support sentence to `Metaphysical Thesis`.
- Did not redesign Gruul identity or invent new lore.

## Tests / Verification

- Passed: `node research/validate-mono-color-markdown.mjs`
- Passed: manual Gruul H2 anchor/order check for both files.
- Passed: required strong-support sentence search.
- Passed: metaphysics compression-only/no-new-doctrine rule search.
- Passed: stale target-support language search.
- Passed: non-ASCII scan of changed Gruul docs, VM-040 card, and final handoff.

## Human Review

Recommended for metaphysics tone only. The upgrade is deliberately formal: it strengthens support classification and evidence anchoring while preserving the existing Gruul model.
