# VM-226 - Mardu Horde Raw-Faction Source Packet

ID: VM-226
Title: Mardu Horde Raw-Faction Source Packet
Status: done
Type: Raw Faction / Source Data
Area: Mardu Horde, Raw Factions, Source Data
Priority: high
Created: 2026-05-31

## Summary

Create Mardu Horde's authored-but-not-live raw-faction source packet under `data/raw-factions/mardu/`.

## Dependency

VM-226 depends on VM-225 completion.

## Shared Reservation Facts

- `docs/research/mardu horde/` is unmanaged seed material.
- `docs/research/mardu/` is future VM-223 source-packet workspace only.
- `MARDU` is the future public key.
- `RWB` and `WBR` remain metadata/query-only.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Create authored-but-not-live raw-faction files under `data/raw-factions/mardu/`.
- Derive raw claims only from claim-bearing `MARDU-EVID-###` rows from VM-223.
- Preserve VM-223 row IDs as evidence references and use raw packet claim IDs for source JSON only.
- Use VM-224 and VM-225 architecture docs as shaping-only inputs for profile and placement wording.
- Keep `MARDU` as a future public key and keep `RWB`/`WBR` metadata/query-only.

## Non-Goals

- Do not edit VM-223 research packet files.
- Do not edit VM-224 or VM-225 architecture files.
- Do not build, generate, promote, or wire Mardu into runtime.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, builders, placement fixtures, Abzan files, Temur files, Sultai files, or Jeskai files.
- Do not use Commander/operator rows as raw-claim proof.

## Acceptance Criteria

- [x] `data/raw-factions/mardu/` exists only as authored-but-not-live source data.
- [x] Raw claims reference only claim-bearing `MARDU-EVID-###` rows from VM-223.
- [x] Commander/operator rows are excluded from raw-claim proof.
- [x] VM-224 and VM-225 architecture docs do not appear as raw-claim evidence.
- [x] `MARDU` is not added to generated/runtime surfaces.
- [x] `RWB` and `WBR` remain metadata/query-only and are not promoted as keys or aliases.

## Completion Notes

- Created exactly five Mardu raw JSON files under `data/raw-factions/mardu/`, matching the Sultai/Temur source-only packet shape.
- Added exactly 10 contiguous raw claims, `mardu_claim_0001` through `mardu_claim_0010`.
- Kept Mardu source-authored, review-gated, non-live, not placement eligible, not preview eligible, and `live_pilot: false`.
- Left `placement_axes` empty.
- Kept VM-224/VM-225 architecture docs as shaping-only source records and Commander/operator data as support-only.
- Did not edit Mardu research, Mardu architecture, existing raw-faction packets, builders, generated artifacts, runtime files, schemas, Maze, route, Home preview, Supabase, raw registry/build-map, alias-map, or promotion-list files.

## Suggested Tests

- JSON validity checks for raw packet files.
- Evidence-row resolver against VM-223.
- Commander/support-only exclusion scan.
- Raw-to-live leakage scan proving no generated/runtime surfaces changed.
- Scoped `git diff --check`.
