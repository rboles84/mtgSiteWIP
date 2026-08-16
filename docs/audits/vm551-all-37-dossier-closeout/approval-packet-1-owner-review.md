# VM-551 Packet 1 Automatic Adjudication

- Validator: `vm551-evidence-validator-v1`
- Automatically approved rationale proposals: **26**
- Previously approved rationale relationships retained: **26**
- Approved rationale identity coverage: **37/37**
- Approved public voice relationships: **73**
- Owner-approved VM-558 complementary voices: **36**
- Approved voice identity coverage: **37/37**
- Rejected voice candidates retained in audit trail: **85**
- Owner exceptions: **0**

Automatic slot-1 approvals retain their evidence chain and validator result. VM-558 slot-2 approvals retain the owner's explicit semantic decision plus structural validation. The identity sections below are an audit view, not an approval workload.

## Azorius Senate (`WU`)

### Existing approved rationale(s)

- **Isperia, Supreme Judge:** Isperia represents Azorius leadership, and her card rewards you with additional information when opponents attack you or your planeswalkers. (`OWNER_APPROVED`)
- **Grand Arbiter Augustin IV:** The ultimate expression of Azorius tax-based gameplay; he slows the game down to a crawl. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Azorius Cluestone:** “Its three sides represent the Sova, judges and arbitrators; the Jelenn, scribes and elocutors; and the Lyev, lawmages and enforcers.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `azorius_senate_claim_001`, `azorius_senate_claim_002`, `azorius_senate_claim_003`, `azorius_senate_claim_007`
  - Why it belongs: Azorius Cluestone's exact excerpt provides a bounded voice echo of Azorius named directly through its judges, scribes, and lawmages.
  - False-positive / neighbor limit: White, Blue, and Esper also use systems and records; the explicit civic/legal institution makes this Azorius. White, Blue, and Esper also use systems and records; the explicit civic/legal institution makes this Azorius.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_wu_27e04c41_f42c_4d60_8a71_ec2d7c326f64`
- **Azorius Aethermage:** “In her single metasphere are bound the records of every Ætheric transaction since the time of Azor.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `azorius_senate_claim_001`, `azorius_senate_claim_002`, `azorius_senate_claim_003`, `azorius_senate_claim_007`
  - Why it belongs: Azorius Aethermage's record of every aetheric transaction gives Azorius a second voice of traceability and institutional memory.
  - False-positive / neighbor limit: Blue and Esper also value information, but this relationship depends on Azorius public records, law, and procedure rather than knowledge alone. Blue and Esper also value information, but this relationship depends on Azorius public records, law, and procedure rather than knowledge alone.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_wu_12971527_aa8e_4517_9b00_71474caebfd0`

### Other candidates considered and terminal disposition

- **Azorius Aethermage:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Azorius Guildgate:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## House Dimir (`UB`)

### Existing approved rationale(s)

- **Lazav, Dimir Mastermind:** Lazav appears because the certified House Dimir record identifies him as the guildmaster of the guild associated with secrecy, spies, assassins, and backroom deals. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Consult the Necrosages:** “Dimir rank and file never see nor hear their guildmaster. All orders are given through mysterious necrosages who appear from the shadows, tersely toss out a command, and then melt into the darkness.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `house_dimir_claim_0017`, `house_dimir_claim_0018`, `house_dimir_claim_0019`
  - Why it belongs: Consult the Necrosages's exact excerpt provides a bounded voice echo of Dimir named directly through unseen hierarchy and orders delivered by mysterious intermediaries.
  - False-positive / neighbor limit: Azorius and Orzhov also use hierarchy, while Blue/Black use information; the hidden backroom delivery is the Dimir distinction. Azorius and Orzhov also use hierarchy, while Blue/Black use information; the hidden backroom delivery is the Dimir distinction.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_ub_c9edddb4_0d60_4d21_8887_51d943c6a31f`
- **Barrier of Bones:** “The Dimir rarely make statements, but when they do, the message is clear.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `house_dimir_claim_0017`, `house_dimir_claim_0018`, `house_dimir_claim_0019`
  - Why it belongs: Barrier of Bones gives Dimir a second voice of silence used as controlled communication.
  - False-positive / neighbor limit: Blue, Black, and Silverquill can all use concise language; the explicit Dimir attribution and secrecy boundary keep this from becoming generic terseness. Blue, Black, and Silverquill can all use concise language; the explicit Dimir attribution and secrecy boundary keep this from becoming generic terseness.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_ub_4f25b125_1ded_4a34_9ed1_e6ce087ec48d`

### Other candidates considered and terminal disposition

- **Bontu's Last Reckoning:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Artful Takedown:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Cult of Rakdos (`BR`)

### Existing approved rationale(s)

- **Rakdos, Lord of Riots:** Rakdos is the native demon-headliner choice: opponents must lose life before the show begins, then life-loss discounts enormous creatures. (`OWNER_APPROVED`)
- **Rakdos, the Showstopper:** This is a pure flavor-forward Rakdos performance: the demon arrives, the stage erupts, and survival becomes a coin-flip spectacle. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Avatar of Discord:** “Such is the power of Rakdos that even his shadow takes on a cruel life of its own.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `cult_of_rakdos_claim_001`, `cult_of_rakdos_claim_002`, `cult_of_rakdos_claim_006`
  - Why it belongs: Avatar of Discord's exact excerpt provides a bounded voice echo of Rakdos named directly through cruelty made vivid and performative.
  - False-positive / neighbor limit: Mono-Red, Black, and Gruul can express danger or cruelty; only the explicit Rakdos spectacle/transgression frame supports this relationship. Mono-Red, Black, and Gruul can express danger or cruelty; only the explicit Rakdos spectacle/transgression frame supports this relationship.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_br_3f806353_592e_431c_a7dd_a4c64034f94d`
- **Judith, the Scourge Diva:** “At the end of the show, she stands alone on a stage brilliant with blood.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `cult_of_rakdos_claim_001`, `cult_of_rakdos_claim_002`, `cult_of_rakdos_claim_006`
  - Why it belongs: Judith's stage aftermath gives Rakdos a second voice of dangerous public performance.
  - False-positive / neighbor limit: Black and Red can be violent without being Rakdos; the stage, show, performer, and visible consequence are the required bridge. Black and Red can be violent without being Rakdos; the stage, show, performer, and visible consequence are the required bridge.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_br_c01516e0_eec3_4370_b935_7674982e8850`

### Other candidates considered and terminal disposition

- **Blightning:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Judith, the Scourge Diva:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Gruul Clans (`RG`)

### Existing approved rationale(s)

- **Borborygmos Enraged:** Borborygmos appears because the certified Gruul record identifies him as the leader of the Burning-Tree clan. (`OWNER_APPROVED`)
- **Nikya of the Old Ways:** She forces you to abandon 'civilized' noncreature spells in exchange for massive mana for monsters. (`OWNER_APPROVED`)
- **Ruric Thar, the Unbowed:** A severe Gruul pressure piece against noncreature spell plans; creature-first tables punish players who try to solve everything with spells. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Burning-Tree Emissary:** “Those who regard the Gruul as savage simpletons underestimate the subtle power of their shamans.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_gruul_clans_core_identity_0002`, `claim_gruul_clans_philosophy_0004`, `claim_gruul_clans_placement_0001`
  - Why it belongs: Burning-Tree Emissary's exact excerpt provides a bounded voice echo of the Gruul named directly while rejecting the assumption that their wildness lacks subtle power.
  - False-positive / neighbor limit: Red, Green, and Temur can sound instinctive or wild; the explicit Gruul anti-civilization and shaman context supplies the relationship. Red, Green, and Temur can sound instinctive or wild; the explicit Gruul anti-civilization and shaman context supplies the relationship.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_rg_327d9679_0049_4401_8dab_e0fb362306bd`
- **Decimate:** “Anarchy comes in many forms: social, individual, Gruul . . .”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_gruul_clans_core_identity_0002`, `claim_gruul_clans_philosophy_0004`, `claim_gruul_clans_placement_0001`
  - Why it belongs: Decimate gives Gruul a second voice of explicit anarchic resistance.
  - False-positive / neighbor limit: Rakdos and Red also reject restraint, but Gruul's target here is civilization and imposed order rather than spectacle or private freedom. Rakdos and Red also reject restraint, but Gruul's target here is civilization and imposed order rather than spectacle or private freedom.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_rg_a4e5693f_12a0_451e_818d_d6efc7b4ed25`

### Other candidates considered and terminal disposition

- **Burning-Tree Shaman:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Bolrac-Clan Crusher:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Selesnya Conclave (`WG`)

### Existing approved rationale(s)

- **Trostani, Selesnya's Voice:** Trostani appears because the certified Selesnya record identifies the three dryads as Mat'Selesnya's speaker for Life, Order, and Harmony. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Camaraderie:** “"Within the song of Mat'Selesnya, one becomes all."
—Heruj, Selesnya hierophant”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `selesnya_conclave_claim_001`, `selesnya_conclave_claim_002`, `selesnya_conclave_claim_007`
  - Why it belongs: Camaraderie's exact excerpt provides a bounded voice echo of Mat'Selesnya named directly through the individual becoming part of a communal voice.
  - False-positive / neighbor limit: White, Green, Bant, and Ink also value community; the explicit Worldsoul/conclave unity frame is the Selesnya bridge. White, Green, Bant, and Ink also value community; the explicit Worldsoul/conclave unity frame is the Selesnya bridge.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_wg_9aab386c_d48c_4611_b757_aa69b26cc1b1`
- **Advent of the Wurm:** “The consciousness of Mat'Selesnya does not always spread in peaceful ways.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `selesnya_conclave_claim_001`, `selesnya_conclave_claim_002`, `selesnya_conclave_claim_007`
  - Why it belongs: Advent of the Wurm gives Selesnya a second voice of unity willing to mobilize.
  - False-positive / neighbor limit: Boros and Naya can also use communal force; the explicit Mat'Selesnya consciousness and preservation frame make this Selesnya. Boros and Naya can also use communal force; the explicit Mat'Selesnya consciousness and preservation frame make this Selesnya.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_wg_eb62aa4b_c11b_4195_ae85_cff8f78ce17b`

### Other candidates considered and terminal disposition

- **Trostani, Selesnya's Voice:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Advent of the Wurm:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Orzhov Syndicate (`WB`)

### Existing approved rationale(s)

- **Teysa Karlov:** Teysa is the clearest native Orzhov product fit: she doubles death-trigger value and turns token bodies into a more threatening spiritual workforce. (`OWNER_APPROVED`)
- **Teysa, Orzhov Scion:** This version of Teysa strongly expresses Orzhov transaction logic: sacrifice, death, replacement bodies, and exile removal all feed the same contract engine. (`OWNER_APPROVED`)
- **Karlov of the Ghost Council:** Karlov converts lifegain into visible authority: counters become removal, making every payment and tithe a future sentence. (`OWNER_APPROVED`)
- **Obzedat, Ghost Council:** Obzedat is the iconic old Orzhov power structure: deathless elites draining value, dodging consequences, and returning to collect again. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Afterlife Insurance:** “As far as the Orzhov Syndicate is concerned, it is the height of irresponsibility not to have a plan for your own ghost.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `orzhov_syndicate_claim_001`, `orzhov_syndicate_claim_002`, `orzhov_syndicate_claim_007`, `orzhov_syndicate_claim_0018`
  - Why it belongs: Afterlife Insurance's exact excerpt provides a bounded voice echo of the Orzhov named directly through a businesslike obligation extending beyond death.
  - False-positive / neighbor limit: White/Black, Golgari, and Witherbloom also use death; the insurance/debt/business frame makes the Orzhov relationship specific. White/Black, Golgari, and Witherbloom also use death; the insurance/debt/business frame makes the Orzhov relationship specific.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_wb_05501e88_d4c3_4474_92a9_c02ab15b107b`
- **Covetous Elegy:** “Wealthier than ever thanks to exorbitant interest on wartime loans, the Orzhov only grew hungrier for more.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `orzhov_syndicate_claim_001`, `orzhov_syndicate_claim_002`, `orzhov_syndicate_claim_007`, `orzhov_syndicate_claim_0018`
  - Why it belongs: Covetous Elegy gives Orzhov a second voice of institutional greed feeding on its own success.
  - False-positive / neighbor limit: Black can be greedy and Azorius can be institutional; the explicit Orzhov loan-and-interest system is what joins appetite to organized obligation. Black can be greedy and Azorius can be institutional; the explicit Orzhov loan-and-interest system is what joins appetite to organized obligation.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_wb_dd69ef80_d30c_4b15_aec8_4154dc20cb25`

### Other candidates considered and terminal disposition

- **Debt to the Deathless:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Covetous Elegy:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Izzet League (`UR`)

### Existing approved rationale(s)

- **Niv-Mizzet, Parun:** He is the cleanest native Izzet bridge: a Ravnican Izzet leader whose gameplay rewards instant/sorcery exchanges with cards and turns card draw into precise damage. (`OWNER_APPROVED`)
- **Melek, Izzet Paragon:** Melek preserves the lab-experiment feel without defaulting to the dragon. Revealing the top card and copying spells feels like an unstable experiment becoming repeatable technique. (`OWNER_APPROVED`)
- **Mizzix of the Izmagnus:** Mizzix captures the escalating experiment: every correctly sequenced spell makes the next experiment cheaper and more dangerous. (`OWNER_APPROVED`)
- **Niv-Mizzet, Dracogenius:** This is a slower, more table-readable way to center Niv-Mizzet as Izzet identity: intellect, fire, and repeatable resource conversion. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Beamsplitter Mage:** “The Izzet love replicating results.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_izzet_league_0001`, `claim_izzet_league_0003`, `claim_izzet_league_0004`, `claim_izzet_league_0006`
  - Why it belongs: Beamsplitter Mage's exact excerpt provides a bounded voice echo of the Izzet named directly through delight in replicating experimental results.
  - False-positive / neighbor limit: Prismari and Quandrix also experiment; Izzet requires invention, technical outcomes, or infrastructure rather than art or proof as the purpose. Prismari and Quandrix also experiment; Izzet requires invention, technical outcomes, or infrastructure rather than art or proof as the purpose.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_ur_fa09e18c_e7cf_4f08_9cc4_324e36594063`
- **Blustersquall:** “Weather is more predictable than the Izzet.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_izzet_league_0001`, `claim_izzet_league_0003`, `claim_izzet_league_0004`, `claim_izzet_league_0006`
  - Why it belongs: Blustersquall gives Izzet a second voice of technical energy outrunning predictability.
  - False-positive / neighbor limit: Prismari and Rakdos can also be volatile; the explicit Izzet comparison keeps the emphasis on experimental invention rather than art or spectacle. Prismari and Rakdos can also be volatile; the explicit Izzet comparison keeps the emphasis on experimental invention rather than art or spectacle.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_ur_2dfad8c3_1973_4fc8_971d_f66cacd88070`

### Other candidates considered and terminal disposition

- **Cloven Casting:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Desperate Ravings:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Golgari Swarm (`BG`)

### Existing approved rationale(s)

- **Jarad, Golgari Lich Lord:** A classic Golgari leader who scales with the size of your graveyard and allows you to 'recycle' creatures into direct damage. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Bloodbond March:** “The Golgari support a vast army because death never ends its soldiers' service.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `golgari_swarm_claim_001`, `golgari_swarm_claim_007`, `golgari_swarm_claim_0018`
  - Why it belongs: Bloodbond March's exact excerpt provides a bounded voice echo of the Golgari named directly through death continuing as useful service.
  - False-positive / neighbor limit: Witherbloom and generic graveyard decks also join life and death; the explicit Golgari reclamation-and-service frame is required. Witherbloom and generic graveyard decks also join life and death; the explicit Golgari reclamation-and-service frame is required.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_bg_fc17d8dd_887f_405e_a195_777aa3da36f5`
- **Contaminated Ground:** “"No one cares about pollution until they can see it." —Gurras, Golgari rot farmer”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `golgari_swarm_claim_001`, `golgari_swarm_claim_007`, `golgari_swarm_claim_0018`
  - Why it belongs: Contaminated Ground gives Golgari a second voice of rot labor and visible ecological consequence.
  - False-positive / neighbor limit: Witherbloom and Green can discuss ecology, but the named Golgari rot farmer and undercity decay frame keep this tied to reclamation rather than essence study or harmony. Witherbloom and Green can discuss ecology, but the named Golgari rot farmer and undercity decay frame keep this tied to reclamation rather than essence study or harmony.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_bg_55e04860_f4f5_445b_81f2_b500fa9b456a`

### Other candidates considered and terminal disposition

- **Awaken the Erstwhile:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Contaminated Ground:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Simic Combine (`UG`)

### Existing approved rationale(s)

- **Prime Speaker Zegana:** Prime Speaker Zegana appears because the certified Simic record identifies her as the former Prime Speaker associated with Utopian incremental change. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Coiling Oracle:** “Snaking remnants of nature directed by a body of thought and progress, the oracles embody all that is Simic.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `simic_combine_claim_001`, `simic_combine_claim_002`, `simic_combine_claim_007`
  - Why it belongs: Coiling Oracle's exact excerpt provides a bounded voice echo of Simic named directly as nature directed by thought and progress.
  - False-positive / neighbor limit: Quandrix and generic Blue-Green also join nature and intellect; the explicit Simic biological-improvement context supplies the bridge. Quandrix and generic Blue-Green also join nature and intellect; the explicit Simic biological-improvement context supplies the bridge.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_ug_69fd4ddf_9ed8_4c56_bef3_9944daf05e4f`
- **Bioshift:** “"It's all right if you change your mind. There's always a chance we can rearrange parts later." —Zija, Simic mutationist”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `simic_combine_claim_001`, `simic_combine_claim_002`, `simic_combine_claim_007`
  - Why it belongs: Bioshift gives Simic a second voice of iterative biological optimization.
  - False-positive / neighbor limit: Quandrix can test theories and Blue can revise plans; the explicit Simic mutationist and bodily rearrangement make this biological improvement. Quandrix can test theories and Blue can revise plans; the explicit Simic mutationist and bodily rearrangement make this biological improvement.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_ug_3da604fc_68e9_4749_98f9_6fbcebcab9b6`

### Other candidates considered and terminal disposition

- **Assault Zeppelid:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Augmenter Pugilist // Echoing Equation:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Boros Legion (`WR`)

### Existing approved rationale(s)

- **Aurelia, the Warleader:** She is the definitive Boros Guildmaster, focused on overwhelming the opponent through sheer military force. (`OWNER_APPROVED`)
- **Tajic, Legion's Edge:** A low-cost commander that protects your team from damage and encourages offensive growth. (`OWNER_APPROVED`)
- **Feather, the Redeemed:** A unique Boros 'spellslinger' engine that turns single-target buffs into recurring value. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Boros Strike-Captain:** “"Keep up with me, comrades, or I cannot guarantee you a fair share of the fracas."”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `boros_legion_claim_001`, `boros_legion_claim_004`, `boros_legion_claim_007`, `boros_legion_claim_012`
  - Why it belongs: Boros Strike-Captain's exact excerpt provides a bounded voice echo of a Boros commander explicitly addressing comrades through coordinated front-line action.
  - False-positive / neighbor limit: Mardu and mono-Red also coordinate attacks; Boros requires public duty, teamwork, and accountable martial action. Mardu and mono-Red also coordinate attacks; Boros requires public duty, teamwork, and accountable martial action.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_wr_30b20932_0d9a_447f_b934_1daa8c44a678`
- **Boros Battleshaper:** “Leaders shape the minds of their allies. It takes a master to shape the minds of enemies.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `boros_legion_claim_001`, `boros_legion_claim_004`, `boros_legion_claim_007`, `boros_legion_claim_012`
  - Why it belongs: Boros Battleshaper gives Boros a second voice of accountable martial command.
  - False-positive / neighbor limit: Mardu and Azorius can also organize action; the Boros battlefield frame requires public leadership and disciplined force rather than speed or procedure alone. Mardu and Azorius can also organize action; the Boros battlefield frame requires public leadership and disciplined force rather than speed or procedure alone.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_wr_cf5bf1ef_e40b_4fb5_8148_d4ca7a307501`

### Other candidates considered and terminal disposition

- **Blaze Commando:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Boros Battleshaper:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Lorehold College (`LOREHOLD`)

### Existing approved rationale(s)

- **Lorehold, the Historian:** Directly embodies the 'Eureka' moment of discovery by granting Miracle to all instants and sorceries in hand. (`OWNER_APPROVED`)
- **Quintorius, History Chaser:** Represents the college's main protagonist in his 2026 iteration, focusing on the spirit-driven historical research. (`OWNER_APPROVED`)
- **Velomachus Lorehold:** The founder of the college and the original face of Lorehold's spellslinger-aggro identity. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Campus Renovation:** “Reconstructing the past is Lorehold's specialty.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_lorehold_placement_0001`, `claim_lorehold_placement_0002`, `claim_lorehold_placement_0009`
  - Why it belongs: Campus Renovation's exact excerpt provides a bounded voice echo of Lorehold named directly through reconstructing and actively using the past.
  - False-positive / neighbor limit: White, Red, and generic artifact recursion can preserve objects; the explicit Lorehold historical-reconstruction purpose is required. White, Red, and generic artifact recursion can preserve objects; the explicit Lorehold historical-reconstruction purpose is required.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_lorehold_d34a3b58_a905_4e90_b35c_9f5c21149b04`
- **Ancestral Anger:** “An incautious Lorehold student may learn more about the unbound rage of the Blood Age than they wanted to.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `claim_lorehold_placement_0001`, `claim_lorehold_placement_0002`, `claim_lorehold_placement_0009`
  - Why it belongs: Ancestral Anger gives Lorehold a second voice of the past becoming present and dangerous.
  - False-positive / neighbor limit: Red can express rage and Abzan can honor ancestors; the explicit Lorehold student and act of learning are what make this historical encounter. Red can express rage and Abzan can honor ancestors; the explicit Lorehold student and act of learning are what make this historical encounter.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_lorehold_e0828e8d_f01f_4088_9123_6d923ddb3242`

### Other candidates considered and terminal disposition

- **Arabella, Abandoned Doll:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ancestral Anger:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Prismari College (`PRISMARI`)

### Existing approved rationale(s)

- **Rootha, Mastering the Moment:** Rootha turns an instant or sorcery into a visible elemental performance by creating a flying, hasty Elemental whose size follows that spell's mana value. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Colorstorm Stallion:** “Prismari students are never afraid to let their imaginations run wild.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `prismari_claim_002`, `prismari_claim_004`, `prismari_claim_006`
  - Why it belongs: Colorstorm Stallion's exact excerpt provides a bounded voice echo of Prismari students named directly through imagination allowed to run wild.
  - False-positive / neighbor limit: Izzet, Quandrix, and Red can also value imagination or experimentation; the explicit Prismari student reference and art-as-magic authority provide the bounded relationship. Izzet, Quandrix, and Red can also value imagination or experimentation; the explicit Prismari student reference and art-as-magic authority provide the bounded relationship.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_prismari_47ee6837_2e2f_4344_ab9f_6b8887874f77`
- **Culmination of Studies:** “Will's quick thinking meshed with Rowan's raw power to bring down the Blood Avatar.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `prismari_claim_002`, `prismari_claim_004`, `prismari_claim_006`
  - Why it belongs: Culmination of Studies gives Prismari a second voice of disciplined craft carrying expressive force.
  - False-positive / neighbor limit: Izzet can combine ideas with power, but this bridge is about expressive elemental craft rather than an engineered result. Izzet can combine ideas with power, but this bridge is about expressive elemental craft rather than an engineered result.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_prismari_d4e124af_d335_4c42_b60a_fe578f69f7ed`

### Other candidates considered and terminal disposition

- **Coastal Peak:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Rootha, Mastering the Moment:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Witherbloom College (`WITHERBLOOM`)

### Existing approved rationale(s)

- **Dina, Essence Brewer:** Dina makes Witherbloom's practical life-and-death exchange visible by turning a sacrificed creature into a card, life, and +1/+1 counters. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Blossoming Bogbeast:** “As subtle as a bogbeast
—Witherbloom expression meaning "crude and clumsy"”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `witherbloom_claim_0018`, `witherbloom_claim_0019`
  - Why it belongs: The exact creature flavor presents a proverb and explicitly identifies it as a Witherbloom expression.
  - False-positive / neighbor limit: A generic bog creature, black-green card, or clumsy-beast joke would not satisfy this relationship. The exact printing explicitly calls the line a Witherbloom expression. Green and Golgari can also use bog or beast imagery, but neither is assigned this voice through that overlap; the exact text names Witherbloom.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_witherbloom_30f3c3be_0fe9_463d_a245_e44701aec7f2`
- **Deadly Brew:** “No one ever asked what was in Dina's concoctions, so long as they worked.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `witherbloom_claim_0018`, `witherbloom_claim_0019`
  - Why it belongs: Deadly Brew gives Witherbloom a second voice of applied life-and-death craft.
  - False-positive / neighbor limit: Golgari and Black-Green decks also use death and sacrifice; Dina's concoctions matter here as embodied essence study, not generic graveyard value. Golgari and Black-Green decks also use death and sacrifice; Dina's concoctions matter here as embodied essence study, not generic graveyard value.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_witherbloom_b831d3f8_07ce_4172_ba29_213cac414c9a`

### Other candidates considered and terminal disposition

- **Blossoming Bogbeast:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Death Begets Life:** `REJECTED` — The excerpt is admissible for owner review only because its language corresponds to certified claims witherbloom_claim_0019, witherbloom_claim_0020, witherbloom_claim_0023; the relationship does not arise from card color, product membership, tags, or mechanics.
- **Witherbloom Campus:** `REJECTED` — The Campus relationship remains valid audit evidence, but owner testing selected a nonland native voice for the public card surface.
- **Big Play:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Blech, Loafing Pest:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Quandrix College (`QUANDRIX`)

### Existing approved rationale(s)

- **Zimone, Infinite Analyst:** Zimone makes mathematical scaling visible: +1/+1 counters reduce an X spell's cost, and casting that spell adds more counters and creates a flying Fractal token. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Additive Evolution:** “"Numbers have no limits. Why should nature?"
—Emil, Quandrix fourth-year”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `quandrix_claim_002`, `quandrix_claim_006`, `quandrix_claim_0019`, `quandrix_claim_0020`
  - Why it belongs: Additive Evolution's exact excerpt provides a bounded voice echo of a Quandrix student explicitly joining unbounded numbers to living nature.
  - False-positive / neighbor limit: Simic and Green also scale living systems; the explicit mathematical/natural synthesis makes this Quandrix rather than generic growth. Simic and Green also scale living systems; the explicit mathematical/natural synthesis makes this Quandrix rather than generic growth.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_quandrix_ce1a6c1f_6b4e_4d19_b256_48d073b359b7`
- **Golden Ratio:** “"When I look around, I see a world defined by patterns that still manages to defy them." —Kianne, Quandrix dean”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `quandrix_claim_002`, `quandrix_claim_003`, `quandrix_claim_006`, `quandrix_claim_0019`, `quandrix_claim_0020`, `quandrix_claim_0028`
  - Why it belongs: Golden Ratio gives Quandrix a second voice that recognizes mathematical pattern in nature without reducing nature to a solved equation.
  - False-positive / neighbor limit: Izzet can chase equations and Simic can alter living systems, but Kianne's line is about mathematical patterns discovered in nature—and nature's capacity to exceed them—rather than invention or biological experimentation. Izzet can chase equations and Simic can alter living systems, but Kianne's line is about mathematical patterns discovered in nature—and nature's capacity to exceed them—rather than invention or biological experimentation.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_quandrix_724700ad_1e4e_4cbc_af7f_0b3b87ed4bc8`

### Other candidates considered and terminal disposition

- **Zimone, Infinite Analyst:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Aether Helix:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Silverquill College (`SILVERQUILL`)

### Existing approved rationale(s)

- **Breena, the Demagogue:** Breena makes social influence change combat: attacks against a leading opponent can reward the attacker with a card while making Breena larger. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Beaming Defiance:** “"I've lived too long in my father's shadow. It's time to find my own light."
—Killian, Silverquill mage-student”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `silverquill_claim_0019`, `silverquill_claim_0020`, `silverquill_claim_0021`
  - Why it belongs: Beaming Defiance's exact excerpt provides a bounded voice echo of a Silverquill student using language of shadow, light, self-definition, and visible presence.
  - False-positive / neighbor limit: Prismari and mono-White can also value expression or confidence; Silverquill requires word/social influence and power-awareness rather than art alone. Prismari and mono-White can also value expression or confidence; Silverquill requires word/social influence and power-awareness rather than art alone.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_silverquill_f88eeb04_4b8e_4c76_a8c6_90887b94d518`
- **Clever Lumimancer:** “"You're too dim to realize it, but you've already lost."”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `silverquill_claim_0019`, `silverquill_claim_0020`, `silverquill_claim_0021`
  - Why it belongs: Clever Lumimancer gives Silverquill a second voice of rhetoric used to intimidate and win status.
  - False-positive / neighbor limit: Orzhov and Azorius can wield law or hierarchy; this line belongs only as a word-centered act of public influence and competitive pressure. Orzhov and Azorius can wield law or hierarchy; this line belongs only as a word-centered act of public influence and competitive pressure.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_silverquill_901eb916_f318_4a30_a43e_8e7f9eef358b`

### Other candidates considered and terminal disposition

- **Edgar, Charmed Groom // Edgar Markov's Coffin:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Baron Bertram Graywater:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## White (`W`)

### Existing approved rationale(s)

- **Giada, Font of Hope:** Giada gives White's coordinated creature growth a direct example: she helps cast Angels, and each later Angel enters with counters for the Angels already assembled. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Aligned Heart:** “When hearts and minds align, so too do actions.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `white_claim_0002`, `white_claim_0004`, `white_claim_0006`
  - Why it belongs: Aligned Heart's exact excerpt provides a bounded voice echo of hearts and minds coordinating into shared action.
  - False-positive / neighbor limit: Selesnya, Boros, Azorius, and Ink also coordinate groups; this is a broad mono-White community-and-organization echo, not proof of any institution. Selesnya, Boros, Azorius, and Ink also coordinate groups; this is a broad mono-White community-and-organization echo, not proof of any institution.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_w_ae61b2ef_2e60_499a_8708_e37b9bd5620e`
- **Ajani's Welcome:** “"You cannot defend others if your own well-being is neglected."”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `white_claim_0002`, `white_claim_0004`, `white_claim_0006`
  - Why it belongs: Ajani's Welcome gives White a second voice of care sustaining responsibility to others.
  - False-positive / neighbor limit: Green and Selesnya also value care; this relationship is bounded to White's duty, protection, and group-oriented service. Green and Selesnya also value care; this relationship is bounded to White's duty, protection, and group-oriented service.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_w_4a782bf9_4051_4613_8852_33b0d85a0edd`

### Other candidates considered and terminal disposition

- **Giada, Font of Hope:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Toby, Beastie Befriender:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Balan, Wandering Knight:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Black (`B`)

### Existing approved rationale(s)

- **K'rrik, Son of Yawgmoth:** K'rrik makes Black's resource-conversion pattern literal by letting life pay for black mana symbols and rewarding additional black spells with +1/+1 counters. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Ancient Craving:** “Knowledge demands sacrifice.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `black_claim_0003`, `black_claim_0004`
  - Why it belongs: Ancient Craving's exact excerpt provides a bounded voice echo of knowledge made available through an explicit sacrifice.
  - False-positive / neighbor limit: Blue and Dimir also value knowledge, while Orzhov values payment; this echo belongs here only because the line makes sacrifice the price of access rather than secrecy or institutional debt. Blue and Dimir also value knowledge, while Orzhov values payment; this echo belongs here only because the line makes sacrifice the price of access rather than secrecy or institutional debt.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_b_78725353_9274_420a_b722_add0f43c444e`
- **Ayara, First of Locthwain:** “Mourning shifts seamlessly to celebration as she chooses her next suitor.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `black_claim_0003`, `black_claim_0004`
  - Why it belongs: Ayara gives Black a second voice of ambition moving on as soon as an opening appears.
  - False-positive / neighbor limit: Rakdos and Grixis can also be ruthless; this is the mono-Black pursuit of personal opportunity rather than spectacle or survival-world necessity. Rakdos and Grixis can also be ruthless; this is the mono-Black pursuit of personal opportunity rather than spectacle or survival-world necessity.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_b_388168b3_ec68_4af2_b88c_6a5ec88c15f6`

### Other candidates considered and terminal disposition

- **Jerren, Corrupted Bishop // Ormendahl, the Corrupter:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ayara, First of Locthwain:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Egon, God of Death // Throne of Death:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Blue (`U`)

### Existing approved rationale(s)

- **Talrand, Sky Summoner:** Talrand turns Blue's instant-and-sorcery plan into a visible board by creating a flying Drake whenever you cast one of those spells. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Azami, Lady of Scrolls:** “"Choices belong to those with the luxuries of time and distance. We have neither. I recommend we proceed with the plan to destroy all shrines of the kami."
—Lady Azami, letter to Sensei Hisoka”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `blue_claim_0002`, `blue_claim_0003`, `blue_claim_0006`
  - Why it belongs: Azami, Lady of Scrolls's exact excerpt provides a bounded voice echo of a constrained decision answered with information, planning, and a deliberate course.
  - False-positive / neighbor limit: Azorius, Esper, Dimir, and Jeskai also plan; this is a mono-Blue knowledge-and-deliberation echo without secrecy, law, or faction doctrine. Azorius, Esper, Dimir, and Jeskai also plan; this is a mono-Blue knowledge-and-deliberation echo without secrecy, law, or faction doctrine.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_u_0f8b97fe_3e5e_47c2_9a9d_7f77482aa159`
- **April O'Neil, Live on the Scene:** “"This is great! I must really be onto something hot if they're trying to kill me!"”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `blue_claim_0002`, `blue_claim_0003`, `blue_claim_0006`
  - Why it belongs: April O'Neil gives Blue a second voice of inquiry that becomes more determined as the evidence gets dangerous.
  - False-positive / neighbor limit: Dimir and Black can pursue dangerous information for leverage; this relationship is bounded to curiosity, investigation, and finding the truth. Dimir and Black can pursue dangerous information for leverage; this relationship is bounded to curiosity, investigation, and finding the truth.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_u_4900c157_8d9f_4f92_aaca_5246b6e2832e`

### Other candidates considered and terminal disposition

- **April O'Neil, Live on the Scene:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Talrand, Sky Summoner:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Red (`R`)

### Existing approved rationale(s)

- **Torbran, Thane of Red Fell:** Torbran gives Red's direct-action pressure a clear example by increasing damage from red sources to opponents and their permanents. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Built to Smash:** “Free from Consulate regulations, renegade-built automatons push performance to the limit.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `red_claim_0002`, `red_claim_0003`, `red_claim_0005`
  - Why it belongs: Built to Smash's exact excerpt provides a bounded voice echo of freedom from imposed regulation joined to immediate action and pushing performance to its limit.
  - False-positive / neighbor limit: Gruul, Rakdos, and Kaladesh renegade themes can also reject regulation. This is a bounded mono-Red freedom-and-action echo, not identity proof from card color, artifact subject matter, or setting. Gruul, Rakdos, and Kaladesh renegade themes can also reject regulation. This is a bounded mono-Red freedom-and-action echo, not identity proof from card color, artifact subject matter, or setting.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_r_c363f338_0777_45e6_b13c_f15ba026b63a`
- **Brambleguard Captain:** “"We sought adventure and found calamity. Forward, so we may meet both with courage!"”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `red_claim_0002`, `red_claim_0003`, `red_claim_0005`
  - Why it belongs: Brambleguard Captain gives Red a second voice of vivid experience accepted through action.
  - False-positive / neighbor limit: Boros and Mardu also move forward under pressure; the Red bridge is emotional willingness to experience the moment rather than duty or conquest. Boros and Mardu also move forward under pressure; the Red bridge is emotional willingness to experience the moment rather than duty or conquest.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_r_104baa4e_a3f3_45dc_979d_4c58b659ba1a`

### Other candidates considered and terminal disposition

- **Krenko, Mob Boss:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Torbran, Thane of Red Fell:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **General Kreat, the Boltbringer:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Green (`G`)

### Existing approved rationale(s)

- **Azusa, Lost but Seeking:** Azusa gives Green's land-based growth a direct Commander example by allowing two additional land plays on each of your turns. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Ghalta, Primal Hunger:** “The earth walks, strongest of all.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `green_claim_0002`, `green_claim_0004`, `green_claim_0006`
  - Why it belongs: Ghalta, Primal Hunger's exact excerpt provides a bounded voice echo of the earth itself embodied as primal strength.
  - False-positive / neighbor limit: Gruul, Naya, and Temur also use primal nature; this is a mono-Green voice echo only, not proof from creature size or card color. Gruul, Naya, and Temur also use primal nature; this is a mono-Green voice echo only, not proof from creature size or card color.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_g_b0b6be0c_41cf_4757_9f0e_87227b6ba6b3`
- **Attuned Hunter:** “"Sokran is no mere bear. She is friend, family, and confidante—and more intelligent than some of my blood relatives."”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `green_claim_0002`, `green_claim_0004`, `green_claim_0006`
  - Why it belongs: Attuned Hunter gives Green a second voice of innate kinship within the living world.
  - False-positive / neighbor limit: White and Selesnya also use family language; this relationship depends on Green's interspecies web, natural role, and acceptance rather than civic duty or communal doctrine. White and Selesnya also use family language; this relationship depends on Green's interspecies web, natural role, and acceptance rather than civic duty or communal doctrine.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_g_f652c593_e8fa_42ff_a8b4_206556b273de`

### Other candidates considered and terminal disposition

- **Azusa, Lost but Seeking:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Goreclaw, Terror of Qal Sisma:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Bant (`BANT`)

### Existing approved rationale(s)

- **Rafiq of the Many:** Rafiq is the clearest Bant champion expression: one worthy attacker receives the force and recognition of the whole. (`OWNER_APPROVED`)

### Source-complete public voice relationship(s)

- **Bant Sojourners:** “"We must spread Bant's light before we are shadowed over."”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `bant_claim_0004`, `bant_claim_0007`
  - Why it belongs: Bant Sojourners's exact excerpt provides a bounded voice echo of Bant named directly through an idealized light meant to extend beyond the shard.
  - False-positive / neighbor limit: Azorius and Selesnya can also sound orderly or communal; the explicit Bant reference and its idealized public-honor frame prevent a generic WUG inference. Azorius and Selesnya can also sound orderly or communal; the explicit Bant reference and its idealized public-honor frame prevent a generic WUG inference.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_bant_67ceffa4_2fdb_499c_88cd_49fb5eb9be59`
- **Bant Sureblade:** “Soldiers who fought through Grixis learned to hit first, recite the prayer of Asha later.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `bant_claim_0004`, `bant_claim_0007`
  - Why it belongs: Bant Sureblade gives Bant a second voice of public honor adapting when the utopia breaks.
  - False-positive / neighbor limit: Boros can also blend faith and combat; the explicit Bant, Asha, and Grixis rupture make this an ideal-under-pressure voice rather than generic martial zeal. Boros can also blend faith and combat; the explicit Bant, Asha, and Grixis rupture make this an ideal-under-pressure voice rather than generic martial zeal.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_bant_610adb2b_9d52_4b70_92d1_0c7adeb93552`

### Other candidates considered and terminal disposition

- **Bant Sureblade:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Bant Battlemage:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Esper (`ESPER`)

### Existing approved rationale(s)

- **Y'shtola, Night's Blessed:** Y'shtola links planned noncreature spells and a known life-loss threshold to repeatable card access and pressure. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Brainbite:** “An Esper mage will leave a hole in your memory with surgical precision. A Grixis mage sees no reason to be so kind.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `esper_claim_0003`, `esper_claim_0004`, `esper_claim_0006`
  - Why it belongs: Brainbite's exact excerpt provides a bounded voice echo of Esper named directly through precise, controlled use of information.
  - False-positive / neighbor limit: Blue, Dimir, Azorius, and Grixis also use information or control; the excerpt explicitly contrasts Esper's surgical precision with Grixis. Blue, Dimir, Azorius, and Grixis also use information or control; the excerpt explicitly contrasts Esper's surgical precision with Grixis.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_esper_fef94125_aa8d_4147_a609_1e990961bde2`
- **Aven Trailblazer:** “"The bird wore the form of a man, bereft of filigree. Why do the Texts not speak of it?" —Belator of Esper”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `esper_claim_0003`, `esper_claim_0004`, `esper_claim_0006`
  - Why it belongs: Aven Trailblazer gives Esper a second voice of artifice and textual order defining what counts as complete.
  - False-positive / neighbor limit: Azorius and Blue also trust texts and systems; Esper's missing filigree and engineered perfection are the required distinction. Azorius and Blue also trust texts and systems; Esper's missing filigree and engineered perfection are the required distinction.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_esper_518115c9_0f0f_4249_81ff_e79b27dda1be`

### Other candidates considered and terminal disposition

- **Aven Trailblazer:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Desperate Farmer // Depraved Harvester:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Grixis (`GRIXIS`)

### Existing approved rationale(s)

- **Kess, Dissident Mage:** Kess turns a spent instant or sorcery into one more planned option by letting you cast one such card from your graveyard during each of your turns. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Brainbite:** “An Esper mage will leave a hole in your memory with surgical precision. A Grixis mage sees no reason to be so kind.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `grixis_claim_0003`, `grixis_claim_0004`, `grixis_claim_0006`
  - Why it belongs: Brainbite's exact excerpt provides a bounded voice echo of Grixis named directly as harsher than Esper in its use of information and harm.
  - False-positive / neighbor limit: Esper and Dimir share precision and information leverage; the explicit Esper/Grixis contrast makes the Grixis ruthlessness distinction visible. Esper and Dimir share precision and information leverage; the explicit Esper/Grixis contrast makes the Grixis ruthlessness distinction visible.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_grixis_fef94125_aa8d_4147_a609_1e990961bde2`
- **Nekusar, the Mindrazer:** “His enemies wondered if the lich king's brutal death and unnatural rebirth had been his plan all along.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `grixis_claim_0003`, `grixis_claim_0004`, `grixis_claim_0006`
  - Why it belongs: Nekusar gives Grixis a second voice of agency preserved through a brutal death-and-rebirth scheme.
  - False-positive / neighbor limit: Dimir and Black also plan through death; the Grixis bridge is the shard's conniving survival world and necromantic resource pressure. Dimir and Black also plan through death; the Grixis bridge is the shard's conniving survival world and necromantic resource pressure.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_grixis_8a5e3c8e_8e22_49b9_8ee5_4a36361f0da6`

### Other candidates considered and terminal disposition

- **Nekusar, the Mindrazer:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Kess, Dissident Mage:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Jund (`JUND`)

### Existing approved rationale(s)

- **Prossh, Skyraider of Kher:** Prossh turns each cast into a larger visible board, then lets those creatures be sacrificed for immediate power. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Broodmate Tyrant:** “Karrthus was not the first Tyrant of Jund, nor will he be the last.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `jund_claim_0003`, `jund_claim_0005`, `jund_claim_0007`
  - Why it belongs: Broodmate Tyrant's exact excerpt provides a bounded voice echo of Jund named directly through embodied succession, dominance, and survival.
  - False-positive / neighbor limit: Gruul, Naya, and Grixis can share force or survival; the explicit Jund predatory-world framing prevents generic BRG inference. Gruul, Naya, and Grixis can share force or survival; the explicit Jund predatory-world framing prevents generic BRG inference.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_jund_9b984236_39cf_4552_827b_e81c26cfb388`
- **Charnelhoard Wurm:** “Jund's dragons hoard only sangrite crystals. Its wurms aren't so picky.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `jund_claim_0003`, `jund_claim_0005`, `jund_claim_0007`
  - Why it belongs: Charnelhoard Wurm gives Jund a second voice of embodied appetite in a predatory world.
  - False-positive / neighbor limit: Gruul and Glint can also sound hungry or wild; the explicit Jund ecology and consequence-bearing survival frame keep this from generic savagery. Gruul and Glint can also sound hungry or wild; the explicit Jund ecology and consequence-bearing survival frame keep this from generic savagery.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_jund_4a430fa3_e693_424b_9981_d7d8193445e3`

### Other candidates considered and terminal disposition

- **Charnelhoard Wurm:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Algae Gharial:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Naya (`NAYA`)

### Existing approved rationale(s)

- **Shalai and Hallar:** Shalai and Hallar turn creature growth into immediate table pressure by dealing damage when +1/+1 counters are put on your creatures. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Cradle of Vitality:** “Naya's trees grow tall and sturdy. Their foliage intertwines to form dewcups, rainwater pools where the elves gather to celebrate life.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `naya_claim_0003`, `naya_claim_0004`, `naya_claim_0007`
  - Why it belongs: Cradle of Vitality's exact excerpt provides a bounded voice echo of Naya named directly through abundant natural growth and gathering.
  - False-positive / neighbor limit: Selesnya and Green share growth and community; the explicit Naya ecosystem and abundance context prevents generic token or lifegain inference. Selesnya and Green share growth and community; the explicit Naya ecosystem and abundance context prevents generic token or lifegain inference.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_naya_956250da_532a_4457_8696_73915be56943`
- **Ajani's Mantra:** “"He hasn't returned to the Cloud Forest. But I can still sense his calming presence." —Zaliki of Naya”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `naya_claim_0003`, `naya_claim_0004`, `naya_claim_0007`
  - Why it belongs: Ajani's Mantra gives Naya a second voice of life-connected belonging rather than scale alone.
  - False-positive / neighbor limit: Selesnya and Green also value community and nature; the explicit Naya location and feral bond frame keep this within Naya's larger living whole. Selesnya and Green also value community and nature; the explicit Naya location and feral bond frame keep this within Naya's larger living whole.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_naya_2f47661e_a107_4d98_8773_0a068a63df49`

### Other candidates considered and terminal disposition

- **Ajani's Mantra:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Shalai and Hallar:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Abzan Houses (`ABZAN`)

### Existing approved rationale(s)

- **Felothar the Steadfast:** Felothar makes an Abzan defensive board matter in combat: creatures assign combat damage using toughness, and defenders can attack. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Abzan Banner:** “Stone to endure, roots to remember.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `abzan_claim_0003`, `abzan_claim_0008`
  - Why it belongs: Abzan Banner's exact excerpt provides a bounded voice echo of endurance joined to roots, memory, and Kin-Tree continuity.
  - False-positive / neighbor limit: Bant, Selesnya, and Golgari can also sound enduring or communal; the Kin-Tree and ancestor-continuity frame is the bounded Abzan bridge. Bant, Selesnya, and Golgari can also sound enduring or communal; the Kin-Tree and ancestor-continuity frame is the bounded Abzan bridge.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_abzan_46535f8e_1bcd_4588_ac6c_a4bc89c379c8`
- **Abzan Devotee:** “The Kin-Trees rediscovered after Dromoka's fall are tended by carefully chosen wardens.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `abzan_claim_0003`, `abzan_claim_0008`
  - Why it belongs: Abzan Devotee gives Abzan a second voice of family memory maintained through duty.
  - False-positive / neighbor limit: Selesnya and Green can tend communal nature; the explicit Abzan Kin-Trees, Dromoka rupture, and wardens make this ancestry and house continuity. Selesnya and Green can tend communal nature; the explicit Abzan Kin-Trees, Dromoka rupture, and wardens make this ancestry and house continuity.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_abzan_3d02ee2f_b7bd_40b0_b9be_2420991b2be0`

### Other candidates considered and terminal disposition

- **Abzan Devotee:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Abzan Guide:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Temur Frontier (`TEMUR`)

### Existing approved rationale(s)

- **Eshki, Temur's Roar:** Eshki rewards increasingly large creature spells with visible growth, then cards and damage as the creatures cross higher power thresholds. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Avalanche Tusker:** “"Hold the high ground, then bring it to your enemy."
—Surrak, khan of the Temur”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `temur_claim_0002`, `temur_claim_0003`, `temur_claim_0004`
  - Why it belongs: Avalanche Tusker's exact excerpt provides a bounded voice echo of a Temur khan joining tactical knowledge to literal natural force.
  - False-positive / neighbor limit: Gruul and Green also use physical force; the explicit Temur synthesis of terrain, problem solving, and direct action is the bridge. Gruul and Green also use physical force; the explicit Temur synthesis of terrain, problem solving, and direct action is the bridge.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_temur_ccad8b03_5ff1_4895_94e0_0c96883cb875`
- **Ainok Tracker:** “Some ainok of the mountains are accepted among the Temur as trusted hunt-mates.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `temur_claim_0002`, `temur_claim_0003`, `temur_claim_0004`
  - Why it belongs: Ainok Tracker gives Temur a second voice of kinship earned through shared survival.
  - False-positive / neighbor limit: Green and Naya can also sound communal; the explicit Temur hunt-mate frame joins belonging to harsh terrain, instinct, and lived capability. Green and Naya can also sound communal; the explicit Temur hunt-mate frame joins belonging to harsh terrain, instinct, and lived capability.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_temur_bf84a598_12d3_406d_8eeb_40592e782b87`

### Other candidates considered and terminal disposition

- **Auroral Procession:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ainok Tracker:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Sultai Brood (`SULTAI`)

### Existing approved rationale(s)

- **Kotis, Sibsig Champion:** Kotis turns the graveyard into a constrained resource: one creature can be cast from it each turn by exiling three other graveyard cards as an additional cost. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Aggressive Negotiations:** “"When an alliance outlasts its usefulness it's best to end it quickly."
—Heng, Sultai ambassador”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `sultai_claim_0002`, `sultai_claim_0004`, `sultai_claim_0007`
  - Why it belongs: Aggressive Negotiations's exact excerpt provides a bounded voice echo of a Sultai ambassador explicitly treating alliances as tools with an expiration point.
  - False-positive / neighbor limit: Black, Dimir, Grixis, and Orzhov can all sound calculating; the explicit Sultai ruthlessness and instrumental alliance frame is required. Black, Dimir, Grixis, and Orzhov can all sound calculating; the explicit Sultai ruthlessness and instrumental alliance frame is required.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_sultai_c469133e_174d_476b_b135_bbf15e415e72`
- **Blinding Spray:** “"The stronger our enemies seem, the more vulnerable they are." —Sultai secret”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `sultai_claim_0002`, `sultai_claim_0004`, `sultai_claim_0007`
  - Why it belongs: Blinding Spray gives Sultai a second voice of weakness analysis used as leverage.
  - False-positive / neighbor limit: Dimir and Grixis also exploit information; the explicit Sultai secret and status-survival hierarchy keep this inside Sultai opportunism. Dimir and Grixis also exploit information; the explicit Sultai secret and status-survival hierarchy keep this inside Sultai opportunism.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_sultai_88ce2017_83a6_4b55_afba_371875bf2172`

### Other candidates considered and terminal disposition

- **Blinding Spray:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Dark Deal:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Mardu Horde (`MARDU`)

### Existing approved rationale(s)

- **Zurgo Stormrender:** Zurgo makes Mardu's speed-and-pressure frame concrete by creating a temporary attacking creature whenever he attacks. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Bloodsoaked Champion:** “"Death is merely another foe the Mardu will overcome."”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `mardu_claim_0002`, `mardu_claim_0003`, `mardu_claim_0005`
  - Why it belongs: Bloodsoaked Champion's exact excerpt provides a bounded voice echo of the Mardu named directly through meeting death as another opponent.
  - False-positive / neighbor limit: Rakdos, Jund, and Black also speak in violent or death-facing terms; the explicit Mardu honor-and-action context is the bridge. Rakdos, Jund, and Black also speak in violent or death-facing terms; the explicit Mardu honor-and-action context is the bridge.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_mardu_cad09970_14c8_4d80_82fe_6c855efb0191`
- **Defibrillating Current:** “A small shock to save a life, a large one to take it away. —Mardu healer's adage”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `mardu_claim_0002`, `mardu_claim_0003`, `mardu_claim_0005`
  - Why it belongs: Defibrillating Current gives Mardu a second voice of decisive force calibrated to the need.
  - False-positive / neighbor limit: Boros can also use force to protect and Rakdos can harm visibly; the explicit Mardu adage joins speed, utility, and martial readiness without turning it into spectacle. Boros can also use force to protect and Rakdos can harm visibly; the explicit Mardu adage joins speed, utility, and martial readiness without turning it into spectacle.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_mardu_5a96b93b_bae6_48fb_87f5_05f3ffcf7ba9`

### Other candidates considered and terminal disposition

- **Defibrillating Current:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Alesha, Who Smiles at Death:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Jeskai Way (`JESKAI`)

### Existing approved rationale(s)

- **Shiko and Narset, Unified:** Shiko and Narset reward deliberate spell sequencing: the second spell each turn can be copied when it targets a permanent or player. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Bloodfire Expert:** “Some efreet abandon their homes in the volcanic Fire Rim to embrace the Jeskai Way and discipline their innate flames.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `EXPLICIT_IDENTITY_REFERENCE`
  - Certified claims: `jeskai_claim_0002`, `jeskai_claim_0004`, `jeskai_claim_0005`
  - Why it belongs: Bloodfire Expert's exact excerpt provides a bounded voice echo of the Jeskai Way named directly through discipline applied to innate flame.
  - False-positive / neighbor limit: Prismari and Izzet also join Blue and Red through technique; the explicit Jeskai discipline, monastery, and bloodfire context supplies the bridge. Prismari and Izzet also join Blue and Red through technique; the explicit Jeskai discipline, monastery, and bloodfire context supplies the bridge.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_jeskai_341cf654_faf7_4db9_bd9a_70783f1ccff0`
- **Narset, Enlightened Exile:** “They called her unique insight a "gift." Then she saw the truth, and suddenly it was a "threat."”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `NATIVE_FIGURE_OR_LOCATION`
  - Certified claims: `jeskai_claim_0002`, `jeskai_claim_0004`, `jeskai_claim_0005`
  - Why it belongs: Narset gives Jeskai a second voice of disciplined understanding that challenges authority.
  - False-positive / neighbor limit: Blue and Silverquill can also expose truth; Narset's Jeskai leadership, self-improvement, and disciplined insight supply the bounded bridge. Blue and Silverquill can also expose truth; Narset's Jeskai leadership, self-improvement, and disciplined insight supply the bounded bridge.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_jeskai_d92725de_ead0_4a6c_83db_55ec3acc7184`

### Other candidates considered and terminal disposition

- **Shiko and Narset, Unified:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Narset, Enlightened Exile:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Yore / Artifice (`YORE`)

### Existing approved rationale(s)

- **Breya, Etherium Shaper:** Breya makes Yore's artifice frame concrete by creating artifact creatures, then converting artifacts through several selectable effects. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Artificer's Epiphany:** “The artificers of Kaladesh strive ceaselessly for perfection, progress, and the ultimate expression of elegance.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `yore_claim_0002`, `yore_claim_0004`
  - Why it belongs: Artificer's Epiphany's exact excerpt provides a bounded voice echo of artificers pursuing perfection, progress, and designed elegance.
  - False-positive / neighbor limit: Esper, Izzet, Blue, and Witch also use technology or progress. This proposal echoes Yore's bounded artifice frame but cannot make Yore behaviorally nameable or establish a faction. Esper, Izzet, Blue, and Witch also use technology or progress. This proposal echoes Yore's bounded artifice frame but cannot make Yore behaviorally nameable or establish a faction.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_yore_ed10bb4c_f7ef_4046_8dde_465041b55078`
- **Ayara, Widow of the Realm // Ayara, Furnace Queen:** “Ayara cherished her new machine servitors just as much as she once did her many suitors: not at all.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `yore_claim_0002`, `yore_claim_0004`
  - Why it belongs: Ayara's machine servitors give Yore a second voice of civilization and artifice used without organic obligation.
  - False-positive / neighbor limit: Esper, Black, and artifact decks can share this imagery; the relationship is limited to Yore's non-Green artifice-and-progress frame and does not establish a faction. Esper, Black, and artifact decks can share this imagery; the relationship is limited to Yore's non-Green artifice-and-progress frame and does not establish a faction.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_yore_f9ef90b9_a2b4_4a5b_92fb_2268ea7d709f`

### Other candidates considered and terminal disposition

- **Access Denied:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Abandoned Sarcophagus:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ayara, Widow of the Realm // Ayara, Furnace Queen:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Glint / Chaos (`GLINT`)

### Existing approved rationale(s)

- **Yidris, Maelstrom Wielder:** Yidris converts successful combat into volatile follow-up routes by giving spells cast from hand cascade for the rest of that turn. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Aberrant Return:** “Shadowmoor is rife with wild magic—powerful but as volatile as the plane itself.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `glint_claim_0005`
  - Why it belongs: Aberrant Return's exact excerpt provides a bounded voice echo of wild magic described as powerful and volatile.
  - False-positive / neighbor limit: Prismari, Izzet, Rakdos, and Red can also sound volatile. The excerpt reaches only Glint's bounded volatility/force edge, not its appetite or anti-order boundary. Prismari, Izzet, Rakdos, and Red can also sound volatile. The excerpt reaches only Glint's bounded volatility/force edge, not its appetite or anti-order boundary.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_glint_3a92b235_196b_4f46_9d20_06f4d3653d36`
- **Atarka, World Render:** “"Her hunger knows no limit. Left unchecked, she would feast on all of Tarkir." —Yasova Dragonclaw”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `glint_claim_0005`
  - Why it belongs: Atarka gives Glint a second voice of appetite pushing past every limit.
  - False-positive / neighbor limit: Jund, Gruul, and Red-Green can also sound hungry; this is only a bounded Glint echo of appetite plus force in a non-White lane, not proof from color or Dragon type. Jund, Gruul, and Red-Green can also sound hungry; this is only a bounded Glint echo of appetite plus force in a non-White lane, not proof from color or Dragon type.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_glint_c0b3bbce_977c_42a9_afcb_dabdfc717c97`

### Other candidates considered and terminal disposition

- **Adaptive Snapjaw:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Cyclops Electromancer:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Aether Storm:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Dune / Aggression (`DUNE`)

### Existing approved rationale(s)

- **Saskia the Unyielding:** Saskia turns visible combat into concentrated pressure: you choose a player, and combat damage dealt elsewhere is repeated against that player. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Aurelia, the Warleader:** “Where Razia was aloof and untouchable, Aurelia is on the frontlines, calling for war.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `dune_claim_0005`
  - Why it belongs: Aurelia, the Warleader's exact excerpt provides a bounded voice echo of front-line leadership, immediate action, and organized force.
  - False-positive / neighbor limit: This excerpt is canonically Boros and therefore carries a high Boros/Mardu confusion risk. It is only a cross-identity voice echo for Dune's bounded direct-action frame. This excerpt is canonically Boros and therefore carries a high Boros/Mardu confusion risk. It is only a cross-identity voice echo for Dune's bounded direct-action frame.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_dune_0f5a3a09_2f07_4774_9e0f_e99d9a444166`
- **Scour from Existence:** “"Our people and our very lands disappear as if they never were. We no longer fight for glory, or honor. We battle now for the right to exist."
—General Tazri, allied commander”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `dune_claim_0003`, `dune_claim_0005`
  - Why it belongs: Scour from Existence gives Dune a second voice in which people and land under existential pressure make immediate common-front battle a condition of survival rather than a pursuit of glory.
  - False-positive / neighbor limit: Naya can defend people and land, but the line accepts existential loss rather than celebrating abundance; Mardu can battle as a people, but the land and survival frame are indispensable; Abzan can endure erasure, but General Tazri's 'battle now' commitment supplies the missing immediate pressure. The line is still a cross-identity echo, not Dune lore or placement proof. Naya can defend people and land, but the line accepts existential loss rather than celebrating abundance; Mardu can battle as a people, but the land and survival frame are indispensable; Abzan can endure erasure, but General Tazri's 'battle now' commitment supplies the missing immediate pressure. The line is still a cross-identity echo, not Dune lore or placement proof.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_dune_241a50c5_f65f_4847_89c7_5c0ef6025dc1`

### Other candidates considered and terminal disposition

- **Apprentice Sharpshooter:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Augusta, Order Returned:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Ink / Altruism (`INK`)

### Existing approved rationale(s)

- **Kynaios and Tiro of Meletis:** Kynaios and Tiro make Ink's shared-resource frame visible: their end-step ability gives every player a chance to develop mana or draw, while their controller also draws. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Command Tower:** “Knowledge is wasted if not shared.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `ink_claim_0005`
  - Why it belongs: Command Tower's exact excerpt provides a bounded voice echo of knowledge treated as wasted unless it is shared.
  - False-positive / neighbor limit: White, Blue, Selesnya, and Five-Color can all value sharing. This proposal is limited to Ink's certified open-knowledge and community-benefit frame and does not prove the four-color identity. White, Blue, Selesnya, and Five-Color can all value sharing. This proposal is limited to Ink's certified open-knowledge and community-benefit frame and does not prove the four-color identity.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_ink_0895c9b7_ae7d_4bb3_af17_3b75deb50a25`
- **Danitha Capashen, Paragon:** “"I will protect the less fortunate. I will love bravely. I will face despair and fight on. As a Capashen, I can do no less."”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `ink_claim_0005`
  - Why it belongs: Danitha gives Ink a second voice of community benefit defended through duty.
  - False-positive / neighbor limit: White and Selesnya also protect others; this is only a bounded Ink echo of protected generosity in a non-Black lane, not four-color proof from the card. White and Selesnya also protect others; this is only a bounded Ink echo of protected generosity in a non-Black lane, not four-color proof from the card.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_ink_4b6377da_83e7_4519_9582_16a9c16b8faa`

### Other candidates considered and terminal disposition

- **Access Denied:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Aberrant Manawurm:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Ancestral Anger:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Witch / Growth (`WITCH`)

### Existing approved rationale(s)

- **Atraxa, Praetors' Voice:** Atraxa gives Witch's systematic-accumulation frame a bounded example by proliferating at each of your end steps. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Animation Module:** “Design leads to progress.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `witch_claim_0005`
  - Why it belongs: Animation Module's exact excerpt provides a bounded voice echo of design producing progress through a modular object associated with counters and repeated accumulation.
  - False-positive / neighbor limit: Yore, Esper, Simic, and Blue can also connect design to progress. This echo is limited to Witch's systematic-accumulation branch and cannot establish the four-color identity alone. Yore, Esper, Simic, and Blue can also connect design to progress. This echo is limited to Witch's systematic-accumulation branch and cannot establish the four-color identity alone.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_witch_af42079b_a3c0_448c_9bb2_b915252e87a9`
- **Amphin Cutthroat:** “"The amphin have long built their society in secret. While surface dwellers squabbled over trivial borders, they patiently expanded, building their ammonite temple-caves. Now amphin priests eye the shore, and amphin hunters gird for war."
—Gor Muldrak, *Cryptohistories*”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `witch_claim_0003`, `witch_claim_0005`
  - Why it belongs: Amphin Cutthroat gives Witch a second voice of a protected society developing patiently until accumulated preparation becomes outward ambition.
  - False-positive / neighbor limit: Yore and Esper can build durable systems, but this line centers a living community's protected development rather than artifice, perfection, or administration. Simic and Blue can plan or experiment, but the text names neither research nor optimization as the purpose; its center is long-horizon social cultivation becoming territorial ambition. Secrecy creates Dimir/Sultai risk, so the relationship remains a bounded Witch echo rather than identity proof. Yore and Esper can build durable systems, but this line centers a living community's protected development rather than artifice, perfection, or administration. Simic and Blue can plan or experiment, but the text names neither research nor optimization as the purpose; its center is long-horizon social cultivation becoming territorial ambition. Secrecy creates Dimir/Sultai risk, so the relationship remains a bounded Witch echo rather than identity proof.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_witch_e766a5eb_684b_4939_b164_6093d15600c9`

### Other candidates considered and terminal disposition

- **Agent of Horizons:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Abyssal Harvester:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Assassin's Trophy:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).

## Colorless (`COLORLESS`)

### Existing approved rationale(s)

- **Omarthis, Ghostfire Initiate:** Omarthis is a bounded example of Colorless growth support: it grows when another colorless creature receives +1/+1 counters, then manifests cards equal to its counters when it dies. (`EVIDENCE_VALIDATED_AUTOMATIC`)
- **Zhulodok, Void Gorger:** Zhulodok is a bounded example of Colorless's Eldrazi-scale branch: colorless spells cast from hand with mana value seven or greater receive cascade twice. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **All Is Dust:** “"The emergence of the Eldrazi isn't necessarily a bad thing, as long as you've already lived a fulfilling and complete life without regrets."
—Javad Nasrin, Ondu relic hunter”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `colorless_claim_0004`, `colorless_claim_0005`, `colorless_claim_0006`
  - Why it belongs: All Is Dust's exact excerpt provides a bounded voice echo of Eldrazi-scale emergence and an outside-WUBRG sense of completion and erasure.
  - False-positive / neighbor limit: Eldrazi flavor can also occur in Five-Color or Devoid decks. This is a bounded Eldrazi branch, not proof that every Eldrazi card or artifact belongs to Colorless. Eldrazi flavor can also occur in Five-Color or Devoid decks. This is a bounded Eldrazi branch, not proof that every Eldrazi card or artifact belongs to Colorless.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_colorless_14693689_d087_43b6_9c3f_63ab0648fc20`

### Other candidates considered and terminal disposition

- **Bane of Bala Ged:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Adarkar Sentinel:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).

## Five-Color / WUBRG (`WUBRG`)

### Existing approved rationale(s)

- **Ulalek, Fused Atrocity:** Ulalek demonstrates access to all five colors through its verified color identity, while its ability uses colorless mana to copy Eldrazi spells and abilities. (`EVIDENCE_VALIDATED_AUTOMATIC`)

### Source-complete public voice relationship(s)

- **Call the Spirit Dragons:** “The essence of Tarkir was shaped into draconic embodiments of the re-formed clans.”
  - Slot / approval: `1` / `EVIDENCE_VALIDATED_AUTOMATIC`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `wubrg_claim_0002`, `wubrg_claim_0003`, `wubrg_claim_0004`, `wubrg_claim_0007`
  - Why it belongs: The regular Tarkir: Dragonstorm printing names the re-formed clans as distinct draconic embodiments, while the card itself requires all five colors and cares about Dragons of each color.
  - False-positive / neighbor limit: The bridge depends on the exact regular-printing flavor text together with the card's five-color canonical facts, not on a generic unity, Dragon, multicolor, or Tarkir theme. Each Tarkir clan remains a distinct three-color identity, and Yore or artifact decks may also combine parts. The public relationship is limited to Five-Color access across all five colors.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_wubrg_3ceb23f5_abb1_4569_a1e4_1eed9a9babcf`
- **Child of Alara:** “The progeny of the Maelstrom shows no allegiance—and no mercy—to any of the five shards.”
  - Slot / approval: `2` / `OWNER_SEMANTIC_APPROVAL`
  - Relationship class: `CERTIFIED_SEMANTIC_ECHO`
  - Certified claims: `wubrg_claim_0002`, `wubrg_claim_0003`, `wubrg_claim_0007`
  - Why it belongs: Child of Alara gives WUBRG a second voice in which all five shards remain present without one claiming the whole.
  - False-positive / neighbor limit: Colorless and four-color lanes can also reject allegiance; WUBRG's exact five-shard reference and five-color card identity are required, and the line does not claim superiority, total mastery, or the erasure of each color's limits. Colorless and four-color lanes can also reject allegiance; WUBRG's exact five-shard reference and five-color card identity are required, and the line does not claim superiority, total mastery, or the erasure of each color's limits.
  - Source: `data/dossier/card-voice-printings.source.json#relationship_id=cardvoice_vm558_wubrg_70dbe8a9_505d_41c2_9b5b_a991d13ab459`

### Other candidates considered and terminal disposition

- **Command Tower:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Heroes in a Half Shell:** `REJECTED` — No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.
- **Coalition Victory:** `REJECTED` — The former machine metaphor carried avoidable Yore, artifact, and completion false positives; it remains historical audit evidence but is not the public WUBRG voice.

### Public disposition

- Slot 1: `APPROVED_PUBLIC` under `vm551-evidence-validator-v1` (`EVIDENCE_VALIDATED_AUTOMATIC`).
- Slot 2: `APPROVED_PUBLIC` under `vm558-owner-semantic-approval-v1` (`OWNER_SEMANTIC_APPROVAL`).
