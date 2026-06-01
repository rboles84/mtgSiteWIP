# VM-211 - Sultai Brood Docs Parity Fill

ID: VM-211
Title: Sultai Brood Docs Parity Fill
Status: done
Type: Architecture Parity
Area: Sultai Brood, Identity Architecture, Placement Planning
Priority: high
Created: 2026-05-31

## Summary

Fill the Sultai Brood docs-only parity layer after VM-210, matching the established Tarkir/shard pattern for pair overlaps, wedge separators, support-only Commander anchors, placement guidance, and non-runtime search planning.

## Dependency

Completed after VM-210.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Add pair-overlap boundaries for Dimir, Golgari, and Simic.
- Add wedge separators against Abzan, Temur, Jeskai, Mardu, plus nearby Golgari, Dimir, and Simic false positives where source-backed.
- Add support-only Commander/operator anchors from the six BGU JSONL rows: graveyard value, theft, mill/rad counters, morph, Mimeoplasm-style graveyard construction, and mutate.
- Add placement guidance and non-runtime search planning shapes.
- Preserve `SULTAI` as docs-only and non-live.
- Preserve `BGU` and all color-order permutations as metadata/query-only.

## Non-Goals

- Do not create raw-faction JSON.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, or Temur files.
- Do not promote Sultai into placement eligibility, preview eligibility, routing, fixtures, generated data, or app surfaces.
- Do not treat Commander/operator rows as Tarkir lore proof, Commander legality proof, or placement scoring proof.

## Acceptance Criteria

- [x] Sultai docs include `Pair-Overlap Boundaries`.
- [x] Sultai docs include `Wedge Separators`.
- [x] Sultai docs include `Commander And Archetype Anchors`.
- [x] Sultai docs include `Placement Guidance`.
- [x] Sultai docs include `Non-runtime Search Planning Shapes`.
- [x] `BGU` remains metadata/query-only and Sultai remains non-live.
- [x] No raw-faction, runtime, generated, schema, Maze, route, Home, Supabase, Abzan, or Temur files are changed by VM-211.

## Completion Notes

- Added Sultai docs-only pair-overlap boundaries, wedge separators, Commander/operator anchors, placement guidance, and non-runtime search planning shapes to `docs/architecture/colors/sultai/identity.md`.
- Updated `docs/architecture/colors/sultai/metaphysics.md` only for cross-reference consistency so VM-211 parity material is no longer described as missing from the architecture lane.
- Preserved `SULTAI` as docs-only and non-live, and preserved `BGU` plus permutations as metadata/query-only.
- Verified the requested Jeskai board/card repair and VM-223 location were already present before VM-211 edits, so VM-211 did not rewrite those files.

## Suggested Tests

- Required-section scans for the parity sections.
- Required-term scans for `SULTAI`, `BGU`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query`, `non-live`, Dimir, Golgari, Simic, Abzan, Temur, Jeskai, Mardu, Silumgar clan, Dragonstorm Sultai, and generic BGU goodstuff.
- Guard scans proving no raw-faction, generated, runtime, route, Maze, Home, or Supabase files changed.
- Scoped `git diff --check`.
