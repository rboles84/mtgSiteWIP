# VM-529 Sultai Independent Exact-SHA Review

Agent name: Codex
Task requested: Fresh independent exact-SHA review of VM-529 Sultai candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6` against program base `8e23ef467ec7f60daec746c14493173f96d9261c`, starting from workflow commit `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc` on branch `codex/vm-529-sultai-semantic-recovery-independent-review`.
Related Kanban card, docs, or plans: `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`; `docs/incidents/CRIT-001-identity-recovery-ledger.json`; CRIT-001 Contract v1.1 and drift-control baseline.

## Scope And Decision

Decision: `APPROVE EXACT SHA a92fb3f8a0ec4235d5148b20c4040bd717332ad6`

This is review-only governance. I did not modify, repair, replace, certify, merge, push, open a PR, update Excel, update package files, or start VM-530.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- VM-529 drift, Gate 1+2, and candidate workflow handoffs
- CRIT-001 drift-control, operating-playbook, Contract v1.1, semantic readiness, source/generated, and workflow references
- Candidate files: Sultai claims/profile/placement, `data/factions.json`, semantic provenance, and Sultai semantic fixtures
- Fresh detached exact-test worktree: `C:\dev\mtgSiteWIP-crit001-vm529-sultai-independent-review-exact-test`

## Files Changed

- `docs/handoffs/2026-07-22-2123-codex-vm529-sultai-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## What Changed

Recorded independent review approval of exact candidate SHA `a92fb3f8a0ec4235d5148b20c4040bd717332ad6` and updated governance state to `approved_awaiting_certification`. VM-529 remains in progress; certification, semantically_ready transition, program-base advancement, certified-count increment, Excel, VM-530, push, PR, and merge remain not started.

## Review Findings

No approval-blocking findings remain.

Exact object chain reviewed: program base `8e23ef467ec7f60daec746c14493173f96d9261c`; drift preflight `74b8153c124eb03d95a28ae2aac126c29f3c5db4`; Gate 1+2 governance `5c4e73360d99ed1cf5f3bae5bd9302773ae9e14e`; candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`; candidate workflow `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc`.

Candidate diff classification from Gate 1+2 to candidate: six Sultai-scoped semantic files only, 1222 insertions and 65 deletions. Program-base range includes expected VM-529 drift/Gate/candidate governance and Sultai candidate files. Candidate-to-workflow delta is governance-only. No superseded or rejected Sultai candidate was found.

Semantic review summary: 11 claims total, 10 substantive plus 1 support record; 18 sources with 7 claim-bearing, 7 shaping-only, and 4 support-only; substantive claims have bounded evidence/source parity; support claim `sultai_claim_0011` stays auxiliary and is not used in fixtures or recruiter evidence. Canonical identity remains `SULTAI`; `BGU` is metadata/routing only, and `BGU`, `GUB`, and `UBG` are rejected as unknown identities. SULTAI identity-layer preview is unchanged from base and embedded generated preview matches it. Fixtures total 28, including 24 required exclusions, with no support-only fixture proof. SULTAI provenance has 44 entries, zero missing canonical IDs, zero missing hashes, and generated consumers for `data/factions.json`, `data/placement-model.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.

## Tests Run

- Candidate-scope exact SULTAI: PASS
- Candidate-scope aliases `BGU`, `GUB`, `UBG`: expected FAIL, unknown identity
- Candidate-scope mis-scoped `TEMUR`: expected FAIL, Sultai-scope rejection
- `node research\semantic-candidate-scope-tests.js`: PASS
- `node research\validate-semantic-readiness.mjs --targets=SULTAI`: PASS
- `node research\validate-semantic-readiness.mjs --fixtures --targets=SULTAI`: PASS
- `node research\audit-semantic-readiness.mjs --targets=SULTAI`: PASS; reported 11 claims, 10 substantive, 1 support, 18 sources
- `node research\validate-source-generated-guardrails.mjs --targets=SULTAI`: PASS with one inherited model-owned inhibitor warning
- `npm.cmd run test:placement`: PASS
- `npm.cmd run test:parser`: PASS, 226 parser cases
- `npm.cmd run test:faction-context-isolation`: PASS
- `npm.cmd run test:source-generated`: PASS for default JESKAI/MARDU guardrail targets
- Review-worktree `npm.cmd test`: partial before dependency install, stopped on missing `xlsx`; not used as final exact proof
- Detached exact candidate worktree `npm.cmd ci`: PASS with inherited npm audit findings unchanged
- Detached exact candidate worktree `npm.cmd test`: PASS after hardlinking ignored local Scryfall corpus
- Detached exact tree SULTAI candidate-scope, fixture readiness, and source/generated checks: PASS
- Exact tree generation/provenance builders: content-idempotent; `git diff --ignore-cr-at-eol` shows no content delta, only Windows CRLF warnings

## Decisions Made

Approved exact candidate SHA `a92fb3f8a0ec4235d5148b20c4040bd717332ad6` for certification-only follow-up. Left VM-529 uncertified and not semantically_ready. Left program base `8e23ef467ec7f60daec746c14493173f96d9261c`, certified identity count 27, and VM-530 backlog/not started unchanged. Preserved candidate/workflow/review separation.

## Risks / Uncertainties

- `npm.cmd ci` reports inherited moderate/high audit findings; package and lockfile were unchanged.
- Source/generated guardrail check retains one SULTAI model-owned inhibitor warning as exit-0 non-blocking.
- Exact-test worktree contains generated audit report and line-ending working-tree noise after tests; it is disposable and uncommitted.

## Not Touched

Candidate data, generated artifacts, runtime scoring, validators, tests, package files, CI, schema files, Excel, VM-530 and later identities, original main, DRIFT-017, Table Talk baseline, other protected dirty worktrees, push, PR, merge, certification, program-base advancement, and certified-count increment.

## Follow-Up Recommendations

Next action should be VM-529 certification-only governance for exact approved candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`, starting from this independent review commit. Do not start VM-530 until VM-529 certification is committed.

## Next Suggested Agent

Certification steward for VM-529 Sultai exact approved candidate.

APPROVE EXACT SHA a92fb3f8a0ec4235d5148b20c4040bd717332ad6
