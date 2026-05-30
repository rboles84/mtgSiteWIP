# Esper Source Ledger

**Faction:** Esper
**Plane:** Alara
**Date:** 2026-05-29
**Kanban Card:** VM-163

This ledger records sources reviewed for the VM-163 Esper packet and how they may be used.

---

## Source Tier Definitions

| Tier | Meaning | Use |
|---|---|---|
| Tier 1 - Local official identity | Official Wizards / Mark Rosewater source captured locally and read directly | Can support promoted identity and design-philosophy claims |
| Tier 1A - Repo audit | VM-156 repo audit of local canon materials | Can support source discovery, file classification, and local corpus truth |
| Tier 2 - Repo-local support | Local protocol, architecture, or broad canon-support material | Support-only unless a claim is independently backed by Tier 1 |
| Tier 2P - Product/operator support | Internal Vox Mana Commander or placement research | Commander/operator support only; not canon lore |
| Tier 3 - Draft or presentation artifact | Generated-style dossiers, HTML codex exports, or self-contained presentation pages | Structure-only; not evidence |
| Manual fill | Missing local official capture, MTG Wiki-dependent, or unsupported assertion | Do not promote |

---

## A. Primary Identity Sources

| Source ID | Path | Tier | Session Status | Supported Use | Notes |
|---|---|---|---|---|---|
| ESP-SRC-001 | `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` | Tier 1 - Local official identity | Read directly | Esper as the white-blue-black shard; Blue-centered design lens; Blue philosophy of potential, knowledge, planning, change, technology, control, and perfection; Red/Green as philosophical inhibitors from Blue's perspective | This is the evidence floor for primary Esper identity. It is design commentary written as an interview with Blue, not in-world narrative lore. |
| ESP-SRC-002 | `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 1A - Repo audit | Read directly | Local canon tree classification; confirms the Esper Rosewater file as a primary identity source; records `Alara Shards Lore Dossier Protocol.rtf` as a shard lore/protocol dossier; records support sources and hit register | Use to normalize references to the analysis path, not the older canon-tree copy. |

---

## B. Structure and Support Sources

| Source ID | Path | Tier | Session Status | Supported Use | Notes |
|---|---|---|---|---|---|
| ESP-SRC-003 | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Tier 2 - Repo-local support | Grep/read through local text extraction | Alara shard structure, WUB/Esper row, missing Red/Green, colored artifacts/filigree theme, dominant species list, Esper topical discovery such as Ethersworn, Codex Etherium, Tidehollow, and finite etherium | Use as discovery and structure rail. Do not promote detailed lore claims without local official capture. |
| ESP-SRC-004 | `docs/architecture/system/cross-color-dynamics.md` | Tier 2 - Repo-local support | Read directly | Internal Vox Mana framing for WU, UB, WB, and WUB; Esper as ordered perfection through control; operator and separator language | Vox Mana architecture source, not MTG canon. |
| ESP-SRC-005 | `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html` | Tier 2 - Repo-local support | Grep/read targeted passages | Alara shard comparison, Esper presentation topics, Ethersworn / etherium / Codex / Carmot discovery terms | Support only. It is an interactive presentation artifact, not primary authority. |

---

## C. Commander and Operator Sources

| Source ID | Path | Tier | Session Status | Supported Use | Notes |
|---|---|---|---|---|---|
| ESP-SRC-006 | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Tier 2P - Product/operator support | Parsed locally; 10 WUB rows found | Commander archetype, operator, search, and placement support for WUB expressions | May support gameplay/operator language only. It must not support canon claims about Esper society, figures, geography, metaphysics, or chronology. |
| ESP-SRC-007 | `docs/research/canon/misc/vox_mana_comprehensive_analysis.md` | Tier 2P - Product/operator support | Targeted grep | Existing Vox Mana placement note: Azorius primary with Esper as stretch in a WU plus Black-signal case | Support-only. Do not use for canon lore. |

### WUB Commander Rows Found In ESP-SRC-006

| Deck | Main Commander | Recommended Second Commander | Primary Use |
|---|---|---|---|
| Scions & Spellcraft | Y'shtola, Night's Blessed | Urianger, Studious Astrologian | Control, card draw, value |
| Eternal Might | Temmet, Naktamun's Will | Hashaton, Scarab's Fist | Zombies, looting, graveyard value |
| Miracle Worker | Aminatou, Veil Piercer | Teferi, Temporal Pilgrim | Enchantments, miracles, library manipulation |
| Subjective Reality | Aminatou, the Fateshifter | Yennett, Cryptic Sovereign | Top-of-library manipulation, blink, control |
| Eternal Bargain | Oloro, Ageless Ascetic | Sydri, Galvanic Genius | Life gain, control, artifacts |
| Dungeons of Death | Sefris of the Hidden Ways | Minn, Wily Illusionist | Venture, reanimator, value |
| Cavalry Charge | Sidar Jabari of Zhalfir | Elenda and Azor | Knight tribal, combat, eminence |
| Urza's Iron Alliance | Urza, Chief Artificer | Tawnos, Solemn Survivor | Go-wide artifacts, construct tokens |
| Forces of the Imperium | Inquisitor Greyfax | Celestine, the Living Saint | Tokens, Squad, card draw |
| Obscura Operation | Kamiz, Obscura Oculus | Tivit, Seller of Secrets | Connive, evasion, aggressive value |

---

## D. Audited Target Artifacts

| Source ID | Path | Tier | Session Status | Use Allowed | Notes |
|---|---|---|---|---|---|
| ESP-DRAFT-001 | `docs/research/esper/esper-lore-source-packet.md` before VM-163 cleanup | Tier 3 - Draft artifact | Read and replaced | Salvageable topic list and gap discovery only | Contained stale routing to unrelated later cards, over-promoted HTML and generated sources, and unsupported conclusions. |
| ESP-DRAFT-002 | `docs/research/esper/Esper Lore Dossier Generation.md` | Tier 3 - Draft artifact | Read/grepped | Structure-only: headings, topic order, missing-topic discovery | Points to non-existent `docs/lore-dossiers/esper/*` and `data/lore/factions/esper.json`. Uses many MTG Wiki/MTGLore citations not locally captured. |
| ESP-DRAFT-003 | `docs/research/esper/esper_codex.html` | Tier 3 - Presentation artifact | Grepped | Structure-only | Not evidence. Do not reuse prose, conclusions, chronology, figures, or lore assertions. |
| ESP-DRAFT-004 | `docs/research/esper/esper_lore_codex.html` | Tier 3 - Presentation artifact | Grepped | Structure-only | Not evidence. Do not reuse prose, conclusions, chronology, figures, or lore assertions. |

---

## E. Missing Official Captures Needed For Promotion

The following source families appear in drafts or support docs but are not approved VM-163 evidence because local official captures are missing:

| Missing Source Family | Needed For | VM-163 Status |
|---|---|---|
| Official Shards of Alara design/mechanics article for Esper colored artifacts | Promoting colored artifact creature design as canon/mechanics evidence | Manual fill required |
| `A Planeswalker's Guide to Alara` official text | Geography, society, etherium, Ethersworn, Seekers, Noble Work, topography | Manual fill required |
| `The Seeker's Fall` official webcomic/text capture | Tezzeret/Silas/Codex Etherium origin details | Manual fill required |
| `An Etherium Tale` official web fiction capture | Agatha, Callio, Harborgate, Bant/Esper Conflux details | Manual fill required |
| Commander 2016 / Commander Legends official lore pages for Breya, Armix, Silas | New etherium synthesis and Commander lore figures | Manual fill required |
| Official card database captures for Sharuum, Master of Etherium, Ethersworn Canonist, Esper Charm, etc. | Exact card, mechanic, flavor, and character claims | Manual fill required |
| Any source used only through MTG Wiki, MTGLore, or presentation HTML | Detailed chronology, figures, locations, contested canon rulings | Manual fill required |

---

## F. Rejected As Primary Authority

| Source | Reason |
|---|---|
| MTG Wiki / Fandom pages | Discovery only; not primary evidence for VM-163 promoted claims |
| MTGLore pages not locally captured | Discovery only until local official/story capture exists |
| Generated dossier prose | May contain useful structure but not approved proof |
| HTML codex prose | Presentation content, not evidence |
| Unsupported exact sourcebook claims | Require local official capture before promotion |
