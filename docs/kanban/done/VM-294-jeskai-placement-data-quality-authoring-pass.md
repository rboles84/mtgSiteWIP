# VM-294 — Jeskai Placement Data Quality Authoring Pass

**ID:** VM-294
**Title:** Jeskai Placement Data Quality Authoring Pass
**Status:** done
**Type:** data-authoring
**Area:** placement / faction-data
**Priority:** high
**Created:** 2026-06-05

---

## Summary

A comprehensive data-quality authoring pass was performed on the Jeskai Way faction to elevate it from Tier 3 (broken placement — lore_summary text, empty drawn_to/repelled_by/interview_tells, no research/deck links, no raw_enrichment) to Tier 1 (gold standard, matching Boros Legion baseline). Work covered `data/factions.json`, `data/placement-model.json`, and `data/archscry-flavor-snippets.json`. All claims were sourced from the VM-229 evidence ledger (JESKAI-EVID-001 through JESKAI-EVID-018), the Planeswalkers Guide to Khans of Tarkir Part 1, and MaRo's "Smart Thinking" three-color article.

---

## Source

User-directed data quality audit session.

---

## Acceptance Criteria

- `lore_summary` replaced with faction-voice placement copy (identity-first, not encyclopedic)
- `drawn_to` expanded to 5 real identity-driven signal bullets
- `repelled_by` contains 3 genuine identity markers (not evidence-scope guardrails)
- `interview_tells` contains 5 real user-behavior signals (not meta-tells about the quiz)
- `research_links.edhrec_slug` populated with canonical slug
- `deck_links` populated with 3 verified commander/deck entries
- `raw_enrichment` block present with timeline events, key figures, and canonical flavor texts
- `placement-model.json` JESKAI entry: `mechanics` field filled with Prowess + concealment magic prose
- `placement_axes` populated: 12 pos_terms, 5 strengthens, 5 suppress, false_positive_guardrail
- `good_fit_indicators` contains 3 real user-signal bullets (not empty array)
- `poor_fit_indicators` trimmed to 2 targeted entries
- `inhibitor_traps` trimmed to 3 targeted entries
- All 3 discriminator questions fully populated (purpose, supports, weakens, collision_targets)
- `source_metadata` updated to profile_version 2.0 and claim_count 18
- `archscry-flavor-snippets.json` JESKAI entry has 3rd snippet (Narset canonical quote)
- All three JSON files pass `node` parse validation with no errors

---

## Files Likely Impacted

- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`

---

## Risks

- Temur placement wording residual remains open from VM-269 — not addressed in this pass.
- WITCH faction data quality pass is the natural follow-up; WITCH was promoted live (VM-269/VM-293) but placement data was not audited at gold-standard depth during those passes.
- Raw faction JSON hashes were not regenerated; any downstream hash-validation tooling will see the JESKAI entry as changed.
- No runtime artifacts, generated outputs, or route files were touched.

---

## Implementation Prompt

N/A — completed.

---

## Notes

- This pass used JESKAI-EVID-001 through JESKAI-EVID-018 from the VM-229 evidence ledger as primary claim authorities.
- The Boros Legion entry was used as the gold-standard structural baseline.
- WITCH data quality pass is the recommended next data-authoring task; WITCH was promoted live but placement data remains unaudited at Tier 1 depth.
- Temur placement wording residual (open since VM-269) remains unaddressed and should be tracked separately.
