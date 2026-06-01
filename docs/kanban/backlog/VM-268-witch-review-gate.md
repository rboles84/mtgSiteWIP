# VM-268 - Witch Review Gate

ID: VM-268
Title: Witch Review Gate
Status: backlog
Reservation State: Reserved / Not Started
Type: Review / Promotion Gate
Area: Four-Color, Witch, Raw Data
Priority: high
Created: 2026-05-31

## Summary

Reserve the future Witch raw-packet review gate. This card is reserved but not started.

## Future Scope

- Review the authored Witch raw packet for completeness, status markers, hash stability, and boundary compliance.
- Record whether Witch is approved for future promotion planning.
- Stop before runtime promotion or broader lane expansion.

## Explicit Non-Goals

- Do not activate `WITCH` as a live key in this card.
- Do not convert `GWUB` or permutations into public aliases or keys.
- Do not bundle later Witch lane work into VM-268.

## Dependencies

- Depends on VM-264 through VM-267 completion.

## Acceptance Criteria

- [ ] A future execution pass records a clear Witch review verdict.
- [ ] Raw packet review preserves byte stability unless a scoped repair is required.
- [ ] No runtime promotion work is bundled into VM-268.
