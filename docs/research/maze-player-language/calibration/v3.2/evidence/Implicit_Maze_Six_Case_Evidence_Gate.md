# Implicit Maze — Six-Case Scryfall Evidence Gate

**Purpose:** close the six remaining evidence tasks before propagating Calibration V3.1 across the remaining 1,038 lexicon rows.

**Current gate:** do **not** propagate until all six cases below are closed.

## How to use this file

For each case:

1. Run the listed query exactly in live Scryfall.
2. Record the exact query, date, result count, and whether your captured result text is **FULL**, **PARTIAL**, or **TRUNCATED**.
3. Run every named-card membership probe separately.
4. Copy the relevant Scryfall results/card text into a plain text file.
5. Paste that evidence to Claude with the case-specific audit prompt.
6. Record PASS / FAIL / NEEDS REVISION plus the final evidence note.
7. Do **not** infer that a card is excluded merely because it is absent from a partial result capture.

**Membership-probe pattern**

`BASE_QUERY !"Exact Card Name"`

A result proves membership. Zero results on the exact-name probe is usable exclusion evidence.

---

# EV-001 / VM578-041 — One-Sided Board Wipes

## Question

Does the governed one-sided-wipe lens correctly cover the different ownership wordings without confusing whole-board wipes with "save one creature" or tribal survivor effects?

## Query A — historical narrow phrase family

`(o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control" or o:"destroy all creatures except")`

**Record**
- Date:
- Result count:
- Capture: FULL / PARTIAL / TRUNCATED

3 cards where (the text includes “destroy all creatures your opponents control” or the text includes “exile all creatures your opponents control” or the text includes “destroy all creatures except”)

Dread Cacodemon
{7}{B}{B}{B}
Creature — Demon

When this creature enters, if you cast it from your hand, destroy all creatures your opponents control, then tap all other creatures you control.

8/8
Mageta the Lion
{3}{W}{W}
Legendary Creature — Human Spellshaper

{2}{W}{W}, {T}, Discard two cards: Destroy all creatures except for Mageta. Those creatures can’t be regenerated.

3/3
Unstable Glyphbridge
{3}{W}{W}
Artifact

When this artifact enters, if you cast it, for each player, choose a creature with power 2 or less that player controls. Then destroy all creatures except creatures chosen this way.

Craft with artifact {3}{W}{W} ({3}{W}{W}, Exile this artifact, Exile another artifact you control or an artifact card from your graveyard: Return this card transformed under its owner’s control. Craft only as a sorcery.)

Sandswirl Wanderglyph
Artifact Creature — Golem

Flying

Whenever an opponent casts a spell during their turn, they can’t attack you or planeswalkers you control this turn.

Each opponent who attacked you or a planeswalker you control this turn can’t cast spells.

5/3

### Query A membership probes

Run separately:

`(o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control" or o:"destroy all creatures except") !"Plague Wind"`
0 cards found where (the text includes “destroy all creatures your opponents control” or the text includes “exile all creatures your opponents control” or the text includes “destroy all creatures except”) and the name is exactly “plague wind”

`(o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control" or o:"destroy all creatures except") !"In Garruk's Wake"`
0 cards found where (the text includes “destroy all creatures your opponents control” or the text includes “exile all creatures your opponents control” or the text includes “destroy all creatures except”) and the name is exactly “in garruk's wake”

`(o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control" or o:"destroy all creatures except") !"Dread Cacodemon"`
Showing the one card where (the text includes “destroy all creatures your opponents control” or the text includes “exile all creatures your opponents control” or the text includes “destroy all creatures except”) and the name is exactly “dread cacodemon”

Dread Cacodemon (Commander Anthology #55)

Add to Deck
Dread Cacodemon
{7}{B}{B}{B}
Creature — Demon

When this creature enters, if you cast it from your hand, destroy all creatures your opponents control, then tap all other creatures you control.

Those who hear its roar perish. The lucky ones only feel its fetid breath.

Expected evidence hypothesis:
- Plague Wind: excluded from the historical phrase family.
- In Garruk's Wake: excluded from the historical phrase family.
- Dread Cacodemon: likely included through "your opponents control."

## Query B — broadened ownership lens

`(o:"destroy all creatures you don't control" or o:"exile all creatures you don't control" or o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control")`
3 cards where the text includes “destroy all creatures you don't control” or the text includes “exile all creatures you don't control” or the text includes “destroy all creatures your opponents control” or the text includes “exile all creatures your opponents con…

Dread Cacodemon
{7}{B}{B}{B}
Creature — Demon

When this creature enters, if you cast it from your hand, destroy all creatures your opponents control, then tap all other creatures you control.

8/8
In Garruk's Wake
{7}{B}{B}
Sorcery

Destroy all creatures you don’t control and all planeswalkers you don’t control.

Plague Wind
{7}{B}{B}
Sorcery

Destroy all creatures you don’t control. They can’t be regenerated.

### Query B membership probes

`(o:"destroy all creatures you don't control" or o:"exile all creatures you don't control" or o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control") !"Plague Wind"`
Showing the one card where (the text includes “destroy all creatures you don't control” or the text includes “exile all creatures you don't control” or the text includes “destroy all creatures your opponents control” or the text includes “exile all creatures your opponents co…

Plague Wind (Masters 25 #102)

Add to Deck
Plague Wind
{7}{B}{B}
Sorcery

Destroy all creatures you don’t control. They can’t be regenerated.

“The second wind of ascension is Reaver, slaying the unworthy.”
—Keld Triumphant

`(o:"destroy all creatures you don't control" or o:"exile all creatures you don't control" or o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control") !"In Garruk's Wake"`
Showing the one card where (the text includes “destroy all creatures you don't control” or the text includes “exile all creatures you don't control” or the text includes “destroy all creatures your opponents control” or the text includes “exile all creatures your opponents co…

In Garruk's Wake (Commander Legends: Battle for Baldur's Gate #759)

Add to Deck
In Garruk's Wake
{7}{B}{B}
Sorcery

Destroy all creatures you don’t control and all planeswalkers you don’t control.

Beyond pain, beyond obsession and wild despair, there lies a place of twisted power only the most tormented souls can reach.

`(o:"destroy all creatures you don't control" or o:"exile all creatures you don't control" or o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control") !"Dread Cacodemon"`
Showing the one card where (the text includes “destroy all creatures you don't control” or the text includes “exile all creatures you don't control” or the text includes “destroy all creatures your opponents control” or the text includes “exile all creatures your opponents co…

Dread Cacodemon (Commander Anthology #55)

Add to Deck
Dread Cacodemon
{7}{B}{B}{B}
Creature — Demon

When this creature enters, if you cast it from your hand, destroy all creatures your opponents control, then tap all other creatures you control.

Those who hear its roar perish. The lucky ones only feel its fetid breath.

## What to inspect

- Does Query B recover the two `you don't control` cards?
- Does it remain specifically a **whole-board ownership-based wipe** lens?
- Keep "destroy all creatures except..." / chosen-type survivor effects as a separately labeled lens rather than mixing them into the whole-board ownership bucket.

## Pass condition

The historical exclusion is preserved as a wording fact, while the broadened lens demonstrably covers the missing ownership family.

## Claude audit prompt

Review only the supplied Scryfall evidence for VM578-041. Do not infer exclusion from missing cards in a partial capture. Compare Query A and Query B as wording families. For Plague Wind, In Garruk's Wake, and Dread Cacodemon, state whether each exact-name membership probe proves inclusion or exclusion. Then classify the queries into: whole-board ownership wipe, save-one/exception wipe, tribal/chosen-type survivor, or false positive. Return PASS / FAIL / NEEDS REVISION and a one-paragraph evidence note suitable for Calibration V3.2.

**Final status:**  
**Evidence note:**  

---

# EV-002 / VM578-064 — Elf/Druid Creatures That Tap Themselves for Mana

## Question

Can the direct-self-tap lens isolate Elves/Druids whose **own activated ability** begins with `{T}: Add`, excluding creatures that merely grant that ability to something else?

## Base query

`(t:elf or t:druid) t:creature o:/^{T}: Add/`

1 – 60 of 100 cards where (the card types include “elf” or the card types include “druid”) and the card types include “creature” and the text matches the regex /^{t}: add/

A-Canopy Tactician
{3}{G}
Creature — Elf Warrior

Other Elves you control get +1/+1.

{T}: Add {G}{G}{G}.

3/4
Accomplished Alchemist
{3}{G}
Creature — Elf Druid

{T}: Add one mana of any color.

{T}: Add X mana of any one color, where X is the amount of life you gained this turn.

2/5
A-Llanowar Loamspeaker
{1}{G}
Creature — Elf Druid

{T}: Add one mana of any color.

{T}: Target land you control becomes a 4/4 Elemental creature with haste until end of turn. It’s still a land. Activate only as a sorcery.

1/3
Arbor Adherent
{3}{G}
Creature — Dog Druid

{T}: Add one mana of any color.

{T}: Add X mana of any one color, where X is the greatest toughness among other creatures you control.

2/4
Atzocan Seer
{1}{G}{W}
Creature — Human Druid

{T}: Add one mana of any color.

Sacrifice this creature: Return target Dinosaur card from your graveyard to your hand.

2/3
Avid Reclaimer
{2}{G}
Creature — Human Druid

{T}: Add {G} or {U}. If you control a Nissa planeswalker, you gain 2 life.

2/2
Axebane Guardian
{2}{G}
Creature — Human Druid

Defender

{T}: Add X mana in any combination of colors, where X is the number of creatures you control with defender.

0/3
Beastcaller Savant
{1}{G}
Creature — Elf Shaman Ally

Haste

{T}: Add one mana of any color. Spend this mana only to cast a creature spell.

1/1
Boreal Druid
{G}
Snow Creature — Elf Druid

{T}: Add {C}.

1/1
Canopy Tactician
{3}{G}
Creature — Elf Warrior

Other Elves you control get +1/+1.

{T}: Add {G}{G}{G}.

3/3
Centaur Nurturer
{3}{G}
Creature — Centaur Druid

When this creature enters, you gain 3 life.

{T}: Add one mana of any color.

2/4
Circle of Dreams Druid
{G}{G}{G}
Creature — Elf Druid

{T}: Add {G} for each creature you control.

2/1
Deathbloom Gardener
{2}{G}
Creature — Elf Druid

Deathtouch

{T}: Add one mana of any color.

1/1
Deathbloom Ritualist
{3}{B}{G}
Creature — Elf Warlock

{T}: Add X mana of any one color, where X is the number of creature cards in your graveyard.

3/5
Deathcap Cultivator
{1}{G}
Creature — Human Druid

{T}: Add {B} or {G}.

Delirium — This creature has deathtouch as long as there are four or more card types among cards in your graveyard.

2/1
Devoted Druid
{1}{G}
Creature — Elf Druid

{T}: Add {G}.

Put a -1/-1 counter on this creature: Untap this creature.

0/2
Disciple of Freyalise
{3}{G}{G}{G}
Creature — Elf Druid

When this creature enters, you may sacrifice another creature. If you do, you gain X life and draw X cards, where X is that creature’s power.

3/3
Garden of Freyalise
Land

As this land enters, you may pay 3 life. If you don’t, it enters tapped.

{T}: Add {G}.

Drover of the Mighty
{1}{G}
Creature — Human Druid

This creature gets +2/+2 as long as you control a Dinosaur.

{T}: Add one mana of any color.

1/1
Druid of the Anima
{1}{G}
Creature — Elf Druid

{T}: Add {R}, {G}, or {W}.

1/1
Druid of the Cowl
{1}{G}
Creature — Elf Druid

{T}: Add {G}.

1/3
Druid of the Sacred Beaker
{2}{G}
Creature — Deer Bird Ape Druid

{T}: Add {G} for each Crossbreed Labs watermark among permanents you control.

2/2
Drumhunter
{3}{G}
Creature — Human Druid Warrior

At the beginning of your end step, if you control a creature with power 5 or greater, you may draw a card.

{T}: Add {C}.

2/2
Elfhame Druid
{1}{G}
Creature — Elf Druid

{T}: Add {G}.

{T}: Add {G}{G}. Spend this mana only to cast kicked spells.

0/2
Elves of Deep Shadow
{G}
Creature — Elf Druid

{T}: Add {B}. This creature deals 1 damage to you.

1/1
Elvish Aberration
{5}{G}
Creature — Elf Mutant

{T}: Add {G}{G}{G}.

Forestcycling {2} ({2}, Discard this card: Search your library for a Forest card, reveal it, put it into your hand, then shuffle.)

4/5
Elvish Archdruid
{1}{G}{G}
Creature — Elf Druid

Other Elf creatures you control get +1/+1.

{T}: Add {G} for each Elf you control.

2/2
Elvish Harbinger
{2}{G}
Creature — Elf Druid

When this creature enters, you may search your library for an Elf card, reveal it, then shuffle and put that card on top.

{T}: Add one mana of any color.

1/2
Elvish Mystic
{G}
Creature — Elf Druid

{T}: Add {G}.

1/1
Exuberant Firestoker
{2}{R}
Creature — Human Druid Shaman

At the beginning of your end step, if you control a creature with power 5 or greater, you may have this creature deal 2 damage to target player or planeswalker.

{T}: Add {C}.

1/1
Fanatic of Rhonas
{1}{G}
Creature — Snake Druid

{T}: Add {G}.

Ferocious — {T}: Add {G}{G}{G}{G}. Activate only if you control a creature with power 4 or greater.

Eternalize {2}{G}{G} ({2}{G}{G}, Exile this card from your graveyard: Create a token that’s a copy of it, except it’s a 4/4 black Zombie Snake Druid with no mana cost. Eternalize only as a sorcery.)

1/4
Fuel Tank Feaster
{1}{G}
Creature — Ooze Druid

At the beginning of your first main phase, a random creature card with the greatest mana value among creature cards in your hand perpetually gains “This spell costs {1} less to cast.”

{T}: Add one mana of any color.

1/3
Fyndhorn Elder
{2}{G}
Creature — Elf Druid

{T}: Add {G}{G}.

1/1
Fyndhorn Elves
{G}
Creature — Elf Druid

{T}: Add {G}.

1/1
Gilanra, Caller of Wirewood
{2}{G}
Legendary Creature — Elf Druid

{T}: Add {G}. When you spend this mana to cast a spell with mana value 6 or greater, draw a card.

Partner (You can have two commanders if both have partner.)

1/2
Great Forest Druid
{1}{G}
Creature — Treefolk Druid

{T}: Add one mana of any color.

0/4
Greenweaver Druid
{2}{G}
Creature — Elf Druid

{T}: Add {G}{G}.

1/1
Gwenna, Eyes of Gaea
{2}{G}
Legendary Creature — Elf Druid Scout

{T}: Add two mana in any combination of colors. Spend this mana only to cast creature spells or activate abilities of creature sources.

Whenever you cast a creature spell with power 5 or greater, put a +1/+1 counter on Gwenna and untap it.

2/3
Gyre Sage
{1}{G}
Creature — Elf Druid

Evolve (Whenever a creature you control enters, if that creature has greater power or toughness than this creature, put a +1/+1 counter on this creature.)

{T}: Add {G} for each +1/+1 counter on this creature.

1/2
Harabaz Druid
{1}{G}
Creature — Human Druid Ally

{T}: Add X mana of any one color, where X is the number of Allies you control.

0/1
Harvester Druid
{1}{G}
Creature — Human Druid

{T}: Add one mana of any color that a land you control could produce.

1/1
Heart Warden
{1}{G}
Creature — Elf Druid

{T}: Add {G}.

{2}, Sacrifice this creature: Draw a card.

1/1
Helga, Skittish Seer
{G}{W}{U}
Legendary Creature — Frog Druid

Whenever you cast a creature spell with mana value 4 or greater, you draw a card, gain 1 life, and put a +1/+1 counter on Helga.

{T}: Add X mana of any one color, where X is Helga’s power. Spend this mana only to cast creature spells with mana value 4 or greater or creature spells with {X} in their mana costs.

1/3
Hermitic Herbalist
{G}{U}
Creature — Human Druid Ally

{T}: Add one mana of any color.

{T}: Add two mana in any combination of colors. Spend this mana only to cast Lesson spells.

2/3
Humble Naturalist
{1}{G}
Creature — Human Druid

{T}: Add one mana of any color. Spend this mana only to cast a creature spell.

1/3
Incubation Druid
{1}{G}
Creature — Elf Druid

{T}: Add one mana of any type that a land you control could produce. If this creature has a +1/+1 counter on it, add three mana of that type instead.

{3}{G}{G}: Adapt 3. (If this creature has no +1/+1 counters on it, put three +1/+1 counters on it.)

0/2
Intrepid Paleontologist
{1}{G}
Creature — Human Druid

{T}: Add one mana of any color.

{2}: Exile target card from a graveyard.

You may cast Dinosaur creature spells from among cards you own exiled with this creature. If you cast a spell this way, that creature enters with a finality counter on it. (If a creature with a finality counter on it would die, exile it instead.)

2/2
Ixalli's Lorekeeper
{G}
Creature — Human Druid

{T}: Add one mana of any color. Spend this mana only to cast a Dinosaur spell or activate an ability of a Dinosaur source.

1/1
Jasmine Boreal of the Seven
{1}{G}{W}
Legendary Creature — Human Druid

{T}: Add {G}{W}. Spend this mana only to cast creature spells with no abilities.

Creatures you control with no abilities can’t be blocked by creatures with abilities.

2/4
Joraga Treespeaker
{G}
Creature — Elf Druid

Level up {1}{G} ({1}{G}: Put a level counter on this. Level up only as a sorcery.)

LEVEL 1-4

1/2

{T}: Add {G}{G}.

LEVEL 5+

1/4

Elves you control have “{T}: Add {G}{G}.”

1/1
Karametra's Acolyte
{3}{G}
Creature — Human Druid

{T}: Add an amount of {G} equal to your devotion to green. (Each {G} in the mana costs of permanents you control counts toward your devotion to green.)

1/4
Leaf Gilder
{1}{G}
Creature — Elf Druid

{T}: Add {G}.

2/1
Leafkin Avenger
{2}{R}{G}
Creature — Elemental Druid

{T}: Add {G} for each creature with power 4 or greater you control.

{7}{R}: This creature deals damage equal to its power to target player or planeswalker.

4/3
Leafkin Druid
{1}{G}
Creature — Elemental Druid

{T}: Add {G}. If you control four or more creatures, add {G}{G} instead.

0/3
Lifespring Druid
{2}{G}
Creature — Elf Druid

{T}: Add one mana of any color.

2/1
Llanowar Dead
{B}{G}
Creature — Zombie Elf

{T}: Add {B}.

2/2
Llanowar Elves
{G}
Creature — Elf Druid

{T}: Add {G}.

1/1
Llanowar Loamspeaker
{1}{G}
Creature — Elf Druid

{T}: Add one mana of any color.

{T}: Target land you control becomes a 3/3 Elemental creature with haste until end of turn. It’s still a land. Activate only as a sorcery.

1/3
Llanowar Tribe
{G}{G}{G}
Creature — Elf Druid

{T}: Add {G}{G}{G}.

3/3
Llanowar Visionary
{2}{G}
Creature — Elf Druid

When this creature enters, draw a card.

{T}: Add {G}.

2/2
Lys Alana Dignitary
{1}{G}
Creature — Elf Advisor

As an additional cost to cast this spell, behold an Elf or pay {2}. (To behold an Elf, choose an Elf you control or reveal an Elf card from your hand.)

{T}: Add {G}{G}. Activate only if there is an Elf card in your graveyard.

2/3

61 – 100 of 100 cards where (the card types include “elf” or the card types include “druid”) and the card types include “creature” and the text matches the regex /^{t}: add/

Marwyn, the Nurturer
{2}{G}
Legendary Creature — Elf Druid

Whenever another Elf you control enters, put a +1/+1 counter on Marwyn.

{T}: Add an amount of {G} equal to Marwyn’s power.

1/1
Naga Vitalist
{1}{G}
Creature — Snake Druid

{T}: Add one mana of any type that a land you control could produce.

1/2
Nantuko Elder
{2}{G}
Creature — Insect Druid

{T}: Add {C}{G}.

1/2
Noble Hierarch
{G}
Creature — Human Druid

Exalted (Whenever a creature you control attacks alone, that creature gets +1/+1 until end of turn.)

{T}: Add {G}, {W}, or {U}.

0/1
Oasis Ritualist
{3}{G}
Creature — Snake Druid

{T}: Add one mana of any color.

{T}, Exert this creature: Add two mana of any one color. (An exerted creature won’t untap during your next untap step.)

2/4
Orochi Merge-Keeper
{1}{G}
Creature — Snake Druid

{T}: Add {G}.

As long as this creature is modified, it has “{T}: Add {G}{G}.” (Equipment, Auras you control, and counters are modifications.)

1/1
Overgrown Zealot
{1}{G}
Creature — Elf Druid

{T}: Add one mana of any color.

{T}: Add two mana of any one color. Spend this mana only to turn permanents face up.

0/4
Paradise Druid
{1}{G}
Creature — Elf Druid

This creature has hexproof as long as it’s untapped. (It can’t be the target of spells or abilities your opponents control.)

{T}: Add one mana of any color.

2/1
Priest of Titania
{1}{G}
Creature — Elf Druid

{T}: Add {G} for each Elf on the battlefield.

1/1
Quirion Elves
{1}{G}
Creature — Elf Druid

As this creature enters, choose a color.

{T}: Add {G}.

{T}: Add one mana of the chosen color.

1/1
Quirion Explorer
{1}{G}
Creature — Elf Druid Scout

{T}: Add one mana of any color that a land an opponent controls could produce.

1/1
Radha, Heir to Keld
{R}{G}
Legendary Creature — Elf Warrior

Whenever Radha attacks, you may add {R}{R}.

{T}: Add {G}.

2/2
Rainveil Rejuvenator
{3}{G}
Creature — Elephant Druid

When this creature enters, you may mill three cards. (You may put the top three cards of your library into your graveyard.)

{T}: Add an amount of {G} equal to this creature’s power.

2/4
Reclusive Taxidermist
{1}{G}
Creature — Human Druid

This creature gets +3/+2 as long as there are four or more creature cards in your graveyard.

{T}: Add one mana of any color.

1/2
Rift Sower
{2}{G}
Creature — Elf Druid

{T}: Add one mana of any color.

Suspend 2—{G} (Rather than cast this card from your hand, you may pay {G} and exile it with two time counters on it. At the beginning of your upkeep, remove a time counter. When the last is removed, you may cast it without paying its mana cost. It has haste.)

1/3
Rofellos, Llanowar Emissary
{G}{G}
Legendary Creature — Elf Druid

{T}: Add {G} for each Forest you control.

2/1
Rosethorn Acolyte
{2}{G}
Creature — Elf Druid

{T}: Add one mana of any color.

2/3
Seasonal Ritual
{G}
Sorcery — Adventure

Add one mana of any color. (Then exile this card. You may cast the creature later from exile.)

Sage of the Maze
{2}{G}
Creature — Elf Wizard

{T}: Add two mana in any combination of colors.

{T}: Until end of turn, target land you control becomes an X/X Citizen creature with haste in addition to its other types, where X is twice the number of Gates you control. Activate only as a sorcery.

Tap an untapped Gate you control: Untap this creature.

1/3
Scaled Nurturer
{1}{G}
Creature — Dragon Druid

{T}: Add {G}. When you spend this mana to cast a Dragon creature spell, you gain 2 life.

0/2
Silhana Starfletcher
{2}{G}
Creature — Elf Druid Archer

Reach (This creature can block creatures with flying.)

As this creature enters, choose a color.

{T}: Add one mana of the chosen color.

1/3
Skull Prophet
{B}{G}
Creature — Human Druid

{T}: Add {B} or {G}.

{T}: Mill two cards. (Put the top two cards of your library into your graveyard.)

3/1
Skyshroud Elf
{1}{G}
Creature — Elf Druid

{T}: Add {G}.

{1}: Add {R} or {W}.

1/1
Skyshroud Troopers
{3}{G}
Creature — Elf Druid Warrior

{T}: Add {G}.

3/3
Sole Performer
{2}{G}{G}
Creature — Elf Performer

{T}: Add {T}{T}. Activate only once each turn. (While activating an ability, use {T} rather than tapping the permanent to pay for {T}.)

2/2
Somberwald Sage
{2}{G}
Creature — Human Druid

{T}: Add three mana of any one color. Spend this mana only to cast creature spells.

0/1
Steward of Valeron
{G}{W}
Creature — Human Druid Knight

Vigilance

{T}: Add {G}.

2/2
Sunseed Nurturer
{2}{W}
Creature — Human Druid Wizard

At the beginning of your end step, if you control a creature with power 5 or greater, you may gain 2 life.

{T}: Add {C}.

1/1
Sylvok Explorer
{1}{G}
Creature — Human Druid

{T}: Add one mana of any color that a land an opponent controls could produce.

1/1
Tender Wildguide
{1}{G}
Creature — Possum Druid

Offspring {2} (You may pay an additional {2} as you cast this spell. If you do, when this creature enters, create a 1/1 token copy of it.)

{T}: Add one mana of any color.

{T}: Put a +1/+1 counter on this creature.

2/2
Three Tree Rootweaver
{1}{G}
Creature — Mole Druid

{T}: Add one mana of any color.

1/3
Topiary Lecturer
{2}{G}
Creature — Elf Druid

Increment (Whenever you cast a spell, if the amount of mana you spent is greater than this creature’s power or toughness, put a +1/+1 counter on this creature.)

{T}: Add an amount of {G} equal to this creature’s power.

1/2
Urborg Elf
{1}{G}
Creature — Elf Druid

{T}: Add {B}, {G}, or {U}.

1/1
Viridian Joiner
{2}{G}
Creature — Elf Druid

{T}: Add an amount of {G} equal to this creature’s power.

1/2
Weaver of Currents
{1}{G}{U}
Creature — Snake Druid

{T}: Add {C}{C}.

2/2
Werebear
{1}{G}
Creature — Human Bear Druid

{T}: Add {G}.

Threshold — This creature gets +3/+3 as long as there are seven or more cards in your graveyard.

1/1
Wirewood Channeler
{3}{G}
Creature — Elf Druid

{T}: Add X mana of any one color, where X is the number of Elves on the battlefield.

2/2
Wirewood Elf
{1}{G}
Creature — Elf Druid

{T}: Add {G}.

1/2
Woodland Mystic
{1}{G}
Creature — Elf Druid

{T}: Add {G}.

1/1
Woodland Weavemaster
{1}{G}
Creature — Elf Druid

Vigilance

Whenever another Elf you control enters, this creature gets +1/+1 until end of turn.

{T}: Add X mana of any one color, where X is this creature’s power. Spend this mana only to cast Elf spells and activate abilities of Elf sources.

1/2
Zhur-Taa Druid
{R}{G}
Creature — Human Druid

{T}: Add {G}.

Whenever you tap this creature for mana, it deals 1 damage to each opponent.

1/1

**Record**
- Date:
- Result count:
- Capture: FULL / PARTIAL / TRUNCATED

## Membership probes

Positive:

`(t:elf or t:druid) t:creature o:/^{T}: Add/ !"Llanowar Elves"`
Showing the one card where (the card types include “elf” or the card types include “druid”) and the card types include “creature” and the text matches the regex /^{t}: add/ and the name is exactly “llanowar elves”

Llanowar Elves (Foundations #227)

Add to Deck
Llanowar Elves
{G}
Creature — Elf Druid

{T}: Add {G}.

The elves of the Llanowar forest have defended it for generations. It is their sacred duty to keep outside influences from corrupting their ancestral home.

1/1

Negative/control:

`(t:elf or t:druid) t:creature o:/^{T}: Add/ !"Joiner Adept"`
0 cards found where (the card types include “elf” or the card types include “druid”) and the card types include “creature” and the text matches the regex /^{t}: add/ and the name is exactly “joiner adept”

`(t:elf or t:druid) t:creature o:/^{T}: Add/ !"Citanul Hierophants"`
0 cards found where (the card types include “elf” or the card types include “druid”) and the card types include “creature” and the text matches the regex /^{t}: add/ and the name is exactly “citanul hierophants”

`(t:elf or t:druid) t:creature o:/^{T}: Add/ !"Arbor Elf"`
0 cards found where (the card types include “elf” or the card types include “druid”) and the card types include “creature” and the text matches the regex /^{t}: add/ and the name is exactly “arbor elf”

## What to inspect

- Llanowar Elves should demonstrate a real self-tap producer.
- Joiner Adept grants mana abilities to lands rather than tapping itself for mana.
- Citanul Hierophants grants a mana ability to creatures rather than using that ability itself.
- Arbor Elf untaps a Forest rather than containing an `Add` ability.

## Pass condition

The positive probe succeeds and the three grantor/indirect controls fail.

## Claude audit prompt

Audit VM578-064 using only the supplied Scryfall result and exact-name probes. Determine whether `o:/^{T}: Add/` is a safe direct-self-tap subset for Elf/Druid creatures. Explicitly distinguish self-production, granted production, and land-untap acceleration. Return PASS / FAIL / NEEDS REVISION and a concise V3.2 evidence note. Do not broaden the definition of "tap for mana" merely to recover thematically similar cards.

**Final status:**  
**Evidence note:**  

---

# EV-003 / VM578-075 — Esper Board-Wipe Tagger vs Oracle Coverage

## Question

Should `otag:board-wipe` become the primary semantic lens for "board wipes," or should it remain a broadened/discovery lens alongside an explainable Oracle floor?

## Query A — Oracle floor

`id<=wub (o:"destroy all creatures" or o:"exile all creatures" or o:"each creature gets -" or o:"damage to each creature" or o:"sacrifice all")`
1 – 60 of 141 cards where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”)

Abu Ja'far
{W}
Creature — Human

When this creature dies, destroy all creatures blocking or blocked by it. They can’t be regenerated.

0/1
Aligned Hedron Network
{4}
Artifact

When this artifact enters, exile all creatures with power 5 or greater until this artifact leaves the battlefield. (Those creatures return under their owners’ control.)

Austere Command
{4}{W}{W}
Sorcery

Choose two —

• Destroy all artifacts.

• Destroy all enchantments.

• Destroy all creatures with mana value 3 or less.

• Destroy all creatures with mana value 4 or greater.

Avenge
{4}{W}{W}
Sorcery

This spell costs {2} less to cast if a player attacked you during their last turn.

Destroy all creatures. You gain 1 life for each creature destroyed this way.

Baki's Curse
{2}{U}{U}
Sorcery

Baki’s Curse deals 2 damage to each creature for each Aura attached to that creature.

Beyond the Quiet
{3}{W}{W}
Sorcery

Exile all creatures and Spacecraft.

Bloodletter
{2}{B}
Creature — Zombie

When the names of three or more nonland permanents begin with the same letter, sacrifice this creature. If you do, it deals 2 damage to each creature and each player.

2/3
Blood Money
{5}{B}{B}
Sorcery

Destroy all creatures. For each nontoken creature destroyed this way, you create a tapped Treasure token.

Blood on the Snow
{4}{B}{B}
Snow Sorcery

Choose one —

• Destroy all creatures.

• Destroy all planeswalkers.

Then return a creature or planeswalker card with mana value X or less from your graveyard to the battlefield, where X is the amount of {S} spent to cast this spell. ({S} is mana from a snow source.)

Bontu's Last Reckoning
{1}{B}{B}
Sorcery

Destroy all creatures. Lands you control don’t untap during your next untap step.

Cathedral Membrane
{1}{W/P}
Artifact Creature — Phyrexian Wall

({W/P} can be paid with either {W} or 2 life.)

Defender

When this creature dies during combat, it deals 6 damage to each creature it blocked this combat.

0/3
Ceaseless Conflict
{3}{W}{W}
Sorcery

Destroy all creatures. Then create a 3/2 red and white Spirit creature token for each nontoken creature you controlled that was destroyed this way.

Citywide Bust
{1}{W}{W}
Sorcery

Destroy all creatures with toughness 4 or greater.

Cleansing Nova
{3}{W}{W}
Sorcery

Choose one —

• Destroy all creatures.

• Destroy all artifacts and enchantments.

Crypt Rats
{2}{B}
Creature — Rat

{X}: This creature deals X damage to each creature and each player. Spend only black mana on X.

1/1
Dakmor Plague
{3}{B}{B}
Sorcery

Dakmor Plague deals 3 damage to each creature and each player.

Damnation
{2}{B}{B}
Sorcery

Destroy all creatures. They can’t be regenerated.

Damning Verdict
{3}{W}{W}
Sorcery

Destroy all creatures with no counters on them.

Day of Judgment
{2}{W}{W}
Sorcery

Destroy all creatures.

Day of the Dragons
{4}{U}{U}{U}
Enchantment

When this enchantment enters, exile all creatures you control. Then create that many 5/5 red Dragon creature tokens with flying.

When this enchantment leaves the battlefield, sacrifice all Dragons you control. Then return the exiled cards to the battlefield under your control.

Deadly Cover-Up
{3}{B}{B}
Sorcery

As an additional cost to cast this spell, you may collect evidence 6.

Destroy all creatures. If evidence was collected, exile a card from an opponent’s graveyard. Then search its owner’s graveyard, hand, and library for any number of cards with that name and exile them. That player shuffles, then draws a card for each card exiled from their hand this way.

Deadly Tempest
{4}{B}{B}
Sorcery

Destroy all creatures. Each player loses life equal to the number of creatures they controlled that were destroyed this way.

Death Pit Offering
{2}{B}{B}
Enchantment

When this enchantment enters, sacrifice all creatures you control.

Creatures you control get +2/+2.

Decree of Pain
{6}{B}{B}
Sorcery

Destroy all creatures. They can’t be regenerated. Draw a card for each creature destroyed this way.

Cycling {3}{B}{B} ({3}{B}{B}, Discard this card: Draw a card.)

When you cycle this card, all creatures get -2/-2 until end of turn.

Depopulate
{2}{W}{W}
Sorcery

Each player who controls a multicolored creature draws a card. Then destroy all creatures.

Descend upon the Sinful
{4}{W}{W}
Sorcery

Exile all creatures.

Delirium — Create a 4/4 white Angel creature token with flying if there are four or more card types among cards in your graveyard.

Doomskar
{3}{W}{W}
Sorcery

Destroy all creatures.

Foretell {1}{W}{W} (During your turn, you may pay {2} and exile this card from your hand face down. Cast it on a later turn for its foretell cost.)

Do or Die
{1}{B}
Sorcery

Separate all creatures target player controls into two piles. Destroy all creatures in the pile of that player’s choice. They can’t be regenerated.

Drag to the Bottom
{2}{B}{B}
Sorcery

Domain — Each creature gets -X/-X until end of turn, where X is 1 plus the number of basic land types among lands you control.

Dread Cacodemon
{7}{B}{B}{B}
Creature — Demon

When this creature enters, if you cast it from your hand, destroy all creatures your opponents control, then tap all other creatures you control.

8/8
Dry Spell
{1}{B}
Sorcery

Dry Spell deals 1 damage to each creature and each player.

Dusk
{2}{W}{W}
Sorcery

Destroy all creatures with power 3 or greater.

Dawn
{3}{W}{W}
Sorcery

Aftermath (Cast this spell only from your graveyard. Then exile it.)

Return all creature cards with power 2 or less from your graveyard to your hand.

Elspeth, Sun's Champion
{4}{W}{W}
Legendary Planeswalker — Elspeth

+1: Create three 1/1 white Soldier creature tokens.

−3: Destroy all creatures with power 4 or greater.

−7: You get an emblem with “Creatures you control get +2/+2 and have flying.”

Loyalty: 4
Emrakul, the World Anew
{12}
Legendary Creature — Eldrazi

When you cast this spell, gain control of all creatures target player controls.

Flying, protection from spells and from permanents that were cast this turn

When Emrakul leaves the battlefield, sacrifice all creatures you control.

Madness—Pay six {C}.

12/12
Endemic Plague
{3}{B}
Sorcery

As an additional cost to cast this spell, sacrifice a creature.

Destroy all creatures that share a creature type with the sacrificed creature. They can’t be regenerated.

End Hostilities
{3}{W}{W}
Sorcery

Destroy all creatures and all permanents attached to creatures.

Essence Pulse
{3}{B}
Sorcery

You gain 2 life. Each creature gets -X/-X until end of turn, where X is the amount of life you gained this turn.

Everything Comes to Dust
{7}{W}{W}{W}
Sorcery

Convoke (Your creatures can help cast this spell. Each creature you tap while casting this spell pays for {1} or one mana of that creature’s color.)

Exile all creatures except those that share a creature type with a creature that convoked this spell, all artifacts, and all enchantments.

Evincar's Justice
{2}{B}{B}
Sorcery

Buyback {3} (You may pay an additional {3} as you cast this spell. If you do, put this card into your hand as it resolves.)

Evincar’s Justice deals 2 damage to each creature and each player.

Expel the Interlopers
{3}{W}{W}
Sorcery

Choose a number between 0 and 10. Destroy all creatures with power greater than or equal to the chosen number.

Extinction
{4}{B}
Sorcery

Destroy all creatures of the creature type of your choice.

Extinguisher Battleship
{8}
Artifact — Spacecraft

When this Spacecraft enters, destroy target noncreature permanent. Then this Spacecraft deals 4 damage to each creature.

Station (Tap another creature you control: Put charge counters equal to its power on this Spacecraft. Station only as a sorcery. It’s an artifact creature at 5+.)

5+ | Flying, trample

10/10
False Prophet
{2}{W}{W}
Creature — Human Cleric

When this creature dies, exile all creatures.

2/2
Famine
{3}{B}{B}
Sorcery

Famine deals 3 damage to each creature and each player.

Farewell
{4}{W}{W}
Sorcery

Choose one or more —

• Exile all artifacts.

• Exile all creatures.

• Exile all enchantments.

• Exile all graveyards.

Fated Clash
{3}{W}{W}
Sorcery

You may cast this spell as though it had flash if a creature is attacking and a creature is blocking.

Target creature you control and target creature an opponent controls each gain indestructible until end of turn. Then destroy all creatures.

Fated Retribution
{4}{W}{W}{W}
Instant

Destroy all creatures and planeswalkers. If it’s your turn, scry 2.

Fell the Mighty
{4}{W}
Sorcery

Destroy all creatures with power greater than target creature’s power.

Festering Evil
{3}{B}{B}
Enchantment

At the beginning of your upkeep, this enchantment deals 1 damage to each creature and each player.

{B}{B}, Sacrifice this enchantment: It deals 3 damage to each creature and each player.

Final Act
{4}{B}{B}
Sorcery

Choose one or more —

• Destroy all creatures.

• Destroy all planeswalkers.

• Destroy all battles.

• Exile all graveyards.

• Each opponent loses all counters.

Final Judgment
{4}{W}{W}
Sorcery

Exile all creatures.

Final Showdown
{W}
Instant

Spree (Choose one or more additional costs.)

+ {1} — All creatures lose all abilities until end of turn.

+ {1} — Choose a creature you control. It gains indestructible until end of turn.

+ {3}{W}{W} — Destroy all creatures.

Forced March
{X}{B}{B}{B}
Sorcery

Destroy all creatures with mana value X or less.

Force of Despair
{1}{B}{B}
Instant

If it’s not your turn, you may exile a black card from your hand rather than pay this spell’s mana cost.

Destroy all creatures that entered this turn.

Free-for-All
{3}{U}
Enchantment

When this enchantment enters, exile all creatures face down.

At the beginning of each player’s upkeep, that player chooses a card exiled with this enchantment at random and puts it onto the battlefield.

When this enchantment leaves the battlefield, put all cards exiled with it into their owners’ graveyards.

Fumigate
{3}{W}{W}
Sorcery

Destroy all creatures. You gain 1 life for each creature destroyed this way.

Game Over
{3}{B}{B}
Sorcery

This spell costs {2} less to cast if a player’s life total is less than or equal to half their starting life total.

Destroy all creatures.

Gangrenous Zombies
{1}{B}{B}
Creature — Zombie

{T}, Sacrifice this creature: This creature deals 1 damage to each creature and each player. If you control a snow Swamp, this creature deals 2 damage to each creature and each player instead.

2/2
Glyph of Doom
{B}
Instant

Choose target Wall creature. At this turn’s next end of combat, destroy all creatures that were blocked by that creature this turn.

Harsh Mercy
{2}{W}
Sorcery

Each player chooses a creature type. Destroy all creatures that aren’t of a type chosen this way. They can’t be regenerated.

61 – 120 of 141 cards where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”)

Heartless Conscription
{6}{B}{B}
Sorcery

Exile all creatures. For each card exiled this way, you may play that card for as long as it remains exiled, and mana of any type can be spent to cast that spell. Exile Heartless Conscription.

Hellcarver Demon
{3}{B}{B}{B}
Creature — Demon

Flying

Whenever this creature deals combat damage to a player, sacrifice all other permanents you control and discard your hand. Exile the top six cards of your library. You may cast any number of spells from among cards exiled this way without paying their mana costs.

6/6
Infected Vermin
{2}{B}
Creature — Rat

{2}{B}: This creature deals 1 damage to each creature and each player.

Threshold — {3}{B}: This creature deals 3 damage to each creature and each player. Activate only if there are seven or more cards in your graveyard.

1/1
In Garruk's Wake
{7}{B}{B}
Sorcery

Destroy all creatures you don’t control and all planeswalkers you don’t control.

Kaervek's Spite
{B}{B}{B}
Instant

As an additional cost to cast this spell, sacrifice all permanents you control and discard your hand.

Target player loses 5 life.

Kaya's Wrath
{W}{W}{B}{B}
Sorcery

Destroy all creatures. You gain life equal to the number of creatures you controlled that were destroyed this way.

Kindred Dominance
{5}{B}{B}
Sorcery

Choose a creature type. Destroy all creatures that aren’t of the chosen type.

Kirtar's Wrath
{4}{W}{W}
Sorcery

Destroy all creatures. They can’t be regenerated.

Threshold — If there are seven or more cards in your graveyard, instead destroy all creatures, then create two 1/1 white Spirit creature tokens with flying. Creatures destroyed this way can’t be regenerated.

Knife and Death
{2}{B}{B}
Sorcery

Just a second (As long as this spell is on the stack, players can’t move permanents.)

One at a time, throw ten cards you own from outside the game onto the playing area from a distance of at least three feet (about one meter). For each of those cards, Knife and Death deals 1 damage to each creature or planeswalker you don’t control that card is touching. You gain life equal to the damage dealt this way.

Last Laugh
{2}{B}{B}
Enchantment

Whenever a permanent other than this enchantment is put into a graveyard from the battlefield, this enchantment deals 1 damage to each creature and each player.

When no creatures are on the battlefield, sacrifice this enchantment.

Life's Finale
{4}{B}{B}
Sorcery

Destroy all creatures, then search target opponent’s library for up to three creature cards and put them into their graveyard. Then that player shuffles.

Localized Destruction
{3}{W}{W}
Sorcery

You get {E} (an energy counter), then you may pay one or more {E}. If you do, each creature you control with power equal to the amount of {E} paid this way gains indestructible until end of turn.

Destroy all creatures.

Mageta the Lion
{3}{W}{W}
Legendary Creature — Human Spellshaper

{2}{W}{W}, {T}, Discard two cards: Destroy all creatures except for Mageta. Those creatures can’t be regenerated.

3/3
Magister of Worth
{4}{W}{B}
Creature — Angel

Flying

Will of the council — When this creature enters, starting with you, each player votes for grace or condemnation. If grace gets more votes, each player returns each creature card from their graveyard to the battlefield. If condemnation gets more votes or the vote is tied, destroy all creatures other than this creature.

4/4
Mandate of Abaddon
{3}{B}
Sorcery

Choose target creature you control. Destroy all creatures with power less than that creature’s power.

March of Souls
{4}{W}
Sorcery

Destroy all creatures. They can’t be regenerated. For each creature destroyed this way, its controller creates a 1/1 white Spirit creature token with flying.

Mass Polymorph
{5}{U}
Sorcery

Exile all creatures you control, then reveal cards from the top of your library until you reveal that many creature cards. Put all creature cards revealed this way onto the battlefield, then shuffle the rest of the revealed cards into your library.

Merciless Eviction
{4}{W}{B}
Sorcery

Choose one —

• Exile all artifacts.

• Exile all creatures.

• Exile all enchantments.

• Exile all planeswalkers.

Necromantic Selection
{4}{B}{B}{B}
Sorcery

Destroy all creatures, then return a creature card put into a graveyard this way to the battlefield under your control. It’s a black Zombie in addition to its other colors and types. Exile Necromantic Selection.

No Witnesses
{2}{W}{W}
Sorcery

Each player who controls the most creatures investigates. Then destroy all creatures. (To investigate, create a Clue token. It’s an artifact with “{2}, Sacrifice this token: Draw a card.”)

Noxious Field
{1}{B}{B}
Enchantment — Aura

Enchant land

Enchanted land has “{T}: This land deals 1 damage to each creature and each player.”

Overwhelming Forces
{6}{B}{B}
Sorcery

Destroy all creatures target opponent controls. Draw a card for each creature destroyed this way.

Path of Peril
{1}{B}{B}
Sorcery

Cleave {4}{W}{B} (You may cast this spell for its cleave cost. If you do, remove the words in square brackets.)

Destroy all creatures [with mana value 2 or less].

Pestilence
{2}{B}{B}
Enchantment

At the beginning of the end step, if no creatures are on the battlefield, sacrifice this enchantment.

{B}: This enchantment deals 1 damage to each creature and each player.

Pestilence Demon
{5}{B}{B}{B}
Creature — Demon

Flying

{B}: This creature deals 1 damage to each creature and each player.

7/6
Phyrexian Rebirth
{4}{W}{W}
Sorcery

Destroy all creatures, then create an X/X colorless Phyrexian Horror artifact creature token, where X is the number of creatures destroyed this way.

Plague Spitter
{2}{B}
Creature — Phyrexian Horror

At the beginning of your upkeep, this creature deals 1 damage to each creature and each player.

When this creature dies, it deals 1 damage to each creature and each player.

2/2
Plague Wind
{7}{B}{B}
Sorcery

Destroy all creatures you don’t control. They can’t be regenerated.

Planar Collapse
{1}{W}
Enchantment

At the beginning of your upkeep, if there are four or more creatures on the battlefield, sacrifice this enchantment and destroy all creatures. They can’t be regenerated.

Planar Guide
{W}
Creature — Human Cleric

{3}{W}, Exile this creature: Exile all creatures. At the beginning of the next end step, return those cards to the battlefield under their owners’ control.

1/1
Psychotic Haze
{2}{B}{B}
Instant

Psychotic Haze deals 1 damage to each creature and each player.

Madness {1}{B} (If you discard this card, discard it into exile. When you do, cast it for its madness cost or put it into your graveyard.)

Rain of Daggers
{4}{B}{B}
Sorcery

Destroy all creatures target opponent controls. You lose 2 life for each creature destroyed this way.

Rancid Earth
{1}{B}{B}
Sorcery

Destroy target land.

Threshold — If there are seven or more cards in your graveyard, instead destroy that land and Rancid Earth deals 1 damage to each creature and each player.

Restricted Office
{2}{W}{W}
Enchantment — Room

When you unlock this door, destroy all creatures with power 3 or greater.

(You may cast either half. That door unlocks on the battlefield. As a sorcery, you may pay the mana cost of a locked door to unlock it.)

Lecture Hall
{5}{U}{U}
Enchantment — Room

Other permanents you control have hexproof.

(You may cast either half. That door unlocks on the battlefield. As a sorcery, you may pay the mana cost of a locked door to unlock it.)

Retaliate
{2}{W}{W}
Instant

Destroy all creatures that dealt damage to you this turn.

Retribution of the Meek
{2}{W}
Sorcery

Destroy all creatures with power 4 or greater. They can’t be regenerated.

Ritual of Soot
{2}{B}{B}
Sorcery

Destroy all creatures with mana value 3 or less.

Rout
{3}{W}{W}
Sorcery

You may cast this spell as though it had flash if you pay {2} more to cast it. (You may cast it any time you could cast an instant.)

Destroy all creatures. They can’t be regenerated.

Screams of the Damned
{3}{B}{B}
Enchantment

{1}{B}, Exile a card from your graveyard: This enchantment deals 1 damage to each creature and each player.

Shadows' Verdict
{3}{B}{B}
Sorcery

Exile all creatures and planeswalkers with mana value 3 or less from the battlefield and all creature and planeswalker cards with mana value 3 or less from all graveyards.

Shatter the Sky
{2}{W}{W}
Sorcery

Each player who controls a creature with power 4 or greater draws a card. Then destroy all creatures.

Sickening Dreams
{1}{B}
Sorcery

As an additional cost to cast this spell, discard X cards.

Sickening Dreams deals X damage to each creature and each player.

Singularity Rupture
{3}{U}{B}{B}
Sorcery

Destroy all creatures, then any number of target players each mill half their library, rounded down.

Slash the Ranks
{3}{W}{W}
Sorcery

Destroy all creatures and planeswalkers except for commanders.

Solar Tide
{4}{W}{W}
Sorcery

Choose one —

• Destroy all creatures with power 2 or less.

• Destroy all creatures with power 3 or greater.

Entwine—Sacrifice two lands. (Choose both if you pay the entwine cost.)

Space Beleren
{2}{W}{U}
Legendary Planeswalker — Jace

Space sculptor (Space Beleren divides the battlefield into alpha, beta, and gamma sectors. If a creature isn’t assigned to a sector, its controller assigns it to one. Opponents assign first.)

+1: Creatures in each sector can be blocked this turn only by creatures in the same sector.

−1: Put a +1/+1 counter on each creature in the sector of your choice.

−5: Destroy all creatures in the sector of your choice.

Loyalty: 3
Spectacular Pileup
{3}{W}{W}
Sorcery

All creatures and Vehicles lose indestructible until end of turn, then destroy all creatures and Vehicles.

Cycling {2} ({2}, Discard this card: Draw a card.)

Starfall Invocation
{3}{W}{W}
Sorcery

Gift a card (You may promise an opponent a gift as you cast this spell. If you do, they draw a card before its other effects.)

Destroy all creatures. If the gift was promised, return a creature card put into your graveyard this way to the battlefield under your control.

Sublime Exhalation
{6}{W}
Sorcery

Undaunted (This spell costs {1} less to cast for each opponent.)

Destroy all creatures.

Sunfall
{3}{W}{W}
Sorcery

Exile all creatures. Incubate X, where X is the number of creatures exiled this way. (Create an Incubator token with X +1/+1 counters on it and “{2}: Transform this token.” It transforms into a 0/0 Phyrexian artifact creature.)

Sunscour
{5}{W}{W}
Sorcery

You may exile two white cards from your hand rather than pay this spell’s mana cost.

Destroy all creatures.

Supreme Verdict
{1}{W}{W}{U}
Sorcery

This spell can’t be countered.

Destroy all creatures.

Synthetic Destiny
{4}{U}{U}
Instant

Exile all creatures you control. At the beginning of the next end step, reveal cards from the top of your library until you reveal that many creature cards, put all creature cards revealed this way onto the battlefield, then shuffle the rest of the revealed cards into your library.

Tainted Specter
{3}{B}
Creature — Specter

Flying

{1}{B}{B}, {T}: Target player discards a card unless they put a card from their hand on top of their library. If that player discards a card this way, this creature deals 1 damage to each creature and each player. Activate only as a sorcery.

2/2
Tegwyll's Scouring
{4}{B}{B}
Sorcery

You may cast this spell as though it had flash by tapping three untapped creatures you control with flying in addition to paying its other costs.

Destroy all creatures. Create three 1/1 black Faerie Rogue creature tokens with flying.

The Battle of Bywater
{1}{W}{W}
Sorcery

Destroy all creatures with power 3 or greater. Then create a Food token for each creature you control. (It’s an artifact with “{2}, {T}, Sacrifice this token: You gain 3 life.”)

The Meathook Massacre
{X}{B}{B}
Legendary Enchantment

When The Meathook Massacre enters, each creature gets -X/-X until end of turn.

Whenever a creature you control dies, each opponent loses 1 life.

Whenever a creature an opponent controls dies, you gain 1 life.

The Night of the Doctor
{4}{W}{W}
Enchantment — Saga

(As this Saga enters and after your draw step, add a lore counter. Sacrifice after II.)

I — Destroy all creatures.

II — Return target legendary creature card from your graveyard to the battlefield. Put your choice of a first strike, vigilance, or lifelink counter on it.

The Phasing of Zhalfir
{2}{U}{U}
Enchantment — Saga

Read ahead (Choose a chapter and start with that many lore counters. Add one after your draw step. Skipped chapters don’t trigger. Sacrifice after III.)

I, II — Another target nonland permanent phases out. It can’t phase in for as long as you control this Saga.

III — Destroy all creatures. For each creature destroyed this way, its controller creates a 2/2 black Phyrexian creature token.

The Rise of Sozin
{4}{B}{B}
Enchantment — Saga

(As this Saga enters and after your draw step, add a lore counter.)

I — Destroy all creatures.

II — Choose a card name. Search target opponent’s graveyard, hand, and library for up to four cards with that name and exile them. Then that player shuffles.

III — Exile this Saga, then return it to the battlefield transformed under your control.

Fire Lord Sozin
Legendary Creature — Human Noble

Menace, firebending 3 (Whenever this creature attacks, add {R}{R}{R}. This mana lasts until end of combat.)

Whenever Fire Lord Sozin deals combat damage to a player, you may pay {X}. When you do, put any number of target creature cards with total mana value X or less from that player’s graveyard onto the battlefield under your control.

5/5

**Record**
- Result count:
- Capture: FULL / PARTIAL / TRUNCATED

## Query B — Tagger

`id<=wub otag:board-wipe`
1 – 60 of 511 cards where the color identity ≤ BUW and the card is tagged “board-wipe”

Acid Rain
{3}{U}
Sorcery

Destroy all Forests.

Aetherize
{3}{U}
Instant

Return all attacking creatures to their owner’s hand.

Aether Snap
{3}{B}{B}
Sorcery

Remove all counters from all permanents and exile all tokens.

Aetherspouts
{3}{U}{U}
Instant

For each attacking creature, its owner puts it on their choice of the top or bottom of their library.

Aethersquall Ancient
{5}{U}{U}
Creature — Leviathan

Flying

At the beginning of your upkeep, you get {E}{E}{E} (three energy counters).

Pay eight {E}: Return all other creatures to their owners’ hands. Activate only as a sorcery.

6/6
Ajani, Strength of the Pride
{2}{W}{W}
Legendary Planeswalker — Ajani

+1: You gain life equal to the number of creatures you control plus the number of planeswalkers you control.

−2: Create a 2/2 white Cat Soldier creature token named Ajani’s Pridemate with “Whenever you gain life, put a +1/+1 counter on this token.”

0: If you have at least 15 life more than your starting life total, exile Ajani and each artifact and creature your opponents control.

Loyalty: 5
Akroma's Vengeance
{4}{W}{W}
Sorcery

Destroy all artifacts, creatures, and enchantments.

Cycling {3} ({3}, Discard this card: Draw a card.)

Aligned Hedron Network
{4}
Artifact

When this artifact enters, exile all creatures with power 5 or greater until this artifact leaves the battlefield. (Those creatures return under their owners’ control.)

All Is Dust
{7}
Kindred Sorcery — Eldrazi

Each player sacrifices all permanents they control that are one or more colors.

Amalia Benavides Aguirre
{W}{B}
Legendary Creature — Vampire Scout

Ward—Pay 3 life.

Whenever you gain life, Amalia Benavides Aguirre explores. Then destroy all other creatures if its power is exactly 20. (To have this creature explore, reveal the top card of your library. Put that card into your hand if it’s a land. Otherwise, put a +1/+1 counter on this creature, then put the card back or put it into your graveyard.)

2/2
Angel of Glory's Rise
{5}{W}{W}
Creature — Angel

Flying

When this creature enters, exile all Zombies, then return all Human creature cards from your graveyard to the battlefield.

4/6
Angel of the Dire Hour
{5}{W}{W}
Creature — Angel

Flash

Flying

When this creature enters, if you cast it from your hand, exile all attacking creatures.

5/4
Apocalypse Chime
{2}
Artifact

{2}, {T}, Sacrifice this artifact: Destroy all nontoken permanents with a name originally printed in the Homelands expansion. They can’t be regenerated.

Archfiend of Depravity
{3}{B}{B}
Creature — Demon

Flying

At the beginning of each opponent’s end step, that player chooses up to two creatures they control, then sacrifices the rest.

5/4
Archfiend of Ifnir
{3}{B}{B}
Creature — Demon

Flying

Whenever you cycle or discard another card, put a -1/-1 counter on each creature your opponents control.

Cycling {2} ({2}, Discard this card: Draw a card.)

5/4
Archfiend of Sorrows
{5}{B}{B}
Creature — Demon

Flying

When this creature enters, creatures your opponents control get -2/-2 until end of turn.

Unearth {3}{B}{B} ({3}{B}{B}: Return this card from your graveyard to the battlefield. It gains haste. Exile it at the beginning of the next end step or if it would leave the battlefield. Unearth only as a sorcery.)

4/5
Armageddon
{3}{W}
Sorcery

Destroy all lands.

Arms of Hadar
{3}{B}
Sorcery

Creatures target player controls get -2/-2 until end of turn.

Ascendant Evincar
{4}{B}{B}
Legendary Creature — Phyrexian Vampire Noble

Flying (This creature can’t be blocked except by creatures with flying or reach.)

Other black creatures get +1/+1.

Nonblack creatures get -1/-1.

3/3
Austere Command
{4}{W}{W}
Sorcery

Choose two —

• Destroy all artifacts.

• Destroy all enchantments.

• Destroy all creatures with mana value 3 or less.

• Destroy all creatures with mana value 4 or greater.

Avatar's Wrath
{2}{W}{W}
Sorcery

Choose up to one target creature, then airbend all other creatures. (Exile them. While each one is exiled, its owner may cast it for {2} rather than its mana cost.)

Until your next turn, your opponents can’t cast spells from anywhere other than their hands.

Exile Avatar’s Wrath.

Avenge
{4}{W}{W}
Sorcery

This spell costs {2} less to cast if a player attacked you during their last turn.

Destroy all creatures. You gain 1 life for each creature destroyed this way.

Baki's Curse
{2}{U}{U}
Sorcery

Baki’s Curse deals 2 damage to each creature for each Aura attached to that creature.

Balance
{1}{W}
Sorcery

Each player chooses a number of lands they control equal to the number of lands controlled by the player who controls the fewest, then sacrifices the rest. Players discard cards and sacrifice creatures the same way.

Balancing Act
{2}{W}{W}
Sorcery

Each player chooses a number of permanents they control equal to the number of permanents controlled by the player who controls the fewest, then sacrifices the rest. Each player discards cards the same way.

Bane of the Living
{2}{B}{B}
Creature — Insect

Morph {X}{B}{B} (You may cast this card face down as a 2/2 creature for {3}. Turn it face up any time for its morph cost.)

When this creature is turned face up, all creatures get -X/-X until end of turn.

4/3
Beyond the Quiet
{3}{W}{W}
Sorcery

Exile all creatures and Spacecraft.

Bite of the Black Rose
{3}{B}
Sorcery

Will of the council — Starting with you, each player votes for sickness or psychosis. If sickness gets more votes, creatures your opponents control get -2/-2 until end of turn. If psychosis gets more votes or the vote is tied, each opponent discards two cards.

Biting Rain
{2}{B}{B}
Sorcery

All creatures get -2/-2 until end of turn.

Madness {2}{B} (If you discard this card, discard it into exile. When you do, cast it for its madness cost or put it into your graveyard.)

Black Sun's Zenith
{X}{B}{B}
Sorcery

Put X -1/-1 counters on each creature. Shuffle Black Sun’s Zenith into its owner’s library.

Blasphemous Edict
{3}{B}{B}
Sorcery

You may pay {B} rather than pay this spell’s mana cost if there are thirteen or more creatures on the battlefield.

Each player sacrifices thirteen creatures of their choice.

Blast Zone
Land

This land enters with a charge counter on it.

{T}: Add {C}.

{X}{X}, {T}: Put X charge counters on this land.

{3}, {T}, Sacrifice this land: Destroy each nonland permanent with mana value equal to the number of charge counters on this land.

Blight Grenade
{4}{B}
Sorcery

Destroy target creature.

All creatures get -3/-3 until end of turn.

Bloodletter
{2}{B}
Creature — Zombie

When the names of three or more nonland permanents begin with the same letter, sacrifice this creature. If you do, it deals 2 damage to each creature and each player.

2/3
Bloodline Culling
{1}{B}{B}
Instant

Choose one —

• Target creature gets -5/-5 until end of turn.

• Creature tokens get -2/-2 until end of turn.

Blood Money
{5}{B}{B}
Sorcery

Destroy all creatures. For each nontoken creature destroyed this way, you create a tapped Treasure token.

Blood on the Snow
{4}{B}{B}
Snow Sorcery

Choose one —

• Destroy all creatures.

• Destroy all planeswalkers.

Then return a creature or planeswalker card with mana value X or less from your graveyard to the battlefield, where X is the amount of {S} spent to cast this spell. ({S} is mana from a snow source.)

Blot Out the Sky
{X}{W}{B}
Sorcery

Create X tapped 2/1 white and black Inkling creature tokens with flying. If X is 6 or more, destroy all noncreature, nonland permanents.

Bontu's Last Reckoning
{1}{B}{B}
Sorcery

Destroy all creatures. Lands you control don’t untap during your next untap step.

Boompile
{4}
Artifact

{T}: Flip a coin. If you win the flip, destroy all nonland permanents.

Break the Ice
{B}{B}
Sorcery

Destroy target land that is snow or could produce {C}.

Overload {4}{B}{B} (You may cast this spell for its overload cost. If you do, change “target” in its text to “each.”)

Bringer of the Last Gift
{6}{B}{B}
Creature — Vampire Demon

Flying

When this creature enters, if you cast it, each player sacrifices all other creatures they control. Then each player returns all creature cards from their graveyard that weren’t put there this way to the battlefield.

6/6
By Invitation Only
{3}{W}{W}
Sorcery

Choose a number between 0 and 13. Each player sacrifices that many creatures of their choice.

Cacophony Unleashed
{5}{B}{B}
Enchantment

When this enchantment enters, if you cast it, destroy all nonenchantment creatures.

Whenever this enchantment or another enchantment you control enters, until end of turn, this enchantment becomes a legendary 6/6 Nightmare God creature with menace and deathtouch. It’s still an enchantment.

Calamity of the Titans
{4}{C}{C}
Sorcery

As an additional cost to cast this spell, reveal a colorless creature card from your hand.

Exile each creature and planeswalker with mana value less than the revealed card’s mana value.

Carnifex Demon
{4}{B}{B}
Creature — Phyrexian Demon

Flying

This creature enters with two -1/-1 counters on it.

{B}, Remove a -1/-1 counter from this creature: Put a -1/-1 counter on each other creature.

6/6
Cataclysm
{2}{W}{W}
Sorcery

Each player chooses from among the permanents they control an artifact, a creature, an enchantment, and a land, then sacrifices the rest.

Cataclysmic Gearhulk
{3}{W}{W}
Artifact Creature — Construct

Vigilance

When this creature enters, each player chooses an artifact, a creature, an enchantment, and a planeswalker from among the nonland permanents they control, then sacrifices the rest.

4/5
Catastrophe
{4}{W}{W}
Sorcery

Destroy all lands or all creatures. Creatures destroyed this way can’t be regenerated.

Ceaseless Conflict
{3}{W}{W}
Sorcery

Destroy all creatures. Then create a 3/2 red and white Spirit creature token for each nontoken creature you controlled that was destroyed this way.

Celestial Judgment
{4}{W}{W}
Sorcery

For each different power among creatures on the battlefield, choose a creature with that power. Destroy each creature not chosen this way.

Celestial Kirin
{2}{W}{W}
Legendary Creature — Kirin Spirit

Flying

Whenever you cast a Spirit or Arcane spell, destroy all permanents with that spell’s mana value.

3/3
Chaos Orb
{2}
Artifact

{1}, {T}: If this artifact is on the battlefield, flip it onto the battlefield from a height of at least one foot. If this artifact turns over completely at least once during the flip, destroy all nontoken permanents it touches. Then destroy this artifact.

Choice of Damnations
{5}{B}
Sorcery — Arcane

Target opponent chooses a number. You may have that player lose that much life. If you don’t, that player sacrifices all but that many permanents of their choice.

Choking Fumes
{2}{W}
Instant

Put a -1/-1 counter on each attacking creature.

City in a Bottle
{2}
Artifact

Whenever one or more other nontoken permanents with a name originally printed in the Arabian Nights expansion are on the battlefield, their controllers sacrifice them.

Players can’t cast spells or play lands with a name originally printed in the Arabian Nights expansion.

Citywide Bust
{1}{W}{W}
Sorcery

Destroy all creatures with toughness 4 or greater.

Cleanfall
{2}{W}
Sorcery — Arcane

Destroy all enchantments.

Cleansing
{W}{W}{W}
Sorcery

For each land, destroy that land unless any player pays 1 life.

Cleansing Meditation
{1}{W}{W}
Sorcery

Destroy all enchantments.

Threshold — If there are seven or more cards in your graveyard, instead destroy all enchantments, then return all cards in your graveyard destroyed this way to the battlefield.

**Record**
- Result count:
- Capture: FULL / PARTIAL / TRUNCATED

## Membership matrix

Run each card against **both** Query A and Query B.

### Classic destroy/exile controls

`!"Wrath of God"`
Showing the one card where the color identity ≤ BUW and the card is tagged “board-wipe” and the name is exactly “wrath of god”

Wrath of God (Commander Masters #70)

Add to Deck
Wrath of God
{2}{W}{W}
Sorcery

Destroy all creatures. They can’t be regenerated.

Legend speaks of the lost coastal polis of Olantin, whose inhabitants’ hubris enraged the sun god Heliod.
Showing the one card where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

`!"Damnation"`
Showing the one card where the color identity ≤ BUW and the card is tagged “board-wipe” and the name is exactly “damnation”

Damnation (Double Masters 2022 #73)

Add to Deck
Damnation
{2}{B}{B}
Sorcery

Destroy all creatures. They can’t be regenerated.
Showing the one card where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

`!"Supreme Verdict"`
Showing the one card where the color identity ≤ BUW and the card is tagged “board-wipe” and the name is exactly “supreme verdict”

Supreme Verdict (Ravnica: Clue Edition #211)

Add to Deck
Supreme Verdict
{1}{W}{W}{U}
Sorcery

This spell can’t be countered.

Destroy all creatures.

Showing the one card where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

`!"Sunfall"`
Showing the one card where the color identity ≤ BUW and the card is tagged “board-wipe” and the name is exactly “sunfall”

Sunfall (March of the Machine #40)

Add to Deck
Sunfall
{3}{W}{W}
Sorcery

Exile all creatures. Incubate X, where X is the number of creatures exiled this way. (Create an Incubator token with X +1/+1 counters on it and “{2}: Transform this token.” It transforms into a 0/0 Phyrexian artifact creature.)

Showing the one card where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

### Alternate wipe-template controls

`!"Toxic Deluge"`  
Purpose: -X/-X family may not match the current Oracle floor wording.

0 cards found where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…
Showing the one card where the color identity ≤ BUW and the card is tagged “board-wipe” and the name is exactly “toxic deluge”

Toxic Deluge (Marvel Super Heroes Commander #161)

Add to Deck
Toxic Deluge
{2}{B}
Sorcery

As an additional cost to cast this spell, pay X life.

All creatures get -X/-X until end of turn.

0 cards found where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

`!"Terminus"`  
Purpose: bottom-of-library wipe, not destroy/exile.

Showing the one card where the color identity ≤ BUW and the card is tagged “board-wipe” and the name is exactly “terminus”

Terminus (Duskmourn: House of Horror Commander #70)

Add to Deck
Terminus
{4}{W}{W}
Sorcery

Put all creatures on the bottom of their owners’ libraries.

Miracle {W} (You may cast this card for its miracle cost when you draw it if it’s the first card you drew this turn.)

0 cards found where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

`!"Evacuation"`  
Purpose: mass bounce, not destroy/exile.

Showing the one card where the color identity ≤ BUW and the card is tagged “board-wipe” and the name is exactly “evacuation”

Evacuation (The Lost Caverns of Ixalan Commander #156)

Add to Deck
Evacuation
{3}{U}{U}
Instant

Return all creatures to their owners’ hands.

0 cards found where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

`!"Farewell"`  
Purpose: modal exile wipe.

Showing the one card where the color identity ≤ BUW and the card is tagged “board-wipe” and the name is exactly “farewell”

Farewell (Murders at Karlov Manor Commander #64)

Add to Deck
Farewell
{4}{W}{W}
Sorcery

Choose one or more —

• Exile all artifacts.

• Exile all creatures.

• Exile all enchantments.

• Exile all graveyards.

Showing the one card where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

Farewell (Murders at Karlov Manor Commander #64)

Add to Deck
Farewell
{4}{W}{W}
Sorcery

Choose one or more —

• Exile all artifacts.

• Exile all creatures.

• Exile all enchantments.

• Exile all graveyards.

For every card record:

| Card | Oracle A | Tagger B | Current Oracle effect family | Notes |
|---|---|---|---|---|
| Wrath of God | | | | |
| Damnation | | | | |
| Supreme Verdict | | | | |
| Sunfall | | | | |
| Toxic Deluge | | | | |
| Terminus | | | | |
| Evacuation | | | | |
| Farewell | | | | |

## Also inspect

Take a small sample of:
- 10 Tagger-only hits, if any.
- 10 Oracle-only hits, if any.

Classify each as:
- genuine board wipe,
- narrow sweeper,
- one-sided wipe,
- temporary reset,
- false positive,
- unclear.

## Pass / product-decision condition

Close the case with one of:

**A. Tagger primary:** Tagger clearly covers materially more genuine wipe families with acceptable false positives.

**B. Oracle primary + Tagger broaden:** Tagger coverage is useful but noisy/inconsistent.

**C. Multi-lens:** neither alone represents the player concept safely.

## Claude audit prompt

Compare the supplied Esper board-wipe Oracle query and Tagger query. Use the exact-name membership matrix as evidence, not memory. Identify which mechanical wipe families each query captures or misses. Audit the Tagger-only and Oracle-only sample for false positives. Recommend one product mode only: Tagger primary, Oracle primary + Tagger broaden, or Multi-lens. Explain why in terms of Plain Reading behavior and Archscry recommendation quality. Return PASS / FAIL / NEEDS REVISION plus a V3.2 evidence note.

**Final status:**  
**Chosen product mode:**  
**Evidence note:**  

---

# EV-004 / VM578-076 — Green Mana-Dork Decomposition

## Question

What distinct mechanical lenses are required for the player phrase "green mana dorks"?

Do **not** force every accelerant into one query.

## Query A — structured green mana producer

`id<=g t:creature produces:g`

**Record count:**  
1 – 60 of 256 cards where the color identity ≤ G and the card types include “creature” and the mana produced ≥ G

## Query B — direct self-tap Add ability

`id<=g t:creature o:/^{T}: Add/`

**Record count:**  
1 – 60 of 166 cards where the color identity ≤ G and the card types include “creature” and the text matches the regex /^{t}: add/

## Query C — Forest untap accelerants

`id<=g t:creature o:"untap target Forest"`

**Record count:**  
Showing the one card where the color identity ≤ G and the card types include “creature” and the text includes “untap target forest”

Arbor Elf (Masters 25 #160)

Add to Deck
Arbor Elf
{G}
Creature — Elf Druid

{T}: Untap target Forest.

1/1

## Probe matrix

Run each exact card against A, B, and C.

| Card | produces:g | self `{T}: Add` | untap Forest | Intended role |
|---|---|---|---|---|
| Llanowar Elves | | | | direct producer |
| Birds of Paradise | | | | direct/fixing producer |
| Priest of Titania | | | | scaling direct producer |
| Selvala, Heart of the Wilds | | | | scaling/flexible producer |
| Wall of Roots | | | | alternate activation; no tap |
| Arbor Elf | | | | land-untap accelerant |
| Joiner Adept | | | | grants lands ability |
| Citanul Hierophants | | | | grants creatures ability |

## What to inspect

Determine whether the final product taxonomy should contain at least:

1. **Direct mana producers**
2. **Alternative-activation producers** — mana but not `{T}: Add`
3. **Land-untap accelerants**
4. **Ability grantors** — support other permanents producing mana

`produces:` is a structured signal, but this test determines whether it collapses any of those distinctions.

## Pass condition

A stable multi-lens taxonomy can explain all eight control cards without pretending they are mechanically identical.

## Claude audit prompt

Audit VM578-076 from the supplied A/B/C queries and eight exact-name probes. Classify every card into direct producer, alternative activation, land-untap accelerant, ability grantor, or another clearly named class. Determine what `produces:g` actually captures in practice versus what must remain separate. Recommend the smallest useful lens set for Plain Reading and Archscry; do not create extra semantic categories unless the evidence requires them. Return PASS / FAIL / NEEDS REVISION and a V3.2 evidence note.

**Final status:**  
**Final lens set:**  
**Evidence note:**  

---

# EV-005 / VM578-083 — Rakdos Group Slug: Repeatable Engines vs Burst

## Question

Can Maze distinguish persistent group-slug engines from one-shot/burst damage instead of treating every permanent matching group-damage words as a repeatable engine?

## Query A — permanent-shaped group-damage candidates

`id<=br (t:artifact or t:enchantment or t:creature) (o:"each player" or o:"each opponent") (o:deal or o:deals or o:lose or o:loses)`

**Record count:**  
0 cards found where the name includes “`id<=br” and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal”…

## Query B — burst spells

`id<=br (t:instant or t:sorcery) (o:"each player" or o:"each opponent") o:damage`

**Record count:**  
0 cards found where the name includes “`id<=br” and (the card types include “instant” or the card types include “sorcery”) and (the text includes “each player” or the text includes “each opponent”) and the text includes “damage`”


## Membership / classification probes

Run against Query A where appropriate:

`!"Mogis, God of Slaughter"`  
Expected role: persistent/repeatable tax/damage engine.

Showing the one card where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …

Mogis, God of Slaughter (Duskmourn: House of Horror Commander #89)

Add to Deck
Mogis, God of Slaughter
{2}{B}{R}
Legendary Enchantment Creature — God

Indestructible

As long as your devotion to black and red is less than seven, Mogis isn’t a creature.

At the beginning of each opponent’s upkeep, Mogis deals 2 damage to that player unless they sacrifice a creature of their choice.

`!"Sulfuric Vortex"`  
Expected role: persistent recurring damage.

Showing the one card where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …

Sulfuric Vortex (Dominaria Remastered #144)

Add to Deck
Sulfuric Vortex
{1}{R}{R}
Enchantment

At the beginning of each player’s upkeep, this enchantment deals 2 damage to that player.

If a player would gain life, that player gains no life instead.

`!"Roiling Vortex"`  
Expected role: persistent recurring damage.

Showing the one card where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …

Roiling Vortex (Zendikar Rising #156)

Add to Deck
Roiling Vortex
{1}{R}
Enchantment

At the beginning of each player’s upkeep, this enchantment deals 1 damage to them.

Whenever a player casts a spell, if no mana was spent to cast that spell, this enchantment deals 5 damage to that player.

{R}: Your opponents can’t gain life this turn.

`!"Maggot Carrier"`  
Control: permanent card, but its group life loss is a one-shot ETB.

Showing the one card where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …

Maggot Carrier (Eighth Edition #142)

Add to Deck
Maggot Carrier
{B}
Creature — Zombie

When this creature enters, each player loses 1 life.

“We do not suddenly fall on death, but advance towards it by slight degrees; we die every day.”
—Seneca, Epistles, trans. Gummere

`!"Magma Giant"`  
Control: permanent card, but group damage is ETB/one-shot.

Showing the one card where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …

Magma Giant (Commander Anthology Volume II #111)

Add to Deck
Magma Giant
{5}{R}{R}
Creature — Giant

When this creature enters, it deals 2 damage to each creature and each player.

Its open mouth is a furnace blast that blisters the skin. Its smoking fists are meteors that split the earth.

`!"Manabarbs"`  
Important coverage control: repeatable group-slug engine whose wording may use `a player`, not `each player`.
0 cards found where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …

For Query B, probe representative burst spells such as:

`!"Earthquake"`
0 cards found where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …

`!"Price of Progress"`
0 cards found where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …

## Sample audit

From Query A, capture at least 20 cards spread through the result list and mark:

- repeatable engine,
- one-shot ETB/death trigger,
- conditional but repeatable,
- generic damage card / false positive,
- unclear.

A-Cauldron Familiar
{B}
Creature — Cat

A-Cauldron Familiar can’t block.

When Cauldron Familiar enters, each opponent loses 1 life and you gain 1 life.

Sacrifice a Food: Return Cauldron Familiar from your graveyard to the battlefield.

1/1
Acolyte of Aclazotz
{2}{B}
Creature — Vampire Cleric

{T}, Sacrifice another creature or artifact: Each opponent loses 1 life and you gain 1 life.

1/4
Advanced Reconstruction
{3}{R}
Enchantment — Class

(Gain the next level as a sorcery to add its ability.)

At the beginning of your first main phase, mill a card, then exile a card from your graveyard at random. You may play the exiled card this turn.

{1}{R}: Level 2

Whenever one or more cards leave your graveyard, this Class deals 2 damage to each opponent.

{1}{R}: Level 3

Spells you cast from anywhere other than your hand cost {2} less to cast.

A-Forge Boss
{2}{B}{R}
Creature — Human Warrior

Whenever you sacrifice one or more other creatures, Forge Boss deals 2 damage to each opponent. This ability triggers only once each turn.

4/4
Agate Instigator
{1}{R}
Creature — Lizard Rogue

Offspring {1}{R} (You may pay an additional {1}{R} as you cast this spell. If you do, when this creature enters, create a 1/1 token copy of it.)

Whenever another creature you control enters, this creature deals 1 damage to each opponent.

1/3
Agent of the Iron Throne
{2}{B}
Legendary Enchantment — Background

Commander creatures you own have “Whenever an artifact or creature you control is put into a graveyard from the battlefield, each opponent loses 1 life.”

A-Heartfire Hero
{R}
Creature — Mouse Soldier

Valiant — Whenever this creature becomes the target of a spell or ability you control for the first time each turn, put a +1/+1 counter on it.

When this creature dies, it deals damage equal to its power to each opponent.

0/1
Alchemist's Talent
{3}{R}
Enchantment — Class

(Gain the next level as a sorcery to add its ability.)

When this Class enters, create two tapped Treasure tokens.

{1}{R}: Level 2

Treasures you control have “{T}, Sacrifice this artifact: Add two mana of any one color.”

{4}{R}: Level 3

Whenever you cast a spell, if mana from a Treasure was spent to cast it, this Class deals damage equal to that spell’s mana value to each opponent.

A-Nashi, Moon Sage's Scion
{1}{B}{B}
Legendary Creature — Rat Ninja

Ninjutsu {2}{B} ({2}{B}, Return an unblocked attacker you control to hand: Put this card onto the battlefield from your hand tapped and attacking.)

Whenever Nashi, Moon Sage’s Scion deals combat damage to a player, exile the top card of each player’s library. Until end of turn, you may play one of those cards. If you cast a spell this way, pay life equal to its mana value rather than paying its mana cost.

3/2
Ancient Runes
{2}{R}
Enchantment

At the beginning of each player’s upkeep, this enchantment deals damage to that player equal to the number of artifacts they control.

Angel's Trumpet
{3}
Artifact

All creatures have vigilance.

At the beginning of each player’s end step, tap all untapped creatures that player controls that didn’t attack this turn. This artifact deals damage to the player equal to the number of creatures tapped this way.

Angry Rabble
{1}{R}
Creature — Human Citizen

Trample

Whenever you cast a spell with mana value 4 or greater, this creature deals 1 damage to each opponent.

{5}{R}: Put two +1/+1 counters on this creature. Activate only as a sorcery.

2/2
Anje, Maid of Dishonor
{2}{B}{R}
Legendary Creature — Vampire

Whenever Anje and/or one or more other Vampires you control enter, create a Blood token. This ability triggers only once each turn. (It’s an artifact with “{1}, {T}, Discard a card, Sacrifice this token: Draw a card.”)

{2}, Sacrifice another creature or a Blood token: Each opponent loses 2 life and you gain 2 life.

4/5
Antagonism
{3}{R}
Enchantment

At the beginning of each player’s end step, this enchantment deals 2 damage to that player unless one of their opponents was dealt damage this turn.

Arbiter of Woe
{4}{B}{B}
Creature — Demon

As an additional cost to cast this spell, sacrifice a creature.

Flying

When this creature enters, each opponent discards a card and loses 2 life. You draw a card and gain 2 life.

5/4
Archfiend of Despair
{6}{B}{B}
Creature — Demon

Flying

Your opponents can’t gain life.

At the beginning of each end step, each opponent loses life equal to the life that player lost this turn. (Damage causes loss of life.)

6/6
Aria of Flame
{2}{R}
Enchantment

When this enchantment enters, each opponent gains 10 life.

Whenever you cast an instant or sorcery spell, put a verse counter on this enchantment, then it deals damage equal to the number of verse counters on it to target player or planeswalker.

Armageddon Clock
{6}
Artifact

At the beginning of your upkeep, put a doom counter on this artifact.

At the beginning of your draw step, this artifact deals damage equal to the number of doom counters on it to each player.

{4}: Remove a doom counter from this artifact. Any player may activate this ability but only during any upkeep step.

Arrogant Outlaw
{2}{B}
Creature — Vampire Noble

When this creature enters, if an opponent lost life this turn, each opponent loses 2 life and you gain 2 life.

3/2
Ashcloud Phoenix
{2}{R}{R}
Creature — Phoenix

Flying

When this creature dies, return it to the battlefield face down under your control.

Morph {4}{R}{R} (You may cast this card face down as a 2/2 creature for {3}. Turn it face up any time for its morph cost.)

When this creature is turned face up, it deals 2 damage to each player.

4/1
Ashling, Flame Dancer
{2}{R}{R}
Legendary Creature — Elemental Shaman

You don’t lose unspent red mana as steps and phases end.

Magecraft — Whenever you cast or copy an instant or sorcery spell, discard a card, then draw a card. If this is the second time this ability has resolved this turn, Ashling deals 2 damage to each opponent and each creature they control. If it’s the third time, add {R}{R}{R}{R}.

4/4

Corrected classification
Card	Primary	Secondary
A-Cauldron Familiar	Self-event trigger	etb, payoff, life_loss, self_recurring, engine_piece
Acolyte of Aclazotz	Repeatable payoff	activated, payoff, life_loss, sacrifice_cost, tap_cost
Advanced Reconstruction	Repeatable payoff	triggered, payoff, graveyard_leave, self_enabling, engine_piece
A-Forge Boss	Conditional repeatable payoff	triggered, payoff, sacrifice, rate_limited, once_per_turn
Agate Instigator	Repeatable payoff	triggered, payoff, creature_etb
Agent of the Iron Throne	Repeatable payoff	triggered, payoff, death, granted_ability
A-Heartfire Hero	Self-event trigger	death, payoff, power_scaled
Alchemist's Talent	Conditional repeatable payoff	triggered, payoff, condition_gated, treasure, self_enabling, engine_piece
A-Nashi, Moon Sage's Scion	Generic match / false positive	off_archetype, combat_damage_trigger
Ancient Runes	Repeatable payoff	triggered, payoff, upkeep, artifact_scaled
Angel's Trumpet	Repeatable payoff	triggered, payoff, end_step, state_scaled
Angry Rabble	Repeatable payoff	triggered, payoff, cast_trigger, mana_value_4_plus
Anje, Maid of Dishonor	Repeatable payoff	activated, payoff, life_loss, sacrifice_cost, self_enabling, engine_piece
Antagonism	Conditional repeatable payoff	triggered, payoff, condition_gated, end_step
Arbiter of Woe	Self-event trigger	etb, payoff, life_loss
Archfiend of Despair	Repeatable payoff	triggered, payoff, life_loss, end_step, state_scaled
Aria of Flame	Repeatable payoff	triggered, payoff, spell_cast, self_scaling, verse_counters
Armageddon Clock	Repeatable payoff	triggered, payoff, self_scaling, self_fueling, scheduled_trigger
Arrogant Outlaw	Self-event trigger	etb, payoff, life_loss, condition_gated
Ashcloud Phoenix	Self-event trigger	turned_face_up, payoff, self_recurring, death_recursion, symmetrical_damage
Ashling, Flame Dancer	Conditional repeatable payoff	triggered, payoff, magecraft, nth_resolution, rate_limited, once_per_turn_damage, engine_piece

## Pass condition

Maze has a defensible **repeatability classifier or lens split**. Merely being a permanent is explicitly rejected as proof of repeatability.

## Claude audit prompt

Audit VM578-083 from the supplied Rakdos queries, named-card probes, and 20-card sample. Separate repeatable group-slug engines from one-shot permanent effects and burst spells. Pay particular attention to wording that uses `a player` instead of `each player`, because that may reveal a coverage hole in Query A. Recommend the minimum query/lens architecture that captures the archetype without labeling one-shot ETBs as grindy engines. Return PASS / FAIL / NEEDS REVISION and a V3.2 evidence note.

**Final status:**  
**Evidence note:**  

---

# EV-006 / VM578-037 — Grindy Black Draw Engines

## Question

Can Archscry classify **repeatable persistent card-advantage engines** after Scryfall retrieves candidate permanents, rather than pretending one Scryfall query can prove "grindy"?

## Candidate query

`id<=b is:permanent otag:card-advantage`

1 – 60 of 1,013 cards where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage”

Also run a useful ranking view:

`id<=b is:permanent otag:card-advantage order:edhrec`

1 – 60 of 1,013 cards where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage”

**Record**
- Count:
- Capture: FULL / PARTIAL / TRUNCATED

## Membership probes

Use these as controls where possible:

`!"Phyrexian Arena"`  
Expected: repeatable persistent engine.

Showing the one card where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage” and the name is exactly “phyrexian arena”

Phyrexian Arena (Foundations #180)

Add to Deck
Phyrexian Arena
{1}{B}{B}
Enchantment

At the beginning of your upkeep, you draw a card and you lose 1 life.

A spark of resistance against a tide of corruption.

`!"Black Market Connections"`  
Expected: repeatable persistent engine with selectable modes.

Showing the one card where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage” and the name is exactly “black market connections”

Black Market Connections (Marvel Super Heroes Commander #155)

Add to Deck
Black Market Connections
{2}{B}
Enchantment

At the beginning of your first main phase, choose one or more —

• Sell Contraband — Create a Treasure token. You lose 1 life.

• Buy Information — Draw a card. You lose 2 life.

• Hire a Mercenary — Create a 3/2 colorless Shapeshifter creature token with changeling. You lose 3 life. (It is every creature type.)

`!"Dark Prophecy"`  
Expected: repeatable conditional/death-trigger draw engine.

Showing the one card where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage” and the name is exactly “dark prophecy”

Dark Prophecy (Magic 2014 #93)

Add to Deck
Dark Prophecy
{B}{B}{B}
Enchantment

Whenever a creature you control dies, you draw a card and you lose 1 life.

When the bog ran short on small animals, Ekri turned to the surrounding farmlands.

`!"Braids, Arisen Nightmare"`  
Expected: repeatable conditional value engine.

Showing the one card where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage” and the name is exactly “braids, arisen nightmare”

Braids, Arisen Nightmare (Edge of Eternities Commander #82)

Add to Deck
Braids, Arisen Nightmare
{1}{B}{B}
Legendary Creature — Nightmare

At the beginning of your end step, you may sacrifice an artifact, creature, enchantment, land, or planeswalker. If you do, each opponent may sacrifice a permanent of their choice that shares a card type with it. For each opponent who doesn’t, that player loses 2 life and you draw a card.

3/3

`!"Gix, Yawgmoth Praetor"`  
Expected: repeatable combat-trigger value engine.

Showing the one card where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage” and the name is exactly “gix, yawgmoth praetor”

Gix, Yawgmoth Praetor (Tarkir: Dragonstorm Commander #181)

Add to Deck
Gix, Yawgmoth Praetor
{1}{B}{B}
Legendary Creature — Phyrexian Praetor

Whenever a creature deals combat damage to one of your opponents, its controller may pay 1 life. If they do, they draw a card.

{4}{B}{B}{B}, Discard X cards: Exile the top X cards of target opponent’s library. You may play lands and cast spells from among cards exiled this way without paying their mana costs.

3/3

`!"Skullclamp"`  
Expected: repeatable equipment/card-advantage engine.

Showing the one card where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage” and the name is exactly “skullclamp”

Skullclamp (Marvel Super Heroes Commander #210)

Add to Deck
Skullclamp
{1}
Artifact — Equipment

Equipped creature gets +1/-1.

Whenever equipped creature dies, draw two cards.

Equip {1}


`!"Dusk Legion Zealot"`  
Control: permanent with one-shot ETB card replacement; should **not** be ranked as a grindy draw engine merely because it matches the candidate query.
Showing the one card where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage” and the name is exactly “dusk legion zealot”

Dusk Legion Zealot (The Lost Caverns of Ixalan Commander #194)

Add to Deck
Dusk Legion Zealot
{1}{B}
Creature — Vampire Soldier

When this creature enters, you draw a card and you lose 1 life.

Once they reached Orazca, the Legion’s explorers ransacked tombs and temples, hunting for the Immortal Sun.

1/1


`!"Solemn Simulacrum"`  
Control/edge: permanent with finite ETB/death value; distinguish from persistent engine.

Showing the one card where the color identity ≤ B and the cards become permanents and the card is tagged “card-advantage” and the name is exactly “solemn simulacrum”

Solemn Simulacrum (Marvel Super Heroes Commander #215)

Add to Deck
Solemn Simulacrum
{4}
Artifact Creature — Golem

When this creature enters, you may search your library for a basic land card, put that card onto the battlefield tapped, then shuffle.

When this creature dies, you may draw a card.

2/2

## Sample classifier audit

Capture at least the top 25 results under `order:edhrec` and label each:

- **A — Repeatable autonomous engine**
- **B — Repeatable but condition-dependent engine**
- **C — Finite / one-shot permanent value**
- **D — Card advantage but not actual draw**
- **E — False positive / poor fit**
- **U — Unclear**

Record:

| Card | Class | Why | Would Archscry recommend for "grindy draw engine"? |
|---|---|---|---|
| | | | |

# EV-006 / VM578-037 — Grindy Black Draw Engines

## Final Audit

### Question

Can Archscry classify repeatable persistent card-advantage engines after Scryfall retrieves candidate permanents, rather than pretending one Scryfall query can prove “grindy”?

### Candidate query

`id<=b is:permanent otag:card-advantage`

Ranking view:

`id<=b is:permanent otag:card-advantage order:edhrec`

## Retrieval record

* Candidate count: **1,013**
* Required audit: **top 25 under `order:edhrec`**
* Required results captured: **25/25**
* Additional stress-test results captured: **2**
* Total classified: **27**
* Capture: **FULL** for the required top-25 audit

---

# Red-Team Findings

## 1. The Scryfall query is candidate retrieval, not semantic proof

`otag:card-advantage` successfully retrieves a broad set of potentially relevant permanents, but the results include:

* persistent literal draw engines;
* conditional draw engines;
* one-shot card replacement;
* non-draw card-access engines;
* recursion;
* filtering;
* poor fits.

Therefore:

> **Scryfall candidate truth and Archscry semantic classification must remain separate.**

The query answers:

> “Which permanents might belong in this neighborhood?”

It does not answer:

> “Which cards are grindy black draw engines?”

---

# Frozen Primary Classes

## A — Repeatable autonomous engine

The card provides a recurring **actual draw** opportunity without requiring an additional external qualifying event or game-state condition.

“Autonomous” does **not** mean free.

Normal costs such as:

* mana;
* tapping;
* paying life;
* choosing a mode;

do not by themselves make a card B.

Examples:

* Phyrexian Arena
* The One Ring
* War Room

---

## B — Repeatable but condition-dependent engine

The card can repeatedly produce **actual draw**, but each successful draw requires an additional qualifying state, object, or event beyond ordinary activation costs.

Examples include requiring:

* another creature to die;
* a token to have been created;
* a power-4+ creature;
* a particular spell type;
* an equipped creature dying;
* the permanent to satisfy an explicit recurring state gate.

Examples:

* Skullclamp
* Morbid Opportunist
* Idol of Oblivion
* Bonders' Enclave

---

## C — Finite / one-shot permanent value

The permanent can actually draw cards, but its intrinsic draw mechanism is finite, self-consuming, self-removing, or otherwise not a persistent draw engine without resetting or supplying additional machinery.

External blink, recursion, replay, or combo support does not make a C card repeatable for this classification.

Examples:

* Mind Stone
* Commander's Sphere
* Hedron Archive
* Solemn Simulacrum

---

## D — Card advantage/access but not actual draw

The card provides meaningful card advantage, card access, or additional usable cards, but its relevant mechanism does **not mechanically draw cards**.

Examples include:

* casting from the top of the library;
* putting cards directly into hand;
* discover;
* exiling cards and allowing them to be played.

D is not equivalent to “bad.”

Some D cards are exceptional grindy card-advantage engines.

Examples:

* Necropotence
* Bolas's Citadel
* Mystic Forge

---

## E — False positive / poor fit

The card may match the broad candidate query but does not meaningfully fulfill the requested persistent card-advantage/draw-engine role.

Examples include:

* recursion without card gain;
* symmetrical filtering that does not generate card advantage;
* unrelated card-access effects.

---

# Classification Precedence

Apply the rules in this order.

### 1. Does the relevant card-advantage mechanism actually draw cards?

**No:**

* meaningful card advantage/access → **D**
* otherwise poor fit → **E**

This rule takes precedence over A/B.

A repeatable non-draw engine is still D for the phrase **“draw engine.”**

### 2. If it actually draws, is the intrinsic draw mechanism finite?

If yes:

→ **C**

Do not assume external recursion, blink, replay, or combo support.

### 3. If it repeatedly draws, does each draw require an additional qualifying state/event?

If yes:

→ **B**

If no:

→ **A**

### 4. Ordinary costs are not conditions

These do not by themselves make an engine B:

* mana costs;
* tap costs;
* life payments;
* choosing modes.

An additional qualifying game-state requirement does.

---

# Important Red-Team Correction: Sensei's Divining Top

Sensei's Divining Top should be **C**, not E.

Its relevant ability actually says:

> Draw a card, then put this artifact on top of its owner's library.

The draw event is real, but using it removes Top from the battlefield as the draw source. Its other ability is filtering rather than card advantage.

Without additional machinery, it is not a persistent card-advantage engine.

That makes it structurally closer to the finite-value C bucket than to an outright false positive.

---

# Required Top-25 Audit

|  # | Card                     | Class | Why                                                                                                    | Recommend as direct “grindy draw engine”? |
| -: | ------------------------ | :---: | ------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
|  1 | Mind Stone               | **C** | Sacrifices itself for one draw event                                                                   | No                                        |
|  2 | Solemn Simulacrum        | **C** | Finite ETB/death value; draw occurs on its own death                                                   | No                                        |
|  3 | Skullclamp               | **B** | Persistent source, but requires another creature and that creature dying                               | Yes — conditional                         |
|  4 | Commander's Sphere       | **C** | Sacrifices itself for one card                                                                         | No                                        |
|  5 | The One Ring             | **A** | Persistent activated draw; tap is an ordinary activation cost                                          | Yes                                       |
|  6 | Phyrexian Arena          | **A** | Automatically draws every upkeep with no additional gate                                               | Yes                                       |
|  7 | Black Market Connections | **A** | Recurring self-supplied draw opportunity; life loss/mode choice are not external conditions            | Yes                                       |
|  8 | War Room                 | **A** | Persistent activated draw; mana, tapping, and life payment are costs, not qualifying conditions        | Yes                                       |
|  9 | Herald's Horn            | **D** | Can repeatedly put qualifying cards into hand, but does not draw them                                  | Adjacent                                  |
| 10 | Idol of Oblivion         | **B** | Draw requires having created a token that turn                                                         | Yes — conditional                         |
| 11 | Buried Ruin              | **E** | One-shot artifact recursion; no draw and no persistent CA engine                                       | No                                        |
| 12 | Sensei's Divining Top    | **C** | Actual draw, but the draw ability removes Top from the battlefield; intrinsic draw is not persistent   | No                                        |
| 13 | Takenuma, Abandoned Mire | **E** | One-shot recursion from graveyard to hand; not draw/card-advantage engine                              | No                                        |
| 14 | Morbid Opportunist       | **B** | Requires creatures dying and is rate-limited to once each turn                                         | Yes — conditional                         |
| 15 | Bolas's Citadel          | **D** | Persistent casting/access from library, but does not draw                                              | Strong adjacent                           |
| 16 | Braids, Arisen Nightmare | **B** | Recurring opportunity, but requires sacrifice material and opponents declining to match it             | Yes — conditional                         |
| 17 | Vanquisher's Banner      | **B** | Repeated draw requires casting creatures of the chosen type                                            | Yes — conditional                         |
| 18 | Mystic Forge             | **D** | Persistent casting/access from library; no actual draw                                                 | Adjacent                                  |
| 19 | Geier Reach Sanitarium   | **E** | Repeatable symmetrical draw-discard is filtering, not inherent card advantage                          | No                                        |
| 20 | Necropotence             | **D** | Extremely powerful persistent card advantage, but puts exiled cards into hand rather than drawing them | Strong adjacent                           |
| 21 | Ripples of Undeath       | **D** | Repeatedly puts selected milled cards into hand; does not draw                                         | Adjacent                                  |
| 22 | Hedron Archive           | **C** | Sacrifices itself for a finite two-card draw                                                           | No                                        |
| 23 | Bonders' Enclave         | **B** | Persistent draw requiring a power-4+ creature                                                          | Yes — conditional                         |
| 24 | Opposition Agent         | **D** | Can create card advantage/access from opponents' searches, but does not draw                           | Adjacent / situational                    |
| 25 | Scrawling Crawler        | **A** | Automatically produces recurring actual draw with no additional gate                                   | Yes — symmetrical                         |

## Top-25 distribution

| Class                              |  Count |
| ---------------------------------- | -----: |
| A — Repeatable autonomous          |  **5** |
| B — Conditional repeatable         |  **6** |
| C — Finite / one-shot              |  **5** |
| D — Non-draw card advantage/access |  **6** |
| E — Poor fit                       |  **3** |
| U — Unclear                        |  **0** |
| **Total**                          | **25** |

---

# Additional Stress Tests

| Card                  | Class | Why                                                                                                              |
| --------------------- | :---: | ---------------------------------------------------------------------------------------------------------------- |
| Howling Mine          | **B** | Recurring actual draw, but contains the explicit recurring gate “if this artifact is untapped”; also symmetrical |
| Chimil, the Inner Sun | **D** | Repeatable autonomous discover engine, but discover casts or puts cards into hand rather than drawing            |

## All 27 results

* **A:** 5
* **B:** 7
* **C:** 5
* **D:** 7
* **E:** 3
* **U:** 0

---

# Important Ranking Limitation

The classifier successfully identifies literal persistent draw behavior.

It does **not** prove that the final recommendation ranking should always be:

> A/B > C/D/E

That would be too strong.

For example:

**Necropotence = D**

because it does not mechanically draw cards.

But for a human asking for:

> “grindy black draw engines”

Necropotence may be a substantially better recommendation than a technically literal B result such as Howling Mine or Bonders' Enclave.

Likewise:

* Bolas's Citadel
* Necropotence
* Mystic Forge

are mechanically D but strategically powerful long-game card-advantage engines.

Therefore D must not be treated as equivalent to E or globally suppressed beneath every A/B card.

---

# Final Archscry Model

Use the classifier for **mechanical truth**, then a second ranking layer for **player intent**.

## Mechanical classification

Determines:

* literal draw vs non-draw;
* repeatable vs finite;
* autonomous vs condition-dependent;
* meaningful card advantage vs poor fit.

## Semantic ranking

Then evaluates features such as:

* persistence;
* net card gain;
* asymmetry;
* external setup dependency;
* rate limits;
* mana/life cost;
* tribal/archetype dependency;
* vulnerability;
* how strongly the card fits “grindy”;
* literal match versus strategically adjacent match.

This allows Archscry to say, for example:

> **Phyrexian Arena** — direct match: autonomous persistent draw engine.

and:

> **Necropotence** — adjacent high-confidence recommendation: technically not a draw effect, but an exceptionally strong persistent black card-advantage engine.

That is more useful than either blindly following Oracle vocabulary or ignoring it.

---

# EV-006 Verdict

**Final status:** **PASS — with governed ranking limitation**

**Classifier verdict:** **PASS**

A simple, explainable Oracle-level classifier can reliably separate:

* autonomous persistent draw;
* conditional persistent draw;
* finite draw/value;
* non-draw card advantage;
* poor fits.

The required top-25 sample produced **zero U classifications**.

However:

> **“Grindy” remains a multi-lens recommendation concept, not an exact mechanical class.**

Archscry may use A/B as high-confidence **direct-match evidence**, but it must not impose a universal rule that every A/B result outranks every D result.

D should remain an **adjacent semantic recommendation lane**, with its own ranking signals.

C and E can generally be strongly deprioritized for this request.

---

# V3.2 Evidence Note

EV-006 audited the complete top 25 EDHREC-ranked results from `id<=b is:permanent otag:card-advantage`, plus two additional stress-test results. The sample confirms that Scryfall's `card-advantage` tag is suitable for broad candidate retrieval but cannot establish the player concept “grindy black draw engine” by itself.

A deterministic card-level classifier separated the required sample into 5 autonomous repeatable draw engines (A), 6 condition-dependent repeatable draw engines (B), 5 finite/one-shot draw-value permanents (C), 6 meaningful card-advantage/access cards that do not mechanically draw (D), and 3 poor-fit results (E), with 0 unclear classifications.

The classifier is therefore suitable as a mechanical interpretation layer after Scryfall retrieval.

A governed limitation remains: “grindy” is strategic/player-language intent rather than Oracle-level mechanical truth. A/B are direct literal matches, but strong D cards such as Necropotence or Bolas's Citadel may legitimately outrank weaker literal draw engines in final Archscry recommendations. Final ranking must therefore combine mechanical classification with semantic relevance rather than enforcing a strict A/B > D total order.

**EV-006: PASS with governed ranking limitation.**


## Pass condition

A simple, explainable card-level classifier can separate A/B from C/D/E with acceptable reliability. If it cannot, keep the concept as a multi-lens recommendation problem rather than claiming exact classification.

## Claude audit prompt

Audit VM578-037 using only the supplied candidate query, exact-name probes, and sampled results. The Scryfall query is only candidate retrieval; the real question is whether a card-level classifier can identify persistent/repeatable black card-advantage engines. Apply these labels exactly: A autonomous repeatable, B conditional repeatable, C finite/one-shot, D card advantage but not draw, E false positive, U unclear. Then state whether Archscry can safely rank A/B above C/D/E for the phrase "grindy black draw engines." Return PASS / FAIL / NEEDS REVISION and a V3.2 evidence note.

**Final status:**  
**Classifier verdict:**  
**Evidence note:**  

---

# Final Gate Summary

Complete this only after all six cases are audited.

| Evidence ID | Case | Status | Changed runtime rule? | Ready for V3.2? |
|---|---|---|---|---|
| EV-001 | VM578-041 | | | |
| EV-002 | VM578-064 | | | |
| EV-003 | VM578-075 | | | |
| EV-004 | VM578-076 | | | |
| EV-005 | VM578-083 | | | |
| EV-006 | VM578-037 | | | |

## Freeze criteria

Calibration V3.2 may become the propagation baseline only when:

- all six rows above are PASS or have an explicitly accepted governed limitation;
- no important positive/negative claim relies on partial-result absence;
- each multi-card wording claim has individual card probes;
- Tagger-vs-Oracle choices are explicitly documented;
- exact Scryfall candidate truth remains separate from Archscry ranking policy;
- the workbook evidence backlog is zero.

## What happens after this

Once the six checks close:

1. Update Calibration V3.2.
2. Freeze the translator/recipe/evidence rules.
3. Reclassify the remaining 1,038 lexicon rows automatically.
4. Produce a diff report instead of silently overwriting the corpus.
5. Freeze the Plain Reading semantic state contract.
6. Implement Plain Reading ⇄ Operator Hand from that shared state.
7. Feed the same semantic state into Archscry ranking and explanations.
