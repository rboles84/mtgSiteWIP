# Gate Phase Compression Framework

**Status:** Design exploration / research only — not yet implemented.
**Scope:** Restructure the adaptive placement **Gate** phase (the 4 fixed baseline questions) so that 4 low-friction questions with 4–5 options each can establish strong priors across the full faction roster, replacing the high-friction 17-option Gate I.
**Author note:** Drawn against the live engine in `assets/js/adaptive-placement.js` — the real `likelihood_to_delta` table, `broad_match_penalty`, softmax, and the dossier radar's 5 axes.

> **Roster calibration:** The live model carries **35** expression keys (5 mono + 10 guild + 5 college + 5 shard + 5 wedge + 5 four-color), not 32. The framework below is roster-size-agnostic — it works identically for 30, 32, or 35 — but the four-/five-color expressions need special handling (see §4), since those are exactly the ones naïve compression breaks.

---

## 1. The Compression Framework

### The bug in the 17-option Gate is conceptual, not cosmetic

A 17-option question is a **lookup table**: one row per faction, where the user is asked to *self-classify*. That is why it feels gameable — it shows people the answer key and asks them to point at their target. It also scales linearly with the roster (O(n) cognitive load) and collapses to a single axis of variation.

The fix is to stop encoding factions and start encoding **coordinates**. MTG's factions are already a *combinatorial color code* — every faction is a subset of WUBRG. You do not need a question per faction; you need a small set of questions that triangulate a position in color-space, then *read off* which faction occupies that region. This is how biological systems actually encode high-dimensional identity (combinatorial receptor codes), which is on-theme for "biological expression placement."

### The information-theoretic budget

- Fully resolving 32 hypotheses costs **log₂(32) = 5 bits**.
- One 5-option question yields up to **log₂(5) ≈ 2.32 bits**.
- Four such questions: **4 × 2.32 ≈ 9.3 bits**, and **5⁴ = 625 distinct response paths**.

There is an enormous surplus (9.3 bits available vs. 5 needed). That surplus buys *robustness* and *redundancy* against correlated answers — and it means the Gate does not even need to fully resolve. **The Gate's only job is to push the true faction into the top ~5 for Hall targeting.** Hall and Crucible spend the remaining bits. So 4×5 is not a compromise; it is over-provisioned.

| | 1 × 17 options | 4 × 5 options |
|---|---|---|
| Distinguishable states | 17 (4.09 bits) | 625 (9.29 bits) |
| Axes of variation | 1 | 4 (orthogonal) |
| Cognitive load | O(17) at once | O(5) per step |
| Gameable? | Yes — answer key is visible | No — no single answer reveals a faction |

The last row is the real prize. When no option names or implies a faction, the user can only answer *honestly about values*. The faction emerges from the **intersection** of four honest answers — the intuitive, "biological" response the redesign is after.

### The 5 axes to measure = the color pie = the radar

The dossier radar already names them: **Order, Knowledge, Ambition, Freedom, Growth**. That is a 1:1 map onto WUBRG:

> **Order = W · Knowledge = U · Ambition = B · Freedom = R · Growth = G**

Aligning the Gate to these axes also makes it consistent with the result visualization already shipped. The Gate's job restated: **estimate the user's vector on these 5 axes using 4 oblique questions.**

Why 4 questions suffice for 5 axes: a normalized color vector has only 4 degrees of freedom (the 5th is fixed by the others / recovered as the residual), and 4 forced-choices over 5 colors give 4×4 = 16 free parameters — massively overdetermined.

Each question measures a **tension**, not a color, chosen to be as orthogonal (decorrelated) as possible so each adds fresh bits:

| Gate | Axis / Tension | What it separates |
|---|---|---|
| **I — Locus of Trust** | Where agency originates (5-way anchor) | Primary color corner: W/U/B/R/G |
| **II — Attitude toward Constraint** | Order ↔ Freedom | W/U (embrace structure) vs. R/B (resist) vs. G (organic order) |
| **III — Source of Truth** | Reason ↔ Instinct ↔ Feeling ↔ Precedent ↔ Leverage | U vs. G vs. R vs. W vs. B epistemically (stops U and G looking identical) |
| **IV — The Stake** | Preserve ↔ Transform, Self ↔ Group | B (pay cost), R (spend), U (transform) vs. W/G (preserve/belong) |

Each color gets a **unique 4-coordinate fingerprint**, and every guild/shard/wedge falls out as a blend of its components.

---

## 2. Gate I — The "Trust" Question (rewritten to 5 options)

The five meta-strategies map cleanly to WUBRG (Collective Order = W, Rational Structure = U, Individual Power = B, Dynamic Motion = R, Primal Adaptation = G). Likelihoods are assigned to **colors, not factions**.

> **Gate I — "When the ground shifts, what do you trust first?"**

| Option | Signal | Color loadings (likelihood) |
|---|---|---|
| **A standard that holds when no one is watching** | collective order | `W .92, U .55, B .30, R .28, G .45` |
| **The model underneath, understood before you move** | rational structure | `U .92, W .55, B .50, R .35, G .45` |
| **The leverage only you are willing to pick up** | individual power | `B .92, U .55, R .55, W .30, G .40` |
| **The first honest move, made before the moment cools** | dynamic motion | `R .92, G .55, B .50, U .35, W .28` |
| **The older pattern the living world is already running** | primal adaptation | `G .92, R .55, U .50, W .45, B .35` |

**Design rule (replaces the 17-option table):** each option lights one color hot (~0.92) and its two color-pie neighbors warm (~0.55), while pushing its philosophical opposite below the 0.45 neutral line. Because likelihoods land on colors, the engine propagates them to *every faction containing that color simultaneously* (see §4). "Dynamic Motion" does not boost Mardu — it boosts R, and R-share flows into Rakdos, Gruul, Izzet, Prismari, Jund, Temur, Naya, Mardu, Jeskai *at once*, weighted by how much R each one carries. No combo is ever pinpointed; the combo is *discovered later*.

---

## 3. Gate II, III, IV

Same construction throughout: 4–5 options, each a holistic life-stance, each a color-loading vector. Opposites suppressed below 0.45.

### Gate II — "How do you stand toward limits?" *(Order ↔ Freedom)*

| Option | Signal | Loadings |
|---|---|---|
| **A limit is shelter — it protects what matters when goodwill runs out** | constraint as protection | `W .90, U .60, G .45, B .35, R .25` |
| **A limit is something to be outmaneuvered — the rules are terrain** | leverage within structure | `B .88, U .65, R .45, W .35, G .30` |
| **A limit is what you break to stay honest** | freedom through motion | `R .90, B .50, G .50, U .30, W .25` |
| **A limit should grow, not be imposed — let the living system learn** | systemic adaptation | `G .88, U .80, R .50, W .40, B .35` |

The fourth option (**"Systemic Adaptation"**) co-loads **G high + U high** — the Simic/Quandrix/Temur signature. It is the lever used in the §4 worked example.

### Gate III — "When the situation is genuinely hard, what do you read first?" *(Source of Truth)*

| Option | Signal | Loadings |
|---|---|---|
| **What was promised, and what still has to hold** | precedent & duty | `W .90, U .50, B .40, G .45, R .25` |
| **What the information actually says once you strip the noise** | analysis & model | `U .92, B .55, W .50, G .40, R .30` |
| **What works, and what it will cost to take it** | outcome & leverage | `B .90, R .55, U .55, W .30, G .40` |
| **What the moment is honestly telling you, before you talk yourself out of it** | feeling & immediacy | `R .92, B .50, G .55, W .30, U .25` |
| **The older signal underneath language — the body, the land, the pattern** | instinct & attunement | `G .92, R .55, U .45, W .45, B .35` |

### Gate IV — "What are you willing to pay, or become?" *(The Stake — Preserve↔Transform, Self↔Group)*

| Option | Signal | Loadings |
|---|---|---|
| **Protect what already works — don't trade away the shelter** | preservation | `W .85, G .70, U .45, B .35, R .30` |
| **Pay the price yourself, so your fate stays yours** | power at a cost | `B .92, R .55, U .50, W .30, G .35` |
| **Spend yourself in motion — burn honestly rather than calcify** | expressive ignition | `R .90, B .60, G .45, U .35, W .25` |
| **Refine it into something better than it was** | transformation | `U .88, G .65, B .50, W .45, R .35` |
| **Belong to something larger than yourself** | interdependence | `G .88, W .65, U .45, R .40, B .35` |

Across all four gates, each color carries a distinct path — e.g. **U** = (Rational Structure → Outmaneuver/Adapt → Analysis → Transform), **G** = (Primal Adaptation → Systemic growth → Instinct → Belong). A wedge like **Temur (GUR)** has *no single home option* in any gate but lights up wherever G, U, or R appear — which is exactly how it surfaces below.

---

## 4. The Backend Math Bridge

### The propagation rule (lets Gate options stay color-based)

Currently Gate answers assign likelihoods directly to faction keys. To run a 5-option color-based Gate against the faction hypotheses, add one build-time (or runtime) expansion. For each faction, convert color loadings to a per-faction delta using the **existing** `likelihood_to_delta` table, then sum across the faction's colors and apply the **existing** `broad_match_penalty` once per extra color:

```
faction_delta =  Σ  delta(option.loading[color])  −  broad_match_penalty × (n_colors − 1)
              color ∈ faction.colors
```

with unmentioned colors treated as 0.45 (neutral → delta 0), and `broad_match_penalty = 0.12`.

This does three things for free:

- **Multi-color factions accumulate evidence from every lit axis** — the reason a wedge can out-score a mono.
- **The penalty stops broad factions from auto-winning.** A 3-color faction must light *multiple* colors to overcome its `−0.24` handicap; a 5-color (WUBRG) faction carries `−0.48` and only surfaces if the user genuinely spreads across all axes — which is itself diagnostic of a five-color temperament.
- Lateral inhibition and pruning keep working unchanged.

### Worked example: "Dynamic Motion" + "Systemic Adaptation"

All 35 start at the equal log-prior (≈ −3.56). Tracking the R-relevant cluster.

**Gate I = "Dynamic Motion"** → `R .92 (+1.45), G .55 (+0.28), B .50 (+0.12), U .35 (−0.45), W .28 (−0.55)`

| Faction | Colors | Δ computation | Δ₁ |
|---|---|---|---|
| Mono R | R | +1.45 | **+1.45** |
| Gruul RG | R,G | 1.45 + 0.28 − 0.12 | **+1.61** |
| Temur GUR | G,U,R | 0.28 + (−0.45) + 1.45 − 0.24 | **+1.04** |
| Izzet / Prismari UR | U,R | −0.45 + 1.45 − 0.12 | +0.88 |
| Quandrix / Simic UG | U,G | −0.45 + 0.28 − 0.12 | −0.29 |

**Gate II = "Systemic Adaptation"** → `G .88 (+1.0), U .80 (+0.75), R .50 (+0.12), W .40 (−0.45), B .35 (−0.45)`

| Faction | Δ computation | Δ₂ | **Running total** |
|---|---|---|---|
| Temur GUR | 1.0 + 0.75 + 0.12 − 0.24 | **+1.63** | **+2.67** |
| Quandrix / Simic UG | 1.0 + 0.75 − 0.12 | **+1.63** | +1.34 |
| Gruul RG | 1.0 + 0.12 − 0.12 | +1.00 | **+2.61** |
| Izzet / Prismari UR | 0.75 + 0.12 − 0.12 | +0.75 | +1.63 |
| Mono R | 0.12 | +0.12 | +1.57 |

**Post-Gate ranking (R-cluster), into Hall:**

1. **Temur (GUR) — +2.67** ← the *unexpected leader*, a wedge
2. Gruul (RG) — +2.61
3. Izzet / **Prismari (UR)** — +1.63 ← a Strixhaven school surfaces
4. Mono R — +1.57
5. Quandrix / Simic (UG) — +1.34

The user never saw the word "Temur" or named a third color. They said *"I trust the first honest move"* and *"limits should grow, let the system learn."* The **intersection of R (Freedom) with G+U (Growth+Knowledge)** is the precise coordinate of Temur — primal motion that adapts through attunement — so it floats to the top, ahead of mono-R, with Prismari and Gruul as live runners-up. After softmax these become the top-5 probabilities; Hall then fires `hall_TEMUR_*`, `hall_RG_wild`, and `hall_UR_experiment` at exactly these leaders, and a Crucible (e.g. a Temur-vs-Gruul pair, or `BR/RG`) resolves the final gap.

That is the whole thesis in one trace: **four honest, low-friction answers → a 5-bit coordinate → an emergent multi-color leader the user could never have gamed toward.** The compression does not lose the wedges and schools; it is the *only* way to surface them intuitively, because they live in the intersections that a one-option-per-faction table cannot represent.

---

## Open follow-ups

- **(a) — DONE.** See Appendix A.
- **(b) — DONE.** See Appendix B. Result: **35/35 reachable in top-5** at the right propagation setting.
- **(c)** Calibrate the four-/five-color `broad_match_penalty` so YORE / GLINT / DUNE / INK / WITCH stay reachable but never over-trigger. **Appendix B pre-answers the headline: the penalty must NOT live in the Gate.**

---

## Appendix A — Balanced color-loading matrix & axis-orthogonality audit

> Computed numerically (`/tmp/gate_*.mjs`, throwaway), not eyeballed. Color order W·U·B·R·G throughout.

### A.0 — Key finding: the §2–3 draft gates were NOT orthogonal

Running PCA on each draft gate's option set and taking the dominant measurement direction (PC1), the four draft gates correlate as:

| \|cos(PC1)\| | G I | G II | G III | G IV |
|---|---|---|---|---|
| **G I** | 1.00 | **0.98** | **0.91** | 0.82 |
| **G II** | 0.98 | 1.00 | 0.88 | 0.89 |
| **G III** | 0.91 | 0.88 | 1.00 | 0.57 |
| **G IV** | 0.82 | 0.89 | 0.57 | 1.00 |

Gates I, II, III all collapse onto the **same** dominant contrast — Order (W,U) ↔ Freedom (R,B). **Root cause:** every draft option was built as "native color hot + its two color-wheel neighbors warm," so each gate reproduces the WUBRG wheel's principal contrast. Diagonal dominance still passed (each mono color self-identifies), but Gates II and III deliver little *marginal* information. This is the redundancy the orthogonality check exists to catch.

### A.1 — The fix: derive gates from an orthonormal color basis

A 5-point color simplex has **4 intrinsic dimensions.** Maximum information per question = align each gate to a *different* one. Four semantically-seeded, mean-zero contrasts, then Gram-Schmidt:

| Gate | Latent axis | Color direction (W·U·B·R·G) |
|---|---|---|
| **I — Locus of Trust** | Self ↔ Communal | `−0.50 −0.10 +0.55 +0.45 −0.50` |
| **II — Constraint** | Order ↔ Freedom | `+0.27 +0.70 −0.21 −0.32 −0.54` |
| **III — Source of Truth** | Head ↔ Heart | `−0.02 +0.01 +0.72 −0.69 +0.02` |
| **IV — The Stake** | Preserve ↔ Change | `+0.89 −0.38 +0.08 +0.22 +0.06` |

A **controlled-oblique** rotation (≈85% Gram-Schmidt, not full) was used deliberately — pure orthogonality starved the hardest color pairs of redundant support. Resulting axis correlations:

| \|cos(PC1)\| | G I | G II | G III | G IV |
|---|---|---|---|---|
| **G I** | 1.00 | 0.21 | 0.05 | 0.21 |
| **G II** | 0.21 | 1.00 | 0.07 | 0.26 |
| **G III** | 0.05 | 0.07 | 1.00 | 0.16 |
| **G IV** | 0.21 | 0.26 | 0.16 | 1.00 |

Off-diagonals **0.05–0.26** (healthy mild obliqueness) vs the draft's **0.57–0.98**. Each gate now carries near-independent information.

### A.2 — The balanced self-loading matrix (5 colors × 4 gates)

Each cell = how strongly a color is identified by its native option in that gate:

| color | Gate I | Gate II | Gate III | Gate IV |
|---|---|---|---|---|
| **W** | 0.95 | 0.76 | 0.55 | 0.95 |
| **U** | 0.63 | 0.95 | 0.55 | 0.85 |
| **B** | 0.95 | 0.72 | 0.95 | 0.61 |
| **R** | 0.91 | 0.81 | 0.95 | 0.73 |
| **G** | 0.95 | 0.95 | 0.55 | 0.60 |

The **neutral cells are intentional signal, not gaps**: U sits at 0.63 on Self↔Communal (blue is genuinely detached from the self/group question), and W/G sit at 0.55 on Head↔Heart (neither is head- nor heart-extreme). A color's *ambivalence* on an axis is itself diagnostic.

### A.3 — Full corrected loading vectors

**Gate I — Self ↔ Communal** (Locus of Trust)

| pole *t* | W | U | B | R | G |
|---|---|---|---|---|---|
| +1 (radical self) | .15 | .47 | .95 | .91 | .15 |
| +0.5 | .35 | .51 | .77 | .73 | .35 |
| 0 | .55 | .55 | .55 | .55 | .55 |
| −0.5 | .75 | .59 | .33 | .37 | .75 |
| −1 (full communal) | .95 | .63 | .11 | .19 | .95 |

**Gate II — Order ↔ Freedom** (Constraint)

| pole *t* | W | U | B | R | G |
|---|---|---|---|---|---|
| +1 (pure order) | .76 | .95 | .38 | .29 | .12 |
| +0.34 | .62 | .74 | .49 | .46 | .40 |
| −0.34 | .48 | .36 | .61 | .64 | .70 |
| −1 (pure freedom) | .34 | .05 | .72 | .81 | .95 |

**Gate III — Head ↔ Heart** (Source of Truth)

| pole *t* | W | U | B | R | G |
|---|---|---|---|---|---|
| +1 (cold calculation) | .54 | .56 | .95 | .05 | .57 |
| +0.5 | .54 | .55 | .84 | .27 | .56 |
| 0 | .55 | .55 | .55 | .55 | .55 |
| −0.5 | .56 | .55 | .26 | .83 | .54 |
| −1 (raw feeling) | .56 | .54 | .05 | .95 | .53 |

**Gate IV — Preserve ↔ Change** (The Stake)

| pole *t* | W | U | B | R | G |
|---|---|---|---|---|---|
| +1 (preserve) | .95 | .25 | .61 | .73 | .60 |
| +0.34 | .79 | .45 | .57 | .61 | .57 |
| −0.34 | .31 | .65 | .53 | .49 | .53 |
| −1 (transform) | .05 | .85 | .49 | .37 | .50 |

### A.4 — Separability & the one structural caveat (B/R)

Mean-centered fingerprint cosine (how the softmax actually "sees" the colors; negative = well-separated):

| | W | U | B | R | G |
|---|---|---|---|---|---|
| **W** | — | 0.08 | −0.53 | −0.52 | **+0.51** |
| **U** | | — | −0.32 | −0.32 | −0.69 |
| **B** | | | — | **+0.31** | −0.29 |
| **R** | | | | — | −0.29 |
| **G** | | | | | — |

Eight of ten pairs are negatively correlated (cleanly separated). The two residual positive pairs are the color-pie allies the Gate intentionally keeps *adjacent*: **W/G (+0.51)** and **B/R (+0.31)**.

**Robustness — how many gates redundantly separate each pair (want ≥ 2):**

| pair | # gates | which | pair | # gates | which |
|---|---|---|---|---|---|
| W/U | 3 | I, II, IV | U/G | 3 | I, II, IV |
| W/B | 3 | I, III, IV | **B/R** | **1** | **III only ⚠** |
| W/R | 4 | all | B/G | 3 | I, II, III |
| W/G | 2 | II, IV | R/G | 3 | I, II, III |
| U/B | 4 | all | U/R | 4 | all |

**The structural caveat:** Black and Red are MTG's hardest pair to separate on broad value axes — both are *Self* (Gate I), both *Freedom* (Gate II), both *Change*-leaning (Gate IV). Their only genuine divergence is **Head↔Heart** (Gate III: B = cold ends/calculation, R = hot authenticity/impulse). Forcing a second separating gate would re-introduce correlation and defeat the orthogonality we just won. The correct design move is **not** to overload the Gate — it is to let the Gate place *both* B and R in the top-5 (diagonal dominance PASS confirms it does) and **hand the B/R tiebreak to the Crucible**, which already exists for exactly this "two lookalikes" job (cf. the live `BR/RG`-style crucible pairs and lateral-inhibition collision logic). Gate sets priors; Crucible resolves lookalikes — the split lands where the architecture intends.

### A.5 — Verdict

- **Axis orthogonality:** PASS (controlled-oblique 0.05–0.26).
- **Diagonal dominance** (every mono color peaks at itself through the Gate): PASS.
- **Pairwise separability:** 9/10 pairs separated on ≥ 2 gates; **B/R** intentionally deferred to Crucible.
- **Design law that fell out of this:** build gate options from an *orthonormal color basis*, never from "native color + color-wheel neighbors" — the latter silently re-measures the same Order↔Freedom contrast every time.

---

## Appendix B — 35-faction golden-path coverage simulation

> Goal: confirm the corrected orthogonal Gate (Appendix A.3) + color propagation seats **every** one of the 35 live factions in the **top-5** before Hall — the precondition for `findHallQuestion` (which targets `ranked.slice(0,5)`) to finish the placement. This validates the **Gate phase only**, not the full Gate→Hall→Crucible path. Real engine `likelihood_to_delta` table used throughout.

### B.0 — Method

For each faction *F*, run a golden path: in each gate, *F* picks the option that maximizes its own accumulated color-evidence (the generous "ideal honest respondent"). All 35 factions are then scored against those same four chosen options and ranked (alphabetical tiebreak, matching the engine). *F* passes if it lands in the top-5.

Three propagation rules were swept (how a faction converts color loadings to a score, *n* = its color count):

- **sum:** `Σ δ(color) − bmp·(n−1)`
- **avg:** `Σ δ(color) / n`
- **sqrt:** `Σ δ(color) / √n − bmp·(n−1)` (cosine-style; faction color identity as a unit vector)

### B.1 — Coverage sweep

| mode | bmp | top-1 | top-3 | top-5 | misses (>5) |
|---|---|---|---|---|---|
| **sqrt** | **0** | 14/35 | 33/35 | **35/35 ✓** | — |
| sqrt | 0.12 | 14 | 24 | 29 | TEMUR, JESKAI, YORE, GLINT, INK, WITCH |
| sqrt | 0.25 | 7 | 19 | 22 | most shards/wedges/4-colors |
| sum | 0 | 13 | 27 | 33 | W, G |
| sum | 0.12 | 14 | 30 | 34 | W |
| avg | any | 5 | 20 | 28 | every multi-color ≥3 |

**`avg` is disqualified** — it lets monos dominate (only 5/35 win their own path) and buries every 3+ color faction. **`sum` pushes monos out** (W/G fall below their own color-blends). **`sqrt` at `bmp=0` is the unique clean pass: 35/35.**

### B.2 — Detail at the recommended setting (`sqrt`, Gate `bmp = 0`)

- **Worst rank across all 35 golden paths = 5.** Everyone is reachable by Hall.
- **No four-color ever steals another faction's rank-1.** Breadth does not run away — even at zero penalty.
- **rank-1 winners by tier:** guild 11 · shard 8 · color 6 · college 6 · wedge 3 · four-color 1. No tier dominates.

The axis-incoherent factions (those whose colors straddle *opposite* poles of a gate, so they cannot light all colors at once) — these are the stress cases, and all clear:

| faction | colors | rank | top-5 neighborhood |
|---|---|---|---|
| DUNE | BRGW | 1 | DUNE, JUND, NAYA, RG, ABZAN |
| YORE | WUBR | 2 | MARDU, **YORE**, DUNE, LOREHOLD, WR |
| JESKAI | URW | 3 | W, WU, **JESKAI**, BANT, INK |
| GLINT | UBRG | 3 | BR, JUND, **GLINT**, GRIXIS, DUNE |
| INK | RGWU | 3 | NAYA, WG, **INK**, BANT, W |
| TEMUR | GUR | 5 | BANT, INK, QUANDRIX, UG, **TEMUR** |
| WITCH | GWUB | 5 | WG, BANT, W, ABZAN, **WITCH** |

Note the *shape* of these neighborhoods: when a 3-color faction answers optimally, its 2-color subsets and color-siblings crowd in around it — the Gate establishes a **color neighborhood**, and Hall's faction-specific questions (self-likelihood 0.95) then lift the exact faction to #1 from within it. That is the intended division of labor, working as designed.

### B.3 — The decisive calibration finding (this answers (c)'s headline)

**The four-/five-color `broad_match_penalty` must NOT live in the Gate.** Every increment of Gate-level `bmp` above ~0.05 ejects the axis-incoherent multi-colors (Temur, Jeskai, and all four 4-colors) from the top-5, breaking their reachability. And it is unnecessary there, because:

> **With orthogonal gates, breadth is already self-limiting.** A 4-color faction physically cannot max all its colors — its colors sit on opposing poles of at least one axis, forcing a compromise that caps its score. That is *why* no four-color steals a rank-1 even at `bmp = 0`. The geometry does the penalty's job for free.

Therefore broad-match suppression belongs in **Hall/Crucible** (where it already lives via lateral inhibition and collision pruning), not in the priors. The Gate should run at `bmp ≈ 0`.

### B.4 — Verdict & residual risk

- **PASS:** 35/35 factions reachable in the Gate top-5 under `sqrt` propagation, `bmp = 0`.
- **No runaway breadth:** four-color rank-1 thefts = 0.
- **Watch list (rank-5, thinnest Gate margin):** **TEMUR** and **WITCH**. They depend most on near-optimal answers plus a strong Hall follow-up; they are the first to fall out of top-5 under any noise or penalty. If real user data shows either dropping, the fix is a sharper *Hall* question, not a Gate change.
- **Scope caveat:** this validates the Gate as a *prior-setter* (seats the faction for Hall). Full Gate→Hall→Crucible golden-path equivalence with the live `quick-reading-tests.js` assertions is a separate simulation, since it requires porting Hall/Crucible to the color-propagation model.
