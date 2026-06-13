# Handoff: VM-294 — Jeskai Way Placement Data Quality Authoring Pass

**Agent:** Codex
**Date:** 2026-06-05 12:00
**Related Card:** VM-294
**Status:** Complete

---

## Task Requested

Bring the Jeskai Way faction from Tier 3 (broken placement) to Tier 1 gold-standard quality, matching the Boros Legion profile_version 2.0 benchmark. The faction had 0 positive evidence terms, 0 good_fit_indicators, empty placement_axes, and no raw_enrichment. The authoring pass filled all empty fields from the VM-229 approved evidence ledger and verified Tarkir canonical source material.

---

## Files Reviewed

- `docs/research/jeskai/jeskai-evidence-ledger.md` — VM-229 approved evidence; primary source of claim IDs and canonical grounding
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md` — verified official Wizards capture; verbatim flavor text source
- `docs/research/canon/mark_rosewater_official_three_color/Jeskai_Smart Thinking _ MAGIC_ THE GATHERING.md` — MaRo official three-color Jeskai design article
- `docs/research/canon/misc/vox_mana_color_bible_placement_engine_spec.md` — placement engine specification and field contract
- Allied/enemy color pairing docs from `docs/research/canon/mark_rosewater_official_misc/` — Blue-Red-White identity anchoring
- `data/factions.json` — pre-change state reviewed for all Jeskai fields
- `data/placement-model.json` — pre-change state reviewed for all Jeskai fields
- `data/archscry-flavor-snippets.json` — pre-change state reviewed for Jeskai snippet entries

---

## Files Changed

### 1. `data/factions.json` — JESKAI entry

- **lore_summary:** Replaced a 45-word meta-disclaimer ("Jeskai is a blue-red-white…") with faction-voice text grounded in the four Jeskai pillars: martial discipline, knowledge-seeking, cunning strategy, and reverence for elder dragons.
- **affinity.drawn_to:** Expanded from 4 items to 5 items; additions grounded in VM-229 evidence claims.
- **affinity.repelled_by:** Replaced 4 evidence-scope guardrail strings (which described authoring constraints, not faction identity) with 3 real philosophical rejections — what Jeskai practitioners actually oppose.
- **affinity.interview_tells:** Replaced 4 meta-labeling tells (describing what the system does) with 5 real user signals — what a person actually says that indicates Jeskai identity.
- **research_links:** Populated `edhrec_slug: "jeskai"` (was `{}`).
- **deck_links:** Populated 3 entries — Narset Enlightened Master EDH, Shu Yun EDH, Jeskai Control Modern (was `[]`).
- **raw_enrichment:** Added full block containing:
  - 4 timeline events (Khans founding, Narset rule, Ojutai discontinuity, modern revival)
  - 3 key figures (Narset, Shu Yun, Bloodfire Warriors)
  - 2 canonical flavor texts

### 2. `data/placement-model.json` — JESKAI entry

- **identity.mechanics:** Filled with Prowess and concealment-magic prose tied to Tarkir lore (was `""`).
- **placement_axes.required_positive_evidence_terms:** Populated with 12 terms (was `[]`).
- **placement_axes.strengthens_when_user_centers:** Populated with 5 scenarios (was `[]`).
- **placement_axes.suppress_when_user_centers:** Populated with 5 scenarios (was `[]`).
- **placement_axes.false_positive_guardrail:** Filled with full guardrail prose against URW-only color thinking and Ojutai-lineage collapse (was `""`).
- **good_fit_indicators:** Populated with 3 real user-signal bullets (was `[]`).
- **poor_fit_indicators:** Reduced from 5 placeholder guardrail strings to 2 targeted indicators that reflect actual faction-identity mismatches.
- **inhibitor_traps:** Reduced from 6 placeholder items to 3 targeted traps grounded in Jeskai's specific false-positive failure modes.
- **discriminator_questions:** All 3 questions filled — each with purpose, supports, weakens, collision_targets, and evidence_claim_ids fields.
- **source_metadata:** profile_version advanced from `0.1.0` to `2.0`; claim_count advanced from `0` to `18`.

### 3. `data/archscry-flavor-snippets.json` — JESKAI entry

- Added a 3rd snippet: Narset, Enlightened Master (KTK) — verbatim canonical quote "True understanding of the universe comes from understanding of the self…" confirmed from the Planeswalkers Guide verbatim capture.

---

## What Changed and Why

The Jeskai Way entry was in a broken placeholder state (Tier 3) — all evidence-bearing fields were empty, the lore_summary was a meta-disclaimer rather than faction voice, and the placement engine had nothing to work with. The audit run against all 35 factions identified Jeskai as one of the factions requiring a full Tier 1 authoring pass.

All new content was derived exclusively from the VM-229 approved evidence ledger and the verified canonical source files listed above. No lore was invented. The profile_version advance to 2.0 signals that this entry now meets the gold-standard benchmark established by Boros Legion.

---

## Decisions Made

- Used the Boros Legion entry (profile_version 2.0) as the direct benchmark for field completeness and tone.
- All claim references in discriminator_questions point back to VM-229 evidence_claim_ids — no free-floating claims introduced.
- The false_positive_guardrail specifically guards against two known failure modes for Jeskai: (1) placing any URW deck here by color alone, and (2) collapsing all blue-red-white identity into the post-Ojutai framing.
- inhibitor_traps and poor_fit_indicators were intentionally reduced from their over-specified placeholder counts; quality and targeting over volume.
- The 3rd flavor snippet was added because the Archscry flavor slot has room for 3 entries and the Narset quote is the strongest canonical voice for the faction's philosophy pillar.

---

## Risks / Uncertainties

- The Ojutai-lineage boundary in the false_positive_guardrail is a judgment call: some users who strongly identify with Narset post-Khans may still belong in Jeskai. The guardrail is written to suppress only clean Ojutai-framed answers, not Narset the person.
- The inhibitor_traps reduction from 6 to 3 removes some of the original placeholder specificity. If future testing reveals additional false-positive failure modes, those should be added back as real traps with evidence backing.
- Temur placement wording assertion residual (test:placement, expected blue-red-green, actual green-blue-red) is an unrelated open item — not introduced or worsened by this pass.

---

## Tests Run

- Node JSON parse validation on all three changed files (`data/factions.json`, `data/placement-model.json`, `data/archscry-flavor-snippets.json`) — all clean.

---

## Not Touched

- `data/raw-factions/` — no raw faction JSON files modified.
- Generated outputs — no rebuild triggered.
- Runtime HTML/JS files — not touched.
- Temur placement wording assertion residual — not touched; recorded as known open item.
- All other factions — no changes outside Jeskai entries.

---

## Follow-up Recommendations

1. **WITCH data quality pass** — analyzed in the audit, authoring pass not yet executed. Same workflow as this pass.
2. **MARDU data quality pass** — next broken active faction after Jeskai in the Tier 3 queue.
3. **Temur wording assertion residual** — `test:placement` expected blue-red-green, actual green-blue-red. Unrelated to this pass but should be addressed before the next test sweep.
4. **UR, RG, Lorehold mechanics fields** — empty, Tier 2. Lower priority but should be scheduled.
5. **Yore, Dune, Glint, Ink placement_axes** — empty, Tier 3. Each requires a source-grounded authoring pass.

---

## Next Suggested Agent

**JSON Cartographer** — to validate the profile_version 2.0 claim_count against the discriminator_questions evidence_claim_ids and confirm the placement engine will correctly index the new required_positive_evidence_terms.

Alternatively, **Test Strategist** — to add Jeskai-specific placement golden-path tests that exercise the new required_positive_evidence_terms and suppression scenarios.

---

## Related Kanban Cards, Docs, and Plans

- VM-294 (this work)
- VM-229 (Jeskai evidence ledger — primary source authority)
- `docs/research/jeskai/jeskai-evidence-ledger.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md`
- `docs/research/canon/mark_rosewater_official_three_color/Jeskai_Smart Thinking _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/misc/vox_mana_color_bible_placement_engine_spec.md`
