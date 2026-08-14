import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildCommanderStartingLane,
  buildPublicPreconRationale,
  buildReadingOmens,
  buildWhatToLookFor,
} from "../assets/js/commander-dossier.js";
import { presentationForFaction } from "../assets/js/archscry-presentation.js";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const factions = (await readJson("../data/factions.json")).factions;
const precons = (await readJson("../data/precons/vox-mana-precon-catalog.json")).precons;
const providerValidation = await readJson("../data/placement/commander-provider-validation.json");
const commanderIndex = (await readJson("../data/scryfall/indexes/commander-index.json")).commanders;
const cardRationaleSource = await readJson("../data/dossier/card-rationale-relationships.source.json");
const cardRationaleCatalog = await readJson("../data/dossier/card-rationale-catalog.json");
const indexSource = await readFile(new URL("../assets/js/index.js", import.meta.url), "utf8");
const radarSource = await readFile(new URL("../assets/js/dossier-radar.js", import.meta.url), "utf8");
const matrixSource = await readFile(new URL("../assets/js/vm-radar.js", import.meta.url), "utf8");
const commanderDossierSource = await readFile(new URL("../assets/js/commander-dossier.js", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../assets/css/archscry.css", import.meta.url), "utf8");
const preconSourceText = await readFile(new URL("../data/precons/vox-mana-precons.source.json", import.meta.url), "utf8");
const factionsSourceText = await readFile(new URL("../data/factions.json", import.meta.url), "utf8");
const cardVoicePrintings = await readJson("../data/dossier/card-voice-printings.source.json");

const INTERNAL_TOKEN_RE = /\b(?:SIG_[A-Z0-9_]+|DG_[A-Z0-9_]+|MAPPING_[A-Z0-9_]+|b1\.[a-z0-9_.-]+|naming qualification|mapping hypothesis|bounded observation|question_id|answer_id)\b/i;
const INTERNAL_GUIDANCE_RE = /\b(?:source-backed|public-surface|guardrail|evidence-required|boundary-only|routing|taxonomy|support lane)\b/i;

for (const [identityKey, faction] of Object.entries(factions)) {
  const lore = String(faction.lore_summary || "").trim();
  const tension = String(faction.core_tension || "").trim();
  assert.ok(!lore || !tension || lore !== tension, `${identityKey} repeats Lore verbatim as Core Tension`);
}

const uniqueCommanders = [...new Set(precons.map((precon) => precon.mainCommander).filter(Boolean))].sort();
assert.equal(uniqueCommanders.length, 155, "expected the complete 155-commander precon provider matrix");
assert.equal(providerValidation.scope.unique_commanders, uniqueCommanders.length);
assert.deepEqual(Object.keys(providerValidation.commanders).sort(), uniqueCommanders);

const providerRows = Object.values(providerValidation.commanders);
const verifiedLinks = providerRows.flatMap((row) => row.links || []);
const suppressedRows = providerRows.filter((row) => !(row.links || []).length);
assert.equal(verifiedLinks.length, 155, "expected every displayed main commander to have one exact-build destination");
assert.equal(suppressedRows.length, 0, "no displayed main commander may retain a provider gap");
assert.ok(verifiedLinks.every((link) => link.verified === true && link.verification === "EXACT_COMMANDER_NAME_MATCH"));
assert.ok(verifiedLinks.every((link) => /^https:\/\/edhrec\.com\/commanders\//.test(link.url)));
assert.equal(providerValidation.providers.archidekt.enabled, false);
assert.equal(providerValidation.providers.mtgdecks.enabled, false);
assert.equal(providerValidation.providers.mtggoldfish.enabled, false);
assert.match(providerValidation.commanders["Captain N'ghathrod"].links[0].url, /captain-nghathrod$/);
assert.equal(providerValidation.commanders["Y'shtola, Night's Blessed"].links.length, 1);
assert.ok(uniqueCommanders.some((name) => /['’]/.test(name)), "expected apostrophe coverage");
assert.ok(uniqueCommanders.some((name) => /,/.test(name)), "expected comma coverage");
assert.ok(uniqueCommanders.some((name) => /-/.test(name)), "expected hyphen coverage");
assert.ok(uniqueCommanders.some((name) => /\./.test(name)), "expected period coverage");
assert.ok(uniqueCommanders.some((name) => /[^\x00-\x7F]/.test(name)), "expected Unicode coverage");
assert.ok(uniqueCommanders.some((name) => /\//.test(name)), "expected partner or paired-name coverage");

const colorNameToCode = new Map([
  ["white", "W"], ["blue", "U"], ["black", "B"], ["red", "R"], ["green", "G"], ["colorless", "C"],
]);
const colorCode = (colors = []) => {
  const codes = colors.map((color) => {
    const normalized = String(color || "").toLowerCase();
    return normalized.length === 1 ? normalized.toUpperCase() : colorNameToCode.get(normalized);
  }).filter(Boolean);
  return ["W", "U", "B", "R", "G", "C"].filter((code) => codes.includes(code)).join("");
};
for (const precon of precons) {
  const identity = colorCode(precon.colors || []);
  const rationale = buildPublicPreconRationale({
    precon,
    lane: "exact",
    activeIdentity: identity,
    candidateIdentity: identity,
  });
  assert.ok(rationale?.text, `${precon.deckName} should have a deterministic public precon rationale`);
  assert.equal(rationale.provenance.authority, "data/precons/vox-mana-precons.source.json");
  assert.ok(rationale.provenance.fields.includes("mainCommander"));
  assert.doesNotMatch(rationale.text, INTERNAL_TOKEN_RE);
  assert.doesNotMatch(rationale.text, /\b(?:reinforces?|proves?|means you|you prefer|your personality)\b/i);
  assert.deepEqual(
    rationale,
    buildPublicPreconRationale({ precon, lane: "exact", activeIdentity: identity, candidateIdentity: identity }),
    `${precon.deckName} rationale should be deterministic`
  );
}

let publicGuidanceCount = 0;
for (const faction of Object.values(factions)) {
  const guidance = buildWhatToLookFor(faction);
  publicGuidanceCount += guidance.length;
  for (const item of guidance) {
    assert.ok(item.name && item.desc, `${faction.key} public guidance should be actionable`);
    assert.ok(item.provenance.sourceResearchFile, `${faction.key} public guidance should name its source packet`);
    assert.ok(item.provenance.claimIds.length, `${faction.key} public guidance should retain claim provenance`);
    assert.ok(item.provenance.sourceIds.length, `${faction.key} public guidance should retain source provenance`);
    assert.doesNotMatch(`${item.name} ${item.desc}`, INTERNAL_GUIDANCE_RE);
  }
}
assert.ok(publicGuidanceCount > 0, "expected approved Commander guidance to remain available where supported");
assert.doesNotMatch(preconSourceText, /Spell magnitide payoffs/i, "public precon authority must not retain the spell-magnitude typo");
assert.doesNotMatch(factionsSourceText, /volatility Theater/, "public taxonomy labels must use approved capitalization");
assert.doesNotMatch(factionsSourceText, /Represent's the college's main protagonist/, "the owner-approved Quintorius editorial correction must propagate");

const publicOmens = buildReadingOmens({
  activeFactionKey: "UB",
  evidenceTrail: [
    {
      answer_title: "Act as they commit",
      observation: "You preferred to act as opponents commit.",
      signal: "SIG_C08_COMMIT_WINDOW",
      question_id: "b1.hall.interaction-window.v1",
      answer_id: "b1.hall.interaction-window.v1.commit",
      deltas: [{ faction: "UB", delta: 1 }],
    },
  ],
});
assert.equal(publicOmens.length, 1);
assert.equal(publicOmens[0].copy, "You preferred to act as opponents commit.");
assert.doesNotMatch(JSON.stringify(publicOmens.map(({ answerTitle, copy }) => ({ answerTitle, copy }))), INTERNAL_TOKEN_RE);
const independentOmens = buildReadingOmens({
  activeFactionKey: "UB",
  evidenceTrail: [
    { observation: "First timing observation.", dependency_group: "DG_C08", construct: "C08", deltas: [{ faction: "UB", delta: 1 }] },
    { observation: "Duplicated timing observation.", dependency_group: "DG_C08", construct: "C08", deltas: [{ faction: "UB", delta: 1 }] },
    { observation: "Information observation.", dependency_group: "DG_C16", construct: "C16", deltas: [{ faction: "UB", delta: 1 }] },
    { observation: "Neutral observation.", dependency_group: "DG_C09", construct: "C09", neutral: true, deltas: [{ faction: "UB", delta: 1 }] },
  ],
});
assert.equal(independentOmens.length, 2, "Why This Fit must count independent positive dependency groups, not duplicate or neutral evidence");
assert.deepEqual(independentOmens.map((omen) => omen.dependencyGroup), ["DG_C08", "DG_C16"]);

globalThis.VM_SESSION = { profile: null, username: "" };
globalThis.window = {
  addEventListener() {},
  location: { href: "http://localhost/archscry/" },
  history: { replaceState() {} },
};
globalThis.document = {
  addEventListener() {},
  querySelectorAll() { return []; },
  querySelector() { return null; },
  getElementById() { return null; },
  body: {},
  createElement() {
    return {
      className: "",
      textContent: "",
      append() {},
      classList: { add() {}, remove() {}, toggle() {} },
    };
  },
};

const {
  approvedCardRationaleForFaction,
  buildFlavorEchoesHtml,
  renderPlayerCopy,
  validateDossierContentCatalogs,
} = await import("../assets/js/index.js");
const [placementModel, identityDossierCatalog, publicComparisonCatalog, discoveryEducationCatalog] = await Promise.all([
  readJson("../data/gate-b1-placement-model.json"),
  readJson("../data/dossier/identity-dossier-content.catalog.json"),
  readJson("../data/dossier/public-comparisons.catalog.json"),
  readJson("../data/dossier/discovery-education-catalog.json"),
]);
const dossierCatalogFixture = {
  placementModel,
  identityDossierCatalog,
  publicComparisonCatalog,
  discoveryEducationCatalog,
};
assert.equal(validateDossierContentCatalogs(dossierCatalogFixture), true, "the completed additive dossier catalogs must satisfy runtime readiness");
const staleComparisonCatalog = structuredClone(publicComparisonCatalog);
const requiredPair = placementModel.confusion_pairs[0].identities;
staleComparisonCatalog.records = staleComparisonCatalog.records.filter((record) => !(
  requiredPair.includes(record.identity_a) && requiredPair.includes(record.identity_b)
));
assert.equal(validateDossierContentCatalogs({ ...dossierCatalogFixture, publicComparisonCatalog: staleComparisonCatalog }), false, "a missing mandatory confusion-pair comparison must still fail closed");
assert.equal(cardRationaleSource.records.length, 52, "expected 26 retained, 25 original gap proposals, and the approved Colorless collision-repair rationale");
assert.ok(cardRationaleSource.records.every((record) => record.review_status === "APPROVED_PUBLIC"));
assert.equal(cardRationaleCatalog.records.length, 50, "approved catalog must cover all identities while retaining the deterministic three-card display maximum");
const witherbloomPrinting = cardVoicePrintings.records.find((record) => record.identity_key === "WITHERBLOOM");
assert.equal(witherbloomPrinting?.scryfall_id, "e5af06c8-86ab-4731-aa4a-2eec2c664488");
assert.match(witherbloomPrinting?.image_uris?.normal || "", /e5af06c8-86ab-4731-aa4a-2eec2c664488/);
assert.match(indexSource, /dossier\/card-voice-printings\.source\.json/, "runtime must consume the exact-printing card voice authority");
const isperia = commanderIndex.find((card) => card.name === "Isperia, Supreme Judge");
const genericAzoriusCard = commanderIndex.find((card) => card.name === "Brago, King Eternal");
const isperiaRationale = approvedCardRationaleForFaction(isperia, factions.WU, cardRationaleCatalog);
assert.equal(isperiaRationale?.text, "Isperia represents Azorius leadership, and her card rewards you with additional information when opponents attack you or your planeswalkers.");
assert.equal(approvedCardRationaleForFaction(genericAzoriusCard, factions.WU, cardRationaleCatalog), null, "generic same-color overlap must not create a rationale");
assert.match(buildFlavorEchoesHtml([{ card: isperia, rationale: isperiaRationale }], factions.WU, cardRationaleCatalog), /Isperia represents Azorius leadership/);
assert.equal(buildFlavorEchoesHtml([{ card: genericAzoriusCard }], factions.WU), "", "unsupported card rationale should omit the card section");
assert.match(indexSource, /dossier\/card-rationale-catalog\.json/);
assert.match(indexSource, /dossier\/card-voice-catalog\.json/);
assert.match(indexSource, /Cards That Sound Like This/);
assert.match(indexSource, /selectApprovedCardVoices\(\{ faction, excludedCardIds: pageCardUsage \}\)/);
assert.match(indexSource, /selectApprovedCardRationales\(\{ faction, excludedCardIds: pageCardUsage \}\)/);
assert.match(indexSource, /visiblePrecons\.map\(\(precon\) => precon\.mainCommander\)/, "precon commanders must reserve their canonical card identity first");
assert.match(indexSource, /filterStarterCardsForUsage\(dossier\.starterCards, pageCardUsage\)/, "Card Signal References must consume the page-level usage plan");

assert.match(indexSource, /Why This Fit/);
assert.match(indexSource, /Test the Fit/);
assert.match(indexSource, /What to Look For/);
assert.doesNotMatch(indexSource, /<div class="section-label">Signals From Your Answers<\/div>/);
assert.doesNotMatch(indexSource, /<div class="section-label">Layered Identity<\/div>/);
assert.doesNotMatch(indexSource, /<div class="section-label">Commander Lanes<\/div>/);
assert.doesNotMatch(radarSource, /\$\{factionKey === "COLORLESS" \? renderColorlessCardVoiceBoundaryPanel\(\) : renderDossierCardVoicesPanel\(flavorSnippets\)\}/);
assert.match(indexSource, /dialog\.showModal\(\)/);
assert.match(indexSource, /aria-labelledby", "archscryCardDialogTitle"/);
assert.match(indexSource, /dialog\.addEventListener\("close"/);
assert.match(indexSource, /event\.key === "Escape"/);
assert.match(indexSource, /Open on Scryfall/);
assert.match(indexSource, /card-detail-image-trigger/);
assert.match(indexSource, /<blockquote class="flavor-echo-why">\$\{escapeHtml\(record\.excerpt\)\}<\/blockquote>/, "public card voice must render the exact printing text without synthetic quote wrappers");
assert.match(indexSource, /rationale && provenance \?/);
assert.doesNotMatch(indexSource, /function buildCommanderSpecificLinks/);
assert.match(indexSource, /const repeatsServiceName = serviceLabel\.localeCompare\(actionLabel/, "provider chips must suppress a repeated provider/action label");
assert.match(indexSource, /archscryGlossaryTooltip/);
assert.match(renderPlayerCopy("Spend true {C}, not &#x67;eneric mana."), /aria-label="colorless mana"/);
assert.match(renderPlayerCopy("Spend true {C}, not &#x67;eneric mana."), /not generic mana/);
assert.doesNotMatch(renderPlayerCopy("Spend true {C}."), /\{C\}/);
assert.equal(
  renderPlayerCopy("Refuses to let five-color breadth become superiority, Colorless proof, four-color leakage, or unsupported Commander claims."),
  "Keeps five-color breadth focused by making every color and every included tool contribute to the plan.",
  "the exact WUBRG boundary copy must render as player guidance rather than audit commentary"
);
assert.equal(
  presentationForFaction("WUBRG").loreRole,
  "The Five-Color expression: all five colors present, coalition and synthesis, with each color contributing to the whole plan"
);
const greenStart = buildCommanderStartingLane({ faction: factions.G, guidance: factions.G.commander_compass });
assert.doesNotMatch(JSON.stringify(greenStart), /color-legal starting direction|curated or dossier-supported|recorded answers do not prove/i);
assert.doesNotMatch(indexSource, /identity-appropriate Commander exploration paths, not proof|Starter references are curated from faction data|one bounded path through it/i);
assert.doesNotMatch(commanderDossierSource, /color-legal starting direction|curated or dossier-supported|recorded answers do not prove/i);
assert.doesNotMatch(matrixSource, /controlled expression|source-bound|without adding certainty to the result/i);
assert.match(indexSource, /EDUCATION_SURFACE_PRIORITY[\s\S]*?"start-here"[\s\S]*?"why-this-fit"[\s\S]*?"test-the-fit"[\s\S]*?"what-to-look-for"/, "glossary allocation must follow the approved page-level surface priority");
assert.match(indexSource, /educationalTermAllocation\.has\(help\.recordId\)/, "glossary allocation should assign each canonical record once per page");
assert.match(indexSource, /renderedEducationalTerms\.has\(help\.recordId\)/, "glossary rendering should decorate each canonical record once per page");
assert.doesNotMatch(indexSource, /renderEducationalText\(presentation\.[a-z_]+, "how-this-plays"\)/, "How This Plays is outside the glossary teaching surfaces");
assert.doesNotMatch(indexSource, /Sharpen This Reading/, "valid named readings must not ask another question merely to fill an explanation card");
assert.doesNotMatch(indexSource, /why-fit-refinement/, "Why This Fit must remain an explanation surface");
assert.match(indexSource, /Refine these directions/, "mixed readings with an approved discriminator should expose state-specific refinement");
assert.match(indexSource, /Try to separate/, "close and tied readings should name the distinction target");
assert.match(indexSource, /show-bounded-direction/, "mixed readings should expose their independently supported directions");
assert.match(indexSource, /if \(trigger\.cardName\)[\s\S]*?loadCachedScryfallNamedCard\(trigger\.cardName\)/, "named rationale previews should resolve the canonical full-card record before using a tile image");
assert.match(cssSource, /\.public-three-item-grid\{\s*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
assert.match(cssSource, /public-three-item-grid\[data-item-count="1"\]/);
assert.match(cssSource, /public-three-item-grid\[data-item-count="2"\]/);
assert.match(cssSource, /@media\(max-width:980px\) and \(min-width:701px\)[\s\S]*?public-three-item-grid\{\s*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(cssSource, /public-three-item-grid\[data-item-count="3"\] > :last-child/);
assert.match(cssSource, /@media\(max-width:700px\)[\s\S]*?public-three-item-grid\{\s*grid-template-columns:1fr/);
assert.match(cssSource, /\.archscry-card-dialog\{[\s\S]*?position:fixed;[\s\S]*?inset:0;[\s\S]*?margin:auto;/);
assert.doesNotMatch(indexSource, /length\s*[<=>]+\s*4[^\n]*reason/i, "layout must not require a fourth reason");

console.log(JSON.stringify({
  status: "PASS",
  provider_matrix: { commanders: uniqueCommanders.length, exact_destinations: verifiedLinks.length, suppressed: suppressedRows.length },
  precon_rationales: precons.length,
  public_commander_guidance_items: publicGuidanceCount,
  card_rationale_guard: "PASS",
  public_card_rationales: cardRationaleCatalog.records.length,
  internal_token_guard: "PASS",
  modal_contract: "PASS",
  tooltip_contract: "PASS",
  three_item_layout: "PASS",
}, null, 2));
