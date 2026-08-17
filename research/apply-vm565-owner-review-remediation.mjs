import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const pretty = (value) => `${JSON.stringify(value, null, 2)}\n`;
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");

const relationshipPath = "data/dossier/card-voice-relationships.source.json";
const printingPath = "data/dossier/card-voice-printings.source.json";
const catalogPath = "data/dossier/card-voice-catalog.json";
const [relationshipInput, printingInput, catalogInput, playCatalog] = await Promise.all([
  readJson(relationshipPath),
  readJson(printingPath),
  readJson(catalogPath),
  readJson("data/dossier/card-rationale-catalog.json"),
]);

const priorInkRelationships = relationshipInput.records.filter((record) => record.identity_key === "INK");
if (priorInkRelationships.length !== 2) throw new Error(`Expected two Ink Sound relationships, found ${priorInkRelationships.length}`);
const priorNames = priorInkRelationships.map((record) => record.canonical_card_name).sort();
const baselineNames = ["Command Tower", "Danitha Capashen, Paragon"].sort();
const replacementNames = ["Crystal, Inhuman Princess", "Group Project"].sort();
const alreadyApplied = priorNames.join("|") === replacementNames.join("|");
if (!alreadyApplied && priorNames.join("|") !== baselineNames.join("|")) {
  throw new Error(`VM-565 Ink remediation baseline drifted: ${priorNames.join(", ")}`);
}
const protectedPlay = playCatalog.records.filter((record) => record.identity_key === "INK" && record.card?.name === "Kynaios and Tiro of Meletis");
if (protectedPlay.length !== 1) throw new Error(`Protected Ink Play relationship drifted: expected one Kynaios and Tiro, found ${protectedPlay.length}`);

const evidenceLocator = "docs/research/ink/owner-evidence/vm565/ink-sound-candidate-ledger.json";
const approvalBasis = "OWNER_AUTHORIZED_VM565_CORRECTION_PENDING_FINAL_ACCEPTANCE";
const validatorVersion = "vm565-ink-owner-remediation-v1";
const sharedSourceIds = [
  "src_vm_ink_evidence_ledger_20260604",
  "src_vm_four_color_reference_audit_20260604",
  "src_vm565_ink_owner_evidence_20260816",
];
const sharedSourceLocators = [
  { source_id: "src_vm_ink_evidence_ledger_20260604", locator: "docs/research/ink/ink-evidence-ledger.md#INK-EVID-007" },
  { source_id: "src_vm_four_color_reference_audit_20260604", locator: "docs/research/canon/canon-inventory-four-color-reference-audit.md#rgwu-altruism-ink" },
  { source_id: "src_vm565_ink_owner_evidence_20260816", locator: evidenceLocator },
];

const cards = [
  {
    slot: 1,
    pair_role: "ANCHOR",
    relationship_id: "cardvoice_vm565_ink_32c14d7f_fdaa_4340_af94_1f10bf064f51",
    name: "Crystal, Inhuman Princess",
    oracle_id: "32c14d7f-fdaa-4340-af94-1f10bf064f51",
    scryfall_id: "1e9aec49-08d7-4fc8-87dd-69ab8910688a",
    set: "msc",
    collector_number: "80",
    mana_cost: "{1}{R}{G}",
    color_identity: ["G", "R", "U", "W"],
    type_line: "Legendary Creature — Inhuman Noble Hero",
    oracle_text: "Flying\nWhenever you cast a noncreature spell, Crystal deals X damage to each opponent, where X is the number of colors that spell is.\n{T}: Add {R}, {G}, {W}, or {U}.",
    excerpt: "\"Attilan can't stay hidden forever. It's time we showed them how fantastic we are.\"",
    image_uris: {
      small: "https://cards.scryfall.io/small/front/1/e/1e9aec49-08d7-4fc8-87dd-69ab8910688a.jpg?1783981173",
      normal: "https://cards.scryfall.io/normal/front/1/e/1e9aec49-08d7-4fc8-87dd-69ab8910688a.jpg?1783981173",
      art_crop: "https://cards.scryfall.io/art_crop/front/1/e/1e9aec49-08d7-4fc8-87dd-69ab8910688a.jpg?1783981173"
    },
    scryfall_uri: "https://scryfall.com/card/msc/80/crystal-inhuman-princess?utm_source=api",
    teaching_facet: "collective flourishing brought out of isolation",
    complementarity_rationale: "Crystal supplies a true RGWU voice of a hidden community choosing public participation; Group Project complements it with direct mutual aid and shared success.",
    why_voice_belongs: "Crystal's exact excerpt speaks as a collective 'we' and calls for a hidden community to show what it can become, giving Ink a bounded voice of collective flourishing brought into public view.",
    relationship_bridge: "The Sound relationship depends on Crystal's exact collective voice and Ink's bounded community-benefit frame, not on her damage ability, mana ability, Marvel product membership, or four-color identity by itself.",
    false_positive_analysis: "Bant, Naya, and generic heroic teams can also value community and public action. Crystal is admitted only as a bounded Ink echo because the exact line moves from hidden isolation to a collective 'we'; RGWU status alone would be insufficient.",
    adjacent_identity_confusion_risk: "Do not use Crystal as generic four-color, Fantastic Four, Inhuman, visibility, or team proof. The public relationship is limited to the exact communal voice in this printing.",
    limitation: "Crystal is a bounded Sound anchor, not naming, placement, lore, or Commander-strategy authority for Ink.",
    modal_explanation: "Crystal speaks for Attilan as a collective 'we,' choosing public participation over staying hidden. The line makes flourishing something a community reveals together.",
    supporting_official_locators: [
      "https://magic.wizards.com/en/news/announcements/marvel-super-heroes-commander-decklists"
    ],
  },
  {
    slot: 2,
    pair_role: "COMPLEMENT",
    relationship_id: "cardvoice_vm565_ink_e1ce210e_2d1d_4ab4_bfb7_8e36884797fc",
    name: "Group Project",
    oracle_id: "e1ce210e-2d1d-4ab4-bfb7-8e36884797fc",
    scryfall_id: "e8abc1eb-6225-4b18-8502-b5324b818aed",
    set: "sos",
    collector_number: "17",
    mana_cost: "{1}{W}",
    color_identity: ["W"],
    type_line: "Sorcery",
    oracle_text: "Create a 2/2 red and white Spirit creature token.\nFlashback—Tap three untapped creatures you control. (You may cast this card from your graveyard for its flashback cost. Then exile it.)",
    excerpt: "\"Never be afraid to ask for help. Success is much sweeter when it's shared.\"\n—Quintorius Kand",
    image_uris: {
      small: "https://cards.scryfall.io/small/front/e/8/e8abc1eb-6225-4b18-8502-b5324b818aed.jpg?1783903707",
      normal: "https://cards.scryfall.io/normal/front/e/8/e8abc1eb-6225-4b18-8502-b5324b818aed.jpg?1783903707",
      art_crop: "https://cards.scryfall.io/art_crop/front/e/8/e8abc1eb-6225-4b18-8502-b5324b818aed.jpg?1783903707"
    },
    scryfall_uri: "https://scryfall.com/card/sos/17/group-project?utm_source=api",
    teaching_facet: "mutual aid and success shared without shame",
    complementarity_rationale: "Crystal supplies public collective flourishing; Group Project adds the personal act of asking for help and treating success as shared rather than solitary.",
    why_voice_belongs: "Group Project's exact excerpt directly joins asking for help with success made sweeter through sharing, giving Ink a voice of mutual aid and reciprocal benefit.",
    relationship_bridge: "The Sound relationship depends on Quintorius's exact statement and Ink's bounded community-benefit frame, not on the card's token, flashback, or tapping mechanics.",
    false_positive_analysis: "White, Blue, Selesnya, and generic Group Hug can all discuss help or sharing. This proposal is limited to the exact combination of mutual aid and shared success, and it does not reduce Ink to unconditional resource gifting.",
    adjacent_identity_confusion_risk: "Do not use Group Project as generic White, Strixhaven, token, graveyard, or Group Hug proof. Its role is the exact voice of help requested and success shared.",
    limitation: "Group Project is a bounded Sound complement, not color, placement, lore, or deck-mechanics authority for Ink.",
    modal_explanation: "Quintorius treats asking for help as courage rather than failure. Success becomes sweeter because it belongs to the people who made it together.",
    supporting_official_locators: [],
  },
];

function buildRelationship(card, previous) {
  const printingLocator = `data/dossier/card-voice-printings.source.json#relationship_id=${card.relationship_id}`;
  return {
    ...previous,
    relationship_id: card.relationship_id,
    proposal_id: `vm565_owner_remediation_ink_slot_${card.slot}`,
    identity_key: "INK",
    identity_name: "Ink / Altruism",
    slot: card.slot,
    pair_role: card.pair_role,
    ...(card.slot === 2 ? { complements_relationship_id: cards[0].relationship_id } : {}),
    teaching_facet: card.teaching_facet,
    complementarity_rationale: card.complementarity_rationale,
    canonical_card_name: card.name,
    canonical_card_id: card.oracle_id,
    scryfall_id: card.scryfall_id,
    exact_excerpt: card.excerpt,
    printing: {
      scryfall_id: card.scryfall_id,
      oracle_id: card.oracle_id,
      set: card.set,
      collector_number: card.collector_number,
      flavor_text_field: "card.flavor_text",
      source_locator: `https://api.scryfall.com/cards/${card.scryfall_id}#card.flavor_text`,
      scryfall_uri: card.scryfall_uri,
      image_uris: card.image_uris,
      card_faces: [],
      type_line: card.type_line,
      mana_cost: card.mana_cost,
      color_identity: card.color_identity,
      oracle_text: card.oracle_text,
    },
    type_line: card.type_line,
    type_policy: {
      status: "PASS",
      reason: "The selected Sound card is not a land and is distinct from Ink's protected Play card.",
    },
    relationship_class: "CERTIFIED_SEMANTIC_ECHO",
    certified_identity_claim_ids: ["ink_claim_0005"],
    source_ids: sharedSourceIds,
    source_locators: sharedSourceLocators,
    supporting_official_locators: card.supporting_official_locators,
    canonical_card_data_locator: printingLocator,
    why_voice_belongs: card.why_voice_belongs,
    relationship_bridge: card.relationship_bridge,
    false_positive_analysis: card.false_positive_analysis,
    adjacent_identity_confusion_risk: card.adjacent_identity_confusion_risk,
    limitation: card.limitation,
    proposed_modal_explanation: card.modal_explanation,
    modal_explanation: card.modal_explanation,
    review_status: "APPROVED_PUBLIC",
    approval_basis: approvalBasis,
    owner_decision: "AUTHORIZED_REPLACEMENT_PENDING_FINAL_RENDERED_ACCEPTANCE",
    validation: {
      validator_version: validatorVersion,
      passed: true,
      failures: [],
      owner_decision: "AUTHORIZED_REPLACEMENT_PENDING_FINAL_RENDERED_ACCEPTANCE",
      evidence_chain: {
        identity_claim_ids: ["ink_claim_0005"],
        identity_source_locators: ["data/raw-factions/ink/ink.claims.json#ink_claim_0005"],
        fact_source_locators: [
          `https://api.scryfall.com/cards/${card.scryfall_id}#card.flavor_text`,
          evidenceLocator,
        ],
      },
    },
    display_priority: card.slot,
    critical_repeat: {
      allowed: false,
      reason: "Kynaios and Tiro of Meletis remains protected in Play; Sound uses distinct cards.",
    },
    owner_revision_history: alreadyApplied ? (previous.owner_revision_history || []) : [
      ...(previous.owner_revision_history || []),
      {
        decided_at: "2026-08-16",
        decision: "REJECT_RENDERED_RELATIONSHIP",
        previous_relationship_id: previous.relationship_id,
        previous_card_name: previous.canonical_card_name,
        instruction: "Replace the owner-rejected Ink Sound set with nonland, flavor-grounded cards while preserving Kynaios and Tiro as Play-only.",
      },
    ],
    proposal_origin: {
      kind: "VM565_OWNER_EVIDENCE_GATE",
      locator: evidenceLocator,
    },
    copy_revision: {
      task: "VM-565",
      change_class: "OWNER_REVIEW_SOUND_SELECTION_REMEDIATION",
      reason: "Replace a land and a weak mono-white voice with two direct-flavor relationships selected through the bounded owner evidence gate.",
      evidence_locator: evidenceLocator,
    },
  };
}

const replacementBySlot = new Map(cards.map((card) => [card.slot, buildRelationship(card, priorInkRelationships.find((record) => record.slot === card.slot))]));
const relationshipOutput = {
  ...relationshipInput,
  records: relationshipInput.records.map((record) => record.identity_key === "INK" ? replacementBySlot.get(record.slot) : record),
};

const printingBySlot = new Map(cards.map((card) => [card.slot, {
  identity_key: "INK",
  canonical_card_name: card.name,
  oracle_id: card.oracle_id,
  scryfall_id: card.scryfall_id,
  set: card.set,
  collector_number: card.collector_number,
  exact_flavor_text: card.excerpt,
  flavor_text_field: "card.flavor_text",
  scryfall_uri: card.scryfall_uri,
  source_locator: `https://api.scryfall.com/cards/${card.scryfall_id}#card.flavor_text`,
  image_uris: card.image_uris,
  card_faces: [],
  type_line: card.type_line,
  mana_cost: card.mana_cost,
  color_identity: card.color_identity,
  oracle_text: card.oracle_text,
  relationship_id: card.relationship_id,
  slot: card.slot,
}]));
const printingOutput = {
  ...printingInput,
  records: printingInput.records.map((record) => record.identity_key === "INK" ? printingBySlot.get(record.slot) : record),
};

const catalogBySlot = new Map(cards.map((card) => {
  const relationship = replacementBySlot.get(card.slot);
  return [card.slot, {
    relationship_id: relationship.relationship_id,
    identity_key: "INK",
    card: {
      name: card.name,
      oracle_id: card.oracle_id,
      scryfall_id: card.scryfall_id,
      set: card.set,
      collector_number: card.collector_number,
      data_locator: relationship.canonical_card_data_locator,
    },
    excerpt: relationship.exact_excerpt,
    why_it_echoes: relationship.why_voice_belongs,
    modal_explanation: relationship.modal_explanation,
    relationship_class: relationship.relationship_class,
    slot: relationship.slot,
    pair_role: relationship.pair_role,
    display_priority: relationship.display_priority,
    critical_repeat: relationship.critical_repeat,
    provenance: {
      claim_ids: relationship.certified_identity_claim_ids,
      source_ids: relationship.source_ids,
      printing_id: card.scryfall_id,
      printing_source_locator: relationship.printing.source_locator,
      validator_version: validatorVersion,
      approval_basis: approvalBasis,
    },
  }];
}));
const catalogOutput = {
  ...catalogInput,
  source_sha256: digest(pretty(relationshipOutput)),
  records: catalogInput.records.map((record) => record.identity_key === "INK" ? catalogBySlot.get(record.slot) : record),
};

if (catalogOutput.records.some((record) => record.identity_key === "INK" && record.card?.name === "Kynaios and Tiro of Meletis")) {
  throw new Error("Protected Ink Play card was duplicated into Sound");
}
if (cards.some((card) => /\bland\b/i.test(card.type_line))) {
  throw new Error("A land survived in the Ink Sound set");
}

const outputs = {
  [relationshipPath]: pretty(relationshipOutput),
  [printingPath]: pretty(printingOutput),
  [catalogPath]: pretty(catalogOutput),
};
for (const [relativePath, content] of Object.entries(outputs)) {
  const absolutePath = path.join(root, relativePath);
  if (check) {
    const current = await readFile(absolutePath, "utf8");
    if (current !== content) throw new Error(`${relativePath} is stale; run node research/apply-vm565-owner-review-remediation.mjs`);
  } else {
    await writeFile(absolutePath, content);
  }
}

console.log(JSON.stringify({
  status: "PASS",
  mode: check ? "check" : "write",
  ink_sound: cards.map((card) => card.name),
  lands: 0,
  protected_play: "Kynaios and Tiro of Meletis",
}, null, 2));
