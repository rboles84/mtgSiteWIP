# VM-386 Publish Gate Dossier Cleanup Handoff

## Agent Name

Codex

## Task Requested

Check the repo and push all changes into the repo.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1926-codex-vm382-gate-compression-simulator.md`
- `docs/handoffs/2026-06-13-1954-codex-vm383-gate-compression-preview.md`
- `docs/handoffs/2026-06-13-2212-codex-vm384-gate-live-promotion.md`
- `docs/handoffs/2026-06-14-0009-codex-vm385-archscry-dossier-ux-repair.md`

## Files Changed

Initial coordination:

- `docs/kanban/board.md`
- `docs/kanban/done/VM-386-publish-gate-dossier-cleanup-bundle.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-0939-codex-vm386-publish-gate-dossier-cleanup.md`

Staged bundle summary before commit:

- 36 staged name-status entries.
- 20 additions.
- 16 modifications.
- No tracked deletions.
- No scratch files staged.
- No visible untracked files remained after staging.

## What Changed

- Created VM-386 as an in-progress publish/cleanup card.
- Began this handoff before staging.
- Started classification of the documented VM-382 through VM-385 dirty tree.
- Removed excluded scratch files from the working tree.
- Rebuilt generated placement output with `npm.cmd run build:factions`.
- Ran the Gate/dossier publish-readiness test stack.
- Committed and pushed the classified bundle to `origin/feature/ui-refactor-exploration`.
- Moved VM-386 to done after the push and clean/aligned status check.

## Why It Changed

The user asked to check the repo and push all changes. The repo workflow requires preflight, Kanban tracking, testing, documentation, and handoff for non-trivial publish work.

## Preflight Summary

Recent related work:

- VM-382 added the non-live WUBRG-first Gate compression simulator, reports, and research source.
- VM-383 added an explicit compressed-Gate preview path without changing default live behavior.
- VM-384 promoted the compressed Gate to the live Archscry default through builder-owned source and retired preview files.
- VM-385 repaired Archscry dossier UX issues around card-example duplication, adjacent return controls, spacing, and Black/card visibility regressions.

Current known risks:

- The dirty tree spans runtime JS/CSS, generated placement output, package scripts, tests, docs, audits, Kanban, and handoffs.
- `data/placement-model.json` is generated and must be rebuilt through `npm.cmd run build:factions`.
- Scratch files `._rc.mjs`, `._rc2.mjs`, `._relic_abzan.png`, and `._relic_glint.png` are present and should not be staged.
- Git continues to warn that it cannot access `C:\Users\obake/.config/git/ignore`.

Relevant decisions already made:

- Keep Gate source/generated authority split: source in `data/placement/gate-compression.source.json`, generated placement output in `data/placement-model.json`.
- Do not hand-edit generated placement JSON.
- Do not expand Home route, Maze route, public API/schema, aliases, hero assets, lore facts, or commander facts as part of this publish pass.
- Preserve VM-382 through VM-385 documented work.

Files recently changed:

- Gate compression runtime/source/tests/docs/audits from VM-382 through VM-384.
- Archscry dossier JS/CSS/tests from VM-385.

What should not be touched:

- No new product behavior beyond documented VM-382 through VM-385.
- No scratch staging.
- No force-push.

## Classification Inventory

Current dirty tree before build/test/stage:

- Tracked modifications: 16.
- Tracked deletions: 0.
- Visible untracked files: 24.
- New ignored canon docs under `docs/research/canon/**`: none found.

Allowed tracked groups:

- Runtime/CSS/test changes documented by VM-383 through VM-385: `assets/css/archscry.css`, `assets/js/adaptive-placement.js`, `assets/js/index.js`, `assets/js/quick-reading-tests.js`, and `research/**` test/snapshot harness files.
- Builder/package changes documented by VM-382 through VM-384: `research/build-faction-artifacts.mjs`, `package.json`, and `research/run-tests.js`.
- Generated placement output to accept only after rebuild: `data/placement-model.json`.
- Docs/Kanban/handoff updates for VM-382 through VM-386.

Allowed untracked groups:

- Gate compression source/report/docs: `data/placement/gate-compression.source.json`, `docs/audits/gate-compression/**`, `docs/research/gate-compression/**`, and `research/gate-compression-simulator.mjs`.
- Live Gate bias test: `assets/js/gate-compression-live-bias-tests.js`.
- Completed VM-382 through VM-385 Kanban cards and handoffs.
- VM-386 in-progress card and handoff.
- Research context file `docs/research/vox-mana-placement-decomposition-pro.html`.

Excluded scratch:

- `._rc.mjs`
- `._rc2.mjs`
- `._relic_abzan.png`
- `._relic_glint.png`

## Tests Run

- `npm.cmd run build:factions` - passed; built 37 faction placement records and wrote generated placement/schema/context outputs. Only `data/placement-model.json` remained dirty after the rebuild.
- `npm.cmd run test:gate-live-bias` - passed; 625 paths, 29 rank-one winners; wrote `docs/audits/gate-compression/live-gate-bias.md`.
- `npm.cmd run test:gate-compression` - passed; 37/37 reachable; wrote comparison Markdown/JSON reports.
- `npm.cmd run test:placement` - passed; 37 factions and 37 golden paths.
- `npm.cmd run test:parser` - passed; 115 parser cases.
- `npm.cmd run test:presentation-snapshots` - passed; 16 fixed cases.
- `npm.cmd test` - passed.
- `npm.cmd run dossier:audit` - passed with 0 failures and 113 warnings.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `git diff --check` - passed with CRLF warnings only.
- `git diff --cached --check` - initially found trailing blank EOF lines in the VM-382 and VM-383 handoffs, then passed after mechanical trimming and restaging.

## Results

- Scratch files `._rc.mjs`, `._rc2.mjs`, `._relic_abzan.png`, and `._relic_glint.png` were removed before staging.
- `git fetch origin` passed; `git rev-list --left-right --count HEAD...origin/feature/ui-refactor-exploration` returned `0 0` before staging/commit.
- Staged bundle contains only classified VM-382 through VM-386 work.
- Published bundle commit: `f0f066d1bd1efc6c352d8ddfb097582747ebe3a8` (`Publish gate compression dossier cleanup`).
- Pushed branch: `origin/feature/ui-refactor-exploration`.
- Post-push `git rev-list --left-right --count HEAD...origin/feature/ui-refactor-exploration` returned `0 0`.
- Post-push `git status --short --branch` showed a clean aligned branch before VM-386 closeout edits.

## Risks / Uncertainties

- Git continues to warn that it cannot access `C:\Users\obake/.config/git/ignore`.
- Git reports CRLF conversion warnings on touched files; diff hygiene still passes.
- `dossier:audit` retains the current 113 warning baseline with 0 failures.

## Not Touched

- No lore/source/commander facts.
- No Home route, Maze route, public API/schema, aliases, hero assets, or unrelated placement expansion beyond documented VM-382 through VM-385 work.
- No scratch files staged.

## Follow-Up Recommendations

- Keep future Gate source changes behind the `build:factions`, `test:gate-live-bias`, `test:gate-compression`, and placement test gates.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-386-publish-gate-dossier-cleanup-bundle.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-2212-codex-vm384-gate-live-promotion.md`
- `docs/handoffs/2026-06-14-0009-codex-vm385-archscry-dossier-ux-repair.md`
