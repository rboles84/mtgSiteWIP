ID: VM-141
Title: Expand Remaining Precon Recommendations In Archscry
Status: done
Type: UX / Archscry
Area: Archscry, Commander Compass
Priority: high
Created: 2026-05-26
Completed: 2026-05-26

## Summary

Added an in-panel `Display other [N]` toggle to Archscry's `Recommended Precon Decks` section so the default view stays capped at four cards while users can swap to the remaining recommendations for the active dossier view.

## Acceptance Criteria

- Collapsed Archscry precon render shows at most four cards.
- `Display other [N]` swaps the first four cards with the remaining recommendations in place.
- `Show first 4 precons` swaps back without re-rendering the dossier or scrolling to the top.
- Visible and remaining cards preserve VM-140 group order: `nativeExact`, `otherExact`, then `stretch`.
- Adjacent-fit switching recomputes the pool and returns the section to collapsed state.
- The old `Full precon browsing can be added later` copy is removed.
- No Apocrypha route, shelf, link, or test is added.
- No precon source data, generated schemas, recommendation ranking math, placement logic, dossier rail structure, or second-commander fields change.

## Verification

- `node research/archscry-dossier-followup-tests.js`
- `node research/precon-artifact-tests.js`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`

## Notes

- This is a presentation-only follow-up to VM-140.
- The recommendation engine still returns the full VM-137 grouped recommendation pool.
- The reveal control toggles hidden pre-rendered grids instead of calling `renderResult`, avoiding the scroll jump from the earlier implementation attempt.
- The compact grid CSS explicitly honors `[hidden]` so the first-four and remaining grids actually swap visually.
