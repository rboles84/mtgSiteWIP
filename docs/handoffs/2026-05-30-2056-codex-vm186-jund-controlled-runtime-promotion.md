# Agent Handoff - VM-186 Jund Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Implement VM-186: promote Jund from the VM-180 review-approved raw packet to one live Archscry placement expression key, `JUND`, while keeping `BRG` as metadata only and preserving the Home preview at 20 entries.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-1922-codex-vm180-jund-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1852-codex-vm179-jund-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1621-codex-vm168-grixis-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-168-grixis-controlled-runtime-promotion.md`
- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.changelog.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/presentation-snapshot-tests.js`

## Files Changed

- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.changelog.json`
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
- `docs/kanban/done/VM-186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`

## What Changed

- Promoted `JUND` as a live shard expression in `data/identity-layers.json` with Alara world metadata, colors `["B", "R", "G"]`, core color `R`, preview disabled, and aliases `["JUND", "jund"]`.
- Updated only status/review/promotion metadata in the Jund raw packet; `jund.claims.json` was not edited.
- Added `jund: "JUND"` to `RAW_TO_KEY`.
- Added the Jund biological prior and lateral inhibition targets `["BR", "BG", "RG", "GRIXIS", "WITHERBLOOM"]`, plus reciprocal links on `BR`, `BG`, `RG`, `GRIXIS`, and `WITHERBLOOM`.
- Added two Jund Hall questions for instinct under pressure and appetite with consequence.
- Added a builder guard so dormant `_draft` collision guidance does not become live merely because a target identity is promoted.
- Rebuilt generated faction, placement, snippet, and Supabase context artifacts through the approved build paths.
- Updated placement, dossier, and presentation regression tests for the 24-expression live baseline.

## Why It Changed

VM-180 approved the authored Jund raw packet for future promotion planning. VM-186 was the controlled promotion slice that turns that packet into one live Archscry expression key without adding new lore sources, new claims, BRG aliases, routes, Maze behavior, Home cards, schemas, or Naya promotion work.

## Decisions Made

- `JUND` is the only new live key; `BRG` remains color-direction metadata language only.
- Jund calibration uses the VM-176/VM-179 floor: Red-centered self-truth, gut instinct, appetite, survival, Black self-interest, Green unrestrained instinct, and anti-flattening boundaries.
- The Jund overlap regression was tuned to a three-color pressure path rather than generic mono-Red immediacy, so Jund can win its own synthesis while mono-Red remains distinct.
- The generated Supabase faction context was accepted only from `npm.cmd run build:factions`.
- Archscry snippets were regenerated because the current snippet contract emits output for each live faction key.

## Risks / Uncertainties

- The worktree was already dirty before VM-186. Pre-existing shard and runtime diffs, plus untracked raw/source folders, remain present and were not reverted.
- `BRG` appears as descriptive color-composition metadata and debug family identity where appropriate; validation confirms it is not a live key, alias, route key, fixture key, public label, or `RAW_TO_KEY` target.
- `git diff --check` passes, but Git reports existing LF-to-CRLF working-copy warnings on several touched files.
- Jund is now live as a controlled pilot, but Home preview, routes, Maze-specific behavior, and broad shard/family expansion remain gated by separate work.

## Tests Run

- Hard-gate pre-check: 23 factions, 23 placement records, 23 identity expressions, Home preview 20, `JUND` absent, `BRG` absent as key/alias.
- Parsed all five Jund raw JSON files.
- `node --check research/build-faction-artifacts.mjs`
- `npm.cmd run build:factions`
- `node research/build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd test`
- Final count check: 24 factions, 24 placement records, 24 identity expressions, 24 snippet buckets, Home preview 20.
- Raw claim hash check: `data/raw-factions/jund/jund.claims.json` remained `eda50e0f55756014d80351ac36089474755ca501b73de5b11a4bfac8641fda82`.
- Raw claim integrity check: 10 claims, `jund_claim_0001` through `jund_claim_0010`, with the VM-180 evidence allowlist preserved.
- BRG guard checks: no `BRG` generated/live key, no `BRG` identity alias, no `BRG` `RAW_TO_KEY` target.
- Jund inhibition check: `JUND` reciprocates with `BR`, `BG`, `RG`, `GRIXIS`, and `WITHERBLOOM`.
- Guard checks for Home preview, route/static page additions, Naya promotion, raw source-role boundaries, unchanged schema files, and scoped diff boundaries.
- `git diff --check`
- ASCII/trailing-whitespace scans on VM-186 card and handoff files.

## Not Touched

- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/naya/`
- Naya research or architecture docs
- Static `/jund/` or `/brg/` pages
- Route maps, route CSS/JS, or Maze routes
- Home preview entries or Home card configuration
- Schema files or new identity/placement schema fields
- Manual Supabase source editing outside the generated context output
- New Jund lore sources, new official captures, new Commander facts, new card facts, new raw evidence rows, or new manual-fill conclusions

## Follow-Up Recommendations

- Human-review the Jund live-pilot placement behavior in Archscry before using VM-186 as precedent for the next shard or wedge promotion.
- Keep any Jund lore enrichment as a separate evidence-packet task; do not backfill detailed Alara geography, named figures, devour-as-total-identity, Modern Jund, or Commander/operator material through runtime promotion work.
- If Naya proceeds next, run its own controlled promotion from VM-185 without reusing Jund-specific BRG/JUND guard assumptions.

## Next Suggested Agent

Product Reviewer or Test Strategist for live Jund smoke review and promotion acceptance notes.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-1922-codex-vm180-jund-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1852-codex-vm179-jund-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1826-codex-vm178-jund-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-1812-codex-vm177-jund-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-1754-codex-vm176-jund-source-packet.md`
