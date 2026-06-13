# VM-243 - Yore Non-Live Raw Packet

ID: VM-243
Title: Yore Non-Live Raw Packet
Status: done
Reservation State: Complete
Type: Data / Raw Faction
Area: Four-Color, Yore, Raw Data
Priority: high
Created: 2026-05-31

## Summary

Created the Yore source-grounded, review-gated, non-live raw packet from the VM-240 claim-bearing evidence floor.

## Scope Completed

- Author exactly five review-gated raw JSON files under `data/raw-factions/yore/`.
- Use only approved VM-240 claim-bearing evidence rows for raw claims.
- Keep `YORE` future-only and keep `WUBR` plus permutations metadata/query-only.
- Stop before review, runtime, generated artifacts, builders, routes, Maze, Home, Supabase, placement model changes, or public aliases.
- Treat VM-241/VM-242 architecture, Commander JSONL, seed HTML, user-added source-material, manual-fill rows, and discovery-only files as non-claim-bearing.

## Explicit Non-Goals

- Do not promote Yore live.
- Do not hand-edit generated outputs.
- Do not bundle later Yore lane work into VM-243.
- Do not edit `docs/research/yore/`.
- Do not edit `docs/architecture/colors/yore/`.
- Do not classify support-only, shaping-only, discovery-only, architecture, Commander, seed, or manual-fill materials as claim-bearing.

## Dependencies

- Depends on VM-240 through VM-242 completion.

## Acceptance Criteria

- [x] Exactly five Yore raw JSON files are authored.
- [x] Raw packet boundaries preserve `YORE` as non-live and `WUBR` as metadata/query-only.
- [x] No review gate or runtime promotion work is bundled into VM-243.
- [x] Raw claims cite only approved VM-240 claim-bearing evidence rows.
- [x] Architecture/support/discovery/manual-fill material is excluded from raw-claim proof.

## Files Changed

- `data/raw-factions/yore/yore.sources.json`
- `data/raw-factions/yore/yore.claims.json`
- `data/raw-factions/yore/yore.profile.json`
- `data/raw-factions/yore/yore.placement.json`
- `data/raw-factions/yore/yore.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-243-yore-non-live-raw-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-02-1622-codex-vm243-yore-non-live-raw-packet.md`

## Tests Run

- AGENTS pre-flight review against handoff index, VM-240/VM-241/VM-242 handoffs, board, VM-243 card, Yore evidence/source ledgers, and raw packet precedents.
- Exact five-file set check under `data/raw-factions/yore/`.
- JSON parse check for all five Yore raw files.
- Top-level JSON shape comparison against Jeskai raw packet precedent.
- Schema/version/faction field validation across all five files.
- Claim ID/count validation for `yore_claim_0001` through `yore_claim_0005`.
- Evidence-row resolver against `docs/research/yore/yore-evidence-ledger.md`.
- Allowed-evidence-row validation limited to `YORE-EVID-001`, `YORE-EVID-002`, `YORE-EVID-003`, `YORE-EVID-004`, `YORE-EVID-005`, and `YORE-EVID-010`.
- Source-role resolver proving all claim source IDs point to `claim-bearing` source records.
- Support/manual/synthesis/discovery exclusion scan for raw claims.
- Non-live/review-gated placement flag validation.
- Overclaim scan for official-faction/name, Cult of Yore, Breya, cEDH, seed HTML, runtime/public alias, placement-ready, preview-ready, and live risks; matches were negative guardrails only.
- Scoped diff guard against Yore research, Yore architecture, runtime, generated, schemas, Maze, route, Home, Supabase, builder, and placement-model files.
- Scoped trailing-whitespace and ASCII checks for Yore raw JSON files.
- WUBR permutation metadata-query-only list validation for all 24 uppercase forms plus lowercase forms.
- Scoped `git diff --check` on tracked VM-243 Kanban paths; only Git line-ending warning on `docs/kanban/board.md`.

## Not Touched

- `docs/research/yore/`
- `docs/architecture/colors/yore/`
- Runtime files
- Generated artifacts
- Schemas
- Builders
- Maze files
- Route CSS/JS
- Home preview
- Supabase files
- Placement model files
- Public aliases
- Unrelated Glint, Dune, Ink, Witch, and pre-existing dirty worktree changes

## Follow-Up

- VM-244 should review the raw packet before any promotion planning.
- Keep `YORE` non-live and WUBR/permutations metadata-query-only until VM-244 approval and a separate VM-245 promotion pass.
- Do not convert support-only Breya, artifact, recursion, cEDH, seed, architecture, or manual-fill material into raw claims without a new evidence pass.
