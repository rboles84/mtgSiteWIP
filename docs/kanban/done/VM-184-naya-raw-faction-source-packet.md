# VM-184 - Naya Raw-Faction Source Packet

ID: VM-184
Title: Naya Raw-Faction Source Packet
Status: done
Type: JSON / Data Source Packet
Area: Naya, Raw Factions, Source Data
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Create Naya's authored-but-not-live raw-faction source packet under `data/raw-factions/naya/`.

## Scope

- Create exactly five Naya raw JSON files.
- Use VM-181 evidence rows as the raw-claim basis.
- Use VM-182 and VM-183 architecture docs as shaping-only context.
- Keep Naya source-only, review-gated, and non-live.
- Preserve accepted raw-packet source-role names: `claim-bearing`, `shaping-only`, and `support-only`.

## Claim Mapping

- `naya_claim_0001`: `NAYA-EVID-001`
- `naya_claim_0002`: `NAYA-EVID-002` and `NAYA-EVID-003`
- `naya_claim_0003`: `NAYA-EVID-004`
- `naya_claim_0004`: `NAYA-EVID-005`
- `naya_claim_0005`: `NAYA-EVID-006`
- `naya_claim_0006`: `NAYA-EVID-007`
- `naya_claim_0007`: `NAYA-EVID-008`
- `naya_claim_0008`: `NAYA-EVID-009`
- `naya_claim_0009`: `NAYA-EVID-011`
- `naya_claim_0010`: `NAYA-EVID-013`

## Non-Goals

- Do not edit VM-181 packet files.
- Do not edit VM-182 or VM-183 architecture docs.
- Do not create runtime, generated, schema, route, Home, Maze, Supabase, placement model, builder, fixture, or test changes.
- Do not add `NAYA`, `RGW`, `GRW`, `WRG`, or `naya` to generated, route, fixture, lookup, public label, or builder surfaces.
- Do not make raw claims from support-only, manual-fill, Commander/operator, seed, dossier, generated report, or architecture-prose material.

## Acceptance Criteria

- [x] Exactly five expected Naya raw JSON files exist and parse.
- [x] Top-level raw packet shape matches the accepted raw packet family.
- [x] `naya.claims.json` has exactly 10 raw claims.
- [x] Raw claim IDs are `naya_claim_0001` through `naya_claim_0010`.
- [x] Raw claims reference only the planned VM-181 evidence rows.
- [x] Raw claims reference only claim-bearing sources.
- [x] Profile and placement claim references are subsets of the 10 raw claim IDs.
- [x] `placement_axes` is `[]`.
- [x] No active/live status, preview eligibility, or placement eligibility is introduced.
- [x] `research/build-faction-artifacts.mjs` and `RAW_TO_KEY` have no Naya/RGW/GRW/WRG additions.
- [x] Changed paths are limited to Naya raw JSON plus VM-184 Kanban/handoff bookkeeping.

## Completion Notes

Completed as an authored-but-not-live raw-faction source packet. Naya remains source-only, review-gated, not placement-eligible, and not consumed by builder/runtime/generated surfaces.
