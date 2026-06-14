# Source-Intake Packet — VM-378 / VM-379 / VM-380 (Full-Data Export)

**What this is:** Complete source-backed data for the three repair cards — full Commander decklists (verbatim product data), full figure/claim extraction, and exact flavor-text intake targets. This is *intake material* for promotion into your evidence/source ledgers; nothing here is wired into raw packets, matrices, or Compass surfaces by default.

**Confidence tiers:** `OFFICIAL` = first-party Wizards source · `CANON-WIKI` = MTG Wiki citing first-party refs · `VERIFY` = pattern-consistent, not confirmed this pass → treat as `source-intake-needed`.

**Standing guardrail (from the tranche spec):** Commander/product rows are support/navigation only — not canon, popularity, legality, or metagame proof.

**Two data-class boundaries you should know going in:**
1. **Decklists below are reproduced in full** — card names + counts are factual product data published by Wizards, so they're exported verbatim here.
2. **Card flavor text is NOT reproduced** — it's copyrighted creative text. For `canonical_flavor_text` I give the exact target card list + direct Scryfall links per identity (Part C). Pull verbatim strings from Scryfall/Gatherer into your ledger with per-card attribution; that's also the correct primary-source citation for your audit standard.

---
---

# PART A — Figure & Lore Data (full extraction)

## VM-378 — Strixhaven Non-Lorehold (PRISMARI / QUANDRIX / SILVERQUILL / WITHERBLOOM)

**Plane premise** (`OFFICIAL`/`CANON-WIKI`): Strixhaven University on the plane **Arcavios**, founded ~700 years ago by five elder dragons; each college pairs two enemy colors and is named for its founding dragon. Current/official Commander product = **Secrets of Strixhaven** (released **Apr 24, 2026**), superseding Commander 2021 for "current source" purposes.

### PRISMARI (UR) — College of the Elements — "Express yourself with the elements"
- Founding dragon: **Galazeth Prismari** `VERIFY` (card exists; confirm "founder" status on wiki)
- Deans: **Uvilda, Dean of Perfection** // **Nassari, Dean of Expression** `VERIFY` `source-intake-needed` (not confirmed this pass)
- Mascot: Elementals · Campus loci: Furygale (abandoned-projects "graveyard")
- In-deck legends (Secrets of Strixhaven, `OFFICIAL`): Rootha, Mastering the Moment (face) · Muddle, the Ever-Changing (featured) · Rootha, Mercurial Artist · Galazeth Prismari · Veyran, Voice of Duality · Brudiclad, Telchor Engineer · Plargg and Nassari · Rionya, Fire Dancer

### QUANDRIX (GU) — College of Numeromancy — "Math is magic"
- Founding dragon: **Tanazir Quandrix** `CANON-WIKI`
- Deans: **Kianne, Dean of Substance** // **Imbraham, Dean of Theory** `CANON-WIKI` (core "Substance vs. Theory" debate: is math discovered or invented)
- Mascot: Fractals · Campus loci: Torus Hall, Arithmodrome, Cultivarium
- In-deck legends (`OFFICIAL`): Zimone, Infinite Analyst (face) · Primo, the Unbounded (featured) · Tanazir Quandrix · Zimone, All-Questioning · Zimone, Quandrix Prodigy · Deekah, Fractal Theorist · Nev, the Practical Dean · Troyan, Gutsy Explorer

### SILVERQUILL (WB) — College of Eloquence — "Sharp style. Sharper wit."
- Founding dragon: **Shadrix Silverquill** `CANON-WIKI`
- Deans: **Embrose, Dean of Shadow** // (radiance-side dean) `VERIFY` `source-intake-needed` — only partial corroboration (a Silverquill dean Embrose referenced as Killian's father; confirm both deans + exact titles)
- Mascot: Inklings (living ink) · Campus loci: Grandloft Hall, Dramarium
- In-deck legends (`OFFICIAL`): Killian, Decisive Mentor (face) · Scriv, the Obligator (featured) · Shadrix Silverquill · Killian, Ink Duelist · Breena, the Demagogue · Eriette of the Charmed Apple

### WITHERBLOOM (BG) — College of Essence Studies — "Get your hands dirty"
- Founding dragon: **Beledros Witherbloom** `VERIFY` (card exists; confirm founder status)
- Deans: **Lisette, Dean of the Root** (life sacred) // **Valentin, Dean of the Vein** (death/decay as fuel) `CANON-WIKI`
- Mascot: Pests · Campus: swamps of Arcavios
- In-deck legends (`OFFICIAL`): Dina, Essence Brewer (face) · Gorma, the Gullet (featured) · Beledros Witherbloom · Dina, Soul Steeper · Mazirek, Kraul Death Priest · Gyome, Master Chef

**research_links:** `https://magic.wizards.com/en/news/announcements/secrets-of-strixhaven-commander-decklists` · `https://magic.wizards.com/en/news/feature/planeswalkers-guide-strixhaven-2021-04-01` · `https://mtg.wiki/page/Strixhaven` · `https://mtg.fandom.com/wiki/Silverquill`

---

## VM-379 — GRIXIS (UBR; primarily black, blue/red secondary)

**Result: clears the 3-row threshold (5 claim rows + full figure roster). Not a blocker.**

### Source-backed claim rows (promotable)
1. **Etymology** `CANON-WIKI` — "Grixis" is the ancient **Vithian** word for **"traitor."** (mtg.fandom.com/wiki/Sedris)
2. **Sundering premise** `CANON-WIKI` — Severed from white and green (life) mana at the Sundering, Grixis became a death-dominated shard of undead, demons, and necromancers. (mtg.wiki/page/Grixis)
3. **Fallen capital** `CANON-WIKI` — The kingdom of **Vithia** fell; its capital became the necropolis **Sedraxis**, the greatest on the plane. (Sedris / Grixis wiki)
4. **Resource concept** `CANON-WIKI` — Grixis sustains itself by harvesting residual life-energy called **"vis."** (mtg.wiki/page/Grixis)
5. **Bolas anchor** `CANON-WIKI` — Nicol Bolas based his lair on Grixis as the staging center for the schemes leading to the Conflux. (mtg.fandom.com/wiki/Nicol_Bolas)
6. **Conflux inversion** `CANON-WIKI` — When the Conflux flooded green/white (life) mana into Grixis, its vis-harvesting was disrupted and its undead were energized, driving invasions of neighboring shards. (mtg.wiki/page/Grixis)
7. **New Alara cults** `CANON-WIKI` — Post-Conflux, demon-worship cults rose across New Alara, most notably one dedicated to **Nefarox.** (mtg.wiki/page/Grixis)

### key_figures (full roster, source-attested)
- **Sedris, the Traitor King** — most powerful lich-warlord on Grixis; betrayed/doomed Vithia; rules Sedraxis. Primary stories: Doug Beyer, *Alive and Unwell* (2008-09-24); *Encounter at the Necropolis* (2008-10-22).
- **Malfegor** — demon-dragon abomination; Bolas's second-in-command, led undead armies; possibly oldest living thing on Alara; trapped during the Sundering by the archangel **Asha**, whom he slew; experimented on captives to ignite planeswalker sparks (succeeded once with the witch **Sifa Grent**, who escaped); later slain by **Rafiq of the Many** using Asha's blade.
- **Nicol Bolas** — elder dragon planeswalker; architect of the Conflux; Grixis-based.
- **Thraximundar** — guided across the shards by Bolas (who appeared as a young boy), leaving destruction that fed the Maelstrom.
- **Nefarox** — demon; focus of a prominent New-Alara demon-worship cult.
- **Sifa Grent** `CANON-WIKI` (secondary) — witch whose spark Malfegor inadvertently ignited; escaped before he could harvest it.

### research_links
- `https://mtg.wiki/page/Grixis`
- `https://mtg.fandom.com/wiki/Sedris`
- `https://mtg.fandom.com/wiki/Malfegor`
- `https://mtg.fandom.com/wiki/Nicol_Bolas`
- `https://mtg.fandom.com/wiki/Alara`
- Primary WotC stories (Doug Beyer, 2008): *Alive and Unwell*; *Encounter at the Necropolis* — cite via the wiki reference list if legacy magic.wizards.com URLs 404.

> Placement: nothing here exposes a new discriminator vs. neighboring identities — keep placement logic unchanged per the card.

---

## VM-380 — TARKIR (ABZAN / TEMUR / SULTAI / MARDU / JESKAI)

Current Commander product = **Tarkir: Dragonstorm** Commander (set released **Apr 11, 2025**; commander decks). Each deck = clan leader + Spirit Dragon. Full decklists in Part B.

| Identity | Deck | Clan leader | Spirit Dragon |
|---|---|---|---|
| `ABZAN` (WBG) | Abzan Armor | Felothar the Steadfast | Betor, Ancestor's Voice |
| `TEMUR` (GUR) | Temur Roar | Eshki, Temur's Roar | Ureni of the Unwritten |
| `SULTAI` (BGU) | Sultai Arisen | Kotis, Sibsig Champion | Teval, the Balanced Scale |
| `MARDU` (RWB) | Mardu Surge | Zurgo Stormrender | Neriv, Crackling Vanguard |
| `JESKAI` (URW) | Jeskai Striker | Elsha, Threefold Master | Shiko and Narset, Unified |

All ten names `OFFICIAL` (decklist text) + `CANON-WIKI` (full face/reserve list).

**Per-card application:** ABZAN/TEMUR/SULTAI → add support-only Compass rows from the table. MARDU/JESKAI → add top-level `deck_links` + `research_links` (official decklist page anchors + per-deck galleries in Part B), preserving existing Compass boundaries. All five → normalize the official decklist page as the canonical source-owned link.

**research_links / deck_links:** `https://magic.wizards.com/en/news/announcements/tarkir-dragonstorm-commander-decklists` · `https://mtg.wiki/page/Tarkir:_Dragonstorm/Commander`

---
---

# PART B — Full Commander Decklists (verbatim product data, `OFFICIAL`)

## B1. Secrets of Strixhaven (Apr 24, 2026) — four target colleges

### Silverquill Influence — White-Black
**Face:** Killian, Decisive Mentor · **Featured:** Scriv, the Obligator
Gallery: `https://magic.wizards.com/en/products/secrets-of-strixhaven/card-image-gallery?cigproduct=sos-products-commander-deck-1-silverquill`

```
1 Killian, Decisive Mentor
1 Scriv, the Obligator
1 Eiganjo Dynastorian
1 Forum Filibuster
1 Herald of Amity
1 Changing Loyalty
1 Coercive Impetus
1 Intermediate Chirography
1 Defacing Duskmage
1 Eclipsed Steppe
1 Turbulent Moor
1 Umbral Expanse
1 Fabled Passage
1 Eldrazi Conscription
1 Ajani's Chosen
1 Angelic Destiny
1 Archon of Sun's Grace
1 Armored Skyhunter
1 Combat Calligrapher
1 Eidolon of Countless Battles
1 Firemane Commando
1 Gift of Immortality
1 Kor Spiritdancer
1 Land Tax
1 Mangara, the Diplomat
1 Nils, Discipline Enforcer
1 Pearl-Ear, Imperial Advisor
1 Promise of Loyalty
1 Redemption Arc
1 Shielded by Faith
1 Songbirds' Blessing
1 Sram, Senior Edificer
1 Starfield Mystic
1 Winds of Rath
1 Doomwake Giant
1 Ghoulish Impetus
1 Keen Duelist
1 Anguished Unmaking
1 Breena, the Demagogue
1 Eriette of the Charmed Apple
1 Inkshield
1 Shadrix Silverquill
1 Tomik, Wielder of Law
1 Vanishing Verse
1 Caves of Koilos
1 Desolate Mire
1 Exotic Orchard
1 Fetid Heath
1 Isolated Chapel
1 Shineshadow Snarl
1 Temple of Silence
1 War Room
1 Flickering Ward
1 Fallen Ideal
1 Screams from Within
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Forum of Amity
1 Terramorphic Expanse
1 Chains of Custody
1 Darksteel Mutation
1 Ghostly Prison
1 Martial Impetus
1 Raffine's Guidance
1 Sage's Reverie
1 Secret Rendezvous
1 Sentinel's Eyes
1 Sheltered by Ghosts
1 Spirit Mantle
1 Transcendent Envoy
1 Animate Dead
1 Hateful Eidolon
1 Parasitic Impetus
1 Fracture
1 Killian, Ink Duelist
1 Fellwar Stone
1 Talisman of Hierarchy
1 Arcane Lighthouse
1 Bojuka Bog
1 Path of Ancestry
1 Silverquill Campus
1 Study Hall
1 Sunlit Marsh
8 Plains
8 Swamp
```
Tokens: 4x Contract//Copy · 3x Inkling//Pegasus · 3x Inkling//Cat

### Prismari Artistry — Blue-Red
**Face:** Rootha, Mastering the Moment · **Featured:** Muddle, the Ever-Changing
Gallery: `…?cigproduct=sos-products-commander-deck-4-prismari`

```
1 Rootha, Mastering the Moment
1 Muddle, the Ever-Changing
1 Inspired Skypainter
1 Abstract Performance
1 Dirgur Focusmage
1 Leitmotif Composer
1 Furygale Flocking
1 Prismari Pianist
1 Renegade Bull
1 Coastal Peak
1 Scorched Geyser
1 Turbulent Springs
1 Faerie Mastermind
1 Chain Reaction
1 Determined Iteration
1 Harmonic Prodigy
1 Fabled Passage
1 Archmage Emeritus
1 Brazen Borrower
1 Curiosity Crafter
1 Dig Through Time
1 Replication Technique
1 Rite of Replication
1 Thunderclap Drake
1 Blasphemous Act
1 Chaos Warp
1 Creative Technique
1 Cursed Mirror
1 Dance with Calamity
1 Goldspan Dragon
1 Manaform Hellkite
1 Mirrorwing Dragon
1 Plargg and Nassari
1 Redoubled Stormsinger
1 Rionya, Fire Dancer
1 Rousing Refrain
1 Surge to Victory
1 Twinflame
1 Volcanic Salvo
1 Brudiclad, Telchor Engineer
1 Galazeth Prismari
1 Magma Opus
1 Prismari Command
1 Veyran, Voice of Duality
1 Solemn Simulacrum
1 Cascade Bluffs
1 Exotic Orchard
1 Ferrous Lake
1 Frostboil Snarl
1 Hall of Oracles
1 Restless Spire
1 Shivan Reef
1 Sulfur Falls
1 Temple of Epiphany
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Prismari Charm
1 Spectacle Summit
1 Terramorphic Expanse
1 Aether Gale
1 Arcane Denial
1 Deep Analysis
1 Reality Shift
1 Resculpt
1 Treasure Cruise
1 Abrade
1 Big Score
1 Mana Geyser
1 Storm-Kiln Artist
1 Throes of Chaos
1 Volcanic Torrent
1 Expressive Iteration
1 Rootha, Mercurial Artist
1 Stormcatch Mentor
1 Fellwar Stone
1 Lightning Greaves
1 Talisman of Creativity
1 Molten Tributary
1 Mystic Sanctuary
1 Path of Ancestry
1 Prismari Campus
1 Reliquary Tower
1 Study Hall
1 Temple of the False God
8 Island
7 Mountain
```
Tokens: 3x Elemental//Dragon Illusion · 3x Elemental(Haste)//Copy · 2x Elemental(1/1)//Phyrexian Myr · 1x Elemental(4/4)//Treasure · 1x Elemental(4/4)//Manifest (helper)

### Witherbloom Pestilence — Black-Green
**Face:** Dina, Essence Brewer · **Featured:** Gorma, the Gullet
Gallery: `…?cigproduct=sos-products-commander-deck-3-witherbloom`

```
1 Dina, Essence Brewer
1 Gorma, the Gullet
1 Merchant of Venom
1 Defiling Daemogoth
1 Ominous Harvest
1 Stensian Sanguinist
1 Feral Appetite
1 Pest Rescuer
1 Ribtruss Roaster
1 Eccentric Pestfinder
1 Immoral Bargain
1 Turbulent Fen
1 Ophiomancer
1 Toxic Deluge
1 Tendershoot Dryad
1 Fabled Passage
1 Blight Mound
1 Bloodghast
1 Final Act
1 Jadar, Ghoulcaller of Nephalia
1 Nether Traitor
1 Priest of Forgotten Gods
1 Smothering Abomination
1 Veinwitch Coven
1 Witch of the Moors
1 Woe Strider
1 Yahenni, Undying Partisan
1 Awakening Zone
1 Blossoming Bogbeast
1 Gilded Goose
1 Mycoloth
1 Ohran Frostfang
1 Pest Infestation
1 Trudge Garden
1 Assassin's Trophy
1 Beledros Witherbloom
1 Casualties of War
1 Creakwood Liege
1 Culling Ritual
1 Gyome, Master Chef
1 Mazirek, Kraul Death Priest
1 Wight of the Reliquary
1 Witherbloom Command
1 Exotic Orchard
1 Festering Thicket
1 Grim Backwoods
1 High Market
1 Llanowar Wastes
1 Necroblossom Snarl
1 Temple of Malady
1 Twilight Mire
1 Vernal Fen
1 Viridescent Bog
1 Woodland Cemetery
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Teacher's Pest
1 Witherbloom Charm
1 Terramorphic Expanse
1 Titan's Grave
1 Blood Artist
1 Infernal Grasp
1 Morbid Opportunist
1 Night's Whisper
1 Pawn of Ulamog
1 Plumb the Forbidden
1 Umbral Collar Zealot
1 Viscera Seer
1 Zulaport Cutthroat
1 Cultivate
1 Elvish Mystic
1 Sakura-Tribe Elder
1 Springbloom Druid
1 Deadly Brew
1 Dina, Soul Steeper
1 Moldervine Reclamation
1 Mortality Spear
1 Haywire Mite
1 Bojuka Bog
1 Haunted Mire
1 Path of Ancestry
1 Study Hall
1 Witherbloom Campus
8 Swamp
8 Forest
```
Tokens: 3x Pest//Saproling · 3x Worm//Eldrazi Spawn · 2x Fungus Beast//Goat · 1x Snake//Zombie(Decayed) · 1x Food//City's Blessing (helper)

### Quandrix Unlimited — Green-Blue
**Face:** Zimone, Infinite Analyst · **Featured:** Primo, the Unbounded
Gallery: `…?cigproduct=sos-products-commander-deck-2-quandrix`

```
1 Zimone, Infinite Analyst
1 Primo, the Unbounded
1 Owlin Spiralmancer
1 Expansion Algorithm
1 Nexus Mentality
1 Kinetic Ooze
1 Lattice Library
1 Nev, the Practical Dean
1 Yavimaya Bloomsage
1 Striding Shotcaller
1 Brass Infiniscope
1 Turbulent Wilderness
1 Commander's Insight
1 Ingenious Prodigy
1 Pull from Tomorrow
1 Benevolent Hydra
1 Unbound Flourishing
1 Fabled Passage
1 Curse of the Swine
1 Deekah, Fractal Theorist
1 Entrancing Melody
1 Perplexing Test
1 Stroke of Genius
1 Zimone's Hypothesis
1 Animist's Awakening
1 Forgotten Ancient
1 Fractal Harness
1 Goldvein Hydra
1 Guardian Augmenter
1 Hardened Scales
1 Lifeblood Hydra
1 Mana Bloom
1 Open the Way
1 Ozolith, the Shattered Spire
1 Primal Might
1 Primordial Hydra
1 Silkguard
1 Steelbane Hydra
1 Altered Ego
1 Biomass Mutation
1 Elusive Otter
1 The Goose Mother
1 Hydroid Krasis
1 Oversimplify
1 Quandrix Command
1 Tanazir Quandrix
1 Zimone, All-Questioning
1 Astral Cornucopia
1 Elementalist's Palette
1 Hangarback Walker
1 Stonecoil Serpent
1 Alchemist's Refuge
1 Exotic Orchard
1 Flooded Grove
1 Hinterland Harbor
1 Oran-Rief, the Vastwood
1 Overflowing Basin
1 Rain-Slicked Copse
1 Sodden Verdure
1 Temple of Mystery
1 Vineglimmer Snarl
1 Yavimaya Coast
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Quandrix Charm
1 Paradox Gardens
1 Terramorphic Expanse
1 Rapid Hybridization
1 Beast Within
1 Kami of Whispered Hopes
1 Nature's Lore
1 Three Visits
1 Tyvar's Stand
1 Decisive Denial
1 Eureka Moment
1 Quandrix Apprentice
1 Troyan, Gutsy Explorer
1 Zimone, Quandrix Prodigy
1 Opal Palace
1 Path of Ancestry
1 Quandrix Campus
1 Reliquary Tower
1 Rogue's Passage
1 Study Hall
1 Tangled Islet
1 Temple of the False God
7 Island
6 Forest
```
Tokens: 4x Fractal//Boar · 2x Fractal//Thopter · 2x Fractal//Beast · 1x Primo, the Indivisible//Treasure · 1x Food//Frog Lizard

---

## B2. Tarkir: Dragonstorm (Apr 11, 2025) — all five clans

### Abzan Armor — White-Black-Green
**Face:** Felothar the Steadfast · **Featured:** Betor, Ancestor's Voice
Gallery: `https://magic.wizards.com/en/products/tarkir-dragonstorm/card-image-gallery?cigproduct=tdm-products-abzan-armor`

```
1 Felothar the Steadfast
1 Betor, Ancestor's Voice
1 Protector of the Wastes
1 Reunion of the House
1 Jaws of Defeat
1 Tip the Scales
1 Will of the Abzan
1 Arbor Adherent
1 Canopy Gargantuan
1 Rampart Architect
1 Tree of Redemption
1 Ikra Shidiqi, the Usurper
1 Baldin, Century Herdmaster
1 Expel the Interlopers
1 Indomitable Ancients
1 Rhox Faithmender
1 Shalai, Voice of Plenty
1 Wakestone Gargoyle
1 Wall of Reverence
1 Welcoming Vampire
1 Zetalpa, Primal Dawn
1 Arasta of the Endless Web
1 Assault Formation
1 Hornet Nest
1 Seedborn Muse
1 Sylvan Caryatid
1 Towering Titan
1 Anguished Unmaking
1 Dragonlord Dromoka
1 Faeburrow Elder
1 Shadrix Silverquill
1 Sidar Kondo of Jamuraa
1 Colfenor's Urn
1 Staff of Compleation
1 Weathered Sentinels
1 Canopy Vista
1 Exotic Orchard
1 Fortified Village
1 Isolated Chapel
1 Overgrown Farmland
1 Sungrass Prairie
1 Sunpetal Grove
1 Temple of Malady
1 Temple of Plenty
1 Temple of Silence
1 Twilight Mire
1 Woodland Cemetery
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Nyx-Fleece Ram
1 Slaughter the Strong
1 Swords to Plowshares
1 Wall of Omens
1 Wingmantle Chaplain
1 Behind the Scenes
1 Blight Pile
1 Feed the Swarm
1 Infernal Grasp
1 Wall of Limbs
1 Arboreal Grazer
1 Axebane Guardian
1 Carven Caryatid
1 Evolving Wilds
1 Jaddi Offshoot
1 Overgrown Battlement
1 Sandsteppe Citadel
1 Tower Defense
1 Wall of Blossoms
1 Wall of Roots
1 Despark
1 Indulging Patrician
1 Crashing Drawbridge
1 Orzhov Signet
1 Selesnya Signet
1 Swiftfoot Boots
1 Walking Bulwark
1 Access Tunnel
1 Bojuka Bog
1 Deceptive Landscape
1 Path of Ancestry
1 Radiant Grove
6 Plains
5 Swamp
7 Forest
```
Tokens: 2x Wall//Spider · 2x Wall//Insect · 2x Inkling//Insect · 2x Bird//Inkling · 2x Spider//Bird

### Jeskai Striker — Blue-Red-White
**Face:** Shiko and Narset, Unified · **Featured:** Elsha, Threefold Master
Gallery: `https://magic.wizards.com/en/products/tarkir-dragonstorm/card-image-gallery?cigproduct=tdm-products-jeskai-striker`

```
1 Shiko and Narset, Unified
1 Elsha, Threefold Master
1 Aligned Heart
1 Tempest Technique
1 Adaptive Training Post
1 Transcendent Dragon
1 Voracious Bibliophile
1 Caldera Pyremaw
1 Transforming Flourish
1 Will of the Jeskai
1 Vanquish the Horde
1 Narset's Reversal
1 Dismantling Wave
1 Mangara, the Diplomat
1 Monastery Mentor
1 Ancestral Vision
1 Archmage Emeritus
1 Baral's Expertise
1 Curse of the Swine
1 Haughty Djinn
1 Lier, Disciple of the Drowned
1 Rite of Replication
1 Sublime Epiphany
1 Electrodominance
1 Manaform Hellkite
1 Baral and Kari Zev
1 Expansion // Explosion
1 Magma Opus
1 Prismari Command
1 Time Wipe
1 Velomachus Lorehold
1 Veyran, Voice of Duality
1 Whirlwind of Thought
1 Adarkar Wastes
1 Battlefield Forge
1 Cascade Bluffs
1 Clifftop Retreat
1 Exotic Orchard
1 Ferrous Lake
1 Glacial Fortress
1 Irrigated Farmland
1 Prairie Stream
1 Rugged Prairie
1 Shivan Reef
1 Skycloud Expanse
1 Sulfur Falls
1 Temple of Enlightenment
1 Temple of Epiphany
1 Temple of Triumph
1 Young Pyromancer
1 Goblin Electromancer
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Ghostly Prison
1 Swords to Plowshares
1 Compulsive Research
1 Consider
1 Deep Analysis
1 Frantic Search
1 Opt
1 Ponder
1 Pongify
1 Preordain
1 Think Twice
1 Abrade
1 Big Score
1 Curse of Opulence
1 Faithless Looting
1 Guttersnipe
1 Mana Geyser
1 Shiny Impetus
1 Storm-Kiln Artist
1 Evolving Wilds
1 Mystic Monastery
1 Expressive Iteration
1 Third Path Iconoclast
1 Azorius Signet
1 Boros Signet
1 Fellwar Stone
1 Izzet Signet
1 Talisman of Progress
1 Ash Barrens
1 Path of Ancestry
1 Perilous Landscape
1 Reliquary Tower
4 Plains
5 Island
5 Mountain
```
Tokens: 2x Dragon Illusion//Monk · 2x Elemental//Gold · 2x Soldier//Copy · 2x Monk//Elemental · 1x First Mate Ragavan//Treasure · 1x Monk//Treasure

### Sultai Arisen — Black-Green-Blue
**Face:** Kotis, Sibsig Champion · **Featured:** Teval, the Balanced Scale
Gallery: `https://magic.wizards.com/en/products/tarkir-dragonstorm/card-image-gallery?cigproduct=tdm-products-sultai-arisen`

```
1 Teval, the Balanced Scale
1 Kotis, Sibsig Champion
1 Diviner of Mist
1 Afterlife from the Loam
1 Teval's Judgment
1 Welcome the Dead
1 Floral Evoker
1 Steward of the Harvest
1 Will of the Sultai
1 Colossal Grave-Reaver
1 Gravecrawler
1 Life from the Loam
1 Casualties of War
1 Amphin Mutineer
1 River Kelpie
1 Dauthi Voidwalker
1 Disciple of Bolas
1 Junji, the Midnight Sky
1 Lethal Scheme
1 Living Death
1 Lord of the Forsaken
1 Necromantic Selection
1 Necropolis Fiend
1 Noxious Gearhulk
1 Ob Nixilis, the Fallen
1 Tasigur, the Golden Fang
1 Woe Strider
1 Avenger of Zendikar
1 Conduit of Worlds
1 Multani, Yavimaya's Avatar
1 Shigeki, Jukai Visionary
1 Consuming Aberration
1 Jarad, Golgari Lich Lord
1 Lord of Extinction
1 Meren of Clan Nel Toth
1 Command Beacon
1 Crypt of Agadeem
1 Darkwater Catacombs
1 Dreamroot Cascade
1 Drownyard Temple
1 Exotic Orchard
1 Fetid Pools
1 Hinterland Harbor
1 Llanowar Wastes
1 Sunken Hollow
1 Temple of Malady
1 Woodland Cemetery
1 Essence Anchor
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Forbidden Alchemy
1 Hedron Crab
1 Treasure Cruise
1 Wonder
1 Phyrexian Reclamation
1 Reassembling Skeleton
1 Stitcher's Supplier
1 Victimize
1 Kishla Skimmer
1 Crawling Sensation
1 Cultivate
1 Farseek
1 Grapple with the Past
1 Harrow
1 Opulent Palace
1 Rampant Growth
1 Sakura-Tribe Elder
1 Satyr Wayfinder
1 Springbloom Druid
1 Tear Asunder
1 Timeless Witness
1 Grisly Salvage
1 Nyx Weaver
1 Putrefy
1 Skull Prophet
1 Millikin
1 Cephalid Coliseum
1 Contaminated Aquifer
1 Foreboding Landscape
1 Golgari Rot Farm
1 Haunted Mire
1 Memorial to Folly
1 Myriad Landscape
1 Terramorphic Expanse
4 Island
5 Swamp
6 Forest
```
Tokens: 2x Plant//Insect · 2x Plant//Goat · 2x Zombie Druid//Insect · 1x Zombie Druid//Salamander Warrior · 1x Zombie Druid//Treasure · 1x Goat//Timeless Witness · 1x Experience (helper)//Treasure

### Mardu Surge — Red-White-Black
**Face:** Zurgo Stormrender · **Featured:** Neriv, Crackling Vanguard
Gallery: `https://magic.wizards.com/en/products/tarkir-dragonstorm/card-image-gallery?cigproduct=tdm-products-mardu-surge`

```
1 Zurgo Stormrender
1 Neriv, Crackling Vanguard
1 Ainok Strike Leader
1 Ironwill Forger
1 Will of the Mardu
1 Bone Devourer
1 Within Range
1 Goldlust Triad
1 Infantry Shield
1 Redoubled Stormsinger
1 Adeline, Resplendent Cathar
1 Angel of Invention
1 Commander's Insignia
1 Divine Visitation
1 Emeria Angel
1 Grand Crescendo
1 Hero of Bladehold
1 Hour of Reckoning
1 Legion Loyalty
1 Selfless Spirit
1 Sun Titan
1 Tocasia's Welcome
1 Twilight Drover
1 Chittering Witch
1 Eliminate the Competition
1 Gix, Yawgmoth Praetor
1 Mindblade Render
1 Ophiomancer
1 Yahenni, Undying Partisan
1 Grenzo, Havoc Raiser
1 Legion Warboss
1 Ogre Battledriver
1 Siege-Gang Commander
1 Tempt with Vengeance
1 Kaya, Geist Hunter
1 Blade of Selves
1 Idol of Oblivion
1 Myr Battlesphere
1 Solemn Simulacrum
1 Battlefield Forge
1 Canyon Slough
1 Castle Ardenvale
1 Castle Embereth
1 Caves of Koilos
1 Clifftop Retreat
1 Dragonskull Summit
1 Exotic Orchard
1 Fetid Heath
1 Isolated Chapel
1 Shattered Sanctum
1 Smoldering Marsh
1 Temple of Silence
1 Temple of Triumph
1 Vault of the Archangel
1 Windbrisk Heights
1 Shadow Summoning
1 Lightning Greaves
1 Skullclamp
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Goldnight Commander
1 Lingering Souls
1 Release the Dogs
1 Stroke of Midnight
1 Swords to Plowshares
1 Bastion of Remembrance
1 Bitter Triumph
1 Deadly Dispute
1 Morbid Opportunist
1 Viscera Seer
1 Abrade
1 Beetleback Chief
1 Loyal Apprentice
1 Nomad Outpost
1 Aron, Benalia's Ruin
1 Thalisse, Reverent Medium
1 Fellwar Stone
1 Talisman of Conviction
1 Talisman of Hierarchy
1 Wayfarer's Bauble
1 Bojuka Bog
1 Path of Ancestry
1 Shattered Landscape
1 Terramorphic Expanse
5 Plains
5 Swamp
5 Mountain
```
Tokens: Treasure//Spirit · Goblin//Soldier · Human//Rat · Angel//Spirit · Bird//Thopter · Snake//Myr · Dog//Goblin · Eldrazi//Citizen · Warrior//Servo · Warrior//Elemental (1 each)

### Temur Roar — Green-Blue-Red
**Face:** Eshki, Temur's Roar · **Featured:** Ureni of the Unwritten
Gallery: `https://magic.wizards.com/en/products/tarkir-dragonstorm/card-image-gallery?cigproduct=tdm-products-temur-roar`

```
1 Ureni of the Unwritten
1 Eshki, Temur's Roar
1 Deceptive Frostkite
1 Hammerhead Tyrant
1 Will of the Temur
1 Parapet Thrasher
1 Thundermane Dragon
1 Zenith Festival
1 Become the Avalanche
1 Broodcaller Scourge
1 Keiga, the Tide Star
1 Reflections of Littjara
1 Atsushi, the Blazing Sky
1 Blasphemous Act
1 Chaos Warp
1 Dragonmaster Outcast
1 Gadrak, the Crown-Scourge
1 Glorybringer
1 Hellkite Courser
1 Lathliss, Dragon Queen
1 Leyline Tyrant
1 Nesting Dragon
1 Nogi, Draco-Zealot
1 Opportunistic Dragon
1 Scourge of the Throne
1 Skarrgan Hellkite
1 Spit Flame
1 Storm's Wrath
1 Stormbreath Dragon
1 Taurean Mauler
1 Territorial Hellkite
1 Thunderbreak Regent
1 Vengeful Ancestor
1 Verix Bladewing
1 Frontier Siege
1 Selvala's Stampede
1 Atarka, World Render
1 Dragonlord Atarka
1 Harbinger of the Hunt
1 Sarkhan, Soul Aflame
1 Temur Ascendancy
1 Dragon's Hoard
1 Steel Hellkite
1 Cinder Glade
1 Exotic Orchard
1 Flooded Grove
1 Haven of the Spirit Dragon
1 Hinterland Harbor
1 Karplusan Forest
1 Kessig Wolf Run
1 Mossfire Valley
1 Mosswort Bridge
1 Rockfall Vale
1 Rootbound Crag
1 Sheltered Thicket
1 Shivan Reef
1 Sulfur Falls
1 Temple of Abandon
1 Temple of Mystery
1 Yavimaya Coast
1 Dragon Tempest
1 Breaching Dragonstorm
1 Temple of the Dragon Queen
1 Arcane Signet
1 Sol Ring
1 Command Tower
1 Stormshriek Feral
1 Encroaching Dragonstorm
1 Draconic Lore
1 Rapid Hybridization
1 Reality Shift
1 Dragonlord's Servant
1 Rapacious Dragon
1 Whirlwing Stormbrood
1 Beast Within
1 Elemental Bond
1 Farseek
1 Evolving Wilds
1 Frontier Bivouac
1 Kodama's Reach
1 Migration Path
1 Fellwar Stone
1 Talisman of Creativity
1 Talisman of Impulse
1 Bountiful Landscape
1 Path of Ancestry
3 Island
6 Mountain
5 Forest
```
Tokens: 2x Dragon Egg//Dragon · 2x Frog Lizard//Dragon · 2x Dragon//Treasure · 2x Treasure//Beast · 1x Copy//Karox Bladewing · 1x Dragon//Copy

---
---

# PART C — `canonical_flavor_text` Intake Targets

**Why this isn't a verbatim dump:** card flavor text is copyrighted creative writing — I can't reproduce it wholesale. Below are the exact high-texture cards to pull from, with Scryfall query links. Scryfall exposes verbatim flavor text + the in-universe attribution line; copy those into your ledger per card with source = Scryfall/Gatherer + set code. This is the correct primary-source citation anyway.

### VM-378 Strixhaven — pull flavor from:
- **Prismari:** Galazeth Prismari · Prismari Command · Magma Opus · Rootha, Mercurial Artist → `https://scryfall.com/search?q=set%3Astx+ci%3Aur+is%3Aprismari+has%3Aflavor`
- **Quandrix:** Tanazir Quandrix · Quandrix Command · Zimone, Quandrix Prodigy → `https://scryfall.com/search?q=set%3Astx+ci%3Agu+has%3Aflavor`
- **Silverquill:** Shadrix Silverquill · Vanishing Verse · Inkshield · Killian, Ink Duelist → `https://scryfall.com/search?q=set%3Astx+ci%3Awb+has%3Aflavor`
- **Witherbloom:** Beledros Witherbloom · Witherbloom Command · Dina, Soul Steeper → `https://scryfall.com/search?q=set%3Astx+ci%3Abg+has%3Aflavor`
- New SOS texture: add `set:sos` variants of the queries above.

### VM-379 Grixis — pull flavor from (Alara block):
- Sedris, the Traitor King · Thraximundar · Malfegor · Sedraxis Specter · Kederekt Leviathan · Grixis Battlemage · Grixis Slavedriver
- Query: `https://scryfall.com/search?q=%28set%3Aala+or+set%3Acon+or+set%3Aarb%29+ci%3Aubr+has%3Aflavor`

### VM-380 Tarkir — pull flavor/clan-blurb texture from:
- Clan leaders + Spirit Dragons (Part A table) and the "Will of the [Clan]" cycle (Will of the Abzan/Jeskai/Sultai/Mardu/Temur).
- Query: `https://scryfall.com/search?q=set%3Atdm+%28t%3Alegendary+or+name%3A%2FWill+of+the%2F%29+has%3Aflavor`
- Clan culture descriptors are also in the official decklist intro copy (support-only, not canon proof).

---

# Carry-forward `source-intake-needed`
1. Prismari deans (Uvilda / Nassari) — confirm on first-party/wiki.
2. Silverquill deans (Embrose + radiance counterpart) — confirm both + exact titles.
3. Prismari & Witherbloom founding dragons (Galazeth / Beledros) — confirm "founder" status.
4. All verbatim flavor strings — pull from Scryfall/Gatherer with per-card attribution before promotion.
