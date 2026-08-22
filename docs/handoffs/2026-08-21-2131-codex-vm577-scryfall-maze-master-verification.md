# VM-577 Scryfall Maze Master Verification V1 Handoff

## Agent Name

Codex

## Task Requested

Perform a controlled, evidence-backed verification of `Scryfall_Maze_Master.xlsx` before any workbook contents are promoted into Implicit Maze production semantics. Produce repeatable verification tooling, machine-readable evidence, a Plain Reading QA baseline, and stop for owner review without changing product/runtime behavior.

## Related Kanban Card

`docs/kanban/done/VM-577-scryfall-maze-master-verification-v1.md`

## Branch / Commit

- Branch: `vm577-scryfall-maze-master-verification`
- Implementation commit: `cbe5a2c165a3189e528c3edd219d739978bb3740`
- Worktree: `C:\dev\voxmana.io`
- Local/remote divergence at pre-flight: `0/0` for `main...origin/main`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-471, VM-472, VM-490, VM-575, and VM-576 handoffs
- `docs/kanban/board.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- Current Plain Reading compiler/query/test files under `assets/js/maze/` and `tests/maze/`
- Source workbook at `docs/research/maze-player-language/source/Scryfall_Maze_Master.xlsx`

## Files Changed

- `docs/research/maze-player-language/source/Scryfall_Maze_Master.xlsx`
- `docs/research/maze-player-language/verification/vm577/metadata.json`
- `docs/research/maze-player-language/verification/vm577/workbook-inventory.json`
- `docs/research/maze-player-language/verification/vm577/row-verification.jsonl`
- `docs/research/maze-player-language/verification/vm577/row-verification.csv`
- `docs/research/maze-player-language/verification/vm577/native-catalog-results.json`
- `docs/research/maze-player-language/verification/vm577/operator-and-tagger-probes.json`
- `docs/research/maze-player-language/verification/vm577/cache/scryfall-catalog-snapshot.json`
- `docs/research/maze-player-language/verification/vm577/cache/scryfall-probes.json`
- `docs/research/maze-player-language/verification/vm577/collisions.json`
- `docs/research/maze-player-language/verification/vm577/owner-review-queue.json`
- `docs/research/maze-player-language/verification/vm577/plain-reading-qa-cases.json`
- `docs/research/maze-player-language/verification/vm577/plain-reading-qa-baseline.json`
- `docs/research/maze-player-language/verification/vm577/executive-summary.md`
- `scripts/verify-maze-knowledge.py`
- `scripts/baseline-maze-plain-reading-qa.mjs`
- `tests/verification/maze-knowledge-verifier-tests.py`
- `package.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-577-scryfall-maze-master-verification-v1.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What Changed

- Added a dependency-light workbook verifier that parses the workbook as immutable XLSX source evidence, inventories sheet structure, detects statuses/formula errors/duplicates/collisions/source artifacts, classifies row-level verification dispositions, writes stable JSON/CSV/JSONL evidence, and preserves exact source hash checks.
- Added bounded live Scryfall catalog and search probes with cache snapshots, explicit network/rate-limit distinction, and current source provenance.
- Added Tagger allowlist probing through exact `otag:`/`function:` Scryfall searches where possible.
- Added a Plain Reading QA baseline runner that imports the current Maze query core and compiler artifacts instead of inventing a parser.
- Added package scripts `verify:maze-knowledge` and `test:maze-knowledge-verifier`.
- Moved VM-577 through Kanban governance and produced the evidence package under `docs/research/maze-player-language/verification/vm577/`.

## Why It Changed

The workbook is promising but mixes native Scryfall facts, Scryfall operators, Tagger tags, recipes, regex patterns, player semantics, ambiguity, and governance rows. VM-577 creates the evidence gate needed before any of those rows become production Plain Reading semantics.

## Decisions Made

- The source workbook remains unchanged and is identified by SHA-256 `C4B45E146AD3D9022DD18EDD6BC09C2509B4A13D2781945F43CDA2E4AF4BFAA8`.
- Native catalog facts, operator probes, Tagger probes, semantic rows, ambiguity, stale facts, and internal governance rows use separate dispositions.
- `429` rate-limit responses are `UNVERIFIED`, not stale or invalid.
- Bare Tagger allowlist rows are probed as exact `otag:<tag>` candidates unless the row indicates art tags.
- Existing Plain Reading QA expectations are baselined, not fixed; query mismatches are evidence for later owner/compiler work.
- No runtime source, compiler behavior, telemetry, UI, placement, generated grounding, or identity data was changed.

## Final Evidence Summary

- Sheets inventoried: 14
- Workbook records extracted: 2,782
- Workbook status counts: 822 Production-ready, 314 Review, 211 Semantic, 2 Tag-dependent, 8 Correct, 3 Normalize, 2 Remove, 1,420 blank/internal-status rows.
- Verification dispositions: 1,192 `VERIFIED_NATIVE`, 52 `VERIFIED_TAG`, 30 `VERIFIED_QUERY`, 588 `VERIFIED_INTERNAL`, 355 `AMBIGUOUS`, 259 `SEMANTIC_REVIEW`, 266 `UNVERIFIED`, 37 `STALE`, 2 `SOURCE_ARTIFACT`, 1 `INVALID`.
- Operator probes: 26 verified, 6 unverified/rate-limited, 1 invalid.
- Tagger probes: 18 verified, 4 stale.
- Collision groups: 83.
- Owner-review queue rows: 920.
- Plain Reading QA baseline: 59 cases, 2 exact-query matches, 56 query mismatches, 1 semantic/unscored expectation, 0 compiler errors.

## Risks / Uncertainties

- Tagger verification is based on exact Scryfall search behavior, not a full Tagger catalog export.
- Six operator/regex probes remain unverified after rate limiting; they should be reviewed later rather than treated as failures.
- Many `SEMANTIC_REVIEW` and `AMBIGUOUS` rows may be legitimate player language but need sentence context or owner/domain judgment before executable mappings.
- Existing workbook QA expectations are often stricter/different from the current compiler; VM-577 intentionally did not repair compiler behavior.

## Tests Run

- `npm run verify:maze-knowledge` - PASS
- `npm run test:maze-knowledge-verifier` - PASS
- `npm run test:parser` - PASS, 226 parser cases
- `npm run test:scryfall-grounding` - PASS
- `npm run test:plain-reading-semantics` - PASS
- `git diff --check` - PASS with existing line-ending warnings only

## Not Touched

- Plain Reading compiler behavior
- Maze UI, Query Inspector, alternatives, relaxations, confidence, raw Scryfall mode, Reading Finds, and result rendering
- Telemetry/analytics files
- Placement, identity, dossier, generated faction, and generated Scryfall grounding data
- CECOS, Reddit, YouTube, new 100-case corpus, runtime LLM, similarity search, or semantic promotion work

## RobDevPass Packet

- Changed behavior: repository research/tooling can now verify the workbook and regenerate the VM-577 evidence package.
- Owning layer: isolated research/tooling and governance docs; runtime Maze code remains authoritative and unchanged.
- Existing machinery reused: current Scryfall grounding/semantic registry, current Maze query core, current parser tests and validation scripts.
- Protected behavior: compiler output, runtime search, telemetry, placement, UI, generated data, and identity semantics remained untouched.
- Smallest complete implementation: one workbook verifier, one compiler baseline runner, focused tests, evidence artifacts, and governance closeout.
- Stop condition: owner review of the evidence package before any semantic promotion or compiler repair.

## RobQAPass Readiness

- QA tier: QA-0 / verification-tooling with protected runtime contracts.
- Tests selected: focused verifier unit tests, repeatable verifier command, current parser, Scryfall grounding validator, semantic registry validator, and diff hygiene.
- CPU-heavy validation: NOT REQUIRED; no placement/scoring/runtime behavior changed.
- Owner judgment remaining: inspect `owner-review-queue.json`, `collisions.json`, and `plain-reading-qa-baseline.json` before deciding which verified subset can feed the 100-case corpus or future compiler work.

## Follow-Up Recommendations

1. Owner reviews `owner-review-queue.json` first, especially `INVALID`, `SOURCE_ARTIFACT`, `STALE`, `AMBIGUOUS`, and `SEMANTIC_REVIEW` rows.
2. Treat the workbook as safe only by verified subset.
3. Create a separate card for any compiler fixes exposed by the 59-case QA baseline.
4. Create a separate card for the 100-case Plain Reading player-language corpus after owner review.

## Next Suggested Agent

Owner/domain reviewer, then Planning Architect for the follow-up corpus or compiler-remediation card.
