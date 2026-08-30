import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const argValue = (name) => process.argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1) || "";
const CURRENT_BASELINE_SHA = argValue("--baseline") || "dc680a0de967ff041a4f0f5861544abc75fb71ec";
const RENDERED_EVIDENCE_BASELINE_SHA = argValue("--evidence-baseline") || CURRENT_BASELINE_SHA;
const EXPECTED_DOSSIER_OWNER_DIFF = argValue("--expected-dossier-owner-diff")
  .split(",")
  .map((value) => value.trim().replaceAll("\\", "/"))
  .filter(Boolean)
  .sort();
const EXPECTED_IDENTITIES = 37;
const FRESH_CORPUS = process.argv.includes("--fresh-corpus");
const CORPUS_FILE = path.join(ROOT, argValue("--corpus") || "docs/audits/sirf-all-37-checkpoint-2026-08-30/dossier/dossier-review-current-state.json");
const OUTPUT_FILE = path.join(ROOT, "docs", "research", "placement-language-trust-audit.json");
const DOSSIER_OWNER_PATHS = [
  "archscry",
  "assets/css/archscry.css",
  "assets/js/archscry",
  "data/dossier",
  "data/factions.json",
  "data/identity-layers.json",
  "data/placement-model.json",
  "data/precons",
  "data/taxonomy/vox-mana-precon-themes.json",
];
const HEDGE_PATTERNS = ["may", "can", "could", "often", "tends to", "in some cases", "at times", "generally", "usually", "sometimes"];
const TRANSITION_PATTERNS = ["in practice", "at its core", "ultimately", "this means", "for players who", "one way to", "start here", "this may fit if", "watch for this tension", "this is less likely to fit when", "opponents feel the deck", "pressure through"];
const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "because", "been", "but", "by", "can", "deck", "does", "for", "from", "has", "have", "if", "in", "into", "is", "it", "its", "may", "of", "on", "one", "or", "that", "the", "their", "them", "then", "there", "these", "they", "this", "through", "to", "under", "way", "when", "where", "which", "while", "with", "without", "you", "your",
]);

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function git(...args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();
}

function slash(value) {
  return String(value || "").replaceAll("\\", "/");
}

function cleanText(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

function wordCount(value) {
  return (String(value || "").match(/[\p{L}\p{N}][\p{L}\p{N}'’/-]*/gu) || []).length;
}

function isLikelyProse(value, excluded) {
  const text = cleanText(value);
  if (!text || excluded.has(text.toLowerCase())) return false;
  if (/^(ART:|https?:|View |Main commander:|Colors:|Themes:|Mechanics:|Why it appears:)/i.test(text)) return false;
  if (/^[A-Z0-9 &/—'’-]+$/.test(text)) return false;
  if (wordCount(text) < 7) return false;
  if (text.length < 45 && !/[.!?][”']?$/.test(text)) return false;
  return true;
}

function sentenceSplit(value) {
  return cleanText(value)
    .replace(/([.!?][”']?)(?=\s+[A-Z0-9“"']|$)/g, "$1\n")
    .split(/\n+/)
    .map(cleanText)
    .filter((sentence) => wordCount(sentence) >= 5);
}

function normalizeBase(value) {
  return cleanText(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[^\p{L}\p{N}'<>]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function identityNormalizer(identities) {
  const tokens = identities
    .flatMap((identity) => [identity.identity_name, identity.identity_key])
    .map((value) => String(value || "").trim())
    .filter((value) => value.length > 1)
    .sort((left, right) => right.length - left.length)
    .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const expression = new RegExp(`\\b(?:${tokens.join("|")})\\b`, "giu");
  return (value) => normalizeBase(value).replace(expression, "<identity>");
}

function extractUnits(record) {
  const excluded = new Set([
    ...(record.visible_headings || []),
    ...(record.panels || []).flatMap((panel) => panel.labels || []),
    ...(record.cards || []).map((card) => card.name),
    ...(record.interactive_segments || []).flatMap((segment) => [segment.label]),
  ].map((value) => cleanText(value).toLowerCase()).filter(Boolean));
  const units = [];
  const seen = new Set();
  const add = (section, role, text, location) => {
    const value = cleanText(text);
    if (!isLikelyProse(value, excluded)) return;
    const key = `${section}|${value}`;
    if (seen.has(key)) return;
    seen.add(key);
    units.push({
      unit_id: `${record.identity_key}-${String(units.length + 1).padStart(3, "0")}`,
      identity_key: record.identity_key,
      identity_name: record.identity_name,
      expression_type: record.expression_type,
      section,
      role,
      location,
      text: value,
      word_count: wordCount(value),
    });
  };

  add("hero", "identity_tagline", record.hero?.tagline, "hero.tagline");
  add("hero", "identity_thesis", record.hero?.thesis, "hero.thesis");
  add("hero", "identity_lore_summary", record.hero?.lore_summary, "hero.lore_summary");
  for (const panel of record.panels || []) {
    for (const [lineIndex, line] of cleanText(panel.text).split("\n").entries()) {
      add(panel.id, "rendered_panel_prose", line, `panels.${panel.id}.line.${lineIndex + 1}`);
    }
  }
  for (const segment of record.interactive_segments || []) {
    const section = segment.key?.split(":")[0] || "interactive-segment";
    for (const [lineIndex, line] of cleanText(segment.text).split("\n").entries()) {
      add(section, "rendered_interactive_prose", line, `interactive_segments.${segment.key}.line.${lineIndex + 1}`);
    }
  }
  return units;
}

function countPhrases(sentences, patterns) {
  return patterns.map((pattern) => {
    const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    const occurrences = [];
    for (const sentence of sentences) {
      const matches = sentence.text.match(regex) || [];
      if (matches.length) occurrences.push({ identity_key: sentence.identity_key, section: sentence.section, sentence: sentence.text, count: matches.length });
    }
    return {
      pattern,
      occurrence_count: occurrences.reduce((sum, row) => sum + row.count, 0),
      identity_count: new Set(occurrences.map((row) => row.identity_key)).size,
      examples: occurrences.slice(0, 5),
    };
  }).sort((left, right) => right.occurrence_count - left.occurrence_count || left.pattern.localeCompare(right.pattern));
}

function groupDuplicates(sentences, keyName) {
  const grouped = new Map();
  for (const sentence of sentences) {
    const key = sentence[keyName];
    if (!key) continue;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(sentence);
  }
  return [...grouped.entries()]
    .map(([normalized, occurrences]) => ({
      normalized,
      occurrence_count: occurrences.length,
      identity_count: new Set(occurrences.map((row) => row.identity_key)).size,
      section_count: new Set(occurrences.map((row) => row.section)).size,
      examples: occurrences.slice(0, 8).map(({ identity_key, section, text, unit_id }) => ({ identity_key, section, text, unit_id })),
    }))
    .filter((row) => row.occurrence_count > 1)
    .sort((left, right) => right.identity_count - left.identity_count || right.occurrence_count - left.occurrence_count || left.normalized.localeCompare(right.normalized));
}

function tokenSet(value) {
  return new Set(normalizeBase(value).split(" ").filter((token) => token.length > 2 && !STOPWORDS.has(token) && token !== "<identity>"));
}

function jaccard(left, right) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const token of left) if (right.has(token)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function similarityCandidates(units, normalizeIdentity) {
  const candidates = units
    .filter((unit) => unit.word_count >= 10 && unit.word_count <= 90)
    .map((unit) => ({ ...unit, normalized_identity_text: normalizeIdentity(unit.text), tokens: tokenSet(normalizeIdentity(unit.text)) }));
  const crossIdentity = [];
  const withinDossier = [];
  for (let leftIndex = 0; leftIndex < candidates.length; leftIndex += 1) {
    const left = candidates[leftIndex];
    for (let rightIndex = leftIndex + 1; rightIndex < candidates.length; rightIndex += 1) {
      const right = candidates[rightIndex];
      const sameIdentity = left.identity_key === right.identity_key;
      if (!sameIdentity && left.section !== right.section) continue;
      if (sameIdentity && left.section === right.section) continue;
      if (!sameIdentity && left.normalized_identity_text === right.normalized_identity_text) continue;
      const score = jaccard(left.tokens, right.tokens);
      const threshold = sameIdentity ? 0.38 : 0.58;
      if (score < threshold) continue;
      const target = sameIdentity ? withinDossier : crossIdentity;
      target.push({
        similarity: Number(score.toFixed(4)),
        left: { identity_key: left.identity_key, section: left.section, unit_id: left.unit_id, text: left.text },
        right: { identity_key: right.identity_key, section: right.section, unit_id: right.unit_id, text: right.text },
      });
    }
  }
  const sort = (rows) => rows.sort((left, right) => right.similarity - left.similarity || left.left.unit_id.localeCompare(right.left.unit_id));
  return { cross_identity: sort(crossIdentity), within_dossier: sort(withinDossier) };
}

function openingFrequency(sentences) {
  const groups = new Map();
  for (const sentence of sentences) {
    const opening = sentence.normalized_identity.split(" ").slice(0, 5).join(" ");
    if (!opening) continue;
    if (!groups.has(opening)) groups.set(opening, []);
    groups.get(opening).push(sentence);
  }
  return [...groups.entries()]
    .map(([opening, rows]) => ({
      opening,
      occurrence_count: rows.length,
      identity_count: new Set(rows.map((row) => row.identity_key)).size,
      examples: rows.slice(0, 5).map(({ identity_key, section, text }) => ({ identity_key, section, text })),
    }))
    .filter((row) => row.identity_count >= 3)
    .sort((left, right) => right.identity_count - left.identity_count || right.occurrence_count - left.occurrence_count || left.opening.localeCompare(right.opening));
}

function ngramFrequency(sentences, size = 5) {
  const groups = new Map();
  for (const sentence of sentences) {
    const tokens = sentence.normalized_identity.split(" ");
    const seen = new Set();
    for (let index = 0; index <= tokens.length - size; index += 1) {
      const ngram = tokens.slice(index, index + size).join(" ");
      if (ngram.includes("<identity>") || seen.has(ngram)) continue;
      seen.add(ngram);
      if (!groups.has(ngram)) groups.set(ngram, []);
      groups.get(ngram).push(sentence);
    }
  }
  return [...groups.entries()]
    .map(([ngram, rows]) => ({ ngram, occurrence_count: rows.length, identity_count: new Set(rows.map((row) => row.identity_key)).size }))
    .filter((row) => row.identity_count >= 4)
    .sort((left, right) => right.identity_count - left.identity_count || right.occurrence_count - left.occurrence_count || left.ngram.localeCompare(right.ngram));
}

function identitySummaries(records, units, sentences, similarities) {
  return records.map((record) => {
    const identityUnits = units.filter((unit) => unit.identity_key === record.identity_key);
    const identitySentences = sentences.filter((sentence) => sentence.identity_key === record.identity_key);
    const semanticCandidates = similarities.within_dossier.filter((row) => row.left.identity_key === record.identity_key);
    return {
      identity_key: record.identity_key,
      identity_name: record.identity_name,
      expression_type: record.expression_type,
      rendered_section_ids: (record.panels || []).map((panel) => panel.id),
      prose_unit_count: identityUnits.length,
      sentence_count: identitySentences.length,
      word_count: identityUnits.reduce((sum, unit) => sum + unit.word_count, 0),
      hedge_count: HEDGE_PATTERNS.reduce((sum, pattern) => sum + identitySentences.filter((sentence) => new RegExp(`\\b${pattern}\\b`, "i").test(sentence.text)).length, 0),
      within_dossier_similarity_candidate_count: semanticCandidates.length,
      highest_within_dossier_similarity: semanticCandidates[0]?.similarity || 0,
      evidence_unit_ids: identityUnits.map((unit) => unit.unit_id),
    };
  });
}

function materialFindings() {
  return [
    {
      finding_id: "VM595-F01",
      severity: "HIGH",
      defect_families: ["CROSS_IDENTITY_TEMPLATING", "SYNTHETIC_CADENCE", "INTERCHANGEABLE_IDENTITY_VOICE"],
      truth: "supported_or_separately_governed",
      language: ["templated", "synthetic_cadence"],
      scope: "all_37",
      rendered_evidence: ["This may fit if …", "Watch for this tension: …", "This is less likely to fit when …", "Opponents feel the deck …", "Pressure through …"],
      owner: "AUTHORED_SOURCE",
      source_paths: ["data/dossier/identity-dossier-content.source.json", "data/dossier/identity-dossier-content.catalog.json"],
      owning_fields: ["positive_self_check", "tension_watchout", "negative_boundary", "how_opponents_read_it", "emotional_pressure"],
      systemic: true,
      likely_remediation_layer: "source-content cadence pass with field-role invariants; regenerate the catalog through its existing producer",
      rationale: "The repeated sentence frames are authored across every identity before rendering; the composer exposes rather than creates them.",
    },
    {
      finding_id: "VM595-F02",
      severity: "HIGH",
      defect_families: ["EXACT_REPETITION", "OVER_EXPLANATION", "REPETITIVE_TRANSITIONS_CONCLUSIONS"],
      truth: "supported_or_operational",
      language: ["repetitive", "verbose", "templated"],
      scope: "systemic_composer",
      rendered_evidence: ["Use these Commander starting points to turn this identity into decks, cards, and searches you can compare.", "Start here, then adjust the budget, complexity, and table role to fit your deck.", "Open live searchable paths shaped by this dossier."],
      owner: "COMPOSER_TEMPLATE",
      source_paths: ["assets/js/archscry/runtime/dossier-view.js", "assets/js/archscry/dossier/reading.js"],
      owning_fields: ["shared Start Here introduction", "buildCommanderStartingLane", "shared Maze discovery introduction"],
      systemic: true,
      likely_remediation_layer: "composer-first reduction of repeated instructional framing while preserving section navigation and utility",
      rationale: "Exact operational prose is emitted into every dossier and competes with identity-specific language.",
    },
    {
      finding_id: "VM595-F03",
      severity: "HIGH",
      defect_families: ["GENERIC_ABSTRACTION", "CROSS_SECTION_REDUNDANCY", "INTERCHANGEABLE_IDENTITY_VOICE"],
      truth: "supported",
      language: ["generic", "redundant", "over-produced"],
      scope: "identity_family",
      rendered_evidence: ["One way to explore … is a Commander deck that …", "Possible directions", "Why these appear", "How opponents read it", "Emotional pressure"],
      owner: "MULTIPLE_GOOD_FRAGMENTS_BADLY_COMPOSED",
      source_paths: ["data/dossier/identity-dossier-content.source.json", "assets/js/archscry/dossier/reading.js", "assets/js/archscry/runtime/dossier-view.js"],
      owning_fields: ["Commander plan/guidance", "table identity fields", "section composition/order"],
      systemic: true,
      likely_remediation_layer: "section-role consolidation: assign each field one information job, then remove or shorten overlapping rendered fragments",
      rationale: "Individually specific fragments repeat the same deck posture across Start Here, Test the Fit, and How This Plays when composed in sequence.",
    },
    {
      finding_id: "VM595-F04",
      severity: "MEDIUM",
      defect_families: ["UNNATURAL_QUALIFICATION_DENSITY", "SYNTHETIC_CADENCE"],
      truth: "supported_with_intentional_uncertainty",
      language: ["evasive", "formulaic"],
      scope: "all_37",
      rendered_evidence: ["This may fit if …", "This is less likely to fit when …", "can …", "may …"],
      owner: "AUTHORED_SOURCE",
      source_paths: ["data/dossier/identity-dossier-content.source.json"],
      owning_fields: ["positive_self_check", "negative_boundary", "identity descriptions"],
      systemic: true,
      likely_remediation_layer: "retain epistemic caution but vary and compress field-specific qualification instead of repeating the same hedge frame",
      rationale: "The uncertainty is honest, but uniform delivery across all identities makes it sound defensive and generated.",
    },
    {
      finding_id: "VM595-F05",
      severity: "MEDIUM",
      defect_families: ["TAUTOLOGY", "UNNATURAL_COMPOSITION"],
      truth: "supported_but_badly_written",
      language: ["unclear", "syntactically_broken"],
      scope: "identity_specific",
      rendered_evidence: ["This is less likely to fit when if rules are inherently oppression …", "This is less likely to fit when … is not …"],
      owner: "AUTHORED_SOURCE",
      source_paths: ["data/dossier/identity-dossier-content.source.json", "data/dossier/identity-dossier-content.catalog.json"],
      owning_fields: ["certified_boundary_self_check", "negative_boundary"],
      systemic: false,
      likely_remediation_layer: "targeted source repair plus a field-level grammar check before catalog generation",
      rationale: "The broken conditional is already present in the authored source and propagates unchanged through the catalog and renderer.",
    },
    {
      finding_id: "VM595-F06",
      severity: "MEDIUM",
      defect_families: ["CROSS_IDENTITY_TEMPLATING", "GENERIC_ABSTRACTION"],
      truth: "operational_not_identity_claim",
      language: ["generic", "repetitive"],
      scope: "shared_utility_sections",
      rendered_evidence: ["Ready-made Commander decks compared through verified color identity and cataloged deck facts.", "Use the recorded themes and mechanics to decide whether each deck is worth a closer look.", "Best when you want speed, consistency, and fewer tapped lands."],
      owner: "COMPOSER_TEMPLATE",
      source_paths: ["assets/js/archscry/dossier/precons.js", "assets/js/archscry/runtime/dossier-view.js"],
      owning_fields: ["precon introduction", "Mana Notes tier copy"],
      systemic: true,
      likely_remediation_layer: "keep one concise shared explanation per utility surface and avoid counting it as identity voice",
      rationale: "Legitimate instructional consistency becomes a large share of every dossier's prose and amplifies template feel.",
    },
    {
      finding_id: "VM595-F07",
      severity: "LOW",
      defect_families: ["INTERNAL_SYSTEM_LANGUAGE_LEAKING_OUTWARD"],
      truth: "operational",
      language: ["internally_procedural"],
      scope: "shared_utility_sections",
      rendered_evidence: ["verified color identity", "cataloged deck facts", "recorded themes and mechanics"],
      owner: "SHARED_UI_COPY",
      source_paths: ["assets/js/archscry/runtime/dossier-view.js", "assets/js/archscry/dossier/precons.js"],
      owning_fields: ["precon provenance framing"],
      systemic: true,
      likely_remediation_layer: "preserve trust meaning while translating governance vocabulary into shorter player language",
      rationale: "The language is accurate, but recurring audit-adjacent terms make a product dossier sound like its verification process.",
    },
  ];
}

function verifyRepositoryAndCorpus() {
  assert.equal(git("rev-parse", "HEAD"), CURRENT_BASELINE_SHA, "VM-595 must run from the accepted current baseline before its research artifacts are committed");
  assert.equal(git("rev-parse", "main"), CURRENT_BASELINE_SHA, "local main differs from the accepted VM-595 baseline");
  assert.equal(git("rev-parse", "origin/main"), CURRENT_BASELINE_SHA, "origin/main differs from the accepted VM-595 baseline");
  assert.deepEqual(git("rev-list", "--left-right", "--count", "main...origin/main").split(/\s+/).map(Number), [0, 0], "main/origin-main divergence is not 0/0");

  const historicalDrift = git("diff", "--name-only", `${RENDERED_EVIDENCE_BASELINE_SHA}..${CURRENT_BASELINE_SHA}`, "--", ...DOSSIER_OWNER_PATHS)
    .split(/\r?\n/).map(slash).filter(Boolean);
  const workingDrift = git("diff", "--name-only", "--", ...DOSSIER_OWNER_PATHS)
    .split(/\r?\n/).map(slash).filter(Boolean);
  if (!FRESH_CORPUS) {
    assert.deepEqual(historicalDrift, [], `dossier ownership drift invalidates VM-586 rendered evidence: ${historicalDrift.join(", ")}`);
  }
  assert.deepEqual([...workingDrift].sort(), EXPECTED_DOSSIER_OWNER_DIFF, `working-tree dossier ownership drift differs from the declared audit candidate: ${workingDrift.join(", ")}`);

  const corpus = readJson(CORPUS_FILE);
  assert.ok(FRESH_CORPUS || corpus.audit_baseline_sha === RENDERED_EVIDENCE_BASELINE_SHA);
  assert.equal(corpus.render_mode, "DIRECT_DOSSIER_REVIEW");
  assert.equal(corpus.actual_count, EXPECTED_IDENTITIES);
  assert.equal(corpus.records.length, EXPECTED_IDENTITIES);

  const identityLayers = readJson(path.join(ROOT, "data", "identity-layers.json"));
  const factionArtifact = readJson(path.join(ROOT, "data", "factions.json"));
  const factions = factionArtifact.factions || factionArtifact;
  const currentKeys = Object.entries(identityLayers.expressions || {})
    .filter(([key, expression]) => expression?.active !== false && factions[key])
    .map(([key]) => key).sort();
  const corpusKeys = corpus.records.map((record) => record.identity_key).sort();
  assert.equal(currentKeys.length, EXPECTED_IDENTITIES);
  assert.deepEqual(corpusKeys, currentKeys, "rendered corpus identity population differs from current authoritative registry");
  for (const record of corpus.records) {
    assert.equal(record.rendered_identity_key, record.identity_key, `${record.identity_key} rendered the wrong identity`);
    assert.equal(record.render_mode, "DIRECT_DOSSIER_REVIEW", `${record.identity_key} was not collected through Dossier Review`);
    assert.ok(record.full_rendered_text?.length > 500, `${record.identity_key} lacks complete rendered text`);
    assert.deepEqual((record.panels || []).map((panel) => panel.id), ["start", "why", "commander-deck-starts", "starter-cards", "mana-base", "maze-discovery"], `${record.identity_key} section boundary drift`);
  }
  return { corpus, historicalDrift, workingDrift, currentKeys };
}

function buildAudit() {
  const { corpus, historicalDrift, workingDrift } = verifyRepositoryAndCorpus();
  const records = corpus.records;
  const normalizeIdentity = identityNormalizer(records);
  const units = records.flatMap(extractUnits);
  const sentences = units.flatMap((unit) => sentenceSplit(unit.text).map((text, index) => ({
    sentence_id: `${unit.unit_id}-S${String(index + 1).padStart(2, "0")}`,
    unit_id: unit.unit_id,
    identity_key: unit.identity_key,
    identity_name: unit.identity_name,
    expression_type: unit.expression_type,
    section: unit.section,
    role: unit.role,
    text,
    normalized_exact: normalizeBase(text),
    normalized_identity: normalizeIdentity(text),
    word_count: wordCount(text),
  })));
  const similarities = similarityCandidates(units, normalizeIdentity);
  const exactDuplicates = groupDuplicates(sentences, "normalized_exact");
  const normalizedDuplicates = groupDuplicates(sentences, "normalized_identity");
  const exactCrossIdentity = exactDuplicates.filter((row) => row.identity_count > 1);
  const exactKeys = new Set(exactDuplicates.map((row) => row.normalized));
  const substitutionNormalized = normalizedDuplicates.filter((row) => row.identity_count > 1 && !exactKeys.has(row.normalized));
  const findings = materialFindings();
  const perIdentity = identitySummaries(records, units, sentences, similarities);
  const ownerCounts = findings.reduce((counts, finding) => {
    counts[finding.owner] = (counts[finding.owner] || 0) + 1;
    return counts;
  }, {});

  return {
    schema_version: "vm595-placement-language-trust-audit-v1",
    audit_id: "VM-595",
    generated_at: "2026-08-30",
    current_production_baseline_sha: CURRENT_BASELINE_SHA,
    rendered_evidence_baseline_sha: RENDERED_EVIDENCE_BASELINE_SHA,
    rendered_evidence_path: slash(path.relative(ROOT, CORPUS_FILE)),
    render_mode: "DIRECT_DOSSIER_REVIEW",
    review_route: "/archscry/?vm-dev-review=1",
    current_composer_equivalence: {
      status: FRESH_CORPUS ? "PASS_FRESH_CORPUS" : "PASS",
      compared_owner_paths: DOSSIER_OWNER_PATHS,
      committed_owner_drift: historicalDrift,
      working_tree_owner_drift: workingDrift,
      explanation: FRESH_CORPUS ? "A complete fresh 37/37 Dossier Review corpus was collected after the reconciled owner-path changes; historic corpus equivalence is intentionally not used." : "VM-603 browser-rendered all 37 dossiers from the exact pushed Batch 04 baseline. The corpus and producer share that accepted SHA, and the working tree contains no dossier-owner edit.",
    },
    population: {
      expected_identities: EXPECTED_IDENTITIES,
      analyzed_identities: records.length,
      identity_keys: records.map((record) => record.identity_key),
      required_section_ids: ["start", "why", "commander-deck-starts", "starter-cards", "mana-base", "maze-discovery"],
      prose_unit_count: units.length,
      sentence_count: sentences.length,
      word_count: units.reduce((sum, unit) => sum + unit.word_count, 0),
    },
    methodology: {
      ai_detection_used: false,
      structural_labels_excluded: true,
      prose_unit_rule: "Rendered lines with at least seven words and prose-like length/punctuation after excluding headings, card names, control labels, URLs, and all-caps structure.",
      sentence_normalization: "Unicode/case/punctuation normalized; identity names and keys may be replaced with <identity> only for cross-identity candidate generation.",
      similarity_role: "Deterministic exact/normalized/Jaccard signals generate review candidates. Material editorial findings remain separately classified and source-traced.",
      thresholds: { cross_identity_jaccard: 0.58, within_dossier_cross_section_jaccard: 0.38, repeated_opening_identity_minimum: 3, repeated_five_gram_identity_minimum: 4 },
    },
    quantitative: {
      summary: {
        exact_cross_identity_duplicate_group_count: exactCrossIdentity.length,
        exact_cross_identity_duplicate_occurrence_count: exactCrossIdentity.reduce((sum, row) => sum + row.occurrence_count, 0),
        substitution_normalized_duplicate_group_count: substitutionNormalized.length,
        repeated_opening_group_count: openingFrequency(sentences).length,
        repeated_five_gram_group_count: ngramFrequency(sentences).length,
        cross_identity_near_similarity_pair_count: similarities.cross_identity.length,
        within_dossier_redundancy_candidate_count: similarities.within_dossier.length,
      },
      exact_duplicate_groups: exactDuplicates,
      normalized_duplicate_groups: normalizedDuplicates,
      high_frequency_openings: openingFrequency(sentences),
      repeated_five_grams: ngramFrequency(sentences),
      hedges: countPhrases(sentences, HEDGE_PATTERNS),
      transitions_and_cadence: countPhrases(sentences, TRANSITION_PATTERNS),
      cross_identity_similarity_candidates: similarities.cross_identity.slice(0, 200),
      cross_identity_similarity_candidates_truncated: similarities.cross_identity.length > 200,
      within_dossier_redundancy_candidates: similarities.within_dossier,
    },
    per_identity: perIdentity,
    evidence_units: units,
    material_findings: findings,
    finding_owner_distribution: ownerCounts,
    truth_voice_summary: {
      proven_unsupported_or_over_strengthened_claims: 0,
      unclear_provenance_findings: 0,
      note: "VM-595 found language-trust defects in supported/operational material but did not establish a BLOCKER truth defect. Absence of a VM-595 truth finding is not a new semantic certification.",
    },
  };
}

const audit = buildAudit();
const serialized = `${JSON.stringify(audit, null, 2)}\n`;
if (process.argv.includes("--check")) {
  assert.ok(fs.existsSync(OUTPUT_FILE), `${slash(path.relative(ROOT, OUTPUT_FILE))} is missing`);
  assert.equal(fs.readFileSync(OUTPUT_FILE, "utf8"), serialized, "placement language audit evidence is stale; rerun without --check");
  process.stdout.write(`PASS VM-595 placement-language trust audit: ${audit.population.analyzed_identities}/${audit.population.expected_identities} identities, ${audit.population.prose_unit_count} prose units, ${audit.population.sentence_count} sentences\n`);
} else {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, serialized, "utf8");
  process.stdout.write(`WROTE ${slash(path.relative(ROOT, OUTPUT_FILE))}: ${audit.population.analyzed_identities}/${audit.population.expected_identities} identities, ${audit.population.prose_unit_count} prose units, ${audit.population.sentence_count} sentences\n`);
}
