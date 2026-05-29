# VM-156 - Canon Inventory and Three-Color Reference Audit

ID: VM-156
Title: Canon Inventory and Three-Color Reference Audit
Status: done
Type: Documentation / Research
Area: Canon Research, Documentation
Priority: low
Created: 2026-05-28
Completed: 2026-05-28

## Summary

Inventory every file under `docs/research/canon`, classify repeated bundle artifacts consistently, and produce an exact hit register for shard/wedge names and shorthand codes without changing the canon source tree.

## Source

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1922-codex-vm013-placement-domains-prerequisite.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-013-placement-domains-architecture-post-v1-faction-expansion.md`
- `docs/research/webdev/vox-mana-specific/deep-research-report_adding_more_colors.md`

## What Shipped

- Added `docs/analysis/canon-inventory-three-color-reference-audit.md` as a durable 225-file canon inventory.
- Grouped the full canon tree by top-level folder while keeping a file-by-file purpose line for every canon file.
- Flagged exact references to `Bant`, `Esper`, `Grixis`, `Jund`, `Naya`, `Abzan`, `Sultai`, `Temur`, `Jeskai`, `Mardu`, `WUG`, `WUB`, `UBR`, `BRG`, `WRG`, `WBG`, `UBG`, `URG`, `WUR`, and `WBR`.
- Separated primary identity sources from lore/protocol dossiers, support references, deck-list references, and incidental mentions.
- Preserved the canon tree itself as read-only and stored the audit outside `docs/research/canon`.

## Acceptance Criteria

- Every file under `docs/research/canon` is represented once in the inventory report.
- Every exact target hit surfaced by the audit is captured in the hit register.
- Repeated bundle artifacts are described consistently instead of being over-explained.
- The report ends with a short shortlist of best shard docs, best wedge docs, and broad support docs.

## Files Changed

- `docs/analysis/canon-inventory-three-color-reference-audit.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-156-canon-inventory-three-color-reference-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-2247-codex-vm156-canon-inventory-three-color-audit.md`

## Notes

This closeout is documentation-only. It does not modify any runtime code, schema, generated data, or files inside `docs/research/canon`.
