# Agent Handoff: Codex - VM-481 Maze Retest Failure Repair

## Agent Name

Codex

## Task Requested

Implement VM-481: repair Maze/Scryfall compiler semantics from `scryfall_checklist_report_2026-07-08_1840.md`, keep changes scoped to retest failures, and close with Kanban, QA, docs, and handoff traceability.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-07-2309-codex-vm477-maze-manual-checklist-repair.md`
- `docs/handoffs/2026-07-08-0004-codex-vm479-plain-reading-syntax-leakage.md`
- `docs/handoffs/2026-07-08-0722-codex-vm480-functional-tag-display.md`
- `docs/kanban/done/VM-477-maze-manual-checklist-repair.md`
- `docs/kanban/done/VM-479-plain-reading-syntax-leakage-repair.md`
- `docs/kanban/done/VM-480-plain-reading-functional-tag-display-repair.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/contracts/maze-query-contract.md`
- `research/scryfall-grounded-compiler.js`
- `research/scryfall-dictionary.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `data/scryfall/grounding/plain-reading-semantics.json`

## Files Changed

- `research/scryfall-grounded-compiler.js`
- `research/scryfall-dictionary.js`
- `data/scryfall/grounding/plain-reading-semantics.json`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/qa/2026-07-08-vm481-scryfall-retest-after.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-481-maze-retest-failure-repair.md`
- `docs/kanban/in-progress/VM-481-maze-retest-failure-repair.md`
- `docs/handoffs/2026-07-08-2215-codex-vm481-maze-retest-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

`npm.cmd test` also refreshed the existing live gate bias audit outputs as part of the normal test harness behavior; those files were not part of the VM-481 implementation scope.

## What Changed

- Added token-object intent detection so `inkling tokens from Strixhaven legal in commander` emits `type:inkling type:token` with set/color context, warns about token-object Commander legality, and does not add `legal:commander`.
- Preserved colorless Commander identity separately from colorless mana production, producing both `id:c` and `produces:c` for the retested fixture.
- Tightened Commander/color grammar for exact actual-card color in explicit Commander-legal fixtures, named multicolor no-outside-color card searches, exact mono deck support, fit-based non-mono deck support, and exact Commander candidate identities.
- Added Glint/Chaos span-priority support so four-color identity resolves once as `id=ubrg` without `id=ub` or WUBRG leakage.
- Added semantic-registry coverage for `recur creatures`, resolved counter-object wording, and stronger lifegain negation.
- Added VM-481 parser and query-contract fixtures for the 15 visible retest failures plus the hidden Glint negative regression.
- Added the manual QA after artifact with before count, post-regression status, remaining classifications, and deferred manual-browser rerun.

## Why It Changed

The July 8 retest showed remaining compiler-semantics failures after VM-477/479/480: color words were still being over- or under-interpreted, token-object wording was being treated like token-making Commander cards, lifegain negation was too weak, and Glint/Chaos wording could leak partial identity spans. VM-481 locks those defects as deterministic compiler fixtures without expanding Plain Reading into a broader syntax-display project.

## Decisions Made

- Preserve `legal:commander` as the existing compiler legality contract.
- Use `type:token` for token objects; do not use `is:token`.
- Keep `legal in commander` off token-object queries and surface a warning instead.
- Keep ambiguous `marvel set` and `tarkir set` behavior as expected-block until the user chooses a family.
- Treat explicit mono deck-support fixtures as exact identity because the target is color-specific support, not all legal deck inclusions.
- Keep five-color no-result and Mardu multi-face cases as expected-zero/caveat unless a future fixture proves compiler semantics are wrong.

## Risks / Uncertainties

- The downloaded HTML checklist was not rerun manually; no checked-in command exists to regenerate `scryfall_checklist_report_2026-07-08_1840.md`.
- Live Scryfall result quality may still need separate product review for the expected-zero/caveat rows.
- The worktree remains heavily dirty with unrelated modified/untracked files from earlier VM work; VM-481 did not revert or normalize unrelated changes.

## Tests Run

- `node research\scryfall-parser-tests.js` -> passed, 202 parser cases.
- `node research\maze-query-contract-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `node research\research-mode-tests.js` -> passed, 9 mode cases and 12 leakage cases.
- `npm.cmd run test:plain-reading-semantics` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

## Not Touched

- Full Scryfall syntax display registry work.
- Oracle regex/name/artist/price/language/date/rarity/numeric-stat translation outside existing behavior.
- Generated Scryfall grounding artifacts beyond the existing semantic registry source.
- Public Maze search API shape.
- Unrelated dirty-tree files and deferred account/deck-link scope.

## Follow-Up Recommendations

- Re-run the downloaded browser checklist and record a true interactive after count when product QA is ready.
- Open separate tickets for live-result caveats if the five-color or Mardu multi-face rows should become compiler changes.
- Keep future set-family ambiguity work UI-focused: a first-class picker would reduce expected-block friction without weakening query safety.

## Next Suggested Agent

No specialist required. If the manual browser checklist is rerun later, a Test Strategist pass should classify any remaining live-result failures before compiler edits.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-481-maze-retest-failure-repair.md`
- `docs/qa/2026-07-08-vm481-scryfall-retest-after.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/contracts/maze-query-contract.md`
- VM-477 Maze Manual Checklist Repair
- VM-479 Plain Reading Syntax Leakage Repair
- VM-480 Plain Reading Functional Tag Display Repair
