# VM-374 - WUBRG Dossier Copy Governance Polish

ID: VM-374
Title: WUBRG Dossier Copy Governance Polish
Status: done
Type: Runtime copy polish / generated support data / test coverage
Area: WUBRG / Archscry Dossier / Commander support navigation
Priority: medium
Created: 2026-06-13
Completed: 2026-06-13

## Summary

Polished the WUBRG Archscry dossier copy so Five-Color remains source-bound, table-facing, and support-navigation safe before publish.

## Scope

- Applied the supplied WUBRG hero thesis, WUBRG/Golgari rose-first paragraph, adjacent direction, Start Here copy, and play-pattern wording.
- Normalized shared `five_color` display casing to `Five-Color`.
- Softened shared Archscry precon labels without changing recommendation data, ordering, links, support pool contents, or source records.
- Updated WUBRG flavor snippet ordering through the generator only.
- Added regression coverage for exact WUBRG copy, support-navigation wording, and WUBRG card voice order.

## Out Of Scope

- No Home preview, public route, directory, schema, API, Maze behavior, Colorless boundary, Commander source fact, or `wubrg.webp` asset-byte changes.
- No staging or commits.
- No new MTG lore, card facts, legality claims, ranking claims, metagame claims, or Commander recommendation proof.

## Acceptance Criteria

- [x] WUBRG rendered dossier copy includes the supplied exact hero thesis and rose-first paragraph.
- [x] WUBRG play pattern no longer renders `wants to full color access`.
- [x] Shared `five_color` expression helpers render `Five-Color`, not `Five-color`.
- [x] Precon wording uses support-navigation labels while preserving data meaning, ordering, link targets, support pool contents, and source records.
- [x] WUBRG card voices place `Coalition Victory` before `Heroes in a Half Shell` and use `Command Tower` as the verified five-color fixing/infrastructure signal.
- [x] `data/archscry-flavor-snippets.json` was rebuilt only from `research/build-archscry-flavor-snippets.mjs`.
- [x] Required checks passed.

## Validation

- `node --check assets/js/index.js` - passed.
- `node --check assets/js/archscry-presentation.js` - passed.
- `node --check assets/js/commander-dossier.js` - passed.
- `node --check assets/js/identity-layers.js` - passed.
- `node --check assets/js/home.js` - passed.
- `node --check research/build-archscry-flavor-snippets.mjs` - passed.
- `node --check research/archscry-dossier-followup-tests.js` - passed.
- `node research/build-archscry-flavor-snippets.mjs` - passed; only WUBRG snippet output changed against the pre-run snapshot.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `node research/validate-source-generated-guardrails.mjs WUBRG` - passed with 0 warnings.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `git diff --check` on VM-374 touched files - passed with CRLF warnings only.
