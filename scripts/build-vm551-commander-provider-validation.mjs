import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const preconPath = path.join(repoRoot, "data", "precons", "vox-mana-precon-catalog.json");
const commanderIndexPath = path.join(repoRoot, "data", "scryfall", "indexes", "commander-index.json");
const outputPath = path.join(repoRoot, "data", "placement", "commander-provider-validation.json");
const isLive = process.argv.includes("--live");
const isCheck = process.argv.includes("--check");

const readJson = async (filePath) => JSON.parse(await readFile(filePath, "utf8"));

function decodeHtml(value = "") {
  return String(value)
    .replace(/&apos;|&#39;|&#x27;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&amp;|&#38;/gi, "&")
    .replace(/&rsquo;|&#8217;/gi, "'");
}

function normalizeName(value = "") {
  return decodeHtml(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function comparableName(value = "") {
  return normalizeName(value).replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function edhrecSlug(name) {
  return normalizeName(name)
    .replace(/&/g, " and ")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pageNamesCommander(html, commanderName) {
  const decoded = decodeHtml(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const normalizedPage = comparableName(decoded);
  return normalizedPage.includes(`${comparableName(commanderName)} commander`);
}

async function validateEdhrec(commanderName, url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "VoxManaProviderVerifier/1.0 (+https://voxmana.io)" },
    });
    const html = await response.text();
    const exactMatch = response.ok && pageNamesCommander(html, commanderName);
    return {
      ok: exactMatch,
      status: response.status,
      finalUrl: response.url,
      reason: exactMatch
        ? "Exact commander page title/name match"
        : response.ok
          ? "Destination did not identify the exact commander"
          : `HTTP ${response.status}`,
    };
  } catch (error) {
    return { ok: false, status: 0, finalUrl: url, reason: `Request failed: ${error.message}` };
  }
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const [preconCatalog, commanderIndex, existing] = await Promise.all([
  readJson(preconPath),
  readJson(commanderIndexPath),
  readJson(outputPath),
]);

const commanderNames = [...new Set(preconCatalog.precons.map((precon) => precon.mainCommander).filter(Boolean))]
  .sort((left, right) => left.localeCompare(right));
const canonicalNames = new Set(commanderIndex.commanders.map((card) => card.name));
const canonicalComparableNames = new Set([...canonicalNames].map(comparableName));
const hasCanonicalMatch = (commanderName) => {
  if (canonicalComparableNames.has(comparableName(commanderName))) return true;
  const parts = commanderName.split(/\s+\/\/?\s+/).filter(Boolean);
  return parts.length > 1 && parts.every((part) => canonicalComparableNames.has(comparableName(part)));
};

if (isLive) {
  const validations = await mapLimit(commanderNames, 4, async (commanderName) => {
    const existingUrl = existing.commanders?.[commanderName]?.links?.find((link) => link.service === "edhrec")?.url;
    const url = existingUrl || `https://edhrec.com/commanders/${edhrecSlug(commanderName)}`;
    const result = await validateEdhrec(commanderName, url);
    process.stdout.write(`${result.ok ? "PASS" : "FAIL"} ${commanderName} -> ${result.finalUrl} (${result.reason})\n`);
    return { commanderName, url: result.finalUrl || url, canonicalMatch: hasCanonicalMatch(commanderName), ...result };
  });

  const commanders = {};
  for (const validation of validations) {
    commanders[validation.commanderName] = validation.ok
      ? {
          canonical_card_source_status: validation.canonicalMatch ? "MATCHED" : "MISSING_LOCAL_RECORD",
          links: [{
            service: "edhrec",
            label: "EDHREC",
            url: validation.url,
            verified: true,
            verified_at: "2026-08-13",
            verification: "EXACT_COMMANDER_NAME_MATCH",
          }],
          suppressed: [],
        }
      : {
          canonical_card_source_status: validation.canonicalMatch ? "MATCHED" : "MISSING_LOCAL_RECORD",
          links: [],
          suppressed: [{ service: "edhrec", reason: `${validation.reason} on 2026-08-13.` }],
        };
  }

  const verified = Object.values(commanders).filter((record) => record.links.length).length;
  const suppressed = commanderNames.length - verified;
  const output = {
    schema_version: "vm551-commander-provider-validation-v2",
    validated_at: "2026-08-13",
    scope: {
      source: "data/precons/vox-mana-precon-catalog.json",
      canonical_card_source: "data/scryfall/indexes/commander-index.json",
      unique_commanders: commanderNames.length,
      validation_contract: "HTTP success plus exact commander page title/name match",
    },
    providers: {
      edhrec: {
        enabled: true,
        verified,
        suppressed,
        method: "Live validation of every exact commander destination against the canonical commander name.",
      },
      archidekt: existing.providers.archidekt,
      mtgdecks: existing.providers.mtgdecks,
      mtggoldfish: existing.providers.mtggoldfish,
    },
    commanders,
  };
  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify({ status: suppressed ? "INCOMPLETE" : "PASS", commanders: commanderNames.length, verified, suppressed }, null, 2));
  if (suppressed) process.exitCode = 2;
} else {
  assert.equal(existing.scope.unique_commanders, commanderNames.length);
  assert.deepEqual(Object.keys(existing.commanders).sort((left, right) => left.localeCompare(right)), commanderNames);
  for (const commanderName of commanderNames) {
    const record = existing.commanders[commanderName];
    assert.equal(record.links.length, 1, `${commanderName} must have one validated exact-build destination`);
    const link = record.links[0];
    assert.equal(link.verified, true);
    assert.equal(link.verification, "EXACT_COMMANDER_NAME_MATCH");
    assert.match(link.url, /^https:\/\/edhrec\.com\/commanders\//);
  }
  assert.equal(existing.providers.edhrec.verified, commanderNames.length);
  assert.equal(existing.providers.edhrec.suppressed, 0);
  if (isCheck) console.log(`Commander provider matrix PASS: ${commanderNames.length}/${commanderNames.length} exact destinations`);
}
