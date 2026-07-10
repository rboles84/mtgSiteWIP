# VM-482 Token Object Format Suppression QA Report

Date: 2026-07-09
Related card: VM-482 - Token Object Format Suppression And Four-Color Commander Grammar

## Source Artifact

- Retest report: `C:\Users\obake\Downloads\scryfall_checklist_report_2026-07-08_2337.md`

## Before Count

- Tested: 39 / 111
- Passed: 30
- Failed: 9
- Untested: 72

## After Count

No checked-in command exists to regenerate the downloaded manual checklist report. VM-482 records the after state from deterministic regression coverage:

- Parser corpus: 207 tested, 0 failed
- Maze query contract: passed
- Maze search metadata/helper harness: passed
- Research mode syntax/display regression: passed
- Full `npm.cmd test`: passed

Original interactive checklist after count:

- Full browser rerun: intentionally deferred
- Confirmed remaining manual failures in the VM-482 automated regression set: none

## Repaired Categories

- Raw token-object query `type:inkling type:token c<=wb s:stx` no longer receives automatic `f:commander`.
- Grouped token-object clauses such as `(type:token)` also suppress automatic format defaults.
- Non-object token references still keep normal format behavior: `o:token`, `o:"create a token"`, `st:token`, and negated `-type:token` still receive `f:commander` when Commander is selected.
- Switching Plain Reading output into Operator's Hand preserves `type:inkling type:token c<=wb s:stx`.
- Generic four-color Commander wording now uses `id=4 is:commander legal:commander`.
- Named four-color identities such as Glint/Chaos continue to use exact named identity rather than generic `id=4`.

## Deferred Manual Work

- Re-click the downloaded checklist harness and record a true interactive pass/fail/untested count.
- If additional remaining retest failures are product-semantics issues rather than this token-object/raw-format boundary, classify them in a separate VM.
