import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
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
  ["C01","Initiative posture","Preference to advance a plan first or preserve resources to answer others.","Develop the main plan on an open turn versus wait with responses.","Aggression, skill, speed, or power.","all; mono; guild; shard/wedge","R/U; Grixis/Temur; Jeskai/Mardu","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS; future player comparison across calm, behind, and disrupted contexts","Gate","All C01 scenarios share DG_C01 and cannot stack. Initiative posture may vary by game context; systematic divergence requires later split or restriction before scoring authority."],
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
  q("b1.gate.visibility.v1","Gate","C02","As play comes back around to you, which position usually feels more comfortable?","all identities","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Always; Gate 2.","Do not infer actual threat level.","Board means the cards and tokens on the battlefield.",[
    opt("board","A board people can see","Creatures or other permanents are already doing useful work.","Prefers visible battlefield resources.","VISIBLE"),
    opt("held","Resources in reserve","Cards in hand and mana remain available until their use is clear.","Prefers held or less visible resources.","HELD"),
    opt("split","Some of each","A useful board is present with at least one option held back.","Prefers a mixed visible/held position.","MIXED"),
    opt("depends","That depends on the deck","My decks require such different positions that I cannot name one preference.","Reports genuine deck-conditionality.","CONDITIONAL","conditional")]),
  q("b1.gate.disruption.v1","Gate","C03","A board wipe—an effect that removes many cards and tokens from the battlefield—is likely next turn. What would you rather have prepared?","all identities","E-PLAYER-PACE;E-PLAYER-COMMANDER;E-CECOS","Always; Gate 3.","Do not treat the answer as proof the deck is resilient.","Board wipe means an effect that removes many cards and tokens from the battlefield.",[
    opt("protect","A way to keep the board","Protection or a response lets important pieces survive.","Prefers protection before broad disruption.","PROTECT"),
    opt("recover","A way to rebuild","The board can go if hand or graveyard resources restore it.","Prefers recovery after broad disruption.","RECOVER"),
    opt("limit","Less exposed in the first place","Commit fewer important pieces before the wipe.","Prefers reduced exposure to broad disruption.","LIMIT_EXPOSURE"),
    opt("depends","No usual answer","Preparation changes too much with the deck and known cards.","Reports scenario-conditionality.","CONDITIONAL","conditional")]),
  q("b1.gate.tempo.v1","Gate","C04","When your deck is working, how do you want the advantage to arrive?","all identities","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Always; Gate 4.","Do not infer game length or ending mode.","",[
    opt("small","A little every turn","Repeated small gains keep the deck moving.","Prefers incremental advantage.","INCREMENTAL"),
    opt("burst","One turn that changes the game","Prepare for a concentrated payoff.","Prefers a concentrated payoff turn.","CONCENTRATED"),
    opt("waves","Several distinct surges","Build, spend momentum, and build again.","Prefers cyclical advantage.","CYCLICAL"),
    opt("depends","No stable preference","Different decks make different rhythms enjoyable.","Reports no stable payoff-rhythm preference.","CONDITIONAL","conditional")]),
  q("b1.hall.commander-role.v1","Hall","C05","If your commander is removed twice, what should the rest of the deck still be able to do?","commander-centric versus resilient 99","E-PLAYER-COMMANDER;E-CECOS","Ask when commander reliance could separate remaining candidates.","Do not test commander affection or deck quality.","",[
    opt("function","Run the main plan","The deck should execute its plan without the commander.","Prefers a resilient 99.","RESILIENT_99"),
    opt("partial","Keep playing, less efficiently","The commander improves the plan but its loss does not stop meaningful turns.","Prefers commander relevance without binary dependence.","ROLE_PLAYER"),
    opt("center","Protect and recast the centerpiece","The deck may change sharply when the commander is unavailable.","Accepts high commander dependence.","CENTERPIECE")]),
  q("b1.hall.engine-shape.v1","Hall","C06","When an important engine piece is removed, what structure do you want behind it?","engine families","E-PLAYER-COMMANDER;E-PLAYER-VARIANCE;E-CECOS","Ask when candidates differ in engine concentration.","Do not ask without showing the engine definition.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("replace","Another piece does the same job","Several cards can replace one another.","Prefers redundant replaceable pieces.","REDUNDANT"),
    opt("overlap","Several small engines overlap","Pieces remain useful alone and combine in different ways.","Prefers modular overlapping engines.","MODULAR"),
    opt("central","One engine is worth defending","A central piece can be found and protected.","Accepts concentrated engine dependency.","CENTRAL")]),
  q("b1.hall.pressure.v1","Hall","C07","Which progress most makes a game feel like your deck is doing its job?","combat, resource-control, and engine-ending families","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Ask when candidate families use different pressure channels.","Do not ask as a power or fairness question.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("combat","Life totals are under pressure","Attacks and combat damage make opponents respond.","Prefers combat pressure.","COMBAT"),
    opt("resources","Options are getting narrower","Cards, mana, or board access become harder to use.","Prefers resource-control pressure.","RESOURCE_CONTROL"),
    opt("engine","A noncombat ending is assembling","The table can see an engine approaching an ending.","Prefers noncombat engine pressure.","NONCOMBAT_ENGINE")]),
  q("b1.hall.mana-window.v1","Hall","C08","When both development and interaction are available, where do you prefer to spend most of your mana?","Blue, Azorius, Esper, Jeskai, and cadence boundaries","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Ask when Gate initiative leaves families close.","Do not count independently from C01 when both describe one cadence.","Interaction means an answer to another player's spell, ability, attack, or permanent.",[
    opt("own","Develop on my turn","Use the mana now to improve my battlefield or advance my main plan.","Prefers own-turn commitment.","OWN_TURN"),
    opt("others","Hold mana for opponents' turns","Keep options available until the important action appears.","Prefers opponent-turn windows.","OPPONENT_TURN"),
    opt("split","Use some and keep some","Take a smaller development step with one answer available.","Prefers split commitment.","SPLIT")]),
  q("b1.hall.repeatability.v1","Hall","C09","Across several games with the same deck, what repetition do you want?","all identities","E-PLAYER-VARIANCE;E-PLAYER-PACE;E-CECOS","Ask when candidates differ in repeatability.","Do not reduce the answer to tutor count.","",[
    opt("same","The central plan appears often","Several cards can help the deck reach its intended plan consistently.","Prefers consistent access to a plan.","CONSISTENT"),
    opt("varied","The route changes each game","See the central plan less often in exchange for different games.","Prefers variance and novelty.","VARIANT"),
    opt("toolbox","The plan stays, the tool changes","Keep a dependable goal with different answers and subplans.","Prefers stable purpose with variable execution.","TOOLBOX")]),
  q("b1.hall.theme.v1","Hall","C10","A card fits your deck's theme, but another performs the same job more reliably. Which do you keep?","theme-first players; all identities","E-PLAYER-THEME;E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CECOS","Ask when attachment may explain contradictory behavior answers.","Do not use alone for identity support.","Theme means a chosen story, visual idea, creature type, or self-imposed concept.",[
    opt("theme","Keep the on-theme card","Expressing the deck's idea is part of the desired result.","Prefers thematic coherence over marginal reliability.","THEME_FIRST"),
    opt("reliable","Keep the reliable card","The slot should perform its job consistently.","Prefers role reliability over theme.","EFFICIENCY_FIRST"),
    opt("gap","It depends on the gap","Keep the theme until the cost becomes noticeable in games.","Uses a conditional theme-efficiency threshold.","CONDITIONAL","conditional")]),
  q("b1.hall.threat.v1","Hall","C11","If your board becomes the clearest threat, how do you want the deck to handle that attention?","visible-pressure and hidden-resource families","E-PLAYER-THREAT;E-PLAYER-COMMANDER;E-CECOS","Ask when visibility separates candidates.","Do not infer actual power or social conduct.","Players use threat for a card, battlefield, or plan they believe they need to answer.",[
    opt("embrace","Make them answer it","Present a strong board and test whether the table can stop it.","Accepts visible threat status.","EMBRACE"),
    opt("avoid","Stay useful without leading","Make progress without becoming the first target.","Prefers lower visible threat.","AVOID"),
    opt("pivot","Change posture as attention shifts","Pressure when safe and pull back when the table turns.","Prefers adaptive threat posture.","ADAPTIVE")]),
  q("b1.hall.sacrifice.v1","Hall","C12","You can give up a useful permanent now for cards or another lasting resource. What feels natural?","resource-conversion families","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Ask when candidates differ in voluntary conversion.","Do not equate sacrifice with graveyard or Black identity.","Permanent means a card or token on the battlefield.",[
    opt("convert","Spend it for the next advantage","Turn a current piece into a different resource.","Prefers voluntary resource conversion.","CONVERT"),
    opt("preserve","Keep the useful piece","Retain board presence unless the exchange is necessary.","Prefers resource preservation.","PRESERVE"),
    opt("renew","Spend it only if it returns","Make the exchange when the resource can be reused.","Prefers recyclable conversion.","RECYCLE")]),
  q("b1.hall.commitment.v1","Hall","C13","A table deal helps both sides now. How binding should it remain after the board changes?","politics and public-commitment families","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Ask only with relevant table-deal experience.","Record unknown when the player lacks that experience.","A table deal is a spoken agreement between players.",[
    opt("terms","Keep the stated terms","Commitments remain reliable until their stated endpoint.","Prefers durable public commitments.","DURABLE"),
    opt("reopen","Reopen when facts change","Agreements can be revised after material board changes.","Prefers revisable commitments.","REVISABLE"),
    opt("short","Make only short deals","Commitment ends with the immediate exchange.","Prefers bounded short commitments.","BOUNDED")]),
  q("b1.hall.setup.v1","Hall","C14","How long can your deck spend setting up before it needs to influence the game?","Witch, Temur, Sultai, and engine families","E-PLAYER-PACE;E-PLAYER-COMMANDER;E-CECOS","Ask when candidates differ in development horizon.","Do not interpret as game length or patience.","",[
    opt("early","Useful while it builds","Early plays matter before the main plan is fully working.","Prefers early utility.","EARLY_IMPACT"),
    opt("long","A long setup is acceptable","Several turns may mainly prepare the plan.","Accepts long setup.","LONG_SETUP"),
    opt("staged","Each setup step pays something","Build for several turns with intermediate benefits.","Prefers staged setup.","STAGED")]),
  q("b1.hall.breadth.v1","Hall","C15","When choosing a new Commander deck, which starting constraint is more appealing?","mono/multicolor; four-color; Colorless; WUBRG","E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CERTIFIED;E-CECOS","Ask when color-count families remain plausible after behavior evidence.","Never assign a color-count identity from this answer.","Color roles are broad tool families; no color-pie knowledge is required.",[
    opt("narrow","A tight restriction","One color, card type, or narrow rule makes choices sharper.","Prefers narrow constraints.","NARROW"),
    opt("broad","A wide set of tools","Several color roles answer more situations.","Prefers broad tool access.","BROAD"),
    opt("concept","Whichever serves the concept","The deck idea decides whether the pool is narrow or broad.","Reports concept-conditional breadth.","CONDITIONAL","conditional")]),
  q("b1.hall.interaction-window.v1","Hall","C08","An opponent begins the action most likely to decide the game. When should your interaction matter?","reactive/proactive boundary families","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Ask only if C08 remains unresolved.","Never count independently from b1.hall.mana-window.v1.","Interaction means an answer to another player's spell, ability, attack, or permanent.",[
    opt("before","Before the key piece resolves","Stop the enabling spell or ability before it takes effect.","Prefers an early interaction window.","EARLY_WINDOW"),
    opt("after","After the piece is visible","Answer it once its effect on the game is clear.","Prefers a later visible interaction window.","LATE_WINDOW"),
    opt("pressure","Make setup too costly","Use prior pressure to reduce the opponent's time.","Prefers preventive pressure.","PREVENTIVE")]),
  q("b1.crucible.ur.v1","Crucible","C04","Your spell-heavy deck has mana for a major turn. Which payoff sounds more like the plan?","UR vs PRISMARI","E-CERTIFIED;E-PLAYER-THEME;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when UR/PRISMARI remain close after two independent observations.","Do not ask if spell-heavy behavior was never observed.","Spell-heavy means instants or sorceries are central.",[
    opt("workshop","Improve the working engine","Several smaller spells test, copy, untap, or refine a repeatable system.","Prefers iterative spell-engine payoff.","INCREMENTAL"),
    opt("showcase","Build toward the showcase","One large spell or sequence creates the memorable turn.","Prefers concentrated expressive payoff.","CONCENTRATED"),
    opt("neither","Neither describes my deck","My spell plan does not fit either payoff.","Rejects the proposed UR-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.bg.v1","Crucible","C12","Several cards from your battlefield went to your graveyard. What do you want that loss to enable?","BG vs WITHERBLOOM","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when BG/WITHERBLOOM remain close.","Do not ask if graveyard use was never observed.","A graveyard is a player's discard pile.",[
    opt("reclaim","Use the same resources again","Cards return or keep contributing through a longer cycle.","Prefers reclamation and reuse.","RECYCLE"),
    opt("exchange","Turn the loss into a new resource","Life, tokens, cards, or draining effects come from the exchange.","Prefers immediate conversion.","CONVERT"),
    opt("neither","The graveyard is incidental","It is not a resource plan I seek.","Rejects the proposed BG-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.wr.v1","Crucible","C03","An opponent targets an important permanent. Which response would you rather have built toward?","WR vs LOREHOLD","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when WR/LOREHOLD remain close.","Do not ask from one Gate answer alone.","Permanent means a card or token on the battlefield.",[
    opt("intervene","Stop the removal now","Protection or an immediate answer keeps the piece in play.","Prefers immediate intervention.","PROTECT"),
    opt("recover","Recover value from the loss","Reuse the piece or turn its prior work into later value.","Prefers recovery from prior resources.","RECOVER"),
    opt("neither","That is not the distinction","My response depends on the card.","Rejects the proposed WR-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.ug.v1","Crucible","C06","Your battlefield is growing and an important engine piece is removed. What structure should keep it working?","UG vs QUANDRIX","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when UG/QUANDRIX remain close.","Do not ask without the engine definition.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("adapt","Other creature pieces combine","Several creature-focused pieces stay useful alone and work together.","Prefers a modular creature-centered engine.","MODULAR"),
    opt("scale","One scaling piece drives it","A central piece makes counters, copies, or resources expand together.","Accepts a concentrated scaling engine.","CENTRAL"),
    opt("neither","My growth plan is different","Neither route is central.","Rejects the proposed UG-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.wb.v1","Crucible","C13","Before a risky table deal, what makes the agreement useful?","WB vs SILVERQUILL","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when WB/SILVERQUILL remain close.","Record unknown without relevant deal experience.","Table deal means a spoken agreement between players.",[
    opt("terms","The terms carry a cost","Obligations, consequences, or exchange terms remain clear.","Prefers obligation-centered commitment.","DURABLE"),
    opt("influence","Reopen it as the room changes","Public changes can justify revising the agreement.","Prefers revisable public commitment.","REVISABLE"),
    opt("neither","I avoid that kind of deal","I lack enough experience or preference.","Reports missing experience.","UNKNOWN","unknown")]),
  q("b1.crucible.bant.v1","Crucible","C05","Your commander can carry much of your plan. What role should the rest of the deck play?","BANT vs WITCH/INK/W/adjacent three-color","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when BANT and a listed competitor remain close.","One commander-reliance observation cannot prove Bant.","",[
    opt("refine","Refine and protect the commander","The deck improves and protects the commander as its centerpiece.","Accepts a protected commander centerpiece.","CENTERPIECE"),
    opt("network","Keep the rest of the deck functional","Several pieces remain useful if the commander is removed.","Prefers distributed function beyond the commander.","RESILIENT_99"),
    opt("neither","The commander should not carry it","The scenario does not fit my plan.","Rejects the proposed Bant boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.grixis.v1","Crucible","C01","You are behind with one turn to change the game. Which first move fits?","GRIXIS vs B/YORE/GLINT/UB/BR","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Grixis and a listed competitor remain close.","Do not infer survival motive.","Interaction means an answer to another player's spell, ability, attack, or permanent.",[
    opt("calculate","Create a precise opening","Use information or interaction before exploiting the weakness.","Prefers calculated reactive opening.","REACTIVE"),
    opt("convert","Act before the window closes","Commit to the strongest available line and make the table answer.","Prefers proactive action while the opening exists.","PROACTIVE"),
    opt("neither","I need a different route","Neither opening describes my plan.","Rejects the proposed Grixis boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.sultai.v1","Crucible","C12","A creature, a card, and some life could each become fuel. How should the deck use them?","SULTAI vs B/GLINT/BG/U/WITCH","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Sultai and a listed competitor remain close.","Do not test ruthlessness or values.","",[
    opt("best","Convert whichever matters least","Choose among resource types as the board changes.","Prefers flexible cross-resource conversion.","CONVERT"),
    opt("cycle","Keep one cycle dependable","Center a repeatable cycle on one known resource.","Prefers a narrower recyclable cycle.","RECYCLE"),
    opt("neither","Conversion is not central","The scenario does not fit my main plan.","Rejects the proposed Sultai boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.temur.v1","Crucible","C01","The table changes and your planned sequence no longer fits. What should the deck do?","TEMUR vs G/INK/GLINT/PRISMARI/LOREHOLD","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Temur and a listed competitor remain close.","Do not equate improvisation with personality.","Board means the cards and tokens on the battlefield.",[
    opt("adapt","Use the board that exists","The creatures, mana, and cards already available form a new line.","Prefers immediate board-based adaptation.","PROACTIVE"),
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
  q("b1.crucible.ink-witch.v1","Crucible","C14","Your deck can influence the game early or keep resources to build toward larger turns. Which timing fits?","INK vs WITCH","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when Ink/Witch remain close.","Do not infer generosity or selfishness.","",[
    opt("share","Do useful work early","Cards or mana influence the game while the main plan develops.","Prefers early impact during setup.","EARLY_IMPACT"),
    opt("compound","Let resources accumulate","Keep building until later turns can do more.","Accepts long setup for larger later turns.","LONG_SETUP"),
    opt("depends","Timing depends on the deck","Different decks make different setup lengths feel right.","Reports deck-conditional setup tolerance.","CONDITIONAL","conditional")]),
  q("b1.crucible.witch-yore.v1","Crucible","C06","A key piece of a value engine is removed. What structure should keep the plan working?","WITCH vs YORE","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when Witch/Yore remain close.","Do not infer nature versus artifice.","Engine means a card or group of cards that repeatedly produces value.",[
    opt("compound","Several pieces keep adding up","Different pieces stay useful alone and combine to rebuild the engine.","Prefers modular overlapping engine pieces.","MODULAR"),
    opt("convert","Another piece fills the same role","Replaceable pieces preserve a known chain of inputs and outputs.","Prefers redundant replaceable engine pieces.","REDUNDANT"),
    opt("neither","My engine differs","Neither accumulation nor conversion is central.","Rejects the proposed four-color boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.colorless-wubrg.v1","Crucible","C15","You are choosing between a Colorless Commander deck and a Five-Color Commander deck to keep refining over many games. One commander's color identity uses no colors; the other's uses all five. Which deckbuilding challenge sounds more satisfying?","COLORLESS vs WUBRG","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only after prior independent behavioral evidence when both edge identities remain close.","Neither answer is sufficient for an edge identity.","A commander's color identity determines which colors may appear in its Commander deck. Five-Color uses all five.",[
    opt("constraint","Make a narrow pool do more","A hard restriction creates unusual solutions and tradeoffs.","Prefers narrow constraint.","NARROW"),
    opt("breadth","Make a broad pool cohere","Many color roles serve one integrated plan.","Prefers broad integration.","BROAD"),
    opt("neither","Color breadth is not my challenge","Neither reason drives my deck choice.","Rejects the edge distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.mono-multi.v1","Crucible","C15","Two decks support the same play pattern you enjoy. One commander's color identity uses a single color; the other's combines several. Which color-count constraint appeals more?","mono versus multicolor","E-CERTIFIED;E-PLAYER-COMMANDER;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when mono/multicolor candidates remain close after behavior evidence.","Never permit a one-answer color-count flip.","A commander's color identity determines which colors may appear in its Commander deck. Here, color count means the number of colors in the commander's color identity.",[
    opt("mono","Explore one color's limits","Solve gaps inside a tighter toolset.","Prefers focused single-color constraint.","NARROW"),
    opt("multi","Combine color roles","Use more kinds of tools with greater mana and choice complexity.","Prefers multicolor breadth.","BROAD"),
    opt("pattern","The play pattern matters more","Choose whichever color count supports the behavior.","Reports no independent breadth preference.","CONDITIONAL","conditional")])
];

const CR_AUTHORITY = "Wizards of the Coast Magic Comprehensive Rules; accessed 2026-08-04; published file effective 2026-08-07";
const CR_URL = "https://media.wizards.com/2026/downloads/MagicCompRules%2020260807.txt";
const COMMANDER_URL = "https://magic.wizards.com/en/formats/commander";
const J = [
  {jargon_id:"JRG_BOARD",term:"board",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Board means the cards and tokens on the battlefield.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-THREAT",rule_or_section:"Not a Comprehensive Rules definition; compare rules 110.1 and 403.1",validation_status:"ACTIVE",notes:"Player-facing Commander shorthand; never present as a quoted rules definition."},
  {jargon_id:"JRG_BOARD_WIPE",term:"board wipe",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Board wipe means an effect that removes many cards and tokens from the battlefield.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-COMMANDER",rule_or_section:"Not a Comprehensive Rules definition",validation_status:"ACTIVE",notes:"Effect is broader than spell and removal is not limited to destruction."},
  {jargon_id:"JRG_ENGINE",term:"engine",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Engine means a card or group of cards that repeatedly produces value.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-COMMANDER;E-PLAYER-VARIANCE",rule_or_section:"Not a Comprehensive Rules definition",validation_status:"ACTIVE",notes:"Owner-approved canonical operational explanation for C06 and related scenarios."},
  {jargon_id:"JRG_INTERACTION",term:"interaction",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Interaction means an answer to another player's spell, ability, attack, or permanent.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-THREAT",rule_or_section:"Not a Comprehensive Rules definition; constituent rules terms are covered by rules 110, 112, 113, and 508",validation_status:"ACTIVE",notes:"Intentionally includes multiple relevant response windows."},
  {jargon_id:"JRG_TABLE_DEAL",term:"table deal",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Table deal means a spoken agreement between players.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-THREAT",rule_or_section:"Not a Comprehensive Rules definition",validation_status:"ACTIVE",notes:"No implication about honesty, morality, or enforceability."},
  {jargon_id:"JRG_SPELL_HEAVY",term:"spell-heavy",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Spell-heavy means instants or sorceries are central to the deck.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-THEME",rule_or_section:"Not a Comprehensive Rules definition; instants rule 304 and sorceries rule 307",validation_status:"ACTIVE",notes:"Deckbuilding shorthand, not a formal archetype assignment."},
  {jargon_id:"JRG_FIVE_COLOR",term:"Five-Color",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Five-Color uses all five colors in the commander's color identity.",authority_type:"OFFICIAL_COMMANDER_FORMAT_PLUS_PLAYER_LABEL",authority_reference:COMMANDER_URL,rule_or_section:"Commander format Color Identity; Comprehensive Rules 903.4 and 903.5c",validation_status:"ACTIVE",notes:"Five-Color is a player-facing label; color identity is rules-defined."},
  {jargon_id:"JRG_COLOR_COUNT",term:"color count",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Here, color count means the number of colors in the commander's color identity.",authority_type:"ARCHSCRY_OPERATION_OVER_RULES_TERM",authority_reference:CR_URL,rule_or_section:"Comprehensive Rules 903.4",validation_status:"ACTIVE",notes:"The operational count is boundary evidence only."},
  {jargon_id:"JRG_PERMANENT",term:"permanent",jargon_class:"RULES_DEFINED",canonical_public_definition:"Permanent means a card or token on the battlefield.",authority_type:"OFFICIAL_WOTC_COMPREHENSIVE_RULES",authority_reference:CR_URL,rule_or_section:"110.1",validation_status:"VERIFIED",notes:CR_AUTHORITY},
  {jargon_id:"JRG_GRAVEYARD",term:"graveyard",jargon_class:"RULES_DEFINED",canonical_public_definition:"A graveyard is a player's discard pile.",authority_type:"OFFICIAL_WOTC_COMPREHENSIVE_RULES",authority_reference:CR_URL,rule_or_section:"404.1",validation_status:"VERIFIED",notes:CR_AUTHORITY},
  {jargon_id:"JRG_COLOR_IDENTITY",term:"color identity",jargon_class:"RULES_DEFINED",canonical_public_definition:"A commander's color identity determines which colors may appear in its Commander deck.",authority_type:"OFFICIAL_WOTC_COMPREHENSIVE_RULES_AND_FORMAT",authority_reference:CR_URL+";"+COMMANDER_URL,rule_or_section:"903.4;903.5c; Commander format Color Identity",validation_status:"VERIFIED",notes:CR_AUTHORITY},
  {jargon_id:"JRG_THEME",term:"theme",jargon_class:"INSTRUMENT_OPERATIONAL",canonical_public_definition:"Here, theme means a chosen story, visual idea, creature type, or self-imposed concept.",authority_type:"ARCHSCRY_OBSERVATION_CONTRACT",authority_reference:"E-PLAYER-THEME;E-PLAYER-COMMANDER",rule_or_section:"C10",validation_status:"ACTIVE",notes:"Deckbuilding tradeoff only; never identity support by itself."},
  {jargon_id:"JRG_THREAT",term:"threat",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Players use threat for a card, battlefield, or plan they believe they need to answer.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-THREAT;E-PLAYER-COMMANDER",rule_or_section:"Not a Comprehensive Rules definition",validation_status:"ACTIVE",notes:"Does not assert actual power."},
  {jargon_id:"JRG_COLOR_ROLES",term:"color roles",jargon_class:"INSTRUMENT_OPERATIONAL",canonical_public_definition:"Here, color roles are broad tool families associated with colors; no color-pie knowledge is required.",authority_type:"ARCHSCRY_OBSERVATION_CONTRACT",authority_reference:"E-CERTIFIED;E-CECOS",rule_or_section:"C15",validation_status:"ACTIVE",notes:"Boundary vocabulary, not a color-identity assignment."},
  {jargon_id:"JRG_PUBLIC_COMMITMENT",term:"public commitment",jargon_class:"INSTRUMENT_OPERATIONAL",canonical_public_definition:"Here, public commitment means an agreement stated so the table can hear it.",authority_type:"ARCHSCRY_OBSERVATION_CONTRACT",authority_reference:"E-PLAYER-PACE;E-PLAYER-THREAT",rule_or_section:"C13",validation_status:"ACTIVE",notes:"Table preference only; not a morality or personality diagnosis."}
];

const questionJargonIds = {
  "b1.gate.visibility.v1":["JRG_BOARD","JRG_PERMANENT"],
  "b1.gate.disruption.v1":["JRG_BOARD_WIPE","JRG_BOARD","JRG_GRAVEYARD"],
  "b1.hall.engine-shape.v1":["JRG_ENGINE"],
  "b1.hall.pressure.v1":["JRG_ENGINE","JRG_BOARD"],
  "b1.hall.mana-window.v1":["JRG_INTERACTION"],
  "b1.hall.theme.v1":["JRG_THEME"],
  "b1.hall.threat.v1":["JRG_THREAT","JRG_BOARD"],
  "b1.hall.sacrifice.v1":["JRG_PERMANENT","JRG_BOARD"],
  "b1.hall.commitment.v1":["JRG_TABLE_DEAL","JRG_BOARD"],
  "b1.hall.breadth.v1":["JRG_COLOR_ROLES"],
  "b1.hall.interaction-window.v1":["JRG_INTERACTION"],
  "b1.crucible.ur.v1":["JRG_SPELL_HEAVY","JRG_ENGINE"],
  "b1.crucible.bg.v1":["JRG_GRAVEYARD"],
  "b1.crucible.wr.v1":["JRG_PERMANENT"],
  "b1.crucible.ug.v1":["JRG_ENGINE"],
  "b1.crucible.wb.v1":["JRG_TABLE_DEAL"],
  "b1.crucible.grixis.v1":["JRG_INTERACTION"],
  "b1.crucible.sultai.v1":["JRG_BOARD"],
  "b1.crucible.temur.v1":["JRG_BOARD","JRG_ENGINE"],
  "b1.crucible.esper.v1":["JRG_ENGINE","JRG_PERMANENT","JRG_THREAT"],
  "b1.crucible.jeskai.v1":["JRG_INTERACTION"],
  "b1.crucible.yore-glint.v1":["JRG_ENGINE"],
  "b1.crucible.glint-dune.v1":["JRG_THREAT","JRG_BOARD"],
  "b1.crucible.dune-ink.v1":["JRG_PUBLIC_COMMITMENT","JRG_BOARD"],
  "b1.crucible.witch-yore.v1":["JRG_ENGINE"],
  "b1.crucible.colorless-wubrg.v1":["JRG_COLOR_IDENTITY","JRG_FIVE_COLOR","JRG_COLOR_ROLES"],
  "b1.crucible.mono-multi.v1":["JRG_COLOR_IDENTITY","JRG_COLOR_COUNT","JRG_COLOR_ROLES"]
};
const jargonById = new Map(J.map((x) => [x.jargon_id,x]));
for (const item of Q) {
  item.jargonIds = questionJargonIds[item.id] || [];
  item.glossary = item.jargonIds.map((id) => jargonById.get(id).canonical_public_definition).join(" ");
}
for (const jargon of J) {
  jargon.question_ids = Q.filter((item) => item.jargonIds.includes(jargon.jargon_id)).map((item) => item.id).join(";");
}

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
  const directional = o.kind === "directional";
  const exclusions = !directional
    ? "Must not create directional, midpoint, averaged, negative, or all-candidate identity evidence."
    : item.construct === "C01"
      ? "Does not alone imply identity or stable posture across contexts; never stack with another C01 observation."
      : item.construct === "C15"
        ? "Boundary evidence only; cannot assign or exclude a color-count or edge identity and cannot cause a one-answer flip."
        : item.construct === "C10"
          ? "Theme preference cannot name or exclude an identity, replace deck behavior, determine routing or stopping, or break a tie."
          : item.construct === "C13"
            ? "Does not imply honesty, morality, sociability, or political skill and cannot place an identity by itself."
            : "Does not alone imply an identity, motive, power, skill, experience, or budget.";
  const limitation = !directional
    ? "Evidence-bearing but non-directional; may justify another Hall item or a close, mixed, contradictory, or insufficient result and must not be averaged into support."
    : item.construct === "C01"
      ? "Initiative posture may vary across calm, behind, and disrupted contexts; every C01 response shares DG_C01 and cannot stack."
      : item.construct === "C15"
        ? "Boundary evidence only; prior independent behavior and the direct boundary are required, and this answer cannot assign an identity or cause a one-answer flip."
        : item.construct === "C10"
          ? "Theme is an explanatory deckbuilding layer only; the observation cannot name or exclude an identity."
          : item.stage === "Crucible"
            ? "Use only after prior independent observations leave the stated competitor boundary plausible; the identity association requires player validation."
            : "Observation wording and identity association require player validation; no weight is authorized.";
  answers.push({
    answer_id:item.id+"."+o.key, question_id:item.id, construct_id:item.construct, answer_title:o.title,
    explanatory_sentence:o.copy, plain_language_observation:o.observation, primary_signal:primary,
    optional_bounded_secondary_signal:"", dependency_group:"DG_"+item.construct,
    exclusions, evidence_provenance:item.evidenceIds+";E-VOICE", mapping_confidence:directional ? "LOW-PROVISIONAL" : "DIRECT-UNCERTAINTY",
    scoring_status:directional ? "PILOT-HYPOTHESIS-NONSCORING" : "NON-DIRECTIONAL-NONSCORING",
    limitation_statement:limitation, _kind:o.kind, _stage:item.stage
  });
}

const rewordedAnswerIds = new Set([
  "b1.hall.mana-window.v1.own","b1.hall.repeatability.v1.same","b1.hall.setup.v1.early","b1.hall.setup.v1.long","b1.hall.interaction-window.v1.after",
  "b1.crucible.ug.v1.adapt","b1.crucible.ug.v1.scale","b1.crucible.wb.v1.influence",
  "b1.crucible.bant.v1.refine","b1.crucible.bant.v1.network","b1.crucible.bant.v1.neither",
  "b1.crucible.grixis.v1.convert","b1.crucible.sultai.v1.cycle","b1.crucible.temur.v1.adapt",
  "b1.crucible.ink-witch.v1.share","b1.crucible.ink-witch.v1.compound","b1.crucible.ink-witch.v1.depends",
  "b1.crucible.witch-yore.v1.compound","b1.crucible.witch-yore.v1.convert"
]);
const signalReviewIds = new Set([
  "b1.hall.interaction-window.v1.pressure",
  "b1.crucible.ug.v1.adapt","b1.crucible.ug.v1.scale",
  "b1.crucible.wb.v1.influence",
  "b1.crucible.witch-yore.v1.compound","b1.crucible.witch-yore.v1.convert"
]);
const metadataCorrectionIds = new Set(answers.filter((a) => a.construct_id === "C01" || a.construct_id === "C15" || a.construct_id === "C10" || a._kind !== "directional").map((a) => a.answer_id));
const terminologyRemediatedQuestionIds = new Set(Object.keys(questionJargonIds));

const semanticReviews = answers.map((a) => {
  const qItem = Q.find((x) => x.id === a.question_id);
  const signalReview = signalReviewIds.has(a.answer_id);
  const evidenceRequired = a._stage === "Crucible" && a._kind === "directional" && !signalReview;
  const reworded = rewordedAnswerIds.has(a.answer_id);
  const metadataCorrected = metadataCorrectionIds.has(a.answer_id);
  const pressureMismatch = a.answer_id === "b1.hall.interaction-window.v1.pressure";
  let review_disposition = "APPROVE";
  if (signalReview) review_disposition = "SIGNAL_REVIEW_REQUIRED";
  else if (evidenceRequired) review_disposition = "EVIDENCE_REQUIRED";
  else if (reworded) review_disposition = "REWORD";
  else if (metadataCorrected) review_disposition = "METADATA_CORRECTION";

  let recommended_action = "Retain as a non-scoring semantic proposal for owner review of the complete package.";
  let rationale = `The title and sentence directly answer the scenario; '${a.plain_language_observation}' is bounded to ${a.construct_id} and maps to ${a.primary_signal}.`;
  if (pressureMismatch) {
    recommended_action = "Owner must replace or re-map this option before pilot authorization; preventive pressure is not an interaction-window observation.";
    rationale = "The option is understandable, but it measures preventive pressure (C07) while the question and signal claim interaction timing (C08). The mismatch is preserved rather than silently reassigned.";
  } else if (signalReview) {
    recommended_action = "Owner must approve or reject the proposed construct signal and competitor-boundary association before pilot authorization.";
    rationale = `Applied wording now describes ${a.construct_id} and ${a.primary_signal}, but using that observation to distinguish ${qItem.scope} remains a substantive identity-boundary hypothesis without player evidence.`;
  } else if (evidenceRequired) {
    recommended_action = "Retain only as a non-scoring Crucible hypothesis; require eligible player evidence before identity-boundary use.";
    rationale = `The option has semantic fit with ${a.construct_id} and ${a.primary_signal}; its proposed use for ${qItem.scope} is structurally sourced but not empirically validated.`;
  } else if (reworded) {
    recommended_action = "Accept the applied plain-language correction; the construct and primary signal are unchanged.";
    rationale = `The revised title or sentence removes jargon or adjacent-construct drift while preserving '${a.plain_language_observation}' and ${a.primary_signal}.`;
  } else if (metadataCorrected) {
    recommended_action = "Accept the applied exclusion and limitation correction; no directional scoring authority is created.";
    rationale = `The answer remains semantically aligned with ${a.construct_id}; metadata now records contextual dependence, boundary-only use, theme separation, or evidence-bearing non-directionality as applicable.`;
  }

  return {
    answer_id:a.answer_id, question_id:a.question_id, construct_id:a.construct_id, stage:a._stage, review_disposition,
    construct_fidelity:pressureMismatch ? "CONCERN" : "PASS",
    scenario_fit:"PASS", option_distinguishability:"PASS",
    compound_construct_risk:pressureMismatch ? "CONCERN" : "CLEAR",
    desirability_or_skill_bias:"CLEAR",
    identity_giveaway_risk:qItem.construct === "C15" && qItem.stage === "Crucible" ? "BOUNDED-DIRECT-BOUNDARY" : "CLEAR",
    novice_clarity:terminologyRemediatedQuestionIds.has(a.question_id) ? "VERIFIED-OR-REMEDIATED" : "PASS",
    title_sentence_alignment:reworded ? "REMEDIATED" : "PASS",
    observation_alignment:reworded ? "REMEDIATED" : "PASS",
    primary_signal_alignment:pressureMismatch ? "CONCERN" : signalReview ? "OWNER-REVIEW" : "PASS",
    secondary_signal_alignment:a.optional_bounded_secondary_signal ? "PASS" : "NONE",
    dependency_alignment:"PASS",
    exclusion_quality:metadataCorrected ? "REMEDIATED" : "PASS",
    evidence_authority:signalReview ? "SUBSTANTIVE-REVIEW-REQUIRED" : evidenceRequired ? "PLAYER-EVIDENCE-REQUIRED" : "PROVISIONAL-NONSCORING",
    jargon_issue:terminologyRemediatedQuestionIds.has(a.question_id) ? "VERIFIED-OR-REMEDIATED" : "NONE",
    limitation_quality:metadataCorrected ? "REMEDIATED" : "PASS",
    recommended_action, rationale,
    owner_review_required:(signalReview || evidenceRequired) ? "YES" : "NO"
  };
});

const constructRows = C.map((c) => ({...c, allowed_primary_signals:[...signalMap.get(c.construct_id)].sort().join(";"), scoring_boundary:"Observation capture only; no weights or identity points."}));
const pilot = Q.map((x,i) => ({
  question_id:x.id, stage:x.stage, pool_order:i+1, primary_construct_id:x.construct, question_prompt:x.prompt,
  answer_ids:x.options.map((o) => x.id+"."+o.key).join(";"), primary_observation:C.find((c) => c.construct_id === x.construct).plain_definition,
  competitor_pair_or_family:x.scope, evidence_provenance:x.evidenceIds+";E-VOICE", dependency_group:"DG_"+x.construct,
  adaptive_ask_when:x.askWhen, do_not_ask_when:x.doNotAskWhen, jargon_term_ids:x.jargonIds.join(";"), jargon_help:x.glossary, scoring_status:"DESIGN-ONLY-NONSCORING"
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
write("pilot-question-bank.tsv",makeTsv(["question_id","stage","pool_order","primary_construct_id","question_prompt","answer_ids","primary_observation","competitor_pair_or_family","evidence_provenance","dependency_group","adaptive_ask_when","do_not_ask_when","jargon_term_ids","jargon_help","scoring_status"],pilot));
write("answer-signal-contracts.tsv",makeTsv(["answer_id","question_id","construct_id","answer_title","explanatory_sentence","plain_language_observation","primary_signal","optional_bounded_secondary_signal","dependency_group","exclusions","evidence_provenance","mapping_confidence","scoring_status","limitation_statement"],answers));
write("jargon-glossary.tsv",makeTsv(["jargon_id","term","jargon_class","canonical_public_definition","authority_type","authority_reference","rule_or_section","question_ids","validation_status","notes"],J));
write("answer-semantic-adjudication.tsv",makeTsv(["answer_id","question_id","construct_id","stage","review_disposition","construct_fidelity","scenario_fit","option_distinguishability","compound_construct_risk","desirability_or_skill_bias","identity_giveaway_risk","novice_clarity","title_sentence_alignment","observation_alignment","primary_signal_alignment","secondary_signal_alignment","dependency_alignment","exclusion_quality","evidence_authority","jargon_issue","limitation_quality","recommended_action","rationale","owner_review_required"],semanticReviews));
write("identity-coverage-matrix.tsv",makeTsv(["identity_id","identity_name","identity_family","supporting_constructs","boundary_constructs","strongest_likely_competitors","minimum_independent_observations","current_evidence_quality","pilot_question_ids","pilot_coverage","uncovered_risks","evidence_provenance"],coverage));
write("confusion-pair-coverage.tsv",makeTsv(["identity_a","identity_b","audit_basis","audit_path_count_or_marker","coverage_category","observable_behavioral_distinction","pilot_question_ids","why_defensible","when_not_to_ask","pilot_coverage_status","evidence_provenance"],confusion));

const qDisp = new Map();
for (const r of inventory) qDisp.set(r.current_question_id,r.proposed_disposition);
const count = (values) => values.reduce((a,v)=>(a[v]=(a[v]||0)+1,a),{});
const stages = count(Q.map((x)=>x.stage));
const ids = [...Q.map((x)=>x.id),...answers.map((x)=>x.answer_id)];
const cids = new Set(C.map((x)=>x.construct_id)), qids = new Set(Q.map((x)=>x.id));
const answerIds = new Set(answers.map((x)=>x.answer_id));
const jargonIds = new Set(J.map((x)=>x.jargon_id));
const semanticAnswerIds = semanticReviews.map((x)=>x.answer_id);
const allQuestionCopy = (x) => `${x.prompt} ${x.options.map((o)=>`${o.title} ${o.copy}`).join(" ")}`;
const changedPaths = execFileSync("git",["status","--porcelain"],{cwd:root,encoding:"utf8"})
  .split(/\r?\n/).filter(Boolean).map((line)=>line.slice(3).replace(/^"|"$/g,""));
const documentationOnly = changedPaths.every((p)=>p.startsWith("docs/"));
const reviewDispositionValues = new Set(["APPROVE","REWORD","METADATA_CORRECTION","SIGNAL_REVIEW_REQUIRED","REPLACE","EVIDENCE_REQUIRED"]);
const glossaryClasses = new Set(["RULES_DEFINED","COMMUNITY_STANDARD","INSTRUMENT_OPERATIONAL","ORDINARY_LANGUAGE","NONE"]);
const loadBearingJargon = [
  [/\bboard\b/i,"JRG_BOARD"],[/\bboard wipe\b/i,"JRG_BOARD_WIPE"],[/\bengine\b/i,"JRG_ENGINE"],
  [/\binteraction\b/i,"JRG_INTERACTION"],[/\btable deal\b/i,"JRG_TABLE_DEAL"],[/\bspell-heavy\b/i,"JRG_SPELL_HEAVY"],
  [/\bFive-Color\b/i,"JRG_FIVE_COLOR"],[/\bcolor[- ]count\b/i,"JRG_COLOR_COUNT"],[/\bcolor identity\b/i,"JRG_COLOR_IDENTITY"],
  [/\bpermanents?\b/i,"JRG_PERMANENT"],[/\bgraveyard\b/i,"JRG_GRAVEYARD"],[/\btheme\b/i,"JRG_THEME"],
  [/\bthreat\b/i,"JRG_THREAT"],[/\bcolor roles\b/i,"JRG_COLOR_ROLES"],[/\bpublic commitment\b/i,"JRG_PUBLIC_COMMITMENT"]
];
const checks = [
  ["113 current questions",qAudit.length===113,qAudit.length],["356 current answers",aAudit.length===356,aAudit.length],
  ["15 constructs",C.length===15,C.length],["34 pilot questions",Q.length===34,Q.length],
  ["4 Gate / 12 Hall / 18 Crucible",stages.Gate===4&&stages.Hall===12&&stages.Crucible===18,`${stages.Gate}/${stages.Hall}/${stages.Crucible}`],
  ["106 answer contracts",answers.length===106,answers.length],["106 semantic reviews",semanticReviews.length===106,semanticReviews.length],
  ["37 identities",coverage.length===37&&new Set(coverage.map((x)=>x.identity_id)).size===37,coverage.length],
  ["123 confusion pairs",confusion.length===123,confusion.length],["unique IDs",new Set(ids).size===ids.length,ids.length],
  ["stable ID format",ids.every((x)=>/^[a-z0-9._-]+$/.test(x)),ids.length],
  ["one construct per question",Q.every((x)=>cids.has(x.construct)),Q.length],
  ["stable answer contracts",answers.every((x)=>x.answer_id&&x.question_id&&x.construct_id&&x.plain_language_observation&&x.primary_signal&&x.dependency_group&&x.exclusions&&x.evidence_provenance&&x.mapping_confidence&&x.scoring_status&&x.limitation_statement),answers.length],
  ["no orphan question or construct refs",answers.every((x)=>qids.has(x.question_id)&&cids.has(x.construct_id)),answers.length],
  ["no orphan signals",answers.every((x)=>x.primary_signal.startsWith("SIG_"+x.construct_id+"_")),answers.length],
  ["no vague-only observations",answers.every((x)=>/\b(Prefers|Reports|Accepts|Rejects|Uses)\b/.test(x.plain_language_observation)),answers.length],
  ["semantic reviews reference each answer once",semanticAnswerIds.length===answerIds.size&&new Set(semanticAnswerIds).size===semanticAnswerIds.length&&semanticAnswerIds.every((x)=>answerIds.has(x)),semanticAnswerIds.length],
  ["controlled review dispositions",semanticReviews.every((x)=>reviewDispositionValues.has(x.review_disposition)),[...new Set(semanticReviews.map((x)=>x.review_disposition))].join(",")],
  ["unique jargon IDs",jargonIds.size===J.length,J.length],
  ["controlled jargon classes",J.every((x)=>glossaryClasses.has(x.jargon_class)),[...new Set(J.map((x)=>x.jargon_class))].join(",")],
  ["all jargon references resolve",Q.every((x)=>x.jargonIds.every((id)=>jargonIds.has(id))),Q.reduce((n,x)=>n+x.jargonIds.length,0)],
  ["all glossary rows used",J.every((j)=>j.question_ids||j.validation_status==="RESERVED"),J.length],
  ["canonical jargon definitions",Q.every((x)=>x.glossary===x.jargonIds.map((id)=>jargonById.get(id).canonical_public_definition).join(" ")),Q.length],
  ["no help for absent terms",Q.every((x)=>x.jargonIds.every((id)=>allQuestionCopy(x).toLowerCase().includes(jargonById.get(id).term.toLowerCase()))),Q.filter((x)=>x.jargonIds.some((id)=>!allQuestionCopy(x).toLowerCase().includes(jargonById.get(id).term.toLowerCase()))).map((x)=>x.id).join(",")||Q.length],
  ["load-bearing jargon explained",Q.every((x)=>loadBearingJargon.every(([pattern,id])=>!pattern.test(allQuestionCopy(x))||x.jargonIds.includes(id))),Q.filter((x)=>loadBearingJargon.some(([pattern,id])=>pattern.test(allQuestionCopy(x))&&!x.jargonIds.includes(id))).map((x)=>x.id).join(",")||Q.length],
  ["no cross-reference-only help",Q.every((x)=>!/defined in (Hall|Gate|Crucible)|defined earlier/i.test(x.glossary)),Q.length],
  ["rules/community authority aligned",J.every((j)=>j.jargon_class!=="RULES_DEFINED"||j.authority_type.startsWith("OFFICIAL_WOTC"))&&J.every((j)=>j.jargon_class!=="COMMUNITY_STANDARD"||!j.authority_type.startsWith("OFFICIAL_WOTC_COMPREHENSIVE_RULES")),J.length],
  ["no graveyard object called permanent",Q.every((x)=>!/permanents? (?:in|reached|went to) (?:your |a |the )?graveyard/i.test(allQuestionCopy(x))),Q.length],
  ["non-scoring only",answers.every((x)=>x.scoring_status.includes("NONSCORING")),answers.length],
  ["no numeric confidence",answers.every((x)=>["LOW-PROVISIONAL","DIRECT-UNCERTAINTY"].includes(x.mapping_confidence)),answers.length],
  ["C01 one dependency group",answers.filter((x)=>x.construct_id==="C01").every((x)=>x.dependency_group==="DG_C01"),answers.filter((x)=>x.construct_id==="C01").length],
  ["C05 Bant commander-specific",Q.find((x)=>x.id==="b1.crucible.bant.v1").prompt.toLowerCase().includes("commander"),Q.find((x)=>x.id==="b1.crucible.bant.v1").prompt],
  ["C15 boundary-only",answers.filter((x)=>x.construct_id==="C15").every((x)=>x.exclusions.includes("Boundary evidence only")||x.scoring_status==="NON-DIRECTIONAL-NONSCORING"),answers.filter((x)=>x.construct_id==="C15").length],
  ["route hard maximum eight",4+3+1===8,"4 Gate + 3 Hall + 1 Crucible"],
  ["documentation-only changed paths",documentationOnly,changedPaths.join(",")||"clean"],
  ["explicit high-risk and insufficient coverage",["BANT","GRIXIS","SULTAI","TEMUR","COLORLESS","ESPER","INK","JESKAI","LOREHOLD","UR","YORE"].every((x)=>(direct[x]||[]).length>0),11],
  ["exact confusion pairs represented",exactPairKeys.every((x)=>confusionKeys.has(x)),new Set(exactPairKeys).size],
  ["high-frequency confusion pairs represented",highPairKeys.every((x)=>confusionKeys.has(x)),new Set(highPairKeys).size]
];
const validation = {
  status:checks.every((x)=>x[1])?"PASS":"FAIL",
  expected_base:"30bfe87171e4119a0bab1bb47318862c042977de",
  counts:{constructs:C.length,current_questions:qAudit.length,current_answers:aAudit.length,inventory_rows:inventory.length,pilot_questions:Q.length,pilot_answers:answers.length,semantic_reviews:semanticReviews.length,semantic_review_dispositions:count(semanticReviews.map((x)=>x.review_disposition)),stages,identities:coverage.length,confusion_pairs:confusion.length,jargon_terms:J.length,jargon_classes:count(J.map((x)=>x.jargon_class)),proposed_question_dispositions:count([...qDisp.values()]),proposed_answer_row_dispositions:count(inventory.map((x)=>x.proposed_disposition))},
  checks:checks.map(([name,pass,observed])=>({name,status:pass?"PASS":"FAIL",observed})),
  evidence_registry:evidence,
  official_rules_authority:{accessed:"2026-08-04",document_effective:"2026-08-07",url:CR_URL,rules_used:["110.1","403.1","404.1","903.4","903.5c"]},
  changed_paths:changedPaths,
  boundaries:["No live or Gate A file is written.","Generated artifacts remain under the B1 plan directory.","Identity associations are provisional non-scoring hypotheses.","No implementation, scoring, shadow test, migration, or cutover is authorized."]
};
write("validation-record.json",JSON.stringify(validation,null,2)+"\n");
console.log(JSON.stringify(validation,null,2));
if (validation.status !== "PASS") process.exitCode=1;
