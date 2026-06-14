# Grixis Evidence Ledger

**Faction:** Grixis
**Plane:** Alara
**Date:** 2026-05-30
**Last Updated:** 2026-06-13
**Kanban Card:** VM-164; VM-379 update

This ledger maps retained Grixis packet claims to source paths, source tiers, confidence/status, and VM-164/VM-379 classification.

Classifications:

- **Promoted:** Safe to carry into downstream Grixis architecture as a sourced claim.
- **Support-only:** Useful context, but not a promoted primary lore claim.
- **Vox Mana synthesis:** Internal product/operator interpretation, not MTG canon.
- **Manual fill required:** Do not promote until stronger local evidence is added.

---

## Part A - Claim Evidence Table

| Claim ID | Claim Summary | Source Path | Source Tier | Confidence / Status | Classification |
|---|---|---|---|---|---|
| GRIXIS-001 | Grixis is the blue-black-red shard discussed in the official Grixis Week Rosewater article. | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` | Tier 1 - Local official design | High | Promoted |
| GRIXIS-002 | Grixis's color direction for this packet is UBR, with Black as the center/design lens. | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md`; `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 1 / Tier 1A | High for UBR and Black-center design lens | Promoted |
| GRIXIS-003 | Black's Grixis framing centers survival, self-advocacy, agency, and adapting to the world as it is. | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` | Tier 1 - Local official design | High, design commentary only | Promoted |
| GRIXIS-004 | Blue contributes subtle problem-solving, study, planning, weakness analysis, and exploitation of information in Black's Grixis frame. | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` | Tier 1 - Local official design | High, design commentary only | Promoted |
| GRIXIS-005 | Red contributes immediacy, zeal, individual priority, action, and willingness to get its hands dirty, while adding recklessness/tension. | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` | Tier 1 - Local official design | High, design commentary only | Promoted |
| GRIXIS-006 | The UBR synthesis can be described as Black using Red's zeal and Blue's manipulation to create an actively conniving survival world. | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` | Tier 1 - Local official design | High, design commentary only | Promoted |
| GRIXIS-007 | White and Green are the missing enemy-color pressures in the Grixis shard frame; VM-164 may say this removes moral/order and life/renewal pressures only at this design level. | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md`; `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Tier 1 / Tier 2 | High for design absence; Medium for shard metadata from RTF | Promoted with source note |
| GRIXIS-008 | Grixis should not be reduced to "evil UBR"; the source frame is Black explaining its own philosophy and pushing back on the evil label. | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` | Tier 1 - Local official design | High as boundary | Promoted boundary |
| GRIXIS-009 | The local canon inventory identifies the Grixis Rosewater file as a primary identity source and the Alara RTF as a shard lore/protocol dossier. | `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 1A - Repo audit | High | Promoted |
| GRIXIS-010 | The local Alara protocol supports Grixis as one of the five Alara shard identities and lists it with UBR, unearth, and discovery terms such as demons, zombies, skeletons, and Kathari. | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Tier 2 - Repo-local support | Medium | Support-only |
| GRIXIS-011 | Local card data supports unearth as a recurring Grixis-adjacent card mechanic on Sedris, Sedraxis Specter, Vithian Stinger, Kederekt Leviathan, and Dregscape Zombie. | `data/scryfall/raw/oracle-cards.json` | Tier 2C - Local card data | High for local card data; not story proof | Support-only |
| GRIXIS-012 | Sedris is a UBR legendary Zombie Warrior card whose local card text grants unearth to creature cards in the graveyard. | `data/scryfall/raw/oracle-cards.json` | Tier 2C - Local card data | High for card fact; no rulership claim | Support-only |
| GRIXIS-013 | Thraximundar is a UBR legendary Zombie Assassin card with haste and sacrifice-pressure card text. | `data/scryfall/raw/oracle-cards.json` | Tier 2C - Local card data | High for card fact; no political-station claim | Support-only |
| GRIXIS-014 | Prince of Thralls, Malfegor, and Cruel Ultimatum support Grixis-colored attrition/resource-loss gameplay patterns at the card-data level. | `data/scryfall/raw/oracle-cards.json` | Tier 2C - Local card data | Medium-High for card patterns; not lore proof | Support-only |
| GRIXIS-015 | `Absorb Vis` verifies `vis` as a local card-data term and a life-swing card, but VM-164 cannot promote a full vis economy from this alone. | `data/scryfall/raw/oracle-cards.json` | Tier 2C - Local card data | High for term/card fact; low for physiology/economy | Promoted boundary |
| GRIXIS-030 | Necromancy was unknown on Jund before the Conflux and was the sole province of the hellish shard of Grixis. | `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md`; official URL verified 2026-06-13 | Tier 1 - Local official story capture | High for narrow pre-Conflux necromancy dimension | Promoted in VM-379 |
| GRIXIS-031 | The official Alara plane overview describes Grixis as an undead-infested hellscape among the five formerly separated shards. | `docs/research/canon/source-material/alara/alara-plane-overview.md`; official URL verified 2026-06-13 | Tier 1 - Local official plane overview | High for broad story texture; not detailed geography | Promoted in VM-379 |
| GRIXIS-032 | The official Alara plane overview says hordes of Grixis undead assaulted other shards after the convergence to maim, enslave, and drain life energy. | `docs/research/canon/source-material/alara/alara-plane-overview.md`; official URL verified 2026-06-13 | Tier 1 - Local official plane overview | High for broad post-Conflux assault/life-drain dimension; not campaign chronology | Promoted in VM-379 |
| GRIXIS-016 | The UBR Commander JSONL contains exactly 8 rows relevant to product/operator language. | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Tier 2P - Product/operator support | High for row count and row content | Support-only |
| GRIXIS-017 | UBR Commander rows support operator patterns such as Wizard ETB value, exile-casting, Pirate reanimation, forced choices/artifacts, control/graveyard, artifact sacrifice, cascade/Demons, and casualty/spell copy. | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Tier 2P - Product/operator support | High for product/operator language | Support-only |
| GRIXIS-018 | UBR Commander rows must not support canon claims about Grixis society, figures, geography, metaphysics, or chronology. | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`; VM-164 prompt | Tier 2P / Process directive | High | Promoted boundary |
| GRIXIS-019 | The Maestros/Anhelo row may be used only as same-color-direction comparator or product support, not as Grixis evidence. | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`; `docs/research/canon/guild_research/New Capenna Family Lore Dossier.rtf`; VM-164 prompt | Tier 2P / Tier 2 comparator / Process directive | High as boundary | Promoted boundary |
| GRIXIS-020 | `The Metaphysical Ecology of Alara - Interactive Codex.html` may support Grixis topic discovery but not primary authority. | `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html`; `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 2 support / Tier 1A audit | Medium | Support-only |
| GRIXIS-021 | `cross-color-dynamics.md` is useful as Vox Mana architecture shorthand but cannot independently promote Grixis lore. | `docs/architecture/system/cross-color-dynamics.md` | Tier 2 - Repo-local support | High for internal architecture; not canon | Vox Mana synthesis |
| GRIXIS-022 | The working VM-164 product phrase "survival through exploitation, calculation, and volatility" is a Vox Mana synthesis from Black center, Blue/Red ally roles, card-data attrition patterns, and Commander/operator support. | GRIXIS-003 through GRIXIS-017 | Mixed Tier 1 / Tier 2C / Tier 2P | Medium as internal synthesis | Vox Mana synthesis |
| GRIXIS-023 | Existing Grixis drafts are unmanaged and cannot be silently promoted because they contain stale unrelated work-item labeling, external citations, MTG Wiki/Fandom/Reddit reliance, and overconfident unsupported claims. | `docs/research/grixis/grixis-lore-source-packet.md` before VM-164 cleanup; `docs/research/grixis/Grixis Research Report_ Lore and Mechanics.md`; `docs/research/grixis/grixis-deep-research-report.md`; `docs/research/grixis/grixis_research_report.html` | Tier 3 - Draft/presentation artifacts | High as local audit finding | Promoted boundary |
| GRIXIS-024 | VM-164 leaves Grixis non-live and does not create architecture docs, raw-faction JSON, generated artifacts, runtime changes, or schema changes. | VM-164 prompt; local file checks | Process directive / repo inspection | High | Promoted boundary |

---

## Part B - Manual-Fill Evidence Rows

These rows are important but cannot be promoted in VM-164.

| Claim ID | Claim Summary | Current Source Path | Current Source Tier | Confidence / Status | Classification |
|---|---|---|---|---|---|
| GRIXIS-MF-001 | Grixis is an undead-infested hellscape in current Wizards plane-page wording. | Resolved by GRIXIS-031 in VM-379 for broad texture only | Tier 1 official capture now recorded | High for broad texture; detailed geography still manual fill | Resolved / promoted boundary |
| GRIXIS-MF-002 | `A Planeswalker's Guide to Alara` verifies the detailed vis system, Vitals, Damned, Vithia, Sedraxis, Kederekt, Droning Isles, Unx, Torchlight, and Grixis geography. | Unmanaged drafts and support docs | Tier 3 draft lead / Tier 2 support | Discovery only | Manual fill required |
| GRIXIS-MF-003 | Sedris was former king of Vithia and rules Sedraxis, but not all of Grixis. | Drafts; MTG Wiki/Fandom-linked claims; local card data only proves card facts | Tier 3 / Tier 2C | Card association supported; biography/rulership not locally promoted | Manual fill required |
| GRIXIS-MF-004 | Nicol Bolas used Grixis as a hideout/staging ground, manipulated local powers, or directed Conflux war logistics from Grixis. | Drafts and uncaptured Alara sources | Tier 3 draft lead | Do not promote from current local evidence | Manual fill required |
| GRIXIS-MF-005 | Malfegor killed Asha, served as Bolas's general, invaded Bant, or was killed by Elspeth/Rafiq. | Drafts and support/presentation artifacts | Tier 3 / Tier 2 support | Needs official capture | Manual fill required |
| GRIXIS-MF-006 | Kess is a Grixis native who harvests vis or seeks to restore life to Grixis. | Drafts, MTG Wiki-linked claims, Commander row support | Tier 3 / Tier 2P | Commander/operator association only | Manual fill required |
| GRIXIS-MF-007 | Thraximundar has a precise in-world biography, mount, height, or role beyond local card type and sacrifice pattern. | Drafts; local card data | Tier 3 / Tier 2C | Card facts supported; biography not promoted | Manual fill required |
| GRIXIS-MF-008 | Fleshbags, Dreg Reavers, lich physiology, Kathari social role, demons, and necromancers form the exact biological hierarchy described in drafts. | Drafts and Alara support artifact | Tier 3 / Tier 2 support | Discovery only | Manual fill required |
| GRIXIS-MF-009 | Unearth is the whole Grixis identity or is a full narrative vis transaction. | Local card data plus drafts | Tier 2C / Tier 3 | Unearth is supported as card/mechanic pattern; "whole identity" is forbidden overclaim | Manual fill required for narrative theory |
| GRIXIS-MF-010 | Cruel Ultimatum directly translates vis harvesting. | Local card data and draft synthesis | Tier 2C / Tier 3 | Card resource swing supported; vis translation not locally promoted | Manual fill required |
| GRIXIS-MF-011 | Post-Conflux geography, refugee movement, and shard-border wars happened at the granularity described in drafts. | Drafts and presentation artifact | Tier 3 / Tier 2 support | Needs official story capture | Manual fill required |
| GRIXIS-MF-012 | Rosewater or Wizards official text directly says Maestros and Grixis are different UBR vantage points. | Draft cites external Rosewater mailbag; local New Capenna RTF exists only as comparator/support | Tier 3 draft lead / Tier 2 comparator | Comparator boundary accepted from prompt; direct quote/capture missing | Manual fill required |

---

## Part C - Term Validation Ledger

| Term | VM-164 Category | Included In Dossier? | Evidence Row(s) | Reason |
|---|---|---|---|---|
| Grixis | Confirmed Grixis term | Yes | GRIXIS-001, GRIXIS-002 | Official Rosewater article and repo audit support. |
| UBR / Blue-Black-Red | Confirmed color direction | Yes | GRIXIS-001, GRIXIS-002, GRIXIS-010 | Official article supports; RTF supports as shard metadata. |
| Black center | Confirmed design lens | Yes | GRIXIS-002, GRIXIS-003 | Grixis Week article is Black-centered. |
| Alara | Confirmed context term | Yes | GRIXIS-009, GRIXIS-010 | Repo audit and Alara RTF support Alara shard context. |
| White / Green absence | Confirmed design/source note | Yes | GRIXIS-007 | Official article supports enemy-color design; RTF supports missing-color shard row. |
| Unearth | Supported mechanics term | Limited | GRIXIS-010, GRIXIS-011 | Supported as Grixis-linked and local card mechanic; not the whole identity. |
| Vis | Supported card-data term / manual-fill lore term | Limited | GRIXIS-015, GRIXIS-MF-002 | Official local card data proves the term; fuller economy needs official capture. |
| Sedris | Supported card-data term / manual-fill biography | Limited | GRIXIS-012, GRIXIS-MF-003 | Card fact supported; rulership/biography require manual fill. |
| Bolas | Manual-fill figure term / broad Alara scheme context | Limited | GRIXIS-031, GRIXIS-032, GRIXIS-MF-004 | VM-379 official plane overview supports broad Bolas/Alara mana-scheme wording only; it does not prove Grixis staging, local rulership, or Grixis-based operations. |
| Malfegor | Supported card-data term / manual-fill biography | Limited | GRIXIS-014, GRIXIS-MF-005 | Card fact supported; story role requires manual fill. |
| Maestros | Comparator/support only | No Grixis claim | GRIXIS-019, GRIXIS-MF-012 | Same UBR direction can appear in product rows, but it is not Grixis evidence. |

---

## Part D - Retention Rule

Any downstream paragraph about Grixis must be traceable to one of the rows above. If a paragraph cannot cite a promoted, support-only, or `Vox Mana synthesis` row, it belongs in [grixis-manual-fill.md](grixis-manual-fill.md) until a local official capture is added.
