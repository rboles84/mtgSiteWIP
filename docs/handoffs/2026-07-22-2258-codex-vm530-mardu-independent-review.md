# VM-530 Mardu Independent Exact-SHA Review

## Agent Name

Codex

## Task Requested

Perform a fresh independent exact-SHA review of VM-530 Mardu candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a` against program base `7970c14822ce006c0d88f95cc6ed01bb3c79b81f` from dedicated branch `codex/vm-530-mardu-semantic-recovery-independent-review` and worktree `C:\dev\mtgSiteWIP-crit001-vm530-mardu-independent-review`, starting exactly from workflow commit `ab961e384ef72bd4c56dae07f60863016511adb0`. Do not modify the candidate, repair, replace, certify, start VM-531, edit Excel, push, PR, merge, reset, clean, stash, or touch protected worktrees.

## Decision

APPROVE EXACT SHA `96df085ff38d03da1e37de80b1e11705b1dfa47a`

This is an independent review approval only. Mardu remains not certified and not `semantically_ready` until a separate certification window certifies this exact approved candidate.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- `docs/handoffs/2026-07-22-2213-codex-vm530-mardu-gate1-gate2.md`
- `docs/handoffs/2026-07-22-2235-codex-vm530-mardu-candidate-workflow.md`
- `docs/handoffs/2026-07-22-2144-codex-vm529-sultai-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/backlog/VM-531-jeskai-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- Candidate files changed by exact SHA `96df085ff38d03da1e37de80b1e11705b1dfa47a`

## Files Changed

- `docs/handoffs/2026-07-22-2258-codex-vm530-mardu-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

No candidate semantic/raw/generated/runtime/fixture/provenance/recruiter/test/validator/schema/package/CI file was changed by this review.

## What Changed

Recorded independent exact-SHA approval for VM-530 Mardu candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a` and updated governance so VM-530 is certification-ready only.

## Why It Changed

CRIT-001 requires an independent review to rerun exact-SHA controls before certification. The review found no blocker, high, medium, or low findings against the exact candidate.

## Pre-Flight Summary

Recent related work: VM-529 Sultai is certified at program base `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`; VM-530 Mardu has distinct drift preflight `eb0b71846d1315ef9571cd3a99ec8b7a7279573e`, Gate 1+2 governance `43a9e1aafaea445c39b6d8402101e86b05e0edef`, exact semantic candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a`, and workflow commit `ab961e384ef72bd4c56dae07f60863016511adb0`.

Current known risks: unrelated dirty files exist in original main, long-running CRIT, and DRIFT-017 worktrees; review-tree full tests write gate-compression audit artifacts; exact-tree provenance check is CRLF-sensitive after checkout; `npm.cmd ci` reports inherited dependency audit vulnerabilities.

Relevant decisions already made: `MARDU` is canonical; `RWB` is display/color metadata only; `RWB`, `WBR`, and `BRW` must fail closed as validator identities; Commander/product material is support-only; certification must be separate and governance-only.

Files recently changed by the candidate: `data/raw-factions/mardu/mardu.claims.json`, `data/raw-factions/mardu/mardu.profile.json`, `data/raw-factions/mardu/mardu.placement.json`, `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, `research/fixtures/semantic-readiness/mardu.semantic-fixtures.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.

What should not be touched: exact candidate content, VM-531 Jeskai, certification/program-base/certified-count state, Excel, protected worktrees, original main, DRIFT-017 prototype, DRIFT-020 implementation, historical/debug/archive exclusions, Table Talk baseline, package/lockfile/CI/schema/validator/runtime/scoring/Hall/Crucible/global recruiter behavior, push, PR, and merge.

## Exact Object And Scope Results

- Review branch: `codex/vm-530-mardu-semantic-recovery-independent-review`.
- Review worktree: `C:\dev\mtgSiteWIP-crit001-vm530-mardu-independent-review`.
- Starting review HEAD: `ab961e384ef72bd4c56dae07f60863016511adb0`.
- Direct parent chain verified: `ab961e384ef72bd4c56dae07f60863016511adb0` -> `96df085ff38d03da1e37de80b1e11705b1dfa47a` -> `43a9e1aafaea445c39b6d8402101e86b05e0edef` -> `eb0b71846d1315ef9571cd3a99ec8b7a7279573e` -> `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`.
- Candidate commit `96df085ff38d03da1e37de80b1e11705b1dfa47a` changes exactly the expected 8 candidate files.
- Workflow commit `ab961e384ef72bd4c56dae07f60863016511adb0` is governance-only.
- No approval, rejection, certification, or superseding VM-530 candidate was found before this review.

## Review Findings

- Blocker findings: none.
- High findings: none.
- Medium findings: none.
- Low findings: none.
- Non-blocking observations: source/generated guardrails retain the inherited MARDU model-owned inhibitor warning; review-tree provenance `--check` is stale after workflow governance commits, while the exact candidate tree reconciles to 2043 entries with no CRLF-insensitive content diff; `npm.cmd ci` reports 19 inherited audit vulnerabilities.

## Independent Review Record

- Review base: `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`.
- Exact candidate reviewed: `96df085ff38d03da1e37de80b1e11705b1dfa47a`.
- Superseded candidate excluded: N/A - no VM-530 superseded candidate found.
- Reviewer independence confirmed: PASS - review ran from separate branch/worktree at workflow commit and did not edit candidate files.
- Candidate isolation result: PASS - exact candidate changes 8 MARDU-owned semantic/generated/recruiter/fixture files only.
- Source-authority result: PASS - 10 substantive claims have bounded evidence, source parity, and evidence scopes; `mardu_claim_0011` remains support-only.
- Semantic-risk result: PASS - support-only Commander material is absent from generated provenance and fixtures.
- Neighbor-boundary result: PASS - 30 fixtures include 26 required neighbor/generic/Kolaghan/Dragonstorm/Commander/seed/color-philosophy exclusions plus core, pressure, nearest ambiguity, and provenance fixtures.
- Contract v1.1 result: PASS - claim roles complete; no unclassified claims; explicit support isolation preserved.
- Fixture/provenance result: PASS - MARDU provenance has 28 rows with zero null canonical IDs/hashes, and the provenance fixture exactly matches the generated `/core_identity` claim/source chains.
- Frozen-field result: PASS - raw color metadata, placement calibration, required-term/min-hit/broad-penalty controls, collision guidance, generated lateral targets, identity-layer source, and embedded preview equality stayed stable.
- Candidate-scope result: PASS for `MARDU`; expected fail-closed for `RWB`, `WBR`, `BRW`, and `NOT_A_REAL_IDENTITY`; expected reject for neighbor `JESKAI`.
- Generated/recruiter result: PASS - source/generated guardrails pass with one inherited non-blocking warning, and faction-context isolation passes.
- Validation result: PASS - focused review-tree and fresh exact-tree validations passed.
- Decision: APPROVE EXACT SHA `96df085ff38d03da1e37de80b1e11705b1dfa47a`.
- Review-record SHA: `PENDING_VM530_INDEPENDENT_REVIEW_SHA`.

## Drift Scorecard

| Control | Review |
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
| Superseded candidates recorded | N/A - no superseded VM-530 candidate found |
| Review uses exact candidate SHA | PASS |
| Certification uses exact approved SHA | N/A - certification not performed |
| Governance-only workflow/review/certification commits | PASS |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel/external tracker explicitly untouched |

No `FAIL` or `UNKNOWN` controls were recorded.

## Tests Run

- `git worktree list --porcelain` - collision/protection review.
- Protected worktree `git status --short` checks - unrelated dirty state preserved.
- `git rev-parse HEAD HEAD^ HEAD^^ HEAD^^^ HEAD^^^^` - direct VM-530 chain verified.
- `git diff --name-status 43a9e1aafaea445c39b6d8402101e86b05e0edef 96df085ff38d03da1e37de80b1e11705b1dfa47a` - exact candidate file scope verified.
- JSON claim/provenance/fixture probes - 11 claims, 10 substantive, 1 support; 28 MARDU provenance rows; 30 fixtures; zero missing fixture refs; support claim absent from fixtures/provenance.
- Frozen-field comparison script - PASS.
- `node research\validate-semantic-candidate-scope.mjs --base=7970c14822ce006c0d88f95cc6ed01bb3c79b81f --target=96df085ff38d03da1e37de80b1e11705b1dfa47a --identity=MARDU` - PASS.
- Same exact range with `--identity=RWB`, `--identity=WBR`, `--identity=BRW`, and `--identity=NOT_A_REAL_IDENTITY` - expected failures as unknown identities.
- Same exact range with `--identity=JESKAI` - expected failure; Mardu range rejected as non-Jeskai scope and Jeskai remains unremediated.
- `node research\semantic-candidate-scope-tests.js` - PASS.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=MARDU` - PASS.
- `node research\audit-semantic-readiness.mjs --targets=MARDU` - PASS; 11 claims, 10 substantive, 1 support, 19 sources, 28 reference sites.
- `node research\validate-source-generated-guardrails.mjs --targets=MARDU` - PASS with one inherited model-owned inhibitor warning.
- Review tree `node research\build-semantic-readiness-provenance.mjs --check` - expected stale after workflow governance commit.
- `npm.cmd run test:parser` - PASS; 226 parser cases.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - PASS.
- Review tree `npm.cmd test` - PASS after sandbox escalation allowed normal gate-compression audit writes.
- Fresh detached exact-candidate worktree `C:\tmp\m530x` at `96df085ff38d03da1e37de80b1e11705b1dfa47a`: `npm.cmd ci` - PASS with inherited 19 audit vulnerabilities.
- Exact tree Scryfall corpus hardlink from `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json` - PASS.
- Exact tree focused MARDU semantic, source/generated, and candidate-scope checks - PASS.
- Exact tree provenance generation - wrote 2043 entries; `git diff --ignore-cr-at-eol -- data\semantic-readiness-provenance.json` showed no content diff; then `node research\build-semantic-readiness-provenance.mjs --check` - PASS.
- Exact tree `npm.cmd test` - PASS.
- Exact tree `C:\tmp\m530x` removed after evidence collection.

## Not Touched

No candidate repair, replacement candidate, semantic raw data, generated data, fixture, provenance candidate content, recruiter implementation, runtime behavior, tests, validators, schemas, package, lockfile, CI, parser, placement implementation, Hall, Crucible, scoring, global recruiter tuning, certification, `semantically_ready` transition, program-base change, certified-count change, VM-531 work, Excel, original-main edit, protected-worktree edit, DRIFT-017 prototype edit, DRIFT-020 implementation edit, historical/debug/archive edit, Table Talk edit, push, PR, merge, rebase, reset, stash, amend, or force update occurred.

## Follow-Up Recommendations

Proceed only to a separate certification window for exact approved candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a`. Certification must reconcile this reviewed truth, keep the commit governance-only, preserve the exact approval line, and leave VM-531 setup/semantic work untouched until after certification.

## Next Suggested Agent

CRIT-001 certification agent for VM-530 Mardu.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/handoffs/2026-07-22-2235-codex-vm530-mardu-candidate-workflow.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`

APPROVE EXACT SHA 96df085ff38d03da1e37de80b1e11705b1dfa47a
