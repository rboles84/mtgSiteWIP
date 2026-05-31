# VM-181 Naya Source Packet Handoff

## Agent Name

Codex

## Task Requested

Implement the Naya gold-standard onboarding plan's first execution pass only: perform the AGENTS.md pre-flight, normalize unmanaged Naya research into an approved source packet and evidence ledger, preserve seed material under `source-material/`, create/update the Kanban card, test source-packet gates, and write a handoff.

Current repo truth showed VM-176 and VM-177 already assigned to Jund, with the latest Jund handoff documenting VM-178/VM-179 as the next Jund sequence. To avoid card collision, the Naya source-packet pass was implemented as VM-181.

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1754-codex-vm176-jund-source-packet.md`
- `docs/handoffs/2026-05-30-1812-codex-vm177-jund-identity-metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-176-jund-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-177-jund-identity-metaphysics.md`
- `docs/research/naya/source-material/naya-lore-source-packet.unmanaged-vm161-seed.md`
- `docs/research/naya/source-material/naya_deep-research-report.generated-seed.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`
- `docs/research/canon/mark_rosewater_official_three_color/Naya_Searching Within _ MAGIC_ THE GATHERING.md`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`

## Files Changed

- `docs/research/naya/README.md`
- `docs/research/naya/naya-source-ledger.md`
- `docs/research/naya/naya-evidence-ledger.md`
- `docs/research/naya/naya-reliability-audit.md`
- `docs/research/naya/naya-manual-fill.md`
- `docs/research/naya/naya-research-dossier.md`
- `docs/research/naya/naya-lore-source-packet.md`
- `docs/research/naya/source-material/README.md`
- `docs/research/naya/source-material/naya-lore-source-packet.unmanaged-vm161-seed.md` moved from `docs/research/naya/naya-lore-source-packet.md`
- `docs/research/naya/source-material/naya_deep-research-report.generated-seed.md` moved from `docs/research/naya/naya_deep-research-report.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1817-codex-vm181-naya-source-packet.md`

## What Changed

- Moved unmanaged Naya seed files under `source-material/`.
- Created an approved Naya research packet with seven root files.
- Added `NAY-SRC-*`, `NAY-CMD-*`, `NAYA-EVID-*`, and `NAYA-MF-*` rows.
- Bound promoted claims to the official Naya color/design source and canon inventory audit.
- Marked the exact 10 RGW Commander/operator JSONL rows support-only.
- Added hard no-source-laundering, color-code metadata-only, Jund-precedent, and manual-fill guardrails.
- Created and closed the VM-181 Kanban card.
- Updated the handoff index.

## Why It Changed

Naya had unmanaged root seed files with stale VM-161/canonical wording and generated/citation-token drift. VM-181 establishes a reviewable evidence floor before any architecture, raw-faction JSON, generated artifact, or runtime promotion work.

## Decisions Made

- Use VM-181 for Naya source normalization because VM-176/VM-177 are occupied by Jund and current handoff truth reserves VM-178/VM-179 for Jund follow-up.
- Treat `Naya_Searching Within` as the only promoted Naya-specific design/color source in this pass.
- Treat the canon/reference inventory audit as source-path selection evidence, not lore evidence.
- Treat Commander JSONL rows as operator/search support only.
- Treat all seed files as discovery/reference material only.
- Leave detailed Naya geography, social structure, named figures, religion, Progenitus theology, Gahiji origin, creature-culture hierarchy, and post-Phyrexian outcomes as `Manual fill required`.

## Risks / Uncertainties

- The seed packet contains many plausible but unverified Naya lore claims that need future direct source capture before promotion.
- The deep report includes external citation tokens and encoding drift; it is intentionally preserved but quarantined.
- The Commander JSONL contains support rows with possible color-identity or role mismatches; later raw work must validate card facts before use.
- The repo worktree remains dirty from unrelated runtime/data/Supabase/Bant/Esper/Grixis/Jund work. VM-181 did not revert or co-mingle those changes.

## Tests Run

- Verified `docs/research/naya/` root contains the approved seven packet files plus `source-material/`.
- Verified `docs/architecture/colors/naya` does not exist.
- Verified `data/raw-factions/naya` does not exist.
- Scanned approved Naya root files for seed-laundering phrases: no approved-file matches.
- Scanned approved Naya root files for non-ASCII characters: no matches.
- Scanned approved Naya root files for `NAYA-EVID-*`, `Manual fill required`, `Vox Mana synthesis`, `Support-only`, and `Promoted`: passed.
- Counted exact normalized `Green|Red|White` rows in `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`: 10 rows.
- Scanned non-doc runtime/data surfaces for existing `NAYA`/`naya` references and confirmed only pre-existing references surfaced; VM-181 made no runtime/data edits.

## Not Touched

- `docs/architecture/colors/naya/`
- `data/raw-factions/naya/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Generated artifacts
- Schemas
- Maze files
- Route CSS/JS
- Runtime code
- Home preview eligibility

## Follow-Up Recommendations

- Human-review VM-181 before any Naya identity/metaphysics authoring.
- The next Naya pass should be docs-only and must describe Naya as authored/review-gated, not live, placement-eligible, or runtime-visible.
- A future raw-faction packet must trace every raw claim to VM-181 evidence/source rows and must not cite seed files, dossiers, or architecture docs as evidence.
- Do not promote `RGW`, `GRW`, or `WRG` into keys, aliases, routes, labels, or generated public text.

## Next Suggested Agent

Planning Architect or Documentation Steward for a review-gated Naya identity/metaphysics pass after human approval.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/research/naya/README.md`
- `docs/research/naya/naya-source-ledger.md`
- `docs/research/naya/naya-evidence-ledger.md`
- `docs/research/naya/naya-reliability-audit.md`
- `docs/research/naya/naya-manual-fill.md`
- `docs/research/naya/naya-research-dossier.md`
- `docs/research/naya/naya-lore-source-packet.md`
