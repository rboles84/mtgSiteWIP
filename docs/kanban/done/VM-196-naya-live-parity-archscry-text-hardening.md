# VM-196 - Naya Live Parity And Archscry Text Hardening

ID: VM-196
Title: Naya Live Parity And Archscry Text Hardening
Status: done
Type: Runtime Copy / Dossier Quality
Area: Naya, Archscry, Commander Dossier
Priority: high
Created: 2026-05-31
Updated: 2026-05-31

## Summary

Harden Naya's live Archscry and Commander dossier presentation so the mature live surface no longer relies on Jund, Orzhov, or generic fallback copy.

The requested plan named VM-192, but current board truth already used VM-191 and VM-192 for Jund, VM-193 for Grixis, and VM-194/VM-195 were in progress for Bant/Esper during closeout. This Naya-only repair was therefore completed as VM-196.

## Scope

- Keep Naya's VM-181 evidence floor and VM-184/VM-185 raw packet unchanged.
- Add Naya-specific Commander guidance and Archscry presentation copy.
- Add Naya starter-card groups, deck-link metadata, and support-only Commander Compass curation without editing Naya raw files.
- Preserve `RGW`, `GRW`, and `WRG` as metadata/query/validation terms only.
- Rebuild generated faction, placement, schema, and approved Supabase context artifacts through `npm.cmd run build:factions`.
- Add rendered Naya text regressions for fallback leakage, exact Commander search shape, support-search shape, local Scryfall validation, Cabaretti boundary copy, and source-bound precon summaries.

## Non-Goals

- Do not add new Naya lore, raw claims, evidence rows, manual-fill rows, source IDs, Home preview entries, routes, schema domain fields, Maze behavior outside Naya query-order preservation, or unrelated faction retuning.
- Do not edit `data/raw-factions/naya/`, `docs/research/naya/`, or `docs/architecture/colors/naya/`.
- Do not treat Commander/operator, Scryfall, precon, mechanics, starter-card, or generated presentation material as canon.

## Done Notes

- Added `NAYA` Commander guidance around abundance, living-world belonging, creature-forward scale, ramp, protected boards, instinctive care, tokens, and counters as support texture.
- Added `NAYA` Archscry presentation override covering table role, opponent read, emotional pressure, lore role, mechanics-as-support texture, thesis, close reason, fork question, direction, and self-check.
- Added Naya starter-card groups and Commander deck-link metadata to `data/identity-layers.json`.
- Added display-level Naya Commander Compass curation from support rows and local Scryfall validation without changing raw Naya JSON.
- Adjusted the faction builder to preserve Naya display-level Commander Compass curation when the raw compass is intentionally thin.
- Preserved Naya query order as `rgw` for Maze/package Commander searches while keeping color codes out of public keys, aliases, routes, and labels.
- Rebuilt approved generated artifacts through `npm.cmd run build:factions`.

## Tests Run

- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/maze-handoff.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/build-faction-artifacts.mjs`
- `node --check research/archscry-dossier-followup-tests.js`
- `npm.cmd run build:factions`
- `node assets/js/quick-reading-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/presentation-snapshot-tests.js`
- `npm.cmd test`
- Naya generated text leak scan: 0 hits for Jund/Orzhov/fallback phrases.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` passed with existing LF-to-CRLF working-copy warnings.

## Guard Checks

- `data/raw-factions/naya/` was not edited.
- `NAYA.preview_eligible` remains false.
- No `/naya/` or `/rgw/` route was added.
- `RGW`, `GRW`, and `WRG` remain absent as expression keys, aliases, route slugs, routes, fixture keys, public labels, or generated labels.
- Naya Commander-facing candidates validate locally as exact `id=rgw`.
- Naya support/starter cards validate locally as `id<=rgw`.
- `Cabaretti Cacophony` is framed only as same-color support/style comparator, not Naya canon, Alara canon, or a Naya lore source.
