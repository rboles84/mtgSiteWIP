# 2026-05-31 11:08 - Codex - VM-202 Abzan Controlled Runtime Promotion

## Agent

Codex

## Task Requested

Implement VM-202 - Abzan Controlled Runtime Promotion: promote the VM-201-approved Abzan raw packet into one live Archscry placement expression key, `ABZAN`, while keeping Home preview membership unchanged and preserving `WBG` plus all W/B/G permutations as metadata/query-only.

## Pre-Flight Summary

Reviewed `AGENTS.md`, `docs/handoffs/HANDOFF_INDEX.md`, recent Abzan/Jund/Naya/Temur handoffs, `docs/kanban/board.md`, related Kanban cards, Abzan VM-201 review gate, raw Abzan JSON, builder/runtime support files, and generated artifact patterns.

Recent related work:

- VM-200 created Abzan raw JSON as authored-but-not-live.
- VM-201 reviewed the Abzan raw packet and explicitly recorded `review-approved-for-future-promotion-planning`.
- VM-186 and VM-188 established the Jund/Naya controlled-promotion pattern.
- VM-207 Temur review work appeared during this task but is unrelated and was not touched.

Known risks:

- Dirty baseline already included untracked Abzan/Temur work and modified board/index files.
- `ABZAN` needed to become live without adding `WBG`, `abzan`, or permutations as public keys/aliases.
- Builder preservation of prior generated display data could keep stale Abzan mana-base metadata unless ABZAN follows the Naya expression-precedence path.
- `data/placement-model.schema.json` could be rewritten by the builder and had to be verified as schema-neutral.

Relevant decisions already made:

- `ABZAN` is the only new public/live expression key.
- `WBG` and W/B/G permutations remain metadata/query-only.
- Lowercase `abzan` is allowed only as raw folder/faction source id and `RAW_TO_KEY` input key.
- Claims and sources are immutable in VM-202.
- Home preview membership stays unchanged at 20 entries.

Files recently changed before VM-202:

- Abzan raw packet/docs/bookkeeping were untracked from VM-197 through VM-201.
- Temur source/raw/docs/bookkeeping were also untracked.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` were already modified.

What should not be touched:

- Abzan claims/sources, Abzan research docs, Abzan architecture docs, Home preview membership/source lists, route files, Maze routes, static pages, fixtures, Supabase config, unrelated schema source files, unrelated Temur files, and unrelated dirty/untracked baseline files.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1020-codex-vm201-abzan-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.changelog.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.changelog.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/done/VM-202-abzan-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-1108-codex-vm202-abzan-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`

`data/placement-model.schema.json` was rewritten by the builder but has no final diff.

## What Changed

- Added `abzan: "ABZAN"` to `RAW_TO_KEY`.
- Added `ABZAN` identity metadata as a White-centered Tarkir wedge with colors `["W", "B", "G"]`, `kind: "wedge"`, core color `W`, aliases exactly `["ABZAN"]`, placement eligible true, and preview eligible false.
- Updated Abzan raw profile/placement/changelog status metadata from review-gated to VM-202 live-pilot.
- Added Abzan biological-prior and lateral-inhibition tuning against `WB`, `WG`, `BG`, `BANT`, `NAYA`, `JUND`, and `WITHERBLOOM` with reciprocal links where the existing explicit structure required them.
- Added Abzan-specific gate and Hall questions for family endurance and ancestor/perennation duty while preserving existing fixed-answer snapshot indexes.
- Added Abzan presentation/dossier support copy, exact-query support through `wbg` operator metadata, and support-only precon fit summaries.
- Added Abzan mana-base support metadata so dossier follow-up audits can validate legal Commander land recommendations.
- Rebuilt generated faction, placement, snippet, and Supabase context outputs.
- Added Abzan-specific placement/dossier/audit tests for `ABZAN`, alias guardrails, Home-preview exclusion, exact query behavior, golden paths, and generated artifact counts.
- Created and closed the VM-202 Kanban card and updated the handoff index.

## Why It Changed

The VM-201 review gate approved the Abzan raw packet for future promotion planning. VM-202 was explicitly approved to promote Abzan live through the controlled Jund/Naya-style builder path, while preserving the raw evidence boundary and preventing color-code/runtime leakage.

## Decisions Made

- Kept `ABZAN` as the only public/live key.
- Did not add lowercase `abzan`, `WBG`, or any W/B/G permutation as expression keys, generated keys, aliases, route keys, fixture keys, placement keys, preview keys, Commander public identity labels, or Home/Maze keys.
- Left `abzan.claims.json` and `abzan.sources.json` unchanged.
- Used Abzan-specific gate options appended to each Gate question, rather than inserted mid-list, so existing presentation snapshot answer indexes remain stable.
- Updated the builder so ABZAN, like NAYA, lets expression display data override stale generated display data.
- Kept `data/placement-model.schema.json` schema-neutral; final diff is empty.
- Did not stage or commit files.

## Dirty Baseline / Drift

Captured baseline before editing already included dirty/untracked Abzan and Temur work plus modified `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`.

After VM-202 began, these unrelated Temur VM-207 files appeared and were documented before continuing:

- `docs/handoffs/2026-05-31-1042-codex-vm207-temur-raw-packet-review-gate.md`
- `docs/kanban/done/VM-207-temur-frontier-raw-packet-review-gate.md`

They were not created or edited by VM-202.

## Raw Hash Guard

Pre-edit hashes:

- `abzan.sources.json`: `E883D6FD8860FC104DDA8DCDEE7CD0469C7D804F92B5D4D79FEC5B00034F624A`
- `abzan.claims.json`: `B4CBD6FC910BF1F0D9BD4CA8AD0776B30F5C4FDC21B858252DD4F07A11E325B5`

Post-edit hashes:

- `abzan.sources.json`: `E883D6FD8860FC104DDA8DCDEE7CD0469C7D804F92B5D4D79FEC5B00034F624A`
- `abzan.claims.json`: `B4CBD6FC910BF1F0D9BD4CA8AD0776B30F5C4FDC21B858252DD4F07A11E325B5`

Result: claims and sources are unchanged.

## Baseline And Final Counts

Pre-edit baseline:

- Live factions: 25
- Identity expressions: 25
- Placement records: 25
- Snippet keys: 25
- Home preview entries: 20

Final:

- Live factions: 26
- Identity expressions: 26
- Placement records: 26
- Snippet keys: 26
- Home preview entries: 20

`ABZAN` appears in generated factions, identity layers, placement model, snippets, and Supabase context. Home preview membership remains 20 and does not include `ABZAN`.

## Evidence Boundaries

- VM-202 did not add raw claims, source rows, evidence rows, or claim evidence mappings.
- VM-198/VM-199 architecture language shaped presentation/placement copy only.
- Commander/operator material remains support-only.
- Dromoka's brood remains a false-positive boundary, not Abzan Houses continuity.
- `WBG` remains metadata/query-only and is not a generated expression key.

## Tests Run

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
- Scoped route/Home/Maze lowercase leakage scan over `index.html`, `maze/index.html`, `assets/js/maze-handoff.js`, and Maze query tests: no `abzan`/WBG-permutation hits.
- Generated key/alias scan: no `WBG`, `WGB`, `BWG`, `BGW`, `GWB`, `GBW`, lowercase equivalents, or lowercase `abzan` as generated keys/aliases.
- Scoped `git diff --check` on VM-202 changed paths.
- `git diff -- data/placement-model.schema.json`: no final schema diff.

## Not Touched

- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `docs/research/abzan/**`
- `docs/architecture/colors/abzan/**`
- Home preview membership/source lists
- Route files
- Maze routes
- Static pages
- Fixtures
- Supabase config
- Unrelated schema source files
- Unrelated Temur files

## Risks / Uncertainties

- The baseline remains dirty and contains untracked Abzan/Temur work from prior cards.
- `npm.cmd run audit:factions` scans the untracked Temur raw folder as well as Abzan; this is read-only audit output and did not modify Temur.
- Abzan's live support is deliberately minimal: no Home preview, no static route, no Maze route key, no fixture key, and no public color-code alias.

## Follow-Up Recommendations

- Open a separate Abzan post-promotion text hardening card only if visual/readability copy needs a second pass.
- Keep Temur VM-208 separate; do not reconcile Temur in Abzan follow-up work.
- If future Abzan Commander curation adds exact commander cards, require a separate evidence/support audit and keep it support-only unless a source row is promoted.

## Next Suggested Agent

Test Strategist or Documentation Steward for any post-promotion parity/hardening pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-202-abzan-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1020-codex-vm201-abzan-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`
