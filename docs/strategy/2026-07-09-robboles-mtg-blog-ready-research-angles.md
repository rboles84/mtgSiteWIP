# Phase 1 Supplement - Blog-Ready MTG Research Angles

This is the more publishable layer: not "here is what Vox Mana does," but "here are the MTG/Commander ideas the research supports." Treat these as recurring idea candidates, essay angles, or series hooks.

## 1. Flavor Is How Mechanics Taste

**Working claim:** Flavor is not decoration. It is the way a mechanic tastes at the table.

**The post angle:** EDHREC can tell you that a deck is "graveyard," "tokens," or "spellslinger." That is useful, but it does not tell a player what the strategy feels like to pilot, what it asks of the table, or why it might match their taste. A graveyard deck might feel like resilience, theft, memory, rot, inevitability, or desecration depending on how the mechanic is framed.

**Evidence backing:** `data/taxonomy/vox-mana-tags.json` has 94 tags split across mechanical, playstyle, identity, and lore-tone layers. Each tag carries `canonical_definition`, `vox_mana_interpretation`, `table_feel`, `player_fantasy`, `typical_actions`, and `adjacent_tags`. Examples: graveyard becomes "loss as stored material"; spellslinger makes the stack feel like the battlefield; Voltron condenses the whole plan into one champion.

**Why it is interesting:** This gives you a fresh way to talk about Magic: flavor is sensory data. It explains why two mechanically similar decks can make players feel completely different.

**Caveat:** This is an interpretive framework, not official canon psychology.

## 2. Popularity Is Not Taste

**Working claim:** Recommendation sites show what people play; they do not fully explain what a player is hungry for.

**The post angle:** EDHREC, MTGDecks, Archidekt, and similar tools are excellent at surfacing common cards, commanders, and lists. But "most played" is not the same as "best fit." A new or returning Commander player often needs translation: Do I want pressure, inevitability, a puzzle, a table bargain, a heroic threat, or a machine that keeps rebuilding itself?

**Evidence backing:** `docs/design/strategium-archetype-source-audit.md` confirms 50 real Commander archetypes, mostly backed by EDHREC theme tags, Draftsim archetypes, and MTG Fandom deck archetype vocabulary. The audit also flags overlap problems: Sacrifice vs Aristocrats, Landfall vs Lands Matter, Blink vs ETB Value, Ramp vs Big Mana. The research shows the public taxonomy is real, but not clean enough by itself to teach taste.

**Why it is interesting:** This is a strong "what the internet is good at / what it misses" article without dunking on the tools. The gap is not data quality. The gap is meaning.

**Caveat:** Avoid claiming EDHREC or Archidekt are deficient. They solve a different problem.

## 3. A Quiz Can Be Evidence, Not Vibes

**Working claim:** A placement quiz does not have to be a 2000s personality-result sticker if it behaves like an evidence model.

**The post angle:** Most fandom quizzes ask a few obvious questions and spit out a label. The more serious approach is closer to adaptive testing: collect signals, track uncertainty, separate close neighbors, and explain why the result won against near misses.

**Evidence backing:** `docs/design/placementLogic_deep-research-report.md` argues for Bayesian/adaptive classification, entropy-aware Gate questions, same-color duplicate resolution, and face-valid Crucible questions. `assets/js/adaptive-placement.js` tracks evidence trails, stage history, confidence, adjacent matches, and Crucible routing. `docs/audits/gate-compression/live-gate-bias.md` enumerates 625 Gate-only paths and reports skew caps, rank-one distribution, and same-color duplicate ties. `docs/audits/gate-compression/wubrg-first-gate-comparison.md` checks 37 expressions for reachability and leakage.

**Why it is interesting:** This lets you write the "science not Disney princess quiz" post. The science is not "this proves your soul is Prismari"; it is "the model refuses to call a vibe a fact."

**Caveat:** The current model is validated for internal behavior and coverage, not clinical personality measurement.

## 4. The Near Miss Is The Lesson

**Working claim:** The almost-fit often teaches more than the winner.

**The post angle:** If someone lands Prismari with Izzet nearby, the interesting question is not just "why Prismari?" It is "what separated expression from experimentation?" If Sultai and Witherbloom are close, the useful distinction may be exploitation, metabolism, recursion, or life-as-currency. The near miss turns the result into education.

**Evidence backing:** Placement files include collision targets, suppressions, and "do not overfit color identity" guardrails. `docs/audits/gate-compression/wubrg-first-gate-comparison.md` shows same-color duplicates intentionally tie after Gate and need Crucible resolution. `assets/js/adaptive-placement.js` preserves adjacent matches and confidence gaps instead of discarding runner-ups.

**Why it is interesting:** This is a better reader experience than "you are X." It respects ambiguity and gives old players a reason to think again.

**Caveat:** Needs examples written from actual model pairings, not generic "close enough" vibes.

## 5. Commander Decks Are Social Signals

**Working claim:** In Commander, your deck starts talking before it starts winning.

**The post angle:** A deck announces what kind of pressure has entered the room: deal-making, inevitability, hero-building, denial, spectacle, recursion, or shared abundance. That social read matters because Commander is multiplayer and relational; threat assessment is emotional as much as technical.

**Evidence backing:** `docs/research/canon/misc/MTG Archetype Definition and Translation.md` maps archetypes to emotional experiences and social friction: control as stabilization, tempo as being unpinnable, combo as puzzle, politics as social maneuver, stax as agency denial, theft as boundary violation, storm as time disproportionality. `assets/js/archscry-presentation.js` repeatedly uses `opponentRead`, `emotionalPressure`, and `tableExperience`.

**Why it is interesting:** This is a Table Talk lane with teeth: "your commander is not just your strategy; it is your opening statement."

**Caveat:** Keep it practical and table-aware so it does not become moral judgment of playstyles.

## 6. Flavor Helps New Players Cross The Gap

**Working claim:** New players do not only need rules; they need meaning that lowers the cost of learning.

**The post angle:** Beginner resources often front-load rules, product choices, and deck construction ratios. Those are necessary, but they can create paralysis. Flavor and identity can act as a compression layer: a player can remember "this deck makes the graveyard a second hand" faster than they can memorize every recursion pattern.

**Evidence backing:** `docs/research/webdev/vox-mana-specific/MTG_Beginner_Resource_Strategy.md` identifies beginner pain points: format disconnect, product confusion, trigger/rules overload, pregame social anxiety, and deckbuilding paralysis. The same doc recommends progressive disclosure, curated entry paths, and conceptual framing instead of raw database walls.

**Why it is interesting:** This bridges QA/systems thinking with Magic pedagogy: the goal is not to dump information, but to reduce cognitive load.

**Caveat:** Do not replace rules accuracy with vibes. Flavor helps when it routes players toward correct concepts.

## 7. Goodstuff Is A Warning Label

**Working claim:** "Goodstuff" often means the deck has power before it has identity.

**The post angle:** Good cards can make a deck work while also making it harder to explain what the deck is for. Five-color, Sultai value, Jund piles, and broad staple packages can all drift into "everything strong I own" unless the pilot names a reason the pieces belong together.

**Evidence backing:** `data/taxonomy/vox-mana-tags.json` defines Goodstuff as high card quality rather than deep synergy and warns it can feel unfocused without a theme or finish. `data/raw-factions/wubrg/wubrg.profile.json` repeatedly distinguishes WUBRG synthesis from unfocused accumulation. Sultai research notes that community/player usage often broadens Sultai into graveyard/value/toolbox/combo shorthand, but that this is not the same as Tarkir canon.

**Why it is interesting:** This is a good post for old players. It does not shame staples; it asks whether the deck has a thesis.

**Caveat:** Goodstuff is sometimes correct, especially for learning, budgets, or local metas. The claim is about identity drift, not deck quality.

## 8. The Data Says Commander Taste Has Layers

**Working claim:** The available data is already telling us that Commander taste is not one axis.

**The post angle:** Even before collecting live user outcomes, the project data shows multiple overlapping axes: mechanics, playstyle, identity, lore tone, complexity, politics, combat, combo, value, and beginner friendliness. That supports a placement model that asks about worldview and table feel instead of only asking "what colors do you like?"

**Evidence backing:** `data/taxonomy/vox-mana-tags.json` contains 94 tags: 42 mechanical, 12 playstyle, 23 identity, and 17 lore-tone. Its most connected adjacent tags include control, graveyard, recursion, knowledge, combat, aggro, restoration, community, draw, lifegain, and growth. The 155-row `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` precon dataset averages high on value-engine (3.50/5), moderate on complexity (2.94/5), and low on political-social play (1.32/5). Common playstyle tags include value (45), tribal/typal (42), tokens (26), graveyard (22), aggro (21), combat (20), control (18), counters (17), artifacts (17), combo (16), ramp (16), and go-wide (16).

**Interesting correlations from the curated precon data:** Combat focus and aggression strongly move together (0.85). Beginner friendliness and complexity strongly move opposite (-0.84). Complexity and combo potential move together (0.76). Combo potential and value-engine also move together (0.63). Control focus and aggression move opposite (-0.61).

**Why it is interesting:** This gives you a careful data-backed post: "not player psychology yet, but the curated Commander artifact already shows why one-label recommendations flatten the experience."

**Caveat:** These are correlations inside a curated precon research file, not proof about all Commander players or all decklists.

## 9. The Color Pie Is A Decision System

**Working claim:** The color pie is most useful when treated as a set of decision questions, not a horoscope.

**The post angle:** White asks what protects everyone. Blue asks what can be improved. Black asks what gives agency. Red asks what must be lived. Green asks what already belongs. That is more actionable than "you are a White person" or "you are a Blue player."

**Evidence backing:** `docs/research/canon/misc/vox_mana_color_bible_placement_engine_spec.md` frames each color through core truth, drive, decision lens, method/outcome, tensions, distortions, user interpretation, and growth paths. Raw placement packets then turn those into positive/negative indicators and discriminator questions.

**Why it is interesting:** This can be the thesis that keeps the work from sounding like personality typing. The colors become lenses for choices under pressure.

**Caveat:** Keep the language about "answers you favor" rather than "who you are."

## 10. Taste Needs A Vocabulary

**Working claim:** Players cannot choose better decks until they have words for the kinds of fun they are chasing.

**The post angle:** Many players say "I like graveyard decks" or "I want something blue-red," but what they may mean is patience, experimentation, spectacle, inevitability, a puzzle turn, or a deck that lets the past keep mattering. The work is giving players a better vocabulary for fun.

**Evidence backing:** The tag taxonomy's `player_fantasy` and `table_feel` fields; the archetype translation research; the Beginner Resource Strategy's pain points around deckbuilding paralysis; the precon recommendation dataset's `recommendedFor`, `notRecommendedFor`, `whatThisDeckTeachesAboutItsColors`, `beginnerLesson`, and `strategyLesson` fields.

**Why it is interesting:** This is the humane version of the whole project. It is not about being cleverer than EDHREC. It is about helping players recognize themselves in the choices.

**Caveat:** Best supported by examples from actual decks, not abstract theory alone.

## Strongest Three To Carry Forward

1. **Flavor Is How Mechanics Taste** - most distinctive, most memorable, and directly answers the user's "flavor tastes" instinct.
2. **A Quiz Can Be Evidence, Not Vibes** - strongest science/QA crossover; explains why the placement logic is disciplined.
3. **Popularity Is Not Taste** - best external-facing contrast with EDHREC/Archidekt/MTGDecks without making the piece about the site.

## Data Claims Safe To Use Now

- The repo has model-behavior evidence: Gate path enumeration, reachability checks, same-color duplicate tie/resolution checks, and leakage checks.
- The repo has curated artifact evidence: 94-tag taxonomy and 155-row precon research file with numeric dimensions.
- The repo has source-backed research evidence: color-pie, archetype, Strixhaven/Ravnica/Tarkir/four-color/Colorless/WUBRG research packets.
- The repo does not yet appear to have enough real user-outcome data to claim player-population correlations.

## Ideas To Avoid Or Reframe

- Avoid: "Vox Mana is better than EDHREC." Reframe: "EDHREC answers popularity; this answers taste and meaning."
- Avoid: "The quiz scientifically determines your identity." Reframe: "The model makes interpretive evidence visible and refuses unsupported certainty."
- Avoid: "Flavor is just lore." Reframe: "Flavor is how mechanics become felt experience."
- Avoid: "Commander recommendations." Reframe: "Commander translation: what this deck teaches, how it feels, and what kind of table signal it sends."
