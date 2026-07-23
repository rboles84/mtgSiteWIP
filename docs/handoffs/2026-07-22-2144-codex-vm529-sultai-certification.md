# VM-529 Sultai Certification Handoff

## Agent Name

Codex

## Task Requested

Certify only exact approved VM-529 Sultai semantic candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6` after independent exact-SHA review approval `APPROVE EXACT SHA a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/workflow.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- `docs/handoffs/2026-07-22-2039-codex-vm529-sultai-gate1-gate2.md`
- `docs/handoffs/2026-07-22-2054-codex-vm529-sultai-candidate-workflow.md`
- `docs/handoffs/2026-07-22-2123-codex-vm529-sultai-independent-review.md`
- VM-527, VM-528, and DRIFT-020 certification precedents
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`

## Files Changed

- `docs/handoffs/2026-07-22-2144-codex-vm529-sultai-certification.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-529-sultai-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-529-sultai-semantic-recovery.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md` removed by move to done

## What Changed

Certified Sultai as `semantically_ready` from exact approved candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`, advanced CRIT-001 to 28 of 37 certified identities, advanced Wave 4 shards to 8 of 10 certified, moved the VM-529 card to Done, added the VM-529 recovery summary, updated the CRIT ledgers, and recorded certification drift controls. Tracked governance uses `PENDING_VM529_CERTIFICATION_COMMIT_SHA` for the self-referential certification commit.

## Why It Changed

The independent review commit `2b469a61656bd2151f4c7e560421afc7c452887b` directly descended from workflow commit `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc` and approved only exact candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`. Certification was authorized to update governance state without altering source, generated, runtime, validator, fixture, provenance, package, lockfile, CI, profile, placement, preview, or recruiter files.

## Certification Authority

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-529 - Sultai
- Canonical identity key: `SULTAI`
- Display color order: `BGU`
- Previous program base / VM-528 certification: `8e23ef467ec7f60daec746c14493173f96d9261c`
- Drift preflight: `74b8153c124eb03d95a28ae2aac126c29f3c5db4`
- Gate 1+2 governance: `5c4e73360d99ed1cf5f3bae5bd9302773ae9e14e`
- Exact certified semantic candidate: `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`
- Candidate workflow: `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc`
- Independent review: `2b469a61656bd2151f4c7e560421afc7c452887b`
- Exact approval: `APPROVE EXACT SHA a92fb3f8a0ec4235d5148b20c4040bd717332ad6`
- Certification placeholder / new program base placeholder: `PENDING_VM529_CERTIFICATION_COMMIT_SHA`

## Object Separation And Scope

The direct chain was reverified as:

`8e23ef467ec7f60daec746c14493173f96d9261c` -> `74b8153c124eb03d95a28ae2aac126c29f3c5db4` -> `5c4e73360d99ed1cf5f3bae5bd9302773ae9e14e` -> `a92fb3f8a0ec4235d5148b20c4040bd717332ad6` -> `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc` -> `2b469a61656bd2151f4c7e560421afc7c452887b`.

Candidate source, profile, placement, generated data, fixtures, provenance, preview, validators, tests, schemas, package files, lockfiles, CI, parser, placement implementation, faction-context implementation, runtime identity logic, historical/debug/archive exclusions, VM-530, Excel, original main, DRIFT-017 prototype, and Table Talk remained outside certification scope. Certification is governance-only.

## Reviewed Truth

- Review matrix: approval-blocking findings 0.
- Claims: 11 total; 10 substantive, 1 support, 0 discovery, 0 unclassified.
- Sources: 18 total; 7 claim-bearing, 7 shaping-only, 4 support-only.
- Evidence locators: every substantive claim has bounded evidence locations; evidence-location source IDs match claim source IDs.
- Provenance: 44 SULTAI rows, zero null canonical IDs, zero missing hashes, zero missing generated consumers.
- Fixtures: 28 cases at `research/fixtures/semantic-readiness/sultai.semantic-fixtures.json`.
- Candidate scope: PASS for `SULTAI`; invalid aliases `BGU`, `GUB`, and `UBG` rejected as unknown identities.
- Neighbor target `TEMUR` rejected the Sultai candidate range as non-identity path and global generated changes.
- Preview: no `data/identity-layers.json` candidate change; preview text unchanged after approval.
- Collision and placement: frozen weights, rankings, calibration, native IDs, lateral targets, golden paths, and scoring fields preserved.
- Inherited warning: the SULTAI model-owned inhibitor warning is exit-0, non-blocking, and not repaired by certification.

## Tests Run

- `node research\validate-semantic-candidate-scope.mjs --base=8e23ef467ec7f60daec746c14493173f96d9261c --target=a92fb3f8a0ec4235d5148b20c4040bd717332ad6 --identity=SULTAI` - PASS.
- Same exact range with `--identity=BGU` - expected failure: `Unknown identity BGU`.
- Same exact range with `--identity=GUB` - expected failure: `Unknown identity GUB`.
- Same exact range with `--identity=UBG` - expected failure: `Unknown identity UBG`.
- Same exact range with `--identity=NOT_A_REAL_IDENTITY` - expected failure: unknown identity.
- Same exact range with `--identity=TEMUR` - expected failure; Sultai paths rejected as out of Temur scope and global generated changes reported.
- `node research\validate-semantic-readiness.mjs --targets=SULTAI` - PASS.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=SULTAI` - PASS.
- `node research\semantic-candidate-scope-tests.js` - PASS.
- `node research\audit-semantic-readiness.mjs --targets=SULTAI` - PASS; 11 claims, 10 substantive claims, 1 support record, 18 sources, 44 reference sites.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:parser` - PASS; 226 parser cases.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `node research\validate-source-generated-guardrails.mjs --targets=SULTAI` - PASS with one inherited model-owned inhibitor warning.
- `npm.cmd run test:semantic-readiness` in the certification governance tree - contract tests, candidate-scope regression, and fixture validation passed; byte-strict provenance check reported stale because post-candidate governance ledger commits are newer than generated provenance. No tracked files changed.
- Fresh detached exact-candidate tree `C:\dev\mtgSiteWIP-crit001-vm529-sultai-cert-exact-test`: `npm.cmd ci` - PASS from committed lockfile; 217 packages installed, 19 inherited audit vulnerabilities reported.
- Detached exact-candidate tree with ignored Scryfall corpus hardlink: `npm.cmd test` - PASS.
- Detached exact-candidate focused checks: exact SULTAI candidate-scope, `npm.cmd run test:placement`, `npm.cmd run test:faction-context-isolation`, SULTAI source/generated guardrails, and `npm.cmd run test:semantic-readiness` - PASS after disposable provenance byte normalization.
- Detached exact-candidate provenance reconciliation: `node research\build-semantic-readiness-provenance.mjs` wrote 2043 entries; `git diff --ignore-cr-at-eol -- data\semantic-readiness-provenance.json` showed no content delta beyond Windows line-ending warnings, then `npm.cmd run test:semantic-readiness` verified 2043 entries.

## Exact-Tree Setup

- Exact-tree path: `C:\dev\mtgSiteWIP-crit001-vm529-sultai-cert-exact-test`
- Creation method: `git worktree add --detach C:\dev\mtgSiteWIP-crit001-vm529-sultai-cert-exact-test a92fb3f8a0ec4235d5148b20c4040bd717332ad6`
- Exported SHA: `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`
- Dependency command: `npm.cmd ci`
- Lockfile: committed `package-lock.json`
- xlsx declaration: `devDependencies.xlsx = ^0.18.5`
- Scryfall corpus source: `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`, 206425820 bytes
- Corpus target: `C:\dev\mtgSiteWIP-crit001-vm529-sultai-cert-exact-test\data\scryfall\raw\oracle-cards.json`
- Link method: NTFS hardlink via `New-Item -ItemType HardLink`
- Ignored-input justification: `.gitignore` excludes `data/scryfall/raw/*.json` and `node_modules/`; neither input was staged or committed.

## Warning And Environment Disposition

Command: `node research\validate-source-generated-guardrails.mjs --targets=SULTAI`.

Exact warning text: `inhibitor_traps[model_owned]: One inhibitor trap is backed by the builder's model-owned biological prior rather than raw placement text.` Entry: `Refuses to use available bodies, secrets, costs, or openings when survival asks for calculated conversion before the advantage is wasted.`

The warning predates certification and was recorded during VM-529 Gate 1+2, candidate workflow, and independent review. Governing authority treats it as non-blocking because the validator exits zero and the approved candidate was not repaired or replaced during certification. No validation was skipped because of it.

Windows line-ending behavior marked disposable exact-tree generated/audit files after full testing and byte normalization. Those marks were disclosed and not staged. The certification worktree remained free of tracked semantic/generated changes before governance edits.

## Drift Scorecard

| Control | Certification |
|---|---|
| Correct branch and starting review commit | PASS |
| One identity active | PASS |
| Source hierarchy explicit | PASS |
| Generic color-pair overfit checked | PASS |
| Required neighbors checked | PASS |
| Claim roles complete | PASS |
| Evidence scopes complete | PASS |
| Discovery/support isolated | PASS |
| Canonical IDs/hashes valid | PASS |
| Exact fixture/provenance parity | PASS |
| Frozen confidence/calibration intact | PASS |
| Native IDs intact | PASS |
| Lateral/collision targets intact | PASS |
| Public/recruiter copy aligned | PASS |
| No unrelated identity drift | PASS |
| Deterministic generation | PASS |
| Candidate scope passes exact SHA | PASS |
| Superseded candidates recorded | N/A - no superseded VM-529 candidate exists |
| Review uses exact candidate SHA | PASS |
| Certification uses exact approved SHA | PASS |
| Governance-only workflow/review/certification commits | PASS |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel/external tracker explicitly untouched by Codex |

## Risks / Uncertainties

- Tracked governance cannot contain its own future commit SHA; actual certification SHA must be reported externally after commit creation.
- The external Excel tracker was explicitly left untouched.
- The inherited SULTAI inhibitor warning remains non-blocking because the established guardrail exits 0 and certification did not change the candidate.
- The post-review governance tree can make byte-strict semantic provenance `--check` stale because the builder includes the governance ledger; exact-candidate generated truth reconciled after disposable byte normalization with no CRLF-insensitive content delta.
- Windows line-ending behavior can mark generated/audit files modified after validation; those marks were disclosed in the disposable exact-candidate tree and not staged.
- `npm.cmd ci` reports 19 inherited audit vulnerabilities; the candidate changed no dependency authority and certification did not modify dependencies.

## Not Touched

No semantic remediation, replacement candidate, source, claim, evidence, provenance ownership, fixture, collision, preview, generated semantic, recruiter, runtime, validator, generator, schema, package, lockfile, CI, parser, placement implementation, faction-context implementation, original-main, protected-worktree, DRIFT-017 prototype, historical/debug/archive, VM-530, Excel, push, PR, merge, amend, rebase, cherry-pick, or branch-head review substitution occurred.

## Follow-Up Recommendations

Use the actual certification commit SHA from the final task output as the new external program base. Start VM-530 only in a separate explicit continuation from that certification SHA, with its own committed drift preflight before Gate 1+2.

## Next Suggested Agent

Kanban Steward or CRIT-001 Planning Architect for VM-530 drift-preflight setup only, after external tracker governance is reconciled.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-529-sultai-semantic-recovery.md`
- `docs/incidents/recoveries/VM-529-sultai-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-register.md`

CERTIFIED EXACT SHA a92fb3f8a0ec4235d5148b20c4040bd717332ad6
