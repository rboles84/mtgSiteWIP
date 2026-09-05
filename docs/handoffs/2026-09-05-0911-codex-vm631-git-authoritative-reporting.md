# VM-631 Git-Authoritative Final Change Reporting — Owner Review Handoff

Date: 2026-09-05
Agent: Codex
Related Card: [VM-631](../kanban/in-progress/VM-631-git-authoritative-final-change-reporting.md)
Status: Owner Review Ready

## Task Requested

Repair the final Git reporting trust gap exposed when a correct 15-path lifecycle candidate was manually reported as 14 paths, and distinguish material changes from later evidence-only commits without reopening the lifecycle cleanup.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, and `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
- `docs/handoffs/templates/agent-handoff-template.md`
- `docs/handoffs/2026-09-05-0822-codex-lifecycle-governance-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`, `docs/kanban/board.md`, and `package.json`
- Existing `scripts/validate/` and Node test conventions

## Material Candidate

- Baseline: `255f8ceec71ed4b8c771cc9574423e2d76d238f0`
- Candidate: `a28514d1a3998d7e25f11bf17dbe9027163eff27`
- Changed paths: `7`

## Files Changed

- `AGENTS.md`
- `docs/handoffs/templates/agent-handoff-template.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-631-git-authoritative-final-change-reporting.md`
- `package.json`
- `scripts/validate/validate-change-report.mjs`
- `tests/governance/change-report-validator.test.mjs`

## What Changed

- Added one repository-wide final Git reporting contract to `AGENTS.md`.
- Added one validator that derives name-status rows from Git, computes counts, compares exact material/evidence path sets, and rejects an evidence delta presented as the whole task diff.
- Added one deterministic regression fixture proving 14-of-15 fails, 15-of-15 passes, and a two-path evidence delta remains distinct.
- Added the validator/test commands to `package.json` and the required report shape to the existing handoff template.
- Created VM-631 and placed it In Progress for Owner Review.
- This handoff and `HANDOFF_INDEX.md` are evidence-only records created after the material candidate; they are not part of the seven-path material set above.

## Why

The prior workflow required a hand-authored Files changed section but did not say Git was authoritative, did not require computed counts or exact path-set comparison, and did not distinguish task-baseline-to-candidate scope from candidate-to-evidence scope.

## Decisions Made

- `AGENTS.md` is the single automatically inherited authority for final reporting; the validator enforces that contract rather than creating another governance framework.
- Rename-aware `git diff --name-status` rows define the changed-file count; the reported path for a rename is its destination path.
- Material paths remain the primary report. Evidence-only paths require a separate labeled section that explicitly says it is not the full task diff.
- The rule is prospective. Historical handoffs were not mass-edited, and the lifecycle cleanup was not reopened.

## Risks / Uncertainties

- A final conversational response cannot itself be parsed from the repository, so agents must dogfood the same Git commands immediately before reporting.
- Push and merge status remain repository-host facts; the validator checks local Git diff scopes, while the contract requires agents to verify remote/integration state separately.

## Tests / Checks Run

- `npm.cmd run test:change-report` — PASS at exact material candidate; one Node test proves 14-vs-15 rejection, correct 15-path acceptance, two-path evidence separation, and rejection of evidence-as-material confusion.
- `git diff --check 255f8ceec71ed4b8c771cc9574423e2d76d238f0..a28514d1a3998d7e25f11bf17dbe9027163eff27` — PASS.
- Focused Markdown-link resolution across the four changed Markdown files — PASS.
- VM-631 uniqueness and board/card consistency — PASS.
- Git-derived changed-path protection — PASS; all seven material paths are governance/tooling/test files, with no production, semantic, Placement, SIRF, or visual path.

## RobDevPass Implementation Packet

- Changed behavior and owner: final implementation reports now derive path lists/counts from Git under repository-wide `AGENTS.md`; the new validator is the narrow enforcement seam.
- Protected behavior: lifecycle cleanup, runtime/product code, semantics, claims, Placement, SIRF, historical reports, Owner-Visual policy, and proportionate testing remain unchanged.
- Consumers: all future repository implementation agents and handoff/report authors; the existing handoff template and package scripts expose the contract without duplicating it.
- Risks addressed: manual miscount, omitted/substituted path, and candidate-to-evidence scope confusion.
- Non-goals: no broad reporting framework, historical rewrite, browser work, product change, push, or merge.

## RobQAPass Readiness

- QA tier: QA-0 governance/non-runtime metadata plus a focused deterministic tooling regression.
- Changed behavior: Git-derived final reporting and exact path-set validation.
- Protected behavior intentionally untouched: runtime, semantic, Placement, SIRF, browser, visual, and historical workflows.
- CPU-heavy validation: `NOT REQUIRED`.
- Tests intentionally skipped: browser, visual, semantic, Placement, SIRF, historical, and broad runtime suites; none protect the changed reporting contract.
- Objective evidence: exact seven-path candidate diff and the passing regression described above.
- Remaining Owner judgment: accept or revise the concise prospective reporting contract. No visual review is required.
- RobQA status: PASS at exact material candidate `a28514d1a3998d7e25f11bf17dbe9027163eff27`.

## Not Touched

- VM-016, VM-469, VM-595, VM-596, VM-598, CRIT-001, VM-628, VM-629, or VM-630 records.
- Production HTML, CSS, JavaScript, data, semantic profiles, claims, Placement, generators, or SIRF evidence.
- Historical handoffs other than the current prospective template.
- Remote branches, pull requests, `main`, deployments, browser state, or visual artifacts.

## Follow-Up Recommendations

- Owner Review only. Do not merge or push until authorized under current governance.

## Next Suggested Agent

Owner Review.
