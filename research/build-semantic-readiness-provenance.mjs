import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildProvenanceManifest } from "./semantic-readiness-lib.mjs";

const modulePath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(modulePath), "..");

export const RAW_TO_KEY = {
  abzan: "ABZAN", azorius_senate: "WU", black: "B", bant: "BANT", blue: "U",
  boros_legion: "WR", colorless: "COLORLESS", cult_of_rakdos: "BR", dune: "DUNE",
  esper: "ESPER", glint: "GLINT", golgari_swarm: "BG", green: "G", grixis: "GRIXIS",
  gruul_clans: "RG", house_dimir: "UB", ink: "INK", izzet_league: "UR", jeskai: "JESKAI",
  jund: "JUND", lorehold: "LOREHOLD", mardu: "MARDU", naya: "NAYA",
  orzhov_syndicate: "WB", prismari: "PRISMARI", quandrix: "QUANDRIX", red: "R",
  selesnya_conclave: "WG", silverquill: "SILVERQUILL", simic_combine: "UG", sultai: "SULTAI",
  temur: "TEMUR", witch: "WITCH", witherbloom: "WITHERBLOOM", wubrg: "WUBRG",
  white: "W", yore: "YORE",
};

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

export async function buildManifestFromRepository(repoRoot = defaultRepoRoot) {
  const ledger = await readJson(path.join(repoRoot, "docs", "incidents", "CRIT-001-identity-recovery-ledger.json"));
  const rawRecords = {};
  for (const rawId of Object.keys(RAW_TO_KEY)) {
    const base = path.join(repoRoot, "data", "raw-factions", rawId, rawId);
    rawRecords[rawId] = {
      claims: await readJson(`${base}.claims.json`),
      sources: await readJson(`${base}.sources.json`),
      profile: await readJson(`${base}.profile.json`),
      placement: await readJson(`${base}.placement.json`),
    };
  }
  return buildProvenanceManifest({ rawRecords, rawToKey: RAW_TO_KEY, ledger });
}

async function main() {
  const check = process.argv.includes("--check");
  const manifest = await buildManifestFromRepository();
  const outputPath = path.join(defaultRepoRoot, "data", "semantic-readiness-provenance.json");
  const rendered = `${JSON.stringify(manifest, null, 2)}\n`;
  if (check) {
    const existing = await readFile(outputPath, "utf8").catch(() => "");
    if (existing !== rendered) throw new Error("semantic-readiness-provenance.json is stale; run npm run build:semantic-provenance");
    console.log(`Verified ${manifest.entries.length} semantic provenance entries.`);
    return;
  }
  await writeFile(outputPath, rendered);
  console.log(`Wrote ${path.relative(defaultRepoRoot, outputPath)} with ${manifest.entries.length} entries.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
