# 2026-07-16 22:54 - Codex - VM-513 Dimir Candidate

## Agent Name

Codex

## Task Requested

Complete VM-513 Dimir / UB from Gate 1+2 audit through Gate 5 candidate creation, then stop with Dimir awaiting independent review.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/incidents/recoveries/VM-513-dimir-semantic-recovery.md`
- `docs/kanban/backlog/VM-513-dimir-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/house_dimir/`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Recent Izzet, Azorius, Boros, Rakdos, Golgari, and Gruul CRIT-001 precedents for process only.

## Files Changed

Gate 1+2 governance commit:

- `docs/incidents/recoveries/VM-513-dimir-semantic-recovery.md`
- `docs/kanban/backlog/VM-513-dimir-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-16-2213-codex-vm513-dimir-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`

Candidate range:

- `data/raw-factions/house_dimir/house_dimir.claims.json`
- `data/raw-factions/house_dimir/house_dimir.profile.json`
- `data/raw-factions/house_dimir/house_dimir.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/house_dimir.semantic-fixtures.json`

Workflow-record commit:

- `docs/incidents/recoveries/VM-513-dimir-semantic-recovery.md`
- `docs/kanban/backlog/VM-513-dimir-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-16-2254-codex-vm513-dimir-candidate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

Gate 1+2 found Dimir had 16 claims, 0 substantive claims, 10 discovery records, 0 support records, 6 unclassified records, missing fixtures, 31 null UB provenance canonical IDs, and discovery/unclassified proof-chain contamination. Gate 3+4 remediated Dimir to 32 claims: 22 substantive, 10 discovery, 0 support, 0 unclassified.

The candidate localizes source-supported Dimir semantics to official listed sources, isolates discovery-only story-corpus records, removes discovery-backed key-figure proof, clarifies Commander Compass auxiliary metadata, adds UB fixtures, rebuilds generated consumers, and proves exact fixture/provenance parity.

Final candidate SHA awaiting independent review: `6e6c079d19ee152016212f01f8c2ffd81f0ca0ee`.

## Why It Changed

CRIT-001 Contract v1.1 requires authoritatively consumed claims to have semantic roles, bounded evidence locations with `evidence_scope`, valid source-backed proof chains, generated provenance coverage, and fixture parity. The prior Dimir packet used discovery/search/story-corpus records as proof and left generated surfaces vulnerable to generic UB overfit.

## Decisions Made

- Keep discovery-only story records as metadata/history only.
- Retain Etrata and Circu native IDs only under explicit discovery metadata, not key-figure proof chains.
- Preserve frozen placement calibration/confidence shape; final candidate restores `/placement_summary/calibrated_primary_read` and keeps confidence-slot positions intact.
- Use all required neighbors: `GENERIC_UB_OVERFIT`, `U`, `B`, `WU`, `UR`, `BR`, `BG`, `WB`, `UG`, `SILVERQUILL`, `ESPER`, `GRIXIS`, and `SULTAI`.
- Do not certify Dimir or start VM-514.

## Risks / Uncertainties

- Intermediate SHA `16d7cae2565684d1320306cc3f2e31b2417b2b0f` failed post-commit candidate-scope for frozen placement confidence/calibration drift and was superseded before workflow record.
- Remaining stale-risk terms are retained only in guardrail, suppression, fixture, or discovery metadata language.
- JESKAI and MARDU source/generated guardrail warnings remain pre-existing and unrelated.

## Tests Run

- JSON parse checks for changed JSON files
- `npm.cmd run build:factions`
- Explicit duplicate-ID checks
- Explicit fixture/provenance exact-chain comparison
- Explicit substantive `evidence_scope` check
- Explicit discovery/support isolation check
- Explicit null canonical-ID/hash scan
- Targeted stale Dimir public/recruiter-copy scan
- `node research/audit-semantic-readiness.mjs --targets=UB`
- `node research/validate-semantic-readiness.mjs --targets=UB`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=646ea02aa12959441eba6e0844b902cf32bab914 --target=6e6c079d19ee152016212f01f8c2ffd81f0ca0ee --identity=UB`

## Not Touched

- No Contract v1.1 changes.
- No schema changes.
- No builder/validator changes.
- No Hall, Crucible, scoring, confidence, calibration, scheduling, tie-order, or global recruiter behavior changes.
- No non-Dimir raw packet changes.
- No independent review, approval decision, certification, semantically_ready transition, VM-514 work, original main worktree edit, or external Excel tracker edit.
- Unrelated Table Talk side-scan files and index hunks were preserved and excluded from VM-513 commits.

## Follow-Up Recommendations

Run an independent Gate 5 review against exact SHA `6e6c079d19ee152016212f01f8c2ffd81f0ca0ee`.

## Next Suggested Agent

Independent CRIT-001 reviewer for VM-513 Dimir candidate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-513-dimir-semantic-recovery.md`
- `docs/incidents/recoveries/VM-513-dimir-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
