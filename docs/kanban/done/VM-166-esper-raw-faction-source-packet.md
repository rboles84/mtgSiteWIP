# VM-166 - Esper Raw-Faction Source Packet

## Status

Done

## Summary

Create Esper's authored-but-not-live raw-faction packet under `data/raw-factions/esper/` using Bant's five-file raw packet family as a structural reference only.

## Scope

Product files:

- `data/raw-factions/esper/esper.sources.json`
- `data/raw-factions/esper/esper.claims.json`
- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.placement.json`
- `data/raw-factions/esper/esper.changelog.json`

Bookkeeping:

- `docs/kanban/board.md`
- this Kanban card
- VM-166 handoff
- `docs/handoffs/HANDOFF_INDEX.md`

## Evidence Rules

- Author raw claims only from VM-163 rows `ESPER-001` through `ESPER-009`.
- VM-165 architecture language may shape profile and placement prose, but raw claims should cite VM-163 source rows directly wherever possible.
- `ESP-SRC-006` and evidence rows `ESPER-013`, `ESPER-014`, and `ESPER-015` may support only Commander/operator or placement-planning fields.
- `ESPER-010` through `ESPER-016`, WUB Commander rows, and cross-color dynamics must not support canon claims.
- Manual-fill topics remain limitations only.

## Guardrails

- Esper remains source-authored and review-gated.
- `WUB` remains color-direction metadata only.
- Do not add `ESPER` or `WUB` to runtime, generated, registry, raw-to-key, route, fixture, Home, Maze, schema, or Supabase surfaces.
- Do not edit `research/build-faction-artifacts.mjs`.
- Do not run `npm run build:factions`.
- Keep `placement_axes` empty unless every axis is draft/review-gated and has no numeric `faction_position`; preferred target is empty.
- Avoid implicit scoring prose in `esper.profile.json`.

## Acceptance Checks

- Passed: all five JSON files parse.
- Passed: `claim_count` equals claims array length.
- Passed: every claim source ID exists.
- Passed: every profile/placement claim reference exists.
- Passed: changelog references only valid source, claim, profile, or placement fields.
- Passed: evidence-tier usage stays within the VM-166 source policy.
- Passed: promotion guards show no runtime/generated/builder/schema/route/Home/Maze/Supabase changes from VM-166.

## Notes

Bant VM-159/159A and VM-169 are process/template references only. Esper must not inherit Bant's live-pilot status, numeric placement axes, or runtime-readiness language.

## Closeout

VM-166 created the source-only Esper raw packet and left Esper non-live, not placement-eligible, and unreachable from generated/runtime placement. `placement_axes` is intentionally empty. VM-167 remains optional and requires explicit owner authorization after review.
