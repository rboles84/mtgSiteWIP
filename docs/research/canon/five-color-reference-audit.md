# Five-Color Reference Audit

Date: 2026-06-09

This audit scans the two canon research folders named in the request — `docs/research/canon/misc` and `docs/research/canon/mark_rosewater_official_misc` — and flags exact references to the five-color (WUBRG) identity. It is the companion to `canon-inventory-four-color-reference-audit.md`.

Flagged targets:

- Identity terms: `five-color`, `five colors`, `all five colors`, `WUBRG`, `{W}{U}{B}{R}{G}`
- Lineage / card anchors: `Progenitus`, `Slivers`, `Coalition Victory`, `Conflux`, `Cromat`, `Karona`, `The Ur-Dragon`, Primeval Dragons
- Mechanic anchors: `domain`, `sunburst`, `converge`

Unlike the four-color targets, the five-color space resolves to **one** combination — there is no five-way split to enumerate. The bulk of this report therefore characterizes that single identity and inventories where it appears.

This report is stored at the root of `docs/research/canon` alongside the four-color audit; the canon source subtrees (`misc/`, `mark_rosewater_official_misc/`) are read-only inputs and were not modified.

---

## Pre-flight context

- Five-color identity is **WUBRG** ({W}{U}{B}{R}{G}) — the state of a card, character, mechanic, or deck encompassing all five colors at once. It is defined by full inclusion, not by a shared in-universe ideology.
- Per Mark Rosewater, WUBRG has no single canonical philosophy the way each individual color does. The closest unifying claim is that no one color holds the complete picture and the "true path" lies at the intersection of all five — a descriptive, not ideological, position.
- Where four-color identity is defined by the **one color it excludes**, five-color identity is defined by the fact that it **excludes nothing**. The meaningful tension is internal: a WUBRG object internalizes all five enemy-color conflicts simultaneously (W↔B, U↔R, B↔G, R↔W, G↔U).
- Five-color has **no Nephilim-style flavor cycle of its own**. Its visual and narrative vocabulary is anchored instead by lineages: the Slivers (hive), Progenitus and the Alaran worldsoul avatars (planar totality), and the WUBRG legendary/sorcery canon (Coalition Victory, Conflux, Cromat, Karona).
- The standard "five-color care" mechanics — domain, sunburst, converge — reward color/land diversity rather than demanding all five colors in the cost line. True {W}{U}{B}{R}{G} costs are rare and reserved for legendary creatures and world-defining spells.
- The primary canon source in scope is `misc/mtg_five_color_and_colorless_dossier.md` (a dedicated WUBRG + colorless dossier). All other in-scope files reference five-color only incidentally.

---

## Reference inventory

### `docs/research/canon/misc` — 230 flagged occurrences across 18 files

| File | Hits | Nature of reference |
|---|---|---|
| `mtg_five_color_and_colorless_dossier.md` | 137 | **Primary source.** Full WUBRG dossier: snapshot, canon facts, color analysis, expressions (domain/sunburst/converge/Slivers/avatars), 17-card evidence grid, accuracy notes, sources. Claim-bearing. |
| `MTG_Lore_Research_Enhanced_Final.md` | 28 | Substantive. Dedicated "Five-Color" section; Primeval Dragons as five-color power; Karona crisis; Coalition Victory win condition. Claim-bearing. |
| `colorMTG.txt` | 11 | Rules/reference. Comprehensive Rules 105.x on the five colors and colorlessness; notes WUBRG as the final combination (Unite the Coalition, Conflux). |
| `The Metaphysical Ecology of Alara - Interactive Codex.html` | 10 | Lore. Alara as a singular plane of all five colors; Progenitus the five-headed hydra avatar of the Worldsoul; the Conflux reunification. Supports the worldsoul reading. |
| `comprehensive-mtg-lore-history-updated.md` | 9 | Lore-history. Coalition / Invasion context, Karona, domain origins. |
| `MTG_Lore_Confidence_Tagged.txt` | 9 | Confidence-tagged lore notes touching coalition / five-color events. |
| `Deep_Dive_MTG_Color_Pie_Research.md` | 6 | Color-pie analysis with five-color framing. |
| `vox-mana-semiotics-300-char-blocks.md` | 4 | Vox Mana synthesis copy blocks referencing the identity. |
| `commander_deck_list.txt` | 3 | Incidental — five-color decklists / mentions. |
| `mechanical-color-pie-2017.md` | 3 | Mechanical color-pie context (domain/converge as color-count mechanics). |
| `Vox Mana - Four-Color Identity Dossier.html` | 2 | Cross-reference only; four-color doc that mentions the five-color edge case. |
| `bibliography.md` | 2 | Source listings. |
| `Commander Deckbuilding Advice Resources.rtf` | 1 | Incidental. |
| `mtg-card-types-schema.md` | 1 | Schema mention. |
| `MTG Research Profile Execution Rules.rtf` | 1 | Incidental. |
| `Tarkir Clan Lore Dossier Protocol.rtf` / `.md` | 1 each | Incidental (Tarkir five-dragon adjacency). |
| `sources.md` | 1 | Source listing. |

### `docs/research/canon/mark_rosewater_official_misc` — 20 flagged occurrences across 5 files

| File | Hits | Nature of reference |
|---|---|---|
| `Blue_Philosophy_Drive_to_Work_Podcast_Transcript.md` | 7 | **Incidental.** "all five colors" / "domain" / "converge" appear as passing color-pie framing within a mono-blue philosophy transcript. Not five-color-focused. |
| `Red_Philosophy_Drive_to_Work_Podcast_Transcript.md` | 4 | Incidental — passing five-colors framing. |
| `Black_Philosophy_Drive_to_Work_Podcast_Transcript.md` | 3 | Incidental. |
| `White_Philosophy_Drive_to_Work_Podcast_Transcript.md` | 3 | Incidental. |
| `Green_Philosophy_Drive_to_Work_Podcast_Transcript.md` | 3 | Incidental. |

**Finding:** the `mark_rosewater_official_misc` folder contains **no dedicated five-color material**. Every hit is a passing reference within a mono-color philosophy transcript. All authoritative WUBRG content in scope lives in `misc/mtg_five_color_and_colorless_dossier.md`, corroborated by `MTG_Lore_Research_Enhanced_Final.md`, `colorMTG.txt`, and the Alara codex.

---

## Five-Color Combination (1)

### {W}{U}{B}{R}{G} Totality (Full Spectrum)

The single five-color combination, excluding nothing and including everything. White-blue-black-red-green together hold every tool, cost, and contradiction in the color pie at once. The result reads as **totality, convergence, and unity** when the five agree to share a body, and as **overload, contradiction, and identity-collapse** when they do not. It is not a sixth color; it is the chord struck when all five are played simultaneously. Five-color is a **structural category, not a tribe** — the entities that wear it (a Sliver hive, a worldsoul avatar, a Dominarian coalition, an ur-dragon) share a mana cost or color identity, never an ideology.

**Lineage anchors (in place of a Nephilim cycle):**

- **Slivers** — *hive coherence.* Introduced in Tempest (1997); the Sliver Queen (Stronghold, 1998) was many players' first true WUBRG legend. Each sliver shares its abilities with the whole hive, so the more diverse the hive, the stronger every member. Five-color as a body that learns from everything it touches.
- **Progenitus & the worldsoul avatars** — *planar totality.* Progenitus, Avatar of the Worldsoul of Alara (Conflux, 2009), and Child of Alara present the plane itself made flesh — something *underneath* the color pie rather than a faction within it.
- **The WUBRG legendary/sorcery canon** — Cromat (five enemy-pair abilities), Coalition Victory (completeness-as-win), Conflux (search one of each color), Maelstrom Archangel, The Ur-Dragon, Jodah and Karona.

**Commander anchors:** The Ur-Dragon (Eminence five-color dragon tribal); Kenrith, the Returned King (one ability per color); Jodah, Archmage Eternal and Fist of Suns (WUBRG as a universal key); Reaper King (five-color via monocolor hybrid, cheaper than true WUBRG). Sliver Overlord / Sliver Legion / Sliver Gravemother for tribal hives.

**Mechanical identity:** True {W}{U}{B}{R}{G} costs (legendary creatures, world-defining sorceries) plus the three "five-color care" mechanics — **domain** (scales with basic land *types*; Invasion 2000), **sunburst** (counters equal to colors of mana spent; Fifth Dawn 2004, tied to Mirrodin's five suns), and **converge** (effect scales with colors of mana spent; Battle for Zendikar 2015). Plus the fixing/enabler infrastructure (Chromatic Lantern, Mana Confluence, City of Brass, Triomes) that exists to make WUBRG decks function at all.

**Philosophy:** Refuse to leave any color behind. The five-color identity holds restraint (W), knowledge (U), ambition (B), passion (R), and acceptance (G) all at once — not by reconciling them, but by refusing to let any go silent. Its strength is the breadth of the toolkit; its cost is the demand to keep all five running. Surface readings: totality, completion, balance. Shadow readings: overload, contradiction, the "Karona, False God" failure mode — belonging to everyone and therefore to no one.

**Color inclusion significance:** Where four-color identity derives meaning from its one *exclusion*, five-color derives meaning from *internalizing every enemy conflict simultaneously* — W↔B (individual vs. group), U↔R (head vs. heart), B↔G (amorality vs. natural order), R↔W (freedom vs. restraint), G↔U (nature vs. nurture). Whether the object reads as unity (Slivers, Progenitus) or incoherence (Karona) depends entirely on whether the five colors agree to share one body. Notably, **green is the color that physically enables most WUBRG decks** via ramp and fixing.

**Commander format:** Five-color gives access to every form of removal, card advantage, ramp, and threat at once. It is the most comprehensive build space in the format — and the most demanding on the mana base. The format trap is the same as the philosophical one: breadth without a coherent line becomes a deck that does a little of everything and wins with none of it.

**Symbol:** The coalition banner, the worldsoul, the hive — five suns over Mirrodin, the reunified shards of Alara, the brood-mother at the center of the swarm. Completeness rendered as either a chord or a cacophony.

---

## Quick reference table

| Excluded color | Name | Code | Lineage anchors | Commander anchors | Core theme |
|---|---|---|---|---|---|
| None | Totality / Full Spectrum | WUBRG | Slivers, Progenitus, Cromat, Karona | The Ur-Dragon, Kenrith, Jodah, Sliver Overlord | Convergence of all five; totality vs. overload |

### Five-color "care" mechanics at a glance

| Mechanic | Set introduced | Scales with | What it signals |
|---|---|---|---|
| Domain | Invasion (2000) | Number of basic land *types* controlled | Deck/land diversity, not card color |
| Sunburst | Fifth Dawn (2004) | Colors of mana spent to cast | Colorless artifact *channeling* color |
| Converge | Battle for Zendikar (2015) | Colors of mana spent to cast | Additive payoff for color breadth (any card type) |
| True WUBRG cost | Invasion onward | All five colors in the cost line | Legendary creatures, world-defining spells |

---

## Notes and boundaries

- **One combination, not five.** Five-color does not subdivide. Any "five-color split" framing should be treated as a category error — the variety lives in the *expressions* (hive vs. avatar vs. coalition vs. domain payoff), not in color-subset permutations.
- **Totality is an interpretation, not a maxim.** Rosewater's stated position is that WUBRG's only unifying idea is the intersection of all five. "Five-color avatars represent planar souls" (Progenitus, Child of Alara) is a supported Vorthos pattern, not an official statement.
- **Do not import colorless here.** The source dossier pairs five-color with colorless, but they are not opposites: five-color is full inclusion, colorless is non-coloration. Colorless is out of scope for a five-color reference and should be audited separately if needed.
- **Source quality.** Claim-bearing five-color content in scope: `mtg_five_color_and_colorless_dossier.md` (primary), corroborated by `MTG_Lore_Research_Enhanced_Final.md`, `colorMTG.txt` (rules), and the Alara codex. The `mark_rosewater_official_misc` transcripts carry **incidental references only** and should not be cited as five-color authorities.
