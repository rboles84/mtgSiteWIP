ID: VM-289
Title: Dossier Audit Contract Repair And Hardening
Status: Done
Type: Test Contract Repair / Audit Hardening
Area: Archscry, Commander Dossier, Audit
Priority: high

## Summary

Repair the real Sultai banned-phrase regression, realign dossier audit required-section checks to the runtime’s intentional hidden/suppressed-section behavior, and harden the audit so real regressions still fail while optional content gaps downgrade to non-blocking findings.

## Scope

- Remove or rewrite the authored Sultai banned phrase.
- Replace blanket required-section auditing with capability-aware auditing.
- Keep intentionally hidden starter-card panels and intentionally suppressed public commander-directory links from failing structural audit checks.
- Add audit regression coverage and clearer report bucketing for contract failure vs content regression vs advisory gap.

## Out Of Scope

- Broad content enrichment for wedges or four-color starter cards.
- Raw faction packet changes unless strictly required for the banned phrase fix.
- User-facing dossier layout changes unrelated to the audit contract.

## Acceptance Criteria

- `npm.cmd run dossier:audit` no longer fails on intentionally hidden starter-card sections or intentionally suppressed commander-directory links.
- The Sultai banned phrase failure is gone.
- Real regression classes still fail.
- Validation passes:
  - `npm.cmd run dossier:audit`
  - `node research/archscry-dossier-followup-tests.js`
  - `npm.cmd test`

## Implementation Notes

- Repaired the real Sultai content regression by removing the banned phrase from the authored Sultai archetype description in canonical faction data.
- Replaced blanket dossier required-section auditing with a capability-aware contract helper in `assets/js/commander-dossier.js`.
- Aligned audit expectations with runtime behavior:
  - empty starter-card panels are intentionally suppressible
  - four-color public Commander directory links are intentionally suppressible
  - suppressed public directory-link dossiers must still expose an alternative Commander discovery surface
- Added audit bucket classification so reports now distinguish:
  - content regressions
  - contract failures
  - optional content gaps / advisory warnings
- Added targeted dossier regression coverage for:
  - unauthored starter-card panels that should remain hidden without failing audit
  - four-color suppressed-directory-link dossiers that should pass without public Commander directory links
  - banned Sultai phrasing that should still fail as a content regression if reintroduced
- Broadened the table-caution action-cue matcher to recognize the practical verbs used by current authored dossier copy.

## Validation Results

- Passed: `node research/archscry-dossier-followup-tests.js`
- Passed: `npm.cmd run dossier:audit`
  - Result: `Pass: 0; warnings: 104; failures: 0`
  - Starter-card gaps now report as advisory warnings instead of structural failures.
- Passed: `npm.cmd test`

## Not Touched

- Broad starter-card content enrichment for wedges or four-color identities.
- User-facing dossier layout changes unrelated to audit semantics.
- Home naming migration work already closed under VM-288.
