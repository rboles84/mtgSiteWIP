# VM-251 - Glint Controlled Runtime Promotion

ID: VM-251
Title: Glint Controlled Runtime Promotion
Status: done
Reservation State: Completed
Type: Runtime / Controlled Promotion
Area: Four-Color, Glint, Archscry
Priority: high
Created: 2026-05-31
Completed: 2026-06-03

## Summary

Promoted exactly one public/live key, `GLINT`, after VM-250 recorded `review-approved-for-future-promotion-planning`.

## VM-250 Approval

- Approval file: `docs/kanban/done/VM-250-glint-review-gate.md`
- Approval handoff: `docs/handoffs/2026-06-03-0718-codex-vm250-glint-review-gate.md`
- Verdict string: `review-approved-for-future-promotion-planning`
- Placement policy: `approved_for_controlled_live_promotion_only`
- Core color policy: `technical_aggregate_ubrg_only`
- Approved core color value: `UBRG`

## Results

- Added one live identity expression: `GLINT`.
- Rebuilt generated faction, placement, flavor, and Supabase context outputs through approved scripts.
- Preserved `UBRG` and all same-color permutations as metadata/query-only.
- Kept `GLINT` outside Home preview.
- Added no new route surface.
- Made no schema changes.
- Kept raw Glint JSON byte-stable against VM-250 hashes.

## Baseline Delta

- Before: identity 31, factions 31, placement 31, Archscry flavor snippets 31, Home preview 20.
- After: identity 32, factions 32, placement 32, Archscry flavor snippets 32, Home preview 20.

## Raw Hash Result

- Result: exact match to VM-250 before/after raw hash table.
- `glint.changelog.json`: `86C46F3DF64DA2D16DC41631B4A5414324C3E0A6C5DE5D3D57704BE44DD8F80D`
- `glint.claims.json`: `3CC77A05D9B70DBB3F925AC7B05A986DDF49F27405E157FB4DE79F60273986E5`
- `glint.placement.json`: `36FB1F326D416464B10CD6AA8AA37351251F509CBC6A0C6F6118653154CB7B15`
- `glint.profile.json`: `403857827677AED7ED44CB34760DE7DE7D7A94A401059D2A09F15A073BAE282D`
- `glint.sources.json`: `66D088E5E373662989CFF6FF1BCCA6E7C4A97AF1D0B8DE45D9F66771D6FCEA7B`

## Explicit Non-Goals

- Did not edit `data/raw-factions/glint/**`.
- Did not add public color-code aliases, route keys, Maze keys, Home preview keys, or extra four-color live keys.
- Did not add schema changes.
- Did not bundle unrelated Dune, Ink, Witch, or other dirty worktree changes.

## Route And Core Color Decisions

- `core_color: "UBRG"` is used only as the VM-250-approved technical aggregate.
- Pips and rendering derive from `colors: ["U", "B", "R", "G"]`.
- `secondary_color` remains `null` in generated layered identity for the aggregate core.
- `routing.color_identity: "UBRG"` is technical/query metadata only.
- `routing.label: "Glint"` is the human-facing directory-suppressed label.
- `preview_eligible: false` excludes `GLINT` from Home preview only; it does not block live identity registry, generated placement-model presence, Archscry flavor snippets, dossier availability, or generated guild-recruiter context.
- External Commander directory links are suppressed for Glint to avoid inventing `/ubrg/`, permutation, or `/glint/` directory slugs.

## Acceptance Criteria

- [x] Promoted exactly one live key: `GLINT`.
- [x] Generated files changed only through approved build scripts.
- [x] `UBRG` and permutations remain metadata/query-only after promotion.
- [x] Home preview remains unchanged at 20 entries.
- [x] Raw Glint JSON hashes match VM-250.
- [x] Tests passed.

## Tests Run

- `node --check research\build-faction-artifacts.mjs`
- `node --check research\build-archscry-flavor-snippets.mjs`
- `node --check assets\js\identity-layers.js`
- `node --check assets\js\index.js`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\archscry-presentation.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Focused live-count, raw-hash, route-alias, preview, schema-diff, and no-drift scans
