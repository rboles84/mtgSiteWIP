# 2026-05-30 17:28 - Codex - VM-174 Grixis Maze Sidebar Identity Repair

## Agent Name

Codex

## Task Requested

Fix the Maze `From Your Dossier` sidebar after manual QA showed a Grixis Maze launch with correct UBR links still rendering WU sidebar paths in `.sb-section-dossier`.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1715-codex-vm173-grixis-dossier-recommendation-quality-repair.md`
- `docs/kanban/board.md`
- `research/research-init.js`
- `assets/js/archscry-presentation.js`
- `assets/js/maze-handoff.js`
- `research/maze-search-tests.js`
- `research/maze-query-contract-tests.js`
- `assets/js/quick-reading-tests.js`

## Files Changed

- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-174-grixis-maze-sidebar-identity-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1728-codex-vm174-grixis-maze-sidebar-identity-repair.md`

## What Changed

- Added `BANT`, `ESPER`, and `GRIXIS` to `DOSSIER_COLOR_IDENTITIES` in `research/research-init.js`.
- Added a Maze regression where the URL handoff is active `GRIXIS` but the stored primary placement result is `WU`.
- The new regression asserts the Maze sidebar renders three Grixis paths, uses `UBR`, uses `id=ubr` for commanders, keeps `id<=ubr` for support/flavor, and does not show the outside-color stretch path.

## Why It Changed

VM-173 fixed the Archscry-generated Maze links, but the Maze sidebar rebuilds `From Your Dossier` paths locally. That local resolver did not know live shard keys, so `GRIXIS` fell through to stored primary placement mana scores. If the primary placement was WU, the active Grixis sidebar incorrectly showed WU.

## Decisions Made

- Kept the repair in the Maze sidebar identity resolver instead of changing Archscry handoff shape.
- Added only the currently live shard keys needed by the post-VM-168 runtime: `BANT`, `ESPER`, and `GRIXIS`.
- Preserved `UBR` as query syntax/color metadata only; this does not add `UBR` as a route key, alias, or placement key.

## Risks / Uncertainties

- The worktree remains dirty from prior VM-164 through VM-173 work; this task preserved that state.
- `git diff --check` passed but continued to report existing LF-to-CRLF warnings.

## Tests Run

- `node --check research/research-init.js`
- `node --check research/maze-search-tests.js`
- `node research/maze-search-tests.js`
- `node research/maze-query-contract-tests.js`
- `npm.cmd run test:placement`
- `git diff --check`

## Not Touched

- No generated faction rebuild.
- No Home, route, schema, raw-faction, lore source, or runtime promotion changes.
- No new live keys or `UBR` alias/route changes.
- No manual Supabase edits.

## Follow-Up Recommendations

- Refresh the browser page or clear the old Maze handoff/local storage before manual re-test so stale sidebar DOM is not retained from a prior load.
- Manual QA should confirm the Grixis Maze left rail says `UBR` and no longer shows `WU` in `From Your Dossier`.

## Next Suggested Agent

Manual QA / Browser verification.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-174-grixis-maze-sidebar-identity-repair.md`
- `docs/handoffs/2026-05-30-1715-codex-vm173-grixis-dossier-recommendation-quality-repair.md`
