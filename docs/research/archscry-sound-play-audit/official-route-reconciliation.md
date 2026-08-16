# VM-561 Unusable Official-Route Reconciliation

Status: evidence-only source-maintenance finding. This document does not modify the canon corpus, runtime behavior, workbook source data, Sound/Play prose, or approved relationships.

## Decision rule

An unavailable route does not automatically change a row disposition. The row changes to `SOURCE_INTAKE_REQUIRED` only when the unavailable source is necessary for the narrow identity claim or card-to-identity bridge. A second derived record that repeats the unavailable source is not corroboration. A broader inspected source is sufficient only when it actually entails the narrower fact used by the row.

## `Boros Legion` — unavailable (404)

Route: `https://magic.wizards.com/en/news/feature/boros-legion`

Source-maintenance finding: the current Wizards route returns a 404 page. The raw source record remains routing/provenance only and is not counted as inspected underlying evidence.

### Affected identity packet facets

| Facet | Claim | What the unavailable route was used to establish | Independent inspected evidence | Reconciliation |
| --- | --- | --- | --- | --- |
| `WR-F04` | `boros_legion_claim_012` | Battalion is Boros mechanics evidence for coordinated group attack and unit cohesion. | None for the narrow Battalion-to-Boros claim. The exact card records can verify Battalion rules, while the inspected 2018 Boros guide and Mentor mechanics page support Boros teamwork more broadly; neither independently establishes the routed Battalion claim. | Facet remains source-intake-limited. It is not necessary to either affected Sound row because each also has inspected `WR-F01`–`WR-F03` support and exact Boros-named card/flavor evidence. |
| `WR-F05` | `boros_legion_claim_009` | Leadership transitioned from Razia to Feather and later Aurelia. | The inspected 2018 Boros guide independently establishes Razia as founder, Razia's death, Aurelia as current guildmaster, and Aurelia's front-line leadership. It does not establish Feather. The reviewed-novel source record is another routing record here, not an inspected copy of the novel. | The Razia-to-Aurelia portion is independently supported; the Feather portion is not. Rows needing Feather specifically require source intake. |
| `WR-F06` | `boros_legion_claim_026` | Mature Boros expression joins disciplined public protection, team duty, and accountability. | The inspected 2018 Boros guide independently establishes military hierarchy, peacekeeping, law enforcement, protection of the guildless, and Aurelia fighting beside her troops. The inspected 2018 mechanics page independently establishes Mentor's stronger-creature/less-powerful-creature training pattern. | Fully supported without the dead route for the bounded teamwork/protection bridge. The dead citation is redundant, not necessary. |

### Affected rendered rows

| Ledger row | Card | Referenced facets | Independent-evidence test | Final consequence |
| --- | --- | --- | --- | --- |
| `SOUND-WR-1-cardvoice_wr_30b20932_0d9a_447f_b934_1daa8c44a678` | Boros Strike-Captain | `WR-F01`–`WR-F04` | `WR-F04` lacks independent narrow Battalion corroboration, but the exact Boros-named card and flavor line plus inspected `WR-F01`–`WR-F03` evidence fully support the comrades/front-line coordination bridge. The broader evidence is used only for that broader bridge, not to claim Battalion provenance. | Retain `NO_CHANGE_INDICATED`; source intake is non-blocking for this row. |
| `SOUND-WR-2-cardvoice_vm558_wr_cf5bf1ef_e40b_4fb5_8148_d4ca7a307501` | Boros Battleshaper | `WR-F01`–`WR-F04` | The card name, exact flavor line, and inspected `WR-F01`–`WR-F03` sources establish Boros leadership, organized action, and team duty. `WR-F04` is not needed to make that bridge. | Retain `NO_CHANGE_INDICATED`; source intake is non-blocking for this row. |
| `PLAY-WR-1-cardrel_wr_0f5a3a09` | Aurelia, the Warleader | `WR-F02`, `WR-F05`, `WR-F06` | The inspected 2018 Boros guide directly establishes Aurelia as guildmaster who fights beside her troops, and `WR-F06` has two inspected independent sources. The unsupported Feather link inside `WR-F05` is unnecessary to Aurelia's card-specific bridge. | Retain `REMEDIATION_LIKELY` for its existing overclaim/template findings; no source-intake block. |
| `PLAY-WR-3-cardrel_wr_ae6f21a2` | Tajic, Legion's Edge | `WR-F07`, `WR-F06` | `WR-F06` is independently supported by the inspected 2018 guide and mechanics page; the unavailable route is only one redundant lineage inside that facet. | Retain `REMEDIATION_LIKELY` for its existing modal-template finding; no source-intake block. |
| `PLAY-WR-4-cardrel_wr_aa219936` | Feather, the Redeemed | `WR-F05` only | The inspected guide establishes Razia and Aurelia but not Feather. The novel source record is not an inspected underlying novel, and no other inspected source establishes Feather's position in the Boros leadership lineage. Broader Boros evidence cannot entail that narrow Feather claim. | Change to `SOURCE_INTAKE_REQUIRED`. |

## `Planeswalker's Guide to Gatecrash: Part 2` — inadequate shell

Route: `https://magic.wizards.com/en/news/feature/planeswalkers-guide-to-gatecrash-part-2`

Source-maintenance finding: the current page exposes only a minimal navigation shell rather than usable article evidence. The raw source record remains routing/provenance only and is not counted as inspected underlying evidence.

### Affected identity packet facets

| Facet | Claim | What the unavailable route was used to establish | Independent inspected evidence | Reconciliation |
| --- | --- | --- | --- | --- |
| `RG-F03` | `claim_gruul_clans_placement_0001` | Gruul's anti-institutional, anti-civilization, clan-loose, resistance-oriented placement frame. | The inspected 2019 Ravnica Allegiance guide independently describes distinct clans united by the desire to obliterate civilization so nature can return, and the inspected mechanics page supplies separate Riot gameplay evidence. | Fully supported for the bounded anti-civilization/anarchy bridges used by the two Sound rows. |
| `RG-F04` | `claim_gruul_clans_key_figure_0012` | Borborygmos is a massive cyclops and Burning Tree leader. | The inspected 2019 guide independently identifies Borborygmos as a massive cyclops, Burning Tree leader, and former de-facto Gruul leader. | Fully supported for the Borborygmos membership/leadership bridge. |
| `RG-F05` | `claim_gruul_clans_key_figure_0013` | Borborygmos held the mightiest-leader position for decades. | The inspected 2019 guide establishes his rise and leadership but not the decades claim. | Narrow duration remains intake-limited, but no rendered bridge requires the duration claim. |
| `RG-F09` | `claim_gruul_clans_key_figure_0023` | Nikya is Zhur-Taa leader and a powerful shaman. | The inspected 2019 guide establishes Zhur-Taa shamans and their End-Raze belief but does not name Nikya. | Narrow Nikya office remains intake-limited. It is not required by the current tile's mechanics-to-anti-civilization bridge. |
| `RG-F10` | `claim_gruul_clans_structure_0021` | Zhur-Taa follows the old ways and trains beasts as companions and mounts. | The inspected 2019 guide establishes Zhur-Taa shamans and End-Raze belief, but not the beast-training claim. | Narrow beast-training claim remains intake-limited. It is not used as proof of the current card mechanics. |
| `RG-F11` | `claim_gruul_clans_philosophy_0022` | Zhur-Taa awaits Ilharg/Raze-Boar and the destruction of the over-civilized world. | The inspected 2019 guide independently identifies the Zhur-Taa End-Raze belief, Ilharg the Raze-Boar, urban destruction, and restoration of undisturbed nature. Nikya's exact card record separately supplies the noncreature-spell restriction and Raze-Boar flavor line. | Fully supports the bounded card-fact-to-Zhur-Taa anti-civilization bridge. |
| `RG-F12` | `claim_gruul_clans_key_figure_0016` | Ruric Thar is leader of the Ghor clan. | None. Inspected broader Gruul material does not identify Ruric Thar or establish his Ghor office. | Source intake required where this fact is necessary. |
| `RG-F13` | `claim_gruul_clans_structure_0017` | Ghor conducts the most frequent and savage assaults among stable Gruul clans. | None. Inspected broader Gruul material supports general anti-civilization and clan violence but does not entail this Ghor-specific comparison. | Source intake required where this fact is necessary. |

### Affected rendered rows

| Ledger row | Card | Referenced facets | Independent-evidence test | Final consequence |
| --- | --- | --- | --- | --- |
| `SOUND-RG-1-cardvoice_rg_327d9679_0049_4401_8dab_e0fb362306bd` | Burning-Tree Emissary | `RG-F01`–`RG-F03` | `RG-F03` is independently supported by the inspected 2019 guide, while the exact line itself names Gruul and supplies the card-side contrast. | Retain `NO_CHANGE_INDICATED`. |
| `SOUND-RG-2-cardvoice_vm558_rg_a4e5693f_12a0_451e_818d_d6efc7b4ed25` | Decimate | `RG-F01`–`RG-F03` | `RG-F03` is independently supported by the inspected 2019 guide, and the exact flavor line explicitly names Gruul as anarchy. | Retain `NO_CHANGE_INDICATED`. |
| `PLAY-RG-1-cardrel_rg_b7505737` | Borborygmos Enraged | `RG-F04`–`RG-F08` | `RG-F04` is independently supported by the inspected 2019 guide; the additional current-era Borborygmos/Domri facets route to inspected independent sources. The unsupported decades detail in `RG-F05` is unnecessary to the card's membership/leadership or gameplay bridge. | Retain `REMEDIATION_LIKELY` for the existing internal-language/template findings; no source-intake block. |
| `PLAY-RG-3-cardrel_rg_ebf3fd80` | Nikya of the Old Ways | `RG-F09`–`RG-F11` | `RG-F09` and `RG-F10` remain narrow intake gaps, but the row does not rely on Nikya's office or beast training. The exact Oracle restriction and Raze-Boar line plus independently inspected `RG-F11` evidence support the bounded anti-civilization/End-Raze bridge. | Retain `REMEDIATION_LIKELY` for the existing generic-modal finding; no source-intake block. |
| `PLAY-RG-4-cardrel_rg_6ed13a89` | Ruric Thar, the Unbowed | `RG-F12`, `RG-F13` only | Both routed facets depend on the unusable guide. The exact card record verifies the noncreature-spell punishment but does not establish Ruric's Gruul/Ghor identity. General inspected Gruul evidence is broader and does not entail either narrow claim. | Change to `SOURCE_INTAKE_REQUIRED`. |

## Final row-level consequence

- `Boros Legion`: one row changes to `SOURCE_INTAKE_REQUIRED` (`Feather, the Redeemed`); four affected rows retain their prior dispositions because inspected independent evidence supports their actual bridges.
- `Planeswalker's Guide to Gatecrash: Part 2`: one row changes to `SOURCE_INTAKE_REQUIRED` (`Ruric Thar, the Unbowed`); four affected rows retain their prior dispositions because inspected independent evidence supports their actual bridges.
- Broken URL count and source-intake row count are intentionally not equated.
