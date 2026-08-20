import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildCommanderDossier,
  createArchidektTagCatalog,
} from "../assets/js/archscry/commander-dossier.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(ROOT, "docs", "audits", "vm564-dossier-term-hover-audit");
const LEDGER_PATH = path.join(OUTPUT_DIR, "term-audit-ledger.json");
const REPORT_PATH = path.join(OUTPUT_DIR, "all-37-term-hover-report.md");
const CHECK = process.argv.includes("--check");
const REPORT_FROM_LEDGER = process.argv.includes("--report-from-ledger");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function sha256File(relativePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, relativePath))).digest("hex");
}

function normalizeNewlines(value) {
  return String(value).replace(/\r\n/g, "\n");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function runtimeBoundaryMatcher(label) {
  return new RegExp(`(^|[^a-z0-9])${escapeRegex(label)}(?=$|[^a-z0-9])`, "i");
}

function markdownCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

if (REPORT_FROM_LEDGER) {
  const historicalLedger = JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8"));
  const reportOutput = buildReport(historicalLedger);
  if (CHECK) {
    assert.equal(normalizeNewlines(fs.readFileSync(REPORT_PATH, "utf8")), reportOutput, "stale VM-564 historical report");
  } else {
    fs.writeFileSync(REPORT_PATH, reportOutput);
  }
  console.log(JSON.stringify({ status: "PASS", mode: "report-from-ledger", ...historicalLedger.summary }, null, 2));
  process.exit(0);
}

const factionsArtifact = readJson("data/factions.json");
const factions = factionsArtifact.factions;
const placementModel = readJson("data/gate-b1-placement-model.json");
const deckTagCatalog = createArchidektTagCatalog(readJson("data/deck-tags_expanded.json"));
const identityLayers = readJson("data/identity-layers.json");
const dossierCatalog = readJson("data/dossier/identity-dossier-content.catalog.json");
const educationCatalog = readJson("data/dossier/discovery-education-catalog.json");
const witnessArtifact = readJson("docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json");
const rendererSource = fs.readFileSync(path.join(ROOT, "assets/js/archscry/index.js"), "utf8");

assert.equal(educationCatalog.glossary.length, 42, "expected the current 42-term glossary baseline");
assert.equal(dossierCatalog.records.length, 37, "expected 37 identity dossier records");
assert.equal(witnessArtifact.rows.length, 37, "expected 37 current-engine witness rows");
assert.match(rendererSource, /const EDUCATION_SURFACE_PRIORITY = Object\.freeze\(\[\s*"start-here",\s*"why-this-fit",\s*"test-the-fit",\s*"what-to-look-for",\s*\]\);/);
assert.match(rendererSource, /renderEducationalText\(commanderLane\.copy, "start-here"\)/);
assert.match(rendererSource, /renderEducationalText\(observation\.copy, "why-this-fit"\)/);
assert.match(rendererSource, /buildIdentityStoryCard\([\s\S]+educationBlock = "test-the-fit"/);
assert.match(rendererSource, /renderEducationalText\(item\.desc, "what-to-look-for"\)/);

const dossierByIdentity = new Map(dossierCatalog.records.map((record) => [record.identity_key, record]));
const witnessByIdentity = new Map(witnessArtifact.rows.map((row) => [row.identity_key, row]));
const identityOrder = Object.entries(identityLayers.expressions)
  .filter(([, record]) => record?.active !== false)
  .sort((left, right) => Number(left[1].preview_order) - Number(right[1].preview_order))
  .map(([identityKey]) => identityKey);

assert.equal(identityOrder.length, 37, "expected 37 active identity registry entries");
assert.deepEqual(new Set(identityOrder), new Set(Object.keys(factions)), "identity registry and faction display keys must agree");

const termHelpEntries = educationCatalog.glossary.flatMap((record) => [record.term, ...(record.aliases || [])]
  .map((label) => ({
    label,
    labelLower: label.toLowerCase(),
    recordId: record.record_id,
    term: record.term,
    definition: record.definition,
  })));
const termHelpByLabel = new Map(termHelpEntries.map((entry) => [entry.labelLower, entry]));
const renderLabels = unique(termHelpEntries.map((entry) => entry.label))
  .sort((left, right) => right.length - left.length);
const renderMatcher = new RegExp(`\\b(${renderLabels.map(escapeRegex).join("|")})\\b`, "gi");
const educationSurfacePriority = ["start-here", "why-this-fit", "test-the-fit", "what-to-look-for"];

function matchTerms(text) {
  const value = String(text || "");
  return [...value.matchAll(renderMatcher)].map((match) => {
    const help = termHelpByLabel.get(match[0].toLowerCase());
    assert.ok(help, `unresolved glossary match ${match[0]}`);
    return {
      record_id: help.recordId,
      canonical_term: help.term,
      matched_text: match[0],
      definition: help.definition,
      index: match.index,
    };
  });
}

function allocateTerms(fieldsBySurface) {
  const allocation = new Map();
  for (const surface of educationSurfacePriority) {
    const copy = (fieldsBySurface.get(surface) || []).map((field) => field.text).filter(Boolean).join(" ");
    if (!copy) continue;
    for (const help of termHelpEntries) {
      if (allocation.has(help.recordId)) continue;
      if (runtimeBoundaryMatcher(help.label).test(copy)) allocation.set(help.recordId, surface);
    }
  }
  return allocation;
}

function possibleDirectionLabels(commanderLane) {
  const copy = commanderLane?.details?.find((detail) => detail.label === "Possible directions")?.copy || "";
  const match = copy.match(/^Explore (.+?)\. Compare these lanes/i);
  if (!match) return [];
  let cursor = match.index + match[0].indexOf(match[1]);
  return match[1].split(/,\s*/).map((rawLabel) => {
    const label = rawLabel.trim();
    const start = copy.indexOf(label, cursor);
    cursor = start + label.length;
    return { label, start, end: start + label.length };
  }).filter((entry) => entry.label);
}

function strategyLabelRecord(label, sourceSurface, occurrences = [], span = null) {
  const exact = termHelpByLabel.get(String(label).toLowerCase()) || null;
  const contained = unique(matchTerms(label).map((match) => match.canonical_term));
  const currentHoverTerms = sourceSurface === "start-here-possible-directions" && span
    ? unique(occurrences.filter((occurrence) => (
        occurrence.surface === "start-here"
        && occurrence.field === "Possible directions"
        && occurrence.index >= span.start
        && occurrence.index < span.end
        && occurrence.hover_decorated_here
      )).map((occurrence) => occurrence.canonical_term))
    : [];
  return {
    label,
    source_surface: sourceSurface,
    whole_phrase_glossary_term: exact?.term || null,
    whole_phrase_definition: exact?.definition || null,
    contained_glossary_terms: contained,
    current_hover_available_on_label: currentHoverTerms.length > 0,
    current_hover_terms_on_label: currentHoverTerms,
  };
}

function buildSyntheticYoreResult(witness, faction) {
  return {
    ...witness.result,
    faction: "YORE",
    faction_name: faction.name,
    institution_type: faction.institution_type,
    world: faction.world,
    identity: faction.identity,
    result_state: "primary",
    engine_result_state: "insufficient",
    alternative_state: "none",
    top_matches: [{ faction: "YORE", faction_name: faction.name, identity: faction.identity, score: 0 }],
    adjacent_matches: [],
    alternatives: [],
    decree: "Static audit fixture only; Yore remains intentionally bounded in the current placement engine.",
  };
}

function field(surface, fieldName, text, hoverEligible = false) {
  return { surface, field: fieldName, text: String(text || ""), hover_eligible: hoverEligible };
}

function auditIdentity(identityKey) {
  const faction = factions[identityKey];
  const content = dossierByIdentity.get(identityKey);
  const witness = witnessByIdentity.get(identityKey);
  assert.ok(faction && content && witness, `missing audit input for ${identityKey}`);

  const isBoundedYore = identityKey === "YORE";
  const placementResult = isBoundedYore ? buildSyntheticYoreResult(witness, faction) : witness.result;
  const dossier = buildCommanderDossier({
    factions,
    placementModel,
    deckTagCatalog,
    placementResult: {
      ...placementResult,
      starter_profile: { budget_band: "mid", experience_level: "returning" },
    },
    targetFactionKey: identityKey,
    starterProfile: { budget_band: "mid", experience_level: "returning" },
  });

  const fields = [
    field("start-here", "commander-plan", dossier.commanderLane.copy, true),
    ...dossier.commanderLane.details.map((detail) => field("start-here", detail.label, detail.copy, true)),
    ...(!isBoundedYore ? dossier.readingOmens.slice(0, 3).map((omen, index) =>
      field("why-this-fit", `observation-${index + 1}`, omen.copy, true)) : []),
    field("test-the-fit", "positive-self-check", content.test_the_fit.positive_self_check, true),
    field("test-the-fit", "tension-failure-mode", content.test_the_fit.tension_failure_mode, true),
    field("test-the-fit", "certified-boundary-self-check", content.test_the_fit.certified_boundary_self_check, true),
    field("how-this-plays", "role", content.how_this_plays.role),
    field("how-this-plays", "how-opponents-read-it", content.how_this_plays.how_opponents_read_it),
    field("how-this-plays", "emotional-pressure", content.how_this_plays.emotional_pressure),
    field("how-this-plays", "lore-role", content.how_this_plays.lore_role),
    field("how-this-plays", "mechanical-expression", content.how_this_plays.mechanical_expression),
    field("how-this-plays", "table-experience", content.how_this_plays.table_experience),
    ...content.what_to_look_for.flatMap((item, index) => [
      field("what-to-look-for-title", `item-${index + 1}-title`, item.title),
      field("what-to-look-for", `item-${index + 1}-copy`, item.copy, true),
    ]),
  ];

  if (identityKey === "COLORLESS") {
    fields.push(
      field("mana-notes", "wastes-first", "Use Wastes and reliable colorless producers as the floor before adding utility lands."),
      field("mana-notes", "rocks-and-sources", "Mana rocks help the deck reach expensive colorless spells, but generic costs are not colorless mana."),
      field("mana-notes", "color-choice-caution", "Command Tower cannot choose colorless, and Reflecting Pool-style effects need another source that can already make colorless mana."),
    );
  }

  const fieldsByEducationSurface = new Map(educationSurfacePriority.map((surface) => [
    surface,
    fields.filter((entry) => entry.surface === surface && entry.hover_eligible),
  ]));
  const allocation = allocateTerms(fieldsByEducationSurface);
  const renderedHoverRecords = new Set();
  const occurrences = [];

  for (const entry of fields) {
    for (const match of matchTerms(entry.text)) {
      const allocatedSurface = allocation.get(match.record_id) || null;
      const hoverDecorated = entry.hover_eligible
        && allocatedSurface === entry.surface
        && !renderedHoverRecords.has(match.record_id);
      if (hoverDecorated) renderedHoverRecords.add(match.record_id);
      occurrences.push({
        surface: entry.surface,
        field: entry.field,
        canonical_term: match.canonical_term,
        record_id: match.record_id,
        matched_text: match.matched_text,
        hover_eligible_surface: entry.hover_eligible,
        allocated_hover_surface: allocatedSurface,
        hover_decorated_here: hoverDecorated,
        index: match.index,
      });
    }
  }

  const termIds = unique(occurrences.map((occurrence) => occurrence.record_id));
  const terms = termIds.map((recordId) => {
    const glossary = educationCatalog.glossary.find((record) => record.record_id === recordId);
    const termOccurrences = occurrences.filter((occurrence) => occurrence.record_id === recordId);
    return {
      record_id: recordId,
      term: glossary.term,
      definition: glossary.definition,
      matched_forms: unique(termOccurrences.map((occurrence) => occurrence.matched_text)),
      surfaces: unique(termOccurrences.map((occurrence) => occurrence.surface)),
      occurrence_count: termOccurrences.length,
      hover_available: termOccurrences.some((occurrence) => occurrence.hover_decorated_here),
      hover_surface: termOccurrences.find((occurrence) => occurrence.hover_decorated_here)?.surface || null,
      text_only_surfaces: unique(termOccurrences.filter((occurrence) => !occurrence.hover_decorated_here).map((occurrence) => occurrence.surface)),
    };
  }).sort((left, right) => left.term.localeCompare(right.term));

  const strategyLabels = [
    ...possibleDirectionLabels(dossier.commanderLane).map(({ label, start, end }) =>
      strategyLabelRecord(label, "start-here-possible-directions", occurrences, { start, end })),
    ...content.what_to_look_for.map((item) => strategyLabelRecord(item.title, "what-to-look-for-title", occurrences)),
  ];

  return {
    identity_key: identityKey,
    identity_name: faction.name,
    placement_contract: isBoundedYore ? "INTENTIONAL_BOUNDED_STATIC_CONTENT_AUDIT" : witness.expected_public_contract,
    distinct_glossary_term_count: terms.length,
    hover_term_count: terms.filter((term) => term.hover_available).length,
    text_only_term_count: terms.filter((term) => !term.hover_available).length,
    strategy_label_count: strategyLabels.length,
    terms,
    strategy_labels: strategyLabels,
    occurrences,
  };
}

const identities = identityOrder.map(auditIdentity);
assert.equal(identities.length, 37);
assert.equal(new Set(identities.map((identity) => identity.identity_key)).size, 37);

const aggregateTerms = educationCatalog.glossary.map((glossary) => {
  const usedBy = identities.filter((identity) => identity.terms.some((term) => term.record_id === glossary.record_id));
  const hoverBy = identities.filter((identity) => identity.terms.some((term) => term.record_id === glossary.record_id && term.hover_available));
  const occurrenceCount = identities.reduce((sum, identity) => sum + identity.occurrences.filter((row) => row.record_id === glossary.record_id).length, 0);
  return {
    record_id: glossary.record_id,
    term: glossary.term,
    definition: glossary.definition,
    identity_count: usedBy.length,
    hover_identity_count: hoverBy.length,
    occurrence_count: occurrenceCount,
    identity_keys: usedBy.map((identity) => identity.identity_key),
  };
}).sort((left, right) => right.identity_count - left.identity_count || left.term.localeCompare(right.term));

const allStrategyLabels = identities.flatMap((identity) => identity.strategy_labels.map((label) => ({
  identity_key: identity.identity_key,
  identity_name: identity.identity_name,
  ...label,
})));
const uniqueStrategyLabels = [...new Map(allStrategyLabels.map((label) => [`${label.source_surface}\u0000${label.label}`, label])).values()];
const unmatchedWholePhraseLabels = allStrategyLabels.filter((label) => !label.whole_phrase_glossary_term);
const strategyLabelsWithCurrentHover = allStrategyLabels.filter((label) => label.current_hover_available_on_label);

const ledger = {
  schema_version: "vm564-dossier-term-hover-audit-v1",
  generated_on: "2026-08-16",
  authority_note: "Documentation-only audit of current rendered-copy and glossary contracts. Generated/runtime display data is an audit subject, not semantic authority.",
  scope: {
    identities: 37,
    glossary_records: educationCatalog.glossary.length,
    hover_enabled_surfaces: educationSurfacePriority,
    supporting_text_only_surfaces: ["how-this-plays", "what-to-look-for-title", "mana-notes"],
    excluded: ["global navigation", "provider names", "card names", "generic button labels", "Maze query syntax", "Sound/Play card prose"],
    allocation_contract: "At most one hover decoration per canonical glossary record per page, assigned by start-here, why-this-fit, test-the-fit, then what-to-look-for priority.",
  },
  source_inputs_sha256: Object.fromEntries([
    "assets/js/archscry/index.js",
    "assets/js/archscry/commander-dossier.js",
    "data/factions.json",
    "data/gate-b1-placement-model.json",
    "data/deck-tags_expanded.json",
    "data/identity-layers.json",
    "data/dossier/identity-dossier-content.catalog.json",
    "data/dossier/discovery-education-catalog.json",
    "docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json",
  ].map((relativePath) => [relativePath, sha256File(relativePath)])),
  summary: {
    identities: identities.length,
    glossary_records: educationCatalog.glossary.length,
    glossary_terms_used: aggregateTerms.filter((term) => term.identity_count > 0).length,
    glossary_terms_unused: aggregateTerms.filter((term) => term.identity_count === 0).length,
    total_distinct_identity_term_assignments: identities.reduce((sum, identity) => sum + identity.distinct_glossary_term_count, 0),
    total_hover_identity_term_assignments: identities.reduce((sum, identity) => sum + identity.hover_term_count, 0),
    strategy_label_occurrences: allStrategyLabels.length,
    unique_strategy_labels_by_surface: uniqueStrategyLabels.length,
    strategy_labels_without_whole_phrase_definition: unmatchedWholePhraseLabels.length,
    strategy_label_occurrences_with_current_hover: strategyLabelsWithCurrentHover.length,
  },
  aggregate_terms: aggregateTerms,
  identities,
};

function buildReport(reportLedger = ledger) {
  const reportIdentities = reportLedger.identities;
  const reportAggregateTerms = reportLedger.aggregate_terms;
  const lines = [];
  lines.push("# All-37 Dossier Term And Hover Audit", "");
  lines.push("## Executive Summary", "");
  lines.push(`- Audited **${reportLedger.summary.identities} identities** against the current **${reportLedger.summary.glossary_records}-term** approved glossary.`);
  lines.push(`- Found **${reportLedger.summary.glossary_terms_used} glossary terms in use** and **${reportLedger.summary.glossary_terms_unused} with zero matches** in the scoped dossier vocabulary surfaces.`);
  lines.push(`- Across all identities there are **${reportLedger.summary.total_distinct_identity_term_assignments} distinct identity/term assignments**, of which **${reportLedger.summary.total_hover_identity_term_assignments} receive an actual current hover/focus/tap decoration**.`);
  lines.push(`- Audited **${reportLedger.summary.strategy_label_occurrences} strategy-label occurrences** from Possible directions and What to Look For. **${reportLedger.summary.strategy_labels_without_whole_phrase_definition} occurrences do not have a whole-phrase glossary definition**; some still contain a defined subterm.`);
  lines.push(`- Only **${reportLedger.summary.strategy_label_occurrences_with_current_hover} strategy-label occurrences are themselves carrying the current one-per-term hover target**. A defined term can be plain text at a later occurrence because its tooltip was allocated earlier on the page.`);
  lines.push("- The primary number beside each identity below is its count of distinct glossary-backed terms across the audited dossier vocabulary surfaces. The hover count is smaller when a term appears only in a non-decorated title or supporting section.", "");
  lines.push("## Scope And Counting Rules", "");
  lines.push("- Hover-enabled runtime surfaces: Start Here, Why This Fit, Test the Fit, and What to Look For descriptions.");
  lines.push("- Supporting text-only audit surfaces: How This Plays, What to Look For titles, and the Colorless mana primer.");
  lines.push("- Runtime matching is case-insensitive, alias-aware, longest-label-first, and boundary-limited. For example, `taxes` maps to **Taxation**.");
  lines.push("- Runtime decorates each canonical term at most once per page. Priority is Start Here, then Why This Fit, Test the Fit, and What to Look For.");
  lines.push("- Longer labels are not assigned invented meanings. `Protective Tokens` is reported as a strategy label containing the defined subterm **Tokens**; the whole phrase currently has no glossary record.");
  lines.push("- Yore is included as a static-content audit because its current placement witness is intentionally bounded and does not render a named Yore dossier.", "");
  lines.push("## Per-Identity Summary", "");
  lines.push("| Identity | Distinct terms | Actual hover terms | Text-only terms | Strategy labels |", "|---|---:|---:|---:|---:|");
  for (const identity of reportIdentities) {
    lines.push(`| ${markdownCell(identity.identity_name)} (${identity.identity_key}) | ${identity.distinct_glossary_term_count} | ${identity.hover_term_count} | ${identity.text_only_term_count} | ${identity.strategy_label_count} |`);
  }
  lines.push("", "## Identity Detail", "");
  for (const identity of reportIdentities) {
    lines.push(`### ${identity.identity_name} (${identity.identity_key}) — ${identity.distinct_glossary_term_count} terms`, "");
    lines.push(`Current hover definitions: **${identity.hover_term_count}**. Text-only glossary matches: **${identity.text_only_term_count}**. Strategy labels: **${identity.strategy_label_count}**.`);
    if (identity.identity_key === "YORE") lines.push("Yore note: static dossier content only; the current placement engine intentionally keeps its certified witness in a bounded unnamed state.");
    lines.push("", "| Term | Matched text | Surfaces | Hover now? | Current meaning |", "|---|---|---|---|---|");
    for (const term of identity.terms) {
      lines.push(`| ${markdownCell(term.term)} | ${markdownCell(term.matched_forms.join(", "))} | ${markdownCell(term.surfaces.join(", "))} | ${term.hover_available ? `Yes — ${term.hover_surface}` : "No — text only"} | ${markdownCell(term.definition)} |`);
    }
    if (!identity.terms.length) lines.push("| None | — | — | — | — |");
    lines.push("", "Strategy labels:", "");
    for (const label of identity.strategy_labels) {
      const meaning = label.whole_phrase_glossary_term
        ? `whole phrase maps to **${label.whole_phrase_glossary_term}** — ${label.whole_phrase_definition.replace(/[.]$/, "")}`
        : label.contained_glossary_terms.length
          ? `no whole-phrase definition; contains ${label.contained_glossary_terms.map((term) => `**${term}**`).join(", ")}`
          : "no whole-phrase or contained glossary definition";
      const hover = label.current_hover_available_on_label
        ? ` Hover on this label now: **yes**, for ${label.current_hover_terms_on_label.join(", ")}.`
        : " Hover on this label now: **no**.";
      lines.push(`- **${label.label}** (${label.source_surface}): ${meaning}.${hover}`);
    }
    lines.push("");
  }

  lines.push("## Aggregate Glossary Coverage", "");
  lines.push("| Term | Identities using it | Identities with hover | Occurrences | Current meaning |", "|---|---:|---:|---:|---|");
  for (const term of reportAggregateTerms) {
    lines.push(`| ${markdownCell(term.term)} | ${term.identity_count} | ${term.hover_identity_count} | ${term.occurrence_count} | ${markdownCell(term.definition)} |`);
  }
  lines.push("", "## Findings", "");
  lines.push("1. A strategy label and a glossary term are not the same contract. Most identity-specific labels are longer editorial phrases, while the hover system generally teaches a contained canonical term.");
  lines.push("2. Titles in What to Look For are not hover-enabled; only their descriptions pass through the education renderer. A title can therefore visibly contain a glossary term while receiving no tooltip itself.");
  lines.push("3. How This Plays is a frequent source of Commander vocabulary but is text-only under the current renderer. The glossary catalog may define a term used there without exposing that definition at that occurrence.");
  lines.push("4. Start Here usually wins the one-decoration allocation when the same term repeats later. Later sections retain readable text but do not receive a second hover target.");
  lines.push("5. `Midrange` is also used elsewhere in the dossier as a land-upgrade lane label, a separate budget meaning from the glossary's strategy definition. That generic mana-panel label is excluded from the identity term count to avoid presenting two meanings as one.");
  lines.push("6. This audit reports current behavior only. Adding whole-phrase definitions, enabling title hovers, or expanding education surfaces would be a separate product/content decision.", "");
  lines.push("## Reproduction", "", "```powershell", "node scripts/build-vm564-dossier-term-audit.mjs --check", "```", "");
  return `${lines.join("\n").trimEnd()}\n`;
}

const ledgerOutput = `${JSON.stringify(ledger, null, 2)}\n`;
const reportOutput = buildReport();

if (CHECK) {
  assert.equal(normalizeNewlines(fs.readFileSync(LEDGER_PATH, "utf8")), ledgerOutput, "stale VM-564 term ledger");
  assert.equal(normalizeNewlines(fs.readFileSync(REPORT_PATH, "utf8")), reportOutput, "stale VM-564 term report");
} else {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(LEDGER_PATH, ledgerOutput);
  fs.writeFileSync(REPORT_PATH, reportOutput);
}

console.log(JSON.stringify({ status: "PASS", ...ledger.summary }, null, 2));
