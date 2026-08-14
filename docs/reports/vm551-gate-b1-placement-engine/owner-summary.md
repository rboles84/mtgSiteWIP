# VM-551 Gate B1 Placement Engine — Owner Summary

Model: `vm551-gate-b1-placement-engine-v1`

**IN-MODEL ROBUSTNESS — NOT EMPIRICAL PLAYER ACCURACY**

## Direct answers

- **Can all 37 identities enter the internal candidate frontier?** Yes.
- **Can all 37 identities be named as responsible public candidates?** No. 36/37 have a qualified public path.
- **Can all 37 become primary?** No. 36/37 can become a responsible named primary under the approved evidence.
- **Cannot become primary:** YORE.
- **Can every insufficient result go somewhere useful?** Yes, every generated unique insufficient state has an explicit recovery disposition. Targeted question: 1767; useful revisit: 0; no approved discriminator: 0.
- **Is anything structurally blocking owner hands-on testing?** No. The 36 behaviorally observable identities meet the target; Yore remains intentionally bounded.

## Primary blockers

- **YORE:** Certified identity truth cannot be cleanly observed from Commander behavior; the lens is secondary and cannot name or flip a result.

## Hardest confusion areas

1. **ESPER / JESKAI** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C16, C08, C09.
2. **INK / WG** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C13, C03, C10.
3. **JESKAI / U** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C08, C01, C16.
4. **JESKAI / WU** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C08, C16, C09.
5. **QUANDRIX / WITCH** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C06, C09, C14.
6. **B / ESPER** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C16, C09.
7. **B / GLINT** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C11, C09.
8. **B / UB** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C11, C16.
9. **B / YORE** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C12, C09.
10. **BG / WITHERBLOOM** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C12, C06.
11. **COLORLESS / WUBRG** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C15, C10.
12. **DUNE / NAYA** — ROUTABLE_APPROVED_DISCRIMINATOR; shared constructs: C07, C11.

## In-model robustness

| Identity | Top 1 | Top 2 | Top 3 | Responsible named primary | Insufficient | Common competitor |
|---|---:|---:|---:|---:|---:|---|
| ABZAN | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | G |
| B | 0.0% | 0.0% | 0.0% | 33.3% | 66.7% | W |
| BANT | 1.1% | 77.8% | 100.0% | 0.0% | 0.0% | WG |
| BG | 0.0% | 0.0% | 0.0% | 0.0% | 12.2% | NAYA |
| BR | 87.8% | 87.8% | 87.8% | 87.8% | 12.2% | PRISMARI |
| COLORLESS | 11.1% | 11.1% | 11.1% | 0.0% | 77.8% | W |
| DUNE | 0.0% | 100.0% | 100.0% | 0.0% | 0.0% | MARDU |
| ESPER | 0.0% | 0.0% | 22.2% | 0.0% | 0.0% | W |
| G | 0.0% | 75.6% | 88.9% | 53.3% | 24.4% | RG |
| GLINT | 0.0% | 0.0% | 0.0% | 0.0% | 11.1% | MARDU |
| GRIXIS | 0.0% | 0.0% | 0.0% | 0.0% | 11.1% | JUND |
| INK | 0.0% | 100.0% | 100.0% | 65.0% | 35.0% | ABZAN |
| JESKAI | 0.0% | 77.8% | 88.9% | 0.0% | 100.0% | WITHERBLOOM |
| JUND | 88.9% | 88.9% | 88.9% | 0.0% | 11.1% | RG |
| LOREHOLD | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | NAYA |
| MARDU | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | DUNE |
| NAYA | 0.0% | 0.0% | 0.0% | 0.0% | 88.9% | W |
| PRISMARI | 0.0% | 87.8% | 87.8% | 0.0% | 12.2% | BR |
| QUANDRIX | 0.0% | 0.0% | 0.0% | 0.0% | 88.9% | W |
| R | 87.8% | 87.8% | 88.9% | 0.0% | 11.1% | JUND |
| RG | 22.2% | 88.9% | 88.9% | 0.0% | 11.1% | G |
| SILVERQUILL | 100.0% | 100.0% | 100.0% | 75.6% | 24.4% | GLINT |
| SULTAI | 0.0% | 0.0% | 0.0% | 0.0% | 77.8% | W |
| TEMUR | 0.0% | 0.0% | 0.0% | 0.0% | 11.1% | JUND |
| U | 0.0% | 0.0% | 11.1% | 11.1% | 66.7% | NAYA |
| UB | 0.0% | 75.6% | 100.0% | 34.4% | 12.2% | GLINT |
| UG | 75.6% | 86.7% | 86.7% | 63.3% | 36.7% | ABZAN |
| UR | 88.9% | 88.9% | 88.9% | 53.3% | 46.7% | TEMUR |
| W | 35.6% | 98.3% | 98.3% | 0.0% | 1.7% | WU |
| WB | 0.0% | 76.7% | 87.8% | 52.2% | 24.4% | ABZAN |
| WG | 76.1% | 98.3% | 100.0% | 77.8% | 0.0% | BANT |
| WITCH | 0.0% | 11.1% | 87.8% | 11.1% | 24.4% | UG |
| WITHERBLOOM | 0.0% | 0.0% | 0.0% | 0.0% | 12.2% | ABZAN |
| WR | 0.0% | 87.2% | 100.0% | 0.0% | 0.0% | MARDU |
| WU | 0.0% | 11.1% | 22.2% | 11.1% | 0.0% | NAYA |
| WUBRG | 0.0% | 0.0% | 11.1% | 0.0% | 0.0% | NAYA |
| YORE | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | NAYA |

These frequencies measure only synthetic agents generated from the model's own approved mappings. They are structural diagnostics, not real-player accuracy.

## Sensitivity

- 881 one-answer mutations tested.
- 644 changed the internal primary; 705 changed stopping/result behavior.
- Catastrophic weak/irrelevant-answer sensitivity flags: 0.

## Owner gate

The preferred instrument-completion target is met: 36 behaviorally observable identities have responsible primary paths, Yore remains honestly bounded, and synthetic results remain non-empirical.
