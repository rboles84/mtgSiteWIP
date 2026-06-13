# 2026-06-09 08:51 - Codex - VM-302 DUNE Source-First Authoring

## Agent Name

Codex

## Task Requested

Implement VM-302 from the approved DUNE source-first authoring plan, using VM-300 output as the stop/acceptance gate and avoiding web search, Witch work, generated-file hand patching, schema redesign, or downstream faction authoring.

## Pre-Flight Summary

- Recent related work: VM-252 created the DUNE source packet; VM-255 created the non-live raw packet; VM-256 approved future controlled promotion planning; VM-257 promoted exactly one live key, `DUNE`; VM-279 repaired DUNE Maze query/deck-link hygiene; VM-300 added source/generated guardrails; VM-301 repaired YORE source durability.
- Current known risks: the worktree was already broadly dirty; `data/raw-factions/dune/` remains untracked; `npm.cmd run test:placement` still has the known unrelated Temur color-order residual; `build:factions` still rewrites non-target Supabase context sections.
- Relevant decisions already made: durable placement/profile authoring belongs in `data/raw-factions/**`; generated placement, generated Supabase context, and generated flavor output are not source truth; `data/factions.json` cannot prove placement or claim-backed profile fields.
- Files recently changed by related work: DUNE raw/research/card docs, VM-300 validator/docs/scripts, VM-301 YORE raw and generated placement output, and four-color live presentation files.
- What should not be touched: no web research, no Witch/Glint/Ink authoring, no direct generated placement edits, no generated flavor edits, no schema redesign, no Home/Maze/routes, no Temur residual fix, and no unrelated dirty worktree cleanup.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/handoffs/2026-06-09-0820-codex-vm301-yore-source-first-authoring.md`
- `docs/kanban/done/VM-252-dune-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-255-dune-non-live-raw-packet.md`
- `docs/kanban/done/VM-256-dune-review-gate.md`
- `docs/kanban/done/VM-257-dune-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-279-dune-maze-query-and-archidekt-only-deck-link-repair.md`
- `docs/handoffs/2026-06-03-0655-codex-vm252-dune-source-packet.md`
- `docs/handoffs/2026-06-03-1700-codex-vm255-dune-non-live-raw-packet.md`
- `docs/handoffs/2026-06-03-1920-codex-vm256-dune-review-gate.md`
- `docs/handoffs/2026-06-03-2137-codex-vm257-dune-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-2236-codex-vm279-dune-maze-query-archidekt-links.md`
- `docs/research/dune/dune-evidence-ledger.md`
- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `data/raw-factions/yore/yore.sources.json`
- `data/raw-factions/yore/yore.claims.json`
- `data/raw-factions/yore/yore.profile.json`
- `data/raw-factions/yore/yore.placement.json`
- `data/raw-factions/yore/yore.changelog.json`
- `research/build-faction-artifacts.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `data/placement-model.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/handoffs/2026-06-09-0851-codex-vm302-dune-source-first-authoring.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added the VM-257 runtime-promotion card as a DUNE lifecycle-only source record.
- Updated `dune_claim_0001` to reflect that VM-257 made `DUNE` live while `BRGW`, `WBRG`, and same-color permutations remain metadata/query-only.
- Bumped raw DUNE profile/placement source-durability metadata to `0.1.1` and `2026-06-09`.
- Added builder-readable `profile.claim_ids` so generated `source_metadata.claim_count` is backed by raw profile state.
- Added approved/source-bounded mechanics summary from DUNE evidence rows, using support-only rows only as labeled profile texture.
- Source-backed the live DUNE good-fit, poor-fit, inhibitor, calibration, and discriminator fields that VM-300 reported as generated-only.
- Rebuilt placement artifacts and accepted only the DUNE object drift in `data/placement-model.json`.
- Restored `supabase/functions/guild-recruiter/faction-context.ts` to its pre-build snapshot because the rebuild also changed YORE and WITCH context output.

## Why It Changed

VM-300 showed that live/generated DUNE placement output was stronger and more complete than raw source backing. VM-302 repairs that by moving durable placement/profile language into raw DUNE source files, then accepting only generated output that follows from those raw edits.

## Evidence Rows Used

- Claim-bearing/source-bound rows used for durable claims and placement/profile boundaries: `DUNE-EVID-001`, `DUNE-EVID-002`, `DUNE-EVID-003`, `DUNE-EVID-004`, `DUNE-EVID-007`, `DUNE-EVID-010`.
- Support-bound rows used only for labeled profile/mechanics texture: `DUNE-EVID-005`, `DUNE-EVID-006`.
- Discovery-only, manual-fill, and unsupported polished draft material remained excluded from proof.

## Generated Objects Accepted Or Rejected

- Accepted: `data/placement-model.json` DUNE object only.
- Rejected/restored: `supabase/functions/guild-recruiter/faction-context.ts`.
- Unchanged after build snapshot comparison: `data/placement-model.schema.json`, `data/factions.json`, `data/archscry-flavor-snippets.json`.
- WITCH Supabase context drift appeared again during `build:factions`; YORE context drift also appeared. The exact restored file path was `supabase/functions/guild-recruiter/faction-context.ts`.

## Decisions Made

- Kept exactly five DUNE claims; no new claims were added.
- Treated VM-257 as runtime-lifecycle-only source backing, not lore, card, Commander, deck-link, or public color-code authority.
- Used `DUNE-EVID-005` and `DUNE-EVID-006` only for support-bound mechanics/profile texture, not raw lore proof.
- Left `data/factions.json` out of scope because no specific stale DUNE display field needed repair to satisfy VM-300.
- Rejected the regenerated Supabase context diff because it included non-DUNE changes unrelated to VM-302.
- Did not run the Archscry flavor snippet builder because snippet inputs did not change.

## Risks / Uncertainties

- A future full `build:factions` acceptance still needs a separate Supabase context/source durability reconciliation, because current rebuild output changes YORE and WITCH context from the pre-VM-302 snapshot.
- `data/raw-factions/dune/` remains untracked in this dirty worktree, so review should inspect raw file content rather than relying on tracked diff alone.
- The known Temur color-order assertion still fails `npm.cmd run test:placement`.
- Supabase context does not include the new DUNE source-durable context changes because the broad context rewrite was rejected to avoid YORE/WITCH drift.
- `npm.cmd run test:source-generated` still passes with the existing default-target model-owned inhibitor warnings for Jeskai and Mardu.

## Tests Run

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: pre-edit JSON parse for DUNE raw files plus generated JSON
- Pass: pre-DUNE `npm.cmd run validate:source-generated -- --targets=YORE`
- Expected fail: baseline `npm.cmd run validate:source-generated -- --targets=DUNE`
- Pass: post-edit JSON parse for DUNE raw files
- Pass: `npm.cmd run build:factions`
- Pass: generated snapshot comparison showing only DUNE changed in `data/placement-model.json`
- Pass: context restore check for `supabase/functions/guild-recruiter/faction-context.ts`
- Pass: final `npm.cmd run validate:source-generated -- --targets=YORE,DUNE`
- Pass: post-build JSON parse for touched raw/generated JSON
- Pass with existing default-target warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement`

Known `test:placement` residual:

```text
Expected: Temur Frontier commanders with exactly blue-red-green identity
Actual:   Temur Frontier commanders with exactly green-blue-red identity
```

## Not Touched

- No web search.
- No `data/factions.json` authoring.
- No generated placement hand edits.
- No generated flavor output edits or flavor rebuild.
- No schema shape changes.
- No accepted Supabase context drift.
- No Home, Maze, route, asset, frontend, or Temur residual fixes.
- No GLINT, INK, or WITCH source authoring.
- No staging, commits, resets, cleanup, or unrelated-file normalization.

## Follow-Up Recommendations

- Start GLINT only after confirming `npm.cmd run validate:source-generated -- --targets=DUNE` remains green.
- Create a separate card for the generated Supabase context isolation defect before accepting future broad context rewrites.
- Consider a future strict pass to raw-back the model-owned biological prior warnings for default `JESKAI,MARDU` if the team wants `test:source-generated` warning-free.

## Next Suggested Agent

JSON Cartographer for GLINT source-first authoring, gated by VM-300 after rechecking DUNE.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-0820-codex-vm301-yore-source-first-authoring.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
