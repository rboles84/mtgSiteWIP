# VM-232 - Jeskai Way Raw-Faction Source Packet

ID: VM-232
Title: Jeskai Way Raw-Faction Source Packet
Status: done
Type: JSON / Data Source Packet
Area: Jeskai Way, Raw Factions, Source Data
Priority: high
Created: 2026-05-31

## Summary

Create Jeskai Way's authored-but-not-live raw-faction source packet under `data/raw-factions/jeskai/`.

## Dependency

Blocked until VM-229, VM-230, and VM-231 are complete.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Create exactly five raw JSON files:
  - `data/raw-factions/jeskai/jeskai.sources.json`
  - `data/raw-factions/jeskai/jeskai.claims.json`
  - `data/raw-factions/jeskai/jeskai.profile.json`
  - `data/raw-factions/jeskai/jeskai.placement.json`
  - `data/raw-factions/jeskai/jeskai.changelog.json`
- Derive raw claims only from claim-bearing `JESKAI-EVID-###` rows from VM-229.
- Preserve VM-229 row IDs as evidence references and use raw packet claim IDs for source JSON only.
- Classify every source as `claim-bearing`, `shaping-only`, or `support-only`.
- Keep VM-230/VM-231 architecture docs as shaping-only inputs for profile and placement wording.
- Keep Jeskai authored, review-gated, and non-live.

## Non-Goals

- Do not edit VM-229 research packet files.
- Do not edit VM-230/VM-231 architecture files.
- Do not edit Abzan, Temur, Sultai, or Mardu files.
- Do not edit `research/build-faction-artifacts.mjs`.
- Do not add `jeskai` to any builder map.
- Do not run `npm run build:factions`.
- Do not change generated artifacts, placement model files, route assets, runtime JS, Home, Maze, Supabase, fixtures, or tests.

## Acceptance Criteria

- [ ] Exactly five JSON files exist under `data/raw-factions/jeskai/`.
- [ ] All five JSON files parse.
- [ ] Raw claim IDs are contiguous `jeskai_claim_####` IDs.
- [ ] Raw claims reference only planned VM-229 evidence rows.
- [ ] Raw claims reference only source IDs whose `source_role` is `claim-bearing`.
- [ ] VM-230/VM-231 architecture docs do not appear as raw-claim evidence.
- [ ] Support-only, manual-fill, Commander/operator, seed-file, generated HTML, and comparator rows do not appear as raw claims.
- [ ] `placement_axes` is empty unless a preceding approved card explicitly fills it.
- [ ] No live/runtime/generated/Home/route/fixture readiness fields are introduced.

## Suggested Tests

- JSON parse check across all five Jeskai raw files.
- Raw claim/source-role resolver.
- Evidence-row resolver against VM-229.
- `Test-Path data\raw-factions\jeskai`.
- Scope guard confirming no builder, generated, runtime, route, Maze, Home, Supabase, fixture, or test files changed.
- Scoped `git diff --check`.
