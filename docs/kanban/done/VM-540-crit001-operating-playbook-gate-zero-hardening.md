# VM-540 — CRIT-001 Operating Playbook And Gate 0 Hardening

ID: VM-540
Status: Done
Type: CRIT-001 Campaign Gate 0 Hardening
Priority: CRIT-001
Identity key: N/A
Contract: CRIT-001 Contract v1.1 unchanged

## Objective

Add a one-time CRIT-001 operating playbook and narrow guard/test hardening before VM-510 Rakdos starts. This task hardens process only: docs, templates/checklists, ledger/card notes, and narrowly scoped candidate-scope tests for recurring CRIT-001 defects already observed.

## Scope Rules

- Run only in `C:\dev\mtgSiteWIP-crit001` on `codex/vm-510-rakdos-semantic-recovery`.
- Do not mutate `C:\dev\mtgSiteWIP`.
- Do not edit Rakdos raw data or generated artifacts.
- Do not modify Contract v1.1.
- Do not start Rakdos remediation.
- Do not change runtime scoring, confidence, inhibition, Hall, Crucible, scheduling, tie ordering, or global recruiter behavior.

## Deliverables

- Add `docs/incidents/CRIT-001-operating-playbook.md` as Operating Playbook v2.
- Link the playbook from the CRIT-001 incident record.
- Update the identity recovery template with Gate 0 and Gate 5 candidate-scope prerequisites.
- Update VM-510 Rakdos notes so Rakdos starts after the accepted VM-540 base and begins with Gate 1+2 read-only audit/evidence confirmation.
- Add narrow candidate-scope checks for observed recurring defects:
  - generated authoritative proof chains using discovery/support records;
  - generated key-figure proof contamination;
  - collision-guidance preservation;
  - required provenance fields;
  - mechanical source locator/source-ID consistency.
- Run Boros positive and negative candidate-scope checks against reachable historical SHAs.

## Validation

Required:

- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- Boros positive candidate-scope check against `da2e9ef4036c427c17dca66c5a1a9d9a8fe03436`
- Boros negative candidate-scope checks against `abff94b91e94b99a6b2a77b71806a9d005ecec76` and `c2f5d064460a007f0dca6be95b7beabb4ca85026`
- `git diff --check`

## Final Status

VM-540 is complete when the one required commit exists:

`VM-540 add CRIT-001 operating playbook and gate zero hardening`

This commit does not need to record its own final SHA.
