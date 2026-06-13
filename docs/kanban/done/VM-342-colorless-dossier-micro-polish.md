# VM-342 - Colorless Dossier Micro Polish

## Status

Done

## Summary

Fixed the remaining small Colorless dossier UX defects after VM-341 without changing raw Colorless JSON, generated artifacts by hand, public discovery, Commander Compass, routes, aliases, Home preview, Maze behavior, Supabase, schemas, or `colorless.webp`.

## Scope

- Corrected the `Colorless wants to infrastructure first` grammar.
- Replaced inherited Commander-card detected tags on strict Colorless orientation cards with controlled orientation chips.
- Removed duplicate visible card/land names from image placeholders while preserving accessible labels.
- Added a clearer Colorless-only mana-base primer row.
- Replaced repeated Colorless mana tier labels with more useful labels such as `Practical Upgrade Lane`.

## Acceptance Gates

- [x] No raw Colorless JSON edited.
- [x] No generated artifacts hand-edited.
- [x] No `colorless.webp` edits.
- [x] No Home preview, public routes, public aliases, directory links, Commander Compass, Supabase, schema, or Maze behavior changes.
- [x] Grammar bug is gone.
- [x] `Zhulodok` and `Omarthis` do not show broad inherited tags like `Combo`, `Chaos`, `Counters`, or `Death`.
- [x] Mana Base panel no longer reads as `Basics Premium Midrange Midrange` with a thin single-card surface.
- [x] `Ulalek` and `Eldrazi Incursion` do not become native Colorless support.

## Tests

- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `node assets\js\quick-reading-tests.js`
- `npm.cmd run validate:source-generated -- --targets=COLORLESS`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- Focused desktop rendered Colorless dossier browser spot-check for grammar, Commander chips, duplicate names, and Mana Base panel copy.
