import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const auditRoot = path.join(root, "docs", "research", "archscry-sound-play-audit");
const checkpoint = "b7c808029421668f4b947759c467a250230b5592";
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");
const countBy = (values) => Object.fromEntries([...new Set(values)].sort().map((value) => [value, values.filter((item) => item === value).length]));

const ledger = readJson("docs/research/archscry-sound-play-audit/card-evidence-ledger.json");
const summary = readJson("docs/research/archscry-sound-play-audit/evidence-summary.json");
const manifest = readJson("docs/research/archscry-sound-play-audit/source-inspection-manifest.json");
const officialInspection = readJson("docs/research/archscry-sound-play-audit/official-source-inspection.json");
const voiceCatalog = readJson("data/dossier/card-voice-catalog.json").records;
const playCatalog = readJson("data/dossier/card-rationale-catalog.json").records;
const voiceRelationships = new Map(readJson("data/dossier/card-voice-relationships.source.json").records.map((record) => [record.relationship_id, record]));
const playRelationships = new Map(readJson("data/dossier/card-rationale-relationships.source.json").records.map((record) => [record.relationship_id, record]));
const scryfallById = new Map(readJson("data/scryfall/raw/oracle-cards.json").map((card) => [card.id, card]));
const officialByUrl = new Map(officialInspection.sources.map((source) => [source.requested_url.split("#")[0], source]));

const packetFiles = fs.readdirSync(path.join(auditRoot, "identity-evidence")).filter((name) => /^\d{2}-[a-z0-9]+-identity-evidence\.md$/.test(name)).sort();
assert(packetFiles.length === 37, `Expected 37 identity packets, found ${packetFiles.length}`);

const rows = ledger.rendered_rows;
assert(rows.length === 119, `Expected 119 rendered rows, found ${rows.length}`);
assert(rows.filter((row) => row.surface === "SOUND").length === 73, "Sound coverage drift");
assert(rows.filter((row) => row.surface === "PLAY").length === 46, "Play coverage drift");
assert(new Set(rows.map((row) => row.ledger_id)).size === 119, "Duplicate ledger IDs");
assert(ledger.suppressed_play_coverage_appendix.length === 4, "Suppression appendix must contain exactly four rows");

const suppressedIds = new Set(ledger.suppressed_play_coverage_appendix.map((row) => row.relationship_id));
assert(playCatalog.length === 50, `Expected 50 approved Play records, found ${playCatalog.length}`);
assert(suppressedIds.size === 4, "Suppressed relationship IDs must be unique");
for (const expected of ["cardrel_wu_c46718dc", "cardrel_ur_f787c6cf", "cardrel_lorehold_5c40a8d4", "cardrel_auto_colorless_ec726c54_987b_48ed_8ffa_ec73a5e35333"]) {
  assert(suppressedIds.has(expected), `Missing suppressed Play relationship ${expected}`);
}

const voiceByRelationship = new Map(voiceCatalog.map((record) => [record.relationship_id, record]));
const playByRelationship = new Map(playCatalog.map((record) => [record.relationship_id, record]));
const allowedDispositions = new Set(["NO_CHANGE_INDICATED", "REMEDIATION_LIKELY", "SOURCE_INTAKE_REQUIRED", "INSUFFICIENT_EVIDENCE", "INSUFFICIENT_VOX_MANA_AUTHORITY", "CONFLICT_REQUIRES_OWNER"]);
const allowedClasses = new Set(["DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION", "SUPPORTED_INTERPRETATION", "VOX_MANA_INTERPRETATION"]);

let inspectedEvidenceUses = 0;
let unavailableEvidenceUses = 0;
let uninspectedRecordUses = 0;
for (const row of rows) {
  assert(allowedDispositions.has(row.findings.disposition), `${row.ledger_id} has invalid disposition`);
  assert(allowedClasses.has(row.audit_inference.classification), `${row.ledger_id} has invalid inference classification`);
  assert(row.routing_authority.relationship_id === row.relationship_id, `${row.ledger_id} routing relationship drift`);
  assert(row.routing_authority.raw_claim_ids.length > 0, `${row.ledger_id} lacks routing claim IDs`);
  assert(row.underlying_evidence.identity.length > 0, `${row.ledger_id} lacks identity evidence`);
  assert(row.audit_inference.modal_bridge_chain.verified_card_fact_or_flavor, `${row.ledger_id} lacks card-side modal bridge evidence`);
  assert(row.audit_inference.modal_bridge_chain.supported_identity_facet, `${row.ledger_id} lacks supported identity facet`);
  assert(row.audit_inference.modal_bridge_chain.why_this_card_helps_explain_the_facet, `${row.ledger_id} lacks particular-card bridge`);
  assert(!JSON.stringify(row).includes("UNRESOLVED_CLAIM"), `${row.ledger_id} has unresolved claim text`);

  const catalogRecord = row.surface === "SOUND" ? voiceByRelationship.get(row.relationship_id) : playByRelationship.get(row.relationship_id);
  assert(catalogRecord, `${row.ledger_id} relationship is absent from current production catalog`);
  const relationshipRecord = row.surface === "SOUND" ? voiceRelationships.get(row.relationship_id) : playRelationships.get(row.relationship_id);
  assert(relationshipRecord, `${row.ledger_id} relationship is absent from approved relationship source`);
  assert(catalogRecord.card.name === row.card_name, `${row.ledger_id} card name drift`);
  assert(catalogRecord.card.scryfall_id === row.exact_printing_id, `${row.ledger_id} exact printing drift`);
  assert(catalogRecord.card.oracle_id === row.oracle_id, `${row.ledger_id} Oracle identity drift`);
  if (row.surface === "SOUND") {
    assert(catalogRecord.excerpt === row.current_tile_text, `${row.ledger_id} Sound tile text drift`);
    assert(catalogRecord.modal_explanation === row.current_modal_text, `${row.ledger_id} Sound modal text drift`);
  } else {
    assert(catalogRecord.rationale === row.current_tile_text, `${row.ledger_id} Play tile text drift`);
    assert(catalogRecord.modal_explanation === row.current_modal_text, `${row.ledger_id} Play modal text drift`);
    assert(!suppressedIds.has(row.relationship_id), `${row.ledger_id} is both rendered and suppressed`);
  }

  const card = scryfallById.get(row.exact_printing_id);
  assert(card, `${row.ledger_id} exact Scryfall object is absent from committed bulk`);
  assert(card.oracle_id === row.oracle_id, `${row.ledger_id} Scryfall Oracle mismatch`);

  for (const facet of row.underlying_evidence.identity) {
    assert(facet.claim_statement && facet.claim_statement !== "UNRESOLVED_CLAIM", `${row.ledger_id}/${facet.claim_id} lacks claim statement`);
    assert(facet.underlying_evidence.length > 0, `${row.ledger_id}/${facet.claim_id} lacks underlying evidence`);
    for (const evidence of facet.underlying_evidence) {
      if (evidence.local_inspection) {
        const absolute = path.join(root, evidence.local_inspection.path);
        assert(fs.existsSync(absolute), `Missing local evidence ${evidence.local_inspection.path}`);
        assert(sha256(fs.readFileSync(absolute)) === evidence.local_inspection.sha256, `Local evidence checksum drift ${evidence.local_inspection.path}`);
        inspectedEvidenceUses += 1;
      } else if (evidence.official_web_inspection) {
        const inspection = officialByUrl.get(evidence.official_web_inspection.requested_url.split("#")[0]);
        assert(inspection, `Official inspection record missing for ${evidence.source_path_or_url}`);
        if (inspection.inspection_status === "INSPECTED_OFFICIAL_WEB") inspectedEvidenceUses += 1;
        else unavailableEvidenceUses += 1;
      } else {
        uninspectedRecordUses += 1;
        assert(row.findings.disposition === "SOURCE_INTAKE_REQUIRED" || row.routing_authority.independent_underlying_corroboration_count > 0,
          `${row.ledger_id} relies on an uninspected source record without a source-intake disposition or independent inspected support`);
      }
    }
  }
}

assert(manifest.local_sources.length === 76, `Expected 76 readable local sources/ledgers, found ${manifest.local_sources.length}`);
for (const source of manifest.local_sources) {
  const absolute = path.join(root, source.path);
  assert(fs.existsSync(absolute), `Manifest local source missing: ${source.path}`);
  const body = fs.readFileSync(absolute);
  assert(body.length === source.bytes, `Manifest byte count drift: ${source.path}`);
  assert(sha256(body) === source.sha256, `Manifest checksum drift: ${source.path}`);
}
assert(officialInspection.sources.length === 28, "Expected 28 unique official Wizards URLs");
assert(new Set(officialInspection.sources.map((source) => source.requested_url)).size === 28, "Official Wizards URLs are not unique");
assert(officialInspection.sources.filter((source) => source.inspection_status === "INSPECTED_OFFICIAL_WEB").length === 26, "Expected 26 inspected Wizards URLs");
assert(officialInspection.sources.filter((source) => source.inspection_status === "SOURCE_INTAKE_REQUIRED").length === 2, "Expected two unavailable/inadequate Wizards URLs");
assert(manifest.official_web_sources.length === 28, "Inspection manifest official-source count drift");

const consequences = summary.source_validation.exact_row_level_consequences;
assert(consequences.boros_legion.source_intake_required.join() === "PLAY-WR-4-cardrel_wr_aa219936", "Boros broken-route consequence drift");
assert(consequences.gatecrash_part_2.source_intake_required.join() === "PLAY-RG-4-cardrel_rg_6ed13a89", "Gatecrash broken-route consequence drift");
assert(rows.find((row) => row.ledger_id === consequences.boros_legion.source_intake_required[0]).findings.disposition === "SOURCE_INTAKE_REQUIRED", "Feather source-intake disposition missing");
assert(rows.find((row) => row.ledger_id === consequences.gatecrash_part_2.source_intake_required[0]).findings.disposition === "SOURCE_INTAKE_REQUIRED", "Ruric source-intake disposition missing");
for (const id of [...consequences.boros_legion.retained_current_disposition, ...consequences.gatecrash_part_2.retained_current_disposition]) {
  assert(rows.find((row) => row.ledger_id === id).findings.disposition !== "SOURCE_INTAKE_REQUIRED", `${id} was incorrectly changed merely because it references a broken URL`);
}

const dispositions = countBy(rows.map((row) => row.findings.disposition));
const classifications = countBy(rows.map((row) => row.audit_inference.classification));
assert(JSON.stringify(dispositions) === JSON.stringify(summary.disposition_counts), "Summary disposition counts drift");
assert(JSON.stringify(classifications) === JSON.stringify(summary.claim_classification_counts), "Summary classification counts drift");
assert(JSON.stringify(dispositions) === JSON.stringify({ INSUFFICIENT_VOX_MANA_AUTHORITY: 2, NO_CHANGE_INDICATED: 65, REMEDIATION_LIKELY: 49, SOURCE_INTAKE_REQUIRED: 3 }), "Final disposition baseline drift");

const changedTracked = execFileSync("git", ["diff", "--name-only", checkpoint, "--"], { cwd: root, encoding: "utf8" }).trim().split(/\r?\n/).filter(Boolean);
const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard"], { cwd: root, encoding: "utf8" }).trim().split(/\r?\n/).filter(Boolean);
const changed = [...new Set([...changedTracked, ...untracked])];
const allowed = (file) =>
  file === "docs/kanban/board.md"
  || /^docs\/kanban\/(in-progress|done)\/VM-561-/.test(file)
  || /^docs\/research\/archscry-sound-play-audit\//.test(file)
  || /^docs\/handoffs\//.test(file)
  || file === "scripts/vm561-sound-play-evidence-audit-tests.mjs"
  || /^outputs\/01a007e0-b631-7ca1-a18c-9f6e6ff6ff29\//.test(file);
const outOfScope = changed.filter((file) => !allowed(file));
assert(outOfScope.length === 0, `Out-of-scope VM-561 changes: ${outOfScope.join(", ")}`);
assert(!changed.some((file) => file.startsWith("docs/research/canon/")), "Canon corpus changed");
assert(!changed.some((file) => file.startsWith("data/")), "Runtime/generated/catalog data changed");
assert(!changed.some((file) => /^(assets\/|src\/|index\.html$|archscry)/.test(file)), "Runtime surface changed");

console.log(JSON.stringify({
  qa_tier: "QA-0",
  identity_packets: `${packetFiles.length}/37`,
  rendered_rows: `${rows.length}/119`,
  sound_rows: `${rows.filter((row) => row.surface === "SOUND").length}/73`,
  play_rows: `${rows.filter((row) => row.surface === "PLAY").length}/46`,
  suppression_appendix: `${ledger.suppressed_play_coverage_appendix.length}/4`,
  readable_local_underlying_sources_and_ledgers: manifest.local_sources.length,
  official_wizards_urls: { evaluated: 28, inspected: 26, unavailable_or_inadequate: 2 },
  broken_route_row_consequences: {
    boros_legion: { retained: 4, source_intake_required: ["PLAY-WR-4 Feather, the Redeemed"] },
    gatecrash_part_2: { retained: 4, source_intake_required: ["PLAY-RG-4 Ruric Thar, the Unbowed"] },
  },
  evidence_use_counts: { inspected: inspectedEvidenceUses, unavailable_route: unavailableEvidenceUses, uninspected_source_record: uninspectedRecordUses },
  final_disposition_counts: dispositions,
  final_claim_classification_counts: classifications,
  byte_stable_generation_sha256: digestAfterSecond,
  protected_surface_changes: 0,
}, null, 2));
