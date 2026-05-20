# Handoff - VM-076 Cleanup And Push Preview / Archive Batch

Agent name: Codex

Task requested: Clean up the current worktree, preserve intentional preview/docs/archive work, remove obvious scratch drift, verify the batch, and push it if safe.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-19-1956-codex-live-home-css-restoration.md`
- `docs/handoffs/2026-05-19-2223-codex-newindex-chartjs-repair-retry.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-17-1655-codex-vm033-presentation-snapshot-harness.md`
- `docs/handoffs/2026-05-17-1732-codex-vm033-16-case-snapshot-fixtures.md`
- `docs/handoffs/2026-05-17-2135-codex-vm035-colorless-foundation.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-002-cleanup-batch-1-foundation.md`
- `git status --short`
- `git diff --stat`
- `assets/js/index.js`
- `docs/reference/manual-test-cases.md`
- `docs/reference/method-reference.md`
- `package.json`
- `research/run-tests.js`
- `docs/research/canon/`
- `docs/research/ui_research/`

## Files Changed

- `.gitignore`
- `apocrypha/index.html`
- `archscry/index.html`
- `maze/index.html`
- `assets/css/home.css`
- `assets/css/home-preview.css`
- `assets/img/logo.html`
- `assets/img/vox-mana-logo-flame-orb-final.html`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `assets/js/archscry-presentation.js`
- `assets/js/color-matrix-radar.js`
- `assets/js/home-preview.js`
- `assets/js/newindex-color-matrix.js`
- `newIndex.html`
- `newIndex2.html`
- `docs/analysis/color-audits/*-source-mapping-report.md`
- `docs/architecture/colorless/identity.md`
- `docs/architecture/colorless/metaphysics.md`
- `docs/reference/colorless-identity-metaphysics-markdown-schema.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/method-reference.md`
- `research/generate-presentation-snapshots.mjs`
- `research/presentation-snapshot-cases.json`
- `research/presentation-snapshot-runner.mjs`
- `research/presentation-snapshot-tests.js`
- `research/run-tests.js`
- `research/validate-colorless-markdown.mjs`
- `docs/research/canon/**/*`
- `docs/research/ui_research/**/*`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0657-codex-vm076-cleanup-push-preview-archive-batch.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-076-cleanup-and-push-preview-archive-batch.md`

Scratch files removed before staging:

- `archscry/newIndex.html`
- `assets/css/home - Copy.css`
- `assets/js/color-matrix-radar - Copy.js`
- `docs/reference/Deep Dive MTG Color Pie Research.md`
- `docs/research/desktop.ini`
- `docs/research/canon/misc/desktop.ini`
- `new 76.txt`

## What Changed

- Added a cleanup Kanban card, then moved it to `done` after verification.
- Preserved the intentional preview/homepage work, snapshot harness, colorless docs, handoffs, Kanban cards, design HTML sources, and research archive files that prior handoffs already referenced.
- Restored compatibility with existing documentation by keeping `docs/research/Deep_Dive_MTG_Color_Pie_Research.md` in place rather than committing its deletion.
- Let Git absorb the false dirty state on many tracked docs/handoff files caused by mixed line endings in the working tree.
- Removed clearly local scratch files and backup copies so they do not continue to muddy the worktree.
- Added `desktop.ini` to `.gitignore` so Windows metadata files do not keep reappearing as untracked noise.

## Why It Changed

The repo had reached a point where real deliverables and disposable local artifacts were mixed together. The user asked for a cleanup and push, so this pass focused on preserving the documented work while making the tree coherent enough to verify, commit, and publish safely.

## Decisions Made

- Kept the broad documented batch together instead of trying to split preview, docs, and archive additions into multiple retrofit commits.
- Treated `docs/research/canon/` and `docs/research/ui_research/` as intentional archive/design additions because completed handoffs and cards already cite material from those trees.
- Removed the loose scratch `archscry/newIndex.html` copy because it had no handoff or Kanban trail.
- Removed the local backup `assets/css/home - Copy.css` after the restored `assets/css/home.css` was staged.
- Removed the corrupted duplicate `docs/reference/Deep Dive MTG Color Pie Research.md` and kept the legacy tracked Deep Dive path for compatibility.
- Considered imported archive/design file trailing whitespace to be source-fidelity noise rather than a reason to rewrite the captured source corpus.

## Risks / Uncertainties

- This commit is intentionally broad and includes runtime files, preview files, documentation, and large archive material.
- `git diff --cached --check` fails if run across the entire staged batch because imported archive/design source files contain pre-existing trailing whitespace; authored/runtime paths were checked separately and passed.
- The archive tree includes binary/reference artifacts such as `.rtf`, `.jpg`, `.xlsx`, and `.zip` bundles, so future cleanup work may want a more explicit archival policy.

## Tests Run

- `npm.cmd test` -> passed
- `node research/validate-colorless-markdown.mjs` -> passed
- `npm.cmd run presentation:snapshots` -> passed, generated 16 cases under ignored `artifacts/presentation-snapshots/`
- `node --check assets/js/archscry-presentation.js` -> passed
- `node --check assets/js/color-matrix-radar.js` -> passed
- `node --check assets/js/home-preview.js` -> passed
- `node --check assets/js/newindex-color-matrix.js` -> passed
- `node --check assets/js/index.js` -> passed
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --cached --check` -> expected failures from imported archive/design source whitespace
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --cached --check -- . ':(exclude)docs/research/canon/**' ':(exclude)docs/research/ui_research/**' ':(exclude)assets/img/logo.html' ':(exclude)assets/img/vox-mana-logo-flame-orb-final.html'` -> passed

## Not Touched

- Root `index.html`
- `assets/js/home.js`
- Placement scoring/model logic
- Scryfall download/index pipeline
- Supabase function code
- Ignored generated artifacts under `artifacts/`

## Follow-Up Recommendations

- If the archive trees keep growing, decide whether large raw research/design bundles should live in-repo, in a dedicated archive branch, or in external storage with index docs in-repo.
- If `newIndex2.html` is promoted to canonical home later, do that in a dedicated promotion pass rather than folding it into another cleanup batch.
- Consider adding a repo-level line-ending policy such as `.gitattributes` in a future focused hygiene pass instead of mixing that concern into feature/archive work.

## Next Suggested Agent

- Documentation Steward or Planning Architect for a future archive-policy / docs-path normalization pass.

## Related Kanban Card / Docs / Plans

- `docs/kanban/done/VM-076-cleanup-and-push-preview-archive-batch.md`
- `docs/kanban/done/VM-002-cleanup-batch-1-foundation.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-19-1956-codex-live-home-css-restoration.md`
- `docs/handoffs/2026-05-19-2223-codex-newindex-chartjs-repair-retry.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
