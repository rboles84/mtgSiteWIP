# VM-524 - Grixis Semantic Recovery

ID: VM-524
Status: Done - Certified semantically_ready
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: GRIXIS
Raw packet: `data/raw-factions/grixis/`
Program base: `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`
Preflight record: `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
Gate 1+2 record: `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
Gate 3+4 record: `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
Candidate workflow record: `docs/handoffs/2026-07-21-0753-codex-vm524-grixis-candidate-workflow.md`
Independent review record: `docs/handoffs/2026-07-21-0825-codex-vm524-grixis-independent-review.md`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Grixis end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight - complete; Gate 1+2 read-only audit authorized.
- [x] Gate 1 - Packet audit and bounded disposition complete.
- [x] Gate 2 - Sufficient evidence contract complete.
- [x] Gate 3 - Canonical remediation complete in implementation commits `a6115285e859fbd46f0cd0726429b7e5ddd28e0a` and `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- [x] Gate 4 - Generation and validation complete; exact candidate qualified.
- [x] Gate 5 - Exact candidate workflow recorded for `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- [x] Independent exact-SHA review - approved exact candidate `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- [x] Certification - complete; exact approved candidate certified.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- The candidate workflow commit must never be substituted for exact semantic candidate SHA `64a5bfffd646b292c7481f91c9ccb6def42fb552`.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
- Gate 3+4 remediation report: `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
- Candidate workflow record: `docs/handoffs/2026-07-21-0753-codex-vm524-grixis-candidate-workflow.md`
- Candidate recovery SHA: `64a5bfffd646b292c7481f91c9ccb6def42fb552`
- Independent reviewer: approved exact SHA `64a5bfffd646b292c7481f91c9ccb6def42fb552` in `docs/handoffs/2026-07-21-0825-codex-vm524-grixis-independent-review.md`
- Certification commit: PENDING_VM524_CERTIFICATION_COMMIT_SHA

## Current Status

PASS - Grixis exact semantic candidate `64a5bfffd646b292c7481f91c9ccb6def42fb552` is certified `semantically_ready` after independent approval in `docs/handoffs/2026-07-21-0825-codex-vm524-grixis-independent-review.md`. The semantic candidate remains distinct from Gate 3+4 governance `bc2d1ec5f77c88f2afd2e4d0693e3249a172bcc7`, workflow-record commit `d72c1cac9b94e4e4a2c6dbeb7137b1dcc8d6595d`, independent-review governance commit `2029610126f6742241db96ff148eaf1e67ee1dc2`, and certification commit placeholder `PENDING_VM524_CERTIFICATION_COMMIT_SHA`.

## Certification - 2026-07-21

- Certified status: `semantically_ready`.
- Exact approved recovery candidate: `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- Candidate workflow record: `d72c1cac9b94e4e4a2c6dbeb7137b1dcc8d6595d`.
- Independent approval review: `2029610126f6742241db96ff148eaf1e67ee1dc2`.
- Exact approval line: `APPROVE EXACT SHA 64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- Certification placeholder: `PENDING_VM524_CERTIFICATION_COMMIT_SHA`.
- Certified count: 23 of 37.
- Wave 4 count: 3 of 10.
- Evidence locators: 23.
- Provenance count: 73 GRIXIS entries.
- Fixture count: 22.
- VM-525 / Jund: not started and untouched.
- Excel tracker: untouched.

No source, claim, evidence, provenance ownership, fixture, collision, preview, generated semantic, recruiter, runtime, test, validator, generator, schema, package, CI, historical/debug/archive, DRIFT-017 prototype, VM-542/DRIFT-019 residual, original-main, protected-worktree, or Table Talk change occurred in certification.
