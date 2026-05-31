# VM-186 - Jund Controlled Runtime Promotion

ID: VM-186
Title: Jund Controlled Runtime Promotion
Status: done
Type: Runtime Promotion / Placement
Area: Jund, Raw Factions, Placement Model, Generated Artifacts
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Promote Jund from the VM-180 review-approved raw packet to one live Archscry placement expression key: `JUND`.

## Scope

- Add `JUND` as the live expression key.
- Keep `BRG` as color-direction metadata only.
- Preserve Home preview at 20 entries.
- Update generated/runtime surfaces only through the approved build path.
- Update tests for the 24-expression baseline.

## Non-Goals

- Do not edit `jund.claims.json`.
- Do not add new lore sources, raw claims, Commander facts, card facts, evidence rows, or manual-fill conclusions.
- Do not add `BRG` as a key, alias, route key, fixture key, public label, generated key, builder target, or `RAW_TO_KEY` target.
- Do not add a `/jund/`, `/brg/`, Maze route, static page, route map entry, or Home card.
- Do not manually edit generated Supabase context outside the faction build path.
- Do not add route CSS/JS, Maze behavior, schema fields, broad shard framework work, or Naya promotion work.

## Acceptance Criteria

- Baseline starts at 23 factions, 23 placement records, 23 identity expressions, and Home preview 20.
- Final state has 24 factions, 24 placement records, 24 identity expressions, Home preview 20, and flavor snippets updated for the new live `JUND` expression.
- `JUND` exists in generated faction, placement, identity, and build-contract context surfaces.
- `BRG` remains absent as a live/generated key, alias, route key, fixture key, public label, and raw-to-live target.
- `JUND` uses colors `["B", "R", "G"]`, expression kind `shard`, core color `R`, placement eligible true, preview eligible false, and lateral targets `["BR", "BG", "RG", "GRIXIS", "WITHERBLOOM"]`.
- `data/raw-factions/jund/jund.claims.json` remains byte-for-byte unchanged.
- Generated Jund copy preserves VM-176/VM-179 boundaries and does not promote manual-fill lore, Modern Jund, devour, Commander/operator rows, or support-only material into canon.
- `npm.cmd run build:factions`, `node research/build-archscry-flavor-snippets.mjs`, `npm.cmd run test:placement`, and `npm.cmd test` pass.

## Completion Notes

- Promoted `JUND` as a live shard expression through `data/identity-layers.json`, `data/raw-factions/jund/` status metadata, `research/build-faction-artifacts.mjs`, and approved generated artifacts.
- Preserved `BRG` as color-direction metadata only; it is not a key, alias, route key, fixture key, public label, generated key, builder target, or `RAW_TO_KEY` target.
- Kept Home preview at 20 entries with `JUND.preview_eligible === false`.
- Left `data/raw-factions/jund/jund.claims.json` unchanged; the post-promotion hash matched the pre-edit hash.
- Added Jund lateral inhibition against `BR`, `BG`, `RG`, `GRIXIS`, and `WITHERBLOOM`, with reciprocal links.
- Added two Jund Hall questions for instinct under pressure and appetite with consequence.
- Updated placement, dossier, and presentation regressions for the 24-expression live baseline.
- Verified `npm.cmd run build:factions`, `node research/build-archscry-flavor-snippets.mjs`, `npm.cmd run test:placement`, and `npm.cmd test`.
