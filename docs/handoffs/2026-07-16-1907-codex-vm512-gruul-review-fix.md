# 2026-07-16 19:07 - Codex - VM-512 Gruul Review Fix

## Agent Name

Codex

## Task Requested

Remediate the single VM-512 Gruul / RG approval-blocking review finding, create a replacement candidate commit, and record the workflow state without performing review, certification, or VM-513 work.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-16-1754-codex-vm512-gruul-candidate.md`
- `docs/handoffs/2026-07-16-1833-codex-vm512-gruul-independent-review.md`
- Gruul raw profile, raw placement, generated semantic provenance, and semantic fixture files.

## Files Changed

Replacement candidate commit `16b58c3f32d92e6406d368169d91b0b6a86f948d`:

- `data/raw-factions/gruul_clans/gruul_clans.profile.json`
- `data/raw-factions/gruul_clans/gruul_clans.placement.json`
- `research/fixtures/semantic-readiness/gruul_clans.semantic-fixtures.json`

Workflow-record commit will include this handoff plus VM-512 governance/report files only.

## What Changed

- Removed only duplicate claim-ID occurrences from the affected RG authoritative chains.
- Made `gruul_core_identity_provenance` exactly match generated `/core_identity` provenance.
- Created replacement candidate commit `16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- Updated workflow records to say replacement candidate created and awaiting independent review.

## Why It Changed

Independent review record `04c0933825c985373336ba9bdbfccbbcf29d8e82` returned `REQUEST CHANGES` because fixture `gruul_core_identity_provenance` contained duplicate `claim_gruul_clans_structure_0005` and `claim_gruul_clans_placement_0072` entries while generated provenance deduplicated that canonical chain.

## Decisions Made

- No broader semantic redesign was needed because the original candidate passed all other reviewed areas.
- No generated file content changed after `npm.cmd run build:factions`; generated provenance already deduplicated the chain and remained content-stable.
- Replacement candidate-scope validation passed cleanly against the review-record base.

## Risks / Uncertainties

- The replacement candidate has not received independent review.
- Gruul is not certified and `semantically_ready` has not been set.
- Source/generated guardrails retain unrelated JESKAI/MARDU model-owned inhibitor warnings.

## Tests Run

- `npm.cmd run build:factions` twice
- JSON parse checks for changed JSON files
- Duplicate-ID checks for affected raw, generated, and fixture chains
- Exact fixture-versus-generated `/core_identity` comparison
- Explicit substantive `evidence_scope` check
- Discovery-ID isolation check
- Stale public/recruiter-copy scan
- `node research/audit-semantic-readiness.mjs --targets=RG`
- `node research/validate-semantic-readiness.mjs --targets=RG`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=04c0933825c985373336ba9bdbfccbbcf29d8e82 --target=16b58c3f32d92e6406d368169d91b0b6a86f948d --identity=RG`

## Not Touched

- No Contract v1.1 changes.
- No schema, builder, validator, runtime, Hall, Crucible, scoring, confidence, calibration, scheduling, tie-order, or global recruiter behavior changes.
- No semantic wording, claim roles, evidence scopes, source mappings, public/recruiter copy, or neighbor boundary changes.
- No non-Gruul identity work.
- No certification.
- No VM-513 remediation.
- Original main worktree `C:\dev\mtgSiteWIP` was not touched.
- External Excel tracker was not modified.

## Follow-Up Recommendations

Independent reviewer should review exact replacement candidate SHA `16b58c3f32d92e6406d368169d91b0b6a86f948d`.

## Next Suggested Agent

Independent reviewer for VM-512 Gruul replacement candidate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
