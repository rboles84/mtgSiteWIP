# VM-528 Temur Candidate Workflow Record

Agent name: Codex

Task requested: Complete VM-528 Temur Gate 3+4 remediation from Gate 1+2 governance commit `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e`, create an exact semantic candidate, validate it, and record a Gate 5 workflow handoff for independent review only. Do not review, certify, push, PR, merge, edit Excel, start VM-529, or alter protected worktrees.

## Decision

READY FOR INDEPENDENT REVIEW OF EXACT SHA 790fca923c504e32911e0be0eb44f7fdbcfb07dc.

This workflow commit is not the semantic candidate. The only candidate eligible for review is `790fca923c504e32911e0be0eb44f7fdbcfb07dc`.

## Files Reviewed

- `docs/handoffs/2026-07-22-1549-codex-vm528-temur-gate1-gate2.md`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/temur.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

Candidate commit `790fca923c504e32911e0be0eb44f7fdbcfb07dc` changed:

- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/temur.semantic-fixtures.json`

This workflow record changes only governance/documentation files.

## What Changed

Temur now has 10 substantive claims and 1 support record, source-parity evidence locations, Temur-local canonical owner IDs for formerly null provenance rows, auxiliary support isolation for Commander product source-basis rows, semantic guidance evidence for recruiter guidance, regenerated provenance, and 24 semantic fixtures covering required neighbors and provenance.

## Why It Changed

CRIT-001 Contract v1.1 requires source-bounded semantic roles, exact proof chains, generated provenance, and fixtures before an identity candidate can enter independent exact-SHA review.

## Decisions Made

- Candidate SHA for review: `790fca923c504e32911e0be0eb44f7fdbcfb07dc`.
- Candidate parent / Gate 1+2 governance SHA: `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e`.
- Canonical identity remains `TEMUR`; `GUR`, `URG`, and `RGU` remain invalid identity aliases.
- No certification or independent review was performed.

## Risks / Uncertainties

- `npm.cmd test` passes many suites but stops at existing missing optional package `xlsx` imported by `research/import-precon-mechanics-validation.mjs`. This is recorded as a test-environment dependency gap, not a Temur semantic failure.
- Source/generated guardrails preserve one pre-existing non-blocking model-owned inhibitor warning for TEMUR.

## Tests Run

- `node research/validate-semantic-readiness.mjs --targets=TEMUR`: PASS.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=TEMUR`: PASS.
- `node research/audit-semantic-readiness.mjs --targets=TEMUR`: PASS audit; 10 substantive, 1 support, 0 unclassified, no missing references, no invalid support links.
- `node research/validate-source-generated-guardrails.mjs --targets=TEMUR`: PASS with 1 known model-owned inhibitor warning.
- `node research/validate-semantic-candidate-scope.mjs --base=cc1eca1ac7ec3895f7d08a280bf9f13f9595356e --target=790fca923c504e32911e0be0eb44f7fdbcfb07dc --identity=TEMUR`: PASS.
- Same candidate-scope command with `GUR`, `URG`, and `RGU`: each failed closed as `Unknown identity ...` as expected.
- `npm.cmd run test:parser`: PASS, 226 parser cases.
- `npm.cmd test`: partial PASS through adaptive placement, live Gate bias, parser, screenshot builder, semantic readiness contract, Maze query/reading/search metadata, builder, syntax translation, mode/leakage suites; stops on missing `xlsx` package.
- `node research/build-faction-artifacts.mjs` and `node research/build-semantic-readiness-provenance.mjs`: rerun completed; no candidate content drift remained after index refresh.

## Not Touched

No independent review, certification, Excel file, VM-529 work, push, PR, merge, rebase, cherry-pick, stash, amend, reset, clean, package install, validator implementation, generator implementation, schema behavior, original-main worktree, DRIFT-017 prototype files, DRIFT-020 implementation, Table Talk work, or protected dirty worktree content was touched.

## Follow-Up Recommendations

Assign an independent reviewer to rerun CRIT-001 drift controls and review exact SHA `790fca923c504e32911e0be0eb44f7fdbcfb07dc` only.

## Next Suggested Agent

Independent exact-SHA review agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1549-codex-vm528-temur-gate1-gate2.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`

READY FOR INDEPENDENT REVIEW OF EXACT SHA 790fca923c504e32911e0be0eb44f7fdbcfb07dc
