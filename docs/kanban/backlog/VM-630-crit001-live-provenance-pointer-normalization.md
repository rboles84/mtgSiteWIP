# VM-630 — CRIT-001 Live Provenance Pointer Normalization

ID: VM-630
Title: CRIT-001 Live Provenance Pointer Normalization
Status: Backlog
Type: Documentation / provenance cleanup
Area: CRIT-001 lifecycle and authoritative summary records
Priority: Medium
Created: 2026-09-05

## Summary

Normalize only CRIT-001 fields that currently serve as authoritative/live provenance pointers but still contain stale placeholder values even though the underlying commits can now be resolved. Preserve truthful historical event-time records.

## Source

- Owner decision: CRIT-001 **CLOSE + NEW FOLLOW-UP**.
- Predecessor: [CRIT-001 — Faction Semantic Readiness Integrity](../../incidents/CRIT-001-faction-semantic-readiness-integrity.md).
- Recon examples include `current_program_base`, `latest_certification`, `completed_by`, and `certification_commit`; each occurrence still requires role classification before editing.

## Required Distinction

### Live Authoritative Pointer

A field currently intended to tell readers the active/final commit, certification, or program base. Where repository evidence supports a real SHA, normalize the live pointer to that evidence.

### Historical Event Record

A record describing what was known at a specific moment. A historical `PENDING_*` value may be truthful and should generally remain unchanged rather than being rewritten with future knowledge.

## Scope

- Inventory CRIT-001 `PENDING_*` occurrences and classify each as live authoritative pointer, historical event record, or non-authoritative documentation residue.
- Resolve only live authoritative pointers with repository-supported SHAs.
- Preserve historical provenance and link each live correction to its evidence.
- Update only directly affected documentation/index references.

## Explicitly Out Of Scope

- Semantic, claim, Placement, profile, or generated-data changes.
- Recertification, regeneration, or another 37-identity campaign.
- UI or runtime changes.
- Indiscriminate replacement of every `PENDING_*` string.
- Rewriting historical event records to imply future SHAs were known at authoring time.

## Acceptance Criteria

- [ ] Every in-scope `PENDING_*` occurrence is inventoried and classified by record role.
- [ ] Each live authoritative pointer is replaced only when a real SHA is supported by durable repository evidence.
- [ ] Historical event-time values remain intact unless a separate correction is necessary to preserve truth.
- [ ] Updated summaries clearly distinguish final/live provenance from preserved history.
- [ ] Documentation links, Markdown formatting, and duplicate-ID checks pass with no runtime, semantic, claims, Placement, profile, or generated-data diff.

## Files Likely Impacted

- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- Directly related CRIT-001 summaries or indexes proven to contain live pointers.
- Required Kanban and handoff records.

## Risks

- A mechanical replacement could falsify historical chronology.
- Similar field names can have different authority roles in live summaries and event logs.
- An apparent SHA may represent a candidate, review, certification, workflow, merge, or program-base commit rather than the field's intended object.

## Implementation Prompt

Classify first, then normalize only current authoritative/live CRIT-001 provenance pointers whose exact objects and SHAs are supported by repository evidence. Preserve historical event-time placeholders and all semantic/certification content. Stop before recertification, regeneration, identity repair, or any runtime/data change.

## Notes

Backlog only. CRIT-001 is closed at 37/37; this documentation debt does not reopen or block the completed recovery program.
