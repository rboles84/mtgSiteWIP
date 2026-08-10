# VM-551 Gate B1 Placement Engine — Owner Summary

Model: `vm551-gate-b1-placement-engine-v1`

**IN-MODEL ROBUSTNESS — NOT EMPIRICAL PLAYER ACCURACY**

## Direct answers

- **Can all 37 identities be reached responsibly?** No. 1 cannot enter a plausible candidate set.
- **Can all 37 become primary?** No. 13/37 can become a responsible named primary under the approved evidence.
- **Cannot become primary:** ABZAN, B, BANT, BR, G, GRIXIS, JESKAI, JUND, MARDU, NAYA, R, RG, SILVERQUILL, SULTAI, TEMUR, U, UB, UG, W, WB, WG, WITCH, WU, YORE.
- **Can every insufficient result go somewhere useful?** Some can; not all. Targeted question: 1862; useful revisit: 690; no approved discriminator: 674.
- **Is anything structurally blocking owner hands-on testing?** Yes — 24 identities lack approved evidence for a responsible primary, so all-37 placement readiness is blocked.

## Primary blockers

- **ABZAN:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **B:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **BANT:** The deterministic route did not reach sufficient independent approved naming evidence.
- **BR:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **G:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **GRIXIS:** The deterministic route did not reach sufficient independent approved naming evidence.
- **JESKAI:** The deterministic route did not reach sufficient independent approved naming evidence.
- **JUND:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **MARDU:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **NAYA:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **R:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **RG:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **SILVERQUILL:** The deterministic route did not reach sufficient independent approved naming evidence.
- **SULTAI:** The deterministic route did not reach sufficient independent approved naming evidence.
- **TEMUR:** The deterministic route did not reach sufficient independent approved naming evidence.
- **U:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **UB:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **UG:** The deterministic route did not reach sufficient independent approved naming evidence.
- **W:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **WB:** The deterministic route did not reach sufficient independent approved naming evidence.
- **WG:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **WITCH:** The deterministic route did not reach sufficient independent approved naming evidence.
- **WU:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **YORE:** Certified identity truth cannot be cleanly observed from Commander behavior; the lens is secondary and cannot name or flip a result.

## Hardest confusion areas

1. **INK / WG** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C13, C03, C10.
2. **JESKAI / WU** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C08, C16, C09.
3. **QUANDRIX / WITCH** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C06, C09, C14.
4. **DUNE / NAYA** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C07, C11.
5. **GRIXIS / JESKAI** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C01, C16.
6. **NAYA / RG** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C07, C10.
7. **UG / WITCH** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C06, C14.
8. **UR / YORE** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C06, C09.
9. **ABZAN / MARDU** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C13.
10. **ABZAN / SILVERQUILL** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C13.
11. **ABZAN / SULTAI** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C14.
12. **ABZAN / WITCH** — BOUNDED_NO_DIRECT_DISCRIMINATOR; shared constructs: C14.

## In-model robustness

| Identity | Top 1 | Top 2 | Top 3 | Responsible named primary | Insufficient | Common competitor |
|---|---:|---:|---:|---:|---:|---|
| ABZAN | 0.0% | 11.1% | 87.2% | 0.0% | 87.2% | BANT |
| B | 0.0% | 15.6% | 26.7% | 0.0% | 97.8% | JESKAI |
| BANT | 98.9% | 98.9% | 98.9% | 0.0% | 98.9% | BG |
| BG | 74.4% | 87.8% | 87.8% | 74.4% | 24.4% | BANT |
| BR | 13.3% | 88.9% | 88.9% | 0.0% | 100.0% | BANT |
| COLORLESS | 76.7% | 76.7% | 76.7% | 74.4% | 25.6% | B |
| DUNE | 76.7% | 76.7% | 76.7% | 74.4% | 25.6% | BR |
| ESPER | 87.8% | 87.8% | 87.8% | 0.0% | 98.9% | U |
| G | 0.0% | 50.6% | 52.8% | 0.0% | 75.6% | W |
| GLINT | 88.9% | 88.9% | 88.9% | 75.6% | 24.4% | R |
| GRIXIS | 85.6% | 86.7% | 88.9% | 0.0% | 100.0% | JESKAI |
| INK | 0.0% | 0.0% | 0.0% | 0.0% | 86.7% | BANT |
| JESKAI | 86.7% | 86.7% | 86.7% | 0.0% | 100.0% | GRIXIS |
| JUND | 0.0% | 0.0% | 0.0% | 0.0% | 34.4% | DUNE |
| LOREHOLD | 0.0% | 0.0% | 87.2% | 0.0% | 24.4% | WITHERBLOOM |
| MARDU | 0.0% | 0.0% | 0.0% | 0.0% | 35.6% | DUNE |
| NAYA | 0.0% | 0.0% | 74.4% | 0.0% | 25.6% | DUNE |
| PRISMARI | 74.4% | 87.8% | 87.8% | 74.4% | 24.4% | BR |
| QUANDRIX | 0.0% | 0.0% | 0.0% | 0.0% | 25.0% | DUNE |
| R | 85.6% | 88.9% | 88.9% | 0.0% | 100.0% | PRISMARI |
| RG | 0.0% | 0.0% | 0.0% | 0.0% | 35.6% | DUNE |
| SILVERQUILL | 0.0% | 0.0% | 0.0% | 0.0% | 25.6% | DUNE |
| SULTAI | 0.0% | 0.0% | 1.1% | 0.0% | 24.4% | DUNE |
| TEMUR | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | YORE |
| U | 86.7% | 86.7% | 86.7% | 0.0% | 100.0% | UB |
| UB | 86.7% | 86.7% | 86.7% | 0.0% | 97.8% | U |
| UG | 0.0% | 0.0% | 0.0% | 0.0% | 23.3% | WITHERBLOOM |
| UR | 75.6% | 75.6% | 75.6% | 75.6% | 23.3% | BR |
| W | 50.6% | 63.9% | 75.0% | 0.0% | 86.1% | G |
| WB | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | PRISMARI |
| WG | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | WITHERBLOOM |
| WITCH | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | PRISMARI |
| WITHERBLOOM | 2.2% | 2.2% | 2.2% | 2.2% | 24.4% | PRISMARI |
| WR | 87.2% | 87.2% | 87.2% | 73.9% | 26.1% | JUND |
| WU | 0.0% | 0.0% | 13.3% | 0.0% | 97.8% | UB |
| WUBRG | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | ESPER |
| YORE | 0.0% | 0.0% | 0.0% | 0.0% | 96.7% | GRIXIS |

These frequencies measure only synthetic agents generated from the model's own approved mappings. They are structural diagnostics, not real-player accuracy.

## Sensitivity

- 768 one-answer mutations tested.
- 468 changed the internal primary; 251 changed stopping/result behavior.
- Catastrophic weak/irrelevant-answer sensitivity flags: 0.

## Owner gate

Do not treat Gate B1 as all-37 placement-complete. The engine is deterministic and testable, but the approved evidence architecture still blocks responsible primary placement for the identities listed above.
