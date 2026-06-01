# VM-206 - Temur Frontier Raw-Faction Source Packet

ID: VM-206
Title: Temur Frontier Raw-Faction Source Packet
Status: done
Type: JSON / Data Source Packet
Area: Temur Frontier, Raw Factions, Source Data
Priority: high
Created: 2026-05-31

## Summary

Create Temur's authored-but-not-live raw-faction source packet under `data/raw-factions/temur/`.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Require VM-203 through VM-205 to be complete before starting.
- Create exactly five raw JSON files:
  - `data/raw-factions/temur/temur.sources.json`
  - `data/raw-factions/temur/temur.claims.json`
  - `data/raw-factions/temur/temur.profile.json`
  - `data/raw-factions/temur/temur.placement.json`
  - `data/raw-factions/temur/temur.changelog.json`
- Derive raw claims only from claim-bearing VM-203 evidence rows.
- Preserve VM-203 row IDs as evidence references and use raw packet claim IDs for source JSON only.
- Classify every source as `claim-bearing`, `shaping-only`, or `support-only`.
- Keep VM-204/VM-205 architecture docs as shaping-only inputs for profile and placement wording.
- Keep Temur authored, review-gated, and non-live.

## Non-Goals

- Do not edit VM-203 research packet files.
- Do not edit VM-204/VM-205 architecture files.
- Do not edit Abzan, Jeskai, Mardu, or Sultai files.
- Do not edit `research/build-faction-artifacts.mjs`.
- Do not add `temur` to any builder map.
- Do not run `npm run build:factions`.
- Do not change generated artifacts, placement model files, route assets, runtime JS, Home, Maze, Supabase, fixtures, or tests.

## Acceptance Criteria

- [x] Exactly five JSON files exist under `data/raw-factions/temur/`.
- [x] All five JSON files parse.
- [x] Raw claim IDs are contiguous `temur_claim_####` IDs.
- [x] Raw claims reference only planned VM-203 evidence rows.
- [x] Raw claims reference only source IDs whose `source_role` is `claim-bearing`.
- [x] VM-204/VM-205 architecture docs do not appear as raw-claim evidence.
- [x] Support-only, manual-fill, Commander/operator, seed-file, generated HTML, and comparator rows do not appear as raw claims.
- [x] `placement_axes` is empty unless a preceding approved card explicitly fills it.
- [x] No live/runtime/generated/Home/route/fixture readiness fields are introduced.

## Suggested Tests

- JSON parse check across all five Temur raw files.
- Raw claim/source-role resolver.
- `Test-Path data\raw-factions\temur`
- Scope guard confirming no builder, generated, runtime, route, Maze, Home, Supabase, fixture, or test files changed.
