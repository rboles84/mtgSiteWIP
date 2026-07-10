# VM-490 - Maze Partner And Name Search Repair

## Status

Done

## Summary

Repair the Partner/all-colors manual failure and the follow-up failure where bare card names fell back to `*` instead of executable Scryfall name searches.

## Completed Scope

- Treat `all colors` as an unconstrained color scope, never as a set name.
- Compile generic-card `cards with partner` wording to `o:partner`.
- Preserve exact unscoped `o:partner` through Operator's Hand without an automatic format default.
- Compile conservative bare card-name input to `name:"..."` and `/cards/search`.
- Preserve explicit `!Name` and `card named Name` behavior on the existing named-card modal path.
- Preserve Commander Partner candidates, `partner with`, negative Partner searches, mixed name-plus-filter format defaults, real set parsing, and unrelated search behavior.
- Add parser, contract, mode-switch, route UI, browser, manual QA, and documentation coverage.

## Acceptance Evidence

- `cards with partner in all colors` compiles and re-searches as exactly `o:partner`.
- `captain america` and `A-Alrund, God of the Cosmos` compile to executable `name:"..."` searches with no wildcard or implicit Commander format.
- Focused parser, contract, mode, UI, desktop/mobile browser smoke, semantic, lint, frontend, and full repository tests pass.
- Live Scryfall checks returned nonzero results for all three repaired query forms without pinning mutable counts.

## Not Touched

- Scryfall grounding generation or live data.
- Parser classification modes beyond the conservative bare-name fallback.
- Reading Finds, Archscry handoffs, or Maze layout/modal styling.
