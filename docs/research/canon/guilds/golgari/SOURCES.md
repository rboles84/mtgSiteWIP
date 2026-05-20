# Golgari Bundle Source Notes

This bundle is an implementation artifact, not a final canon article. The card matrix is intentionally split into tiers so Ravnica/Golgari guild cards, guild mechanics, and broader Commander structural anchors do not blur together.

## Primary source anchors

- Scryfall Golgari search  
  https://scryfall.com/search?q=wm%3Agolgari&unique=cards

- Wizards — Guilds of Ravnica Mechanics  
  https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04

- Mark Rosewater — Guild to Order, Part 2  
  https://magic.wizards.com/en/news/making-magic/guild-order-part-2-2018-09-17

## Notes for Codex / repo integration

- Prefer the JSON matrix as the source of truth.
- Use the CSV for review, filtering, spreadsheet comparison, and manual QA.
- Do not treat every row as equally “guild-canon.”
  - `guild-core` = explicit Golgari/Ravnica identity.
  - `mechanic-core` = dredge/scavenge/undergrowth structural cards.
  - `structural-anchor` = black-green cards that express the same play pattern.
  - `commander-structural-anchor` = Commander-facing black-green archetype anchors that may be non-Ravnica.
- Translation functions are stable-name primitives for the Vox Mana layer, not final production APIs unless you accept the contract.
