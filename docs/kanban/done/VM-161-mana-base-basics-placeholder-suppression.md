# VM-161 - Mana Base Basics Placeholder Suppression

ID: VM-161
Title: Mana Base Basics Placeholder Suppression
Status: done
Type: UI / Data Normalization Fix
Area: Archscry Dossier, Commander Land Recommendations
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Completed: 2026-05-29

## Summary

Suppressed generic basic-land guidance terms from rendered mana-base card tiers so strings like `basics` do not appear as empty card placeholders in Budget, Premium, Midrange, or Utility lanes.

## Scope Completed

- Updated shared Commander dossier land normalization to omit generic basic placeholders.
- Preserved basic-land guidance in the Basics tab copy.
- Added Bant regression coverage because VM-160 exposed `basics` through Bant's generated budget line.
- Updated manual test guidance for the Mana Base Starting Map.

## Non-Goals Preserved

- No placement scoring changes.
- No Bant identity data changes.
- No generated faction artifact rebuilds.
- No route CSS/JS, Maze, Home preview, or Supabase behavior changes.

## Acceptance Evidence

- Bant Budget land recommendations no longer include `basics`.
- Bant Budget still includes `Bant Panorama`, `Path of Ancestry`, and `Evolving Wilds`.
- No Bant land tier includes generic basic placeholder terms.
- Basics guidance remains available in the Basics tab copy.
- `node --check assets/js/commander-dossier.js` passed.
- `node research/archscry-dossier-followup-tests.js` passed.
- `npm.cmd run test:placement` passed.
- `npm.cmd test` passed.
- `git diff --check` passed with line-ending warnings only.
