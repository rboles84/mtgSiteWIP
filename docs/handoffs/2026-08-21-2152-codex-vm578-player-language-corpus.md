# VM-578 Player-Language 100-Case Corpus V1 Handoff

## Agent Name

Codex

## Task Requested

Build the first governed 100-case player-language evaluation corpus for Implicit Maze Plain Reading, grounded in VM-577's verified subset and existing local player-language evidence, baseline the current production compiler, and stop for owner review without runtime behavior changes.

## Related Kanban Card

`docs/kanban/done/VM-578-player-language-100-case-corpus-v1.md`

## Branch / Base

- Branch: `vm578-player-language-corpus-v1`
- Base SHA: `b79a366168c057aa6e62c6daa161b202233c806a`
- Worktree: `C:\dev\voxmana.io`
- Pre-flight: `main` and `origin/main` matched `b79a366`; one registered worktree; no current in-progress Kanban card.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-21-2131-codex-vm577-scryfall-maze-master-verification.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-577-scryfall-maze-master-verification-v1.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/research/maze-player-language/verification/vm577/*`
- `docs/research/placementResearch/YT-has-commander-youtube-improved-your-decks-refined-player-evidence.md`
- `docs/research/cleaned_EDH_commander_discussion.md`
- `docs/audits/vm551-placement-system/evidence-integration-and-cecos-readjudication.md`
- `docs/audits/vm551-placement-system/cecos-conclusion-adjudication.csv`
- Current Plain Reading compiler and test surfaces under `assets/js/maze/`, `data/scryfall/grounding/`, and `tests/maze/`

## Files Changed

- `docs/research/maze-player-language/corpus/vm578/player-language-100.jsonl`
- `docs/research/maze-player-language/corpus/vm578/player-language-100.csv`
- `docs/research/maze-player-language/corpus/vm578/source-ledger.json`
- `docs/research/maze-player-language/corpus/vm578/source-ledger.csv`
- `docs/research/maze-player-language/corpus/vm578/baseline-results.jsonl`
- `docs/research/maze-player-language/corpus/vm578/baseline-results.csv`
- `docs/research/maze-player-language/corpus/vm578/failure-classes.json`
- `docs/research/maze-player-language/corpus/vm578/baseline-summary.md`
- `docs/research/maze-player-language/corpus/vm578/live-acceptance-10.json`
- `docs/research/maze-player-language/corpus/vm578/live-acceptance-10.md`
- `docs/research/maze-player-language/corpus/vm578/breaker-cases.json`
- `docs/research/maze-player-language/corpus/vm578/owner-review-table.md`
- `scripts/baseline-maze-player-language-corpus.mjs`
- `package.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-578-player-language-100-case-corpus-v1.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What Changed

- Added the canonical VM-578 corpus package under `docs/research/maze-player-language/corpus/vm578/`.
- Made `player-language-100.jsonl` and `source-ledger.json` the canonical source-of-truth fixtures.
- Added canonical non-counted breaker and live-acceptance selection data files.
- Added a repeatable runner that loads canonical data, reconciles VM-577 generated artifact counts, invokes the current production Plain Reading compiler, writes derived CSV/JSONL/Markdown reports, and supports `--check` drift detection.
- Added package scripts `baseline:maze-player-language` and `test:maze-player-language-corpus`.
- Closed VM-578 in Kanban governance.

## Why It Changed

VM-578 establishes an evidence-grounded baseline for how current deterministic Plain Reading handles realistic Commander/player search language. It is designed to expose where the compiler succeeds, fails conservatively, or confidently misunderstands intent before any implementation VM changes compiler behavior.

## Decisions Made

- The executable runner is not the canonical owner of corpus annotations; it consumes canonical data fixtures.
- VM-577 remains the knowledge-verification authority; generated artifacts reconcile to 2,782 row records, 920 owner-review rows, and 83 collision groups before the VM-578 baseline runs.
- The existing VM-577 59-case QA suite remains separate; the combined deterministic evaluation input count is 159.
- Constructed coverage and adversarial cases are explicitly marked rather than presented as observed player prevalence.
- Similarity, optionality, functional ETB support, social fit, and archetype terms are expected to remain unresolved or reviewable when not safely grounded.

## Final Evidence Summary

- Canonical cases: 100.
- Source origin counts: 2 known product failures, 66 source-derived, 21 constructed coverage, 11 adversarial/negative.
- VM-577 disposition usage in corpus annotations: 49 `VERIFIED_QUERY`, 33 `VERIFIED_NATIVE`, 9 `SEMANTIC_REVIEW`, 4 `AMBIGUOUS`.
- Baseline result counts: 14 `PASS`, 62 `PARTIAL`, 24 `FAIL`, 0 compiler errors.
- Vocabulary recognition issues: 69.
- Required-component/grounding misses: 37.
- Optionality reviews/failures: 13.
- OR/exclusion/scope failures: 11.
- Color/identity failures: 26.
- Functional-language reviews/failures: 18.
- High-confidence bad or incomplete interpretations: 7.
- Similarity-related reviews/failures: 2.

## Risks / Uncertainties

- The available local Reddit/YouTube evidence is narrower than the prompt's ideal source universe; the ledger records those limitations.
- Metrics are deterministic corpus-baseline metrics, not population prevalence or product success targets.
- Some expected annotations intentionally require owner review because exact Scryfall representation would manufacture false precision.
- The baseline classification is component- and diagnostic-based; owner review should focus on whether the expected annotations themselves feel right.

## Tests Run

- `npm.cmd run baseline:maze-player-language` - PASS, generated 100 baseline results, 0 compiler errors.
- `npm.cmd run test:maze-player-language-corpus` - PASS, checked canonical fixtures, VM-577 reconciliation, and derived artifacts.
- `npm.cmd run test:parser` - PASS, 226 parser cases.
- `git diff --check` - PASS with existing LF/CRLF warnings only for `docs/kanban/board.md` and `package.json`.

## Not Touched

- Plain Reading compiler/runtime behavior.
- Maze UI, Query Inspector, alternatives, relaxations, confidence, raw Scryfall mode, Reading Finds, and result rendering.
- Telemetry/analytics.
- Placement, identity, dossier, generated faction data, and generated Scryfall grounding data.
- VM-577 workbook, verifier logic, or generated evidence results.
- Live Scryfall result acceptance for all 100 cases.

## RobDevPass Packet

- Changed behavior: repository research/tooling can now validate and baseline a governed 100-case player-language corpus.
- Owning layer: isolated research/corpus data, evidence reports, and validation tooling; runtime Maze code remains authoritative and unchanged.
- Existing machinery reused: `resolveMazeQueryRequest`, current grounded compiler artifact, current semantic registry, VM-577 verification artifacts, and project package-script conventions.
- Protected behavior: compiler output, runtime search, UI, telemetry, placement, generated grounding, and identity semantics remained untouched.
- Smallest complete implementation: canonical corpus/ledger fixtures, one loader/baseline runner, generated projections/reports, focused tests, card/handoff closeout.
- Stop condition: owner review of the corpus, baseline, live-acceptance 10, and failure classes before implementation remediation.

## RobQAPass Readiness

- QA tier: QA-0 / evidence and tooling with read-only compiler invocation.
- Tests selected: corpus/baseline check, parser regression suite, and diff hygiene.
- CPU-heavy validation: NOT REQUIRED; no runtime, UI, placement, generated grounding, or compiler behavior changed.
- Owner judgment remaining: review the 100 canonical cases, source ledger limitations, expected annotations, and whether the 10 live acceptance searches represent the next review well.

## Follow-Up Recommendations

1. Owner review `owner-review-table.md`, `baseline-summary.md`, and the 10 live acceptance cases.
2. Create the smallest compiler-remediation VM around preference/scope diagnostics and functional-language honesty.
3. Only after owner review, promote narrow verified functional concepts into `plain-reading-semantics.json` in a separate implementation VM.

## Next Suggested Agent

Owner/domain reviewer, then Planning Architect for the next compiler-remediation card.
