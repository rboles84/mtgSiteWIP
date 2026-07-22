# DRIFT-020 Certification Handoff

Agent name: Codex

Task requested: Certification-only transition for exact approved DRIFT-020 shared-infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`; do not re-review, modify the candidate, resume Jund remediation, start VM-526, update Excel, push, merge, or open a PR.

## Program And Control

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Control: DRIFT-020 - identity-local authoritative-preview candidate scope.
- Certification branch: `codex/drift-020-jund-preview-candidate-scope-certification`.
- Certification worktree: `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope-certification`.
- Starting HEAD: `6533726b79812903989757a02b25daf5270a907b`.
- Certification parent: `6533726b79812903989757a02b25daf5270a907b`.
- Previous program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`.
- Jund feasibility-stop base: `460dd7186dc76658797beac74a4330cc699a52d6`.
- Exact certified candidate: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Qualification governance: `8ded0f4ed463e9a82564859d32051ec02dc97754`.
- Candidate workflow: `e13ce35349931edfc8dd7a02fc1a5c384b3d6013`.
- Independent-review commit: `6533726b79812903989757a02b25daf5270a907b`.
- Exact approval line: `APPROVE EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Review scorecard: PASS 15, FAIL 0, UNKNOWN 0, N/A 0.
- Approval-blocking findings: 0.
- Certification placeholder: `PENDING_DRIFT020_CERTIFICATION_COMMIT_SHA`.
- New program base after commit: the certification commit created by this window.

## Setup And Authority

Setup preflight found no certification branch collision, no remote certification branch collision, no certification worktree collision, no prior certification record for the exact candidate, no descendant or superseding DRIFT-020 review decision after `6533726b79812903989757a02b25daf5270a907b`, and no VM-526 branch/worktree. The committed independent-review handoff contains the exact approval line and ends with `APPROVE EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.

Authority reviewed: root `AGENTS.md`; `docs/handoffs/HANDOFF_INDEX.md`; `docs/kanban/board.md`; `docs/kanban/ready/DRIFT-020-jund-preview-candidate-scope.md`; `docs/kanban/blocked/VM-525-jund-semantic-recovery.md`; `docs/incidents/CRIT-001-operating-playbook.md`; `docs/incidents/CRIT-001-contract-v1.1-amendment.md`; `docs/reference/semantic-readiness-contract.md`; `docs/incidents/CRIT-001-drift-control-template.md`; `docs/incidents/CRIT-001-drift-register.md`; DRIFT-015, DRIFT-016, DRIFT-017, DRIFT-019, and DRIFT-020 records; DRIFT-020 qualification, workflow, and independent-review handoffs; VM-525 preflight, Gate 1+2, and Gate 3+4 STOP handoffs; and VM-522, VM-523, and VM-524 certification precedents.

Bounded certification requirement extracted: certification is governance-only, may certify only the exact independently approved candidate, must preserve candidate/qualification/workflow/review/certification separation, may use a self-referential placeholder internally, must leave the candidate implementation and tests unchanged, must not perform Jund remediation, and must make the certification commit the new CRIT-001 program base.

## Exact Object Chain

- `16528f3a24a7f3d7f4475bdde56fbfee09becd98` exists and is an ancestor of `460dd7186dc76658797beac74a4330cc699a52d6`.
- `460dd7186dc76658797beac74a4330cc699a52d6` exists and is an ancestor of `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` exists and is an ancestor of `8ded0f4ed463e9a82564859d32051ec02dc97754`.
- `8ded0f4ed463e9a82564859d32051ec02dc97754` exists and is an ancestor of `e13ce35349931edfc8dd7a02fc1a5c384b3d6013`.
- `e13ce35349931edfc8dd7a02fc1a5c384b3d6013` exists and is the direct parent of independent review `6533726b79812903989757a02b25daf5270a907b`.
- The certification commit must directly descend from independent review `6533726b79812903989757a02b25daf5270a907b`.

Candidate/workflow/review/certification separation: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` is the only certified candidate. Qualification governance `8ded0f4ed463e9a82564859d32051ec02dc97754`, workflow `e13ce35349931edfc8dd7a02fc1a5c384b3d6013`, independent review `6533726b79812903989757a02b25daf5270a907b`, this certification record, and the eventual certification commit are not the candidate.

## Scope Preservation

- Candidate implementation unchanged after candidate: PASS. The post-candidate diff through review is governance-only.
- Candidate tests unchanged after candidate: PASS.
- Identity semantic data unchanged after candidate: PASS.
- Generated semantic data unchanged after candidate: PASS.
- Jund semantic data unchanged in this certification window: PASS.
- Jund semantic candidate exists: no.
- Jund semantic remediation performed: no.
- Replacement DRIFT-020 candidate created: no.
- VM-526 touched: no.
- Excel touched: no.
- Historical/debug/archive exclusions touched: no.
- VM-542 / DRIFT-019 residuals touched: no.
- DRIFT-017 touched: no.
- Table Talk baseline touched: no.
- Original main touched: no.

Inherited stale-provenance disposition: independently reviewed as outside the DRIFT-020 candidate delta, not caused by the validator/test candidate, not repaired here, and non-blocking for this governance-only infrastructure certification.

## Governance Changes

Files changed by this certification:

- `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/kanban/board.md`
- `docs/kanban/done/DRIFT-020-jund-preview-candidate-scope.md`
- `docs/kanban/ready/VM-525-jund-semantic-recovery.md`
- `docs/kanban/ready/DRIFT-020-jund-preview-candidate-scope.md` removed by move
- `docs/kanban/blocked/VM-525-jund-semantic-recovery.md` removed by move

DRIFT-020 before certification: independently approved by exact SHA; certification-only next; VM-525 blocked until certification. DRIFT-020 after certification: exact candidate certified; control complete; new program base is the certification commit.

VM-525 before certification: blocked at Gate 3+4 STOP, with no semantic candidate. VM-525 after certification: DRIFT-020 shared-infrastructure blocker cleared; Jund may resume only in a separate future window from the new DRIFT-020 certification/program-base SHA; no Jund implementation, semantic remediation, generation, validation, or candidate creation occurred in this certification task.

VM-526 before certification: Naya backlog/not started. VM-526 after certification: byte-identical and not started.

## Protected Worktree Verification

- Original main `C:\dev\mtgSiteWIP`: inspected read-only; unrelated docs/audit/strategy dirt remains and was not touched.
- Long-running CRIT `C:\dev\mtgSiteWIP-crit001`: Table Talk baseline preserved (`M docs/handoffs/HANDOFF_INDEX.md` and two untracked Table Talk handoffs).
- VM-521 / Table Talk `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview`: clean and untouched.
- VM-522 original review `C:\dev\mtgSiteWIP-crit001-vm522-independent-review`: clean and untouched.
- VM-522 replacement review/certification `C:\dev\mtgSiteWIP-crit001-vm522-replacement-review`: clean and untouched.
- VM-523 campaign `C:\dev\mtgSiteWIP-crit001-vm523-esper`: clean and untouched.
- VM-523 review/certification `C:\dev\mtgSiteWIP-crit001-vm523-independent-review`: clean and untouched.
- VM-524 campaign `C:\dev\mtgSiteWIP-crit001-vm524-grixis`: clean and untouched.
- VM-524 review/certification `C:\dev\mtgSiteWIP-crit001-vm524-independent-review`: clean and untouched.
- VM-525 Jund `C:\dev\mtgSiteWIP-crit001-vm525-jund`: clean and still at the STOP line with no semantic candidate.
- DRIFT-020 candidate `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope`: clean and untouched.
- DRIFT-020 independent review `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope-review`: clean and untouched.
- DRIFT-017 prototype `C:\dev\mtgSiteWIP-crit001-drift017`: known uncommitted validator/test prototype files preserved; not read as evidence, staged, reset, cleaned, stashed, edited, or deleted.

## Validation

No implementation or generated tests were rerun because this task is governance-only and the exact independent review already recorded candidate-scope, focused regression, and exact-tree `npm.cmd test` PASS. Certification validation consisted of Git object/ancestry proofs, exact approval proof, post-candidate prohibited-path diff proof, protected-worktree status checks, complete governance diff inspection, and staged-diff checks before commit.

Pre-commit required checks to run before commit:

- `git status --short --branch`
- Complete unstaged diff inspection
- Non-governance path diff checks
- Explicit staging only
- `git diff --cached --check`
- `git diff --cached --stat`
- `git diff --cached --name-status`
- `git diff --cached`

## Decisions Made

- Certify exact candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` and no different SHA.
- Do not treat qualification governance `8ded0f4ed463e9a82564859d32051ec02dc97754` or workflow `e13ce35349931edfc8dd7a02fc1a5c384b3d6013` as approval.
- Use independent review `6533726b79812903989757a02b25daf5270a907b` as the approval authority.
- Use `PENDING_DRIFT020_CERTIFICATION_COMMIT_SHA` inside tracked governance for the self-referential certification commit.
- Do not create a second commit merely to replace the placeholder.
- Keep certified identity count at 23 of 37 because DRIFT-020 is a shared-infrastructure control, not an identity certification.

## Risks / Uncertainties

- The actual certification commit SHA cannot appear inside its own commit; final task output must report the real SHA for external tracker reconciliation.
- Jund semantic blockers remain unresolved because this certification intentionally did not resume VM-525 remediation.
- The inherited stale semantic-readiness provenance condition remains separate hygiene debt.

## Not Touched

No candidate implementation, candidate tests, candidate authority implementation, identity-layer semantic text, generated semantic data, Jund semantic data, Jund remediation, Jund candidate, replacement DRIFT-020 candidate, VM-526, VM-522/VM-523/VM-524 history, original main, Excel, DRIFT-017, VM-542/DRIFT-019 residuals, historical/debug/archive exclusions, Table Talk baseline, package scripts, schemas, generators, parser implementation, placement implementation, faction-context implementation, CI, push, merge, PR, amend, rebase, cherry-pick, reset, clean, or stash operation occurred.

## Follow-Up Recommendations

Next suggested agent: VM-525 Jund Gate 3+4 continuation agent in a separate future window, starting from the actual DRIFT-020 certification commit SHA as the new program base.

Related Kanban card, docs, or plans: `docs/kanban/done/DRIFT-020-jund-preview-candidate-scope.md`, `docs/kanban/ready/VM-525-jund-semantic-recovery.md`, `docs/incidents/CRIT-001-drift-register.md`, `docs/handoffs/2026-07-21-2004-codex-drift020-independent-review.md`, `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`.

CERTIFIED EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa
