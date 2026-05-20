# Selesnya Package
**Version:** 1.0.0  
**Author:** Copilot  
**Generation Date:** 2026-05-18  
**Encoding:** UTF-8 throughout  

---

## Overview

The Selesnya Package is a self-contained set of design and engineering artifacts themed around the Selesnya Conclave — the green/white guild whose values of community, growth, harmony, and stewardship are reflected in every file. The package is intended for use by game designers, front-end engineers, narrative writers, and tooling developers working within a Selesnya-aligned project.

---

## File Inventory

| File | Type | Description |
|---|---|---|
| `selesnya_structural_matrix.csv` | CSV | 35-row card dataset with metadata header |
| `selesnya_structural_matrix.json` | JSON | Same dataset as a JSON array of objects |
| `selesnya_animation_spec.md` | Markdown | Human-readable animation & visual-language spec |
| `selesnya_animation_spec.json` | JSON | Machine-readable animation spec for tooling |
| `translation_layer.py` | Python 3.11 | Four reusable constructs for game-logic orchestration |
| `tests_translation_layer.py` | Python 3.11 | pytest stubs covering all four constructs |
| `narrative_taxonomy.json` | JSON | Hierarchical theme/archetype/story-beat taxonomy |
| `README.md` | Markdown | This file |

---

## File Definitions

### `selesnya_structural_matrix.csv` & `.json`

The canonical card dataset. The CSV begins with a metadata comment line:

```
# generation_date=2026-05-18,author=Copilot
```

#### Field Definitions

| Field | Type | Description |
|---|---|---|
| `name` | string | Card name (original or paraphrased from Selesnya-identity cards) |
| `mana_cost` | string | Mana cost in symbolic notation, e.g. `{2}{G}{W}` |
| `type_line` | string | Primary card type: Creature, Enchantment, Instant, Sorcery, Artifact, Land, Legendary Planeswalker |
| `subtypes` | string | Space-separated subtypes, e.g. `Elf Cleric` |
| `colors` | string | Color identity string: G = Green, W = White, GW = both, blank = colorless |
| `rarity` | string | Common, Uncommon, Rare, or Mythic |
| `set` | string | Three-letter set code |
| `cmc` | integer | Converted mana cost (total mana value) |
| `power` | string | Creature power (blank for non-creatures; `*` for variable) |
| `toughness` | string | Creature toughness (blank for non-creatures; `*` for variable) |
| `oracle_text_summary` | string | Original paraphrased summary of card rules text, max 280 characters |
| `tags` | string | Semicolon-separated tags from the approved taxonomy |

#### Tag Taxonomy

Tags are used consistently across all three data files (CSV, JSON, narrative taxonomy). Valid tags:

`populate` · `anthem` · `token` · `lifegain` · `buff` · `removal` · `ramp` · `creature` · `enchantment` · `instant` · `artifact` · `planeswalker`

Multiple tags per card are separated by semicolons with no spaces: `token;lifegain;buff;creature`.

#### Card Composition (35 cards)

| Type | Count |
|---|---|
| Creature (incl. Legendary) | 14 |
| Enchantment | 5 |
| Instant | 7 |
| Sorcery | 4 |
| Artifact | 2 |
| Land | 1 |
| Legendary Planeswalker | 2 |

---

### `selesnya_animation_spec.md`

A human-readable Markdown document covering:

- **Color Palette** — 8 named hex colors with roles and usage guidance.
- **Typography Motion** — per-element animation specs for card name, mana cost, and oracle text.
- **Motion System** — easing curves (named + Bezier), timing scale tokens, and frame size table.
- **Particle Systems** — five presets: Summon Leaves, Lifelink Pulse, Populate Fractal, Anthem Halo, Token Summoning Motes.
- **State Machine** — ASCII diagram of all animation states and transitions for Selesnya actions (summon, buff, anthem, populate, lifelink, tap, death, convoke-like).
- **Example Sequences** — frame-by-frame timing for three canonical interactions.
- **Accessibility Notes** — reduced-motion mode, contrast ratios, flicker safety, screen-reader guidance.
- **Export Parameters** — frame sizes and Lottie-friendly JSON layer stubs.

---

### `selesnya_animation_spec.json`

Machine-readable counterpart to the Markdown spec. Structured fields:

- `palette` — hex map with role descriptions.
- `typography_motion` — per-element animation parameters.
- `timing` — named timing tokens in milliseconds.
- `easing` — named easing curves with Bezier arrays.
- `frame_sizes` — array of `{format, width, height, fps}` objects.
- `particle_presets` — five preset objects with emitter, count, color, lifetime, velocity parameters.
- `state_machine` — `states` array and `transitions` array with `{from, to, trigger, duration_ms, easing, particle}` objects; plus `convoke_interaction` object.
- `example_sequences` — three named sequences as ordered event arrays with timestamps.
- `lottie_stubs` — two Lottie-compatible layer stub objects.
- `accessibility` — structured accessibility constraints.

---

### `translation_layer.py`

Python 3.11 module. Imports only standard library modules. Fully type-hinted.

#### `Detain(duration_seconds: int, on_release: Callable | None = None)`

Context manager that temporarily blocks actions.

- `__enter__` → sets `is_detained()` to `True`.
- `__exit__` → sleeps for `duration_seconds`, sets `is_detained()` to `False`, fires `on_release` callback.
- `release_early()` → immediately ends detention and fires callback. Thread-safe. Idempotent.

```python
with Detain(duration_seconds=2, on_release=lambda: print("freed")) as d:
    print(d.is_detained())  # True
# "freed" printed after 2 s
```

#### `Override(priority: int)`

Decorator and context manager for prioritised rule overrides.

- Maintains a process-wide priority stack (thread-safe).
- `Override.current_priority()` → highest active integer, or 0.
- `Override.is_active()` → bool.
- As decorator: injects `_override_priority` kwarg if the wrapped function accepts it.

```python
with Override(priority=10):
    print(Override.current_priority())  # 10
```

#### `ConstraintField(schema: dict)`

Schema-driven validator with detailed error messages.

- `validate(data) -> bool` — checks type, required, min/max (numeric), min/max length (str/list), regex pattern, enum membership, and a custom predicate.
- `errors: list[str]` — populated after each `validate()` call.
- `error_summary() -> str` — newline-joined error string or "No errors."

```python
cf = ConstraintField({"type": int, "min": 1, "max": 10, "required": True})
cf.validate(5)   # True
cf.validate(15)  # False; cf.errors → ["Value 15 exceeds maximum of 10."]
```

#### `AccretionEngine()`

Aggregator for stacking effects over simulated time.

- `add(effect: dict)` — registers a new effect; must contain `"type"` key. Optional `"duration_seconds"` causes automatic expiry.
- `tick(delta_seconds: float)` — advances the clock and prunes expired effects.
- `resolve() -> dict` — returns aggregated summary: `total_power_buff`, `total_toughness_buff`, `lifelink_active`, `vigilance_active`, `trample_active`, `token_count_bonus`, `life_gain_bonus`, `populate_triggers`, `raw_effects`, `elapsed_seconds`.
- `clear()` — resets all state.

```python
engine = AccretionEngine()
engine.add({"type": "buff", "power": 2, "toughness": 2})
engine.add({"type": "lifelink", "duration_seconds": 3})
engine.tick(1.0)
result = engine.resolve()
# result["total_power_buff"] == 2, result["lifelink_active"] == True
```

---

### `tests_translation_layer.py`

pytest-style test file covering all four constructs.

#### Running the tests

```bash
pip install pytest
pytest tests_translation_layer.py -v
```

**Test coverage summary:**

| Class | Tests |
|---|---|
| `TestDetain` | 10 stubs |
| `TestOverride` | 10 stubs |
| `TestConstraintField` | 17 stubs |
| `TestAccretionEngine` | 16 stubs |
| **Total** | **53 stubs** |

No external dependencies beyond `pytest`. All other imports are from the standard library.

---

### `narrative_taxonomy.json`

Hierarchical taxonomy with the following top-level keys:

- **`themes`** — Four thematic pillars (`community`, `growth`, `harmony`, `stewardship`), each with 3 sub-themes, descriptions, associated tags, and example cards.
- **`archetypes`** — Four archetypes (`Leader`, `Steward`, `Vanguard`, `Chorus`) with traits, tags, and example cards.
- **`story_beats`** — Six narrative beats (`SB-01` through `SB-06`) covering early, mid, late, reactive, and pivotal game phases.
- **`tag_definitions`** — Plain-language definition of each of the 12 valid tags.
- **`tag_to_story_beat_map`** — Maps each tag to the story beats where it is most relevant.
- **`tag_to_theme_map`** — Maps each tag to thematic pillars.
- **`tag_to_archetype_map`** — Maps each tag to archetypes.

---

## Usage Notes

### Filtering the card dataset by tag

**CSV (Python):**
```python
import csv

with open("selesnya_structural_matrix.csv", encoding="utf-8") as f:
    rows = [r for r in csv.DictReader(row for row in f if not row.startswith("#"))]

populate_cards = [r for r in rows if "populate" in r["tags"].split(";")]
```

**JSON (Python):**
```python
import json

with open("selesnya_structural_matrix.json", encoding="utf-8") as f:
    data = json.load(f)

anthem_cards = [c for c in data["cards"] if "anthem" in c["tags"].split(";")]
```

### Using the translation layer

```python
from translation_layer import Detain, Override, ConstraintField, AccretionEngine

# Block actions for 1 second, then run cleanup
with Detain(1, on_release=lambda: print("Board unlocked")):
    pass  # actions are blocked

# Apply a high-priority rule override
with Override(priority=15):
    print(f"Active priority: {Override.current_priority()}")

# Validate input
cf = ConstraintField({"type": str, "min_length": 1, "max_length": 280})
if not cf.validate(oracle_text):
    print(cf.error_summary())

# Accumulate game effects
engine = AccretionEngine()
engine.add({"type": "buff", "power": 1, "toughness": 1})
engine.tick(0.5)
summary = engine.resolve()
```

---

## Licensing Note

**All card oracle text in this package is an original paraphrase summarising publicly known card mechanics. No verbatim copyrighted card text has been reproduced.** Card names may reference published trading card game cards; this package is a fan-created design reference and engineering toolkit, not an official product. All code and specification content is original work authored by Copilot.

---

*End of README*
