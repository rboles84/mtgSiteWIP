# Jund Evidence Ledger

**Faction:** Jund
**Plane:** Alara
**Date:** 2026-05-30
**Kanban Card:** VM-176

This ledger assigns stable `JUND-EVID-###` evidence row IDs for downstream Jund phases. Later architecture, docs parity, and raw-faction work must cite these row IDs directly. Do not cite seed-file headings, generated HTML sections, or raw Commander rows as promoted evidence IDs.

Classifications:

- **Promoted:** Safe to carry into downstream Jund architecture as a sourced claim.
- **Promoted boundary:** Safe as a constraint on what Jund must not become.
- **Support-only:** Useful context, but not a promoted canon claim.
- **Vox Mana synthesis:** Internal product/operator interpretation, not MTG canon.
- **Manual fill required:** Do not promote until stronger local evidence is added.

---

## Part A - Claim Evidence Table

| Evidence ID | Claim Summary | Source ID / Path | Source Tier | Confidence / Status | Classification |
|---|---|---|---|---|---|
| JUND-EVID-001 | Jund is the black-red-green shard discussed in the official Jund Week Rosewater article. | JND-SRC-001 | Tier 1 | High | Promoted |
| JUND-EVID-002 | Jund's packet color direction is BRG, normalized from the local official "black-red-green shard" wording and the repo's three-color direction convention. | JND-SRC-001; JND-SRC-002 | Tier 1 / Tier 1A | High | Promoted |
| JUND-EVID-003 | Red is the center/design lens for the Jund shard article. | JND-SRC-001 | Tier 1 | High | Promoted |
| JUND-EVID-004 | Red's Jund frame centers being true to oneself, following gut instinct, not letting others block the self, and doing what feels right. | JND-SRC-001 | Tier 1 | High, design philosophy only | Promoted |
| JUND-EVID-005 | Red's Jund frame treats emotion as a powerful primal guide rather than as something to deny, repress, or over-rationalize. | JND-SRC-001 | Tier 1 | High, design philosophy only | Promoted |
| JUND-EVID-006 | In the Jund article, Red describes Jund as a world of total freedom where action and survival carry consequences. | JND-SRC-001 | Tier 1 | High for article framing; do not expand to detailed geography | Promoted |
| JUND-EVID-007 | Black supports Red's Jund frame through self-interest, personal needs, contentment, and opposition to White's constraints. | JND-SRC-001 | Tier 1 | High, design philosophy only | Promoted |
| JUND-EVID-008 | Green supports Red's Jund frame through being unrestrained, not overthinking, and a feral/rampaging side. | JND-SRC-001 | Tier 1 | High, design philosophy only | Promoted |
| JUND-EVID-009 | The Red/Black/Green Jund synthesis in the article can support language about allies backing Red's destructive side and letting loose. | JND-SRC-001 | Tier 1 | High for design framing; not permission for generic cruelty | Promoted |
| JUND-EVID-010 | White and Blue are the missing enemy-color pressures in the Jund shard frame. VM-176 may describe their absence as reduced imposed conformity/order and reduced detached over-analysis only at the design-philosophy level. | JND-SRC-001; JND-SRC-002 | Tier 1 / Tier 1A | High for color opposition and BRG absence; scoped to design | Promoted with source note |
| JUND-EVID-011 | The normalized canon audit identifies the Jund Rosewater file as the primary Jund identity source and the Alara protocol as relevant shard support. | JND-SRC-002; JND-SRC-003 | Tier 1A | High for repo truth | Promoted |
| JUND-EVID-012 | Jund must not be flattened into "Red violence" or generic anger; the official source explicitly distinguishes Red from the stereotype of just smashing things. | JND-SRC-001 | Tier 1 | High as boundary | Promoted boundary |
| JUND-EVID-013 | Jund must not be flattened into generic savage nature, generic devour midrange, or generic Modern "Jund midrange"; those are not the promoted identity floor. | JND-SRC-001; VM-176 process directive | Tier 1 / Process directive | High as boundary | Promoted boundary |
| JUND-EVID-014 | The Alara protocol/codex cluster supports shard discovery context, but VM-176 does not use it to promote detailed Jund setting, creature, place, or story claims. | JND-SRC-004; JND-SRC-005 | Tier 2 | Medium support only | Support-only |
| JUND-EVID-015 | Local Scryfall data may support Jund-associated card facts or mechanics when queried, but it does not independently prove Jund story claims. | JND-SRC-006 | Tier 2C | High for card facts; not story proof | Support-only |
| JUND-EVID-016 | Exact BRG Commander JSONL extraction returns six operator-support rows: Blight Curse, World Shaper, Graveyard Overdrive, Nature's Vengeance, Power Hungry, and Riveteers Rampage. | JND-SRC-007 | Tier 2P | High for row count and row names | Support-only |
| JUND-EVID-017 | Exact BRG Commander rows may support operator language around counters, lands, graveyards, sacrifice, tokens, combat pressure, and value engines, but not Jund canon or setting claims. | JND-SRC-007 | Tier 2P | High as product/operator support | Support-only |
| JUND-EVID-018 | Official Red/Black/Green, Rakdos, Golgari, Gruul, allied, and enemy color articles may support color-philosophy and pair-overlap rows only. | JND-SRC-008 through JND-SRC-012; VM-176 process directive | Tier 2 color philosophy / Process directive | High as source-use rule | Support-only |
| JUND-EVID-019 | Naya and Grixis official shard articles may be used as comparator rails only, not as Jund evidence. | JND-SRC-013; VM-176 process directive | Tier 2 comparator / Process directive | High as boundary | Support-only |
| JUND-EVID-020 | Generated HTML may be used only to understand existing packet shape, headings, and formatting precedent; it must not be used as canon evidence for Jund claims. | JND-SRC-005; source-material register | Tier 2 structure / Tier 3 seed | High as process boundary | Support-only |
| JUND-EVID-021 | Working Vox Mana language may describe Jund as freedom through instinct, appetite, survival, consumption, volatile growth, and action under pressure only when labeled as synthesis from the promoted rows. | JUND-EVID-004 through JUND-EVID-010; JUND-EVID-016 through JUND-EVID-018 | Mixed | Medium as internal synthesis | Vox Mana synthesis |
| JUND-EVID-022 | Existing Jund seed files are unmanaged and cannot be silently promoted because they include stale VM-161 labels, mojibake risk, external/community citation risk, generated HTML, and over-promoted claims. | `docs/research/jund/source-material/` files; JND-SRC-005 | Tier 3 | High as local audit finding | Promoted boundary |
| JUND-EVID-023 | VM-176 leaves Jund non-live and does not create architecture docs, raw-faction JSON, generated artifacts, builders, runtime, schemas, Maze files, routes, Home preview changes, Supabase logic, generated data snapshots, placement fixtures, route maps, browser bundles, or test fixture rewrites. | VM-176 process directive; local file checks | Process directive / repo inspection | High | Promoted boundary |

---

## Part B - Manual-Fill Evidence Rows

These rows are important but cannot be promoted in VM-176.

| Manual ID | Claim Summary | Current Source State | Confidence / Status | Classification |
|---|---|---|---|---|
| JUND-MF-001 | Detailed Jund geography, settlements, named places, ecology, species, and social structures from official Alara guides or stories. | Seed files and support artifacts may contain leads, but no approved local official capture is bound here. | Discovery only | Manual fill required |
| JUND-MF-002 | Named figure biographies for Kresh, Meren, Rakka Mar, Karrthus, Sarkhan Vol, or other Jund-associated characters beyond local card facts. | Seed files and possible card-data leads only. | Card facts require separate extraction; biography not promoted. | Manual fill required |
| JUND-MF-003 | Devour as the whole Jund identity, detailed predator ecology, or a complete social metaphysics. | Local card data may support specific card mechanics; the full identity claim needs official support. | Do not promote as identity floor. | Manual fill required |
| JUND-MF-004 | Conflux and post-Conflux chronology involving Jund, other shards, or named invasions. | Seed/source leads only. | Needs official capture. | Manual fill required |
| JUND-MF-005 | Modern constructed "Jund midrange" or "Jund 'em out" as Jund canon or metaphysics. | Seed lead/player-culture context only. | Not a Jund canon claim. | Manual fill required |
| JUND-MF-006 | Specific claims from generated HTML or seed headings that are not independently supported by JND-SRC-001 or another approved source. | Tier 3 only. | Do not promote. | Manual fill required |

---

## Part C - Anti-Bleed Guardrails

| Near Match | Jund Distinction |
|---|---|
| Naya | Do not replace Jund's Red-centered freedom/instinct/survival frame with Naya's Green-centered communal/behemoth ecology. |
| Grixis | Do not import Grixis's Black-centered death, necromancy, vis, or survival-through-exploitation shard identity. |
| Gruul | Do not equate Jund with Gruul's civilization-rejection axis; RG overlap is support-only, not Jund proof. |
| Rakdos | Do not equate Jund with Rakdos performance, cruelty, or spectacle; BR overlap is support-only. |
| Golgari | Do not equate Jund with Golgari lifecycle, rot, undercity, or social recycling; BG overlap is support-only. |
| Witherbloom | Do not use school-family life-drain or pest ecology as Jund evidence. |
| Riveteers | Do not use New Capenna labor/family identity as Jund evidence, even when a Commander row is BRG. |
| Modern Jund midrange | Do not treat constructed format culture as Jund setting, creature, place, story, or metaphysics evidence. |

---

## Retention Rule

Any downstream paragraph about Jund must cite one or more `JUND-EVID-###` rows. If a paragraph cannot cite a promoted row, support-only row, or `Vox Mana synthesis` row, it belongs in [jund-manual-fill.md](jund-manual-fill.md) until a local official capture is added.
