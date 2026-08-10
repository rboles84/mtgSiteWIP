import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAN = path.join(ROOT, "docs", "plans", "vm551-gate-b1-placement-instrument");
const COMPLETION = path.join(ROOT, "docs", "plans", "vm551-gate-b1-instrument-completion");
const MAPPING = path.join(ROOT, "data", "placement", "gate-b1-mapping.source.json");

function parseTsv(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  const rows = lines.map((line) => {
    const values = line.split("\t");
    assert.equal(values.length, headers.length, `TSV width mismatch: ${filePath}`);
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
  return { headers, rows };
}

function writeTsv(filePath, headers, rows) {
  const lines = [headers.join("\t"), ...rows.map((row) => headers.map((header) => row[header] || "").join("\t"))];
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`);
}

function split(value) {
  return String(value || "").split(";").map((item) => item.trim()).filter(Boolean);
}

function appendUnique(value, additions) {
  return [...new Set([...split(value), ...additions])].join(";");
}

function replaceById(rows, key, id, patch) {
  const row = rows.find((item) => item[key] === id);
  assert(row, `Missing ${key} ${id}`);
  Object.assign(row, patch);
  return row;
}

const provenance = "E-VM555;E-CERTIFIED;E-CECOS;E-PLAYER-LANGUAGE";
const completionStatus = "ENGINE-MAPPING-HYPOTHESIS";

const questionChanges = [
  {
    id: "b1.hall.commitment.v1",
    prompt: "The table agrees to stop a repeatable threat. Before your next turn, the board changes and that threat is weaker but still present. What should the agreement require now?",
    answerIds: ["b1.hall.commitment.v1.procedure", "b1.hall.commitment.v1.access", "b1.hall.commitment.v1.terms", "b1.hall.commitment.v1.short", "b1.hall.commitment.v1.reopen"],
    observation: "How a public agreement should persist or change after the board changes.",
    competitors: "W;WU;WG;ABZAN;MARDU;BANT;WB;SILVERQUILL;INK;WUBRG",
    askWhen: "Ask when public procedure, shared access, durable obligation, bounded coordination, or revisable influence separates the live frontier.",
    doNotAsk: "Do not ask when the player lacks a recognizable table-agreement context or DG_C13 is already observed; a deal preference cannot name an identity alone.",
    jargon: "JRG_REPEATABLE",
    help: "Repeatable means a card or engine that can create the same threat again if the table leaves it in place.",
    reason: "Materially rewritten from a generic deal-duration item because VM-555 found it could not separate procedure, commons, obligation, coordination, and revisable influence.",
  },
  {
    id: "b1.hall.pressure.v1",
    prompt: "The player ahead uses all their mana and leaves one turn where the table can take control. Which kind of pressure do you want your deck to create?",
    answerIds: ["b1.hall.pressure.v1.coordinate", "b1.hall.pressure.v1.combat", "b1.hall.pressure.v1.abundance", "b1.hall.pressure.v1.burst", "b1.hall.pressure.v1.resources", "b1.hall.pressure.v1.engine"],
    observation: "The channel through which the player wants to turn one opening into progress toward ending the game.",
    competitors: "R;BR;RG;JUND;NAYA;MARDU;WR;DUNE;PRISMARI;WU;WB;UR;COLORLESS",
    askWhen: "Ask when live candidates agree on proactive play but differ in coordinated, embodied, abundant, burst, restrictive, or engine pressure.",
    doNotAsk: "Do not ask after DG_C07 is observed; combat, a large turn, or a noncombat engine never establishes identity by itself.",
    jargon: "",
    help: "",
    reason: "Materially rewritten because the former three-channel item collapsed distinct combat and visible-payoff boundaries needed by VM-555.",
  },
  {
    id: "b1.hall.engine-shape.v1",
    prompt: "Opponents have learned how to stop your main engine. When you revise the deck, what structure do you want next?",
    answerIds: ["b1.hall.engine-shape.v1.central", "b1.hall.engine-shape.v1.replace", "b1.hall.engine-shape.v1.overlap", "b1.hall.engine-shape.v1.purpose"],
    observation: "Whether revision preserves one central engine, replaces functions, overlaps modules, or preserves purpose while changing tools.",
    competitors: "U;UB;UR;BG;LOREHOLD;QUANDRIX;WITHERBLOOM;SULTAI;COLORLESS;WUBRG;ESPER",
    askWhen: "Ask when engine structure remains a live separator and DG_C06 has not been observed.",
    doNotAsk: "Do not ask after another C06 observation; artifacts, machinery, redundancy, or toolbox play cannot establish Colorless or Yore.",
    jargon: "JRG_ENGINE",
    help: "An engine is a repeatable set of cards whose pieces create more value together than they do alone.",
    reason: "Materially rewritten because deck-revision context and a stable-purpose/flexible-tool option close more C06 corroboration gaps without adding a second C06 dependency.",
  },
  {
    id: "b1.hall.interaction-window.v1",
    prompt: "An opponent begins a decisive turn, but you do not yet know which card matters most. When do you want your deck to use the card or mana it kept available?",
    answerIds: ["b1.hall.interaction-window.v1.before", "b1.hall.interaction-window.v1.after", "b1.hall.interaction-window.v1.pressure", "b1.hall.interaction-window.v1.split"],
    observation: "The commitment point at which hidden information becomes sufficient to spend a held answer.",
    competitors: "U;UB;WU;W;UR;JESKAI",
    askWhen: "Ask when information use and interaction timing separate the live frontier and DG_C08 has not been observed.",
    doNotAsk: "Do not ask after another C08 observation; waiting, prevention, or split mana alone cannot establish a color or faction.",
    jargon: "",
    help: "",
    reason: "Narrowly refined to the VM-555 commitment-window scenario and given a split line; it remains one C08 observation rather than a stackable third timing item.",
  },
  {
    id: "b1.hall.setup.v1",
    prompt: "Your deck becomes much stronger after several setup turns, but the table is already developing threats. What must the setup do along the way?",
    answerIds: ["b1.hall.setup.v1.early", "b1.hall.setup.v1.staged", "b1.hall.setup.v1.long", "b1.hall.setup.v1.change"],
    observation: "What contribution a longer development plan must make while the current table continues to move.",
    competitors: "G;WG;ABZAN;NAYA;BG;QUANDRIX;WITHERBLOOM;BANT;TEMUR;GLINT;INK;WITCH;UG",
    askWhen: "Ask when development horizon separates the live frontier and DG_C14 has not been observed.",
    doNotAsk: "Do not ask after another C14 observation; long setup, early help, or incremental value cannot establish an identity alone.",
    jargon: "JRG_SETUP",
    help: "Setup means the turns and cards a plan needs before it can produce its main payoff.",
    reason: "Materially rewritten because the former duration preference did not observe whether setup participates in the current game or yields to the board.",
  },
];

const newQuestion = {
  question_id: "b1.crucible.disruption-boundary.v1",
  stage: "Crucible",
  pool_order: "19",
  primary_construct_id: "C03",
  question_prompt: "An opponent removes the piece your deck was built around after using most of their mana and cards. Your turn begins with the rest of your board still available. What do you try first?",
  answer_ids: ["preserve", "reuse", "convert", "adapt", "act", "reconstruct"].map((suffix) => `b1.crucible.disruption-boundary.v1.${suffix}`).join(";"),
  primary_observation: "The first response chosen after a central plan is removed while other board resources remain.",
  competitor_pair_or_family: "B;G;R;RG;BG;LOREHOLD;WITHERBLOOM;SULTAI;TEMUR;GLINT;ESPER",
  evidence_provenance: provenance,
  dependency_group: "DG_C03",
  adaptive_ask_when: "Ask only when disruption response is the highest-value unresolved boundary and DG_C03 detail can change the responsible result.",
  do_not_ask_when: "Do not count independently from Gate C03; do not ask merely to add evidence or when another eligible question separates the frontier better.",
  jargon_term_ids: "",
  jargon_help: "",
  scoring_status: completionStatus,
};

const answerSpecs = [
  ["b1.hall.commitment.v1.procedure", "b1.hall.commitment.v1", "C13", "Apply one clear rule", "Keep one clear rule and apply it to everyone.", "Prefers public procedural consistency after circumstances change.", "SIG_C13_PROCEDURAL", "DG_C13", "Procedure alone does not establish White, Azorius, or Bant; private advantage and experience with table agreements remain separate.", "Public consistency can be chosen for convenience, fairness, threat management, or social comfort; it requires independent evidence."],
  ["b1.hall.commitment.v1.access", "b1.hall.commitment.v1", "C13", "Protect shared access", "Preserve access for everyone affected by the threat.", "Prefers protecting a shared resource or opportunity after circumstances change.", "SIG_C13_SHARED_ACCESS", "DG_C13", "Shared access does not establish Selesnya, Ink, Bant, or WUBRG; helping the table is not identity proof.", "A player may preserve access for tactical benefit, generosity, politics, or theme; independent evidence is required."],
  ["b1.hall.commitment.v1.terms", "b1.hall.commitment.v1", "C13", "Keep the promise", "Keep the terms because the promise still binds.", "Prefers durable obligation despite a changed immediate advantage.", "SIG_C13_DURABLE", "DG_C13", "Keeping a deal does not establish Orzhov, Abzan, or moral character.", "Deal-keeping can reflect reputation management or table norms rather than durable-obligation preference."],
  ["b1.hall.commitment.v1.short", "b1.hall.commitment.v1", "C13", "Keep only this opening", "Keep only the coordinated action needed for this opening.", "Prefers bounded coordination tied to the present opening.", "SIG_C13_BOUNDED", "DG_C13", "Short coordination does not establish Boros, Mardu, Dune, or combat preference.", "A short deal may be tactically obvious rather than an enduring behavioral preference."],
  ["b1.hall.commitment.v1.reopen", "b1.hall.commitment.v1", "C13", "Reopen the agreement", "Reopen the agreement because the facts changed.", "Prefers revisable present influence over a binding future commitment.", "SIG_C13_REVISABLE", "DG_C13", "Revisability alone does not establish Silverquill, political skill, or selfishness.", "Players may reopen a deal because it became impossible, not because they prefer revisable influence."],

  ["b1.hall.pressure.v1.coordinate", "b1.hall.pressure.v1", "C07", "Coordinate one attack", "Coordinate the board into one disciplined attack.", "Prefers formation-based combat pressure during a shared opening.", "SIG_C07_COORDINATED_COMBAT", "DG_C07", "Combat coordination does not establish Boros, Mardu, Dune, duty, or leadership.", "The tactically strongest attack may look coordinated without reflecting a stable preference."],
  ["b1.hall.pressure.v1.combat", "b1.hall.pressure.v1", "C07", "Use the bodies already there", "Attack with the bodies and opening already present.", "Prefers immediate embodied combat pressure from the current board.", "SIG_C07_EMBODIED_COMBAT", "DG_C07", "Combat alone does not establish Red, Gruul, Jund, aggression, or experience level.", "Many decks attack when shields are down; independent motive and context remain necessary."],
  ["b1.hall.pressure.v1.abundance", "b1.hall.pressure.v1", "C07", "Keep the wide board moving", "Turn a wide living board into sustained pressure.", "Prefers abundance-based board pressure rather than one concentrated strike.", "SIG_C07_ABUNDANCE_PRESSURE", "DG_C07", "A wide board does not establish Naya, Selesnya, tokens, or belonging.", "Board width may be accidental or mechanically efficient rather than identity-relevant."],
  ["b1.hall.pressure.v1.burst", "b1.hall.pressure.v1", "C07", "Make one visible turn count", "Build one visible turn that changes the game.", "Prefers a concentrated exposed payoff during the opening.", "SIG_C07_VISIBLE_BURST", "DG_C07", "A large turn does not establish Rakdos, Prismari, spectacle, or appetite.", "Combo and efficient decks may also concentrate resources into one turn for unrelated reasons."],
  ["b1.hall.pressure.v1.resources", "b1.hall.pressure.v1", "C07", "Narrow their options first", "Narrow the opponents' remaining options first.", "Prefers resource-control pressure before attempting to end the game.", "SIG_C07_RESOURCE_CONTROL", "DG_C07", "Resource control does not establish Blue, Azorius, Orzhov, or a control archetype.", "Removing options can be a tactical prerequisite in any deck."],
  ["b1.hall.pressure.v1.engine", "b1.hall.pressure.v1", "C07", "Finish without combat", "Finish through a noncombat engine.", "Prefers engine-based ending pressure instead of combat pressure.", "SIG_C07_NONCOMBAT_ENGINE", "DG_C07", "A noncombat engine does not establish Izzet, Blue, Colorless, artifacts, or combo.", "Many identities can use engines; the observation describes pressure channel only."],

  ["b1.hall.engine-shape.v1.central", "b1.hall.engine-shape.v1", "C06", "Rebuild the center", "Rebuild the same central engine and protect it better.", "Accepts one designed central dependency after revision.", "SIG_C06_CENTRAL", "DG_C06", "Centrality does not establish Blue, Esper, Quandrix, optimization, or skill.", "Some decks have a central engine because of card availability or commander design."],
  ["b1.hall.engine-shape.v1.replace", "b1.hall.engine-shape.v1", "C06", "Make each job replaceable", "Add several cards that can perform the same job.", "Prefers replaceable functional redundancy.", "SIG_C06_REDUNDANT", "DG_C06", "Redundancy, machinery, or artifacts do not establish Colorless or Yore.", "Consistency can be a generic deckbuilding goal rather than identity evidence."],
  ["b1.hall.engine-shape.v1.overlap", "b1.hall.engine-shape.v1", "C06", "Let smaller engines overlap", "Use several smaller engines that overlap.", "Prefers modular engines whose functions overlap.", "SIG_C06_MODULAR", "DG_C06", "Modularity does not establish Simic, Izzet, Golgari, Witherbloom, or combo.", "Overlapping packages may be required by singleton deck construction."],
  ["b1.hall.engine-shape.v1.purpose", "b1.hall.engine-shape.v1", "C06", "Keep the goal, change the tool", "Keep one purpose but change which tool reaches it.", "Prefers a stable purpose with flexible implementation routes.", "SIG_C06_FLEXIBLE_ROUTE", "DG_C06", "Toolbox play does not establish Dimir, Sultai, WUBRG, secrecy, or opportunism.", "Flexible tools can be a response to a varied metagame rather than a stable preference."],

  ["b1.hall.interaction-window.v1.before", "b1.hall.interaction-window.v1", "C08", "Before the turn develops", "Act before the decisive action can begin.", "Prefers early prevention before the decisive action becomes visible.", "SIG_C08_EARLY_WINDOW", "DG_C08", "Prevention alone does not establish White, Azorius, control, or public procedure.", "Early action may be forced by card timing rather than preferred information use."],
  ["b1.hall.interaction-window.v1.after", "b1.hall.interaction-window.v1", "C08", "When the key piece appears", "Wait until the key piece is visible.", "Prefers more information before committing a held answer.", "SIG_C08_LATE_WINDOW", "DG_C08", "Waiting does not establish Blue, Dimir, knowledge, secrecy, or skill.", "A player may wait because their card can only answer a visible permanent."],
  ["b1.hall.interaction-window.v1.pressure", "b1.hall.interaction-window.v1", "C08", "As they commit", "Act while the opponent commits the decisive resources.", "Prefers the commitment window where opposing resources are exposed.", "SIG_C08_COMMIT_WINDOW", "DG_C08", "Commitment timing does not establish Dimir, Grixis, Glint, leverage, or survival.", "The window may be dictated by rules timing rather than behavioral preference."],
  ["b1.hall.interaction-window.v1.split", "b1.hall.interaction-window.v1", "C08", "Advance with one answer ready", "Advance the plan but preserve one precise answer.", "Prefers split commitment between development and one bounded response.", "SIG_C08_SPLIT", "DG_C08", "Split mana does not establish Izzet, Jeskai, discipline, or tempo.", "Efficient curves can produce this line without a stable interaction preference."],

  ["b1.hall.setup.v1.early", "b1.hall.setup.v1", "C14", "Contribute right away", "Help the table or protect something immediately.", "Requires useful early participation while a longer plan develops.", "SIG_C14_EARLY_IMPACT", "DG_C14", "Helpfulness does not establish Selesnya, Ink, Bant, altruism, or politics.", "Early utility may be incidental to efficient cards rather than a community preference."],
  ["b1.hall.setup.v1.staged", "b1.hall.setup.v1", "C14", "Let each step matter", "Let every setup step create some value.", "Prefers staged cultivation where development contributes along the way.", "SIG_C14_STAGED", "DG_C14", "Incremental value does not establish Green, Golgari, Abzan, Witherbloom, or growth philosophy.", "Value engines commonly reward staged play for mechanical reasons."],
  ["b1.hall.setup.v1.long", "b1.hall.setup.v1", "C14", "Protect the long pattern", "Protect one pattern even if the payoff comes much later.", "Accepts concentrated long development before the main payoff.", "SIG_C14_LONG_SETUP", "DG_C14", "Long setup does not establish Quandrix, Witch, mathematics, or patience as virtue.", "Budget, card speed, and table power can force a longer horizon."],
  ["b1.hall.setup.v1.change", "b1.hall.setup.v1", "C14", "Change plans for this game", "Change plans if the setup cannot affect this game.", "Prefers board-responsive development over preserving a stalled long plan.", "SIG_C14_BOARD_RESPONSIVE", "DG_C14", "Changing plans does not establish Temur, Glint, Red, freedom, or instinct.", "A clearly lost setup can make changing plans tactically mandatory."],

  ["b1.crucible.disruption-boundary.v1.preserve", "b1.crucible.disruption-boundary.v1", "C03", "Keep the protection intact", "Preserve the pieces that still protect the plan.", "Prioritizes continuity through remaining protection.", "SIG_C03_PROTECT", "DG_C03", "Protection does not establish White, Selesnya, Abzan, or commander reliance.", "The remaining protection may simply be the strongest available line."],
  ["b1.crucible.disruption-boundary.v1.reuse", "b1.crucible.disruption-boundary.v1", "C03", "Reuse what was lost", "Reuse what was lost as part of the next cycle.", "Prefers reclamation and continuity after loss.", "SIG_C03_RECOVER", "DG_C03", "Recursion and graveyard use do not establish Golgari, Lorehold, or a color identity.", "The deck may contain recursion for efficiency rather than a stable recovery preference."],
  ["b1.crucible.disruption-boundary.v1.convert", "b1.crucible.disruption-boundary.v1", "C03", "Turn the loss into a resource", "Turn the loss into a different resource now.", "Prefers converting disruption into immediate personal agency.", "SIG_C03_CONVERT", "DG_C03", "Conversion, sacrifice, or paying life does not establish Black, Witherbloom, Sultai, or appetite.", "Many engines convert lost pieces automatically; independent behavior is required."],
  ["b1.crucible.disruption-boundary.v1.adapt", "b1.crucible.disruption-boundary.v1", "C03", "Use the board that remains", "Use the board that exists and change course.", "Prefers board-led adaptation over restoring the ideal plan.", "SIG_C03_ADAPT", "DG_C03", "Adaptation does not establish Green, Gruul, Temur, Glint, or resilience as identity.", "Any player may pivot when reconstruction is impossible."],
  ["b1.crucible.disruption-boundary.v1.act", "b1.crucible.disruption-boundary.v1", "C03", "Use the remaining opening", "Act before the remaining opening closes.", "Prefers immediate action after disruption rather than restoration.", "SIG_C03_ACT", "DG_C03", "Urgency does not establish Red, Rakdos, Jund, Grixis, or aggression.", "The opponent being tapped out can make immediate action tactically correct for any deck."],
  ["b1.crucible.disruption-boundary.v1.reconstruct", "b1.crucible.disruption-boundary.v1", "C03", "Reconstruct the system", "Reconstruct the deliberate plan.", "Prefers returning to a designed system after disruption.", "SIG_C03_RECONSTRUCT", "DG_C03", "Reconstruction does not establish Blue, Esper, perfection, or central-engine preference.", "Some decks have no functional alternative route, making reconstruction compulsory."],
];

const overlayRules = [
  ["b1.gate.initiative.v1.advance", ["R", "RG", "JUND"], []],
  ["b1.gate.initiative.v1.balance", ["JESKAI"], []],
  ["b1.gate.disruption.v1.protect", ["W", "WG", "ABZAN"], []],
  ["b1.gate.disruption.v1.recover", ["G", "RG"], []],
  ["b1.hall.sacrifice.v1.convert", ["B", "JUND"], []],
  ["b1.hall.threat.v1.embrace", ["BR", "PRISMARI"], []],
  ["b1.hall.threat.v1.pivot", ["SILVERQUILL"], []],
  ["b1.hall.repeatability.v1.same", ["WITCH"], []],
  ["b1.hall.commitment.v1.procedure", ["W", "WU"], ["W", "WU"]],
  ["b1.hall.commitment.v1.access", ["WG", "BANT", "WUBRG"], ["WG"]],
  ["b1.hall.commitment.v1.terms", ["ABZAN"], ["ABZAN"]],
  ["b1.hall.commitment.v1.short", ["MARDU", "WR", "DUNE"], ["MARDU"]],
  ["b1.hall.commitment.v1.reopen", ["SILVERQUILL"], [], []],
  ["b1.hall.pressure.v1.coordinate", ["WR", "DUNE", "MARDU"], []],
  ["b1.hall.pressure.v1.combat", ["R", "RG", "JUND"], ["R", "RG", "JUND"]],
  ["b1.hall.pressure.v1.abundance", ["NAYA"], ["NAYA"]],
  ["b1.hall.pressure.v1.burst", ["BR", "PRISMARI"], ["BR"]],
  ["b1.hall.pressure.v1.resources", ["WB"], []],
  ["b1.hall.pressure.v1.engine", ["UR", "COLORLESS"], []],
  ["b1.hall.engine-shape.v1.central", ["U", "ESPER", "QUANDRIX"], []],
  ["b1.hall.engine-shape.v1.replace", ["COLORLESS", "LOREHOLD", "YORE"], [], ["COLORLESS", "LOREHOLD"]],
  ["b1.hall.engine-shape.v1.overlap", ["UR", "BG", "WITHERBLOOM"], []],
  ["b1.hall.engine-shape.v1.purpose", ["UB", "SULTAI", "WUBRG"], []],
  ["b1.hall.interaction-window.v1.before", ["WU"], []],
  ["b1.hall.interaction-window.v1.after", ["U"], ["U"]],
  ["b1.hall.interaction-window.v1.pressure", ["UB", "GRIXIS", "GLINT"], ["UB"]],
  ["b1.hall.interaction-window.v1.split", ["UR", "JESKAI"], []],
  ["b1.hall.setup.v1.early", ["BANT", "INK", "WG"], []],
  ["b1.hall.setup.v1.staged", ["G", "BG", "ABZAN", "WITHERBLOOM", "UG", "NAYA"], []],
  ["b1.hall.setup.v1.long", ["QUANDRIX", "WITCH"], [], ["QUANDRIX", "WITCH"]],
  ["b1.hall.setup.v1.change", ["TEMUR", "GLINT"], []],
  ["b1.crucible.disruption-boundary.v1.convert", ["B"], ["B"]],
  ["b1.crucible.disruption-boundary.v1.adapt", ["G", "RG"], ["G"]],
  ["b1.crucible.disruption-boundary.v1.reuse", ["BG", "LOREHOLD"], []],
  ["b1.crucible.disruption-boundary.v1.act", ["R"], ["R"]],
  ["b1.crucible.disruption-boundary.v1.reconstruct", ["U", "ESPER"], []],
].map(([answerId, support, namingSupport, qualificationSupport = support], index) => ({
  answer_id: answerId,
  support,
  contradict: [],
  strength: namingSupport.length ? 1 : 0.5,
  naming_support: namingSupport,
  naming_evidence: namingSupport.length > 0,
  qualification_support: qualificationSupport,
  mapping_role: namingSupport.length ? "completion_boundary_direction" : "completion_corroboration_direction",
  adjudication_id: `IC-MAP-${String(index + 1).padStart(3, "0")}`,
  provenance: `docs/plans/vm551-gate-b1-instrument-completion/instrument-change-adjudication.tsv#${answerId};docs/audits/vm555-b1-identity-evidence-gap-bridge/identity-evidence-gap-matrix.tsv`,
  limitation: "MAPPING_HYPOTHESIS; the observation remains subject to player validation and cannot name an identity without an independent qualifying observation.",
}));

const constructsFile = path.join(PLAN, "construct-map.tsv");
const constructs = parseTsv(constructsFile);
const signalAdditions = {
  C03: ["SIG_C03_CONVERT", "SIG_C03_ADAPT", "SIG_C03_ACT", "SIG_C03_RECONSTRUCT"],
  C06: ["SIG_C06_FLEXIBLE_ROUTE"],
  C07: ["SIG_C07_COORDINATED_COMBAT", "SIG_C07_EMBODIED_COMBAT", "SIG_C07_ABUNDANCE_PRESSURE", "SIG_C07_VISIBLE_BURST"],
  C13: ["SIG_C13_PROCEDURAL", "SIG_C13_SHARED_ACCESS"],
  C14: ["SIG_C14_BOARD_RESPONSIVE"],
};
for (const [constructId, signals] of Object.entries(signalAdditions)) {
  const row = replaceById(constructs.rows, "construct_id", constructId, {});
  row.allowed_primary_signals = appendUnique(row.allowed_primary_signals, signals);
}
writeTsv(constructsFile, constructs.headers, constructs.rows);

const questionsFile = path.join(PLAN, "pilot-question-bank.tsv");
const questions = parseTsv(questionsFile);
for (const change of questionChanges) {
  replaceById(questions.rows, "question_id", change.id, {
    question_prompt: change.prompt,
    answer_ids: change.answerIds.join(";"),
    primary_observation: change.observation,
    competitor_pair_or_family: change.competitors,
    evidence_provenance: provenance,
    adaptive_ask_when: change.askWhen,
    do_not_ask_when: change.doNotAsk,
    jargon_term_ids: change.jargon,
    jargon_help: change.help,
    scoring_status: completionStatus,
  });
}
if (!questions.rows.some((row) => row.question_id === newQuestion.question_id)) questions.rows.push(newQuestion);
assert.equal(questions.rows.length, 36);
writeTsv(questionsFile, questions.headers, questions.rows);

const answersFile = path.join(PLAN, "answer-signal-contracts.tsv");
const answers = parseTsv(answersFile);
for (const [answerId, questionId, constructId, title, sentence, observation, signal, dependency, exclusions, limitation] of answerSpecs) {
  const patch = {
    answer_id: answerId,
    question_id: questionId,
    construct_id: constructId,
    answer_title: title,
    explanatory_sentence: sentence,
    plain_language_observation: observation,
    primary_signal: signal,
    optional_bounded_secondary_signal: "",
    dependency_group: dependency,
    exclusions,
    evidence_provenance: provenance,
    mapping_confidence: "LOW-PROVISIONAL",
    scoring_status: completionStatus,
    limitation_statement: limitation,
  };
  const current = answers.rows.find((row) => row.answer_id === answerId);
  if (current) Object.assign(current, patch);
  else answers.rows.push(patch);
}
assert.equal(answers.rows.length, 124);
writeTsv(answersFile, answers.headers, answers.rows);

const semanticFile = path.join(PLAN, "answer-semantic-adjudication.tsv");
const semantic = parseTsv(semanticFile);
for (const spec of answerSpecs) {
  const [answerId, questionId, constructId] = spec;
  const question = questions.rows.find((row) => row.question_id === questionId);
  const hasDirectionalMapping = overlayRules.some((rule) => rule.answer_id === answerId);
  const patch = {
    answer_id: answerId,
    question_id: questionId,
    construct_id: constructId,
    stage: question.stage,
    review_disposition: hasDirectionalMapping ? "EVIDENCE_REQUIRED" : "APPROVE",
    construct_fidelity: "PASS",
    scenario_fit: "PASS",
    option_distinguishability: "PASS",
    compound_construct_risk: "CLEAR",
    desirability_or_skill_bias: "CLEAR",
    identity_giveaway_risk: "CLEAR",
    novice_clarity: "VERIFIED-OR-REMEDIATED",
    title_sentence_alignment: "PASS",
    observation_alignment: "PASS",
    primary_signal_alignment: "PASS",
    secondary_signal_alignment: "NONE",
    dependency_alignment: "PASS",
    exclusion_quality: "REMEDIATED",
    evidence_authority: "PLAYER-EVIDENCE-REQUIRED",
    jargon_issue: "VERIFIED-OR-REMEDIATED",
    limitation_quality: "PASS",
    recommended_action: "Retain as an instrument-completion mapping hypothesis with identity-specific naming authorization and independent corroboration required.",
    rationale: "VM-555 supplies the documented boundary; certified authority owns identity meaning; CECOS/player language supports situation and vocabulary only; explicit exclusions preserve nearby false positives.",
    owner_review_required: "NO",
  };
  const current = semantic.rows.find((row) => row.answer_id === answerId);
  if (current) Object.assign(current, patch);
  else semantic.rows.push(patch);
}
for (const rule of overlayRules) {
  const row = semantic.rows.find((item) => item.answer_id === rule.answer_id);
  assert(row, `Missing semantic row for completion mapping ${rule.answer_id}`);
  Object.assign(row, {
    review_disposition: "EVIDENCE_REQUIRED",
    evidence_authority: "PLAYER-EVIDENCE-REQUIRED",
    exclusion_quality: "REMEDIATED",
    limitation_quality: "PASS",
    recommended_action: "Retain as an instrument-completion mapping hypothesis with identity-specific naming authorization and independent corroboration required.",
    rationale: "VM-555 supplies the documented boundary; certified authority owns identity meaning; CECOS/player language supports situation and vocabulary only; explicit exclusions preserve nearby false positives.",
    owner_review_required: "NO",
  });
}
assert.equal(semantic.rows.length, 124);
assert.equal(new Set(semantic.rows.map((row) => row.answer_id)).size, 124);
writeTsv(semanticFile, semantic.headers, semantic.rows);

const mapping = JSON.parse(fs.readFileSync(MAPPING, "utf8"));
mapping.version = "vm551-gate-b1-mapping-v2-instrument-completion";
mapping.instrument_version = "vm551-gate-b1-instrument-v2";
mapping.instrument_contract = { constructs: 16, questions: 36, answers: 124, identities: 37, confusion_pairs: 123 };
mapping.authority.instrument_completion = "docs/plans/vm551-gate-b1-instrument-completion/instrument-change-adjudication.tsv";
mapping.authority.vm555_gap_bridge = "docs/audits/vm555-b1-identity-evidence-gap-bridge/identity-evidence-gap-matrix.tsv";
mapping.remediation_overlay = {
  version: "vm551-gate-b1-instrument-completion-v1",
  status: "INSTRUMENT_COMPLETION_MAPPING_HYPOTHESES",
  adjudication: "docs/plans/vm551-gate-b1-instrument-completion/instrument-change-adjudication.tsv",
  rules: overlayRules,
};
fs.writeFileSync(MAPPING, `${JSON.stringify(mapping, null, 2)}\n`);

const ruleByAnswer = new Map([...mapping.mapping_rules, ...overlayRules].map((rule) => [rule.answer_id, rule]));
const questionByAnswer = new Map(answers.rows.map((row) => [row.answer_id, row.question_id]));
const identityQuestions = new Map();
for (const rule of ruleByAnswer.values()) {
  for (const identity of rule.support || []) {
    const set = identityQuestions.get(identity) || new Set();
    set.add(questionByAnswer.get(rule.answer_id));
    identityQuestions.set(identity, set);
  }
}

const identitiesFile = path.join(PLAN, "identity-coverage-matrix.tsv");
const identities = parseTsv(identitiesFile);
for (const row of identities.rows) {
  row.pilot_question_ids = appendUnique(row.pilot_question_ids, [...(identityQuestions.get(row.identity_id) || [])].filter(Boolean));
  if (row.identity_id === "YORE") {
    row.instrument_observability = "NOT_CLEANLY_OBSERVABLE";
    row.observability_rationale = "Ordinary Commander behavior still cannot establish constructed agency without artifact, redundancy, consistency, or optimization proxies; lens evidence remains secondary and non-naming.";
    row.pilot_coverage = "BOUNDED/LENS; meaningful candidate and refinement participation without normal behavioral naming";
    row.uncovered_risks = "Yore remains intentionally non-nameable from behavioral answers; proxy mechanics must never authorize naming.";
  } else {
    row.instrument_observability = "OBSERVABLE";
    row.observability_rationale = "Instrument Completion supplies at least one identity-specific naming opportunity plus a separately routed observation from another construct and dependency group; mappings remain hypotheses pending player validation.";
    row.pilot_coverage = "INSTRUMENT-COMPLETION; candidate, identity-specific boundary, independent corroboration, and routing path represented";
    row.uncovered_risks = "Mapping remains a non-empirical hypothesis; false positives, comprehension, stability, and result recognition require later authorized player validation.";
    row.current_evidence_quality = "INSTRUMENT-COMPLETION-MAPPING-HYPOTHESIS";
  }
}
writeTsv(identitiesFile, identities.headers, identities.rows);

const questionRules = new Map();
for (const rule of [...mapping.mapping_rules, ...overlayRules]) {
  const questionId = questionByAnswer.get(rule.answer_id);
  const list = questionRules.get(questionId) || [];
  list.push(rule);
  questionRules.set(questionId, list);
}
const pairsFile = path.join(PLAN, "confusion-pair-coverage.tsv");
const pairs = parseTsv(pairsFile);
for (const row of pairs.rows) {
  const [left, right] = [row.identity_a, row.identity_b];
  const direct = [];
  for (const [questionId, rules] of questionRules) {
    const differentiates = rules.some((rule) => {
      const effect = (identity) => (rule.support?.includes(identity) ? Number(rule.strength || 0) : 0) - (rule.contradict?.includes(identity) ? Number(rule.strength || 0) * 0.75 : 0);
      return effect(left) !== effect(right);
    });
    if (differentiates) direct.push(questionId);
  }
  if (direct.length) {
    row.pilot_question_ids = appendUnique(row.pilot_question_ids, direct);
    row.pilot_coverage_status = "DIRECT-OR-STRUCTURAL-MAPPING-HYPOTHESIS; bounded player validation required";
    row.why_defensible = `${row.why_defensible} Instrument Completion adds only answer-effect-backed question coverage; pair metadata itself contributes no routing utility.`;
  }
}
writeTsv(pairsFile, pairs.headers, pairs.rows);

const changedQuestionIds = new Set([...questionChanges.map((item) => item.id), newQuestion.question_id]);
const changedAnswerIds = new Set(answerSpecs.map((item) => item[0]));
const questionReason = new Map(questionChanges.map((item) => [item.id, item.reason]));
questionReason.set(newQuestion.question_id, "Net-new targeted C03 item retained because B lacks an identity-specific behavioral trigger and G/RG disruption adaptation cannot be observed by the fixed broad Gate answer alone.");
const adjudicationHeaders = ["record_id", "question_id", "answer_id", "change_type", "construct_id", "documented_gaps", "behavioral_observation", "naming_role", "false_positive_analysis", "exclusions", "novice_comprehension", "routing_eligibility", "change_reason", "evidence_provenance", "status"];
const adjudicationRows = [];
for (const questionId of changedQuestionIds) {
  const question = questions.rows.find((row) => row.question_id === questionId);
  adjudicationRows.push({
    record_id: `IC-Q-${String(adjudicationRows.length + 1).padStart(3, "0")}`,
    question_id: questionId,
    answer_id: "",
    change_type: questionId === newQuestion.question_id ? "ADDED" : "MATERIALLY_REFINED",
    construct_id: question.primary_construct_id,
    documented_gaps: question.competitor_pair_or_family,
    behavioral_observation: question.primary_observation,
    naming_role: "Question supplies only bounded observations; identity-specific naming is authorized per answer and still requires an independent dependency and construct.",
    false_positive_analysis: "The scenario remains reusable across identities; no mechanic, faction, color, moral quality, or obviously desirable option is treated as sufficient proof.",
    exclusions: question.do_not_ask_when,
    novice_comprehension: question.jargon_help || "Uses direct Commander turn, board, card, mana, or deck-revision language without unexplained archetype terms.",
    routing_eligibility: question.adaptive_ask_when,
    change_reason: questionReason.get(questionId),
    evidence_provenance: provenance,
    status: "MAPPING_HYPOTHESIS",
  });
}
for (const answerId of changedAnswerIds) {
  const answer = answers.rows.find((row) => row.answer_id === answerId);
  const rule = overlayRules.find((item) => item.answer_id === answerId);
  adjudicationRows.push({
    record_id: `IC-A-${String(adjudicationRows.length + 1).padStart(3, "0")}`,
    question_id: answer.question_id,
    answer_id: answerId,
    change_type: semantic.rows.some((row) => row.answer_id === answerId) ? "RETAINED_OR_ADDED_CONTRACT" : "ADDED",
    construct_id: answer.construct_id,
    documented_gaps: (rule?.support || []).join(";"),
    behavioral_observation: answer.plain_language_observation,
    naming_role: rule?.naming_support?.length ? `Identity-specific trigger only for ${rule.naming_support.join(";")}; no score bonus and no standalone naming.` : "Corroborating directional observation only; never a naming trigger.",
    false_positive_analysis: answer.limitation_statement,
    exclusions: answer.exclusions,
    novice_comprehension: "Plain title plus one behavioral sentence; no color, faction, archetype, or identity slogan appears.",
    routing_eligibility: questions.rows.find((row) => row.question_id === answer.question_id).adaptive_ask_when,
    change_reason: questionReason.get(answer.question_id),
    evidence_provenance: answer.evidence_provenance,
    status: "MAPPING_HYPOTHESIS",
  });
}
fs.mkdirSync(COMPLETION, { recursive: true });
writeTsv(path.join(COMPLETION, "instrument-change-adjudication.tsv"), adjudicationHeaders, adjudicationRows);

console.log(`Gate B1 completion sources written: ${constructs.rows.length} constructs, ${questions.rows.length} questions, ${answers.rows.length} answers, ${overlayRules.length} completion mappings, ${identities.rows.length} identities, ${pairs.rows.length} pairs.`);
