# VM-245 - Yore Controlled Runtime Promotion

ID: VM-245
Title: Yore Controlled Runtime Promotion
Status: done
Reservation State: Completed
Type: Runtime / Controlled Promotion
Area: Four-Color, Yore, Archscry
Priority: high
Created: 2026-05-31
Completed: 2026-06-02

## Summary

Promoted exactly one public/live key, `YORE`, after VM-244 recorded `review-approved-for-future-promotion-planning`.

## VM-244 Approval

- Approval file: `docs/kanban/done/VM-244-yore-review-gate.md`
- Approval handoff: `docs/handoffs/2026-06-02-2049-codex-vm244-yore-review-gate.md`
- Verdict string: `review-approved-for-future-promotion-planning`
- Placement policy: `approved_for_controlled_live_promotion_only`
- Core color policy: `technical_aggregate_wubr_only`
- Approved core color value: `WUBR`

## Results

- Added one live identity expression: `YORE`.
- Rebuilt generated faction, placement, flavor, and Supabase context outputs through approved scripts.
- Preserved `WUBR` and all same-color permutations as metadata/query-only.
- Kept `YORE` outside Home preview.
- Made no schema changes.
- Kept raw Yore JSON byte-stable against VM-244 hashes.

## Baseline Delta

- Before: identity 30, factions 30, placement 30, Archscry flavor snippets 30, Home preview 20.
- After: identity 31, factions 31, placement 31, Archscry flavor snippets 31, Home preview 20.

## Raw Hash Result

- Result: exact match to VM-244 before/after raw hash table.
- `yore.changelog.json`: `7692CB7277ED1FAEEA6DCB7F2133C6D4F075217B45E98953DA7F9C314DCCF205`
- `yore.claims.json`: `CDC433F32D8C737732CF58B97CC0DB55A120BD40E8134FD7D843ECF83F73ABFF`
- `yore.placement.json`: `620A3397A7E9AF645757E9C2794F1C01B415610A923B9C4D97F71624410EC3A4`
- `yore.profile.json`: `5BA00C9A9BE2DC38245ACE721BAA8B6BC4F396DA249683F21AF7F6005E4B924D`
- `yore.sources.json`: `EB9D13C155875322C9BF201E84A67F163D8763582CAF48EE4A646AC4870B5C82`

## Explicit Non-Goals

- Did not edit `data/raw-factions/yore/**`.
- Did not add public color-code aliases, route keys, Maze keys, Home preview keys, or extra four-color live keys.
- Did not add schema changes.
- Did not bundle unrelated Glint, Dune, Ink, Witch, or other dirty worktree changes.

## Route And Core Color Decisions

- `core_color: "WUBR"` is used only as the VM-244-approved technical aggregate.
- Pips/rendering derive from `colors: ["W", "U", "B", "R"]`.
- `secondary_color` remains `null` in generated layered identity for the aggregate core.
- `routing.color_identity: "WUBR"` is technical/query metadata only.
- `routing.label: "Yore"` is the human-facing route label.
- External Commander directory links are suppressed for Yore to avoid inventing `/wubr/` or `/yore/` directory slugs.

## Acceptance Criteria

- [x] Promoted exactly one live key: `YORE`.
- [x] Generated files changed only through approved build scripts.
- [x] `WUBR` and permutations remain metadata/query-only after promotion.
- [x] Home preview remains unchanged at 20 entries.
- [x] Raw Yore JSON hashes match VM-244.
- [x] Tests passed.

## Tests Run

- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- `node --check` on touched JS/MJS files
- Focused count, raw-hash, forbidden-key, forbidden-alias, Home preview, YORE overclaim, and `git diff --check` scans
