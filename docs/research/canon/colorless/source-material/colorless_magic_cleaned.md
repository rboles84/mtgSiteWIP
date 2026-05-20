# Colorless Magic in Magic: The Gathering

## Overview

Colorless in Magic: The Gathering has two distinct meanings:

1. **A type of object**: Cards or spells with no colored mana symbols in their mana costs
2. **A type of mana**: Specifically represented by {C}, distinct from both colored mana and generic mana costs

**Critical Distinction**: Colorless is not a color and does not appear on the color wheel. Colorless ≠ a sixth color, even though it sometimes functions like one in deckbuilding.

---

## Comprehensive Rules & Game Mechanics

### Colorless Objects

**Rule 202.2b**: Objects with no colored mana symbols in their mana costs are colorless.

**Default Status**:
- **Lands**: Having no mana costs, lands are always colorless by default (except cards with color indicators)
- **Artifacts**: The most common colorless spell type
- **Eldrazi creatures**: Made colorless to mark them as alien
- **Colorless Planeswalkers**: Karn and Ugin

**Frame and Set Numbering**:
- Colorless cards that are not artifacts or lands feature a transparent frame, allowing art to run to the border
- In collector numbers, colorless cards appear *before* colored cards
- Artifacts and lands are numbered at the *end* of sets

**Design Philosophy**: Colorless cards have access to effects from all parts of the color pie but at inefficient mana costs. For example, permanent destruction costs a minimum of {7} generic mana.

### Colorless Mana vs. Generic Mana

**The Critical Distinction**:
- **Generic mana** (e.g., {1}, {2}, {3}): A type of *cost* that can be paid with any type of mana
- **Colorless mana** ({C}): A type of *mana* that can only be produced and used as colorless
- A player cannot produce generic mana
- Colorless mana *can* pay for generic costs
- Generic costs *can* be paid with any mana (colored or colorless)

**Rule 107.4c**: The colorless mana symbol {C} represents one colorless mana, and also represents a cost that can be paid *only* with one colorless mana.

**Rule 106.10**: If an effect would add mana represented by a generic mana symbol to a player's mana pool, that much colorless mana is added to that player's mana pool.

### Color Identity in Commander

- Colorless does not contribute to a card's color identity
- Colorless cards can fit into any Commander deck
- If a deck's commander has a colorless color identity (e.g., *Kozilek, the Great Distortion*), the entire deck must be colorless
- **Command Tower** does not work in colorless Commander decks (it asks you to choose a "color")

---

## History of Colorless Mana

### Alpha to Onslaught (1993-2002)

**Original Introduction**: Colorless mana was introduced in *Alpha* with:
- *Basalt Monolith*
- *Mana Vault*
- *Sol Ring*

These cards established that most mana comes in five colors, but there is a sixth subset of mana that is not any color.

**Original Templating**: Early sets spelled out "Add 2 colorless mana to your mana pool."

### Onslaught Through Oath of the Gatewatch (2002-2016)

**Template Change**: From *Onslaught* onwards, templating changed to "Add {2} to your mana pool" to save space.

**The Problem**: This created mechanical ambiguity. The same numerical circle symbol {2} represented:
- Colorless mana *output* (from sources like Sol Ring)
- Generic mana *cost* (on cards requiring any type of mana)

Example: *Unknown Shores* had the same symbol meaning different things in different contexts on the same card.

### Oath of the Gatewatch (2016): The {C} Symbol

**The Solution**: R&D introduced the official colorless mana symbol {C} to isolate colorless mana from generic costs.

**Rule Update**: Required Oracle database updates to over 300 historical cards. Examples:
- *Sol Ring* updated to: "Add {C}{C}"
- All cards that produced colorless mana received errata

**Design Decision**: Changing colorless mana representation was easier than changing generic cost representation, as colorless mana appears far less frequently.

### Wastes: The Colorless Basic Land

**Introduction**: *Oath of the Gatewatch* introduced *Wastes*, a basic land that taps for {C}.

**Key Properties**:
- Possesses no land types
- Cannot be chosen when effects require selecting a basic land type
- Can have any number in Constructed decks
- In Limited formats (Sealed/Draft), players can only include *Wastes* if they opened or drafted them

### Set Availability

**Evergreen vs. Non-Evergreen**:
- Generating colorless mana: **Evergreen** (appears in every set as needed)
- Costs requiring explicit {C}: **Non-Evergreen** (deciduous, used sparingly)

**Sets with {C} Costs**:
- *Oath of the Gatewatch* (2016)
- *Eldrazi Unbound* (*Commander Masters* deck)
- *Modern Horizons 3*

**Abandoned Concept**: During vision design for *The Brothers' War*, R&D explored fifteen draft archetypes with colorless mana as a pseudo-sixth color. The concept was ultimately scrapped.

---

## Keyword Abilities & Mechanics

### Devoid

**Mechanic**: A characteristic-defining keyword ability stating that a card is colorless regardless of the colors in its mana cost.

**Function**: Devoid cards feature colored mana requirements, allowing them to utilize mechanics from their respective color pie alignments while maintaining mechanically colorless status.

**Availability**: All devoid cards are from:
- *Battle for Zendikar* block
- *Modern Horizons 3*

**Design Philosophy**: Devoid solved the problem of needing many Eldrazi cards without flooding the format with colorless cards that fit into every deck. By requiring colored mana but being mechanically colorless, devoid cards remain color-restricted while triggering "colorless matters" effects.

### Support

**Mechanic**: "Support N" means "Put a +1/+1 counter on each of up to N target creatures."

**Restrictions**:
- If a permanent has a support ability, that ability cannot target the permanent itself
- Counters must be distributed among distinct target creatures
- Cannot pile all counters onto a single creature

**Flexibility**: Can be cast with fewer than N targets, or even zero targets if the spell has additional benefits.

### Surge

**Mechanic**: An alternative casting cost available if you or a teammate have already cast another spell during the turn.

**Function**: The surge cost is valid regardless of whether the first spell:
- Resolved
- Was countered
- Is still on the stack

**Benefits**: Can provide mana discounts or trigger additional card effects.

**Restriction**: Can only be paid when casting the spell. Putting the card onto the battlefield without casting it bypasses surge.

### Cohort

**Mechanic**: An alliance-based mechanic requiring two Allies to work together.

**Cost Structure**: Requires tapping:
1. The creature with the cohort ability (must not have summoning sickness)
2. An untapped Ally you control (can be newly cast)

---

## Lore & Philosophical Profiles

### The Dual Faces of Colorlessness

Colorlessness is not a sixth philosophy—it is the fundamental absence of one. While the five colors (WUBRG) represent the spectrum of human emotion, morality, and ideology, colorlessness exists outside that prism.

```
                          [ THE VOID ]
                               │
        ┌──────────────────────┴──────────────────────┐
        ▼                                             ▼
 [ ARTIFICIALITY ]                           [ COSMIC VOID ]
The Machine / Ingenuity                  The Eldrazi / Cosmic Hunger
• Tools of civilization                  • Entities outside reality
• Purpose: Utility & Structure           • Purpose: Consumption & Erasure
• Mechanical: Fast Mana & Engines        • Mechanical: Devoid & Annihilator
```

### The Machine: Artifacts & Construct Colorlessness

**Philosophy**: Pure, unaligned utility—tools, constructs, and automation that can be claimed by any philosophy.

**Core Belief**: The universe is a collection of parts waiting to be assembled. Ideology is a flaw; function dictates form, and everything can be engineered.

**Playstyle**: Fast mana, combo engines, Voltron (equipment-based strategies)

**Emotional Tone**: Amoral, utilitarian, rhythmic, cold

**Key Examples**:
- Mana rocks (*Sol Ring*, *Mana Crypt*)
- Equipment
- Modular/Thopter tokens
- Cost-reduction effects

**Notable Characters**: The Myr of Mirrodin, Assembly-Workers, Constructs

### The Cosmic: Eldrazi & Void Colorlessness

**Philosophy**: Absolute inversion of the color pie. Colors represent life and its internal friction; cosmic colorless represents the vacuum that waits to consume it all.

**Core Belief**: Reality is a temporary aberration. Colors, morals, and histories are friction on a blank canvas that must be wiped clean.

**Playstyle**: Ramp, inversion, oppressive scale. Cast monolithic threats that punish opponents for existing or interacting.

**Emotional Tone**: Lovecraftian, alien, inevitable, utterly indifferent

**Key Mechanics**:
- *Annihilator* (sacrifice permanents when attacking)
- *Ingest* (exile cards from opponent's library)
- Cast triggers (effects happen when cast, not when resolved)
- Exile-based removal

**The Eldrazi Titans**:
- **Ulamog**: The Infinite Gyre / The Ceaseless Hunger - Pure consumption and exile
- **Kozilek**: Butcher of Truth / The Great Distortion - Reality distortion and counter-magic
- **Emrakul**: The Aeons Torn / The Promised End - Taking control of opponents' turns, protection from colored spells

**Lore Context**: The Eldrazi are ancient cosmic horrors native to the Blind Eternities (the void between planes). They travel between planes to devour mana and life energy. Their feeding processes strip magical color from reality, leaving behind barren *Wastes*. They exist outside conventional morality, alignment, or personality, operating on primal necessity to consume.

### Transcendence: Ugin & Karn

**Ugin**: The elder dragon planeswalker who uses colorless spirit magic. His lack of color represents spiritual transcendence beyond the five colors rather than destructive separation from them.

**Karn**: A silver golem planeswalker who embodies a philosophy of absolute cosmic balance.

**The Colorless Philosophy**: Unlike the Eldrazi, these planeswalkers can understand and manipulate colored mana but remain detached from the core emotional biases of the five colors. They represent enlightenment beyond the color wheel.

---

## Notable Cards Requiring {C} Costs

The following cards explicitly require colorless mana ({C}) to cast or activate:

- *Breaker of Creation*
- *Calamity of the Titans*
- *Deceiver of Form*
- *Devourer of Destiny*
- *Echoes of Eternity*
- *Eldrazi Confluence*
- *Eldrazi Linebreaker*
- *Eldrazi Ravager*
- *Eldritch Immunity*
- *Endbringer*
- *Flayer of Loyalties*
- *Glaring Fleshraker*
- *Inversion Behemoth*
- *It That Heralds the End*
- *Kozilek's Command*
- *Kozilek, the Great Distortion*
- *Matter Reshaper*
- *Null Elemental Blast*
- *Reality Smasher*
- *Selective Obliteration*
- *Spatial Contortion*
- *Thief of Existence*
- *Thought-Knot Seer*
- *Walker of the Wastes*
- *Warping Wail*
- *Wastescape Battlemage*
- *Zhulodok, Void Gorger*

---

## Important Card Interactions

### Cards That Cannot Produce {C}

**Treasure Tokens**: Instruct you to choose a "color" of mana. Because colorless is not a color, Treasure tokens cannot produce {C}.

**Command Tower**: Requires choosing a color of mana based on your commander's color identity. Cannot produce {C} for colorless commanders.

**Exotic Orchard**: Produces mana of colors opponents' lands could produce. If an opponent controls *Adarkar Wastes* (taps for {W}, {U}, or {C}), you cannot use *Exotic Orchard* to produce {C} because colorless is not a color.

### Cards That Can Produce {C}

**Reflecting Pool**: Checks for mana *types* rather than colors. Can successfully produce {C} if you control another land capable of generating colorless mana.

### Snow Mana ({S})

**Not a Mana Type**: Snow is a permanent supertype, not a mana type or color.

**Mechanic**: The symbol {S} represents a generic cost that can be paid with any color or colorless mana, provided the source has the "Snow" supertype.

### Protection Interactions

**Protection from Colors**: Does not protect from colorless spells, tokens, or sources.

**Protection from Colorless**: Must be explicitly stated (e.g., *Angelic Intervention*) to mitigate colorless threats.

**Mother of Runes**: Can grant protection from a chosen color, but not protection from colorless.

---

## Competitive Archetypes

### Eldrazi Strategies

**Eldrazi Tron**:
- Utilizes Urza lands (*Urza's Tower*, *Urza's Power Plant*, *Urza's Mine*)
- Accelerates into Eldrazi threats like *Thought-Knot Seer* and *Reality Smasher*
- Uses *Eldrazi Temple* for additional mana

**Eldrazi Stompy**:
- Aggressive colorless deck using *Ancient Tomb*, *City of Traitors*, and *Eldrazi Temple*
- Deploys threats quickly with *Chalice of the Void* disruption

### Artifact-Based Strategies

**Mud (Mono-Brown)**:
- Prison-style deck using artifact mana acceleration
- Locks opponents with *Trinisphere*, *Chalice of the Void*, *Sphere of Resistance*

**KCI (Krark-Clan Ironworks)**:
- Combo deck that sacrifices artifacts for mana
- Chains artifact recursion for explosive turns

**Affinity**:
- Aggro deck with artifact synergies
- Reduces costs via affinity mechanic

---

## Design Philosophy Insights

### From Mark Rosewater: The Devoid Controversy

**The Problem**: Battle for Zendikar needed many Eldrazi cards to establish them as dominant, but creating that many cards with generic costs had serious issues (see Mirrodin block for examples of format-warping colorless cards).

**The Solution**: Use technology from *Ghost Fire* (*Future Sight*)—cards requiring colored mana but mechanically colorless.

**Why Keyword It?**:
1. Allows reminder text to use easier-to-understand vernacular
2. Gives players a name to discuss the subset
3. Distinguishes devoid cards from "true colorless" cards

**The Reality**: Devoid doesn't "do anything" mechanically on its own, but it solved critical design problems:
- Prevents colorless cards from fitting into every deck
- Maintains color pie restrictions via mana costs
- Enables "colorless matters" triggers without format-warping issues

### The Generic vs. Colorless Confusion

**Historical Problem**: From *Onslaught* to *Oath of the Gatewatch*, the same numerical symbol meant:
- Generic cost (can pay with any mana)
- Colorless mana produced (specifically colorless)

**Player Confusion**: Many players believed a card with devoid could be both colorless and red simultaneously.

**The Fix**: Create distinct symbol {C} exclusively for colorless mana, eliminating ambiguity.

---

## UNKNOWN

### Semnia Eubaints Translation Notes

> Semnia Eubaints of the 2D Doujin Fighter Wonderful World (SPOILER: It's actually pretty cruel...) 2 Years prior to the main story has amnesia, and was abducted to be of some kind of Experiment involving Demon Magic, but after the 2 yr. timeskip to such events, she is acting as a weapon for an unknown organization, not being able to have a will of her own, as well as being Sleepy, & Having Lethargic conditions. Hilariously enough, her lethargic mind, her desperation to go home (According to some of her Winquotes), the thought of a Beastkin defeated by her actually made her think the World would end soon, & the fact she can use the Abyss (Not the same as The Abyss from M:tG.), a mysterious Space that kills upon entry, Makes me question Semnia's Alignment for the most part. She's neither Good, or Evil, but based on what is described, she's not Unaligned either, despite fighting as a Weapon, & not an organism...

### Unverified Product Data

> Tezzeret has popped once again as well. Despite being largely aligned with blue and black mana in the past, this time around he's completely colorless... We've just seen spoilers for Edge of Eternities... Standard-legal sets: Teenage Mutant Ninja Turtles has three new colorless generators, Lorwyn Eclipsed has one, and Avatar: The Last Airbender has five...
