# VM-201 Tarkir Clan Source Folder Restore Handoff

## Agent Name

Codex

## Task Requested

Restore the source folders for the Tarkir clans from the VM-198 stash so clan buildout work can continue.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`
- `docs/handoffs/2026-05-31-0140-codex-vm199-merge-hygiene-fix.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`
- `git status --short`
- `git stash list --date=local`
- `git stash show --include-untracked --name-status 'stash@{0}'`

## Files Changed

- `docs/research/PROMPT_lore-source-packet.md`
- `docs/research/abzan houses/`
- `docs/research/jeskai way/`
- `docs/research/mardu horde/`
- `docs/research/sultai brood/`
- `docs/research/temur fontier/`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-201-tarkir-clan-source-folder-restore.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0805-codex-vm201-tarkir-clan-source-restore.md`

## What Changed

- Applied the VM-198 stash with `git stash apply 'stash@{0}'`.
- Restored the original untracked Tarkir clan source drops under `docs/research/`.
- Left the VM-198 stash in place as a backup.
- Preserved the existing untracked VM-200 Abzan packet under `docs/research/abzan/`.
- Created and closed VM-201 to document the recovery.

## Why It Changed

The user needs the stashed clan source material available in the working tree to continue building out the Tarkir clans. VM-198 intentionally kept the future-wedge research recoverable, and this task restored it without folding it into runtime, architecture, or generated work.

## Decisions Made

- Used `stash apply`, not `stash pop`, so the backup remains available.
- Restored the original folder names exactly as stashed, including spaced paths and `temur fontier`.
- Did not normalize, rename, merge, or edit the restored source content.
- Kept VM-200 Abzan source-packet work separate from the original `abzan houses/` source drop.

## Risks / Uncertainties

- The restored folders remain untracked until explicitly staged.
- `docs/research/temur fontier/` preserves the original typo from the stash; renaming should happen only under a separate cleanup card.
- The restored source drops may include generated or seed material that still needs evidence review before use in architecture/raw/runtime work.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP stash apply 'stash@{0}'` - restored the stashed research drops; first sandboxed attempt failed on `.git/index.lock`, escalated retry succeeded.
- `rg --files docs\research | rg -i "PROMPT_lore-source-packet|abzan houses|jeskai way|mardu horde|sultai brood|temur fontier"` - verified restored files.
- `Get-ChildItem docs\research -Directory -Force | Select-Object Name,LastWriteTime` - verified restored directories.
- `git -c safe.directory=C:/dev/mtgSiteWIP stash list --date=local` - verified the VM-198 stash remains.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short -- docs/research` - verified restored paths are present as untracked files.

## Not Touched

- No stash pop or stash drop.
- No runtime code, route files, Maze behavior, Home preview, schema, Supabase, fixtures, generated artifacts, raw-faction files, placement model, or identity-layer data.
- No edits to restored source contents.
- No rename of `temur fontier`.
- No changes to existing VM-200 Abzan packet contents.

## Follow-Up Recommendations

- Stage the restored source drops with the VM-200/VM-201 docs when ready for a commit.
- Open separate cards for Jeskai, Mardu, Sultai, and Temur source-packet normalization.
- Handle any folder-name normalization, especially `temur fontier`, as a separate low-risk docs cleanup after the source drops are safely committed.

## Next Suggested Agent

Documentation Steward for the next clan source-packet normalization pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-201-tarkir-clan-source-folder-restore.md`
- `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- Stash: `VM-198 stash unrelated future-wedge research`
