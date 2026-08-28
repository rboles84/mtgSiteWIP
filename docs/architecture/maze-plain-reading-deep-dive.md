# The Implicit Maze — Plain Reading → Scryfall Deep Dive

**Status:** Phase 1 implemented / future phases open
**Date:** 2026-07-03
**Scope:** How the Maze search modes work, how natural language becomes a Scryfall query, how deep the logic is, and where to enhance it.
**Method:** Read-only code recon, empirical parser runs, then VM-471 implementation of the first grounded compiler layer.

---

## 1. The three search modes

The maze page (`maze/index.html`) offers three input modes. All three funnel through a single contract resolver, `resolveMazeQueryRequest()` in `assets/js/maze/maze-query-core.js:26`.

| Mode | UI name | What it does | Engine |
|---|---|---|---|
| `ai` | **The Plain Reading** | English → Scryfall syntax | `parseScryfallNaturalLanguage()` — `assets/js/maze/scryfall-parser.js:27` |
| `raw` | **The Operator's Hand** | User types Scryfall syntax directly | Light normalization only — `prepareRawSyntaxQuery()` `assets/js/maze/maze-query-core.js:114` |
| `builder` | **The Loom** | Visual pips/checkboxes → syntax | `buildVisualBuilderQuery()` — `assets/js/maze/research-builder.js` |

### The Operator's Hand is a passthrough
It does **not** parse or understand syntax — it assumes the user already knows Scryfall. Its only jobs:
- Strip stray plain-language `AND` (Scryfall implicitly ANDs adjacent terms with spaces).
- Optionally append the active format (`f:commander`) when the query has no format term.

Example: `ci<=br t:creature o:sacrifice f:commander` is sent to Scryfall verbatim.

**All of the "intelligence" lives in The Plain Reading.**

### Reverse translation (the inspector line)
`translateScryfallSyntaxToPlainText()` in `assets/js/maze/research-syntax-language.js:9` turns syntax **back** into English for the "Maze translated" line shown under the search box. This is an explanation surface, not the search engine. E.g. `c:r kw:shroud` → "red with shroud."

---

## 2. "The library" — what actually powers matching

There is **no ML, no LLM, no external NLP** in this path. It is a deterministic, hand-authored rules engine backed by two layers:

### Layer A — Built-in dictionary
`assets/js/maze/scryfall-dictionary.js` → the `DEFAULT_DICTIONARY` object. Hand-maintained lookup tables:

- `colors`, `identities` (all 30 guild / shard / wedge / college names → color codes), `identityAliases`
- `types`, `subtypes` (~40 creature types), `keywords` (~55 abilities)
- `oraclePhrases` (~25 rules-text intents: ETB, removal, tutor, board wipe, etc.)
- `formats`, `rarities`, `pricePhrases`, `sorting`, `queryPhrases` (~45 deck-archetype shortcuts)

### Layer B — Curated seed JSON
`data/maze/scryfall-parser-seed-2026.json` — **260 rows**. At page load, `assets/js/maze/research-init.js:568` fetches it and `createDictionaryFromSeed()` layers those rows **on top of** the built-in tables (result cached in `localStorage` under `vm_scryfall_parser_dictionary_v1`). If the fetch fails, it silently falls back to the built-in dictionary (`assets/js/maze/research-init.js:572`).

Seed row-type breakdown (260 total):

```
10  guild identity        10  ambiguity rule       10  typal
10  removal               10  ramp                 10  card advantage
10  graveyard             10  token                 9  evergreen keyword
 9  modern mechanic        8  operator              8  color
 7  counter ambiguity      7  qa seed               6  comparator
 6  subtype                5  shard identity        5  wedge identity
 5  college identity       5  four color identity   5  mana value
 5  stats                  5  display               5  format
 4  face type              4  status                4  card structure
 4  availability           4  preference            3  text operator
 3  2026 mechanic          3  2025 mechanic         3  mana
 3  price                  3  sorting               3  counter intent
 2  color count            2  supertype             2  keyword action
 2  2025/2026 keyword      2  set metadata          2  rarity
 2  frame                  2  treatment             2  finish
 2  extras                 2  api guardrail        (+ singletons)
```

Sample seed row:

```json
{
  "id": "BASE-001",
  "layer": "base",
  "Category": "Core Syntax & Logic",
  "Data Point": "Logical AND",
  "Triggers": "and, with, that have",
  "Scryfall Output": "implicit AND",
  "Type": "Operator",
  "Notes": "Scryfall ANDs adjacent terms by default; parser should not emit AND unless needed for clarity."
}
```

**Net live vocabulary = ~200 built-in entries + 260 seed rows ≈ ~500 trigger phrases.**

---

## 3. How Plain Reading compiles a sentence

`parseScryfallNaturalLanguage()` (`assets/js/maze/scryfall-parser.js:27`) is a **multi-pass keyword compiler**:

1. **Normalize** (`normalizeInput` `:276`) — lowercase, fix smart quotes, split hyphens/slashes, correct a handful of typos (`gren`→green, `hast`→haste, `comandr`→commander), expand two-letter color pairs (`br`→"black red").
2. **Exact-name escape hatch** (`detectExactName` `:337`) — `!Sol Ring`, `card named X`, or quoted names route to Scryfall's `/cards/named` endpoint.
3. **High-confidence curated rules** (`detectHighConfidenceSearch` `:81`) — ~35 hardcoded `if (hasPhrase(...))` special cases (Pauper red burn, Izzet spellslinger, board wipes → `otag:board-wipe`, etc.). **These `return` early.**
4. **Compositional passes** — if no curated rule fired, ~15 detectors run in sequence:
   `detectFieldSearches` → `detectQueryPhrases` → `detectManaProduction` → `detectFormats` → `detectIdentities` → `detectColors` → `detectTypes` → `detectKeywords` → `detectOraclePhrases` → `detectManaValue` → `detectPowerToughness` → `detectRarity` → `detectPrices` → `detectSorting` → `detectCounterAmbiguity` → `addColorAmbiguityAlternatives`.
   Each detector scans for its dictionary phrases, emits a Scryfall fragment, and marks the matched words **consumed** so later passes don't double-match.
5. **Assemble** (`assembleQuery` `:831`) — dedupe fragments, join with spaces (Scryfall's implicit AND).
6. **Score & diagnose** — `scoreConfidence` (`:841`) produces a 0–1 number; leftover words become `unresolved` warnings shown in the inspector (`detectUnresolvedTerms` `:1094`).

### Genuinely well-built details
- Phrase-length sorting so "first strike" beats "strike," "double-faced" beats "black."
- Consumed-phrase tracking prevents double-matching.
- Negation detection (`not black` → `-c:b`) via `isNegatedPhrase`.
- Protection-target disambiguation (`protection from red` does **not** make the card red) via `isProtectionTargetColor`.
- Commander-intent switching: `c:` for card color vs `id<=` for Commander identity, driven by `hasCommanderIntent` (`:377`).
- Exact-color intent: "only/exactly/just" flips `c:` → `c=` via `hasExactColorIntent` (`:386`).
- OR-grouping when the user says "or / either / but also" (`detectOraclePhrases` `:619`).
- Counter ambiguity: "counter" offers counterspell vs +1/+1 vs "any counter" alternatives.
- Confidence-scored diagnostics with `recognized` / `assumptions` / `unresolved` / `alternatives` surfaced in the query inspector.

---

## 4. Depth assessment (evidence-based)

**This is a solid intermediate-grade keyword spotter, not a natural-language parser.** It excels at *compositional attribute stacking* and falls off at *semantic / relational meaning.*

Empirical runs (parser output shown verbatim):

### ✅ Works excellently — sentence is a bag of known attributes
```
"red and black vampires that sacrifice creatures for my commander deck"
 → f:commander id<=br t:creature t:vampire o:sacrifice        (conf 0.98)

"green creatures with trample and haste that cost 4 or less"
 → c:g t:creature kw:trample kw:haste mv<=4                   (conf 0.98)

"I want cheap blue instants that draw cards but do not discard"
 → c:u o:draw -o:discard                                      (conf 0.94)
```

### ⚠️ Silently drops intent — CONFIRMED BUG
```
"show me white board wipes that are good in commander under 5 dollars"
 → f:commander usd<=5          ← "white" AND "board wipes" VANISHED
```
The curated "commander … under N dollars" fast-path at `assets/js/maze/scryfall-parser.js:88` `return`s early and discards every other word in the sentence. The early-return curated rules are **greedy and lossy** — they do not merge with the compositional passes. This is the single most damaging correctness issue for long sentences, because longer input is *more* likely to trip a fast-path. Reproduces with and without the seed loaded.

### ❌ Breaks on relational / semantic language — the ceiling
```
"goblins that deal damage when they enter the battlefield and get bigger over time"
 → t:goblin                    ← everything else unresolved

"something that punishes my opponents when they draw too many cards"
 → o:draw                      ← conf 0.35, misses the entire "punish" concept

"I need graveyard recursion in an Abzan deck with cards that return
 creatures from the graveyard"
 → o:graveyard id<=wbg t:creature   (conf 0.72, unresolved: [need, return])
```
Notes:
- "enter the battlefield" missed `o:enters` purely because the trigger is spelled "enters the battlefield" — matching is exact-substring with **no stemming / lemmatization**.
- "deal damage," "punish," "get bigger" aren't in the dictionary, so they evaporate.

### Verdict
- **Output syntax quality: high.** Correct operators, `otag:` functional tags, proper `id<=` vs `c:`, OR-grouping, quoting.
- **Input understanding: dictionary lookup.** As good as the ~500 known triggers, blind to anything phrased outside them.
- It **cannot** yet reliably turn an arbitrary long English sentence into a viable query. It **can** nail a *structured* sentence built from known MTG vocabulary.

---

## 5. Enhancement roadmap (priority order)

### P0 — Fix the lossy early-return (bug, not enhancement)
The curated rules in `detectHighConfidenceSearch` (`assets/js/maze/scryfall-parser.js:81`) should **contribute** fragments to the compositional pipeline, not short-circuit it. Minimum viable: before returning a curated result, run the normal detectors and merge non-overlapping terms (color, type, format). Fixes "white board wipes under 5 dollars." Highest value, lowest risk.

### P1 — Stemming / fuzzy trigger matching
"enter" vs "enters," "sacrificing" vs "sacrifice," "dies" vs "die." A light Porter-stemmer or trigger-suffix normalization applied to **both** input and dictionary keys would recover a large class of near-misses with zero new vocabulary. Today `hasPhrase` (`:1169`) is strict word-boundary substring only.

### P2 — Grow the semantic layer via `otag:` (Scryfall functional tags)
The parser already uses these well (`otag:board-wipe`, `otag:removal`, `otag:mana-rock`). Scryfall's Oracle tags cover hundreds of relational concepts ("punisher," "pillowfort," "extra-combat," "aristocrats," "stax"). Mapping more English intents → `otag:` is the biggest bang-for-buck way to understand relational language **without** building a real parser. This is a data task (extend the seed JSON), not an engine rewrite.

### P3 — Surface "unresolved" words back to the user
The parser already computes `unresolved`. UX opportunity: a chip like *"I ignored: punishes, opponents — did you mean an effect?"* so users learn the vocabulary instead of getting silently narrowed results. Scaffolding already exists in the result object.

### P4 (optional, larger) — LLM-assisted fallback for low-confidence parses
When `confidence < 0.5` and `unresolved.length` is high, offer an opt-in "interpret with AI" that sends the sentence to a Claude call returning Scryfall syntax, shown in the same inspector for user confirmation. Keep the deterministic parser as the default (fast, free, offline); use the model only as an escape hatch for genuinely free-form sentences. This is the only path that truly delivers "any long English sentence → viable query."

---

## 6. File map (for any follow-up work)

| Concern | File |
|---|---|
| NL → Scryfall engine | `assets/js/maze/scryfall-parser.js` |
| Vocabulary (built-in) | `assets/js/maze/scryfall-dictionary.js` |
| Vocabulary (curated seed, 260 rows) | `data/maze/scryfall-parser-seed-2026.json` |
| Mode routing / contract | `assets/js/maze/maze-query-core.js` |
| Syntax → English (inspector) | `assets/js/maze/research-syntax-language.js` |
| Scryfall API calls + caching | `assets/js/maze/research-search.js` |
| Seed load + dictionary merge | `assets/js/maze/research-init.js:564` |
| Page shell / modes UI | `maze/index.html` |
| Parser tests | `tests/maze/scryfall-parser-tests.js`, `tests/maze/maze-search-tests.js` |
| Test command | `npm run test:parser` |

---

## 7. Motivating real-world failure (user recon, 2026-07-03)

**Input:** `all villains from the spiderman set`
**Produced:** `all villains from the spiderman set f:commander` (conf 35%, unresolved: all, villains, spiderman, set) — i.e. it searched Scryfall for the raw English string.
**User's correct hand-built query:**
`type:villain (game:paper) (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm) prefer:best`  → 59 cards.

### Three independent root causes (all data/architecture, not tuning)
1. **`villain` is not in the vocabulary.** `subtypes` in `scryfall-dictionary.js` is a hand-maintained ~40-entry list. "Villain," "hero," "squire," "insect" are all missing. Hardcoding types does not scale — new types ship every set.
2. **No set resolution exists.** There is no set table in the engine. `detectFieldSearches` (`scryfall-parser.js:513`) only matches a literal 2–6 char code (`set:spm`), never a marketing name. And one marketing name maps to **many** set codes (`spm, spe, aspm, pspm, tspm`) — a grouping concept the current design lacks entirely.
3. **Scope/glue words became noise.** "all," "from," "set" fell through to `unresolved` instead of being understood.

### Additional target sentences the engine must handle
- "all heroes in the marvel set" (ambiguous set — Marvel is a whole UB line)
- "all squires in the bloomburrow set"
- "all insects in all sets" (no set constraint)
- "all dragons with counters that are red blue or black or all 3 and have haste and can be a commander"

---

## 8. Ground-up redesign: grounded, structured semantic compiler

The current engine is a **flat dictionary lookup** (`phrase → fragment`). Its ceiling equals the size of the hardcoded tables; it has no structure, no grounding, and no set knowledge. The target is a **grounded, structured semantic compiler** in six layers.

### Layer 0 — Grounded vocabulary (removes the hardcoded-list ceiling)
Hydrate types/keywords/sets from Scryfall's canonical APIs instead of hand-maintaining them (cache; they change only when a set drops):
- `/catalog/creature-types`, `/catalog/card-types`, `/catalog/supertypes`, `/catalog/artifact-types`, `/catalog/land-types`, `/catalog/planeswalker-types`, `/catalog/enchantment-types`, `/catalog/spell-types`
- `/catalog/keyword-abilities`, `/catalog/keyword-actions`, `/catalog/ability-words`
- `/sets` → `name`, `code`, `parent_set_code`, `set_type`, `released_at`

This alone fixes subject recognition for villain/hero/squire/insect with zero ongoing maintenance.

### Layer 1 — Tokenizer + typed entity resolver
Tokenize, then resolve each span against grounded catalogs into a **typed entity** with fuzzy matching (trigram / Levenshtein) for misspellings and plurals:
```
"all villains from the spiderman set"
 all        → {scope: universe}         (no-op, not noise)
 villains   → {type: villain}           (plural→singular, catalog hit)
 from the … set → {constraint: set-group}
 spiderman  → {set-group: [spm,spe,aspm,pspm,tspm]}  (fuzzy → "Spider-Man")
```

### Layer 2 — Set-group resolution
Build a set index from `/sets`; expand a matched base set to its whole product family via `parent_set_code` (main + tokens + promos + art + commander). Marketing-name → code-group is the piece the current engine has no concept of.
```
"spider-man"    → (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm)
"in all sets"   → (no set constraint — scope = universe)
"the marvel set"→ AMBIGUOUS → offer choices
```
Product decision: **default to the full product group; offer "main set only" as an alternative** (reuses the existing `alternatives` mechanism).

### Layer 3 — Slot-filling grammar (replaces the 15 independent detectors)
Model queries as slots so parsing is **additive and lossless** — every recognized entity contributes; nothing is discarded by an early `return` (this structurally eliminates the P0 lossy-fast-path bug from §5):
```
QUERY := SCOPE? SUBJECT ATTRIBUTE* CONSTRAINT* ROLE?
  SUBJECT    → t:            (type/subtype)
  ATTRIBUTE  → color-expr | keyword | oracle-concept | stats | mv
  CONSTRAINT → set-group | format | rarity | price | legality
  ROLE       → "can be a commander"→is:commander ; "for my … deck"→identity mode
```

### Layer 4 — Color-logic sub-grammar
"red blue or black or all 3" is a mini-language ("or", "all N", "exactly", "only", "at least"). Parsed correctly:
```
"all dragons with counters that are red blue or black or all 3
 and have haste and can be a commander"
 → t:dragon id<=ubr o:counter kw:haste is:commander
```
("or all 3" is subsumed by `id<=ubr`. Offer a `+1/+1` alternative since "counters" is ambiguous.)

### Layer 5 — Bounded LLM fallback
Below a confidence threshold, offer opt-in "interpret with AI": a constrained Claude call emitting one valid Scryfall query, then **validate** it (dry-run count, auto-relax on 0 results). Deterministic stays default (fast, free, offline); the LLM is the escape hatch. Reuses Layer 2 for set grounding.

### Expected compile targets
| Input | Compiled target |
|---|---|
| all villains from the spiderman set | `t:villain (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm)` |
| all heroes in the marvel set | `t:hero` + disambiguation prompt |
| all squires in the bloomburrow set | `t:squire set:blb` (0-result feedback if absent) |
| all insects in all sets | `t:insect` |
| dragons w/ counters, R/U/B or all 3, haste, commander | `t:dragon id<=ubr o:counter kw:haste is:commander` |

### Cross-cutting: validation + feedback loop
Every generated query is validated against Scryfall's result count. On 0 results, suggest dropping the narrowest constraint. Surface the resolution ("villain = creature type; Spider-Man = 5 set codes") so users trust the translation and learn the vocabulary.

---

## 9. Recommended build phasing
1. **Phase 1 — Grounding data layer (Layer 0 + 2).** Set index + catalog-hydrated type/keyword vocab. Biggest payoff; fixes the motivating example. Decide static-generated artifact vs. live-cached API (see §7 data-pipeline rules).
2. **Phase 2 — Typed resolver + fuzzy matching (Layer 1).** Plurals, misspellings, set-group expansion, scope-word handling.
3. **Phase 3 — Slot-filling refactor (Layer 3).** Make the parser additive/lossless; retire the greedy early-returns.
4. **Phase 4 — Color-logic sub-grammar (Layer 4)** + validation/feedback loop.
5. **Phase 5 — Optional bounded LLM fallback (Layer 5).**

## 10. Locked decisions (2026-07-03)
- **Grounding source: build-time static artifact.** A script fetches Scryfall catalogs + `/sets` and writes a checked-in JSON (mirrors the existing parser-seed pattern). Works offline, deterministic, fits the source-vs-generated pipeline in `CLAUDE.md`. Re-run when new sets drop. The artifact is **generated** — do not hand-edit; update the builder script.
- **LLM tier: deferred.** Build Layers 0–4 deterministically first (free, offline, no keys). Layer 5 (bounded LLM fallback) is a later, separate effort.
- **Set-group expansion: family-aware with disambiguation.**
  - When the name resolves to **exactly one set family**, default to the **full product family** (main + tokens + promos + art + commander), with a visible **"main set only"** alternative.
    _e.g._ "Spider-Man set" → `(set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm)`.
  - When the name resolves to **multiple families / an umbrella line**, **trigger disambiguation** rather than guessing.
    _e.g._ "Marvel set" → prompt (Marvel spans more than one product/set family).
  - Resolver rule: group `/sets` rows into families via `parent_set_code`; index both the family display name and the umbrella/brand token. A brand token matching >1 family ⇒ disambiguate; a name matching exactly 1 family ⇒ expand.

## 11. VM-471 Phase 1 implementation

VM-471 implemented the first grounded compiler layer without adding LLM fallback, embeddings, a backend service, API keys, accounts, or a browser-time Scryfall catalog fetch.

Implemented files:

- `scripts/build-scryfall-grounding.mjs` fetches Scryfall catalog endpoints plus `/sets` at build time.
- `data/scryfall/grounding/scryfall-grounding.json` is the checked-in generated artifact consumed by Maze.
- `assets/js/maze/scryfall-grounded-compiler.js` adds the testable input normalizer, typed entity resolver, set resolver, query model, query builder, and explanation surface for the Phase 1 cases.
- `assets/js/maze/scryfall-parser.js` routes bounded grounded Plain Reading inputs through the compiler before falling back to the legacy dictionary parser.
- `assets/js/maze/maze-query-core.js` carries grounded ignored/applied-default diagnostics and can suppress the route-level Commander format default when the grounded compiler has already produced an intentional type/set query.
- `assets/js/maze/research-init.js` loads the local artifact from `data/scryfall/grounding/scryfall-grounding.json`; it does not call Scryfall catalog APIs in the browser.
- `assets/js/maze/research-ui.js` renders Ignored and Applied defaults groups in the existing Query Inspector.

Implemented behavior:

- `all villains from the spiderman set` now compiles to `type:villain (game:paper) (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm) prefer:best`.
- `all heroes in the marvel set` resolves `heroes` when present in the grounded catalog, does not pass `marvel set` through as raw prose, and emits an ambiguity warning when the artifact maps Marvel to multiple current families.
- `all squires in the bloomburough set` resolves the high-confidence Bloomburrow typo to `s:blb`; the current Scryfall catalog artifact does not contain `Squire`, so VM-471 does not fabricate `type:squire`.
- `all insects in all sets` compiles to `type:insect` with no set constraint.
- `all dragons with counters that are red blue or black or all 3 and have haste and can be a commander` compiles to `type:dragon id<=ubr o:counter kw:haste is:commander legal:commander`.
- Explicit syntax such as `type:villain set:spm` is preserved.

Important decisions and deviations:

- Family set groups serialize as readable `set:<code>` OR clauses. Single exact set constraints still serialize as `s:<code>` to preserve existing repo conventions and parser fixtures.
- Spider-Man product-family expansion uses a documented manual override because current Scryfall set metadata does not provide one canonical marketing-family field for that full product family. The override is only applied for set codes present in fetched Scryfall metadata.
- Product-family matches apply visible defaults `game:paper` and `prefer:best`. Those defaults are surfaced through parser diagnostics instead of being hidden.
- Grounded raw-prose fallthrough now avoids sending unresolved English directly to Scryfall. If no grounded field can be found, the parser produces a safe wildcard fallback with a warning instead of preserving raw prose as syntax.
- Generic Plain Reading still has the legacy dictionary parser behind the new compiler. VM-471 is a foundation, not a full semantic parser replacement.

## 12. Next steps

Recommended follow-up phases:

1. Retire or merge the remaining lossy high-confidence early-return paths in `assets/js/maze/scryfall-parser.js` so the whole parser becomes additive.
2. Expand the grounded resolver beyond the VM-471 acceptance slice: names, mana costs, rarity, artist, language, flavor text, numeric stats, extras/tokens/planes/schemes, and display/order preference.
3. Add a first-class UI disambiguation picker for ambiguous set families instead of only diagnostics/alternatives.
4. Add Scryfall result-count validation and 0-result recovery suggestions after query execution.
5. Keep LLM fallback deferred until deterministic Layers 0-4 are substantially complete.

---

## 13. Robustness review of VM-471 + hardened framework (2026-07-04)

Independent code review after VM-471 landed. Verdict: **strong data foundation, narrow compiler.** Treat Spider-Man / villain / insects / dragons as *regression probes, not architecture*.

### 13.1 Data layer — strong and general (keep)
`data/scryfall/grounding/scryfall-grounding.json` (schemaVersion 1) is real, future-proof grounding:
- 334 creature / 92 planeswalker / 20 artifact / 19 card / 18 land / 13 enchantment / 7 super / 6 spell types
- 220 keyword abilities, 76 keyword actions, 69 ability words
- 1,043 sets, 533 set families, 4,635 aliases

New types/sets flow in on `npm run scryfall:grounding` with zero code changes. Correct Layer 0.

### 13.2 Compiler — hardcoded to the acceptance probes (must be reframed)
`assets/js/maze/scryfall-grounded-compiler.js` consumes only a sliver of the grounded data:

| Concern | Actual behavior | Evidence |
|---|---|---|
| Keywords | Ignores the 220-entry catalog; loops a hardcoded `["haste"]`. | `scryfall-grounded-compiler.js:449` |
| Oracle concepts | Understands one word: "counter". | `scryfall-grounded-compiler.js:460` |
| Colors | Only if commander intent **and** 2+ colors; emits `id<=` only. | `scryfall-grounded-compiler.js:504-509` |
| Keyword actions / ability words | 76 + 69 entries entirely unused. | — |
| Typo handling | Hardcoded `burough→burrow` replace (one-off for Bloomburrow). | `scryfall-grounded-compiler.js:633` |
| Activation gate | Grounded compiler runs only when a set / commander / explicit-syntax signal is present; else legacy flat parser. | `scryfall-grounded-compiler.js:103-104` |

**Core defect — the activation gate creates two coexisting parsers.** A sentence without a set/commander/explicit signal (e.g. "flying blue creatures that draw cards") skips the grounded compiler and hits the legacy dictionary with all its original limits. Same user, same phrasing style, two engines and two quality tiers depending on incidental wording. Types and set-family resolution are genuinely general; everything else is probe-shaped. This inconsistency is the opposite of a proven framework.

### 13.3 Seven hardening requirements (supersede the narrow VM-472 draft)
1. **Single pipeline — retire the legacy parser.** All Plain Reading flows through one grounded compiler; no set/commander gate, no fallback-to-legacy. Fold the legacy dictionary's useful phrases into the semantic registry (data) and delete the second engine. Cross-phrasing consistency is the primary goal.
2. **Ground every field by iterating the catalogs already present.** Keywords/actions/ability-words from the 365 catalog entries (not `["haste"]`); colors + guild/shard/wedge/college identity; formats; rarity; `mv`/`pow`/`tou`/`loyalty` comparators; price; artist; watermark; frame; finish; language. Serializer picks the operator per entity type.
3. **Semantic concept registry as versioned data, not code.** "removal / draw / ramp / dies / enters / blink / aristocrats / goad / stax …" → `o:`/`otag:`/`fo:` fragments in a curated JSON that grows without engine changes. Prefer Scryfall `otag:`/`atag:` functional tags. Keep generated catalog facts and curated semantics in separate files (catalog facts never invented; per `CLAUDE.md`).
4. **Typed spans carry `{source, confidence}`** (catalog | registry | fuzzy | llm). Drives UI, repair loop, and the LLM seam. Replace all per-word typo hacks with general fuzzy + provenance.
5. **Mandatory validation + repair loop.** Dry-run the Scryfall count; on 0 results auto-relax the narrowest constraint; on low confidence surface the raw-Scryfall escape hatch + alternatives.
6. **End-user surface as first-class:** understood / ignored / did-you-mean chips; lexicon-powered typeahead; inline-editable compiled query; ambiguity as friendly choices (not "warnings"); empty-result suggestions; example/prompt gallery.
7. **Coverage corpus + governance.** Hundreds of real user-style phrasings as fixtures with a tracked hit-rate metric; golden-file assertions on the `queryModel`; a re-grounding job when sets/types drop. This is how "99%" is measured, not asserted.

### 13.4 Honest ceiling
Deterministic compiler + a good `otag:` registry ≈ 90–95% of **Scryfall-fieldable** card intent. Genuinely free-form language ("cards that feel like a slow grindy control deck") needs the opt-in LLM tier (§8 Layer 5). The architecture accepts it cleanly: compiler returns `queryModel` + confidence; the LLM slots in as a resolver below a confidence threshold, without changing the deterministic default path.

### 13.5 Reframed next card (supersedes narrow VM-472)
Compiler rebuild around: unified pipeline, full-catalog span resolution, data-driven semantic registry, provenance/confidence per span, validation+repair loop, and the end-user transparency surface — with a coverage corpus as the acceptance gate. LLM tier remains a later, separate VM.

---

## 14. Robustness evidence + maximum-coverage matrix (2026-07-04)

### 14.1 Adversarial battery (run through `parseScryfallNaturalLanguage` with the live grounding artifact)
| Case | Input | Output | Assessment |
|---|---|---|---|
| Empty | `"   "` | `(empty)` | OK |
| Gibberish | `asdf qwer zzzz` | `*` (unresolved listed) | OK — safe wildcard |
| Numeric power | `creatures with power 5 or more` | `t:creature pow>=5` | ✅ correct |
| Numeric mv | `red dragons that cost 3 or less` | `c:r t:dragon mv<=3` | ✅ correct |
| Price synonym | `cheap black removal` | `c:b otag:removal usd<=1` | ✅ good |
| Keywords (non-haste) | `blue creatures with flying and trample` | `c:u t:creature kw:trample kw:flying` | ✅ — but only because **legacy** dictionary has these; grounded compiler knows only `haste` |
| Set collision | `creatures from the time spiral set` | `t:creature s:tsp` | ✅ grounded set resolution |
| Case | `ALL VILLAINS FROM THE SPIDERMAN SET` | full Spider-Man family query | ✅ case-insensitive |
| **Negation on type** | `villains that are not legendary` | `t:legendary` | ❌ **inverts meaning** (emits legendary, not `-t:legendary`) **and drops "villains"** (legacy path has no villain) |
| **Long sentence** | `…cheap aggressive red goblins that deal damage and make treasure for my commander deck under 10 dollars` | `f:commander usd<=10` | ❌ **P0 lossy early-return still live** — discarded goblins/red/damage/treasure |
| **Multicolor (non-commander)** | `red blue black dragons` | `c:ub c:ur t:dragon` | ❌ **malformed** — overlapping color clauses instead of `c:rub` / identity |
| Homonym | `blue counters` | `c:u` (counters dropped) | ⚠️ concept lost (grounded counter handler gated off) |
| Protection guard | `creatures with protection from black` | `t:creature` | ⚠️ correctly avoids `c:b`, but drops the whole protection concept |
| Typo on subject | `dragouns that fly` | `*` | ❌ fuzzy matching exists **only for sets**, not types/keywords; no verb stemming (`fly`→flying) |
| ETB phrasing | `cards that draw cards when they enter` | `otag:draw` | ⚠️ misses ETB (`enter` vs `enters`, no stemming) |
| Injection | `dragons o:/.*/ ) OR set:war` | `o:/.*/ set:war type:dragon` | ⚠️ no crash; stray `)` stripped; silently reinterprets malformed input |

**Conclusion:** the grounded compiler is genuinely good *when it fires* (set resolution, case, explicit syntax, family expansion). But the activation gate routes most sentences to the legacy parser, which still has real **correctness** defects — negation inversion, malformed multicolor expansion, and the P0 long-sentence collapse. These are not gaps; they produce **confidently wrong** queries that pass string-equality tests.

### 14.2 Testability verdict
- **Strengths:** compile step is pure/deterministic/offline → highly unit-testable; the grounded path exposes an inspectable `queryModel` ideal for golden-file assertions.
- **Weaknesses:**
  1. **Two engines double the test surface**, and the gate makes behavior context-dependent — the *same phrase* must be tested with and without a set/commander signal to catch divergence.
  2. **String-equality tests miss semantic bugs.** The negation inversion above would pass a naive fixture. Tests must assert *meaning* (ideally a periodic live-Scryfall count check on a sampled corpus), not just the string.
  3. The **legacy path has no structured model**, so only the grounded path is golden-file-testable today.
  4. No **property-based / fuzz** tests: every emitted query should satisfy invariants (balanced parens, no duplicate contradictory clauses, valid operators) regardless of input.

**To "hold up," the test strategy needs:** (a) a unified engine so there is one surface; (b) golden `queryModel` fixtures; (c) invariant/property tests on emitted syntax; (d) a live-count semantic sampling job; (e) a labelled adversarial corpus (negation, conflicts, homonyms, typos, injection, empty, huge) as a permanent regression gate with a tracked hit-rate.

### 14.3 Maximum coverage matrix — the "next level" target
Everything below is Scryfall-fieldable and should be reachable from natural language. Grouped by operator family; **bold = not yet handled or only partial today.**

**Colors & identity**
- `c`/`color`, `id`/`identity`/`ci` with `= : <= >= < >`; **color counts** (`c=2`, `is:multicolored`, `is:monocolored`, mono/two/three/four/five-color, `c>=2`); guild/shard/wedge/college/**4-color/5-color** names; **"exactly / at most / at least / only / no other colors"**; **negation per color**; **colorless `c` vs generic**.

**Types**
- `t`/`type`: 19 card types, 7 supertypes, 334 creature / 92 planeswalker / 20 artifact / 18 land / 13 enchantment / 6 spell subtypes; **negation (`-t:`)**; **type OR groups** ("dragons or angels"); **"legendary creature" supertype+type composition** (works, keep).

**Oracle text & functional semantics**
- `o`/`oracle`, **`fo` (full oracle incl. reminder)**, regex `o:/…/`, **`otag`/`function` tags**, **`atag`/art tags**; a curated **semantic registry**: removal, board wipe, draw, ramp, tutor, recursion/reanimation, counterspell, +1/+1 counters, tokens, treasure/clue/food/blood, blink/flicker, sacrifice outlet, aristocrats, lifegain/drain, mill, discard/wheel, bounce, goad, monarch, initiative, extra turns/combats, stax/taxes, pillowfort, group hug, landfall, spellslinger, storm, cascade payoffs, ETB/dies/attacks triggers, protection-from-X, ward/hexproof/shroud.

**Mana**
- `mv`/`cmc`/`manavalue` + comparators + **`between X and Y`** + **even/odd**; `m`/`mana` symbol matching (`{G}{U}`, `{2/R}`, `{W/P}`); **`produces`**, **`devotion`**, **pip counts**, **hybrid / phyrexian / generic-only / colored-only**, **X spells (`is:x`?)**.

**Stats**
- `pow`/`tou`/`loy` + comparators; **`pt` total**; **star/`*`/variable P/T**; **relational (`pow>tou`)**; **"big/small/fatties/X-drop"** slang.

**Rarity** — `r`/`rarity` common/uncommon/rare/mythic/special/bonus + comparisons + **"at least rare"**.

**Sets, prints, collector**
- `s`/`set`/`e`, **set families (UB expansion)**, **`st` set type** (core/expansion/commander/masters/funny/…), **`b` block**, **`cn` collector number / ranges**, **`in:` printed-in-set**, **`year`/`date` comparators**, **`is:firstprinting`/`reprint`/`new:`**.

**Formats & legality** — `f`/`format`, `legal`/`banned`/`restricted`, `is:commander`/`duelcommander`/`brawlcommander`, `game:paper/mtgo/arena`.

**Prices** — `usd`/`eur`/`tix` + comparators; cheap/budget/affordable/expensive/premium bands.

**Print treatment / cosmetics**
- **`wm`/watermark**, **frame (1993/1997/2003/2015/future)**, **`is:fullart/borderless/extendedart/showcase/retro/textless/spotlight`**, **foil/nonfoil/etched**, **stamp**, **`is:promo/reserved/hires`**, **`new:art/rarity/flavor/frame`**.

**Layout / face** — **`is:split/flip/transform/mdfc/dfc/meld/leveler/saga/class/adventure/token/emblem/planar/scheme/vanguard/battle/modal`**, `is:permanent/spell/historic/party/vanilla/frenchvanilla/bear/gold`.

**Artist / flavor / language** — `a`/`artist` (+ **artist count**), **`ft`/flavor**, **`has:flavor`**, **`lang`/language**, `is:funny`.

**Names / entities** — exact (`!Name`) & fuzzy card-name; **planes/characters/commanders by name**; **numbers-as-words** ("three or more").

**Boolean & NL grammar (parser side)**
- **AND (space) / OR / `-` negation / parentheses & nesting**; comparators in English (**at least/at most/more than/fewer/up to/between/over/under/or more/or less/cheaper than**); scope (all/every/any/only/just, "in all sets", plurals); **morphology (plural→singular, verb forms, general fuzzy typos across ALL vocab, diacritics/apostrophes)**; **synonym/slang expansion**; **ambiguity resolution** (color-word-vs-cardname, counter, bounce, wall, bird); commander-intent → identity; **multi-clause relative clauses**.

**Display / API (non-query)** — `order`, `dir`, `unique`, `prefer`, `include:extras`, `game`.

### 14.4 Beyond deterministic (the true "next level")
- **Autocomplete / typeahead** off the grounded lexicon (turns the 4,635-alias index into a live UX asset).
- **Synonym + embedding similarity** for oracle concepts so unseen phrasings map to the nearest registry entry.
- **A real grammar (PEG/Earley)** replacing the 15 regex detectors → proper boolean/nesting/scope handling.
- **Live validation + repair** (count check, auto-relax, "did you mean").
- **Opt-in LLM resolver** below a confidence threshold for genuinely free-form language — the only path past the ~90–95% deterministic ceiling.

---

## 15. Review of the VM-472 plan (2026-07-04)

**Verdict: addresses the framework concerns well; six specification gaps remain before it is "maximum."**

The plan hits all seven hardening requirements from §13.3 (unify pipeline / kill the gate, consume full catalog, registry-as-data, provenance+confidence per span, validation+repair loop, end-user surface, corpus+metrics). It also adopts the two structural fixes that eliminate bug *classes*: **centralized serialization** (kills malformed `c:ub c:ur` output) and **additive slots with no early-return** (kills the long-sentence collapse). Archscry handling is correct.

### Remaining gaps to fold in before build
1. **Boolean / OR / nesting** — biggest under-specification. Slots compose with AND; "dragons or angels", "red or blue but not black", nested groups need explicit design (per-field value-lists + OR flag, or a small PEG/Earley grammar). `alternatives`/`ambiguity` ≠ intra-query disjunction.
2. **Negation as a first-class span modifier** — the §14.1 inversion bug (`not legendary`→`t:legendary`) came from unmodeled negation. Carry negation on every entity with a per-field "supports negation" rule; do not leave it only as a corpus category.
3. **Color-expression sub-grammar** (§8 Layer 4) — "exactly/at least/at most/only/no other colors", "or all 3", card-color vs commander-identity. Currently implicit; this is where multicolor went malformed.
4. **Stemming ≠ fuzzy edit-distance** — plan names only fuzzy. Add inflection/lemmatization (`fly`→`flying`, `draws`→`draw`, `dies`→`die`, `enters`→`enter`); Levenshtein won't bridge these.
5. **Invariant / property tests** — plan asserts `queryModel` + string equality (catches only anticipated cases). Add property tests holding for all inputs: balanced parens, no duplicate/contradictory clauses, valid operators only. This catches malformed output generically.
6. **Explicit field-scope** — plan covers a subset of §14.3. Silently omits watermark, layout/face predicates, `st:`/block/collector/`year`/`date`, `devotion`/`produces`/mana-symbol, `mv between`/even-odd, `pt`/relational stats, print/cosmetic. Fine to defer — but declare it.

Optional: an opt-in/periodic live-Scryfall count sampling over the corpus to catch semantic inversions no fixture author anticipated (the one safety net that flags negation bugs without a hand-written probe).

Close 1–6 and the plan is the intended time-worn framework rather than "consistent + additive."

---

## 16. VM-472 implemented foundation (2026-07-04)

VM-472 converts Plain Reading from the VM-471 activation-gated compiler into a single grounded compiler path for normal Maze Plain Reading input.

### 16.1 Implemented flow

Runtime Plain Reading now follows:

`input -> normalization -> morphology/fuzzy spans -> typed entities with provenance -> color grammar / boolean grouping / negation -> slot-ish query model -> centralized serializer -> Scryfall query + diagnostics + validation plan`

The legacy parser remains in the file as migration/reference code, but with the grounding artifact available the grounded compiler now returns the Plain Reading result for ordinary inputs instead of only firing on set/commander/explicit-syntax signals.

### 16.2 Data sources

- Generated catalog/set facts: `data/scryfall/grounding/scryfall-grounding.json`.
- Curated player-language semantics: `data/scryfall/grounding/plain-reading-semantics.json`.
- Seed dictionary migration data: `data/maze/scryfall-parser-seed-2026.json` plus `assets/js/maze/scryfall-dictionary.js`.

The browser loads the local artifacts during Maze boot. It does not fetch Scryfall catalogs or set metadata at runtime.

### 16.3 Compiler behavior now covered

- Full catalog iteration for type-line terms and keyword abilities.
- Keyword actions and ability words resolve as Oracle-text concepts rather than `kw:` abilities.
- Set codes, set names, set families, fuzzy set-name correction, and umbrella-family ambiguity.
- Color grammar takes precedence over boolean OR:
  - `red or blue creatures` -> `c<=ur type:creature`
  - Explicit Commander candidate/deck-support contexts choose an identity match mode; format-only text such as `legal in commander` does not turn color adjectives into deck identity.
- Same-field boolean OR:
  - `dragons or angels` -> `(type:dragon OR type:angel)`
- First-class negation:
  - `legendary vampires not red` -> `type:legendary type:vampire -c:r`
  - `not blue creatures with flying` -> `type:creature -c:u kw:flying`
- Semantic registry concepts including draw, removal, board wipes, blink, ramp, counters, counterspells, tokens, treasure, clue, sacrifice outlets, lifegain, graveyard hate, spellslinger, stax, and common print predicates.
- Response-based repair plan: the parser returns ordered relaxation suggestions; Maze shows them after the real Scryfall search response reports zero cards. No normal pre-flight count request is added.
- Commander filtering is no longer silently appended to generic Plain Reading searches. Commander intent emits visible query terms such as `legal:commander` or `is:commander legal:commander`.

### 16.4 Archscry behavior

Archscry-originated Maze launches still execute stored `operatorQuery` as raw Scryfall syntax. `plainReadingQuery` remains display/context text. If the user edits the visible text and reruns Plain Reading, the unified compiler handles it.

### 16.5 Test evidence

`tests/maze/scryfall-parser-tests.js` now acts as a curated golden corpus plus invariant guard:

- 125 parser cases.
- VM-471 acceptance probes retained.
- VM-472 boolean/color/negation probes added.
- Equivalent Scryfall syntax comparison tolerates `t:` vs `type:` and term ordering while still checking meaning.
- Property checks assert balanced parentheses, no duplicate serialized clauses, and no include/exclude contradictions.

`tests/maze/maze-query-contract-tests.js` asserts the non-silent Commander policy and the validation-plan diagnostic.

`tests/maze/maze-search-tests.js` loads the semantic registry in its DOM harness and preserves Archscry operator-query execution.

### 16.6 Known gaps after VM-472

- Boolean support is bounded to same-field OR groups and simple color/negation composition; nested arbitrary boolean grammar remains future work.
- Semantic registry breadth is useful but not complete; it needs ongoing corpus-driven expansion.
- Live Scryfall sampling is still optional/future, not part of default tests.
- The compiler model is slot-shaped and inspectable, but not a full AST/PEG grammar yet.
- Some exact output order differs from older tests because the serializer centralizes categories and the tests now compare equivalent syntax where order is not semantically meaningful.

---

## 17. VM-473 mixed-mode boundary repair (2026-07-04)

VM-473 fixes the remaining boundary exposed by manual Maze testing: a mixed query typed while Operator's Hand is active, such as `all heroes in the marvel set f:commander`, should not be sent to Scryfall as raw prose.

### 17.1 Deterministic classifier

Operator-mode input now follows a fixed classifier:

- Pure operator tokens remain raw.
- Operator values, quoted strings, and regex bodies are masked before English scanning.
- At least one explicit operator plus at least one English word outside operator values routes to Plain Reading.
- Zero operators plus multi-word text with recognized catalog/registry spans routes to Plain Reading.
- Zero operators plus multi-word name-like text with no recognized spans routes to the named-card endpoint.
- Single bare tokens remain raw/name-like.

Examples:

- `ci<=br t:creature o:sacrifice f:commander` remains raw.
- `o:"all heroes" f:commander` remains raw.
- `(o:"draw a card" OR t:hero) f:commander` remains raw.
- `Lightning Bolt`, `lightning bolt`, `Sol Ring`, and `Cyclonic Rift` route as card-name lookups from Operator mode.
- `red vampires that sacrifice creatures` routes through Plain Reading.
- `all heroes in the marvel set f:commander` routes through Plain Reading and preserves `f:commander`.

### 17.2 Blocking ambiguity

VM-473 makes blocking ambiguity a query-model concern instead of a separate UI flag. `queryModel.ambiguous` can now carry structured entries with `blocking: true` and choice metadata. The Maze contract derives `executionBlocked` and `blockReason` from that model.

For `all heroes in the marvel set f:commander`, the partial translation is `f:commander type:hero`, but Maze does not call Scryfall because `marvel set` maps to multiple Marvel product families. The Query Inspector renders the family choices as alternative buttons.

Blocked ambiguity does not:

- call the Scryfall search API;
- add a Recent Search entry;
- update Open in Scryfall to a partial query;
- overwrite the current executable query state.

Archscry initial launches still force stored `operatorQuery` through raw execution. If a user edits the visible query and searches again, the mixed-mode classifier applies.

---

## 18. VM-475 keyword coverage hardening (2026-07-05)

VM-475 expands parser coverage around Scryfall keyword abilities without regenerating the grounding artifact or adding runtime catalog fetching.

### 18.1 Keyword precedence rule

The compiler now resolves exact catalog keyword ability spans before type-line spans, then runs fuzzy keyword matching after type-line resolution. This preserves long official keyword phrases while preventing fuzzy keyword guesses from stealing real type/subtype terms.

Examples:

- `creatures with doctor's companion` -> `type:creature kw:"doctor's companion"`
- `creatures with doctors companion` -> `type:creature kw:"doctor's companion"`
- `creatures with partner-with` -> `type:creature kw:"partner with"`
- `all insects in all sets` remains `type:insect`, not a fuzzy `kw:infect` match.

### 18.2 Commander keyword phrasing

Plural Commander candidate phrasing now includes `commanders with ...` and `commanders without ...`.

Examples:

- `commanders with partner` -> `is:commander legal:commander kw:partner`
- `commanders without partner` -> `is:commander legal:commander -kw:partner`

### 18.3 Test evidence

`tests/maze/scryfall-parser-tests.js` now has a dedicated `keywordAbilityCases` section covering evergreen, combat/evasion, newer/current, Commander-related, negated, punctuation, and action/oracle-policy keyword phrases. A fixed catalog-smoke list also asserts selected current Scryfall keyword abilities are present in `data/scryfall/grounding/scryfall-grounding.json` and recognized by the compiler.

Current focused evidence:

- `node research\scryfall-parser-tests.js` -> 160 parser cases passed.
- `node --check research\scryfall-grounded-compiler.js` -> passed.
- `node research\maze-query-contract-tests.js` -> passed.

---

## 19. VM-477 manual checklist repair (2026-07-07)

VM-477 closes the manual checklist failures recorded from `scryfall_checklist_report_2026-07-07_2206.md` by making Commander/color grammar explicit, preserving resolved semantics through alternatives, and documenting which evidence is automated versus still manual-browser work.

### 19.1 Commander/color grammar

- Bare `commanders` is a commander-candidate request: `is:commander legal:commander` plus resolved semantic, type, text, and keyword filters.
- `legendary creatures that can be commanders` preserves both the legendary-creature intent and commander eligibility, e.g. `type:legendary type:creature is:commander legal:commander`.
- Named identity, mono-color, and five-color commander phrases are exact candidate searches: `Rakdos commanders` -> `id=br is:commander legal:commander`; `mono blue commanders` -> `id=u`; `five color commanders` -> `id=wubrg`.
- Includes-color commander wording uses identity inclusion: `commanders with blue`, `commanders that include blue`, and `blue in the color identity` -> `id>=u is:commander legal:commander`.
- Commander deck-support wording uses fit: `cards for my Rakdos commander deck` -> `id<=br legal:commander`. If no identity is named, the compiler adds Commander legality and resolved filters but does not invent WUBRG or mono-color identity.
- Actual card-color adjectives remain card color when the user only asks for Commander legality: `blue wizards legal in commander` -> `type:wizard c:u legal:commander`.

### 19.2 Alternatives, negation, and sets

- Functional and set-family alternatives are materialized after the full query model is normalized, so color, role, format, set, type, oracle, keyword, and negation context survives each alternative.
- Semantic negation targets resolved concepts instead of raw words. Examples include `without lifegain` -> a negated lifegain fragment, `without ramp` -> `-otag:ramp`, `without counterspells` -> `-otag:counterspell`, and `without devoid` -> `-kw:devoid`.
- `counter spells` and `counterspells` mean spell-countering intent; `counters` remains counter-object intent unless the wording clearly says spell-countering.
- Set-family collapsing is display-only. The executable Scryfall query may still use raw `set:` or `s:` codes, while Query Inspector explanations can present known OR groups as a friendly set family or release name.

### 19.3 Test evidence

- `node research\scryfall-parser-tests.js` -> 186 parser cases passed.
- `node research\maze-query-contract-tests.js` -> passed with VM-477 Commander/color contract checks.
- `node research\maze-search-tests.js` -> passed after model-preserving alternative changes.

---

## 20. VM-479 Plain Reading syntax leakage repair (2026-07-08)

VM-479 tightens the reverse translation surface used when moving from Operator's Hand back to Plain Reading. This remains a display translator only; executable Operator's Hand query generation still preserves raw Scryfall syntax.

### 20.1 Display translation boundary

Plain Reading now translates the Scryfall/control fields Maze currently emits into human phrases instead of raw or display-normalized syntax. Examples:

- `type:legendary type:creature` -> `legendary creature`.
- `c:w` -> `white`.
- `is:commander legal:commander` -> `commander candidates commander legal`.
- `id=br`, `id<=br`, and `id>=br` preserve distinct identity meanings: `Rakdos color identity`, `within Rakdos color identity`, and `including Rakdos colors`.
- `prefer:*`, `unique:*`, `order:*`, `sort:*`, `display:*`, `direction:*`, `include:*`, and noisy `game:*` controls are omitted from Plain Reading unless a deliberate human phrase is added later.

### 20.2 Set and family labels

The translator uses the checked-in Scryfall grounding artifact for set and product-family display labels. Known single set codes render as `from the <Set Name> set`; exact known set-family OR groups render as `from the <Family Name> product family`, independent of ordering or mixed `set:` / `s:` / `edition:` / `e:` fields. Unknown set codes may fall back to `from set <code>` only when the display lookup does not know the code.

This keeps the VM-477 rule intact: set-family collapsing is UI-only. The emitted Scryfall query may still use raw `set:` or `s:` codes.

### 20.3 Scope boundary

VM-479 intentionally does not introduce a full Scryfall syntax display registry. Oracle, regex, exact-name, artist, flavor, watermark, price, language, date/year, rarity, numeric-stat, and broader registry translation remain future VM scope unless the older translator already handled them. A future VM can expand this display layer into a wider syntax registry after the current Maze/Operator's Hand leakage is stable.

### 20.4 Test evidence

- `node research\research-mode-tests.js` covers the Bloomburrow repro, known/unknown set fallback, negated in-scope fields, identity operator wording, display-control omission, and the non-regression that Operator's Hand still shows executable raw syntax.
- `node research\research-syntax-language-tests.js` covers the syntax translator directly.
- `node research\maze-search-tests.js`, `npm.cmd test`, and `git diff --check` passed during VM-479 closeout.

---

## 21. VM-480 functional-tag display repair (2026-07-08)

VM-480 closes the remaining VM-479-adjacent leakage where executable functional Oracle tags such as `otag:draw` could reverse-translate into `otag draw` in Plain Reading.

### 21.1 Display aliases

Plain Reading display treats these Scryfall functional Oracle-tag operators as equivalent aliases:

- `otag:`
- `function:`
- `oracletag:`

This is display-only. Maze still emits `otag:` for executable Operator's Hand queries when the compiler or semantic registry chooses a functional tag.

### 21.2 Human phrasing

Known tags render with curated human wording:

- `otag:draw` -> `card draw`.
- `otag:counterspell` -> `counterspells`.
- `otag:ramp` -> `ramp`.
- `otag:board-wipe` -> `board wipes`.
- `otag:mana-rock` -> `mana rock effects`.

Unknown functional tags remove the syntax prefix, replace hyphens/underscores with spaces, and add `effects` when that reads naturally. Negated functional tags preserve exclusion intent, e.g. `-function:ramp` -> `excluding ramp`.

### 21.3 Scope boundary

VM-480 intentionally does not add `art:`, `atag:`, or `arttag:`. Those are illustration-tag operators, not functional Oracle tags, and stay deferred unless Maze starts emitting them.

### 21.4 Test evidence

- `node research\research-syntax-language-tests.js` covers functional-tag aliases, unknown tag humanization, and negation.
- `node research\research-mode-tests.js` extends the VM-479 leakage helper to reject raw and display-normalized leakage for `otag:`, `function:`, and `oracletag:`.
- `npm.cmd test` and `git diff --check` passed during VM-480 closeout.

---

## 22. VM-481 retest failure repair (2026-07-08)

VM-481 repairs compiler-semantics failures from `scryfall_checklist_report_2026-07-08_1840.md`. Unlike VM-479 and VM-480, this VM may change Operator's Hand output, but only for the retested compiler fixtures.

### 22.1 Color and Commander identity

- Actual-card color with explicit Commander legality can be exact: `blue wizards legal in commander` -> `type:wizard c=u legal:commander`.
- Named multicolor adjectives before actual card types use no-outside-color card color (`c<=...`) to prevent off-color leaks, not deck identity.
- Explicit mono deck-support is intentionally exact identity (`id=b legal:commander`) for color-specific support fixtures; non-mono deck-support remains fit-based (`id<=br legal:commander`).
- Commander candidates preserve exact named/colorless/five-color/four-color identities, including Glint/Chaos (`id=ubrg`) without Dimir or WUBRG leakage.
- Colorless commander searches that also ask to make colorless mana preserve both intents: colorless identity (`id:c`) and separate mana production (`produces:c`).

### 22.2 Semantic groups and token objects

- `without lifegain` now negates numeric life-gain language and lifelink instead of allowing positive lifegain fragments to survive.
- `recur creatures` resolves through graveyard/return semantics and does not leave `recur` unresolved.
- `counters` remains counter-object intent and does not generate counterspell alternatives unless the wording clearly says spell-countering.
- Token-object wording such as `inkling tokens from Strixhaven legal in commander` compiles as `type:inkling type:token` with set/color context. The compiler warns that token objects are not Commander deck-legal cards and does not add `legal:commander`.
- Ambiguous set-family wording such as `marvel set` and `tarkir set` remains an expected block until the user chooses a specific family.

### 22.3 Test evidence

- `node research\scryfall-parser-tests.js` -> 202 parser cases passed, including the 15 visible retest failures and hidden Glint negative regression.
- `node research\maze-query-contract-tests.js` -> passed with token-object Commander legality contract coverage.
- `node research\maze-search-tests.js` -> passed.
- `node research\research-mode-tests.js` -> passed.
- `npm.cmd run test:plain-reading-semantics` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

---

## 23. VM-482 token-object format suppression and four-color commanders (2026-07-09)

VM-482 closes the follow-up retest failure where Plain Reading correctly compiled Silverquill inkling token objects to `type:inkling type:token c<=wb s:stx`, but searching that query from Operator's Hand could append the sidebar Commander format default as `f:commander`.

### 23.1 Token-object format default boundary

- Automatic format defaults are suppressed only when the executable query contains a positive token-object type clause: `type:token` or `t:token`.
- The matcher is field-aware and strips only a single outer grouping wrapper, so `(type:token)` is treated like `type:token`.
- The matcher does not fire on token-making or unrelated token text, including `o:token`, `o:"create a token"`, `st:token`, `include:extras`, plain `token`, quoted values, or negated `-type:token`.
- Explicit Operator's Hand format syntax is preserved; VM-482 does not strip a user-authored `f:commander`.
- Sidebar format changes now reuse the same shared helper, so selecting Commander after a token-object search does not reintroduce `f:commander`.

### 23.2 Four-color Commander grammar

- Generic four-color Commander candidates compile to Scryfall identity-count syntax: `four color commanders` -> `id=4 is:commander legal:commander`.
- Filters are preserved, e.g. `four-color commanders that draw cards` -> `id=4 otag:draw is:commander legal:commander`.
- Named four-color identities still win over generic count wording. `Glint four color commanders` and `four color Glint commanders` resolve to `id=ubrg`, not `id=4`.

### 23.3 Test evidence

- `node research\scryfall-parser-tests.js` -> 207 parser cases passed.
- `node research\maze-query-contract-tests.js` -> passed with token-object format-default guards.
- `node research\maze-search-tests.js` -> passed.
- `node research\research-mode-tests.js` -> passed with token-object mode-switch coverage.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

---

## 24. VM-483 final retest repair (2026-07-09)

VM-483 repairs the seven remaining rows from `scryfall_checklist_report_2026-07-09_0819.md` and treats the Silverquill token-object failure as a shared search-path bug, not a parser-only bug.

### 24.1 Scoped umbrella families

- `marvel set` and `tarkir set` now have explicit umbrella handling for the proven retest phrases.
- Marvel expands to the known Marvel family codes surfaced by the retest: `msh`, `amsh`, `msc`, `tmsh`, `spm`, `spe`, `aspm`, `pspm`, `tspm`, `fmsc`, `tmsc`, `mar`, `lmar`, `omb`.
- Tarkir expands to `dtk`, `pdtk`, `ptkdf`, `tdtk`, `ttdc`, `tdm`, `atdm`, `ptdm`, `tdc`, `ttdm`, `ytdm`.
- Other ambiguous set-family names still block unless existing grounding data gives one unambiguous product family.

### 24.2 Intent-aware Commander format gate

- Automatic format defaults are centralized through `applyMazeFormatToQuery()` and `shouldApplyFormatDefault()`.
- The raw Operator's Hand search path and Plain Reading compile/search path both call the shared helper in `assets/js/maze/maze-query-core.js`.
- Sidebar format changes call the same helper from `assets/js/maze/research-init.js`.
- Plain Reading to Operator's Hand tab switching displays the compiled `lastSmartQuery`; it must not resurrect the original prose for blocked or token-object searches.
- Token-object intent suppresses automatic `f:commander` and automatic `legal:commander`; user-authored raw legality such as `type:token f:commander` or `type:token legal:commander` is preserved.

### 24.3 Retest semantics

- The Spider-Man/Rakdos Villain row uses exact actual card color (`c=br`) to avoid transform/off-color leakage.
- Mardu warriors from Tarkir intentionally keep `c<=wbr` because that fixture wants Commander-legal Warriors within Mardu colors, not only exact three-color cards.
- `attack with tokens` compiles as one bound Oracle-text fragment, not loose independent `o:token o:attack` fragments.
- `Glint chaos blue black red green` resolves as one full four-color identity span: exactly `id=ubrg`, with no smaller `id=ub` leak and no generic `id=4` fallback.

### 24.4 Test evidence

- `node research\scryfall-parser-tests.js` -> 207 parser cases passed.
- `node research\maze-query-contract-tests.js` -> passed with all seven VM-483 rows and format-gate assertions.
- `node research\maze-search-tests.js` -> passed with Silverquill token-object, Glint/Chaos, and Tarkir tab-switch UI-path coverage.
- `node research\research-mode-tests.js` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

### 24.5 VM-484 regression hardening

VM-484 adds a narrow guard against token-maker phrases being misread as token-object phrases. `pest tokens` and `treasure tokens` still compile as token objects (`type:<subtype> type:token`) and suppress automatic Commander legality. `cards that create tokens`, `cards that create creature tokens`, and `cards that make tokens` compile as normal card searches with token-making Oracle intent (`o:token legal:commander`). Additional contract and UI tests cover grouped `type:token` / `t:token`, negated token clauses, `oracle:token`, quoted token text, and sidebar/Operator's Hand behavior.

---

## 25. VM-487 Scryfall checklist follow-up (2026-07-09)

VM-487 repairs the three failures and two hidden defects reproduced from `scryfall_checklist_report_2026-07-09_1916.md`. The downloaded report still has 72 untested rows; VM-487 covers only the five proven defects and their controls.

### 25.1 Scoped actual-card color pools

- Named multicolor identities attached to normal printed type/subtype searches use `c<=<colors> -c:c`.
- `Rakdos villains` therefore includes black, red, and black-red Villains without colorless or outside-color cards.
- Commander candidates remain exact `id=`, deck support remains `id<=`, explicit identity wording remains identity syntax, exact-color wording remains `c=`, and single-color actual-card searches remain unchanged.
- Token objects are excluded from this rule; Silverquill keeps `c<=wb` without the normal-card colorless exclusion.

### 25.2 Token child-set refinement

- The compiler detects token-object intent, resolves set intent, then refines only that resolved set path.
- Playable parent/product sets are replaced with grounded child sets whose Scryfall set type is token, excluding `Substitute Cards` from inferred token-object children.
- One child emits `s:<code>`; multiple children emit a token-only paper set group with `prefer:best`; no child preserves the parent set.
- Explicit token/substitute-set input remains exact, and token-maker searches never enter refinement.
- The Silverquill and Pest Strixhaven fixtures now use `s:tstx`, not `s:stx` or the unrelated `sstx` substitute-card set.

### 25.3 Recovery and diagnostic repairs

- Strict Glint remains `id=ubrg o:treasure otag:draw is:commander legal:commander`.
- A zero result can offer `Use any matching commander` with `id=ubrg is:commander legal:commander`; Partner syntax is not inferred.
- The semantic registry now handles positive `mill` as `o:mill` and `without mill` as `-o:mill`.
- Candidate detection consumes redundant `legal in commander` wording after emitting legality, preventing false unresolved diagnostics.

### 25.4 Test evidence

- `npm.cmd run test:parser` -> 221 parser cases passed.
- Maze contract, route UI, and mode-switch suites passed.
- Chromium browser smoke passed on desktop and mobile, preserving VM-485 modal and Reading Finds coverage.
- `npm.cmd run test:frontend-smoke`, lint, semantic validation, and `npm.cmd test` passed.
- Live Scryfall sanity checks confirmed the repaired queries without pinning mutable counts in automation.

---

## 26. VM-490 Partner and bare-name search repair (2026-07-09)

VM-490 repairs two manual failures that crossed the Plain Reading and Operator's Hand boundary.

### 26.1 Partner and all-colors semantics

- `cards with partner in all colors` compiles to exactly `o:partner`.
- `all colors` is consumed as an unconstrained color phrase and cannot fuzzily resolve to the Alliances set code `all`.
- The exact unscoped `o:partner` query suppresses the selected format default after switching to Operator's Hand.
- Commander-candidate Partner searches still use `kw:partner is:commander legal:commander`; `partner with`, negative Partner wording, real sets, and other Oracle searches retain their existing paths.

### 26.2 Conservative bare-name fallback

- Plain Reading `captain america` compiles to `name:"captain america"` and executes `/cards/search` instead of falling back to `*`.
- Punctuation-bearing names that otherwise produce one incidental type span, such as `A-Alrund, God of the Cosmos`, also become `name:"..."` searches.
- Arbitrary unresolved prose remains `*`; resolved card-search phrases continue through the grounded compiler.
- Explicit `!Name` and `card named Name` searches keep the existing `/cards/named` modal route.
- Standalone name lookups and display-only name variants do not receive `f:commander`. Mixed name-plus-deck filters still use the normal format gate.

### 26.3 Test evidence

- `npm.cmd run test:parser` -> 226 parser cases passed.
- Maze contract, mode-switch, and route UI suites passed.
- Desktop and mobile browser smoke passed, including Plain Reading to Operator's Hand re-searches for Partner, Captain America, and A-Alrund.
- Semantic validation, frontend smoke, JS/HTML lint, and `npm.cmd test` passed.
- Live Scryfall checks returned nonzero results for `o:partner`, `name:"Captain America"`, and `name:"A-Alrund, God of the Cosmos"` without pinning result counts in automation.

---

## 27. VM-591 Shared Semantic-State Contract Freeze (2026-08-28)

VM-591 freezes a future cross-mode meaning contract without migrating the current runtime. The normative specification is `docs/contracts/maze-semantic-state-contract.md`; the machine-readable schema is `data/maze/maze-semantic-state-v1.schema.json`.

The contract reuses the grounded compiler `queryModel` as Plain Reading adapter evidence, current `builderFilters` as Loom adapter evidence, and the current source-context/query-result boundary. It does not promote a query or reverse-translated display string into semantic authority.

Key boundaries:

- one structured state preserves hard constraints, Boolean groups, preferences, contexts, lenses, assumptions, conflicts, unresolved terms, variants, display forms, and recommendation signals;
- printed color and color identity retain explicit relation semantics;
- context presence and query application are separate;
- `MazeQueryResult.query` remains the sole executable query contract;
- no production Maze module imports the VM-591 schema in this card;
- Loom's default color-rule decision remains deferred to VM-592.

Eighteen focused fixtures validate the accepted Calibration V3.2 and Loom compatibility failure classes, including Plain/Operator and Loom/Operator round trips, context-not-applied, explicit syntax preservation, and invalid no-query state.
