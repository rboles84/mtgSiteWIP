# Strixhaven College Reference Audit

Date: 2026-06-10

This audit scans `docs/research` for canonical material on the five Strixhaven colleges (the five enemy-color pairs reframed as academic schools) and flags exact references to each. It is the companion to the mono-color, three-, four-, five-color, and ten-guild reference audits in this folder.

Flagged targets:

- Colleges: `Silverquill`, `Prismari`, `Witherbloom`, `Lorehold`, `Quandrix`
- Framework terms: college, school, dean, founder dragon, dialectic, mascot, Mage Tower, Biblioplex

The five colleges cover **exactly the five enemy-color pairs** — the same combinations as the five enemy Ravnica guilds, but reframed from civic cooperation into lifelong intellectual *debate*.

This report is stored at the root of `docs/research/canon`; the canon source subtrees were read-only inputs and were not modified.

---

## Pre-flight context

- A Strixhaven college is framed as an **academic, ideological dialectic** between two opposing colors — a lifelong intellectual debate (contrast: a Ravnica guild frames a color pair as a civic organization). Source: `wubrg/The Metaphysics of WUBRG, Guilds, and Colleges ...md`.
- Strixhaven uses **only the five enemy-color pairs** — the pairs whose colors fundamentally disagree, which is what makes a *debate* (not a partnership) the right frame. There is no Strixhaven college for an allied pair.
- Each college pairs to exactly one enemy guild: **Silverquill↔Orzhov (WB), Prismari↔Izzet (UR), Witherbloom↔Golgari (BG), Lorehold↔Boros (RW), Quandrix↔Simic (GU)**. The dedicated Vox Mana taxonomies carry explicit guardrails to keep the college *distinct* from its guild twin (e.g., "Keep Lorehold distinct from Boros," "separate Witherbloom from generic Golgari," "Do not reduce Prismari to 'spellslinger'").
- Each college has a **founder Elder Dragon mascot** and a **two-dean structure** (typically one dean per color, embodying the internal tension). The founder dragons are confirmed canon: Shadrix Silverquill, Galazeth Prismari, Beledros Witherbloom, Velomachus Lorehold, Tanazir Quandrix.
- Each college's identity is built around its **primary dialectic question** (e.g., Lorehold: preserve vs. explore the past; Prismari: technique vs. emotion).

---

## Reference inventory

### Primary — Vox Mana per-college bundles (`canon/strixhaven/<college>/`)

**Coverage is uneven** — three colleges have full extracted research; two exist only as packaged zip bundles:

| College | Pair | Narrative taxonomy (.md) | Other files | Status |
|---|---|---|---|---|
| Lorehold | RW | ✅ `lorehold_narrative_taxonomy.md` | animation spec, structural matrix, translation layer, manifest | **Full** |
| Prismari | UR | ✅ `prismari_narrative_taxonomy.md` | animation spec, structural matrix, translation layer, manifest | **Full** |
| Witherbloom | BG | ✅ `witherbloom-narrative-taxonomy.md` | animation spec, structural matrix, translation layer, SOURCES.md | **Full** |
| Quandrix | GU | ✅ `quandrix-narrative-taxonomy.md` | animation spec, SOURCES.md | **Full** (extracted 2026-06-10) |
| Silverquill | WB | ✅ `silverquill-narrative-taxonomy.md` | animation spec, SOURCES.md | **Full** (extracted 2026-06-10) |

### Supporting

- `wubrg/The Metaphysics of WUBRG, Guilds, and Colleges ...md` — consolidated synthesis with a per-college Core Drive (dialectic) / Mechanical Translation / Key Signals table for all five.
- `canon/mark_rosewater_official_misc/Enemy_Color_Conflicts_Explained.md` / `Enemy_Color_Philosophy_Conflicts.md` — the enemy-pair tensions each college dramatizes.

**Finding:** all five colleges now have **full dedicated narrative taxonomies** (founder axiom, dialectic axes, archetype families/roles, anti-drift guardrails, UX mapping). Quandrix and Silverquill were extracted from their zip bundles on 2026-06-10 and read in full; the earlier zip-only gap is **closed**. Strixhaven is now at parity with the developed guilds. Each taxonomy confirms its founder dragon and its two-dean split (see below).

---

## The Five Colleges (5) — all enemy pairs

### Silverquill — {W}{B} (enemy) ↔ Orzhov
- **Founder dragon:** Shadrix Silverquill. **Deans:** Shaile, Dean of Radiance // Embrose, Dean of Shadow (praise vs. punishment). **Core axiom:** *"Words are weapons, shields, contracts, applause, and verdicts; the winning line changes status in public."* (`silverquill-narrative-taxonomy.md`) Dialectic: *Rhetoric vs. Domination*; primary tension *uplift vs. humiliation*.
- **Mechanical identity:** Aggressive politics & counters — evasive Inkling flying tokens, +1/+1 counters as visible *status*, life-as-leverage (drain/lifelink), modal "verdict" removal, political combat (goad/Breena).
- **Vox Mana axes/roles:** Word-Magic as Force, Status Counters, Inkling Materialization, Public Verdict, Political Combat, Life as Applause/Cost, Uplift vs. Humiliation; roles Ink Duelist, Demagogue, Inkling Court, Dean's Split, Final Word, Brokered Promise.
- **Contrast with Orzhov:** the file's anti-drift rules explicitly separate it — Orzhov is debt/contract/aristocrats; Silverquill is **language as an instrument of social dominance** (tie taxes/deaths to rhetoric, status, applause, or verdict). Also kept distinct from Azorius (social pressure, not bureaucracy) and Rakdos (controlled elite persuasion, not chaotic spectacle).

### Prismari — {U}{R} (enemy) ↔ Izzet
- **Founder dragon:** Galazeth Prismari. **Core axiom:** *"Magic is most true when it becomes art in motion."* Dialectic: *Technique vs. Emotion* (blue craft vs. red passion). (`prismari_narrative_taxonomy.md`)
- **Mechanical identity:** Big spells & big mana — Treasure generation fueling massive elemental sorceries; copy/magecraft; theatrical, choreographed spellcasting.
- **Vox Mana nodes:** Founder Axiom, Technique vs. Emotion, Spectacle as Truth, Elemental Medium, Performed Research, Improvised Breakthrough, Rhythmic Study, Duality Amplifier, Resource Residue, Kinetic Technique.
- **Contrast with Izzet:** the file explicitly says *do not reduce Prismari to 'spellslinger'* — its distinctive expression is **big, elemental, artistic, theatrical**, where Izzet is reckless tempo.
- **Placement title:** "Prismari — The Elemental Performer."

### Witherbloom — {B}{G} (enemy) ↔ Golgari
- **Founder dragon:** Beledros Witherbloom. **Core axiom:** *"Life and death are not opposites to escape; they are exchange rates inside one living system."* (`witherbloom-narrative-taxonomy.md`)
- **Mechanical identity:** Life-gain / life-loss synergies — Pest tokens, Food, cauldrons, sacrifice, drain, death/lifegain triggers; "biology as strategy."
- **Vox Mana archetype families:** Life-Drain Witchcraft, Pest Economy, Body Ledger Aristocrats, Cauldron Biology, Growth from Life Change, Compost Recursion.
- **Contrast with Golgari:** *"It is not just Golgari with school robes"* — Witherbloom adds the **Strixhaven biology/witchcraft/field-study layer** (potions, herbs, bodily essence) on top of black-green recursion.

### Lorehold — {R}{W} (enemy) ↔ Boros
- **Founder dragon:** Velomachus Lorehold. **Core axiom:** *"The past is not behind us; it is buried power waiting to be interpreted, preserved, and revived."* Dialectic: *Discovery vs. Legacy* (red adventure vs. white preservation). (`lorehold_narrative_taxonomy.md`)
- **Mechanical identity:** Graveyard artifacts & spirits — "leaves the graveyard" triggers, Spirit tokens, relic/artifact recursion, historic synergies, combat recursion.
- **Vox Mana nodes:** Founder Axiom, Order vs. Chaos, Reconstruction Loop, Spirit Witnesses, Gravebreak Engine, Archival Method, Reckless Discovery, War Memory, Site Restoration, Relic Bodies.
- **Contrast with Boros:** the file says *less army-command justice, more archaeology, archive tension, and history made active.*
- **Placement title:** "Lorehold — The Relic Historian."

### Quandrix — {G}{U} (enemy) ↔ Simic
- **Founder dragon:** Tanazir Quandrix. **Deans:** Kianne // Imbraham (substance vs. theory). **Core axiom:** *"Reality is an equation that can be grown, copied, doubled, and proven by scale."* (`quandrix-narrative-taxonomy.md`) Dialectic: *Nature vs. Numerology*; primary tension *abstract theory vs. material substance*.
- **Mechanical identity:** Math-scaling & multiplication — Fractal tokens (0/0 + counters), token/spell doubling, +1/+1 "growth as data," land-count thresholds, X-spells.
- **Vox Mana axes/roles:** Proof as Creature, Doubling + Replication, Counter Accretion, Land as Variable, X as Scale, Theory/Substance Split, Selective Simplification; roles Fractal Theorist, Twin Proof, Growth Curve, Land Equation, X-Variable, Simplifier.
- **Contrast with Simic:** anti-drift rules require math/scale/variable/proof/Fractal language — *not* generic Simic counters, not "goodstuff ramp," not Izzet spellslinger (spells must materialize into geometry/tokens), not Azorius control (structure is mathematical, not legalistic).

---

## Quick reference table

| College | Code | Founder dragon | Dialectic | Mechanical identity | Token | Guild twin |
|---|---|---|---|---|---|---|
| Silverquill | WB | Shadrix Silverquill | Rhetoric vs. Domination | Aggressive politics & counters | Inkling (flying) | Orzhov |
| Prismari | UR | Galazeth Prismari | Technique vs. Emotion | Big spells & big mana | Treasure / Elemental | Izzet |
| Witherbloom | BG | Beledros Witherbloom | Exploitation vs. Ecosystem | Life-gain / life-loss | Pest | Golgari |
| Lorehold | RW | Velomachus Lorehold | Discovery vs. Legacy | Graveyard artifacts & spirits | Spirit | Boros |
| Quandrix | GU | Tanazir Quandrix | Nature vs. Numerology | Math-scaling & multiplication | Fractal | Simic |

---

## Notes and boundaries

- **Colleges = enemy guilds, reframed.** The five colleges are not new color combinations — they are the five enemy-color pairs seen through an *academic dialectic* lens instead of a *civic* one. Any placement system should treat "Golgari" and "Witherbloom" (etc.) as two readings of one color pair, kept distinct by their respective guardrails.
- **The guild-twin guardrail is mandatory.** Every extracted college taxonomy carries an explicit "keep distinct from [guild]" rule. Lorehold ≠ Boros, Witherbloom ≠ Golgari, Prismari ≠ Izzet are stated outright; by parallel, Silverquill ≠ Orzhov and Quandrix ≠ Simic must hold once those bundles are extracted.
- **Inventory status:** the earlier Quandrix/Silverquill zip-only gap is **closed** — both were extracted on 2026-06-10 and now carry full narrative taxonomies read for this audit. All five colleges are at parity. (Note: the `*_vox_mana_bundle.zip` archives still sit alongside the extracted files; harmless, but a cleanup pass could remove the now-redundant zips.)
- **Canonical vs. synthesis.** Founder dragons, deans (Shaile//Embrose, Kianne//Imbraham confirmed in the extracted files), color pairs, tokens, and core dialectics are confirmed canon. The Vox Mana taxonomy nodes/archetype families are internal synthesis layers — accurate to the product, not WotC lore.
