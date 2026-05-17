# Card Design Heuristics: Extracted from Vox Mana Metaphysics

## Executive Summary

This document extracts explicit and implicit card design heuristics from the Vox Mana metaphysics documents, primers, and system-level analyses. Each heuristic is presented as a named template with intent, trigger, cost pattern, balance notes, and example pseudocode. Templates are organized by color (3–6 per color) followed by cross-color archetypes. These heuristics are derived from philosophical principles rather than mechanical copying, enabling novel card designs that remain color-authentic.

---

## White Templates

### W1: Symmetrical Reset

- **Intent:** Restore board parity and punish overextension; enforce the axiom that all entities are fundamentally equal under the law.
- **Trigger:** When the board state becomes asymmetrically advantaged—one player controls disproportionately more permanents, creatures, or resources.
- **Cost Pattern:** High mana cost (5–7 CMC); global effect; sorcery speed. Controller may receive a protection clause or post-wipe token generation to reward proactive investment in the reset.
- **Balance Notes:** Scales with board density. Consider token-exception clauses (destroy all non-token creatures) or staggered timing (exile at end of next turn) to prevent feel-bad moments. Too cheap = oppressive; too expensive = irrelevant.
- **Example Pseudocode:** `{4WW} Sorcery — Destroy all creatures. For each creature destroyed this way, its controller creates a 1/1 white Spirit token.`

### W2: Systemic Taxation

- **Intent:** Alter the fundamental economics of the game space; make freedom expensive. Enforce bureaucratic timelines on all players.
- **Trigger:** Whenever opponents cast spells, draw cards, attack, or take game actions above a defined threshold.
- **Cost Pattern:** Low-to-medium permanent cost (2–4 CMC creature or enchantment); generates incremental value per opponent action. More effective in multiplayer where trigger frequency multiplies.
- **Balance Notes:** Tax amount must be payable (2 generic is the sweet spot per Smothering Tithe precedent). Mandatory taxes (Thalia) feel different from optional taxes (Smothering Tithe). Consider whether the tax creates resources for White or merely slows opponents.
- **Example Pseudocode:** `{2W} Enchantment — Whenever an opponent casts a noncreature spell, they pay {1} or you create a Treasure token.`

### W3: Modular Army Deployment

- **Intent:** Generate collective strength through numbers; demonstrate that the group overwhelms the individual.
- **Trigger:** Entering the battlefield, casting specific spell types, or meeting a board-state condition (e.g., controlling fewer creatures than an opponent).
- **Cost Pattern:** Medium cost (3–5 CMC) for the generator; tokens are 1/1 baseline. Anthem effects (+1/+1 to tokens) are separate permanents requiring additional investment.
- **Balance Notes:** Token generators must be slower or more fragile than the tokens they create to prevent runaway board states. Go-wide strategies need board-wipe vulnerability as a natural check.
- **Example Pseudocode:** `{3W} Creature 2/4 — When ~ enters, create two 1/1 white Soldier tokens. Soldiers you control get +0/+1.`

### W4: Conditional Catch-Up Draw

- **Intent:** Restore informational parity when opponents have violated fairness by accumulating excess resources.
- **Trigger:** When an opponent has more of something than you (more cards, more creatures, more lands). Reactive, not proactive.
- **Cost Pattern:** Low cost creature or enchantment (2–3 CMC) with a conditional draw trigger. Draws 1 card per trigger (not 2+, to maintain White's restrained card advantage).
- **Balance Notes:** Condition must be genuinely reactive, not trivially met. "When an opponent draws their second card each turn" is good (punishes excess). "Whenever you cast a spell" is bad (rewards White's own actions, not opponent's violations). Must feel like justice, not greed.
- **Example Pseudocode:** `{1W} Creature 1/3 — Whenever an opponent attacks you with two or more creatures, draw a card.`

---

## Blue Templates

### U1: Causal Negation

- **Intent:** Stop an action at the level of intent; exercise veto power over what is permitted to become real.
- **Trigger:** Opponent casts a spell (on the stack, before resolution).
- **Cost Pattern:** Varies from free (Force of Will with alternate cost) to expensive (Cryptic Command at 4 CMC). Holding mana open is the fundamental cost—tempo sacrifice for control.
- **Balance Notes:** Hard counters (counter anything) should cost 2+ mana. Conditional counters (counter unless they pay X) can cost less. Free counters need severe alternate costs. Too many hard counters in a set = miserable play patterns. Counter density per set matters more than individual card power.
- **Example Pseudocode:** `{1U} Instant — Counter target spell unless its controller pays {2}. If they pay, scry 2.`

### U2: Informational Accumulation

- **Intent:** Expand cognitive bandwidth; ensure Blue always has more options than opponents.
- **Trigger:** Upkeep, end step, opponent's spell resolution, or active ability. Timing determines the card's strategic role (proactive draw vs. reactive draw).
- **Cost Pattern:** Scaling with quantity—drawing 1 card is cheap (cantrip), drawing 2+ requires significant investment or conditional triggers. Repeatable draw engines are the most powerful form.
- **Balance Notes:** Blue's draw should feel cerebral, not greedy. "Draw and filter" (Brainstorm: draw 3, put back 2) is more Blue than "draw many" (which can feel Black). Selection quality matters more than raw quantity for Blue's identity.
- **Example Pseudocode:** `{2U} Enchantment — At the beginning of your end step, look at the top three cards of your library. Put one into your hand and the rest on the bottom in any order.`

### U3: Temporal Disruption

- **Intent:** Rewind opponent's progress; desynchronize resource expenditure against time. Nothing is permanent except understanding.
- **Trigger:** Opponent resolves a permanent; Blue responds by returning it to hand or top of deck.
- **Cost Pattern:** Cheap single-target bounce (1–2 CMC for creature bounce); expensive mass bounce (6–7 CMC for Cyclonic Rift–level effects). Mass bounce should always be costly.
- **Balance Notes:** Bounce creates tempo, not card advantage (opponent still has the card). Bounce to top of deck is stronger (costs opponent a draw step). One-sided bounce (Cyclonic Rift overloaded) should be rare mythic–level effects.
- **Example Pseudocode:** `{1U} Instant — Return target nonland permanent to its owner's hand. If that permanent's mana value was 4 or greater, scry 1.`

### U4: Structural Replication

- **Intent:** Perfect understanding allows perfect reproduction. Turn the opponent's strengths into your assets.
- **Trigger:** A permanent enters the battlefield or a spell is cast that Blue wishes to duplicate.
- **Cost Pattern:** Clone effects cost what the original costs minus a discount (you don't get to choose stats). Spell copying costs less than the original (Twincast at 2 CMC copies anything).
- **Balance Notes:** Clones should enter as copies, not as the original (legendary rule applies). Token copies are weaker than card copies. Blue should not permanently steal (that's Black/Red territory)—copying is the Blue method.
- **Example Pseudocode:** `{3U} Creature 0/0 — You may have ~ enter the battlefield as a copy of any creature on the battlefield, except it has "When this creature dies, draw a card."`

---

## Black Templates

### B1: Vital Liquidity (Life-for-Effect)

- **Intent:** Spend life as currency; bypass mana restrictions by paying with vitality. The only life point that matters is the last one.
- **Trigger:** Activated ability, alternate casting cost, or replacement effect that substitutes life payment for mana.
- **Cost Pattern:** Life cost should be significant enough to create risk (2+ life for minor effects, 5+ for major effects). Phyrexian mana (2 life per colored pip) is the established rate.
- **Balance Notes:** Life payment is stronger in formats with higher starting life (Commander's 40 vs. Standard's 20). Cards designed for Standard should assume 20 life; Commander-focused designs can be more aggressive. Life payment without a meaningful ceiling creates degenerate loops (Necropotence is the cautionary example).
- **Example Pseudocode:** `{1B} Instant — As an additional cost, pay 3 life. Search your library for a card, put it into your hand, then shuffle.`

### B2: Deterministic Certainty (Tutor)

- **Intent:** Eliminate randomness; demand a specific future rather than hoping for one.
- **Trigger:** Active ability or ETB effect that searches the library.
- **Cost Pattern:** Unrestricted tutors are expensive (2 CMC for Demonic Tutor is historically undercosted). Restricted tutors (creature only, instant/sorcery only) can be cheaper. Life payment as additional cost is the Black-flavored restriction.
- **Balance Notes:** Tutors enable combo strategies disproportionately. In singleton formats (Commander), tutors are format-warping because they effectively reduce deck variance to zero. New tutor designs should include restrictions (card type, CMC limit, reveal-to-opponent) to maintain some variance. "Search and put on top" is weaker than "search and put in hand."
- **Example Pseudocode:** `{2B} Sorcery — Search your library for a card with mana value 3 or less, reveal it, and put it into your hand. You lose life equal to its mana value.`

### B3: Recursive Asset Recovery (Reanimation)

- **Intent:** Subvert the finality of death; treat the graveyard as a resource pool.
- **Trigger:** Activated ability or sorcery-speed effect that returns creatures from graveyard to battlefield.
- **Cost Pattern:** Cheap reanimation (1–2 CMC) should target any graveyard (including yours) but impose a downside (life loss, -1/-1 counters, sacrifice at end of turn). Expensive reanimation (5+ CMC) can be clean.
- **Balance Notes:** Reanimation cheats mana costs—a 1-mana Reanimate putting a 10-mana creature into play creates a massive tempo swing. Balance via life payment, speed restriction (sorcery only), or targeting restriction (only creatures that died this turn). Self-mill enabling reanimation should be carefully costed.
- **Example Pseudocode:** `{1B} Sorcery — Return target creature card from your graveyard to the battlefield. You lose life equal to its mana value. It gains "When this creature dies, exile it."`

### B4: Expendable Asset Conversion (Sacrifice Engine)

- **Intent:** Convert subordinates into immediate power; demonstrate that willingness to sacrifice separates the strong from the weak.
- **Trigger:** Activated ability requiring sacrifice of a creature, artifact, or other permanent as cost.
- **Cost Pattern:** The sacrifice itself is the primary cost. The effect should be proportional to what was sacrificed (small creature = small effect; large creature = large effect). Free sacrifice outlets (Viscera Seer's 0-cost scry) are powerful because they convert any creature into value at instant speed.
- **Balance Notes:** Free sacrifice outlets are the most dangerous enablers in Black's toolkit. They turn opponent removal into a disadvantage (sacrifice in response = extract value). Limit free outlets to minor effects (scry 1, gain 1 life) or add a mana cost to larger effects.
- **Example Pseudocode:** `{2B} Creature 2/2 — Sacrifice another creature: Draw a card and lose 1 life.`

---

## Red Templates

### R1: Direct Kinetic Expression (Burn)

- **Intent:** Project raw emotional force directly at the target. No negotiation, no combat phase—pure intent made lethal.
- **Trigger:** Instant or sorcery cast targeting a player, planeswalker, or creature.
- **Cost Pattern:** The Lightning Bolt rate (3 damage for 1 mana) is the historical benchmark. Above-rate damage requires drawbacks (sacrifice lands for Fireblast, X-cost scaling for Banefire). Uncounterable burn should be premium-costed.
- **Balance Notes:** Burn faces a critical format dependency: 3 damage is 15% of 20 life (significant) but 7.5% of 40 life (trivial). Commander burn designs should include "each opponent" targeting or damage scaling. Creature burn and player burn can be separated by targeting restrictions.
- **Example Pseudocode:** `{1R} Instant — ~ deals 3 damage to any target. If that target is a player, ~ deals 1 damage to each other opponent.`

### R2: Volatile Option Acquisition (Impulse Draw)

- **Intent:** Acquire information under time pressure; use it now or lose it. Live in the moment.
- **Trigger:** Cast, attack trigger, or activated ability that exiles cards from the top of the library with an "until end of turn" play window.
- **Cost Pattern:** Impulse draw should be cheap (1–2 CMC for 1–2 cards). The time restriction is the primary cost. Extending the window ("until end of your next turn") weakens the Red identity and should be rare.
- **Balance Notes:** Impulse draw is Red's most important Commander-era innovation. It provides card advantage while maintaining Red's "live in the moment" philosophy. The critical design constraint: you must NOT be able to save the cards for later. If the window extends too far, it becomes Blue card draw wearing a Red mask.
- **Example Pseudocode:** `{1R} Sorcery — Exile the top two cards of your library. Until end of turn, you may play those cards. If you don't play a card exiled this way, ~ deals 1 damage to you.`

### R3: Temporal Acceleration (Haste + Temporary Mana)

- **Intent:** Eliminate waiting; compress the timeline. What you summon should act immediately.
- **Trigger:** Creature entering the battlefield (haste) or mana generation effect (Treasure tokens, ritual spells).
- **Cost Pattern:** Haste is free on small creatures (1–2 CMC) and adds 1 CMC on medium creatures. Treasure generation should trigger on combat or aggressive actions (dealing damage, attacking) to reward Red's proactive philosophy.
- **Balance Notes:** Treasure tokens solved Red's mana problem but created a new issue—excessive treasure generation enables degenerate combo turns. Cap treasure creation per turn or tie it to combat to maintain Red's identity as the aggression color, not the ramp color.
- **Example Pseudocode:** `{2R} Creature 3/1 Haste — When ~ deals combat damage to a player, create a Treasure token. Sacrifice ~ at the beginning of the next end step.`

### R4: Systemic Entropy (Chaos Effects)

- **Intent:** Shatter predictability; convert orderly game states into volatile storms. Render long-term planning useless.
- **Trigger:** Continuous replacement effect, triggered ability, or global enchantment that randomizes game actions.
- **Cost Pattern:** Chaos effects should be medium-to-high cost (3–5 CMC) because they affect all players symmetrically. Red's deck should be built to thrive in chaos while opponents' structured strategies collapse.
- **Balance Notes:** Chaos effects are deeply polarizing—players either love or hate them. Design chaos that adds decisions (choose between random options) rather than removing decisions (random target selection). Blood Moon–style effects that punish specific strategies are more fun than Grip of Chaos–style effects that randomize everything.
- **Example Pseudocode:** `{3R} Enchantment — At the beginning of each player's upkeep, that player exiles the top card of their library. They may cast that card this turn. If they don't, ~ deals 2 damage to them.`

---

## Green Templates

### G1: Ecosystem Acceleration (Ramp)

- **Intent:** Widen the economic engine by connecting to the land; access high-tier game elements before opponents.
- **Trigger:** Sorcery-speed spell or creature ETB that searches for lands or puts additional lands onto the battlefield.
- **Cost Pattern:** 2 CMC for one land (Rampant Growth); 3 CMC for two lands (Cultivate); creature-based ramp adds a body (Birds of Paradise, Sakura-Tribe Elder).
- **Balance Notes:** Ramp is Green's strongest mechanic and already dominant in Commander. New ramp designs should consider diminishing returns (second ramp spell is less impactful than first) or conditional requirements (only if you control fewer lands than an opponent). Unconditional ramp continues to widen Green's format advantage.
- **Example Pseudocode:** `{2G} Sorcery — Search your library for a basic land card. If an opponent controls more lands than you, search for two instead. Put them onto the battlefield tapped.`

### G2: Apex Manifestation (Large Creatures)

- **Intent:** Deploy the peak of natural evolution—massive, undeniable physical threats that demand immediate answers.
- **Trigger:** Cast from hand or cheated into play via ramp. High mana value creatures (6+ CMC) with game-ending stats.
- **Cost Pattern:** Power/toughness should be above curve for the mana cost because Green "earns" this through ramp investment. Keyword abilities (trample, reach, hexproof) add to the threat without increasing mana cost proportionally.
- **Balance Notes:** Green fatties need to be answered or they end the game. The design tension: make them powerful enough to justify the ramp investment, but not so powerful that they invalidate all other strategies. ETB abilities that generate value even if removed are the strongest form (Craterhoof Behemoth).
- **Example Pseudocode:** `{4GG} Creature 8/8 Trample — When ~ enters, creatures you control get +X/+X until end of turn, where X is the number of lands you control minus five.`

### G3: Living Environment (Land Synergy)

- **Intent:** Treat the physical environment as an active participant in the ecosystem, not a passive resource.
- **Trigger:** Landfall (land entering the battlefield), land count thresholds, or lands becoming creatures.
- **Cost Pattern:** Landfall triggers are "free" (lands are played normally), so the payoff must be modest per trigger (create a token, gain life, +1/+1 counter). Large payoffs per landfall (Omnath) should be on expensive permanents (4+ CMC).
- **Balance Notes:** Land synergy compounds with ramp—Green fetches extra lands AND benefits from each land entering. This double-dipping is why Green dominates Commander. New land-synergy designs should avoid stacking with ramp too efficiently. Consider "once per turn" clauses.
- **Example Pseudocode:** `{1G} Enchantment — Whenever a land enters the battlefield under your control, if it's not the first land to enter this turn, put a +1/+1 counter on target creature you control.`

### G4: Organic Removal (Fight + Naturalize)

- **Intent:** Remove threats through natural processes—predator consuming prey, nature reclaiming artifice.
- **Trigger:** Activated or triggered ability that uses Green's own creatures as removal tools (fight), or destruction effects targeting artifacts and enchantments.
- **Cost Pattern:** Fight removal costs 1–2 CMC but requires controlling a creature with sufficient power. Naturalize effects cost 1–2 CMC for targeted artifact/enchantment destruction.
- **Balance Notes:** Fight is inherently fair because it requires board presence and risks Green's own creature. Unconditional creature removal (destroy target creature) is NOT Green—Green must use its creatures as weapons. Artifact/enchantment destruction is Green's primary interaction axis and should remain efficient (1–2 CMC, instant speed).
- **Example Pseudocode:** `{1G} Instant — Target creature you control fights target creature you don't control. If the creature you control survives, put a +1/+1 counter on it.`

---

## Cross-Color Archetype Templates

### XC1: Allied Pair Synergy — Collective Intelligence (White-Blue)

- **Intent:** Combine White's structural fairness with Blue's informational control to create technocratic governance.
- **Trigger:** Symmetrical effects that Blue can exploit asymmetrically through knowledge advantage.
- **Cost Pattern:** Medium (3–5 CMC); requires both colors; generates value through rule-setting combined with card selection.
- **Example Pseudocode:** `{1WU} Enchantment — Each player may only cast one spell each turn. At the beginning of your end step, scry 2.`

### XC2: Enemy Pair Tension — Calculated Passion (Blue-Red)

- **Intent:** Merge Blue's analysis with Red's impulsivity into experimental innovation—rapid iteration guided by curiosity.
- **Trigger:** Casting instants and sorceries at high velocity; spell-slinging payoffs.
- **Cost Pattern:** Low per-spell investment; rewards volume of spells cast per turn.
- **Example Pseudocode:** `{1UR} Creature 1/3 Prowess — Whenever you cast your second instant or sorcery each turn, exile the top card of your library. You may cast it until end of turn.`

### XC3: Predator-Prey Cycle (Black-Green)

- **Intent:** Merge Black's death-exploitation with Green's life cycles into a self-sustaining ecosystem where death feeds growth.
- **Trigger:** Creatures dying; graveyard count thresholds; sacrifice-into-growth loops.
- **Cost Pattern:** Medium (3–5 CMC); requires creatures dying to function. Rewards patient setup of sacrifice-recursion loops.
- **Example Pseudocode:** `{2BG} Enchantment — Whenever a creature you control dies, you may pay 1 life. If you do, put a +1/+1 counter on target creature you control and draw a card.`

### XC4: Righteous Fury (Red-White)

- **Intent:** Channel Red's passion through White's moral conviction into aggressive justice.
- **Trigger:** Attacking with multiple small creatures; combat-oriented aggression with protective backup.
- **Cost Pattern:** Low CMC creatures (1–3) with combat-relevant abilities; rewards going wide with aggressive intent.
- **Example Pseudocode:** `{RW} Creature 2/1 Haste — When ~ attacks, other attacking creatures you control get +1/+0 and gain lifelink until end of turn.`

---

## Rarity and Power Mapping

Derived from the metaphysical weight framework:

| Rarity | Metaphysical Weight | Design Guideline |
|--------|-------------------|-----------------|
| Common | Single-pillar expression | One mechanical signature at baseline efficiency. Token generator, simple burn, basic ramp. |
| Uncommon | Pillar + minor synergy | One pillar with a conditional bonus or cross-pillar interaction. Conditional draw, fight with upside. |
| Rare | Multi-pillar integration | Two or more pillars combined into a cohesive design. Tax + token generation; burn + impulse draw. |
| Mythic Rare | Axiom embodiment | Card embodies the color's core philosophical axiom as a game-state-transforming effect. Symmetrical resets, full library access, board-dominating apex predators. |

---

## Playtesting Signals

| Signal | Indicator | Action |
|--------|-----------|--------|
| Tempo mismatch | Card resolves but has no impact for 2+ turns | Reduce cost or add immediate effect; violates Red's "act now" principle if Red card |
| Identity bleed | Card feels like it belongs in a different color | Verify against strategic pillars; reframe flavor text and trigger conditions |
| Degenerate loop | Sacrifice-recursion creates infinite or near-infinite loops | Add "once per turn" clause or exile clause |
| Format warping | Card trivializes one format while balanced in another | Add scaling clauses ("each opponent" for multiplayer) or format-specific banlists |
| Philosophy violation | Mechanical effect contradicts the color's axiom | Redesign from the axiom up, not from the mechanic down |

---

## Appendix: Source Files

Heuristics extracted from:

| Filename | Contribution |
|----------|-------------|
| metaphysics_wubrg_white.md | White pillars A–D; matrix ratings |
| metaphysics_wubrg_blue.md | Blue pillars A–D; matrix ratings |
| metaphysics_wubrg_black.md | Black pillars A–D; matrix ratings |
| metaphysics_wubrg_red.md | Red pillars A–D; matrix ratings |
| metaphysics_wubrg_green.md | Green pillars A–D; matrix ratings |
| metaphysics_wubrg_ideation.md | Tri-layer structural grid; design methodology |
| 01–05 Primer files | Mechanical examples; philosophical context |
| 06_Color_Pie_Framework_and_Philosophy.md | Cross-color balance theory |
| 08_Ludic_Evolution_and_Commander_Format_Impact.md | Format-specific design constraints |
