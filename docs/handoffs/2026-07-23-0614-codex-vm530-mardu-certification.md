# VM-530 Mardu Certification Handoff

## Agent Name

Codex

## Task Requested

Certify only exact approved VM-530 Mardu semantic candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a` after independent exact-SHA review approval `APPROVE EXACT SHA 96df085ff38d03da1e37de80b1e11705b1dfa47a`.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- `docs/handoffs/2026-07-22-2213-codex-vm530-mardu-gate1-gate2.md`
- `docs/handoffs/2026-07-22-2235-codex-vm530-mardu-candidate-workflow.md`
- `docs/handoffs/2026-07-22-2258-codex-vm530-mardu-independent-review.md`
- VM-527, VM-528, and VM-529 certification precedents
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/backlog/VM-531-jeskai-semantic-recovery.md`

## Files Changed

- `docs/handoffs/2026-07-23-0614-codex-vm530-mardu-certification.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md` removed by move to done

## What Changed

Certified Mardu as `semantically_ready` from exact approved candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a`, advanced CRIT-001 to 29 of 37 certified identities, advanced Wave 4 shards to 9 of 10 certified, moved the VM-530 card to Done, added the VM-530 recovery summary, updated the CRIT ledgers, and recorded certification drift controls. Tracked governance uses `PENDING_VM530_CERTIFICATION_COMMIT_SHA` for the self-referential certification commit.

## Why It Changed

The independent review commit `f3b360ec0d9df569f585299480db1f34ba72a01b` directly descended from workflow commit `ab961e384ef72bd4c56dae07f60863016511adb0` and approved only exact candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a`. Certification was authorized to update governance state without altering source, generated, runtime, validator, fixture, provenance, package, lockfile, CI, profile, placement, preview, or recruiter files.

## Certification Authority

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-530 - Mardu
- Canonical identity key: `MARDU`
- Display color order: `RWB`
- Previous program base / VM-529 certification: `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`
- Drift preflight: `eb0b71846d1315ef9571cd3a99ec8b7a7279573e`
- Gate 1+2 governance: `43a9e1aafaea445c39b6d8402101e86b05e0edef`
- Exact certified semantic candidate: `96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Candidate workflow: `ab961e384ef72bd4c56dae07f60863016511adb0`
- Independent review: `f3b360ec0d9df569f585299480db1f34ba72a01b`
- Exact approval: `APPROVE EXACT SHA 96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Certification placeholder / new program base placeholder: `PENDING_VM530_CERTIFICATION_COMMIT_SHA`

## Object Separation And Scope

The direct chain was reverified as:

`7970c14822ce006c0d88f95cc6ed01bb3c79b81f` -> `eb0b71846d1315ef9571cd3a99ec8b7a7279573e` -> `43a9e1aafaea445c39b6d8402101e86b05e0edef` -> `96df085ff38d03da1e37de80b1e11705b1dfa47a` -> `ab961e384ef72bd4c56dae07f60863016511adb0` -> `f3b360ec0d9df569f585299480db1f34ba72a01b`.

Candidate source, profile, placement, generated data, fixtures, provenance, preview, validators, tests, schemas, package files, lockfiles, CI, parser, placement implementation, faction-context implementation, runtime identity logic, historical/debug/archive exclusions, VM-531, Excel, original main, DRIFT-017 prototype, and Table Talk remained outside certification scope. Certification is governance-only.

## Reviewed Truth

- Approval-blocking findings: 0.
- Claims: 11 total; 10 substantive, 1 support, 0 discovery, 0 unclassified.
- Sources: 19 total; 8 claim-bearing, 8 shaping-only, 3 support-only.
- Evidence locators: every substantive claim has bounded evidence locations; evidence-location source IDs match claim source IDs.
- Provenance: 28 MARDU rows, zero null canonical IDs, zero missing hashes, zero missing generated consumers.
- Fixtures: 30 cases at `research/fixtures/semantic-readiness/mardu.semantic-fixtures.json`.
- Candidate scope: PASS for `MARDU`; invalid aliases `RWB`, `WBR`, and `BRW` rejected as unknown identities.
- Neighbor target `JESKAI` rejected the Mardu candidate range as non-identity path/global generated changes while Jeskai remains unremediated.
- Preview: no `data/identity-layers.json` candidate change; preview text unchanged after approval.
- Collision and placement: frozen weights, rankings, calibration, native IDs, lateral targets, golden paths, and scoring fields preserved.
- Inherited warning: the MARDU model-owned inhibitor warning is exit-0, non-blocking, and not repaired by certification.

## Tests Run

- `git worktree list --porcelain` - collision/protection review.
- Protected worktree `git status --short` checks - unrelated dirty state preserved.
- `git show --no-patch --format="%H %P %s"` for the approved chain - PASS, direct parents match.
- `git diff --name-status 96df085ff38d03da1e37de80b1e11705b1dfa47a..f3b360ec0d9df569f585299480db1f34ba72a01b` - PASS, governance-only.
- `git diff --name-only 96df085ff38d03da1e37de80b1e11705b1dfa47a..f3b360ec0d9df569f585299480db1f34ba72a01b -- data/raw-factions/mardu data/factions.json data/placement-model.json data/semantic-readiness-provenance.json research/fixtures/semantic-readiness/mardu.semantic-fixtures.json supabase/functions/guild-recruiter/faction-context.ts` - PASS, no output.
- `node research\validate-semantic-candidate-scope.mjs --base=7970c14822ce006c0d88f95cc6ed01bb3c79b81f --target=96df085ff38d03da1e37de80b1e11705b1dfa47a --identity=MARDU` - PASS.
- Same exact range with `--identity=RWB` - expected failure: `Unknown identity RWB`.
- Same exact range with `--identity=WBR` - expected failure: `Unknown identity WBR`.
- Same exact range with `--identity=BRW` - expected failure: `Unknown identity BRW`.
- Same exact range with `--identity=NOT_A_REAL_IDENTITY` - expected failure: unknown identity.
- Same exact range with `--identity=JESKAI` - expected failure; Mardu paths rejected as out of Jeskai scope and Jeskai unclassified proof-chain contamination reported.
- `node research\semantic-candidate-scope-tests.js` - PASS.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=MARDU` - PASS.
- `node research\audit-semantic-readiness.mjs --targets=MARDU` - PASS; 11 claims, 10 substantive claims, 1 support record, 19 sources, 28 reference sites.
- `node research\validate-source-generated-guardrails.mjs --targets=MARDU` - PASS with one inherited model-owned inhibitor warning.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:parser` - PASS; 226 parser cases.
- `npm.cmd run test:faction-context-isolation` - PASS.
- Certification governance tree `npm.cmd run test:semantic-readiness` - contract tests, candidate-scope regression, and fixture validation passed; byte-strict provenance check reported stale because post-candidate governance ledger commits are newer than generated provenance. No tracked files changed.
- Fresh detached exact-candidate tree `C:\tmp\m530certx`: `npm.cmd ci` - PASS from committed lockfile; 217 packages installed, 19 inherited audit vulnerabilities reported.
- Detached exact-candidate tree with ignored Scryfall corpus hardlink: `npm.cmd test` - PASS.
- Detached exact-candidate focused checks: exact MARDU candidate-scope, MARDU fixture readiness, MARDU source/generated guardrails, and `npm.cmd run test:semantic-readiness` - PASS after disposable provenance byte normalization.
- Detached exact-candidate provenance reconciliation: `node research\build-semantic-readiness-provenance.mjs` wrote 2043 entries; `git diff --ignore-cr-at-eol -- data\semantic-readiness-provenance.json` showed no content delta beyond Windows line-ending warnings, then `node research\build-semantic-readiness-provenance.mjs --check` verified 2043 entries.
- Detached exact-candidate tree `C:\tmp\m530certx` removed after evidence collection.

## Exact-Tree Setup

- Exact-tree path: `C:\tmp\m530certx`
- Creation method: `git worktree add --detach C:\tmp\m530certx 96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Exported SHA: `96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Dependency command: `npm.cmd ci`
- Lockfile: committed `package-lock.json`
- xlsx declaration: `devDependencies.xlsx = ^0.18.5`
- Scryfall corpus source: `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`, 206425820 bytes
- Corpus target: `C:\tmp\m530certx\data\scryfall\raw\oracle-cards.json`
- Link method: NTFS hardlink via `New-Item -ItemType HardLink`
- Ignored-input justification: `.gitignore` excludes `data/scryfall/raw/*.json` and `node_modules/`; neither input was staged or committed.

## Warning And Environment Disposition

Command: `node research\validate-source-generated-guardrails.mjs --targets=MARDU`.

Exact warning text: `inhibitor_traps[model_owned]: One inhibitor trap is backed by the builder's model-owned biological prior rather than raw placement text.` Entry: `Waits for permission, comfort, or perfect safety when the honest opening asks for decisive action under a code.`

The warning predates certification and was recorded during VM-530 Gate 1+2, candidate workflow, and independent review. Governing authority treats it as non-blocking because the validator exits zero and the approved candidate was not repaired or replaced during certification. No validation was skipped because of it.

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
| Superseded candidates recorded | N/A - no superseded VM-530 candidate exists |
| Review uses exact candidate SHA | PASS |
| Certification uses exact approved SHA | PASS |
| Governance-only workflow/review/certification commits | PASS |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel/external tracker explicitly untouched by Codex |

## Decisions Made

- Certified only exact approved candidate SHA `96df085ff38d03da1e37de80b1e11705b1dfa47a`, not the workflow commit, review commit, branch head label, or latest changes.
- Kept candidate workflow `ab961e384ef72bd4c56dae07f60863016511adb0`, approval review `f3b360ec0d9df569f585299480db1f34ba72a01b`, and certification commit placeholder distinct.
- Set next identity to VM-531 / Jeskai as backlog and not started; no Jeskai branch, worktree, drift preflight, semantic audit, remediation, candidate, review, or certification work was started.
- Treated byte-strict provenance stale reports in Windows checkouts as line-ending/governance-age behavior after exact-candidate generated truth reconciled to 2043 entries.

## Risks / Uncertainties

- Tracked governance cannot contain its own future commit SHA; actual certification SHA must be reported externally after commit creation.
- The external Excel tracker was explicitly left untouched.
- The inherited MARDU inhibitor warning remains non-blocking because the established guardrail exits 0 and certification did not change the candidate.
- The post-review governance tree can make byte-strict semantic provenance `--check` stale because the builder includes the governance ledger; exact-candidate generated truth reconciled after disposable byte normalization with no CRLF-insensitive content delta.
- Windows line-ending behavior can mark generated/audit files modified after validation; those marks were disclosed in the disposable exact-candidate tree and not staged.
- `npm.cmd ci` reports 19 inherited audit vulnerabilities; the candidate changed no dependency authority and certification did not modify dependencies.

## Not Touched

No semantic remediation, replacement candidate, source, claim, evidence, provenance ownership, fixture, collision, preview, generated semantic, recruiter, runtime, validator, generator, schema, package, lockfile, CI, parser, placement implementation, faction-context implementation, original-main, protected-worktree, DRIFT-017 prototype, historical/debug/archive, VM-531, Excel, push, PR, merge, amend, rebase, cherry-pick, or branch-head review substitution occurred.

## Follow-Up Recommendations

Use the actual certification commit SHA from the final task output as the new external program base. Perform completed-worktree cleanup before starting VM-531 only in a separate explicit drift-preflight continuation from that certification SHA.

## Next Suggested Agent

Kanban Steward or CRIT-001 Planning Architect for completed-worktree cleanup, then VM-531 drift-preflight setup only after external tracker governance is reconciled.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-530-mardu-semantic-recovery.md`
- `docs/incidents/recoveries/VM-530-mardu-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-register.md`

CERTIFIED EXACT SHA 96df085ff38d03da1e37de80b1e11705b1dfa47a
