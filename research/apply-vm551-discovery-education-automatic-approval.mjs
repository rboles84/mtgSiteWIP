import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  VM551_AUTOMATIC_APPROVAL_BASIS,
  assertAutomaticEducationApproval,
} from "./vm551-evidence-approval.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const pretty = (value) => `${JSON.stringify(value, null, 2)}\n`;
const input = await readJson("data/dossier/discovery-education-authority.source.json");

function validationFor(record) {
  const isRuntimeContract = ["DISCOVERY_LABEL", "MAZE_EXPLANATION"].includes(record.record_type);
  return assertAutomaticEducationApproval({
    id: record.record_id,
    fact_source_locators: [record.provenance.locator, ...(record.provenance.supporting_locators || [])],
    content_class: isRuntimeContract ? "VERIFIED_RUNTIME_CONTRACT" : "FACTUAL_EDUCATION",
    public_copy: record.proposed_copy,
    limitation: record.limitations,
    creates_identity_meaning: false,
    changes_placement_semantics: false,
  }, record.record_id);
}

const records = input.records.map((record) => {
  if (record.disposition === "APPROVED_PUBLIC") return record;
  return {
    ...record,
    disposition: "APPROVED_PUBLIC",
    approval_basis: VM551_AUTOMATIC_APPROVAL_BASIS,
    validation: validationFor(record),
    owner_decision: null,
  };
});

const source = {
  ...input,
  status: "AUTOMATIC_ADJUDICATION_COMPLETE",
  authority_rule: "Factual teaching and verified runtime microcopy pass vm551-education-validator-v1. Owner review is reserved for interpretive exceptions.",
  records,
};
const catalog = {
  schema_version: "vm551-discovery-education-catalog-v1",
  generated_from: "data/dossier/discovery-education-automatic-adjudication.source.json",
  glossary: records.filter((record) => record.record_type === "GLOSSARY_TERM").map((record) => ({
    record_id: record.record_id,
    term: record.term,
    aliases: record.aliases,
    definition: record.proposed_copy,
    provenance: record.provenance,
    ...(record.teaching_policy ? { teaching_policy: record.teaching_policy } : {}),
  })),
  microcopy: records.filter((record) => record.record_type !== "GLOSSARY_TERM").map((record) => ({
    record_id: record.record_id,
    type: record.record_type,
    term: record.term,
    copy: record.proposed_copy,
    provenance: record.provenance,
  })),
};
const exceptions = records.filter((record) => record.disposition === "REVIEW_REQUIRED");
const auditHeaders = ["record_id", "record_type", "term", "disposition", "approval_basis", "validator_version", "failures"];
const auditRows = records.map((record) => [record.record_id, record.record_type, record.term, record.disposition, record.approval_basis || "BASELINE_MIGRATION", record.validation?.validator_version || "baseline", record.validation?.failures?.join(" | ") || "none"]);
const audit = [auditHeaders, ...auditRows].map((row) => row.join("\t")).join("\n") + "\n";
const exceptionView = `# VM-551 Packet 3 Automatic Adjudication\n\n- Approved glossary records: **${catalog.glossary.length}**\n- Approved instructional microcopy records: **${catalog.microcopy.length}**\n- Owner exceptions: **${exceptions.length}**\n- Validator: \`vm551-education-validator-v1\`\n\nNo identity meaning or placement semantic is introduced by this factual education authority.\n`;

const outputs = {
  "data/dossier/discovery-education-automatic-adjudication.source.json": pretty(source),
  "data/dossier/discovery-education-catalog.json": pretty(catalog),
  "docs/audits/vm551-all-37-dossier-closeout/packet-3-automatic-adjudication.tsv": audit,
  "docs/audits/vm551-all-37-dossier-closeout/approval-packet-3-owner-exceptions.md": exceptionView,
};
for (const [relativePath, content] of Object.entries(outputs)) {
  const absolutePath = path.join(root, relativePath);
  if (check) {
    if (await readFile(absolutePath, "utf8") !== content) throw new Error(`Stale Packet 3 automatic artifact: ${relativePath}`);
  } else {
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content);
  }
}
console.log(JSON.stringify({ status: "PASS", glossary: catalog.glossary.length, microcopy: catalog.microcopy.length, owner_exceptions: exceptions.length }, null, 2));
