# Codex Handoff: MTGDataV2 Workbook Enrichment Recommendations

## Agent name

Codex

## Task requested

Read `C:\Users\obake\Downloads\MTGDataV2.xlsx` and recommend which existing sheets should be expanded and which net-new sheets should be added to enrich the workbook using curated Vox Mana data.

## Files reviewed

- `C:\Users\obake\Downloads\MTGDataV2.xlsx`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-26-2138-codex-vm139-precon-mechanics-import.md`
- `docs/kanban/done/VM-139-import-validated-precon-mechanics.md`
- `docs/handoffs/2026-05-26-0731-codex-vm136-archscry-precon-layer.md`
- `docs/handoffs/2026-05-26-0816-codex-vm137-faction-native-precons.md`
- `docs/handoffs/2026-05-26-2220-codex-vm140-premium-precon-section.md`
- `docs/design/strategium-archetype-source-audit.md`
- `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`
- `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`
- `docs/reference/data-contracts.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `data/precons/vox-mana-precons.source.schema.json`
- `data/precons/vox-mana-precons.source.json`
- `data/taxonomy/vox-mana-precon-themes.schema.json`
- `data/taxonomy/vox-mana-precon-themes.json`
- `data/taxonomy/vox-mana-tags.json`
- `data/identity-layers.schema.json`
- `data/identity-layers.json`
- `data/scryfall/grounding/scryfall-grounding.json`
- `data/scryfall/grounding/plain-reading-semantics.json`
- `assets/js/strategium.js`

## Files changed

- `docs/handoffs/2026-07-05-1344-codex-mtgdata-v2-workbook-recommendations.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

Added this handoff and indexed the advisory analysis. No workbook, runtime code, generated data, canonical JSON, or Kanban card was changed.

## Why it changed

The repo requires a handoff trail for substantial main-agent analysis. The user asked for recommendations only, so the task stayed read-only apart from this trace.

## Decisions made

- Treat the workbook as a staging/reference taxonomy asset, not as a canonical source replacing Vox Mana JSON.
- Recommend enriching existing sheets with provenance, normalized IDs, Scryfall grounding status, Vox Mana interpretation fields, and Strategium/Loom crosswalks.
- Preserve generated Scryfall grounding as generated data; do not hand-edit it from the workbook.
- Use the Strategium archetype library as the authoritative local archetype education/table-read source for this recommendation.

## Risks / uncertainties

- The workbook contains plain worksheet ranges, no Excel tables or formulas. Any future automated import should first normalize headers and sheet shapes.
- `CreatureTypes` has no explicit header row; row 1 is `Advisor`. Treating row 1 as a header falsely drops one creature type.
- `KeywordActions` includes four values not present in the current Scryfall keyword-action catalog: `Face a Villainous Choice`, `Search`, `Tap and Untap`, and `The Ring Tempts You`.
- `AbilityWords` includes ten values not present in the current Scryfall ability-word catalog, including `Ability word`, `Craft`, `Gotcha`, and silver-border/variant-style entries.
- `DeckArchetypes` includes all 50 Strategium archetypes plus seven workbook-only entries. Those extras need explicit status/source treatment rather than silent removal.

## Tests run

- Read-only `openpyxl` workbook inspection for sheet names, row/column counts, sample rows, formulas, tables, and missing values.
- Read-only comparison of workbook CreatureTypes, AbilityWords, KeywordActions, PlaneswalkerTypes, and DeckArchetypes against local Vox Mana/Scryfall/Strategium sources.
- Read-only `rg`, `Get-Content`, and `Select-String` source review.
- No `npm` tests run because no runtime code or data artifacts were changed.

## Not touched

- `C:\Users\obake\Downloads\MTGDataV2.xlsx`
- Canonical source JSON under `data/`
- Generated Scryfall grounding and generated precon artifacts
- Runtime app code and CSS
- Existing dirty working-tree changes
- Kanban board/card files

## Follow-up recommendations

- If the user wants the workbook modified, create a new workbook copy or explicit import plan before editing the original.
- Add a follow-up Kanban card for "MTGDataV2 Vox Mana enrichment workbook" if the recommendation turns into implementation.
- Build a narrow first pass around `DeckArchetypes`, `VoxMana_Tags`, `Loom_Concept_Seeds`, and `Scryfall_Grounding_Crosswalk` before expanding every taxonomy list.

## Next suggested agent

JSON Cartographer for source-to-sheet mapping, then Documentation Steward if a durable workbook specification is desired.

## Related Kanban card, docs, or plans

- VM-008 Commander Compass V1.5 Archetype-Guided Recommendations
- VM-010 The Loom Commander Finder Mode / graph-query layer
- VM-406 Archscry Placement to Strategium Bridge Concepts
- VM-457 Loom Foundation Deep Dive
- VM-466 Loom V0/V1 Naming and Concept Seed Decision
- VM-471 Scryfall Grounding Plain Reading Compiler Foundation
- VM-472 Robust Implicit Maze Compiler Framework
- VM-475 Keyword Coverage Parser Tests
- VM-139 Import Validated Precon Mechanics
