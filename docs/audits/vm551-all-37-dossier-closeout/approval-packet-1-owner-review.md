# VM-551 Packet 1 — Card Content Owner Review

Status: **OWNER REVIEW REQUIRED** — no Packet 1 review row is public or runtime-active.

## Summary

- Historical rationale candidates: **125**
- Terminal historical dispositions: **125**
- Existing `APPROVED_PUBLIC` retained: **26**
- New rationale proposals requiring owner review: **25**
- Identities represented by new rationale proposals: **25/25 former gaps**
- Original voice candidates hardened: **111**
- Stronger exact-text replacements added: **7**
- Voice proposals requiring owner review: **37**
- Weak voice candidates rejected from decision workload: **81**
- Source-complete voice coverage: **37/37 identities**
- Runtime promotions from this packet before approval: **0**

Every decision is bound to the exact proposal ID and copy hash in the canonical source. `REVISE` requires exact replacement content; no generated fallback is authorized.

## Abzan Houses (`ABZAN`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Felothar the Steadfast** (`packet1_rationale_abzan_2b3f791a_d672_46fb_a03a_96e19f2c3121`, Oracle ID `2b3f791a-d672-46fb-a03a-96e19f2c3121`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `abzan_claim_0002`, `abzan_claim_0011`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `abzan_claim_0002`: Abzan's design identity emphasizes endurance and survival through proactive defense, active defense, long-game planning, and Green growth after pressure is survived.
- `abzan_claim_0011`: The official Tarkir: Dragonstorm Commander Decklists page verifies Abzan Armor as a White; Black; Green Commander deck with Felothar the Steadfast as face commander and Betor, Ancestor's Voice as featured commander.
- Relationship lead: `data/raw-factions/abzan/abzan.claims.json#abzan_claim_0011`

### Canonical card evidence

- Each creature you control assigns combat damage equal to its toughness rather than its power. Creatures you control can attack as though they didn't have defender. {3}, {T}, Sac...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=2b3f791a-d672-46fb-a03a-96e19f2c3121`

### Proposed public rationale

- Felothar makes an Abzan defensive board matter in combat: creatures assign combat damage using toughness, and defenders can attack.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Betor, Ancestor's Voice** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/abzan/abzan.profile.json#/commander_compass/native_fit_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Abzan Banner | “Stone to endure, roots to remember.” | `NATIVE_FIGURE_OR_LOCATION` | `abzan_claim_0003`<br>`abzan_claim_0008` | Abzan Banner's exact excerpt provides a bounded voice echo of endurance joined to roots, memory, and Kin-Tree continuity. The excerpt is admissible for owner review only because its language corresponds to certified claims abzan_claim_0003, abzan_claim_0008; the relationship does not arise from card color, product membership, tags, or mechanics. | Bant, Selesnya, and Golgari can also sound enduring or communal; the Kin-Tree and ancestor-continuity frame is the bounded Abzan bridge. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=46535f8e-1bcd-4588-ac6c-a4bc89c379c8` | **APPROVE / REVISE / REJECT** (`packet1_voice_abzan_46535f8e_1bcd_4588_ac6c_a4bc89c379c8_1`) |

### Owner decision

- rationale `packet1_rationale_abzan_2b3f791a_d672_46fb_a03a_96e19f2c3121`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_abzan_46535f8e_1bcd_4588_ac6c_a4bc89c379c8_1`: **APPROVE / REVISE / REJECT**
## Azorius Senate (`WU`)

### Existing approved rationale(s)

- **Isperia, Supreme Judge** (`cardrel_wu_c46718dc`): Isperia represents Azorius leadership, and her card rewards you with additional information when opponents attack you or your planeswalkers.
- **Grand Arbiter Augustin IV** (`cardrel_wu_1f8d4d5f`): The ultimate expression of Azorius tax-based gameplay; he slows the game down to a crawl.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `azorius_senate_claim_005`: The 2019 guide presents Dovin Baan as Grand Arbiter in the cited-era Azorius overview after the disappearance of Isperia.
- `azorius_senate_claim_001`: Azorius is the white-blue guild of Ravnica, associated with law, order, bureaucracy, legislation, enforcement, and procedure.
- `azorius_senate_claim_002`: The official Ravnica Allegiance guide describes the Azorius Senate as responsible for making, enforcing, and interpreting Ravnica's laws.
- `azorius_senate_claim_006`: Addendum is the Ravnica Allegiance signature mechanic associated with Azorius.
- `azorius_senate_claim_007`: Azorius placement should require explicit law, procedure, precedent, documentation, enforceable fairness, institutional restraint, or Addendum-like timing evidence rather than generic white-blue order alone.

### Canonical card evidence

- **Isperia, Supreme Judge**: Flying Whenever a creature attacks you or a planeswalker you control, you may draw a card.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=c46718dc-24dc-4b77-b455-aa4c89570b8d`
- **Grand Arbiter Augustin IV**: White spells you cast cost {1} less to cast. Blue spells you cast cost {1} less to cast. Spells your opponents cast cost {1} more to cast.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=1f8d4d5f-e82f-45f3-823e-1bb6b536eb18`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Kwain, Itinerant Meddler** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/azorius_senate/azorius_senate.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Lavinia, Azorius Renegade** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/azorius_senate/azorius_senate.profile.json#/commander_compass/iconic_lore_forward_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Azorius Cluestone | “Its three sides represent the Sova, judges and arbitrators; the Jelenn, scribes and elocutors; and the Lyev, lawmages...” | `EXPLICIT_IDENTITY_REFERENCE` | `azorius_senate_claim_001`<br>`azorius_senate_claim_002`<br>`azorius_senate_claim_003`<br>`azorius_senate_claim_007` | Azorius Cluestone's exact excerpt provides a bounded voice echo of Azorius named directly through its judges, scribes, and lawmages. The excerpt is admissible for owner review only because its language corresponds to certified claims azorius_senate_claim_001, azorius_senate_claim_002, azorius_senate_claim_003, azorius_senate_claim_007; the relationship does not arise from card color, product membership, tags, or mechanics. | White, Blue, and Esper also use systems and records; the explicit civic/legal institution makes this Azorius. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=27e04c41-f42c-4d60-8a71-ec2d7c326f64` | **APPROVE / REVISE / REJECT** (`packet1_voice_wu_27e04c41_f42c_4d60_8a71_ec2d7c326f64_2`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_wu_27e04c41_f42c_4d60_8a71_ec2d7c326f64_2`: **APPROVE / REVISE / REJECT**
## Bant (`BANT`)

### Existing approved rationale(s)

- **Rafiq of the Many** (`cardrel_bant_c6e17443`): Rafiq is the clearest Bant champion expression: one worthy attacker receives the force and recognition of the whole.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `bant_claim_0006`: Exalted supports a Bant placement reading of many members concentrating support behind one worthy champion.
- `bant_claim_0008`: Rafiq of the Many is Bant's iconic legendary knight figure and is associated with sigils from all five Bant nations.

### Canonical card evidence

- **Rafiq of the Many**: Exalted (Whenever a creature you control attacks alone, that creature gets +1/+1 until end of turn.) Whenever a creature you control attacks alone, it gains double strike until...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=c6e17443-2379-419d-8c32-13ea9bf52993`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Chulane, Teller of Tales** — `REJECTED`: Rejected in its current form: Candidate resolves only to support records, not a substantive certified identity claim. Source: `data/raw-factions/bant/bant.profile.json#/commander_compass/native_fit_commanders/1`
- **Tuvasa the Sunlit** — `REJECTED`: Rejected in its current form: Candidate resolves only to support records, not a substantive certified identity claim. Source: `data/raw-factions/bant/bant.profile.json#/commander_compass/native_fit_commanders/2`
- **Morska, Undersea Sleuth** — `REJECTED`: Rejected in its current form: Candidate resolves only to support records, not a substantive certified identity claim. Source: `data/raw-factions/bant/bant.profile.json#/commander_compass/native_fit_commanders/3`
- **Derevi, Empyrial Tactician** — `REJECTED`: Rejected in its current form: Candidate resolves only to support records, not a substantive certified identity claim. Source: `data/raw-factions/bant/bant.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Roon of the Hidden Realm** — `REJECTED`: Rejected in its current form: Candidate resolves only to support records, not a substantive certified identity claim. Source: `data/raw-factions/bant/bant.profile.json#/commander_compass/advanced_complexity_commanders/0`
- **Jenara, Asura of War** — `REJECTED`: Rejected in its current form: Candidate resolves only to support records, not a substantive certified identity claim. Source: `data/raw-factions/bant/bant.profile.json#/commander_compass/iconic_lore_forward_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Bant Sojourners | “"We must spread Bant's light before we are shadowed over."” | `EXPLICIT_IDENTITY_REFERENCE` | `bant_claim_0004`<br>`bant_claim_0007` | Bant Sojourners's exact excerpt provides a bounded voice echo of Bant named directly through an idealized light meant to extend beyond the shard. The excerpt is admissible for owner review only because its language corresponds to certified claims bant_claim_0004, bant_claim_0007; the relationship does not arise from card color, product membership, tags, or mechanics. | Azorius and Selesnya can also sound orderly or communal; the explicit Bant reference and its idealized public-honor frame prevent a generic WUG inference. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=67ceffa4-2fdb-499c-88cd-49fb5eb9be59` | **APPROVE / REVISE / REJECT** (`packet1_voice_bant_67ceffa4_2fdb_499c_88cd_49fb5eb9be59_2`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_bant_67ceffa4_2fdb_499c_88cd_49fb5eb9be59_2`: **APPROVE / REVISE / REJECT**
## Black (`B`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **K'rrik, Son of Yawgmoth** (`packet1_rationale_b_cbe3a4e7_5dbe_4f58_8ee6_a1762b65acfd`, Oracle ID `cbe3a4e7-5dbe-4f58-8ee6-a1762b65acfd`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `black_claim_0004`, `black_claim_0007`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `black_claim_0004`: Black's thematic center includes death, fear, pain, decay, disease, corruption, manipulation, sacrifice, individualism, and resource conversion; it distrusts self-denial for others' sake.
- `black_claim_0007`: Black's mechanical texture includes unconditional creature destruction, discard, sacrifice, reanimation, graveyard use, life as a cost, drain, deathtouch, menace, and card draw paid for with resources.
- Relationship lead: `data/raw-factions/black/black.claims.json#black_claim_0007`

### Canonical card evidence

- ({B/P} can be paid with either {B} or 2 life.) Lifelink For each {B} in a cost, you may pay 2 life rather than pay that mana. Whenever you cast a black spell, put a +1/+1 counte...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=cbe3a4e7-5dbe-4f58-8ee6-a1762b65acfd`

### Proposed public rationale

- K'rrik makes Black's resource-conversion pattern literal by letting life pay for black mana symbols and rewarding additional black spells with +1/+1 counters.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Ayara, First of Locthwain** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/black/black.profile.json#/commander_compass/native_fit_commanders/1`
- **Chainer, Dementia Master** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/black/black.profile.json#/commander_compass/native_fit_commanders/2`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Ancient Craving | “Knowledge demands sacrifice.” | `CERTIFIED_SEMANTIC_ECHO` | `black_claim_0003`<br>`black_claim_0004` | Ancient Craving's exact excerpt provides a bounded voice echo of knowledge made available through an explicit sacrifice. The excerpt is admissible for owner review only because its language corresponds to certified claims black_claim_0003, black_claim_0004; the relationship does not arise from card color, product membership, tags, or mechanics. | Blue and Dimir also value knowledge, while Orzhov values payment; this echo belongs here only because the line makes sacrifice the price of access rather than secrecy or institutional debt. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=78725353-9274-420a-b722-add0f43c444e` | **APPROVE / REVISE / REJECT** (`packet1_voice_b_78725353_9274_420a_b722_add0f43c444e_replacement`) |

### Owner decision

- rationale `packet1_rationale_b_cbe3a4e7_5dbe_4f58_8ee6_a1762b65acfd`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_b_78725353_9274_420a_b722_add0f43c444e_replacement`: **APPROVE / REVISE / REJECT**
## Blue (`U`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Talrand, Sky Summoner** (`packet1_rationale_u_ea1eb902_a23c_44ff_9169_19baf71de238`, Oracle ID `ea1eb902-a23c-44ff-9169-19baf71de238`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `blue_claim_0006`, `blue_claim_0007`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `blue_claim_0006`: Blue's strength is knowledge used for foresight, control, and flexible answers; its weakness is needing time, becoming passive/reactive, and being vulnerable to fast or indirect pressure.
- `blue_claim_0007`: Blue's mechanical texture includes card draw and filtering, counterspells, copying, bounce, theft, flying, artifacts, instants and sorceries, and avoiding direct creature destruction.
- Relationship lead: `data/raw-factions/blue/blue.claims.json#blue_claim_0007`

### Canonical card evidence

- Whenever you cast an instant or sorcery spell, create a 2/2 blue Drake creature token with flying.
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=ea1eb902-a23c-44ff-9169-19baf71de238`

### Proposed public rationale

- Talrand turns Blue's instant-and-sorcery plan into a visible board by creating a flying Drake whenever you cast one of those spells.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Azami, Lady of Scrolls** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/blue/blue.profile.json#/commander_compass/native_fit_commanders/1`
- **Minn, Wily Illusionist** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/blue/blue.profile.json#/commander_compass/native_fit_commanders/2`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Azami, Lady of Scrolls | “"Choices belong to those with the luxuries of time and distance. We have neither. I recommend we proceed with the plan to destroy all shrines of the kami." —Lady Azami, letter t...” | `CERTIFIED_SEMANTIC_ECHO` | `blue_claim_0002`<br>`blue_claim_0003`<br>`blue_claim_0006` | Azami, Lady of Scrolls's exact excerpt provides a bounded voice echo of a constrained decision answered with information, planning, and a deliberate course. The excerpt is admissible for owner review only because its language corresponds to certified claims blue_claim_0002, blue_claim_0003, blue_claim_0006; the relationship does not arise from card color, product membership, tags, or mechanics. | Azorius, Esper, Dimir, and Jeskai also plan; this is a mono-Blue knowledge-and-deliberation echo without secrecy, law, or faction doctrine. | `data/scryfall/indexes/commander-index.json#oracle_id=0f8b97fe-3e5e-47c2-9a9d-7f77482aa159` | **APPROVE / REVISE / REJECT** (`packet1_voice_u_0f8b97fe_3e5e_47c2_9a9d_7f77482aa159_2`) |

### Owner decision

- rationale `packet1_rationale_u_ea1eb902_a23c_44ff_9169_19baf71de238`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_u_0f8b97fe_3e5e_47c2_9a9d_7f77482aa159_2`: **APPROVE / REVISE / REJECT**
## Boros Legion (`WR`)

### Existing approved rationale(s)

- **Aurelia, the Warleader** (`cardrel_wr_0f5a3a09`): She is the definitive Boros Guildmaster, focused on overwhelming the opponent through sheer military force.
- **Tajic, Legion's Edge** (`cardrel_wr_ae6f21a2`): A low-cost commander that protects your team from damage and encourages offensive growth.
- **Feather, the Redeemed** (`cardrel_wr_aa219936`): A unique Boros 'spellslinger' engine that turns single-target buffs into recurring value.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `boros_legion_claim_004`: The 2018 guide presents Aurelia as guildmaster and describes her preference for fighting alongside Boros troops.
- `boros_legion_claim_009`: Leadership transitioned from Razia to the angel Feather (Pierakor), and later to Aurelia.
- `boros_legion_claim_026`: Mature Boros expression is disciplined, accountable protection carried with a public team rather than solitary heroics or generic aggression.
- `boros_legion_claim_006`: Mentor is the Guilds of Ravnica signature mechanic associated with Boros.
- `boros_legion_claim_026`: Mature Boros expression is disciplined, accountable protection carried with a public team rather than solitary heroics or generic aggression.
- `boros_legion_claim_009`: Leadership transitioned from Razia to the angel Feather (Pierakor), and later to Aurelia.

### Canonical card evidence

- **Aurelia, the Warleader**: Canonical card record resolves under the approved relationship validator.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=0f5a3a09-2f07-4774-9e0f-e99d9a444166`
- **Tajic, Legion's Edge**: Haste Mentor (Whenever this creature attacks, put a +1/+1 counter on target attacking creature with lesser power.) Prevent all noncombat damage that would be dealt to other crea...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=ae6f21a2-e6b6-4793-8343-e27310c0bea1`
- **Feather, the Redeemed**: Flying Whenever you cast an instant or sorcery spell that targets a creature you control, exile that card instead of putting it into your graveyard as it resolves. If you do, re...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=aa219936-661b-4ccb-8741-78b70cff2b1a`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Osgir, the Reconstructor** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/boros_legion/boros_legion.profile.json#/commander_compass/weird_stretch_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Boros Strike-Captain | “"Keep up with me, comrades, or I cannot guarantee you a fair share of the fracas."” | `EXPLICIT_IDENTITY_REFERENCE` | `boros_legion_claim_001`<br>`boros_legion_claim_004`<br>`boros_legion_claim_007`<br>`boros_legion_claim_012` | Boros Strike-Captain's exact excerpt provides a bounded voice echo of a Boros commander explicitly addressing comrades through coordinated front-line action. The excerpt is admissible for owner review only because its language corresponds to certified claims boros_legion_claim_001, boros_legion_claim_004, boros_legion_claim_007, boros_legion_claim_012; the relationship does not arise from card color, product membership, tags, or mechanics. | Mardu and mono-Red also coordinate attacks; Boros requires public duty, teamwork, and accountable martial action. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=30b20932-0d9a-447f-b934-1daa8c44a678` | **APPROVE / REVISE / REJECT** (`packet1_voice_wr_30b20932_0d9a_447f_b934_1daa8c44a678_2`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_wr_30b20932_0d9a_447f_b934_1daa8c44a678_2`: **APPROVE / REVISE / REJECT**
## Colorless (`COLORLESS`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Zhulodok, Void Gorger** (`packet1_rationale_colorless_ec726c54_987b_48ed_8ffa_ec73a5e35333`, Oracle ID `ec726c54-987b-48ed-8ffa-ec73a5e35333`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `colorless_claim_0005`, `colorless_claim_0006`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `colorless_claim_0005`: Commander, five-color Eldrazi, and Phyrexia material must remain bounded: Eldrazi Unbound is support-only Colorless Commander texture, Eldrazi Incursion is five-color comparator support, Phyrexia is distinction-only context, and none of these independently authorizes broad Commander viability, lore proof, placement eligibility, or raw claim expansion.
- `colorless_claim_0006`: Colorless can be used as controlled placement attraction for players drawn to a chosen restriction outside WUBRG: artifact-machine problem solving, Eldrazi scale, Wastes or terrain austerity, clean mana systems, resource denial, or engine-expression play. This is Vox Mana placement synthesis, not official MTG color philosophy.
- Relationship lead: `data/raw-factions/colorless/colorless.claims.json#colorless_claim_0005`

### Canonical card evidence

- Colorless spells you cast from your hand with mana value 7 or greater have "Cascade, cascade." (When you cast one, exile cards from the top of your library until you exile a non...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=ec726c54-987b-48ed-8ffa-ec73a5e35333`

### Proposed public rationale

- Zhulodok is a bounded example of Colorless's Eldrazi-scale branch: colorless spells cast from hand with mana value seven or greater receive cascade twice.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Omarthis, Ghostfire Initiate** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/colorless/colorless.profile.json#/commander_compass/native_fit_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| All Is Dust | “"The emergence of the Eldrazi isn't necessarily a bad thing, as long as you've already lived a fulfilling and complet...” | `CERTIFIED_SEMANTIC_ECHO` | `colorless_claim_0004`<br>`colorless_claim_0005`<br>`colorless_claim_0006` | All Is Dust's exact excerpt provides a bounded voice echo of Eldrazi-scale emergence and an outside-WUBRG sense of completion and erasure. The excerpt is admissible for owner review only because its language corresponds to certified claims colorless_claim_0004, colorless_claim_0005, colorless_claim_0006; the relationship does not arise from card color, product membership, tags, or mechanics. | Eldrazi flavor can also occur in Five-Color or Devoid decks. This is a bounded Eldrazi branch, not proof that every Eldrazi card or artifact belongs to Colorless. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=14693689-d087-43b6-9c3f-63ab0648fc20` | **APPROVE / REVISE / REJECT** (`packet1_voice_colorless_14693689_d087_43b6_9c3f_63ab0648fc20_1`) |

### Owner decision

- rationale `packet1_rationale_colorless_ec726c54_987b_48ed_8ffa_ec73a5e35333`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_colorless_14693689_d087_43b6_9c3f_63ab0648fc20_1`: **APPROVE / REVISE / REJECT**
## Cult of Rakdos (`BR`)

### Existing approved rationale(s)

- **Rakdos, Lord of Riots** (`cardrel_br_143a269a`): Rakdos is the native demon-headliner choice: opponents must lose life before the show begins, then life-loss discounts enormous creatures.
- **Rakdos, the Showstopper** (`cardrel_br_03a4b997`): This is a pure flavor-forward Rakdos performance: the demon arrives, the stage erupts, and survival becomes a coin-flip spectacle.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `cult_of_rakdos_claim_001`: Rakdos is the black-red guild of Ravnica, associated with performance, dangerous spectacle, anti-authoritarian provocation, and public transgression.
- `cult_of_rakdos_claim_002`: The official guide describes the Cult of Rakdos as entertainers and hosts whose performances may be destructive or hedonistic.
- `cult_of_rakdos_claim_003`: The guide says Rakdos was loosely organized into Rings and later pushed toward travelling theater-troupe behavior.
- `cult_of_rakdos_claim_004`: The guide identifies the ancient demon Rakdos as founder, namesake, and object of cultic worship.
- `cult_of_rakdos_claim_005`: Spectacle is the Ravnica Allegiance signature mechanic associated with Rakdos.
- `cult_of_rakdos_claim_006`: Rakdos placement signals should require performance, spectacle, transgression, sensation, danger, or a visible audience/cost/consequence cluster rather than generic black-red aggression or random disruption.
- `cult_of_rakdos_claim_001`: Rakdos is the black-red guild of Ravnica, associated with performance, dangerous spectacle, anti-authoritarian provocation, and public transgression.
- `cult_of_rakdos_claim_002`: The official guide describes the Cult of Rakdos as entertainers and hosts whose performances may be destructive or hedonistic.
- `cult_of_rakdos_claim_003`: The guide says Rakdos was loosely organized into Rings and later pushed toward travelling theater-troupe behavior.
- `cult_of_rakdos_claim_004`: The guide identifies the ancient demon Rakdos as founder, namesake, and object of cultic worship.
- `cult_of_rakdos_claim_005`: Spectacle is the Ravnica Allegiance signature mechanic associated with Rakdos.
- `cult_of_rakdos_claim_006`: Rakdos placement signals should require performance, spectacle, transgression, sensation, danger, or a visible audience/cost/consequence cluster rather than generic black-red aggression or random disruption.

### Canonical card evidence

- **Rakdos, Lord of Riots**: You can't cast Rakdos unless an opponent lost life this turn. Flying, trample Creature spells you cast cost {1} less to cast for each 1 life your opponents have lost this turn.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=143a269a-b9ee-48ba-bd7b-4aa46eb36778`
- **Rakdos, the Showstopper**: Flying, trample When Rakdos enters, flip a coin for each creature that isn't a Demon, Devil, or Imp. Destroy each creature whose coin comes up tails.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=03a4b997-4738-41a9-933f-e1f765e3a75a`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Judith, the Scourge Diva** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json#/commander_compass/native_fit_commanders/1`
- **Blim, Comedic Genius** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Juri, Master of the Revue** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json#/commander_compass/budget_friendly_commanders/0`
- **Prosper, Tome-Bound** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json#/commander_compass/advanced_complexity_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Avatar of Discord | “Such is the power of Rakdos that even his shadow takes on a cruel life of its own.” | `EXPLICIT_IDENTITY_REFERENCE` | `cult_of_rakdos_claim_001`<br>`cult_of_rakdos_claim_002`<br>`cult_of_rakdos_claim_006` | Avatar of Discord's exact excerpt provides a bounded voice echo of Rakdos named directly through cruelty made vivid and performative. The excerpt is admissible for owner review only because its language corresponds to certified claims cult_of_rakdos_claim_001, cult_of_rakdos_claim_002, cult_of_rakdos_claim_006; the relationship does not arise from card color, product membership, tags, or mechanics. | Mono-Red, Black, and Gruul can express danger or cruelty; only the explicit Rakdos spectacle/transgression frame supports this relationship. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=3f806353-592e-431c-a7dd-a4c64034f94d` | **APPROVE / REVISE / REJECT** (`packet1_voice_br_3f806353_592e_431c_a7dd_a4c64034f94d_1`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_br_3f806353_592e_431c_a7dd_a4c64034f94d_1`: **APPROVE / REVISE / REJECT**
## Dune / Aggression (`DUNE`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Saskia the Unyielding** (`packet1_rationale_dune_e54d207c_51b8_458e_86a1_2633ac064c8e`, Oracle ID `e54d207c-51b8-458e-86a1-2633ac064c8e`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `dune_claim_0003`, `dune_claim_0005`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `dune_claim_0003`: The Dune / Aggression BRGW four-color lane is framed by the color it excludes: Blue.
- `dune_claim_0005`: The current Dune / Aggression frame may discuss direct action, physical momentum, territorial pressure, organized force, and rejection of detached contemplation, but detailed metaphysical, Commander, strategic, or competitive claims should remain bounded beyond the approved evidence floor.
- Relationship lead: `data/raw-factions/dune/dune.claims.json#dune_claim_0005`

### Canonical card evidence

- Vigilance, haste As Saskia enters, choose a player. Whenever a creature you control deals combat damage to a player, it deals that much damage to the chosen player.
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=e54d207c-51b8-458e-86a1-2633ac064c8e`

### Proposed public rationale

- Saskia turns visible combat into concentrated pressure: you choose a player, and combat damage dealt elsewhere is repeated against that player.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- None beyond the selected or retained card relationship(s).

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Aurelia, the Warleader | “Where Razia was aloof and untouchable, Aurelia is on the frontlines, calling for war.” | `CERTIFIED_SEMANTIC_ECHO` | `dune_claim_0005` | Aurelia, the Warleader's exact excerpt provides a bounded voice echo of front-line leadership, immediate action, and organized force. The excerpt is admissible for owner review only because its language corresponds to certified claims dune_claim_0005; the relationship does not arise from card color, product membership, tags, or mechanics. | This excerpt is canonically Boros and therefore carries a high Boros/Mardu confusion risk. It is only a cross-identity voice echo for Dune's bounded direct-action frame. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=0f5a3a09-2f07-4774-9e0f-e99d9a444166` | **APPROVE / REVISE / REJECT** (`packet1_voice_dune_0f5a3a09_2f07_4774_9e0f_e99d9a444166_1`) |

### Owner decision

- rationale `packet1_rationale_dune_e54d207c_51b8_458e_86a1_2633ac064c8e`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_dune_0f5a3a09_2f07_4774_9e0f_e99d9a444166_1`: **APPROVE / REVISE / REJECT**
## Esper (`ESPER`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Y'shtola, Night's Blessed** (`packet1_rationale_esper_3268251a_8292_44f9_9267_c961b182f739`, Oracle ID `3268251a-8292-44f9-9267-c961b182f739`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `esper_claim_0003`, `esper_claim_0006`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `esper_claim_0003`: Esper's Blue-centered design philosophy treats potential as accessible through knowledge, planning, change, and applied information.
- `esper_claim_0006`: Black supports Esper's Blue center through control, information value, focus, and vision, while introducing ethical risk.
- Relationship lead: `data/raw-factions/esper/esper.claims.json#esper_claim_0003`

### Canonical card evidence

- Vigilance At the beginning of each end step, if a player lost 4 or more life this turn, you draw a card. Whenever you cast a noncreature spell with mana value 3 or greater, Y'sh...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=3268251a-8292-44f9-9267-c961b182f739`

### Proposed public rationale

- Y'shtola links planned noncreature spells and a known life-loss threshold to repeatable card access and pressure.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Aminatou, Veil Piercer** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/esper/esper.profile.json#/commander_compass/native_fit_commanders/1`
- **Oloro, Ageless Ascetic** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/esper/esper.profile.json#/commander_compass/native_fit_commanders/2`
- **Kamiz, Obscura Oculus** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/esper/esper.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Aminatou, the Fateshifter** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/esper/esper.profile.json#/commander_compass/advanced_complexity_commanders/0`
- **Urza, Chief Artificer** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/esper/esper.profile.json#/commander_compass/advanced_complexity_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Brainbite | “An Esper mage will leave a hole in your memory with surgical precision. A Grixis mage sees no reason to be so kind.” | `EXPLICIT_IDENTITY_REFERENCE` | `esper_claim_0003`<br>`esper_claim_0004`<br>`esper_claim_0006` | Brainbite's exact excerpt provides a bounded voice echo of Esper named directly through precise, controlled use of information. The excerpt is admissible for owner review only because its language corresponds to certified claims esper_claim_0003, esper_claim_0004, esper_claim_0006; the relationship does not arise from card color, product membership, tags, or mechanics. | Blue, Dimir, Azorius, and Grixis also use information or control; the excerpt explicitly contrasts Esper's surgical precision with Grixis. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=fef94125-aa8d-4147-a609-1e990961bde2` | **APPROVE / REVISE / REJECT** (`packet1_voice_esper_fef94125_aa8d_4147_a609_1e990961bde2_3`) |

### Owner decision

- rationale `packet1_rationale_esper_3268251a_8292_44f9_9267_c961b182f739`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_esper_fef94125_aa8d_4147_a609_1e990961bde2_3`: **APPROVE / REVISE / REJECT**
## Five-Color / WUBRG (`WUBRG`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Ulalek, Fused Atrocity** (`packet1_rationale_wubrg_9f6828e3_39d9_45d9_9bf1_0e3737a0321e`, Oracle ID `9f6828e3-39d9-45d9-9bf1-0e3737a0321e`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `wubrg_claim_0002`, `wubrg_claim_0006`, `wubrg_claim_0008`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `wubrg_claim_0002`: In Commander, a WUBRG commander gives the deck access to White, Blue, Black, Red, and Green color identity at the deck-construction level.
- `wubrg_claim_0006`: WUBRG Commander and precon rows may be shown as support-only deckbuilding navigation when local row, commander identity, product name, and official/current decklist source agree.
- `wubrg_claim_0008`: Official WUBRG Commander product and decklist anchors may support named examples, deck/product texture, and source coverage only; they do not by themselves support color philosophy, metaphysics, lore proof, placement proof, legality, popularity, ranking, metagame, or deck-quality claims.
- Relationship lead: `data/raw-factions/wubrg/wubrg.claims.json#wubrg_claim_0006`

### Canonical card evidence

- Devoid (This card has no color.) Whenever you cast an Eldrazi spell, you may pay {C}{C}. If you do, copy all spells you control, then copy all other activated and triggered abil...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=9f6828e3-39d9-45d9-9bf1-0e3737a0321e`

### Proposed public rationale

- Ulalek is a deckbuilding example of Five-Color access: its verified color identity includes all five colors, while its ability uses colorless mana to copy Eldrazi spells and abilities.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **The Ur-Dragon** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/wubrg/wubrg.profile.json#/commander_compass/native_fit_commanders/1`
- **Sliver Gravemother** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/wubrg/wubrg.profile.json#/commander_compass/native_fit_commanders/2`
- **Jared Carthalion** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/wubrg/wubrg.profile.json#/commander_compass/native_fit_commanders/3`
- **Heroes in a Half Shell** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/wubrg/wubrg.profile.json#/commander_compass/native_fit_commanders/4`
- **Ashling, the Limitless** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/wubrg/wubrg.profile.json#/commander_compass/native_fit_commanders/5`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Coalition Victory | “"You can build a perfect machine out of imperfect parts." —Urza” | `CERTIFIED_SEMANTIC_ECHO` | `wubrg_claim_0002`<br>`wubrg_claim_0003`<br>`wubrg_claim_0004`<br>`wubrg_claim_0007` | Coalition Victory's exact excerpt provides a bounded voice echo of a complete construction made from distinct imperfect parts. The excerpt is admissible for owner review only because its language corresponds to certified claims wubrg_claim_0002, wubrg_claim_0003, wubrg_claim_0004, wubrg_claim_0007; the relationship does not arise from card color, product membership, tags, or mechanics. | Artifacts, Yore, and modular engines can also sound like assembled machines. This is only an integration metaphor for Five-Color access and must not become mastery, completion, or faction lore. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=e9e25800-9ee7-40c9-b22d-611c7281c125` | **APPROVE / REVISE / REJECT** (`packet1_voice_wubrg_e9e25800_9ee7_40c9_b22d_611c7281c125_1`) |

### Owner decision

- rationale `packet1_rationale_wubrg_9f6828e3_39d9_45d9_9bf1_0e3737a0321e`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_wubrg_e9e25800_9ee7_40c9_b22d_611c7281c125_1`: **APPROVE / REVISE / REJECT**
## Glint / Chaos (`GLINT`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Yidris, Maelstrom Wielder** (`packet1_rationale_glint_9efe8aff_9a7d_4397_b5fd_c1a0fad7c15f`, Oracle ID `9efe8aff-9a7d-4397-b5fd-c1a0fad7c15f`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `glint_claim_0003`, `glint_claim_0005`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `glint_claim_0003`: The Glint / Chaos UBRG four-color lane is framed by the color it excludes: White.
- `glint_claim_0005`: The current Glint / Chaos frame may discuss rejection of White-style imposed order, communal obligation, and civic restraint in favor of appetite, adaptation, force, and volatility, but detailed psychology remains bounded and should not be canonized beyond the approved evidence floor.
- Relationship lead: `data/raw-factions/glint/glint.claims.json#glint_claim_0005`

### Canonical card evidence

- Trample Whenever Yidris deals combat damage to a player, as you cast spells from your hand this turn, they gain cascade. (When you cast the spell, exile cards from the top of yo...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=9efe8aff-9a7d-4397-b5fd-c1a0fad7c15f`

### Proposed public rationale

- Yidris converts successful combat into volatile follow-up routes by giving spells cast from hand cascade for the rest of that turn.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- None beyond the selected or retained card relationship(s).

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Aberrant Return | “Shadowmoor is rife with wild magic—powerful but as volatile as the plane itself.” | `CERTIFIED_SEMANTIC_ECHO` | `glint_claim_0005` | Aberrant Return's exact excerpt provides a bounded voice echo of wild magic described as powerful and volatile. The excerpt is admissible for owner review only because its language corresponds to certified claims glint_claim_0005; the relationship does not arise from card color, product membership, tags, or mechanics. | Prismari, Izzet, Rakdos, and Red can also sound volatile. The excerpt reaches only Glint's bounded volatility/force edge, not its appetite or anti-order boundary. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=3a92b235-196b-4f46-9d20-06f4d3653d36` | **APPROVE / REVISE / REJECT** (`packet1_voice_glint_3a92b235_196b_4f46_9d20_06f4d3653d36_replacement`) |

### Owner decision

- rationale `packet1_rationale_glint_9efe8aff_9a7d_4397_b5fd_c1a0fad7c15f`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_glint_3a92b235_196b_4f46_9d20_06f4d3653d36_replacement`: **APPROVE / REVISE / REJECT**
## Golgari Swarm (`BG`)

### Existing approved rationale(s)

- **Jarad, Golgari Lich Lord** (`cardrel_bg_87e65e36`): A classic Golgari leader who scales with the size of your graveyard and allows you to 'recycle' creatures into direct damage.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `golgari_swarm_claim_001`: Golgari is the black-green guild of Ravnica, associated with life, death, decay, reanimation, and survival.
- `golgari_swarm_claim_002`: The official guide describes Golgari members as living mostly underground in forgotten and unwanted places.
- `golgari_swarm_claim_003`: The guide states that Golgari are talented farmers and provide much of Ravnica's food production.
- `golgari_swarm_claim_006`: Undergrowth is the Guilds of Ravnica signature mechanic associated with Golgari.
- `golgari_swarm_claim_0018`: Golgari motivation is best bounded as reclaiming what is dead, discarded, buried, or unwanted so it can feed survival, infrastructure, or the next cycle.

### Canonical card evidence

- **Jarad, Golgari Lich Lord**: Jarad gets +1/+1 for each creature card in your graveyard. {1}{B}{G}, Sacrifice another creature: Each opponent loses life equal to the sacrificed creature's power. Sacrifice a...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=87e65e36-9483-49fe-b644-2caca092107f`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **The Gitrog Monster** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/golgari_swarm/golgari_swarm.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Meren of Clan Nel Toth** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/golgari_swarm/golgari_swarm.profile.json#/commander_compass/advanced_complexity_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Bloodbond March | “The Golgari support a vast army because death never ends its soldiers' service.” | `EXPLICIT_IDENTITY_REFERENCE` | `golgari_swarm_claim_001`<br>`golgari_swarm_claim_007`<br>`golgari_swarm_claim_0018` | Bloodbond March's exact excerpt provides a bounded voice echo of the Golgari named directly through death continuing as useful service. The excerpt is admissible for owner review only because its language corresponds to certified claims golgari_swarm_claim_001, golgari_swarm_claim_007, golgari_swarm_claim_0018; the relationship does not arise from card color, product membership, tags, or mechanics. | Witherbloom and generic graveyard decks also join life and death; the explicit Golgari reclamation-and-service frame is required. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=fc17d8dd-887f-405e-a195-777aa3da36f5` | **APPROVE / REVISE / REJECT** (`packet1_voice_bg_fc17d8dd_887f_405e_a195_777aa3da36f5_1`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_bg_fc17d8dd_887f_405e_a195_777aa3da36f5_1`: **APPROVE / REVISE / REJECT**
## Green (`G`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Azusa, Lost but Seeking** (`packet1_rationale_g_6c2c8bf3_9bf8_4a86_89d3_3bb36260dc51`, Oracle ID `6c2c8bf3-9bf8-4a86-89d3-3bb36260dc51`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `green_claim_0004`, `green_claim_0007`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `green_claim_0004`: Green centers life, growth, nature, reality, community, interdependence, past wisdom, ancestry, tradition, instinct, animals, and plants; it resists unnatural change that creates what was not meant to exist or disrupts ecosystems, while allowing slow purposeful evolution.
- `green_claim_0007`: Green's mechanical texture includes efficient creatures, +1/+1 counters, mana and lands, Fight/Bite, reach, trample, artifact and enchantment destruction, card draw or filtering tied to creatures and lands, and anti-flying tools.
- Relationship lead: `data/raw-factions/green/green.claims.json#green_claim_0007`

### Canonical card evidence

- You may play two additional lands on each of your turns.
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=6c2c8bf3-9bf8-4a86-89d3-3bb36260dc51`

### Proposed public rationale

- Azusa gives Green's land-based growth a direct Commander example by allowing two additional land plays on each of your turns.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Selvala, Heart of the Wilds** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/green/green.profile.json#/commander_compass/native_fit_commanders/1`
- **Goreclaw, Terror of Qal Sisma** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/green/green.profile.json#/commander_compass/native_fit_commanders/2`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Ghalta, Primal Hunger | “The earth walks, strongest of all.” | `CERTIFIED_SEMANTIC_ECHO` | `green_claim_0002`<br>`green_claim_0004`<br>`green_claim_0006` | Ghalta, Primal Hunger's exact excerpt provides a bounded voice echo of the earth itself embodied as primal strength. The excerpt is admissible for owner review only because its language corresponds to certified claims green_claim_0002, green_claim_0004, green_claim_0006; the relationship does not arise from card color, product membership, tags, or mechanics. | Gruul, Naya, and Temur also use primal nature; this is a mono-Green voice echo only, not proof from creature size or card color. | `data/scryfall/indexes/commander-index.json#oracle_id=b0b6be0c-41cf-4757-9f0e-87227b6ba6b3` | **APPROVE / REVISE / REJECT** (`packet1_voice_g_b0b6be0c_41cf_4757_9f0e_87227b6ba6b3_3`) |

### Owner decision

- rationale `packet1_rationale_g_6c2c8bf3_9bf8_4a86_89d3_3bb36260dc51`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_g_b0b6be0c_41cf_4757_9f0e_87227b6ba6b3_3`: **APPROVE / REVISE / REJECT**
## Grixis (`GRIXIS`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Kess, Dissident Mage** (`packet1_rationale_grixis_f5092c14_eec4_472c_999c_ba96c36b2fbb`, Oracle ID `f5092c14-eec4-472c-999c-ba96c36b2fbb`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `grixis_claim_0003`, `grixis_claim_0004`, `grixis_claim_0006`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `grixis_claim_0003`: Black's Grixis framing centers survival, self-advocacy, agency, and adapting to reality as it is.
- `grixis_claim_0004`: Blue contributes subtle problem-solving, study, planning, weakness analysis, and information leverage inside Black's Grixis frame.
- `grixis_claim_0006`: The UBR synthesis is Black mixing Red zeal with Blue manipulation and smarts into an actively conniving survival world.
- Relationship lead: `data/raw-factions/grixis/grixis.claims.json#grixis_claim_0004`

### Canonical card evidence

- Flying Once during each of your turns, you may cast an instant or sorcery spell from your graveyard. If a spell cast this way would be put into your graveyard, exile it instead.
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=f5092c14-eec4-472c-999c-ba96c36b2fbb`

### Proposed public rationale

- Kess turns a spent instant or sorcery into one more planned option by letting you cast one such card from your graveyard during each of your turns.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Nekusar, the Mindrazer** — `REJECTED`: Rejected in its current form: Unresolved provenance IDs: src_vm_second_commander_recommendations_ubr, src_scryfall_commander_index_local. Source: `data/raw-factions/grixis/grixis.profile.json#/commander_compass/native_fit_commanders/1`
- **Jeleva, Nephalia's Scourge** — `REJECTED`: Rejected in its current form: Unresolved provenance IDs: src_vm_second_commander_recommendations_ubr, src_scryfall_commander_index_local. Source: `data/raw-factions/grixis/grixis.profile.json#/commander_compass/native_fit_commanders/2`
- **Anhelo, the Painter** — `REJECTED`: Rejected in its current form: Unresolved provenance IDs: src_vm_second_commander_recommendations_ubr, src_scryfall_commander_index_local. Source: `data/raw-factions/grixis/grixis.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Mishra, Eminent One** — `REJECTED`: Rejected in its current form: Unresolved provenance IDs: src_vm_second_commander_recommendations_ubr, src_scryfall_commander_index_local. Source: `data/raw-factions/grixis/grixis.profile.json#/commander_compass/advanced_complexity_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Brainbite | “An Esper mage will leave a hole in your memory with surgical precision. A Grixis mage sees no reason to be so kind.” | `EXPLICIT_IDENTITY_REFERENCE` | `grixis_claim_0003`<br>`grixis_claim_0004`<br>`grixis_claim_0006` | Brainbite's exact excerpt provides a bounded voice echo of Grixis named directly as harsher than Esper in its use of information and harm. The excerpt is admissible for owner review only because its language corresponds to certified claims grixis_claim_0003, grixis_claim_0004, grixis_claim_0006; the relationship does not arise from card color, product membership, tags, or mechanics. | Esper and Dimir share precision and information leverage; the explicit Esper/Grixis contrast makes the Grixis ruthlessness distinction visible. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=fef94125-aa8d-4147-a609-1e990961bde2` | **APPROVE / REVISE / REJECT** (`packet1_voice_grixis_fef94125_aa8d_4147_a609_1e990961bde2_3`) |

### Owner decision

- rationale `packet1_rationale_grixis_f5092c14_eec4_472c_999c_ba96c36b2fbb`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_grixis_fef94125_aa8d_4147_a609_1e990961bde2_3`: **APPROVE / REVISE / REJECT**
## Gruul Clans (`RG`)

### Existing approved rationale(s)

- **Borborygmos Enraged** (`cardrel_rg_b7505737`): Borborygmos appears because the certified Gruul record identifies him as the leader of the Burning-Tree clan.
- **Nikya of the Old Ways** (`cardrel_rg_ebf3fd80`): She forces you to abandon 'civilized' noncreature spells in exchange for massive mana for monsters.
- **Ruric Thar, the Unbowed** (`cardrel_rg_6ed13a89`): A severe Gruul pressure piece against noncreature spell plans; creature-first tables punish players who try to solve everything with spells.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `claim_gruul_clans_key_figure_0012`: Borborygmos is an unusually massive cyclops and the savage leader of the Burning Tree clan in the Gatecrash-era official guide.
- `claim_gruul_clans_key_figure_0013`: Borborygmos had defended his position as the Gruul's mightiest clan leader for several decades in the Gatecrash-era official guide.
- `claim_gruul_clans_key_figure_0035`: The Ravnica Allegiance flavor guide states that Borborygmos was considered the Gruul's de facto leader by most Ravnicans because Burning Tree was the largest and most powerful clan.
- `claim_gruul_clans_key_figure_0036`: The Ravnica Allegiance flavor guide states that Domri Rade bested Borborygmos in combat and became in charge of the Gruul Clans.
- `claim_gruul_clans_key_figure_0046`: In War of the Spark, Domri Rade is described as having replaced Borborygmos as the Gruul's new guildmaster.
- `claim_gruul_clans_key_figure_0023`: Nikya of the Old Ways is identified as the Zhur-Taa leader and a powerful shaman in the Gatecrash-era official guide.
- `claim_gruul_clans_structure_0021`: The Zhur-Taa clan claims to follow the old ways and is close to its beasts, with shamans adept at summoning and training beasts for war-companions and mounts.
- `claim_gruul_clans_philosophy_0022`: The Zhur-Taa worship the Utmungr, gods of the deep earth, and await an ancient boar god who will raze the over-civilized world.
- `claim_gruul_clans_key_figure_0016`: Ruric Thar is identified as the leader of the Ghor clan in the Gatecrash-era official guide.
- `claim_gruul_clans_structure_0017`: The Ghor clan is described as executing the most frequent and savage assaults on Ravnican citizenry among the stable Gruul clans.

### Canonical card evidence

- **Borborygmos Enraged**: Trample Whenever Borborygmos Enraged deals combat damage to a player, reveal the top three cards of your library. Put all land cards revealed this way into your hand and the res...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=b7505737-1fc8-4ee8-8b1d-5dde73b6a76d`
- **Nikya of the Old Ways**: You can't cast noncreature spells. Whenever you tap a land for mana, add one mana of any type that land produced.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=ebf3fd80-9574-489b-9428-f4251834bdc4`
- **Ruric Thar, the Unbowed**: Vigilance, reach Ruric Thar attacks each combat if able. Whenever a player casts a noncreature spell, Ruric Thar deals 6 damage to that player.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=6ed13a89-4284-4c01-8099-75e2d68c8c63`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Hallar, the Firefletcher** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/gruul_clans/gruul_clans.profile.json#/commander_compass/weird_stretch_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Burning-Tree Emissary | “Those who regard the Gruul as savage simpletons underestimate the subtle power of their shamans.” | `EXPLICIT_IDENTITY_REFERENCE` | `claim_gruul_clans_core_identity_0002`<br>`claim_gruul_clans_philosophy_0004`<br>`claim_gruul_clans_placement_0001` | Burning-Tree Emissary's exact excerpt provides a bounded voice echo of the Gruul named directly while rejecting the assumption that their wildness lacks subtle power. The excerpt is admissible for owner review only because its language corresponds to certified claims claim_gruul_clans_core_identity_0002, claim_gruul_clans_philosophy_0004, claim_gruul_clans_placement_0001; the relationship does not arise from card color, product membership, tags, or mechanics. | Red, Green, and Temur can sound instinctive or wild; the explicit Gruul anti-civilization and shaman context supplies the relationship. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=327d9679-0049-4401-8dab-e0fb362306bd` | **APPROVE / REVISE / REJECT** (`packet1_voice_rg_327d9679_0049_4401_8dab_e0fb362306bd_2`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_rg_327d9679_0049_4401_8dab_e0fb362306bd_2`: **APPROVE / REVISE / REJECT**
## House Dimir (`UB`)

### Existing approved rationale(s)

- **Lazav, Dimir Mastermind** (`cardrel_ub_8027a610`): Lazav appears because the certified House Dimir record identifies him as the guildmaster of the guild associated with secrecy, spies, assassins, and backroom deals.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `house_dimir_claim_001`: House Dimir is the blue-black guild of Ravnica, associated with deception, secrecy, spies, assassins, and manipulation.
- `house_dimir_claim_002`: The official guide describes Dimir as built on secrets and backroom deals.
- `house_dimir_claim_004`: The 2018 guide presents Lazav as the current guildmaster of House Dimir.
- `house_dimir_claim_0017`: A source-bounded Dimir reading requires House Dimir secrecy, deception, backroom dealing, spies or assassins, and information-filtering texture rather than generic blue-black control, mill, discard, theft, or evasive mechanics alone.

### Canonical card evidence

- **Lazav, Dimir Mastermind**: Hexproof Whenever a creature card is put into an opponent's graveyard from anywhere, you may have Lazav become a copy of that card, except its name is Lazav, Dimir Mastermind, i...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=8027a610-613e-4640-9840-c8778694f312`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Etrata, the Silencer** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/house_dimir/house_dimir.profile.json#/commander_compass/weird_stretch_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Consult the Necrosages | “Dimir rank and file never see nor hear their guildmaster. All orders are given through mysterious necrosages who appe...” | `EXPLICIT_IDENTITY_REFERENCE` | `house_dimir_claim_0017`<br>`house_dimir_claim_0018`<br>`house_dimir_claim_0019` | Consult the Necrosages's exact excerpt provides a bounded voice echo of Dimir named directly through unseen hierarchy and orders delivered by mysterious intermediaries. The excerpt is admissible for owner review only because its language corresponds to certified claims house_dimir_claim_0017, house_dimir_claim_0018, house_dimir_claim_0019; the relationship does not arise from card color, product membership, tags, or mechanics. | Azorius and Orzhov also use hierarchy, while Blue/Black use information; the hidden backroom delivery is the Dimir distinction. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=c9edddb4-0d60-4d21-8887-51d943c6a31f` | **APPROVE / REVISE / REJECT** (`packet1_voice_ub_c9edddb4_0d60_4d21_8887_51d943c6a31f_2`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_ub_c9edddb4_0d60_4d21_8887_51d943c6a31f_2`: **APPROVE / REVISE / REJECT**
## Ink / Altruism (`INK`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Kynaios and Tiro of Meletis** (`packet1_rationale_ink_53ee4254_fef7_49ec_aafc_0320987764e6`, Oracle ID `53ee4254-fef7-49ec-aafc-0320987764e6`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `ink_claim_0003`, `ink_claim_0005`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `ink_claim_0003`: The Ink / Altruism RGWU four-color lane is framed by the color it excludes: Black.
- `ink_claim_0005`: The current Ink / Altruism frame may discuss shared prosperity, community benefit, protected generosity, and open knowledge, but detailed metaphysical, Commander, strategic, comparative, or symbolic claims should remain bounded beyond the approved evidence floor.
- Relationship lead: `data/raw-factions/ink/ink.claims.json#ink_claim_0005`

### Canonical card evidence

- At the beginning of your end step, draw a card. Each player may put a land card from their hand onto the battlefield, then each opponent who didn't draws a card.
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=53ee4254-fef7-49ec-aafc-0320987764e6`

### Proposed public rationale

- Kynaios and Tiro make Ink's shared-resource frame visible: their end-step ability gives every player a chance to develop mana or draw, while their controller also draws.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- None beyond the selected or retained card relationship(s).

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Command Tower | “Knowledge is wasted if not shared.” | `CERTIFIED_SEMANTIC_ECHO` | `ink_claim_0005` | Command Tower's exact excerpt provides a bounded voice echo of knowledge treated as wasted unless it is shared. The excerpt is admissible for owner review only because its language corresponds to certified claims ink_claim_0005; the relationship does not arise from card color, product membership, tags, or mechanics. | White, Blue, Selesnya, and Five-Color can all value sharing. This proposal is limited to Ink's certified open-knowledge and community-benefit frame and does not prove the four-color identity. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=0895c9b7-ae7d-4bb3-af17-3b75deb50a25` | **APPROVE / REVISE / REJECT** (`packet1_voice_ink_0895c9b7_ae7d_4bb3_af17_3b75deb50a25_replacement`) |

### Owner decision

- rationale `packet1_rationale_ink_53ee4254_fef7_49ec_aafc_0320987764e6`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_ink_0895c9b7_ae7d_4bb3_af17_3b75deb50a25_replacement`: **APPROVE / REVISE / REJECT**
## Izzet League (`UR`)

### Existing approved rationale(s)

- **Niv-Mizzet, Parun** (`cardrel_ur_33666a98`): He is the cleanest native Izzet bridge: a Ravnican Izzet leader whose gameplay rewards instant/sorcery exchanges with cards and turns card draw into precise damage.
- **Melek, Izzet Paragon** (`cardrel_ur_095d9719`): Melek preserves the lab-experiment feel without defaulting to the dragon. Revealing the top card and copying spells feels like an unstable experiment becoming repeatable technique.
- **Mizzix of the Izmagnus** (`cardrel_ur_f787c6cf`): Mizzix captures the escalating experiment: every correctly sequenced spell makes the next experiment cheaper and more dangerous.
- **Niv-Mizzet, Dracogenius** (`cardrel_ur_899d58dc`): This is a slower, more table-readable way to center Niv-Mizzet as Izzet identity: intellect, fire, and repeatable resource conversion.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `claim_izzet_league_0008`: Niv-Mizzet, the Firemind, is the original parun of the Izzet League.
- `claim_izzet_league_0009`: Niv-Mizzet rarely concerns himself with the day-to-day running of the Izzet guild.
- `claim_izzet_league_0025`: Niv-Mizzet compartmentalizes information among the members of his guild.
- `claim_izzet_league_0036`: Operation Desperation sought to resurrect Niv-Mizzet as the new Living Guildpact.
- `claim_izzet_league_0037`: Under the terms described by Ral Zarek during Operation Desperation, Niv-Mizzet would step down as guildmaster of the Izzet if resurrected as Living Guildpact.
- `claim_izzet_league_0039`: Niv-Mizzet is the current embodiment of the Living Guildpact after taking over during War of the Spark.
- `claim_izzet_league_0045`: Niv-Mizzet is described in Murders at Karlov Manor character guidance as the most intelligent being on Ravnica.
- `claim_izzet_league_0101`: Project Lightning Bug states that Chamberlain Maree impressed Niv-Mizzet with her work on Melek.
- `claim_izzet_league_0102`: Project Lightning Bug states that Maree and Mizzix calibrated Ral Zarek’s detector spell and improved its range.
- `claim_izzet_league_0008`: Niv-Mizzet, the Firemind, is the original parun of the Izzet League.
- `claim_izzet_league_0009`: Niv-Mizzet rarely concerns himself with the day-to-day running of the Izzet guild.
- `claim_izzet_league_0025`: Niv-Mizzet compartmentalizes information among the members of his guild.
- `claim_izzet_league_0036`: Operation Desperation sought to resurrect Niv-Mizzet as the new Living Guildpact.
- `claim_izzet_league_0037`: Under the terms described by Ral Zarek during Operation Desperation, Niv-Mizzet would step down as guildmaster of the Izzet if resurrected as Living Guildpact.
- `claim_izzet_league_0039`: Niv-Mizzet is the current embodiment of the Living Guildpact after taking over during War of the Spark.
- `claim_izzet_league_0045`: Niv-Mizzet is described in Murders at Karlov Manor character guidance as the most intelligent being on Ravnica.

### Canonical card evidence

- **Niv-Mizzet, Parun**: This spell can't be countered. Flying Whenever you draw a card, Niv-Mizzet deals 1 damage to any target. Whenever a player casts an instant or sorcery spell, you draw a card.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=33666a98-812f-4892-9f8d-33e0cbecc340`
- **Melek, Izzet Paragon**: Play with the top card of your library revealed. You may cast instant and sorcery spells from the top of your library. Whenever you cast an instant or sorcery spell from your li...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=095d9719-0db6-43de-8e4f-a0035a4c65ed`
- **Mizzix of the Izmagnus**: Whenever you cast an instant or sorcery spell with mana value greater than the number of experience counters you have, you get an experience counter. Instant and sorcery spells...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=f787c6cf-a4ff-487b-a7b0-0f516e68510a`
- **Niv-Mizzet, Dracogenius**: Flying Whenever Niv-Mizzet deals damage to a player, you may draw a card. {U}{R}: Niv-Mizzet deals 1 damage to any target.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=899d58dc-60b2-4013-9f91-c1888c585d66`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Ovika, Enigma Goliath** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/izzet_league/izzet_league.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Vadrik, Astral Archmage** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/izzet_league/izzet_league.profile.json#/commander_compass/budget_friendly_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Beamsplitter Mage | “The Izzet love replicating results.” | `EXPLICIT_IDENTITY_REFERENCE` | `claim_izzet_league_0001`<br>`claim_izzet_league_0003`<br>`claim_izzet_league_0004`<br>`claim_izzet_league_0006` | Beamsplitter Mage's exact excerpt provides a bounded voice echo of the Izzet named directly through delight in replicating experimental results. The excerpt is admissible for owner review only because its language corresponds to certified claims claim_izzet_league_0001, claim_izzet_league_0003, claim_izzet_league_0004, claim_izzet_league_0006; the relationship does not arise from card color, product membership, tags, or mechanics. | Prismari and Quandrix also experiment; Izzet requires invention, technical outcomes, or infrastructure rather than art or proof as the purpose. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=fa09e18c-e7cf-4f08-9cc4-324e36594063` | **APPROVE / REVISE / REJECT** (`packet1_voice_ur_fa09e18c_e7cf_4f08_9cc4_324e36594063_1`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_ur_fa09e18c_e7cf_4f08_9cc4_324e36594063_1`: **APPROVE / REVISE / REJECT**
## Jeskai Way (`JESKAI`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Shiko and Narset, Unified** (`packet1_rationale_jeskai_40ed32a6_ad56_48c7_aecf_b4238c34c212`, Oracle ID `40ed32a6-ad56-48c7-aecf-b4238c34c212`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `jeskai_claim_0002`, `jeskai_claim_0003`, `jeskai_claim_0011`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `jeskai_claim_0002`: Jeskai design identity has Blue as its center through perfection, knowledge, tools, discipline, and self-improvement, with Red adding action and White adding peace, order, structure, and shared form.
- `jeskai_claim_0003`: Cunning is Jeskai's wedge attribute and broad design vocabulary, expressed through knowledge, preparation, tricks, spell interaction, tempo, protection, and prowess-like design texture.
- `jeskai_claim_0011`: The official Tarkir: Dragonstorm Commander Decklists page verifies Jeskai Striker as a White; Blue; Red Commander deck with Shiko and Narset, Unified as face commander and Elsha, Threefold Master as featured commander.
- Relationship lead: `data/raw-factions/jeskai/jeskai.claims.json#jeskai_claim_0003`

### Canonical card evidence

- Flying, vigilance Flurry — Whenever you cast your second spell each turn, copy that spell if it targets a permanent or player, and you may choose new targets for the copy. If yo...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=40ed32a6-ad56-48c7-aecf-b4238c34c212`

### Proposed public rationale

- Shiko and Narset reward deliberate spell sequencing: the second spell each turn can be copied when it targets a permanent or player.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Narset, Enlightened Master** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/jeskai/jeskai.profile.json#/commander_compass/native_fit_commanders/1`
- **Kasla, the Broken Halo** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/jeskai/jeskai.profile.json#/commander_compass/native_fit_commanders/2`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Bloodfire Expert | “Some efreet abandon their homes in the volcanic Fire Rim to embrace the Jeskai Way and discipline their innate flames.” | `EXPLICIT_IDENTITY_REFERENCE` | `jeskai_claim_0002`<br>`jeskai_claim_0004`<br>`jeskai_claim_0005` | Bloodfire Expert's exact excerpt provides a bounded voice echo of the Jeskai Way named directly through discipline applied to innate flame. The excerpt is admissible for owner review only because its language corresponds to certified claims jeskai_claim_0002, jeskai_claim_0004, jeskai_claim_0005; the relationship does not arise from card color, product membership, tags, or mechanics. | Prismari and Izzet also join Blue and Red through technique; the explicit Jeskai discipline, monastery, and bloodfire context supplies the bridge. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=341cf654-faf7-4db9-bd9a-70783f1ccff0` | **APPROVE / REVISE / REJECT** (`packet1_voice_jeskai_341cf654_faf7_4db9_bd9a_70783f1ccff0_2`) |

### Owner decision

- rationale `packet1_rationale_jeskai_40ed32a6_ad56_48c7_aecf_b4238c34c212`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_jeskai_341cf654_faf7_4db9_bd9a_70783f1ccff0_2`: **APPROVE / REVISE / REJECT**
## Jund (`JUND`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Prossh, Skyraider of Kher** (`packet1_rationale_jund_868882d2_ed4e_4171_a17c_478a341080fb`, Oracle ID `868882d2-ed4e-4171-a17c-478a341080fb`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `jund_claim_0005`, `jund_claim_0008`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `jund_claim_0005`: The Jund design frame describes a world of total freedom where action and survival carry consequences.
- `jund_claim_0008`: Black and Green back Red's destructive and letting-loose side only inside the design-philosophy frame, so consequence-bearing action must not become generic cruelty or unbounded destruction.
- Relationship lead: `data/raw-factions/jund/jund.claims.json#jund_claim_0005`

### Canonical card evidence

- When you cast this spell, create X 0/1 red Kobold creature tokens named Kobolds of Kher Keep, where X is the amount of mana spent to cast it. Flying Sacrifice another creature:...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=868882d2-ed4e-4171-a17c-478a341080fb`

### Proposed public rationale

- Prossh turns each cast into a larger visible board, then lets those creatures be sacrificed for immediate power.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Hearthhull, the Worldseed** — `REJECTED`: Rejected in its current form: Canonical card name does not resolve in the committed Commander card index. Source: `data/raw-factions/jund/jund.profile.json#/commander_compass/native_fit_commanders/1`
- **Disa the Restless** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/jund/jund.profile.json#/commander_compass/native_fit_commanders/2`
- **Henzie "Toolbox" Torre** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/jund/jund.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Auntie Ool, Cursewretch** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/jund/jund.profile.json#/commander_compass/budget_friendly_commanders/0`
- **Lord Windgrace** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/jund/jund.profile.json#/commander_compass/advanced_complexity_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Broodmate Tyrant | “Karrthus was not the first Tyrant of Jund, nor will he be the last.” | `EXPLICIT_IDENTITY_REFERENCE` | `jund_claim_0003`<br>`jund_claim_0005`<br>`jund_claim_0007` | Broodmate Tyrant's exact excerpt provides a bounded voice echo of Jund named directly through embodied succession, dominance, and survival. The excerpt is admissible for owner review only because its language corresponds to certified claims jund_claim_0003, jund_claim_0005, jund_claim_0007; the relationship does not arise from card color, product membership, tags, or mechanics. | Gruul, Naya, and Grixis can share force or survival; the explicit Jund predatory-world framing prevents generic BRG inference. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=9b984236-39cf-4552-827b-e81c26cfb388` | **APPROVE / REVISE / REJECT** (`packet1_voice_jund_9b984236_39cf_4552_827b_e81c26cfb388_1`) |

### Owner decision

- rationale `packet1_rationale_jund_868882d2_ed4e_4171_a17c_478a341080fb`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_jund_9b984236_39cf_4552_827b_e81c26cfb388_1`: **APPROVE / REVISE / REJECT**
## Lorehold College (`LOREHOLD`)

### Existing approved rationale(s)

- **Lorehold, the Historian** (`cardrel_lorehold_61a41cf1`): Directly embodies the 'Eureka' moment of discovery by granting Miracle to all instants and sorceries in hand.
- **Quintorius, History Chaser** (`cardrel_lorehold_5c40a8d4`): Represents the college's main protagonist in his 2026 iteration, focusing on the spirit-driven historical research.
- **Velomachus Lorehold** (`cardrel_lorehold_43832745`): The founder of the college and the original face of Lorehold's spellslinger-aggro identity.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `claim_lorehold_figure_0001`: Velomachus Lorehold is one of the five elder dragon founders of Strixhaven University.
- `claim_lorehold_figure_0002`: Velomachus Lorehold is observant and standoffish, and considers it her responsibility to watch and document history without interference unless necessary.
- `claim_lorehold_figure_0003`: Velomachus Lorehold expects people to learn from the past and work toward a better future.
- `claim_lorehold_figure_0004`: Velomachus Lorehold has a fondness for collecting artifacts and trinkets.
- `claim_lorehold_mechanic_0011`: Velomachus Lorehold is a red-white legendary Elder Dragon card with flying, vigilance, and haste.
- `claim_lorehold_mechanic_0012`: Velomachus Lorehold's attack trigger can cast an instant or sorcery from the top seven cards of its controller's library if the spell's mana value is less than or equal to Velomachus's power.
- `claim_lorehold_figure_0005`: Quintorius Kand is a Lorehold student who became a recently sparked Planeswalker by the 2026 Secrets of Strixhaven legend guide.
- `claim_lorehold_figure_0006`: Quintorius Kand is described as a prolific reader and gregarious adventurer with deep appreciation for cultures, histories, and myths.
- `claim_lorehold_figure_0007`: Quintorius Kand has investigated remnants of the Fomori and mysterious multiversal colonizers lost to time.
- `claim_lorehold_location_0006`: Zantafar is a lost, ruined city rediscovered by Quintorius Kand and later became a historical site of great interest to Lorehold mages and anthropologists.
- `claim_lorehold_timeline_0006`: Quintorius used spirit/statue magic during the New Phyrexian invasion of Arcavios to seek guidance from Strixhaven's earliest professors.
- `claim_lorehold_figure_0021`: Quintorius guides younger Lorehold students at the Fields of Strife while investigating the remnants of the Fomori and a mysterious multiversal empire.
- `claim_lorehold_figure_0015`: Asterion helps redirect Quintorius from a mistaken Pillardrop excavation theory toward Zantafar.
- `claim_lorehold_figure_0001`: Velomachus Lorehold is one of the five elder dragon founders of Strixhaven University.
- `claim_lorehold_figure_0002`: Velomachus Lorehold is observant and standoffish, and considers it her responsibility to watch and document history without interference unless necessary.
- `claim_lorehold_figure_0003`: Velomachus Lorehold expects people to learn from the past and work toward a better future.
- `claim_lorehold_figure_0004`: Velomachus Lorehold has a fondness for collecting artifacts and trinkets.
- `claim_lorehold_mechanic_0011`: Velomachus Lorehold is a red-white legendary Elder Dragon card with flying, vigilance, and haste.
- `claim_lorehold_mechanic_0012`: Velomachus Lorehold's attack trigger can cast an instant or sorcery from the top seven cards of its controller's library if the spell's mana value is less than or equal to Velomachus's power.

### Canonical card evidence

- **Lorehold, the Historian**: Flying, haste Each instant and sorcery card in your hand has miracle {2}. (You may cast a card for its miracle cost when you draw it if it's the first card you drew this turn.)...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=61a41cf1-60cc-45ba-aa98-493c14e87d9d`
- **Quintorius, History Chaser**: Whenever one or more cards leave your graveyard, create a 3/2 red and white Spirit creature token. +1: You may discard a card. If you do, draw two cards, then mill a card. −4: S...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=5c40a8d4-6969-4d71-aba5-5c7e4109b7d5`
- **Velomachus Lorehold**: Flying, vigilance, haste Whenever Velomachus Lorehold attacks, look at the top seven cards of your library. You may cast an instant or sorcery spell with mana value less than or...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=43832745-5d7d-4957-8e30-2072ad012564`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- None beyond the selected or retained card relationship(s).

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Campus Renovation | “Reconstructing the past is Lorehold's specialty.” | `EXPLICIT_IDENTITY_REFERENCE` | `claim_lorehold_placement_0001`<br>`claim_lorehold_placement_0002`<br>`claim_lorehold_placement_0009` | Campus Renovation's exact excerpt provides a bounded voice echo of Lorehold named directly through reconstructing and actively using the past. The excerpt is admissible for owner review only because its language corresponds to certified claims claim_lorehold_placement_0001, claim_lorehold_placement_0002, claim_lorehold_placement_0009; the relationship does not arise from card color, product membership, tags, or mechanics. | White, Red, and generic artifact recursion can preserve objects; the explicit Lorehold historical-reconstruction purpose is required. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=d34a3b58-a905-4e90-b35c-9f5c21149b04` | **APPROVE / REVISE / REJECT** (`packet1_voice_lorehold_d34a3b58_a905_4e90_b35c_9f5c21149b04_1`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_lorehold_d34a3b58_a905_4e90_b35c_9f5c21149b04_1`: **APPROVE / REVISE / REJECT**
## Mardu Horde (`MARDU`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Zurgo Stormrender** (`packet1_rationale_mardu_0f93d88c_9d2e_416d_a10b_99483360b1fb`, Oracle ID `0f93d88c-9d2e-416d-a10b-99483360b1fb`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `mardu_claim_0002`, `mardu_claim_0011`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `mardu_claim_0002`: Mardu design identity has Red as its center and speed as its wedge attribute, with speed expressed through action, early pressure, strategic timing, rapid coordinated attack, and all-in aggression across the three colors.
- `mardu_claim_0011`: The official Tarkir: Dragonstorm Commander Decklists page verifies Mardu Surge as a Red; White; Black Commander deck with Zurgo Stormrender as face commander and Neriv, Crackling Vanguard as featured commander.
- Relationship lead: `data/raw-factions/mardu/mardu.claims.json#mardu_claim_0002`

### Canonical card evidence

- Mobilize 1 (Whenever this creature attacks, create a tapped and attacking 1/1 red Warrior creature token. Sacrifice it at the beginning of the next end step.) Whenever a creatur...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=0f93d88c-9d2e-416d-a10b-99483360b1fb`

### Proposed public rationale

- Zurgo makes Mardu's speed-and-pressure frame concrete by creating a temporary attacking creature whenever he attacks.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Alesha, Who Smiles at Death** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/mardu/mardu.profile.json#/commander_compass/native_fit_commanders/1`
- **Edgar Markov** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/mardu/mardu.profile.json#/commander_compass/native_fit_commanders/2`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Bloodsoaked Champion | “"Death is merely another foe the Mardu will overcome."” | `EXPLICIT_IDENTITY_REFERENCE` | `mardu_claim_0002`<br>`mardu_claim_0003`<br>`mardu_claim_0005` | Bloodsoaked Champion's exact excerpt provides a bounded voice echo of the Mardu named directly through meeting death as another opponent. The excerpt is admissible for owner review only because its language corresponds to certified claims mardu_claim_0002, mardu_claim_0003, mardu_claim_0005; the relationship does not arise from card color, product membership, tags, or mechanics. | Rakdos, Jund, and Black also speak in violent or death-facing terms; the explicit Mardu honor-and-action context is the bridge. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=cad09970-14c8-4d80-82fe-6c855efb0191` | **APPROVE / REVISE / REJECT** (`packet1_voice_mardu_cad09970_14c8_4d80_82fe_6c855efb0191_3`) |

### Owner decision

- rationale `packet1_rationale_mardu_0f93d88c_9d2e_416d_a10b_99483360b1fb`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_mardu_cad09970_14c8_4d80_82fe_6c855efb0191_3`: **APPROVE / REVISE / REJECT**
## Naya (`NAYA`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Shalai and Hallar** (`packet1_rationale_naya_e7604cd9_d00d_4957_82c9_46a7cdb88209`, Oracle ID `e7604cd9-d00d-4957-82c9-46a7cdb88209`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `naya_claim_0003`, `naya_claim_0004`, `naya_claim_0006`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `naya_claim_0003`: Naya frames life as part of a larger natural whole where ecosystem, role, place, and belonging are safe design-level readings.
- `naya_claim_0004`: Naya's official design frame puts nature and growth at center stage, with growth pushed to an extreme.
- `naya_claim_0006`: Red supports Naya through feral instinct, immediacy, loyalty, and bond language.
- Relationship lead: `data/raw-factions/naya/naya.claims.json#naya_claim_0004`

### Canonical card evidence

- Flying, vigilance Whenever one or more +1/+1 counters are put on a creature you control, Shalai and Hallar deals that much damage to target opponent.
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=e7604cd9-d00d-4957-82c9-46a7cdb88209`

### Proposed public rationale

- Shalai and Hallar turn creature growth into immediate table pressure by dealing damage when +1/+1 counters are put on your creatures.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Pantlaza, Sun-Favored** — `REJECTED`: Rejected because generated-only display data is not relationship authority. Source: `data/factions.json#/factions/NAYA/commander_compass/native_fit_commanders`
- **Marath, Will of the Wild** — `REJECTED`: Rejected because generated-only display data is not relationship authority. Source: `data/factions.json#/factions/NAYA/commander_compass/native_fit_commanders`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Cradle of Vitality | “Naya's trees grow tall and sturdy. Their foliage intertwines to form dewcups, rainwater pools where the elves gather...” | `EXPLICIT_IDENTITY_REFERENCE` | `naya_claim_0003`<br>`naya_claim_0004`<br>`naya_claim_0007` | Cradle of Vitality's exact excerpt provides a bounded voice echo of Naya named directly through abundant natural growth and gathering. The excerpt is admissible for owner review only because its language corresponds to certified claims naya_claim_0003, naya_claim_0004, naya_claim_0007; the relationship does not arise from card color, product membership, tags, or mechanics. | Selesnya and Green share growth and community; the explicit Naya ecosystem and abundance context prevents generic token or lifegain inference. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=956250da-532a-4457-8696-73915be56943` | **APPROVE / REVISE / REJECT** (`packet1_voice_naya_956250da_532a_4457_8696_73915be56943_2`) |

### Owner decision

- rationale `packet1_rationale_naya_e7604cd9_d00d_4957_82c9_46a7cdb88209`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_naya_956250da_532a_4457_8696_73915be56943_2`: **APPROVE / REVISE / REJECT**
## Orzhov Syndicate (`WB`)

### Existing approved rationale(s)

- **Teysa Karlov** (`cardrel_wb_644eeefd`): Teysa is the clearest native Orzhov product fit: she doubles death-trigger value and turns token bodies into a more threatening spiritual workforce.
- **Teysa, Orzhov Scion** (`cardrel_wb_8191342b`): This version of Teysa strongly expresses Orzhov transaction logic: sacrifice, death, replacement bodies, and exile removal all feed the same contract engine.
- **Karlov of the Ghost Council** (`cardrel_wb_647d7988`): Karlov converts lifegain into visible authority: counters become removal, making every payment and tithe a future sentence.
- **Obzedat, Ghost Council** (`cardrel_wb_6c3df703`): Obzedat is the iconic old Orzhov power structure: deathless elites draining value, dodging consequences, and returning to collect again.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `orzhov_syndicate_claim_005`: The 2019 guide presents Kaya as taking control of the Orzhov after destroying the Obzedat, with Teysa installed as her right hand.
- `orzhov_syndicate_claim_006`: Afterlife is the Ravnica Allegiance signature mechanic associated with Orzhov.
- `orzhov_syndicate_claim_007`: Orzhov placement signals should require obligation, deal-making, debt, hierarchy, institutional leverage, or cartel/religious-business context rather than generic white-black control, lifegain, drain, sacrifice, taxes, stax, removal, aristocrats, recursion, or death-matters mechanics alone.
- `orzhov_syndicate_claim_0018`: Orzhov motivation is source-bounded as making religion, deals, debt, business, and cartel hierarchy function as durable leverage and collectible obligation.
- `orzhov_syndicate_claim_0020`: Generic white-black control, midrange, attrition, taxes, stax, removal, lifegain, drain, aristocrats, sacrifice, tokens, recursion, extort, or death-trigger gameplay is not Orzhov proof unless source-bounded Orzhov religion, deals, debt, business, hierarchy, or cartel context leads.
- `orzhov_syndicate_claim_002`: The official Ravnica Allegiance guide says Orzhov began as a proper religious organization but emphasizes deals and business in its modern identity.
- `orzhov_syndicate_claim_003`: The guide describes Orzhov as a loose affiliation of cartels led by priests or kingpins.
- `orzhov_syndicate_claim_006`: Afterlife is the Ravnica Allegiance signature mechanic associated with Orzhov.
- `orzhov_syndicate_claim_007`: Orzhov placement signals should require obligation, deal-making, debt, hierarchy, institutional leverage, or cartel/religious-business context rather than generic white-black control, lifegain, drain, sacrifice, taxes, stax, removal, aristocrats, recursion, or death-matters mechanics alone.
- `orzhov_syndicate_claim_0018`: Orzhov motivation is source-bounded as making religion, deals, debt, business, and cartel hierarchy function as durable leverage and collectible obligation.
- `orzhov_syndicate_claim_0020`: Generic white-black control, midrange, attrition, taxes, stax, removal, lifegain, drain, aristocrats, sacrifice, tokens, recursion, extort, or death-trigger gameplay is not Orzhov proof unless source-bounded Orzhov religion, deals, debt, business, hierarchy, or cartel context leads.
- `orzhov_syndicate_claim_004`: The guide describes the Obzedat as the Ghost Council of Orzhova and historic leaders of the Syndicate.
- `orzhov_syndicate_claim_006`: Afterlife is the Ravnica Allegiance signature mechanic associated with Orzhov.
- `orzhov_syndicate_claim_007`: Orzhov placement signals should require obligation, deal-making, debt, hierarchy, institutional leverage, or cartel/religious-business context rather than generic white-black control, lifegain, drain, sacrifice, taxes, stax, removal, aristocrats, recursion, or death-matters mechanics alone.
- `orzhov_syndicate_claim_0018`: Orzhov motivation is source-bounded as making religion, deals, debt, business, and cartel hierarchy function as durable leverage and collectible obligation.
- `orzhov_syndicate_claim_0020`: Generic white-black control, midrange, attrition, taxes, stax, removal, lifegain, drain, aristocrats, sacrifice, tokens, recursion, extort, or death-trigger gameplay is not Orzhov proof unless source-bounded Orzhov religion, deals, debt, business, hierarchy, or cartel context leads.
- `orzhov_syndicate_claim_004`: The guide describes the Obzedat as the Ghost Council of Orzhova and historic leaders of the Syndicate.
- `orzhov_syndicate_claim_006`: Afterlife is the Ravnica Allegiance signature mechanic associated with Orzhov.
- `orzhov_syndicate_claim_007`: Orzhov placement signals should require obligation, deal-making, debt, hierarchy, institutional leverage, or cartel/religious-business context rather than generic white-black control, lifegain, drain, sacrifice, taxes, stax, removal, aristocrats, recursion, or death-matters mechanics alone.
- `orzhov_syndicate_claim_0018`: Orzhov motivation is source-bounded as making religion, deals, debt, business, and cartel hierarchy function as durable leverage and collectible obligation.
- `orzhov_syndicate_claim_0020`: Generic white-black control, midrange, attrition, taxes, stax, removal, lifegain, drain, aristocrats, sacrifice, tokens, recursion, extort, or death-trigger gameplay is not Orzhov proof unless source-bounded Orzhov religion, deals, debt, business, hierarchy, or cartel context leads.

### Canonical card evidence

- **Teysa Karlov**: If a creature dying causes a triggered ability of a permanent you control to trigger, that ability triggers an additional time. Creature tokens you control have vigilance and li...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=644eeefd-e684-4ca8-8aef-a892ca130c07`
- **Teysa, Orzhov Scion**: Sacrifice three white creatures: Exile target creature. Whenever another black creature you control dies, create a 1/1 white Spirit creature token with flying.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=8191342b-b25e-4c4d-8f69-aee662148ff4`
- **Karlov of the Ghost Council**: Whenever you gain life, put two +1/+1 counters on Karlov. {W}{B}, Remove six +1/+1 counters from Karlov: Exile target creature.
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=647d7988-9a5d-4700-9238-938d0d5fae12`
- **Obzedat, Ghost Council**: When Obzedat enters, target opponent loses 2 life and you gain 2 life. At the beginning of your end step, you may exile Obzedat. If you do, return it to the battlefield under it...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=6c3df703-e96a-4ee4-b449-b8e1e3460bd3`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Athreos, God of Passage** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/orzhov_syndicate/orzhov_syndicate.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Elas il-Kor, Sadistic Pilgrim** — `REJECTED`: Rejected in its current form: Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor. Source: `data/raw-factions/orzhov_syndicate/orzhov_syndicate.profile.json#/commander_compass/budget_friendly_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Afterlife Insurance | “As far as the Orzhov Syndicate is concerned, it is the height of irresponsibility not to have a plan for your own ghost.” | `EXPLICIT_IDENTITY_REFERENCE` | `orzhov_syndicate_claim_001`<br>`orzhov_syndicate_claim_002`<br>`orzhov_syndicate_claim_007`<br>`orzhov_syndicate_claim_0018` | Afterlife Insurance's exact excerpt provides a bounded voice echo of the Orzhov named directly through a businesslike obligation extending beyond death. The excerpt is admissible for owner review only because its language corresponds to certified claims orzhov_syndicate_claim_001, orzhov_syndicate_claim_002, orzhov_syndicate_claim_007, orzhov_syndicate_claim_0018; the relationship does not arise from card color, product membership, tags, or mechanics. | White/Black, Golgari, and Witherbloom also use death; the insurance/debt/business frame makes the Orzhov relationship specific. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=05501e88-d4c3-4474-92a9-c02ab15b107b` | **APPROVE / REVISE / REJECT** (`packet1_voice_wb_05501e88_d4c3_4474_92a9_c02ab15b107b_1`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_wb_05501e88_d4c3_4474_92a9_c02ab15b107b_1`: **APPROVE / REVISE / REJECT**
## Prismari College (`PRISMARI`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Rootha, Mastering the Moment** (`packet1_rationale_prismari_348c67ef_9ccc_4651_9038_efdf1ad1b36a`, Oracle ID `348c67ef-9ccc-4651-9038-efdf1ad1b36a`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `prismari_claim_002`, `prismari_claim_003`, `prismari_claim_006`, `prismari_claim_0017`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `prismari_claim_002`: The 2021 guide says Prismari mages see no difference between magic and art.
- `prismari_claim_003`: The 2021 guide describes Prismari spells as spectacles of raw creativity using elemental forces such as fire, ice, water, wind, stone, lightning, heat, cold, and more.
- `prismari_claim_006`: Prismari placement signals should weight expression, dramatic transformation, technique under emotion, and the need to make an answer felt.
- `prismari_claim_0017`: The official Secrets of Strixhaven Commander Decklists page verifies Prismari Artistry as a Blue-Red Commander deck with Rootha, Mastering the Moment as face commander and Muddle, the Ever-Changing as featured commander.
- Relationship lead: `data/raw-factions/prismari/prismari.claims.json#prismari_claim_003`

### Canonical card evidence

- At the beginning of combat on your turn, if you've cast an instant or sorcery spell this turn, create an X/X blue and red Elemental creature token with flying and haste, where X...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=348c67ef-9ccc-4651-9038-efdf1ad1b36a`

### Proposed public rationale

- Rootha turns an instant or sorcery into a visible elemental performance by creating a flying, hasty Elemental whose size follows that spell's mana value.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Muddle, the Ever-Changing** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/prismari/prismari.profile.json#/commander_compass/native_fit_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Rootha, Mastering the Moment | “"The great thrill of perfection is that we'll always be chasing it."” | `NATIVE_FIGURE_OR_LOCATION` | `prismari_claim_002`<br>`prismari_claim_004`<br>`prismari_claim_006`<br>`prismari_claim_0025` | Rootha, Mastering the Moment's exact excerpt provides a bounded voice echo of a certified Prismari figure voicing perfection as an endless artistic pursuit. The excerpt is admissible for owner review only because its language corresponds to certified claims prismari_claim_002, prismari_claim_004, prismari_claim_006, prismari_claim_0025; the relationship does not arise from card color, product membership, tags, or mechanics. | Izzet, Quandrix, and Blue also pursue improvement; Prismari's technique-in-service-of-expression is the required distinction. | `data/scryfall/indexes/commander-index.json#oracle_id=348c67ef-9ccc-4651-9038-efdf1ad1b36a` | **APPROVE / REVISE / REJECT** (`packet1_voice_prismari_348c67ef_9ccc_4651_9038_efdf1ad1b36a_2`) |

### Owner decision

- rationale `packet1_rationale_prismari_348c67ef_9ccc_4651_9038_efdf1ad1b36a`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_prismari_348c67ef_9ccc_4651_9038_efdf1ad1b36a_2`: **APPROVE / REVISE / REJECT**
## Quandrix College (`QUANDRIX`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Zimone, Infinite Analyst** (`packet1_rationale_quandrix_977f9390_e01d_4e9d_8e9c_e543b1266972`, Oracle ID `977f9390-e01d-4e9d-8e9c-e543b1266972`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `quandrix_claim_002`, `quandrix_claim_006`, `quandrix_claim_0017`, `quandrix_claim_0019`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `quandrix_claim_002`: The 2021 Strixhaven guide describes Quandrix mages as mathematician-mages who study patterns, fractals, and symmetries to command power over fundamental forces.
- `quandrix_claim_006`: Quandrix placement signals should weight pattern recognition, abstraction, proof, precision, systemic curiosity, and delight in difficult problems.
- `quandrix_claim_0017`: The official Secrets of Strixhaven Commander Decklists page verifies Quandrix Unlimited as a Green-Blue Commander deck with Zimone, Infinite Analyst as face commander and Primo, the Unbounded as featured commander.
- `quandrix_claim_0019`: Quandrix turns mathematical structure into magical action: its mages study patterns, summon fractal creatures, and make abstract theories visible through spiraling or expanding forms.
- Relationship lead: `data/raw-factions/quandrix/quandrix.claims.json#quandrix_claim_0019`

### Canonical card evidence

- The first spell you cast with {X} in its mana cost each turn costs {1} less to cast for each +1/+1 counter on Zimone. Whenever you cast your first spell with {X} in its mana cos...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=977f9390-e01d-4e9d-8e9c-e543b1266972`

### Proposed public rationale

- Zimone makes mathematical scaling visible: +1/+1 counters reduce an X spell's cost, and casting that spell adds more counters and creates a flying Fractal token.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Primo, the Unbounded** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/quandrix/quandrix.profile.json#/commander_compass/native_fit_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Additive Evolution | “"Numbers have no limits. Why should nature?" —Emil, Quandrix fourth-year” | `EXPLICIT_IDENTITY_REFERENCE` | `quandrix_claim_002`<br>`quandrix_claim_006`<br>`quandrix_claim_0019`<br>`quandrix_claim_0020` | Additive Evolution's exact excerpt provides a bounded voice echo of a Quandrix student explicitly joining unbounded numbers to living nature. The excerpt is admissible for owner review only because its language corresponds to certified claims quandrix_claim_002, quandrix_claim_006, quandrix_claim_0019, quandrix_claim_0020; the relationship does not arise from card color, product membership, tags, or mechanics. | Simic and Green also scale living systems; the explicit mathematical/natural synthesis makes this Quandrix rather than generic growth. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=ce1a6c1f-6b4e-4d19-b256-48d073b359b7` | **APPROVE / REVISE / REJECT** (`packet1_voice_quandrix_ce1a6c1f_6b4e_4d19_b256_48d073b359b7_3`) |

### Owner decision

- rationale `packet1_rationale_quandrix_977f9390_e01d_4e9d_8e9c_e543b1266972`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_quandrix_ce1a6c1f_6b4e_4d19_b256_48d073b359b7_3`: **APPROVE / REVISE / REJECT**
## Red (`R`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Torbran, Thane of Red Fell** (`packet1_rationale_r_8c3495bf_02e7_4ad9_949d_92eb3d2b662a`, Oracle ID `8c3495bf-02e7-4ad9-949d-92eb3d2b662a`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `red_claim_0003`, `red_claim_0007`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `red_claim_0003`: Red's means are action, speed, emotional honesty, destruction when barriers must be broken, and a willingness to learn through doing.
- `red_claim_0007`: Red's mechanical texture includes direct damage, artifact destruction, haste, first strike, extra attacks, forced attacks, temporary mana, impulsive draw, rummaging, Treasure, copying spells, and temporary theft.
- Relationship lead: `data/raw-factions/red/red.claims.json#red_claim_0007`

### Canonical card evidence

- If a red source you control would deal damage to an opponent or a permanent an opponent controls, it deals that much damage plus 2 instead.
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=8c3495bf-02e7-4ad9-949d-92eb3d2b662a`

### Proposed public rationale

- Torbran gives Red's direct-action pressure a clear example by increasing damage from red sources to opponents and their permanents.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Krenko, Mob Boss** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/red/red.profile.json#/commander_compass/native_fit_commanders/1`
- **Magda, Brazen Outlaw** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/red/red.profile.json#/commander_compass/native_fit_commanders/2`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Torbran, Thane of Red Fell | “A dwarf's grudge runs deeper than the mountains' roots.” | `CERTIFIED_SEMANTIC_ECHO` | `red_claim_0002`<br>`red_claim_0004`<br>`red_claim_0006` | Torbran, Thane of Red Fell's exact excerpt provides a bounded voice echo of emotion held as a deep, active grudge rather than suppressed. The excerpt is admissible for owner review only because its language corresponds to certified claims red_claim_0002, red_claim_0004, red_claim_0006; the relationship does not arise from card color, product membership, tags, or mechanics. | Black, Rakdos, Gruul, and Jund also express anger or grievance. This is a bounded mono-Red emotional-intensity echo, not identity proof from the card's color. | `data/scryfall/indexes/commander-index.json#oracle_id=8c3495bf-02e7-4ad9-949d-92eb3d2b662a` | **APPROVE / REVISE / REJECT** (`packet1_voice_r_8c3495bf_02e7_4ad9_949d_92eb3d2b662a_1`) |

### Owner decision

- rationale `packet1_rationale_r_8c3495bf_02e7_4ad9_949d_92eb3d2b662a`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_r_8c3495bf_02e7_4ad9_949d_92eb3d2b662a_1`: **APPROVE / REVISE / REJECT**
## Selesnya Conclave (`WG`)

### Existing approved rationale(s)

- **Trostani, Selesnya's Voice** (`cardrel_wg_e94ef397`): Trostani appears because the certified Selesnya record identifies the three dryads as Mat'Selesnya's speaker for Life, Order, and Harmony.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `selesnya_conclave_claim_005`: The guide presents Trostani as Mat'Selesnya's speaker through three dryads representing Life, Order, and Harmony.
- `selesnya_conclave_claim_006`: Convoke is the Guilds of Ravnica signature mechanic associated with Selesnya.
- `selesnya_conclave_claim_007`: Selesnya placement signals should require source-bounded belonging, caretaking, consensus, harmony, communal voice, or greater-good service rather than generic white-green creatures, tokens, ramp, counters, lifegain, populate, or go-wide gameplay alone.
- `selesnya_conclave_claim_0018`: Selesnya motivation is source-bounded as belonging to a greater living community where individual voice joins communal harmony, care, and shared purpose.
- `selesnya_conclave_claim_0020`: Generic white-green creatures, tokens, counters, ramp, lifegain, board development, populate, go-wide gameplay, nature aesthetics, or perfect-harmony/brainwashing/cult caricature is not Selesnya proof unless source-bounded Selesnya collectivism, nature, unity, communal voice, preservation, Trostani/Mat'Selesnya context, or Convoke texture leads.

### Canonical card evidence

- **Trostani, Selesnya's Voice**: Whenever another creature you control enters, you gain life equal to that creature's toughness. {1}{G}{W}, {T}: Populate. (Create a token that's a copy of a creature token you c...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=e94ef397-f5c5-4b8d-ae27-528352fa1d1e`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Emmara, Soul of the Accord** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/selesnya_conclave/selesnya_conclave.profile.json#/commander_compass/native_fit_commanders/1`
- **Sythis, Harvest's Hand** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/selesnya_conclave/selesnya_conclave.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Trelasarra, Moon Dancer** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/selesnya_conclave/selesnya_conclave.profile.json#/commander_compass/budget_friendly_commanders/0`
- **Rhys the Redeemed** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/selesnya_conclave/selesnya_conclave.profile.json#/commander_compass/advanced_complexity_commanders/0`
- **Trostani Discordant** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/selesnya_conclave/selesnya_conclave.profile.json#/commander_compass/iconic_lore_forward_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Camaraderie | “"Within the song of Mat'Selesnya, one becomes all." —Heruj, Selesnya hierophant” | `EXPLICIT_IDENTITY_REFERENCE` | `selesnya_conclave_claim_001`<br>`selesnya_conclave_claim_002`<br>`selesnya_conclave_claim_007` | Camaraderie's exact excerpt provides a bounded voice echo of Mat'Selesnya named directly through the individual becoming part of a communal voice. The excerpt is admissible for owner review only because its language corresponds to certified claims selesnya_conclave_claim_001, selesnya_conclave_claim_002, selesnya_conclave_claim_007; the relationship does not arise from card color, product membership, tags, or mechanics. | White, Green, Bant, and Ink also value community; the explicit Worldsoul/conclave unity frame is the Selesnya bridge. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=9aab386c-d48c-4611-b757-aa69b26cc1b1` | **APPROVE / REVISE / REJECT** (`packet1_voice_wg_9aab386c_d48c_4611_b757_aa69b26cc1b1_1`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_wg_9aab386c_d48c_4611_b757_aa69b26cc1b1_1`: **APPROVE / REVISE / REJECT**
## Silverquill College (`SILVERQUILL`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Breena, the Demagogue** (`packet1_rationale_silverquill_d11e627b_8a48_411d_a261_2c9a02a758ba`, Oracle ID `d11e627b-8a48-411d-a261-2c9a02a758ba`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `silverquill_claim_001`, `silverquill_claim_006`, `silverquill_claim_0019`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `silverquill_claim_001`: Silverquill is Strixhaven's white-black College of Eloquence.
- `silverquill_claim_006`: Silverquill placement signals should weight rhetorical precision, leadership presence, reputation, influence, and awareness that words change power relationships.
- `silverquill_claim_0019`: Silverquill positive placement evidence may treat language as action when an answer centers spoken, written, signed, or ink-and-light expression as the tool that changes a social situation.
- Relationship lead: `docs/research/VM-378-379-380_source-intake.md#silverquill`

### Canonical card evidence

- Flying Whenever a player attacks one of your opponents, if that opponent has more life than another of your opponents, that attacking player draws a card and you put two +1/+1 c...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=d11e627b-8a48-411d-a261-2c9a02a758ba`

### Proposed public rationale

- Breena makes social influence change combat: attacks against a leading opponent can reward the attacker with a card while making Breena larger.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Killian, Decisive Mentor** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/silverquill/silverquill.profile.json#/commander_compass/native_fit_commanders/0`
- **Scriv, the Obligator** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/silverquill/silverquill.profile.json#/commander_compass/native_fit_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Beaming Defiance | “"I've lived too long in my father's shadow. It's time to find my own light." —Killian, Silverquill mage-student” | `EXPLICIT_IDENTITY_REFERENCE` | `silverquill_claim_0019`<br>`silverquill_claim_0020`<br>`silverquill_claim_0021` | Beaming Defiance's exact excerpt provides a bounded voice echo of a Silverquill student using language of shadow, light, self-definition, and visible presence. The excerpt is admissible for owner review only because its language corresponds to certified claims silverquill_claim_0019, silverquill_claim_0020, silverquill_claim_0021; the relationship does not arise from card color, product membership, tags, or mechanics. | Prismari and mono-White can also value expression or confidence; Silverquill requires word/social influence and power-awareness rather than art alone. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=f88eeb04-4b8e-4c76-a8c6-90887b94d518` | **APPROVE / REVISE / REJECT** (`packet1_voice_silverquill_f88eeb04_4b8e_4c76_a8c6_90887b94d518_1`) |

### Owner decision

- rationale `packet1_rationale_silverquill_d11e627b_8a48_411d_a261_2c9a02a758ba`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_silverquill_f88eeb04_4b8e_4c76_a8c6_90887b94d518_1`: **APPROVE / REVISE / REJECT**
## Simic Combine (`UG`)

### Existing approved rationale(s)

- **Prime Speaker Zegana** (`cardrel_ug_311e9368`): Prime Speaker Zegana appears because the certified Simic record identifies her as the former Prime Speaker associated with Utopian incremental change.

### New rationale proposal, if required

- None required; Packet 1 retains existing approved relationship authority without reopening it.

### Why this candidate was selected

- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.

### Certified identity evidence

- `simic_combine_claim_005`: The 2019 guide presents Prime Speaker Vannifar as current Prime Speaker after Zegana and contrasts Zegana's Utopian incrementalism with Vannifar's Adaptionist radical change.
- `simic_combine_claim_006`: Adapt is the Ravnica Allegiance signature mechanic associated with Simic.
- `simic_combine_claim_0018`: Simic motivation is source-bounded as improving living systems through study, medicine, adaptation, and iterative biological change while still starting from a connection to nature.

### Canonical card evidence

- **Prime Speaker Zegana**: Prime Speaker Zegana enters with X +1/+1 counters on it, where X is the greatest power among other creatures you control. When Prime Speaker Zegana enters, draw cards equal to i...
  - Locator: `data/scryfall/indexes/commander-index.json#oracle_id=311e9368-696a-47e7-aa2f-3ef1b1a92e2b`

### Proposed public rationale

- No new public rationale; see retained approved rationale(s) above.

### Limitation

- Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.

### Other candidates considered and terminal disposition

- **Zegana, Utopian Speaker** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/simic_combine/simic_combine.profile.json#/commander_compass/native_fit_commanders/1`
- **Tatyova, Benthic Druid** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/simic_combine/simic_combine.profile.json#/commander_compass/weird_stretch_commanders/0`
- **Vorel of the Hull Clade** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/simic_combine/simic_combine.profile.json#/commander_compass/budget_friendly_commanders/0`
- **Prime Speaker Vannifar** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/simic_combine/simic_combine.profile.json#/commander_compass/advanced_complexity_commanders/0`
- **Momir Vig, Simic Visionary** — `REJECTED`: Rejected in its current form: Existing wording contains reviewer/source-method language and is not eligible as player copy. Source: `data/raw-factions/simic_combine/simic_combine.profile.json#/commander_compass/iconic_lore_forward_commanders/0`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Coiling Oracle | “Snaking remnants of nature directed by a body of thought and progress, the oracles embody all that is Simic.” | `EXPLICIT_IDENTITY_REFERENCE` | `simic_combine_claim_001`<br>`simic_combine_claim_002`<br>`simic_combine_claim_007` | Coiling Oracle's exact excerpt provides a bounded voice echo of Simic named directly as nature directed by thought and progress. The excerpt is admissible for owner review only because its language corresponds to certified claims simic_combine_claim_001, simic_combine_claim_002, simic_combine_claim_007; the relationship does not arise from card color, product membership, tags, or mechanics. | Quandrix and generic Blue-Green also join nature and intellect; the explicit Simic biological-improvement context supplies the bridge. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=69fd4ddf-9ed8-4c56-bef3-9944daf05e4f` | **APPROVE / REVISE / REJECT** (`packet1_voice_ug_69fd4ddf_9ed8_4c56_bef3_9944daf05e4f_3`) |

### Owner decision

- rationale: **RETAINED APPROVED AUTHORITY — no new decision**
- voice `packet1_voice_ug_69fd4ddf_9ed8_4c56_bef3_9944daf05e4f_3`: **APPROVE / REVISE / REJECT**
## Sultai Brood (`SULTAI`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Kotis, Sibsig Champion** (`packet1_rationale_sultai_0177b410_b559_491f_b393_ac3ed774653c`, Oracle ID `0177b410-b559-491f-b393-ac3ed774653c`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `sultai_claim_0002`, `sultai_claim_0003`, `sultai_claim_0011`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `sultai_claim_0002`: Sultai's design identity emphasizes ruthlessness: willingness to take action and do what needs to be done to get what one wants.
- `sultai_claim_0003`: Sultai design tools include hand/library pressure, destruction, theft or redirection, paying additional costs, graveyard return, resource denial, and using the dead.
- `sultai_claim_0011`: The official Tarkir: Dragonstorm Commander Decklists page verifies Sultai Arisen as a Black; Green; Blue Commander deck with Kotis, Sibsig Champion as face commander and Teval, the Balanced Scale as featured commander.
- Relationship lead: `data/raw-factions/sultai/sultai.claims.json#sultai_claim_0003`

### Canonical card evidence

- Once during each of your turns, you may cast a creature spell from your graveyard by exiling three other cards from your graveyard in addition to paying its other costs. Wheneve...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=0177b410-b559-491f-b393-ac3ed774653c`

### Proposed public rationale

- Kotis turns the graveyard into a constrained resource: one creature can be cast from it each turn by exiling three other graveyard cards as an additional cost.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Teval, the Balanced Scale** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/sultai/sultai.profile.json#/commander_compass/native_fit_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Aggressive Negotiations | “"When an alliance outlasts its usefulness it's best to end it quickly." —Heng, Sultai ambassador” | `EXPLICIT_IDENTITY_REFERENCE` | `sultai_claim_0002`<br>`sultai_claim_0004`<br>`sultai_claim_0007` | Aggressive Negotiations's exact excerpt provides a bounded voice echo of a Sultai ambassador explicitly treating alliances as tools with an expiration point. The excerpt is admissible for owner review only because its language corresponds to certified claims sultai_claim_0002, sultai_claim_0004, sultai_claim_0007; the relationship does not arise from card color, product membership, tags, or mechanics. | Black, Dimir, Grixis, and Orzhov can all sound calculating; the explicit Sultai ruthlessness and instrumental alliance frame is required. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=c469133e-174d-476b-b135-bbf15e415e72` | **APPROVE / REVISE / REJECT** (`packet1_voice_sultai_c469133e_174d_476b_b135_bbf15e415e72_2`) |

### Owner decision

- rationale `packet1_rationale_sultai_0177b410_b559_491f_b393_ac3ed774653c`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_sultai_c469133e_174d_476b_b135_bbf15e415e72_2`: **APPROVE / REVISE / REJECT**
## Temur Frontier (`TEMUR`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Eshki, Temur's Roar** (`packet1_rationale_temur_1b162dd3_3be6_406d_bf86_f7cc9eff098d`, Oracle ID `1b162dd3-3be6-406d-bf86-f7cc9eff098d`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `temur_claim_0002`, `temur_claim_0003`, `temur_claim_0011`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `temur_claim_0002`: Temur's design identity emphasizes savagery as inner strength, mental fortitude, instinct, impulse, action, and toughness when pressure arrives.
- `temur_claim_0003`: Temur combines Green acceptance and physical natural strength, Blue knowledge and mental problem solving, and Red freedom, action, emotion, impulse, and direct conflict.
- `temur_claim_0011`: The official Tarkir: Dragonstorm Commander Decklists page verifies Temur Roar as a Green; Blue; Red Commander deck with Eshki, Temur's Roar as face commander and Ureni of the Unwritten as featured commander.
- Relationship lead: `data/raw-factions/temur/temur.claims.json#temur_claim_0002`

### Canonical card evidence

- Whenever you cast a creature spell, put a +1/+1 counter on Eshki. If that spell's power is 4 or greater, draw a card. If that spell's power is 6 or greater, Eshki deals damage e...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=1b162dd3-3be6-406d-bf86-f7cc9eff098d`

### Proposed public rationale

- Eshki rewards increasingly large creature spells with visible growth, then cards and damage as the creatures cross higher power thresholds.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Ureni of the Unwritten** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/temur/temur.profile.json#/commander_compass/native_fit_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Avalanche Tusker | “"Hold the high ground, then bring it to your enemy." —Surrak, khan of the Temur” | `EXPLICIT_IDENTITY_REFERENCE` | `temur_claim_0002`<br>`temur_claim_0003`<br>`temur_claim_0004` | Avalanche Tusker's exact excerpt provides a bounded voice echo of a Temur khan joining tactical knowledge to literal natural force. The excerpt is admissible for owner review only because its language corresponds to certified claims temur_claim_0002, temur_claim_0003, temur_claim_0004; the relationship does not arise from card color, product membership, tags, or mechanics. | Gruul and Green also use physical force; the explicit Temur synthesis of terrain, problem solving, and direct action is the bridge. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=ccad8b03-5ff1-4895-94e0-0c96883cb875` | **APPROVE / REVISE / REJECT** (`packet1_voice_temur_ccad8b03_5ff1_4895_94e0_0c96883cb875_1`) |

### Owner decision

- rationale `packet1_rationale_temur_1b162dd3_3be6_406d_bf86_f7cc9eff098d`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_temur_ccad8b03_5ff1_4895_94e0_0c96883cb875_1`: **APPROVE / REVISE / REJECT**
## White (`W`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Giada, Font of Hope** (`packet1_rationale_w_48e6d3d8_2f27_4017_acdd_40bce8cdbc02`, Oracle ID `48e6d3d8-2f27-4017-acdd-40bce8cdbc02`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `white_claim_0004`, `white_claim_0007`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `white_claim_0004`: White's thematic center includes community, honor, defense, cooperation, law, religion, government, military order, and charity; it treats selfishness and recklessness as chief threats.
- `white_claim_0007`: White's mechanical texture includes rules-setting, taxing, protection, lifegain, small-creature/team play, exile or conditional creature answers, enchantment ties, and slow once-per-turn card draw as a modern Commander-aware adjustment.
- Relationship lead: `data/raw-factions/white/white.claims.json#white_claim_0007`

### Canonical card evidence

- Flying, vigilance Each other Angel you control enters with an additional +1/+1 counter on it for each Angel you already control. {T}: Add {W}. Spend this mana only to cast an An...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=48e6d3d8-2f27-4017-acdd-40bce8cdbc02`

### Proposed public rationale

- Giada gives White's coordinated creature growth a direct example: she helps cast Angels, and each later Angel enters with counters for the Angels already assembled.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Adeline, Resplendent Cathar** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/white/white.profile.json#/commander_compass/native_fit_commanders/1`
- **Balan, Wandering Knight** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/white/white.profile.json#/commander_compass/native_fit_commanders/2`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Aligned Heart | “When hearts and minds align, so too do actions.” | `CERTIFIED_SEMANTIC_ECHO` | `white_claim_0002`<br>`white_claim_0004`<br>`white_claim_0006` | Aligned Heart's exact excerpt provides a bounded voice echo of hearts and minds coordinating into shared action. The excerpt is admissible for owner review only because its language corresponds to certified claims white_claim_0002, white_claim_0004, white_claim_0006; the relationship does not arise from card color, product membership, tags, or mechanics. | Selesnya, Boros, Azorius, and Ink also coordinate groups; this is a broad mono-White community-and-organization echo, not proof of any institution. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=ae61b2ef-2e60-499a-8708-e37b9bd5620e` | **APPROVE / REVISE / REJECT** (`packet1_voice_w_ae61b2ef_2e60_499a_8708_e37b9bd5620e_replacement`) |

### Owner decision

- rationale `packet1_rationale_w_48e6d3d8_2f27_4017_acdd_40bce8cdbc02`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_w_ae61b2ef_2e60_499a_8708_e37b9bd5620e_replacement`: **APPROVE / REVISE / REJECT**
## Witch / Growth (`WITCH`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Atraxa, Praetors' Voice** (`packet1_rationale_witch_7e6b9b59_cd68_4e3c_827b_38833c92d6eb`, Oracle ID `7e6b9b59-cd68-4e3c-827b-38833c92d6eb`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `witch_claim_0003`, `witch_claim_0005`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `witch_claim_0003`: The Witch / Growth GWUB four-color lane is framed by the color it excludes: Red.
- `witch_claim_0005`: The current Witch / Growth frame may discuss patient development, calculated expansion, systematic accumulation, proliferate/counter scaling, and bounded Atraxa / Breed Lethality Commander texture, but detailed metaphysical, Commander, strategic, comparative, popularity, or Phyrexia-collapse claims should remain bounded beyond the approved evidence floor.
- Relationship lead: `data/raw-factions/witch/witch.claims.json#witch_claim_0005`

### Canonical card evidence

- Flying, vigilance, deathtouch, lifelink At the beginning of your end step, proliferate. (Choose any number of permanents and/or players, then give each another counter of each k...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=7e6b9b59-cd68-4e3c-827b-38833c92d6eb`

### Proposed public rationale

- Atraxa gives Witch's systematic-accumulation frame a bounded example by proliferating at each of your end steps.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- None beyond the selected or retained card relationship(s).

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Animation Module | “Design leads to progress.” | `CERTIFIED_SEMANTIC_ECHO` | `witch_claim_0005` | Animation Module's exact excerpt provides a bounded voice echo of design producing progress through a modular object associated with counters and repeated accumulation. The excerpt is admissible for owner review only because its language corresponds to certified claims witch_claim_0005; the relationship does not arise from card color, product membership, tags, or mechanics. | Yore, Esper, Simic, and Blue can also connect design to progress. This echo is limited to Witch's systematic-accumulation branch and cannot establish the four-color identity alone. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=af42079b-a3c0-448c-9bb2-b915252e87a9` | **APPROVE / REVISE / REJECT** (`packet1_voice_witch_af42079b_a3c0_448c_9bb2_b915252e87a9_replacement`) |

### Owner decision

- rationale `packet1_rationale_witch_7e6b9b59_cd68_4e3c_827b_38833c92d6eb`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_witch_af42079b_a3c0_448c_9bb2_b915252e87a9_replacement`: **APPROVE / REVISE / REJECT**
## Witherbloom College (`WITHERBLOOM`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Dina, Essence Brewer** (`packet1_rationale_witherbloom_f61c1dc4_2f09_4b50_957f_ee656c659072`, Oracle ID `f61c1dc4-2f09-4b50-957f-ee656c659072`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `witherbloom_claim_0019`, `witherbloom_claim_0022`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `witherbloom_claim_0019`: Witherbloom identity is practical life/death craft: living essence, natural components, healing, harm, medicine, toxicology, mortuary practice, and other embodied studies matter when they show life and death as usable forces rather than abstract mood.
- `witherbloom_claim_0022`: Witherbloom mechanics-facing identity may use life gain, life loss, Pests, sacrifice, healing, harm, and death triggers when those mechanics express biological exchange, living essence, or practical life/death craft.
- Relationship lead: `data/raw-factions/witherbloom/witherbloom.claims.json#witherbloom_claim_0022`

### Canonical card evidence

- Whenever you sacrifice a creature, draw a card. This ability triggers only once each turn. {2}, {T}, Sacrifice another creature: You gain X life and put X +1/+1 counters on targ...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=f61c1dc4-2f09-4b50-957f-ee656c659072`

### Proposed public rationale

- Dina makes Witherbloom's practical life-and-death exchange visible by turning a sacrificed creature into a card, life, and +1/+1 counters.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- **Gorma, the Gullet** — `REJECTED`: Rejected in its current form: Candidate uses missing, string-only, or incomplete claim/source provenance. Source: `data/raw-factions/witherbloom/witherbloom.profile.json#/commander_compass/native_fit_commanders/1`

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Death Begets Life | “"You need not mourn. Their life essence has returned to the earth, where it will eventually bloom into a new form." —...” | `CERTIFIED_SEMANTIC_ECHO` | `witherbloom_claim_0019`<br>`witherbloom_claim_0020`<br>`witherbloom_claim_0023` | Death Begets Life's exact excerpt provides a bounded voice echo of life essence returning to the earth and blooming into another form. The excerpt is admissible for owner review only because its language corresponds to certified claims witherbloom_claim_0019, witherbloom_claim_0020, witherbloom_claim_0023; the relationship does not arise from card color, product membership, tags, or mechanics. | Golgari and Green also frame death as renewal. Witherbloom requires embodied life/death exchange and practical essence craft; the excerpt alone does not establish the college. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=53e86135-3b24-4618-bcc0-af4d81e672dd` | **APPROVE / REVISE / REJECT** (`packet1_voice_witherbloom_53e86135_3b24_4618_bcc0_af4d81e672dd_replacement`) |

### Owner decision

- rationale `packet1_rationale_witherbloom_f61c1dc4_2f09_4b50_957f_ee656c659072`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_witherbloom_53e86135_3b24_4618_bcc0_af4d81e672dd_replacement`: **APPROVE / REVISE / REJECT**
## Yore / Artifice (`YORE`)

### Existing approved rationale(s)

- None. This identity was one of the 25 former public rationale gaps.

### New rationale proposal, if required

- **Breya, Etherium Shaper** (`packet1_rationale_yore_d460a9e2_5a7d_4562_880e_45174be19a9d`, Oracle ID `d460a9e2-5a7d-4562-880e-45174be19a9d`)

### Why this candidate was selected

- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims `yore_claim_0003`, `yore_claim_0004`. Color, product membership, and mechanic overlap remain excluded as independent proof.

### Certified identity evidence

- `yore_claim_0003`: The Yore / Artifice WUBR four-color lane is framed by the color it excludes: Green.
- `yore_claim_0004`: The current Yore / Artifice frame centers civilization, technology, artifice, and progress over natural acceptance and organic limits.
- Relationship lead: `data/raw-factions/yore/yore.claims.json#yore_claim_0004`

### Canonical card evidence

- When Breya enters, create two 1/1 blue Thopter artifact creature tokens with flying. {2}, Sacrifice two artifacts: Choose one — • Breya deals 3 damage to target player or planes...
- Locator: `data/scryfall/indexes/commander-index.json#oracle_id=d460a9e2-5a7d-4562-880e-45174be19a9d`

### Proposed public rationale

- Breya makes Yore's artifice frame concrete by creating artifact creatures, then converting artifacts through several selectable effects.

### Limitation

- This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.

### Other candidates considered and terminal disposition

- None beyond the selected or retained card relationship(s).

### Source-complete voice proposal(s)

| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |
|---|---|---|---|---|---|---|---|
| Artificer's Epiphany | “The artificers of Kaladesh strive ceaselessly for perfection, progress, and the ultimate expression of elegance.” | `CERTIFIED_SEMANTIC_ECHO` | `yore_claim_0002`<br>`yore_claim_0004` | Artificer's Epiphany's exact excerpt provides a bounded voice echo of artificers pursuing perfection, progress, and designed elegance. The excerpt is admissible for owner review only because its language corresponds to certified claims yore_claim_0002, yore_claim_0004; the relationship does not arise from card color, product membership, tags, or mechanics. | Esper, Izzet, Blue, and Witch also use technology or progress. This proposal echoes Yore's bounded artifice frame but cannot make Yore behaviorally nameable or establish a faction. | `data/scryfall/indexes/card-flavor-index.json#oracle_id=ed10bb4c-f7ef-4046-8dde-465041b55078` | **APPROVE / REVISE / REJECT** (`packet1_voice_yore_ed10bb4c_f7ef_4046_8dde_465041b55078_replacement`) |

### Owner decision

- rationale `packet1_rationale_yore_d460a9e2_5a7d_4562_880e_45174be19a9d`: **APPROVE / REVISE / REJECT**
- voice `packet1_voice_yore_ed10bb4c_f7ef_4046_8dde_465041b55078_replacement`: **APPROVE / REVISE / REJECT**
