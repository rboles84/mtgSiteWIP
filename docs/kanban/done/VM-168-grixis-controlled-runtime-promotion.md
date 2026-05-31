# VM-168 - Grixis Controlled Runtime Promotion

ID: VM-168
Title: Grixis Controlled Runtime Promotion
Status: done
Type: Runtime Promotion / Placement
Area: Grixis, Raw Factions, Placement Model, Generated Artifacts
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Promote Grixis from the VM-167 review-approved raw packet to one live Archscry placement expression key: `GRIXIS`.

## Scope

- Add `GRIXIS` as the live expression key.
- Keep `UBR` as color identity metadata only.
- Preserve Home preview at 20 entries.
- Update generated/runtime surfaces only through the approved build path.
- Update tests for the 23-expression baseline.

## Non-Goals

- Do not edit `grixis.claims.json`.
- Do not add new lore sources, raw claims, Commander facts, or evidence rows.
- Do not add `UBR` as a key, alias, route key, fixture key, or `RAW_TO_KEY` target.
- Do not add a `/grixis/`, `/ubr/`, Maze route, static page, route map entry, or Home card.
- Do not manually edit generated Supabase context outside the faction build path.
- Do not add route CSS/JS, Maze behavior, schema domain fields, or broad shard framework work.

## Acceptance Criteria

- Baseline starts at 22 factions, 22 placement records, 22 identity expressions, and Home preview 20.
- Final state has 23 factions, 23 placement records, 23 identity expressions, and Home preview 20.
- `GRIXIS` exists in generated faction, placement, identity, and build-contract context surfaces.
- `UBR` remains absent as a live/generated key and alias.
- `GRIXIS` uses colors `["U", "B", "R"]`, expression kind `shard`, placement eligible true, preview eligible false, and lateral targets `["BANT", "BR", "ESPER", "UB", "UR"]`.
- Generated Grixis copy does not promote forbidden lore claims.
- `npm run build:factions`, `npm run test:placement`, and `npm test` pass using the repo-established Windows command form.

## Completion Notes

- Promoted `GRIXIS` as a live shard expression through `data/identity-layers.json`, `data/raw-factions/grixis/` status metadata, `research/build-faction-artifacts.mjs`, and approved generated artifacts.
- Preserved `UBR` as color identity metadata only; it is not a key, alias, route key, fixture key, or `RAW_TO_KEY` target.
- Kept Home preview at 20 entries with `GRIXIS.preview_eligible === false`.
- Left `data/raw-factions/grixis/grixis.claims.json` unchanged.
- Verified `npm.cmd run build:factions`, `node research/build-archscry-flavor-snippets.mjs`, `npm.cmd run test:placement`, and `npm.cmd test`.
