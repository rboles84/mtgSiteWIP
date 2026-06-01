# 2026-05-31 18:32 - Codex - VM-213 Sultai Raw Packet Review Gate

## Agent Name

Codex

## Task Requested

Implement VM-213 by reviewing the VM-212 Sultai Brood authored-but-not-live raw-faction packet without editing, repairing, formatting, regenerating, building, or promoting it. Record either `review-approved-for-future-promotion-planning` or `repair-needed`.

## Review Result

Status: `review-approved-for-future-promotion-planning`

This is a review-only approval. It means the VM-212 Sultai raw packet is acceptable as a future VM-214 planning input only. It does not make Sultai live, placement-eligible, preview-eligible, routed, generated, visible, or integrated into app surfaces.

VM-214 remains in Backlog. Approval only unblocks future planning.

## Pre-Flight Summary

Recent related work:

- VM-209 created the accepted Sultai source/evidence/manual-fill packet.
- VM-210 created docs-only Sultai identity and metaphysics architecture.
- VM-211 added docs parity, pair-overlap boundaries, wedge separators, support-only Commander anchors, placement guidance, and non-runtime search planning.
- VM-212 created the five-file Sultai raw-faction source packet and kept it non-live.
- Abzan VM-201 and Temur VM-207 provided prior raw packet review-gate precedent.

Current known risks:

- The worktree was already broadly dirty at start, including tracked runtime/generated/data changes and untracked Abzan, Temur, Mardu, Jeskai, and Sultai docs/raw folders.
- `data/raw-factions/sultai/` is untracked in this worktree, so SHA-256 before/after hashes are the primary proof that VM-213 did not mutate raw JSON.
- Current Abzan/Temur raw files may have later promotion metadata, so VM-213 relied on the source-authored raw packet shape recorded in their handoffs and the VM-212 packet structure.

Relevant decisions already made:

- `SULTAI` remains source-authored, review-gated, non-live, not placement eligible, and not preview eligible.
- `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms remain metadata/query-only.
- Sultai Brood, Silumgar clan, and modern Dragonstorm-era Sultai remain distinct.
- Commander/operator rows are support-only.
- VM-210 and VM-211 architecture docs are shaping-only and cannot replace `SULTAI-EVID-###` evidence rows.

What should not be touched:

- `data/raw-factions/sultai/*.json`
- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `docs/architecture/colors/sultai/**`
- runtime files, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, Temur files, Mardu files, and Jeskai files
- VM-214 implementation scope

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1650-codex-vm209-sultai-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-1725-codex-vm210-sultai-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-1744-codex-vm211-sultai-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-1810-codex-vm212-sultai-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1020-codex-vm201-abzan-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1042-codex-vm207-temur-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-213-sultai-brood-raw-packet-review-gate.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `data/raw-factions/sultai/sultai.sources.json`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `data/raw-factions/sultai/sultai.changelog.json`

## Files Changed

- `docs/kanban/done/VM-213-sultai-brood-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-1832-codex-vm213-sultai-raw-packet-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Moved VM-213 from Backlog to In Progress, then to Done after validation.
- Reviewed exactly five Sultai raw JSON files without modifying them.
- Recorded `review-approved-for-future-promotion-planning` in the VM-213 card and this handoff.
- Added before/after hash proof to the VM-213 card and this handoff.
- Left VM-214 in Backlog.
- Updated the handoff index.

## Why It Changed

VM-213 is the review airlock between the VM-212 authored raw packet and any future VM-214 controlled promotion planning. It confirms the raw packet is structurally clean enough to plan from later while preserving the non-live boundary.

## Before / After Hashes

Before and after SHA-256 hashes matched for all five Sultai JSON files:

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `sultai.changelog.json` | `921C1E24450495978C601F02C541694CABA2F7CD5E6D32906E7738B5CAFDF227` | `921C1E24450495978C601F02C541694CABA2F7CD5E6D32906E7738B5CAFDF227` |
| `sultai.claims.json` | `9F5BEBE900EC12497A265E476D6EBC14FA87967859B2E9C9955A92A593244785` | `9F5BEBE900EC12497A265E476D6EBC14FA87967859B2E9C9955A92A593244785` |
| `sultai.placement.json` | `6E8C5A4B83DBBB783B4376B9A0AF2D09E04FDD22E53B7429A79C3DD1BDB65A6C` | `6E8C5A4B83DBBB783B4376B9A0AF2D09E04FDD22E53B7429A79C3DD1BDB65A6C` |
| `sultai.profile.json` | `F823F04D6B6BCCB945C708DFB935E942D0C88641EECFA563C30630FBF1100180` | `F823F04D6B6BCCB945C708DFB935E942D0C88641EECFA563C30630FBF1100180` |
| `sultai.sources.json` | `41B42CF330D7303FC58E11D29520D94FCA55D9C12C8D52794139B8B2F9D207E3` | `41B42CF330D7303FC58E11D29520D94FCA55D9C12C8D52794139B8B2F9D207E3` |

## Evidence Mapping Result

Passed. The authored packet exactly matches the expected VM-213 evidence mapping:

- `sultai_claim_0001` -> `SULTAI-EVID-001`, `SULTAI-EVID-036`
- `sultai_claim_0002` -> `SULTAI-EVID-002`
- `sultai_claim_0003` -> `SULTAI-EVID-003`
- `sultai_claim_0004` -> `SULTAI-EVID-004`
- `sultai_claim_0005` -> `SULTAI-EVID-005`, `SULTAI-EVID-006`, `SULTAI-EVID-007`, `SULTAI-EVID-008`
- `sultai_claim_0006` -> `SULTAI-EVID-009`, `SULTAI-EVID-010`
- `sultai_claim_0007` -> `SULTAI-EVID-011`, `SULTAI-EVID-012`, `SULTAI-EVID-013`, `SULTAI-EVID-019`
- `sultai_claim_0008` -> `SULTAI-EVID-014`, `SULTAI-EVID-015`, `SULTAI-EVID-016`, `SULTAI-EVID-017`, `SULTAI-EVID-018`, `SULTAI-EVID-019`
- `sultai_claim_0009` -> `SULTAI-EVID-020`, `SULTAI-EVID-021`, `SULTAI-EVID-022`, `SULTAI-EVID-023`, `SULTAI-EVID-024`, `SULTAI-EVID-025`, `SULTAI-EVID-026`, `SULTAI-EVID-027`, `SULTAI-EVID-028`, `SULTAI-EVID-029`, `SULTAI-EVID-030`
- `sultai_claim_0010` -> `SULTAI-EVID-001`, `SULTAI-EVID-030`, `SULTAI-EVID-033`, `SULTAI-EVID-034`, `SULTAI-EVID-036`

All cited `SULTAI-EVID-###` rows exist in `docs/research/sultai/sultai-evidence-ledger.md`.

## Source-Role Result

Passed.

- Source roles are limited to `claim-bearing`, `shaping-only`, and `support-only`.
- Every raw-claim source ID resolves.
- Every raw-claim source has `source_role: claim-bearing`.
- VM-210/VM-211 architecture docs appear only as `shaping-only` sources and never in raw claims.
- Commander, Scryfall, and manual-fill material appear only as `support-only`.
- `SULTAI-EVID-031`, `SULTAI-EVID-032`, `SULTAI-EVID-035`, `SULTAI-CMD-###`, `SULTAI-MF-###`, `SULTAI-SRC-###`, seed/source-material paths, generated paths, and architecture paths are absent from raw-claim evidence.

## Non-Live Status Result

Passed.

- `placement_axes: []`
- `runtime_status: source_authored_review_gated`
- `placement_status: not_placement_eligible`
- `preview_eligible: false`
- `review_gated: true`
- `placement_eligible: false`
- `live_pilot: false`

## Leakage Scan Result

Passed. The raw packet leakage scan found no promotion wiring terms such as `RAW_TO_KEY`, `placement_key`, runtime route/Home/Maze/Supabase references, `live_pilot: true`, `placement_eligible: true`, or `preview_eligible: true`.

Promotion-leakage scoped diff review showed no VM-213-introduced raw JSON, Sultai research, Sultai architecture, raw Abzan/Temur, schema, route, Home, Maze, Supabase, Mardu, or Jeskai edits. A broad diff query still reports the pre-existing tracked runtime/generated/data changes that were already present in the starting dirty baseline; VM-213 did not touch them.

## Repair List

No repair list. Validation passed and the packet was approved for future promotion planning.

## Decisions Made

- Approved the VM-212 raw packet for future VM-214 promotion planning input only.
- Did not approve runtime promotion, placement eligibility, preview eligibility, routing, generated data, Home/Maze visibility, schemas, Supabase, fixtures, aliases, lookup keys, or app integration.
- Did not repair, reshape, reformat, regenerate, or rewrite any Sultai raw JSON.
- Did not create a repair card because the review passed.
- Kept `SULTAI` non-live.
- Kept `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms metadata/query-only.
- Kept VM-210/VM-211 architecture docs shaping-only.

## Risks / Uncertainties

- The worktree remains intentionally dirty from prior and concurrent lanes.
- `data/raw-factions/sultai/` is untracked in the current worktree, so before/after hash match is the primary proof that VM-213 did not mutate it.
- Concurrent Mardu lane movement appeared during closeout: the board now shows VM-226 in progress. VM-213 left that card and Mardu files untouched.
- VM-213 approval is planning-only. VM-214 must still define and pass a controlled runtime promotion gate before any live Sultai integration.

## Tests Run

- AGENTS pre-flight review of the handoff index, current board, VM-213 card, VM-212 handoff, VM-209 through VM-211 handoffs, and Abzan/Temur review-gate precedent.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured the dirty baseline before review.
- `Get-FileHash -Algorithm SHA256 data\raw-factions\sultai\*.json` before review for all five Sultai JSON files.
- File-count and exact-file-set check confirmed exactly five JSON files under `data/raw-factions/sultai/`.
- JSON parse check passed for all five target JSON files.
- Top-level key comparison passed against the source-authored raw packet shape.
- Resolver validation passed for source roles, claim count, contiguous claim IDs, exact evidence mapping, ledger row existence, evidence role policy, raw-claim source resolution, architecture shaping-only status, support-only source status, profile claim references, placement claim references, and non-live status fields.
- Raw packet leakage scan passed.
- `Get-FileHash -Algorithm SHA256 data\raw-factions\sultai\*.json` after review matched all five before-review hashes.
- Board check confirmed VM-213 is Done and VM-214 remains Backlog. The board also shows concurrent VM-226 Mardu in progress, outside VM-213 scope.
- `git diff --check -- docs\kanban\board.md docs\handoffs\HANDOFF_INDEX.md` passed, with existing LF-to-CRLF warnings on tracked docs.
- Scoped trailing-whitespace scan passed on the VM-213 card, board, handoff, and handoff index.
- Final `git status --short` was compared against the dirty baseline. VM-213 additions were the allowed done card and this handoff plus allowed board/index edits; the existing broad dirty baseline remains, and concurrent VM-226 Mardu movement appeared outside VM-213 scope.

Skipped:

- `npm test`, because VM-213 is review-only and did not touch runtime contracts.
- `npm run test:parser`, because VM-213 is review-only and did not touch parser behavior.
- Builders and generators, because VM-213 must not generate or promote.
- Formatters and fixers, because VM-213 is review-only.

## Not Touched

- `data/raw-factions/sultai/**`
- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `docs/architecture/colors/sultai/**`
- `data/raw-factions/abzan/**`
- `data/raw-factions/temur/**`
- Runtime JS/CSS/HTML
- Generated artifacts
- Schemas
- Supabase files
- Maze files
- Home files
- Route files
- Fixtures
- Tests
- Mardu files
- Jeskai files
- VM-214 card contents
- Staging or commits

## Follow-Up Recommendations

- VM-214 may be planned next as a controlled runtime promotion card because VM-213 approved the raw packet for future promotion planning.
- VM-214 should start from a fresh dirty-baseline capture, assert exactly one intended public key (`SULTAI`), and verify no `BGU`, `BUG`, `UBG`, `GUB`, or lowercase permutation alias leakage.
- If any correction is desired before VM-214, create an explicit repair card rather than folding repairs into promotion.

## Next Suggested Agent

Planning Architect for VM-214 Sultai Brood Controlled Runtime Promotion planning.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-213-sultai-brood-raw-packet-review-gate.md`
- `docs/kanban/done/VM-212-sultai-brood-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1810-codex-vm212-sultai-raw-faction-source-packet.md`
- `docs/kanban/done/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-1744-codex-vm211-sultai-docs-parity-fill.md`
- `docs/kanban/done/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/handoffs/2026-05-31-1725-codex-vm210-sultai-identity-metaphysics.md`
- `docs/kanban/done/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-1650-codex-vm209-sultai-source-packet-evidence-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `data/raw-factions/sultai/sultai.sources.json`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `data/raw-factions/sultai/sultai.changelog.json`
