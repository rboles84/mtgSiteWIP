# VM-261 - Ink Non-Live Raw Packet

ID: VM-261
Title: Ink Non-Live Raw Packet
Status: done
Reservation State: Complete
Type: Data / Raw Faction
Area: Four-Color, Ink, Raw Data
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Created the Ink source-grounded, review-gated, non-live raw packet from the VM-258 claim-bearing evidence floor.

## Scope Completed

- Authored exactly five review-gated raw JSON files under `data/raw-factions/ink/`.
- Used only approved VM-258 claim-bearing evidence rows for raw claims.
- Kept `INK` future-only and kept `RGWU`, `WURG`, and all same-color permutations metadata/query-only.
- Preserved the naming guardrail that keeps `Altruism` as Commander 2016 display/support framing only, not a public alias, key, canonical name, or independent faction identity.
- Listed unmanaged Ink drafts only as quarantine traceability records without source IDs and without raw-claim citeability.
- Stopped before review, runtime, generated artifacts, builders, routes, Maze, Home, Supabase, placement model changes, public aliases, or promotion work.
- Treated VM-259 and VM-260 architecture, Commander and precon support rows, the discovery drafts, synthesis rows, and manual-fill rows as non-claim-bearing.

## Explicit Non-Goals

- Do not promote Ink live.
- Do not hand-edit generated outputs.
- Do not bundle later Ink lane work into VM-261.
- Do not edit `docs/research/ink/`.
- Do not edit `docs/architecture/colors/ink/`.
- Do not classify support-only, shaping-only, synthesis-only, discovery-only, architecture, Commander, precon, or manual-fill materials as claim-bearing.
- Do not state or imply VM-261 is review-approved; it is only created for VM-262 review.

## Dependencies

- Depends on VM-258 through VM-260 completion.

## Acceptance Criteria

- [x] A future execution pass authors the non-live Ink raw packet only.
- [x] Raw packet boundaries preserve `INK` as non-live and `RGWU` as metadata/query-only.
- [x] No review gate or runtime promotion work is bundled into VM-261.
- [x] Exactly five Ink raw JSON files are authored.
- [x] Raw claims cite only approved VM-258 claim-bearing evidence rows.
- [x] Architecture, support, discovery, synthesis, and manual-fill material is excluded from raw-claim proof.

## Files Changed

- `data/raw-factions/ink/ink.sources.json`
- `data/raw-factions/ink/ink.claims.json`
- `data/raw-factions/ink/ink.profile.json`
- `data/raw-factions/ink/ink.placement.json`
- `data/raw-factions/ink/ink.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-261-ink-non-live-raw-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0754-codex-vm261-ink-non-live-raw-packet.md`

## Tests Run

- AGENTS pre-flight review against handoff index, VM-258/VM-259/VM-260 Ink handoffs, board, VM-261 card, Ink packet, Ink docs, and Yore/Glint/Dune raw packet precedents.
- Confirmed pre-edit state: `VM-261` backlog, VM-258/VM-259/VM-260 done, `data/raw-factions/ink/` absent, and `docs/architecture/colors/ink/` contained exactly `identity.md` and `metaphysics.md`.
- Exact five-file set check under `data/raw-factions/ink/`.
- JSON parse check for all five Ink raw files.
- Top-level JSON shape comparison against Yore, Glint, and Dune raw packet contracts.
- Schema/version/faction/date field validation across all five files.
- Claim ID/count validation for `ink_claim_0001` through `ink_claim_0005`.
- Evidence-row resolver against `docs/research/ink/ink-evidence-ledger.md`.
- Allowed-evidence-row validation limited to `INK-EVID-001`, `INK-EVID-002`, `INK-EVID-003`, `INK-EVID-004`, `INK-EVID-007`, and `INK-EVID-010`.
- Source-role resolver proving all claim source IDs point to `claim-bearing` source records.
- Support/manual/synthesis/discovery/architecture exclusion scan for raw claims.
- Non-live/review-gated placement flag validation.
- RGWU permutation metadata-query-only list validation for all 24 uppercase forms plus lowercase one-to-one derivations.
- Scoped diff guards against Ink research, Ink architecture, runtime, generated, schemas, Maze, route, Home, Supabase, builder, and placement-model files.
- Scoped overclaim scan for official-name/faction drift, Altruism-as-public-alias drift, Ink-Treader institution drift, Commander-as-lore drift, discovery-draft evidence drift, review-approved/self-approval language, and promotion-ready language.
- Scoped trailing-whitespace and JSON formatting checks for new Ink raw JSON and bookkeeping files.
- Scoped `git diff --check` on tracked VM-261 bookkeeping files; it exited 0 with the repo's existing LF-to-CRLF warnings on touched tracked Markdown files.
- Skipped `npm test` and `npm run test:parser` because VM-261 touched no runtime/generated surfaces.

## Not Touched

- `docs/research/ink/`
- `docs/architecture/colors/ink/`
- `docs/research/canon/**`
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
- VM-262 and VM-263 cards
- Unrelated dirty worktree changes

## Follow-Up

- VM-262 should review the raw packet before any promotion planning.
- Keep `INK` non-live and `RGWU` / `WURG` / permutations metadata-query-only until VM-262 approval and a separate VM-263 promotion pass.
- Do not convert Kynaios, `Stalwart Unity`, `Altruism`, Commander/precon texture, architecture prose, manual-fill rows, synthesis rows, or discovery drafts into raw claims without a new approved evidence pass.
