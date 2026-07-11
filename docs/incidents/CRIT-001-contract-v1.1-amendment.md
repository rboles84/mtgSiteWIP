# CRIT-001 Contract v1.1 Amendment

Status: Candidate `b5d1c8db4758cab740392a6417c16019d778cc4c` pending independent review
Owner: VM-501
Base: `5165434`

## Demonstrated defect

Rejected VM-502 candidate `85d3c79daa5081b6af4376506f51d33fe51e1225` mixed shared validation changes into an identity recovery and exposed gaps that Contract v1 described but did not fully enforce. It also introduced an evidence-use distinction that changes which non-semantic references are accepted and therefore requires a versioned amendment.

## Rule change

Contract v1.1 permits explicit `discovery_metadata` and `auxiliary_support` reference uses while continuing to require substantive claims for semantic statements. Discovery and support records still cannot prove identity meaning.

Contract v1.1 also requires:

- every changed generated semantic consumer to appear in provenance;
- retention of existing native canonical identifiers;
- exact claim/source equality for the provenance fixture and complete declared claim/source chains for all semantic fixtures;
- identity-candidate rejection when frozen shared files or prohibited runtime/calibration fields change;
- stable ledger regeneration, with durable explanation when template-cohort classification changes.

## Impact

- Certified identities affected: none. No identity has been certified under Contract v1.
- Rejected candidate affected: VM-502 candidate `85d3c79` must be replaced after this prerequisite is accepted.
- Required revalidation: the new VM-502 candidate and all later candidates validate under v1.1.
- Runtime behavior: none. This amendment changes validation and provenance only.

## Delta classification

| Rejected-candidate shared delta | Classification | Disposition |
|---|---|---|
| `evidence_use` contract text and schema | Contract-semantic amendment | Retain as v1.1 |
| Evidence-use handling in audit/validator | Contract-semantic amendment implementation | Retain under VM-501 |
| Omit implicit `semantic` from provenance serialization | Existing v1 implementation correction | Retain to prevent manifest churn |
| Identity semantic-fixture validator | Existing v1 implementation correction | Replace with complete claim/source-chain validation |
| Prismari semantic fixture | Prismari-specific | Exclude from VM-501 |
| Data-factions provenance omission | Existing v1 implementation defect | Add `data/factions.json` consumer coverage |
| Candidate shared-file/forbidden-field/native-ID gaps | Existing v1 implementation defects | Add identity candidate scope guard |
| Ledger timestamp/template-cohort churn | Existing v1 implementation defect | Make unchanged reruns stable and explain cohort changes |
| Any Prismari-only evidence exception | Prismari-specific workaround | Prohibited |

## Non-goals

No faction packet, public behavior, global recruiter behavior, Hall/Crucible content, scoring, inhibition, confidence, tie ordering, or scheduling changes belong to this amendment.
