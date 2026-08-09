# VM-551 Gate B1 Placement Engine — Owner Summary

Model: `vm551-gate-b1-placement-engine-v1`

**IN-MODEL ROBUSTNESS — NOT EMPIRICAL PLAYER ACCURACY**

## Direct answers

- **Can all 37 identities be reached responsibly?** Yes as internal candidates.
- **Can all 37 become primary?** No. 13/37 can become a responsible named primary under the approved evidence.
- **Cannot become primary:** ABZAN, B, BANT, BR, G, GRIXIS, JESKAI, JUND, MARDU, NAYA, R, RG, SILVERQUILL, SULTAI, TEMUR, U, UB, UG, W, WB, WG, WITCH, WU, YORE.
- **Can every insufficient result go somewhere useful?** Some can; not all. Targeted question: 1943; useful revisit: 713; no approved discriminator: 689.
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
| ABZAN | 87.2% | 98.3% | 100.0% | 0.0% | 98.3% | BANT |
| B | 0.0% | 13.3% | 24.4% | 0.0% | 97.8% | JESKAI |
| BANT | 12.2% | 100.0% | 100.0% | 0.0% | 100.0% | ABZAN |
| BG | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | DUNE |
| BR | 12.2% | 87.8% | 87.8% | 0.0% | 98.9% | BANT |
| COLORLESS | 65.6% | 76.7% | 76.7% | 63.3% | 25.6% | SULTAI |
| DUNE | 0.0% | 0.0% | 0.0% | 0.0% | 25.6% | WUBRG |
| ESPER | 87.8% | 87.8% | 87.8% | 0.0% | 98.9% | QUANDRIX |
| G | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | INK |
| GLINT | 88.9% | 88.9% | 88.9% | 75.6% | 24.4% | BANT |
| GRIXIS | 86.7% | 86.7% | 88.9% | 0.0% | 100.0% | JESKAI |
| INK | 73.9% | 86.7% | 86.7% | 73.9% | 23.9% | ABZAN |
| JESKAI | 0.0% | 86.7% | 86.7% | 0.0% | 100.0% | GRIXIS |
| JUND | 0.0% | 0.0% | 0.0% | 0.0% | 88.9% | YORE |
| LOREHOLD | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | INK |
| MARDU | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | YORE |
| NAYA | 0.0% | 0.0% | 0.0% | 0.0% | 25.6% | WUBRG |
| PRISMARI | 63.3% | 76.7% | 87.8% | 63.3% | 24.4% | BR |
| QUANDRIX | 0.0% | 0.0% | 0.0% | 0.0% | 25.0% | WUBRG |
| R | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | UR |
| RG | 0.0% | 0.0% | 0.0% | 0.0% | 100.0% | YORE |
| SILVERQUILL | 0.0% | 0.0% | 0.0% | 0.0% | 25.6% | WUBRG |
| SULTAI | 0.0% | 0.0% | 1.1% | 0.0% | 24.4% | WUBRG |
| TEMUR | 0.0% | 0.0% | 0.0% | 0.0% | 88.9% | YORE |
| U | 86.7% | 86.7% | 86.7% | 0.0% | 100.0% | UB |
| UB | 86.7% | 86.7% | 86.7% | 0.0% | 97.8% | U |
| UG | 0.0% | 0.0% | 0.0% | 0.0% | 23.3% | INK |
| UR | 64.4% | 64.4% | 76.7% | 64.4% | 34.4% | BR |
| W | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | INK |
| WB | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | PRISMARI |
| WG | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | INK |
| WITCH | 0.0% | 0.0% | 0.0% | 0.0% | 24.4% | PRISMARI |
| WITHERBLOOM | 12.2% | 12.2% | 12.2% | 12.2% | 76.1% | BR |
| WR | 76.1% | 87.2% | 87.2% | 62.8% | 26.1% | BANT |
| WU | 0.0% | 0.0% | 13.3% | 0.0% | 100.0% | UB |
| WUBRG | 0.0% | 0.0% | 0.0% | 0.0% | 26.7% | ESPER |
| YORE | 2.2% | 2.2% | 2.2% | 0.0% | 98.9% | GRIXIS |

These frequencies measure only synthetic agents generated from the model's own approved mappings. They are structural diagnostics, not real-player accuracy.

## Sensitivity

- 767 one-answer mutations tested.
- 447 changed the internal primary; 214 changed stopping/result behavior.
- Catastrophic weak/irrelevant-answer sensitivity flags: 0.

## Owner gate

Do not treat Gate B1 as all-37 placement-complete. The engine is deterministic and testable, but the approved evidence architecture still blocks responsible primary placement for the identities listed above.
