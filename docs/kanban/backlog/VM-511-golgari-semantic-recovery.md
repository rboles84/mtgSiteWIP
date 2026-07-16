# VM-511 — Golgari Semantic Recovery

ID: VM-511
Status: Awaiting Independent Review - Gate 5 candidate created; not certified
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: BG
Raw packet: `data/raw-factions/golgari_swarm/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Golgari end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [ ] Gate 1 — Packet audit and bounded disposition.
- [ ] Gate 2 — Sufficient evidence completion.
- [ ] Gate 3 — Canonical remediation.
- [ ] Gate 4 — Generation and validation.
- [ ] Gate 5 — Independent certification.

## Gate 1+2 Audit Result - 2026-07-16

- Gate 1+2 completed from program base `5c221f342ae4f95920ece35261dd7f34afeaa667` on branch `codex/vm-511-golgari-semantic-recovery`.
- Audit/recovery report: `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`.
- Primary disposition: `claim_extraction_pass_required`.
- Source sufficiency verdict: sufficient for bounded Gate 3 remediation from existing listed/local sources; no broad online source discovery required before Gate 3.
- Required Gate 3 stop rule: stop if exact bounded locators for the official overview/mechanics/prerelease sources, or the optional local MaRo black-green philosophy source, cannot be established for retained claims.
- Proposed required neighbors: `GENERIC_BG_OVERFIT`, `B`, `G`, `WITHERBLOOM`, `WG`, `WB`, `RG`, `BR`, `UB`, `SIMIC_COMBINE`, `ABZAN`, `JUND`, `SULTAI`.
- Target-specific stale phrase risks: `Nothing is wasted`, `Everything feeds something else`, `Death feeds life`, `The Swarm grows`, `death`, `decay`, `rot`, `graveyard`, `zombie`, `undercity`, `survival`, `reclamation`, `cycle`, `recursion`, `dredge`, `sacrifice`, `poison`, `infection`, `plague`, `growth`, `food`, `hunger`, `inevitability`, `body`, `mortality`.
- No Golgari raw data, generated artifacts, fixtures, runtime behavior, builder, validator, schema, contract, Hall, Crucible, scoring, inhibition, confidence, calibration, scheduling, tie-ordering, or global recruiter files were changed in Gate 1+2.
- Gate 3 canonical remediation is authorized by the current VM-511 Goal only if local source localization succeeds and the remediation remains within Contract v1.1 / Operating Playbook v2 scope.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- Candidate recovery SHA: `a649c306f19d0be3c9f09f549163200761ce9e15`
- Independent reviewer: pending
- Certification commit: pending

## Gate 5 Candidate Record - 2026-07-16

- Gate 1+2 report commit: `da25a3aa43e88fa46e37ca82b76e066631ae53d5`.
- Candidate commit: `a649c306f19d0be3c9f09f549163200761ce9e15`.
- Workflow-record commit: pending in this commit.
- Gate 3+4 remediation, generation, fixtures, and validation are complete.
- Candidate-scope dry-run passed for BG against `da25a3aa43e88fa46e37ca82b76e066631ae53d5..f4be0db534bd9748972cdfb20749b7e6a912d37d`.
- Candidate-scope actual result passed for BG against `da25a3aa43e88fa46e37ca82b76e066631ae53d5..HEAD`.
- Golgari is awaiting independent exact-SHA review.
- Golgari is not certified.
- No VM-512 or other identity has started.
