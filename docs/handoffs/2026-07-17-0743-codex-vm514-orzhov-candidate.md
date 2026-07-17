# VM-514 Orzhov Candidate Handoff

- Agent name: Codex
- Task requested: Complete VM-514 Orzhov / WB Goal mode from Gate 1+2 audit through Gate 5 candidate creation, stopping with Orzhov awaiting independent review.
- Related Kanban card: `docs/kanban/backlog/VM-514-orzhov-semantic-recovery.md`
- Related report: `docs/incidents/recoveries/VM-514-orzhov-semantic-recovery.md`
- Gate 1+2 commit: `de5e2e8344dcdfd6feb44e3731a0819f44142bb6`
- Superseded candidate: `5cbd1bd5f3a10cdc84db4d15ad4bb92a16572048`
- Final candidate: `8aea3e359c16687948178ad55a927cf758fd9206`

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-514-orzhov-semantic-recovery.md`
- `docs/kanban/backlog/VM-514-orzhov-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/orzhov_syndicate/*`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Recent certified Ravnica precedents for workflow shape only.

## Files Changed

Gate 1+2 governance:

- `docs/incidents/recoveries/VM-514-orzhov-semantic-recovery.md`
- `docs/kanban/backlog/VM-514-orzhov-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-17-0702-codex-vm514-orzhov-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`

Candidate implementation:

- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.claims.json`
- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.profile.json`
- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.placement.json`
- `data/raw-factions/orzhov_syndicate/orzhov_syndicate.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/orzhov_syndicate.semantic-fixtures.json`

Workflow record:

- `docs/incidents/recoveries/VM-514-orzhov-semantic-recovery.md`
- `docs/kanban/backlog/VM-514-orzhov-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-17-0743-codex-vm514-orzhov-candidate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Gate 1+2 found 17 Orzhov claims with 0 substantive, 10 discovery, 0 support, and 7 unclassified records, plus missing WB fixtures, 31 null WB canonical IDs, and 27 discovery-backed provenance chains.
- Gate 3+4 remediated Orzhov to 32 claims: 22 substantive, 10 discovery, 0 support, and 0 unclassified.
- Every substantive Orzhov claim now has bounded evidence locations with `evidence_scope`.
- Discovery/story-corpus records are isolated from authoritative proof chains and retained only as metadata/history.
- Orzhov public, placement, recruiter, provenance, and fixture consumers were regenerated from canonical raw data.
- WB semantic fixtures now cover positive Orzhov semantics, generic WB overfit, required-neighbor boundaries, stale/mechanic-overfit risks, and exact provenance chains.
- First candidate `5cbd1bd5f3a10cdc84db4d15ad4bb92a16572048` was superseded after post-commit candidate-scope rejected confidence/native-ID/lateral-target/generic collision-target drift.
- Final candidate `8aea3e359c16687948178ad55a927cf758fd9206` passed candidate-scope and awaits independent review.

## Why It Changed

CRIT-001 Contract v1.1 requires source-bounded semantic roles, evidence scopes, discovery/support isolation, non-null provenance IDs/hashes, exact fixture/provenance parity, and a candidate-scope-clean immutable candidate before independent review.

## Decisions Made

- Generic WB overfit is covered as an inhibitor/fixture/discriminator risk, not as a generated collision target, because candidate-scope accepts only canonical identity/color targets in generated collision guidance.
- New collision/discriminator guidance is explicitly non-lateral where needed so generated lateral targets remain frozen at `WU`, `UB`, `SILVERQUILL`, `ESPER`, `ABZAN`, and `MARDU`.
- Pre-existing native IDs that cannot serve as authoritative proof are retained only as metadata/history.
- No online source intake was needed.

## Risks / Uncertainties

- Orzhov awaits independent review. No approval, rejection, or certification decision has been issued.
- Known unrelated `npm.cmd run test:source-generated` warnings remain for JESKAI and MARDU model-owned inhibitor text; they are unchanged and unrelated to WB.
- Active worktree Table Talk side-scan changes remain preserved and uncommitted.

## Tests Run

- `npm.cmd run build:factions`
- Custom JSON/provenance/frozen-field guard
- `node research/audit-semantic-readiness.mjs --targets=WB`
- `node research/validate-semantic-readiness.mjs --targets=WB`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `node research/validate-semantic-candidate-scope.mjs --base=de5e2e8344dcdfd6feb44e3731a0819f44142bb6 --target=8aea3e359c16687948178ad55a927cf758fd9206 --identity=WB`
- `git diff --check`

## Not Touched

- `C:\dev\mtgSiteWIP`
- External Excel tracker
- Contract v1.1
- Schemas
- Builders or validators
- Hall, Crucible, scoring, confidence behavior, calibration, scheduling, tie-ordering, or global recruiter behavior
- Non-Orzhov raw packets
- VM-515
- Independent review or certification records

## Follow-up Recommendations

- Run an independent review of exact candidate `8aea3e359c16687948178ad55a927cf758fd9206`.
- If review approves, certify that exact SHA in a separate certification-only window.
- If review requests changes, preserve this candidate and create a replacement candidate plus workflow record.

## Next Suggested Agent

Independent CRIT-001 reviewer for VM-514 Orzhov / WB.
