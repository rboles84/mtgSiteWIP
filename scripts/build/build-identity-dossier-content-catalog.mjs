import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SOURCE_PATH = path.join(ROOT, "data", "dossier", "identity-dossier-content.source.json");
const CATALOG_PATH = path.join(ROOT, "data", "dossier", "identity-dossier-content.catalog.json");
const CHECK = process.argv.includes("--check");

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function hashCopy(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function validateSource(source) {
  invariant(source?.schema_version === "vm551-identity-dossier-content-v1", "Unexpected dossier source schema.");
  invariant(Array.isArray(source.records) && source.records.length === 37, "Dossier source must contain exactly 37 records.");
  invariant(new Set(source.records.map((record) => record.identity_key)).size === 37, "Dossier source identity keys must be unique.");

  for (const record of source.records) {
    invariant(record.disposition === "APPROVED_PUBLIC", `${record.identity_key}: source record is not approved for public projection.`);
    invariant(record.validation?.passed === true, `${record.identity_key}: evidence validation did not pass.`);
    invariant(hashCopy(record.proposed_public_copy) === record.copy_sha256, `${record.identity_key}: copy_sha256 does not match proposed_public_copy.`);
  }

  const wubrg = source.records.find((record) => record.identity_key === "WUBRG");
  invariant(wubrg, "WUBRG dossier source record is required.");
  invariant(wubrg.semantic_model?.full_spectrum_integrator === "optional_vox_mana_archetype", "WUBRG Full-Spectrum Integrator must remain explicitly optional.");
  invariant(wubrg.semantic_model?.mechanic_relationships?.length === 7, "WUBRG must preserve the seven mechanic relationship classes.");
  invariant(wubrg.proposed_public_copy.what_to_look_for.every((item) => item.source_locator.startsWith("data/raw-factions/wubrg/")), "WUBRG exploration directions must point to raw source fields, not generated runtime data.");
  invariant(!JSON.stringify(wubrg.proposed_public_copy).includes("data/factions.json"), "WUBRG public copy cannot use generated factions data as evidence.");
  invariant(/commander determines the deck's engine/.test(wubrg.proposed_public_copy.how_this_plays.role), "WUBRG role must teach commander-specific Five-Color purpose rather than universalize it.");
  invariant(wubrg.proposed_public_copy.what_to_look_for.some((item) => item.title === "Rainbow Payoffs"), "WUBRG must expose Rainbow Payoffs in What to Look For.");

  const temur = source.records.find((record) => record.identity_key === "TEMUR");
  invariant(temur, "TEMUR dossier source record is required.");
  invariant(temur.semantic_model?.survival_through_attunement === "optional_vox_mana_archetype", "TEMUR attunement must remain an optional Vox Mana archetype.");
  invariant(temur.semantic_model?.blue_whisperer_mapping === "vox_mana_interpretation", "TEMUR Blue-to-whisperer mapping must remain interpretation.");
  invariant(temur.proposed_public_copy.what_to_look_for.every((item) => item.source_locator.startsWith("data/raw-factions/temur/")), "TEMUR exploration directions must point to raw source fields, not generated runtime data.");
  invariant(!JSON.stringify(temur.proposed_public_copy).includes("data/factions.json"), "TEMUR public copy cannot use generated factions data as evidence.");
  invariant(/Ferocious/.test(temur.proposed_public_copy.how_this_plays.mechanical_expression), "TEMUR mechanical expression must retain the Ferocious anchor.");
  invariant(/Atarka/.test(temur.proposed_public_copy.how_this_plays.mechanical_expression), "TEMUR mechanical expression must retain the Formidable timeline boundary.");

  const lorehold = source.records.find((record) => record.identity_key === "LOREHOLD");
  invariant(lorehold, "LOREHOLD dossier source record is required.");
  invariant(lorehold.semantic_model?.history_fighting_back === "vox_mana_play_translation", "LOREHOLD history-fighting-back language must remain a Vox Mana play translation.");
  invariant(lorehold.semantic_model?.historic_term_guard === "magic_rules_term_not_synonym_for_historical", "LOREHOLD must preserve the historic terminology guard.");
  invariant(lorehold.semantic_model?.mechanic_scope === "product_and_commander_specific_not_universal_lorehold_doctrine", "LOREHOLD mechanics must remain product- and commander-scoped.");
  invariant(lorehold.proposed_public_copy.what_to_look_for.every((item) => item.source_locator.startsWith("data/raw-factions/lorehold/") || item.source_locator.startsWith("data/precons/vox-mana-precons.source.json")), "LOREHOLD exploration directions must point to raw faction or precon source, not generated runtime data.");
  invariant(!JSON.stringify(lorehold.proposed_public_copy).includes("data/factions.json"), "LOREHOLD public copy cannot use generated factions data as evidence.");
  invariant(!/historic payoffs/i.test(lorehold.proposed_public_copy.how_this_plays.mechanical_expression), "LOREHOLD historical language must not misuse the Magic historic term.");
}

function projectCatalog(source) {
  return {
    schema_version: "vm551-identity-dossier-catalog-v1",
    generated_from: "data/dossier/identity-dossier-content.source.json",
    records: source.records.map((record) => ({
      identity_key: record.identity_key,
      identity_name: record.identity_name,
      ...record.proposed_public_copy,
      ...(record.semantic_model ? { semantic_model: record.semantic_model } : {}),
      provenance: {
        record_id: record.record_id,
        approval_basis: record.approval_basis,
        validator_version: record.validation.validator_version,
      },
    })),
  };
}

const source = JSON.parse(await readFile(SOURCE_PATH, "utf8"));
validateSource(source);
const output = `${JSON.stringify(projectCatalog(source), null, 2)}\n`;

if (CHECK) {
  const current = await readFile(CATALOG_PATH, "utf8");
  invariant(current.replace(/\r\n/g, "\n") === output, "Identity dossier catalog is stale. Run npm run build:identity-dossier-content.");
  console.log("Identity dossier content catalog is current and source-valid.");
} else {
  await writeFile(CATALOG_PATH, output, "utf8");
  console.log("Built data/dossier/identity-dossier-content.catalog.json from its approved source records.");
}
