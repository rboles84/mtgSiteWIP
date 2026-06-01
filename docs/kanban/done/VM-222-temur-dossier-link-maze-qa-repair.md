# VM-222 - Temur Dossier Link And Maze QA Repair

ID: VM-222
Title: Temur Dossier Link And Maze QA Repair
Status: done
Type: Frontend Repair / QA Regression
Area: Archscry dossier, Commander links, Maze handoff, Temur live-pilot presentation
Priority: high
Created: 2026-05-31
Updated: 2026-05-31

## Summary

Fix manual QA issues found after VM-221:

- Temur Commander deck-start links must use public Temur directory slugs, not `gur` color-code slugs.
- Temur visible dossier copy must not expose `GUR` or sorted permutations such as `URG` as public labels.
- Maze "From Your Dossier" must resolve active Temur handoffs to `TEMUR`/query-only Temur identity, not stale `WB`/adjacent color-code state or outside-color stretch paths.

## Scope

- Repair frontend/runtime presentation and Maze handoff code only.
- Add focused regression coverage for Temur commander-directory links, Layered Identity visible label handling, and stale color-code Maze handoff resolution.
- Preserve Temur raw claims/sources, research packets, architecture docs, generated data, routes, Home preview membership, schemas, Supabase config, fixtures, and builders.

## Acceptance Criteria

- [x] Temur EDHREC and MTGDecks deck-start links use `temur` public slugs.
- [x] Temur rendered visible copy does not show `GUR`, `URG`, or other Temur color-order permutations as public labels.
- [x] Temur Maze handoff sidebars show `Temur` and only the three in-color dossier paths.
- [x] Stale `WB` or other cached placement state cannot override an active Temur handoff.
- [x] `GUR` remains allowed only as query/color metadata.
- [x] No raw packet, research, architecture, generated artifact, route, Home preview, schema, Supabase, fixture, or builder files are intentionally changed.

## Closeout Notes

- Changed Temur public Commander directory routing from color-code `gur` slugs to public `temur` slugs while preserving `GUR` as query/color metadata.
- Changed the Layered Identity metadata badge so shard/wedge records with routing labels display the public expression label, preventing the sorted `URG` badge in Temur visible UI.
- Hardened Maze handoff identity resolution so active Temur can be inferred from `fit`, `factionName`, or Temur query identity before stale cached `WB`/pair state is allowed to drive the sidebar.
- Added regressions for Temur deck-start URLs, visible identity metadata, and stale-`WB` Maze handoff recovery.

## Tests

- `Get-FileHash data\raw-factions\temur\temur.claims.json -Algorithm SHA256`
- `Get-FileHash data\raw-factions\temur\temur.sources.json -Algorithm SHA256`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\index.js`
- `node --check assets\js\maze-handoff.js`
- `node --check research\research-init.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node --check research\maze-search-tests.js`
- `node assets\js\quick-reading-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Scoped Temur link and Layered Identity smoke check
- Scoped `git diff --check`
