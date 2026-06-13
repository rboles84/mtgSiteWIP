# VM-293 - Witch Identity-Hero Background Dossier Hookup

ID: VM-293
Title: Witch Identity-Hero Background Dossier Hookup
Status: done
Type: UI / Dossier Hero Asset
Area: Archscry, Witch, Identity Hero
Priority: high
Created: 2026-06-05
Completed: 2026-06-05

## Summary

Connect the user-provided `assets/img/identity-hero/witch.webp` asset to the existing Archscry dossier identity-hero background system for live `WITCH`.

## Scope

- Add `WITCH: "witch"` to the explicit identity-hero slug map.
- Update focused dossier hero coverage to include Witch as an asset-backed live dossier identity.
- Keep `GWUB`, `WUBG`, `Growth`, and permutations out of public route/alias/hero slug derivation.

## Non-Goals

- Do not edit Witch raw JSON, research docs, architecture docs, generated placement data, Maze, Home preview membership, Supabase, routes, or schemas.
- Do not derive hero assets from technical color codes.
- Do not alter the `witch.webp` asset bytes.

## Acceptance Criteria

- [x] `heroBannerImageSlugForFaction({ key: "WITCH" })` resolves to `witch`.
- [x] Witch dossier hero background composes overlay, `witch.webp`, and the existing Witch banner.
- [x] `COLORLESS`, `WUBRG`, and `INK` remain outside the current dossier-backed hero rollout.
- [x] Focused dossier and presentation snapshot tests pass or only unrelated known failures are reported.

## Validation

- `node --check assets\js\index.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node --input-type=module -e "<focused Witch identity hero assertion>"`
- `npm.cmd run test:presentation-snapshots`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- assets/js/index.js research/archscry-dossier-followup-tests.js docs/kanban/board.md docs/kanban/in-progress/VM-293-witch-identity-hero-background-dossier-hookup.md`

`node research\archscry-dossier-followup-tests.js` is blocked before the hero assertions by an unrelated `JESKAI` flavor-index assertion: `expected JESKAI snippet text to come from committed Scryfall indexes`.
