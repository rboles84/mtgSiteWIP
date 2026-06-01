# VM-261 - Ink Non-Live Raw Packet

ID: VM-261
Title: Ink Non-Live Raw Packet
Status: backlog
Reservation State: Reserved / Not Started
Type: Data / Raw Faction
Area: Four-Color, Ink, Raw Data
Priority: high
Created: 2026-05-31

## Summary

Reserve the future Ink raw-packet authoring card. This card is reserved but not started.

## Future Scope

- Author the five review-gated raw JSON files under a future `data/raw-factions/ink/` boundary.
- Keep `INK` future-only and keep `RGWU` plus permutations metadata/query-only.
- Stop before review, runtime, generated artifacts, or tests.

## Explicit Non-Goals

- Do not promote Ink live.
- Do not hand-edit generated outputs.
- Do not bundle later Ink lane work into VM-261.

## Dependencies

- Depends on VM-258 through VM-260 completion.

## Acceptance Criteria

- [ ] A future execution pass authors the non-live Ink raw packet only.
- [ ] Raw packet boundaries preserve `INK` as non-live and `RGWU` as metadata/query-only.
- [ ] No review gate or runtime promotion work is bundled into VM-261.
