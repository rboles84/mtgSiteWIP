// Vox Mana Orzhov Translation Layer Functions
// Generated for Orzhov Syndicate: debt, contracts, hierarchy, spirit labor, extort, haunt, afterlife, and lifegain/drain.

const ORZHOV_CONTEXT = Object.freeze({
  faction: "Orzhov Syndicate",
  colorPair: "white-black",
  coreAxiom: "Power persists by turning obligation into structure and death into enforceable debt.",
  defaultTone: ["elegant", "oppressive", "contractual", "ghostly", "aristocratic", "patient"]
});

function normalizeTags(input = {}) {
  const tags = Array.isArray(input.tags) ? input.tags : [];
  const text = [input.card_name, input.mechanic_or_theme, input.tags, input.narrative_read]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return { tags, text };
}

export function Detain(input = {}) {
  const { text } = normalizeTags(input);
  const isRemoval = /destroy|exile|removal|pacif|lock|lashes|execution|mortify/.test(text);
  const isCombat = /attack|block|combat|damage|deathtouch/.test(text);
  return {
    function: "Detain",
    faction: ORZHOV_CONTEXT.faction,
    interpretation: isRemoval
      ? "A sanction is issued: the target is bound, removed, or made legally unavailable."
      : "An obligation hardens around the target until action becomes too costly or impossible.",
    orzhovMechanism: isCombat
      ? "combat liability converted into punishment"
      : "contractual containment and sanctioned restraint",
    animation: ["contract_writ", "hierarchy_gate", "final_stamp"],
    microcopy: "Bound by clause, not by force.",
    outputTags: ["contract", "restraint", "sanction", "punishment"]
  };
}

export function Override(input = {}) {
  const { text } = normalizeTags(input);
  const isGrave = /graveyard|spirit|ghost|death|afterlife|haunt|kaya/.test(text);
  const isHand = /hand|discard|confession|castigate|sin/.test(text);
  return {
    function: "Override",
    faction: ORZHOV_CONTEXT.faction,
    interpretation: isHand
      ? "Private intent is made admissible, audited, and removed from the opponent's future line."
      : isGrave
        ? "The afterlife ledger is rewritten: ghosts, graves, and obligations change ownership."
        : "Ownership, permission, or board state is overwritten by higher Syndicate authority.",
    orzhovMechanism: "legal-spiritual authority supersedes ordinary control",
    animation: ["contract_writ", "final_stamp", "spirit_afterimage"],
    microcopy: "The contract rewrites ownership.",
    outputTags: ["audit", "override", "exile", "repossession", "authority"]
  };
}

export function ConstraintField(input = {}) {
  const { text } = normalizeTags(input);
  const isTax = /tax|tithe|extort|fee|payment|smothering|obedience/.test(text);
  const isHierarchy = /hierarchy|oligarch|pontiff|knight|guard|basilica|gate/.test(text);
  return {
    function: "ConstraintField",
    faction: ORZHOV_CONTEXT.faction,
    interpretation: isTax
      ? "The table remains free to act, but every action receives a price tag."
      : isHierarchy
        ? "Rank, office, and ritual gates define who may move and who must kneel."
        : "The battlefield is narrowed by fees, penalties, protective clauses, and asymmetric status.",
    orzhovMechanism: "compliance through cost and rank",
    animation: ["hierarchy_gate", "coin_tithe", "ledger_accretion"],
    microcopy: "Every action passes through the fee schedule.",
    outputTags: ["tax", "hierarchy", "pillowfort", "fee", "compliance"]
  };
}

export function AccretionEngine(input = {}) {
  const { text } = normalizeTags(input);
  const isExtort = /extort|tithe|payment|tax/.test(text);
  const isAfterlife = /afterlife|haunt|spirit|ghost|death/.test(text);
  const isDrain = /drain|lifegain|life gain|lifelink|vampire/.test(text);
  return {
    function: "AccretionEngine",
    faction: ORZHOV_CONTEXT.faction,
    interpretation: isExtort
      ? "Every spell becomes a recurring collection opportunity."
      : isAfterlife
        ? "Death does not end value; it creates a second, enforceable body of obligation."
        : isDrain
          ? "Life total movement becomes a two-column ledger: their loss, your gain."
          : "Small obligations compound into inevitability through recursion, sacrifice, and repeated triggers.",
    orzhovMechanism: "debt compounding into durable advantage",
    animation: ["coin_tithe", "spirit_afterimage", "ledger_accretion"],
    microcopy: "Debt compounds after death.",
    outputTags: ["accretion", "drain", "afterlife", "recursion", "aristocrats"]
  };
}

export function translateOrzhovCard(row = {}) {
  const fn = row.translation_function || row.translationFunction || "AccretionEngine";
  const map = { Detain, Override, ConstraintField, AccretionEngine };
  const result = (map[fn] || AccretionEngine)(row);
  return {
    id: row.id,
    cardName: row.card_name || row.cardName,
    axis: row.orzhov_axis || row.axis,
    structuralRole: row.structural_role || row.structuralRole,
    narrativeRead: row.narrative_read || row.narrativeRead,
    translation: result
  };
}

export default {
  ORZHOV_CONTEXT,
  Detain,
  Override,
  ConstraintField,
  AccretionEngine,
  translateOrzhovCard
};
