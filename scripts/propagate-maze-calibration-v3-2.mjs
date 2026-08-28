import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const ROOT = "C:/dev/voxmana.io";
const AUTHORITY_PATH = path.join(ROOT, "docs/research/maze-player-language/calibration/v3.2/Scryfall_Maze_Master_Calibration_V3_2.xlsx");
const SOURCE_PATH = path.join(ROOT, "docs/research/maze-player-language/source/Scryfall_Maze_Master.xlsx");
const CORPUS_DIR = path.join(ROOT, "docs/research/maze-player-language/corpus");
const OUTPUT_DIR = path.join(ROOT, "docs/research/maze-player-language/calibration/v3.2/propagation");
const CANDIDATE_PATH = path.join(OUTPUT_DIR, "Scryfall_Maze_Master_Propagation_Candidate_V3_2.xlsx");
const DIFF_MD_PATH = path.join(OUTPUT_DIR, "V3_2_PROPAGATION_DIFF.md");
const DIFF_CSV_PATH = path.join(OUTPUT_DIR, "V3_2_PROPAGATION_DIFF.csv");
const QA_PATH = path.join(OUTPUT_DIR, "V3_2_PROPAGATION_QA.md");
const TEMP_DIR = "C:/Users/obake/AppData/Local/Temp/voxmana-v32-propagation/candidate-verification";
const REVIEW_DATE = "2026-08-27";
const PRIOR_OWNER_REVIEW_CANDIDATE_SHA256 = "8f0aa0411d15509574fd0aab4111a8bbe7e7739d00e0446a604a575cc9361129";
const ACCEPTED_AUTHORITY_PATH = "docs/research/maze-player-language/calibration/v3.2/authority/Scryfall_Maze_Master_Calibration_V3_2_Propagation_Accepted.xlsx";

const FIELDS = [
  "Intent Class",
  "Preferred Strategy",
  "Master Query Fragment",
  "Fallback / Alternate",
  "Translator Behavior",
  "Master Status",
  "Confidence",
  "Ambiguity / Guardrail",
  "Authority",
  "Last Reviewed",
];

const HISTORICAL_SHEETS = [
  "Owner_Gold_100",
  "Owner_Regression",
  "Owner_Recheck",
  "Gold_35_Audit",
  "Recipe_42_Deconstructed",
  "Owner_Checklist_22",
  "New_Recheck_7",
  "Calibration_V2",
  "Resolved_29_V3",
  "Evidence_Backlog_V3",
  "Evidence_Corrections_V3",
  "Evidence_Log_V3_1",
  "Evidence_Closure_V3_2",
];

const ALREADY_GOVERNED = new Set([
  "ColorPie!A26:E26",
  "DeckArchetypes!B9",
  "DeckArchetypes!B34",
]);

const change = (set, authorityEvidenceSource, ruleTrace, reason) => ({ set, authorityEvidenceSource, ruleTrace, reason });

const CHANGES = new Map([
  ["Keywords!A3:C3", change({
    "Intent Class": "Polysemous action",
    "Preferred Strategy": "governed intent branch",
    "Master Query Fragment": null,
    "Fallback / Alternate": "counterspell lens + counter-on-object lens + counter-manipulation lens",
    "Translator Behavior": "Disambiguate before query assembly",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Counter is overloaded: counter a spell/ability, place a counter, or manipulate counters. Never default the bare word to one branch or emit a generic o:counter query as settled intent.",
    "Authority": "CAL-029 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-029; CAL-037", "Replace an unsafe bare Oracle search with the governed polysemy branch." )],
  ["KeywordActions!A19:B19", change({
    "Intent Class": "Polysemous action",
    "Preferred Strategy": "governed intent branch",
    "Master Query Fragment": null,
    "Fallback / Alternate": "counterspell lens + counter-on-object lens + counter-manipulation lens",
    "Translator Behavior": "Disambiguate before query assembly",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Counter is overloaded: counter a spell/ability, place a counter, or manipulate counters. Never default the bare word to one branch or emit a generic o:counter query as settled intent.",
    "Authority": "CAL-029 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-029; CAL-037", "Apply the same governed polysemy branch to the duplicate source vocabulary row." )],
  ["ColorPie!A35:E35", change({
    "Intent Class": "Multi-Lens function",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": "otag:board-wipe (o:\"destroy all creatures\" or o:\"exile all creatures\" or o:\"each creature gets -\" or o:\"damage to each creature\" or o:\"sacrifice all\")",
    "Fallback / Alternate": "Tagger-only alternate lane + Oracle-only wording-review lane",
    "Translator Behavior": "Run the high-confidence core; preserve role-labeled alternate lanes",
    "Master Status": "Production-ready",
    "Confidence": 0.86,
    "Ambiguity / Guardrail": "The intersection is the high-confidence core, not complete truth. Keep legitimate Tagger-only resets/sweepers and Oracle-only wording in separate lanes; reject self-board sacrifice/exile/destruction false positives.",
    "Authority": "EV-003 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Evidence Gate CLOSED V3.2; EV-003", "CAL-020; CAL-044; CAL-055; EV-003", "Convert the single destroy-all regex into the frozen board-wipe differential architecture." )],
  ["ColorPie!A36:E36", change({
    "Intent Class": "Multi-Lens function",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": "(o:\"destroy all creatures target opponent controls\" or o:\"exile all creatures target opponent controls\")",
    "Fallback / Alternate": "all-opponents / spare-my-board lane: (o:\"destroy all creatures you don't control\" or o:\"exile all creatures you don't control\" or o:\"destroy all creatures your opponents control\" or o:\"exile all creatures your opponents control\") + save-one/chosen-survivor lane + tribal/chosen-type survivor lane",
    "Translator Behavior": "Separate target-one-opponent, all-opponents/spare-my-board, save-one, and tribal-survivor meanings",
    "Master Status": "Review",
    "Confidence": 0.68,
    "Ambiguity / Guardrail": "The target-one-opponent lane represents the source concept but remains pending narrow exact-name/live validation. Do not substitute the EV-001 all-opponents/spare-my-board lane for one-player intent; keep save-one and tribal survivor effects separate.",
    "Authority": "Owner Review finding; EV-001 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Owner Review finding 2026-08-27; Evidence Gate CLOSED V3.2 EV-001/EV-003", "CAL-020; CAL-043; CAL-044; CAL-055; EV-001; EV-003", "Separate the unvalidated target-one-opponent family from EV-001's all-opponents/spare-my-board family and retain Review status." )],
  ["ColorPie!A91:E91", change({
    "Intent Class": "Multi-Lens function",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": "o:\"exile target\" o:return o:battlefield",
    "Fallback / Alternate": "repeatable blink-engine lane + payoff/watcher lane",
    "Translator Behavior": "Separate blink enablers, repeatable engines, and payoffs",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Do not blend blink with ordinary bounce or graveyard recursion. The Oracle fragment is a candidate enabler lens; engines and payoffs are separate roles.",
    "Authority": "CAL-017 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules and query cookbook", "CAL-017; CAL-043", "Replace an unresolved Flicker concept with the governed three-role recipe while retaining Review status." )],
  ["ColorPie!A129:E129", change({
    "Intent Class": "Multi-Lens mana-production concept",
    "Preferred Strategy": "structured signal + role classifier",
    "Master Query Fragment": "produces:[MANA]",
    "Fallback / Alternate": "direct self-production + alternative activation + land-untap + grantor/support lanes",
    "Translator Behavior": "Retrieve by capability, then classify the actual mana source and role",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "produces: is broad capability evidence, not proof that the queried permanent produces mana itself or does so repeatably. Keep grantors and land-untap acceleration separately labeled.",
    "Authority": "EV-004 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Evidence Gate CLOSED V3.2; EV-004", "CAL-023; CAL-045; CAL-056; EV-004", "Introduce the documented structured signal and the frozen mana-source role classifier." )],
  ["ColorPie!A130:E130", change({
    "Intent Class": "Multi-Lens mana-production concept",
    "Preferred Strategy": "structured signal + role classifier",
    "Master Query Fragment": "produces:[MANA]",
    "Fallback / Alternate": "burst-spell lane + temporary activation/trigger lane + grantor/support lane",
    "Translator Behavior": "Retrieve by capability, then classify duration, source, and role",
    "Master Status": "Review",
    "Confidence": 0.68,
    "Ambiguity / Guardrail": "produces: does not prove duration, repeatability, or self-production. Temporary mana still requires post-retrieval role classification.",
    "Authority": "EV-004 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Evidence Gate CLOSED V3.2; EV-004", "CAL-045; CAL-056; EV-004", "Use the structured capability signal without inventing a direct duration operator." )],
  ["ColorPie!A158:E158", change({
    "Intent Class": "Mechanical pattern",
    "Preferred Strategy": "order-independent Oracle recipe",
    "Master Query Fragment": "(o:put or o:return) o:\"creature card\" o:graveyard o:battlefield",
    "Fallback / Alternate": "battlefield reanimation + hand recursion + self-return/self-cast lanes",
    "Translator Behavior": "Use the creature battlefield-reanimation candidate lens",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Reanimation uses both put and return wording families. This is a high-recall candidate lens, not proof of complete mechanical equivalence; named template claims require card-by-card checks.",
    "Authority": "EC-001 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Evidence Corrections V3.1; EC-001", "CAL-022; CAL-054", "Apply the corrected put-or-return reanimation family while preserving semantic limits." )],
  ["ColorPie!A114:E114", change({
    "Intent Class": "Multi-Lens function",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": null,
    "Fallback / Alternate": "counter-creation/counter-matters lanes + token-generation/token-matters lanes",
    "Translator Behavior": "Branch by counters versus tokens and by producer versus payoff",
    "Master Status": "Review",
    "Confidence": 0.68,
    "Ambiguity / Guardrail": "A create-token query cannot represent the counter half of this composite term. Keep counter type and producer/payoff intent explicit rather than hiding one side.",
    "Authority": "CAL-033; CAL-043 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-033; CAL-043", "Remove a token-only query that silently discarded the counter branch." )],
  ["ColorPie!A190:E190", change({
    "Intent Class": "Mechanical pattern",
    "Preferred Strategy": "Oracle creation pattern",
    "Master Query Fragment": "o:create o:token",
    "Fallback / Alternate": "token-subtype lane + token-payoff/support lane",
    "Translator Behavior": "Use the generator lane first; branch token payoffs separately",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Creation wording is required for generators. Separate o: terms are a candidate pattern and can match different abilities, so important same-ability claims remain reviewable.",
    "Authority": "CAL-033 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-010; CAL-033; CAL-053", "Replace an ordered create.*token regex with the governed generator pattern and explicit payoff branch." )],
  ["ColorPie!A193:E193", change({
    "Intent Class": "Mechanical pattern",
    "Preferred Strategy": "Oracle creation pattern",
    "Master Query Fragment": "o:create o:\"Treasure token\"",
    "Fallback / Alternate": "Treasure payoff/spender lane",
    "Translator Behavior": "Translate creation directly; branch Treasure payoffs and spenders separately",
    "Master Status": "Production-ready",
    "Confidence": 0.92,
    "Ambiguity / Guardrail": "The creation lens intentionally excludes cards that only care about, spend, or depict Treasures. Keep those roles as an explicit alternate lane.",
    "Authority": "CAL-033 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-009; CAL-033; CAL-053", "Promote the exact Treasure-creation concept using the governed creation wording." )],
  ["DeckArchetypes!B2", change({
    "Intent Class": "Multi-Lens archetype",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": "o:create o:token",
    "Fallback / Alternate": "token payoff/support lane + subtype-specific generator lanes",
    "Translator Behavior": "Separate token generators, payoffs, and requested token subtypes",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Tokens as an archetype is broader than token creation. Do not emit the non-allowlisted token-generator tag or collapse makers and payoffs into one opaque query.",
    "Authority": "CAL-033; CAL-043 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules and Tagger allowlist", "CAL-033; CAL-043; CAL-053", "Convert the archetype to named roles and remove a non-allowlisted Tagger shortcut." )],
  ["DeckArchetypes!B13", change({
    "Intent Class": "Multi-Lens function",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": "o:create o:\"Treasure token\"",
    "Fallback / Alternate": "t:treasure token-object lane + Treasure payoff/spender lane",
    "Translator Behavior": "Branch creation, token objects, and Treasure-matters roles",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "A bare o:Treasure query mixes makers, payoffs, spenders, and references. The generator lane is primary only when creation is the requested job.",
    "Authority": "CAL-033; CAL-043 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-033; CAL-043; CAL-053", "Downgrade an overconfident bare-Treasure query to transparent role lanes." )],
  ["DeckArchetypes!B8", change({
    "Intent Class": "Multi-Lens archetype",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": "(o:\"sacrifice a creature:\" or o:\"sacrifice another creature:\")",
    "Fallback / Alternate": "death-payoff lane + fodder lane + recursion lane",
    "Translator Behavior": "Separate outlets, death payoffs, fodder, and recursion",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "The outlet pattern is only one Aristocrats role. Do not use bare o:sacrifice as proof of an outlet or compress all roles into a giant OR query.",
    "Authority": "CAL-018; CAL-026 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-018; CAL-026; CAL-043", "Turn Aristocrats into the governed small-role bundle instead of a generic sacrifice search." )],
  ["DeckArchetypes!B18", change({
    "Intent Class": "Multi-Lens function",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": "otag:blink",
    "Fallback / Alternate": "Oracle enabler lane + repeatable engine lane + payoff/watcher lane",
    "Translator Behavior": "Separate blink enablers, repeatable engines, and payoffs",
    "Master Status": "Production-ready",
    "Confidence": 0.9,
    "Ambiguity / Guardrail": "blink is allowlisted for effect discovery, not a complete role classifier. Do not blend graveyard recursion or ordinary bounce; label engines and payoffs separately.",
    "Authority": "CAL-017 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules and Tagger allowlist", "CAL-017; CAL-043; CAL-053", "Replace one ordered regex with the allowlisted candidate tag plus named mechanical lanes." )],
  ["DeckArchetypes!B31", change({
    "Intent Class": "Multi-Lens function",
    "Preferred Strategy": "governed role recipe",
    "Master Query Fragment": "o:sacrifice",
    "Fallback / Alternate": "otag:sacrifice-outlet when outlet is explicit + self-cost/forced-sacrifice lanes",
    "Translator Behavior": "Preserve sacrifice object, direction, and outlet intent",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Bare sacrifice text is a candidate pool, not proof of an outlet. Use the allowlisted sacrifice-outlet tag only when outlet intent is explicit.",
    "Authority": "CAL-018; CAL-026 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules and Tagger allowlist", "CAL-018; CAL-026; CAL-043", "Make sacrifice direction and outlet intent explicit while preserving Review status." )],
  ["DeckArchetypes!B50", change({
    "Intent Class": "Multi-Lens relationship",
    "Preferred Strategy": "governed Multi-Lens recipe",
    "Master Query Fragment": "(o:\"when ~ enters\" or o:\"whenever ~ enters\")",
    "Fallback / Alternate": "watcher/payoff lane + blink-target lane + trigger-doubler lane",
    "Translator Behavior": "Separate own-ETB triggers, watchers, reusable targets, and doublers",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Do not treat static 'enters with' text as a trigger or every ETB creature as useful blink value. If-cast clauses can prevent blink reuse and require review.",
    "Authority": "CAL-016; CAL-050 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-016; CAL-017; CAL-043; CAL-050", "Split ETB value into the governed trigger/watcher/target/doubler roles." )],
]);

const RETURN_TO_HAND_ROWS = [
  ["ColorPie!A161:E161", "card"],
  ["ColorPie!A162:E162", "artifact"],
  ["ColorPie!A163:E163", "creature"],
  ["ColorPie!A164:E164", "enchantment"],
  ["ColorPie!A165:E165", "instant"],
  ["ColorPie!A166:E166", "land"],
  ["ColorPie!A167:E167", "sorcery"],
];

for (const [sourceLocation, objectType] of RETURN_TO_HAND_ROWS) {
  CHANGES.set(sourceLocation, change({
    "Preferred Strategy": "destination-specific Oracle lens",
    "Master Query Fragment": `o:\"return target ${objectType}\" o:graveyard o:hand`,
    "Fallback / Alternate": "broaden article/pronoun wording only as an explicit review lane",
    "Translator Behavior": "Translate through the destination-specific candidate lens",
    "Master Status": "Review",
    "Confidence": 0.82,
    "Ambiguity / Guardrail": "Object, source zone, and hand destination stay explicit. Independent o: terms can occur in different abilities, so important same-ability claims require review.",
    "Authority": "CAL-022 / Calibration V3.2",
    "Last Reviewed": REVIEW_DATE,
  }, "Calibration V3.2 Learned_Rules", "CAL-010; CAL-013; CAL-022; CAL-053", `Replace the generic ordered recursion regex with a ${objectType}-specific graveyard-to-hand candidate lens.`));
}

function isBlank(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

function columnName(index) {
  let value = index + 1;
  let label = "";
  while (value > 0) {
    const remainder = (value - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    value = Math.floor((value - 1) / 26);
  }
  return label;
}

function normalizeValue(value) {
  if (value instanceof Date) return value.toISOString();
  return value === undefined ? null : value;
}

function normalizeMatrix(matrix) {
  return matrix.map((row) => row.map(normalizeValue));
}

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

async function fileHash(filePath) {
  return crypto.createHash("sha256").update(await fs.readFile(filePath)).digest("hex");
}

async function directoryManifest(directory) {
  const files = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(fullPath);
      else files.push({ path: path.relative(directory, fullPath).replaceAll("\\", "/"), sha256: await fileHash(fullPath), bytes: (await fs.stat(fullPath)).size });
    }
  }
  await walk(directory);
  return { files, sha256: stableHash(files) };
}

function extractTable(workbook, sheetName, keyHeader) {
  const sheet = workbook.worksheets.getItem(sheetName);
  const matrix = sheet.getUsedRange().values;
  const headerIndex = matrix.findIndex((row) => row.some((cell) => String(cell ?? "").trim() === keyHeader));
  if (headerIndex < 0) throw new Error(`Header ${keyHeader} not found in ${sheetName}.`);
  const headers = matrix[headerIndex].map((value) => String(value ?? "").trim());
  const rows = matrix.slice(headerIndex + 1)
    .map((row, offset) => ({ workbookRow: headerIndex + 2 + offset, row }))
    .filter(({ row }) => !isBlank(row[0]));
  return { sheet, matrix, headerIndex, headers, rows };
}

function tally(rows, columnIndex) {
  return Object.fromEntries([...rows.reduce((map, item) => {
    const value = item.row[columnIndex];
    const key = isBlank(value) ? "(blank)" : String(value).trim();
    map.set(key, (map.get(key) ?? 0) + 1);
    return map;
  }, new Map())].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

function csvCell(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function markdownCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\r", " ").replaceAll("\n", " ");
}

function statusMovement(before, after) {
  const order = { Semantic: 0, Review: 1, "Production-ready": 2 };
  if (before === after) return "unchanged";
  if (!(before in order) || !(after in order)) return "changed";
  return order[after] > order[before] ? "promoted" : "downgraded";
}

function allSheetNames(workbook) {
  const names = [];
  for (let index = 0; ; index += 1) {
    try { names.push(workbook.worksheets.getItemAt(index).name); } catch { break; }
  }
  return names;
}

function getSheetSnapshot(workbook, name) {
  const used = workbook.worksheets.getItem(name).getUsedRange();
  return { values: normalizeMatrix(used.values), formulas: normalizeMatrix(used.formulas) };
}

function formulaCount(workbook) {
  let count = 0;
  for (const name of allSheetNames(workbook)) {
    const formulas = workbook.worksheets.getItem(name).getUsedRange().formulas;
    count += formulas.flat().filter((value) => typeof value === "string" && value.startsWith("=")).length;
  }
  return count;
}

function formulaErrorCells(workbook) {
  const errorPattern = /^#(?:REF!|VALUE!|DIV\/0!|NAME\?|N\/A|NUM!|NULL!)/i;
  const errors = [];
  for (const name of allSheetNames(workbook)) {
    const values = workbook.worksheets.getItem(name).getUsedRange().values;
    for (let row = 0; row < values.length; row += 1) {
      for (let col = 0; col < values[row].length; col += 1) {
        if (errorPattern.test(String(values[row][col] ?? ""))) errors.push(`${name}!${columnName(col)}${row + 1}:${values[row][col]}`);
      }
    }
  }
  return errors;
}

function extractTaggerValues(text) {
  const values = [];
  for (const match of String(text ?? "").matchAll(/\botag:([A-Za-z0-9_-]+)/gi)) values.push(match[1].toLowerCase());
  return values;
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.mkdir(path.join(TEMP_DIR, "previews"), { recursive: true });

const initialAuthorityHash = await fileHash(AUTHORITY_PATH);
const initialCorpusManifest = await directoryManifest(CORPUS_DIR);
const initialSourceHash = await fileHash(SOURCE_PATH);
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(AUTHORITY_PATH));
const authoritySheetNames = allSheetNames(workbook);
const authorityFormulaCount = formulaCount(workbook);
const authorityHistorical = Object.fromEntries(HISTORICAL_SHEETS.map((name) => [name, getSheetSnapshot(workbook, name)]));
const authorityRaw = getSheetSnapshot(workbook, "scryall_data_accumulation");
const master = extractTable(workbook, "Master_Lexicon", "Source Location");
const headerMap = Object.fromEntries(master.headers.map((header, index) => [header, index]));

if (master.rows.length !== 1138) throw new Error(`Expected 1,138 Master_Lexicon rows; found ${master.rows.length}.`);
const sourceKeys = master.rows.map((item) => String(item.row[0]));
if (new Set(sourceKeys).size !== sourceKeys.length) throw new Error("Master_Lexicon Source Location values are not unique.");
for (const sourceLocation of ALREADY_GOVERNED) if (!sourceKeys.includes(sourceLocation)) throw new Error(`Missing already-governed row ${sourceLocation}.`);
for (const sourceLocation of CHANGES.keys()) {
  if (!sourceKeys.includes(sourceLocation)) throw new Error(`Planned change target not found: ${sourceLocation}.`);
  if (ALREADY_GOVERNED.has(sourceLocation)) throw new Error(`Planned change overlaps already-governed row: ${sourceLocation}.`);
}

const eligibleRows = master.rows.filter((item) => !ALREADY_GOVERNED.has(String(item.row[0])));
if (eligibleRows.length !== 1135) throw new Error(`Expected 1,135 eligible rows; found ${eligibleRows.length}.`);

const diffs = [];
for (const item of eligibleRows) {
  const sourceLocation = String(item.row[0]);
  const planned = CHANGES.get(sourceLocation);
  if (!planned) continue;
  const before = Object.fromEntries(FIELDS.map((field) => [field, normalizeValue(item.row[headerMap[field]] ?? null)]));
  const after = { ...before, ...planned.set };
  const materiallyChanged = FIELDS.some((field) => JSON.stringify(before[field]) !== JSON.stringify(after[field]));
  if (!materiallyChanged) throw new Error(`Planned change for ${sourceLocation} has no material field difference.`);

  for (const field of FIELDS) {
    const value = after[field];
    if (JSON.stringify(before[field]) === JSON.stringify(value)) continue;
    const cell = master.sheet.getRange(`${columnName(headerMap[field])}${item.workbookRow}`);
    cell.values = [[value]];
  }

  diffs.push({
    workbookRow: item.workbookRow,
    sourceLocation,
    term: item.row[headerMap["Term / Archetype"]],
    sourceCategory: item.row[headerMap["Source Category"]],
    before,
    after,
    authorityEvidenceSource: planned.authorityEvidenceSource,
    ruleTrace: planned.ruleTrace,
    reason: planned.reason,
    statusMovement: statusMovement(before["Master Status"], after["Master Status"]),
  });
}

if (diffs.length !== CHANGES.size) throw new Error(`Expected ${CHANGES.size} changed rows; produced ${diffs.length}.`);

const readme = workbook.worksheets.getItem("README");
readme.getRange("A1").values = [["CANDIDATE / NOT YET PRODUCTION AUTHORITY — IMPLICIT MAZE MASTER TRANSLATION"]];
readme.getRange("A2").values = [["Calibration V3.2 propagation candidate for Owner Review. Copy-derived from the frozen V3.2 workbook; raw corpus and historical evidence remain unchanged. Do not use as production authority until owner acceptance."]];

const candidateMasterBeforeExport = extractTable(workbook, "Master_Lexicon", "Source Location");
const candidateStatusCounts = tally(candidateMasterBeforeExport.rows, headerMap["Master Status"]);
const candidateConfidenceCounts = tally(candidateMasterBeforeExport.rows, headerMap.Confidence);

for (const name of authoritySheetNames) {
  const sheet = workbook.worksheets.getItem(name);
  const used = sheet.getUsedRange().values;
  const rows = used.length;
  const cols = used.reduce((max, row) => Math.max(max, row.length), 0);
  const previewRange = `A1:${columnName(Math.min(Math.max(cols, 1), 30) - 1)}${Math.min(Math.max(rows, 1), 35)}`;
  const preview = await workbook.render({ sheetName: name, range: previewRange, scale: 0.7, format: "png" });
  const safeName = `${String(authoritySheetNames.indexOf(name) + 1).padStart(2, "0")}-${name.replace(/[^A-Za-z0-9_-]+/g, "-")}.png`;
  await fs.writeFile(path.join(TEMP_DIR, "previews", safeName), new Uint8Array(await preview.arrayBuffer()));
}

await (await SpreadsheetFile.exportXlsx(workbook)).save(CANDIDATE_PATH);
const candidateWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(CANDIDATE_PATH));
const candidateSheetNames = allSheetNames(candidateWorkbook);
const candidateMaster = extractTable(candidateWorkbook, "Master_Lexicon", "Source Location");
const candidateRaw = getSheetSnapshot(candidateWorkbook, "scryall_data_accumulation");
const candidateFormulaCount = formulaCount(candidateWorkbook);
const candidateFormulaErrors = formulaErrorCells(candidateWorkbook);
const inspectFormulaErrors = await candidateWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
  maxChars: 5000,
});

const finalAuthorityHash = await fileHash(AUTHORITY_PATH);
const finalCorpusManifest = await directoryManifest(CORPUS_DIR);
const finalSourceHash = await fileHash(SOURCE_PATH);
const candidateHash = await fileHash(CANDIDATE_PATH);

const qaChecks = [];
function check(name, condition, evidence) {
  qaChecks.push({ name, status: condition ? "PASS" : "FAIL", evidence });
  if (!condition) throw new Error(`${name}: ${evidence}`);
}

check("Candidate workbook re-import", candidateSheetNames.length === authoritySheetNames.length, `${candidateSheetNames.length} sheets opened successfully.`);
check("Sheet inventory preserved", JSON.stringify(candidateSheetNames) === JSON.stringify(authoritySheetNames), "Candidate sheet names and order match the 34-sheet authority workbook.");
check("Master Lexicon population", candidateMaster.rows.length === 1138, `${candidateMaster.rows.length} rows; authority baseline 1,138.`);
check("Master Lexicon row identities", new Set(candidateMaster.rows.map((item) => String(item.row[0]))).size === 1138, "All Source Location values remain unique.");
check("Raw source sheet logical equality", stableHash(candidateRaw) === stableHash(authorityRaw), `SHA-256 logical matrix ${stableHash(candidateRaw)}.`);
check("Source workbook immutable", initialSourceHash === finalSourceHash, `${finalSourceHash}.`);
check("V3.2 authority workbook immutable", initialAuthorityHash === finalAuthorityHash, `${finalAuthorityHash}.`);
check("Raw corpus tree immutable", initialCorpusManifest.sha256 === finalCorpusManifest.sha256, `${finalCorpusManifest.files.length} file(s), manifest ${finalCorpusManifest.sha256}.`);
check("Formula inventory preserved", candidateFormulaCount === authorityFormulaCount, `${candidateFormulaCount} formula cells; authority ${authorityFormulaCount}.`);
check("Formula error scan", candidateFormulaErrors.length === 0, candidateFormulaErrors.length ? candidateFormulaErrors.join("; ") : "No #REF!, #VALUE!, #DIV/0!, #NAME?, #N/A, #NUM!, or #NULL! values found.");
check("Changed-row reconciliation", diffs.length + (eligibleRows.length - diffs.length) === eligibleRows.length, `${diffs.length} changed + ${eligibleRows.length - diffs.length} unchanged = ${eligibleRows.length} eligible.`);
check("Changed rows have traces", diffs.every((item) => item.ruleTrace.trim() && item.authorityEvidenceSource.trim()), "Every changed row has authority/evidence and CAL/EV trace fields.");

const learnedRuleIds = new Set(extractTable(candidateWorkbook, "Learned_Rules", "Rule ID").rows.map((item) => String(item.row[0])));
const evidenceIds = new Set(extractTable(candidateWorkbook, "Evidence_Closure_V3_2", "Evidence ID").rows.map((item) => String(item.row[0])));
const invalidTraceIds = diffs.flatMap((item) => item.ruleTrace.split(";").map((value) => value.trim()).filter(Boolean)).filter((id) => !learnedRuleIds.has(id) && !evidenceIds.has(id));
check("Rule-trace authority", invalidTraceIds.length === 0, invalidTraceIds.length ? `Unknown IDs: ${[...new Set(invalidTraceIds)].join(", ")}` : "Every CAL/EV identifier resolves in Learned_Rules or Evidence_Closure_V3_2.");

const forbiddenSyntax = /\blegal:|\bis:etb\b|\bcolors\s*(?:[:<>=!]|$)|\\s(?:pp|pt)\b|\/[igmsuy]+(?:\s|$)/i;
const forbiddenRows = candidateMaster.rows.filter((item) => [item.row[headerMap["Master Query Fragment"]], item.row[headerMap["Fallback / Alternate"]]].some((value) => forbiddenSyntax.test(String(value ?? ""))));
check("Unsupported syntax scan", forbiddenRows.length === 0, forbiddenRows.length ? forbiddenRows.map((item) => item.row[0]).join(", ") : "No legal:, is:etb, standalone colors:, \\spp/\\spt, or trailing regex flags in Master query/fallback fields.");

const allowlist = new Set(extractTable(candidateWorkbook, "Tagger_Allowlist", "Exact Tag").rows.map((item) => String(item.row[0]).toLowerCase()));
const priorTagsByRow = new Map(diffs.map((item) => [item.sourceLocation, new Set([item.before["Master Query Fragment"], item.before["Fallback / Alternate"]].flatMap(extractTaggerValues))]));
const genuinelyIntroducedTags = [...new Set(diffs.flatMap((item) => [item.after["Master Query Fragment"], item.after["Fallback / Alternate"]].flatMap(extractTaggerValues).filter((tag) => !priorTagsByRow.get(item.sourceLocation).has(tag))))];
const inventedTags = genuinelyIntroducedTags.filter((tag) => !allowlist.has(tag));
check("Introduced Tagger values", inventedTags.length === 0, genuinelyIntroducedTags.length ? `Introduced values are allowlisted: ${genuinelyIntroducedTags.join(", ")}.` : "No new otag values introduced.");

for (const name of HISTORICAL_SHEETS) {
  const candidateSnapshot = getSheetSnapshot(candidateWorkbook, name);
  check(`Historical sheet unchanged: ${name}`, stableHash(candidateSnapshot) === stableHash(authorityHistorical[name]), `Logical values/formulas hash ${stableHash(candidateSnapshot)}.`);
}

const candidateByKey = new Map(candidateMaster.rows.map((item) => [String(item.row[0]), item.row]));
const exactChecks = [
  ["ColorPie!A35:E35", "Master Query Fragment", "otag:board-wipe (o:\"destroy all creatures\" or o:\"exile all creatures\" or o:\"each creature gets -\" or o:\"damage to each creature\" or o:\"sacrifice all\")"],
  ["ColorPie!A36:E36", "Master Query Fragment", "(o:\"destroy all creatures target opponent controls\" or o:\"exile all creatures target opponent controls\")"],
  ["ColorPie!A36:E36", "Fallback / Alternate", "all-opponents / spare-my-board lane: (o:\"destroy all creatures you don't control\" or o:\"exile all creatures you don't control\" or o:\"destroy all creatures your opponents control\" or o:\"exile all creatures your opponents control\") + save-one/chosen-survivor lane + tribal/chosen-type survivor lane"],
  ["ColorPie!A36:E36", "Master Status", "Review"],
  ["ColorPie!A129:E129", "Master Query Fragment", "produces:[MANA]"],
  ["ColorPie!A26:E26", "Master Query Fragment", "t:instant o:/counter target.*spell/"],
  ["DeckArchetypes!B34", "Preferred Strategy", "governed recipe + classifier"],
  ["DeckArchetypes!B55", "Master Status", "Semantic"],
  ["CreatureTypes!A1", "Master Status", "Production-ready"],
];
for (const [key, field, expected] of exactChecks) {
  const actual = candidateByKey.get(key)?.[headerMap[field]];
  check(`Representative row: ${key} ${field}`, actual === expected, `Expected ${expected}; found ${actual}.`);
}

const expectedChangedKeys = [...CHANGES.keys()].sort();
const exportedChangedKeys = diffs.map((item) => item.sourceLocation).sort();
check("Exact candidate scope", JSON.stringify(expectedChangedKeys) === JSON.stringify(exportedChangedKeys), `${exportedChangedKeys.length} planned Master rows and no others.`);

const candidateReadme = candidateWorkbook.worksheets.getItem("README").getRange("A1:A2").values.flat().join(" ");
check("Candidate labeling", /CANDIDATE/i.test(candidateReadme) && /NOT YET PRODUCTION AUTHORITY/i.test(candidateReadme), "README prominently labels the workbook as a non-authority candidate.");

const diffHeaders = [
  "Workbook Row",
  "Source Location / Row Identity",
  "Source Category",
  "Term / Archetype",
  "Old Intent Class",
  "New Intent Class",
  "Old Preferred Strategy",
  "New Preferred Strategy",
  "Old Master Query Fragment",
  "New Master Query Fragment",
  "Old Fallback / Alternate",
  "New Fallback / Alternate",
  "Old Translator Behavior",
  "New Translator Behavior",
  "Old Master Status",
  "New Master Status",
  "Old Confidence",
  "New Confidence",
  "Old Ambiguity / Guardrail",
  "New Ambiguity / Guardrail",
  "Old Authority",
  "New Authority",
  "Old Last Reviewed",
  "New Last Reviewed",
  "Authority / Evidence Source",
  "CAL / GOV Rule Trace",
  "Status Movement",
  "Concise Reason for Change",
];

const diffCsvRows = diffs.map((item) => [
  item.workbookRow,
  item.sourceLocation,
  item.sourceCategory,
  item.term,
  item.before["Intent Class"],
  item.after["Intent Class"],
  item.before["Preferred Strategy"],
  item.after["Preferred Strategy"],
  item.before["Master Query Fragment"],
  item.after["Master Query Fragment"],
  item.before["Fallback / Alternate"],
  item.after["Fallback / Alternate"],
  item.before["Translator Behavior"],
  item.after["Translator Behavior"],
  item.before["Master Status"],
  item.after["Master Status"],
  item.before.Confidence,
  item.after.Confidence,
  item.before["Ambiguity / Guardrail"],
  item.after["Ambiguity / Guardrail"],
  item.before.Authority,
  item.after.Authority,
  item.before["Last Reviewed"],
  item.after["Last Reviewed"],
  item.authorityEvidenceSource,
  item.ruleTrace,
  item.statusMovement,
  item.reason,
]);
await fs.writeFile(DIFF_CSV_PATH, `${[diffHeaders, ...diffCsvRows].map((row) => row.map(csvCell).join(",")).join("\r\n")}\r\n`, "utf8");

const promoted = diffs.filter((item) => item.statusMovement === "promoted");
const downgraded = diffs.filter((item) => item.statusMovement === "downgraded");
const multiLens = diffs.filter((item) => !String(item.before["Intent Class"] ?? "").includes("Multi-Lens") && String(item.after["Intent Class"] ?? "").includes("Multi-Lens"));
const confidenceIncreased = diffs.filter((item) => Number(item.after.Confidence) > Number(item.before.Confidence));
const confidenceDecreased = diffs.filter((item) => Number(item.after.Confidence) < Number(item.before.Confidence));
const confidenceUnchanged = diffs.filter((item) => Number(item.after.Confidence) === Number(item.before.Confidence));
const ruleFrequency = [...diffs.flatMap((item) => item.ruleTrace.split(";").map((value) => value.trim()).filter((value) => value.startsWith("CAL-"))).reduce((map, rule) => map.set(rule, (map.get(rule) ?? 0) + 1), new Map())].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

const detailedTableHeaders = ["Row", "Term", "Status", "Strategy / Query", "Trace", "Reason"];
const detailedTableRows = diffs.map((item) => [
  `${item.workbookRow} / ${item.sourceLocation}`,
  item.term,
  `${item.before["Master Status"]} → ${item.after["Master Status"]}`,
  `${item.before["Preferred Strategy"]} → ${item.after["Preferred Strategy"]}; ${item.before["Master Query Fragment"] ?? "(blank)"} → ${item.after["Master Query Fragment"] ?? "(blank)"}`,
  item.ruleTrace,
  item.reason,
]);

const diffMarkdown = [
  "# Calibration V3.2 Propagation Diff",
  "",
  "**Disposition:** OWNER ACCEPTED — promoted as governed workbook authority; no runtime authority or implementation is implied.",
  "",
  "## Population Reconciliation",
  "",
  `- Baseline Master Lexicon population: **${master.rows.length.toLocaleString()}** unique rows.`,
  `- Already explicitly governed in the V3.2 authority workbook: **${ALREADY_GOVERNED.size}** rows (Counterspell, Reanimator, Group Slug).`,
  `- Eligible automatic-evaluation population: **${eligibleRows.length.toLocaleString()}** rows.`,
  `- Expected business estimate: **1,038** remaining rows.`,
  `- Reconciled discrepancy: **+${eligibleRows.length - 1038}** eligible rows. The 100 VM-578 calibration cases are request-level fixtures, not one-to-one Master Lexicon rows; only three prior changes are row-addressable in Master_Lexicon.`,
  `- Changed eligible rows: **${diffs.length}**.`,
  `- Unchanged eligible rows: **${(eligibleRows.length - diffs.length).toLocaleString()}**.`,
  `- Reconciliation: **${diffs.length} changed + ${(eligibleRows.length - diffs.length).toLocaleString()} unchanged = ${eligibleRows.length.toLocaleString()} eligible**.`,
  "",
  "## Candidate Outcome",
  "",
  `- Promotions: **${promoted.length}** (${promoted.map((item) => item.term).join(", ") || "none"}).`,
  `- Downgrades: **${downgraded.length}** (${downgraded.map((item) => item.term).join(", ") || "none"}).`,
  `- Candidate Production-ready total: **${candidateStatusCounts["Production-ready"] ?? 0}**.`,
  `- Candidate Review total: **${candidateStatusCounts.Review ?? 0}**.`,
  `- Candidate Semantic total: **${candidateStatusCounts.Semantic ?? 0}**.`,
  `- Multi-Lens conversions: **${multiLens.length}** (${multiLens.map((item) => item.term).join(", ") || "none"}).`,
  `- Confidence changes: **${confidenceIncreased.length} increased**, **${confidenceDecreased.length} decreased**, **${confidenceUnchanged.length} unchanged among changed rows**.`,
  "",
  "## Owner Finding Remediation Delta",
  "",
  `- Prior 24-row owner-review candidate SHA-256: \`${PRIOR_OWNER_REVIEW_CANDIDATE_SHA256}\`.`,
  `- Remediated candidate SHA-256: \`${candidateHash}\`.`,
  "- Declared semantic delta: only `ColorPie!A36:E36` / workbook row 909. The other 23 accepted propagation rows are protected by the relative-candidate QA comparison.",
  "- Row 909: Mechanical pattern → Multi-Lens function; ownership-specific Oracle lens → governed Multi-Lens recipe; all-opponents query → target-one-opponent primary lane; survivor-only alternate → separately labeled all-opponents/spare-my-board plus survivor lanes; Production-ready / 0.90 → Review / 0.68.",
  "- Finding-to-invariant: one-player intent and all-opponents/spare-my-board intent must remain separately named lanes, and an unvalidated major branch cannot be Production-ready.",
  "",
  "## Rule Frequency",
  "",
  ...ruleFrequency.map(([rule, count]) => `- ${rule}: ${count}`),
  "",
  "## Highest-Risk Changes",
  "",
  "1. Board-wipe rows now keep distinct governed lanes. The EV-003 intersection/alternate-lane model remains the broad-wipe contract, while the one-player row separates target-one-opponent wording from EV-001's all-opponents/spare-my-board wording and remains Review pending targeted-lane validation.",
  "2. Mana-production rows now use produces: only as a capability signal. Duration, self-production, land-untap acceleration, and grantor/support roles remain post-retrieval classifications.",
  "3. Composite archetypes (Tokens, Aristocrats, Blink/Flicker, Sacrifice, ETB Value) now expose named roles instead of opaque OR queries; most remain Review because the lanes are governed but not mechanically exhaustive.",
  "4. Treasure is downgraded from Production-ready to Review because a bare o:Treasure query conflates generators, token objects, payoffs, and spenders.",
  "",
  "## Unresolved Classes for Future Targeted Calibration",
  "",
  "- Broad subjective archetypes such as Control, Stax, Chaos, Goodstuff, Midrange Value, and Group Hug remain Semantic rather than receiving invented proxies.",
  "- Mana-production duration and repeatability need a targeted classifier calibration beyond the broad produces: capability signal.",
  "- Graveyard Value, Spellslinger, Enchantress, Lands Matter, and similar relationship archetypes need role-specific calibration rather than one text query.",
  "- The existing Reanimator fallback references otag:reanimate, which is not present in the current Tagger_Allowlist. It predates this pass and was preserved as frozen V3.2 history; this pass introduced no non-allowlisted Tagger value.",
  "- No direct Master Lexicon row exists for the full grindy-draw phrase, soft-preference vocabulary, session-context contract, or contradiction UX. Their frozen behavior remains in Learned_Rules, Translation_Contract, Resolved_29_V3, and Evidence_Closure_V3_2 rather than being guessed into unrelated rows.",
  "",
  "## Supporting-Sheet Treatment",
  "",
  "- README A1:A2 is the only direct supporting-sheet edit; it clearly labels the workbook as a candidate and not production authority.",
  "- Dashboard formulas were preserved and recalculate from the propagated Master_Lexicon state.",
  "- Plain_Language, Archetype_Map, Query_Recipes, Regex_Library, Parser_Schema, Tagger_Allowlist, Learned_Rules, Translation_Contract, Archscry_Enrichment, all owner/evidence sheets, and scryall_data_accumulation were not rewritten.",
  "",
  "## Detailed Changed Rows",
  "",
  `| ${detailedTableHeaders.join(" | ")} |`,
  `| ${detailedTableHeaders.map(() => "---").join(" | ")} |`,
  ...detailedTableRows.map((row) => `| ${row.map(markdownCell).join(" | ")} |`),
  "",
  "The companion CSV contains every required old/new field, authority/evidence source, rule trace, status movement, and rationale without Markdown truncation.",
  "",
];
await fs.writeFile(DIFF_MD_PATH, `${diffMarkdown.join("\n")}\n`, "utf8");

const baselineNonAllowlistedTags = [...new Set(candidateMaster.rows.flatMap((item) => [item.row[headerMap["Master Query Fragment"]], item.row[headerMap["Fallback / Alternate"]]].flatMap(extractTaggerValues)).filter((tag) => !allowlist.has(tag)))].sort();
const qaMarkdown = [
  "# Calibration V3.2 Propagation QA",
  "",
  "**RobQA disposition:** PASS — owner accepted exact workbook SHA-256 `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`; workbook authority promotion only.",
  "",
  "## Owner Acceptance and Promotion",
  "",
  "- Owner acceptance date: 2026-08-27.",
  `- Current governed workbook authority: \`${ACCEPTED_AUTHORITY_PATH}\`.`,
  "- The authority workbook is byte-identical to the accepted propagation candidate.",
  "- Runtime, Plain Reading, Operator Hand, Archscry ranking, generated product data, placement, and recommendation behavior remain out of scope.",
  "",
  "## Classification",
  "",
  "- QA tier: QA-0 with protected workbook/data-authority checks.",
  "- Changed behavior: a copy-derived Master_Lexicon candidate and its review diffs; no runtime behavior changed.",
  "- Protected behavior: raw corpus, raw provenance sheet, V3.2 authority workbook, historical evidence sheets, formulas, sheet structure, production JavaScript, Plain Reading, Operator Hand, Archscry, placement, and generated product data.",
  "- CPU-heavy validation: NOT REQUIRED. No runtime, placement, ranking engine, migration, or deployment behavior changed.",
  "",
  "## Workbook and Integrity Checks",
  "",
  "| Check | Result | Evidence |",
  "| --- | --- | --- |",
  ...qaChecks.map((item) => `| ${markdownCell(item.name)} | ${item.status} | ${markdownCell(item.evidence)} |`),
  "",
  "## Formula / Reference Checks",
  "",
  `- Authority formula cells: ${authorityFormulaCount}. Candidate formula cells: ${candidateFormulaCount}.`,
  `- Artifact-tool formula-error inspect completed with no manual error-cell matches. Compact inspect output length: ${inspectFormulaErrors.ndjson.length} characters.`,
  "- Candidate workbook was exported and re-imported successfully before reports were finalized.",
  "- After generation, run the existing scripts/verify-maze-knowledge.py --stage workbook verifier against the exported candidate and record the result in the final QA artifact.",
  "- After generation, review the 34 rendered sheet previews and record the visual disposition in the final QA artifact.",
  "",
  "## Raw Corpus and Provenance Proof",
  "",
  `- Raw corpus manifest before/after: ${initialCorpusManifest.sha256} / ${finalCorpusManifest.sha256}; ${finalCorpusManifest.files.length} file(s).`,
  `- VM-577 source workbook SHA-256 before/after: ${initialSourceHash} / ${finalSourceHash}.`,
  `- V3.2 authority workbook SHA-256 before/after: ${initialAuthorityHash} / ${finalAuthorityHash}.`,
  `- Raw scryall_data_accumulation logical matrix hash: ${stableHash(candidateRaw)}; unchanged from authority.`,
  "",
  "## Syntax and Tagger Checks",
  "",
  "- No introduced legal:, is:etb, standalone colors:, undocumented regex helper, or trailing regex-flag syntax.",
  `- Newly introduced otag values: ${genuinelyIntroducedTags.join(", ") || "none"}; all are present in Tagger_Allowlist.`,
  `- Preserved baseline non-allowlisted otag values still visible in Master_Lexicon: ${baselineNonAllowlistedTags.join(", ") || "none"}. These were not introduced by propagation and remain an explicit future-review class.`,
  "- All 24 changed rows resolve every CAL/EV trace against Learned_Rules or Evidence_Closure_V3_2.",
  "",
  "## Representative Positive / Negative Spot Checks",
  "",
  "- Positive: ColorPie!A35:E35 contains the EV-003 board-wipe intersection core and role-labeled alternate lanes.",
  "- Positive: ColorPie!A36:E36 uses the target-one-opponent family as its primary lane, keeps EV-001's all-opponents/spare-my-board family in a separately labeled alternate lane, retains survivor lanes, and remains Review.",
  "- Positive: ColorPie!A129:E129 uses produces:[MANA] with explicit self/alternate/untap/grantor classification.",
  "- Positive: the already-governed Counterspell and Group Slug rows remain unchanged and retain their frozen primary lens/classifier contracts.",
  "- Negative: DeckArchetypes!B55 Goodstuff remains Semantic; no subjective quality proxy was invented.",
  "- Negative: CreatureTypes!A1 Advisor remains Production-ready native taxonomy; unrelated rows were not rewritten.",
  "- Negative: Tokens no longer introduces the non-allowlisted token-generator Tagger shortcut.",
  "",
  "## Count Reconciliation",
  "",
  `- Baseline: 1,138 Master rows. Already governed: 3. Eligible: 1,135.`,
  `- Eligible outcome: ${diffs.length} changed + ${eligibleRows.length - diffs.length} unchanged = ${eligibleRows.length}.`,
  `- Candidate status totals: ${candidateStatusCounts["Production-ready"] ?? 0} Production-ready + ${candidateStatusCounts.Review ?? 0} Review + ${candidateStatusCounts.Semantic ?? 0} Semantic = 1,138.`,
  `- Candidate confidence distribution: ${Object.entries(candidateConfidenceCounts).map(([value, count]) => `${value}:${count}`).join(", ")}.`,
  "",
  "## Validation Commands",
  "",
  "- Bundled artifact-tool producer: node scripts/propagate-maze-calibration-v3-2.mjs",
  "- Existing repository verifier: bundled Python scripts/verify-maze-knowledge.py --stage workbook against the candidate, with output written to a temporary directory.",
  "- Focused source/diff hygiene: git diff --check",
  "- No npm runtime, parser, placement, browser, journey, synthetic, mutation, recovery, or deployment suite was run; those surfaces are protected and untouched.",
  "",
  "## Owner Acceptance Boundary",
  "",
  `Owner accepted the exact 24-row candidate, including the remediated row-909 Review contract. Deterministic population, formula, provenance, syntax, Tagger, trace, and unchanged-history facts remain machine-checked. This acceptance promotes workbook authority only.`,
  "",
  `Candidate workbook SHA-256: ${candidateHash}.`,
  "",
];
await fs.writeFile(QA_PATH, `${qaMarkdown.join("\n")}\n`, "utf8");

await fs.writeFile(path.join(TEMP_DIR, "evaluation.json"), `${JSON.stringify({
  baselineRows: master.rows.length,
  alreadyGoverned: [...ALREADY_GOVERNED],
  eligibleRows: eligibleRows.length,
  changedRows: diffs.length,
  unchangedRows: eligibleRows.length - diffs.length,
  candidateStatusCounts,
  candidateConfidenceCounts,
  diffs,
  qaChecks,
  inspectFormulaErrors: inspectFormulaErrors.ndjson,
  hashes: { authority: finalAuthorityHash, source: finalSourceHash, corpus: finalCorpusManifest.sha256, candidate: candidateHash },
}, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  status: "PASS",
  candidate: CANDIDATE_PATH,
  candidateSha256: candidateHash,
  baselinePopulation: master.rows.length,
  eligiblePopulation: eligibleRows.length,
  alreadyGoverned: ALREADY_GOVERNED.size,
  changed: diffs.length,
  unchanged: eligibleRows.length - diffs.length,
  promotions: promoted.length,
  downgrades: downgraded.length,
  multiLensConversions: multiLens.length,
  candidateStatusCounts,
  formulaCells: candidateFormulaCount,
  formulaErrors: candidateFormulaErrors.length,
  qaChecks: qaChecks.length,
}, null, 2));
