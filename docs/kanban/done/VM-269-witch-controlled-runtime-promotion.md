# VM-269 - Witch Controlled Runtime Promotion

ID: VM-269
Title: Witch Controlled Runtime Promotion
Status: done
Reservation State: Executed / Closed
Type: Runtime / Controlled Promotion
Area: Four-Color, Witch, Archscry
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Promoted exactly one public/live key, `WITCH`, after VM-268 review approval. The rollout used the selected live-with-Maze mode, kept `GWUB` as technical metadata/query identity, preserved Home preview membership, and did not add public color-code aliases, public routes, hero assets, or raw JSON changes.

## Scope Completed

- Added `WITCH` to the live identity registry with catalog/display framing `Witch / Growth`, runtime/Maze label `Witch`, `core_color: "GWUB"`, existing four-color color-member fields set to `["G", "W", "U", "B"]`, `placement_eligible: true`, and `preview_eligible: false`.
- Extended the existing four-color raw-to-live builder path for `witch -> WITCH`, with Witch-only placement copy, lateral inhibition targets, gate answers, and Hall questions.
- Regenerated `data/factions.json`, `data/placement-model.json`, `data/archscry-flavor-snippets.json`, and `supabase/functions/guild-recruiter/faction-context.ts` through approved build scripts.
- Extended Commander dossier, Archscry presentation, Maze handoff normalization, quick-reading, dossier follow-up, and Maze tests for live WITCH behavior.
- Preserved raw Witch JSON hashes exactly as approved in VM-268.

## Explicit Non-Goals

- Do not hand-edit generated outputs.
- Do not add public color-code aliases, route keys, or extra four-color live keys.
- Do not bundle unrelated four-color promotion work into VM-269.
- Do not add Home preview membership, `/witch/`, `/gwub/`, `/wubg/`, `/growth/`, a Witch hero rollout, or a separate `GWUB`, `WUBG`, `Growth`, or permutation Supabase entry.

## Dependencies

- VM-264 through VM-268 were Done before execution.
- VM-268 recorded verdict `review-approved-for-future-promotion-planning`.

## Acceptance Criteria

- [x] A future execution pass promotes exactly one live key: `WITCH`.
- [x] Generated files change only through approved build scripts.
- [x] `GWUB` and permutations remain metadata/query-only after promotion.
- [x] Home preview remains unchanged at 20 entries.
- [x] Raw Witch JSON hashes remain unchanged from VM-268 approval.
- [x] WITCH exact Commander Maze query resolves to `id=gwub is:commander f:commander`.
- [x] No `/witch/`, `/gwub/`, `/wubg/`, `/growth/`, public color-code alias, Home preview entry, or Witch hero asset rollout was added.

## Validation Notes

- Passed: syntax checks for touched JS/MJS files, approved generation scripts, WITCH focused live-promotion validator, raw hash check, route/hero leakage scan, `node research\archscry-dossier-followup-tests.js`, `node research\maze-search-tests.js`, `npm.cmd run audit:factions`, `npm.cmd run test:presentation-snapshots`, and `npm.cmd run test:parser`.
- Residual unrelated failure: `npm.cmd run test:placement` and `npm.cmd test` fail on an existing Temur wording assertion expecting `blue-red-green` while runtime emits `green-blue-red`. VM-269 did not repair this unrelated Temur suite.
