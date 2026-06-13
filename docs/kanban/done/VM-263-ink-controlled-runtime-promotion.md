# VM-263 - Ink Controlled Runtime Promotion

ID: VM-263
Title: Ink Controlled Runtime Promotion
Status: done
Reservation State: Completed
Type: Runtime / Controlled Promotion
Area: Four-Color, Ink, Archscry
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Promoted exactly one live/generated key, `INK`, through the established generated placement model path after VM-262 approval. The pass preserved raw Ink packet hash stability, kept Home preview membership unchanged, left `WITCH` absent, and did not create Ink routes, aliases, hero assets, navigation links, or Maze handoff links.

## Scope Completed

- Added `INK` to `data/identity-layers.json` as an active four-color expression with technical `core_color: "RGWU"`, colors `["R", "G", "W", "U"]`, aliases restricted to `["INK"]`, `preview_eligible: false`, and Commander directory links suppressed.
- Added Ink placement, biological-expression, lateral-inhibition, gate, and hall support in `research/build-faction-artifacts.mjs`.
- Added live Ink Commander guidance and Archscry presentation copy while keeping Altruism as display/support framing only.
- Added Ink runtime contract coverage to quick-reading and dossier follow-up tests.
- Refreshed approved generated outputs via `npm.cmd run build:factions` and `node research\build-archscry-flavor-snippets.mjs`.

## Baselines And Gate Results

- Pre-edit live/generated baseline from repo truth: identity 33, factions 33, placement 33, flavor snippets 33, Home preview 20.
- Post-edit live/generated baseline: identity 34, factions 34, placement 34, flavor snippets 34, Home preview 20.
- Only-new-key validation: `INK` is the only new live/generated key; no existing live key was removed or renamed.
- `WITCH` remains absent from identity, generated factions, placement, flavor snippets, and Home preview.
- `INK` is absent from Home preview membership.
- `RGWU`, `WURG`, and same-color permutations are not public aliases, routes, preview records, placement keys, Home links, Maze links, or navigation entries.
- No `ink.html`, `/ink/`, route config, redirects, sitemap entries, navigation links, page-specific CSS/JS, or hero assets were created.

## Raw Hash Stability

VM-262 raw hashes were verified before and after promotion:

- `ink.changelog.json`: `323A051B3D81042A0BE7A9A7EA09F787D7B59698519D46C9AC9F4CB575D3B944`
- `ink.claims.json`: `C2EF1FE2BD91143FC6FDE493DBC0A9DA3CA5164BB62B2D38BA9557D8864C7648`
- `ink.placement.json`: `2AF6CDFC6B968F88563FE57093C37841330F2BB98AED7FA4336B210ED35E0081`
- `ink.profile.json`: `8B909D19076A54F87F411A63441A9A76E86F717B069AD424B75DDB14DDCE5408`
- `ink.sources.json`: `43635671422B31611A56228A21A86783AE7F350AD964510053BD7CEFF365275A`

## Validation

- `node --check research\build-faction-artifacts.mjs`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:presentation-snapshots`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run audit:factions`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run test:parser`
- `git diff --check`
- Post-generation route/alias/preview/permutation validator
- Route/file absence checks for `ink.html`, `/ink/`, Witch architecture, and Witch raw folders

## Notes

- `git diff --check` passed with line-ending warnings only.
- `data/placement-model.schema.json` was written by `npm.cmd run build:factions` but did not show a final tracked diff.
- The broad worktree was already dirty before VM-263; unrelated dirty files were not repaired or normalized.

## VM-332 Supersession Addendum

VM-263's no-Ink-Maze-links policy was correct historical policy at the time of Ink's controlled runtime promotion. VM-332 supersedes only that suppression after VM-330 verified `INK` Layer 1 authority: Ink may now produce Maze/dossier exact commander handoff links through the technical query `id=rgwu is:commander f:commander`.

`RGWU` remains technical/query-only and is still not a public alias, public route, Home preview entry, hero mapping, navigation key, color-code directory, or user-facing identity label.
