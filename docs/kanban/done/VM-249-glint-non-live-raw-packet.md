# VM-249 - Glint Non-Live Raw Packet

ID: VM-249
Title: Glint Non-Live Raw Packet
Status: done
Reservation State: Complete
Type: Data / Raw Faction
Area: Four-Color, Glint, Raw Data
Priority: high
Created: 2026-05-31
Completed: 2026-06-02

## Summary

Created the Glint source-grounded, review-gated, non-live raw packet from the VM-246 claim-bearing evidence floor.

## Scope Completed

- Author exactly five review-gated raw JSON files under `data/raw-factions/glint/`.
- Use only approved VM-246 claim-bearing evidence rows for raw claims.
- Keep `GLINT` future-only and keep `UBRG` plus permutations metadata/query-only.
- Stop before review, runtime, generated artifacts, builders, routes, Maze, Home, Supabase, placement model changes, or public aliases.
- Treat VM-247 and VM-248 architecture, Commander support rows, unmanaged drafts, manual-fill rows, and discovery-only files as non-claim-bearing.

## Explicit Non-Goals

- Do not promote Glint live.
- Do not hand-edit generated outputs.
- Do not bundle later Glint lane work into VM-249.
- Do not edit `docs/research/glint/`.
- Do not edit `docs/architecture/colors/glint/`.
- Do not classify support-only, shaping-only, discovery-only, architecture, Commander, or manual-fill materials as claim-bearing.

## Dependencies

- Depends on VM-246 through VM-248 completion.

## Acceptance Criteria

- [x] Exactly five Glint raw JSON files are authored.
- [x] Raw packet boundaries preserve `GLINT` as non-live and `UBRG` as metadata/query-only.
- [x] No review gate or runtime promotion work is bundled into VM-249.
- [x] Raw claims cite only approved VM-246 claim-bearing evidence rows.
- [x] Architecture, support, discovery, and manual-fill material is excluded from raw-claim proof.

## Files Changed

- `data/raw-factions/glint/glint.sources.json`
- `data/raw-factions/glint/glint.claims.json`
- `data/raw-factions/glint/glint.profile.json`
- `data/raw-factions/glint/glint.placement.json`
- `data/raw-factions/glint/glint.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-249-glint-non-live-raw-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-02-2226-codex-vm249-glint-non-live-raw-packet.md`

## Tests Run

- AGENTS pre-flight review against handoff index, VM-246/VM-247/VM-248/VM-243 handoffs, board, VM-249 card, Glint packet, Glint docs, and Yore raw packet precedent.
- Exact five-file set check under `data/raw-factions/glint/`.
- JSON parse check for all five Glint raw files.
- Top-level JSON shape comparison against the Yore VM-243 raw packet contract.
- Schema/version/faction/date field validation across all five files.
- Claim ID/count validation for `glint_claim_0001` through `glint_claim_0005`.
- Evidence-row resolver against `docs/research/glint/glint-evidence-ledger.md`.
- Allowed-evidence-row validation limited to `GLINT-EVID-001`, `GLINT-EVID-002`, `GLINT-EVID-003`, `GLINT-EVID-004`, `GLINT-EVID-006`, and `GLINT-EVID-010`.
- Source-role resolver proving all claim source IDs point to `claim-bearing` source records.
- Support/manual/synthesis/discovery exclusion scan for raw claims.
- Non-live/review-gated placement flag validation.
- Glint draft SHA-256 validation against the VM-246 recorded unmanaged-file hashes.
- Scoped diff guard against Glint research, Glint architecture, runtime, generated, schemas, Maze, route, Home, Supabase, builder, and placement-model files.
- Scoped trailing-whitespace checks for new Glint raw JSON and bookkeeping files.
- UBRG permutation metadata-query-only list validation for all 24 uppercase forms plus lowercase forms.
- Scoped `git diff --check` on tracked VM-249 bookkeeping files.

## Not Touched

- `docs/research/glint/`
- `docs/architecture/colors/glint/`
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
- Unrelated Yore, Dune, Ink, Witch, and pre-existing dirty worktree changes

## Follow-Up

- VM-250 should review the raw packet before any promotion planning.
- Keep `GLINT` non-live and UBRG/permutations metadata-query-only until VM-250 approval and a separate VM-251 promotion pass.
- Do not convert support-only Yidris, Commander, architecture, unmanaged-draft, or manual-fill material into raw claims without a new evidence pass.
