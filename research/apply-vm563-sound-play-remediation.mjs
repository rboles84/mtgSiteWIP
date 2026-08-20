import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildRuntimeCatalog } from "../scripts/build/build-card-rationale-artifacts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const write = process.argv.includes("--write");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const pretty = (value) => `${JSON.stringify(value, null, 2)}\n`;
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");
const fail = (message) => { throw new Error(message); };

const paths = {
  voiceSource: "data/dossier/card-voice-relationships.source.json",
  voicePrintings: "data/dossier/card-voice-printings.source.json",
  voiceCatalog: "data/dossier/card-voice-catalog.json",
  playSource: "data/dossier/card-rationale-relationships.source.json",
  playCatalog: "data/dossier/card-rationale-catalog.json",
  ledger: "docs/research/archscry-sound-play-audit/card-evidence-ledger.json",
  calibration: "docs/research/archscry-sound-play-audit/prose-calibration.source.json",
  manifest: "docs/research/archscry-sound-play-audit/vm563-final-remediation-manifest.json",
  summary: "docs/research/archscry-sound-play-audit/vm563-final-remediation-summary.md",
  intake: "docs/research/archscry-sound-play-audit/vm563-source-intake.md",
  scryfall: "data/scryfall/raw/oracle-cards.json",
};

const [voiceSourceInput, voicePrintingsInput, voiceCatalogInput, playSourceInput, playCatalogInput, ledger, calibration, scryfall] = await Promise.all([
  readJson(paths.voiceSource), readJson(paths.voicePrintings), readJson(paths.voiceCatalog), readJson(paths.playSource), readJson(paths.playCatalog), readJson(paths.ledger), readJson(paths.calibration), readJson(paths.scryfall),
]);

const duneReplacement = {
  ledger_id: "SOUND-DUNE-2-cardvoice_vm558_dune_241a50c5_f65f_4847_89c7_5c0ef6025dc1",
  prior_relationship_id: "cardvoice_vm558_dune_241a50c5_f65f_4847_89c7_5c0ef6025dc1",
  relationship_id: "cardvoice_vm563_dune_634bd800_8caa_47ae_8b70_2c66baf9a355",
  scryfall_id: "15b4ee44-28c4-4a39-9c06-aca43787954f",
  oracle_id: "634bd800-8caa-47ae-8b70-2c66baf9a355",
  card_name: "Dune-Brood Nephilim",
  exact_flavor_text: "When it awoke, it spawned nameless thousands to herald its arrival.",
  modal_explanation: "The “nameless thousands” become literal when Dune-Brood connects: every land you control adds another Sand token. That multiplying surge gives Dune's physical momentum a different voice from Aurelia's front-line command.",
};
const duneCard = scryfall.find((card) => card.id === duneReplacement.scryfall_id);
if (!duneCard) fail(`Missing committed Scryfall printing: ${duneReplacement.scryfall_id}`);
for (const [field, expected] of Object.entries({ name: duneReplacement.card_name, oracle_id: duneReplacement.oracle_id, flavor_text: duneReplacement.exact_flavor_text, set: "gpt", collector_number: "110", type_line: "Creature — Nephilim" })) {
  if (duneCard[field] !== expected) fail(`Dune replacement ${field} drifted: expected ${JSON.stringify(expected)}, found ${JSON.stringify(duneCard[field])}`);
}

const overrides = new Map();
const set = (ledgerId, values) => overrides.set(ledgerId, values);

for (const proposal of calibration.proposals) {
  set(proposal.ledger_id, {
    ...(proposal.proposed_tile_text ? { tile: proposal.proposed_tile_text } : {}),
    ...(proposal.proposed_modal_text ? { modal: proposal.proposed_modal_text } : {}),
    reason: proposal.reason_for_change,
    change_class: "SEMANTIC_REMEDIATION",
  });
}

// VM-561 REMEDIATION_LIKELY rows outside the frozen VM-562 calibration.
set("SOUND-W-1-cardvoice_w_ae61b2ef_2e60_499a_8708_e37b9bd5620e", { modal: "The important word is “align”: White treats agreement as useful when it moves people from shared conviction into coordinated action.", reason: "Replace a quotation paraphrase with the supported link between alignment and coordinated action.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-W-1-cardrel_auto_w_48e6d3d8_2f27_4017_acdd_40bce8cdbc02", { modal: "Giada asks you to build the flock in order. Every Angel already in play makes the next arrival larger, while her mana ability helps keep that sequence moving.", reason: "Replace generic White language with Giada's cumulative Angel sequence.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-U-1-cardrel_auto_u_ea1eb902_a23c_44ff_9169_19baf71de238", { modal: "Holding an instant for the right moment no longer means giving up board development: after the spell resolves, Talrand leaves a flying Drake behind. Blue's patience becomes a growing air force.", reason: "Explain the card-specific reward for holding and timing spells.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-R-1-cardrel_auto_r_8c3495bf_02e7_4ad9_949d_92eb3d2b662a", { tile: "Torbran adds 2 damage whenever a red source you control would damage an opponent or one of their permanents.", modal: "Torbran changes the arithmetic before damage is dealt. Small red sources become meaningful threats, rewarding a turn where several modest hits arrive together instead of waiting for one oversized play.", reason: "Ground Red's direct action in Torbran's damage replacement effect and remove a repeated example scaffold.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-WU-3-cardrel_wu_1f8d4d5f", { tile: "Grand Arbiter makes your white and blue spells cost less while making every opponent's spell cost more.", modal: "The advantage is procedural rather than explosive: your own sequence becomes easier to execute while each opposing action asks for one more mana. The table has to plan around a rule you established simply by keeping him in play.", reason: "Remove unsupported superlatives and explain the asymmetric tax experience.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-UB-1-cardrel_ub_8027a610", { tile: "When an opponent's creature card reaches their graveyard, Lazav can copy it while keeping his name, legendary status, hexproof, and the ability to copy again.", modal: "You do not choose Lazav's next identity from your own deck; you wait for an opponent to reveal a useful creature, then turn that loss into your disguise. The table's information becomes Dimir material.", reason: "Replace certification language with Lazav's verified copy-and-disguise play pattern.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-BR-1-cardrel_br_143a269a", { modal: "Rakdos cannot enter until an opponent has lost life, so the turn begins with a performance that draws blood. The more life the table loses, the more dramatically he discounts the creatures that follow.", reason: "Differentiate Lord of Riots through its life-loss gate and cost reduction.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-BR-6-cardrel_br_03a4b997", { modal: "His entrance makes every non-Demon, non-Devil, and non-Imp face its own coin flip. You invite the spectacle knowing your creatures may fall with everyone else's, which is precisely where the risk becomes part of the show.", reason: "Differentiate Showstopper through its creature-by-creature coin-flip risk.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-RG-1-cardrel_rg_b7505737", { tile: "Borborygmos turns combat damage into lands in hand, then lets you discard those lands to deal 3 damage to any target.", modal: "Connecting once stocks the next barrage: lands revealed from the top three become ammunition rather than future land drops. Gruul force continues after combat because the landscape itself gets thrown at the next target.", reason: "Replace internal identity-role wording with the card's land-fed combat loop.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-RG-3-cardrel_rg_ebf3fd80", { modal: "Nikya doubles the mana your lands produce, but only while you accept her ban on noncreature spells. Building around her means choosing creatures to perform jobs that another deck would give to instants, sorceries, or artifacts.", reason: "Replace the shared Gruul modal with Nikya's deck-building bargain.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-WG-1-cardrel_wg_e94ef397", { tile: "Trostani gains life from each other creature that enters under your control, then populate copies a creature token you already have.", modal: "The first token establishes what the community can become; populate lets Trostani repeat that body instead of starting over. Wider creature development also restores life according to each new creature's toughness.", reason: "Replace office/authority language with Trostani's creature-and-populate play pattern.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-WB-1-cardrel_wb_644eeefd", { tile: "Teysa Karlov makes your permanents' death triggers happen twice, while giving your creature tokens vigilance and lifelink.", modal: "A creature dying is no longer a single transaction: every eligible trigger pays twice. Meanwhile, token creatures can attack without giving up defense and can return life, so the workforce remains useful before and after death.", reason: "Remove product-fit language and explain Teysa Karlov's doubled death economy.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-WB-2-cardrel_wb_8191342b", { modal: "A black creature's death leaves a white Spirit behind, and three white creatures can then be sacrificed to exile a threat. Teysa keeps moving bodies between roles until enough small obligations become removal.", reason: "Differentiate this Teysa through her death-to-token-to-exile sequence.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-WB-5-cardrel_wb_647d7988", { tile: "Each lifegain event puts two +1/+1 counters on Karlov, and removing six of those counters exiles a creature.", modal: "Many small lifegain events can build Karlov faster than one large gain. Once he has six counters to spend, the accumulated payments become a sentence against the creature you choose.", reason: "Differentiate Karlov through repeated lifegain events and counter expenditure while removing abstract methodology-adjacent wording.", change_class: "SEMANTIC_REMEDIATION" });
set("SOUND-UR-1-cardvoice_ur_fa09e18c_e7cf_4f08_9cc4_324e36594063", { modal: "The humor is that replication is both scientific discipline and Izzet enthusiasm: a result is not finished until someone can make it happen again—preferably with more sparks.", reason: "Add the experimental implication beyond repeating the flavor line.", change_class: "SEMANTIC_REMEDIATION" });
set("SOUND-UR-2-cardvoice_vm558_ur_2dfad8c3_1973_4fc8_971d_f66cacd88070", { modal: "Weather is the punch line because it is supposed to be chaotic. Calling it more predictable makes Izzet invention sound restless enough to surprise even the people conducting it.", reason: "Explain the comparison's joke rather than restating unpredictability.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-UR-1-cardrel_ur_33666a98", { tile: "Niv-Mizzet draws whenever any player casts an instant or sorcery, then turns every card you draw into 1 damage to a target.", modal: "A spell on either side of the table feeds the experiment. Each new card becomes a precise point of damage, so a long exchange of instants and sorceries lets Niv-Mizzet keep observing and answering at the same time.", reason: "Replace native-bridge wording and the shared modal with the spell-draw-damage loop.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-UR-2-cardrel_ur_095d9719", { modal: "Everyone sees the top card, but only you can turn a revealed instant or sorcery into two casts. Melek makes the experiment public, then rewards you for arranging the library so the next result is one worth copying.", reason: "Differentiate Melek through public information and top-of-library spell copying.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-BG-1-cardrel_bg_87e65e36", { modal: "Jarad grows with every creature card already in your graveyard, then can sacrifice another creature to drain each opponent by its power. Even Jarad's own return asks for a Swamp and Forest, so recovery keeps consuming living resources.", reason: "Explain Jarad's distinct graveyard growth, sacrifice, and return costs.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-WR-1-cardrel_wr_0f5a3a09", { tile: "Aurelia attacks with haste, untaps your creatures, and creates a second combat the first time she attacks each turn.", modal: "The first charge prepares the second one. Creatures that attacked stand ready again, letting the Legion correct targets, press a weakened defender, or commit a new formation before the turn ends.", reason: "Remove unsupported definitive language and explain Aurelia's coordinated two-combat sequence.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-WR-3-cardrel_wr_ae6f21a2", { modal: "Tajic wants to join the attack: mentor strengthens a smaller attacker, while his prevention shield keeps the rest of your creatures safe from noncombat damage. Advancing the team and protecting it happen in the same formation.", reason: "Differentiate Tajic through mentor plus team protection.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-SILVERQUILL-1-cardrel_auto_silverquill_d11e627b_8a48_411d_a261_2c9a02a758ba", { modal: "Breena changes whom the table is willing to attack. Swinging at a player with the highest life can pay the attacker a card, while you decide which creature receives the counters and turns that public argument into your advantage.", reason: "Explain the political choice and asymmetric reward created by Breena.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-BANT-1-cardrel_bant_c6e17443", { modal: "Rafiq asks the rest of your board to stay back while one creature attacks alone. Exalted support and double strike concentrate the whole formation's strength in a single chosen champion.", reason: "Replace broad Bant language with the attack-alone commitment.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-ESPER-1-cardrel_auto_esper_3268251a_8292_44f9_9267_c961b182f739", { modal: "A noncreature spell costing three or more drains every opponent for 2, immediately meeting part of the four-life threshold that can draw a card at the end step. Esper planning becomes a repeatable question of how to cross that known line each turn.", reason: "Explain the interaction between Y'shtola's two thresholds.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-JUND-1-cardrel_auto_jund_868882d2_ed4e_4171_a17c_478a341080fb", { modal: "Paying more commander tax makes Prossh bring more Kobolds, so repeated casts rebuild the food supply. Any one of those bodies can be sacrificed at once to increase his power for the current turn.", reason: "Explain Prossh's cast scaling and immediate sacrifice conversion.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-ABZAN-1-cardrel_auto_abzan_2b3f791a_d672_46fb_a03a_96e19f2c3121", { modal: "High toughness stops being merely defensive: Felothar lets those creatures attack and deal combat damage with the same stat that kept them alive. If a creature must be spent, its toughness also sets how many cards you draw before discarding by power.", reason: "Explain how Felothar converts defensive investment into combat and cards.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-MARDU-1-cardrel_auto_mardu_0f93d88c_9d2e_416d_a10b_99483360b1fb", { tile: "Whenever Zurgo attacks, mobilize creates a temporary tapped and attacking Warrior token.", modal: "Zurgo's mobilized Warrior is meant to be temporary. When it leaves after attacking, you draw a card, so each charge spends a body now and returns material for the next attack.", reason: "Explain the temporary attacker and leave-the-battlefield payoff without a repeated identity-example scaffold.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-TEMUR-1-cardrel_auto_temur_1b162dd3_3be6_406d_bf86_f7cc9eff098d", { modal: "Every creature spell grows Eshki, but power four and power six are the important thresholds. Sequencing larger creatures turns the same instinctive act—casting the next beast—into cards first and table-wide damage later.", reason: "Explain Eshki's escalating power thresholds.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-YORE-1-cardrel_auto_yore_d460a9e2_5a7d_4562_880e_45174be19a9d", { tile: "Breya enters with two Thopter artifact tokens, then can sacrifice two artifacts for damage, creature removal, or life.", modal: "Breya arrives with the two artifacts her activation needs, then asks which result matters now: damage, creature removal, or life. The invention is useful because its pieces can be converted into different answers on demand.", reason: "Explain Breya's enter-then-convert choice without generic engine or identity-example language.", change_class: "SEMANTIC_REMEDIATION" });
set("SOUND-GLINT-1-cardvoice_glint_3a92b235_196b_4f46_9d20_06f4d3653d36", { modal: "The line admires the power and warns about its volatility in the same breath. For Glint, the appeal is an opening strong enough to exploit even when it cannot be made orderly or safe.", reason: "Make the bounded Glint bridge explicit without claiming volatility alone defines the identity.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-GLINT-1-cardrel_auto_glint_9efe8aff_9a7d_4397_b5fd_c1a0fad7c15f", { modal: "Yidris must connect in combat before the turn changes shape. Once he does, each spell from your hand can uncover a cheaper spell, rewarding you for using the opening immediately and accepting that the exact chain cannot be planned in advance.", reason: "Explain the combat gate and cascade uncertainty.", change_class: "SEMANTIC_REMEDIATION" });
set("SOUND-DUNE-1-cardvoice_dune_0f5a3a09_2f07_4774_9e0f_e99d9a444166", { modal: "The contrast with Razia matters: Aurelia leads from the front line. Dune's echo is the decision to turn organized force into immediate, visible action.", reason: "Narrow the weak generic echo to the supported direct-action facet.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-DUNE-1-cardrel_auto_dune_e54d207c_51b8_458e_86a1_2633ac064c8e", { modal: "Choosing one player fixes the objective before combat begins. Damage dealt to anyone else still reaches that target, so every successful attack contributes to the same concentrated campaign.", reason: "Explain Saskia's chosen-player commitment and repeated combat damage.", change_class: "SEMANTIC_REMEDIATION" });
set("SOUND-WITCH-1-cardvoice_witch_af42079b_a3c0_448c_9bb2_b915252e87a9", { modal: "On Animation Module, “progress” is incremental: one counter event can pay for another small body, and that body can become part of the next cycle. The design advances by repeating a system rather than making one dramatic leap.", reason: "Replace a mechanic-association paraphrase with the card's incremental module implication.", change_class: "SEMANTIC_REMEDIATION" });
set("PLAY-WITCH-1-cardrel_auto_witch_7e6b9b59_cd68_4e3c_827b_38833c92d6eb", { tile: "At the beginning of each of your end steps, Atraxa proliferates the counters you choose to advance.", modal: "Atraxa does not create the first counter; she rewards you for placing counters where they will matter before your end step. Proliferate then advances every chosen counter-bearing permanent or player together.", reason: "Remove methodology language and explain Atraxa's setup-then-proliferate sequence.", change_class: "SEMANTIC_REMEDIATION" });

// Evidence exceptions resolved with inspected primary sources or a narrower governed Vox Mana bridge.
set("PLAY-RG-4-cardrel_rg_6ed13a89", { tile: "Ruric Thar must attack when able and deals 6 damage to any player who casts a noncreature spell.", modal: "Ruric Thar leaves little room to wait behind utility spells: he charges every combat, and each noncreature spell carries a six-damage price. His Ghor assault turns Gruul's hostility toward over-civilized solutions into a table rule.", reason: "A newly inspectable official Gatecrash guide establishes Ruric Thar as Ghor leader and the clan's assault pattern; exact Oracle text supplies the play bridge.", change_class: "SOURCE_INTAKE_RESOLVED" });
set("PLAY-WR-4-cardrel_wr_aa219936", { tile: "Feather returns an instant or sorcery that targeted one of your creatures to your hand at the next end step instead of letting it stay in the graveyard.", modal: "Targeting one creature becomes preparation for another coordinated attack: the spell resolves now, then returns for a later turn. Feather keeps Boros combat tricks in service instead of treating them as one-use bursts.", reason: "Official Wizards design notes establish Feather as Boros and describe the combat-oriented recurring-target spell mechanic.", change_class: "SOURCE_INTAKE_RESOLVED" });
set("SOUND-GLINT-2-cardvoice_vm558_glint_c0b3bbce_977c_42a9_afcb_dabdfc717c97", { modal: "Atarka's hunger is not figurative; unchecked, it threatens an entire plane. That appetite gives Glint a voice of force that keeps consuming the next available limit rather than settling into restraint.", reason: "Official Atarka material verifies endless hunger and plane-stripping appetite; the Glint interpretation remains explicitly Vox Mana synthesis.", change_class: "SOURCE_INTAKE_RESOLVED" });
set(duneReplacement.ledger_id, { modal: duneReplacement.modal_explanation, reason: "Replace the owner-rejected Scour echo with Dune's governed card anchor and its exact land-scaled Sand-token multiplication, while preserving the boundary that the Nephilim is an anchor rather than a doctrine.", change_class: "RELATIONSHIP_REPLACED" });
set("SOUND-WITCH-2-cardvoice_vm558_witch_e766a5eb_684b_4939_b164_6093d15600c9", { modal: "The amphin spend years building out of sight before they turn toward the shore. Their patience makes preparation itself feel ambitious: growth accumulates quietly until the society is ready to act.", reason: "Narrow the bridge to governed patient development and calculated expansion; remove the unsupported missing-Red inference.", change_class: "SEMANTIC_REMEDIATION" });

// Genuine corpus-level style artifacts on VM-561 NO_CHANGE_INDICATED rows.
const style = (id, modal, reason) => set(id, { modal, reason, change_class: "STYLE_ONLY_CORPUS_CLEANUP" });
style("SOUND-U-1-cardvoice_u_0f8b97fe_3e5e_47c2_9a9d_7f77482aa159", "Azami's recommendation comes from having neither time nor distance. Blue's planning voice remains deliberate even when the available information says delay is no longer possible.", "Remove the repeated 'The line presents' scaffold while preserving the same constrained-planning meaning.");
style("SOUND-R-1-cardvoice_r_c363f338_0777_45e6_b13c_f15ba026b63a", "Without Consulate limits, the renegades test how far their machines can go. Freedom matters here because it permits immediate experimentation at the edge of performance.", "Remove the repeated Sound scaffold and keep the regulation-to-action implication.");
style("SOUND-G-1-cardvoice_g_b0b6be0c_41cf_4757_9f0e_87227b6ba6b3", "Calling Ghalta 'the earth' makes primal strength feel older and larger than any individual ambition. Green's power is embodied as something the world already knows how to grow.", "Remove the repeated Sound scaffold and deepen the earth-as-strength image.");
style("SOUND-WU-1-cardvoice_wu_27e04c41_f42c_4d60_8a71_ec2d7c326f64", "Each face of the Cluestone names a different civic function: judgment, recordkeeping, or enforcement. Azorius order sounds like an institution because every role has a place in the process.", "Replace scaffolded restatement with the function-to-institution implication.");
style("SOUND-UB-1-cardvoice_ub_c9edddb4_0d60_4d21_8887_51d943c6a31f", "The rank and file obey a leader they never see, receiving commands through intermediaries who disappear immediately. Dimir control works by preserving distance between knowledge, orders, and the people carrying them out.", "Replace scaffolded restatement with the line's hierarchy and information-distance implication.");
style("SOUND-BR-1-cardvoice_br_3f806353_592e_431c_a7dd_a4c64034f94d", "Rakdos's cruelty is so theatrical that even his shadow becomes a performer. The image turns menace into spectacle instead of leaving it private or restrained.", "Replace scaffolded restatement with the shadow-as-performance image.");
style("SOUND-RG-1-cardvoice_rg_327d9679_0049_4401_8dab_e0fb362306bd", "The warning is aimed at anyone who mistakes wildness for stupidity. Gruul shamans keep power that civilization fails to recognize because it expects sophistication to look orderly.", "Replace scaffolded restatement with the anti-underestimation implication.");
style("SOUND-WG-1-cardvoice_wg_9aab386c_d48c_4611_b757_aa69b26cc1b1", "The song does not erase the one; it lets one voice join all the others. Selesnya community is expressed as participation in a living whole rather than simple obedience to a crowd.", "Replace scaffolded restatement with the one-to-many tension.");
style("SOUND-WB-1-cardvoice_wb_05501e88_d4c3_4474_92a9_c02ab15b107b", "The joke treats becoming a ghost like a foreseeable liability that responsible people should plan for. Orzhov obligation reaches beyond death because even an afterlife can be put under contract.", "Replace scaffolded restatement with the afterlife-as-obligation joke.");
style("SOUND-BG-1-cardvoice_bg_fc17d8dd_887f_405e_a195_777aa3da36f5", "Death does not release a Golgari soldier from usefulness. The unsettling promise is continuity: what falls can return to service in another form.", "Replace scaffolded restatement with the continuity-through-death implication.");
style("SOUND-WR-1-cardvoice_wr_30b20932_0d9a_447f_b934_1daa8c44a678", "The captain is already moving and expects the comrades to keep pace. Even the joke about a share of the fracas makes Boros action sound collective, public, and led from the front.", "Replace scaffolded restatement with the keep-pace command and collective action.");
style("SOUND-SILVERQUILL-1-cardvoice_silverquill_f88eeb04_4b8e_4c76_a8c6_90887b94d518", "Killian uses shadow and light to describe authorship of his own reputation. Silverquill voice matters here because declaring the self is already an act of stepping into public view.", "Replace scaffolded restatement with the self-authorship implication.");
style("SOUND-PRISMARI-1-cardvoice_prismari_47ee6837_2e2f_4344_ab9f_6b8887874f77", "'Run wild' treats imagination as something meant to escape containment. Prismari creativity becomes visible when the student lets an idea grow large enough to perform.", "Replace scaffolded restatement with the imagination-to-performance implication.");
style("SOUND-WITHERBLOOM-2-cardvoice_vm558_witherbloom_b831d3f8_07ce_4172_ba29_213cac414c9a", "Nobody asks for Dina's ingredients because the result settles the argument. That practical trust makes Witherbloom craft feel earthy, bodily, and judged by whether it works.", "Remove the residual 'The line presents' scaffold while preserving practical craft.");
style("SOUND-QUANDRIX-1-cardvoice_quandrix_ce1a6c1f_6b4e_4d19_b256_48d073b359b7", "The question makes mathematical infinity a challenge to nature's apparent limits. Quandrix sounds like a student who sees growth as something that can be reasoned past its current scale.", "Replace scaffolded restatement with the numbers-to-nature challenge.");
style("SOUND-BANT-1-cardvoice_bant_67ceffa4_2fdb_499c_88cd_49fb5eb9be59", "The speaker assumes Bant's light is worth extending and vulnerable to being eclipsed. Idealism becomes a duty to carry an ordered way of life beyond its current borders.", "Replace scaffolded restatement with the spread-before-shadowed urgency.");
style("SOUND-ESPER-1-cardvoice_esper_fef94125_aa8d_4147_a609_1e990961bde2", "'Surgical precision' is the Esper distinction: even an attack on memory is controlled, exact, and deliberately limited. The comparison with Grixis makes restraint part of the threat.", "Replace scaffolded restatement with the precision-and-restraint contrast.");
style("SOUND-GRIXIS-1-cardvoice_grixis_fef94125_aa8d_4147_a609_1e990961bde2", "The final clause removes Esper's restraint. Grixis uses the same invasion of memory but sees no reason to limit the harm or make the procedure kind.", "Replace scaffolded restatement with the line's explicit Esper contrast.");
style("SOUND-JUND-1-cardvoice_jund_9b984236_39cf_4552_827b_e81c26cfb388", "A tyrant's title is temporary even when the strength behind it is real. Jund succession belongs to whoever survives long enough to take dominance from the last ruler.", "Replace scaffolded restatement with the succession-through-dominance implication.");
style("SOUND-NAYA-1-cardvoice_naya_956250da_532a_4457_8696_73915be56943", "The same enormous trees that gather water also create a place for elves to gather. Naya abundance supports celebration because the living world provides both resource and shelter.", "Replace scaffolded restatement with the ecosystem-to-community implication.");
style("SOUND-ABZAN-1-cardvoice_abzan_46535f8e_1bcd_4588_ac6c_a4bc89c379c8", "Stone and roots divide the work: one survives the present, while the other carries memory forward. Abzan endurance matters because it protects continuity as well as bodies.", "Replace scaffolded restatement with the two-image endurance/continuity distinction.");
style("SOUND-JESKAI-1-cardvoice_jeskai_341cf654_faf7_4db9_bd9a_70783f1ccff0", "The efreet does not extinguish an innate flame; discipline gives it a form. Jeskai training is useful because it directs intensity without pretending the intensity was never there.", "Replace scaffolded restatement with discipline-shapes-flame tension.");
style("SOUND-SULTAI-1-cardvoice_sultai_c469133e_174d_476b_b135_bbf15e415e72", "The ambassador measures an alliance by usefulness and ends it as soon as the return disappears. Sultai diplomacy sounds cold because loyalty remains conditional on advantage.", "Replace scaffolded restatement with the usefulness-to-conditional-loyalty implication.");
style("SOUND-MARDU-1-cardvoice_mardu_cad09970_14c8_4d80_82fe_6c855efb0191", "Calling death a foe turns mortality into one more obstacle for the charge to overcome. Mardu resolve sounds active because even the final limit is answered as a contest.", "Replace scaffolded restatement with the death-as-opponent image.");
style("SOUND-TEMUR-1-cardvoice_temur_ccad8b03_5ff1_4895_94e0_0c96883cb875", "Surrak's advice begins with reading the terrain, then turns the terrain itself into the attack. Temur instinct and knowledge meet when the high ground stops being merely a position and becomes force.", "Replace scaffolded restatement with the terrain-to-action sequence.");
style("SOUND-YORE-1-cardvoice_yore_ed10bb4c_f7ef_4046_8dde_465041b55078", "Perfection, progress, and elegance all describe a future made through craft. Yore's artifice voice values invention not only for working, but for refining what a designed world could become.", "Replace scaffolded restatement with the craft-to-designed-future implication.");
style("SOUND-UB-2-cardvoice_vm558_ub_4f25b125_1ded_4a34_9ed1_e6ce087ec48d", "Dimir silence gives the rare statement its force. When the guild finally speaks, the message feels deliberate because secrecy has removed every unnecessary word.", "Remove a repeated 'The line makes' skeleton while preserving the same restraint-and-message meaning.");
style("SOUND-LOREHOLD-2-cardvoice_vm558_lorehold_e0828e8d_f01f_4088_9123_6d923ddb3242", "The risk is that history answers back. A Lorehold student can study the Blood Age as a subject and still release an ancestral rage that refuses to remain academic.", "Remove a repeated modal skeleton while preserving active, risky history.");
style("SOUND-GRIXIS-2-cardvoice_vm558_grixis_8a5e3c8e_8e22_49b9_8ee5_4a36361f0da6", "Nekusar's death may have been another step in his own scheme. Grixis survival appears in that suspicion: even destruction can be manipulated into an unnatural return.", "Remove a repeated modal skeleton while preserving manipulation-through-death.");
style("SOUND-ABZAN-2-cardvoice_vm558_abzan_3d02ee2f_b7bd_40b0_b9be_2420991b2be0", "Rediscovery alone does not preserve the Kin-Trees; chosen wardens must tend them. Abzan continuity survives because someone accepts responsibility for carrying it forward.", "Remove a repeated modal skeleton while preserving active continuity and duty.");
style("PLAY-WITHERBLOOM-1-cardrel_auto_witherbloom_f61c1dc4_2f09_4b50_957f_ee656c659072", "Dina's sacrifice ability asks which creature's power should become life and counters, while her separate draw trigger rewards the first sacrifice each turn. One body can nourish several parts of the board, but timing decides when every benefit is available.", "Remove tile-level mechanical repetition while retaining the approved life-and-death exchange.");

// Remaining NO_CHANGE Play rows that still carry the old shared composer.
style("PLAY-G-1-cardrel_auto_g_6c2c8bf3_9bf8_4a86_89d3_3bb36260dc51", "Azusa asks you to have lands ready in hand and rewards doing the natural thing more often. Two extra land plays accelerate every later creature and mana commitment without changing what the deck is built from.", "Remove the shared composer while preserving the land-growth example.");
style("PLAY-PRISMARI-1-cardrel_auto_prismari_348c67ef_9ccc_4651_9038_efdf1ad1b36a", "The largest instant or sorcery you cast before combat sets the Elemental's size. Choosing when to spend the showpiece spell also chooses how large, fast, and visible Rootha's performance will be.", "Remove the shared composer and explain Rootha's spell-to-performance timing.");
style("PLAY-QUANDRIX-1-cardrel_auto_quandrix_977f9390_e01d_4e9d_8e9c_e543b1266972", "The first X spell each turn adds two counters, and those counters reduce the cost of the next turn's first X spell. Zimone turns one solved equation into better terms for solving the next.", "Remove the shared composer and explain Zimone's recursive X-spell scaling.");
style("PLAY-GRIXIS-1-cardrel_auto_grixis_f5092c14_eec4_472c_999c_ba96c36b2fbb", "Kess gives one spent spell a second and final use on each of your turns. Choosing the right card from the graveyard means yesterday's answer can become today's removal, protection, or finishing move.", "Remove the shared composer and explain Kess's once-per-turn reuse choice.");
style("PLAY-NAYA-1-cardrel_auto_naya_e7604cd9_d00d_4957_82c9_46a7cdb88209", "Every counter event on your creatures can become damage to an opponent. Shalai and Hallar make growing the board and pressuring the table the same act, so abundance never has to remain passive.", "Remove the shared composer and explain counter growth becoming direct pressure.");
style("PLAY-JESKAI-1-cardrel_auto_jeskai_40ed32a6_ad56_48c7_aecf_b4238c34c212", "The first spell prepares the flurry; the second earns either a copy when it has a target or a card when it does not. Jeskai timing appears in the decision about which effect should occupy that second-spell position.", "Remove the shared composer and explain the second-spell sequencing choice.");
style("PLAY-WUBRG-1-cardrel_auto_wubrg_9f6828e3_39d9_45d9_9bf1_0e3737a0321e", "Ulalek's five-color identity opens the deck's breadth, but the trigger still asks for two colorless mana at the precise moment an Eldrazi is cast. Keeping that payment available turns one spell and the abilities around it into a coordinated wave of copies.", "Remove the shared composer while keeping Five-Color breadth non-doctrinal and the colorless payment exact.");

const baselineRows = ledger.rendered_rows;
const baselineByRelationship = new Map(baselineRows.map((row) => [row.relationship_id, row]));
const voiceCatalogByRelationship = new Map(voiceCatalogInput.records.map((record) => [record.relationship_id, record]));
const playCatalogByRelationship = new Map(playCatalogInput.records.map((record) => [record.relationship_id, record]));

const voiceRecords = voiceSourceInput.records.map((record) => {
  if (record.relationship_id !== duneReplacement.prior_relationship_id) return {
    ...record,
    modal_explanation: record.modal_explanation || voiceCatalogByRelationship.get(record.relationship_id)?.modal_explanation || "",
  };
  return {
    ...record,
    relationship_id: duneReplacement.relationship_id,
    proposal_id: "vm563_owner_correction_dune",
    teaching_facet: "physical momentum multiplying across the land",
    complementarity_rationale: "Aurelia supplies visible front-line command; Dune-Brood supplies the multiplying mass that follows an arrival and spreads through land-scaled Sand tokens.",
    canonical_card_name: duneReplacement.card_name,
    canonical_card_id: duneReplacement.oracle_id,
    scryfall_id: duneReplacement.scryfall_id,
    exact_excerpt: duneReplacement.exact_flavor_text,
    printing: {
      scryfall_id: duneCard.id,
      oracle_id: duneCard.oracle_id,
      set: duneCard.set,
      collector_number: duneCard.collector_number,
      flavor_text_field: "card.flavor_text",
      source_locator: `data/scryfall/raw/oracle-cards.json#id=${duneCard.id}`,
      scryfall_uri: duneCard.scryfall_uri,
      image_uris: { small: duneCard.image_uris.small, normal: duneCard.image_uris.normal, art_crop: duneCard.image_uris.art_crop },
      card_faces: duneCard.card_faces || [],
      type_line: duneCard.type_line,
    },
    type_line: duneCard.type_line,
    certified_identity_claim_ids: ["dune_claim_0004", "dune_claim_0005"],
    source_ids: ["src_vm_dune_evidence_ledger_20260603", "src_vm_four_color_reference_audit_20260603", "src_scryfall_oracle_cards_local"],
    source_locators: [
      { source_id: "src_vm_dune_evidence_ledger_20260603", locator: "docs/research/dune/dune-evidence-ledger.md#DUNE-EVID-004-DUNE-EVID-007-DUNE-EVID-009" },
      { source_id: "src_vm_four_color_reference_audit_20260603", locator: "docs/research/canon/canon-inventory-four-color-reference-audit.md#brgw-aggression-dune" },
      { source_id: "src_scryfall_oracle_cards_local", locator: `data/scryfall/raw/oracle-cards.json#id=${duneCard.id}` },
    ],
    canonical_card_data_locator: `data/dossier/card-voice-printings.source.json#relationship_id=${duneReplacement.relationship_id}`,
    why_voice_belongs: "Dune-Brood's arrival produces nameless thousands, giving Dune a voice of physical momentum that multiplies through the land rather than another voice of front-line command.",
    relationship_bridge: "Dune-Brood is the governed card anchor for Dune. Its exact printing describes a mass arrival, and its verified combat trigger creates one Sand for each land you control; together they support the bounded Dune facets of physical momentum and territorial swarm without turning the Nephilim into a faction or doctrine.",
    false_positive_analysis: "A generic token or combat card would drift toward Naya, Jund, Mardu, or Boros. This relationship instead depends on Dune's governed Dune-Brood anchor, the exact 'nameless thousands' voice, and the land-scaled Sand-token action together.",
    adjacent_identity_confusion_risk: "Do not use the relationship as generic combat, token, four-color, or Nephilim proof. Its Dune specificity comes from the governed anchor and exact mass-through-land evidence.",
    limitation: "Dune-Brood is a bounded card anchor and does not establish an official faction, doctrine, universal four-color philosophy, or missing-Blue psychology.",
    proposed_modal_explanation: duneReplacement.modal_explanation,
    modal_explanation: duneReplacement.modal_explanation,
    approval_basis: "OWNER_AUTHORIZED_VM563_CORRECTION_PENDING_FINAL_ACCEPTANCE",
    owner_decision: "AUTHORIZED_REPLACEMENT",
    owner_revision_history: [
      ...(record.owner_revision_history || []),
      {
        decided_at: "2026-08-16",
        decision: "REJECT_RENDERED_RELATIONSHIP",
        previous_relationship_id: duneReplacement.prior_relationship_id,
        previous_card_name: "Scour from Existence",
        candidate_sha: "f5ede39a7f03caf6c0644c80142c201643605b85",
        instruction: "Replace Scour from Existence because its rendered Dune relationship is not sufficiently intentional or identity-specific.",
      },
    ],
    proposal_origin: { kind: "COMMITTED_SCRYFALL_EXACT_PRINTING", locator: `data/scryfall/raw/oracle-cards.json#id=${duneCard.id}` },
    validation: {
      validator_version: "vm563-dune-owner-correction-v1",
      passed: true,
      failures: [],
      owner_decision: "AUTHORIZED_REPLACEMENT_PENDING_FINAL_RENDERED_ACCEPTANCE",
    },
  };
});
const voicePrintings = {
  ...voicePrintingsInput,
  records: voicePrintingsInput.records.map((record) => record.relationship_id === duneReplacement.prior_relationship_id ? {
    identity_key: "DUNE",
    canonical_card_name: duneCard.name,
    oracle_id: duneCard.oracle_id,
    scryfall_id: duneCard.id,
    set: duneCard.set,
    collector_number: duneCard.collector_number,
    exact_flavor_text: duneCard.flavor_text,
    flavor_text_field: "card.flavor_text",
    scryfall_uri: duneCard.scryfall_uri,
    source_locator: `data/scryfall/raw/oracle-cards.json#id=${duneCard.id}`,
    image_uris: { small: duneCard.image_uris.small, normal: duneCard.image_uris.normal, art_crop: duneCard.image_uris.art_crop },
    card_faces: duneCard.card_faces || [],
    type_line: duneCard.type_line,
    relationship_id: duneReplacement.relationship_id,
    slot: 2,
  } : record),
};
const playRecords = playSourceInput.records.map((record) => ({
  ...record,
  modal_explanation: record.modal_explanation || playCatalogByRelationship.get(record.relationship_id)?.modal_explanation || "",
}));
const voiceByRelationship = new Map(voiceRecords.map((record) => [record.relationship_id, record]));
const playByRelationship = new Map(playRecords.map((record) => [record.relationship_id, record]));

// These four approved Play relationships remain intentionally suppressed by the renderer's cross-surface deduplication.
// Keep their explicit source copy free of the retired composer so a future composition change cannot revive it.
Object.assign(playByRelationship.get("cardrel_wu_c46718dc"), {
  modal_explanation: "Isperia turns an attack against you or your planeswalker into a possible card. Opponents can still act, but aggression now supplies the Azorius player with more information and more options.",
});
Object.assign(playByRelationship.get("cardrel_ur_f787c6cf"), {
  modal_explanation: "Casting a spell above your current experience earns a counter, and every counter reduces later instant and sorcery costs. Mizzix rewards choosing a sequence that keeps reaching just beyond what the last experiment taught you.",
});
Object.assign(playByRelationship.get("cardrel_lorehold_5c40a8d4"), {
  modal_explanation: "Cards leaving your graveyard create Spirits, while Quintorius can discard, draw, and mill to keep that history moving. The graveyard is not a sealed archive; its contents repeatedly return as present action.",
});
Object.assign(playByRelationship.get("cardrel_auto_colorless_ec726c54_987b_48ed_8ffa_ec73a5e35333"), {
  proposed_public_rationale: "Zhulodok shows the Eldrazi-scale side of Colorless: colorless spells cast from hand with mana value seven or greater receive cascade twice.",
  modal_explanation: "The work happens before the seven-mana spell: you build enough colorless mana, keep the large spell in hand, and then accept two unpredictable chains when it is cast. Zhulodok makes scale the trigger for abundance.",
});
Object.assign(playByRelationship.get("cardrel_wb_6c3df703"), {
  modal_explanation: "Obzedat drains one opponent on arrival, then can leave before your end step and return with haste on your next upkeep. The Ghost Council collects its payment while repeatedly stepping beyond the table's ordinary timing for removal.",
});
Object.assign(playByRelationship.get("cardrel_ur_899d58dc"), {
  modal_explanation: "Every two mana becomes a point of precisely aimed damage, and hitting a player can replace the spent action with a card. Niv-Mizzet lets the Izzet player alternate between testing targets and drawing the next possibility.",
});

for (const [ledgerId, change] of overrides) {
  const baseline = baselineRows.find((row) => row.ledger_id === ledgerId);
  if (!baseline) fail(`Unknown VM-561 ledger row: ${ledgerId}`);
  const relationshipId = ledgerId === duneReplacement.ledger_id ? duneReplacement.relationship_id : baseline.relationship_id;
  const record = baseline.surface === "SOUND" ? voiceByRelationship.get(relationshipId) : playByRelationship.get(relationshipId);
  if (!record) fail(`Missing source relationship: ${baseline.relationship_id}`);
  if (baseline.surface === "SOUND" && change.tile) fail(`Sound flavor tiles may not be rewritten: ${ledgerId}`);
  if (change.tile) record.proposed_public_rationale = change.tile;
  if (change.modal) record.modal_explanation = change.modal;
  record.copy_revision = {
    task: "VM-563",
    ledger_id: ledgerId,
    change_class: change.change_class,
    reason: change.reason,
    evidence_checkpoint: "0d073cd1a5917afecbcb722d57a117f87799ade6",
    calibration_checkpoint: "7f79efa3b7442a202db04e6b7013b701bffc4286",
  };
}

function addOfficialSource(record, sourceId, locator, establishes) {
  record.source_ids = (record.source_ids || []).filter((id) => id !== sourceId);
  record.source_locators = (record.source_locators || []).filter((entry) => entry.source_id !== sourceId);
  record.supporting_official_locators = [...new Set([...(record.supporting_official_locators || []), locator])];
  record.vm563_source_intake = { inspection_status: "INSPECTED_OFFICIAL_WEB", locator, establishes };
}

addOfficialSource(playByRelationship.get("cardrel_wr_aa219936"), "src_wotc_war_games_feather_2019", "https://magic.wizards.com/en/news/making-magic/war-games-2019-04-22#feather-the-redeemed", "Mark Rosewater identifies Feather as a Boros Legion member and describes her combat-oriented recurring-target spell design.");
addOfficialSource(playByRelationship.get("cardrel_rg_6ed13a89"), "src_wotc_gatecrash_guide_part_2_inspected_20260816", "https://magic.wizards.com/en/news/feature/planeswalkers-guide-to-gatecrash-part-2#the-gruul-clans", "The official guide identifies Ruric Thar as Ghor leader and describes the clan's frequent savage assaults.");
addOfficialSource(voiceByRelationship.get("cardvoice_vm558_glint_c0b3bbce_977c_42a9_afcb_dabdfc717c97"), "src_wotc_dragons_tarkir_guide_atarka_2015", "https://magic.wizards.com/en/news/magic-story/planeswalkers-guide-dragons-tarkir-part-2-2015-03-18#the-atarka-clan", "The official guide describes Atarka as endlessly hungry, gluttonous, greedy, and capable of stripping regions of game.");

const voiceSource = { ...voiceSourceInput, records: voiceRecords };
const playSource = { ...playSourceInput, records: playRecords };
const voiceCatalog = {
  ...voiceCatalogInput,
  source_sha256: digest(pretty(voiceSource)),
  generated_policy: "APPROVED_PUBLIC only; exact excerpt plus explicit relationship-owned player context; no heuristic, shared composer, or fallback copy",
  records: voiceRecords.filter((record) => record.review_status === "APPROVED_PUBLIC").map((record) => ({
    relationship_id: record.relationship_id,
    identity_key: record.identity_key,
    card: {
      name: record.canonical_card_name,
      oracle_id: record.canonical_card_id,
      scryfall_id: record.scryfall_id,
      set: record.printing.set,
      collector_number: record.printing.collector_number,
      data_locator: record.canonical_card_data_locator,
    },
    excerpt: record.exact_excerpt,
    why_it_echoes: record.why_voice_belongs,
    modal_explanation: record.modal_explanation,
    relationship_class: record.relationship_class,
    slot: record.slot,
    pair_role: record.pair_role,
    display_priority: record.display_priority,
    critical_repeat: record.critical_repeat,
    provenance: {
      claim_ids: record.certified_identity_claim_ids,
      source_ids: record.source_ids,
      printing_id: record.printing.scryfall_id,
      printing_source_locator: record.printing.source_locator,
      validator_version: record.validation.validator_version,
      approval_basis: record.approval_basis,
    },
  })),
};
const playCatalog = buildRuntimeCatalog(playSource);

const finalVoiceByRelationship = new Map(voiceCatalog.records.map((record) => [record.relationship_id, record]));
const finalPlayByRelationship = new Map(playCatalog.records.map((record) => [record.relationship_id, record]));
const finalRows = baselineRows.map((row) => {
  const finalRelationshipId = row.ledger_id === duneReplacement.ledger_id ? duneReplacement.relationship_id : row.relationship_id;
  const final = row.surface === "SOUND" ? finalVoiceByRelationship.get(finalRelationshipId) : finalPlayByRelationship.get(finalRelationshipId);
  if (!final) fail(`Final catalog lost rendered row: ${row.ledger_id}`);
  const finalTile = row.surface === "SOUND" ? final.excerpt : final.rationale;
  const finalModal = final.modal_explanation;
  const decision = overrides.get(row.ledger_id);
  const tileChanged = finalTile !== row.current_tile_text;
  const modalChanged = finalModal !== row.current_modal_text;
  return {
    ledger_id: row.ledger_id,
    identity_key: row.identity_key,
    identity_name: row.identity_name,
    surface: row.surface,
    slot_order: row.slot_order,
    relationship_id: finalRelationshipId,
    ...(finalRelationshipId !== row.relationship_id ? { prior_relationship_id: row.relationship_id } : {}),
    card_name: final.card.name,
    oracle_id: final.card.oracle_id,
    exact_printing_id: final.card.scryfall_id,
    ...(finalRelationshipId !== row.relationship_id ? { prior_card_name: row.card_name, prior_oracle_id: row.oracle_id, prior_exact_printing_id: row.exact_printing_id } : {}),
    prior_tile_text: row.current_tile_text,
    final_tile_text: finalTile,
    prior_modal_text: row.current_modal_text,
    final_modal_text: finalModal,
    tile_changed: tileChanged,
    modal_changed: modalChanged,
    change_class: decision?.change_class || "UNCHANGED",
    action: tileChanged && modalChanged ? "CHANGE_BOTH" : tileChanged ? "CHANGE_TILE_ONLY" : modalChanged ? "CHANGE_MODAL_ONLY" : "UNCHANGED",
    reason: decision?.reason || "VM-561 found no semantic or corpus-level style change necessary.",
    vm561_disposition: row.findings.disposition,
    claim_classification: row.audit_inference.classification,
    evidence_status: decision?.change_class === "SOURCE_INTAKE_RESOLVED" ? "INSPECTED_PRIMARY_SOURCE_RESOLVED" : decision?.change_class === "RELATIONSHIP_REPLACED" ? "PASS_GOVERNED_DUNE_ANCHOR_AND_EXACT_CARD_EVIDENCE" : row.findings.authority_finding,
    modal_content_model_review: false,
  };
});

const remediationRows = baselineRows.filter((row) => row.findings.disposition === "REMEDIATION_LIKELY");
for (const row of remediationRows) {
  const final = finalRows.find((entry) => entry.ledger_id === row.ledger_id);
  if (!final || final.action === "UNCHANGED") fail(`REMEDIATION_LIKELY row lacks a final action: ${row.ledger_id}`);
}
const exceptionRows = baselineRows.filter((row) => ["SOURCE_INTAKE_REQUIRED", "INSUFFICIENT_VOX_MANA_AUTHORITY"].includes(row.findings.disposition));
for (const row of exceptionRows) if (!overrides.has(row.ledger_id)) fail(`Evidence exception lacks final resolution: ${row.ledger_id}`);

const playerText = finalRows.flatMap((row) => [row.final_tile_text, row.final_modal_text]).join("\n");
const forbidden = /\b(?:source notes?|source record|evidence floor|certified|research|audit|validation|validator|routing|authority|approved relationship|synthesis altitude|bounded example|current packet)\b|this reading's larger plan|carries that card action|^The line presents\b|^At the table\b/im;
if (forbidden.test(playerText)) fail(`Final player copy retains methodology/shared-composer language: ${playerText.match(forbidden)?.[0]}`);

const identityKeys = [...new Set(finalRows.map((row) => row.identity_key))];
const counts = {
  identities: identityKeys.length,
  rendered_rows: finalRows.length,
  sound: finalRows.filter((row) => row.surface === "SOUND").length,
  play: finalRows.filter((row) => row.surface === "PLAY").length,
  suppressed_play_relationships: ledger.suppressed_play_coverage_appendix.length,
  remediation_likely_resolved: finalRows.filter((row) => row.vm561_disposition === "REMEDIATION_LIKELY" && row.action !== "UNCHANGED").length,
  style_only_rows: finalRows.filter((row) => row.change_class === "STYLE_ONLY_CORPUS_CLEANUP").length,
  tile_changes: finalRows.filter((row) => row.tile_changed).length,
  modal_changes: finalRows.filter((row) => row.modal_changed).length,
  source_intake_resolved: finalRows.filter((row) => row.change_class === "SOURCE_INTAKE_RESOLVED").length,
  relationship_replacements: finalRows.filter((row) => row.change_class === "RELATIONSHIP_REPLACED").length,
  hard_owner_blockers: finalRows.filter((row) => row.change_class === "HARD_OWNER_BLOCKER").length,
  modal_content_model_review: finalRows.filter((row) => row.modal_content_model_review).length,
};
if (JSON.stringify([counts.identities, counts.rendered_rows, counts.sound, counts.play, counts.suppressed_play_relationships]) !== JSON.stringify([37, 119, 73, 46, 4])) fail(`Structural counts drifted: ${JSON.stringify(counts)}`);
if (counts.remediation_likely_resolved !== 49) fail(`Expected 49 remediation rows, found ${counts.remediation_likely_resolved}`);

const manifest = {
  schema_version: "vm563-final-sound-play-remediation-v1",
  vm561_checkpoint: "0d073cd1a5917afecbcb722d57a117f87799ade6",
  vm562_checkpoint: "7f79efa3b7442a202db04e6b7013b701bffc4286",
  authority_notice: "Review/traceability manifest only. Active authority remains the production Sound/Play relationship sources and exact committed Scryfall facts.",
  counts,
  rows: finalRows,
  suppressed_play_coverage_appendix: ledger.suppressed_play_coverage_appendix,
};

const summary = `# VM-563 Final Sound/Play Remediation\n\n- Structure: **${counts.identities}/37 identities**, **${counts.rendered_rows}/119 rows**, **${counts.sound}/73 Sound**, **${counts.play}/46 Play**, **${counts.suppressed_play_relationships}/4 suppressed Play reconciliations**.\n- VM-561 remediation rows resolved: **${counts.remediation_likely_resolved}/49**.\n- Style-only corpus cleanup rows: **${counts.style_only_rows}**.\n- Tile changes: **${counts.tile_changes}**.\n- Modal changes: **${counts.modal_changes}**.\n- Source-intake resolutions: **${counts.source_intake_resolved}**.\n- Relationship replacements: **${counts.relationship_replacements}**.\n- Hard owner blockers: **${counts.hard_owner_blockers}**.\n- Modal content-model reviews: **${counts.modal_content_model_review}**.\n\nThe production generators now require explicit relationship-owned modal copy. They no longer manufacture the shared Play composer or the Sound \`The line presents ...\` scaffold.\n`;

const intake = `# VM-563 Targeted Source Intake\n\n## Feather, the Redeemed / Boros Legion\n\n- Inspected primary source: https://magic.wizards.com/en/news/making-magic/war-games-2019-04-22#feather-the-redeemed\n- The source explicitly identifies Feather as a Boros Legion member and explains the combat-oriented design that returns a resolved instant or sorcery which targeted your creature.\n- Result: \`SOURCE_INTAKE_RESOLVED\`; card retained and copy narrowed to the verified recurrence play pattern.\n\n## Ruric Thar, the Unbowed / Gruul Clans\n\n- Inspected primary source: https://magic.wizards.com/en/news/feature/planeswalkers-guide-to-gatecrash-part-2#the-gruul-clans\n- The now-readable guide identifies Ruric Thar as Ghor leader and the Ghor as conducting frequent savage assaults. Exact Oracle text separately verifies mandatory attacks and the six-damage noncreature-spell trigger.\n- Result: \`SOURCE_INTAKE_RESOLVED\`; card retained.\n\n## Atarka, World Render / Glint\n\n- Inspected primary source: https://magic.wizards.com/en/news/magic-story/planeswalkers-guide-dragons-tarkir-part-2-2015-03-18#the-atarka-clan\n- The guide establishes Atarka's endless hunger and destructive appetite. It does not establish a universal four-color philosophy.\n- Result: \`SOURCE_INTAKE_RESOLVED\`; exact flavor retained, while the modal stays at Vox Mana synthesis altitude.\n\n## Dune owner-acceptance correction\n\n- Owner rendered review rejected Scour from Existence at candidate \`f5ede39a7f03caf6c0644c80142c201643605b85\`: its cross-identity voice still required too much explanation and the authority bridge remained insufficient.\n- The replacement is Dune-Brood Nephilim, exact printing \`15b4ee44-28c4-4a39-9c06-aca43787954f\`. The committed Scryfall record verifies both the exact line and the combat-damage trigger that creates one Sand for each land controlled.\n- Dune-Brood is already the governed card anchor in \`dune_claim_0004\`; \`dune_claim_0005\` and DUNE-EVID-009 bound the interpretation to physical momentum and territorial-swarm synthesis. The relationship does not treat the Nephilim as a faction or doctrine.\n- The older VM-558 rejection of a generic Dune-Brood swarm bridge and the VM-563 owner rejection of Scour both remain in the relationship revision history.\n- Result: \`RELATIONSHIP_REPLACED\`; evidence status \`PASS_GOVERNED_DUNE_ANCHOR_AND_EXACT_CARD_EVIDENCE\`.\n\n## Witch authority exception\n\n- No new doctrine was introduced. Amphin Cutthroat remains narrowed to Witch's already-governed patient development and calculated expansion facets.\n- Result: relationship retained; unsupported missing-color psychology removed.\n`;

const outputs = {
  [paths.voiceSource]: pretty(voiceSource),
  [paths.voicePrintings]: pretty(voicePrintings),
  [paths.voiceCatalog]: pretty(voiceCatalog),
  [paths.playSource]: pretty(playSource),
  [paths.playCatalog]: pretty(playCatalog),
  [paths.manifest]: pretty(manifest),
  [paths.summary]: summary,
  [paths.intake]: intake,
};

for (const [relativePath, content] of Object.entries(outputs)) {
  const absolutePath = path.join(root, relativePath);
  if (write) await writeFile(absolutePath, content);
  else {
    const actual = await readFile(absolutePath, "utf8").catch(() => "");
    if (actual.replace(/\r\n/g, "\n") !== content.replace(/\r\n/g, "\n")) fail(`Stale VM-563 artifact: ${relativePath}`);
  }
}

console.log(JSON.stringify({ status: "PASS", mode: write ? "write" : "check", counts }, null, 2));
