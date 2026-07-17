# CRIT-001 Operating Playbook v2

Status: Active for CRIT-001 identities after VM-540.

Applies to: VM-510 Rakdos / BR and all later CRIT-001 identity recoveries unless superseded by an explicit program record.

Contract: CRIT-001 Contract v1.1 remains authoritative and unchanged.

## Purpose

This playbook records the operating model learned from VM-502 through VM-509. It hardens process without changing semantic standards, runtime behavior, scoring, confidence, inhibition, Hall, Crucible, or global recruiter behavior.

The goal is simple: each identity must become semantically ready through source-backed evidence, clean canonical chains, generated propagation, candidate-scope isolation, independent exact-SHA review, and governance-only certification.

## Drift-Control Baseline

All CRIT-001 Goal mode, review, remediation, and certification prompts must reference and apply `docs/incidents/CRIT-001-drift-control-template.md`. The applicable drift checkpoint is mandatory before advancing any gate, and any `FAIL` or `UNKNOWN` scorecard result stops progression.

Gate 1+2 must record frozen-field baselines and fixture/provenance locators. Candidate creation must include exact-chain checks and exact candidate-scope validation against the final candidate SHA. Superseded candidates remain recorded. Independent review must rerun the controls rather than trusting implementation summaries. Certification must reconcile reviewed/generated truth before governance and tracker updates, review only exact candidate SHAs, and certify only exact approved candidate SHAs.

The next identity may be setup-only after current certification, but it must not receive semantic work before a separate committed drift-preflight control record passes. Do not combine that preflight with semantic audit, remediation, review, or certification.

## Worktree and Branch Gate

Implementation must run only in the CRIT worktree:

`C:\dev\mtgSiteWIP-crit001`

The active branch must be the current identity branch named by the CRIT ledger and card.

For VM-510, the branch is:

`codex/vm-510-rakdos-semantic-recovery`

Stop immediately if the active worktree or branch differs. Do not edit, stage, commit, reset, or run write-producing commands in `C:\dev\mtgSiteWIP`. The original main worktree may be inspected only with read-only status/hash checks.

## Combined Execution Model

CRIT-001 uses five identity gates plus certification acceptance.

### Gates 1 and 2: Read-only audit and evidence confirmation

Gate 1 and Gate 2 may be combined only as read-only work. They determine packet maturity, blocker class, claim roles, evidence sufficiency, required-neighbor scope, source availability, stale public-copy risks, and whether canonical remediation is allowed.

Do not modify raw packets, generated files, fixtures, runtime code, schemas, validators, builders, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior during Gates 1 and 2.

Gate 1+2 must define target-specific stale phrase risks. Do not globally ban common words such as `control`, `law`, `chaos`, or `fire`; each stale phrase list must be tied to that identity's observed overreach risks.

### Gates 3 and 4: Remediation and generation only after sufficiency

Gate 3 canonical remediation may begin only after Gate 2 confirms sufficient existing/local evidence or explicitly obtains bounded source-localization approval.

Gate 4 generation and validation may begin only after Gate 3 canonical remediation is complete. Gate 4 must not silently repair canonical defects. If generation exposes a canonical blocker, stop and report the exact canonical path, generated propagation, and bounded proposed fix.

### Gate 5: Candidate creation only

Gate 5 creates the immutable recovery candidate and a separate workflow-record commit. It does not certify the identity and does not start independent review inside the implementation task.

No identity may enter Gate 5 candidate creation until a candidate-scope dry-run passes or reports only explicitly documented target-scoped display-source exceptions.

Allowed display-source exceptions must be:

- strictly target-scoped;
- necessary to remove stale preserved public copy or preserve generated target coverage;
- supported by recovered evidence;
- free of non-target semantic drift;
- free of builder/runtime behavior changes.

### Independent exact-SHA review

Independent review must approve or request changes against the exact candidate SHA. A rejected candidate is not sent back to review. Corrections require a new candidate sequence or other explicit user-approved path.

### Certification

Certification is governance-only. It records the approved recovery SHA, workflow-record SHA, review result, approval date, contract version, final state, validation notes, and known unchanged warnings.

Certification must not modify canonical data, generated artifacts, fixtures, runtime behavior, contracts, schemas, validators, builders, Hall, Crucible, scoring, inhibition, confidence behavior, scheduling, tie ordering, or global recruiter behavior.

## Stop Rules

Stop and report instead of repairing silently when any of these appear outside the active gate scope:

- source availability or locator ambiguity;
- raw-source wording blockers that require canonical edits;
- generated authoritative proof chains using discovery or support records;
- generated key-figure proof contamination;
- dropped generated collision guidance;
- generated lateral target drift;
- frozen scoring, confidence, calibration, scheduling, tie-order, Hall, Crucible, or inhibition field drift;
- missing retained native IDs;
- missing native IDs in generated provenance where an evidence-bearing generated object has a native ID;
- null required provenance hashes, canonical files, canonical pointers, generated consumers, or evidence source IDs for semantic chains;
- stale target-specific public copy that cannot be fixed as a documented target-scoped display-source exception;
- non-target raw packet changes;
- non-target generated/provenance changes;
- candidate-scope guard failure.

## Candidate-Scope Expectations

The candidate-scope guard must remain strict. It may allow explicit `lateral_inhibition: false` only as a non-inhibiting opt-out when generated lateral targets remain unchanged. It must still fail:

- `lateral_inhibition: true` additions;
- false-to-true changes;
- generated lateral target expansion or churn;
- scoring/confidence/calibration/frozen field drift;
- dropped collision guidance;
- generated proof-chain contamination;
- missing retained native IDs;
- missing required provenance fields;
- unrelated generated/provenance changes.

## Proof-Chain Rules

Discovery records are allowed only in explicit non-authoritative discovery metadata. Support records are allowed only as auxiliary support where the canonical field permits auxiliary use. Generated authoritative proof chains, generated key figures, recruiter guidance, placement guidance, and provenance semantic chains must use substantive claims.

If an identity intentionally retains a character, axis, source, or other native ID only for migration continuity, keep it in retained-native-ID metadata. Do not promote it back into authoritative semantic proof unless substantive evidence supports it.

## Collision and Target Preservation

Canonical collision guidance must survive generation. If a canonical collision target is dropped, first investigate target normalization against existing repository conventions. Prefer canonical target normalization only if it preserves meaning and matches generator-supported identifiers. Do not change builder behavior without explicit approval unless the task is a narrow infrastructure unblock.

Generated lateral-inhibition targets must remain parent-stable unless true inhibition behavior is explicitly authorized and reviewed.

## Validation Expectations

Before candidate creation, run the relevant semantic readiness, source/generated, fixture, placement, context isolation, candidate-scope, and diff checks requested by the identity gate. If a failure is proven pre-existing, document the exact baseline proof and do not hide it.

If `dossier:audit` is relevant but the environment cannot write its report artifact, rerun or document equivalent in-memory audit logic and record primary dossier count, adjacent dossier count, warning count, and failure count.

## VM-540 Gate 0 Additions

VM-540 adds narrow guard coverage for observed recurring CRIT-001 defects:

- generated authoritative proof chains using discovery/support records;
- generated key-figure proof contamination;
- collision-guidance preservation;
- required provenance fields;
- mechanical source locator/source-ID consistency;
- Boros approved/rejected candidate regression checks.

These additions do not change Contract v1.1, generated artifacts, runtime behavior, or identity semantics.
