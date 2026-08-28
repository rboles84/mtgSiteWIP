# Implicit Maze — Evidence Gate CLOSED (Calibration V3.2)

**Freeze date:** 2026-08-27  
**Owner decisions:** 29 / 29 resolved  
**Evidence checks:** 7 / 7 closed  
**Open evidence backlog:** 0  
**Next permitted step:** controlled reclassification of the remaining 1,038 lexicon rows with a diff report.  
**Not permitted:** blind overwrite of the raw corpus or historical calibration evidence.

---

## Final Evidence Status

| Evidence | Case | Status | Frozen product/runtime rule |
|---|---|---|---|
| EV-001 | VM578-041 | PASS | Whole-board one-sided wipes combine `you don't control` and `your opponents control`; exception/save-one/tribal survivor wipes are separate lenses. |
| EV-002 | VM578-064 | PASS | `(t:elf or t:druid) t:creature o:/^{T}: Add/` is the strict direct-self-tap subset, not the universal mana-dork definition. |
| EV-003 | VM578-075 | PASS — Multi-Lens | Tagger ∩ Oracle floor is the high-confidence board-wipe core. Tagger-only and Oracle-only results remain visible alternate/review lanes with role labels. |
| EV-004 | VM578-076 | PASS | Mana dorks use direct self-production, alternative self-production, land-untap, and grantor/support roles. `produces:` is broad capability evidence, not proof of self-production. |
| EV-005 | VM578-083 | PASS | Group Slug separates repeatable-engine candidates, burst spells, and an `a player` action-tax supplement; repeatability is classified after retrieval. |
| EV-006 | VM578-037 | PASS — governed ranking limitation | `otag:card-advantage` is candidate retrieval. A/B/C/D/E provides mechanical truth; Archscry semantic ranking is separate and may rank strong D cards above weak literal A/B cards. |
| EV-007 | VM578-051/069 | PASS | `t:instant o:/counter target.*spell/` is the primary targeted-spell counter lens; Tagger/child taxonomy is secondary discovery. |

---

# EV-003 — Final Board-Wipe Rule

The differential audit confirmed that neither raw Tagger nor the Oracle floor can safely stand alone.

### Tagger-only sample

The sample contained legitimate alternate wipe/reset families:

- non-creature wipe;
- temporary resets/bounce;
- one-sided wipes;
- broad wipes;
- narrow/selective sweepers;

but also a real false positive.

### Oracle-only sample

The Oracle-only sample produced **5 false positives out of 10**:

- Day of the Dragons;
- Death Pit Offering;
- Emrakul, the World Anew;
- Hellcarver Demon;
- Kaervek's Spite.

The major shared failure family was caster-self wording such as:

> sacrifice/exile all creatures **you control**

This wording can superficially resemble a sweep but is often a cost, drawback, or self-board transformation rather than board-wipe behavior.

### Frozen behavior

**Multi-Lens**

1. **High-confidence core:** Tagger ∩ Oracle floor.
2. **Tagger-only alternate lane:** classify into broad wipe, selective sweeper, reset/bounce, one-sided, non-creature wipe, false positive, etc.
3. **Oracle-only review lane:** apply special guardrails for self-board destruction/sacrifice/exile.
4. Do not discard legitimate Tagger-only wipes simply because they fail the Oracle floor.

---

# EV-004 — Final Mana-Dork Rule

Eight named controls were compared against three lenses.

### `produces:g`

Returned 7 of 8 controls, including:

- Joiner Adept;
- Citanul Hierophants.

Those cards grant mana abilities to other permanents, proving:

> **`produces:` is a broad mana-production capability signal, not proof the queried creature itself is the mana source.**

### Strict `^{T}: Add`

Returned:

- Birds of Paradise;
- Llanowar Elves;
- Priest of Titania.

This is the strict simple self-tap subset.

### Forest untap

Returned:

- Arbor Elf.

### Frozen lens set

1. **Direct self-producers**
2. **Alternative self-producers** — e.g. extra activation cost / non-tap activation
3. **Land-untap accelerants**
4. **Ability grantors/support**

For plain **mana dork**, prioritize 1–3. Grantors may appear as related support, but should not silently inherit the same role label.

Selvala-style `{G}, {T}: Add...` abilities are a legitimate boundary case between the strict self-tap pattern and the alternative-activation lane.

---

# EV-005 — Final Group Slug Rule

Clean reruns established:

- permanent-shaped candidate pool: **507**
- instant/sorcery burst pool: **87**
- Earthquake: positive burst probe
- Price of Progress: positive burst probe
- Manabarbs: recovered by an `o:"a player"` wording supplement

The prior sampled cards also demonstrated that a permanent can contain group-damage/life-loss text while only generating a one-shot ETB/death event.

### Frozen architecture

1. **Repeatable-engine candidate lane**
2. **Burst spell lane**
3. **Action-tax wording supplement** for `"a player"` patterns such as Manabarbs
4. **Post-retrieval classifier**
   - repeatable;
   - conditional repeatable;
   - one-shot/self-event;
   - generic/poor fit.

Permanent card type is never sufficient evidence that an effect is repeatable.

---

# EV-006 — Final Grindy Draw Rule

Candidate retrieval:

`id<=b is:permanent otag:card-advantage`

Required top-25 plus 2 stress tests produced:

- A — autonomous repeatable draw: 5
- B — conditional repeatable draw: 7
- C — finite draw/value: 5
- D — non-draw card advantage/access: 7
- E — poor fit: 3
- U — unclear: 0

### Frozen architecture

**Stage 1 — mechanical classification**

- actual draw vs non-draw access;
- persistent vs finite;
- autonomous vs condition-dependent;
- meaningful card advantage vs poor fit.

**Stage 2 — semantic ranking**

Rank for the actual phrase and deck context.

A/B are direct literal evidence, but D is not equivalent to E. Cards such as Necropotence, Bolas's Citadel, or Mystic Forge may be strategically stronger recommendations for a grindy deck than weaker literal draw effects.

---

# Additional Frozen Process Rules

### Every named template example is checked independently

A claim such as:

> X, Y, and Z all use wording T

requires a separate exact-card/current-text check for **each named card**.

One verified example cannot establish the group template.

### Differential audits for competing lenses

When two search strategies plausibly represent the same player concept:

- inspect A ∩ B;
- sample A-only;
- sample B-only;
- run important exact-name probes.

Do not assume the larger, more semantic, or Tagger-based query is automatically the safer primary.

### Sanitize pasted Scryfall syntax

Before live execution, strip or warn on:

- Markdown backticks;
- fenced code blocks;
- other formatting characters accidentally copied with a query.

A malformed query may be silently reinterpreted by Scryfall rather than producing a loud syntax error.

### Search truth remains separate from recommendation quality

Scryfall determines candidate/search membership.

Archscry determines:

- semantic relevance;
- role fit;
- repeatability;
- adjacency;
- ranking;
- package balance;
- explanation.

---

# V3.2 Freeze Decision

**Evidence gate: CLOSED.**

The calibration model is now permitted to move to controlled propagation.

## Next step

Apply Calibration V3.2 to the remaining **1,038 lexicon rows** automatically and produce a **diff report** containing:

- old status → new status;
- old strategy/query → proposed strategy/query;
- rule(s) responsible;
- confidence change;
- unresolved/semantic cases retained;
- newly production-ready rows;
- rows downgraded because V3.2 found unsafe assumptions.

Do **not** overwrite the raw source corpus or historical owner evidence.

After owner review of the propagation diff:

1. freeze the Plain Reading semantic-state contract;
2. implement Plain Reading ⇄ Operator Hand from that shared state;
3. feed the same state into Archscry ranking and explanations.
