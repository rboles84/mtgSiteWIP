# 2026-07-16 21:30 - Codex - VM-512 Gruul Replacement Review

## Agent Name

Codex

## Task Requested

Perform a fresh independent review of exact VM-512 Gruul / RG replacement candidate `16b58c3f32d92e6406d368169d91b0b6a86f948d`, record the decision, and do not certify Gruul or start VM-513.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-16-1719-codex-vm512-gruul-gate1-gate2.md`
- `docs/handoffs/2026-07-16-1754-codex-vm512-gruul-candidate.md`
- `docs/handoffs/2026-07-16-1833-codex-vm512-gruul-independent-review.md`
- `docs/handoffs/2026-07-16-1907-codex-vm512-gruul-review-fix.md`
- Gruul raw, generated, provenance, fixture, and recruiter surfaces required for exact replacement review.

## Files Changed

- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-16-2130-codex-vm512-gruul-replacement-review.md`

## What Changed

- Recorded independent replacement review decision `APPROVE EXACT SHA 16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- Recorded exact-chain parity, validation results, and no blocker/high/medium/low findings.
- Advanced VM-512 governance state to replacement candidate approved and awaiting certification.
- Preserved Gruul as not certified and not `semantically_ready`.
- Preserved VM-513 as not started.

## Why It Changed

The replacement candidate resolved the original provenance-fixture exact-chain mismatch by removing only duplicate claim-ID occurrences from affected raw and fixture chains. Generated and fixture `/core_identity` provenance now match exactly.

## Decisions Made

- Final review decision: `APPROVE EXACT SHA 16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- No candidate remediation was performed in this review window.
- No certification or next-identity work was performed.
- The unrelated Table Talk side-scan handoff/index dirty baseline was preserved and not treated as candidate content.

## Risks / Uncertainties

- Certification remains pending.
- Source/generated guardrails retain unrelated JESKAI/MARDU model-owned inhibitor warnings.
- The active worktree retained unrelated side-scan handoff/index changes outside the VM-512 review record.

## Tests Run

- `git status --short --branch`
- Required object and ancestry checks
- Replacement and workflow diff inspections
- Rejected-candidate duplicate-chain reproduction
- Replacement exact-chain duplicate and fixture/provenance parity checks
- JSON parse checks for replacement candidate JSON files
- Explicit substantive `evidence_scope` check
- Explicit discovery/support isolation check
- Stale public/recruiter-copy scan
- `npm.cmd run build:factions` twice
- `node research/audit-semantic-readiness.mjs --targets=RG`
- `node research/validate-semantic-readiness.mjs --targets=RG`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=04c0933825c985373336ba9bdbfccbbcf29d8e82 --target=16b58c3f32d92e6406d368169d91b0b6a86f948d --identity=RG`

## Not Touched

- Candidate semantic/raw/generated/provenance/fixture/runtime files were not edited.
- Contract v1.1, schemas, builders, validators, Hall, Crucible, scoring, confidence, calibration, scheduling, tie-order, and global recruiter behavior were not changed.
- Certification was not performed.
- Gruul was not marked `semantically_ready`.
- VM-513 was not started.
- Original main worktree `C:\dev\mtgSiteWIP` was not modified.
- External Excel tracker was not modified.

## Follow-Up Recommendations

- Proceed only with explicit authorization for VM-512 certification of exact approved replacement candidate `16b58c3f32d92e6406d368169d91b0b6a86f948d`.

## Next Suggested Agent

VM-512 certification agent, only after explicit authorization.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`
