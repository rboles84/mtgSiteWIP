# VM-179 - Jund Raw-Faction Source Packet

ID: VM-179
Title: Jund Raw-Faction Source Packet
Status: done
Type: JSON / Data Source Packet
Area: Jund, Raw Factions, Source Data
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Created Jund's authored-but-not-live raw-faction source packet under `data/raw-factions/jund/`.

## Scope Completed

- Created exactly five raw JSON files:
  - `data/raw-factions/jund/jund.sources.json`
  - `data/raw-factions/jund/jund.claims.json`
  - `data/raw-factions/jund/jund.profile.json`
  - `data/raw-factions/jund/jund.placement.json`
  - `data/raw-factions/jund/jund.changelog.json`
- Derived exactly 10 raw claims from VM-176 evidence rows `JUND-EVID-001` through `JUND-EVID-010`, plus boundary rows `JUND-EVID-012` and `JUND-EVID-013`.
- Preserved VM-176 row IDs as evidence references and used raw packet claim IDs in the Bant/Esper/Grixis shape.
- Classified every source as `claim-bearing`, `shaping-only`, or `support-only`.
- Kept VM-177/VM-178 architecture docs as shaping-only inputs for profile and placement wording.
- Kept Jund authored, review-gated, and non-live.

## Non-Goals Preserved

- Did not edit VM-176 research packet files.
- Did not edit VM-177/VM-178 architecture files.
- Did not edit Naya files.
- Did not edit `research/build-faction-artifacts.mjs`.
- Did not add `jund` to any builder map.
- Did not run `npm run build:factions`.
- Did not change generated artifacts, placement model files, route assets, runtime JS, Home, Maze, Supabase, fixtures, or tests.

## Acceptance Evidence

- Exactly five JSON files exist under `data/raw-factions/jund/`.
- All five JSON files parse.
- `jund.claims.json` has exactly 10 raw claims.
- Raw claim IDs are `jund_claim_0001` through `jund_claim_0010`, distinct from VM-176 evidence row IDs.
- Raw claims reference only the planned VM-176 rows.
- Raw claims reference only source IDs whose `source_role` is `claim-bearing`.
- VM-177/VM-178 architecture docs do not appear as raw-claim evidence.
- Support-only, manual-fill, Commander/operator, seed-file, generated HTML, and comparator rows do not appear as raw claims.
- `placement_axes` is `[]`.
- No live/runtime/generated/Home/route/fixture readiness fields were introduced.

## Validation Notes

- `git diff --name-only` still reports unrelated dirty files that existed before VM-179. VM-179 validation used scoped path checks.
- VM-180 remains the likely review-gate card before any later Jund runtime work.
