# VM-201 - Abzan Raw Packet Review Gate

ID: VM-201
Title: Abzan Raw Packet Review Gate
Status: done
Type: JSON / Data Review
Area: Abzan, Raw Factions, Review Gate
Priority: high
Created: 2026-05-31
Updated: 2026-05-31
Completed: 2026-05-31

## Duplicate-ID Note

This is the user-declared Abzan stack VM-201 for the Abzan VM-197 through VM-202 lane. The existing unrelated `VM-201 - Tarkir Clan Source Folder Restore` card and handoff are preserved unchanged.

## Summary

Reviewed the duplicate Abzan VM-200 authored-but-not-live raw-faction packet as a review-only gate before any later promotion planning.

## Scope Completed

- Reviewed exactly five raw JSON files under `data/raw-factions/abzan/`.
- Verified the packet remains authored-but-not-live and not placement-eligible.
- Verified raw claims remain bound only to the exact duplicate Abzan VM-200 evidence mapping.
- Verified every source has an allowed `source_role` value: `claim-bearing`, `shaping-only`, or `support-only`.
- Verified raw claims reference only `claim-bearing` sources and that claim evidence rows are covered by those source references.
- Recorded the review result and caveats in the VM-201 handoff.

## Non-Goals Preserved

- Did not edit `data/raw-factions/abzan/`.
- Did not edit `docs/research/abzan/`.
- Did not edit `docs/architecture/colors/abzan/`.
- Did not edit builders, generated artifacts, schemas, placement fixtures, route maps, browser bundles, runtime code, Home, Maze, Supabase, or tests.
- Did not add `abzan`, `ABZAN`, `WBG`, or W/B/G color-order permutations to `RAW_TO_KEY`, identity registries, generated placement files, route maps, Commander dossier runtime, Archscry presentation runtime, or live-entry lists.
- Did not run formatters, fixers, generators, builders, `npm test`, or `npm run build:factions`.

## Review Result

Status: `review-approved-for-future-promotion-planning`

This is a source-packet review result only. It does not approve Abzan for runtime promotion, placement eligibility, generated data, Home preview, Maze, routing, fixtures, schema, Supabase, builder maps, aliases, or app integration.

## Acceptance Evidence

- Exactly five expected JSON files exist and parse.
- Top-level packet shape matches the accepted Jund/Naya raw-packet family.
- `abzan.claims.json` has exactly 10 raw claims.
- Raw claim IDs are `abzan_claim_0001` through `abzan_claim_0010`.
- Raw claim evidence mapping matches duplicate Abzan VM-200 exactly:
  - `abzan_claim_0001` -> `ABZAN-EVID-001`
  - `abzan_claim_0002` -> `ABZAN-EVID-002`, `ABZAN-EVID-003`
  - `abzan_claim_0003` -> `ABZAN-EVID-004`, `ABZAN-EVID-005`, `ABZAN-EVID-006`
  - `abzan_claim_0004` -> `ABZAN-EVID-007`, `ABZAN-EVID-008`, `ABZAN-EVID-009`
  - `abzan_claim_0005` -> `ABZAN-EVID-010`, `ABZAN-EVID-011`, `ABZAN-EVID-012`, `ABZAN-EVID-013`
  - `abzan_claim_0006` -> `ABZAN-EVID-014`, `ABZAN-EVID-016`, `ABZAN-EVID-017`, `ABZAN-EVID-018`, `ABZAN-EVID-019`
  - `abzan_claim_0007` -> `ABZAN-EVID-015`, `ABZAN-EVID-020`, `ABZAN-EVID-021`
  - `abzan_claim_0008` -> `ABZAN-EVID-022`, `ABZAN-EVID-023`
  - `abzan_claim_0009` -> `ABZAN-EVID-024`, `ABZAN-EVID-025`
  - `abzan_claim_0010` -> `ABZAN-EVID-026`, `ABZAN-EVID-029`, `ABZAN-EVID-031`
- All raw claim evidence rows exist in `docs/research/abzan/abzan-evidence-ledger.md`.
- Raw claim source IDs resolve against `abzan.sources.json`.
- Raw claim sources are all `claim-bearing`.
- Source references cover every evidence row cited by their claims.
- Disallowed support-only, manual-fill, Commander/operator, seed, source-material, architecture, and shaping-only rows do not become raw-claim evidence.
- Profile and placement claim references are subsets of the 10 raw claim IDs.
- `placement_axes` is `[]`.
- Review-gated fields remain non-live:
  - `runtime_status: source_authored_review_gated`
  - `placement_status: not_placement_eligible`
  - `preview_eligible: false`
  - `raw_packet_status: source_authored_review_gated`
  - `review_gated: true`
  - `placement_eligible: false`
  - `live_pilot: false`

## Caveats

- The repository remains dirty from prior Abzan/Temur work. VM-201 used scoped validation, scoped diffs, and before/after raw-packet hashes rather than assuming a clean worktree.
- `data/raw-factions/abzan/` is untracked in the current worktree, so VM-201 used hashes to prove the raw packet was not edited during review.
- During final status comparison, unrelated Temur lane drift appeared: the VM-206 untracked card appeared under `docs/kanban/in-progress/` instead of the baseline `docs/kanban/backlog/` path, and `data/raw-factions/temur/` appeared as a new untracked raw packet directory. VM-201 did not edit, move, stage, format, normalize, or delete those paths.
- Existing runtime/generated files already contain some Abzan wording as false-positive or strategy texture from prior work. VM-201 confirmed there is no tracked diff to runtime/generated/schema/route/Home/Maze/Supabase/fixture/builder/test paths.
- VM-201 did not repair, reshape, reformat, or promote the duplicate Abzan VM-200 packet. Any later correction must be handled by a separate explicit repair card.
