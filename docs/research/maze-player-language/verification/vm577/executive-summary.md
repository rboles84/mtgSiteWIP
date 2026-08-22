# VM-577 Scryfall Maze Master Verification Summary

- Source workbook: `C:\dev\voxmana.io\docs\research\maze-player-language\source\Scryfall_Maze_Master.xlsx`
- Workbook SHA-256: `C4B45E146AD3D9022DD18EDD6BC09C2509B4A13D2781945F43CDA2E4AF4BFAA8`
- Verification timestamp: `2026-08-22T03:33:06Z`
- Source immutable check: `PASS`
- Sheets inventoried: `14`
- Workbook records extracted: `2782`
- Collision records: `83`
- Owner review queue rows: `920`

## Counts By Workbook Status

- `(blank)`: 1420
- `correct`: 8
- `normalize`: 3
- `production-ready`: 822
- `remove`: 2
- `review`: 314
- `semantic`: 211
- `tag-dependent`: 2

## Counts By Verification Disposition

- `AMBIGUOUS`: 355
- `INVALID`: 1
- `SEMANTIC_REVIEW`: 259
- `SOURCE_ARTIFACT`: 2
- `STALE`: 37
- `UNVERIFIED`: 266
- `VERIFIED_INTERNAL`: 588
- `VERIFIED_NATIVE`: 1192
- `VERIFIED_QUERY`: 30
- `VERIFIED_TAG`: 52

## Operator Verification Summary

- `INVALID`: 1
- `UNVERIFIED`: 6
- `VERIFIED_QUERY`: 26

## Tagger Verification Summary

- `STALE`: 4
- `VERIFIED_TAG`: 18

## Plain Reading QA Baseline

- Cases found: `59`
- Clean exact-query passes: `2`
- Semantic/questionable or unscored cases: `1`
- Compiler errors: `0`

## Major Findings

- The workbook should be treated as safe only by verified subset, not as a fully authoritative baseline.
- Native Scryfall facts, query/operator behavior, Tagger tags, internal governance rows, and player-language semantics require distinct dispositions.
- `AMBIGUOUS`, `SEMANTIC_REVIEW`, and `UNVERIFIED` rows are evidence outcomes, not failures, unless a Production-ready claim depends on them.
- Review `owner-review-queue.json` first for invalid, stale, source-artifact, ambiguous, semantic-review, and unverified rows.

## Known Limitations

- Live Scryfall and Tagger checks are bounded probes, not exhaustive card-result equivalence tests.
- If network was disabled or unavailable, native catalog evidence falls back to the checked-in grounding artifact and must not be called current live Scryfall truth.
- Tagger exact existence is inferred through bounded Scryfall search behavior because no separate committed Tagger tag catalog is available in this repository.

## Source Artifacts

- `workbook-inventory.json`
- `row-verification.jsonl` and `row-verification.csv`
- `native-catalog-results.json`
- `operator-and-tagger-probes.json`
- `collisions.json`
- `owner-review-queue.json`
- `plain-reading-qa-cases.json`
- `plain-reading-qa-baseline.json`
