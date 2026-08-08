import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../../..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const write = (p, value) => fs.writeFileSync(path.join(dir, p), value.replace(/\r\n/g, "\n"), "utf8");
const writeRoot = (p, value) => fs.writeFileSync(path.join(root, p), value.replace(/\r\n/g, "\n"), "utf8");
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

function tsv(text) {
  const lines = text.replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const heads = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const cells = line.split("\t");
    return Object.fromEntries(heads.map((head, index) => [head, cells[index] ?? ""]));
  });
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
  ["C15","Deck breadth and constraint","Preference for how much of the deckbuilding boundary should come from the available card pool versus restrictions the builder chooses within broader access.","Work within an imposed limited card pool, or begin with broad access and choose the deck's boundaries yourself.","Colorless, Five-Color, theme, skill, complexity, budget, or power by itself.","all; mono/multicolor; four-color; Colorless; WUBRG","Colorless/WUBRG; mono/multicolor; four-color/WUBRG","E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CERTIFIED;E-CECOS","Hall/Crucible","A boundary observation only; imposed limits and self-chosen limits must remain distinct; overlaps C09/C10."],
  ["C16","Information-to-plan conversion","After interaction or new card access creates several viable options, preference to consolidate one route, retain broad optionality, or exploit the current opening.","After a dangerous play is stopped and new cards create several workable plans, choose one route, keep several open, or act on the immediate opportunity.","Intelligence, optimization, control skill, threat-assessment skill, knowledge level, combo preference, archetype, motive, or Esper philosophy.","all; Blue; Black; Azorius; Dimir; Esper; Grixis; Jeskai; control; combo; toolbox; midrange; tempo","Esper/U; Esper/B; Esper/WU; Esper/UB; Esper/Grixis; Esper/Jeskai","E-CERTIFIED;E-PLAYER-PACE;E-PLAYER-THREAT;E-PLAYER-VARIANCE;E-CECOS; targeted player comprehension and false-positive evidence","Hall","DG_C16 is independent of C01/C04/C06/C08/C09/C14/C15. C16 starts only after options exist: it records route commitment, not initiative, payoff rhythm, engine structure, interaction timing, cross-game repeatability, setup horizon, or deckbuilding breadth."]
].map(([construct_id,name,plain_definition,commander_example,does_not_mean,applicable_identity_families,likely_confusion_pairs,required_evidence,stage,dependency_overlap]) => ({construct_id,name,plain_definition,commander_example,does_not_mean,applicable_identity_families,likely_confusion_pairs,required_evidence,stage,dependency_overlap}));

const opt = (key,title,copy,observation,suffix,kind="directional") => ({key,title,copy,observation,suffix,kind});
const q = (id,stage,construct,prompt,scope,evidenceIds,askWhen,doNotAskWhen,glossary,options) => ({id,stage,construct,prompt,scope,evidenceIds,askWhen,doNotAskWhen,glossary,options});
const Q = [
  q("b1.gate.initiative.v1","Gate","C01","Your turn begins, no urgent threat needs an answer, and you have enough mana to act. What feels best?","all identities","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Always; Gate 1.","Never use alone for identity support.","",[
    opt("advance","Set the pace","Commit resources to my plan and make the table respond.","Prefers proactive development on an open turn.","PROACTIVE"),
    opt("balance","Advance with a safeguard","Develop my plan while keeping one practical answer.","Prefers mixed development with bounded response.","BALANCED"),
    opt("respond","Keep options open","Wait, watch the turn develop, and answer the important move.","Prefers reactive optionality on an open turn.","REACTIVE"),
    opt("unsure","I do not know yet","I have not played enough different decks to have a stable preference.","Reports insufficient experience for this construct.","UNKNOWN","unknown")]),
  q("b1.gate.visibility.v1","Gate","C02","As play comes back around to you, which position usually feels more comfortable?","all identities","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Always; Gate 2.","Do not infer actual threat level.","Board means the cards and tokens on the battlefield.",[
    opt("board","A board people can see","Creatures or other permanents are already doing useful work.","Prefers visible battlefield resources.","VISIBLE"),
    opt("held","Resources in reserve","Cards in hand and mana remain available until their use is clear.","Prefers held or less visible resources.","HELD"),
    opt("split","Some of each","A useful board is present with at least one option held back.","Prefers a mixed visible/held position.","MIXED"),
    opt("depends","That depends on the deck","My decks require such different positions that I cannot name one preference.","Reports genuine deck-conditionality.","CONDITIONAL","conditional")]),
  q("b1.gate.disruption.v1","Gate","C03","A board wipe—an effect that removes many cards and tokens from the battlefield—is likely next turn. What would you rather have prepared?","all identities","E-PLAYER-PACE;E-PLAYER-COMMANDER;E-CECOS","Always; Gate 3.","Do not treat the answer as proof the deck is resilient.","A graveyard is a player's discard pile.",[
    opt("protect","A way to keep the board","Protection or a response lets important pieces survive.","Prefers protection before broad disruption.","PROTECT"),
    opt("recover","A way to rebuild","The board can go if hand or graveyard resources restore it.","Prefers recovery after broad disruption.","RECOVER"),
    opt("limit","Less exposed in the first place","Commit fewer important pieces before the wipe.","Prefers reduced exposure to broad disruption.","LIMIT_EXPOSURE"),
    opt("depends","No usual answer","Preparation changes too much with the deck and known cards.","Reports scenario-conditionality.","CONDITIONAL","conditional")]),
  q("b1.gate.tempo.v1","Gate","C04","When your Commander deck is doing what you built it to do, how do you want the advantage to arrive?","all identities","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Always; Gate 4.","Do not infer game length or ending mode.","",[
    opt("small","A little every turn","Repeated small gains keep the deck moving.","Prefers incremental advantage.","INCREMENTAL"),
    opt("burst","One turn that changes the game","Prepare for a concentrated payoff.","Prefers a concentrated payoff turn.","CONCENTRATED"),
    opt("waves","Several distinct surges","Build, spend momentum, and build again.","Prefers cyclical advantage.","CYCLICAL"),
    opt("depends","No stable preference","Different decks make different rhythms enjoyable.","Reports no stable payoff-rhythm preference.","CONDITIONAL","conditional")]),
  q("b1.hall.commander-role.v1","Hall","C05","If your commander is removed twice, what should the rest of the deck still be able to do?","commander-centric versus resilient 99","E-PLAYER-COMMANDER;E-CECOS","Ask when commander reliance could separate remaining candidates.","Do not test commander affection or deck quality.","",[
    opt("function","Run the main plan","The deck should execute its plan without the commander.","Prefers a resilient 99.","RESILIENT_99"),
    opt("partial","Keep playing, less efficiently","The commander improves the plan but its loss does not stop meaningful turns.","Prefers commander relevance without binary dependence.","ROLE_PLAYER"),
    opt("center","Protect and recast the centerpiece","The deck may change sharply when the commander is unavailable.","Accepts high commander dependence.","CENTERPIECE")]),
  q("b1.hall.engine-shape.v1","Hall","C06","When a card that repeatedly helps your deck is removed, what do you want the rest of the deck to have behind it?","engine families","E-PLAYER-COMMANDER;E-PLAYER-VARIANCE;E-CECOS","Ask when candidates differ in engine concentration.","Do not ask without showing the engine definition.","An engine is a card or group of cards that repeatedly helps your deck—for example by drawing cards, making mana or tokens, or building counters.",[
    opt("replace","Another piece does the same job","Several cards can replace one another.","Prefers redundant replaceable pieces.","REDUNDANT"),
    opt("overlap","Several small engines overlap","Pieces remain useful alone and combine in different ways.","Prefers modular overlapping engines.","MODULAR"),
    opt("central","One engine is worth defending","A central piece can be found and protected.","Accepts concentrated engine dependency.","CENTRAL")]),
  q("b1.hall.pressure.v1","Hall","C07","Which kind of progress makes your deck feel like it’s doing its job?","combat, resource-control, and engine-ending families","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Ask when candidate families use different pressure channels.","Do not ask as a power or fairness question.","An engine is a card or group of cards that repeatedly helps your deck—for example by drawing cards, making mana or tokens, or building counters.",[
    opt("combat","Life totals are under pressure","Attacks and combat damage make opponents respond.","Prefers combat pressure.","COMBAT"),
    opt("resources","Options are getting narrower","Cards, mana, or board access become harder to use.","Prefers resource-control pressure.","RESOURCE_CONTROL"),
    opt("engine","A noncombat ending is assembling","The table can see an engine approaching an ending.","Prefers noncombat engine pressure.","NONCOMBAT_ENGINE")]),
  q("b1.hall.mana-window.v1","Hall","C08","If you can either spend most of your mana advancing your own plan or keep it available to answer opponents, which do you prefer?","Blue, Azorius, Esper, Jeskai, and cadence boundaries","E-PLAYER-PACE;E-PLAYER-THREAT;E-CECOS","Ask when Gate initiative leaves families close.","Do not count independently from C01 when both describe one cadence.","Interaction means an answer to another player's spell, ability, attack, or permanent.",[
    opt("own","Develop on my turn","Use the mana now to improve my battlefield or advance my main plan.","Prefers own-turn commitment.","OWN_TURN"),
    opt("others","Hold mana for opponents' turns","Keep options available until the important action appears.","Prefers opponent-turn windows.","OPPONENT_TURN"),
    opt("split","Use some and keep some","Take a smaller development step with one answer available.","Prefers split commitment.","SPLIT")]),
  q("b1.hall.repeatability.v1","Hall","C09","Across several games with the same deck, how much do you want the path to your main plan to repeat?","all identities","E-PLAYER-VARIANCE;E-PLAYER-PACE;E-CECOS","Ask when candidates differ in repeatability.","Do not reduce the answer to tutor count.","",[
    opt("same","The central plan appears often","Several cards can help the deck reach its intended plan consistently.","Prefers consistent access to a plan.","CONSISTENT"),
    opt("varied","The route changes each game","See the central plan less often in exchange for different games.","Prefers variance and novelty.","VARIANT"),
    opt("toolbox","The plan stays, the tool changes","Keep a dependable goal with different answers and subplans.","Prefers stable purpose with variable execution.","TOOLBOX")]),
  q("b1.hall.theme.v1","Hall","C10","For one deck slot, assume you can’t get both: one card fits your theme better, while another does the same job more reliably. Which do you keep?","theme-first players; all identities","E-PLAYER-THEME;E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CECOS","Ask when attachment may explain contradictory behavior answers.","Do not use alone for identity support.","Theme means a chosen story, visual idea, creature type, or self-imposed concept.",[
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
  q("b1.hall.setup.v1","Hall","C14","Early in the game, how much do you want your setup plays to matter right away?","Witch, Temur, Sultai, and engine families","E-PLAYER-PACE;E-PLAYER-COMMANDER;E-CECOS","Ask when candidates differ in development horizon.","Do not interpret as game length or patience.","",[
    opt("early","Matter immediately","Even my setup cards should affect the board or give me useful options now.","Prefers setup plays with immediate impact.","EARLY_IMPACT"),
    opt("long","Build first, pay off later","I’m comfortable spending several turns mostly preparing the main plan.","Accepts several turns of mostly preparatory setup.","LONG_SETUP"),
    opt("staged","Build in stages","Setup can take time, but each step should give me something useful along the way.","Prefers staged setup with useful intermediate returns.","STAGED")]),
  q("b1.hall.breadth.v1","Hall","C15","Once you know what you want a deck to do, how much do you want the available cards to shape the challenge?","mono/multicolor; four-color; Colorless; WUBRG","E-PLAYER-COMMANDER;E-PLAYER-PACE;E-CERTIFIED;E-CECOS","Ask when color-count families remain plausible after behavior evidence.","Never assign a color-count identity from this answer.","Available cards means the cards permitted by the format and the commander's color identity before the builder adds a theme or other self-chosen rule.",[
    opt("narrow","Let the limits shape it","A smaller or restricted pool makes finding the solution part of the fun.","Prefers an imposed card-pool challenge.","NARROW"),
    opt("broad","Keep more tools available","I prefer having more options available, then choosing which ones belong in the plan.","Prefers broad access followed by self-chosen boundaries.","BROAD"),
    opt("concept","Let the concept decide","Some ideas are better with tight limits; others need broader access.","Reports concept-conditional card-pool breadth.","CONDITIONAL","conditional")]),
  q("b1.hall.interaction-window.v1","Hall","C08","An opponent is building toward the action most likely to decide the game. When should your interaction matter?","reactive/proactive boundary families","E-PLAYER-THREAT;E-PLAYER-PACE;E-CECOS","Ask only if C08 remains unresolved.","Never count independently from b1.hall.mana-window.v1.","Interaction means an answer to another player's spell, ability, attack, or permanent.",[
    opt("before","Before the decisive action begins","Stop an enabling spell or ability before the opponent commits the decisive action.","Prefers an early interaction window.","EARLY_WINDOW"),
    opt("after","After the piece is visible","Answer it once its effect on the game is clear.","Prefers a later visible interaction window.","LATE_WINDOW"),
    opt("pressure","As they commit","Answer when the opponent commits the mana, card, or attack that makes the action decisive.","Prefers the opponent-commitment interaction window.","COMMIT_WINDOW")]),
  q("b1.hall.information-to-plan.v1","Hall","C16","A dangerous opposing play has been stopped, and you now have enough cards to choose among several workable plans. What do you most want to do next?","Esper; Blue; Black; Azorius; Dimir; Grixis; Jeskai; control; combo; toolbox; midrange; tempo","E-CERTIFIED;E-PLAYER-PACE;E-PLAYER-THREAT;E-PLAYER-VARIANCE;E-CECOS","Ask adaptively when remaining candidates differ in how new information becomes route commitment and at least two independent behavioral observations already exist.","Do not ask when no real choice among routes exists, when the result is already stable, or as proof of skill, archetype, or identity.","",[
    opt("consolidate","Choose one route","Pick a specific route toward ending the game and organize the next turns around it.","Prefers to consolidate new options into one planned route.","CONSOLIDATE"),
    opt("open","Keep several routes open","Hold multiple workable plans and decide after the table changes again.","Prefers to retain broad optionality after gaining information.","OPTIONALITY"),
    opt("exploit","Use the opening now","Spend the new resources on the opportunity that exists before it disappears.","Prefers to exploit the current opening after gaining information.","EXPLOIT"),
    opt("depends","Let the deck decide","Some decks commit to one route, while others stay flexible or act immediately.","Reports deck-conditional information-to-plan preference.","CONDITIONAL","conditional")]),
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
  q("b1.crucible.ug.v1","Crucible","C06","When building an engine, which structure fits your deck?","UG vs QUANDRIX","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when UG/QUANDRIX remain close.","Do not ask without the engine definition.","An engine is a card or group of cards that repeatedly helps your deck—for example by drawing cards, making mana or tokens, or building counters.",[
    opt("adapt","Several overlapping engines","Different groups of pieces can each keep producing value if another group is disrupted.","Prefers modular overlapping engines.","MODULAR"),
    opt("scale","One central engine","Most pieces strengthen one main engine that compounds value over time.","Accepts a concentrated central engine.","CENTRAL"),
    opt("neither","My engine uses another structure","Neither a central engine nor several overlapping engines describes the plan.","Rejects the proposed UG-family distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.wb.v1","Crucible","C13","A table deal could solve the immediate problem facing both you and another player. What makes it worth accepting?","WB vs SILVERQUILL","E-CERTIFIED;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when WB/SILVERQUILL remain close.","Record unknown without relevant deal experience.","Table deal means a spoken agreement between players.",[
    opt("terms","The terms carry a cost","Obligations, consequences, or exchange terms remain clear.","Prefers obligation-centered commitment.","DURABLE"),
    opt("influence","Change the situation now","The agreement changes the current table situation without binding anyone's later choices.","Prefers an influence-centered agreement that changes the current situation without binding later choices.","REVISABLE"),
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
  q("b1.crucible.esper.v1","Crucible","C06","You have answered the immediate threat and can now turn control into advantage. What structure do you want?","ESPER vs U/YORE/JESKAI/W/WU","E-CERTIFIED;E-PLAYER-COMMANDER;E-PLAYER-THREAT;E-AUDIT;E-CECOS","Ask only when Esper and a listed competitor remain close after independent observations.","Do not treat control, artifacts, or one answer as Esper proof.","An engine is a card or group of cards that repeatedly helps your deck—for example by drawing cards, making mana or tokens, or building counters.",[
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
  q("b1.crucible.witch-yore.v1","Crucible","C06","When an engine organizes your plan, which structure do you want?","WITCH vs YORE","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only when Witch/Yore remain close.","Do not infer nature versus artifice.","An engine is a card or group of cards that repeatedly helps your deck—for example by drawing cards, making mana or tokens, or building counters.",[
    opt("compound","One engine keeps compounding","Most pieces strengthen one central engine that builds more value over time.","Prefers one central engine that compounds value over time.","CENTRAL"),
    opt("convert","Several pieces make the same conversion","Interchangeable pieces can each turn one resource into another, so no single piece is indispensable.","Prefers several interchangeable conversion pieces over one indispensable engine.","REDUNDANT"),
    opt("neither","My engine differs","Neither one central engine nor several interchangeable conversion pieces describes the plan.","Rejects the proposed four-color boundary.","UNKNOWN","unknown")]),
  q("b1.crucible.colorless-wubrg.v1","Crucible","C15","When building around an idea you like, which kind of challenge sounds more satisfying?","COLORLESS vs WUBRG","E-CERTIFIED;E-PLAYER-COMMANDER;E-AUDIT;E-CECOS","Ask only after prior independent behavioral evidence when both edge identities remain close.","Neither answer is sufficient for an edge identity.","Available cards means the cards permitted by the format and the commander's color identity before the builder adds a theme or other self-chosen rule.",[
    opt("constraint","Work within the limits","Some useful tools are unavailable, and finding unexpected solutions is part of the appeal.","Prefers an imposed card-pool limitation as part of the desired challenge.","NARROW"),
    opt("breadth","Choose the limits myself","Keep the widest range of tools available, then decide which theme, mechanic, or rule the deck will follow.","Prefers broad access followed by self-chosen deckbuilding boundaries.","BROAD"),
    opt("neither","The available tools aren’t the point","I care more about the deck idea than whether the starting pool is broad or narrow.","Rejects the edge distinction.","UNKNOWN","unknown")]),
  q("b1.crucible.mono-multi.v1","Crucible","C15","Two decks play the way you like. One is mono-color; the other combines several colors. Which deckbuilding challenge sounds more appealing?","mono versus multicolor","E-CERTIFIED;E-PLAYER-COMMANDER;E-PLAYER-PACE;E-AUDIT;E-CECOS","Ask only when mono/multicolor candidates remain close after behavior evidence.","Never permit a one-answer color-count flip.","A commander's color identity determines which colors may appear in its Commander deck.",[
    opt("mono","Explore one color’s limits","Find solutions inside one color’s tools.","Prefers solving within one color's available tools.","NARROW"),
    opt("multi","Combine several color roles","Keep more kinds of tools available and decide which ones belong in the plan.","Prefers access to several color roles followed by deliberate selection.","BROAD"),
    opt("pattern","Let the play pattern decide","Choose the color count that best serves the way the deck plays.","Reports no independent breadth preference.","CONDITIONAL","conditional")])
];

const CR_AUTHORITY = "Wizards of the Coast Magic Comprehensive Rules; accessed 2026-08-04; published file effective 2026-08-07";
const CR_URL = "https://media.wizards.com/2026/downloads/MagicCompRules%2020260807.txt";
const COMMANDER_URL = "https://magic.wizards.com/en/formats/commander";
const J = [
  {jargon_id:"JRG_BOARD",term:"board",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Board means the cards and tokens on the battlefield.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-THREAT",rule_or_section:"Not a Comprehensive Rules definition; compare rules 110.1 and 403.1",validation_status:"ACTIVE",notes:"Player-facing Commander shorthand; never present as a quoted rules definition."},
  {jargon_id:"JRG_BOARD_WIPE",term:"board wipe",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Board wipe means an effect that removes many cards and tokens from the battlefield.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-COMMANDER",rule_or_section:"Not a Comprehensive Rules definition",validation_status:"ACTIVE",notes:"Effect is broader than spell and removal is not limited to destruction."},
  {jargon_id:"JRG_ENGINE",term:"engine",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"An engine is a card or group of cards that repeatedly helps your deck—for example by drawing cards, making mana or tokens, or building counters.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-COMMANDER;E-PLAYER-VARIANCE",rule_or_section:"Not a Comprehensive Rules definition",validation_status:"ACTIVE",notes:"Owner-approved canonical operational explanation for C06 and related scenarios."},
  {jargon_id:"JRG_INTERACTION",term:"interaction",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Interaction means an answer to another player's spell, ability, attack, or permanent.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-THREAT",rule_or_section:"Not a Comprehensive Rules definition; constituent rules terms are covered by rules 110, 112, 113, and 508",validation_status:"ACTIVE",notes:"Intentionally includes multiple relevant response windows."},
  {jargon_id:"JRG_TABLE_DEAL",term:"table deal",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Table deal means a spoken agreement between players.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-THREAT",rule_or_section:"Not a Comprehensive Rules definition",validation_status:"ACTIVE",notes:"No implication about honesty, morality, or enforceability."},
  {jargon_id:"JRG_SPELL_HEAVY",term:"spell-heavy",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Spell-heavy means instants or sorceries are central to the deck.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-PACE;E-PLAYER-THEME",rule_or_section:"Not a Comprehensive Rules definition; instants rule 304 and sorceries rule 307",validation_status:"ACTIVE",notes:"Deckbuilding shorthand, not a formal archetype assignment."},
  {jargon_id:"JRG_FIVE_COLOR",term:"Five-Color",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Five-Color uses all five colors in the commander's color identity.",authority_type:"OFFICIAL_COMMANDER_FORMAT_PLUS_PLAYER_LABEL",authority_reference:COMMANDER_URL,rule_or_section:"Commander format Color Identity; Comprehensive Rules 903.4 and 903.5c",validation_status:"RESERVED",notes:"Retained for reference but removed from the remediated player-facing questions."},
  {jargon_id:"JRG_COLOR_COUNT",term:"color count",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Here, color count means the number of colors in the commander's color identity.",authority_type:"ARCHSCRY_OPERATION_OVER_RULES_TERM",authority_reference:CR_URL,rule_or_section:"Comprehensive Rules 903.4",validation_status:"ACTIVE",notes:"The operational count is boundary evidence only."},
  {jargon_id:"JRG_PERMANENT",term:"permanent",jargon_class:"RULES_DEFINED",canonical_public_definition:"Permanent means a card or token on the battlefield.",authority_type:"OFFICIAL_WOTC_COMPREHENSIVE_RULES",authority_reference:CR_URL,rule_or_section:"110.1",validation_status:"VERIFIED",notes:CR_AUTHORITY},
  {jargon_id:"JRG_GRAVEYARD",term:"graveyard",jargon_class:"RULES_DEFINED",canonical_public_definition:"A graveyard is a player's discard pile.",authority_type:"OFFICIAL_WOTC_COMPREHENSIVE_RULES",authority_reference:CR_URL,rule_or_section:"404.1",validation_status:"VERIFIED",notes:CR_AUTHORITY},
  {jargon_id:"JRG_COLOR_IDENTITY",term:"color identity",jargon_class:"RULES_DEFINED",canonical_public_definition:"A commander's color identity determines which colors may appear in its Commander deck.",authority_type:"OFFICIAL_WOTC_COMPREHENSIVE_RULES_AND_FORMAT",authority_reference:CR_URL+";"+COMMANDER_URL,rule_or_section:"903.4;903.5c; Commander format Color Identity",validation_status:"RESERVED",notes:"Retained for reference but removed from the remediated player-facing questions; "+CR_AUTHORITY},
  {jargon_id:"JRG_THEME",term:"theme",jargon_class:"INSTRUMENT_OPERATIONAL",canonical_public_definition:"Here, theme means a chosen story, visual idea, creature type, or self-imposed concept.",authority_type:"ARCHSCRY_OBSERVATION_CONTRACT",authority_reference:"E-PLAYER-THEME;E-PLAYER-COMMANDER",rule_or_section:"C10",validation_status:"ACTIVE",notes:"Deckbuilding tradeoff only; never identity support by itself."},
  {jargon_id:"JRG_THREAT",term:"threat",jargon_class:"COMMUNITY_STANDARD",canonical_public_definition:"Players use threat for a card, battlefield, or plan they believe they need to answer.",authority_type:"COMMITTED_PLAYER_LANGUAGE",authority_reference:"E-PLAYER-THREAT;E-PLAYER-COMMANDER",rule_or_section:"Not a Comprehensive Rules definition",validation_status:"ACTIVE",notes:"Does not assert actual power."},
  {jargon_id:"JRG_COLOR_ROLES",term:"color roles",jargon_class:"INSTRUMENT_OPERATIONAL",canonical_public_definition:"Here, color roles are broad tool families associated with colors; no color-pie knowledge is required.",authority_type:"ARCHSCRY_OBSERVATION_CONTRACT",authority_reference:"E-CERTIFIED;E-CECOS",rule_or_section:"C15",validation_status:"ACTIVE",notes:"Boundary vocabulary, not a color-identity assignment."},
  {jargon_id:"JRG_PUBLIC_COMMITMENT",term:"public commitment",jargon_class:"INSTRUMENT_OPERATIONAL",canonical_public_definition:"Here, public commitment means an agreement stated so the table can hear it.",authority_type:"ARCHSCRY_OBSERVATION_CONTRACT",authority_reference:"E-PLAYER-PACE;E-PLAYER-THREAT",rule_or_section:"C13",validation_status:"ACTIVE",notes:"Table preference only; not a morality or personality diagnosis."}
];

const questionJargonIds = {
  "b1.gate.initiative.v1":["JRG_THREAT"],
  "b1.gate.visibility.v1":["JRG_BOARD","JRG_PERMANENT"],
  "b1.gate.disruption.v1":["JRG_BOARD_WIPE","JRG_BOARD","JRG_GRAVEYARD"],
  "b1.hall.engine-shape.v1":["JRG_ENGINE"],
  "b1.hall.pressure.v1":["JRG_ENGINE","JRG_BOARD"],
  "b1.hall.theme.v1":["JRG_THEME"],
  "b1.hall.threat.v1":["JRG_THREAT","JRG_BOARD"],
  "b1.hall.sacrifice.v1":["JRG_PERMANENT","JRG_BOARD"],
  "b1.hall.commitment.v1":["JRG_TABLE_DEAL","JRG_BOARD"],
  "b1.hall.setup.v1":["JRG_BOARD"],
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
  "b1.crucible.colorless-wubrg.v1":["JRG_THEME"],
  "b1.crucible.mono-multi.v1":["JRG_COLOR_COUNT","JRG_COLOR_ROLES"]
};
const jargonById = new Map(J.map((x) => [x.jargon_id,x]));
const definitionCore = (value) => String(value || "").replace(/^(?:Here,\s*)?[^.?!]+?\s+means\s+/i, "").replace(/[.!?]+$/, "").trim().toLowerCase();
const helperDefinitionsFor = (item) => item.jargonIds.map((id) => jargonById.get(id).canonical_public_definition).filter((definition) => {
  const core = definitionCore(definition);
  if (item.id === "b1.gate.disruption.v1" && definition.startsWith("Board means")) return false;
  return !(core.length >= 24 && item.prompt.toLowerCase().includes(core));
});
for (const item of Q) {
  item.jargonIds = questionJargonIds[item.id] || [];
  item.glossary = helperDefinitionsFor(item).join(" ");
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
  "b1.hall.interaction-window.v1.pressure",
  "b1.crucible.ug.v1.adapt","b1.crucible.ug.v1.scale","b1.crucible.wb.v1.influence",
  "b1.crucible.bant.v1.refine","b1.crucible.bant.v1.network","b1.crucible.bant.v1.neither",
  "b1.crucible.grixis.v1.convert","b1.crucible.sultai.v1.cycle","b1.crucible.temur.v1.adapt",
  "b1.crucible.ink-witch.v1.share","b1.crucible.ink-witch.v1.compound","b1.crucible.ink-witch.v1.depends",
  "b1.crucible.witch-yore.v1.compound","b1.crucible.witch-yore.v1.convert"
]);
const signalReviewIds = new Set([]);
const metadataCorrectionIds = new Set(answers.filter((a) => a.construct_id === "C01" || a.construct_id === "C15" || a.construct_id === "C10" || a._kind !== "directional").map((a) => a.answer_id));
const terminologyRemediatedQuestionIds = new Set(Object.keys(questionJargonIds));

const semanticReviews = answers.map((a) => {
  const qItem = Q.find((x) => x.id === a.question_id);
  const signalReview = signalReviewIds.has(a.answer_id);
  const evidenceRequired = (a._stage === "Crucible" || a.construct_id === "C16") && a._kind === "directional" && !signalReview;
  const reworded = rewordedAnswerIds.has(a.answer_id);
  const metadataCorrected = metadataCorrectionIds.has(a.answer_id);
  let review_disposition = "APPROVE";
  if (signalReview) review_disposition = "SIGNAL_REVIEW_REQUIRED";
  else if (evidenceRequired) review_disposition = "EVIDENCE_REQUIRED";
  else if (reworded) review_disposition = "REWORD";
  else if (metadataCorrected) review_disposition = "METADATA_CORRECTION";

  let recommended_action = "Retain as a non-scoring semantic proposal for owner review of the complete package.";
  let rationale = `The title and sentence directly answer the scenario; '${a.plain_language_observation}' is bounded to ${a.construct_id} and maps to ${a.primary_signal}.`;
  if (signalReview) {
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
    construct_fidelity:"PASS",
    scenario_fit:"PASS", option_distinguishability:"PASS",
    compound_construct_risk:"CLEAR",
    desirability_or_skill_bias:"CLEAR",
    identity_giveaway_risk:qItem.construct === "C15" && qItem.stage === "Crucible" ? "BOUNDED-DIRECT-BOUNDARY" : "CLEAR",
    novice_clarity:terminologyRemediatedQuestionIds.has(a.question_id) ? "VERIFIED-OR-REMEDIATED" : "PASS",
    title_sentence_alignment:reworded ? "REMEDIATED" : "PASS",
    observation_alignment:reworded ? "REMEDIATED" : "PASS",
    primary_signal_alignment:signalReview ? "OWNER-REVIEW" : "PASS",
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
  W:["C03","C13","C07"],U:["C01","C08","C16","C06"],B:["C12","C11","C16","C09"],R:["C01","C04","C11"],G:["C03","C14","C10"],
  WU:["C08","C13","C16","C09"],UB:["C02","C08","C16","C11"],BR:["C11","C12","C04"],RG:["C07","C01","C10"],WG:["C13","C03","C10"],
  WB:["C13","C12","C09"],UR:["C06","C04","C09"],BG:["C12","C03","C06"],WR:["C03","C07","C01"],UG:["C06","C03","C14"],
  PRISMARI:["C04","C10","C11"],QUANDRIX:["C06","C09","C14"],SILVERQUILL:["C13","C11","C10"],LOREHOLD:["C03","C06","C10"],WITHERBLOOM:["C12","C06","C14"],
  BANT:["C05","C03","C09"],ESPER:["C16","C06","C08","C09"],GRIXIS:["C01","C12","C16","C02"],JUND:["C01","C12","C07"],NAYA:["C07","C10","C11"],
  ABZAN:["C03","C14","C13"],TEMUR:["C01","C07","C14"],SULTAI:["C12","C06","C14"],MARDU:["C01","C07","C13"],JESKAI:["C08","C01","C16","C09"],
  YORE:["C06","C09","C12"],GLINT:["C09","C01","C11"],DUNE:["C07","C11","C13"],INK:["C13","C03","C10"],WITCH:["C14","C06","C09"],
  COLORLESS:["C15","C06","C10"],WUBRG:["C15","C09","C10"]
};
const B = Object.fromEntries(Object.entries(I).map(([id, cs]) => [id, cs.slice(0,2)]));
const direct = {
  UR:["b1.crucible.ur.v1"],PRISMARI:["b1.crucible.ur.v1"],BG:["b1.crucible.bg.v1"],WITHERBLOOM:["b1.crucible.bg.v1"],
  WR:["b1.crucible.wr.v1"],LOREHOLD:["b1.crucible.wr.v1"],UG:["b1.crucible.ug.v1"],QUANDRIX:["b1.crucible.ug.v1"],
  WB:["b1.crucible.wb.v1"],SILVERQUILL:["b1.crucible.wb.v1"],BANT:["b1.crucible.bant.v1"],GRIXIS:["b1.crucible.grixis.v1"],
  SULTAI:["b1.crucible.sultai.v1"],TEMUR:["b1.crucible.temur.v1"],ESPER:["b1.hall.information-to-plan.v1","b1.crucible.esper.v1"],JESKAI:["b1.crucible.jeskai.v1"],YORE:["b1.crucible.yore-glint.v1","b1.crucible.witch-yore.v1"],
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
    instrument_observability:r.identity === "YORE" ? "NOT_CLEANLY_OBSERVABLE" : dq.length ? "OBSERVABLE" : "PARTIALLY_OBSERVABLE",
    observability_rationale:r.identity === "YORE"
      ? "C06/C09 observe engine structure and repeatability, but behavior does not establish Yore's constructed-agency identity lens; guarded self-report remains a separate evidence class."
      : r.identity === "ESPER"
        ? "C16 now observes information-to-plan conversion; C06 and C08 separately observe structure and interaction timing. Together they provide structural coverage without validating the Esper association."
        : dq.length
          ? "The pool contains at least one direct bounded boundary hypothesis; empirical mapping and false-positive evidence remain absent."
          : "The pool observes relevant broad or family behavior but has no direct identity-specific discriminator.",
    mapping_validation:"MAPPING_HYPOTHESIS",
    evidence_provenance:"E-AUDIT;E-CERTIFIED;E-CECOS"
  };
});

const covBy = new Map(coverage.map((r) => [r.identity_id,r]));
const pairQuestions = new Map([
  ["PRISMARI|UR","b1.crucible.ur.v1"],["BG|WITHERBLOOM","b1.crucible.bg.v1"],["LOREHOLD|WR","b1.crucible.wr.v1"],
  ["QUANDRIX|UG","b1.crucible.ug.v1"],["SILVERQUILL|WB","b1.crucible.wb.v1"],["BANT|WITCH","b1.crucible.bant.v1"],
  ["B|GRIXIS","b1.crucible.grixis.v1"],["GLINT|GRIXIS","b1.crucible.grixis.v1"],["B|SULTAI","b1.crucible.sultai.v1"],
  ["BG|SULTAI","b1.crucible.sultai.v1"],["G|TEMUR","b1.crucible.temur.v1"],["GLINT|TEMUR","b1.crucible.temur.v1"],
  ["B|ESPER","b1.hall.information-to-plan.v1;b1.crucible.esper.v1"],
  ["ESPER|U","b1.hall.information-to-plan.v1;b1.crucible.esper.v1"],
  ["ESPER|WU","b1.hall.information-to-plan.v1;b1.crucible.esper.v1"],
  ["ESPER|UB","b1.hall.information-to-plan.v1;b1.crucible.esper.v1"],
  ["ESPER|GRIXIS","b1.hall.information-to-plan.v1;b1.crucible.esper.v1"],
  ["ESPER|YORE","b1.hall.information-to-plan.v1;b1.crucible.esper.v1"],
  ["ESPER|JESKAI","b1.hall.information-to-plan.v1;b1.crucible.esper.v1"],
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
write("identity-coverage-matrix.tsv",makeTsv(["identity_id","identity_name","identity_family","supporting_constructs","boundary_constructs","strongest_likely_competitors","minimum_independent_observations","current_evidence_quality","pilot_question_ids","pilot_coverage","uncovered_risks","instrument_observability","observability_rationale","mapping_validation","evidence_provenance"],coverage));
write("confusion-pair-coverage.tsv",makeTsv(["identity_a","identity_b","audit_basis","audit_path_count_or_marker","coverage_category","observable_behavioral_distinction","pilot_question_ids","why_defensible","when_not_to_ask","pilot_coverage_status","evidence_provenance"],confusion));

const qDisp = new Map();
for (const r of inventory) qDisp.set(r.current_question_id,r.proposed_disposition);
const count = (values) => values.reduce((a,v)=>(a[v]=(a[v]||0)+1,a),{});
const stages = count(Q.map((x)=>x.stage));
const ids = [...Q.map((x)=>x.id),...answers.map((x)=>x.answer_id)];
const cids = new Set(C.map((x)=>x.construct_id)), qids = new Set(Q.map((x)=>x.id));
const answerById = new Map(answers.map((x)=>[x.answer_id,x]));
const answerIds = new Set(answers.map((x)=>x.answer_id));
const jargonIds = new Set(J.map((x)=>x.jargon_id));
const semanticAnswerIds = semanticReviews.map((x)=>x.answer_id);
const allQuestionCopy = (x) => `${x.prompt} ${x.options.map((o)=>`${o.title} ${o.copy}`).join(" ")}`;
const duplicateQuestionHelperPairs = Q.filter((question) => String(question.glossary || "").split(/(?<=[.!?])\s+/).some((sentence) => {
  const core = sentence.replace(/^(?:Here,\s*)?[^.?!]+?\s+means\s+/i, "").replace(/[.!?]+$/, "").trim().toLowerCase();
  return core.length >= 24 && question.prompt.toLowerCase().includes(core);
})).map((question) => question.id);
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
const prototype = JSON.parse(read("docs/prototypes/vm551-gate-b1-owner-experience/prototype-data.json"));
const productFitResults = tsv(read("docs/plans/vm551-gate-b1-product-fit/result-usefulness-matrix.tsv"));
const productFitQuestions = tsv(read("docs/plans/vm551-gate-b1-product-fit/question-product-fit-review.tsv"));
const identityLayers = JSON.parse(read("data/identity-layers.json"));
const resultRemediations = {
  ESPER: {
    primary_behavioral_explanation:"The reading can describe using new information to choose a specific route, then supporting it with held interaction and a designed engine",
    observable_distinction:"Esper's structural hypothesis combines information-to-plan consolidation, organized engine structure, and timed interaction; Azorius centers public procedure and managed stability",
    honest_limitation:"C16, C06, and C08 now make the boundary structurally observable, but their Esper association remains unvalidated and generic control, combo, toolbox, and artifact decks remain false positives",
    commander_expression:"Control or artifact-oriented decks where information and structure feed a named closing plan",
    useful_archetype_links:"Control; engine-control; artifacts; combo",
    recommendation_direction:"Explore commanders that make interaction feed a repeatable advantage system with an explicit finish",
    usefulness_status:"GAP",
    missing_value:"Eligible player evidence that information-to-plan consolidation plus independent structure and interaction observations distinguish Esper from Blue, Black, Azorius, Dimir, Grixis, Jeskai, and generic control/combo/toolbox patterns"
  },
  INK: {
    primary_behavioral_explanation:"The reading can describe keeping a shared resource available and protecting it from capture by one player",
    nearest_useful_alternative:"Dune / Aggression",
    observable_distinction:"Ink keeps a protected commons available across turns; Dune turns a public commitment into immediate coordinated pressure",
    honest_limitation:"The route can observe durable shared access, but it cannot establish generous motive or the full four-color missing-Black frame",
    commander_expression:"Political or group-benefit decks that keep shared resources useful while retaining guardrails and an independent plan",
    table_read:"Shared access is visible at the table; motive, fairness, and altruism are not",
    useful_archetype_links:"Political midrange; shared resources; protection; group benefit",
    recommendation_direction:"Explore commanders that let resources circulate while preventing one player from capturing the entire benefit",
    usefulness_status:"PARTIAL",
    missing_value:"Player evidence that durable protected access distinguishes Ink from generic group benefit and from Dune's immediate coordinated pressure"
  },
  JESKAI: {
    primary_behavioral_explanation:"The reading can describe advancing a threat while keeping a response for the opponent's decisive action",
    nearest_useful_alternative:"Boros Legion",
    observable_distinction:"Jeskai advances while preserving a response window; Boros commits more openly to present intervention and protection",
    honest_limitation:"C08 observes timing, but the same pattern appears in generic tempo, Azorius, and Izzet decks; one timing answer cannot establish Jeskai's disciplined-action context",
    commander_expression:"Attack, prowess, or spellslinger decks that keep one meaningful response available while advancing",
    table_read:"A modest attack plus open mana can represent both present pressure and a protected response window",
    useful_archetype_links:"Tempo; prowess; spellslinger; aggro-control",
    recommendation_direction:"Explore commanders that reward acting now without spending every answer before the decisive opposing play",
    usefulness_status:"PARTIAL",
    missing_value:"Player evidence that pressure-plus-response timing distinguishes Jeskai from generic tempo and its Boros, Azorius, and Izzet neighbors"
  },
  YORE: {
    primary_behavioral_explanation:"The reading can describe a repeatable conversion system built from replaceable pieces",
    nearest_useful_alternative:"Glint / Chaos",
    observable_distinction:"Yore's certified context centers constructed agency that rebuilds around natural limits; Glint centers adaptive living volatility. Stable architecture versus a changing route only approximates that boundary",
    honest_limitation:"C06 and C09 observe engine structure and repeatability, not Yore's full constructed-agency or missing-Green frame; generic artifacts and combo remain false positives",
    commander_expression:"Artifact, recursion, or conversion decks where replaceable parts keep a constructed system operating",
    table_read:"A repeatable machine can look inevitable, but engine legibility does not establish why the player wants it",
    useful_archetype_links:"Artifacts; recursion; engine-combo; conversion",
    recommendation_direction:"Explore commanders that rebuild a conversion system through replaceable parts while keeping the closing line explainable",
    usefulness_status:"GAP",
    missing_value:"An approved B1 observation of constructed agency against natural limits, plus evidence separating Yore from generic artifact and combo engines"
  },
  BANT: {
    primary_behavioral_explanation:"The reading can describe a central commander elevated by a 99 that still functions as a visible support network",
    observable_distinction:"Bant concentrates living communal support behind a central line; Azorius prioritizes procedure, preparation, and managed stability",
    honest_limitation:"C05 observes commander reliance and support structure, not Bant's certified public-honor or accountable-excellence context, and the boundary remains high-confusion",
    missing_value:"Validated C05 boundary evidence and false-positive data against Azorius, Witch, WUBRG, and Ink"
  },
  COLORLESS: {
    certified_identity_context:"Colorless explores what remains when the five colors are not the grammar of the answer.",
    primary_behavioral_explanation:"The reading can explain attraction to an imposed card-pool limitation as part of the deckbuilding challenge",
    observable_distinction:"Colorless begins with an imposed boundary: the available pool is already constrained, and solving within it is part of the challenge. Five-Color preserves broad access first and then chooses its boundary",
    honest_limitation:"This boundary remains unvalidated. A preference for restrictions does not by itself establish Colorless, and the reading must not infer artifacts, Eldrazi, big mana, combo, complexity, or difficulty",
    commander_expression:"A Commander whose available card pool creates a limitation the player actively wants to solve; no card type or archetype is implied",
    table_read:"The card-pool limitation is visible, but it does not reveal how the deck will behave at the table",
    useful_archetype_links:"Constraint-led builds; no archetype inferred",
    recommendation_direction:"Compare the same desired play pattern under different available card pools before exploring a Colorless Commander",
    usefulness_status:"PARTIAL",
    missing_value:"Independent behavioral evidence beyond liking an imposed limitation, plus player validation against broad-access decks with self-chosen restrictions"
  },
  WUBRG: {
    certified_identity_context:"Five-Color asks what happens when every color is allowed to speak without any one color becoming the whole answer.",
    primary_behavioral_explanation:"The reading can explain wanting the full color palette available before choosing a unifying theme, mechanic, collection, or rule",
    observable_distinction:"Five-Color begins with a self-chosen boundary: broad access is preserved first, then the builder chooses the theme, mechanic, collection, or rule. Colorless starts from an imposed boundary",
    honest_limitation:"This boundary remains unvalidated. Broad access does not imply playing everything, goodstuff, complexity, power, optimization, or an unwillingness to use severe self-chosen restrictions",
    commander_expression:"A five-color Commander whose full palette serves one declared concept, including theme-, mechanic-, typal-, collection-, or favorite-card-led builds",
    table_read:"Broad access does not reveal the plan; the chosen concept still needs to make the deck legible",
    useful_archetype_links:"Theme-led; mechanic-led; typal; toolbox; no power level inferred",
    recommendation_direction:"Explore five-color commanders only when the full palette serves a stated concept or chosen rule rather than standing in for one",
    missing_value:"Independent behavioral support beyond preserving broad access, plus player validation against narrower pools and self-restricted five-color decks"
  }
};
const resultIdentityFolders = {
  ABZAN:"abzan",B:"black",BANT:"bant",BG:"golgari_swarm",BR:"cult_of_rakdos",COLORLESS:"colorless",
  DUNE:"dune",ESPER:"esper",G:"green",GLINT:"glint",GRIXIS:"grixis",INK:"ink",JESKAI:"jeskai",
  JUND:"jund",LOREHOLD:"lorehold",MARDU:"mardu",NAYA:"naya",PRISMARI:"prismari",QUANDRIX:"quandrix",
  R:"red",RG:"gruul_clans",SILVERQUILL:"silverquill",SULTAI:"sultai",TEMUR:"temur",U:"blue",
  UB:"house_dimir",UG:"simic_combine",UR:"izzet_league",W:"white",WB:"orzhov_syndicate",
  WG:"selesnya_conclave",WITCH:"witch",WITHERBLOOM:"witherbloom",WR:"boros_legion",
  WU:"azorius_senate",WUBRG:"wubrg",YORE:"yore"
};
const resultAlternativeFolders = {
  ABZAN:"witch",B:"golgari_swarm",BANT:"azorius_senate",BG:"witherbloom",BR:"prismari",
  COLORLESS:"wubrg",DUNE:"ink",ESPER:"azorius_senate",G:"naya",GLINT:"yore",GRIXIS:"house_dimir",
  INK:"dune",JESKAI:"boros_legion",JUND:"golgari_swarm",LOREHOLD:"boros_legion",MARDU:"boros_legion",
  NAYA:"gruul_clans",PRISMARI:"izzet_league",QUANDRIX:"simic_combine",R:"cult_of_rakdos",RG:"naya",
  SILVERQUILL:"orzhov_syndicate",SULTAI:"golgari_swarm",TEMUR:"green",U:"azorius_senate",UB:"blue",
  UG:"quandrix",UR:"prismari",W:"azorius_senate",WB:"silverquill",WG:"naya",WITCH:"abzan",
  WITHERBLOOM:"golgari_swarm",WR:"lorehold",WU:"bant",WUBRG:"colorless",YORE:"glint"
};
const firstSentence = (value) => String(value || "").split(/(?<=[.!?])\s+/)[0];
const identityLayerFor = (id) => identityLayers.expressions?.[id] || identityLayers.colors?.[id] || null;
const coverageByIdentity = new Map(coverage.map((row) => [row.identity_id,row]));
for (const row of productFitResults) {
  const previousStatus = row.content_readiness || row.usefulness_status;
  Object.assign(row,resultRemediations[row.identity_id] || {});
  const folder = resultIdentityFolders[row.identity_id];
  const alternativeFolder = resultAlternativeFolders[row.identity_id];
  const layer = identityLayerFor(row.identity_id);
  const display = layer?.display || layer || {};
  row.certified_identity_context = resultRemediations[row.identity_id]?.certified_identity_context || firstSentence(display.philosophy || display.preview_text || layer?.identity_blend || row.dossier_learning_value);
  row.answer_observation_sources = "docs/plans/vm551-gate-b1-placement-instrument/identity-coverage-matrix.tsv;docs/plans/vm551-gate-b1-placement-instrument/answer-signal-contracts.tsv";
  row.certified_identity_sources = `data/raw-factions/${folder}/${folder}.placement.json;data/raw-factions/${folder}/${folder}.profile.json;data/identity-layers.json;data/factions.json`;
  row.nearest_alternative_sources = `data/raw-factions/${alternativeFolder}/${alternativeFolder}.placement.json;data/raw-factions/${alternativeFolder}/${alternativeFolder}.profile.json`;
  const unresolved = row.unresolved_validation_need || row.missing_value || "Eligible player evidence is required for every observation-to-identity association.";
  const identityCoverage = coverageByIdentity.get(row.identity_id);
  row.content_readiness = "CONTENT_READY";
  row.instrument_observability = identityCoverage.instrument_observability;
  row.mapping_validation = "MAPPING_HYPOTHESIS";
  row.content_rationale = previousStatus === "READY" || previousStatus === "CONTENT_READY"
    ? "The result package remains useful, distinct, source-backed, bounded, and complete; mapping evidence is tracked separately."
    : `Normalized from ${previousStatus}: the previously named gap is an observability or validation need, while the result package itself is complete and honest.`;
  row.observability_rationale = identityCoverage.observability_rationale;
  row.unresolved_validation_need = unresolved;
  delete row.usefulness_status;
  delete row.missing_value;
  delete row.status_rationale;
}
writeRoot("docs/plans/vm551-gate-b1-product-fit/result-usefulness-matrix.tsv",makeTsv(Object.keys(productFitResults[0]),productFitResults));
const ownerRemediationQuestionIds = new Set([
  "b1.gate.disruption.v1",
  "b1.hall.engine-shape.v1","b1.hall.pressure.v1","b1.hall.mana-window.v1","b1.hall.repeatability.v1",
  "b1.hall.theme.v1","b1.hall.setup.v1","b1.hall.breadth.v1","b1.crucible.ug.v1",
  "b1.crucible.esper.v1","b1.crucible.witch-yore.v1","b1.crucible.colorless-wubrg.v1","b1.crucible.mono-multi.v1"
]);
if (!productFitQuestions.some((row) => row.question_id === "b1.hall.information-to-plan.v1")) productFitQuestions.push({
  question_id:"b1.hall.information-to-plan.v1",
  stage:"Hall",
  construct_id:"C16",
  current_prompt:Q.find((question) => question.id === "b1.hall.information-to-plan.v1").prompt,
  commander_situation:"A dangerous opposing play has been stopped and new cards create several workable plans",
  cecos_source_refs:"E-CECOS | exact accepted draft.4 object 947bf45bf6a191839b5fb4fa6c65980ed9d5737e | evidence before product and counterexample review",
  source_observation_refs:"docs/plans/vm551-gate-b1-product-fit/esper-yore-evidence-recovery.md | accepted information-to-plan kernel and false-positive analysis; E-PLAYER-PACE; E-PLAYER-THREAT; E-PLAYER-VARIANCE",
  source_role:"MIXED-SCENARIO-VOCABULARY",
  direct_player_support:"DIRECT-WITH-COUNTEREXAMPLES",
  contradiction_or_variation:"Control, combo, toolbox, midrange, tempo, Blue, Black, Azorius, Dimir, Grixis, and Jeskai players can use the same posture for different reasons",
  corpus_support_summary:"Commander players recognize post-interaction choices between commitment, optionality, and immediate exploitation; no option establishes an identity",
  player_language_fit:"Concrete post-threat Commander decision with neutral route choices",
  commander_recognizability:"STRONG",
  novice_clarity:"STRONG-PENDING-PLAYER-VALIDATION",
  experienced_player_depth:"STRONG",
  answer_distinguishability:"STRONG",
  identity_giveaway_risk:"LOW",
  clinical_or_generic_risk:"LOW",
  edhmatch_clarity_comparison:"Comparable directness while keeping behavior separate from identity",
  product_fit_disposition:"OWNER_APPROVED_ARCHITECTURE_ADDITION",
  proposed_change:"Add one adaptive C16 question; do not make it mandatory or identity-specific",
  reason:"The owner-approved construct is atomic, nonredundant, cross-identity useful, and required to observe what happens after new information creates viable routes.",
  owner_review_required:"YES"
});
for (const row of productFitQuestions) {
  if (!ownerRemediationQuestionIds.has(row.question_id)) continue;
  const question = Q.find((candidate) => candidate.id === row.question_id);
  row.current_prompt = question.prompt;
  row.product_fit_disposition = "OWNER_REMEDIATION_APPLIED";
  row.proposed_change = question.prompt;
  row.reason = `Hands-on owner review superseded the prior KEEP judgment; the remediated wording and help preserve ${question.construct} while improving novice comprehension.`;
  row.owner_review_required = "NO";
}
writeRoot("docs/plans/vm551-gate-b1-product-fit/question-product-fit-review.tsv",makeTsv(Object.keys(productFitQuestions[0]),productFitQuestions));
const productResultById = new Map(productFitResults.map((result) => [result.identity_id, result]));
const questionContractById = new Map(pilot.map((question) => [question.question_id, question]));
const constructById = new Map(constructRows.map((construct) => [construct.construct_id, construct]));
const productQuestionById = new Map(productFitQuestions.map((question) => [question.question_id, question]));
for (const design of Q) if (!prototype.questions.some((question) => question.id === design.id)) prototype.questions.push({
  id:design.id,
  stage:design.stage,
  order:Q.indexOf(design)+1,
  constructId:design.construct,
  prompt:design.prompt,
  observation:"",
  competitorFamily:design.scope,
  evidence:design.evidenceIds+";E-VOICE",
  dependencyGroup:"DG_"+design.construct,
  askWhen:design.askWhen,
  doNotAskWhen:design.doNotAskWhen,
  status:"DESIGN-ONLY-NONSCORING",
  jargon:[],
  construct:{},
  productFit:{},
  answers:design.options.map((option) => ({id:`${design.id}.${option.key}`,sourceRef:"docs/plans/vm551-gate-b1-placement-instrument/answer-signal-contracts.tsv"})),
  sourceRef:"docs/plans/vm551-gate-b1-placement-instrument/pilot-question-bank.tsv"
});
for (const question of prototype.questions) {
  const design = Q.find((candidate) => candidate.id === question.id);
  const contract = questionContractById.get(question.id);
  const construct = constructById.get(question.constructId);
  const product = productQuestionById.get(question.id);
  if (!design || !contract || !construct || !product) continue;
  question.prompt = design.prompt;
  question.observation = contract.primary_observation;
  question.competitorFamily = contract.competitor_pair_or_family;
  question.evidence = contract.evidence_provenance;
  question.dependencyGroup = contract.dependency_group;
  question.askWhen = contract.adaptive_ask_when;
  question.doNotAskWhen = contract.do_not_ask_when;
  question.status = contract.scoring_status;
  question.jargon = design.jargonIds.map((id) => {
    const term = jargonById.get(id);
    return {id,term:term.term,definition:term.canonical_public_definition,authority:term.authority_type,sourceRef:"docs/plans/vm551-gate-b1-placement-instrument/jargon-glossary.tsv"};
  });
  question.construct = {
    id:construct.construct_id,name:construct.name,definition:construct.plain_definition,
    doesNotMean:construct.does_not_mean,dependencyOverlap:construct.dependency_overlap,
    sourceRef:"docs/plans/vm551-gate-b1-placement-instrument/construct-map.tsv"
  };
  question.productFit = {
    commanderSituation:product.commander_situation,disposition:product.product_fit_disposition,
    support:product.corpus_support_summary,playerSupport:product.direct_player_support,
    noviceClarity:product.novice_clarity,experiencedDepth:product.experienced_player_depth,
    identityGiveawayRisk:product.identity_giveaway_risk,evidenceRefs:product.source_observation_refs,
    sourceRef:"docs/plans/vm551-gate-b1-product-fit/question-product-fit-review.tsv"
  };
  for (const answer of question.answers) {
    const contractAnswer = answerById.get(answer.id);
    if (!contractAnswer) continue;
    answer.title = contractAnswer.answer_title;
    answer.explanation = contractAnswer.explanatory_sentence;
    answer.observation = contractAnswer.plain_language_observation;
    answer.primarySignal = contractAnswer.primary_signal;
    answer.secondarySignal = contractAnswer.optional_bounded_secondary_signal || null;
    answer.dependencyGroup = contractAnswer.dependency_group;
    answer.exclusions = contractAnswer.exclusions;
    answer.evidence = contractAnswer.evidence_provenance;
    answer.mappingConfidence = contractAnswer.mapping_confidence;
    answer.status = contractAnswer.scoring_status;
    answer.limitation = contractAnswer.limitation_statement;
  }
}
for (const result of prototype.results) {
  const source = productResultById.get(result.id);
  if (!source) continue;
  result.name = source.identity_name;
  result.contentReadiness = source.content_readiness;
  result.instrumentObservability = source.instrument_observability;
  result.mappingValidation = source.mapping_validation;
  result.whatAnswersShowed = source.primary_behavioral_explanation;
  result.identityContext = source.certified_identity_context;
  result.nearbyAlternative = source.nearest_useful_alternative;
  result.observableDistinction = source.observable_distinction;
  result.limitation = source.honest_limitation;
  result.commanderExpression = source.commander_expression;
  result.tableRead = source.table_read;
  result.archetypeLinks = source.useful_archetype_links;
  result.profileEnrichment = source.optional_profile_enrichment;
  result.commanderDirection = source.recommendation_direction;
  result.dossierValue = source.dossier_learning_value;
  result.nextStep = source.maze_or_matrix_next_step;
  result.unresolvedValidationNeed = source.unresolved_validation_need;
  result.answerObservationSources = source.answer_observation_sources;
  result.certifiedIdentitySources = source.certified_identity_sources;
  result.nearestAlternativeSources = source.nearest_alternative_sources;
  result.contentRationale = source.content_rationale;
  result.observabilityRationale = source.observability_rationale;
  delete result.status;
  delete result.missingValue;
  delete result.statusRationale;
}
const resultSubtitles = {
  DUNE:"Four-color expression centered on coordinated visible pressure.",
  INK:"Four-color expression centered on protected shared resources and open access.",
  GLINT:"Four-color expression centered on adaptive routes under changing pressure.",
  WITCH:"Four-color expression centered on patient compounding development.",
  YORE:"Four-color expression centered on constructed agency and repeatable conversion."
};
for (const result of prototype.results) if (resultSubtitles[result.id]) result.subtitle = resultSubtitles[result.id];
const edgeBoundaryCopy = {
  COLORLESS:{label:"Imposed boundary",summary:"The available pool is already constrained, and solving within it is part of the challenge."},
  WUBRG:{label:"Self-chosen boundary",summary:"The widest access is preserved first, then the builder decides what the deck will restrict itself around."}
};
for (const result of prototype.results) Object.assign(result,edgeBoundaryCopy[result.id] || {});
prototype.metadata.version = "owner-review-final-architecture-v1";
prototype.metadata.generatedFromCommit = "Owner-approved final B1 architecture integration candidate; no production connection";
prototype.metadata.notice = "This prototype does not calculate placement. It demonstrates a non-scoring 16-construct design, three independent status axes, and authored behavioral/lens evidence scenarios.";
prototype.metadata.routeContract = "Exactly 4 broad Gate + 2 or 3 adaptive Hall + 0 or 1 targeted Crucible; 6–8 total; hard maximum 8. Crucible means targeted unresolved evidence.";
const lensContractRef = "docs/plans/vm551-gate-b1-placement-instrument/identity-lens-self-report-contract.md";
if (!prototype.metadata.sourceRefs.includes(lensContractRef)) prototype.metadata.sourceRefs.push(lensContractRef);
prototype.counts.constructs = C.length;
prototype.counts.questions = Q.length;
prototype.counts.stages = count(Q.map((question) => question.stage));
prototype.counts.answers = answers.length;
prototype.counts.identities = prototype.results.length;
prototype.evidenceClasses = [
  {
    id:"BEHAVIORAL_OBSERVATION",
    role:"Primary evidence from a bounded Commander scenario or preference.",
    placementUse:"May narrow candidates only through separately reviewed, currently hypothetical mappings.",
    auditBoundary:"Never imports unstated motive, philosophy, skill, power, budget, or personality."
  },
  {
    id:"IDENTITY_LENS_SELF_REPORT",
    role:"Optional explicit affinity for a color/setting identity lens that behavior cannot honestly infer.",
    placementUse:"May add secondary boundary evidence only inside an already plausible bounded candidate set after at least two independent behavioral observations.",
    auditBoundary:"Never behavioral evidence, never sole support, never a faction selector, never a one-answer flip, and never validation evidence for a behavioral mapping."
  }
];
for (const question of prototype.questions) question.evidenceClass = "BEHAVIORAL_OBSERVATION";
prototype.lensQuestions = [{
  id:"b1.lens.yore-glint.v1",
  stage:"Crucible",
  presentationLabel:"Optional identity lens · not a behavior question",
  evidenceClass:"IDENTITY_LENS_SELF_REPORT",
  prompt:"Two identity lenses still fit the Commander patterns you chose. Which relationship to a deck’s tools feels more personally resonant?",
  help:"This optional question asks what idea resonates with you. It does not change what your Commander answers showed.",
  askWhen:"Only after at least two independent behavioral observations leave Yore and Glint as a bounded plausible pair and behavior cannot resolve their identity-lens boundary.",
  doNotAskWhen:"Do not ask when the candidate set is broader, either candidate is excluded or strongly contradicted, a behavioral result is already stable, or another lens question was asked.",
  dependencyGroup:"DG_IDENTITY_LENS_SELF_REPORT",
  candidateSet:["YORE","GLINT"],
  maxPerJourney:1,
  status:"DESIGN-EXAMPLE-NONSCORING",
  sourceRef:lensContractRef,
  answers:[
    {id:"b1.lens.yore-glint.v1.constructed",title:"Shape a system deliberately",explanation:"I’m drawn to tools assembled into a system that can remake its route when limits appear.",observation:"Explicitly reports resonance with deliberate constructed agency.",evidenceClass:"IDENTITY_LENS_SELF_REPORT",direction:"YORE_LENS_ONLY",status:"SECONDARY-NONSCORING",limitation:"Cannot introduce Yore, override contradictory behavior, create a named result, or validate a behavioral mapping.",sourceRef:lensContractRef},
    {id:"b1.lens.yore-glint.v1.adaptive",title:"Let the route emerge",explanation:"I’m drawn to a deck whose route changes with the pieces and conditions that appear.",observation:"Explicitly reports resonance with emergent adaptive routes.",evidenceClass:"IDENTITY_LENS_SELF_REPORT",direction:"GLINT_LENS_ONLY",status:"SECONDARY-NONSCORING",limitation:"Cannot introduce Glint, override contradictory behavior, create a named result, or validate a behavioral mapping.",sourceRef:lensContractRef},
    {id:"b1.lens.yore-glint.v1.skip",title:"Neither, or I’m not sure",explanation:"That difference is not part of how I choose a deck, or I do not have a stable preference.",observation:"Reports no directional identity-lens preference.",evidenceClass:"IDENTITY_LENS_SELF_REPORT",direction:"NON_DIRECTIONAL",status:"NON-DIRECTIONAL-NONSCORING",limitation:"Leaves the behavioral reading unchanged and is never penalized.",sourceRef:lensContractRef}
  ]
}];
prototype.counts.lensQuestions = prototype.lensQuestions.length;
prototype.counts.contentReadiness = count(prototype.results.map((result) => result.contentReadiness));
prototype.counts.observability = count(prototype.results.map((result) => result.instrumentObservability));
prototype.counts.mappingValidation = count(prototype.results.map((result) => result.mappingValidation));
delete prototype.counts.resultStatuses;
const walkthroughRemediations = {
  "simic-quandrix": {
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.board","b1.gate.disruption.v1.recover","b1.gate.tempo.v1.small","b1.hall.repeatability.v1.toolbox","b1.hall.setup.v1.staged","b1.crucible.ug.v1.adapt"],
    routeSupportedHeading:"Why this stays close",
    routeSupportedDistinction:"Your answers favored overlapping engines rather than one central engine. The current design associates that observation more strongly with Simic, but that mapping still requires evidence.",
    identityContext:"Simic is associated with organic adaptation and accumulation, while Quandrix emphasizes mathematical scaling and multiplication. That context is useful for comparing them, but this route did not directly test that distinction.",
    publicLimitation:"The overlapping-engine association is provisional and the route did not test the certified organic-versus-mathematical boundary."
  },
  white: {
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.board","b1.gate.disruption.v1.protect","b1.gate.tempo.v1.small","b1.hall.commitment.v1.terms","b1.hall.threat.v1.embrace","b1.hall.mana-window.v1.split","b1.crucible.mono-multi.v1.mono"],
    routeSupportedHeading:"Why this route names White",
    routeSupportedDistinction:"Your answers combined protection before disruption, visible development, durable stated terms, split mana use, and interest in solving within one color’s tools. This authored route presents White as the current fit, while the mono-color association remains provisional.",
    identityContext:"White’s certified identity context emphasizes order, responsibility, protection, and shared structure. This route observed some related behaviors, but it did not prove a color philosophy.",
    publicLimitation:"Broad behavior and one color-count preference do not independently separate White from its multicolor neighbors."
  },
  bant: {
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.board","b1.gate.disruption.v1.protect","b1.gate.tempo.v1.small","b1.hall.engine-shape.v1.overlap","b1.hall.threat.v1.embrace","b1.hall.setup.v1.early","b1.crucible.bant.v1.network"],
    routeSupportedHeading:"Why Bant remains plausible",
    routeSupportedDistinction:"Your answers favored protection before disruption, a visible board, overlapping support, setup that matters immediately, and a network that keeps functioning around a central commander. The current design associates that bundle with Bant, but the mapping still requires player evidence.",
    identityContext:"Bant’s certified context emphasizes accountable excellence supported by community; Azorius emphasizes procedure and managed stability. That philosophy helps explain the comparison, but the route tested deck behavior rather than asking you to choose between those ideals.",
    publicLimitation:"Bant remains a high-confusion identity, and this route does not validate separation from Azorius, Witch, WUBRG, or Ink."
  },
  colorless: {
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.held","b1.gate.disruption.v1.recover","b1.gate.tempo.v1.small","b1.hall.repeatability.v1.same","b1.hall.engine-shape.v1.replace","b1.hall.theme.v1.gap","b1.crucible.colorless-wubrg.v1.constraint"],
    routeSupportedHeading:"Why this stays insufficient",
    routeSupportedDistinction:"Your answers favored a repeatable plan, replaceable engine pieces, a conditional theme tradeoff, and an imposed card-pool limitation. The limitation is relevant to the Colorless hypothesis, but it is not enough to name an identity.",
    identityContext:"Colorless begins with an imposed absence of colored tools. That can make constraint-solving meaningful, but it does not imply artifacts, Eldrazi, big mana, combo, complexity, or difficulty.",
    publicLimitation:"The design lacks independent validated behavior that distinguishes Colorless from a colored deck built under a self-chosen restriction."
  },
  wubrg: {
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.split","b1.gate.disruption.v1.recover","b1.gate.tempo.v1.waves","b1.hall.repeatability.v1.toolbox","b1.hall.engine-shape.v1.overlap","b1.hall.theme.v1.theme","b1.crucible.colorless-wubrg.v1.breadth"],
    routeSupportedHeading:"Why this stays mixed",
    routeSupportedDistinction:"Your answers favored a stable purpose with changing tools, overlapping engines, theme loyalty, and broad access followed by self-chosen limits. Those observations make Five-Color worth exploring, but the identity association remains provisional.",
    identityContext:"Five-Color can use the full palette as a toolbox or unify a theme, mechanic, collection, or favorite-card concept across color boundaries. It can still use severe self-chosen restrictions; it does not imply goodstuff, complexity, power, or optimization.",
    publicLimitation:"The route does not establish that broad access, rather than the chosen concept itself, is the identity-defining preference."
  }
};
for (const walkthrough of prototype.walkthroughs) {
  const remediation = walkthroughRemediations[walkthrough.id];
  if (!remediation) continue;
  Object.assign(walkthrough,remediation);
  walkthrough.steps = remediation.answerIds.map((selectedAnswerId) => ({questionId:selectedAnswerId.slice(0,selectedAnswerId.lastIndexOf(".")),selectedAnswerId}));
  walkthrough.whatShown = "The result screen summarizes only the observations recorded by the answers selected in this review journey.";
  walkthrough.result = structuredClone(prototype.results.find((result) => result.id === walkthrough.resultIdentityId));
}
const walkthroughSource = "docs/plans/vm551-gate-b1-product-fit/representative-result-walkthroughs.md";
const architectureWalkthroughs = [
  {
    id:"esper-information-to-plan",label:"Esper architecture",subtitle:"Adaptive C16 · provisional observable state",resultIdentityId:"ESPER",state:"close",
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.held","b1.gate.disruption.v1.protect","b1.gate.tempo.v1.small","b1.hall.mana-window.v1.split","b1.hall.engine-shape.v1.central","b1.hall.information-to-plan.v1.consolidate"],
    stateNote:"Esper is structurally observable in this authored route, but every observation-to-identity association remains a non-scoring hypothesis.",
    routeSupportedHeading:"Why Esper becomes structurally observable",
    routeSupportedDistinction:"Your behavioral answers combined route consolidation after new information, organized engine structure, and retained interaction. The design can now observe that bundle, but player evidence has not validated its Esper association.",
    identityContext:"Esper's certified context treats knowledge as useful when it becomes ordered, focused change. That context interprets the behavioral bundle; it was not smuggled into the answers.",
    publicLimitation:"Generic control, combo, toolbox, artifact, Blue, Black, Azorius, Dimir, Grixis, and Jeskai patterns can produce parts of the same bundle. The result remains provisional.",
    lensEligibility:{eligible:false,reason:"The unresolved evidence is behavioral and C16 is the appropriate adaptive observation; no identity-lens question is needed.",candidateSet:["ESPER","U","B","WU","UB","GRIXIS","JESKAI"],independentBehavioralObservations:3},
    contradictionStatus:"NONE"
  },
  {
    id:"yore-no-lens",label:"Yore unresolved · no lens",subtitle:"Candidate set too broad · insufficient",resultIdentityId:"YORE",state:"insufficient",
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.held","b1.gate.disruption.v1.recover","b1.gate.tempo.v1.waves","b1.hall.engine-shape.v1.replace","b1.hall.repeatability.v1.same","b1.hall.sacrifice.v1.convert"],
    stateNote:"The behavior suggests repeatable conversion, but the candidate set is not a bounded Yore/Glint layer boundary.",
    routeSupportedHeading:"Why the lens is not eligible",
    routeSupportedDistinction:"Your behavioral answers describe replaceable pieces, repeatability, and conversion. Those patterns remain plausible for Yore, Glint, Black, Witch, Grixis, artifact, recursion, and combo decks.",
    identityContext:"Yore's certified constructed-agency lens remains useful context, but behavior did not narrow the reading enough to ask about it.",
    publicLimitation:"The candidate set is too broad. The architecture preserves an insufficient state instead of introducing Yore through a philosophy answer.",
    lensEligibility:{eligible:false,reason:"Behavior has not produced a bounded unresolved candidate set; a lens question could introduce or steer an identity.",candidateSet:["YORE","GLINT","B","WITCH","GRIXIS"],independentBehavioralObservations:3},
    contradictionStatus:"NONE"
  },
  {
    id:"yore-lens-skipped",label:"Yore unresolved · lens skipped",subtitle:"Eligible optional lens · unchanged behavior",resultIdentityId:"YORE",state:"close",
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.held","b1.gate.disruption.v1.recover","b1.gate.tempo.v1.waves","b1.hall.engine-shape.v1.replace","b1.hall.repeatability.v1.same","b1.lens.yore-glint.v1.skip"],
    stateNote:"Behavior narrowed the authored candidate set to Yore and Glint. The optional lens was skipped, so the behavioral reading is unchanged.",
    routeSupportedHeading:"Why this remains close",
    routeSupportedDistinction:"Your behavioral answers support a repeatable route built from replaceable pieces. That narrows the authored comparison, but it does not establish Yore's constructed-agency lens over Glint's emergent adaptation.",
    identityContext:"Yore and Glint remain useful lenses for exploring the same behavioral evidence from different certified contexts.",
    publicLimitation:"You did not state a directional lens preference. The close behavioral reading remains exactly as it was before the optional question.",
    lensEligibility:{eligible:true,reason:"Two independent behavioral observations leave a bounded Yore/Glint pair with a documented identity-lens boundary that behavior cannot cleanly resolve.",candidateSet:["YORE","GLINT"],independentBehavioralObservations:2},
    lensEvidence:{questionId:"b1.lens.yore-glint.v1",answerId:"b1.lens.yore-glint.v1.skip",evidenceClass:"IDENTITY_LENS_SELF_REPORT",source:"explicit optional self-report",candidateSet:["YORE","GLINT"],effect:"NON_DIRECTIONAL_BEHAVIOR_UNCHANGED",contradictionStatus:"NONE",nonScoringStatus:"NON-DIRECTIONAL-NONSCORING"},
    contradictionStatus:"NONE"
  },
  {
    id:"yore-lens-answered",label:"Yore unresolved · lens answered",subtitle:"Secondary resonance · no one-answer flip",resultIdentityId:"YORE",state:"close",
    answerIds:["b1.gate.initiative.v1.balance","b1.gate.visibility.v1.held","b1.gate.disruption.v1.recover","b1.gate.tempo.v1.waves","b1.hall.engine-shape.v1.replace","b1.hall.repeatability.v1.same","b1.lens.yore-glint.v1.constructed"],
    stateNote:"Behavior already made Yore and Glint plausible. The stated lens adds secondary context but cannot name Yore by itself.",
    routeSupportedHeading:"Why Yore is worth exploring",
    routeSupportedDistinction:"Your behavioral answers support a repeatable route built from replaceable pieces. Separately, you said deliberate constructed agency resonates more than an emergent route.",
    identityContext:"Yore's certified context can explain that stated resonance, while the Commander-behavior mapping remains unvalidated.",
    publicLimitation:"The self-report does not become behavioral proof, does not erase Glint, and cannot create a named result without the prior independent behavior.",
    lensEligibility:{eligible:true,reason:"Two independent behavioral observations leave a bounded Yore/Glint pair with a documented identity-lens boundary that behavior cannot cleanly resolve.",candidateSet:["YORE","GLINT"],independentBehavioralObservations:2},
    lensEvidence:{questionId:"b1.lens.yore-glint.v1",answerId:"b1.lens.yore-glint.v1.constructed",evidenceClass:"IDENTITY_LENS_SELF_REPORT",source:"explicit optional self-report",candidateSet:["YORE","GLINT"],effect:"SECONDARY_SUPPORT_WITHIN_PLAUSIBLE_SET",contradictionStatus:"NONE",nonScoringStatus:"SECONDARY-NONSCORING"},
    contradictionStatus:"NONE"
  },
  {
    id:"yore-lens-contradictory",label:"Yore lens contradiction",subtitle:"Behavior governs · contradiction preserved",resultIdentityId:"GLINT",state:"contradictory",
    answerIds:["b1.gate.initiative.v1.advance","b1.gate.visibility.v1.held","b1.gate.disruption.v1.recover","b1.gate.tempo.v1.waves","b1.hall.repeatability.v1.varied","b1.hall.threat.v1.pivot","b1.lens.yore-glint.v1.constructed"],
    stateNote:"Behavior strongly favors changing routes and adaptive pressure, while the player explicitly reports resonance with deliberate construction. Neither channel overwrites the other.",
    routeSupportedHeading:"Why this remains contradictory",
    routeSupportedDistinction:"Your behavioral answers favor changing routes and adapting as attention shifts. Separately, you said deliberate constructed agency resonates. The self-report cannot override the behavioral conflict.",
    identityContext:"Glint and Yore remain the bounded comparison, but the two evidence classes point in different directions.",
    publicLimitation:"The architecture preserves a contradictory result. It does not convert one lens answer into a Yore flip or hide the behavior that pointed elsewhere.",
    lensEligibility:{eligible:true,reason:"The authored route begins with a bounded Yore/Glint comparison; the lens is shown only to test contradiction handling, never to override behavior.",candidateSet:["YORE","GLINT"],independentBehavioralObservations:2},
    lensEvidence:{questionId:"b1.lens.yore-glint.v1",answerId:"b1.lens.yore-glint.v1.constructed",evidenceClass:"IDENTITY_LENS_SELF_REPORT",source:"explicit optional self-report",candidateSet:["YORE","GLINT"],effect:"CONTRADICTED_NO_OVERRIDE",contradictionStatus:"STRONG_BEHAVIORAL_CONTRADICTION",nonScoringStatus:"SECONDARY-NONSCORING"},
    contradictionStatus:"STRONG_BEHAVIORAL_CONTRADICTION"
  }
];
for (const candidate of architectureWalkthroughs) {
  candidate.whatShown = "Behavioral observations and explicit lens self-report are displayed as separate evidence classes; the result remains authored and non-calculating.";
  candidate.sourceRef = walkthroughSource;
  candidate.steps = candidate.answerIds.map((selectedAnswerId) => ({questionId:selectedAnswerId.slice(0,selectedAnswerId.lastIndexOf(".")),selectedAnswerId}));
  candidate.result = structuredClone(prototype.results.find((result) => result.id === candidate.resultIdentityId));
  const index = prototype.walkthroughs.findIndex((walkthrough) => walkthrough.id === candidate.id);
  if (index >= 0) prototype.walkthroughs[index] = candidate;
  else prototype.walkthroughs.push(candidate);
}
prototype.counts.walkthroughs = prototype.walkthroughs.length;
writeRoot("docs/prototypes/vm551-gate-b1-owner-experience/prototype-data.json",JSON.stringify(prototype,null,2)+"\n");
const prototypeQuestionById = new Map([...prototype.questions,...prototype.lensQuestions].map((question) => [question.id, question]));
const prototypeAnswerRows = prototype.questions.flatMap((question) => question.answers);
const prototypeLensAnswerRows = prototype.lensQuestions.flatMap((question) => question.answers);
const prototypeAnswerById = new Map([...prototypeAnswerRows,...prototypeLensAnswerRows].map((answer) => [answer.id, answer]));
const routeShape = prototype.walkthroughs.map((walkthrough) => {
  const questions = walkthrough.steps.map((step) => prototypeQuestionById.get(step.questionId));
  const stages = count(questions.map((question) => question?.stage));
  return { id:walkthrough.id, total:questions.length, Gate:stages.Gate||0, Hall:stages.Hall||0, Crucible:stages.Crucible||0 };
});
const routeDiagnostics = prototype.walkthroughs.map((walkthrough) => {
  const questionIds = walkthrough.steps.map((step) => step.questionId);
  const optionalSteps = walkthrough.steps.filter((step) => prototypeQuestionById.get(step.questionId)?.stage !== "Gate");
  const crucibleStep = optionalSteps.find((step) => prototypeQuestionById.get(step.questionId)?.stage === "Crucible");
  const crucibleDependency = crucibleStep ? prototypeAnswerById.get(crucibleStep.selectedAnswerId)?.dependencyGroup : null;
  const repeatedOptionalDependency = crucibleDependency
    ? optionalSteps.filter((step) => prototypeQuestionById.get(step.questionId)?.stage === "Hall" && prototypeAnswerById.get(step.selectedAnswerId)?.dependencyGroup === crucibleDependency).length
    : 0;
  return {
    id:walkthrough.id,
    duplicateQuestionIds:questionIds.length-new Set(questionIds).size,
    duplicateHallQuestionIds:questionIds.filter((id)=>prototypeQuestionById.get(id)?.stage==="Hall").length-new Set(questionIds.filter((id)=>prototypeQuestionById.get(id)?.stage==="Hall")).size,
    repeatedOptionalDependency,
    answerListMatches:walkthrough.answerIds.length===walkthrough.steps.length&&walkthrough.answerIds.every((id,index)=>id===walkthrough.steps[index].selectedAnswerId),
    truthFields:Boolean(walkthrough.routeSupportedHeading&&walkthrough.routeSupportedDistinction&&walkthrough.identityContext&&walkthrough.publicLimitation)
  };
});
const prototypeApp = read("docs/prototypes/vm551-gate-b1-owner-experience/app.js");
const contentReadinessCounts = count(prototype.results.map((result)=>result.contentReadiness));
const observabilityCounts = count(prototype.results.map((result)=>result.instrumentObservability));
const mappingValidationCounts = count(prototype.results.map((result)=>result.mappingValidation));
const forbiddenPrototypeValueKeys = [];
const visitPrototype = (value, pathParts=[]) => {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const next = [...pathParts,key];
    if (/^(weight|weights|points|score|scores|probability|probabilities)$/i.test(key)) forbiddenPrototypeValueKeys.push(next.join("."));
    if (/confidence/i.test(key) && typeof child === "number") forbiddenPrototypeValueKeys.push(next.join("."));
    visitPrototype(child,next);
  }
};
visitPrototype(prototype);
const checks = [
  ["113 current questions",qAudit.length===113,qAudit.length],["356 current answers",aAudit.length===356,aAudit.length],
  ["16 constructs",C.length===16,C.length],["35 pilot questions",Q.length===35,Q.length],
  ["4 Gate / 13 Hall / 18 Crucible",stages.Gate===4&&stages.Hall===13&&stages.Crucible===18,`${stages.Gate}/${stages.Hall}/${stages.Crucible}`],
  ["110 answer contracts",answers.length===110,answers.length],["110 semantic reviews",semanticReviews.length===110,semanticReviews.length],
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
  ["canonical jargon definitions",Q.every((x)=>x.glossary===helperDefinitionsFor(x).join(" ")),Q.length],
  ["no help for absent terms",Q.every((x)=>x.jargonIds.every((id)=>allQuestionCopy(x).toLowerCase().includes(jargonById.get(id).term.toLowerCase()))),Q.filter((x)=>x.jargonIds.some((id)=>!allQuestionCopy(x).toLowerCase().includes(jargonById.get(id).term.toLowerCase()))).map((x)=>x.id).join(",")||Q.length],
  ["load-bearing jargon explained",Q.every((x)=>loadBearingJargon.every(([pattern,id])=>!pattern.test(allQuestionCopy(x))||x.jargonIds.includes(id))),Q.filter((x)=>loadBearingJargon.some(([pattern,id])=>pattern.test(allQuestionCopy(x))&&!x.jargonIds.includes(id))).map((x)=>x.id).join(",")||Q.length],
  ["no cross-reference-only help",Q.every((x)=>!/defined in (Hall|Gate|Crucible)|defined earlier/i.test(x.glossary)),Q.length],
  ["rules/community authority aligned",J.every((j)=>j.jargon_class!=="RULES_DEFINED"||j.authority_type.startsWith("OFFICIAL_WOTC"))&&J.every((j)=>j.jargon_class!=="COMMUNITY_STANDARD"||!j.authority_type.startsWith("OFFICIAL_WOTC_COMPREHENSIVE_RULES")),J.length],
  ["no graveyard object called permanent",Q.every((x)=>!/permanents? (?:in|reached|went to) (?:your |a |the )?graveyard/i.test(allQuestionCopy(x))),Q.length],
  ["non-scoring only",answers.every((x)=>x.scoring_status.includes("NONSCORING")),answers.length],
  ["no numeric confidence",answers.every((x)=>["LOW-PROVISIONAL","DIRECT-UNCERTAINTY"].includes(x.mapping_confidence)),answers.length],
  ["106 existing answer IDs preserved",answers.filter((answer)=>answer.construct_id!=="C16").length===106,answers.filter((answer)=>answer.construct_id!=="C16").length],
  ["four expected C16 answer IDs only",new Set(answers.filter((answer)=>answer.construct_id==="C16").map((answer)=>answer.answer_id)).size===4&&["b1.hall.information-to-plan.v1.consolidate","b1.hall.information-to-plan.v1.open","b1.hall.information-to-plan.v1.exploit","b1.hall.information-to-plan.v1.depends"].every((id)=>answerIds.has(id)),answers.filter((answer)=>answer.construct_id==="C16").map((answer)=>answer.answer_id).join(",")],
  ["C16 atomic non-overlap contract",C.find((construct)=>construct.construct_id==="C16")?.dependency_overlap.includes("independent of C01/C04/C06/C08/C09/C14/C15")&&C.find((construct)=>construct.construct_id==="C16")?.does_not_mean.includes("Intelligence")&&Q.find((question)=>question.id==="b1.hall.information-to-plan.v1")?.stage==="Hall","C16"],
  ["C16 cross-identity and non-scoring",["Esper","Blue","Black","Azorius","Dimir","Grixis","Jeskai","control","combo","toolbox","midrange","tempo"].every((term)=>C.find((construct)=>construct.construct_id==="C16")?.applicable_identity_families.includes(term))&&answers.filter((answer)=>answer.construct_id==="C16").every((answer)=>answer.scoring_status.includes("NONSCORING")&&!/ESPER/i.test(answer.primary_signal)),answers.filter((answer)=>answer.construct_id==="C16").length],
  ["C01 one dependency group",answers.filter((x)=>x.construct_id==="C01").every((x)=>x.dependency_group==="DG_C01"),answers.filter((x)=>x.construct_id==="C01").length],
  ["C05 Bant commander-specific",Q.find((x)=>x.id==="b1.crucible.bant.v1").prompt.toLowerCase().includes("commander"),Q.find((x)=>x.id==="b1.crucible.bant.v1").prompt],
  ["C15 boundary-only",answers.filter((x)=>x.construct_id==="C15").every((x)=>x.exclusions.includes("Boundary evidence only")||x.scoring_status==="NON-DIRECTIONAL-NONSCORING"),answers.filter((x)=>x.construct_id==="C15").length],
  ["route hard maximum eight",4+3+1===8,"4 Gate + 3 Hall + 1 Crucible"],
  ["owner remediation prompts exact",Object.entries({
    "b1.hall.pressure.v1":"Which kind of progress makes your deck feel like it’s doing its job?",
    "b1.hall.mana-window.v1":"If you can either spend most of your mana advancing your own plan or keep it available to answer opponents, which do you prefer?",
    "b1.hall.repeatability.v1":"Across several games with the same deck, how much do you want the path to your main plan to repeat?",
    "b1.hall.theme.v1":"For one deck slot, assume you can’t get both: one card fits your theme better, while another does the same job more reliably. Which do you keep?",
    "b1.hall.setup.v1":"Early in the game, how much do you want your setup plays to matter right away?",
    "b1.hall.breadth.v1":"Once you know what you want a deck to do, how much do you want the available cards to shape the challenge?",
    "b1.crucible.mono-multi.v1":"Two decks play the way you like. One is mono-color; the other combines several colors. Which deckbuilding challenge sounds more appealing?",
    "b1.crucible.colorless-wubrg.v1":"When building around an idea you like, which kind of challenge sounds more satisfying?"
  }).every(([id,prompt])=>Q.find((question)=>question.id===id)?.prompt===prompt),"8/8"],
  ["canonical novice-safe engine help",J.find((j)=>j.jargon_id==="JRG_ENGINE")?.canonical_public_definition==="An engine is a card or group of cards that repeatedly helps your deck—for example by drawing cards, making mana or tokens, or building counters."&&Q.filter((question)=>question.construct==="C06").every((question)=>question.jargonIds.includes("JRG_ENGINE")),Q.filter((question)=>question.construct==="C06").length],
  ["no player-facing value-engine phrase",Q.every((question)=>! /value engine/i.test(allQuestionCopy(question))),Q.filter((question)=>/value engine/i.test(allQuestionCopy(question))).map((question)=>question.id).join(",")||"none"],
  ["C15 imposed-versus-chosen boundary",C.find((construct)=>construct.construct_id==="C15")?.plain_definition.includes("available card pool versus restrictions the builder chooses")&&answerById.get("b1.hall.breadth.v1.narrow")?.plain_language_observation.includes("imposed card-pool")&&answerById.get("b1.hall.breadth.v1.broad")?.plain_language_observation.includes("self-chosen boundaries"),"C15"],
  ["Colorless/WUBRG player copy does not reveal pair",!/(Colorless|Five-Color|WUBRG|artifacts|Eldrazi|mana fixing)/i.test(allQuestionCopy(Q.find((question)=>question.id==="b1.crucible.colorless-wubrg.v1"))),"shared pair item"],
  ["three owner-approved prompt tunes exact",
    Q.find((x)=>x.id==="b1.gate.initiative.v1").prompt==="Your turn begins, no urgent threat needs an answer, and you have enough mana to act. What feels best?" &&
    Q.find((x)=>x.id==="b1.gate.tempo.v1").prompt==="When your Commander deck is doing what you built it to do, how do you want the advantage to arrive?" &&
    Q.find((x)=>x.id==="b1.crucible.wb.v1").prompt==="A table deal could solve the immediate problem facing both you and another player. What makes it worth accepting?","3/3"],
  ["six owner signal resolutions incorporated",
    answerById.get("b1.hall.interaction-window.v1.pressure").primary_signal==="SIG_C08_COMMIT_WINDOW" &&
    !/preventive pressure/i.test(`${answerById.get("b1.hall.interaction-window.v1.pressure").answer_title} ${answerById.get("b1.hall.interaction-window.v1.pressure").explanatory_sentence} ${answerById.get("b1.hall.interaction-window.v1.pressure").plain_language_observation}`) &&
    answerById.get("b1.crucible.ug.v1.adapt").primary_signal==="SIG_C06_MODULAR" &&
    /overlapping engines/i.test(answerById.get("b1.crucible.ug.v1.adapt").plain_language_observation) &&
    !/creature-centered|creature-focused/i.test(`${answerById.get("b1.crucible.ug.v1.adapt").answer_title} ${answerById.get("b1.crucible.ug.v1.adapt").explanatory_sentence} ${answerById.get("b1.crucible.ug.v1.adapt").plain_language_observation}`) &&
    answerById.get("b1.crucible.ug.v1.scale").primary_signal==="SIG_C06_CENTRAL" &&
    /central engine/i.test(answerById.get("b1.crucible.ug.v1.scale").plain_language_observation) &&
    answerById.get("b1.crucible.wb.v1.influence").primary_signal==="SIG_C13_REVISABLE" &&
    /current (table )?situation without binding (anyone's )?later choices/i.test(answerById.get("b1.crucible.wb.v1.influence").explanatory_sentence) &&
    answerById.get("b1.crucible.witch-yore.v1.compound").primary_signal==="SIG_C06_CENTRAL" &&
    /central engine.*compounds value over time/i.test(answerById.get("b1.crucible.witch-yore.v1.compound").plain_language_observation) &&
    answerById.get("b1.crucible.witch-yore.v1.convert").primary_signal==="SIG_C06_REDUNDANT" &&
    /interchangeable conversion pieces.*indispensable engine/i.test(answerById.get("b1.crucible.witch-yore.v1.convert").plain_language_observation),"6/6"],
  ["no unresolved signal reviews",semanticReviews.every((x)=>x.review_disposition!=="SIGNAL_REVIEW_REQUIRED"),semanticReviews.filter((x)=>x.review_disposition==="SIGNAL_REVIEW_REQUIRED").length],
  ["evidence-required hypotheses remain non-scoring",semanticReviews.filter((x)=>x.review_disposition==="EVIDENCE_REQUIRED").length===40&&semanticReviews.filter((x)=>x.review_disposition==="EVIDENCE_REQUIRED").every((x)=>answerById.get(x.answer_id).scoring_status==="PILOT-HYPOTHESIS-NONSCORING"),semanticReviews.filter((x)=>x.review_disposition==="EVIDENCE_REQUIRED").length],
  ["prototype core counts",prototype.counts.constructs===16&&prototype.questions.length===35&&prototypeAnswerRows.length===110&&prototype.results.length===37&&prototype.lensQuestions.length===1,`${prototype.counts.constructs}/${prototype.questions.length}/${prototypeAnswerRows.length}/${prototype.results.length}/${prototype.lensQuestions.length}`],
  ["prototype stage counts",prototype.counts.stages.Gate===4&&prototype.counts.stages.Hall===13&&prototype.counts.stages.Crucible===18,`${prototype.counts.stages.Gate}/${prototype.counts.stages.Hall}/${prototype.counts.stages.Crucible}`],
  ["prototype unique IDs",new Set(prototype.questions.map((question)=>question.id)).size===35&&new Set(prototypeAnswerRows.map((answer)=>answer.id)).size===110&&new Set(prototype.results.map((result)=>result.id)).size===37&&new Set(prototypeLensAnswerRows.map((answer)=>answer.id)).size===3,"35/110/37/3 lens answers"],
  ["prototype stable answer provenance",prototypeAnswerRows.every((answer)=>answer.id&&answer.sourceRef&&answer.evidence&&answer.status&&answer.limitation),prototypeAnswerRows.length],
  ["prototype answer semantics unchanged",answers.every((answer)=>{
    const candidate=prototypeAnswerById.get(answer.answer_id);
    return candidate&&candidate.observation===answer.plain_language_observation&&candidate.primarySignal===answer.primary_signal&&candidate.secondarySignal===(answer.optional_bounded_secondary_signal||null)&&candidate.dependencyGroup===answer.dependency_group&&candidate.exclusions===answer.exclusions&&candidate.evidence===answer.evidence_provenance&&candidate.mappingConfidence===answer.mapping_confidence&&candidate.status===answer.scoring_status&&candidate.limitation===answer.limitation_statement;
  }),prototypeAnswerRows.length],
  ["prototype ten walkthroughs",prototype.walkthroughs.length===10&&new Set(prototype.walkthroughs.map((walkthrough)=>walkthrough.id)).size===10,prototype.walkthroughs.length],
  ["required architecture walkthroughs",["simic-quandrix","esper-information-to-plan","yore-no-lens","yore-lens-skipped","yore-lens-answered","yore-lens-contradictory"].every((id)=>prototype.walkthroughs.some((walkthrough)=>walkthrough.id===id)),prototype.walkthroughs.map((walkthrough)=>walkthrough.id).join(",")],
  ["lens evidence class separate",prototype.evidenceClasses.some((item)=>item.id==="IDENTITY_LENS_SELF_REPORT")&&prototype.lensQuestions.length===1&&prototype.lensQuestions[0].evidenceClass==="IDENTITY_LENS_SELF_REPORT"&&!prototype.lensQuestions[0].constructId,"separate evidence class"],
  ["lens never broad and max one",prototype.lensQuestions.every((question)=>question.stage==="Crucible"&&question.maxPerJourney===1)&&prototype.walkthroughs.every((walkthrough)=>walkthrough.steps.filter((step)=>step.questionId.startsWith("b1.lens.")).length<=1),prototype.lensQuestions.length],
  ["lens eligibility bounded",prototype.walkthroughs.filter((walkthrough)=>walkthrough.lensEligibility?.eligible).every((walkthrough)=>walkthrough.lensEligibility.independentBehavioralObservations>=2&&walkthrough.lensEligibility.candidateSet.length===2)&&prototype.walkthroughs.find((walkthrough)=>walkthrough.id==="yore-no-lens")?.lensEligibility?.eligible===false,"at least two observations and bounded pair"],
  ["lens skip non-directional",prototypeAnswerById.get("b1.lens.yore-glint.v1.skip")?.direction==="NON_DIRECTIONAL"&&prototypeAnswerById.get("b1.lens.yore-glint.v1.skip")?.status==="NON-DIRECTIONAL-NONSCORING"&&prototype.walkthroughs.find((walkthrough)=>walkthrough.id==="yore-lens-skipped")?.lensEvidence?.effect==="NON_DIRECTIONAL_BEHAVIOR_UNCHANGED","skip leaves behavior unchanged"],
  ["lens cannot introduce or override",prototype.lensQuestions[0].doNotAskWhen.includes("either candidate is excluded or strongly contradicted")&&prototype.walkthroughs.find((walkthrough)=>walkthrough.id==="yore-lens-contradictory")?.lensEvidence?.effect==="CONTRADICTED_NO_OVERRIDE"&&prototype.walkthroughs.find((walkthrough)=>walkthrough.id==="yore-lens-contradictory")?.state==="contradictory","contradiction preserved"],
  ["lens question does not reveal faction",!/(Yore|Glint|faction|missing.Green|civilization.*nature)/i.test(`${prototype.lensQuestions[0].prompt} ${prototype.lensQuestions[0].answers.map((answer)=>`${answer.title} ${answer.explanation}`).join(" ")}`),prototype.lensQuestions[0].prompt],
  ["prototype route composition",routeShape.every((route)=>route.Gate===4&&[2,3].includes(route.Hall)&&[0,1].includes(route.Crucible)&&route.total>=6&&route.total<=8),JSON.stringify(routeShape)],
  ["prototype route exact-question hygiene",routeDiagnostics.every((route)=>route.duplicateQuestionIds===0&&route.duplicateHallQuestionIds===0),JSON.stringify(routeDiagnostics)],
  ["prototype route dependency hygiene",routeDiagnostics.every((route)=>route.repeatedOptionalDependency===0),JSON.stringify(routeDiagnostics)],
  ["prototype route summaries match authored answers",routeDiagnostics.every((route)=>route.answerListMatches&&route.truthFields),JSON.stringify(routeDiagnostics)],
  ["prototype route IDs resolve",prototype.walkthroughs.every((walkthrough)=>walkthrough.steps.every((step)=>prototypeQuestionById.has(step.questionId)&&prototypeAnswerById.has(step.selectedAnswerId)&&prototypeAnswerById.get(step.selectedAnswerId).id.startsWith(`${step.questionId}.`))),prototype.walkthroughs.reduce((total,walkthrough)=>total+walkthrough.steps.length,0)],
  ["prototype three-axis states match source",prototype.results.every((result)=>{const source=productResultById.get(result.id);return source?.content_readiness===result.contentReadiness&&source?.instrument_observability===result.instrumentObservability&&source?.mapping_validation===result.mappingValidation;}),prototype.results.length],
  ["37 content ready",contentReadinessCounts.CONTENT_READY===37&&Object.keys(contentReadinessCounts).length===1,JSON.stringify(contentReadinessCounts)],
  ["final observability counts",observabilityCounts.OBSERVABLE===22&&observabilityCounts.PARTIALLY_OBSERVABLE===14&&observabilityCounts.NOT_CLEANLY_OBSERVABLE===1,JSON.stringify(observabilityCounts)],
  ["37 mapping hypotheses",mappingValidationCounts.MAPPING_HYPOTHESIS===37&&Object.keys(mappingValidationCounts).length===1,JSON.stringify(mappingValidationCounts)],
  ["Esper observability reassessed",productResultById.get("ESPER")?.instrument_observability==="OBSERVABLE"&&productResultById.get("ESPER")?.observability_rationale.includes("C16"),productResultById.get("ESPER")?.instrument_observability],
  ["Yore three-axis state",productResultById.get("YORE")?.content_readiness==="CONTENT_READY"&&productResultById.get("YORE")?.instrument_observability==="NOT_CLEANLY_OBSERVABLE"&&productResultById.get("YORE")?.mapping_validation==="MAPPING_HYPOTHESIS","CONTENT_READY/NOT_CLEANLY_OBSERVABLE/MAPPING_HYPOTHESIS"],
  ["four-color subtitles",["DUNE","INK","GLINT","WITCH","YORE"].every((id)=>prototype.results.find((result)=>result.id===id)?.subtitle?.startsWith("Four-color expression centered on")),"5/5"],
  ["C03 duplicate definition removed",Q.find((question)=>question.id==="b1.gate.disruption.v1")?.prompt.includes("an effect that removes many cards and tokens")&&Q.find((question)=>question.id==="b1.gate.disruption.v1")?.glossary==="A graveyard is a player's discard pile."&&prototypeApp.includes('["JRG_BOARD_WIPE", "JRG_BOARD"].includes(item.id)'),"prompt definition plus graveyard helper only"],
  ["no exact prompt-helper definition duplication",duplicateQuestionHelperPairs.length===0,duplicateQuestionHelperPairs.join(",")||"none"],
  ["mono-color wording",Q.find((question)=>question.id==="b1.crucible.mono-multi.v1")?.prompt.includes("One is mono-color; the other combines several colors"),Q.find((question)=>question.id==="b1.crucible.mono-multi.v1")?.prompt],
  ["result truthfulness UI",prototypeApp.includes("groupedObservations(walkthrough)")&&prototypeApp.includes("Why this identity is plausible")&&prototypeApp.includes("What distinguishes the two")&&prototypeApp.includes("What remains unsettled")&&!prototypeApp.includes("<strong>Missing value:</strong>"),"grouped observations/context/distinction/public limitation"],
  ["authored mismatch reviewer-only",prototypeApp.includes("Authored-path check")&&!prototypeApp.includes("Your selections differ from the authored review path, so this static prototype"),"reviewer-only safeguard"],
  ["compact continuation UI",prototypeApp.includes("Open dossier")&&prototypeApp.includes("Compare in Matrix")&&prototypeApp.includes("Explore in Maze")&&prototypeApp.includes("See Commander directions"),"4 inert prototype destinations"],
  ["result source traceability",productFitResults.every((result)=>result.certified_identity_context&&result.answer_observation_sources&&result.certified_identity_sources&&result.nearest_alternative_sources&&result.content_rationale&&result.observability_rationale&&result.unresolved_validation_need),productFitResults.length],
  ["prototype result source traceability",prototype.results.every((result)=>result.identityContext&&result.answerObservationSources&&result.certifiedIdentitySources&&result.nearestAlternativeSources&&result.contentRationale&&result.observabilityRationale&&result.unresolvedValidationNeed),prototype.results.length],
  ["content readiness disclaimer",prototypeApp.includes("Content readiness describes whether the result explanation package is usable. It does not mean placement accuracy or identity mapping has been validated."),"present"],
  ["lens result explanation separated",prototypeApp.includes("What your Commander answers showed")&&prototypeApp.includes("What you said resonates")&&prototypeApp.includes("Evidence class")&&prototypeApp.includes("Contradiction status"),"behavior and self-report separated"],
  ["prototype unresolved validation needs preserved",prototype.results.every((result)=>result.unresolvedValidationNeed&&result.unresolvedValidationNeed===productResultById.get(result.id)?.unresolved_validation_need),prototype.results.length],
  ["prototype exact prompt tunes",["b1.gate.initiative.v1","b1.gate.tempo.v1","b1.crucible.wb.v1"].every((id)=>prototypeQuestionById.get(id)?.prompt===Q.find((question)=>question.id===id)?.prompt),"3/3"],
  ["product-fit tune rows closed",productFitQuestions.filter((question)=>question.product_fit_disposition==="OWNER_APPROVED_TUNE_APPLIED").length===3&&productFitQuestions.filter((question)=>question.product_fit_disposition==="OWNER_APPROVED_TUNE_APPLIED").every((question)=>question.owner_review_required==="NO"),productFitQuestions.filter((question)=>question.product_fit_disposition==="OWNER_APPROVED_TUNE_APPLIED").length],
  ["hands-on owner remediations recorded",productFitQuestions.filter((question)=>question.product_fit_disposition==="OWNER_REMEDIATION_APPLIED").length===13&&productFitQuestions.filter((question)=>question.product_fit_disposition==="OWNER_REMEDIATION_APPLIED").every((question)=>question.reason.startsWith("Hands-on owner review superseded the prior KEEP judgment")),productFitQuestions.filter((question)=>question.product_fit_disposition==="OWNER_REMEDIATION_APPLIED").length],
  ["prototype contains no scoring value fields",forbiddenPrototypeValueKeys.length===0,forbiddenPrototypeValueKeys.join(",")||"none"],
  ["prototype source references present",prototype.metadata.sourceRefs.length===10&&prototype.questions.every((question)=>question.sourceRef&&question.productFit.sourceRef)&&prototype.results.every((result)=>result.sourceRef)&&prototype.walkthroughs.every((walkthrough)=>walkthrough.sourceRef)&&prototype.lensQuestions.every((question)=>question.sourceRef),prototype.metadata.sourceRefs.length],
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
