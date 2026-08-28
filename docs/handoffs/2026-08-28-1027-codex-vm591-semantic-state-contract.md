# 2026-08-28 10:27 - Codex - VM-591 Shared Semantic-State Contract

## Owner Re-Review Accepted - Durable Closeout

- Owner disposition: **ACCEPTED** on 2026-08-28.
- Final lifecycle state: VM-591 Done; contract/schema version `1.0.0` accepted.
- Accepted scope: shared semantic-state contract, machine schema, 18 governed fixtures, complete Parser Schema ownership mapping, semantic provenance, constructed Plain/Operator and Loom/Operator round-trip proof, and dormant integration boundaries.
- RobQA closeout: QA-0 lifecycle/contract validation; focused semantic-state, Maze query contract, builder, mode/display, hash, scoped-diff, and diff-hygiene checks required before integration.
- Preserved boundary: no production Maze runtime, Loom UI/default-color, Mana pip, Archscry ranking, placement, generated-data, accepted-workbook, corpus, or VM-592 change.
- Integration authority: explicit owner authorization to commit the VM-591-owned artifacts/governance changes directly on `main`, push normally to `origin/main`, fetch, and verify durability. The exact integrating commit is reported by the closeout agent after commit creation; it is also the commit containing this record.
- Follow-up: VM-592 may be created only as a separate future task. It was not created or implemented during VM-591 closeout.

## Owner Review Revision - 2026-08-28 11:42 MDT

### Disposition Addressed

Owner Review returned `NEEDS REVISION — targeted authority reconciliation only`. The accepted semantic-state architecture was preserved. This revision corrects accepted V3.2 authority alignment, explicit Parser Schema ownership, material provenance, deterministic fixture auditing, and round-trip proof only. It does not start runtime wiring or VM-592.

### Exact Revision Files

- `data/maze/maze-semantic-state-v1.schema.json`
- `docs/contracts/maze-semantic-state-contract.md`
- `tests/fixtures/maze-semantic-state-contract-fixtures.js`
- `tests/maze/maze-semantic-state-contract-tests.js`
- `docs/kanban/in-progress/VM-591-freeze-plain-reading-shared-semantic-state-contract.md`
- `docs/kanban/board.md`
- this handoff
- `docs/handoffs/HANDOFF_INDEX.md`

The earlier VM-591 candidate also includes the architecture and package-script files already listed in the original `Files Changed` section below; this revision did not expand into runtime files.

### Seven Named Authority Corrections

| Fixture | Correction | Controlling authority |
|---|---|---|
| 05 Counterspell | Selected primary is exactly `t:instant o:/counter target.*spell/`; optional `mv<=2` remains soft; Tagger is secondary discovery. | CAL-007, CAL-053, CAL-054, EV-007 |
| 06 Board wipe | Selected core is the accepted `otag:board-wipe` ∩ Oracle-floor query; bare Tagger is alternate/classified and Oracle floor alone is alternate/review. | CAL-020, CAL-044, CAL-055, EV-003 |
| 07 Target opponent | Selected lane is exactly `(o:"destroy all creatures target opponent controls" or o:"exile all creatures target opponent controls")`; EV-001 all-opponents/spare-my-board remains separate; status/confidence/evidence remain Review/0.68/R5. | CAL-020/043/044/055, EV-001, EV-003, Master row 909 |
| 08 Mana dork | Four roles are explicit: direct self, alternative self, land untap, grantor/support. `produces:[MANA]` is candidate evidence only and cannot prove either self-production or grantor role without classification. | CAL-023, CAL-045, CAL-056, EV-002, EV-004 |
| 09 Grindy draw | Selected candidate query is exactly `id<=b is:permanent otag:card-advantage`; A/B/C/D/E is mechanical classification, Archscry ranking is separate, and strong D may outrank weak A/B. | CAL-026, CAL-039, CAL-058, EV-006 |
| 10 Group Slug | Engine candidate, burst, and `"a player"` action-tax supplement are separate lanes; repeatability/conditional/one-shot/poor-fit classification happens after retrieval. | CAL-011, CAL-026, CAL-057, CAL-059, EV-005 |
| 12 Reanimation | Selected governed fallback is exactly `(o:put or o:return) o:"creature card" o:graveyard o:battlefield`; the OR structure is preserved. | CAL-022, CAL-054, accepted Reanimation recipe/Archetype Map |

### All-18 Authority Audit

| # | Authority class / maturity | Selected execution disposition |
|---|---|---|
| 01 | CAL-001/004 exact governed truth, Production-ready, R6 | Allowed. |
| 02 | CAL-001/003/004 exact governed truth, Production-ready, R6 | Allowed. |
| 03 | CAL-004/047 exact governed truth, Production-ready, R6 | Allowed; no implicit format. |
| 04 | CAL-007/042 Preference Branch candidate retrieval, contract candidate, R1 | Allowed only as dormant candidate retrieval; not promoted interaction truth. |
| 05 | CAL-007/053/054 + EV-007 exact governed truth, R6 | Allowed; Tagger variant is alternate only. |
| 06 | CAL-020/044/055 + EV-003 exact governed intersection, R6 | Allowed; raw-source lanes are alternates. |
| 07 | CAL-020/043/044/055 + EV-001/003 + row 909 candidate retrieval, Review, R5 | Allowed at accepted Review boundary; no promotion. |
| 08 | CAL-023/045/056 + EV-002/004 exact direct subset, R6 | Allowed; broader roles require classification. |
| 09 | CAL-026/039/058 + EV-006 candidate retrieval, R6 behavior | Allowed; classification/ranking remain downstream. |
| 10 | CAL-011/026/057/059 + EV-005 candidate retrieval, R6 behavior | Allowed; alternate lanes remain labeled. |
| 11 | CAL-016/017/027/043 candidate retrieval, R6 recipe | Allowed; `good` remains unresolved. |
| 12 | CAL-022/054 candidate retrieval, Review governed fallback, R6 recipe | Allowed. |
| 13 | CAL-036/048 exact governed conflict/no-query truth, R6 | Not allowed; blocked. |
| 14 | Parser explicit syntax + CAL-008 exact governed syntax, R6 | Allowed and byte-preserved. |
| 15 | CAL-008/027/038/042 exact round-trip contract, R6 | Allowed; actual equality asserted. |
| 16 | CAL-004/038 + Parser color fields + VM-590 exact adapter contract, R6 | Allowed; explicit color relation asserted. |
| 17 | CAL-047 + Parser/Archscry context rule, R6 | Allowed only for explicit query constraints; dossier context is unapplied. |
| 18 | Parser MV/validation + VM-590 exact invalid/no-query truth, R6 | Not allowed; blocked. |

Every fixture now carries `authority_audit`; every query variant carries `authority_class`, `authority_status`, `evidence_level`, and `provenance`. Tests reject a selected `illustrative_only` query and reconcile ready/blocked state with the audit's executable disposition.

### Parser Schema Ownership Reconciliation

The complete field-by-field map for all accepted Parser Schema rows is in `docs/contracts/maze-semantic-state-contract.md` under **Accepted Parser Schema Ownership Map**. The material decisions are:

- required `confidence` is now top-level semantic provenance with score, tier, and provenance; it measures translation fidelity, not card/result quality;
- required `query_explanation` is now a structured semantic-reference/provenance list;
- required `evidence_level` is now `semantic_provenance.evidence_level` and is also present per query variant when lanes differ;
- `calibration_rules` and `evidence_refs` are governed by `semantic_provenance`;
- `result_quality_flags` remains downstream Maze execution/result state;
- `freshness_checked_at`, `capture_completeness`, and `membership_probes` remain immutable validation/evidence metadata;
- required Parser `query` is intentionally superseded by `query_variants` + `execution_selection`, because only downstream `MazeQueryResult.query` may execute.

### Material Provenance

- Preferences now require `provenance`.
- Conflicts now require `provenance`.
- Unresolved terms now require `provenance`.
- Query variants now require provenance, authority class/status, and evidence level.
- Existing hard constraints, contexts, lenses, assumptions, normalization, confidence, explanation, and recommendation records retain their appropriate provenance owners.

### Exact Round-Trip Proof

The test does not read or trust fixture metadata `semanticEquality: true`.

1. `validateRoundTrip` clones the original state.
2. `reframeForMode` constructs each Operator/Plain/Loom view by changing only source/display provenance framing.
3. After each transition, `semanticFingerprint` compares the complete semantic state while excluding only `state_id`, source input framing, normalization history, and display wording.
4. A second `semanticEqualityProjection` deep-compares the owner-required fields explicitly: hard constraints, Boolean expression, preferences, contexts, lenses, assumptions, conflicts, unresolved terms, and a derived explicit color-relation fingerprint.
5. `colorRelationFingerprint` compares constraint ID, domain, relation, value, and polarity.
6. The Loom return additionally asserts the restored `source.input_value.color_relation` equals the original explicit builder relation.

This proof runs for both Plain → Operator → Plain and Loom → Operator → Loom.

### Revision RobQA

- Risk: QA-0 dormant contract/schema fixtures; no runtime or rendered-product behavior changed.
- Focused semantic-state suite: PASS, 18 fixtures including all authority audits and named V3.2 recurrence guards.
- Existing Maze query contract: PASS.
- Existing builder tests: PASS, 6 cases.
- Existing mode/display tests: PASS, 12 mode + 12 leakage cases.
- `git diff --check`: PASS; line-ending warnings only.
- Expensive suites: `NOT REQUIRED`; no execution, UI, placement, ranking, generated data, or workbook behavior changed.
- Rendered self-QA: not applicable; no visible surface or workbook artifact changed.
- Disposition: **READY FOR OWNER RE-REVIEW**, not Done.

### Protected-Boundary Verification

- No `assets/js/maze/` runtime file changed.
- No Loom UI, Mana pip/default color, Archscry ranking, placement, generated data, or VM-592 work changed.
- Unrelated `docs/research/maze-player-language/corpus/` remains untouched.
- Accepted workbook remained read-only and SHA-256 remains exactly `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`.
- No commit, push, merge, deployment, branch, or worktree operation was performed.

## Agent Name

Codex

## Task Requested

Freeze one versioned semantic-state contract for future Plain Reading, Operator's Hand, Loom, Maze query projection, and Archscry-compatible behavior; create a machine-checkable schema, mapping matrix, deterministic fixtures/tests, standard documentation, and an Owner Review packet without runtime migration.

## Files Reviewed

- Owner-provided VM-591 brief
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/reference/workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-590, VM-589, VM-577, VM-480, VM-479, VM-473, VM-472, and VM-471 cards/handoffs where relevant
- `docs/kanban/board.md`
- `docs/contracts/maze-query-contract.md`
- `docs/reports/2026-08-27-implicit-maze-loom-red-team.md`
- `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md`
- Accepted Calibration V3.2 workbook sheets `Learned_Rules`, `Translation_Contract`, `Toggle_Roundtrip`, `Parser_Schema`, and `Archscry_Enrichment`
- `assets/js/maze/research-init.js`
- `assets/js/maze/maze-query-core.js`
- `assets/js/maze/research-mode.js`
- `assets/js/maze/research-builder.js`
- `assets/js/maze/scryfall-grounded-compiler.js`
- relevant Maze query, builder, and mode tests
- targeted Git history for the current Maze owners and prior `queryModel` work

## Files Changed

- `data/maze/maze-semantic-state-v1.schema.json`
- `docs/contracts/maze-semantic-state-contract.md`
- `tests/fixtures/maze-semantic-state-contract-fixtures.js`
- `tests/maze/maze-semantic-state-contract-tests.js`
- `package.json`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/kanban/in-progress/VM-591-freeze-plain-reading-shared-semantic-state-contract.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Added JSON Schema `MazeSemanticState v1` with exact version `1.0.0`.
- Defined separate source, normalization, hard constraints, Boolean tree, preferences, contexts, lenses, assumptions, conflicts, unresolved terms, query candidates, execution selection, diagnostics, display, and recommendation-handoff sections.
- Preserved printed-color versus color-identity domains and explicit exact/subset/superset/contains relations.
- Defined `maze_query_projection` as the selected state projection while retaining `MazeQueryResult.query` as the only executable query.
- Documented deterministic Plain, Operator, Loom, Maze, display, and Archscry mappings.
- Documented current Loom `builderFilters` color-operator mappings without selecting a future default.
- Added the 18 owner-required fixture classes and focused invariants for schema structure, referential integrity, Boolean preservation, hard/soft separation, context application, no-query invalid/conflict state, semantic round trips, explicit syntax, recommendation signals, runtime non-wiring, and exact workbook hash.
- Added architecture/data-flow references and a dedicated package test command.
- Recorded VM-591 as In Progress at Owner Review rather than marking it accepted or Done.

## Why It Changed

Current modes preserve some query strings but do not share one governed meaning owner. Calibration V3.2 requires richer state than a final Scryfall string can carry, and VM-590 showed the same need for Loom color relations, invalid states, and context provenance. The contract prevents later modes or recommendation consumers from reparsing display/executable strings and losing meaning.

## Decisions Made

- `MazeSemanticState v1` is the single future semantic source of truth.
- Current `queryModel` is reusable Plain Reading adapter evidence, not replaced machinery.
- Existing `builderFilters` remain a valid Loom source adapter.
- Display strings are projections and must not become semantic authority.
- `MazeQueryResult.query` remains the sole executable query contract.
- Query candidates live in state, but only one validated selection may project to the existing query resolver.
- Context existence and `applied_to_query` are independent.
- Recommendation signals always have `query_truth=false`.
- VM-591 does not choose Loom's default color relation; VM-592 retains that owner decision.
- No production runtime module imports the new schema.

## Risks / Uncertainties

- A future implementation must map the richer V1 shape from current compiler clauses without duplicating `queryModel` as a second engine.
- Operator syntax parsing needs a bounded compatibility adapter that preserves valid explicit syntax and surfaces unsupported syntax; the current reverse translator cannot own that meaning.
- Loom v0 cannot render every semantic-state feature; later adapters must surface unsupported meaning instead of dropping it.
- Schema evolution needs explicit versioning/migration once real runtime consumers exist.
- The owner still must decide Loom's default color behavior in VM-592.

## Tests Run

- `node --check tests/fixtures/maze-semantic-state-contract-fixtures.js` - PASS.
- `node --check tests/maze/maze-semantic-state-contract-tests.js` - PASS.
- `npm.cmd run test:maze-semantic-state` - PASS: 18 fixtures, schema invariants, round trips, runtime boundary, exact authority hash.
- `node tests/maze/maze-query-contract-tests.js` - PASS.
- `npm.cmd run test:builder` - PASS: 6 cases.
- `npm.cmd run test:mode` - PASS: 12 mode and 12 leakage cases.
- `git diff --check` - PASS with expected LF-to-CRLF warnings only.

## RobDev Packet

- Card/repo state: VM-591 on `main`, one worktree, no related branch/worktree, no commit/push.
- Product/repository outcome: a runtime-ready but dormant shared semantic contract and reviewable implementation packet.
- Owning authority: accepted Calibration V3.2 workbook plus current Maze query contract and VM-590 runtime evidence.
- Existing machinery reused: compiler `queryModel`, query core execution owner, builder filters, source context, current diagnostics/mode boundaries.
- Changed behavior: repository contract/schema/test documentation only; no shipped behavior.
- Protected behavior: all current query strings, parser behavior, mode switching, builder defaults, Scryfall fetch/results, Reading Finds, Archscry handoff/ranking, placement, generated data, and accepted workbook bytes.
- Consumers inspected: Plain compiler, Operator route, mode display, Loom builder, Maze query resolver, source-context handoff, focused tests.
- Smallest complete implementation: specification + JSON Schema + 18 fixtures + validator + architecture/Kanban/handoff updates.
- Non-goals maintained: VM-592, runtime migration, UI, graph, ranking, placement, recommendation execution, workbook/corpus work.
- Stop condition: Owner Review; no further runtime work.

## RobQA Readiness

- QA tier: QA-0 with deterministic schema/contract validation; no runtime or visible product change.
- Changed behavior: machine-checkable repository contract and focused fixture coverage.
- Protected behavior intentionally untouched: current Maze runtime, query ownership, builder/mode behavior, accepted authority, placement/ranking.
- Selected tests: new contract suite for exact changed risk; existing query/builder/mode suites for compatibility; diff check for repository hygiene.
- Result: all selected checks PASS.
- CPU-heavy validation: `NOT REQUIRED`.
- Expensive suites intentionally skipped: full `npm test`, browser/journey, placement, synthetic, mutation, recovery, visual, and live Scryfall checks. No protected runtime or visible surface changed, so these would not catch a VM-591-specific defect beyond the targeted contracts.
- Rendered self-QA: not applicable; no visible UI or workbook output changed.
- Manual findings converted to invariants: VM-590 color ambiguity -> explicit color domain/relation; dossier ambiguity -> `applied_to_query`; invalid builder range -> blocking no-query diagnostic; Calibration row-909 -> distinct ownership lenses.
- Remaining owner judgment: schema/mapping acceptance, Loom default relation in VM-592, and authorization/timing of a later runtime adapter pilot.
- Owner review command: `npm.cmd run test:maze-semantic-state`.

## Owner Review Questions

1. Exactly one semantic source of truth? Yes: `MazeSemanticState v1`.
2. Executable query uniquely owned? Yes: `MazeQueryResult.query`.
3. Plain/Operator/Loom meaning without reparse drift? Yes: source mode is non-semantic and fixtures 15/16 assert equal semantic fingerprints.
4. Preferences distinct from hard filters? Yes.
5. Context can exist without application? Yes; fixture 17.
6. Conflicts/unresolved language survive? Yes.
7. Multi-Lens remains structured? Yes.
8. Archscry can consume structured signals? Yes, without ranking implementation.
9. Loom default remains for VM-592? Yes.
10. Next runtime migration? A separate Maze Shared Semantic-State Runtime Adapter Pilot after owner review and VM-592 decisions; no migration is in VM-591.

## Not Touched

- Accepted Calibration V3.2 workbook or any propagation/provenance artifact
- `assets/js/maze/` production files
- Maze HTML/CSS, Mana Font, pips, layout, Copy/Open, focus, or results
- Scryfall grounding/semantic data
- Archscry runtime/ranking and placement
- Reading Finds/storage
- Loom v1 / graph concepts
- Unrelated untracked `docs/research/maze-player-language/corpus/`
- Git branch/worktree, staging, commit, push, merge, or deployment

## Follow-Up Recommendations

1. Owner reviews the schema, mapping matrix, and the single focused test command.
2. VM-592 decides Loom's default color relation and uses this schema as a representational constraint without silently migrating runtime.
3. After acceptance, create a separate runtime adapter pilot for Plain/Operator compatibility; add Loom only after its explicit default is frozen.
4. Keep Archscry ranking and placement application in later separately authorized stories.

## Next Suggested Agent

Owner Reviewer for VM-591; then Planning Architect for VM-592 or the later runtime adapter pilot.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-591-freeze-plain-reading-shared-semantic-state-contract.md`
- `docs/contracts/maze-semantic-state-contract.md`
- `data/maze/maze-semantic-state-v1.schema.json`
- `docs/contracts/maze-query-contract.md`
- `docs/kanban/done/VM-590-implicit-maze-loom-red-team.md`
- `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md`
