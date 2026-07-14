# VM-507 â€” Izzet Semantic Recovery

ID: VM-507
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: UR
Raw packet: `data/raw-factions/izzet_league/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Izzet end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 â€” Packet audit and bounded disposition.
- [x] Gate 2 â€” Sufficient evidence completion.
- [x] Gate 3 â€” Canonical remediation.
- [x] Gate 4 â€” Generation and validation.
- [ ] Gate 5 â€” Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`
- Candidate recovery SHA: `d5bca29f3c55d0d69fe8567a69c8326dcc83d770`
- Independent reviewer: pending
- Certification commit: pending

## Gate 1 Status

Completed 2026-07-13 on branch `codex/vm-507-izzet-semantic-recovery` at `5bc25af194d2c7e14c4350d58c9b791775253734`.

Primary disposition: **Source-linkage cleanup required**.

Gate 2 bounded evidence confirmation is required. Izzet remains uncertified; no remediation, generated rebuild, candidate, certification, or next identity work has started.

## Gate 2 Status

Completed 2026-07-13 on branch `codex/vm-507-izzet-semantic-recovery` at `5bc25af194d2c7e14c4350d58c9b791775253734`.

Conclusion: existing Izzet claims and already-listed sources are sufficient to plan bounded remediation. No broad or targeted online source discovery is required right now.

Gate 3 canonical remediation is required. Izzet remains uncertified; no canonical raw data, generated artifacts, candidate, certification, or next identity work has started.

## Gate 3 Status

Completed 2026-07-13 on branch `codex/vm-507-izzet-semantic-recovery` at `5bc25af194d2c7e14c4350d58c9b791775253734`.

Canonical remediation complete: all 104 Izzet claims are `substantive_claim`, every substantive claim has bounded `evidence_locations`, recruiter guidance evidence mappings were added, support-only rules material was isolated as auxiliary, collision guidance was added for Prismari, Quandrix, Simic, Azorius, Rakdos, Dimir, and generic UR overfit, and overbroad raw wording was narrowed.

Izzet remains uncertified. Generated artifacts, fixtures, provenance rebuild, source/generated validation, generated-diff isolation, and regression tests are deferred to Gate 4. No candidate or certification commit has been created.

## Gate 4 Status

Completed 2026-07-13 on branch `codex/vm-507-izzet-semantic-recovery` at `5bc25af194d2c7e14c4350d58c9b791775253734`.

Generated artifacts and semantic provenance were rebuilt, Izzet semantic fixtures were added, and the bounded raw-sourced wording blocker in `q_izzet_league_0008` was corrected from "Reckless inventor who still wants the machine to work." to "Risk-aware inventor who wants the experiment to keep working, scale, or teach something useful." The replacement propagated into generated placement output.

Validation passed for `build:factions`, semantic readiness, source/generated parity, semantic readiness fixtures/provenance check, placement tests, faction-context isolation tests, dossier follow-ups, dossier audit, semantic audit, generated-diff isolation, and `git diff --check`.

Known warnings are unchanged: the builder-owned Izzet inhibitor warning remains, and dossier audit remains 113 warnings / 0 failures.

Izzet remains uncertified. Gate 5 candidate creation is ready when explicitly authorized; no candidate or certification commit has been created.

## Gate 5 Candidate Record

Candidate recovery commit created 2026-07-13.

- Candidate parent SHA: `5bc25af194d2c7e14c4350d58c9b791775253734`
- Candidate recovery SHA: `d5bca29f3c55d0d69fe8567a69c8326dcc83d770`
- Candidate message: `VM-507 create Izzet semantic recovery candidate`
- Workflow-record commit: pending this separate record commit
- Candidate-scope guard result: no confidence, calibration, lateral-inhibition, non-Izzet raw packet, or non-Izzet semantic findings. Generated changes are UR/Izzet-scoped; `data/factions.json` contains the documented Izzet display-source cleanup for stale preserved public copy.
- Known warnings unchanged: builder-owned Izzet inhibitor warning; dossier audit remains 113 warnings / 0 failures.

Izzet remains uncertified pending independent Gate 5 review of the exact candidate SHA. No certification commit has been created.
