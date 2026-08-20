import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildCommanderDossier,
  createArchidektTagCatalog,
} from "../assets/js/archscry/commander-dossier.js";
import {
  VM565_EXISTING_TERM_OVERRIDES,
  VM565_NEW_TERM_TARGETS,
} from "./lib/vm565-player-vocabulary-authority.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(ROOT, "docs", "audits", "vm565-player-vocabulary-education");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "education-audit-ledger.json");
const CHECK = process.argv.includes("--check");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const normalizeNewlines = (value) => String(value).replace(/\r\n/g, "\n");
const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const termMatcher = (label) => new RegExp(`(^|[^a-z0-9])${escapeRegex(label)}(?=$|[^a-z0-9])`, "i");
const targetKey = (surface, field) => `${surface}:${field}`;

const catalog = readJson("data/dossier/discovery-education-catalog.json");
const candidateLedger = readJson("docs/audits/vm565-player-vocabulary-education/candidate-ledger.json");
const vm564 = readJson("docs/audits/vm564-dossier-term-hover-audit/term-audit-ledger.json");
const dossierCatalog = readJson("data/dossier/identity-dossier-content.catalog.json");
const factions = readJson("data/factions.json").factions;
const placementModel = readJson("data/gate-b1-placement-model.json");
const deckTagCatalog = createArchidektTagCatalog(readJson("data/deck-tags_expanded.json"));
const witnesses = new Map(readJson("docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json").rows.map((row) => [row.identity_key, row]));
const dossierByKey = new Map(dossierCatalog.records.map((record) => [record.identity_key, record]));
const identityOrder = vm564.identities.map((identity) => identity.identity_key);
const legacySurfaces = ["start-here", "why-this-fit", "test-the-fit", "what-to-look-for"];
const runtimeLabelMap = new Map(catalog.glossary.flatMap((record) => [record.term, ...(record.aliases || [])]
  .map((label) => [label.toLowerCase(), record.record_id])));
const runtimeLabels = [...runtimeLabelMap.keys()].sort((left, right) => right.length - left.length);
const runtimeMatcher = new RegExp(`\\b(${runtimeLabels.map(escapeRegex).join("|")})\\b`, "gi");

assert.equal(catalog.glossary.length, 65, "VM-565 catalog should contain the 42-term baseline plus 23 curated concepts");
assert.equal(candidateLedger.status, "INTERNALLY_RECONCILED_BEFORE_IMPLEMENTATION");
assert.equal(identityOrder.length, 37);

function yoreResult(witness) {
  return {
    ...witness.result,
    faction: "YORE",
    faction_name: factions.YORE.name,
    result_state: "primary",
    engine_result_state: "insufficient",
    alternative_state: "none",
    top_matches: [{ faction: "YORE", faction_name: factions.YORE.name, score: 0 }],
    adjacent_matches: [],
    alternatives: [],
  };
}

function fieldsFor(identityKey) {
  const content = dossierByKey.get(identityKey);
  const witness = witnesses.get(identityKey);
  assert.ok(content && witness, `missing inputs for ${identityKey}`);
  const built = buildCommanderDossier({
    factions,
    placementModel,
    deckTagCatalog,
    placementResult: {
      ...(identityKey === "YORE" ? yoreResult(witness) : witness.result),
      starter_profile: { budget_band: "mid", experience_level: "returning" },
    },
    targetFactionKey: identityKey,
    starterProfile: { budget_band: "mid", experience_level: "returning" },
  });
  return [
    { surface: "start-here", field: "commander-plan", text: built.commanderLane.copy },
    ...built.commanderLane.details.map((detail) => ({ surface: "start-here", field: detail.label, text: detail.copy })),
    ...built.readingOmens.slice(0, 3).map((omen, index) => ({ surface: "why-this-fit", field: `observation-${index + 1}`, text: omen.copy })),
    { surface: "test-the-fit", field: "positive-self-check", text: content.test_the_fit.positive_self_check },
    { surface: "test-the-fit", field: "tension-failure-mode", text: content.test_the_fit.tension_failure_mode },
    { surface: "test-the-fit", field: "certified-boundary-self-check", text: content.test_the_fit.certified_boundary_self_check },
    { surface: "how-this-plays", field: "role", text: content.how_this_plays.role },
    { surface: "how-this-plays", field: "how-opponents-read-it", text: content.how_this_plays.how_opponents_read_it },
    { surface: "how-this-plays", field: "emotional-pressure", text: content.how_this_plays.emotional_pressure },
    { surface: "how-this-plays", field: "lore-role", text: content.how_this_plays.lore_role },
    { surface: "how-this-plays", field: "mechanical-expression", text: content.how_this_plays.mechanical_expression },
    { surface: "how-this-plays", field: "table-experience", text: content.how_this_plays.table_experience },
    ...content.what_to_look_for.flatMap((item, index) => [
      { surface: "what-to-look-for-title", field: `item-${index + 1}-title`, text: item.title },
      { surface: "what-to-look-for", field: `item-${index + 1}-copy`, text: item.copy },
    ]),
    ...(identityKey === "COLORLESS" ? [
      { surface: "mana-notes", field: "wastes-first", text: "Use Wastes and reliable colorless producers as the floor before adding utility lands." },
      { surface: "mana-notes", field: "rocks-and-sources", text: "Mana rocks help the deck reach expensive colorless spells, but generic costs are not colorless mana." },
      { surface: "mana-notes", field: "color-choice-caution", text: "Command Tower cannot choose colorless, and Reflecting Pool-style effects need another source that can already make colorless mana." },
    ] : []),
  ];
}

function matchingLabels(record, text) {
  return [record.term, ...(record.aliases || [])].filter((label) => termMatcher(label).test(text));
}

function runtimeRecordIdsIn(text) {
  return [...String(text || "").matchAll(runtimeMatcher)].map((match) => runtimeLabelMap.get(match[0].toLowerCase()));
}

function auditIdentity(identityKey) {
  const fields = fieldsFor(identityKey);
  const allocations = [];
  for (const record of catalog.glossary) {
    const policy = record.teaching_policy || null;
    const explicit = (policy?.targets || []).find((target) => target.identity_key === identityKey);
    if (explicit) {
      const field = fields.find((entry) => entry.surface === explicit.surface && entry.field === explicit.field);
      assert.ok(field, `${identityKey} ${record.record_id} target field does not exist`);
      const labels = matchingLabels(record, field.text);
      assert.ok(labels.length, `${identityKey} ${record.record_id} target does not contain a resolvable label`);
      allocations.push({
        identity_key: identityKey,
        record_id: record.record_id,
        term: record.term,
        definition: record.definition,
        surface: explicit.surface,
        field: explicit.field,
        target_key: targetKey(explicit.surface, explicit.field),
        matched_label: labels.sort((a, b) => b.length - a.length)[0],
        allocation_kind: policy.mode === "EXPLICIT_TARGETS" ? "NEW_EXPLICIT_TARGET" : "EXISTING_OVERRIDE",
      });
      continue;
    }
    if (policy?.mode === "EXPLICIT_TARGETS") continue;
    let allocated = null;
    for (const surface of legacySurfaces) {
      const field = fields.find((entry) => entry.surface === surface && matchingLabels(record, entry.text).length);
      if (!field) continue;
      const labels = matchingLabels(record, field.text).sort((a, b) => b.length - a.length);
      allocated = {
        identity_key: identityKey,
        record_id: record.record_id,
        term: record.term,
        definition: record.definition,
        surface,
        field: field.field,
        target_key: targetKey(surface, field.field),
        matched_label: labels[0],
        allocation_kind: "LEGACY_SINGLE_TEACHING",
      };
      break;
    }
    if (allocated) allocations.push(allocated);
  }
  for (const allocation of allocations) {
    const field = fields.find((entry) => entry.surface === allocation.surface && entry.field === allocation.field);
    allocation.rendered = runtimeRecordIdsIn(field.text).includes(allocation.record_id);
  }
  assert.equal(new Set(allocations.filter((row) => row.rendered).map((row) => row.record_id)).size, allocations.filter((row) => row.rendered).length, `${identityKey} duplicates a canonical teaching record`);
  return {
    identity_key: identityKey,
    identity_name: factions[identityKey].name,
    teaching_count: allocations.filter((row) => row.rendered).length,
    new_teaching_count: allocations.filter((row) => row.rendered && row.allocation_kind === "NEW_EXPLICIT_TARGET").length,
    override_count: allocations.filter((row) => row.rendered && row.allocation_kind === "EXISTING_OVERRIDE").length,
    allocations,
  };
}

const identities = identityOrder.map(auditIdentity);
const allocationByIdentityRecord = new Map(identities.flatMap((identity) => identity.allocations.map((row) => [`${identity.identity_key}:${row.record_id}`, row])));
const currentCatalogByTerm = new Map(catalog.glossary.map((record) => [record.term.toLowerCase(), record]));
const candidateNewRecordByTerm = new Map(candidateLedger.proposed_new_concepts.map((record) => [record.term.toLowerCase(), record.record_id]));
const baselineRecordByTerm = new Map(vm564.aggregate_terms.map((record) => [record.term.toLowerCase(), record.record_id]));

const acceptedResolution = candidateLedger.candidate_decisions.filter((row) => row.accepted).map((row) => {
  const recordId = candidateNewRecordByTerm.get(String(row.proposed_term || "").toLowerCase())
    || baselineRecordByTerm.get(String(row.proposed_term || row.existing_canonical_glossary_term || "").toLowerCase());
  assert.ok(recordId, `accepted decision lacks canonical record: ${row.identity_key} ${row.exact_player_facing_text}`);
  const record = catalog.glossary.find((entry) => entry.record_id === recordId);
  assert.ok(record, `accepted decision record missing from catalog: ${recordId}`);
  if (row.proposed_action === "CORRECT_INADEQUATE_DEFINITION") {
    assert.equal(record.definition, row.proposed_definition, `${recordId} definition correction did not resolve`);
  }
  const allocation = allocationByIdentityRecord.get(`${row.identity_key}:${recordId}`);
  assert.ok(allocation?.rendered, `accepted education target unresolved: ${row.identity_key} ${recordId}`);
  if (row.proposed_teaching_location) assert.equal(allocation.target_key, row.proposed_teaching_location, `${row.identity_key} ${recordId} resolved at the wrong teaching location`);
  return { identity_key: row.identity_key, record_id: recordId, target_key: allocation.target_key, status: "RESOLVED" };
});

const textOnlySurfaces = new Set(["what-to-look-for-title", "how-this-plays", "mana-notes"]);
const textOnlyAllocations = identities.flatMap((identity) => identity.allocations).filter((row) => row.rendered && textOnlySurfaces.has(row.surface));
assert(textOnlyAllocations.every((row) => row.allocation_kind !== "LEGACY_SINGLE_TEACHING"), "text-only surfaces must be exact-target only");
assert.equal(new Set(VM565_NEW_TERM_TARGETS.map((row) => `${row.identity_key}:${row.record_id}`)).size, VM565_NEW_TERM_TARGETS.length);
assert.equal(new Set(VM565_EXISTING_TERM_OVERRIDES.map((row) => `${row.identity_key}:${row.record_id}`)).size, VM565_EXISTING_TERM_OVERRIDES.length);
assert.equal(acceptedResolution.length, candidateLedger.summary.accepted_candidate_decisions);

const unusedBaseline = candidateLedger.unused_glossary_decisions.map((decision) => {
  const record = catalog.glossary.find((entry) => entry.record_id === decision.record_id);
  assert.ok(record, `dormant baseline record was removed: ${decision.record_id}`);
  return { ...decision, still_present: true };
});

const allAllocations = identities.flatMap((identity) => identity.allocations).filter((row) => row.rendered);
const suppressedLegacyAllocations = identities.flatMap((identity) => identity.allocations).filter((row) => !row.rendered);
const ledger = {
  schema_version: "vm565-education-audit-v1",
  generated_on: "2026-08-16",
  status: "DETERMINISTIC_AUDIT_PASS",
  baseline: {
    vm564_glossary_records: vm564.scope.glossary_records,
    vm564_distinct_identity_term_assignments: vm564.summary.total_distinct_identity_term_assignments,
    vm564_hover_identity_term_assignments: vm564.summary.total_hover_identity_term_assignments,
  },
  summary: {
    identities: identities.length,
    glossary_records: catalog.glossary.length,
    new_canonical_definitions: candidateLedger.summary.proposed_new_canonical_definitions,
    aliases_added: candidateLedger.summary.proposed_aliases,
    accepted_candidate_decisions: candidateLedger.summary.accepted_candidate_decisions,
    rejected_candidate_decisions: candidateLedger.summary.rejected_candidate_decisions,
    exact_target_entries: VM565_NEW_TERM_TARGETS.length + VM565_EXISTING_TERM_OVERRIDES.length,
    new_term_target_entries: VM565_NEW_TERM_TARGETS.length,
    existing_term_override_entries: VM565_EXISTING_TERM_OVERRIDES.length,
    text_only_exact_targets: textOnlyAllocations.length,
    total_teaching_allocations: allAllocations.length,
    suppressed_overlapping_legacy_allocations: suppressedLegacyAllocations.length,
    unresolved_accepted_targets: 0,
    duplicate_canonical_teachings: 0,
    blanket_text_only_surface_allocations: 0,
    definition_corrections: 1,
  },
  accepted_resolution: acceptedResolution,
  unused_baseline_glossary: unusedBaseline,
  identities,
};

const output = `${JSON.stringify(ledger, null, 2)}\n`;
if (CHECK) {
  assert.equal(normalizeNewlines(fs.readFileSync(OUTPUT_PATH, "utf8")), output, "stale VM-565 education audit ledger");
} else {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, output);
}
console.log(JSON.stringify({ status: "PASS", ...ledger.summary }, null, 2));
