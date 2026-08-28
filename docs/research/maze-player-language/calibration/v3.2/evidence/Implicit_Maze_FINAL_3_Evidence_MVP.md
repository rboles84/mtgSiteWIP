# Implicit Maze — FINAL 3 Evidence Checks (MVP Fast Lane)

**Goal:** close EV-003, EV-004, and EV-005 as fast as possible so Calibration V3.2 can be frozen.

**You already finished:** EV-001, EV-002, EV-006.  
**Do not redo them.**

## Rules for this MVP pass

- Run only the queries in this file.
- Paste the Scryfall output directly under each query.
- Do **not** copy hundreds of cards unless specifically asked.
- For the 8-card mana-dork matrix, the queries intentionally limit the universe to exactly those 8 named cards. If Scryfall shows the complete result set (maximum 8), returned names = positive membership and omitted names = negative membership.
- If Scryfall says the query is malformed or you see text like `the name includes “\`id<=...”`, stop and rerun **without Markdown backticks**.
- Do not infer absence from a partial general result list.

When these three are done, upload this file back to ChatGPT.

---

# CHECK 1 — EV-003 / VM578-075
## Esper Board Wipes: Tagger vs Oracle

We already proved the named controls. The only missing evidence is the **difference between the two result sets**.

### A. Tagger-only results

Run exactly:

`id<=wub otag:board-wipe -o:"destroy all creatures" -o:"exile all creatures" -o:"each creature gets -" -o:"damage to each creature" -o:"sacrifice all"`

This means:

> Tagged as board-wipe, but NOT caught by the current Oracle floor.

**What to paste:** only the **first 10 cards** with their Oracle text.

### PASTE TAGGER-ONLY FIRST 10 HERE

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


---

### B. Oracle-only results

Run exactly:

`id<=wub (o:"destroy all creatures" or o:"exile all creatures" or o:"each creature gets -" or o:"damage to each creature" or o:"sacrifice all") -otag:board-wipe`

This means:

> Caught by the Oracle floor, but NOT tagged board-wipe.

**What to paste:** only the **first 10 cards** with their Oracle text.

### PASTE ORACLE-ONLY FIRST 10 HERE

15 cards where the color identity ≤ BUW and (the text includes “destroy all creatures” or the text includes “exile all creatures” or the text includes “each creature gets -” or the text includes “damage to each creature” or the text includes “sacrifice all”) and t…

Abu Ja'far
{W}
Creature — Human

When this creature dies, destroy all creatures blocking or blocked by it. They can’t be regenerated.

0/1
Cathedral Membrane
{1}{W/P}
Artifact Creature — Phyrexian Wall

({W/P} can be paid with either {W} or 2 life.)

Defender

When this creature dies during combat, it deals 6 damage to each creature it blocked this combat.

0/3
Day of the Dragons
{4}{U}{U}{U}
Enchantment

When this enchantment enters, exile all creatures you control. Then create that many 5/5 red Dragon creature tokens with flying.

When this enchantment leaves the battlefield, sacrifice all Dragons you control. Then return the exiled cards to the battlefield under your control.

Death Pit Offering
{2}{B}{B}
Enchantment

When this enchantment enters, sacrifice all creatures you control.

Creatures you control get +2/+2.

Emrakul, the World Anew
{12}
Legendary Creature — Eldrazi

When you cast this spell, gain control of all creatures target player controls.

Flying, protection from spells and from permanents that were cast this turn

When Emrakul leaves the battlefield, sacrifice all creatures you control.

Madness—Pay six {C}.

12/12
Force of Despair
{1}{B}{B}
Instant

If it’s not your turn, you may exile a black card from your hand rather than pay this spell’s mana cost.

Destroy all creatures that entered this turn.

Glyph of Doom
{B}
Instant

Choose target Wall creature. At this turn’s next end of combat, destroy all creatures that were blocked by that creature this turn.

Hellcarver Demon
{3}{B}{B}{B}
Creature — Demon

Flying

Whenever this creature deals combat damage to a player, sacrifice all other permanents you control and discard your hand. Exile the top six cards of your library. You may cast any number of spells from among cards exiled this way without paying their mana costs.

6/6
Kaervek's Spite
{B}{B}{B}
Instant

As an additional cost to cast this spell, sacrifice all permanents you control and discard your hand.

Target player loses 5 life.

Knife and Death
{2}{B}{B}
Sorcery

Just a second (As long as this spell is on the stack, players can’t move permanents.)

One at a time, throw ten cards you own from outside the game onto the playing area from a distance of at least three feet (about one meter). For each of those cards, Knife and Death deals 1 damage to each creature or planeswalker you don’t control that card is touching. You gain life equal to the damage dealt this way.

Mass Polymorph
{5}{U}
Sorcery

Exile all creatures you control, then reveal cards from the top of your library until you reveal that many creature cards. Put all creature cards revealed this way onto the battlefield, then shuffle the rest of the revealed cards into your library.

Space Beleren
{2}{W}{U}
Legendary Planeswalker — Jace

Space sculptor (Space Beleren divides the battlefield into alpha, beta, and gamma sectors. If a creature isn’t assigned to a sector, its controller assigns it to one. Opponents assign first.)

+1: Creatures in each sector can be blocked this turn only by creatures in the same sector.

−1: Put a +1/+1 counter on each creature in the sector of your choice.

−5: Destroy all creatures in the sector of your choice.

Loyalty: 3
Tomb of Urami
Legendary Land

{T}: Add {B}. Tomb of Urami deals 1 damage to you if you don’t control an Ogre.

{2}{B}{B}, {T}, Sacrifice all lands you control: Create Urami, a legendary 5/5 black Demon Spirit creature token with flying.

Trailblazer's Torch
{4}
Artifact — Equipment

When this Equipment enters, you take the initiative.

Whenever equipped creature becomes blocked, it deals 2 damage to each creature blocking it.

Equip {1} ({1}: Attach to target creature you control. Equip only as a sorcery.)

Yukora, the Prisoner
{2}{B}{B}
Legendary Creature — Demon Spirit

When Yukora leaves the battlefield, sacrifice all non-Ogre creatures you control.

5/5


---

### Nothing else required for EV-003

Do **not** rerun Wrath of God, Damnation, Supreme Verdict, Sunfall, Toxic Deluge, Terminus, Evacuation, or Farewell. Those controls are already proven.

---

# CHECK 2 — EV-004 / VM578-076
## Green Mana Dorks: 8-Card Matrix in Only 3 Queries

We need to know how the three candidate lenses classify the same eight control cards.

The eight controls are:

1. Llanowar Elves
2. Birds of Paradise
3. Priest of Titania
4. Selvala, Heart of the Wilds
5. Wall of Roots
6. Arbor Elf
7. Joiner Adept
8. Citanul Hierophants

Because every query below explicitly limits Scryfall to those eight names, the result set can never exceed 8 cards. **Paste the full result each time.**

---

## A. `produces:g`

Run exactly:

`id<=g t:creature produces:g (!"Llanowar Elves" or !"Birds of Paradise" or !"Priest of Titania" or !"Selvala, Heart of the Wilds" or !"Wall of Roots" or !"Arbor Elf" or !"Joiner Adept" or !"Citanul Hierophants")`

### PASTE FULL RESULT HERE
7 cards where the color identity ≤ G and the card types include “creature” and the mana produced ≥ G and (the name is exactly “llanowar elves” or the name is exactly “birds of paradise” or the name is exactly “priest of titania” or the name is exactly “selvala, h…

Birds of Paradise
{G}
Creature — Bird

Flying

{T}: Add one mana of any color.

0/1
Citanul Hierophants
{3}{G}
Creature — Human Druid

Creatures you control have “{T}: Add {G}.”

3/2
Joiner Adept
{1}{G}
Creature — Elf Druid

Lands you control have “{T}: Add one mana of any color.”

2/1
Llanowar Elves
{G}
Creature — Elf Druid

{T}: Add {G}.

1/1
Priest of Titania
{1}{G}
Creature — Elf Druid

{T}: Add {G} for each Elf on the battlefield.

1/1
Selvala, Heart of the Wilds
{1}{G}{G}
Legendary Creature — Elf Scout

Whenever another creature enters, its controller may draw a card if its power is greater than each other creature’s power.

{G}, {T}: Add X mana in any combination of colors, where X is the greatest power among creatures you control.

2/3
Wall of Roots
{1}{G}
Creature — Plant Wall

Defender

Put a -0/-1 counter on this creature: Add {G}. Activate only once each turn.

0/5

---

## B. Direct self-tap `{T}: Add`

Run exactly:

`id<=g t:creature o:/^{T}: Add/ (!"Llanowar Elves" or !"Birds of Paradise" or !"Priest of Titania" or !"Selvala, Heart of the Wilds" or !"Wall of Roots" or !"Arbor Elf" or !"Joiner Adept" or !"Citanul Hierophants")`

### PASTE FULL RESULT HERE
3 cards where the color identity ≤ G and the card types include “creature” and the text matches the regex /^{t}: add/ and (the name is exactly “llanowar elves” or the name is exactly “birds of paradise” or the name is exactly “priest of titania” or the name is ex…

Birds of Paradise
{G}
Creature — Bird

Flying

{T}: Add one mana of any color.

0/1
Llanowar Elves
{G}
Creature — Elf Druid

{T}: Add {G}.

1/1
Priest of Titania
{1}{G}
Creature — Elf Druid

{T}: Add {G} for each Elf on the battlefield.

1/1
---

## C. Forest-untap accelerant

Run exactly:

`id<=g t:creature o:"untap target Forest" (!"Llanowar Elves" or !"Birds of Paradise" or !"Priest of Titania" or !"Selvala, Heart of the Wilds" or !"Wall of Roots" or !"Arbor Elf" or !"Joiner Adept" or !"Citanul Hierophants")`

### PASTE FULL RESULT HERE
Showing the one card where the color identity ≤ G and the card types include “creature” and the text includes “untap target forest” and (the name is exactly “llanowar elves” or the name is exactly “birds of paradise” or the name is exactly “priest of titania” or the name is e…

Arbor Elf (Masters 25 #160)

Add to Deck
Arbor Elf
{G}
Creature — Elf Druid

{T}: Untap target Forest.

1/1
---

### Nothing else required for EV-004

Do not manually run 24 separate probes unless one of these three queries behaves unexpectedly.

---

# CHECK 3 — EV-005 / VM578-083
## Rakdos Group Slug: Fix the Malformed Runs

Your prior **classification sample is preserved**. Do not redo the 20+ card classification.

We only need clean execution evidence for the queries that were malformed or accidentally run against the wrong base.

---

## A. Permanent-shaped candidate pool

Run exactly **without backticks**:

`id<=br (t:artifact or t:enchantment or t:creature) (o:"each player" or o:"each opponent") (o:deal or o:deals or o:lose or o:loses)`

**What to paste:** just the Scryfall result count.  
You do **not** need to paste the card list again.

### RESULT COUNT
1 – 60 of 507 cards where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and (the text includes “each player” or the text includes “each opponent”) and (the text includes “deal” or …
---

## B. Burst spell candidate pool

Run exactly **without backticks**:

`id<=br (t:instant or t:sorcery) (o:"each player" or o:"each opponent") o:damage`

**What to paste:** just the Scryfall result count.

### RESULT COUNT
1 – 60 of 87 cards where the color identity ≤ BR and (the card types include “instant” or the card types include “sorcery”) and (the text includes “each player” or the text includes “each opponent”) and the text includes “damage”
---

## C. Earthquake — actual Query B probe

Run:

`id<=br (t:instant or t:sorcery) (o:"each player" or o:"each opponent") o:damage !"Earthquake"`

### PASTE FULL RESULT HERE
Showing the one card where the color identity ≤ BR and (the card types include “instant” or the card types include “sorcery”) and (the text includes “each player” or the text includes “each opponent”) and the text includes “damage” and the name is exactly “earthquake”

Earthquake (Commander Anthology Volume II #95)

Add to Deck
Earthquake
{X}{R}
Sorcery

Earthquake deals X damage to each creature without flying and each player.

They fell screaming into the depths of the chasm like so many pebbles tossed down a well.
---

## D. Price of Progress — actual Query B probe

Run:

`id<=br (t:instant or t:sorcery) (o:"each player" or o:"each opponent") o:damage !"Price of Progress"`

### PASTE FULL RESULT HERE
Showing the one card where the color identity ≤ BR and (the card types include “instant” or the card types include “sorcery”) and (the text includes “each player” or the text includes “each opponent”) and the text includes “damage” and the name is exactly “price of progress”

Price of Progress (Eternal Masters #141)

Add to Deck
Price of Progress
{1}{R}
Instant

Price of Progress deals damage to each player equal to twice the number of nonbasic lands that player controls.

Enthusiasm can be tempered in the furnace of the earth.
---

## E. Manabarbs — test the known `"a player"` coverage gap

Run:

`id<=br (t:artifact or t:enchantment or t:creature) o:"a player" (o:deal or o:deals or o:lose or o:loses) !"Manabarbs"`

### PASTE FULL RESULT HERE
Showing the one card where the color identity ≤ BR and (the card types include “artifact” or the card types include “enchantment” or the card types include “creature”) and the text includes “a player” and (the text includes “deal” or the text includes “deals” or the text incl…

Manabarbs (Magic 2012 #150)

Add to Deck
Manabarbs
{3}{R}
Enchantment

Whenever a player taps a land for mana, this enchantment deals 1 damage to that player.

“I don’t know why people say a double-edged sword is bad. It’s a sword. With two edges.”
—Kamahl, pit fighter
---

### Nothing else required for EV-005

Do not redo:
- Mogis
- Sulfuric Vortex
- Roiling Vortex
- Maggot Carrier
- Magma Giant
- the existing 20+ card repeatability classification

Those are already useful evidence.

---

# ONE FINAL CLAUDE AUDIT PROMPT

After filling the three sections above, give Claude **this entire completed Markdown file** and paste this prompt:

> Audit only the new evidence in this completed MVP evidence file. Do not re-research the six-case project and do not reopen EV-001, EV-002, or EV-006.
>
> **EV-003:** classify the 10 Tagger-only and 10 Oracle-only cards as genuine broad board wipe, creature wipe, narrow/selective sweeper, one-sided wipe, temporary reset/bounce, non-creature wipe, false positive, or unclear. Based on the already-proven controls plus this differential sample, choose exactly one product mode: **Tagger Primary**, **Oracle Primary + Tagger Broaden**, or **Multi-Lens**. Explain the smallest useful Plain Reading/Archscry design.
>
> **EV-004:** build the 8-card × 3-lens membership matrix from the three complete named-card result sets. Classify each control as direct mana producer, alternative-activation producer, land-untap accelerant, ability grantor, or other. State exactly what `produces:g` captures and recommend the smallest useful mana-dork lens set.
>
> **EV-005:** verify that Query A and Query B now executed correctly, verify Earthquake and Price of Progress against the actual burst-spell query, and verify whether the `"a player"` branch recovers Manabarbs. Combine that execution evidence with the already-completed repeatability classification. Recommend the smallest useful group-slug architecture without treating every permanent as a repeatable engine.
>
> For each case return:
>
> - `PASS`, `FAIL`, or `NEEDS REVISION`
> - the final runtime/product rule
> - a concise **V3.2 Evidence Note**
> - whether any additional Scryfall run is still necessary
>
> End with a table:
>
> `EV-003 | status | ready for V3.2 yes/no`
>
> `EV-004 | status | ready for V3.2 yes/no`
>
> `EV-005 | status | ready for V3.2 yes/no`
>
> Do not add new research unless the supplied evidence is internally contradictory.

---

# FINAL OWNER CHECK

After Claude responds, paste its three verdicts below.

## EV-003

**Status:**  
**Product mode:**  
**V3.2 Evidence Note:**  
**More Scryfall work needed?**  

## EV-004

**Status:**  
**Final lens set:**  
**V3.2 Evidence Note:**  
**More Scryfall work needed?**  

## EV-005

**Status:**  
**Final architecture:**  
**V3.2 Evidence Note:**  
**More Scryfall work needed?**  

---

# STOP CONDITION

You are finished when all three say:

**PASS**  
and  
**More Scryfall work needed? NO**

At that point, upload this Markdown file and the Claude verdicts to ChatGPT.

Then the next step is:

**Calibration V3.2 → evidence backlog zero → freeze → propagate the remaining 1,038 rows.**
