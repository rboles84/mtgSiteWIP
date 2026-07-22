# VM-527 Abzan Independent Exact-SHA Review

Agent name: Codex

Task requested: Perform a fresh independent exact-SHA review of VM-527 Abzan candidate `11c099b8beb9f23e23660787f00b97e89914d50b` from program base `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`, without remediation or certification.

## Decision

APPROVE EXACT SHA `11c099b8beb9f23e23660787f00b97e89914d50b`

This approval is only for the exact semantic candidate SHA above. It is not approval of the branch, current HEAD, Gate 1+2 governance, Gate 3+4 workflow, Gate 5 workflow, a range, the compacted-note typo, certification, program-base advancement, Excel work, VM-528 work, push, PR, or merge.

## Review Header

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-527 - Abzan
- Canonical identity key: `ABZAN`
- Display color order: `WBG`
- Review branch: `codex/vm-527-abzan-semantic-recovery-independent-review`
- Review worktree: `C:\dev\mtgSiteWIP-crit001-vm527-abzan-independent-review`
- Starting HEAD: `71bf962c653a7b03b48bb05fca8661cdc3af2daa`
- Program base / VM-526 certification: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`
- Gate 1+2 governance: `ce550014275d48960b74c47e9ba97169cfbd4fd0`
- Gate 1+2 parent: `6375947ef15ff934b75a3199cde47fe0c1703470`
- Gate 3+4 workflow: `a0e37d20edf43412d8e17d02104479a6fc0938c4`
- Corrected exact semantic candidate: `11c099b8beb9f23e23660787f00b97e89914d50b`
- Gate 5 workflow: `71bf962c653a7b03b48bb05fca8661cdc3af2daa`
- Candidate workflow handoff: `docs/handoffs/2026-07-22-1125-codex-vm527-abzan-candidate-workflow.md`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/templates/identity-semantic-recovery-template.md`
- `docs/incidents/recoveries/VM-522-bant-semantic-recovery.md`
- `docs/incidents/recoveries/VM-523-esper-semantic-recovery.md`
- `docs/incidents/recoveries/VM-524-grixis-semantic-recovery.md`
- `docs/incidents/recoveries/VM-525-jund-semantic-recovery.md`
- `docs/incidents/recoveries/VM-526-naya-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`
- `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- `docs/handoffs/2026-07-22-1110-codex-vm527-abzan-gate3-gate4.md`
- `docs/handoffs/2026-07-22-1125-codex-vm527-abzan-candidate-workflow.md`
- `docs/handoffs/2026-07-21-2004-codex-drift020-independent-review.md`
- `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `research/validate-semantic-readiness.mjs`
- `research/semantic-readiness-lib.mjs`
- `research/semantic-readiness-tests.js`
- `research/validate-source-generated-guardrails.mjs`
- `research/build-semantic-readiness-provenance.mjs`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json`

## Files Changed

This review commit changes governance only:

- `docs/handoffs/2026-07-22-1242-codex-vm527-abzan-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## What Changed

- Recorded independent exact-SHA approval for candidate `11c099b8beb9f23e23660787f00b97e89914d50b`.
- Marked VM-527 independent review approved and certification-only next.
- Preserved program base, certified count, VM-528 untouched state, and Gate/candidate/workflow separation.

## Why It Changed

Independent review reran CRIT-001 exact-SHA, source, semantic, fixture, provenance, generated, candidate-scope, corpus, exact-tree, and regression controls and found no approval-blocking `FAIL` or `UNKNOWN` result.

## Candidate-SHA Correction

The compacted campaign note typo was not treated as authority. The corrected candidate exists, is the only active VM-527 candidate designation in Gate 5 governance, and no later authorized candidate supersedes it.

## Complete Ancestry

- `6375947ef15ff934b75a3199cde47fe0c1703470` parent `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa` - VM-527 drift preflight.
- `ce550014275d48960b74c47e9ba97169cfbd4fd0` parent `6375947ef15ff934b75a3199cde47fe0c1703470` - Gate 1+2 audit.
- `11c099b8beb9f23e23660787f00b97e89914d50b` parent `ce550014275d48960b74c47e9ba97169cfbd4fd0` - semantic candidate.
- `a0e37d20edf43412d8e17d02104479a6fc0938c4` parent `11c099b8beb9f23e23660787f00b97e89914d50b` - Gate 3+4 workflow.
- `71bf962c653a7b03b48bb05fca8661cdc3af2daa` parent `a0e37d20edf43412d8e17d02104479a6fc0938c4` - Gate 5 workflow.

No failed or superseded VM-527 semantic candidate exists in committed history. The only superseded/conflicting SHA issue found was the corrected compacted-note typo, which is not present as active repository authority.

## Candidate Diff And Separation

Candidate commit-only changed exactly:

- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json`

Candidate statistics: 6 files, 1041 insertions, 65 deletions. Path classification: ABZAN authoritative claims, profile, placement, generated consumer, provenance, and fixture only. No candidate-scope infrastructure, package, lockfile, CI, parser, placement implementation, faction-context implementation, identity-layer preview, cross-identity raw packet, VM-528, historical/debug/archive, or unrelated infrastructure path changed.

Base-to-candidate range includes the required VM-527 governance setup plus the semantic candidate. Post-candidate range `11c099b8..71bf962c` is governance-only: Gate 3+4 handoff, Gate 5 handoff, handoff index, VM-527 card, board, and CRIT ledger updates. Candidate source, generated data, fixtures, provenance, profile, placement, preview, validators, tests, package files, and lockfiles did not change after the candidate.

## Semantic Review

Final Abzan state:

- Raw claims: 11.
- Substantive claims: 10.
- Support records: 1.
- Discovery records: 0.
- Unclassified records: 0.
- Sources: 20 total; 9 claim-bearing, 6 shaping-only, 5 support-only.
- Semantic provenance: 43 ABZAN rows, 0 null canonical IDs, 0 missing canonical content hashes, 2 auxiliary support rows.
- Fixtures: 17.

Each substantive claim has bounded evidence locations whose source IDs exactly match the claim source IDs and resolve in `abzan.sources.json`. The support-only Commander decklist claim remains `support_record` and appears only as auxiliary support, not as authoritative Abzan proof.

Abzan positive discriminators are endurance through family/house continuity, ancestor memory, White-centered duty, survived pressure, organized defense, perennation, and house-based community. Boundary review found the candidate distinguishes Abzan from generic WBG, generic defense/graveyard/counter themes, Orzhov attrition, Golgari recursion, Selesnya community, Bant structure, Jund conversion, Naya creature-family framing, Mardu aggression/hierarchy, Sultai exploitation, Dromoka's brood, and Commander product identity.

## Placement, Preview, Fixture, Generated, And Provenance Review

- Frozen placement/calibration/scoring/native/lateral/golden-path fields did not show unauthorized drift.
- `data/identity-layers.json` is absent from the candidate diff; Abzan preview text remains unchanged and embedded generated preview parity is preserved.
- Abzan fixtures cover inclusion, pressure behavior, nearest collision ambiguity, required-neighbor exclusions, Commander support-only exclusion, and provenance chain parity.
- Generated `data/factions.json` changes are ABZAN-scoped.
- Provenance builder committed-blob parity passed with 2015 rendered entries. Working-tree `build-semantic-readiness-provenance.mjs --check` reports stale only because Windows checkout line endings differ from the LF committed blob; direct builder-to-candidate-blob comparison passes.
- Generator idempotence in detached exact-candidate worktree produced no textual diff after `npm.cmd run build:factions`; only CRLF warnings appeared.

## Corpus And Exact-Tree Setup

- Review dependency command: `npm.cmd ci` from committed `package-lock.json`.
- Review corpus source: `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`.
- Review corpus target: `C:\dev\mtgSiteWIP-crit001-vm527-abzan-independent-review\data\scryfall\raw\oracle-cards.json`.
- Exact-tree path: `C:\Users\obake\AppData\Local\Temp\a527`.
- Exact-tree creation: detached worktree at `11c099b8beb9f23e23660787f00b97e89914d50b`.
- Exact-tree corpus target: `C:\Users\obake\AppData\Local\Temp\a527\data\scryfall\raw\oracle-cards.json`.
- Ignored-input justification: `.gitignore` excludes `data/scryfall/raw/*.json`; repository architecture and prior CRIT review handoffs document the local-only Scryfall corpus as an ignored test input.
- No ignored corpus, dependency artifact, or uncommitted candidate-worktree content was staged or committed.

## Tests Run

- `git worktree list --porcelain` - PASS, no review collision before setup.
- `git branch --list "*vm-527*"` and `git branch -r --list "*vm-527*"` - PASS, no independent-review branch collision.
- `git merge-base --is-ancestor 11c099b8beb9f23e23660787f00b97e89914d50b 71bf962c653a7b03b48bb05fca8661cdc3af2daa` - PASS.
- `git log --format="%H %P %s" 80b34dcda7db51d08f77f862f4eafb5cf3cabeaa..71bf962c653a7b03b48bb05fca8661cdc3af2daa` - PASS, linear ancestry reconstructed.
- `git diff --name-status 80b34dcda7db51d08f77f862f4eafb5cf3cabeaa..11c099b8beb9f23e23660787f00b97e89914d50b` - PASS.
- `git diff --name-status 11c099b8beb9f23e23660787f00b97e89914d50b..71bf962c653a7b03b48bb05fca8661cdc3af2daa` - PASS, governance-only.
- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=11c099b8beb9f23e23660787f00b97e89914d50b --identity=ABZAN` - PASS.
- Same exact range with `--identity=WBG` - expected `Unknown identity WBG`, exit 1.
- Same exact range with `--identity=BGW` - expected `Unknown identity BGW`, exit 1.
- Same exact range with `--identity=GWB` - expected `Unknown identity GWB`, exit 1.
- Same exact range with `--identity=NAYA` - expected non-identity path rejection, exit 1.
- Same exact range with `--identity=UNKNOWN_ABZAN_REVIEW` - expected unknown identity, exit 1.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `node research/validate-semantic-readiness.mjs --targets=ABZAN` - PASS.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=ABZAN` - PASS.
- `node research/semantic-readiness-tests.js` - PASS.
- `node research/scryfall-parser-tests.js` - PASS, 226 parser cases.
- `node research/faction-context-isolation-tests.js` - PASS.
- `node research/validate-source-generated-guardrails.mjs --targets=ABZAN` - PASS with one known non-blocking model-owned inhibitor warning.
- `npm.cmd ci` in review worktree - PASS; 217 packages installed, audit reports 19 vulnerabilities.
- `npm.cmd test` in review worktree - PASS.
- `npm.cmd ci` in detached exact-candidate worktree - PASS; 217 packages installed, audit reports 19 vulnerabilities.
- `npm.cmd test` in detached exact-candidate worktree - PASS.
- Direct provenance builder-to-candidate-blob comparison - PASS, 2015 entries.
- `npm.cmd run build:factions` in detached exact-candidate worktree followed by diff - PASS, no textual diff; CRLF warnings only.

## Review Matrix

| Control | Area | Result | Severity | Blocking | Evidence |
|---|---|---|---|---|---|
| IR-001 | Exact program base | PASS | CRITICAL | No | Base `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa` verified |
| IR-002 | Exact candidate authority | PASS | CRITICAL | No | Gate 5 and ledger name only `11c099b8...` |
| IR-003 | Candidate typo resolution | PASS | CRITICAL | No | Typo absent from active repository authority |
| IR-004 | Ancestry | PASS | CRITICAL | No | Linear graph reconstructed |
| IR-005 | Candidate/workflow separation | PASS | CRITICAL | No | Post-candidate diff governance-only |
| IR-006 | Path scope | PASS | CRITICAL | No | Candidate commit changed only six ABZAN files |
| IR-007 | Claim roles | PASS | CRITICAL | No | 10 substantive, 1 support, 0 unclassified |
| IR-008 | Evidence locators | PASS | MAJOR | No | Source/locator parity script passed |
| IR-009 | Commander support isolation | PASS | MAJOR | No | `abzan_claim_0011` support-only / auxiliary |
| IR-010 | Neighbor boundaries | PASS | MAJOR | No | Required exclusions and manual review |
| IR-011 | Frozen fields | PASS | CRITICAL | No | No unauthorized placement/calibration drift |
| IR-012 | Preview | PASS | MAJOR | No | `data/identity-layers.json` unchanged |
| IR-013 | Fixtures | PASS | MAJOR | No | 17 fixtures, fixture validation pass |
| IR-014 | Provenance | PASS | CRITICAL | No | 43 ABZAN rows, 0 null IDs/hashes |
| IR-015 | Candidate scope | PASS | CRITICAL | No | ABZAN pass; aliases/unknown/neighbor reject |
| IR-016 | Synthetic negatives | PASS | CRITICAL | No | `semantic-candidate-scope-tests.js` pass |
| IR-017 | Regression tests | PASS | CRITICAL | No | Full `npm.cmd test` pass in review and exact tree |
| IR-018 | Missing corpus | PASS | MAJOR | No | Ignored hardlink supplied from documented local corpus |
| IR-019 | Line endings | PASS | MINOR | No | Blob parity passes; working-tree `--check` newline-only |
| IR-020 | No remediation | PASS | CRITICAL | No | Review commit governance-only |

Totals: PASS 20, FAIL 0, UNKNOWN 0, N/A 0. Severity totals: CRITICAL 10, MAJOR 8, MINOR 1, INFORMATIONAL 1. Approval-blocking findings: 0.

## Risks / Uncertainties

- `build-semantic-readiness-provenance.mjs --check` is byte-sensitive to CRLF checkout line endings in Windows worktrees. Direct candidate-blob comparison proves the committed LF blob matches builder output, and generator idempotence produced no textual diff.
- `validate-source-generated-guardrails` retains the known non-blocking model-owned inhibitor warning for one Abzan inhibitor trap.
- `npm.cmd ci` reports 19 existing audit vulnerabilities; this review did not change package files.

## Not Touched

No Abzan source/profile/placement/generated/fixture/provenance/preview/validator/test/package/lockfile/corpus/dependency artifact was staged or committed. No remediation, replacement candidate, certification, semantically_ready transition, certified-count change, program-base advancement, VM-528 work, Excel edit, original-main edit, protected-worktree edit, DRIFT-017 edit/use, VM-542/DRIFT-019 residual edit, historical/debug/archive edit, Table Talk edit, push, PR, or merge occurred.

## Follow-Up Recommendations

Proceed only to a separate certification-only governance task for exact approved candidate `11c099b8beb9f23e23660787f00b97e89914d50b`. Do not certify any other SHA.

## Next Suggested Agent

Certification-only governance agent for VM-527 Abzan, using exact approved candidate `11c099b8beb9f23e23660787f00b97e89914d50b`.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1125-codex-vm527-abzan-candidate-workflow.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`

APPROVE EXACT SHA 11c099b8beb9f23e23660787f00b97e89914d50b
