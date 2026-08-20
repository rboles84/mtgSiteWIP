import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildCommanderDossier,
  createArchidektTagCatalog,
} from "../assets/js/archscry/commander-dossier.js";
import {
  VM565_EXISTING_TERM_OVERRIDES,
  VM565_NEW_GLOSSARY_TERMS,
  VM565_NEW_TERM_TARGETS,
} from "../research/vm565-player-vocabulary-authority.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(ROOT, "docs", "audits", "vm565-player-vocabulary-education");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "candidate-ledger.json");
const CHECK = process.argv.includes("--check");

const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const normalize = (value) => String(value || "").toLowerCase().replace(/[‐‑‒–—]/g, "-").trim();
const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const matcher = (label) => new RegExp(`(^|[^a-z0-9])${escapeRegex(label)}(?=$|[^a-z0-9])`, "i");

const vm564 = readJson("docs/audits/vm564-dossier-term-hover-audit/term-audit-ledger.json");
const dossier = readJson("data/dossier/identity-dossier-content.catalog.json");
const vm564DefinitionById = new Map(vm564.aggregate_terms.map((record) => [record.record_id, record.definition]));
const glossary = readJson("data/dossier/discovery-education-catalog.json").glossary
  .filter((record) => vm564DefinitionById.has(record.record_id))
  .map((record) => ({ ...record, definition: vm564DefinitionById.get(record.record_id) }));
const factions = readJson("data/factions.json").factions;
const placementModel = readJson("data/gate-b1-placement-model.json");
const deckTagCatalog = createArchidektTagCatalog(readJson("data/deck-tags_expanded.json"));
const witnesses = new Map(readJson("docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json").rows.map((row) => [row.identity_key, row]));
const dossierByKey = new Map(dossier.records.map((record) => [record.identity_key, record]));
const glossaryLabels = new Map();
for (const record of glossary) {
  glossaryLabels.set(normalize(record.term), { ...record, label_type: "term" });
  for (const alias of record.aliases || []) glossaryLabels.set(normalize(alias), { ...record, label_type: "alias" });
}

// VM-565's reconciled additions. These are proposals until implementation and generated-catalog QA pass.
const NEW_CONCEPTS = [
  ["afterlife", "Afterlife", [], "When a creature with afterlife dies, create the stated number of 1/1 white and black Spirit creature tokens with flying.", "official_game_mechanic", "https://magic.wizards.com/en/news/feature/ravnica-allegiance-mechanics"],
  ["artifacts", "Artifacts", [], "Using artifacts as threats, engines, mana, or synergy pieces.", "commander_vocabulary", "data/taxonomy/vox-mana-tags.json#artifacts"],
  ["bgx_midrange", "BGx Midrange", ["Rock / BGx Midrange"], "A black-green midrange strategy built around efficient disruption, durable threats, and attrition; the x means it may splash another color.", "community_archetype", "https://magic.wizards.com/en/news/making-magic/mastering-dominaria-remastered"],
  ["burn", "Burn", [], "Using spells or abilities to deal direct damage to creatures, players, or other targets.", "commander_vocabulary", "data/taxonomy/vox-mana-tags.json#burn"],
  ["dredge", "Dredge", [], "If a card with dredge N is in your graveyard when you would draw, you may mill exactly N cards and return that card to your hand instead.", "official_game_mechanic", "https://magic.wizards.com/en/news/feature/modern-horizons-3-mechanics#dredge"],
  ["enchantments", "Enchantments", [], "Using enchantments as persistent rules, engines, or creature enhancements.", "commander_vocabulary", "data/taxonomy/vox-mana-tags.json#enchantments"],
  ["enchantress", "Enchantress", [], "An enchantment-focused strategy that draws cards or generates value when you cast enchantments or when enchantments enter the battlefield.", "community_archetype", "data/taxonomy/vox-mana-tags.json#enchantress"],
  ["exalted", "Exalted", [], "Whenever a creature you control attacks alone, each exalted ability gives it +1/+1 until end of turn.", "official_game_mechanic", "https://magic.wizards.com/en/news/making-magic/between-rock-and-shard-place-2008-09-05"],
  ["go_wide", "Go-wide", ["go wide"], "Build many creatures, often tokens, and use their combined pressure to overwhelm blockers and opponents.", "community_archetype", "https://magic.wizards.com/en/news/making-magic/core-point-2019-06-17#go-wide-white-black-green"],
  ["group_hug", "Group Hug", ["group-hug"], "Give resources to multiple players, often to shape the table's politics or pace.", "commander_vocabulary", "data/taxonomy/vox-mana-tags.json#group-hug"],
  ["haste", "Haste", [], "A creature with haste can attack and use tap abilities as soon as it comes under your control.", "official_game_mechanic", "https://magic.wizards.com/en/rules"],
  ["heroic", "Heroic", [], "Heroic is an ability word for abilities that trigger when you cast a spell that targets that creature.", "official_game_mechanic", "https://magic.wizards.com/en/news/feature/double-masters-2022-release-notes-2022-06-24#ability-word-heroic"],
  ["historic", "Historic", ["historic payoffs"], "Historic refers collectively to artifacts, legendary cards, and Sagas.", "official_game_term", "https://magic.wizards.com/en/news/feature/dominaria-mechanics-2018-03-21#historic"],
  ["impulse_draw", "Impulse draw", ["impulsive draw", "impulsive drawing"], "Exile cards and allow them to be played for a limited time instead of putting them into your hand.", "community_design_term", "https://magic.wizards.com/en/news/making-magic/the-council-of-colors-revisited"],
  ["land_denial", "Land denial", ["Ponza / Land Denial"], "Attack opponents' mana by destroying, restricting, or disabling lands; Ponza is a red-green version that follows with efficient threats.", "community_archetype", "https://magic.wizards.com/en/news/announcements/commander-banned-and-restricted-february-9-2026"],
  ["lifegain", "Lifegain", ["life gain", "life-gain"], "Gain life as protection, fuel, or a payoff trigger.", "commander_vocabulary", "data/taxonomy/vox-mana-tags.json#lifegain"],
  ["mill", "Mill", ["milling"], "Put cards from a library into its owner's graveyard, often to empty an opponent's library or stock a graveyard.", "official_game_action", "https://magic.wizards.com/en/rules"],
  ["politics", "Politics", [], "Use deals, incentives, goad, votes, or threat assessment to shape multiplayer decisions.", "commander_vocabulary", "data/taxonomy/vox-mana-tags.json#politics"],
  ["reanimator", "Reanimator", ["reanimation"], "Put creature cards from your graveyard directly onto the battlefield, often for less mana than casting them normally.", "community_archetype", "data/taxonomy/vox-mana-tags.json#reanimator"],
  ["surveil", "Surveil", [], "Look at the stated number of cards from the top of your library, put any into your graveyard, and return the rest to the top in any order.", "official_game_action", "https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04#house-dimir-and-surveil"],
  ["theft", "Theft", [], "Use opponents' cards, permanents, libraries, or graveyards as resources.", "commander_vocabulary", "data/taxonomy/vox-mana-tags.json#theft"],
  ["treasure", "Treasure", ["Treasures", "Treasure tokens"], "A Treasure is an artifact token that can be tapped and sacrificed to add one mana of any color.", "official_game_object", "https://magic.wizards.com/en/news/feature/ixalan-mechanics"],
  ["typal", "Typal", ["Tribal"], "Build around a shared creature type and cards that reward that type; many players also call this tribal.", "commander_vocabulary", "data/taxonomy/vox-mana-tags.json#typal"],
].map(([id, term, aliases, definition, authorityClass, locator]) => ({
  record_id: `glossary_${id}`,
  term,
  aliases,
  definition,
  authority_class: authorityClass,
  source_locator: locator,
}));

const newLabels = new Map();
for (const concept of NEW_CONCEPTS) {
  newLabels.set(normalize(concept.term), { ...concept, label_type: "term" });
  for (const alias of concept.aliases) newLabels.set(normalize(alias), { ...concept, label_type: "alias" });
}

const TARGETS = [
  ["W", "glossary_sweepers", "how-this-plays", "mechanical-expression", "Board wipe"],
  ["U", "glossary_artifacts", "what-to-look-for-title", "item-3-title", "Artifacts"],
  ["B", "glossary_aristocrats", "what-to-look-for-title", "item-2-title", "Aristocrats"],
  ["B", "glossary_reanimator", "what-to-look-for-title", "item-3-title", "Reanimator"],
  ["R", "glossary_impulse_draw", "what-to-look-for-title", "item-3-title", "Impulse Draw"],
  ["R", "glossary_treasure", "what-to-look-for-title", "item-3-title", "Treasures"],
  ["WU", "glossary_prison_control", "what-to-look-for-title", "item-2-title", "Prison Control"],
  ["UB", "glossary_mill", "how-this-plays", "mechanical-expression", "mill"],
  ["RG", "glossary_land_denial", "what-to-look-for-title", "item-3-title", "Ponza / Land Denial"],
  ["WG", "glossary_populate", "how-this-plays", "mechanical-expression", "populate"],
  ["WB", "glossary_afterlife", "what-to-look-for-title", "item-3-title", "Afterlife"],
  ["WR", "glossary_burn", "what-to-look-for-title", "item-2-title", "Burn"],
  ["WR", "glossary_heroic", "what-to-look-for-title", "item-2-title", "Heroic"],
  ["WR", "glossary_voltron", "what-to-look-for-title", "item-3-title", "Voltron"],
  ["SILVERQUILL", "glossary_goad", "how-this-plays", "mechanical-expression", "goad"],
  ["LOREHOLD", "glossary_artifacts", "what-to-look-for-title", "item-2-title", "Artifacts"],
  ["LOREHOLD", "glossary_historic", "what-to-look-for-title", "item-3-title", "Historic"],
  ["BANT", "glossary_enchantress", "what-to-look-for-title", "item-3-title", "Enchantress"],
  ["COLORLESS", "glossary_colorless_mana", "mana-notes", "rocks-and-sources", "colorless mana"],
].map(([identityKey, recordId, surface, field, text]) => ({ identity_key: identityKey, record_id: recordId, surface, field, text }));

assert.deepEqual(
  NEW_CONCEPTS.map((entry) => ({ record_id: entry.record_id, term: entry.term, aliases: entry.aliases, definition: entry.definition, source_locator: entry.source_locator })),
  VM565_NEW_GLOSSARY_TERMS.map((entry) => ({ record_id: `glossary_${entry.id}`, term: entry.term, aliases: entry.aliases, definition: entry.copy, source_locator: entry.locator })),
  "candidate definitions must match the VM-565 source authority"
);
assert.deepEqual(
  new Set(TARGETS.map((entry) => `${entry.identity_key}:${entry.record_id}:${entry.surface}:${entry.field}`)),
  new Set([...VM565_NEW_TERM_TARGETS, ...VM565_EXISTING_TERM_OVERRIDES]
    .filter((entry) => ["what-to-look-for-title", "how-this-plays", "mana-notes"].includes(entry.surface))
    .map((entry) => `${entry.identity_key}:${entry.record_id}:${entry.surface}:${entry.field}`)),
  "candidate exact text-only targets must match the VM-565 source authority"
);

const REJECTED_SPECIALIZED = {
  W: [["clean removal", "ORDINARY_LANGUAGE", "Ordinary interaction wording; defining it would add little beyond the sentence."], ["equipment lines", "ORDINARY_LANGUAGE", "Ordinary deckbuilding phrasing; Equipment is already taught."]],
  U: [["Clones", "CONTEXT_ALREADY_SUFFICIENT", "The adjacent copy says tools and copies, which teaches the intended behavior without another term."], ["counterspells", "TOO_TRIVIAL_TO_INTERRUPT", "The dossier immediately frames them as answering threats on the stack."], ["bounce", "SECONDARY_LIST_TERM", "A secondary mechanic-list item rather than a deck direction on this page."]],
  B: [["Life Payment Engines", "CONTEXT_ALREADY_SUFFICIENT", "The supporting copy directly explains spending life as fuel."], ["lifedrain", "SECONDARY_LIST_TERM", "A secondary mechanic-list item and not a selected deck direction here."]],
  R: [["temporary mana", "CONTEXT_ALREADY_SUFFICIENT", "The Impulse Draw and Treasures teaching moment explains the temporary-resource pattern."], ["attack pressure", "ORDINARY_LANGUAGE", "Ordinary gameplay language."], ["damage triggers", "SECONDARY_LIST_TERM", "Literal trigger description; no specialized archetype meaning is needed."]],
  G: [["fight", "SECONDARY_LIST_TERM", "A secondary mechanic-list item; the page's major directions are already taught."], ["bite", "SECONDARY_LIST_TERM", "A secondary community shorthand in an enumerative list."], ["reach", "SECONDARY_LIST_TERM", "An evergreen keyword in a secondary list, not a selected direction."], ["Apex Creatures", "VOX_MANA_EDITORIAL_LABEL", "An evocative authored label whose copy already says to cast massive threats."]],
  WU: [["permission", "CONTEXT_ALREADY_SUFFICIENT", "Draw-Go Control and open mana already teach the reactive plan."], ["Spirits", "ORDINARY_LANGUAGE", "A creature type, not a distinct glossary concept in this label."]],
  UB: [["discard", "TOO_TRIVIAL_TO_INTERRUPT", "Common game action used literally."], ["evasive threats", "CONTEXT_ALREADY_SUFFICIENT", "Ordinary deckbuilding phrase supported by the surrounding plan."]],
  BR: [["Spectacle", "SECONDARY_LIST_TERM", "Official mechanic, but only a secondary item here and not needed to understand the selected direction."], ["menace", "SECONDARY_LIST_TERM", "Evergreen keyword in a secondary list."], ["Sacrifice Aggro", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Sacrifice and Aggro already teach the literal combination."]],
  RG: [["Riot", "SECONDARY_LIST_TERM", "Official mechanic in an enumerative list, not a selected teaching priority."], ["bloodrush", "SECONDARY_LIST_TERM", "Official mechanic in an enumerative list."], ["Zoo", "CONTEXT_ALREADY_SUFFICIENT", "The adjacent copy explicitly describes efficient bodies and ending games quickly."]],
  WG: [["anthem effects", "SECONDARY_LIST_TERM", "Community shorthand in a secondary mechanic list."], ["Convoke Community", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Convoke is already taught; Community is authored framing."], ["Go-Wide Caretaking", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Go-wide teaches the gameplay; Caretaking is editorial framing."]],
  WB: [["Extort", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list, not a selected direction."], ["lifedrain", "SECONDARY_LIST_TERM", "Secondary shorthand rather than a central deck direction."], ["recursion", "SECONDARY_LIST_TERM", "Broad deckbuilding term in an enumerative list."], ["Obligation Engines", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana authored identity language."], ["Payment Pressure", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana authored identity language."]],
  UR: [["Jump-start", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["overload", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["cantrips", "SECONDARY_LIST_TERM", "Established shorthand, but not necessary for the page's major directions."], ["Delver", "CONTEXT_ALREADY_SUFFICIENT", "The adjacent archetype copy supplies the intended play pattern."], ["Phoenix", "CONTEXT_ALREADY_SUFFICIENT", "A card/archetype reference whose supporting copy supplies the plan."]],
  BG: [["scavenge", "SECONDARY_LIST_TERM", "Official mechanic in an enumerative list."], ["undergrowth", "SECONDARY_LIST_TERM", "Official mechanic in an enumerative list."], ["recursion", "SECONDARY_LIST_TERM", "Broad secondary list term."], ["Graveyard Value", "EXISTING_ALIAS", "Already resolves through the current Graveyard value glossary record."]],
  WR: [["Battalion", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["mentor", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["tactical combat", "ORDINARY_LANGUAGE", "Ordinary gameplay language."], ["Equipment Voltron", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Equipment and Voltron teach the literal combination without a compound record."]],
  UG: [["Graft", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["evolve", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["adapt", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."]],
  SILVERQUILL: [["Inkling", "SECONDARY_LIST_TERM", "A setting-specific creature type in a secondary list."], ["life-drain", "SECONDARY_LIST_TERM", "Secondary shorthand rather than a selected direction."], ["Word-Magic and Rhetorical Influence", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language, not established gameplay terminology."]],
  PRISMARI: [["Magecraft", "SECONDARY_LIST_TERM", "Official ability word in a secondary list."], ["Spells-Matter Tokens", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Spellslinger and Tokens already teach the plan."], ["Izzet Control / Tempo", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Control and Tempo already teach the literal combination."]],
  WITHERBLOOM: [["Pest tokens", "SECONDARY_LIST_TERM", "A setting-specific token type in a secondary list."], ["essence exchange", "VOX_MANA_EDITORIAL_LABEL", "Authored identity framing rather than established player vocabulary."], ["Remedies and Poisons", "VOX_MANA_EDITORIAL_LABEL", "Authored identity framing."], ["Field Biology and Cost", "VOX_MANA_EDITORIAL_LABEL", "Authored identity framing."]],
  LOREHOLD: [["Sagas", "CONTEXT_ALREADY_SUFFICIENT", "Historic teaches the non-literal umbrella; the adjacent copy explains Saga chapters."], ["Spirit Tribal", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Typal/Tribal teaches the creature-type strategy; Spirit names the type."]],
  QUANDRIX: [["Fractals", "SECONDARY_LIST_TERM", "A setting-specific token type in a secondary list."], ["Token Doubling", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Tokens plus ordinary doubling language are sufficient."], ["Fractal Counters", "VOX_MANA_EDITORIAL_LABEL", "A setting-specific literal pairing, not a reusable learner concept."]],
  BANT: [["Auras", "CONTEXT_ALREADY_SUFFICIENT", "Enchantments and Enchantress teach the selected plan; the copy uses Auras as a visible subtype example."], ["Clues", "SECONDARY_LIST_TERM", "A token type in a secondary list."], ["Exalted Champion", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Exalted carries the specialized meaning; Champion is ordinary framing."]],
  ESPER: [["card advantage", "SECONDARY_LIST_TERM", "Established shorthand, but the selected Control/Artifacts/Enchantments directions already provide the needed teaching."], ["library setup", "CONTEXT_ALREADY_SUFFICIENT", "Ordinary deckbuilding language."], ["Perfectibility Control", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  GRIXIS: [["recursion", "SECONDARY_LIST_TERM", "Broad secondary list term."], ["Survival Control", "VOX_MANA_EDITORIAL_LABEL", "Authored identity-expression label, not an established distinct archetype here."]],
  JUND: [["resource conversion", "CONTEXT_ALREADY_SUFFICIENT", "Ordinary strategic language, not a reusable technical term in this page."], ["Instinctive Pressure", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Appetite Engines", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Feral Value", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  NAYA: [["creature engines", "CONTEXT_ALREADY_SUFFICIENT", "Ordinary deckbuilding phrase."], ["Instinctive Protection", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Protection teaches the game concept; Instinctive is identity framing."], ["Living Abundance", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  ABZAN: [["Food", "SECONDARY_LIST_TERM", "A token type in a secondary list."], ["proliferate", "SECONDARY_LIST_TERM", "Official game action in a secondary list."], ["Family Endurance", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Ancestor Obligation", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Perennial Defense", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  TEMUR: [["energy", "SECONDARY_LIST_TERM", "A counter/resource mechanic in a secondary list."], ["X-spells", "SECONDARY_LIST_TERM", "Deckbuilding shorthand in a secondary list."], ["ravenous", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["Survival Through Attunement", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  SULTAI: [["morph", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["mutate", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["resource denial", "CONTEXT_ALREADY_SUFFICIENT", "Ordinary strategic phrase; Theft and Self-mill are the selected learner concepts."], ["Resource Conversion", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression label."], ["Necromantic Utility", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression label."], ["Calculated Ruthlessness", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression label."]],
  MARDU: [["attack triggers", "CONTEXT_ALREADY_SUFFICIENT", "Literal rules-event phrase."], ["Raid Momentum", "VOX_MANA_EDITORIAL_LABEL", "Authored identity-expression label; not a request to teach Raid as a mechanic."], ["War-Name Oath", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression label."], ["Ruthless Opening", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression label."]],
  JESKAI: [["prowess-like", "CONTEXT_ALREADY_SUFFICIENT", "The suffix marks an analogy, not a canonical mechanic claim."], ["cycling", "SECONDARY_LIST_TERM", "Official mechanic in a secondary list."], ["energy", "SECONDARY_LIST_TERM", "A counter/resource mechanic in a secondary list."], ["Disciplined Tempo", "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS", "Tempo teaches the gameplay; Disciplined is identity framing."], ["Monastery Practice", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  YORE: [["combo", "SECONDARY_LIST_TERM", "Broad deckbuilding term in a secondary list."], ["Engineered Agency", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Artifice And Archive", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Controlled Overreach", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  GLINT: [["cascade-adjacent", "CONTEXT_ALREADY_SUFFICIENT", "Explicit analogy rather than a claim that Cascade itself defines the page."], ["Adaptive Appetite", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Storm-Fed Opportunity", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Predatory Overreach", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  DUNE: [["token-like multiplication", "CONTEXT_ALREADY_SUFFICIENT", "Explicit analogy, not a canonical token claim."], ["Organized Territorial Pressure", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Common-Front Momentum", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Conquest Overreach", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  INK: [["shared-resource play", "CONTEXT_ALREADY_SUFFICIENT", "Group Hug and Politics teach the established concepts."], ["guarded reciprocity", "VOX_MANA_EDITORIAL_LABEL", "Authored identity framing."], ["Protected Public Abundance", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Open Knowledge Pact", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Self-Erasure Risk", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  WITCH: [["value accumulation", "CONTEXT_ALREADY_SUFFICIENT", "Ordinary strategic language."], ["Patient Cultivation", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Calculated Expansion", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Sterile Control Risk", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  COLORLESS: [["utility lands", "SECONDARY_LIST_TERM", "Common deckbuilding phrase in a secondary list."], ["Chosen Restriction", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Machine And Void", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Boundary Discipline", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
  WUBRG: [["Five-Color", "CONTEXT_ALREADY_SUFFICIENT", "The page title and surrounding copy immediately say all five colors."], ["Multicolor", "ORDINARY_LANGUAGE", "Ordinary color-description language in context."], ["Domain", "SECONDARY_LIST_TERM", "Official mechanic in an enumerative list rather than a selected direction."], ["converge", "SECONDARY_LIST_TERM", "Official mechanic in an enumerative list."], ["sunburst", "SECONDARY_LIST_TERM", "Official mechanic in an enumerative list."], ["Full-Spectrum Integrator", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Coalition Builder", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."], ["Boundary Keeper", "VOX_MANA_EDITORIAL_LABEL", "Vox Mana identity-expression language."]],
};

const ORDINARY_LABELS = new Set(["apex creatures", "five-color", "multicolor"]);
const CONTEXT_LABELS = new Set(["life payment engines", "artifacts and clones", "zoo / aggro"]);
const MEANINGFUL_EXISTING_SURFACE = new Set([
  "BR:glossary_impulse_draw",
  "BG:glossary_mill",
  "PRISMARI:glossary_treasure",
  "WITHERBLOOM:glossary_lifegain",
]);

function strategyDecision(identity, labelRow) {
  const exact = normalize(labelRow.label);
  const existing = glossaryLabels.get(exact);
  if (existing) {
    return {
      classification: existing.label_type === "term" ? "EXISTING_CANONICAL_TERM" : "EXISTING_ALIAS",
      existing_canonical_glossary_term: existing.term,
      existing_definition: existing.definition,
      accepted: true,
      proposed_action: labelRow.current_hover_available_on_label ? "KEEP_CURRENT_TEACHING" : "REUSE_EXISTING_DEFINITION_AT_BEST_OCCURRENCE_IF_NEEDED",
      reason: "The expression already resolves to an approved canonical concept; no new whole-phrase record is needed.",
      rejection_reason: null,
    };
  }
  const added = newLabels.get(exact);
  if (added) {
    return {
      classification: added.record_id === "glossary_bgx_midrange" ? "ESTABLISHED_COMPOUND_ARCHETYPE" : added.label_type === "term" ? "ESTABLISHED_MTGO_COMMANDER_TERM_MISSING" : "EXISTING_ALIAS",
      existing_canonical_glossary_term: added.term,
      existing_definition: added.definition,
      accepted: true,
      proposed_action: "ADD_CANONICAL_DEFINITION_OR_ALIAS_AND_TEACH_ONCE",
      reason: "This is established player vocabulary with a concrete learner problem and useful deck or gameplay meaning.",
      rejection_reason: null,
    };
  }

  const componentConcepts = [...glossary, ...NEW_CONCEPTS].filter((concept) =>
    [concept.term, ...(concept.aliases || [])].some((candidate) => matcher(candidate).test(labelRow.label))
  );
  if (componentConcepts.length) {
    return {
      classification: "COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS",
      existing_canonical_glossary_term: componentConcepts.map((entry) => entry.term).join(" + "),
      existing_definition: null,
      accepted: false,
      proposed_action: "LEAVE_WHOLE_PHRASE_UNDEFINED; TEACH_ONLY_USEFUL_COMPONENTS",
      reason: "The phrase adds no specialized meaning beyond its reusable components.",
      rejection_reason: "Redundant compound definition would repeat concepts and increase annotation density.",
    };
  }
  if (ORDINARY_LABELS.has(exact)) {
    return { classification: "ORDINARY_LANGUAGE", existing_canonical_glossary_term: null, existing_definition: null, accepted: false, proposed_action: "LEAVE_AS_PROSE", reason: "The surrounding page makes the ordinary meaning clear.", rejection_reason: "Too ordinary to justify an interruption." };
  }
  if (CONTEXT_LABELS.has(exact)) {
    return { classification: "CONTEXT_ALREADY_SUFFICIENT", existing_canonical_glossary_term: null, existing_definition: null, accepted: false, proposed_action: "LEAVE_AS_PROSE", reason: "The adjacent copy already explains the gameplay pattern.", rejection_reason: "A tooltip would repeat the sentence rather than teach." };
  }
  return { classification: "VOX_MANA_EDITORIAL_LABEL", existing_canonical_glossary_term: null, existing_definition: null, accepted: false, proposed_action: "LEAVE_AS_AUTHORED_PROSE", reason: "This is identity-expression or evocative editorial language, not established reusable Magic vocabulary.", rejection_reason: "No independent player-learning problem justifies a glossary record." };
}

const strategy_label_decisions = [];
for (const identity of vm564.identities) {
  for (const label of identity.strategy_labels) {
    strategy_label_decisions.push({
      identity: identity.identity_name,
      identity_key: identity.identity_key,
      exact_player_facing_text: label.label,
      source_surface: label.source_surface,
      source_field: label.source_surface === "start-here-possible-directions" ? "Possible directions" : "What to Look For title",
      currently_taught: label.current_hover_available_on_label,
      proposed_teaching_location: null,
      ...strategyDecision(identity, label),
    });
  }
}

function fieldsFor(identity) {
  const content = dossierByKey.get(identity.identity_key);
  assert.ok(content, `missing dossier content for ${identity.identity_key}`);
  const witness = witnesses.get(identity.identity_key);
  assert.ok(witness, `missing witness for ${identity.identity_key}`);
  const placementResult = identity.identity_key === "YORE" ? {
    ...witness.result,
    faction: "YORE",
    faction_name: factions.YORE.name,
    result_state: "primary",
    engine_result_state: "insufficient",
    alternative_state: "none",
    top_matches: [{ faction: "YORE", faction_name: factions.YORE.name, score: 0 }],
    adjacent_matches: [],
    alternatives: [],
  } : witness.result;
  const built = buildCommanderDossier({
    factions,
    placementModel,
    deckTagCatalog,
    placementResult: { ...placementResult, starter_profile: { budget_band: "mid", experience_level: "returning" } },
    targetFactionKey: identity.identity_key,
    starterProfile: { budget_band: "mid", experience_level: "returning" },
  });
  return [
    { surface: "start-here", field: "commander-plan", text: built.commanderLane.copy },
    ...built.commanderLane.details.map((detail) => ({ surface: "start-here", field: detail.label, text: detail.copy })),
    { surface: "how-this-plays", field: "mechanical-expression", text: content.how_this_plays.mechanical_expression },
    ...content.what_to_look_for.flatMap((item, index) => [
      { surface: "what-to-look-for-title", field: `item-${index + 1}-title`, text: item.title },
      { surface: "what-to-look-for", field: `item-${index + 1}-copy`, text: item.copy },
    ]),
    ...(identity.identity_key === "COLORLESS" ? [
      { surface: "mana-notes", field: "wastes-first", text: "Use Wastes and reliable colorless producers as the floor before adding utility lands." },
      { surface: "mana-notes", field: "rocks-and-sources", text: "Mana rocks help the deck reach expensive colorless spells, but generic costs are not colorless mana." },
      { surface: "mana-notes", field: "color-choice-caution", text: "Command Tower cannot choose colorless, and Reflecting Pool-style effects need another source that can already make colorless mana." },
    ] : []),
  ];
}

const candidate_decisions = [];
for (const identity of vm564.identities) {
  const fields = fieldsFor(identity);
  for (const concept of NEW_CONCEPTS) {
    const labels = [concept.term, ...concept.aliases].sort((a, b) => b.length - a.length);
    const occurrences = fields.flatMap((field) => labels
      .filter((label) => matcher(label).test(field.text))
      .filter(() => !(concept.record_id === "glossary_mill" && /self[- ]mill/i.test(field.text)))
      .map((label) => ({ ...field, matched: field.text.match(matcher(label))?.[0]?.trim() || label })));
    const target = TARGETS.find((entry) => entry.identity_key === identity.identity_key && entry.record_id === concept.record_id);
    const targetOccurrence = target ? occurrences.find((entry) => entry.surface === target.surface && entry.field === target.field) : null;
    const occurrence = (targetOccurrence ? [targetOccurrence] : occurrences)
      .sort((left, right) => {
        const surfaceOrder = { "start-here": 0, "what-to-look-for-title": 1, "what-to-look-for": 2, "how-this-plays": 3, "mana-notes": 4 };
        const fieldOrder = (entry) => entry.field === "Possible directions" ? 0 : entry.field === "commander-plan" ? 1 : 2;
        return surfaceOrder[left.surface] - surfaceOrder[right.surface] || fieldOrder(left) - fieldOrder(right);
      })[0];
    if (!occurrence) continue;
    const accepted = Boolean(
      target
      || (occurrence.surface === "start-here" && occurrence.field === "Possible directions")
      || MEANINGFUL_EXISTING_SURFACE.has(`${identity.identity_key}:${concept.record_id}`)
    );
    const location = target ? `${target.surface}:${target.field}` : `${occurrence.surface}:${occurrence.field}`;
    candidate_decisions.push({
      identity: identity.identity_name,
      identity_key: identity.identity_key,
      exact_player_facing_text: occurrence.matched,
      source_surface: occurrence.surface,
      source_field: occurrence.field,
      classification: concept.record_id === "glossary_bgx_midrange" ? "ESTABLISHED_COMPOUND_ARCHETYPE" : "ESTABLISHED_MTGO_COMMANDER_TERM_MISSING",
      existing_canonical_glossary_term: null,
      existing_definition: null,
      whether_currently_taught: false,
      proposed_action: accepted ? "ADD_CANONICAL_DEFINITION_AND_TEACH_ONCE" : "ADD_CANONICAL_DEFINITION_BUT_LEAVE_THIS_SECONDARY_OCCURRENCE_UNDECORATED",
      proposed_teaching_location: accepted ? location : null,
      proposed_term: concept.term,
      proposed_definition: concept.definition,
      accepted,
      reason: accepted
        ? "Established player vocabulary materially improves understanding of the displayed deck direction, game object, or mechanic."
        : "The canonical concept is useful elsewhere, but this identity uses it only in a secondary list without a strong teaching moment.",
      rejection_reason: accepted ? null : "Do not add a tooltip solely because the new canonical term appears in an enumerative secondary surface.",
      source_authority: concept.source_locator,
      learner_problem: accepted ? `A new or returning player may see “${occurrence.matched}” as a major direction without knowing the established gameplay meaning.` : null,
    });
  }

  for (const [term, classification, rejectionReason] of REJECTED_SPECIALIZED[identity.identity_key] || []) {
    const source = fields.find((field) => matcher(term).test(field.text)) || { surface: "review-case", field: "explicit-review", text: term };
    candidate_decisions.push({
      identity: identity.identity_name,
      identity_key: identity.identity_key,
      exact_player_facing_text: term,
      source_surface: source.surface,
      source_field: source.field,
      classification,
      existing_canonical_glossary_term: null,
      existing_definition: null,
      whether_currently_taught: false,
      proposed_action: "LEAVE_UNDECORATED",
      proposed_teaching_location: null,
      proposed_term: null,
      proposed_definition: null,
      accepted: false,
      reason: rejectionReason,
      rejection_reason: rejectionReason,
      source_authority: null,
      learner_problem: null,
    });
  }
}

for (const target of TARGETS.filter((entry) => glossary.some((record) => record.record_id === entry.record_id))) {
  const identity = vm564.identities.find((entry) => entry.identity_key === target.identity_key);
  const record = glossary.find((entry) => entry.record_id === target.record_id);
  const current = identity.terms.find((entry) => entry.record_id === target.record_id);
  candidate_decisions.push({
    identity: identity.identity_name,
    identity_key: identity.identity_key,
    exact_player_facing_text: target.text,
    source_surface: target.surface,
    source_field: target.field,
    classification: "EXISTING_CANONICAL_TERM",
    existing_canonical_glossary_term: record.term,
    existing_definition: record.definition,
    whether_currently_taught: Boolean(current?.hover_available),
    proposed_action: "REUSE_EXISTING_DEFINITION_AT_EXACT_TARGET",
    proposed_teaching_location: `${target.surface}:${target.field}`,
    proposed_term: record.term,
    proposed_definition: record.definition,
    accepted: true,
    reason: "The concept is important here and currently has no meaningful eligible teaching occurrence on this dossier.",
    rejection_reason: null,
    source_authority: record.provenance?.locator || null,
    learner_problem: `The current dossier shows “${target.text}” only on a text-only surface or allocates its teaching elsewhere less usefully.`,
  });
}

const manaRocks = glossary.find((record) => record.record_id === "glossary_mana_rocks");
assert.ok(manaRocks, "missing Mana rocks baseline");
candidate_decisions.push({
  identity: "Colorless",
  identity_key: "COLORLESS",
  exact_player_facing_text: "Mana rocks",
  source_surface: "start-here",
  source_field: "commander-plan",
  classification: "EXISTING_CANONICAL_TERM",
  existing_canonical_glossary_term: manaRocks.term,
  existing_definition: manaRocks.definition,
  whether_currently_taught: true,
  proposed_action: "CORRECT_INADEQUATE_DEFINITION",
  proposed_teaching_location: "start-here:commander-plan",
  proposed_term: "Mana rocks",
  proposed_definition: "Artifacts that produce mana, helping a deck accelerate or fix its mana.",
  accepted: true,
  reason: "The current copy repeats Ramp and never explains that a mana rock is an artifact mana source.",
  rejection_reason: null,
  source_authority: "data/taxonomy/vox-mana-tags.json#artifacts + data/taxonomy/vox-mana-tags.json#ramp",
  learner_problem: "A learner can read the existing tooltip and still not know what object a mana rock is.",
});

const unused_glossary_decisions = vm564.aggregate_terms.filter((record) => record.identity_count === 0).map((record) => ({
  record_id: record.record_id,
  term: record.term,
  action: "KEEP_DORMANT",
  reason: record.term === "Stax"
    ? "A related constraint theme exists, but Prison Control and Taxation already teach the dossier's authored language; do not force Stax into copy."
    : "Legitimate reserved glossary vocabulary with no current scoped occurrence; zero utilization is not a product defect.",
}));

assert.equal(vm564.identities.length, 37);
assert.equal(new Set(strategy_label_decisions.map((row) => row.identity_key)).size, 37);
assert.equal(unused_glossary_decisions.length, 4);

const ledger = {
  schema_version: "vm565-player-vocabulary-candidate-ledger-v1",
  status: "INTERNALLY_RECONCILED_BEFORE_IMPLEMENTATION",
  generated_on: "2026-08-16",
  baseline: "docs/audits/vm564-dossier-term-hover-audit/term-audit-ledger.json",
  scope_note: "VM-564 remains the current-state occurrence baseline. VM-565 records product judgments for meaningful educational expressions and does not repeat VM-564's raw substring inventory.",
  teaching_rule: "Teach established player vocabulary once where it materially improves a deck, gameplay, card-selection, or table-behavior decision. Leave ordinary, contextual, literal-compound, secondary-list, and Vox Mana editorial language undecorated.",
  summary: {
    identities_reviewed: vm564.identities.length,
    strategy_label_occurrences_reviewed: strategy_label_decisions.length,
    additional_candidate_decisions: candidate_decisions.length,
    accepted_candidate_decisions: candidate_decisions.filter((row) => row.accepted).length,
    rejected_candidate_decisions: candidate_decisions.filter((row) => !row.accepted).length,
    proposed_new_canonical_definitions: NEW_CONCEPTS.length,
    proposed_aliases: NEW_CONCEPTS.reduce((sum, row) => sum + row.aliases.length, 0),
    proposed_exact_teaching_targets: TARGETS.length,
    proposed_definition_corrections: 1,
  },
  proposed_new_concepts: NEW_CONCEPTS,
  proposed_exact_teaching_targets: TARGETS,
  candidate_decisions,
  strategy_label_decisions,
  unused_glossary_decisions,
};

const output = `${JSON.stringify(ledger, null, 2)}\n`;
if (CHECK) {
  assert.equal(fs.readFileSync(OUTPUT_PATH, "utf8").replace(/\r\n/g, "\n"), output);
} else {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, output);
}
console.log(JSON.stringify({ status: "PASS", ...ledger.summary }, null, 2));
