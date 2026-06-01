# VM-267 - Witch Non-Live Raw Packet

ID: VM-267
Title: Witch Non-Live Raw Packet
Status: backlog
Reservation State: Reserved / Not Started
Type: Data / Raw Faction
Area: Four-Color, Witch, Raw Data
Priority: high
Created: 2026-05-31

## Summary

Reserve the future Witch raw-packet authoring card. This card is reserved but not started.

## Future Scope

- Author the five review-gated raw JSON files under a future `data/raw-factions/witch/` boundary.
- Keep `WITCH` future-only and keep `GWUB` plus permutations metadata/query-only.
- Stop before review, runtime, generated artifacts, or tests.

## Explicit Non-Goals

- Do not promote Witch live.
- Do not hand-edit generated outputs.
- Do not bundle later Witch lane work into VM-267.

## Dependencies

- Depends on VM-264 through VM-266 completion.

## Acceptance Criteria

- [ ] A future execution pass authors the non-live Witch raw packet only.
- [ ] Raw packet boundaries preserve `WITCH` as non-live and `GWUB` as metadata/query-only.
- [ ] No review gate or runtime promotion work is bundled into VM-267.
