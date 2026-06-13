# Silverquill Narrative Taxonomy

**Identity:** Silverquill College
**Core axiom:** Words are weapons, shields, contracts, applause, and verdicts; the winning line changes status in public.
**Primary tension:** uplift versus humiliation; leadership as protection versus influence as domination.
**Vox Mana placement mode:** You read the world as a room full of claims, reputations, obligations, and vulnerable speakers. The right action is to choose the line that changes status in public.

---

## 1. High-Level Read

Silverquill is not simply “Orzhov,” “taxes,” “aristocrats,” or “black-white goodstuff.”

Silverquill is the white-black worldview where:

- words are weapons and shields
- status is a battlefield resource
- praise and humiliation both leave marks
- ink can become a body, a signature, or a verdict
- social pressure can redirect combat
- life, cards, counters, promises, and reputation are all forms of leverage

The Silverquill player does not ask:

> How do I lock the table under black-white taxes?

They ask:

> What line changes who has power in this room?

---

## 2. Core Narrative Axes

| Axis | Narrative Question | Mechanical Expression | UI/Copy Signal |
|---|---|---|---|
| Word-Magic as Force | When does language become a weapon or shield? | targeted spells, protection tricks, removal, modal commands | “say the line that changes the room” |
| Status Counters | How does reputation become visible? | +1/+1 counters, counter transfer, rank marks, Tenured Inkcaster | “mark the speaker” |
| Inkling Materialization | When does a thought become a flying body? | Inkling tokens, Inkshield, Dramatic Finale, Felisa | “ink takes wing” |
| Public Verdict | Who gets the final word? | Vanishing Verse, Closing Statement, Promise of Loyalty, Silverquill Command | “drop the verdict line” |
| Political Combat | Can the table be convinced to fight somewhere else? | Breena, Combat Calligrapher, goad, attack deterrence | “redirect the audience” |
| Life as Applause or Cost | What does influence cost? | lifelink, drain, Stinging Study, Tenured Inkcaster | “spend life, gain leverage” |
| Uplift versus Humiliation | Is the speech protective or cruel? | Shaile // Embrose, Humiliate, Guiding Voice, Exhilarating Elocution | “praise or cut” |

---

## 3. Archetypal Roles

### 3.1 The Ink Duelist

**Drive:** turn precise targeting into tempo and combat pressure.
**Cards:** Killian, Ink Duelist, Killian’s Confidence, Masterful Flourish, Guiding Voice.
**Narrative line:** “The right word is cheaper when it names exactly who it is meant to change.”

Use for:

- target-matter recommendations
- cheap spell panels
- duel-flavored commander paths

### 3.2 The Demagogue

**Drive:** make the table perform the pressure for you.
**Cards:** Breena, the Demagogue, Combat Calligrapher, Cunning Rhetoric, Promise of Loyalty.
**Narrative line:** “The strongest speaker does not always attack; sometimes they aim the audience.”

Use for:

- political combat
- multiplayer social-pressure copy
- goad/attack-deterrent links

### 3.3 The Inkling Court

**Drive:** turn death, defense, or spectacle into flying ink bodies.
**Cards:** Inkshield, Dramatic Finale, Felisa, Fang of Silverquill, Blot Out the Sky.
**Narrative line:** “The idea survives because it takes wing after the body falls.”

Use for:

- token panels
- death-to-token loops
- Inkling animation states

### 3.4 The Dean’s Split

**Drive:** teach through radiance, shadow, praise, and punishment.
**Cards:** Shaile, Dean of Radiance // Embrose, Dean of Shadow, Nils, Discipline Enforcer, Humiliate, Exhilarating Elocution.
**Narrative line:** “Silverquill pedagogy asks whether the student needs encouragement or a scar.”

Use for:

- identity panels
- mentor/discipline cards
- counter-as-status sections

### 3.5 The Final Word

**Drive:** use removal and modal authority as rhetorical closure.
**Cards:** Vanishing Verse, Closing Statement, Silverquill Command, Moment of Reckoning.
**Narrative line:** “A verdict is a sentence that changes who remains in the conversation.”

Use for:

- interaction recommendations
- modal spell UI
- verdict keyframes

### 3.6 The Brokered Promise

**Drive:** convert obligation, promises, and resources into influence.
**Cards:** Fain, the Broker, Scholarship Sponsor, Scriv, the Obligator, Silverquill, the Disputant.
**Narrative line:** “Every promise creates leverage; every leverage point asks for payment.”

Use for:

- resource conversion
- current SOS anchors
- contract/obligation copy

---

## 4. Anti-Drift Rules

| Drift | Correction |
|---|---|
| Generic Orzhov taxes | Tie taxes and deterrents to rhetoric, status, obligation, or public cost. |
| Generic aristocrats | When death matters, show what the death writes: Inklings, counters, applause, or verdicts. |
| Azorius law/control | Silverquill constrains socially and rhetorically; it does not build a bureaucracy. |
| Rakdos performance | Silverquill performance is controlled, elite, and persuasive, not chaotic spectacle. |
| Flat black-white UI | Use ink, parchment, silver, plum, stage light, and calligraphic motion. |

---

## 5. Recommended Maze Query Families

Use these as friendly labels before exposing raw operators:

| User-Facing Label | Query Intent |
|---|---|
| Inkling Court | `ci=wb (o:Inkling OR t:Inkling OR o:token)` |
| Status Counters | `ci=wb (o:+1/+1 OR o:counter) (o:dies OR o:attack OR o:draw)` |
| Rhetorical Removal | `ci=wb (o:exile OR o:destroy) t:instant` |
| Political Combat | `ci=wb (o:goad OR o:attack OR o:opponent)` |
| Aura Influence | `ci=wb (o:Aura OR t:Aura OR o:enchantment) commander` |
| Drain and Applause | `ci=wb (o:lose life OR o:gain life OR o:lifelink)` |

---

## 6. Copy Bank

- “Ink takes wing.”
- “The final word changes the board.”
- “Status is a counter you can spend.”
- “Praise protects. Humiliation sharpens.”
- “The table does not need to obey you if it can be persuaded to perform.”
- “Every promise creates leverage.”
