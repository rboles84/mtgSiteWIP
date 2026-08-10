# VM-551 Gate B1 Placement Engine — Owner Summary

Model: `vm551-gate-b1-placement-engine-v1`

**IN-MODEL ROBUSTNESS — NOT EMPIRICAL PLAYER ACCURACY**

## Direct answers

- **Can all 37 identities enter the internal candidate frontier?** No. 1 cannot enter a plausible candidate set.
- **Can all 37 identities be named as responsible public candidates?** No. 3/37 have a qualified public path.
- **Can all 37 become primary?** No. 3/37 can become a responsible named primary under the approved evidence.
- **Cannot become primary:** ABZAN, B, BANT, BG, BR, COLORLESS, DUNE, G, GLINT, INK, JUND, LOREHOLD, MARDU, NAYA, PRISMARI, QUANDRIX, R, RG, SILVERQUILL, SULTAI, TEMUR, U, UB, UG, UR, W, WB, WG, WITCH, WITHERBLOOM, WR, WU, WUBRG, YORE.
- **Can every insufficient result go somewhere useful?** Some can; not all. Targeted question: 3282; useful revisit: 321; no approved discriminator: 329.
- **Is anything structurally blocking owner hands-on testing?** Yes — 34 identities lack approved evidence for a responsible primary, so all-37 placement readiness is blocked.

## Primary blockers

- **ABZAN:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **B:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **BANT:** The deterministic route did not reach sufficient independent approved naming evidence.
- **BG:** The deterministic route did not reach sufficient independent approved naming evidence.
- **BR:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **COLORLESS:** The deterministic route did not reach sufficient independent approved naming evidence.
- **DUNE:** The deterministic route did not reach sufficient independent approved naming evidence.
- **G:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **GLINT:** The deterministic route did not reach sufficient independent approved naming evidence.
- **INK:** The deterministic route did not reach sufficient independent approved naming evidence.
- **JUND:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **LOREHOLD:** The deterministic route did not reach sufficient independent approved naming evidence.
- **MARDU:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **NAYA:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **PRISMARI:** The deterministic route did not reach sufficient independent approved naming evidence.
- **QUANDRIX:** The deterministic route did not reach sufficient independent approved naming evidence.
- **R:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **RG:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **SILVERQUILL:** The deterministic route did not reach sufficient independent approved naming evidence.
- **SULTAI:** The deterministic route did not reach sufficient independent approved naming evidence.
- **TEMUR:** The deterministic route did not reach sufficient independent approved naming evidence.
- **U:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **UB:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **UG:** The deterministic route did not reach sufficient independent approved naming evidence.
- **UR:** The deterministic route did not reach sufficient independent approved naming evidence.
- **W:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **WB:** The deterministic route did not reach sufficient independent approved naming evidence.
- **WG:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **WITCH:** The deterministic route did not reach sufficient independent approved naming evidence.
- **WITHERBLOOM:** The deterministic route did not reach sufficient independent approved naming evidence.
- **WR:** The deterministic route did not reach sufficient independent approved naming evidence.
- **WU:** Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator.
- **WUBRG:** The deterministic route did not reach sufficient independent approved naming evidence.
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
| ABZAN | 0.0% | 73.9% | 87.2% | 0.0% | 100.0% | BG |
| B | 86.7% | 88.9% | 100.0% | 0.0% | 13.3% | GRIXIS |
| BANT | 98.9% | 98.9% | 98.9% | 0.0% | 100.0% | BG |
| BG | 74.4% | 87.8% | 87.8% | 0.0% | 100.0% | ABZAN |
| BR | 13.3% | 88.9% | 88.9% | 0.0% | 100.0% | BANT |
| COLORLESS | 76.7% | 76.7% | 76.7% | 0.0% | 100.0% | B |
| DUNE | 76.7% | 76.7% | 76.7% | 0.0% | 100.0% | BR |
| ESPER | 87.8% | 87.8% | 87.8% | 74.4% | 25.6% | U |
| G | 0.0% | 0.0% | 2.2% | 0.0% | 100.0% | W |
| GLINT | 88.9% | 88.9% | 88.9% | 0.0% | 100.0% | R |
| GRIXIS | 86.7% | 86.7% | 88.9% | 72.2% | 26.7% | JESKAI |
| INK | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | BG |
| JESKAI | 86.7% | 86.7% | 86.7% | 86.7% | 13.3% | GRIXIS |
| JUND | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | DUNE |
| LOREHOLD | 0.0% | 22.2% | 87.2% | 0.0% | 100.0% | WITHERBLOOM |
| MARDU | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | DUNE |
| NAYA | 0.0% | 0.0% | 74.4% | 0.0% | 100.0% | DUNE |
| PRISMARI | 74.4% | 87.8% | 87.8% | 0.0% | 100.0% | BR |
| QUANDRIX | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | DUNE |
| R | 85.6% | 88.9% | 88.9% | 0.0% | 100.0% | PRISMARI |
| RG | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | DUNE |
| SILVERQUILL | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | DUNE |
| SULTAI | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | DUNE |
| TEMUR | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | YORE |
| U | 86.7% | 86.7% | 86.7% | 0.0% | 100.0% | UB |
| UB | 86.7% | 86.7% | 86.7% | 0.0% | 100.0% | U |
| UG | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | BG |
| UR | 75.6% | 75.6% | 75.6% | 0.0% | 100.0% | BR |
| W | 50.6% | 75.0% | 75.0% | 0.0% | 100.0% | ABZAN |
| WB | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | PRISMARI |
| WG | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | BG |
| WITCH | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | PRISMARI |
| WITHERBLOOM | 2.2% | 2.2% | 2.2% | 0.0% | 100.0% | PRISMARI |
| WR | 87.2% | 87.2% | 87.2% | 0.0% | 100.0% | JUND |
| WU | 0.0% | 0.0% | 13.3% | 0.0% | 100.0% | UB |
| WUBRG | 0.0% | 0.0% | 0.0% | 0.0% | 26.7% | ESPER |
| YORE | 0.0% | 0.0% | 0.0% | 0.0% | 88.9% | GRIXIS |

These frequencies measure only synthetic agents generated from the model's own approved mappings. They are structural diagnostics, not real-player accuracy.

## Sensitivity

- 769 one-answer mutations tested.
- 495 changed the internal primary; 65 changed stopping/result behavior.
- Catastrophic weak/irrelevant-answer sensitivity flags: 0.

## Owner gate

Do not treat Gate B1 as all-37 placement-complete. The engine is deterministic and testable, but the approved evidence architecture still blocks responsible primary placement for the identities listed above.
