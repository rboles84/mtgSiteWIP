# VM-524 Grixis Candidate Workflow Record

Agent name: Codex
Task requested: Record the governance-only VM-524 Grixis exact-SHA candidate workflow for already-qualified candidate `64a5bfffd646b292c7481f91c9ccb6def42fb552`.

## Program And Identity

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Ticket: VM-524
- Identity: Grixis / UBR
- Internal key: GRIXIS
- Invalid internal alias: UBR
- Contract: CRIT-001 Contract v1.1
- Branch: `codex/vm-524-grixis-semantic-recovery`
- Worktree: `C:\dev\mtgSiteWIP-crit001-vm524-grixis`
- Status after this workflow: exact candidate awaiting fresh independent exact-SHA review

## Exact Object Ledger

- Program base: `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`
- Preflight commit: `81c1b731a7afbafda2b629e29096f8ae49bf5d1a`
- Gate 1+2 commit: `9d7ada7a34b52c317708a97009ded2d58b4511e1`
- First implementation commit: `a6115285e859fbd46f0cd0726429b7e5ddd28e0a`
- Exact semantic candidate: `64a5bfffd646b292c7481f91c9ccb6def42fb552`
- Gate 3+4 governance commit: `bc2d1ec5f77c88f2afd2e4d0693e3249a172bcc7`
- Candidate workflow-record commit: `PENDING_VM524_CANDIDATE_WORKFLOW_RECORD_COMMIT_SHA`
- Independent review record: not yet created
- Certification commit: not created and not authorized
- Advanced program base: not created

The semantic candidate is exactly `64a5bfffd646b292c7481f91c9ccb6def42fb552`. This workflow-record commit is governance-only and must never be substituted for the candidate SHA.

## Candidate Lineage And Separation

Complete implementation ancestry:

- `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a` - VM-523 Esper certification program base
- `81c1b731a7afbafda2b629e29096f8ae49bf5d1a` - VM-524: record Grixis pre-identity drift preflight
- `9d7ada7a34b52c317708a97009ded2d58b4511e1` - VM-524: record Grixis Gate 1+2 semantic audit
- `a6115285e859fbd46f0cd0726429b7e5ddd28e0a` - VM-524: remediate Grixis semantic readiness
- `64a5bfffd646b292c7481f91c9ccb6def42fb552` - VM-524: align Grixis collision scope

Complete post-candidate governance chain:

- `bc2d1ec5f77c88f2afd2e4d0693e3249a172bcc7` - VM-524: record Grixis Gate 3+4 remediation

Ancestry was reconfirmed from program base through preflight, Gate 1+2, both implementation commits, and the exact candidate SHA. `64a5bfffd646b292c7481f91c9ccb6def42fb552` is an ancestor of current governance HEAD `bc2d1ec5f77c88f2afd2e4d0693e3249a172bcc7`.

Post-candidate diff `64a5bfffd646b292c7481f91c9ccb6def42fb552..bc2d1ec5f77c88f2afd2e4d0693e3249a172bcc7` contains only governance files:

- `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md`

No candidate-scope semantic, generated, fixture, provenance, preview, recruiter, runtime, test, validator, generator, schema, package, CI, output, or infrastructure file changed after the candidate. This workflow record is outside the semantic candidate.

Collision checks found no existing VM-524 candidate workflow, no independent review, no approval or rejection for `64a5bfffd646b292c7481f91c9ccb6def42fb552`, no certification record, and no `semantically_ready` transition for Grixis.

## Candidate Qualification Summary

Gate 5 read-only qualification designated the exact candidate:

`PASS - GRIXIS CANDIDATE EXACT SHA 64a5bfffd646b292c7481f91c9ccb6def42fb552`

Qualification scorecard: 54 PASS, 0 FAIL, 0 UNKNOWN, 4 N/A. The N/A controls were workflow-record creation, independent-review record creation, certification, and program-base advancement.

Reconfirmed in this workflow window:

- Candidate-scope result: PASS for `GRIXIS` against `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a..64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- Invalid-UBR result: PASS; `UBR` is rejected as `Unknown identity UBR`.
- Candidate-scope tests: PASS.
- Semantic audit: PASS; 11 claims, 14 sources, 66 reference sites, no missing references, no role-invalid support links.
- Semantic readiness: PASS.
- Fixture validation: PASS.
- Provenance freshness: PASS; 1963 total semantic provenance entries verified.
- Source counts: 14 total; 4 claim-bearing, 7 shaping-only, 3 support-only.
- Claim counts: 11 total; 11 `substantive_claim`, 0 `support_record`, 0 `discovery_record`, 0 `unclassified`.
- Substantive claim IDs: `grixis_claim_0001`, `grixis_claim_0002`, `grixis_claim_0003`, `grixis_claim_0004`, `grixis_claim_0005`, `grixis_claim_0006`, `grixis_claim_0007`, `grixis_claim_0008`, `grixis_claim_0009`, `grixis_claim_0010`, `grixis_claim_0011`.
- `grixis_claim_0007`: PASS; contains the approved enemy-pressure boundary rewrite.
- Evidence locators: PASS; 23 evidence locations, all with required Contract v1.1 fields.
- Evidence scopes: PASS; 0 missing evidence scopes and 0 unsupported substantive claims.
- Provenance result: PASS; 73 Grixis-linked entries, 0 null canonical IDs, 0 null hashes, 0 unresolved pointers, 0 duplicate canonical/null-key defects, 0 improper support/discovery authoritative chains.
- Fixture result: PASS; `research/fixtures/semantic-readiness/grixis.semantic-fixtures.json` contains 22 fixtures.
- Required-neighbor result: PASS; required neighbor and generic boundaries are covered by fixture, collision, preview, and active-consumer controls.
- Generic-collapse safeguards: PASS for generic villainy, nihilism, cruelty, chaos, ambition, self-interest, control, and generic UBR overfit.
- Character/mechanical/archetype/aesthetic safeguards: PASS; Nicol Bolas, necromancy, reanimation, zombies, demons, dragons, discard, sacrifice, burn, control, reanimator, combo-control, Grixis aesthetics, and Alara aesthetics remain bounded illustration/support rather than identity definitions.
- Collision result: PASS; raw order is `esper`, `jund`, `house_dimir`, `izzet_league`, `cult_of_rakdos`, `blue`, `black`, `red`, `sultai`, `temur`, `jeskai`, `mardu`, `bant`, `abzan`, `naya`, `wubrg`.
- Generated collision order: `ESPER`, `JUND`, `UB`, `UR`, `BR`, `U`, `B`, `R`, `SULTAI`, `TEMUR`, `JESKAI`, `MARDU`, `BANT`, `ABZAN`, `NAYA`, `WUBRG`.
- Lateral targets: `BANT`, `BR`, `ESPER`, `UB`, `UR`, `JUND`, `TEMUR`, `SULTAI`.
- Preview result: PASS; source preview owner equals embedded preview consumer.
- Active-consumer result: PASS; Home, Archscry, recruiter, tests, and CI consumers remain the active consumed surfaces proven in VM-524 prior records.
- DRIFT-015 result: PASS.
- DRIFT-016 result: PASS.
- DRIFT-017 result: PASS.
- Frozen-field result: PASS; no scoring, confidence, calibration, native-ID, lateral-target, collision-target, runtime, or non-Grixis drift occurred after the candidate.
- Non-Grixis integrity result: PASS; candidate-scope validation found no unrelated identity or global candidate-scope drift.
- Exact candidate-tree full test: PASS in export `C:\Users\obake\.codex\visualizations\2026\07\21\019f82cb-4a0d-7812-b146-994b49d6096b\vm524-grixis-candidate-64a5bff-tarzip-20260721-071756`.
- Normalized Git-blob/export parity: PASS for Grixis raw claims/profile/placement, fixture, generated factions, generated placement, semantic provenance, and recruiter context.
- Non-blocking warning: source/generated guardrails report one known GRIXIS model-owned inhibitor trap warning.

## Independent Review Contract

Independent review is the next authorized step and must occur in a separate Codex window on a new independent review branch and dedicated worktree.

The reviewer must:

- Review exactly `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- Compare against exactly `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`.
- Treat `bc2d1ec5f77c88f2afd2e4d0693e3249a172bcc7` and this workflow-record commit as governance outside the semantic candidate.
- Inspect the complete candidate diff.
- Review all 14 Grixis source records.
- Review all 11 Grixis claims independently.
- Verify all 23 bounded evidence locators and scopes.
- Verify all 73 provenance entries and semantic owner quality.
- Verify zero null canonical IDs and zero null hashes.
- Review fixture structure and quality.
- Review all required neighbor boundaries.
- Review generic villainy, nihilism, cruelty, chaos, ambition, self-interest, control, and UBR-overfit safeguards.
- Review character, mechanical, archetype, and aesthetic safeguards.
- Review collision guidance, ordering, and lateral targets.
- Review preview and every proven active consumed surface.
- Verify DRIFT-015, DRIFT-016, and DRIFT-017.
- Verify frozen fields.
- Verify non-Grixis integrity.
- Reproduce exact-SHA candidate-scope validation.
- Reproduce exact candidate-tree full testing.
- Perform no remediation.
- Perform no certification.

The independent review must return exactly one of:

- `APPROVE EXACT SHA 64a5bfffd646b292c7481f91c9ccb6def42fb552`
- `REJECT EXACT SHA 64a5bfffd646b292c7481f91c9ccb6def42fb552`

Approval of `bc2d1ec5f77c88f2afd2e4d0693e3249a172bcc7` is invalid. Approval of this workflow-record commit is invalid. Approval of the branch name is invalid. Approval of "latest changes" is invalid. Conditional approval is invalid. Certification remains prohibited until the exact approval line above is recorded.

## Current Campaign State

- Exact candidate exists: yes.
- Exact candidate SHA is fixed: `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- Candidate workflow is recorded separately from the candidate.
- Independent review is next.
- No independent review has occurred.
- No review decision exists.
- Certification is prohibited.
- Grixis is not `semantically_ready`.
- Certified count remains 22 of 37.
- Wave 4 remains 2 of 10.
- Program base remains `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`.
- VM-525 has not started.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md`
- `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
- `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
- `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
- `docs/handoffs/2026-07-20-1641-codex-vm523-esper-candidate-workflow.md`
- `docs/handoffs/2026-07-19-2320-codex-vm522-bant-replacement-candidate-workflow.md`
- `docs/kanban/done/VM-523-esper-semantic-recovery.md`
- `docs/kanban/done/VM-522-bant-semantic-recovery.md`

## Files Changed

- `docs/handoffs/2026-07-21-0753-codex-vm524-grixis-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-524-grixis-semantic-recovery.md`
- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md` removed by move

## What Changed

- Recorded exact Grixis candidate SHA `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- Moved VM-524 to review-ready governance state for fresh independent exact-SHA review.
- Preserved the distinction between semantic candidate SHA and workflow-record commit SHA.
- Recorded independent review requirements and exact decision language.

## What Did Not Change

- No candidate file changed.
- No different candidate was created.
- Current governance HEAD was not substituted for the candidate.
- No semantic remediation occurred.
- No source, claim, evidence, provenance, fixture, placement, collision, preview, generated, recruiter, runtime, test, validator, generator, schema, package, or CI file changed.
- No independent review occurred.
- No approval or rejection was recorded.
- No certification occurred.
- Grixis was not marked `semantically_ready`.
- Certified count remains 22 of 37.
- Wave 4 remains 2 of 10.
- Program base was not advanced.
- VM-525 was untouched.
- All VM-522 history remained intact.
- All VM-523 history remained intact.
- Original main was inspected only by read-only status and was untouched.
- Excel tracker was untouched.
- DRIFT-017 prototype was inspected only by read-only status and was untouched.
- VM-542 / DRIFT-019 residual artifacts were untouched.
- Historical/debug/archive exclusions were untouched.
- Table Talk baseline was preserved.

## Decisions Made

- Use the VM-523 candidate workflow precedent for self-referential workflow SHA handling.
- Keep `PENDING_VM524_CANDIDATE_WORKFLOW_RECORD_COMMIT_SHA` in the handoff and resolve the actual commit SHA in final task output after the commit exists.
- Treat `64a5bfffd646b292c7481f91c9ccb6def42fb552` as the only semantic object eligible for independent review.

## Risks / Uncertainties

- Independent review has not started.
- The workflow-record commit SHA cannot be embedded into itself without amending or creating a second commit; the placeholder above is resolved by final task output.
- The exact-tree full test was not rerun in this workflow because it writes reports; the immediately preceding Gate 5 qualification full-test result remains the recorded exact-tree result.

## Tests Run

- `node research/validate-semantic-candidate-scope.mjs --identity=GRIXIS --base=0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a --target=64a5bfffd646b292c7481f91c9ccb6def42fb552` - exit 0.
- `node research/validate-semantic-candidate-scope.mjs --identity=UBR --base=0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a --target=64a5bfffd646b292c7481f91c9ccb6def42fb552` - exit 1 as expected.
- `node research/semantic-candidate-scope-tests.js` - exit 0.
- `node research/validate-semantic-readiness.mjs --targets=GRIXIS` - exit 0.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=GRIXIS` - exit 0.
- `node research/build-semantic-readiness-provenance.mjs --check` - exit 0.
- `node research/audit-semantic-readiness.mjs --targets=GRIXIS` - exit 0.
- `node research/validate-source-generated-guardrails.mjs --targets=GRIXIS` - exit 0 with one known non-blocking warning.
- Read-only exact-candidate JSON spot verification for role counts, evidence locators/scopes, provenance, fixtures, collision order, lateral targets, and `grixis_claim_0007` - exit 0.

No write-producing full test command was run in this campaign worktree.

## Follow-Up Recommendations

Run a fresh independent exact-SHA review of `64a5bfffd646b292c7481f91c9ccb6def42fb552` against program base `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a` in a separate review window, branch, and worktree.

## Next Suggested Agent

Independent reviewer for exact Grixis candidate `64a5bfffd646b292c7481f91c9ccb6def42fb552`.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/ready/VM-524-grixis-semantic-recovery.md`
- `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
- `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
- `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-operating-playbook.md`

PASS — GRIXIS CANDIDATE WORKFLOW RECORDED FOR EXACT SHA 64a5bfffd646b292c7481f91c9ccb6def42fb552
