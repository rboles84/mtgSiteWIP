# VM-494 Dirty Tree Recovery And Main Promotion Handoff

## Agent Name

Codex

## Task Requested

Recover the heavily dirty `codex/docs-cleanup` tree into coherent commits, produce a clean repository, and push the result to remote `main` for GitHub Pages and `voxmana.io` publishing.

## Related Kanban Card

- `docs/kanban/done/VM-494-dirty-tree-recovery-main-promotion.md`

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent VM-428 through VM-493 handoffs in `docs/handoffs/`
- `docs/kanban/board.md`
- VM-428 through VM-493 Kanban cards
- Dirty-tree status, untracked files, branch state, staged state, and local commit history
- Excel artifacts in `docs/research/archive/` and `outputs/`
- Mana Font vendor files under `assets/vendor/mana/`
- Runtime, Maze/Scryfall compiler/parser, CI, browser-smoke, and workbook output changes

## Files Changed

- Reconstructed documentation and evidence trail commit:
  - `docs/architecture/**`
  - `docs/audits/**`
  - `docs/contracts/**`
  - `docs/handoffs/2026-*.md`
  - `docs/kanban/backlog/**`
  - `docs/kanban/blocked/**`
  - `docs/kanban/done/VM-428` through `VM-493`
  - `docs/qa/**`
  - `docs/reference/**`
  - `docs/research/archive/Data.xlsx`
  - `docs/strategy/**`
  - `docs/supabase-profile-update.sql`
- Reconstructed runtime, validation, and vendor commit:
  - `.github/workflows/**`
  - `apocrypha/index.html`, `archscry/index.html`, `index.html`, `library/index.html`, `maze/index.html`, `privacy/index.html`, `strategium/index.html`, `terms/index.html`
  - `assets/css/maze.css`
  - `assets/js/**`
  - `assets/vendor/mana/**`
  - `data/scryfall/grounding/**`
  - `package.json`, `package-lock.json`
  - `research/**`
  - `scripts/**`
- Reconstructed workbook output artifacts:
  - `outputs/mtgdata-v3-enhanced/**`
  - `outputs/placement-brain/vox-mana-placement-brain-2026-07-05.xlsx`
- VM-494 recovery-authored changes:
  - `assets/js/gate-compression-live-bias-tests.js`
  - `docs/audits/gate-compression/live-gate-bias.json`
  - `docs/audits/gate-compression/live-gate-bias.md`
  - `docs/kanban/done/VM-494-dirty-tree-recovery-main-promotion.md`
  - `docs/kanban/board.md`
  - `docs/handoffs/HANDOFF_INDEX.md`
  - This handoff

## What Changed

- Created an evidence-backed local commit series instead of one broad dirty-tree commit.
- Preserved VM-428 through VM-493 work as recovered prior implementation, documentation, QA, and artifact output.
- Added one explicit VM-494 functional correction: `npm.cmd test` no longer dirties `live-gate-bias.*` when only the generation timestamp would change.
- Sanitized generated workbook artifacts and the workbook builder so no committed output embeds the local `Downloads` source path.
- Moved VM-494 from in progress to done and recorded this handoff/index entry.

## Why It Changed

The tree contained accumulated completed work plus untracked artifacts. The recovery objective was to preserve that work, validate it, leave no unexplained dirt, and promote the clean result to remote `main` without destructive Git operations.

## Decisions Made

- Chose `VM-494` after collision scan showed `VM-486` through `VM-493` were occupied and no `VM-494+` references were present.
- Treated the user request as authorizing main promotion with a normal non-force push to `origin/main`.
- Kept VM-494 governance separate from reconstructed VM-428 through VM-493 work.
- Committed Mana Font assets because provenance, version, path references, and license notes were documented.
- Committed workbook outputs because workbook metadata, hidden content, external links, formulas, macros/objects, comments, and private-path checks were inspected, with local source paths sanitized.
- Stabilized gate-bias validation output under VM-494 instead of accepting repeat test dirt.

## Reconciliation Matrix

| Disposition | Git status before commit | Evidence | Commit |
| --- | --- | --- | --- |
| VM-428 through VM-493 docs, handoffs, cards, QA, strategy, SQL, and `Data.xlsx` | Modified/untracked | Matching handoffs/cards and docs trail | `d793aa8 Document VM-428 through VM-493 trail` |
| Runtime routes, frontend JS/CSS, Scryfall grounding, compiler/parser/tests, CI, Mana Font vendor assets | Modified/untracked | VM-447, VM-448, VM-471 through VM-485, VM-487, VM-490 handoffs plus runtime references | `1db52c9 Add Maze grounding and browser validation` |
| Workbook and output artifacts | Untracked | VM-476 workbook handoff, artifact inspection, formula scan, private-path sanitization | `3d12bad Add verified workbook output artifacts` |
| Gate-bias timestamp churn fix | Modified after full validation | `npm.cmd test` rewrote only report timestamps before VM-494 correction | `bd17652 Stabilize gate bias validation output` |
| VM-494 card, board, handoff, handoff index | Modified/untracked | Recovery governance | Final VM-494 governance commit |

## Commit List

- `d793aa8 Document VM-428 through VM-493 trail`
- `1db52c9 Add Maze grounding and browser validation`
- `3d12bad Add verified workbook output artifacts`
- `bd17652 Stabilize gate bias validation output`
- Final VM-494 governance commit: this card, board update, handoff, and handoff index.

## Artifact Checks

- `docs/research/archive/Data.xlsx`: no macros, embedded objects, hidden sheets, external relationships/connections, comments/notes, or local absolute-path formulas found.
- `outputs/placement-brain/vox-mana-placement-brain-2026-07-05.xlsx`: no risky workbook parts found in inspection.
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced*.xlsx`: local source labels were sanitized to `docs/research/archive/Data.xlsx`; formula-error scan reports zero matches.
- Mana Font: vendored runtime subset is from `mana-font@1.18.0`; README records upstream source, file subset, and license split. Runtime references point to the committed paths.

## Tests Run

- `git diff --check`
- `git diff --cached --check`
- `git diff --cached --name-status`
- `git diff --cached --stat`
- `npm.cmd run test:scryfall-grounding`
- `npm.cmd run test:plain-reading-semantics`
- `npm.cmd run test:copy-boundaries`
- `npm.cmd run test:route-metadata`
- `npm.cmd run test:parser`
- `npm.cmd run test:gate-live-bias`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:browser-smoke`
- `npm.cmd test`

## Validation Results

- JS lint passed.
- HTML validation passed.
- Browser smoke passed on desktop and mobile for Home, Archscry, Maze, Reading Finds, and return-to-dossier handoff.
- Full `npm.cmd test` passed, including 37 adaptive placement factions, 625 live Gate bias paths, 226 parser cases, Maze contract/search/syntax/mode tests, precon artifact tests, Archscry follow-up tests, and presentation snapshot tests.
- `test:gate-live-bias` passed again after the timestamp-stability fix.

## Git State Captured

Before final VM-494 governance staging:

```text
## codex/docs-cleanup
 M docs/handoffs/HANDOFF_INDEX.md
 M docs/kanban/board.md
?? docs/kanban/done/VM-494-dirty-tree-recovery-main-promotion.md
```

Local branch state before final governance commit:

```text
* codex/docs-cleanup bd17652 Stabilize gate bias validation output
  main               21e1b5c [origin/main: behind 1] Document post-promotion branch cleanup
```

## Risks / Uncertainties

- Live Supabase validation remains out of scope.
- Visual baseline refresh remains out of scope.
- External Scryfall refresh remains out of scope.
- GitHub Pages and `voxmana.io` publication depend on the remote repository's Pages/domain settings after push.
- The final post-push status is reported in the task response after the remote push completes.

## Not Touched

- No force-push.
- No dependency upgrades.
- No lockfile regeneration beyond existing recovered changes.
- No live Supabase writes or checks.
- No visual baseline refresh.
- No external Scryfall data refresh.
- No destructive cleanup of untracked files.

## Follow-Up Recommendations

- Confirm GitHub Pages deployment status in GitHub after `origin/main` updates.
- Confirm `voxmana.io` DNS/Pages custom-domain status from the repository settings if the site does not publish automatically.
- Consider a later repository policy decision for whether large workbook inspection NDJSON should remain under `outputs/`.

## Next Suggested Agent

GitHub/Pages deployment verifier, if publication does not start automatically after the push.
