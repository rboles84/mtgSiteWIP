import fs from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2];
const outputPath = process.argv[3];
if (!sourcePath || !outputPath) throw new Error("Usage: node build-command-zone-evidence.mjs <oracle-cards.json> <output.json>");

const cards = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const manifestPath = path.join(path.dirname(sourcePath), "bulk-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const order = ["W", "U", "B", "R", "G"];
const targets = ["UBRG", "WBRG", "WURG", "WUBG", "WUBR"];
const oracle = (card) => [card.oracle_text, ...(card.card_faces ?? []).map((face) => face.oracle_text)].filter(Boolean).join("\n");
const colorIdentity = (card) => order.filter((color) => (card.color_identity ?? []).includes(color)).join("");
const commanderLegal = (card) => card?.legalities?.commander === "legal";
const commanderEligible = (card) => {
  const typeLine = [card.type_line, ...(card.card_faces ?? []).map((face) => face.type_line)].filter(Boolean).join(" // ");
  return /\bLegendary\b.*\bCreature\b/i.test(typeLine) || /can be your commander/i.test(oracle(card));
};
const exactDoctor = (card) => {
  const typeLine = [card.type_line, ...(card.card_faces ?? []).map((face) => face.type_line)].filter(Boolean).join(" // ");
  return /Legendary Creature\s+—\s+Time Lord Doctor(?:\s*\/\/|$)/i.test(typeLine);
};
const partnerVariant = (text) => text.match(/Partner\s*[—-]\s*([^\n(]+)/i)?.[1]?.trim().toLowerCase() ?? null;
const namedPartner = (text) => text.match(/Partner with\s+([^\n(]+)/i)?.[1]?.trim() ?? null;
const genericPartner = (text) => /(?:^|\n)Partner(?:\s*\([^\n]*both have partner[^\n]*\))?(?:\n|$)/i.test(text);

function analyze(target) {
  const components = cards
    .filter((card) => {
      const ci = colorIdentity(card);
      if (!commanderLegal(card) || !commanderEligible(card) || ![...ci].every((color) => target.includes(color)) || ci.length > 3) return false;
      const text = oracle(card);
      return (card.keywords ?? []).some((keyword) => keyword.toLowerCase() === "partner") || /friends forever|doctor's companion/i.test(text) || exactDoctor(card);
    })
    .map((card) => ({
      name: card.name,
      color_identity: colorIdentity(card),
      oracle_text: oracle(card),
      generic_partner: genericPartner(oracle(card)),
      partner_variant: partnerVariant(oracle(card)),
      named_partner: namedPartner(oracle(card)),
      doctors_companion: /Doctor's companion/i.test(oracle(card)),
      doctor: exactDoctor(card),
    }));

  const byName = new Map(components.map((card) => [card.name, card]));
  const union = (a, b) => order.filter((color) => a.color_identity.includes(color) || b.color_identity.includes(color)).join("");
  const pairs = new Map();
  const addPair = (a, b, mechanism) => {
    if (!a || !b || a.name === b.name || union(a, b) !== target) return;
    const commandZone = [a.name, b.name].sort();
    pairs.set(commandZone.join(" + "), {
      command_zone: commandZone,
      mechanism,
      components: [a, b].map(({ name, color_identity, oracle_text }) => ({ name, color_identity, oracle_text })),
    });
  };

  const generic = components.filter((card) => card.generic_partner);
  for (let i = 0; i < generic.length; i += 1) for (let j = i + 1; j < generic.length; j += 1) addPair(generic[i], generic[j], "generic Partner");

  const variants = new Map();
  for (const card of components.filter((row) => row.partner_variant)) variants.set(card.partner_variant, [...(variants.get(card.partner_variant) ?? []), card]);
  for (const [variant, rows] of variants) for (let i = 0; i < rows.length; i += 1) for (let j = i + 1; j < rows.length; j += 1) addPair(rows[i], rows[j], `Partner—${variant}`);

  for (const card of components.filter((row) => row.named_partner)) addPair(card, byName.get(card.named_partner), "Partner with named counterpart");
  for (const companion of components.filter((row) => row.doctors_companion)) for (const doctor of components.filter((row) => row.doctor)) addPair(companion, doctor, "Doctor's companion");

  const singles = cards
    .filter((card) => commanderLegal(card) && commanderEligible(card) && colorIdentity(card) === target)
    .map((card) => ({ command_zone: [card.name], mechanism: "single commander", components: [{ name: card.name, color_identity: target, oracle_text: oracle(card) }] }));
  const commandZones = [...singles, ...pairs.values()].sort((a, b) => a.command_zone.join(" + ").localeCompare(b.command_zone.join(" + ")));
  return {
    target_color_identity: target,
    count: commandZones.length,
    single_commander_count: singles.length,
    paired_commander_count: pairs.size,
    command_zones: target === "WUBR" ? commandZones : undefined,
    control_sample: target === "WUBR" ? undefined : commandZones.slice(0, 5),
  };
}

const output = {
  schema_version: "1.0.0",
  source: sourcePath.replaceAll("\\", "/"),
  source_updated_at: manifest.updated_at,
  rules: [
    "A single commander's exact color identity must equal the target four-color identity.",
    "A paired command zone must combine exactly to the target identity and use a mutually legal Partner mechanism.",
    "Generic Partner pairs only with generic Partner; Partner variants pair only with the same variant; named Partner and Doctor's companion follow their exact restrictions.",
    "Color identity and Commander legality do not by themselves imply Vox Mana behavioral identity evidence.",
  ],
  results: targets.map(analyze),
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
