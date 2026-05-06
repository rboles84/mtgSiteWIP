# Vox Mana Data Contracts

## Canonical faction data

`data/factions.json` is the single checked-in source of truth for faction rendering.

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

The frontend renders from this file.

The edge function imports `supabase/functions/guild-recruiter/faction-context.ts`, which is a condensed artifact generated from the same canonical content.

## Placement result

All result-producing paths should converge on this shape:

```json
{
  "version": "2026-05-05",
  "source_mode": "quick",
  "faction": "WU",
  "faction_name": "Azorius Senate",
  "institution_type": "guild",
  "world": "Ravnica",
  "decree": "Personalized decree text.",
  "confidence": 0.78,
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
  }
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
