# VM-547 Owner Review

Status: Owner Review — RobQA PASS on exact material candidate `9bdd4cd2cdbc9371f7f1256c0d8e9dbdcc1ddb93`; no push or merge

Exact material candidate: `9bdd4cd2cdbc9371f7f1256c0d8e9dbdcc1ddb93`

VM-547 keeps the Archscry handoff compact and moves the richer explanation into Maze. The user opens one of the dossier's top-level discovery choices, arrives in Maze with the dossier name and reading intact, sees whether the lane is broad or semantic, chooses an identity-specific thread by meaning, can inspect the exact Scryfall syntax if desired, sees the actual cards, and returns to the same dossier and Maze Discovery section.

## Canonical ownership

- `data/dossier/identity-dossier-content.source.json` remains the approved meaning owner for all 37 dossier readings. VM-547 does not rewrite those semantics.
- `data/dossier/maze-discovery-profiles.source.json` owns the reviewed Scryfall projection: three mechanical threads, story vocabulary, color identity, and stretch availability for each dossier.
- `scripts/build/build-maze-discovery-profiles.mjs` validates those relationships and produces the runtime catalog.
- `assets/js/maze/maze-handoff.js` remains the single runtime path factory used by both Archscry and Maze. There are no separate Archscry and Maze definitions.
- No runtime AI generates these searches, and no popularity ranking is represented as Vox Mana fit.

## User-facing changes

Archscry still presents one compact `Maze Discovery Paths` card. It exposes only immediately understandable top-level choices and never expands query syntax or semantic-thread detail in the dossier. The broad commander entry is now `Commanders in this identity`, not `Commanders That Fit`, because its query is an exact color-identity eligibility pool rather than a semantic ranking.

Maze adds a source-context panel above results. It names the originating dossier, shows the approved mechanical reading, identifies the active lane, explains that lane in ordinary language, and offers its governed semantic threads. Each thread leads with its meaning and interpretation; `Inspect the Scryfall query` is collapsed by default. Selecting a thread executes its displayed operator query and keeps the existing result grid and Query Inspector behavior.

The support lane makes the chain explicit: dossier reading -> mechanical thread -> plain-English interpretation -> actual card search. Mechanical threads are anchored to approved `what_to_look_for` items and use bounded mechanical operators. The story lane uses only `ft:` vocabulary and explicitly says it is not a mechanical-fit claim.

Outside-color stretch now combines `-id<=<original identity>` with one named mechanical thread from that dossier. It therefore means “different colors, preserved reading characteristic,” not “remove the original color restriction and accept a word match.”

## Semantic trust assertions

- PASS — A displayed label never claims semantics absent from its query.
- PASS — Broad exact-color-identity commander searches are labeled and described as broad pools.
- PASS — Mechanical thread labels map to approved dossier items and bounded Scryfall mechanical concepts.
- PASS — Flavor/story searches use explicit flavor-text vocabulary and do not masquerade as mechanical searches.
- PASS — Outside-color stretch retains a named mechanical thread while excluding the original identity.
- PASS — No raw popularity order is presented as Vox Mana fit.
- PASS — No runtime AI generates semantic searches.
- PASS — No approved dossier meaning was rewritten solely for query convenience.
- PASS — Archscry and Maze consume the same generated catalog through the same path factory.

## Exhaustive QA counts

| Gate | Result |
|---|---:|
| Dossiers discovered | 37 / 37 |
| Dossiers with canonical discovery profiles | 37 / 37 |
| Dossiers rendered successfully through Archscry | 37 / 37 |
| Dossiers successfully rehydrated by Maze | 37 / 37 |
| Top-level path coverage | 148 / 148 governed states; 147 executable paths plus 1 explicit WUBRG unavailable boundary |
| Semantic-thread coverage | 148 / 148 unique source threads; 367 / 367 lane projections |
| Positive fixtures | 148 / 148 |
| Negative fixtures | 148 / 148 |
| Boundary fixtures | 148 / 148 |
| Query-generation tests | 514 / 514 |
| Query-label truthfulness checks | 514 / 514 |
| Return-navigation tests | 3 / 3 |
| Desktop/browser tests | 74 / 74 route renders: 37 Archscry plus 37 Maze |
| Narrow desktop/tablet browser tests | 8 / 8 representative dossier flows |
| Mobile/browser tests | 8 / 8 representative dossier flows |
| Accessibility checks | 48 / 48 |
| Established Maze context/history browser regression | 1 / 1 |
| Existing regression suite | 16 / 16 suites |

The generated, reviewable matrix for every dossier is [VM-547 all-37 discovery review matrix](2026-09-04-vm547-all-37-discovery-matrix.md). Every row contains identity, color identity, all top-level path types and displayed labels, semantic threads, plain-English interpretations, generated queries, fixture counts, status, and exception notes.

Positive fixtures prove that each governed source thread reaches every intended lane. Negative fixtures prove that mechanical threads do not leak into flavor lanes and flavor vocabulary does not leak into support lanes. Boundary fixtures prove commander/support/stretch roles, exact/within/outside color relations, Colorless construction, and WUBRG suppression.

Skipped tests: None.

The existing suite initially exposed stale assertions against already-current Archscry copy, official hero assets, curated starter records, and historical-print flavor excerpts. The assertions were rebound to the current owners; the seven committed historical-print excerpts remain an exact allowlist, so future unmatched excerpts still fail. This maintenance changes no unrelated runtime surface. The source/generated guardrail suite also reported its two pre-existing model-owned JESKAI and MARDU warnings while passing; neither warning concerns VM-547 discovery profiles.

Commands passed before candidate freeze:

- `npm run test:maze-discovery-profiles`
- `npm run test:vm547-browser`
- `npm run test:maze-onboarding-browser`
- `npm test`
- `npm run lint:js`
- `npm run lint:html`
- `npm run test:source-generated`

## Intentional exceptions

- TEMUR — the optional `Survival Through Attunement` interpretive lens stays in the dossier but is not converted into a mechanical search; a card query cannot prove that lens. Temur's three approved mechanical threads remain queryable.
- WUBRG — Five-Color has no logically valid outside-color Commander space. Maze suppresses the impossible path and explains the boundary. The optional `Full-Spectrum Integrator` interpretation also remains dossier interpretation rather than a query claim.

All 37 automated matrix rows are PASS. No dossier is flagged REVIEW or FAIL by the semantic audit.

## Protected behavior

The change does not redesign the Archscry hero, dossier typography, unrelated dossier cards, global navigation, Maze result cards, unrelated Maze entry modes, backgrounds/atmosphere, or hover/focus behavior outside the new scoped panel. Placement scoring, the generated faction model, parser/compiler semantics, results ranking, and persistence keys are unchanged.

## Local Owner Review

Start command: `python -m http.server 4177 --bind 127.0.0.1`

Archscry: `http://127.0.0.1:4177/archscry/?explore=witherbloom&panel=maze-discovery#maze-discovery-paths`

Maze direct access: `http://127.0.0.1:4177/maze/` (start in Archscry for dossier-context review)

No cache workaround is required; the local server and catalog loads use current files, and changed entry assets have a VM-547 cache key.

Shortest representative click order:

1. Witherbloom — all four lanes; inspect two commander threads, two support threads, two stretch threads, query details, and return.
2. Azorius — commander and support; compare its permission/rule-setting substance with Witherbloom.
3. Temur — commander and support; verify its lanes remain distinct from generic Temur good-stuff.
4. Green — broad commander, support, and stretch with one-color constraints.
5. Colorless — exact colorless construction, support, and outside-color interpretation.
6. Yore — four-color density and long-label wrapping.
7. Five-Color / WUBRG — explicit unavailable outside-color boundary and no fabricated fourth action.
8. Golgari — compare directly with Witherbloom to verify equal colors do not imply equal discovery semantics.

Owner decision requested after reviewing the exact candidate: `ACCEPT`, `ACCEPT WITH SMALL FOLLOW-UP`, or `REVISE`.
