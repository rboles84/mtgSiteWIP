# Witherbloom Narrative Taxonomy

Generated: 2026-05-18

## Identity

**Mana:** Black-Green  
**College:** Witherbloom, the College of Essence Studies / College of Life and Death

> Life and death are not opposites to escape; they are exchange rates inside one living system.

Witherbloom should read as practical, earthy, loyal, hungry, medicinal, biological, and dangerous. It is not just Golgari with school robes. It is **Strixhaven biology and witchcraft**: Pests, potions, cauldrons, herbs, bodily essence, life-gain triggers, death triggers, sacrifice, and the uncomfortable usefulness of every living thing.

## Core Player Fantasy

> I understand the messy living system better than you do, and I will turn every gain, death, body, and bargain into pressure.

## Emotional Texture

- earthy
- loyal
- grimly funny
- practical
- hungry
- protective
- gross-but-warm
- swamp-academic

## Narrative Axes

| Axis | Question | Mechanical Hooks |
|---|---|---|
| Life ↔ Death | Is death an ending or a conversion event? | life gain, drain, recursion, death triggers |
| Care ↔ Exploitation | Is the ecosystem being tended or harvested? | Pests, Food, sacrifice, protection |
| Body ↔ Resource | When does a creature stop being a person and become material? | sacrifice outlets, Pest tokens, dies triggers |
| Bog ↔ Classroom | Is this folk witchcraft, academic biology, or both? | Lesson, magecraft, cauldron, field study |
| Loyalty ↔ Hunger | What will Witherbloom protect, and what will it consume? | team growth, life gain, large creatures, sacrifice |

## Archetype Families

### 1. Life-Drain Witchcraft

Life gain becomes opponent pressure.

**Signature cards:** Dina, Soul Steeper; Witherbloom Apprentice; Blood Artist; Zulaport Cutthroat; Mortality Spear  
**UI language:** vitality turns into pressure  
**Animation cue:** drain-pulse

### 2. Pest Economy

Small bodies matter because they attack, block, die, feed sacrifice outlets, and trigger life gain.

**Signature cards:** Hunt for Specimens; Pest Summoning; Tend the Pests; Sedgemoor Witch; Pest Infestation  
**UI language:** tiny bodies become living currency  
**Animation cue:** pest-mote-swarm

### 3. Body Ledger Aristocrats

Creature death is not a failure state; it is the engine.

**Signature cards:** Plumb the Forbidden; Deadly Brew; Viscera Seer; Moldervine Reclamation; Mazirek, Kraul Death Priest  
**UI language:** every death enters the ledger  
**Animation cue:** sacrifice-flicker

### 4. Cauldron Biology

Food, potions, herbs, Pests, and bodily essence make the deck feel like field science and folk magic.

**Signature cards:** Gyome, Master Chef; Pestilent Cauldron; Accomplished Alchemist; Infuse with Vitality; Essence Infusion  
**UI language:** the lab is alive  
**Animation cue:** cauldron-vapor

### 5. Growth from Life Change

Life-total movement becomes counters, bodies, and combat pressure.

**Signature cards:** Blood Researcher; Lisette, Dean of the Root; Willowdusk, Essence Seer; Blossoming Bogbeast; Trudge Garden  
**UI language:** life movement becomes mass  
**Animation cue:** spore-bloom

### 6. Compost Recursion

The graveyard is not just death; it is soil, memory, and future material.

**Signature cards:** Blex, Vexing Pest; Search for Blex; Veinwitch Coven; Yedora, Grave Gardener; Sproutback Trudge  
**UI language:** the grave feeds the next organism  
**Animation cue:** root-lattice

## Motif Dictionary

### Visual

- bog
- roots
- moss
- spores
- cauldron
- herbarium labels
- glowing Pests
- bone-white field notes
- bloodsap

### Verbs

- brew
- steep
- tend
- feed
- harvest
- cull
- infuse
- plumb
- trudge
- reclaim
- fester
- blossom

### Nouns

- essence
- Pest
- cauldron
- bog
- specimen
- tincture
- root
- fungus
- blood
- compost
- ledger

## Placement Copy Blocks

### Short

You read as **Witherbloom**: practical, loyal, earthy, and dangerous when life starts moving.

### Medium

Witherbloom treats life and death as one messy exchange system. You look for what is being fed, what is being spent, and what can grow from the cost.

### Deep

This placement is not just black-green recursion. It is biology as strategy: Pests, potions, life gain, sacrifice, rot, protection, and pressure. Witherbloom sees the battlefield as an ecosystem where every body has a future use.

## Maze Query Templates

| Name | Query |
|---|---|
| Life Drain | `ci:bg (o:"gain life" OR o:"each opponent loses" OR o:"whenever you gain life")` |
| Pest Economy | `ci:bg (t:pest OR o:pest OR o:token) (o:dies OR o:sacrifice OR o:"gain life")` |
| Body Ledger | `ci:bg (o:sacrifice OR o:dies) (o:draw OR o:"gain life" OR o:"each opponent loses")` |
| Cauldron / Food | `ci:bg (o:food OR o:cauldron OR o:lifegain OR o:"gain life")` |
| Compost Recursion | `ci:bg (o:graveyard OR o:return) (o:creature OR o:permanent)` |

## Guardrails

Do:
- keep Witherbloom earthy, bodily, practical, and alive
- show death as conversion, not just horror
- make Pests useful without making them cartoon bugs
- connect sacrifice to life movement, Food, Pests, or biology
- separate Witherbloom from generic Golgari

Do not:
- make it pure graveyard recursion
- make it clean forest druid magic
- make it generic necromancy
- make it villain-only
- erase the Strixhaven academic/field-study layer
