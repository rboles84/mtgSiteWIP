# 2026-06-09 10:25 - Codex - VM-303 GLINT Source-First Authoring

## Agent Name

Codex

## Task Requested

Implement VM-303 from the approved GLINT source-first authoring instructions: confirm DUNE remains green, baseline GLINT against VM-300, repair GLINT through raw source only, rebuild generated artifacts, accept only deterministic GLINT placement output, reject non-target generated drift, and document the pass.

## Pre-Flight Summary

- Recent related work: VM-246 created the GLINT source packet, VM-249 created the conservative non-live raw packet, VM-250 approved future promotion planning, VM-251 promoted exactly one live key (`GLINT`), VM-276 added support-only card-data texture and live-state reconciliation, VM-277 polished presentation copy only, VM-300 added source/generated guardrails, VM-301 repaired YORE, and VM-302 repaired DUNE.
- Current known risks: the worktree remains broadly dirty; `data/raw-factions/glint/` is untracked; `build:factions` still rewrites non-target Supabase context sections; `npm.cmd run test:placement` still has the known unrelated Temur color-order residual.
- Relevant decisions already made: durable placement/profile authoring belongs in `data/raw-factions/**`; generated placement, generated Supabase context, and generated flavor output are not source truth; `data/factions.json` cannot prove placement or claim-backed profile fields.
- Files recently changed by related work: GLINT raw/research/card docs, VM-300 validator/docs/scripts, VM-301/302 YORE/DUNE raw and generated placement output, and four-color live presentation files.
- What should not be touched: no web research, no YORE/DUNE/INK/WITCH authoring, no direct generated placement edits, no generated flavor edits, no schema redesign, no Home/Maze/routes/public-display/deck-link work, no Temur residual fix, and no unrelated dirty worktree cleanup.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/handoffs/2026-06-09-0820-codex-vm301-yore-source-first-authoring.md`
- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/handoffs/2026-06-09-0851-codex-vm302-dune-source-first-authoring.md`
- `docs/kanban/done/VM-246-glint-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-249-glint-non-live-raw-packet.md`
- `docs/kanban/done/VM-250-glint-review-gate.md`
- `docs/kanban/done/VM-251-glint-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-276-glint-source-enrichment-and-downstream-lore-reconciliation.md`
- `docs/kanban/done/VM-277-glint-live-placement-copy-polish-and-precon-framing-repair.md`
- `docs/handoffs/2026-06-02-1825-codex-vm246-glint-source-packet.md`
- `docs/handoffs/2026-06-02-2226-codex-vm249-glint-non-live-raw-packet.md`
- `docs/handoffs/2026-06-03-0718-codex-vm250-glint-review-gate.md`
- `docs/handoffs/2026-06-03-1240-codex-vm251-glint-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-2059-codex-vm276-glint-source-enrichment-reconciliation.md`
- `docs/handoffs/2026-06-03-2122-codex-vm277-glint-placement-copy-polish.md`
- `docs/research/glint/glint-evidence-ledger.md`
- `docs/research/glint/glint-source-ledger.md`
- `docs/research/glint/glint-reliability-audit.md`
- `docs/research/glint/glint-manual-fill.md`
- `data/raw-factions/glint/glint.sources.json`
- `data/raw-factions/glint/glint.claims.json`
- `data/raw-factions/glint/glint.profile.json`
- `data/raw-factions/glint/glint.placement.json`
- `data/raw-factions/glint/glint.changelog.json`
- `research/build-faction-artifacts.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/raw-factions/glint/glint.sources.json`
- `data/raw-factions/glint/glint.claims.json`
- `data/raw-factions/glint/glint.profile.json`
- `data/raw-factions/glint/glint.placement.json`
- `data/raw-factions/glint/glint.changelog.json`
- `data/placement-model.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-303-glint-source-first-authoring-pass.md`
- `docs/handoffs/2026-06-09-1025-codex-vm303-glint-source-first-authoring.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added the VM-251 runtime-promotion card as a GLINT lifecycle-only source record.
- Updated `glint_claim_0001` to reflect that VM-251 made `GLINT` live while `UBRG` and same-color permutations remain metadata-query-only.
- Preserved exactly five GLINT claims.
- Bumped raw GLINT profile/placement source-durability metadata to `0.1.1` and `2026-06-09`.
- Added builder-readable `profile.claim_ids` so generated `source_metadata.claim_count` is backed by raw profile state.
- Added source-bounded mechanics summary using support-only rows only as labeled texture.
- Source-backed live GLINT inhibitor traps, calibration axes, good/poor fit backing, discriminator supports/weakens, collision targets, and claim references.
- Rebuilt placement artifacts and accepted only the GLINT object drift in `data/placement-model.json`.
- Restored `supabase/functions/guild-recruiter/faction-context.ts` to its pre-build snapshot because the rebuild also changed YORE, DUNE, and WITCH context output.

## Why It Changed

VM-300 showed that live/generated GLINT placement output was stronger and more complete than raw source backing. VM-303 repairs that by moving durable placement/profile language into raw GLINT source files, then accepting only generated output that follows from those raw edits.

## Evidence Rows Used

- Claim-bearing/source-bound rows used for durable claims and placement/profile boundaries: `GLINT-EVID-001`, `GLINT-EVID-002`, `GLINT-EVID-003`, `GLINT-EVID-004`, `GLINT-EVID-006`, `GLINT-EVID-010`.
- Support-bound rows used only for labeled profile/mechanics texture: `GLINT-EVID-005`, `GLINT-EVID-011`, `GLINT-EVID-012`.
- Discovery-only, manual-fill, shaping-only, and unsupported polished draft material remained excluded from proof.

## Generated Objects Accepted Or Rejected

- Accepted: `data/placement-model.json` GLINT object only.
- Rejected/restored: `supabase/functions/guild-recruiter/faction-context.ts`.
- Unchanged after build snapshot comparison: `data/placement-model.schema.json`, `data/factions.json`, `data/archscry-flavor-snippets.json`.
- Supabase context drift appeared again during `build:factions`; the diff included YORE, DUNE, GLINT, and WITCH sections. The exact restored file path was `supabase/functions/guild-recruiter/faction-context.ts`.

## Decisions Made

- Kept exactly five GLINT claims; no sixth claim was added.
- Treated VM-251 as runtime-lifecycle-only source backing, not lore, card, Commander, placement-axis, inhibitor-trap, mechanics, discriminator, deck-link, or public color-code authority.
- Used `GLINT-EVID-005`, `GLINT-EVID-011`, and `GLINT-EVID-012` only for support-bound mechanics/profile texture, not raw lore proof.
- Left `data/factions.json` out of scope because no specific stale GLINT display field needed repair to satisfy VM-300.
- Rejected the regenerated Supabase context diff because it included non-GLINT changes unrelated to VM-303.
- Did not run the Archscry flavor snippet builder because snippet inputs did not change.

## Risks / Uncertainties

- A future full `build:factions` acceptance still needs a separate Supabase context/source durability reconciliation, because current rebuild output changes YORE, DUNE, and WITCH context from the pre-VM-303 snapshot.
- `data/raw-factions/glint/` remains untracked in this dirty worktree, so review should inspect raw file content rather than relying on tracked diff alone.
- The known Temur color-order assertion still fails `npm.cmd run test:placement`.
- Supabase context does not include the new GLINT source-durable context changes because the broad context rewrite was rejected to avoid YORE/DUNE/WITCH drift.
- `npm.cmd run test:source-generated` still passes with the existing default-target model-owned inhibitor warnings for Jeskai and Mardu.

## Tests Run

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: pre-edit JSON parse for GLINT raw files plus generated JSON
- Pass: pre-GLINT `npm.cmd run validate:source-generated -- --targets=DUNE`
- Expected fail: baseline `npm.cmd run validate:source-generated -- --targets=GLINT`
- Pass: post-edit JSON parse for GLINT raw files
- Expected pre-build fail: `npm.cmd run validate:source-generated -- --targets=GLINT` failed only because generated metadata was not rebuilt yet
- Pass: `npm.cmd run build:factions`
- Pass: generated snapshot comparison showing only GLINT changed in `data/placement-model.json`
- Pass: context restore check for `supabase/functions/guild-recruiter/faction-context.ts`
- Pass: final `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT`
- Pass: post-build JSON parse for touched raw/generated JSON
- Pass with existing default-target warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement`
- Pass with LF-to-CRLF warnings only: scoped `git diff --check`
- Pass: scoped trailing-whitespace check

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
- No Home, Maze, route, asset, frontend, public-display, deck-link, or Temur residual fixes.
- No YORE, DUNE, INK, or WITCH source authoring.
- No staging, commits, resets, cleanup, or unrelated-file normalization.

## Follow-Up Recommendations

- Start INK only if final DUNE and GLINT VM-300 gates both remain green.
- Create a separate card for the generated Supabase context isolation defect before accepting future broad context rewrites.
- Keep support-only GLINT card/mechanics texture out of raw-claim proof unless a future approved evidence-promotion card changes the source-role policy.

## Next Suggested Agent

JSON Cartographer for INK source-first authoring, gated by VM-300 after rechecking DUNE and GLINT.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-303-glint-source-first-authoring-pass.md`
- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-0851-codex-vm302-dune-source-first-authoring.md`
- `docs/handoffs/2026-06-09-0820-codex-vm301-yore-source-first-authoring.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
