# VM-547 Owner Review — canonical browser-runtime revision

Status: Owner Review — exact-candidate VM-547 RobQA PASS; no push or merge

Exact material candidate: `dd82bc3549b07c074fe0ee55f8c6b192bf55d1fa`

Generated catalog runtime revision: `vm547-runtime-v5`

Generated catalog fingerprint: `e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db`

The accepted architecture and flow remain intact. Archscry still presents one compact `Maze Discovery Paths` handoff. The user chooses a broad commander pool, mechanical support, story vocabulary, or outside-color stretch; Maze then restores the dossier name and approved reading, explains the active lane, exposes identity-specific semantic threads, leads with a plain-English interpretation, keeps operator syntax collapsed, shows the actual cards, and returns to the same dossier and section.

## Canonical ownership and user-facing behavior

- `data/dossier/identity-dossier-content.source.json` remains the approved meaning owner for all 37 readings. No dossier meaning was rewritten to suit Scryfall.
- `data/dossier/maze-discovery-profiles.source.json` owns the reviewed projection of those meanings into thread labels, interpretations, operator clauses, story vocabulary, and truthful lane-specific availability.
- `scripts/build/build-maze-discovery-profiles.mjs` validates the 37-source relationship and produces the runtime catalog.
- `assets/js/maze/maze-handoff.js` remains the only runtime path factory. Archscry and Maze cannot drift into separate definitions.
- Archscry remains the compact entry point. The richer reading, semantic threads, unavailable explanations, and optional query inspection remain in Maze.
- The broad entry remains `Commanders in this identity`, explicitly described as an exact color-identity pool and not a Vox Mana fit ranking.
- Mechanical threads use governed Oracle/mechanical concepts. Flavor/story threads use `ft:` vocabulary and explicitly avoid mechanical-fit claims.
- Stretch combines an outside-identity commander boundary with a named dossier characteristic. Where that intersection is not useful and nonempty, Maze explains the unavailable thread and exposes no Search or query-syntax action.
- No popularity ranking, runtime AI generation, placement/scoring change, or result-rank change is present.

## Owner-reported runtime defect and repair

Candidate `b0a3ba8462e3f5fcd1a20a21131cd765e3714fab` remains accepted only for its semantic architecture and projection quality; its Owner acceptance is invalid. Successive checks in the Owner's persistent browser found that the delivery graph was only partly versioned: the entry could import an unversioned data loader; alternate render paths such as Identity Atlas could invoke the older `vm625` dossier renderer; and even the provisional r4 repair still let state/card-media dependencies request an unversioned second copy of the presentation module. Maze also preferred stale incoming URL queries to the canonical profile it had loaded. This explains how new WUBRG presentation behavior and legacy labels/queries could coexist.

The replacement candidate fixes ownership without rewriting any profile:

- Every relative JavaScript import in the Archscry graph—including boot, actions, state, card media, dossier, Identity Atlas, interview, questionnaire, presentation, data, and their dependencies—uses cache revision `vm547r5`. The Maze handoff/query graph uses the same revision. Frontend validation now scans the graph generically and fails on any missing or different Archscry import revision instead of checking only an enumerated subset.
- Every catalog carries deterministic runtime revision `vm547-runtime-v5` and SHA-256 fingerprint `e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db`.
- Archscry exposes the loaded profile/revision/fingerprint as nonvisual DOM/link metadata and embeds the same evidence in the handoff URL.
- Maze resolves the claimed canonical profile and selected path from its loaded catalog, replaces stale incoming query/plain-language payloads, and makes canonical state authoritative at execution.
- A canonical Archscry route fails closed if its catalog/profile/path is unavailable. Legacy fallback remains only for callers that do not claim a canonical `fit` route.
- Real-route automation now starts at each public `?explore=<slug>` dossier, clicks the rendered Archscry action, checks all four payload layers, rehydrates Maze, selects a thread, and checks the query at the execution boundary.

## Card-level semantic-quality remediation

The rejected candidate structurally generated 367 projections but left 29 empty in the pinned local corpus and did not pin lane-specific card evidence. The revision audits the actual result population for every projection against the governed 38,626-card Oracle corpus.

- 24 broad-primitive findings in the rejected candidate were remediated; 0 remain. Standalone high-recall branches such as `t:artifact`, `t:creature`, bare token/copy/damage/sacrifice, and generic target primitives can no longer satisfy a narrower label.
- 48 top-level OR queries wore conjunctive labels in the rejected candidate; all were reviewed and relabeled or relationally tightened; 0 composite-label findings remain.
- 50 mechanical-thread query/interpretation projections were tightened, 62 displayed labels were made truthful, and two stretch lanes received narrower lane-specific clauses.
- All 29 former zero-result records were resolved: 16 now return meaningful nonempty populations and 13 are explicitly unavailable with explanations.
- Seven named false-positive regressions are pinned so reminder text, self-restriction, unrelated sentence co-occurrence, and generic each-player wording cannot silently return.
- Every executable projection pins a lane-specific positive card that must remain reachable, a plausible same-role semantic negative that must remain excluded, and a boundary card that must remain outside its commander/support/stretch/flavor constraints.

The compact dossier index is [VM-547 all-37 discovery review matrix](2026-09-04-vm547-all-37-discovery-matrix.md). It shows the top-level queries and links each dossier to the exhaustive [all-367 projection card evidence](2026-09-04-vm547-all-367-projection-evidence.md), which records the dossier, governed source thread, lane, displayed label, interpretation, exact operator query, local result count, positive, semantic negative, boundary, status, and exception for every projection.

## Semantic trust confirmations

- PASS — A displayed label never claims semantics absent from its underlying query.
- PASS — Broad color-identity searches are labeled and explained as broad color-identity searches.
- PASS — Mechanical labels map to governed mechanical concepts.
- PASS — Flavor/story searches use flavor/story vocabulary rather than masquerading as mechanical searches.
- PASS — Outside-color stretch preserves named dossier characteristics rather than merely removing the color ceiling.
- PASS — No raw popularity ranking is presented as Vox Mana fit.
- PASS — No runtime AI generates semantic searches.
- PASS — No dossier semantics were rewritten solely to make Scryfall querying easier.
- PASS — Archscry and Maze consume one catalog through one shared path factory.

## Exhaustive QA counts

| Gate | Exact result |
|---|---:|
| Dossiers discovered | 37 / 37 |
| Canonical discovery profiles | 37 / 37 |
| Archscry renders | 37 / 37 |
| Maze rehydrations | 37 / 37 |
| Top-level path coverage | 148 / 148 governed states; 147 executable plus 1 explained WUBRG boundary |
| Semantic-thread coverage | 148 / 148 source threads; 367 / 367 lane projections |
| Executable projections | 354 / 367 |
| Intentionally unavailable projections | 13 / 367 |
| Nonempty-result checks | 354 / 354 executable |
| Executable zero-result projections | 0 |
| Projection-level positive fixtures | 354 / 354 executable |
| Projection-level semantic-negative fixtures | 354 / 354 executable |
| Projection-level boundary fixtures | 354 / 354 executable |
| Query-generation tests | 501 / 501 executable top-level/thread queries |
| Query-label truthfulness checks | 501 / 501 executable top-level/thread queries |
| Broad-primitive audit | 24 found and remediated; 0 unresolved |
| Composite-label audit | 48 found and remediated; 0 unresolved |
| Named prior false-positive guards | 7 / 7 |
| Return-navigation tests | 3 / 3 |
| Desktop/browser tests | 74 / 74 route renders: 37 Archscry plus 37 Maze |
| Narrow desktop/tablet browser tests | 8 / 8 representative flows |
| Mobile/browser tests | 8 / 8 representative flows |
| Accessibility checks | 48 / 48 |
| Unavailable-projection UI checks | 14 / 14 representative/commander renders |
| Canonical fallback/stale-payload checks | 2 / 2 |
| Catalog/profile provenance checks | 37 / 37 Archscry plus 37 / 37 Maze |
| Existing regression suite | 16 / 16 suites |

Skipped test: `npm run test:maze-onboarding-browser`. This protected VM-616 visual harness passed before the earlier candidate freeze, then timed out twice at different subjective visual waits. Per the Owner's explicit direction, it was not rerun for this candidate and is not counted as a pass. The VM-547 route, provenance, responsive mechanics, accessibility mechanics, and history assertions all ran in the dedicated browser gate.

Commands passed on exact material candidate `dd82bc3549b07c074fe0ee55f8c6b192bf55d1fa`:

- `npm run test:maze-discovery-profiles`
- `npm run test:vm547-browser`
- `npm test`
- `npm run lint:js`
- `npm run lint:html`
- `npm run test:source-generated`
- `git diff --check`

## Actual Owner-route browser witnesses

Every row was collected by opening the public Archscry dossier, clicking `Cards that support this shape`, selecting the first available governed thread, and reading the final query from Maze's execution boundary. All rows loaded runtime `vm547-runtime-v5` and catalog fingerprint `e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db`.

| Dossier | Identity | Archscry label | Loaded profile | Selected thread | Plain-English interpretation | Final operator query |
|---|---|---|---|---|---|---|
| Witherbloom | BG | Cards that support this shape | WITHERBLOOM / vm547-runtime-v5 | Pests moving life into value | Find Pests connected to life gain, life loss, or sacrifice rather than a generic death mention. | `id<=bg f:commander -is:commander -t:land ((t:pest OR o:pest) (o:"gain life" OR o:"lose life" OR o:sacrifice))` |
| Azorius | WU | Cards that support this shape | WU / vm547-runtime-v5 | Taxes or visible restrictions | Find cards that increase an opponent's spell costs or explicitly limit an opponent's attacking or casting. | `id<=wu f:commander -is:commander -t:land (o:"spells your opponents cast cost" OR o:"creatures your opponents control can't attack" OR o:"your opponents can't cast" OR o:"can't attack you")` |
| Temur | GUR | Cards that support this shape | TEMUR / vm547-runtime-v5 | Power-four payoffs or Ferocious | Find Ferocious or effects that explicitly care about power 4 or greater. | `id<=gur f:commander -is:commander -t:land (o:ferocious OR o:"power 4 or greater" OR o:"power 4 or more")` |
| Green | G | Cards that support this shape | G / vm547-runtime-v5 | Ramp or land acceleration | Find cards with a ramp function or land-to-battlefield acceleration. | `id<=g f:commander -is:commander -t:land (otag:ramp OR (o:land o:battlefield))` |
| Colorless | C | Cards that support this shape | COLORLESS / vm547-runtime-v5 | True colorless mana | Find cards that produce or explicitly require true colorless mana. | `id<=c f:commander -is:commander -t:land (produces:c OR o:"{C}")` |
| Yore | WUBR | Cards that support this shape | YORE / vm547-runtime-v5 | Artifact engines and repeated activation | Find artifact cards that sacrifice, untap, copy, or explicitly govern repeated activation. | `id<=wubr f:commander -is:commander -t:land (t:artifact (o:sacrifice OR o:untap OR o:copy OR o:"activate only"))` |
| Five-Color / WUBRG | WUBRG | Cards that support this shape | WUBRG / vm547-runtime-v5 | Five-Color toolbox access | Find tutor functions that help a commander-specific Five-Color plan assemble its chosen answers. | `id<=wubrg f:commander -is:commander -t:land otag:tutor` |
| Golgari | BG | Cards that support this shape | BG / vm547-runtime-v5 | Trade, then reclaim | Find cards that return spent permanents or creatures from the graveyard. | `id<=bg f:commander -is:commander -t:land (o:return o:graveyard)` |

Witherbloom and Golgari both use BG identity, but they resolve different profile IDs, labels, interpretations, and final queries. This is asserted directly by the browser gate.

## Intentional exceptions and unavailable intersections

- NAYA — `instinctive-protection / commander` has no exact Naya commander granting the bounded board protection the thread promises.
- UR / Izzet — `jump-start / commander` has no exact Izzet commander joining discard to recasting an instant or sorcery from the graveyard.
- WITHERBLOOM — `pest-life-exchange / stretch` has no outside-Black-Green commander joining Pest text to life exchange or sacrifice.
- TEMUR — `ferocious-power-four / commander` has no exact Temur commander with Ferocious or an explicit power-four payoff. The optional `Survival Through Attunement` lens also remains interpretation rather than a query claim.
- SULTAI — `calculated-ruthlessness / commander` has no exact Sultai commander directly tutoring, stealing control, or countering a spell under the bounded query.
- JESKAI — `disciplined-tempo / commander` has no exact Jeskai commander with the bounded counterspell or spell-protection clause.
- YORE — `artifice-archive / commander` and `/ stretch` have no truthful commander population that is itself an artifact and explicitly returns, casts, or puts artifact cards from a graveyard into use.
- GLINT — `storm-opportunity / commander` is unavailable because Yidris has neither Storm nor spell-copy text.
- INK — `protected-commons / commander` and `/ stretch` have no card joining each-player shared value to the bounded counterspell or board-protection clause; the support projection remains available.
- WITCH — `calculated-expansion / commander` and `protected-investment / commander` do not exist among the two exact Witch commanders. The Atraxa namesake negative is explicitly pinned so `Atraxa, Grand Unifier` cannot inherit `Atraxa, Praetors' Voice` semantics.
- WUBRG — Five-Color has no logically valid outside-color Commander space. The top-level stretch action remains suppressed and explained; the optional `Full-Spectrum Integrator` lens remains interpretation rather than a query claim.

Every unavailable record remains visible as a governed Maze thread with an explanation, but it has no fabricated query or Search action. Every projection record is PASS; none is REVIEW or FAIL.

## Protected behavior

This revision does not redesign the Archscry hero, dossier typography, unrelated dossier cards, global navigation, Maze result cards, unrelated Maze entry modes, backgrounds/atmosphere, or hover/focus treatment outside the changed thread state. It does not alter placement, scoring, parser/compiler semantics, result ranking, persistence keys, or VM-616 history behavior.

## Local Owner Review

Start command already executed: `python -m http.server 4177 --bind 127.0.0.1`

Archscry: `http://127.0.0.1:4177/archscry/?explore=witherbloom&panel=maze-discovery&vm547=vm547r5#maze-discovery-paths`

Maze direct access: `http://127.0.0.1:4177/maze/` (start in Archscry for dossier context)

Browser/cache instructions: None. The changed entry modules have a new VM-547 revision key, and the generated catalog is fetched with `no-store`.

Shortest representative click order:

1. Witherbloom — all four lanes; inspect two commander, support, and stretch threads, query details, and return.
2. Azorius — commander and support; compare its permission/rule-setting substance with Witherbloom.
3. Temur — commander and support; verify power-four, big-mana, and copied-spell lanes do not collapse into good-stuff.
4. Green — broad commander, support, and stretch with one-color constraints.
5. Colorless — truthful exact-colorless construction, support, and outside-color interpretation.
6. Yore — four-color density, long-label wrapping, and the explained archive unavailability.
7. Five-Color / WUBRG — explicit unavailable outside-color boundary and no fabricated fourth action.
8. Golgari — compare directly with Witherbloom to verify equal colors do not imply equal discovery semantics.

Owner decision requested: `ACCEPT`, `ACCEPT WITH SMALL FOLLOW-UP`, or `REVISE`.
