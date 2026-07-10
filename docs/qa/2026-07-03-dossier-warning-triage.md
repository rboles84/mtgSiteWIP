# Dossier Warning Triage And Snapshot Review

Date: 2026-07-03
Related card: VM-465
Status: Triage complete; no generated/source data edited

## Audit Result

Command:

```powershell
npm.cmd run dossier:audit
```

Result:

- 37 primary Commander dossiers audited.
- 76 adjacent dossiers audited.
- Pass: 0.
- Warnings: 113.
- Failures: 0.
- Report written to `artifacts/dossier-snapshots/dossier-audit-report.md`.

## Classification

| Category | Current Classification | Evidence |
|---|---|---|
| Accepted warnings | Suppressed duplicate land/link warnings and generated source-land warnings are accepted as non-blocking for this pass because the audit says generated Commander output is safe and no final land-count failures were found. | `Duplicate Card/Link Warnings`, `Generated Snapshot Warning Summary` |
| Real defects | No P0/P1 defects found in this audit run. Content regressions, contract failures, banned phrase failures, missing required sections, Commander land-count failures, table caution text warnings, Commander recommendation warnings, and copy polish warnings all report none. | Top-level audit sections |
| Source-intake needs | Raw/source land-base cleanup remains needed across 15 source factions/colleges with 210 unique source-land warnings after dedupe. These should be source-intake cleanup, not generated-output hand edits. | `Source Data Land Warnings by Faction` |
| Source-boundary review needs | Ink, Witch, and Colorless language-bleed warnings need human source-boundary review before promoting phrases to banned phrases or rewriting source/display copy. | `Possible Language Bleed Warnings`, `Table Caution Review Rule Warnings`, `Suggested Next Banned Phrase Additions` |
| Future copy/data work | Optional card-signal gaps remain for `witch-growth`, `colorless`, `colorless` adjacent `five-color-wubrg`, and `five-color-wubrg`; these are content-enrichment work, not release blockers while the runtime hides missing panels. | `Optional Content Gaps / Advisory Warnings` |

## Do Not Edit

Do not patch generated dossier snapshots or generated JSON by hand. Any future cleanup should start from source-owned raw faction/precon/catalog inputs or a dedicated source-intake card.

## Follow-Up Recommendations

- Open a source-intake cleanup card only if the owner wants to reduce source land-base warning volume.
- Open a source-boundary review card for Ink/Witch/Colorless phrase promotion if those warnings become noisy or ambiguous.
- Keep the 113-warning baseline documented as advisory, not failure, until source-owned cleanup is scheduled.
