# VM-551 Question/Signal and Identity Matrix Summary

Machine-reviewable authorities:

- `question-to-signal-matrix.csv`: every one of 356 answers.
- `identity-reachability-opportunity-matrix.csv`: every one of 37 identities.
- `analysis-summary.json`: exhaustive path totals and aggregate checks.

## Questionnaire findings

| Stage | Questions | Answers | Mean positive identity effects/answer | Mean negative effects/answer | Answers supporting >5 identities |
|---|---:|---:|---:|---:|---:|
| Gate | 4 | 20 | 21.30 | 12.75 | 16 |
| Hall | 58 | 234 | 2.25 | 1.58 | 10 |
| Crucible | 51 | 102 | 1.00 | 1.00 | 0 |

The Gate is not a light orientation layer. Each answer changes a majority of the 37-identity score vector on average, then suppresses roughly a third of it. Because the four Gate questions are mandatory and asked first, metaphorical early choices create the strongest correlated structural bias.

Automated dimension routing across answers (a row can carry several dimensions):

- social behavior: 212,
- psychographic motivation: 119,
- philosophical preference: 76,
- aesthetic/narrative preference: 57,
- gameplay/deck behavior: 53,
- abstract scenario preference without a stronger detected class: 48.

This routing is an audit heuristic, not a semantic approval. It shows the central conflation risk: only 53 answers directly mention gameplay/deck behavior, while public results routinely make Commander deck and table-perception claims.

All questions force a directional answer. There is no explicit neutral, mixed, none, or unsure state. The matrix records each answer's player wording, intended signal, actual positive/negative identity effects and deltas, mapping method, confidence effect, evidence classification, defect flags, and requirement implication.

Question-design conclusions:

- Gate mappings are inferred through color-load propagation, not direct identity evidence.
- Hall/Crucible mappings are direct editorial assignments, not measured likelihoods.
- All 356 answers suppress at least one identity, so a winner can be created by exclusion rather than affirmative fit.
- 336 answers have no stable ID.
- No live answer has a claim/source reference.
- Correlation groups are not modeled beyond question identity.
- Question wording often combines motivation, social response, and philosophy in one choice.
- Mandatory abstract framing can push users toward an identity family before any Commander behavior is observed.

## All-37 reachability and opportunity

All 37 identities are primary-reachable and rank-two-reachable in exhaustive valid runtime paths. Thirty-six are rank-three-reachable; Colorless is not. Reachability alone does not establish comparable representation.

| Identity | Support | Oppose | Primary paths | Share | Rank 2 | Rank 3 | Max share | Golden primary |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| ABZAN | 20 | 23 | 167 | 0.62% | 328 | 287 | 75.4% | ABZAN |
| B | 23 | 23 | 2210 | 8.22% | 1785 | 1821 | 92.7% | B |
| BANT | 34 | 21 | 390 | 1.45% | 606 | 781 | 70.9% | BANT |
| BG | 48 | 14 | 779 | 2.90% | 365 | 422 | 78.6% | BG |
| BR | 50 | 21 | 1209 | 4.50% | 639 | 535 | 77.9% | BR |
| COLORLESS | 8 | 23 | 187 | 0.70% | 21 | 0 | 100.0% | COLORLESS |
| DUNE | 20 | 18 | 541 | 2.01% | 614 | 1219 | 76.7% | DUNE |
| ESPER | 23 | 19 | 341 | 1.27% | 511 | 499 | 77.2% | ESPER |
| G | 20 | 23 | 1037 | 3.86% | 1253 | 1186 | 85.6% | G |
| GLINT | 22 | 19 | 864 | 3.21% | 2004 | 1605 | 85.9% | GLINT |
| GRIXIS | 25 | 21 | 306 | 1.14% | 397 | 465 | 69.5% | GRIXIS |
| INK | 17 | 16 | 350 | 1.30% | 614 | 1059 | 67.9% | INK |
| JESKAI | 18 | 17 | 488 | 1.81% | 1415 | 1366 | 84.1% | JESKAI |
| JUND | 26 | 20 | 344 | 1.28% | 210 | 228 | 66.3% | JUND |
| LOREHOLD | 19 | 13 | 325 | 1.21% | 645 | 917 | 56.5% | LOREHOLD |
| MARDU | 21 | 19 | 220 | 0.82% | 336 | 367 | 74.9% | MARDU |
| NAYA | 23 | 27 | 678 | 2.52% | 1289 | 876 | 84.5% | NAYA |
| PRISMARI | 22 | 16 | 387 | 1.44% | 568 | 678 | 74.1% | PRISMARI |
| QUANDRIX | 20 | 16 | 401 | 1.49% | 606 | 593 | 69.0% | QUANDRIX |
| R | 21 | 23 | 2038 | 7.58% | 1462 | 1418 | 92.0% | R |
| RG | 49 | 20 | 802 | 2.98% | 514 | 384 | 76.8% | RG |
| SILVERQUILL | 21 | 12 | 252 | 0.94% | 361 | 351 | 66.3% | SILVERQUILL |
| SULTAI | 25 | 21 | 275 | 1.02% | 428 | 524 | 79.7% | SULTAI |
| TEMUR | 25 | 21 | 213 | 0.79% | 296 | 305 | 79.9% | TEMUR |
| U | 25 | 24 | 1620 | 6.02% | 1478 | 1613 | 93.5% | U |
| UB | 43 | 18 | 1520 | 5.65% | 560 | 368 | 89.1% | UB |
| UG | 46 | 15 | 629 | 2.34% | 162 | 208 | 79.5% | UG |
| UR | 47 | 16 | 1061 | 3.95% | 286 | 384 | 84.6% | UR |
| W | 19 | 21 | 1635 | 6.08% | 1774 | 1276 | 84.9% | W |
| WB | 45 | 18 | 571 | 2.12% | 200 | 275 | 68.6% | WB |
| WG | 59 | 29 | 686 | 2.55% | 252 | 224 | 67.0% | WG |
| WITCH | 18 | 16 | 454 | 1.69% | 1081 | 1353 | 73.8% | WITCH |
| WITHERBLOOM | 24 | 11 | 439 | 1.63% | 368 | 448 | 75.1% | WITHERBLOOM |
| WR | 46 | 19 | 1008 | 3.75% | 372 | 299 | 74.0% | WR |
| WU | 54 | 36 | 1103 | 4.10% | 399 | 335 | 84.8% | WU |
| WUBRG | 8 | 21 | 778 | 2.89% | 1288 | 758 | 92.6% | WUBRG |
| YORE | 21 | 16 | 583 | 2.17% | 1404 | 1464 | 79.1% | YORE |

## Bias conclusions

- Primary share spans 13.2x from Black to Abzan.
- Supporting-answer opportunity spans 7.4x from Colorless/WUBRG (8) to Selesnya (59).
- Mono colors collectively occupy a disproportionate share of primary paths.
- Same-color guild/college distinctions are not protected by a general boundary contract; they depend on hard-coded targeted questions and sparse pairs.
- Four-color identities are reachable, but recovered missing-color/semantic guardrails are not enforced.
- WUBRG and Colorless each have only eight supporting answers yet can reach extreme share due to special Gate channels and suppressions.
- Historical metric corrected: the original counter inspected a nonexistent top-level evidence-trail field. Corrected delta-level analysis finds zero genuinely negative-only winners and 2,901 primary paths below the generated minimum-hit metadata under the strong authored-hit proxy.
- Golden-path coverage proves targeted reachability but does not prove unbiased or trustworthy placement.

The per-identity CSV also records canonical definition, boundary/tension, supporting/opposing question IDs, metadata minimum hits, false-positive guardrail, actual primary/adjacent coverage, confidence range, copy/recommendation completeness, sources, and semantic risk.
