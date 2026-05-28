# Vox Mana Data Contracts

## Faction data layers

Vox Mana now uses a raw-plus-generated data flow:

- `data/identity-layers.json` is the canonical identity-layer source for mono colors, expression routing, shared color language, and the Home identity preview registry.
- `data/identity-layers.schema.json` describes the identity-layer and Home preview registry contract.
- `data/precons/vox-mana-precons.source.json` is the canonical precon source catalog for Archscry dossier recommendations.
- `data/precons/vox-mana-precons.source.schema.json` describes the hand-authored precon source contract.
- `data/taxonomy/vox-mana-precon-themes.json` is the hand-authored precon theme taxonomy used to normalize theme language.
- `data/taxonomy/vox-mana-precon-themes.schema.json` describes the hand-authored precon theme taxonomy shape.
- `data/precons/vox-mana-precon-catalog.json` is the generated runtime precon catalog used by dossier rendering.
- `data/precons/vox-mana-precon-catalog.schema.json` describes the generated precon catalog shape.
- `data/raw-factions/` keeps the raw faction folders, claims, placement guidance, and source metadata for provenance.
- `data/factions.json` is the generated display surface used by dossier rendering.
- `data/placement-model.json` is the generated adaptive placement model used by Archscry.
- `data/placement-model.schema.json` describes the generated placement model shape.
- `supabase/functions/guild-recruiter/faction-context.ts` is the generated server-side Scrying Terminal context.

After changing identity layers, raw faction data, or display data, run `npm run build:factions` from `C:\dev\mtgSiteWIP`.

After changing the precon source catalog or precon theme taxonomy, run `npm run build:precons` from `C:\dev\mtgSiteWIP`.

## Identity preview registry

`data/identity-layers.json` owns the canonical Home preview metadata for the current 20-expression carousel. `assets/js/newindex2.js` fetches this registry, selects entries where `preview_eligible` is `true`, sorts by `preview_order`, and keeps `data/factions.json` as the lore-note source.

Every expression entry must include:

- `display_code`
- `aliases`
- `placement_eligible`
- `preview_eligible`

When `preview_eligible` is `true`, the entry must also include:

- `preview_order`
- `preview_label`
- `preview_title`
- `preview_text`
- `preview_hex`
- `preview_scores`

`preview_scores` uses the Home radar axis order:

- `order`
- `knowledge`
- `ambition`
- `freedom`
- `growth`

The identity-layer institution enum is `guild`, `college`, `color`, `shard`, `wedge`, `four_color`, `five_color`, and `colorless`. It does not include `family`; a New Capenna or family-like grouping needs a separate runtime definition before schema inclusion.

Display codes may preserve user-facing color-pair order while canonical keys stay WUBRG-normalized. For example, Selesnya is keyed as `WG` with `display_code: "GW"`, Simic is keyed as `UG` with `display_code: "GU"`, and Boros is keyed as `WR` with `display_code: "RW"`.

Each faction entry contains:

- `key`
- `name`
- `institution_type`
- `world`
- `colors`
- `accent`
- `banner`
- `tagline`
- `philosophy`
- `lore_summary`
- `core_tension`
- `affinity`
- `decree_voice`
- `archetypes`
- `staples`
- `land_base`
- `deck_links`
- `research_links`
- `layered_identity`

The frontend dossier renders from this file.

The edge function imports `supabase/functions/guild-recruiter/faction-context.ts`, which is a condensed artifact generated from the same raw and display content.

## Precon recommendation artifacts

The Archscry precon layer uses its own raw-plus-generated lane:

- `data/precons/vox-mana-precons.source.json` keeps the checked-in authoring source for curated Commander precons.
- `data/taxonomy/vox-mana-precon-themes.json` keeps the normalized Commander theme language used for ranking and presentation.
- `research/build-precon-artifacts.mjs` validates both source files, normalizes color identity and theme metadata, and emits the runtime artifact.
- `research/import-precon-mechanics-validation.mjs` is a Node-only staging importer for the completed XLSX mechanics workbook. It updates canonical source JSON only, and the workbook is never browser/runtime input.
- `data/precons/vox-mana-precon-catalog.json` is the browser-loaded runtime surface for dossier precon cards.
- Precon source text is expected to stay UTF-8 clean. The builder now fails on `U+FFFD` replacement characters so corrupted commander names do not silently ship into rendered cards or outbound links.
- VM-139 imported the completed 155-row mechanics validation workbook. All 155 rows were marked safe for placement dossier use; the workbook provenance notes 130 rows where mechanics changed, while the importer reports actual changed/unchanged counts from normalized source comparison.
- Source and generated precon contracts now require `creatureTypeFocus` as `string | null`. Blank, `None`, `N/A`, non-tribal, role-agnostic, and other non-typal workbook values become `null`; runtime search/match terms omit `null` instead of stringifying it.
- The mechanics MVP rule is 3-6 source-supported gameplay tags per deck. `Typal synergy`, `unclear from source`, `none`, and `n/a` are not valid mechanic tags. Typal focus requires a real validated axis; generic `Typal synergy` is not allowed.
- VM-139 did not modify `secondaryCommanders` and did not implement the future `secondCommanderRecommendation` v3 schema.

Each generated precon entry contains:

- `slug`
- `sourceIndex`
- `sourcePage`
- `productSection`
- `deckName`
- `mainCommander`
- `secondaryCommanders`
- `factionRefs`
- `colors`
- `colorIdentityKey`
- `normalizedThemes`
- `scores`
- `recommendationProfile`
- `learningProfile`
- `mechanics`
- `creatureTypeFocus`
- `matchTerms`
- `matchWords`
- `searchTerms`

`factionRefs` uses current Vox Mana expression keys from the active 20-expression atlas. It lets the dossier distinguish faction-native decks such as `SILVERQUILL` or `UG` from generic same-color alternatives.

The dossier presenter layer decides `nativeExact`, `otherExact`, and `stretch` lanes at runtime from the active dossier view. That grouping result is not stored back into the generated catalog.

## Adaptive placement model

`data/placement-model.json` contains:

- `scoring_rules` for equal priors, likelihood-to-log-delta mapping, pruning, softmax confidence, and lateral inhibition.
- `stages` for the Gate, Hall, and Crucible flow.
- `factions` with identity, biological-expression framing, placement axes, good/poor-fit indicators, inhibitor traps, discriminator questions, and lateral inhibition targets.
- `question_bank` with structured Gate, Hall, and Crucible answer cards.

The model treats faction placement as a Vox Mana interpretive taxonomy, not official Wizards canon and not an objective personality diagnosis.

## Placement result

All result-producing paths should converge on this shape:

```json
{
  "version": "2026-05-10",
  "model_version": "vox-mana-adaptive-placement-v1",
  "source_mode": "quick",
  "faction": "WU",
  "faction_name": "Azorius Senate",
  "institution_type": "guild",
  "world": "Ravnica",
  "identity": {
    "core_color": "W",
    "secondary_colors": [
      "U"
    ],
    "secondary_color": "U",
    "expression_key": "WU",
    "expression_name": "Azorius Senate",
    "expression_kind": "guild",
    "purity": null
  },
  "decree": "Personalized decree text.",
  "confidence": 0.78,
  "confidence_gap": 0.08,
  "mana_scores": {
    "W": 8,
    "U": 10,
    "B": 2,
    "R": 1,
    "G": 3
  },
  "top_matches": [
    {
      "rank": 1,
      "faction": "WU",
      "faction_name": "Azorius Senate",
      "institution_type": "guild",
      "world": "Ravnica",
      "identity": {
        "core_color": "W",
        "secondary_colors": [
          "U"
        ],
        "secondary_color": "U",
        "expression_key": "WU",
        "expression_name": "Azorius Senate",
        "expression_kind": "guild",
        "purity": null
      },
      "score": 18.4,
      "confidence": 0.78,
      "reason": "Short explanation."
    }
  ],
  "adjacent_matches": [
    {
      "rank": 2,
      "faction": "SILVERQUILL",
      "faction_name": "Silverquill College",
      "institution_type": "college",
      "world": "Strixhaven",
      "identity": {
        "core_color": "W",
        "secondary_colors": [
          "B"
        ],
        "secondary_color": "B",
        "expression_key": "SILVERQUILL",
        "expression_name": "Silverquill College",
        "expression_kind": "college",
        "purity": null
      },
      "score": 16.8,
      "confidence": 0.7,
      "reason": "Short explanation."
    }
  ],
  "starter_profile": {
    "format_interest": "commander",
    "budget_band": "mid",
    "experience_level": "returning"
  },
  "evidence_trail": [
    {
      "stage": "gate",
      "question_id": "gate_pressure_trust",
      "signal": "procedure as protection"
    }
  ],
  "stage_history": [
    {
      "stage": "gate",
      "question_id": "gate_pressure_trust",
      "answer_title": "A process that binds everyone"
    }
  ]
}
```

Notes:

- `institution_type` uses the identity-layer institution enum: `guild`, `college`, `color`, `shard`, `wedge`, `four_color`, `five_color`, or `colorless`. Current placement outputs use the active 20-expression set: guilds, colleges, and mono colors.
- `identity` is the layered identity block used by dossier rendering, routing, and compatibility recovery.
- `color_weights` is an optional field. Phase 0 does not fabricate or approximate it when the current scoring model cannot derive it accurately.
- `top_matches` and `adjacent_matches` should carry `identity` entries so the presenter layer does not need to infer mono or pair structure from display names alone.

## Profile storage

The Supabase `profiles` row should keep compatibility fields plus the richer result payload:

- `guild`
- `scores`
- `taken_at`
- `display_name`
- `avatar_url`
- `placement_result`

`placement_result` is the source of truth for saved-return behavior.
