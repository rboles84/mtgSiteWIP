# Abzan Source Ledger

Status: VM-200 approved source ledger. Abzan remains non-live and review-gated.

## Source Classification

| Source ID | Tier | Source | Approved Use | Limits |
|---|---:|---|---|---|
| ABZAN-SRC-001 | 1 | `docs/research/canon/mark_rosewater_official_three_color/Abzan_We Will Survive _ MAGIC_ THE GATHERING.md` | Primary Abzan design/color-philosophy source: WBG wedge, White center, endurance/survival, defense-first strategy, late-game growth, and color-role tensions. | Design and color-philosophy evidence only. Not a full Tarkir geography, chronology, culture, or named-character source. |
| ABZAN-SRC-002 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md` | Official Khans-era Abzan lore: endurance, scale symbol, family, duty, kin trees, ancestor spirits, clan structure, Anafenza, Arashin, and military/social roles. | Khans-era only unless a later evidence row ties it to another era. |
| ABZAN-SRC-003 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md` | Official Fate Reforged Abzan lore: dragon-war survival, family bonds, krumar, dragon-scale armor, Daghatar, and Dromoka territory pressure. | Past-era Abzan context only. Does not make Dromoka's brood Abzan Houses. |
| ABZAN-SRC-004 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md` | Official Dragons-era chronology: Sarkhan's intervention, dragon tempests, Khanfall, and dragon clans replacing khan-led clans. | Timeline and transition source. Not a modern Abzan Houses source. |
| ABZAN-SRC-005 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-2.md` | Official Dromoka-era contrast: Dromoka clan, ancestor-magic prohibition, hidden kin trees, and Anafenza's execution for kin-tree worship. | Contrast/guardrail source only. Dromoka's brood is not Abzan Houses. |
| ABZAN-SRC-006 | 1 | `docs/research/canon/source-material/tarkir/story-khanfall.md` | Official story context for Daghatar, Reyhan, Dromoka capitulation, holdouts, and the khans' fall. | Story-specific context. Do not generalize beyond the cited events. |
| ABZAN-SRC-007 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-1.md` | Official modern Abzan Houses source: revival after Dromoka, Council of Houses, Felothar, five major houses, perennation, Kin-Trees, military, daily life, magic, dragons, dragonstorms, and locations. | Primary modern Abzan source. Preserve source typos/encoding issues by paraphrasing rather than copying malformed text. |
| ABZAN-SRC-008 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md` | Official neighboring-territory and cross-border source: Sultai border with Abzan, Sandsteppe Gate, Screamreach, and regional transition points. | Support for geography/border context only. |
| ABZAN-SRC-009 | 1A | `docs/research/canon/canon-inventory-three-color-reference-audit.md` | Repo-side source inventory showing Abzan official article and Tarkir protocol/source family locations. | Source-selection proof only. It does not directly prove Abzan lore claims. |
| ABZAN-SRC-010 | 1A | `docs/analysis/canon-inventory-three-color-reference-audit.md` | Normalized analysis copy of the source inventory, including primary identity/source-role classifications. | Source-selection proof only. It does not directly prove Abzan lore claims. |
| ABZAN-SRC-011 | 2 | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Exact WBG Commander/operator support rows for search and play-pattern phrasing. | Support-only. Not MTG canon, not Abzan Houses lore, and not commander legality proof beyond later validation. |
| ABZAN-SRC-012 | 2 | Mono-color and two-color philosophy captures identified by the canon inventory, especially White, Black, Green, Orzhov, Selesnya, and Golgari. | Future color-overlap and separator support. | Support-only. Do not turn pair/mono articles into Tarkir story claims. |
| ABZAN-SRC-013 | 2 | `docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.md` | Local protocol/dossier support for future review. | Support-only. Do not cite as official unless a future pass proves the file itself is official or a prior source ledger classified it that way. |
| ABZAN-SRC-014 | Seed | `docs/research/abzan/source-material/Abzan Houses_ Deep Research Report.md` copied from VM-198 stash untracked tree path `docs/research/abzan houses/Abzan Houses_ Deep Research Report.md` | Discovery material and claim queue. | Not approved evidence. Every claim requires independent evidence-row promotion. |
| ABZAN-SRC-015 | Seed | `docs/research/abzan/source-material/abzan-houses-lore-source-packet.md` copied from VM-198 stash untracked tree path `docs/research/abzan houses/abzan-houses-lore-source-packet.md` | Discovery material and claim queue. | Not approved evidence. Packet-shaped wording cannot cite itself. |
| ABZAN-SRC-016 | Seed | `docs/research/abzan/source-material/abzan_houses_research_report.html` copied from VM-198 stash untracked tree path `docs/research/abzan houses/abzan_houses_research_report.html` | Structure-only discovery material. | Generated HTML cannot be canon evidence. |
| ABZAN-SRC-017 | 2P | `https://magic.wizards.com/en/news/announcements/tarkir-dragonstorm-commander-decklists` | Official Tarkir: Dragonstorm Commander product row for `Abzan Armor`, `Felothar the Steadfast`, `Betor, Ancestor's Voice`, deck name, color identity, and gallery/deck navigation. | Support-only. Not Tarkir canon, Abzan lore, commander legality proof, popularity proof, metagame proof, or placement evidence. |

## Exact WBG Commander Support Extraction

The VM-200 extraction from `ABZAN-SRC-011` used exact normalized color identity `white|black|green`. It produced six support-only rows.

| Row ID | JSONL Line | Product | Face Commander | Support Themes | Recommended Second Commander | Status |
|---|---:|---|---|---|---|---|
| ABZAN-CMD-001 | 8 | Abzan Armor | Felothar the Steadfast | Defenders; toughness matters; combat | Doran, the Siege Tower | Support-only; Tarkir: Dragonstorm product row, not lore proof. |
| ABZAN-CMD-002 | 73 | Counterpunch | Ghave, Guru of Spores | +1/+1 counters; tokens; sacrifice | Vish Kal, Blood Arbiter | Support-only; not Abzan Houses canon. |
| ABZAN-CMD-003 | 97 | Symbiotic Swarm | Kathril, Aspect Warper | Keyword counters; graveyard setup; combat value | Tayam, Luminous Enigma | Support-only; not Abzan Houses canon. |
| ABZAN-CMD-004 | 112 | Enduring Enchantments | Anikthea, Hand of Erebos | Enchantments in graveyard; token copies | Narci, Fable Singer | Support-only; not Abzan Houses canon. |
| ABZAN-CMD-005 | 114 | Food and Fellowship | Frodo, Adventurous Hobbit / Sam, Loyal Attendant | Food tokens; life gain; tokens; Partners with | Pippin, Warden of Isengard | Support-only; crossover product row, not Abzan Houses canon. |
| ABZAN-CMD-006 | 123 | Corrupting Influence | Ixhel, Scion of Atraxa | Poison counters; corrupted; proliferate; opponent-card theft | Vishgraz, the Doomhive | Support-only; Phyrexian product row, not Abzan Houses canon. |

## Excluded Uses

- Do not use broad `WBG`, `BGW`, or `GWB` text hits as Abzan evidence.
- Do not use Dromoka's brood as Abzan Houses.
- Do not use Commander product rows as Tarkir lore.
- Do not use the three seed artifacts, generated HTML, architecture prose, future dossiers, or packet summaries as evidence for their own claims.
