# Public Confidence Replacement

## Decision contract

Gate A removes numeric confidence from public interpretation, not from the result. `confidence`, match softmax share, `confidence_gap`, scores, and serialized shapes remain available for ranking, stopping, replay, reading IDs, cache/profile/OAuth compatibility, and regression.

Public model name: **Adaptive weighted reading**.
Technical description when needed: **adaptive, additive/weighted, hand-authored, suppression-aware, lateral-inhibition-aware, and softmax-ranked; not demonstrated Bayesian and not empirically calibrated**.

## Current public numeric renderers

| Source | Current output | Gate A change |
|---|---|---|
| `index.js:buildSignalStrengthCardHtml()` | Signal Strength, percentage, meter, Emerging/Moderate/Strong scale. | Replace whole card with result-state card; no CSS-only concealment. |
| `archscry-presentation.js:technicalSignalCopy()` | `Signal strength: n%`. | Remove from public placement output; retain only if an internal diagnostic consumer is proven. |
| `archscry-presentation.js:buildReadingSignalCopy()` | Strong/moderate/emerging from share. | Use public state and recorded observations. |
| `commander-dossier.js:resolveSignalBand()` / summary strip | Strong/moderate/emerging adjacent signal. | Stop using numeric band for placement/alternative meaning; do not affect unrelated candidate-source enums. |
| `index.js:revealDecree()` | Rank-two “affinity.” | Show only an eligible Close alternative. |
| Dossier text/audit structures | Adjacent/strength labels. | Update public/exported placement labels; keep internal diagnostics explicit. |

No current public Archscry runtime string literally says “Bayesian.” Add a regression assertion that it remains absent without renaming internal historical/model variables.

## Fabricated defaults

- `shared.js:normalizePlacementResult()` sets absent confidence to `0.66`.
- `shared.js:makeLegacyPlacementResult()` sets legacy confidence to `0.6`.
- `normalizeMatch()` can turn missing match score/confidence into `0`.

Gate A later implementation must:

1. Preserve supplied numeric values exactly through normalization/storage.
2. Represent absent result confidence as `null`/absent internally per the owner-approved compatibility shape and additive `unknown`/legacy publicly.
3. Never synthesize a public top-match strength from a missing value.
4. Prove that `0`, `0.6`, `0.66`, or another fallback never reaches public copy for missing legacy data.
5. Not rewrite historical stored records.

## Replacement state card

| State | Label | Supporting line |
|---|---|---|
| `primary` | Current best fit | “This is the identity your recorded answers favored most in the current adaptive weighted reading.” |
| `tied` | Tied result | “The current scoring did not separate the two leading identities.” |
| `close` | Close result | “A second identity remained close under a bounded comparison rule; this is not calibrated confidence.” |
| `mixed` | Mixed reading | “More than one direction is present, and this reading cannot responsibly collapse them into one claim.” |
| `contradictory` | Conflicting signals | “Some recorded observations pull in different directions.” |
| `insufficient` | Not enough evidence to distinguish | “This reading does not have enough usable detail for a named placement.” |
| `unknown` | Evidence detail unavailable | “This saved result does not contain enough information to describe its strength.” |
| `invalid` | Reading unavailable | “The result could not be normalized safely.” |
| `incomplete` | Reading incomplete | “Continue the remaining question or restart.” |

“Clearer current fit” may compare two views only under an approved close rule. Default primary wording is “Current best fit,” which states order without certainty.

## Numeric consumers preserved

- `adaptive-placement.js`: ranking, gap checks, Crucible, finish decision, `buildManaScores()`, match serialization.
- `archscry-presentation.js:readingIdForResult()`: current Maze reading ID includes a confidence-derived token; do not change without separately reviewed handoff compatibility.
- `shared.js`: legacy profile confidence column and complete placement JSON.
- session cache, pending OAuth result, profile/saved/legacy normalization.
- dossier match ordering and deterministic numeric tests.
- placement `mana_scores` and the separate authored Matrix profile.

## Public rules and proof

- Never render a percentage from confidence/share/score/gap or translate it to accuracy, correctness, strength, certainty, scientific meaning, or calibration.
- Never use authored Matrix 0–100 axes as replacement confidence.
- A result state describes safe interpretation of available fields, not how correct an identity is.
- Put limitation beside the state heading.
- DOM/text tests cover reveal, summary, dossier, alternative, saved, OAuth-restored, and legacy surfaces for percentage and prohibited-term absence.
- Numeric snapshots and field shapes for identical answer paths remain byte/structure equivalent where the existing contract requires it.
- Missing legacy confidence yields unknown/no numeric fallback; supplied historical confidence remains internal and hidden.
