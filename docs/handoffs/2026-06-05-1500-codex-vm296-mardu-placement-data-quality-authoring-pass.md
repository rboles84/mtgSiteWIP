# Handoff: VM-296 Mardu Placement Data Quality Authoring Pass

**Date:** 2026-06-05 15:00
**Agent:** Codex
**Related Card:** VM-296
**Status:** Complete

---

## Task Requested

Bring Mardu Horde placement data from Tier 3 (most broken active faction) to Tier 1 gold standard. The critical deficiency was a structural contradiction: 14 `required_positive_evidence_terms` but `good_fit_indicators = []`, making reliable placement impossible. Secondary deficiencies included system-internal `lore_summary`, guardrail-style `poor_fit_indicators` and `inhibitor_traps`, empty discriminator_question subfields, and missing `raw_enrichment`, `deck_links`, and `edhrec_slug`.

---

## Files Reviewed

- `docs/context/2026-06-05-faction-quality-audit-session-briefing.md`
- `docs/research/mardu/mardu-evidence-ledger.md` — MARDU-EVID-001–031
- `docs/research/mardu/mardu-research-dossier.md`
- `docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md` (via evidence ledger)
- `data/placement-model.json` (MARDU section)
- `data/factions.json` (factions.MARDU root + identity_layers.expressions.MARDU.display)
- `data/archscry-flavor-snippets.json` (MARDU snippets — confirmed existing; not modified)
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

---

## Files Changed

| File | Change |
|---|---|
| `data/placement-model.json` | Filled `identity.mechanics`; trimmed `required_positive_evidence_terms` from 14 to 10; trimmed `strengthens_when_user_centers` from 9 to 4; improved `false_positive_guardrail`; filled `good_fit_indicators` (was `[]`); rewrote `poor_fit_indicators` from 5 guardrails to 2 player signals; rewrote `inhibitor_traps` from copied guardrails to 3 targeted traps; filled `purpose/supports/weakens/collision_targets` on all 3 `discriminator_questions`; updated `source_metadata` (profile_version "2.0", claim_count 10) |
| `data/factions.json` | Rewrote `lore_summary` in both `factions.MARDU` and `identity_layers.expressions.MARDU.display`; extended `drawn_to` to 5 items (root) / 4 condensed (display); rewrote `repelled_by` to 3 genuine identity markers; rewrote `interview_tells` to 5 genuine user signals; added `research_links.edhrec_slug: "mardu"`; added 3 `deck_links` (Alesha, Zurgo, Mardu Commanders); added full `raw_enrichment` block (3 timeline events, 2 key figures, 2 canonical flavor texts) |
| `docs/kanban/board.md` | Added VM-296 at top of Done section |
| `docs/kanban/done/VM-296-mardu-placement-data-quality-authoring-pass.md` | Created |
| `docs/handoffs/HANDOFF_INDEX.md` | Updated (this file) |

---

## What Changed and Why

### `good_fit_indicators` (was `[]`)
The critical structural contradiction: 14 pos_terms signaling Mardu as a plausible match, but 0 indicators telling the engine when a match is actually good. Filled with 3 genuine user-signal bullets grounded in MARDU-EVID-002/003 (speed and commitment), MARDU-EVID-005/006 (war names and code), and MARDU-EVID-003/031 (opportunity-seized-now). These are user-behavior descriptions, not lore guardrails.

### `lore_summary`
The previous content was a system-internal boundary statement naming VM-223 source decisions and metadata handling rules — not faction-voice placement copy. Rewrote using key lore anchors (Edicts of Ilagra, Zurgo, Wingthrone, Alesha, war names) in faction-voice following the Jeskai/WITCH authoring pass patterns.

### `drawn_to` / `repelled_by` / `interview_tells`
- `drawn_to` extended from 4 items to 5. All items rewritten to be player-identity specific rather than system boundary notes.
- `repelled_by` rewritten from 4 internal guardrails to 3 genuine Mardu identity markers (what Mardu actually finds antithetical, not what the data model guards against).
- `interview_tells` rewritten from 4 internal signals to 5 genuine user-behavior signals — what a user actually says, not what the system checks.

### `identity.mechanics`
Empty string filled with prose covering Raid, Dash, and Mardu's broader speed vocabulary (first strike, double strike, direct damage, tokens, reanimation). Grounded in MARDU-EVID-003 (speed as design attribute) without claiming exact card rules text per MARDU-MF-001/002.

### `poor_fit_indicators` / `inhibitor_traps`
Previous versions were copies of system guardrails. Rewritten to player-facing signals. `inhibitor_traps` now leads with the psychological trap (waiting for the perfect opening when the good one is passing) followed by the two poor_fit signals.

### Discriminator questions
All three had empty `purpose`, `supports`, `weakens`, `collision_targets`. Filled using MARDU-EVID evidence ledger:
- Q1: Separates Mardu from Abzan/Jeskai/Sultai/Temur (collision_targets set)
- Q2: Guards RWB false positives from WR/WB/BR (collision_targets set)
- Q3: Timeline boundary enforcement (collision_targets empty per design)

### `research_links` / `deck_links` / `raw_enrichment`
All missing. Added EDHREC slug "mardu", 3 Commander deck_links (Alesha Who Smiles at Death, Zurgo Helmsmasher, Mardu Commanders general pool). Added raw_enrichment with 3 timeline events (Khans-era, Fate Reforged Alesha, Dragonstorm revival), 2 key figures (Zurgo, Alesha), 2 canonical flavor texts (Alesha's Vanguard FRF and Bloodsoaked Champion KTK — both confirmed from archscry-flavor-snippets.json).

### `source_metadata`
Updated profile_version from "0.1.0" to "2.0", placement_model_version to "vox-mana-lore-json-v1", source_review_date to "2026-06-05", claim_count from 0 to 10.

---

## Decisions Made

1. **flavor_snippets not changed** — Existing 3 snippets (Defibrillating Current, Alesha's Vanguard, Bloodsoaked Champion) are faction-specific and pass the gold standard check. Scryfall verification is a separate pass per MARDU-MF-002 pattern.
2. **raw_enrichment canonical_flavor_text: 2 entries (not 3)** — Only used flavor text confirmed in archscry-flavor-snippets.json. Following AGENTS.md hard rule: do not invent card facts.
3. **identity_layers display drawn_to: 4 condensed items** — Follows the established Jeskai identity_layers pattern (display block uses condensed versions).
4. **did not change staples, archetypes, decree_voice, land_base** — Already present and not part of Tier 3 deficiencies. Scope kept tight.
5. **did not change archscry-flavor-snippets.json** — All 3 existing snippets are faction-specific confirmed cards. No action needed.

---

## Risks / Uncertainties

- `Crackling Doom` ("Choose your battles wisely." — Zurgo Helmsmasher) is likely real card flavor text but was not confirmed from snippets/source ledger, so it was excluded from `canonical_flavor_text`. Safe to add later under a dedicated Scryfall verification pass.
- `deck_links` use EDHREC URLs that are standard patterns (`edhrec.com/commanders/alesha-who-smiles-at-death`, etc.) — these were not Scryfall-verified but follow the same URL patterns used for Jeskai and WITCH.
- Full Alesha and Zurgo biographies remain Manual Fill required (MARDU-MF-004, MARDU-MF-005).

---

## Tests Run

```
node -e "require('./data/placement-model.json'); console.log('OK')"  → OK
node -e "require('./data/factions.json'); console.log('OK')"         → OK
node -e "require('./data/archscry-flavor-snippets.json'); console.log('OK')" → OK
```

Spot-check via node eval confirmed all target fields:
- `good_fit_indicators`: 3 ✓
- `pos_terms`: 10 ✓
- `strengthens`: 4 ✓
- `poor_fit_indicators`: 2 ✓
- `inhibitor_traps`: 3 ✓
- discriminator_questions[0-2] collision_targets populated ✓
- `profile_version`: "2.0" ✓
- `claim_count`: 10 ✓
- `factions.MARDU.drawn_to`: 5 ✓
- `factions.MARDU.repelled_by`: 3 ✓
- `factions.MARDU.interview_tells`: 5 ✓
- `factions.MARDU.edhrec_slug`: "mardu" ✓
- `factions.MARDU.deck_links`: 3 ✓
- `raw_enrichment` keys: historical_timeline (3), key_figures (2), canonical_flavor_text (2) ✓
- `identity_layers.expressions.MARDU.display` all synced ✓

---

## Not Touched

- `data/archscry-flavor-snippets.json` — no changes; existing snippets are valid
- `data/raw-factions/` — not touched per hard rules
- Generated output files — not touched
- Temur wording residual (`test:placement` assertion) — not touched per briefing
- `assets/img/identity-hero/witch.webp` unused residual — not touched
- WITCH-MF-002 (Atraxa / Hardened Scales Scryfall verification) — not touched
- Yore / Dune / Glint / Ink four-color placement_axes fixes — separate priority queue items

---

## Follow-Up Recommendations

1. **Mardu Scryfall flavor text verification** — Confirm `Crackling Doom` Zurgo quote and any other card text before adding to canonical_flavor_text.
2. **Next priority queue item: Yore** — Empty placement_axes + over-suppressed (11-12 poor_fit). Research at `docs/research/yore/`. Same Tier 3 → Tier 1 pass.
3. **UR + RG mechanics field** — Quick fix: only `identity.mechanics` is empty. ~10 min each.
4. **Full Alesha / Zurgo biographies** — MARDU-MF-004 and MARDU-MF-005 still open. Requires official source capture.

---

## Next Suggested Agent

JSON Cartographer or Codex → Yore four-color placement_axes authoring pass (VM-297 candidate), or UR/RG mechanics field quick fix.

---

## Related Cards and Docs

- VM-296 — this card
- VM-295 — WITCH Tier 1 authoring pass (pattern reference)
- VM-294 — Jeskai Tier 1 authoring pass (pattern reference)
- VM-223 — Mardu source packet and evidence ledger
- VM-228 — Mardu controlled runtime promotion
