# VM-402 - Golden Branch Promotion To Main

ID: VM-402
Title: Golden Branch Promotion To Main
Status: done
Type: Release Promotion / Git
Area: Golden Branch, Main Promotion, Validation
Priority: critical
Created: 2026-06-15

## Summary

Promote `feature/ui-refactor-exploration` into `origin/main` after full feasible validation, using one lease-protected overwrite push. Do not checkout, reset, delete, or rewrite local `main`; only update `origin/main`.

## Pre-Flight Notes

- Recent related work: VM-393 classified final release hygiene and main-promotion readiness without promoting main; VM-400 committed and pushed the Apocrypha/Home release train to `origin/feature/ui-refactor-exploration`; VM-401 cleaned stale branches while preserving golden and main refs for this promotion.
- Current known risks: accepted VM-390 Home visual baseline drift, accepted VM-391 Archscry/Strategium visual baseline drift, accepted VM-392 Home Lighthouse Performance `88/90` waiver, and recurring Windows git warning for inaccessible `C:\Users\obake/.config/git/ignore`.
- Relevant decisions already made: `feature/ui-refactor-exploration` is the golden branch; main-only commits `2cae196`, `8bc931c`, and `efb44c4` do not need preservation for this promotion; do not merge `origin/main` into golden.
- Files recently changed: VM-400 release-train runtime/docs/test bundle, VM-401 branch-cleanup docs, and current VM-402 coordination docs/report.
- What should not be touched: local `main`, visual baselines, tags, raw/source lore, Commander facts, generated data except through build scripts, Maze behavior, public routes/aliases, schema/API, and unrelated archives.

## Scope

- Verify clean branch state and golden/origin alignment.
- Fetch origin and record the old `origin/main` hash, golden validation hash, main-only commits to discard, and final golden closeout hash after commit.
- Run all feasible finite validation gates requested for VM-402.
- Accept only the existing VM-390, VM-391, and VM-392 waivers.
- Commit and push the VM-402 docs/report closeout to `origin/feature/ui-refactor-exploration`.
- Reconfirm `origin/main` still equals the recorded old hash.
- Promote golden to `origin/main` once with `--force-with-lease`.
- Verify `origin/main` equals `origin/feature/ui-refactor-exploration`.

## Out Of Scope

- No local `main` checkout, reset, deletion, merge, or rewrite.
- No second docs commit after promotion.
- No baseline refreshes.
- No Scryfall network data refresh.
- No mutating faction enrichment apply.
- No runtime code changes.

## Promotion Hashes

- Recorded old `origin/main` after fetch: `efb44c4c2c78091c9c48f46fd9add7e4b9c0190e`.
- Golden validation hash before test gates: `29b753cbe30d2dfda0fa64f6bc23fd363ece7130`.
- `origin/feature/ui-refactor-exploration` before validation: `29b753cbe30d2dfda0fa64f6bc23fd363ece7130`.
- Pre-closeout divergence after fetch: `origin/main...origin/feature/ui-refactor-exploration` returned `3 73`.
- Discarded `origin/main` commits:
  - `efb44c4` - Remove proposed UI mock from main.
  - `8bc931c` - Add proposed modern homepage UI mock.
  - `2cae196` - Add Scryfall discovery and Archscry dossier polish (#11).

## Promotion Command

Run exactly once after the VM-402 closeout commit is pushed to `origin/feature/ui-refactor-exploration` and after `origin/main` is re-fetched and reconfirmed at the recorded old hash:

```bash
git push --force-with-lease=refs/heads/main:efb44c4c2c78091c9c48f46fd9add7e4b9c0190e origin feature/ui-refactor-exploration:main
```

## Validation Results

Passed:

- `npm.cmd run build:factions` - built 37 faction placement records; deterministic after index refresh.
- `npm.cmd run build:precons` - built 155 precon recommendation records; deterministic after index refresh.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed for 5 files.
- `npm.cmd run audit:factions` - passed, 37 factions scanned.
- `npm.cmd run dossier:audit` - passed with 0 failures and 113 warnings.
- `npm.cmd run validate:source-generated` - passed with known JESKAI/MARDU model-owned warnings.
- `node research/validate-mono-color-markdown.mjs` - passed, 5 color sets and 10 files.
- `node research/validate-colorless-markdown.mjs` - passed, 1 source set and 2 files.
- `npm.cmd test` - passed.
- `npm.cmd run test:builder` - passed, 6 builder cases.
- `npm.cmd run test:faction-context-isolation` - passed.
- `npm.cmd run test:source-generated` - passed with known JESKAI/MARDU model-owned warnings.
- `npm.cmd run test:bias` - passed, 100 seeded-random runs.
- `npm.cmd run test:bias:all` - passed, 37 golden-path runs.
- `npm.cmd run test:frontend-smoke` - passed for Home, Maze, Archscry, Library alias, Privacy, and Terms.
- `npm.cmd run test:gate-compression` - passed, 37/37 reachable.
- `npm.cmd run test:gate-live-bias` - passed, 625 paths and 29 rank-one winners.
- `npm.cmd run test:visual:apocrypha` - passed with 0 mismatched pixels for all captures.
- `npm.cmd run test:mode` - passed, 5 mode cases.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `npm.cmd run test:placement` - passed, 37 factions and 37 golden paths.
- `npm.cmd run test:presentation-snapshots` - passed, 16 fixed cases.
- `npm.cmd run test:syntax` - passed, 14 syntax translation cases.
- `git diff --check` - passed after trimming two generated Lighthouse report whitespace lines.
- `git diff --cached --check` - passed with no staged content at validation time.

Waived:

- `npm.cmd run test:visual:home` - failed under VM-390 waiver: mobile `59367`, tablet `100324`, desktop `132503`.
- `npm.cmd run test:visual:archscry` - failed under VM-391 waiver: landing captures `0`; dossier captures match the documented stale-baseline failure class.
- `npm.cmd run test:visual:strategium` - failed under VM-391 waiver: `174876`, `66215`, `185089`, and `153206`.
- `npm.cmd run test:lighthouse:home` - failed under VM-392 waiver: Performance `88`, Accessibility `96`; report written to `docs/audits/lighthouse-home.html`.

Skipped:

- `npm.cmd run test:watch` - non-terminating watch mode.
- `npm.cmd run test:visual:*:baseline` - refreshes visual baselines.
- `npm.cmd run scryfall:download` and `npm.cmd run scryfall:refresh` - network data refresh.
- `npm.cmd run enrich:factions` - mutating apply script.

## Generated Validation Outputs

- `docs/audits/2026-06-15-vm402-golden-branch-promotion.html`
- `docs/audits/lighthouse-home.html`
- `docs/audits/gate-compression/live-gate-bias.json`
- `docs/audits/gate-compression/live-gate-bias.md`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.json`
- `docs/audits/gate-compression/wubrg-first-gate-comparison.md`

The Gate report diffs are generated timestamp refreshes. The Lighthouse report diff is the current VM-402 run output plus mechanical trailing-whitespace cleanup.

## Acceptance Criteria

- [x] Pre-flight docs reviewed.
- [x] Current branch and golden/origin alignment confirmed before VM-402 docs.
- [x] VM-402 collision scan passed.
- [x] Origin fetched and promotion hashes recorded.
- [x] Feasible finite validation gates run and documented.
- [x] Only VM-390/391/392 waivers are accepted.
- [x] Exact promotion command documented.

## Post-Closeout Checks Reported In Final Response

The following checks occur after this closeout document is committed and are reported in the final Codex response without a second docs commit:

- VM-402 docs/report closeout committed and pushed to `origin/feature/ui-refactor-exploration`.
- `origin/main` still equals the recorded old hash before promotion.
- One lease-protected overwrite push updates `origin/main`.
- Final refs verify `origin/main` equals `origin/feature/ui-refactor-exploration`.

## Related

- `docs/handoffs/2026-06-15-1334-codex-vm402-golden-branch-promotion.md`
- `docs/audits/2026-06-15-vm402-golden-branch-promotion.html`
- `docs/kanban/done/VM-401-golden-branch-stale-branch-cleanup.md`
- `docs/kanban/done/VM-400-publish-apocrypha-release-train-bundle.md`
- `docs/kanban/done/VM-393-final-release-hygiene-main-promotion-readiness.md`
