# VM-487 Maze Scryfall Checklist Follow-up QA

## Source Baseline

Source report: `C:\Users\obake\Downloads\scryfall_checklist_report_2026-07-09_1916.md`.

The report recorded 39 of 111 rows tested, 36 pass, 3 fail, and 72 untested. Current-source probes showed that several suspicious PASS notes were already stale, but two defects still reproduced: positive `without mill` handling and redundant unresolved Commander-legality terms.

## Repaired Cases

| Case | Before | VM-487 | Result |
|---|---|---|---|
| Rakdos Villains | Exact `c=br` omitted mono-black and mono-red Villains. | `type:villain c<=br -c:c legal:commander` plus the scoped Spider-Man family. | Pass |
| Silverquill Inkling tokens | `s:stx` searched the playable parent set and returned zero. | `type:inkling type:token c<=wb s:tstx`; color context and token warning preserved. | Pass |
| Glint treasure and draw | Strict query correctly returned zero but offered only one-category or identity-dropping relaxations. | Strict primary preserved; combined fallback is `id=ubrg is:commander legal:commander`. | Pass |
| Mono-blue without mill | `without mill` became positive `o:mill`. | Emits `-o:mill`; positive mill remains `o:mill`. | Pass |
| Candidate plus legal wording | Query contained correct legality while diagnostics still reported unresolved `legal, commander`. | Redundant phrase is consumed; query and legality remain unchanged. | Pass |

## Controls

- Commander candidates remain exact `id=` and deck support remains `id<=`.
- Explicit exact-color and single-color actual-card searches remain unchanged.
- Token objects do not receive normal-card `-c:c` pool behavior.
- Explicit token-set input remains exact; multiple/no-child parent cases are deterministic.
- Token-maker card searches remain on playable sets and retain Commander legality.
- No Partner syntax is generated for Glint recovery.

## Live Scryfall Sanity Check

Checked 2026-07-09 without pinning counts in automated tests:

- Rakdos repaired query: 26 cards.
- Silverquill `s:tstx`: 1 card.
- Strict Glint query: 0 cards; exact-identity fallback: 1 card.
- Mono-blue `without mill`: nonzero results.
- Glint Commander 2016 legality control: 1 card.

## Automated Validation

- `node --check research\scryfall-grounded-compiler.js` - passed.
- `npm.cmd run test:plain-reading-semantics` - passed.
- `npm.cmd run test:parser` - 221 cases passed.
- `node research\maze-query-contract-tests.js` - passed.
- `node research\maze-search-tests.js` - passed.
- `npm.cmd run test:mode` - 10 mode and 12 leakage cases passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:browser-smoke` - desktop and mobile passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with existing line-ending warnings only.

## Deferred

The 72 untested checklist rows remain a separate interactive testing pass. No checked-in command regenerates the downloaded report.
