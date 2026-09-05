# VM-629 — Placement Language Repetition Reduction

ID: VM-629
Title: Placement Language Repetition Reduction
Status: Backlog
Type: Bounded copy-quality remediation
Area: Archscry rendered dossier language
Priority: Medium
Created: 2026-09-05

## Summary

Reduce unnecessary cross-identity instructional boilerplate that still makes some rendered dossiers feel templated, while preserving shared terminology and repeated guidance that materially improves comprehension.

## Source

- Owner decision: VM-595 **CLOSE + NEW FOLLOW-UP**.
- Predecessor: [VM-595 — Placement Language Trust Audit](../done/VM-595-placement-language-trust-audit.md).
- SIRF VM-599 through VM-610 already resolved the material malformed-copy, section-role, structural, and placement-language findings.

## Bounded Scope

- Inventory remaining materially repeated user-facing frames, including constructions such as `This may fit if`, `Pressure through`, `Opponents feel the deck`, and other genuinely repeated instructional sentences or shared frames.
- Classify each repeated construction as:
  - intentionally shared terminology;
  - useful instructional consistency; or
  - unnecessary boilerplate.
- Rewrite only unnecessary boilerplate.
- Preserve useful shared wording where consistency helps players understand the product.

The issue is unnecessary template feel, not similarity by itself and not a requirement that every identity use unique wording.

## Explicitly Out Of Scope

- Another all-37 semantic audit or a new SIRF program.
- Taxonomy, Placement, claims, evidence, or section-role repair.
- General prose beautification or an all-identity bespoke rewrite.
- Changes to semantic meaning, recommendation relationships, or generated truth ownership.

## Acceptance Criteria

- [ ] Remaining repeated frames are inventoried at the current accepted baseline.
- [ ] Each material construction is classified as intentionally shared terminology, useful instructional consistency, or unnecessary boilerplate.
- [ ] Only unnecessary boilerplate is rewritten at its correct authored or presentation owner.
- [ ] Semantic meaning, evidence relationships, Placement, taxonomy, recommendation relationships, and accepted SIRF section roles remain unchanged.
- [ ] A lightweight static/diff check confirms the known malformed visible text is not reintroduced.

## Files Likely Impacted

- Existing authored dossier-copy or presentation owners proven by the inventory.
- Focused copy/repetition regression checks.
- Required Kanban and handoff records.

## Risks

- Similarity metrics can misclassify useful shared terminology as a defect.
- Broad rewriting can change semantic altitude or weaken player comprehension.
- Editing a generated projection instead of its owner can create drift.

## Implementation Prompt

Use the accepted VM-595 and SIRF evidence to inventory current repeated frames, classify them by player value, and rewrite only unnecessary boilerplate at the earliest authorized owner. Preserve semantics, evidence, Placement, taxonomy, section roles, and useful consistency. Stop before a new all-37 audit, SIRF program, general beautification pass, or demand for unique wording everywhere.

## Notes

Backlog only. No copy remediation is authorized by creation of this card.
