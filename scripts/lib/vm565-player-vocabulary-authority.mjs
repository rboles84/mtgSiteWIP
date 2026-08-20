export const VM565_MANA_ROCKS_DEFINITION = "Artifacts that produce mana, helping a deck accelerate or fix its mana.";

export const VM565_NEW_GLOSSARY_TERMS = Object.freeze([
  { id: "afterlife", term: "Afterlife", aliases: [], copy: "When a creature with afterlife dies, create the stated number of 1/1 white and black Spirit creature tokens with flying.", role: "official_game_mechanic", locator: "https://magic.wizards.com/en/news/feature/ravnica-allegiance-mechanics" },
  { id: "artifacts", term: "Artifacts", aliases: [], copy: "Using artifacts as threats, engines, mana, or synergy pieces.", role: "vox_mana_commander_vocabulary", locator: "data/taxonomy/vox-mana-tags.json#artifacts" },
  { id: "bgx_midrange", term: "BGx Midrange", aliases: ["Rock / BGx Midrange"], copy: "A black-green midrange strategy built around efficient disruption, durable threats, and attrition; the x means it may splash another color.", role: "commander_community_archetype", locator: "https://magic.wizards.com/en/news/making-magic/mastering-dominaria-remastered" },
  { id: "burn", term: "Burn", aliases: [], copy: "Using spells or abilities to deal direct damage to creatures, players, or other targets.", role: "vox_mana_commander_vocabulary", locator: "data/taxonomy/vox-mana-tags.json#burn" },
  { id: "dredge", term: "Dredge", aliases: [], copy: "If a card with dredge N is in your graveyard when you would draw, you may mill exactly N cards and return that card to your hand instead.", role: "official_game_mechanic", locator: "https://magic.wizards.com/en/news/feature/modern-horizons-3-mechanics#dredge" },
  { id: "enchantments", term: "Enchantments", aliases: [], copy: "Using enchantments as persistent rules, engines, or creature enhancements.", role: "vox_mana_commander_vocabulary", locator: "data/taxonomy/vox-mana-tags.json#enchantments" },
  { id: "enchantress", term: "Enchantress", aliases: [], copy: "An enchantment-focused strategy that draws cards or generates value when you cast enchantments or when enchantments enter the battlefield.", role: "commander_community_archetype", locator: "data/taxonomy/vox-mana-tags.json#enchantress" },
  { id: "exalted", term: "Exalted", aliases: [], copy: "Whenever a creature you control attacks alone, each exalted ability gives it +1/+1 until end of turn.", role: "official_game_mechanic", locator: "https://magic.wizards.com/en/news/making-magic/between-rock-and-shard-place-2008-09-05" },
  { id: "go_wide", term: "Go-wide", aliases: ["go wide"], copy: "Build many creatures, often tokens, and use their combined pressure to overwhelm blockers and opponents.", role: "commander_community_archetype", locator: "https://magic.wizards.com/en/news/making-magic/core-point-2019-06-17#go-wide-white-black-green" },
  { id: "group_hug", term: "Group Hug", aliases: ["group-hug"], copy: "Give resources to multiple players, often to shape the table's politics or pace.", role: "vox_mana_commander_vocabulary", locator: "data/taxonomy/vox-mana-tags.json#group-hug" },
  { id: "haste", term: "Haste", aliases: [], copy: "A creature with haste can attack and use tap abilities as soon as it comes under your control.", role: "official_game_mechanic", locator: "https://magic.wizards.com/en/rules" },
  { id: "heroic", term: "Heroic", aliases: [], copy: "Heroic is an ability word for abilities that trigger when you cast a spell that targets that creature.", role: "official_game_mechanic", locator: "https://magic.wizards.com/en/news/feature/double-masters-2022-release-notes-2022-06-24#ability-word-heroic" },
  { id: "historic", term: "Historic", aliases: ["historic payoffs"], copy: "Historic refers collectively to artifacts, legendary cards, and Sagas.", role: "official_game_term", locator: "https://magic.wizards.com/en/news/feature/dominaria-mechanics-2018-03-21#historic" },
  { id: "impulse_draw", term: "Impulse draw", aliases: ["impulsive draw", "impulsive drawing"], copy: "Exile cards and allow them to be played for a limited time instead of putting them into your hand.", role: "commander_community_design_term", locator: "https://magic.wizards.com/en/news/making-magic/the-council-of-colors-revisited" },
  { id: "land_denial", term: "Land denial", aliases: ["Ponza / Land Denial"], copy: "Attack opponents' mana by destroying, restricting, or disabling lands; Ponza is a red-green version that follows with efficient threats.", role: "commander_community_archetype", locator: "https://magic.wizards.com/en/news/announcements/commander-banned-and-restricted-february-9-2026" },
  { id: "lifegain", term: "Lifegain", aliases: ["life gain", "life-gain"], copy: "Gain life as protection, fuel, or a payoff trigger.", role: "vox_mana_commander_vocabulary", locator: "data/taxonomy/vox-mana-tags.json#lifegain" },
  { id: "mill", term: "Mill", aliases: ["milling"], copy: "Put cards from a library into its owner's graveyard, often to empty an opponent's library or stock a graveyard.", role: "official_game_action", locator: "https://magic.wizards.com/en/rules" },
  { id: "politics", term: "Politics", aliases: [], copy: "Use deals, incentives, goad, votes, or threat assessment to shape multiplayer decisions.", role: "vox_mana_commander_vocabulary", locator: "data/taxonomy/vox-mana-tags.json#politics" },
  { id: "reanimator", term: "Reanimator", aliases: ["reanimation"], copy: "Put creature cards from your graveyard directly onto the battlefield, often for less mana than casting them normally.", role: "commander_community_archetype", locator: "data/taxonomy/vox-mana-tags.json#reanimator" },
  { id: "surveil", term: "Surveil", aliases: [], copy: "Look at the stated number of cards from the top of your library, put any into your graveyard, and return the rest to the top in any order.", role: "official_game_action", locator: "https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04#house-dimir-and-surveil" },
  { id: "theft", term: "Theft", aliases: [], copy: "Use opponents' cards, permanents, libraries, or graveyards as resources.", role: "vox_mana_commander_vocabulary", locator: "data/taxonomy/vox-mana-tags.json#theft" },
  { id: "treasure", term: "Treasure", aliases: ["Treasures", "Treasure tokens"], copy: "A Treasure is an artifact token that can be tapped and sacrificed to add one mana of any color.", role: "official_game_object", locator: "https://magic.wizards.com/en/news/feature/ixalan-mechanics" },
  { id: "typal", term: "Typal", aliases: ["Tribal"], copy: "Build around a shared creature type and cards that reward that type; many players also call this tribal.", role: "vox_mana_commander_vocabulary", locator: "data/taxonomy/vox-mana-tags.json#typal" },
]);

const explicit = (identityKey, recordId, surface, field, matchedText) => ({
  identity_key: identityKey,
  record_id: recordId,
  surface,
  field,
  matched_text: matchedText,
});

export const VM565_NEW_TERM_TARGETS = Object.freeze([
  explicit("WB", "glossary_afterlife", "what-to-look-for-title", "item-3-title", "Afterlife"),
  explicit("COLORLESS", "glossary_artifacts", "start-here", "Possible directions", "Artifacts"),
  explicit("ESPER", "glossary_artifacts", "start-here", "Possible directions", "Artifacts"),
  explicit("LOREHOLD", "glossary_artifacts", "what-to-look-for-title", "item-2-title", "Artifacts"),
  explicit("U", "glossary_artifacts", "what-to-look-for-title", "item-3-title", "Artifacts"),
  explicit("YORE", "glossary_artifacts", "start-here", "Possible directions", "Artifacts"),
  explicit("BG", "glossary_bgx_midrange", "start-here", "Possible directions", "Rock / BGx Midrange"),
  explicit("R", "glossary_burn", "start-here", "Possible directions", "Burn"),
  explicit("WR", "glossary_burn", "what-to-look-for-title", "item-2-title", "Burn"),
  explicit("BG", "glossary_dredge", "start-here", "Possible directions", "Dredge"),
  explicit("BANT", "glossary_enchantments", "start-here", "Possible directions", "Enchantments"),
  explicit("ESPER", "glossary_enchantments", "start-here", "Possible directions", "Enchantments"),
  explicit("BANT", "glossary_enchantress", "what-to-look-for-title", "item-3-title", "Enchantress"),
  explicit("BANT", "glossary_exalted", "start-here", "Possible directions", "Exalted"),
  explicit("WG", "glossary_go_wide", "start-here", "Possible directions", "Go-Wide"),
  explicit("WR", "glossary_go_wide", "start-here", "Possible directions", "Go-Wide"),
  explicit("INK", "glossary_group_hug", "start-here", "Possible directions", "Group Hug"),
  explicit("R", "glossary_haste", "start-here", "Possible directions", "Haste"),
  explicit("WR", "glossary_heroic", "what-to-look-for-title", "item-2-title", "Heroic"),
  explicit("LOREHOLD", "glossary_historic", "what-to-look-for-title", "item-3-title", "Historic"),
  explicit("BR", "glossary_impulse_draw", "start-here", "Guild spellcraft", "impulse draw"),
  explicit("R", "glossary_impulse_draw", "what-to-look-for-title", "item-3-title", "Impulse Draw"),
  explicit("RG", "glossary_land_denial", "what-to-look-for-title", "item-3-title", "Ponza / Land Denial"),
  explicit("ABZAN", "glossary_lifegain", "start-here", "Possible directions", "Lifegain"),
  explicit("WITHERBLOOM", "glossary_lifegain", "start-here", "College spellcraft", "life gain"),
  explicit("BG", "glossary_mill", "what-to-look-for", "item-3-copy", "milling"),
  explicit("UB", "glossary_mill", "how-this-plays", "mechanical-expression", "mill"),
  explicit("INK", "glossary_politics", "start-here", "Possible directions", "Politics"),
  explicit("B", "glossary_reanimator", "what-to-look-for-title", "item-3-title", "Reanimator"),
  explicit("UB", "glossary_surveil", "start-here", "Possible directions", "Surveil"),
  explicit("SULTAI", "glossary_theft", "start-here", "Possible directions", "Theft"),
  explicit("PRISMARI", "glossary_treasure", "start-here", "College spellcraft", "treasure"),
  explicit("R", "glossary_treasure", "what-to-look-for-title", "item-3-title", "Treasures"),
  explicit("LOREHOLD", "glossary_typal", "start-here", "Possible directions", "Tribal"),
]);

export const VM565_EXISTING_TERM_OVERRIDES = Object.freeze([
  explicit("W", "glossary_sweepers", "how-this-plays", "mechanical-expression", "Board wipes"),
  explicit("B", "glossary_aristocrats", "what-to-look-for-title", "item-2-title", "Aristocrats"),
  explicit("WU", "glossary_prison_control", "what-to-look-for-title", "item-2-title", "Prison Control"),
  explicit("WG", "glossary_populate", "how-this-plays", "mechanical-expression", "populate"),
  explicit("WR", "glossary_voltron", "what-to-look-for-title", "item-3-title", "Voltron"),
  explicit("SILVERQUILL", "glossary_goad", "how-this-plays", "mechanical-expression", "goad"),
  explicit("COLORLESS", "glossary_colorless_mana", "mana-notes", "rocks-and-sources", "colorless mana"),
]);

export function vm565TeachingPolicyFor(recordId) {
  const newTargets = VM565_NEW_TERM_TARGETS.filter((target) => target.record_id === recordId);
  if (newTargets.length) return { mode: "EXPLICIT_TARGETS", targets: newTargets };
  const overrides = VM565_EXISTING_TERM_OVERRIDES.filter((target) => target.record_id === recordId);
  if (overrides.length) return { mode: "LEGACY_WITH_OVERRIDES", targets: overrides };
  return null;
}
