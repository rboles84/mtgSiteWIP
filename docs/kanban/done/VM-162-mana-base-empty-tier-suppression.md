# VM-162 - Mana Base Empty Tier Suppression

ID: VM-162
Title: Mana Base Empty Tier Suppression
Status: done
Type: UI / Dossier Logic Fix
Area: Archscry Dossier, Mana Base Starting Map
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Completed: 2026-05-29

## Summary

Hid empty non-Basics mana-base tiers so deduped land recommendations do not leave users on blank Premium, Midrange, Budget, or Utility tabs.

## Scope Completed

- Kept Basics guidance always available.
- Rendered non-Basics mana-base tabs only when the tier has at least one land card.
- Normalized a saved/active mana-base segment to an available segment when the selected tier is empty for the current faction.
- Added regression coverage for mono White, where Budget can be empty after cross-tier dedupe.

## Non-Goals Preserved

- No placement scoring changes.
- No generated faction artifact rebuilds.
- No Bant identity/source data changes.
- No route CSS/JS, Maze, Home preview, or Supabase behavior changes.
- No reintroduction of duplicate budget cards just to fill a tier.

## Acceptance Evidence

- Mono White Budget remains empty at the data level after dedupe.
- Mono White Budget is not renderable as a mana-base segment.
- Bant still offers Budget because it has real budget cards.
- Basics guidance remains available.
- `node --check assets/js/index.js` passed.
- `node --check assets/js/commander-dossier.js` passed.
- `node research/archscry-dossier-followup-tests.js` passed.
- `npm.cmd run test:placement` passed.
- `npm.cmd test` passed.
- `git diff --check` passed with line-ending warnings only.
