import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const auditsDir = path.dirname(scriptDir);
const files = [
  "validate-downstream-compatibility-docs.mjs",
  "downstream-compatibility-contract.md",
  "bounded-mvp-repair-plan.md",
  "requirements-traceability-matrix.csv",
  "result-field-consumer-map.csv",
  "owner-review-critical-extract.md",
  "VM-551-full-placement-system-audit.md",
  "placement-system-architecture-map.md",
  "requirements-specification.md",
  "README.md",
];

const publicTreatment = "Do not fabricate or infer a public value; render nothing when absent";
const internalTreatment = "Preserve supplied value and optional field shape without manufacturing a default";

function runMutation(name, mutate) {
  const tempDir = fs.mkdtempSync(path.join(auditsDir, "vm551-compat-validator-"));
  const safePrefix = `${auditsDir}${path.sep}vm551-compat-validator-`;
  if (!tempDir.startsWith(safePrefix)) throw new Error(`Unsafe temporary path: ${tempDir}`);

  try {
    for (const file of files) fs.copyFileSync(path.join(scriptDir, file), path.join(tempDir, file));
    const mapPath = path.join(tempDir, "result-field-consumer-map.csv");
    fs.writeFileSync(mapPath, mutate(fs.readFileSync(mapPath, "utf8")), "utf8");
    const result = spawnSync(process.execPath, [path.join(tempDir, "validate-downstream-compatibility-docs.mjs")], {
      cwd: tempDir,
      encoding: "utf8",
    });
    if (result.status === 0) throw new Error(`${name} mutation unexpectedly passed`);
    return { name, status: "EXPECTED-FAIL", exit_code: result.status };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

const results = [
  runMutation("blank-color_weights-public-treatment", (text) => {
    const target = `,${publicTreatment},${internalTreatment},PRESERVE-UNCHANGED,`;
    if (!text.includes(target)) throw new Error("Public-treatment mutation target not found");
    return text.replace(target, `,,${internalTreatment},PRESERVE-UNCHANGED,`);
  }),
  runMutation("blank-color_weights-internal-treatment", (text) => {
    const target = `,${publicTreatment},${internalTreatment},PRESERVE-UNCHANGED,`;
    if (!text.includes(target)) throw new Error("Internal-treatment mutation target not found");
    return text.replace(target, `,${publicTreatment},,PRESERVE-UNCHANGED,`);
  }),
];

console.log(JSON.stringify({ result: "PASS", mutations: results }, null, 2));
