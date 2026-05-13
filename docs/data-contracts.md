# Vox Mana Data Contracts

## Faction data layers

Vox Mana now uses a raw-plus-generated data flow:

- `data/raw-factions/` keeps the raw faction folders, claims, placement guidance, and source metadata for provenance.
- `data/factions.json` is the generated display surface used by dossier rendering.
- `data/placement-model.json` is the generated adaptive placement model used by Archscry.
- `data/placement-model.schema.json` describes the generated placement model shape.
- `supabase/functions/guild-recruiter/faction-context.ts` is the generated server-side Scrying Terminal context.

After changing raw faction data or display data, run `npm run build:factions` from `C:\dev\projectFiles\voxmana-tools`.

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

The frontend dossier renders from this file.

The edge function imports `supabase/functions/guild-recruiter/faction-context.ts`, which is a condensed artifact generated from the same raw and display content.

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

## Profile storage

The Supabase `profiles` row should keep compatibility fields plus the richer result payload:

- `guild`
- `scores`
- `taken_at`
- `display_name`
- `avatar_url`
- `placement_result`

`placement_result` is the source of truth for saved-return behavior.
