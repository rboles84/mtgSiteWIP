# VM-551 Placement System Architecture Map

Remediation note: this architecture/runtime map is implementation-derived and survived byte reproduction unchanged. CECOS authority is now exact draft.4 per `audit-input-authority.md`; that correction changes evidence/derivation requirements, not the observed file/function path. The rejected positive-evidence counter and web-derived Hearthhull legality conclusion are not architecture authority.

Status: audit evidence, not an implementation design

Base: `2b4058ff4c769f03d52070204b3ce973e51decbd`

Runtime route: `/archscry/` (`archscry/index.html` plus `assets/js/index.js`)

## End-to-end flow

```text
archscry/index.html
  -> assets/js/index.js: loadCoreData()
     -> data/factions.json
     -> data/placement-model.json
     -> data/identity-layers.json
     -> optional taxonomy, precon, flavor, and Scryfall indexes
  -> startQuickReading()
     -> createInitialAdaptiveState()
  -> selectNextAdaptiveQuestion()
     -> Gate questions in fixed order
     -> Hall question for the first unasked identity among current top five
     -> optional Crucible question for a current top-four pair
  -> applyAdaptiveAnswer()
     -> likelihoodToDelta()
     -> direct score deltas
     -> suppressions
     -> optional prune markers (no current answer emits them)
     -> lateral inhibition
  -> shouldFinishAdaptiveReading()
     -> 4 Gate + at least 2 Hall
     -> stop after Crucible, after 8 total, after decisive gap, or after Hall exhaustion
  -> buildAdaptivePlacementResult()
     -> softmaxScores()
     -> rankAdaptiveFactions()
     -> top rank = primary
     -> ranks 2 and 3 = adjacent_matches
     -> top softmax share = confidence
     -> top-minus-second softmax share = confidence_gap
     -> buildAdaptiveDecree()
  -> cachePlacementResult() / optional profile persistence
  -> buildCommanderDossier()
     -> placement, primary/adjacent explanation, identity matrix, omens
     -> Commander browsing starts, tags, card signals, mana notes
     -> precon recommendations and Maze handoff
  -> renderResult()
     -> one SPA result route, panel/layout/view query state
```

## Actual model

The implemented model is a deterministic, adaptive, additive heuristic classifier with equal initial scores, a hand-authored likelihood-to-delta lookup, suppressions, lateral-inhibition deltas, softmax ranking, and rule-based question selection. It is Bayesian-inspired vocabulary around a weighted scoring model. It is not a fitted Bayesian posterior model:

- The values named `likelihoods` are not documented or validated as `P(answer | identity)`.
- The lookup values are not demonstrated log likelihood ratios.
- No response corpus estimates priors or likelihoods.
- Correlated questions are not modeled as dependent evidence.
- The softmax output is used as `confidence` without calibration against observed correctness.
- Exact ties are settled by identity-key sort order, not a Bayesian decision rule.

The audit therefore prohibits calling the result a Bayesian probability or calibrated confidence until those contracts exist and are validated.

## Source and generated boundaries

| Layer | Authority or artifact | Build/runtime role | Audit finding |
|---|---|---|---|
| Raw identity evidence | `data/raw-factions/<id>/*.sources.json`, `*.claims.json`, `*.profile.json`, `*.placement.json` | Canonical recovered identity records | Rich claim and semantic metadata exists for 37 identities. |
| Gate source | `data/placement/gate-compression.source.json` | Source for four fixed Gate questions and 20 answers | Uses W/U/B/R/G, outside-WUBRG, and all-five loadings; contains no answer-level claim/source references. |
| Builder | `research/build-faction-artifacts.mjs` | Generates factions, placement model, layers, readiness/provenance | Gate effects are algorithmically propagated from color loadings. Hall and Crucible are copied from a hard-coded `QUESTION_BANK`. |
| Placement model | `data/placement-model.json` | Live runtime scoring/config/question bank | Contains 37 identity metadata records, 113 questions, 356 answers. The raw `discriminator_questions` and minimum-hit guardrails are metadata, not live decision contracts. |
| Placement schema | `data/placement-model.schema.json` | Intended structural validation | Validates only coarse object presence; it does not enforce answer IDs, effects, source links, controlled signals, probability semantics, or decision invariants. |
| Identity display | `data/factions.json` | Live identity/copy/recommendation record | Large generated surface; mixes source-grounded identity content with editorial Commander guidance and curated recommendations. |
| Presentation templates | `assets/js/archscry-presentation.js` | Hero, signal, contrast, summary, tags, Maze paths | Mostly shared templates with a small set of pair-specific overrides. |
| Dossier templates | `assets/js/commander-dossier.js` | Placement/adjacent copy, Commander guidance, recommendations | Converts score-ranked identities and recent positive deltas into behavioral and Commander claims. |
| Runtime | `assets/js/index.js` | State machine, rendering, navigation, optional data | Loads one SPA route and renders primary or numeric adjacent views. |
| Persistence | `assets/js/shared.js` | Session cache and optional saved profile | Completed result uses `sessionStorage`; legacy normalization invents `0.66` or `0.6` confidence when absent. |
| Optional discovery | taxonomy, precon catalog, Scryfall indexes | Enriches recommendations/card examples | Placement works without them, so recommendation completeness varies by available optional data. |

## Question selection and scoring functions

| Function | File | Contract observed |
|---|---|---|
| `createInitialAdaptiveState` | `assets/js/adaptive-placement.js` | Gives every identity the same prior log score. |
| `likelihoodToDelta` | same | Chooses the nearest configured lookup key; it does not compute a probability ratio. |
| `applyAdaptiveAnswer` | same | Applies positive deltas, suppressions, prune markers, and lateral inhibition; returns a new replayable state. |
| `softmaxScores` | same | Converts arbitrary score vector to shares; pruned identities receive zero. |
| `rankAdaptiveFactions` | same | Sorts by share, then lexicographically by identity key on exact ties. |
| `findHallQuestion` | same | Chooses the first unasked Hall question belonging to a top-five candidate, otherwise the first unasked Hall question globally. |
| `needsCrucible` | same | Requests Crucible for a narrow top-two gap or collision pair. |
| `findCrucibleQuestion` | same | Searches fixed pair questions among top four. |
| `shouldFinishAdaptiveReading` | same | Stops at 6–8 answers using stage counts and score separation. |
| `buildAdaptivePlacementResult` | same | Serializes top three; calls rank 2/3 adjacent; exposes share as confidence. |

## Live model counts

- Identities: 37.
- Gate: 4 questions / 20 answers.
- Hall: 58 questions / 234 answers.
- Crucible: 51 questions / 102 answers.
- Total: 113 questions / 356 answers.
- Stable answer IDs: 20 of 356; all 336 Hall/Crucible answers rely on array position.
- Answer-level source or claim links: 0 of 356.
- Answers with suppressions: 356 of 356.
- Answers emitting `prunes`: 0 of 356.
- Answers positively affecting more than five identities: 26.
- Explicit neutral/none/unsure/mixed answers: 0.

## Dead, duplicate, and legacy behavior

- `scoring_rules.suppression_multiplier` is declared but not read by the adaptive runtime.
- `scoring_rules.broad_match_penalty` is declared globally, and per-identity placement metadata contains broad-match penalties, but the adaptive runtime does not apply either.
- `prune_delta` is logged for pruning, but no current live answer has `prunes`; the active prune path is therefore dead for current data.
- Raw `required_positive_min_hits` (typically two) and false-positive guardrails are generated into metadata but are not enforced by selection.
- Raw discriminator questions are carried into each identity record, while the live Hall/Crucible bank comes from separate hard-coded builder data.
- `quick-reading.js` and compatibility normalization in `shared.js` preserve legacy result paths alongside the adaptive runtime.
- Legacy result normalization supplies decorative confidence (`0.66` or `0.6`) when the old result has none.

## Copy and recommendation path

1. `buildAdaptiveDecree` uses the top identity, runner-up, recent evidence, and starter profile.
2. `buildCommanderDossier` merges display identity data, model identity metadata, result scores, shared templates, and hard-coded faction guidance.
3. `explainAdjacentFit` uses positive answer evidence for the adjacent identity when present, otherwise identity-level fallbacks.
4. `resolveSummaryAdjacentFit` starts from `adjacent_matches`; those are numerical ranks, not an adjacency graph.
5. Commander candidates come from curated faction records, not from answer-level evidence.
6. Precons are ranked by exact or one-extra-color legality lane, taxonomy/phrase/word overlap, and starter-profile score.
7. Maze and external browsing links are exploration aids; they do not prove placement, card legality, price, popularity, or strategic suitability.

## Route and state boundaries

- There are no 37 standalone identity result pages. `/archscry/` is one SPA route that renders a cached or saved result.
- `?view=`, `?panel=`, and `?layout=` select a view of an existing result; a clean direct URL does not construct a result.
- Partial questionnaire state is in memory and is lost on refresh.
- A completed result is cached in same-origin `sessionStorage` and can restore after refresh in that browsing session.
- Adjacent view keeps the original placement result and swaps the dossier target; it is not a new classification.
- The page title, canonical URL, and social metadata remain generic to `/archscry/` rather than identity/result-specific.

## Source-of-truth conclusion

No single file is the placement source of truth. The effective behavior is the intersection of:

1. authored Gate source,
2. hard-coded builder Hall/Crucible bank,
3. generated model metadata,
4. runtime decision code,
5. generated display identity content,
6. presentation/dossier templates,
7. optional recommendation datasets, and
8. session/profile compatibility behavior.

This split is the central pipeline risk: recovered CRIT-001 semantics are present, but the live evidence-to-score contract remains separate and unproven.
