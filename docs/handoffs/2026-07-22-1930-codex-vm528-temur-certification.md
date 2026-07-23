# VM-528 Temur Certification Handoff

## Agent Name

Codex

## Task Requested

Certify only exact approved VM-528 Temur semantic candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc` after independent review approval `APPROVE EXACT SHA 790fca923c504e32911e0be0eb44f7fdbcfb07dc`.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-1529-codex-vm528-temur-drift-preflight.md`
- `docs/handoffs/2026-07-22-1549-codex-vm528-temur-gate1-gate2.md`
- `docs/handoffs/2026-07-22-1758-codex-vm528-temur-candidate-workflow.md`
- `docs/handoffs/2026-07-22-1911-codex-vm528-temur-independent-review.md`
- VM-522, VM-523, VM-524, VM-525, VM-526, and VM-527 certification precedents
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-527-abzan-semantic-recovery.md`
- `docs/incidents/recoveries/VM-526-naya-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/kanban/backlog/VM-529-sultai-semantic-recovery.md`

## Files Changed

- `docs/handoffs/2026-07-22-1930-codex-vm528-temur-certification.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-528-temur-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-528-temur-semantic-recovery.md`
- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md` removed by move to done

## What Changed

Certified Temur as `semantically_ready` from exact approved candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc`, advanced CRIT-001 to 27 of 37 certified identities, advanced Wave 4 shards to 7 of 10 certified, moved the VM-528 card to Done, added the VM-528 recovery summary, updated the CRIT ledgers, and recorded standing drift controls for certification. Tracked governance uses `PENDING_VM528_CERTIFICATION_COMMIT_SHA` for the self-referential certification commit.

## Why It Changed

The independent review commit `fc872d47d43f4338611a68f5dcc8b8293904af26` directly descended from workflow commit `3e05170dde802a135182c80af641c72962ddcba8` and approved only exact candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc`. Certification was authorized to update governance state without altering source, generated, runtime, validator, fixture, provenance, package, lockfile, or CI files.

## Certification Authority

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-528 - Temur
- Canonical identity key: `TEMUR`
- Display color order: `GUR`
- Previous program base / VM-527 certification: `a1632337ebc91950b37d835ac404fba414f770c7`
- Drift preflight: `20c9413f39273bf76a11c4fdddb2163dd61c8037`
- Gate 1+2 governance: `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e`
- Exact certified semantic candidate: `790fca923c504e32911e0be0eb44f7fdbcfb07dc`
- Candidate workflow: `3e05170dde802a135182c80af641c72962ddcba8`
- Independent review: `fc872d47d43f4338611a68f5dcc8b8293904af26`
- Exact approval: `APPROVE EXACT SHA 790fca923c504e32911e0be0eb44f7fdbcfb07dc`
- Certification placeholder / new program base placeholder: `PENDING_VM528_CERTIFICATION_COMMIT_SHA`

## Object Separation And Scope

The direct chain was reverified as:

`a1632337ebc91950b37d835ac404fba414f770c7` -> `20c9413f39273bf76a11c4fdddb2163dd61c8037` -> `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e` -> `790fca923c504e32911e0be0eb44f7fdbcfb07dc` -> `3e05170dde802a135182c80af641c72962ddcba8` -> `fc872d47d43f4338611a68f5dcc8b8293904af26`.

Candidate source, profile, placement, generated data, fixtures, provenance, preview, validators, tests, schemas, package files, lockfiles, CI, parser, placement implementation, faction-context implementation, runtime identity logic, historical/debug/archive exclusions, and VM-529 remained outside certification scope. Certification is governance-only.

## Reviewed Truth

- Review matrix: PASS 47, FAIL 0, UNKNOWN 0, N/A 3.
- Approval-blocking findings: 0.
- Claims: 11 total; 10 substantive, 1 support, 0 discovery, 0 unclassified.
- Sources: 21 total; 9 claim-bearing, 8 shaping-only, 4 support-only.
- Evidence locators: every substantive claim has bounded evidence locations; evidence-location source IDs match claim source IDs.
- Provenance: 44 TEMUR rows, zero null canonical IDs, zero missing hashes, zero missing generated consumers.
- Fixtures: 24 cases at `research/fixtures/semantic-readiness/temur.semantic-fixtures.json`.
- Candidate scope: PASS for `TEMUR`; invalid aliases `GUR`, `URG`, and `RGU` rejected as unknown identities.
- Neighbor target `SULTAI` rejected the Temur candidate range as non-identity path/global generated changes and Sultai unclassified proof-chain contamination.
- Preview: no `data/identity-layers.json` candidate change; preview text unchanged and source/embedded preview equality preserved.
- Collision and placement: frozen weights, rankings, calibration, native IDs, lateral targets, golden paths, and scoring fields preserved.
- Inherited warning: the TEMUR model-owned inhibitor warning is exit-0, non-blocking, and not repaired by certification.

## Tests Run

- `node research\validate-semantic-candidate-scope.mjs --base=a1632337ebc91950b37d835ac404fba414f770c7 --target=790fca923c504e32911e0be0eb44f7fdbcfb07dc --identity=TEMUR` - PASS.
- Same exact range with `--identity=GUR` - expected failure: `Unknown identity GUR`.
- Same exact range with `--identity=URG` - expected failure: `Unknown identity URG`.
- Same exact range with `--identity=RGU` - expected failure: `Unknown identity RGU`.
- Same exact range with `--identity=NOT_A_REAL_IDENTITY` - expected failure: unknown identity.
- Same exact range with `--identity=SULTAI` - expected failure; Temur paths rejected as out of Sultai scope and Sultai unclassified proof-chain contamination reported.
- `node research\validate-semantic-readiness.mjs --targets=TEMUR` - PASS.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=TEMUR` - PASS.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:parser` - PASS; 226 parser cases.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `node research\validate-source-generated-guardrails.mjs --targets=TEMUR` - PASS with one inherited model-owned inhibitor warning.
- `node research\build-semantic-readiness-provenance.mjs --check` - initial Windows byte-strict stale result; after builder normalization and no-diff index refresh, PASS with 2029 semantic provenance entries and no content diff beyond line-ending warnings.
- `node research\semantic-candidate-scope-tests.js` - PASS.
- Fresh detached exact-candidate tree `C:\dev\mtgSiteWIP-crit001-vm528-temur-cert-exact-test`: `npm.cmd ci` - PASS from committed lockfile; 217 packages installed, 19 inherited audit vulnerabilities reported.
- Detached exact-candidate tree with ignored Scryfall corpus hardlink: `npm.cmd test` - PASS.
- Detached exact-candidate focused checks: `npm.cmd run test:semantic-readiness`, `npm.cmd run test:placement`, `npm.cmd run test:source-generated`, and exact candidate-scope for TEMUR - PASS after line-ending-only provenance refresh.
- Detached exact-candidate generator idempotence: `node research\build-faction-artifacts.mjs` completed; generated raw/text diffs were empty, with only line-ending warnings before no-diff index refresh.

## Exact-Tree Setup

- Exact-tree path: `C:\dev\mtgSiteWIP-crit001-vm528-temur-cert-exact-test`
- Creation method: `git worktree add --detach C:\dev\mtgSiteWIP-crit001-vm528-temur-cert-exact-test 790fca923c504e32911e0be0eb44f7fdbcfb07dc`
- Dependency command: `npm.cmd ci`
- Lockfile: committed `package-lock.json`
- xlsx declaration: `devDependencies.xlsx = ^0.18.5`
- xlsx lockfile authority: `node_modules/xlsx` version `0.18.5`, dev true, registry tarball and integrity from committed `package-lock.json`.
- npm config: `omit` blank, `optional` null, `include` blank.
- Scryfall corpus source: `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`, 206425820 bytes.
- Corpus target: `C:\dev\mtgSiteWIP-crit001-vm528-temur-cert-exact-test\data\scryfall\raw\oracle-cards.json`.
- Link method: NTFS hardlink via `New-Item -ItemType HardLink`.
- Ignored-input justification: `.gitignore` excludes `data/scryfall/raw/*.json` and `node_modules/`; neither input was staged or committed.

## Dependency Disposition

The candidate workflow initially stopped full-suite reporting at missing `xlsx` in that environment. Independent review and certification reproduced the accepted resolution through the committed package/lock authority: `xlsx` is a dev dependency in `package.json` and `package-lock.json`, present at the program base and candidate, and installed by `npm.cmd ci`. The candidate changed no dependency declaration, lockfile, package script, or dependency surface. Certification full-suite `npm.cmd test` passed in the fresh exact-candidate worktree.

## Drift Scorecard

| Control | Certification |
|---|---|
| Correct branch and program base | PASS |
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
| Superseded candidates recorded | N/A - no superseded VM-528 candidate exists |
| Review uses exact candidate SHA | PASS |
| Certification uses exact approved SHA | PASS |
| Governance-only workflow/review/certification commits | PASS |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel/external tracker explicitly untouched by Codex |

## Risks / Uncertainties

- Tracked governance cannot contain its own future commit SHA; actual certification SHA must be reported externally after commit creation.
- The external Excel tracker was explicitly left untouched.
- The inherited TEMUR inhibitor warning remains non-blocking because the established guardrail exits 0 and certification did not change the candidate.
- Windows line-ending behavior can mark generated/audit files modified after validation; those marks were disclosed in the disposable exact-candidate tree and not staged.
- `npm.cmd ci` reports 19 inherited audit vulnerabilities; the candidate changed no dependency authority and certification did not modify dependencies.

## Not Touched

No semantic remediation, replacement candidate, source, claim, evidence, provenance ownership, fixture, collision, preview, generated semantic, recruiter, runtime, validator, generator, schema, package, lockfile, CI, parser, placement implementation, faction-context implementation, original-main, protected-worktree, DRIFT-017 prototype, historical/debug/archive, VM-542/DRIFT-019 residual, Table Talk, VM-529, Excel, push, PR, merge, amend, rebase, cherry-pick, or branch-head review substitution occurred.

## Follow-Up Recommendations

Use the actual certification commit SHA from the final task output as the new external program base. Start VM-529 only in a separate explicit continuation from that certification SHA, with its own committed drift preflight before Gate 1+2.

## Next Suggested Agent

Kanban Steward or CRIT-001 Planning Architect for VM-529 drift-preflight setup only, after external tracker governance is reconciled.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-528-temur-semantic-recovery.md`
- `docs/incidents/recoveries/VM-528-temur-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-register.md`

CERTIFIED EXACT SHA 790fca923c504e32911e0be0eb44f7fdbcfb07dc
