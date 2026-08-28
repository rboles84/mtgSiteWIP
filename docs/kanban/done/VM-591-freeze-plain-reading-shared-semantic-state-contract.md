# VM-591 - Freeze Plain Reading Shared Semantic-State Contract

ID: VM-591
Title: Freeze Plain Reading Shared Semantic-State Contract
Status: Done
Type: Architecture / Product Contract
Area: Implicit Maze / Plain Reading / Operator's Hand / Loom compatibility
Priority: High
Created: 2026-08-28
Completed: 2026-08-28

## Summary

Define and validate one versioned semantic-state contract for future Plain Reading, Operator's Hand, Loom, Maze execution, and Archscry-compatible recommendation handoff work without migrating production runtime behavior.

## Source

- Owner-provided VM-591 contract-first implementation brief.
- Accepted Calibration V3.2 workbook authority, SHA-256 `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`.
- `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md`.
- Accepted VM-590 Loom v0 investigation.
- Current Maze query, compiler, mode, and builder contracts.

## Locked Decisions

- One semantic state is the future meaning authority across Plain Reading, Operator's Hand, and Loom.
- `MazeQueryResult.query` remains the sole executable-query contract.
- User input, normalized display language, generated Operator syntax, and executable query projection remain distinct.
- Printed color and color identity remain separate domains; exact, subset/inclusive, superset/contains, colorless, and exclusions remain explicit relations.
- Context existence does not imply query application.
- Preferences, assumptions, conflicts, unresolved terms, lenses, and recommendation signals do not silently become hard query truth.
- Loom's future default color rule is not decided by VM-591.

## Acceptance Criteria

1. A documented and machine-checkable versioned schema covers identity/provenance, Boolean hard constraints, preferences, context, assumptions, conflicts, unresolved terms, lenses, query variants, diagnostics, execution mode, and recommendation signals.
2. Deterministic mappings cover Plain Reading, Operator's Hand, current Loom builder filters, display rendering, Maze execution projection, and Archscry-compatible signals.
3. Eighteen focused fixtures cover the owner-specified Calibration V3.2 and Loom compatibility failure classes, including semantic round trips and invalid no-query states.
4. No production runtime, UI, parser migration, ranking, placement, graph, Reading Finds, or accepted-workbook behavior changes.
5. RobQA produces a bounded Owner Review packet and stops before VM-592 or runtime migration.

## Files Likely Impacted

- `docs/contracts/maze-semantic-state-contract.md`
- `data/maze/maze-semantic-state-v1.schema.json`
- `tests/fixtures/maze-semantic-state-contract-fixtures.js`
- `tests/maze/maze-semantic-state-contract-tests.js`
- `package.json`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/kanban/board.md`
- this card
- `docs/handoffs/HANDOFF_INDEX.md`
- one VM-591 handoff under `docs/handoffs/`

## Risks

- Duplicating or bypassing the existing grounded compiler `queryModel` instead of defining an adapter boundary.
- Letting reverse-translated display text become semantic authority.
- Creating a second executable-query owner beside `MazeQueryResult.query`.
- Inferring Loom color meaning from selected colors without an explicit relation.
- Flattening grouped Boolean expressions or Multi-Lens bundles.
- Treating context, preferences, assumptions, or recommendation signals as applied filters.
- Touching the accepted workbook, production runtime, or unrelated untracked corpus.

## Implementation Prompt

Apply RobDev and RobQA. Reuse the current `queryModel`, `builderFilters`, source context, and Maze query-result boundaries as adapters. Add the smallest dormant contract package: one specification, one JSON Schema, focused fixtures/tests, architecture updates, Kanban state, and a governed handoff. Do not wire the contract into production runtime. Stop at Owner Review.

## Notes

- Pre-flight confirmed the repository is on `main` with one registered worktree and no related VM-591 branch/worktree.
- Existing untracked `docs/research/maze-player-language/corpus/` content is unrelated owner work and is protected from this card.
- Accepted workbook hash was independently rechecked before implementation and matched exactly.
- Owner Review returned `NEEDS REVISION` for targeted accepted-authority reconciliation only; the architecture, runtime boundary, and VM-592 stop remained accepted/frozen.
- Revision reconciles all 18 fixtures to explicit CAL/EV/Master authority classes, evidence levels, provenance, and selected-execution legality.
- Required Parser Schema fields `confidence`, `query_explanation`, and `evidence_level` now have explicit governed owners; result/capture metadata remains at downstream execution/validation boundaries.
- Owner Re-Review accepted the revised contract, schema, all 18 governed fixtures, Parser Schema ownership map, semantic provenance model, real cross-mode round-trip proof, and dormant integration boundaries on 2026-08-28.
- Closeout remains contract-only: no Maze runtime migration, Loom default-color decision, Archscry ranking/placement work, generated-data change, workbook change, corpus change, or VM-592 work is included.

## Owner Review Candidate

- [x] Versioned documented contract.
- [x] Machine-checkable JSON Schema.
- [x] Plain, Operator, Loom, Maze, display, and Archscry mapping matrix.
- [x] Eighteen focused fixture classes.
- [x] Round-trip semantic equality and invalid/conflict no-query invariants.
- [x] Existing Maze query, builder, and mode compatibility checks.
- [x] Runtime non-wiring and accepted-workbook hash checks.
- [x] RobDev and RobQA handoff packet.
- [x] Owner-requested V3.2 fixture authority reconciliation.
- [x] Complete 18-fixture deterministic authority audit.
- [x] Complete accepted Parser Schema ownership/disposition map.
- [x] Material provenance for preferences, conflicts, unresolved terms, and query variants.
- [x] Constructed semantic round-trip proof including explicit color relation.
- [x] Owner acceptance.

Closed by explicit Owner Re-Review acceptance. VM-592 is ready to be created as a separate future task, but no VM-592 work is included here.
