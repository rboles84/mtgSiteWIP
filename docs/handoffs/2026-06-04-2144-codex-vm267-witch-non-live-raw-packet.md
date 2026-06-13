# VM-267 Witch Non-Live Raw Packet Handoff

Agent name: Codex
Task requested: Implement VM-267 as a non-live Witch raw-packet pass from the fixed VM-264 evidence allowlist and bounded VM-265/VM-266 shaping context.
Related Kanban card: `VM-267 - Witch Non-Live Raw Packet`
Status: Complete

## Pre-Flight Summary

Recent related work:

- VM-264 created the approved Witch source packet, evidence ledger, reliability audit, manual-fill queue, and discovery-draft quarantine.
- VM-265 created first-pass Witch identity and metaphysics docs while preserving non-live `WITCH`, canonical metadata/query `GWUB`, support-source-only `WUBG`, and support-only `Growth` / Atraxa / `Breed Lethality`.
- VM-266 filled the Witch docs parity layer and explicitly recommended VM-267 as a separate non-live raw-packet pass.
- VM-261 Ink established the closest current raw-packet precedent: five files, five conservative claims, architecture shaping-only, support rows support-only, quarantine records without `source_id`s, and no runtime/generated work.
- VM-280, VM-281, and VM-283 hardened shared four-color Maze/handoff behavior, but VM-267 remains raw-only and does not touch those surfaces.
- VM-291 recently updated dossier research packet documentation outside the Witch lane.

Current known risks:

- Four-color canon remains thinner than shard and wedge lanes.
- The three preserved Witch drafts are polished and contain ranking, EDHREC-style, house-rule Commander, cEDH, and Phyrexia-collapse claims that can create source-laundering risk.
- Commander support rows use `WUBG` ordering while Vox Mana's Witch metadata direction is `GWUB`, so naming and color-order boundaries must stay explicit.
- Atraxa, `Breed Lethality`, proliferate/counters, and Phyrexian texture can over-expand into naming, lore, popularity, or plane-collapse claims.
- The worktree is broadly dirty across docs, Kanban, runtime, data, generated, and handoff surfaces.

Relevant decisions already made:

- VM-267 is raw-packet-only and must leave VM-268 review and VM-269 promotion untouched.
- `WITCH` remains future/planned and non-live.
- `GWUB` is the canonical Vox Mana metadata/query order; same-color permutations remain metadata/query-only.
- `WUBG` may appear only when echoing support-source order.
- `Growth` is Commander 2016 support/display framing only, not public naming authority.
- Witch-Maw Nephilim remains a historical/card anchor, not a faction or institution.
- Atraxa and `Breed Lethality` remain support-only Commander texture.

Files recently changed:

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `docs/kanban/done/VM-266-witch-docs-parity-fill.md`
- `docs/handoffs/2026-06-04-1652-codex-vm266-witch-docs-parity-fill.md`
- `docs/research/vox_mana_dossier_research_packet.md` via VM-291
- Existing unrelated runtime, data, generated, documentation, and handoff files in the dirty worktree

What should not be touched:

- `docs/research/witch/**`
- `docs/architecture/colors/witch/**`
- `docs/research/canon/**`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze files
- Route CSS/JS
- Supabase files
- Schemas and fixtures
- Identity-hero assets or mapping
- VM-268 and VM-269 files
- Unrelated dirty files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1206-codex-vm264-witch-source-packet.md`
- `docs/handoffs/2026-06-04-1416-codex-vm265-witch-identity-metaphysics.md`
- `docs/handoffs/2026-06-04-1652-codex-vm266-witch-docs-parity-fill.md`
- `docs/handoffs/2026-06-04-0754-codex-vm261-ink-non-live-raw-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-267-witch-non-live-raw-packet.md`
- `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-265-witch-identity-and-metaphysics-docs.md`
- `docs/kanban/done/VM-266-witch-docs-parity-fill.md`
- `docs/research/witch/witch-source-ledger.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/research/witch/witch-manual-fill.md`
- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `data/raw-factions/ink/ink.sources.json`
- `data/raw-factions/ink/ink.claims.json`
- `data/raw-factions/ink/ink.profile.json`
- `data/raw-factions/ink/ink.placement.json`
- `data/raw-factions/ink/ink.changelog.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`

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

## What Changed

- Created the exact five-file Witch raw packet under `data/raw-factions/witch/`.
- Added exactly five conservative raw claims from the fixed VM-264 allowlist.
- Preserved `WITCH` as review-gated and non-live.
- Preserved `GWUB` and all same-color permutations as metadata/query-only.
- Preserved `WUBG` as support-source order only.
- Preserved `Growth`, Atraxa, and `Breed Lethality` as support/display or Commander texture only.
- Listed unmanaged Witch drafts only as quarantine traceability records without source IDs.
- Moved VM-267 from backlog to done and updated the board.
- Added this handoff and indexed it.

## Why It Changed

VM-267 is the next Witch card after VM-264 source, VM-265 core docs, and VM-266 parity docs. The pass creates a source-grounded raw packet for VM-268 review without promoting Witch, touching generated/runtime surfaces, or converting architecture/support/discovery material into raw proof.

## Decisions Made

- Followed the five-file raw packet contract used by Ink VM-261.
- Used only `WITCH-EVID-001`, `WITCH-EVID-002`, `WITCH-EVID-003`, `WITCH-EVID-004`, `WITCH-EVID-005`, `WITCH-EVID-007`, and `WITCH-EVID-010` for raw claims.
- Excluded `WITCH-EVID-006`, `WITCH-EVID-008`, `WITCH-EVID-009`, `WITCH-EVID-011`, all `WITCH-MF-###` rows, VM-265/VM-266 architecture prose, Commander/precon rows, support-only rows, synthesis rows, and unmanaged drafts from raw-claim proof.
- Used `quarantine_id` rather than `source_id` for unmanaged discovery drafts so raw claims cannot cite them.
- Kept `witch.profile.json` and `witch.placement.json` explicitly review-gated and non-live.
- Did not recompute or replace VM-264 discovery-draft hashes.

## Risks / Uncertainties

- Four-color canon remains thin, so raw claims remain intentionally conservative.
- The three unmanaged Witch drafts remain source-laundering risks; this pass quarantines them but does not audit or promote their claims.
- Stronger direct official/product capture for Witch-Maw, Atraxa, `Breed Lethality`, and `Growth` remains deferred.
- The worktree remains broadly dirty from unrelated prior work; VM-267 did not clean or repair unrelated changes.

## Tests Run

- Confirmed current date/time with `Get-Date -Format "yyyy-MM-dd HH:mm"`.
- Confirmed `VM-267` was in backlog and VM-264 through VM-266 were done before editing.
- Confirmed `data/raw-factions/witch/` did not exist before editing.
- Confirmed `docs/architecture/colors/witch/` contained exactly `identity.md` and `metaphysics.md`.
- Validated exact five-file set under `data/raw-factions/witch/`.
- Parsed all five Witch raw JSON files.
- Validated `claim_count: 5` and claim IDs `witch_claim_0001` through `witch_claim_0005`.
- Resolved every cited `WITCH-EVID-###` against `docs/research/witch/witch-evidence-ledger.md`.
- Confirmed every raw-claim `source_id` maps to a `claim-bearing` source record.
- Confirmed no `WITCH-MF`, architecture, Commander/precon, support-only, shaping-only, synthesis-only, manual-fill, or discovery-only source IDs appear in raw claim proof-bearing fields.
- Validated GWUB permutation metadata-query-only coverage.
- Diff-checked `docs/research/witch/**` and `docs/architecture/colors/witch/**`; no tracked diffs were produced by VM-267.
- Ran scoped overclaim scans for official-name/faction drift, Growth-as-public-alias drift, Witch-Maw institution drift, Commander-as-lore drift, discovery-draft evidence drift, review-approved/self-approval language, and promotion-ready language.
- Ran scoped trailing-whitespace and JSON formatting checks on new raw JSON and bookkeeping files.
- Ran scoped `git diff --check` on tracked VM-267 bookkeeping files.
- Skipped `npm test` and `npm run test:parser` because VM-267 touched no runtime/generated/shared structured-data contract surfaces.

## Not Touched

- `docs/research/witch/**`
- `docs/architecture/colors/witch/**`
- `docs/research/canon/**`
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
- VM-268 should verify raw packet hashes, source roles, excluded materials, non-live status, and metadata-query-only permutations.
- Preserve `WITCH` as non-live until VM-268 approval and an explicit VM-269 promotion pass.
- Keep `Growth`, Atraxa, `Breed Lethality`, `GWUB`, `WUBG`, and every same-color permutation out of public naming authority.

## Next Suggested Agent

JSON Cartographer / Test Strategist for VM-268 Witch review gate.
