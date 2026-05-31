# Grixis Lore Source Packet

**VM-164 Research Input - Codex Handoff Document**

This file is the approved VM-164 Grixis source packet. It replaces the unmanaged draft that self-labeled with an unrelated mana-base work item, so downstream Grixis work must cite VM-164 instead.

This packet is normalization and evidence-binding only. It does not authorize architecture authoring, raw JSON authoring, generation, placement promotion, or runtime changes.

---

## 1. Source Packet Verdict

| Field | Value |
|---|---|
| Shard name | Grixis |
| Plane | Alara |
| Color direction | UBR |
| Center color | Black |
| Current status | Source packet only; non-live |
| Approved next phase | VM-165 only after human review |
| Architecture created? | No |
| Raw-faction folder created? | No |
| Runtime or generated files changed? | No |

---

## 2. Promoted Identity Claims

| Claim | Evidence Row | Status |
|---|---|---|
| Grixis is the UBR shard discussed by the official local Rosewater Grixis article. | GRIXIS-001 | Promoted |
| Black is the design center of Grixis. | GRIXIS-002 | Promoted |
| Black's frame is survival, self-advocacy, agency, and adapting to reality as it is. | GRIXIS-003 | Promoted, design commentary |
| Blue contributes calculation, subtle problem solving, and weakness analysis. | GRIXIS-004 | Promoted, design commentary |
| Red contributes zeal, immediacy, and willingness to act, with volatility/tension. | GRIXIS-005 | Promoted, design commentary |
| Black combines Red zeal with Blue manipulation into a more actively conniving survival world. | GRIXIS-006 | Promoted, design commentary |
| White and Green absence can support narrow design statements about missing moral/order and life/renewal pressures. | GRIXIS-007 | Promoted with source note |
| Grixis must not be flattened into "evil UBR." | GRIXIS-008 | Promoted boundary |

---

## 2b. Newly Promoted Claims (2026-05-30 capture)

| Claim | Evidence Row | Source | Status |
|---|---|---|---|
| Grixis is the shard whose magic was "the sole province of the hellish shard of Grixis" before the Conflux — specifically, necromancy was absent from the other shards (including Jund) until the Conflux brought the shards together. | GRIXIS-030 | `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md` — verified curl capture. Verbatim: "Necromancy was unknown on Jund before the Conflux, being the sole province of the hellish shard of Grixis." | Promoted |
| Grixis is described in official Wizards text as "an undead-infested hellscape." | GRIXIS-031 | `docs/research/canon/source-material/alara/alara-plane-overview.md` — verified curl capture | Promoted |
| Post-Conflux, Grixis undead mounted an assault on the other shards: "Hordes of Grixis undead mount an assault to maim, enslave, and drain the life energy from other shards." | GRIXIS-032 | `docs/research/canon/source-material/alara/alara-plane-overview.md` — verified curl capture | Promoted |

---

## 3. Support-Only Claims

| Claim | Evidence Row | Use |
|---|---|---|
| The Alara protocol supports Grixis as an Alara shard, UBR, and associated with unearth and some creature/type discovery terms. | GRIXIS-010 | Support/discovery only |
| Local card data supports unearth and Grixis-colored attrition/resource-loss card patterns. | GRIXIS-011 through GRIXIS-015 | Card/mechanics support only |
| The Commander JSONL contains 8 UBR rows that support product/operator language. | GRIXIS-016, GRIXIS-017 | Commander/operator only |
| Maestros may be discussed only as comparator/support, not Grixis evidence. | GRIXIS-019 | Boundary only |
| The interactive Alara codex may support topic discovery but not primary authority. | GRIXIS-020 | Support only |
| Vox Mana cross-color shorthand may help future separators but is not canon evidence. | GRIXIS-021 | Vox Mana synthesis |

---

## 4. Vox Mana Synthesis Allowed By This Packet

The following line may be used only when labeled `Vox Mana synthesis`:

> Grixis is survival through exploitation, calculation, and volatility: Black decides that survival comes first, Blue finds the weakness, and Red acts before the opening closes.

Evidence support: GRIXIS-003 through GRIXIS-017 and GRIXIS-022.

This is not official Magic doctrine. It is Vox Mana product language derived from evidence-bound design and card/operator support.

---

## 5. Manual Fill Required

Do not promote the following without future local evidence updates:

- Full vis economy, Vitals, Damned, lethemancy, extraction methods, or soul/body/mind effects.
- Grixis geography such as Vithia, Sedraxis, Kederekt, Unx, Torchlight, Droning Isles, boneheaps, or the dregscape at draft-level detail.
- Sedris biography or the scope of Sedris's rule.
- Nicol Bolas as ruler, sovereign, or detailed operator of Grixis.
- Malfegor biography, Asha connection, generalship, or death.
- Kess, Revin Skoros, Caladessa, Kaalia, Leogin, Split-Eye Coven, or other figure details.
- Conflux chronology and post-Conflux political/geographic state.
- Unearth as the whole identity.
- Cruel Ultimatum as direct vis harvesting.
- Grixis as simply evil.
- Maestros as interchangeable with Grixis.

See [grixis-manual-fill.md](grixis-manual-fill.md).

---

## 6. Draft Input Classification

| Draft/Input | Classification | Downstream Rule |
|---|---|---|
| `grixis-lore-source-packet.md` before VM-164 cleanup | Replaced unmanaged draft | Do not cite old unrelated work-item or canonical instructions |
| `Grixis Research Report_ Lore and Mechanics.md` | Unmanaged draft | Topic discovery and caution list only |
| `grixis-deep-research-report.md` | Unmanaged draft | Topic discovery and caution list only |
| `grixis_research_report.html` | Presentation/export artifact | Structure-only |

---

## 7. Commander/Product Support Rows

The 8 UBR rows in `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` are:

| Deck | Main Commander | Recommended Second Commander | Use |
|---|---|---|---|
| Arcane Wizardry | Inalla, Archmage Ritualist | Kess, Dissident Mage | Product/operator |
| Mind Seize | Jeleva, Nephalia's Scourge | Nekusar, the Mindrazer | Product/operator |
| Ahoy Mateys | Admiral Brass, Unsinkable | Malcolm, Keen-Eyed Navigator | Product/operator |
| Masters of Evil | Davros, Dalek Creator | Missy | Product/operator |
| The Hosts of Mordor | Sauron, Lord of the Rings | The Black Gate | Product/operator |
| Mishra's Burnished Banner | Mishra, Eminent One | Farid, Enterprising Salvager | Product/operator |
| The Ruinous Powers | Abaddon the Despoiler | Be'lakor, the Dark Master | Product/operator |
| Maestros Massacre | Anhelo, the Painter | Parnesse, the Subtle Brush | Maestros comparator only |

These rows cannot support Grixis canon lore.

---

## 8. Stop Rule For VM-164

Stop after this packet. Do not create `docs/architecture/colors/grixis/`. Do not create `data/raw-factions/grixis/`. Do not add `GRIXIS` to placement data. Do not add `UBR` as an alias. Do not run build paths. Do not modify runtime, schema, generated, Maze, route, Home, or Supabase files for VM-164.
