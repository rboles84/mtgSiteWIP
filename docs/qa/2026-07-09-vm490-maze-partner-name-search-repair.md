# VM-490 Maze Partner And Name Search Repair QA

## Scope

This QA record covers the manual Partner/all-colors failure and the follow-up bare card-name failure. It does not change generated grounding, Scryfall data, Reading Finds, Archscry contracts, or Maze presentation.

## Reproduced Failures

- `cards with partner in all colors` compiled to `kw:partner (game:paper) (set:all) prefer:best`, then Operator's Hand appended `f:commander`.
- `captain america` compiled to `*` with unresolved `captain` and `america`.
- `A-Alrund, God of the Cosmos` could be partially misread as a God type search instead of a card name.

## Expected Results

| Input | Mode | Expected executable request |
|---|---|---|
| `cards with partner in all colors` | Plain Reading | `/cards/search?q=o:partner` |
| `o:partner` | Operator's Hand, Commander selected | `/cards/search?q=o:partner` |
| `captain america` | Plain Reading | `/cards/search?q=name:"captain america"` |
| `A-Alrund, God of the Cosmos` | Plain Reading | `/cards/search?q=name:"A-Alrund, God of the Cosmos"` |
| `!Captain America, First Avenger` | Plain Reading | Existing `/cards/named` modal route |

## Regression Controls

- `commanders with partner` remains `kw:partner is:commander legal:commander`.
- `partner with` and negative Partner searches retain keyword semantics.
- Other scoped Oracle queries still receive normal selected-format defaults.
- `name:"Token Collector" c:w` still receives the selected format; standalone name lookups and display-only name variants do not.
- Unresolved non-name prose remains a guarded wildcard rather than being sent to Scryfall as raw prose.

## Automated Evidence

- `npm.cmd run test:parser`: 226 cases passed.
- `node research\maze-query-contract-tests.js`: passed.
- `npm.cmd run test:mode`: passed.
- `node research\maze-search-tests.js`: passed.
- `npm.cmd run test:browser-smoke`: passed on desktop and mobile.
- `npm.cmd run test:plain-reading-semantics`: passed.
- `npm.cmd run lint:js`: passed.
- `npm.cmd run lint:html`: passed.
- `npm.cmd run test:frontend-smoke`: passed.
- `npm.cmd test`: passed.

## Live Scryfall Evidence

On 2026-07-09, direct API checks returned nonzero results for `o:partner`, `name:"Captain America"`, and `name:"A-Alrund, God of the Cosmos"`. The automated tests do not pin mutable result counts.
