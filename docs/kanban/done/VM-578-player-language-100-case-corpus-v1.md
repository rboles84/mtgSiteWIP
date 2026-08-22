# VM-578 - Player-Language 100-Case Corpus V1

ID: VM-578
Title: Player-Language 100-Case Corpus V1
Status: done
Type: evidence/corpus/tooling
Area: Maze, Plain Reading, player language, Scryfall grounding
Priority: high
Created: 2026-08-21
Completed: 2026-08-21

## Summary

Built the first governed 100-case player-language evaluation corpus for Implicit Maze Plain Reading, grounded in existing repository evidence and VM-577's verified subset, then baselined the current production compiler without changing runtime behavior.

## Scope Completed

- Repository pre-flight and overlap check.
- VM-577 evidence consistency check before use.
- Source discovery across available CECOS/player-language, YouTube, Reddit-derived, owner/example, product-failure, and current Plain Reading evidence in the repository.
- Canonical source ledger with provenance limitations and derivation notes.
- Canonical `player-language-100.jsonl` with exactly 100 governed player-language cases, expected intent annotations, and rationales.
- Current compiler baseline for all 100 cases.
- Machine-readable comparison results, failure taxonomy, baseline metrics, and owner-review table.
- Ten recommended later live acceptance searches.
- Small non-canonical breaker set.
- Focused corpus/baseline validation tooling with `--check` drift detection.
- Handoff and owner-review packet.

## Explicit Non-Scope Preserved

- Plain Reading compiler fixes.
- Production semantic additions.
- Query Inspector changes.
- Confidence, optionality, OR, exclusion, similarity, or zero-result behavior changes.
- Scryfall runtime/API behavior changes.
- Analytics or telemetry.
- Reading Finds or placement changes.
- Identity, dossier, generated Scryfall grounding, or generated faction data changes.
- VM-577 workbook or evidence corrections.
- Live Scryfall result acceptance for all 100 cases.

## Evidence Package

- Canonical corpus: `docs/research/maze-player-language/corpus/vm578/player-language-100.jsonl`.
- Canonical source ledger: `docs/research/maze-player-language/corpus/vm578/source-ledger.json`.
- Canonical breaker set: `docs/research/maze-player-language/corpus/vm578/breaker-cases.json`.
- Canonical live-acceptance selection: `docs/research/maze-player-language/corpus/vm578/live-acceptance-10.json`.
- Derived reports and projections: `baseline-results.*`, `player-language-100.csv`, `source-ledger.csv`, `failure-classes.json`, `baseline-summary.md`, `live-acceptance-10.md`, and `owner-review-table.md`.

## Final Evidence

- Canonical cases: 100.
- Existing VM-577 QA suite remains separate: 59.
- Combined deterministic evaluation inputs after VM-578: 159.
- Source origin counts: 2 known product failures, 66 source-derived, 21 constructed coverage, 11 adversarial/negative.
- VM-577 artifact reconciliation: 2,782 row records, 920 owner-review rows, 83 collision groups.
- Baseline results: 14 `PASS`, 62 `PARTIAL`, 24 `FAIL`, 0 compiler errors.
- Dominant measured issues: vocabulary/unresolved quality, missing required components, color-vs-identity interpretation, optionality, scope/exclusion, functional-language limits, and high-confidence partial interpretations.

## Validation

- `npm run baseline:maze-player-language`
- `npm run test:maze-player-language-corpus`
- `npm run test:parser`
- `git diff --check` (passed with existing LF/CRLF warnings only)

## Notes

- The canonical corpus and source ledger are data fixtures, not hard-coded executable JS.
- The runner loads canonical fixtures, validates VM-577 generated-artifact consistency, invokes the current production Plain Reading compiler, and regenerates derived reports.
- `--check` verifies derived artifacts match the canonical corpus and current compiler baseline.
- No runtime, compiler, UI, telemetry, generated grounding, placement, identity, workbook, or VM-577 evidence behavior changed.
