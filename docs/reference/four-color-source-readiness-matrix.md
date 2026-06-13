# Four-Color Source Readiness Matrix

Status: VM-348 source-bound cohort repair; VM-360 source-depth review
Last reviewed: 2026-06-12

This matrix records the current source-readiness state for the five four-color lanes:

YORE -> GLINT -> DUNE -> INK -> WITCH -> YORE

Generated/runtime data remains a comparison target only. Commander, precon, deck, and operator rows are support-only and must not justify lore claims, placement claims, discriminator proof, Crucible copy, route aliases, public names, or claim-count changes.

## Role Counts

| Identity | Claim-bearing | Support-only | Shaping-only | Discovery-only | Claim Count |
| --- | ---: | ---: | ---: | ---: | ---: |
| YORE | 3 | 2 | 5 | 3 | 5 |
| GLINT | 3 | 4 | 5 | 3 | 5 |
| DUNE | 3 | 5 | 5 | 1 | 5 |
| INK | 3 | 5 | 4 | 1 | 5 |
| WITCH | 3 | 5 | 4 | 1 | 5 |

Lifecycle rows were normalized to `shaping-only`. Manual-fill gap rows were normalized to `discovery-only`. No ambiguous rows were promoted.

## Identity Readiness

| Identity | Claim-Bearing Coverage | Commander / Deck Support | Raw Enrichment Readiness | Discriminator Readiness | Crucible Readiness | Unsupported Follow-Ups |
| --- | --- | --- | --- | --- | --- | --- |
| YORE | Five approved claims cover project key, non-Green frame, constructed agency, and Yore-Tiller boundary. | Breya / Invent Superiority rows are support-only Commander texture only. | `historical_timeline` and `key_figures` are raw-profile backed and builder-eligible. `canonical_flavor_text` is currently empty and `source-intake-needed`. | Three discriminators now include adjacent Glint/Witch close-call coverage with `lateral_inhibition: false` on the VM-348 ring question. | `YORE/GLINT` and `WITCH/YORE` supported by YORE claim rows plus peer claim rows. | Exact Yore-Tiller card facts, Cult of Yore, detailed Breya lore, flavor anchors, and Commander optimization remain future source-intake work. |
| GLINT | Five approved claims cover project key, non-White frame, volatility/adaptation/force, and Glint-Eye boundary. | Yidris / Entropic Uprising rows are support-only Commander texture only. | `historical_timeline` and `key_figures` are raw-profile backed and builder-eligible. `canonical_flavor_text` is currently empty and `source-intake-needed`. | Three discriminators now include adjacent Yore/Dune close-call coverage with `lateral_inhibition: false` on the VM-348 ring question. | `YORE/GLINT` and `GLINT/DUNE` supported by GLINT claim rows plus peer claim rows. | Yidris lore, detailed cascade support, official naming claims, flavor anchors, and Commander optimization remain future source-intake work. |
| DUNE | Five approved claims cover project key, non-Blue frame, direct action/territorial pressure, and Dune-Brood boundary. | Saskia / Open Hostility rows are support-only Commander and precon texture only. | `historical_timeline` and `key_figures` are raw-profile backed and builder-eligible. `canonical_flavor_text` is currently empty and `source-intake-needed`. | Three discriminators now include adjacent Glint/Ink close-call coverage with `lateral_inhibition: false` on the VM-348 ring question. Existing stronger Glint inhibition remains untouched. | `GLINT/DUNE` and `DUNE/INK` supported by DUNE claim rows plus peer claim rows. | Exact Dune-Brood card facts, Rosewater Aggression commentary, detailed Saskia lore, flavor anchors, and Commander optimization remain future source-intake work. |
| INK | Five approved claims cover project key, non-Black frame, protected generosity/open knowledge, and Ink-Treader boundary. | Kynaios and Tiro / Stalwart Unity rows are support-only Commander and precon texture only. | `historical_timeline` and `key_figures` are raw-profile backed and builder-eligible. `canonical_flavor_text` is currently empty and `source-intake-needed`. | Three discriminators now include adjacent Dune/Witch close-call coverage with `lateral_inhibition: false` on the VM-348 ring question. Existing stronger Dune inhibition remains untouched. | `DUNE/INK` and `INK/WITCH` supported by INK claim rows plus peer claim rows. | Exact Ink-Treader card facts, Altruism commentary, detailed Kynaios lore, flavor anchors, and Commander optimization remain future source-intake work. |
| WITCH | Five approved claims cover project key, non-Red frame, patient development/calculated expansion, and Witch-Maw boundary. | Atraxa / Breed Lethality rows are support-only Commander and precon texture only. | `historical_timeline` and `key_figures` are raw-profile backed and builder-eligible. `canonical_flavor_text` is currently empty and `source-intake-needed`. | Third discriminator now includes adjacent Yore coverage while preserving prior Ink/Glint/Dune/Bant review coverage and `lateral_inhibition: false` for the revised ring question. | `INK/WITCH` and `WITCH/YORE` supported by WITCH claim rows plus peer claim rows. | Exact Witch-Maw card facts, Growth commentary, detailed Atraxa lore, Phyrexia-only boundaries, flavor anchors, and Commander optimization remain future source-intake work. |

## Crucible Candidate Resolution

All five VM-348 ring Crucibles had local support and were added to `research/build-faction-artifacts.mjs`:

| Pair | Support Basis |
| --- | --- |
| YORE/GLINT | YORE missing-Green and constructed-agency claims; GLINT missing-White and volatility/adaptation claims. |
| GLINT/DUNE | GLINT missing-White volatility/adaptation claims; DUNE missing-Blue direct-action/territorial-pressure claims. |
| DUNE/INK | DUNE missing-Blue force/territorial-pressure claims; INK missing-Black protected-generosity/open-knowledge claims. |
| INK/WITCH | INK missing-Black protected-commons claims; WITCH missing-Red patient-cultivation/accumulation claims. |
| WITCH/YORE | WITCH missing-Red patient-cultivation claims; YORE missing-Green constructed-agency claims. |

Unsupported VM-348 Crucibles: none.

## Guardrail Notes

- `deck_links`, `research_links`, and `commander_compass` are generated from raw profile fields only.
- `commander_compass.review_status` must remain `support_only_live_pilot_curation`.
- Ring collision guidance uses `lateral_inhibition: false` unless a future approved calibration card strengthens a boundary deliberately.
- Discovery-only rows remain leads/gaps. They are not claim-bearing, support-only, or shaping-only evidence.

## VM-360 Reviewed Field Classifications

| Reviewed field or surface | Classification | Allowed source category | Result |
| --- | --- | --- | --- |
| Existing five-claim floor for Yore, Glint, Dune, Ink, and Witch | `backed-repair` | Existing claim-bearing evidence, scope cards, and four-color reference audit rows | Preserve. Do not add claims for parity-by-count. |
| Four-color historical timeline and key-figure raw enrichment | `backed-repair` | Existing raw-profile rows from VM-348 | Preserve current builder-eligible profile enrichment. |
| Four-color canonical flavor anchors | `source-intake-needed` | Future exact source-row promotion | Keep `canonical_flavor_text` absent/empty until a source row directly backs the field. |
| Four-color Commander Compass, deck links, and research links | `source-normalization` | Existing support-only Commander/deck rows | Preserve support-only public texture, but do not use it to justify claims, placement, or flavor anchors. |
| Four-color claim-depth expansion | `source-intake-needed` | Future promoted claim-bearing rows | Record gaps without raising every identity to a fixed claim count. |
| Generated/runtime four-color richness | `blocked-noncanonical` | Symptoms only | Generated output cannot justify source promotion or preservation. |
