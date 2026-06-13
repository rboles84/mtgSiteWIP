# 2026-06-04 09:11 - Codex - VM-263 Ink Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Implement VM-263 as a controlled runtime/generated promotion of exactly one live key, `INK`, after verifying VM-262 approval fields, raw hash stability, and the current live baseline from repo truth.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2236-codex-vm258-ink-source-packet.md`
- `docs/handoffs/2026-06-04-0005-codex-vm259-ink-identity-metaphysics.md`
- `docs/handoffs/2026-06-04-0705-codex-vm260-ink-docs-parity-fill.md`
- `docs/handoffs/2026-06-04-0754-codex-vm261-ink-non-live-raw-packet.md`
- `docs/handoffs/2026-06-04-0815-codex-vm262-ink-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-263-ink-controlled-runtime-promotion.md`
- VM-245, VM-251, and VM-257 promotion precedent surfaces
- `data/raw-factions/ink/*.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/build-archscry-flavor-snippets.mjs`
- Generated output targets under `data/` and `supabase/functions/guild-recruiter/`

## Exact Precedent-Derived File List

Source and test files:

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/build-archscry-flavor-snippets.mjs` read-only; no VM-263 edit was needed

Generated outputs refreshed only by approved scripts:

- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json` was written by `build:factions` but produced no final tracked diff
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Bookkeeping:

- `docs/kanban/board.md`
- `docs/kanban/done/VM-263-ink-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0911-codex-vm263-ink-controlled-runtime-promotion.md`

## Files Changed

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-263-ink-controlled-runtime-promotion.md`
- `docs/kanban/backlog/VM-263-ink-controlled-runtime-promotion.md` deleted as part of normal Kanban move
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0911-codex-vm263-ink-controlled-runtime-promotion.md`

## What Changed

- Promoted exactly one new live/generated key: `INK`.
- Added Ink to `data/identity-layers.json` as an active four-color expression with technical `core_color: "RGWU"`, colors `["R", "G", "W", "U"]`, aliases restricted to `["INK"]`, `preview_eligible: false`, and Commander directory links suppressed.
- Added Ink placement model support in `research/build-faction-artifacts.mjs`, including biological priors, lateral inhibition, live placement guidance, gate answers, and two Ink Hall questions.
- Added Ink Commander guidance in `assets/js/commander-dossier.js`, preserving Altruism only as paired display/support framing.
- Added Ink presentation copy in `assets/js/archscry-presentation.js`.
- Added an Ink-specific Maze link suppression guard so Ink can be live/placement-generated without producing `/maze/` handoff links or RGWU exact commander Maze URLs.
- Added Ink runtime assertions to `assets/js/quick-reading-tests.js` and `research/archscry-dossier-followup-tests.js`.
- Refreshed generated artifacts with `npm.cmd run build:factions` and `node research\build-archscry-flavor-snippets.mjs`.
- Moved VM-263 to Done and updated this handoff index.

## Why It Changed

VM-262 approved the VM-261 raw packet for future controlled promotion planning only. VM-263 independently verified the approval fields, raw hash stability, and current baseline before promoting `INK` as the only new live/generated key.

## Decisions Made

- Current pre-edit live/generated baseline was 33, not assumed from plan text. VM-263 targeted baseline + 1 and reached 34 with `INK` as the only new live/generated key.
- `INK` can be placement-eligible through the generated placement model path, matching Yore/Glint/Dune promotion precedent.
- Home preview membership remains unchanged at 20; `preview_eligible` remains false for Ink.
- Commander directory links remain suppressed for Ink.
- Ink personalized Maze links are disabled in `archscry-presentation.js` to satisfy the VM-263 guardrail that RGWU/permutations must not appear in Home/Maze links or handoff URLs.
- `Ink / Altruism` remains display/support framing. `Altruism` was not created as an alias, key, route, canonical name, or independent faction identity.
- RGWU appears only in technical metadata/query-only contexts such as `core_color`, routing color identity, and deck-search color metadata.

## Baselines And Hashes

Pre-edit baseline from repo truth:

- identity expressions: 33
- active identity expressions: 33
- generated factions: 33
- placement entries: 33
- flavor snippet entries: 33
- Home preview entries: 20
- `INK`, `WITCH`, `RGWU`, `WURG`, and `ALTRUISM` absent from generated/live key sets

Post-edit baseline:

- identity expressions: 34
- active identity expressions: 34
- generated factions: 34
- placement entries: 34
- flavor snippet entries: 34
- Home preview entries: 20
- `INK` present in identity/factions/placement/flavor and absent from Home preview
- `WITCH` absent

Ink raw hashes matched VM-262 before and after:

- `ink.changelog.json`: `323A051B3D81042A0BE7A9A7EA09F787D7B59698519D46C9AC9F4CB575D3B944`
- `ink.claims.json`: `C2EF1FE2BD91143FC6FDE493DBC0A9DA3CA5164BB62B2D38BA9557D8864C7648`
- `ink.placement.json`: `2AF6CDFC6B968F88563FE57093C37841330F2BB98AED7FA4336B210ED35E0081`
- `ink.profile.json`: `8B909D19076A54F87F411A63441A9A76E86F717B069AD424B75DDB14DDCE5408`
- `ink.sources.json`: `43635671422B31611A56228A21A86783AE7F350AD964510053BD7CEFF365275A`

## Risks / Uncertainties

- The repo remains broadly dirty with many pre-existing tracked and untracked changes outside VM-263 scope. These were observed and left untouched.
- `research/build-archscry-flavor-snippets.mjs` was already dirty before VM-263 and was not edited by this pass.
- `git status --short` reports permission warnings reading `C:\Users\obake/.config/git/ignore`; this did not block status or validation.
- `git diff --check` passed with line-ending warnings only.

## Tests Run

- `node --check research\build-faction-artifacts.mjs`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:presentation-snapshots`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run audit:factions`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run test:parser`
- `git diff --check`
- Post-generation baseline validator
- Post-generation route/alias/preview/permutation validator
- `Get-FileHash data\raw-factions\ink\*.json -Algorithm SHA256`
- Route/file absence checks for `ink.html`, `/ink/`, `docs/architecture/colors/witch/`, and `data/raw-factions/witch/`

## Not Touched

- Ink raw packet JSON files
- Ink research packet files
- Ink architecture docs
- Canon files
- Home/Maze route files
- Route config, redirects, sitemap entries, navigation links, page-specific CSS/JS, and hero assets
- Witch cards, Witch docs, Witch raw data, or any VM-264+ implementation work
- Unrelated dirty files outside VM-263 scope

## Follow-Up Recommendations

- Treat Ink as promoted and live through the generated placement model, but keep Home preview, hero rollout, and route/page expansion out of scope until explicit future cards.
- If future work wants public Ink routes, Maze exact-query paths, or hero assets, require a new card with its own baselines and guardrails.
- Next four-color lane on the board is VM-264 Witch Source Packet And Evidence Ledger; do not start it without an explicit user request.

## Next Suggested Agent

Kanban Steward or Planning Architect for VM-264 only if the user explicitly starts Witch work.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-263-ink-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-262-ink-review-gate.md`
- `docs/handoffs/2026-06-04-0815-codex-vm262-ink-review-gate.md`
- `docs/handoffs/2026-06-04-0754-codex-vm261-ink-non-live-raw-packet.md`

## VM-332 Supersession Addendum

VM-263's no-Ink-Maze-links suppression remains preserved as historical policy. VM-332 supersedes that single suppression after VM-330 verified `INK` Layer 1 authority, allowing Ink Maze/dossier exact commander handoffs with the technical query `id=rgwu is:commander f:commander`.

The VM-263 public-interface guardrails still stand: `RGWU` is technical/query-only and must not become a public alias, public route, Home preview entry, hero mapping, navigation key, color-code directory, or user-facing identity label.
