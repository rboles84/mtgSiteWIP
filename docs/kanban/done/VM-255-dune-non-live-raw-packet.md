# VM-255 - Dune Non-Live Raw Packet

ID: VM-255
Title: Dune Non-Live Raw Packet
Status: done
Reservation State: Complete
Type: Data / Raw Faction
Area: Four-Color, Dune, Raw Data
Priority: high
Created: 2026-05-31
Completed: 2026-06-03

## Summary

Created the Dune source-grounded, review-gated, non-live raw packet from the VM-252 claim-bearing evidence floor.

## Scope Completed

- Author exactly five review-gated raw JSON files under `data/raw-factions/dune/`.
- Use only approved VM-252 claim-bearing evidence rows for raw claims.
- Keep `DUNE` future-only and keep `BRGW` plus permutations metadata/query-only.
- Preserve the naming guardrail that keeps `Aggression` as paired-framing Commander 2016 support text only, not a public alias or exclusive official name.
- Stop before review, runtime, generated artifacts, builders, routes, Maze, Home, Supabase, placement model changes, or public aliases.
- Treat VM-253 and VM-254 architecture, Commander and precon support rows, the discovery HTML draft, and manual-fill rows as non-claim-bearing.

## Explicit Non-Goals

- Do not promote Dune live.
- Do not hand-edit generated outputs.
- Do not bundle later Dune lane work into VM-255.
- Do not edit `docs/research/dune/`.
- Do not edit `docs/architecture/colors/dune/`.
- Do not classify support-only, shaping-only, discovery-only, architecture, Commander, precon, or manual-fill materials as claim-bearing.

## Dependencies

- Depends on VM-252 through VM-254 completion.

## Acceptance Criteria

- [x] Exactly five Dune raw JSON files are authored.
- [x] Raw packet boundaries preserve `DUNE` as non-live and `BRGW` as metadata/query-only.
- [x] No review gate or runtime promotion work is bundled into VM-255.
- [x] Raw claims cite only approved VM-252 claim-bearing evidence rows.
- [x] Architecture, support, discovery, and manual-fill material is excluded from raw-claim proof.

## Files Changed

- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-255-dune-non-live-raw-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-1700-codex-vm255-dune-non-live-raw-packet.md`

## Tests Run

- AGENTS pre-flight review against handoff index, the four-color reservation handoff, VM-252/VM-253/VM-254 Dune handoffs, VM-243/VM-249 raw packet precedents, board, VM-255 card, Dune packet, Dune docs, and Yore/Glint raw packet files.
- Exact five-file set check under `data/raw-factions/dune/`.
- JSON parse check for all five Dune raw files.
- Top-level JSON shape comparison against the Yore VM-243 and Glint VM-249 raw packet contract.
- Schema/version/faction/date field validation across all five files.
- Claim ID/count validation for `dune_claim_0001` through `dune_claim_0005`.
- Claim-to-evidence mapping validation for the required five-claim matrix.
- Evidence-row resolver against `docs/research/dune/dune-evidence-ledger.md`.
- Allowed-evidence-row validation limited to `DUNE-EVID-001`, `DUNE-EVID-002`, `DUNE-EVID-003`, `DUNE-EVID-004`, `DUNE-EVID-007`, and `DUNE-EVID-010`.
- `DUNE-EVID-010` usage validation limited to lifecycle and naming claims only.
- Source-role resolver proving all claim source IDs point to `claim-bearing` source records.
- Support/manual/synthesis/discovery/architecture exclusion scan for raw claims.
- Non-live/review-gated placement flag validation.
- BRGW permutation metadata-query-only list validation for all 24 uppercase forms plus lowercase one-to-one derivations.
- Dune research-packet hash validation showing `docs/research/dune/` remained unchanged, including `dune-brood-research-packet.html`.
- Scoped overclaim scan for official-name/faction drift, Nephilim-as-institution drift, Commander-as-lore drift, public alias leakage, and promotion-ready language.
- Scoped trailing-whitespace checks for new Dune raw JSON and bookkeeping files.
- Scoped `git diff --check` on tracked VM-255 bookkeeping files.

## Not Touched

- `docs/research/dune/`
- `docs/architecture/colors/dune/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime files
- Generated artifacts
- Maze files
- Route CSS/JS
- Home preview
- Supabase files
- Unrelated dirty worktree changes

## Follow-Up

- VM-256 should review the raw packet before any promotion planning.
- Keep `DUNE` non-live and `BRGW`/permutations metadata-query-only until VM-256 approval and a separate VM-257 promotion pass.
- Do not convert Saskia, Open Hostility, Commander/precon texture, architecture prose, or the discovery HTML draft into raw claims without a new approved evidence pass.
