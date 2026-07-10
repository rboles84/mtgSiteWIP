# VM-431 - Add QA Plan To Obsidian Vault

Status: Done
Owner: Codex
Created: 2026-06-29
Completed: 2026-06-29
Related repo artifact: `docs/qa/vox-mana-test-plan.md`
Related external vault note: `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\qa-test-plan-and-release-readiness.md`

## Task

Add the VM-430 Vox Mana QA test plan to the external Obsidian vault so it is available in the curated project memory layer.

## Scope

In scope:

- Review vault-related prior work and current board/handoff state.
- Add a vault-facing QA plan note under the existing release-record section.
- Link the new note from the release-record index.
- Preserve the repo as the canonical source of truth.
- Add repo Kanban and handoff traceability for the external vault update.

Out of scope:

- Runtime code changes.
- Generated JSON/data changes.
- MTG lore, card, commander, or precon fact edits.
- Supabase SQL/live state changes.
- Visual baseline changes.
- Vault-wide restructuring.

## Evidence Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-421-vox-mana-vault-refresh-learnings.md`
- `docs/handoffs/2026-06-25-1934-codex-vm421-vault-refresh-learnings.md`
- `docs/handoffs/2026-06-28-0930-codex-vm423-feedback-ux-simplification.md`
- `docs/kanban/done/VM-430-vox-mana-comprehensive-test-plan.md`
- `docs/handoffs/2026-06-29-2340-codex-vm430-qa-test-plan.md`
- `docs/qa/vox-mana-test-plan.md`
- External vault `00-index.md`
- External vault `09-v1-release-record/_index.md`
- External vault `09-v1-release-record/release-validation-and-waivers.md`
- External vault `_meta/source-map.md`

## Files Changed

External vault:

- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\qa-test-plan-and-release-readiness.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\_index.md`

Repo:

- `docs/kanban/done/VM-431-add-qa-plan-to-obsidian-vault.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-29-2356-codex-vm431-qa-plan-vault.md`

## What Changed

- Created a vault-facing release-record note for the VM-430 QA plan.
- Added vault frontmatter with `status: current`, `type: release-record`, and repo-grounded sources.
- Included the full QA plan content after a vault-specific note that the repo artifact remains canonical.
- Added `[[qa-test-plan-and-release-readiness]]` to the release-record index.
- Updated the release-record index usage guidance to point readers to the QA plan before QA or release-readiness planning.
- Added VM-431 board and handoff traceability.

## Acceptance Criteria

- [x] QA plan exists in the external Obsidian vault.
- [x] Vault note uses current-note frontmatter.
- [x] Vault note states repo authority remains canonical.
- [x] Vault release-record index links to the note.
- [x] All QA plan sections `0` through `26` are present in the vault copy.
- [x] Repo card, board, handoff, and handoff index are updated.

## Validation

Checks run:

- Confirmed the vault note exists and is nonzero size: 95,441 bytes.
- Confirmed the vault note frontmatter and repo-authority warning.
- `rg "^## ([0-9]+|0)\\." C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\qa-test-plan-and-release-readiness.md` - confirmed sections `0` through `26` are present.
- `rg -n "qa-test-plan-and-release-readiness|QA or release-readiness" C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\_index.md` - confirmed the release-record index link and usage guidance.
- `rg -n "C:\\WIP|C:\\dev" C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\qa-test-plan-and-release-readiness.md` - no matches; the current vault note avoids absolute Windows path leakage.
- `git diff --check -- docs/kanban/done/VM-431-add-qa-plan-to-obsidian-vault.md docs/kanban/board.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-29-2356-codex-vm431-qa-plan-vault.md` - passed with only existing-style LF-to-CRLF normalization warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.

## Notes

The Obsidian vault is outside the repo and remains a curated memory layer, not the operational source of truth.
