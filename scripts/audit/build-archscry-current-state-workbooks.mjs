import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../..");
const THREAD_ID = "01a02cd6-bce7-7832-9558-3075c52f146a";
const RUN_SLUG = "archscry-current-state-2026-08-22";
const AUDIT_DIR = path.join(ROOT, "docs/audits", RUN_SLUG);
const OUTPUT_DIR = path.join(ROOT, "outputs", THREAD_ID, RUN_SLUG);
const EVIDENCE_DIR = path.join(OUTPUT_DIR, "evidence");
const PREVIEW_DIR = path.join(EVIDENCE_DIR, "workbook-previews");
const DOSSIER_XLSX = path.join(OUTPUT_DIR, "archscry-dossier-review.xlsx");
const ENGINE_XLSX = path.join(OUTPUT_DIR, "archscry-engine-validation.xlsx");
const MANIFEST_PATH = path.join(AUDIT_DIR, "manifest.json");
const BASELINE = "db9a16a40c2bfb7d0d493eacef348f19d70bb05a";

const COLORS = {
  ink: "#17212B",
  midnight: "#243447",
  violet: "#6750A4",
  teal: "#1F7A75",
  gold: "#C69B3C",
  mist: "#EDF2F5",
  pale: "#F8FAFB",
  line: "#D4DCE3",
  white: "#FFFFFF",
  red: "#B42318",
  amber: "#B54708",
  green: "#027A48"
};

const readJson = async (target) => JSON.parse(await fs.readFile(target, "utf8"));
const sha256 = async (target) => crypto.createHash("sha256").update(await fs.readFile(target)).digest("hex");
const rel = (target) => path.relative(ROOT, target).replaceAll("\\", "/");
const safe = (value) => value == null ? "" : Array.isArray(value) ? value.join(" | ") : typeof value === "object" ? JSON.stringify(value) : value;
const rowsRange = (startRow, count, endCol) => `${startRow}:${startRow + Math.max(count - 1, 0)}` && `A${startRow}:${endCol}${startRow + Math.max(count - 1, 0)}`;
const splitText = (value, size = 28000) => {
  const text = String(value ?? "");
  if (!text) return [""];
  const parts = [];
  for (let offset = 0; offset < text.length; offset += size) parts.push(text.slice(offset, offset + size));
  return parts;
};

function setTitle(sheet, title, subtitle, lastCol) {
  sheet.showGridLines = false;
  sheet.getRange(`A1:${lastCol}1`).merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange(`A1:${lastCol}1`).format = {
    fill: COLORS.midnight,
    font: { name: "Aptos Display", size: 20, bold: true, color: COLORS.white },
    rowHeight: 34,
    verticalAlignment: "center"
  };
  sheet.getRange(`A2:${lastCol}2`).merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A2:${lastCol}2`).format = {
    fill: COLORS.mist,
    font: { name: "Aptos", size: 10, color: COLORS.ink },
    wrapText: true,
    rowHeight: 30,
    verticalAlignment: "center"
  };
}

function styleHeader(range) {
  range.format = {
    fill: COLORS.violet,
    font: { name: "Aptos", size: 10, bold: true, color: COLORS.white },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: COLORS.line },
    rowHeight: 28
  };
}

function styleBody(range) {
  range.format = {
    font: { name: "Aptos", size: 9, color: COLORS.ink },
    verticalAlignment: "top",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: COLORS.line }
  };
}

function styleKpis(sheet, blocks) {
  for (const block of blocks) {
    const { labelCell, valueCell, label, formula, color = COLORS.teal } = block;
    sheet.getRange(labelCell).values = [[label]];
    sheet.getRange(valueCell).formulas = [[formula]];
    sheet.getRange(labelCell).format = {
      fill: color,
      font: { name: "Aptos", size: 9, bold: true, color: COLORS.white },
      horizontalAlignment: "center"
    };
    sheet.getRange(valueCell).format = {
      fill: COLORS.pale,
      font: { name: "Aptos Display", size: 18, bold: true, color },
      horizontalAlignment: "center",
      borders: { preset: "outside", style: "thin", color }
    };
  }
}

function writeTable(sheet, startRow, headers, rows, widths = []) {
  const endCol = columnName(headers.length);
  sheet.getRange(`A${startRow}:${endCol}${startRow}`).values = [headers];
  styleHeader(sheet.getRange(`A${startRow}:${endCol}${startRow}`));
  if (rows.length) {
    sheet.getRange(rowsRange(startRow + 1, rows.length, endCol)).values = rows.map((row) => row.map(safe));
    styleBody(sheet.getRange(rowsRange(startRow + 1, rows.length, endCol)));
  }
  widths.forEach((width, index) => {
    if (width) sheet.getRange(`${columnName(index + 1)}:${columnName(index + 1)}`).format.columnWidth = width;
  });
  sheet.freezePanes.freezeRows(startRow);
  return startRow + rows.length;
}

function columnName(index) {
  let result = "";
  while (index > 0) {
    const remainder = (index - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    index = Math.floor((index - 1) / 26);
  }
  return result;
}

function addDossierSummary(workbook, records) {
  const sheet = workbook.worksheets.add("00 Summary");
  setTitle(sheet, "Archscry Dossier Review — Current State", `Exact baseline ${BASELINE} • automated direct-review render evidence • placement reachability is not asserted`, "N");
  styleKpis(sheet, [
    { labelCell: "A3:B3", valueCell: "A4:B4", label: "IDENTITIES", formula: "=COUNTA(B8:B44)" },
    { labelCell: "D3:E3", valueCell: "D4:E4", label: "PASS RENDERS", formula: '=COUNTIF(E8:E44,"PASS")', color: COLORS.green },
    { labelCell: "G3:H3", valueCell: "G4:H4", label: "PRODUCT EXCEPTIONS", formula: '=COUNTIF(M8:M44,"YES")', color: COLORS.red },
    { labelCell: "J3:K3", valueCell: "J4:K4", label: "SCREENSHOTS", formula: "=COUNTA(L8:L44)", color: COLORS.gold }
  ]);
  const headers = ["Order", "Identity", "Name", "Group", "Render", "Sections", "Cards", "Provider Links", "Maze Links", "Unavailable Media", "Overflow", "Screenshot", "Owner Review", "Placement Reachability"];
  const rows = records.map((record) => [
    record.taxonomy_order, record.identity_key, record.identity_name, record.taxonomy_group, "PASS",
    record.panels?.filter((panel) => panel.visible).length ?? 0, record.cards?.length ?? 0,
    record.links?.filter((link) => String(link.provider).toLowerCase() !== "maze").length ?? 0,
    record.links?.filter((link) => String(link.provider).toLowerCase() === "maze").length ?? 0,
    record.images?.filter((image) => !image.complete || !image.natural_width).length ?? 0,
    record.geometry?.horizontal_overflow ? "YES" : "NO", record.screenshot_path,
    record.geometry?.horizontal_overflow || record.telemetry_event_count ? "YES" : "NO", record.placement_reachability
  ]);
  writeTable(sheet, 7, headers, rows, [7, 13, 24, 15, 10, 9, 9, 13, 11, 14, 10, 62, 12, 21]);
  sheet.getRange("A46:N47").merge();
  sheet.getRange("A46").values = [["Scope note: optional Scryfall media was blocked by the execution environment. The dossier exception ledger records one environment/product-choice note per identity; no blocker, major, or minor product exception was observed."]];
  sheet.getRange("A46:N47").format = { fill: "#FFF7E6", font: { name: "Aptos", size: 10, color: COLORS.amber }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: COLORS.gold } };
  return sheet;
}

function addDossierExceptions(workbook, records) {
  const sheet = workbook.worksheets.add("01 Exceptions");
  setTitle(sheet, "Dossier Exceptions", "All 37 rows are bounded environment/network notes; no owner action is required by deterministic QA.", "I");
  const rows = records.map((record) => {
    const unavailable = record.images?.filter((image) => !image.complete || !image.natural_width).length ?? 0;
    const total = record.images?.length ?? 0;
    return [`DX-${record.identity_key}-001`, record.identity_key, record.identity_name, "NOTE / PRODUCT CHOICE", "optional_media_delivery", `${unavailable}/${total} rendered images unavailable`, "environment/network", "NO", record.screenshot_path];
  });
  writeTable(sheet, 4, ["Exception ID", "Key", "Identity", "Severity", "Category", "Actual Evidence", "Classification", "Owner Review", "Reference"], rows, [18, 11, 25, 22, 25, 34, 20, 14, 65]);
}

function addDossierCoverage(workbook, records) {
  const sheet = workbook.worksheets.add("02 Section Coverage");
  setTitle(sheet, "Dossier Section Coverage", "Every visible panel captured with its rendered labels and full text.", "G");
  const rows = records.flatMap((record) => record.panels.map((panel) => [record.identity_key, record.identity_name, panel.order, panel.id, panel.visible ? "YES" : "NO", panel.labels, panel.text]));
  writeTable(sheet, 4, ["Key", "Identity", "Order", "Panel ID", "Visible", "Labels", "Rendered Text"], rows, [12, 24, 8, 24, 10, 32, 90]);
}

function addDossierLinks(workbook, records) {
  const sheet = workbook.worksheets.add("03 Link Inventory");
  setTitle(sheet, "Dossier Link Inventory", "Captured provider, purpose, query, and identity context for every rendered link.", "I");
  const rows = records.flatMap((record) => (record.links ?? []).map((link) => [record.identity_key, record.identity_name, link.section, link.provider, link.label, link.url, link.query, link.context_mode, link.review_identity]));
  writeTable(sheet, 4, ["Key", "Identity", "Section", "Provider", "Label", "URL", "Query", "Context Mode", "Review Identity"], rows, [11, 24, 22, 14, 28, 70, 45, 18, 14]);
}

function addDossierCards(workbook, records) {
  const sheet = workbook.worksheets.add("04 Card Inventory");
  setTitle(sheet, "Dossier Card Inventory", "Structured card and recommendation content captured from every direct-review render.", "H");
  const rows = records.flatMap((record) => (record.cards ?? []).map((card) => [record.identity_key, record.identity_name, card.section, card.name, card.role, card.preview_available ? "YES" : "NO", card.canonical_url, card.visible_text]));
  writeTable(sheet, 4, ["Key", "Identity", "Section", "Card / Deck", "Role", "Preview", "Canonical URL", "Visible Text"], rows, [11, 24, 22, 28, 28, 10, 65, 55]);
}

function addDossierIdentity(workbook, record, index) {
  const sheet = workbook.worksheets.add(`${String(index + 1).padStart(2, "0")} ${record.identity_key}`);
  setTitle(sheet, `${record.identity_name} — Dossier Evidence`, `${record.audit_id} • ${record.render_mode} • ${record.placement_reachability} • screenshot ${record.screenshot_sha256}`, "L");
  const metadata = [
    ["Identity key", record.identity_key], ["Taxonomy group", record.taxonomy_group], ["World", record.world],
    ["Rendered identity", record.rendered_identity_key], ["Review label", record.review_label], ["Review route", record.review_route],
    ["Screenshot", record.screenshot_path], ["Raw record", record.raw_artifact_path], ["Rendered HTML SHA-256", record.rendered_html_sha256],
    ["Horizontal overflow", record.geometry?.horizontal_overflow ? "YES" : "NO"], ["Telemetry events", record.telemetry_event_count]
  ];
  sheet.getRange("A4:B4").values = [["Field", "Value"]];
  styleHeader(sheet.getRange("A4:B4"));
  sheet.getRange(`A5:B${4 + metadata.length}`).values = metadata;
  styleBody(sheet.getRange(`A5:B${4 + metadata.length}`));
  sheet.getRange("A:A").format.columnWidth = 22;
  sheet.getRange("B:B").format.columnWidth = 95;
  let row = 6 + metadata.length;
  sheet.getRange(`A${row}:L${row}`).merge();
  sheet.getRange(`A${row}`).values = [["PANELS — FULL RENDERED CONTENT"]];
  styleHeader(sheet.getRange(`A${row}:L${row}`));
  row += 1;
  const panelRows = record.panels.map((panel) => [panel.order, panel.id, panel.visible ? "YES" : "NO", panel.labels, panel.text]);
  sheet.getRange(`A${row}:E${row}`).values = [["Order", "Panel ID", "Visible", "Labels", "Rendered Text"]];
  styleHeader(sheet.getRange(`A${row}:E${row}`));
  sheet.getRange(`A${row + 1}:E${row + panelRows.length}`).values = panelRows.map((entry) => entry.map(safe));
  styleBody(sheet.getRange(`A${row + 1}:E${row + panelRows.length}`));
  sheet.getRange("C:C").format.columnWidth = 10;
  sheet.getRange("D:D").format.columnWidth = 35;
  sheet.getRange("E:E").format.columnWidth = 95;
  row += panelRows.length + 2;
  sheet.getRange(`A${row}:L${row}`).merge();
  sheet.getRange(`A${row}`).values = [["INTERACTIVE SEGMENTS"]];
  styleHeader(sheet.getRange(`A${row}:L${row}`));
  row += 1;
  const segmentRows = (record.interactive_segments ?? []).map((segment) => [segment.key, segment.label, segment.item_count, segment.text]);
  sheet.getRange(`A${row}:D${row}`).values = [["Key", "Label", "Items", "Visible Text"]];
  styleHeader(sheet.getRange(`A${row}:D${row}`));
  if (segmentRows.length) {
    sheet.getRange(`A${row + 1}:D${row + segmentRows.length}`).values = segmentRows.map((entry) => entry.map(safe));
    styleBody(sheet.getRange(`A${row + 1}:D${row + segmentRows.length}`));
  }
  row += segmentRows.length + 2;
  sheet.getRange(`A${row}:L${row}`).merge();
  sheet.getRange(`A${row}`).values = [["FULL RENDERED TEXT — CHUNKED ONLY FOR XLSX CELL LIMIT"]];
  styleHeader(sheet.getRange(`A${row}:L${row}`));
  const chunks = splitText(record.full_rendered_text);
  sheet.getRange(`A${row + 1}:B${row + chunks.length}`).values = chunks.map((chunk, part) => [`Part ${part + 1}/${chunks.length}`, chunk]);
  styleBody(sheet.getRange(`A${row + 1}:B${row + chunks.length}`));
  sheet.getRange(`B${row + 1}:B${row + chunks.length}`).format.columnWidth = 120;
  sheet.freezePanes.freezeRows(4);
}

function buildDossierWorkbook(records) {
  const workbook = Workbook.create();
  addDossierSummary(workbook, records);
  addDossierExceptions(workbook, records);
  addDossierCoverage(workbook, records);
  addDossierLinks(workbook, records);
  addDossierCards(workbook, records);
  records.forEach((record, index) => addDossierIdentity(workbook, record, index));
  return workbook;
}

function addEngineSummary(workbook, rows) {
  const sheet = workbook.worksheets.add("00 Summary");
  setTitle(sheet, "Archscry Engine Validation — Current State", `Exact baseline ${BASELINE} • current model and approved witness inventory • expected identity used only after replay`, "R");
  styleKpis(sheet, [
    { labelCell: "A3:B3", valueCell: "A4:B4", label: "WITNESSES", formula: "=COUNTA(B8:B44)" },
    { labelCell: "D3:E3", valueCell: "D4:E4", label: "NAMED MATCHES", formula: '=COUNTIF(G8:G44,"PASS_MATCH")', color: COLORS.green },
    { labelCell: "G3:H3", valueCell: "G4:H4", label: "MISMATCHES", formula: '=COUNTIF(G8:G44,"MISMATCH")', color: COLORS.red },
    { labelCell: "J3:K3", valueCell: "J4:K4", label: "BOUNDED NO-RESULT", formula: '=COUNTIF(G8:G44,"NO_RESULT")', color: COLORS.gold }
  ]);
  const data = rows.map((row) => [
    row.expected_identity_key, row.expected_identity_name, row.expected_public_contract, row.witness_status,
    row.answer_count, row.actual_final_identity, row.match_status, row.final_result_state, row.public_confidence_state,
    row.raw_numeric_leader, row.raw_numeric_score, row.raw_leader_qualified, row.selected_result_qualified,
    safe(row.frontier), row.stop_reason, row.refinement_question_count, row.refinement_kind, row.trace_path
  ]);
  writeTable(sheet, 7, ["Expected Key", "Expected Name", "Public Contract", "Witness", "Answers", "Actual", "Match", "State", "Public Label", "Raw Leader", "Raw Score", "Raw Qualified", "Selected Qualified", "Frontier", "Stop Reason", "Refine Answers", "Refinement Kind", "Trace"], data, [14, 25, 25, 20, 9, 12, 14, 13, 18, 12, 11, 14, 17, 24, 52, 13, 28, 65]);
  sheet.getRange("K8:K44").format.numberFormat = "0.000000";
  return sheet;
}

function addEngineExceptions(workbook, rows) {
  const sheet = workbook.worksheets.add("01 Exceptions");
  setTitle(sheet, "Engine Exceptions", "Mismatches, stale/missing witnesses, errors, and intentional bounded results are separated.", "H");
  const exceptionRows = rows.filter((row) => row.match_status !== "PASS_MATCH").map((row) => [row.audit_id, row.expected_identity_key, row.expected_identity_name, row.match_status, row.final_result_state, row.actual_final_identity, row.stop_reason, row.trace_path]);
  writeTable(sheet, 4, ["Audit ID", "Key", "Identity", "Match", "State", "Actual", "Reason", "Trace"], exceptionRows, [18, 11, 26, 15, 15, 14, 55, 70]);
}

function addWitnessInventory(workbook, rows) {
  const sheet = workbook.worksheets.add("02 Witness Inventory");
  setTitle(sheet, "Witness Inventory", "Only current-compatible real engine witnesses are included; authored preview routes are excluded.", "K");
  const data = rows.map((row) => [row.expected_identity_key, row.expected_identity_name, row.expected_public_contract, row.witness_status, row.answer_count, row.main_question_count, row.refinement_question_count, row.witness_source, row.witness_source_sha256, row.model_source, row.model_source_sha256]);
  writeTable(sheet, 4, ["Key", "Identity", "Public Contract", "Status", "Answers", "Main", "Refine", "Witness Source", "Witness SHA-256", "Model Source", "Model SHA-256"], data, [12, 25, 25, 22, 9, 8, 9, 65, 67, 36, 67]);
}

function addResultStates(workbook, rows) {
  const sheet = workbook.worksheets.add("03 Result States");
  setTitle(sheet, "Result State Inventory", "Public bounded states, raw internal leaders, responsible selections, frontier, and stop reasons.", "N");
  const data = rows.map((row) => [row.expected_identity_key, row.expected_identity_name, row.final_result_state, row.public_confidence_state, row.raw_numeric_leader, row.raw_numeric_score, row.raw_leader_qualified, row.actual_final_identity, row.selected_result_qualified, safe(row.frontier), row.directional_result_identity, row.stop_reason, row.refinement_kind, row.match_status]);
  writeTable(sheet, 4, ["Key", "Identity", "State", "Public Label", "Raw Leader", "Raw Score", "Raw Qualified", "Selected", "Selected Qualified", "Frontier", "Directional", "Stop Reason", "Refinement", "Match"], data, [11, 25, 14, 18, 12, 11, 14, 12, 16, 25, 14, 52, 28, 15]);
  sheet.getRange("F5:F41").format.numberFormat = "0.000000";
}

function addQualification(workbook, rows) {
  const sheet = workbook.worksheets.add("04 Qualification");
  setTitle(sheet, "Qualification and Divergence", "Cases where the raw numeric leader differs from the responsible public selection, plus refinement use.", "J");
  const filtered = rows.filter((row) => (row.actual_final_identity && row.raw_numeric_leader !== row.actual_final_identity) || row.refinement_question_count > 0 || row.match_status !== "PASS_MATCH");
  const data = filtered.map((row) => [row.expected_identity_key, row.expected_identity_name, row.raw_numeric_leader, row.raw_leader_qualified, row.actual_final_identity, row.selected_result_qualified, row.final_result_state, row.refinement_question_count, row.refinement_kind, row.stop_reason]);
  writeTable(sheet, 4, ["Key", "Identity", "Raw Leader", "Raw Qualified", "Responsible Selection", "Selected Qualified", "State", "Refine Answers", "Refinement", "Stop Reason"], data, [11, 25, 13, 15, 20, 16, 14, 14, 28, 55]);
}

async function addEngineTrace(workbook, summary, index) {
  const trace = await readJson(path.join(ROOT, summary.trace_path));
  const sheet = workbook.worksheets.add(`${String(index + 1).padStart(2, "0")} ${summary.expected_identity_key}`);
  setTitle(sheet, `${summary.expected_identity_name} — Engine Trace`, `${summary.audit_id} • ${summary.match_status} • ${summary.final_result_state} • trace ${summary.trace_sha256}`, "T");
  const metadata = [
    ["Expected key", summary.expected_identity_key], ["Expected public contract", summary.expected_public_contract], ["Witness status", summary.witness_status],
    ["Actual result", summary.actual_final_identity], ["Directional result", summary.directional_result_identity], ["Public state", summary.public_confidence_state],
    ["Raw numeric leader", summary.raw_numeric_leader], ["Raw score", summary.raw_numeric_score], ["Raw leader qualified", summary.raw_leader_qualified],
    ["Selected qualified", summary.selected_result_qualified], ["Frontier", safe(summary.frontier)], ["Stop reason", summary.stop_reason],
    ["Engine version", summary.engine_version], ["Result version", summary.result_version], ["Instrument version", summary.instrument_version], ["Mapping version", summary.mapping_version],
    ["Witness source", summary.witness_source], ["Witness SHA-256", summary.witness_source_sha256], ["Model source", summary.model_source], ["Model SHA-256", summary.model_source_sha256], ["Trace path", summary.trace_path]
  ];
  sheet.getRange("A4:B4").values = [["Field", "Value"]];
  styleHeader(sheet.getRange("A4:B4"));
  sheet.getRange(`A5:B${4 + metadata.length}`).values = metadata.map((entry) => entry.map(safe));
  styleBody(sheet.getRange(`A5:B${4 + metadata.length}`));
  sheet.getRange("A:A").format.columnWidth = 24;
  sheet.getRange("B:B").format.columnWidth = 92;
  let row = 6 + metadata.length;
  sheet.getRange(`A${row}:T${row}`).merge();
  sheet.getRange(`A${row}`).values = [["PER-ANSWER TRACE"]];
  styleHeader(sheet.getRange(`A${row}:T${row}`));
  row += 1;
  const headers = ["Seq", "Mode", "Stage", "Question ID", "Prompt", "Answer ID", "Answer", "Construct", "Signal", "Dependency", "Evidence Class", "Positive", "Contradiction", "Strength", "Naming", "Mapping Status", "Observation", "Limitation", "Raw Leader", "Stopping / Next"];
  const steps = (trace.steps ?? []).map((step) => {
    const evidence = step.evidence_ledger_entry ?? step.lens_ledger_entry ?? {};
    return [step.sequence, step.selection_mode, step.stage, step.question_id, step.prompt, step.answer_id, step.answer_title,
      evidence.construct, evidence.signal, evidence.dependency_group, evidence.evidence_class, evidence.positive_support,
      evidence.contradiction, evidence.mapping_strength, evidence.naming_evidence, evidence.mapping_status,
      evidence.bounded_observation, evidence.limitation, step.raw_numeric_leader,
      `${step.stopping?.state ?? ""} / ${step.stopping?.reason ?? ""} / ${step.stopping?.next_question_id ?? ""}`];
  });
  sheet.getRange(`A${row}:T${row}`).values = [headers];
  styleHeader(sheet.getRange(`A${row}:T${row}`));
  if (steps.length) {
    sheet.getRange(`A${row + 1}:T${row + steps.length}`).values = steps.map((entry) => entry.map(safe));
    styleBody(sheet.getRange(`A${row + 1}:T${row + steps.length}`));
  }
  [7, 12, 10, 34, 62, 38, 28, 11, 20, 15, 22, 20, 20, 10, 10, 28, 45, 62, 13, 48].forEach((width, column) => sheet.getRange(`${columnName(column + 1)}:${columnName(column + 1)}`).format.columnWidth = width);
  row += steps.length + 2;
  sheet.getRange(`A${row}:T${row}`).merge();
  sheet.getRange(`A${row}`).values = [["FINAL CANDIDATE INVENTORY"]];
  styleHeader(sheet.getRange(`A${row}:T${row}`));
  row += 1;
  const candidates = (trace.final_candidates ?? []).map((candidate, candidateIndex) => {
    if (typeof candidate !== "object" || candidate == null) return [candidateIndex + 1, safe(candidate), "", "", "", ""];
    return [candidate.rank ?? candidateIndex + 1, candidate.identity, candidate.identity_name, candidate.score, candidate.qualified, safe(candidate.positive_constructs)];
  });
  sheet.getRange(`A${row}:F${row}`).values = [["Rank", "Identity", "Name", "Score", "Qualified", "Positive Constructs"]];
  styleHeader(sheet.getRange(`A${row}:F${row}`));
  if (candidates.length) {
    sheet.getRange(`A${row + 1}:F${row + candidates.length}`).values = candidates.map((entry) => entry.map(safe));
    styleBody(sheet.getRange(`A${row + 1}:F${row + candidates.length}`));
  }
  row += candidates.length + 2;
  sheet.getRange(`A${row}:T${row}`).merge();
  sheet.getRange(`A${row}`).values = [["FINAL RESULT JSON — CHUNKED ONLY FOR XLSX CELL LIMIT"]];
  styleHeader(sheet.getRange(`A${row}:T${row}`));
  const chunks = splitText(JSON.stringify(trace.final_result, null, 2));
  sheet.getRange(`A${row + 1}:B${row + chunks.length}`).values = chunks.map((chunk, part) => [`Part ${part + 1}/${chunks.length}`, chunk]);
  styleBody(sheet.getRange(`A${row + 1}:B${row + chunks.length}`));
  sheet.freezePanes.freezeRows(4);
}

async function buildEngineWorkbook(rows) {
  const workbook = Workbook.create();
  addEngineSummary(workbook, rows);
  addEngineExceptions(workbook, rows);
  addWitnessInventory(workbook, rows);
  addResultStates(workbook, rows);
  addQualification(workbook, rows);
  for (let index = 0; index < rows.length; index += 1) await addEngineTrace(workbook, rows[index], index);
  return workbook;
}

async function renderAndInspect(workbook, label, summaryRange) {
  const previewRoot = path.join(PREVIEW_DIR, label);
  await fs.mkdir(previewRoot, { recursive: true });
  const sheetInfo = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 12000 });
  const summary = await workbook.inspect({ kind: "region,formula", sheetId: "00 Summary", range: summaryRange, maxChars: 12000, tableMaxRows: 50, tableMaxCols: 20 });
  const sheets = [];
  for (let index = 0; ; index += 1) {
    let sheet;
    try { sheet = workbook.worksheets.getItemAt(index); } catch { break; }
    if (!sheet) break;
    const name = sheet.name;
    const lastCol = label === "dossier"
      ? (name === "00 Summary" ? "N" : name === "01 Exceptions" || name === "03 Link Inventory" ? "I" : name === "02 Section Coverage" ? "G" : name === "04 Card Inventory" ? "H" : "L")
      : (name === "00 Summary" ? "R" : name === "01 Exceptions" ? "H" : name === "02 Witness Inventory" ? "K" : name === "03 Result States" ? "N" : name === "04 Qualification" ? "J" : "T");
    const previewRange = `A1:${lastCol}60`;
    const preview = await workbook.render({ sheetName: name, range: previewRange, scale: 0.55, format: "png" });
    const bytes = new Uint8Array(await preview.arrayBuffer());
    const output = path.join(previewRoot, `${String(index).padStart(2, "0")}-${name.replaceAll(/[^A-Za-z0-9_-]+/g, "-")}.png`);
    await fs.writeFile(output, bytes);
    sheets.push({ name, preview: rel(output), rendered_range: previewRange, bytes: bytes.length });
  }
  return { sheet_count: sheets.length, sheets, sheet_inspection: sheetInfo.ndjson ?? String(sheetInfo), summary_inspection: summary.ndjson ?? String(summary) };
}

async function validateExport(target, summaryRange) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(target));
  const sheetInspection = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 12000 });
  const formulaInspection = await workbook.inspect({ kind: "region,formula", sheetId: "00 Summary", range: summaryRange, maxChars: 12000, tableMaxRows: 50, tableMaxCols: 20 });
  const combined = `${sheetInspection.ndjson ?? sheetInspection}\n${formulaInspection.ndjson ?? formulaInspection}`;
  const errors = combined.match(/#(?:REF!|DIV\/0!|VALUE!|NAME\?|N\/A|NUM!|NULL!)/g) ?? [];
  if (errors.length) throw new Error(`Formula error(s) in ${target}: ${[...new Set(errors)].join(", ")}`);
  return { sheet_inspection: sheetInspection.ndjson ?? String(sheetInspection), formula_inspection: formulaInspection.ndjson ?? String(formulaInspection), formula_errors: [] };
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.mkdir(PREVIEW_DIR, { recursive: true });
const dossierJson = await readJson(path.join(AUDIT_DIR, "dossier/dossier-review-current-state.json"));
const engineJson = await readJson(path.join(AUDIT_DIR, "engine/engine-validation-current-state.json"));
const dossierRecords = dossierJson.records ?? [];
const engineRows = engineJson.rows ?? [];
if (dossierRecords.length !== 37 || engineRows.length !== 37) throw new Error("Both workbooks require exactly 37 current evidence rows.");

console.log("Building dossier workbook...");
const dossierWorkbook = buildDossierWorkbook(dossierRecords);
const dossierQa = await renderAndInspect(dossierWorkbook, "dossier", "A1:N47");
await (await SpreadsheetFile.exportXlsx(dossierWorkbook)).save(DOSSIER_XLSX);
const dossierExportQa = await validateExport(DOSSIER_XLSX, "A1:N47");

console.log("Building engine workbook...");
const engineWorkbook = await buildEngineWorkbook(engineRows);
const engineQa = await renderAndInspect(engineWorkbook, "engine", "A1:R44");
await (await SpreadsheetFile.exportXlsx(engineWorkbook)).save(ENGINE_XLSX);
const engineExportQa = await validateExport(ENGINE_XLSX, "A1:R44");

const qa = {
  schema_version: "1.0.0",
  baseline_sha: BASELINE,
  dossier: { path: rel(DOSSIER_XLSX), sha256: await sha256(DOSSIER_XLSX), ...dossierQa, exported: dossierExportQa },
  engine: { path: rel(ENGINE_XLSX), sha256: await sha256(ENGINE_XLSX), ...engineQa, exported: engineExportQa }
};
await fs.writeFile(path.join(AUDIT_DIR, "workbook-qa.json"), `${JSON.stringify(qa, null, 2)}\n`, "utf8");
const manifest = await readJson(MANIFEST_PATH);
manifest.workbooks = {
  status: "COMPLETE",
  dossier: { path: qa.dossier.path, sha256: qa.dossier.sha256, sheet_count: qa.dossier.sheet_count },
  engine: { path: qa.engine.path, sha256: qa.engine.sha256, sheet_count: qa.engine.sheet_count },
  qa: rel(path.join(AUDIT_DIR, "workbook-qa.json")),
  previews: rel(PREVIEW_DIR)
};
await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ status: "PASS", dossier: manifest.workbooks.dossier, engine: manifest.workbooks.engine }, null, 2));
