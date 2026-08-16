# 21 - Bant Identity Evidence Packet

Status: Evidence-only audit packet. This file does not authorize identity, placement, relationship, or prose changes.

## Authority route

- Production identity key: `BANT`.
- VM-560 router key: `BANT`.
- Route outcome: `SUPPORTED_WITH_LIMITATIONS`.
- Raw claim authority: `data/raw-factions/bant/bant.claims.json`.
- Source registry: `data/raw-factions/bant/bant.sources.json`.
- Known gaps: Dedicated philosophy is strong; some older Bant dossier/manual-fill lore and card rows were training/secondary or unfetched and require current direct evidence before reuse.
- Must not be treated as authority: Summing W+U+G; old training-knowledge card text; MTG Wiki/Tumblr/TV Tropes/Commander rankings as primary; manual-fill prose as evidence

## Core facets used by the rendered Sound/Play rows

| Facet ID | Routing claim ID | Classification | Source-supported statement | Underlying evidence | Limitation |
| --- | --- | --- | --- | --- | --- |
| BANT-F01 | bant_claim_0004 | DIRECT_OR_OFFICIAL_FACT | Rosewater's Bant article frames Bant as an idealized White-centered utopia made possible by the absence of Black and Red from the shard. | src_wotc_rosewater_bant_20081006: docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md @ docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md#absence-of-black-red [FULL_LOCAL_SOURCE_READ]; src_vm_bant_metaphysics_md_20260529: docs/architecture/colors/bant/metaphysics.md @ docs/architecture/colors/bant/metaphysics.md#absence-boundary [FULL_LOCAL_SOURCE_READ]; src_vm_bant_evidence_ledger_20260528: docs/research/bant/bant-evidence-ledger.md @ docs/research/bant/bant-evidence-ledger.md#absence-boundary [FULL_LOCAL_SOURCE_READ] | Use as color-pie/design support, not as an in-world quote from Bant residents. |
| BANT-F02 | bant_claim_0007 | SUPPORTED_INTERPRETATION | Bant's social structure is strongly associated with sigils, public honor, and earned recognition. | src_vm_bant_evidence_ledger_20260528: docs/research/bant/bant-evidence-ledger.md @ docs/research/bant/bant-evidence-ledger.md#sigil-public-honor [FULL_LOCAL_SOURCE_READ]; src_vm_bant_research_dossier_20260528: docs/research/bant/bant-research-dossier.md @ docs/research/bant/bant-research-dossier.md#sigil-boundary [FULL_LOCAL_SOURCE_READ] | Prefer sigil hierarchy language unless a future pass verifies more detailed caste terminology from primary sources. |
| BANT-F03 | bant_claim_0006 | SUPPORTED_INTERPRETATION | Exalted supports a Bant placement reading of many members concentrating support behind one worthy champion. | src_vm_bant_identity_md_20260529: docs/architecture/colors/bant/identity.md @ docs/architecture/colors/bant/identity.md#public-champion [FULL_LOCAL_SOURCE_READ]; src_vm_bant_metaphysics_md_20260529: docs/architecture/colors/bant/metaphysics.md @ docs/architecture/colors/bant/metaphysics.md#community-backed-excellence [FULL_LOCAL_SOURCE_READ]; src_vm_bant_research_dossier_20260528: docs/research/bant/bant-research-dossier.md @ docs/research/bant/bant-research-dossier.md#champion-order [FULL_LOCAL_SOURCE_READ] | This is Vox Mana synthesis from official mechanics and card-supported Bant structure, not official Wizards psychology. |
| BANT-F04 | bant_claim_0008 | SUPPORTED_INTERPRETATION | Rafiq of the Many is Bant's iconic legendary knight figure and is associated with sigils from all five Bant nations. | src_vm_bant_evidence_ledger_20260528: docs/research/bant/bant-evidence-ledger.md @ docs/research/bant/bant-evidence-ledger.md#rafiq-sigil-anchor [FULL_LOCAL_SOURCE_READ]; src_vm_bant_research_dossier_20260528: docs/research/bant/bant-research-dossier.md @ docs/research/bant/bant-research-dossier.md#rafiq-boundary [FULL_LOCAL_SOURCE_READ] | Exact flavor text and story passages should be checked live before runtime promotion. |

## Internal tensions and contrasts

No additional source-supported tension was required for the currently rendered row bridges. This is not permission to invent one for symmetry.

## Anti-drift boundaries

| Claim ID | Type | Boundary | Underlying evidence |
| --- | --- | --- | --- |
| bant_claim_0013 | asha_boundary | Asha may be described as Bant's supreme guardian/sacred authority and presider, while the angel-creation mechanism is attributed to a council of archmages rather than to Asha herself. | src_vm_bant_lore_source_packet_20260529: docs/research/bant/bant-lore-source-packet.md @ docs/research/bant/bant-lore-source-packet.md#asha-sacred-authority [FULL_LOCAL_SOURCE_READ]; src_wotc_angel_eye_view_bant_20081008: docs/research/bant/bant-lore-source-packet.md @ docs/research/bant/bant-lore-source-packet.md#asha-angelic-context [FULL_LOCAL_SOURCE_READ]; src_mtg_wiki_asha: docs/research/bant/bant-lore-source-packet.md @ docs/research/bant/bant-lore-source-packet.md#asha-reference-boundary [FULL_LOCAL_SOURCE_READ] |
| bant_claim_0014 | elspeth_boundary | Elspeth's Bant arc may be described as a defining knightly and spiritual chapter, including her training, knighthood, Conflux-era rupture, Sword of Asha handoff, and departure, but not as governing or institution-building on Bant. | src_vm_bant_lore_source_packet_20260529: docs/research/bant/bant-lore-source-packet.md @ docs/research/bant/bant-lore-source-packet.md#elspeth-bant-arc [FULL_LOCAL_SOURCE_READ]; src_archive_trap_alara: docs/research/bant/bant-lore-source-packet.md @ docs/research/bant/bant-lore-source-packet.md#elspeth-bounded-context [FULL_LOCAL_SOURCE_READ]; src_card_kingdom_elspeth_story: docs/research/bant/bant-lore-source-packet.md @ docs/research/bant/bant-lore-source-packet.md#elspeth-character-study [FULL_LOCAL_SOURCE_READ]; src_mtg_wiki_bant: docs/research/bant/bant-lore-source-packet.md @ docs/research/bant/bant-lore-source-packet.md#elspeth-reference-boundary [FULL_LOCAL_SOURCE_READ] |
| bant_claim_0016 | timeline_boundary | Post-Phyrexia material may support continuity of Bant identity, Valeron, and Knight-General Rafiq, but does not establish a complete post-invasion political condition in this packet. | src_vm_bant_lore_reference_docx_20260529: docs/research/bant/source-material/Bant_Lore_Reference.docx @ docs/research/bant/source-material/Bant_Lore_Reference.docx#post-phyrexia-boundary [FULL_LOCAL_SOURCE_READ]; src_wotc_a_man_of_parts: docs/research/bant/bant-research-dossier.md @ docs/research/bant/bant-research-dossier.md#bant-memory-context [FULL_LOCAL_SOURCE_READ]; src_mtg_wiki_bant: docs/research/bant/bant-research-dossier.md @ docs/research/bant/bant-research-dossier.md#bant-continuity-reference [FULL_LOCAL_SOURCE_READ] |
| bant_claim_0020 | runtime_boundary | VM-160 promotes Bant from the VM-159 raw source packet into live placement under expression key BANT, while lore limits remain source-bound. | src_vm_bant_identity_md_20260529: docs/architecture/colors/bant/identity.md @ ANCHOR_NOT_RECORDED [FULL_LOCAL_SOURCE_READ]; src_vm_bant_reliability_audit_20260528: docs/research/bant/bant-reliability-audit.md @ ANCHOR_NOT_RECORDED [FULL_LOCAL_SOURCE_READ] |

## Official corroboration

| Facet ID | Claim ID | Established facet | Underlying evidence |
| --- | --- | --- | --- |
| BANT-F01 | bant_claim_0004 | Rosewater's Bant article frames Bant as an idealized White-centered utopia made possible by the absence of Black and Red from the shard. | src_wotc_rosewater_bant_20081006: docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md @ docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md#absence-of-black-red [FULL_LOCAL_SOURCE_READ]; src_vm_bant_metaphysics_md_20260529: docs/architecture/colors/bant/metaphysics.md @ docs/architecture/colors/bant/metaphysics.md#absence-boundary [FULL_LOCAL_SOURCE_READ]; src_vm_bant_evidence_ledger_20260528: docs/research/bant/bant-evidence-ledger.md @ docs/research/bant/bant-evidence-ledger.md#absence-boundary [FULL_LOCAL_SOURCE_READ] |

## Vox Mana synthesis and supported-interpretation boundaries

| Facet ID | Claim ID | Classification | Bounded interpretation | Underlying evidence |
| --- | --- | --- | --- | --- |
| BANT-F02 | bant_claim_0007 | SUPPORTED_INTERPRETATION | Bant's social structure is strongly associated with sigils, public honor, and earned recognition. | src_vm_bant_evidence_ledger_20260528: docs/research/bant/bant-evidence-ledger.md @ docs/research/bant/bant-evidence-ledger.md#sigil-public-honor [FULL_LOCAL_SOURCE_READ]; src_vm_bant_research_dossier_20260528: docs/research/bant/bant-research-dossier.md @ docs/research/bant/bant-research-dossier.md#sigil-boundary [FULL_LOCAL_SOURCE_READ] |
| BANT-F03 | bant_claim_0006 | SUPPORTED_INTERPRETATION | Exalted supports a Bant placement reading of many members concentrating support behind one worthy champion. | src_vm_bant_identity_md_20260529: docs/architecture/colors/bant/identity.md @ docs/architecture/colors/bant/identity.md#public-champion [FULL_LOCAL_SOURCE_READ]; src_vm_bant_metaphysics_md_20260529: docs/architecture/colors/bant/metaphysics.md @ docs/architecture/colors/bant/metaphysics.md#community-backed-excellence [FULL_LOCAL_SOURCE_READ]; src_vm_bant_research_dossier_20260528: docs/research/bant/bant-research-dossier.md @ docs/research/bant/bant-research-dossier.md#champion-order [FULL_LOCAL_SOURCE_READ] |
| BANT-F04 | bant_claim_0008 | SUPPORTED_INTERPRETATION | Rafiq of the Many is Bant's iconic legendary knight figure and is associated with sigils from all five Bant nations. | src_vm_bant_evidence_ledger_20260528: docs/research/bant/bant-evidence-ledger.md @ docs/research/bant/bant-evidence-ledger.md#rafiq-sigil-anchor [FULL_LOCAL_SOURCE_READ]; src_vm_bant_research_dossier_20260528: docs/research/bant/bant-research-dossier.md @ docs/research/bant/bant-research-dossier.md#rafiq-boundary [FULL_LOCAL_SOURCE_READ] |

## Rendered row coverage

| Ledger ID | Surface | Order | Card | Disposition | Claim classification |
| --- | --- | --- | --- | --- | --- |
| SOUND-BANT-1-cardvoice_bant_67ceffa4_2fdb_499c_88cd_49fb5eb9be59 | SOUND | 1 | Bant Sojourners | NO_CHANGE_INDICATED | DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION |
| SOUND-BANT-2-cardvoice_vm558_bant_610adb2b_9d52_4b70_92d1_0c7adeb93552 | SOUND | 2 | Bant Sureblade | NO_CHANGE_INDICATED | DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION |
| PLAY-BANT-1-cardrel_bant_c6e17443 | PLAY | 1 | Rafiq of the Many | REMEDIATION_LIKELY | DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION |

## Packet limitation

Claims and relationship IDs above are routing authority only. Every row-level result separately records the exact card fact, underlying source, card-to-facet inference, classification, and bridge limitation. A broad identity statement is never treated as automatic proof that a card is a strong Sound/Play relationship.
