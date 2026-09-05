# VM-631 — Git-Authoritative Final Change Reporting

ID: VM-631
Title: Git-Authoritative Final Change Reporting
Status: In Progress — Owner Review
Type: Development governance / deterministic reporting
Area: Agent workflow, handoff, and final delivery reporting
Priority: High
Created: 2026-09-05

## Summary

Make Git the authority for final changed-path counts and lists, and prevent material candidate scope from being confused with a later evidence-only delta.

## Source

- Owner-reported lifecycle-cleanup trust gap: the material branch contained 15 paths, including `docs/kanban/board.md`, while the final prose reported 14.
- The lifecycle cleanup itself remains closed and unchanged; only prospective reporting governance is in scope.

## Acceptance Criteria

- [x] One repository-wide instruction requires Git-derived final changed-path lists and computed counts.
- [x] The contract distinguishes baseline-to-candidate material changes, candidate-to-evidence evidence delta, and baseline-to-HEAD final branch state.
- [x] A reusable lightweight validator compares both the reported count and exact path set with Git.
- [x] A deterministic regression rejects a 14-path report for a 15-path material diff and accepts the correct 15-path report.
- [x] The regression separately proves that a two-path evidence delta cannot replace the 15-path material report.
- [x] Existing OWNER-VISUAL and proportionate-testing governance remains unchanged.

## Files Likely Impacted

- `AGENTS.md`
- `scripts/validate/validate-change-report.mjs`
- `tests/governance/change-report-validator.test.mjs`
- `package.json`
- Required Kanban and handoff records

## Risks

- A count-only check could still omit one material path and substitute another.
- A candidate-to-evidence comparison could be mislabeled as the full task diff.
- Self-reported clean/push/merge state could remain unverified if the contract only governs paths.

## Implementation Prompt

Derive material and final path accounting from Git, validate exact enumerated path sets and counts, distinguish evidence-only commits explicitly, and keep the contract concise and prospective. Do not reopen lifecycle cleanup or change runtime, semantic, Placement, SIRF, or visual behavior.

## Notes

The card remains in progress for Owner Review. No push or merge is authorized.
