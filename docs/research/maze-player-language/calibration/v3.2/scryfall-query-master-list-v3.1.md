# Master Scryfall Query Reference
*Compiled from full conversation history. Duplicate/superseded queries collapsed into their corrected final form. Verified counts shown where an actual Scryfall run confirmed them in this chat.*

---

## Color Identity & Set Theory Fundamentals

| Query | What it does |
|---|---|
| `c=b f:commander` | Exactly mono-black (printed color), Commander-legal. **Corrected** — `legal:` is not a documented Scryfall keyword; only `f:`/`format:` exist for legality checks |
| `id<=ug` | Simic-legal pool: mono-U, mono-G, colorless, and gold UG together (inclusive) |
| `id=ug` | Exact GU **color identity**. This is not the same as "gold UG": a card can have exact GU identity while its printed color is mono-color or colorless because of mana symbols in rules text. |
| `c=ug` | Printed color exactly UG. This is a different axis from `id=ug`, not simply a narrower version; a printed-UG card can have additional identity from rules text. |
| `(c=u or c=g)` | Mono-blue OR mono-green printed color, no gold/colorless. If an active Simic Commander deck context is known, add `id<=ug f:commander` separately. |
| `id=ug -c:u` | Simic identity but **no blue in printed color** — the "paradox" search. Confirmed 70 cards, mostly lands; genuine non-land hits are creatures/spells with blue-costed abilities (e.g. Agent of Horizons) |
| `id=ug c=g o:"{U}"` | Corrected version of the above scoped to pure green cards with literal `{U}` in text (quote the symbol) |
| `id<=wu` / `id<=wub` / `id<=rgw` / `id<=br` / etc. | Same inclusive-identity pattern for any other color pair/triple |
| `is:commander id<=gu` | Every legal commander for a Simic deck (confirmed 821) |
| `f:commander` vs `is:commander` | **Not interchangeable.** `f:commander` = format-legal (almost everything). `is:commander` = can occupy the command zone. Confused repeatedly in "Google" drafts — always use `is:` for "can this lead my deck." |

---

## Keyword Ability Searches (`kw:` vs `o:`)

| Query | What it does |
|---|---|
| `t:creature kw:deathtouch` | Creatures with the actual Deathtouch keyword (not just granting it) |
| `t:creature kw:defender` | True walls — catches non-Wall-typed defenders like Sylvan Caryatid |
| `t:creature kw:menace` | Menace-havers only |
| `t:creature kw:flying kw:vigilance` | Both keywords natively (confirmed 176 cards) |
| `kw:ward` | Catches **all** Ward cost variants — numeric, life-payment, sacrifice — confirmed via Moonrage Brute's "Ward—Pay 3 life" |
| `kw:flash` | True Flash only. **Immune to the Flashback substring trap** — `keyword:` reads a structured field, not raw text, so it can never false-positive the way `o:flash` would |
| `kw:changeling` | Universal shapeshifters — count as every creature type simultaneously |

`kw:` is the officially documented shorthand for `keyword:` — confirmed directly in Scryfall's syntax reference: "You can also use keyword: or kw: to search for cards with a specific keyword ability."
| **Trap:** `o:deathtouch` / `o:flash` / `o:haste` etc. (bare word) | Risk of substring false positives (`flash`→`flashback`) or catching text that merely *grants* the keyword to another permanent, not possesses it |
| **Trap on non-creatures:** `t:equipment kw:haste` | Returns **0 or near-0** — Equipment can't "have" haste itself, it only grants it via plain text. Use `o:"has haste"/"gains haste"` instead for granted abilities |

---

## Equip / Equipment / Fortification

| Query | What it does |
|---|---|
| `o:/\bequip\b/ -t:equipment` | Cards that support the equip mechanic without being Equipment (confirmed 38 cards) |
| `t:equipment -t:creature` | Pure Equipment, excluding Reconfigure creature-hybrids (confirmed 618) |
| `t:fortification` | The Fortification sub-type — confirmed exactly 2 cards (Darksteel Garrison, C.A.M.P.) |
| `o:"reconfigure"` | Separate keyword from Equip — different reminder text, does NOT match `\bequip\b` |

---

## Death / Sacrifice / Aristocrats

| Query | What it does |
|---|---|
| `(t:creature or t:artifact or t:enchantment) (o:"sacrifice a creature:" or o:"sacrifice another creature:")` | **Both phrasings required** — "another" (Woe Strider) silently excluded if you only search "a creature:". Confirmed 233 unrestricted / 164 Golgari / 158 Orzhov |
| `o:"whenever" o:"dies" (o:"lose" or o:"damage" or o:"draw" or o:"create")` | Broad death-payoff search (confirmed 317) |
| `o:"whenever a creature you control dies"` | Narrower, ownership-scoped death payoff (only your creatures) |
| `o:"triggers an additional time" (o:"dies" or o:"dying")` | Death-trigger doublers — **must include "dying"**, or Teysa Karlov & Drivnod are silently excluded (confirmed 3 cards) |

---

## Graveyard Recursion / Reanimation

> **Correction — 2026-08-26:** This reference previously stated, too confidently, that Reanimate, Animate Dead, and Necromancy all use the same `put ... onto the battlefield` template. That generalization was wrong and should not be reused. Current Oracle wording differs by card:
>
> - **Reanimate (Sorcery):** `Put target creature card from a graveyard onto the battlefield under your control.`
> - **Animate Dead (Aura):** its graveyard enchant clause is separate, then it says `Return enchanted creature card to the battlefield under your control and attach this Aura to it.`
> - **Necromancy (Enchantment that becomes an Aura):** it currently uses the **put** template: `Put target creature card from a graveyard onto the battlefield under your control and attach this enchantment to it.`
>
> The previous all-three-use-`put` statement was incorrect. The later claim that both Animate Dead and Necromancy use `return` is also incorrect for current Necromancy wording. Safer combined high-recall fallback: `(o:put or o:return) o:"creature card" o:graveyard o:battlefield`. Exact card-template claims must be membership-checked card-by-card before being generalized.

| Query | What it does |
|---|---|
| `(o:put or o:return) o:"creature card" o:graveyard o:battlefield` | Safer combined battlefield-reanimation Oracle lens spanning the major `put` and `return` wording families. High recall, not a claim of mechanical completeness. |
| `o:"put target creature card" o:"onto the battlefield under your control"` | Precision lens for Reanimate/Necromancy-style `put ... onto` wording. **Does not cover Animate Dead.** |
| `o:"return" o:"creature card" o:"battlefield"` | Precision/broadened lens for Animate-Dead-style `return ... battlefield` wording; use with destination/ownership context as needed. |
| `o:"onto the battlefield under your control" t:creature` | Creature-based repeatable reanimation engines (confirmed 55) |
| `o:"return target creature card from a graveyard to" o:"hand"` | Regrowth-style hand recursion — note **"a graveyard"** not "your graveyard" (confirmed 4 cards exactly) |
| `t:creature (o:"from your graveyard" o:"battlefield" or o:"cast" o:"from your graveyard")` | Self-recursion creatures — covers BOTH "return to battlefield" and "cast from graveyard" templates (Gravecrawler needs the 2nd branch) |
| `(o:"exile" (o:"graveyard" or o:"graveyards")) -t:land` | Graveyard hate, broad haystack (confirmed 1,113) |
| `o:"exile" (o:"target player's graveyard" or o:"an opponent's graveyard")` | **One-sided** graveyard hate only — excludes ambiguous "a graveyard" cards and self-protection false positives (confirmed 141... wait, this specific one wasn't finalized with a number — see chat) |

---

## ETB / Blink / Reuse Triggers

| Query | What it does |
|---|---|
| `o:"exile target" o:"return" o:"battlefield"` | **True blink** — exile-then-return to retrigger ETB (confirmed 55; do NOT combine with a "return to hand" branch, which floods results with unrelated one-shot recursion) |
| `t:instant (id<=uw or id<=gwu) o:"exile target" o:"return" o:"under its owner's control"` | Instant-speed blink enablers (confirmed 25) |
| `(t:enchantment or t:artifact or t:creature) o:"at the beginning of" o:"exile" o:"return"` | Repeatable blink engines (confirmed 80) |
| `(t:enchantment or t:creature) (o:"whenever another creature enters" or o:"whenever a creature is exiled") -o:"exile target"` | Blink **payoffs** — cards rewarded when something is blinked (confirmed 13) |
| `o:"~ enters"` | Scryfall's official `~` self-reference substitution. **Catches "enters with counters" static text too** — add `o:"when ~ enters"` to isolate true triggered abilities |
| `id<=r c=c` | Colorless cards legal in mono-red (confirmed 3,097) |

---

## Draw / Card Advantage

| Query | What it does |
|---|---|
| `t:instant o:"draw a card"` | Instant-speed draw (confirmed 357) — **misses** "put into hand" effects like Fact or Fiction/Memory Deluge |
| `t:artifact -t:creature o:"draw" o:"card"` | Non-creature artifact draw, split words to dodge numeric templating (confirmed 410) |
| `(t:instant or kw:flash) (o:"draw a card" or o:"draw cards" or o:"draw X cards")` | Includes Flash permanents correctly, not just Instant type (confirmed 420) |
| `o:"gain" o:"life" -o:lifelink -keyword:lifelink` | **Split-word fix** for lifegain — `o:"gain life"` as a phrase misses "gain 1 life" (numeric insertion). Confirmed 1,962 |
| `o:"whenever" o:"dies" (o:lose or o:damage or o:draw)` | (see Death section above) |

---

## Combat Keywords / Creature Stats

| Query | What it does |
|---|---|
| `o:/creatures you control get \+x\/\+x/ o:trample` or `o:/number of creatures you control/ o:trample` | Craterhoof-style team pump+trample (confirmed 11 for the "number of" version — includes both one-shot alpha strikes and continuous scalers) |
| **Regex order trap:** `o:/pump.*trample/` | Fails if card text has trample listed FIRST (Craterhoof does) — never assume phrase order, use separate `o:` terms instead |
| `t:creature mv<=2 (o:"draw a card" or o:"draws a card")` (id-scoped variants) | "Little creatures that replace themselves" — cantrips |

---

## Removal / Interaction

| Query | What it does |
|---|---|
| `o:"exile target" (o:"creature" or o:"permanent")` | Exile-based removal — **also catches graveyard/library exile**, needs manual filtering |
| `c=b mv<=2 (o:"destroy target" or o:"exile target")` | Cheap black removal (confirmed 33ish — see chat) |
| `t:instant o:/counter target.*spell/` | **Primary mechanical counterspell lens after the 2026-08-26 comparison.** It catches restricted spell counters such as Negate and Swan Song while excluding ability-only counters such as Stifle. Still a wording lens, not proof of semantic completeness. |
| `otag:counterspell` | Secondary Tagger/discovery lens. The current parent tag has 97 direct matches across two pages; it includes non-Instant counter cards such as Frilled Mystic/Mystic Snake and does not list common restricted counters such as Negate or Swan Song. It should not be the sole default. Child counterspell tags remain useful taxonomy signals. |
| `o:"counter target spell" mv<=2` | Narrow precision phrase — excludes restricted-type counters because intervening words break the phrase. |
| `t:instant mv=2 o:/counter target.*spell/` | Exactly-2-mana targeted spell counters without the Stifle-style ability-counter contamination of bare `o:"counter target"`. |
| `id<=ub t:instant mv<=2 (o:/counter target.*spell/ or o:"destroy target" or o:"exile target")` | Combined Dimir interaction lens using the safer spell-counter branch. Treat as an explainable recipe, not a completeness guarantee. |

---

## Board Wipes

| Query | What it does |
|---|---|
| `c<=1 (o:"destroy all creatures" or o:"exile all creatures" or o:"each creature gets -" or o:"damage to each creature" or o:"sacrifice all")` | **All four verb templates required** — narrower 3-term versions miss Blasphemous Act and all damage/sacrifice-based wipes entirely. Confirmed 327 mono-color / 141 Esper |
| `(o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control" or o:"destroy all creatures except")` | Historical narrow one-sided wording lens. **Plague Wind and In Garruk's Wake correctly do not match this exact query** because their Oracle text uses `you don't control`, not `your opponents control`/`except`. The old exclusion result was real; the mistake was treating the narrow wording as the complete one-sided-wipe category. |
| `(o:"destroy all creatures you don't control" or o:"exile all creatures you don't control" or o:"destroy all creatures your opponents control" or o:"exile all creatures your opponents control")` | Broadened ownership-based one-sided-wipe lens. Includes the `you don't control` wording family used by Plague Wind and In Garruk's Wake. Save-one-creature/tribal-exception wipes remain separate lenses. |

---

## Ramp / Mana

| Query | What it does |
|---|---|
| `c=g t:creature o:"{T}: Add"` | Green mana dorks, narrow (confirmed 236) |
| `id<=g t:creature o:"add "` | Broader literal `Add`-text version — includes colorless producers and non-tap mana activations, but **does not include Arbor Elf**. Arbor Elf is a separate land-untap accelerant (`{T}: Untap target Forest.`), not evidence for an `o:add` lens. |
| `t:creature (o:"search your library for a" o:"land") o:"battlefield"` (conceptual — land-fetch creatures) | Land-ramp creatures — mechanically distinct from mana-dork `{T}: Add` creatures |
| `c=c t:artifact -t:creature o:"{T}: Add" mv<=3` | Cheap colorless mana rocks (confirmed 249) — **cost must be a hard `mv<=3`, never OR'd with a text condition**, or expensive rocks slip back in |
| `is:commander id=c o:"Add {C}"` | Colorless commanders that produce colorless mana (confirmed 4) |

---

## Tribal / Type-Specific

| Query | What it does |
|---|---|
| `t:wurm -t:worm` | Wurm creature type (confirmed 115) — **Wurm and Worm are unrelated types** |
| `id<=gu t:worm -t:wurm ...` | True Worm type — confirmed almost empty (1 card: Cryptic Annelid) |
| `t:goblin -t:creature` | Non-creature Goblin-typed cards — Scryfall's own documented example. Real result dominated by the **Kindred** card type (confirmed 7 cards) |
| `id=c t:creature (t:wolf or t:werewolf or kw:changeling)` | Colorless Wolf-adjacent creatures (confirmed 8) |
| `id=c t:equipment (o:"has haste"/"gains haste"/"have haste")` | Haste-granting colorless Equipment — needed for the Wolf+Haste build since Equipment can't have `kw:haste` itself (confirmed 10) |
| `id=c t:equipment (o:"has deathtouch"/"gains deathtouch"/"have deathtouch")` | Same pattern for deathtouch (confirmed 8) |

---

## Landfall / Enchantment-Matters

| Query | What it does |
|---|---|
| `c=g (kw:landfall or o:"whenever a land enters")` | Green Landfall (confirmed 77) — Azusa/Oracle of Mul Daya correctly absent (enablers, not payoffs, no trigger text) |
| `t:saga id<=gw` | Sagas in GW identity. Sagas are enchantments, so they **trigger/enabled Constellation-style payoffs** when they enter; they are not automatically Constellation payoffs themselves. |
| `id<=wg o:/whenever.*enchantment.*enter/ -t:equipment` | ETB-enchantment payoffs, scoped (Selesnya version of the 67-card master search below) |
| `o:/whenever.*enchantment.*enter/ -t:equipment` | **The master query.** Confirmed 67 cards. **Never append `/i`** — Scryfall splits it into a bare "name contains i" filter, silently dropping every letterless-name card (corrupted version returned only 49) |
| `id<=ub keyword:surveil` | Dimir Surveil (confirmed 152) — correctly excludes Cloak/Hideaway cards (different keyword) |

---

## Tokens / Go-Wide

| Query | What it does |
|---|---|
| `o:"create" o:"Treasure token"` | Treasure-making cards, split-word (avoids numeric templating gaps) |
| `id<=br is:commander o:"create" o:"Treasure token"` | Same, Rakdos commanders (confirmed 59) |
| `o:"triggers an additional time"` variants | Trigger doublers — NOT the same as "copy" effects (Ondu Spiritdancer copies once/turn, doesn't double) |
| `id<=rgw (o:"twice that many" or o:"double that number" or o:"additional token")` | True token/counter doublers (confirmed 16) — Neyali is NOT a doubler despite thematic fit |
| `(t:creature or t:sorcery or t:enchantment) (o:"creatures you control get" or o:"tokens you control get") (o:trample or o:flying or o:haste)` | Go-wide finishers: pump + evasion together (confirmed 125) |
| `o:create (o:"artifact creature token" or o:thopter or o:servo or o:clue or o:treasure) o:whenever` | Artifact token-swarm engines (confirmed 263) |
| `o:"each artifact" o:"becomes" o:creature` | Mass artifact-animation — **much narrower than expected**, confirmed only 3 cards (Ghost Ark, Iron Man Armor, Rise and Shine) |

---

## Burn / Damage to Players

| Query | What it does |
|---|---|
| `id<=r (t:instant or t:sorcery) o:"damage" (o:"any target" or o:"each opponent" or o:"each player" or o:"target player")` | Red burn that can hit players — **must keep `o:"damage"`** or generic targeting language lets non-damage spells through (confirmed 323) |
| `o:"combat damage to a player" or o:"combat damage to an opponent"` | Cards caring about combat damage connecting (confirmed 874) |
| `o:"whenever an opponent draws a card" (o:"deals" or o:"loses")` | Draw-punisher payoffs — **"loses" ≠ "lose"**; Sheoldred uses plural "lose" and needs both terms (confirmed 9 with both) |
| `id<=br (o:"each player" or o:"each opponent") (o:"deals" or o:"loses" or o:"lose") (o:"damage" or o:"life")` | Rakdos group slug (confirmed 628, browsable haystack) |

---

## Commander Protection / Utility

| Query | What it does |
|---|---|
| `id<=wubrg (t:instant or (t:artifact mv<=2)) (o:hexproof or o:indestructible or o:shroud or o:protection or o:"phase out")` | Commander protection via keyword grant (confirmed 227) — correctly excludes Mother of Runes (wrong type) and Fierce Guardianship (counters, no keyword) |
| `t:instant mv<=3 o:"protection from"` | Narrower "protection from [color]" only (confirmed 25) |

---

## Recognized Cross-Cutting Traps (apply to ANY new query)

1. **Singular vs. plural verb agreement** — "enters"/"enter", "dies"/"dying", "loses"/"lose", "deals"/"deal". A plural-subject card silently fails a singular-only search.
2. **Numeric/word insertion breaks quoted phrases** — "gain 1 life" ≠ "gain life", "loses 1 life" ≠ "loses life", "draw two cards" ≠ "draw a card". Fix: split into independent single-word `o:` terms.
3. **Substring false positives** — "add"⊂"additional", "land"⊂"nonland", "flash"⊂"flashback", "counter on"⊂"counters on" (this one actually did NOT cause a false hit — verified safe). Always sanity-check bare-word searches.
4. **`kw:` vs `o:`** — `kw:` = structured, possesses-the-keyword field (safe from substrings). `o:` = raw text substring (catches both possession AND granting to others, plus unrelated mentions).
5. **`t:` type-line mismatches** — confirm a card's actual type before assuming it fits a type filter (Mother of Runes is a Creature not Instant; Urza is a Creature not Artifact; Ugin is a Planeswalker not Artifact; Rampaging Baloths is a Beast not Wurm).
6. **`f:commander` ≠ `is:commander`** — format-legal vs. command-zone-eligible. Constantly confused in bad drafts.
7. **`id=` vs `id<=`, `c=` vs `c<=`** — exact vs. inclusive. Always confirm which one the actual question calls for.
8. **Regex flags** — never append `/i` after a closing slash; Scryfall splits it into a separate bare-word filter instead of a case-insensitivity flag.
9. **Regex `.*` order** — assumes a fixed word order in the source text; verify actual phrasing before anchoring sequence.
10. **OR vs AND logic errors** — e.g. `(mv<=3 or o:"Sacrifice")` lets expensive cards bypass the cost cap entirely via the OR branch. Cost caps should almost always be a hard AND, never OR'd with a text condition.

---

## Red-Team Addendum — Corrections From Cross-Checking Official Docs

A pass against the official syntax page (https://scryfall.com/docs/syntax) and regex page (https://scryfall.com/docs/regular-expressions) surfaced:

- **Fixed:** `legal:commander` → `f:commander` (not a real keyword; only `f:`/`format:` exist).
- **Downgraded to "unconfirmed":** `kw:` (shorthand for `keyword:`) and `is:etb` are not listed on the official syntax page, despite working reliably throughout this conversation's testing. The Tagger Tags page (https://scryfall.com/docs/tagger-tags) does NOT explain either — that page is unrelated, covering only `atag:`/`otag:` art/function tags. Treat `kw:` and `is:etb` as empirically-verified-in-practice, not officially documented, until independently spot-checked.
- **Confirmed with stronger evidence:** the `/i` regex-flag trap is now directly sourced from Scryfall's own docs ("`o:/tap/gi` will not [work]"), not just inferred from in-chat results. Regex is also confirmed case-insensitive by default, meaning the flag was always redundant, not just risky.
- **New tool identified, unused all conversation:** `produces:` — a documented keyword for "what mana type does this make," which would likely have caught some of the Arbor Elf / Joiner Adept ambiguity more cleanly than text-pattern `o:"{T}: Add"` searches. See the companion syntax reference file for detail.
- **Resolved via a full uploaded copy of the official syntax page:** `kw:` is officially documented (not just empirically reliable) — confirmed directly: "You can also use keyword: or kw: to search for cards with a specific keyword ability." `is:etb`, by contrast, was re-checked against a complete line-by-line read of the same page and confirmed genuinely absent — this is now settled, not just suspected.
- **New keyword surfaced, directly relevant to the earlier "casual goodstuff" query:** `is:gamechanger` — Commander's official high-power staples list. `-is:gamechanger` combined with `order:edhrec` is a better fit than `order:edhrec` alone for "popular but still casual," which was an open gap in that search. Also new: `edhrecrank<=N` as a numeric *filter* (distinct from `order:edhrec`, which only sorts).

See `scryfall-syntax-regex-reference.md` for the full syntax/regex library this addendum is drawn from.

---

*Some counts referenced above (e.g. the narrow one-sided graveyard-hate query) were discussed but not pinned to a final confirmed number in the chat — treat any count not marked "confirmed" as needing a fresh run before citing externally.*
