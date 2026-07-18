# VM-516 Simic Candidate Workflow Handoff

Agent: Codex
Task requested: Complete VM-516 Simic drift-controlled Goal Mode through Gate 5 candidate and workflow-record commit.
Date: 2026-07-17

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/recoveries/VM-516-simic-drift-preflight.md`
- `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`
- `data/raw-factions/simic_combine/`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/`
- Recent Dimir, Orzhov, and Selesnya workflow records.

## Files Changed

Candidate implementation commits changed:

- `data/raw-factions/simic_combine/simic_combine.claims.json`
- `data/raw-factions/simic_combine/simic_combine.profile.json`
- `data/raw-factions/simic_combine/simic_combine.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/simic_combine.semantic-fixtures.json`

Workflow-record commit changes:

- `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`
- `docs/kanban/backlog/VM-516-simic-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-17-1835-codex-vm516-simic-candidate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Gate 1+2 committed as `06f140a1e78a24d6c549943d6beb471f4e714302`.
- Simic was remediated to 33 total claims: 23 substantive, 10 discovery, 0 support, 0 unclassified.
- Discovery-story claims were isolated from identity, placement, public copy, recruiter guidance, fixtures, and generated provenance proof chains.
- Public/recruiter Simic copy was narrowed away from generic UG/mechanic-first language.
- Simic fixtures were added and exact-chain parity was verified for `/core_identity` and `/placement_summary`.
- Final UG provenance is 72 entries with 0 required null canonical IDs, 0 null hashes, 0 unresolved pointers, and 0 duplicate canonical entries.
- Superseded candidate `f4afb9d5d769c72e1c86df189729423a380629af` failed candidate-scope on added confidence fields.
- Superseded candidate `204cf9e6be15f2c3ac59a36c3977efea9a9945ce` failed candidate-scope on core-values confidence drift.
- Final candidate `cbca9f596a090e924d532e7cb657c27c79ccb9de` passed exact candidate-scope validation and awaits independent review.

## Decisions Made

- Kept the generated generic collision target absent and represented GENERIC_UG_OVERFIT through bounded claims/fixtures/guidance instead.
- Preserved frozen confidence, calibration, lateral targets, required terms, minimum hit threshold, broad penalty, strengthen/suppress lists, and native IDs.
- Retained discovery-only story rows as metadata/history only.
- Preserved the allowed Table Talk baseline and excluded it from every VM-516 commit.

## Tests Run

- JSON parse checks for changed Simic JSON files.
- Explicit claim-role count and evidence-scope checks.
- Discovery/support isolation checks.
- Null ID/hash, unresolved-pointer, and duplicate canonical-entry checks.
- Exact fixture/provenance chain comparison.
- Frozen-field and native-ID comparison.
- Stale public/recruiter-copy scan.
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=UG`
- `node research/validate-semantic-readiness.mjs --targets=UG`
- `node research/semantic-candidate-scope-tests.js`
- `node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=cbca9f596a090e924d532e7cb657c27c79ccb9de --identity=UG`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`

Known unrelated warning: `npm.cmd run test:source-generated` reports existing JESKAI/MARDU model-owned inhibitor warnings.

## Not Touched

- No independent review was performed.
- No approval or rejection decision was issued.
- Simic was not certified and not marked semantically_ready.
- Program base was not advanced.
- VM-517 was not started.
- Original main worktree and external Excel tracker were not modified.
- Table Talk handoff files were preserved and not committed.

## Risks / Uncertainties

- Independent review still needs to evaluate exact final candidate `cbca9f596a090e924d532e7cb657c27c79ccb9de`.
- The two superseded candidates remain in history and should not be reviewed or certified.

## Follow-Up

- Run an independent review window against exact candidate SHA `cbca9f596a090e924d532e7cb657c27c79ccb9de`.
- Do not certify until independent review explicitly approves that exact SHA.

Next suggested agent: independent reviewer.
