ID: VM-290
Title: Dossier Warning Fix Inventory
Status: Done
Type: Audit Documentation
Area: Commander Dossier, Audit, Documentation
Priority: medium

## Summary

Create a deduped markdown inventory of the current `dossier:audit` warning surface, listing each exact warning once with affected files, what needs to be fixed, and why the fix matters.

## Scope

- Use the current dossier audit runner output as source of truth.
- Deduplicate warnings by exact warning text.
- Include all warning classes currently emitted by the audit runner.
- Write a markdown file for review.

## Out Of Scope

- Changing audit semantics.
- Fixing the warning sources.
- Editing generated dossier snapshots for content.

## Acceptance Criteria

- Markdown inventory exists.
- Every exact warning text appears only once in the inventory.
- Each entry has fix guidance and rationale.
- Validation confirms no duplicate exact-warning entries.

## Output

- Created `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`.
- Inventory contains 461 unique exact-warning entries.
- The inventory groups warnings by repair class:
  - optional content gaps
  - Commander path identity specificity
  - Commander recommendation fallback
  - rendered duplicate land suppressions
  - source land normalization warnings

## Validation Results

- Passed: `npm.cmd run dossier:audit`
  - `Pass: 0; warnings: 104; failures: 0`
- Passed: duplicate exact-warning validation
  - `exactWarningLines: 461`
  - `uniqueExactWarnings: 461`
  - `duplicateExactWarnings: 0`

## Not Touched

- Audit semantics.
- Runtime code.
- Canonical source data.
- Generated dossier snapshot content beyond the audit report rewrite from `npm.cmd run dossier:audit`.
