# VM-188 - Naya Controlled Runtime Promotion

ID: VM-188
Title: Naya Controlled Runtime Promotion
Status: done
Type: Controlled Runtime Promotion
Area: Naya, Archscry, Placement, Generated Data
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Promote Naya only from the VM-185-approved raw packet into one live Archscry expression key: `NAYA`.

VM-187 was already occupied by `Jund Live-Pilot Copy And Dossier Handoff Repair`, so this Naya promotion uses VM-188 to avoid an ID collision. Existing Jund runtime state was treated as baseline and was not retuned.

## Scope

- Add `naya: "NAYA"` to the approved raw-to-live builder mapping.
- Add `NAYA` identity and placement metadata using shard conventions.
- Keep `RGW`, `GRW`, and `WRG` as metadata/query/validation terms only.
- Update Naya raw status/changelog metadata only; keep raw claims unchanged.
- Add Naya-owned placement calibration and Naya Hall questions.
- Rebuild approved generated faction, placement, snippet, and Supabase context artifacts.
- Preserve Home preview membership and keep `NAYA.preview_eligible` false.

## Non-Goals

- Do not promote, repair, retune, document, or reconcile Jund.
- Do not edit Jund raw files, Jund docs, Jund Kanban cards, or Jund handoffs.
- Do not add `RGW`, `GRW`, or `WRG` as keys, aliases, routes, route slugs, public labels, fixture keys, or generated labels.
- Do not add `/naya/`, `/rgw/`, Maze routes, Home preview cards, Supabase deployment/config changes, new lore facts, Commander facts, or raw claims.

## Acceptance Criteria

- Baseline begins at 24 factions, 24 identity expressions, 24 placement records, 24 generated snippet keys, and 20 Home preview entries.
- Post-build count is exactly +1 for factions, identity expressions, placement records, and generated snippet keys.
- Home preview remains 20 and `NAYA.preview_eligible` remains false.
- `NAYA` appears in generated faction, identity, placement, snippet, and approved generated Supabase context surfaces.
- `data/raw-factions/naya/naya.claims.json` remains unchanged.
- Jund raw files remain unchanged and Jund runtime definitions are not semantically retuned.

## Completion Notes

- Added Naya source mapping and identity/placement metadata.
- Added Naya-owned biological prior, lateral inhibition target list, and two Naya Hall questions.
- Added Naya query-construction support so Commander/Maze examples use exact `id=rgw` and support `id<=rgw` while keeping `RGW` out of aliases and keys.
- Updated Naya raw profile, placement, and changelog status metadata for a VM-188 live pilot without changing raw claims.
- Rebuilt generated faction, placement, snippet, schema, and Supabase context artifacts through approved scripts.

## Tests Run

- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/quick-reading-tests.js`
- `node research/build-faction-artifacts.mjs`
- `node research/build-archscry-flavor-snippets.mjs`
- `node assets/js/quick-reading-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/presentation-snapshot-tests.js`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Guard Checks

- `data/raw-factions/naya/naya.claims.json` hash remained unchanged from pre-flight.
- Jund raw claims/profile/placement/changelog hashes remained unchanged from pre-flight.
- Post-build counts are 25 factions, 25 identity expressions, 25 placement records, 25 generated snippet keys, and 20 Home preview entries.
- `NAYA` aliases are only `NAYA` and `naya`.
- No `RGW`, `GRW`, or `WRG` expression key, raw-to-live target, or identity alias was introduced.
- No standalone `/naya/` or `/rgw/` route was added.
