# Handoff - VM-091 Safe Backup Push For UI Refactor Exploration

Agent name: Codex

Task requested: Publish the current `feature/ui-refactor-exploration` worktree as a safe remote backup/WIP snapshot, while documenting the branch state and preserving known cleanup risks for follow-up.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0657-codex-vm076-cleanup-push-preview-archive-batch.md`
- `docs/handoffs/2026-05-20-1927-codex-vm011-apocrypha-archive-console.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-076-cleanup-and-push-preview-archive-batch.md`
- `docs/kanban/done/VM-089-local-file-route-compatibility-sweep.md`
- `git status --short --branch`
- `git diff --stat`
- `git remote -v`

## Files changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-091-safe-backup-push-ui-refactor-exploration.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2118-codex-vm091-safe-backup-push-ui-refactor-exploration.md`

The commit and push also publish the existing route/UI, asset, and documentation changes already present in the worktree, including:

- `newIndex2.html`, `index.html`, `archscry/index.html`, `archscry/index2.html`, `maze/index.html`, `apocrypha/index.html`, `library/index.html`, `privacy/index.html`, `terms/index.html`
- `assets/css/apocrypha.css`, `assets/css/archscry.css`, `assets/css/archscry-atlas.css`
- `assets/js/apocrypha.js`, `assets/js/archscry-index2.js`, `assets/js/archscry-presentation.js`, `assets/js/dossier-radar.js`, `assets/js/graph.js`, `assets/js/index.js`
- Current handoffs, done cards, board updates, and related documentation already created in this branch

## What changed

- Added a dedicated done card for the backup-push task so the release-safety step is visible in Kanban history.
- Added a new handoff and index entry describing the intent of this push as a WIP backup snapshot rather than a review-ready branch.
- Re-verified the branch with the agreed safety gate before commit and push.
- Prepared the branch to be published with upstream tracking on first push.

## Why it changed

The current branch contains a wide but intentional batch of route, shell, archive, and documentation work that is already test-clean. Publishing it now protects the work remotely without pretending the branch has finished its follow-up cleanup.

## Decisions made

- Pushed the full tested batch together instead of splitting it, so route and asset dependencies stay aligned on the remote branch.
- Kept explicit follow-up risks visible rather than trying to solve them opportunistically inside the backup push.
- Treated this as a release-safety/documentation task and avoided broad new product edits.

## Risks / uncertainties

- `VM-088` remains an in-progress card in the same branch and may later need to stay or move depending on cleanup decisions.
- `VM-089` has a done card but still appears to need dedicated handoff/index cleanup.
- Several deleted `docs/research/canon/guild_research/*.md` files are being backed up with the branch snapshot before archival intent is clarified.
- The branch is not being presented as review-ready; a later cleanup pass is still needed.

## Tests run

- `npm.cmd test`
- `npm.cmd run test:placement`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not touched

- Placement scoring/model logic
- Scryfall download/index pipeline
- Generated faction artifacts
- Supabase functions
- Additional runtime feature work beyond what was already in the branch

## Follow-up recommendations

- Decide whether `VM-088` stays in this branch or moves to a later batch.
- Add or reconcile the missing `VM-089` handoff/index bookkeeping.
- Review the deleted guild research markdown files and either archive them explicitly or document why their removal is intentional.
- Do a later branch-cleanup pass before opening a polished PR.

## Next suggested agent

- Documentation Steward or release cleanup follow-up.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-091-safe-backup-push-ui-refactor-exploration.md`
- `docs/kanban/done/VM-076-cleanup-and-push-preview-archive-batch.md`
- `docs/kanban/done/VM-089-local-file-route-compatibility-sweep.md`
- `docs/handoffs/2026-05-20-0657-codex-vm076-cleanup-push-preview-archive-batch.md`
- `docs/handoffs/2026-05-20-1927-codex-vm011-apocrypha-archive-console.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
