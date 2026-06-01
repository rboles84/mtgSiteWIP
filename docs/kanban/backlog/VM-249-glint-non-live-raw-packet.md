# VM-249 - Glint Non-Live Raw Packet

ID: VM-249
Title: Glint Non-Live Raw Packet
Status: backlog
Reservation State: Reserved / Not Started
Type: Data / Raw Faction
Area: Four-Color, Glint, Raw Data
Priority: high
Created: 2026-05-31

## Summary

Reserve the future Glint raw-packet authoring card. This card is reserved but not started.

## Future Scope

- Author the five review-gated raw JSON files under a future `data/raw-factions/glint/` boundary.
- Keep `GLINT` future-only and keep `UBRG` plus permutations metadata/query-only.
- Stop before review, runtime, generated artifacts, or tests.

## Explicit Non-Goals

- Do not promote Glint live.
- Do not hand-edit generated outputs.
- Do not bundle later Glint lane work into VM-249.

## Dependencies

- Depends on VM-246 through VM-248 completion.

## Acceptance Criteria

- [ ] A future execution pass authors the non-live Glint raw packet only.
- [ ] Raw packet boundaries preserve `GLINT` as non-live and `UBRG` as metadata/query-only.
- [ ] No review gate or runtime promotion work is bundled into VM-249.
