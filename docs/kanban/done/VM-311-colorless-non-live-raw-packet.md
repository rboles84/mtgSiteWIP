# VM-311 - Colorless Non-Live Raw Packet

ID: VM-311
Title: Colorless Non-Live Raw Packet
Status: done
Reservation State: Complete
Type: Data / Raw Faction
Area: Colorless, Raw Data
Priority: high
Created: 2026-06-10
Completed: 2026-06-10

## Summary

Created the review-gated, non-live Colorless raw packet under `data/raw-factions/colorless/` from existing VM-308 evidence rows while preserving VM-309 and VM-310 architecture as shaping-only and stopping before review approval, runtime promotion, generated artifacts, schemas, builders, routes, Maze, Home, Supabase, identity-layer edits, image cleanup, or canon relocation work.

## Scope Completed

- Authored exactly five review-gated raw JSON files under `data/raw-factions/colorless/`.
- Created exactly five conservative raw claims, `colorless_claim_0001` through `colorless_claim_0005`.
- Reused existing VM-308 `COLORLESS-*` source, evidence, and manual-fill identifiers only.
- Preserved `COLORLESS` as future/planned and non-live.
- Preserved `placement_eligible: false`, `preview_eligible: false`, `live_pilot: false`, `review_gated: true`, and `placement_axes: []`.
- Kept VM-309/VM-310 architecture docs as shaping context only, not claim-bearing evidence.
- Kept support-only Commander rows, Ugin/Karn lore texture, Phyrexia distinction material, visual material, generated output, and canon relocation state out of raw proof.

## Explicit Non-Goals

- Do not review-approve the raw packet.
- Do not promote Colorless live.
- Do not create runtime keys, route aliases, Home preview entries, Maze behavior, Supabase surfaces, schemas, builders, identity-layer entries, or generated artifacts.
- Do not infer runtime/schema support from `colorless` enum-like strings.
- Do not copy generated placement/profile/context language into raw data.
- Do not create new source IDs, `COLORLESS-EVID-###` IDs, or `COLORLESS-MF-###` IDs.
- Do not stage or normalize `docs/research/canon/colorless/**` relocation deletes.
- Do not inspect, relocate, or clean up `assets/img/identity-hero/colorless.webp`.

## Dependencies

- Depends on VM-308 source packet completion.
- Depends on VM-309 Colorless identity/metaphysics docs completion.
- Depends on VM-310 Colorless docs parity fill completion.

## Acceptance Criteria

- [x] Exactly five Colorless raw JSON files are authored.
- [x] Raw claims cite only existing VM-308 `COLORLESS-EVID-###` rows.
- [x] Manual-fill rows appear only as limitations or deferred work.
- [x] Architecture, support-only, discovery, synthesis, visual, relocation, Commander, and generated material are not used as independent raw proof.
- [x] Colorless remains non-live, review-gated, and not placement eligible.
- [x] No runtime, generated, schema, route, Maze, Home, Supabase, builder, identity-layer, image, research, or canon-relocation files changed.

## Files Changed

- `data/raw-factions/colorless/colorless.sources.json`
- `data/raw-factions/colorless/colorless.claims.json`
- `data/raw-factions/colorless/colorless.profile.json`
- `data/raw-factions/colorless/colorless.placement.json`
- `data/raw-factions/colorless/colorless.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-311-colorless-non-live-raw-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-0646-codex-vm311-colorless-raw-packet.md`

## Tests Run

- Re-ran AGENTS pre-flight review against the handoff index, Kanban board, VM-308/VM-309/VM-310 Colorless cards and handoffs, Colorless research ledgers, VM-267 raw-packet precedent, and target-path status.
- Verified exact five-file raw packet set under `data/raw-factions/colorless/`.
- Parsed all five Colorless raw JSON files.
- Validated `claim_count: 5` and contiguous claim IDs.
- Validated every `COLORLESS-EVID-###` and `COLORLESS-MF-###` reference in the raw packet against `docs/research/colorless/colorless-evidence-ledger.md`.
- Verified non-live flags and `placement_axes: []`.
- Ran scoped overclaim scans for sixth-color framing, generic/colorless conflation, artifact/Colorless collapse, Eldrazi/artifact collapse, Wastes overreach, Commander overreach, Phyrexia collapse, and superiority/mastery over WUBRG.
- Ran scoped forbidden-drift scans for review approval, promotion readiness, runtime keys, generated artifacts, schema changes, builder changes, route aliases, Maze, Home, Supabase, scores, thresholds, and query-builder logic.
- Ran scoped ASCII, trailing-whitespace, and `git diff --check` checks on touched files.
- Skipped `npm.cmd test`, `npm.cmd run test:parser`, and `npm.cmd run test:placement` because VM-311 touched only raw non-live JSON and docs bookkeeping.

## Not Touched

- `docs/research/colorless/**`
- `docs/architecture/colors/colorless/**`
- `docs/architecture/colorless/**`
- `docs/research/canon/colorless/**`
- `assets/img/identity-hero/colorless.webp`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `research/validate-colorless-markdown.mjs`
- `docs/reference/colorless-identity-metaphysics-markdown-schema.md`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Generated artifacts, schemas, Maze files, Home files, route CSS/JS, runtime code

## Follow-Up Recommendations

- VM-312 should review the raw packet before any promotion planning.
- VM-312 should verify raw packet hashes, exact file set, source roles, excluded materials, non-live status, support-only Commander handling, architecture-as-shaping-only handling, and canon relocation non-normalization.
- Preserve `COLORLESS` as non-live until VM-312 approval and a separate VM-313 promotion-planning pass.
- Add separate evidence cards if the team wants official current rules, Wastes rulings, official Eldrazi Unbound product proof, Ugin/Karn lore, Eldrazi titan lore, or artifact-history expansion.

## Next Suggested Agent

Test Strategist / JSON Cartographer for VM-312 Colorless review gate.
