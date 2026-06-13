# 2026-06-09 12:18 - Codex - VM-304 INK Source-First Authoring

## Agent Name

Codex

## Task Requested

Repair INK using the VM-300 source/generated guardrail pattern after confirming DUNE and GLINT remained green. Update only necessary INK raw source files, rebuild generated placement artifacts, accept only deterministic INK generated drift, restore any non-INK Supabase context drift, and document the pass.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-0820-codex-vm301-yore-source-first-authoring.md`
- `docs/handoffs/2026-06-09-0851-codex-vm302-dune-source-first-authoring.md`
- `docs/handoffs/2026-06-09-1025-codex-vm303-glint-source-first-authoring.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/kanban/done/VM-303-glint-source-first-authoring-pass.md`
- `docs/kanban/done/VM-258-ink-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-261-ink-non-live-raw-packet.md`
- `docs/kanban/done/VM-262-ink-review-gate.md`
- `docs/kanban/done/VM-263-ink-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-2236-codex-vm258-ink-source-packet.md`
- `docs/handoffs/2026-06-04-0754-codex-vm261-ink-non-live-raw-packet.md`
- `docs/handoffs/2026-06-04-0815-codex-vm262-ink-review-gate.md`
- `docs/handoffs/2026-06-04-0911-codex-vm263-ink-controlled-runtime-promotion.md`
- `docs/research/ink/ink-evidence-ledger.md`
- `docs/research/ink/ink-source-ledger.md`
- `docs/research/ink/ink-reliability-audit.md`
- `docs/research/ink/ink-manual-fill.md`
- `data/raw-factions/ink/ink.sources.json`
- `data/raw-factions/ink/ink.claims.json`
- `data/raw-factions/ink/ink.profile.json`
- `data/raw-factions/ink/ink.placement.json`
- `data/raw-factions/ink/ink.changelog.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`

## Files Changed

- `data/raw-factions/ink/ink.sources.json`
- `data/raw-factions/ink/ink.claims.json`
- `data/raw-factions/ink/ink.profile.json`
- `data/raw-factions/ink/ink.placement.json`
- `data/raw-factions/ink/ink.changelog.json`
- `data/placement-model.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-304-ink-source-first-authoring-pass.md`
- `docs/handoffs/2026-06-09-1218-codex-vm304-ink-source-first-authoring.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added `src_vm263_ink_runtime_promotion_20260604` as runtime-lifecycle-only provenance.
- Updated `ink_claim_0001` so VM-263 explains live INK status without becoming placement, lore, mechanics, Commander, deck-link, or discriminator evidence.
- Added builder-readable profile claim IDs and source-bounded mechanics summary.
- Source-backed generated INK placement language for `good_fit_indicators`, `poor_fit_indicators`, `inhibitor_traps`, discriminator supports/weakens, collision targets, evidence claim IDs, calibration lists, and false-positive guardrails.
- Regenerated `data/placement-model.json` with only the INK faction object changed.
- Restored `supabase/functions/guild-recruiter/faction-context.ts` to its pre-build snapshot after non-INK generated context drift appeared.
- Moved VM-304 from In Progress to Done and updated the handoff index.

## Why It Changed

VM-300 correctly found that generated INK placement/profile output was stronger than its raw source backing after VM-263 promotion. VM-304 repairs that by moving the live placement/profile backing into `data/raw-factions/ink/**` and then regenerating artifacts from source.

## Evidence Rows Used

- Claim-bearing/source-bound rows: `INK-EVID-001`, `INK-EVID-002`, `INK-EVID-003`, `INK-EVID-004`, `INK-EVID-007`, `INK-EVID-010`.
- Support-bound rows used only as labeled Commander/profile/mechanics texture: `INK-EVID-005`, `INK-EVID-006`.
- VM-263 was used only for lifecycle/live-status metadata.

## Generated Objects Accepted Or Rejected

- Accepted: `data/placement-model.json` INK object drift only.
- Rejected/restored: `supabase/functions/guild-recruiter/faction-context.ts`.
- No content drift accepted: `data/placement-model.schema.json`, `data/factions.json`, `data/archscry-flavor-snippets.json`.

## Decisions Made

- Kept exactly five INK claims.
- Did not create a sixth claim.
- Did not use VM-263 for placement axes, inhibitor traps, mechanics, lore, Commander identity, or discriminator support.
- Did not use `Altruism`, `Kynaios`, `Stalwart Unity`, `Ink-Treader`, `RGWU`, `WURG`, same-color identity, or discovery drafts as naming authority, lore proof, public aliases, or raw-claim proof.
- Preserved `data/factions.json` as out of scope for this pass.

## Risks / Uncertainties

- `build:factions` still rewrites non-target Supabase context sections. VM-304 restored `supabase/functions/guild-recruiter/faction-context.ts`, but this should be fixed in a separate isolation card before accepting future context rewrites.
- `npm.cmd run test:placement` still fails on the known unrelated Temur color-order assertion.
- `npm.cmd run test:source-generated` still emits existing Jeskai/Mardu model-owned inhibitor warnings from VM-300.
- The worktree remains broadly dirty from unrelated prior work.

## Tests Run

- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass: pre-edit, post-edit, and final JSON parse checks
- Pass: `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT`
- Expected fail before repair/build: `npm.cmd run validate:source-generated -- --targets=INK`
- Pass: raw five-claim backing check
- Pass: `npm.cmd run build:factions`
- Pass: generated snapshot comparison showing only INK changed in `data/placement-model.json`
- Pass: context restore check for `supabase/functions/guild-recruiter/faction-context.ts`
- Pass: `npm.cmd run validate:source-generated -- --targets=DUNE,GLINT,INK`
- Pass with existing default-target warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement` on Temur color-order assertion only
- Pass: scoped `git diff --check`
- Pass: scoped trailing-whitespace check

## Not Touched

- No web search.
- No `data/factions.json` authoring.
- No generated placement hand edits.
- No generated flavor output edits or flavor rebuild.
- No schema shape changes.
- No accepted Supabase context drift.
- No Home, Maze, route, asset, frontend, public-display, deck-link, or Temur residual fixes.
- No YORE, DUNE, GLINT, or WITCH source authoring.
- No staging, commits, resets, cleanup, or unrelated-file normalization.

## Follow-Up Recommendations

- Create a separate VM card for the generated Supabase context isolation defect before accepting future broad context rewrites.
- After the isolation card, continue the source-first queue from the next approved target rather than accepting broad generated context drift.
- Keep support-only INK rows and discovery drafts out of raw claims unless a future approved evidence-promotion card changes source roles.

## Next Suggested Agent

Kanban Steward or JSON Cartographer for a focused Supabase context isolation card.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-304-ink-source-first-authoring-pass.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/reference/source-generated-guardrails.md`
