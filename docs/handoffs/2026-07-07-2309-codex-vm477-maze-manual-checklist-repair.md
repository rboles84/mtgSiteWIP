# 2026-07-07 23:09 - Codex - VM-477 Maze Manual Checklist Repair

## Agent Name

Codex

## Task Requested

Repair recent Maze/Scryfall manual-checklist failures around Commander intent, color identity grammar, alternatives, semantic negation, and set-family explanations. Preserve the manual QA baseline of 36 tested, 26 failed, and 75 untested, then record the post-repair evidence and deferred items.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent VM-471, VM-472, VM-473, VM-475, and VM-476 handoffs
- `docs/kanban/board.md`
- Recent VM-471 through VM-476 Kanban cards
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/contracts/maze-query-contract.md`
- `docs/reference/manual-test-cases.md`
- `research/scryfall-grounded-compiler.js`
- `research/scryfall-dictionary.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `data/scryfall/grounding/plain-reading-semantics.json`

## Files Changed

- `research/scryfall-grounded-compiler.js`
- `research/scryfall-dictionary.js`
- `data/scryfall/grounding/plain-reading-semantics.json`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/contracts/maze-query-contract.md`
- `docs/reference/manual-test-cases.md`
- `docs/qa/2026-07-07-vm477-scryfall-manual-checklist-after.md`
- `docs/kanban/done/VM-477-maze-manual-checklist-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-07-2309-codex-vm477-maze-manual-checklist-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added explicit Commander role and color grammar:
  - Bare `commanders` compiles as candidate eligibility with `is:commander legal:commander`.
  - Named, mono-color, and five-color Commander candidate identities use exact `id=...`.
  - Includes-color Commander phrasing uses `id>=...`.
  - Commander deck-support phrasing uses `id<=... legal:commander` only when identity is present.
  - `legal in commander` does not turn color adjectives into deck identity.
- Preserved legendary creature intent for `legendary creatures that can be commanders`.
- Expanded identity aliases for five-color and four-color public nicknames, including Glint.
- Added semantic registry coverage for mana fixing, colorless mana production, creature protection, token attacks, opponent drain, and related VM-477 text.
- Changed functional and set-family alternatives to materialize after the normalized query model is built.
- Changed semantic negation to negate resolved registry groups rather than raw user words.
- Added parser and contract regressions for the manual failures, no-leak identity cases, counter wording split, semantic negation, and alternative-preservation behavior.
- Added VM-477 architecture, contract, manual QA, and before/after checklist documentation.
- Moved VM-477 from in progress to done and indexed this handoff.

## Why It Changed

The manual checklist showed that the compiler could over-correct Commander phrasing, collapse includes-color language into exact identity, lose filters during alternatives/repairs, and apply negation too literally. VM-477 makes those grammar boundaries explicit and pins them with focused tests.

## Decisions Made

- Treat `commanders` as commander-candidate intent, not deck-support intent.
- Treat named Commander identities as exact candidate identities, while explicit includes-color wording uses identity inclusion.
- Treat Commander deck-support identity as fit-only and only when an identity is actually supplied.
- Preserve actual card color for format-legality phrases such as `blue wizards legal in commander`.
- Keep set-family collapsing out of executable query syntax; friendly labels are display/explanation only.
- Record the original manual checklist count without claiming a full browser rerun that did not happen.

## Risks / Uncertainties

- The original 111-case local HTML checklist was not fully rerun interactively after the repair.
- Live Scryfall result quality/count sampling remains outside deterministic parser and contract coverage.
- The full `npm test` suite still fails on an unrelated Archscry Colorless follow-up assertion.
- The worktree already contains many unrelated dirty and untracked files; this task did not attempt to reconcile them.

## Tests Run

Passed:

- `node research\scryfall-parser-tests.js` -> 186 parser cases passed.
- `node research\maze-query-contract-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `npm.cmd run test:plain-reading-semantics` -> passed.
- `npm.cmd run lint:js` -> passed.
- `git diff --check` -> no whitespace errors; CRLF conversion warnings only.

Attempted:

- `npm.cmd test` -> failed after VM-477-related checks passed, at `research/archscry-dossier-followup-tests.js` on the existing Colorless lane label assertion: expected `/Big Mana deckbuilder lane/i`, actual `Colorless Commander decks | Big Mana catalog lane`.

Postscript: VM-478 later resolved this stale Archscry assertion by updating the test to require `Big Mana catalog lane` and reject `deckbuilder` copy.

## Not Touched

- Generated Scryfall grounding artifact regeneration.
- Unrelated route UI, account/deck-link, Strategium, Apocrypha, and Archscry dirty-tree changes.
- The original Downloads checklist files.
- Live Scryfall API behavior.

## Follow-Up Recommendations

- Re-run `C:\Users\obake\Downloads\scryfall_manual_checklist2.html` in the browser and record a true post-repair interactive count.
- Archscry Colorless follow-up assertion resolved by VM-478.
- If product QA wants result-quality proof, sample live Scryfall result counts for the repaired Commander/color and semantic-negation queries.

## Next Suggested Agent

Test Strategist for the full manual browser rerun, then Implementation agent for the unrelated Archscry Colorless assertion if it is still a desired full-suite blocker.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-477-maze-manual-checklist-repair.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/contracts/maze-query-contract.md`
- `docs/qa/2026-07-07-vm477-scryfall-manual-checklist-after.md`
- `docs/reference/manual-test-cases.md`
