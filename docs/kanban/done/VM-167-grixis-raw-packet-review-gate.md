# VM-167 - Grixis Raw Packet Review Gate

ID: VM-167
Title: Grixis Raw Packet Review Gate
Status: done
Type: JSON / Data Review
Area: Grixis, Raw Factions, Review Gate
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Reviewed the VM-166 Grixis raw-faction packet as an approval airlock before any runtime promotion.

## Scope Completed

- Reviewed exactly five raw JSON files under `data/raw-factions/grixis/`.
- Verified the packet remains authored-but-not-live.
- Verified raw claims remain bound only to VM-164 evidence rows `GRIXIS-001` through `GRIXIS-008`.
- Verified `GRIXIS` is not live and `UBR` is metadata only.
- Recorded approval and caveats in the handoff only.

## Non-Goals Preserved

- Did not edit `data/raw-factions/grixis/`.
- Did not edit `docs/research/grixis/`.
- Did not edit `docs/architecture/colors/grixis/`.
- Did not edit `research/build-faction-artifacts.mjs`.
- Did not add `grixis` to `RAW_TO_KEY`.
- Did not run `npm run build:factions`.
- Did not edit generated artifacts, placement model files, route assets, runtime JS, Home, Maze, Supabase, or tests.

## Review Result

Status: `review-approved-for-future-promotion-planning`

This is not promotion-approved, runtime-ready, or placement-ready. VM-168 must still be planned and approved separately before any live promotion work.

## Acceptance Evidence

- Exactly five expected JSON files exist and parse.
- File shape matches Bant/Esper precedent as closely as applicable.
- All referenced source IDs resolve to `grixis.sources.json`.
- `grixis.claims.json` has exactly 8 raw claims.
- Claim IDs are `grixis_claim_0001` through `grixis_claim_0008`, not VM-164 row IDs.
- Raw claims reference only VM-164 rows `GRIXIS-001` through `GRIXIS-008`.
- VM-165 architecture docs are not primary raw-claim evidence.
- Support/manual-fill/discovery/comparator/Commander/Maestros rows are not promoted into raw claims.
- Unearth, attrition, and vis remain bounded and are not elevated beyond VM-164-approved status.
- `placement_axes` is `[]`.
- No live-readiness, runtime, scoring, routing, recommendation, rendering, or app-ready language is present in the raw packet.
- No `grixis` or `GRIXIS` builder diff exists.

## Caveats

- `research/build-faction-artifacts.mjs` still has a pre-existing Esper `RAW_TO_KEY` diff from earlier work. It is not a Grixis diff and was not touched in VM-167, but it should be accounted for before any VM-168 promotion work.
- `data/raw-factions/grixis/`, `docs/research/grixis/`, and `docs/architecture/colors/grixis/` remain untracked from earlier Grixis slices; VM-167 did not modify their content.
