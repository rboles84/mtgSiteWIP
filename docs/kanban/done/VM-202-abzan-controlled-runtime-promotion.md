# VM-202 - Abzan Controlled Runtime Promotion

## Status

Done - 2026-05-31

## Summary

Promoted Abzan Houses from the VM-201-approved raw packet into one live Archscry placement expression key: `ABZAN`.

## Scope

Allowed VM-202 edits were limited to Abzan raw status metadata, live/generated faction artifacts, the approved builder, Abzan-specific presentation/dossier/test support, and VM-202 Kanban/handoff bookkeeping.

## Decisions

- `ABZAN` is the only new public/live expression key.
- `WBG` and all W/B/G permutations remain metadata/query-only, not generated keys, aliases, route keys, Home preview keys, fixture keys, or Maze keys.
- Home preview membership remains unchanged at 20 entries.
- `abzan.claims.json` and `abzan.sources.json` hashes remained unchanged.
- Abzan was added through the approved builder path and remains outside Home preview membership, routes, Maze route keys, static pages, fixtures, schema fields, and Supabase config.
- Added Abzan-specific gate and Hall placement questions so ABZAN can resolve through positive family/endurance/ancestor/perennation evidence without stealing existing WB/WG/BG lanes.

## Dirty Baseline Note

Captured baseline already included dirty/untracked Abzan and Temur research/raw/bookkeeping work plus modified `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`.

During VM-202, two unrelated Temur VM-207 bookkeeping files appeared after the baseline:

- `docs/handoffs/2026-05-31-1042-codex-vm207-temur-raw-packet-review-gate.md`
- `docs/kanban/done/VM-207-temur-frontier-raw-packet-review-gate.md`

They were documented and left untouched by VM-202.

## Validation

- Baseline before edit: 25 factions / 25 identity expressions / 25 placement records / 25 snippet keys / 20 Home preview entries.
- Final: 26 factions / 26 identity expressions / 26 placement records / 26 snippet keys / 20 Home preview entries.
- `ABZAN` appears in generated factions, identity layers, placement model, snippets, and Supabase context.
- Home preview count remains 20 and does not include `ABZAN`.
- `data/placement-model.schema.json` has no diff.

## Tests

- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/quick-reading-tests.js`
- `npm.cmd run build:factions`
- `node research/build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Scoped `git diff --check`

## Not Touched

- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `docs/research/abzan/**`
- `docs/architecture/colors/abzan/**`
- Home preview membership/source lists
- Route files, Maze routes, static pages, fixtures, Supabase config, schema source files, and unrelated Temur files

## Follow-Up

VM-203+ Temur lane remains separate. Any Abzan post-promotion copy hardening should be a new card and must preserve the VM-202 alias/Home/route boundaries.
