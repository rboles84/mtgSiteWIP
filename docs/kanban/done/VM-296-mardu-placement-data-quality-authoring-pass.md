# VM-296 — Mardu Placement Data Quality Authoring Pass

**Status:** Done
**Type:** Data Quality / Faction Authoring
**Priority:** High
**Faction:** Mardu Horde (RWB)
**World:** Tarkir
**Assigned:** Codex

---

## Summary

Bring Mardu Horde placement data from Tier 3 (most broken active faction) to Tier 1 gold standard. The critical deficiency is a structural contradiction: 14 required_positive_evidence_terms but 0 good_fit_indicators, making reliable placement impossible. Secondary deficiencies include system-internal lore_summary, guardrail-style poor_fit/inhibitor_traps, empty discriminator_question fields, missing raw_enrichment, missing deck_links, and missing edhrec_slug.

---

## Acceptance Criteria

- [ ] `good_fit_indicators` filled with 3 genuine user-signal bullets
- [ ] `lore_summary` rewritten in faction-voice placement copy (not system boundary statement)
- [ ] `affinity.drawn_to` extended to 5 identity-specific items
- [ ] `affinity.repelled_by` rewritten to 3 genuine identity markers (not guardrails)
- [ ] `affinity.interview_tells` rewritten to 5 genuine user-behavior signals
- [ ] `identity.mechanics` filled with Mardu mechanics prose
- [ ] `poor_fit_indicators` rewritten as 2-3 player-facing signals
- [ ] `inhibitor_traps` rewritten as 3 targeted psychological traps
- [ ] All 3 `discriminator_questions` have purpose/supports/weakens/collision_targets filled
- [ ] `research_links.edhrec_slug` populated
- [ ] `deck_links` has 3 entries
- [ ] `raw_enrichment` block added (key_figures, historical_timeline, canonical_flavor_text)
- [ ] `source_metadata.profile_version` = "2.0", `claim_count` ≥ 10
- [ ] `identity_layers.MARDU.display` block updated in sync
- [ ] JSON validation passes for all three data files
- [ ] Handoff file created, HANDOFF_INDEX.md updated, board.md updated

---

## Research Sources

- `docs/research/mardu/mardu-evidence-ledger.md` — MARDU-EVID-001 through MARDU-EVID-031
- `docs/research/mardu/mardu-research-dossier.md` — identity floor
- `docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md` — MaRo official design source
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md` — Tarkir lore

---

## Related Cards

- VM-295 — WITCH authoring pass (same pattern)
- VM-294 — Jeskai authoring pass (same pattern)
- VM-223 — Mardu source packet and evidence ledger
- VM-228 — Mardu controlled runtime promotion
