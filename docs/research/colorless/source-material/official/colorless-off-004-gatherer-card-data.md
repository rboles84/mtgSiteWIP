# COLORLESS-OFF-004 - Gatherer Card Data

Retrieval date: 2026-06-11 America/Denver
Source role: official card details and rulings

## Source URLs

| Card | Official Gatherer URL |
| --- | --- |
| Wastes | https://gatherer.wizards.com/EOC/en-us/191/wastes |
| Zhulodok, Void Gorger | https://gatherer.wizards.com/CMM/en-us/704/zhulodok-void-gorger |
| Omarthis, Ghostfire Initiate | https://gatherer.wizards.com/CMM/en-us/708/omarthis-ghostfire-initiate |
| Ulalek, Fused Atrocity | https://gatherer.wizards.com/M3C/en-us/4/ulalek-fused-atrocity |

## Claim Mapping

| Manual-fill row | Supported claim |
| --- | --- |
| `COLORLESS-MF-003` | Wastes is official card data for the Colorless mana-base anchor. |
| `COLORLESS-MF-004` | Zhulodok and Omarthis official card pages support the Eldrazi Unbound commander/support-card boundary alongside the product decklist. |
| `COLORLESS-MF-014` | Named-card Oracle and Commander color-identity boundary, when combined with `COLORLESS-OFF-001` rule 903.4. |

## Observed Official Card Details

| Card | Official page detail used | Boundary result |
| --- | --- | --- |
| Wastes | Basic Land; printed mana ability adds `{C}`. | Safe as Wastes/card-data anchor; no broader land-package advice. |
| Zhulodok, Void Gorger | Mana cost `{5}{C}`; Legendary Creature - Eldrazi; Commander legal on page. | Strict-Colorless commander support when combined with CR 903.4. |
| Omarthis, Ghostfire Initiate | Mana cost `{X}{X}`; Legendary Creature - Spirit Snake; Commander legal on page. | Strict-Colorless support when combined with CR 903.4. |
| Ulalek, Fused Atrocity | Mana cost `{C/W}{C/U}{C/B}{C/R}{C/G}`; Devoid; Commander legal on page. | Object-colorless by Devoid, but five-color color identity by CR 903.4; comparator only. |

## Short Excerpt Cues

- "Official MTG details and rulings"
- "Basic Land"
- "Legendary Creature"
- "Devoid"
- "Commander"

## Boundary

Gatherer pages provide official named-card details. Scryfall API was used only as a non-authoritative cross-check while probing current URLs; do not cite it as independent source authority in VM-339.
