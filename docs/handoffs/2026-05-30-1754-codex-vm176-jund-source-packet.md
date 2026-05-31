# VM-176 Jund Source Packet Handoff

## Agent Name

Codex

## Task Requested

Implement only the first Jund gold-standard onboarding pass: normalize `docs/research/jund/` into a source packet and evidence ledger, preserve unmanaged seed files under `source-material/`, keep claims evidence-bound, and stop before architecture, raw-faction, generated, fixture, runtime, Maze, route, Home preview, or Supabase work.

Current repo truth already had VM-174 and VM-175 assigned to recent work, so this Jund source-packet pass was implemented as VM-176, the next available card.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1746-codex-vm175-bant-esper-dossier-recommendation-parity-audit.md`
- `docs/handoffs/2026-05-30-1728-codex-vm174-grixis-maze-sidebar-identity-repair.md`
- `docs/handoffs/2026-05-30-0851-codex-vm164-grixis-source-packet.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-156-canon-inventory-three-color-reference-audit.md`
- `docs/kanban/done/VM-013-placement-domains-architecture-post-v1-faction-expansion.md`
- `docs/research/PROMPT_lore-source-packet.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`
- `docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md`
- Existing unmanaged Jund seed files now preserved under `docs/research/jund/source-material/`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`

## Files Changed

- `docs/research/jund/README.md`
- `docs/research/jund/jund-source-ledger.md`
- `docs/research/jund/jund-evidence-ledger.md`
- `docs/research/jund/jund-reliability-audit.md`
- `docs/research/jund/jund-manual-fill.md`
- `docs/research/jund/jund-research-dossier.md`
- `docs/research/jund/jund-lore-source-packet.md`
- `docs/research/jund/source-material/README.md`
- `docs/research/jund/source-material/jund-lore-source-packet.unmanaged-vm161-seed.md` (moved from root)
- `docs/research/jund/source-material/Jund_ Deep Lore and Gameplay Analysis.seed.md` (moved from root)
- `docs/research/jund/source-material/jund_research_report.generated-seed.html` (moved from root)
- `docs/kanban/done/VM-176-jund-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1754-codex-vm176-jund-source-packet.md`

## What Changed

- Moved the three unmanaged Jund seed artifacts under `docs/research/jund/source-material/`.
- Created the seven approved root packet files requested for the source/evidence pass.
- Added stable `JUND-EVID-###` evidence rows and separated them from future raw claim IDs such as `jund_claim_0001`.
- Classified seed files as seed/reference material only and generated HTML as structure-only.
- Bound promoted rows to the official Jund Rosewater article and normalized canon audit.
- Kept Alara protocol/codex material, local Scryfall, generated HTML, color-philosophy articles, and exact BRG Commander rows as support-only where applicable.
- Recorded seed defects in `jund-reliability-audit.md`, including stale VM-161 labeling, mojibake risk, external/community citation risk, the "absence of White and Green" typo, generated HTML circularity, and over-promoted claims.
- Added anti-bleed notes for Naya, Grixis, Gruul, Rakdos, Golgari, Witherbloom, Riveteers, and Modern Jund midrange.
- Created and closed the VM-176 Kanban card and updated the board.

## Why It Changed

Jund had unmanaged seed material at the research root and no approved source packet, evidence ledger, architecture docs, or raw-faction source packet. The VM-176 pass establishes a reviewable evidence foundation before any identity/metaphysics, docs parity, raw JSON, or runtime promotion phase.

## Decisions Made

- Use VM-176 because VM-174 and VM-175 are already taken in current repo truth.
- Use `JUND-EVID-###` for evidence rows, not `JUND-###`, to avoid collision with future raw claim IDs.
- Treat `Jund_Following Your Heart` as the only Tier 1 Jund-specific identity source for this pass.
- Cite `docs/analysis/canon-inventory-three-color-reference-audit.md` as the normalized audit path while acknowledging the user-provided canon audit path.
- Treat official mono/two-color articles as color-philosophy support only, not Jund world/story proof.
- Treat exact BRG Commander rows as product/operator support only.
- Leave Jund non-live and do not create `docs/architecture/colors/jund/` or `data/raw-factions/jund/`.

## Risks / Uncertainties

- Detailed Jund geography, ecology, named figures, and Conflux chronology remain `Manual fill required`.
- Local official source captures beyond the Rosewater Jund article may exist in the repo but were not promoted without claim-by-claim review.
- Seed files still contain their original defective content by design; they are preserved, not rewritten.
- The broader worktree was already dirty with unrelated runtime/data/docs changes; those were not reverted or audited for this task.

## Tests Run

- File existence check for all seven approved Jund packet files.
- Root seed-file cleanup check confirming root Jund folder contains only approved docs plus `source-material/`.
- Exact BRG Commander JSONL extraction with normalized color-set equality; returned 6 rows.
- `rg` scans for `JUND-EVID-###`, `Manual fill required`, `Vox Mana synthesis`, `Support-only`, and `Promoted`.
- `rg` scans for generated-HTML structure-only classification and seed defect tracking terms.
- `Test-Path docs/architecture/colors/jund` returned `False`.
- `Test-Path data/raw-factions/jund` returned `False`.
- ASCII check on new approved packet/card/handoff-support files.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/research/jund docs/kanban/board.md docs/kanban/done/VM-176-jund-source-packet-evidence-ledger.md`

## Not Touched

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- generated artifacts
- schemas
- Maze files
- route CSS/JS
- runtime code
- Home preview behavior
- generated data snapshots
- placement fixtures
- route maps
- browser bundles
- test fixture rewrites
- `docs/architecture/colors/jund/`
- `data/raw-factions/jund/`

## Follow-Up Recommendations

- Review VM-176 before starting Jund identity/metaphysics authoring.
- If approved, create a new follow-up card for Jund identity and metaphysics docs using only VM-176 evidence rows.
- Capture stronger official local sources before promoting detailed geography, ecology, named figures, Conflux chronology, or devour-as-total-identity claims.

## Next Suggested Agent

Planning Architect or Documentation Steward for a review-gated Jund identity/metaphysics pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-176-jund-source-packet-evidence-ledger.md`
- `docs/research/jund/README.md`
- `docs/research/jund/jund-evidence-ledger.md`
- `docs/research/jund/jund-reliability-audit.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`
