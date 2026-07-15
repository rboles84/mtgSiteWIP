# VM-540 Operating Playbook And Gate 0 Hardening Handoff

Agent name: Codex

Task requested: Create VM-540 as a one-time CRIT-001 Campaign Gate 0 task before Rakdos starts, adding Operating Playbook v2, governance/template updates, and narrow candidate-scope hardening for recurring CRIT-001 defects.

Files reviewed:

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-15-1203-codex-vm509-boros-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/incidents/templates/identity-semantic-recovery-template.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

Files changed:

- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/incidents/templates/identity-semantic-recovery-template.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/kanban/done/VM-540-crit001-operating-playbook-gate-zero-hardening.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-15-1556-codex-vm540-operating-playbook-gate-zero.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

What changed:

- Added CRIT-001 Operating Playbook v2 and linked it from the CRIT incident record.
- Documented the combined Gate 1+2, Gate 3+4, Gate 5, independent exact-SHA review, and governance-only certification model.
- Added stop rules for source ambiguity, raw-source blockers, generated proof-chain contamination, key-figure contamination, dropped collision guidance, lateral target drift, frozen field drift, missing native IDs, required provenance gaps, stale target-specific public copy, and candidate-scope failure.
- Updated the recovery template with Gate 0 and Gate 5 prerequisite checklists.
- Updated VM-510 Rakdos notes so Rakdos starts only after the accepted VM-540 base and begins with Gate 1+2 read-only audit/evidence confirmation.
- Added narrow candidate-scope checks for generated semantic proof-chain roles, generated key-figure proof chains, collision guidance preservation, required provenance fields, and evidence locator/source-ID consistency.

Why it changed:

- VM-502 through VM-509 exposed recurring process defects that should be caught before later identities reach candidate review.

Decisions made:

- Kept Contract v1.1 unchanged.
- Did not edit Rakdos raw data, generated artifacts, fixtures, or runtime behavior.
- Did not change scoring, confidence, inhibition, Hall, Crucible, scheduling, tie ordering, or global recruiter behavior.
- Recorded VM-540 as program Gate 0 hardening, not as an identity row.

Risks / uncertainties:

- The candidate-scope guard is stricter for future identity candidates; rejected Boros candidates demonstrate that the new checks catch real historical failures.
- The VM-540 commit does not record its own SHA in tracked content; the final task response reports the exact commit SHA.

Tests run:

- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- Boros positive candidate-scope check against `da2e9ef4036c427c17dca66c5a1a9d9a8fe03436`
- Boros negative candidate-scope checks against `abff94b91e94b99a6b2a77b71806a9d005ecec76` and `c2f5d064460a007f0dca6be95b7beabb4ca85026`
- `git diff --check`

Not touched:

- Rakdos raw packet and generated artifacts.
- Any identity remediation.
- Contract v1.1.
- Runtime behavior, scoring, confidence, inhibition, Hall, Crucible, scheduling, tie ordering, or global recruiter behavior.
- Original main worktree at `C:\dev\mtgSiteWIP`, except read-only status checks.

Follow-up recommendations:

- Start VM-510 Rakdos Gate 1+2 only after explicit authorization, using Operating Playbook v2.

Next suggested agent: VM-510 Rakdos Gate 1+2 read-only audit/evidence-confirmation agent, after explicit user authorization.

Related Kanban card, docs, or plans:

- `docs/kanban/done/VM-540-crit001-operating-playbook-gate-zero-hardening.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- CRIT-001 Contract v1.1
