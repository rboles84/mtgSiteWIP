# VM-203 Temur Source Packet Handoff

Agent name: Codex

Task requested: Start VM-203 by correcting the restored unmanaged Temur source-drop folder typo, copying the three restored seed artifacts into an approved Temur source-material packet without changing their contents, and creating a source/evidence/manual-fill airlock before any architecture, raw-faction, runtime, generated, schema, Supabase, Maze, or Home work.

Related Kanban card, docs, or plans: VM-203; VM-203 through VM-208 planning handoff; VM-200 Abzan source packet; VM-201 Tarkir clan source restore.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0817-codex-vm203-208-temur-planning.md`
- `docs/handoffs/2026-05-31-0805-codex-vm201-tarkir-clan-source-restore.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-203-temur-frontier-source-packet-evidence-ledger.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-seed-source-crosscheck.md`
- `docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md`
- `docs/research/canon/source-material/tarkir/story-khanfall.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-2.md`
- `docs/research/canon/source-material/tarkir/story-awakening-the-bear.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `docs/research/temur frontier/Temur Frontier Research Report.md`
- `docs/research/temur frontier/temur-frontier-lore-source-packet.md`
- `docs/research/temur frontier/temur_research_report.html`

## Files Changed

- Renamed `docs/research/temur fontier/` to `docs/research/temur frontier/`
- `docs/research/temur/README.md`
- `docs/research/temur/source-material/README.md`
- `docs/research/temur/source-material/Temur Frontier Research Report.md`
- `docs/research/temur/source-material/temur-frontier-lore-source-packet.md`
- `docs/research/temur/source-material/temur_research_report.html`
- `docs/research/temur/temur-source-ledger.md`
- `docs/research/temur/temur-evidence-ledger.md`
- `docs/research/temur/temur-reliability-audit.md`
- `docs/research/temur/temur-manual-fill.md`
- `docs/research/temur/temur-seed-source-crosscheck.md`
- `docs/research/temur/temur-research-dossier.md`
- `docs/research/temur/temur-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-203-temur-frontier-source-packet-evidence-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0844-codex-vm203-temur-source-packet.md`

## What Changed

- Corrected the unmanaged restored source-drop folder typo from `docs/research/temur fontier/` to `docs/research/temur frontier/`.
- Created the approved `docs/research/temur/` packet.
- Copied the three restored seed artifacts into `docs/research/temur/source-material/` with original filenames and matching SHA-256 hashes.
- Created stable `TEMUR-SRC-###`, `TEMUR-EVID-###`, `TEMUR-CMD-###`, and `TEMUR-MF-###` rows.
- Classified official local captures as claim-bearing, source audits as source-selection support, Commander JSONL as support-only, and seed artifacts as discovery-only.
- Recorded path guards, the typo path, corrected path, copied paths, and copied file hashes in `temur-seed-source-crosscheck.md`.
- Moved VM-203 to done on the Kanban board.

## Why It Changed

VM-203 needed to establish a conservative source-airlock before any Temur identity, architecture, raw-faction, or runtime work. The user also explicitly decided that VM-203 should correct the restored `temur fontier` typo as source-drop hygiene while preserving seed artifact contents.

## Decisions Made

- `docs/research/temur frontier/` is now the corrected unmanaged restored source drop.
- `docs/research/temur/` is the approved VM-203 research packet root.
- The three source-material copies are byte-identical to the corrected source-drop originals.
- Atarka Clan material is contrast/timeline evidence, not Temur Frontier continuity.
- Modern Dragonstorm Temur material is timeline-scoped and must not be read back into Khans-era Temur.
- GUR Commander/operator rows are support-only and not lore proof.
- Seed artifacts are discovery-only and cannot cite themselves.

## Risks / Uncertainties

- The seed artifacts still contain their original internal wording and may include old typo-path references, generated synthesis, uncaptured claims, or encoding artifacts; VM-203 intentionally did not edit them.
- Exact Ferocious/Formidable rules text, card facts, commander legality, and card prevalence remain manual-fill.
- Yasova's full Bolas-manipulation arc and detailed modern Dragonstorm governance need later official capture before use.
- The repo remains in a broader dirty state from prior VM-200/VM-201/VM-203-208 planning work and restored source drops.

## Tests Run

- Before rename path guards:
  - `Test-Path "docs\research\temur fontier"` -> True
  - `Test-Path "docs\research\temur frontier"` -> False
- After rename and packet creation path guards:
  - `Test-Path "docs\research\temur fontier"` -> False
  - `Test-Path "docs\research\temur frontier"` -> True
  - `Test-Path docs\research\temur` -> True
  - `Test-Path docs\architecture\colors\temur` -> False
  - `Test-Path data\raw-factions\temur` -> False
- SHA-256 comparison for the three seed artifacts; all source/copy hashes matched.
- `rg --files docs\research\temur`
- `rg -n "TEMUR-(SRC|EVID|CMD|MF)-[0-9]{3}|Manual fill required|Support-only|Vox Mana synthesis|Atarka|GUR|Dragonstorm" docs\research\temur`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/research/temur docs/kanban/board.md docs/kanban/done/VM-203-temur-frontier-source-packet-evidence-ledger.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-05-31-0844-codex-vm203-temur-source-packet.md`

## Not Touched

- `docs/architecture/colors/temur/**`
- `data/raw-factions/temur/**`
- Runtime JS/CSS/HTML routes
- Generated artifacts
- Schemas
- Supabase files
- Maze behavior
- Home preview entries
- VM-204 through VM-208 card contents

## Follow-Up Recommendations

- VM-204 can use the VM-203 evidence ledger for Temur identity/metaphysics, but should keep timeline labels explicit.
- Before any raw-faction or runtime work, run a separate card-data pass for exact Ferocious/Formidable/card/Commander facts.
- Preserve the corrected unmanaged source drop at `docs/research/temur frontier/` unless a later card explicitly archives or reconciles it.

## Next Suggested Agent

Planning Architect or Documentation Steward for VM-204 Temur identity/metaphysics, using VM-203 as the source gate.
