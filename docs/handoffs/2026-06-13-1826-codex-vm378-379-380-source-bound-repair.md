# Codex Handoff - VM-378/379/380 Source-Bound UX Repair

## Agent Name

Codex

## Task Requested

Implement three targeted source-bound UX repairs:

- `VM-378` Strixhaven Non-Lorehold UX Richness for `PRISMARI`, `QUANDRIX`, `SILVERQUILL`, and `WITHERBLOOM`.
- `VM-379` Grixis Source Depth Repair for `GRIXIS`.
- `VM-380` Tarkir Dossier Support Repair for `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, and `JESKAI`.

The request explicitly prohibited public API, schema, route, Home preview, alias, hero, unrelated placement expansion, staging, or commits.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- Recent relevant handoffs for `VM-357`, `VM-358`, `VM-377`, and prior source-bound cohort repair work.
- `docs/research/VM-378-379-380_source-intake.md`
- Target raw packets under `data/raw-factions/{prismari,quandrix,silverquill,witherbloom,grixis,abzan,temur,sultai,mardu,jeskai}/`
- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `docs/reference/shard-clan-source-readiness-matrix.md`
- Target source/evidence ledgers under `docs/research/grixis/`, `docs/research/abzan/`, `docs/research/temur/`, `docs/research/sultai/`, `docs/research/mardu/`, and `docs/research/jeskai/`
- `research/build-faction-artifacts.mjs`
- `research/archscry-dossier-followup-tests.js`
- `assets/js/quick-reading-tests.js`

## Files Changed

Raw target packets:

- `data/raw-factions/prismari/prismari.sources.json`
- `data/raw-factions/prismari/prismari.claims.json`
- `data/raw-factions/prismari/prismari.profile.json`
- `data/raw-factions/prismari/prismari.changelog.json`
- `data/raw-factions/quandrix/quandrix.sources.json`
- `data/raw-factions/quandrix/quandrix.claims.json`
- `data/raw-factions/quandrix/quandrix.profile.json`
- `data/raw-factions/quandrix/quandrix.changelog.json`
- `data/raw-factions/silverquill/silverquill.sources.json`
- `data/raw-factions/silverquill/silverquill.claims.json`
- `data/raw-factions/silverquill/silverquill.profile.json`
- `data/raw-factions/silverquill/silverquill.changelog.json`
- `data/raw-factions/witherbloom/witherbloom.sources.json`
- `data/raw-factions/witherbloom/witherbloom.claims.json`
- `data/raw-factions/witherbloom/witherbloom.profile.json`
- `data/raw-factions/witherbloom/witherbloom.changelog.json`
- `data/raw-factions/grixis/grixis.sources.json`
- `data/raw-factions/grixis/grixis.claims.json`
- `data/raw-factions/grixis/grixis.profile.json`
- `data/raw-factions/grixis/grixis.changelog.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.changelog.json`
- `data/raw-factions/temur/temur.sources.json`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.changelog.json`
- `data/raw-factions/sultai/sultai.sources.json`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.changelog.json`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.changelog.json`
- `data/raw-factions/jeskai/jeskai.sources.json`
- `data/raw-factions/jeskai/jeskai.claims.json`
- `data/raw-factions/jeskai/jeskai.profile.json`
- `data/raw-factions/jeskai/jeskai.changelog.json`

Builder and tests:

- `research/build-faction-artifacts.mjs`
- `research/archscry-dossier-followup-tests.js`
- `assets/js/quick-reading-tests.js`

Documentation, ledgers, and Kanban:

- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `docs/reference/shard-clan-source-readiness-matrix.md`
- `docs/research/grixis/grixis-source-ledger.md`
- `docs/research/grixis/grixis-evidence-ledger.md`
- `docs/research/grixis/grixis-manual-fill.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/temur/temur-source-ledger.md`
- `docs/research/temur/temur-evidence-ledger.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/mardu/mardu-source-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/jeskai/jeskai-source-ledger.md`
- `docs/research/jeskai/jeskai-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-378-strixhaven-non-lorehold-ux-richness.md`
- `docs/kanban/done/VM-379-grixis-source-depth-repair.md`
- `docs/kanban/done/VM-380-tarkir-dossier-support-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1826-codex-vm378-379-380-source-bound-repair.md`

Generated or command-written outputs:

- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `artifacts/dossier-snapshots/dossier-audit-report.md`

`npm.cmd run build:factions` also wrote `data/placement-model.schema.json`, but no intentional schema change was made.

## What Changed

- Verified official source pages before promotion:
  - `Secrets of Strixhaven Commander Decklists`
  - `Tarkir: Dragonstorm Commander Decklists`
  - `Planeswalker's Guide to Strixhaven`
  - `Alara` plane overview
  - `All the Cairns of Jund`
- Added source/evidence-ledger-backed support rows and readiness classifications before public richness was restored.
- Added support-only Commander Compass data, `deck_links`, and `research_links` for the target Strixhaven colleges and Tarkir clans.
- Added three source-backed Grixis claim dimensions without padding wiki-only leads.
- Added per-card flavor-summary anchors from local Scryfall/Gatherer-style card data without copying long flavor text into public/generated surfaces.
- Removed stale unsupported Strixhaven dean/founder/discovery names from generated public search metadata.
- Re-enabled non-Lorehold Strixhaven raw enrichment in the builder and emptied the suppression set after source-backed fields existed.
- Added regression coverage for Strixhaven richness, Grixis texture, and Tarkir dossier support.

## Why It Changed

The prior source-bound cleanup left the correct conservative behavior in place, but it made several identities feel thin or split:

- Non-Lorehold Strixhaven colleges had official/product/card support ready to promote but were still suppressed.
- Grixis was the source-light shard and needed at least three usable first-party-backed claim dimensions.
- Tarkir Commander dossier support was inconsistent across clans.

This pass promoted only verified and ledgered rows, leaving uncaptured claims as intake gaps.

## Decisions Made

- Strixhaven Commander decklists support product/deck availability, commanders, deck names, and navigation only.
- Tarkir: Dragonstorm Commander rows are support/navigation only, not Tarkir canon proof.
- Grixis official first-party dimensions promoted: undead-infested hellscape, Grixis necromancy entering Jund after Conflux, and post-convergence assaults that maim, enslave, and drain life energy.
- Prismari deans, Silverquill deans, Galazeth founder status, Beledros founder status, and similar uncaptured dean/founder/discovery names remain deferred.
- Detailed Vithia/Sedraxis, vis economy, Bolas staging, Nefarox cults, and individual Grixis character biography claims remain `source-intake-needed` unless first-party backing is captured later.

## Risks / Uncertainties

- Source/generated validation still reports the existing model-owned `inhibitor_traps` warnings for all ten target identities. These warnings predate this repair lane and were not expanded here.
- Grixis still has named source gaps for deeper Vithia/Sedraxis, vis, Bolas, Nefarox, Sedris, Malfegor, and Thraximundar biography work.
- The working tree contains broad unrelated dirty/untracked work from other VM lanes. This pass preserved that state and did not clean, delete, revert, stage, or commit it.

## Tests Run

- `node -e "...JSON.parse..."` for all 50 touched raw packet files.
- `npm.cmd run build:factions`
- `node -e "...target UX/source assertions..."` for Strixhaven deferred-name leakage, Grixis figure/flavor texture, and Tarkir Compass/deck/research surfaces.
- `npm.cmd run validate:source-generated -- --targets=PRISMARI,QUANDRIX,SILVERQUILL,WITHERBLOOM,GRIXIS,ABZAN,TEMUR,SULTAI,MARDU,JESKAI`
  - Passed with 10 existing model-owned inhibitor warnings.
- `npm.cmd run test:placement`
  - Passed: 37 factions, 37 golden paths.
- `npm.cmd run dossier:audit`
  - Passed with 0 failures and 113 warnings.
- `npm.cmd test`
  - Passed.
- `npm.cmd run test:parser`
  - Passed: 115 parser cases.

## Not Touched

- No public API changes.
- No schema change was intentionally made.
- No route, Home preview, alias, hero, or unrelated placement expansion work.
- No staging, commit, or push.
- No unrelated dirty/untracked files were cleaned, deleted, normalized, or reverted.
- No long flavor text was copied into public/generated surfaces.

## Follow-Up Recommendations

- Create a narrow Grixis source-intake card if the team wants to pursue Vithia/Sedraxis, detailed vis economy, Bolas staging, Nefarox cults, or deeper Sedris/Malfegor/Thraximundar biographies.
- Keep future Commander product rows support/navigation-only unless a specific later card authorizes stronger use.
- Address existing model-owned `inhibitor_traps` warnings separately if the guardrail policy changes.

## Next Suggested Agent

Documentation Steward or JSON Cartographer for any follow-up source-intake gap work; Test Strategist only if model-owned inhibitor warning policy becomes a test-contract change.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-378-strixhaven-non-lorehold-ux-richness.md`
- `docs/kanban/done/VM-379-grixis-source-depth-repair.md`
- `docs/kanban/done/VM-380-tarkir-dossier-support-repair.md`
- `docs/research/VM-378-379-380_source-intake.md`
- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `docs/reference/shard-clan-source-readiness-matrix.md`
