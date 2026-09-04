import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildDossierMazePathEntries } from "../../assets/js/maze/maze-handoff.js";
import {
  compileLocalScryfallQuery,
  evaluateLocalScryfallQuery,
  localCardEvidence,
  parseLocalScryfallQuery,
  toDisjunctiveBranches,
  VM547_LOCAL_OTAG_MODELS,
} from "../lib/vm547-local-scryfall.mjs";

const root = process.cwd();
const acceptFixtures = process.argv.includes("--accept-fixtures");
const fixturePath = path.join(root, "tests", "fixtures", "vm547-projection-card-fixtures.json");
const evidencePath = path.join(root, "docs", "qa", "2026-09-04-vm547-all-367-projection-evidence.md");
const NEGATIVE_RATIONALE_OVERRIDES = {
  "WITCH/patient-cultivation/commander": {
    terms: ["Atraxa namesake contrast"],
    rationale: "Atraxa, Grand Unifier is the other exact Witch commander and a plausible namesake false positive, but it has no Proliferate or counter-over-time text.",
  },
};
const FALSE_POSITIVE_REGRESSIONS = {
  "WU/visible-restrictions/stretch": ["Bast, Panther Goddess"],
  "UB/covert-infiltration/stretch": ["Pippin, Guard of the Citadel"],
  "JESKAI/disciplined-tempo/stretch": ["Lord of the Nazgûl"],
  "GLINT/adaptive-appetite/stretch": ["Dennick, Pious Apprentice // Dennick, Pious Apparition"],
  "DUNE/common-front/stretch": ["Jin Sakai, Ghost of Tsushima"],
  "INK/public-abundance/stretch": ["Aminatou, the Fateshifter"],
  "INK/protected-commons/stretch": ["Kefka, Dancing Mad"],
};
const [catalog, cards, manifest] = await Promise.all([
  readJson("data/dossier/maze-discovery-profiles.catalog.json"),
  readJson("data/scryfall/raw/oracle-cards.json"),
  readJson("data/scryfall/indexes/scryfall-index-manifest.json"),
]);

assert.equal(cards.length, manifest.meta.source_card_count, "Local Oracle corpus count does not match its manifest");
assert.deepEqual(VM547_LOCAL_OTAG_MODELS, ["counterspell", "board-wipe", "sacrifice-outlet", "death-trigger", "ramp", "draw", "tutor"]);

const inspectQuery = process.argv.find((argument) => argument.startsWith("--query="))?.slice("--query=".length);
if (inspectQuery) {
  const matchingCards = cards.filter(compileLocalScryfallQuery(inspectQuery)).sort(cardOrder);
  console.log(`QUERY\t${inspectQuery}\nCOUNT\t${matchingCards.length}`);
  for (const card of matchingCards.slice(0, 80)) console.log(evidenceLine(card));
  process.exit(0);
}

const inspectKeys = process.argv.find((argument) => argument.startsWith("--inspect="))?.split("=")[1]?.toUpperCase().split(",");
if (inspectKeys?.length) {
  for (const inspectKey of inspectKeys) {
    const profile = catalog.profiles.find((candidate) => candidate.identity_key === inspectKey);
    assert(profile, `Unknown profile requested for inspection: ${inspectKey}`);
    const matchingCards = cards.filter(compileLocalScryfallQuery(commanderBase(profile))).sort(cardOrder);
    console.log(`\n## ${inspectKey}`);
    for (const card of matchingCards) console.log(evidenceLine(card));
  }
  process.exit(0);
}

const broadPrimitiveFindings = [];
const compositeLabelFindings = [];
const projections = [];
const queryCardCache = new Map();

for (const profile of catalog.profiles) {
  const paths = buildDossierMazePathEntries({
    identity: profile.color_identity,
    factionName: profile.identity_name,
    identityHint: profile.identity_key,
    includeOutsideColorStretch: profile.stretch.availability === "available",
    discoveryProfile: profile,
  });

  auditProfileThreads(profile);
  for (const pathEntry of paths) {
    for (const thread of pathEntry.threads) projections.push(buildProjectionEvidence(profile, pathEntry, thread));
  }
}

assert.equal(projections.length, 367, "Expected all 367 modeled VM-547 projections");
auditOwnerFlaggedExamples();
auditFalsePositiveRegressions();
const executable = projections.filter((record) => record.availability === "available");
const unavailable = projections.filter((record) => record.availability === "unavailable");
const zero = executable.filter((record) => record.local_result_count === 0);
const review = projections.filter((record) => record.status === "REVIEW");
const failed = projections.filter((record) => record.status === "FAIL");

assert.equal(broadPrimitiveFindings.length, 0, formatFindings("Broad semantic primitive", broadPrimitiveFindings));
assert.equal(compositeLabelFindings.length, 0, formatFindings("Composite label", compositeLabelFindings));
assert.equal(zero.length, 0, formatFindings("Executable zero-result projection", zero.map((record) => record.projection_id)));
assert.equal(review.length, 0, formatFindings("Projection requiring review", review.map((record) => record.projection_id)));
assert.equal(failed.length, 0, formatFindings("Failed projection", failed.map((record) => record.projection_id)));

const fixturePayload = {
  schema_version: "vm547-projection-card-fixtures-v1",
  generated_from: "data/dossier/maze-discovery-profiles.catalog.json",
  corpus: {
    path: "data/scryfall/raw/oracle-cards.json",
    source_card_count: cards.length,
    bulk_id: manifest.meta.bulk_id,
    bulk_updated_at: manifest.meta.bulk_updated_at,
    downloaded_at: manifest.meta.downloaded_at,
    local_otag_models: VM547_LOCAL_OTAG_MODELS,
  },
  audit_summary: {
    profiles: catalog.profiles.length,
    projections: projections.length,
    executable: executable.length,
    unavailable: unavailable.length,
    nonempty: executable.length - zero.length,
    zero: zero.length,
    positive_fixtures: executable.length,
    negative_fixtures: executable.length,
    boundary_fixtures: executable.length,
    broad_primitive_findings: broadPrimitiveFindings.length,
    composite_label_findings: compositeLabelFindings.length,
    minimum_result_count: Math.min(...executable.map((record) => record.local_result_count)),
    maximum_result_count: Math.max(...executable.map((record) => record.local_result_count)),
  },
  records: projections,
};

const fixtureBytes = `${JSON.stringify(fixturePayload, null, 2)}\n`;
const evidenceBytes = buildEvidenceMarkdown(fixturePayload);
if (acceptFixtures) {
  await Promise.all([writeFile(fixturePath, fixtureBytes, "utf8"), writeFile(evidencePath, evidenceBytes, "utf8")]);
} else {
  const [expectedFixture, expectedEvidence] = await Promise.all([readFile(fixturePath, "utf8"), readFile(evidencePath, "utf8")]);
  assert.equal(expectedFixture.replace(/\r\n/g, "\n"), fixtureBytes, "VM-547 pinned card fixtures are stale; review before using --accept-fixtures");
  assert.equal(expectedEvidence.replace(/\r\n/g, "\n"), evidenceBytes, "VM-547 projection evidence is stale; review before using --accept-fixtures");
}

console.log(JSON.stringify({ ...fixturePayload.audit_summary, status: "PASS", fixture_mode: acceptFixtures ? "accepted" : "checked" }, null, 2));

function buildProjectionEvidence(profile, pathEntry, thread) {
  const availability = thread.availability === "unavailable" ? "unavailable" : "available";
  const base = baseQuery(profile, thread.lane);
  const record = {
    projection_id: `${profile.identity_key}/${thread.threadId}/${thread.lane}`,
    dossier: `${profile.identity_key} — ${profile.identity_name}`,
    identity_key: profile.identity_key,
    color_identity: profile.color_identity.toUpperCase(),
    source_thread: `${thread.sourceItemId} / ${thread.threadId}`,
    source_locator: thread.sourceLocator,
    lane: thread.lane,
    displayed_label: thread.label,
    search_interpretation: thread.interpretation,
    operator_query: thread.query,
    semantic_clause: thread.queryClause,
    availability,
    local_result_count: null,
    expected_positive: null,
    expected_negative: null,
    boundary_fixture: null,
    status: "PASS",
    exception_rationale: availability === "unavailable" ? thread.unavailableReason : "None",
  };
  if (availability === "unavailable") {
    assert(!thread.query && !thread.queryClause && thread.unavailableReason, `${record.projection_id}: malformed unavailable projection`);
    return record;
  }

  const fullMatches = compileLocalScryfallQuery(thread.query);
  const semanticMatches = compileLocalScryfallQuery(thread.queryClause);
  const matchingCards = cardsForQuery(thread.query);
  const semanticCards = new Set(cardsForQuery(thread.queryClause));
  record.local_result_count = matchingCards.length;
  if (!matchingCards.length) {
    record.status = "FAIL";
    return record;
  }

  const concepts = conceptTerms(thread);
  const semanticAtoms = uniqueAtoms(parseLocalScryfallQuery(thread.queryClause));
  const positiveCard = chooseBest(matchingCards, (card) => positiveScore(card, semanticAtoms, concepts));
  assert(positiveCard && fullMatches(positiveCard) && semanticMatches(positiveCard), `${record.projection_id}: positive fixture does not satisfy the projection`);
  record.expected_positive = fixtureCard(positiveCard, {
    basis: "Satisfies the exact lane query and its semantic clause in the pinned local Oracle corpus.",
    related_terms: relatedTerms(positiveCard, concepts),
  });

  let negativePool = cardsForQuery(base).filter((card) => !semanticCards.has(card));
  let negativeScope = "same lane eligibility; excluded only by the semantic clause";
  if (!negativePool.length) {
    negativePool = cardsForQuery(thread.lane === "support" || thread.lane === "flavor" ? "f:commander -is:commander -t:land" : "is:commander f:commander")
      .filter((card) => !semanticCards.has(card));
    negativeScope = "same card role; exact lane has no semantic negative, so the semantic clause is tested independently of identity";
  }
  const negativeCard = chooseBest(negativePool, (card) => negativeScore(card, semanticAtoms, concepts));
  const negativeOverride = NEGATIVE_RATIONALE_OVERRIDES[record.projection_id];
  const negativeTerms = relatedTerms(negativeCard, concepts).length
    ? relatedTerms(negativeCard, concepts)
    : negativeOverride?.terms || [];
  assert(negativeCard && !semanticMatches(negativeCard) && !fullMatches(negativeCard), `${record.projection_id}: negative fixture was admitted`);
  assert(negativeTerms.length, `${record.projection_id}: negative fixture has no reviewable semantic near-miss term`);
  record.expected_negative = fixtureCard(negativeCard, {
    basis: negativeOverride?.rationale || `${negativeScope}; it shares the listed vocabulary but must remain outside the claim.`,
    related_terms: negativeTerms,
  });

  const boundary = chooseBoundary(profile, thread, fullMatches, semanticMatches, semanticCards, semanticAtoms, concepts, negativeCard);
  assert(boundary.card && !fullMatches(boundary.card), `${record.projection_id}: boundary fixture was admitted`);
  record.boundary_fixture = fixtureCard(boundary.card, { basis: boundary.basis, related_terms: relatedTerms(boundary.card, concepts) });
  return record;
}

function chooseBoundary(profile, thread, fullMatches, semanticMatches, semanticCards, semanticAtoms, concepts, negativeCard) {
  const identity = profile.color_identity;
  const preferredQueries = thread.lane === "commander"
    ? [`id<=${identity} f:commander -is:commander -t:land`]
    : thread.lane === "support"
      ? [`id=${identity} is:commander f:commander`, `-id<=${identity} is:commander f:commander`]
      : thread.lane === "stretch"
        ? [`id=${identity} is:commander f:commander`, `id<=${identity} f:commander -is:commander -t:land`]
        : [`-id<=${identity} f:commander`, `id<=${identity} -f:commander`];
  for (const query of preferredQueries) {
    const pool = cardsForQuery(query).filter((card) => semanticCards.has(card) && !fullMatches(card));
    if (pool.length) {
      return {
        card: chooseBest(pool, (card) => positiveScore(card, semanticAtoms, concepts)),
        basis: `${boundaryName(thread.lane)}: satisfies the semantic clause but violates the ${thread.lane} lane eligibility expressed by ${query}.`,
      };
    }
  }
  assert(negativeCard, `${profile.identity_key}/${thread.threadId}/${thread.lane}: no boundary candidate`);
  return {
    card: negativeCard,
    basis: thread.lane === "flavor"
      ? "Flavor-field boundary: related card or Oracle vocabulary must not satisfy an ft: flavor-text claim."
      : `Semantic boundary fallback: the pinned near miss must remain outside the ${thread.lane} semantic clause.`,
  };
}

function auditProfileThreads(profile) {
  for (const thread of profile.mechanical_threads) {
    auditThread(profile.identity_key, thread.thread_id, thread.label, thread.interpretation, thread.query_clause);
    for (const [lane, override] of Object.entries(thread.lane_overrides || {})) {
      if (override.availability === "available") auditThread(profile.identity_key, `${thread.thread_id}/${lane}`, override.label || thread.label, override.interpretation || thread.interpretation, override.query_clause);
    }
  }
}

function auditThread(identityKey, threadId, label, interpretation, clause) {
  const ast = parseLocalScryfallQuery(clause);
  const broadBranches = toDisjunctiveBranches(ast).filter((branch) => branch.length === 1 && isBroadPrimitive(branch[0]));
  if (broadBranches.length) broadPrimitiveFindings.push(`${identityKey}/${threadId}: ${broadBranches.map((branch) => branch[0].token).join(", ")}`);
  if (/\band\b/i.test(label) && !/\bor\b/i.test(label) && ast.type === "or") compositeLabelFindings.push(`${identityKey}/${threadId}: ${label}`);
}

function auditOwnerFlaggedExamples() {
  const sourceThreads = new Map(catalog.profiles.flatMap((profile) => profile.mechanical_threads.map((thread) => [`${profile.identity_key}/${thread.thread_id}`, thread])));
  const required = [
    ["COLORLESS/artifact-engines", (thread) => /t:artifact/i.test(thread.query_clause) && /(?:draw|add|untap|copy|counter|sacrifice)/i.test(thread.query_clause)],
    ["DUNE/multiplying-force", (thread) => /\bor\b/i.test(thread.label) && /token/i.test(thread.query_clause) && /(?:double|twice|for each)/i.test(thread.query_clause)],
    ["GLINT/adaptive-appetite", (thread) => /(?:you may play|you may cast)/i.test(thread.query_clause) && /treasure/i.test(thread.query_clause)],
    ["SILVERQUILL/targeted-interaction", (thread) => /target creature/i.test(thread.query_clause) && /target player/i.test(thread.query_clause) && /target opponent/i.test(thread.query_clause)],
    ["U/artifacts-clones", (thread) => /t:artifact/i.test(thread.query_clause) && /copy/i.test(thread.query_clause) && /permanent/i.test(thread.query_clause)],
    ["WUBRG/five-color-typal", (thread) => !/t:creature/i.test(thread.query_clause) && /creature type/i.test(thread.query_clause)],
  ];
  for (const [key, predicate] of required) {
    const thread = sourceThreads.get(key);
    assert(thread && predicate(thread), `${key}: owner-flagged semantic guard failed`);
  }
}

function auditFalsePositiveRegressions() {
  for (const [projectionId, cardNames] of Object.entries(FALSE_POSITIVE_REGRESSIONS)) {
    const projection = projections.find((record) => record.projection_id === projectionId);
    assert(projection, `${projectionId}: false-positive projection is missing`);
    if (projection.availability === "unavailable") continue;
    const matches = compileLocalScryfallQuery(projection.operator_query);
    for (const cardName of cardNames) {
      const card = cards.find((candidate) => candidate.name === cardName);
      assert(card, `${projectionId}: false-positive fixture card ${cardName} is missing from the governed corpus`);
      assert(!matches(card), `${projectionId}: known false positive ${cardName} was re-admitted`);
    }
  }
}

function positiveScore(card, atoms, concepts) {
  const atomScore = atoms.reduce((score, atom) => score + (evaluateLocalScryfallQuery(card, atom) ? 1 : 0), 0);
  return atomScore * 100 + relatedTerms(card, concepts).length * 10 + Math.min(localCardEvidence(card).oracle_excerpt.length, 260) / 260;
}

function negativeScore(card, atoms, concepts) {
  const partialScore = atoms.reduce((score, atom) => score + (evaluateLocalScryfallQuery(card, atom) ? 1 : 0), 0);
  return partialScore * 100 + relatedTerms(card, concepts).length * 10 + Math.min(localCardEvidence(card).oracle_excerpt.length, 260) / 260;
}

function uniqueAtoms(ast) {
  return [...new Map(toDisjunctiveBranches(ast).flat().map((atom) => [atom.token, atom])).values()];
}

function conceptTerms(thread) {
  const operatorValues = uniqueAtoms(parseLocalScryfallQuery(thread.queryClause)).flatMap((atom) => atom.value.match(/[a-z][a-z-]{3,}/g) || []);
  const words = `${thread.label} ${thread.interpretation}`.toLowerCase().match(/[a-z][a-z-]{3,}/g) || [];
  const stop = new Set(["card", "cards", "commander", "creature", "creatures", "effect", "effects", "explicitly", "find", "joined", "player", "players", "target", "that", "their", "them", "this", "through", "with", "your"]);
  return [...new Set([...operatorValues, ...words].filter((word) => !stop.has(word)))];
}

function relatedTerms(card, concepts) {
  if (!card) return [];
  const evidence = localCardEvidence(card);
  const text = `${evidence.name} ${evidence.type_line} ${evidence.oracle_excerpt} ${evidence.flavor_excerpt}`.toLowerCase();
  return concepts.filter((term) => text.includes(term)).slice(0, 8);
}

function fixtureCard(card, extra) {
  return { ...localCardEvidence(card), ...extra };
}

function chooseBest(pool, score) {
  let best = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const card of pool) {
    const cardScore = score(card);
    if (cardScore > bestScore || (cardScore === bestScore && best && cardOrder(card, best) < 0)) {
      best = card;
      bestScore = cardScore;
    }
  }
  return best;
}

function cardsForQuery(query) {
  if (!queryCardCache.has(query)) queryCardCache.set(query, cards.filter(compileLocalScryfallQuery(query)));
  return queryCardCache.get(query);
}

function baseQuery(profile, lane) {
  if (lane === "commander") return commanderBase(profile);
  if (lane === "support") return `id<=${profile.color_identity} f:commander -is:commander -t:land`;
  if (lane === "stretch") return `-id<=${profile.color_identity} is:commander f:commander`;
  return `id<=${profile.color_identity} f:commander`;
}

function commanderBase(profile) {
  return `id=${profile.color_identity} is:commander f:commander`;
}

function boundaryName(lane) {
  if (lane === "commander") return "Commander-versus-support boundary";
  if (lane === "support") return "Support-versus-commander or outside-identity boundary";
  if (lane === "stretch") return "Outside-versus-native-identity boundary";
  return "Flavor identity/legal-format boundary";
}

function isBroadPrimitive(atom) {
  if (atom.negated) return false;
  if (atom.field === "t") return ["artifact", "creature"].includes(atom.value);
  if (atom.field !== "o") return false;
  return ["attack", "copy", "damage", "discard", "double", "draw", "graveyard", "indestructible", "land", "mana", "protection", "return", "sacrifice", "target creature", "target opponent", "target player", "token", "ward"].includes(atom.value);
}

function buildEvidenceMarkdown(payload) {
  const sections = [];
  for (const profile of catalog.profiles) {
    const rows = payload.records.filter((record) => record.identity_key === profile.identity_key);
    sections.push(`## ${profile.identity_key} — ${profile.identity_name}\n\n<a id="${dossierAnchor(profile)}"></a>\n\n| Source thread | Lane | Displayed label | Plain-English interpretation | Exact operator query | Local result count | Expected positive | Expected semantic negative | Boundary fixture | Status | Exception rationale |\n|---|---|---|---|---|---:|---|---|---|---|---|\n${rows.map(evidenceRow).join("\n")}`);
  }
  return `# VM-547 all-367 projection card evidence\n\nGenerated deterministically from the canonical discovery catalog and the pinned ${payload.corpus.source_card_count.toLocaleString("en-US")}-card local Scryfall Oracle corpus (${payload.corpus.bulk_updated_at}). Each available projection pins one positive card, one plausible card-level semantic negative, and one lane/text-field boundary. Unavailable intersections carry no synthetic query or fabricated fixture.\n\nSummary: ${payload.audit_summary.projections} modeled projections; ${payload.audit_summary.executable} executable and useful-nonempty; ${payload.audit_summary.unavailable} explicitly unavailable; ${payload.audit_summary.positive_fixtures} positive, ${payload.audit_summary.negative_fixtures} negative, and ${payload.audit_summary.boundary_fixtures} boundary fixtures; ${payload.audit_summary.broad_primitive_findings} unresolved broad-primitive findings; ${payload.audit_summary.composite_label_findings} unresolved composite-label findings.\n\n${sections.join("\n\n")}\n`;
}

function evidenceRow(record) {
  return `| ${[record.source_thread, record.lane, record.displayed_label, record.search_interpretation, record.operator_query || "Unavailable", record.local_result_count ?? "Unavailable", formatFixture(record.expected_positive), formatFixture(record.expected_negative), formatFixture(record.boundary_fixture), record.status, record.exception_rationale].map(escapeCell).join(" | ")} |`;
}

function formatFixture(fixture) {
  if (!fixture) return "None — intentionally unavailable";
  const terms = fixture.related_terms?.length ? ` Related: ${fixture.related_terms.join(", ")}.` : "";
  return `${fixture.name} — ${fixture.basis}${terms} Oracle: ${fixture.oracle_excerpt || "No Oracle text."}`;
}

function dossierAnchor(profile) {
  return `vm547-${profile.identity_key.toLowerCase()}-${slug(profile.identity_name)}`;
}

function slug(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function escapeCell(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("|", "&#124;").replaceAll("\n", "<br>");
}

function formatFindings(label, findings) {
  return findings.length ? `${label} findings:\n${findings.join("\n")}` : `${label}: none`;
}

function evidenceLine(card) {
  const evidence = localCardEvidence(card);
  return `${evidence.name}\t${evidence.color_identity}\t${evidence.type_line}\t${evidence.oracle_excerpt}`;
}

function cardOrder(left, right) {
  return String(left.name || "").localeCompare(String(right.name || "")) || String(left.oracle_id || "").localeCompare(String(right.oracle_id || ""));
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}
