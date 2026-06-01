# 2026-05-31 18:10 - Codex - VM-212 Sultai Raw-Faction Source Packet

## Agent Name

Codex

## Task Requested

Implement VM-212 only: create Sultai Brood's authored-but-not-live raw-faction source packet under `data/raw-factions/sultai/`, using VM-209 evidence rows as raw-claim evidence and VM-210/VM-211 architecture docs only as shaping-only context.

## Pre-Flight Summary

Recent related work:

- VM-209 created the accepted Sultai source/evidence/manual-fill packet under `docs/research/sultai/`.
- VM-210 created Sultai identity and metaphysics architecture from VM-209 while keeping `SULTAI` non-live and `BGU` metadata/query-only.
- VM-211 added Sultai docs parity, pair-overlap boundaries, wedge separators, Commander anchors, placement guidance, and non-runtime search planning.
- Abzan VM-200 and Temur VM-206 established the five-file raw-packet shape and source-only raw-packet status values.

Current known risks:

- The worktree was already broadly dirty at start, including unrelated tracked runtime/generated/data changes and untracked Abzan, Temur, Mardu, Jeskai, and Sultai docs.
- Existing Abzan and Temur raw packets have later promotion metadata, so VM-212 used their top-level shape while following the original source-only handoff status values.
- Boundary claims needed explicit enforcement so support-only, synthesis-only, manual-fill-only, Commander-only, seed-only, and source-row-only IDs did not enter raw-claim evidence.

Relevant decisions already made:

- `SULTAI` remains source-authored, review-gated, non-live, not placement eligible, and not preview eligible.
- `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms remain metadata/query-only.
- Sultai Brood, Silumgar clan, and modern Dragonstorm-era Sultai remain distinct.
- Commander/operator rows are support-only.
- VM-210 and VM-211 architecture docs are shaping-only and cannot replace `SULTAI-EVID-###` evidence rows.

Files recently changed before this pass:

- Prior Sultai source and architecture docs/cards/handoffs through VM-211.
- Newer Mardu VM-224 and Jeskai VM-229 artifacts were already present in the dirty baseline.
- Pre-existing tracked runtime/generated/data modifications remained dirty and were not touched by VM-212.

What should not be touched:

- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `docs/architecture/colors/sultai/**`
- Abzan raw-faction files
- Temur raw-faction files
- runtime files, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, and Temur files
- VM-213 and VM-214 implementation scope

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1650-codex-vm209-sultai-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-1725-codex-vm210-sultai-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-1744-codex-vm211-sultai-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-0953-codex-vm200-abzan-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1024-codex-vm206-temur-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-212-sultai-brood-raw-faction-source-packet.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-manual-fill.md`
- `docs/architecture/colors/sultai/identity.md`
- `docs/architecture/colors/sultai/metaphysics.md`
- `data/raw-factions/abzan/*.json`
- `data/raw-factions/temur/*.json`

## Files Changed

- `data/raw-factions/sultai/sultai.sources.json`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `data/raw-factions/sultai/sultai.changelog.json`
- `docs/kanban/done/VM-212-sultai-brood-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-1810-codex-vm212-sultai-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added five Sultai raw-faction JSON files matching the Abzan/Temur top-level shape.
- Created exactly 10 contiguous Sultai raw claims with IDs `sultai_claim_0001` through `sultai_claim_0010`.
- Bound raw claims only to promoted Sultai evidence rows plus allowed guardrail/lifecycle rows for boundary claims.
- Classified source records as `claim-bearing`, `shaping-only`, or `support-only`.
- Included VM-210 and VM-211 Sultai architecture docs only as `shaping-only` source records.
- Kept Commander/operator rows, manual-fill rows, seed files, generated HTML, direct `SULTAI-SRC-###` rows, support-only evidence rows, synthesis rows, and architecture prose out of raw-claim evidence.
- Left `placement_axes` empty.
- Set non-live/review-gated status values: `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, and `live_pilot: false`.
- Moved VM-212 from backlog to in progress, then to done after validation.

## Ten Claim Themes

- `sultai_claim_0001`: Black-Green-Blue Sultai Brood wedge identity using `BGU` as color-direction metadata only and keeping `SULTAI` non-live.
- `sultai_claim_0002`: Sultai ruthlessness as doing what is needed to get what one wants.
- `sultai_claim_0003`: Sultai design tools: hand/library pressure, destruction, theft/redirect, costs, graveyard return, resource denial, and using the dead.
- `sultai_claim_0004`: Khans-era Sultai dragon ruthlessness, fang symbol, and wealth through exploitation of people and land.
- `sultai_claim_0005`: Khans-era necromancy, sibsig labor, rakshasa pacts, naga hierarchy, roles, and magic practices.
- `sultai_claim_0006`: Queen Sidisi and Khans-era Sultai locations as narrow named-figure/geography floor.
- `sultai_claim_0007`: Fate Reforged, Tasigur, and Khanfall transition context without full biography.
- `sultai_claim_0008`: Silumgar clan as Dragons-era boundary and contrast, not Sultai Brood continuity.
- `sultai_claim_0009`: modern Dragonstorm-era Sultai as timeline-labeled revival, governance, daily life, belief, magic, dragonstorm, and geography context.
- `sultai_claim_0010`: metadata and false-positive boundary for generic `BGU`, Silumgar continuity, Dragonstorm backfill, color-philosophy proof, seed files, Commander products, and non-live status.

## Why It Changed

VM-209 created the Sultai source/evidence airlock. VM-210 and VM-211 created docs-only architecture and parity context. VM-212 creates the next source-data airlock: authored raw JSON that VM-213 can review without wiring Sultai, BGU, or any color-order permutation into runtime, generated, placement, builder, fixture, route, Home, Maze, schema, or Supabase surfaces.

## Decisions Made

- Preserved the established five-file raw packet shape and top-level key pattern.
- Used `sultai_claim_0001`-style raw claim IDs to match the accepted raw packet family.
- Kept `SULTAI-EVID-###` rows as evidence references only.
- Used only claim-bearing sources in raw claims.
- Used guardrail rows only for boundary, false-positive, source-role, or non-live lifecycle claims.
- Excluded `SULTAI-EVID-031`, `SULTAI-EVID-032`, and `SULTAI-EVID-035` from raw claims because they are support-only or Vox Mana synthesis.
- Excluded all `SULTAI-MF-###`, `SULTAI-CMD-###`, and `SULTAI-SRC-###` identifiers from raw-claim evidence.
- Kept VM-210/VM-211 architecture docs as shaping-only source records and out of claim evidence.
- Kept `sultai_claim_0009` explicitly timeline-labeled as modern Dragonstorm-era Sultai.
- Kept `BGU` metadata/query-only.
- Recorded VM-212 as source-authored, review-gated, non-live, and generated from no runtime builder.

## Source-Role Policy

- Raw claims may cite only sources whose `source_role` is `claim-bearing`.
- Boundary claims may use allowed VM-209 guardrail/lifecycle evidence rows only when the claim is itself a boundary, false-positive, source-role, or non-live lifecycle claim.
- Architecture docs, research dossiers, reliability audits, lore packets, source-selection audits, manual-fill queues, Commander/operator data, Scryfall card data, seed artifacts, and generated reports may not serve as raw-claim evidence in VM-212.
- Architecture docs appear only in `sultai.sources.json` with `source_role: shaping-only`.
- Commander/operator material appears only as support-only vocabulary and does not prove Sultai canon, setting, Commander legality, or placement readiness.

## Support-Only Exclusions

- `SULTAI-CMD-001` through `SULTAI-CMD-006`
- `SULTAI-EVID-031`
- `SULTAI-EVID-032`
- `SULTAI-EVID-035`
- `SULTAI-MF-001` through `SULTAI-MF-010`
- Direct `SULTAI-SRC-###` citations
- Source-material seed files
- Generated HTML or generated reports
- VM-210/VM-211 architecture prose as claim evidence
- Local Scryfall card data without claim-by-claim extraction

## Risks / Uncertainties

- The worktree was already broadly dirty/untracked before VM-212, including runtime/generated tracked files and Abzan/Temur/Mardu/Jeskai/Sultai docs and raw folders.
- Current Abzan and Temur raw packet files have later promotion metadata; VM-212 used them for shape only and followed original raw-packet handoff status values for source-only state.
- Exact delve/exploit card facts, full Sidisi/Tasigur biographies, detailed named figures, exact Dragonstorm chronology, and Commander legality remain deferred.
- VM-212 does not make Sultai placement-ready or preview-ready; VM-213 must review this raw packet before any VM-214 controlled promotion planning.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured starting and ending status. Ending status still includes the broad pre-existing dirty runtime/generated/data/docs work, plus this pass's `data/raw-factions/sultai/`, VM-212 card, board, handoff, and handoff-index updates. Concurrent board state also now shows Jeskai VM-230 in progress and Mardu VM-225 done; VM-212 preserved those later board facts.
- `Test-Path data\raw-factions\sultai` before implementation returned `False`.
- Evidence stop-condition script verified every planned `SULTAI-EVID-###` row exists and is either promoted evidence or an allowed guardrail/lifecycle row for boundary claims. It rejected no rows.
- Shape discovery confirmed the Abzan/Temur five-file top-level keys for sources, claims, profile, placement, and changelog.
- File-set and JSON parse check confirmed exactly five Sultai raw JSON files:
  - `sultai.changelog.json`
  - `sultai.claims.json`
  - `sultai.placement.json`
  - `sultai.profile.json`
  - `sultai.sources.json`
- Top-level key comparison against the Temur packet passed for all five files.
- Claim-count and ID validation confirmed exactly 10 raw claims with contiguous IDs `sultai_claim_0001` through `sultai_claim_0010`.
- Non-live status check confirmed `runtime_status=source_authored_review_gated`, `placement_status=not_placement_eligible`, `preview_eligible=false`, `placement_axes=[]`, `review_gated=true`, `placement_eligible=false`, and `live_pilot=false`.
- Evidence-row policy validation confirmed every cited `SULTAI-EVID-###` row exists in the VM-209 evidence ledger; support-only and Vox Mana synthesis rows are absent; guardrail rows are used only in allowed boundary/lifecycle claims.
- Source-role resolver confirmed every raw-claim source has `source_role: claim-bearing`, and all source records use only `claim-bearing`, `shaping-only`, or `support-only`.
- Profile and placement claim-reference validation confirmed all referenced `sultai_claim_####` IDs are subsets of the 10 raw claims.
- Blocked raw-claim token scan confirmed no `SULTAI-EVID-031`, `SULTAI-EVID-032`, `SULTAI-EVID-035`, `SULTAI-CMD-`, `SULTAI-MF-`, or `SULTAI-SRC-` tokens appear in `sultai.claims.json`.
- Raw packet leakage scan found no `RAW_TO_KEY`, `placement_key`, `route`, `home_preview`, `maze`, `supabase`, `live_pilot: true`, `placement_eligible: true`, or `preview_eligible: true` in `data/raw-factions/sultai`.
- Scoped forbidden-path diff check for `docs/research/sultai`, `docs/research/sultai brood`, `docs/architecture/colors/sultai`, `data/raw-factions/abzan`, and `data/raw-factions/temur` produced no output.
- Board check confirmed VM-212 is Done and VM-213/VM-214 remain Backlog. The board also reflects concurrent Jeskai/Mardu lane movement not introduced by VM-212.
- `git diff --check -- docs\kanban\board.md docs\handoffs\HANDOFF_INDEX.md` passed with existing LF-to-CRLF warnings on tracked docs.
- Trailing-whitespace scan passed for `data/raw-factions/sultai`, the VM-212 done card, board, handoff index, and this handoff.
- Final JSON parse check passed after leak-scan wording cleanup.

Skipped:

- `npm test`, because VM-212 is source-authored raw data only and no runtime/parser files were intentionally changed.
- `npm run test:parser`, because parser behavior did not change.
- Builders and generation scripts, per VM-212 hard stop.

## Not Touched

- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `docs/architecture/colors/sultai/**`
- `data/raw-factions/abzan/**`
- `data/raw-factions/temur/**`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- Runtime JS/CSS/HTML
- Generated artifacts
- Schemas
- Supabase files
- Maze files
- Home files
- Route files
- Fixtures
- Tests
- VM-213 and VM-214 implementation
- Staging or commits

## Follow-Up Recommendations

- VM-213 should review the VM-212 raw packet before any promotion planning.
- VM-213 should re-run the source-role resolver, evidence-row lookup, non-live status checks, and leakage scans before approving or requesting corrections.
- VM-214 should remain blocked until VM-213 explicitly approves the raw packet for controlled runtime promotion planning.

## Next Suggested Agent

JSON Cartographer or Test Strategist for VM-213 Sultai Brood Raw Packet Review Gate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-212-sultai-brood-raw-faction-source-packet.md`
- `docs/kanban/done/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/kanban/done/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/kanban/done/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-manual-fill.md`
- `docs/architecture/colors/sultai/identity.md`
- `docs/architecture/colors/sultai/metaphysics.md`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.sources.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `data/raw-factions/sultai/sultai.changelog.json`
