# VM-481 Scryfall Retest Repair Report

Date: 2026-07-08
Related card: VM-481 - Maze Retest Failure Repair

## Source Artifact

- Retest report: `C:\Users\obake\Downloads\scryfall_checklist_report_2026-07-08_1840.md`

## Before Count

- Tested: 39 / 111
- Passed: 24
- Failed: 15
- Untested: 72

## After Count

No checked-in command exists to regenerate the downloaded manual checklist report. VM-481 therefore records the after state from deterministic regression coverage:

- Parser corpus: 202 tested, 0 failed
- Maze query contract: passed
- Maze search metadata/helper harness: passed
- Research mode syntax/display regression: passed
- Plain Reading semantic registry validation: passed
- Full `npm.cmd test`: passed

Original interactive checklist after count:

- Full browser rerun: intentionally deferred
- Confirmed remaining manual failures in the VM-481 automated regression set: none
- Remaining manual unverified items from the original harness: full 111-case browser pass

## Retest Failure Classification

| Classification | Rows | Notes |
|---|---:|---|
| Fixed compiler semantics | 10 | Blue exact actual color, mono-black support, Rakdos support negation, Rakdos villains no outside-color leak, Orzhov recur, Orzhov clerics color grammar, Silverquill counters, Silverquill token objects, Glint/Chaos identity priority, and colorless commander plus colorless mana. |
| Expected block | 3 | Ambiguous `marvel set` and `tarkir set` families still require a product-family choice before Scryfall execution. Mardu warriors keeps fixed color grammar while still blocking on Tarkir family ambiguity. |
| Expected zero / caveat | 2 | Five-color no-result and Mardu multi-face/token attack/sacrifice remain live-result caveats unless a later fixture proves compiler semantics are wrong. |
| Hidden regression fixed | 1 | Hidden Glint negative regression now preserves Glint/Chaos four-color identity and lifegain negation without unresolved `glint` / `chaos` leakage. |
| Deferred | 0 | No VM-481 fixture was intentionally left unmodeled in automated coverage. |

## Repaired Categories

- Actual-card color grammar can emit exact single-color card color for explicit Commander-legal fixtures.
- Named multicolor adjectives before actual card types use `c<=...` to block outside-color leaks.
- Explicit mono Commander deck support stays exact identity; non-mono support stays fit-based.
- Commander candidate identity remains exact for Rakdos, colorless, five-color, Glint, and Chaos wording.
- Lifegain negation catches numeric life-gain language and lifelink.
- Recursion wording handles `recur creatures`.
- Counter-object wording stays separate from counterspell intent.
- Token-object searches use `type:token` and do not add Commander legality.
- Colorless commander mana searches preserve both `id:c` and `produces:c`.

## Deferred Manual Work

- Re-click the full downloaded checklist harness and record a true interactive pass/fail/untested count.
- If live Scryfall result quality remains questionable for the two expected-zero/caveat cases, capture those as separate product or fixture tickets rather than broadening VM-481.
