# 2026-07-16 18:33 - Codex - VM-512 Gruul Independent Review

## Agent Name

Codex

## Task Requested

Perform independent exact-SHA review of VM-512 Gruul / RG candidate `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33` under CRIT-001 Operating Playbook v2, record the decision, and do not certify or start VM-513.

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
- Candidate semantic/generated/provenance/fixture files for RG.

## Files Changed

- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-16-1833-codex-vm512-gruul-independent-review.md`

## What Changed

- Recorded independent review decision `REQUEST CHANGES` for exact candidate `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`.
- Recorded one approval-blocking MEDIUM fixture/provenance exactness finding.
- Preserved Gruul as not certified and not `semantically_ready`.
- Preserved VM-513 as not started.

## Why It Changed

The provenance fixture for `data/raw-factions/gruul_clans/gruul_clans.profile.json#/core_identity` does not exactly match the generated provenance entry because duplicate claim IDs remain in the raw/fixture chain while generated provenance deduplicates them.

## Decisions Made

- Final review decision: `REQUEST CHANGES`.
- No candidate remediation was performed in this review window.
- No certification or next-identity work was performed.

## Risks / Uncertainties

- Repository automation passes this candidate, so the duplicate exact-chain issue requires manual review attention in the replacement sequence.
- Candidate-scope validator returns non-zero only for documented RG display-source exceptions in `data/identity-layers.json` and embedded RG preview copy in `data/factions.json`.
- Source/generated guardrails retain unrelated JESKAI/MARDU model-owned inhibitor warnings.

## Tests Run

- `git status --short --branch`
- candidate/workflow SHA and ancestry checks
- candidate and workflow diff inspections
- JSON parse checks for changed JSON files
- explicit evidence-scope, discovery/support isolation, provenance required-field, pointer, and fixture exact-match checks
- public/recruiter stale-copy scan
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=RG`
- `node research/validate-semantic-readiness.mjs --targets=RG`
- `node research/semantic-candidate-scope-tests.js`
- `node research/validate-semantic-candidate-scope.mjs --base=ea6e62a0fbe82975b48612ba02b143fad8a0c74b --target=73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33 --identity=RG`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`

## Not Touched

- Candidate semantic/generated/fixture/runtime files were not edited.
- Contract v1.1, schemas, builders, validators, Hall, Crucible, scoring, confidence, calibration, scheduling, tie-order, and global recruiter behavior were not changed.
- Certification was not performed.
- Gruul was not marked `semantically_ready`.
- VM-513 was not started.
- Original main worktree `C:\dev\mtgSiteWIP` was not modified.
- External Excel tracker was not modified.

## Follow-Up Recommendations

- Create a replacement candidate that removes duplicate claim IDs from the RG core/profile/placement chains and makes the provenance fixture exactly match the generated `/core_identity` provenance entry.
- Rerun full VM-512 validation and submit the replacement exact SHA for independent review.

## Next Suggested Agent

VM-512 remediation agent for a replacement candidate, only after explicit authorization.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`
