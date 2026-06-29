# 2026-06-24 20:25 - Codex - VM-420 Docs Bloat Consolidation

## Agent Name

Codex

## Task Requested

Implement the VM-417 docs bloat audit plan, promoting it to the next available VM number if VM-417 was reserved or active, and consolidate only provable duplicate documentation while preserving source authority and reference safety.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-24-1919-codex-vm418-main-promotion.md`
- `docs/handoffs/2026-06-24-1943-codex-vm419-post-promotion-branch-cleanup.md`
- `docs/handoffs/2026-06-14-1832-codex-vm394-pre-push-exposure-gitignore-audit.md`
- `docs/handoffs/2026-05-29-2254-codex-vm170-bant-research-folder-cleanup.md`
- `docs/kanban/done/VM-170-bant-research-folder-cleanup-before-push.md`
- `docs/kanban/done/VM-394-pre-push-exposure-and-gitignore-audit.md`
- Current tracked docs counts, exact duplicate hashes, ignored-pattern inventory, and fixed-string reference scans

## Files Changed

- `docs/analysis/vm-420-docs-bloat-retention-audit.md`
- `docs/analysis/vm-420-consolidation-manifest.md`
- `docs/kanban/done/VM-420-docs-bloat-audit-evidence-consolidation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-24-2025-codex-vm420-docs-bloat-consolidation.md`
- Removed: `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/Alara Shards Lore Dossier Protocol.rtf`
- Removed: `docs/research/ui_research/siteUpgradeInfo_Good.html`

## What Changed

- Promoted the task to VM-420 after confirming VM-417 was referenced as reserved and VM-418/VM-419 were already in use.
- Created and closed the VM-420 Kanban card.
- Added a docs bloat retention audit with before/after counts, exact duplicate groups, tracked files that match current ignore patterns, candidate classifications, and follow-up candidates.
- Added a consolidation manifest/tombstone for the removed files.
- Removed only two byte-identical duplicate artifacts with canonical replacements:
  - duplicate Alara protocol RTF from the Bant cleanup archive; the canonical canon copy remains.
  - duplicate UI HTML from `ui_research`; the canonical webdev copy remains.

## Why It Changed

The repo had a large docs footprint and exact duplicate artifacts, but the guardrails required an evidence-preserving cleanup rather than a broad delete/mirror pass. VM-420 removes obvious duplicate weight while documenting why the larger Markdown/source-drop cleanup needs a separate reconciliation pass.

## Decisions Made

- Use VM-420 consistently for new files/cards/handoffs because VM-417 was reserved and VM-418/VM-419 were taken.
- Remove only byte-identical duplicates whose old paths had no active references outside historical handoffs and the VM-420 manifest.
- Defer Abzan/Jeskai/Mardu/Sultai source-drop Markdown cleanup because active research docs/source ledgers/source crosschecks, and for Abzan/Sultai raw metadata, still cite those preserved seed folders.
- Do not create `docs/research/_archive/vm-420-ui-research/`; no UI prototype move met the active-reference and source-authority threshold.
- Do not zip anything.
- Do not touch raw metadata or generated outputs.

## Risks / Uncertainties

- Markdown count did not decrease. The remaining Markdown duplicate groups are tied to active provenance/source-material records and need a larger source-path reconciliation pass.
- `git ls-files docs/` will continue to show the removed tracked files until deletions are staged; VM-420 reports present working-tree counts for before/after size reduction.
- Git still warns that it cannot access `C:\Users\obake/.config/git/ignore`.

## Tests Run

- `git status --short --branch` before edits.
- `rg -n --fixed-strings "VM-417" .` and `rg -n --fixed-strings "VM-420" .` collision checks.
- Tracked docs count and size summaries before and after removals.
- Exact duplicate SHA-256 grouping before and after removals.
- `git ls-files -ci --exclude-standard` inventory before and after removals.
- `git check-ignore -v --no-index --stdin` against tracked files that match ignore patterns.
- Fixed-string `rg` scans for each removed path after removal.
- Fixed-string VM-number consistency scans for `VM-417`, `vm-417`, `VM-420`, and `vm-420`.
- `git diff --check` - passed with line-ending warnings only on `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.
- `git diff --name-status` - docs-only tracked modifications/deletions.

## Not Touched

- Runtime HTML/CSS/JS
- Generated data
- Raw faction metadata
- Placement model behavior
- MTG lore or Commander facts
- Visual baselines
- `docs/handoffs/` compaction
- `docs/kanban/done/` compaction
- Git history, force-push, BFG, or filter-repo

## Follow-Up Recommendations

- Open a dedicated source-path reconciliation card for Abzan/Jeskai/Mardu/Sultai if the owner wants Markdown duplicate reduction.
- For any future source-drop cleanup, update active source ledgers, packet docs, raw metadata where present, and rebuild generated outputs if raw metadata changes.
- Decide separately whether `docs/research/ui_research/` remains an active design-input folder or should be archive-indexed under a future VM.

## Next Suggested Agent

Documentation Steward, with JSON Cartographer support only if a future pass changes raw metadata source paths.

## Related Kanban Card, Docs, Or Plans

- VM-420
- `docs/analysis/vm-420-docs-bloat-retention-audit.md`
- `docs/analysis/vm-420-consolidation-manifest.md`
- VM-170
- VM-394
- VM-418
- VM-419
