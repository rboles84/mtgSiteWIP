# VM-346 Strixhaven College Source-Bound Cohort Repair Handoff

Agent name: Codex

Task requested: Execute VM-346 as a source-bound one-pass repair for all five Strixhaven colleges: source-role normalization, readiness matrix, supported placement discriminators/collisions, supported Crucibles, Lorehold raw enrichment generation, validation, Kanban closeout, and handoff.

Related Kanban card, docs, or plans:
- `docs/kanban/done/VM-346-strixhaven-college-source-bound-cohort-repair.md`
- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- VM-300, VM-325, VM-343, VM-344, VM-345

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent handoffs for VM-300, VM-307, VM-324, VM-325, VM-343 through VM-345
- `docs/kanban/board.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `data/raw-factions/lorehold/*`
- `data/raw-factions/prismari/*`
- `data/raw-factions/quandrix/*`
- `data/raw-factions/silverquill/*`
- `data/raw-factions/witherbloom/*`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `package.json`

## Files Changed

- `data/raw-factions/lorehold/lorehold.sources.json`
- `data/raw-factions/prismari/prismari.sources.json`
- `data/raw-factions/quandrix/quandrix.sources.json`
- `data/raw-factions/silverquill/silverquill.sources.json`
- `data/raw-factions/witherbloom/witherbloom.sources.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/prismari/prismari.placement.json`
- `data/raw-factions/quandrix/quandrix.placement.json`
- `data/raw-factions/silverquill/silverquill.placement.json`
- `data/raw-factions/witherbloom/witherbloom.placement.json`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-346-strixhaven-college-source-bound-cohort-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-0726-codex-vm346-strixhaven-cohort-repair.md`

## What Changed

- Added `source_role` to all 72 active Strixhaven college source rows.
- Added a source-readiness matrix for the five Strixhaven colleges with role counts, unresolved rows, placement readiness, Commander support classification, and future source-intake notes.
- Added two Prismari discriminator questions for Prismari-vs-Quandrix and Prismari-vs-Silverquill.
- Added source-backed paired collision guidance for Prismari/Quandrix, Prismari/Silverquill, Lorehold/Quandrix, and Quandrix/Witherbloom.
- Added four source-backed Crucible question-bank pairs:
  - `crucible_PRISMARI_QUANDRIX`
  - `crucible_PRISMARI_SILVERQUILL`
  - `crucible_LOREHOLD_QUANDRIX`
  - `crucible_QUANDRIX_WITHERBLOOM`
- Added target-scoped builder support to surface Lorehold raw enrichment from the existing Lorehold raw profile.
- Rebuilt generated placement/display/context artifacts through `build:factions`.
- Moved VM-346 from In Progress to Done.

## Why It Changed

The five colleges already had usable data, but the cohort was uneven for source-backed placement discrimination and display richness. VM-346 normalizes the source-role floor, documents readiness, strengthens supported cross-college close calls, and makes Lorehold's existing raw enrichment visible without treating generated files as canonical source.

## Decisions Made

- Used only the established VM-343 source-role vocabulary. This cohort needed `claim-bearing` and `discovery-only`; no active Strixhaven row was classified as `support-only` or `shaping-only`.
- Classified non-Lorehold official guide/product/Secrets rows as `claim-bearing`; non-Lorehold story-corpus rows as `discovery-only`.
- Classified Lorehold `src_lorehold_0001` through `0011`, `0013`, and `0014` as `claim-bearing`; Lorehold repository/search-only and story-corpus rows as `discovery-only`.
- All four requested Crucible pairs had claim-bearing backing, so none were skipped.
- Newly added college-to-college collision entries are marked `lateral_inhibition: false` where they were not already part of known global inhibition. This preserves close-call guidance and Crucibles without broad unrelated placement suppression. This decision repaired an intermediate mono-blue boundary snapshot regression during testing.
- Lorehold raw enrichment is generated from raw profile fields via `research/build-faction-artifacts.mjs`; `data/factions.json` was not hand-edited as source.
- No Commander recommendations were added.

## Risks / Uncertainties

- The worktree was very dirty before VM-346, including generated files and many unrelated docs/assets. VM-346 did not attempt to clean or classify unrelated drift.
- `npm.cmd run build:factions` rewrites generated artifacts from the current dirty source state; VM-346 validation focused on the requested Strixhaven outputs and the full test suite.
- Story-corpus rows remain discovery-only until a later source-reading pass binds exact claims to exact rows.
- Existing known model-owned inhibitor warnings remain accepted VM-300 behavior.

## Tests Run

- `node --check research/build-faction-artifacts.mjs` - passed.
- JSON parse every JSON file under the five Strixhaven raw folders - passed, 25 files parsed.
- Source-role probe for the five Strixhaven source ledgers - passed, 72 rows classified, 0 unresolved.
- `npm.cmd run build:factions` - passed, built 36 faction placement records.
- `npm.cmd run build:factions -- --context-targets=LOREHOLD,PRISMARI,QUANDRIX,SILVERQUILL,WITHERBLOOM` - passed, merged targeted Supabase context entries.
- `npm.cmd run validate:source-generated -- --targets=LOREHOLD,PRISMARI,QUANDRIX,SILVERQUILL,WITHERBLOOM` - passed with 5 expected model-owned inhibitor warnings.
- `npm.cmd run test:source-generated` - passed for default targets with 2 expected model-owned inhibitor warnings.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `npm.cmd run test:builder` - passed, 6 builder cases.
- `npm.cmd run test:placement` - passed, 36 golden paths.
- `node research\archscry-dossier-followup-tests.js` - passed.
- `node research\maze-search-tests.js` - passed.
- Generated probes confirmed Lorehold raw enrichment has 8 timeline entries, 11 figures, and 4 flavor anchors; all four VM-346 Crucibles are present.

## Not Touched

- No files were staged or committed.
- No web search or new source intake.
- No Commander recommendation expansion.
- No Home/Maze route work, public aliases, Colorless, WUBRG, four-color work, image assets, or domain architecture changes.
- No direct source-authoritative edits to generated files; generated files were updated through the builder.
- No attempt to revert or clean unrelated dirty worktree changes.

## Follow-Up Recommendations

- If Strixhaven story depth becomes a later goal, run a source-reading pass that promotes only exact story claims from discovery-only rows.
- If future close-call placement work expands beyond these four pairs, prefer Crucible-specific pressure or explicitly scoped collision guidance before adding broad lateral inhibition.
- Keep the Strixhaven readiness matrix updated whenever source roles or placement readiness change.

## Next Suggested Agent

JSON Cartographer for any future Strixhaven story-corpus promotion or new source-intake pass; otherwise no immediate follow-up agent is required for VM-346.
