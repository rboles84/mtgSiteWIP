# VM-364 - Archscry Identity Matrix Data Map

ID: VM-364
Title: Archscry Identity Matrix Data Map
Status: in-progress
Type: Documentation / Data Mapping
Area: Archscry, Placement, Identity Layers
Priority: high
Created: 2026-06-13

## Summary

Trace the Archscry placement-page Identity Matrix radar from the rendered canvas through `graph.js`, `dossier-radar.js`, `index.js`, placement result data, Layer 1 runtime data, and Layer 2 research/source boundaries.

## Scope

- Map what directly feeds `#dossierManaRadar`.
- Distinguish authored radar profile constants from placement-result fields.
- Distinguish Layer 1 runtime/source data from Layer 2 research scaffolding.
- Review related Archscry scripts and data builders.
- Produce a readable user-facing report and required handoff.

## Acceptance Criteria

- The report explains the exact data path from placement to rendered radar.
- Each radar component is mapped to its source.
- Direct authored radar profiles are separated from fallback averaged profiles.
- Placement data fields that do not feed the radar are explicitly named.
- Layer 1 and Layer 2 roles are stated without treating generated files as source truth.
- No runtime, generated JSON, placement scoring, `graph.js`, or lore/source data is changed.

## Validation

- [ ] Inspect related handoffs, board, cards, and data-flow docs.
- [ ] Inspect `archscry/index.html`, `assets/js/index.js`, `assets/js/dossier-radar.js`, `assets/js/graph.js`, `assets/js/adaptive-placement.js`, `assets/js/commander-dossier.js`, and `assets/js/identity-layers.js`.
- [ ] Inspect Layer 1 data and raw/build source path.
- [ ] Generate runtime radar profile table for all active factions.
- [ ] Run focused syntax/check tests where appropriate.
- [ ] Write handoff and update handoff index.
