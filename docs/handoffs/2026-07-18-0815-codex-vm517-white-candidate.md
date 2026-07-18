# VM-517 White Candidate Handoff

Agent name: Codex

Task requested: Run VM-517 White / W from Gate 1+2 through Gate 5 candidate creation under CRIT-001 Drift Control, then stop with White awaiting independent review.

Files reviewed:

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/recoveries/VM-517-white-drift-preflight.md`
- `docs/incidents/recoveries/VM-517-white-drift-preflight-rerun.md`
- `docs/incidents/recoveries/VM-517-white-semantic-recovery.md`
- `docs/kanban/backlog/VM-517-white-semantic-recovery.md`
- White raw packet, generated consumers, provenance, recruiter context, and semantic fixture locations.

Files changed:

- `data/raw-factions/white/white.claims.json`
- `data/raw-factions/white/white.profile.json`
- `data/raw-factions/white/white.placement.json`
- `data/raw-factions/white/white.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/white.semantic-fixtures.json`
- `docs/incidents/recoveries/VM-517-white-semantic-recovery.md`
- `docs/kanban/backlog/VM-517-white-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-18-0815-codex-vm517-white-candidate.md`
- `docs/handoffs/HANDOFF_INDEX.md` will receive only the VM-517 row in the workflow-record commit.

What changed:

- Gate 1+2 completed at `307b93d56b4314405011f21f7d7616ac4b7ed16f` and authorized remediation.
- Gate 3+4 assigned White roles to all 8 claims: 6 `substantive_claim`, 0 `discovery_record`, 2 `support_record`, 0 `unclassified`.
- Added bounded evidence locations and Contract v1.1 `evidence_scope` to all substantive White claims.
- Isolated `white_claim_0001` and `white_claim_0008` from authoritative profile, placement, public, recruiter, fixture, semantic-readiness, and provenance proof chains.
- Rebuilt generated consumers and provenance with `npm.cmd run build:factions`.
- Created `research/fixtures/semantic-readiness/white.semantic-fixtures.json`.
- Preserved frozen placement fields, object-with-`pairs` collision guidance, lateral targets, absent generic collision target, and preview equality.
- Superseded first candidate `8d6014950e5ca45ef85a90855cf283d80fd18e0d` because exact candidate-scope validation rejected added `placement_summary` calibrated fields.
- Created final candidate `89535e5f73598a5b518e31e11598b05087274a95`, which passes exact candidate-scope validation.

Why it changed:

Gate 1+2 found White was not Contract v1.1-ready: no explicit semantic roles, missing bounded evidence locations and scopes, support rows in proof chains, null W provenance canonical IDs, missing fixtures, and missing evidence mapping for placement chatbot mismatch guidance.

Decisions made:

- `white_claim_0002` through `white_claim_0007` are substantive.
- `white_claim_0001` and `white_claim_0008` are support records only.
- Commander Compass support is retained as auxiliary metadata with `evidence_use: auxiliary_support`.
- Generic White overfit and all required neighbors are covered in fixtures without adding a frozen `GENERIC_W_OVERFIT` generated collision target.
- Final candidate SHA is `89535e5f73598a5b518e31e11598b05087274a95`.

Risks / uncertainties:

- The first candidate is intentionally preserved as superseded; reviewers should review only final candidate `89535e5f73598a5b518e31e11598b05087274a95`.
- `npm.cmd run test:source-generated` still reports known unrelated JESKAI/MARDU model-owned inhibitor warnings.
- Git status/diff commands warn that the user-level Git ignore file under `C:\Users\obake` is inaccessible; repository status itself was usable.

Tests run:

- JSON parse checks for changed White JSON and fixture files.
- Manual drift controls for roles, evidence scopes, support isolation, null ID/hash scan, unresolved pointers, duplicate canonical locators, fixture/provenance exact parity, frozen fields, and W stale-copy scan.
- `npm.cmd run build:factions` twice before candidate and again before replacement.
- `node research/audit-semantic-readiness.mjs --targets=W`
- `node research/validate-semantic-readiness.mjs --targets=W`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `node research/validate-semantic-candidate-scope.mjs --base=307b93d56b4314405011f21f7d7616ac4b7ed16f --target=8d6014950e5ca45ef85a90855cf283d80fd18e0d --identity=W` failed as expected for superseded candidate.
- `node research/validate-semantic-candidate-scope.mjs --base=307b93d56b4314405011f21f7d7616ac4b7ed16f --target=89535e5f73598a5b518e31e11598b05087274a95 --identity=W` passed.
- `git diff --check`

Not touched:

- No independent review performed.
- No approval or rejection decision issued.
- White not certified and not marked semantically_ready.
- Program base not advanced.
- VM-518 not started.
- Original main worktree `C:\dev\mtgSiteWIP` not modified.
- External Excel tracker not modified.
- Table Talk handoff baseline preserved and excluded.

Follow-up recommendations:

- Run an independent review of exact candidate SHA `89535e5f73598a5b518e31e11598b05087274a95`.
- Reviewers should ignore superseded candidate `8d6014950e5ca45ef85a90855cf283d80fd18e0d` except as recorded drift history.

Next suggested agent: Independent CRIT-001 reviewer for VM-517 White exact candidate.

Related Kanban card, docs, or plans:

- `docs/kanban/backlog/VM-517-white-semantic-recovery.md`
- `docs/incidents/recoveries/VM-517-white-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
