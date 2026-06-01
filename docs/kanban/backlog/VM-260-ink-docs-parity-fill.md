# VM-260 - Ink Docs Parity Fill

ID: VM-260
Title: Ink Docs Parity Fill
Status: backlog
Reservation State: Reserved / Not Started
Type: Documentation / Parity
Area: Four-Color, Ink, Architecture
Priority: high
Created: 2026-05-31

## Summary

Reserve the future Ink parity pass that brings the docs layer up to the shard and wedge onboarding standard. This card is reserved but not started.

## Future Scope

- Add pair overlaps, missing-color separators, commander support anchors, placement guidance, and false-positive boundaries needed for Ink docs parity.
- Keep the pass docs-only and source-bound.
- Stop before raw packets, review, runtime, generated artifacts, or tests.

## Explicit Non-Goals

- Do not author raw JSON or runtime mappings.
- Do not treat support commanders as lore proof.
- Do not bundle later Ink lane work into VM-260.

## Dependencies

- Depends on VM-258 and VM-259 completion.

## Acceptance Criteria

- [ ] A future execution pass fills Ink docs parity only.
- [ ] Commander support rows remain support-only.
- [ ] No raw packet, review gate, or runtime promotion work is bundled into VM-260.
