# VM-295 — Witch Placement Data Quality Authoring Pass

**ID:** VM-295
**Title:** Witch Placement Data Quality Authoring Pass
**Status:** done
**Type:** data-authoring
**Area:** placement / faction-data
**Priority:** high
**Created:** 2026-06-05

---

## Summary

A comprehensive data-quality authoring pass was performed on the WITCH faction to elevate it from Tier 3 (stub/broken placement — garbage auto-matched flavor snippets, generic lore_summary, skeletal affinity blocks, empty placement_axes, profile_version 0.1.0, claim_count 0) to Tier 1 (gold standard, matching Boros Legion baseline). Work covered `data/archscry-flavor-snippets.json`, `data/factions.json`, and `data/placement-model.json`. All claims were sourced from WITCH-EVID-001 through WITCH-EVID-011 (VM-264 evidence ledger), the witch-lore-source-packet.md Product Copy Seed, and GWUB Four-Color Identity Research.md.

This pass was completed retroactively — the WITCH faction had been promoted live via VM-269 and VM-293 without a corresponding Tier 1 placement data authoring pass. This card records the data quality work that brought WITCH up to gold-standard parity.

---

## Source

User-directed data quality audit session (2026-06-05). Retroactive card — work completed before Jeskai VM-294 was tracked.

---

## Acceptance Criteria

- `archscry-flavor-snippets.json` WITCH entry: all 3 garbage auto-matched snippets (Access Denied / Aberrant Manawurm / Abyssal Harvester) replaced with faction-specific cards
  - Witch-Maw Nephilim (GPT) — confirmed verbatim
  - Atraxa, Praetors' Voice (C16) — needs Scryfall confirmation (WITCH-MF-002)
  - Hardened Scales (KTK) — needs Scryfall confirmation
- `factions.json` WITCH root entry updated:
  - `lore_summary` replaced with faction-voice placement copy from approved Product Copy Seed
  - `affinity.drawn_to` expanded from 4 to 5 items, rewritten with specificity
  - `affinity.repelled_by` trimmed from 4 guardrail-heavy items to 3 genuine identity markers
  - `affinity.interview_tells` expanded from 3 to 5 real user-signal tells
  - `research_links.edhrec_slug` populated with "growth"
  - `deck_links` added: 3 Commander entries (Atraxa Praetors' Voice, Atraxa Grand Unifier, Breed Lethality precon), anchored in WITCH-EVID-005
  - `raw_enrichment` block added: 2 timeline events (Guildpact 2006, Commander 2016), 3 key figures, 3 canonical flavor text entries
- `factions.json` WITCH `identity_layers` display block updated to match root entry
- `placement-model.json` WITCH entry updated:
  - `identity.mechanics` filled with Proliferate/+1+1 counter prose
  - `placement_axes.required_positive_evidence_terms` populated with 12 terms
  - `placement_axes.strengthens_when_user_centers` populated with 5 scenarios
  - `placement_axes.suppress_when_user_centers` populated with 5 scenarios
  - `placement_axes.false_positive_guardrail` filled with full guardrail text
  - `good_fit_indicators` trimmed from 5 frame-descriptions to 3 real user-signal bullets
  - `poor_fit_indicators` trimmed from 13 items to 3 targeted entries
  - `inhibitor_traps` trimmed from 15 items to 3 targeted entries
  - `discriminator_questions` expanded from 2 empty stubs to 3 full questions (each with purpose, supports, weakens, collision_targets, evidence_claim_ids)
  - `source_metadata` updated to profile_version "2.0", claim_count 11
- All three JSON files pass `node` parse validation with no errors

---

## Files Impacted

- `data/archscry-flavor-snippets.json`
- `data/factions.json`
- `data/placement-model.json`

---

## Risks

- Atraxa, Praetors' Voice (C16) and Hardened Scales (KTK) flavor text need Scryfall confirmation — tracked as WITCH-MF-002. Witch-Maw Nephilim is confirmed verbatim.
- Raw faction JSON hashes were not regenerated; any downstream hash-validation tooling will see the WITCH entry as changed.
- No runtime artifacts, generated outputs, or route files were touched.
- Temur placement wording residual (open since VM-269) remains unaddressed and should be tracked separately.

---

## Implementation Prompt

N/A — completed.

---

## Notes

- This pass used WITCH-EVID-001 through WITCH-EVID-011 from the VM-264 evidence ledger as primary claim authorities.
- The Boros Legion entry was used as the gold-standard structural baseline.
- The Boros gold standard uses: profile_version "2.0", claim_count 12, 10 pos_terms, 3 good_fit_indicators, 2-3 poor_fit_indicators, 3 inhibitor_traps, 3 discriminator questions, 3 flavor snippets.
- Atraxa/Hardened Scales Scryfall verification (WITCH-MF-002) is the only open flag from this pass.
- Next data-quality candidates: Mardu (most structurally broken active faction), then Yore/Dune/Glint/Ink (empty placement_axes), then UR/RG (mechanics field only).
