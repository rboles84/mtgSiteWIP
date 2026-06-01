# VM-234 - Jeskai Way Controlled Runtime Promotion

ID: VM-234
Title: Jeskai Way Controlled Runtime Promotion
Status: done
Type: Runtime Promotion / Placement
Area: Jeskai Way, Raw Factions, Placement Model, Generated Artifacts
Priority: high
Created: 2026-05-31

## Summary

Optionally promote Jeskai from the VM-233-approved raw packet to one live Archscry placement expression key: `JESKAI`.

## Promotion Gate

Do not start this card unless VM-233 explicitly records `review-approved-for-future-promotion-planning`.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Add `JESKAI` as the live expression key if the review gate approves it.
- Keep `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, and lowercase forms as color-direction/query metadata only.
- Preserve Home preview at the then-current entry baseline unless a separate Home-preview card changes that contract.
- Update generated/runtime surfaces only through the approved build path.
- Add or update placement tests for the then-current live baseline plus one Jeskai expression.
- If run from the current repo truth after VM-208, expect the live placement baseline to increase by exactly one; if intervening promotions occur first, increase the then-current baseline by exactly one.

## Non-Goals

- Do not edit `jeskai.claims.json` except under an explicit repair card.
- Do not add new lore sources, raw claims, Commander facts, card facts, evidence rows, or manual-fill conclusions.
- Do not add color-code permutations as keys, aliases, routes, fixture keys, public labels, generated keys, builder targets, or raw-to-live targets.
- Do not add a `/jeskai/`, `/urw/`, Maze route, static page, route map entry, or Home card.
- Do not manually edit generated Supabase context outside the faction build path.
- Do not add route CSS/JS, Maze behavior, schema fields, broad wedge framework work, Sultai work, Mardu work, or other clan promotion work.

## Acceptance Criteria

- [x] Baseline count is recorded before promotion.
- [x] Final live faction, placement, and identity counts increase by exactly one.
- [x] Home preview remains at the then-current baseline.
- [x] `JESKAI` exists in generated faction, placement, identity, and build-contract context surfaces.
- [x] `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, and lowercase forms remain absent as live/generated keys, aliases, route keys, fixture keys, public labels, and raw-to-live targets.
- [x] `JESKAI` uses colors `["U", "R", "W"]`, expression kind `wedge`, core color `U`, placement eligible true, and preview eligible false unless a separate approved card changes preview policy.
- [x] `data/raw-factions/jeskai/jeskai.claims.json` remains byte-for-byte unchanged from the reviewed packet.
- [x] Generated Jeskai copy preserves VM-229 through VM-232 boundaries and does not promote manual-fill lore, Ojutai-only material, Dragonstorm details, Commander/operator rows, generic URW goodstuff, or support-only material into canon.
- [x] Approved build and placement tests pass.

## Suggested Tests

- `npm.cmd run build:factions`
- Flavor snippet build if required by the current shard/wedge promotion pattern.
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Guard scans proving color-code permutations are metadata only and not routes/keys/aliases.
