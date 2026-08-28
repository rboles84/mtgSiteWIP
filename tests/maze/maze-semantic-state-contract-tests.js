import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fixtures } from "../fixtures/maze-semantic-state-contract-fixtures.js";

const schemaUrl = new URL("../../data/maze/maze-semantic-state-v1.schema.json", import.meta.url);
const schema = JSON.parse(await readFile(schemaUrl, "utf8"));

const EXPECTED_AUTHORITY_HASH = "f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5";
const EXECUTION_MODES = new Set([
  "direct_exact",
  "component_exact",
  "mechanical_pattern",
  "preference_branch",
  "strict_broaden",
  "governed_context_default",
  "multi_lens_bundle",
  "reference_similarity",
  "discovery_subjective",
  "conflict"
]);

assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
assert.equal(schema.$id, "https://voxmana.io/schemas/maze-semantic-state-v1.schema.json");
assert.equal(schema.properties.schema_version.const, "1.0.0");
assert.deepEqual(new Set(schema.properties.execution_mode.enum), EXECUTION_MODES);
assert.ok(schema.required.includes("boolean_expression"));
assert.ok(schema.required.includes("recommendation_handoff"));
assert.ok(schema.required.includes("confidence"));
assert.ok(schema.required.includes("query_explanation"));
assert.ok(schema.required.includes("semantic_provenance"));
assert.ok(schema.$defs.boolean_node.oneOf.length >= 4);
assert.equal(schema.$defs.recommendation_handoff.properties.signals.items.properties.query_truth.const, false);
assert.ok(schema.$defs.preference.required.includes("provenance"));
assert.ok(schema.$defs.conflict.required.includes("provenance"));
assert.ok(schema.$defs.unresolved_term.required.includes("provenance"));
assert.ok(schema.$defs.query_variant.required.includes("provenance"));

assert.equal(fixtures.length, 18, "VM-591 must retain exactly the required 18 focused fixture classes");
assert.equal(new Set(fixtures.map((fixture) => fixture.id)).size, fixtures.length, "fixture IDs must be unique");

for (const fixture of fixtures) {
  validateState(fixture.state, fixture.id);
  validateAuthorityAudit(fixture);
  validateFixtureExpectation(fixture);
}

validateV32Regressions();

validateRoundTrip(fixtures.find((fixture) => fixture.id === "15-plain-operator-plain-roundtrip"), ["plain", "operator", "plain"]);
validateRoundTrip(fixtures.find((fixture) => fixture.id === "16-loom-adapter-roundtrip"), ["loom", "operator", "loom"]);

const authorityBytes = await readFile(new URL(
  "../../docs/research/maze-player-language/calibration/v3.2/authority/Scryfall_Maze_Master_Calibration_V3_2_Propagation_Accepted.xlsx",
  import.meta.url
));
assert.equal(createHash("sha256").update(authorityBytes).digest("hex"), EXPECTED_AUTHORITY_HASH);

for (const relativePath of [
  "../../assets/js/maze/research-init.js",
  "../../assets/js/maze/maze-query-core.js",
  "../../assets/js/maze/research-mode.js",
  "../../assets/js/maze/research-builder.js",
  "../../assets/js/maze/scryfall-grounded-compiler.js"
]) {
  const source = await readFile(new URL(relativePath, import.meta.url), "utf8");
  assert.ok(!source.includes("maze-semantic-state-v1"), `${relativePath} must not wire VM-591 into production runtime`);
}

console.log("Maze semantic-state contract tests passed: 18 authority-audited fixtures, V3.2 regressions, schema ownership/provenance, constructed round trips, runtime boundary, and authority hash.");

function validateState(state, fixtureId) {
  const prefix = `[${fixtureId}]`;
  assert.equal(state.schema_version, "1.0.0", `${prefix} schema version`);
  assert.ok(state.state_id, `${prefix} state ID`);
  assert.ok(["plain", "operator", "loom"].includes(state.source.mode), `${prefix} source mode`);
  assert.ok(["natural_language", "scryfall_syntax", "builder_filters"].includes(state.source.input_kind), `${prefix} input kind`);
  assert.ok(["none", "normalized", "preserved"].includes(state.normalization.status), `${prefix} normalization status`);
  assert.ok(Array.isArray(state.normalization.operations), `${prefix} normalization operations`);
  assert.ok(Array.isArray(state.normalization.authority_refs), `${prefix} normalization authority refs`);
  assert.ok(state.confidence.score >= 0 && state.confidence.score <= 1, `${prefix} translation confidence score`);
  assert.ok(["low", "medium", "high"].includes(state.confidence.tier), `${prefix} translation confidence tier`);
  assert.ok(state.confidence.provenance.length > 0, `${prefix} translation confidence provenance`);
  assert.ok(Array.isArray(state.query_explanation), `${prefix} query explanation`);
  assert.ok(["R0", "R1", "R2", "R3", "R4", "R5", "R6"].includes(state.semantic_provenance.evidence_level), `${prefix} evidence level`);
  assert.ok(Array.isArray(state.semantic_provenance.calibration_rules), `${prefix} calibration rules`);
  assert.ok(Array.isArray(state.semantic_provenance.evidence_refs), `${prefix} evidence refs`);
  assert.ok(["valid", "invalid", "conflict", "unresolved"].includes(state.validation_state), `${prefix} validation state`);
  assert.ok(EXECUTION_MODES.has(state.execution_mode), `${prefix} execution mode`);
  assert.equal(Object.hasOwn(state, "query"), false, `${prefix} semantic state must not become a second executable-query owner`);

  const constraints = uniqueIdMap(state.hard_constraints, `${prefix} hard constraints`);
  const preferences = uniqueIdMap(state.preferences, `${prefix} preferences`);
  const contexts = uniqueIdMap(state.contexts, `${prefix} contexts`);
  const lenses = uniqueIdMap(state.lenses, `${prefix} lenses`);
  const assumptions = uniqueIdMap(state.assumptions, `${prefix} assumptions`);
  const conflicts = uniqueIdMap(state.conflicts, `${prefix} conflicts`);
  const unresolved = uniqueIdMap(state.unresolved_terms, `${prefix} unresolved terms`);
  const variants = uniqueIdMap(state.query_variants, `${prefix} query variants`);
  const diagnostics = uniqueIdMap(state.diagnostics, `${prefix} diagnostics`);

  void assumptions;
  void unresolved;
  void diagnostics;

  for (const item of constraints.values()) {
    assert.ok(item.category && item.field && item.relation, `${prefix} constraint ${item.id} has explicit semantics`);
    assert.ok(["include", "exclude"].includes(item.polarity), `${prefix} constraint ${item.id} polarity`);
    assert.ok(Array.isArray(item.provenance), `${prefix} constraint ${item.id} provenance`);
    if (["printed_color", "color_identity"].includes(item.category)) {
      assert.ok(["equals", "subset", "superset", "contains"].includes(item.relation), `${prefix} color constraint ${item.id} relation`);
    }
    if (item.context_ref) {
      const context = contexts.get(item.context_ref);
      assert.ok(context, `${prefix} constraint ${item.id} context ref`);
      assert.equal(context.applied_to_query, true, `${prefix} applied context must say it changed the query`);
    }
  }

  for (const explanation of state.query_explanation) {
    assert.ok(constraints.has(explanation.semantic_ref) || preferences.has(explanation.semantic_ref), `${prefix} explanation semantic reference`);
    assert.ok(explanation.explanation, `${prefix} explanation text`);
    assert.ok(explanation.provenance.length > 0, `${prefix} explanation provenance`);
  }

  const booleanSummary = { refs: [], operators: [] };
  walkBoolean(state.boolean_expression, booleanSummary, prefix);
  for (const constraintId of booleanSummary.refs) {
    assert.ok(constraints.has(constraintId), `${prefix} Boolean reference ${constraintId} must resolve`);
  }
  assert.deepEqual(
    new Set(booleanSummary.refs),
    new Set(constraints.keys()),
    `${prefix} every hard constraint must participate in the Boolean expression`
  );

  for (const item of preferences.values()) {
    assert.ok(["none", "preferred_variant", "ranking"].includes(item.query_effect), `${prefix} preference ${item.id} query effect`);
    assert.ok(item.provenance.length > 0, `${prefix} preference ${item.id} provenance`);
    if (item.threshold?.inferred) assert.equal(item.threshold.editable, true, `${prefix} inferred threshold ${item.id} must remain editable`);
  }

  for (const context of contexts.values()) {
    assert.equal(typeof context.applied_to_query, "boolean", `${prefix} context ${context.id} application flag`);
    assert.ok(Array.isArray(context.provenance), `${prefix} context ${context.id} provenance`);
    if (context.applied_to_query) assert.ok(context.application_reason, `${prefix} applied context ${context.id} reason`);
  }

  for (const item of conflicts.values()) {
    item.constraint_ids.forEach((constraintId) => assert.ok(constraints.has(constraintId), `${prefix} conflict ${item.id} reference`));
    assert.ok(item.provenance.length > 0, `${prefix} conflict ${item.id} provenance`);
  }


  for (const item of unresolved.values()) {
    assert.ok(item.provenance.length > 0, `${prefix} unresolved term ${item.id} provenance`);
  }

  for (const item of lenses.values()) {
    item.query_variant_ids.forEach((variantId) => assert.ok(variants.has(variantId), `${prefix} lens ${item.id} variant reference`));
    for (const variantId of item.query_variant_ids) {
      const queryVariant = variants.get(variantId);
      if (queryVariant.lens_id) assert.equal(queryVariant.lens_id, item.id, `${prefix} lens ${item.id} owns ${variantId}`);
    }
  }

  for (const item of variants.values()) {
    if (item.executable_candidate) assert.equal(typeof item.query_candidate, "string", `${prefix} executable candidate ${item.id}`);
    assert.ok(["exact_governed_truth", "candidate_retrieval", "alternate_lens", "illustrative_only"].includes(item.authority_class), `${prefix} variant ${item.id} authority class`);
    assert.ok(item.authority_status, `${prefix} variant ${item.id} authority status`);
    assert.ok(["R0", "R1", "R2", "R3", "R4", "R5", "R6"].includes(item.evidence_level), `${prefix} variant ${item.id} evidence level`);
    assert.ok(item.provenance.length > 0, `${prefix} variant ${item.id} provenance`);
    if (item.kind === "conflict") {
      assert.equal(item.query_candidate, null, `${prefix} conflict variant ${item.id} cannot contain a query`);
      assert.equal(item.executable_candidate, false, `${prefix} conflict variant ${item.id} cannot be executable`);
    }
  }

  validateExecutionSelection(state, variants, prefix);

  const blockingDiagnostics = state.diagnostics.filter((item) => item.blocking);
  if (state.execution_selection.status === "blocked") {
    assert.ok(blockingDiagnostics.length > 0, `${prefix} blocked state needs a blocking diagnostic`);
  }
  if (["invalid", "conflict"].includes(state.validation_state)) {
    assert.notEqual(state.execution_selection.status, "ready", `${prefix} invalid/conflict state cannot be ready`);
  }

  const semanticIds = new Set([...constraints.keys(), ...preferences.keys()]);
  for (const token of state.display.operator_tokens) {
    assert.ok(semanticIds.has(token.semantic_ref), `${prefix} operator token ${token.semantic_ref} must reference meaning`);
    assert.equal(token.softness, constraints.has(token.semantic_ref) ? "hard" : "soft", `${prefix} token softness`);
  }

  const handoff = state.recommendation_handoff;
  handoff.hard_constraint_ids.forEach((id) => assert.ok(constraints.has(id), `${prefix} recommendation hard ref ${id}`));
  handoff.preference_ids.forEach((id) => assert.ok(preferences.has(id), `${prefix} recommendation preference ref ${id}`));
  handoff.lens_ids.forEach((id) => assert.ok(lenses.has(id), `${prefix} recommendation lens ref ${id}`));
  if (handoff.candidate_truth_variant_id) assert.ok(variants.has(handoff.candidate_truth_variant_id), `${prefix} recommendation candidate truth`);
  handoff.signals.forEach((signal) => assert.equal(signal.query_truth, false, `${prefix} recommendation signal cannot be query truth`));

  if (state.source.mode === "operator" && state.source.explicit_syntax_preserved) {
    assert.equal(state.display.operator_syntax, state.source.input_value, `${prefix} explicit syntax preservation`);
    assert.equal(state.execution_selection.maze_query_projection, state.source.input_value, `${prefix} executable projection preserves explicit syntax`);
  }
}

function validateExecutionSelection(state, variants, prefix) {
  const selection = state.execution_selection;
  assert.ok(["ready", "blocked", "no_query"].includes(selection.status), `${prefix} execution status`);
  if (selection.status === "ready") {
    const selected = variants.get(selection.selected_variant_id);
    assert.ok(selected, `${prefix} selected variant exists`);
    assert.equal(selected.executable_candidate, true, `${prefix} selected variant is executable candidate`);
    assert.equal(selection.maze_query_projection, selected.query_candidate, `${prefix} Maze projection is selected candidate`);
    assert.ok(!state.diagnostics.some((item) => item.blocking), `${prefix} ready state cannot have blocking diagnostics`);
  } else {
    assert.equal(selection.selected_variant_id, null, `${prefix} non-ready state has no selected variant`);
    assert.equal(selection.maze_query_projection, null, `${prefix} non-ready state has no Maze query projection`);
  }
}

function validateAuthorityAudit(fixture) {
  const { state, authority_audit: audit } = fixture;
  const prefix = `[${fixture.id}]`;
  assert.ok(audit, `${prefix} authority audit`);
  assert.ok(audit.controlling_refs.length > 0, `${prefix} controlling authority`);
  assert.ok(["exact_governed_truth", "candidate_retrieval", "alternate_lens", "illustrative_only"].includes(audit.authority_class), `${prefix} audit class`);
  assert.ok(["R0", "R1", "R2", "R3", "R4", "R5", "R6"].includes(audit.evidence_level), `${prefix} audit evidence level`);
  assert.equal(state.semantic_provenance.evidence_level, audit.evidence_level, `${prefix} state/audit evidence level`);
  if (state.execution_selection.status === "ready") {
    const selected = state.query_variants.find((variant) => variant.id === state.execution_selection.selected_variant_id);
    assert.equal(audit.selected_variant_executable_allowed, true, `${prefix} selected execution is authorized by the fixture audit`);
    assert.notEqual(selected.authority_class, "illustrative_only", `${prefix} illustrative-only query cannot be selected`);
  } else {
    assert.equal(audit.selected_variant_executable_allowed, false, `${prefix} no-query audit disposition`);
  }
}

function validateV32Regressions() {
  const byId = new Map(fixtures.map((fixture) => [fixture.id, fixture]));
  const selectedQuery = (id) => byId.get(id).state.execution_selection.maze_query_projection;

  assert.equal(selectedQuery("05-counterspell-lens-with-preference"), "t:instant o:/counter target.*spell/", "EV-007 counterspell primary regression");
  assert.equal(byId.get("05-counterspell-lens-with-preference").state.query_variants.find((variant) => variant.id === "q-counter-tagger").authority_class, "alternate_lens", "EV-007 Tagger remains secondary");

  const board = byId.get("06-board-wipe-multi-lens").state;
  assert.deepEqual(board.lenses.map((lens) => lens.role), ["tagger_oracle_intersection", "tagger_only_classified", "oracle_only_review"], "CAL-055 / EV-003 three-lane architecture");
  assert.ok(selectedQuery("06-board-wipe-multi-lens").startsWith("otag:board-wipe ("), "CAL-055 core is Tagger ∩ Oracle floor");
  assert.notEqual(selectedQuery("06-board-wipe-multi-lens"), "otag:board-wipe", "bare Tagger is not board-wipe core");

  assert.equal(selectedQuery("07-one-sided-vs-target-opponent"), "(o:\"destroy all creatures target opponent controls\" or o:\"exile all creatures target opponent controls\")", "accepted row-909 target-one-opponent lane");
  assert.equal(byId.get("07-one-sided-vs-target-opponent").state.query_variants.find((variant) => variant.id === "q-target-opponent").authority_status, "Review", "row 909 remains Review");
  assert.equal(byId.get("07-one-sided-vs-target-opponent").state.confidence.score, 0.68, "row 909 confidence remains 0.68");

  const mana = byId.get("08-mana-dork-role-bundle").state;
  assert.deepEqual(mana.lenses.map((lens) => lens.role), ["direct_self", "alternative_self", "land_untap", "grantor_support"], "CAL-056 / EV-004 four roles");
  assert.ok(mana.query_variants.filter((variant) => variant.query_candidate === "t:creature produces:[MANA]").every((variant) => variant.authority_class === "candidate_retrieval"), "produces is broad candidate evidence, not self-production proof");

  const draw = byId.get("09-grindy-black-draw-adjacency").state;
  assert.equal(selectedQuery("09-grindy-black-draw-adjacency"), "id<=b is:permanent otag:card-advantage", "EV-006 candidate architecture");
  assert.match(draw.recommendation_handoff.signals.find((signal) => signal.kind === "adjacency").value, /strong D may outrank weak A\/B/i, "EV-006 ranking boundary");

  const slug = byId.get("10-group-slug-engine-burst").state;
  assert.deepEqual(slug.lenses.map((lens) => lens.role), ["repeatable_candidate", "burst", "action_tax_supplement"], "CAL-057 / EV-005 three retrieval roles");
  assert.ok(slug.recommendation_handoff.signals.find((signal) => signal.kind === "repeatability").value.includes("one_shot_self_event"), "repeatability is post-retrieval classification");

  assert.equal(selectedQuery("12-reanimation-put-return-family"), "(o:put or o:return) o:\"creature card\" o:graveyard o:battlefield", "CAL-022 governed reanimation fallback");
}

function walkBoolean(node, summary, prefix) {
  assert.ok(node && typeof node === "object", `${prefix} Boolean node`);
  if (node.kind === "empty") return;
  if (node.kind === "constraint_ref") {
    summary.refs.push(node.constraint_id);
    return;
  }
  if (node.kind === "not") {
    summary.operators.push("not");
    walkBoolean(node.child, summary, prefix);
    return;
  }
  assert.equal(node.kind, "group", `${prefix} Boolean group kind`);
  assert.ok(["and", "or"].includes(node.operator), `${prefix} Boolean group operator`);
  assert.ok(node.children.length > 0, `${prefix} Boolean group children`);
  summary.operators.push(node.operator);
  node.children.forEach((child) => walkBoolean(child, summary, prefix));
}

function uniqueIdMap(items, label) {
  assert.ok(Array.isArray(items), `${label} array`);
  const map = new Map();
  for (const item of items) {
    assert.ok(item.id, `${label} item ID`);
    assert.ok(!map.has(item.id), `${label} duplicate ${item.id}`);
    map.set(item.id, item);
  }
  return map;
}

function validateFixtureExpectation(fixture) {
  const { state, expect } = fixture;
  if (expect.query) assert.equal(state.execution_selection.maze_query_projection, expect.query, `[${fixture.id}] query`);
  if (expect.colorDomain) assert.equal(state.hard_constraints.find((item) => item.category.includes("color")).category, expect.colorDomain, `[${fixture.id}] color domain`);
  if (expect.colorRelation) assert.equal(state.hard_constraints.find((item) => item.category.includes("color")).relation, expect.colorRelation, `[${fixture.id}] color relation`);
  if (expect.distinctColorDomains) {
    assert.deepEqual(new Set(state.hard_constraints.filter((item) => item.category.includes("color")).map((item) => item.category)), new Set(["printed_color", "color_identity"]));
  }
  if (expect.excludesQueryFragment) assert.ok(!String(state.execution_selection.maze_query_projection).toLowerCase().includes(expect.excludesQueryFragment.toLowerCase()), `[${fixture.id}] excluded query fragment`);
  if (expect.contextDimensions) assert.deepEqual(state.contexts.map((item) => item.dimension), expect.contextDimensions, `[${fixture.id}] context dimensions`);
  if (expect.preferenceId) assert.ok(state.preferences.some((item) => item.id === expect.preferenceId), `[${fixture.id}] preference`);
  if (expect.baseQuery) assert.equal(state.query_variants.find((item) => item.kind === "strict").query_candidate, expect.baseQuery, `[${fixture.id}] strict/base query`);
  if (expect.lensRoles) assert.deepEqual(state.lenses.map((item) => item.role), expect.lensRoles, `[${fixture.id}] lens roles`);
  if (expect.distinctVariantIds) assert.deepEqual(state.query_variants.map((item) => item.id), expect.distinctVariantIds, `[${fixture.id}] variants`);
  if (expect.signalKinds) assert.deepEqual(state.recommendation_handoff.signals.map((item) => item.kind), expect.signalKinds, `[${fixture.id}] signal kinds`);
  if (expect.unresolvedTerms) assert.deepEqual(state.unresolved_terms.map((item) => item.term), expect.unresolvedTerms, `[${fixture.id}] unresolved terms`);
  if (expect.containsBooleanOperator) {
    const summary = { refs: [], operators: [] };
    walkBoolean(state.boolean_expression, summary, `[${fixture.id}]`);
    assert.ok(summary.operators.includes(expect.containsBooleanOperator), `[${fixture.id}] Boolean operator`);
  }
  if (expect.noExecutableQuery) assert.equal(state.execution_selection.maze_query_projection, null, `[${fixture.id}] no executable query`);
  if (expect.conflictId) assert.ok(state.conflicts.some((item) => item.id === expect.conflictId), `[${fixture.id}] conflict`);
  if (expect.exactOperatorSyntax) assert.equal(state.display.operator_syntax, expect.exactOperatorSyntax, `[${fixture.id}] Operator syntax`);
  if (expect.loomColorRelation) assert.deepEqual(state.source.input_value.color_relation, expect.loomColorRelation, `[${fixture.id}] explicit Loom color relation`);
  if (expect.contextId) {
    const context = state.contexts.find((item) => item.id === expect.contextId);
    assert.ok(context, `[${fixture.id}] context`);
    assert.equal(context.applied_to_query, expect.appliedToQuery, `[${fixture.id}] context application`);
  }
  if (expect.diagnosticKind) assert.ok(state.diagnostics.some((item) => item.kind === expect.diagnosticKind), `[${fixture.id}] diagnostic kind`);
}

function validateRoundTrip(fixture, modes) {
  const original = structuredClone(fixture.state);
  let current = original;
  const originalFingerprint = semanticFingerprint(original);
  const originalEqualityProjection = semanticEqualityProjection(original);
  for (const mode of modes.slice(1)) {
    current = reframeForMode(current, mode, original.source.input_value);
    assert.equal(semanticFingerprint(current), originalFingerprint, `[${fixture.id}] semantic meaning changed entering ${mode}`);
    assert.deepEqual(semanticEqualityProjection(current), originalEqualityProjection, `[${fixture.id}] required semantic fields changed entering ${mode}`);
  }
  assert.equal(current.source.mode, modes.at(-1), `[${fixture.id}] final mode`);
  assert.deepEqual(current.unresolved_terms, original.unresolved_terms, `[${fixture.id}] unresolved terms survived`);
  assert.deepEqual(current.preferences, original.preferences, `[${fixture.id}] preferences survived`);
  assert.deepEqual(current.boolean_expression, original.boolean_expression, `[${fixture.id}] Boolean structure survived`);
  assert.deepEqual(colorRelationFingerprint(current), colorRelationFingerprint(original), `[${fixture.id}] explicit color relation survived`);
  if (original.source.mode === "loom") {
    assert.deepEqual(current.source.input_value.color_relation, original.source.input_value.color_relation, `[${fixture.id}] Loom color relation restored explicitly`);
  }
}

function reframeForMode(state, mode, originalInput) {
  const next = structuredClone(state);
  next.source.mode = mode;
  if (mode === "operator") {
    next.source.input_kind = "scryfall_syntax";
    next.source.input_value = next.display.operator_syntax;
    next.source.explicit_syntax_preserved = false;
  } else if (mode === "plain") {
    next.source.input_kind = "natural_language";
    next.source.input_value = next.display.plain_text;
    delete next.source.explicit_syntax_preserved;
  } else {
    next.source.input_kind = "builder_filters";
    next.source.input_value = originalInput;
    delete next.source.explicit_syntax_preserved;
  }
  next.normalization = {
    status: "preserved",
    operations: [`Rendered ${mode} view from shared semantic state`],
    authority_refs: ["VM-591"]
  };
  return next;
}

function semanticFingerprint(state) {
  const {
    state_id: _stateId,
    source: _source,
    normalization: _normalization,
    display: _display,
    ...semanticState
  } = state;
  return JSON.stringify(semanticState);
}

function semanticEqualityProjection(state) {
  return {
    hard_constraints: state.hard_constraints,
    boolean_expression: state.boolean_expression,
    preferences: state.preferences,
    contexts: state.contexts,
    lenses: state.lenses,
    assumptions: state.assumptions,
    conflicts: state.conflicts,
    unresolved_terms: state.unresolved_terms,
    explicit_color_relation: colorRelationFingerprint(state)
  };
}

function colorRelationFingerprint(state) {
  return state.hard_constraints
    .filter((constraint) => ["printed_color", "color_identity"].includes(constraint.category))
    .map((constraint) => ({
      id: constraint.id,
      domain: constraint.category,
      relation: constraint.relation,
      value: constraint.value,
      polarity: constraint.polarity
    }));
}
