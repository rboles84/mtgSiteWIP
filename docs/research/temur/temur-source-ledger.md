# Temur Source Ledger

Status: VM-203 approved source ledger. Temur remains non-live and review-gated.

## Source Classification

| Source ID | Tier | Source | Approved Use | Limits |
|---|---:|---|---|---|
| TEMUR-SRC-001 | 1 | `docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md` | Primary Temur design and color-philosophy source: green-blue-red wedge, Green center, savagery, and the roles of Green, Blue, and Red inside Temur. | Design and color-philosophy evidence only. Not a full Tarkir geography, chronology, culture, or named-character source. |
| TEMUR-SRC-002 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md` | Official Khans-era Temur source: Qal Sisma, nomadic families, self-sufficiency, frozen ancestors, whispering, Wide Whisper, clan roles, Surrak, named figures, creatures, and locations. | Khans-era Temur Frontier only unless another row explicitly bridges to a different era. |
| TEMUR-SRC-003 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md` | Official Fate Reforged era source for ancient Temur values, Qal Sisma clanholds, whisperers, Yasova Dragonclaw, and Atarka pressure. | Past-era context. Does not make Atarka's later dragonlord clan equivalent to the Temur Frontier. |
| TEMUR-SRC-004 | 1 | `docs/research/canon/source-material/tarkir/story-khanfall.md` | Official story support for Yasova's survival bargain with Atarka and the beginning of the Atarka accommodation. | Story-specific context. Do not generalize into full Yasova biography without further official capture. |
| TEMUR-SRC-005 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md` | Official Dragons-era timeline source for Sarkhan's intervention, Khanfall, and dragonlord clans replacing khan-led clans. | Transition and timeline boundary only. |
| TEMUR-SRC-006 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-2.md` | Official Atarka Clan contrast source: provide-or-become-provisions rule, survival under Atarka, hidden shamans, Surrak as Hunt Caller, and Atarka-era locations. | Contrast/guardrail source. Atarka Clan is not the same as Khans-era Temur Frontier. |
| TEMUR-SRC-007 | 1 | `docs/research/canon/source-material/tarkir/story-awakening-the-bear.md` | Official story support for Surrak, Temur spirituality/pragmatism, bear challenge, clan defense, and Dragonclaw mythic texture. | Story-specific support. Do not turn individual Surrak events into universal clan law. |
| TEMUR-SRC-008 | 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md` | Official modern Dragonstorm-era Temur source: reformed Temur, rebellion against Atarka, semi-nomadic society, Dragonclaw/Twice Whisperer leadership, Endless Song, whisperers, dragonstorms, and modern locations. | Modern era only. Do not read modern Dragonstorm details back into Khans-era Temur without an evidence row. |
| TEMUR-SRC-009 | 1A | `docs/research/canon/canon-inventory-three-color-reference-audit.md` | Repo-side source inventory identifying the Temur MaRo article and Tarkir source families. | Source-selection proof only. It does not directly prove Temur lore claims. |
| TEMUR-SRC-010 | 1A | `docs/analysis/canon-inventory-three-color-reference-audit.md` | Normalized analysis copy of the source inventory, including primary identity/source-role classifications. | Source-selection proof only. It does not directly prove Temur lore claims. |
| TEMUR-SRC-011 | 2 | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Exact GUR Commander/operator support rows for search and play-pattern phrasing. | Support-only. Not MTG canon, not Temur Frontier lore, and not commander legality proof beyond later validation. |
| TEMUR-SRC-012 | Seed | `docs/research/temur/source-material/Temur Frontier Research Report.md`, originally copied from former `docs/research/temur frontier/Temur Frontier Research Report.md` | Discovery material and claim queue. | Not approved evidence. Every claim requires independent evidence-row promotion. |
| TEMUR-SRC-013 | Seed | `docs/research/temur/source-material/temur-frontier-lore-source-packet.md`, originally copied from former `docs/research/temur frontier/temur-frontier-lore-source-packet.md` | Discovery material, candidate source map, and open-thread queue. | Not approved evidence. Packet-shaped wording cannot cite itself. |
| TEMUR-SRC-014 | Seed | `docs/research/temur/source-material/temur_research_report.html`, originally copied from former `docs/research/temur frontier/temur_research_report.html` | Structure-only discovery material. | Generated HTML cannot be canon evidence. |
| TEMUR-SRC-015 | 2P | `https://magic.wizards.com/en/news/announcements/tarkir-dragonstorm-commander-decklists` | Official Tarkir: Dragonstorm Commander product row for `Temur Roar`, `Eshki, Temur's Roar`, `Ureni of the Unwritten`, deck name, color identity, and gallery/deck navigation. | Support-only. Not Tarkir canon, Temur lore, commander legality proof, popularity proof, metagame proof, or placement evidence. |

## Exact GUR Commander Support Extraction

The VM-203 extraction from `TEMUR-SRC-011` used exact normalized color identity `Blue; Red; Green` or `Green; Blue; Red`. It produced seven support-only rows. One unrelated Simic row mentions a Temur card name in its iconic cards and is excluded.

| Row ID | JSONL Line | Product | Face Commander | Support Themes | Recommended Second Commander | Status |
|---|---:|---|---|---|---|---|
| TEMUR-CMD-001 | 11 | Temur Roar | Eshki, Temur's Roar | Ramp; Dragons | Ureni of the Unwritten | Support-only; Tarkir: Dragonstorm product row, not lore proof. |
| TEMUR-CMD-002 | 14 | Living Energy | Saheeli, Radiant Creator | Energy counters; artifacts | Pia Nalaar, Chief Mechanic | Support-only; product/operator row, not Temur Frontier canon. |
| TEMUR-CMD-003 | 72 | Mirror Mastery | Riku of Two Reflections | Copying spells and creatures; ramp into large threats | Animar, Soul of Elements | Support-only; Commander product row, not Tarkir lore. |
| TEMUR-CMD-004 | 96 | Arcane Maelstrom | Kalamax, the Stormsire | Instants matter; instant copying; counters | Xyris, the Writhing Storm | Support-only; operator phrasing only. |
| TEMUR-CMD-005 | 106 | Paradox Power | The Thirteenth Doctor / Yasmin Khan | Casting from non-hand zones; exile/top-library/cascade style support | N/A, commander pair already listed | Support-only; crossover product row, not Tarkir lore. |
| TEMUR-CMD-006 | 122 | Tinker Time | Gimbal, Gremlin Prodigy | Artifact tokens; value; artifact payoffs | Rashmi and Ragavan | Support-only; product/operator row, not Temur Frontier canon. |
| TEMUR-CMD-007 | 133 | Tyranid Swarm | The Swarmlord | +1/+1 counters; X-spells; ravenous | Magus Lucea Kane | Support-only; crossover product row, not Tarkir lore. |

## Excluded Uses

- Do not use broad `GUR`, `URG`, or `RUG` text hits as Temur Frontier evidence.
- Do not use Atarka Clan material as Khans-era Temur Frontier material.
- Do not use modern Dragonstorm Temur details as Khans-era details without timeline labeling.
- Do not use Commander product rows as Tarkir lore.
- Do not use the three seed artifacts, generated HTML, architecture prose, future dossiers, or packet summaries as evidence for their own claims.
