# VM-402 Golden Branch Promotion To Main Handoff

## Agent Name

Codex

## Task Requested

Promote `feature/ui-refactor-exploration` into `origin/main` after full feasible validation, using one lease-protected overwrite push. Do not checkout, reset, delete, or rewrite local `main`; only update `origin/main`.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-14-1747-codex-vm393-final-release-hygiene.md`
- `docs/kanban/done/VM-393-final-release-hygiene-main-promotion-readiness.md`
- `docs/handoffs/2026-06-15-0940-codex-vm400-apocrypha-release-train-publish.md`
- `docs/kanban/done/VM-400-publish-apocrypha-release-train-bundle.md`
- `docs/handoffs/2026-06-15-1136-codex-vm401-branch-cleanup.md`
- `docs/kanban/done/VM-401-golden-branch-stale-branch-cleanup.md`
- `docs/handoffs/2026-06-14-1647-codex-vm390-home-visual-readiness.md`
- `docs/kanban/done/VM-390-home-v1-visual-readiness.md`
- `docs/handoffs/2026-06-14-1724-codex-vm391-archscry-strategium-visual-waiver.md`
- `docs/kanban/done/VM-391-archscry-strategium-visual-readiness.md`
- `docs/handoffs/2026-06-14-1742-codex-vm392-lighthouse-home-performance.md`
- `docs/kanban/done/VM-392-lighthouse-home-performance-readiness.md`
- `docs/handoffs/2026-06-12-2347-codex-vm365-full-test-html-report.md`
- `docs/kanban/done/VM-365-full-test-sweep-html-report.md`
- `package.json`

## Files Changed

Coordination and closeout:

- `docs/kanban/board.md`
- `docs/kanban/done/VM-402-golden-branch-promotion-to-main.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-1334-codex-vm402-golden-branch-promotion.md`
- `docs/audits/2026-06-15-vm402-golden-branch-promotion.html`

Generated validation outputs:

- `docs/audits/lighthouse-home.html`
- `docs/audits/gate-compression/live-gate-bias.json`
- `docs/audits/gate-compression/live-gate-bias.md`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.json`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.md`

## What Changed

- Created and closed VM-402 as the active promotion tracking card.
- Created and finalized an HTML validation report for VM-402.
- Ran the requested feasible finite validation gates.
- Documented accepted VM-390, VM-391, and VM-392 waivers.
- Recorded the old `origin/main` hash, golden validation hash, discarded main-only commits, and exact promotion command.
- Refreshed generated Gate and Lighthouse audit outputs as part of validation.

## Why It Changed

The user explicitly requested promotion of the golden branch to `origin/main` with a full feasible validation pass, a docs/report closeout, and a single lease-protected overwrite push.

## Preflight Summary

Recent related work:

- VM-393 classified final release hygiene and documented that main promotion needed explicit later instruction.
- VM-400 committed and pushed the Apocrypha/Home release-train bundle to `origin/feature/ui-refactor-exploration`.
- VM-401 cleaned stale branches and preserved `feature/ui-refactor-exploration`, `origin/feature/ui-refactor-exploration`, `main`, and `origin/main`.

Current known risks:

- Home visual compare remains red by VM-390 waiver.
- Archscry and Strategium visual compares remain red by VM-391 waiver.
- Home Lighthouse Performance remains below threshold by VM-392 waiver.
- Git continues to warn that it cannot access `C:\Users\obake/.config/git/ignore`.

Relevant decisions already made:

- `feature/ui-refactor-exploration` is the golden branch.
- Main-only commits `2cae196`, `8bc931c`, and `efb44c4` do not need preservation for this promotion.
- Do not merge `origin/main` into golden.
- Do not checkout, reset, delete, or rewrite local `main`.

Files recently changed:

- VM-400 release-train runtime/docs/test bundle.
- VM-401 branch-cleanup documentation.
- VM-402 coordination docs and validation report.

What should not be touched:

- Local `main`, visual baselines, tags, raw/source lore, Commander facts, generated data except through build scripts, Maze behavior, public routes/aliases, schema/API, and unrelated archives.

## Decisions Made

- Treat VM-390, VM-391, and VM-392 as the only accepted validation waivers.
- Treat `feature/ui-refactor-exploration` as the only promotion source ref.
- Use a lease tied to the recorded old `origin/main` hash before promotion.
- Keep generated Gate timestamp refreshes and the current Lighthouse report as VM-402 validation evidence.

## Promotion Evidence

- Recorded old `origin/main` after fetch: `efb44c4c2c78091c9c48f46fd9add7e4b9c0190e`.
- Golden validation hash before test gates: `29b753cbe30d2dfda0fa64f6bc23fd363ece7130`.
- `origin/feature/ui-refactor-exploration` before validation: `29b753cbe30d2dfda0fa64f6bc23fd363ece7130`.
- Pre-closeout divergence after fetch: `origin/main...origin/feature/ui-refactor-exploration` returned `3 73`.
- Discarded `origin/main` commits:
  - `efb44c4` - Remove proposed UI mock from main.
  - `8bc931c` - Add proposed modern homepage UI mock.
  - `2cae196` - Add Scryfall discovery and Archscry dossier polish (#11).
- Exact promotion command prepared:

```bash
git push --force-with-lease=refs/heads/main:efb44c4c2c78091c9c48f46fd9add7e4b9c0190e origin feature/ui-refactor-exploration:main
```

## Risks / Uncertainties

- `origin/main` may move before the final promotion check; if so, promotion must stop unless the new hash is reviewed and explicitly accepted.
- Visual and Lighthouse gates are not fully green; the release depends on the accepted VM-390/391/392 waivers.
- Lighthouse still reports Edge `taskkill` access denied during cleanup after the report and scores are saved.

## Tests Run

- `git status --short --branch` - initially clean on `feature/ui-refactor-exploration`, with recurring inaccessible git ignore warning.
- `git branch --show-current` - `feature/ui-refactor-exploration`.
- `git rev-list --left-right --count HEAD...origin/feature/ui-refactor-exploration` - `0 0`.
- `git rev-parse HEAD origin/feature/ui-refactor-exploration origin/main` - initial hashes recorded.
- `rg -n "VM-402" .` - no existing references found.
- `git fetch origin` - passed.
- `git rev-list --left-right --count origin/main...origin/feature/ui-refactor-exploration` - `3 73` before closeout.
- `git log --oneline origin/feature/ui-refactor-exploration..origin/main` - confirmed the three discarded main-only commits.
- `npm.cmd run build:factions` - passed; built 37 faction placement records.
- `npm.cmd run build:precons` - passed; built 155 precon recommendation records.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run audit:factions` - passed; 37 factions scanned.
- `npm.cmd run dossier:audit` - passed with 0 failures and 113 warnings.
- `npm.cmd run validate:source-generated` - passed with known JESKAI/MARDU model-owned warnings.
- `node research/validate-mono-color-markdown.mjs` - passed; 5 color sets and 10 files.
- `node research/validate-colorless-markdown.mjs` - passed; 1 source set and 2 files.
- `npm.cmd test` - passed.
- `npm.cmd run test:builder` - passed; 6 builder cases.
- `npm.cmd run test:faction-context-isolation` - passed.
- `npm.cmd run test:source-generated` - passed with known JESKAI/MARDU model-owned warnings.
- `npm.cmd run test:bias` - passed; 100 seeded-random runs.
- `npm.cmd run test:bias:all` - passed; 37 golden-path runs.
- `npm.cmd run test:frontend-smoke` - passed for Home, Maze, Archscry, Library alias, Privacy, and Terms.
- `npm.cmd run test:gate-compression` - passed; 37/37 reachable.
- `npm.cmd run test:gate-live-bias` - passed; 625 paths and 29 rank-one winners.
- `npm.cmd run test:visual:apocrypha` - passed with 0 mismatched pixels for all captures.
- `npm.cmd run test:visual:home` - failed under VM-390 waiver: mobile `59367`, tablet `100324`, desktop `132503`.
- `npm.cmd run test:visual:archscry` - failed under VM-391 waiver: landing captures `0`; dossier captures match documented stale-baseline class.
- `npm.cmd run test:visual:strategium` - failed under VM-391 waiver: `174876`, `66215`, `185089`, and `153206`.
- `npm.cmd run test:lighthouse:home` - failed under VM-392 waiver: Performance `88`, Accessibility `96`.
- `npm.cmd run test:mode` - passed; 5 mode cases.
- `npm.cmd run test:parser` - passed; 115 parser cases.
- `npm.cmd run test:placement` - passed; 37 factions and 37 golden paths.
- `npm.cmd run test:presentation-snapshots` - passed; 16 fixed cases.
- `npm.cmd run test:syntax` - passed; 14 syntax translation cases.
- `git diff --check` - passed after trimming two generated Lighthouse report whitespace lines.
- `git diff --cached --check` - passed with no staged content at validation time.

Skipped:

- `npm.cmd run test:watch` - non-terminating watch mode.
- `npm.cmd run test:visual:*:baseline` - refreshes visual baselines.
- `npm.cmd run scryfall:download` and `npm.cmd run scryfall:refresh` - network data refresh.
- `npm.cmd run enrich:factions` - mutating apply script.

## Not Touched

- Local `main`, tags, visual baselines, raw/source lore, Commander facts, Maze behavior, public routes/aliases, schema/API, runtime code, merge state, and `origin/main` before the final planned lease-protected promotion.

## Follow-Up Recommendations

- After the VM-402 closeout commit is pushed to golden, re-fetch `origin` and verify `origin/main` still equals `efb44c4c2c78091c9c48f46fd9add7e4b9c0190e`.
- If it still matches, run the documented single lease-protected promotion command.
- Verify `origin/main` equals `origin/feature/ui-refactor-exploration` and report final hashes in the Codex final response without a second docs commit.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-402-golden-branch-promotion-to-main.md`
- `docs/audits/2026-06-15-vm402-golden-branch-promotion.html`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/done/VM-401-golden-branch-stale-branch-cleanup.md`
- `docs/kanban/done/VM-400-publish-apocrypha-release-train-bundle.md`
- `docs/kanban/done/VM-393-final-release-hygiene-main-promotion-readiness.md`
