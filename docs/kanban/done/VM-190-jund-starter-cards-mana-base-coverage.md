# VM-190 - Jund Starter Cards And Mana Base Coverage

ID: VM-190
Title: Jund Starter Cards And Mana Base Coverage
Status: done
Type: Runtime Data / Dossier Quality
Area: Jund, Naya, Archscry, Commander Dossier
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Fill Jund Starter Card References with displayable, Commander-legal local Scryfall-resolved cards and ensure the live shard placements that were missing nonbasic mana-base metadata now have placement-fit land bases.

## Scope

- Add Jund starter-card references under creatures, instants/sorceries, and enchantments/artifacts.
- Add Jund land-base metadata for premium, midrange, budget, and utility lanes.
- Add Naya land-base metadata so all live placements have nonblank, placement-fit mana-base recommendations.
- Rebuild generated faction artifacts through `npm.cmd run build:factions`.
- Add regression coverage that Jund starter cards render and that every live placement has color-legal mana-base recommendations.

## Non-Goals

- Do not edit Jund raw claims, Jund evidence, Jund research docs, or Jund architecture docs.
- Do not add new lore claims, commander facts, evidence rows, manual-fill rows, routes, Home preview entries, or schema fields by hand.
- Do not add Naya starter-card references in this pass.

## Acceptance Criteria

- Jund Starter Card References render all three groups.
- Jund starter cards resolve against local Scryfall oracle data and satisfy Commander `id<=brg`.
- Jund and Naya mana-base tiers render premium, midrange, budget, utility, and basics.
- Every live placement has placement-fit mana-base metadata and rendered nonbasic land recommendations.
- Rendered land recommendations resolve against local Scryfall oracle data, are Commander legal, and satisfy each placement's Commander color identity.
- Raw Jund claims remain unchanged.

## Completion Notes

- Added Jund starter cards: Prossh, Korvold, Mayhem Devil; Terminate, Cultivate, Victimize; Goblin Bombardment, Moldervine Reclamation, Rhythm of the Wild.
- Added Jund land-base lanes around Jund duals/shocks, Savage Lands, Jund Panorama, Path of Ancestry, Command Tower, Exotic Orchard, Kessig Wolf Run, and Bojuka Bog.
- Added Naya land-base lanes around Naya duals/shocks, Jungle Shrine, Naya Panorama, Path of Ancestry, Command Tower, Exotic Orchard, Gavony Township, and Kessig Wolf Run.
- Rebuilt generated faction, placement, schema, and Supabase context artifacts through the approved builder.
- Extended dossier tests to verify actual Jund starter-card rendering and all-placement mana-base identity fit.

## Tests Run

- `node -e "JSON.parse(require('fs').readFileSync('data/identity-layers.json','utf8')); console.log('identity-layers json ok')"`
- `node --check research/build-faction-artifacts.mjs`
- Local Scryfall resolution check for selected Jund cards and Jund/Naya lands
- `npm.cmd run build:factions`
- `node --check assets/js/index.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`

## Guard Checks

- Selected Jund starter cards and Jund/Naya lands resolve in committed local Scryfall oracle data.
- Rendered all-placement mana-base cards resolve in committed local Scryfall oracle data and satisfy each placement's Commander color identity.
- `data/raw-factions/jund/jund.claims.json` was not edited.
