# VM-180 - Jund Raw Packet Review Gate

ID: VM-180
Title: Jund Raw Packet Review Gate
Status: done
Type: JSON / Data Review
Area: Jund, Raw Factions, Review Gate
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Reviewed the VM-179 Jund raw-faction packet as a review-only gate before any later runtime planning.

## Scope Completed

- Reviewed exactly five raw JSON files under `data/raw-factions/jund/`.
- Verified the packet remains authored-but-not-live.
- Verified raw claims remain bound only to approved VM-176 evidence rows.
- Verified every source has an allowed `source_role` value: `claim-bearing`, `shaping-only`, or `support-only`.
- Verified raw claims reference only `claim-bearing` sources.
- Recorded the review result and caveats in the VM-180 handoff.

## Non-Goals Preserved

- Did not edit `data/raw-factions/jund/`.
- Did not edit `docs/research/jund/`.
- Did not edit `docs/architecture/colors/jund/`.
- Did not edit Naya files.
- Did not edit builders, generated artifacts, schemas, placement fixtures, route maps, browser bundles, runtime code, Home, Maze, Supabase, or tests.
- Did not run `npm run build:factions`.

## Review Result

Status: `review-approved-for-future-promotion-planning`

This is a source-packet review result only. It does not approve Jund for runtime, placement, generated data, Home preview, routing, fixtures, or app integration.

## Acceptance Evidence

- Exactly five expected JSON files exist and parse.
- Top-level packet shape matches the accepted Bant/Esper/Grixis raw packet family.
- `jund.claims.json` has exactly 10 raw claims.
- Raw claim IDs are `jund_claim_0001` through `jund_claim_0010`.
- All raw-claim source IDs resolve.
- Raw-claim sources are classified as `claim-bearing`.
- Source roles are limited to `claim-bearing`, `shaping-only`, and `support-only`.
- Raw claims reference only `JUND-EVID-001` through `JUND-EVID-010`, `JUND-EVID-012`, and `JUND-EVID-013`.
- Support-only rows, manual-fill rows, Commander/operator rows, Scryfall/color-philosophy support, seed material, generated HTML, and architecture prose do not become raw claims.
- VM-177/VM-178 architecture docs remain shaping-only inputs.
- `placement_axes` is `[]`.
- No live-status, runtime, generated-data, Home preview, routing, fixture, or app-integration fields were introduced by VM-180.

## Caveats

- The repository remains dirty from prior shard work. VM-180 used scoped validation and a before/after content hash for `data/raw-factions/jund/` rather than assuming a clean worktree.
- VM-180 did not repair or reshape VM-179 JSON. Any later correction must be handled by a separate explicit repair card.
