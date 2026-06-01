# VM-255 - Dune Non-Live Raw Packet

ID: VM-255
Title: Dune Non-Live Raw Packet
Status: backlog
Reservation State: Reserved / Not Started
Type: Data / Raw Faction
Area: Four-Color, Dune, Raw Data
Priority: high
Created: 2026-05-31

## Summary

Reserve the future Dune raw-packet authoring card. This card is reserved but not started.

## Future Scope

- Author the five review-gated raw JSON files under a future `data/raw-factions/dune/` boundary.
- Keep `DUNE` future-only and keep `BRGW` plus permutations metadata/query-only.
- Stop before review, runtime, generated artifacts, or tests.

## Explicit Non-Goals

- Do not promote Dune live.
- Do not hand-edit generated outputs.
- Do not bundle later Dune lane work into VM-255.

## Dependencies

- Depends on VM-252 through VM-254 completion.

## Acceptance Criteria

- [ ] A future execution pass authors the non-live Dune raw packet only.
- [ ] Raw packet boundaries preserve `DUNE` as non-live and `BRGW` as metadata/query-only.
- [ ] No review gate or runtime promotion work is bundled into VM-255.
