# VM-256 - Dune Review Gate

ID: VM-256
Title: Dune Review Gate
Status: backlog
Reservation State: Reserved / Not Started
Type: Review / Promotion Gate
Area: Four-Color, Dune, Raw Data
Priority: high
Created: 2026-05-31

## Summary

Reserve the future Dune raw-packet review gate. This card is reserved but not started.

## Future Scope

- Review the authored Dune raw packet for completeness, status markers, hash stability, and boundary compliance.
- Record whether Dune is approved for future promotion planning.
- Stop before runtime promotion or broader lane expansion.

## Explicit Non-Goals

- Do not activate `DUNE` as a live key in this card.
- Do not convert `BRGW` or permutations into public aliases or keys.
- Do not bundle later Dune lane work into VM-256.

## Dependencies

- Depends on VM-252 through VM-255 completion.

## Acceptance Criteria

- [ ] A future execution pass records a clear Dune review verdict.
- [ ] Raw packet review preserves byte stability unless a scoped repair is required.
- [ ] No runtime promotion work is bundled into VM-256.
