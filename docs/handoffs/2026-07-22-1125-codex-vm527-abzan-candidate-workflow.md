# VM-527 Abzan Candidate Workflow

Agent name: Codex

Task requested: Record the VM-527 Abzan Gate 5 candidate workflow for the exact semantic candidate SHA and prepare it for independent exact-SHA review without performing review or certification.

## Decision

READY FOR INDEPENDENT REVIEW OF EXACT SHA `11c099b8beb9f23e23660787f00b97e89914d50b`.

This is a workflow record only. It is not independent review, approval, certification, semantically_ready transition, program-base advancement, Excel work, VM-528 work, push, PR, merge, original-main work, or protected-worktree work.

## Files Reviewed

- `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`
- `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- `docs/handoffs/2026-07-22-1110-codex-vm527-abzan-gate3-gate4.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Candidate commit `11c099b8beb9f23e23660787f00b97e89914d50b`

## Files Changed

- `docs/handoffs/2026-07-22-1125-codex-vm527-abzan-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## What Changed

- Recorded Gate 5 workflow for exact candidate SHA `11c099b8beb9f23e23660787f00b97e89914d50b`.
- Marked VM-527 as awaiting independent exact-SHA review.
- Preserved Abzan's canonical identity key as `ABZAN` with display color order `WBG`.
- Preserved invalid candidate-scope alias rejection for `WBG`, `BGW`, and `GWB`.
- Recorded that the candidate workflow commit is governance-only and distinct from the semantic candidate.

## Why It Changed

CRIT-001 requires a separate candidate workflow record after Gate 3+4 validation and before independent review. This record freezes the exact candidate SHA and scope boundary for the reviewer without advancing certification or touching any semantic/generated data.

## Candidate Facts

- Exact candidate SHA: `11c099b8beb9f23e23660787f00b97e89914d50b`
- Program base: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`
- Gate 3+4 governance commit: `a0e37d2cfa1f8055f76d69855566e59c21049ddb`
- Claim count: 11 total; 10 substantive; 1 support; 0 discovery; 0 unclassified.
- Semantic provenance: 43 ABZAN rows; 0 null canonical IDs; 0 null canonical content hashes; 2 auxiliary support rows.
- Fixtures: 17 total.
- Candidate-scope: PASS for `ABZAN` from the VM-526 program base.
- Alias controls: `WBG`, `BGW`, and `GWB` fail closed as invalid identities.

## Decisions Made

- Exact SHA `11c099b8beb9f23e23660787f00b97e89914d50b` is the only candidate eligible for independent VM-527 review from this workflow.
- Any later semantic change requires a new candidate SHA and a new candidate workflow record.
- Independent review must rerun drift/candidate-scope controls instead of trusting this implementation summary.
- Certification remains blocked until an independent reviewer explicitly approves the exact SHA.

## Risks / Uncertainties

- `npm test` remains partially blocked by the missing local corpus file `data/scryfall/raw/oracle-cards.json`; prior suites passed before that missing-file stop.
- The known non-blocking model-owned inhibitor warning remains documented from `validate-source-generated-guardrails`.
- This workflow record uses `PENDING_VM527_CANDIDATE_WORKFLOW_SHA` inside governance for its own commit SHA; the actual commit SHA must be reported in final output and may be reconciled during review or certification governance.

## Tests Run

- `git rev-parse 11c099b` - resolved to `11c099b8beb9f23e23660787f00b97e89914d50b`.
- `git show --no-patch --format=%H%n%P%n%s HEAD` - confirmed candidate commit subject `VM-527: remediate Abzan semantic readiness` and parent `ce550014275d48960b74c47e9ba97169cfbd4fd0`.
- `node -e "JSON.parse(require('fs').readFileSync('docs/incidents/CRIT-001-identity-recovery-ledger.json','utf8')); console.log('ledger ok')"` - PASS before this patch.
- `git diff --check` - PASS before this patch, with CRLF warnings only.

## Not Touched

No independent review, approval, certification, semantically_ready transition, certified-count change, program-base advancement, Excel edit, VM-528 work, push, PR, merge, original-main edit, protected worktree edit, DRIFT-017 prototype edit, DRIFT-020 implementation/test edit, schema implementation edit, package/lockfile edit, CI edit, historical/debug/archive edit, or Table Talk edit occurred.

## Follow-Up Recommendations

Send exact SHA `11c099b8beb9f23e23660787f00b97e89914d50b` to an independent reviewer. The reviewer should verify exact chain, candidate scope, semantic readiness, provenance, fixture parity, invalid alias rejection, and non-review/certification boundaries before issuing any approval decision.

## Next Suggested Agent

Independent exact-SHA reviewer for VM-527 Abzan candidate `11c099b8beb9f23e23660787f00b97e89914d50b`.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`
- `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- `docs/handoffs/2026-07-22-1110-codex-vm527-abzan-gate3-gate4.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`

READY FOR INDEPENDENT REVIEW OF EXACT SHA `11c099b8beb9f23e23660787f00b97e89914d50b`
