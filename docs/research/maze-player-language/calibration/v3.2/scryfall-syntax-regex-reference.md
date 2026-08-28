# Scryfall Syntax & Regex — Complete Reference for NL→Query Mapping
*Sourced directly from https://scryfall.com/docs/syntax and https://scryfall.com/docs/regular-expressions. Every entry below is either (a) confirmed by these two official pages, or (b) explicitly marked UNCONFIRMED where this conversation used it successfully but the official docs didn't spell it out. Never present an UNCONFIRMED item as documented fact.*

---

## PART 1 — CORE SYNTAX KEYWORDS

### Color & Color Identity
| Syntax | Meaning |
|---|---|
| `c:` / `color:` | Card's own printed color |
| `id:` / `identity:` | Deck-building color identity |
| Full names (`blue`) or letters (`w u r b g`) | Both accepted by `c:`/`id:` |
| `c`/`colorless`, `m`/`multicolor` | Special color-count shortcuts |
| Guild/shard/college/wedge nicknames (`azorius`, `bant`, `quandrix`, `abzan`) | Valid color-set names for `c:`/`id:` |
| Four-color nicknames: `chaos`, `aggression`, `altruism`, `growth`, `artifice` | Valid for `c:`/`id:` |
| `>=`, `<=`, `!=` etc. on `c:`/`id:` | Range comparison |
| Numbers instead of letters (`c=2`, `color>=3`) | **Officially confirmed**: "You can also use numbers instead to find cards that have that many colors." Use `c=N`/`id=N` for exact color-count, not a separate `colors:` keyword — no such standalone keyword is documented |
| `has:indicator` | Cards with a printed color indicator |

**NL mapping cheatsheet:**
- "exactly X and Y colors, nothing else" → `c=xy` or `id=xy`
- "legal in an X/Y deck" (inclusive of mono/colorless) → `id<=xy`
- "mono-X only, no gold" → `c=x` (NOT `id<=x`, which still admits gold via `<=`)
- "X or Y, never both together" → `(c=x or c=y)`

### Card Types
| Syntax | Meaning |
|---|---|
| `t:` / `type:` | Any supertype, card type, or subtype |
| Partial words allowed | `t:instant` also loosely matches on substrings per docs note "using only partial words is allowed" — verify narrow vs. broad intent |

**NL mapping:** "creatures," "instants," "equipment," "sagas," "vehicles" → always `t:`, never `o:` or `c:`. A **type-line check is mandatory** before assuming a card fits a `t:` filter (see Trap #5 in Part 3).

### Card Text
| Syntax | Meaning |
|---|---|
| `o:` / `oracle:` | Current Oracle text (rules-updated wording, e.g. "dies" not "is put into a graveyard") |
| `fo:` / `fulloracle:` | **Full** oracle text — includes reminder text. Broader than `o:` |
| Quotes `" "` | Required around text containing spaces/punctuation |
| `~` | Placeholder for the card's own name (works in plain `o:` search, not just regex) |
| `keyword:` / `kw:` | Cards with a specific named keyword ability. **Both forms officially documented** (confirmed directly: "You can also use keyword: or kw: to search for cards with a specific keyword ability.") |

**NL mapping cheatsheet:**
- "the card says X" (visible rules text) → `o:"X"`
- "the card says X even in reminder text / italics" → `fo:"X"`
- "the card triggers off entering/dying referring to itself" → `o:"~ enters"`, `o:"~ dies"`
- "the card HAS keyword K" (not merely grants it) → `keyword:K` — **this is the only field proven immune to substring false-positives** (see Part 3)

> ⚠️ **`kw:` (shorthand for `keyword:`) is now officially confirmed** — directly documented on Scryfall's syntax reference. No longer treat as empirically-observed-only.

### Mana Costs & Mana Value
| Syntax | Meaning |
|---|---|
| `m:` / `mana:` | Cards with specific mana cost symbols |
| `{G}`, `{2/G}` etc. | Official Comprehensive Rules mana symbol text; complex/split symbols MUST be wrapped in braces |
| Bare letter shorthand (`G` = `{G}`) | Only for non-split symbols |
| `>`, `<`, `=`, `>=`, `<=`, `!=` | Mana-cost comparison — "greater" means superset of symbols, "less" means subset |
| `manavalue` / `mv` | Numeric mana value, same comparison ops |
| `manavalue:even` / `manavalue:odd` | Parity filters |
| `is:hybrid` | Contains hybrid mana symbols |
| `is:phyrexian` | Contains Phyrexian mana symbols |
| `devotion:` | Devotion level (single-color pips, or hybrid for 2) |
| `produces:` | **What mana type(s) the card can produce** — see Part 4 callout, underused this conversation |

**NL mapping cheatsheet:**
- "costs exactly N mana" → `mv=N`
- "cheap" / "costs N or less" → `mv<=N` (make the N an explicit, visible parameter — never bake in silently)
- "makes/taps for [color] mana" → prefer `produces:` over text-pattern `o:"{T}: Add"` when possible (see Part 4)

### Power / Toughness / Loyalty
| Syntax | Meaning |
|---|---|
| `power` / `pow`, `toughness` / `tou`, `pt`/`powtou` (combined), `loyalty`/`loy` | All support `>`, `<`, `=`, `>=`, `<=`, `!=`, and can compare against each other or a number |

### Multi-Faced Cards
| Syntax | Meaning |
|---|---|
| `is:split`, `is:flip`, `is:transform`, `is:meld`, `is:mdfc`, `is:dfc`, `is:leveler` | Each a distinct multi-face mechanism |

**NL mapping:** "Adventure card," "transforms," "MDFC," "split card" → use the matching `is:` flag rather than assuming type-line behavior; DFCs' color/identity can reflect combined-face rules that surprise a naive `t:`/`c:` search (see Trap in Part 3).

### Spells, Permanents, Effects
| Syntax | Meaning |
|---|---|
| `is:spell` | Cast as a spell |
| `is:permanent` | Permanent card |
| `is:historic` | Legendary/artifact/Saga |
| `is:party` | Can join a party |
| `is:modal` | Has modes |
| `is:vanilla` / `is:frenchvanilla` | No abilities / only keywords, no text |
| `is:bear` | 2/2 for 2 joke-filter |

> ⚠️ **`is:etb` is NOT documented anywhere in the official syntax reference** — confirmed on a full, complete re-read of the entire page (all sections, not just the Spells/Permanents/Effects section). Treat as unofficial/unreliable — spot-check directly before relying on it in a generated query.

> 🆕 **`is:gamechanger`** — finds cards on Commander's official "Game Changers" list (the high-power/cEDH-adjacent staples list). **Directly useful for "casual vs. competitive power level" requests** — `-is:gamechanger` combined with `order:edhrec` is a much better fit for "popular but still casual" than `order:edhrec` alone, which was the unresolved gap flagged in this conversation's "goodstuff staples for casual commander" search.

> 🆕 **`edhrecrank` / `edhrec`** — a *numeric filterable field* (`edhrecrank<=100`), distinct from `order:edhrec` (a *sort*, not a filter). Ranks start at 1 and increase with decreasing popularity; use `>` for less-popular cards. Basic lands excluded from ranking.

> 🆕 **`g:` / `group:`** — finds cards in sets directly tied to a particular release (parent/sibling/child sets sharing one product family), by providing any one set code in that family.

> 🆕 **`stamp:`** — security stamp search: `stamp:oval`, `stamp:acorn`, `stamp:triangle`, `stamp:arena`.

> ⚠️ **Minor inconsistency in the source docs, not resolved:** one example uses `sort:edhrec` while the Display Keywords section header uses `order:edhrec`. Both appear in the same official document — default to `order:` as the more consistently-used form throughout, but don't assume `sort:` is wrong without a direct test.

### Format Legality
| Syntax | Meaning |
|---|---|
| `f:` / `format:` | Legal in a given format — **this is the ONLY documented keyword for legality** |
| `banned:` | Explicitly banned in a format |
| `restricted:` | Restricted in a format |
| `is:commander` | **Can be your commander** — distinct from `f:commander` |
| `is:brawler`, `is:companion`, `is:duelcommander` | Analogous role-eligibility flags |
| `is:reserved` | Reserved List |

**Supported format codes (per full-text re-read):** standard, future, historic, timeless, gladiator, pioneer, modern, legacy, pauper, vintage, penny, commander, oathbreaker, standardbrawl, brawl, competitivebrawl, alchemy, paupercommander, duel, oldschool, premodern, predh, tlr (Tiny Leaders: Reborn). *Note: an earlier fetch of this same page also listed `explorer`, which is absent from this fuller read — flagging as a possible source/version discrepancy rather than asserting either list is definitive.*

**Additional confirmed role/eligibility flags:** `is:brawler`, `is:companion`, `is:duelcommander`, `is:oathbreaker`, `is:partner` (any flavor of Commander Partner mechanic).

**Additional confirmed `is:` flags found on full read, not previously captured:**
- Permanent/mechanic-related: `is:outlaw`, `is:manland` (lands that become creatures), `is:meldpart`, `is:meldresult`, `is:newinpauper`
- Print/product-related: `is:booster`, `is:planeswalker_deck`, `is:league`, `is:buyabox`, `is:giftbox`, `is:intro_pack`, `is:gameday`, `is:prerelease`, `is:release`, `is:fnm`, `is:judge_gift`, `is:arena_league`, `is:player_rewards`, `is:media_insert`, `is:instore`, `is:convention`, `is:set_promo`, `is:datestamped`
- Digital/alchemy: `is:alchemy` (Arena Alchemy cards), `is:rebalanced` (Arena Rebalanced), `is:digital`
- Frame/border/finish: `is:full` (full art), `is:etched`, `is:glossy`, `is:new` (2015 frame), `is:old` (1993/1997 frame), `is:default`, `is:atypical`, `is:colorshifted`
- Universes Beyond: `is:universesbeyond`, `not:universesbeyond`
- Land nicknames (expanded list): `is:bondland` (alias crowdland/bbdland/battlebondland), `is:pathway`, `is:surveilland`, `is:slowland`, `is:tricycleland` (alias trikeland/triome)

> 🔴 **`legal:` is NOT a documented keyword.** Only `f:`/`format:` exist for this purpose. `legal:commander` (used mistakenly in the master query list) should be `f:commander`.

> 🔴 **`f:commander` ≠ `is:commander`.** This is the single most-repeated error pattern across this whole conversation. `f:` = "legal to include in the 99." `is:` = "eligible to occupy the command zone." Never substitute one for the other.

### Sets, Blocks & Cubes
| Syntax | Meaning |
|---|---|
| `s:` / `e:` / `set:` / `edition:` | Set code |
| `cn:` / `number:` | Collector number within a set (rangeable: `cn>50`); combine with `s:` for a specific edition |
| `b:` / `block:` | Block, via any set code in that block |
| `g:` / `group:` | Cards in sets tied to one product release — parent, sibling, and child sets together |
| `in:` | "Once passed through" a given set code (any printing ever, e.g. `in:lea` = ever appeared in Alpha) |
| `st:` | Product type: primary (`core`, `expansion`, `draftinnovation`), series (`masters`, `funny`, `commander`, `duel_deck`, `from_the_vault`, `spellbook`, `premium_deck`), specialized (`alchemy`, `archenemy`, `masterpiece`, `memorabilia`, `planechase`, `promo`, `starter`, `token`, `treasure_chest`, `vanguard`) |
| `-in:core` | `in:` also works negated with a set-type, for "no printings in this product type" |
| `is:booster`, `is:planeswalker_deck` | Sold specifically in these product types |
| `is:league`, `is:buyabox`, `is:giftbox`, `is:intro_pack`, `is:gameday`, `is:prerelease`, `is:release`, `is:fnm`, `is:judge_gift`, `is:arena_league`, `is:player_rewards`, `is:media_insert`, `is:instore`, `is:convention`, `is:set_promo` | Specific promo distribution channels |
| `is:datestamped` | Promos carrying a date stamp |
| `cube:` | Named cube list membership |
| Supported cube names | arena, grixis, legacy, chuck, twisted, april, protour, uncommon, modern, amaz, tinkerer, livethedream, chromatic, vintage, apcube |

**NL mapping:** "printed in set X" (that exact printing) → `s:X`. "has ever appeared in set X, any printing" → `in:X`. "from a Masters set," "from a Commander precon" → `st:masters` / `st:commander`. "prerelease promo" → `is:prerelease`. "in the Vintage Cube" → `cube:vintage`.

> 🔴 **`blocks:` (plural) is NOT valid** — confirmed absent from docs; only singular `block:`/`b:` exists.

### Regex Entry Point
| Syntax | Meaning |
|---|---|
| `/pattern/` in place of quotes | Valid for `type:`/`t:`, `oracle:`/`o:`, `flavor:`/`ft:`, and `name:` |
| Forward slashes inside pattern | Must be escaped `\/` |
| **No inline flags** | `o:/tap/gi` does NOT work — Scryfall silently misparses trailing characters after the closing `/` as a separate bare-word search term (this is the mechanism behind the `/i` corruption trap) |

### Negation & Logic
| Syntax | Meaning |
|---|---|
| `-` prefix | Negates almost any keyword (confirmed: all except `include:`) |
| `not:` | `is:` inverse shortcut (`not:X` = `-is:X`) |
| `or` / `OR` | Explicit OR between terms |
| Implicit AND | All non-OR'd terms are ANDed by default |
| `( )` | Groups conditions, most useful combined with OR |

**NL mapping — critical logic trap:** a cost cap combined with an alternate condition via OR (`mv<=3 or o:"Sacrifice"`) lets the *other* branch bypass the cap entirely. Cost/mana constraints should almost always be a **separate AND'd term**, never OR'd alongside a text condition, unless the intent is genuinely "cheap OR has this text regardless of cost."

### Display / Sort (not filtering, but often requested in NL)
| Syntax | Meaning |
|---|---|
| `unique:cards` / `unique:prints` / `unique:art` | Dedup mode |
| `order:` (`cmc`, `power`, `name`, `usd`, `edhrec`, `released`, etc.) | Sort field |
| `edhrecrank` / `edhrec` | **Numeric filter** (`edhrecrank<=100`) — distinct from `order:edhrec`, which only sorts and doesn't filter. Ranks start at 1 and increase with decreasing popularity; basic lands excluded |
| `direction:asc` / `direction:desc` | Sort direction |
| `prefer:oldest` / `prefer:newest` / `prefer:usd-low` / `prefer:usd-high` (and eur/tix equivalents) / `prefer:promo` / `prefer:default` / `prefer:atypical` / `prefer:universesbeyond` (`prefer:ub`) / `prefer:notuniversesbeyond` (`prefer:notub`) | Preferred printing when duplicates collapse |

**NL mapping:** "most popular," "staples," "played the most" → `order:edhrec` (sort) or `edhrecrank<=N` (filter — pick based on whether you're sorting or excluding). "cheapest version," "budget printing" → combine `usd<=N` with `prefer:usd-low`.

> ⚠️ **Minor source inconsistency, not resolved:** one official example uses `sort:edhrec`, the Display Keywords section header itself uses `order:edhrec`. Default to `order:` as the more consistently-used form throughout the doc.

### Rarity
| Syntax | Meaning |
|---|---|
| `r:` / `rarity:` | common, uncommon, rare, special, mythic, bonus — plus comparison ops (`r>=r` = rare or above) |
| `new:rarity` | Reprints appearing at a new rarity for the first time |
| `in:rare` | Cards that have EVER been printed at rare (any printing, not just current) |
| `is:newinpauper` | Cards new to Pauper specifically |

**NL mapping:** "at least rare," "rare or mythic" → `r>=r`. "was ever printed as a rare" (regardless of other printings) → `in:rare`, not `r:rare` (which only checks the specific printing returned).

### Prices
| Syntax | Meaning |
|---|---|
| `usd`, `eur`, `tix` | Price fields, full comparison-op support |
| `cheapest:usd` / `cheapest:eur` / `cheapest:tix` | Cheapest print of each card specifically |

### Artist, Flavor Text, and Watermark
| Syntax | Meaning |
|---|---|
| `a:` / `artist:` | Illustrator name |
| `artists>1` | Cards with more than one artist |
| `ft:` / `flavor:` | Words in flavor text |
| `wm:` / `watermark:` | Affiliation watermark |
| `has:watermark` | Any card with a watermark |
| `new:art` | New illustration for that card |
| `new:artist` | First time illustrated by that artist |
| `new:flavor` | Brand-new flavor text |
| `illustrations>1` | Cards with more than one distinct illustration |

**NL mapping:** "illustrated by X" → `a:"X"`. "mentions Y in flavor text" → `ft:Y`. "Orzhov watermark" → `wm:orzhov`.

### Border, Frame, Foil & Resolution
| Syntax | Meaning |
|---|---|
| `border:` | black, white, silver, borderless |
| `frame:1993` / `1997` / `2003` / `2015` / `future` | Frame edition era |
| `frame:legendary`, `frame:colorshifted`, `frame:tombstone`, `frame:enchantment` | Frame-effect variants |
| `is:full` | Full-art cards |
| `new:frame` | First printed in a specific frame |
| `is:nonfoil` / `is:foil` | Availability by finish (`is:foil is:nonfoil` = available in both) |
| `is:etched` / `is:glossy` | Etched foil / glossy finish |
| `is:hires` | High-resolution scan available |
| `stamp:oval` / `stamp:acorn` / `stamp:triangle` / `stamp:arena` | Security stamp type |
| `is:universesbeyond` / `not:universesbeyond` | UB crossover status |
| `is:default` / `is:atypical` | Default vs. atypical Magic frame |
| `is:new` / `is:old` | 2015 holofoil-stamp frame / 1993–1997 classic frame |

### Games, Promos, & Spotlights
| Syntax | Meaning |
|---|---|
| `game:` | paper, mtgo, arena availability |
| `in:` (game context) | Availability filter across the same three game environments |
| `is:digital` | MTGO/Arena-only, no paper printing |
| `is:alchemy` | Arena Alchemy cards |
| `is:rebalanced` | Arena Rebalanced cards |
| `is:promo` | Any promotional card, any environment |
| `is:spotlight` | Story Spotlight cards |
| `is:scryfallpreview` | Cards Scryfall previewed |

### Year
| Syntax | Meaning |
|---|---|
| `year` | Numeric comparison against release year |
| `date` | Numeric/date comparison (`yyyy-mm-dd`), or a set code standing in for that set's release date |
| `now` / `today` | Stand-in for the current date in `date:` comparisons |

**NL mapping:** "printed before 1995" → `year<=1994`. "released after [set]" → `date>[setcode]`. "not yet released" / "upcoming" → `date>now`.

### Reprints
| Syntax | Meaning |
|---|---|
| `is:reprint` | Card is a reprint |
| `not:reprint` | New to its set |
| `is:unique` | Only ever appeared in one set |
| `prints=N` | Number of times printed (comparable) |
| `sets=N` | Number of distinct sets printed in (comparable) |
| `paperprints=N` / `papersets=N` | Same two, paper-only |

### Languages
| Syntax | Meaning |
|---|---|
| `lang:` / `language:` | Specific language |
| `lang:any` | Widen to all languages (needed since default search is English-only) |
| `new:language` | First printing of a card in a given language |
| `in:` (language context) | Ever printed in a given language, any printing |

**NL mapping:** "Japanese printings" → `lang:japanese`. "first Korean printing of X" → `new:language lang:ko` combined with the card's other filters.

### Extra and Funny Cards
| Syntax | Meaning |
|---|---|
| Vanguard/plane/scheme/phenomenon cards | Hidden by default — must search their `type:` or a `set:` containing them to surface |
| `is:funny` | Un-cards, holiday cards, other funny cards |
| `include:extras` | Reveals every card, including normally-hidden extras — **the one keyword that cannot be negated** |

### Exact Names
| Syntax | Meaning |
|---|---|
| `!word` or `!"phrase"` | Exact card name match only (still case-insensitive) |

**NL mapping:** "the card literally named X" (not cards merely containing X in a longer name) → `!"X"`.

### Tagger Tags
| Syntax | Meaning |
|---|---|
| `art:` / `atag:` / `arttag:` | Finds things depicted in a card's illustration (e.g. `art:squirrel`) |
| `function:` / `otag:` / `oracletag:` | "Oracle" tags describing a card's function (e.g. `function:removal`) |

**NL mapping:** "art shows X," "illustration contains X" → `art:X`. "cards that function as removal/ramp/etc. per community tagging" → `function:X`. Data comes from the community-run Tagger project, not Scryfall's own oracle-text parsing — treat as a looser, crowd-sourced signal rather than a guaranteed mechanical match.

### Shortcuts and Nicknames
| Syntax | Meaning |
|---|---|
| `is:bikeland` (alias `cycleland`, `bicycleland`) | Cycling dual lands |
| `is:bondland` (alias `crowdland`, `bbdland`, `battlebondland`) | Battlebond partner-lands |
| `is:bounceland` (alias `karoo`) | Bounce lands |
| `is:canopyland` (alias `canland`) | Horizon canopy lands |
| `is:checkland` | Check lands |
| `is:creatureland` | Man-lands generally |
| `is:dual` | Original dual lands |
| `is:fastland` | Fast lands |
| `is:fetchland` | Fetch lands |
| `is:filterland` | Filter lands |
| `is:gainland` | Life-gain taplands |
| `is:painland` | Pain lands |
| `is:pathway` | Pathway/modal DFC lands |
| `is:scryland` | Scry taplands |
| `is:surveilland` | Surveil taplands |
| `is:shadowland` (alias `snarl`) | Innistrad "snarl" lands |
| `is:shockland` | Shock lands |
| `is:slowland` | Slow lands |
| `is:storageland` | Storage lands |
| `is:tangoland` (alias `battleland`) | Battle for Zendikar tango lands |
| `is:tricycleland` (alias `trikeland`, `triome`) | Triomes |
| `is:triland` | Generic tri-lands |
| `is:masterpiece` | Masterpiece Series cards |
| `is:colorshifted` | Colorshifted (Time Spiral block) cards |

**NL mapping:** "fetchlands," "shocklands," "the Triomes" → the matching `is:` land-nickname flag directly, rather than reconstructing the mechanic via `o:` text search.


---

## PART 2 — REGULAR EXPRESSIONS (Official Rules)

Applies only inside `/pattern/` on `type:`/`t:`, `oracle:`/`o:`, `flavor:`/`ft:`, `name:`.

### Global Behavior (non-negotiable, all confirmed in official docs)
1. **Case-insensitive always** — never add `/i`, it's already the default and unsupported as a flag.
2. **Newline-sensitive ("multiline" mode)** — `.` will NOT match `\n`. To span newlines, use `(.|\n)`.
3. **`^` and `$` anchor to paragraph boundaries** within Oracle text, not the whole field.
4. **Whitespace is significant** ("tight mode") — no automatic trimming.
5. **Unicode-aware** — `.` matches beyond ASCII.
6. **No backreferences** (`\1`, `\2` unsupported).
7. **Match-only** — no capture-group extraction, no substitution.
8. **No custom flags of any kind** — `o:/tap/gi` fails; anything after the closing `/` is NOT parsed as configuration and instead becomes a separate bare-word filter appended to the query. This is the exact, confirmed mechanism behind the `/i`-corruption trap documented in the master query list.

### Scryfall-Specific Shorthand Extensions
| Syntax | Meaning |
|---|---|
| `~` | Auto-alias for current card name (or "this spell" if self-referential) |
| `{m}` | Shorthand for any mana symbol |
| `{c}` | Shorthand for any COLORED mana symbol (careful: this is the "colored" shorthand token, distinct from the literal `{C}` colorless mana symbol — check context) |
| `{cs}` | Any card symbol |
| `{2}` | Shorthand for repeated mana symbols (e.g. matches `{4}`,`{10}`, etc. per the repeat-count pattern) |
| `{h}` | Any hybrid card symbol (monocolor Phyrexian is NOT considered hybrid) |
| `{p}` | Any Phyrexian card symbol (`{P}`, `{W/P}`, `{G/W/P}`) |
| `{x}` | X/X power/toughness expression shorthand |
| `{+}` | +X/+X power/toughness expression shorthand |
| `{-}` | -X/-X power/toughness expression shorthand |

### Standard Atoms
| Atom | Meaning |
|---|---|
| `.` | Any character except newline |
| `[abc]` | Character class — one of the listed chars |
| `[^abc]` | Negated character class |
| `[a-z]` | Range |
| `(expr)` | Grouping |
| `(a\|b)` | Alternation |
| `\X` | Escaped literal special character |
| `X` | Literal character |

### Quantifiers
| Syntax | Meaning |
|---|---|
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 |
| `{n}` | Exactly n |
| `{n,}` | n or more |
| `{n,m}` | Between n and m |
| `*?`, `+?`, `??`, `{n}?`, `{n,}?`, `{n,m}?` | Non-greedy versions of each above |

### Anchors & Lookarounds
| Syntax | Meaning |
|---|---|
| `^` | Start of line/paragraph |
| `$` | End of line/paragraph |
| `\b` | Word boundary (confirmed — this is what makes `/\bequip\b/` work correctly) |
| `(?=...)` | Positive lookahead |
| `(?!...)` | Negative lookahead |
| `(?<=...)` | Positive lookbehind |
| `(?<!...)` | Negative lookbehind |

### Character Classes
| Syntax | Meaning |
|---|---|
| `\n` | Newline |
| `\s` | Any whitespace |
| `\d` | Digit |
| `\w` | Word character |
| `\xHH` | Character by hex value |

**NL mapping cheatsheet for regex:**
- "the exact standalone word X, not a substring of something else" → `/\bX\b/`
- "X immediately followed by Y, allowing anything in between" → `/X.*Y/` — ⚠️ **only if word order is confirmed**; if uncertain, use two separate `o:"X" o:"Y"` terms instead (AND, order-independent) rather than risk a regex that assumes a fixed sequence
- "any number of mana symbols in a row" → `{2}`-style repeat shorthand, or `\{[WUBRG]\}+` style construction with standard atoms
- "the card's own name appears in its own trigger" → `~` (works in both plain `o:` and regex)

---

## PART 3 — CROSS-CUTTING TRAPS (empirically confirmed this conversation, now cross-checked against official mechanics where possible)

1. **Verb agreement (singular/plural)** — "enters"/"enter", "dies"/"dying", "loses"/"lose", "deals"/"deal". A plural-subject card ("creatures you control enter") uses a different verb form than a singular one, and a search anchored to only one form misses the other. *Mechanism: plain substring matching in `o:`, no stemming/lemmatization.*
2. **Numeric/word insertion breaks quoted phrases** — "gain 1 life" ≠ "gain life"; "draw two cards" ≠ "draw a card". *Fix: split into independent single-word `o:` terms (AND'd, not a single phrase).*
3. **Substring false positives in `o:`** — "add"⊂"additional", "land"⊂"nonland", "flash"⊂"flashback". *Mechanism: `o:` is a plain substring search with no word-boundary enforcement by default — use `/\bword\b/` regex when this risk is live.*
4. **`keyword:`/`kw:` is immune to substring traps** — it checks a structured, discrete keyword-ability list, not raw text, so "Flash" can never accidentally match "Flashback" through this field. This is the single most reliable fix for keyword-based traps #1 and #3 combined, whenever the target is a *named keyword ability* specifically (not an arbitrary phrase).
5. **`t:` type-line mismatches** — always confirm actual card type before filtering; a card "about" a mechanic isn't necessarily typed for it (a Creature isn't an Instant just because it has Flash; a Planeswalker isn't an Artifact just because it's colorless-flavored).
6. **`f:` vs `is:` for commander-related searches** — format-legal vs. command-zone-eligible are different questions; confusing them is the most repeated error class this conversation.
7. **`=` vs `<=`/`>=` for color fields** — exact vs. inclusive; always confirm which the natural-language request actually implies ("only these colors, nothing else" = `=`; "legal alongside these colors" = `<=`).
8. **Regex trailing flags are silently misparsed, not rejected** — `/i`, `/g` etc. after the closing slash become a separate bare-word filter rather than a case-insensitivity toggle (confirmed directly in official docs: "`o:/tap/gi` will not [work]").
9. **Regex `.*` assumes a fixed word order** — verify actual phrasing before anchoring a sequence; prefer unordered AND'd `o:` terms when order is uncertain.
10. **OR'd cost caps let expensive cards bypass the cap** — `(mv<=3 or o:"X")` is NOT the same as "cheap AND has X"; cost constraints should be a separate AND'd term unless the OR is genuinely intended.
11. **DFC/MDFC color and type can reflect combined-face rules** — a double-faced card's color identity or type may not match what a naive read of just the front face's mana cost/type line would suggest.

---

## PART 4 — UNDERUSED OFFICIAL TOOLS (found via this red-team pass)

- **`produces:`** — directly searches for what mana type(s) a card can generate. This conversation relied entirely on text-pattern matching (`o:"{T}: Add"`) for every mana-dork/mana-rock search, which is exactly what caused repeated false-positive/false-negative problems (Arbor Elf's untap-a-Forest ability, Joiner Adept/Citanul Hierophants granting the ability to others rather than possessing it). `produces:g`, `produces:c`, etc. should be tried first for any "what makes [color] mana" query, with text-pattern search as a fallback only for non-standard cases (like Arbor Elf) that `produces:` might not catch.
- **`is:hybrid` / `is:phyrexian`** — never used this conversation despite several hybrid-mana-cost paradox discussions (the Simic "green card with blue text" searches). Could have directly filtered for hybrid-symbol cards instead of reasoning about them after the fact.
- **`devotion:`** — never used, relevant to any future god/devotion-matters query.
- **`is:vanilla` / `is:frenchvanilla`** — could simplify "plain creature with no abilities" style requests instead of a negative text search.

---

## PART 5 — TEMPLATE FOR HANDING TO A CODING TOOL

When mapping a natural-language request to a query, walk this checklist in order:

1. **Identify the color scope.** Exact (`=`) or inclusive (`<=`)? Which field — printed color (`c:`) or identity (`id:`)?
2. **Identify the type scope.** `t:` value(s), and confirm via spot-check that intended example cards actually carry that type.
3. **Identify the mechanic.** Is it a *named keyword* (→ prefer `keyword:`/`kw:`) or a *phrase/effect* (→ `o:`/`fo:`/regex)?
4. **If using `o:` with a quoted phrase:** ask whether numeric/word insertion could break it. If yes, split into AND'd single-word terms instead.
5. **If using `o:` with a bare word:** ask whether it's a substring of a longer unrelated word. If yes, use `/\bword\b/`.
6. **If using regex `.*`:** confirm actual word order in real card text before anchoring a sequence. Default to unordered AND'd terms unless order is verified.
7. **If capping cost/price:** make it an explicit, separate AND'd term — never silently baked in, never OR'd with a text condition unless that's genuinely the intent.
8. **If searching for commander eligibility:** use `is:commander`, not `f:commander`.
9. **Before finalizing:** state the query's scope decisions in plain English alongside the query itself, so a human can catch a wrong assumption before running it.

---

## PART 6 — VERBATIM OFFICIAL EXAMPLES (Appendix)

*Every example below is quoted directly from the official syntax page, organized by category, for pattern-matching reference. Nothing here is inferred — these are the doc's own illustrative queries.*

**Colors/Identity:**
- `c:rg` — Cards that are red and green
- `color>=uw -c:red` — Cards that are at least white and blue, but not red
- `id<=esper t:instant` — Instants you can play with an Esper commander
- `id:c t:land` — Land cards with colorless identity
- `c=2 is:bear` — 'Bears' that are exactly two colors

**Card Types:**
- `t:merfolk t:legend` — Legendary merfolk cards
- `t:goblin -t:creature` — Goblin cards that aren't creatures

**Card Text:**
- `o:draw t:creature` — Creatures that deal with drawing cards
- `o:"~ enters tapped"` — Cards that enter the battlefield tapped
- `kw:flying -t:creature` — Noncreatures that have the flying keyword

**Mana Costs:**
- `mana:{G}{U}` — Cards with one green and blue mana in their costs
- `m:2WW` — Cards with two generic and two white mana in their cost
- `m>3WU` — Cards that cost more than three generic, one white, and one blue mana
- `m:{R/P}` — Cards with one Phyrexian red mana in their cost
- `c:u mv=5` — Blue cards with mana value 5
- `devotion:{u/b}{u/b}{u/b}` — Cards that contribute 3 to devotion to black and blue
- `produces=wu` — Cards that produce blue and white mana

**Power/Toughness/Loyalty:**
- `pow>=8` — Cards with 8 or more power
- `pow>tou c:w t:creature` — White creatures that are top-heavy
- `t:planeswalker loy=3` — Planeswalkers that start at 3 loyalty

**Multi-Faced Cards:**
- `is:meld` — Cards that meld
- `is:split` — Split-faced cards

**Spells/Permanents/Effects:**
- `c>=br is:spell f:duel` — Black and red multicolor spells in Duel Commander
- `is:permanent t:rebel` — Rebel permanents
- `is:vanilla` — Vanilla creatures

**Extra/Funny Cards:**
- `is:funny` — All funny cards
- `t:scheme` — Scheme cards
- `power include:extras` — Cards with "power" in their name, including extras

**Rarity:**
- `r:common t:artifact` — Common artifacts
- `r>=r` — Cards at rare rarity or above
- `rarity:common e:ima new:rarity` — Cards printed as commons for the first time in Iconic Masters
- `in:rare -rarity:rare` — Non-rare printings of cards that have been printed at rare

**Sets/Blocks:**
- `e:war` — Cards from War of the Spark
- `e:war is:booster` — Cards available inside War of the Spark booster boxes
- `b:wwk` — Cards in Zendikar Block (using the Worldwake code)
- `g:fin or g:fic` — Cards from sets related directly to Final Fantasy or its Commander deck
- `in:lea in:m15` — Cards that were in both Alpha and Magic 2015
- `t:legendary -in:booster` — Legendary cards never printed in a booster set
- `is:datestamped is:prerelease` — Prerelease promos with a date stamp

**Cubes:**
- `cube:vintage` — Cards in the Vintage Cube
- `cube:modern t:planeswalker` — Planeswalkers in the Modern Cube

**Format Legality:**
- `c:g t:creature f:pauper` — Green creatures in Pauper format
- `banned:legacy` — Cards banned in Legacy format
- `is:commander` — Cards that can be your commander
- `is:reserved` — Cards on the Reserved List
- `edhrecrank<=100 sort:edhrec` — The Top 100 cards by EDHREC Ranking (excluding basics), sorted by ranking

**Prices:**
- `tix>15.00` — Cards that cost more than 15 TIX at MTGO stores
- `usd>=0.50 e:ema` — Cards worth 50¢ or more in Eternal Masters

**Artist/Flavor/Watermark:**
- `a:"proce"` — Cards illustrated by Vincent Proce
- `ft:mishra` — Cards that mention Mishra in their flavor text
- `ft:designed e:m15` — Cards created by guest designers in Magic 2015
- `wm:orzhov` — Cards with Orzhov guild watermark
- `e:m10 new:art is:reprint` — Reprints with new art in Magic 2010
- `new:art -new:artist st:masters game:paper` — Cards in masters sets with new art by the same artist
- `new:flavor e:m15 is:reprint` — Reprint cards in Magic 2015 with new flavor text

**Border/Frame/Foil/Resolution:**
- `border:white t:creature` — White-bordered creature cards
- `is:new r:mythic` — Mythic cards with the 2015 holofoil-stamp frame
- `is:old t:artifact` — Artifacts in either the 1993 or 1997 classic frame
- `is:hires` — Cards with high-resolution scans
- `is:foil e:c16` — Commander 2016 cards printed in foil
- `frame:2003 new:frame in:fut is:reprint` — Future cards printed later in other frames

**Games/Promos/Spotlights:**
- `game:arena` — Cards available on MTG:Arena
- `-in:mtgo f:legacy` — Legacy legal cards not available on MTGO
- `is:promo` — Promotional cards
- `is:spotlight` — Story Spotlight cards

**Year:**
- `year<=1994` — Cards from 1994 and before
- `year=2026` — Cards released this year
- `date>=2015-08-18` — Cards printed on or after August 18, 2015
- `date>ori` — Cards printed in sets released after Magic Origins
- `date>now` — Cards with release dates in the future

**Tagger Tags:**
- `art:squirrel` — Art that contains a squirrel
- `function:removal` — Cards that cause removal

**Reprints:**
- `e:c16 not:reprint` — Cards that were new in Commander 2016
- `e:ktk is:unique` — Cards in Khans of Tarkir not printed in any other set
- `sets>=20` — Cards printed in 20 or more distinct sets
- `e:arn papersets=1` — Cards printed in Arabian Nights but never reprinted in paper

**Languages:**
- `lang:japanese` — Cards in Japanese
- `lang:any t:planeswalker unique:prints` — Planeswalkers in any language
- `lang:ko new:language t:goblin` — First printings of goblin cards in Korean
- `in:ru in:zhs` — Cards printed in both Russian and Simplified Chinese

**Shortcuts/Nicknames:**
- `is:dual` — Dual lands
- `is:fetchland` — Fetchlands
- `is:colorshifted` — Colorshifted cards

**Negating Conditions:**
- `-fire c:r t:instant` — Red instants without "fire" in their name
- `o:changeling -t:creature` — Changeling cards that aren't creatures
- `not:reprint e:c16` — Cards in Commander 2016 that aren't reprints

**Regular Expressions:**
- `t:creature o:/^{T}:/` — Creatures that tap with no other payment
- `t:instant o:/\spp/` — Instants that provide +X/+X effects (per the syntax page's own rendering — cross-reference the dedicated regex page's `{+}` shorthand for the cleaner documented form)
- `name:/\bizzet\b/` — Card names with "izzet" but not words like "mizzet"

**Exact Names:**
- `!fire` — The card Fire
- `!"sift through sands"` — The card Sift Through Sands

**Using OR:**
- `t:fish or t:bird` — Cards that are Fish or Birds
- `t:land (a:titus or a:avon)` — Lands illustrated by Titus Lunter or John Avon

**Nesting Conditions:**
- `t:legendary (t:goblin or t:elf)` — Legendary goblins or elves
- `through (depths or sands or mists)` — The Unspeakable combo

**Display Keywords:**
- `!"Lightning Bolt" unique:prints` — Every printing of Lightning Bolt
- `t:forest a:avon unique:art` — Every unique Forest illustration by John Avon
- `f:modern order:rarity direction:asc` — Modern legal cards sorted by rarity, commons first
- `t:human display:text` — Every Human card as text-only
- `in:leb game:paper prefer:newest` — The newest paper printing of each card in Limited Edition Beta
- `year=2025 prefer:atypical` — All cards printed in 2025, preferring atypical frame printings
