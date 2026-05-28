# Scryfall Data Pipeline

Vox Mana uses a hybrid Scryfall model:

- Live Scryfall API calls keep Maze search, prices, random cards, and pagination fresh.
- Ignored local `oracle_cards` bulk data feeds slow card-expression indexes.
- Committed indexes stay lightweight and derived; raw bulk JSON is never committed.

## Commands

```powershell
npm run scryfall:download
npm run scryfall:index
npm run scryfall:inspect
npm run scryfall:refresh
```

## Raw Data

`scripts/download-scryfall-bulk.mjs` fetches `https://api.scryfall.com/bulk-data`, selects `type === "oracle_cards"`, downloads the JSON payload, validates it, and writes:

- `data/scryfall/raw/oracle-cards.json`
- `data/scryfall/raw/bulk-manifest.json`

Raw JSON and `.json.gz` files under `data/scryfall/raw/` are ignored by Git. The manifest records `downloaded_at`, source endpoint, bulk id, bulk type, Scryfall update time, download URI, and card count.

## Generated Indexes

`scripts/build-scryfall-indexes.mjs` reads the raw oracle file plus `data/taxonomy/vox-mana-tags.json` and writes:

- `data/scryfall/indexes/card-flavor-index.json`
- `data/scryfall/indexes/commander-index.json`
- `data/scryfall/indexes/color-theme-index.json`
- `data/scryfall/indexes/mechanic-theme-index.json`
- `data/scryfall/indexes/scryfall-index-manifest.json`

The flavor index intentionally uses a slim derived shape. It keeps card identifiers, display metadata, image references, categorized tags, lore tones, and short excerpts for display. It does not commit full `oracle_text` or full `flavor_text`, so the repo does not become a broad text mirror of Scryfall card data.

## Parser Vocabulary

VM-012 closes the Maze parser/data diagnostics layer by treating `research/scryfall-parser-seed-2026.json` plus `research/scryfall-dictionary.js` as the local deterministic validation source for parser vocabulary. `getScryfallDictionaryVocabulary()` exposes sorted keyword, subtype, card type, and format terms for local autocomplete and validation without adding Scryfall bulk downloads, runtime fetches, build-time API calls, or network-backed parsing.

## Guardrails

- Use `oracle_cards` for v1.
- Defer `unique_artwork`, `rulings`, `default_cards`, and `all_cards`.
- Keep Scryfall images as linked URLs, not downloaded assets.
- Keep Commander candidate detection practical rather than exhaustive.
- If the flavor index becomes large or starts behaving like a bulk text mirror, reduce it further to IDs, names, metadata, image references, tags, and only the display snippets Archscry needs.

## Inspection

`scripts/inspect-scryfall-indexes.mjs` checks:

- Raw files exist locally and raw ignore rules are present.
- All generated index files parse as JSON.
- Flavor cards are sorted deterministically.
- DFC/card-face flavor extraction appears in the index.
- Commander candidates include `commander_rule_notes`.
- Categorized mechanical, playstyle, identity, and lore-tone tags were emitted.
- The index manifest records the raw/text guardrails.
