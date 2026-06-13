# 2026-06-09 20:00 - Codex - VM-307 Lorehold Mechanics And Signal-Balance Repair

## Agent Name

Codex

## Task Requested

Implement VM-307 only: repair Lorehold's empty generated mechanics field and rebalance noisy Lorehold placement signal surfaces from local approved source backing, without web search, raw lore invention, public display rewrites, schema changes, Maze/route/flavor work, or hand-editing generated placement output as source.

## Pre-Flight Summary

Recent related work: VM-300 added source/generated guardrails; VM-305 added target-scoped Supabase context isolation; VM-306 repaired the same empty mechanics symptom for `UR` and `RG` and recommended `LOREHOLD` next.

Current known risks: the worktree already had broad unrelated dirty drift; full `build:factions` can rewrite Supabase context broadly; Lorehold has Strixhaven-wide mechanics (`Magecraft`, `Learn`, `Lessons`) that must not be promoted as Lorehold-exclusive without exact anchors.

Relevant decisions already made: VM-056 treats Lorehold as an expression-level Strixhaven school, not generic Boros or mono White plus mono Red; VM-056 says Learn/Lessons and Magecraft are Strixhaven-wide context unless tied to exact Lorehold anchors; VM-300 requires raw source to back generated placement/profile strength.

Files recently changed before VM-307 included VM-305/306 cards, handoffs, `research/build-faction-artifacts.mjs`, `package.json`, `data/placement-model.json`, Supabase context, and UR/RG raw profile/changelog files. VM-307 preserved those unrelated changes and did not stage, revert, normalize, or clean unrelated drift.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-1404-codex-vm305-supabase-context-isolation.md`
- `docs/handoffs/2026-06-09-1642-codex-vm306-ur-rg-mechanics-source-first.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-056-lorehold-identity-metaphysics.md`
- `docs/handoffs/2026-05-18-1145-codex-vm056-lorehold-identity-metaphysics.md`
- `docs/kanban/board.md`
- `research/build-faction-artifacts.mjs`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.claims.json`
- `data/raw-factions/lorehold/lorehold.sources.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/architecture/colors/lorehold/identity.md`
- `docs/architecture/colors/lorehold/metaphysics.md`
- `docs/research/canon/strixhaven/lorehold/README.md`

## Files Changed

- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-307-lorehold-mechanics-signal-balance.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-2000-codex-vm307-lorehold-mechanics-signal-balance.md`

## What Changed

- Converted `data/raw-factions/lorehold/lorehold.profile.json::mechanics` from a bare `array(8)` into a builder-readable object with `summary`, `source_bound_texture`, `supporting_claim_ids`, `supporting_source_ids`, `not_promoted_terms`, and preserved `entries array(8)`.
- Populated generated `data/placement-model.json::factions.LOREHOLD.identity.mechanics` from raw `profile.mechanics.summary`.
- Trimmed Lorehold raw signal surfaces: good-fit `6 -> 4`, poor-fit `6 -> 3`, raw mismatch lines `6 -> 4`, inhibitor traits `10 -> 5`, discriminator questions `11 -> 7`.
- Generated Lorehold signal surfaces now show good-fit `4`, poor-fit `3`, inhibitor traps `8`, and discriminator questions `7`.
- Removed duplicate/noisy discriminator IDs `q_lorehold_0005`, `q_lorehold_0007`, `q_lorehold_0008`, and `q_lorehold_0010`.
- Moved VM-307 from in-progress to done and updated the handoff index.

## Why It Changed

The builder reads `profile.mechanics.summary` for `factions.LOREHOLD.identity.mechanics`, but Lorehold raw mechanics were stored as a bare array. That made generated mechanics empty even though source-backed mechanics entries existed. The placement signal lists were also over-busy and duplicated the same evidence across good-fit, poor-fit, mismatch, inhibitor, and discriminator surfaces.

## Evidence Used

- VM-056 Lorehold decision boundary and handoff.
- `claim_lorehold_core_0004` through `claim_lorehold_core_0008` for archaeomancy, history, artifacts, tomes, spirits, and fieldwork.
- `claim_lorehold_structure_0006`, `claim_lorehold_structure_0007`, and `claim_lorehold_structure_0009` for fieldwork and spirit/statue structure.
- `claim_lorehold_mechanic_0001` through `claim_lorehold_mechanic_0010`, plus `0013` through `0017`, for Spirit/statue magic, Lorehold card anchors, Magecraft/Learn/Lesson boundaries, and Fields of Strife primary-source spirits.
- `claim_lorehold_location_0010`, `claim_lorehold_figure_0018`, and `claim_lorehold_placement_0009` for Fields of Strife, artifact restoration, and relic stewardship.
- `src_lorehold_0002`, `0004`, `0005`, `0006`, `0008`, `0009`, `0010`, and `0011`, plus VM-056 as prior card/handoff source boundary.

## Generated Objects Accepted / Restored

- Accepted `data/placement-model.json::factions.LOREHOLD.identity.mechanics`.
- Accepted `data/placement-model.json::factions.LOREHOLD.good_fit_indicators`.
- Accepted `data/placement-model.json::factions.LOREHOLD.poor_fit_indicators`.
- Accepted `data/placement-model.json::factions.LOREHOLD.inhibitor_traps`.
- Accepted `data/placement-model.json::factions.LOREHOLD.discriminator_questions`.
- Full build changed only the `LOREHOLD` faction object relative to the pre-build placement snapshot.
- Inspected and found no pre-build snapshot diff for `data/placement-model.schema.json`, `data/factions.json`, or `data/archscry-flavor-snippets.json`.
- Full build rewrote `supabase/functions/guild-recruiter/faction-context.ts` broadly; restored it from the pre-build snapshot, then ran `npm.cmd run build:factions -- --context-targets=LOREHOLD`.
- Accepted only the `LOREHOLD` Supabase context entry from targeted mode; existing `PLACEMENT_MODEL_META` was preserved relative to the pre-build snapshot.

## Decisions Made

- Kept Magecraft, Learn, and Lessons as Strixhaven-wide support texture unless paired with Lorehold history, artifacts, spirits, records, ruins, or fieldwork.
- Kept seven discriminator questions, above the five-question floor, and removed only clear duplicates or noisier variants.
- Did not accept `data/factions.json` changes.
- Did not create, remove, or alter Lorehold claims or source records.

## Risks / Uncertainties

- Final VM-300 validation still reports the expected model-owned Lorehold presentism inhibitor warning.
- `npm.cmd run test:placement` still fails on the known unrelated Temur color-order assertion: expected `blue-red-green`, actual `green-blue-red`.
- The repo has substantial pre-existing dirty drift outside VM-307. This handoff describes VM-307 changes relative to the pre-build snapshots, not a clean HEAD comparison.
- Supabase context full-mode broad drift remains a generator behavior to keep guarding with VM-305 targeted mode.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed: JSON parse checks before and after raw edits for Lorehold raw files and relevant generated JSON.
- Baseline: `npm.cmd run validate:source-generated -- --targets=LOREHOLD` passed with one model-owned inhibitor warning before raw edits.
- Expected stale-generated failure after raw edits and before rebuild: validator flagged generated Lorehold good/poor/inhibitor/discriminator surfaces as stronger than raw.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshot.
- Passed: `npm.cmd run build:factions -- --context-targets=LOREHOLD`.
- Passed: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK` with one Lorehold model-owned inhibitor warning.
- Passed: final probe confirmed `UR` and `RG` mechanics remain non-empty.
- Passed: `npm.cmd run test:source-generated` with the expected default Jeskai/Mardu model-owned warnings.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Known unrelated residual only: `npm.cmd run test:placement`.
- Passed: scoped `git diff --check`.
- Passed: focused trailing-whitespace scan over touched files.

## Not Touched

- No web search.
- No raw Lorehold claims or sources changes.
- No `data/factions.json` accepted changes.
- No `data/placement-model.schema.json` accepted changes.
- No flavor snippet authoring.
- No Maze behavior, route behavior, public display copy, deck links, or source-generated validator policy changes.
- No generated placement output was hand-edited as source.
- No unrelated dirty worktree drift was staged, reverted, normalized, or cleaned.

## Follow-Up Recommendations

- Next recommended source-first target: `ABZAN`.
- Continue using VM-305 targeted context mode for future source-first passes whenever Supabase context must be reconciled.
- Keep the Temur color-order assertion as a dedicated residual until the Temur pass.

## Next Suggested Agent

JSON Cartographer for `ABZAN` source-first repair.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-307-lorehold-mechanics-signal-balance.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-306-ur-rg-mechanics-source-first-repair.md`
- `docs/kanban/done/VM-056-lorehold-identity-metaphysics.md`
