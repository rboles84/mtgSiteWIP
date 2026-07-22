# VM-527 Abzan Certification Handoff

## Agent Name

Codex

## Task Requested

Certify only exact approved VM-527 Abzan semantic candidate `11c099b8beb9f23e23660787f00b97e89914d50b` after independent review approval `APPROVE EXACT SHA 11c099b8beb9f23e23660787f00b97e89914d50b`.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`
- `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- `docs/handoffs/2026-07-22-1110-codex-vm527-abzan-gate3-gate4.md`
- `docs/handoffs/2026-07-22-1125-codex-vm527-abzan-candidate-workflow.md`
- `docs/handoffs/2026-07-22-1242-codex-vm527-abzan-independent-review.md`
- VM-522, VM-523, VM-524, VM-525, and VM-526 certification precedents
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-526-naya-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/backlog/VM-528-temur-semantic-recovery.md`

## Files Changed

- `docs/handoffs/2026-07-22-1433-codex-vm527-abzan-certification.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md` removed by move to done

## What Changed

Certified Abzan as `semantically_ready` from exact approved candidate `11c099b8beb9f23e23660787f00b97e89914d50b`, advanced CRIT-001 to 26 of 37 certified identities, advanced Wave 4 shards to 6 of 10 certified, moved the VM-527 card to Done, added the VM-527 recovery summary, updated the CRIT ledgers, and recorded standing drift controls for certification. Tracked governance uses `PENDING_VM527_CERTIFICATION_COMMIT_SHA` for the self-referential certification commit.

## Why It Changed

The independent review commit `70193840cf8ef55d98ef63552bcf0cf56d736d07` directly descended from workflow commit `71bf962c653a7b03b48bb05fca8661cdc3af2daa` and approved only exact candidate `11c099b8beb9f23e23660787f00b97e89914d50b`. Certification was authorized to update governance state without altering source, generated, runtime, validator, fixture, provenance, package, or CI files.

## Decisions Made

- Certified only exact approved candidate SHA `11c099b8beb9f23e23660787f00b97e89914d50b`, not the Gate 1+2 governance commit, Gate 3+4 workflow, Gate 5 workflow, review commit, branch head label, compacted-note typo, or latest changes.
- Preserved the compacted-note candidate-SHA typo only as a corrected external-note error, not as an alternate, rejected, superseded, reviewed, or certified Git candidate object.
- Kept candidate workflow `71bf962c653a7b03b48bb05fca8661cdc3af2daa`, approval review `70193840cf8ef55d98ef63552bcf0cf56d736d07`, and certification commit placeholder distinct.
- Set next identity to VM-528 / Temur as backlog and not started; no Temur branch, worktree, drift preflight, semantic audit, remediation, candidate, review, or certification work was started.
- Treated byte-strict provenance stale reports in Windows checkouts as line-ending-only after direct builder-to-candidate blob parity passed.

## Certification Authority

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-527 - Abzan
- Canonical identity key: `ABZAN`
- Display color order: `WBG`
- Previous program base / VM-526 certification: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`
- Gate 1+2 parent: `6375947ef15ff934b75a3199cde47fe0c1703470`
- Gate 1+2 governance: `ce550014275d48960b74c47e9ba97169cfbd4fd0`
- Exact certified semantic candidate: `11c099b8beb9f23e23660787f00b97e89914d50b`
- Gate 3+4 workflow: `a0e37d20edf43412d8e17d02104479a6fc0938c4`
- Gate 5 workflow: `71bf962c653a7b03b48bb05fca8661cdc3af2daa`
- Independent review: `70193840cf8ef55d98ef63552bcf0cf56d736d07`
- Exact approval: `APPROVE EXACT SHA 11c099b8beb9f23e23660787f00b97e89914d50b`
- Certification placeholder / new program base placeholder: `PENDING_VM527_CERTIFICATION_COMMIT_SHA`

## Object Separation And Scope

The direct chain was reverified as:

`80b34dcda7db51d08f77f862f4eafb5cf3cabeaa` -> `6375947ef15ff934b75a3199cde47fe0c1703470` -> `ce550014275d48960b74c47e9ba97169cfbd4fd0` -> `11c099b8beb9f23e23660787f00b97e89914d50b` -> `a0e37d20edf43412d8e17d02104479a6fc0938c4` -> `71bf962c653a7b03b48bb05fca8661cdc3af2daa` -> `70193840cf8ef55d98ef63552bcf0cf56d736d07`.

Candidate source, profile, placement, generated data, fixtures, provenance, preview, validators, tests, schemas, package files, lockfiles, CI, parser, placement implementation, faction-context implementation, runtime identity logic, historical/debug/archive exclusions, and VM-528 remained outside certification scope. Certification is governance-only.

## Reviewed Truth

- Review matrix: PASS 20, FAIL 0, UNKNOWN 0, N/A 0.
- Approval-blocking findings: 0.
- Claims: 11 total; 10 substantive, 1 support, 0 discovery, 0 unclassified.
- Sources: 20 total; 9 claim-bearing, 6 shaping-only, 5 support-only.
- Evidence locators: 20 source records with bounded locations; support-only Commander product record isolated as auxiliary support.
- Provenance: 43 ABZAN rows, 0 null canonical IDs, 0 missing required hashes, 2 auxiliary support rows.
- Fixtures: 17 cases at `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json`.
- Candidate scope: PASS for `ABZAN`; invalid aliases `WBG`, `BGW`, and `GWB` rejected as unknown identities.
- Neighbor target `NAYA` rejected the Abzan candidate range as non-identity path/global generated changes.
- Preview: no `data/identity-layers.json` candidate change; preview text unchanged.
- Collision and placement: frozen weights, rankings, calibration, native IDs, lateral targets, golden paths, and scoring fields preserved.
- Inherited warning: the ABZAN model-owned inhibitor warning is exit-0, non-blocking, and not repaired by certification.

## Tests Run

- `git worktree list --porcelain` - PASS, no certification branch/path collision before setup.
- `git branch --all --list '*vm-527*' '*abzan*' '*certification*'` - PASS, no VM-527 certification branch collision.
- `git show --no-patch --format='%H %P %s'` for the approved chain - PASS, direct parents match.
- `git diff --name-status 11c099b8beb9f23e23660787f00b97e89914d50b..70193840cf8ef55d98ef63552bcf0cf56d736d07` - PASS, governance-only.
- `git diff --name-only 11c099b8beb9f23e23660787f00b97e89914d50b..70193840cf8ef55d98ef63552bcf0cf56d736d07 -- data/raw-factions/abzan data/factions.json data/semantic-readiness-provenance.json research/fixtures/semantic-readiness/abzan.semantic-fixtures.json assets/js` - PASS, no output.
- `node research\validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=11c099b8beb9f23e23660787f00b97e89914d50b --identity=ABZAN` - PASS.
- Same exact range with `--identity=WBG` - expected failure: `Unknown identity WBG`, exit 1.
- Same exact range with `--identity=BGW` - expected failure: `Unknown identity BGW`, exit 1.
- Same exact range with `--identity=GWB` - expected failure: `Unknown identity GWB`, exit 1.
- Same exact range with `--identity=UNKNOWN_ABZAN_CERT` - expected failure: unknown identity, exit 1.
- Same exact range with `--identity=NAYA` - expected failure; Abzan paths rejected as out of Naya scope, exit 1.
- `node research\semantic-candidate-scope-tests.js` - PASS.
- `node research\validate-semantic-readiness.mjs --targets=ABZAN` - PASS.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=ABZAN` - PASS.
- `node research\semantic-readiness-tests.js` - PASS.
- `node research\scryfall-parser-tests.js` - PASS, 226 parser cases.
- `node research\faction-context-isolation-tests.js` - PASS.
- `node research\validate-source-generated-guardrails.mjs --targets=ABZAN` - PASS with one inherited model-owned inhibitor warning.
- `node research\build-semantic-readiness-provenance.mjs --check` - expected Windows byte-strict stale result.
- Direct builder-to-candidate blob comparison - PASS with 2015 entries.
- Detached exact-candidate tree `C:\Users\obake\AppData\Local\Temp\a527c`: `npm.cmd ci` - PASS from committed `package-lock.json`; 217 packages installed, 19 inherited audit vulnerabilities reported.
- Detached exact-candidate tree with ignored Scryfall corpus hardlink: `npm.cmd test` - PASS.
- Detached exact-candidate focused checks: exact candidate-scope PASS, ABZAN readiness PASS, fixtures PASS, source/generated guardrails PASS with inherited warning, provenance blob parity PASS with 2015 entries.
- Detached exact-candidate `npm.cmd run build:factions` - PASS; generated no textual diff, only CRLF-sensitive working-tree marks plus test-generated live-gate audit files in the detached temp tree.

## Corpus And Exact-Tree Setup

- Exact-tree path: `C:\Users\obake\AppData\Local\Temp\a527c`
- Creation method: `git -c core.longpaths=true worktree add --detach C:\Users\obake\AppData\Local\Temp\a527c 11c099b8beb9f23e23660787f00b97e89914d50b`
- Dependency command: `npm.cmd ci`
- Lockfile: committed `package-lock.json`
- Scryfall corpus source: `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`
- Corpus target: `C:\Users\obake\AppData\Local\Temp\a527c\data\scryfall\raw\oracle-cards.json`
- Link method: NTFS hardlink via `New-Item -ItemType HardLink`
- Ignored-input justification: `.gitignore` excludes `data/scryfall/raw/*.json`; repository test architecture and prior CRIT handoffs document the local-only Scryfall corpus as an ignored test input.

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
| Superseded candidates recorded | N/A - no superseded VM-527 candidate exists |
| Review uses exact candidate SHA | PASS |
| Certification uses exact approved SHA | PASS |
| Governance-only workflow/review/certification commits | PASS |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel/external tracker explicitly untouched by Codex |

## Risks / Uncertainties

- Tracked governance cannot contain its own future commit SHA; actual certification SHA must be reported externally after commit creation.
- The external Excel tracker was explicitly left untouched.
- The inherited ABZAN inhibitor warning remains non-blocking because the established guardrail exits 0 and certification did not change the candidate.
- Windows line-ending behavior can mark generated/audit files modified after validation; those marks were disclosed in the detached exact-candidate tree and not staged.

## Not Touched

No semantic remediation, replacement candidate, source, claim, evidence, provenance ownership, fixture, collision, preview, generated semantic, recruiter, runtime, validator, generator, schema, package, lockfile, CI, original-main, protected-worktree, DRIFT-017 prototype, historical/debug/archive, VM-542/DRIFT-019 residual, Table Talk, VM-528, Excel, push, PR, merge, amend, rebase, or cherry-pick occurred.

## Follow-Up Recommendations

Use the actual certification commit SHA from the final task output as the new external program base. Start VM-528 only in a separate explicit continuation from that certification SHA, with its own committed drift preflight before Gate 1+2.

## Next Suggested Agent

Kanban Steward or CRIT-001 Planning Architect for VM-528 drift-preflight setup only, after external tracker governance is reconciled.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-527-abzan-semantic-recovery.md`
- `docs/incidents/recoveries/VM-527-abzan-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-register.md`

CERTIFIED EXACT SHA 11c099b8beb9f23e23660787f00b97e89914d50b
