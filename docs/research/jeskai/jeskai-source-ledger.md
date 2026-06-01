# Jeskai Source Ledger

Status: VM-229 approved source ledger
Key: `JESKAI`
Permutation handling: `URW`, `WUR`, `RWU`, `UWR`, `RUW`, and `WRU` remain metadata/query-only in VM-229

## Source Classification

| ID | Source | Path | Role | Claim Use | Limits |
| --- | --- | --- | --- | --- | --- |
| JESKAI-SRC-001 | MaRo Jeskai three-color article | `docs/research/canon/mark_rosewater_official_three_color/Jeskai_Smart Thinking _ MAGIC_ THE GATHERING.md` | Official color/design source | Blue-centered Jeskai wedge, Red/White supports, cunning, mechanics such as prowess and spell interaction | Not a Tarkir geography or story source |
| JESKAI-SRC-002 | Planeswalker's Guide to Khans of Tarkir, Part 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md` | Official Khans-era Tarkir source | Jeskai Way culture, strongholds, Ways, fires, clan structure, Narset, dragon-cunning reverence | Khans-era frame only |
| JESKAI-SRC-003 | Planeswalker's Guide to Fate Reforged | `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md` | Official alternate-timeline/past Tarkir source | Shu Yun, Jeskai anti-dragon posture, Ojutai as cunning ideal, pre-Dragonlord context | Must not be used as Dragons-era Ojutai continuity proof without source support |
| JESKAI-SRC-004 | Khanfall | `docs/research/canon/source-material/tarkir/story-khanfall.md` | Official story source | Shu Yun, Annals, Dirgur, Ugin, Ojutai transition, fall/erasure of Jeskai | Story-scoped; do not generalize beyond cited events |
| JESKAI-SRC-005 | Planeswalker's Guide to Dragons of Tarkir, Part 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md` | Official Dragons-era boundary source | Ojutai clan, Ojutai monastic order, Narset discovering forbidden past | Boundary evidence; not direct Khans-era Jeskai proof |
| JESKAI-SRC-006 | Planeswalker's Guide to Tarkir: Dragonstorms, Part 1 | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-1.md` | Official modern Tarkir source | Revived modern Jeskai, Narset, Stormnexus, modern Way, monasteries, rejection of Ojutai doctrine | Modern/Dragonstorm-era only unless explicitly bridging backward |
| JESKAI-SRC-007 | Canon inventory three-color audit | `docs/research/canon/canon-inventory-three-color-reference-audit.md` | Repo-truth source inventory | Confirms local capture roles and gaps | Inventory/source-selection proof only |
| JESKAI-SRC-008 | Enhanced Commander recommendations JSONL | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` | Repo support data | WUR/URW Commander operator rows and theme hints | support-only; not lore proof or legality proof |
| JESKAI-SRC-009 | Blue philosophy transcript | `docs/research/canon/mark_rosewater_official_misc/Blue_Philosophy_Drive_to_Work_Podcast_Transcript.md` | Official color philosophy support | Blue perfection, knowledge, deliberation, and tools as metaphysics support | Color support only |
| JESKAI-SRC-010 | Red philosophy transcript | `docs/research/canon/mark_rosewater_official_misc/Red_Philosophy_Drive_to_Work_Podcast_Transcript.md` | Official color philosophy support | Red emotion, action, freedom as metaphysics support | Color support only |
| JESKAI-SRC-011 | White philosophy transcript | `docs/research/canon/mark_rosewater_official_misc/White_Philosophy_Drive_to_Work_Podcast_Transcript.md` | Official color philosophy support | White order, structure, peace, community as metaphysics support | Color support only |
| JESKAI-SRC-012 | Azorius color-pair article | `docs/research/canon/mark_rosewater_official_two_color/azorius_Slow and Steady _ MAGIC_ THE GATHERING.md` | Official two-color support | White/Blue overlap and restraint/order support | Pair support only; not Jeskai clan proof |
| JESKAI-SRC-013 | Boros color-pair article | `docs/research/canon/mark_rosewater_official_two_color/boros_Disorderly Conduct _ MAGIC_ THE GATHERING.md` | Official two-color support | Red/White action/structure tension support | Pair support only; not Jeskai clan proof |
| JESKAI-SRC-014 | Allied color pairings explainer | `docs/research/canon/mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md` | Official color support | Color-pair framework support | Pair support only; does not supply local UR article proof |
| JESKAI-SRC-015 | Seed: deep research report | `docs/research/jeskai/source-material/Jeskai Way Deep Research Report.md` | Preserved seed input | Discovery-only crosscheck candidate | Not approved evidence unless audited |
| JESKAI-SRC-016 | Seed: lore source packet | `docs/research/jeskai/source-material/jeskai-way-lore-source-packet.md` | Preserved seed input | Discovery-only crosscheck candidate | Not approved evidence unless audited |
| JESKAI-SRC-017 | Seed: HTML report | `docs/research/jeskai/source-material/jeskai_way_research_report.html` | Preserved seed input | Discovery-only crosscheck candidate | Generated HTML cannot cite itself as canon |

## Official Evidence Anchors

| Anchor | Source Refs | Evidence Role |
| --- | --- | --- |
| Blue-centered Jeskai wedge | `JESKAI-SRC-001:7-19`, `JESKAI-SRC-001:137-247` | Proves the color design center and broad URW identity |
| Cunning and interactive mechanics | `JESKAI-SRC-001:21-70` | Proves design attribute and a mechanics vocabulary including prowess |
| Khans-era Jeskai culture | `JESKAI-SRC-002:315-430` | Proves martial artists, mystics, wandering warriors, discipline, enlightenment, artisanship, tradition, strongholds, and Ways |
| Khans-era fires and strongholds | `JESKAI-SRC-002:431-520` | Proves six fire language, stronghold locations, magic, Narset, and clan roles |
| Fate Reforged Shu Yun/Ojutai context | `JESKAI-SRC-003:235-251`, `JESKAI-SRC-003:305-311` | Proves pre-Dragonlord Jeskai/Ojutai relationship boundaries |
| Khanfall transition | `JESKAI-SRC-004:215-253`, `JESKAI-SRC-004:317-399`, `JESKAI-SRC-004:463-557` | Proves Shu Yun, Annals, Ugin choice, Ojutai confrontation, and Jeskai erasure |
| Dragons-era Ojutai boundary | `JESKAI-SRC-005:223-329` | Proves Ojutai clan differs from Khans-era Jeskai and provides Narset boundary |
| Modern revived Jeskai | `JESKAI-SRC-006:231-251`, `JESKAI-SRC-006:427-557` | Proves Dragonstorm-era revived Jeskai and modern Way material |

## Commander Support Rows

These rows are support-only. They can support search/operator copy and product vocabulary, but they cannot prove Tarkir lore, Commander legality, card text, or canon narrative.

| ID | JSONL Line | Name | Identity | Support Note |
| --- | --- | --- | --- | --- |
| JESKAI-CMD-001 | 3 | Counter Intelligence | White; Blue; Red | WUR artifact/proliferate operator support |
| JESKAI-CMD-002 | 10 | Jeskai Striker | White; Blue; Red | WUR spells/prowess/copy support |
| JESKAI-CMD-003 | 22 | Family Matters | Blue; Red; White | URW creature-copy support |
| JESKAI-CMD-004 | 26 | Creative Energy | Blue; Red; White | URW energy support |
| JESKAI-CMD-005 | 32 | Science! | Blue; Red; White | URW artifacts/energy support |
| JESKAI-CMD-006 | 40 | Mystic Intellect | Blue; Red; White | URW flashback/spellslinger support |
| JESKAI-CMD-007 | 98 | Timeless Wisdom | Blue; Red; White | URW cycling support |
| JESKAI-CMD-008 | 105 | Timey-Wimey | Blue; Red; White | URW suspend/time-counter support |
| JESKAI-CMD-009 | 111 | Planeswalker Party | White; Blue; Red | WUR planeswalker/proliferate support |
| JESKAI-CMD-010 | 116 | Riders of Rohan | Blue; Red; White | URW Humans/monarch support |
| JESKAI-CMD-011 | 121 | Divine Convocation | Blue; Red; White | URW convoke support |

## Exclusions

- No external web research was added.
- No unsourced lore summary is promoted.
- No generated report or generated HTML is cited as canon.
- No Sultai, Temur, or Mardu packet content is used to prove Jeskai claims.
- No raw-faction JSON, runtime registry, route, fixture, schema, Supabase, Home, Maze, generated file, or architecture file is authorized by this source ledger.
