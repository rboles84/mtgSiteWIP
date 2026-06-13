# VM-317 - BANT Source-First Display Enrichment

ID: VM-317
Title: BANT Source-First Display Enrichment
Status: done
Type: Data / Display Enrichment
Area: BANT, Faction Display Data
Priority: medium
Created: 2026-06-10
Updated: 2026-06-10
Completed: 2026-06-10

## Summary

Repair BANT's remaining display-quality gap without changing placement. BANT already passes VM-300 with one expected model-owned inhibitor warning and has non-empty mechanics, deck links, and `research_links.edhrec_slug`, but `data/factions.json::factions.BANT.raw_enrichment` is missing.

## Scope

- Add only the source/display input that projects to BANT `raw_enrichment`.
- Mirror existing source-backed BANT raw profile timeline and figure content.
- Preserve existing BANT deck/research metadata.
- Keep display `canonical_flavor_text` empty until exact quote verification exists.
- Preserve BANT raw claims, sources, placement, profile, mechanics, placement model behavior, Maze, routes, Home, schema, and flavor snippets.

## Acceptance Criteria

- BANT `raw_enrichment` exists with existing source-backed timeline and selected figure anchors.
- BANT `canonical_flavor_text` remains empty.
- BANT raw claim/source/placement/profile hashes remain unchanged unless a documented source-owned blocker appears.
- VM-300 target validation passes for `LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT` with only expected model-owned warnings.
- No unrelated generated drift is accepted.

## Notes

- Use ABZAN/SULTAI/TEMUR as the nearest recent shape references.
- `data/factions.json` is both display input and generated output in the current builder flow; accept only BANT display diffs traceable to this pass.

## Closeout Notes

- Added BANT display `raw_enrichment` in `data/factions.json`.
- Preserved BANT raw claims, sources, placement, and profile byte hashes.
- Kept display `canonical_flavor_text` empty.
- Rejected unrelated WITCH Supabase context drift from the full build and accepted no Supabase context changes.
