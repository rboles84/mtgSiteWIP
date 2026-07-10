# VM-432 - Add Self-Snapshot To Obsidian Vault

Status: Done
Owner: Codex
Created: 2026-06-30
Completed: 2026-06-30
Related repo artifact: `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
Related external vault note: `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\vox-mana-self-snapshot.md`

## Task

Add the VM-429 Vox Mana self-snapshot to the external Obsidian vault so it is available in the curated project memory layer.

## Scope

In scope:

- Review vault-related prior work and current board/handoff state.
- Add a vault-facing self-snapshot note under the existing release-record section.
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
- `docs/kanban/done/VM-431-add-qa-plan-to-obsidian-vault.md`
- `docs/handoffs/2026-06-29-2356-codex-vm431-qa-plan-vault.md`
- `docs/kanban/done/VM-429-vox-mana-self-snapshot.md`
- `docs/handoffs/2026-06-29-2332-codex-vm429-self-snapshot.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- External vault `09-v1-release-record/_index.md`
- External vault `09-v1-release-record/qa-test-plan-and-release-readiness.md`

## Files Changed

External vault:

- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\vox-mana-self-snapshot.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\09-v1-release-record\_index.md`

Repo:

- `docs/kanban/done/VM-432-add-self-snapshot-to-obsidian-vault.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-30-0000-codex-vm432-self-snapshot-vault.md`

## What Changed

- Created a vault-facing release-record note for the VM-429 self-snapshot.
- Added vault frontmatter with `status: current`, `type: release-record`, and repo-grounded sources.
- Included the full self-snapshot content after a vault-specific note that the repo artifact remains canonical.
- Added `[[vox-mana-self-snapshot]]` to the release-record index.
- Updated the release-record index usage guidance to point readers to the self-snapshot before product strategy, positioning, audience, or roadmap decisions.
- Added VM-432 board and handoff traceability.

## Acceptance Criteria

- [x] Self-snapshot exists in the external Obsidian vault.
- [x] Vault note uses current-note frontmatter.
- [x] Vault note states repo authority remains canonical.
- [x] Vault release-record index links to the note.
- [x] All requested snapshot sections are present in the vault copy.
- [x] Repo card, board, handoff, and handoff index are updated.

## Validation

Checks run:

- Confirmed the vault note exists and is nonzero size: 60,273 bytes.
- Confirmed the vault note frontmatter and repo-authority warning.
- Confirmed snapshot sections `1` through `15` are present in the vault copy.
- Confirmed `09-v1-release-record/_index.md` links to `[[vox-mana-self-snapshot]]` and includes usage guidance for product strategy, positioning, audience, and roadmap decisions.
- Confirmed the current vault note avoids absolute Windows path leakage.
- `git diff --check -- docs\kanban\done\VM-432-add-self-snapshot-to-obsidian-vault.md docs\kanban\board.md docs\handoffs\HANDOFF_INDEX.md docs\handoffs\2026-06-30-0000-codex-vm432-self-snapshot-vault.md` - passed with only existing-style LF-to-CRLF normalization warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.

## Notes

The Obsidian vault is outside the repo and remains a curated memory layer, not the operational source of truth.
