# Current Archscry UI And Copy Inventory

## Evidence basis

This inventory uses the integrated VM-551 audit, current implementation at base `ec562f268181c9feb042eef9df20777730d64f0f`, and the existing quiz-to-dossier capture harness at `scripts/visual-regression-archscry.mjs`. No production behavior or visual baseline was changed or accepted.

The existing harness covers landing plus Placement, Why This Fits, Start Here, Commander Browsing Starts, Card Signals, and Mana Notes at desktop and mobile viewports. It follows a generated golden path; it does not independently prove accuracy and does not capture every live question, the animated reveal, close/legacy/invalid/incomplete states. Those gaps are future regression requirements.

## End-to-end current experience

| Surface | Current behavior and evidence | Gate A concern |
|---|---|---|
| Quick Reading entry | Landing promises color signals, play-pattern instincts, nearby fits, and Commander exploration; it says users can “explore adjacent fits.” `archscry/index.html:117-145`. | “Adjacent” implies a semantic relation the rank data does not establish. |
| Gate | `startQuickFlow()` initializes the adaptive state. `renderQuickQuestion()` shows `Gate n - Question n of up to 8`. | Stage vocabulary is acceptable; copy must not imply Bayesian/scientific assessment. |
| Hall | `selectNextAdaptiveQuestion()` chooses Hall questions from current leaders. Back calls `replayAdaptiveSelections()` and can change the later branch. | State/copy derivation must use the replayed final trail, never stale UI state. |
| Crucible | `needsCrucible()` compares leading softmax shares/collision pairs. `shouldFinishAdaptiveReading()` ends at Crucible, eight maximum, or an authored six-question gap. | These are adaptive control rules, not calibrated confidence thresholds. |
| Answers/progress | Native buttons render exact authored titles/copy; the path is seven or eight questions in common completion cases, with Back available. | Gate A does not edit any of the 113 questions or 356 answers. Focus/progress cannot regress. |
| Initial quick result | `finalizeQuickReading()` builds, caches, and immediately opens rank one’s dossier. | No bounded reveal state; every completed payload appears like an ordinary primary. |
| Terminal reveal | `revealDecree()` shows faction, tagline, stored decree, and “affinity” for numerical rank two. | Stored decree/runner-up copy can overstate recognition, strength, and relationship. `dossier.decreeCopy` is carried in the dossier object but is not currently rendered by the browser dossier, text renderer, or audit output. |
| Placement dossier | `getActiveResultContext()` chooses live/profile/cache/Maze-handoff data; `renderResult()` builds primary or requested alternative view. | Direct URL/handoff can request a numerical alternative without public eligibility. |
| Hero/status | Hero says “Your …” or “Adjacent … Fit”; dossier says primary fit or adjacent fit. `index.js:3153-3161`; `commander-dossier.js:3043-3077`. | Identity ownership and adjacency are asserted too strongly. |
| Summary strip | First card is always an Adjacent fit and may choose a color fallback; `resolveSignalBand()` labels it strong/moderate/emerging. | Numerical/fallback paths appear meaningful and calibrated; card must be omittable. |
| Authored Mana Alignment Matrix | Visible radar resolves active identity `preview_scores`, with component-average fallback, on Order/Knowledge/Ambition/Freedom/Growth. `vm-radar.js`; `dossier-radar.js`. | Authored identity shape, not placement confidence; preserve unchanged. |
| Placement-derived mana alignment | `buildManaScores()` writes `mana_scores`; normalization/persistence retain it; dossier creates `manaAlignment`. It does not set the visible authored radar. | Preserve this distinct second numeric path and its consumers. |
| Shape of the Reading | “Why X Rose First” / “X As Adjacent Fit” sits beside Signal Strength percent, meter, and bands. `buildDiscoverySummaryHtml()`; `buildSignalStrengthCardHtml()`. | Main fake-precision surface; replace with bounded state, not CSS hiding. |
| Why This Fits | Faction fork, layered identity, How This Plays, and Why This Fits You tag cards. `buildDossierInterpretationHtml()`. | Motivation, deck, and opponent-perception prose can exceed selected-answer evidence. |
| Signals From Your Answers | `buildReadingOmens()` derives cards from `evidence_trail`; intro calls them answer patterns nudging placement. | Safest basis, but literal answer, observation, signal effect, and limitation must stay distinct. |
| Alternatives | `adjacent_matches` contains ranks two and three; both can render with View this fit. `switchAdjacentView()` preserves original result; `returnToPrimaryReading()` returns. | Rank is not adjacency. Hide rank three and require an approved close rule for rank two. |
| Commander recommendations | Dossier builds candidate commanders, deck starts, precons, archetypes, starter cards, and mana notes. | Exploration starts, not proof the player should build a commander. |
| Card/deck links | EDHREC, Archidekt, MTGDecks, Scryfall, optional private deck links, and Maze use active result context. | Qualify copy without changing URLs, legality logic, or private link behavior. |
| Maze handoff | `writeArchscryDossierHandoff()` stores full result/context; `buildArchscryMazeContext()` adds reading/faction/fit/return URL. | Preserve result fields and original primary across alternative navigation. |
| Return from Maze | `restoreInitialView()` resolves profile/cache/handoff; `from=maze` opens Maze Discovery and scrolls once. | New states must round-trip; missing state must not fabricate certainty. |
| Saved reading | `vm_savePlacementResult()` writes legacy columns and complete normalized `placement_result`, then syncs session/cache. | Preserve names/shapes and columns; additive fields may not replace old ones. |
| OAuth return | `vm_saveWithGoogle()` caches pending result; `vm_checkPendingSave()` saves and dispatches `vm_placementSaved`. | State/limitations must round-trip without post-OAuth numeric fallback. |
| Legacy reading | `normalizePlacementResult()` fabricates `0.66`; `makeLegacyPlacementResult()` fabricates `0.6` from guild/scores rows. | Missing confidence becomes unknown publicly; existing historical numerics remain internal. |
| Desktop | Side rail, summary strip, Matrix, multi-column cards; existing harness has desktop captures. | State/notice should precede navigation and not create a second hierarchy. |
| Mobile | At 940px rail becomes horizontal tabs; at 700px status/context/cards reflow; harness has mobile captures. | Notices must fit 320–390px, not clip, and preserve focus order/keyboard use. |

## User-visible terminology inventory

| Term or claim | Current source/status | Gate A treatment |
|---|---|---|
| Bayesian | No literal user-visible occurrence in current Archscry runtime files; the audit rejects the description. | Public model-name contract plus regression search. Do not rename internal historical variables. |
| Probability | Internal softmax/ranking names only. | Preserve internally; prohibit probability-of-correctness claims. |
| Confidence / percentage | Signal Strength percent plus stored result/match fields. | Remove from public output; keep fields; missing legacy value is unknown. |
| Strong/moderate/emerging placement | Signal card and alternative summary bands. | Replace with bounded state. Do not alter unrelated authored Matrix trait words. |
| Adjacent / affinity / nearby | Landing, terminal, tabs, strip, hero, cards, dossier, reasons, exports. | “Close alternative” only when eligible; otherwise omit. Internal names remain. |
| Closest fit / runner-up | Numerical implementation order. | “Current best fit” states order only; no validated neighbor implication. |
| Recognizes / recognized | Decree and identity/fork narratives. | “Your answers favored…”; no true-nature/diagnosis claim. |
| Clear edge / landed cleanly / certainty | Strength meaning and decree. | State explanation plus adjacent limitation; no correctness implication. |
| Personality-like claims | Identity ownership/archetype language. | Limit to this reading and selected table situations; no enduring trait claim. |
| Deck-behavior claims | How This Plays and Commander lanes. | Possible Commander expression/exploration, not prediction. |
| Table-perception claims | “Opponents feel/read…” and caution text. | “A deck built this way may read as…”; separate from placement rationale. |
| Motivation claims | “wanted,” “trusts,” “refuses,” identity thesis. | Only when a literal answer entails it; otherwise qualify or omit. |

## Copy sources requiring containment

- `adaptive-placement.js:buildAdaptiveDecree()` / `buildAdaptiveReason()` store “recognizes,” “stronger match,” and “adjacent.” Preserve stored fields; contain the terminal reveal and any proven match-reason renderers. Do not claim or create a dossier `decreeCopy` surface that does not currently exist.
- `archscry-presentation.js:confidencePercent()`, `confidenceBand()`, `technicalSignalCopy()`, `buildReadingSignalCopy()`, and `buildHeroNarrative()` produce public strength/closeness/motivation/table claims.
- `commander-dossier.js:resolveSignalBand()`, `resolveSummaryAdjacentFit()`, `buildCommanderDossier()`, and adjacent fallbacks assign strength/adjacency from rank or fallback.
- `index.js:buildSignalStrengthCardHtml()`, `buildPlacementSnapshotHtml()`, `buildDiscoverySummaryHtml()`, `buildDossierInterpretationHtml()`, the alternative panel, and terminal reveal render those claims.
- `shared.js:normalizePlacementResult()` / `makeLegacyPlacementResult()` fabricate missing confidence.

Code and golden-path captures establish current behavior, not player prevalence, semantic accuracy, or calibration. Those remain Gate B1/pilot questions.
