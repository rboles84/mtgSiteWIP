# Agent Handoff - VM-168 Grixis Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Implement VM-168: promote Grixis from the VM-167 review-approved raw packet to one live Archscry placement expression key, `GRIXIS`, while keeping `UBR` as metadata only and preserving the Home preview at 20 entries.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-1119-codex-vm167-grixis-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-0932-codex-vm165-grixis-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-0851-codex-vm164-grixis-source-packet.md`
- `docs/handoffs/2026-05-30-0119-codex-vm167-esper-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `data/raw-factions/grixis/grixis.sources.json`
- `data/raw-factions/grixis/grixis.claims.json`
- `data/raw-factions/grixis/grixis.profile.json`
- `data/raw-factions/grixis/grixis.placement.json`
- `data/raw-factions/grixis/grixis.changelog.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/presentation-snapshot-tests.js`

## Files Changed

- `data/raw-factions/grixis/grixis.sources.json`
- `data/raw-factions/grixis/grixis.profile.json`
- `data/raw-factions/grixis/grixis.placement.json`
- `data/raw-factions/grixis/grixis.changelog.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/presentation-snapshot-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-168-grixis-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1621-codex-vm168-grixis-controlled-runtime-promotion.md`

## What Changed

- Promoted `GRIXIS` as a live shard expression in `data/identity-layers.json` with Alara world metadata, colors `["U", "B", "R"]`, core color `B`, preview disabled, and aliases `["GRIXIS", "grixis"]`.
- Updated only status/review/promotion metadata in the Grixis raw packet; `grixis.claims.json` was not edited.
- Added `grixis: "GRIXIS"` to `RAW_TO_KEY`.
- Added the Grixis biological prior and lateral inhibition targets `["BANT", "BR", "ESPER", "UB", "UR"]`, plus reciprocal links on Bant, Esper, UB, UR, and BR.
- Added two Grixis Hall questions for survival openings and volatile calculation.
- Rebuilt generated faction, placement, snippet, and Supabase context artifacts through the approved build paths.
- Updated placement and presentation regression tests for the 23-expression live baseline.

## Why It Changed

VM-167 approved the authored Grixis raw packet for future promotion planning. VM-168 was the controlled promotion slice that turns that packet into one live Archscry expression key without adding new lore sources, new claims, UBR aliases, routes, Maze behavior, Home cards, or manual Supabase edits.

## Decisions Made

- `GRIXIS` is the only new live key; `UBR` remains metadata language only.
- Grixis calibration uses the VM-164/VM-165 floor: survival, self-advocacy, Blue calculation, Red immediacy, volatility, and anti-generic-evil boundaries.
- The strongest Grixis gate evidence was tuned toward Red immediacy plus leverage so generic mono-Black and Dimir paths do not collapse into Grixis.
- The generated Supabase faction context was accepted only from `npm.cmd run build:factions`.
- Archscry snippets were regenerated because the current snippet contract expects snippets for each live faction key.

## Risks / Uncertainties

- The worktree was already dirty before VM-168. Pre-existing Bant/Esper/generated/runtime diffs and untracked Grixis/Esper source folders remain present and were not reverted.
- `UBR` appears as metadata and guardrail prose in Grixis-generated copy; validation confirms it is not a key or alias.
- `git diff --check` passes, but Git reports existing LF-to-CRLF working-copy warnings on several touched files.
- Grixis is now live as a controlled pilot, but future broad three-color/family expansion remains gated by separate work.

## Tests Run

- Hard-gate pre-check: 22 factions, 22 placement records, 22 identity expressions, Home preview 20, `GRIXIS` absent, `UBR` absent as key/alias.
- Parsed all five Grixis raw JSON files and `data/identity-layers.json`.
- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/quick-reading-tests.js`
- `npm.cmd run build:factions`
- `node research/build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd test`
- Final count check: 23 factions, 23 placement records, 23 active identity expressions, 23 snippets, Home preview 20.
- Raw claim check: 8 claims, `grixis_claim_0001` through `grixis_claim_0008`, evidence rows `GRIXIS-001` through `GRIXIS-008`.
- UBR guard checks: no `UBR` generated/live key, no `UBR` identity alias, no `UBR` `RAW_TO_KEY` target.
- Route/Home/Maze guard scan: no `grixis`, `GRIXIS`, `/grixis`, or `/ubr` hits in the checked route assets.
- Forbidden-claim scan: no direct forbidden claim strings found; broader hits are boundary/manual-fill wording only.
- `git diff --check`

## Not Touched

- `data/raw-factions/grixis/grixis.claims.json`
- Route CSS/JS behavior outside the placement test file
- Home carousel/card configuration beyond generated identity preview assertions
- Maze route behavior
- Static `/grixis/` or `/ubr/` pages
- Schema domain fields
- Manual Supabase source editing outside the generated context output
- New Grixis lore sources, new official captures, new Commander facts, or new raw evidence rows

## Follow-Up Recommendations

- Human-review the Grixis live-pilot placement behavior in Archscry before using VM-168 as precedent for the next shard/wedge.
- Keep future Grixis lore enrichment as a separate evidence-packet task; do not backfill detailed Bolas, Sedris, vis, unearth, geography, or Maestros material through runtime promotion work.
- When preparing a commit, preserve the pre-existing Bant/Esper dirty-worktree caveats and avoid mixing unrelated cleanup into the Grixis promotion narrative.

## Next Suggested Agent

Test Strategist or Product Reviewer for live Grixis smoke review and promotion acceptance notes.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-168-grixis-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-1119-codex-vm167-grixis-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-0932-codex-vm165-grixis-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-0851-codex-vm164-grixis-source-packet.md`
