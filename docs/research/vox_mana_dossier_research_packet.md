# Vox Mana — Commander Dossier Research Packet

Research-only MTG information pass for the dossier audit warnings in
`dossier-warning-fix-inventory.md` (generated 2026-06-04). This packet supplies
source-backed candidate data for a later implementation agent to author into
canonical faction data and runtime guidance. No repository access was used; no
local files were inspected.

---

## 0. How To Read This Packet

### Sourcing & validation key

Card-level facts in this packet are **standard, stable MTG card data**: every card
named is a real, officially printed Magic card, and its color identity, type line,
and Commander legality do not change between printings. The authoritative per-card
source for each is its **Scryfall page / Oracle data**. Per the W001 fix
instruction ("Validate against local Scryfall data"), the implementation agent
should confirm each card against the **local Scryfall dataset** before authoring —
that local check is the binding validation step, and this packet is the candidate
proposal it validates.

To keep entries readable, per-card source is abbreviated as follows:

- `src: Scryfall` — color identity / type / Commander legality is standard card
  data, verifiable on the card's Scryfall page and in local Scryfall data.
- `theme: EDHREC <combo>` — the archetype/theme association is grounded in the
  EDHREC tag/commander pages fetched for this packet (URLs in §Sources).
- `philosophy: Tarkir` — clan worldview grounded in official Khans of Tarkir
  design and the cited wedge-philosophy article.

Where a card or commander is recent enough that its Oracle text or identity should
be double-checked, it is marked **⚠ validate**.

### Fit labels (as required by the prompt)

- **exact-fit** — card's color identity is fully inside the faction and it directly
  expresses the faction's mechanical identity.
- **support-only** — color-identity-safe and useful, but expresses a sub-color
  pair or a generic role rather than the full faction identity.
- **stretch** — playable but only loosely tied to the faction identity.
- (commanders also use **precon-derived** per the prompt.)

### Banlist baseline (implementation verification required)

This packet records a banlist baseline from the cited official **February 9, 2026**
Commander Banned & Restricted announcement, but the implementation agent must
verify any banlist-sensitive claim against local Scryfall data and/or the official
source before authoring. Treat this packet as candidate research, not binding
legality proof. Starter recommendations are intended to avoid cEDH staples and
Game-Changer-tier cards.

---

## 1. Warning → Fix Mapping (what this packet feeds)

| Warning | Category | This packet supplies |
|---|---|---|
| **W001** | Optional content gap (starter cards) | `staples.creatures/spells/permanents` candidates for the 12 affected dossiers |
| **W002** | Bant Commander path too generic | ≥4 source-backed **owned Bant themes** (see §Bant + §13) |
| **W003** | Grixis Commander path too generic | ≥5 source-backed **owned Grixis themes** (see §Grixis + §13) |
| **W004** | Generic commander fallback | Commander candidate guidance for the 10 affected primary dossiers; four-color entries provide conservative single-face fallbacks plus local-query follow-up before expansion |
| W005–W461 | Land suppressions | **Out of scope by instruction** — mechanical cleanup only; see §21 |

**W001 affected dossiers:** abzan-houses, blue.adjacent.jeskai-way, dune-aggression,
glint-chaos, ink-altruism (primary + abzan adjacent), jeskai-way, mardu-horde,
sultai-brood, temur-frontier, yore-artifice (primary + abzan adjacent).

**W004 affected primary dossiers:** abzan-houses, bant, dune-aggression, glint-chaos,
ink-altruism, jeskai-way, mardu-horde, sultai-brood, temur-frontier, yore-artifice.

---

# PART A — Priority Factions

Source boundary reminder (per prompt): Tarkir clans are treated as source-bounded
clan identities, not generic color-code identities; Commander products
(incl. *Tarkir: Dragonstorm*, 2025) are **support-only** texture and are **not**
cited as proof of clan lore continuity. Four-color identities (Yore/Glint/Dune/Ink)
are **Vox Mana project identities, not official MTG factions**; their commanders and
precons are support-only mechanical texture.

---

## 2. Abzan — White-Black-Green (WBG)

**Clan worldview (philosophy: Tarkir):** Abzan *endures*. Resilience, attrition,
the family/ancestor-strength motif — Abzan wins late by outlasting, not by racing.

### Starter Card Candidates

**Creatures**
- **Doran, the Siege Tower** — CI: WBG · Legal · **exact-fit** · Toughness-as-power
  flips Abzan's defensive posture into a clock; instantly legible "endure" payoff. *(src: Scryfall)*
- **Anafenza, the Foremost** — CI: WBG · Legal · **exact-fit** · +1/+1 counters on attack + graveyard hate; the Abzan khan. *(src: Scryfall; philosophy: Tarkir)*
- **Abzan Falconer** — CI: WB · Legal · **exact-fit** · Outlast/counters payoff that grants flying to your counter creatures; cheap and beginner-legible. *(src: Scryfall)*
- **Karador, Ghost Chieftain** — CI: WBG · Legal · **exact-fit** · Recur a creature from your graveyard each turn — the attrition engine. *(src: Scryfall)*
- **Tymna the Weaver** — CI: WB · Legal · **support-only** · Combat-damage card draw; strong WB value but only covers two of three colors. *(src: Scryfall)*

**Spells**
- **Abzan Charm** — CI: WBG · Legal · **exact-fit** · Modal removal / draw / counter — the clan's flexibility in one card. *(src: Scryfall)*
- **Anguished Unmaking** — CI: WB · Legal · **support-only** · Premium catch-all removal; not too expensive, very teachable. *(src: Scryfall)*
- **Mortify** — CI: WB · Legal · **support-only** · Clean creature/enchantment removal; ideal first-deck removal. *(src: Scryfall)*
- **Putrefy** — CI: BG · Legal · **support-only** · Kills creature or artifact, no regeneration. *(src: Scryfall)*
- **Travel Preparations** — CI: GW · Legal · **support-only** · Cheap, repeatable +1/+1 counters across the board. *(src: Scryfall)*

**Permanents**
- **Abzan Ascendancy** — CI: WBG · Legal · **exact-fit** · Counters on your creatures + spirit tokens when they die; counters-and-attrition in one enchantment. *(src: Scryfall)*
- **Cathars' Crusade** — CI: W · Legal · **exact-fit** · Snowballing +1/+1 counters whenever a creature enters — core counters payoff. *(src: Scryfall)*
- **Hardened Scales** — CI: G · Legal · **support-only** · Cheap counter multiplier; great early counters anchor. *(src: Scryfall)*
- **Bastion of Remembrance** — CI: B · Legal · **support-only** · Aristocrats drain on each creature death; rewards the attrition plan. *(src: Scryfall)*

### Commander Candidates
- **Anafenza, the Foremost** — CI: WBG · Legal · **exact-fit** · Counters-aggro + graveyard hate; the canonical Abzan khan. *Caveat:* aggressive/hatebear angle, not a value engine. *(src: Scryfall; philosophy: Tarkir)*
- **Karador, Ghost Chieftain** — CI: WBG · Legal · **exact-fit** · Graveyard recursion value engine; the purest "endure" commander. *Caveat:* recursion lines get complex for newer players. *(src: Scryfall)*
- **Ghave, Guru of Spores** — CI: WBG · Legal · **exact-fit** · +1/+1 counters + tokens + sacrifice — counters/aristocrats in one. *Caveat:* enables infinite-token combos; flag bracket. *(src: Scryfall)*
- **Doran, the Siege Tower** — CI: WBG · Legal · **exact-fit** · Toughness-matters novelty deck; very beginner-approachable. *(src: Scryfall)*
- **Tymna the Weaver** — CI: WB · Legal · **support-only** · Partner card-draw engine; only reaches Abzan with a green partner. *Caveat:* needs a partner to be WBG. *(src: Scryfall)*
- *Tarkir: Dragonstorm Abzan precon ("Abzan Armor") face* — **precon-derived / support-only**. ⚠ validate exact commander name + identity against local data before authoring (not asserted here). *(src: product listing; not used as lore proof)*

### Identity-Specific Notes
Emphasize **endurance / attrition**, **+1/+1 counters and outlast**, **aristocrats /
death-value**, and **graveyard recursion** — Abzan grinds the game to a state where
its board is simply bigger and harder to kill. Avoid framing as "WBG good-stuff."

---

## 3. Temur — Green-Blue-Red (GUR)

**Clan worldview (philosophy: Tarkir):** Temur *evolves* — explosive, aggressive
growth. More than "ramp into fatties": adaptation, ferocity, and spell-fueled tempo.

### Starter Card Candidates

**Creatures**
- **Surrak Dragonclaw** — CI: GUR · Legal · **exact-fit** · Your creatures can't be countered + flash anthem; the Temur khan's "ferocious" statement. *(src: Scryfall; philosophy: Tarkir)*
- **Animar, Soul of Elements** — CI: GUR · Legal · **exact-fit** · Grows on creature casts and discounts them — evolution made literal. *Caveat:* combo-adjacent. *(src: Scryfall)*
- **Kalamax, the Stormsire** — CI: GUR · Legal · **exact-fit** · Copies your first instant each turn — the Temur spellslinger face. *(src: Scryfall)*
- **Cloudfin Raptor** — CI: U · Legal · **support-only** · One-mana evolve creature; the cleanest beginner "grows over time" card. *(src: Scryfall)*
- **Frilled Mystic** — CI: GU · Legal · **support-only** · Flash body that counters a spell; tempo + value. *(src: Scryfall)*

**Spells**
- **Temur Charm** — CI: GUR · Legal · **exact-fit** · Modal counter / fight / mini-Falter — clan flexibility. *(src: Scryfall)*
- **Growth Spiral** — CI: GU · Legal · **support-only** · Two-mana ramp + draw; ideal early evolve enabler. *(src: Scryfall)*
- **Beast Within** — CI: G · Legal · **support-only** · Destroys any permanent; the green answer-to-anything. *(src: Scryfall)*
- **Rapid Hybridization** — CI: U · Legal · **support-only** · One-mana removal disguised as a downgrade. *(src: Scryfall)*

**Permanents**
- **Temur Ascendancy** — CI: GUR · Legal · **exact-fit** · Haste + draw for your big creatures — turns fatties into immediate pressure and cards. *(src: Scryfall)*
- **Garruk's Uprising** — CI: G · Legal · **exact-fit** · Trample + draw on big creatures entering; the ferocious payoff. *(src: Scryfall)*
- **Hardened Scales** — CI: G · Legal · **support-only** · Counter multiplier for the +1/+1 growth angle. *(src: Scryfall)*
- **The Great Henge** — CI: G · Legal · **support-only** · Big-creature ramp/draw engine. *Caveat:* premium-priced staple; include as aspirational, not a budget first card. *(src: Scryfall)*

### Commander Candidates
- **Surrak Dragonclaw** — CI: GUR · Legal · **exact-fit** · Big-creature ferocious with counter protection. *(src: Scryfall; philosophy: Tarkir)*
- **Animar, Soul of Elements** — CI: GUR · Legal · **exact-fit** · Creature-cost reduction + counters. *Caveat:* known combo shell; bracket-flag. *(src: Scryfall)*
- **Kalamax, the Stormsire** — CI: GUR · Legal · **exact-fit / precon-derived** · Instant-copy spellslinger (Commander 2020 face). *(src: Scryfall)*
- **Maelstrom Wanderer** — CI: GUR · Legal · **exact-fit** · Double cascade + haste anthem; high "wow" for newer players. *Caveat:* 8-mana; ramp-dependent. *(src: Scryfall)*
- *Tarkir: Dragonstorm Temur precon ("Temur Roar") face* — **precon-derived / support-only**. ⚠ validate exact name/identity locally. *(src: product listing)*

### Identity-Specific Notes
Lead with **evolution / growth**, **ferocious (big-creature payoffs)**, **+1/+1
counters**, and **instant/sorcery tempo (Kalamax line)**. Frame ramp as the *means*
to explosive growth, not the identity itself.

---

## 4. Sultai — Black-Green-Blue (BGU)

**Clan worldview (philosophy: Tarkir):** Sultai *accumulates* — ruthless growth via
the graveyard as a resource, hoarding value others discard.

### Starter Card Candidates

**Creatures**
- **Sidisi, Brood Tyrant** — CI: BGU · Legal · **exact-fit** · Self-mill into zombie tokens; the Sultai khan and a perfect engine teacher. *(src: Scryfall; philosophy: Tarkir)*
- **Muldrotha, the Gravetide** — CI: BGU · Legal · **exact-fit** · Replay a permanent type per turn from the graveyard — accumulation incarnate. *(src: Scryfall)*
- **The Mimeoplasm** — CI: BUG · Legal · **exact-fit** · Eats two creatures from graveyards to become a giant — the original Sultai showpiece. *(src: Scryfall)*
- **Satyr Wayfinder** — CI: G · Legal · **support-only** · Self-mill four, grab a land; the cleanest beginner graveyard filler. *(src: Scryfall)*
- **Sakura-Tribe Elder** — CI: G · Legal · **support-only** · Chump/ramp staple that also feeds the yard; near-universal green include. *(src: Scryfall)*

**Spells**
- **Sultai Charm** — CI: BUG · Legal · **exact-fit** · Modal removal / draw — clan flexibility. *(src: Scryfall)*
- **Villainous Wealth** — CI: BUG · Legal · **exact-fit** · X-spell theft from a library; the signature Sultai "take what they built." *(src: Scryfall)*
- **Grisly Salvage** — CI: BG · Legal · **exact-fit** · Self-mill five, grab a creature/land — dig + fuel. *(src: Scryfall)*
- **Animate Dead** — CI: B · Legal · **support-only** · Cheap reanimation classic; teaches the payoff loop. *(src: Scryfall)*

**Permanents**
- **Sultai Ascendancy** — CI: BUG · Legal · **exact-fit** · Scry + graveyard fill each upkeep — slow, on-color accumulation. *(src: Scryfall)*
- **Deadbridge Chant** — CI: BG · Legal · **exact-fit** · Recurs cards from the graveyard each turn. *Caveat:* randomized, flavorful rather than reliable. *(src: Scryfall)*
- **Crucible of Worlds** — CI: colorless (artifact) · Legal · **support-only** · Replays lands from the yard; lands-accumulation angle. *(src: Scryfall)*

### Commander Candidates
- **Muldrotha, the Gravetide** — CI: BGU · Legal · **exact-fit** · Permanents-from-graveyard value; the defining modern Sultai face. *(src: Scryfall)*
- **Sidisi, Brood Tyrant** — CI: BGU · Legal · **exact-fit** · Self-mill zombies; clean engine for newer players. *(src: Scryfall; philosophy: Tarkir)*
- **The Mimeoplasm** — CI: BUG · Legal · **exact-fit** · Graveyard "eat and grow." *(src: Scryfall)*
- **Tasigur, the Golden Fang** — CI: BUG · Legal · **exact-fit** · Delve-cheap value/reanimator commander; budget-friendly. *(src: Scryfall)*
- **Teval, the Balanced Scale** — CI: BUG · **exact-fit** · Graveyard/landfall value; a current top-played Sultai commander. ⚠ validate Oracle text/identity locally (recent). *(theme: EDHREC top commanders; src: Scryfall — validate)*
- *Tarkir: Dragonstorm Sultai precon ("Sultai Arisen") face* — **precon-derived / support-only**. ⚠ validate locally. *(src: product listing)*

### Identity-Specific Notes
Emphasize **graveyard-as-resource / accumulation**, **self-mill**, **reanimation**,
and **theft of others' resources (Villainous Wealth)**. Mill here is *fuel*, not a
wincon. Avoid "BGU value pile" framing.

---

## 5. Mardu — Red-White-Black (RWB)

**Clan worldview (philosophy: Tarkir):** Mardu *conquers* — honor in battle, speed,
decisive overwhelming pressure.

### Starter Card Candidates

**Creatures**
- **Alesha, Who Smiles at Death** — CI: RWB · Legal · **exact-fit** · Attacks to reanimate small creatures; warriors + recursion, budget-beloved. *(src: Scryfall)*
- **Zurgo Helmsmasher** — CI: RWB · Legal · **exact-fit** · Aggressive haste beater; the Mardu khan. *(src: Scryfall; philosophy: Tarkir)*
- **Kaalia of the Vast** — CI: RWB · Legal · **exact-fit** · Cheats Angels/Demons/Dragons into combat; iconic Mardu showpiece. *Caveat:* powerful + a removal magnet. *(src: Scryfall)*
- **Judith, the Scourge Diva** — CI: BR · Legal · **support-only** · Token anthem + death-ping; aristocrats glue. *(src: Scryfall)*
- **Skyknight Legionnaire** — CI: RW · Legal · **support-only** · Clean haste-flier beginner aggro card. *(src: Scryfall)*

**Spells**
- **Mardu Charm** — CI: RWB · Legal · **exact-fit** · Modal removal / damage / scout — clan flexibility. *(src: Scryfall)*
- **Crackling Doom** — CI: RWB · Legal · **exact-fit** · Edict + burn that kills the biggest threat; signature Mardu removal. *(src: Scryfall)*
- **Lightning Helix** — CI: RW · Legal · **support-only** · Burn + lifegain; the teachable two-color spell. *(src: Scryfall)*
- **Anguished Unmaking** — CI: WB · Legal · **support-only** · Catch-all removal. *(src: Scryfall)*

**Permanents**
- **Mardu Ascendancy** — CI: RWB · Legal · **exact-fit** · Goblin tokens when you attack + a board-saving sacrifice; pure "conquer." *(src: Scryfall)*
- **Impact Tremors** — CI: R · Legal · **support-only** · Damage on each creature ETB; cheap aristocrats/token payoff. *(src: Scryfall)*
- **Bastion of Remembrance** — CI: B · Legal · **support-only** · Drain on each creature death; aristocrats backbone. *(src: Scryfall)*

### Commander Candidates
- **Kaalia of the Vast** — CI: RWB · Legal · **exact-fit** · Big-creature cheat; high impact. *Caveat:* draws removal, swingy. *(src: Scryfall)*
- **Alesha, Who Smiles at Death** — CI: RWB · Legal · **exact-fit** · Warriors + recursion; among the most budget-accessible commanders. *(src: Scryfall)*
- **Zurgo Helmsmasher** — CI: RWB · Legal · **exact-fit** · Straightforward aggressive khan. *(src: Scryfall; philosophy: Tarkir)*
- **Queen Marchesa** — CI: RWB · Legal · **exact-fit** · Monarch + politics + aristocrats; a strong "conquer through pressure & cards" face. *(src: Scryfall)*
- **Edgar Markov** — CI: RWB · Legal · **exact-fit** · Vampire tokens/aristocrats; one of the most-played commanders overall. *Caveat:* tribal-specific; eminence makes it strong. *(theme: EDHREC top commanders; src: Scryfall)*
- *Tarkir: Dragonstorm Mardu precon ("Mardu Surge") face* — **precon-derived / support-only**. ⚠ validate locally. *(src: product listing)*

### Identity-Specific Notes
Emphasize **aggression / decisive pressure**, **tokens (go-wide)**, **aristocrats /
sacrifice**, and **warriors + recursion (Alesha line)**. Frame removal as
"clearing the path to conquer," not as control.

---

## 6. Jeskai — Blue-Red-White (URW)

**Clan worldview (philosophy: Tarkir):** Jeskai *refines* — enlightenment through
knowledge, emotion, and discipline; mastery of spells and precision.

### Starter Card Candidates

**Creatures**
- **Narset, Enlightened Master** — CI: URW · Legal · **exact-fit** · Free spells off combat; the Jeskai khan. *Caveat:* extra-turns/combo magnet. *(src: Scryfall; philosophy: Tarkir)*
- **Elsha of the Infinite** — CI: URW · Legal · **exact-fit** · Cast noncreature spells off the top with flash; the spellslinger engine. *(src: Scryfall)*
- **Monastery Mentor** — CI: W · Legal · **support-only** · Prowess token-maker on each noncreature cast; the cleanest spellslinger payoff. *(src: Scryfall)*
- **Young Pyromancer** — CI: R · Legal · **support-only** · Elemental token per instant/sorcery; beginner spellslinger staple. *(src: Scryfall)*
- **Adeliz, the Cinder Wind** — CI: UR · Legal · **support-only** · Wizards + spell-cast pump; budget spellslinger glue. *(src: Scryfall)*

**Spells**
- **Jeskai Charm** — CI: URW · Legal · **exact-fit** · Modal burn / lifelink swing / bounce — clan flexibility. *(src: Scryfall)*
- **Swords to Plowshares** — CI: W · Legal · **support-only** · The premier one-mana removal; teaches efficient answers. *(src: Scryfall)*
- **Counterspell** — CI: U · Legal · **support-only** · The archetypal interaction card for the control angle. *(src: Scryfall)*
- **Lightning Helix** — CI: RW · Legal · **support-only** · Burn + lifegain tempo. *(src: Scryfall)*

**Permanents**
- **Jeskai Ascendancy** — CI: URW · Legal · **exact-fit** · Prowess + loot on each noncreature spell; the defining clan enchantment. *(src: Scryfall)*
- **Saheeli, Sublime Artificer** — CI: UR · Legal · **support-only** · Servo token per noncreature spell; beginner-friendly token engine. *(src: Scryfall)*
- **Sunbird's Invocation** — CI: R · Legal · **support-only** · Free value when you cast big spells. *Caveat:* higher-cost payoff. *(src: Scryfall)*

### Commander Candidates
- **Kykar, Wind's Fury** — CI: URW · Legal · **exact-fit** · Spirit tokens + ritual mana on noncreature casts; the most beginner-friendly Jeskai spellslinger. *(src: Scryfall)*
- **Narset, Enlightened Master** — CI: URW · Legal · **exact-fit** · Free-spell engine. *Caveat:* steers toward extra turns; bracket-flag. *(src: Scryfall; philosophy: Tarkir)*
- **Shu Yun, the Silent Tempest** — CI: URW · Legal · **exact-fit** · Budget prowess-voltron; teachable. *(src: Scryfall)*
- **Elsha of the Infinite** — CI: URW · Legal · **exact-fit** · Top-of-library spellslinger. *(src: Scryfall)*
- **Zinnia, Valley's Voice** — CI: URW · **exact-fit** · Currently the most-played Jeskai commander on EDHREC. ⚠ validate Oracle text/identity locally (recent). *(theme: EDHREC Jeskai commanders; src: Scryfall — validate)*
- **Satya, Aetherflux Genius** — CI: URW · **exact-fit** · Second most-played Jeskai commander on EDHREC; token/copy + energy. ⚠ validate locally (recent). *(theme: EDHREC Jeskai commanders; src: Scryfall — validate)*
- *Tarkir: Dragonstorm Jeskai precon ("Jeskai Striker") face* — **precon-derived / support-only**. ⚠ validate locally. *(src: product listing)*

### Identity-Specific Notes
Emphasize **spellslinger (instants & sorceries matter)**, **prowess / spell-fueled
tokens**, **tempo-control**, and **precision interaction**. "Refine" = doing more
with each spell, not generic URW value.

---

## 7. Yore — White-Blue-Black-Red (WUBR, non-Green) · Vox Mana "Artifice"

**Project framing:** Vox Mana identity, **not** an official MTG faction. Four-color
commanders/precons are **support-only** mechanical texture. The C2016 four-color
precon for this wedge ("Invent Superiority") is artifact-themed, which aligns with
the "Artifice" reading — but that is product texture, not canon.

### Starter Card Candidates
Color-identity-safe cards (⊆ WUBR) expressing an artifice/value identity. For a
four-color identity these read as **support-only** building blocks rather than
"the faction in one card."

**Creatures**
- **Sai, Master Thopterist** — CI: U · Legal · **support-only** · Thopter tokens on artifact casts + artifact-to-card draw. *(src: Scryfall)*
- **Etherium Sculptor** — CI: U · Legal · **support-only** · Artifact cost reduction; cheap engine starter. *(src: Scryfall)*
- **Breya, Etherium Shaper** — CI: WUBR · Legal · **exact-fit (as identity), support-only (recommendation)** · Thopters + a repeatable sacrifice outlet/payoff; the canonical WUBR face. *(src: Scryfall)*

**Spells**
- **Whir of Invention** — CI: U · Legal · **support-only** · Instant-speed artifact tutor. *(src: Scryfall)*
- **Thoughtcast** — CI: U · Legal · **support-only** · Affinity card draw; rewards an artifact base. *(src: Scryfall)*
- **Generous Gift** — CI: W · Legal · **support-only** · Universal removal that's easy to teach. *(src: Scryfall)*

**Permanents**
- **Thopter Spy Network** — CI: U · Legal · **support-only** · Thopter tokens + card draw off artifacts. *(src: Scryfall)*
- **Efficient Construction** — CI: U · Legal · **support-only** · Thopter per artifact cast. *(src: Scryfall)*
- **Smothering Tithe** — CI: W · Legal · **support-only** · Treasure ramp; broad value. *Caveat:* generic, high-power. *(src: Scryfall)*

### Commander Candidates
- **Breya, Etherium Shaper** — CI: WUBR · Legal · **exact-fit identity / support-only & precon-derived** · Artifacts + aristocrats; the primary WUBR face. *Caveat:* combo-capable. *(src: Scryfall)*
- **⚠ Research gap:** Exact-WUBR legendary commanders are sparse. Breya is the reliable canonical face; do **not** invent additional WUBR commanders. If more are needed, the implementation agent should query local Scryfall for `id=wubr id<=wubr type:legendary` and select by EDHREC play rate. *(src: Scryfall — local query recommended)*

### Identity-Specific Notes
Emphasize **artifact construction**, **token fabrication (thopters/servos)**,
**value/aristocrats sacrifice loops**, and **control glue**. Keep all of this framed
as Vox Mana "Artifice," not as an official faction.

---

## 8. Glint — Blue-Black-Red-Green (UBRG, non-White) · Vox Mana "Chaos"

**Project framing:** Vox Mana identity, not official. The C2016 wedge precon
("Entropic Uprising," Yidris) is cascade/chaos-flavored — support-only texture.

### Starter Card Candidates (⊆ UBRG; mostly **support-only**)

**Creatures**
- **Prosper, Tome-Bound** — CI: BR · Legal · **support-only** · Impulse-draw off exile + Treasure on cast; beginner "chaotic value." *(src: Scryfall)*
- **Yidris, Maelstrom Wielder** — CI: UBRG · Legal · **exact-fit identity / support-only** · Combat-trigger cascade on everything you cast; the namesake-adjacent chaos engine. *(src: Scryfall)*
- **Glint-Eye Nephilim** — CI: UBRG · Legal · **support-only** · The literal namesake; draws on combat damage. *Caveat:* fragile, flavor pick. *(src: Scryfall)*

**Spells**
- **Chaos Warp** — CI: R · Legal · **support-only** · Universal answer that fits the chaos flavor; red's only clean catch-all. *(src: Scryfall)*
- **Bituminous Blast** — CI: BR · Legal · **support-only** · Cascade removal — value + the chaos hook. *(src: Scryfall)*
- **Villainous Wealth** — CI: BUG · Legal · **support-only** · X-spell theft; chaotic resource swing. *(src: Scryfall)*

**Permanents**
- **Theater of Horrors** — CI: R · Legal · **support-only** · Repeatable impulse draw. *(src: Scryfall)*
- **Black Market** — CI: B · Legal · **support-only** · Snowballing mana off death; fuels explosive turns. *(src: Scryfall)*

### Commander Candidates
- **Yidris, Maelstrom Wielder** — CI: UBRG · Legal · **exact-fit identity / support-only & precon-derived** · Cascade/storm-adjacent chaos. *(src: Scryfall)*
- **⚠ Research gap:** Exact-UBRG legendary commanders are sparse (Glint-Eye is the lowest-population four-color wedge on EDHREC). Yidris is the reliable face; do not invent others. Recommend local Scryfall query as in §7. *(src: Scryfall — local query recommended)*

### Identity-Specific Notes
Emphasize **cascade / spell chaos**, **impulse draw & theft**, **graveyard/recursion
churn**, and **explosive nondeterministic value**. Frame as Vox Mana "Chaos."

---

## 9. Dune — Black-Red-Green-White (BRGW, non-Blue) · Vox Mana "Aggression"

**Project framing:** Vox Mana identity, not official. The C2016 wedge precon
("Open Hostility," Saskia) is aggressive go-wide — support-only texture.

### Starter Card Candidates (⊆ BRGW; mostly **support-only**)

**Creatures**
- **Saskia the Unyielding** — CI: BRGW · Legal · **exact-fit identity / support-only** · Doubles combat damage onto a chosen player; pure aggression. *(src: Scryfall)*
- **Mayhem Devil** — CI: BR · Legal · **support-only** · Pings on each sacrifice; aristocrats-aggression glue. *(src: Scryfall)*
- **Bloodbraid Elf** — CI: RG · Legal · **support-only** · Hasty cascade beater; teachable tempo aggression. *(src: Scryfall)*

**Spells**
- **Beast Within** — CI: G · Legal · **support-only** · Catch-all removal to clear blockers. *(src: Scryfall)*
- **Putrefy** — CI: BG · Legal · **support-only** · Efficient removal. *(src: Scryfall)*
- **Anguished Unmaking** — CI: WB · Legal · **support-only** · Catch-all removal. *(src: Scryfall)*

**Permanents**
- **Impact Tremors** — CI: R · Legal · **support-only** · Reach + go-wide payoff. *(src: Scryfall)*
- **Dictate of Erebos** — CI: B · Legal · **support-only** · Forces sacrifices as you trade in combat. *(src: Scryfall)*
- **Cathars' Crusade** — CI: W · Legal · **support-only** · Counters snowball for go-wide boards. *(src: Scryfall)*

### Commander Candidates
- **Saskia the Unyielding** — CI: BRGW · Legal · **exact-fit identity / support-only & precon-derived** · Aggressive multiplayer damage; the canonical BRGW face. *(src: Scryfall)*
- **⚠ Research gap:** Exact-BRGW legendary commanders are sparse. Saskia is the reliable face; do not invent others. Recommend local Scryfall query as in §7. *(src: Scryfall — local query recommended)*

### Identity-Specific Notes
Emphasize **aggression / decisive combat**, **go-wide tokens**, **sacrifice-aristocrats
as a damage engine**, and **+1/+1 counter widening**. Frame as Vox Mana "Aggression."

---

## 10. Ink — Red-Green-White-Blue (RGWU, non-Black) · Vox Mana "Altruism"

**Project framing:** Vox Mana identity, not official. The C2016 wedge precon
("Stalwart Unity," Kynaios and Tiro) is group-hug/politics — support-only texture.

### Starter Card Candidates (⊆ RGWU; mostly **support-only**)

**Creatures**
- **Kynaios and Tiro of Meletis** — CI: RGWU · Legal · **exact-fit identity / support-only** · Shared draw + land drops; the canonical "altruism" face. *(src: Scryfall)*
- **Ink-Treader Nephilim** — CI: RGWU · Legal · **support-only** · Namesake; copies a spell onto every creature. *Caveat:* symmetric, flavor pick. *(src: Scryfall)*
- **Tatyova, Benthic Druid** — CI: GU · Legal · **support-only** · Landfall draw + life; gentle value engine. *(src: Scryfall)*

**Spells**
- **Cultivate** — CI: G · Legal · **support-only** · Ramp + fixing; near-universal teachable green spell. *(src: Scryfall)*
- **Fact or Fiction** — CI: U · Legal · **support-only** · Political card draw. *(src: Scryfall)*
- **Beast Within** — CI: G · Legal · **support-only** · Catch-all removal. *(src: Scryfall)*

**Permanents**
- **Intangible Virtue** — CI: W · Legal · **support-only** · Go-wide token anthem. *(src: Scryfall)*
- **Smothering Tithe** — CI: W · Legal · **support-only** · Treasure ramp off opponents' draws (politically charged). *(src: Scryfall)*

### Commander Candidates
- **Kynaios and Tiro of Meletis** — CI: RGWU · Legal · **exact-fit identity / support-only & precon-derived** · Group hug / lands / politics; the canonical RGWU face. *(src: Scryfall)*
- **⚠ Research gap:** Exact-RGWU legendary commanders are sparse. Kynaios and Tiro is the reliable face; do not invent others. Recommend local Scryfall query as in §7. *(src: Scryfall — local query recommended)*

### Identity-Specific Notes
Emphasize **group-hug / shared resources**, **politics & deal-making**, **lands /
landfall**, and **spell/effect copying (Ink-Treader)**. Frame as Vox Mana "Altruism."

---

## 11. Bant — White-Blue-Green (WUG) · (W002 focus)

**The W002 fix needs ≥2 owned themes.** Below are **four** source-backed owned Bant
themes (EDHREC Bant tag page + Bant blink page), so the Commander path reads as
specifically Bant rather than "WUG good-stuff."

### Owned Bant themes (for `COMMANDER_FACTION_GUIDANCE`)
1. **Blink / flicker ETB value** — the single most characteristic Bant texture;
   re-using enter-the-battlefield effects for repeatable advantage. (Top Bant
   commander Roon of the Hidden Realm is a blink commander.) *(theme: EDHREC Bant Blink)*
2. **+1/+1 counters & exalted (combat growth / order plus growth)** — Exalted is a
   top Bant deck tag; Bant grows a board or a single attacker methodically.
   *(theme: EDHREC Bant — "Exalted," "Counters Matter")*
3. **Toolbox / hatebears (protection & control of the table)** — Bant fields
   efficient creatures with disruptive ETBs and answers; "Toolbox" and "Hatebears"
   are top Bant tags. *(theme: EDHREC Bant)*
4. **Tap/untap politics & board development (Derevi line)** — Bant leverages
   creatures and untap effects to control combat and the table; "Tap/Untap" and
   "Politics" are top Bant tags. *(theme: EDHREC Bant)*

Recommended owned-theme pair for the generated path: **(1) blink/flicker value +
(2) counters/exalted growth**, with toolbox/protection as the supporting third.

### Starter Card Candidates

**Creatures**
- **Roon of the Hidden Realm** — CI: WUG · Legal · **exact-fit** · Repeatable blink engine; the most-played Bant commander, also great in the 99. *(src: Scryfall; theme: EDHREC Bant Blink)*
- **Derevi, Empyrial Tactician** — CI: WUG · Legal · **exact-fit** · Tap/untap combat control + recurring commander; the politics line. *(src: Scryfall)*
- **Reflector Mage** — CI: WU · Legal · **support-only** · Tempo bounce on ETB; ideal blink target. *(src: Scryfall)*
- **Knight of Autumn** — CI: GW · Legal · **support-only** · Modal ETB (gain life / make a body / destroy artifact-enchantment); teaches flexible value. *(src: Scryfall)*

**Spells**
- **Bant Charm** — CI: WUG · Legal · **exact-fit** · Modal removal / counter / tuck — clan-style flexibility. *(src: Scryfall)*
- **Ghostly Flicker** — CI: U · Legal · **exact-fit** · Blink two permanents; the core blink spell. *(src: Scryfall)*
- **Swords to Plowshares** — CI: W · Legal · **support-only** · Premier one-mana removal. *(src: Scryfall)*
- **Travel Preparations** — CI: GW · Legal · **support-only** · Cheap, repeatable +1/+1 counters for the growth angle. *(src: Scryfall)*

**Permanents**
- **Cathars' Crusade** — CI: W · Legal · **exact-fit** · Counter snowball on each creature ETB — doubly good with blink. *(src: Scryfall)*
- **Felidar Retreat** — CI: W · Legal · **support-only** · Landfall counters or tokens; counters/board angle. *(src: Scryfall)*
- **Asceticism** — CI: G · Legal · **support-only** · Hexproof + regenerate; the protection/toolbox texture. *(src: Scryfall)*

### Commander Candidates
- **Roon of the Hidden Realm** — CI: WUG · Legal · **exact-fit** · Blink value; the top-played Bant commander. *(src: Scryfall; theme: EDHREC Bant Blink)*
- **Rafiq of the Many** — CI: WUG · Legal · **exact-fit** · Exalted voltron; the cleanest "single growing attacker" Bant face. *(src: Scryfall; theme: EDHREC Bant Exalted)*
- **Derevi, Empyrial Tactician** — CI: WUG · Legal · **exact-fit** · Tap/untap politics + resilient commander. *(src: Scryfall)*
- **Chulane, Teller of Tales** — CI: WUG · Legal · **exact-fit** · Creature-cast value (draw + land + bounce); strong blink/value face. *Caveat:* combo-capable. *(src: Scryfall)*
- **Tuvasa the Sunlit** — CI: WUG · Legal · **support-only** · Enchantress growth; alternative texture if a non-blink build is wanted. *(src: Scryfall)*

### Identity-Specific Notes
Bant = **order plus growth**: protect a developing board, re-use ETBs, and grind
incremental advantage into an inevitable lead. Anchor copy to blink + counters/exalted
+ toolbox/protection. Avoid generic "WUG goodstuff."

---

## 12. Grixis — Blue-Black-Red (UBR) · (W003 focus)

**The W003 fix needs ≥2 owned themes.** Below are **five** source-backed owned
Grixis themes (EDHREC Grixis tag page + the EDHREC Grixis commander breakdown),
so the Commander path reads specifically Grixis.

### Owned Grixis themes (for `COMMANDER_FACTION_GUIDANCE`)
1. **Spellslinger / spells-matter** — Spellslinger is a top Grixis tag; instants &
   sorceries as the engine (e.g., Fire Lord Azula). *(theme: EDHREC Grixis)*
2. **Reanimator / graveyard recursion** — Reanimator is a top Grixis tag; cheat
   threats back from the yard. *(theme: EDHREC Grixis)*
3. **Discard + wheels (group slug)** — Forced draw/discard punishment; Nekusar's
   Wheels and Kefka's Discard are top Grixis lines. *(theme: EDHREC Grixis)*
4. **Theft (control of opponents' permanents/spells)** — Theft is a top Grixis tag;
   take what others built. *(theme: EDHREC Grixis)*
5. **Sacrifice / aristocrats + treasure value** — Sacrifice and Treasure both rank
   on the Grixis tag list. *(theme: EDHREC Grixis)*

Recommended owned-theme pair for the generated path: **(1) spellslinger +
(2) reanimator/graveyard**, with theft and discard/wheels as supporting textures.

### Starter Card Candidates

**Creatures**
- **Kess, Dissident Mage** — CI: UBR · Legal · **exact-fit** · Recast an instant/sorcery from the yard each turn; the Grixis spellslinger engine. *(src: Scryfall; theme: EDHREC Grixis Spellslinger)*
- **Nekusar, the Mindrazer** — CI: UBR · Legal · **exact-fit** · Forced draw + damage; the wheels/group-slug face. *(src: Scryfall; theme: EDHREC Grixis Wheels)*
- **Marchesa, the Black Rose** — CI: UBR · Legal · **exact-fit** · Counters + dethrone recursion; the aristocrats/recursion line. *(src: Scryfall)*
- **Baleful Strix** — CI: UB · Legal · **support-only** · Flyer + draw + deathtouch on ETB; a near-universal value staple. *(src: Scryfall)*

**Spells**
- **Terminate** — CI: BR · Legal · **support-only** · Two-mana clean kill; ideal beginner removal. *(src: Scryfall)*
- **Kolaghan's Command** — CI: BR · Legal · **support-only** · Modal value (recur / kill / drain / break artifact). *(src: Scryfall)*
- **Animate Dead** — CI: B · Legal · **support-only** · Cheap reanimation; teaches the graveyard payoff. *(src: Scryfall)*
- **Windfall** — CI: U · Legal · **support-only** · Symmetric wheel; the discard/draw punisher enabler. *(src: Scryfall)*

**Permanents**
- **Theater of Horrors** — CI: R · Legal · **support-only** · Repeatable impulse card advantage. *(src: Scryfall)*
- **Necromancy** — CI: B · Legal · **support-only** · Flexible reanimation enchantment. *(src: Scryfall)*
- **Bitterblossom** — CI: B · Legal · **support-only** · Steady token stream for sacrifice/aristocrats. *(src: Scryfall)*

### Commander Candidates
- **Nekusar, the Mindrazer** — CI: UBR · Legal · **exact-fit** · Wheels / group slug; a defining Grixis face. *(src: Scryfall; theme: EDHREC Grixis Wheels)*
- **Kess, Dissident Mage** — CI: UBR · Legal · **exact-fit** · Spellslinger recursion. *(src: Scryfall; theme: EDHREC Grixis Spellslinger)*
- **Marchesa, the Black Rose** — CI: UBR · Legal · **exact-fit** · Counters/aristocrats/recursion. *(src: Scryfall)*
- **Jeleva, Nephalia's Scourge** — CI: UBR · Legal · **exact-fit** · Casts spells from exile; spellslinger/cast-from-exile. *(src: Scryfall)*
- **Sauron, the Dark Lord** — CI: UBR · Legal · **exact-fit** · Amass/zombies + recursion; one of the most-played Grixis commanders. *Caveat:* tied to the amass mechanic. *(theme: EDHREC Grixis — top commander; src: Scryfall)*
- **Kefka, Court Mage** — CI: UBR · **exact-fit** · Discard/control Grixis line; a current top Grixis commander. ⚠ validate Oracle text/identity locally (recent FF-set card). *(theme: EDHREC Grixis; src: Scryfall — validate)*

### Identity-Specific Notes
Grixis = **value through others' loss**: cast and recast spells, reanimate threats,
force bad draws, steal what's useful, and grind via sacrifice/treasure. Anchor copy
to spellslinger + reanimator, with theft and wheels/discard as support. Avoid generic
"UBR value."

---

# PART B — Extended Coverage (gap-prevention)

These identities are **not** currently flagged in the inventory, but you asked for
coverage to prevent future gaps. Entries are tighter (3–4 starter cards per category,
3–5 commanders, brief identity notes) but use the same fit labels and the same
`src: Scryfall` validation contract — the implementation agent must confirm each
card against local Scryfall data before authoring. Color identities are stated for
each card.

## 13. Mono Colors

### White (W) — go-wide tokens, lifegain, anthems, taxes/control, equipment, blink
- **Creatures:** Soul Warden (W, support — lifegain) · Mentor of the Meek (W, support — token draw) · Hero of Bladehold (W, exact — go-wide aggro). *(src: Scryfall)*
- **Spells:** Swords to Plowshares (W, support — removal) · Wrath of God (W, exact — board wipe) · Generous Gift (W, support — removal). *(src: Scryfall)*
- **Permanents:** Anointed Procession (W, exact — token doubler) · Intangible Virtue (W, exact — token anthem) · Smothering Tithe (W, support — treasure ramp, premium). *(src: Scryfall)*
- **Commanders:** Adeline, Resplendent Cathar (exact — tokens) · Heliod, Sun-Crowned (exact — lifegain/counters) · Sram, Senior Edificer (exact — equipment/voltron) · Giada, Font of Hope (support — angels).
- **Notes:** Emphasize go-wide tokens, lifegain payoffs, anthems/taxes. White's weakness is card advantage — lean on tokens and recursion.

### Blue (U) — card draw, counters/control, artifacts, tempo, mill, clones
- **Creatures:** Talrand, Sky Summoner (U, exact — spellslinger drakes) · Murmuring Mystic (U, exact — bird tokens) · Snapcaster Mage (U, support — spell recursion, premium). *(src: Scryfall)*
- **Spells:** Counterspell (U, exact) · Brainstorm (U, support — card selection) · Fact or Fiction (U, support — draw). *(src: Scryfall)*
- **Permanents:** Propaganda (U, exact — pillowfort) · Mystic Remora (U, support — draw) · Rhystic Study (U, support — draw, premium). *(src: Scryfall)*
- **Commanders:** Talrand, Sky Summoner (exact — spellslinger) · Baral, Chief of Compliance (exact — control/spells) · Azami, Lady of Scrolls (exact — wizards/draw) · Urza, Lord High Artificer (support — artifacts, premium/combo caveat).
- **Notes:** Card advantage + interaction is the identity; spellslinger and control are the two beginner-legible builds.

### Black (B) — aristocrats/sacrifice, reanimation, drain, tutors, recursion
- **Creatures:** Gravecrawler (B, exact — recursion fodder) · Midnight Reaper (B, exact — aristocrats draw) · Reassembling Skeleton (B, support — sac fodder). *(src: Scryfall)*
- **Spells:** Reanimate (B, exact) · Victimize (B, exact — reanimation) · Read the Bones (B, support — draw). *(src: Scryfall)*
- **Permanents:** Bitterblossom (B, exact — tokens) · Bastion of Remembrance (B, exact — drain) · Phyrexian Arena (B, support — draw). *(src: Scryfall)*
- **Commanders:** Yawgmoth, Thran Physician (exact — aristocrats; combo caveat) · Sidisi, Undead Vizier (exact — tutor/zombies) · Erebos, God of the Dead (exact — draw/devotion) · K'rrik, Son of Yawgmoth (support — devotion, life-as-mana caveat).
- **Notes:** Trade resources and recur them; death is currency. Reanimation + aristocrats are the anchors.

### Red (R) — aggro/burn, goblins, treasure, spellslinger, impulse, chaos
- **Creatures:** Krenko, Mob Boss (R, exact — goblins) · Young Pyromancer (R, exact — spellslinger tokens) · Goblin Chieftain (R, support — anthem/haste). *(src: Scryfall)*
- **Spells:** Lightning Bolt (R, support — burn) · Faithless Looting (R, support — card filtering; Cmdr-legal) · Chaos Warp (R, exact — universal answer). *(src: Scryfall)*
- **Permanents:** Impact Tremors (R, exact — ETB damage) · Theater of Horrors (R, exact — impulse draw) · Goblin Bombardment (R, support — sac outlet). *(src: Scryfall)*
- **Commanders:** Krenko, Mob Boss (exact — goblins) · Torbran, Thane of Red Fell (exact — burn) · Zada, Hedron Grinder (exact — spellslinger copy) · Feldon of the Third Path (support — artifact reanimation).
- **Notes:** Speed, direct damage, and treasure/impulse value. Red's card-advantage workaround is impulse draw + treasures.

### Green (G) — ramp, +1/+1 counters, stompy, tokens, lands, elves
- **Creatures:** Llanowar Elves (G, support — ramp) · Tireless Tracker (G, exact — lands/clues) · Avenger of Zendikar (G, exact — landfall tokens). *(src: Scryfall)*
- **Spells:** Cultivate (G, support — ramp/fix) · Beast Within (G, exact — removal) · Heroic Intervention (G, support — protection). *(src: Scryfall)*
- **Permanents:** Hardened Scales (G, exact — counters) · Garruk's Uprising (G, exact — ferocious draw) · Guardian Project (G, support — creature draw). *(src: Scryfall)*
- **Commanders:** Ezuri, Renegade Leader (exact — elves) · Goreclaw, Terror of Qal Sisma (exact — stompy/ramp) · Azusa, Lost but Seeking (exact — lands) · Marwyn, the Nurturer (support — elves/mana).
- **Notes:** Ramp into the biggest things; counters, lands, and creature-tokens are the payoffs. Green answers permanents (Beast Within) but not the stack.

---

## 14. Guilds (two-color)

### Azorius (WU) — control, blink, fliers/tokens, taxes
- **Creatures:** Brago, King Eternal (WU, exact — blink) · Reflector Mage (WU, support — tempo) · Murmuring Mystic (U, support — tokens).
- **Spells:** Swords to Plowshares (W, support) · Counterspell (U, exact) · Supreme Verdict (WU, exact — uncounterable wipe).
- **Permanents:** Propaganda (U, support — pillowfort) · Smothering Tithe (W, support — ramp) · Mystic Remora (U, support — draw).
- **Commanders:** Brago, King Eternal (exact — blink) · Grand Arbiter Augustin IV (exact — tax/control; stax caveat) · Dragonlord Ojutai (exact — fliers/control). *(src: Scryfall)*
- **Notes:** Draw-go control + blink value + taxes. Lean blink for the beginner build.

### Dimir (UB) — mill, control, theft, ninjas, card advantage
- **Creatures:** Baleful Strix (UB, exact — value) · Thief of Sanity (UB, exact — theft) · Consecrated Sphinx (U, support — draw, premium).
- **Spells:** Counterspell (U, exact) · Go for the Throat (B, support — removal) · Fact or Fiction (U, support — draw).
- **Permanents:** Bitterblossom (B, support — tokens) · Phyrexian Arena (B, support — draw) · Propaganda (U, support — defense).
- **Commanders:** Yuriko, the Tiger's Shadow (exact — ninjas) · Gisa and Geralf (exact — zombies) · Lazav, the Multifarious (exact — clones/mill) · Oona, Queen of the Fae (exact — faeries/mill). *(src: Scryfall)*
- **Notes:** Information and resource denial; ninjas + theft are the most beginner-fun anchors.

### Rakdos (BR) — aggro, aristocrats, burn, treasure, reanimation
- **Creatures:** Mayhem Devil (BR, exact — sac payoff) · Judith, the Scourge Diva (BR, exact — tokens/ping) · Bloodtithe Harvester (BR, support — vampire value).
- **Spells:** Terminate (BR, support — removal) · Kolaghan's Command (BR, exact — modal value) · Lightning Bolt (R, support — burn).
- **Permanents:** Bastion of Remembrance (B, exact — drain) · Theater of Horrors (R, support — impulse) · Dictate of Erebos (B, support — edict).
- **Commanders:** Prosper, Tome-Bound (exact — treasure/impulse) · Olivia Voldaren (exact — vampires) · Kardur, Doomscourge (support — forced combat) · Anje Falkenrath (support — madness). *(src: Scryfall)*
- **Notes:** Sacrifice + treasure + burn; aristocrats is the engine, aggression the tempo.

### Gruul (RG) — stompy, ramp-into-beaters, +1/+1 counters, landfall, fight
- **Creatures:** Bloodbraid Elf (RG, exact — cascade aggro) · Ruric Thar, the Unbowed (RG, exact — creatures-matter) · Zhur-Taa Druid (RG, support — ramp/ping).
- **Spells:** Beast Within (G, support — removal) · Lightning Bolt (R, support — burn) · Hull Breach (RG, exact — artifact/enchant removal).
- **Permanents:** Garruk's Uprising (G, exact — ferocious draw) · Rhythm of the Wild (RG, exact — haste/uncounter) · Hardened Scales (G, support — counters).
- **Commanders:** Xenagos, God of Revels (exact — big-creature doubling) · Ruric Thar, the Unbowed (exact — creatures) · Wort, the Raidmother (exact — tokens/spell copy) · Klauth, Unrivaled Ancient (support — dragons/ramp). *(src: Scryfall)*
- **Notes:** Ramp into threats and hit hard; counters and fight-removal are the green half, haste/burn the red.

### Selesnya (GW) — tokens/go-wide, counters, lifegain, populate, anthems
- **Creatures:** Trostani Discordant (GW, exact — tokens/anthem) · Tendershoot Dryad (G, exact — saproling tokens) · Conclave Mentor (GW, exact — counters).
- **Spells:** Travel Preparations (GW, exact — counters) · Secure the Wastes (W, support — instant tokens) · Beast Within (G, support — removal).
- **Permanents:** Anointed Procession (W, exact — token doubler) · Cathars' Crusade (W, exact — counters) · Intangible Virtue (W, support — anthem).
- **Commanders:** Trostani, Selesnya's Voice (exact — tokens/lifegain) · Rhys the Redeemed (exact — tokens/populate) · Emmara, Soul of the Accord (exact — tokens/tap) · Sigarda, Host of Herons (support — hexproof/protection). *(src: Scryfall)*
- **Notes:** Build a wide, growing, hard-to-kill board; populate + counters are the texture.

### Orzhov (WB) — aristocrats, lifegain/drain, tokens, reanimation, taxes
- **Creatures:** Cruel Celebrant (WB, exact — drain on death) · Teysa, Orzhov Scion (WB, exact — tokens/recursion) · Sun Titan (W, support — recursion).
- **Spells:** Anguished Unmaking (WB, exact — removal) · Vindicate (WB, exact — removal) · Swords to Plowshares (W, support).
- **Permanents:** Bastion of Remembrance (B, exact — drain) · Dictate of Erebos (B, support — edict) · Smothering Tithe (W, support — ramp).
- **Commanders:** Teysa Karlov (exact — aristocrats/tokens) · Elenda, the Dusk Rose (exact — aristocrats) · Karlov of the Ghost Council (exact — lifegain) · Ghost Council of Orzhova (support — drain). *(src: Scryfall)*
- **Notes:** Drain the table through death triggers and lifegain; tokens feed the sacrifice engine.

### Izzet (UR) — spellslinger, draw/burn, storm, artifacts, spell-copy
- **Creatures:** Young Pyromancer (R, support — tokens) · Goldspan Dragon (R, support — treasure) · Niv-Mizzet, Parun (UR, exact — draw/ping).
- **Spells:** Counterspell (U, support) · Lightning Bolt (R, support) · Brainstorm (U, support — selection).
- **Permanents:** Saheeli, Sublime Artificer (UR, exact — tokens on cast) · Thousand-Year Storm (UR, exact — spell copy) · Curiosity (U, support — draw aura).
- **Commanders:** Niv-Mizzet, Parun (exact — draw/ping) · Mizzix of the Izmagnus (exact — spellslinger cost reduction) · Veyran, Voice of Duality (exact — magecraft) · The Locust God (exact — draw/tokens). *(src: Scryfall)*
- **Notes:** Instants & sorceries as the deck; copy, draw, and burn. Storm/magecraft is the advanced ceiling.

### Golgari (BG) — graveyard value, self-mill, aristocrats, counters, recursion
- **Creatures:** Eternal Witness (G, support — recursion) · Grave Titan (B, exact — tokens) · Lotleth Troll (BG, exact — self-mill).
- **Spells:** Putrefy (BG, exact — removal) · Grisly Salvage (BG, exact — self-mill dig) · Victimize (B, support — reanimation).
- **Permanents:** Deadbridge Chant (BG, exact — graveyard value) · Pernicious Deed (BG, exact — scalable wipe) · Bastion of Remembrance (B, support — drain).
- **Commanders:** Meren of Clan Nel Toth (exact — recursion/aristocrats) · The Gitrog Monster (exact — lands/graveyard) · Izoni, Thousand-Eyed (exact — tokens) · Slimefoot, the Stowaway (support — saprolings/aristocrats). *(src: Scryfall)*
- **Notes:** The graveyard is a second hand; recur, sacrifice, and grind value.

### Boros (RW) — aggro, go-wide, equipment/voltron, burn, mentor
- **Creatures:** Hero of Bladehold (W, exact — go-wide) · Goblin Rabblemaster (R, support — tokens) · Aurelia, Exemplar of Justice (RW, exact — aggro pump).
- **Spells:** Boros Charm (RW, exact — burn/protection) · Lightning Helix (RW, support — burn/life) · Swords to Plowshares (W, support).
- **Permanents:** Cathars' Crusade (W, support — counters) · Impact Tremors (R, support — go-wide reach) · Smothering Tithe (W, support — ramp).
- **Commanders:** Aurelia, the Warleader (exact — extra combat) · Feather, the Redeemed (exact — spellslinger combat tricks) · Wyleth, Soul of Steel (exact — voltron/auras) · Winota, Joiner of Forces (support — humans/tokens; strong caveat). *(src: Scryfall)*
- **Notes:** Decisive combat — go-wide or voltron. Boros's modern card advantage is "spells that come back" (Feather) and impulse.

### Simic (GU) — ramp, +1/+1 counters, draw, big creatures, clones, landfall
- **Creatures:** Tatyova, Benthic Druid (GU, exact — landfall draw) · Cloudfin Raptor (U, support — evolve) · Master Biomancer (GU, exact — counters).
- **Spells:** Growth Spiral (GU, exact — ramp/draw) · Beast Within (G, support — removal) · Rapid Hybridization (U, support — removal).
- **Permanents:** Hardened Scales (G, exact — counters) · Garruk's Uprising (G, support — draw) · Doubling Season (G, exact — counters/tokens; premium caveat).
- **Commanders:** Tatyova, Benthic Druid (exact — lands/draw) · Aesi, Tyrant of Gyre Strait (exact — lands/draw) · Ezuri, Claw of Progress (exact — experience counters) · Kinnan, Bonder Prodigy (support — big-mana; strong caveat). *(src: Scryfall)*
- **Notes:** Out-resource everyone via ramp + draw, then deploy oversized threats or counters.

---

## PART C — Extended Identities (Colleges, Remaining Shards, 5th Four-Color, Five-Color, Colorless)

These are authored to prevent **future** dossier gaps beyond the current warning set. Same sourcing rules apply: card facts (CI / type / Commander legality) are Scryfall-verifiable and must be validated against local Scryfall data; theme groupings are EDHREC-grounded. None of these are in the active W001–W004 fix scope, but they cover the rest of the Vox Mana identity lattice.

### §15 Strixhaven Colleges

Treat each college as its **own** two-color identity with a flavor lens, not a generic guild reskin. (College = Strixhaven product identity; cards below are CI-exact unless marked.)

#### Silverquill (WB) — go-wide + drain, counters on a body, aggressive lifegain
- **Creatures:** Killian, Ink Duelist (WB, exact — cost-reduce targeted spells) · Cruel Celebrant (WB, exact — drain on death) · Blood Artist (B, support — drain).
- **Spells:** Anguished Unmaking (WB, exact — catch-all removal) · Vindicate (WB, exact — removal) · Inkshield (WB, exact — counter-into-tokens).
- **Permanents:** Bastion of Remembrance (B, exact — drain) · Smothering Tithe (W, support — ramp) · Elspeth, Sun's Champion (W, support — tokens/anthem).
- **Commanders:** Shadrix Silverquill (exact — tokens + card draw politics) · Breena, the Demagogue (exact — political counters/draw) · Killian, Ink Duelist (exact — voltron spells). *(src: Scryfall; theme: EDHREC Silverquill)*
- **Notes:** Words sharpened to a point — go-wide with anthem/drain, or pile counters onto one threat.

#### Prismari (UR) — spellslinger, treasure, instants/sorceries, big finishers
- **Creatures:** Veyran, Voice of Duality (UR, exact — magecraft doubling) · Goldspan Dragon (R, support — treasure payoff) · Niv-Mizzet, Parun (UR, exact — draw/ping).
- **Spells:** Counterspell (U, support — interaction) · Lightning Bolt (R, support — burn) · Expressive Iteration (UR, exact — card advantage).
- **Permanents:** Saheeli, Sublime Artificer (UR, exact — tokens on cast) · Thousand-Year Storm (UR, exact — spell copy) · Storm-Kiln Artist (R, support — treasure on cast).
- **Commanders:** Zaffai, Thunder Conductor (exact — magecraft payoff) · Veyran, Voice of Duality (exact — magecraft) · Rionya, Fire Dancer (support — token copies). *(src: Scryfall; theme: EDHREC Prismari)*
- **Notes:** Art as spectacle — cast spells, copy spells, turn the storm count into damage or treasure.

#### Witherbloom (BG) — lifegain/drain, sacrifice, graveyard value, lands
- **Creatures:** Beledros Witherbloom (BG, exact — token/life engine) · Old Stickfingers (BG, exact — self-mill tutor) · Eternal Witness (G, support — recursion).
- **Spells:** Putrefy (BG, exact — removal) · Casualties of War (BG, exact — multi-removal) · Victimize (B, support — reanimation).
- **Permanents:** Deadbridge Chant (BG, exact — graveyard value) · Bastion of Remembrance (B, support — drain) · Pernicious Deed (BG, exact — wipe).
- **Commanders:** Willowdusk, Essence Seer (exact — life-as-resource/counters) · Beledros Witherbloom (exact — tokens/lands/life) · Marina Vendrell (exact — enchantments; ⚠ recent, validate). *(src: Scryfall; theme: EDHREC Witherbloom)*
- **Notes:** Life is fuel — pay it, gain it, drain it; the graveyard and lands are secondary engines.

#### Lorehold (RW) — artifacts/historic, recursion, spirits/tokens, sac-and-return
- **Creatures:** Osgir, the Reconstructor (RW, exact — artifact recursion/tokens) · Quintorius, Field Historian (RW, exact — spirit tokens from graveyard casts) · Sun Titan (W, support — recursion).
- **Spells:** Boros Charm (RW, exact — burn/protection) · Faithless Looting (R, support — graveyard setup) · Swords to Plowshares (W, support — removal).
- **Permanents:** Cathars' Crusade (W, support — counters) · Smothering Tithe (W, support — ramp) · Anointed Procession (W, support — token doubler).
- **Commanders:** Osgir, the Reconstructor (exact — artifacts) · Quintorius, Field Historian (exact — spellslinger/tokens) · Quintorius Kand (exact — planeswalker face; ⚠ recent, validate). *(src: Scryfall; theme: EDHREC Lorehold)*
- **Notes:** Dig up the past — recur artifacts and spells, make tokens off historic/graveyard casts.

#### Quandrix (GU) — +1/+1 counters, fractals/tokens, ramp, copy, big-mana
- **Creatures:** Adrix and Nev, Twincasters (GU, exact — token doubling) · Esix, Fractal Bloom (GU, exact — token copy) · Master Biomancer (GU, support — counters).
- **Spells:** Growth Spiral (GU, exact — ramp/draw) · Fractal Summoning (GU, exact — X tokens) · Rapid Hybridization (U, support — removal).
- **Permanents:** Hardened Scales (G, support — counters) · Doubling Season (G, support — counters/tokens; premium caveat) · Garruk's Uprising (G, support — draw).
- **Commanders:** Adrix and Nev, Twincasters (exact — token/counter doubling) · Esix, Fractal Bloom (exact — token copy) · Zask, Skittering Swarmlord (exact — insects/counters; ⚠ recent, validate). *(src: Scryfall; theme: EDHREC Quandrix)*
- **Notes:** Math as magic — multiply counters and tokens, ramp into a doubled payoff.

### §16 Remaining Shards (Bant & Grixis already in Part A)

#### Esper (WUB) — artifacts, control, card advantage, reanimation, tokens
- **Creatures:** Sharuum the Hegemon (WUB, exact — artifact recursion) · Sphinx of the Steel Wind (WUB, exact — defensive bomb) · Baleful Strix (UB, support — flying value/draw).
- **Spells:** Anguished Unmaking (WB, support — removal) · Counterspell (U, support — interaction) · Fact or Fiction (U, support — card advantage).
- **Permanents:** Smothering Tithe (W, support — ramp) · Sai, Master Thopterist (U, support — artifact tokens) · Tezzeret, Agent of Bolas (UB, support — artifacts).
- **Commanders:** Raffine, Scheming Seer (exact — connive/voltron value) · Sharuum the Hegemon (exact — artifacts) · Sen Triplets (exact — control; political caveat) · Breya, Etherium Shaper (support — 4c overlap if WUBR-curious). *(src: Scryfall; theme: EDHREC Esper)*
- **Notes:** Out-card the table — artifacts, control, recursion; the win is inevitability, not speed.

#### Jund (BRG) — sacrifice, aristocrats, graveyard, treasure/lands, midrange
- **Creatures:** Korvold, Fae-Cursed King (BRG, exact — sac-to-draw dragon) · Prossh, Skyraider of Kher (BRG, exact — tokens/sac) · Sek'Kuar, Deathkeeper (BRG, exact — aristocrats).
- **Spells:** Putrefy (BG, support — removal) · Terminate (BR, support — removal) · Casualties of War (BG, support — multi-removal).
- **Permanents:** Dictate of Erebos (B, support — edict) · Mayhem Devil (BR, support — sac payoff) · Pitiless Plunderer (B, support — treasure on death).
- **Commanders:** Korvold, Fae-Cursed King (exact — sacrifice/draw) · Prossh, Skyraider of Kher (exact — tokens) · Lord Windgrace (exact — lands) · Ziatora, the Incinerator (exact — treasure/sac). *(src: Scryfall; theme: EDHREC Jund)*
- **Notes:** Everything is fuel — sacrifice creatures, lands, and treasure for value and reach.

#### Naya (RGW) — big creatures, tokens/go-wide, counters, ramp-into-beaters
- **Creatures:** Gishath, Sun's Avatar (RGW, exact — dinosaurs/cheat) · Ghired, Conclave Exile (RGW, exact — populate/tokens) · Marath, Will of the Wild (RGW, exact — counters/tokens).
- **Spells:** Beast Within (G, support — removal) · Boros Charm (RW, support — burn/protection) · Swords to Plowshares (W, support — removal).
- **Permanents:** Cathars' Crusade (W, support — counters) · Garruk's Uprising (G, support — draw) · Rhythm of the Wild (RG, support — haste/uncounter).
- **Commanders:** Gishath, Sun's Avatar (exact — dinosaurs) · Marath, Will of the Wild (exact — counters/tokens) · Mayael the Anima (exact — big-creature cheat) · Ghired, Conclave Exile (exact — populate). *(src: Scryfall; theme: EDHREC Naya)*
- **Notes:** Biggest board wins — ramp and tokens into oversized threats, then alpha strike.

### §17 Witch / GWUB — the 5th Four-Color (non-Red "Growth")
Vox Mana project identity (non-Red four-color), **not** an official faction. Same sparse-exact-commander gap as the other four-color identities — recommend a local Scryfall CI query for additions; don't invent extras.
- **Canonical face:** Atraxa, Praetors' Voice (GWUB, exact-identity · support-only · precon-derived from Commander 2016 "Breed Lethality"). Anchors counters / proliferate / superfriends. *(src: Scryfall; product: Commander 2016)*
- **Starter texture (support-only):** Doubling Season (G), Cathars' Crusade (W), proliferate effects, planeswalker suite. Validate each CI against local Scryfall data before authoring.
- **Notes:** Proliferate is the throughline (counters, planeswalkers, poison). Mark all four-color picks support-only unless a project source promotes the specific card. **Research gap:** exact GWUB legendary creatures are few — flag for local query.

### §18 Five-Color (WUBRG)
- **Starter (fixing/ramp is the identity tax):** Chromatic Lantern (artifact, support — fixing) · Cultivate (G, support — ramp/fixing) · Farseek (G, support — fetch) · Sol Ring (artifact, support — ramp) · Command Tower / fixing lands (mechanical, see land note).
- **Creatures/payoffs:** The Ur-Dragon (WUBRG, exact — dragons; #1 five-color commander) · Tiamat (WUBRG, exact — dragon tutor) · Kenrith, the Returned King (WUBRG, exact — modular group-political toolbox).
- **Commanders:** The Ur-Dragon (exact — dragons) · Kenrith, the Returned King (exact — toolbox/politics) · Jodah, the Unifier (exact — legends-matter) · Najeela, the Blade-Blossom (exact — Warriors/combat; **strong power caveat — high-power table staple**) · Sisay, Weatherlight Captain (exact — legends toolbox). *(src: Scryfall; theme: EDHREC five-color)*
- **Notes:** The deckbuilding cost is mana fixing; the payoff is "play anything." Dragons (Ur-Dragon) is the most newbie-legible entry; Najeela/cEDH-adjacent picks should be flagged for power level.

### §19 Colorless
Be honest: colorless is **unusual** as a "faction" — it's an identity defined by the *absence* of color, anchored in Eldrazi and artifacts. Smaller commander pool; set expectations accordingly.
- **Starter (artifacts/ramp):** Sol Ring (support — ramp) · Solemn Simulacrum (support — ramp/draw) · Wurmcoil Engine (support — lifegain bomb) · Hedron Archive (support — ramp/draw) · All Is Dust (support — colorless wipe).
- **Creatures/payoffs:** Kozilek, the Great Distortion (colorless, exact — Eldrazi/draw) · Ulamog, the Ceaseless Hunger (colorless, exact — Eldrazi/exile) · Walking Ballista (colorless, support — counters/removal).
- **Commanders:** Kozilek, the Great Distortion (exact — Eldrazi/big-mana) · Karn, Silver Golem (exact — artifacts) · Hope of Ghirapur (exact — artifact aggro/low-budget) · Traxos, Scourge of Kroog (support — artifacts). *(src: Scryfall; theme: EDHREC colorless)*
- **Notes:** Two real archetypes — big-mana Eldrazi, and artifact decks. Hope of Ghirapur is the budget/newbie on-ramp; Eldrazi titans are the splashy ceiling. Flag the smaller pool as a known constraint, not a gap to "fill."

---

## §20 Final Summary

### Candidate coverage by identity
Each identity below includes starter card candidates. Commander coverage varies:
wedge, shard, mono, guild, college, five-color, and colorless sections list multiple
concrete candidates, while priority four-color sections intentionally provide one
conservative canonical/precon-derived face plus a required local Scryfall query
before any additional commander expansion.

| Group | Identities authored | Commander candidates each |
|---|---|---|
| Priority wedges | Abzan, Temur, Sultai, Mardu, Jeskai | 4–6 |
| Priority four-color | Yore, Glint, Dune, Ink | 1 concrete face each; expand only after local Scryfall query |
| Priority shards | Bant, Grixis | 5–6 (+ owned theme sets) |
| Mono | W, U, B, R, G | 4 each |
| Guilds | all 10 | 4 each |
| Colleges | Silverquill, Prismari, Witherbloom, Lorehold, Quandrix | 3 each |
| Remaining shards | Esper, Jund, Naya | 4 each |
| 5th four-color | Witch/GWUB | 1 anchor (sparse) |
| Five-color | WUBRG | 5 |
| Colorless | colorless | 4 |

### Highest-confidence (most grounded, lowest validation risk)
- **W002 Bant themes** — blink/ETB-value (Roon), exalted+counters, toolbox/hatebears, tap-untap politics (Derevi). EDHREC-grounded, longstanding cards. **Implement first.**
- **W003 Grixis themes** — spellslinger, treasure, reanimator, theft, wheels/group-slug (Nekusar). EDHREC-grounded, longstanding cards. **Implement first.**
- Wedge + guild + mono commander/starter picks: all anchored on long-printed, stable-CI staples (Doran, Meren, Teysa, Niv-Mizzet, etc.). Low validation risk.

### Support-only / stretch / caveated
- All **four-color** picks (Yore/Glint/Dune/Ink/Witch) are support-only / precon-derived per Vox Mana boundary rules.
- Power-level caveats flagged: Najeela (5c), Kinnan (Simic), Winota (Boros), Sen Triplets (Esper political).
- Premium-price caveats: Doubling Season, Cathars' Crusade (where marked).

### Research gaps (call these out to the implementation agent)
1. **Exact-identity four-color legendary creatures are genuinely sparse.** Yore/Glint/Dune/Ink/Witch each lean on their Commander-2016 precon face plus a thin pool. Recommend a **local Scryfall CI query** (`id=wubr` etc., `is:commander`) to enumerate the true legal pool rather than authoring from memory.
2. **Recent commanders flagged `⚠ validate`** — confirm name, CI, and Commander legality against local Scryfall before authoring: Teval, Zinnia, Satya, Kefka Court Mage, Mr. House, Marina Vendrell, Quintorius Kand, Zask. (Recent-set cards are the only place CI/legality realistically drifts.)
3. **Colorless is a small pool by nature** — set expectations (Eldrazi + artifacts), don't treat the thin commander list as a fillable gap.

### Recommended implementation order
1. **W002 + W003** (Bant / Grixis identity themes) — highest leverage, most grounded, smallest surface area.
2. **W004** (commander candidates for the 10 primaries) — use exact-fit wedge/shard picks first; use only the listed four-color face commanders as conservative support-only fallbacks until local Scryfall query validation authorizes more.
3. **W001** (starter card groups for the 12 dossiers) — author from the creatures/spells/permanents blocks above; run each card through local Scryfall validation per the W001 fix instruction.
4. Extended identities (Part B + C) — backfill opportunistically to close future gaps; not part of the active warning set.

### Implementation readiness against the warning inventory
- **Ready to author now:** W001 starter candidates for the affected target identities, W002 Bant owned themes, W003 Grixis owned themes, and wedge/Bant/Grixis W004 commander candidates after local Scryfall validation.
- **Conservative four-color W004 fallback only:** Yore, Glint, Dune, and Ink each provide one canonical/precon-derived face commander. Do not add more four-color commander recommendations until a local Scryfall query confirms the legal pool and the selected cards are source-safe for Vox Mana.
- **Needs local validation before authoring:** all card names, color identities, Commander legality, and every recent `⚠ validate` card or date-sensitive banlist claim.
- **Not covered by this packet:** W005–W461 land warnings. Those require source-data dedupe and land normalization rather than MTG information research.

---

## §21 Note on Land Warnings (W005–W461) — out of research scope
Per the prompt, lands were not deeply researched. These are **mechanical cleanup** only: deduplicate repeated land entries, normalize land-cycle naming, and ensure color-identity-safe fixing lands per identity (e.g. the relevant tri-land / dual / Command Tower / Path of Ancestry). No card-by-card research is required — this is a dedup/normalization pass, not a content-authoring pass.

---

## §22 Sources
Card facts (color identity, type line, Commander legality) throughout are **Scryfall-verifiable** and are intended for validation against the project's **local Scryfall data** before authoring — they were not individually fetched here. Theme groupings and "top commander" framing are grounded in EDHREC. Banlist and format-legality claims are date-sensitive planning context and must be verified before implementation.

- **Scryfall** — card color identity, type, and Commander legality (validate locally): https://scryfall.com
- **EDHREC** — commander popularity and theme/archetype groupings, per identity: https://edhrec.com
- **Wizards of the Coast — Commander Format Panel banlist announcement (Feb 9 2026)** — date-sensitive banlist context to verify before relying on implementation: https://magic.wizards.com/en/news
- **Tarkir wedge philosophies** (Abzan endures / Jeskai refines / Sultai accumulates / Mardu conquers / Temur evolves) — official Tarkir set context (used for identity framing, not as proof of product lore continuity per Vox Mana rules).

**Validation reminder for the implementation agent:** every card above carries an implicit "confirm CI + Commander legality against local Scryfall" step. Treat `⚠ validate` tags as hard gates. Do not author any four-color card as exact-fit without a local-data or project-source confirmation.

*End of research packet.*
