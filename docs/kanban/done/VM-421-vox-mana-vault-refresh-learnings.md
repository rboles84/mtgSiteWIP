# VM-421 - Vox Mana Vault 1.0 Refresh And Learnings

ID: VM-421
Title: Vox Mana Vault 1.0 Refresh And Learnings
Status: Done
Type: Documentation / Knowledge Management / Retrospective
Area: Obsidian Vault, Documentation, Learnings
Priority: High
Created: 2026-06-25
Completed: 2026-06-25

## Summary

Refreshed the external Obsidian vault at `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh` as curated Vox Mana v1.0 project memory, not a repo mirror.

The vault now captures what Vox Mana became by v1.0, how it was built, why key decisions were made, and what was learned. It remains retrospective and traceable, not a competing source of truth for lore, Commander facts, placement logic, data contracts, generated artifacts, or release state.

## Source

- User-approved `Vox Mana Vault 1.0 Refresh And Learnings` brief.
- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent relevant handoffs for VM-418, VM-419, VM-420, VM-416, VM-415, VM-414, VM-413, VM-407, VM-390, VM-391, VM-392, WUBRG, Colorless, and Apocrypha Research Vault governance.
- Canonical architecture, reference, workflow, guardrail, design, and manual QA docs.
- Existing vault at `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh`.

## Source Hierarchy

1. Repo Kanban and handoffs
2. Canonical architecture/reference/design docs
3. Raw packets and source/evidence ledgers
4. Generated data contracts and current app files
5. Existing vault notes

## Acceptance Criteria

- [x] Existing numbered vault structure is preserved and expanded.
- [x] `09-v1-release-record/`, `10-learnings/`, and `_meta/` are added.
- [x] Hub/index pages reflect v1.0 state, current routes, Apocrypha as primary route with `/library/` as alias, current Home Identity Signal, source-first governance, and post-v1 backlog.
- [x] New active vault notes use `status: current`.
- [x] Old retained notes use `status: archive` or `status: superseded` where stale.
- [x] Learnings notes include a `Grounded In` section and trace claims to handoffs/cards/docs.
- [x] Current-facing stale terms are audited and repaired or classified as historical.
- [x] Relative repo path references and Obsidian wikilinks are preferred; absolute Windows paths appear only in `_meta/upgrade-report.md` as environment notes.
- [x] Repo edits remain limited to this card, board, handoff, and handoff index.

## Files Impacted

- External vault files under `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-421-vox-mana-vault-refresh-learnings.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-25-1934-codex-vm421-vault-refresh-learnings.md`

## What Changed

- Added `09-v1-release-record/` with current product map, v1 timeline, validation/waiver record, post-v1 backlog map, and source governance map.
- Added `10-learnings/` with seventeen case-study-style learning notes plus a learnings index.
- Expanded the learnings section after review to cover the underrepresented VM-100 through VM-300+ middle build arc: route shell/CSS architecture, identity registry/expansion, and contract/source-guardrail repair.
- Expanded the learnings section again after review to cover the VM-001 through VM-100 foundation layer: first-hundred overview, Scryfall/Archscry/Maze continuity, mono identity authoring, and prototype-to-product surface lessons.
- Added `_meta/` with upgrade report, source map, stale-term audit, and note status map.
- Refreshed root and top-level section indexes to clarify v1 state, current public routes, source hierarchy, stale/superseded note handling, and post-v1 boundaries.
- Marked old retained vault notes as `status: superseded` or `status: archive`, preserving prior status in `previous_status` where present.
- Replaced old absolute Windows paths outside `_meta/upgrade-report.md` with relative repo paths or neutral external-workspace labels.

## Tests And Validation

- Confirmed all `10-learnings/` notes include frontmatter fields `title`, `status`, `type`, `updated`, and `grounded_in`.
- Confirmed current-note Obsidian wikilinks resolve.
- Confirmed no `tatus:` typo or old active status values remain as frontmatter `status:` values.
- Ran scoped stale-term checks for old identity/route/encoding claims; only one current-facing hit remains, explicitly labeling older `maze.html` references as historical.
- Ran a portability scan confirming the only true Windows absolute path left in the vault is the allowed environment note in `_meta/upgrade-report.md`.
- Re-ran the scoped vault checks after adding the VM-100 through VM-300+ middle-build notes.
- Re-ran the scoped vault checks after adding the VM-001 through VM-100 first-hundred notes.
- Ran scoped repo `git diff --check` for VM-421 tracking docs after closeout.

## Risks

- The repo remains dirty with VM-420 docs cleanup files and deletions that were present before VM-421. VM-421 did not stage, reset, revert, or bundle that work.
- The vault is outside the repo source of truth. The new source hierarchy and meta notes intentionally keep repo Kanban, handoffs, canonical docs, raw/source ledgers, generated contracts, and current app files above the vault.
- Old vault notes are preserved and may still contain historical route or identity terminology; status frontmatter and the stale-term audit classify those uses.

## Not Touched

- Runtime app code
- Generated data
- Raw source packets
- Placement model
- Lore claims
- Commander facts
- Route behavior
- Visual baselines
- VM-420 dirty-tree files

## Follow-Up

- Keep the vault updated after major release trains, source-governance changes, and route-state changes.
- If an old vault note becomes useful for new work, revive it through a repo Kanban card before treating it as current.
- Re-run the stale-term audit after future route renames, identity-surface changes, Home preview policy changes, Apocrypha/library behavior changes, or Loom scope changes.

## Notes

VM-421 was selected after collision scans showed `VM-417` reserved, `VM-418`, `VM-419`, and `VM-420` used, and no `VM-421` or `VM-422` hits.
