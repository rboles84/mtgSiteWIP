# VM-267 - Witch Non-Live Raw Packet

ID: VM-267
Title: Witch Non-Live Raw Packet
Status: done
Reservation State: Complete
Type: Data / Raw Faction
Area: Four-Color, Witch, Raw Data
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Created the review-gated, non-live Witch raw packet under `data/raw-factions/witch/` from the fixed VM-264 evidence allowlist while preserving VM-265 and VM-266 architecture as shaping-only and stopping before review, runtime, generated artifacts, Maze, routes, Home preview, Supabase, schemas, or VM-268/VM-269 work.

## Scope Completed

- Authored exactly five review-gated raw JSON files under `data/raw-factions/witch/`.
- Created exactly five conservative raw claims, `witch_claim_0001` through `witch_claim_0005`.
- Used only the fixed VM-264 claim-bearing evidence allowlist for raw proof: `WITCH-EVID-001`, `WITCH-EVID-002`, `WITCH-EVID-003`, `WITCH-EVID-004`, `WITCH-EVID-005`, `WITCH-EVID-007`, and `WITCH-EVID-010`.
- Preserved `WITCH` as future/planned and non-live.
- Preserved `GWUB` and same-color permutations as metadata/query-only.
- Preserved `WUBG` as support-source order only.
- Preserved `Growth`, Atraxa, and `Breed Lethality` as support/display or Commander texture only.
- Preserved the three Witch discovery drafts as quarantine traceability records without `source_id`s.

## Explicit Non-Goals

- Do not review-approve the raw packet.
- Do not promote Witch live.
- Do not hand-edit generated outputs.
- Do not run builders.
- Do not create runtime keys, public aliases, routes, Home preview entries, Maze behavior, Supabase surfaces, schemas, or generated artifacts.
- Do not bundle VM-268 or VM-269 work into VM-267.

## Dependencies

- Depends on VM-264 through VM-266 completion.

## Acceptance Criteria

- [x] A future execution pass authors the non-live Witch raw packet only.
- [x] Raw packet boundaries preserve `WITCH` as non-live and `GWUB` as metadata/query-only.
- [x] No review gate or runtime promotion work is bundled into VM-267.

## Files Changed

- `data/raw-factions/witch/witch.sources.json`
- `data/raw-factions/witch/witch.claims.json`
- `data/raw-factions/witch/witch.profile.json`
- `data/raw-factions/witch/witch.placement.json`
- `data/raw-factions/witch/witch.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-267-witch-non-live-raw-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-2144-codex-vm267-witch-non-live-raw-packet.md`

## Tests Run

- Re-ran AGENTS pre-flight review against the handoff index, VM-264/VM-265/VM-266 Witch handoffs, VM-261 Ink raw packet precedent, the Kanban board, the VM-267 card, Witch research packet, Witch architecture docs, and live/generated guardrail surfaces.
- Confirmed pre-edit state: VM-264, VM-265, and VM-266 done; VM-267 backlog; `data/raw-factions/witch/` absent; `docs/architecture/colors/witch/` contained exactly `identity.md` and `metaphysics.md`.
- Validated exact five-file raw packet set under `data/raw-factions/witch/`.
- Parsed all five Witch raw JSON files.
- Validated `claim_count: 5` and contiguous claim IDs.
- Validated every cited `WITCH-EVID-###` reference against `docs/research/witch/witch-evidence-ledger.md`.
- Confirmed every raw-claim `source_id` maps to a `claim-bearing` source record.
- Confirmed no manual-fill, architecture, support-only, Commander/precon, synthesis-only, or discovery/quarantine source is used as raw proof.
- Validated `placement_axes: []`, `placement_eligible: false`, `preview_eligible: false`, `live_pilot: false`, and `review_gated: true`.
- Ran scoped overclaim and forbidden-scope scans.
- Ran scoped trailing-whitespace checks and scoped `git diff --check`.
- Skipped broad parser/runtime suites because VM-267 touched no shared structured-data contracts, builders, generated outputs, or runtime.

## Not Touched

- `docs/research/witch/**`
- `docs/architecture/colors/witch/**`
- `docs/research/canon/**`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- Runtime files
- Generated artifacts
- Schemas
- Route files
- CSS/JS
- Supabase files
- Maze and Home preview surfaces
- VM-268 and VM-269 cards
- Unrelated dirty files

## Follow-Up Recommendations

- Run VM-268 as a separate review gate before any promotion planning.
- VM-268 should verify raw packet hashes, source roles, excluded materials, non-live status, and metadata/query-only permutations.
- Preserve `WITCH` as non-live until VM-268 approval and an explicit VM-269 promotion pass.
- Keep `Growth`, Atraxa, `Breed Lethality`, `GWUB`, `WUBG`, and every same-color permutation out of public naming authority.

## Next Suggested Agent

JSON Cartographer / Test Strategist for VM-268 Witch review gate.
