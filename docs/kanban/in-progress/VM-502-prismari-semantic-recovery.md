# VM-502 — Prismari Semantic Recovery

ID: VM-502
Status: In Progress
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
- [ ] Gate 5 — Independent certification.

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
- Replacement candidate SHA: `a7d81e5dee726b34d7d17ea933116111b47c9d4c`
- Replacement candidate parent SHA: `6c0e8700fcb27859afd224cabe395af62416a921`
- Replacement candidate branch base: `e9e98852c7c65db846384eeda3369f4fcfd55fe6`
- Replacement candidate review result: pending independent review
- Certification commit: pending

## Gate 1 Disposition

- Primary disposition: `claim_extraction_and_traceability_repair`
- Required neighbors: `UR`, `BR`, `QUANDRIX`, `SILVERQUILL`
- Active gate: candidate review pending

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

Replacement validation was re-run after the final scope-guard correction commit. The reviewable candidate is `a7d81e5dee726b34d7d17ea933116111b47c9d4c`, not the earlier guard-failing intermediate commit `6c0e8700fcb27859afd224cabe395af62416a921`.

## Rejected Candidate

- Candidate `85d3c79daa5081b6af4376506f51d33fe51e1225` received `changes_requested`.
- The rejected candidate remains immutable audit history and must not be certified, modified, pushed, or merged.
- Candidate-record commit `725bf44` remains historical workflow evidence.
- No certification exists.
- Prismari remains active; Lorehold has not started.
- Full independent findings and the required replacement sequence are recorded in the audit/recovery report.
