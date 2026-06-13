# 2026-06-10 06:56 - Codex - VM-317 BANT Source-First Display Enrichment

## Agent Name

Codex

## Task Requested

Implement VM-317: repair BANT's remaining display-quality gap by adding source-backed display `raw_enrichment` without changing placement, raw BANT source files, mechanics, routes, Maze behavior, flavor snippets, schemas, Home, or unrelated generated outputs.

## Pre-Flight Summary

Recent related work: VM-300 established source/generated guardrails; VM-305 added targeted Supabase context rebuilds; VM-314 through VM-316 established the current display enrichment pattern; VM-159 through VM-194 made BANT a live source-bound shard pilot with `WUG` kept metadata/query-only.

Current known risks: the worktree is broadly dirty with unrelated tracked and untracked drift; full `build:factions` can still rewrite unrelated Supabase context entries; `data/factions.json` is both a display input and generated output in the current builder flow.

Relevant decisions already made: BANT is the only live public key; `WUG` is not a generated key or public alias; deck/research metadata is display/navigation only; exact Bant flavor/card text remains quote-verification material; Commander/precon material is support-only and not lore proof.

Files recently changed by related work include `data/factions.json`, `data/identity-layers.json`, raw Abzan/Sultai/Temur/Lorehold/UR/RG files, generated placement/context files, tests, board, and handoff docs. VM-317 preserved unrelated drift and did not stage, revert, normalize, or clean unrelated files.

What should not be touched: BANT raw claims, sources, placement, profile, changelog, placement axes, discriminator questions, inhibitor traps, mechanics, placement schema, generated placement output, generated flavor snippets, Maze behavior, routes, Home preview, public aliases, exact card/flavor text, and deck-research work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- VM-300, VM-305, VM-314, VM-315, and VM-316 handoffs
- BANT VM-157, VM-158, VM-159, VM-159A, VM-160, VM-168, VM-169, VM-170, VM-172, VM-175, and VM-194 cards or handoffs
- `docs/research/bant/**`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `data/factions.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-317-bant-display-enrichment.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-0656-codex-vm317-bant-display-enrichment.md`

## What Changed

- Added `data/factions.json::factions.BANT.raw_enrichment`.
- Mirrored 4 existing BANT raw profile timeline entries.
- Mirrored 5 existing BANT raw key figure anchors: Rafiq of the Many, Noble Hierarch, Jenara, Asha, and Elspeth Tirel.
- Kept `data/factions.json::factions.BANT.raw_enrichment.canonical_flavor_text` empty.
- Preserved existing BANT `deck_links` and `research_links.edhrec_slug`.
- Created and completed VM-317 Kanban/handoff bookkeeping.

## Why It Changed

BANT already had source-backed raw profile timeline/figure material, non-empty mechanics, deck links, and research links, but public display `raw_enrichment` was missing. VM-317 surfaces existing source-backed material through the display input without expanding BANT lore or placement behavior.

## Evidence / Claim IDs Mirrored

- Timeline claim IDs: `bant_claim_0001`, `bant_claim_0002`, `bant_claim_0004`, `bant_claim_0005`, `bant_claim_0007`, `bant_claim_0008`, `bant_claim_0015`, and `bant_claim_0016`.
- Figure claim IDs: `bant_claim_0008`, `bant_claim_0009`, `bant_claim_0011`, `bant_claim_0012`, `bant_claim_0013`, `bant_claim_0014`, and `bant_claim_0017`.
- Source IDs were derived from the mirrored BANT raw claim records only.
- Skipped raw-only anchors: Gwafa Hazid and Mubin, because the pass selected the five primary display anchors and did not find a stronger current display convention requiring all seven raw figures.
- Flavor residual: raw BANT flavor entries are non-exact summaries, so display `canonical_flavor_text` remains empty until exact quote verification exists.

## Generated Objects Accepted / Restored

- Accepted `data/factions.json::factions.BANT.raw_enrichment` as the source/display-input edit.
- Full `npm.cmd run build:factions` produced zero JSON path changes against the pre-build snapshot for `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, `data/archscry-flavor-snippets.json`, and `data/identity-layers.json`.
- Full build rewrote unrelated WITCH Supabase context; restored `supabase/functions/guild-recruiter/faction-context.ts` from `C:\Users\obake\AppData\Local\Temp\vm317-bant-20260610065409\faction-context.ts`.
- Ran `npm.cmd run build:factions -- --context-targets=BANT`; final context was byte-identical to the restored snapshot, so no Supabase context changes were accepted.

## BANT Hash Guard

- `data/raw-factions/bant/bant.claims.json`: `572A4DFE5510D440D941131E45930883EE104014CAEC32AFD36C3F188D1C7499`
- `data/raw-factions/bant/bant.sources.json`: `1F4D8CF75AEBD7A7991903DB21613B5DBB152017BB16F5C293821499BCF160AC`
- `data/raw-factions/bant/bant.placement.json`: `CCBFC1CCCFDBBE2C27298789F6706F352503D5AF5B4F50BCA10EF5C521742521`
- `data/raw-factions/bant/bant.profile.json`: `4C30CEE6ECE983B6FEE55B7A916D38BB20D170FE091C0C3619552820D34B5E3A`

These hashes matched before and after VM-317.

## Tests Run

- Passed: `git status --short` pre-flight review.
- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed: JSON parse checks for touched display/generated/raw JSON before and after edits.
- Baseline probe: BANT had no `raw_enrichment`, 1 deck link, `research_links.edhrec_slug`, 7 raw key figures, 4 raw timeline entries, 3 raw non-exact flavor summaries, non-empty mechanics, and VM-300 green status.
- Passed: `npm.cmd run build:factions`.
- Passed: generated diff inspection against pre-build snapshots.
- Passed: `npm.cmd run build:factions -- --context-targets=BANT`.
- Final probe: BANT has `raw_enrichment`, 4 display timeline entries, 5 display figures, 0 display flavor entries, 1 deck link, `research_links.edhrec_slug`, 7 raw key figures, 3 raw non-exact flavor summaries, and non-empty mechanics.
- Passed with expected model-owned warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT`.
- Passed with expected default warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Passed: `npm.cmd run test:placement`.
- Passed with existing LF/CRLF warnings only: scoped `git diff --check`.
- Passed: focused trailing-whitespace scan.
- Final scoped status still shows pre-existing modified generated/context files outside the accepted VM-317 diff; VM-317 accepted no `data/placement-model.json`, schema, flavor-snippet, or Supabase context content drift.

## Risks / Uncertainties

- Lorehold, Abzan, Sultai, Temur, and BANT still report expected model-owned biological-prior inhibitor warnings under target validation.
- The worktree remains broadly dirty outside VM-317.
- `data/factions.json` remains both a display input and generated output in the current build flow; VM-317 accepted only BANT display diffs traceable to this pass.
- Exact BANT card/flavor text, Asha/Elspeth/Mubin details, five-nation direct quotations, post-Phyrexia political detail, Commander legality, and deck/product facts remain manual-fill or future verification work.

## Not Touched

- No web search.
- No BANT raw claims, sources, placement, profile, or changelog changes.
- No BANT placement axes, good/poor fit indicators, inhibitor traps, discriminator questions, mechanics, or claim counts.
- No placement schema shape changes.
- No flavor snippet authoring.
- No Maze behavior, route behavior, Home preview, public alias, or validator policy changes.
- No generated placement output was hand-edited as source.
- No unrelated generated drift was accepted.

## Follow-Up Recommendations

- Next recommended shard target: `ESPER`.
- The comparable display-gap probe found ESPER, GRIXIS, JUND, and NAYA equally thin: no `raw_enrichment`, 1 deck link, `research_links.edhrec_slug`, non-empty mechanics, 1 raw timeline entry, 0 raw key figures, and 0 raw/display flavor entries.
- Choose ESPER first among the equal-gap shard targets because the prior BANT/ESPER parity trail already exists and it is the next adjacent shard lane after BANT.

## Next Suggested Agent

JSON Cartographer for an ESPER source-first display/source audit pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-317-bant-display-enrichment.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-314-abzan-display-enrichment.md`
- `docs/kanban/done/VM-315-sultai-display-enrichment.md`
- `docs/kanban/done/VM-316-temur-display-enrichment.md`
- `docs/kanban/done/VM-160-bant-controlled-placement-promotion.md`
- `docs/kanban/done/VM-194-bant-live-parity-archscry-text-hardening.md`
