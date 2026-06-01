# VM-208 - Temur Frontier Controlled Runtime Promotion

ID: VM-208
Title: Temur Frontier Controlled Runtime Promotion
Status: done
Type: Runtime Promotion / Placement
Area: Temur Frontier, Raw Factions, Placement Model, Generated Artifacts
Priority: high
Created: 2026-05-31
Updated: 2026-05-31

## Summary

Promote Temur from the VM-207 review-approved raw packet to one live Archscry placement expression key: `TEMUR`.

## Promotion Gate

Do not start this card unless VM-207 explicitly records `review-approved-for-future-promotion-planning`.

## Promotion Result

Result: `promotion-complete-live-pilot`

VM-208 promoted exactly one live expression key, `TEMUR`, through the approved builder path. `GUR` remains color-direction metadata/query support only. Home preview membership remains fixed at 20 entries. `temur.claims.json` and `temur.sources.json` remain byte-for-byte unchanged from the VM-207-reviewed hashes.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Add `TEMUR` as the live expression key if the review gate approves it.
- Keep `GUR` as color-direction metadata only.
- Preserve Home preview at the existing 20-entry baseline unless a separate Home-preview card changes that contract.
- Update generated/runtime surfaces only through the approved build path.
- Add or update placement tests for the then-current live baseline plus one Temur expression.
- From the current repo truth, the live placement baseline moved from 26 to 27 expressions. If future intervening promotions occur, increase the then-current baseline by exactly one.

## Non-Goals

- Do not edit `temur.claims.json` except under an explicit repair card.
- Do not add new lore sources, raw claims, Commander facts, card facts, evidence rows, or manual-fill conclusions.
- Do not add `GUR` as a key, alias, route key, fixture key, public label, generated key, builder target, or raw-to-live target.
- Do not add a `/temur/`, `/gur/`, Maze route, static page, route map entry, or Home card.
- Do not manually edit generated Supabase context outside the faction build path.
- Do not add route CSS/JS, Maze behavior, schema fields, broad wedge framework work, Abzan promotion work, or other clan promotion work.

## Acceptance Criteria

- [x] Baseline count is recorded before promotion.
- [x] Final live faction, placement, and identity counts increase by exactly one.
- [x] Home preview remains at 20 entries.
- [x] `TEMUR` exists in generated faction, placement, identity, and build-contract context surfaces.
- [x] `GUR` remains absent as a live/generated key, alias, route key, fixture key, public label, and raw-to-live target.
- [x] `TEMUR` uses colors `["G", "U", "R"]`, expression kind `wedge`, core color `G`, placement eligible true, and preview eligible false unless a separate approved card changes preview policy.
- [x] `data/raw-factions/temur/temur.claims.json` remains byte-for-byte unchanged from the reviewed packet.
- [x] Generated Temur copy preserves VM-203/VM-206 boundaries and does not promote manual-fill lore, Atarka Clan material, Dragonstorm details, Commander/operator rows, generic GUR goodstuff, or support-only material into canon.
- [x] Approved build and placement tests pass.

## Suggested Tests

- `npm.cmd run build:factions`
- `node research/build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Guard scans proving `GUR` is metadata only and not a route/key/alias.
