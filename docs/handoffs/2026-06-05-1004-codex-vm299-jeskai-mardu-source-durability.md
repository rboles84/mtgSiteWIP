# 2026-06-05 10:04 - Codex - VM-299 Jeskai/Mardu Source Durability

## Agent Name

Codex

## Task Requested

Implement VM-299: repair Jeskai and Mardu source durability after VM-297 audited VM-294/VM-296 and classified their generated/display edits as useful but non-durable until ported back to raw-owned sources.

## Pre-Flight Summary

- Recent related work: VM-294 and VM-296 edited generated/display Jeskai and Mardu data directly; VM-297 audited that as source-of-truth contamination; VM-298 established the source-first repair pattern for Witch.
- Current known risks: the worktree was broadly dirty before VM-299; generated files already carried large unrelated diffs; `npm.cmd run test:placement` had a known unrelated Temur Maze query wording residual.
- Relevant decisions already made: Jeskai and Mardu are live as exactly `JESKAI` and `MARDU`; color-code variants remain metadata/query-only; VM-300 owns guardrails/drift checks, not VM-299.
- Files recently changed by suspect passes: VM-294 touched Jeskai generated/display artifacts and flavor snippets; VM-296 touched Mardu generated/display artifacts.
- What should not be touched: Witch, Yore, Dune, Glint, Ink, five-color, colorless, Home, Maze, routes, schema design, VM-300 guardrails, and unrelated dirty worktree changes.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`
- `docs/handoffs/2026-06-05-0843-codex-vm297-placement-source-of-truth-audit.md`
- `docs/handoffs/2026-06-05-0929-codex-vm298-witch-source-durability-repair.md`
- `docs/kanban/done/VM-234-jeskai-way-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- Jeskai and Mardu raw profile/placement/claims/sources JSON
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `assets/js/quick-reading-tests.js`

## Files Changed

- `assets/js/quick-reading-tests.js`
- `data/archscry-flavor-snippets.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/raw-factions/jeskai/jeskai.claims.json`
- `data/raw-factions/jeskai/jeskai.placement.json`
- `data/raw-factions/jeskai/jeskai.profile.json`
- `data/raw-factions/jeskai/jeskai.sources.json`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.sources.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-299-jeskai-mardu-source-durability-repair.md`
- `docs/handoffs/2026-06-05-1004-codex-vm299-jeskai-mardu-source-durability.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `supabase/functions/guild-recruiter/faction-context.ts`

## What Changed

- Created and closed the VM-299 Kanban card, moving it from `in-progress` to `done`.
- Added builder-readable Jeskai and Mardu raw profile `profile` blocks with ten promoted raw claim IDs each.
- Updated Jeskai and Mardu raw lifecycle/profile/placement metadata to `0.1.1`, live-pilot placement state, and ten-claim source floors.
- Added `placement_model_version: "0.1.1"` to both raw placement packets so generated `source_metadata.placement_model_version` no longer stays empty or generated-only.
- Ported source-backed placement calibration, good/poor fit indicators, discriminator details, and suppress/strengthen guardrails into raw placement files.
- Updated the first Jeskai and Mardu lifecycle claims and sources to record the later VM-234/VM-228 runtime promotion decisions without treating those project decisions as lore evidence.
- Regenerated faction artifacts and flavor snippets through approved builders.
- Accepted generated object changes only for `JESKAI` and `MARDU` in `data/factions.json`, `data/placement-model.json`, and `faction-context.ts`; accepted only `JESKAI` flavor snippet changes.
- Restored non-target generated Supabase `WITCH` context drift from the pre-build snapshot.
- Updated the Mardu placement test expectation to include the newly source-backed `JESKAI` collision target.

## Why It Changed

VM-297 found that VM-294/VM-296 had useful Jeskai/Mardu data in generated/display artifacts, but the durable raw sources did not carry equivalent builder-owned metadata, claim IDs, calibration, discriminator details, or provenance. VM-299 moves supported material into raw-owned files so future builder runs reproduce the output instead of erasing or overstating it.

## Decisions Made

- Update source review dates only for raw files actually reviewed/edited during VM-299.
- Do not preserve Jeskai/Mardu deck links or EDHREC slugs merely because they existed in generated/display output; the builder now leaves those target fields empty.
- Keep existing `raw_enrichment` blocks because their cited rows resolve through raw claims and source evidence rows.
- Treat VM-234/VM-228 as runtime-lifecycle-only project sources, not lore evidence.
- Do not edit builders, schemas, Home, Maze, routes, or VM-300 guardrails.
- Leave the unrelated Temur Maze query wording residual unfixed.

## Risks / Uncertainties

- The worktree remains broadly dirty with many unrelated modified, deleted, and untracked files outside VM-299.
- `data/factions.json`, `data/placement-model.json`, `faction-context.ts`, and `quick-reading-tests.js` already include large unrelated diffs from prior work; VM-299 used a temporary generated-artifact snapshot to prove accepted generated object drift was scoped.
- Exact mechanics, full biographies, Commander legality, detailed Dragonstorm chronology, and unsupported card facts remain manual-fill/support-only unless separately promoted.
- No dedicated Supabase/Deno/TypeScript check was found; the generated `FACTION_CONTEXT` object was parsed by focused validation instead.

## Tests Run

- `npm.cmd run build:factions` - passed; built 35 faction placement records and wrote generated artifacts.
- `node research\build-archscry-flavor-snippets.mjs` - passed; wrote snippets for 35 factions.
- `node -e "require('./data/raw-factions/jeskai/jeskai.profile.json'); require('./data/raw-factions/jeskai/jeskai.placement.json'); require('./data/raw-factions/mardu/mardu.profile.json'); require('./data/raw-factions/mardu/mardu.placement.json'); require('./data/factions.json'); require('./data/placement-model.json'); require('./data/archscry-flavor-snippets.json'); console.log('json parse OK')"` - passed, `json parse OK`.
- `node --check research\build-faction-artifacts.mjs` - passed.
- `node --check research\build-archscry-flavor-snippets.mjs` - passed.
- Focused source/generated validation - passed, `VM-299 focused source/generated validation OK`.
- `node research\archscry-dossier-followup-tests.js` - passed, `PASS archscry dossier follow-up tests`.
- `node research\maze-search-tests.js` - passed, `Maze search metadata helper cases passed.`
- `node --check assets\js\quick-reading-tests.js` - passed.
- Expanded JSON parse for touched raw/generated files - passed, `expanded json parse OK`.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- ...` on VM-299 paths - passed with LF-to-CRLF warnings only.
- `npm.cmd run test:placement` - failed on the known unrelated Temur residual only after the focused Mardu assertion update.

Exact unrelated residual from `npm.cmd run test:placement`:

```text
Maze Query Identity And Mono Boundary Preservation
AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
+ actual - expected

+ 'Temur Frontier commanders with exactly green-blue-red identity'
- 'Temur Frontier commanders with exactly blue-red-green identity'

at file:///C:/dev/mtgSiteWIP/assets/js/quick-reading-tests.js:3327:8
```

## Not Touched

- Witch raw files and final Witch generated object state.
- Yore, Dune, Glint, Ink, five-color, and colorless lanes.
- Home, Maze implementation, routes, schema design, builders, VM-300 guardrails, and unrelated broad worktree changes.
- Mardu flavor snippets, except for validation that they remained source-backed.

## Follow-Up Recommendations

- VM-300 should add raw/generated drift checks and generated-authoring guardrails so this contamination pattern is caught automatically.
- Open or reuse a separate Temur card for the remaining Maze query wording residual in `test:placement`.
- Consider a future builder cleanup to consistently consume `placement_profile_version` or `placement_model_version` across old and new raw packet shapes.

## Next Suggested Agent

Test Strategist for VM-300 guardrails and the separate Temur residual, after owner approval.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-299-jeskai-mardu-source-durability-repair.md`
- `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`
- `docs/handoffs/2026-06-05-0843-codex-vm297-placement-source-of-truth-audit.md`
- `docs/handoffs/2026-06-05-0929-codex-vm298-witch-source-durability-repair.md`
- `docs/kanban/done/VM-294-jeskai-placement-data-quality-authoring-pass.md`
- `docs/kanban/done/VM-296-mardu-placement-data-quality-authoring-pass.md`
- `docs/kanban/done/VM-234-jeskai-way-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-228-mardu-horde-controlled-runtime-promotion.md`
