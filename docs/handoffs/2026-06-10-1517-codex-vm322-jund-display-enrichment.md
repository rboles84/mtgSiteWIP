# 2026-06-10 15:17 - Codex - VM-322 JUND Source-First Display Enrichment

## Agent Name

Codex

## Task Requested

Implement VM-322: repair JUND's remaining display-quality gap by adding source-backed `raw_enrichment` from existing raw profile content only, preserving raw JUND hashes, placement output, schemas, flavor snippets, routes, Maze behavior, Home, and unrelated generated context.

## Pre-Flight Summary

Recent related work: VM-317, VM-318, and VM-319 established the shard display-enrichment pattern for BANT, ESPER, and GRIXIS. VM-320 and VM-321 are Colorless cards and remain unchanged. VM-186 through VM-192 established JUND as the only live public key, with `BRG` metadata/query-only and detailed lore topics deferred.

Current known risks: the worktree is broadly dirty with unrelated tracked and untracked drift; full `build:factions` can still rewrite unrelated `WITCH` Supabase context; `data/factions.json` is both a display input and generated merge output in the current builder flow.

Relevant decisions already made: JUND remains the only live public key; `BRG` remains metadata/query-only; deck/research links are navigational display metadata only; named figure biographies, detailed geography/ecology, devour-as-whole-identity, and exact card/flavor text remain deferred.

Files recently changed by related work include `data/factions.json`, raw shard files, generated placement/context files, board files, and handoff docs. VM-322 preserved unrelated drift and did not stage, revert, normalize, delete, or clean unrelated files.

What should not be touched: raw JUND claims, sources, placement, profile, changelog, placement axes, discriminator questions, inhibitor traps, mechanics, placement schema, generated placement output, generated flavor snippets, Maze behavior, routes, Home, exact card/flavor text, and deck-research work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- VM-300, VM-305, VM-317, VM-318, VM-319, VM-320, and VM-321 handoffs/cards
- Jund VM-176, VM-177, VM-178, VM-179, VM-180, VM-186, VM-187, VM-189, VM-190, VM-191, and VM-192 handoffs/cards
- `docs/research/jund/**`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/factions.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-322-jund-display-enrichment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-1517-codex-vm322-jund-display-enrichment.md`

## What Changed

- Added `data/factions.json::factions.JUND.raw_enrichment`.
- Mirrored 1 existing JUND raw profile timeline entry.
- Kept `data/factions.json::factions.JUND.raw_enrichment.key_figures` empty.
- Kept `data/factions.json::factions.JUND.raw_enrichment.canonical_flavor_text` empty.
- Preserved existing JUND `deck_links` and `research_links.edhrec_slug`.
- Created and completed VM-322 Kanban/handoff bookkeeping.

## Why It Changed

JUND already had source-backed raw profile identity/setting material, non-empty mechanics, deck links, and research links, but public display `raw_enrichment` was missing. VM-322 surfaces the existing source-backed timeline floor through the display input without expanding Jund lore or placement behavior.

## Source / Display Ownership Finding

`data/factions.json` is both display input and generated merge output in `research/build-faction-artifacts.mjs`. VM-318 and VM-319 established this path for the same shard display projection pattern because the builder preserves existing display copy for raw-managed factions and the builder meta reports `data/raw-factions plus data/factions.json display surface`. VM-322 therefore edited only `data/factions.json::factions.JUND.raw_enrichment` as the approved display-source input for this field.

## Evidence / Claim IDs Mirrored

- Timeline claim IDs: `jund_claim_0001` and `jund_claim_0002`.
- Evidence rows: `JUND-EVID-001`, `JUND-EVID-002`, and `JUND-EVID-003`.
- Source IDs are from the raw claims and source packet floor, not new VM-322 evidence rows.
- Skipped manual-fill/support-only candidates: Jund geography/ecology, named figure biographies, Kresh, Meren, Rakka Mar, Karrthus, Sarkhan Vol, devour-as-whole-identity, Conflux/post-Conflux chronology, Modern Jund, Riveteers/New Capenna, generated seed claims, and exact card/flavor text.

## Generated Objects Accepted / Restored

- Accepted `data/factions.json::factions.JUND.raw_enrichment` as the source/display-input edit.
- Snapshot diff after full build showed no content drift in `data/factions.json` beyond the already-applied VM-322 display input.
- Accepted no `data/placement-model.json` changes.
- Accepted no `data/placement-model.schema.json` changes.
- Accepted no `data/identity-layers.json` changes.
- Accepted no `data/archscry-flavor-snippets.json` changes.
- Full `npm.cmd run build:factions` rewrote unrelated `WITCH` Supabase context; restored `supabase/functions/guild-recruiter/faction-context.ts` from `C:\Users\obake\AppData\Local\Temp\vm322-jund-20260610151522\faction-context.ts`.
- Ran `npm.cmd run build:factions -- --context-targets=JUND`; final context had no changed context keys and was byte-identical to the restored snapshot.

## JUND Hash Guard

- `data/raw-factions/jund/jund.claims.json`: `CC8EA67397C10AA5C2E3C76BE3BCA6845ABEF5CA6C1EBDE6408C924708830D6D`
- `data/raw-factions/jund/jund.sources.json`: `271AED049694167A0720967D5F1A17A27C5A9E0D7494243C82E8C4B879AE6732`
- `data/raw-factions/jund/jund.placement.json`: `F1DFEECB9E5F1BB02AB2B672D14E1CA95799AC8894E6A0623558CFD9F851BF53`
- `data/raw-factions/jund/jund.profile.json`: `236E59786417204E0B71E0A3CC1C1332C6A11B8F5A03A9C36FA41D88BAB5F070`

These hashes matched before and after VM-322.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: JSON parse checks for touched display/generated/raw JSON before and after edits.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Baseline probe: JUND had no `raw_enrichment`, 1 deck link, `research_links.edhrec_slug`, 1 raw timeline entry, 0 raw key figures, 0 raw canonical flavor entries, non-empty mechanics, and VM-300 green status.
- Passed with expected model-owned warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT,ESPER,GRIXIS,JUND`.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=JUND`.
- Final probe: JUND has `raw_enrichment`, 1 display timeline entry, 0 display figures, 0 display flavor entries, 1 deck link, `research_links.edhrec_slug`, 1 raw timeline entry, 0 raw key figures, 0 raw flavor entries, and non-empty mechanics.
- Passed with expected default warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Passed: `npm.cmd run test:placement`.

## Risks / Uncertainties

- Lorehold, Abzan, Sultai, Temur, BANT, ESPER, GRIXIS, and JUND still report expected model-owned biological-prior inhibitor warnings under target validation.
- The worktree remains broadly dirty outside VM-322.
- `data/factions.json` remains both a display input and generated output in the current build flow; VM-322 accepted only JUND display diffs traceable to this pass.
- Rich Jund lore remains source-bound/deferred until a future evidence-promotion card upgrades figures, geography, ecology, chronology, mechanics, or exact quotes.

## Not Touched

- No web search.
- No raw JUND file edits.
- No new JUND claims, sources, evidence rows, profile entries, placement text, mechanics, deck links, or research links.
- No direct generated placement edits.
- No schema edits.
- No route, Maze, Home, or flavor-snippet edits.
- No `BRG` live/public-key changes.
- No VM-320 or VM-321 card renames, reuses, duplications, or repurposing.

## Follow-Up Recommendations

- Recommend NAYA next if comparable probes confirm the same raw-enrichment-only display gap.
- Keep any deeper Jund lore enrichment as a separate evidence-promotion task.

## Next Suggested Agent

JSON Cartographer for NAYA display-gap probing, or Planning Architect if the next pass needs a new VM card first.
