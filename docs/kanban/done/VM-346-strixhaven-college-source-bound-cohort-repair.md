# VM-346 - Strixhaven College Source-Bound Cohort Repair

ID: VM-346
Title: Strixhaven College Source-Bound Cohort Repair
Status: done
Type: source-normalization / placement calibration / generated rebuild
Area: raw-factions / Strixhaven colleges / generated artifacts
Priority: critical
Created: 2026-06-12

## Summary

Repair all five Strixhaven colleges in one source-bound pass: `LOREHOLD`, `PRISMARI`, `QUANDRIX`, `SILVERQUILL`, and `WITHERBLOOM`. This is a hardening pass, not new lore or source intake.

## Pre-Flight Findings

- VM-300 and VM-325 require source-first repair and forbid generated/runtime files as canonical backing.
- VM-343 through VM-345 established the current `source_role` vocabulary and source-readiness matrix pattern for Ravnica.
- VM-307 already repaired Lorehold mechanics and placement signal balance from raw backing.
- VM-284 already repaired the Quandrix golden path calibration.
- The worktree is broadly dirty before this task; preserve unrelated drift and do not stage or commit.
- Existing Strixhaven source rows lack `source_role`.
- Current Strixhaven Crucible coverage is one same-color guild pair per college; cross-college close calls are under-pressured.
- Lorehold raw profile has source-backed enrichment available, but generated display enrichment is absent.

## Scope

- Add `source_role` to all active Strixhaven college source rows using the VM-343 vocabulary only:
  - `claim-bearing`
  - `support-only`
  - `shaping-only`
  - `discovery-only`
- Add a Strixhaven source-readiness matrix.
- Add source-backed placement discriminators, collision guidance, and Crucible pairs only where existing claim-bearing rows support them.
- Surface Lorehold raw enrichment through generator/enrichment logic rather than hand-editing generated display data.

## Out Of Scope

- Web search or new source intake.
- Home, Maze behavior, routes, public aliases, Colorless, WUBRG, four-color work, and domain architecture changes.
- Commander recommendation expansion unless already locally source-backed.
- Hand-editing generated files as source.
- Staging or committing files.

## Acceptance Criteria

- [x] Create this card before implementation and keep it in progress until validation completes.
- [x] Add valid `source_role` values to every active Strixhaven source row.
- [x] Add `docs/reference/strixhaven-college-source-readiness-matrix.md`.
- [x] Add Prismari raw discriminators for Prismari-vs-Quandrix and Prismari-vs-Silverquill only if source-backed.
- [x] Add collision guidance for `PRISMARI/QUANDRIX`, `PRISMARI/SILVERQUILL`, `LOREHOLD/QUANDRIX`, and `QUANDRIX/WITHERBLOOM` only if source-backed.
- [x] Add corresponding Crucible question-bank pairs only for source-backed pairs; fail closed and document unsupported pairs.
- [x] Populate `data/factions.json::factions.LOREHOLD.raw_enrichment` from existing Lorehold raw profile fields through generator/enrichment logic.
- [x] Rebuild generated artifacts only through approved scripts.
- [x] Run the VM-346 validation suite or document known unrelated residuals.
- [x] Move this card to Done after validation, create final handoff, and update `docs/handoffs/HANDOFF_INDEX.md`.

## Test Plan

- JSON parse every JSON file under the five Strixhaven raw folders; expected current count is 25 files.
- Source-role probe for all Strixhaven active source rows.
- Probe new discriminator/collision claim IDs and source-role backing.
- `node --check research\build-faction-artifacts.mjs`
- `npm.cmd run build:factions`
- `npm.cmd run build:factions -- --context-targets=LOREHOLD,PRISMARI,QUANDRIX,SILVERQUILL,WITHERBLOOM`
- `npm.cmd run validate:source-generated -- --targets=LOREHOLD,PRISMARI,QUANDRIX,SILVERQUILL,WITHERBLOOM`
- `npm.cmd run test:source-generated`
- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run test:parser`

## Notes

If any requested discriminator, collision pair, or Crucible cannot be supported by existing claim-bearing local source rows, do not fabricate it. Record the unsupported pair in the readiness matrix and final handoff.
