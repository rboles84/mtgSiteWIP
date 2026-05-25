# VM-125 - Strategium Archetype Signal Searchable Library

Status: done
Type: Frontend / Commander UX / Content Architecture
Area: Strategium Route
Priority: high

## Summary

Expand Strategium's `Archetype Signal` console tab from the VM-124 static six-card mini-library into a Strategium-first searchable Commander theme library.

The feature remains route-local to `strategium/index.html` and uses the existing `#basicsReveal` tab panel pattern. It does not introduce shared data contracts, persistence, URL params, routing changes, or Commander Compass integration.

## Implementation Notes

- Add a labeled search input for archetypes, aliases, colors, and play patterns.
- Add scope chips for `Core`, `All`, and `Advanced`, with `Core` as the default.
- Add axis chips for `Any`, `Combat`, `Spells`, `Graveyard`, `Artifacts`, `Enchantments`, `Lands`, `Control`, `Politics`, and `Combo`.
- Add table-read chips for `Any`, `Fair`, `Snowball`, `Hidden Threat`, and `Salt Risk`.
- Seed route-local archetype data from `C:\Users\obake\Downloads\deep-research-report.md`, preserving required splits such as `Ramp` / `Lands Matter` / `Landfall`, `Aristocrats` / `Sacrifice`, `Spellslinger` / `Storm`, and `Voltron` / `Equipment` / `Auras`.
- Keep filter state in page-local memory so it survives tab swaps during the current page session only.
- Render cards with name, subtitle, short Commander-table summary, likely colors, difficulty, and table perception.
- Include an empty state that suggests alias search terms and recommends widening from `Core` to `All` when appropriate.

## Acceptance Criteria

- `/strategium/` still follows the VM-122/VM-124 section order and shared shell.
- `Archetype Signal` renders a searchable library inside the console panel, not as a new app or page section.
- Default results show core archetypes only.
- Searching `lands` surfaces `Ramp`, `Lands Matter`, and `Landfall` as separate themes.
- Searching `go wide` surfaces `Tokens` and related matching themes.
- Searching `prison` under `Core` produces a useful no-results state; switching to `All` or `Advanced` surfaces advanced prison-adjacent themes.
- `Spellslinger` and `Storm` remain separate themes.
- Filter state persists while switching Strategium tabs and resets only on page reload.
- No bracket, power, or certification language is introduced.

## Tests

- `node` inline Strategium script syntax check
- `npm.cmd run lint:html`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser smoke for `/strategium/` archetype search, filters, state retention, and mobile wrapping

