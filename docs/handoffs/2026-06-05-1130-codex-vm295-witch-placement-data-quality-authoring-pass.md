# Handoff — Codex — VM-295 Witch Placement Data Quality Authoring Pass

**Agent:** Codex
**Date:** 2026-06-05 11:30
**Related Card:** VM-295

---

## Task Requested

Bring the WITCH faction placement data from Tier 3 / stub to Tier 1 gold standard. WITCH had been promoted live via VM-269 (controlled runtime promotion) and VM-293 (identity-hero hookup) without a corresponding data-quality authoring pass. This pass retroactively audits and elevates `data/archscry-flavor-snippets.json`, `data/factions.json`, and `data/placement-model.json` to match the Boros Legion gold-standard baseline.

---

## Files Reviewed

- `AGENTS.md` — confirmed required workflow, hard rules, handoff fields
- `docs/kanban/board.md` — confirmed next available ID (VM-295), most recent done card (VM-294)
- `docs/handoffs/HANDOFF_INDEX.md` — confirmed table format and most recent entry pattern
- `docs/kanban/done/VM-294-jeskai-placement-data-quality-authoring-pass.md` — used as structural template
- `data/archscry-flavor-snippets.json` — reviewed WITCH entry (3 garbage auto-matched snippets)
- `data/factions.json` — reviewed WITCH root entry and identity_layers display block
- `data/placement-model.json` — reviewed WITCH entry (profile_version 0.1.0, claim_count 0, empty axes)
- `docs/research/witch/witch-lore-source-packet.md` — Product Copy Seed (primary lore authority)
- `docs/research/witch/witch-evidence-ledger.md` (WITCH-EVID-001 through WITCH-EVID-011)
- GWUB Four-Color Identity Research.md — identity and mechanics grounding

---

## Files Changed

- `data/archscry-flavor-snippets.json` — WITCH entry: replaced all 3 garbage auto-matched snippets with faction-specific cards
- `data/factions.json` — WITCH root entry and identity_layers display block: lore_summary, affinity (drawn_to/repelled_by/interview_tells), research_links, deck_links, raw_enrichment all updated
- `data/placement-model.json` — WITCH entry: identity.mechanics, placement_axes, good_fit_indicators, poor_fit_indicators, inhibitor_traps, discriminator_questions, source_metadata all updated

---

## What Changed

### `data/archscry-flavor-snippets.json`

Replaced all 3 garbage auto-matched WITCH snippets (Access Denied / Aberrant Manawurm / Abyssal Harvester — none faction-specific) with:

1. **Witch-Maw Nephilim (GPT):** "When it awoke, it shattered the hillsides to make way for its passage." — confirmed verbatim from research
2. **Atraxa, Praetors' Voice (C16):** "While each praetor claimed a part of her, she became more than any of them intended." — needs Scryfall confirmation (WITCH-MF-002)
3. **Hardened Scales (KTK):** "Even the smallest growth can tip the scales." — needs Scryfall confirmation

### `data/factions.json`

WITCH root entry (and identity_layers display block):
- `lore_summary`: replaced generic metadata prose with faction-voice text from approved Product Copy Seed in witch-lore-source-packet.md
- `affinity.drawn_to`: 4 items → 5 items, rewritten with identity-specific specificity
- `affinity.repelled_by`: 4 guardrail-heavy items → 3 genuine identity markers
- `affinity.interview_tells`: 3 items → 5 real user-signal tells
- `research_links`: `{}` → `{"edhrec_slug": "growth"}`
- `deck_links`: absent → 3 Commander entries anchored in WITCH-EVID-005 (Atraxa Praetors' Voice, Atraxa Grand Unifier, Breed Lethality precon)
- `raw_enrichment`: absent → full block added (2 timeline events: Guildpact 2006 + Commander 2016; 3 key figures: Witch-Maw Nephilim, Atraxa Praetors' Voice, Atraxa Grand Unifier; 3 canonical flavor text entries)

### `data/placement-model.json`

WITCH entry:
- `identity.mechanics`: `""` → "Proliferate and +1/+1 counter mechanics express GWUB philosophy directly: no resource materializes from nothing, but every existing investment quietly compounds."
- `placement_axes.required_positive_evidence_terms`: `[]` → 12 terms (cultivate, accumulate, patient, inevitable, compound, protect, structure, long-term, scale, architecture, deliberate, systematic)
- `placement_axes.strengthens_when_user_centers`: `[]` → 5 scenarios
- `placement_axes.suppress_when_user_centers`: `[]` → 5 scenarios
- `placement_axes.false_positive_guardrail`: `""` → full guardrail text
- `good_fit_indicators`: 5 frame-descriptions → 3 real user-signal bullets
- `poor_fit_indicators`: 13 items → 3 targeted entries
- `inhibitor_traps`: 15 items → 3 targeted entries
- `discriminator_questions`: 2 empty stubs → 3 full questions each with purpose, supports, weakens, collision_targets, evidence_claim_ids
- `source_metadata`: profile_version "0.1.0" → "2.0", claim_count 0 → 11

---

## Why It Changed

WITCH was promoted live (VM-269/VM-293) but the placement data authoring pipeline (corresponding to Jeskai's VM-294 or Boros gold standard) was never executed. The faction's flavor snippets were garbage auto-matches with no WITCH thematic relevance. The placement model was effectively non-functional: empty axes, no evidence-grounded terms, no discriminator logic. This pass brings WITCH to the same Tier 1 standard used for all other actively-placed factions.

---

## Decisions Made

- Used WITCH-EVID-001 through WITCH-EVID-011 (VM-264 evidence ledger) as the exclusive claim authorities. No new lore was invented.
- Used witch-lore-source-packet.md Product Copy Seed as the lore_summary voice authority.
- Used Boros Legion as the structural gold-standard baseline (12 claims, 10 pos_terms, 3 good_fit, 2-3 poor_fit, 3 inhibitor_traps, 3 discriminator questions).
- Witch-Maw Nephilim snippet is confirmed verbatim from research. Atraxa and Hardened Scales are flagged for Scryfall verification (WITCH-MF-002) — not blocking for Tier 1 classification but should be resolved.
- edhrec_slug set to "growth" per WITCH-EVID-005.
- Retroactive card numbering: VM-295 (work completed before VM-294 Jeskai tracking).

---

## Risks / Uncertainties

- Atraxa, Praetors' Voice (C16) and Hardened Scales (KTK) flavor text excerpts need Scryfall confirmation — tracked as WITCH-MF-002. These are the only unverified data points in this pass.
- Raw faction JSON hashes were not regenerated; downstream hash-validation tooling will see the WITCH entry as changed.
- No runtime artifacts, generated outputs, or route files were touched in this pass.
- Temur placement wording residual (open since VM-269, `expected blue-red-green, actual green-blue-red`) remains unaddressed.

---

## Tests Run

- `node -e "require('./data/archscry-flavor-snippets.json'); console.log('OK')"` — passed clean
- `node -e "require('./data/factions.json'); console.log('OK')"` — passed clean
- `node -e "require('./data/placement-model.json'); console.log('OK')"` — passed clean

---

## Not Touched

- Raw faction JSON hashes (`data/raw-factions/`)
- Runtime files and generated outputs
- Route files or HTML
- Temur placement wording (VM-269 residual — leave for Temur authoring pass)
- `assets/img/identity-hero/witch.webp` (file exists but is unused; separate cosmetic pass)
- JESKAI placement data (completed separately as VM-294)

---

## Follow-Up Recommendations

1. **Scryfall verification for WITCH-MF-002** — Confirm Atraxa, Praetors' Voice (C16) and Hardened Scales (KTK) flavor text against Scryfall. Low effort, closes the only open flag from this pass.
2. **Mardu placement data quality pass (VM-296 candidate)** — Mardu has 14 pos_terms but 0 good_fit_indicators, a structural contradiction that makes it the most broken active faction post-Jeskai fix. Priority target.
3. **Yore/Dune/Glint/Ink placement passes** — all have empty placement_axes; over-suppressed (11-12 poor_fit vs gold standard 2-3).
4. **UR + RG mechanics field** — targeted single-field fix; quick pass.
5. **Temur placement wording residual** — leave for dedicated Temur authoring pass; do not fix in isolation.

---

## Next Suggested Agent

- **JSON Cartographer** — to validate the WITCH Tier 1 placement data structure against the contract schema, or to begin the Mardu data quality pass.
- **Planning Architect** — if a broader data-quality sprint across remaining Tier 2/3 factions is desired.

---

## Related Kanban Card, Docs, or Plans

- **VM-295** — `docs/kanban/done/VM-295-witch-placement-data-quality-authoring-pass.md`
- **VM-264** — Witch Source Packet And Evidence Ledger (primary claim authority for this pass)
- **VM-269** — Witch Controlled Runtime Promotion
- **VM-293** — Witch Identity-Hero Background Dossier Hookup
- **VM-294** — Jeskai Placement Data Quality Authoring Pass (immediate prior data-authoring card)
- `data/archscry-flavor-snippets.json`
- `data/factions.json`
- `data/placement-model.json`
- `docs/research/witch/witch-lore-source-packet.md`
- `docs/research/witch/witch-evidence-ledger.md`
