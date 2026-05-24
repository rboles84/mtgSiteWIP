# VM-110 - Identity Signal Hold Note Readability + Cycle Timing

## Status

Done

## Summary

Fixed the `newIndex2.html` Identity Signal held lore note so it remains readable instead of clipped, and sped the passive Identity Signal cycle by 25%.

## Changes

- Moved the held lore note from a below-card floating position into an in-panel absolute overlay.
- Replaced the old `10.5rem` hidden clipping cap with a viewport-aware readable cap and scrollable overflow.
- Preserved the no-shift hold behavior by keeping the note absolutely positioned.
- Changed `heroManaCycleMs` from `6000` to `4800`.

## Acceptance Criteria

- Held lore notes are readable and scrollable if needed.
- Holding/releasing the signal does not change `.vm-hero-mana` height.
- `heroManaCycleMs` is `4800`.
- Existing Identity Signal IDs and behavior remain intact.
- No changes were made to `/basics/`, `/archscry/`, `/maze/`, `/apocrypha/`, root pages, shared CSS/JS, route links, chart data, or identity data.

## Tests

- Static scan for old clipping cap, preserved IDs, and updated cycle timing.
- Inline script compile.
- Browser smoke on `/newIndex2.html`.
- Route checks for `/newIndex2.html` and `/data/factions.json`.
- `npm.cmd test`.
