import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

export const WORKBOOK_PATH = path.join(
  repoRoot,
  "data",
  "precons",
  "reference",
  "vox_mana_precon_mechanics_validation_all_155_completed.xlsx"
);
export const SOURCE_PATH = path.join(repoRoot, "data", "precons", "vox-mana-precons.source.json");
export const SOURCE_SCHEMA_VERSION = "vox-mana-precons-source-v2.1";
export const EXPECTED_KEYED_ROWS = 155;

export const PREFERRED_SHEETS = [
  "Source Data Edits",
  "Mechanics Changed",
  "Mechanics Normalization Review",
];

export const REQUIRED_COLUMNS = [
  { key: "productSection", names: ["productSection", "Product Section"] },
  { key: "deckName", names: ["deckName", "Deck Name"] },
  { key: "proposedMechanics", names: ["Proposed MVP Mechanics"] },
  { key: "proposedCreatureTypeFocus", names: ["Proposed CreatureTypeFocus"] },
  { key: "mechanicsValidationStatus", names: ["Mechanics Validation Status"] },
  { key: "safeForPlacementDossier", names: ["Safe For Placement Dossier"] },
];

export const OPTIONAL_AUDIT_COLUMNS = [
  { key: "mechanicsEvidenceType", names: ["Mechanics Evidence Type"] },
  { key: "mechanicsEvidenceBasis", names: ["Mechanics Evidence Basis"] },
  { key: "validatedSourceUrls", names: ["Validated Source URL(s)"] },
  { key: "notesForManualReview", names: ["Notes For Manual Review"] },
];

const PROTECTED_FIELDS = [
  "secondaryCommanders",
  "recommendedSecondCommander",
  "recommendedSecondCommanderConfidence",
  "recommendedSecondCommanderReason",
  "recommendationSourceBasis",
  "secondCommanderRecommendation",
];

const DISALLOWED_MECHANIC_TAGS = new Set([
  "typal synergy",
  "unclear from source",
  "none",
  "n/a",
]);

function fail(message) {
  throw new Error(message);
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeader(value) {
  return cleanText(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function columnKey(names) {
  return names.map(normalizeHeader);
}

function resolveColumns(headers, specs) {
  const byNormalizedHeader = new Map();
  headers.forEach((header) => {
    const normalized = normalizeHeader(header);
    if (normalized && !byNormalizedHeader.has(normalized)) {
      byNormalizedHeader.set(normalized, header);
    }
  });

  const resolved = {};
  const missing = [];
  specs.forEach((spec) => {
    const match = columnKey(spec.names).map((candidate) => byNormalizedHeader.get(candidate)).find(Boolean);
    if (match) {
      resolved[spec.key] = match;
    } else {
      missing.push(spec.names[0]);
    }
  });

  return { resolved, missing };
}

function valueFor(row, columns, key) {
  return cleanText(row[columns[key]]);
}

function compositeKey(productSection, deckName) {
  return `${cleanText(productSection)}\u001F${cleanText(deckName)}`;
}

function displayKey(key) {
  return key.split("\u001F").join(" / ");
}

function findDuplicates(items, label) {
  const seen = new Map();
  const duplicates = [];
  items.forEach((item) => {
    const bucket = seen.get(item.key) || [];
    bucket.push(item.label);
    seen.set(item.key, bucket);
  });

  seen.forEach((labels, key) => {
    if (labels.length > 1) {
      duplicates.push(`${label} duplicate key "${displayKey(key)}" at ${labels.join(", ")}`);
    }
  });

  return duplicates;
}

export function readWorkbookForImport(workbookPath = WORKBOOK_PATH) {
  const workbook = XLSX.readFile(workbookPath);
  const sheetReports = [];

  for (const sheetName of PREFERRED_SHEETS) {
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      sheetReports.push(`${sheetName}: missing`);
      continue;
    }

    const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: "", raw: false });
    const headers = rawRows[0] ? Object.keys(rawRows[0]) : [];
    const { resolved, missing } = resolveColumns(headers, REQUIRED_COLUMNS);
    if (missing.length > 0) {
      sheetReports.push(`${sheetName}: missing ${missing.join(", ")}`);
      continue;
    }

    const optionalColumns = resolveColumns(headers, OPTIONAL_AUDIT_COLUMNS).resolved;
    const rows = rawRows
      .map((row, index) => {
        const productSection = valueFor(row, resolved, "productSection");
        const deckName = valueFor(row, resolved, "deckName");
        const keyed = Boolean(productSection || deckName);
        const normalized = {
          rowNumber: index + 2,
          productSection,
          deckName,
          proposedMechanics: valueFor(row, resolved, "proposedMechanics"),
          proposedCreatureTypeFocus: valueFor(row, resolved, "proposedCreatureTypeFocus"),
          mechanicsValidationStatus: valueFor(row, resolved, "mechanicsValidationStatus"),
          safeForPlacementDossier: valueFor(row, resolved, "safeForPlacementDossier"),
          audit: Object.fromEntries(
            Object.entries(optionalColumns).map(([key, column]) => [key, cleanText(row[column])])
          ),
        };
        return keyed ? normalized : null;
      })
      .filter(Boolean);

    if (rows.length !== EXPECTED_KEYED_ROWS) {
      fail(
        `${sheetName} produced ${rows.length} keyed rows; expected ${EXPECTED_KEYED_ROWS}.`
      );
    }

    return {
      workbookPath,
      sheetName,
      rows,
      sheetReports,
      requiredColumns: resolved,
      optionalColumns,
    };
  }

  fail(`No preferred workbook sheet contained all required columns. Checked: ${sheetReports.join("; ")}`);
}

function normalizeMechanicTagForComparison(value) {
  return cleanText(value).toLowerCase();
}

export function normalizeMechanicsList(value, rowLabel = "row") {
  const source = cleanText(value);
  if (!source) {
    fail(`${rowLabel}: Proposed MVP Mechanics is blank.`);
  }

  const seen = new Set();
  const mechanics = [];
  source.split(";").forEach((entry) => {
    const tag = cleanText(entry);
    if (!tag) {
      return;
    }

    const comparison = normalizeMechanicTagForComparison(tag);
    if (DISALLOWED_MECHANIC_TAGS.has(comparison)) {
      fail(`${rowLabel}: mechanic tag "${tag}" is not allowed.`);
    }
    if (tag.includes(".") || tag.includes(":")) {
      fail(`${rowLabel}: mechanic tag "${tag}" looks like prose.`);
    }
    if (tag.split(/\s+/).filter(Boolean).length > 6) {
      fail(`${rowLabel}: mechanic tag "${tag}" is longer than 6 words.`);
    }
    if (!seen.has(comparison)) {
      seen.add(comparison);
      mechanics.push(tag);
    }
  });

  if (mechanics.length < 3 || mechanics.length > 6) {
    fail(`${rowLabel}: expected 3-6 mechanics, found ${mechanics.length}.`);
  }

  return mechanics;
}

export function normalizeCreatureTypeFocus(value, rowLabel = "row") {
  const text = cleanText(value);
  if (!text) {
    return null;
  }

  const lowered = text.toLowerCase();
  const nullExactValues = new Set([
    "none",
    "n/a",
    "na",
    "not applicable",
    "no clear creature focus",
    "unclear from source",
  ]);

  if (nullExactValues.has(lowered) || lowered.includes("non-tribal") || lowered.includes("role-agnostic")) {
    return null;
  }

  if (lowered === "typal synergy") {
    fail(`${rowLabel}: creatureTypeFocus cannot be "Typal synergy".`);
  }

  return text;
}

function protectedSnapshot(record) {
  return Object.fromEntries(
    PROTECTED_FIELDS.map((field) => [
      field,
      {
        present: Object.prototype.hasOwnProperty.call(record, field),
        value: record[field],
      },
    ])
  );
}

function snapshotsMatch(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function deepEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function validateSourceCatalog(sourceCatalog) {
  if (!sourceCatalog || typeof sourceCatalog !== "object" || Array.isArray(sourceCatalog)) {
    fail("Precon source catalog must be an object.");
  }
  if (!Array.isArray(sourceCatalog.precons)) {
    fail("Precon source catalog must expose a precons array.");
  }
  if (Number(sourceCatalog._meta?.record_count) !== sourceCatalog.precons.length) {
    fail("Precon source catalog record_count must match precons length.");
  }
}

export function applyMechanicsImport(sourceCatalog, workbookRows) {
  validateSourceCatalog(sourceCatalog);

  const sourceEntries = sourceCatalog.precons.map((record, index) => ({
    key: compositeKey(record.productSection, record.deckName),
    label: `source precons[${index}]`,
    record,
  }));
  const workbookEntries = workbookRows.map((row) => ({
    key: compositeKey(row.productSection, row.deckName),
    label: `workbook row ${row.rowNumber}`,
    row,
  }));

  const duplicateErrors = [
    ...findDuplicates(sourceEntries, "source"),
    ...findDuplicates(workbookEntries, "workbook"),
  ];
  if (duplicateErrors.length > 0) {
    fail(duplicateErrors.join("\n"));
  }

  const sourceByKey = new Map(sourceEntries.map((entry) => [entry.key, entry.record]));
  const protectedBefore = new Map(
    sourceEntries.map((entry) => [entry.key, protectedSnapshot(entry.record)])
  );

  let matched = 0;
  let updated = 0;
  let unchanged = 0;
  let skipped = 0;
  let mechanicsCountFailures = 0;
  const unmatchedRows = [];
  const mechanicsErrors = [];
  const updates = [];

  workbookEntries.forEach(({ key, row }) => {
    const record = sourceByKey.get(key);
    if (!record) {
      unmatchedRows.push(`workbook row ${row.rowNumber}: ${displayKey(key)}`);
      return;
    }
    matched += 1;

    if (row.mechanicsValidationStatus !== "Validated" || row.safeForPlacementDossier !== "Yes") {
      skipped += 1;
      return;
    }

    try {
      updates.push({
        key,
        record,
        mechanics: normalizeMechanicsList(row.proposedMechanics, `workbook row ${row.rowNumber}`),
        creatureTypeFocus: normalizeCreatureTypeFocus(
          row.proposedCreatureTypeFocus,
          `workbook row ${row.rowNumber}`
        ),
      });
    } catch (error) {
      mechanicsCountFailures += 1;
      mechanicsErrors.push(error.message);
    }
  });

  if (unmatchedRows.length > 0 || mechanicsErrors.length > 0) {
    fail([
      unmatchedRows.length ? `Unmatched rows:\n${unmatchedRows.join("\n")}` : "",
      mechanicsErrors.length ? `Mechanics validation failures:\n${mechanicsErrors.join("\n")}` : "",
    ].filter(Boolean).join("\n\n"));
  }

  updates.forEach(({ record, mechanics, creatureTypeFocus }) => {
    const nextFields = { mechanics, creatureTypeFocus };
    const currentFields = {
      mechanics: record.mechanics,
      creatureTypeFocus: record.creatureTypeFocus ?? null,
    };

    if (deepEqual(currentFields, nextFields)) {
      unchanged += 1;
      return;
    }

    record.mechanics = mechanics;
    record.creatureTypeFocus = creatureTypeFocus;
    updated += 1;
  });

  const protectedErrors = [];
  sourceEntries.forEach(({ key, record }) => {
    const before = protectedBefore.get(key);
    const after = protectedSnapshot(record);
    if (!snapshotsMatch(before, after)) {
      protectedErrors.push(displayKey(key));
    }
  });

  if (protectedErrors.length > 0) {
    fail(`Protected field scope guard failed for:\n${protectedErrors.join("\n")}`);
  }

  const priorSchemaVersion = sourceCatalog._meta?.schema_version;
  if (sourceCatalog._meta) {
    sourceCatalog._meta.schema_version = SOURCE_SCHEMA_VERSION;
  }

  return {
    sourceRecordsFound: sourceCatalog.precons.length,
    workbookRowsFound: workbookRows.length,
    recordsMatched: matched,
    recordsUpdated: updated,
    recordsUnchanged: unchanged,
    skippedRows: skipped,
    duplicateKeyErrors: duplicateErrors.length,
    unmatchedRowErrors: unmatchedRows.length,
    mechanicsCountFailures,
    protectedFieldScopeGuard: "passed",
    schemaVersionChanged: priorSchemaVersion !== SOURCE_SCHEMA_VERSION,
  };
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeJson(filePath, data) {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function printReport({ workbookPath, sheetName, report }) {
  console.log("Precon mechanics validation import report");
  console.log(`workbook path: ${path.relative(repoRoot, workbookPath)}`);
  console.log(`sheet used: ${sheetName}`);
  console.log(`source records found: ${report.sourceRecordsFound}`);
  console.log(`workbook rows found: ${report.workbookRowsFound}`);
  console.log(`records matched: ${report.recordsMatched}`);
  console.log(`records updated: ${report.recordsUpdated}`);
  console.log(`records unchanged: ${report.recordsUnchanged}`);
  console.log(`skipped rows: ${report.skippedRows}`);
  console.log(`duplicate key errors: ${report.duplicateKeyErrors}`);
  console.log(`unmatched row errors: ${report.unmatchedRowErrors}`);
  console.log(`mechanics count failures: ${report.mechanicsCountFailures}`);
  console.log(`protected field scope guard: ${report.protectedFieldScopeGuard}`);
  console.log(`source schema version changed: ${report.schemaVersionChanged ? "yes" : "no"}`);
}

export async function importPreconMechanicsValidation({
  workbookPath = WORKBOOK_PATH,
  sourcePath = SOURCE_PATH,
} = {}) {
  const workbookImport = readWorkbookForImport(workbookPath);
  const sourceCatalog = await readJson(sourcePath);
  const before = JSON.stringify(sourceCatalog);
  const report = applyMechanicsImport(sourceCatalog, workbookImport.rows);
  const after = JSON.stringify(sourceCatalog);

  if (before !== after) {
    await writeJson(sourcePath, sourceCatalog);
  }

  printReport({
    workbookPath,
    sheetName: workbookImport.sheetName,
    report,
  });

  return {
    ...workbookImport,
    report,
    wroteSource: before !== after,
  };
}

async function main() {
  await importPreconMechanicsValidation();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
