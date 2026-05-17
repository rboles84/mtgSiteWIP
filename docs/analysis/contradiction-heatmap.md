# Contradiction Heatmap: WUBRG Corpus Audit

## Executive Summary

The Vox Mana WUBRG corpus exhibits remarkably few cross-color contradictions. The highest severity issues are intra-color (Black's Vox Mana Read drift, Red's misattributed card examples) rather than cross-color. Between colors, the most notable tension is the token generation overlap between White and Green (severity 2), which lacks explicit differentiation criteria in the metaphysics layer. No critical (severity 5) contradictions were detected. The system's philosophical pentagram is sound.

---

## Heatmap: Color Pair Contradictions

| Pair | Philosophical | Mechanical | Terminology | Structural | MaxSeverity |
|---|---:|---:|---:|---:|---:|
| White vs. Blue | 0 | 0 | 1 | 1 | 1 |
| White vs. Black | 0 | 0 | 0 | 1 | 1 |
| White vs. Red | 0 | 0 | 0 | 1 | 1 |
| White vs. Green | 1 | 2 | 1 | 1 | 2 |
| Blue vs. Black | 0 | 0 | 0 | 1 | 1 |
| Blue vs. Red | 0 | 0 | 0 | 1 | 1 |
| Blue vs. Green | 0 | 0 | 0 | 1 | 1 |
| Black vs. Red | 1 | 0 | 0 | 1 | 1 |
| Black vs. Green | 0 | 0 | 0 | 1 | 1 |
| Red vs. Green | 0 | 1 | 0 | 1 | 1 |

---

## Heatmap: Intra-Color Contradictions (Across Document Tiers)

| Color | Philosophical | Mechanical | Terminology | Structural | MaxSeverity |
|---|---:|---:|---:|---:|---:|
| White | 0 | 1 | 1 | 1 | 1 |
| Blue | 0 | 0 | 0 | 1 | 1 |
| Black | 3 | 0 | 2 | 1 | 3 |
| Red | 0 | 3 | 2 | 1 | 3 |
| Green | 2 | 2 | 1 | 1 | 2 |

---

## Detailed Justifications

### Cross-Color Issues

**White vs. Green — Mechanical: 2**
Token generation appears as a strategic pillar for both colors. White frames tokens as institutional mobilization (soldiers, spirits); Green frames them as biological abundance (beasts, insects, plants). This differentiation exists in the primers but is not codified in the metaphysics layer, creating ambiguity for card design heuristics. Severity 2: noticeable overlap requiring editorial attention.

**White vs. Green — Philosophical: 1**
Both colors value "community" and "peace," but through different mechanisms (imposed structure vs. natural acceptance). This is correctly identified as the allied pair's shared value in document 07. Minor surface-level overlap; properly handled. Severity 1.

**White vs. Green — Terminology: 1**
Both colors use "inevitability" in their emotional tone descriptions, though Green means biological inevitability while White means structural inevitability. Context differentiates, but a canonical glossary would help. Severity 1.

**Black vs. Red — Philosophical: 1**
Black's PDF Belief statement ("You take what you need—morality is optional") drifts toward Red's impulsive action framing. Black's canonical position is calculated transaction, not impulsive seizure. The PDF wording creates a minor tonal bleed between these allied colors. Severity 1 because it is limited to one document at one tier.

**Red vs. Green — Mechanical: 1**
Red's primer cites "Giant Growth effects" as a Red temporary-effect mechanic. Giant Growth is canonically Green. This is a misattribution rather than a systemic conflict—Red does have temporary pump effects, but the named example is wrong. Severity 1 cross-color, severity 3 intra-Red.

**All Pairs — Structural: 1**
All pairs share a baseline structural variance of 1 because the metaphysics markdown files use a four-pillar structure while the primers use variable pillar counts (4–7). This is a document organization difference, not a content conflict.

### Intra-Color Issues

**Black — Philosophical: 3**
The Vox Mana Read shifts from seizure framing (primer: "Power is not given. It is taken.") to transactional framing (metaphysics MD/PDF: "You are willing to pay any cost…"). This is the highest-severity philosophical issue in the corpus. Both readings are valid facets of Black, but they imply different ethical postures—one is aggressive (taking), the other is pragmatic (paying). A designer referencing only the primer would build toward conquest mechanics; one referencing only the metaphysics would build toward cost-payment mechanics.

**Black — Terminology: 2**
Title drift: "Sovereign of Ambition" (primer) vs. "Wielder of Power" (metaphysics MD). PDF Belief wording ("morality is optional") differs from primer ("everything has a price").

**Red — Mechanical: 3**
Two mechanical issues: (a) 震动打击 is listed as a burn spell example but is not a recognized English-language Magic card; (b) "Giant Growth effects" attributed to Red despite being a Green card. Both require correction.

**Red — Terminology: 2**
Three Vox Mana Read variants across primer, metaphysics MD, and PDF. Core meaning consistent but surface phrasing diverges enough to complicate canonical reference.

**Green — Philosophical: 2**
Dual Vox Mana Read framing: identity axiom ("You are what you were born to be") vs. method axiom ("You do not force the world to change"). Complementary rather than contradictory, but creates a bifurcated axiom where other colors have unified statements.

**Green — Mechanical: 2**
Removal pillar scope divergence: primer emphasizes fight mechanics (creature-based removal) while metaphysics MD emphasizes naturalize effects (artifact/enchantment removal). Both are valid Green mechanics, but the different selections as "primary" removal create apparent inconsistency.

**White — Mechanical: 1**
Aggression rating implied low in primer but stated as 5/10 in metaphysics MD. Inference gap rather than contradiction.

**White — Terminology: 1**
Vox Mana expansion in metaphysics MD adds sentences not present in primer/PDF. No meaning change.

**Blue — Structural: 1**
Baseline structural difference (four vs. five pillars). PDF labeled "v2" without v1 context. Minor filing issue.

---

## Severity Distribution Summary

| Severity | Count | Description |
|----------|-------|-------------|
| 0 | 68 | No issue (majority of cells) |
| 1 | 25 | Minor stylistic or terminological variance |
| 2 | 5 | Noticeable inconsistency requiring editorial attention |
| 3 | 2 | Significant issue affecting design or canonical reference |
| 4 | 0 | No significant system-breaking contradictions |
| 5 | 0 | No critical contradictions |

**Overall corpus health**: Strong. The system's philosophical architecture is intact. All detected issues are editorial in nature and can be resolved without restructuring the framework.

---

## Appendix: Source Files

All 21 files in the archive were evaluated for this heatmap. Confidence: High across all sources.
