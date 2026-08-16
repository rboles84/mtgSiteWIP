# 29 - Mardu Horde Identity Evidence Packet

Status: Evidence-only audit packet. This file does not authorize identity, placement, relationship, or prose changes.

## Authority route

- Production identity key: `MARDU`.
- VM-560 router key: `MARDU`.
- Route outcome: `STRONG_EVIDENCE`.
- Raw claim authority: `data/raw-factions/mardu/mardu.claims.json`.
- Source registry: `data/raw-factions/mardu/mardu.sources.json`.
- Known gaps: Keep Khans-era Mardu, Kolaghan-era material, ancient history, and modern Dragonstorm evidence timeline-scoped.
- Must not be treated as authority: Summing R+W+B; generic aggression/warrior decks; Kolaghan material as interchangeable Mardu; Commander rows as lore

## Core facets used by the rendered Sound/Play rows

| Facet ID | Routing claim ID | Classification | Source-supported statement | Underlying evidence | Limitation |
| --- | --- | --- | --- | --- | --- |
| MARDU-F01 | mardu_claim_0002 | DIRECT_OR_OFFICIAL_FACT | Mardu design identity has Red as its center and speed as its wedge attribute, with speed expressed through action, early pressure, strategic timing, rapid coordinated attack, and all-in aggression across the three colors. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-002, MARDU-EVID-003 [FULL_LOCAL_SOURCE_READ]; src_wotc_rosewater_mardu_finishing_first: docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md @ Mardu: Finishing First; bounded local capture for mardu_claim_0002 [FULL_LOCAL_SOURCE_READ] | Use for design-level speed and color-role language. Exact raid, dash, mobilize, card text, card prevalence, and Commander legality remain deferred. |
| MARDU-F02 | mardu_claim_0003 | DIRECT_OR_OFFICIAL_FACT | Khans-era Mardu are a feared warrior culture defined by speed, brutality, honor, the dragon wing symbol, the Edicts of Ilagra, war names, respect-earning khan authority, seminomadic raiding, plunder dependence, and low-infrastructure war society. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-004, MARDU-EVID-005, MARDU-EVID-006, MARDU-EVID-008 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_khans_pg_part_2: docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md @ Planeswalker's Guide to Khans of Tarkir, Part 2; bounded local capture for mardu_claim_0003 [FULL_LOCAL_SOURCE_READ] | Use for Khans-era Mardu Horde society and warrior-code floor. Do not backfill modern Dragonstorm reforms into this identity. |
| MARDU-F03 | mardu_claim_0005 | DIRECT_OR_OFFICIAL_FACT | Fate Reforged and story-specific Mardu material supports an ancient bridge in which Mardu are feared warriors who live for battle and speed, Alesha is a young Mardu khan and skilled rider, archer, and swordfighter, and Alesha story rows support war-name judgment, accepted name, identity recognition, and Khanfall transition context. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-013, MARDU-EVID-014, MARDU-EVID-015, MARDU-EVID-016, MARDU-EVID-017 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_fate_reforged_pg: docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md @ Planeswalker's Guide to Fate Reforged; bounded local capture for mardu_claim_0005 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_story_truth_of_names: docs/research/canon/source-material/tarkir/story-truth-of-names.md @ The Truth of Names; bounded local capture for mardu_claim_0005 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_story_khanfall: docs/research/canon/source-material/tarkir/story-khanfall.md @ Khanfall; bounded local capture for mardu_claim_0005 [FULL_LOCAL_SOURCE_READ] | Use as an ancient bridge only. Do not expand into full Alesha biography, card-level claims, or broad political doctrine without later evidence capture. |
| MARDU-F04 | mardu_claim_0011 | SUPPORTED_INTERPRETATION | The official Tarkir: Dragonstorm Commander Decklists page verifies Mardu Surge as a Red; White; Black Commander deck with Zurgo Stormrender as face commander and Neriv, Crackling Vanguard as featured commander. | src_wotc_tarkir_dragonstorm_commander_decklists_20250325: https://magic.wizards.com/en/news/announcements/tarkir-dragonstorm-commander-decklists @ ANCHOR_NOT_RECORDED [INSPECTED_OFFICIAL_WEB] | Decklist support is product/navigation only. It is not Tarkir canon proof, popularity proof, metagame proof, legality proof, or placement evidence. |

## Internal tensions and contrasts

No additional source-supported tension was required for the currently rendered row bridges. This is not permission to invent one for symmetry.

## Anti-drift boundaries

| Claim ID | Type | Boundary | Underlying evidence |
| --- | --- | --- | --- |
| mardu_claim_0006 | timeline_boundary | Kolaghan clan is a Dragons-era dragonlord clan boundary, not Khans-era Mardu Horde continuity; its little internal structure, lack of official rank, the crave, lightning-fast brutality, Zurgo Bellstriker, and Vial Smasher are contrast or timeline-bound material. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-018, MARDU-EVID-019 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_dragons_pg_part_2: docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-2.md @ Planeswalker's Guide to Dragons of Tarkir, Part 2; bounded local capture for mardu_claim_0006 [FULL_LOCAL_SOURCE_READ] |
| mardu_claim_0009 | source_hygiene_boundary | Color-pair philosophy files and Mardu seed source-material artifacts are not direct Tarkir lore evidence; color-pair files support interpretation only, and seed claims must be independently rebound to approved source rows or marked Manual fill required. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-029, MARDU-EVID-030 [FULL_LOCAL_SOURCE_READ] |
| mardu_claim_0010 | metadata_boundary | Generic RWB, generic WBR, Kolaghan continuity, Dragonstorm backfill, color-pair interpretation, seed-file claims, and non-live packet status are not sufficient Mardu Horde proof or runtime readiness. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-001, MARDU-EVID-018, MARDU-EVID-029, MARDU-EVID-030, MARDU-EVID-032 [FULL_LOCAL_SOURCE_READ] |

## Official corroboration

| Facet ID | Claim ID | Established facet | Underlying evidence |
| --- | --- | --- | --- |
| MARDU-F01 | mardu_claim_0002 | Mardu design identity has Red as its center and speed as its wedge attribute, with speed expressed through action, early pressure, strategic timing, rapid coordinated attack, and all-in aggression across the three colors. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-002, MARDU-EVID-003 [FULL_LOCAL_SOURCE_READ]; src_wotc_rosewater_mardu_finishing_first: docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md @ Mardu: Finishing First; bounded local capture for mardu_claim_0002 [FULL_LOCAL_SOURCE_READ] |
| MARDU-F02 | mardu_claim_0003 | Khans-era Mardu are a feared warrior culture defined by speed, brutality, honor, the dragon wing symbol, the Edicts of Ilagra, war names, respect-earning khan authority, seminomadic raiding, plunder dependence, and low-infrastructure war society. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-004, MARDU-EVID-005, MARDU-EVID-006, MARDU-EVID-008 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_khans_pg_part_2: docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md @ Planeswalker's Guide to Khans of Tarkir, Part 2; bounded local capture for mardu_claim_0003 [FULL_LOCAL_SOURCE_READ] |
| MARDU-F03 | mardu_claim_0005 | Fate Reforged and story-specific Mardu material supports an ancient bridge in which Mardu are feared warriors who live for battle and speed, Alesha is a young Mardu khan and skilled rider, archer, and swordfighter, and Alesha story rows support war-name judgment, accepted name, identity recognition, and Khanfall transition context. | src_vm_mardu_evidence_ledger_20260531: docs/research/mardu/mardu-evidence-ledger.md @ Mardu Evidence Ledger; rows MARDU-EVID-013, MARDU-EVID-014, MARDU-EVID-015, MARDU-EVID-016, MARDU-EVID-017 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_fate_reforged_pg: docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md @ Planeswalker's Guide to Fate Reforged; bounded local capture for mardu_claim_0005 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_story_truth_of_names: docs/research/canon/source-material/tarkir/story-truth-of-names.md @ The Truth of Names; bounded local capture for mardu_claim_0005 [FULL_LOCAL_SOURCE_READ]; src_wotc_tarkir_story_khanfall: docs/research/canon/source-material/tarkir/story-khanfall.md @ Khanfall; bounded local capture for mardu_claim_0005 [FULL_LOCAL_SOURCE_READ] |

## Vox Mana synthesis and supported-interpretation boundaries

| Facet ID | Claim ID | Classification | Bounded interpretation | Underlying evidence |
| --- | --- | --- | --- | --- |
| MARDU-F04 | mardu_claim_0011 | SUPPORTED_INTERPRETATION | The official Tarkir: Dragonstorm Commander Decklists page verifies Mardu Surge as a Red; White; Black Commander deck with Zurgo Stormrender as face commander and Neriv, Crackling Vanguard as featured commander. | src_wotc_tarkir_dragonstorm_commander_decklists_20250325: https://magic.wizards.com/en/news/announcements/tarkir-dragonstorm-commander-decklists @ ANCHOR_NOT_RECORDED [INSPECTED_OFFICIAL_WEB] |

## Rendered row coverage

| Ledger ID | Surface | Order | Card | Disposition | Claim classification |
| --- | --- | --- | --- | --- | --- |
| SOUND-MARDU-1-cardvoice_mardu_cad09970_14c8_4d80_82fe_6c855efb0191 | SOUND | 1 | Bloodsoaked Champion | NO_CHANGE_INDICATED | DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION |
| SOUND-MARDU-2-cardvoice_vm558_mardu_5a96b93b_bae6_48fb_87f5_05f3ffcf7ba9 | SOUND | 2 | Defibrillating Current | NO_CHANGE_INDICATED | DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION |
| PLAY-MARDU-1-cardrel_auto_mardu_0f93d88c_9d2e_416d_a10b_99483360b1fb | PLAY | 1 | Zurgo Stormrender | REMEDIATION_LIKELY | SUPPORTED_INTERPRETATION |

## Packet limitation

Claims and relationship IDs above are routing authority only. Every row-level result separately records the exact card fact, underlying source, card-to-facet inference, classification, and bridge limitation. A broad identity statement is never treated as automatic proof that a card is a strong Sound/Play relationship.
