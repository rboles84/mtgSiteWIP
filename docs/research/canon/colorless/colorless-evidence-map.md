# Colorless Evidence Map

## Purpose

This evidence map supports the first colorless identity/metaphysics authoring pass. It classifies claims before drafting so colorless is treated as a foundational non-color source set, not as a sixth mono color.

## Allowed Source Material

- `docs/research/colorless/source-material/colorless_magic_cleaned.md`
- `docs/research/colorless/source-material/colorless_identity.md`
- `docs/research/colorless/source-material/colorless_metaphysics.md`

Other files in `docs/research/colorless/source-material/` may be useful for a later audit, but they are out of scope for this pass unless a future task explicitly expands the source set.

## Claim Classes

- `supported`: Directly stated in the allowed source material.
- `inferred`: Vox Mana interpretation derived from supported claims. These may be used in authored docs only as interpretation, not as direct asserted canon.
- `unsupported`: Present in the bundle as unknown, unstable, off-topic, or insufficiently grounded. These must not be used in authored docs.

## Supported Claims

### Rules and Game Objects

| Claim | Source support | Authoring use |
|---|---|---|
| Colorless has two in-game meanings: an object with no color and a type of mana represented by `{C}`. | `colorless_magic_cleaned.md`, Overview; Comprehensive Rules & Game Mechanics | Use as the mechanical foundation. |
| Colorless is not a color and does not appear on the color wheel. | `colorless_magic_cleaned.md`, Overview; `colorless_identity.md`, Philosophical Distinctions | State directly and repeatedly. |
| Colorless is not a sixth color, even when it sometimes functions like one in deckbuilding. | `colorless_magic_cleaned.md`, Overview; History of Colorless Mana | Use as a guardrail. Do not frame colorless as a sixth mono color. |
| Objects with no colored mana symbols in their mana costs are colorless. | `colorless_magic_cleaned.md`, Rule 202.2b | Use in mechanical identity. |
| The colorless mana symbol `{C}` represents one colorless mana and a cost payable only with colorless mana. | `colorless_magic_cleaned.md`, Rule 107.4c | Use in mana-symbol section and operator signals. |
| Generic mana is a type of cost, not a type of mana; colorless mana can pay generic costs, but generic costs can be paid by any mana. | `colorless_magic_cleaned.md`, Colorless Mana vs. Generic Mana | Use to prevent generic/colorless confusion. |
| Effects that add mana represented by a generic symbol add that much colorless mana. | `colorless_magic_cleaned.md`, Rule 106.10 | Use sparingly as a rules note. |
| Lands are colorless by default unless another effect or indicator gives color. | `colorless_magic_cleaned.md`, Colorless Objects | Use only as rules context, not as identity flavor. |
| Artifacts are the most common colorless spell type. | `colorless_magic_cleaned.md`, Colorless Objects | Use in artifact/function face. |
| Eldrazi creatures were made colorless to mark them as alien. | `colorless_magic_cleaned.md`, Colorless Objects | Use in Eldrazi/void face. |
| Karn and Ugin are colorless planeswalkers. | `colorless_magic_cleaned.md`, Colorless Objects; `colorless_identity.md`, Transcendence; `colorless_metaphysics.md`, Face Three | Use in Ugin-Karn/transcendence face. |

### Commander and Product-Adjacent Implications

| Claim | Source support | Authoring use |
|---|---|---|
| Colorless does not contribute to a card's color identity. | `colorless_magic_cleaned.md`, Color Identity in Commander | Use as Commander grounding. |
| Colorless cards can fit into any Commander deck. | `colorless_magic_cleaned.md`, Color Identity in Commander | Use as operational interpretation for accessibility, not as a philosophy. |
| A deck with a colorless commander must be colorless. | `colorless_magic_cleaned.md`, Color Identity in Commander | Use as Commander-specific constraint. |
| Command Tower does not work in colorless Commander decks because it asks for a color. | `colorless_magic_cleaned.md`, Color Identity in Commander; Important Card Interactions | Use in mana-symbol/land operator signals. |
| Treasure tokens cannot produce `{C}` because they ask for a color of mana. | `colorless_magic_cleaned.md`, Important Card Interactions | Use as a rules nuance if needed. |
| Reflecting Pool can produce `{C}` if another controlled land can produce colorless mana. | `colorless_magic_cleaned.md`, Important Card Interactions | Use as a rules nuance if needed. |
| Snow is not a mana type or color; `{S}` is a cost paid with mana from a snow source. | `colorless_magic_cleaned.md`, Important Card Interactions | Use only if contrasting mana symbols. |

### Colorless Mana History

| Claim | Source support | Authoring use |
|---|---|---|
| Colorless mana existed from Alpha through cards such as Basalt Monolith, Mana Vault, and Sol Ring. | `colorless_magic_cleaned.md`, History of Colorless Mana | Use as historical grounding. |
| From Onslaught onward, templating used numerical symbols for colorless mana output, creating ambiguity with generic costs. | `colorless_magic_cleaned.md`, History of Colorless Mana | Use to explain why `{C}` matters. |
| Oath of the Gatewatch introduced the `{C}` symbol and required Oracle updates for older cards. | `colorless_magic_cleaned.md`, History of Colorless Mana | Use as historical grounding. |
| Wastes was introduced in Oath of the Gatewatch as a basic land that taps for `{C}`. | `colorless_magic_cleaned.md`, Wastes | Use in mana-symbol/land usage. |
| Wastes has no basic land type and cannot be chosen by effects that ask for a basic land type. | `colorless_magic_cleaned.md`, Wastes | Use in mana-symbol/land usage. |
| Generating colorless mana is evergreen; costs requiring explicit `{C}` are non-evergreen/deciduous and used sparingly. | `colorless_magic_cleaned.md`, Set Availability | Use as design-space constraint. |
| The Brothers' War vision design explored colorless mana as a pseudo-sixth color and abandoned it because it did not feel right. | `colorless_magic_cleaned.md`, Set Availability | Use as direct support for rejecting sixth-color framing. |

### Mechanics and Design Space

| Claim | Source support | Authoring use |
|---|---|---|
| Colorless cards can access effects from across the color pie, usually at inefficient mana costs. | `colorless_magic_cleaned.md`, Colorless Objects; `colorless_identity.md`, Design Reality | Use in mechanical identity and weaknesses. |
| Devoid makes a card colorless regardless of the colors in its mana cost. | `colorless_magic_cleaned.md`, Keyword Abilities & Mechanics | Use in Eldrazi/void and operator signals. |
| Devoid let R&D make many Eldrazi/colorless-matters cards without making all of them generic-cost cards playable everywhere. | `colorless_magic_cleaned.md`, Design Philosophy Insights | Use as design philosophy support. |
| Annihilator, ingest, cast triggers, exile effects, and `{C}` costs are source-supported Eldrazi/colorless signals. | `colorless_magic_cleaned.md`, Lore & Philosophical Profiles; `colorless_identity.md`, Face Two | Use in Eldrazi/void section and operator signals. |
| Artifacts support fast mana, equipment/Voltron, combo engines, cost reduction, and modular utility. | `colorless_identity.md`, Face One; `colorless_metaphysics.md`, Face One | Use in artifact/function section and operator signals. |
| Artifacts trade universal access and flexibility for inefficiency and vulnerability to artifact hate. | `colorless_identity.md`, Design Reality; `colorless_metaphysics.md`, Vulnerability Matrix | Use in weaknesses and gameplay philosophy. |

### Lore and Philosophical Profiles

| Claim | Source support | Authoring use |
|---|---|---|
| Colorlessness is presented as absence of philosophy rather than a sixth philosophy. | `colorless_identity.md`, Identity Overview; `colorless_metaphysics.md`, Metaphysical Thesis | Use as central identity thesis. |
| The source material separates colorless into artifact/function, Eldrazi/void, and Ugin-Karn/transcendence faces. | `colorless_identity.md`, Face One/Face Two/Transcendence; `colorless_metaphysics.md`, three faces | Preserve as three-part structure; do not flatten. |
| Artifacts are tools: amoral, utilitarian, and function-driven. | `colorless_identity.md`, Face One; `colorless_metaphysics.md`, Face One | Use as artifact/function face. |
| Eldrazi are ancient cosmic horrors native to the Blind Eternities that consume mana/life and leave Wastes. | `colorless_magic_cleaned.md`, Lore Context; `colorless_identity.md`, Lore Context | Use as Eldrazi/void face. |
| Eldrazi are framed as alien, indifferent, and outside ordinary moral categories rather than simply evil. | `colorless_identity.md`, Face Two; `colorless_magic_cleaned.md`, Lore Context | Use as interpretation grounded in source. |
| Ugin and Karn represent colorlessness through detachment, balance, or transcendence beyond color commitments. | `colorless_identity.md`, Transcendence; `colorless_metaphysics.md`, Face Three | Use as third face, with careful interpretation language. |
| Ulamog, Kozilek, and Emrakul map to consumption/exile, reality distortion, and assimilation/control themes. | `colorless_identity.md`, The Three Titans; `colorless_metaphysics.md`, The Three Titans | Use as lore-mechanical examples. |

## Inferred Claims

| Claim | Reasoning | Allowed authoring treatment |
|---|---|---|
| Colorless can be treated as a foundational non-color identity layer in Vox Mana. | The source repeatedly says colorless is outside WUBRG while still having Commander and mechanical identity relevance. | Use as Vox Mana architecture, not official MTG canon. |
| Colorless has no single psychological drive; its "drive" depends on face: function, consumption, or detachment. | Supported source splits colorless into artifact, Eldrazi, and transcendence faces. | Phrase as Vox Mana interpretation. |
| Artifact/function colorlessness expresses instrumentality rather than ideology. | Source frames artifacts as pure function and tools without soul or purpose. | Use as interpretive metaphysics. |
| Eldrazi/void colorlessness expresses ontological negation rather than ordinary villainy. | Source frames Eldrazi as alien, indifferent, and reality-erasing. | Use as interpretive metaphysics. |
| Ugin-Karn/transcendence expresses agency beyond color commitment, not absence of agency. | Source distinguishes Ugin/Karn from artifacts and Eldrazi. | Use as interpretation, not as absolute canon. |
| Commander colorless deckbuilding feels like constraint through absence: many universal tools are available, but colored identity support is unavailable. | Source supports Commander constraints and colorless card availability. | Use as operational interpretation. |
| Operator/query signals should stay grouped by artifact/function, Eldrazi/void, and mana-symbol/land usage. | User guardrail plus source split supports grouping. | Use as schema and validator expectation for section content. |

## Unsupported or Excluded Claims

| Claim or material | Reason for exclusion |
|---|---|
| Semnia Eubaints / 2D Doujin Fighter alignment notes. | Marked `UNKNOWN`, off-topic, not MTG source material for this pass. |
| Unverified future product data involving Tezzeret, Edge of Eternities, TMNT, Lorwyn Eclipsed, or Avatar. | Marked unverified and temporally unstable. Exclude until separately sourced. |
| Treating colorless as "the sixth color." | Contradicted by allowed source material and implementation guardrails. |
| Collapsing artifacts, Eldrazi, and Ugin/Karn into one simplified thesis. | Contradicts source structure and user guardrails. |
| Runtime placement or identity-layer classification for colorless. | Out of scope; this pass is authoring/source architecture only. |
| New Commander recommendations, deck rankings, or product assertions beyond the allowed source material. | Would require a separate source audit. |

## Drafting Requirements Derived From Evidence

- The authored files must say colorless is not a color and not a sixth mono color.
- The authored files must preserve three faces: artifact/function, Eldrazi/void, and Ugin-Karn/transcendence.
- Mechanical and Commander statements must be grounded in the supported claims above or clearly framed as Vox Mana operational interpretation.
- Inferred claims may appear only with interpretive phrasing such as "Vox Mana reads this as..." or "Operationally, this means..."
- Unsupported claims must not appear in authored identity or metaphysics files.
- Query/operator signals must be grouped by artifact/function, Eldrazi/void, and mana-symbol/land usage.
