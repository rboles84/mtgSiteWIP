# Vox Mana Tag Taxonomy

`data/taxonomy/vox-mana-tags.json` is the central dictionary for Vox Mana tag meaning.

The rule is:

```text
MTG defines the nouns. Vox Mana defines the meaning.
```

Keep canonical MTG terms stable for search, filtering, Scryfall query generation, and Commander compatibility. Do not replace terms like `tokens`, `aristocrats`, `stax`, `tempo`, `wheels`, or `pillow-fort` with poetic substitutes. Render the canonical tag beside a plain-language interpretation.

## Categories

- `mechanical`: what cards and decks do.
- `playstyle`: how a deck tends to pressure, answer, or pace the table.
- `identity`: the fantasy or thematic pressure underneath the mechanic.
- `lore-tone`: the emotional or story texture of the card moment.

## Required Entry Shape

Each tag entry includes:

- `tag`
- `display_name`
- `category`
- `aliases`
- `canonical_definition`
- `vox_mana_interpretation`
- `table_feel`
- `player_fantasy`
- `typical_actions`
- `new_player_note`
- `adjacent_tags`

Consumers should read this file instead of hardcoding explanations in Archscry, Maze, or Commander Compass.

## Rendering Guidance

Specialized tags need nearby plain-language support. For example:

- `stax`: show that it restricts resources or actions.
- `aristocrats`: show that it means sacrifice plus death-trigger payoffs.
- `tempo`: show that it means time advantage and pressure.
- `wheels`: show that it means discard-or-reset hands plus draw.
- `group-slug`: show that it damages or drains the whole table.
- `pillow-fort`: show that it discourages attacks rather than simply gaining life.

Use `typal` as the canonical tag. Keep `tribal` only as a legacy alias and search synonym.
