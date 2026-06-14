# VM-373 - WUBRG Identity Hero Background Hookup

ID: VM-373
Title: WUBRG Identity Hero Background Hookup
Status: done
Type: Runtime QA polish / Archscry hero
Area: WUBRG / Archscry Dossier / Identity Hero
Priority: medium
Created: 2026-06-13
Completed: 2026-06-13

## Summary

Hooked the user-provided `assets/img/identity-hero/wubrg.webp` asset into the existing Archscry dossier identity-hero background system for live `WUBRG`.

## Scope

- Preserve the established explicit `faction.key -> slug` mapping pattern.
- Add WUBRG to the dossier-local identity hero mapping only.
- Update focused identity-hero coverage to treat WUBRG as asset-backed.
- Keep WUBRG source, placement, Commander support, Maze, route, Home preview, schema, API, and generated-data boundaries unchanged.

## Out Of Scope

- No image generation, conversion, optimization, recrop, or asset-byte edits.
- No Home preview, public route, directory, alias, schema, API, raw-faction, generated-data, Maze, Commander, or Supabase changes.
- No `INK` hero rollout.

## Acceptance Criteria

- [x] `heroBannerImageSlugForFaction({ key: "WUBRG" })` resolves to `wubrg`.
- [x] `assets/img/identity-hero/wubrg.webp` is asserted to exist.
- [x] Focused hero coverage count is updated.
- [x] WUBRG uses the generic `identity-image` dossier hero mode.
- [x] `INK` remains outside the current hero rollout.
- [x] Required syntax/focused checks pass or failures are reported.

## Validation

- `node --check assets/js/index.js` - passed.
- `node --check research/archscry-dossier-followup-tests.js` - passed.
- Focused WUBRG hero mapping probe - passed.
- `git diff --check` on touched implementation/test/docs - passed with existing CRLF warnings only.
- `node research/archscry-dossier-followup-tests.js` - blocked before hero assertions by the unrelated in-progress VM-372 Colorless expectation: expected `support_only_controlled_richness`, actual `undefined`.
