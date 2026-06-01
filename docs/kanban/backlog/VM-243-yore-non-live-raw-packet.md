# VM-243 - Yore Non-Live Raw Packet

ID: VM-243
Title: Yore Non-Live Raw Packet
Status: backlog
Reservation State: Reserved / Not Started
Type: Data / Raw Faction
Area: Four-Color, Yore, Raw Data
Priority: high
Created: 2026-05-31

## Summary

Reserve the future Yore raw-packet authoring card. This card is reserved but not started.

## Future Scope

- Author the five review-gated raw JSON files under a future `data/raw-factions/yore/` boundary.
- Keep `YORE` future-only and keep `WUBR` plus permutations metadata/query-only.
- Stop before review, runtime, generated artifacts, or tests.

## Explicit Non-Goals

- Do not promote Yore live.
- Do not hand-edit generated outputs.
- Do not bundle later Yore lane work into VM-243.

## Dependencies

- Depends on VM-240 through VM-242 completion.

## Acceptance Criteria

- [ ] A future execution pass authors the non-live Yore raw packet only.
- [ ] Raw packet boundaries preserve `YORE` as non-live and `WUBR` as metadata/query-only.
- [ ] No review gate or runtime promotion work is bundled into VM-243.
