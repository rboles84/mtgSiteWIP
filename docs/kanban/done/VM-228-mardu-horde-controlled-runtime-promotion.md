# VM-228 - Mardu Horde Controlled Runtime Promotion

ID: VM-228
Title: Mardu Horde Controlled Runtime Promotion
Status: done
Type: Runtime Promotion / Placement
Area: Mardu Horde, Raw Factions, Placement Model, Generated Artifacts
Priority: high
Created: 2026-05-31

## Summary

Optionally promote Mardu from the VM-235 repair re-review approved raw packet to one live Archscry placement expression key: `MARDU`.

## Promotion Gate

VM-228 originally depended on VM-227 returning `review-approved-for-future-promotion-planning`. VM-227 instead recorded `review-blocked-repair-required`; VM-235 repaired the missing non-live status marker and recorded `review-approved-for-future-promotion-planning`, so VM-235 is the repair re-review approval gate for VM-228 planning.

## Shared Reservation Facts

- `docs/research/mardu horde/` is unmanaged seed material.
- `docs/research/mardu/` is future VM-223 source-packet workspace only.
- `MARDU` is the future public key.
- `RWB` and `WBR` remain metadata/query-only.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Recompute the live runtime baseline at execution time.
- Do not assume the current Temur, Jeskai, VM-208, VM-221, or VM-222 baseline.
- Add `MARDU` as the live expression key only because VM-235 approved future promotion planning after repairing the VM-227 blocker.
- Keep `RWB`, `WBR`, and lowercase forms as color-direction/query metadata only.
- Update generated/runtime surfaces only through the approved build path.
- Add or update placement tests for the then-current live baseline plus one Mardu expression.

## Non-Goals

- Do not edit `mardu.claims.json` except under an explicit repair card.
- Do not add new lore sources, raw claims, Commander facts, card facts, evidence rows, or manual-fill conclusions.
- Do not add color-code permutations as keys, aliases, routes, fixture keys, public labels, generated keys, builder targets, or raw-to-live targets.
- Do not add a `/mardu/`, `/rwb/`, `/wbr/`, Maze route, static page, route map entry, or Home card.
- Do not manually edit generated Supabase context outside the faction build path.
- Do not add route CSS/JS, Maze behavior, schema fields, broad wedge framework work, Sultai work, Jeskai work, or other clan promotion work.

## Acceptance Criteria

- [x] Baseline count is recorded before promotion.
- [x] Final live faction, placement, and identity counts increase by exactly one.
- [x] Home preview remains at the then-current baseline unless a separate approved card changes preview policy.
- [x] `MARDU` exists in generated faction, placement, identity, and build-contract context surfaces.
- [x] `RWB`, `WBR`, and lowercase forms remain absent as live/generated keys, aliases, route keys, fixture keys, public labels, and raw-to-live targets.
- [x] `MARDU` uses the approved Mardu color metadata, expression kind `wedge`, Red-centered identity, placement eligible true, and preview eligible false unless a separate approved card changes preview policy.
- [x] `data/raw-factions/mardu/` remains byte-for-byte unchanged from the VM-235-reviewed packet.
- [x] Generated Mardu copy preserves VM-223 through VM-226 boundaries and does not promote manual-fill lore, Commander/operator rows, generic RWB/WBR goodstuff, or support-only material into canon.
- [x] Approved build and placement tests pass.

## Suggested Tests

- `npm.cmd run build:factions`
- Flavor snippet build if required by the current wedge promotion pattern.
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Guard scans proving color-code permutations are metadata only and not routes/keys/aliases.

## Closeout

Completed: 2026-05-31

Result: promoted exactly one public/live expression key, `MARDU`, through the approved raw-to-live build path after VM-235 recorded `review-approved-for-future-promotion-planning`.

Baseline and final count evidence:

- Identity-layer expressions: 28 -> 29.
- Generated faction records: 28 -> 29.
- Placement records: 28 -> 29.
- Archscry flavor snippet keys: 28 -> 29.
- Home preview entries: 20 -> 20.

Boundary confirmations:

- `MARDU` is live in identity, generated faction, placement, Archscry flavor, and Supabase faction context output.
- `RWB`, `WBR`, and color-order permutations remain metadata/query-only and are not live expression keys, aliases, route keys, Home entries, Maze entries, raw-to-live targets, or generated placement keys.
- All five `data/raw-factions/mardu/*.json` files retained their VM-235 SHA-256 hashes after promotion.
- No Mardu research docs, Mardu architecture docs, routes, Home preview UI, Maze route files, schemas, fixtures, or raw-faction packet files were edited by VM-228.

Tests run:

- `node --check` on touched JS/MJS test, builder, dossier, presentation, and research files.
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Mardu key/count/alias guard scans.
- Mardu raw SHA-256 hash guard.
- Runtime route/Home/Maze leakage scans.
- Scoped `git diff --check` and trailing-whitespace scans.
