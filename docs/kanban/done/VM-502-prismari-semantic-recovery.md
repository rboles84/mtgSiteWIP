# VM-502 — Prismari Semantic Recovery

ID: VM-502
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: PRISMARI
Raw packet: `data/raw-factions/prismari/`
Cohort: college
Contract: v1.1

## Objective

Recover Prismari end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation.
- [x] Gate 5 — Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-502-prismari-semantic-recovery.md`
- Rejected candidate SHA: `85d3c79daa5081b6af4376506f51d33fe51e1225`
- Independent review result: `changes_requested`
- Prior replacement candidate SHA: `a7d81e5dee726b34d7d17ea933116111b47c9d4c`
- Prior replacement review result: `changes_requested` for unsupported Prismari `q1` beauty/efficiency binary
- Final bounded replacement candidate SHA: `19800da6322100b28fa6325fef91321e147b6f69`
- Final bounded replacement candidate parent SHA: `ba7aba2a3c7a41a6c29266038c7f940d35e41be4`
- Final bounded replacement candidate review result: `approved_exact_sha`
- Independent reviewer: Robert / user-supplied independent Gate 5 review in this Codex thread
- Approval date: 2026-07-12
- Certification state: `semantically_ready`
- Recovery commit: `19800da6322100b28fa6325fef91321e147b6f69`
- Certification commit: pending program acceptance pointer

## Gate 1 Disposition

- Primary disposition: `claim_extraction_and_traceability_repair`
- Required neighbors: `UR`, `BR`, `QUANDRIX`, `SILVERQUILL`
- Active gate: certified

## Replacement Candidate Scope

- Shared contract/schema/tooling changes: none.
- Runtime scoring, confidence, inhibition, tie-ordering, scheduling, Hall, and Crucible changes: none.
- Prismari `lateral_inhibition`: unchanged from the accepted program base; all Prismari collision entries remain `false`.
- Generated semantic outputs: Prismari-only changes across `data/factions.json`, `data/placement-model.json`, Supabase faction context, and semantic provenance.
- Known unrelated existing prompt: the old Quandrix-origin Prismari/Quandrix shared Crucible wording remains outside this identity recovery and was not edited.

## Replacement Validation

- PASS — `node research/validate-semantic-readiness.mjs --targets=PRISMARI`
- PASS — `npm.cmd run build:factions`
- PASS with known warnings — `npm.cmd run validate:source-generated -- --targets=UR,PRISMARI`
- PASS — `npm.cmd run test:semantic-readiness`
- PASS — `npm.cmd run test:placement`
- PASS — `npm.cmd run test:faction-context-isolation`
- PASS — `node research/archscry-dossier-followup-tests.js`
- PASS with known warnings — `npm.cmd run dossier:audit`
- PASS — `npm.cmd test`
- PASS — `npm.cmd run test:parser`
- PASS — `git diff --check`

Replacement validation was re-run after the final bounded Prismari `q1` correction. The reviewable candidate is `19800da6322100b28fa6325fef91321e147b6f69`. Candidate `a7d81e5dee726b34d7d17ea933116111b47c9d4c` remains rejected review history and must not be certified.

Additional final bounded correction validation:

- PASS — `node research/validate-semantic-candidate-scope.mjs --base=ba7aba2a3c7a41a6c29266038c7f940d35e41be4 --target=HEAD --identity=PRISMARI`
- PASS — old Prismari `q1` beauty/efficiency wording absent from canonical and generated Prismari consumers.
- PASS — new Prismari `q1` wording synchronized across canonical placement, `data/placement-model.json`, Supabase recruiter context, and semantic provenance.
- PASS — Prismari `q1` provenance carries claims `prismari_claim_002`, `prismari_claim_003`, `prismari_claim_0022`, and `prismari_claim_0025`.

## Certification

- Contract version: v1.1
- Approved recovery SHA: `19800da6322100b28fa6325fef91321e147b6f69`
- Independent review result: `APPROVE EXACT SHA`
- Reviewer: Robert / user-supplied independent Gate 5 review in this Codex thread
- Approval date: 2026-07-12
- Final state: `semantically_ready`
- Known unchanged warnings: dossier audit remains 113 warnings and 0 failures; existing builder-owned inhibitor warnings remain unchanged.
- Residual non-blocking finding: the pre-existing Quandrix-origin "correct but lifeless" wording remains in the frozen non-Prismari/shared Crucible path and is outside VM-502.

## Rejected Candidate

- Candidate `85d3c79daa5081b6af4376506f51d33fe51e1225` received `changes_requested`.
- The rejected candidate remains immutable audit history and must not be certified, modified, pushed, or merged.
- Candidate-record commit `725bf44` remains historical workflow evidence.
- No certification exists.
- Prismari remains active; Lorehold has not started.
- Full independent findings and the required replacement sequence are recorded in the audit/recovery report.
