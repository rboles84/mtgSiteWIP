# 2026-05-31 16:31 - Codex - VM-208 Temur Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Implement VM-208 by promoting the VM-207-approved Temur raw packet to exactly one live Archscry expression key, `TEMUR`, while preserving `GUR` as metadata/query-only and keeping Home, Maze, route, schema, fixture, and hand-authored Supabase surfaces out of scope.

## Final Promotion Result

`promotion-complete-live-pilot`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-207-temur-frontier-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1042-codex-vm207-temur-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1024-codex-vm206-temur-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1108-codex-vm202-abzan-controlled-runtime-promotion.md`
- `data/raw-factions/temur/temur.sources.json`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/raw-factions/temur/temur.changelog.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/raw-factions/temur/temur.changelog.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`

## What Changed

- Promoted `TEMUR` as a live-pilot, placement-eligible, preview-ineligible wedge expression.
- Updated Temur raw status metadata only in `temur.profile.json`, `temur.placement.json`, and `temur.changelog.json`.
- Added `TEMUR` to `data/identity-layers.json` with `colors: ["G", "U", "R"]`, `core_color: "G"`, `routing.color_identity: "GUR"`, `routing.label: "Temur"`, and `aliases: ["TEMUR"]`.
- Added only `temur: "TEMUR"` to `RAW_TO_KEY`; no `gur`, `gru`, `ugr`, `urg`, `rgu`, or `rug` raw-to-live targets were added.
- Added Temur biological prior, minimum lateral inhibition boundaries, reciprocal inhibition entries required by the established pattern, Temur gate support, and Temur Hall questions.
- Added Temur presentation and Commander dossier guardrails using VM-206 raw packet themes and VM-203/VM-205 boundaries.
- Rebuilt generated faction, placement, flavor-snippet, and generated faction-context outputs using approved commands only.
- Updated VM-208 placement, presentation, dossier follow-up, alias/key, Home preview, and guard tests.
- Completed VM-208 Kanban bookkeeping and this handoff.

## Why It Changed

VM-207 approved the authored Temur raw packet for future VM-208 promotion planning. VM-208 was the controlled runtime promotion card that makes `TEMUR` a live placement expression while keeping `GUR` metadata/query-only and preserving preview, route, Maze, schema, fixture, and raw evidence boundaries.

## Baseline And Final Counts

- Baseline identity-layer placement-eligible expression count: 26
- Final identity-layer placement-eligible expression count: 27
- Baseline generated faction count: 26
- Final generated faction count: 27
- Baseline generated placement record count: 26
- Final generated placement record count: 27
- Baseline flavor snippet coverage count: 26
- Final flavor snippet coverage count: 27
- Home preview membership count: 20 before and after

## Raw Hash Preservation

VM-207-protected raw files remained byte-for-byte unchanged.

- `data/raw-factions/temur/temur.claims.json`: `C2C7839BE001619C2A5BEA0F2CAC2838FDC94C632AFFC3C7CC5888F79800E029`
- `data/raw-factions/temur/temur.sources.json`: `D2D2C96E40D78BE58E9BB5FA2AC414F6738074E611237C56412E9B551C4C3435`

Hash comparison was case-insensitive; content preservation was byte-for-byte.

## TEMUR Promotion Surfaces

- `data/identity-layers.json`: `TEMUR` expression added.
- `data/factions.json`: generated `TEMUR` faction record added.
- `data/placement-model.json`: generated `TEMUR` placement record added.
- `data/archscry-flavor-snippets.json`: generated `TEMUR` snippet coverage added.
- `supabase/functions/guild-recruiter/faction-context.ts`: generated `TEMUR` faction context added through `npm.cmd run build:factions`.

## GUR Metadata-Only Proof

- `GUR` appears as Temur color identity metadata and query support, including `routing.color_identity`.
- `GUR` and color-order permutations are absent as generated keys, aliases, route keys, fixture keys, public labels, and `RAW_TO_KEY` targets.
- `RAW_TO_KEY` includes only `temur: "TEMUR"` for Temur.
- Route scan found no `/temur/`, `/gur/`, `temur.html`, route-map `temur`, static page entry, or nav/Home/Maze route reference. The only matched route-like string was a negative test assertion in `assets/js/quick-reading-tests.js`.

## Home Preview Proof

- Home preview membership remained 20.
- `TEMUR` is not present in Home preview membership.
- No Home preview entry was replaced.

## Decisions Made

- `TEMUR` is the only live key promoted by VM-208.
- `GUR` remains color-direction metadata/query support only.
- Temur personalized Maze Commander query behavior continues to follow existing color-order normalization; VM-208 tests assert that behavior instead of changing Maze route logic.
- The Jund golden-path test was adjusted to preserve the Jund result after Temur gate options were added, without retuning Jund scoring.
- VM-208 did not run `npm.cmd run test:parser` because parser files did not change.

## Risks / Uncertainties

- The worktree has broad pre-existing dirty/untracked state from adjacent Abzan, Temur, and Sultai lanes. VM-208 relied on scoped diffs, protected hashes, and allowed-path checks rather than assuming a clean baseline.
- `supabase/functions/guild-recruiter/faction-context.ts` changed only as generated build output. Supabase config, migrations, deployment settings, and hand-authored files were not edited.

## Tests Run

- `node --check research\build-faction-artifacts.mjs`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- JSON parse check for Temur raw metadata files and `data/identity-layers.json`
- Protected raw hash check before editing
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Final count surface guard
- Final protected raw hash check
- GUR/key/alias/Home preview guard scans
- Route/Home/Maze/static route guard scan
- `git diff --name-only` scoped allowed-path review
- `git diff --check` on tracked VM-208 files
- Scoped trailing-whitespace scan on VM-208 changed files and new handoff/card files
- `git diff -- data/placement-model.schema.json` confirmed no final schema diff
- Final `git status --short` review against the noisy pre-existing baseline

## Not Touched

- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `docs/research/temur/**`
- `docs/research/temur frontier/**`
- `docs/architecture/colors/temur/**`
- Raw packets for other factions
- Home preview membership
- Static routes
- Maze files and Maze route behavior
- Schemas, fixtures, Supabase config, Supabase migrations, Supabase deployment settings, and hand-authored Supabase files

## Follow-Up Recommendations

- Human review VM-208 output before starting the next promotion lane.
- Treat VM-209 through VM-214 Sultai cards as planned backlog only until VM-208 is accepted.
- If further Temur copy polish is needed, open a separate post-promotion parity/hardening card rather than broadening VM-208.

## Next Suggested Agent

Human reviewer, then Planning Architect only after VM-208 output is accepted.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-207-temur-frontier-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1042-codex-vm207-temur-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1024-codex-vm206-temur-raw-faction-source-packet.md`
