# Ravnica Guild Source-Readiness Matrix

> **CRIT-001 superseding warning:** existing `ready` language records legacy structural or targeted-gap readiness, not semantic certification. This identity cohort is frozen for semantic-foundation work outside CRIT-001 until reviewed under the [Semantic Readiness Contract](semantic-readiness-contract.md).

Created: 2026-06-12
Related cards: VM-343, VM-344, VM-345, VM-349, VM-350

## Purpose

This matrix records the current source-role and placement-readiness state for the ten Ravnica guild raw packets. It is reusable infrastructure for future source-bound guild work: update the row for a guild whenever a later card promotes, demotes, or adds source material.

## Role Rules

- `claim-bearing`: source directly supports an existing raw claim, profile field, or placement field.
- `support-only`: source supports auxiliary context such as rules landing pages, Commander/card/deck support, or set-wide cross-checks, but is not standalone proof for a guild claim.
- `shaping-only`: source frames architecture or interpretation without proving guild facts. No active guild source row needed this role in VM-343.
- `discovery-only`: corpus, query, archive, or reviewed search rows that are useful for discovery but are not safe as standalone claim proof.

Official status alone is not enough for `claim-bearing`; the row must be tied to current raw claim/profile/placement usage. Generated/runtime files are not evidence for this matrix.

Rejected or `not_used_or_rejected_sources` entries are not included in the source row counts below because they are not active source-ledger rows.

## Matrix

| Guild | Key | Raw folder | Source rows | Role counts | Unresolved rows | Claim-bearing coverage | Placement / discriminator readiness | Commander / deck support classification | Future repair notes |
|---|---:|---|---:|---|---:|---|---|---|---|
| Azorius Senate | WU | `data/raw-factions/azorius_senate/` | 13 | `claim-bearing`: 2; `support-only`: 1; `discovery-only`: 10 | 0 | Official overview and mechanics rows cover core identity, mechanics, and placement inference. Story corpus rows remain discovery-only. | Ready for existing placement model; no VM-343 discriminator edit. | Commander Compass material remains product/operator support and must not promote discovery-only story rows by itself. | Future story deep-read could promote specific Azorius story claims, but not needed for this normalization pass. |
| Boros Legion | WR | `data/raw-factions/boros_legion/` | 17 | `claim-bearing`: 5; `discovery-only`: 12 | 0 | Official guide, novel, Boros lore article, Karlov Manor legends article, and mechanics article cover current claim-bearing floor. | Ready for existing placement model; no VM-343 discriminator edit. | Commander/deck support is bounded to existing profile support; story-corpus rows stay discovery-only. | Future official page capture could replace or strengthen novel/story archive dependencies where exact public-source proof is desired. |
| House Dimir | UB | `data/raw-factions/house_dimir/` | 14 | `claim-bearing`: 3; `support-only`: 1; `discovery-only`: 10 | 0 | Official guide, mechanics article, and prerelease primer cover identity, mechanics, and placement inference. | Ready for existing placement model; no VM-343 discriminator edit. | Commander/deck support remains support texture only. | Future deep story pass should promote only source-read story claims, not search-hit claims. |
| Golgari Swarm | BG | `data/raw-factions/golgari_swarm/` | 14 | `claim-bearing`: 3; `support-only`: 1; `discovery-only`: 10 | 0 | Official guide, mechanics article, and prerelease primer cover life/death/decay, undergrowth, and placement inference. | VM-344 added `golgari_q3` to sharpen decay/reclamation/cycle logic against generic resilience, nature, Witherbloom, Abzan, and Jund readings. | Commander/deck support remains support texture only. | Future story promotion can add specific Vraska/Jarad/undercity claims if read and rebound; corpus rows remain discovery-only now. |
| Gruul Clans | RG | `data/raw-factions/gruul_clans/` | 21 | `claim-bearing`: 13; `discovery-only`: 8 | 0 | Official story/mechanics/rules rows and inspected repository archive rows support existing atomic claims, mechanics, profile, and placement fields. | Ready for existing placement model; no VM-343 discriminator edit. | Commander/deck support is profile support only, not claim proof beyond cited source rows. | Future hardening could replace claim-bearing repository archive copies with official Wizards page captures where available. |
| Izzet League | UR | `data/raw-factions/izzet_league/` | 26 | `claim-bearing`: 22; `support-only`: 1; `discovery-only`: 3 | 0 | Official story/mechanics/rules/card-data rows and inspected repository archive rows support existing atomic claims, mechanics, profile, and placement fields. | Semantically ready under CRIT-001 Contract v1.1 via VM-507; approved recovery SHA `d5bca29f3c55d0d69fe8567a69c8326dcc83d770`. | The rules landing page is support-only; card/Commander-adjacent rows are claim-bearing only where existing raw claims cite them. | Non-blocking: future hardening could replace claim-bearing repository archive copies with official Wizards page captures where available; not required for VM-507 certification. |
| Orzhov Syndicate | WB | `data/raw-factions/orzhov_syndicate/` | 13 | `claim-bearing`: 2; `support-only`: 1; `discovery-only`: 10 | 0 | Official overview and mechanics rows cover core identity, mechanics, and placement inference. Story corpus rows remain discovery-only. | Ready for existing placement model; no VM-343 discriminator edit. | Commander/deck support remains support texture only. | Future story deep-read could promote specific Teysa/Kaya/ledger claims if source-read and rebound. |
| Cult of Rakdos | BR | `data/raw-factions/cult_of_rakdos/` | 13 | `claim-bearing`: 2; `support-only`: 1; `discovery-only`: 10 | 0 | Official overview and mechanics rows cover Rakdos identity, spectacle, and placement inference. Story corpus rows remain discovery-only. | VM-344 added `rakdos_q3` to distinguish theatrical truth and transgressive spectacle from generic chaos, grief, sacrifice, reckless emotion, or red-black aggression. | Commander/deck support remains support texture only. | Future story deep-read could promote specific Judith/Rix Maadi/Rakdos claims; current corpus rows stay discovery-only. |
| Selesnya Conclave | WG | `data/raw-factions/selesnya_conclave/` | 14 | `claim-bearing`: 3; `support-only`: 1; `discovery-only`: 10 | 0 | Official guide, mechanics article, and prerelease primer cover identity, mechanics, and placement inference. | Ready for existing placement model; no VM-343 discriminator edit. | Commander/deck support remains support texture only. | Future story promotion should separate Worldsoul/community claims from generic green-white harmony. |
| Simic Combine | UG | `data/raw-factions/simic_combine/` | 13 | `claim-bearing`: 2; `support-only`: 1; `discovery-only`: 10 | 0 | Official overview and mechanics rows cover identity, adapt, and placement inference. Story corpus rows remain discovery-only. | Ready for existing placement model; no VM-343 discriminator edit. | Commander/deck support remains support texture only. | Future story deep-read could promote specific Zegana/Vannifar/biomancy claims if source-read and rebound. |

## Cohort Totals

- Total active source rows: 158.
- `claim-bearing`: 57.
- `support-only`: 9.
- `shaping-only`: 0.
- `discovery-only`: 92.
- Unresolved active source rows: 0.

## VM-349/VM-350 Reviewed Field Classifications

This section is the governing decision record for the Rakdos thickness repair pass. Architecture and metaphysics docs are authored synthesis; they may be expanded from existing claim-bearing backing, but they do not become evidence for raw/profile/placement fields unless a later card promotes the relevant claim through a source or evidence ledger.

| Reviewed field or surface | Classification | Allowed source category | VM-350 result |
|---|---|---|---|
| Cult of Rakdos metaphysics document | `backed-repair` | Existing claim-bearing Rakdos overview/mechanics rows plus `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json` and `data/raw-factions/cult_of_rakdos/cult_of_rakdos.placement.json` claim references | Expand doc synthesis around performance as truth pressure, spectacle as social valve, cost/audience/consequence, and spectacle/unleash as mechanical mirrors. |
| Cult of Rakdos raw profile and placement fields | `blocked-noncanonical` | None for this card | Do not modify raw/profile/placement fields from architecture prose. Existing VM-344 placement discriminator remains the active source-bound placement repair. |
| Judith, Rix Maadi, Rakdos figure/story expansion | `source-intake-needed` | Future story deep-read or promoted source-ledger rows only | Do not add new story detail. Discovery-only corpus rows remain discovery-only. |
| Existing display affinity, generated dossier copy, generated snippets, and runtime output | `blocked-noncanonical` | Symptoms only | May be compared for thinness, but cannot prove or preserve a field unless the source path traces back to official researched data. |
| Commander/deck recommendation expansion | `source-intake-needed` | Approved Commander recommendation rows only | No Commander Compass, deck-link, or recommendation expansion in VM-350. |

## Update Checklist

When a future guild card changes source state:

1. Update the affected `data/raw-factions/<folder>/<folder>.sources.json` role rows.
2. Recalculate this matrix row and the cohort totals.
3. Record whether any discovery-only row became claim-bearing, and name the claim/profile/placement field that justifies the promotion.
4. Rebuild generated artifacts only through approved scripts if raw profile or placement behavior changed.
5. Record validation results in the card and handoff.
