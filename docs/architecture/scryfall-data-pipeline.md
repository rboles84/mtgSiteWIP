# Scryfall Data Pipeline

Vox Mana uses a hybrid Scryfall model:

- Live Scryfall API calls keep Maze search, prices, random cards, and pagination fresh.
- Ignored local `oracle_cards` bulk data feeds slow card-expression indexes.
- Committed indexes stay lightweight and derived; raw bulk JSON is never committed.

## Commands

```powershell
npm run scryfall:download
npm run scryfall:grounding
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

## Plain Reading Grounding Artifact

VM-471 adds a checked-in generated artifact for the grounded Plain Reading compiler:

- Generator: `scripts/build-scryfall-grounding.mjs`
- Artifact: `data/scryfall/grounding/scryfall-grounding.json`
- Validator: `scripts/validate-scryfall-grounding.mjs`
- Test command: `npm run test:scryfall-grounding`
- Rebuild command: `npm run scryfall:grounding`

The generator fetches these Scryfall build-time sources:

- `/catalog/card-types`
- `/catalog/supertypes`
- `/catalog/creature-types`
- `/catalog/artifact-types`
- `/catalog/enchantment-types`
- `/catalog/land-types`
- `/catalog/planeswalker-types`
- `/catalog/spell-types`
- `/catalog/keyword-abilities`
- `/catalog/keyword-actions`
- `/catalog/ability-words`
- `/sets`

The artifact contains normalized catalogs, set metadata, set-code and set-name indexes, family groupings derived from `parent_set_code`, normalized aliases, and a documented manual override block. Maze loads this local artifact from the app host at runtime; it does not fetch Scryfall catalog or set metadata from the browser.

Manual overrides currently exist only for the Spider-Man product family (`spm`, `spe`, `aspm`, `pspm`, `tspm`). The override is needed because Scryfall's set records expose related releases but not a single marketing-family field for the exact product family that users type as "spiderman set." The generator applies the override only for set codes present in fetched Scryfall `/sets` metadata, so the artifact does not fabricate set records.

Regenerate the grounding artifact when:

- Scryfall publishes new card types, subtypes, keywords, or ability words.
- A new set or product family should be understood by Plain Reading.
- A marketing-name family override changes.
- Acceptance fixtures need to verify current Scryfall catalog state.

## Plain Reading Semantic Registry

VM-472 adds a curated data registry for player-language concepts that are not canonical Scryfall catalog facts:

- Registry: `data/scryfall/grounding/plain-reading-semantics.json`
- Validator: `scripts/validate-plain-reading-semantics.mjs`
- Test command: `npm run test:plain-reading-semantics`

Use this file for deterministic English concepts such as removal, draw, ramp, blink, sacrifice outlets, board wipes, graveyard hate, tokens, Treasure/Clue/Blood, lifegain, spellslinger, print treatments, and similar Scryfall-fieldable semantics.

Registry entries include an id, label, kind, triggers, output fragments, confidence, optional alternatives, and notes. Prefer `otag:` functional tags when Scryfall supports the concept; otherwise use conservative `o:`, `fo:`, predicate, frame, language, or other valid Scryfall fragments.

Do not put generated catalog facts in the semantic registry. Types, subtypes, keyword abilities, keyword actions, ability words, sets, set names, and set families belong in `scryfall-grounding.json` and should be regenerated from Scryfall metadata.

Update the semantic registry when:

- A corpus fixture exposes a missing common player-language concept.
- A concept can be represented deterministically in Scryfall syntax.
- A current registry concept needs a safer fragment, better alternatives, or lower/higher confidence.
- Scryfall functional tags add a better `otag:` representation.

## Guardrails

- Use `oracle_cards` for v1.
- Defer `unique_artwork`, `rulings`, `default_cards`, and `all_cards`.
- Keep Scryfall images as linked URLs, not downloaded assets.
- Keep Commander candidate detection practical rather than exhaustive.
- Do not hand-edit `data/scryfall/grounding/scryfall-grounding.json`; update the generator or its documented override map, then rerun `npm run scryfall:grounding`.
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
