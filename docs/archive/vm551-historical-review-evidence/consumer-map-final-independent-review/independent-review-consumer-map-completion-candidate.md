# VM-551 Final Independent Review — Consumer-Map Completion Candidate

Date: 2026-08-01

Reviewer: Codex independent review

Exact content candidate: `908007b971b6d714661cf7406597ce94c00f14a0`

Workflow-record HEAD: `a42841153809fcb0d082c12453be101704e6936d`
Disposition: **REJECT VM-551 AUDIT EXACT SHA `908007b971b6d714661cf7406597ce94c00f14a0`**

## Scope and authority

This review was performed from the separate worktree `C:\dev\vm551-map-review` on branch `codex/vm551-consumer-map-final-independent-review`, created directly from the exact candidate. The governed audit branch was inspected read-only and was not modified, merged, rebased, cherry-picked, or pushed.

The candidate descends from production base `2b4058ff4c769f03d52070204b3ce973e51decbd` and rejected compatibility candidate `332c24097c8d3d9f3c87bee60527bdb73b795f1b`; workflow HEAD has the exact candidate as its content parent. Candidate changes from the rejected compatibility candidate are under `docs/` only.

The exact CECOS Git-object bytes at `947bf45bf6a191839b5fb4fa6c65980ed9d5737e:docs/standards/cecos/CECOS-v1.0.0-draft.4.md` are 394,769 bytes and SHA-256 `dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3`.

## Accepted corrections

- The map has exactly 37 unique data rows and all required columns. Dispositions reconcile to 26 `PRESERVE-UNCHANGED`, 6 `PRESERVE-INTERNAL-HIDE-PUBLICLY`, 2 `ADDITIVE-EXTENSION`, 3 `VERSIONED-MIGRATION-LATER`, and 0 `UNRESOLVED-BLOCKER`.
- `color_weights` is now a distinct row. It correctly reports no current local adaptive quick-path writer, preserves the optional field when supplied, forbids fabricating a missing value, and records external/archive/deployed producer authority as unresolved. `PRESERVE-UNCHANGED` is defensible.
- `authored_preview_scores` correctly names `data/identity-layers.json:expressions.*.preview_scores` as canonical. `research/build-faction-artifacts.mjs` reads and propagates that source; it is not described as its writer. Runtime radar consumers, component-average fallback, the five authored axes, and separation from softmax confidence and placement-derived `mana_scores` are correct.
- No additional material serialized, persisted, publicly rendered, ranking/stopping, Matrix, or handoff field was found missing from either a dedicated row or a bounded aggregate-family row.
- Accepted quantitative findings, five Gate A requirements, Gate A/B1/B2/C/D scope, and severities remain unchanged: 37 identities, 113 questions, 356 answers, 26,891 terminal paths, 333 exact ties, zero negative-only winners, 2,901 below-minimum-proxy paths, and 3 Critical / 26 High / 10 Medium / 1 Low defects.

## Material blockers

### 1. `decree` consumer claims are not source-accurate

The dedicated row is present, but two material claims are wrong:

- It names nonexistent cache/OAuth functions `vm_beginGoogleSave` and `vm_finishPendingSave`. The committed functions are `assets/js/shared.js:vm_saveWithGoogle()` and `assets/js/shared.js:vm_checkPendingSave()`.
- It claims decree consumption by “dossier text export and audit.” `assets/js/commander-dossier.js:buildCommanderDossier()` does populate `dossier.decreeCopy`, but `renderCommanderDossierText()` does not render that field, and `auditCommanderDossier()` audits the rendered text. `assets/js/index.js` assigns `dossier.decreeCopy` without subsequently rendering it. The initial result reveal and Maze reading-signal path do consume decree and may remain documented.

The row must distinguish creation/carry-through from actual public rendering and audit consumption. It must also scope direct test claims to tests that actually assert decree behavior and clarify that the legacy `profiles.decree` column is written by current persistence but is not selected by the current `vm_loadProfile()` path.

### 2. The strengthened validator accepts blank `color_weights` treatments

`validate-downstream-compatibility-docs.mjs` concatenates the public and internal treatment cells for its non-fabrication regex instead of asserting both cells independently. In-memory mutation tests against the exact candidate produced exit 0 for each of these invalid maps:

- blank `color_weights.gate_a_public_treatment`;
- blank `color_weights.gate_a_internal_treatment`.

This contradicts the required failure condition that either missing treatment must fail. The validator must require each cell independently, while retaining the existing checks for row count, row presence, no-local-writer language, non-fabrication, disposition, decree coverage, canonical authored source, and source direction.

### 3. The owner critical extract omits the corrected rows

`owner-review-critical-extract.md` reports the aggregate 37-row count and a generic Matrix separation note, but it contains no field-level record or accurate bounded summary for `decree`, `color_weights`, or `authored_preview_scores`. The owner package therefore does not satisfy its requirement to expose or correctly summarize the three corrected rows. Add the three source-accurate records after correcting the decree row, without replacing the machine map.

## Validation

- PASS: original audit generator — 37 identities, 113 questions, 356 answers, 26,891 terminal paths, 333 exact ties.
- PASS: remediation generator — exact CECOS authority; 44,005 matched comparisons, 14,424 primary flips, 12,360 different-family flips, zero negative-only winners, 2,901 below-minimum-proxy paths, 3 dead questions, 6 dead answers, 11 repeated constructs, 28 non-monotonic records, unchanged severity totals.
- PASS: owner-package generator — 37 result-field records and `26/6/2/3` compatibility totals.
- PASS in governed audit worktree: remediation, owner-review reconciliation, and downstream-compatibility validators.
- PASS from exact review worktree: downstream-compatibility validator, placement, source/generated guardrails, parser (226 cases), JS lint, HTML validation, frontend smoke, route metadata, copy boundaries, deck links, and four Maze/adjacent-navigation checks.
- FAIL as expected from fresh-worktree portability: remediation and owner-review validators hash CRLF-expanded working-tree bytes rather than exact Git blobs. Exact candidate Git blob proof for the consumer map remains 37,311 bytes and SHA-256 `61ebec5d9839167f7665e1da5112de438dc08e04cdffa71335e7314baf8a3e7f`.
- NOT EXECUTED TO COMPLETION: gate live-bias and all-path bias checks require writing report artifacts; the restricted review worktree denied those writes. Placement golden-path tests passed. No baseline or report was regenerated.

Known repository/environment limitations remain separate: stale semantic-readiness provenance, absent ignored Scryfall raw fixture, absent visual baselines, fresh-worktree dependency/line-ending portability, and remote/deployed consumers outside committed local authority. None is treated as a candidate blocker.

## Bounded documentation remediation

1. Correct only the `decree` map row and dependent package text to use real function names, distinguish carry-through from consumption, scope tests accurately, and state unresolved remote/deployed/historical consumers.
2. Strengthen the documentation validator to reject blank public or internal treatment cells independently for both new rows; preserve every existing validation.
3. Add source-accurate bounded records for `decree`, `color_weights`, and `authored_preview_scores` to the critical extract; reconcile manifest/hash, validation, README, Kanban, and handoff records.
4. Submit the resulting exact documentation candidate for another narrow independent review.

No production implementation, implementation planning, task creation, merge, push, integration, deployment, or certification is authorized.
