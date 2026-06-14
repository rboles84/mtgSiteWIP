# Strixhaven College Source-Readiness Matrix

Created: 2026-06-12
Last updated: 2026-06-13
Related cards: VM-343, VM-345, VM-346, VM-349, VM-351, VM-353, VM-357, VM-378

## Purpose

This matrix records the current source-role and placement-readiness state for the five Strixhaven college raw packets. It is intended as the control surface for future Strixhaven work: update the affected row whenever a later card promotes, demotes, or adds source material.

## Role Rules

- `claim-bearing`: source directly supports an existing raw claim, profile field, placement field, or source-bound generated surface.
- `support-only`: source supports auxiliary context such as rules landing pages, Commander/card/deck support, or set-wide cross-checks, but is not standalone proof for a college claim.
- `shaping-only`: source frames architecture or interpretation without proving college facts. No active college source row needed this role in VM-346.
- `discovery-only`: corpus, query, archive, repository landing, or reviewed search rows that are useful for discovery but are not safe as standalone claim proof.

Official status alone is not enough for `claim-bearing`; the row must be tied to current raw claim/profile/placement usage. Generated/runtime files are not evidence for this matrix.

Rejected or `not_used_or_rejected_sources` entries are not included in the source row counts below because they are not active source-ledger rows.

## Matrix

| College | Key | Raw folder | Source rows | Role counts | Unresolved rows | Claim-bearing coverage | Placement / discriminator readiness | Commander / deck support classification | Future repair notes |
|---|---:|---|---:|---|---:|---|---|---|---|
| Lorehold College | LOREHOLD | `data/raw-factions/lorehold/` | 20 | `claim-bearing`: 13; `discovery-only`: 7 | 0 | Official product, guide, rules/card, and inspected Lorehold rows cover archaeomancy, history, artifacts, spirits, timeline, figures, flavor anchors, and placement evidence. `src_lorehold_0012` plus story-corpus rows remain discovery-only. | Ready after VM-346. Existing Lorehold discriminators already covered Quandrix-like material-evidence versus theory pressure; VM-346 added paired `collision_lorehold_vs_quandrix_placement_ready` and enabled `crucible_LOREHOLD_QUANDRIX`. Lorehold raw enrichment now surfaces from the raw profile after rebuild. | No new Commander recommendations were added. Existing display/Commander-adjacent support remains bounded to locally backed profile/support fields. | Future source intake should promote discovery-only story rows only after source-reading and claim binding. Keep artifact ethics and spirit-mentor universality cautious. |
| Prismari College | PRISMARI | `data/raw-factions/prismari/` | 15 | `claim-bearing`: 3; `support-only`: 2; `discovery-only`: 10 | 0 | Official 2021 guide, product page, and 2026 guide cover elemental arts, magic-as-art, technique/expression tension, study areas, and placement signals. Story-corpus rows remain discovery-only. VM-378 adds support-only official decklist and local Scryfall flavor-anchor rows. | Ready after VM-346. Added `prismari_q3` for Prismari-vs-Quandrix and `prismari_q4` for Prismari-vs-Silverquill, plus paired collision guidance for both pairs. Enabled `crucible_PRISMARI_QUANDRIX` and `crucible_PRISMARI_SILVERQUILL`. | VM-378 approves support-only Compass, `deck_links`, and `research_links` from the official Secrets of Strixhaven Commander decklist and local Scryfall card anchors. Rootha/Muddle are product/navigation anchors only. | Story-corpus figures, Prismari deans, Galazeth founder status, and long flavor text remain source-intake-needed. |
| Quandrix College | QUANDRIX | `data/raw-factions/quandrix/` | 15 | `claim-bearing`: 3; `support-only`: 2; `discovery-only`: 10 | 0 | Official 2021 guide, product page, and 2026 guide cover mathematics, patterns, fractals, proof/model logic, study areas, and placement signals. Story-corpus rows remain discovery-only. VM-378 adds support-only official decklist and local Scryfall flavor-anchor rows. | Ready after VM-346. Existing Simic/Izzet collisions remain. Added paired collisions for Prismari, Lorehold, and Witherbloom. Enabled `crucible_PRISMARI_QUANDRIX`, `crucible_LOREHOLD_QUANDRIX`, and `crucible_QUANDRIX_WITHERBLOOM`. | VM-378 approves support-only Compass, `deck_links`, and `research_links` from the official Secrets of Strixhaven Commander decklist and local Scryfall card anchors. Zimone/Primo are product/navigation anchors only. | Future metaphysics work should stay explicit about what is official study-area language versus Vox Mana placement interpretation; discovery-only story figures remain deferred. |
| Silverquill College | SILVERQUILL | `data/raw-factions/silverquill/` | 15 | `claim-bearing`: 3; `support-only`: 2; `discovery-only`: 10 | 0 | Official 2021 guide, product page, and 2026 guide cover eloquence, word magic, speech/writing/signing, reputation, leadership, study areas, and placement signals. Story-corpus rows remain discovery-only. VM-378 adds support-only official decklist and local Scryfall flavor-anchor rows. | Ready after VM-346. Existing Orzhov/Dimir collisions remain. Added paired collision guidance for Prismari-vs-Silverquill and enabled `crucible_PRISMARI_SILVERQUILL`. | VM-378 approves support-only Compass, `deck_links`, and `research_links` from the official Secrets of Strixhaven Commander decklist and local Scryfall card anchors. Killian/Scriv are product/navigation anchors only. | Silverquill deans, Shadrix founder status, story-corpus school-politics claims, and long flavor text remain source-intake-needed. |
| Witherbloom College | WITHERBLOOM | `data/raw-factions/witherbloom/` | 15 | `claim-bearing`: 3; `support-only`: 2; `discovery-only`: 10 | 0 | Official 2021 guide, product page, and 2026 guide cover essence studies, life/death exchange, practical components, fieldwork, remedies/poisons, study areas, and placement signals. Story-corpus rows remain discovery-only. VM-378 adds support-only official decklist and local Scryfall flavor-anchor rows. | Ready after VM-346. Existing Selesnya/Simic collisions remain. Added paired collision guidance for Quandrix-vs-Witherbloom and enabled `crucible_QUANDRIX_WITHERBLOOM`. | VM-378 approves support-only Compass, `deck_links`, and `research_links` from the official Secrets of Strixhaven Commander decklist and local Scryfall card anchors. Dina/Gorma are product/navigation anchors only. | Beledros founder status, unsupported dean/founder expansion, story-corpus fieldwork claims, and long flavor text remain source-intake-needed. |

## Cohort Totals

- Total active source rows: 80.
- `claim-bearing`: 25.
- `support-only`: 8.
- `shaping-only`: 0.
- `discovery-only`: 47.
- Unresolved active source rows: 0.
- Unsupported requested VM-346 placement pairs: 0.

## VM-346 Pair Readiness

VM-346 college-to-college collision entries are close-call guidance and are marked `lateral_inhibition: false` where they were newly added. This keeps the pair documentation and Crucibles source-bound without turning every college comparison into broad global suppression during unrelated readings.

| Requested pair | Source-backed status | Raw backing | Question-bank result |
|---|---|---|---|
| Prismari / Quandrix | Supported | Prismari `prismari_claim_002`, `prismari_claim_003`, `prismari_claim_004`, `prismari_claim_006`; Quandrix `quandrix_claim_002`, `quandrix_claim_003`, `quandrix_claim_005`, `quandrix_claim_006` | `crucible_PRISMARI_QUANDRIX` added |
| Prismari / Silverquill | Supported | Prismari `prismari_claim_002`, `prismari_claim_003`, `prismari_claim_004`, `prismari_claim_006`; Silverquill `silverquill_claim_002`, `silverquill_claim_003`, `silverquill_claim_004`, `silverquill_claim_006` | `crucible_PRISMARI_SILVERQUILL` added |
| Lorehold / Quandrix | Supported | Lorehold `claim_lorehold_core_0004`, `claim_lorehold_core_0006`, `claim_lorehold_core_0008`, `claim_lorehold_core_0011`, `claim_lorehold_placement_0009`; Quandrix `quandrix_claim_002`, `quandrix_claim_003`, `quandrix_claim_005`, `quandrix_claim_006` | `crucible_LOREHOLD_QUANDRIX` added |
| Quandrix / Witherbloom | Supported | Quandrix `quandrix_claim_002`, `quandrix_claim_003`, `quandrix_claim_005`, `quandrix_claim_006`; Witherbloom `witherbloom_claim_002`, `witherbloom_claim_003`, `witherbloom_claim_005`, `witherbloom_claim_006` | `crucible_QUANDRIX_WITHERBLOOM` added |

## VM-349/VM-351/VM-353 Reviewed Field Classifications

This table is the per-field decision ledger for Strixhaven thickness work. Lorehold is the benchmark for source-backed richness, not a required field-count target. Generated files, dossier output, generated snippets, runtime display copy, and existing affinity copy are symptoms only and are not proof of readiness.

| Reviewed field or surface | Classification | Allowed source category | Result |
|---|---|---|---|
| Lorehold timeline, figures, flavor anchors, and raw enrichment | `backed-repair` | Existing Lorehold claim-bearing profile/source rows promoted in VM-346 | Already source-backed and surfaced through the builder. No additional VM-353 action needed. |
| Quandrix metaphysics document | `backed-repair` | Existing claim-bearing official guide/product rows and current raw placement/profile claim references | VM-351 may thicken architecture synthesis around discovered/authored mathematics, proof/model tension, fractal pattern, and growth-as-equation. |
| Prismari, Quandrix, Silverquill, and Witherbloom historical timeline enrichment | `source-intake-needed` | Future promoted story/source rows | Timelines remain empty or unsurfaced until specific events are source-read and bound to claim-bearing rows. |
| Prismari, Quandrix, Silverquill, and Witherbloom figure/flavor enrichment | `backed-repair / source-intake-needed split` | Official 2021 guide named speakers, official product rows, and local Scryfall card anchors only | VM-378 may surface the approved guide speaker, product commander anchors, and short per-card flavor summaries. Discovery-only story figures, dean/founder claims, and long flavor text remain deferred. |
| Non-Lorehold generated/public `raw_enrichment` surfacing | `backed-repair` | VM-378 raw source rows and this matrix | Surface only the VM-378 bounded raw profile fields through canonical builder gates. |
| Non-Lorehold raw-enrichment builder allowlist | `backed-repair` | VM-378 support rows plus existing claim-bearing college guides | Prismari/Quandrix/Silverquill/Witherbloom may be added to the raw-enrichment allowlist after VM-378. |
| Non-Lorehold deck links and research links | `backed-repair-support-only` | Official Secrets of Strixhaven Commander decklist product row | Top-level `deck_links` and `research_links` may surface as support/navigation only. |
| Non-Lorehold Commander Compass expansion | `backed-repair-support-only` | Official Secrets of Strixhaven Commander decklist and local Scryfall card data | Compass rows may surface only with `support_only_product_navigation`; they do not prove lore, popularity, metagame, legality, or canon identity claims. |
| Generated snippets, dossier output, runtime copy, and existing display affinity | `blocked-noncanonical` | Symptoms only | May identify UX thinness, but cannot repair fields or justify preservation by itself. |

## Update Checklist

When a future Strixhaven card changes source state:

1. Update the affected `data/raw-factions/<folder>/<folder>.sources.json` role rows.
2. JSON parse every JSON file under `data/raw-factions/lorehold`, `data/raw-factions/prismari`, `data/raw-factions/quandrix`, `data/raw-factions/silverquill`, and `data/raw-factions/witherbloom`; the expected current count is 25 files.
3. Recalculate this matrix row and the cohort totals.
4. Record whether any discovery-only row became claim-bearing, and name the claim/profile/placement field that justifies the promotion.
5. Rebuild generated artifacts only through approved scripts if raw profile or placement behavior changed.
6. Record validation results in the card and handoff.
