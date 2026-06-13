# 2026-06-10 09:33 - Codex - VM-319 GRIXIS Source-First Display Enrichment

## Agent Name

Codex

## Task Requested

Implement VM-319: repair GRIXIS's remaining display-quality gap by adding source-backed display `raw_enrichment` without changing placement, raw Grixis source files, mechanics, routes, Maze behavior, flavor snippets, schemas, Home, or unrelated generated outputs.

## Pre-Flight Summary

Recent related work: VM-300 established source/generated guardrails; VM-305 added targeted Supabase context rebuilds; VM-317 and VM-318 established the shard display-enrichment pattern for BANT and ESPER; VM-164 through VM-193 made GRIXIS a live source-bound shard pilot with `UBR` kept metadata/query-only.

Current known risks: the worktree is broadly dirty with unrelated tracked and untracked drift; full `build:factions` can still rewrite unrelated Supabase context entries; `data/factions.json` is both a display input and generated merge output in the current builder flow.

Relevant decisions already made: GRIXIS is the only live public key; `UBR` is not a generated key or public alias; deck/research metadata is display/navigation only; named Grixis figures, geography, vis economy, Conflux detail, unearth-as-whole-identity, Maestros/New Capenna, and exact card/flavor text remain manual-fill, support-only, or comparator-only until a later evidence-promotion card.

Files recently changed by related work include `data/factions.json`, `data/identity-layers.json`, raw shard/faction files, generated placement/context files, tests, board, and handoff docs. VM-319 preserved unrelated drift and did not stage, revert, normalize, or clean unrelated files.

What should not be touched: GRIXIS raw claims, sources, placement, profile, changelog, placement axes, discriminator questions, inhibitor traps, mechanics, placement schema, generated placement output, generated flavor snippets, Maze behavior, routes, Home preview, public aliases, exact card/flavor text, and deck-research work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- VM-300, VM-305, VM-317, and VM-318 handoffs
- Grixis VM-164, VM-166, VM-167, VM-168, VM-173, VM-174, and VM-193 handoffs/cards
- `docs/research/grixis/**`
- `data/raw-factions/grixis/grixis.profile.json`
- `data/raw-factions/grixis/grixis.claims.json`
- `data/raw-factions/grixis/grixis.sources.json`
- `data/raw-factions/grixis/grixis.placement.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/factions.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-319-grixis-display-enrichment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-0933-codex-vm319-grixis-display-enrichment.md`

## What Changed

- Added `data/factions.json::factions.GRIXIS.raw_enrichment`.
- Mirrored 1 existing GRIXIS raw profile timeline entry.
- Kept `data/factions.json::factions.GRIXIS.raw_enrichment.key_figures` empty.
- Kept `data/factions.json::factions.GRIXIS.raw_enrichment.canonical_flavor_text` empty.
- Preserved existing GRIXIS `deck_links` and `research_links.edhrec_slug`.
- Created and completed VM-319 Kanban/handoff bookkeeping.

## Why It Changed

GRIXIS already had source-backed raw profile identity/setting material, non-empty mechanics, deck links, and research links, but public display `raw_enrichment` was missing. VM-319 surfaces the existing source-backed timeline floor through the display input without expanding Grixis lore or placement behavior.

## Source / Display Ownership Finding

`data/factions.json` is both display input and generated merge output in `research/build-faction-artifacts.mjs`. VM-318 established this path for the same shard display projection pattern because the builder preserves existing display copy for raw-managed factions and the builder meta reports `data/raw-factions plus data/factions.json display surface`. VM-319 therefore edited only `data/factions.json::factions.GRIXIS.raw_enrichment` as the approved display-source input for this field.

## Evidence / Claim IDs Mirrored

- Timeline claim IDs: `grixis_claim_0001` and `grixis_claim_0002`.
- Evidence rows: `GRIXIS-001` and `GRIXIS-002`.
- Source IDs are from the raw claims and source packet floor, not new VM-319 evidence rows.
- Skipped manual-fill/support-only candidates: Bolas, Sedris biography, Malfegor, Thraximundar, Kess, vis economy, geography, unearth-as-whole-identity, Maestros/New Capenna, Conflux/post-Conflux detail, and exact card/flavor text.

## Generated Objects Accepted / Restored

- Accepted `data/factions.json::factions.GRIXIS.raw_enrichment` as the source/display-input edit.
- Snapshot diff after build showed no content drift in `data/factions.json` beyond the already-applied VM-319 display input.
- Accepted no `data/placement-model.json` changes.
- Accepted no `data/placement-model.schema.json` changes.
- Accepted no `data/identity-layers.json` changes.
- Accepted no `data/archscry-flavor-snippets.json` changes.
- Full `npm.cmd run build:factions` rewrote unrelated `WITCH` Supabase context; restored `supabase/functions/guild-recruiter/faction-context.ts` from `C:\Users\obake\AppData\Local\Temp\vm319-grixis-20260610093126\faction-context.ts`.
- Ran `npm.cmd run build:factions -- --context-targets=GRIXIS`; final context had no changed context keys and was byte-identical to the restored snapshot.

## GRIXIS Hash Guard

- `data/raw-factions/grixis/grixis.claims.json`: `74A66735AFE1DAD6CE1F7C5C410080FB8A7EE153027A5F11F240923E6C373264`
- `data/raw-factions/grixis/grixis.sources.json`: `C1E833AE3A8A47606F38320BD16DEEB53DEA384C09677DB8269E6EA4E17D16E1`
- `data/raw-factions/grixis/grixis.placement.json`: `3FF11F634731F8EB87006557D7D3040A0ED54AB1943731BA3E1706CF958188A4`
- `data/raw-factions/grixis/grixis.profile.json`: `CBEC4F9502396B3EA8FE36BECE02A52E8E342099E6CA329BBC848436F221DB1A`

These hashes matched before and after VM-319.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed: JSON parse checks for touched display/generated/raw JSON before and after edits.
- Baseline probe: GRIXIS had no `raw_enrichment`, 1 deck link, `research_links.edhrec_slug`, 1 raw timeline entry, 0 raw key figures, 0 raw canonical flavor entries, non-empty mechanics, and VM-300 green status.
- Passed with expected model-owned warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT,ESPER,GRIXIS`.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=GRIXIS`.
- Final probe: GRIXIS has `raw_enrichment`, 1 display timeline entry, 0 display figures, 0 display flavor entries, 1 deck link, `research_links.edhrec_slug`, 1 raw timeline entry, 0 raw key figures, 0 raw flavor entries, and non-empty mechanics.
- Passed with expected default warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Passed: `npm.cmd run test:placement`.

## Risks / Uncertainties

- Lorehold, Abzan, Sultai, Temur, BANT, ESPER, and GRIXIS still report expected model-owned biological-prior inhibitor warnings under target validation.
- The worktree remains broadly dirty outside VM-319.
- `data/factions.json` remains both a display input and generated output in the current build flow; VM-319 accepted only GRIXIS display diffs traceable to this pass.
- Rich Grixis lore remains source-bound/deferred until a future evidence-promotion card upgrades figures, geography, vis economy, chronology, mechanics, or exact quotes.

## Not Touched

- No web search.
- No GRIXIS raw claims, sources, placement, profile, or changelog changes.
- No GRIXIS placement axes, good/poor fit indicators, inhibitor traps, discriminator questions, mechanics, or claim counts.
- No placement schema shape changes.
- No flavor snippet authoring.
- No Maze behavior, route behavior, Home preview, public alias, or validator policy changes.
- No generated placement output was hand-edited as source.
- No unrelated generated drift was accepted.

## Follow-Up Recommendations

- Next recommended shard target: `JUND`, if comparable probes confirm the same `raw_enrichment`-only display gap.
- Keep the Jund pass as display projection only unless pre-flight proves promoted local evidence already supports richer display fields.
- Continue using snapshot comparisons around full `build:factions`, because broad Supabase context drift can still appear.

## Next Suggested Agent

JSON Cartographer for a JUND source-first display/source audit pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-319-grixis-display-enrichment.md`
- `docs/kanban/done/VM-318-esper-display-enrichment.md`
- `docs/kanban/done/VM-317-bant-display-enrichment.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-193-grixis-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-168-grixis-controlled-runtime-promotion.md`
