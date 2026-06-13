# Sources and Grounding Notes

This bundle is intended as repo-ready creative/structural data, not official card text replacement. Use Scryfall/Gatherer as source of truth for exact Oracle text before shipping gameplay functionality.

## Primary Grounding

- Wizards — Strixhaven: School of Mages Mechanics: https://magic.wizards.com/en/news/feature/strixhaven-school-mages-mechanics-2021-03-25
  - Used for learn, Lessons, magecraft, ward, and Strixhaven mechanical framing.
- Wizards — The Legends of Strixhaven: https://magic.wizards.com/en/news/feature/legends-strixhaven-2021-04-13
  - Used for Zimone, Kianne, Imbraham, Adrix and Nev, Deekah, Ruxa, and Esix characterization.
- Wizards — Commander 2021 Decklists / Quantum Quandrix: https://magic.wizards.com/en/news/announcements/commander-2021-edition-decklists-2021-04-05
  - Used for Quantum Quandrix deck anchors and commander-structural cards.
- Scryfall — `wm:quandrix`: https://scryfall.com/search?q=wm%3Aquandrix
  - Used as a broad watermark/search grounding source.
- Scryfall — Secrets of Strixhaven Quandrix watermark: https://scryfall.com/search?as=grid&order=name&q=set%3Asos+watermark%3Aquandrix&unique=cards
  - Used for current Quandrix-watermarked card discovery.
- Scryfall — Strixhaven set gallery: https://scryfall.com/sets/stx
- Scryfall — Secrets of Strixhaven set gallery: https://scryfall.com/sets/sos
- Scryfall — Secrets of Strixhaven Commander set gallery: https://scryfall.com/sets/soc

## File-Level Source Behavior

The CSV/JSON matrix includes a `source_url` column per card using exact-title Scryfall search links. This lets downstream Codex work verify and expand individual card records without hardcoding a specific printing.

## Guardrail

Quandrix should not be flattened into generic Simic. The canonical framing here requires at least one of: math-as-reality, Fractal materialization, doubling/copying, counter accretion, land thresholds, X-scaling, or theory/substance tension.
