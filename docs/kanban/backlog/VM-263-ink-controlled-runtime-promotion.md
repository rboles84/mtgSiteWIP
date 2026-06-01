# VM-263 - Ink Controlled Runtime Promotion

ID: VM-263
Title: Ink Controlled Runtime Promotion
Status: backlog
Reservation State: Reserved / Not Started
Type: Runtime / Controlled Promotion
Area: Four-Color, Ink, Archscry
Priority: high
Created: 2026-05-31

## Summary

Reserve the future controlled promotion card for exactly one live Ink key. This card is reserved but not started.

## Future Scope

- Promote exactly one public/live key, `INK`, if VM-262 records review approval for future promotion planning.
- Keep `RGWU` and permutations metadata/query-only.
- Rebuild generated artifacts only through approved build scripts.
- Preserve Home preview membership unless a separate future card changes it.

## Explicit Non-Goals

- Do not hand-edit generated outputs.
- Do not add public color-code aliases, route keys, or extra four-color live keys.
- Do not bundle unrelated four-color promotion work into VM-263.

## Dependencies

- Depends on VM-258 through VM-262 completion and an approved review verdict.

## Acceptance Criteria

- [ ] A future execution pass promotes exactly one live key: `INK`.
- [ ] Generated files change only through approved build scripts.
- [ ] `RGWU` and permutations remain metadata/query-only after promotion.
