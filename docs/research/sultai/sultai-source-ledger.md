# Sultai Source Ledger

Status: VM-209 approved source ledger. Sultai remains docs-only, non-live, and review-gated.

## Source Classification

| Source ID | Tier | Source | Approved Use | Limits |
|---|---:|---|---|---|
| SULTAI-SRC-001 | 1 | `docs/research/canon/mark_rosewater_official_three_color/Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md` | Primary Sultai design and color-philosophy source: Black-Green-Blue wedge, ruthlessness, color interaction, graveyard/resource use, theft, hand/library pressure, and "whatever it takes" framing. | Design and color-philosophy evidence only. Not a Tarkir geography, chronology, named-character, or clan-history source. |
| SULTAI-SRC-002 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md` | Official Khans-era Sultai Brood source: dragon ruthlessness, fang symbol, exploitation, sibsig, rakshasa pacts, naga hierarchy, clan roles, magic, Sidisi, Kheru, Qarsi, Ukud, Gurmag, Sagu, and other locations. | Khans-era Sultai Brood only unless another row explicitly bridges to a different era. |
| SULTAI-SRC-003 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md` | Official Fate Reforged source for ancient Sultai, Tasigur, undead labor, rakshasa pacts, anti-dragon tactics, and Silumgar pressure. | Ancient/Fate Reforged context. Does not make Tasigur-era Sultai equivalent to Khans-era Sidisi rule or modern Dragonstorm Sultai. |
| SULTAI-SRC-004 | 1 | `docs/research/canon/source-material/tarkir/story-khanfall.md` | Official story support for Tasigur, Sultai betrayal under truce, Silumgar's intervention, the "no khan" boundary, and Tasigur becoming Silumgar's trophy. | Story-specific transition context. Do not generalize into full biographies without further official capture. |
| SULTAI-SRC-005 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md` | Official Dragons-era source for Silumgar clan, dragonlord hierarchy, ruthlessness, power/knowledge values, necromancy, sibsig, Qarsi, Ukud, Gurmag, and Sidisi as Undead Vizier. | Silumgar clan contrast and timeline boundary. Silumgar clan is not Khans-era Sultai Brood. |
| SULTAI-SRC-006 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md` | Official modern Dragonstorm-era Sultai source: revived Sultai, agriculture, honored dead, Lasyd, spies/scouts, naga protectors, rakshasa rejection, Abiding Harvest, Rite of Renewal, dragonstorms, and modern locations. | Modern Dragonstorm-era Sultai only. Do not read these reforms back into Khans-era Sultai. |
| SULTAI-SRC-007 | 1A | `docs/research/canon/canon-inventory-three-color-reference-audit.md` | Repo-side source inventory identifying the official Sultai MaRo article and Tarkir source families. | Source-selection proof only. It does not directly prove Sultai lore claims. |
| SULTAI-SRC-008 | 2 | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Exact BGU Commander/operator support rows for search, player-facing deck vocabulary, and support-only archetype phrasing. | support-only. Not MTG canon, not Tarkir lore, and not commander legality proof beyond later validation. |
| SULTAI-SRC-009 | 2 | `docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.md` | Support-only dossier/protocol reference for claim discovery and comparative clan framing. | support-only and discovery-only. Packet-shaped synthesis cannot prove a claim by itself. |
| SULTAI-SRC-010 | 2 | `docs/research/canon/mark_rosewater_official_two_color/dimir_Pretty Sneaky Sis _ MAGIC_ THE GATHERING.md` | Color-pair interpretation support for Blue-Black overlap when VM-210 discusses Sultai metaphysics. | Color/metaphysics support only. Does not prove Tarkir-specific lore, events, figures, mechanics, chronology, or clan facts. |
| SULTAI-SRC-011 | 2 | `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md` | Color-pair interpretation support for Black-Green life/death/resource overlap. | Color/metaphysics support only. Does not prove Tarkir-specific lore, events, figures, mechanics, chronology, or clan facts. |
| SULTAI-SRC-012 | 2 | `docs/research/canon/mark_rosewater_official_two_color/simic_Improving Upon Nature _ MAGIC_ THE GATHERING.md` | Color-pair interpretation support for Green-Blue improvement/nature overlap. | Color/metaphysics support only. Does not prove Tarkir-specific lore, events, figures, mechanics, chronology, or clan facts. |
| SULTAI-SRC-013 | Seed | `docs/research/sultai/source-material/sultai-brood-deep-research-report.md` copied from `docs/research/sultai brood/sultai-brood-deep-research-report.md` | Discovery material and claim queue. | discovery-only. Not approved evidence. Every claim requires independent evidence-row promotion. |
| SULTAI-SRC-014 | Seed | `docs/research/sultai/source-material/sultai-brood-lore-source-packet.md` copied from `docs/research/sultai brood/sultai-brood-lore-source-packet.md` | Discovery material, candidate source map, and open-thread queue. | discovery-only. Not approved evidence. Packet-shaped wording cannot cite itself. |
| SULTAI-SRC-015 | 2P | `https://magic.wizards.com/en/news/announcements/tarkir-dragonstorm-commander-decklists` | Official Tarkir: Dragonstorm Commander product row for `Sultai Arisen`, `Kotis, Sibsig Champion`, `Teval, the Balanced Scale`, deck name, color identity, and gallery/deck navigation. | Support-only. Not Tarkir canon, Sultai lore, commander legality proof, popularity proof, metagame proof, or placement evidence. |

## Exact BGU Commander Support Extraction

The VM-209 extraction from `SULTAI-SRC-008` used exact normalized color identities `Blue; Black; Green` and `Black; Green; Blue`. It produced six support-only rows.

| Row ID | JSONL Line | Product | Face Commander | Support Themes | Recommended Second Commander | Status |
|---|---:|---|---|---|---|---|
| SULTAI-CMD-001 | 12 | Sultai Arisen | Kotis, Sibsig Champion | Graveyard value; self-mill; mill; token creation; reanimator/control vocabulary | Teval, the Balanced Scale | support-only; Tarkir: Dragonstorm Commander product row, not lore proof. |
| SULTAI-CMD-002 | 29 | Grand Larceny | Gonti, Canny Acquisitor | Casting opponents' cards; exile-casting; theft; adaptive value/control | Gonti, Lord of Luxury | support-only; product/operator row, not Tarkir lore. |
| SULTAI-CMD-003 | 34 | Mutant Menace | The Wise Mothman | Mill; rad counters; alternate attrition; graveyard-adjacent control | The Master, Transcendent | support-only; Universes Beyond product row, not Tarkir lore. |
| SULTAI-CMD-004 | 39 | Faceless Menace | Kadena, Slinking Sorcerer | Morph; face-down creatures; hidden information; card draw/value | Volrath, the Shapestealer | support-only; Commander product row, not Tarkir lore. |
| SULTAI-CMD-005 | 75 | Devour for Power | The Mimeoplasm | Graveyard construction; self-mill; power/ability combination threat building | Damia, Sage of Stone | support-only; product/operator row, not Tarkir lore. |
| SULTAI-CMD-006 | 99 | Enhanced Evolution | Otrimi, the Ever-Playful | Mutate; ability stacking; graveyard recursion; complex creature value | Zaxara, the Exemplary | support-only; Ikoria product row, not Tarkir lore. |

## Excluded Uses

- Do not use broad `BGU`, `BUG`, `UBG`, or `GUB` text hits as Sultai Brood evidence.
- Do not use Silumgar clan material as Khans-era Sultai Brood material.
- Do not use modern Dragonstorm Sultai reforms as Khans-era Sultai details without timeline labeling.
- Do not use Commander product rows as Tarkir lore or commander legality proof.
- Do not use color-pair philosophy files to prove Tarkir-specific lore, events, figures, mechanics, chronology, or clan facts.
- Do not use seed artifacts, generated summaries, future architecture prose, or packet summaries as evidence for their own claims.
