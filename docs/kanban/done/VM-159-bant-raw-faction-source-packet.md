# VM-159 - Bant Raw-Faction Source Packet

ID: VM-159
Title: Bant Raw-Faction Source Packet
Status: done
Type: Data / Source Authoring
Area: Bant, Raw Factions, Placement Prerequisite
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Completed: 2026-05-29

## Summary

Created Bant's canonical raw-faction source packet without promoting Bant into the live 20-expression placement model.

## Scope Completed

- Added `data/raw-factions/bant/bant.profile.json`.
- Added `data/raw-factions/bant/bant.placement.json`.
- Added `data/raw-factions/bant/bant.claims.json`.
- Added `data/raw-factions/bant/bant.sources.json`.
- Added `data/raw-factions/bant/bant.changelog.json`.
- Marked Bant as authored-but-not-live through existing raw-packet-style review and quality fields.

## Non-Goals Preserved

- Did not edit `data/identity-layers.json`.
- Did not edit `research/build-faction-artifacts.mjs`.
- Did not add Bant to `RAW_TO_KEY`.
- Did not edit schemas, generated artifacts, runtime files, Maze files, route CSS/JS, or Supabase files.
- Did not run `npm run build:factions`.

## Acceptance Evidence

- Bant raw packet parses as JSON.
- Claims, source IDs, and claim counts are internally consistent.
- Bant packet structure was compared against `azorius_senate` and `lorehold`; intentional omissions are documented in the handoff.
- `research/build-faction-artifacts.mjs` remains unchanged and has no `bant` mapping.
- `npm.cmd run test:placement` reports `PASS adaptive placement tests: 20 factions, 20 golden paths`.

## Follow-Up

VM-160 should handle any identity-layer registration, builder integration, generated artifacts, schema review, and the 20-to-21 placement-test transition only after human review of this source packet.
