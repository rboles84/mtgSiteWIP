# VM-307 - Lorehold Mechanics And Signal-Balance Repair

ID: VM-307
Title: Lorehold Mechanics And Signal-Balance Repair
Status: done
Type: source-first data repair
Area: placement-model mechanics, Lorehold raw placement signals
Priority: high
Created: 2026-06-09
Completed: 2026-06-09

## Summary

Repair Lorehold as a source-first quality pass, not a broad display rewrite. Current baseline: `LOREHOLD` passes VM-300 with one model-owned inhibitor warning, but generated `factions.LOREHOLD.identity.mechanics` is empty because the raw mechanics source is not in the builder-readable shape. Lorehold placement signals are also over-busy and should be trimmed from source.

## Pre-Flight Findings

- `git status --short` shows broad unrelated dirty worktree drift; preserve it and do not stage, revert, normalize, delete, or clean unrelated files.
- VM-300 requires raw source backing for generated placement/profile strength and forbids silencing the validator with generated-file patches.
- VM-305 added target-scoped Supabase context regeneration; use `build:factions -- --context-targets=LOREHOLD` only if context reconciliation is needed.
- VM-306 repaired the same empty mechanics symptom for `UR` and `RG`; final handoff recommends Lorehold next.
- VM-056 defines the Lorehold evidence boundary: strong Lorehold-specific mechanical support centers Spirits, Spirit tokens, artifacts, graveyard-leaves triggers, artifact restoration, relic reconstruction, and spirit/history play. Learn/Lessons and Magecraft are Strixhaven-wide context unless tied to exact Lorehold anchors.
- Builder contract currently reads `profile.mechanics.summary` for generated `identity.mechanics`.
- Current raw mechanics path is `data/raw-factions/lorehold/lorehold.profile.json::mechanics`, shape `array(8)`, with no `summary`; this fails to feed `data/placement-model.json::factions.LOREHOLD.identity.mechanics`.
- Baseline generated counts: good-fit `6`, poor-fit `6`, inhibitor traps `13`, discriminator questions `11`.
- Baseline raw counts: good-fit `6`, poor-fit `6`, raw mismatch lines `6`, inhibitor traits `10`, discriminator questions `11`.
- Baseline VM-300 result: pass with one model-owned inhibitor warning for the builder's presentism prior.

## Scope

- Update only necessary Lorehold raw source files, expected mainly:
  - `data/raw-factions/lorehold/lorehold.profile.json`
  - `data/raw-factions/lorehold/lorehold.placement.json`
  - `data/raw-factions/lorehold/lorehold.changelog.json`
- Convert Lorehold mechanics into a builder-readable source-backed shape only if compatible with the builder contract; preserve the existing detailed mechanics entries.
- Rebalance source placement signals by trimming good-fit, poor-fit, mismatch, inhibitor, and duplicate discriminator surfaces.

## Out Of Scope

- Raw claims, raw sources, deck links, public display copy, flavor snippets, routes, Maze behavior, placement schema shape, source-generated validator policy, generated placement output by hand, and broad Supabase context drift.
- `data/factions.json` changes are not accepted by default. Restore full-build rewrites unless a narrow source-backed Lorehold display field is explicitly accepted in this card or handoff.

## Acceptance Criteria

- [x] Raw mechanics before/after shape is recorded in the handoff.
- [x] Generated `factions.LOREHOLD.identity.mechanics` becomes non-empty from `profile.mechanics.summary`.
- [x] Lorehold good/poor/mismatch/inhibitor/discriminator surfaces are source-trimmed without dropping below the agreed discriminator floor.
- [x] Full regeneration accepts only deterministic Lorehold target changes in generated placement output.
- [x] Any non-Lorehold generated drift is restored or explicitly rejected.
- [x] Final VM-300 validation passes for `LOREHOLD,YORE,DUNE,GLINT,INK`, with only the known model-owned warning if present.

## Test Plan

- [x] `node --check research\build-faction-artifacts.mjs`
- [x] `npm.cmd run test:faction-context-isolation`
- [x] JSON parse checks before and after raw edits
- [x] Baseline probes for generated mechanics, raw mechanics shape/path, signal counts, and VM-300 result
- [x] `npm.cmd run validate:source-generated -- --targets=LOREHOLD`
- [x] `npm.cmd run build:factions`
- [x] Generated diff inspection against a pre-build snapshot
- [x] `npm.cmd run build:factions -- --context-targets=LOREHOLD` after broad context drift was restored
- [x] Final `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK`
- [x] Final probe confirming `UR`/`RG` mechanics remain non-empty
- [x] `npm.cmd run test:source-generated`
- [x] `node research\archscry-dossier-followup-tests.js`
- [x] `node research\maze-search-tests.js`
- [x] `npm.cmd run test:placement` known unrelated Temur color-order residual only
- [x] Scoped `git diff --check` and focused trailing-whitespace scan

## Outcome

- Converted Lorehold raw mechanics from a bare `array(8)` into a builder-readable object with `summary`, source-backed texture fields, and preserved `entries array(8)`.
- Generated `data/placement-model.json::factions.LOREHOLD.identity.mechanics` is now populated from raw source.
- Trimmed raw and generated Lorehold signal surfaces: good-fit `6 -> 4`, poor-fit `6 -> 3`, raw mismatch lines `6 -> 4`, raw inhibitor traits `10 -> 5`, generated inhibitor traps `13 -> 8`, discriminator questions `11 -> 7`.
- Removed duplicate/noisy discriminator IDs `q_lorehold_0005`, `q_lorehold_0007`, `q_lorehold_0008`, and `q_lorehold_0010`.
- Full build changed only the `LOREHOLD` faction object in the placement model relative to the pre-build snapshot.
- Broad Supabase context drift was restored to the pre-build snapshot, then targeted context mode accepted only the `LOREHOLD` context entry while preserving existing `PLACEMENT_MODEL_META`.
