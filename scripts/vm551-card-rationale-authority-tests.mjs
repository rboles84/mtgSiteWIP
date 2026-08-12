import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  auditCandidates,
  buildRuntimeCatalog,
  validateRelationshipSource,
} from "../research/build-card-rationale-artifacts.mjs";

const readJson = async (relativePath) => JSON.parse(await readFile(new URL(relativePath, import.meta.url), "utf8"));
const source = await readJson("../data/dossier/card-rationale-relationships.source.json");
const catalog = await readJson("../data/dossier/card-rationale-catalog.json");
const audit = await auditCandidates();

assert.equal(new Set(audit.rows.map((row) => row.identityKey)).size, 37, "all 37 identities must be audited");
assert.equal(audit.rows.length, 125, "the raw/generated union must retain all reviewed candidates");
assert.equal(audit.rows.filter((row) => row.generatedOnly).length, 3, "generated-only candidates must remain traceable");
assert.equal(source.records.length, 26, "expected only direct native anchors in the owner-review packet");
assert.ok(source.records.every((record) => record.review_status === "REVIEW_REQUIRED"));
assert.equal(source.records.filter((record) => record.proposal_origin === "NEW_SOURCE_BOUNDED_DRAFT").length, 4);
assert.equal(catalog.records.length, 0, "review-required rationale must not leak into runtime");
assert.equal(validateRelationshipSource(source, audit), true);
assert.deepEqual(catalog, buildRuntimeCatalog(source), "generated runtime catalog must be deterministic");

const clone = (value) => structuredClone(value);
const expectFailure = (mutate, pattern) => {
  const fixture = clone(source);
  mutate(fixture);
  assert.throws(() => validateRelationshipSource(fixture, audit), pattern);
};

expectFailure((fixture) => { fixture.records.push(clone(fixture.records[0])); }, /Duplicate or missing relationship ID/);
expectFailure((fixture) => { fixture.records[0].certified_identity_claim_ids = ["missing_claim"]; }, /Unresolved substantive identity claim/);
expectFailure((fixture) => { fixture.records[0].source_ids = ["missing_source"]; }, /Unresolved source ID/);
expectFailure((fixture) => { fixture.records[0].canonical_card_id = "00000000-0000-0000-0000-000000000000"; }, /Card locator mismatch/);
expectFailure((fixture) => { fixture.records[0].source_locators = []; }, /Missing exact source locator/);
for (const evidenceClass of ["COLOR_ONLY", "TAG_ONLY", "GENERIC_MECHANIC_ONLY", "PRODUCT_ONLY", "GENERATED_FALLBACK"]) {
  expectFailure((fixture) => { fixture.records[0].relationship_evidence.evidence_class = evidenceClass; }, /Unsupported relationship bridge/);
}
expectFailure((fixture) => {
  fixture.records[0].review_status = "APPROVED_PUBLIC";
  fixture.records[0].owner_approval = null;
}, /explicit owner approval/);
expectFailure((fixture) => {
  fixture.records[0].review_status = "APPROVED_PUBLIC";
  fixture.records[0].owner_approval = { approved_by: "owner", decision_locator: "fixture" };
  fixture.records[0].proposed_public_rationale = "This card proves you are this identity.";
}, /unsupported language/);

const approvedFixture = clone(source);
approvedFixture.records[0].review_status = "APPROVED_PUBLIC";
approvedFixture.records[0].owner_approval = { approved_by: "test fixture", decision_locator: "scripts/vm551-card-rationale-authority-tests.mjs" };
validateRelationshipSource(approvedFixture, audit);
const approvedCatalog = buildRuntimeCatalog(approvedFixture);
assert.equal(approvedCatalog.records.length, 1);
assert.equal(approvedCatalog.records[0].rationale, approvedFixture.records[0].proposed_public_rationale);
assert.ok(approvedCatalog.records[0].provenance.claim_ids.length);
assert.ok(approvedCatalog.records[0].provenance.source_ids.length);

for (const inventoryPath of [
  "../docs/audits/vm551-all-37-card-rationale-source-hardening/baseline-inventory.tsv",
  "../docs/audits/vm551-all-37-card-rationale-source-hardening/post-hardening-inventory.tsv",
]) {
  const rows = (await readFile(new URL(inventoryPath, import.meta.url), "utf8")).trimEnd().split(/\r?\n/);
  assert.equal(rows.length, 38, `${inventoryPath} must contain one header and exactly 37 identity rows`);
  const identities = rows.slice(1).map((row) => row.split("\t", 1)[0]);
  assert.equal(new Set(identities).size, 37, `${inventoryPath} must not duplicate identities`);
}

globalThis.VM_SESSION = { profile: null, username: "" };
globalThis.window = { addEventListener() {}, location: { href: "http://localhost/archscry/" }, history: { replaceState() {} } };
globalThis.document = {
  addEventListener() {}, querySelectorAll() { return []; }, querySelector() { return null; }, getElementById() { return null; }, body: {},
  createElement() { return { className: "", textContent: "", append() {}, classList: { add() {}, remove() {}, toggle() {} } }; },
};
const { approvedCardRationaleForFaction, buildFlavorEchoesHtml, selectApprovedCardRationales } = await import("../assets/js/index.js");
const commanderIndex = (await readJson("../data/scryfall/indexes/commander-index.json")).commanders;
const normalizeRuntimeName = (value) => String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const byName = new Map(commanderIndex.map((card) => [normalizeRuntimeName(card.name), card]));
const fixtureRecord = approvedCatalog.records[0];
const fixtureFaction = { key: fixtureRecord.identity_key };
const fixtureCard = byName.get(normalizeRuntimeName(fixtureRecord.card.name));
const runtimeLookup = new Map([[normalizeRuntimeName(fixtureRecord.card.name), fixtureCard]]);
const selected = selectApprovedCardRationales({ faction: fixtureFaction, catalog: approvedCatalog, cardByName: runtimeLookup });
assert.equal(selected.length, 1);
assert.equal(selected[0].rationale.text, fixtureRecord.rationale);
const html = buildFlavorEchoesHtml(selected, fixtureFaction, approvedCatalog);
assert.match(html, /Why These Cards Echo This Reading/);
assert.match(html, new RegExp(fixtureRecord.rationale.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
assert.match(html, /data-card-rationale=/);
assert.equal(selectApprovedCardRationales({ faction: { key: "COLORLESS" }, catalog, cardByName: runtimeLookup }).length, 0);
assert.equal(buildFlavorEchoesHtml([], { key: "COLORLESS" }, catalog), "");
assert.equal(approvedCardRationaleForFaction(fixtureCard, { key: "COLORLESS" }, approvedCatalog), null, "same card cannot cross identities without an approved relationship");

console.log(JSON.stringify({
  status: "PASS",
  identities: 37,
  candidates_reviewed: audit.rows.length,
  review_required: source.records.length,
  runtime_approved: catalog.records.length,
  negative_fixtures: 12,
  rendering_and_modal_rationale_parity: "PASS",
}, null, 2));
