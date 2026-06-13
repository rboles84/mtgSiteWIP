# 2026-06-10 07:29 - Codex - VM-318 ESPER Source-First Display Enrichment

## Agent Name

Codex

## Task Requested

Implement VM-318: repair ESPER's remaining display-quality gap by adding source-backed display `raw_enrichment` without changing placement, raw Esper source files, mechanics, routes, Maze behavior, flavor snippets, schemas, Home, or unrelated generated outputs.

## Pre-Flight Summary

Recent related work: VM-300 established source/generated guardrails; VM-305 added targeted Supabase context rebuilds; VM-314 through VM-317 established the current display enrichment pattern; VM-163 through VM-195 made ESPER a live source-bound shard pilot with `WUB` kept metadata/query-only.

Current known risks: the worktree is broadly dirty with unrelated tracked and untracked drift; full `build:factions` can still rewrite unrelated Supabase context entries; `data/factions.json` is both a display input and generated merge output in the current builder flow.

Relevant decisions already made: ESPER is the only live public key; `WUB` is not a generated key or public alias; deck/research metadata is display/navigation only; named Esper figures, geography, metallurgy, material lore, Conflux detail, and exact card/flavor text remain manual-fill or support-only until a later evidence-promotion card.

Files recently changed by related work include `data/factions.json`, `data/identity-layers.json`, raw Abzan/Sultai/Temur/Bant/Lorehold/UR/RG files, generated placement/context files, tests, board, and handoff docs. VM-318 preserved unrelated drift and did not stage, revert, normalize, or clean unrelated files.

What should not be touched: ESPER raw claims, sources, placement, profile, changelog, placement axes, discriminator questions, inhibitor traps, mechanics, placement schema, generated placement output, generated flavor snippets, Maze behavior, routes, Home preview, public aliases, exact card/flavor text, and deck-research work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- VM-300, VM-305, VM-314, VM-315, VM-316, and VM-317 handoffs
- Esper VM-163, VM-166, VM-167, VM-171, VM-175, and VM-195 handoffs/cards
- `docs/research/esper/**`
- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.claims.json`
- `data/raw-factions/esper/esper.sources.json`
- `data/raw-factions/esper/esper.placement.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/factions.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-318-esper-display-enrichment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-0729-codex-vm318-esper-display-enrichment.md`

## What Changed

- Added `data/factions.json::factions.ESPER.raw_enrichment`.
- Mirrored 1 existing ESPER raw profile timeline entry.
- Kept `data/factions.json::factions.ESPER.raw_enrichment.key_figures` empty.
- Kept `data/factions.json::factions.ESPER.raw_enrichment.canonical_flavor_text` empty.
- Preserved existing ESPER `deck_links` and `research_links.edhrec_slug`.
- Created and completed VM-318 Kanban/handoff bookkeeping.

## Why It Changed

ESPER already had source-backed raw profile identity/setting material, non-empty mechanics, deck links, and research links, but public display `raw_enrichment` was missing. VM-318 surfaces the existing source-backed timeline floor through the display input without expanding Esper lore or placement behavior.

## Source / Display Ownership Finding

`data/factions.json` is both display input and generated merge output in `research/build-faction-artifacts.mjs`. VM-195 explicitly used this path for Esper display copy because the builder preserves existing display copy for raw-managed factions, and the builder meta reports `data/raw-factions plus data/factions.json display surface`. VM-318 therefore edited only `data/factions.json::factions.ESPER.raw_enrichment` as the approved display-source input for this field.

## Evidence / Claim IDs Mirrored

- Timeline claim IDs: `esper_claim_0001` and `esper_claim_0009`.
- Evidence rows: `ESPER-001` and `ESPER-009`.
- Source IDs from the raw claims: `src_vm_esper_evidence_ledger_20260529`, `src_wotc_rosewater_esper_striving_for_perfection`, and `src_vm_canon_inventory_three_color_audit_20260528`.
- Skipped manual-fill/support-only candidates: Sharuum, Tezzeret, Silas Renn, Breya, Agatha, Sydri, Ethersworn, Seekers of Carmot, Vectis, Tidehollow, etherium/carmot/sangrite detail, Conflux/post-Conflux chronology, and exact card/flavor text.

## Generated Objects Accepted / Restored

- Accepted `data/factions.json::factions.ESPER.raw_enrichment` as the source/display-input edit.
- Snapshot diff after build showed `data/factions.json` changed only at `factions.ESPER.raw_enrichment`.
- Accepted no `data/placement-model.json` changes.
- Accepted no `data/placement-model.schema.json` changes.
- Accepted no `data/identity-layers.json` changes.
- Accepted no `data/archscry-flavor-snippets.json` changes.
- Full `npm.cmd run build:factions` rewrote unrelated `WITCH` Supabase context; restored `supabase/functions/guild-recruiter/faction-context.ts` from `C:\Users\obake\AppData\Local\Temp\vm318-esper-20260610072616\faction-context.ts`.
- Ran `npm.cmd run build:factions -- --context-targets=ESPER`; final context had no changed context keys and was byte-identical to the restored snapshot.

## ESPER Hash Guard

- `data/raw-factions/esper/esper.claims.json`: `E1F08163AEA14AEA9E7430FF2BD4E5713CE1B69EC559D28528E9ECF198567593`
- `data/raw-factions/esper/esper.sources.json`: `E7BCEB45B036FAA0224A66E675FCD4B172EC24AFE0ABCBD51F31B75764659A5E`
- `data/raw-factions/esper/esper.placement.json`: `6D88ACFA0232B89A5433534732BBA95A45DC2899137CD4643D49FA82BD78A040`
- `data/raw-factions/esper/esper.profile.json`: `7C348B6C49E6C66C16C0B00138AFFD19CDA78CD0689D5593A171BF3552938A14`

These hashes matched before and after VM-318.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed: JSON parse checks for touched display/generated/raw JSON before and after edits.
- Baseline probe: ESPER had no `raw_enrichment`, 1 deck link, `research_links.edhrec_slug`, 1 raw timeline entry, 0 raw key figures, 0 raw canonical flavor entries, non-empty mechanics, and VM-300 green status.
- Passed with expected model-owned warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT,ESPER`.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=ESPER`.
- Final probe: ESPER has `raw_enrichment`, 1 display timeline entry, 0 display figures, 0 display flavor entries, 1 deck link, `research_links.edhrec_slug`, 1 raw timeline entry, 0 raw key figures, 0 raw flavor entries, and non-empty mechanics.
- Passed with expected default warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Passed: `npm.cmd run test:placement`.
- Passed with existing LF/CRLF warnings only: scoped `git diff --check`.
- Passed: focused trailing-whitespace scan.

## Risks / Uncertainties

- Lorehold, Abzan, Sultai, Temur, BANT, and ESPER still report expected model-owned biological-prior inhibitor warnings under target validation.
- The worktree remains broadly dirty outside VM-318.
- `data/factions.json` remains both a display input and generated output in the current build flow; VM-318 accepted only ESPER display diffs traceable to this pass.
- Rich Esper lore remains source-bound/deferred until a future evidence-promotion card upgrades figures, geography, material lore, or chronology.

## Not Touched

- No web search.
- No ESPER raw claims, sources, placement, profile, or changelog changes.
- No ESPER placement axes, good/poor fit indicators, inhibitor traps, discriminator questions, mechanics, or claim counts.
- No placement schema shape changes.
- No flavor snippet authoring.
- No Maze behavior, route behavior, Home preview, public alias, or validator policy changes.
- No generated placement output was hand-edited as source.
- No unrelated generated drift was accepted.

## Follow-Up Recommendations

- Next recommended shard target: `GRIXIS`.
- The comparable display-gap probe found GRIXIS, JUND, and NAYA equally thin: no `raw_enrichment`, 1 deck link, `research_links.edhrec_slug`, non-empty mechanics, 1 raw timeline entry, 0 raw key figures, and 0 raw/display flavor entries.
- Choose GRIXIS first among the equal-gap shard targets because it follows the same shard display projection pattern and has prior live-parity hardening trail.

## Next Suggested Agent

JSON Cartographer for a GRIXIS source-first display/source audit pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-318-esper-display-enrichment.md`
- `docs/kanban/done/VM-317-bant-display-enrichment.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-195-esper-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-171-esper-post-promotion-lore-reconciliation.md`
