# VM-565 Ink owner evidence

This directory preserves the owner's two Scryfall exports and the bounded evidence review used to remediate the Ink `Cards That Sound Like This` pair.

## Preserved inputs

| File | Rows | SHA-256 | Purpose |
| --- | ---: | --- | --- |
| `ink1.csv` | 175 | `D908082F8F431E03A329A61244A19152ADD59FE68E975433C4B9392903266DAC` | Noncommander, nonland Ink-color-identity discovery query using token/knowledge/study/communal/shared oracle-text terms. |
| `ink2.csv` | 175 | `F4064B62ADC45DAA6A50C547ECE7A6DDDA6612BD477E741FE883B17D085D3A86` | Commander-legal Ink-color-identity discovery query using knowledge/study/communal/shared flavor-text terms. |

The CSVs are copied verbatim from `C:\Users\obake\Downloads` and are discovery evidence, not runtime data or identity authority. Their query vocabulary is intentionally broad and cannot establish that a card sounds like Ink by itself.

## Decision

The reconciled review is in `ink-sound-candidate-ledger.json`.

- Selected Sound anchor: **Crystal, Inhuman Princess** (`MSC` 80). It is a nonland RGWU Commander and its exact printed voice moves a hidden community toward a public, collective “we.”
- Selected Sound complement: **Group Project** (`SOS` 17), found in `ink2.csv`. Its exact printed voice explicitly joins asking for help with shared success.
- Protected Play-only card: **Kynaios and Tiro of Meletis** remains unchanged and is not duplicated into Sound.

The replacements are justified by direct flavor text. Mechanics were inspected for exact card identity and role separation but were not used as the Sound-selection basis.

## Fact sources

- Exact card and printing facts: Scryfall API lookups on 2026-08-16, using set and collector-number endpoints recorded in the ledger.
- Current Ink authority: `data/raw-factions/ink/ink.claims.json`, `docs/research/ink/ink-evidence-ledger.md`, and the current certified dossier/card relationship sources.
- Marvel product context, used only to evaluate candidates lacking printed flavor: Wizards of the Coast, *Magic: The Gathering® | Marvel Super Heroes Commander Decklists*, `https://magic.wizards.com/en/news/announcements/marvel-super-heroes-commander-decklists`, and *Magic: The Gathering® | Marvel Super Heroes*, `https://magic.wizards.com/en/products/marvel/marvel-super-heroes`.
