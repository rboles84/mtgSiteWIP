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
| ABZAN | wedge | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | `.2523 / 0` | exception accepted | accepted |
| JESKAI | wedge | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | `.2093 / 0` | exception accepted; warning disposition recorded | accepted |
| MARDU | wedge | ACCEPTED | 1 | 1 | 3 | 1 | 1 | PASS | `.6250 / 1` -> `.2375 / 0` | exception accepted; warning disposition recorded | accepted |
| SULTAI | wedge | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | `.1569 / 0` | exception accepted | accepted |
| DUNE | four-color | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | `.5758 / 1` -> `0 / 0` | exception accepted; bounded Vox synthesis | accepted |
| GLINT | four-color | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | `.5000 / 1` -> `0 / 0` | exception accepted; bounded Vox synthesis | accepted |
| INK | four-color | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | `.4706 / 1` -> `0 / 0` | exception accepted; bounded Vox synthesis | accepted |
| WITCH | four-color | ACCEPTED | 1 | 1 | 2 | 1 | 1 | PASS | scoped PASS; 0 candidates | exception accepted; bounded Vox synthesis | accepted |
| YORE | four-color | ACCEPTED_BOUNDED | 1 | 1 | 2 | 1 | 1 | PASS | `.6522 / 1` -> `0 / 0` | exception accepted; engine `NO_RESULT` preserved | accepted |
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
| Remaining 1 identity | endpoint | QUEUED_EXCEPTION_AUTOMATION | — | — | — | — | 0 | not run | baseline established | exception-based | pending |

Batch 01 also repaired one shared P1 generated-catalog freshness defect: optional runtime JSON now uses the existing `no-store` fetch policy. The repair changed no accepted identity semantics and all three golden controls pass.

Future batches must pass the mandatory rendered Cross-Section Redundancy Gate and record a section-role matrix before commit or push. VM-595 remains a detector; low similarity alone does not establish section-role separation.

Batch 02 accepted Blue, Black, Red, and Green after one repair cycle each. It repaired raw-provenance direction, exact taxonomy fidelity, Start Here / How This Plays role separation, and the mono boundary grammar family without changing Placement or accepted-control semantics.

Guild Batch 03 accepted Azorius, Boros, Orzhov, and Simic after one cycle each. It repaired the same provenance, taxonomy, section-role, and boundary families plus sixteen unsupported Native product relationships while preserving First Flight as the evidence-backed Azorius exception.

Guild Batch 04 accepted Dimir, Gruul, Selesnya, Izzet, and Golgari after one cycle each. It repaired fifteen raw-claim provenance lanes, exact curated taxonomies, section-role and boundary defects, and fourteen unsupported Native product relationships while preserving Token Triumph for Selesnya and Seize Control for Izzet as evidence-backed exceptions. The shared precon regression owner now protects accepted empty-Native contracts and Exact → Stretch preview order.

College Wave 05 accepted Prismari, Quandrix, Silverquill, and Witherbloom after one cycle each. It repaired twelve raw-claim provenance lanes, exact curated taxonomies, section-role and boundary defects, and Silverquill's thresholded cross-section collision. Eight authored product records now use official Wizards decklist sources; four 2026 featured alternates remain distinct from their face commanders, and all eight explicit college relationships render Native before Exact and Stretch.

Shard Wave 06 accepted Bant, Grixis, Jund, and Naya after one cycle each. It repaired twelve raw-claim provenance lanes, exact curated taxonomies, section-role and boundary defects, and the frozen Bant/Grixis cross-section collisions. All four Native sets remain intentionally empty and every actual dossier renders Exact before Stretch.

Wedge Wave 07 accepted Abzan, Jeskai, Mardu, and Sultai after one cycle each. It repaired twelve raw-claim provenance lanes, exact curated taxonomies, section-role and boundary defects, and Mardu's frozen cross-section collision. The shared precon provider/builder owner now supports all four wedge keys; Abzan Armor, Jeskai Striker, Mardu Surge, and Sultai Arisen reproduce from the official Wizards decklist as Native with face and featured commanders kept distinct. Fresh review classifies the two existing Jeskai/Mardu model-owned inhibitor warnings as valid architecture exceptions outside the five SIRF surfaces, retains their provenance boundary, and suppresses neither warning.

Four-Color Wave 08 accepted Dune, Glint, Ink, Witch, and Yore after one cycle each. It repaired fifteen generated-self-citing provenance lanes, installed five exact curated taxonomies, separated construction choice from table behavior, made the exact four-color and absent-color boundary explicit, and labeled each metaphysical reading as bounded Vox Mana synthesis rather than official four-color doctrine. Native remains empty for all five; each Commander 2016 four-color product renders as Exact before Stretch. Yore retains its intentional bounded engine `NO_RESULT`.

## VM-607 Post-Wave-07 All-37 Checkpoint — PASS

- Baseline: `232cd84168bd201f8ea0ed57bfd37f4bcb139896`.
- Shared repair: products de-duplicate by stable catalog slug in Native → Exact → Stretch precedence; editorial card identity is no longer allowed to erase a product from Precon Starting Points.
- Blast radius: 155 products inspected; eight suppressed products restored, including Jund `Power Hungry` and WUBRG `Eldrazi Incursion`.
- Rendered collection: 37/37 identities, 74/74 full-page desktop/mobile views, all five sections, no overflow, no duplicate products, exact desktop/mobile relationship parity.
- Accepted controls: 28/28 promoted contracts and WUBRG / Temur / Lorehold goldens PASS.
- Engine: 36 `PASS_MATCH`, bounded Yore `NO_RESULT`, zero mismatch/error.
- VM-595: 1,383 prose units, 1,642 sentences, 26,736 words, 53 exact groups, 702 occurrences, 17 substitution groups, and 8 within-dossier candidates.
- Remaining queue: Dune, Glint, Ink, Witch, Yore, and Colorless. Wave 08 begins automatically with the five four-color identities.
- Detailed report: `docs/sirf/reports/2026-08-30-sirf-post-wave-07-all-37-checkpoint.md`.

## VM-603 All-37 Checkpoint — PASS

- Baseline: `dc680a0de967ff041a4f0f5861544abc75fb71ec`.
- Rendered collection: 37/37 identities and 74/74 desktop/mobile views; all five scoped sections present; no horizontal-overflow failure.
- Engine reconciliation: 36 `PASS_MATCH`; Yore retains the one intentional bounded `NO_RESULT`; zero mismatch/error.
- Accepted controls: 16/16 promoted contracts plus WUBRG, Temur, and Lorehold goldens PASS.
- Owner correction: Turtle Power! reproduces from `data/precons/vox-mana-precons.source.json` with Leonardo, the Balance as main commander and Heroes in a Half Shell as alternate; provider matrix 155/155 and actual WUBRG render PASS.
- VM-595: 1,376 prose units, 1,653 sentences, 26,644 words, 57 exact groups, 724 occurrences, 17 substitution groups, 11 within-dossier candidates; no new truth blocker or accepted-control regression.
- Remaining queue: Prismari, Quandrix, Silverquill, Witherbloom; Bant, Grixis, Jund, Naya, Abzan, Jeskai, Mardu, Sultai; Dune, Glint, Ink, Witch, Yore; Colorless.
- Detailed report: `docs/sirf/reports/2026-08-30-sirf-all-37-checkpoint.md`.
