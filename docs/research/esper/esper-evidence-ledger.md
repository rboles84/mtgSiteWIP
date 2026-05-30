# Esper Evidence Ledger

**Faction:** Esper
**Plane:** Alara
**Date:** 2026-05-29
**Kanban Card:** VM-163

This ledger maps retained Esper packet claims to source paths, source tiers, confidence/status, and VM-163 classification.

Classifications:

- **Promoted:** Safe to carry into downstream Esper architecture as a sourced claim.
- **Support-only:** Useful context, but not a promoted primary lore claim.
- **Vox Mana synthesis:** Internal product/operator interpretation, not MTG canon.
- **Manual-fill:** Do not promote until stronger local evidence is added.

---

## Part A - Claim Evidence Table

| Claim ID | Claim Summary | Source Path | Source Tier | Confidence / Status | Classification |
|---|---|---|---|---|---|
| ESPER-001 | Esper is the white-blue-black shard discussed in the official Esper Week Rosewater article. | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` | Tier 1 - Local official identity | High | Promoted |
| ESPER-002 | Esper's color direction for this packet is WUB, with Blue as the center/design lens. | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md`; `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 1 / Tier 1A | High for WUB and Blue design lens | Promoted |
| ESPER-003 | Blue's core Esper philosophy is striving for potential through knowledge, planning, change, and applied information. | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` | Tier 1 - Local official identity | High | Promoted |
| ESPER-004 | The official article frames Esper as Blue's proof-of-concept world for order and perfection, including mastered weather, politics, and biology. | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` | Tier 1 - Local official identity | High, design commentary only | Promoted |
| ESPER-005 | Blue describes White as an ally through social improvement, long-term planning, technology serving people, and strategy. | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` | Tier 1 - Local official identity | High, design commentary only | Promoted |
| ESPER-006 | Blue describes Black as an ally through control, information value, focus, and vision, while noting Black's ethical shortfall. | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` | Tier 1 - Local official identity | High, design commentary only | Promoted |
| ESPER-007 | Red and Green are Esper's missing enemy colors in the shard frame; Blue rejects Red's impulse and Green's anti-change / anti-technology posture. | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md`; `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Tier 1 / Tier 2 | High for philosophy; Medium for shard metadata from RTF | Promoted with design/source note |
| ESPER-008 | The local canon inventory identifies the Esper Rosewater file as a primary identity source and the Alara RTF as a lore/protocol dossier. | `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 1A - Repo audit | High | Promoted |
| ESPER-009 | Alara shard comparison lists Bant, Esper, Grixis, Jund, and Naya as the five shard identities. | `docs/analysis/canon-inventory-three-color-reference-audit.md`; `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Tier 1A / Tier 2 | High as local corpus fact; Medium as lore proof | Promoted as context |
| ESPER-010 | The Alara RTF supports Esper discovery topics: WUB, colored artifacts/filigree, humans/sphinxes/vedalken/homunculi, and missing Red/Green. | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Tier 2 - Repo-local support | Medium | Support-only |
| ESPER-011 | `cross-color-dynamics.md` frames Esper as ordered perfection through control, hierarchical mastery, artifacts, control, and resource denial. | `docs/architecture/system/cross-color-dynamics.md` | Tier 2 - Repo-local support | High for internal architecture; not canon | Vox Mana synthesis |
| ESPER-012 | WU, UB, and WB pair-overlap logic can guide Esper separators against Azorius, Dimir, and Orzhov. | `docs/architecture/system/cross-color-dynamics.md` | Tier 2 - Repo-local support | High for internal architecture; not canon | Vox Mana synthesis |
| ESPER-013 | The WUB Commander JSONL contains 10 Esper-color rows. | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Tier 2P - Product/operator support | High for row count and row content | Support-only |
| ESPER-014 | WUB Commander rows support control, card advantage, library manipulation, artifacts, life gain, reanimation, tribal, tokens, and evasive aggression as Commander/operator patterns. | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Tier 2P - Product/operator support | High for product/operator language | Support-only |
| ESPER-015 | WUB Commander rows should not be used to support canon claims about Esper's society, figures, geography, metaphysics, or chronology. | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`; VM-163 plan | Tier 2P / Process directive | High | Promoted boundary |
| ESPER-016 | `The Metaphysical Ecology of Alara - Interactive Codex.html` can support topic discovery but not primary authority. | `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html`; `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 2 support / Tier 1A audit | Medium | Support-only |
| ESPER-017 | `Esper Lore Dossier Generation.md`, `esper_codex.html`, and `esper_lore_codex.html` are non-authoritative target artifacts for structure-only reuse. | `docs/research/esper/Esper Lore Dossier Generation.md`; `docs/research/esper/esper_codex.html`; `docs/research/esper/esper_lore_codex.html` | Tier 3 - Draft/presentation artifact | High as local audit finding | Promoted boundary |
| ESPER-018 | The previous Esper packet's self-assignment to unrelated later cards is stale and must not appear in approved outputs. | `docs/research/esper/esper-lore-source-packet.md` before VM-163 cleanup; VM-163 plan | Draft artifact / Process directive | High | Promoted boundary |

---

## Part B - Manual-Fill Evidence Rows

These rows are important but cannot be promoted in VM-163.

| Claim ID | Claim Summary | Current Source Path | Current Source Tier | Confidence / Status | Classification |
|---|---|---|---|---|---|
| ESPER-MF-001 | Every native Esper creature is a colored artifact creature. | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf`; `docs/research/esper/Esper Lore Dossier Generation.md` | Tier 2 / Tier 3 | Plausible and important, but local official mechanics/design capture missing | Manual-fill |
| ESPER-MF-002 | Esper geography includes Vectis, Tidehollow, Glass Dunes, Cliffs of Ot, named seas, and twenty-three winds. | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf`; `docs/research/esper/Esper Lore Dossier Generation.md`; HTML codex artifacts | Tier 2 / Tier 3 | Discovery only | Manual-fill |
| ESPER-MF-003 | Esper society is an absolute magocracy with prosaic class structure, sphinx/vedalken/human hierarchy, Ethersworn ideology, and the Noble Work. | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf`; draft/presentation artifacts | Tier 2 / Tier 3 | Discovery only | Manual-fill |
| ESPER-MF-004 | Etherium, carmot, sangrite, Crucius, the Codex Etherium, and scarcity/thinning details form Esper's metallurgical canon. | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf`; draft/presentation artifacts | Tier 2 / Tier 3 | Discovery only without local official captures | Manual-fill |
| ESPER-MF-005 | Sharuum, Tezzeret, Silas Renn, Breya, Agatha, Callio, Armix, and Crucius have the detailed roles described in the unmanaged draft packet. | `docs/research/esper/esper-lore-source-packet.md` before cleanup; `docs/research/esper/Esper Lore Dossier Generation.md` | Tier 3 - Draft artifact | Do not promote from current local evidence | Manual-fill |
| ESPER-MF-006 | Harborgate, Agatha's defection, Esper/Bant post-Conflux clashes, Malfegor's assault, and Phyrexian invasion details are canon at the granularity described in the draft. | Draft/presentation artifacts; support-only RTF/HTML | Tier 2 / Tier 3 | Needs official story captures | Manual-fill |
| ESPER-MF-007 | `Test of Metal` reliability rulings, Sharuum abdication rejection, "Tezzeret is the carmot" rejection, and clockworker retirement are settled canon rulings. | `docs/research/esper/Esper Lore Dossier Generation.md`; draft packet | Tier 3 - Draft artifact | Needs source-specific verification | Manual-fill |
| ESPER-MF-008 | Sydri is categorically not from Esper/Fiora origin details. | `docs/research/esper/Esper Lore Dossier Generation.md`; draft packet | Tier 3 - Draft artifact | Needs official product/story capture | Manual-fill |
| ESPER-MF-009 | Exact card text, flavor text, and named-card mechanical details for Esper cards. | Missing local official card captures | Manual fill | Not verified in VM-163 | Manual-fill |

---

## Part C - Term Validation Ledger

| Term | VM-163 Category | Included In Dossier? | Evidence Row(s) | Reason |
|---|---|---|---|---|
| Esper | Confirmed Esper term | Yes | ESPER-001, ESPER-002 | Official article and repo audit support. |
| WUB / White-Blue-Black | Confirmed color direction | Yes | ESPER-001, ESPER-002 | Official article names the white-blue-black shard; audit classifies the source. |
| Blue center | Confirmed design lens | Yes | ESPER-002, ESPER-003 | Esper Week article is Blue's shard interview; audit classifies it as Blue-centered. |
| Alara | Confirmed context term | Yes | ESPER-008, ESPER-009 | Repo audit and RTF support Alara shard context. |
| Red / Green absence | Confirmed design/source note | Yes | ESPER-007 | Official article supports enemy-color philosophy; RTF supports missing-color shard row. |
| Etherium | Discovery/support term | Limited | ESPER-MF-004 | Needs local official capture before canon promotion. |
| Ethersworn | Discovery/support term | Limited | ESPER-MF-003 | Needs local official capture before canon promotion. |
| Seekers of Carmot | Discovery/support term | Limited | ESPER-MF-004 | Needs local official capture before canon promotion. |
| Vectis / Tidehollow | Discovery/support term | Limited | ESPER-MF-002 | Needs local official capture before canon promotion. |
| Sharuum / Tezzeret / Silas / Breya / Agatha / Crucius | Discovery/support terms | Manual-fill only | ESPER-MF-005 | Figure claims are too detailed for VM-163 evidence floor. |
| Sydri | Manual-fill term | No | ESPER-MF-008 | Needs official product/story capture before any origin claim. |
| Obscura | Operator comparison term | No canon claim | ESPER-014, ESPER-015 | WUB Commander support only, not Esper canon. |

---

## Part D - Retention Rule

Any downstream paragraph about Esper must be traceable to one of the rows above. If a paragraph cannot cite a promoted or support-only row, it belongs in [esper-manual-fill.md](esper-manual-fill.md) until a local official capture is added.
