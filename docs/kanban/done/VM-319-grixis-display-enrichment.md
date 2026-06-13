# VM-319 - GRIXIS Source-First Display Enrichment

ID: VM-319
Title: GRIXIS Source-First Display Enrichment
Status: done
Type: Source-First Display Enrichment
Area: Grixis, Display Data, Source Durability
Priority: medium
Created: 2026-06-10
Updated: 2026-06-10

## Summary

Repair GRIXIS's remaining display-quality gap without changing placement or promoting deferred lore. GRIXIS passed VM-300 with one expected model-owned inhibitor warning, had non-empty mechanics plus deck/research metadata, but lacked `raw_enrichment`.

## Scope

- Add source-backed `factions.GRIXIS.raw_enrichment` through the approved display-source path.
- Mirror only currently source-backed raw Grixis profile content: one timeline entry, `key_figures: []`, and `canonical_flavor_text: []`.
- Preserve existing GRIXIS deck/research metadata.
- Preserve raw Grixis claims, sources, placement, and profile hashes.
- Run full build and accept only deterministic GRIXIS display output.

## Non-Goals

- Do not add new Grixis source rows, claim rows, profile entries, timeline entries, key figures, flavor text, institutions, lore summaries, or Commander facts.
- Do not change placement axes, discriminator fields, inhibitor traps, mechanics, claim counts, schemas, Maze, routes, Home, flavor snippets, or generated placement output.
- Do not promote Bolas, Sedris, Malfegor, Thraximundar, Kess, vis economy, geography, unearth-as-whole-identity, Maestros/New Capenna, Conflux/post-Conflux detail, or exact card/flavor text.
- Do not accept unrelated generated drift.

## Acceptance Criteria

- `data/factions.json::factions.GRIXIS.raw_enrichment` exists and mirrors only the approved raw profile floor.
- `data/placement-model.json` has no accepted VM-319 diff.
- Grixis raw claims/sources/placement/profile hashes remain byte-identical before and after.
- VM-300 validation passes for `LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT,ESPER,GRIXIS` with only expected model-owned warnings.
- Regression tests pass.

## Completion Notes

- Added `data/factions.json::factions.GRIXIS.raw_enrichment`.
- Mirrored one raw Grixis timeline entry: `event_grixis_0001`.
- Kept display `key_figures` and `canonical_flavor_text` empty.
- Preserved raw Grixis claims, sources, placement, and profile byte hashes.
- Ran full `npm.cmd run build:factions`; restored unrelated `WITCH` Supabase context drift from snapshot, then ran targeted `npm.cmd run build:factions -- --context-targets=GRIXIS`.
- Accepted no `data/placement-model.json`, schema, flavor, identity-layer, or Supabase context content drift.
- Completed VM-319 with handoff `docs/handoffs/2026-06-10-0933-codex-vm319-grixis-display-enrichment.md`.
