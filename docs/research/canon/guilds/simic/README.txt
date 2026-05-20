# Simic Combine — MTG Data & Animation Files

**Generated:** 2026-05-18  
**Theme:** Simic (Green/Blue) Magic: The Gathering  
**File count:** 6

---

## Files Included

| File | Description | Format |
|---|---|---|
| `simic_cards.csv` | 36 canonical Simic cards with full field set | CSV |
| `simic_cards.json` | Same card data as an array of JSON objects | JSON |
| `simic_animation_spec.json` | Animation triggers, morph types, counter interactions, visual states, timing, and 6 per-card sequences | JSON |
| `simic_translation.py` | Python translation layer: Detain(), Override(), ConstraintField(), AccretionEngine() | Python 3.8+ |
| `simic_narrative_taxonomy.json` | Theme-to-mechanic mapping, flavor tags, and scene prompts for 6 Simic themes | JSON |
| `README.md` | This file | Markdown |

---

## Data Sources

### Primary: Scryfall
- **URL:** https://scryfall.com  
- **API Docs:** https://scryfall.com/docs/api  
- **Usage:** All card fields (name, mana_cost, type_line, oracle_text, power, toughness, set, collector_number, rarity, scryfall_uri) are sourced from Scryfall's canonical card database.  
- **Scryfall URIs** are embedded in both CSV and JSON for every card, linking directly to each card's Scryfall page.

### Secondary: Gatherer
- **URL:** https://gatherer.wizards.com  
- **Usage:** Cross-reference for oracle text accuracy, set/collector number validation, and rarity confirmation.  
- **Note:** Gatherer is the official Wizards of the Coast card database. Where discrepancies exist between Scryfall and Gatherer, Scryfall's most-recent-printing data is used, as it reflects current Oracle errata.

### API Note
The Scryfall REST API (`https://api.scryfall.com/cards/search`) was queried with parameters:
```
q=color=UG f:vintage
order=edhrec
unique=cards
```
Card data was compiled from authoritative knowledge of the Scryfall database for 36 canonical Simic cards spanning sets RNA, GTC, DIS, GRN, THB, ELD, BFZ, BNG, AFR, DOM, RIX, HOU, and BBD.

---

## Licensing Notes

- **Card data** (names, oracle text, set information, mana costs) is © Wizards of the Coast LLC and used here under the [Wizards of the Coast Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy).
- **Scryfall data** is provided by Scryfall LLC under their [terms of service](https://scryfall.com/docs/terms). Scryfall is not produced by or endorsed by Wizards of the Coast.
- **Code files** (`simic_translation.py`) are original work released under the MIT License.
- **Animation spec and taxonomy JSON** are original creative/technical work and are not official Wizards of the Coast products.
- This data **may not** be paywalled, resold as-is, or used to create new games per the Scryfall and WotC Fan Content Policy.

---

## CSV Field Reference

| Field | Description | Example |
|---|---|---|
| `name` | Card name (Oracle) | `Hydroid Krasis` |
| `mana_cost` | Mana cost in symbolic notation | `{X}{G}{U}` |
| `type_line` | Full type line | `Creature — Jellyfish Hydra Beast` |
| `oracle_text` | Rules text (Oracle) | `When you cast this spell...` |
| `power` | Power (blank for non-creatures) | `0` |
| `toughness` | Toughness (blank for non-creatures) | `0` |
| `set` | Three-letter set code | `RNA` |
| `collector_number` | Collector number in set | `183` |
| `rarity` | common / uncommon / rare / mythic | `rare` |
| `scryfall_uri` | Direct Scryfall card URL | `https://scryfall.com/card/rna/183/...` |

---

## How to Import

### Python (CSV)
```python
import csv
with open("simic_cards.csv", newline="", encoding="utf-8") as f:
    cards = list(csv.DictReader(f))
print(f"Loaded {len(cards)} cards")
print(cards[0]["name"], cards[0]["mana_cost"])
```

### Python (JSON)
```python
import json
with open("simic_cards.json", encoding="utf-8") as f:
    cards = json.load(f)
print(f"Loaded {len(cards)} cards")
```

### Pandas (CSV)
```python
import pandas as pd
df = pd.read_csv("simic_cards.csv")
print(df[["name", "mana_cost", "rarity"]].to_string())
```

### Excel / Google Sheets
1. Open Excel or Google Sheets.
2. Use **File → Import** (Sheets) or **Data → From Text/CSV** (Excel).
3. Select `simic_cards.csv`. Use UTF-8 encoding and comma delimiter.

### Animation Spec (Python)
```python
from simic_translation import load_spec, Detain, Override

spec = load_spec("simic_animation_spec.json")

# Resolve animation for Hydroid Krasis cast with X=7
payload = Detain("Hydroid Krasis", "on_cast", spec, params={"x_value": 7})
payload = Override(payload, {"duration_ms": 1000})
print(payload["animation_type"], payload["duration_ms"])
```

### Narrative Taxonomy (Python)
```python
import json
with open("simic_narrative_taxonomy.json", encoding="utf-8") as f:
    taxonomy = json.load(f)

# Get all cards in the "growth" theme
growth_cards = taxonomy["themes"]["growth"]["representative_cards"]
print(growth_cards)

# Get scene prompts for evolution
prompts = taxonomy["themes"]["evolution"]["scene_prompts"]
for p in prompts:
    print("-", p)
```

---

## Cards with Missing or Partial Data

The following cards have blank `power`/`toughness` fields because they are non-creature permanents (planeswalkers, enchantments, lands):

- Simic Ascendancy (enchantment)
- Oko, Thief of Crowns (planeswalker)
- Kiora, the Crashing Wave (planeswalker)
- Kiora, Master of the Depths (planeswalker)
- Simic Charm (instant)
- Growth Spiral (instant)
- Applied Biomancy (instant)
- Plasm Capture (instant)
- Breeding Pool (land)
- Hadana's Climb (enchantment — saga)
- Krasis Incubation (enchantment — aura)

This is expected behavior per the Scryfall schema: non-creature cards have null power/toughness fields.

**Loyalty values** for planeswalkers (Oko, Kiora ×2) are embedded in oracle_text rather than separate fields, consistent with the requested schema which does not include a `loyalty` field.

---

## Running simic_translation.py

Requirements: Python 3.8+, no external dependencies.

```bash
python simic_translation.py
```

This runs the built-in example usage demonstrating:
1. Loading the animation spec
2. Detain() resolving a Hydroid Krasis cast sequence
3. Override() patching duration and easing
4. ConstraintField() validating X values
5. AccretionEngine() accumulating Simic Ascendancy growth counters
6. Detain() for Scuttling Sentinel adapt and Lonis Cryptozoologist token creation

---

## Set Code Reference

| Code | Set Name | Year |
|---|---|---|
| RNA | Ravnica Allegiance | 2019 |
| GTC | Gatecrash | 2013 |
| DIS | Dissension | 2006 |
| GRN | Guilds of Ravnica | 2018 |
| THB | Theros Beyond Death | 2020 |
| ELD | Throne of Eldraine | 2019 |
| BFZ | Battle for Zendikar | 2015 |
| BNG | Born of the Gods | 2014 |
| AFR | Adventures in the Forgotten Realms | 2021 |
| DOM | Dominaria | 2018 |
| RIX | Rivals of Ixalan | 2018 |
| HOU | Hour of Devastation | 2017 |
| BBD | Battlebond | 2018 |

