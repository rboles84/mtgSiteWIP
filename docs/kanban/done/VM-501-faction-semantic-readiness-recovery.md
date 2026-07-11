# VM-501 — Faction Semantic Readiness Recovery Infrastructure

ID: VM-501
Status: Done
Type: Critical Incident / Data Contract / Validation
Priority: P0 / Showstopper
Incident: CRIT-001
Created: 2026-07-11
Completed: 2026-07-11

## Objective

Build the minimum shared contract, structural inventory, provenance, validation, ledger, fixtures, and governance required to recover and independently certify all 37 canonical identity packets.

## Deliverables

- [x] Semantic freeze and incident record.
- [x] Contract v0.
- [x] JSON ledger and human-readable view design.
- [x] Shared recovery template and 37 recovery-card stubs.
- [x] All-37 structural fingerprint.
- [x] Additive claim-role and bounded-evidence support.
- [x] Stable canonical provenance manifest.
- [x] Semantic-readiness validator.
- [x] Structurally valid but semantically invalid fixture.
- [x] Valid bounded-evidence fixture.
- [x] Prismari, Lorehold, and Izzet pilot.
- [x] Contract v1 freeze.

## Guardrails

VM-501 does not repair an identity, redesign the builder, change public APIs, tune scoring, alter Hall/Crucible content, change inhibition, or tune global recruiter behavior.

## Validation

- Collision scan covers VM-501 through VM-538.
- Fingerprint emits structural facts and triage signals only.
- Automated ledger updates preserve human-owned fields.
- Provenance uses stable IDs or JSON Pointer plus content hash.
- Internal claim IDs do not leak into recruiter prose.
- Full tests run when Contract v1 infrastructure is complete.

## Related

- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`

## Outcome

Contract v1 is frozen after the bounded Prismari/Lorehold/Izzet pilot. The all-37 structural inventory, protected JSON ledger synchronization, stable provenance manifest, additive semantic schema, positive/negative fixtures, semantic validator, and normal test-runner integration are committed and validated. Existing generated faction, placement, and recruiter content remained semantically unchanged.

## Prerequisite Correction Cycle

Status: Reopened prerequisite candidate pending independent review.

The first VM-502 review exposed shared enforcement gaps. VM-501 now owns Contract v1.1, complete generated-consumer provenance, complete fixture evidence-chain validation, identity-candidate scope and forbidden-field guards, native-ID retention, and deterministic ledger regeneration. No identity remediation may resume until the exact VM-501 correction candidate is independently approved and accepted into the program base.

Candidate `b5d1c8db4758cab740392a6417c16019d778cc4c` received `changes_requested` and remains immutable rejected history. Its four blockers are evidence-use path bypass, incomplete global/identity scope isolation, incomplete native-ID coverage, and incomplete evidence-location/source-chain validation. A corrected prerequisite candidate is required before identity work resumes.
