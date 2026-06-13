# VM-358 - Shard And Tarkir Dossier Commander Source Intake

ID: VM-358
Title: Shard And Tarkir Dossier Commander Source Intake
Status: done
Type: source-intake / readiness review
Area: raw-factions / Commander support / dossier enrichment
Priority: high
Created: 2026-06-12
Completed: 2026-06-12

## Summary

Resolved the current shard/Tarkir governance question by updating field classifications rather than inventing missing figures, flavor anchors, deck links, or Commander Compass data.

## Completion Notes

- Classified existing Esper/Grixis/Jund/Naya timeline enrichment as backed repair and figure/flavor expansion as source-intake-needed.
- Preserved current Mardu/Jeskai support-only Compass `link_targets` boundaries.
- Left Mardu/Jeskai top-level `deck_links` and `research_links` absent.
- Left Abzan/Temur/Sultai public Commander Compass absent pending approved Commander/product support rows.

## Acceptance Criteria

- [x] Each repaired field has a field-level source category before implementation.
- [x] Top-level deck/research links surface only when the approved source category supports public navigation.
- [x] Commander Compass additions require approved Commander/product support rows.
- [x] Unsupported fields remain `source-intake-needed` or `blocked-noncanonical`.
- [x] Existing Mardu/Jeskai Compass `link_targets` boundaries are preserved unless public navigation support is explicit.
