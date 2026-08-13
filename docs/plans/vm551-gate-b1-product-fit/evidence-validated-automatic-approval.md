# VM-551 Evidence-Validated Automatic Approval

## Operating rule

Owner review is an exception gate. Evidence-complete bounded public content may become `APPROVED_PUBLIC` through `EVIDENCE_VALIDATED_AUTOMATIC`; the repository must not fabricate a human approval record.

The authority order is certified Vox Mana identity truth, accepted CECOS player language where relevant, official Wizards or Mark Rosewater material, canonical Scryfall card facts, and community material only as a research lead where an existing standard permits it.

## Automatic approval contract

A record passes only when:

1. Exact certified identity claim IDs and locators resolve.
2. The factual side resolves to canonical committed data or official Wizards authority.
3. The relationship bridge is explicit and bounded.
4. Public copy does not exceed that bridge.
5. False-positive and adjacent-identity analyses reject generic color, mechanic, theme, tag, product, or mood overlap.
6. No source conflict, generated fallback, runtime LLM prose, new identity meaning, placement change, or competing material interpretation remains.
7. The shared `vm551-evidence-validator-v1` check passes.

Approved records store `approval_basis: EVIDENCE_VALIDATED_AUTOMATIC`, validator version, the evidence chain, and validation results. `owner_decision` remains absent unless a real owner exception is decided.

## Owner exception contract

Owner review remains required only for conflicting high-quality sources, new Vox Mana identity meaning, genuinely interpretive relationships, unresolved four-color/Colorless/WUBRG authority, ambiguous cross-identity analogy, placement-semantic changes, unavoidable extrapolation, or multiple materially different public interpretations.

The final exception packet contains only those rows. Normal evidence-complete records never enter it.

## Runtime boundary

Generated runtime catalogs consume only `APPROVED_PUBLIC`. Missing required content fails generation and certification. `REVIEW_REQUIRED`, `EVIDENCE_NEEDED`, rejected, generic, or fallback content cannot enter public runtime.
