# VM-571 - Post-VM-570 Test Contract Reconciliation

ID: VM-571
Title: Post-VM-570 Test Contract Reconciliation
Status: Done
Type: QA/test infrastructure
Area: Browser smoke and Archscry dossier regression
Priority: Medium
Created: 2026-08-20

## Summary

Correct two stale QA contracts discovered after VM-570 without changing product runtime, copy, data, or architecture.

## Source

- Owner-approved VM-571 implementation plan.
- VM-570 implementation `ef3ecbef4e018ea59d84088d40f65485ea97e4b3`.
- Current Archscry `Cards That Play Like This` runtime authority and VM-567/VM-568 stale-assertion records.

## Acceptance Criteria

- Browser smoke inspects `assets/js/maze/research-init.js`, the current Maze runtime path.
- The Archscry dossier follow-up test expects the approved `Cards That Play Like This` heading.
- Focused syntax/path checks and the dossier follow-up suite are run.
- Any later unrelated pre-existing dossier-suite failure is recorded without expanding scope.
- No product or generated files change.

## Files Likely Impacted

- `scripts/browser-smoke.mjs`
- `tests/archscry/archscry-dossier-followup-tests.js`
- Required VM-571 Kanban and handoff records

## Risks

- Missing local dependencies prevent full browser-smoke execution, but are not a repository defect or VM-571 scope.
- The dossier suite may expose a later unrelated historical assertion after the approved heading correction.

## Implementation Prompt

Apply only the verified path and assertion replacements, run focused checks, record results, and stop.

## Notes

- No `npm ci`, dependency changes, Node/toolchain work, product copy changes, broad QA repair, dead-tooling review, or Pass 2.

## Closeout

- Corrected browser smoke to inspect `assets/js/maze/research-init.js`; syntax and focused old/new path checks passed.
- Updated the dossier assertion to the approved `Cards That Play Like This` contract; syntax and focused heading checks passed.
- The dossier suite passed the corrected assertion, then stopped at its unrelated pre-existing line 275 result-directory wording assertion: `expected the result directory to describe the complete current identity atlas`.
- Per scope, the later failure was recorded without changing product code or expanding VM-571.
