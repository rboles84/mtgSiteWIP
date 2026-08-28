# Maze Shared Semantic-State Contract v1

Status: VM-591 Owner Accepted / contract frozen  
Schema version: `1.0.0`  
Machine contract: [`../../data/maze/maze-semantic-state-v1.schema.json`](../../data/maze/maze-semantic-state-v1.schema.json)  
Executable query contract: [`maze-query-contract.md`](maze-query-contract.md)

## Purpose

This contract freezes one structured meaning model for future Implicit Maze work across The Plain Reading (`plain`), The Operator's Hand (`operator`), The Loom (`loom`), Maze execution, and Archscry-compatible recommendation handoff.

```text
player intent
  -> source adapter
  -> MazeSemanticState v1
  -> query candidates + display forms + recommendation signals
  -> one selected MazeQueryResult.query
```

The forbidden architecture is `player intent -> query string -> infer the original meaning afterward`.

The semantic state is the future meaning authority. It is not a second network-execution contract. `MazeQueryResult.query` remains the sole string that the current Maze search path may execute.

## Authority

The contract follows this accepted order:

1. `Scryfall_Maze_Master_Calibration_V3_2_Propagation_Accepted.xlsx`
2. `CURRENT_AUTHORITY.md`
3. `Learned_Rules`
4. `Translation_Contract`
5. `Toggle_Roundtrip`
6. `Parser_Schema`
7. `Archscry_Enrichment`
8. the accepted Maze query contract
9. VM-590 and current runtime contracts

The accepted workbook SHA-256 is `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`. VM-591 does not modify or regenerate it; the focused contract test verifies the exact hash.

## Scope And Runtime Boundary

VM-591 defines and tests a dormant contract. It does not wire the schema into `research-init.js`, `maze-query-core.js`, `research-mode.js`, `research-builder.js`, or `scryfall-grounded-compiler.js`.

Authorized artifacts are this specification, the JSON Schema, deterministic fixtures/tests, and lifecycle documentation. Runtime migration, Loom UI/default-color work, Archscry ranking, placement weighting, graph work, accepted-workbook changes, generated data, and Reading Finds are not authorized.

## Reuse Map

| Current owner | Reusable evidence | Future adapter role | VM-591 treatment |
|---|---|---|---|
| `scryfall-grounded-compiler.js` | `queryModel`, clauses, provenance, assumptions, unresolved terms, ambiguity | Plain Reading adapter | Reuse; do not replace or wire yet. |
| `maze-query-core.js` | `MazeQueryResult.query`, diagnostics, source context | Execution projection owner | Preserve as sole executable-query authority. |
| `research-mode.js` | Current string-based continuity | Transitional display behavior | Reverse translation is not semantic truth. |
| `research-builder.js` | Deterministic `builderFilters` query generation | Loom source adapter | Preserve; map filters plus explicit relation later. |
| `research-init.js` | Route state, modes, launch context, fetch/render/storage | Runtime consumer | No VM-591 wiring. |
| `research-syntax-language.js` | Bounded syntax-to-human display | Legacy display fallback | Display only. |

## Canonical State

The JSON Schema is normative for field names, required fields, enums, and structural types.

### Identity And Provenance

| Field | Meaning |
|---|---|
| `schema_version` | Exact contract version; V1 is `1.0.0`. |
| `state_id` | Stable trace ID, not semantic content. |
| `source.mode` | `plain`, `operator`, or `loom`; changing it cannot change meaning. |
| `source.input_kind` | `natural_language`, `scryfall_syntax`, or `builder_filters`. |
| `source.input_value` | Original user input or builder snapshot. |
| `source.explicit_syntax_preserved` | Valid user-authored syntax must remain byte-preservable. |
| `normalization` | Material transformations plus their authority references. |
| `confidence` | Required parser-fidelity score/tier with provenance; never card quality or result quality. |
| `query_explanation` | Required structured explanation from semantic IDs to governed reasons/provenance. |
| `semantic_provenance` | Required `evidence_level` plus applied CAL rules and evidence references. |

`validation_state` is `valid`, `invalid`, `conflict`, or `unresolved`.

`execution_mode` is explicit and never inferred from the final query:

| Contract value | Accepted workbook mode |
|---|---|
| `direct_exact` | Direct Exact |
| `component_exact` | Component Exact |
| `mechanical_pattern` | Mechanical Pattern |
| `preference_branch` | Preference Branch |
| `strict_broaden` | Strict + Broaden |
| `governed_context_default` | Governed Context Default |
| `multi_lens_bundle` | Multi-Lens Bundle |
| `reference_similarity` | Reference Similarity |
| `discovery_subjective` | Discovery / Subjective |
| `conflict` | Conflict |

### Hard Constraints And Boolean Meaning

`hard_constraints` contains only required meaning. Every constraint has a stable ID, semantic category, field, explicit relation, typed value, include/exclude polarity, source text, provenance, and an optional applied-context reference.

The category inventory covers name; type/supertype/subtype; printed color; color identity; format legality; commander eligibility; keywords; Oracle text; mechanical function; relationships; mana value/cost; price; printing/set; rarity; stats; result controls; and bounded other constraints.

`boolean_expression` is an expression tree rather than a flat array:

- `group` nodes preserve `and`/`or` structure;
- `constraint_ref` nodes reference hard constraints;
- `not` nodes preserve exclusion scope;
- `empty` is allowed only when there are no hard constraints.

Every hard constraint must appear in the tree and every reference must resolve. Parentheses and negation therefore survive independently from query token order.

```json
{
  "kind": "group",
  "operator": "and",
  "children": [
    {
      "kind": "group",
      "operator": "or",
      "children": [
        { "kind": "constraint_ref", "constraint_id": "type-artifact" },
        { "kind": "constraint_ref", "constraint_id": "type-enchantment" }
      ]
    },
    { "kind": "not", "child": { "kind": "constraint_ref", "constraint_id": "reserved" } }
  ]
}
```

### Preferences

`preferences` are separate from hard constraints. They record category/relation/value, original soft language, whether they create a preferred variant or ranking signal, status, provenance, and any threshold.

An inferred threshold must set `inferred=true` and `editable=true`. Removing a preference must reproduce the strict/base candidate without changing hard constraints.

### Context

`contexts` separates presence from application. Each record contains its dimension, source, value, inheritance, `applied_to_query`, application reason, and provenance.

Commander format and deck color identity are different dimensions. Dossier or placement context may exist with `applied_to_query=false`; such a context cannot back a hard constraint or alter the selected query candidate. VM-591 does not auto-apply dossier identity, placement, deck colors, or recommendation weighting.

### Lenses, Assumptions, Conflicts, And Unresolved Terms

`lenses` keep a parent concept, named role, label, query-variant references, and provenance. V1 can represent the EV-003 board-wipe intersection/Tagger-only/Oracle-only lanes; the EV-004 mana direct-self/alternative-self/land-untap/grantor-support roles; Aristocrats outlet/payoff/fodder; blink watcher/target/engine; the EV-005 Group Slug engine-candidate/burst/action-tax lanes; and EV-006 draw A/B/C/D/E classifications. A Multi-Lens bundle is never flattened into one opaque OR string.

`assumptions` expose material decisions such as `cheap -> MV<=2` or an accepted Enchantress-to-GW default. They carry status and provenance.

`conflicts` identify incompatible hard constraints, explanation, optional user-selectable alternate, accept/reject state, and provenance. Pending conflicts block execution; no hard constraint is silently dropped.

`unresolved_terms` preserve meaningful language such as `fun`, `oppressive`, `good`, `synergy`, or `unusual`, including provenance for the rule/source that prevented silent translation. A deterministic subset may still be queryable, but unresolved meaning remains visible and round-trips.

### Query Variants And Execution

`query_variants` supports `strict`, `preferred`, `broadened`, `lens`, and `conflict`. Each variant stores a query candidate, eligibility, reason, exact differences, optional lens reference, provenance, evidence level, authority status, and one authority class: `exact_governed_truth`, `candidate_retrieval`, `alternate_lens`, or `illustrative_only`.

An executable candidate may still be candidate retrieval rather than semantic truth. `illustrative_only` variants cannot be selected. Review-limited lanes retain their status and evidence level; for example, Master Lexicon row 909 remains `Review`, `0.68`, and `R5` rather than being promoted by this contract.

A `query_candidate` is not permission to execute. `execution_selection` is the projection boundary:

- `ready` selects exactly one executable candidate and copies it to `maze_query_projection`;
- `blocked` selects none and projects `null`;
- `no_query` selects none and projects `null`.

The route adapter may pass a ready projection through the existing Maze resolver. Only the resulting `MazeQueryResult.query` is executed.

### Diagnostics, Display, And Recommendation Handoff

Pre-execution diagnostics include `invalid_range`, `contradiction`, `unsupported_syntax`, `unresolved_semantic`, `context_conflict`, `assumption`, and `breadth`. Invalid ranges and pending contradictions are blocking errors and produce no query projection.

`display` keeps normalized Plain text, generated/preserved Operator syntax, and structured Operator tokens distinct. Tokens link to semantic IDs and record field, relation, value, polarity, Boolean group, and hard/soft status. Display text is never the source of truth when state exists.

`recommendation_handoff` exposes candidate truth, preferences, lenses, classifications, signals, and explanation provenance without implementing ranking. Signals include role, relationship role, repeatability, adjacency, efficiency, budget, EDHREC popularity, Game Changer status, theme/art, result breadth, social-scope proxy, recommendation policy, and context provenance. Every signal has `query_truth=false`.

## Accepted Parser Schema Ownership Map

This table reconciles every accepted `Parser_Schema` field. “Owned elsewhere” means the field is intentionally not copied into `MazeSemanticState`; its named downstream evidence/result owner remains authoritative.

| Accepted Parser field | Classification | MazeSemanticState v1 owner / disposition |
|---|---|---|
| `input_text` | semantic-state field | `source.input_value`; preserved without mutation. |
| `context.format` | semantic-state field | `contexts[]` with `dimension=format`; application remains explicit. |
| `context.deck_colors` | semantic-state field | `contexts[]` with `dimension=deck_color_identity`; only an applied context may back a hard constraint. |
| `explicit_syntax_tokens` | semantic-state field | Preserved source syntax plus `display.operator_tokens`; syntax is a rendering, linked to semantic IDs. |
| `name_constraints` | semantic-state field | Typed `hard_constraints[]`. |
| `format_constraints` | semantic-state field | Typed `hard_constraints[]` under `format_legality`. |
| `color_value` | semantic-state field | Color constraint `value`, separate from domain and relation. |
| `color_domain` | semantic-state field | Constraint category `printed_color` or `color_identity`. |
| `color_relation` | semantic-state field | Constraint `relation`; exact/subset/superset/contains never inferred from pips alone. |
| `type_constraints` | semantic-state field | Typed type/supertype/subtype hard constraints. |
| `keyword_constraints` | semantic-state field | Typed keyword hard constraints. |
| `keyword_action_constraints` | semantic-state field | Typed Oracle/function hard constraints, not silently converted to `kw:`. |
| `ability_word_constraints` | semantic-state field | Typed Oracle-text hard constraints. |
| `function_concepts` | semantic-state field | Function hard constraints plus structured lenses when the concept has distinct jobs. |
| `relationship_concepts` | semantic-state field | Relationship hard constraints/lenses; unresolved relationships stay explicit. |
| `oracle_phrases` | semantic-state field | Oracle-text hard constraints and Boolean structure. |
| `regex_templates` | semantic-state field | Oracle constraints plus governed query variant/provenance. |
| `mana_value_constraints` | semantic-state field | Typed numeric hard constraints or preferences. |
| `mana_cost_constraints` | semantic-state field | Typed mana-cost hard constraints. |
| `stat_constraints` | semantic-state field | Typed stat hard constraints. |
| `price_constraints` | semantic-state field | Typed price hard constraints/preferences; printing scope remains explicit. |
| `printing_constraints` | semantic-state field | Typed printing/set hard constraints. |
| `history_constraints` | semantic-state field | Typed printing/set hard constraints with explicit polarity. |
| `result_controls` | semantic-state field | `result_control` hard constraints or non-query recommendation/display signals, according to whether the user made them required. |
| `negative_constraints` | semantic-state field | Constraint `polarity=exclude` plus scoped Boolean `not`. |
| `ignored_terms` | semantic provenance/governance field | Material normalization operations; filler is not semantic truth. |
| `unresolved_terms` | semantic-state field | `unresolved_terms[]`, including provenance. |
| `assumptions` | semantic-state field | `assumptions[]`, including status and provenance. |
| `alternatives` | semantic-state field | Structured query variants, lenses, conflicts, or assumptions according to why the alternative exists. |
| `confidence` | semantic provenance/governance field | Required top-level `confidence`; measures translation fidelity only and carries provenance. |
| `query` | intentionally superseded | Replaced by governed `query_variants` plus `execution_selection.maze_query_projection`; only downstream `MazeQueryResult.query` may execute. This prevents a second query owner. |
| `query_explanation` | semantic provenance/governance field | Required `query_explanation[]`, keyed by semantic reference with provenance. |
| `validation_state` | semantic-state field | Top-level `validation_state`; V1 expands accepted values to explicit `valid`, `invalid`, `conflict`, and `unresolved`. |
| `preference_constraints` | semantic-state field | `preferences[]`; never silently promoted to hard truth. |
| `subjective_qualifiers` | semantic-state field | `unresolved_terms[]` or a labeled recommendation signal/proxy; never direct query truth. |
| `ambiguity_class` | intentionally superseded | Replaced by the structured owner that expresses the ambiguity: lenses, conflicts, assumptions, unresolved terms, diagnostics, and variants. A duplicate flat label would not own meaning. |
| `conflicts` | semantic-state field | `conflicts[]`, including provenance and optional user-controlled alternate. |
| `query_variants` | semantic-state field | `query_variants[]` with authority class/status, evidence level, provenance, and exact differences. |
| `calibration_rules` | semantic provenance/governance field | Required `semantic_provenance.calibration_rules`. |
| `result_breadth` | semantic-state field | Pre-execution breadth diagnostic and/or recommendation signal; actual counts remain result state. |
| `execution_mode` | semantic-state field | Required top-level `execution_mode`. |
| `strict_query` | intentionally superseded | The `strict` query variant plus explicit selection owns this without duplicating a top-level query. |
| `preference_queries` | intentionally superseded | `preferred` query variants reference the preference and record exact differences. |
| `lens_definitions` | semantic-state field | `lenses[]` and their referenced query variants. |
| `operator_tokens` | semantic-state field | `display.operator_tokens`, linked to semantic IDs; display tokens do not become meaning authority. |
| `roundtrip_plain` | semantic-state field | `display.plain_text`, regenerated from shared state and excluded from semantic equality. |
| `recommendation_signature` | semantic-state field | `recommendation_handoff.classifications/signals`; every signal has `query_truth=false`. |
| `evidence_level` | semantic provenance/governance field | Required `semantic_provenance.evidence_level`; each query variant also carries its own level where lanes differ. This is the governed replacement for the required parser field. |
| `evidence_refs` | semantic provenance/governance field | Required `semantic_provenance.evidence_refs`, supplemented by per-object provenance. |
| `result_quality_flags` | execution/result state owned elsewhere | Owned by `MazeQueryResult`/result diagnostics after execution; semantic state may carry only pre-execution warnings or recommendation signals. |
| `freshness_checked_at` | validation/evidence metadata owned elsewhere | Owned by immutable validation/capture artifacts and authority manifests; it is not user meaning. |
| `context.active_search_mode` | semantic-state field | `contexts[]` with `dimension=ui_mode` and, when separately known, a format context. |
| `context_source` | semantic provenance/governance field | `context.source` plus `context.provenance`. |
| `correction_suggestion` | semantic-state field | `conflicts[].suggested_alternate`; never auto-applied. |
| `recommendation_policy` | semantic-state field | Recommendation signal with `query_truth=false`. |
| `capture_completeness` | validation/evidence metadata owned elsewhere | Owned by R3+ validation captures; partial evidence cannot prove absence. |
| `membership_probes` | validation/evidence metadata owned elsewhere | Owned by validation evidence/probe logs under V2/V3; results may justify provenance but are not semantic state. |

Required-field disposition is therefore explicit: `confidence`, `query_explanation`, and `evidence_level` remain required in the contract; only their placement is normalized around semantic/provenance ownership. `query` is the sole required Parser field intentionally superseded, because retaining it at top level would violate the accepted single-executable-owner boundary.

## Normative Invariants

1. One `MazeSemanticState` record owns meaning for the active expression.
2. `source.mode` never changes meaning.
3. No top-level `query` field exists in semantic state.
4. `MazeQueryResult.query` remains the sole executable query.
5. A ready selection references exactly one executable candidate and projects the same string.
6. Invalid or conflicting state projects no query.
7. Every hard constraint participates in the Boolean tree.
8. OR grouping and exclusion scope survive rendering.
9. Preferences never become hard constraints silently.
10. Inferred thresholds remain observable/editable.
11. Printed color and color identity are separate categories.
12. Color always has explicit domain and relation.
13. `c=wu`, `c<=wu`, `id=wu`, and `id<=wu` are distinct.
14. Printed colorless and colorless identity are distinct.
15. Context existence does not imply query application.
16. A context-backed hard constraint references only `applied_to_query=true` context.
17. Commander format and deck identity are separate contexts.
18. Assumptions, conflicts, and unresolved terms survive mode changes.
19. Multi-Lens parents and named roles remain structured.
20. Recommendation signals are never query truth.
21. Valid explicit syntax is preservable.
22. Plain/Operator/Loom strings are renderings, not reparse authorities.
23. Variant differences are explicit.
24. Loom color meaning is never inferred only from selected pips.
25. VM-591 does not choose Loom's default color rule.

## Mapping Matrix

| Direction | Deterministic mapping | Protected boundary |
|---|---|---|
| Plain -> state | Preserve original text; adapt typed `queryModel` clauses, Boolean grouping, assumptions, unresolved terms, ambiguity, mode, and variants. | Generated query is not semantic authority. |
| Operator -> state | Preserve valid syntax; parse fields/operators/groups to linked constraints/tokens; diagnose unsupported syntax. | Syntax-to-English remains display-only. |
| Loom -> state | Map each `builderFilters` field plus explicit color relation; validate ranges before query assembly. | Do not replace Loom with Plain Reading or infer relation from colors. |
| State -> Maze | Select one ready variant, project it, then use the existing Maze query resolver. | No competing executable-query owner. |
| State -> Plain | Render from constraints, preferences, context, lenses, assumptions, conflicts, unresolved terms. | Do not reparse Operator syntax when state exists. |
| State -> Operator | Render canonical tokens/syntax; preserve marked explicit syntax. | Operator view is not the meaning owner. |
| State -> Loom | Restore builder-supported fields; surface non-builder meaning explicitly. | Do not discard preferences/conflicts/unresolved terms/lenses. |
| State -> Archscry | Supply candidate truth, preferences, roles, classifications, signals, provenance. | No ranking/placement implementation. |

## Loom Adapter Contract

The current `MazeBuilderFilters` shape remains valid source input:

```js
{
  colors: string[],
  colorOp: "c" | "id" | "c<=" | "c>=" | string,
  types: string[],
  format: string,
  keywords: string[],
  cmcMin: string,
  cmcMax: string,
  rarities: string[]
}
```

The adapter must output an explicit relation:

| Builder input | Semantic category | Relation | Rendering |
|---|---|---|---|
| `colors:[W,U]`, `colorOp:"c"` | `printed_color` | `equals` | `c=wu` |
| `colors:[W,U]`, `colorOp:"c<="` | `printed_color` | `subset` | `c<=wu` |
| `colors:[W,U]`, `colorOp:"c>="` | `printed_color` | `superset` | `c>=wu` |
| `colors:[W,U]`, `colorOp:"id"` | `color_identity` | `subset` | `id<=wu` |
| `colors:[C]`, printed color | `printed_color` | `equals` | `c:c` |
| `colors:[C]`, identity | `color_identity` | `equals` | `id:c` |

This documents current representable meaning but chooses no default; VM-592 owns that decision. Multiple values within type, rarity, or keyword form OR groups; filter families are ANDed. `cmcMin > cmcMax` yields `invalid_range`, blocks, and projects no query.

## Required Contracts

### A - Plain Reading Compilation

Natural language plus optional context produces `MazeSemanticState v1`. Only validated state may produce variants. Current `queryModel` can be adapted, but its final query cannot own meaning.

### B - Operator Rendering

When state exists, Operator's Hand renders from state. Valid explicit syntax remains preservable. Harmless canonicalization must be meaning-preserving and recorded.

### C - Round Trip

`Plain -> Operator -> Plain` and `Loom -> Operator -> Loom` preserve hard constraints, preferences, exclusions, Boolean grouping, context, lenses, assumptions, conflicts, and unresolved terms. Wording/token order may differ; semantic fingerprint may not.

### D - Loom Adapter

The current builder remains a source adapter, not a Plain Reading input. Selected colors and relation are separate. Meaning the builder cannot represent must be surfaced rather than discarded.

### E - Maze Execution

Only `ready` state projects a selected candidate. The existing core remains responsible for `MazeQueryResult.query`, API metadata, and execution.

### F - Archscry Handoff

Recommendation consumers receive structured candidate truth, preferences, lenses, classifications, signals, and provenance. They do not reverse-engineer meaning from the query or mutate hard truth.

## Regression Fixtures

Executable fixtures live in `tests/fixtures/maze-semantic-state-contract-fixtures.js`.

| # | Fixture | Failure class |
|---|---|---|
| 1 | Simic deck-fit | Identity subset must not become exact. |
| 2 | Printed black in Golgari | Printed color and deck identity remain separate. |
| 3 | Azorius identity | Identity does not imply Commander format. |
| 4 | Cheap Izzet interaction | Soft MV preference is removable. |
| 5 | Counterspells | EV-007 targeted-spell regex is primary; Tagger is secondary; MV preference remains soft. |
| 6 | Board wipes | CAL-055/EV-003 intersection core plus Tagger-only classified and Oracle-only review lanes. |
| 7 | One-sided vs target opponent | Accepted row-909 target-one-opponent lane remains Review/0.68/R5 and separate from EV-001. |
| 8 | Mana dorks | CAL-056/EV-004 direct-self, alternative-self, land-untap, and grantor/support roles. |
| 9 | Grindy black draw | EV-006 candidate retrieval, A/B/C/D/E classification, and separate semantic ranking. |
| 10 | Group Slug | CAL-057/EV-005 engine candidate, burst, action-tax, and post-retrieval repeatability boundaries. |
| 11 | Blink | Watchers/targets distinct; unresolved quality survives. |
| 12 | Reanimation | Governed creature-card fallback preserves the put/return OR family. |
| 13 | Contradictory colors | Conflict blocks; no hard drop. |
| 14 | Explicit syntax | User syntax and grouping preserved. |
| 15 | Plain round trip | Full semantic fingerprint equal. |
| 16 | Loom round trip | Filters and explicit color relation equal. |
| 17 | Dossier context | Provenance exists while not applied. |
| 18 | Invalid MV range | Blocking diagnostic; no query. |

### Deterministic 18-Fixture Authority Audit

| # | Controlling accepted authority | Authority class / status | Selected executable? |
|---|---|---|---|
| 01 | CAL-001, CAL-004, Commander identity recipe | Exact governed truth / Production-ready / R6 | Yes — `id<=ug f:commander`. |
| 02 | CAL-001, CAL-003, CAL-004 | Exact governed truth / Production-ready / R6 | Yes — printed color and identity ceiling stay separate. |
| 03 | CAL-004, CAL-047 | Exact governed truth / Production-ready / R6 | Yes — no implicit format token. |
| 04 | CAL-007, CAL-042, Preference Branch | Candidate retrieval / contract candidate / R1 | Yes for the dormant fixture; it is not promoted as governed interaction truth. |
| 05 | CAL-007, CAL-053, CAL-054, EV-007 | Exact governed truth / Production-ready / R6 | Yes — `t:instant o:/counter target.*spell/`; Tagger is alternate discovery. |
| 06 | CAL-020, CAL-044, CAL-055, EV-003 | Exact governed truth / Production-ready / R6 | Yes — selected Tagger ∩ Oracle-floor core; raw lanes are alternates. |
| 07 | CAL-020/043/044/055, EV-001/003, Master row 909 | Candidate retrieval / Review / R5 | Yes — accepted target-one-opponent lane at confidence 0.68; not promoted. |
| 08 | CAL-023/045/056, EV-002/004 | Exact governed direct subset / Production-ready / R6 | Yes — direct-self subset; other roles are candidate/alternate lanes. |
| 09 | CAL-026/039/058, EV-006, grindy-draw recipe | Candidate retrieval / governed behavior / R6 | Yes — `id<=b is:permanent otag:card-advantage`; ranking remains separate. |
| 10 | CAL-011/026/057/059, EV-005, Group Slug recipes | Candidate retrieval / governed behavior / R6 | Yes — engine candidate lane; burst/action-tax are alternates. |
| 11 | CAL-016/017/027/043, Blink authority | Candidate retrieval / governed recipe / R6 | Yes — watcher/target candidates; `good` stays unresolved. |
| 12 | CAL-022/054, Reanimation recipe/Archetype Map | Candidate retrieval / Review governed fallback / R6 | Yes — `(o:put or o:return) o:"creature card" o:graveyard o:battlefield`. |
| 13 | CAL-036/048, Conflict mode | Exact governed no-query truth / R6 | No — conflict blocks selection. |
| 14 | Parser explicit syntax, CAL-008, Maze query contract | Exact governed truth / Production-ready / R6 | Yes — preserved explicit syntax. |
| 15 | CAL-008/027/038/042, Toggle Roundtrip | Exact governed contract / R6 | Yes — actual Plain → Operator → Plain equality is asserted. |
| 16 | CAL-004/038, Parser color domain/relation, VM-590 | Exact governed adapter contract / R6 | Yes — actual Loom → Operator → Loom equality includes explicit color relation. |
| 17 | CAL-047, Parser context source, Archscry context inheritance | Exact governed architecture rule / R6 | Yes — only explicit query constraints execute; dossier context stays unapplied. |
| 18 | Parser MV/validation fields, VM-590 | Exact governed no-query truth / R6 | No — invalid range blocks selection. |

Every query variant also carries its own authority class, status, evidence level, and provenance. The test suite rejects an `illustrative_only` selected variant and reconciles selected executability against this per-fixture audit.

## Versioning And Future Consumers

Breaking required-field or meaning changes require a new schema version and migration plan. Runtime consumers must reject unsupported major versions rather than guess.

No runtime consumer changes in VM-591. A later authorized migration is expected to touch:

- `assets/js/maze/scryfall-grounded-compiler.js` - `queryModel` adapter;
- `assets/js/maze/maze-query-core.js` - validated projection while preserving `MazeQueryResult.query`;
- `assets/js/maze/research-mode.js` - state-based rendering;
- `assets/js/maze/research-builder.js` - builder/state adapters;
- `assets/js/maze/research-init.js` - active state lifecycle;
- focused parser/mode/builder/query/rendered tests.

The recommended next runtime story is a separate **Maze Shared Semantic-State Runtime Adapter Pilot** after owner review and any VM-592 color/default decisions. Its smallest slice should migrate Plain Reading and Operator rendering behind compatibility adapters while leaving fetch, results, Reading Finds, Archscry ranking, and Loom v1 untouched. Loom joins only after its explicit default decision is frozen.

## Owner Review Answers

1. One semantic source of truth? **Yes: `MazeSemanticState v1`.**
2. Executable query uniquely owned? **Yes: `MazeQueryResult.query`.**
3. Cross-mode meaning without reparse drift? **Yes: mode is non-semantic and fixtures 15/16 assert equal fingerprints.**
4. Preferences distinct? **Yes: separate records/tokens/variants.**
5. Context can exist unapplied? **Yes: fixture 17.**
6. Conflicts/unresolved terms survive? **Yes: separate durable collections.**
7. Multi-Lens remains structured? **Yes: parent concept, roles, per-lens variants.**
8. Archscry signals without query reverse-engineering? **Yes: explicit handoff.**
9. Loom default left for VM-592? **Yes.**
10. Next migration? **A separate compatibility-adapter pilot after owner review; none is included here.**

Stop after Owner Review. Do not implement VM-592 or runtime migration in VM-591.
