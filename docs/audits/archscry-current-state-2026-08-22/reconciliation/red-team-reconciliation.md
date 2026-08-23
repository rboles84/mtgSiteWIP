# Current-State Red-Team Reconciliation

Baseline: `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`
Findings reconciled: 16

## Disposition summary

- CONFIRMED_CURRENT: 1
- DISPROVEN_CURRENT: 9
- NEEDS_PLAYER_DATA: 3
- PRODUCT_DESIGN: 2
- UNCLEAR_CURRENT: 1

## RT-001 — DISPROVEN_CURRENT

- Origin: VM551-D035
- Claim: The earlier audit used the wrong CECOS draft and an unpreserved external legality claim.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-AUTHORITY; SRC-DEFECTS
- Current evidence: The accepted authority now pins CECOS draft.4 to exact object 947bf45bf6a191839b5fb4fa6c65980ed9d5737e and explicitly withdraws draft.2. This finding is resolved as governance, while implementation-derived claims still require individual retest.
- Action: Keep the exact-object rule; do not revive the rejected draft.2 framing.
- Owner review required: NO

## RT-002 — DISPROVEN_CURRENT

- Origin: VM551-D002; VM551-D003; VM551-D007; VM551-D023
- Claim: The public result presents heuristic scores as Bayesian probability, calibrated confidence, or fabricated legacy certainty.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-ENGINE-CONTRACT; SRC-INVARIANTS; SRC-FOCUSED; SRC-ENGINE-EVIDENCE
- Current evidence: The current engine uses bounded named states and public labels such as current-best-fit/close/insufficient; numeric public confidence is explicitly unauthorized. All 37 traces retain internal scores without treating them as calibrated player-facing probability.
- Action: Protect the no-public-probability invariant.
- Owner review required: NO

## RT-003 — DISPROVEN_CURRENT

- Origin: VM551-D005; VM551-D006
- Claim: Lexicographic order silently chooses ties and numerical rank is mislabeled as adjacency.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-FOCUSED; SRC-ENGINE-CONTRACT; SRC-ENGINE-EVIDENCE
- Current evidence: Current focused validation requires deterministic ordering without manufacturing a clear primary, and the public contract preserves close/tied/mixed/insufficient states plus independently qualified alternatives. The Jund witness currently returns close rather than forced primary certainty.
- Action: Retain explicit bounded states and qualification rules.
- Owner review required: NO

## RT-004 — DISPROVEN_CURRENT

- Origin: VM551-D008
- Claim: Every questionnaire item forces directional evidence.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-ENGINE-CONTRACT; SRC-FOCUSED; SRC-INVARIANTS
- Current evidence: Unknown, conditional, and non-directional answers are neutral in the current engine and excessive uncertainty yields insufficient rather than a forced identity.
- Action: Keep uncertainty responses neutral and separately auditable.
- Owner review required: NO

## RT-005 — DISPROVEN_CURRENT

- Origin: VM551-D009; VM551-D012
- Claim: Answers lack stable IDs and malformed or untraceable contracts can validate.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-INVARIANTS; SRC-ENGINE-EVIDENCE
- Current evidence: The current invariant report has no duplicate IDs, orphan signals, missing constructs, or answers missing provenance; all current witness traces pin model and witness hashes.
- Action: Protect schema and semantic validation in the build gate.
- Owner review required: NO

## RT-006 — NEEDS_PLAYER_DATA

- Origin: VM551-D010; VM551-D020
- Claim: Answer-to-identity and lore-to-behavior bridges are editorial hypotheses without player validation.
- Severity: HIGH
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-ARCHITECTURE; SRC-PLAYER-VALIDATION; SRC-ENGINE-CONTRACT
- Current evidence: Current mappings remain explicitly MAPPING_HYPOTHESIS. Deterministic reproduction verifies implementation, not whether real players interpret the items or identity associations as intended.
- Action: Run the separately authorized player-validation protocol before any empirical accuracy claim.
- Owner review required: YES

## RT-007 — DISPROVEN_CURRENT

- Origin: VM551-D014
- Claim: The Gate relies on broad metaphorical identity philosophy before observable Commander behavior.
- Severity: NOTE
- Confidence: MEDIUM
- Sources: SRC-DEFECTS; SRC-ARCHITECTURE; SRC-ENGINE-CONTRACT; SRC-INVARIANTS
- Current evidence: The current architecture is behavior-first and construct-led, with four fixed Gate questions and later adaptive questions. This establishes current structural intent; player comprehension remains covered by RT-010.
- Action: Protect behavior-first wording while testing comprehension with players.
- Owner review required: NO

## RT-008 — NEEDS_PLAYER_DATA

- Origin: VM551-D015; VM551-D040
- Claim: Unequal authored opportunity and target reachability may conceal population bias or neighbor confusion.
- Severity: HIGH
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-SYNTHETIC; SRC-ENGINE-SUMMARY; SRC-PLAYER-VALIDATION; SRC-ENGINE-EVIDENCE
- Current evidence: The current engine has 36 responsible named witness paths and one intentional bounded state, but its synthetic report is explicitly non-empirical. Targeted witness success does not establish ordinary-player outcome distribution, fairness, or neighbor distinctiveness.
- Action: Measure confusion, representational failure, and outcome distribution with recruited players.
- Owner review required: YES

## RT-009 — DISPROVEN_CURRENT

- Origin: VM551-D017
- Claim: One inferred answer can be narrated as broad personality or Commander truth.
- Severity: NOTE
- Confidence: MEDIUM
- Sources: SRC-DEFECTS; SRC-DOSSIER-EVIDENCE; SRC-ENGINE-CONTRACT; SRC-FOCUSED
- Current evidence: All 37 direct Dossier Review records mark placement provenance NOT_ASSERTED and render canonical identity content without implying it was entailed by a single answer. Current engine qualification prevents one answer from creating a clear primary.
- Action: Preserve the direct-review provenance boundary and qualification minimums.
- Owner review required: NO

## RT-010 — NEEDS_PLAYER_DATA

- Origin: VM551-D038
- Claim: Question wording may remain abstract, double-barreled, or hard for novice and experienced players to interpret consistently.
- Severity: HIGH
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-PLAYER-VALIDATION; SRC-ARCHITECTURE
- Current evidence: The design was narrowed and approved structurally, but the player-validation plan explicitly remains protocol-only. Current engine tests cannot establish comprehension, recall, or response stability.
- Action: Authorize cognitive interviews and the planned novice/experienced-player validation slices.
- Owner review required: YES

## RT-011 — CONFIRMED_CURRENT

- Origin: VM551-D029
- Claim: A user-visible result does not itself carry exact input, model, and evidence-contract provenance.
- Severity: MEDIUM
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-DOSSIER-EVIDENCE; SRC-ENGINE-EVIDENCE
- Current evidence: This audit can reconstruct exact model, witness, trace, screenshot, and rendered-record hashes, but the current direct Dossier Review surface does not expose an exact evidence manifest to the user. The audit packet mitigates review reproducibility without changing the product serializer.
- Action: Owner decision: keep provenance audit-only or authorize a future bounded result-manifest/export surface.
- Owner review required: YES

## RT-012 — UNCLEAR_CURRENT

- Origin: VM551-D036
- Claim: One-answer perturbations frequently flip the primary without stability disclosure.
- Severity: MEDIUM
- Confidence: MEDIUM
- Sources: SRC-DEFECTS; SRC-SENSITIVITY; SRC-MUTATION; SRC-ENGINE-CONTRACT; SRC-ENGINE-EVIDENCE
- Current evidence: The historical rate applies to the superseded engine. Current representative mutation validation passes and the public contract can return close/insufficient, but the current audit did not recreate the historical exhaustive 44,005 comparison universe under the new engine.
- Action: Keep current mutation witnesses; only authorize a new exhaustive sweep if owner risk judgment requires it.
- Owner review required: YES

## RT-013 — DISPROVEN_CURRENT

- Origin: VM551-D039
- Claim: Repeated constructs can be counted as independent evidence and inflate stopping or confidence.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-DEFECTS; SRC-ENGINE-CONTRACT; SRC-FOCUSED; SRC-INVARIANTS
- Current evidence: The current engine keeps only the strongest positive and contradiction within each dependency group, and current focused validation covers dependency and neutral-evidence behavior.
- Action: Protect dependency-group caps and separate behavioral/lens ledgers.
- Owner review required: NO

## RT-014 — PRODUCT_DESIGN

- Origin: Yore current observability boundary
- Claim: All 37 identities should be forceable as behaviorally named results.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-ARCHITECTURE; SRC-LENS; SRC-ENGINE-SUMMARY; SRC-ENGINE-EVIDENCE
- Current evidence: The approved architecture says Yore is not cleanly observable from Commander behavior. ENGINE-YORE responsibly returns insufficient while the other 36 witnesses reproduce their named outcomes.
- Action: Owner confirms the intentional bounded Yore behavior remains preferable to forced closure.
- Owner review required: YES

## RT-015 — PRODUCT_DESIGN

- Origin: Owner-approved identity-lens architecture
- Claim: A self-report lens should be treated as behavioral scoring or allowed to name/flip an identity.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-LENS; SRC-ARCHITECTURE; SRC-FOCUSED
- Current evidence: The approved lens is optional, non-scoring, separate, bounded to already plausible candidates, and cannot independently name or flip a result. It remains non-production and needs separate validation.
- Action: Owner decides whether to retain the future lens obligation or remain behavior-only with explicit uncertainty.
- Owner review required: YES

## RT-016 — DISPROVEN_CURRENT

- Origin: VM-579 direct Dossier Review provenance seam
- Claim: A direct dossier render can be mistaken for evidence that the placement engine reached that identity.
- Severity: NOTE
- Confidence: HIGH
- Sources: SRC-DOSSIER-EVIDENCE; SRC-ENGINE-EVIDENCE
- Current evidence: The current packet keeps separate audit IDs and artifacts for direct dossier rendering versus current-engine witnesses. All dossier rows say NOT_ASSERTED; all engine rows independently record witness provenance and trace hashes.
- Action: Keep the two evidence seams separate in review and future automation.
- Owner review required: NO
