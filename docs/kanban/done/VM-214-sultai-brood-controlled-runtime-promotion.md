# VM-214 - Sultai Brood Controlled Runtime Promotion

ID: VM-214
Title: Sultai Brood Controlled Runtime Promotion
Status: done
Type: Runtime Promotion / Placement
Area: Sultai Brood, Raw Factions, Placement Model, Generated Artifacts
Priority: high
Created: 2026-05-31

## Summary

Optionally promote Sultai from the VM-213 review-approved raw packet to one live Archscry placement expression key: `SULTAI`.

## Dependency

Blocked until VM-213 records `review-approved-for-future-promotion-planning`.

## Promotion Gate

Do not start this card unless VM-213 explicitly records `review-approved-for-future-promotion-planning`.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Add `SULTAI` as the live expression key if the review gate approves it.
- Keep `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms as metadata/query-only.
- Use colors `["B", "G", "U"]`, expression kind `wedge`, core color `B`, placement eligible true, and preview eligible false unless a separate approved card changes preview policy.
- Preserve Home preview membership unless a separate Home-preview card changes that contract.
- Update generated/runtime surfaces only through the approved build path.
- Add or update placement tests for the then-current live baseline plus one Sultai expression.
- If intervening promotions occur first, increase the then-current baseline by exactly one.

## Non-Goals

- Do not edit `sultai.claims.json` or `sultai.sources.json` except under an explicit repair card.
- Do not add new lore sources, raw claims, Commander facts, card facts, evidence rows, or manual-fill conclusions.
- Do not add `BGU`, `BUG`, `UBG`, `GUB`, or lowercase forms as public keys, aliases, route keys, fixture keys, generated keys, builder targets, public labels, Home preview keys, or raw-to-live targets.
- Do not add a `/sultai/`, `/bgu/`, `/bug/`, `/ubg/`, or `/gub/` route, Maze route, static page, route map entry, or Home card.
- Do not manually edit generated Supabase context outside the faction build path.
- Do not add route CSS/JS, Maze behavior, schema fields, broad wedge framework work, Temur promotion work, Abzan work, or other clan promotion work.

## Acceptance Criteria

- [x] Baseline count is recorded before promotion.
- [x] Final live faction, placement, and identity counts increase by exactly one.
- [x] Home preview membership remains unchanged unless a separate approved card changes it.
- [x] `SULTAI` exists in generated faction, placement, identity, and build-contract context surfaces.
- [x] `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms remain absent as live/generated keys, aliases, route keys, fixture keys, public labels, Home preview keys, and raw-to-live targets.
- [x] `SULTAI` uses colors `["B", "G", "U"]`, expression kind `wedge`, core color `B`, placement eligible true, and preview eligible false unless a separate approved card changes preview policy.
- [x] `data/raw-factions/sultai/sultai.claims.json` and `data/raw-factions/sultai/sultai.sources.json` remain byte-for-byte unchanged from the reviewed packet.
- [x] Generated Sultai copy preserves VM-209 through VM-212 boundaries and does not promote manual-fill lore, Silumgar clan material, Dragonstorm details, Commander/operator rows, generic BGU goodstuff, or support-only material into canon.
- [x] Approved build and placement tests pass.

## Closeout

- Completed: 2026-05-31
- Result: `SULTAI` promoted as the only live key.
- Baseline: 27 identity/faction/placement/flavor records and 20 Home preview entries.
- Final: 28 identity/faction/placement/flavor records and 20 Home preview entries.
- Hash guard: `sultai.claims.json` and `sultai.sources.json` SHA-256 hashes matched VM-213/VM-214 pre-promotion values.
- Boundary: `BGU`, `BUG`, `UBG`, `GUB`, other color-order forms, and lowercase forms remain metadata/query-only and are not public keys or aliases.
- Tests: `node --check` on changed JS, `npm.cmd run build:factions`, `node research\build-archscry-flavor-snippets.mjs`, `npm.cmd run test:placement`, `npm.cmd run test:presentation-snapshots`, `npm.cmd test`, and `npm.cmd run audit:factions`.

## Suggested Tests

- `node --check` on changed JS files.
- `npm.cmd run build:factions`
- Flavor snippet build if required by the current promotion pattern.
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Home preview count check.
- Generated key/alias scans proving `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms are metadata-only and not route/key/alias surfaces.
