# SIRF v0.2 Rollout Tracker

| Identity | Type | State | P0 | P1 | P2 | P3 | Cycles | Render | VM-595 | Owner | Contract |
|---|---|---|---:|---:|---:|---:|---:|---|---|---|---|
| WUBRG | five-color | ACCEPTED_GOLDEN | 0 | 0 | 0 | 0 | complete | PASS | baseline | accepted | golden |
| TEMUR | wedge | ACCEPTED_GOLDEN | 0 | 0 | 0 | 0 | complete | PASS | baseline | accepted | golden |
| LOREHOLD | college | ACCEPTED_GOLDEN | 0 | 0 | 0 | 0 | complete | PASS | baseline | accepted | golden |
| W | mono-color | ACCEPTED | 0 | 0 | 2 | 1 | 2 | PASS | scoped PASS; 0 candidates | accepted | accepted |
| U | mono-color | ACCEPTED | 1 | 0 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| B | mono-color | ACCEPTED | 1 | 0 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| R | mono-color | ACCEPTED | 1 | 0 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| G | mono-color | ACCEPTED | 1 | 0 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| BR | Ravnica guild | ACCEPTED | 0 | 1 | 3 | 0 | 2 | PASS | scoped PASS; 0 candidates | accepted | accepted |
| WU | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| WR | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| WB | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| UG | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| UB | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| RG | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| WG | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| UR | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| BG | Ravnica guild | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| ESPER | shard | ACCEPTED | 0 | 0 | 3 | 1 | 2 | PASS | scoped PASS; 0 candidates | accepted | accepted |
| Remaining 18 identities | mixed | QUEUED_EXCEPTION_AUTOMATION | — | — | — | — | 0 | not run | baseline established | exception-based | pending |

Batch 01 also repaired one shared P1 generated-catalog freshness defect: optional runtime JSON now uses the existing `no-store` fetch policy. The repair changed no accepted identity semantics and all three golden controls pass.

Future batches must pass the mandatory rendered Cross-Section Redundancy Gate and record a section-role matrix before commit or push. VM-595 remains a detector; low similarity alone does not establish section-role separation.

Batch 02 accepted Blue, Black, Red, and Green after one repair cycle each. It repaired raw-provenance direction, exact taxonomy fidelity, Start Here / How This Plays role separation, and the mono boundary grammar family without changing Placement or accepted-control semantics.

Guild Batch 03 accepted Azorius, Boros, Orzhov, and Simic after one cycle each. It repaired the same provenance, taxonomy, section-role, and boundary families plus sixteen unsupported Native product relationships while preserving First Flight as the evidence-backed Azorius exception.

Guild Batch 04 accepted Dimir, Gruul, Selesnya, Izzet, and Golgari after one cycle each. It repaired fifteen raw-claim provenance lanes, exact curated taxonomies, section-role and boundary defects, and fourteen unsupported Native product relationships while preserving Token Triumph for Selesnya and Seize Control for Izzet as evidence-backed exceptions. The shared precon regression owner now protects accepted empty-Native contracts and Exact → Stretch preview order.
