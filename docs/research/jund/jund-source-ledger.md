# Jund Source Ledger

**Faction:** Jund
**Plane:** Alara
**Date:** 2026-05-30
**Kanban Card:** VM-176

This ledger defines the source tiers and source IDs used by the VM-176 Jund packet. It is deliberately conservative: official Jund-specific evidence can promote Jund claims; support material can guide color philosophy, operator language, and manual-fill queues; seed files cannot prove claims by themselves.

---

## Tier Policy

| Tier | Meaning | Promotion Use |
|---|---|---|
| Tier 1 | Local official Jund-specific source | May promote Jund identity claims when the claim stays within the source's scope. |
| Tier 1A | Repo audit or inventory that records source availability and project source order | May promote repo-truth and source-selection claims. |
| Tier 2 | Local support source, local card data, product/operator source, or official non-Jund color philosophy | Support-only unless paired with Tier 1 for a tightly scoped claim. |
| Tier 3 | Unmanaged seed, draft, generated, community, or presentation artifact | Discovery and caution only. Never promoted evidence by itself. |

---

## Source IDs

| Source ID | Source Path | Tier | Approved Use | Limits |
|---|---|---|---|---|
| JND-SRC-001 | `docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md` | Tier 1 | Primary Jund identity source: black-red-green shard, Red center, Red self-expression/freedom/emotion frame, Black/Green ally roles, White/Blue opposition, and design-level anti-flattening | Design philosophy source, not a detailed story or geography source. |
| JND-SRC-002 | `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 1A | Normalized repo audit reference for three-color source inventory and source order | Does not independently prove Jund lore beyond source availability and audit conclusions. |
| JND-SRC-003 | `docs/research/canon/canon-inventory-three-color-reference-audit.md` | Tier 1A input | User-provided audit path acknowledged for handoff continuity | Cite JND-SRC-002 as the normalized current reference unless a later card changes that decision. |
| JND-SRC-004 | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Tier 2 | Alara shard protocol and discovery scaffold | Support-only; not a promoted row source for detailed Jund story claims. |
| JND-SRC-005 | `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html` | Tier 2 | Existing packet shape, topic discovery, and formatting precedent | Generated/presentation artifact. Structure-only; never canon evidence. |
| JND-SRC-006 | `data/scryfall/raw/oracle-cards.json` | Tier 2C | Local card facts, oracle text, color identity, type lines, and mechanic verification | Card facts only; not story proof unless a card's text directly says the fact. |
| JND-SRC-007 | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Tier 2P | Commander/operator support for exact BRG rows | Product/operator support only; no Jund canon claims. |
| JND-SRC-008 | `docs/research/canon/mark_rosewater_official_two_color/rakdos_Hedonism With Attitude _ MAGIC_ THE GATHERING.md` | Tier 2 color philosophy | BR pair-overlap support | Does not prove Jund setting, creature, place, or story claims. |
| JND-SRC-009 | `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md` | Tier 2 color philosophy | BG pair-overlap support | Does not prove Jund setting, creature, place, or story claims. |
| JND-SRC-010 | `docs/research/canon/mark_rosewater_official_two_color/gruul_Aaaargh!!! _ MAGIC_ THE GATHERING.md` | Tier 2 color philosophy | RG pair-overlap support | Does not prove Jund setting, creature, place, or story claims. |
| JND-SRC-011 | `docs/research/canon/mark_rosewater_official_misc/Red_Philosophy_Drive_to_Work_Podcast_Transcript.md`; `docs/research/canon/mark_rosewater_official_misc/Black_Philosophy_Drive_to_Work_Podcast_Transcript.md`; `docs/research/canon/mark_rosewater_official_misc/Green_Philosophy_Drive_to_Work_Podcast_Transcript.md` | Tier 2 color philosophy | Mono-color support for future phrasing checks | Color philosophy only; not Jund canon by itself. |
| JND-SRC-012 | `docs/research/canon/mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md`; `docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Conflicts_Explained.md`; `docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Philosophy_Conflicts.md`; `docs/research/canon/mark_rosewater_official_misc/IM_Conversations_with_Colors_Allied_Week.md` | Tier 2 color philosophy | Pair and conflict support | Not Jund setting or story proof. |
| JND-SRC-013 | `docs/research/canon/mark_rosewater_official_three_color/Naya_Searching Within _ MAGIC_ THE GATHERING.md`; `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` | Tier 2 comparator | Distinction guardrails for Naya and Grixis | Comparator only; not Jund evidence. |

---

## Commander / Operator Extraction

Commander/operator extraction must match exact color identity text or exact normalized color set equivalent to `Black; Red; Green`.

Do not use substring, regex partial, or "contains B/R/G" logic that can include `UBRG`, `WUBRG`, `BR`, `RG`, `BG`, or five-color rows.

Exact BRG rows in JND-SRC-007:

| Deck | Color Field | Use |
|---|---|---|
| Blight Curse | `Black; Red; Green` | Operator support only |
| World Shaper | `Black; Red; Green` | Operator support only |
| Graveyard Overdrive | `Black; Red; Green` | Operator support only |
| Nature's Vengeance | `Black; Red; Green` | Operator support only |
| Power Hungry | `Black; Red; Green` | Operator support only |
| Riveteers Rampage | `Black; Red; Green` | Operator support only |

False-positive examples to exclude: `Blue; Black; Red; Green`, `White; Blue; Black; Red; Green`, two-color BR/RG/BG rows, and five-color rows.

---

## Seed / Reference Register

| File | Tier | Classification | VM-176 Decision |
|---|---|---|---|
| `docs/research/jund/source-material/jund-lore-source-packet.unmanaged-vm161-seed.md` | Tier 3 | Seed/reference only | Moved under `source-material`; use only for discovery and defect tracking. |
| `docs/research/jund/source-material/Jund_ Deep Lore and Gameplay Analysis.seed.md` | Tier 3 | Seed/reference only | Moved under `source-material`; use only for discovery and caution lists. |
| `docs/research/jund/source-material/jund_research_report.generated-seed.html` | Tier 3 | Structure-only generated artifact | Moved under `source-material`; never canon evidence. |

---

## Missing Official Captures

The following may be true or useful, but they remain `Manual fill required` until stronger local official evidence is captured:

- Detailed Jund geography, settlements, ecology, species, and named locations from official Alara guides or story articles.
- Named figure biographies for Kresh, Meren, Rakka Mar, Karrthus, Sarkhan Vol, or other Jund-associated characters beyond local card facts.
- Detailed Conflux or post-Conflux chronology involving Jund.
- A complete official story basis for devour as the whole Jund identity rather than a supported card/mechanic topic.
- Modern constructed "Jund midrange" culture as anything more than player format context.
