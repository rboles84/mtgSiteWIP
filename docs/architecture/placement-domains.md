# Placement Domains

This document defines the future placement-domain architecture for Vox Mana without changing the current live placement model.

## Current Baseline

The live adaptive placement model currently runs on one active baseline domain:

- `ravnica_strixhaven`

This baseline covers the current 20 active expressions:

- 10 Ravnica guilds
- 5 Strixhaven colleges
- 5 mono colors represented through the identity-layer model

`ravnica_strixhaven` is the current active baseline domain for the existing 20-expression placement model. Do not split Ravnica and Strixhaven into separate domains in this prerequisite slice. Any future split requires a separate architecture decision because it would affect question routing, adjacent-fit behavior, and dossier language.

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

- `ravnica_strixhaven` for the current active 20-expression baseline
- `khans` for the future Khans wedge expansion
- `new_capenna` for the future New Capenna family expansion

Khans and New Capenna are post-v1 roadmap domains only. They are not shipped placement support, do not have live question routing, and do not add runtime domain fields in this slice.

## Current Repo Truth

The current repository shape remains:

- raw source coverage is 15 faction folders under `data/raw-factions/`
- mono coverage is represented through `data/identity-layers.json`
- the adaptive placement model remains the live 20-expression model
- no runtime or generated contract currently carries a live `domain` field

Do not add, rename, or reclassify any expression, faction, guild, college, wedge, family, or mono identity in this slice.

## Future Contract Direction

This prerequisite documents the direction only. It does not implement it.

Future expansion may add a `domain` field to:

- identity-layer expressions
- raw faction source packages

Until that happens:

- `institution_type` remains unchanged
- `data/factions.json` remains unchanged
- `data/placement-model.json` remains unchanged
- `data/placement-model.schema.json` remains unchanged
- `supabase/functions/guild-recruiter/faction-context.ts` remains unchanged

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
