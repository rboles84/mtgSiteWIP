# VM-375 - WUBRG EDHREC Precon Link Repair

ID: VM-375
Title: WUBRG EDHREC Precon Link Repair
Status: done
Type: Data link repair / generated faction output / test coverage
Area: WUBRG / Archscry Dossier / Commander Deck Starts
Priority: medium
Created: 2026-06-13
Completed: 2026-06-13

## Summary

Repaired the WUBRG `Commander Deck Starts` EDHREC starting-point URLs for `Eldrazi Incursion (Precon)` and `Draconic Domination (Precon)`.

## Scope

- Updated only the authored WUBRG deck-link EDHREC URL fields for the two exact precon labels.
- Rebuilt generated faction output through the canonical builder.
- Added regression coverage for the repaired URLs and broken fallback URL suppression.
- Preserved WUBRG support-navigation framing.

## Out Of Scope

- No Home preview, Maze behavior, public route, schema/API, Colorless boundary, Commander fact, precon ordering, UI label, or hero asset changes.
- No staging or commits.

## Acceptance Criteria

- [x] `Eldrazi Incursion (Precon)` points to `https://edhrec.com/precon/eldrazi-incursion`.
- [x] `Draconic Domination (Precon)` points to `https://edhrec.com/precon/draconic-domination`.
- [x] Generated WUBRG faction data reflects the URL repairs.
- [x] WUBRG Commander Deck Starts no longer emits the broken `/commanders/*-precon` fallback URLs for those rows.
- [x] Support-only precon framing and softened support-navigation UI language remain intact.
- [x] Required checks pass.

## Validation

- `npm.cmd run build:factions` - passed; built 37 faction placement records.
- `node --check research/archscry-dossier-followup-tests.js` - passed.
- JSON parse guard for `data/raw-factions/wubrg/wubrg.profile.json` and `data/factions.json` - passed.
- Direct WUBRG Commander Deck Starts EDHREC URL guard - passed.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `node research/validate-source-generated-guardrails.mjs WUBRG` - passed with 0 warnings.
- `npm.cmd test` - passed.
