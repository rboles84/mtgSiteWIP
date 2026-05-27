# VM-142 - Maze Strategium Glass Unification

## Status

Done.

## Type

Frontend / Visual Polish

## Area

The Implicit Maze

## Priority

Medium

## Summary

Tune The Implicit Maze glass surfaces so the route feels visually unified with Strategium's clearer, sharper translucent panel treatment.

## Completed

- Replaced Maze's major frosted blur treatment with a sharper Strategium-style dark transparent gradient.
- Aligned command deck, sidebar, results, modal/scratchpad shell, mode cards, search input, query inspector, builder panel, sidebar sections, results headers, and card shells around the same route-local glass family.
- Fixed a mobile horizontal overflow caused by wrapped-column search actions and a long Scryfall mode-card example.
- Compacted the mobile scratchpad toggle so it no longer covers mode-card text.
- Added a command-deck-specific darker glass override after human review showed the primary search surface was too light over the bright background center.
- Lifted the search textarea placeholder contrast for easier scanability.
- Updated manual QA notes and recorded the required handoff.

## Constraints Kept

- Did not change Maze parser/search/stash logic.
- Did not change `/maze/` routing, topbar wiring, or Archscry handoff behavior.
- Did not edit Strategium, Archscry, Apocrypha, homepage, canonical data, or generated artifacts.
- Kept the existing Vox Mana painted-background atmosphere and Commander-first tone.

## Verification

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser QA on `http://127.0.0.1:4175/maze/` confirmed:
  - Desktop command deck, sidebar, and results panel use `backdrop-filter: none`.
  - Desktop has no horizontal overflow, no mode-card overflow, and no console errors.
  - Mobile width `390px` has no horizontal overflow after the search-row wrap fix.
- Follow-up browser QA confirmed the command deck uses the darker `0.72 / 0.56` gradient while sidebar/results retain the lighter VM-142 base.
