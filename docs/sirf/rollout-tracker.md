# SIRF v0.2 Rollout Tracker

| Identity | Type | State | P0 | P1 | P2 | P3 | Cycles | Render | VM-595 | Owner | Contract |
|---|---|---|---:|---:|---:|---:|---:|---|---|---|---|
| WUBRG | five-color | ACCEPTED_GOLDEN | 0 | 0 | 0 | 0 | complete | PASS | baseline | accepted | golden |
| TEMUR | wedge | ACCEPTED_GOLDEN | 0 | 0 | 0 | 0 | complete | PASS | baseline | accepted | golden |
| LOREHOLD | college | ACCEPTED_GOLDEN | 0 | 0 | 0 | 0 | complete | PASS | baseline | accepted | golden |
| PRISMARI | college | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| QUANDRIX | college | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| SILVERQUILL | college | ACCEPTED | 1 | 1 | 3 | 1 | 1 | PASS | `.3939 / 1` -> `.1579 / 0` | exception accepted | accepted |
| WITHERBLOOM | college | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted | accepted |
| BANT | shard | ACCEPTED | 1 | 0 | 3 | 1 | 1 | PASS | `.5263 / 1` -> `.1481 / 0` | exception accepted | accepted |
| GRIXIS | shard | ACCEPTED | 1 | 0 | 3 | 1 | 1 | PASS | `.5000 / 1` -> `.1512 / 0` | exception accepted | accepted |
| JUND | shard | ACCEPTED | 1 | 0 | 2 | 1 | 1 | PASS | `.1333 / 0` | exception accepted | accepted |
| NAYA | shard | ACCEPTED | 1 | 0 | 2 | 1 | 1 | PASS | `.1884 / 0` | exception accepted | accepted |
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
| Remaining 10 identities | mixed | QUEUED_EXCEPTION_AUTOMATION | — | — | — | — | 0 | not run | baseline established | exception-based | pending |

Batch 01 also repaired one shared P1 generated-catalog freshness defect: optional runtime JSON now uses the existing `no-store` fetch policy. The repair changed no accepted identity semantics and all three golden controls pass.

Future batches must pass the mandatory rendered Cross-Section Redundancy Gate and record a section-role matrix before commit or push. VM-595 remains a detector; low similarity alone does not establish section-role separation.

Batch 02 accepted Blue, Black, Red, and Green after one repair cycle each. It repaired raw-provenance direction, exact taxonomy fidelity, Start Here / How This Plays role separation, and the mono boundary grammar family without changing Placement or accepted-control semantics.

Guild Batch 03 accepted Azorius, Boros, Orzhov, and Simic after one cycle each. It repaired the same provenance, taxonomy, section-role, and boundary families plus sixteen unsupported Native product relationships while preserving First Flight as the evidence-backed Azorius exception.

Guild Batch 04 accepted Dimir, Gruul, Selesnya, Izzet, and Golgari after one cycle each. It repaired fifteen raw-claim provenance lanes, exact curated taxonomies, section-role and boundary defects, and fourteen unsupported Native product relationships while preserving Token Triumph for Selesnya and Seize Control for Izzet as evidence-backed exceptions. The shared precon regression owner now protects accepted empty-Native contracts and Exact → Stretch preview order.

College Wave 05 accepted Prismari, Quandrix, Silverquill, and Witherbloom after one cycle each. It repaired twelve raw-claim provenance lanes, exact curated taxonomies, section-role and boundary defects, and Silverquill's thresholded cross-section collision. Eight authored product records now use official Wizards decklist sources; four 2026 featured alternates remain distinct from their face commanders, and all eight explicit college relationships render Native before Exact and Stretch.

Shard Wave 06 accepted Bant, Grixis, Jund, and Naya after one cycle each. It repaired twelve raw-claim provenance lanes, exact curated taxonomies, section-role and boundary defects, and the frozen Bant/Grixis cross-section collisions. All four Native sets remain intentionally empty and every actual dossier renders Exact before Stretch.

## VM-603 All-37 Checkpoint — PASS

- Baseline: `dc680a0de967ff041a4f0f5861544abc75fb71ec`.
- Rendered collection: 37/37 identities and 74/74 desktop/mobile views; all five scoped sections present; no horizontal-overflow failure.
- Engine reconciliation: 36 `PASS_MATCH`; Yore retains the one intentional bounded `NO_RESULT`; zero mismatch/error.
- Accepted controls: 16/16 promoted contracts plus WUBRG, Temur, and Lorehold goldens PASS.
- Owner correction: Turtle Power! reproduces from `data/precons/vox-mana-precons.source.json` with Leonardo, the Balance as main commander and Heroes in a Half Shell as alternate; provider matrix 155/155 and actual WUBRG render PASS.
- VM-595: 1,376 prose units, 1,653 sentences, 26,644 words, 57 exact groups, 724 occurrences, 17 substitution groups, 11 within-dossier candidates; no new truth blocker or accepted-control regression.
- Remaining queue: Prismari, Quandrix, Silverquill, Witherbloom; Bant, Grixis, Jund, Naya, Abzan, Jeskai, Mardu, Sultai; Dune, Glint, Ink, Witch, Yore; Colorless.
- Detailed report: `docs/sirf/reports/2026-08-30-sirf-all-37-checkpoint.md`.
