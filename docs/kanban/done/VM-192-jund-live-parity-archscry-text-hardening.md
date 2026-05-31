# VM-192 - Jund Live Parity And Archscry Text Hardening

ID: VM-192
Title: Jund Live Parity And Archscry Text Hardening
Status: done
Type: Runtime Copy / Dossier Quality
Area: Jund, Archscry, Commander Dossier
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Harden Jund's live Archscry and Commander dossier presentation so the mature live surface no longer relies on fallback copy, visible internal work-card language, public color-code shorthand, or unsupported mechanics-as-canon compression.

## Scope

- Review Jund against mature live display/support parity expectations.
- Keep Jund source/evidence and raw claims unchanged.
- Replace visible internal Commander spellcraft caveats with player-facing Vox Mana copy that preserves support-only boundaries.
- Add rendered text regression coverage for Jund fallback, neighbor leakage, public color-code shorthand, and route-label leaks.

## Non-Goals

- Do not add new Jund lore, raw claims, evidence rows, manual-fill rows, source IDs, Home preview entries, routes, schema fields, Maze behavior changes, or unrelated faction retuning.
- Do not treat Commander/operator, Scryfall, precon, mechanics, starter-card, or generated presentation material as canon.

## Completion Notes

- Replaced the visible Jund Commander spellcraft caveat with player-facing Vox Mana support-texture copy.
- Updated the Jund raw profile mechanics summary so generated placement output no longer exposes the internal VM-179 caveat.
- Kept Jund mechanics as support-only texture: not lore-canon proof, not raw claims, and not a substitute for Red-centered identity evidence.
- Added rendered Jund dossier regression coverage for fallback copy, public BRG shorthand, UR leakage, route-like Jund paths, and exact/subset Commander queries.
- Rebuilt generated placement artifacts through `npm.cmd run build:factions`.

## Tests Run

- `node --check assets/js/commander-dossier.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/build-faction-artifacts.mjs`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git diff --check`

## Guard Checks

- `data/raw-factions/jund/jund.claims.json` hash remained `EDA50E0F55756014D80351AC36089474755CA501B73DE5B11A4BFAC8641FDA82`.
- Jund visible/rendered dossier tests reject internal VM-179 spellcraft caveats, generic fallback phrasing, public `Exact BRG` labels, `UR` handoff leakage, and `/jund/` route-like text.
- Color-code text remains metadata/query/support-validation only.
