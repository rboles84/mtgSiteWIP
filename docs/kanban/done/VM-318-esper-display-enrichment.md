# VM-318 - ESPER Source-First Display Enrichment

ID: VM-318
Title: ESPER Source-First Display Enrichment
Status: done
Type: Data / Display Enrichment
Area: ESPER, Faction Display Data
Priority: medium
Created: 2026-06-10
Updated: 2026-06-10
Completed: 2026-06-10

## Summary

Repair ESPER's remaining display-quality gap without changing placement or promoting deferred lore. ESPER passes VM-300 with one expected model-owned inhibitor warning, has non-empty mechanics plus deck/research metadata, but lacks `raw_enrichment`.

## Scope

- Add only source-backed ESPER display `raw_enrichment`.
- Mirror the existing raw Esper profile timeline entry.
- Keep display `key_figures` and `canonical_flavor_text` empty.
- Preserve ESPER deck/research metadata.
- Preserve ESPER raw claims, sources, placement, profile, mechanics, placement model behavior, Maze, routes, Home, schema, and flavor snippets.

## Acceptance Criteria

- ESPER `raw_enrichment` exists with the existing source-backed timeline entry.
- ESPER `raw_enrichment.key_figures` remains empty.
- ESPER `raw_enrichment.canonical_flavor_text` remains empty.
- ESPER raw claim/source/placement/profile hashes remain byte-identical.
- `data/placement-model.json` has no accepted VM-318 diff.
- VM-300 target validation passes for `LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT,ESPER` with only expected model-owned warnings.
- No unrelated generated drift is accepted.

## Notes

- `data/factions.json` is both display input and generated merge output in the current builder flow; accept only ESPER display diffs traceable to this pass.
- Named Esper figures, locations, metallurgy/material lore, Ethersworn, Carmot, Vectis/Tidehollow, Sharuum, Tezzeret, and Conflux detail remain manual-fill or support-only unless explicitly promoted by local evidence.

## Closeout Notes

- Added `data/factions.json::factions.ESPER.raw_enrichment` as a source/display-input edit.
- Mirrored the one existing ESPER raw profile timeline entry only.
- Kept display `key_figures` and `canonical_flavor_text` empty.
- Preserved ESPER raw claims, sources, placement, and profile byte hashes.
- Accepted no `data/placement-model.json`, schema, flavor-snippet, identity-layer, or Supabase context content drift.
- Restored unrelated WITCH Supabase context drift from full build, then confirmed targeted ESPER context mode produced no final context diff.
