# VM-201 - Tarkir Clan Source Folder Restore

ID: VM-201
Title: Tarkir Clan Source Folder Restore
Status: done
Type: Documentation / Research Recovery
Area: Tarkir Clans, Research Sources, Git Stash Recovery
Priority: high
Created: 2026-05-31
Updated: 2026-05-31
Completed: 2026-05-31

## Summary

Restore the stashed Tarkir clan source folders from the VM-198 future-wedge research stash so clan buildout work can continue from the original source drops.

## Scope

- Apply `VM-198 stash unrelated future-wedge research` without popping or dropping the stash.
- Restore the original stashed source folders under `docs/research/`.
- Preserve existing VM-200 Abzan normalized packet work under `docs/research/abzan/`.
- Verify restored paths and record the recovery in a handoff.

## Non-Goals

- Do not normalize, rename, merge, delete, or archive the restored clan folders.
- Do not promote any clan to architecture, raw JSON, generated artifacts, runtime, routes, Maze, Home preview, schema, Supabase, fixtures, or placement work.
- Do not edit the restored source contents.

## Acceptance Criteria

- [x] The original stashed clan source paths are visible in the working tree.
- [x] The VM-198 stash remains available as a backup after restore.
- [x] Existing `docs/research/abzan/` VM-200 work remains intact.
- [x] Handoff and board/index updates document the recovery.

## Restored Paths

- `docs/research/PROMPT_lore-source-packet.md`
- `docs/research/abzan houses/`
- `docs/research/jeskai way/`
- `docs/research/mardu horde/`
- `docs/research/sultai brood/`
- `docs/research/temur fontier/`

## Tests

- `git -c safe.directory=C:/dev/mtgSiteWIP stash apply 'stash@{0}'` - restored the stashed research drops while keeping the stash.
- `rg --files docs\research | rg -i "PROMPT_lore-source-packet|abzan houses|jeskai way|mardu horde|sultai brood|temur fontier"` - verified restored files are visible.
- `git -c safe.directory=C:/dev/mtgSiteWIP stash list --date=local` - verified the VM-198 stash remains.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short -- docs/research` - verified restored research paths are present as untracked working-tree files.
