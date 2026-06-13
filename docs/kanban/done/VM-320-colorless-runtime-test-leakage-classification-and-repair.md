# VM-320 - Colorless Runtime/Test Leakage Classification And Repair

ID: VM-320
Title: Colorless Runtime/Test Leakage Classification And Repair
Status: done
Reservation State: Complete
Type: Runtime/Test Leakage Repair
Area: Colorless, Archscry, Commander Dossier, Tests
Priority: high
Created: 2026-06-10
Completed: 2026-06-10

## Summary

Resolved the VM-312 Colorless review-gate blocker by removing unapproved `COLORLESS` identity-like summary-strip scaffolding from runtime/test JavaScript while preserving existing generic colorless utility handling.

This work uses VM-320 because VM-319 was already occupied by GRIXIS Source-First Display Enrichment.

## Scope Completed

- Removed `COLORLESS` summary-strip display override/fallback from `assets/js/commander-dossier.js`.
- Removed only the paired `WUBRG` display override/fallback portions that targeted, described, or adjacency-linked to Colorless.
- Removed the mocked `COLORLESS`/`WUBRG` summary-strip test block from `assets/js/quick-reading-tests.js`.
- Preserved generic colorless utility handling and existing summary-strip behavior for live/approved identities.
- Preserved the Colorless raw packet unchanged.

## Classification

Removed promotion-like leakage:
- `assets/js/commander-dossier.js`: removed `SUMMARY_STRIP_DISPLAY_OVERRIDES` entry for `COLORLESS`.
- `assets/js/commander-dossier.js`: removed `SUMMARY_STRIP_DISPLAY_OVERRIDES` entry for `WUBRG` because it targeted `COLORLESS` and described Colorless adjacency.
- `assets/js/commander-dossier.js`: removed `SUMMARY_STRIP_FALLBACKS.COLORLESS`.
- `assets/js/commander-dossier.js`: removed `SUMMARY_STRIP_FALLBACKS.WUBRG` because it described Colorless adjacency.
- `assets/js/quick-reading-tests.js`: removed mocked `COLORLESS` faction, mocked `WUBRG` faction, `colorlessStrip`, `wubrgStrip`, and related assertions.

Remaining hits in touched JS files:
- `assets/js/quick-reading-tests.js:130` has `"colorless"` in `INSTITUTION_TYPES`; preserved as pre-existing institution-type test coverage, not Colorless runtime availability.
- `assets/js/commander-dossier.js:17` maps `"colorless"` to `"C"`; preserved generic color-code utility.
- `assets/js/commander-dossier.js:25` maps `"C"` to `"Colorless"`; preserved generic color-code display utility.
- `assets/js/commander-dossier.js:3076`, `3080`, `3085`, `3086`, `3098`, and `3106` handle exact `C`/`COLORLESS` normalization and precon color-identity matching; preserved generic utility, not summary-strip identity availability.

## Raw Hash Check

VM-312 hash values were available and the five raw hashes still match:
- `colorless.changelog.json`: `94775FCD67365FD82F77FC52E8F989249B402F839399215602C07BD4F65D6580`
- `colorless.claims.json`: `492803A912347DCA78F0246AE4594B9E92DDBB14271327D42FB042C514FBA78A`
- `colorless.placement.json`: `25D373514B7A923E86F554C4E00A8F0BFD3F9B69CCFF9BCB03ADC96B6F39B611`
- `colorless.profile.json`: `402166523ADA190AF971B4BEBE319DBDABA7721BC59D1521E200E7CAC22E7872`
- `colorless.sources.json`: `7CD00948F9EA4953988D34DB13DDD2EA7D63FFD0481B72F2BC9D73AAC41BDFB6`

## Acceptance Criteria

- [x] Working-tree diff no longer adds `COLORLESS` as a summary-strip identity, mock faction, adjacent target, or display fallback.
- [x] Remaining `COLORLESS`, `Colorless`, `colorless`, and exact-token `C` hits in touched JS files are classified.
- [x] Colorless raw JSON hashes still match VM-312.
- [x] No public runtime, schema, generated, route, Home, Maze, Supabase, or data-contract additions.
- [x] VM-313 remains blocked until a fresh Colorless review gate approves the packet.

## Files Changed

- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-320-colorless-runtime-test-leakage-classification-and-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-0932-codex-vm320-colorless-leakage-repair.md`

## Tests Run

- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- Targeted diff scan for added `COLORLESS`/Colorless summary-strip and mock-faction leakage.
- Remaining hit classification scan for `COLORLESS`, `Colorless`, `colorless`, and exact-token `C`.
- Colorless raw SHA-256 hash check against VM-312.

Not run:
- Builders, generators, formatters, snapshot writers, fixture updates, golden-file updates, generated expected-output updates, npm-wide suites.

## Not Touched

- `data/raw-factions/colorless/**`
- `docs/research/colorless/**`
- `docs/architecture/colors/colorless/**`
- `docs/research/canon/colorless/**`
- `assets/img/identity-hero/colorless.webp`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Generated artifacts, schemas, Maze files, Home files, route files
- GRIXIS VM-319 files and data

## Follow-Up Recommendations

- Rerun a fresh Colorless review gate, either as a new card or explicit VM-312 re-review, before VM-313 promotion planning.
- Keep VM-313 blocked until that review gate records approval.
- Preserve generic colorless utility handling unless a later architecture card changes the shared color-code contract.

## Next Suggested Agent

Test Strategist / JSON Cartographer for a fresh Colorless review gate.
