# Shard And Tarkir Clan Source Readiness Matrix

Last updated: 2026-06-13

Related cards: `VM-347 - Shard And Tarkir Clan Source-Bound Cohort Repair`, VM-349, VM-352, VM-353, VM-358, VM-379, VM-380

## Guardrails

- Source intake after VM-379/VM-380 is limited to verified official product/story URLs recorded in target raw source rows.
- Placement discriminator, collision, and Crucible additions are backed by local `claim-bearing` or placement-relevant `shaping-only` rows.
- `support-only` Commander/deck/operator rows remain support texture only and are not placement evidence.
- Canon research inspected for context only: claims still require raw source rows, evidence ledgers, or this matrix.
- Generated/runtime artifacts are comparison and delivery targets, not evidence.

## Source Role Coverage

| Identity | Source Role Coverage | Placement Questions | Collision Guidance | Commander / Deck Support | Notes |
| --- | --- | ---: | ---: | --- | --- |
| `BANT` | Full: 3 `claim-bearing`, 7 `shaping-only`, 10 `support-only`, 1 `discovery-only` | 3 | 7 raw / 5 generated | Existing support-only Compass retained; runtime `WUG` exposure sanitized to `GWU` query metadata. | No discriminator/collision content changed. |
| `ESPER` | Full: 2 `claim-bearing`, 6 `shaping-only`, 5 `support-only` | 3 | 4 | Existing support-only Compass retained. | VM-352 adds one backed Azorius/guild false-positive discriminator. |
| `GRIXIS` | Full: 4 `claim-bearing`, 7 `shaping-only`, 3 `support-only` | 3 | 2 | Existing support-only Compass retained. VM-379 adds bounded official Alara story texture plus support-only card figure/flavor anchors. | VM-379 promotes three usable source-backed dimensions: undead hellscape texture, pre-Conflux necromancy province, and post-Conflux undead assault/life-drain. Vithia/Sedraxis, full vis economy, Bolas staging, Nefarox cults, and detailed figure biographies remain source-intake-needed. |
| `JUND` | Full: 3 `claim-bearing`, 6 `shaping-only`, 6 `support-only` | 3 | 4 raw / 3 generated | Existing support-only Compass retained. | No discriminator/collision content changed. |
| `NAYA` | Full: 3 `claim-bearing`, 6 `shaping-only`, 7 `support-only` | 3 | 2 | Existing support-only Commander support retained. | VM-352 adds one backed generic big-creature/token/Cabaretti false-positive discriminator. |
| `ABZAN` | Full: 9 `claim-bearing`, 6 `shaping-only`, 5 `support-only` | 3 | 2 | VM-380 adds support-only public Compass, top-level `deck_links`, and `research_links` from the official Tarkir: Dragonstorm Commander decklist. | VM-352 adds one backed generic WBG/Dromoka/Commander-product/graveyard/toughness false-positive discriminator. Product rows are navigation only. |
| `TEMUR` | Full: 9 `claim-bearing`, 8 `shaping-only`, 4 `support-only` | 3 | 3 | VM-380 adds support-only public Compass, top-level `deck_links`, and `research_links` from the official Tarkir: Dragonstorm Commander decklist. | Added Sultai/Mardu/Jeskai discriminator and collision guidance. Product rows are navigation only. |
| `SULTAI` | Full: 7 `claim-bearing`, 7 `shaping-only`, 4 `support-only` | 3 | 3 | VM-380 adds support-only public Compass, top-level `deck_links`, and `research_links` from the official Tarkir: Dragonstorm Commander decklist. | Added Abzan/Temur/Jeskai discriminator and collision guidance. Product rows are navigation only. |
| `MARDU` | Full: 8 `claim-bearing`, 8 `shaping-only`, 3 `support-only` | 3 | 0 | Existing support-only Commander Compass remains bounded; VM-380 adds official top-level `research_links` and `deck_links`. | Normalized VM-228 lifecycle source role to `shaping-only`; discriminator content unchanged. Product rows are navigation only. |
| `JESKAI` | Full: 7 `claim-bearing`, 8 `shaping-only`, 3 `support-only`, 3 `discovery-only` | 3 | 3 | Existing support-only Commander Compass remains bounded; VM-380 adds official top-level `research_links` and `deck_links`. | Normalized VM-234/manual-fill/seed roles; repaired non-array collision guidance shape. Product rows are navigation only. |

## Crucible Candidate Resolution

All VM-347 candidate Crucible pairs had local support and were added to `research/build-faction-artifacts.mjs`.

| Pair | Status | Backing Lane |
| --- | --- | --- |
| `BANT/ESPER` | Added | Bant living communal order vs Esper designed perfectibility. |
| `ESPER/GRIXIS` | Added | Esper optimization/design vs Grixis survival leverage. |
| `GRIXIS/JUND` | Added | Grixis calculated survival vs Jund gut instinct/appetite. |
| `JUND/NAYA` | Added | Jund appetite/consequence vs Naya living abundance. |
| `NAYA/BANT` | Added | Naya living whole vs Bant supported champion/order. |
| `ABZAN/MARDU` | Added | Abzan endurance/family duty vs Mardu immediate charge. |
| `ABZAN/SULTAI` | Added | Abzan ancestor continuity vs Sultai resource conversion. |
| `TEMUR/SULTAI` | Added | Temur attuned survival vs Sultai calculated conversion. |
| `TEMUR/MARDU` | Added | Temur listening/wild signal vs Mardu war-bound speed. |
| `JESKAI/MARDU` | Added | Jeskai trained insight vs Mardu immediate commitment. |
| `JESKAI/SULTAI` | Added | Jeskai disciplined action vs Sultai private conversion. |
| `JESKAI/TEMUR` | Added | Jeskai monastic practice vs Temur wild attunement. |

Unsupported VM-347 Crucible candidates: none.

## Deferred / Follow-Up

- Top-level Mardu/Jeskai `research_links` and `deck_links` were filled in VM-380 from the official Tarkir: Dragonstorm Commander product row. Existing Compass boundaries remain support-only.
- Mardu still has no raw `collision_guidance` array because the existing discriminator coverage was valid and non-broken; pair resolution is covered through Jeskai/Abzan/Temur and Crucible entries.
- No flavor-snippet expansion was performed.
- Broader generated drift exists because the full builder rewrites generated surfaces in a dirty worktree; VM-347 changes were inspected for target support and no generated files were hand-edited.

## VM-349/VM-352/VM-353 Reviewed Field Classifications

This table governs the thickness repair pass for shards and Tarkir clans. A discriminator may be implemented as placement metadata or generated builder text when it is backed by source rows. It is not automatically a Crucible. A Crucible requires a named close-call pair plus reproducible or source-backed confusion.

| Reviewed field or surface | Classification | Allowed source category | Result |
|---|---|---|---|
| Esper `esper_discriminator_0003` | `backed-repair` | Existing Esper placement claim refs and `collision_esper_azorius_live` | Add a discriminator separating lawful procedure from knowledge-built optimization/control. |
| Grixis `grixis_discriminator_0003` | `backed-repair` | Existing Grixis placement claim refs plus false-positive suppressions for Dimir, Rakdos, and Izzet drift | Add a discriminator separating Black-centered survival leverage from secrecy, appetite, or experiment without survival pressure. |
| Naya `naya_discriminator_0003` | `backed-repair` | Existing Naya placement claim refs plus false-positive suppressions for generic RGW, big creatures, tokens, Cabaretti, Selesnya, Gruul, and Boros drift | Add a discriminator separating living-world abundance from size/token/style signals. |
| Abzan `abzan_discriminator_0003` | `backed-repair` | Existing Abzan placement claim refs plus false-positive suppressions for generic WBG, Dromoka, Commander product, graveyard, and toughness drift | Add a discriminator separating house continuity/ancestor duty from generic resilience, graveyard value, or toughness. |
| New Shard/Tarkir Crucibles | `blocked-noncanonical` | Requires named close-call pair plus reproducible/source-backed confusion | Do not add new Crucibles in VM-352; existing VM-347 Crucibles remain. |
| Esper/Grixis/Jund/Naya existing one-row timeline enrichment | `backed-repair` | Prior source-first display enrichment rows from VM-318, VM-319, VM-322, and VM-323 | Preserve existing timeline enrichment where it already traces to raw/research backing. |
| Grixis figure and flavor expansion | `backed-repair / support-only split` | VM-379 official Alara captures plus local Scryfall card anchors | Grixis may surface broad official undead/necromancy/Conflux texture and support-only Sedris/Thraximundar/Malfegor/Grixis Battlemage card anchors. Vithia/Sedraxis, full vis economy, Bolas staging, Nefarox cults, and biographies remain source-intake-needed. |
| Esper/Jund/Naya figure and flavor expansion | `source-intake-needed` | Explicit raw/research backing per field | Do not fill from general MTG knowledge, generated display, snippets, or runtime copy. |
| Abzan/Temur/Sultai Commander Compass fields | `backed-repair-support-only` | Official Tarkir: Dragonstorm Commander product row plus existing support-only Commander rows | VM-380 may expose Compass fields only as `support_only_product_navigation`; not canon, metagame, legality, popularity, or placement evidence. |
| Mardu/Jeskai top-level deck links and research links | `backed-repair-support-only` | Official Tarkir: Dragonstorm Commander product row | VM-380 may expose top-level product/deck/research links while preserving existing support-only Compass boundaries. |
| Existing Mardu/Jeskai Commander Compass link targets | `source-normalization` | Existing support-only Commander/operator rows plus VM-380 official product row | Preserve current Compass `link_targets` and add official product links; do not broaden into canon or recommendation-quality proof. |
| Jeskai flavor snippet count | `source-intake-needed` | Source/index-backed flavor work or builder term correction | Do not invent a third snippet for symmetry. Generated snippet output is only a symptom. |
| Generated placement output, generated snippets, dossier output, and runtime display copy | `blocked-noncanonical` | Symptoms only | Use only to identify gaps or compare rebuilt output; never as canonical evidence. |
