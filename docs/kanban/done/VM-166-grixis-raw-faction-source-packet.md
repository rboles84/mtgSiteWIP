# VM-166 - Grixis Raw-Faction Source Packet

ID: VM-166
Title: Grixis Raw-Faction Source Packet
Status: done
Type: JSON / Data Source Packet
Area: Grixis, Raw Factions, Source Data
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Created Grixis's authored-but-not-live raw-faction source packet under `data/raw-factions/grixis/`.

## Scope Completed

- Created exactly five raw JSON files:
  - `data/raw-factions/grixis/grixis.sources.json`
  - `data/raw-factions/grixis/grixis.claims.json`
  - `data/raw-factions/grixis/grixis.profile.json`
  - `data/raw-factions/grixis/grixis.placement.json`
  - `data/raw-factions/grixis/grixis.changelog.json`
- Derived exactly 8 raw claims from VM-164 evidence rows `GRIXIS-001` through `GRIXIS-008`.
- Preserved VM-164 row IDs as evidence references and used raw packet claim IDs in the Bant/Esper shape.
- Kept Grixis authored, review-gated, and non-live.

## Non-Goals Preserved

- Did not edit VM-164 research packet files.
- Did not edit VM-165 architecture files.
- Did not edit `research/build-faction-artifacts.mjs`.
- Did not add `grixis` to `RAW_TO_KEY`.
- Did not run `npm run build:factions`.
- Did not change generated artifacts, placement model files, route assets, runtime JS, Home, Maze, Supabase, or tests as part of VM-166.

## Acceptance Evidence

- Exactly five JSON files exist under `data/raw-factions/grixis/`.
- All five JSON files parse.
- `grixis.claims.json` has exactly 8 raw claims.
- Raw claim IDs are `grixis_claim_0001` through `grixis_claim_0008`, distinct from VM-164 evidence row IDs.
- Raw claims reference only VM-164 rows `GRIXIS-001` through `GRIXIS-008`.
- VM-165 architecture docs do not appear as primary raw-claim evidence.
- Support/review/manual-fill/comparator rows do not appear as raw claims.
- `placement_axes` is `[]`.
- No `placement_eligible: true`, `live_pilot`, `faction_position`, or live readiness wording appears in the raw packet.
- `research/build-faction-artifacts.mjs` has no Grixis or `RAW_TO_KEY` diff from VM-166.

## Validation Notes

- `git diff --name-only` still reports unrelated dirty files that existed before VM-166, including runtime/data/generated-adjacent surfaces. They were not touched for this card.
- `git diff --check` on the scoped VM-166 paths passed with the existing Windows LF-to-CRLF warning for `docs/kanban/board.md`.
