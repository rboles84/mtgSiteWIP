# VM-212 - Sultai Brood Raw-Faction Source Packet

ID: VM-212
Title: Sultai Brood Raw-Faction Source Packet
Status: done
Type: Raw Faction Source Packet
Area: Sultai Brood, Raw Factions, Source Data
Priority: high
Created: 2026-05-31

## Summary

Create Sultai Brood's authored-but-not-live raw-faction source packet after VM-209 through VM-211 are complete and reviewed.

## Dependency

Completed after VM-209, VM-210, and VM-211.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Create exactly five JSON files under `data/raw-factions/sultai/`, matching the Abzan/Temur source-only packet shape:
  - `sultai.sources.json`
  - `sultai.claims.json`
  - `sultai.profile.json`
  - `sultai.placement.json`
  - `sultai.changelog.json`
- Bind raw claims only to claim-bearing `SULTAI-EVID-###` rows from VM-209.
- Treat architecture docs as shaping-only sources, not raw-claim evidence.
- Keep Commander/operator rows support-only.
- Set non-live/review-gated status values: not placement eligible, not preview eligible, review gated, and `live_pilot: false`.
- Leave placement axes empty.

## Non-Goals

- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, or Temur files.
- Do not add `SULTAI`, `BGU`, `BUG`, `UBG`, `GUB`, or lowercase forms to runtime, generated, route, fixture, Home, Maze, alias, lookup, or placement surfaces.
- Do not cite support-only Commander rows, seed files, generated HTML, architecture prose, or manual-fill rows as raw-claim evidence.
- Do not make Sultai placement-ready, preview-ready, routed, generated, or live.

## Acceptance Criteria

- [x] Exactly five Sultai raw JSON files exist under `data/raw-factions/sultai/`.
- [x] Raw claims cite only claim-bearing `SULTAI-EVID-###` rows or allowed guardrail/lifecycle rows for boundary claims.
- [x] Source records are classified as `claim-bearing`, `shaping-only`, or `support-only`.
- [x] Commander/operator rows, manual-fill rows, seed files, generated HTML, support-only evidence rows, synthesis rows, source-row IDs, and architecture prose are absent from raw-claim evidence.
- [x] Non-live/review-gated status fields are present.
- [x] No generated, runtime, schema, Maze, route, Home, Supabase, Abzan, or Temur files are changed by VM-212.

## Completion Notes

- Created exactly five Sultai raw JSON files under `data/raw-factions/sultai/`.
- Added 10 contiguous raw claims, `sultai_claim_0001` through `sultai_claim_0010`.
- Kept Sultai source-authored, review-gated, non-live, not placement eligible, not preview eligible, and `live_pilot: false`.
- Left `placement_axes` empty.
- Kept architecture docs as shaping-only source records and Commander/operator data as support-only.
- Did not edit Sultai research, Sultai architecture, Abzan raw files, Temur raw files, builders, generated artifacts, runtime files, schemas, Maze, route, Home preview, or Supabase files.

## Suggested Tests

- JSON parse check for all five files.
- File-count and exact-file-set check.
- Top-level shape comparison against the Abzan/Temur source-only raw packet.
- Claim ID and source-role validation.
- Evidence-row resolver against VM-209.
- Non-live status check.
- Raw-packet leakage scan for runtime/generated/route/Home/Maze/Supabase terms.
- Scoped `git diff --check`.
