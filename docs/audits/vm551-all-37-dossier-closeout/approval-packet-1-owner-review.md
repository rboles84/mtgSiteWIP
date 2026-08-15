# VM-551 Packet 1 Automatic Adjudication

- Validator: `vm551-evidence-validator-v1`
- Automatically approved rationale proposals: **26**
- Previously approved rationale relationships retained: **26**
- Approved rationale identity coverage: **37/37**
- Automatically approved voice relationships: **37**
- Approved voice identity coverage: **37/37**
- Rejected voice candidates retained in audit trail: **85**
- Owner exceptions: **0**

No human approval was fabricated. Every automatic approval records its evidence chain and validator result. The identity sections below are an audit view, not an approval workload.

## Azorius Senate (`WU`)

### Existing approved rationale(s)

- **Isperia, Supreme Judge:** Isperia represents Azorius leadership, and her card rewards you with additional information when opponents attack you or your planeswalkers. (`OWNER_APPROVED`)
- **Grand Arbiter Augustin IV:** The ultimate expression of Azorius tax-based gameplay; he slows the game down to a crawl. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Azorius Cluestone:** “Its three sides represent the Sova, judges and arbitrators; the Jelenn, scribes and elocutors; and the Lyev, lawmages and enforcers.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `azorius_senate_claim_001`, `azorius_senate_claim_002`, `azorius_senate_claim_003`, `azorius_senate_claim_007`
  - Why it belongs: Azorius Cluestone's exact excerpt provides a bounded voice echo of Azorius named directly through its judges, scribes, and lawmages.
  - False-positive / neighbor limit: White, Blue, and Esper also use systems and records; the explicit civic/legal institution makes this Azorius. White, Blue, and Esper also use systems and records; the explicit civic/legal institution makes this Azorius.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=WU`

### Other candidates considered and terminal disposition

- **Azorius Aethermage:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Azorius Guildgate:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## House Dimir (`UB`)

### Existing approved rationale(s)

- **Lazav, Dimir Mastermind:** Lazav appears because the certified House Dimir record identifies him as the guildmaster of the guild associated with secrecy, spies, assassins, and backroom deals. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Consult the Necrosages:** “Dimir rank and file never see nor hear their guildmaster. All orders are given through mysterious necrosages who appear from the shadows, tersely toss out a command, and then melt into the darkness.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `house_dimir_claim_0017`, `house_dimir_claim_0018`, `house_dimir_claim_0019`
  - Why it belongs: Consult the Necrosages's exact excerpt provides a bounded voice echo of Dimir named directly through unseen hierarchy and orders delivered by mysterious intermediaries.
  - False-positive / neighbor limit: Azorius and Orzhov also use hierarchy, while Blue/Black use information; the hidden backroom delivery is the Dimir distinction. Azorius and Orzhov also use hierarchy, while Blue/Black use information; the hidden backroom delivery is the Dimir distinction.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=UB`

### Other candidates considered and terminal disposition

- **Bontu's Last Reckoning:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Artful Takedown:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Cult of Rakdos (`BR`)

### Existing approved rationale(s)

- **Rakdos, Lord of Riots:** Rakdos is the native demon-headliner choice: opponents must lose life before the show begins, then life-loss discounts enormous creatures. (`OWNER_APPROVED`)
- **Rakdos, the Showstopper:** This is a pure flavor-forward Rakdos performance: the demon arrives, the stage erupts, and survival becomes a coin-flip spectacle. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Avatar of Discord:** “Such is the power of Rakdos that even his shadow takes on a cruel life of its own.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `cult_of_rakdos_claim_001`, `cult_of_rakdos_claim_002`, `cult_of_rakdos_claim_006`
  - Why it belongs: Avatar of Discord's exact excerpt provides a bounded voice echo of Rakdos named directly through cruelty made vivid and performative.
  - False-positive / neighbor limit: Mono-Red, Black, and Gruul can express danger or cruelty; only the explicit Rakdos spectacle/transgression frame supports this relationship. Mono-Red, Black, and Gruul can express danger or cruelty; only the explicit Rakdos spectacle/transgression frame supports this relationship.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=BR`

### Other candidates considered and terminal disposition

- **Blightning:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Judith, the Scourge Diva:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Gruul Clans (`RG`)

### Existing approved rationale(s)

- **Borborygmos Enraged:** Borborygmos appears because the certified Gruul record identifies him as the leader of the Burning-Tree clan. (`OWNER_APPROVED`)
- **Nikya of the Old Ways:** She forces you to abandon 'civilized' noncreature spells in exchange for massive mana for monsters. (`OWNER_APPROVED`)
- **Ruric Thar, the Unbowed:** A severe Gruul pressure piece against noncreature spell plans; creature-first tables punish players who try to solve everything with spells. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Burning-Tree Emissary:** “Those who regard the Gruul as savage simpletons underestimate the subtle power of their shamans.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_gruul_clans_core_identity_0002`, `claim_gruul_clans_philosophy_0004`, `claim_gruul_clans_placement_0001`
  - Why it belongs: Burning-Tree Emissary's exact excerpt provides a bounded voice echo of the Gruul named directly while rejecting the assumption that their wildness lacks subtle power.
  - False-positive / neighbor limit: Red, Green, and Temur can sound instinctive or wild; the explicit Gruul anti-civilization and shaman context supplies the relationship. Red, Green, and Temur can sound instinctive or wild; the explicit Gruul anti-civilization and shaman context supplies the relationship.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=RG`

### Other candidates considered and terminal disposition

- **Burning-Tree Shaman:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Bolrac-Clan Crusher:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Selesnya Conclave (`WG`)

### Existing approved rationale(s)

- **Trostani, Selesnya's Voice:** Trostani appears because the certified Selesnya record identifies the three dryads as Mat'Selesnya's speaker for Life, Order, and Harmony. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Camaraderie:** “"Within the song of Mat'Selesnya, one becomes all."
—Heruj, Selesnya hierophant”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `selesnya_conclave_claim_001`, `selesnya_conclave_claim_002`, `selesnya_conclave_claim_007`
  - Why it belongs: Camaraderie's exact excerpt provides a bounded voice echo of Mat'Selesnya named directly through the individual becoming part of a communal voice.
  - False-positive / neighbor limit: White, Green, Bant, and Ink also value community; the explicit Worldsoul/conclave unity frame is the Selesnya bridge. White, Green, Bant, and Ink also value community; the explicit Worldsoul/conclave unity frame is the Selesnya bridge.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=WG`

### Other candidates considered and terminal disposition

- **Trostani, Selesnya's Voice:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Advent of the Wurm:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Orzhov Syndicate (`WB`)

### Existing approved rationale(s)

- **Teysa Karlov:** Teysa is the clearest native Orzhov product fit: she doubles death-trigger value and turns token bodies into a more threatening spiritual workforce. (`OWNER_APPROVED`)
- **Teysa, Orzhov Scion:** This version of Teysa strongly expresses Orzhov transaction logic: sacrifice, death, replacement bodies, and exile removal all feed the same contract engine. (`OWNER_APPROVED`)
- **Karlov of the Ghost Council:** Karlov converts lifegain into visible authority: counters become removal, making every payment and tithe a future sentence. (`OWNER_APPROVED`)
- **Obzedat, Ghost Council:** Obzedat is the iconic old Orzhov power structure: deathless elites draining value, dodging consequences, and returning to collect again. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Afterlife Insurance:** “As far as the Orzhov Syndicate is concerned, it is the height of irresponsibility not to have a plan for your own ghost.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `orzhov_syndicate_claim_001`, `orzhov_syndicate_claim_002`, `orzhov_syndicate_claim_007`, `orzhov_syndicate_claim_0018`
  - Why it belongs: Afterlife Insurance's exact excerpt provides a bounded voice echo of the Orzhov named directly through a businesslike obligation extending beyond death.
  - False-positive / neighbor limit: White/Black, Golgari, and Witherbloom also use death; the insurance/debt/business frame makes the Orzhov relationship specific. White/Black, Golgari, and Witherbloom also use death; the insurance/debt/business frame makes the Orzhov relationship specific.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=WB`

### Other candidates considered and terminal disposition

- **Debt to the Deathless:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Covetous Elegy:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Izzet League (`UR`)

### Existing approved rationale(s)

- **Niv-Mizzet, Parun:** He is the cleanest native Izzet bridge: a Ravnican Izzet leader whose gameplay rewards instant/sorcery exchanges with cards and turns card draw into precise damage. (`OWNER_APPROVED`)
- **Melek, Izzet Paragon:** Melek preserves the lab-experiment feel without defaulting to the dragon. Revealing the top card and copying spells feels like an unstable experiment becoming repeatable technique. (`OWNER_APPROVED`)
- **Mizzix of the Izmagnus:** Mizzix captures the escalating experiment: every correctly sequenced spell makes the next experiment cheaper and more dangerous. (`OWNER_APPROVED`)
- **Niv-Mizzet, Dracogenius:** This is a slower, more table-readable way to center Niv-Mizzet as Izzet identity: intellect, fire, and repeatable resource conversion. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Beamsplitter Mage:** “The Izzet love replicating results.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_izzet_league_0001`, `claim_izzet_league_0003`, `claim_izzet_league_0004`, `claim_izzet_league_0006`
  - Why it belongs: Beamsplitter Mage's exact excerpt provides a bounded voice echo of the Izzet named directly through delight in replicating experimental results.
  - False-positive / neighbor limit: Prismari and Quandrix also experiment; Izzet requires invention, technical outcomes, or infrastructure rather than art or proof as the purpose. Prismari and Quandrix also experiment; Izzet requires invention, technical outcomes, or infrastructure rather than art or proof as the purpose.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=UR`

### Other candidates considered and terminal disposition

- **Cloven Casting:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Desperate Ravings:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Golgari Swarm (`BG`)

### Existing approved rationale(s)

- **Jarad, Golgari Lich Lord:** A classic Golgari leader who scales with the size of your graveyard and allows you to 'recycle' creatures into direct damage. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Bloodbond March:** “The Golgari support a vast army because death never ends its soldiers' service.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `golgari_swarm_claim_001`, `golgari_swarm_claim_007`, `golgari_swarm_claim_0018`
  - Why it belongs: Bloodbond March's exact excerpt provides a bounded voice echo of the Golgari named directly through death continuing as useful service.
  - False-positive / neighbor limit: Witherbloom and generic graveyard decks also join life and death; the explicit Golgari reclamation-and-service frame is required. Witherbloom and generic graveyard decks also join life and death; the explicit Golgari reclamation-and-service frame is required.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=BG`

### Other candidates considered and terminal disposition

- **Awaken the Erstwhile:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Contaminated Ground:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Simic Combine (`UG`)

### Existing approved rationale(s)

- **Prime Speaker Zegana:** Prime Speaker Zegana appears because the certified Simic record identifies her as the former Prime Speaker associated with Utopian incremental change. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Coiling Oracle:** “Snaking remnants of nature directed by a body of thought and progress, the oracles embody all that is Simic.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `simic_combine_claim_001`, `simic_combine_claim_002`, `simic_combine_claim_007`
  - Why it belongs: Coiling Oracle's exact excerpt provides a bounded voice echo of Simic named directly as nature directed by thought and progress.
  - False-positive / neighbor limit: Quandrix and generic Blue-Green also join nature and intellect; the explicit Simic biological-improvement context supplies the bridge. Quandrix and generic Blue-Green also join nature and intellect; the explicit Simic biological-improvement context supplies the bridge.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=UG`

### Other candidates considered and terminal disposition

- **Assault Zeppelid:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Augmenter Pugilist // Echoing Equation:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Boros Legion (`WR`)

### Existing approved rationale(s)

- **Aurelia, the Warleader:** She is the definitive Boros Guildmaster, focused on overwhelming the opponent through sheer military force. (`OWNER_APPROVED`)
- **Tajic, Legion's Edge:** A low-cost commander that protects your team from damage and encourages offensive growth. (`OWNER_APPROVED`)
- **Feather, the Redeemed:** A unique Boros 'spellslinger' engine that turns single-target buffs into recurring value. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Boros Strike-Captain:** “"Keep up with me, comrades, or I cannot guarantee you a fair share of the fracas."”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `boros_legion_claim_001`, `boros_legion_claim_004`, `boros_legion_claim_007`, `boros_legion_claim_012`
  - Why it belongs: Boros Strike-Captain's exact excerpt provides a bounded voice echo of a Boros commander explicitly addressing comrades through coordinated front-line action.
  - False-positive / neighbor limit: Mardu and mono-Red also coordinate attacks; Boros requires public duty, teamwork, and accountable martial action. Mardu and mono-Red also coordinate attacks; Boros requires public duty, teamwork, and accountable martial action.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=WR`

### Other candidates considered and terminal disposition

- **Blaze Commando:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Boros Battleshaper:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Lorehold College (`LOREHOLD`)

### Existing approved rationale(s)

- **Lorehold, the Historian:** Directly embodies the 'Eureka' moment of discovery by granting Miracle to all instants and sorceries in hand. (`OWNER_APPROVED`)
- **Quintorius, History Chaser:** Represents the college's main protagonist in his 2026 iteration, focusing on the spirit-driven historical research. (`OWNER_APPROVED`)
- **Velomachus Lorehold:** The founder of the college and the original face of Lorehold's spellslinger-aggro identity. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Campus Renovation:** “Reconstructing the past is Lorehold's specialty.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_lorehold_placement_0001`, `claim_lorehold_placement_0002`, `claim_lorehold_placement_0009`
  - Why it belongs: Campus Renovation's exact excerpt provides a bounded voice echo of Lorehold named directly through reconstructing and actively using the past.
  - False-positive / neighbor limit: White, Red, and generic artifact recursion can preserve objects; the explicit Lorehold historical-reconstruction purpose is required. White, Red, and generic artifact recursion can preserve objects; the explicit Lorehold historical-reconstruction purpose is required.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=LOREHOLD`

### Other candidates considered and terminal disposition

- **Arabella, Abandoned Doll:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ancestral Anger:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Prismari College (`PRISMARI`)

### Existing approved rationale(s)

- **Rootha, Mastering the Moment:** Rootha turns an instant or sorcery into a visible elemental performance by creating a flying, hasty Elemental whose size follows that spell's mana value. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Colorstorm Stallion:** “Prismari students are never afraid to let their imaginations run wild.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `prismari_claim_002`, `prismari_claim_004`, `prismari_claim_006`
  - Why it belongs: Colorstorm Stallion's exact excerpt provides a bounded voice echo of Prismari students named directly through imagination allowed to run wild.
  - False-positive / neighbor limit: Izzet, Quandrix, and Red can also value imagination or experimentation; the explicit Prismari student reference and art-as-magic authority provide the bounded relationship. Izzet, Quandrix, and Red can also value imagination or experimentation; the explicit Prismari student reference and art-as-magic authority provide the bounded relationship.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=PRISMARI`

### Other candidates considered and terminal disposition

- **Coastal Peak:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Rootha, Mastering the Moment:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Witherbloom College (`WITHERBLOOM`)

### Existing approved rationale(s)

- **Dina, Essence Brewer:** Dina makes Witherbloom's practical life-and-death exchange visible by turning a sacrificed creature into a card, life, and +1/+1 counters. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Blossoming Bogbeast:** “As subtle as a bogbeast
—Witherbloom expression meaning "crude and clumsy"”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `witherbloom_claim_0018`, `witherbloom_claim_0019`
  - Why it belongs: The exact creature flavor presents a proverb and explicitly identifies it as a Witherbloom expression.
  - False-positive / neighbor limit: A generic bog creature, black-green card, or clumsy-beast joke would not satisfy this relationship. The exact printing explicitly calls the line a Witherbloom expression. Green and Golgari can also use bog or beast imagery, but neither is assigned this voice through that overlap; the exact text names Witherbloom.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=WITHERBLOOM`

### Other candidates considered and terminal disposition

- **Blossoming Bogbeast:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Death Begets Life:** `REJECTED` — The excerpt is admissible for owner review only because its language corresponds to certified claims witherbloom_claim_0019, witherbloom_claim_0020, witherbloom_claim_0023; the relationship does not arise from card color, product membership, tags, or mechanics.
- **Witherbloom Campus:** `REJECTED` — The Campus relationship remains valid audit evidence, but owner testing selected a nonland native voice for the public card surface.
- **Big Play:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Blech, Loafing Pest:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Quandrix College (`QUANDRIX`)

### Existing approved rationale(s)

- **Zimone, Infinite Analyst:** Zimone makes mathematical scaling visible: +1/+1 counters reduce an X spell's cost, and casting that spell adds more counters and creates a flying Fractal token. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Additive Evolution:** “"Numbers have no limits. Why should nature?"
—Emil, Quandrix fourth-year”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `quandrix_claim_002`, `quandrix_claim_006`, `quandrix_claim_0019`, `quandrix_claim_0020`
  - Why it belongs: Additive Evolution's exact excerpt provides a bounded voice echo of a Quandrix student explicitly joining unbounded numbers to living nature.
  - False-positive / neighbor limit: Simic and Green also scale living systems; the explicit mathematical/natural synthesis makes this Quandrix rather than generic growth. Simic and Green also scale living systems; the explicit mathematical/natural synthesis makes this Quandrix rather than generic growth.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=QUANDRIX`

### Other candidates considered and terminal disposition

- **Zimone, Infinite Analyst:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Aether Helix:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Silverquill College (`SILVERQUILL`)

### Existing approved rationale(s)

- **Breena, the Demagogue:** Breena makes social influence change combat: attacks against a leading opponent can reward the attacker with a card while making Breena larger. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Beaming Defiance:** “"I've lived too long in my father's shadow. It's time to find my own light."
—Killian, Silverquill mage-student”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `silverquill_claim_0019`, `silverquill_claim_0020`, `silverquill_claim_0021`
  - Why it belongs: Beaming Defiance's exact excerpt provides a bounded voice echo of a Silverquill student using language of shadow, light, self-definition, and visible presence.
  - False-positive / neighbor limit: Prismari and mono-White can also value expression or confidence; Silverquill requires word/social influence and power-awareness rather than art alone. Prismari and mono-White can also value expression or confidence; Silverquill requires word/social influence and power-awareness rather than art alone.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=SILVERQUILL`

### Other candidates considered and terminal disposition

- **Edgar, Charmed Groom // Edgar Markov's Coffin:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Baron Bertram Graywater:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## White (`W`)

### Existing approved rationale(s)

- **Giada, Font of Hope:** Giada gives White's coordinated creature growth a direct example: she helps cast Angels, and each later Angel enters with counters for the Angels already assembled. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Aligned Heart:** “When hearts and minds align, so too do actions.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `white_claim_0002`, `white_claim_0004`, `white_claim_0006`
  - Why it belongs: Aligned Heart's exact excerpt provides a bounded voice echo of hearts and minds coordinating into shared action.
  - False-positive / neighbor limit: Selesnya, Boros, Azorius, and Ink also coordinate groups; this is a broad mono-White community-and-organization echo, not proof of any institution. Selesnya, Boros, Azorius, and Ink also coordinate groups; this is a broad mono-White community-and-organization echo, not proof of any institution.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=W`

### Other candidates considered and terminal disposition

- **Giada, Font of Hope:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Toby, Beastie Befriender:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Balan, Wandering Knight:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Black (`B`)

### Existing approved rationale(s)

- **K'rrik, Son of Yawgmoth:** K'rrik makes Black's resource-conversion pattern literal by letting life pay for black mana symbols and rewarding additional black spells with +1/+1 counters. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Ancient Craving:** “Knowledge demands sacrifice.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `black_claim_0003`, `black_claim_0004`
  - Why it belongs: Ancient Craving's exact excerpt provides a bounded voice echo of knowledge made available through an explicit sacrifice.
  - False-positive / neighbor limit: Blue and Dimir also value knowledge, while Orzhov values payment; this echo belongs here only because the line makes sacrifice the price of access rather than secrecy or institutional debt. Blue and Dimir also value knowledge, while Orzhov values payment; this echo belongs here only because the line makes sacrifice the price of access rather than secrecy or institutional debt.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=B`

### Other candidates considered and terminal disposition

- **Jerren, Corrupted Bishop // Ormendahl, the Corrupter:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ayara, First of Locthwain:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Egon, God of Death // Throne of Death:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Blue (`U`)

### Existing approved rationale(s)

- **Talrand, Sky Summoner:** Talrand turns Blue's instant-and-sorcery plan into a visible board by creating a flying Drake whenever you cast one of those spells. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Azami, Lady of Scrolls:** “"Choices belong to those with the luxuries of time and distance. We have neither. I recommend we proceed with the plan to destroy all shrines of the kami."
—Lady Azami, letter to Sensei Hisoka”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `blue_claim_0002`, `blue_claim_0003`, `blue_claim_0006`
  - Why it belongs: Azami, Lady of Scrolls's exact excerpt provides a bounded voice echo of a constrained decision answered with information, planning, and a deliberate course.
  - False-positive / neighbor limit: Azorius, Esper, Dimir, and Jeskai also plan; this is a mono-Blue knowledge-and-deliberation echo without secrecy, law, or faction doctrine. Azorius, Esper, Dimir, and Jeskai also plan; this is a mono-Blue knowledge-and-deliberation echo without secrecy, law, or faction doctrine.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=U`

### Other candidates considered and terminal disposition

- **April O'Neil, Live on the Scene:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Talrand, Sky Summoner:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Red (`R`)

### Existing approved rationale(s)

- **Torbran, Thane of Red Fell:** Torbran gives Red's direct-action pressure a clear example by increasing damage from red sources to opponents and their permanents. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Built to Smash:** “Free from Consulate regulations, renegade-built automatons push performance to the limit.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `red_claim_0002`, `red_claim_0003`, `red_claim_0005`
  - Why it belongs: Built to Smash's exact excerpt provides a bounded voice echo of freedom from imposed regulation joined to immediate action and pushing performance to its limit.
  - False-positive / neighbor limit: Gruul, Rakdos, and Kaladesh renegade themes can also reject regulation. This is a bounded mono-Red freedom-and-action echo, not identity proof from card color, artifact subject matter, or setting. Gruul, Rakdos, and Kaladesh renegade themes can also reject regulation. This is a bounded mono-Red freedom-and-action echo, not identity proof from card color, artifact subject matter, or setting.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=R`

### Other candidates considered and terminal disposition

- **Krenko, Mob Boss:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Torbran, Thane of Red Fell:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **General Kreat, the Boltbringer:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Green (`G`)

### Existing approved rationale(s)

- **Azusa, Lost but Seeking:** Azusa gives Green's land-based growth a direct Commander example by allowing two additional land plays on each of your turns. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Ghalta, Primal Hunger:** “The earth walks, strongest of all.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `green_claim_0002`, `green_claim_0004`, `green_claim_0006`
  - Why it belongs: Ghalta, Primal Hunger's exact excerpt provides a bounded voice echo of the earth itself embodied as primal strength.
  - False-positive / neighbor limit: Gruul, Naya, and Temur also use primal nature; this is a mono-Green voice echo only, not proof from creature size or card color. Gruul, Naya, and Temur also use primal nature; this is a mono-Green voice echo only, not proof from creature size or card color.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=G`

### Other candidates considered and terminal disposition

- **Azusa, Lost but Seeking:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Goreclaw, Terror of Qal Sisma:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Bant (`BANT`)

### Existing approved rationale(s)

- **Rafiq of the Many:** Rafiq is the clearest Bant champion expression: one worthy attacker receives the force and recognition of the whole. (`OWNER_APPROVED`)

### Source-complete voice proposal(s)

- **Bant Sojourners:** “"We must spread Bant's light before we are shadowed over."”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `bant_claim_0004`, `bant_claim_0007`
  - Why it belongs: Bant Sojourners's exact excerpt provides a bounded voice echo of Bant named directly through an idealized light meant to extend beyond the shard.
  - False-positive / neighbor limit: Azorius and Selesnya can also sound orderly or communal; the explicit Bant reference and its idealized public-honor frame prevent a generic WUG inference. Azorius and Selesnya can also sound orderly or communal; the explicit Bant reference and its idealized public-honor frame prevent a generic WUG inference.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=BANT`

### Other candidates considered and terminal disposition

- **Bant Sureblade:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Bant Battlemage:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Esper (`ESPER`)

### Existing approved rationale(s)

- **Y'shtola, Night's Blessed:** Y'shtola links planned noncreature spells and a known life-loss threshold to repeatable card access and pressure. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Brainbite:** “An Esper mage will leave a hole in your memory with surgical precision. A Grixis mage sees no reason to be so kind.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `esper_claim_0003`, `esper_claim_0004`, `esper_claim_0006`
  - Why it belongs: Brainbite's exact excerpt provides a bounded voice echo of Esper named directly through precise, controlled use of information.
  - False-positive / neighbor limit: Blue, Dimir, Azorius, and Grixis also use information or control; the excerpt explicitly contrasts Esper's surgical precision with Grixis. Blue, Dimir, Azorius, and Grixis also use information or control; the excerpt explicitly contrasts Esper's surgical precision with Grixis.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=ESPER`

### Other candidates considered and terminal disposition

- **Aven Trailblazer:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Desperate Farmer // Depraved Harvester:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Grixis (`GRIXIS`)

### Existing approved rationale(s)

- **Kess, Dissident Mage:** Kess turns a spent instant or sorcery into one more planned option by letting you cast one such card from your graveyard during each of your turns. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Brainbite:** “An Esper mage will leave a hole in your memory with surgical precision. A Grixis mage sees no reason to be so kind.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `grixis_claim_0003`, `grixis_claim_0004`, `grixis_claim_0006`
  - Why it belongs: Brainbite's exact excerpt provides a bounded voice echo of Grixis named directly as harsher than Esper in its use of information and harm.
  - False-positive / neighbor limit: Esper and Dimir share precision and information leverage; the explicit Esper/Grixis contrast makes the Grixis ruthlessness distinction visible. Esper and Dimir share precision and information leverage; the explicit Esper/Grixis contrast makes the Grixis ruthlessness distinction visible.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=GRIXIS`

### Other candidates considered and terminal disposition

- **Nekusar, the Mindrazer:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Kess, Dissident Mage:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Jund (`JUND`)

### Existing approved rationale(s)

- **Prossh, Skyraider of Kher:** Prossh turns each cast into a larger visible board, then lets those creatures be sacrificed for immediate power. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Broodmate Tyrant:** “Karrthus was not the first Tyrant of Jund, nor will he be the last.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `jund_claim_0003`, `jund_claim_0005`, `jund_claim_0007`
  - Why it belongs: Broodmate Tyrant's exact excerpt provides a bounded voice echo of Jund named directly through embodied succession, dominance, and survival.
  - False-positive / neighbor limit: Gruul, Naya, and Grixis can share force or survival; the explicit Jund predatory-world framing prevents generic BRG inference. Gruul, Naya, and Grixis can share force or survival; the explicit Jund predatory-world framing prevents generic BRG inference.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=JUND`

### Other candidates considered and terminal disposition

- **Charnelhoard Wurm:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Algae Gharial:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Naya (`NAYA`)

### Existing approved rationale(s)

- **Shalai and Hallar:** Shalai and Hallar turn creature growth into immediate table pressure by dealing damage when +1/+1 counters are put on your creatures. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Cradle of Vitality:** “Naya's trees grow tall and sturdy. Their foliage intertwines to form dewcups, rainwater pools where the elves gather to celebrate life.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `naya_claim_0003`, `naya_claim_0004`, `naya_claim_0007`
  - Why it belongs: Cradle of Vitality's exact excerpt provides a bounded voice echo of Naya named directly through abundant natural growth and gathering.
  - False-positive / neighbor limit: Selesnya and Green share growth and community; the explicit Naya ecosystem and abundance context prevents generic token or lifegain inference. Selesnya and Green share growth and community; the explicit Naya ecosystem and abundance context prevents generic token or lifegain inference.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=NAYA`

### Other candidates considered and terminal disposition

- **Ajani's Mantra:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Shalai and Hallar:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Abzan Houses (`ABZAN`)

### Existing approved rationale(s)

- **Felothar the Steadfast:** Felothar makes an Abzan defensive board matter in combat: creatures assign combat damage using toughness, and defenders can attack. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Abzan Banner:** “Stone to endure, roots to remember.”
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `abzan_claim_0003`, `abzan_claim_0008`
  - Why it belongs: Abzan Banner's exact excerpt provides a bounded voice echo of endurance joined to roots, memory, and Kin-Tree continuity.
  - False-positive / neighbor limit: Bant, Selesnya, and Golgari can also sound enduring or communal; the Kin-Tree and ancestor-continuity frame is the bounded Abzan bridge. Bant, Selesnya, and Golgari can also sound enduring or communal; the Kin-Tree and ancestor-continuity frame is the bounded Abzan bridge.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=ABZAN`

### Other candidates considered and terminal disposition

- **Abzan Devotee:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Abzan Guide:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Temur Frontier (`TEMUR`)

### Existing approved rationale(s)

- **Eshki, Temur's Roar:** Eshki rewards increasingly large creature spells with visible growth, then cards and damage as the creatures cross higher power thresholds. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Avalanche Tusker:** “"Hold the high ground, then bring it to your enemy."
—Surrak, khan of the Temur”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `temur_claim_0002`, `temur_claim_0003`, `temur_claim_0004`
  - Why it belongs: Avalanche Tusker's exact excerpt provides a bounded voice echo of a Temur khan joining tactical knowledge to literal natural force.
  - False-positive / neighbor limit: Gruul and Green also use physical force; the explicit Temur synthesis of terrain, problem solving, and direct action is the bridge. Gruul and Green also use physical force; the explicit Temur synthesis of terrain, problem solving, and direct action is the bridge.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=TEMUR`

### Other candidates considered and terminal disposition

- **Auroral Procession:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ainok Tracker:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Sultai Brood (`SULTAI`)

### Existing approved rationale(s)

- **Kotis, Sibsig Champion:** Kotis turns the graveyard into a constrained resource: one creature can be cast from it each turn by exiling three other graveyard cards as an additional cost. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Aggressive Negotiations:** “"When an alliance outlasts its usefulness it's best to end it quickly."
—Heng, Sultai ambassador”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `sultai_claim_0002`, `sultai_claim_0004`, `sultai_claim_0007`
  - Why it belongs: Aggressive Negotiations's exact excerpt provides a bounded voice echo of a Sultai ambassador explicitly treating alliances as tools with an expiration point.
  - False-positive / neighbor limit: Black, Dimir, Grixis, and Orzhov can all sound calculating; the explicit Sultai ruthlessness and instrumental alliance frame is required. Black, Dimir, Grixis, and Orzhov can all sound calculating; the explicit Sultai ruthlessness and instrumental alliance frame is required.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=SULTAI`

### Other candidates considered and terminal disposition

- **Blinding Spray:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Dark Deal:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Mardu Horde (`MARDU`)

### Existing approved rationale(s)

- **Zurgo Stormrender:** Zurgo makes Mardu's speed-and-pressure frame concrete by creating a temporary attacking creature whenever he attacks. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Bloodsoaked Champion:** “"Death is merely another foe the Mardu will overcome."”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `mardu_claim_0002`, `mardu_claim_0003`, `mardu_claim_0005`
  - Why it belongs: Bloodsoaked Champion's exact excerpt provides a bounded voice echo of the Mardu named directly through meeting death as another opponent.
  - False-positive / neighbor limit: Rakdos, Jund, and Black also speak in violent or death-facing terms; the explicit Mardu honor-and-action context is the bridge. Rakdos, Jund, and Black also speak in violent or death-facing terms; the explicit Mardu honor-and-action context is the bridge.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=MARDU`

### Other candidates considered and terminal disposition

- **Defibrillating Current:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Alesha, Who Smiles at Death:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Jeskai Way (`JESKAI`)

### Existing approved rationale(s)

- **Shiko and Narset, Unified:** Shiko and Narset reward deliberate spell sequencing: the second spell each turn can be copied when it targets a permanent or player. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Bloodfire Expert:** “Some efreet abandon their homes in the volcanic Fire Rim to embrace the Jeskai Way and discipline their innate flames.”
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `jeskai_claim_0002`, `jeskai_claim_0004`, `jeskai_claim_0005`
  - Why it belongs: Bloodfire Expert's exact excerpt provides a bounded voice echo of the Jeskai Way named directly through discipline applied to innate flame.
  - False-positive / neighbor limit: Prismari and Izzet also join Blue and Red through technique; the explicit Jeskai discipline, monastery, and bloodfire context supplies the bridge. Prismari and Izzet also join Blue and Red through technique; the explicit Jeskai discipline, monastery, and bloodfire context supplies the bridge.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=JESKAI`

### Other candidates considered and terminal disposition

- **Shiko and Narset, Unified:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Narset, Enlightened Exile:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Yore / Artifice (`YORE`)

### Existing approved rationale(s)

- **Breya, Etherium Shaper:** Breya makes Yore's artifice frame concrete by creating artifact creatures, then converting artifacts through several selectable effects. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Artificer's Epiphany:** “The artificers of Kaladesh strive ceaselessly for perfection, progress, and the ultimate expression of elegance.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `yore_claim_0002`, `yore_claim_0004`
  - Why it belongs: Artificer's Epiphany's exact excerpt provides a bounded voice echo of artificers pursuing perfection, progress, and designed elegance.
  - False-positive / neighbor limit: Esper, Izzet, Blue, and Witch also use technology or progress. This proposal echoes Yore's bounded artifice frame but cannot make Yore behaviorally nameable or establish a faction. Esper, Izzet, Blue, and Witch also use technology or progress. This proposal echoes Yore's bounded artifice frame but cannot make Yore behaviorally nameable or establish a faction.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=YORE`

### Other candidates considered and terminal disposition

- **Access Denied:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Abandoned Sarcophagus:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ayara, Widow of the Realm // Ayara, Furnace Queen:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Glint / Chaos (`GLINT`)

### Existing approved rationale(s)

- **Yidris, Maelstrom Wielder:** Yidris converts successful combat into volatile follow-up routes by giving spells cast from hand cascade for the rest of that turn. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Aberrant Return:** “Shadowmoor is rife with wild magic—powerful but as volatile as the plane itself.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `glint_claim_0005`
  - Why it belongs: Aberrant Return's exact excerpt provides a bounded voice echo of wild magic described as powerful and volatile.
  - False-positive / neighbor limit: Prismari, Izzet, Rakdos, and Red can also sound volatile. The excerpt reaches only Glint's bounded volatility/force edge, not its appetite or anti-order boundary. Prismari, Izzet, Rakdos, and Red can also sound volatile. The excerpt reaches only Glint's bounded volatility/force edge, not its appetite or anti-order boundary.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=GLINT`

### Other candidates considered and terminal disposition

- **Adaptive Snapjaw:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Cyclops Electromancer:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Aether Storm:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Dune / Aggression (`DUNE`)

### Existing approved rationale(s)

- **Saskia the Unyielding:** Saskia turns visible combat into concentrated pressure: you choose a player, and combat damage dealt elsewhere is repeated against that player. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Aurelia, the Warleader:** “Where Razia was aloof and untouchable, Aurelia is on the frontlines, calling for war.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `dune_claim_0005`
  - Why it belongs: Aurelia, the Warleader's exact excerpt provides a bounded voice echo of front-line leadership, immediate action, and organized force.
  - False-positive / neighbor limit: This excerpt is canonically Boros and therefore carries a high Boros/Mardu confusion risk. It is only a cross-identity voice echo for Dune's bounded direct-action frame. This excerpt is canonically Boros and therefore carries a high Boros/Mardu confusion risk. It is only a cross-identity voice echo for Dune's bounded direct-action frame.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=DUNE`

### Other candidates considered and terminal disposition

- **Apprentice Sharpshooter:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Augusta, Order Returned:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Ink / Altruism (`INK`)

### Existing approved rationale(s)

- **Kynaios and Tiro of Meletis:** Kynaios and Tiro make Ink's shared-resource frame visible: their end-step ability gives every player a chance to develop mana or draw, while their controller also draws. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Command Tower:** “Knowledge is wasted if not shared.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `ink_claim_0005`
  - Why it belongs: Command Tower's exact excerpt provides a bounded voice echo of knowledge treated as wasted unless it is shared.
  - False-positive / neighbor limit: White, Blue, Selesnya, and Five-Color can all value sharing. This proposal is limited to Ink's certified open-knowledge and community-benefit frame and does not prove the four-color identity. White, Blue, Selesnya, and Five-Color can all value sharing. This proposal is limited to Ink's certified open-knowledge and community-benefit frame and does not prove the four-color identity.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=INK`

### Other candidates considered and terminal disposition

- **Access Denied:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Aberrant Manawurm:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ancestral Anger:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Witch / Growth (`WITCH`)

### Existing approved rationale(s)

- **Atraxa, Praetors' Voice:** Atraxa gives Witch's systematic-accumulation frame a bounded example by proliferating at each of your end steps. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Animation Module:** “Design leads to progress.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `witch_claim_0005`
  - Why it belongs: Animation Module's exact excerpt provides a bounded voice echo of design producing progress through a modular object associated with counters and repeated accumulation.
  - False-positive / neighbor limit: Yore, Esper, Simic, and Blue can also connect design to progress. This echo is limited to Witch's systematic-accumulation branch and cannot establish the four-color identity alone. Yore, Esper, Simic, and Blue can also connect design to progress. This echo is limited to Witch's systematic-accumulation branch and cannot establish the four-color identity alone.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=WITCH`

### Other candidates considered and terminal disposition

- **Agent of Horizons:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Abyssal Harvester:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Assassin's Trophy:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Colorless (`COLORLESS`)

### Existing approved rationale(s)

- **Omarthis, Ghostfire Initiate:** Omarthis is a bounded example of Colorless growth support: it grows when another colorless creature receives +1/+1 counters, then manifests cards equal to its counters when it dies. (`EVIDENCE_VALIDATED_AUTOMATIC`)
- **Zhulodok, Void Gorger:** Zhulodok is a bounded example of Colorless's Eldrazi-scale branch: colorless spells cast from hand with mana value seven or greater receive cascade twice. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **All Is Dust:** “"The emergence of the Eldrazi isn't necessarily a bad thing, as long as you've already lived a fulfilling and complete life without regrets."
—Javad Nasrin, Ondu relic hunter”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `colorless_claim_0004`, `colorless_claim_0005`, `colorless_claim_0006`
  - Why it belongs: All Is Dust's exact excerpt provides a bounded voice echo of Eldrazi-scale emergence and an outside-WUBRG sense of completion and erasure.
  - False-positive / neighbor limit: Eldrazi flavor can also occur in Five-Color or Devoid decks. This is a bounded Eldrazi branch, not proof that every Eldrazi card or artifact belongs to Colorless. Eldrazi flavor can also occur in Five-Color or Devoid decks. This is a bounded Eldrazi branch, not proof that every Eldrazi card or artifact belongs to Colorless.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=COLORLESS`

### Other candidates considered and terminal disposition

- **Bane of Bala Ged:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Adarkar Sentinel:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.

## Five-Color / WUBRG (`WUBRG`)

### Existing approved rationale(s)

- **Ulalek, Fused Atrocity:** Ulalek is a deckbuilding example of Five-Color access: its verified color identity includes all five colors, while its ability uses colorless mana to copy Eldrazi spells and abilities. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete voice proposal(s)

- **Call the Spirit Dragons:** “The essence of Tarkir was shaped into draconic embodiments of the re-formed clans.”
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `wubrg_claim_0002`, `wubrg_claim_0003`, `wubrg_claim_0004`, `wubrg_claim_0007`
  - Why it belongs: The regular Tarkir: Dragonstorm printing names the re-formed clans as distinct draconic embodiments, while the card itself requires all five colors and cares about Dragons of each color.
  - False-positive / neighbor limit: The bridge depends on the exact regular-printing flavor text together with the card's five-color canonical facts, not on a generic unity, Dragon, multicolor, or Tarkir theme. Each Tarkir clan remains a distinct three-color identity, and Yore or artifact decks may also combine parts. The public relationship is limited to Five-Color access across all five colors.
  - Source: `data/dossier/card-voice-printings.source.json#identity_key=WUBRG`

### Other candidates considered and terminal disposition

- **Command Tower:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Heroes in a Half Shell:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Coalition Victory:** `REJECTED` — The former machine metaphor carried avoidable Yore, artifact, and completion false positives; it remains historical audit evidence but is not the public WUBRG voice.

### Automatic disposition

- `APPROVED_PUBLIC` under `vm551-evidence-validator-v1`; owner exception: none.
