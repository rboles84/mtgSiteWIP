# Placement Domains

This document defines the future placement-domain architecture for Vox Mana while preserving the current no-domain runtime contract.

## Current Baseline

The live adaptive placement model currently runs without a runtime `domain` field. Its documented baseline domain remains:

- `ravnica_strixhaven`

The live placement set is now the current 37-identity runtime:

- 10 Ravnica guilds
- 5 Strixhaven colleges
- 5 mono colors represented through the identity-layer model
- 5 controlled Alara shard pilots: `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`
- 5 controlled wedge pilots: `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, `JESKAI`
- 5 controlled four-color identities: `YORE`, `GLINT`, `DUNE`, `INK`, `WITCH`
- controlled `COLORLESS`
- controlled `WUBRG`

`ravnica_strixhaven` is still the current baseline-domain decision for the historical 20-expression baseline. Later shard, wedge, four-color, Colorless, and WUBRG identities are layered into the live placement set without adding a live domain selector, creating public route keys for those groups, or splitting Ravnica and Strixhaven into separate runtime domain contracts. Any future split requires a separate architecture decision because it would affect question routing, adjacent-fit behavior, and dossier language.

## What A Domain Owns

A placement domain is a future grouping above individual expressions or factions. A domain owns:

- question vocabulary and question-bank partitioning
- decree or result-template voice
- adjacent-fit behavior
- Commander Compass routing and filtering expectations
- Apocrypha or archive filtering expectations

Domains are meant to organize how Vox Mana reasons about groups of expressions. They are not a second placement system running beside the current model.

## Domain Map

The documented domain map is:

- `ravnica_strixhaven` for the historical 20-expression baseline that still anchors the current no-domain runtime alongside later shard, wedge, four-color, Colorless, and WUBRG identities
- `khans` for the future Khans wedge expansion
- `new_capenna` for the future New Capenna family expansion

Khans and New Capenna are post-v1 roadmap domains only. They do not have live domain routing or runtime domain fields in this slice. The Alara shard pilots, live wedge pilots, four-color identities, Colorless, and WUBRG do not create separate live runtime domains or broad domain selectors.

## Current Repo Truth

The current repository shape remains:

- raw source coverage is 37 faction folders under `data/raw-factions/`
- mono coverage is represented through raw mono packets and `data/identity-layers.json`
- the adaptive placement model is the live 37-identity set: the historical 20-expression baseline plus `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, `JESKAI`, `YORE`, `GLINT`, `DUNE`, `INK`, `WITCH`, `COLORLESS`, and `WUBRG`
- no runtime or generated contract currently carries a live `domain` field

The 37-identity live set does not mean domain taxonomy should be inflated by this card. Do not add, rename, or reclassify any further expression, faction, guild, college, shard, wedge, four-color, colorless, five-color, family, or mono identity without a separate card.

## Future Contract Direction

This prerequisite documents the direction only. It does not implement it.

Future expansion may add a `domain` field to:

- identity-layer expressions
- raw faction source packages

Until that happens:

- `institution_type` remains unchanged
- generated artifacts continue to omit a live `domain` field
- `BANT`, `ESPER`, `GRIXIS`, `JUND`, and `NAYA` use `institution_type: "shard"` through the existing identity-layer enum
- `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, and `JESKAI` use `institution_type: "wedge"` through the existing identity-layer enum
- `WUG`, `WUB`, `UBR`, `BRG`, and `RGW` may remain color-direction/query metadata, but must not become expression keys, public aliases, route keys, placement keys, dossier keys, or Home preview identifiers
- `WBG`, `GUR`, `BGU`, `RWB`, `WBR`, `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, and same-color-order permutations may remain color-direction/query metadata, but must not become expression keys, public aliases, route keys, placement keys, dossier keys, or Home preview identifiers

The identity-layer system already has room for `wedge` as a category. `family` is not a current live identity-layer category and requires a separate schema and version decision before any New Capenna implementation begins.

## Future UX Direction

Future domain selection should be gate-detected from placement inputs and results, not exposed as an upfront user selector in this prerequisite slice.

The intended long-term flow is:

- Gate detects broad domain affinity
- Hall asks domain-aware questions
- Crucible resolves close matches inside or across planned domain rules when needed

This prerequisite does not add domain-aware Gate, Hall, or Crucible behavior. It only establishes the architectural home for that later work.

## Out Of Scope

The following are not part of live placement support in this slice:

- Khans wedges
- New Capenna families
- Dragonlord broods as parallel placement options
- Ixalan factions as a placement domain
- plot factions such as Gatewatch, Phyrexians, Cabal, Coalition, Order of Heliud, Consulate, or Renegades

Dragonlord broods, Ixalan factions, and plot factions stay in future overlay or research lanes unless a separate architecture decision promotes them into placement work.
