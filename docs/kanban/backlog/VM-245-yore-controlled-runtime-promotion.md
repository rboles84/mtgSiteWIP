# VM-245 - Yore Controlled Runtime Promotion

ID: VM-245
Title: Yore Controlled Runtime Promotion
Status: backlog
Reservation State: Reserved / Not Started
Type: Runtime / Controlled Promotion
Area: Four-Color, Yore, Archscry
Priority: high
Created: 2026-05-31

## Summary

Reserve the future controlled promotion card for exactly one live Yore key. This card is reserved but not started.

## Future Scope

- Promote exactly one public/live key, `YORE`, if VM-244 records review approval for future promotion planning.
- Keep `WUBR` and permutations metadata/query-only.
- Rebuild generated artifacts only through approved build scripts.
- Preserve Home preview membership unless a separate future card changes it.

## Explicit Non-Goals

- Do not hand-edit generated outputs.
- Do not add public color-code aliases, route keys, or extra four-color live keys.
- Do not bundle unrelated four-color promotion work into VM-245.

## Dependencies

- Depends on VM-240 through VM-244 completion and an approved review verdict.

## Acceptance Criteria

- [ ] A future execution pass promotes exactly one live key: `YORE`.
- [ ] Generated files change only through approved build scripts.
- [ ] `WUBR` and permutations remain metadata/query-only after promotion.
