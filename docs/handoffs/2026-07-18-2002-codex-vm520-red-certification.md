# VM-520 Red Certification Handoff

Agent name: Codex

Task requested: Certify exact approved VM-520 Red replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`, create one governance-only certification commit, and set up VM-521 Green only after certification.

Files reviewed:
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-independent-review.md`
- `docs/incidents/recoveries/VM-520-red-replacement-independent-review.md`
- White, Blue, and Black certification precedents in `docs/handoffs/` and `docs/kanban/done/`

Files changed:
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-replacement-independent-review.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-520-red-semantic-recovery.md`
- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-18-2002-codex-vm520-red-certification.md`

What changed:
- Certified Red / R as `semantically_ready` from exact approved replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`.
- Preserved rejected candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` and rejection decision `REQUEST CHANGES`.
- Recorded actual replacement review SHA `20f18e0a0a02728f3474c9e8d2b32e36525cbfe9`.
- Recorded `PENDING_VM520_CERTIFICATION_COMMIT_SHA` as the self-referential certification placeholder.
- Advanced governance to 19 certified identities and Wave 3 monocolors 4 of 5 certified.
- Set up VM-521 Green as setup-only with drift preflight pending.

Why it changed:
- The VM-520 replacement independent review approved the exact Red replacement candidate and no later superseding decision exists.
- Certification reconciled reviewed truth, generated truth, governance state, candidate-scope exception handling, required `JESKAI`/`JUND`/`NAYA` coverage, and the exact approved SHA.

Decisions made:
- Certify only `6aefb2090ff20a361f7f3cd80515445036323158`.
- Treat exact candidate-scope exit 1 as passing only under `PASS - approved documented R display-source exception`, limited to `data/identity-layers.json#/expressions/R/preview_text` and `data/factions.json#/identity_layers/expressions/R/preview_text`.
- Do not begin Green drift preflight or inspect Green semantic data.
- Leave Table Talk baseline files dirty and unstaged.

Risks / uncertainties:
- The final certification commit SHA cannot appear inside its own committed governance, so tracked governance uses `PENDING_VM520_CERTIFICATION_COMMIT_SHA`.
- Known line-ending warnings remain on dirty governance or generated files during diff checks.
- Known unrelated `test:source-generated` JESKAI/MARDU model-owned inhibitor warnings remain unchanged.

Tests run:
- Governance and approved Red candidate JSON parse checks.
- Red reconciliation script for claims, source hierarchy, evidence scopes, provenance count 25, exact fixture chains, preview equality, frozen fields, and `JESKAI`/`JUND`/`NAYA` coverage.
- `node research/audit-semantic-readiness.mjs --targets=R`
- `node research/validate-semantic-readiness.mjs --targets=R`
- `node research/semantic-candidate-scope-tests.js`
- `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R`
- `npm.cmd run build:factions`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`

Not touched:
- No Red candidate implementation, raw, generated, fixture, provenance, recruiter, preview, source, validator, builder, schema, scoring, calibration, runtime, package, or asset file was edited for certification.
- No Green semantic data was inspected or changed.
- Original main, external Excel, push, PR, and merge were not touched.
- Existing Table Talk baseline remains uncommitted.

Follow-up recommendations:
- In a separate VM-521 task, run the mandatory Green drift preflight before any Gate 1+2 semantic inspection.
- Continue staging `docs/handoffs/HANDOFF_INDEX.md` by isolated hunk while the Table Talk baseline exists.

Next suggested agent: VM-521 Green drift-preflight control agent.

Related Kanban card, docs, or plans:
- `docs/kanban/done/VM-520-red-semantic-recovery.md`
- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
