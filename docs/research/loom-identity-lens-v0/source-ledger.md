# Source ledger — Loom Identity Lens v0

Accessed 2026-08-29. Correction: nine official pages were opened in the original W/R pass because that prompt explicitly requested them. The Owner then required ecosystem-first research. No subsequent external call was made. Those nine rows are retained as **pre-correction external provenance only**: each was checked against the named raw packet, is already materially represented there, and is not necessary to the corrected recommendation. Post-correction external escalations: **zero**.

| Source class | Permitted role in this corrected package |
|---|---|
| Internal primary/governed | Raw faction claim/source/placement packets; frozen semantic contract |
| Internal generated/synthesized | Placement/factions cross-check only |
| Internal card/Scryfall | Local fixed Oracle snapshot facts and legality |
| Internal interpretive/Commander | Deck-facing wording only |
| Pre-correction external provenance | Audit trail only; no new claim dependency |
| Post-correction external gap fill | **None** |

| ID | Tier / status | Scope | Source and locator | Use / bounded claim | Already represented? | Confidence |
|---|---|---|---|---|---|---|
| WOTC-BOROS-2018 | A / canonical | Boros | [A Flavorful Guide to the Guilds of Ravnica](https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-2018-10-03), “The Boros Legion,” Cassie LaBelle, 2018-10-03 | Boros is a military/peacekeeping institution organized to keep peace and enforce law; protection, hierarchy, honor, and the risk of rigidity are setting facts. | Yes: `src_wotc_flavorful_guide_guilds_ravnica_2018` | High |
| WOTC-BOROS-2013-DESIGN | B / design | Boros | [Designing for Boros](https://magic.wizards.com/en/news/making-magic/designing-boros-2013-02-04), “Radiance” / “Battalion,” Mark Rosewater, 2013-02-04 | Army/combat intent and threats-that-double-as-answers; Radiance is explicitly an unsuccessful guild-fit lesson, not a stable ranking feature. | Partly | High |
| WOTC-BOROS-2013-BATTALION | B / design | Boros | [Gatecrashing the Party, Part 2](https://magic.wizards.com/en/news/making-magic/gatecrashing-party-part-2-2013-01-07), “Don’t Boros With the Details,” Mark Rosewater, 2013-01-07 | Battalion was designed for a fast, aggressive coordinated attack / low-curve army. It supports a historical mechanical cue only. | Yes | High |
| WOTC-LOREHOLD-2021-GUIDE | A / canonical | Lorehold | [Planeswalker’s Guide to Strixhaven](https://magic.wizards.com/en/news/feature/planeswalkers-guide-strixhaven-2021-04-01), “Lorehold College” / “Dichotomy of Lorehold,” Doug Beyer and Ari Zirulnik, 2021-04-01 | Archaeomancy: artifacts, ancient texts, historical spirits, fieldwork; red/white tension is discovery/adventure versus order/procedure. | Yes: `src_lorehold_0002` | High |
| WOTC-LOREHOLD-2021-PRODUCT | A / canonical | Lorehold | [Strixhaven: School of Mages](https://magic.wizards.com/en/products/strixhaven), “Lorehold,” Wizards, 2021 | Lorehold presents history as active research and adventure, not merely a graveyard theme. | Yes: `src_lorehold_0001` | High |
| WOTC-STRIX-2021-DESIGN | B / design | Lorehold / contrast | [In the Strixhaven, Part 2](https://magic.wizards.com/en/news/making-magic/strixhaven-part-2-2021-04-05), “University Tour,” Mark Rosewater, 2021-04-05 | The colleges were intentionally given unique academic identities and mechanical identities; direct affiliation must not collapse into matching color pair. | Yes | High |
| WOTC-STRIX-2026-SCHOOL | B / design; pre-correction provenance | Lorehold / contrast | [School’s in Session, Part 2](https://magic.wizards.com/en/news/making-magic/schools-in-session-part-2), “Spilling the Secrets of Strixhaven,” Mark Rosewater, 2026-04-13 | Wizards deliberately made Lorehold diverge from Ravnica Boros; the leaving-graveyard / flashback pattern was a way to make W/R play differently. This supports a recurring mechanical cue, not “graveyard = Lorehold.” | Retained provenance only | High |
| WOTC-STRIX-2026-MECHANICS | B / design; pre-correction provenance | Lorehold | [Secrets of Strixhaven Mechanics](https://magic.wizards.com/en/news/feature/secrets-of-strixhaven-mechanics), “Flashback,” Matt Tabak, 2026-03-31 | 2026 flashback explicitly names Lorehold expeditions as finding past spells. It confirms current design reinforcement, but remains set-specific implementation evidence. | Retained provenance only | High |
| WOTC-STRIX-2026-HANDOFF | B / design; pre-correction provenance | Generalization | [Secrets of Strixhaven Vision Design Handoff, Part 2](https://magic.wizards.com/en/news/making-magic/secrets-of-strixhaven-vision-design-handoff-part-2), “Set Mechanics,” Rosewater/Sardelis, 2026-04-27 | Same two-color pairs can leverage mechanics differently across college/guild settings. This supports the abstraction test, not a ranking coefficient. | Retained provenance only | High |
| SCRYFALL-20260820 | C / card fact | Both | Local `data/scryfall/raw/oracle-cards.json`, manifest `data/scryfall/raw/bulk-manifest.json` | Exact Oracle text, color identity, and Commander legality for every proving-set row. Snapshot is fixed in README. | Existing pipeline | High |
| VM-BOROS-RAW | D / existing research | Boros | `data/raw-factions/boros_legion/{profile,claims,sources,placement,changelog}.json` | Existing canonical/dossier claim structure and explicit boundary against generic aggression and Commander Compass as semantic proof. | N/A | Mixed by individual claim |
| VM-LOREHOLD-RAW | D / existing research | Lorehold | `data/raw-factions/lorehold/{profile,claims,sources,placement,changelog}.json` | Existing canonical/dossier claim structure, source-strength metadata, and explicit Commander Compass boundary. | N/A | Mixed by individual claim |
| VM-MAZE-591 | D / architecture | Both | `docs/contracts/maze-semantic-state-contract.md`; `data/maze/maze-semantic-state-v1.schema.json` | Frozen distinction among hard constraints, preferences, contexts, lenses, recommendation signals, and explanation provenance. Does not authorize runtime change. | N/A | High |

## Excluded evidence classes

- EDHREC, popularity lists, and existing Commander Compass examples were inspected only as potential future behavioral evidence. They are deliberately absent from this v0 evidence basis: no recorded population snapshot or commander-specific cohort was needed to establish the recommended contract.
- Community language is not used to establish Boros/Lorehold truth. Existing VM-578 player-language calibration remains vocabulary/context evidence only and was not duplicated.
- Watermarks, names, flavor words, set codes, and one-off mechanics are not deterministic affinity proof by themselves.
