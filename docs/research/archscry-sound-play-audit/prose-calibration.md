# VM-562 — Archscry Sound/Play Prose Calibration

> Proposal-only owner-review artifact. Nothing here is `APPROVED_PUBLIC`, and no text in this file changes production.

VM-561 checkpoint: `0d073cd1a5917afecbcb722d57a117f87799ade6`

## Calibration summary

- Selected identities: 7.
- Eligible remediation rows inspected: 14.
- Tile changes proposed: 3.
- Modal changes proposed: 14.
- Eligible tile/modal fields deliberately unchanged: 11.
- `MODAL_CONTENT_MODEL_REVIEW` findings: 0.

## Stratified selection

| Family class | Identity | Why selected |
| --- | --- | --- |
| mono_color | Black (`B`) | Tests a redundant Sound bridge and a generic Play modal against a strong mono-color evidence floor without selecting White because it was encountered first. |
| ravnica_guild | Simic Combine (`UG`) | Combines Sound echo with the explicit Play-tile-does-not-explain-play defect and preserves the Simic-versus-Quandrix boundary. |
| strixhaven_college | Lorehold College (`LOREHOLD`) | Covers Sound redundancy, identity-local Play template reuse, and unsupported evaluative language while testing the college-versus-guild-twin boundary. |
| three_color_identity | Sultai Brood (`SULTAI`) | Carries the corpus's explicit player-facing research/process-language leak on an identity-specific three-color evidence route. |
| four_color_vox_mana | Ink / Altruism (`INK`) | Provides three unblocked synthesis-altitude rows and tests bounded four-color explanation without summing colors or treating the missing color as a personality proof. |
| wubrg | Five-Color / WUBRG (`WUBRG`) | Tests whether distinct traditions can remain present together without inventing a single universal Five-Color ideology. |
| colorless | Colorless (`COLORLESS`) | Tests whether Eldrazi and counter-engine examples remain branch-local instead of defining artifacts, Wastes, colorless mana, or Colorless as a whole. |

## Proposal rows

### 1. Black — Ancient Craving (SOUND)

- Identity key: `B`
- Identity family: `mono_color`
- Ledger ID: `SOUND-B-1-cardvoice_b_78725353_9274_420a_b722_add0f43c444e`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `echo_finding: HIGH_TILE_MODAL_TOKEN_ECHO`; `cross_card_repetition_finding: LEGITIMATE_SHARED_CONCEPT`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: FORMULAIC_BUT_READABLE`
- Exact printing/object ID: `f9b3ad9c-ef51-4ba6-a126-ec25d8f25b78`
- Oracle ID: `78725353-9274-420a-b722-add0f43c444e`
- Claim classification: `SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `B-F01`, `B-F02`

#### Current and proposed fields

Current tile text:


```text
Knowledge demands sacrifice.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
The line presents knowledge made available through an explicit sacrifice.
```

Proposed modal text:


```text
The bargain is the Black part: knowledge is worth having, and sacrifice is an acceptable price for access to it.
```

Hypothetical resulting tile:


```text
Knowledge demands sacrifice.
```

Hypothetical resulting modal:


```text
The bargain is the Black part: knowledge is worth having, and sacrifice is an acceptable price for access to it.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardvoice_b_78725353_9274_420a_b722_add0f43c444e`
- Raw claim IDs: `black_claim_0003`, `black_claim_0004`
- Source/evidence-ledger IDs: `MONO-B-2015`, `MONO-B-2025`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=f9b3ad9c-ef51-4ba6-a126-ec25d8f25b78`
- Verified flavor text: Knowledge demands sacrifice.
- B-F01: Black's means are opportunity-seizing, self-interest, calculated ruthlessness, and willingness to use tools other colors reject when the price is worth paying.
  - `MONO-B-2015` — `docs/research/mono_upgrade/12_black.md#B2015-Q2` — The 2015 article identifies Black's means as seeing opportunities, refusing outside restrictions and taboos, accepting costs, and putting itself first when pursuing success.
  - `MONO-B-2025` — `docs/research/mono_upgrade/12_black.md#B2025-b;B2025-c;B2025-d` — The 2025 Black voice defends self-interest, distinguishes selfishness from lack of care for loved ones, and bounds ruthlessness as calculated rather than reckless.
- B-F02: Black's thematic center includes death, fear, pain, decay, disease, corruption, manipulation, sacrifice, individualism, and resource conversion; it distrusts self-denial for others' sake.
  - `MONO-B-2015` — `docs/research/mono_upgrade/12_black.md#B2015-Q3;B2015-Q4` — The 2015 article bounds Black's thematic material to death, fear, pain, decay, disease, corruption, darkness, manipulation, sacrifice, and individualism, while naming self-denial for others' sake as a core pressure point.
  - `MONO-B-2025` — `docs/research/mono_upgrade/12_black.md#B2025-b;B2025-d` — The 2025 Black voice bounds selfishness and ruthlessness around opportunity, merit, and calculated action, preventing high-heat theme words from becoming generic cruelty proof.

Audit inference / proposed bridge: The exact flavor line supplies knowledge and sacrifice; B-F01 and B-F02 support Black's willingness to accept a real cost for a desired opportunity, distinct from secrecy or institutional debt.

Reason for change: Replace the modal's synonym-level restatement with the supported Black-specific judgment that sacrifice is an acceptable price for access to knowledge.

Old-copy tests failed: `ECHO`, `MODAL_VALUE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Exact card text is verified, but Public use is limited to this validated voice relationship. Blue and Dimir also value knowledge, while Orzhov values payment; this echo belongs here only because the line makes sacrifice the price of access rather than secrecy or institutional debt.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 2. Black — K'rrik, Son of Yawgmoth (PLAY)

- Identity key: `B`
- Identity family: `mono_color`
- Ledger ID: `PLAY-B-1-cardrel_auto_b_cbe3a4e7_5dbe_4f58_8ee6_a1762b65acfd`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `echo_finding: GENERIC_IDENTITY_LANGUAGE_WITHOUT_NEW_CARD_SPECIFIC_INSIGHT`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: SHARED_COMPOSER_FRAME`
- Exact printing/object ID: `4f087b1c-97e0-4379-a94d-beac53685314`
- Oracle ID: `cbe3a4e7-5dbe-4f58-8ee6-a1762b65acfd`
- Claim classification: `SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `B-F02`, `B-F03`

#### Current and proposed fields

Current tile text:


```text
K'rrik makes Black's resource-conversion pattern literal by letting life pay for black mana symbols and rewarding additional black spells with +1/+1 counters.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
At the table, K'rrik, Son of Yawgmoth carries that card action into this reading's larger plan: costs converted into options, lost pieces returned to use, and leverage preserved through difficult exchanges.
```

Proposed modal text:


```text
Each {B} in a cost becomes a choice between mana and two life. K'rrik asks how far you can spend your life total now and whether lifelink will earn enough of it back.
```

Hypothetical resulting tile:


```text
K'rrik makes Black's resource-conversion pattern literal by letting life pay for black mana symbols and rewarding additional black spells with +1/+1 counters.
```

Hypothetical resulting modal:


```text
Each {B} in a cost becomes a choice between mana and two life. K'rrik asks how far you can spend your life total now and whether lifelink will earn enough of it back.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardrel_auto_b_cbe3a4e7_5dbe_4f58_8ee6_a1762b65acfd`
- Raw claim IDs: `black_claim_0004`, `black_claim_0007`
- Source/evidence-ledger IDs: `MONO-B-2015`, `MONO-B-2025`, `MECH-CP-2021`, `MECH-CP-2021-CHG`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=4f087b1c-97e0-4379-a94d-beac53685314`
- Verified Oracle behavior: ({B/P} can be paid with either {B} or 2 life.)<br>Lifelink<br>For each {B} in a cost, you may pay 2 life rather than pay that mana.<br>Whenever you cast a black spell, put a +1/+1 counter on K'rrik.
- B-F02: Black's thematic center includes death, fear, pain, decay, disease, corruption, manipulation, sacrifice, individualism, and resource conversion; it distrusts self-denial for others' sake.
  - `MONO-B-2015` — `docs/research/mono_upgrade/12_black.md#B2015-Q3;B2015-Q4` — The 2015 article bounds Black's thematic material to death, fear, pain, decay, disease, corruption, darkness, manipulation, sacrifice, and individualism, while naming self-denial for others' sake as a core pressure point.
  - `MONO-B-2025` — `docs/research/mono_upgrade/12_black.md#B2025-b;B2025-d` — The 2025 Black voice bounds selfishness and ruthlessness around opportunity, merit, and calculated action, preventing high-heat theme words from becoming generic cruelty proof.
- B-F03: Black's mechanical texture includes unconditional creature destruction, discard, sacrifice, reanimation, graveyard use, life as a cost, drain, deathtouch, menace, and card draw paid for with resources.
  - `MECH-CP-2021` — `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md#MECH-removal;MECH-carddraw;MECH-discard-effect` — The mechanical color pie digest bounds Black's mechanical texture around primary creature removal, resource-paid card draw, discard, sacrifice, recursion, life payment, drain, deathtouch, menace, and related mechanical expressions.
  - `MECH-CP-2021-CHG` — `docs/research/mono_upgrade/21_mechanical_color_pie_2021_changes.md#CHG-cantblock;CHG-discard-cost` — The change digest narrows dated mechanic updates such as cannot-block movement and discard-as-cost boundaries without turning mechanics into Black's whole philosophy.

Audit inference / proposed bridge: K'rrik's verified life-for-black-mana option and lifelink turn B-F02/B-F03 resource conversion into repeated play decisions about spending and recovering life.

Reason for change: Replace the shared composer with the card's actual resource decision and its built-in route for recovering some of the life spent. The final wording tracks the Oracle phrase 'for each {B} in a cost' rather than generalizing to every black mana symbol.

Old-copy tests failed: `MODAL_VALUE`, `HUMAN_LANGUAGE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: A bounded card example validated against certified identity claims and canonical card text. It does not prove player motivation, placement, or identity from color, mechanic, tag, or product membership.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 3. Simic Combine — Coiling Oracle (SOUND)

- Identity key: `UG`
- Identity family: `ravnica_guild`
- Ledger ID: `SOUND-UG-1-cardvoice_ug_69fd4ddf_9ed8_4c56_bef3_9944daf05e4f`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `echo_finding: HIGH_TILE_MODAL_TOKEN_ECHO`; `cross_card_repetition_finding: LEGITIMATE_SHARED_CONCEPT`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: FORMULAIC_BUT_READABLE`
- Exact printing/object ID: `559ff1b1-018c-4e08-9531-8af20af47d05`
- Oracle ID: `69fd4ddf-9ed8-4c56-bef3-9944daf05e4f`
- Claim classification: `DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `UG-F01`, `UG-F02`, `UG-F03`

#### Current and proposed fields

Current tile text:


```text
Snaking remnants of nature directed by a body of thought and progress, the oracles embody all that is Simic.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
The line presents Simic as nature directed by thought and progress.
```

Proposed modal text:


```text
"Directed" is the key. The oracle is still a living thing, but the Simic treat nature as something they can study and deliberately improve.
```

Hypothetical resulting tile:


```text
Snaking remnants of nature directed by a body of thought and progress, the oracles embody all that is Simic.
```

Hypothetical resulting modal:


```text
"Directed" is the key. The oracle is still a living thing, but the Simic treat nature as something they can study and deliberately improve.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardvoice_ug_69fd4ddf_9ed8_4c56_bef3_9944daf05e4f`
- Raw claim IDs: `simic_combine_claim_001`, `simic_combine_claim_002`, `simic_combine_claim_007`
- Source/evidence-ledger IDs: `src_wotc_flavorful_guide_ravnica_allegiance_2019`, `src_wotc_ravnica_allegiance_mechanics_2018`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=559ff1b1-018c-4e08-9531-8af20af47d05`
- Verified flavor text: Snaking remnants of nature directed by a body of thought and progress, the oracles embody all that is Simic.
- UG-F01: Simic is the green-blue guild of Ravnica, associated with biological research, adaptation, medicine, and experimental improvement.
  - `src_wotc_flavorful_guide_ravnica_allegiance_2019` — `A Flavorful Guide to the Guilds of Ravnica Allegiance - Simic section, reviewed source lines 132-140` — The official Simic overview supports the green-blue Ravnican guild identity and ties Simic to biological research, adaptation, medicine, and improvement of nature.
- UG-F02: The guide frames Simic philosophy through the Holdfast and the Upwelling: rooted natural connection and constant improvement.
  - `src_wotc_flavorful_guide_ravnica_allegiance_2019` — `A Flavorful Guide to the Guilds of Ravnica Allegiance - Simic section, reviewed source lines 132-140` — The official Simic overview describes the Holdfast as connection to nature and the Upwelling as continual improvement and renewal.
- UG-F03: Simic placement signals should require living-system adaptation, biological improvement, public-health or clade research, or managed biological experimentation rather than generic UG value, ramp, card draw, counters, tempo, midrange, or mechanics alone.
  - `src_wotc_flavorful_guide_ravnica_allegiance_2019` — `A Flavorful Guide to the Guilds of Ravnica Allegiance - Simic section, reviewed source lines 132-140` — The official Simic overview supplies the biology, adaptation, medicine, clade research, and improvement cluster used for placement synthesis.
  - `src_wotc_ravnica_allegiance_mechanics_2018` — `Ravnica Allegiance Mechanics - Adapt / Simic section, reviewed source lines 120-128` — Adapt supports only bounded Simic mechanics texture; it does not make all counters, ramp, card draw, tempo, or UG value authoritative Simic proof by itself.

Audit inference / proposed bridge: The flavor line explicitly joins nature, direction, thought, and progress; UG-F01 through UG-F03 authorize the narrower Simic bridge to managed biological improvement rather than generic Blue-Green intellect.

Reason for change: Use one exact word from the line to explain managed biological improvement in natural player language, without narrating the underlying anti-drift comparison.

Old-copy tests failed: `ECHO`, `MODAL_VALUE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Exact card text is verified, but Public use is limited to this validated voice relationship. Quandrix and generic Blue-Green also join nature and intellect; the explicit Simic biological-improvement context supplies the bridge.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 4. Simic Combine — Prime Speaker Zegana (PLAY)

- Identity key: `UG`
- Identity family: `ravnica_guild`
- Ledger ID: `PLAY-UG-1-cardrel_ug_311e9368`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `bridge_finding: IDENTITY_ROLE_FACT_WITHOUT_PLAY_PATTERN`; `modal_value_finding: PLAY_SECTION_TILE_DOES_NOT_EXPLAIN_CARD_PLAY`; `human_language_finding: INTERNAL_OR_AUDIT_LANGUAGE`
- Exact printing/object ID: `d2f007b0-b578-44f8-be65-cd9e2ac56e09`
- Oracle ID: `311e9368-696a-47e7-aa2f-3ef1b1a92e2b`
- Claim classification: `DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `UG-F04`, `UG-F05`, `UG-F06`

#### Current and proposed fields

Current tile text:


```text
Prime Speaker Zegana appears because the certified Simic record identifies her as the former Prime Speaker associated with Utopian incremental change.
```

Proposed tile text:


```text
Zegana measures your strongest other creature, enters with that many +1/+1 counters, then draws cards equal to her resulting power.
```

Current modal text:


```text
At the table, Prime Speaker Zegana carries that card action into this reading's larger plan: incremental growth, biological scaling, and threats that outgrow old answers.
```

Proposed modal text:


```text
Casting Zegana too early leaves both halves small. Waiting until one of your other creatures has grown turns that earlier investment into a much larger Zegana and a deeper refill, so Simic improvement happens in stages rather than all at once.
```

Hypothetical resulting tile:


```text
Zegana measures your strongest other creature, enters with that many +1/+1 counters, then draws cards equal to her resulting power.
```

Hypothetical resulting modal:


```text
Casting Zegana too early leaves both halves small. Waiting until one of your other creatures has grown turns that earlier investment into a much larger Zegana and a deeper refill, so Simic improvement happens in stages rather than all at once.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardrel_ug_311e9368`
- Raw claim IDs: `simic_combine_claim_005`, `simic_combine_claim_006`, `simic_combine_claim_0018`
- Source/evidence-ledger IDs: `src_wotc_flavorful_guide_ravnica_allegiance_2019`, `src_wotc_ravnica_allegiance_mechanics_2018`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=d2f007b0-b578-44f8-be65-cd9e2ac56e09`
- Verified Oracle behavior: Prime Speaker Zegana enters with X +1/+1 counters on it, where X is the greatest power among other creatures you control.<br>When Prime Speaker Zegana enters, draw cards equal to its power.
- UG-F04: The 2019 guide presents Prime Speaker Vannifar as current Prime Speaker after Zegana and contrasts Zegana's Utopian incrementalism with Vannifar's Adaptionist radical change.
  - `src_wotc_flavorful_guide_ravnica_allegiance_2019` — `A Flavorful Guide to the Guilds of Ravnica Allegiance - Simic section, reviewed source lines 132-140` — The official Simic overview is used for Vannifar as current Prime Speaker after Zegana and for the bounded Utopian/Adaptionist leadership contrast.
- UG-F05: Adapt is the Ravnica Allegiance signature mechanic associated with Simic.
  - `src_wotc_ravnica_allegiance_mechanics_2018` — `Ravnica Allegiance Mechanics - Adapt / Simic section, reviewed source lines 120-128` — The official mechanics article is used only for Adapt as the Ravnica Allegiance Simic mechanic and for its +1/+1 counter execution.
- UG-F06: Simic motivation is source-bounded as improving living systems through study, medicine, adaptation, and iterative biological change while still starting from a connection to nature.
  - `src_wotc_flavorful_guide_ravnica_allegiance_2019` — `A Flavorful Guide to the Guilds of Ravnica Allegiance - Simic section, reviewed source lines 132-140` — The official Simic overview supplies connection to nature, medicine, public health, biological research, clades, and continual improvement as the placement-motivation cluster.
  - `src_wotc_ravnica_allegiance_mechanics_2018` — `Ravnica Allegiance Mechanics - Adapt / Simic section, reviewed source lines 120-128` — The official Adapt article supports improvement through bounded creature adaptation and is used only as mechanics texture for living-system change.

Audit inference / proposed bridge: Zegana's exact enters-with-counters and draw-equal-to-power rules make timing matter: an established large creature increases both her arrival size and the refill, turning prior biological growth into the next stage of Simic development.

Reason for change: Replace internal role evidence in the tile with the promised play sequence, then replace the surviving shared-composer modal because final QA evaluates the resulting pair rather than only newly proposed strings.

Old-copy tests failed: `BRIDGE`, `MODAL_VALUE`, `HUMAN_LANGUAGE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Skip if you want a low-curve commander or a deck that does not rely on having another large creature first.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 5. Lorehold College — Campus Renovation (SOUND)

- Identity key: `LOREHOLD`
- Identity family: `strixhaven_college`
- Ledger ID: `SOUND-LOREHOLD-1-cardvoice_lorehold_d34a3b58_a905_4e90_b35c_9f5c21149b04`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `echo_finding: HIGH_TILE_MODAL_TOKEN_ECHO`; `cross_card_repetition_finding: LEGITIMATE_SHARED_CONCEPT`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: FORMULAIC_BUT_READABLE`
- Exact printing/object ID: `6d925d13-fcd6-417b-b2b2-bbdd114aae78`
- Oracle ID: `d34a3b58-a905-4e90-b35c-9f5c21149b04`
- Claim classification: `DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `LOREHOLD-F01`, `LOREHOLD-F02`, `LOREHOLD-F03`

#### Current and proposed fields

Current tile text:


```text
Reconstructing the past is Lorehold's specialty.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
The line presents Lorehold through reconstructing and actively using the past.
```

Proposed modal text:


```text
"Reconstructing" makes Lorehold's relationship with history hands-on: the past is something to restore and put back into the present, not something left sealed in an archive.
```

Hypothetical resulting tile:


```text
Reconstructing the past is Lorehold's specialty.
```

Hypothetical resulting modal:


```text
"Reconstructing" makes Lorehold's relationship with history hands-on: the past is something to restore and put back into the present, not something left sealed in an archive.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardvoice_lorehold_d34a3b58_a905_4e90_b35c_9f5c21149b04`
- Raw claim IDs: `claim_lorehold_placement_0001`, `claim_lorehold_placement_0002`, `claim_lorehold_placement_0009`
- Source/evidence-ledger IDs: `src_lorehold_0002`, `src_lorehold_0008`, `src_lorehold_0009`, `src_lorehold_0010`, `src_lorehold_0014`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=6d925d13-fcd6-417b-b2b2-bbdd114aae78`
- Verified flavor text: Reconstructing the past is Lorehold's specialty.
- LOREHOLD-F01: Lorehold is a strong placement match for people who treat the past as an active tool for discovery, ethical learning, and present-day action.
  - `src_lorehold_0002` — `Planeswalker's Guide to Strixhaven` — Lorehold is a strong placement match for people who treat the past as an active tool for discovery, ethical learning, and present-day action.
  - `src_lorehold_0008` — `Planeswalker's Guide to Secrets of Strixhaven` — Lorehold is a strong placement match for people who treat the past as an active tool for discovery, ethical learning, and present-day action.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Lorehold is a strong placement match for people who treat the past as an active tool for discovery, ethical learning, and present-day action.
- LOREHOLD-F02: Lorehold placement should balance archival/preservation instincts with action-oriented fieldwork rather than scoring only bookishness.
  - `src_lorehold_0002` — `Planeswalker's Guide to Strixhaven` — Lorehold placement should balance archival/preservation instincts with action-oriented fieldwork rather than scoring only bookishness.
  - `src_lorehold_0008` — `Planeswalker's Guide to Secrets of Strixhaven` — Lorehold placement should balance archival/preservation instincts with action-oriented fieldwork rather than scoring only bookishness.
- LOREHOLD-F03: Lorehold placement is strengthened by answers that protect artifacts as belonging to history rather than treating them as unowned loot.
  - `src_lorehold_0010` — `Secrets of Strixhaven | Field Studies in a Future Tense` — Lorehold placement is strengthened by answers that protect artifacts as belonging to history rather than treating them as unowned loot.
  - `src_lorehold_0014` — `Field Studies in a Future Tense (MTG-Stories repository archive)` — Lorehold placement is strengthened by answers that protect artifacts as belonging to history rather than treating them as unowned loot.

Audit inference / proposed bridge: The exact word reconstructing supplies the card-side fact; LOREHOLD-F01 through F03 support restoring and actively using the past as the college-specific implication.

Reason for change: Replace a direct paraphrase with the supported distinction between Lorehold's active reconstruction and passive archival distance.

Old-copy tests failed: `ECHO`, `MODAL_VALUE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Exact card text is verified, but Public use is limited to this validated voice relationship. White, Red, and generic artifact recursion can preserve objects; the explicit Lorehold historical-reconstruction purpose is required.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 6. Lorehold College — Lorehold, the Historian (PLAY)

- Identity key: `LOREHOLD`
- Identity family: `strixhaven_college`
- Ledger ID: `PLAY-LOREHOLD-1-cardrel_lorehold_61a41cf1`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `echo_finding: IDENTITY_LOCAL_MODAL_REPETITION`; `cross_card_repetition_finding: GENERIC_TEMPLATE_REUSE`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: TEMPLATE_REPETITION`
- Exact printing/object ID: `71a6701f-40f1-43ef-bff5-a5907fd67cd6`
- Oracle ID: `61a41cf1-60cc-45ba-aa98-493c14e87d9d`
- Claim classification: `DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `LOREHOLD-F04`, `LOREHOLD-F05`, `LOREHOLD-F06`, `LOREHOLD-F07`, `LOREHOLD-F08`, `LOREHOLD-F09`

#### Current and proposed fields

Current tile text:


```text
Directly embodies the 'Eureka' moment of discovery by granting Miracle to all instants and sorceries in hand.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
At the table, Lorehold, the Historian carries that card action into this reading's larger plan: history fighting back and old resources becoming live pressure.
```

Proposed modal text:


```text
The play pattern is a series of discoveries: on each opponent's upkeep, you can trade away a card for a new first draw, and an instant or sorcery found that way can be cast for its {2} miracle cost.
```

Hypothetical resulting tile:


```text
Directly embodies the 'Eureka' moment of discovery by granting Miracle to all instants and sorceries in hand.
```

Hypothetical resulting modal:


```text
The play pattern is a series of discoveries: on each opponent's upkeep, you can trade away a card for a new first draw, and an instant or sorcery found that way can be cast for its {2} miracle cost.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardrel_lorehold_61a41cf1`
- Raw claim IDs: `claim_lorehold_figure_0001`, `claim_lorehold_figure_0002`, `claim_lorehold_figure_0003`, `claim_lorehold_figure_0004`, `claim_lorehold_mechanic_0011`, `claim_lorehold_mechanic_0012`
- Source/evidence-ledger IDs: `src_lorehold_0009`, `src_lorehold_0002`, `src_lorehold_0005`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=71a6701f-40f1-43ef-bff5-a5907fd67cd6`
- Verified Oracle behavior: Flying, haste<br>Each instant and sorcery card in your hand has miracle {2}. (You may cast a card for its miracle cost when you draw it if it's the first card you drew this turn.)<br>At the beginning of each opponent's upkeep, you may discard a card. If you do, draw a card.
- LOREHOLD-F04: Velomachus Lorehold is one of the five elder dragon founders of Strixhaven University.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Velomachus Lorehold is one of the five elder dragon founders of Strixhaven University.
  - `src_lorehold_0002` — `Planeswalker's Guide to Strixhaven` — Velomachus Lorehold is one of the five elder dragon founders of Strixhaven University.
- LOREHOLD-F05: Velomachus Lorehold is observant and standoffish, and considers it her responsibility to watch and document history without interference unless necessary.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Velomachus Lorehold is observant and standoffish, and considers it her responsibility to watch and document history without interference unless necessary.
- LOREHOLD-F06: Velomachus Lorehold expects people to learn from the past and work toward a better future.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Velomachus Lorehold expects people to learn from the past and work toward a better future.
- LOREHOLD-F07: Velomachus Lorehold has a fondness for collecting artifacts and trinkets.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Velomachus Lorehold has a fondness for collecting artifacts and trinkets.
- LOREHOLD-F08: Velomachus Lorehold is a red-white legendary Elder Dragon card with flying, vigilance, and haste.
  - `src_lorehold_0005` — `Strixhaven: School of Mages and Commander (2021 Edition) Release Notes` — Velomachus Lorehold is a red-white legendary Elder Dragon card with flying, vigilance, and haste.
- LOREHOLD-F09: Velomachus Lorehold's attack trigger can cast an instant or sorcery from the top seven cards of its controller's library if the spell's mana value is less than or equal to Velomachus's power.
  - `src_lorehold_0005` — `Strixhaven: School of Mages and Commander (2021 Edition) Release Notes` — Velomachus Lorehold's attack trigger can cast an instant or sorcery from the top seven cards of its controller's library if the spell's mana value is less than or equal to Velomachus's power.

Audit inference / proposed bridge: The upkeep rummage can create the first draw of that turn, while the card grants miracle {2} to instants and sorceries in hand; the sequence supplies a card-specific Lorehold discovery experience.

Reason for change: Replace the identity-local shared modal with the exact discard, first-draw, and miracle sequence that makes this card's discovery theme playable.

Old-copy tests failed: `MODAL_VALUE`, `SWAP`, `HUMAN_LANGUAGE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Requires specific top-deck manipulation (Scroll Rack, Sensei's Divining Top) to maximize Miracle. Your deck is primarily permanent-based (artifacts/creatures) rather than instants and sorceries.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 7. Lorehold College — Velomachus Lorehold (PLAY)

- Identity key: `LOREHOLD`
- Identity family: `strixhaven_college`
- Ledger ID: `PLAY-LOREHOLD-3-cardrel_lorehold_43832745`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `echo_finding: IDENTITY_LOCAL_MODAL_REPETITION`; `cross_card_repetition_finding: GENERIC_TEMPLATE_REUSE`; `modal_value_finding: MODAL_REDUNDANT`; `overclaim_finding: UNBOUNDED_EVALUATIVE_LANGUAGE`; `human_language_finding: TEMPLATE_REPETITION`
- Exact printing/object ID: `523d8fe6-1efd-4278-82fe-ea4517e6665c`
- Oracle ID: `43832745-5d7d-4957-8e30-2072ad012564`
- Claim classification: `DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `LOREHOLD-F04`, `LOREHOLD-F05`, `LOREHOLD-F06`, `LOREHOLD-F07`, `LOREHOLD-F08`, `LOREHOLD-F09`

#### Current and proposed fields

Current tile text:


```text
The founder of the college and the original face of Lorehold's spellslinger-aggro identity.
```

Proposed tile text:


```text
When Velomachus attacks, it looks seven cards deep and can cast an instant or sorcery with mana value no greater than its power without paying that spell's mana cost.
```

Current modal text:


```text
At the table, Velomachus Lorehold carries that card action into this reading's larger plan: history fighting back and old resources becoming live pressure.
```

Proposed modal text:


```text
Each attack searches seven cards deep for a spell Velomachus can put to work immediately. Its power sets the limit, so making the Dragon larger also expands what the next attack can uncover.
```

Hypothetical resulting tile:


```text
When Velomachus attacks, it looks seven cards deep and can cast an instant or sorcery with mana value no greater than its power without paying that spell's mana cost.
```

Hypothetical resulting modal:


```text
Each attack searches seven cards deep for a spell Velomachus can put to work immediately. Its power sets the limit, so making the Dragon larger also expands what the next attack can uncover.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardrel_lorehold_43832745`
- Raw claim IDs: `claim_lorehold_figure_0001`, `claim_lorehold_figure_0002`, `claim_lorehold_figure_0003`, `claim_lorehold_figure_0004`, `claim_lorehold_mechanic_0011`, `claim_lorehold_mechanic_0012`
- Source/evidence-ledger IDs: `src_lorehold_0009`, `src_lorehold_0002`, `src_lorehold_0005`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=523d8fe6-1efd-4278-82fe-ea4517e6665c`
- Verified Oracle behavior: Flying, vigilance, haste<br>Whenever Velomachus Lorehold attacks, look at the top seven cards of your library. You may cast an instant or sorcery spell with mana value less than or equal to Velomachus Lorehold's power from among them without paying its mana cost. Put the rest on the bottom of your library in a random order.
- LOREHOLD-F04: Velomachus Lorehold is one of the five elder dragon founders of Strixhaven University.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Velomachus Lorehold is one of the five elder dragon founders of Strixhaven University.
  - `src_lorehold_0002` — `Planeswalker's Guide to Strixhaven` — Velomachus Lorehold is one of the five elder dragon founders of Strixhaven University.
- LOREHOLD-F05: Velomachus Lorehold is observant and standoffish, and considers it her responsibility to watch and document history without interference unless necessary.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Velomachus Lorehold is observant and standoffish, and considers it her responsibility to watch and document history without interference unless necessary.
- LOREHOLD-F06: Velomachus Lorehold expects people to learn from the past and work toward a better future.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Velomachus Lorehold expects people to learn from the past and work toward a better future.
- LOREHOLD-F07: Velomachus Lorehold has a fondness for collecting artifacts and trinkets.
  - `src_lorehold_0009` — `The Legends of Secrets of Strixhaven` — Velomachus Lorehold has a fondness for collecting artifacts and trinkets.
- LOREHOLD-F08: Velomachus Lorehold is a red-white legendary Elder Dragon card with flying, vigilance, and haste.
  - `src_lorehold_0005` — `Strixhaven: School of Mages and Commander (2021 Edition) Release Notes` — Velomachus Lorehold is a red-white legendary Elder Dragon card with flying, vigilance, and haste.
- LOREHOLD-F09: Velomachus Lorehold's attack trigger can cast an instant or sorcery from the top seven cards of its controller's library if the spell's mana value is less than or equal to Velomachus's power.
  - `src_lorehold_0005` — `Strixhaven: School of Mages and Commander (2021 Edition) Release Notes` — Velomachus Lorehold's attack trigger can cast an instant or sorcery from the top seven cards of its controller's library if the spell's mana value is less than or equal to Velomachus's power.

Audit inference / proposed bridge: Velomachus's attack trigger searches seven cards, its power sets the eligible spell ceiling, and the chosen spell is cast immediately; those verified details make Lorehold's active discovery/use facet a repeated combat experience.

Reason for change: Keep the repaired tile, but replace deck-tech optimization detail with the card-specific attack, discovery, and immediate-use loop that teaches Lorehold through play.

Old-copy tests failed: `MODAL_VALUE`, `SWAP`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: You want a lower mana-value commander; 7 mana is a steep investment in Boros.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 8. Sultai Brood — Kotis, Sibsig Champion (PLAY)

- Identity key: `SULTAI`
- Identity family: `three_color_identity`
- Ledger ID: `PLAY-SULTAI-1-cardrel_auto_sultai_0177b410_b559_491f_b393_ac3ed774653c`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `echo_finding: GENERIC_IDENTITY_LANGUAGE_WITHOUT_NEW_CARD_SPECIFIC_INSIGHT`; `modal_value_finding: PLAYER_MODAL_LEAKS_SOURCE_NOTES`; `human_language_finding: INTERNAL_SOURCE_LANGUAGE`
- Exact printing/object ID: `b9ea2e9c-c1c7-4870-877a-023118909f56`
- Oracle ID: `0177b410-b559-491f-b393-ac3ed774653c`
- Claim classification: `SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `SULTAI-F01`, `SULTAI-F04`, `SULTAI-F05`

#### Current and proposed fields

Current tile text:


```text
Kotis turns the graveyard into a constrained resource: one creature can be cast from it each turn by exiling three other graveyard cards as an additional cost.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
At the table, Kotis, Sibsig Champion carries that card action into this reading's larger plan: convert graveyards, stolen options, and hidden costs into table advantage while keeping the table story anchored in Sultai source notes.
```

Proposed modal text:


```text
Each creature you cast back costs three other graveyard cards, and the return puts two +1/+1 counters on Kotis. The choice is which dead card is worth saving and which three you are willing to exile to use it.
```

Hypothetical resulting tile:


```text
Kotis turns the graveyard into a constrained resource: one creature can be cast from it each turn by exiling three other graveyard cards as an additional cost.
```

Hypothetical resulting modal:


```text
Each creature you cast back costs three other graveyard cards, and the return puts two +1/+1 counters on Kotis. The choice is which dead card is worth saving and which three you are willing to exile to use it.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardrel_auto_sultai_0177b410_b559_491f_b393_ac3ed774653c`
- Raw claim IDs: `sultai_claim_0002`, `sultai_claim_0003`, `sultai_claim_0011`
- Source/evidence-ledger IDs: `src_vm_sultai_evidence_ledger_20260531`, `src_wotc_rosewater_sultai_whatever_it_takes`, `src_wotc_tarkir_dragonstorm_commander_decklists_20250325`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=b9ea2e9c-c1c7-4870-877a-023118909f56`
- Verified Oracle behavior: Once during each of your turns, you may cast a creature spell from your graveyard by exiling three other cards from your graveyard in addition to paying its other costs.<br>Whenever one or more creatures you control enter, if one or more of them entered from a graveyard or was cast from a graveyard, put two +1/+1 counters on Kotis.
- SULTAI-F01: Sultai's design identity emphasizes ruthlessness: willingness to take action and do what needs to be done to get what one wants.
  - `src_vm_sultai_evidence_ledger_20260531` — `Sultai Evidence Ledger; rows SULTAI-EVID-002` — Supports the bounded Sultai statement for sultai_claim_0002 without expanding beyond its declared source rows.
  - `src_wotc_rosewater_sultai_whatever_it_takes` — `Sultai: Whatever It Takes; bounded local capture for sultai_claim_0002` — Supports the bounded Sultai statement for sultai_claim_0002 without expanding beyond its declared source rows.
- SULTAI-F04: Sultai design tools include hand/library pressure, destruction, theft or redirection, paying additional costs, graveyard return, resource denial, and using the dead.
  - `src_vm_sultai_evidence_ledger_20260531` — `Sultai Evidence Ledger; rows SULTAI-EVID-003` — Supports the bounded Sultai statement for sultai_claim_0003 without expanding beyond its declared source rows.
  - `src_wotc_rosewater_sultai_whatever_it_takes` — `Sultai: Whatever It Takes; bounded local capture for sultai_claim_0003` — Supports the bounded Sultai statement for sultai_claim_0003 without expanding beyond its declared source rows.
- SULTAI-F05: The official Tarkir: Dragonstorm Commander Decklists page verifies Sultai Arisen as a Black; Green; Blue Commander deck with Kotis, Sibsig Champion as face commander and Teval, the Balanced Scale as featured commander.
  - `src_wotc_tarkir_dragonstorm_commander_decklists_20250325` — `ANCHOR_NOT_RECORDED` — The official Tarkir: Dragonstorm Commander Decklists page verifies Sultai Arisen as a Black; Green; Blue Commander deck with Kotis, Sibsig Champion as face commander and Teval, the Balanced Scale as featured commander.

Audit inference / proposed bridge: Kotis's verified additional exile cost and counter reward turn SULTAI-F01/F04/F05 ruthlessness and graveyard use into a specific preserve-versus-spend decision.

Reason for change: Remove leaked research language and replace it with the exact graveyard trade the player repeatedly makes.

Old-copy tests failed: `MODAL_VALUE`, `HUMAN_LANGUAGE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: A bounded card example validated against certified identity claims and canonical card text. It does not prove player motivation, placement, or identity from color, mechanic, tag, or product membership.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 9. Ink / Altruism — Command Tower (SOUND)

- Identity key: `INK`
- Identity family: `four_color_vox_mana`
- Ledger ID: `SOUND-INK-1-cardvoice_ink_0895c9b7_ae7d_4bb3_af17_3b75deb50a25`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `authority_finding: LIMITED_TO_VOX_MANA_SYNTHESIS`; `echo_finding: HIGH_TILE_MODAL_TOKEN_ECHO`; `cross_card_repetition_finding: LEGITIMATE_SHARED_CONCEPT`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: FORMULAIC_BUT_READABLE`
- Exact printing/object ID: `c46a217c-0ed2-4b3c-9a01-ee38d12d76f3`
- Oracle ID: `0895c9b7-ae7d-4bb3-af17-3b75deb50a25`
- Claim classification: `VOX_MANA_INTERPRETATION`
- Relevant identity facet IDs: `INK-F01`

#### Current and proposed fields

Current tile text:


```text
Knowledge is wasted if not shared.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
The line presents knowledge treated as wasted unless it is shared.
```

Proposed modal text:


```text
The sting is in "wasted": knowledge that stays private has failed its purpose. Its value comes from reaching other people.
```

Hypothetical resulting tile:


```text
Knowledge is wasted if not shared.
```

Hypothetical resulting modal:


```text
The sting is in "wasted": knowledge that stays private has failed its purpose. Its value comes from reaching other people.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardvoice_ink_0895c9b7_ae7d_4bb3_af17_3b75deb50a25`
- Raw claim IDs: `ink_claim_0005`
- Source/evidence-ledger IDs: `src_vm_ink_evidence_ledger_20260604`, `src_vm_four_color_reference_audit_20260604`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=c46a217c-0ed2-4b3c-9a01-ee38d12d76f3`
- Verified flavor text: Knowledge is wasted if not shared.
- INK-F01: The current Ink / Altruism frame may discuss shared prosperity, community benefit, protected generosity, and open knowledge, but detailed metaphysical, Commander, strategic, comparative, or symbolic claims should remain bounded beyond the approved evidence floor.
  - `src_vm_ink_evidence_ledger_20260604` — `docs/research/ink/ink-evidence-ledger.md#INK-EVID-007` — The evidence ledger permits shared prosperity, community benefit, protected generosity, and open knowledge only as bounded Ink/Altruism framing.
  - `src_vm_four_color_reference_audit_20260604` — `docs/research/canon/canon-inventory-four-color-reference-audit.md#rgwu-altruism-ink` — The four-color audit describes the RGWU slot as Altruism/Ink while keeping stronger metaphysical, Commander, strategic, comparative, and symbolic claims outside the source floor.

Audit inference / proposed bridge: The exact flavor line calls unshared knowledge wasted; INK-F01 permits only the bounded Vox Mana interpretation of open knowledge and community benefit.

Reason for change: Keep the narrow open-knowledge implication while removing research-annotation language from the player-facing modal.

Old-copy tests failed: `ECHO`, `MODAL_VALUE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Exact card text is verified, but Public use is limited to this validated voice relationship. White, Blue, Selesnya, and Five-Color can all value sharing. This proposal is limited to Ink's certified open-knowledge and community-benefit frame and does not prove the four-color identity.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 10. Ink / Altruism — Danitha Capashen, Paragon (SOUND)

- Identity key: `INK`
- Identity family: `four_color_vox_mana`
- Ledger ID: `SOUND-INK-2-cardvoice_vm558_ink_4b6377da_83e7_4519_9582_16a9c16b8faa`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `authority_finding: LIMITED_TO_VOX_MANA_SYNTHESIS`; `echo_finding: HIGH_TILE_MODAL_TOKEN_ECHO`; `cross_card_repetition_finding: LEGITIMATE_SHARED_CONCEPT`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: NATURAL_ENOUGH_AS_WRITTEN`
- Exact printing/object ID: `a11f77e4-edb6-43c6-b8ca-d4f62d26d0c0`
- Oracle ID: `4b6377da-83e7-4519-9582-16a9c16b8faa`
- Claim classification: `VOX_MANA_INTERPRETATION`
- Relevant identity facet IDs: `INK-F01`

#### Current and proposed fields

Current tile text:


```text
"I will protect the less fortunate. I will love bravely. I will face despair and fight on. As a Capashen, I can do no less."
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
Danitha commits to protect the less fortunate, love bravely, and fight through despair, making altruism sound active rather than merely generous.
```

Proposed modal text:


```text
The final sentence changes the voice from aspiration to duty: Danitha believes her family name obliges her to protect others even when love and endurance cost her.
```

Hypothetical resulting tile:


```text
"I will protect the less fortunate. I will love bravely. I will face despair and fight on. As a Capashen, I can do no less."
```

Hypothetical resulting modal:


```text
The final sentence changes the voice from aspiration to duty: Danitha believes her family name obliges her to protect others even when love and endurance cost her.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardvoice_vm558_ink_4b6377da_83e7_4519_9582_16a9c16b8faa`
- Raw claim IDs: `ink_claim_0005`
- Source/evidence-ledger IDs: `src_vm_ink_evidence_ledger_20260604`, `src_vm_four_color_reference_audit_20260604`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=a11f77e4-edb6-43c6-b8ca-d4f62d26d0c0`
- Verified flavor text: "I will protect the less fortunate. I will love bravely. I will face despair and fight on. As a Capashen, I can do no less."
- INK-F01: The current Ink / Altruism frame may discuss shared prosperity, community benefit, protected generosity, and open knowledge, but detailed metaphysical, Commander, strategic, comparative, or symbolic claims should remain bounded beyond the approved evidence floor.
  - `src_vm_ink_evidence_ledger_20260604` — `docs/research/ink/ink-evidence-ledger.md#INK-EVID-007` — The evidence ledger permits shared prosperity, community benefit, protected generosity, and open knowledge only as bounded Ink/Altruism framing.
  - `src_vm_four_color_reference_audit_20260604` — `docs/research/canon/canon-inventory-four-color-reference-audit.md#rgwu-altruism-ink` — The four-color audit describes the RGWU slot as Altruism/Ink while keeping stronger metaphysical, Commander, strategic, comparative, and symbolic claims outside the source floor.

Audit inference / proposed bridge: The flavor line explicitly binds protection, brave love, and endurance to Danitha's Capashen identity; INK-F01 supports only the bounded community-benefit-through-duty reading.

Reason for change: Explain how the Capashen obligation deepens the line instead of repeating its list of commitments.

Old-copy tests failed: `ECHO`, `MODAL_VALUE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Owner-approved complementary card voice. Public use remains limited to this exact printing and bounded identity relationship; it does not prove placement, play style, or identity from card color, mechanics, tags, or product membership.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 11. Ink / Altruism — Kynaios and Tiro of Meletis (PLAY)

- Identity key: `INK`
- Identity family: `four_color_vox_mana`
- Ledger ID: `PLAY-INK-1-cardrel_auto_ink_53ee4254_fef7_49ec_aafc_0320987764e6`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `authority_finding: LIMITED_TO_VOX_MANA_SYNTHESIS`; `echo_finding: GENERIC_IDENTITY_LANGUAGE_WITHOUT_NEW_CARD_SPECIFIC_INSIGHT`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: SHARED_COMPOSER_FRAME`
- Exact printing/object ID: `97fa8615-2b6c-445a-bcaf-44a7e847bf65`
- Oracle ID: `53ee4254-fef7-49ec-aafc-0320987764e6`
- Claim classification: `VOX_MANA_INTERPRETATION`
- Relevant identity facet IDs: `INK-F02`, `INK-F01`

#### Current and proposed fields

Current tile text:


```text
Kynaios and Tiro make Ink's shared-resource frame visible: their end-step ability gives every player a chance to develop mana or draw, while their controller also draws.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
At the table, Kynaios and Tiro of Meletis carries that card action into this reading's larger plan: guard the commons, keep the gift moving, and make the table answer whether shared abundance can stay open without becoming private control.
```

Proposed modal text:


```text
Their end step shares the choice but not the reward evenly: every player may develop a land or draw, while you draw regardless. Playing them means opening resources to the table without giving up your own return.
```

Hypothetical resulting tile:


```text
Kynaios and Tiro make Ink's shared-resource frame visible: their end-step ability gives every player a chance to develop mana or draw, while their controller also draws.
```

Hypothetical resulting modal:


```text
Their end step shares the choice but not the reward evenly: every player may develop a land or draw, while you draw regardless. Playing them means opening resources to the table without giving up your own return.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardrel_auto_ink_53ee4254_fef7_49ec_aafc_0320987764e6`
- Raw claim IDs: `ink_claim_0003`, `ink_claim_0005`
- Source/evidence-ledger IDs: `src_vm_ink_evidence_ledger_20260604`, `src_vm_four_color_reference_audit_20260604`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=97fa8615-2b6c-445a-bcaf-44a7e847bf65`
- Verified Oracle behavior: At the beginning of your end step, draw a card. Each player may put a land card from their hand onto the battlefield, then each opponent who didn't draws a card.
- INK-F02: The Ink / Altruism RGWU four-color lane is framed by the color it excludes: Black.
  - `src_vm_ink_evidence_ledger_20260604` — `docs/research/ink/ink-evidence-ledger.md#INK-EVID-003` — The evidence ledger records that the Ink/RGWU lane is defined by excluding Black.
  - `src_vm_four_color_reference_audit_20260604` — `docs/research/canon/canon-inventory-four-color-reference-audit.md#rgwu-altruism-ink` — The four-color audit describes the RGWU Altruism/Ink slot as the four-color combination excluding Black.
- INK-F01: The current Ink / Altruism frame may discuss shared prosperity, community benefit, protected generosity, and open knowledge, but detailed metaphysical, Commander, strategic, comparative, or symbolic claims should remain bounded beyond the approved evidence floor.
  - `src_vm_ink_evidence_ledger_20260604` — `docs/research/ink/ink-evidence-ledger.md#INK-EVID-007` — The evidence ledger permits shared prosperity, community benefit, protected generosity, and open knowledge only as bounded Ink/Altruism framing.
  - `src_vm_four_color_reference_audit_20260604` — `docs/research/canon/canon-inventory-four-color-reference-audit.md#rgwu-altruism-ink` — The four-color audit describes the RGWU slot as Altruism/Ink while keeping stronger metaphysical, Commander, strategic, comparative, and symbolic claims outside the source floor.

Audit inference / proposed bridge: The controller always draws while every player may put in a land and each opponent who declines draws; INK-F01 supports a bounded shared-resource example without using the missing-color frame as personality proof.

Reason for change: Replace abstract commons language with the exact asymmetric table choice created by the end-step trigger.

Old-copy tests failed: `MODAL_VALUE`, `HUMAN_LANGUAGE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: A bounded card example validated against certified identity claims and canonical card text. It does not prove player motivation, placement, or identity from color, mechanic, tag, or product membership.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 12. Five-Color / WUBRG — Call the Spirit Dragons (SOUND)

- Identity key: `WUBRG`
- Identity family: `wubrg`
- Ledger ID: `SOUND-WUBRG-1-cardvoice_wubrg_3ceb23f5_abb1_4569_a1e4_1eed9a9babcf`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `authority_finding: SUPPORTED_WITH_LIMITATIONS`; `echo_finding: HIGH_TILE_MODAL_TOKEN_ECHO`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: NATURAL_ENOUGH_AS_WRITTEN`
- Exact printing/object ID: `b1ad91db-5f16-4392-baf1-f8400ec11e0a`
- Oracle ID: `3ceb23f5-abb1-4569-a1e4-1eed9a9babcf`
- Claim classification: `SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `WUBRG-F01`, `WUBRG-F02`, `WUBRG-F03`, `WUBRG-F04`

#### Current and proposed fields

Current tile text:


```text
The essence of Tarkir was shaped into draconic embodiments of the re-formed clans.
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
The line imagines Tarkir's re-formed clans as distinct draconic embodiments. It gives this reading a voice of distinct traditions present together without becoming interchangeable.
```

Proposed modal text:


```text
Each clan keeps its own shape even when all five are present. Their coexistence gives Five-Color breadth without asking every tradition to become the same thing.
```

Hypothetical resulting tile:


```text
The essence of Tarkir was shaped into draconic embodiments of the re-formed clans.
```

Hypothetical resulting modal:


```text
Each clan keeps its own shape even when all five are present. Their coexistence gives Five-Color breadth without asking every tradition to become the same thing.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardvoice_wubrg_3ceb23f5_abb1_4569_a1e4_1eed9a9babcf`
- Raw claim IDs: `wubrg_claim_0002`, `wubrg_claim_0003`, `wubrg_claim_0004`, `wubrg_claim_0007`
- Source/evidence-ledger IDs: `WUBRG-OFF-001`, `WUBRG-LOCAL-001`, `WUBRG-OFF-003`, `WUBRG-OFF-004`, `WUBRG-CANON-001`, `WUBRG-CANON-002`, `WUBRG-SCOPE-001`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=b1ad91db-5f16-4392-baf1-f8400ec11e0a`
- Verified flavor text: The essence of Tarkir was shaped into draconic embodiments of the re-formed clans.
- WUBRG-F01: In Commander, a WUBRG commander gives the deck access to White, Blue, Black, Red, and Green color identity at the deck-construction level.
  - `WUBRG-OFF-001` — `https://magic.wizards.com/en/formats/commander#color-identity-and-deck-construction` — The official Commander format page ties deck construction to the commander's color identity, including mana symbols in the commander.
  - `WUBRG-LOCAL-001` — `docs/research/wubrg/WUBRG Identity Research Prompt.md#claim-1-definition-of-color-identity` — The audited WUBRG packet applies the Commander color-identity rule to the all-five-color WUBRG deck-construction lane without making named-card legality claims.
- WUBRG-F02: WUBRG grants full deck-level color access, but individual cards and effects remain bounded by their own rules text, color identity, and color-pie context.
  - `WUBRG-OFF-003` — `https://magic.wizards.com/en/news/making-magic/mechanical-color-pie-2021#mechanical-color-pie-boundaries` — The official design article describes mechanical capabilities and restrictions as color-specific design boundaries.
  - `WUBRG-LOCAL-001` — `docs/research/wubrg/WUBRG Identity Research Prompt.md#claim-2-mechanical-access-vs-individual-limits` — The audited packet distinguishes deck-level access to every color from the rules text, identity, and color-pie bounds of individual cards.
- WUBRG-F03: Five-Color is the preferred public label, WUBRG is the technical/internal code, and Vox Mana must not present WUBRG as a single official faction, plane, civilization, guild, college, or doctrine.
  - `WUBRG-OFF-004` — `https://magic.wizards.com/en/news/announcements/commander-masters-commander-decklists#five-color-label` — The official Commander product article uses Five-Color and the White-Blue-Black-Red-Green expression as product/deck labeling.
  - `WUBRG-LOCAL-001` — `docs/research/wubrg/WUBRG Identity Research Prompt.md#claim-3-faction-vs-technical-key-through-naming-recommendation` — The audited packet treats WUBRG as technical shorthand, prefers Five-Color in public copy, and rejects presenting it as one official faction or doctrine.
  - `WUBRG-CANON-001` — `docs/research/canon/five-color-reference-audit.md#five-color-combination-1` — The repository audit inventories the full-spectrum WUBRG slot as a structural combination and records naming/interpretation limits.
- WUBRG-F04: WUBRG must remain distinct from Colorless, five-color Eldrazi-as-Colorless claims, four-color missing-color frames, generic goodstuff-only framing, superiority or total mastery claims, universal-superset claims, endpoint/completion claims, and default high-complexity-answer claims.
  - `WUBRG-CANON-002` — `docs/research/canon/misc/mtg_five_color_and_colorless_dossier.md#five-color-vs-colorless-through-how-five-color-differs-from-colorless` — The repository dossier separates all-five-color inclusion from Colorless non-coloration and warns against rank, mastery, or branch conflation.
  - `WUBRG-LOCAL-001` — `docs/research/wubrg/WUBRG Identity Research Prompt.md#strictly-disallowed-wubrg-claims` — The audited packet explicitly rejects official-faction, superiority, universal-doctrine, goodstuff-only, and unverified named-card claims.
  - `WUBRG-SCOPE-001` — `docs/reference/source-generated-guardrails.md#authoritative-source-scope` — The repository contract bars generated, support-only, and discovery material from becoming authoritative semantic proof.

Audit inference / proposed bridge: The exact printing names plural re-formed clans and distinct embodiments; WUBRG-F01 through F04 permit several color traditions together but prohibit inventing one official or superior Five-Color doctrine.

Reason for change: Express the supported positive Five-Color insight—distinct traditions present together—without reciting the universal-philosophy guardrail in player copy.

Old-copy tests failed: `ECHO`, `MODAL_VALUE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Public use is limited to this exact regular-printing flavor line and its bounded Five-Color relationship. It does not merge Tarkir's clans into one official faction or turn generic multicolor, Dragon, or unity themes into WUBRG evidence.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 13. Colorless — All Is Dust (SOUND)

- Identity key: `COLORLESS`
- Identity family: `colorless`
- Ledger ID: `SOUND-COLORLESS-1-cardvoice_colorless_14693689_d087_43b6_9c3f_63ab0648fc20`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `authority_finding: BOUNDED_COLORLESS_SYNTHESIS`; `bridge_finding: PARTIAL_ELDRAZI_TO_COLORLESS_GENERALIZATION`; `modal_value_finding: ADDITIVE_IDENTITY_INTERPRETATION`; `facet_collapse_finding: ELDRAZI_BRANCH_RISKS_STANDING_FOR_COLORLESS_WHOLE`; `overclaim_finding: OUTSIDE_WUBRG_WORDING_REQUIRES_ORTHOGONAL_NOT_OPPOSITE_BOUNDARY`; `human_language_finding: FORMULAIC_BUT_READABLE`
- Exact printing/object ID: `4210c54e-89fd-4971-ab6a-ca8f4e7fe97a`
- Oracle ID: `14693689-d087-43b6-9c3f-63ab0648fc20`
- Claim classification: `SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `COLORLESS-F01`, `COLORLESS-F02`, `COLORLESS-F03`

#### Current and proposed fields

Current tile text:


```text
"The emergence of the Eldrazi isn't necessarily a bad thing, as long as you've already lived a fulfilling and complete life without regrets."
—Javad Nasrin, Ondu relic hunter
```

Proposed tile text:
**UNCHANGED**

Current modal text:


```text
The line presents Eldrazi-scale emergence and an outside-WUBRG sense of completion and erasure.
```

Proposed modal text:


```text
Javad's joke is specifically Eldrazi: the threat is so enormous that the only comfort left is whether you had a good life before it arrived. That fatalistic scale gives the line its Colorless voice.
```

Hypothetical resulting tile:


```text
"The emergence of the Eldrazi isn't necessarily a bad thing, as long as you've already lived a fulfilling and complete life without regrets."
—Javad Nasrin, Ondu relic hunter
```

Hypothetical resulting modal:


```text
Javad's joke is specifically Eldrazi: the threat is so enormous that the only comfort left is whether you had a good life before it arrived. That fatalistic scale gives the line its Colorless voice.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardvoice_colorless_14693689_d087_43b6_9c3f_63ab0648fc20`
- Raw claim IDs: `colorless_claim_0004`, `colorless_claim_0005`, `colorless_claim_0006`
- Source/evidence-ledger IDs: `COLORLESS-SRC-008`, `COLORLESS-SRC-012`, `COLORLESS-CANON-001`, `COLORLESS-SRC-018`, `COLORLESS-SCOPE-005`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=4210c54e-89fd-4971-ab6a-ca8f4e7fe97a`
- Verified flavor text: "The emergence of the Eldrazi isn't necessarily a bad thing, as long as you've already lived a fulfilling and complete life without regrets."<br>—Javad Nasrin, Ondu relic hunter
- COLORLESS-F01: Colorless raw profile language may distinguish artifacts/function, Eldrazi/void, Wastes/desolation, and Devoid/design support as separate branches, but artifacts are not equivalent to Colorless identity, Eldrazi are not artifacts, Wastes are not all of Colorless, and Devoid design support should not be overgeneralized to all Colorless meaning.
  - `COLORLESS-SRC-008` — `docs/research/colorless/source-material/Colorless - Concept vs. Execution _ MAGIC_ THE GATHERING_markRosewater.md#devoid-and-eldrazi-execution` — The captured design article describes colorless and Devoid as deliberate Eldrazi execution choices rather than a universal definition of every colorless expression.
  - `COLORLESS-SRC-012` — `docs/research/colorless/source-material/colorless_magic_cleaned.md#the-dual-faces-of-colorlessness-through-transcendence-ugin-karn` — The cleaned compilation separates artifact/function, Eldrazi/void, Wastes, and Ugin/Karn texture into distinct colorless branches.
  - `COLORLESS-CANON-001` — `docs/research/canon/misc/mtg_five_color_and_colorless_dossier.md#artifacts-eldrazi-and-wastes-as-separate-colorless-branches` — The dossier explicitly distinguishes artifact, Eldrazi, and Wastes expressions and warns against treating any one branch as the whole identity.
- COLORLESS-F02: Commander, five-color Eldrazi, and Phyrexia material must remain bounded: Eldrazi Unbound is support-only Colorless Commander texture, Eldrazi Incursion is five-color comparator support, Phyrexia is distinction-only context, and none of these independently authorizes broad Commander viability, lore proof, placement eligibility, or raw claim expansion.
  - `COLORLESS-SRC-018` — `docs/research/colorless/source-material/colorless_mtg_notes_sourced_v2.md#modern-horizons-3-eldrazi-deck` — The sourced intake distinguishes a five-color Eldrazi deck and Ulalek from strict Colorless Commander identity and flags named-card conclusions for verification.
  - `COLORLESS-CANON-001` — `docs/research/canon/misc/mtg_five_color_and_colorless_dossier.md#five-color-vs-colorless-through-artifacts-eldrazi-and-wastes-as-separate-colorless-branches` — The dossier separates all-five-color inclusion from non-coloration and keeps Eldrazi, artifact, and related texture from becoming interchangeable proof.
  - `COLORLESS-SCOPE-005` — `docs/architecture/colors/colorless/product-decision-gate.md#vm-372-support-only-controlled-richness-addendum` — The product gate permits only support-bound Commander richness and explicitly withholds broad recommendation, legality, route, alias, and product expansion.
- COLORLESS-F03: Colorless can be used as controlled placement attraction for players drawn to a chosen restriction outside WUBRG: artifact-machine problem solving, Eldrazi scale, Wastes or terrain austerity, clean mana systems, resource denial, or engine-expression play. This is Vox Mana placement synthesis, not official MTG color philosophy.
  - `COLORLESS-SRC-018` — `docs/research/colorless/source-material/colorless_mtg_notes_sourced_v2.md#why-players-choose-colorless-through-strategy-mapping-why-the-player-selects-the-strategy` — The sourced intake describes attraction to restriction puzzles, artifact engines, Eldrazi spectacle, austere mana systems, and resource-denial or engine-expression play.
  - `COLORLESS-CANON-001` — `docs/research/canon/misc/mtg_five_color_and_colorless_dossier.md#how-these-identities-work-for-vox-mana-placement` — The dossier permits a bounded Vox Mana placement synthesis that distinguishes deliberate non-color restriction from branch-only or five-color readings.

Audit inference / proposed bridge: The flavor text verifies an Eldrazi-scale, mortality-facing joke; COLORLESS-F01 through F03 authorize only that branch-local interpretation and require artifacts, Wastes, {C} mana, and WUBRG to remain distinct.

Reason for change: Keep the verified Eldrazi-scale resignation while moving the wider branch taxonomy into the evidence note instead of the player-facing modal.

Old-copy tests failed: `BRIDGE`, `FACET_COLLAPSE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: Exact card text is verified, but Public use is limited to this validated voice relationship. Eldrazi flavor can also occur in Five-Color or Devoid decks. This is a bounded Eldrazi branch, not proof that every Eldrazi card or artifact belongs to Colorless.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

### 14. Colorless — Omarthis, Ghostfire Initiate (PLAY)

- Identity key: `COLORLESS`
- Identity family: `colorless`
- Ledger ID: `PLAY-COLORLESS-1-cardrel_auto_colorless_50676eba_a55a_4749_bb07_74a30e015781`
- VM-561 disposition: `REMEDIATION_LIKELY`
- VM-561 defect classifications: `authority_finding: SUPPORTED_WITH_LIMITATIONS`; `echo_finding: GENERIC_IDENTITY_LANGUAGE_WITHOUT_NEW_CARD_SPECIFIC_INSIGHT`; `modal_value_finding: MODAL_REDUNDANT`; `human_language_finding: SHARED_COMPOSER_FRAME`
- Exact printing/object ID: `985e16ac-8e0f-4e2e-9b74-d6a77dddf274`
- Oracle ID: `50676eba-a55a-4749-bb07-74a30e015781`
- Claim classification: `SUPPORTED_INTERPRETATION`
- Relevant identity facet IDs: `COLORLESS-F02`, `COLORLESS-F03`

#### Current and proposed fields

Current tile text:


```text
Omarthis is a bounded example of Colorless growth support: it grows when another colorless creature receives +1/+1 counters, then manifests cards equal to its counters when it dies.
```

Proposed tile text:


```text
Omarthis shows one way Colorless can support +1/+1 counter growth: it grows when another colorless creature receives counters, then manifests cards equal to its counters when it dies.
```

Current modal text:


```text
At the table, Omarthis, Ghostfire Initiate carries that card action into this reading's larger plan: infrastructure first, then one oversized threat, artifact engine, or inevitability piece at a time.
```

Proposed modal text:


```text
Choose X when you cast Omarthis, then let counter events on your other colorless creatures keep adding to it. Its size and its eventual manifest payout grow from the same accumulated counters, so one colorless counter system does both jobs.
```

Hypothetical resulting tile:


```text
Omarthis shows one way Colorless can support +1/+1 counter growth: it grows when another colorless creature receives counters, then manifests cards equal to its counters when it dies.
```

Hypothetical resulting modal:


```text
Choose X when you cast Omarthis, then let counter events on your other colorless creatures keep adding to it. Its size and its eventual manifest payout grow from the same accumulated counters, so one colorless counter system does both jobs.
```

#### Evidence contract

Routing authority:

- Relationship ID: `cardrel_auto_colorless_50676eba_a55a_4749_bb07_74a30e015781`
- Raw claim IDs: `colorless_claim_0005`, `colorless_claim_0006`
- Source/evidence-ledger IDs: `COLORLESS-SRC-018`, `COLORLESS-CANON-001`, `COLORLESS-SCOPE-005`

Underlying evidence:

- Card fact source: `data/scryfall/raw/oracle-cards.json#id=985e16ac-8e0f-4e2e-9b74-d6a77dddf274`
- Verified Oracle behavior: Omarthis enters with X +1/+1 counters on it.<br>Whenever you put one or more +1/+1 counters on another colorless creature, you may put a +1/+1 counter on Omarthis.<br>When Omarthis dies, manifest a number of cards from the top of your library equal to the number of counters on it.
- COLORLESS-F02: Commander, five-color Eldrazi, and Phyrexia material must remain bounded: Eldrazi Unbound is support-only Colorless Commander texture, Eldrazi Incursion is five-color comparator support, Phyrexia is distinction-only context, and none of these independently authorizes broad Commander viability, lore proof, placement eligibility, or raw claim expansion.
  - `COLORLESS-SRC-018` — `docs/research/colorless/source-material/colorless_mtg_notes_sourced_v2.md#modern-horizons-3-eldrazi-deck` — The sourced intake distinguishes a five-color Eldrazi deck and Ulalek from strict Colorless Commander identity and flags named-card conclusions for verification.
  - `COLORLESS-CANON-001` — `docs/research/canon/misc/mtg_five_color_and_colorless_dossier.md#five-color-vs-colorless-through-artifacts-eldrazi-and-wastes-as-separate-colorless-branches` — The dossier separates all-five-color inclusion from non-coloration and keeps Eldrazi, artifact, and related texture from becoming interchangeable proof.
  - `COLORLESS-SCOPE-005` — `docs/architecture/colors/colorless/product-decision-gate.md#vm-372-support-only-controlled-richness-addendum` — The product gate permits only support-bound Commander richness and explicitly withholds broad recommendation, legality, route, alias, and product expansion.
- COLORLESS-F03: Colorless can be used as controlled placement attraction for players drawn to a chosen restriction outside WUBRG: artifact-machine problem solving, Eldrazi scale, Wastes or terrain austerity, clean mana systems, resource denial, or engine-expression play. This is Vox Mana placement synthesis, not official MTG color philosophy.
  - `COLORLESS-SRC-018` — `docs/research/colorless/source-material/colorless_mtg_notes_sourced_v2.md#why-players-choose-colorless-through-strategy-mapping-why-the-player-selects-the-strategy` — The sourced intake describes attraction to restriction puzzles, artifact engines, Eldrazi spectacle, austere mana systems, and resource-denial or engine-expression play.
  - `COLORLESS-CANON-001` — `docs/research/canon/misc/mtg_five_color_and_colorless_dossier.md#how-these-identities-work-for-vox-mana-placement` — The dossier permits a bounded Vox Mana placement synthesis that distinguishes deliberate non-color restriction from branch-only or five-color readings.

Audit inference / proposed bridge: Omarthis enters with chosen counters, gains one when another colorless creature receives counters, and manifests according to its counters on death; COLORLESS-F02/F03 permit this counter-engine example without generalizing to all Colorless branches.

Reason for change: Remove the internal word 'bounded' from the otherwise accepted tile, and replace the generic modal infrastructure list with the exact counter sequence and death payoff.

Old-copy tests failed: `MODAL_VALUE`, `HUMAN_LANGUAGE`.

Proposed-copy tests passed: `ACCURACY`, `AUTHORITY`, `BRIDGE`, `ECHO`, `DELETION`, `SWAP`, `MODAL_VALUE`, `NEIGHBOR_ANTI_DRIFT`, `OVERCLAIM`, `HUMAN_LANGUAGE`.

Authority / limitation note: A bounded card example validated against certified identity claims and canonical card text. It does not prove player motivation, placement, or identity from color, mechanic, tag, or product membership.

Modal content-model review: No.

Owner decision: `PENDING_OWNER_REVIEW`.

## Resulting-row calibration QA

The corpus below is the complete hypothetical result for all 14 selected `REMEDIATION_LIKELY` rows: proposed text where present, otherwise the frozen current field. It contains 28 player-facing fields.

- Exact duplicate resulting sentences: 0.
- Near-duplicate resulting field pairs at Jaccard ≥ 0.72: 0.
- Repeated normalized 4-grams across resulting fields: 2.
- Repeated normalized 5-grams across resulting fields: 0.
- Repeated four-token sentence openings across resulting fields: 0.
- Repeated four-token sentence endings across resulting fields: 0.
- Repeated function-word grammatical-skeleton proxies across resulting fields: 0.
- High-overlap tile/modal pairs at Jaccard ≥ 0.55: 0.
- Shared-composer occurrences in resulting player copy: 0.
- Internal research/evidence terminology leaks in resulting player copy: 0.
- Card-specificity concerns in resulting modals: 0.
- Rhetorical-device counts: em dash 1; semicolon 0; colon 10; not/but-or-instead 0; rather-than 1.

Repeated 4-gram clusters:

- `an instant or sorcery` — Lorehold, the Historian modal (PLAY-LOREHOLD-1-cardrel_lorehold_61a41cf1); Velomachus Lorehold tile (PLAY-LOREHOLD-3-cardrel_lorehold_43832745)
- `three other graveyard cards` — Kotis, Sibsig Champion tile (PLAY-SULTAI-1-cardrel_auto_sultai_0177b410_b559_491f_b393_ac3ed774653c); Kotis, Sibsig Champion modal (PLAY-SULTAI-1-cardrel_auto_sultai_0177b410_b559_491f_b393_ac3ed774653c)

Repeated 5-gram clusters:

- None.

Repeated opening clusters:

- None.

Repeated ending clusters:

- None.

Repeated grammatical-skeleton proxy clusters:

- None.

Tile/modal semantic-overlap concerns:

- None.

Player-facing legacy/research-language leaks:

- None.

Card-specificity concerns:

- None.

Manual corpus assessments:

- Repeated grammatical skeletons: No new universal sentence scaffold is used. Sentence length and function vary with quotation analysis, card sequencing, resource choice, authority boundary, or branch distinction.
- Generic identity-name insertion: Identity names appear only where they carry a boundary or supported facet; removing the card-specific evidence from any proposal would break the explanation.
- Cross-card swapability: Each proposed field depends on its row's exact flavor line or Oracle sequence. No proposal can move to another calibration card while preserving most of its meaning.
- Same-facet cluster: Black rows overlap B-F02 but separate a Sound bargain about sacrifice from K'rrik's repeated life-payment decisions.
- Same-facet cluster: Lorehold Play rows share F04-F09 but distinguish upkeep rummage plus miracle from an attack-triggered top-seven cast.
- Same-facet cluster: Ink rows share F01 but test three different bounded axes: open knowledge, protection as duty, and an asymmetric shared-resource trigger.
- Same-facet cluster: Colorless rows overlap F02/F03 but keep an Eldrazi flavor branch separate from a colorless counter-engine play example.
- N-gram cluster review: Two repeated 4-grams remain and neither is a template: 'an instant or sorcery' is exact Magic rules vocabulary shared by two mechanically different Lorehold cards, while 'three other graveyard cards' repeats Kotis's exact additional cost so the modal can explain the preserve-versus-exile choice built on that cost. No repeated 5-gram remains.
- Rhetorical-device review: Colons appear in 10 of 28 resulting fields, but introduce materially different card-specific functions: bargain, reconstruction, discovery sequence, graveyard cost, quoted-word emphasis, duty, shared-resource choice, Eldrazi-scale joke, and counter growth. They do not form a repeated sentence skeleton. The sole em dash is part of the exact All Is Dust flavor attribution; no proposed explanatory sentence uses an em dash.
- Resulting-pair composer review: No selected resulting row retains the shared composer. Prime Speaker Zegana's modal is now replaced because final calibration QA evaluates the complete hypothetical tile-plus-modal pair, including fields previously left unchanged.

## Preservation result

- Exactly seven identities and all seven required family classes are represented.
- Every proposal maps to a VM-561 `REMEDIATION_LIKELY` row; every selected eligible row is represented.
- No `NO_CHANGE_INDICATED`, source-blocked, Vox-authority-blocked, insufficient-evidence, or owner-conflict row receives replacement prose.
- Current text, relationship IDs, raw claim IDs, source IDs, facet IDs, exact printing IDs, and Oracle IDs are read directly from the frozen VM-561 ledger.
- Final content QA evaluates each complete hypothetical resulting tile/modal pair, including every deliberately unchanged field.
- The diff allowlist excludes production copy, relationship sources, runtime, generated product data, placement/scoring/identity sources, the VM-559 workbook/state, and `docs/research/canon/`.
- Proposals remain `PENDING_OWNER_REVIEW`; no promotion or production application is present.
