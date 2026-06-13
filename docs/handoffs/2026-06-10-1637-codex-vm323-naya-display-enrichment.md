# 2026-06-10 16:37 - Codex - VM-323 NAYA Source-First Display Enrichment

## Agent Name

Codex

## Task Requested

Implement VM-323: repair NAYA's remaining display-quality gap by adding source-backed `raw_enrichment` from existing raw profile content only, preserving raw NAYA hashes, placement output, schemas, flavor snippets, routes, Maze behavior, Home, and unrelated generated context.

## Pre-Flight Summary

Recent related work: VM-317, VM-318, VM-319, and VM-322 established the shard display-enrichment pattern for BANT, ESPER, GRIXIS, and JUND. VM-300 established source/generated guardrails. VM-305 added targeted Supabase context rebuilds. VM-181 through VM-196 established NAYA's source packet, docs, review gate, controlled runtime promotion, and live parity boundaries.

Current known risks: the worktree is broadly dirty with unrelated tracked and untracked drift; full `build:factions` can still rewrite unrelated `WITCH` Supabase context; `data/factions.json` is both a display input and generated merge output in the current builder flow.

Relevant decisions already made: NAYA remains the only live public key; `RGW`, `GRW`, and `WRG` remain metadata/query/validation terms only; deck/research links are navigational display metadata only; Naya places, figures, culture, Progenitus, Gahiji, Mayael, detailed creature ecology, mechanics/card facts, post-Alara continuity, and exact card/flavor text remain deferred.

Files recently changed by related work include `data/factions.json`, raw shard files, generated placement/context files, board files, and handoff docs. VM-323 preserved unrelated drift and did not stage, revert, normalize, delete, or clean unrelated files.

What should not be touched: raw NAYA claims, sources, placement, profile, changelog, placement axes, discriminator questions, inhibitor traps, mechanics, placement schema, generated placement output, generated flavor snippets, Maze behavior, routes, Home, exact card/flavor text, and deck-research work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- VM-300, VM-305, VM-317, VM-318, VM-319, and VM-322 handoffs/cards
- Naya VM-181, VM-182, VM-183, VM-184, VM-185, VM-188, and VM-196 handoffs/cards
- `docs/research/naya/**`
- `data/raw-factions/naya/naya.claims.json`
- `data/raw-factions/naya/naya.sources.json`
- `data/raw-factions/naya/naya.placement.json`
- `data/raw-factions/naya/naya.profile.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/factions.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-323-naya-display-enrichment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-1637-codex-vm323-naya-display-enrichment.md`

## What Changed

- Added `data/factions.json::factions.NAYA.raw_enrichment`.
- Mirrored 1 existing NAYA raw profile timeline entry.
- Kept `data/factions.json::factions.NAYA.raw_enrichment.key_figures` empty.
- Kept `data/factions.json::factions.NAYA.raw_enrichment.canonical_flavor_text` empty.
- Preserved existing NAYA `deck_links` and `research_links.edhrec_slug`.
- Created and completed VM-323 Kanban/handoff bookkeeping.

## Why It Changed

NAYA already had source-backed raw profile identity/setting material, non-empty mechanics, deck links, and research links, but public display `raw_enrichment` was missing. VM-323 surfaces the existing source-backed timeline floor through the display input without expanding Naya lore or placement behavior.

## Source / Display Ownership Finding

`data/factions.json` is both display input and generated merge output in `research/build-faction-artifacts.mjs`. VM-318, VM-319, and VM-322 established this path for the same shard display projection pattern because the builder preserves existing display copy for raw-managed factions and the builder meta reports `data/raw-factions plus data/factions.json display surface`. VM-323 therefore edited only `data/factions.json::factions.NAYA.raw_enrichment` as the approved display-source input for this field.

## Evidence / Claim IDs Mirrored

- Timeline claim IDs: `naya_claim_0001` and `naya_claim_0002`.
- Evidence rows: `NAYA-EVID-001`, `NAYA-EVID-002`, and `NAYA-EVID-003`.
- Source IDs are from the raw claims and source packet floor, not new VM-323 evidence rows.
- Skipped manual-fill/support-only candidates: Naya places, figures, culture, Progenitus, Gahiji, Mayael, detailed creature ecology, mechanics/card facts, post-Alara continuity, generated seed claims, and exact card/flavor text.

## Generated Objects Accepted / Restored

- Accepted `data/factions.json::factions.NAYA.raw_enrichment` as the source/display-input edit.
- Snapshot diff after full build showed no content drift in `data/factions.json` beyond the already-applied VM-323 display input.
- Accepted no `data/placement-model.json` changes.
- Accepted no `data/placement-model.schema.json` changes.
- Accepted no `data/identity-layers.json` changes.
- Accepted no `data/archscry-flavor-snippets.json` changes.
- Full `npm.cmd run build:factions` rewrote unrelated `WITCH` Supabase context; restored `supabase/functions/guild-recruiter/faction-context.ts` from `C:\Users\obake\AppData\Local\Temp\vm323-naya-20260610163215\faction-context.ts`.
- Ran `npm.cmd run build:factions -- --context-targets=NAYA`; final context had no changed context keys and was byte-identical to the restored snapshot.

## NAYA Hash Guard

- `data/raw-factions/naya/naya.claims.json`: `6E9C6BCD37BE37354CF494DFF8B88D517DC1D7FF63B7D2C132E9693A76A37BEE`
- `data/raw-factions/naya/naya.sources.json`: `779A405ED0C65E1B2E9075474C18B34ED22FC8410BD9FA0606BB6A0592F30F2B`
- `data/raw-factions/naya/naya.placement.json`: `59B69E5B98F425923AEEE22ED374D086AF29B730E16C1B8164F217C0EE5D6999`
- `data/raw-factions/naya/naya.profile.json`: `DCCCE0AED37CC1443693DD76F9DC3553CC61FE792AB986CA802B9FC0AFD9C6D1`

These hashes matched before and after VM-323.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: VM-323 availability check; no existing VM-323 card found.
- Passed: VM-322 completion check in board and handoff index.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: JSON parse checks for touched display/generated/raw JSON before and after edits.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Baseline probe: NAYA had no `raw_enrichment`, 1 deck link, `research_links.edhrec_slug`, 1 raw timeline entry, 0 raw key figures, 0 raw canonical flavor entries, non-empty mechanics, and VM-300 green status.
- Passed with expected model-owned warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT,ESPER,GRIXIS,JUND,NAYA`.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=NAYA`.
- Final probe: NAYA has `raw_enrichment`, 1 display timeline entry, 0 display figures, 0 display flavor entries, 1 deck link, `research_links.edhrec_slug`, 1 raw timeline entry, 0 raw key figures, 0 raw flavor entries, and non-empty mechanics.
- Passed with expected default warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Passed: `npm.cmd run test:placement`.

## Risks / Uncertainties

- Lorehold, Abzan, Sultai, Temur, BANT, ESPER, GRIXIS, JUND, and NAYA still report expected model-owned biological-prior inhibitor warnings under target validation.
- The worktree remains broadly dirty outside VM-323.
- `data/factions.json` remains both a display input and generated output in the current build flow; VM-323 accepted only NAYA display diffs traceable to this pass.
- Rich Naya lore remains source-bound/deferred until a future evidence-promotion card upgrades places, figures, culture, Progenitus/Gahiji/Mayael material, ecology, chronology, mechanics, or exact quotes.

## Not Touched

- No web search.
- No raw NAYA file edits.
- No new NAYA claims, sources, evidence rows, profile entries, placement text, mechanics, deck links, or research links.
- No direct generated placement edits.
- No schema edits.
- No route, Maze, Home, or flavor-snippet edits.
- No `RGW`, `GRW`, or `WRG` live/public-key changes.

## Follow-Up Recommendations

- Review remaining non-shard display gaps from current board/probes rather than guessing by lore preference.
- Keep any deeper Naya lore enrichment as a separate evidence-promotion task.

## Next Suggested Agent

JSON Cartographer for a display-gap probe across remaining live identities, or Planning Architect if the next pass needs a new VM card first.
