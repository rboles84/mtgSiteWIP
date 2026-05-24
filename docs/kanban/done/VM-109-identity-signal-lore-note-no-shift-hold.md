# VM-109 - Identity Signal Lore Note + No-Shift Hold

Status: Done

## Summary

Refined the `newIndex2.html` Identity Signal hold state so it shows a compact lore-style field note sourced from Vox Mana JSON instead of a diagnostic score table, while preventing the hero panel from shifting when held.

## Scope Completed

- Replaced `Pattern` / `Strongest` held details with a field note.
- Added `data/factions.json` lookup for all 20 homepage identities.
- Preserved fallback to existing inline identity copy if the lore JSON cannot load.
- Changed the held note to an absolutely positioned floating panel so opening it does not resize the hero card.
- Preserved VM-108 hold/release behavior and existing passive cycle behavior.

## Validation

- Static scan confirmed diagnostic helper functions/IDs were removed.
- Static scan confirmed key Identity Signal IDs remain.
- Inline scripts compiled.
- Browser smoke confirmed the note uses lore-style copy, the hold state pauses, the release state hides the note, no console errors appear, and `.vm-hero-mana` height stays stable before/after holding.
- Route checks returned `200` for `/newIndex2.html`, `/basics/`, `/archscry/`, `/maze/`, `/apocrypha/`, and `/data/factions.json`.
- `npm.cmd test` passed.

## Notes

- The note uses Vox Mana-authored/source-backed fields from `data/factions.json`; no card flavor text or Scryfall quote extraction was added in this pass.
