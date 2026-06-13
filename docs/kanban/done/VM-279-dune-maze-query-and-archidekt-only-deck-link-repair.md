# VM-279 - Dune Maze Query And Archidekt-Only Deck Link Repair

ID: VM-279
Title: Dune Maze Query And Archidekt-Only Deck Link Repair
Status: done
Type: Runtime QA Repair / Maze Query / Deck Link Hygiene
Area: Dune, Archscry Dossier, Maze, Commander Deck Starts
Priority: high
Created: 2026-06-03
Completed: 2026-06-03

## Summary

Repaired Dune personalized Maze query generation so `DUNE` no longer inherits Blue-coded `knowledge/study`, Glint/Jund-coded `hungry/devouring`, or generic aggro query terms. Confirmed Dune deck-start links remain Archidekt-only.

## Results

- Added a Dune-only personalized Maze path override.
- Set Dune commander Maze path query to `id=wbrg is:commander f:commander`.
- Set Dune support Maze path query to `id<=wbrg f:commander -is:commander -t:land (o:attack OR o:attacks OR o:combat OR o:damage OR o:tokens OR o:haste OR o:trample OR o:fight)`.
- Set Dune flavor Maze path query to `id<=wbrg f:commander (ft:war OR ft:battle OR ft:rage OR ft:hunt OR ft:survival)`.
- Set Dune stretch Maze path query to `-id<=wbrg is:commander f:commander (o:attack OR o:attacks OR o:combat OR o:damage OR o:tokens OR o:haste OR o:trample OR o:fight)`.
- Labeled the stretch path as an outside-color gameplay stretch and explicitly stated it is not a clean Dune commander expression.
- Added focused tests for Dune personalized Maze query shape, forbidden Dune query terms, stretch copy, and Archidekt-only deck-start links.

## Protected Surfaces

- Did not edit `data/raw-factions/dune/**`.
- Did not edit `docs/research/dune/**`.
- Did not edit `docs/architecture/colors/dune/**`.
- Did not edit generated faction, placement, flavor, or Supabase files.
- Did not change routes, aliases, Home preview, identity-hero mapping/assets, raw packet status, or Dune placement eligibility.
- Did not modify non-Dune personalized Maze behavior.

## Verification

- Dune personalized Maze path queries no longer contain `knowledge`, `study`, `hungry`, `devouring`, `aggro`, or `aggressive`.
- The approved Archidekt deck-start label `Aggro archetype lane` remains allowed and is not part of the Dune personalized Maze forbidden-query scan.
- Dune Commander directory links remain suppressed.
- Dune deck-start links remain limited to Archidekt lanes: `Dune Commander decks`, `Midrange Commander shells`, and `Aggro archetype lane`.

## Tests Run

- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- Focused Dune personalized Maze output probe
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`
- `node assets/js/quick-reading-tests.js` - fails on pre-existing unrelated QUANDRIX golden-path assertion after the new Dune assertions execute
- `npm.cmd test` - fails on the same pre-existing unrelated QUANDRIX golden-path assertion
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed with LF-to-CRLF warnings only

## Related Handoff

- `docs/handoffs/2026-06-03-2236-codex-vm279-dune-maze-query-archidekt-links.md`
