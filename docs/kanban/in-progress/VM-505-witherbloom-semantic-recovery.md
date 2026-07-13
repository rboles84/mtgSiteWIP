# VM-505 - Witherbloom Semantic Recovery

ID: VM-505
Status: In Progress - Gate 5 candidate recorded; independent review pending
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WITHERBLOOM
Raw packet: `data/raw-factions/witherbloom/`
Cohort: college
Contract: CRIT-001 Contract v1.1

## Objective

Recover Witherbloom end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation, validation, and scope-policy cleanup complete.
- [ ] Gate 5 - Candidate created; independent review and certification pending.

## Gate 1 Result

- Gate 1 report: `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- Primary disposition: `Claim-extraction pass required`.
- Gate 2 required: yes.
- Summary: Witherbloom shares the thin Strixhaven packet pattern: 18 claims, 6 likely substantive official/source-backed claims, 10 discovery/search records, and 2 support records. Discovery/support records currently flow into authoritative profile, placement, and generated provenance chains.
- Witherbloom remains uncertified.

## Gate 2 Result

- Gate 2 section: `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md#gate-2-evidence-confirmation`
- Conclusion: No broad or targeted online source discovery is required right now.
- Gate 3 required: yes, canonical remediation only when authorized.
- Gate 3 should use current official/source-backed claims, local Witherbloom/Golgari canon guides, and already-known official source entries listed in `docs/research/canon/strixhaven/witherbloom/SOURCES.md`.
- Required-neighbor set for Gate 3 planning: BG/Golgari, Selesnya, Simic, and Quandrix.
- Witherbloom remains uncertified.

## Gate 3 Result

- Gate 3 section: `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md#gate-3-canonical-remediation`
- Canonical remediation complete.
- Claim role totals after remediation: 14 `substantive_claim`, 10 `discovery_record`, 2 `support_record`, 0 `unclassified`.
- New substantive claims added: `witherbloom_claim_0019` through `witherbloom_claim_0026`.
- Required neighbors selected: BG/Golgari, `SELESNYA_CONCLAVE`, `SIMIC_COMBINE`, and `QUANDRIX`.
- Generated artifacts remain stale until Gate 4; no candidate recovery commit exists.
- Witherbloom remains uncertified.


## Gate 4 Result

- Gate 4 section: `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md#gate-4-generation-and-validation`
- Generated artifacts and semantic provenance were rebuilt.
- Witherbloom semantic fixtures were added and semantic-readiness validation passed.
- Source/generated validation, semantic-readiness tests, placement tests, faction-context isolation, dossier follow-ups, dossier audit, structural audit, and `git diff --check` passed.
- Known warnings unchanged: builder-owned Witherbloom inhibitor warning; dossier audit remains 113 warnings / 0 failures.
- Scope-policy cleanup complete: existing collision rows retain accepted-base indexes, the new BG/Golgari row is appended, and the existing Quandrix `lateral_inhibition: false` path remains stable at index 2.
- Witherbloom remains uncertified; ready for Gate 5 candidate creation when authorized.
## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, confidence, tie-ordering, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- Gate 1 handoff: `docs/handoffs/2026-07-12-2319-codex-vm505-witherbloom-gate1-audit.md`
- Gate 2 handoff: `docs/handoffs/2026-07-12-2348-codex-vm505-witherbloom-gate2-evidence.md`
- Gate 3 handoff: `docs/handoffs/2026-07-13-0805-codex-vm505-witherbloom-gate3-remediation.md`
- Candidate recovery SHA: `48d240db3c7001a498a6e5a4602cc8cd54349776`
- Independent reviewer: pending
- Certification commit: pending

## Gate 5 Candidate Record

- Candidate parent SHA: `41d291072340f7ddfe4ffe90f2e57e4f4793142d`
- Candidate recovery SHA: `48d240db3c7001a498a6e5a4602cc8cd54349776`
- Workflow-record commit: pending in this commit
- Review status: pending independent review
- Certification: none
- Candidate-scope guard: dry-run passed with documented Witherbloom display-source exceptions only.
- Witherbloom remains uncertified.
