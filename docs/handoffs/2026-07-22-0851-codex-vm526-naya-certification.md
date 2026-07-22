# VM-526 Naya Certification Handoff

## Agent Name

Codex

## Task Requested

Certify only exact approved VM-526 Naya semantic candidate `f3dda547eb91475cd3d00056463729d98a040e55` after independent review approval `APPROVE EXACT SHA f3dda547eb91475cd3d00056463729d98a040e55`.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md`
- `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- `docs/handoffs/2026-07-22-0007-codex-vm526-naya-candidate-workflow.md`
- `docs/handoffs/2026-07-22-0746-codex-vm526-naya-independent-review.md`
- VM-522, VM-523, VM-524, and VM-525 certification precedents
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-526-naya-semantic-recovery.md`
- `docs/kanban/backlog/VM-527-abzan-semantic-recovery.md`

## Files Changed

- `docs/handoffs/2026-07-22-0851-codex-vm526-naya-certification.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-526-naya-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-526-naya-semantic-recovery.md`
- `docs/kanban/ready/VM-526-naya-semantic-recovery.md` removed by move to done

## What Changed

Certified Naya as `semantically_ready` from exact approved candidate `f3dda547eb91475cd3d00056463729d98a040e55`, advanced CRIT-001 to 25 of 37 certified identities, advanced Wave 4 shards to 5 of 10 certified, moved the VM-526 card to Done, added the VM-526 recovery summary, updated the CRIT ledgers, and recorded standing drift controls for the certification. Tracked governance uses `PENDING_VM526_CERTIFICATION_COMMIT_SHA` for the self-referential certification commit.

## Why It Changed

The independent review commit `8afaa199d774d56845a305c4f879d275ada94a47` directly descended from workflow commit `cdcd1b408a64dacb63e75865c519ca317ce0e08a` and approved only exact candidate `f3dda547eb91475cd3d00056463729d98a040e55`. Certification was authorized to update governance state without altering source, generated, runtime, validator, fixture, provenance, package, or CI files.

## Decisions Made

- Certified only exact approved candidate SHA `f3dda547eb91475cd3d00056463729d98a040e55`, not the Gate 1+2 governance commit, superseded candidate, workflow commit, review commit, branch head label, or latest changes.
- Kept superseded candidate `57ce7161c1ff8736a8b91a6564fa97129fe38383` preserved, unapproved, and uncertified.
- Kept candidate workflow `cdcd1b408a64dacb63e75865c519ca317ce0e08a`, approval review `8afaa199d774d56845a305c4f879d275ada94a47`, and certification commit placeholder distinct.
- Set next identity to VM-527 / Abzan as `not_started`; no Abzan drift preflight, branch/worktree, or semantic work was started.
- Treated byte-strict provenance stale reports in Windows checkouts as line-ending-only after builder normalization produced no content diff and `--check` passed.

## Risks / Uncertainties

- Tracked governance cannot contain its own future commit SHA; actual certification SHA must be reported externally after commit creation.
- The external Excel tracker was explicitly left untouched.
- The inherited NAYA inhibitor warning remains NAYA-owned and non-blocking because the established guardrail exits 0 and the candidate did not introduce it.
- Windows line-ending behavior can mark generated/audit files modified after validation; those marks were disclosed and not staged.

## Tests Run

- `node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=NAYA` - PASS.
- `node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=WRG` - expected failure: `Unknown identity WRG`.
- `node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=RGW` - expected failure: `Unknown identity RGW`.
- `node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=GRW` - expected failure: `Unknown identity GRW`.
- `node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=NOT_A_REAL_IDENTITY` - expected failure: unknown identity.
- `node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=JUND` - expected failure; Naya paths rejected as out of Jund scope.
- `node research\validate-semantic-readiness.mjs --targets=NAYA` - PASS.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=NAYA` - PASS.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:parser` - PASS; 226 parser cases.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `node research\validate-source-generated-guardrails.mjs --targets=NAYA` - PASS with one inherited model-owned inhibitor warning.
- `node research\build-semantic-readiness-provenance.mjs --check` - initial Windows byte-strict stale result; after builder normalization, PASS with 2001 semantic provenance entries and no content diff beyond line-ending warnings.
- `node research\semantic-candidate-scope-tests.js` - PASS.
- Detached exact-candidate tree `C:\Users\obake\AppData\Local\Temp\naya-cert-f3dda-20260722084801`: `npm.cmd ci` - PASS.
- Detached exact-candidate tree with ignored Scryfall corpus hardlink: `npm.cmd test` - PASS.
- Detached exact-candidate focused checks: exact candidate-scope PASS, NAYA readiness PASS, fixtures PASS, faction-context isolation PASS, source/generated guardrails PASS with inherited warning, candidate-scope regression PASS, provenance `--check` PASS after line-ending-only normalization.

## Inherited Warning

Warning text:

`inhibitor_traps[model_owned]: One inhibitor trap is backed by the builder's model-owned biological prior rather than raw placement text. {"model_owned_entry":"Mistakes control, extraction, or isolated scale for belonging when the living whole asks for protective instinct and care."}`

Disposition: NAYA-owned, inherited from the prior program base in generated placement/recruiter surfaces, emitted by the established source/generated guardrail, exit 0, non-blocking, not repaired or removed by certification.

## Not Touched

No semantic remediation, replacement candidate, source, claim, evidence, provenance ownership, fixture, collision, preview, generated semantic, recruiter, runtime, validator, generator, schema, package, lockfile, CI, original-main, protected-worktree, DRIFT-017 prototype, historical/debug/archive, VM-542/DRIFT-019 residual, Table Talk, VM-527, Excel, push, PR, merge, amend, rebase, cherry-pick, or branch-head review substitution occurred.

## Follow-Up Recommendations

Use the actual certification commit SHA from the final task output as the new external program base. Start VM-527 only in a separate explicit continuation from that certification SHA, with its own committed drift preflight before Gate 1+2.

## Next Suggested Agent

Kanban Steward or CRIT-001 Planning Architect for VM-527 drift-preflight setup only, after external tracker governance is reconciled.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-526-naya-semantic-recovery.md`
- `docs/incidents/recoveries/VM-526-naya-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-register.md`

CERTIFIED EXACT SHA f3dda547eb91475cd3d00056463729d98a040e55
