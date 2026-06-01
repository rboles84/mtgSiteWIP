# VM-257 - Dune Controlled Runtime Promotion

ID: VM-257
Title: Dune Controlled Runtime Promotion
Status: backlog
Reservation State: Reserved / Not Started
Type: Runtime / Controlled Promotion
Area: Four-Color, Dune, Archscry
Priority: high
Created: 2026-05-31

## Summary

Reserve the future controlled promotion card for exactly one live Dune key. This card is reserved but not started.

## Future Scope

- Promote exactly one public/live key, `DUNE`, if VM-256 records review approval for future promotion planning.
- Keep `BRGW` and permutations metadata/query-only.
- Rebuild generated artifacts only through approved build scripts.
- Preserve Home preview membership unless a separate future card changes it.

## Explicit Non-Goals

- Do not hand-edit generated outputs.
- Do not add public color-code aliases, route keys, or extra four-color live keys.
- Do not bundle unrelated four-color promotion work into VM-257.

## Dependencies

- Depends on VM-252 through VM-256 completion and an approved review verdict.

## Acceptance Criteria

- [ ] A future execution pass promotes exactly one live key: `DUNE`.
- [ ] Generated files change only through approved build scripts.
- [ ] `BRGW` and permutations remain metadata/query-only after promotion.
