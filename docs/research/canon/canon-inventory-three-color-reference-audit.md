# Canon Inventory and Three-Color Reference Audit

Date: 2026-05-28

This audit inventories every file under `docs/research/canon` and flags exact references to these three-color targets:

- Names: `Bant`, `Esper`, `Grixis`, `Jund`, `Naya`, `Abzan`, `Sultai`, `Temur`, `Jeskai`, `Mardu`
- Codes: `WUG`, `WUB`, `UBR`, `BRG`, `WRG`, `WBG`, `UBG`, `URG`, `WUR`, `WBR`

## Pre-flight context

- Recent related work is `VM-013`, which documented `ravnica_strixhaven` as the current live baseline and kept Khans / New Capenna expansion as post-v1 architecture only.
- The strongest current planning context is the earlier multicolor expansion research that warns against alias-vs-presentation drift when more three-color identities are added later.
- `docs/research/canon` was not part of the `VM-013` closeout, so this pass treats the canon tree as reference material rather than active schema/runtime scope.
- The canon tree mixes authored canon research, generated identity bundles, raw source notes, RTF/HTML dossier artifacts, and packaged exports. Not every term hit is equally important.
- This report is intentionally stored outside `docs/research/canon` so the canon source tree remains untouched.

## Folder overview

| Top-level folder | File count | What it mainly holds |
|---|---:|---|
| `mark_rosewater_official_three_color` | 10 | Official Rosewater three-color philosophy pieces for all five shards and all five wedges |
| `guild_research` | 4 | Protocol dossiers and research-execution rules for guild, shard, and family worldbuilding |
| `misc` | 32 | Broad lore, platform, archetype, four-color, triome, Tarkir, and general support docs |
| `colorless` | 17 | Colorless dossier work plus supporting source-material notes and reference articles |
| `guilds` | 106 | Ravnica guild-specific Vox Mana research bundles and supporting assets |
| `strixhaven` | 33 | Strixhaven college-specific Vox Mana research bundles and packaged exports |
| `mark_rosewater_official_two_color` | 10 | Official Rosewater two-color philosophy articles for the ten guild pairs |
| `mark_rosewater_official_misc` | 13 | Official color-pie foundation, pairing, conflict, and mono-color philosophy references |

Total files inventoried: `225`

## Inventory

### `mark_rosewater_official_three_color` (10)

- `mark_rosewater_official_three_color/Abzan_We Will Survive _ MAGIC_ THE GATHERING.md` - Official Abzan philosophy article from Rosewater's three-color series, centered on White in the Abzan wedge.
- `mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md` - Official Bant philosophy article from Rosewater's three-color series, centered on White in the Bant shard.
- `mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` - Official Esper philosophy article from Rosewater's three-color series, centered on Blue in the Esper shard.
- `mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` - Official Grixis philosophy article from Rosewater's three-color series, centered on Black in the Grixis shard.
- `mark_rosewater_official_three_color/Jeskai_Smart Thinking _ MAGIC_ THE GATHERING.md` - Official Jeskai philosophy article from Rosewater's three-color series, centered on Blue in the Jeskai wedge.
- `mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md` - Official Jund philosophy article from Rosewater's three-color series, centered on Red in the Jund shard.
- `mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md` - Official Mardu philosophy article from Rosewater's three-color series, centered on Red in the Mardu wedge.
- `mark_rosewater_official_three_color/Naya_Searching Within _ MAGIC_ THE GATHERING.md` - Official Naya philosophy article from Rosewater's three-color series, centered on Green in the Naya shard.
- `mark_rosewater_official_three_color/Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md` - Official Sultai philosophy article from Rosewater's three-color series, centered on Black in the Sultai wedge.
- `mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md` - Official Temur philosophy article from Rosewater's three-color series, centered on Green in the Temur wedge.

### `guild_research` (4)

- `guild_research/Alara Shards Lore Dossier Protocol.rtf` - Protocol dossier for the five Alara shards, directly relevant to Bant/Esper/Grixis/Jund/Naya research.
- `guild_research/MTG Research Profile Execution Rules.md` - Execution rules for assembling MTG research profiles and keeping canon/lore work consistent.
- `guild_research/New Capenna Family Lore Dossier.rtf` - Protocol dossier for the five New Capenna families, useful as shard-alias worldbuilding support.
- `guild_research/Ravnica Guild Dossier Protocol.rtf` - Protocol-style Ravnica guild research dossier for two-color worldbuilding and canon capture.

### `misc` (32)

- `misc/Archscry Architecture_ Mono Color Integration.rtf` - RTF note on integrating mono-color architecture into Archscry.
- `misc/bibliography.md` - General bibliography for the misc canon research cluster.
- `misc/color_pie_articles_for_apocrypha.md` - Curated list of color-pie articles for Apocrypha or lore-reference use.
- `misc/colorMTG.txt` - Raw color-related MTG notes text file.
- `misc/Commander Deckbuilding Advice Resources.rtf` - RTF collection of commander deckbuilding advice sources.
- `misc/commander_deck_list.txt` - Commander deck catalog with many three-color decks labeled by shorthand codes.
- `misc/comprehensive-mtg-lore-history-updated.md` - Broad lore-history survey that explicitly lists shard and wedge identities by color set.
- `misc/Deep_Dive_MTG_Color_Pie_Research.md` - Large color-pie research synthesis reused across identity writing.
- `misc/EDH Content Curation Prompt Engineering.rtf` - Prompt-engineering note for EDH content curation workflows.
- `misc/Ikoria Triome Lore Dossier Protocol.md` - Triome dossier covering Indatha, Raugrin, Zagoth, Savai, and Ketria as three-color biome identities.
- `misc/Interactive Lore Library Design.rtf` - RTF concept doc for an interactive lore library experience.
- `misc/Magic Four-Color Identity Dossier.md` - Research dossier for four-color identity naming, philosophy, and examples.
- `misc/mechanical-color-pie-2017.md` - Mechanical color pie reference for what each color is allowed to do.
- `misc/MTG Archetype Definition and Translation.md` - Archetype definition guide mapping Commander strategies into reusable Vox Mana language.
- `misc/MTG Archetype Definition and Translation.rtf` - RTF version of the Commander archetype definition and translation guide.
- `misc/MTG Commander Site Alternatives.rtf` - RTF survey of alternative MTG commander site concepts or competitors.
- `misc/MTG Platform Architecture Blueprint.md` - Markdown architecture blueprint for the broader MTG platform vision.
- `misc/MTG Platform Architecture Blueprint.rtf` - RTF architecture blueprint for the broader MTG platform vision.
- `misc/MTG Research Profile Execution Rules.rtf` - RTF version of research profile execution rules.
- `misc/mtg_five_color_and_colorless_dossier.md` - Five-color and colorless dossier for higher-order identity research.
- `misc/MTG_Lore_Confidence_Tagged.txt` - Confidence-tagged raw lore notes for later synthesis.
- `misc/MTG_Lore_Research_Enhanced_Final.md` - Large cross-plane lore compendium with shard, wedge, four-color, and character references.
- `misc/mtg-card-types-schema.md` - Reference schema of MTG card types for structured modeling work.
- `misc/sources.md` - General source list for misc canon research materials.
- `misc/Tarkir Clan Lore Dossier Protocol.md` - Markdown wedge dossier covering Abzan, Sultai, Temur, Jeskai, and Mardu in detail.
- `misc/Tarkir Clan Lore Dossier Protocol.rtf` - RTF version of the Tarkir clan lore dossier protocol for wedge/clan worldbuilding.
- `misc/The Metaphysical Ecology of Alara - Interactive Codex.html` - Interactive Alara codex presentation focused on shard ecology and metaphysics.
- `misc/Updating Faction Identity Guidance.rtf` - RTF guidance for revising faction identity docs and standards.
- `misc/Vox Mana - Four-Color Identity Dossier.html` - HTML dossier focused on four-color identities and their Vox Mana framing.
- `misc/vox_mana_color_bible_placement_engine_spec.md` - Internal placement-engine spec and color bible for Vox Mana behavior.
- `misc/vox_mana_comprehensive_analysis.md` - Broad Vox Mana product/research synthesis with example placement ideas, including some three-color mentions.
- `misc/vox-mana-semiotics-300-char-blocks.md` - Short-form semiotic blocks for expressing Vox Mana color identity language.

### `colorless` (17)

- `colorless/colorless_DMP.md` - Colorless dossier or metaphysics working document for the colorless identity lane.
- `colorless/colorless-evidence-map.md` - Evidence map consolidating source support for the colorless identity track.
- `colorless/source-material/06_Color_Pie_Framework_and_Philosophy.md` - Color-pie framework note used to ground the colorless research thread.
- `colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md` - Colorless research note on cross-color dynamics and inter-color relationships.
- `colorless/source-material/08_Ludic_Evolution_and_Commander_Format_Impact.md` - Colorless research note on gameplay evolution and Commander impact.
- `colorless/source-material/09_Sources_and_Bibliography.md` - Bibliography for the colorless source-material stack.
- `colorless/source-material/All 26 Color Combinations of Magic_ Guilds, Clans, Wedges, and Names - Draftsim.md` - Reference article enumerating guild, shard, wedge, and related naming conventions across all color combinations.
- `colorless/source-material/Colorless - Concept vs. Execution _ MAGIC_ THE GATHERING_markRosewater.md` - Official Rosewater article on how colorless works in concept versus implementation.
- `colorless/source-material/colorless and phyexian research.md` - Working note on overlap or tension between colorless and Phyrexian material.
- `colorless/source-material/colorless.txt` - Raw text notes for the colorless research set.
- `colorless/source-material/colorless_identity.md` - Focused identity note on what colorless means philosophically and mechanically.
- `colorless/source-material/colorless_magic_cleaned.md` - Cleaned colorless research compilation.
- `colorless/source-material/colorless_metaphysics.md` - Metaphysics-focused note for the colorless identity track.
- `colorless/source-material/combined_colorless.md` - Combined colorless research synthesis document.
- `colorless/source-material/Deep Dive MTG Color Pie Research.md` - Color-pie deep dive copied into the colorless source stack for reference.
- `colorless/source-material/refined_colorless.md` - Refined colorless synthesis after earlier raw-note passes.
- `colorless/source-material/The Colorless Mana Symbol.txt` - Short reference note on the colorless mana symbol.

### `guilds` (106)

#### `guilds/azorius`

- `guilds/azorius/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/azorius/azorius.md` - Main Azorius research or identity note.
- `guilds/azorius/azorius_animation_spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/azorius/azorius_cards.csv` - Azorius card anchor dataset.
- `guilds/azorius/azorius_code.md` - Azorius code or implementation-focused note.
- `guilds/azorius/azorius_narrative_taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `guilds/azorius/azorius_narrative_taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `guilds/azorius/azorius_structural_matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/azorius/azorius_structural_matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/azorius/azorius_translation_layer_functions.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.
- `guilds/azorius/azorius_translation_layer_functions.json` - Machine-readable translation-layer function map for the identity bundle.

#### `guilds/boros`

- `guilds/boros/animation_boros.css` - Boros-specific animation stylesheet for sigil or motion experiments.
- `guilds/boros/animation_boros.js` - Boros-specific animation implementation script rather than a JSON spec export.
- `guilds/boros/boros_cards.csv` - Card or support dataset tied to the identity bundle.
- `guilds/boros/boros_flavor_generator.py` - Python helper for Boros flavor-generation experiments.
- `guilds/boros/boros_flavor_generator_template.json` - Template data for Boros flavor-generation experiments.
- `guilds/boros/boros_microcopy.txt` - Boros microcopy draft text.
- `guilds/boros/boros_README.md` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/boros/boros_research.md` - Main Boros research note or synthesis document.
- `guilds/boros/boros_sample_cards.md` - Boros sample card notes used as support material.
- `guilds/boros/boros_sigil.svg` - Boros sigil artwork asset.
- `guilds/boros/boros_spec.md` - Boros-specific design or implementation spec.
- `guilds/boros/boros_structural_matrix_boros_matrix.json` - Boros structural matrix in a custom-named JSON export.

#### `guilds/dimir`

- `guilds/dimir/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/dimir/dimir_animation_spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/dimir/dimir_narrative_taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `guilds/dimir/dimir_narrative_taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `guilds/dimir/dimir_sigil_animation.md` - Dimir sigil-animation note or motion concept.
- `guilds/dimir/dimir_structural_matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/dimir/dimir_structural_matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/dimir/dimir_taxonomy.md` - Alternate or earlier Dimir taxonomy note in markdown.
- `guilds/dimir/dimir_Translation layer functions.md` - Markdown explanation of Dimir translation-layer functions.
- `guilds/dimir/dimir_translation_layer_functions.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.
- `guilds/dimir/dimir_translation_layer_functions.json` - Machine-readable translation-layer function map for the identity bundle.

#### `guilds/golgari`

- `guilds/golgari/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/golgari/SOURCES.md` - Source notes and grounding guardrails for the identity bundle.
- `guilds/golgari/golgari_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.
- `guilds/golgari/golgari-animation-spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/golgari/golgari-animation-spec.md` - Human-readable animation or UI motion spec for the identity bundle.
- `guilds/golgari/golgari-narrative-taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `guilds/golgari/golgari-narrative-taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `guilds/golgari/golgari-structural-matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/golgari/golgari-structural-matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/golgari/golgari-translation-layer.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.

#### `guilds/gruul`

- `guilds/gruul/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/gruul/SOURCES.md` - Source notes and grounding guardrails for the identity bundle.
- `guilds/gruul/gruul.md` - Main Gruul research or identity note.
- `guilds/gruul/gruul_animations.md` - Human-readable animation or motion concept note for Gruul.
- `guilds/gruul/gruul_cards.csv` - Card or support dataset tied to the identity bundle.
- `guilds/gruul/gruul_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.
- `guilds/gruul/gruul-animation-spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/gruul/gruul-animation-spec.md` - Human-readable animation or UI motion spec for the identity bundle.
- `guilds/gruul/gruul-narrative-taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `guilds/gruul/gruul-narrative-taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `guilds/gruul/gruul-structural-matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/gruul/gruul-structural-matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/gruul/gruul-translation-layer.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.
- `guilds/gruul/manifest.json` - Package manifest describing the bundle contents.

#### `guilds/izzet`

- `guilds/izzet/izzet_full.csv` - Izzet support dataset or full-card export.
- `guilds/izzet/izzit_animation_spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/izzet/izzit_narrative_taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `guilds/izzet/izzit_structural_matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/izzet/izzit_structural_matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/izzet/izzit_structural_matrix.xlsx` - Spreadsheet structural matrix working artifact for the identity bundle.

#### `guilds/orzhov`

- `guilds/orzhov/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/orzhov/narrative_taxonomy.json` - Machine-readable narrative taxonomy for the Orzhov bundle.
- `guilds/orzhov/orzhov_animation_spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/orzhov/Orzhov_animation_spec.md.txt` - Text-export version of the Orzhov animation spec.
- `guilds/orzhov/orzhov_narrative_taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `guilds/orzhov/orzhov_narrative_taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `guilds/orzhov/orzhov_structural_matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/orzhov/orzhov_structural_matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/orzhov/orzhov_translation_layer_functions.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.
- `guilds/orzhov/orzhov_translation_layer_functions.json` - Machine-readable translation-layer function map for the identity bundle.
- `guilds/orzhov/orzhov_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.
- `guilds/orzhov/translation_layer.py.txt` - Draft Python translation-layer reference for Orzhov.

#### `guilds/rakdos`

- `guilds/rakdos/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/rakdos/manifest.json` - Package manifest describing the bundle contents.
- `guilds/rakdos/rakdos_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.
- `guilds/rakdos/rakdos-animation-spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/rakdos/rakdos-animation-spec.md` - Human-readable animation or UI motion spec for the identity bundle.
- `guilds/rakdos/rakdos-narrative-taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `guilds/rakdos/rakdos-structural-matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/rakdos/rakdos-structural-matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/rakdos/rakdos-translation-layer.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.

#### `guilds/selesnya`

- `guilds/selesnya/README.txt` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/selesnya/narrative_taxonomy.json` - Machine-readable narrative taxonomy for the Selesnya bundle.
- `guilds/selesnya/selesnya_animation_spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/selesnya/selesnya_animation_spec.txt` - Text version of the Selesnya animation spec.
- `guilds/selesnya/selesnya_structural_matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/selesnya/selesnya_structural_matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/selesnya/tests_translation_layer.txt` - Selesnya translation-layer test notes.
- `guilds/selesnya/translation_layer.txt` - Selesnya translation-layer draft text.

#### `guilds/simic`

- `guilds/simic/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/simic/README.txt` - Bundle overview explaining contents, scope, and integration intent.
- `guilds/simic/simic_animation_spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `guilds/simic/simic_cards.csv` - Card or support dataset tied to the identity bundle.
- `guilds/simic/simic_cards.json` - Card or support dataset tied to the identity bundle.
- `guilds/simic/simic_narrative_taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `guilds/simic/simic_narrative_taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `guilds/simic/simic_structural_matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `guilds/simic/simic_structural_matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `guilds/simic/simic_translation.txt` - Text or draft translation-layer reference for the identity bundle.
- `guilds/simic/simic_translation_layer_functions.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.
- `guilds/simic/simic_translation_layer_functions.json` - Machine-readable translation-layer function map for the identity bundle.
- `guilds/simic/simic_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.

### `strixhaven` (33)

#### `strixhaven/lorehold`

- `strixhaven/lorehold/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `strixhaven/lorehold/lorehold_animation_spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `strixhaven/lorehold/lorehold_narrative_taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `strixhaven/lorehold/lorehold_narrative_taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `strixhaven/lorehold/lorehold_structural_matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `strixhaven/lorehold/lorehold_structural_matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `strixhaven/lorehold/lorehold_translation_layer_functions.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.
- `strixhaven/lorehold/lorehold_translation_layer_functions.json` - Machine-readable translation-layer function map for the identity bundle.
- `strixhaven/lorehold/lorehold_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.
- `strixhaven/lorehold/manifest.json` - Package manifest describing the bundle contents.

#### `strixhaven/prismari`

- `strixhaven/prismari/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `strixhaven/prismari/manifest.json` - Package manifest describing the bundle contents.
- `strixhaven/prismari/prismari_animation_spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `strixhaven/prismari/prismari_narrative_taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `strixhaven/prismari/prismari_narrative_taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `strixhaven/prismari/prismari_structural_matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `strixhaven/prismari/prismari_structural_matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `strixhaven/prismari/prismari_translation_layer_functions.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.
- `strixhaven/prismari/prismari_translation_layer_functions.json` - Machine-readable translation-layer function map for the identity bundle.
- `strixhaven/prismari/prismari_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.

#### `strixhaven/quandrix`

- `strixhaven/quandrix/quandrix_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.

#### `strixhaven/silverquill`

- `strixhaven/silverquill/silverquill_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.

#### `strixhaven/witherbloom`

- `strixhaven/witherbloom/README.md` - Bundle overview explaining contents, scope, and integration intent.
- `strixhaven/witherbloom/SOURCES.md` - Source notes and grounding guardrails for the identity bundle.
- `strixhaven/witherbloom/manifest.json` - Package manifest describing the bundle contents.
- `strixhaven/witherbloom/witherbloom_vox_mana_bundle.zip` - Packaged export of the sibling Vox Mana identity bundle.
- `strixhaven/witherbloom/witherbloom-animation-spec.json` - Machine-readable animation or UI motion spec for the identity bundle.
- `strixhaven/witherbloom/witherbloom-animation-spec.md` - Human-readable animation or UI motion spec for the identity bundle.
- `strixhaven/witherbloom/witherbloom-narrative-taxonomy.json` - Machine-readable narrative taxonomy for the identity bundle.
- `strixhaven/witherbloom/witherbloom-narrative-taxonomy.md` - Human-readable narrative taxonomy for the identity bundle.
- `strixhaven/witherbloom/witherbloom-structural-matrix.csv` - Review-friendly structural matrix for the identity bundle.
- `strixhaven/witherbloom/witherbloom-structural-matrix.json` - Structured structural matrix for bundle ingestion or scripted reuse.
- `strixhaven/witherbloom/witherbloom-translation-layer.js` - JavaScript translation-layer adapter or function scaffold for the identity bundle.

### `mark_rosewater_official_two_color` (10)

- `mark_rosewater_official_two_color/azorius_Slow and Steady _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Azorius.
- `mark_rosewater_official_two_color/boros_Disorderly Conduct _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Boros.
- `mark_rosewater_official_two_color/dimir_Pretty Sneaky Sis _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Dimir.
- `mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Golgari.
- `mark_rosewater_official_two_color/gruul_Aaaargh!!! _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Gruul.
- `mark_rosewater_official_two_color/izzit_Creative Differences _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Izzet.
- `mark_rosewater_official_two_color/orzhov_Playing By Their Own Rules _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Orzhov.
- `mark_rosewater_official_two_color/rakdos_Hedonism With Attitude _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Rakdos.
- `mark_rosewater_official_two_color/selesnya_Group Think _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Selesnya.
- `mark_rosewater_official_two_color/simic_Improving Upon Nature _ MAGIC_ THE GATHERING.md` - Official Rosewater two-color philosophy article focused on Simic.

### `mark_rosewater_official_misc` (13)

- `mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md` - Official discussion of allied-color pair logic and overlap.
- `mark_rosewater_official_misc/Black_Philosophy_Drive_to_Work_Podcast_Transcript.md` - Podcast transcript capturing Black's core philosophy from an official design source.
- `mark_rosewater_official_misc/Blue_Philosophy_Drive_to_Work_Podcast_Transcript.md` - Podcast transcript capturing Blue's core philosophy from an official design source.
- `mark_rosewater_official_misc/Colors_Answer_Questions_Mailbag_2018.md` - Official mailbag of color-philosophy Q&A with broad reference value.
- `mark_rosewater_official_misc/Colors_Answer_Questions_Mailbag_2019.md` - Official mailbag of color-philosophy Q&A with later clarifications and examples.
- `mark_rosewater_official_misc/Enemy_Color_Conflicts_Explained.md` - Companion explainer on why enemy colors clash and how their tensions read in design.
- `mark_rosewater_official_misc/Enemy_Color_Philosophy_Conflicts.md` - Official discussion of enemy-color philosophical conflict patterns.
- `mark_rosewater_official_misc/Flavor_vs_Function_in_Magic_Design.md` - Official design article on flavor/function tension, useful for identity interpretation.
- `mark_rosewater_official_misc/Green_Philosophy_Drive_to_Work_Podcast_Transcript.md` - Podcast transcript capturing Green's core philosophy from an official design source.
- `mark_rosewater_official_misc/IM_Conversations_with_Colors_Allied_Week.md` - Official color-philosophy piece about allied-color pair relationships.
- `mark_rosewater_official_misc/Red_Philosophy_Drive_to_Work_Podcast_Transcript.md` - Podcast transcript capturing Red's core philosophy from an official design source.
- `mark_rosewater_official_misc/White_Philosophy_Drive_to_Work_Podcast_Transcript.md` - Podcast transcript capturing White's core philosophy from an official design source.
- `mark_rosewater_official_misc/Why_Color_Pie_Matters_Design_Philosophy.md` - Rosewater design-philosophy explainer on why the color pie matters as a foundational lens.

## Three-color hit register

- `docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `BANT`
- `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md` - `Primary identity source` - Hits: `ESPER`
- `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `BANT`, `GRIXIS`
- `docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `JUND`
- `docs/research/canon/mark_rosewater_official_three_color/Naya_Searching Within _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `BANT`, `GRIXIS`, `NAYA`
- `docs/research/canon/mark_rosewater_official_three_color/Abzan_We Will Survive _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `ABZAN`, `ESPER`, `JUND`, `MARDU`
- `docs/research/canon/mark_rosewater_official_three_color/Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `ABZAN`, `JESKAI`, `MARDU`, `SULTAI`
- `docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `ABZAN`, `JESKAI`, `MARDU`, `SULTAI`, `TEMUR`
- `docs/research/canon/mark_rosewater_official_three_color/Jeskai_Smart Thinking _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `ABZAN`, `JESKAI`
- `docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md` - `Primary identity source` - Hits: `ABZAN`, `JESKAI`, `MARDU`
- `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` - `Lore / protocol dossier` - Hits: `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`
- `docs/research/canon/guild_research/New Capenna Family Lore Dossier.rtf` - `Lore / protocol dossier` - Hits: `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`
- `docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.md` - `Lore / protocol dossier` - Hits: `ABZAN`, `JESKAI`, `MARDU`, `SULTAI`, `TEMUR`
- `docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.rtf` - `Lore / protocol dossier` - Hits: `ABZAN`, `JESKAI`, `MARDU`, `SULTAI`, `TEMUR`
- `docs/research/canon/misc/Ikoria Triome Lore Dossier Protocol.md` - `Lore / protocol dossier` - Hits: `WBG`
- `docs/research/canon/misc/comprehensive-mtg-lore-history-updated.md` - `Support reference` - Hits: `ABZAN`, `BANT`, `ESPER`, `GRIXIS`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `SULTAI`, `TEMUR`
- `docs/research/canon/misc/commander_deck_list.txt` - `Deck-list / catalog reference` - Hits: `BRG`, `UBG`, `UBR`, `URG`, `WBG`, `WBR`, `WRG`, `WUB`, `WUG`, `WUR`
- `docs/research/canon/misc/MTG_Lore_Research_Enhanced_Final.md` - `Support reference` - Hits: `ABZAN`, `BANT`, `BRG`, `ESPER`, `GRIXIS`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `SULTAI`, `TEMUR`, `UBR`, `WUB`, `WUG`
- `docs/research/canon/misc/MTG_Lore_Confidence_Tagged.txt` - `Support reference` - Hits: `ABZAN`, `BANT`, `ESPER`, `GRIXIS`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `SULTAI`, `TEMUR`
- `docs/research/canon/misc/Magic Four-Color Identity Dossier.md` - `Support reference` - Hits: `ABZAN`, `BANT`, `ESPER`, `GRIXIS`, `JESKAI`, `JUND`, `NAYA`, `SULTAI`, `TEMUR`
- `docs/research/canon/misc/vox_mana_comprehensive_analysis.md` - `Support reference` - Hits: `ESPER`, `SULTAI`, `WUB`
- `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html` - `Support reference` - Hits: `BANT`, `BRG`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`, `UBR`, `WUB`
- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md` - `Support reference` - Hits: `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`
- `docs/research/canon/misc/colorMTG.txt` - `Support reference` - Hits: `ABZAN`, `BANT`, `ESPER`, `GRIXIS`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `SULTAI`, `TEMUR`
- `docs/research/canon/misc/mechanical-color-pie-2017.md` - `Incidental mention` - Hits: `JESKAI`
- `docs/research/canon/misc/mtg_five_color_and_colorless_dossier.md` - `Support reference` - Hits: `ESPER`
- `docs/research/canon/colorless/source-material/All 26 Color Combinations of Magic_ Guilds, Clans, Wedges, and Names - Draftsim.md` - `Support reference` - Hits: `ABZAN`, `BANT`, `BRG`, `ESPER`, `GRIXIS`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `SULTAI`, `TEMUR`, `UBR`, `WBG`, `WUB`, `WUG`
- `docs/research/canon/colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md` - `Support reference` - Hits: `ABZAN`, `BANT`, `ESPER`, `GRIXIS`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `SULTAI`, `TEMUR`
- `docs/research/canon/colorless/source-material/colorless and phyexian research.md` - `Incidental mention` - Hits: `GRIXIS`, `UBR`
- `docs/research/canon/colorless/source-material/combined_colorless.md` - `Support reference` - Hits: `ABZAN`, `BANT`, `BRG`, `ESPER`, `GRIXIS`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `SULTAI`, `TEMUR`, `UBR`, `WBG`, `WUB`, `WUG`
- `docs/research/canon/guilds/rakdos/rakdos_vox_mana_bundle.zip` - `Incidental mention` - Raw binary scan surfaced `WBG`, but this packaged export is not a meaningful semantic three-color source.

## Best starting docs

### Best shard docs

- `docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md`
- `docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_three_color/Naya_Searching Within _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf`

### Best wedge docs

- `docs/research/canon/mark_rosewater_official_three_color/Abzan_We Will Survive _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_three_color/Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_three_color/Jeskai_Smart Thinking _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.md`

### Best broad support docs

- `docs/research/canon/misc/comprehensive-mtg-lore-history-updated.md`
- `docs/research/canon/misc/MTG_Lore_Research_Enhanced_Final.md`
- `docs/research/canon/misc/commander_deck_list.txt`
- `docs/research/canon/misc/Ikoria Triome Lore Dossier Protocol.md`
- `docs/research/canon/colorless/source-material/All 26 Color Combinations of Magic_ Guilds, Clans, Wedges, and Names - Draftsim.md`
- `docs/research/canon/guild_research/New Capenna Family Lore Dossier.rtf`

## Notes

- The `guilds` and `strixhaven` folders are dominated by repeatable bundle artifacts: structural matrices, narrative taxonomies, animation specs, translation layers, manifests, readmes, and packaged exports.
- Several files in `misc` and `colorless/source-material` contain three-color references only as side-support material rather than as their primary topic.
- Shard/wedge name hits in packaged exports should be treated cautiously because raw binary scans can produce misleading matches.
