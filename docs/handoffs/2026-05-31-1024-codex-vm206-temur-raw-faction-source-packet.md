# 2026-05-31 10:24 - Codex - VM-206 Temur Raw-Faction Source Packet

## Agent Name

Codex

## Task Requested

Implement VM-206 by creating Temur Frontier's authored-but-not-live raw-faction source packet under `data/raw-factions/temur/`, using VM-203 evidence rows as raw-claim evidence and VM-204/VM-205 architecture docs only as shaping-only context.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0844-codex-vm203-temur-source-packet.md`
- `docs/handoffs/2026-05-31-0950-codex-vm205-temur-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-0953-codex-vm200-abzan-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-206-temur-frontier-raw-faction-source-packet.md`
- `docs/research/temur/temur-evidence-ledger.md`
- `docs/research/temur/temur-source-ledger.md`
- `docs/research/temur/temur-manual-fill.md`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.changelog.json`

## Files Changed

- `data/raw-factions/temur/temur.sources.json`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/raw-factions/temur/temur.changelog.json`
- `docs/kanban/done/VM-206-temur-frontier-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-1024-codex-vm206-temur-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added five Temur raw-faction JSON files matching the Abzan source-only packet top-level shape.
- Created exactly 10 contiguous Temur raw claims with IDs `temur_claim_0001` through `temur_claim_0010`.
- Bound raw claims only to claim-bearing `TEMUR-EVID-###` rows.
- Classified source records as `claim-bearing`, `shaping-only`, or `support-only`.
- Included VM-204 and VM-205 Temur architecture docs only as `shaping-only` source records.
- Kept Commander/operator rows, manual-fill rows, seed files, generated HTML, direct `TEMUR-SRC-###` rows, support-only evidence rows, and architecture prose out of raw-claim evidence.
- Left `placement_axes` empty.
- Set non-live/review-gated status values: `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, and `live_pilot: false`.
- Moved VM-206 from backlog to in progress, then to done after validation.

## Ten Claim Themes

- `temur_claim_0001`: Green-centered Temur wedge identity using `GUR` as color-direction metadata only.
- `temur_claim_0002`: savagery, inner strength, instinct, impulse, action, toughness, and mental fortitude.
- `temur_claim_0003`: Green, Blue, and Red role boundaries inside Temur.
- `temur_claim_0004`: Khans-era Qal Sisma survival, self-sufficiency, nomadic family groups, and defense against intrusion.
- `temur_claim_0005`: Khans-era whisperers, frozen ancestors, Wide Whisper, elemental memory, and magic floor.
- `temur_claim_0006`: Fate Reforged and Yasova-era bridge material with Atarka pressure as era-specific transition context.
- `temur_claim_0007`: Atarka Clan as suppression and contrast, not Temur Frontier continuity.
- `temur_claim_0008`: modern Dragonstorm-era Temur reformation, semi-nomadic land-protective identity, leadership, and daily life.
- `temur_claim_0009`: modern Dragonstorm-era Endless Song, elemental magic, dragonstorm/dragon relationship, and geography.
- `temur_claim_0010`: metadata and false-positive boundary for generic `GUR`, Commander products, seed files, generated HTML, Atarka continuity, Dragonstorm backfill, and non-live status.

## Why It Changed

VM-203 created the Temur source/evidence/manual-fill airlock. VM-204 and VM-205 created docs-only architecture and parity context. VM-206 creates the next source-data airlock: authored raw JSON that VM-207 can review without wiring Temur, GUR, or any color-order permutation into runtime, generated, placement, builder, fixture, route, Home, Maze, schema, or Supabase surfaces.

## Decisions Made

- Used the duplicate Abzan VM-200 raw source-only packet as structural precedent only.
- Preserved the established five-file shape and top-level key pattern.
- Used only `TEMUR-EVID-001` through `TEMUR-EVID-026`, plus `TEMUR-EVID-029` and `TEMUR-EVID-031`, as raw-claim evidence rows.
- Excluded `TEMUR-EVID-027`, `TEMUR-EVID-028`, and `TEMUR-EVID-030` from raw claims because they are support-only or Vox Mana synthesis.
- Excluded all `TEMUR-MF-###`, `TEMUR-CMD-###`, and `TEMUR-SRC-###` identifiers from raw-claim evidence.
- Treated `docs/research/temur/temur-manual-fill.md` as authoritative for the `TEMUR-MF-007` / `TEMUR-MF-008` discrepancy, while making no research-file edits.
- Kept VM-204/VM-205 architecture docs as shaping-only source records and out of claim evidence.
- Kept `temur_claim_0008` and `temur_claim_0009` explicitly timeline-labeled as modern Dragonstorm-era Temur.
- Kept `GUR` metadata/query-only.
- Recorded VM-206 as source-authored, review-gated, non-live, and generated from no runtime builder.

## Source-Role Policy

- Raw claims may cite only sources whose `source_role` is `claim-bearing`.
- Architecture docs, research dossiers, reliability audits, lore packets, source-selection audits, manual-fill queues, Commander/operator data, Scryfall card data, seed artifacts, and generated reports may not serve as raw-claim evidence in VM-206.
- Architecture docs appear only in `temur.sources.json` with `source_role: shaping-only`.
- Commander/operator material appears only as support-only vocabulary and does not prove Temur canon, setting, Commander legality, or placement readiness.

## Support-Only Exclusions

- `TEMUR-CMD-001` through `TEMUR-CMD-007`
- `TEMUR-EVID-027`
- `TEMUR-EVID-028`
- `TEMUR-EVID-030`
- `TEMUR-MF-001` through `TEMUR-MF-008`
- Direct `TEMUR-SRC-###` citations
- Source-material seed files
- Generated HTML seed artifact
- VM-204/VM-205 architecture prose as claim evidence
- Local Scryfall card data without claim-by-claim extraction

## Risks / Uncertainties

- The worktree was already broadly dirty/untracked before VM-206, including Abzan raw files, Temur architecture docs, Temur research files, and prior handoffs/cards.
- A separate Abzan VM-201 review-gate handoff and board state existed by this VM-206 run; VM-206 preserved it and did not normalize it.
- Claim `temur_claim_0010` mentions Commander products as a boundary because the source-role policy excludes them; it does not cite support-only Commander evidence rows.
- Exact Ferocious/Formidable card facts, Yasova's full arc, exact Endless Song mechanics, detailed modern governance, detailed clan dragon diplomacy, exact modern character biographies, and Commander legality remain deferred.
- VM-206 does not make Temur placement-ready or preview-ready; VM-207 must review this raw packet before any VM-208 controlled promotion planning.

## Tests Run

- `Test-Path data\raw-factions\temur` -> True.
- File-count check confirmed exactly five JSON files under `data/raw-factions/temur/`.
- JSON parse check passed for all five Temur raw JSON files.
- Top-level key comparison against the Abzan source-only raw packet passed for sources, claims, profile, placement, and changelog files.
- Claim-count and ID validation confirmed exactly 10 raw claims with contiguous IDs `temur_claim_0001` through `temur_claim_0010`.
- Evidence validation confirmed every cited `TEMUR-EVID-###` row exists in `docs/research/temur/temur-evidence-ledger.md`.
- Claim-bearing evidence validation confirmed every raw-claim evidence row is listed as claim-bearing in `temur.sources.json`.
- Source-role resolver confirmed every raw-claim source has `source_role: claim-bearing`.
- Manual/CMD/source boundary check found no `TEMUR-MF-###`, `TEMUR-CMD-###`, or `TEMUR-SRC-###` references in raw-claim evidence.
- Support-only/synthesis guard found no `TEMUR-EVID-027`, `TEMUR-EVID-028`, or `TEMUR-EVID-030` in raw claims.
- Architecture guard confirmed Temur architecture docs appear only as shaping-only source records and not in raw claims.
- Placement status check confirmed `placement_axes` is `[]`, `review_gated: true`, `placement_eligible: false`, `live_pilot: false`, and `preview_eligible: false`.
- Raw packet leakage scan found no `RAW_TO_KEY`, `placement_key`, `route`, `home_preview`, `maze`, `supabase`, `live_pilot: true`, `placement_eligible: true`, or `preview_eligible: true` in the five Temur JSON files.
- Promotion-leakage check with `git diff --name-only` showed tracked diffs only in `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`; none of the forbidden research, architecture, identity-layer, builder, generated, runtime, route, schema, or Supabase paths appeared.
- `git diff --check -- docs\kanban\board.md docs\handoffs\HANDOFF_INDEX.md` exited cleanly, with existing LF-to-CRLF warnings on those tracked docs.
- Scoped trailing-whitespace scan passed for `data/raw-factions/temur`, the VM-206 done card, the VM-206 handoff, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md`.
- Final `git status --short` showed expected VM-206 additions (`data/raw-factions/temur/`, `docs/kanban/done/VM-206-temur-frontier-raw-faction-source-packet.md`, and this handoff) plus allowed board/index modifications. It also showed the existing broad dirty/untracked baseline, including unrelated Abzan/Temur research and architecture paths plus an Abzan VM-201 review-gate card/handoff that VM-206 did not edit.

Skipped:

- `npm test` and `npm run test:parser`, because VM-206 is documentation/data-source authoring only and no runtime/parser files changed.

## Not Touched

- `docs/research/temur/**`
- `docs/research/temur frontier/**`
- `docs/architecture/colors/temur/**`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- Runtime JS/CSS/HTML
- Generated artifacts
- Schemas
- Supabase files
- Maze files
- Home files
- Route files
- Fixtures
- Tests
- VM-203 through VM-205 completed contents
- VM-207 and VM-208 cards
- Staging or commits

## Follow-Up Recommendations

- VM-207 should review the VM-206 raw packet before any promotion planning.
- VM-207 should re-run the source-role resolver, evidence-row lookup, non-live status checks, and leakage scans before approving or requesting corrections.
- VM-208 should remain blocked until VM-207 explicitly approves the raw packet for controlled runtime promotion planning.

## Next Suggested Agent

JSON Cartographer or Test Strategist for VM-207 Temur Frontier Raw Packet Review Gate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-206-temur-frontier-raw-faction-source-packet.md`
- `docs/kanban/done/VM-205-temur-frontier-docs-parity-fill.md`
- `docs/kanban/done/VM-204-temur-frontier-identity-and-metaphysics.md`
- `docs/kanban/done/VM-203-temur-frontier-source-packet-evidence-ledger.md`
- `docs/research/temur/temur-evidence-ledger.md`
- `docs/research/temur/temur-source-ledger.md`
- `docs/research/temur/temur-manual-fill.md`
- `docs/architecture/colors/temur/identity.md`
- `docs/architecture/colors/temur/metaphysics.md`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/raw-factions/temur/temur.changelog.json`
