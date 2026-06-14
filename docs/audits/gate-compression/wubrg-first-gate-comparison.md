# Gate Compression WUBRG-First Comparison

Generated: 2026-06-14T15:41:14.422Z

Source fixture: `data/placement/gate-compression.source.json`

Placement model: `data/placement-model.json`

Status: **PASS**

Failures: none.

Warnings: none.

## Contract

- Expression count: 37
- Propagation mode: sqrt
- Gate broad-match penalty: 0
- Neutral likelihood: 0.45
- Bucket contract: current `likelihood_to_delta`, nearest-delta bucketed before scoring.

## Reachability

| target | final rank | top-5 reachable | final Hall pool |
| --- | --- | --- | --- |
| W | 1 | yes | W, WU, JESKAI, LOREHOLD, WR |
| U | 1 | yes | U, QUANDRIX, UG, WU, BANT |
| B | 1 | yes | B, BR, BG, WITHERBLOOM, JUND |
| R | 1 | yes | R, BR, LOREHOLD, WR, MARDU |
| G | 1 | yes | G, QUANDRIX, UG, SULTAI, BG |
| WU | 2 | yes | W, WU, JESKAI, LOREHOLD, WR |
| BANT | 1 | yes | BANT, INK, JESKAI, WU, NAYA |
| WR | 3 | yes | NAYA, LOREHOLD, WR, INK, JESKAI |
| BR | 1 | yes | BR, JUND, MARDU, DUNE, GLINT |
| ESPER | 1 | yes | ESPER, SILVERQUILL, WB, WU, W |
| GRIXIS | 4 | yes | GLINT, JUND, BR, GRIXIS, DUNE |
| JUND | 2 | yes | BR, JUND, MARDU, DUNE, GLINT |
| NAYA | 1 | yes | NAYA, LOREHOLD, WR, RG, INK |
| ABZAN | 1 | yes | ABZAN, DUNE, WG, WITCH, G |
| TEMUR | 1 | yes | TEMUR, RG, G, QUANDRIX, UG |
| SULTAI | 1 | yes | SULTAI, BG, WITHERBLOOM, GLINT, G |
| MARDU | 3 | yes | BR, JUND, MARDU, DUNE, GLINT |
| JESKAI | 1 | yes | JESKAI, W, LOREHOLD, WR, WU |
| YORE | 1 | yes | YORE, MARDU, ESPER, GRIXIS, JESKAI |
| GLINT | 1 | yes | GLINT, JUND, GRIXIS, BR, TEMUR |
| DUNE | 2 | yes | NAYA, DUNE, WG, INK, RG |
| INK | 5 | yes | NAYA, LOREHOLD, WR, RG, INK |
| WITCH | 4 | yes | ABZAN, DUNE, WG, WITCH, G |
| COLORLESS | 1 | yes | COLORLESS, B, G, R, U |
| WUBRG | 1 | yes | WUBRG, ABZAN, BANT, DUNE, ESPER |
| BG | 3 | yes | GLINT, B, BG, WITHERBLOOM, SULTAI |
| RG | 4 | yes | NAYA, LOREHOLD, WR, RG, INK |
| UB | 1 | yes | UB, U, B, GRIXIS, SULTAI |
| UR | 2 | yes | PRISMARI, UR, U, GRIXIS, R |
| LOREHOLD | 2 | yes | NAYA, LOREHOLD, WR, INK, JESKAI |
| WB | 4 | yes | B, MARDU, SILVERQUILL, WB, YORE |
| PRISMARI | 1 | yes | PRISMARI, UR, U, GRIXIS, R |
| QUANDRIX | 2 | yes | G, QUANDRIX, UG, SULTAI, BG |
| WG | 3 | yes | NAYA, DUNE, WG, INK, RG |
| SILVERQUILL | 3 | yes | B, MARDU, SILVERQUILL, WB, YORE |
| UG | 3 | yes | G, QUANDRIX, UG, SULTAI, BG |
| WITHERBLOOM | 4 | yes | GLINT, B, BG, WITHERBLOOM, SULTAI |

## Validation Probes

- Neutral `.45` nonzero deltas: 0
- Neutral `.45` advanced expressions: 0
- `COLORLESS` rank without boundary evidence: 37
- `WUBRG` rank under high color pressure without integration evidence: 36

## Watched Overtrigger Counts

| expression | rank 1 | top 3 | top 5 |
| --- | --- | --- | --- |
| DUNE | 10/625 | 29/625 | 60/625 |
| INK | 0/625 | 19/625 | 49/625 |
| WITCH | 7/625 | 29/625 | 53/625 |
| WUBRG | 38/625 | 78/625 | 90/625 |
| COLORLESS | 17/625 | 17/625 | 17/625 |

Special leakage:

- COLORLESS top-5 paths without boundary: 0
- WUBRG top-5 paths without integration: 0

## Broad Single-Answer Check

| answer | positive colors | integration | rank 1 | four-color rank 1 |
| --- | --- | --- | --- | --- |
| gate_v2_trust_braided_witness | WUBRG | 0.95 | WUBRG | pass |
| gate_v2_pressure_many_currents | WUBRG | 0.95 | WUBRG | pass |
| gate_v2_signal_whole_chord | WUBRG | 0.95 | WUBRG | pass |
| gate_v2_oath_whole_covenant | WUBRG | 0.95 | WUBRG | pass |

## Same-Color Duplicate Check

| pair | Gate tied | Crucible pair | resolution |
| --- | --- | --- | --- |
| WR / LOREHOLD | yes | yes | Crucible-resolved after Gate |
| BG / WITHERBLOOM | yes | yes | Crucible-resolved after Gate |
| UR / PRISMARI | yes | yes | Crucible-resolved after Gate |
| WB / SILVERQUILL | yes | yes | Crucible-resolved after Gate |
| QUANDRIX / UG | yes | yes | Crucible-resolved after Gate |

## Snapshot Detail

Full per-target Gate I-IV snapshots are in `wubrg-first-gate-comparison.json`. Each snapshot includes source vectors, special signals, generated likelihoods/deltas, top candidates, and the Hall routing pool.
