# All-37 Dossier Term And Hover Audit

## Executive Summary

- Audited **37 identities** against the current **42-term** approved glossary.
- Found **38 glossary terms in use** and **4 with zero matches** in the scoped dossier vocabulary surfaces.
- Across all identities there are **179 distinct identity/term assignments**, of which **161 receive an actual current hover/focus/tap decoration**.
- Audited **259 strategy-label occurrences** from Possible directions and What to Look For. **152 occurrences do not have a whole-phrase glossary definition**; some still contain a defined subterm.
- Only **90 strategy-label occurrences are themselves carrying the current one-per-term hover target**. A defined term can be plain text at a later occurrence because its tooltip was allocated earlier on the page.
- The primary number beside each identity below is its count of distinct glossary-backed terms across the audited dossier vocabulary surfaces. The hover count is smaller when a term appears only in a non-decorated title or supporting section.

## Scope And Counting Rules

- Hover-enabled runtime surfaces: Start Here, Why This Fit, Test the Fit, and What to Look For descriptions.
- Supporting text-only audit surfaces: How This Plays, What to Look For titles, and the Colorless mana primer.
- Runtime matching is case-insensitive, alias-aware, longest-label-first, and boundary-limited. For example, `taxes` maps to **Taxation**.
- Runtime decorates each canonical term at most once per page. Priority is Start Here, then Why This Fit, Test the Fit, and What to Look For.
- Longer labels are not assigned invented meanings. `Protective Tokens` is reported as a strategy label containing the defined subterm **Tokens**; the whole phrase currently has no glossary record.
- Yore is included as a static-content audit because its current placement witness is intentionally bounded and does not render a named Yore dossier.

## Per-Identity Summary

| Identity | Distinct terms | Actual hover terms | Text-only terms | Strategy labels |
|---|---:|---:|---:|---:|
| White (W) | 8 | 6 | 2 | 7 |
| Blue (U) | 7 | 5 | 2 | 7 |
| Black (B) | 5 | 3 | 2 | 7 |
| Red (R) | 2 | 2 | 0 | 7 |
| Green (G) | 7 | 7 | 0 | 7 |
| Azorius Senate (WU) | 9 | 8 | 1 | 7 |
| House Dimir (UB) | 3 | 3 | 0 | 7 |
| Cult of Rakdos (BR) | 4 | 4 | 0 | 7 |
| Gruul Clans (RG) | 4 | 4 | 0 | 7 |
| Selesnya Conclave (WG) | 5 | 4 | 1 | 7 |
| Orzhov Syndicate (WB) | 8 | 7 | 1 | 7 |
| Izzet League (UR) | 5 | 5 | 0 | 7 |
| Golgari Swarm (BG) | 4 | 4 | 0 | 7 |
| Boros Legion (WR) | 6 | 5 | 1 | 7 |
| Simic Combine (UG) | 3 | 3 | 0 | 7 |
| Silverquill College (SILVERQUILL) | 5 | 3 | 2 | 7 |
| Prismari College (PRISMARI) | 9 | 7 | 2 | 7 |
| Witherbloom College (WITHERBLOOM) | 5 | 4 | 1 | 7 |
| Lorehold College (LOREHOLD) | 4 | 4 | 0 | 7 |
| Quandrix College (QUANDRIX) | 4 | 4 | 0 | 7 |
| Bant (BANT) | 8 | 8 | 0 | 7 |
| Esper (ESPER) | 2 | 2 | 0 | 7 |
| Grixis (GRIXIS) | 4 | 4 | 0 | 7 |
| Jund (JUND) | 7 | 7 | 0 | 7 |
| Naya (NAYA) | 5 | 5 | 0 | 7 |
| Abzan Houses (ABZAN) | 5 | 5 | 0 | 7 |
| Temur Frontier (TEMUR) | 5 | 4 | 1 | 7 |
| Sultai Brood (SULTAI) | 4 | 4 | 0 | 7 |
| Mardu Horde (MARDU) | 4 | 4 | 0 | 7 |
| Jeskai Way (JESKAI) | 4 | 4 | 0 | 7 |
| Yore / Artifice (YORE) | 4 | 4 | 0 | 7 |
| Glint / Chaos (GLINT) | 4 | 4 | 0 | 7 |
| Dune / Aggression (DUNE) | 3 | 3 | 0 | 7 |
| Ink / Altruism (INK) | 2 | 1 | 1 | 7 |
| Witch / Growth (WITCH) | 3 | 3 | 0 | 7 |
| Colorless (COLORLESS) | 7 | 6 | 1 | 7 |
| Five-Color / WUBRG (WUBRG) | 1 | 1 | 0 | 7 |

## Identity Detail

### White (W) — 8 terms

Current hover definitions: **6**. Text-only glossary matches: **2**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Board wipe | Board wipes | how-this-plays | No — text only | Reset many permanents at once when one-for-one interaction is not enough. |
| Control | Control | start-here | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Equipment | equipment, Equipment | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | Using Equipment artifacts to enhance creatures repeatedly. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Protection | protection | start-here, why-this-fit, test-the-fit, how-this-plays, what-to-look-for | Yes — start-here | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Taxation | taxes, Taxes | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | Make selected actions cost more mana or other resources. |
| Tempo | tempo | how-this-plays | No — text only | Gaining advantage by making opponents spend more time and mana than you do. |
| Tokens | Tokens | start-here, what-to-look-for-title | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **yes**, for Tokens.
- **Control** (start-here-possible-directions): whole phrase maps to **Control** — A reactive strategy that answers threats and wins after stabilizing. Hover on this label now: **yes**, for Control.
- **Protective Tokens** (start-here-possible-directions): no whole-phrase definition; contains **Tokens**. Hover on this label now: **no**.
- **Protective Tokens** (what-to-look-for-title): no whole-phrase definition; contains **Tokens**. Hover on this label now: **no**.
- **Taxes and Rules** (what-to-look-for-title): no whole-phrase definition; contains **Taxation**. Hover on this label now: **no**.
- **Equipment and Guardians** (what-to-look-for-title): no whole-phrase definition; contains **Equipment**. Hover on this label now: **no**.

### Blue (U) — 7 terms

Current hover definitions: **5**. Text-only glossary matches: **2**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Control | control, Control | start-here | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Draw-Go Control | Draw-Go Control | start-here, what-to-look-for-title | Yes — start-here | Develop mostly on other players' turns; in Commander, keep mana open for draw, counters, or instant-speed interaction. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Open mana | open mana | how-this-plays | No — text only | Leave lands or other mana sources untapped so you can act later. |
| Spellslinger | spellslinger, Spellslinger | start-here, what-to-look-for-title | Yes — start-here | Rewarding the casting of instants and sorceries, often in chains. |
| Tokens | Tokens | what-to-look-for-title | No — text only | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Control** (start-here-possible-directions): whole phrase maps to **Control** — A reactive strategy that answers threats and wins after stabilizing. Hover on this label now: **no**.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Draw-Go Control** (start-here-possible-directions): whole phrase maps to **Draw-Go Control** — Develop mostly on other players' turns; in Commander, keep mana open for draw, counters, or instant-speed interaction. Hover on this label now: **yes**, for Draw-Go Control.
- **Draw-Go Control** (what-to-look-for-title): whole phrase maps to **Draw-Go Control** — Develop mostly on other players' turns; in Commander, keep mana open for draw, counters, or instant-speed interaction. Hover on this label now: **no**.
- **Spellslinger Tokens** (what-to-look-for-title): no whole-phrase definition; contains **Spellslinger**, **Tokens**. Hover on this label now: **no**.
- **Artifacts and Clones** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Black (B) — 5 terms

Current hover definitions: **3**. Text-only glossary matches: **2**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aristocrats | Aristocrats | what-to-look-for-title | No — text only | Winning through creatures dying, sacrifice loops, and drain or value payoffs. |
| Control | Control | what-to-look-for-title | No — text only | A reactive strategy that answers threats and wins after stabilizing. |
| Graveyard value | graveyard, Graveyard | start-here, how-this-plays, what-to-look-for | Yes — start-here | Using the graveyard as an active game zone or resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Sacrifice | Sacrifice, sacrifice | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Sacrifice** (start-here-possible-directions): whole phrase maps to **Sacrifice** — Sacrificing your own permanents for value, protection, or triggers. Hover on this label now: **yes**, for Sacrifice.
- **Graveyard** (start-here-possible-directions): whole phrase maps to **Graveyard value** — Using the graveyard as an active game zone or resource. Hover on this label now: **no**.
- **Life Payment Engines** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Life Payment Engines** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Aristocrats and Sacrifice** (what-to-look-for-title): no whole-phrase definition; contains **Aristocrats**, **Sacrifice**. Hover on this label now: **no**.
- **Reanimator Control** (what-to-look-for-title): no whole-phrase definition; contains **Control**. Hover on this label now: **no**.

### Red (R) — 2 terms

Current hover definitions: **2**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here, what-to-look-for-title | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Burn and Damage** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Haste Aggro** (start-here-possible-directions): no whole-phrase definition; contains **Aggro**. Hover on this label now: **no**.
- **Burn and Damage** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Haste Aggro** (what-to-look-for-title): no whole-phrase definition; contains **Aggro**. Hover on this label now: **no**.
- **Impulse Draw and Treasures** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Green (G) — 7 terms

Current hover definitions: **7**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Big Mana | Big Mana, big mana | start-here, what-to-look-for-title | Yes — start-here | Producing very large amounts of mana for oversized plays. |
| Landfall | landfall, Landfall | start-here, what-to-look-for-title | Yes — start-here | Triggering effects when lands enter the battlefield under your control. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Protection | protection | start-here | Yes — start-here | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Ramp | Ramp | start-here, what-to-look-for-title | Yes — start-here | Getting access to more mana than normal for your turn count. |
| Trample | trample | start-here, how-this-plays, what-to-look-for | Yes — start-here | A creature with trample can assign excess combat damage to the player, planeswalker, or battle it is attacking after assigning lethal damage to its blockers. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Big Mana** (start-here-possible-directions): whole phrase maps to **Big Mana** — Producing very large amounts of mana for oversized plays. Hover on this label now: **yes**, for Big Mana.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Ramp and Big Mana** (start-here-possible-directions): no whole-phrase definition; contains **Ramp**, **Big Mana**. Hover on this label now: **yes**, for Ramp.
- **Ramp and Big Mana** (what-to-look-for-title): no whole-phrase definition; contains **Ramp**, **Big Mana**. Hover on this label now: **no**.
- **Apex Creatures** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Landfall and Creature Value** (what-to-look-for-title): no whole-phrase definition; contains **Landfall**. Hover on this label now: **no**.

### Azorius Senate (WU) — 9 terms

Current hover definitions: **8**. Text-only glossary matches: **1**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Board wipe | sweepers | start-here, how-this-plays | Yes — start-here | Reset many permanents at once when one-for-one interaction is not enough. |
| Control | Control | start-here | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Detain | detain, Detain | start-here, how-this-plays | Yes — start-here | Temporarily stop a permanent from attacking, blocking, or activating non-mana abilities. |
| Draw-Go Control | Draw-Go Control | start-here, what-to-look-for-title | Yes — start-here | Develop mostly on other players' turns; in Commander, keep mana open for draw, counters, or instant-speed interaction. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Open mana | open mana, Hold up mana | start-here, what-to-look-for | Yes — start-here | Leave lands or other mana sources untapped so you can act later. |
| Prison Control | Prison Control | what-to-look-for-title | No — text only | Constrain which actions remain available by using rule-setting permanents and taxes to narrow opposing lines. |
| Taxation | taxes, taxation | start-here, how-this-plays | Yes — start-here | Make selected actions cost more mana or other resources. |
| Tempo | tempo, Tempo | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | Gaining advantage by making opponents spend more time and mana than you do. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Control** (start-here-possible-directions): whole phrase maps to **Control** — A reactive strategy that answers threats and wins after stabilizing. Hover on this label now: **yes**, for Control.
- **Tempo** (start-here-possible-directions): whole phrase maps to **Tempo** — Gaining advantage by making opponents spend more time and mana than you do. Hover on this label now: **no**.
- **Draw-Go Control** (start-here-possible-directions): whole phrase maps to **Draw-Go Control** — Develop mostly on other players' turns; in Commander, keep mana open for draw, counters, or instant-speed interaction. Hover on this label now: **yes**, for Draw-Go Control.
- **Draw-Go Control** (what-to-look-for-title): whole phrase maps to **Draw-Go Control** — Develop mostly on other players' turns; in Commander, keep mana open for draw, counters, or instant-speed interaction. Hover on this label now: **no**.
- **Prison Control** (what-to-look-for-title): whole phrase maps to **Prison Control** — Constrain which actions remain available by using rule-setting permanents and taxes to narrow opposing lines. Hover on this label now: **no**.
- **Tempo / Spirits** (what-to-look-for-title): no whole-phrase definition; contains **Tempo**. Hover on this label now: **no**.

### House Dimir (UB) — 3 terms

Current hover definitions: **3**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Control | control | start-here, test-the-fit, how-this-plays | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Graveyard value | Graveyard, graveyard | start-here, what-to-look-for | Yes — start-here | Using the graveyard as an active game zone or resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Graveyard** (start-here-possible-directions): whole phrase maps to **Graveyard value** — Using the graveyard as an active game zone or resource. Hover on this label now: **yes**, for Graveyard value.
- **Hidden Information Leverage** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Surveil Texture** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Hidden Information Leverage** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Information Filtering** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Visible-Plan Boundary** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Cult of Rakdos (BR) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here, what-to-look-for-title | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Aristocrats | Aristocrats | start-here, what-to-look-for-title | Yes — start-here | Winning through creatures dying, sacrifice loops, and drain or value payoffs. |
| Midrange | Midrange | start-here, what-to-look-for-title | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Sacrifice | sacrifice, Sacrifice | start-here, test-the-fit, how-this-plays, what-to-look-for, what-to-look-for-title | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Aristocrats** (start-here-possible-directions): whole phrase maps to **Aristocrats** — Winning through creatures dying, sacrifice loops, and drain or value payoffs. Hover on this label now: **yes**, for Aristocrats.
- **Rakdos Midrange** (start-here-possible-directions): no whole-phrase definition; contains **Midrange**. Hover on this label now: **no**.
- **Rakdos Midrange** (what-to-look-for-title): no whole-phrase definition; contains **Midrange**. Hover on this label now: **no**.
- **Aristocrats** (what-to-look-for-title): whole phrase maps to **Aristocrats** — Winning through creatures dying, sacrifice loops, and drain or value payoffs. Hover on this label now: **no**.
- **Sacrifice Aggro** (what-to-look-for-title): no whole-phrase definition; contains **Sacrifice**, **Aggro**. Hover on this label now: **no**.

### Gruul Clans (RG) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here, what-to-look-for-title | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Midrange | Midrange, midrange | start-here, what-to-look-for | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Ramp | ramp, Ramp | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | Getting access to more mana than normal for your turn count. |
| Trample | trample | start-here, how-this-plays | Yes — start-here | A creature with trample can assign excess combat damage to the player, planeswalker, or battle it is attacking after assigning lethal damage to its blockers. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Ramp** (start-here-possible-directions): whole phrase maps to **Ramp** — Getting access to more mana than normal for your turn count. Hover on this label now: **no**.
- **Zoo / Aggro** (start-here-possible-directions): no whole-phrase definition; contains **Aggro**. Hover on this label now: **no**.
- **Zoo / Aggro** (what-to-look-for-title): no whole-phrase definition; contains **Aggro**. Hover on this label now: **no**.
- **Ramp** (what-to-look-for-title): whole phrase maps to **Ramp** — Getting access to more mana than normal for your turn count. Hover on this label now: **no**.
- **Ponza / Land Denial** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Selesnya Conclave (WG) — 5 terms

Current hover definitions: **4**. Text-only glossary matches: **1**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Convoke | Convoke | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | As you cast a spell with convoke, your creatures can be tapped to help pay its mana cost; each tapped creature pays for one mana of its color or one generic mana. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Populate | populate | how-this-plays | No — text only | Create a token that's a copy of a creature token you control. |
| Protection | protection | start-here, how-this-plays, what-to-look-for | Yes — start-here | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Tokens | tokens, Tokens | start-here, test-the-fit, how-this-plays, what-to-look-for | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **no**.
- **Convoke Community** (start-here-possible-directions): no whole-phrase definition; contains **Convoke**. Hover on this label now: **yes**, for Convoke.
- **Go-Wide Caretaking** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Convoke Community** (what-to-look-for-title): no whole-phrase definition; contains **Convoke**. Hover on this label now: **no**.
- **Go-Wide Caretaking** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Harmony And Preservation** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Orzhov Syndicate (WB) — 8 terms

Current hover definitions: **7**. Text-only glossary matches: **1**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Aristocrats | aristocrats | start-here, how-this-plays | Yes — start-here | Winning through creatures dying, sacrifice loops, and drain or value payoffs. |
| Board wipe | board wipe | start-here | Yes — start-here | Reset many permanents at once when one-for-one interaction is not enough. |
| Control | control | why-this-fit, what-to-look-for | Yes — why-this-fit | A reactive strategy that answers threats and wins after stabilizing. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Sacrifice | sacrifice, Sacrifice | start-here, test-the-fit, how-this-plays, what-to-look-for | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |
| Taxation | tax, taxes, taxation | start-here, test-the-fit, how-this-plays | Yes — start-here | Make selected actions cost more mana or other resources. |
| Tokens | Tokens | what-to-look-for-title | No — text only | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Sacrifice** (start-here-possible-directions): whole phrase maps to **Sacrifice** — Sacrificing your own permanents for value, protection, or triggers. Hover on this label now: **no**.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Obligation Engines** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Obligation Engines** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Payment Pressure** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Afterlife Tokens** (what-to-look-for-title): no whole-phrase definition; contains **Tokens**. Hover on this label now: **no**.

### Izzet League (UR) — 5 terms

Current hover definitions: **5**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Graveyard value | graveyard | what-to-look-for | Yes — what-to-look-for | Using the graveyard as an active game zone or resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Spellslinger | Spellslinger, spellslinger | start-here, test-the-fit, how-this-plays | Yes — start-here | Rewarding the casting of instants and sorceries, often in chains. |
| Storm | storm, Storm | start-here, what-to-look-for-title, what-to-look-for | Yes — start-here | Casting many spells in one turn, sometimes using the Storm keyword. |
| Tempo | tempo, Tempo | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | Gaining advantage by making opponents spend more time and mana than you do. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Tempo** (start-here-possible-directions): whole phrase maps to **Tempo** — Gaining advantage by making opponents spend more time and mana than you do. Hover on this label now: **no**.
- **Spellslinger** (start-here-possible-directions): whole phrase maps to **Spellslinger** — Rewarding the casting of instants and sorceries, often in chains. Hover on this label now: **yes**, for Spellslinger.
- **Tempo / Delver** (start-here-possible-directions): no whole-phrase definition; contains **Tempo**. Hover on this label now: **no**.
- **Tempo / Delver** (what-to-look-for-title): no whole-phrase definition; contains **Tempo**. Hover on this label now: **no**.
- **Storm** (what-to-look-for-title): whole phrase maps to **Storm** — Casting many spells in one turn, sometimes using the Storm keyword. Hover on this label now: **no**.
- **Spells-Matter / Phoenix** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Golgari Swarm (BG) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Graveyard value | graveyard, Graveyard, graveyard value, Graveyard Value | start-here, test-the-fit, how-this-plays, what-to-look-for-title, what-to-look-for | Yes — start-here | Using the graveyard as an active game zone or resource. |
| Midrange | Midrange | start-here, what-to-look-for-title | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Sacrifice | sacrifice | start-here, test-the-fit, how-this-plays | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |
| Self-mill | Self-mill | start-here | Yes — start-here | Putting cards from your own library into your graveyard on purpose. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Graveyard** (start-here-possible-directions): whole phrase maps to **Graveyard value** — Using the graveyard as an active game zone or resource. Hover on this label now: **no**.
- **Dredge** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Rock / BGx Midrange** (start-here-possible-directions): no whole-phrase definition; contains **Midrange**. Hover on this label now: **no**.
- **Rock / BGx Midrange** (what-to-look-for-title): no whole-phrase definition; contains **Midrange**. Hover on this label now: **no**.
- **Graveyard Value** (what-to-look-for-title): whole phrase maps to **Graveyard value** — Using the graveyard as an active game zone or resource. Hover on this label now: **no**.
- **Dredge** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Boros Legion (WR) — 6 terms

Current hover definitions: **5**. Text-only glossary matches: **1**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here, what-to-look-for-title | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Equipment | equipment, Equipment | start-here, test-the-fit, how-this-plays, what-to-look-for-title, what-to-look-for | Yes — start-here | Using Equipment artifacts to enhance creatures repeatedly. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Protection | protection | start-here, test-the-fit, how-this-plays | Yes — start-here | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Tokens | Tokens, tokens | start-here, what-to-look-for | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |
| Voltron | Voltron | what-to-look-for-title | No — text only | Building one creature, often a commander, into a lethal protected threat. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **yes**, for Tokens.
- **Equipment** (start-here-possible-directions): whole phrase maps to **Equipment** — Using Equipment artifacts to enhance creatures repeatedly. Hover on this label now: **no**.
- **Go-Wide Aggro** (start-here-possible-directions): no whole-phrase definition; contains **Aggro**. Hover on this label now: **yes**, for Aggro.
- **Go-Wide Aggro** (what-to-look-for-title): no whole-phrase definition; contains **Aggro**. Hover on this label now: **no**.
- **Burn / Heroic** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Equipment Voltron** (what-to-look-for-title): no whole-phrase definition; contains **Equipment**, **Voltron**. Hover on this label now: **no**.

### Simic Combine (UG) — 3 terms

Current hover definitions: **3**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Counters Matter | Counters Matter | start-here | Yes — start-here | Using counters on permanents or players as a scaling resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Ramp | ramp, Ramp | start-here, test-the-fit, how-this-plays, what-to-look-for | Yes — start-here | Getting access to more mana than normal for your turn count. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Ramp** (start-here-possible-directions): whole phrase maps to **Ramp** — Getting access to more mana than normal for your turn count. Hover on this label now: **no**.
- **Counters Matter** (start-here-possible-directions): whole phrase maps to **Counters Matter** — Using counters on permanents or players as a scaling resource. Hover on this label now: **yes**, for Counters Matter.
- **Living-System Value** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Living-System Value** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Biological Adaptation** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Clade Research And Pressure Response** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Silverquill College (SILVERQUILL) — 5 terms

Current hover definitions: **3**. Text-only glossary matches: **2**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Goad | goad | how-this-plays | No — text only | Until your next turn, a goaded creature attacks each combat if able and attacks a player other than you if able. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Spellslinger | Spellslinger | start-here | Yes — start-here | Rewarding the casting of instants and sorceries, often in chains. |
| Tokens | tokens | how-this-plays | No — text only | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Spellslinger** (start-here-possible-directions): whole phrase maps to **Spellslinger** — Rewarding the casting of instants and sorceries, often in chains. Hover on this label now: **yes**, for Spellslinger.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Word-Magic and Rhetorical Influence** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Word-Magic and Rhetorical Influence** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Leadership, Critique, and Social Pressure** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Exact Silverquill Starting Points** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Prismari College (PRISMARI) — 9 terms

Current hover definitions: **7**. Text-only glossary matches: **2**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Big Spell Storm | Big Spell Storm | start-here, what-to-look-for-title | Yes — start-here | A spellslinger plan that builds mana and spell count toward a concentrated turn of large spells; it may use the Storm keyword, but does not have to. |
| Control | Control | what-to-look-for-title | No — text only | A reactive strategy that answers threats and wins after stabilizing. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Open mana | open mana | what-to-look-for | Yes — what-to-look-for | Leave lands or other mana sources untapped so you can act later. |
| Protection | protection | start-here | Yes — start-here | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Spell copying | spell copying | start-here | Yes — start-here | Copying instants, sorceries, or other spells for extra effects. |
| Spellslinger | Spellslinger | start-here | Yes — start-here | Rewarding the casting of instants and sorceries, often in chains. |
| Tempo | Tempo | what-to-look-for-title | No — text only | Gaining advantage by making opponents spend more time and mana than you do. |
| Tokens | Tokens, tokens | start-here, what-to-look-for, what-to-look-for-title | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Spellslinger** (start-here-possible-directions): whole phrase maps to **Spellslinger** — Rewarding the casting of instants and sorceries, often in chains. Hover on this label now: **yes**, for Spellslinger.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **yes**, for Tokens.
- **Big Spell Storm** (start-here-possible-directions): whole phrase maps to **Big Spell Storm** — A spellslinger plan that builds mana and spell count toward a concentrated turn of large spells; it may use the Storm keyword, but does not have to. Hover on this label now: **yes**, for Big Spell Storm.
- **Big Spell Storm** (what-to-look-for-title): whole phrase maps to **Big Spell Storm** — A spellslinger plan that builds mana and spell count toward a concentrated turn of large spells; it may use the Storm keyword, but does not have to. Hover on this label now: **no**.
- **Spells-Matter Tokens** (what-to-look-for-title): no whole-phrase definition; contains **Tokens**. Hover on this label now: **no**.
- **Izzet Control / Tempo** (what-to-look-for-title): no whole-phrase definition; contains **Control**, **Tempo**. Hover on this label now: **no**.

### Witherbloom College (WITHERBLOOM) — 5 terms

Current hover definitions: **4**. Text-only glossary matches: **1**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Graveyard value | graveyard | test-the-fit | Yes — test-the-fit | Using the graveyard as an active game zone or resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Sacrifice | Sacrifice, sacrifice | start-here, test-the-fit, how-this-plays, what-to-look-for | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |
| Tokens | tokens | how-this-plays | No — text only | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Sacrifice** (start-here-possible-directions): whole phrase maps to **Sacrifice** — Sacrificing your own permanents for value, protection, or triggers. Hover on this label now: **yes**, for Sacrifice.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Essence Exchange** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Essence Exchange** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Remedies and Poisons** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Field Biology and Cost** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Lorehold College (LOREHOLD) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Graveyard value | Graveyard, graveyard, graveyard value | start-here, test-the-fit, how-this-plays, what-to-look-for | Yes — start-here | Using the graveyard as an active game zone or resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Tokens | tokens | start-here, how-this-plays | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Graveyard** (start-here-possible-directions): whole phrase maps to **Graveyard value** — Using the graveyard as an active game zone or resource. Hover on this label now: **yes**, for Graveyard value.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Spirit Tribal** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Spirit Tribal** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Boros Artifacts** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Historic / Sagas** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Quandrix College (QUANDRIX) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Counters Matter | Counters Matter | start-here | Yes — start-here | Using counters on permanents or players as a scaling resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Ramp | ramp, Ramp | start-here, how-this-plays, what-to-look-for-title, what-to-look-for | Yes — start-here | Getting access to more mana than normal for your turn count. |
| Tokens | tokens, Tokens | start-here, test-the-fit, how-this-plays | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Counters Matter** (start-here-possible-directions): whole phrase maps to **Counters Matter** — Using counters on permanents or players as a scaling resource. Hover on this label now: **yes**, for Counters Matter.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **no**.
- **Fractal Counters** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Fractal Counters** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Token Doubling** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Simic Ramp / Big Threats** (what-to-look-for-title): no whole-phrase definition; contains **Ramp**. Hover on this label now: **no**.

### Bant (BANT) — 8 terms

Current hover definitions: **8**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Blink/Flicker | blink | start-here, how-this-plays, what-to-look-for | Yes — start-here | Exiling permanents and returning them to reuse enter-the-battlefield effects or dodge removal. |
| Control | control | test-the-fit | Yes — test-the-fit | A reactive strategy that answers threats and wins after stabilizing. |
| Counters Matter | Counters Matter | start-here | Yes — start-here | Using counters on permanents or players as a scaling resource. |
| Equipment | equipment | start-here, how-this-plays, what-to-look-for | Yes — start-here | Using Equipment artifacts to enhance creatures repeatedly. |
| ETB | ETB | start-here, how-this-plays | Yes — start-here | Using effects that trigger when permanents enter the battlefield. |
| Prison Control | prison | start-here | Yes — start-here | Constrain which actions remain available by using rule-setting permanents and taxes to narrow opposing lines. |
| Protection | protection | start-here, how-this-plays | Yes — start-here | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Voltron | Voltron | start-here | Yes — start-here | Building one creature, often a commander, into a lethal protected threat. |

Strategy labels:

- **Voltron** (start-here-possible-directions): whole phrase maps to **Voltron** — Building one creature, often a commander, into a lethal protected threat. Hover on this label now: **yes**, for Voltron.
- **Counters Matter** (start-here-possible-directions): whole phrase maps to **Counters Matter** — Using counters on permanents or players as a scaling resource. Hover on this label now: **yes**, for Counters Matter.
- **Enchantments** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Exalted Champion** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Exalted Champion** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Creature-Forward Value** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Enchantress and Aura Order** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Esper (ESPER) — 2 terms

Current hover definitions: **2**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Control | Control, control | start-here, test-the-fit, how-this-plays, what-to-look-for-title | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Tokens | tokens | start-here, how-this-plays | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Control** (start-here-possible-directions): whole phrase maps to **Control** — A reactive strategy that answers threats and wins after stabilizing. Hover on this label now: **yes**, for Control.
- **Artifacts** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Enchantments** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Perfectibility Control** (start-here-possible-directions): no whole-phrase definition; contains **Control**. Hover on this label now: **no**.
- **Perfectibility Control** (what-to-look-for-title): no whole-phrase definition; contains **Control**. Hover on this label now: **no**.
- **Information Engines** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Artifact-Oriented Value** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Grixis (GRIXIS) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aristocrats | Aristocrats | start-here | Yes — start-here | Winning through creatures dying, sacrifice loops, and drain or value payoffs. |
| Control | Control, control | start-here, test-the-fit, how-this-plays, what-to-look-for-title | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Sacrifice | sacrifice | start-here, test-the-fit, how-this-plays | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |
| Spellslinger | Spellslinger, spellslinger | start-here, test-the-fit | Yes — start-here | Rewarding the casting of instants and sorceries, often in chains. |

Strategy labels:

- **Control** (start-here-possible-directions): whole phrase maps to **Control** — A reactive strategy that answers threats and wins after stabilizing. Hover on this label now: **yes**, for Control.
- **Spellslinger** (start-here-possible-directions): whole phrase maps to **Spellslinger** — Rewarding the casting of instants and sorceries, often in chains. Hover on this label now: **yes**, for Spellslinger.
- **Aristocrats** (start-here-possible-directions): whole phrase maps to **Aristocrats** — Winning through creatures dying, sacrifice loops, and drain or value payoffs. Hover on this label now: **yes**, for Aristocrats.
- **Survival Control** (start-here-possible-directions): no whole-phrase definition; contains **Control**. Hover on this label now: **no**.
- **Survival Control** (what-to-look-for-title): no whole-phrase definition; contains **Control**. Hover on this label now: **no**.
- **Leverage Engines** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Volatile Spell Pressure** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Jund (JUND) — 7 terms

Current hover definitions: **7**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Counters Matter | Counters Matter | start-here | Yes — start-here | Using counters on permanents or players as a scaling resource. |
| Devour | devour | start-here, test-the-fit | Yes — start-here | Devour lets a creature enter with +1/+1 counters for each creature sacrificed as it enters; Devour N gives N counters per creature. |
| Graveyard value | graveyard value, graveyard | start-here, test-the-fit, how-this-plays | Yes — start-here | Using the graveyard as an active game zone or resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Sacrifice | sacrifice | start-here, test-the-fit, how-this-plays | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |
| Tokens | tokens | start-here | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Counters Matter** (start-here-possible-directions): whole phrase maps to **Counters Matter** — Using counters on permanents or players as a scaling resource. Hover on this label now: **yes**, for Counters Matter.
- **Instinctive Pressure** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Instinctive Pressure** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Appetite Engines** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Feral Value** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Naya (NAYA) — 5 terms

Current hover definitions: **5**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Big Mana | Big Mana | start-here | Yes — start-here | Producing very large amounts of mana for oversized plays. |
| Control | control | test-the-fit | Yes — test-the-fit | A reactive strategy that answers threats and wins after stabilizing. |
| Protection | protection, Protection | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Ramp | Ramp | start-here, how-this-plays | Yes — start-here | Getting access to more mana than normal for your turn count. |
| Tokens | Tokens, tokens | start-here, test-the-fit, how-this-plays | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Ramp** (start-here-possible-directions): whole phrase maps to **Ramp** — Getting access to more mana than normal for your turn count. Hover on this label now: **yes**, for Ramp.
- **Big Mana** (start-here-possible-directions): whole phrase maps to **Big Mana** — Producing very large amounts of mana for oversized plays. Hover on this label now: **yes**, for Big Mana.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **yes**, for Tokens.
- **Living Abundance** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Living Abundance** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Instinctive Protection** (what-to-look-for-title): no whole-phrase definition; contains **Protection**. Hover on this label now: **no**.
- **Creature-Forward Scale** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Abzan Houses (ABZAN) — 5 terms

Current hover definitions: **5**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Counters Matter | Counters Matter | start-here | Yes — start-here | Using counters on permanents or players as a scaling resource. |
| Graveyard value | graveyard | start-here, how-this-plays | Yes — start-here | Using the graveyard as an active game zone or resource. |
| Protection | protection | why-this-fit | Yes — why-this-fit | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Sacrifice | sacrifice | start-here, how-this-plays | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |
| Tokens | Tokens, tokens | start-here, how-this-plays | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Counters Matter** (start-here-possible-directions): whole phrase maps to **Counters Matter** — Using counters on permanents or players as a scaling resource. Hover on this label now: **yes**, for Counters Matter.
- **Lifegain** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **yes**, for Tokens.
- **Family Endurance** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Family Endurance** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Ancestor Obligation** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Perennial Defense** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Temur Frontier (TEMUR) — 5 terms

Current hover definitions: **4**. Text-only glossary matches: **1**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Big Mana | Big Mana | start-here | Yes — start-here | Producing very large amounts of mana for oversized plays. |
| Ramp | Ramp, ramp | start-here, test-the-fit, how-this-plays | Yes — start-here | Getting access to more mana than normal for your turn count. |
| Spellslinger | Spellslinger | start-here | Yes — start-here | Rewarding the casting of instants and sorceries, often in chains. |
| Storm | storm | how-this-plays | No — text only | Casting many spells in one turn, sometimes using the Storm keyword. |
| Tokens | tokens | start-here | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Ramp** (start-here-possible-directions): whole phrase maps to **Ramp** — Getting access to more mana than normal for your turn count. Hover on this label now: **yes**, for Ramp.
- **Big Mana** (start-here-possible-directions): whole phrase maps to **Big Mana** — Producing very large amounts of mana for oversized plays. Hover on this label now: **yes**, for Big Mana.
- **Spellslinger** (start-here-possible-directions): whole phrase maps to **Spellslinger** — Rewarding the casting of instants and sorceries, often in chains. Hover on this label now: **yes**, for Spellslinger.
- **Survival Through Attunement** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Survival Through Attunement** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Instinct With Mental Fortitude** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Elemental Memory** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Sultai Brood (SULTAI) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Control | control | test-the-fit | Yes — test-the-fit | A reactive strategy that answers threats and wins after stabilizing. |
| Graveyard value | Graveyard, Graveyard value, graveyard, graveyard value | start-here, test-the-fit, how-this-plays | Yes — start-here | Using the graveyard as an active game zone or resource. |
| Ramp | ramp | test-the-fit | Yes — test-the-fit | Getting access to more mana than normal for your turn count. |
| Self-mill | Self-Mill, self-mill | start-here, how-this-plays | Yes — start-here | Putting cards from your own library into your graveyard on purpose. |

Strategy labels:

- **Graveyard** (start-here-possible-directions): whole phrase maps to **Graveyard value** — Using the graveyard as an active game zone or resource. Hover on this label now: **yes**, for Graveyard value.
- **Theft** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Self-Mill** (start-here-possible-directions): whole phrase maps to **Self-mill** — Putting cards from your own library into your graveyard on purpose. Hover on this label now: **yes**, for Self-mill.
- **Resource Conversion** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Resource Conversion** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Necromantic Utility** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Calculated Ruthlessness** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Mardu Horde (MARDU) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro, aggro | start-here, test-the-fit | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Aristocrats | aristocrats | start-here | Yes — start-here | Winning through creatures dying, sacrifice loops, and drain or value payoffs. |
| Sacrifice | Sacrifice, sacrifice | start-here, test-the-fit, how-this-plays | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |
| Tokens | Tokens, tokens | start-here, test-the-fit, how-this-plays | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **yes**, for Tokens.
- **Sacrifice** (start-here-possible-directions): whole phrase maps to **Sacrifice** — Sacrificing your own permanents for value, protection, or triggers. Hover on this label now: **yes**, for Sacrifice.
- **Raid Momentum** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Raid Momentum** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **War-Name Oath** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Ruthless Opening** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Jeskai Way (JESKAI) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Control | Control, control | start-here, test-the-fit | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Protection | protection | start-here, how-this-plays, what-to-look-for | Yes — start-here | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Spellslinger | Spellslinger | start-here | Yes — start-here | Rewarding the casting of instants and sorceries, often in chains. |
| Tempo | Tempo, tempo | start-here, test-the-fit, how-this-plays, what-to-look-for-title | Yes — start-here | Gaining advantage by making opponents spend more time and mana than you do. |

Strategy labels:

- **Spellslinger** (start-here-possible-directions): whole phrase maps to **Spellslinger** — Rewarding the casting of instants and sorceries, often in chains. Hover on this label now: **yes**, for Spellslinger.
- **Tempo** (start-here-possible-directions): whole phrase maps to **Tempo** — Gaining advantage by making opponents spend more time and mana than you do. Hover on this label now: **yes**, for Tempo.
- **Control** (start-here-possible-directions): whole phrase maps to **Control** — A reactive strategy that answers threats and wins after stabilizing. Hover on this label now: **yes**, for Control.
- **Disciplined Tempo** (start-here-possible-directions): no whole-phrase definition; contains **Tempo**. Hover on this label now: **no**.
- **Disciplined Tempo** (what-to-look-for-title): no whole-phrase definition; contains **Tempo**. Hover on this label now: **no**.
- **Cunning In Motion** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Monastery Practice** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Yore / Artifice (YORE) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.
Yore note: static dossier content only; the current placement engine intentionally keeps its certified witness in a bounded unnamed state.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aristocrats | Aristocrats | start-here | Yes — start-here | Winning through creatures dying, sacrifice loops, and drain or value payoffs. |
| Control | Control, control | start-here, how-this-plays | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Graveyard value | graveyard | start-here | Yes — start-here | Using the graveyard as an active game zone or resource. |
| Sacrifice | sacrifice | start-here, how-this-plays | Yes — start-here | Sacrificing your own permanents for value, protection, or triggers. |

Strategy labels:

- **Artifacts** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Aristocrats** (start-here-possible-directions): whole phrase maps to **Aristocrats** — Winning through creatures dying, sacrifice loops, and drain or value payoffs. Hover on this label now: **yes**, for Aristocrats.
- **Control** (start-here-possible-directions): whole phrase maps to **Control** — A reactive strategy that answers threats and wins after stabilizing. Hover on this label now: **yes**, for Control.
- **Engineered Agency** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Engineered Agency** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Artifice And Archive** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Controlled Overreach** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Glint / Chaos (GLINT) — 4 terms

Current hover definitions: **4**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Spellslinger | Spellslinger | start-here | Yes — start-here | Rewarding the casting of instants and sorceries, often in chains. |
| Storm | storm, Storm | start-here, how-this-plays, what-to-look-for-title | Yes — start-here | Casting many spells in one turn, sometimes using the Storm keyword. |

Strategy labels:

- **Spellslinger** (start-here-possible-directions): whole phrase maps to **Spellslinger** — Rewarding the casting of instants and sorceries, often in chains. Hover on this label now: **yes**, for Spellslinger.
- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Adaptive Appetite** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Adaptive Appetite** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Storm-Fed Opportunity** (what-to-look-for-title): no whole-phrase definition; contains **Storm**. Hover on this label now: **no**.
- **Predatory Overreach** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Dune / Aggression (DUNE) — 3 terms

Current hover definitions: **3**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Aggro | Aggro | start-here | Yes — start-here | A proactive strategy that pressures opponents early through damage or threats. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Tokens | Tokens, token deck, tokens | start-here, test-the-fit | Yes — start-here | Creating token permanents, especially creature tokens, as resources or threats. |

Strategy labels:

- **Aggro** (start-here-possible-directions): whole phrase maps to **Aggro** — A proactive strategy that pressures opponents early through damage or threats. Hover on this label now: **yes**, for Aggro.
- **Tokens** (start-here-possible-directions): whole phrase maps to **Tokens** — Creating token permanents, especially creature tokens, as resources or threats. Hover on this label now: **yes**, for Tokens.
- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Organized Territorial Pressure** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Organized Territorial Pressure** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Common-Front Momentum** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Conquest Overreach** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Ink / Altruism (INK) — 2 terms

Current hover definitions: **1**. Text-only glossary matches: **1**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Control | control | how-this-plays | No — text only | A reactive strategy that answers threats and wins after stabilizing. |
| Ramp | ramp, Ramp | start-here, how-this-plays | Yes — start-here | Getting access to more mana than normal for your turn count. |

Strategy labels:

- **Group Hug** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Politics** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Ramp** (start-here-possible-directions): whole phrase maps to **Ramp** — Getting access to more mana than normal for your turn count. Hover on this label now: **no**.
- **Protected Public Abundance** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Protected Public Abundance** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Open Knowledge Pact** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Self-Erasure Risk** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Witch / Growth (WITCH) — 3 terms

Current hover definitions: **3**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Control | Control, control | start-here, test-the-fit, what-to-look-for-title, what-to-look-for | Yes — start-here | A reactive strategy that answers threats and wins after stabilizing. |
| Counters Matter | Counters Matter | start-here | Yes — start-here | Using counters on permanents or players as a scaling resource. |
| Midrange | Midrange | start-here | Yes — start-here | A flexible strategy built on efficient threats, answers, and repeatable value. |

Strategy labels:

- **Counters Matter** (start-here-possible-directions): whole phrase maps to **Counters Matter** — Using counters on permanents or players as a scaling resource. Hover on this label now: **yes**, for Counters Matter.
- **Midrange** (start-here-possible-directions): whole phrase maps to **Midrange** — A flexible strategy built on efficient threats, answers, and repeatable value. Hover on this label now: **yes**, for Midrange.
- **Control** (start-here-possible-directions): whole phrase maps to **Control** — A reactive strategy that answers threats and wins after stabilizing. Hover on this label now: **yes**, for Control.
- **Patient Cultivation** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Patient Cultivation** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Calculated Expansion** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Sterile Control Risk** (what-to-look-for-title): no whole-phrase definition; contains **Control**. Hover on this label now: **no**.

### Colorless (COLORLESS) — 7 terms

Current hover definitions: **6**. Text-only glossary matches: **1**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Big Mana | Big Mana, big mana | start-here, how-this-plays | Yes — start-here | Producing very large amounts of mana for oversized plays. |
| Colorless mana | colorless mana | how-this-plays, mana-notes | No — text only | Colorless mana is mana with no color. A {C} cost can be paid only with colorless mana. |
| Devoid | Devoid | start-here, test-the-fit, how-this-plays, what-to-look-for | Yes — start-here | A card with devoid is colorless even if colored mana symbols appear in its mana cost. Devoid does not remove those colors from the card's Commander color identity. |
| Generic mana | generic mana | test-the-fit, what-to-look-for | Yes — test-the-fit | A generic mana cost is shown with a number and can be paid with mana of any color or with colorless mana; it is a cost, not a type of mana. |
| Mana rocks | mana rocks, Mana rocks | start-here, how-this-plays, mana-notes | Yes — start-here | Getting access to more mana than normal for your turn count. |
| Ramp | Ramp | start-here | Yes — start-here | Getting access to more mana than normal for your turn count. |
| Wastes | Wastes | start-here, test-the-fit, how-this-plays, what-to-look-for, mana-notes | Yes — start-here | Wastes is a basic land with no land types that taps for one colorless mana; a Commander deck may include any number of it. |

Strategy labels:

- **Artifacts** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Big Mana** (start-here-possible-directions): whole phrase maps to **Big Mana** — Producing very large amounts of mana for oversized plays. Hover on this label now: **yes**, for Big Mana.
- **Ramp** (start-here-possible-directions): whole phrase maps to **Ramp** — Getting access to more mana than normal for your turn count. Hover on this label now: **yes**, for Ramp.
- **Chosen Restriction** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Chosen Restriction** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Machine And Void** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Boundary Discipline** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

### Five-Color / WUBRG (WUBRG) — 1 terms

Current hover definitions: **1**. Text-only glossary matches: **0**. Strategy labels: **7**.

| Term | Matched text | Surfaces | Hover now? | Current meaning |
|---|---|---|---|---|
| Ramp | Ramp | start-here | Yes — start-here | Getting access to more mana than normal for your turn count. |

Strategy labels:

- **Five-Color** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Ramp** (start-here-possible-directions): whole phrase maps to **Ramp** — Getting access to more mana than normal for your turn count. Hover on this label now: **yes**, for Ramp.
- **Multicolor** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Full-Spectrum Integrator** (start-here-possible-directions): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Full-Spectrum Integrator** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Coalition Builder** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.
- **Boundary Keeper** (what-to-look-for-title): no whole-phrase or contained glossary definition. Hover on this label now: **no**.

## Aggregate Glossary Coverage

| Term | Identities using it | Identities with hover | Occurrences | Current meaning |
|---|---:|---:|---:|---|
| Midrange | 24 | 24 | 29 | A flexible strategy built on efficient threats, answers, and repeatable value. |
| Tokens | 17 | 13 | 42 | Creating token permanents, especially creature tokens, as resources or threats. |
| Control | 16 | 13 | 38 | A reactive strategy that answers threats and wins after stabilizing. |
| Aggro | 14 | 14 | 21 | A proactive strategy that pressures opponents early through damage or threats. |
| Graveyard value | 10 | 10 | 36 | Using the graveyard as an active game zone or resource. |
| Ramp | 10 | 10 | 36 | Getting access to more mana than normal for your turn count. |
| Sacrifice | 10 | 10 | 47 | Sacrificing your own permanents for value, protection, or triggers. |
| Protection | 9 | 9 | 34 | Protection from a quality prevents damage, enchanting or equipping, blocking, and targeting from sources with that quality; it does not stop effects that do none of those things. |
| Spellslinger | 8 | 8 | 13 | Rewarding the casting of instants and sorceries, often in chains. |
| Aristocrats | 6 | 5 | 8 | Winning through creatures dying, sacrifice loops, and drain or value payoffs. |
| Counters Matter | 6 | 6 | 6 | Using counters on permanents or players as a scaling resource. |
| Tempo | 5 | 3 | 17 | Gaining advantage by making opponents spend more time and mana than you do. |
| Big Mana | 4 | 4 | 8 | Producing very large amounts of mana for oversized plays. |
| Board wipe | 3 | 2 | 4 | Reset many permanents at once when one-for-one interaction is not enough. |
| Equipment | 3 | 3 | 13 | Using Equipment artifacts to enhance creatures repeatedly. |
| Open mana | 3 | 2 | 5 | Leave lands or other mana sources untapped so you can act later. |
| Storm | 3 | 2 | 10 | Casting many spells in one turn, sometimes using the Storm keyword. |
| Taxation | 3 | 3 | 12 | Make selected actions cost more mana or other resources. |
| Draw-Go Control | 2 | 2 | 4 | Develop mostly on other players' turns; in Commander, keep mana open for draw, counters, or instant-speed interaction. |
| Prison Control | 2 | 1 | 2 | Constrain which actions remain available by using rule-setting permanents and taxes to narrow opposing lines. |
| Self-mill | 2 | 2 | 4 | Putting cards from your own library into your graveyard on purpose. |
| Trample | 2 | 2 | 6 | A creature with trample can assign excess combat damage to the player, planeswalker, or battle it is attacking after assigning lethal damage to its blockers. |
| Voltron | 2 | 1 | 2 | Building one creature, often a commander, into a lethal protected threat. |
| Big Spell Storm | 1 | 1 | 2 | A spellslinger plan that builds mana and spell count toward a concentrated turn of large spells; it may use the Storm keyword, but does not have to. |
| Blink/Flicker | 1 | 1 | 3 | Exiling permanents and returning them to reuse enter-the-battlefield effects or dodge removal. |
| Colorless mana | 1 | 0 | 4 | Colorless mana is mana with no color. A {C} cost can be paid only with colorless mana. |
| Convoke | 1 | 1 | 4 | As you cast a spell with convoke, your creatures can be tapped to help pay its mana cost; each tapped creature pays for one mana of its color or one generic mana. |
| Detain | 1 | 1 | 2 | Temporarily stop a permanent from attacking, blocking, or activating non-mana abilities. |
| Devoid | 1 | 1 | 5 | A card with devoid is colorless even if colored mana symbols appear in its mana cost. Devoid does not remove those colors from the card's Commander color identity. |
| Devour | 1 | 1 | 2 | Devour lets a creature enter with +1/+1 counters for each creature sacrificed as it enters; Devour N gives N counters per creature. |
| ETB | 1 | 1 | 2 | Using effects that trigger when permanents enter the battlefield. |
| Generic mana | 1 | 1 | 2 | A generic mana cost is shown with a number and can be paid with mana of any color or with colorless mana; it is a cost, not a type of mana. |
| Goad | 1 | 0 | 1 | Until your next turn, a goaded creature attacks each combat if able and attacks a player other than you if able. |
| Landfall | 1 | 1 | 2 | Triggering effects when lands enter the battlefield under your control. |
| Mana rocks | 1 | 1 | 5 | Getting access to more mana than normal for your turn count. |
| Populate | 1 | 0 | 1 | Create a token that's a copy of a creature token you control. |
| Spell copying | 1 | 1 | 1 | Copying instants, sorceries, or other spells for extra effects. |
| Wastes | 1 | 1 | 7 | Wastes is a basic land with no land types that taps for one colorless mana; a Commander deck may include any number of it. |
| Hatebears | 0 | 0 | 0 | Small creatures that restrict opponents' actions while applying pressure. |
| Parity | 0 | 0 | 0 | A board or resource state that appears even; breaking parity means benefiting more than opponents from a symmetrical rule or reset. |
| Pillowfort | 0 | 0 | 0 | Make attacking you less attractive or more expensive without necessarily stopping the whole table. |
| Stax | 0 | 0 | 0 | Restricting resources, actions, or timing so opponents cannot execute normal plans. |

## Findings

1. A strategy label and a glossary term are not the same contract. Most identity-specific labels are longer editorial phrases, while the hover system generally teaches a contained canonical term.
2. Titles in What to Look For are not hover-enabled; only their descriptions pass through the education renderer. A title can therefore visibly contain a glossary term while receiving no tooltip itself.
3. How This Plays is a frequent source of Commander vocabulary but is text-only under the current renderer. The glossary catalog may define a term used there without exposing that definition at that occurrence.
4. Start Here usually wins the one-decoration allocation when the same term repeats later. Later sections retain readable text but do not receive a second hover target.
5. `Midrange` is also used elsewhere in the dossier as a land-upgrade lane label, a separate budget meaning from the glossary's strategy definition. That generic mana-panel label is excluded from the identity term count to avoid presenting two meanings as one.
6. This audit reports current behavior only. Adding whole-phrase definitions, enabling title hovers, or expanding education surfaces would be a separate product/content decision.

## Reproduction

```powershell
node scripts/build-vm564-dossier-term-audit.mjs --check
```
