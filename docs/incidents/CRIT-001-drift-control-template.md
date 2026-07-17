# CRIT-001 Drift Control Template and Stop-the-Line Plan

Status: Mandatory control baseline for CRIT-001 identities after VM-515 Selesnya certification.

Canonical source: user-supplied `CRIT-001_Drift_Control_Template_and_Stop-the-Line_Plan.md`, normalized for repository-relative paths and the current post-Selesnya Simic setup state.

## Purpose

This document is the reusable control baseline for the CRIT-001 - 37-Identity Semantic Recovery Program.

Its job is to prevent process, semantic, evidence, scope, Git, and workflow drift as the campaign moves from one identity to the next.

This is not a substitute for the CRIT-001 operating playbook or Contract v1.1. It is the compact control layer used to verify that each identity still follows the same rules, evidence standards, gate boundaries, and SHA discipline.

Every new identity must reference this document before Gate 1+2 begins. Every candidate, independent review, and certification window must use the applicable checklist below.

## 1. Immutable Program Invariants

These rules do not change from identity to identity.

### Identity and Gate Control

- Exactly one CRIT-001 identity may be active at a time.
- The next identity may be created for setup only after the current identity is certified.
- Goal mode may run only from Gate 1+2 through Gate 5 candidate creation.
- Independent review must occur in a separate window.
- Certification must occur in a separate window after independent approval.
- No identity may be marked `semantically_ready` before certification.
- No work may begin on the next identity beyond branch/setup state before current certification.

### Exact-SHA Control

- The candidate SHA is the only semantic object eligible for review.
- The workflow-record SHA is never the candidate.
- The review-record SHA is never the candidate.
- Certification must reference an exact approved candidate SHA.
- Approval must be written as:

  `APPROVE EXACT SHA <40-character candidate SHA>`

- A superseded or rejected candidate must remain recorded and must never be silently replaced in history.
- Certification governance may use the repository-defined self-referential placeholder, but the external tracker must record the actual certification SHA.

### Source and Semantic Control

- Approved repository source authority governs all semantic conclusions.
- Discovery, story-corpus, search, and support records may not be promoted into authoritative proof.
- Every substantive claim must have bounded evidence and the required `evidence_scope`.
- Required canonical IDs and content hashes must be non-null and resolvable.
- Generic color-pair mechanics are not a substitute for identity semantics.
- Neighbor boundaries must be testable, not merely a list of names.
- Public, recruiter, generated, fixture, provenance, and authoritative surfaces must agree.

### Scope Control

- Frozen placement confidence, calibration, native-ID shape, lateral targets, collision targets, thresholds, penalties, golden paths, and scoring parameters may not drift unless the contract explicitly permits a documented exception.
- Generated files must be produced by the repository generator when the generator owns them.
- Candidate commits contain implementation files only.
- Workflow, review, and certification commits are governance-only unless repository rules explicitly require otherwise.
- Unrelated dirty-worktree changes must be preserved and excluded from every CRIT-001 commit.

## 2. Known Drift Patterns Already Observed

These are proven failure modes from the campaign and must be checked explicitly.

| Drift pattern | Example observed | Required prevention |
|---|---|---|
| Fixture/provenance mismatch | Gruul fixture duplicated claim IDs while generated provenance was deduplicated | Compare exact ordered arrays, counts, duplicates, missing IDs, and extra IDs |
| Frozen placement drift | Dimir candidate changed confidence/calibration | Compare candidate to Gate 1+2 base and run candidate-scope validation |
| Native-ID/lateral/collision drift | Orzhov candidate changed native IDs, lateral targets, and generic collision shape | Record frozen baseline in Gate 1+2 and compare manually during candidate review |
| Generated proof-chain contamination | Selesnya candidate retained generated or non-authoritative references in proof chains | Inspect authoritative chains manually; do not rely only on automated tests |
| Null canonical IDs/hashes | Multiple Ravnica packets emitted null generated/provenance IDs | Run explicit null-ID/hash scans before candidate creation and certification |
| Discovery leakage | Story-corpus/search records entered authoritative chains | Verify discovery IDs appear only in allowed metadata/history/data-quality locations |
| Stale generated/recruiter copy | Golgari retained old high-risk language after canonical remediation | Search every consumed surface, not only raw source files |
| Generic color-pair overfit | Gruul, Dimir, Orzhov, and Selesnya risked collapsing into generic mechanics | Require explicit generic-color-pair and neighbor discrimination |
| Superseded candidate confusion | Several first candidates failed candidate-scope after commit | Record every superseded SHA and ensure only the final passing SHA is awaiting review |
| Summary-vs-generated count drift | Selesnya summary said 67 provenance entries; review found 70 | Generated truth wins; governance and external tracker must be corrected |
| Shared dirty-file contamination | `docs/handoffs/HANDOFF_INDEX.md` also contained Table Talk work | Stage only CRIT hunks; never use broad staging |
| Self-referential certification SHA | Certification commit cannot contain its own SHA | Use the defined placeholder internally and record the actual SHA externally |

## 3. Required Drift Checkpoints

A drift checkpoint is mandatory at each of the following moments.

### Checkpoint A - Before Gate 1+2

Confirm:

- Active branch and program base are correct.
- The next identity has not already received semantic work.
- Allowed dirty-worktree baseline is fully enumerated.
- The identity-specific source hierarchy is known.
- Required neighbors are declared.
- Frozen fields are captured before remediation.
- Fixture/provenance locators are identified.
- Generic color-pair overfit risks are declared.
- The prior identity is certified and the external tracker matches the repository.

Stop if any item cannot be verified.

### Checkpoint B - After Gate 1+2, Before Remediation

Confirm:

- Gate 1+2 was read-only for semantic and generated data.
- Initial claim-role counts are recorded.
- Evidence-scope, discovery/support isolation, canonical-ID/hash, public/recruiter, fixture/provenance, and exact-chain findings are documented.
- Frozen placement and calibration fields are recorded.
- The remediation decision is explicit.
- The Gate 1+2 commit contains governance/report files only.

Stop if the audit did not establish a defensible remediation boundary.

### Checkpoint C - Before Candidate Commit

Confirm:

- Authoritative changes were made before generated outputs.
- Generated outputs were regenerated using repository tooling.
- Exact fixture/provenance arrays match.
- No duplicate, missing, or extra claim IDs remain.
- Required IDs and hashes are non-null.
- Discovery and support records are isolated.
- Public and recruiter copy no longer contains stale or generic overfit language.
- Frozen placement and calibration fields match Gate 1+2.
- No unrelated identity changed.
- No unrelated worktree files are staged.
- Full validation passed.

Stop if any check fails.

### Checkpoint D - After Candidate Commit

Run candidate-scope validation against the exact candidate SHA.

If candidate-scope fails:

- Do not amend or rewrite the candidate.
- Preserve it as superseded.
- Create a later corrected candidate.
- Record the failed SHA and exact failure reason.
- Mark only the final scope-passing SHA as awaiting review.

### Checkpoint E - Independent Review

The reviewer must independently verify:

- Exact candidate isolation.
- Source authority and claim strength.
- Semantic-role counts and evidence scopes.
- Discovery/support isolation.
- Canonical IDs and hashes.
- Fixture/provenance exact ordered equality.
- Frozen fields and candidate scope.
- Generated and recruiter surfaces.
- Generic color-pair and neighbor boundaries.
- Deterministic generation.
- Full validation.

The review decision must be either exact approval or request changes. No conditional approval.

### Checkpoint F - Certification

Confirm:

- Exact approved candidate SHA is unchanged.
- No later review invalidated approval.
- Candidate semantic/generated/runtime tree is unchanged.
- Reviewed truth is used for counts and evidence, not stale implementation summaries.
- Certification commit is governance-only.
- Certified count advances by exactly one.
- Program base becomes the certification SHA.
- Next identity is setup-only.
- External tracker is updated after the certification SHA exists.

## 4. Identity Recovery Control Template

Copy this section into each identity report or use it as the required structure for prompts and governance records.

```markdown
# [VM-ID] - [Identity] Semantic Recovery Control Record

## A. Identity Header

- VM:
- Identity:
- Color code:
- Branch:
- Starting program base:
- Contract version:
- Current gate:
- Prior certified identity:
- Next identity:
- Allowed unrelated worktree baseline:

## B. Gate 1+2 Baseline

### Source Authority

- Authoritative sources:
- Support-only sources:
- Discovery/story/search sources:
- Sources explicitly excluded from authoritative proof:

### Initial Semantic State

- Total claims:
- Substantive:
- Discovery:
- Support:
- Unclassified:

### Initial Evidence State

- Missing evidence scopes:
- Discovery-backed authoritative chains:
- Support-backed authoritative chains:
- Null canonical IDs:
- Null content hashes:
- Unresolved pointers:
- Duplicate canonical entries:

### Initial Fixture/Provenance State

For each required locator:

- Canonical locator:
- Generated count:
- Fixture count:
- Exact ordered equality:
- Duplicate IDs:
- Missing IDs:
- Extra IDs:

### Frozen Placement and Scope Baseline

- Placement confidence:
- Native-ID shape:
- Required positive terms:
- Minimum hits:
- Broad penalties:
- Strengthen list:
- Suppress list:
- Calibration tuning:
- Calibrated primary read:
- Lateral targets:
- Generic collision target:
- Known targets:
- Golden paths:
- Scoring/ranking parameters:

### Required Neighbors

- Generic color-pair overfit:
- Mono-color neighbors:
- Guild/college neighbors:
- Three-color neighbors:
- Additional local neighbors:

### Gate 1+2 Decision

- Decision:
- Remediation authorization:
- Gate 1+2 commit SHA:
- Files included:
- Governance-only confirmed:
- Unrelated baseline excluded:

## C. Gate 3+4 Remediation

### Authoritative Changes

- Claims:
- Profile:
- Placement:
- Evidence mappings:
- Semantic roles:
- Evidence scopes:
- Collision/neighbor guidance:

### Generated and Consumed Changes

- Public copy:
- Recruiter copy:
- Generated faction data:
- Placement model:
- Identity layers:
- Semantic provenance:
- Fixtures:
- Tests/validators:

### Scope Assertions

- Frozen confidence unchanged:
- Native-ID shape unchanged:
- Lateral targets unchanged:
- Generic collision target unchanged:
- Calibration unchanged:
- No unrelated identity drift:
- No Hall/Crucible/scoring/runtime drift:

### Final Semantic State

- Total claims:
- Substantive:
- Discovery:
- Support:
- Unclassified:

### Final Provenance State

- Provenance entries:
- Null canonical IDs:
- Null hashes:
- Unresolved pointers:
- Duplicate canonical entries:
- Discovery-backed authoritative chains:

### Final Exact-Chain Proof

For each required locator:

- Canonical locator:
- Generated count:
- Fixture count:
- Exact ordered equality:
- Duplicate IDs:
- Missing IDs:
- Extra IDs:

## D. Validation Record

Record every command and actual result.

- Build/generation:
- Identity audit:
- Identity semantic validator:
- Candidate-scope tests:
- Semantic-readiness tests:
- Placement tests:
- Recruiter isolation tests:
- Source-generated tests:
- Full test suite:
- JSON parse checks:
- Evidence-scope check:
- Discovery/support isolation:
- Null ID/hash scan:
- Exact-chain comparison:
- Frozen-field comparison:
- Stale-copy scan:
- Git diff check:
- Determinism run:
- Known unrelated warnings:

## E. Candidate Record

- First candidate SHA:
- First candidate scope result:
- Superseded:
- Superseded reason:
- Final candidate SHA:
- Candidate subject:
- Candidate files:
- Exact candidate-scope command:
- Candidate-scope result:
- Exact SHA awaiting review:
- Workflow-record SHA:
- Workflow status:
- Not certified confirmed:
- Next identity not started confirmed:

## F. Independent Review Record

- Review base:
- Exact candidate reviewed:
- Superseded candidate excluded:
- Reviewer independence confirmed:
- Candidate isolation result:
- Source-authority result:
- Semantic-risk result:
- Neighbor-boundary result:
- Contract v1.1 result:
- Fixture/provenance result:
- Frozen-field result:
- Candidate-scope result:
- Generated/recruiter result:
- Validation result:
- Blocker findings:
- High findings:
- Medium findings:
- Low findings:
- Non-blocking observations:
- Decision:
- Review-record SHA:

## G. Certification Record

- Exact approved candidate:
- Approval review SHA:
- Approval decision:
- Candidate tree unchanged:
- Reviewed truth reconciled with governance:
- Certification placeholder:
- Certification SHA:
- New program base:
- Certified identity count:
- Final status:
- Next branch:
- Next branch target:
- Next identity setup only:
- Certification commit governance-only:
- External tracker updated:
```

## 5. Drift Scorecard

Complete this scorecard at Gate 1+2, candidate creation, review, and certification.

Use:

- PASS - verified with evidence
- FAIL - drift detected
- N/A - not applicable, with explanation
- UNKNOWN - insufficient evidence; stop the line

| Control | Gate 1+2 | Candidate | Review | Certification |
|---|---|---|---|---|
| Correct branch and program base |  |  |  |  |
| One identity active |  |  |  |  |
| Source hierarchy explicit |  |  |  |  |
| Generic color-pair overfit checked |  |  |  |  |
| Required neighbors checked |  |  |  |  |
| Claim roles complete |  |  |  |  |
| Evidence scopes complete |  |  |  |  |
| Discovery/support isolated |  |  |  |  |
| Canonical IDs/hashes valid |  |  |  |  |
| Exact fixture/provenance parity |  |  |  |  |
| Frozen confidence/calibration intact |  |  |  |  |
| Native IDs intact |  |  |  |  |
| Lateral/collision targets intact |  |  |  |  |
| Public/recruiter copy aligned |  |  |  |  |
| No unrelated identity drift |  |  |  |  |
| Deterministic generation |  |  |  |  |
| Candidate scope passes exact SHA |  |  |  |  |
| Superseded candidates recorded |  |  |  |  |
| Review uses exact candidate SHA |  |  |  |  |
| Certification uses exact approved SHA |  |  |  |  |
| Governance-only workflow/review/certification commits |  |  |  |  |
| Dirty-worktree baseline excluded |  |  |  |  |
| External tracker matches repository |  |  |  |  |

Any `FAIL` or `UNKNOWN` stops progression to the next gate.

## 6. Stop-the-Line Triggers

Immediately stop the current window when any of the following occurs:

- Branch, HEAD, ancestry, or program base is wrong.
- An unexpected semantic, generated, fixture, provenance, runtime, schema, validator, builder, scoring, or test change is present.
- Discovery or support material enters authoritative proof.
- A substantive claim lacks bounded evidence or `evidence_scope`.
- Required canonical IDs or hashes are null or unresolved.
- Fixture and generated provenance differ in locator, order, count, membership, duplicates, missing IDs, or extra IDs.
- Frozen placement, native-ID, lateral-target, collision-target, calibration, golden-path, or scoring data drifts without an explicit allowed exception.
- Public or recruiter copy disagrees with authoritative semantics.
- Candidate-scope validation fails.
- A superseded candidate is accidentally marked as current.
- Review is performed against a workflow or review SHA instead of the candidate.
- Certification is attempted without exact approval.
- The next identity receives semantic work before current certification.
- Unrelated dirty-worktree content is staged.
- Implementation summary and generated truth disagree and the discrepancy is not reconciled.
- A validator passes but manual chain inspection reveals a mismatch.

The response to a stop-the-line trigger is:

1. Preserve history.
2. Record the exact failing SHA and reason.
3. Do not amend or rewrite.
4. Correct in a later scoped commit.
5. Re-run the applicable checkpoint.
6. Require fresh independent review when candidate semantics or evidence changed.

## 7. Pre-Simic Control Plan

VM-515 Selesnya is already certified at `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`, and VM-516 Simic exists only as a setup branch. Do not begin Simic Gate 1+2 until this program-level governance milestone and the later VM-516 drift-preflight record are complete.

### Step 1 - Install This Control Baseline

Store this document at:

`docs/incidents/CRIT-001-drift-control-template.md`

### Step 2 - Reference It From the Campaign Authority

Add a short required reference to:

- Root `AGENTS.md` or the applicable CRIT-001 agent instructions.
- The CRIT-001 operating playbook.
- Future identity Goal mode, review, remediation, and certification prompts.

Required wording must make the drift checkpoint mandatory rather than advisory.

### Step 3 - Add a Program Drift Register

Create:

`docs/incidents/CRIT-001-drift-register.md`

Seed it with the observed drift patterns from Golgari, Gruul, Dimir, Orzhov, Selesnya, and any other directly grounded CRIT-001 recurring controls.

### Step 4 - Commit This Governance-Only Installation Milestone

The drift-control installation commit must contain only governance and instruction files. It must not change semantic, generated, fixture, provenance, recruiter, runtime, schema, validator, builder, scoring, or test files.

### Step 5 - Update the External Tracker With the Governance SHA

After the governance commit exists, update the external tracker with the exact drift-control governance SHA. Do not update it from an implementation summary or placeholder.

### Step 6 - Run a Separate VM-516 Drift-Preflight Window

Before Simic Gate 1+2, create a committed VM-516 drift-preflight control record using the template sections:

- Identity Header
- Gate 1+2 Baseline
- Frozen Placement and Scope Baseline
- Fixture/provenance locator inventory
- Required Neighbors
- Drift Scorecard

This record must be governance-only and must pass with no `FAIL` or `UNKNOWN` control before any Simic semantic audit or edit.

### Step 7 - Update the External Tracker With the Preflight Milestone

After the VM-516 drift-preflight commit exists, update the external tracker with that exact SHA.

### Step 8 - Begin Simic Goal Mode Only After the Preflight Passes

Only after the drift-control installation and separate VM-516 drift-preflight record are committed and tracked may a Simic Goal mode prompt begin Gate 1+2. No step may be skipped or combined with semantic remediation.

### Campaign-Level Regression Comparison

Before each new identity, compare the planned workflow against the last three completed identities and answer:

- Did gate boundaries change?
- Did commit separation change?
- Did validation coverage shrink?
- Did candidate-scope rules change?
- Did exact-chain checking change?
- Did source-authority treatment change?
- Did the dirty-worktree allowance change?
- Did the meaning of candidate, review, or certification change?
- Did the external tracker diverge from repository truth?

Any unexplained difference stops the next identity.

## 8. Definition of Drift Controlled

The campaign is considered drift-controlled when:

- The control template is stored in the repository.
- The drift register exists and includes all known recurring failures.
- The operating playbook or agent instructions require the checkpoints.
- Every new identity begins with a recorded drift preflight.
- Every candidate records frozen-field and exact-chain comparisons.
- Every independent review re-runs the checks rather than trusting implementation summaries.
- Every certification reconciles reviewed truth with governance and the external tracker.
- A stop-the-line trigger blocks progression automatically in the written workflow.
- Simic does not begin until these controls are committed, referenced, externally tracked, and followed by a separate passing VM-516 drift-preflight record.
