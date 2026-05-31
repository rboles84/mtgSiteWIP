# VM-185 - Naya Raw Packet Review Gate

ID: VM-185
Title: Naya Raw Packet Review Gate
Status: done
Type: JSON / Data Review
Area: Naya, Raw Factions, Review Gate
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Reviewed the VM-184 Naya raw-faction packet as a review-only gate before any later runtime planning.

## Scope Completed

- Reviewed exactly five raw JSON files under `data/raw-factions/naya/`.
- Verified the packet remains authored-but-not-live.
- Verified raw claims remain bound only to the exact VM-184 / VM-181 evidence mapping.
- Verified every source has an allowed `source_role` value: `claim-bearing`, `shaping-only`, or `support-only`.
- Verified raw claims reference only `claim-bearing` sources.
- Recorded the review result and caveats in the VM-185 handoff.

## Non-Goals Preserved

- Did not edit `data/raw-factions/naya/`.
- Did not edit `docs/research/naya/`.
- Did not edit `docs/architecture/colors/naya/`.
- Did not edit builders, generated artifacts, schemas, placement fixtures, route maps, browser bundles, runtime code, Home, Maze, Supabase, or tests.
- Did not add `NAYA`, `RGW`, `GRW`, `WRG`, or `naya` to generated, route, fixture, lookup, alias, public-label, or builder surfaces.
- Did not run `npm run build:factions`.

## Review Result

Status: `review-approved-for-future-promotion-planning`

This is a source-packet review result only. It does not approve Naya for runtime, placement, generated data, Home preview, routing, fixtures, or app integration.

## Acceptance Evidence

- Exactly five expected JSON files exist and parse.
- Top-level packet shape matches the accepted Jund raw packet family.
- `naya.claims.json` has exactly 10 raw claims.
- Raw claim IDs are `naya_claim_0001` through `naya_claim_0010`.
- Raw claim evidence mapping matches VM-184 exactly:
  - `naya_claim_0001` -> `NAYA-EVID-001`
  - `naya_claim_0002` -> `NAYA-EVID-002`, `NAYA-EVID-003`
  - `naya_claim_0003` -> `NAYA-EVID-004`
  - `naya_claim_0004` -> `NAYA-EVID-005`
  - `naya_claim_0005` -> `NAYA-EVID-006`
  - `naya_claim_0006` -> `NAYA-EVID-007`
  - `naya_claim_0007` -> `NAYA-EVID-008`
  - `naya_claim_0008` -> `NAYA-EVID-009`
  - `naya_claim_0009` -> `NAYA-EVID-011`
  - `naya_claim_0010` -> `NAYA-EVID-013`
- All allowed claim evidence rows exist in the VM-181 evidence ledger.
- Disallowed support-only, manual-fill, Commander/operator, seed, dossier, architecture, parity, and search-seed material does not become raw-claim evidence.
- Profile and placement claim references are subsets of the 10 raw claim IDs.
- `placement_axes` is `[]`.
- `research/build-faction-artifacts.mjs` has no Naya, RGW, GRW, or WRG references.
- No active/live/status/preview/placement eligibility values are introduced.

## Caveats

- The repository remains dirty from prior shard and runtime work. VM-185 used scoped validation and before/after raw-packet hashes rather than assuming a clean worktree.
- A broad scan for generated-label and route-slug wording found only the explicit negative boundary note that color-code strings do not become those surfaces. No affirmative leakage was found.
- VM-185 did not repair or reshape VM-184 JSON. Any later correction must be handled by a separate explicit repair card.
