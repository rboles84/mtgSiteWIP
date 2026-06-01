# VM-269 - Witch Controlled Runtime Promotion

ID: VM-269
Title: Witch Controlled Runtime Promotion
Status: backlog
Reservation State: Reserved / Not Started
Type: Runtime / Controlled Promotion
Area: Four-Color, Witch, Archscry
Priority: high
Created: 2026-05-31

## Summary

Reserve the future controlled promotion card for exactly one live Witch key. This card is reserved but not started.

## Future Scope

- Promote exactly one public/live key, `WITCH`, if VM-268 records review approval for future promotion planning.
- Keep `GWUB` and permutations metadata/query-only.
- Rebuild generated artifacts only through approved build scripts.
- Preserve Home preview membership unless a separate future card changes it.

## Explicit Non-Goals

- Do not hand-edit generated outputs.
- Do not add public color-code aliases, route keys, or extra four-color live keys.
- Do not bundle unrelated four-color promotion work into VM-269.

## Dependencies

- Depends on VM-264 through VM-268 completion and an approved review verdict.

## Acceptance Criteria

- [ ] A future execution pass promotes exactly one live key: `WITCH`.
- [ ] Generated files change only through approved build scripts.
- [ ] `GWUB` and permutations remain metadata/query-only after promotion.
