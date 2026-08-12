import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildPublicPreconRationale,
  buildReadingOmens,
  buildWhatToLookFor,
} from "../assets/js/commander-dossier.js";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const factions = (await readJson("../data/factions.json")).factions;
const precons = (await readJson("../data/precons/vox-mana-precon-catalog.json")).precons;
const providerValidation = await readJson("../data/placement/commander-provider-validation.json");
const commanderIndex = (await readJson("../data/scryfall/indexes/commander-index.json")).commanders;
const cardRationaleSource = await readJson("../data/dossier/card-rationale-relationships.source.json");
const cardRationaleCatalog = await readJson("../data/dossier/card-rationale-catalog.json");
const indexSource = await readFile(new URL("../assets/js/index.js", import.meta.url), "utf8");
const radarSource = await readFile(new URL("../assets/js/dossier-radar.js", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../assets/css/archscry.css", import.meta.url), "utf8");

const INTERNAL_TOKEN_RE = /\b(?:SIG_[A-Z0-9_]+|DG_[A-Z0-9_]+|MAPPING_[A-Z0-9_]+|b1\.[a-z0-9_.-]+|naming qualification|mapping hypothesis|bounded observation|question_id|answer_id)\b/i;
const INTERNAL_GUIDANCE_RE = /\b(?:source-backed|public-surface|guardrail|evidence-required|boundary-only|routing|taxonomy|support lane)\b/i;

const uniqueCommanders = [...new Set(precons.map((precon) => precon.mainCommander).filter(Boolean))].sort();
assert.equal(uniqueCommanders.length, 155, "expected the complete 155-commander precon provider matrix");
assert.equal(providerValidation.scope.unique_commanders, uniqueCommanders.length);
assert.deepEqual(Object.keys(providerValidation.commanders).sort(), uniqueCommanders);

const providerRows = Object.values(providerValidation.commanders);
const verifiedLinks = providerRows.flatMap((row) => row.links || []);
const suppressedRows = providerRows.filter((row) => !(row.links || []).length);
assert.equal(verifiedLinks.length, 143, "expected only live-verified EDHREC destinations to be enabled");
assert.equal(suppressedRows.length, 12, "expected all 404 provider destinations to remain suppressed");
assert.ok(verifiedLinks.every((link) => link.verified === true && link.verification === "HTTP 200"));
assert.ok(verifiedLinks.every((link) => /^https:\/\/edhrec\.com\/commanders\//.test(link.url)));
assert.equal(providerValidation.providers.archidekt.enabled, false);
assert.equal(providerValidation.providers.mtgdecks.enabled, false);
assert.equal(providerValidation.providers.mtggoldfish.enabled, false);
assert.match(providerValidation.commanders["Captain N'ghathrod"].links[0].url, /captain-nghathrod$/);
assert.equal(providerValidation.commanders["Y'shtola, Night's Blessed"].links.length, 0);
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

const { approvedCardRationaleForFaction, buildFlavorEchoesHtml } = await import("../assets/js/index.js");
assert.equal(cardRationaleSource.records.length, 26, "expected only provenance-complete native-anchor proposals to remain reviewable");
assert.ok(cardRationaleSource.records.every((record) => record.review_status === "REVIEW_REQUIRED"));
assert.equal(cardRationaleCatalog.records.length, 0, "review-required rationale must fail closed in player runtime");
const isperia = commanderIndex.find((card) => card.name === "Isperia, Supreme Judge");
const genericAzoriusCard = commanderIndex.find((card) => card.name === "Brago, King Eternal");
assert.equal(approvedCardRationaleForFaction(isperia, factions.WU, cardRationaleCatalog), null, "owner-review copy must not be treated as approved");
assert.equal(approvedCardRationaleForFaction(genericAzoriusCard, factions.WU, cardRationaleCatalog), null, "generic same-color overlap must not create a rationale");
assert.equal(buildFlavorEchoesHtml([{ card: isperia }], factions.WU, cardRationaleCatalog), "", "unapproved card rationale should omit the card section");
assert.equal(buildFlavorEchoesHtml([{ card: genericAzoriusCard }], factions.WU), "", "unsupported card rationale should omit the card section");
assert.match(indexSource, /dossier\/card-rationale-catalog\.json/);
assert.match(indexSource, /selectApprovedCardRationales\(\{ faction \}\)/);

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
assert.match(indexSource, /rationale && provenance \?/);
assert.doesNotMatch(indexSource, /function buildCommanderSpecificLinks/);
assert.match(indexSource, /archscryGlossaryTooltip/);
assert.match(cssSource, /\.public-three-item-grid\{\s*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
assert.match(cssSource, /@media\(max-width:980px\) and \(min-width:701px\)[\s\S]*?public-three-item-grid\{\s*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(cssSource, /public-three-item-grid > :last-child:nth-child\(odd\)/);
assert.match(cssSource, /@media\(max-width:700px\)[\s\S]*?public-three-item-grid\{\s*grid-template-columns:1fr/);
assert.doesNotMatch(indexSource, /length\s*[<=>]+\s*4[^\n]*reason/i, "layout must not require a fourth reason");

console.log(JSON.stringify({
  status: "PASS",
  provider_matrix: { commanders: uniqueCommanders.length, enabled_edhrec: verifiedLinks.length, suppressed: suppressedRows.length },
  precon_rationales: precons.length,
  public_commander_guidance_items: publicGuidanceCount,
  card_rationale_guard: "PASS",
  public_card_rationales: cardRationaleCatalog.records.length,
  internal_token_guard: "PASS",
  modal_contract: "PASS",
  tooltip_contract: "PASS",
  three_item_layout: "PASS",
}, null, 2));
