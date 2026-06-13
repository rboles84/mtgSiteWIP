# VM-257 - Dune Controlled Runtime Promotion

ID: VM-257
Title: Dune Controlled Runtime Promotion
Status: done
Reservation State: Completed
Type: Runtime / Controlled Promotion
Area: Four-Color, Dune, Archscry
Priority: high
Created: 2026-05-31
Completed: 2026-06-03

## Summary

Promoted exactly one public/live key, `DUNE`, after VM-256 recorded `review-approved-for-future-promotion-planning`.

## VM-256 Approval

- Approval file: `docs/kanban/done/VM-256-dune-review-gate.md`
- Approval handoff: `docs/handoffs/2026-06-03-1920-codex-vm256-dune-review-gate.md`
- Verdict string: `review-approved-for-future-promotion-planning`
- Placement policy: `approved_for_controlled_live_promotion_only`
- Core color policy: `technical_aggregate_brgw_only`
- Approved core color value: `BRGW`

## Results

- Added one live identity expression: `DUNE`.
- Rebuilt generated faction, placement, flavor, and Supabase context outputs through approved scripts only.
- Preserved `BRGW`, `WBRG`, and all same-color permutations as metadata/query-only.
- Kept `DUNE` outside Home preview.
- Added no route-specific files and did not approve a dedicated `/dune/` route.
- Kept raw Dune JSON byte-stable against the VM-256 approved hashes.

## Baseline Delta

- Before: identity 32, factions 32, placement 32, Archscry flavor snippets 32, Home preview 20.
- After: identity 33, factions 33, placement 33, Archscry flavor snippets 33, Home preview 20.
- Supabase generated context gained exactly one new live key: `DUNE`.

## Raw Hash Result

- Result: exact match to VM-256 approved hashes.
- `dune.changelog.json`: `1706F08BF84B97DF22CEF16E5A9AEF92C2B4705DF86D40AF117FD4C806B84D1B`
- `dune.claims.json`: `496A4F15AD0CDB5818F989053A431C6A30F6404DEA8A953B833E0EB0E2600D13`
- `dune.placement.json`: `55D829041F6A8895F1DE1E41CDEFF34D861C322A82F413D3D9FD5C9E257D8BF3`
- `dune.profile.json`: `F941A22FAF218871645FF87DBF272C2739C5568449070D8D8D532C9D8B76865E`
- `dune.sources.json`: `F1466612A762BC19A4BFD35F29BDBCE4883DB6CC6A52CA1FEAAF39457E5B4853`

## Naming And Route Decisions

- Paired-name precedent was used in `data/identity-layers.json`, so the live registry entry uses `name: "Dune / Aggression"` in the same field family as Yore and Glint.
- `DUNE` remains the only live/public key and only public alias.
- `Aggression` remains paired-framing support text only, not a public alias, route key, preview key, expression key, or placement key.
- `routing.label: "Dune"` was used because the live Yore/Glint precedent already uses the same human-readable, directory-suppressed label field.
- `routing.color_identity: "BRGW"` was used only as technical aggregate metadata.
- No dedicated `/dune/` route was approved in VM-257, and no route-specific files were added.

## Explicit Non-Goals

- Did not edit `data/raw-factions/dune/**`.
- Did not edit `docs/research/dune/**`.
- Did not edit `docs/architecture/colors/dune/**`.
- Did not add public color-code aliases, permutation routes, Maze keys, or extra four-color live keys.
- Did not add Dune to Home preview.
- Did not roll Dune into the current identity-hero asset or mapping system.
- Did not repair the `DUNE-MF-011` / `DUNE-MF-012` packet drift.
- Did not bundle unrelated Ink, Witch, Glint, Yore, or dirty-worktree repair work.

## Acceptance Criteria

- [x] Promoted exactly one live key: `DUNE`.
- [x] Generated files changed only through approved build scripts.
- [x] `BRGW` and permutations remain metadata/query-only after promotion.
- [x] Home preview remains unchanged at 20 entries.
- [x] Raw Dune JSON hashes match VM-256.
- [x] No route-specific Dune files were added or approved.
- [x] `DUNE` remains outside the current identity-hero rollout.

## Validation Note

The Dune-specific promotion checks, generation path, count delta, raw-hash stability, preview exclusion, alias suppression, and no-route/no-hero boundaries passed.

Two broader shared-suite commands still fail on an unrelated existing adaptive-placement assertion:

- `npm.cmd run test:placement`
- `npm.cmd test`

Current failure text:

- `Golden path for QUANDRIX should win QUANDRIX, got U`

The traced QUANDRIX golden path does not ask the new Dune gate or hall questions, so this failure was recorded as a shared suite issue rather than a Dune-specific promotion blocker.

## Tests Run

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
- `npm.cmd run test:placement` (fails on unrelated QUANDRIX golden-path assertion)
- `npm.cmd test` (fails on the same unrelated QUANDRIX golden-path assertion)
- Focused live-count, raw-hash, no-route, no-preview, no-hero, alias-suppression, and no-drift scans
