# Grixis Source Ledger

**Faction:** Grixis
**Plane:** Alara
**Date:** 2026-05-30
**Last Updated:** 2026-06-13
**Kanban Card:** VM-164; VM-379 update

This ledger records sources reviewed for the VM-164 Grixis packet and how they may be used.

---

## Source Tier Definitions

| Tier | Meaning | Use |
|---|---|---|
| Tier 1 - Local official design | Official Wizards / Mark Rosewater source captured locally and read directly | Can support promoted color-philosophy and design-framing claims |
| Tier 1A - Repo audit | VM-156 repo audit of local canon materials | Can support source discovery, file classification, and local corpus truth |
| Tier 2 - Repo-local support | Local protocol, architecture, support, or broad canon-support material | Support-only unless independently backed by Tier 1 |
| Tier 2C - Local card data | Local Scryfall/card dataset | Card facts, mechanics, names, color identity, and oracle-text support only |
| Tier 2P - Product/operator support | Internal Vox Mana Commander or placement research | Commander/operator support only; not canon lore |
| Tier 3 - Draft or presentation artifact | Generated-style dossiers, HTML exports, community sources, or uncaptured web citations | Discovery only; not evidence |
| Manual fill | Missing local official capture, MTG Wiki-dependent, or unsupported assertion | Do not promote |

---

## A. Primary Identity Sources

| Source ID | Path | Tier | Session Status | Supported Use | Notes |
|---|---|---|---|---|---|
| GRX-SRC-001 | `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` | Tier 1 - Local official design | Read directly | Grixis as the blue-black-red shard; Black as center; Black's self-interest/survival framing; Blue and Red ally contributions; White and Green as missing enemy pressures; not reducing Black/Grixis to simple evil | This is the evidence floor for promoted VM-164 identity claims. It is design commentary in interview form, not in-world narrative lore. |
| GRX-SRC-002 | `docs/analysis/canon-inventory-three-color-reference-audit.md` | Tier 1A - Repo audit | Read directly | Local canon tree classification; confirms the Grixis Rosewater file as a primary identity source; records the Alara shard protocol as relevant to Bant/Esper/Grixis/Jund/Naya | Use to normalize references to the analysis path, not the older canon-tree copy. |
| GRX-SRC-009 | `docs/research/canon/source-material/alara/alara-plane-overview.md` / `https://magic.wizards.com/en/story/alara-plane` | Tier 1 - Local official story-facing capture | Verified for VM-379; access date 2026-06-13 | Broad Grixis story texture as an undead-infested hellscape and post-Conflux undead assault/life-energy drain; broad Nicol Bolas/Alara mana-scheme wording only | Supports GRIXIS-031 and GRIXIS-032. Does not support Vithia/Sedraxis, full vis economy, Bolas staging-ground claims, Nefarox cults, or figure biographies. |
| GRX-SRC-010 | `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md` / `https://magic.wizards.com/en/news/magic-story/all-cairns-jund-2015-11-04` | Tier 1 - Local official story capture | Verified for VM-379; access date 2026-06-13 | Necromancy was unknown on Jund before the Conflux and was the sole province of hellish Grixis | Supports GRIXIS-030 only. Do not expand into full vis/unearth metaphysics or detailed Grixis society. |

---

## B. Local Support Sources

| Source ID | Path | Tier | Session Status | Supported Use | Notes |
|---|---|---|---|---|---|
| GRX-SRC-003 | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | Tier 2 - Repo-local support | Targeted grep/read | Grixis row, UBR shard metadata, unearth as shard mechanic, and discovery topics such as demons, zombies, skeletons, and Kathari | Treat as structure/discovery support. Do not promote detailed lore without local official capture. |
| GRX-SRC-004 | `data/scryfall/raw/oracle-cards.json` | Tier 2C - Local card data | Parsed targeted card records | Card names, types, color identities, keywords, and mechanics for Sedris, Thraximundar, Malfegor, Prince of Thralls, Sedraxis Specter, Vithian Stinger, Kederekt Leviathan, Dregscape Zombie, Banewasp Affliction, Absorb Vis, and Cruel Ultimatum | Supports card facts only. Does not prove geography, biography, rulership, or story chronology. |
| GRX-SRC-005 | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Tier 2P - Product/operator support | Parsed locally; 8 UBR rows found | Commander archetype, operator, search, and placement support for UBR expressions | Product language only. Must not support Grixis canon lore. |
| GRX-SRC-006 | `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html` | Tier 2 - Repo-local support | Targeted grep/read | Grixis topics, Alara comparison terms, vis/unearth/Sedraxis discovery leads | Support only. It is an interactive presentation artifact, not primary authority. |
| GRX-SRC-007 | `docs/architecture/system/cross-color-dynamics.md` | Tier 2 - Repo-local support | Targeted grep/read | Existing Vox Mana cross-color shorthand for Grixis as UBR | Internal architecture shorthand only. Its "necromantic tyranny" phrasing is not canon evidence. |
| GRX-SRC-008 | `docs/research/canon/guild_research/New Capenna Family Lore Dossier.rtf` | Tier 2 - Comparator support | Targeted grep/read via canon audit and term scan | Maestros as a same-color-direction comparator only | Do not use as Grixis evidence. Maestros and Grixis are not interchangeable. |

---

## C. UBR Commander Rows Found In GRX-SRC-005

| Deck | Main Commander | Recommended Second Commander | VM-164 Use |
|---|---|---|---|
| Arcane Wizardry | Inalla, Archmage Ritualist | Kess, Dissident Mage | Wizard tribal / ETB value support |
| Mind Seize | Jeleva, Nephalia's Scourge | Nekusar, the Mindrazer | Exile-casting / spellslinger support |
| Ahoy Mateys | Admiral Brass, Unsinkable | Malcolm, Keen-Eyed Navigator | Pirate tribal / reanimation support |
| Masters of Evil | Davros, Dalek Creator | Missy | Artifacts / forced-choice support |
| The Hosts of Mordor | Sauron, Lord of the Rings | The Black Gate | Control / graveyard support |
| Mishra's Burnished Banner | Mishra, Eminent One | Farid, Enterprising Salvager | Artifact copy / sacrifice support |
| The Ruinous Powers | Abaddon the Despoiler | Be'lakor, the Dark Master | Cascade / Demon tribal support |
| Maestros Massacre | Anhelo, the Painter | Parnesse, the Subtle Brush | Maestros comparator only; not Grixis canon evidence |

---

## D. Audited Draft Artifacts

| Source ID | Path | Tier | Session Status | Use Allowed | Notes |
|---|---|---|---|---|---|
| GRX-DRAFT-001 | `docs/research/grixis/grixis-lore-source-packet.md` before VM-164 cleanup | Tier 3 - Draft artifact | Read and replaced | Topic list and gap discovery only | It self-labeled with an unrelated mana-base work item and called itself canonical. It over-promoted many detailed lore claims from uncaptured sources. |
| GRX-DRAFT-002 | `docs/research/grixis/Grixis Research Report_ Lore and Mechanics.md` | Tier 3 - Draft artifact | Read/grepped | Structure, source leads, caution list | Uses MTG Wiki/Fandom/Reddit/external web sources heavily and assigns "Absolute" confidence to claims not locally captured. |
| GRX-DRAFT-003 | `docs/research/grixis/grixis-deep-research-report.md` | Tier 3 - Draft artifact | Read/grepped | Structure, source leads, caution list | More careful than GRX-DRAFT-002, but still uses web citation placeholders and uncaptured sources. |
| GRX-DRAFT-004 | `docs/research/grixis/grixis_research_report.html` | Tier 3 - Presentation artifact | Grepped | Structure-only | Not evidence. Do not reuse prose, conclusions, chronology, figures, or lore assertions. |

---

## E. Missing Official Captures Needed For Promotion

The following source families appear in drafts or support docs but are not approved VM-164 evidence because local official captures are missing or not directly reviewed as primary story proof:

| Missing Source Family | Needed For | VM-164 Status |
|---|---|---|
| Official Alara plane page | Story-facing description of Grixis, Conflux, and undead assaults | Partially promoted in VM-379 as GRIXIS-031 and GRIXIS-032; detailed geography, vis economy, Bolas staging, Nefarox cults, and campaign chronology remain manual fill |
| `A Planeswalker's Guide to Alara` official text | Vis, Vitals, Damned, Vithia, Sedraxis, Kederekt, geography, species, and society | Manual fill required |
| `Alara Unbroken` official/novel capture | Bolas operations, Malfegor, Torchlight, Conflux chronology | Manual fill required |
| Official Shards/Conflux/Alara Reborn design articles beyond GRX-SRC-001 | Unearth design intent, block evolution, Bolas design association, shard mixing | Manual fill required |
| Official unearth mechanics/release-note captures | Rules and design framing beyond local Scryfall card text | Manual fill required |
| Official card database captures or local exact card-source extracts | Exact official card text, flavor text, and printing-specific claims | VM-379 uses GRX-SRC-004 for short support-only card/flavor anchors; exact long flavor text and biography claims remain manual fill |
| Official Kess, Kaalia, Revin Skoros, Malfegor, and Sedris story/product sources | Detailed figure biography, motives, and chronology | Manual fill required |
| Any source used only through MTG Wiki, Fandom, Reddit, EDHREC, blogs, or HTML exports | Detailed lore, geography, political claims, and contested canon rulings | Manual fill required |

---

## F. Rejected As Primary Authority

| Source | Reason |
|---|---|
| MTG Wiki / Fandom pages | Discovery only; not primary evidence for VM-164 promoted claims |
| Reddit and EDHREC | Community/player perception only; dynamic and not canon |
| External URLs embedded in unmanaged drafts | Not locally captured or verified in VM-164 |
| Generated dossier prose | May contain useful structure but not approved proof |
| HTML codex prose | Presentation content, not evidence |
| Maestros/New Capenna UBR material | Comparator/support only, never Grixis evidence |
