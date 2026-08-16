import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const repoRoot = process.env.VM561_REPO_ROOT || process.cwd();
const outputDir = process.env.VM561_OUTPUT_DIR || path.join(repoRoot, "outputs", "vm561");
const previewDir = process.env.VM561_PREVIEW_DIR || path.join(outputDir, "previews");
const ledger = JSON.parse(await fs.readFile(path.join(repoRoot, "docs", "research", "archscry-sound-play-audit", "card-evidence-ledger.json"), "utf8"));

const workbook = Workbook.create();
const rendered = workbook.worksheets.add("Rendered Rows");
const summary = workbook.worksheets.add("Summary");
const facets = workbook.worksheets.add("Identity Facets");
const suppressed = workbook.worksheets.add("Suppressed Play Appendix");
const definitions = workbook.worksheets.add("Definitions");

const dark = "#1D2233";
const plum = "#5B3A70";
const parchment = "#F7F1E8";
const gold = "#C89B3C";
const light = "#F4F1F8";
const gray = "#6B7280";
const green = "#DDF2E1";
const amber = "#FFF0C2";
const red = "#F8D7DA";
const blue = "#DDEBF7";

function flattenIdentityEvidence(row) {
  return row.underlying_evidence.identity.map((item) => (
    `${item.facet_id}/${item.claim_id}: ${item.claim_statement} -> ${item.underlying_evidence.map((evidence) => `${evidence.source_id} | ${evidence.source_path_or_url} | ${evidence.anchor} | ${evidence.local_inspection?.inspection_status || evidence.official_web_inspection?.inspection_status || "UNINSPECTED_SOURCE_RECORD"} | ${evidence.establishes}`).join(" || ")}`
  )).join(" || ");
}

function bridgeChain(row) {
  const chain = row.audit_inference.modal_bridge_chain;
  return `${chain.verified_card_fact_or_flavor} -> ${chain.supported_identity_facet} -> ${chain.why_this_card_helps_explain_the_facet}`;
}

const headers = [
  "Ledger ID", "Identity Key", "Identity Name", "Surface", "Order", "Card Name",
  "Tile Label", "Current Tile Text", "Visible Tags", "Modal Heading", "Current Modal Text",
  "Type Line", "Exact Printing/Object ID", "Oracle ID", "Set", "Collector No.", "Relationship ID", "Relationship Class",
  "Routing Raw Claim IDs", "Routing Source/Evidence IDs", "Common Provenance Lineages", "Independent Corroboration Count",
  "Underlying Card Source", "Underlying Card Fact", "Underlying Identity Evidence", "Gameplay Evidence",
  "Relevant Facet IDs", "Modal Bridge Chain", "Inference Classification", "Inference Limitation", "Unsupported Assumption",
  "Accuracy", "Authority", "Bridge", "Echo", "Cross-Card Repetition", "Deletion", "Swap", "Modal Value",
  "Facet Collapse", "Overclaim", "Human Language", "Disposition", "Audit Notes",
];
const rows = ledger.rendered_rows.map((row) => [
  row.ledger_id, row.identity_key, row.identity_name, row.surface, row.slot_order, row.card_name,
  row.current_tile_label, row.current_tile_text, row.current_visible_tags.join("; "), row.current_modal_heading, row.current_modal_text,
  row.type_line, row.exact_printing_id, row.oracle_id, row.exact_set, row.exact_collector_number, row.relationship_id, row.relationship_class,
  row.routing_authority.raw_claim_ids.join("; "), row.routing_authority.source_evidence_ledger_ids.join("; "),
  row.routing_authority.common_provenance_lineages.map((lineage) => `${lineage.lineage_id}: ${lineage.source_path_or_url} [${lineage.inspection_status}]`).join("; "),
  row.routing_authority.independent_underlying_corroboration_count,
  row.underlying_evidence.card_fact.source,
  `${row.underlying_evidence.card_fact.type_line} | ${row.underlying_evidence.card_fact.oracle_text} | ${row.underlying_evidence.card_fact.flavor_text}`,
  flattenIdentityEvidence(row), row.underlying_evidence.gameplay?.establishes || "NOT_APPLICABLE",
  row.audit_inference.relevant_facet_ids.join("; "), bridgeChain(row), row.audit_inference.classification, row.audit_inference.limitation,
  row.audit_inference.unsupported_assumption_status,
  row.findings.accuracy_finding, row.findings.authority_finding, row.findings.bridge_finding, row.findings.echo_finding,
  row.findings.cross_card_repetition_finding, row.findings.deletion_finding, row.findings.swap_finding, row.findings.modal_value_finding,
  row.findings.facet_collapse_finding, row.findings.overclaim_finding, row.findings.human_language_finding,
  row.findings.disposition, row.findings.notes,
]);

rendered.showGridLines = false;
rendered.mergeCells("A1:AR1");
rendered.getRange("A1").values = [["VM-561 - 119 Rendered Sound/Play Card Evidence Ledger"]];
rendered.getRange("A1:AR1").format = { fill: dark, font: { bold: true, color: "#FFFFFF", size: 16 }, verticalAlignment: "center" };
rendered.getRange("A1:AR1").format.rowHeight = 30;
rendered.mergeCells("A2:AR2");
rendered.getRange("A2").values = [["Evidence-only testing artifact. Routing authority, underlying evidence, and audit inference remain separate; no current prose is rewritten here."]];
rendered.getRange("A2:AR2").format = { fill: parchment, font: { italic: true, color: dark }, wrapText: true, verticalAlignment: "center" };
rendered.getRange("A3:AR3").values = [headers];
rendered.getRange("A4:AR122").values = rows;
rendered.getRange("A3:AR3").format = { fill: plum, font: { bold: true, color: "#FFFFFF" }, wrapText: true, verticalAlignment: "center" };
rendered.getRange("A4:AR122").format = { fill: "#FFFFFF", font: { color: dark, size: 9 }, wrapText: true, verticalAlignment: "top" };
rendered.getRange("A3:AR122").format.borders = { insideHorizontal: { style: "thin", color: "#E6E0EB" }, bottom: { style: "thin", color: "#D6CEDC" } };
rendered.getRange("A3:AR122").format.rowHeight = 66;
rendered.getRange("A3:AR3").format.rowHeight = 46;
rendered.freezePanes.freezeRows(3);
rendered.freezePanes.freezeColumns(6);
rendered.tables.add("A3:AR122", true, "RenderedEvidenceRows").style = "TableStyleMedium4";

const narrowColumns = ["A:A", "B:B", "D:E", "M:R", "V:W", "AA:AA", "AC:AQ"];
for (const range of narrowColumns) rendered.getRange(range).format.columnWidth = 16;
rendered.getRange("C:C").format.columnWidth = 22;
rendered.getRange("F:F").format.columnWidth = 25;
rendered.getRange("G:G").format.columnWidth = 18;
rendered.getRange("H:H").format.columnWidth = 48;
rendered.getRange("I:I").format.columnWidth = 18;
rendered.getRange("J:J").format.columnWidth = 38;
rendered.getRange("K:K").format.columnWidth = 52;
rendered.getRange("L:L").format.columnWidth = 28;
rendered.getRange("S:U").format.columnWidth = 34;
rendered.getRange("X:Z").format.columnWidth = 56;
rendered.getRange("AB:AB").format.columnWidth = 20;
rendered.getRange("AR:AR").format.columnWidth = 54;

const dispositionRange = rendered.getRange("AQ4:AQ122");
dispositionRange.conditionalFormats.add("containsText", { text: "NO_CHANGE_INDICATED", format: { fill: green, font: { color: "#1F5132", bold: true } } });
dispositionRange.conditionalFormats.add("containsText", { text: "REMEDIATION_LIKELY", format: { fill: amber, font: { color: "#6B4A00", bold: true } } });
dispositionRange.conditionalFormats.add("containsText", { text: "SOURCE_INTAKE_REQUIRED", format: { fill: blue, font: { color: "#244A63", bold: true } } });
dispositionRange.conditionalFormats.add("containsText", { text: "INSUFFICIENT", format: { fill: red, font: { color: "#7A1E25", bold: true } } });

summary.showGridLines = false;
summary.mergeCells("A1:H1");
summary.getRange("A1").values = [["VM-561 Evidence Audit Summary"]];
summary.getRange("A1:H1").format = { fill: dark, font: { bold: true, color: "#FFFFFF", size: 16 } };
summary.getRange("A3:B3").values = [["Coverage", "Count"]];
summary.getRange("A4:A8").values = [["Rendered rows"], ["Sound rows"], ["Play rows"], ["Identities"], ["Suppressed Play appendix"]];
summary.getRange("B4:B8").formulas = [["=COUNTA('Rendered Rows'!$A$4:$A$122)"], ["=COUNTIF('Rendered Rows'!$D$4:$D$122,\"SOUND\")"], ["=COUNTIF('Rendered Rows'!$D$4:$D$122,\"PLAY\")"], ["=COUNTA('Identity Facets'!$A$4:$A$40)"], ["=COUNTA('Suppressed Play Appendix'!$A$4:$A$7)"]];
summary.getRange("D3:E3").values = [["Disposition", "Count"]];
const dispositions = ["NO_CHANGE_INDICATED", "REMEDIATION_LIKELY", "SOURCE_INTAKE_REQUIRED", "INSUFFICIENT_EVIDENCE", "INSUFFICIENT_VOX_MANA_AUTHORITY", "CONFLICT_REQUIRES_OWNER"];
summary.getRange("D4:D9").values = dispositions.map((value) => [value]);
summary.getRange("E4").formulas = [["=COUNTIF('Rendered Rows'!$AQ$4:$AQ$122,D4)"]];
summary.getRange("E4:E9").fillDown();
summary.getRange("G3:H3").values = [["Claim Classification", "Count"]];
const classes = ["DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION", "SUPPORTED_INTERPRETATION", "VOX_MANA_INTERPRETATION"];
summary.getRange("G4:G6").values = classes.map((value) => [value]);
summary.getRange("H4").formulas = [["=COUNTIF('Rendered Rows'!$AC$4:$AC$122,G4)"]];
summary.getRange("H4:H6").fillDown();
summary.getRange("A11:H11").merge();
summary.getRange("A11").values = [["Interpretation guardrails"]];
summary.getRange("A12:H16").merge(true);
summary.getRange("A12:A16").values = [
  ["Routing IDs are provenance, not proof. Every row separately records the underlying source and audit inference."],
  ["Derived repetition is one lineage; it does not count as independent corroboration."],
  ["Tile = concise belonging reason. Modal = deeper card-to-facet understanding. MODAL_REDUNDANT is a content-design finding, not an invitation to invent novelty."],
  ["Cross-card repetition is classified as legitimate shared concept, generic template reuse, facet collapse, or evidence limitation."],
  ["The primary ledger is fixed at 119 rendered rows; four approved precon-overlap Play records remain in the separate appendix."],
];
for (const range of ["A3:B3", "D3:E3", "G3:H3", "A11:H11"]) summary.getRange(range).format = { fill: plum, font: { bold: true, color: "#FFFFFF" } };
summary.getRange("A3:H16").format.wrapText = true;
summary.getRange("A3:H16").format.verticalAlignment = "top";
summary.getRange("A:A").format.columnWidth = 27;
summary.getRange("B:B").format.columnWidth = 12;
summary.getRange("C:C").format.columnWidth = 4;
summary.getRange("D:D").format.columnWidth = 34;
summary.getRange("E:E").format.columnWidth = 12;
summary.getRange("F:F").format.columnWidth = 4;
summary.getRange("G:G").format.columnWidth = 42;
summary.getRange("H:H").format.columnWidth = 14;
summary.getRange("A12:H16").format.rowHeight = 34;

const facetMap = new Map();
for (const row of ledger.rendered_rows) {
  for (const item of row.underlying_evidence.identity) {
    if (item.facet_id === "BOUNDARY_ONLY") continue;
    facetMap.set(`${row.identity_key}|${item.facet_id}`, {
      identity_key: row.identity_key,
      identity_name: row.identity_name,
      facet_id: item.facet_id,
      claim_id: item.claim_id,
      classification: item.claim_classification,
      statement: item.claim_statement,
      underlying: item.underlying_evidence.map((evidence) => `${evidence.source_id} | ${evidence.source_path_or_url} | ${evidence.anchor} | ${evidence.establishes}`).join(" || "),
    });
  }
}
const facetRows = [...facetMap.values()].sort((a, b) => a.identity_key.localeCompare(b.identity_key, "en") || a.facet_id.localeCompare(b.facet_id, "en"));
facets.showGridLines = false;
facets.mergeCells("A1:G1");
facets.getRange("A1").values = [["Identity Facets Used by the 119 Rendered Rows"]];
facets.getRange("A1:G1").format = { fill: dark, font: { bold: true, color: "#FFFFFF", size: 15 } };
facets.getRange("A3:G3").values = [["Identity Key", "Identity Name", "Facet ID", "Raw Claim ID", "Classification", "Source-Supported Statement", "Underlying Evidence"]];
facets.getRange(`A4:G${facetRows.length + 3}`).values = facetRows.map((row) => [row.identity_key, row.identity_name, row.facet_id, row.claim_id, row.classification, row.statement, row.underlying]);
facets.getRange("A3:G3").format = { fill: plum, font: { bold: true, color: "#FFFFFF" }, wrapText: true };
facets.getRange(`A4:G${facetRows.length + 3}`).format = { wrapText: true, verticalAlignment: "top", font: { size: 9 } };
facets.tables.add(`A3:G${facetRows.length + 3}`, true, "IdentityFacetEvidence").style = "TableStyleMedium4";
facets.freezePanes.freezeRows(3);
facets.freezePanes.freezeColumns(3);
facets.getRange("A:A").format.columnWidth = 15;
facets.getRange("B:B").format.columnWidth = 24;
facets.getRange("C:E").format.columnWidth = 24;
facets.getRange("F:F").format.columnWidth = 58;
facets.getRange("G:G").format.columnWidth = 70;
facets.getRange(`A4:G${facetRows.length + 3}`).format.rowHeight = 60;

suppressed.showGridLines = false;
suppressed.mergeCells("A1:G1");
suppressed.getRange("A1").values = [["Four Approved Play Relationships Suppressed by Precon Cross-Surface Deduplication"]];
suppressed.getRange("A1:G1").format = { fill: dark, font: { bold: true, color: "#FFFFFF", size: 14 } };
suppressed.getRange("A2:G2").merge();
suppressed.getRange("A2").values = [["Coverage appendix only. These four are not part of the 119 rendered-row ledger."]];
suppressed.getRange("A2:G2").format = { fill: parchment, font: { italic: true, color: dark } };
suppressed.getRange("A3:G3").values = [["Identity", "Card", "Relationship ID", "Structured Source", "Why Media-Inventoried", "Why Not Rendered", "Visible Precon Source"]];
suppressed.getRange("A4:G7").values = ledger.suppressed_play_coverage_appendix.map((row) => [row.identity_key, row.card_name, row.relationship_id, row.structured_source_surface, row.media_inventory_reason, row.rendered_row_reason, row.visible_precon_source]);
suppressed.getRange("A3:G3").format = { fill: plum, font: { bold: true, color: "#FFFFFF" }, wrapText: true };
suppressed.getRange("A4:G7").format = { wrapText: true, verticalAlignment: "top" };
suppressed.getRange("A:A").format.columnWidth = 16;
suppressed.getRange("B:B").format.columnWidth = 28;
suppressed.getRange("C:D").format.columnWidth = 40;
suppressed.getRange("E:G").format.columnWidth = 58;
suppressed.getRange("A4:G7").format.rowHeight = 84;

definitions.showGridLines = false;
definitions.mergeCells("A1:D1");
definitions.getRange("A1").values = [["VM-561 Ledger Definitions"]];
definitions.getRange("A1:D1").format = { fill: dark, font: { bold: true, color: "#FFFFFF", size: 15 } };
const definitionRows = [
  ["ROUTING_AUTHORITY", "Provenance/navigation", "Raw claim, relationship, and evidence/source IDs", "Never sufficient proof by itself."],
  ["UNDERLYING_EVIDENCE", "Evidence", "Exact local source or official URL, anchor, and what it establishes", "Derivative files do not multiply corroboration."],
  ["AUDIT_INFERENCE", "Judgment", "Card fact/flavor -> supported identity facet -> why this card teaches it", "Unsupported arrows are findings."],
  ["MODAL_REDUNDANT", "Modal value", "Modal paraphrases the tile/evidence, adds generic identity copy, or no new card/facet insight", "Do not invent novelty when the evidence has no deeper honest point."],
  ["LEGITIMATE_SHARED_CONCEPT", "Repetition", "Different card evidence illuminates the same supported facet", "No rewrite required merely for lexical variety."],
  ["GENERIC_TEMPLATE_REUSE", "Repetition", "Wording/reasoning can move between cards with little loss", "Usually remediation-likely."],
  ["FACET_COLLAPSE", "Repetition", "Multiple cards forced through one broad idea despite stronger distinct facets", "Requires later calibration, not an automatic rewrite here."],
  ["EVIDENCE_LIMITATION", "Repetition", "Narrow repetition reflects a genuinely narrow source model", "Record the limit; do not fabricate breadth."],
  ["NO_CHANGE_INDICATED", "Disposition", "No current finding strong enough to recommend remediation", "Not permanent semantic certification."],
  ["REMEDIATION_LIKELY", "Disposition", "Current content has a supported accuracy/value/bridge/language issue", "No replacement prose is proposed in this phase."],
  ["SOURCE_INTAKE_REQUIRED", "Disposition", "Stronger underlying source is needed before the bridge can be certified", "Do not infer around the gap."],
  ["INSUFFICIENT_EVIDENCE", "Disposition", "Available card/identity evidence cannot establish the bridge", "Do not fill with broad identity language."],
  ["INSUFFICIENT_VOX_MANA_AUTHORITY", "Disposition", "The proposed narrow interpretation exceeds current Vox Mana authority", "Owner/source work is needed before remediation."],
  ["CONFLICT_REQUIRES_OWNER", "Disposition", "Controlling sources or product boundaries conflict", "Stop for owner judgment."],
];
definitions.getRange("A3:D3").values = [["Term", "Dimension", "Meaning", "Audit Rule"]];
definitions.getRange(`A4:D${definitionRows.length + 3}`).values = definitionRows;
definitions.getRange("A3:D3").format = { fill: plum, font: { bold: true, color: "#FFFFFF" } };
definitions.getRange(`A4:D${definitionRows.length + 3}`).format = { wrapText: true, verticalAlignment: "top" };
definitions.getRange("A:A").format.columnWidth = 34;
definitions.getRange("B:B").format.columnWidth = 22;
definitions.getRange("C:D").format.columnWidth = 58;
definitions.getRange(`A4:D${definitionRows.length + 3}`).format.rowHeight = 50;

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const overview = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 3000 });
console.log(overview.ndjson);
const renderedCheck = await workbook.inspect({ kind: "table", range: "Summary!A1:H16", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 8, maxChars: 7000 });
console.log(renderedCheck.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan", maxChars: 4000 });
console.log(errors.ndjson);

const previewSpecs = [
  ["Rendered Rows", "A1:AR12", "rendered-rows.png"],
  ["Summary", "A1:H16", "summary.png"],
  ["Identity Facets", "A1:G14", "identity-facets.png"],
  ["Suppressed Play Appendix", "A1:G7", "suppressed-play.png"],
  ["Definitions", "A1:D17", "definitions.png"],
];
for (const [sheetName, range, filename] of previewSpecs) {
  const preview = await workbook.render({ sheetName, range, scale: 0.8, format: "png" });
  await fs.writeFile(path.join(previewDir, filename), new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
const outputPath = path.join(outputDir, "VM-561-Sound-Play-Card-Evidence-Ledger.xlsx");
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, renderedRows: rows.length, facets: facetRows.length, suppressedRows: ledger.suppressed_play_coverage_appendix.length, previews: previewSpecs.length }));
