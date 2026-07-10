# VM-477 Scryfall Manual Checklist Repair Report

Date: 2026-07-07
Related card: VM-477 - Maze Manual Checklist Repair

## Source Artifacts

- Manual report: `C:\Users\obake\Downloads\scryfall_checklist_report_2026-07-07_2206.md`
- Manual harness: `C:\Users\obake\Downloads\scryfall_manual_checklist2.html`

## Before Count

- Tested: 36
- Failed: 26
- Untested: 75

## After Count

Automated VM-477 regression pass after repair:

- Parser corpus: 186 tested, 0 failed
- Maze query contract: passed
- Maze search metadata/helper harness: passed

Original interactive HTML checklist after count:

- Full browser rerun: intentionally deferred
- Confirmed remaining manual failures in the VM-477 automated regression set: none
- Remaining manual unverified items from the original harness: full 111-case browser pass

## Repaired Categories

- Bare commander candidate searches now preserve `is:commander legal:commander` plus semantic filters.
- `legendary creatures that can be commanders` keeps legendary creature type intent and commander eligibility.
- Named, mono-color, and five-color commander searches use exact identity.
- Includes-color commander wording uses identity inclusion instead of mono-color exact identity.
- Commander deck support uses deck-fit identity only when an identity is present; no-color deck requests do not invent identity.
- Actual card-color searches with Commander legality use card color, not Commander identity.
- Semantic negation targets resolved lifegain, ramp, counterspell, and keyword concepts.
- `counter spells` / `counterspells` remain separate from counter-object wording such as `counters`.
- Functional alternatives, set-family alternatives, and zero-result relaxations preserve the full normalized query context.
- Set-family labels are explanation/UI-only; emitted Scryfall syntax may continue to use raw `set:` / `s:` codes.

## Deferred Items

- Re-click the full `scryfall_manual_checklist2.html` harness in browser and record its new manual pass/fail/untested counts.
- Sample live Scryfall result counts for representative repaired queries if product QA wants result-quality evidence beyond deterministic parser/contract behavior.
