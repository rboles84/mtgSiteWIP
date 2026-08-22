# VM-577 - Scryfall Maze Master Verification V1

ID: VM-577
Title: Scryfall Maze Master Verification V1
Status: done
Type: verification/tooling
Area: Maze, Plain Reading, Scryfall, workbook evidence
Priority: high
Created: 2026-08-21
Completed: 2026-08-21

## Summary

Performed a controlled, evidence-backed verification of `Scryfall_Maze_Master.xlsx` before any workbook contents are promoted into Implicit Maze production semantics.

## Scope Completed

- Immutable workbook intake and SHA-256 source identification.
- Workbook structure inventory, row counts, statuses, formulas, duplicate IDs/keys, malformed values, source artifacts, and suspicious records.
- Scryfall-native catalog verification against live Scryfall catalog endpoints where available.
- Bounded Scryfall operator/query syntax probes with cached evidence.
- Exact Tagger tag probes where practical.
- Query recipe and regex/search-expression audit through bounded probes and disposition reporting.
- Normalized player-language collision report.
- Production-ready claim challenge and owner-review queue.
- Existing workbook Plain Reading QA baseline against the current repository compiler.
- Repeatable verification tooling and focused verifier tests.
- Human-readable and machine-readable evidence artifacts.

## Explicit Non-Scope Preserved

- Plain Reading behavior changes.
- Maze UI changes.
- Telemetry or analytics changes.
- Player-language corpus generation.
- CECOS, Reddit, or YouTube ingestion.
- Production semantic promotion.
- Compiler fixes.
- Generated identity, placement, or Scryfall grounding data changes.
- Runtime LLM use or similarity search.
- Source workbook edits, cleanup, renaming, or normalization.

## Final Evidence

- Source workbook: `docs/research/maze-player-language/source/Scryfall_Maze_Master.xlsx`
- Workbook SHA-256: `C4B45E146AD3D9022DD18EDD6BC09C2509B4A13D2781945F43CDA2E4AF4BFAA8`
- Evidence directory: `docs/research/maze-player-language/verification/vm577/`
- Sheets inventoried: 14
- Records extracted: 2,782
- Workbook status counts: 822 Production-ready, 314 Review, 211 Semantic, 2 Tag-dependent, 8 Correct, 3 Normalize, 2 Remove, 1,420 blank/internal-status rows.
- Verification dispositions: 1,192 `VERIFIED_NATIVE`, 52 `VERIFIED_TAG`, 30 `VERIFIED_QUERY`, 588 `VERIFIED_INTERNAL`, 355 `AMBIGUOUS`, 259 `SEMANTIC_REVIEW`, 266 `UNVERIFIED`, 37 `STALE`, 2 `SOURCE_ARTIFACT`, 1 `INVALID`.
- Collision groups: 83.
- Owner-review queue rows: 920.
- Plain Reading QA baseline: 59 cases, 2 exact-query matches, 56 query mismatches, 1 semantic/unscored expectation, 0 compiler errors.

## Recommendation

The workbook is safe only as a verified subset. It should not be promoted wholesale into production Plain Reading semantics until the owner reviews `owner-review-queue.json`, especially the invalid/source-artifact rows, stale Tagger/native claims, ambiguous normalized terms, and Production-ready rows that depend on semantic interpretation rather than native Scryfall facts.

## Validation

- `npm run verify:maze-knowledge`
- `npm run test:maze-knowledge-verifier`
- `npm run test:parser`
- `npm run test:scryfall-grounding`
- `npm run test:plain-reading-semantics`
- `git diff --check`

## Notes

- Live Scryfall catalog retrieval succeeded and was cached under the VM-577 evidence directory.
- Tagger checks are bounded Scryfall search probes, not a full external Tagger catalog dump.
- Four Tagger claims remain stale by exact probe: `otag:goodstuff`, `otag:stax`, `otag:sweeper-creature`, and `otag:token-generator`.
- One operator claim is invalid by bounded Scryfall probe: `field:/.../`.
- Several regex/operator probes remained `UNVERIFIED` after rate limiting and should not be treated as failures or accepted truth.
