import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");
const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();
const normalizeLineEndings = (value) => String(value || "").replace(/\r\n/g, "\n");
const esc = (value) => String(value || "").replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");

const [source, printings, catalog, flavorIndex, commanderIndex, rationaleCatalog, preconCatalog, factions, rawOracleCards] = await Promise.all([
  readJson("data/dossier/card-voice-relationships.source.json"),
  readJson("data/dossier/card-voice-printings.source.json"),
  readJson("data/dossier/card-voice-catalog.json"),
  readJson("data/scryfall/indexes/card-flavor-index.json"),
  readJson("data/scryfall/indexes/commander-index.json"),
  readJson("data/dossier/card-rationale-catalog.json"),
  readJson("data/precons/vox-mana-precon-catalog.json"),
  readJson("data/factions.json"),
  readJson("data/scryfall/raw/oracle-cards.json"),
]);

const identityOrder = Object.keys(factions.factions);
const approved = source.records.filter((record) => record.review_status === "APPROVED_PUBLIC");
const anchors = approved.filter((record) => record.slot === 1);
const complements = approved.filter((record) => record.slot === 2);
const unresolved = source.records.filter((record) => record.review_status === "REVIEW_REQUIRED");
const normalizedRawCards = rawOracleCards.map((record) => ({
  oracle_id: record.oracle_id,
  scryfall_id: record.id,
  name: record.name,
  type_line: record.type_line,
  set: record.set,
  collector_number: record.collector_number,
  flavor_excerpt: record.flavor_text ?? record.card_faces?.find((face) => face.flavor_text)?.flavor_text ?? "",
}));
const committedCards = new Map([...flavorIndex.cards, ...commanderIndex.commanders, ...normalizedRawCards].map((record) => [record.oracle_id, record]));
const sourceByRelationship = new Map(source.records.map((record) => [record.relationship_id, record]));
const printingByRelationship = new Map(printings.records.map((record) => [record.relationship_id, record]));
const catalogByRelationship = new Map(catalog.records.map((record) => [record.relationship_id, record]));
const preconText = JSON.stringify(preconCatalog);
const localImageRecords = [...flavorIndex.cards, ...commanderIndex.commanders, ...printings.records];
const hasLocalImage = (record) => Boolean(record?.image_uris?.normal || record?.card_faces?.some((face) => face.image_uris?.normal));

assert.equal(source.schema_version, "1.1.0");
assert.equal(printings.schema_version, "1.1.0");
assert.equal(catalog.schema_version, "1.1.0");
assert.equal(source.records.length, 73);
assert.equal(approved.length, 73);
assert.equal(anchors.length, 37);
assert.equal(complements.length, 36);
assert.equal(unresolved.length, 0);
assert.equal(printings.records.length, 73);
assert.equal(catalog.records.length, 73);
assert.equal(new Set(source.records.map((record) => record.relationship_id)).size, 73);
assert.equal(new Set(complements.map((record) => record.identity_key)).size, 36);
assert(!complements.some((record) => record.identity_key === "COLORLESS"));

for (const identityKey of identityOrder) {
  const identityAnchors = anchors.filter((record) => record.identity_key === identityKey);
  const identityComplements = complements.filter((record) => record.identity_key === identityKey);
  assert.equal(identityAnchors.length, 1, `Unexpected slot-1 cardinality: ${identityKey}`);
  assert.equal(identityComplements.length, identityKey === "COLORLESS" ? 0 : 1, `Unexpected slot-2 cardinality: ${identityKey}`);
}

for (const record of approved) {
  const printing = printingByRelationship.get(record.relationship_id);
  const runtime = catalogByRelationship.get(record.relationship_id);
  assert(printing, `Missing approved printing: ${record.relationship_id}`);
  assert(runtime, `Missing approved runtime record: ${record.relationship_id}`);
  assert.equal(printing.identity_key, record.identity_key);
  assert.equal(printing.slot, record.slot);
  assert.equal(runtime.slot, record.slot);
  assert.equal(runtime.pair_role, record.pair_role);
  assert.equal(printing.scryfall_id, record.scryfall_id);
  assert.equal(printing.oracle_id, record.canonical_card_id);
  assert.equal(printing.exact_flavor_text, record.exact_excerpt);
  assert.equal(runtime.card.scryfall_id, record.scryfall_id);
  assert.equal(runtime.card.oracle_id, record.canonical_card_id);
  assert.equal(runtime.excerpt, record.exact_excerpt);
  assert.equal(runtime.provenance.approval_basis, record.approval_basis);
  assert.equal(runtime.provenance.validator_version, record.validation.validator_version);
  assert(runtime.modal_explanation);
  assert(localImageRecords.some((candidate) => (
    (candidate.oracle_id === record.canonical_card_id || candidate.name === record.canonical_card_name || candidate.canonical_card_name === record.canonical_card_name) &&
    hasLocalImage(candidate)
  )), `No locally resolvable card image: ${record.identity_key} / slot ${record.slot} / ${record.canonical_card_name}`);
}

for (const complement of complements) {
  const anchor = sourceByRelationship.get(complement.complements_relationship_id);
  const card = committedCards.get(complement.canonical_card_id);
  assert(anchor && anchor.identity_key === complement.identity_key && anchor.slot === 1, `Broken pair: ${complement.relationship_id}`);
  assert(card, `Missing committed card: ${complement.relationship_id}`);
  assert.equal(complement.pair_role, "COMPLEMENT");
  assert.equal(complement.owner_decision, "APPROVE");
  assert.equal(complement.public_eligible, true);
  assert.equal(complement.approval_basis, "OWNER_SEMANTIC_APPROVAL");
  assert.equal(complement.structural_validation?.passed, true);
  assert.equal(complement.validation?.passed, true);
  assert.equal(complement.validation?.validator_version, "vm558-owner-semantic-approval-v1");
  assert.equal(complement.canonical_card_name, card.name);
  assert.equal(complement.scryfall_id, card.scryfall_id);
  assert.equal(complement.printing.set, card.set);
  assert.equal(complement.printing.collector_number, card.collector_number);
  assert.equal(normalize(complement.exact_excerpt), normalize(card.flavor_excerpt));
  assert.equal(complement.type_line, card.type_line);
  assert(!complement.exact_excerpt.includes("..."), `Truncated flavor text: ${complement.relationship_id}`);
  assert(!/^Land\b/.test(complement.type_line), `Land complement: ${complement.relationship_id}`);
  assert(!(/^(?:Legendary )?Artifact\b/.test(complement.type_line) && !/^Legendary Artifact\b/.test(complement.type_line)), `Ordinary artifact complement: ${complement.relationship_id}`);
  assert(complement.certified_identity_claim_ids.length && complement.source_ids.length);
  assert(complement.teaching_facet && complement.complementarity_rationale && complement.proposed_modal_explanation);
  const playHits = rationaleCatalog.records.filter((record) => record.card?.oracle_id === complement.canonical_card_id || record.card?.name === complement.canonical_card_name);
  assert.equal(playHits.length, 0, `Sound/Play collision: ${complement.relationship_id}`);
  assert.equal(complement.overlap_review.sound_play.status, "NONE");
  assert.equal(complement.overlap_review.precon.status, preconText.includes(complement.canonical_card_name) ? "DETECTED_NONBLOCKING" : "NONE");
  assert.equal(complement.overlap_review.card_signal.status, JSON.stringify(factions.factions[complement.identity_key]).includes(complement.canonical_card_name) ? "DETECTED_NONBLOCKING" : "NONE");
  assert.equal(catalogByRelationship.get(complement.relationship_id).modal_explanation, complement.proposed_modal_explanation);
}

const rows = complements.map((complement) => {
  const anchor = sourceByRelationship.get(complement.complements_relationship_id);
  return `| ${esc(complement.identity_name)} (\`${complement.identity_key}\`) | **${esc(anchor.canonical_card_name)}** → **${esc(complement.canonical_card_name)}** | ${esc(complement.teaching_facet)} | APPROVED / PUBLIC |`;
});

const markdown = `# VM-558 Complementary Card-Voice Owner Approval Record\n\nStatus: **SEMANTIC OWNER GATE COMPLETE — 36/36 complementary slot-2 decisions approved and promoted.**\n\nColorless remains the intentional single-voice exception. This is a completion record, not a request to revisit semantic decisions.\n\n| Identity | Public pair | Complementary teaching facet | Decision / state |\n|---|---|---|---|\n${rows.join("\n")}\n\n## Deterministic promotion facts\n\n- Curated relationship records: 73 (37 slot-1 anchors + 36 owner-approved slot-2 complements).\n- Exact-printing records: 73.\n- Runtime catalog records: 73.\n- Normal identities with exactly two ordered voices: 36.\n- Colorless voices: 1.\n- Unresolved or review-required rows: 0.\n- Sound/Play collisions: 0.\n- Approved slot-2 source SHA-256: \`${digest(JSON.stringify(complements))}\`.\n`;

const outputPath = path.join(root, "docs/reports/VM-558-card-voice-semantic-owner-review.md");
if (check) {
  const actual = await readFile(outputPath, "utf8");
  assert.equal(normalizeLineEndings(actual), normalizeLineEndings(markdown), "Stale VM-558 owner-approval record");
} else {
  await writeFile(outputPath, markdown);
}

console.log(JSON.stringify({
  status: "PASS",
  approved_slot_1: anchors.length,
  owner_approved_slot_2: complements.length,
  review_required: unresolved.length,
  printing_records: printings.records.length,
  runtime_records: catalog.records.length,
  sound_play_collisions: 0,
}, null, 2));
