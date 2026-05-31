# VM-199 Merge Hygiene Fix Handoff

## Agent Name

Codex

## Task Requested

Make `codex/vm160-bant-controlled-promotion` fully merge-ready into `feature/ui-refactor-exploration` with one corrective cleanup commit, without rewriting history, switching branches, pushing, or touching the existing future-wedge stash.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`
- `docs/handoffs/2026-05-31-0058-codex-vm197-alara-shard-parity-closeout.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-198-shard-bundle-worktree-cleanup.md`
- `docs/kanban/done/VM-197-alara-shard-gold-standard-parity-closeout.md`
- `feature/ui-refactor-exploration...HEAD` merge and whitespace diff state

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-199-shard-branch-merge-hygiene-fix.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0140-codex-vm199-merge-hygiene-fix.md`
- `docs/research/archive/vm144-stale-preview-assets/`
- `docs/research/archive/vox_mana_precons_MASTER.csv`
- `docs/research/archive/vox_mana_precons_MASTER.json`
- `docs/handoffs/2026-05-30-2152-codex-vm187-jund-live-pilot-copy-dossier-repair.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2237-codex-vm189-jund-dossier-empty-panel-link-dedup-repair.md`
- `docs/handoffs/2026-05-30-2303-codex-vm190-jund-starter-cards-mana-base-coverage.md`
- `docs/kanban/done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md`
- `docs/kanban/done/VM-188-naya-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-189-jund-dossier-empty-panel-link-dedup-repair.md`
- `docs/kanban/done/VM-190-jund-starter-cards-mana-base-coverage.md`
- `docs/research/grixis/Grixis Research Report_ Lore and Mechanics.md`
- `docs/research/grixis/grixis-deep-research-report.md`
- `docs/research/grixis/grixis_research_report.html`
- `docs/research/jund/source-material/Jund_ Deep Lore and Gameplay Analysis.seed.md`
- `docs/research/jund/source-material/jund_research_report.generated-seed.html`

## What Changed

- Restored the deleted archive paths from `feature/ui-refactor-exploration` using `git restore --source feature/ui-refactor-exploration -- <path>` without switching branches.
- Kept the new `docs/research/archive/bant-pre-push-cleanup/` archive material intact.
- Normalized trailing whitespace and extra blank EOF lines only in files reported by the branch whitespace check.
- Created and closed the small VM-199 Kanban card and added this handoff/index entry.

## Why It Changed

The branch was mechanically mergeable and runtime tests were good, but it still deleted archived docs and failed whitespace checks relative to `feature/ui-refactor-exploration`. This cleanup preserves AGENTS governance and makes the shard bundle cleaner to merge without changing runtime behavior.

## Decisions Made

- Used a new corrective commit instead of rebasing, amending, or rewriting prior commits.
- Restored deleted archive docs from the target branch instead of waiving the deletion.
- Treated restored archive files as repository history/provenance only, not active runtime inputs.
- Kept whitespace cleanup mechanical and scoped to the files already flagged by `git diff --check`.

## Risks / Uncertainties

- The restored archive files are intentionally retained for provenance. Future cleanup should archive or move docs, not delete them permanently.
- The branch still includes the larger shard bundle history ahead of `feature/ui-refactor-exploration`; this handoff only covers the corrective merge-hygiene commit.

## Tests Run

- PASS - `git -c safe.directory=C:/dev/mtgSiteWIP diff --check feature/ui-refactor-exploration`
- PASS - `git -c safe.directory=C:/dev/mtgSiteWIP diff --check HEAD`
- PASS - `rg -n "vm144-stale-preview-assets|vox_mana_precons_MASTER" . --glob "!docs/**" --glob "!node_modules/**" --glob "!dist/**" --glob "!.git/**"`
- PASS - `npm.cmd run test:placement`
- PASS - `npm.cmd test`
- PASS - `npm.cmd run audit:factions`
- PASS - `git -c safe.directory=C:/dev/mtgSiteWIP merge-base --is-ancestor feature/ui-refactor-exploration HEAD`
- PASS - `git -c safe.directory=C:/dev/mtgSiteWIP rev-list --left-right --count feature/ui-refactor-exploration...HEAD`

## Not Touched

- No branch switch, rebase, amend, reset, or push.
- No generated faction artifacts.
- No runtime API, schema, placement scoring, route, Home preview, Maze behavior, question-bank, lore, Commander, or raw-faction claim changes.
- The existing `VM-198 stash unrelated future-wedge research` stash was not touched.

## Follow-Up Recommendations

- After the corrective commit, rerun the exact merge-readiness checks against `feature/ui-refactor-exploration...HEAD`.
- If the branch is merged, keep archive governance intact on the target branch.

## Next Suggested Agent

Merge Steward or Release Reviewer.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-199-shard-branch-merge-hygiene-fix.md`
- `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`
- `docs/handoffs/2026-05-31-0058-codex-vm197-alara-shard-parity-closeout.md`
