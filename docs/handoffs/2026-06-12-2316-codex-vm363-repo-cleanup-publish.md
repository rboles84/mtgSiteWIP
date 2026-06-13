# VM-363 Repo Cleanup And Verified Publish Bundle Handoff

## Agent Name

Codex

## Task Requested

Create and execute a verified cleanup/publish bundle on `feature/ui-refactor-exploration`, classifying all dirty-tree work before staging, rebuilding generated faction outputs through `npm.cmd run build:factions`, running the required gates, committing the approved bundle, pushing to `origin/feature/ui-refactor-exploration`, and closing VM-363 only after push plus clean status.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0657-codex-vm076-cleanup-push-preview-archive-batch.md`
- `docs/handoffs/2026-05-21-2104-codex-vm098-safe-backup-push-ui-refactor-exploration-2.md`
- `docs/handoffs/2026-05-28-2251-codex-branch-cleanup-push-bundle.md`
- `docs/handoffs/2026-06-04-1428-codex-vm288-canonical-home-naming-migration.md`
- `docs/handoffs/2026-06-12-2034-codex-source-bound-richness-cleanup.md`
- `docs/handoffs/2026-06-12-2211-codex-vm362-colorless-public-richness-gate.md`
- `docs/handoffs/2026-06-12-2213-codex-vm361-mono-source-inventory.md`
- `docs/research/colorless/colorless-canon-relocation-map.md`
- `docs/research/temur/temur-seed-source-crosscheck.md`

## Files Changed

Staged bundle groups:

- VM-363 coordination: `docs/kanban/board.md`, `docs/kanban/in-progress/VM-363-repo-cleanup-verified-publish-bundle.md`, `docs/handoffs/HANDOFF_INDEX.md`, and this handoff.
- Canonical Home rename: `assets/css/home.css`, `assets/js/home.js`, `index.html`, `package.json`, `scripts/lighthouse-home.mjs`, `scripts/visual-regression-home.mjs`, frontend validators, diagrams, docs, and old `newindex2` paths as renames/deletions.
- Source/raw/governance data: `data/raw-factions/**`, `docs/architecture/colors/**`, `docs/reference/*source-readiness-matrix.md`, `docs/research/**`, `CLAUDE.md`, and related audit/context/design docs.
- Generated and rebuilt outputs: `data/factions.json`, `data/placement-model.json`, `data/archscry-flavor-snippets.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.
- Validation/test tooling: `research/build-faction-artifacts.mjs`, `research/build-archscry-flavor-snippets.mjs`, `research/validate-source-generated-guardrails.mjs`, `research/faction-context-isolation-tests.js`, `assets/js/quick-reading-tests.js`, and route smoke/lint scripts.
- Completed Kanban and handoff backlog: historical VM-240 through VM-362 cards/handoffs accumulated in the dirty tree, including backlog-to-done card moves for completed Yore/Glint/Dune/Ink/Witch work.
- Source-governance canon inclusions: every ignored `docs/research/canon/**` path listed under "Intentional Ignored-File Inclusions."
- Design/mockup artifact: `mockups/placement-snapshot-mockup.html`, classified as a non-runtime design mockup artifact for the placement snapshot surface.

## What Changed

- Created the VM-363 release-hygiene card as In Progress.
- Began the VM-363 handoff before build/test/stage/commit.
- Classified the initial dirty tree into allowed, force-add, generated, deletion, and excluded buckets before staging anything.

## Why It Changed

The branch contains accumulated documented work that needs a single verified publication pass instead of blind staging. VM-363 exists to preserve that work, rebuild generated outputs from source, test the bundle, and publish it with a traceable handoff.

## Preflight Summary

Recent related work:

- VM-076, VM-098, and the 2026-05-28 cleanup bundle established prior cleanup/push precedent on this branch.
- VM-288 established canonical Home asset and script names, preserving historical `newindex2` references while current-state files moved to `home`.
- VM-357 through VM-360 created source-bound richness cleanup work and intentionally left a large dirty tree for later publication.
- VM-361 and VM-362 were documentation/source-governance passes immediately before VM-363.

Current known risks:

- The dirty tree is broad: 167 tracked name-status entries, 397 visible untracked entries, and 44 ignored canon docs requiring intentional handling.
- Generated outputs are large and must be accepted only after `npm.cmd run build:factions`.
- Tracked deletions span Home renames, Kanban backlog-to-done moves, Colorless canon relocation, Strixhaven packaged zip removal, Temur duplicate source-drop cleanup, and renamed Home harness scripts.
- The final handoff requirement to include a post-push commit hash conflicts with a strict single-commit closeout; traceability may require a small closeout commit after the main pushed bundle.

Relevant decisions already made:

- Do not expand Colorless public behavior beyond the controlled, previously approved boundary.
- Do not invent lore or commander facts.
- Prefer canonical raw/source JSON and rebuild generated mirrors.
- Preserve historical records even when live/current-state naming changed.
- Treat `docs/research/canon/**` ignored source-governance additions as intentional only when force-added and listed.

Files recently changed:

- Current-state Home files and docs from VM-288.
- Source/governance docs, raw-faction JSON, generated faction mirrors, validation scripts, and handoffs from VM-357 through VM-362.
- Colorless and Temur research relocation/cleanup surfaces.

What should not be touched:

- No force-push.
- No redesign.
- No hand editing generated faction outputs.
- No unexplained doc deletion.
- No unclassified untracked or ignored files.
- No scratch `._relic_*` files.

## Classification Inventory

Initial classification before staging:

- Tracked modifications: 167 `git diff --name-status` entries. Allowed only where tied to prior handoffs or current VM-363 coordination.
- Visible untracked files: 397 entries. Allowed only if explicitly listed or categorized as Kanban, handoff, docs, data, assets, scripts, `CLAUDE.md`, or source-governance files in this handoff.
- Ignored canon docs: 44 entries under `docs/research/canon/**`; allowed only via `git add -f` and listed below.
- Generated outputs: `data/factions.json`, `data/placement-model.json`, `data/archscry-flavor-snippets.json`, and `supabase/functions/guild-recruiter/faction-context.ts`; final acceptance pending `npm.cmd run build:factions` and generated-diff inspection.
- Excluded scratch: `._relic_*.png` and `._relic_check.mjs`.

Allowed tracked work groups:

- VM-288 canonical Home rename: `assets/css/newindex2.css` to `assets/css/home.css`, `assets/js/newindex2.js` to `assets/js/home.js`, Home harness rename scripts, `index.html`, `package.json`, and associated validators/docs.
- VM-357 through VM-360 source-bound richness cleanup: raw-faction data, source/governance docs, generated faction mirrors pending rebuild, and validation support.
- VM-361 and VM-362 docs/source-governance additions.
- Kanban cards moved from backlog to done for completed Yore, Glint, Dune, Ink, and Witch stacks.
- Colorless canon relocation and Temur source-drop cleanup with relocation/crosscheck evidence.

Allowed untracked work groups:

- Kanban done cards and handoffs for documented completed work.
- Current Home assets: `assets/css/home.css`, `assets/js/home.js`, and `assets/img/identity-hero/*.webp`.
- Raw faction packets and source/governance docs for Colorless, Dune, Glint, Ink, Witch, WUBRG, and Yore accumulated work.
- Test and validation scripts supporting the documented bundle.
- `CLAUDE.md` as a source-governance file referenced by WUBRG planning docs.
- `mockups/placement-snapshot-mockup.html` as a non-runtime design/mockup artifact for placement snapshot review.

Excluded or unresolved files:

- `._relic_GLINT.png`
- `._relic_R.png`
- `._relic_abzan.png`
- `._relic_check.mjs`

These were removed from the working tree before staging. `git diff --cached --name-only | Select-String -Pattern '^\\._relic|_relic'` returned no staged scratch matches.

## Intentional Ignored-File Inclusions

These ignored `docs/research/canon/**` files are approved only for intentional `git add -f`:

- `docs/research/canon/canon-inventory-four-color-reference-audit.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/research/canon/colorless-reference-audit.md`
- `docs/research/canon/five-color-reference-audit.md`
- `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html`
- `docs/research/canon/misc/commander_deck_list.txt`
- `docs/research/canon/mono-color-official-source-gap-audit.md`
- `docs/research/canon/mono-color-reference-audit.md`
- `docs/research/canon/source-material/alara/alara-plane-overview.md`
- `docs/research/canon/source-material/alara/sarkhan-vol-biography.md`
- `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md`
- `docs/research/canon/source-material/alara/worlds-of-magic-origins-alara.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-2.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md`
- `docs/research/canon/source-material/tarkir/story-awakening-the-bear.md`
- `docs/research/canon/source-material/tarkir/story-khanfall.md`
- `docs/research/canon/source-material/tarkir/story-truth-of-names.md`
- `docs/research/canon/strixhaven-college-reference-audit.md`
- `docs/research/canon/strixhaven/quandrix/README.md`
- `docs/research/canon/strixhaven/quandrix/SOURCES.md`
- `docs/research/canon/strixhaven/quandrix/manifest.json`
- `docs/research/canon/strixhaven/quandrix/quandrix-animation-spec.json`
- `docs/research/canon/strixhaven/quandrix/quandrix-animation-spec.md`
- `docs/research/canon/strixhaven/quandrix/quandrix-narrative-taxonomy.json`
- `docs/research/canon/strixhaven/quandrix/quandrix-narrative-taxonomy.md`
- `docs/research/canon/strixhaven/quandrix/quandrix-structural-matrix.csv`
- `docs/research/canon/strixhaven/quandrix/quandrix-structural-matrix.json`
- `docs/research/canon/strixhaven/quandrix/quandrix-translation-layer.js`
- `docs/research/canon/strixhaven/silverquill/README.md`
- `docs/research/canon/strixhaven/silverquill/SOURCES.md`
- `docs/research/canon/strixhaven/silverquill/manifest.json`
- `docs/research/canon/strixhaven/silverquill/silverquill-animation-spec.json`
- `docs/research/canon/strixhaven/silverquill/silverquill-animation-spec.md`
- `docs/research/canon/strixhaven/silverquill/silverquill-narrative-taxonomy.json`
- `docs/research/canon/strixhaven/silverquill/silverquill-narrative-taxonomy.md`
- `docs/research/canon/strixhaven/silverquill/silverquill-structural-matrix.csv`
- `docs/research/canon/strixhaven/silverquill/silverquill-structural-matrix.json`
- `docs/research/canon/strixhaven/silverquill/silverquill-translation-layer.js`
- `docs/research/canon/ten-guild-reference-audit.md`

## Deletion Disposition Table

| Deleted path(s) | Disposition |
|---|---|
| `assets/css/newindex2.css` | Superseded by `assets/css/home.css` per VM-288 canonical Home naming migration. |
| `assets/js/newindex2.js` | Superseded by `assets/js/home.js` per VM-288 canonical Home naming migration. |
| `scripts/lighthouse-newindex2.mjs` | Superseded by `scripts/lighthouse-home.mjs` per VM-288 canonical Home naming migration. |
| `scripts/visual-regression-newindex2.mjs` | Superseded by `scripts/visual-regression-home.mjs` per VM-288 canonical Home naming migration. |
| `docs/kanban/backlog/VM-240*` through `VM-269*` Yore/Glint/Dune/Ink/Witch cards | Superseded by matching completed cards under `docs/kanban/done/` and board entries. |
| `docs/research/canon/colorless/**` deleted paths | Relocated under `docs/research/colorless/**` per `docs/research/colorless/colorless-canon-relocation-map.md`. |
| `docs/research/canon/strixhaven/*/*_vox_mana_bundle.zip` | Obsolete packaged exports; source component files remain in the college folders, and related audit notes caution that packaged exports are not semantic source authority. |
| `docs/research/temur frontier/**` | Removed after byte-identical crosscheck against canonical `docs/research/temur/**` replacements per `docs/research/temur/temur-seed-source-crosscheck.md`. |

## Decisions Made

- VM-363 was unoccupied before creation.
- Current branch was confirmed as `feature/ui-refactor-exploration`.
- Scratch relic files are excluded from the publish bundle.
- Ignored canon docs are accepted only with explicit force-add listing.
- Generated faction outputs will not be staged until after the current `build:factions` run.
- `data/archscry-flavor-snippets.json` was refreshed with the established `node research/build-archscry-flavor-snippets.mjs` generator because it is generated separately from `build:factions`.
- The initial `npm.cmd test` failure exposed a generated INK snippet selecting `Kynaios and Tiro of Meletis`; the fix was made in `research/build-archscry-flavor-snippets.mjs` by adding INK-specific exclusions, then regenerating snippets. The generated file was not hand-edited.
- `git fetch origin` passed after sandbox escalation, and `git rev-list --left-right --count HEAD...origin/feature/ui-refactor-exploration` returned `0 0`.

## Risks / Uncertainties

- Staging cannot happen until generated diffs are rebuilt and inspected.
- Network-restricted `git fetch origin`/push may require escalation.
- The handoff/card closeout requirement may require a second small documentation commit after the main bundle push, because the post-push commit hash and final clean status cannot be recorded inside the same commit they describe.

## Staged Name-Status Summary

`git diff --cached --name-status` before commit readiness:

- 585 staged name-status entries.
- 418 additions.
- 108 modifications.
- 38 deletions.
- 19 exact renames (`R100`).
- 1 near-exact Lighthouse harness rename (`R097`).
- 1 near-exact visual-regression harness rename (`R099`).

Key staged checks:

- `CLAUDE.md` staged as source-governance.
- `assets/css/newindex2.css` -> `assets/css/home.css` staged as `R100`.
- `assets/js/newindex2.js` -> `assets/js/home.js` staged as `R100`.
- `scripts/lighthouse-newindex2.mjs` -> `scripts/lighthouse-home.mjs` staged as `R097`.
- `scripts/visual-regression-newindex2.mjs` -> `scripts/visual-regression-home.mjs` staged as `R099`.
- All listed ignored canon docs staged as additions under `docs/research/canon/**`.
- Colorless canon files staged as relocations from `docs/research/canon/colorless/**` to `docs/research/colorless/**`.
- Strixhaven packaged zips staged as deletions with source components preserved.
- `mockups/placement-snapshot-mockup.html` staged as a non-runtime design mockup artifact.
- No `_relic` scratch files staged.

## Tests Run

- `npm.cmd run build:factions`: passed; built 36 faction placement records and wrote placement model, schema, and Supabase faction context.
- `node research/build-archscry-flavor-snippets.mjs`: passed; wrote snippets for 36 factions.
- `npm.cmd test`: initially failed on INK flavor snippet guard, then passed after generator-side INK exclusions and snippet rebuild.
- `npm.cmd run test:placement`: passed, 36 factions and 36 golden paths.
- `npm.cmd run test:parser`: passed, 115 parser cases.
- `npm.cmd run validate:source-generated`: passed with 2 model-owned inhibitor warnings for JESKAI and MARDU.
- `npm.cmd run dossier:audit`: passed with 0 failures and 110 warnings; wrote `artifacts/dossier-snapshots/dossier-audit-report.md`.
- `npm.cmd run lint:js`: passed for 5 files.
- `npm.cmd run lint:html`: passed.
- `npm.cmd run test:frontend-smoke`: passed.
- `git diff --cached --check`: initially failed on trailing whitespace in staged source-capture docs, generated/report HTML, and three trailing-blank docs; passed after mechanical trailing-whitespace trim and restage.

## Commit And Push

Pending.

## Not Touched

- No force-push.
- No public Colorless expansion.
- No feature redesign.
- No hand-edited generated faction output.
- No unclassified untracked/ignored file staging.
- No MTG lore, card facts, commander facts, or project decisions invented.

## Follow-Up Recommendations

- Preserve this handoff as the release-hygiene audit trail for all force-added ignored canon docs and deletion dispositions.
- If a future cleanup repeats this pattern, split "payload commit" and "post-push closeout commit" explicitly in the plan to avoid self-referential handoff metadata.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-363-repo-cleanup-verified-publish-bundle.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/research/colorless/colorless-canon-relocation-map.md`
- `docs/research/temur/temur-seed-source-crosscheck.md`
