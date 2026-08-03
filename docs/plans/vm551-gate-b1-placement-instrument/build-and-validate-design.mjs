import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../../..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const write = (p, value) => fs.writeFileSync(path.join(dir, p), value.replace(/\r\n/g, "\n"), "utf8");
const clean = (v) => String(v ?? "").replace(/\t|\r?\n/g, " ").trim();
const makeTsv = (heads, rows) => [heads.join("\t"), ...rows.map((r) => heads.map((h) => clean(r[h])).join("\t"))].join("\n") + "\n";

function csv(text) {
  const matrix = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field.replace(/\r$/, "")); matrix.push(row); row = []; field = ""; }
    else field += ch;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, "")); matrix.push(row); }
  const heads = matrix.shift();
  return matrix.filter((r) => r.some(Boolean)).map((r) => Object.fromEntries(heads.map((h, i) => [h, r[i] ?? ""])));
}

function list(value) {
  try { const x = JSON.parse(value || "[]"); return Array.isArray(x) ? x : []; }
  catch { return []; }
}

const evidence = {
  "E-AUDIT": "docs/audits/vm551-placement-system question/answer/signal/distinctiveness/sensitivity artifacts",
  "E-CECOS": "exact CECOS draft.4 object 947bf45bf6a191839b5fb4fa6c65980ed9d5737e",
  "E-PLAYER-COMMANDER": "docs/research/placementResearch/YT-how-to-find-the-right-commander-refined-player-evidence.md",
  "E-PLAYER-PACE": "docs/research/placementResearch/YT-new-new-commander-brackets-refined-player-evidence.md",
  "E-PLAYER-VARIANCE": "docs/research/placementResearch/YT-the-case-against-tutors-refined-player-evidence.md",
  "E-PLAYER-THREAT": "docs/research/placementResearch/YT-edhrecast-real-reason-commander-players-hate-combo-refined-player-evidence.md",
  "E-PLAYER-THEME": "docs/research/placementResearch/YT-crim-loans-me-his-casual-commander-deck-refined-player-evidence.md",
  "E-CERTIFIED": "data/raw-factions/* placement/source records plus committed source-readiness matrices",
  "E-VOICE": "docs/audits/2026-06-30-vox-mana-voice-audit.md and VM-551 voice/explanation audit"
};

const C = [
  ["C01","Initiative posture","Preference to advance a plan first or preserve resources to answer others.","Develop the main plan on an open turn versus wait with responses.","Aggression, skill, speed, or power.","all; mono; guild; shard/wedge","R/U; Grixis/Temur; Jeskai/Mardu","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Gate","Overlaps C08; same-turn cadence cannot count twice."],
  ["C02","Resource visibility","Preference for power visible on the battlefield or held in hand, mana, or other less visible zones.","End a turn with useful permanents versus cards and mana held back.","Deception, control, fairness, or actual threat.","all; Dimir; Grixis; visible-pressure families","U/UB; Glint/Grixis; Colorless/WUBRG","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Gate","Overlaps C08 and C11; visibility is not threat level."],
  ["C03","Disruption response","Preference to protect an established position, reduce exposure, or recover after broad disruption.","Prepare protection before a board wipe versus recovery afterward.","Resilience, interaction density, or high power.","all; White; Abzan; Bant; Boros; Lorehold","Boros/Lorehold; White/Bant; Abzan/Witch","E-PLAYER-PACE;E-PLAYER-COMMANDER;E-CECOS","Gate","Overlaps C05/C06; commander protection is not commander dependence."],
  ["C04","Advantage tempo","Preference for repeated small gains, cycles, or one concentrated payoff.","Draw or build a little each turn versus save for one major sequence.","Game length, ending mode, or power.","all; Red; Izzet; Prismari; engine families","Izzet/Prismari; Red/Jeskai; Witch/Yore","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Gate","Overlaps C14; setup length and payoff rhythm differ."],
  ["C05","Commander reliance","How much the deck should depend on its commander being available.","Commander as centerpiece versus role-player while the 99 still functions.","Commander affection, synergy, or strength.","all","Bant/Witch; mono/multicolor; commander-centric/resilient 99","E-PLAYER-COMMANDER;E-CECOS","Hall","Separate from C03 protection and C06 engine concentration."],
  ["C06","Engine concentration","Preference for one central engine, replaceable pieces, or overlapping small engines.","One permanent makes the plan work versus several interchangeable pieces.","Consistency, tutoring, complexity, or commander reliance.","all; Esper; Simic; Quandrix; Yore; Witch","Simic/Quandrix; Witch/Yore; Esper/Yore","E-PLAYER-COMMANDER;E-PLAYER-VARIANCE;E-CECOS","Hall","Overlaps C05/C09; shares a dependency group."],
  ["C07","Pressure channel","Preferred way to move the game toward an ending.","Combat damage, narrowed resources, or an assembled noncombat engine.","Power, morality, speed, or opponent enjoyment.","all; Boros; Gruul; Naya; Mardu; Dune","Boros/Lorehold; Naya/Dune; Temur/Mardu","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Hall","Overlaps C04/C11; ending mode is not payoff rhythm or visibility."],
  ["C08","Mana commitment and interaction window","Preference to commit mana on one's own turn or retain options during opponents' turns.","Spend mana developing now versus leave it for a key opposing action.","Personality, skill, interaction density, or Blue identity.","all; Blue; Azorius; Esper; Jeskai","U/WU; Jeskai/Esper; mono/multicolor","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Hall","C01 and both C08 items share a cap when they describe one cadence."],
  ["C09","Repeatability preference","Preference for familiar access to a central plan or greater game-to-game variance.","Use redundancy to see the same plan often versus accept different routes.","Tutor count, optimization, competence, or budget.","all; Izzet; Yore; Glint; WUBRG","Yore/Glint; Izzet/Prismari; mono/multicolor","E-PLAYER-VARIANCE;E-PLAYER-PACE;E-CECOS","Hall","Overlaps C06; repeatability is not engine centrality."],
  ["C10","Theme-efficiency tradeoff","Willingness to keep thematic expression when a more reliable role-player exists.","Keep an on-theme card versus replace it with a more efficient equivalent.","Low power, inexperience, budget, or aesthetic color preference.","all; colleges; Ink; Colorless; WUBRG","Prismari/Izzet; Ink/Witch; Colorless/WUBRG","E-PLAYER-THEME;E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CECOS","Hall","A secondary deckbuilding layer; never sufficient for identity."],
  ["C11","Threat posture","Preference to avoid early attention, adapt to attention, or embrace being the visible threat.","Keep a low profile versus present a board the table must answer.","Actual power, aggression, sociability, or willingness to win.","all; Rakdos; Grixis; Naya; Dune; Glint","Glint/Dune; Black/Glint; Red/Naya","E-PLAYER-THREAT;E-PLAYER-COMMANDER;E-CECOS","Hall","Overlaps C02; visible resources and accepted attention differ."],
  ["C12","Resource sacrifice","Willingness to spend permanents, life, cards, or position as fuel for later advantage.","Sacrifice a useful creature for cards versus preserve board presence.","Recklessness, Black identity, graveyard strategy, or risk tolerance.","all; Black; Golgari; Witherbloom; Sultai; Grixis","Golgari/Witherbloom; Black/Sultai; Grixis/Yore","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Hall","Separate voluntary conversion from disruption losses."],
  ["C13","Public commitment","How much spoken table agreements should bind later choices.","Keep stated deal terms versus make short or revisable commitments.","Honesty, morality, sociability, or political skill.","all; Azorius; Orzhov; Silverquill; Ink; Mardu","Orzhov/Silverquill; Dune/Ink; White/Azorius","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Hall","Table preference cannot independently place an identity."],
  ["C14","Setup tolerance","How long a deck may develop before meaningfully affecting the table.","Assemble for several turns versus require useful actions while setting up.","Desired game length, power, patience, or skill.","all; Green; Witch; Temur; Sultai","Temur/Green; Ink/Witch; Witch/Yore","E-PLAYER-PACE;E-PLAYER-COMMANDER;E-CECOS","Hall","Overlaps C04; setup duration is not payoff concentration."],
  ["C15","Deck breadth and constraint","Preference for a narrow deckbuilding constraint or a broad combined toolset.","One color or unusual restriction versus several color roles and answers.","Colorless, Five-Color, theme, budget, or power by itself.","all; mono/multicolor; four-color; Colorless; WUBRG","Colorless/WUBRG; mono/multicolor; four-color/WUBRG","E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CERTIFIED;E-CECOS","Hall/Crucible","A boundary observation only; overlaps C09/C10."]
].map(([construct_id,name,plain_definition,commander_example,does_not_mean,applicable_identity_families,likely_confusion_pairs,required_evidence,stage,dependency_overlap]) => ({construct_id,name,plain_definition,commander_example,does_not_mean,applicable_identity_families,likely_confusion_pairs,required_evidence,stage,dependency_overlap}));

const opt = (key,title,copy,observation,suffix,kind="directional") => ({key,title,copy,observation,suffix,kind});
const q = (id,stage,construct,prompt,scope,evidenceIds,askWhen,doNotAskWhen,glossary,options) => ({id,stage,construct,prompt,scope,evidenceIds,askWhen,doNotAskWhen,glossary,options});
const Q = [
  q("b1.gate.initiative.v1","Gate","C01","On a normal turn when no one is forcing your hand, what feels best?","all identities","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Always; Gate 1.","Never use alone for identity support.","",[
    opt("advance","Set the pace","Commit resources to my plan and make the table respond.","Prefers proactive development on an open turn.","PROACTIVE"),
    opt("balance","Advance with a safeguard","Develop my plan while keeping one practical answer.","Prefers mixed development with bounded response.","BALANCED"),
    opt("respond","Keep options open","Wait, watch the turn develop, and answer the important move.","Prefers reactive optionality on an open turn.","REACTIVE"),
    opt("unsure","I do not know yet","I have not played enough different decks to have a stable preference.","Reports insufficient experience for this construct.","UNKNOWN","unknown")]),
  q("b1.gate.visibility.v1","Gate","C02","As a turn cycle ends, which position usually feels more comfortable?","all identities","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Always; Gate 2.","Do not infer actual threat level.","Board means permanents currently on the battlefield.",[
    opt("board","A board people can see","Creatures or other permanents are already doing useful work.","Prefers visible battlefield resources.","VISIBLE"),
    opt("held","Resources in reserve","Cards in hand and mana remain available until their use is clear.","Prefers held or less visible resources.","HELD"),
    opt("split","Some of each","A useful board is present with at least one option held back.","Prefers a mixed visible/held position.","MIXED"),
    opt("depends","That depends on the deck","My decks require such different positions that I cannot name one preference.","Reports genuine deck-conditionality.","CONDITIONAL","conditional")]),
  q("b1.gate.disruption.v1","Gate","C03","A board wipe — a spell that clears many permanents — is likely next turn. What would you rather have prepared?","all identities","E-PLAYER-PACE;E-PLAYER-COMMANDER;E-CECOS","Always; Gate 3.","Do not treat the answer as proof the deck is resilient.","Board wipe is explained in the prompt.",[
    opt("protect","A way to keep the board","Protection or a response lets important pieces survive.","Prefers protection before broad disruption.","PROTECT"),
    opt("recover","A way to rebuild","The board can go if hand or graveyard resources restore it.","Prefers recovery after broad disruption.","RECOVER"),
    opt("limit","Less exposed in the first place","Commit fewer important pieces before the wipe.","Prefers reduced exposure to broad disruption.","LIMIT_EXPOSURE"),
    opt("depends","No usual answer","Preparation changes too much with the deck and known cards.","Reports scenario-conditionality.","CONDITIONAL","conditional")]),
  q("b1.gate.tempo.v1","Gate","C04","When your deck is working, how do you want the advantage to arrive?","all identities","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Always; Gate 4.","Do not infer game length or ending mode.","",[
    opt("small","A little every turn","Repeated small gains keep the deck moving.","Prefers incremental advantage.","INCREMENTAL"),
    opt("burst","One turn that changes the game","Prepare for a concentrated payoff.","Prefers a concentrated payoff turn.","CONCENTRATED"),
    opt("waves","Several distinct surges","Build, spend momentum, and build again.","Prefers cyclical advantage.","CYCLICAL"),
    opt("depends","No stable preference","Different decks make different rhythms enjoyable.","Reports no stable payoff-rhythm preference.","CONDITIONAL","conditional")]),
  q("b1.hall.commander-role.v1","Hall","C05","If your commander is removed twice, what should the rest of the deck still be able to do?","commander-centric versus resilient 99","E-PLAYER-COMMANDER;E-CECOS","Ask when commander reliance could separate remaining candidates.","Do not test commander affection or deck quality.","The 99 means the rest of the deck outside the command zone.",[
    opt("function","Run the main plan","The deck should execute its plan without the commander.","Prefers a resilient 99.","RESILIENT_99"),
    opt("partial","Keep playing, less efficiently","The commander improves the plan but its loss does not stop meaningful turns.","Prefers commander relevance without binary dependence.","ROLE_PLAYER"),
    opt("center","Protect and recast the centerpiece","The deck may change sharply when the commander is unavailable.","Accepts high commander dependence.","CENTERPIECE")]),
  q("b1.hall.engine-shape.v1","Hall","C06","When an important engine piece is removed, what structure do you want behind it?","engine families","E-PLAYER-COMMANDER;E-PLAYER-VARIANCE;E-CECOS","Ask when candidates differ in engine concentration.","Do not ask without showing the engine definition.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("replace","Another piece does the same job","Several cards can replace one another.","Prefers redundant replaceable pieces.","REDUNDANT"),
    opt("overlap","Several small engines overlap","Pieces remain useful alone and combine in different ways.","Prefers modular overlapping engines.","MODULAR"),
    opt("central","One engine is worth defending","A central piece can be found and protected.","Accepts concentrated engine dependency.","CENTRAL")]),
  q("b1.hall.pressure.v1","Hall","C07","Which progress most makes a game feel like your deck is doing its job?","combat, resource-control, and engine-ending families","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Ask when candidate families use different pressure channels.","Do not ask as a power or fairness question.","Resource constraint means limiting cards, mana, or available actions.",[
    opt("combat","Life totals are under pressure","Attacks and combat damage make opponents respond.","Prefers combat pressure.","COMBAT"),
    opt("resources","Options are getting narrower","Cards, mana, or board access become harder to use.","Prefers resource-control pressure.","RESOURCE_CONTROL"),
    opt("engine","A noncombat ending is assembling","The table can see an engine approaching an ending.","Prefers noncombat engine pressure.","NONCOMBAT_ENGINE")]),
  q("b1.hall.mana-window.v1","Hall","C08","When both development and interaction are available, where do you prefer to spend most of your mana?","Blue, Azorius, Esper, Jeskai, and cadence boundaries","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Ask when Gate initiative leaves families close.","Do not count independently from C01 when both describe one cadence.","Interaction means a spell or ability used to answer another player.",[
    opt("own","Develop on my turn","Use the mana now to improve board or engine.","Prefers own-turn commitment.","OWN_TURN"),
    opt("others","Hold mana for opponents' turns","Keep options available until the important action appears.","Prefers opponent-turn windows.","OPPONENT_TURN"),
    opt("split","Use some and keep some","Take a smaller development step with one answer available.","Prefers split commitment.","SPLIT")]),
  q("b1.hall.repeatability.v1","Hall","C09","Across several games with the same deck, what repetition do you want?","all identities","E-PLAYER-VARIANCE;E-PLAYER-PACE;E-CECOS","Ask when candidates differ in repeatability.","Do not reduce the answer to tutor count.","A tutor searches the deck; knowing the term is not required.",[
    opt("same","The central plan appears often","Redundancy makes the deck show its intended plan.","Prefers consistent access to a plan.","CONSISTENT"),
    opt("varied","The route changes each game","See the central plan less often in exchange for different games.","Prefers variance and novelty.","VARIANT"),
    opt("toolbox","The plan stays, the tool changes","Keep a dependable goal with different answers and subplans.","Prefers stable purpose with variable execution.","TOOLBOX")]),
  q("b1.hall.theme.v1","Hall","C10","A card fits your deck's theme, but another performs the same job more reliably. Which do you keep?","theme-first players; all identities","E-PLAYER-THEME;E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CECOS","Ask when attachment may explain contradictory behavior answers.","Do not use alone for identity support.","Theme means a chosen story, visual idea, creature type, or self-imposed concept.",[
    opt("theme","Keep the on-theme card","Expressing the deck's idea is part of the desired result.","Prefers thematic coherence over marginal reliability.","THEME_FIRST"),
    opt("reliable","Keep the reliable card","The slot should perform its job consistently.","Prefers role reliability over theme.","EFFICIENCY_FIRST"),
    opt("gap","It depends on the gap","Keep the theme until the cost becomes noticeable in games.","Uses a conditional theme-efficiency threshold.","CONDITIONAL","conditional")]),
  q("b1.hall.threat.v1","Hall","C11","If your board becomes the clearest threat, how do you want the deck to handle that attention?","visible-pressure and hidden-resource families","E-PLAYER-THREAT;E-PLAYER-COMMANDER;E-CECOS","Ask when visibility separates candidates.","Do not infer actual power or social conduct.","Threat means the position opponents believe they need to answer.",[
    opt("embrace","Make them answer it","Present a strong board and test whether the table can stop it.","Accepts visible threat status.","EMBRACE"),
    opt("avoid","Stay useful without leading","Make progress without becoming the first target.","Prefers lower visible threat.","AVOID"),
    opt("pivot","Change posture as attention shifts","Pressure when safe and pull back when the table turns.","Prefers adaptive threat posture.","ADAPTIVE")]),
  q("b1.hall.sacrifice.v1","Hall","C12","You can give up a useful permanent now for cards or another lasting resource. What feels natural?","resource-conversion families","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Ask when candidates differ in voluntary conversion.","Do not equate sacrifice with graveyard or Black identity.","Permanent means a card that stays on the battlefield.",[
    opt("convert","Spend it for the next advantage","Turn a current piece into a different resource.","Prefers voluntary resource conversion.","CONVERT"),
    opt("preserve","Keep the useful piece","Retain board presence unless the exchange is necessary.","Prefers resource preservation.","PRESERVE"),
    opt("renew","Spend it only if it returns","Make the exchange when the resource can be reused.","Prefers recyclable conversion.","RECYCLE")]),
  q("b1.hall.commitment.v1","Hall","C13","A table deal helps both sides now. How binding should it remain after the board changes?","politics and public-commitment families","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Ask only with relevant table-deal experience.","Record unknown when the player lacks that experience.","A table deal is a spoken agreement between players.",[
    opt("terms","Keep the stated terms","Commitments remain reliable until their stated endpoint.","Prefers durable public commitments.","DURABLE"),
    opt("reopen","Reopen when facts change","Agreements can be revised after material board changes.","Prefers revisable commitments.","REVISABLE"),
    opt("short","Make only short deals","Commitment ends with the immediate exchange.","Prefers bounded short commitments.","BOUNDED")]),
  q("b1.hall.setup.v1","Hall","C14","How long can your deck spend setting up before it needs to affect the table?","Witch, Temur, Sultai, and engine families","E-PLAYER-PACE;E-PLAYER-COMMANDER;E-CECOS","Ask when candidates differ in development horizon.","Do not interpret as game length or patience.","Affect means create pressure, interaction, protection, or visible advantage.",[
    opt("early","Useful while it builds","Early plays matter before the main engine is ready.","Prefers early utility.","EARLY_IMPACT"),
    opt("long","A long setup is acceptable","Several turns may mainly prepare the engine.","Accepts long setup.","LONG_SETUP"),
    opt("staged","Each setup step pays something","Build for several turns with intermediate benefits.","Prefers staged setup.","STAGED")]),
  q("b1.hall.breadth.v1","Hall","C15","When choosing a new Commander deck, which starting constraint is more appealing?","mono/multicolor; four-color; Colorless; WUBRG","E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CERTIFIED;E-CECOS","Ask when color-count families remain plausible after behavior evidence.","Never assign a color-count identity from this answer.","Color roles are broad tool families; no color-pie knowledge is required.",[
    opt("narrow","A tight restriction","One color, card type, or narrow rule makes choices sharper.","Prefers narrow constraints.","NARROW"),
    opt("broad","A wide set of tools","Several color roles answer more situations.","Prefers broad tool access.","BROAD"),
    opt("concept","Whichever serves the concept","The deck idea decides whether the pool is narrow or broad.","Reports concept-conditional breadth.","CONDITIONAL","conditional")]),
  q("b1.hall.interaction-window.v1","Hall","C08","An opponent begins the action most likely to decide the game. When should your interaction matter?","reactive/proactive boundary families","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Ask only if C08 remains unresolved.","Never count independently from b1.hall.mana-window.v1.","Interaction means an answer to another player's spell, ability, attack, or permanent.",[
    opt("before","Before the key piece resolves","Stop the enabling spell or ability before it takes effect.","Prefers an early interaction window.","EARLY_WINDOW"),
    opt("after","After the piece is visible","Answer the permanent or board once the threat is clear.","Prefers a later visible interaction window.","LATE_WINDOW"),
    opt("pressure","Make setup too costly","Use prior pressure to reduce the opponent's time.","Prefers preventive pressure.","PREVENTIVE")]),
  q("b1.crucible.ur.v1","Crucible","C04","Your spell-heavy deck has mana for a major turn. Which payoff sounds more like the plan?","UR vs PRISMARI","E-CERTIFIED;E-PLAYER-THEME;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when UR/PRISMARI remain close after two independent observations.","Do not ask if spell-heavy behavior was never observed.","Spell-heavy means instants or sorceries are central.",[
    opt("workshop","Improve the working engine","Several smaller spells test, copy, untap, or refine a repeatable system.","Prefers iterative spell-engine payoff.","INCREMENTAL"),
    opt("showcase","Build toward the showcase","One large spell or sequence creates the memorable turn.","Prefers concentrated expressive payoff.","CONCENTRATED"),
    opt("neither","Neither describes my deck","My spell plan does not fit either payoff.","Rejects the proposed UR-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.bg.v1","Crucible","C12","Several permanents reached your graveyard. What do you want that loss to enable?","BG vs WITHERBLOOM","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when BG/WITHERBLOOM remain close.","Do not ask if graveyard use was never observed.","Graveyard is the discard and destroyed-card zone.",[
    opt("reclaim","Use the same resources again","Cards return or keep contributing through a longer cycle.","Prefers reclamation and reuse.","RECYCLE"),
    opt("exchange","Turn the loss into a new resource","Life, tokens, cards, or draining effects come from the exchange.","Prefers immediate conversion.","CONVERT"),
    opt("neither","The graveyard is incidental","It is not a resource plan I seek.","Rejects the proposed BG-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.wr.v1","Crucible","C03","An opponent targets an important permanent. Which response would you rather have built toward?","WR vs LOREHOLD","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when WR/LOREHOLD remain close.","Do not ask from one Gate answer alone.","",[
    opt("intervene","Stop the removal now","Protection or an immediate answer keeps the piece in play.","Prefers immediate intervention.","PROTECT"),
    opt("recover","Recover value from the loss","Reuse the piece or turn its prior work into later value.","Prefers recovery from prior resources.","RECOVER"),
    opt("neither","That is not the distinction","My response depends on the card.","Rejects the proposed WR-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.ug.v1","Crucible","C06","Your battlefield is growing and one engine slot is open. What piece do you want?","UG vs QUANDRIX","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when UG/QUANDRIX remain close.","Do not ask without the engine definition.","Engine means a repeatable source of value.",[
    opt("adapt","A piece that changes creatures","Counters, tokens, or creature adaptation develop the board.","Prefers creature-centered engine growth.","MODULAR"),
    opt("scale","A piece that scales the pattern","Numbers, copies, or resources make a system expand.","Prefers abstract scaling.","CENTRAL"),
    opt("neither","My growth plan is different","Neither route is central.","Rejects the proposed UG-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.wb.v1","Crucible","C13","Before a risky table deal, what makes the agreement useful?","WB vs SILVERQUILL","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when WB/SILVERQUILL remain close.","Record unknown without relevant deal experience.","Table deal is defined in Hall.",[
    opt("terms","The terms carry a cost","Obligations, consequences, or exchange terms remain clear.","Prefers obligation-centered commitment.","DURABLE"),
    opt("influence","The deal changes the room","Public persuasion and target changes are the useful effect.","Prefers influence-centered commitment.","REVISABLE"),
    opt("neither","I avoid that kind of deal","I lack enough experience or preference.","Reports missing experience.","UNKNOWN","unknown")]),
  q("b1.crucible.bant.v1","Crucible","C05","One creature can carry much of your plan. What role should the rest of the deck play?","BANT vs WITCH/INK/W/adjacent three-color","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when BANT and a listed competitor remain close.","One creature cannot prove Bant.","",[
    opt("refine","Refine and protect the champion","The deck improves one central attacker or value piece.","Accepts a protected centerpiece.","CENTERPIECE"),
    opt("network","Keep the whole board functional","Several pieces remain useful if the leader is removed.","Prefers distributed board function.","RESILIENT_99"),
    opt("neither","No single creature should carry it","The scenario does not fit my plan.","Rejects the proposed Bant boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.grixis.v1","Crucible","C01","You are behind with one turn to change the game. Which first move fits?","GRIXIS vs B/YORE/GLINT/UB/BR","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Grixis and a listed competitor remain close.","Do not infer survival motive.","Interaction means an answer to another player's spell, ability, attack, or permanent.",[
    opt("calculate","Create a precise opening","Use information or interaction before exploiting the weakness.","Prefers calculated reactive opening.","REACTIVE"),
    opt("convert","Spend resources for leverage now","Trade cards, life, or board pieces to regain initiative.","Prefers proactive conversion.","PROACTIVE"),
    opt("neither","I need a different route","Neither opening describes my plan.","Rejects the proposed Grixis boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.sultai.v1","Crucible","C12","A creature, a card, and some life could each become fuel. How should the deck use them?","SULTAI vs B/GLINT/BG/U/WITCH","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Sultai and a listed competitor remain close.","Do not test ruthlessness or values.","",[
    opt("best","Convert whichever matters least","Choose among resource types as the board changes.","Prefers flexible cross-resource conversion.","CONVERT"),
    opt("cycle","Keep one cycle dependable","Center a repeatable loop on one known resource.","Prefers a narrower recyclable loop.","RECYCLE"),
    opt("neither","Conversion is not central","The scenario does not fit my main plan.","Rejects the proposed Sultai boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.temur.v1","Crucible","C01","The table changes and your planned sequence no longer fits. What should the deck do?","TEMUR vs G/INK/GLINT/PRISMARI/LOREHOLD","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Temur and a listed competitor remain close.","Do not equate improvisation with personality.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("adapt","Use the board that exists","Present creatures, mana, and cards form a new line.","Prefers immediate board-based adaptation.","PROACTIVE"),
    opt("reset","Rebuild the planned engine","Protect the core plan and restore it later.","Prefers returning to a deliberate plan.","REACTIVE"),
    opt("neither","My deck changes another way","Neither route describes the adaptation.","Rejects the proposed Temur boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.esper.v1","Crucible","C06","You have answered the immediate threat and can now turn control into advantage. What structure do you want?","ESPER vs U/YORE/JESKAI/W/WU","E-CERTIFIED;E-PLAYER-COMMANDER;E-PLAYER-THREAT;E-AUDIT;E-CECOS","Ask only when Esper and a listed competitor remain close after independent observations.","Do not treat control, artifacts, or one answer as Esper proof.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("designed","Build the designed engine","Interlocking permanents repeatedly turn information and resources into control and advantage.","Prefers a designed permanent-based engine.","CENTRAL"),
    opt("flexible","Keep answers interchangeable","Cards in hand and replaceable answers matter more than a fixed battlefield engine.","Prefers flexible replaceable control resources.","REDUNDANT"),
    opt("neither","My control plan is different","Neither a designed permanent engine nor interchangeable answers is central.","Rejects the proposed Esper boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.jeskai.v1","Crucible","C08","You can attack this turn, but an opponent may make a decisive play before your next turn. What timing fits?","JESKAI vs INK/LOREHOLD/W/U/NAYA/ESPER","E-CERTIFIED;E-PLAYER-PACE;E-PLAYER-THREAT;E-AUDIT;E-CECOS","Ask only when Jeskai and a listed competitor remain close after independent observations.","Do not treat combat, open mana, or one answer as Jeskai proof.","Interaction means an answer to another player's spell, ability, attack, or permanent.",[
    opt("sequence","Attack and keep one precise answer","Advance the combat plan while preserving a specific interaction window.","Prefers sequenced pressure with bounded interaction.","SPLIT"),
    opt("commit","Commit to present pressure","Use available mana now to make the attack matter as much as possible.","Prefers own-turn commitment in the contested window.","OWN_TURN"),
    opt("wait","Wait, learn, then act","Hold resources until the opponent reveals the decisive action.","Prefers opponent-turn optionality in the contested window.","OPPONENT_TURN")]),
  q("b1.crucible.yore-glint.v1","Crucible","C09","When a complex engine starts, how predictable should the next turn be?","YORE vs GLINT","E-CERTIFIED;E-PLAYER-VARIANCE;E-AUDIT;E-CECOS","Ask only when Yore/Glint remain close.","Do not infer missing-color philosophy.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("engineered","The sequence is repeatable","Known conversions and backups produce a dependable line.","Prefers engineered repeatability.","CONSISTENT"),
    opt("improvise","Available pieces redirect it","The engine finds a different route as resources change.","Prefers improvisational variance.","VARIANT"),
    opt("neither","Predictability is not the boundary","The distinction does not fit.","Rejects the proposed four-color boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.glint-dune.v1","Crucible","C11","When you become the threat, what shape should that pressure take?","GLINT vs DUNE","E-CERTIFIED;E-PLAYER-THREAT;E-AUDIT;E-CECOS","Ask only when Glint/Dune remain close.","Do not infer aggression or color absence.","",[
    opt("shifting","Several changing angles","Opponents cannot predict which resource becomes pressure.","Prefers shifting threat.","ADAPTIVE"),
    opt("front","A visible common front","The board presents organized forward pressure.","Prefers visible organized threat.","EMBRACE"),
    opt("neither","I avoid the main threat role","Neither pressure shape fits.","Rejects the proposed four-color boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.dune-ink.v1","Crucible","C13","Several players can benefit from your board. What public commitment do you prefer?","DUNE vs INK","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Dune/Ink remain close.","Do not infer altruism, force, or morality.","",[
    opt("front","Coordinate one immediate push","A short commitment turns shared pressure into action.","Prefers bounded action commitment.","BOUNDED"),
    opt("commons","Keep shared access available","Protect the benefit so several players can continue using it.","Prefers durable shared-resource commitment.","DURABLE"),
    opt("neither","I would not commit","The scenario does not match my preference.","Rejects the proposed four-color boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.ink-witch.v1","Crucible","C14","Your deck can help the table early or keep resources to compound later. Which timing fits?","INK vs WITCH","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Ink/Witch remain close.","Do not infer generosity or selfishness.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("share","Create useful access early","Resources or knowledge matter publicly while the game develops.","Prefers early outward impact.","EARLY_IMPACT"),
    opt("compound","Let resources accumulate","Keep building until the engine sustains larger turns.","Accepts long private setup.","LONG_SETUP"),
    opt("depends","Timing changes by table","I have no stable preference between these uses.","Reports conditionality.","UNKNOWN","conditional")]),
  q("b1.crucible.witch-yore.v1","Crucible","C06","A value engine has room for one more piece. What should it do?","WITCH vs YORE","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when Witch/Yore remain close.","Do not infer nature versus artifice.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("compound","Increase each later step","Repeated accumulation grows the engine over turns.","Prefers compounding growth.","MODULAR"),
    opt("convert","Turn one resource into another","Use a clear chain with known inputs and outputs.","Prefers engineered conversion.","REDUNDANT"),
    opt("neither","My engine differs","Neither accumulation nor conversion is central.","Rejects the proposed four-color boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.colorless-wubrg.v1","Crucible","C15","Which deckbuilding challenge would you rather solve for many games?","COLORLESS vs WUBRG","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only after three independent observations when both edge identities remain close.","Neither answer is sufficient for an edge identity.","Five-Color means all five colors in the commander's color identity.",[
    opt("constraint","Make a narrow pool do more","A hard restriction creates unusual solutions and tradeoffs.","Prefers narrow constraint.","NARROW"),
    opt("breadth","Make a broad pool cohere","Many color roles serve one integrated plan.","Prefers broad integration.","BROAD"),
    opt("neither","Color breadth is not my challenge","Neither reason drives my deck choice.","Rejects the edge distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.mono-multi.v1","Crucible","C15","Two decks support the same play pattern. One uses a single color; the other combines several. Which constraint appeals?","mono versus multicolor","E-CERTIFIED;E-PLAYER-COMMANDER;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when mono/multicolor candidates remain close after behavior evidence.","Never permit a one-answer color-count flip.","Color count means Commander color identity.",[
    opt("mono","Explore one color's limits","Solve gaps inside a tighter toolset.","Prefers focused single-color constraint.","NARROW"),
    opt("multi","Combine color roles","Use more kinds of tools with greater mana and choice complexity.","Prefers multicolor breadth.","BROAD"),
    opt("pattern","The play pattern matters more","Choose whichever color count supports the behavior.","Reports no independent breadth preference.","CONDITIONAL","conditional")])
];

const qAudit = csv(read("docs/audits/vm551-placement-system/question-quality-adjudication.csv"));
const aAudit = csv(read("docs/audits/vm551-placement-system/answer-quality-adjudication.csv"));
const distinct = csv(read("docs/audits/vm551-placement-system/identity-distinctiveness-matrix.csv"));
const sensitivity = JSON.parse(read("docs/audits/vm551-placement-system/sensitivity-dependency-collision-analysis.json"));
const model = JSON.parse(read("data/placement-model.json"));
const qById = new Map(qAudit.map((r) => [r.question_id, r]));

const inventory = aAudit.map((a) => {
  const x = qById.get(a.question_id);
  let disposition = "retain concept only";
  if (x.final_disposition === "REPLACE") disposition = "retire";
  else if (x.final_disposition === "NEEDS-EVIDENCE") disposition = "evidence needed";
  else if (x.final_disposition === "RETUNE" && x.commander_relevance === "HIGH" && x.abstraction_burden !== "HIGH" && x.double_barreled_status === "NO") disposition = "rewrite for pilot";
  return {
    record_type:"current_answer_effect", current_question_id:x.question_id, current_answer_id:a.answer_id, audit_answer_id:a.audit_answer_id,
    stage:x.phase, current_wording:x.exact_prompt, current_answer_title:a.exact_title, current_answer_copy:a.exact_copy,
    current_scoring_effects:"strong="+list(a.strong_positive_identities).join(",")+";positive="+list(a.positive_identities).join(",")+";suppressed="+list(a.suppressed_identities).join(","),
    audit_question_disposition:x.final_disposition, audit_answer_disposition:a.final_disposition, abstraction_burden:x.abstraction_burden,
    double_barrel_status:x.double_barreled_status, mood_roleplay_dependence:"mood="+x.mood_dependence+";lore="+x.lore_dependence,
    desirability_bias:x.desirability_or_steering_risk, attempted_constructs:x.intended_construct+" | "+x.actual_dimensions_tested,
    salvageable_observation:"Concept only: "+a.authored_signal+". No current scoring effect is retained.",
    proposed_disposition:disposition, evidence_boundary:"Descriptive inventory only; answer-level evidence authority remains absent."
  };
});

const signalMap = new Map(C.map((c) => [c.construct_id, new Set()]));
const answers = [];
for (const item of Q) for (const o of item.options) {
  const primary = "SIG_"+item.construct+"_"+o.suffix;
  signalMap.get(item.construct).add(primary);
  answers.push({
    answer_id:item.id+"."+o.key, question_id:item.id, construct_id:item.construct, answer_title:o.title,
    explanatory_sentence:o.copy, plain_language_observation:o.observation, primary_signal:primary,
    optional_bounded_secondary_signal:"", dependency_group:"DG_"+item.construct,
    exclusions:o.kind === "directional" ? "Does not alone imply an identity, motive, power, skill, experience, or budget." : "Must not create directional, midpoint, or negative identity evidence.",
    evidence_provenance:item.evidenceIds+";E-VOICE", mapping_confidence:o.kind === "directional" ? "LOW-PROVISIONAL" : "DIRECT-UNCERTAINTY",
    scoring_status:o.kind === "directional" ? "PILOT-HYPOTHESIS-NONSCORING" : "NON-DIRECTIONAL-NONSCORING",
    limitation_statement:o.kind === "directional" ? "Observation wording and identity association require player validation; no weight is authorized." : "Preserve as unknown/conditional/representational failure."
  });
}

const constructRows = C.map((c) => ({...c, allowed_primary_signals:[...signalMap.get(c.construct_id)].sort().join(";"), scoring_boundary:"Observation capture only; no weights or identity points."}));
const pilot = Q.map((x,i) => ({
  question_id:x.id, stage:x.stage, pool_order:i+1, primary_construct_id:x.construct, question_prompt:x.prompt,
  answer_ids:x.options.map((o) => x.id+"."+o.key).join(";"), primary_observation:C.find((c) => c.construct_id === x.construct).plain_definition,
  competitor_pair_or_family:x.scope, evidence_provenance:x.evidenceIds+";E-VOICE", dependency_group:"DG_"+x.construct,
  adaptive_ask_when:x.askWhen, do_not_ask_when:x.doNotAskWhen, jargon_help:x.glossary, scoring_status:"DESIGN-ONLY-NONSCORING"
}));

const I = {
  W:["C03","C13","C07"],U:["C01","C08","C06"],B:["C12","C11","C09"],R:["C01","C04","C11"],G:["C03","C14","C10"],
  WU:["C08","C13","C09"],UB:["C02","C08","C11"],BR:["C11","C12","C04"],RG:["C07","C01","C10"],WG:["C13","C03","C10"],
  WB:["C13","C12","C09"],UR:["C06","C04","C09"],BG:["C12","C03","C06"],WR:["C03","C07","C01"],UG:["C06","C03","C14"],
  PRISMARI:["C04","C10","C11"],QUANDRIX:["C06","C09","C14"],SILVERQUILL:["C13","C11","C10"],LOREHOLD:["C03","C06","C10"],WITHERBLOOM:["C12","C06","C14"],
  BANT:["C05","C03","C09"],ESPER:["C06","C08","C09"],GRIXIS:["C01","C12","C02"],JUND:["C01","C12","C07"],NAYA:["C07","C10","C11"],
  ABZAN:["C03","C14","C13"],TEMUR:["C01","C07","C14"],SULTAI:["C12","C06","C14"],MARDU:["C01","C07","C13"],JESKAI:["C08","C01","C09"],
  YORE:["C06","C09","C12"],GLINT:["C09","C01","C11"],DUNE:["C07","C11","C13"],INK:["C13","C03","C10"],WITCH:["C14","C06","C09"],
  COLORLESS:["C15","C06","C10"],WUBRG:["C15","C09","C10"]
};
const B = Object.fromEntries(Object.entries(I).map(([id, cs]) => [id, cs.slice(0,2)]));
const direct = {
  UR:["b1.crucible.ur.v1"],PRISMARI:["b1.crucible.ur.v1"],BG:["b1.crucible.bg.v1"],WITHERBLOOM:["b1.crucible.bg.v1"],
  WR:["b1.crucible.wr.v1"],LOREHOLD:["b1.crucible.wr.v1"],UG:["b1.crucible.ug.v1"],QUANDRIX:["b1.crucible.ug.v1"],
  WB:["b1.crucible.wb.v1"],SILVERQUILL:["b1.crucible.wb.v1"],BANT:["b1.crucible.bant.v1"],GRIXIS:["b1.crucible.grixis.v1"],
  SULTAI:["b1.crucible.sultai.v1"],TEMUR:["b1.crucible.temur.v1"],ESPER:["b1.crucible.esper.v1"],JESKAI:["b1.crucible.jeskai.v1"],YORE:["b1.crucible.yore-glint.v1","b1.crucible.witch-yore.v1"],
  GLINT:["b1.crucible.yore-glint.v1","b1.crucible.glint-dune.v1"],DUNE:["b1.crucible.glint-dune.v1","b1.crucible.dune-ink.v1"],
  INK:["b1.crucible.dune-ink.v1","b1.crucible.ink-witch.v1"],WITCH:["b1.crucible.ink-witch.v1","b1.crucible.witch-yore.v1"],
  COLORLESS:["b1.crucible.colorless-wubrg.v1"],WUBRG:["b1.crucible.colorless-wubrg.v1"]
};
const hallBy = Object.fromEntries(Q.filter((x) => x.stage === "Hall").map((x) => [x.construct,x.id]));
const pilotBy = Object.fromEntries([...Q.filter((x) => x.stage === "Gate"),...Q.filter((x) => x.stage === "Hall")].map((x) => [x.construct,x.id]));
const coverage = distinct.map((r) => {
  const cs = I[r.identity] || [], dq = direct[r.identity] || [], high = r.distinctiveness_disposition !== "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED";
  const qids = ["b1.gate.initiative.v1","b1.gate.visibility.v1","b1.gate.disruption.v1","b1.gate.tempo.v1",...cs.map((c) => hallBy[c]).filter(Boolean),"b1.crucible.mono-multi.v1",...dq];
  return {
    identity_id:r.identity, identity_name:r.canonical_name, identity_family:model.factions[r.identity]?.institution_type || "unknown",
    supporting_constructs:cs.join(";"), boundary_constructs:(B[r.identity] || []).join(";"),
    strongest_likely_competitors:list(r.nearest_identity_competitors).map((x) => x.identity+":"+x.count).join(";"),
    minimum_independent_observations:high ? "4 across at least 2 stages; include 1 direct boundary observation" : "3 across at least 2 stages; include 1 boundary observation",
    current_evidence_quality:r.distinctiveness_disposition, pilot_question_ids:[...new Set(qids)].join(";"),
    pilot_coverage:dq.length ? "STRUCTURAL-DIRECT-HYPOTHESIS; not empirically validated" : "STRUCTURAL-BROAD-AND-FAMILY; no direct identity-specific discriminator",
    uncovered_risks:high ? "High confusion or insufficient distinctiveness; preserve close/insufficient until player evidence supports mapping." : "No empirical confusion, reliability, or false-positive data; broad constructs may not separate nearest competitors.",
    evidence_provenance:"E-AUDIT;E-CERTIFIED;E-CECOS"
  };
});

const covBy = new Map(coverage.map((r) => [r.identity_id,r]));
const pairQuestions = new Map([
  ["PRISMARI|UR","b1.crucible.ur.v1"],["BG|WITHERBLOOM","b1.crucible.bg.v1"],["LOREHOLD|WR","b1.crucible.wr.v1"],
  ["QUANDRIX|UG","b1.crucible.ug.v1"],["SILVERQUILL|WB","b1.crucible.wb.v1"],["BANT|WITCH","b1.crucible.bant.v1"],
  ["B|GRIXIS","b1.crucible.grixis.v1"],["GLINT|GRIXIS","b1.crucible.grixis.v1"],["B|SULTAI","b1.crucible.sultai.v1"],
  ["BG|SULTAI","b1.crucible.sultai.v1"],["G|TEMUR","b1.crucible.temur.v1"],["GLINT|TEMUR","b1.crucible.temur.v1"],
  ["ESPER|U","b1.crucible.esper.v1"],["ESPER|YORE","b1.crucible.esper.v1"],["ESPER|JESKAI","b1.crucible.esper.v1"],
  ["INK|JESKAI","b1.crucible.jeskai.v1"],["JESKAI|LOREHOLD","b1.crucible.jeskai.v1"],["JESKAI|NAYA","b1.crucible.jeskai.v1"],
  ["GLINT|YORE","b1.crucible.yore-glint.v1"],["DUNE|GLINT","b1.crucible.glint-dune.v1"],["DUNE|INK","b1.crucible.dune-ink.v1"],
  ["INK|WITCH","b1.crucible.ink-witch.v1"],["WITCH|YORE","b1.crucible.witch-yore.v1"],["COLORLESS|WUBRG","b1.crucible.colorless-wubrg.v1"]
]);
const key = (a,b) => [a,b].sort().join("|");
const pairs = new Map();
function addPair(a,b,basis,count,category) {
  if (!covBy.has(a) || !covBy.has(b) || a === b) return;
  const k = key(a,b), r = pairs.get(k) || {a:k.split("|")[0],b:k.split("|")[1],basis:new Set(),counts:[],categories:new Set()};
  r.basis.add(basis); if (count) r.counts.push(count); if (category) r.categories.add(category); pairs.set(k,r);
}
for (const [composition,count] of Object.entries(sensitivity.exact_tie_composition || {})) {
  const ids = composition.split("=");
  for (let i=0;i<ids.length;i+=1) for (let j=i+1;j<ids.length;j+=1) addPair(ids[i],ids[j],"EXACT-TIE",count,"accepted exact tie");
}
for (const [composition,count] of Object.entries(sensitivity.common_primary_rank_two || {})) if (count >= 100) {
  const [a,b] = composition.split(">"); addPair(a,b,"HIGH-FREQUENCY-P1/P2",count,">=100 authored paths; not player prevalence");
}
for (const [a,b,cat] of [
  ["UR","PRISMARI","same-color guild/college"],["BG","WITHERBLOOM","same-color guild/college"],["WR","LOREHOLD","same-color guild/college"],
  ["UG","QUANDRIX","same-color guild/college"],["WB","SILVERQUILL","same-color guild/college"],["COLORLESS","WUBRG","edge identity"],
  ["YORE","GLINT","adjacent four-color"],["GLINT","DUNE","adjacent four-color"],["DUNE","INK","adjacent four-color"],["INK","WITCH","adjacent four-color"],["WITCH","YORE","adjacent four-color"],
  ["BANT","ESPER","adjacent three-color"],["ESPER","GRIXIS","adjacent three-color"],["GRIXIS","JUND","adjacent three-color"],["JUND","NAYA","adjacent three-color"],
  ["ABZAN","SULTAI","adjacent three-color"],["SULTAI","TEMUR","adjacent three-color"],["TEMUR","JESKAI","adjacent three-color"],["JESKAI","MARDU","adjacent three-color"],["MARDU","ABZAN","adjacent three-color"]
]) addPair(a,b,"MANDATORY-COVERAGE",0,cat);

const cBy = new Map(C.map((x) => [x.construct_id,x]));
const confusion = [...pairs.values()].sort((x,y) => x.a.localeCompare(y.a)||x.b.localeCompare(y.b)).map((p) => {
  const l=covBy.get(p.a),r=covBy.get(p.b),lc=l.supporting_constructs.split(";"),rc=r.supporting_constructs.split(";");
  const a=lc.find((x)=>!rc.includes(x))||lc[0],b=rc.find((x)=>!lc.includes(x))||rc[0],directQ=pairQuestions.get(key(p.a,p.b))||"";
  return {
    identity_a:p.a, identity_b:p.b, audit_basis:[...p.basis].join(";"), audit_path_count_or_marker:p.counts.sort((a,b)=>b-a).join(";")||"mandatory structural coverage",
    coverage_category:[...p.categories].join(";"),
    observable_behavioral_distinction:directQ ? "Direct scenario tests one bounded Commander behavior." : p.a+" uses "+cBy.get(a).name+" evidence; "+p.b+" uses "+cBy.get(b).name+" evidence. No direct pair claim is made.",
    pilot_question_ids:directQ || [...new Set([pilotBy[a],pilotBy[b],"b1.crucible.mono-multi.v1"].filter(Boolean))].join(";"),
    why_defensible:"Questions record observable Commander preferences; identity association comes only from certified boundary records and remains a pilot hypothesis.",
    when_not_to_ask:directQ ? "Before at least two independent observations or when this competitor set is absent." : "No direct Crucible item; do not improvise one or name a strong winner from broad coverage.",
    pilot_coverage_status:directQ ? "DIRECT-PROVISIONAL" : "INDIRECT-STRUCTURAL; close/insufficient expected", evidence_provenance:"E-AUDIT;E-CERTIFIED;E-CECOS"
  };
});
const confusionKeys = new Set(confusion.map((x) => key(x.identity_a,x.identity_b)));
const exactPairKeys = [];
for (const composition of Object.keys(sensitivity.exact_tie_composition || {})) {
  const ids = composition.split("=");
  for (let i=0;i<ids.length;i+=1) for (let j=i+1;j<ids.length;j+=1) exactPairKeys.push(key(ids[i],ids[j]));
}
const highPairKeys = Object.entries(sensitivity.common_primary_rank_two || {}).filter(([,n])=>n>=100).map(([x])=>{const [a,b]=x.split(">");return key(a,b);});

write("construct-map.tsv",makeTsv(["construct_id","name","plain_definition","commander_example","does_not_mean","applicable_identity_families","likely_confusion_pairs","required_evidence","stage","dependency_overlap","allowed_primary_signals","scoring_boundary"],constructRows));
write("question-bank-inventory.tsv",makeTsv(["record_type","current_question_id","current_answer_id","audit_answer_id","stage","current_wording","current_answer_title","current_answer_copy","current_scoring_effects","audit_question_disposition","audit_answer_disposition","abstraction_burden","double_barrel_status","mood_roleplay_dependence","desirability_bias","attempted_constructs","salvageable_observation","proposed_disposition","evidence_boundary"],inventory));
write("pilot-question-bank.tsv",makeTsv(["question_id","stage","pool_order","primary_construct_id","question_prompt","answer_ids","primary_observation","competitor_pair_or_family","evidence_provenance","dependency_group","adaptive_ask_when","do_not_ask_when","jargon_help","scoring_status"],pilot));
write("answer-signal-contracts.tsv",makeTsv(["answer_id","question_id","construct_id","answer_title","explanatory_sentence","plain_language_observation","primary_signal","optional_bounded_secondary_signal","dependency_group","exclusions","evidence_provenance","mapping_confidence","scoring_status","limitation_statement"],answers));
write("identity-coverage-matrix.tsv",makeTsv(["identity_id","identity_name","identity_family","supporting_constructs","boundary_constructs","strongest_likely_competitors","minimum_independent_observations","current_evidence_quality","pilot_question_ids","pilot_coverage","uncovered_risks","evidence_provenance"],coverage));
write("confusion-pair-coverage.tsv",makeTsv(["identity_a","identity_b","audit_basis","audit_path_count_or_marker","coverage_category","observable_behavioral_distinction","pilot_question_ids","why_defensible","when_not_to_ask","pilot_coverage_status","evidence_provenance"],confusion));

const qDisp = new Map();
for (const r of inventory) qDisp.set(r.current_question_id,r.proposed_disposition);
const count = (values) => values.reduce((a,v)=>(a[v]=(a[v]||0)+1,a),{});
const stages = count(Q.map((x)=>x.stage));
const ids = [...Q.map((x)=>x.id),...answers.map((x)=>x.answer_id)];
const cids = new Set(C.map((x)=>x.construct_id)), qids = new Set(Q.map((x)=>x.id));
const checks = [
  ["113 current questions",qAudit.length===113,qAudit.length],["356 current answers",aAudit.length===356,aAudit.length],
  ["37 identities",coverage.length===37&&new Set(coverage.map((x)=>x.identity_id)).size===37,coverage.length],
  ["4 Gate questions",stages.Gate===4,stages.Gate],["unique IDs",new Set(ids).size===ids.length,ids.length],
  ["stable ID format",ids.every((x)=>/^[a-z0-9._-]+$/.test(x)),ids.length],
  ["one construct per question",Q.every((x)=>cids.has(x.construct)),Q.length],
  ["stable answer contracts",answers.every((x)=>x.answer_id&&x.question_id&&x.construct_id&&x.plain_language_observation&&x.primary_signal&&x.dependency_group&&x.exclusions&&x.evidence_provenance&&x.mapping_confidence&&x.scoring_status&&x.limitation_statement),answers.length],
  ["no orphan question or construct refs",answers.every((x)=>qids.has(x.question_id)&&cids.has(x.construct_id)),answers.length],
  ["no orphan signals",answers.every((x)=>x.primary_signal.startsWith("SIG_"+x.construct_id+"_")),answers.length],
  ["no vague-only observations",answers.every((x)=>/\b(Prefers|Reports|Accepts|Rejects|Uses)\b/.test(x.plain_language_observation)),answers.length],
  ["jargon help",Q.every((x)=>!/\b(engine|board wipe|the 99|tutor|table deal|Five-Color|interaction)\b/i.test(x.prompt+" "+x.options.map((o)=>o.copy).join(" "))||x.glossary),Q.filter((x)=>/\b(engine|board wipe|the 99|tutor|table deal|Five-Color|interaction)\b/i.test(x.prompt+" "+x.options.map((o)=>o.copy).join(" "))&&!x.glossary).map((x)=>x.id).join(",")||Q.length],
  ["non-scoring only",answers.every((x)=>x.scoring_status.includes("NONSCORING")),answers.length],
  ["explicit high-risk and insufficient coverage",["BANT","GRIXIS","SULTAI","TEMUR","COLORLESS","ESPER","INK","JESKAI","LOREHOLD","UR","YORE"].every((x)=>(direct[x]||[]).length>0),11],
  ["exact confusion pairs represented",exactPairKeys.every((x)=>confusionKeys.has(x)),new Set(exactPairKeys).size],
  ["high-frequency confusion pairs represented",highPairKeys.every((x)=>confusionKeys.has(x)),new Set(highPairKeys).size]
];
const validation = {
  status:checks.every((x)=>x[1])?"PASS":"FAIL",
  expected_base:"30bfe87171e4119a0bab1bb47318862c042977de",
  counts:{constructs:C.length,current_questions:qAudit.length,current_answers:aAudit.length,inventory_rows:inventory.length,pilot_questions:Q.length,pilot_answers:answers.length,stages,identities:coverage.length,confusion_pairs:confusion.length,proposed_question_dispositions:count([...qDisp.values()]),proposed_answer_row_dispositions:count(inventory.map((x)=>x.proposed_disposition))},
  checks:checks.map(([name,pass,observed])=>({name,status:pass?"PASS":"FAIL",observed})),
  evidence_registry:evidence,
  boundaries:["No live or Gate A file is written.","Generated artifacts remain under the B1 plan directory.","Identity associations are provisional non-scoring hypotheses."]
};
write("validation-record.json",JSON.stringify(validation,null,2)+"\n");
console.log(JSON.stringify(validation,null,2));
if (validation.status !== "PASS") process.exitCode=1;
